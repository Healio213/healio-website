import assert from 'node:assert/strict';
import { calculateIkkBonus } from '../src/lib/ikkBonusCalculator.js';

const activityDefs = [
  { id: 'impfung', cash: 5, subsidy: 15, countable: true, max: 8 },
  { id: 'mutterschaft', cash: 10, subsidy: 30, countable: true, max: 12 },
];

assert.deepEqual(calculateIkkBonus({
  activityDefs,
  selectedActivities: {
    impfung: 999,
    mutterschaft: 999,
  },
  hasRegularActivity: false,
}), {
  totalCashBonus: 160,
  totalSubsidyPotential: 480,
}, 'Oversized state must be capped independently of the counter controls.');

assert.deepEqual(calculateIkkBonus({
  activityDefs,
  selectedActivities: {
    impfung: Number.NaN,
    mutterschaft: -4,
  },
  hasRegularActivity: false,
}), {
  totalCashBonus: 0,
  totalSubsidyPotential: 0,
}, 'Invalid or negative counter state must fail closed.');

console.log('Ambulant bonus calculator model caps passed.');
