import React, { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Equal, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import {
  PROJECTION_START_YEAR,
  calculateCohortProjection,
  createProjectionSeries,
} from '@/lib/companyProjection';
import CohortProjectionChart from './CohortProjectionChart';

const RangeControl = ({ label, hint, valueLabel, min, max, step, value, onChange }) => (
  <label className="block">
    <span className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
      <span className="min-w-0">
        <span className="block text-sm font-bold leading-5 text-slate-800">{label}</span>
        {hint && (
          <span className="mt-0.5 block text-xs font-medium leading-4 text-slate-500">
            {hint}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap rounded-md bg-slate-100 px-3 py-1.5 font-display text-sm font-extrabold tabular-nums text-[#07141d]">{valueLabel}</span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-11 w-full cursor-pointer accent-[#25c990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2"
    />
  </label>
);

const CohortImpactSection = () => {
  const { t } = useTranslation('unternehmen');
  const { lang, getPath } = useLanguage();
  const locale = lang === 'en' ? 'en-GB' : 'de-DE';
  const [employeeCount, setEmployeeCount] = useState(1000);
  const [participationRate, setParticipationRate] = useState(100);
  const [monthlyContribution, setMonthlyContribution] = useState(150);
  const [years, setYears] = useState(30);
  const [scenarioARate, setScenarioARate] = useState(1.5);
  const [scenarioBRate, setScenarioBRate] = useState(7);

  const formatInteger = (value) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value);
  const formatCurrency = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
  const formatCompactCurrency = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
  const formatMobileAxisCurrency = (value) => {
    if (value >= 1_000_000) {
      const compactValue = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1_000_000);
      return lang === 'en' ? `€${compactValue}m` : `${compactValue} Mio. €`;
    }
    if (value >= 1_000) {
      const compactValue = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value / 1_000);
      return lang === 'en' ? `€${compactValue}k` : `${compactValue} T€`;
    }
    return formatCurrency(value);
  };
  const formatPercent = (value) => new Intl.NumberFormat(locale, {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(value);

  const projection = useMemo(() => calculateCohortProjection({
    employeeCount,
    participationRate,
    monthlyContribution,
    years,
    scenarioARate,
    scenarioBRate,
  }), [employeeCount, participationRate, monthlyContribution, years, scenarioARate, scenarioBRate]);

  const series = useMemo(() => createProjectionSeries({
    monthlyContribution,
    years,
    scenarioARate,
    scenarioBRate,
  }), [monthlyContribution, years, scenarioARate, scenarioBRate]);

  const endYear = PROJECTION_START_YEAR + years;

  return (
    <section id="unternehmen-rechner" className="scroll-mt-20 bg-[#06131c] pb-20 text-white lg:pb-28" aria-labelledby="cohort-calculator-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10 pt-16 lg:pt-20">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">
                {t('calculator.eyebrow', { startYear: PROJECTION_START_YEAR, endYear })}
              </p>
              <h2 id="cohort-calculator-title" className="mt-4 max-w-[14ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">
                {t('calculator.title', { startYear: PROJECTION_START_YEAR, endYear })}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-300 lg:justify-self-end lg:text-lg">
              {t('calculator.description', { years })}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1d27] shadow-[0_32px_100px_rgba(0,0,0,0.22)]">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="bg-[#f7faf9] p-6 text-slate-900 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#07141d] text-[#8ee7ca]">
                    <Calculator className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-extrabold">{t('calculator.controlsTitle')}</p>
                    <p className="mt-1 text-xs text-slate-500">{t('calculator.controlsHint')}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-7">
                  <RangeControl
                    label={t('calculator.employeeCount')}
                    valueLabel={formatInteger(employeeCount)}
                    min={10}
                    max={5000}
                    step={10}
                    value={employeeCount}
                    onChange={setEmployeeCount}
                  />
                  <RangeControl
                    label={t('calculator.participationRate')}
                    valueLabel={`${formatPercent(participationRate)} %`}
                    min={10}
                    max={100}
                    step={5}
                    value={participationRate}
                    onChange={setParticipationRate}
                  />
                  <RangeControl
                    label={t('calculator.monthlyContribution')}
                    valueLabel={formatCurrency(monthlyContribution)}
                    min={50}
                    max={700}
                    step={10}
                    value={monthlyContribution}
                    onChange={setMonthlyContribution}
                  />
                  <RangeControl
                    label={t('calculator.duration')}
                    valueLabel={t('calculator.yearsValue', { years })}
                    min={10}
                    max={40}
                    step={1}
                    value={years}
                    onChange={setYears}
                  />

                  <div className="grid gap-6 border-t border-slate-200 pt-7 sm:grid-cols-2">
                    <RangeControl
                      label={t('calculator.scenarioARate')}
                      hint={t('calculator.scenarioARateHint')}
                      valueLabel={`${formatPercent(scenarioARate)} %`}
                      min={0}
                      max={Math.min(5, scenarioBRate - 0.1)}
                      step={0.1}
                      value={scenarioARate}
                      onChange={setScenarioARate}
                    />
                    <RangeControl
                      label={t('calculator.scenarioBRate')}
                      hint={t('calculator.scenarioBRateHint')}
                      valueLabel={`${formatPercent(scenarioBRate)} %`}
                      min={Math.max(2, scenarioARate + 0.1)}
                      max={9}
                      step={0.1}
                      value={scenarioBRate}
                      onChange={setScenarioBRate}
                    />
                  </div>
                </div>

                <div className="mt-16 border-t border-slate-200 pt-7 lg:mt-24">
                  <div className="flex items-center gap-4 font-display text-sm font-extrabold tracking-[0.08em] text-[#10202a]">
                    <span>{PROJECTION_START_YEAR}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-slate-300 via-[#25c990] to-slate-300" aria-hidden="true" />
                    <span>{endYear}</span>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-slate-500">{t('calculator.modelLine')}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8ee7ca]">
                  {t('calculator.exampleLabel')}
                </p>
                <div className="grid gap-5 border-b border-white/10 pb-8 sm:grid-cols-[0.72fr_1.28fr] sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      {t('calculator.differencePerEmployeeLabel', { years })}
                    </p>
                    <p className="mt-3 font-display text-3xl font-extrabold leading-none tracking-[-0.045em] text-white tabular-nums sm:text-4xl">
                      {formatCurrency(projection.differencePerEmployee)}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">{t('calculator.differencePerEmployeeSuffix')}</p>
                  </div>
                  <div className="border-l-2 border-[#25c990] bg-[#25c990]/[0.06] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ee7ca]">{t('calculator.cohortDifferenceLabel')}</p>
                    <p className="mt-3 font-display text-[clamp(2.5rem,5vw,4.4rem)] font-extrabold leading-none tracking-[-0.06em] text-white tabular-nums">
                      {formatCompactCurrency(projection.differenceTotal)}
                    </p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300">
                      <Users className="h-4 w-4 text-[#8ee7ca]" aria-hidden="true" />
                      {t('calculator.participantsValue', { participants: formatInteger(projection.participantCount) })}
                      <span className="basis-full pl-6 text-slate-400 sm:basis-auto sm:pl-0"><span className="hidden sm:inline">· </span>{formatCurrency(projection.differenceTotal)}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="border-l-2 border-slate-400/70 bg-white/[0.04] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{t('calculator.scenarioALabel', { rate: formatPercent(scenarioARate) })}</p>
                    <p className="mt-3 font-display text-2xl font-extrabold tabular-nums">{formatCurrency(projection.scenarioAPerEmployee)}</p>
                    <p className="mt-1 text-xs text-slate-400">{t('calculator.perEmployee')}</p>
                    <p className="mt-5 text-sm font-bold text-slate-200">{formatCompactCurrency(projection.scenarioATotal)} {t('calculator.cohortSuffix')}</p>
                  </div>
                  <div className="border-l-2 border-[#25c990] bg-[#25c990]/[0.06] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8ee7ca]">{t('calculator.scenarioBLabel', { rate: formatPercent(scenarioBRate) })}</p>
                    <p className="mt-3 font-display text-2xl font-extrabold tabular-nums">{formatCurrency(projection.scenarioBPerEmployee)}</p>
                    <p className="mt-1 text-xs text-slate-400">{t('calculator.perEmployee')}</p>
                    <p className="mt-5 text-sm font-bold text-slate-200">{formatCompactCurrency(projection.scenarioBTotal)} {t('calculator.cohortSuffix')}</p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-4 bg-white/[0.035] p-5">
                    <Equal className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-400">{t('calculator.contributionsPerEmployee')}</p>
                      <p className="mt-1 font-display text-lg font-extrabold tabular-nums">{formatCurrency(projection.contributionsPerEmployee)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/[0.035] p-5">
                    <Equal className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-400">{t('calculator.totalContributions')}</p>
                      <p className="mt-1 font-display text-lg font-extrabold tabular-nums">{formatCompactCurrency(projection.totalContributions)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <CohortProjectionChart
                    series={series}
                    ariaLabel={t('calculator.chartAria', { startYear: PROJECTION_START_YEAR, endYear })}
                    scenarioALabel={t('calculator.scenarioALabel', { rate: formatPercent(scenarioARate) })}
                    scenarioBLabel={t('calculator.scenarioBLabel', { rate: formatPercent(scenarioBRate) })}
                    contributionsLabel={t('calculator.contributionsLabel')}
                    formatAxisValue={formatCompactCurrency}
                    formatMobileAxisValue={formatMobileAxisCurrency}
                  />
                </div>

                <div className="mt-7 border-t border-white/10 pt-6 text-xs leading-5 text-slate-400">
                  <p className="font-bold text-slate-200">{t('calculator.assumptionsTitle')}</p>
                  <p className="mt-2">
                    {t('calculator.assumptions', {
                      employees: formatInteger(employeeCount),
                      participation: formatPercent(participationRate),
                      participants: formatInteger(projection.participantCount),
                      contribution: formatCurrency(monthlyContribution),
                      months: formatInteger(years * 12),
                    })}
                  </p>
                  <p className="mt-3 text-slate-400">{t('calculator.disclaimer')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-l-2 border-[#25c990] pl-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-slate-300">{t('calculator.decisionPrompt')}</p>
            <Link
              to={getPath('potenzialanalyse')}
              className="inline-flex shrink-0 items-center gap-2 font-display text-sm font-extrabold text-[#8ee7ca] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06131c]"
            >
              {t('calculator.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CohortImpactSection;
