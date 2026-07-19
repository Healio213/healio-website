import React from 'react';
import { ArrowRight, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesFinalCTA = () => {
  const { t } = useTranslation('leistungen');
  const { getPath } = useLanguage();

  return (
    <>
      <aside className="bg-[#F5F8F6] px-4 pb-4 pt-10 sm:px-6 lg:px-8" aria-labelledby="pet-path-title">
        <div className="healio-container flex flex-col gap-6 rounded-[2rem] border border-emerald-900/10 bg-white px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#DDEFE8] text-emerald-800">
              <PawPrint className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">{t('pet.eyebrow')}</p>
              <h2 id="pet-path-title" className="mt-2 break-words [hyphens:auto] [overflow-wrap:anywhere] font-display text-xl font-extrabold tracking-[-0.025em] text-[#10202A] sm:text-2xl">{t('pet.title')}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t('pet.description')}</p>
            </div>
          </div>
          <Link to={getPath('tierkrankenversicherung')} className="home-focus inline-flex shrink-0 items-center gap-2 font-display text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900">
            {t('pet.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <section className="bg-[#F5F8F6] px-4 py-16 sm:px-6 md:py-20 lg:px-8" aria-labelledby="services-final-cta-title">
        <div className="healio-container overflow-hidden rounded-[2.5rem] bg-[#10202A] px-6 py-14 text-white shadow-[0_28px_90px_rgba(7,17,31,0.18)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#8EE7CA]">{t('finalCta.eyebrow')}</p>
              <h2 id="services-final-cta-title" className="mt-4 max-w-[14ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {t('finalCta.title')}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t('finalCta.description')}</p>
            </div>
            <Link to={getPath('terminvereinbarung')} className="home-focus inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#25C990] px-7 py-4 font-display text-sm font-extrabold text-[#07111F] transition hover:-translate-y-0.5 hover:bg-[#5EDCAF] focus-visible:ring-offset-[#10202A] motion-reduce:transform-none">
              {t('finalCta.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesFinalCTA;
