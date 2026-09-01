import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const AmbulantBudgetFeature = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();

  return (
    <section className="home-section overflow-hidden bg-[#FDFAF6] text-white max-[359px]:px-2" aria-labelledby="ambulant-budget-title">
      <div className="healio-container">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0C1A2A] px-5 py-10 shadow-[0_28px_80px_rgba(7,17,31,0.18)] max-[359px]:px-3 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-home-mint/[0.09] blur-2xl" aria-hidden="true" />
          <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#FFF1D6]/[0.06] blur-3xl" aria-hidden="true" />
          <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-home-mint/15" aria-hidden="true" />

          <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <FriendlyIcon kind="budget" tone="mint" size="lg" className="rotate-[-2deg]" />
                <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-home-mint">{t('budget.prefix')}</p>
              </div>
              <p className="mt-6 whitespace-nowrap font-friendly text-[clamp(2.75rem,13.75vw,3.6rem)] font-bold leading-[0.88] tracking-[-0.035em] text-white sm:text-[clamp(3.6rem,9.3vw,7.25rem)] sm:leading-[0.82]">
                {t('budget.amount')}
              </p>
              <p className="mt-7 max-w-xs font-display text-xs font-bold uppercase tracking-[0.18em] text-home-mint sm:text-sm">
                {t('budget.amountLabel')}
              </p>

              <div className="relative mt-9 inline-flex -rotate-1 items-center gap-3 rounded-[1.35rem_1rem_1.5rem_1.1rem] border border-[#E2D1AC] bg-[linear-gradient(145deg,#FFF8E8,#F8E7C6)] px-4 pb-4 pt-5 text-[#0C2A21] shadow-[0_15px_34px_rgba(0,0,0,0.18)]">
                <span className="absolute left-1/2 top-0 h-3 w-14 -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-sm bg-[#E8D7B8]/90 shadow-sm" aria-hidden="true" />
                <FriendlyIcon kind="bonus" tone="butter" size="sm" />
                <div>
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-amber-900/70">{t('budget.bonusLabel')}</p>
                  <p className="font-friendly text-2xl font-bold leading-none">{t('budget.bonusAmount')}</p>
                  <p className="mt-1 text-xs font-semibold text-amber-950/70">{t('budget.bonusNote')}</p>
                </div>
              </div>
            </div>

            <div>
              <h2
                id="ambulant-budget-title"
                className="max-w-none font-friendly text-[clamp(1.65rem,6.8vw,2rem)] font-bold leading-[1.08] tracking-[-0.025em] [hyphens:none] [overflow-wrap:normal] max-[359px]:text-[1.4rem] max-[359px]:leading-[1.16] sm:max-w-[15ch] sm:text-5xl"
              >
                {t('budget.title')}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{t('budget.description')}</p>
              <p className="mt-6 max-w-2xl border-l border-white/20 pl-4 text-xs leading-5 text-slate-400">{t('budget.note')}</p>
              <Link
                to={getPath('ambulant')}
                className="home-focus mt-8 inline-flex items-center gap-2 rounded-full bg-home-mint px-6 py-3.5 font-display text-sm font-extrabold text-home-midnight transition hover:bg-home-mint-active"
              >
                {t('budget.cta')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantBudgetFeature;
