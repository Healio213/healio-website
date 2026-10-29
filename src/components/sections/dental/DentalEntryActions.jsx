import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import GuidedCallbackButton from '@/components/guided/GuidedCallbackButton';
import { useLanguage } from '@/hooks/useLanguage';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { scrollToZahnCheck } from './zahnCheckScroll';

// Beide Einstiege bleiben sichtbar. Erst der lokale Check ordnet den
// Onlineabschluss der UKV oder der Bayerischen zu.
export default function DentalEntryActions({ className = '', desktop = false }) {
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
        {lang === 'en' ? 'Find a plan & apply online' : 'Tarif finden & online abschließen'}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
      <GuidedCallbackButton
        product="zahn"
        className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/50 px-6 py-3 text-center font-display text-base font-bold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
      >
        {lang === 'en' ? 'Book an appointment' : 'Termin buchen'}
      </GuidedCallbackButton>
    </div>
  );
}
