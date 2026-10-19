/**
 * Vertragstest für den EU-Weg des Kurzchecks mit Gesundheitsbezug
 * (api/kurzcheck-lead.js, /check/schwangerschaft).
 *
 * Geprüft wird, was still kaputtgehen kann: nur erlaubte Herkunft, nur der
 * Token-Schreibweg in Supabase, keine Klartext-IP, keine fremden Felder,
 * dieselbe Nutzlast wie im Formular, keine Gesundheitsangabe über EmailJS oder
 * in der Eingangsmail, Region Frankfurt, Migration mit RLS und Löschfristen,
 * Datenschutztexte passend zum Weg.
 *
 * Ausführen: npm run test:kurzcheck-lead
 */

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import test from 'node:test';
import {
  buildUtm, createKurzcheckHandler, EU_CHECKS, readClientKey, validateKurzcheck,
} from '../api/kurzcheck-lead.js';
import { createReminderHandler } from '../api/kurzcheck-erinnerung.js';
import { logIncident, RELAY_SECRET_HEADER, RELAY_URL } from '../shared/kurzcheck-server.js';
import { buildKurzcheckPayload, isValidKurzcheckPhone, normalizeKurzcheckPhone } from '../shared/kurzcheck.js';
import { KURZCHECK_ENDPOINT, META_CHECKS } from '../src/content/meta-checks.js';
import { buildKurzcheckRequest } from '../src/lib/kurzcheck-request.js';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const SALT = 'synthetic-test-salt';
const TOKEN = 'synthetic-ingest-token-0123456789abcdef';
const environment = {
  SUPABASE_URL: 'https://projekt.supabase.example',
  SUPABASE_PUBLISHABLE_KEY: 'synthetic-publishable-key',
  KURZCHECK_INGEST_TOKEN: TOKEN,
  LEAD_IP_SALT: SALT,
};
const { schwangerschaft, naturheilkunde } = META_CHECKS;
const hmac = (value) => crypto.createHmac('sha256', SALT).update(value).digest('hex');

// Genau der Aufbau aus dem Formular (KurzCheck.jsx nutzt dieselbe Funktion).
const payload = (overrides = {}) => ({
  ...buildKurzcheckPayload({
    config: schwangerschaft,
    answers: { thema: 'vorsorge', kasse: 'ikk-classic' },
    firstName: 'Testperson',
    phone: '040 1234567',
    email: 'test@example.test',
    utm: { utm_source: 'meta', utm_campaign: 'kampagne-a' },
  }),
  ...overrides,
});

const request = (body = payload(), headers = {}) => ({
  method: 'POST',
  headers: {
    origin: 'https://healio.de',
    'content-type': 'application/json',
    'x-forwarded-for': '198.51.100.7',
    ...headers,
  },
  body,
});

const response = () => ({
  headers: {},
  code: null,
  body: null,
  setHeader(key, value) { this.headers[key] = value; },
  status(code) { this.code = code; return this; },
  json(body) { this.body = body; return this; },
});

const okResponse = { ok: true, status: 204, json: async () => null };

const setup = ({ env = environment, reply = okResponse, ...options } = {}) => {
  const calls = [];
  const logs = [];
  let counter = 0;
  const handler = createKurzcheckHandler({
    environment: env,
    logger: { error: (line) => logs.push(line) },
    fetchImpl: async (url, init) => {
      calls.push({ url, init, body: JSON.parse(init.body) });
      if (reply instanceof Error) throw reply;
      return typeof reply === 'function' ? reply(url) : reply;
    },
    randomUUID: () => `00000000-0000-4000-8000-${String(counter += 1).padStart(12, '0')}`,
    ...options,
  });
  const invoke = async (req = request()) => {
    const res = response();
    await handler(req, res);
    return res;
  };
  return { calls, invoke, logs };
};

const PII = ['Testperson', '040 1234567', 'test@example.test', '198.51.100.7'];
const assertNoPii = (res) => {
  const text = JSON.stringify(res.body);
  for (const value of PII) assert.ok(!text.includes(value), `Antwort enthält ${value}`);
};

test('gültige Anfrage geht genau einmal über den Token-Schreibweg, ohne Klartext-IP', async () => {
  const { calls, invoke } = setup();
  const res = await invoke();
  assert.equal(res.code, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(res.headers['Cache-Control'], 'no-store');
  assert.equal(calls.length, 1);

  const [{ url, init, body }] = calls;
  assert.equal(url, 'https://projekt.supabase.example/rest/v1/rpc/submit_kurzcheck_lead');
  assert.equal(init.method, 'POST');
  assert.equal(init.headers.apikey, 'synthetic-publishable-key');
  assert.equal(init.redirect, 'error');
  assert.deepEqual(Object.keys(body).sort(), ['p_lead', 'p_token']);
  assert.equal(body.p_token, TOKEN);
  const lead = body.p_lead;
  assert.deepEqual(Object.keys(lead).sort(), [
    'check_key', 'consent_contact', 'consent_health_data', 'consent_text_version', 'email', 'first_name',
    'id', 'ip_hash', 'kasse', 'phone', 'source', 'thema', 'utm',
  ]);
  assert.equal(lead.check_key, 'schwangerschaft');
  assert.equal(lead.thema, 'vorsorge');
  assert.equal(lead.kasse, 'ikk-classic');
  assert.equal(lead.consent_health_data, true);
  assert.equal(lead.consent_text_version, schwangerschaft.consent.version);
  assert.equal(lead.source, 'website_kurzcheck');
  assert.match(lead.id, /^[0-9a-f-]{36}$/);
  assert.equal(lead.ip_hash, hmac('198.51.100.7'));
  assert.ok(!init.body.includes('198.51.100.7'), 'Klartext-IP im Datensatz');
});

test('cf-connecting-ip zählt nur, wenn die Anfrage wirklich von Cloudflare kommt', async () => {
  const viaCloudflare = setup();
  await viaCloudflare.invoke(request(payload(), { 'x-forwarded-for': '172.68.0.1', 'cf-connecting-ip': '203.0.113.9' }));
  assert.equal(viaCloudflare.calls[0].body.p_lead.ip_hash, hmac('203.0.113.9'));

  const viaCloudflareV6 = setup();
  await viaCloudflareV6.invoke(request(payload(), { 'x-forwarded-for': '2a06:98c0:3600::103', 'cf-connecting-ip': '203.0.113.10' }));
  assert.equal(viaCloudflareV6.calls[0].body.p_lead.ip_hash, hmac('203.0.113.10'));

  const spoofed = setup();
  await spoofed.invoke(request(payload(), { 'x-forwarded-for': '198.51.100.7', 'cf-connecting-ip': '203.0.113.9' }));
  assert.equal(spoofed.calls[0].body.p_lead.ip_hash, hmac('198.51.100.7'), 'gefälschte cf-connecting-ip übernommen');

  // Wechselnde gefälschte Werte von derselben Adresse landen im selben Topf.
  const rotating = setup();
  for (let index = 0; index < 5; index += 1) {
    assert.equal((await rotating.invoke(request(payload(), { 'cf-connecting-ip': `203.0.113.${index + 20}` }))).code, 200);
  }
  assert.equal((await rotating.invoke(request(payload(), { 'cf-connecting-ip': '203.0.113.99' }))).code, 429);
});

test('IPv6 wird auf das /64-Netz gruppiert, IPv4 in IPv6-Schreibweise wird erkannt', () => {
  const key = (headers) => readClientKey({ headers, socket: {} });
  assert.equal(key({ 'x-forwarded-for': '2001:db8:1:2:aaaa::1' }), '2001:0db8:0001:0002::/64');
  assert.equal(key({ 'x-forwarded-for': '2001:db8:1:2::ffff' }), key({ 'x-forwarded-for': '2001:db8:1:2:9:9:9:9' }));
  assert.notEqual(key({ 'x-forwarded-for': '2001:db8:1:2::1' }), key({ 'x-forwarded-for': '2001:db8:1:3::1' }));
  assert.equal(key({ 'x-forwarded-for': '::ffff:198.51.100.7' }), '198.51.100.7');
  assert.equal(key({ 'x-forwarded-for': '172.68.0.1', 'cf-connecting-ip': '2001:db8:5:6::7' }), '2001:0db8:0005:0006::/64');
  assert.equal(key({ 'x-forwarded-for': 'kein-wert' }), null);
});

test('volle Zähltabelle sperrt keine neuen Besucherinnen aus', async () => {
  const { invoke } = setup();
  for (let index = 0; index < 2048; index += 1) {
    await invoke(request('{}', { 'x-forwarded-for': `10.${Math.floor(index / 256)}.${index % 256}.1` }));
  }
  assert.equal((await invoke(request(payload(), { 'x-forwarded-for': '198.51.100.200' }))).code, 200);
});

test('ohne Salt wird kein IP-Prüfwert gespeichert', async () => {
  const { calls, invoke } = setup({ env: { ...environment, LEAD_IP_SALT: '' } });
  assert.equal((await invoke()).code, 200);
  assert.equal(calls[0].body.p_lead.ip_hash, null);
});

test('nur healio.de und die Vercel-Adressen dieses Deployments dürfen senden', async () => {
  const env = { ...environment, VERCEL_URL: 'healio-website-abc123.vercel.app', VERCEL_BRANCH_URL: 'healio-website-git-feat.vercel.app' };
  for (const origin of ['https://healio.de', 'https://www.healio.de', 'https://healio-website-abc123.vercel.app', 'https://healio-website-git-feat.vercel.app']) {
    const { invoke } = setup({ env });
    assert.equal((await invoke(request(payload(), { origin }))).code, 200, origin);
  }
  for (const origin of [undefined, 'null', 'https://evil.example.test', 'https://fremd.vercel.app', 'http://healio.de', 'https://healio.de.evil.test']) {
    const { calls, invoke } = setup({ env });
    const res = await invoke(request(payload(), { origin }));
    assert.equal(res.code, 403, String(origin));
    assert.equal(calls.length, 0);
  }
});

test('falsche Methode, falscher Inhaltstyp und fehlende Konfiguration speichern nichts', async () => {
  const get = setup();
  const getRes = await get.invoke({ ...request(), method: 'GET' });
  assert.equal(getRes.code, 405);
  assert.equal(getRes.headers.Allow, 'POST');

  const form = setup();
  assert.equal((await form.invoke(request(payload(), { 'content-type': 'application/x-www-form-urlencoded' }))).code, 415);

  for (const env of [
    {},
    { ...environment, SUPABASE_PUBLISHABLE_KEY: '' },
    { ...environment, KURZCHECK_INGEST_TOKEN: '' },
    { ...environment, KURZCHECK_INGEST_TOKEN: 'zu-kurz' },
    { ...environment, SUPABASE_URL: 'http://unsicher.example' },
  ]) {
    const { calls, invoke } = setup({ env });
    const res = await invoke();
    assert.equal(res.code, 503);
    assert.deepEqual(res.body, { error: 'not_configured' });
    assert.equal(calls.length, 0);
  }
  assert.equal(get.calls.length + form.calls.length, 0);
});

test('Naturheilkunde bleibt bei EmailJS, nur Checks mit EU-Weg werden angenommen', async () => {
  assert.deepEqual(Object.keys(EU_CHECKS), ['schwangerschaft']);
  const { calls, invoke } = setup();
  const res = await invoke(request(buildKurzcheckPayload({
    config: naturheilkunde,
    answers: { thema: 'osteopathie', kasse: 'tk' },
    firstName: 'Testperson',
    phone: '040 1234567',
    email: '',
    utm: null,
  })));
  assert.equal(res.code, 400);
  assert.equal(res.body.error, 'invalid_check');
  assert.equal(calls.length, 0);
});

test('Einwilligungen und Fassung sind Pflicht, eine veraltete Fassung fällt auf', () => {
  assert.equal(validateKurzcheck(payload({ consent_contact: false })).error, 'consent_required');
  assert.equal(validateKurzcheck(payload({ consent_health_data: false })).error, 'consent_required');
  assert.equal(validateKurzcheck(payload({ consent_health_data: 'true' })).error, 'consent_required');
  const outdated = validateKurzcheck(payload({ consent_text_version: 'check-f-v1-2026-10-19' }));
  assert.equal(outdated.status, 409);
  assert.equal(outdated.error, 'consent_version_outdated');
});

test('nur hinterlegte Antworten, keine Zusatzfelder, keine weiteren Gesundheitsangaben', () => {
  assert.equal(validateKurzcheck(payload({ answers: { thema: 'geburtstermin', kasse: 'tk' } })).error, 'invalid_answers');
  assert.equal(validateKurzcheck(payload({ answers: { thema: 'vorsorge' } })).error, 'invalid_answers');
  assert.equal(validateKurzcheck(payload({ answers: { thema: 'vorsorge', kasse: 'tk', ssw: '12' } })).error, 'invalid_answers');
  assert.equal(validateKurzcheck(payload({ answers: ['vorsorge', 'tk'] })).error, 'invalid_answers');
  // Antwort fehlt, etwa weil eine Frage übersprungen wurde.
  const missing = buildKurzcheckPayload({ config: schwangerschaft, answers: { thema: 'vorsorge' }, firstName: 'A', phone: '040 1234567', email: '', utm: null });
  assert.equal(validateKurzcheck(missing).error, 'invalid_answers');
  for (const extra of ['gclid', 'fbclid', 'referrer', 'message', 'schwangerschaftswoche', 'user_agent']) {
    assert.equal(validateKurzcheck({ ...payload(), [extra]: 'x' }).error, 'invalid_request', extra);
  }
  assert.equal(validateKurzcheck(null).error, 'invalid_request');
  assert.equal(validateKurzcheck([]).error, 'invalid_request');
});

test('Formular und Server prüfen Telefonnummern gleich, eine Kontaktangabe reicht', () => {
  for (const phone of ['040 1234567', '(040) 1234567', '(0176) 12345678', '(+49) 40 1234567', '+49 (0)40 1234567', '040/1234567', '0176-1234567', '+49 176 1234567']) {
    assert.ok(isValidKurzcheckPhone(phone), phone);
    assert.equal(validateKurzcheck(payload({ phone })).ok, true, phone);
  }
  for (const phone of ['12', '0176 1234567 mobil', 'abc', '040 12', '/040 1234567', '-0176 1234567']) {
    assert.ok(!isValidKurzcheckPhone(phone), phone);
  }
  // Aus Kontakten oder Messengern kopiert: unsichtbare Richtungszeichen, geschützte Leerzeichen, typografische Striche.
  const copied = '\u202a+49\u00a0176\u201112345678\u202c';
  assert.equal(normalizeKurzcheckPhone(copied), '+49 176-12345678');
  assert.equal(validateKurzcheck(payload({ phone: copied })).lead.phone, '+49 176-12345678');
  assert.equal(validateKurzcheck(payload({ phone: '0176 1234567 mobil' })).error, 'invalid_phone');
  assert.equal(validateKurzcheck(payload({ phone: '12' })).error, 'invalid_phone');
  assert.equal(validateKurzcheck(payload({ phone: '', email: '' })).error, 'contact_required');
  assert.equal(validateKurzcheck(payload({ first_name: '  ' })).error, 'invalid_first_name');
  assert.equal(validateKurzcheck(payload({ first_name: 'x'.repeat(81) })).error, 'invalid_first_name');
  assert.equal(validateKurzcheck(payload({ first_name: 'Test\u0000' })).error, 'invalid_first_name');
  assert.equal(validateKurzcheck(payload({ email: 'kein-at' })).error, 'invalid_email');
  const phoneOnly = validateKurzcheck(payload({ email: '' }));
  assert.equal(phoneOnly.ok, true);
  assert.equal(phoneOnly.lead.email, null);
  assert.equal(validateKurzcheck(payload({ phone: '' })).lead.phone, null);
});

test('Formularzustand wird über buildKurzcheckRequest zu einer Anfrage, die der Server annimmt', () => {
  const contact = { vorname: ' Anna ', telefon: '\u202a(040) 1234567\u202c', email: ' ', einwilligung: true };
  const search = '?utm_source=meta&utm_campaign=test-a&fbclid=IwAR123&kampagne=meta';
  const body = buildKurzcheckRequest({ config: schwangerschaft, answers: { thema: 'beides', kasse: 'aok' }, contact, search });
  const result = validateKurzcheck(JSON.parse(JSON.stringify(body)));
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.lead.first_name, 'Anna');
  assert.equal(result.lead.phone, '(040) 1234567');
  assert.equal(result.lead.email, null);
  assert.deepEqual(result.lead.utm, { utm_source: 'meta', utm_campaign: 'test-a' });
  assert.ok(!JSON.stringify(body).includes('IwAR'), 'Klick-Kennung in der Anfrage');
  // Ohne Kampagnenmerkmale und mit E-Mail statt Telefon.
  const plain = buildKurzcheckRequest({ config: schwangerschaft, answers: { thema: 'vorsorge', kasse: 'tk' }, contact: { vorname: 'B', telefon: '', email: 'b@example.test', einwilligung: true }, search: '' });
  assert.equal(validateKurzcheck(plain).ok, true);
  assert.equal(plain.utm, null);
});

test('was die Datenbank ablehnen würde, fängt schon die Funktion ab', () => {
  assert.equal(validateKurzcheck(payload({ email: 'a\u0000b@example.de' })).error, 'invalid_email');
  assert.equal(validateKurzcheck(payload({ email: 'a\u001fb@example.de' })).error, 'invalid_email');
  assert.equal(validateKurzcheck(payload({ first_name: 'Anna\ud800' })).error, 'invalid_first_name');
  assert.equal(validateKurzcheck(payload({ phone: `+${'1'.repeat(40)}` })).error, 'invalid_phone');
  assert.equal(validateKurzcheck(payload({ phone: '040 1234567\u0000' })).error, 'invalid_phone');
  const wide = buildUtm(Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].map((key) => [key, '中'.repeat(200)])));
  for (const value of Object.values(wide)) assert.ok(Buffer.byteLength(value, 'utf8') <= 200, 'utm-Wert über 200 Byte');
  assert.ok(Buffer.byteLength(JSON.stringify(wide), 'utf8') < 1200);
  assert.equal(buildUtm({ utm_source: 'meta\ud800' }), null);
  assert.equal(buildUtm({ utm_source: 'ä'.repeat(150) }).utm_source.length, 100);
});

test('utm: nur die fünf Kampagnenfelder, gekürzt, ohne Klick-Kennungen', () => {
  const utm = buildUtm({ utm_source: ' meta ', utm_term: 'x'.repeat(300), fbclid: 'IwAR123', gclid: 'abc', referrer: 'https://l.instagram.com/?u=x' });
  assert.deepEqual(Object.keys(utm), ['utm_source', 'utm_term']);
  assert.equal(utm.utm_source, 'meta');
  assert.equal(Buffer.byteLength(utm.utm_term, 'utf8'), 200);
  assert.equal(buildUtm(null), null);
  assert.equal(buildUtm({ fbclid: 'x' }), null);
  assert.equal(buildUtm(['utm_source']), null);
});

test('Honeypot: freundliche Antwort, nichts gespeichert', async () => {
  const { calls, invoke } = setup();
  const res = await invoke(request({ ...payload(), healio_website: 'https://spam.example' }));
  assert.equal(res.code, 200);
  assert.equal(calls.length, 0);
});

test('Ratenbegrenzung: höchstens fünf Anfragen je Absender in zehn Minuten', async () => {
  let time = 1_000_000;
  const { calls, invoke } = setup({ now: () => time });
  for (let index = 0; index < 5; index += 1) assert.equal((await invoke()).code, 200);
  const limited = await invoke();
  assert.equal(limited.code, 429);
  assert.equal(limited.headers['Retry-After'], '600');
  assert.equal((await invoke(request(payload(), { 'x-forwarded-for': '198.51.100.8' }))).code, 200);
  time += 10 * 60 * 1000;
  assert.equal((await invoke()).code, 200);
  assert.equal(calls.length, 7);
});

test('Datenbankbremse wird zu 429, andere Speicherfehler zu 502, ohne Personendaten', async () => {
  const braked = setup({ reply: { ok: false, status: 400, json: async () => ({ code: 'P0001', message: 'kurzcheck_rate_limited' }) } });
  const brakedRes = await braked.invoke();
  assert.equal(brakedRes.code, 429);
  assert.deepEqual(brakedRes.body, { error: 'too_many_requests' });

  // PostgREST nennt bei Prüfverletzungen die ganze Zeile in details. Das darf nie zurückgehen.
  const rejected = setup({ reply: { ok: false, status: 400, json: async () => ({ code: '23514', message: 'violates check constraint', details: 'Failing row contains (Testperson, 040 1234567, test@example.test)' }) } });
  const rejectedRes = await rejected.invoke();
  assert.equal(rejectedRes.code, 502);
  assertNoPii(rejectedRes);

  const forbidden = setup({ reply: { ok: false, status: 403, json: async () => { throw new Error('kein JSON'); } } });
  assert.equal((await forbidden.invoke()).code, 502);

  const network = setup({ reply: new Error('Testperson test@example.test') });
  const networkRes = await network.invoke();
  assert.equal(networkRes.code, 502);
  assertNoPii(networkRes);

  const slow = createKurzcheckHandler({
    environment,
    storageTimeoutMs: 10,
    logger: { error: () => {} },
    fetchImpl: (url, init) => new Promise((resolve, reject) => {
      init.signal.addEventListener('abort', () => reject(new Error('aborted')));
    }),
  });
  const slowRes = response();
  await slow(request(), slowRes);
  assert.equal(slowRes.code, 504);
  assert.deepEqual(slowRes.body, { error: 'storage_timeout' });
});

const RELAY_ENV = {
  ...environment,
  KURZCHECK_NOTIFY_WEBHOOK_URL: RELAY_URL,
  KURZCHECK_NOTIFY_WEBHOOK_SECRET: 'synthetic-relay-secret-0123456789abcdef',
};
const relayAccepted = { ok: true, status: 200, json: async () => ({ accepted: true }) };
const routes = (overrides = {}) => (url) => {
  if (url === RELAY_URL) return overrides.relay ?? relayAccepted;
  if (url.endsWith('/rpc/record_kurzcheck_notification')) return overrides.record ?? okResponse;
  return overrides.storage ?? okResponse;
};
const byUrl = (calls, part) => calls.filter(({ url }) => url.includes(part));
const FORBIDDEN_OUT = ['testperson', '040 1234567', 'test@example.test', '198.51.100.7', 'schwanger', 'vorsorge', 'klinikschutz', 'ikk', 'kasse', 'utm', 'meta'];
const assertClean = (value, label) => {
  const text = JSON.stringify(value).toLowerCase();
  for (const word of FORBIDDEN_OUT) assert.ok(!text.includes(word), `${label} enthält ${word}`);
};

test('ohne eingerichteten Weiterleiter geht kein Hinweis hinaus, die Anfrage ist trotzdem gespeichert', async () => {
  for (const env of [environment, { ...RELAY_ENV, KURZCHECK_NOTIFY_WEBHOOK_URL: 'https://n8n.example.test/webhook/x' }, { ...RELAY_ENV, KURZCHECK_NOTIFY_WEBHOOK_SECRET: 'kurz' }]) {
    const { calls, invoke } = setup({ env, reply: routes() });
    assert.equal((await invoke()).code, 200);
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /rpc\/submit_kurzcheck_lead$/);
  }
});

test('Eingang: erst speichern, dann Hinweis über den eigenen Weiterleiter, dann Vermerk in der Datenbank', async () => {
  const receivedAt = Date.UTC(2026, 10, 3, 13, 3);
  const { calls, invoke, logs } = setup({ env: RELAY_ENV, reply: routes(), now: () => receivedAt });
  const res = await invoke(request(payload({ utm: { utm_source: 'meta', utm_campaign: 'schwangere-vorsorge-a' } })));
  assert.equal(res.code, 200);
  assert.deepEqual(calls.map(({ url }) => url.replace('https://projekt.supabase.example/rest/v1/', '')), ['rpc/submit_kurzcheck_lead', RELAY_URL, 'rpc/record_kurzcheck_notification']);
  const [storage, relay, record] = calls;
  assert.equal(relay.init.method, 'POST');
  assert.equal(relay.init.redirect, 'error');
  assert.equal(relay.init.headers[RELAY_SECRET_HEADER], RELAY_ENV.KURZCHECK_NOTIFY_WEBHOOK_SECRET);
  assert.deepEqual(relay.body, {
    kind: 'eingang',
    request_id: storage.body.p_lead.id,
    consent_version: schwangerschaft.consent.version,
    received_at: '2026-11-03T13:03:00.000Z',
  });
  assertClean(relay.body, 'Hinweis');
  assert.deepEqual(record.body, { p_token: TOKEN, p_id: storage.body.p_lead.id, p_ok: true });
  assert.deepEqual(logs, []);
});

test('scheitert der Hinweis, bleibt die Anfrage gespeichert, die Datenbank vermerkt es und das Log nennt den Fehler', async () => {
  for (const relay of [
    { ok: false, status: 502, json: async () => ({ accepted: false }) },
    { ok: true, status: 200, json: async () => ({ accepted: false }) },
    { ok: true, status: 200, json: async () => { throw new Error('kein JSON'); } },
    new Error('Testperson test@example.test'),
  ]) {
    const { calls, invoke, logs } = setup({ env: RELAY_ENV, reply: (url) => { if (url === RELAY_URL && relay instanceof Error) throw relay; return routes({ relay })(url); } });
    const res = await invoke();
    assert.equal(res.code, 200);
    const record = byUrl(calls, 'record_kurzcheck_notification');
    assert.equal(record.length, 1);
    assert.equal(record[0].body.p_ok, false);
    assert.equal(logs.length, 1);
    assert.equal(JSON.parse(logs[0]).event, 'kurzcheck_hinweis_fehlgeschlagen');
    assertClean(logs, 'Log');
    assertNoPii(res);
  }
});

test('scheitert auch der Vermerk, steht das im Log, die Antwort bleibt 200', async () => {
  const { invoke, logs } = setup({ env: RELAY_ENV, reply: routes({ record: { ok: false, status: 500, json: async () => ({}) } }) });
  assert.equal((await invoke()).code, 200);
  assert.deepEqual(logs.map((line) => JSON.parse(line)), [{ event: 'kurzcheck_hinweis_status_fehlgeschlagen', status: 500 }]);
});

test('scheitert das Speichern, warnt ein Hinweis ohne Angaben aus der Anfrage, es gibt keinen Eingangshinweis', async () => {
  const receivedAt = Date.UTC(2026, 10, 3, 13, 3);
  const failed = setup({ env: RELAY_ENV, now: () => receivedAt, reply: routes({ storage: { ok: false, status: 403, json: async () => ({ message: 'kurzcheck_forbidden', details: 'Testperson' }) } }) });
  assert.equal((await failed.invoke()).code, 502);
  const relays = byUrl(failed.calls, RELAY_URL);
  assert.equal(relays.length, 1);
  assert.deepEqual(relays[0].body, { kind: 'fehler', reason: 'storage_failed', status: 403, received_at: '2026-11-03T13:03:00.000Z' });
  assert.equal(byUrl(failed.calls, 'record_kurzcheck_notification').length, 0);
  assert.deepEqual(failed.logs.map((line) => JSON.parse(line)), [{ event: 'kurzcheck_speichern_fehlgeschlagen', status: 403 }]);

  const missing = setup({ env: { ...RELAY_ENV, KURZCHECK_INGEST_TOKEN: '' }, reply: routes() });
  assert.equal((await missing.invoke()).code, 503);
  assert.equal(missing.calls.length, 1);
  assert.equal(missing.calls[0].body.kind, 'fehler');
  assert.equal(missing.calls[0].body.reason, 'not_configured');
  assert.equal(JSON.parse(missing.logs[0]).event, 'kurzcheck_nicht_eingerichtet');

  const slow = createKurzcheckHandler({
    environment: RELAY_ENV,
    storageTimeoutMs: 10,
    logger: { error: () => {} },
    fetchImpl: (url, init) => (url === RELAY_URL
      ? Promise.resolve(relayAccepted)
      : new Promise((resolve, reject) => init.signal.addEventListener('abort', () => reject(new Error('aborted'))))),
  });
  const slowRes = response();
  await slow(request(), slowRes);
  assert.equal(slowRes.code, 504);

  const braked = setup({ env: RELAY_ENV, reply: routes({ storage: { ok: false, status: 400, json: async () => ({ message: 'kurzcheck_rate_limited' }) } }) });
  assert.equal((await braked.invoke()).code, 429);
  assert.equal(byUrl(braked.calls, RELAY_URL).length, 0, 'Hinweis bei Bremse');
});

test('Prüfregel-Ablehnung meldet sich anders als ein Einrichtungsfehler, Warnungen haben ein eigenes Budget', async () => {
  const rejected = setup({ env: RELAY_ENV, reply: routes({ storage: { ok: false, status: 400, json: async () => ({ code: '23514' }) } }) });
  assert.equal((await rejected.invoke()).code, 502);
  assert.equal(byUrl(rejected.calls, RELAY_URL)[0].body.reason, 'storage_rejected');
  const server = setup({ env: RELAY_ENV, reply: routes({ storage: { ok: false, status: 500, json: async () => ({}) } }) });
  await server.invoke();
  assert.equal(byUrl(server.calls, RELAY_URL)[0].body.reason, 'storage_failed');

  // Viele Warnungen verbrauchen nicht das Budget der Eingangshinweise.
  let failing = true;
  const mixed = setup({ env: RELAY_ENV, reply: (url) => (failing && url.endsWith('submit_kurzcheck_lead') ? { ok: false, status: 500, json: async () => ({}) } : routes()(url)) });
  for (let index = 0; index < 12; index += 1) await mixed.invoke(request(payload(), { 'x-forwarded-for': `10.9.0.${index + 1}` }));
  assert.equal(byUrl(mixed.calls, RELAY_URL).length, 5, 'Warnungen je Stunde nicht begrenzt');
  failing = false;
  assert.equal((await mixed.invoke(request(payload(), { 'x-forwarded-for': '10.9.1.1' }))).code, 200);
  assert.equal(byUrl(mixed.calls, RELAY_URL).filter(({ body }) => body.kind === 'eingang').length, 1, 'Eingangshinweis wegen Warnungen zurückgehalten');
});

test('Hinweise sind je Stunde und je Tag begrenzt, Zurückgehaltenes bleibt für die Erinnerung offen', async () => {
  let time = 5_000_000;
  const { calls, invoke } = setup({ env: RELAY_ENV, reply: routes(), now: () => time });
  const relays = () => byUrl(calls, RELAY_URL).length;
  let address = 0;
  const burst = async (count) => {
    for (let index = 0; index < count; index += 1) {
      address += 1;
      assert.equal((await invoke(request(payload(), { 'x-forwarded-for': `10.0.${Math.floor(address / 250)}.${address % 250}` }))).code, 200);
    }
  };
  await burst(25);
  assert.equal(relays(), 20);
  assert.equal(byUrl(calls, 'record_kurzcheck_notification').length, 20, 'Vermerk für zurückgehaltene Hinweise');
  time += 60 * 60 * 1000;
  await burst(25);
  assert.equal(relays(), 40);
  time += 60 * 60 * 1000;
  await burst(5);
  assert.equal(relays(), 40, 'Tagesgrenze überschritten');
  time += 24 * 60 * 60 * 1000;
  await burst(1);
  assert.equal(relays(), 41);
});

test('Log nimmt nur feste Ereignisnamen und Statuszahlen an', () => {
  const lines = [];
  const logger = { error: (line) => lines.push(line) };
  logIncident('kurzcheck_hinweis_fehlgeschlagen', 401, logger);
  logIncident('etwas anderes mit test@example.test', 500, logger);
  logIncident('kurzcheck_speichern_fehlgeschlagen', 'Testperson', logger);
  assert.deepEqual(lines.map((line) => JSON.parse(line)), [
    { event: 'kurzcheck_hinweis_fehlgeschlagen', status: 401 },
    { event: 'kurzcheck_speichern_fehlgeschlagen', status: null },
  ]);
});

const n8nCode = read('docs/kurzcheck-hinweis/n8n-hinweis-code.txt');
const runN8n = (body, data = {}) => new Function('$json', '$getWorkflowStaticData', n8nCode)({ body }, () => data)[0].json;
const isoNow = () => new Date(Math.floor(Date.now() / 1000) * 1000).toISOString();

test('n8n-Weiterleiter: nur feste Arten und Felder, feste Adressen, Mail ohne Angaben aus der Anfrage', () => {
  const id = '0b5a7c1e-2f3d-4a8b-9c0d-1e2f3a4b5c6d';
  const valid = [
    { kind: 'eingang', request_id: id, consent_version: schwangerschaft.consent.version, received_at: isoNow() },
    { kind: 'fehler', reason: 'storage_failed', status: 403, received_at: isoNow() },
    { kind: 'fehler', reason: 'not_configured', status: null, received_at: isoNow() },
    { kind: 'fehler', reason: 'storage_rejected', status: 400, received_at: isoNow() },
    { kind: 'fehler', reason: 'storage_timeout', status: null, received_at: isoNow() },
    { kind: 'erinnerung', open: 3, open_overdue: 1, unannounced: 2, received_at: isoNow() },
    { kind: 'test', received_at: isoNow() },
  ];
  for (const body of valid) {
    const result = runN8n(body);
    assert.equal(result.ok, true, JSON.stringify(body));
    assert.deepEqual(Object.keys(result.payload).sort(), ['sender', 'subject', 'textContent', 'to']);
    assert.deepEqual(result.payload.sender, { name: 'Healio', email: 'info@healio.de' });
    assert.deepEqual(result.payload.to, [{ email: 'info@healio.de', name: 'Healio' }]);
    assert.ok(!/[–—]/.test(result.payload.textContent + result.payload.subject), 'Gedankenstrich in der Mail');
    for (const word of ['schwanger', 'gesundheit', 'vorsorge', 'ikk', 'krankenkasse', 'utm']) {
      assert.ok(!result.payload.textContent.toLowerCase().includes(word), `${body.kind}: ${word}`);
    }
  }
  assert.match(runN8n(valid[0]).payload.textContent, new RegExp(`Kennung: ${id}`));
  assert.match(runN8n(valid.find((body) => body.kind === 'erinnerung')).payload.textContent, /Ohne Eingangsmail: 2/);
  const timeout = runN8n(valid.find((body) => body.reason === 'storage_timeout')).payload;
  assert.match(timeout.subject, /Speichern unbestätigt/);
  assert.match(timeout.textContent, /kann trotzdem gespeichert sein/);
  assert.match(runN8n(valid.find((body) => body.reason === 'storage_rejected')).payload.textContent, /Prüfregel/);

  const invalid = [
    null, [], {}, { kind: 'unbekannt', received_at: isoNow() },
    { ...valid[0], first_name: 'Testperson' },
    { ...valid[0], email: 'test@example.test' },
    { ...valid[0], request_id: 'keine-kennung' },
    { ...valid[0], consent_version: 'schwangerschaft' },
    { ...valid[0], received_at: '2020-01-01T00:00:00.000Z' },
    { ...valid[0], received_at: 'gestern' },
    { kind: 'fehler', reason: 'Testperson', status: 403, received_at: isoNow() },
    { kind: 'erinnerung', open: '3', open_overdue: 1, unannounced: 2, received_at: isoNow() },
    { kind: 'test', received_at: isoNow(), note: 'x' },
  ];
  for (const body of invalid) assert.deepEqual(runN8n(body), { ok: false, status: 400 }, JSON.stringify(body));

  const data = {};
  const testMail = valid.find((body) => body.kind === 'test');
  for (let index = 0; index < 60; index += 1) assert.equal(runN8n(testMail, data).ok, true);
  assert.deepEqual(runN8n(testMail, data), { ok: false, status: 429 });
  assert.ok(!n8nCode.includes('/contacts'), 'Weiterleiter darf keine Brevo-Kontakte anlegen');
});

const REMINDER_ENV = { ...RELAY_ENV, CRON_SECRET: 'synthetic-cron-secret-0123456789abcdef' };
const reminderRequest = (headers = {}) => ({ method: 'GET', headers: { authorization: `Bearer ${REMINDER_ENV.CRON_SECRET}`, ...headers } });
const statusResponse = (status) => ({ ok: true, status: 200, json: async () => status });
const reminderSetup = ({ env = REMINDER_ENV, status = { checked_at: '2026-11-03T05:00:00+00:00', open: 2, open_overdue: 1, unannounced: 1 }, relay = relayAccepted, mark = okResponse } = {}) => {
  const calls = [];
  const logs = [];
  const handler = createReminderHandler({
    environment: env,
    now: () => Date.UTC(2026, 10, 3, 5, 0),
    logger: { error: (line) => logs.push(line) },
    fetchImpl: async (url, init) => {
      calls.push({ url, init, body: JSON.parse(init.body) });
      if (url === RELAY_URL) return relay;
      if (url.endsWith('/rpc/kurzcheck_reminder_status')) return typeof status === 'function' ? status() : statusResponse(status);
      if (url.endsWith('/rpc/mark_kurzcheck_reminded')) return mark;
      throw new Error(`unerwartet: ${url}`);
    },
  });
  const invoke = async (req = reminderRequest()) => { const res = response(); await handler(req, res); return res; };
  return { calls, logs, invoke };
};

test('Erinnerung: nur mit CRON_SECRET, meldet nur Zahlen und vermerkt Nachgemeldetes', async () => {
  assert.equal((await reminderSetup().invoke({ method: 'POST', headers: {} })).code, 405);
  assert.equal((await reminderSetup({ env: { ...REMINDER_ENV, CRON_SECRET: '' } }).invoke()).code, 503);
  for (const authorization of [undefined, 'Bearer falsch', `Bearer ${REMINDER_ENV.CRON_SECRET}x`, REMINDER_ENV.CRON_SECRET]) {
    const { calls, invoke } = reminderSetup();
    assert.equal((await invoke({ method: 'GET', headers: { authorization } })).code, 401, String(authorization));
    assert.equal(calls.length, 0);
  }

  const { calls, logs, invoke } = reminderSetup();
  const res = await invoke();
  assert.equal(res.code, 200);
  assert.deepEqual(res.body, { sent: true });
  assert.deepEqual(calls.map(({ url }) => url.split('/').pop()), ['kurzcheck_reminder_status', 'healio-kurzcheck-hinweis', 'mark_kurzcheck_reminded']);
  assert.deepEqual(calls[0].body, { p_token: TOKEN });
  assert.deepEqual(calls[1].body, { kind: 'erinnerung', open: 2, open_overdue: 1, unannounced: 1, received_at: '2026-11-03T05:00:00.000Z' });
  assert.deepEqual(calls[2].body, { p_token: TOKEN, p_until: '2026-11-03T05:00:00+00:00' });
  assert.deepEqual(logs, []);
});

test('Erinnerung: nichts offen heißt keine Mail, Fehler sind im Cron-Lauf und im Log sichtbar', async () => {
  const quiet = reminderSetup({ status: { checked_at: '2026-11-03T05:00:00+00:00', open: 4, open_overdue: 0, unannounced: 0 } });
  const quietRes = await quiet.invoke();
  assert.deepEqual([quietRes.code, quietRes.body], [200, { sent: false }]);
  assert.equal(quiet.calls.length, 1);

  const overdueOnly = reminderSetup({ status: { checked_at: '2026-11-03T05:00:00+00:00', open: 1, open_overdue: 1, unannounced: 0 } });
  assert.equal((await overdueOnly.invoke()).code, 200);
  assert.equal(byUrl(overdueOnly.calls, 'mark_kurzcheck_reminded').length, 0);

  const relayDown = reminderSetup({ relay: { ok: false, status: 502, json: async () => ({ accepted: false }) } });
  assert.equal((await relayDown.invoke()).code, 502);
  assert.equal(byUrl(relayDown.calls, 'mark_kurzcheck_reminded').length, 0, 'als gemeldet vermerkt, obwohl die Mail scheiterte');
  assert.deepEqual(relayDown.logs.map((line) => JSON.parse(line)), [{ event: 'kurzcheck_erinnerung_fehlgeschlagen', status: 502 }]);

  const statusDown = reminderSetup({ status: () => ({ ok: false, status: 403, json: async () => ({}) }) });
  assert.equal((await statusDown.invoke()).code, 502);
  assert.equal(JSON.parse(statusDown.logs[0]).event, 'kurzcheck_erinnerung_fehlgeschlagen');

  const broken = reminderSetup({ status: { checked_at: '2026-11-03T05:00:00+00:00', open: 'viele', open_overdue: 1, unannounced: 1 } });
  assert.equal((await broken.invoke()).code, 502);

  const unconfigured = reminderSetup({ env: { ...REMINDER_ENV, KURZCHECK_NOTIFY_WEBHOOK_SECRET: '' } });
  assert.equal((await unconfigured.invoke()).code, 503);
  assert.equal(JSON.parse(unconfigured.logs[0]).event, 'kurzcheck_nicht_eingerichtet');
});

test('Cron läuft einmal am Tag auf die Erinnerung (Hobby-Tarif)', () => {
  const vercel = JSON.parse(read('vercel.json'));
  assert.deepEqual(vercel.crons, [{ path: '/api/kurzcheck-erinnerung', schedule: '0 5 * * *' }]);
  assert.ok(fs.existsSync(new URL('../api/kurzcheck-erinnerung.js', import.meta.url)));
});

test('Rohdaten: Strom wird gelesen, zu große oder kaputte Daten werden abgelehnt', async () => {
  const stream = (text) => Object.assign(Readable.from([Buffer.from(text)]), {
    method: 'POST',
    headers: { origin: 'https://healio.de', 'content-type': 'application/json; charset=utf-8', 'x-forwarded-for': '198.51.100.20' },
  });
  const streamed = setup();
  const okRes = await streamed.invoke(stream(JSON.stringify(payload())));
  assert.equal(okRes.code, 200);
  assert.equal(streamed.calls.length, 1);

  const { calls, invoke } = setup();
  assert.equal((await invoke(request('{kaputt'))).code, 400);
  assert.equal((await invoke(request(JSON.stringify({ ...payload(), first_name: 'x'.repeat(9000) })))).code, 413);
  assert.equal((await invoke({ ...request(), headers: { ...request().headers, 'content-length': '9000' } })).code, 413);
  assert.equal(calls.length, 0);
});

test('Funktionen protokollieren nur über logIncident und laufen in Frankfurt', () => {
  const source = read('api/kurzcheck-lead.js');
  for (const file of ['api/kurzcheck-lead.js', 'api/kurzcheck-erinnerung.js']) {
    assert.ok(!/\bconsole\./.test(read(file)), `console.* in ${file}`);
  }
  const server = read('shared/kurzcheck-server.js');
  assert.equal((server.match(/logger\.error\(/g) || []).length, 1);
  assert.match(server, /logger\.error\(JSON\.stringify\(\{ event, status: code \}\)\);/);
  assert.ok(!/\bconsole\./.test(server));
  assert.ok(!/emailjs/i.test(source.replace(/weder an EmailJS/g, '')), 'EmailJS im EU-Weg');
  assert.ok(!/user[-_]agent/i.test(source), 'Browser-Kennung wird nicht gespeichert');
  assert.ok(!/rest\/v1\/kurzcheck_leads/.test(source + read('shared/kurzcheck-server.js')), 'direkter Tabellenzugriff statt Token-Schreibweg');
  assert.ok(!/api\.brevo\.com/.test(source + read('api/kurzcheck-erinnerung.js') + read('shared/kurzcheck-server.js')), 'Brevo direkt statt über den Weiterleiter');
  const vercel = JSON.parse(read('vercel.json'));
  assert.deepEqual(vercel.regions, ['fra1']);
});

test('Gesundheitsangaben laufen nie über EmailJS, das Formular nutzt die gemeinsame Nutzlast', () => {
  for (const config of Object.values(META_CHECKS)) {
    if (config.consent.healthData) assert.equal(config.endpoint, KURZCHECK_ENDPOINT, config.key);
  }
  assert.equal(naturheilkunde.endpoint, undefined);
  const kurzCheck = read('src/components/campaign/KurzCheck.jsx');
  assert.match(kurzCheck, /if \(config\.endpoint\) \{\s*await sendToEuRoute\(/);
  assert.match(kurzCheck, /if \(config\.consent\.healthData\) throw new Error\('health_data_requires_eu_route'\);/);
  assert.match(kurzCheck, /await fetch\(config\.endpoint,/);
  assert.match(kurzCheck, /body: JSON\.stringify\(buildKurzcheckRequest\(\{ config, answers, contact, search: location\.search \}\)\)/);
  assert.match(kurzCheck, /const \{ firstName, phone: telefon, email \} = readKurzcheckContact\(contact\);/);
  assert.match(kurzCheck, /const telefon = normalizeKurzcheckPhone\(contact\.telefon\);/);
  assert.match(kurzCheck, /isValidKurzcheckPhone\(telefon\)/);
  assert.match(kurzCheck, /isValidKurzcheckEmail\(email\)/);
  assert.ok(!/Art\. 9 Abs\. 2 lit\. a DSGVO/.test(kurzCheck), 'Mailtext erwähnt noch eine Gesundheitsangabe');
  for (const code of ['consent_version_outdated', 'invalid_answers', 'invalid_check', 'invalid_request', 'too_many_requests', 'invalid_phone', 'invalid_email']) {
    assert.ok(kurzCheck.includes(`${code}:`), `keine eigene Meldung für ${code}`);
  }
});

test('Migration: kein Direktzugriff für anon, Token-Schreibweg, Werte passend zur Konfiguration, Fristen', async () => {
  assert.ok(!fs.existsSync(new URL('../supabase/migrations', import.meta.url)), 'Migration darf nicht automatisch angewendet werden');
  const sql = read('docs/supabase/2026-10-19_kurzcheck_leads.sql');
  const code = sql.split('\n').filter((line) => !line.trim().startsWith('--')).join('\n');
  assert.match(sql, /NICHT AUSGEFÜHRT/);
  assert.match(code, /alter table public\.kurzcheck_leads enable row level security;/);
  assert.match(code, /alter table public\.kurzcheck_leads force row level security;/);
  assert.match(code, /revoke all on table public\.kurzcheck_leads from public, anon, authenticated;/);
  assert.ok(!/create policy/i.test(code), 'Policy angelegt');
  assert.ok(!/grant [^;]*on table public\.kurzcheck_leads to (anon|authenticated)/i.test(code), 'Tabellenrecht für anon oder authenticated');
  assert.match(code, /drop policy if exists anon_insert_kurzcheck_leads on public\.kurzcheck_leads;/);
  for (const signature of ['submit_kurzcheck_lead(text, jsonb)', 'record_kurzcheck_notification(text, uuid, boolean)', 'kurzcheck_reminder_status(text)', 'mark_kurzcheck_reminded(text, timestamptz)']) {
    const escaped = signature.replace(/[()]/g, '\\$&');
    assert.match(code, new RegExp(`revoke all on function public\\.${escaped} from public, anon, authenticated;`), signature);
    assert.match(code, new RegExp(`grant execute on function public\\.${escaped} to anon;`), signature);
    const name = signature.split('(')[0];
    const body = code.match(new RegExp(`create or replace function public\\.${name}\\([\\s\\S]*?\\n\\$\\$;`))[0];
    assert.match(body, /begin\s+if not private\.kurzcheck_token_valid\(p_token\) then\s+raise exception 'kurzcheck_forbidden'/, `${name} prüft das Token nicht zuerst`);
  }
  assert.equal((code.match(/grant execute on function/g) || []).length, 4, 'weitere Funktionen für anon freigegeben');
  assert.match(code, /token\.token_sha256 = pg_catalog\.sha256\(pg_catalog\.convert_to\(p_token, 'UTF8'\)\)/);
  const reminder = code.match(/create or replace function public\.kurzcheck_reminder_status[\s\S]*?\n\$\$;/)[0];
  for (const column of ['first_name', 'phone', 'email', 'thema', 'kasse', 'utm', 'ip_hash']) {
    assert.ok(!new RegExp(`\\b${column}\\b`).test(reminder), `Erinnerung liest ${column}`);
  }
  for (const table of ['kurzcheck_ingest_tokens', 'kurzcheck_consent_proofs']) {
    assert.match(code, new RegExp(`revoke all on table private\\.${table} from public, anon, authenticated;`), table);
    assert.match(code, new RegExp(`alter table private\\.${table} force row level security;`), table);
  }

  // Die Funktion schreibt genau die Spalten, die die Datenbankfunktion übernimmt.
  const insertColumns = code.match(/insert into public\.kurzcheck_leads \(([^)]*)\)/)[1].split(',').map((column) => column.trim()).sort();
  const { calls, invoke } = setup();
  await invoke();
  assert.deepEqual(Object.keys(calls[0].body.p_lead).sort(), insertColumns, 'Funktion und Datenbank schreiben andere Spalten');
  for (const forbidden of ['created_at', 'consent_at', 'status', 'notes']) assert.ok(!insertColumns.includes(forbidden), forbidden);

  const allowedValues = (column) => code
    .match(new RegExp(`check \\(${column} in \\(([^)]*)\\)\\)`))[1]
    .split(',').map((value) => value.trim().replace(/^'|'$/g, '')).sort();
  for (const step of schwangerschaft.steps) {
    assert.deepEqual(allowedValues(step.id), step.options.map((option) => option.value).sort(), step.id);
  }
  assert.deepEqual(allowedValues('check_key'), Object.keys(EU_CHECKS).sort());
  assert.match(code, /utm - array\['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'\]/);
  assert.match(code, /ip_hash ~ '\^\[0-9a-f\]\{64\}\$'/);
  assert.match(code, /where ip_hash = new\.ip_hash\s+and created_at > now\(\) - interval '10 minutes'\s+\) >= 5 then/);
  assert.match(code, /where created_at > now\(\) - interval '10 minutes'\s+\) >= 2000 then/);
  assert.match(code, /and \(token\.expires_at is null or token\.expires_at > now\(\)\)/);
  assert.match(code, /expires_at timestamptz,\n/);
  assert.match(code, /after delete on public\.kurzcheck_leads/);
  assert.match(code, /when old\.phone is not null then now\(\) \+ interval '5 years'\s+else pg_catalog\.date_trunc\('year', now\(\)\) \+ interval '4 years'/);
  assert.match(code, /revoked_at timestamptz,/);
  assert.match(code, /where created_at < now\(\) - interval '89 days'/);
  assert.match(code, /when new\.phone is not null then new\.consent_at \+ interval '5 years 90 days'/);
  assert.match(code, /else pg_catalog\.date_trunc\('year', new\.consent_at \+ interval '90 days'\) \+ interval '4 years'/);
  assert.match(code, /cron\.schedule\(\s*'kurzcheck-loeschfrist'/);
  const definers = code.match(/security definer\s+set search_path = ''/g) || [];
  assert.equal(definers.length, (code.match(/security definer/g) || []).length, 'security definer ohne leeren search_path');
  const proofTable = code.match(/create table if not exists private\.kurzcheck_consent_proofs \(([\s\S]*?)\n\);/)[1];
  for (const answer of ['thema', 'kasse', 'check_key', 'utm', 'ip_hash']) assert.ok(!new RegExp(`\\b${answer}\\b`).test(proofTable), `Nachweis enthält ${answer}`);
});

test('Datenschutzerklärung beschreibt den EU-Weg in beiden Sprachen', () => {
  const de = JSON.parse(read('src/i18n/locales/de/legal.json')).datenschutz;
  const en = JSON.parse(read('src/i18n/locales/en/legal.json')).datenschutz;
  assert.match(de.kurzCheckRecipients, /Kurzcheck Schwangerschaft läuft weder über EmailJS noch über unser Postfach/);
  assert.match(de.kurzCheckRecipients, /Vercel Inc\.[^.]*Frankfurt am Main/);
  assert.match(de.kurzCheckRecipients, /Supabase Inc\.[^.]*EU-Region Frankfurt/);
  assert.match(de.kurzCheckRecipients, /Cloudflare/);
  assert.match(de.kurzCheckRecipients, /Kurzcheck Naturheilkunde senden wir über EmailJS/);
  assert.match(de.kurzCheckRecipients, /Hetzner Online GmbH \(Deutschland\) über Brevo \(Sendinblue GmbH, Deutschland\) versendet\. Sie enthält nur eine zufällige Kennung, die Fassung Ihrer Einwilligung und den Eingangszeitpunkt, keine Angaben aus Ihrer Anfrage\./);
  assert.match(de.kurzCheckRecipients, /tägliche Übersicht, die nur die Zahl offener Anfragen nennt/);
  assert.match(de.kurzCheckStorage, /Löschlauf entfernt sie nach spätestens 90 Tagen/);
  assert.match(de.kurzCheckStorage, /Haben Sie eine Telefonnummer angegeben, bewahren wir diesen Nachweis fünf Jahre auf, gerechnet ab dem Abschluss Ihrer Anfrage/);
  assert.match(de.kurzCheckStorage, /bis zum Ende des dritten Kalenderjahres auf, das auf den Abschluss Ihrer Anfrage folgt/);
  assert.match(de.kurzCheckLegalBasis, /auf Grundlage Ihrer ausdrücklichen Einwilligung nach Art\. 9 Abs\. 2 lit\. a DSGVO/);
  assert.match(de.kurzCheckLegalBasis, /Für den Nachweis Ihrer Einwilligung gilt zusätzlich Art\. 9 Abs\. 2 lit\. f DSGVO/);
  assert.ok(!/nur mit Ihrer ausdrücklichen Einwilligung/.test(de.kurzCheckLegalBasis));
  assert.match(en.kurzCheckLegalBasis, /Article 9\(2\)\(f\) GDPR additionally applies/);
  assert.match(en.kurzCheckStorage, /counted from the completion of your request/);
  assert.match(de.kurzCheckStorage, /Ohne Telefonnummer bewahren wir ihn bis zum Ende des dritten Kalenderjahres auf/);
  assert.match(de.kurzCheckStorage, /Art\. 9 Abs\. 2 lit\. f DSGVO/);
  assert.match(de.kurzCheckText, /pseudonymisierten Prüfwert Ihrer IP-Adresse, den wir mit einem geheimen Schlüssel bilden/);
  assert.ok(!/nicht rückrechenbar/.test(de.kurzCheckText));
  assert.match(de.kurzCheckLegalBasis, /Art\. 6 Abs\. 1 lit\. f DSGVO/);
  assert.match(de.emailJsText, /Kurzcheck Schwangerschaft läuft nicht über EmailJS/);
  assert.match(en.kurzCheckRecipients, /pregnancy check go neither through EmailJS nor through our inbox/);
  assert.match(en.kurzCheckRecipients, /Supabase Inc\.[^.]*EU region Frankfurt/);
  assert.match(en.kurzCheckRecipients, /Hetzner Online GmbH \(Germany\) sends through Brevo \(Sendinblue GmbH, Germany\)\. It contains only a random identifier/);
  assert.match(en.kurzCheckRecipients, /daily overview states only the number of open requests/);
  assert.match(en.kurzCheckStorage, /automatic deletion run removes them after 90 days/);
  assert.match(en.kurzCheckStorage, /Without a telephone number, we keep it until the end of the third calendar year/);
  assert.match(en.kurzCheckStorage, /Article 9\(2\)\(f\) GDPR/);
  assert.match(en.kurzCheckText, /pseudonymised check value of your IP address, created with a secret key/);
  assert.match(en.emailJsText, /pregnancy check does not use EmailJS/);
  for (const text of [de.kurzCheckText, de.kurzCheckLegalBasis, de.kurzCheckRecipients, de.kurzCheckStorage, en.kurzCheckText, en.kurzCheckRecipients, en.kurzCheckStorage]) {
    assert.ok(!/[–—]/.test(text), 'Gedankenstrich im Datenschutztext');
  }
  for (const text of [de.kurzCheckText, de.kurzCheckLegalBasis, de.kurzCheckRecipients, de.kurzCheckStorage]) {
    assert.ok(!/\b(du|dein|deine|dich|dir)\b/i.test(text), 'Du-Form im Datenschutztext');
  }
});
