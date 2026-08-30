import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import {
  calculateBavScenarios,
  calculateEmployerBavLeverage,
  calculateIllustrativeMonthlyWithdrawal,
} from '@/lib/bavEmployerLeverage';

const MSCI_WORLD_USD_NET_FACTSHEET = 'https://www.msci.com/documents/10199/255599/msci-world-index-usd-net.pdf';
const PUBLIC_MODEL = Object.freeze({
  monthlyContribution: 676,
  years: 30,
  grossAnnualRate: 10,
  effectiveCostRate: 2,
  employeeSocialRate: 0.2115,
});

const roundTo = (value, step) => Math.round(value / step) * step;
const roundUpTo = (value, step) => Math.ceil(value / step) * step;

const CompanyBavLeverage = () => {
  const { t } = useTranslation('unternehmen');
  const { lang, getPath } = useLanguage();
  const [resultMode, setResultMode] = useState('capital');
  const locale = lang === 'en' ? 'en-GB' : 'de-DE';
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }), [locale]);
  const formatEur = (value) => (
    lang === 'en'
      ? `EUR ${numberFormatter.format(value)}`
      : `${numberFormatter.format(value)} EUR`
  );

  const scenario = useMemo(() => calculateBavScenarios({
    monthlyContribution: PUBLIC_MODEL.monthlyContribution,
    years: PUBLIC_MODEL.years,
    annualRates: [PUBLIC_MODEL.grossAnnualRate],
    effectiveCostRate: PUBLIC_MODEL.effectiveCostRate,
  })[0], []);
  const employeeEffect = useMemo(() => calculateEmployerBavLeverage({
    monthlyContribution: PUBLIC_MODEL.monthlyContribution,
    employeeSocialRate: PUBLIC_MODEL.employeeSocialRate,
  }), []);
  const payout = useMemo(() => calculateIllustrativeMonthlyWithdrawal({
    capital: scenario.projectedCapital,
  }), [scenario.projectedCapital]);

  const employeeNetEffect = roundUpTo(employeeEffect.employeeNetImpact, 5);
  const projectedCapital = roundTo(scenario.projectedCapital, 1000);
  const grossMonthlyWithdrawal = roundTo(payout.grossMonthlyWithdrawal, 10);
  const afterModelDeductionMonthly = roundTo(payout.afterModelDeductionMonthly, 10);

  return (
    <section className="bg-white py-14 lg:py-20" aria-labelledby="company-bav-leverage-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#07161f] text-white shadow-[0_30px_90px_rgba(7,22,31,0.16)]">
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border border-[#25c990]/20" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-[#25c990]/10 blur-3xl" aria-hidden="true" />

          <div className="relative p-6 sm:p-9 lg:p-11">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">
                  {t('bavLeverage.eyebrow')}
                </p>
                <h2
                  id="company-bav-leverage-title"
                  className="mt-4 max-w-[16ch] font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
                >
                  <span className="block">{t('bavLeverage.titleLine1')}</span>
                  <span className="block text-[#8ee7ca]">{t('bavLeverage.titleLine2')}</span>
                  <span className="block">{t('bavLeverage.titleLine3')}</span>
                </h2>
              </div>
              <div className="lg:pb-1">
                <p className="max-w-xl text-base leading-7 text-slate-300">
                  {t('bavLeverage.description')}
                </p>
                <p className="mt-4 inline-flex rounded-full border border-[#25c990]/35 bg-[#25c990]/10 px-4 py-2 text-xs font-bold leading-5 text-[#8ee7ca]">
                  {t('bavLeverage.flow.formula')}
                </p>
              </div>
            </div>

            <div
              data-bav-flow="true"
              role="group"
              aria-label={t('bavLeverage.flow.ariaLabel')}
              className="mt-9 grid gap-3 lg:grid-cols-[minmax(0,0.86fr)_auto_minmax(0,0.86fr)_auto_minmax(0,1.28fr)] lg:items-stretch"
            >
              <article className="flex min-h-[13rem] flex-col rounded-[1.5rem] border border-white/[0.12] bg-white/[0.055] p-5 sm:p-6">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.17em] text-slate-400">
                  {t('bavLeverage.flow.employeeStage')}
                </p>
                <p className="mt-auto pt-8 font-display text-[clamp(2.45rem,7vw,4.4rem)] font-extrabold leading-none tracking-[-0.055em] text-white tabular-nums">
                  {formatEur(employeeNetEffect)}
                </p>
                <p className="mt-4 max-w-[24ch] text-sm font-bold leading-5 text-white">
                  {t('bavLeverage.flow.employeeCaption')}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {t('bavLeverage.flow.employeeNote')}
                </p>
              </article>

              <div className="flex items-center justify-center gap-3 py-1 text-[#8ee7ca] lg:w-14 lg:flex-col lg:gap-2 lg:py-0" aria-hidden="true">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.13em] lg:text-center">
                  {t('bavLeverage.flow.firstConnector')}
                </span>
                <ArrowDown className="h-5 w-5 lg:hidden" />
                <ArrowRight className="hidden h-5 w-5 lg:block" />
              </div>

              <article className="flex min-h-[13rem] flex-col rounded-[1.5rem] border border-[#25c990]/40 bg-[#0c2b2d] p-5 sm:p-6">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.17em] text-[#8ee7ca]">
                  {t('bavLeverage.flow.contractStage')}
                </p>
                <p className="mt-auto pt-8 font-display text-[clamp(2.45rem,7vw,4.4rem)] font-extrabold leading-none tracking-[-0.055em] text-white tabular-nums">
                  {formatEur(PUBLIC_MODEL.monthlyContribution)}
                </p>
                <p className="mt-4 max-w-[24ch] text-sm font-bold leading-5 text-white">
                  {t('bavLeverage.flow.contractCaption')}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#8ee7ca]">
                  {t('bavLeverage.flow.contractNote', {
                    contributions: formatEur(scenario.contributionTotal),
                  })}
                </p>
              </article>

              <div className="flex items-center justify-center gap-3 py-1 text-[#8ee7ca] lg:w-14 lg:flex-col lg:gap-2 lg:py-0" aria-hidden="true">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.13em] lg:text-center">
                  {t('bavLeverage.flow.secondConnector')}
                </span>
                <ArrowDown className="h-5 w-5 lg:hidden" />
                <ArrowRight className="hidden h-5 w-5 lg:block" />
              </div>

              <article className="flex min-h-[13rem] flex-col rounded-[1.5rem] bg-[#dff8ee] p-5 text-[#07161f] shadow-[0_18px_45px_rgba(0,0,0,0.14)] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.17em] text-[#087052]">
                    {t('bavLeverage.flow.futureStage')}
                  </p>
                  <fieldset>
                    <legend className="sr-only">{t('bavLeverage.flow.modeLabel')}</legend>
                    <div className="inline-flex rounded-full bg-white/80 p-1 shadow-sm">
                      {['capital', 'monthly'].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          aria-pressed={resultMode === mode}
                          onClick={() => setResultMode(mode)}
                          className={`min-h-9 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087052] ${
                            resultMode === mode
                              ? 'bg-[#07161f] text-white'
                              : 'text-[#07563f] hover:bg-[#effaf6]'
                          }`}
                        >
                          {t(`bavLeverage.flow.${mode}Tab`)}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div data-payout-mode={resultMode} aria-live="polite" className="mt-auto pt-7">
                  {resultMode === 'capital' ? (
                    <>
                      <p className="font-display text-[clamp(2.35rem,6vw,4.2rem)] font-extrabold leading-none tracking-[-0.055em] tabular-nums">
                        {formatEur(projectedCapital)}
                      </p>
                      <p className="mt-4 text-sm font-extrabold leading-5">
                        {t('bavLeverage.flow.capitalCaption')}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[#256451]">
                        {t('bavLeverage.flow.capitalNote', {
                          contributions: formatEur(scenario.contributionTotal),
                        })}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="font-display text-4xl font-extrabold leading-none tracking-[-0.045em] tabular-nums">
                            {formatEur(grossMonthlyWithdrawal)}
                          </p>
                          <p className="mt-3 text-xs font-bold leading-5 text-[#256451]">
                            {t('bavLeverage.flow.monthlyGrossCaption')}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/75 p-4">
                          <p className="font-display text-3xl font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                            {formatEur(afterModelDeductionMonthly)}
                          </p>
                          <p className="mt-3 text-xs font-bold leading-5 text-[#256451]">
                            {t('bavLeverage.flow.monthlyAfterCaption', {
                              deduction: payout.modelDeductionRate,
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-[0.7rem] leading-5 text-[#256451]">
                        {t('bavLeverage.flow.monthlyNote')}
                      </p>
                    </>
                  )}
                </div>
              </article>
            </div>

            <div className="mt-7 grid gap-5 border-t border-white/10 pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <p className="max-w-3xl text-sm font-semibold leading-6 text-[#8ee7ca]">
                  {t('bavLeverage.netEffectExplanation')}
                </p>
                <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400">
                  {t('bavLeverage.shortDisclaimer')}
                </p>
              </div>
              <Link
                to={getPath('vorsorgeRechner')}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25c990] px-5 py-3 font-display text-[0.82rem] font-extrabold text-[#07161f] transition hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f] sm:px-7 sm:text-sm"
              >
                {t('bavLeverage.cta')}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <details className="group mt-5 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.045]">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-display text-sm font-extrabold text-[#8ee7ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-inset sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="group-open:hidden">{t('bavLeverage.detailsShow')}</span>
                    <span className="hidden group-open:inline">{t('bavLeverage.detailsHide')}</span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                </summary>

                <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-6">
                  <p className="font-display text-sm font-extrabold text-white">
                    {t('bavLeverage.splitTitle')}
                  </p>
                  <div className="mt-4 grid overflow-hidden rounded-xl sm:grid-cols-2">
                    <p className="bg-[#dff8ee] p-4 text-sm font-bold leading-6 text-[#07563f]">
                      {t('bavLeverage.splitFree')}
                    </p>
                    <p className="border-t border-white/40 bg-[#fff2d5] p-4 text-sm font-bold leading-6 text-[#7a5110] sm:border-l sm:border-t-0">
                      {t('bavLeverage.splitLiable')}
                    </p>
                  </div>
                  <Link
                    to={`${getPath('vorsorgeRechner')}#calculator-sources-title`}
                    className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-[#8ee7ca] underline decoration-[#25c990] decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f]"
                  >
                    {t('bavLeverage.legalSource')}
                  </Link>

                  <div className="mt-6 border-l-2 border-[#25c990] pl-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ee7ca]">
                      {t('bavLeverage.employerCostLabel')}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {t('bavLeverage.employerCost')}
                    </p>
                  </div>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {t('bavLeverage.returnLabel')}
                    </p>
                    <p className="mt-3 font-display text-xl font-extrabold text-[#8ee7ca]">
                      {t('bavLeverage.standardFormula')}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-300">
                      {t('bavLeverage.historicalContext')}
                    </p>
                    <a
                      href={MSCI_WORLD_USD_NET_FACTSHEET}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-[#8ee7ca] underline decoration-[#25c990] decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f]"
                    >
                      {t('bavLeverage.source')}
                    </a>
                  </div>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {t('bavLeverage.payoutModelTitle')}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {t('bavLeverage.payoutModel')}
                    </p>
                  </div>

                  <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-slate-400">
                    {t('bavLeverage.disclaimer')}
                  </p>
                </div>
              </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyBavLeverage;
