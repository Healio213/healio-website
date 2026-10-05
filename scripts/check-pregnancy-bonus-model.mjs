import assert from 'node:assert/strict';
import { test } from 'node:test';

const model = await import('../src/lib/pregnancyBonus.js').catch(() => ({}));
const full = { checkups: 10, course: true, studio: true, bmi: true, bloodPressure: true, dentalFirst: true, dentalSecond: true, sameYear: true };

test('the personal check starts with no assumed activities or premium', () => {
  assert.equal(typeof model.calculatePregnancyBonus, 'function', 'Missing personal bonus model');
  assert.deepEqual(model.calculatePregnancyBonus(), { cash: 0, potential: 0, applied: null, remaining: null, blockedStatus: false });
});
test('ten proven checkups and six eligible items reproduce 630, alternatively 210 cash', () => {
  const result = model.calculatePregnancyBonus(full, '800');
  assert.deepEqual(result, { cash: 210, potential: 630, applied: 630, remaining: 170, blockedStatus: false });
});
test('a partial year premium caps subsidy without paying unused potential as cash', () => {
  const result = model.calculatePregnancyBonus(full, '132,39');
  assert.equal(result.applied, 132.39);
  assert.equal(result.remaining, 0);
  assert.equal(result.cash, 210);
  assert.equal(model.calculatePregnancyBonus(full, '0').applied, 0);
});
test('partial activity selection and missing regular activity alter the result', () => {
  assert.equal(model.calculatePregnancyBonus({ checkups: 4, course: true, bloodPressure: true, dentalFirst: true, sameYear: true }).potential, 285);
  assert.deepEqual(model.calculatePregnancyBonus({ checkups: 4, bmi: true, bloodPressure: true, sameYear: true }), { cash: 40, potential: 120, applied: null, remaining: null, blockedStatus: true });
});
test('unconfirmed bonus year and malformed counts cannot create an entitlement', () => {
  assert.equal(model.calculatePregnancyBonus({ ...full, sameYear: false }).potential, 0);
  for (const checkups of [-1, 1.5, Infinity, Number.MAX_SAFE_INTEGER, 'broken']) {
    assert.equal(model.calculatePregnancyBonus({ checkups, sameYear: true }).potential, 0);
  }
  for (const premium of ['', null, undefined, '-1', 'abc', '1e9', '10.999']) {
    assert.equal(model.calculatePregnancyBonus(full, premium).applied, null);
  }
});
test('only the neutral known source survives the onward link, never input data', () => {
  assert.equal(model.getPregnancyOnwardPath('?src=reel-f05&checkups=10&email=private'), '/ambulant?src=reel-f05#tarifwahl');
  assert.equal(model.getPregnancyOnwardPath('?src=schwanger&bonus=630'), '/ambulant?src=bonus-check#tarifwahl');
  // Nur eine gültige Klick-Kennung der Anzeige darf mit (Frank 05.10.2026),
  // nie Kampagnencodes, Herkunftscodes oder Antworten.
  assert.equal(
    model.getPregnancyOnwardPath('?gclid=TestKlick_1234567890&utm_campaign=GOOG_Search_Schwanger_2026-09&ref=gads-s1&checkups=8'),
    '/ambulant?src=bonus-check&gclid=TestKlick_1234567890#tarifwahl',
  );
  assert.equal(
    model.getPregnancyOnwardPath('?src=reel-f05&gbraid=TestBraid_1234567890&wbraid=TestWbraid_123456789'),
    '/ambulant?src=reel-f05&gbraid=TestBraid_1234567890&wbraid=TestWbraid_123456789#tarifwahl',
  );
  assert.equal(model.getPregnancyOnwardPath('?gclid=x%22%3E%3Cscript'), '/ambulant?src=bonus-check#tarifwahl');
});
