export const PROJECTION_START_YEAR = 2026;

export const futureValueOfMonthlyContributions = ({
  monthlyContribution,
  years,
  annualRate,
}) => {
  const months = Math.max(0, Math.round(years * 12));
  // Die Eingabe ist eine effektive Jahresrendite. Daraus wird die
  // äquivalente effektive Monatsrendite abgeleitet.
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

  if (months === 0 || monthlyContribution <= 0) return 0;
  if (monthlyRate === 0) return monthlyContribution * months;

  // Nachschüssige Zahlung: Der Beitrag wird jeweils am Monatsende investiert.
  return monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
};

export const calculateCohortProjection = ({
  employeeCount,
  participationRate,
  monthlyContribution,
  years,
  scenarioARate,
  scenarioBRate,
}) => {
  const participantCount = Math.round(employeeCount * (participationRate / 100));
  const contributionsPerEmployee = monthlyContribution * years * 12;
  const scenarioAPerEmployee = futureValueOfMonthlyContributions({
    monthlyContribution,
    years,
    annualRate: scenarioARate,
  });
  const scenarioBPerEmployee = futureValueOfMonthlyContributions({
    monthlyContribution,
    years,
    annualRate: scenarioBRate,
  });

  return {
    participantCount,
    contributionsPerEmployee,
    totalContributions: contributionsPerEmployee * participantCount,
    scenarioAPerEmployee,
    scenarioBPerEmployee,
    scenarioATotal: scenarioAPerEmployee * participantCount,
    scenarioBTotal: scenarioBPerEmployee * participantCount,
    differencePerEmployee: scenarioBPerEmployee - scenarioAPerEmployee,
    differenceTotal: (scenarioBPerEmployee - scenarioAPerEmployee) * participantCount,
  };
};

export const createProjectionSeries = ({
  monthlyContribution,
  years,
  scenarioARate,
  scenarioBRate,
}) => Array.from({ length: years + 1 }, (_, year) => ({
  year: PROJECTION_START_YEAR + year,
  elapsedYears: year,
  contributions: monthlyContribution * year * 12,
  scenarioA: futureValueOfMonthlyContributions({
    monthlyContribution,
    years: year,
    annualRate: scenarioARate,
  }),
  scenarioB: futureValueOfMonthlyContributions({
    monthlyContribution,
    years: year,
    annualRate: scenarioBRate,
  }),
}));
