import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesBudget = () => {
  const { t } = useTranslation('leistungen');
  const { getPath } = useLanguage();

  return (
    <section className="overflow-hidden bg-[#DDEFE8] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="services-budget-title">
      <div className="healio-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div className="relative min-w-0">
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full border border-emerald-900/10" aria-hidden="true" />
          <p className="relative mb-5 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-emerald-800 sm:text-base">
            {t('budget.amountPrefix')}
          </p>
          <p className="relative whitespace-nowrap font-display text-[3.6rem] font-extrabold leading-[0.78] tracking-[-0.075em] text-[#10202A] sm:text-[clamp(4.2rem,9vw,7.5rem)]">
            {t('budget.amount')}
          </p>
          <p className="relative mt-7 max-w-xs font-display text-sm font-extrabold uppercase tracking-[0.18em] text-emerald-800">
            {t('budget.amountLabel')}
          </p>
        </div>

        <div className="min-w-0">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-800">{t('budget.eyebrow')}</p>
          <h2 id="services-budget-title" className="mt-4 max-w-[15ch] break-words [hyphens:auto] [overflow-wrap:anywhere] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#10202A] sm:text-5xl">
            {t('budget.title')}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{t('budget.description')}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {t('budget.features', { returnObjects: true }).map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#10202A] sm:text-base">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#25C990] text-[#07111F]">
                  <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-xs leading-5 text-slate-600">{t('budget.note')}</p>
          <Link to={getPath('ambulant')} className="home-focus mt-8 inline-flex items-center gap-2 rounded-full bg-[#10202A] px-6 py-3.5 font-display text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#18333C] motion-reduce:transform-none">
            {t('budget.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesBudget;
