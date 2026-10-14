import React from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import { useLanguage } from '@/hooks/useLanguage';

const COPY = {
  de: {
    eyebrow: 'Bonus selbst ausprobieren',
    title: 'Wie viel Beitrag holst du dir zurück?',
    text: 'Wähle deine Aktivitäten und sieh, was als Zuschuss zum Tarifbeitrag möglich sein kann.',
    badge: 'Interaktives IKK-classic-Beispiel',
    open: 'Bonus-Rechner aufklappen',
    close: 'Bonus-Rechner schließen',
    disclosure: 'Beispiel mit dem Bonusmodell der IKK classic 2026. Maßgeblich sind immer die aktuellen Bedingungen der Krankenkasse.',
    secondaryCta: 'Krankenkassen mit KassenBoost vergleichen',
  },
  en: {
    eyebrow: 'Try the bonus yourself',
    title: 'How much of your premium could you get back?',
    text: 'Select your activities and see what a subsidy towards the plan premium could be.',
    badge: 'Interactive IKK classic example',
    open: 'Open bonus calculator',
    close: 'Close bonus calculator',
    disclosure: 'Example based on the 2026 IKK classic bonus model. The insurer’s current terms always apply.',
    secondaryCta: 'Compare insurers with KassenBoost',
  },
};

// Klassen für die kompakte Handy-Anordnung (mobileSwipe) und den bisherigen
// Stand. Die Karte ist schon eine Ausklapp-Karte; mobil werden nur Abstände,
// Schatten und Zeilenhöhe enger, Kleingedrucktes steigt auf 14 px. Ab md
// (768 px) sind beide Sätze identisch; ohne mobileSwipe bleibt jede Seite
// wie zuvor.
const LAYOUT = {
  standard: {
    section: 'py-10',
    card: 'shadow-[0_24px_70px_rgba(7,17,31,0.10)]',
    summary: 'gap-5 px-6 py-7',
    eyebrow: 'text-xs',
    text: 'leading-7',
    badge: 'mt-4 text-xs',
  },
  kompakt: {
    section: 'py-6',
    card: 'shadow-[0_12px_32px_rgba(7,17,31,0.08)] md:shadow-[0_24px_70px_rgba(7,17,31,0.10)]',
    summary: 'gap-4 px-5 py-5',
    eyebrow: 'text-sm md:text-xs',
    text: 'leading-6 md:leading-7',
    badge: 'mt-3 text-sm md:mt-4 md:text-xs',
  },
};

// Gemeinsamer Rechner-Einstieg für Ambulant, Zahn und Stationär.
// mobileSwipe wählt die engeren Abstände auf dem Handy.
const CompactBonusFeature = ({
  className = '',
  calculatorProps = {},
  calculatorIntroNote,
  defaultOpen = false,
  mobileSwipe = false,
}) => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];
  const kassenboostPath = language === 'en' ? '/en/kassenboost' : '/kassenboost';
  const ui = mobileSwipe ? LAYOUT.kompakt : LAYOUT.standard;

  return (
    <section className={`px-4 sm:px-6 md:py-14 lg:px-8 ${ui.section} ${className}`} aria-labelledby="compact-bonus-title">
      <details
        className={`group mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-amber-200/70 bg-gradient-to-br from-[#fffdf8] via-white to-emerald-50 ${ui.card}`}
        open={defaultOpen || undefined}
      >
        <summary className={`home-focus grid cursor-pointer list-none grid-cols-[6rem_minmax(0,1fr)] items-center sm:grid-cols-[9rem_minmax(0,1fr)] sm:px-9 md:gap-x-8 md:py-9 lg:grid-cols-[12rem_minmax(0,1fr)_auto] lg:px-12 [&::-webkit-details-marker]:hidden ${ui.summary}`}>
          <div className="relative self-center lg:row-span-2">
            <div className="absolute inset-3 rounded-full bg-home-mint/15 blur-2xl" aria-hidden="true" />
            <img
              src="/images/friendly-icons/bonus-you-mascot.webp"
              alt=""
              aria-hidden="true"
              width="512"
              height="512"
              loading="lazy"
              decoding="async"
              className="relative mx-auto h-28 w-28 max-w-full object-contain sm:h-36 sm:w-36 lg:h-52 lg:w-52"
            />
          </div>
          <div className="min-w-0">
            <span className={`hidden font-display font-extrabold uppercase tracking-[0.2em] text-emerald-700 md:inline ${ui.eyebrow}`}>{copy.eyebrow}</span>
            <h2 id="compact-bonus-title" className="block font-display text-xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight md:mt-2 md:text-3xl lg:text-4xl">
              <span className="md:hidden">{language === 'en' ? 'How much bonus is possible?' : 'Wie viel Bonus ist möglich?'}</span>
              <span className="hidden md:inline">{copy.title}</span>
            </h2>
            <span className="mt-2 block text-sm leading-5 text-emerald-900 md:hidden">{copy.badge}</span>
          </div>
          <div className="col-span-2 hidden min-w-0 md:block lg:col-span-1 lg:col-start-2">
            <span className={`block max-w-3xl text-base text-home-slate ${ui.text}`}>{copy.text}</span>
            <span className={`inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3 py-2 font-bold text-emerald-900 ${ui.badge}`}>
              <ShieldCheck className="h-4 w-4 text-home-mint" aria-hidden="true" />
              {copy.badge}
            </span>
          </div>

          <span className="col-span-2 inline-flex min-h-12 items-center justify-center rounded-full bg-home-midnight px-5 font-display text-base font-extrabold text-white shadow-lg transition group-open:bg-home-mint group-open:text-home-midnight sm:min-w-[235px] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <span className="group-open:hidden">{copy.open}</span>
            <span className="hidden group-open:inline">{copy.close}</span>
            <ChevronDown className="ml-2 h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>

        <div className="border-t border-emerald-900/10 bg-white/80 px-4 py-7 sm:px-7 md:px-10 md:py-10">
          <p className="mb-5 text-base leading-7 text-home-slate md:hidden">{copy.text}</p>
          {calculatorIntroNote && <p className="mx-auto mb-7 max-w-4xl border-l-2 border-home-mint pl-4 text-sm leading-6 text-home-slate">{calculatorIntroNote}</p>}
          <AmbulantBonusCalculator
            {...calculatorProps}
            embedded
            secondaryCtaOverride={{
              href: kassenboostPath,
              label: copy.secondaryCta,
              ...calculatorProps.secondaryCtaOverride,
            }}
          />
          <p className="mx-auto mt-6 max-w-4xl text-center text-base leading-7 text-slate-600">{copy.disclosure}</p>
        </div>
      </details>
    </section>
  );
};

export default CompactBonusFeature;
