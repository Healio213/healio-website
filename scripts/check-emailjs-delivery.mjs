import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { transformSync } from 'esbuild';

// Execute the real adapter with every imported dependency replaced. No network,
// provider configuration, personal contact data or real delivery is accessed.
const source = fs.readFileSync(new URL('../src/services/emailjsService.js', import.meta.url), 'utf8');
const { code } = transformSync(source, { format: 'cjs', target: 'es2022' });
// Die echte Weiterleitung an die Anfragen-Zentrale, ebenfalls ohne Netz.
const zentraleSource = fs.readFileSync(new URL('../src/lib/anfragen-zentrale.js', import.meta.url), 'utf8');
const { code: zentraleCode } = transformSync(zentraleSource, { format: 'cjs', target: 'es2022', logLevel: 'silent' });
function ladeZentrale(fetchImpl, { referrer = '', hostname = 'healio.de', pathname = '/check/naturheilkunde' } = {}) {
  const module = { exports: {} };
  vm.runInNewContext(zentraleCode, {
    module, exports: module.exports, require() { throw new Error('keine Abhaengigkeit erwartet'); },
    document: { referrer, documentElement: { lang: 'de' } },
    window: { location: { hostname, pathname } },
    crypto: { randomUUID: () => '11111111-2222-4333-8444-555555555555' },
    fetch: fetchImpl, AbortController, setTimeout, clearTimeout, URL,
  });
  return module.exports;
}
const syntheticForm = {
  from_name: 'Synthetic Test', from_email: 'test@example.invalid',
  phone: 'synthetic-phone', company: '', message: 'Synthetic callback request',
};

function harness({ failingTracker, rejectDelivery = false, measurementAllowed = true, clickId = '', zentraleOk = false, utm = null } = {}) {
  const calls = { deliveries: [], trackers: [], emitted: [], logs: [], zentrale: [] };
  const accepted = { status: 200, text: 'OK' };
  const deliveryError = new Error('synthetic-private-provider-detail');
  const tracker = (name) => (...args) => {
    calls.trackers.push([name, ...args]);
    if (failingTracker === name) throw new Error('synthetic-private-measurement-detail');
    if (measurementAllowed) calls.emitted.push([name, ...args]);
    return measurementAllowed;
  };
  const dependencies = {
    '@emailjs/browser': {
      init() {},
      async send(...args) {
        calls.deliveries.push(args);
        if (rejectDelivery) throw deliveryError;
        return accepted;
      },
    },
    '@/config/emailjs': { EMAILJS_CONFIG: { PUBLIC_KEY: 'synthetic-public', SERVICE_ID: 'synthetic-service', TEMPLATE_ID: 'synthetic-template' } },
    '@/lib/analytics': { trackEvent: tracker('analytics') },
    '@/lib/meta-pixel': { trackMetaLead: tracker('meta') },
    '@/lib/google-ads': { readGoogleClickId: () => clickId, trackGoogleAdsLead: tracker('ads') },
    '@/lib/campaign-landing': {
      readCampaignUtm: () => (utm ? { ...utm } : null),
      describeCampaignSource: () => (utm ? Object.entries(utm).map(([k, v]) => `${k}: ${v}`).join('\n') : 'keine Kampagnenmerkmale'),
    },
    '@/lib/anfragen-zentrale': {
      baueZentraleAnfrage: ({ params, utm: u, gclid }) => ({ ref: 'web-synthetic', formular: params.page_source, name: params.from_name, nachricht: params.message, utm: u, gclid: Boolean(gclid) }),
      async sendeAnZentrale(anfrage) { calls.zentrale.push(anfrage); return zentraleOk; },
    },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require(id) {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected dependency: ${id}`);
      return dependencies[id];
    },
    console: { error: (...args) => calls.logs.push(args) },
    window: { location: { search: '' } },
  });
  return { service: module.exports.emailjsService, calls, accepted, deliveryError };
}

test('accepted delivery preserves the existing payload and each existing measurement', async () => {
  const { service, calls, accepted } = harness({ clickId: 'synthetic-click-id' });
  const result = await service.sendEmail(syntheticForm, 'Rückruf Zahn');
  assert.equal(result.success, true);
  assert.equal(result.response, accepted);
  assert.equal(calls.deliveries.length, 1);
  const [serviceId, templateId, payload] = calls.deliveries[0];
  assert.equal(serviceId, 'synthetic-service');
  assert.equal(templateId, 'synthetic-template');
  assert.deepEqual(JSON.parse(JSON.stringify(payload)), {
    ...syntheticForm, page_source: 'Rückruf Zahn', gclid: 'synthetic-click-id', to_email: 'info@healio.de',
  });
  assert.deepEqual(JSON.parse(JSON.stringify(calls.trackers)), [
    ['analytics', 'generate_lead', { component: 'contact_form', placement: 'rueckruf-zahn' }],
    ['meta'], ['ads'],
  ]);
  assert.equal(calls.logs.length, 0);
});

for (const failingTracker of ['analytics', 'meta', 'ads']) {
  test(`${failingTracker} failure cannot turn an accepted delivery into failure`, async () => {
    const { service, calls, accepted } = harness({ failingTracker });
    const result = await service.sendEmail(syntheticForm, 'Kontakt');
    assert.equal(result.success, true);
    assert.equal(result.response, accepted);
    assert.equal(calls.deliveries.length, 1);
    assert.deepEqual(calls.trackers.map(([name]) => name), ['analytics', 'meta', 'ads']);
    assert.equal(calls.logs.length, 0);
  });
}

test('denied measurement remains delegated to the existing consent-gated functions', async () => {
  const { service, calls } = harness({ measurementAllowed: false });
  assert.equal((await service.sendEmail(syntheticForm, 'Kontakt')).success, true);
  assert.equal(calls.deliveries.length, 1);
  assert.equal(calls.deliveries[0][2].gclid, '');
  assert.equal(calls.emitted.length, 0);
});

test('delivery rejection stays a failure, emits no success measurements and logs no provider detail', async () => {
  const { service, calls, deliveryError } = harness({ rejectDelivery: true });
  await assert.rejects(service.sendEmail(syntheticForm, 'Kontakt'), (error) => error === deliveryError);
  assert.equal(calls.deliveries.length, 1);
  assert.equal(calls.trackers.length, 0);
  assert.deepEqual(calls.logs, [['EmailJS: Versand konnte nicht bestätigt werden.']]);
});

test('every submission also goes to the Anfragen-Zentrale, before the mail is extended', async () => {
  const utm = { utm_source: 'meta', utm_medium: 'paid' };
  const { service, calls } = harness({ utm, clickId: 'synthetic-click-id' });
  assert.equal((await service.sendEmail(syntheticForm, 'Kontakt')).success, true);
  assert.equal(calls.zentrale.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(calls.zentrale[0])), {
    ref: 'web-synthetic', formular: 'Kontakt', name: 'Synthetic Test', nachricht: 'Synthetic callback request', utm, gclid: true,
  });
  assert.match(calls.deliveries[0][2].message, /Kampagne:\nutm_source: meta/, 'mail keeps the campaign block');
});

test('mail failure with the hub holding the request counts as delivered and flags the missing mail', async () => {
  const { service, calls } = harness({ rejectDelivery: true, zentraleOk: true });
  const result = await service.sendEmail(syntheticForm, 'Kontakt');
  assert.equal(result.success, true);
  assert.equal(calls.zentrale.length, 2);
  assert.equal(calls.zentrale[1].mail, 'fehler');
  assert.deepEqual(calls.trackers.map(([name]) => name), ['analytics', 'meta', 'ads'], 'a secured request is a lead');
});

test('hub payload: form fields, page, referrer host only, one key per form for corrections, never throws', async () => {
  const gesendet = [];
  const z = ladeZentrale(async (url, init) => { gesendet.push({ url, init }); return { ok: true }; }, { referrer: 'https://l.instagram.com/?u=x&e=y' });
  const anfrage = z.baueZentraleAnfrage({ params: { page_source: 'Meta-Check Naturheilkunde', from_name: 'Synth', from_email: 's@example.invalid', phone: '0176', company: '', message: 'Was ist dir wichtig? Osteopathie' }, utm: { utm_source: 'meta' }, gclid: '' });
  assert.equal(anfrage.ref, 'web-11111111222243338444555555555555');
  assert.equal(anfrage.verweis, 'l.instagram.com');
  assert.equal(anfrage.seite, '/check/naturheilkunde');
  assert.equal(anfrage.sprache, 'de');
  assert.equal(anfrage.gclid, false);
  assert.equal(z.zentraleKennung('Meta-Check Naturheilkunde'), anfrage.ref, 'same form, same key');
  assert.equal(await z.sendeAnZentrale(anfrage), true);
  assert.equal(gesendet[0].url, 'https://anfragen.healio.de/api/eingang');
  assert.equal(gesendet[0].init.headers['Content-Type'], 'text/plain;charset=UTF-8');
  assert.equal(gesendet[0].init.keepalive, true);
  assert.equal(gesendet[0].init.credentials, 'omit');
  assert.deepEqual(JSON.parse(gesendet[0].init.body).utm, { utm_source: 'meta' });
  const eigeneSeite = ladeZentrale(async () => ({ ok: true }), { referrer: 'https://www.healio.de/zahn' });
  assert.equal(eigeneSeite.baueZentraleAnfrage({ params: { page_source: 'X' } }).verweis, '', 'own site is no referrer');
  const kaputt = ladeZentrale(async () => { throw new Error('offline'); });
  assert.equal(await kaputt.sendeAnZentrale({}), false);
  const abgelehnt = ladeZentrale(async () => ({ ok: false }));
  assert.equal(await abgelehnt.sendeAnZentrale({}), false);
});
