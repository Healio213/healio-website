import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const CoverageComparison = () => {
  const { t } = useTranslation('leistungen');
  const { getPath } = useLanguage();
  const items = t('comparison.items', { returnObjects: true });

  return (
    <section className="hidden bg-white px-4 py-12 sm:px-6 md:block md:py-24 lg:px-8 lg:py-28" aria-labelledby="coverage-comparison-title">
      <div className="healio-container grid gap-6 max-md:px-0 md:gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:gap-16">
        <div className="min-w-0 xl:sticky xl:top-28 xl:self-start">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-emerald-700 md:text-xs">{t('comparison.eyebrow')}</p>
          <h2 id="coverage-comparison-title" className="mt-4 max-w-[12ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.045em] text-[#10202A] sm:text-5xl">
            {t('comparison.title')}
          </h2>
          <Link to={getPath('terminvereinbarung')} className="home-focus mt-6 inline-flex items-center gap-2 rounded-full bg-[#10202A] px-6 py-3.5 md:mt-8 font-display text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#18333C] motion-reduce:transform-none">
            {t('comparison.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobil Wischreihe mit denselben Prüffragen (die Tabelle bleibt ab md unverändert). */}
        <MobileSwipeRow
          label={t('comparison.title')}
          className="min-w-0 md:hidden"
          desktopClassName=""
          itemClassName="flex"
        >
          {items.map((item) => (
            <div key={item.key} className="w-full rounded-2xl border border-slate-200 bg-[#F7F9F8] p-5">
              <h3 className="font-display text-xl font-extrabold tracking-[-0.025em] text-[#10202A]">{item.label}</h3>
              <p className="mt-3 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-slate-600">{t('comparison.headers.check')}</p>
              <p className="mt-2 text-base font-semibold leading-7 text-[#10202A]">{item.check}</p>
            </div>
          ))}
        </MobileSwipeRow>

        <div role="table" aria-labelledby="coverage-comparison-title" className="hidden overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F7F9F8] md:block">
          <div role="rowgroup">
            {/* not-sr-only setzt das Padding auf 0, deshalb wird es für große Bildschirme ausdrücklich gesetzt. */}
            <div role="row" className="sr-only grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] gap-6 border-b border-slate-200 bg-[#10202A] px-7 py-5 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[#8EE7CA] lg:not-sr-only lg:grid lg:px-8 lg:py-5">
              <span role="columnheader">{t('comparison.headers.area')}</span>
              <span role="columnheader">{t('comparison.headers.check')}</span>
            </div>
          </div>
          <div role="rowgroup">
            {items.map((item, index) => (
              <div role="row" key={item.key} className={`grid gap-3 px-6 py-6 sm:px-7 sm:py-7 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] lg:items-baseline lg:gap-6 lg:px-8 ${index < items.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <div role="cell">
                  <h3 className="font-display text-xl font-extrabold tracking-[-0.025em] text-[#10202A] sm:text-2xl">{item.label}</h3>
                </div>
                <div role="cell">
                  <p aria-hidden="true" className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-slate-600 lg:hidden">{t('comparison.headers.check')}</p>
                  <p className="text-base font-semibold leading-7 text-[#10202A] sm:text-[1.0625rem]">{item.check}</p>
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
