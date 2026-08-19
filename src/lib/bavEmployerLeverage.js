import { futureValueOfMonthlyContributions } from './companyProjection.js';

export const BAV_LIMITS_2026 = Object.freeze({
  taxFreeMonthly: 676,
  socialFreeMonthly: 338,
  healthAndCareMonthly: 5812.5,
  pensionAndUnemploymentMonthly: 8450,
  averageAdditionalHealthRate: 0.029,
});

const STANDARD_SOCIAL_RATES = Object.freeze({
  pensionEmployee: 0.093,
  pensionEmployer: 0.093,
  unemploymentEmployee: 0.013,
  unemploymentEmployer: 0.013,
  healthEmployee: 0.073,
  healthEmployer: 0.073,
  careEmployee: 0.018,
  careEmployer: 0.018,
});

const assertFiniteRange = (name, value, { min = 0, max = Number.POSITIVE_INFINITY } = {}) => {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${name} must be between ${min} and ${max}.`);
  }
};

const contributionBaseWithinHeadroom = (amount, grossSalary, ceiling) => (
  Math.min(amount, Math.max(0, ceiling - grossSalary))
);

export const calculateEmployerBavLeverage = ({
  monthlyContribution,
  svFreeAmount = BAV_LIMITS_2026.socialFreeMonthly,
  employeeSocialRate = 0.2115,
}) => {
  assertFiniteRange('monthlyContribution', monthlyContribution, { max: BAV_LIMITS_2026.taxFreeMonthly });
  assertFiniteRange('svFreeAmount', svFreeAmount);
  assertFiniteRange('employeeSocialRate', employeeSocialRate, { max: 1 });

  const svLiableAmount = Math.max(0, monthlyContribution - svFreeAmount);
  const employeeNetImpact = svLiableAmount * employeeSocialRate;

  return {
    svLiableAmount,
    employeeNetImpact,
    leverageFactor: employeeNetImpact > 0 ? monthlyContribution / employeeNetImpact : null,
  };
};

export const calculateEmployerPlan = ({
  employeeCount,
  participationRate,
  averageMonthlyGross,
  monthlyContribution,
  annualRevenue,
  averageAdditionalHealthRate = BAV_LIMITS_2026.averageAdditionalHealthRate,
}) => {
  assertFiniteRange('employeeCount', employeeCount, { max: 5000 });
  assertFiniteRange('participationRate', participationRate, { max: 100 });
  assertFiniteRange('averageMonthlyGross', averageMonthlyGross);
  assertFiniteRange('monthlyContribution', monthlyContribution, { max: BAV_LIMITS_2026.taxFreeMonthly });
  assertFiniteRange('annualRevenue', annualRevenue);
  assertFiniteRange('averageAdditionalHealthRate', averageAdditionalHealthRate, { max: 1 });

  const participantCount = Math.round(employeeCount * (participationRate / 100));
  const svLiableMonthlyPerParticipant = Math.max(
    0,
    monthlyContribution - BAV_LIMITS_2026.socialFreeMonthly,
  );
  const assessmentBaseRvAvMonthly = contributionBaseWithinHeadroom(
    svLiableMonthlyPerParticipant,
    averageMonthlyGross,
    BAV_LIMITS_2026.pensionAndUnemploymentMonthly,
  );
  const assessmentBaseKvPvMonthly = contributionBaseWithinHeadroom(
    svLiableMonthlyPerParticipant,
    averageMonthlyGross,
    BAV_LIMITS_2026.healthAndCareMonthly,
  );
  const additionalHealthShare = averageAdditionalHealthRate / 2;

  const employeeSocialBreakdownMonthly = {
    pension: assessmentBaseRvAvMonthly * STANDARD_SOCIAL_RATES.pensionEmployee,
    unemployment: assessmentBaseRvAvMonthly * STANDARD_SOCIAL_RATES.unemploymentEmployee,
    health: assessmentBaseKvPvMonthly * (STANDARD_SOCIAL_RATES.healthEmployee + additionalHealthShare),
    care: assessmentBaseKvPvMonthly * STANDARD_SOCIAL_RATES.careEmployee,
  };
  employeeSocialBreakdownMonthly.total = Object.values(employeeSocialBreakdownMonthly)
    .reduce((sum, value) => sum + value, 0);

  const employerSocialBreakdownMonthly = {
    pension: assessmentBaseRvAvMonthly * STANDARD_SOCIAL_RATES.pensionEmployer,
    unemployment: assessmentBaseRvAvMonthly * STANDARD_SOCIAL_RATES.unemploymentEmployer,
    health: assessmentBaseKvPvMonthly * (STANDARD_SOCIAL_RATES.healthEmployer + additionalHealthShare),
    care: assessmentBaseKvPvMonthly * STANDARD_SOCIAL_RATES.careEmployer,
  };
  employerSocialBreakdownMonthly.total = Object.values(employerSocialBreakdownMonthly)
    .reduce((sum, value) => sum + value, 0);

  const annualBavContributionTotal = monthlyContribution * participantCount * 12;
  const employerSocialContributionsAnnualTotal = (
    employerSocialBreakdownMonthly.total * participantCount * 12
  );
  const employerAnnualCostTotal = annualBavContributionTotal + employerSocialContributionsAnnualTotal;
  const annualPayroll = employeeCount * averageMonthlyGross * 12;

  return {
    participantCount,
    svLiableMonthlyPerParticipant,
    assessmentBaseRvAvMonthly,
    assessmentBaseKvPvMonthly,
    employeeSocialBreakdownMonthly,
    employerSocialBreakdownMonthly,
    employeeNetImpactMonthly: employeeSocialBreakdownMonthly.total,
    employeeBavCreditMonthly: monthlyContribution,
    annualBavContributionTotal,
    employerSocialContributionsAnnualTotal,
    employerAnnualCostTotal,
    annualPayroll,
    employerCostPercentOfPayroll: annualPayroll > 0
      ? (employerAnnualCostTotal / annualPayroll) * 100
      : null,
    employerCostPercentOfRevenue: annualRevenue > 0
      ? (employerAnnualCostTotal / annualRevenue) * 100
      : null,
  };
};

export const calculateAnnualizedReturn = ({ startValue, endValue, years }) => {
  assertFiniteRange('startValue', startValue);
  assertFiniteRange('endValue', endValue);
  assertFiniteRange('years', years);
  if (startValue === 0 || years === 0) {
    throw new RangeError('startValue and years must be greater than zero.');
  }

  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
};

export const calculateBavScenarios = ({
  monthlyContribution,
  years,
  annualRates,
  effectiveCostRate = 2,
}) => {
  assertFiniteRange('monthlyContribution', monthlyContribution, { max: BAV_LIMITS_2026.taxFreeMonthly });
  assertFiniteRange('years', years);
  assertFiniteRange('effectiveCostRate', effectiveCostRate, { max: 100 });

  if (!Array.isArray(annualRates) || annualRates.length === 0) {
    throw new RangeError('annualRates must contain at least one rate.');
  }

  annualRates.forEach((rate) => assertFiniteRange('annualRate', rate));
  const contributionTotal = monthlyContribution * years * 12;

  return [...annualRates]
    .sort((a, b) => a - b)
    .map((grossAnnualRate) => {
      const modelAnnualRate = grossAnnualRate - effectiveCostRate;
      if (modelAnnualRate <= -100) {
        throw new RangeError('modelAnnualRate must be greater than -100.');
      }

      return {
        grossAnnualRate,
        effectiveCostRate,
        modelAnnualRate,
        contributionTotal,
        projectedCapital: futureValueOfMonthlyContributions({
          monthlyContribution,
          years,
          annualRate: modelAnnualRate,
        }),
      };
    });
};
