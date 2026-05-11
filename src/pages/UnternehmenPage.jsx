import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Building2, Calculator, CheckCircle, HeartHandshake, PiggyBank, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';

const solutionIcons = [PiggyBank, ShieldCheck, HeartHandshake];

const UnternehmenPage = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath, lang } = useLanguage();
  const [monthlyContribution, setMonthlyContribution] = useState(250);
  const [years, setYears] = useState(25);
  const [annualReturn, setAnnualReturn] = useState(6);
  const [delayYears, setDelayYears] = useState(5);
  const [employeeCount, setEmployeeCount] = useState(50);
  const [absenceCostPerDay, setAbsenceCostPerDay] = useState(450);
  const [sickDaysWithoutBkv, setSickDaysWithoutBkv] = useState(12);
  const [sickDaysWithBkv, setSickDaysWithBkv] = useState(10);
  const metrics = t('hero.metrics', { returnObjects: true });
  const problemPoints = t('problem.points', { returnObjects: true });
  const solutions = t('solutions.items', { returnObjects: true });
  const bkvEmployerPoints = t('bkvEmployer.points', { returnObjects: true });
  const compoundPoints = t('compound.points', { returnObjects: true });
  const budgetPoints = t('healthBudget.points', { returnObjects: true });
  const steps = t('process.steps', { returnObjects: true });
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/companies' : 'https://healio.de/unternehmen';
  const calculationLocale = lang === 'en' ? 'en-US' : 'de-DE';
  const delayedYears = Math.max(years - delayYears, 0);

  const calculateCompoundValue = (monthlyAmount, durationYears, returnRate) => {
    const months = durationYears * 12;
    const monthlyRate = returnRate / 100 / 12;

    if (months <= 0) return 0;
    if (monthlyRate === 0) return monthlyAmount * months;

    return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  };

  const formatCurrency = (value) => new Intl.NumberFormat(calculationLocale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);

  const formatPercent = (value) => new Intl.NumberFormat(calculationLocale, {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1
  }).format(value);

  const startTodayValue = calculateCompoundValue(monthlyContribution, years, annualReturn);
  const delayedValue = calculateCompoundValue(monthlyContribution, delayedYears, annualReturn);
  const timeAdvantage = startTodayValue - delayedValue;
  const effectiveSickDaysWithBkv = Math.min(sickDaysWithBkv, sickDaysWithoutBkv);
  const annualAbsenceCostWithout = employeeCount * sickDaysWithoutBkv * absenceCostPerDay;
  const annualAbsenceCostWith = employeeCount * effectiveSickDaysWithBkv * absenceCostPerDay;
  const absenceSavings = annualAbsenceCostWithout - annualAbsenceCostWith;
  const absenceDaysSaved = employeeCount * (sickDaysWithoutBkv - effectiveSickDaysWithBkv);

  const schemaMarkup = [
    createWebPageSchema(t('seo.title'), t('seo.description'), canonicalUrl),
    {
      ...createOrganizationSchema(),
      description: t('seo.description'),
      serviceType: ['Betriebliche Altersvorsorge', 'Betriebliche Krankenversicherung', 'Corporate Benefits'],
      areaServed: 'DE'
    }
  ];

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('seo.title')}
        ogDescription={t('seo.description')}
        ogUrl={canonicalUrl}
        alternateUrls={{
          de: 'https://healio.de/unternehmen',
          en: 'https://healio.de/en/companies'
        }}
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white">
        <section className="relative min-h-[92svh] overflow-hidden bg-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <img
            src="/images/hero-unternehmen-b2b.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

          <div className="healio-container relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                <Building2 className="h-4 w-4 text-healio-primary" aria-hidden="true" />
                {t('hero.eyebrow')}
              </div>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
                {t('hero.title')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                {t('hero.description')}
              </p>

              <div className="mt-10">
                <Link
                  to={getPath('potenzialanalyse')}
                  className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-7 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#1da877] hover:shadow-[0_10px_30px_rgba(37,201,144,0.28)]"
                >
                  {t('hero.primaryCta')}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-14 grid max-w-4xl gap-3 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24" aria-labelledby="unternehmen-problem-heading">
          <div className="healio-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">{t('problem.eyebrow')}</p>
              <h2 id="unternehmen-problem-heading" className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                {t('problem.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {t('problem.description')}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#f6faf8] p-6 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-white">
                <TrendingUp className="h-6 w-6" aria-hidden="true" />
              </div>
              <ul className="mt-6 space-y-4">
                {problemPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-slate-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-healio-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#f6faf8] py-20 lg:py-24" aria-labelledby="unternehmen-solutions-heading">
          <div className="healio-container">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">{t('solutions.eyebrow')}</p>
              <h2 id="unternehmen-solutions-heading" className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                {t('solutions.title')}
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {solutions.map((item, index) => {
                const Icon = solutionIcons[index];
                return (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-healio-primary/30 hover:shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
                    {Array.isArray(item.points) && (
                      <ul className="mt-5 space-y-3">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-healio-primary" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
            <div className="mt-8 rounded-lg border border-healio-primary/20 bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">{t('bkvEmployer.eyebrow')}</p>
                  <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
                    {t('bkvEmployer.title')}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {t('bkvEmployer.description')}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {bkvEmployerPoints.map((point) => (
                    <div key={point.title} className="rounded-lg bg-[#f6faf8] p-5">
                      <p className="font-bold text-slate-900">{point.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-slate-900 p-6 text-white md:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                  <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-healio-primary text-white">
                        <Calculator className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-healio-primary">{t('bkvAbsence.eyebrow')}</p>
                        <h3 className="mt-2 text-2xl font-extrabold leading-tight">{t('bkvAbsence.title')}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-300">{t('bkvAbsence.description')}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      <label className="block">
                        <div className="mb-2 flex items-end justify-between gap-4">
                          <span className="text-sm font-semibold text-slate-200">{t('bkvAbsence.employeeCount')}</span>
                          <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{employeeCount}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="250"
                          step="5"
                          value={employeeCount}
                          onChange={(event) => setEmployeeCount(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer accent-healio-primary"
                        />
                      </label>

                      <label className="block">
                        <div className="mb-2 flex items-end justify-between gap-4">
                          <span className="text-sm font-semibold text-slate-200">{t('bkvAbsence.costPerDay')}</span>
                          <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{formatCurrency(absenceCostPerDay)}</span>
                        </div>
                        <input
                          type="range"
                          min="150"
                          max="900"
                          step="25"
                          value={absenceCostPerDay}
                          onChange={(event) => setAbsenceCostPerDay(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer accent-healio-primary"
                        />
                      </label>

                      <label className="block">
                        <div className="mb-2 flex items-end justify-between gap-4">
                          <span className="text-sm font-semibold text-slate-200">{t('bkvAbsence.sickDaysWithout')}</span>
                          <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{t('bkvAbsence.daysValue', { days: sickDaysWithoutBkv })}</span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max="30"
                          step="1"
                          value={sickDaysWithoutBkv}
                          onChange={(event) => setSickDaysWithoutBkv(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer accent-healio-primary"
                        />
                      </label>

                      <label className="block">
                        <div className="mb-2 flex items-end justify-between gap-4">
                          <span className="text-sm font-semibold text-slate-200">{t('bkvAbsence.sickDaysWith')}</span>
                          <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{t('bkvAbsence.daysValue', { days: effectiveSickDaysWithBkv })}</span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max={sickDaysWithoutBkv}
                          step="1"
                          value={effectiveSickDaysWithBkv}
                          onChange={(event) => setSickDaysWithBkv(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer accent-healio-primary"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-5 text-slate-900 md:p-6">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-lg bg-[#f6faf8] p-4">
                        <p className="text-sm font-semibold text-slate-500">{t('bkvAbsence.withoutLabel')}</p>
                        <p className="mt-2 text-2xl font-black text-slate-900">{formatCurrency(annualAbsenceCostWithout)}</p>
                      </div>
                      <div className="rounded-lg bg-[#f6faf8] p-4">
                        <p className="text-sm font-semibold text-slate-500">{t('bkvAbsence.withLabel')}</p>
                        <p className="mt-2 text-2xl font-black text-slate-900">{formatCurrency(annualAbsenceCostWith)}</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-healio-primary p-5 text-white">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">{t('bkvAbsence.savingsLabel')}</p>
                      <p className="mt-2 text-4xl font-black">{formatCurrency(absenceSavings)}</p>
                      <p className="mt-2 text-sm font-semibold text-white/85">{t('bkvAbsence.daysSavedLabel', { days: absenceDaysSaved })}</p>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-500">{t('bkvAbsence.note')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24" aria-labelledby="unternehmen-health-budget-heading">
          <div className="healio-container">
            <div className="overflow-hidden rounded-lg border border-healio-primary/20 bg-white shadow-sm lg:grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-slate-900 p-8 text-white md:p-10 lg:p-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-healio-primary text-white">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">
                  {t('healthBudget.eyebrow')}
                </p>
                <h2 id="unternehmen-health-budget-heading" className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                  {t('healthBudget.title')}
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-200">
                  {t('healthBudget.description')}
                </p>
              </div>

              <div className="bg-[#f6faf8] p-8 md:p-10 lg:p-12">
                <div className="inline-flex rounded-lg bg-white px-4 py-3 text-3xl font-black text-healio-primary shadow-sm">
                  {t('healthBudget.amount')}
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {t('healthBudget.amountLabel')}
                </p>
                <ul className="mt-8 space-y-4">
                  {budgetPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-slate-700">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-healio-primary" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    to={getPath('potenzialanalyse')}
                    className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1da877]"
                  >
                    {t('healthBudget.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6faf8] py-20 lg:py-24" aria-labelledby="unternehmen-compound-heading">
          <div className="healio-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">{t('compound.eyebrow')}</p>
              <h2 id="unternehmen-compound-heading" className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                {t('compound.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {t('compound.description')}
              </p>
              <div className="mt-8">
                <Link
                  to={getPath('potenzialanalyse')}
                  className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1da877]"
                >
                  {t('compound.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="rounded-lg bg-slate-900 p-6 text-white md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-healio-primary text-white">
                    <Calculator className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-healio-primary">{t('compound.visualEyebrow')}</p>
                    <p className="mt-2 text-2xl font-extrabold leading-tight">{t('compound.visualTitle')}</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/10 p-5">
                    <p className="text-sm text-slate-300">{t('compound.startTodayLabel')}</p>
                    <p className="mt-2 text-3xl font-black text-white">{formatCurrency(startTodayValue)}</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-5">
                    <p className="text-sm text-slate-300">{t('compound.delayLabel', { years: delayYears })}</p>
                    <p className="mt-2 text-3xl font-black text-white">{formatCurrency(delayedValue)}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-healio-primary p-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">{t('compound.advantageLabel')}</p>
                  <p className="mt-2 text-4xl font-black">{formatCurrency(timeAdvantage)}</p>
                </div>

                <div className="mt-8 space-y-5">
                  <label className="block">
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <span className="text-sm font-semibold text-slate-200">{t('compound.monthlyContribution')}</span>
                      <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{formatCurrency(monthlyContribution)}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="700"
                      step="25"
                      value={monthlyContribution}
                      onChange={(event) => setMonthlyContribution(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer accent-healio-primary"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <span className="text-sm font-semibold text-slate-200">{t('compound.duration')}</span>
                      <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{t('compound.yearsValue', { years })}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="1"
                      value={years}
                      onChange={(event) => setYears(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer accent-healio-primary"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <span className="text-sm font-semibold text-slate-200">{t('compound.returnRate')}</span>
                      <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{formatPercent(annualReturn)} %</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="9"
                      step="0.5"
                      value={annualReturn}
                      onChange={(event) => setAnnualReturn(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer accent-healio-primary"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <span className="text-sm font-semibold text-slate-200">{t('compound.delay')}</span>
                      <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white">{t('compound.yearsValue', { years: delayYears })}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={delayYears}
                      onChange={(event) => setDelayYears(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer accent-healio-primary"
                    />
                  </label>
                </div>
                <p className="mt-6 text-sm leading-6 text-slate-300">
                  {t('compound.visualDescription')}
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {compoundPoints.map((point, index) => (
                  <article key={point.title} className="rounded-lg border border-slate-200 bg-[#f6faf8] p-5">
                    <p className="text-sm font-black text-healio-primary">0{index + 1}</p>
                    <h3 className="mt-4 font-bold text-slate-900">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{point.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24" aria-labelledby="unternehmen-process-heading">
          <div className="healio-container">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">{t('process.eyebrow')}</p>
              <h2 id="unternehmen-process-heading" className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                {t('process.title')}
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-sm font-black text-healio-primary">0{index + 1}</p>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="healio-container">
            <div className="rounded-lg bg-[#f6faf8] p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                  {t('cta.title')}
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  {t('cta.description')}
                </p>
              </div>
              <div className="mt-8 lg:mt-0">
                <Link
                  to={getPath('potenzialanalyse')}
                  className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1da877]"
                >
                  {t('cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UnternehmenPage;
