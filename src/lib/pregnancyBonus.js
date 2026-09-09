import { calculateIkkBonus } from './ikkBonusCalculator.js';

// IKK classic 2026, checked 2026-09-08 against the programme and factsheet.
// This is a limited illustration, not a fund comparison or an award decision.
export const PREGNANCY_BONUS_ITEMS = [
  { id: 'checkups', cash: 10, subsidy: 30, countable: true, max: Number.MAX_SAFE_INTEGER },
  { id: 'course', cash: 25, subsidy: 75, category: 'regular' },
  { id: 'studio', cash: 25, subsidy: 75, category: 'regular' },
  { id: 'bmi', cash: 25, subsidy: 75, category: 'status' },
  { id: 'bloodPressure', cash: 25, subsidy: 75, category: 'status' },
  { id: 'dentalFirst', cash: 5, subsidy: 15 },
  { id: 'dentalSecond', cash: 5, subsidy: 15 },
];

export function calculatePregnancyBonus(selection = {}, eligiblePaidPremium) {
  const selectedActivities = {};
  for (const item of PREGNANCY_BONUS_ITEMS) {
    const raw = selection[item.id];
    selectedActivities[item.id] = item.countable
      ? (Number.isSafeInteger(Number(raw)) && Number(raw) >= 0
        && Number.isSafeInteger(Number(raw) * item.subsidy * 100 + 33000) ? Number(raw) : 0)
      : raw === true;
  }
  const hasRegularActivity = selectedActivities.course || selectedActivities.studio;
  const blockedStatus = !hasRegularActivity && (selectedActivities.bmi || selectedActivities.bloodPressure);
  const totals = calculateIkkBonus({
    activityDefs: PREGNANCY_BONUS_ITEMS,
    selectedActivities: selection.sameYear === true ? selectedActivities : {},
    hasRegularActivity,
  });
  const text = String(eligiblePaidPremium ?? '').trim();
  const validPremium = /^\d+(?:[.,]\d{1,2})?$/.test(text);
  const parsed = Number(text.replace(',', '.'));
  const cents = validPremium && Number.isSafeInteger(Math.round(parsed * 100))
    ? Math.round(parsed * 100) : null;
  const potential = totals.totalSubsidyPotential;
  const appliedCents = cents === null ? null : Math.min(potential * 100, cents);
  return {
    cash: totals.totalCashBonus,
    potential,
    applied: appliedCents === null ? null : appliedCents / 100,
    remaining: appliedCents === null ? null : (cents - appliedCents) / 100,
    blockedStatus: Boolean(blockedStatus),
  };
}

// Never forward arbitrary query parameters, calculated amounts or answers.
export function getPregnancyOnwardPath(search = '') {
  const source = new URLSearchParams(search).get('src') === 'reel-f05' ? 'reel-f05' : 'bonus-check';
  return `/ambulant?src=${source}#tarifwahl`;
}
