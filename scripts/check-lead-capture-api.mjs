import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import test from 'node:test';
import { createLeadCaptureHandler } from '../api/lead-capture.js';
import { isValidLeadEmail, sanitizeLeadSourcePage, validateApplicationUrl } from '../shared/lead-capture.js';

// Fixtures stammen aus den tatsächlich verwendeten öffentlichen Providerlinks.
const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const sdkSource = read('../src/lib/sdk-url.js');
const dentalSource = read('../src/components/sections/dental/dentalLinks.js');
const constant = (source, name) => source.match(new RegExp(`const ${name} = '([^']*)';`))[1];
const bayerischeUrl = constant(dentalSource, 'BAYERISCHE_RAW_URL');
const ukvUrl = constant(dentalSource, 'UKV_RAW_URL');
const ukvAmbulantUrl = ukvUrl.replace('&tarifftypes=Zahn&', '&tarifftypes=Ambulant&').replace('&tariffs=&', '&tariffs=UKVVorsorgePRIVAT@&');
const sdkUrl = (custom = {}) => `https://insurances-online.levelnine.biz/?${new URLSearchParams({
  mandant: 'sdk', tarifftypes: 'Ambulant', agentId1: constant(sdkSource, 'AGENT_ID'), agentId2: '',
  insurers: constant(sdkSource, 'INSURER_ID'), tariffs: '', customValues: btoa(JSON.stringify(custom)),
  contactInformation: constant(sdkSource, 'CONTACT_INFO'), remarks: constant(sdkSource, 'REMARKS'),
  defaultContact: 'false', employeeInsurance: 'NOT_BKV',
})}`;
const environment = {
  NODE_ENV: 'production', LEAD_CAPTURE_WEBHOOK_URL: 'https://crm.example.test/lead-capture',
  LEAD_CAPTURE_WEBHOOK_SECRET: 'synthetic-test-secret',
};
const payload = () => ({
  firstName: 'Test', email: 'test@example.test', targetUrl: sdkUrl(),
  timestamp: '2026-10-08T12:00:00.000Z', sourcePage: '/ambulant', trackingCategory: 'sdk',
});
const request = (body = payload(), headers = {}) => ({
  method: 'POST', headers: { origin: 'https://healio.de', 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.10', ...headers }, body,
});
const response = () => ({
  headers: {}, code: null, body: null,
  setHeader(key, value) { this.headers[key] = value; },
  status(code) { this.code = code; return this; },
  json(body) { this.body = body; return this; },
});
const setup = (options = {}) => {
  const calls = [];
  const handler = createLeadCaptureHandler({ environment, fetchImpl: async (...args) => { calls.push(args); return { ok: true }; }, ...options });
  const invoke = async (req = request()) => { const res = response(); await handler(req, res); return res; };
  return { handler, calls, invoke };
};

test('aktuelle SDK-, UKV- und Bayerische-URLs werden unverändert freigegeben', () => {
  for (const url of [sdkUrl(), sdkUrl({ ref: 'praxis_test-1', source: 'healio.de', ts: 1791460800000 }), ukvUrl, ukvAmbulantUrl, bayerischeUrl]) {
    assert.equal(validateApplicationUrl(url), new URL(url).toString());
  }
});

test('falsche Anbieter, verschobene Zuordnung und zusätzliche Eingabedaten werden blockiert', () => {
  for (const url of [
    'javascript:alert(1)', 'https://evil.example.test/', sdkUrl().replace('https:', 'http:'),
    sdkUrl().replace('agentId1=901334', 'agentId1=42'), sdkUrl().replace('mandant=sdk', 'mandant=other'),
    `${ukvUrl}&email=test@example.test`, `${bayerischeUrl}&m=123`, `${bayerischeUrl}#fragment`,
    sdkUrl({ email: 'test@example.test' }), sdkUrl().replace('https://', 'https://user:pass@'),
    sdkUrl().replace('.biz/', '.biz:444/'), sdkUrl().replace('.biz/', '.biz/another-path'),
  ]) assert.equal(validateApplicationUrl(url), null, url);
});

test('sourcePage enthält ausschließlich bekannte Pfade ohne Query, Hash und Antworten', () => {
  assert.equal(sanitizeLeadSourcePage('/zahn/?email=test@example.test#check'), '/zahn');
  assert.equal(sanitizeLeadSourcePage('/en/pet-insurance'), '/en/pet-insurance');
  for (const value of ['/zahn/check/sensitive', '//evil.example.test/zahn', 'https://healio.de/zahn', '/schwangerschaft']) {
    assert.equal(sanitizeLeadSourcePage(value), null);
  }
});

test('gemeinsame E-Mail-Prüfung akzeptiert normale Adressen und blockt Format-/Längenfehler', () => {
  for (const value of ['name@example.test', ' name+tag@example.test ', 'vorname.nachname@example.test']) {
    assert.equal(isValidLeadEmail(value), true);
  }
  for (const value of ['', 'name@.example.test', 'name@example..test', `${'a'.repeat(65)}@example.test`, 'name example@example.test']) {
    assert.equal(isValidLeadEmail(value), false);
  }
});

test('erfolgreiche Lieferung sendet nur vereinbarte Felder und Secret nur an den Webhook', async () => {
  const { invoke, calls } = setup();
  const req = request({ ...payload(), firstName: ' Test ', email: ' test@example.test ', sourcePage: '/ambulant?health=sensitive#check' });
  const result = await invoke(req);
  assert.equal(result.code, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(result.headers['Cache-Control'], 'no-store');
  assert.equal(calls.length, 1);
  const [url, options] = calls[0];
  assert.equal(url, environment.LEAD_CAPTURE_WEBHOOK_URL);
  assert.equal(options.headers.Authorization, 'Bearer synthetic-test-secret');
  assert.equal(options.redirect, 'error');
  assert.deepEqual(JSON.parse(options.body), payload());
  assert.match(options.headers['Idempotency-Key'], /^[0-9a-f-]{36}$/);
  assert.ok(!JSON.stringify(result.body).includes('test@example.test'));
});

test('fehlendes optionales Secret oder trackingCategory ist zulässig', async () => {
  const { invoke, calls } = setup({ environment: { ...environment, LEAD_CAPTURE_WEBHOOK_SECRET: '' } });
  const body = payload(); delete body.trackingCategory;
  assert.equal((await invoke(request(body))).code, 200);
  assert.equal(calls[0][1].headers.Authorization, undefined);
  assert.equal(JSON.parse(calls[0][1].body).trackingCategory, undefined);
});

test('fehlende oder unsichere Webhook-Konfiguration erzeugt 503 und keine Lieferung', async () => {
  for (const config of [
    { NODE_ENV: 'production' },
    { ...environment, LEAD_CAPTURE_WEBHOOK_URL: 'http://crm.example.test/' },
    { ...environment, LEAD_CAPTURE_WEBHOOK_URL: 'https://user:pass@crm.example.test/' },
    { ...environment, LEAD_CAPTURE_WEBHOOK_SECRET: 'unsafe\r\nheader' },
  ]) {
    const { invoke, calls } = setup({ environment: config });
    assert.equal((await invoke()).code, 503);
    assert.equal(calls.length, 0);
  }
});

test('nur POST mit JSON und erlaubter Herkunft erreicht den Webhook', async () => {
  for (const [req, expected] of [
    [{ ...request(), method: 'GET' }, 405],
    [request(payload(), { origin: 'https://evil.example.test' }), 403],
    [request(payload(), { origin: undefined }), 403],
    [request(payload(), { 'content-type': 'text/plain' }), 415],
  ]) {
    const { invoke, calls } = setup();
    assert.equal((await invoke(req)).code, expected);
    assert.equal(calls.length, 0);
  }
});

test('Preview ist auf eigene Deployment-/Branch-Origin begrenzt', async () => {
  const { invoke, calls } = setup({ environment: { ...environment, VERCEL_URL: 'healio-abc.vercel.app', VERCEL_BRANCH_URL: 'healio-branch.vercel.app' } });
  assert.equal((await invoke(request(payload(), { origin: 'https://healio-abc.vercel.app' }))).code, 200);
  assert.equal((await invoke(request(payload(), { origin: 'https://healio-branch.vercel.app' }))).code, 200);
  assert.equal((await invoke(request(payload(), { origin: 'https://someone-else.vercel.app' }))).code, 403);
  assert.equal(calls.length, 2);
});

test('lokale Entwicklung akzeptiert nur gleichnamige Loopback-Origin', async () => {
  const { invoke } = setup({ environment: { ...environment, NODE_ENV: 'development' } });
  assert.equal((await invoke(request(payload(), { origin: 'http://127.0.0.1:3189', host: '127.0.0.1:3189' }))).code, 200);
  assert.equal((await invoke(request(payload(), { origin: 'http://127.0.0.1:3190', host: '127.0.0.1:3189' }))).code, 403);
});

test('Pflichtfelder, Längen und freie Zusatzdaten werden tatsächlich validiert', async () => {
  for (const override of [
    { firstName: '' }, { firstName: 'a'.repeat(81) }, { email: 'wrong-email' },
    { email: 'a'.repeat(255) }, { targetUrl: 'https://evil.example.test/' },
    { timestamp: 'not-a-date' }, { timestamp: '2026-02-31T12:00:00Z' }, { sourcePage: '/unbekannt' },
    { trackingCategory: 'Antwort auf die Gesundheitsfrage' }, { healthAnswers: { treatment: true } },
  ]) {
    const { invoke, calls } = setup();
    assert.equal((await invoke(request({ ...payload(), ...override }))).code, 400);
    assert.equal(calls.length, 0);
  }
});

test('defektes JSON und zu große Bodies werden vor Lieferung verworfen', async () => {
  for (const [req, expected] of [
    [request('{broken'), 400], [request(null), 400], [request([]), 400],
    [request({ ...payload(), firstName: 'ä'.repeat(5000) }), 413],
    [request(payload(), { 'content-length': '9000' }), 413],
  ]) {
    const { invoke, calls } = setup();
    assert.equal((await invoke(req)).code, expected);
    assert.equal(calls.length, 0);
  }
});

test('Buffer- und noch nicht geparste Request-Streams funktionieren', async () => {
  const { invoke, calls } = setup();
  assert.equal((await invoke(request(Buffer.from(JSON.stringify(payload()))))).code, 200);
  const stream = Readable.from([JSON.stringify(payload()).slice(0, 20), JSON.stringify(payload()).slice(20)]);
  Object.assign(stream, { method: 'POST', headers: request().headers });
  assert.equal((await invoke(stream)).code, 200);
  assert.equal(calls.length, 2);
});

test('Webhook-Ablehnung und Netzwerkfehler melden keinen Lead-Erfolg', async () => {
  for (const fetchImpl of [async () => ({ ok: false }), async () => { throw new Error('synthetic network error'); }]) {
    const { invoke } = setup({ fetchImpl });
    const result = await invoke();
    assert.equal(result.code, 502);
    assert.deepEqual(result.body, { error: 'delivery_failed' });
  }
});

test('Timeout bricht den Webhook ab und meldet 504', async () => {
  const { invoke } = setup({
    webhookTimeoutMs: 10,
    fetchImpl: (_url, options) => new Promise((_resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
    }),
  });
  const result = await invoke();
  assert.equal(result.code, 504);
  assert.deepEqual(result.body, { error: 'delivery_timeout' });
});

test('Doppelklick und Retry derselben UUID liefern nur einmal, veränderte Payload ergibt 409', async () => {
  const { invoke, calls } = setup();
  const req = request(payload(), { 'x-idempotency-key': crypto.randomUUID() });
  const [first, duplicate] = await Promise.all([invoke(req), invoke(req)]);
  assert.equal(first.code, 200); assert.equal(duplicate.code, 200);
  assert.equal((await invoke(req)).code, 200);
  assert.equal(calls.length, 1);
  const conflict = request({ ...payload(), firstName: 'Andere Eingabe' }, { 'x-idempotency-key': req.headers['x-idempotency-key'] });
  assert.equal((await invoke(conflict)).code, 409);
  assert.equal(calls.length, 1);
});

test('fehlgeschlagene Lieferung darf unter derselben UUID erneut versucht werden', async () => {
  let attempts = 0;
  const { invoke } = setup({ fetchImpl: async () => ({ ok: ++attempts > 1 }) });
  const req = request(payload(), { 'x-idempotency-key': crypto.randomUUID() });
  assert.equal((await invoke(req)).code, 502);
  assert.equal((await invoke(req)).code, 200);
  assert.equal(attempts, 2);
});

test('ungültige Idempotency-ID wird ohne Weiterleitung verworfen', async () => {
  const { invoke, calls } = setup();
  assert.equal((await invoke(request(payload(), { 'x-idempotency-key': 'test@example.test' }))).code, 400);
  assert.equal(calls.length, 0);
});

test('Ratenbegrenzung blockt nach fünf Lieferungen und gibt nach zehn Minuten frei', async () => {
  let time = 0;
  const { invoke, calls } = setup({ now: () => time });
  for (let index = 0; index < 5; index += 1) assert.equal((await invoke()).code, 200);
  const limited = await invoke();
  assert.equal(limited.code, 429); assert.equal(limited.headers['Retry-After'], '600');
  assert.equal(calls.length, 5);
  time = 600000;
  assert.equal((await invoke()).code, 200);
  assert.equal(calls.length, 6);
});
