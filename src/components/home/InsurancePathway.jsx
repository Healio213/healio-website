import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

// Frank 07.10.2026: Karten liebevoller gestalten. Jede Sparte zeigt oben die
// Cartoon-Szene ihrer Produktseite, so sieht man schon vorher, wohin es geht.
const productVisuals = {
  ambulant: {
    scene: '/images/home-cards/ambulant.webp',
    surface: 'bg-[#E7F7EF]',
    border: 'border-[#CCE8DA]',
    label: 'text-emerald-800',
  },
  dental: {
    scene: '/images/home-cards/zahn.webp',
    surface: 'bg-[#FFF1D6]',
    border: 'border-[#EBDCBF]',
    label: 'text-amber-800',
  },
  hospital: {
    scene: '/images/home-cards/stationaer.webp',
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
                className={`home-focus group relative flex w-full flex-col overflow-hidden rounded-3xl border shadow-[0_2px_10px_rgba(12,42,33,0.07)] transition md:shadow-[0_16px_40px_rgba(12,42,33,0.07)] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(12,42,33,0.12)] motion-reduce:transform-none ${visual.surface} ${visual.border}`}
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden bg-[#071726]">
                  <img
                    src={visual.scene}
                    alt=""
                    aria-hidden="true"
                    width="720"
                    height="540"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5 md:p-7">
                  <span className={`text-sm font-extrabold uppercase tracking-[0.14em] md:text-xs ${visual.label}`}>{item.label}</span>
                  <h3 className="mt-2 max-w-[17ch] font-display text-2xl font-bold leading-[1.08] tracking-[-0.02em] text-home-midnight sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-6 text-slate-600 md:text-sm md:leading-6">{item.description}</p>
                  <span className="mt-auto pt-5 md:pt-7">
                    <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-home-midnight px-5 py-2.5 font-display text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(7,17,31,0.16)] transition group-hover:bg-[#12243a]">
                      {item.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
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
