import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { trackEvent } from '@/lib/analytics';

// Thematische Sach-Icons im Stil der Sparten-Karten. Die 3D-Figur bleibt
// bewusst nur der Praxis-Karte im Abschnitt AudienceLinks vorbehalten.
const stepVisuals = [
  { kind: 'comparison', tone: 'mint', surface: 'bg-[#E7F7EF]', border: 'border-[#CCE8DA]' },
  { kind: 'protection', tone: 'butter', surface: 'bg-[#FFF1D6]', border: 'border-[#EBDCBF]' },
  { kind: 'bonus', tone: 'sky', surface: 'bg-[#EAF2FF]', border: 'border-[#D6E1F1]' },
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
                className={`group relative w-full overflow-hidden rounded-3xl border p-5 shadow-[0_2px_10px_rgba(7,17,31,0.07)] transition md:shadow-[0_18px_44px_rgba(7,17,31,0.07)] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(7,17,31,0.11)] motion-reduce:transform-none md:min-h-[315px] md:p-7 ${visual.surface} ${visual.border}`}
              >
                <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-current opacity-[0.06]" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <FriendlyIcon kind={visual.kind} label={step.title} tone={visual.tone} size="xl" className="transition-transform duration-200 group-hover:rotate-2 group-hover:scale-[1.03] motion-reduce:transform-none" />
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-emerald-900/10 bg-white/70 font-display text-sm font-extrabold tracking-[0.12em] text-emerald-800 md:text-xs">
                    {step.number}
                  </span>
                </div>
                <h3 className="relative mt-5 font-display text-2xl font-bold leading-tight text-[#0C2A21] md:mt-7">{step.title}</h3>
                <p className="relative mt-3 text-base leading-6 text-slate-600 md:text-sm md:leading-6">{step.description}</p>
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
