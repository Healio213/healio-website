import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { transformSync } from 'esbuild';

// Execute the real adapter with every imported dependency replaced. No network,
// provider configuration, personal contact data or real delivery is accessed.
const source = fs.readFileSync(new URL('../src/services/emailjsService.js', import.meta.url), 'utf8');
const { code } = transformSync(source, { format: 'cjs', target: 'es2022' });
const syntheticForm = {
  from_name: 'Synthetic Test', from_email: 'test@example.invalid',
  phone: 'synthetic-phone', company: '', message: 'Synthetic callback request',
};

function harness({ failingTracker, rejectDelivery = false, measurementAllowed = true, clickId = '' } = {}) {
  const calls = { deliveries: [], trackers: [], emitted: [], logs: [] };
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
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require(id) {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected dependency: ${id}`);
      return dependencies[id];
    },
    console: { error: (...args) => calls.logs.push(args) },
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
