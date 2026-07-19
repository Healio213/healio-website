import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const CoverageComparison = () => {
  const { t } = useTranslation('leistungen');
  const { getPath } = useLanguage();
  const items = t('comparison.items', { returnObjects: true });

  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="coverage-comparison-title">
      <div className="healio-container grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:gap-16">
        <div className="xl:sticky xl:top-28 xl:self-start">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700">{t('comparison.eyebrow')}</p>
          <h2 id="coverage-comparison-title" className="mt-4 max-w-[12ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#10202A] sm:text-5xl">
            {t('comparison.title')}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">{t('comparison.description')}</p>
          <Link to={getPath('terminvereinbarung')} className="home-focus mt-8 inline-flex items-center gap-2 rounded-full bg-[#10202A] px-6 py-3.5 font-display text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#18333C] motion-reduce:transform-none">
            {t('comparison.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div role="table" aria-labelledby="coverage-comparison-title" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F7F9F8]">
          <div role="rowgroup">
            <div role="row" className="sr-only grid-cols-[0.58fr_1fr_1fr] gap-5 border-b border-slate-200 bg-[#10202A] px-7 py-5 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#8EE7CA] lg:not-sr-only lg:grid">
              <span role="columnheader">{t('comparison.headers.area')}</span>
              <span role="columnheader">{t('comparison.headers.relevant')}</span>
              <span role="columnheader">{t('comparison.headers.check')}</span>
            </div>
          </div>
          <div role="rowgroup">
            {items.map((item, index) => (
              <div role="row" key={item.key} className={`grid gap-5 px-6 py-7 sm:px-7 sm:py-8 lg:grid-cols-[0.58fr_1fr_1fr] ${index < items.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <div role="cell">
                <span className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-emerald-700">0{index + 1}</span>
                <h3 className="mt-2 font-display text-xl font-extrabold tracking-[-0.025em] text-[#10202A]">{item.label}</h3>
                </div>
                <div role="cell">
                  <p aria-hidden="true" className="mb-2 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-slate-600 lg:hidden">{t('comparison.headers.relevant')}</p>
                  <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{item.relevant}</p>
                </div>
                <div role="cell">
                  <p aria-hidden="true" className="mb-2 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-slate-600 lg:hidden">{t('comparison.headers.check')}</p>
                  <p className="text-sm font-semibold leading-6 text-[#10202A] sm:text-base sm:leading-7">{item.check}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageComparison;
