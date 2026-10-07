import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { trackEvent } from '@/lib/analytics';

// Frank 07.10.2026: Karten liebevoller gestalten. Jeder Schritt zeigt oben
// eine kleine Cartoon-Szene im Stil der Kopfbereiche (ohne Geld, ohne Schrift).
const stepVisuals = [
  { scene: '/images/home-cards/schritt1-kasse.webp', surface: 'bg-[#E7F7EF]', border: 'border-[#CCE8DA]' },
  { scene: '/images/home-cards/schritt2-schutz.webp', surface: 'bg-[#FFF1D6]', border: 'border-[#EBDCBF]' },
  { scene: '/images/home-cards/schritt3-bonus.webp', surface: 'bg-[#EAF2FF]', border: 'border-[#D6E1F1]' },
];

const HowHealioWorks = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section id="so-funktioniert" className="home-section relative scroll-mt-20 overflow-hidden bg-[#FDFAF6] py-12 md:py-24 lg:py-28" aria-labelledby="how-healio-title">
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-home-mint/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#FFF1D6]/70 blur-3xl" aria-hidden="true" />
      <div className="healio-container max-md:px-0">
        <div className="relative grid gap-5 md:gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-emerald-900/10 bg-white px-3 py-1.5 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-emerald-800 shadow-[0_8px_22px_rgba(12,42,33,0.06)] md:text-xs">
              KassenBoost × Healio
            </span>
            <h2 id="how-healio-title" className="mt-4 max-w-[17ch] font-display text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-[#0C2A21] sm:mt-5 sm:text-5xl sm:leading-none">
              {t('process.title')}
            </h2>
          </div>
          {/* Experiment Handy-Conversion 10/2026: Einleitung wiederholt Überschrift und Karten; am Handy ausgeblendet, ab md unverändert. */}
          <p className="hidden max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:block lg:justify-self-end">{t('process.description')}</p>
        </div>

        {/* Mobil Wischreihe (drei Schritte), ab md das bisherige Dreier-Raster. */}
        <MobileSwipeRow
          as="ol"
          label={t('process.title')}
          className="relative mt-8 md:mt-12"
          desktopClassName="md:grid md:grid-cols-3 md:gap-5"
          itemClassName="flex"
          bleed
        >
          {steps.map((step, index) => {
            const visual = stepVisuals[index];
            return (
              <div
                key={step.number}
                className={`group relative flex w-full flex-col overflow-hidden rounded-3xl border shadow-[0_2px_10px_rgba(7,17,31,0.07)] transition md:shadow-[0_18px_44px_rgba(7,17,31,0.07)] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(7,17,31,0.11)] motion-reduce:transform-none ${visual.surface} ${visual.border}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071726]">
                  <img
                    src={visual.scene}
                    alt=""
                    aria-hidden="true"
                    width="720"
                    height="540"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="p-5 md:p-7">
                  <h3 className="flex items-center gap-3 font-display text-2xl font-bold leading-tight text-[#0C2A21]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-extrabold tracking-[0.08em] text-emerald-800 ring-1 ring-emerald-900/10 md:text-xs" aria-hidden="true">{step.number}</span>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-6 text-slate-600 md:text-sm md:leading-6">{step.description}</p>
                </div>
              </div>
            );
          })}
        </MobileSwipeRow>

        <div className="relative mt-3 md:mt-8">
          <Link
            to={getPath('kassenboost')}
            onClick={() => trackEvent('home_kassenboost_link', { placement: 'process' })}
            className="home-focus inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-extrabold text-emerald-800 md:min-h-0 underline decoration-emerald-800/30 decoration-2 underline-offset-4 transition hover:text-[#0C2A21]"
          >
            {t('process.detailsCta')}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowHealioWorks;
