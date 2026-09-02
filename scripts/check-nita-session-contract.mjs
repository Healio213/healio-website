import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const handlerUrl = new URL('../api/nita-session.js', import.meta.url);
let source = '';
try {
  source = await readFile(handlerUrl, 'utf8');
} catch {
  // The assertion below produces the deliberate RED result until the endpoint exists.
}

assert.notEqual(source, '', 'Der same-origin Nita-Session-Endpunkt /api/nita-session fehlt.');

const { default: handler } = await import(`${handlerUrl.href}?contract=${Date.now()}`);

const makeResponse = () => {
  const result = { statusCode: null, headers: {}, body: null };
  return {
    result,
    setHeader(name, value) { result.headers[name.toLowerCase()] = value; },
    status(code) { result.statusCode = code; return this; },
    json(value) { result.body = value; return this; },
  };
};

const validContext = Object.freeze({
  healio_language: 'de',
  healio_product: 'outpatient',
  healio_page: 'outpatient',
  healio_entry_point: 'global_launcher',
});

const validRequest = (overrides = {}) => ({
  method: 'POST',
  headers: {
    origin: 'https://healio.de',
    host: 'healio.de',
    'x-forwarded-proto': 'https',
    'x-forwarded-for': '203.0.113.17',
    'content-type': 'application/json',
  },
  body: { sdp: 'v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n', context: validContext },
  ...overrides,
});

const originalFetch = globalThis.fetch;
const originalKey = process.env.OPENAI_API_KEY;
const originalEnabled = process.env.NITA_WEB_VOICE_ENABLED;
const originalAllowedOrigins = process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS;
const originalAdmissionSecret = process.env.NITA_WEB_VOICE_ADMISSION_SECRET;
process.env.OPENAI_API_KEY = 'test-server-key';
process.env.NITA_WEB_VOICE_ENABLED = 'true';
process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS = 'https://healio.de,https://www.healio.de';
process.env.NITA_WEB_VOICE_ADMISSION_SECRET = 'test-only-admission-secret-32-bytes';

try {
  {
    const response = makeResponse();
    await handler(validRequest({ method: 'GET' }), response);
    assert.equal(response.result.statusCode, 405, 'Andere Methoden als POST müssen fail-closed abgewiesen werden.');
    assert.equal(response.result.headers.allow, 'POST');
  }

  {
    const response = makeResponse();
    await handler(validRequest({ headers: { ...validRequest().headers, origin: 'https://evil.example' } }), response);
    assert.equal(response.result.statusCode, 403, 'Cross-Origin-Anfragen müssen fail-closed abgewiesen werden.');
  }

  {
    const response = makeResponse();
    await handler(validRequest({
      headers: {
        ...validRequest().headers,
        origin: 'https://healio-preview.example',
        host: 'healio-preview.example',
      },
    }), response);
    assert.equal(response.result.statusCode, 403, 'Eine nur formal gleiche, aber nicht freigegebene Origin muss abgewiesen werden.');
  }

  {
    const response = makeResponse();
    await handler(validRequest({ body: { sdp: 'v=0\r\nm=audio 9\r\n', context: { ...validContext, healio_page: 'injected' } } }), response);
    assert.equal(response.result.statusCode, 400, 'Ungültiger Kontext darf nicht an OpenAI gelangen.');
  }

  {
    delete process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS;
    const response = makeResponse();
    await handler(validRequest(), response);
    assert.equal(response.result.statusCode, 503, 'Ohne explizite Origin-Allowlist muss der Dienst geschlossen bleiben.');
    process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS = 'https://healio.de,https://www.healio.de';
  }

  {
    process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS = 'http://healio.de';
    const response = makeResponse();
    await handler(validRequest(), response);
    assert.equal(response.result.statusCode, 503, 'Eine unsichere Origin-Konfiguration muss den gesamten Dienst schließen.');
    process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS = 'https://healio.de,https://www.healio.de';
  }

  {
    const response = makeResponse();
    const { 'x-forwarded-for': _removed, ...headersWithoutIp } = validRequest().headers;
    await handler(validRequest({ headers: headersWithoutIp }), response);
    assert.equal(response.result.statusCode, 403, 'Ohne validierte Hosting-IP darf keine kostenpflichtige Session entstehen.');
  }

  {
    process.env.NITA_WEB_VOICE_ADMISSION_SECRET = 'too-short';
    const response = makeResponse();
    await handler(validRequest(), response);
    assert.equal(response.result.statusCode, 403, 'Ohne ausreichend starkes Admission-Secret muss der Dienst geschlossen bleiben.');
    process.env.NITA_WEB_VOICE_ADMISSION_SECRET = 'test-only-admission-secret-32-bytes';
  }

  let upstreamRequest;
  globalThis.fetch = async (url, options) => {
    upstreamRequest = { url, options };
    return new Response('v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n', {
      status: 201,
      headers: { Location: 'https://api.openai.com/v1/realtime/calls/rtc_test_contract_123456' },
    });
  };

  {
    process.env.NITA_WEB_VOICE_ENABLED = 'false';
    const response = makeResponse();
    await handler(validRequest(), response);
    assert.equal(response.result.statusCode, 503, 'Der Web-Voice-Master-Schalter muss standardmäßig fail-closed bleiben.');
    process.env.NITA_WEB_VOICE_ENABLED = 'true';
  }

  {
    const response = makeResponse();
    await handler(validRequest(), response);
    assert.equal(response.result.statusCode, 200, 'Eine gültige Session muss die SDP-Antwort zurückgeben.');
    assert.deepEqual(Object.keys(response.result.body), ['sdp'], 'Die Antwort darf ausschließlich SDP und keine Secrets enthalten.');
    assert.match(response.result.body.sdp, /^v=0/m);
    assert.equal(upstreamRequest.url, 'https://api.openai.com/v1/realtime/calls');
    assert.equal(upstreamRequest.options.method, 'POST');
    assert.match(upstreamRequest.options.headers.Authorization, /^Bearer test-server-key$/);
    const session = JSON.parse(upstreamRequest.options.body.get('session'));
    assert.equal(session.type, 'realtime');
    assert.equal(session.model, 'gpt-realtime-2.1', 'Der Browser-Agent muss das beschlossene Realtime-Vollmodell verwenden.');
    assert.deepEqual(session.reasoning, { effort: 'low' }, 'Das Vollmodell muss mit Reasoning low gebunden werden.');
    assert.equal(session.max_output_tokens, 512, 'Eine einzelne Antwort muss auf 512 Outputtokens begrenzt sein.');
    assert.deepEqual(session.tools, [], 'Die Browser-Strecke darf ohne Sideband keine unkontrollierten Werkzeuge anbieten.');
    assert.equal(session.tool_choice, 'none');
    assert.equal(session.parallel_tool_calls, false);
    assert.equal(session.tracing, null);
    assert.equal(upstreamRequest.options.body.get('sdp'), validRequest().body.sdp, 'SDP muss als normales Form-Feld ohne Dateiupload gesendet werden.');
    assert.match(session.instructions, /digitale Assistenz/);
    assert.match(session.instructions, /Hochdeutsch/);
    assert.match(session.instructions, /3\.000 EUR/);
    assert.match(session.instructions, /700 EUR\+/);
    assert.match(session.instructions, /Wissensbasis-Version: 2026-08-31\.1/, 'Die freigegebene serverseitige Wissensversion muss gebunden sein.');
    assert.match(session.instructions, /Osteopathie bis 160 EUR pro Jahr/, 'Ein geprüftes Detail aus der Wissensbasis fehlt in der echten Session.');
    assert.match(session.instructions, /31\. März 2027/, 'Die geprüfte Bonusfrist fehlt in der echten Session.');
    assert.match(session.instructions, /Notruf 112/, 'Die geprüfte Notfallgrenze fehlt in der echten Session.');
    assert.match(session.instructions, /healio\.de\/kontakt/, 'Der freigegebene Kontaktweg fehlt in der echten Session.');
    assert.doesNotMatch(source, /console\.(?:log|info|warn|error)/, 'Der Endpunkt darf keine Gesprächs- oder Requestdaten loggen.');
  }

  {
    const second = makeResponse();
    await handler(validRequest(), second);
    assert.equal(second.result.statusCode, 200, 'Der begrenzte Pilot muss eine zweite Session desselben Clients noch zulassen.');

    const third = makeResponse();
    await handler(validRequest(), third);
    assert.equal(third.result.statusCode, 429, 'Mehr als zwei Sessions pro Client und Zeitfenster müssen abgewiesen werden.');
    assert.match(third.result.headers['retry-after'], /^\d+$/, 'Das Admission-Gate muss eine begrenzte Retry-Zeit ausgeben.');
  }
} finally {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
  else process.env.OPENAI_API_KEY = originalKey;
  if (originalEnabled === undefined) delete process.env.NITA_WEB_VOICE_ENABLED;
  else process.env.NITA_WEB_VOICE_ENABLED = originalEnabled;
  if (originalAllowedOrigins === undefined) delete process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS;
  else process.env.NITA_WEB_VOICE_ALLOWED_ORIGINS = originalAllowedOrigins;
  if (originalAdmissionSecret === undefined) delete process.env.NITA_WEB_VOICE_ADMISSION_SECRET;
  else process.env.NITA_WEB_VOICE_ADMISSION_SECRET = originalAdmissionSecret;
}

console.log('Nita-Session-Vertrag erfüllt: same-origin, validiert, serverseitig und fail-closed.');
