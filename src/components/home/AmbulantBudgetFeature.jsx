import React from 'react';
import { ArrowUpRight, Check, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const AmbulantBudgetFeature = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const features = t('budget.features', { returnObjects: true });

  return (
    <section className="home-section overflow-hidden bg-home-midnight text-white max-[359px]:px-2" aria-labelledby="ambulant-budget-title">
      <div className="healio-container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c1a2a] px-5 py-10 max-[359px]:px-3 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-home-mint/15" aria-hidden="true" />
          <div className="absolute -right-6 -top-6 h-52 w-52 rounded-full border border-home-mint/10" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 h-40 w-2/3 bg-gradient-to-r from-home-mint/[0.06] to-transparent" aria-hidden="true" />

          <div className="relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
            <div>
              <div className="flex items-center gap-3 text-home-mint">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-home-mint/15">
                  <HeartPulse className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="home-eyebrow">{t('budget.eyebrow')}</p>
              </div>
              <p className="mt-9 whitespace-nowrap font-display text-[clamp(2.75rem,13.75vw,3.6rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-white sm:text-[clamp(3.6rem,10vw,7.75rem)] sm:leading-[0.78] sm:tracking-[-0.075em]">
                {t('budget.amount')}
              </p>
              <p className="mt-7 max-w-xs font-display text-sm font-bold uppercase tracking-[0.18em] text-home-mint">
                {t('budget.amountLabel')}
              </p>
            </div>

            <div>
              <h2
                id="ambulant-budget-title"
                className="max-w-none font-display text-[clamp(1.65rem,6.8vw,2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] [hyphens:none] [overflow-wrap:normal] max-[359px]:text-[1.4rem] max-[359px]:leading-[1.16] sm:max-w-[15ch] sm:text-5xl sm:leading-tight sm:tracking-[-0.04em]"
              >
                {t('budget.title')}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{t('budget.description')}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-100">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-home-mint text-home-midnight">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl border-l border-white/20 pl-4 text-xs leading-5 text-slate-400">{t('budget.note')}</p>
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
