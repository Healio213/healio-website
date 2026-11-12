import React from 'react';
import { Calculator } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { scrollToZahnCheck } from './zahnCheckScroll';

// Frank 01.11.2026: Der Einstieg führt in den Zahn-Check und von dort in den
// Tarifrechner. Der Termin steht nur noch einmal am Seitenende.
export default function DentalEntryActions({ className = '', desktop = false, hint = false }) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  return (
    <div data-dental-entry-actions className={`flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <a
        data-desktop-primary={desktop || undefined}
        href="#zahn-check"
        onClick={(event) => {
          event.preventDefault();
          trackMetaRechnerStart();
          scrollToZahnCheck(reduceMotion);
        }}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-6 py-3 text-center font-display text-base font-extrabold text-home-midnight transition hover:bg-home-mint-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
      >
        <Calculator className="h-5 w-5 shrink-0" aria-hidden="true" />
        {lang === 'en' ? 'See what you would pay' : 'Jetzt sehen, was du zahlst'}
      </a>
      {/* Befund 3 (12.11.2026): ehrlich sagen, was hinter dem Knopf kommt. Im Seitenkopf steht dieselbe
          Aussage schon als Hinweiszeile unter dem Knopf (ZahnPage, DesktopLead), deshalb nur auf Wunsch. */}
      {hint && (
        <p className="w-full text-sm leading-5 text-slate-300">
          {lang === 'en' ? 'Three or four short questions, then on to the premium calculator.' : 'Drei bis vier kurze Fragen, dann zum Beitragsrechner.'}
        </p>
      )}
    </div>
  );
}
