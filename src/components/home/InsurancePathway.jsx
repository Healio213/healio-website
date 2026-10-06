import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const productVisuals = {
  ambulant: {
    kind: 'ambulant',
    tone: 'mint',
    surface: 'bg-[#E7F7EF]',
    border: 'border-[#CCE8DA]',
    label: 'text-emerald-800',
  },
  dental: {
    kind: 'dental',
    tone: 'butter',
    surface: 'bg-[#FFF1D6]',
    border: 'border-[#EBDCBF]',
    label: 'text-amber-800',
  },
  hospital: {
    kind: 'hospital',
    tone: 'sky',
    surface: 'bg-[#EAF2FF]',
    border: 'border-[#D6E1F1]',
    label: 'text-sky-800',
  },
};

const InsurancePathway = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('products.items', { returnObjects: true });

  return (
    <section id="schutz" className="home-section relative z-10 scroll-mt-20 overflow-hidden bg-white py-12 md:py-24 lg:py-28" aria-labelledby="insurance-pathway-title">
      <div className="healio-container max-md:px-0">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h2 id="insurance-pathway-title" className="max-w-[15ch] font-display text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-home-midnight sm:text-5xl sm:leading-none">
            {t('products.title')}
          </h2>
          <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:justify-self-end">
            {t('products.description')}
          </p>
        </div>

        {/* Mobil Wischreihe (drei Sparten), ab md das bisherige Dreier-Raster. */}
        <MobileSwipeRow
          label={t('products.title')}
          className="mt-8 md:mt-12"
          desktopClassName="md:grid md:grid-cols-3 md:gap-5"
          itemClassName="flex"
        >
          {items.map((item) => {
            const visual = productVisuals[item.key] || productVisuals.ambulant;

            return (
              <Link
                key={item.key}
                to={getPath(item.routeKey)}
                className={`home-focus group relative flex w-full flex-col overflow-hidden rounded-3xl border p-5 shadow-[0_2px_10px_rgba(12,42,33,0.07)] transition md:shadow-[0_16px_40px_rgba(12,42,33,0.07)] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(12,42,33,0.12)] motion-reduce:transform-none md:min-h-[350px] md:p-7 ${visual.surface} ${visual.border}`}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-current opacity-[0.06]" aria-hidden="true" />
                <FriendlyIcon
                  kind={visual.kind}
                  tone={visual.tone}
                  size="lg"
                  className="transition-transform duration-200 group-hover:-rotate-2 group-hover:scale-[1.04] motion-reduce:transform-none"
                />
                <span className={`relative mt-5 text-sm font-extrabold uppercase tracking-[0.18em] md:mt-7 md:text-xs ${visual.label}`}>
                  {item.label}
                </span>
                <h3 className="relative mt-3 max-w-[17ch] font-display text-2xl font-bold leading-[1.08] tracking-[-0.02em] text-home-midnight sm:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="relative mt-4 text-base leading-6 text-slate-600 md:text-sm md:leading-6">{item.description}</p>
                <span className="relative mt-auto pt-5 md:pt-7">
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-home-midnight px-5 py-2.5 font-display text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(7,17,31,0.16)] transition group-hover:bg-[#12243a]">
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            );
          })}
        </MobileSwipeRow>
      </div>
    </section>
  );
};

export default InsurancePathway;
