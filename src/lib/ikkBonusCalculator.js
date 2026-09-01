export const capActivityCount = (value, max) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || !Number.isFinite(max)) return 0;
  return Math.max(0, Math.min(max, Math.floor(numericValue)));
};

export const calculateIkkBonus = ({
  activityDefs,
  selectedActivities,
  hasRegularActivity,
}) => activityDefs.reduce((totals, activity) => {
  if (activity.category === 'status' && !hasRegularActivity) return totals;

  const units = activity.countable
    ? capActivityCount(selectedActivities[activity.id], activity.max)
    : (selectedActivities[activity.id] ? 1 : 0);

  totals.totalCashBonus += units * activity.cash;
  totals.totalSubsidyPotential += units * activity.subsidy;
  return totals;
}, { totalCashBonus: 0, totalSubsidyPotential: 0 });
