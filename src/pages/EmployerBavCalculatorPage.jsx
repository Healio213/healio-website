import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/hooks/useLanguage';
import {
  BAV_LIMITS_2026,
  calculateAnnualizedReturn,
  calculateBavScenarios,
  calculateEmployerPlan,
} from '@/lib/bavEmployerLeverage';

const MARKET_RATE_PRESETS = [4, 6, 8, 10, 11.1];
const DURATION_OPTIONS = [25, 30, 35];
const COST_PRESETS = [0.9, 1.3, 1.7, 2];
const REVENUE_OPTIONS = [
  600_000,
  1_000_000,
  3_000_000,
  5_000_000,
  10_000_000,
  25_000_000,
  50_000_000,
  100_000_000,
  250_000_000,
  500_000_000,
];

const PresetButtons = ({ values, value, onChange, formatValue, tone = 'light' }) => (
  <div className="mt-3 flex flex-wrap gap-2">
    {values.map((preset) => (
      <button
        key={preset}
        type="button"
        onClick={() => onChange(preset)}
        aria-pressed={value === preset}
        className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2 ${
          tone === 'dark'
            ? value === preset
              ? 'border-[#8ee7ca] bg-[#25c990] text-[#07161f] focus-visible:ring-offset-[#07161f]'
              : 'border-white/15 bg-white/[0.05] text-white hover:border-white/35 focus-visible:ring-offset-[#07161f]'
            : value === preset
              ? 'border-[#07161f] bg-[#07161f] text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:border-[#25c990]'
        }`}
      >
        {formatValue(preset)}
      </button>
    ))}
  </div>
);

const RangeField = ({
  id,
  label,
  hint,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  presets,
  formatPreset,
  tone = 'light',
}) => (
  <div>
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
      <div>
        <label htmlFor={id} className={`block font-display text-sm font-extrabold ${tone === 'dark' ? 'text-white' : 'text-[#07161f]'}`}>
          {label}
        </label>
        <p id={`${id}-hint`} className={`mt-1 text-xs leading-5 ${tone === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>
          {hint}
        </p>
      </div>
      <output htmlFor={id} className={`whitespace-nowrap rounded-lg px-3 py-2 font-display text-sm font-extrabold tabular-nums ${tone === 'dark' ? 'bg-white/10 text-white' : 'bg-slate-100 text-[#07161f]'}`}>
        {valueLabel}
      </output>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      aria-describedby={`${id}-hint`}
      className="mt-3 h-11 w-full cursor-pointer accent-[#25c990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2"
    />
    {presets && (
      <PresetButtons
        values={presets}
        value={value}
        onChange={onChange}
        formatValue={formatPreset}
        tone={tone}
      />
    )}
  </div>
);

const Metric = ({ label, value, primary = false, note }) => (
  <div className={primary ? 'border-l-2 border-[#25c990] bg-[#25c990]/[0.07] p-5' : 'border-l border-slate-200 pl-4'}>
    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
    <dd className={`${primary ? 'mt-2 text-3xl' : 'mt-1.5 text-xl'} font-display font-extrabold leading-tight tabular-nums text-[#07161f]`}>
      {value}
    </dd>
    {note && <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>}
  </div>
);

const EmployerBavCalculatorPage = () => {
  const { t } = useTranslation('unternehmen');
  const { lang, getPath } = useLanguage();
  const locale = lang === 'en' ? 'en-GB' : 'de-DE';
  const canonicalUrl = lang === 'en'
    ? 'https://healio.de/en/companies/pension-calculator'
    : 'https://healio.de/unternehmen/vorsorge-rechner';
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: t('bavDecisionCalculator.seo.title'),
    description: t('bavDecisionCalculator.seo.description'),
    inLanguage: lang === 'en' ? 'en-US' : 'de-DE',
    isPartOf: { '@id': 'https://healio.de/#website' },
    about: { '@id': 'https://healio.de/#organization' },
  };

  const [employeeCount, setEmployeeCount] = useState(20);
  const [participationRate, setParticipationRate] = useState(100);
  const [averageMonthlyGross, setAverageMonthlyGross] = useState(3750);
  const [monthlyContribution, setMonthlyContribution] = useState(676);
  const [years, setYears] = useState(30);
  const [revenueIndex, setRevenueIndex] = useState(2);
  const [grossAnnualRate, setGrossAnnualRate] = useState(10);
  const [effectiveCostRate, setEffectiveCostRate] = useState(2);

  const annualRevenue = REVENUE_OPTIONS[revenueIndex];
  const formatInteger = (value) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value);
  const formatCurrency = (value, digits = 0) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
  const formatCompactCurrency = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
  const formatPercent = (value, digits = 2) => new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
  const formatRate = (value) => formatPercent(value, Number.isInteger(value) ? 0 : 2);

  const plan = useMemo(() => calculateEmployerPlan({
    employeeCount,
    participationRate,
    averageMonthlyGross,
    monthlyContribution,
    annualRevenue,
  }), [employeeCount, participationRate, averageMonthlyGross, monthlyContribution, annualRevenue]);

  const selectedScenario = useMemo(() => calculateBavScenarios({
    monthlyContribution,
    years,
    annualRates: [grossAnnualRate],
    effectiveCostRate,
  })[0], [monthlyContribution, years, grossAnnualRate, effectiveCostRate]);
  const historicalAnnualRate = calculateAnnualizedReturn({
    startValue: 100,
    endValue: 484.83,
    years: 15,
  });
  const markerPosition = (monthlyContribution / BAV_LIMITS_2026.taxFreeMonthly) * 100;
  const participants = plan.participantCount;

  return (
    <>
      <SEOHead
        title={t('bavDecisionCalculator.seo.title')}
        description={t('bavDecisionCalculator.seo.description')}
        canonicalUrl={canonicalUrl}
        ogUrl={canonicalUrl}
        alternateUrls={{
          de: 'https://healio.de/unternehmen/vorsorge-rechner',
          en: 'https://healio.de/en/companies/pension-calculator',
        }}
        robots="noindex, nofollow"
        schemaMarkup={schemaMarkup}
      />

      <article className="w-full overflow-hidden bg-[#f7faf9] text-[#07161f]">
        <header className="bg-[#07161f] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
          <div className="healio-container">
            <Link
              to={getPath('unternehmen')}
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 transition hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f]"
            >
              {t('bavDecisionCalculator.hero.back')}
            </Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">
              {t('bavDecisionCalculator.hero.eyebrow')}
            </p>
            <h1 className="mt-5 max-w-[15ch] font-display text-[clamp(2.5rem,7vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
              {t('bavDecisionCalculator.hero.title')}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {t('bavDecisionCalculator.hero.description')}
            </p>
          </div>
        </header>

        <div className="healio-container px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <section aria-labelledby="bav-input-title" className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(7,22,31,0.07)] sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087052]">2026</p>
              <h2 id="bav-input-title" className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em]">
                {t('bavDecisionCalculator.controls.title')}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {t('bavDecisionCalculator.controls.description')}
              </p>

              <div className="mt-9 space-y-9">
                <RangeField
                  id="employee-count"
                  label={t('bavDecisionCalculator.controls.employees.label')}
                  hint={t('bavDecisionCalculator.controls.employees.hint')}
                  valueLabel={formatInteger(employeeCount)}
                  min={1}
                  max={5000}
                  step={1}
                  value={employeeCount}
                  onChange={setEmployeeCount}
                  presets={[20, 100, 1000]}
                  formatPreset={formatInteger}
                />
                <RangeField
                  id="participation-rate"
                  label={t('bavDecisionCalculator.controls.participation.label')}
                  hint={t('bavDecisionCalculator.controls.participation.hint')}
                  valueLabel={`${formatInteger(participationRate)} %`}
                  min={0}
                  max={100}
                  step={1}
                  value={participationRate}
                  onChange={setParticipationRate}
                  presets={[50, 75, 100]}
                  formatPreset={(value) => `${value} %`}
                />
                <RangeField
                  id="average-gross"
                  label={t('bavDecisionCalculator.controls.salary.label')}
                  hint={t('bavDecisionCalculator.controls.salary.hint')}
                  valueLabel={formatCurrency(averageMonthlyGross)}
                  min={2001}
                  max={6450}
                  step={1}
                  value={averageMonthlyGross}
                  onChange={setAverageMonthlyGross}
                  presets={[3500, 3750, 4000]}
                  formatPreset={(value) => formatCurrency(value)}
                />
                <div>
                  <RangeField
                    id="monthly-contribution"
                    label={t('bavDecisionCalculator.controls.contribution.label')}
                    hint={t('bavDecisionCalculator.controls.contribution.hint')}
                    valueLabel={formatCurrency(monthlyContribution)}
                    min={0}
                    max={BAV_LIMITS_2026.taxFreeMonthly}
                    step={1}
                    value={monthlyContribution}
                    onChange={setMonthlyContribution}
                    presets={[338, 500, 676]}
                    formatPreset={(value) => formatCurrency(value)}
                  />
                  <div data-bav-split className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-display text-sm font-extrabold">
                      {t('bavDecisionCalculator.controls.contribution.splitTitle')}
                    </p>
                    <div className="relative mt-4 grid grid-cols-2 overflow-hidden rounded-xl text-xs font-bold">
                      <div className="min-h-16 bg-[#dff8ee] p-3 text-[#07563f]">0–338 EUR</div>
                      <div className="min-h-16 border-l border-white bg-[#fff2d5] p-3 text-[#7a5110]">338–676 EUR</div>
                      <span
                        className="absolute bottom-0 top-0 w-0.5 bg-[#07161f] shadow-[0_0_0_2px_rgba(255,255,255,0.8)]"
                        style={{ left: `calc(${markerPosition}% - 1px)` }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-4 grid gap-3 text-xs leading-5 text-slate-600 sm:grid-cols-2">
                      <p>{t('bavDecisionCalculator.controls.contribution.splitFree')}</p>
                      <p>{t('bavDecisionCalculator.controls.contribution.splitLiable')}</p>
                    </div>
                    <p className="mt-3 border-t border-slate-200 pt-3 text-xs font-bold text-slate-700">
                      {t('bavDecisionCalculator.controls.contribution.currentLiable', {
                        amount: formatCurrency(plan.svLiableMonthlyPerParticipant),
                      })}
                    </p>
                  </div>
                </div>
                <fieldset>
                  <legend className="font-display text-sm font-extrabold text-[#07161f]">
                    {t('bavDecisionCalculator.controls.duration.label')}
                  </legend>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {t('bavDecisionCalculator.controls.duration.hint')}
                  </p>
                  <PresetButtons
                    values={DURATION_OPTIONS}
                    value={years}
                    onChange={setYears}
                    formatValue={(value) => t('bavDecisionCalculator.controls.duration.value', { years: value })}
                  />
                </fieldset>
                <RangeField
                  id="annual-revenue"
                  label={t('bavDecisionCalculator.controls.revenue.label')}
                  hint={t('bavDecisionCalculator.controls.revenue.hint')}
                  valueLabel={formatCompactCurrency(annualRevenue)}
                  min={0}
                  max={REVENUE_OPTIONS.length - 1}
                  step={1}
                  value={revenueIndex}
                  onChange={setRevenueIndex}
                />
              </div>
            </section>

            <div className="space-y-8 xl:sticky xl:top-24">
              <section aria-labelledby="market-assumptions-title" className="rounded-[1.75rem] bg-[#07161f] p-5 text-white shadow-[0_24px_70px_rgba(7,22,31,0.16)] sm:p-8 lg:p-10">
                <h2 id="market-assumptions-title" className="font-display text-2xl font-extrabold tracking-[-0.03em]">
                  {t('bavDecisionCalculator.controls.returnRate.label')}
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  {t('bavDecisionCalculator.controls.returnRate.hint')}
                </p>
                <div className="mt-6">
                  <RangeField
                    id="market-return"
                    label={t('bavDecisionCalculator.controls.returnRate.label')}
                    hint={t('bavDecisionCalculator.controls.returnRate.hint')}
                    valueLabel={`${formatRate(grossAnnualRate)} %`}
                    min={0}
                    max={12}
                    step={0.1}
                    value={grossAnnualRate}
                    onChange={setGrossAnnualRate}
                    tone="dark"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {MARKET_RATE_PRESETS.map((rate) => {
                    const selected = rate === grossAnnualRate;
                    const standard = rate === 10;
                    const historical = rate === 11.1;
                    return (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setGrossAnnualRate(rate)}
                        aria-pressed={selected}
                        data-standard-scenario={standard ? 'true' : undefined}
                        data-historical-scenario={historical ? 'true' : undefined}
                        className={`min-h-24 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f] ${
                          selected
                            ? 'border-[#8ee7ca] bg-[#25c990] text-[#07161f]'
                            : standard || historical
                              ? 'border-[#25c990]/70 bg-[#25c990]/10 text-white hover:bg-[#25c990]/20'
                              : 'border-white/10 bg-white/[0.04] text-white hover:border-white/25'
                        }`}
                      >
                        <span className="block font-display text-2xl font-extrabold tabular-nums">
                          {formatRate(rate)} %
                        </span>
                        <span className={`mt-2 block text-[10px] font-bold uppercase tracking-[0.12em] ${selected ? 'text-[#07161f]/70' : 'text-slate-400'}`}>
                          {standard
                            ? t('bavDecisionCalculator.controls.returnRate.standard')
                            : historical
                              ? t('bavDecisionCalculator.controls.returnRate.historical')
                              : t('bavDecisionCalculator.controls.returnRate.lower')}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#8ee7ca]/45 bg-[#25c990]/10 p-4">
                    <p className="font-display text-sm font-extrabold text-[#8ee7ca]">
                      {t('bavDecisionCalculator.controls.returnRate.standard')}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      {t('bavDecisionCalculator.controls.returnRate.standardDescription', {
                        costs: formatRate(effectiveCostRate),
                        netRate: formatRate(10 - effectiveCostRate),
                      })}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-display text-sm font-extrabold text-white">
                      {t('bavDecisionCalculator.controls.returnRate.historical')}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      {t('bavDecisionCalculator.controls.returnRate.historicalDescription', {
                        rate: formatRate(historicalAnnualRate),
                        netRate: formatRate(historicalAnnualRate - effectiveCostRate),
                        costs: formatRate(effectiveCostRate),
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-7">
                  <RangeField
                    id="effective-costs"
                    label={t('bavDecisionCalculator.controls.costs.label')}
                    hint={t('bavDecisionCalculator.controls.costs.hint')}
                    valueLabel={`${formatPercent(effectiveCostRate)} %`}
                    min={0}
                    max={4}
                    step={0.01}
                    value={effectiveCostRate}
                    onChange={setEffectiveCostRate}
                    presets={COST_PRESETS}
                    formatPreset={(value) => `${formatPercent(value)} %`}
                    tone="dark"
                  />
                  <div className="mt-5 rounded-2xl border border-[#25c990]/35 bg-[#25c990]/10 p-5">
                    <p className="font-display text-xl font-extrabold text-[#8ee7ca] tabular-nums">
                      {t('bavDecisionCalculator.controls.costs.formula', {
                        gross: formatRate(selectedScenario.grossAnnualRate),
                        costs: formatRate(selectedScenario.effectiveCostRate),
                        net: formatRate(selectedScenario.modelAnnualRate),
                      })}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-300">
                      {t('bavDecisionCalculator.controls.costs.description')}
                    </p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="results-title" aria-live="polite" className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(7,22,31,0.07)] sm:p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087052]">
                  {t('bavDecisionCalculator.results.eyebrow')}
                </p>
                <h2 id="results-title" className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em]">
                  {t('bavDecisionCalculator.results.participants', { count: formatInteger(participants) })}
                </h2>

                <div className="mt-8 space-y-8">
                  <section data-result-group="company" aria-labelledby="company-results-title" className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                    <h3 id="company-results-title" className="font-display text-xl font-extrabold">
                      {t('bavDecisionCalculator.results.company.title')}
                    </h3>
                    <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Metric label={t('bavDecisionCalculator.results.company.bav')} value={formatCurrency(plan.annualBavContributionTotal)} />
                      <Metric label={t('bavDecisionCalculator.results.company.social')} value={formatCurrency(plan.employerSocialContributionsAnnualTotal, 2)} />
                      <div className="sm:col-span-2">
                        <Metric primary label={t('bavDecisionCalculator.results.company.total')} value={formatCurrency(plan.employerAnnualCostTotal, 2)} />
                      </div>
                      <Metric
                        label={t('bavDecisionCalculator.results.company.payroll')}
                        value={plan.employerCostPercentOfPayroll === null ? '–' : `${formatPercent(plan.employerCostPercentOfPayroll)} %`}
                      />
                      <Metric
                        label={t('bavDecisionCalculator.results.company.revenue')}
                        value={plan.employerCostPercentOfRevenue === null ? '–' : `${formatPercent(plan.employerCostPercentOfRevenue)} %`}
                      />
                    </dl>
                  </section>

                  <section data-result-group="employee" aria-labelledby="employee-results-title" className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                    <h3 id="employee-results-title" className="font-display text-xl font-extrabold">
                      {t('bavDecisionCalculator.results.employee.title')}
                    </h3>
                    <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Metric label={t('bavDecisionCalculator.results.employee.credit')} value={formatCurrency(plan.employeeBavCreditMonthly)} />
                      <Metric label={t('bavDecisionCalculator.results.employee.netImpact')} value={formatCurrency(plan.employeeNetImpactMonthly, 2)} />
                    </dl>
                    <p className="mt-6 rounded-xl bg-[#effaf6] p-4 text-sm font-semibold leading-6 text-[#07563f]">
                      {t('bavDecisionCalculator.results.employee.publicExample', {
                        credit: formatCurrency(plan.employeeBavCreditMonthly),
                        impact: formatCurrency(plan.employeeNetImpactMonthly, 2),
                      })}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      {t('bavDecisionCalculator.results.employee.headroom')}
                    </p>
                  </section>

                  <section data-result-group="capital" aria-labelledby="capital-results-title" className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                    <h3 id="capital-results-title" className="font-display text-xl font-extrabold">
                      {t('bavDecisionCalculator.results.capital.title')}
                    </h3>
                    <p className="mt-3 text-sm font-bold text-[#087052] tabular-nums">
                      {t('bavDecisionCalculator.controls.costs.formula', {
                        gross: formatRate(selectedScenario.grossAnnualRate),
                        costs: formatRate(selectedScenario.effectiveCostRate),
                        net: formatRate(selectedScenario.modelAnnualRate),
                      })}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      {t('bavDecisionCalculator.controls.costs.method')}
                    </p>
                    <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Metric label={t('bavDecisionCalculator.results.capital.contributionsPerPerson')} value={formatCurrency(selectedScenario.contributionTotal)} />
                      <Metric label={t('bavDecisionCalculator.results.capital.capitalPerPerson')} value={formatCurrency(selectedScenario.projectedCapital)} />
                      <div className="sm:col-span-2">
                        <Metric
                          primary
                          label={t('bavDecisionCalculator.results.capital.capitalGroup')}
                          value={formatCompactCurrency(selectedScenario.projectedCapital * participants)}
                          note={formatCurrency(selectedScenario.projectedCapital * participants)}
                        />
                      </div>
                    </dl>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="calculator-sources-title">
          <div className="healio-container">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087052]">
              {t('bavDecisionCalculator.sources.eyebrow')}
            </p>
            <h2 id="calculator-sources-title" className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              {t('bavDecisionCalculator.sources.title')}
            </h2>
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {['msci', 'msciEur', 'bafin'].map((sourceKey) => (
                <article key={sourceKey} className="rounded-2xl border border-slate-200 bg-[#f7faf9] p-6">
                  <h3 className="font-display text-base font-extrabold">
                    {t(`bavDecisionCalculator.sources.${sourceKey}.publisher`)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {t(`bavDecisionCalculator.sources.${sourceKey}.description`)}
                  </p>
                  <a
                    href={t(`bavDecisionCalculator.sources.${sourceKey}.url`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-[#076046] underline decoration-[#25c990] decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2"
                  >
                    {t('bavDecisionCalculator.sources.open')}
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 text-xs leading-5 text-slate-600 lg:grid-cols-2">
              <p className="rounded-2xl border border-[#25c990]/30 bg-[#effaf6] p-5 font-semibold text-[#07563f] lg:col-span-2">
                {t('bavDecisionCalculator.disclaimers.assumptions')}
              </p>
              <p className="rounded-2xl border border-slate-200 p-5">
                {t('bavDecisionCalculator.disclaimers.projection')}
              </p>
              <p className="rounded-2xl border border-slate-200 p-5">
                {t('bavDecisionCalculator.disclaimers.payroll')}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#07161f] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="healio-container flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
                {t('bavDecisionCalculator.cta.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {t('bavDecisionCalculator.cta.description')}
              </p>
            </div>
            <Link
              to={getPath('potenzialanalyse')}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#25c990] px-7 py-3 font-display text-sm font-extrabold text-[#07161f] transition hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f] sm:text-base"
            >
              {t('bavDecisionCalculator.cta.button')}
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};

export default EmployerBavCalculatorPage;
