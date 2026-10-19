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
  let counter = 0;
  const handler = createKurzcheckHandler({
    environment: env,
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
  return { calls, invoke };
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

test('utm: nur die fünf Kampagnenfelder, gekürzt, ohne Klick-Kennungen', () => {
  const utm = buildUtm({ utm_source: ' meta ', utm_term: 'x'.repeat(300), fbclid: 'IwAR123', gclid: 'abc', referrer: 'https://l.instagram.com/?u=x' });
  assert.deepEqual(Object.keys(utm), ['utm_source', 'utm_term']);
  assert.equal(utm.utm_source, 'meta');
  assert.equal(utm.utm_term.length, 200);
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
    fetchImpl: (url, init) => new Promise((resolve, reject) => {
      init.signal.addEventListener('abort', () => reject(new Error('aborted')));
    }),
  });
  const slowRes = response();
  await slow(request(), slowRes);
  assert.equal(slowRes.code, 504);
  assert.deepEqual(slowRes.body, { error: 'storage_timeout' });
});

test('ohne KURZCHECK_NOTIFY_BREVO_KEY geht keine Benachrichtigung hinaus', async () => {
  for (const key of [undefined, '', '   ', 'schluessel\nmit-umbruch']) {
    const { calls, invoke } = setup({ env: { ...environment, KURZCHECK_NOTIFY_BREVO_KEY: key } });
    assert.equal((await invoke()).code, 200);
    assert.equal(calls.length, 1, String(key));
    assert.ok(!calls.some(({ url }) => url.includes('brevo')));
  }
});

test('Benachrichtigung über Brevo enthält nur Kennung, Fassung und Eingang', async () => {
  const receivedAt = Date.UTC(2026, 10, 3, 13, 3);
  const { calls, invoke } = setup({ env: { ...environment, KURZCHECK_NOTIFY_BREVO_KEY: 'synthetic-brevo-key' }, now: () => receivedAt });
  const res = await invoke(request(payload({ utm: { utm_source: 'meta', utm_campaign: 'schwangere-vorsorge-a' } })));
  assert.equal(res.code, 200);
  assert.equal(calls.length, 2);
  const [storage, notify] = calls;
  assert.match(storage.url, /\/rest\/v1\/rpc\/submit_kurzcheck_lead$/);
  assert.equal(notify.url, 'https://api.brevo.com/v3/smtp/email');
  assert.equal(notify.init.method, 'POST');
  assert.equal(notify.init.headers['api-key'], 'synthetic-brevo-key');
  assert.equal(notify.init.redirect, 'error');
  assert.deepEqual(Object.keys(notify.body).sort(), ['sender', 'subject', 'textContent', 'to']);
  assert.deepEqual(notify.body.sender, { name: 'Healio', email: 'info@healio.de' });
  assert.deepEqual(notify.body.to, [{ email: 'info@healio.de' }]);
  assert.equal(notify.body.subject, 'Neue Kurzcheck-Anfrage');
  const lead = storage.body.p_lead;
  assert.match(notify.body.textContent, new RegExp(`Kennung: ${lead.id}`));
  assert.match(notify.body.textContent, new RegExp(`Fassung der Einwilligung: ${schwangerschaft.consent.version}`));
  assert.match(notify.body.textContent, /Eingang: 03\.11\.2026, 14:03 Uhr/);
  const outgoing = JSON.stringify(notify.body).toLowerCase();
  const forbidden = [
    'testperson', '040 1234567', 'test@example.test', '198.51.100.7', lead.ip_hash, TOKEN,
    'schwanger', 'vorsorge', 'klinikschutz', 'ikk', 'kasse', 'meta', 'utm', 'gesundheit', 'art. 9',
    ...schwangerschaft.steps.flatMap((step) => step.options.map((option) => option.label.toLowerCase())),
  ];
  for (const value of forbidden) assert.ok(!outgoing.includes(String(value).toLowerCase()), `Benachrichtigung enthält ${value}`);
});

test('Benachrichtigungen sind je Stunde und je Tag begrenzt', async () => {
  let time = 5_000_000;
  const { calls, invoke } = setup({ env: { ...environment, KURZCHECK_NOTIFY_BREVO_KEY: 'synthetic-brevo-key' }, now: () => time });
  const mails = () => calls.filter(({ url }) => url.includes('brevo')).length;
  let address = 0;
  const burst = async (count) => {
    for (let index = 0; index < count; index += 1) {
      address += 1;
      assert.equal((await invoke(request(payload(), { 'x-forwarded-for': `10.0.${Math.floor(address / 250)}.${address % 250}` }))).code, 200);
    }
  };
  await burst(25);
  assert.equal(mails(), 20);
  time += 60 * 60 * 1000;
  await burst(25);
  assert.equal(mails(), 40);
  time += 60 * 60 * 1000;
  await burst(5);
  assert.equal(mails(), 40, 'Tagesgrenze überschritten');
  time += 24 * 60 * 60 * 1000;
  await burst(1);
  assert.equal(mails(), 41);
});

test('scheitert das Speichern, warnt eine Mail ohne Angaben aus der Anfrage', async () => {
  const env = { ...environment, KURZCHECK_NOTIFY_BREVO_KEY: 'synthetic-brevo-key' };
  const receivedAt = Date.UTC(2026, 10, 3, 13, 3);
  const forbidden = setup({ env, now: () => receivedAt, reply: (url) => (url.includes('brevo') ? okResponse : { ok: false, status: 403, json: async () => ({ message: 'kurzcheck_forbidden' }) }) });
  assert.equal((await forbidden.invoke()).code, 502);
  const [alert] = forbidden.calls.filter(({ url }) => url.includes('brevo'));
  assert.ok(alert, 'keine Warnung');
  assert.equal(alert.body.subject, 'Kurzcheck: Anfrage konnte nicht gespeichert werden');
  assert.match(alert.body.textContent, /Fehler: storage_failed \(Status 403\)/);
  assert.match(alert.body.textContent, /Zeit: 03\.11\.2026, 14:03 Uhr/);
  const text = JSON.stringify(alert.body).toLowerCase();
  for (const value of ['testperson', '040 1234567', 'test@example.test', '198.51.100.7', 'schwanger', 'vorsorge', 'ikk', TOKEN.toLowerCase()]) {
    assert.ok(!text.includes(value), `Warnung enthält ${value}`);
  }

  const missing = setup({ env: { ...env, KURZCHECK_INGEST_TOKEN: '' } });
  assert.equal((await missing.invoke()).code, 503);
  assert.equal(missing.calls.length, 1);
  assert.match(missing.calls[0].body.textContent, /Fehler: not_configured/);

  const braked = setup({ env, reply: (url) => (url.includes('brevo') ? okResponse : { ok: false, status: 400, json: async () => ({ message: 'kurzcheck_rate_limited' }) }) });
  assert.equal((await braked.invoke()).code, 429);
  assert.equal(braked.calls.filter(({ url }) => url.includes('brevo')).length, 0, 'Warnung bei Bremse');

  const quiet = setup({ env: { ...environment, KURZCHECK_INGEST_TOKEN: '' } });
  assert.equal((await quiet.invoke()).code, 503);
  assert.equal(quiet.calls.length, 0, 'ohne Brevo-Schlüssel geht nichts hinaus');
});

test('Ausfall der Benachrichtigung ändert nichts an der gespeicherten Anfrage', async () => {
  const env = { ...environment, KURZCHECK_NOTIFY_BREVO_KEY: 'synthetic-brevo-key' };
  const thrown = setup({ env, reply: (url) => { if (url.includes('brevo')) throw new Error('Testperson test@example.test'); return okResponse; } });
  const thrownRes = await thrown.invoke();
  assert.equal(thrownRes.code, 200);
  assertNoPii(thrownRes);

  const rejected = setup({ env, reply: (url) => (url.includes('brevo') ? { ok: false, status: 401 } : okResponse) });
  assert.equal((await rejected.invoke()).code, 200);

  const slow = createKurzcheckHandler({
    environment: env,
    notifyTimeoutMs: 10,
    fetchImpl: (url, init) => (url.includes('brevo')
      ? new Promise((resolve, reject) => init.signal.addEventListener('abort', () => reject(new Error('aborted'))))
      : Promise.resolve(okResponse)),
  });
  const slowRes = response();
  await slow(request(), slowRes);
  assert.equal(slowRes.code, 200);
});

test('keine Eingangsmail ohne gespeicherte Anfrage', async () => {
  const env = { ...environment, KURZCHECK_NOTIFY_BREVO_KEY: 'synthetic-brevo-key' };
  const failed = setup({ env, reply: (url) => (url.includes('brevo') ? okResponse : { ok: false, status: 409, json: async () => ({}) }) });
  assert.equal((await failed.invoke()).code, 502);
  assert.ok(!failed.calls.some(({ body }) => body.subject === 'Neue Kurzcheck-Anfrage'), 'Eingangsmail trotz Fehler');

  const honeypot = setup({ env });
  assert.equal((await honeypot.invoke(request({ ...payload(), healio_website: 'x' }))).code, 200);
  assert.equal(honeypot.calls.length, 0);

  const invalid = setup({ env });
  assert.equal((await invalid.invoke(request(payload({ consent_health_data: false })))).code, 400);
  assert.equal(invalid.calls.length, 0);
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

test('Funktion schreibt nichts ins Log und läuft in Frankfurt', () => {
  const source = read('api/kurzcheck-lead.js');
  assert.ok(!/\bconsole\./.test(source), 'console.* in api/kurzcheck-lead.js');
  assert.ok(!/emailjs/i.test(source.replace(/weder an EmailJS/g, '')), 'EmailJS im EU-Weg');
  assert.ok(!/user[-_]agent/i.test(source), 'Browser-Kennung wird nicht gespeichert');
  assert.ok(!/rest\/v1\/kurzcheck_leads/.test(source), 'direkter Tabellenzugriff statt Token-Schreibweg');
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
  assert.match(code, /grant execute on function public\.submit_kurzcheck_lead\(text, jsonb\) to anon;/);
  assert.match(code, /revoke all on function public\.submit_kurzcheck_lead\(text, jsonb\) from public, anon, authenticated;/);
  assert.match(code, /token\.token_sha256 = pg_catalog\.sha256\(pg_catalog\.convert_to\(p_token, 'UTF8'\)\)/);
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
  assert.match(de.kurzCheckRecipients, /über Brevo \(Sendinblue GmbH, Deutschland\) versenden\. Sie enthält nur eine zufällige Kennung, die Fassung Ihrer Einwilligung und den Eingangszeitpunkt, keine Angaben aus Ihrer Anfrage\./);
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
  assert.match(en.kurzCheckRecipients, /Brevo \(Sendinblue GmbH, Germany\)[^.]*\. It contains only a random identifier/);
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
