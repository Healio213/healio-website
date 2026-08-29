import React from 'react';
import { Calculator, ChevronDown, MousePointerClick, ShieldCheck } from 'lucide-react';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import { useLanguage } from '@/hooks/useLanguage';

const COPY = {
  de: {
    eyebrow: 'Bonus selbst ausprobieren',
    title: 'Wie viel Beitrag holst du dir zurück?',
    text: 'Wähle deine Aktivitäten und sieh getrennt, was als Geldbonus oder als Zuschuss zum Tarifbeitrag möglich sein kann.',
    badge: 'Interaktives IKK-classic-Beispiel',
    open: 'Bonus-Rechner aufklappen',
    close: 'Bonus-Rechner schließen',
    disclosure: 'Der Rechner zeigt das Bonusmodell der IKK classic 2026 als Beispiel. Geldbonus und Zuschuss sind Alternativen. Der Zuschuss ist auf nachgewiesene zuschussfähige Kosten begrenzt; maßgeblich sind immer die aktuellen Bedingungen der Krankenkasse.',
    secondaryCta: 'Krankenkassen mit KassenBoost vergleichen',
  },
  en: {
    eyebrow: 'Try the bonus yourself',
    title: 'How much of your premium could you get back?',
    text: 'Select your activities and see separate estimates for a cash bonus or a subsidy towards the plan premium.',
    badge: 'Interactive IKK classic example',
    open: 'Open bonus calculator',
    close: 'Close bonus calculator',
    disclosure: 'The calculator uses the 2026 IKK classic bonus model as an example. Cash bonus and subsidy are alternatives. The subsidy is capped at documented eligible costs; the insurer’s current terms always apply.',
    secondaryCta: 'Compare insurers with KassenBoost',
  },
};

const CompactBonusFeature = ({
  className = '',
  calculatorProps = {},
  defaultOpen = false,
}) => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];
  const kassenboostPath = language === 'en' ? '/en/kassenboost' : '/kassenboost';

  return (
    <section className={`px-4 py-10 sm:px-6 md:py-14 lg:px-8 ${className}`} aria-labelledby="compact-bonus-title">
      <details
        className="group mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-amber-200/70 bg-gradient-to-br from-[#fffdf8] via-white to-emerald-50 shadow-[0_24px_70px_rgba(7,17,31,0.10)]"
        open={defaultOpen || undefined}
      >
        <summary className="home-focus grid cursor-pointer list-none items-center gap-5 px-6 py-7 sm:px-9 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 md:py-9 lg:px-12 [&::-webkit-details-marker]:hidden">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <span className="relative hidden h-16 w-16 shrink-0 place-items-center rounded-[1.35rem] border border-amber-200 bg-amber-50 text-amber-700 shadow-[0_10px_24px_rgba(180,123,31,0.12)] sm:grid">
              <Calculator className="h-7 w-7" aria-hidden="true" />
              <MousePointerClick className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-home-mint p-1.5 text-home-midnight shadow-md" aria-hidden="true" />
            </span>
            <div>
              <span className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">{copy.eyebrow}</span>
              <h2 id="compact-bonus-title" className="mt-2 block font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight sm:text-3xl lg:text-4xl">{copy.title}</h2>
              <span className="mt-2 block max-w-3xl text-sm leading-6 text-home-slate sm:text-base">{copy.text}</span>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3 py-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="h-4 w-4 text-home-mint" aria-hidden="true" />
                {copy.badge}
              </span>
            </div>
          </div>

          <span className="inline-flex min-h-12 items-center justify-center rounded-full bg-home-midnight px-5 font-display text-sm font-extrabold text-white shadow-lg transition group-open:bg-home-mint group-open:text-home-midnight sm:min-w-[235px]">
            <span className="group-open:hidden">{copy.open}</span>
            <span className="hidden group-open:inline">{copy.close}</span>
            <ChevronDown className="ml-2 h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>

        <div className="border-t border-emerald-900/10 bg-white/80 px-4 py-7 sm:px-7 md:px-10 md:py-10">
          <AmbulantBonusCalculator
            {...calculatorProps}
            embedded
            secondaryCtaOverride={{
              href: kassenboostPath,
              label: copy.secondaryCta,
              ...calculatorProps.secondaryCtaOverride,
            }}
          />
          <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-5 text-slate-500">{copy.disclosure}</p>
        </div>
      </details>
    </section>
  );
};

export default CompactBonusFeature;
