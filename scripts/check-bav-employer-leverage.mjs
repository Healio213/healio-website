import assert from 'node:assert/strict';
import {
  BAV_PAYOUT_MODEL,
  calculateAnnualizedReturn,
  calculateBavScenarios,
  calculateEmployerBavLeverage,
  calculateEmployerPlan,
  calculateIllustrativeMonthlyWithdrawal,
} from '../src/lib/bavEmployerLeverage.js';

const round = (value, digits = 2) => Number(value.toFixed(digits));

const leverage = calculateEmployerBavLeverage({
  monthlyContribution: 676,
  svFreeAmount: 338,
  employeeSocialRate: 0.2115,
});

assert.equal(leverage.svLiableAmount, 338);
assert.equal(round(leverage.employeeNetImpact), 71.49);
assert.equal(round(leverage.leverageFactor), 9.46);

const referencePlan = calculateEmployerPlan({
  employeeCount: 20,
  participationRate: 100,
  averageMonthlyGross: 3750,
  monthlyContribution: 676,
  annualRevenue: 3_000_000,
});

assert.equal(referencePlan.participantCount, 20);
assert.equal(referencePlan.annualBavContributionTotal, 162_240);
assert.equal(round(referencePlan.employerSocialContributionsAnnualTotal), 17_156.88);
assert.equal(round(referencePlan.employerAnnualCostTotal), 179_396.88);
assert.equal(round(referencePlan.employerCostPercentOfPayroll), 19.93);
assert.equal(round(referencePlan.employerCostPercentOfRevenue), 5.98);
assert.equal(round(referencePlan.employeeNetImpactMonthly), 71.49);
assert.equal(referencePlan.assessmentBaseRvAvMonthly, 338);
assert.equal(referencePlan.assessmentBaseKvPvMonthly, 338);

const splitHeadroom = calculateEmployerPlan({
  employeeCount: 1,
  participationRate: 100,
  averageMonthlyGross: 5700,
  monthlyContribution: 676,
  annualRevenue: 600_000,
});

assert.equal(splitHeadroom.assessmentBaseRvAvMonthly, 338);
assert.equal(splitHeadroom.assessmentBaseKvPvMonthly, 112.5);
assert.equal(round(splitHeadroom.employeeNetImpactMonthly, 5), 47.69675);

const pensionOnlyHeadroom = calculateEmployerPlan({
  employeeCount: 1,
  participationRate: 100,
  averageMonthlyGross: 8400,
  monthlyContribution: 676,
  annualRevenue: 600_000,
});

assert.equal(pensionOnlyHeadroom.assessmentBaseRvAvMonthly, 50);
assert.equal(pensionOnlyHeadroom.assessmentBaseKvPvMonthly, 0);
assert.equal(round(pensionOnlyHeadroom.employeeNetImpactMonthly), 5.3);

const noHeadroom = calculateEmployerPlan({
  employeeCount: 1,
  participationRate: 100,
  averageMonthlyGross: 9000,
  monthlyContribution: 676,
  annualRevenue: 600_000,
});

assert.equal(noHeadroom.employeeNetImpactMonthly, 0);
assert.equal(noHeadroom.employerSocialContributionsAnnualTotal, 0);

const doubledRevenue = calculateEmployerPlan({
  employeeCount: 20,
  participationRate: 100,
  averageMonthlyGross: 3750,
  monthlyContribution: 676,
  annualRevenue: 6_000_000,
});

assert.equal(doubledRevenue.annualBavContributionTotal, referencePlan.annualBavContributionTotal);
assert.equal(doubledRevenue.employerAnnualCostTotal, referencePlan.employerAnnualCostTotal);
assert.equal(
  round(doubledRevenue.employerCostPercentOfRevenue, 6),
  round(referencePlan.employerCostPercentOfRevenue / 2, 6),
);

const expectedScenarioCapital = {
  25: { 4: 262_203.05, 6: 343_981.33, 8: 457_171.34, 10: 614_477.89, 11.1: 725_997.84 },
  30: { 4: 332_094.12, 6: 463_242.9, 8: 658_770.77, 10: 952_180.2, 11.1: 1_172_812.89 },
  35: { 4: 409_259.5, 6: 608_342.84, 8: 928_556.29, 10: 1_448_375.68, 11.1: 1_863_452.61 },
};

for (const years of [25, 30, 35]) {
  const scenarios = calculateBavScenarios({
    monthlyContribution: 676,
    years,
    annualRates: [11.1, 4, 10, 6, 8],
    effectiveCostRate: 2,
  });

  assert.deepEqual(scenarios.map((scenario) => scenario.grossAnnualRate), [4, 6, 8, 10, 11.1]);
  assert.equal(scenarios[0].contributionTotal, 676 * years * 12);

  for (const scenario of scenarios) {
    assert.equal(scenario.effectiveCostRate, 2);
    assert.equal(scenario.modelAnnualRate, scenario.grossAnnualRate - 2);
    assert.equal(
      round(scenario.projectedCapital),
      expectedScenarioCapital[years][scenario.grossAnnualRate],
    );
  }
}

const defaultScenario = calculateBavScenarios({
  monthlyContribution: 676,
  years: 30,
  annualRates: [10],
  effectiveCostRate: 2,
})[0];

assert.equal(defaultScenario.modelAnnualRate, 8);
assert.equal(round(defaultScenario.projectedCapital), 952_180.2);

const defaultPayout = calculateIllustrativeMonthlyWithdrawal({
  capital: defaultScenario.projectedCapital,
});

assert.equal(BAV_PAYOUT_MODEL.annualWithdrawalRate, 4);
assert.equal(BAV_PAYOUT_MODEL.modelDeductionRate, 30);
assert.equal(round(defaultPayout.grossMonthlyWithdrawal), 3_173.93);
assert.equal(round(defaultPayout.afterModelDeductionMonthly), 2_221.75);

const historicalFifteenYearReturn = calculateAnnualizedReturn({
  startValue: 100,
  endValue: 484.83,
  years: 15,
});
assert.equal(round(historicalFifteenYearReturn, 4), 11.0979);
assert.equal(round(historicalFifteenYearReturn), 11.1);

const historicalScenario = calculateBavScenarios({
  monthlyContribution: 676,
  years: 30,
  annualRates: [11.1],
  effectiveCostRate: 2,
})[0];
assert.equal(historicalScenario.modelAnnualRate, 9.1);
assert.equal(round(historicalScenario.projectedCapital), 1_172_812.89);

const technicalTwentyYearReference = calculateBavScenarios({
  monthlyContribution: 676,
  years: 20,
  annualRates: [6],
  effectiveCostRate: 2,
})[0];

assert.equal(technicalTwentyYearReference.modelAnnualRate, 4);
assert.equal(round(technicalTwentyYearReference.projectedCapital), 245_957.01);

assert.throws(
  () => calculateEmployerBavLeverage({ monthlyContribution: -1 }),
  RangeError,
);
assert.throws(
  () => calculateAnnualizedReturn({ startValue: 0, endValue: 484.83, years: 15 }),
  RangeError,
);
assert.throws(
  () => calculateEmployerPlan({
    employeeCount: 20,
    participationRate: 101,
    averageMonthlyGross: 3750,
    monthlyContribution: 676,
    annualRevenue: 3_000_000,
  }),
  RangeError,
);
assert.throws(
  () => calculateEmployerPlan({
    employeeCount: 20,
    participationRate: 100,
    averageMonthlyGross: 3750,
    monthlyContribution: 677,
    annualRevenue: 3_000_000,
  }),
  RangeError,
);
assert.throws(
  () => calculateBavScenarios({
    monthlyContribution: 676,
    years: -1,
    annualRates: [8],
    effectiveCostRate: 2,
  }),
  RangeError,
);
assert.throws(
  () => calculateBavScenarios({
    monthlyContribution: 676,
    years: 30,
    annualRates: [-1],
    effectiveCostRate: 2,
  }),
  RangeError,
);
assert.throws(
  () => calculateIllustrativeMonthlyWithdrawal({ capital: -1 }),
  RangeError,
);
assert.throws(
  () => calculateIllustrativeMonthlyWithdrawal({
    capital: 952_180.2,
    annualWithdrawalRate: 101,
  }),
  RangeError,
);
assert.throws(
  () => calculateIllustrativeMonthlyWithdrawal({
    capital: 952_180.2,
    modelDeductionRate: 101,
  }),
  RangeError,
);

console.log('bAV employer leverage contract passed.');
