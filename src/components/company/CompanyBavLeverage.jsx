import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const MSCI_WORLD_USD_NET_FACTSHEET = 'https://www.msci.com/documents/10199/255599/msci-world-index-usd-net.pdf';

const CompanyBavLeverage = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();

  return (
    <section className="bg-white py-14 lg:py-20" aria-labelledby="company-bav-leverage-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#07161f] text-white shadow-[0_30px_90px_rgba(7,22,31,0.16)]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-11">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">
                {t('bavLeverage.eyebrow')}
              </p>
              <h2
                id="company-bav-leverage-title"
                className="mt-5 max-w-[13ch] font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-5xl"
              >
                {t('bavLeverage.title')}
              </h2>
              <p className="mt-6 max-w-xl border-l-2 border-[#25c990] pl-5 text-sm font-bold leading-6 text-[#8ee7ca]">
                {t('bavLeverage.netEffectExplanation')}
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                {t('bavLeverage.description')}
              </p>
              <Link
                to={getPath('vorsorgeRechner')}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#25c990] px-7 py-3 font-display text-sm font-extrabold text-[#07161f] transition hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07161f]"
              >
                {t('bavLeverage.cta')}
              </Link>
              <p className="mt-4 max-w-xl text-xs leading-5 text-slate-400">
                {t('bavLeverage.shortDisclaimer')}
              </p>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
              <p className="max-w-xl font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-white">
                {t('bavLeverage.detailsIntro')}
              </p>

              <details className="group mt-6 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.045]">
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

                  <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-slate-400">
                    {t('bavLeverage.disclaimer')}
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyBavLeverage;
