import React from 'react';
import { Calculator } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { direkteMaske } from '@/components/LeadCaptureProvider';
import LeadCaptureLink from '@/components/LeadCaptureLink';
import { useLanguage } from '@/hooks/useLanguage';
import { trackGoogleAdsAntrag } from '@/lib/google-ads';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { UKV_URL } from './dentalLinks';
import { scrollToZahnCheck } from './zahnCheckScroll';

// Nachbesserung 22.11.2026 (Gegenprüfung Kundensicht, doppelt gefragt): Mit eingeschalteter gemeinsamer Zahn-Maske führt
// „Jetzt sehen, was du zahlst“ direkt in den Einstieg von /antrag/zahn. Dort siehst du nach den kurzen Fragen Tarife und Beitrag,
// ohne vorher dieselben Fragen im Zahn-Check zu beantworten. Ohne Schalter und auf Englisch wie bisher zum Zahn-Check.
export const useZahnDirekt = () => {
  const { pathname } = useLocation();
  return Boolean(direkteMaske(UKV_URL, pathname));
};
export const zahnEinstiegHinweis = (lang, direkt) => {
  if (lang === 'en') return 'Three or four short questions, then on to the premium calculator.';
  return direkt ? 'Ein paar kurze Fragen, dann siehst du Tarife und Beitrag.' : 'Drei bis vier kurze Fragen, dann zum Beitragsrechner.';
};

const KNOPF = 'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-6 py-3 text-center font-display text-base font-extrabold text-home-midnight transition hover:bg-home-mint-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto';

// Frank 01.11.2026: Der Einstieg führt in den Zahn-Check und von dort in den
// Tarifrechner. Der Termin steht nur noch einmal am Seitenende.
export default function DentalEntryActions({ className = '', desktop = false, hint = false }) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const direkt = useZahnDirekt();
  const inhalt = (
    <>
      <Calculator className="h-5 w-5 shrink-0" aria-hidden="true" />
      {lang === 'en' ? 'See what you would pay' : 'Jetzt sehen, was du zahlst'}
    </>
  );
  return (
    <div data-dental-entry-actions className={`flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      {direkt ? (
        // Messung wie der Kopfknopf auf /zahn: Meta „RechnerStart“ wie bisher beim Knopf, Google Ads „Antrag geöffnet“, je mit der
        // Zustimmungsregel des Moduls; den anonymen Zähler antragsweg zahn-allein setzt der Weg in die Maske (LeadCaptureProvider).
        <LeadCaptureLink
          data-desktop-primary={desktop || undefined}
          data-zahn-direkt=""
          href={UKV_URL}
          trackingCategory="zahn-antrag"
          onClick={() => { trackMetaRechnerStart(); trackGoogleAdsAntrag(); }}
          className={KNOPF}
        >
          {inhalt}
        </LeadCaptureLink>
      ) : (
        <a
          data-desktop-primary={desktop || undefined}
          href="#zahn-check"
          onClick={(event) => {
            event.preventDefault();
            trackMetaRechnerStart();
            scrollToZahnCheck(reduceMotion);
          }}
          className={KNOPF}
        >
          {inhalt}
        </a>
      )}
      {/* Befund 3 (12.11.2026): ehrlich sagen, was hinter dem Knopf kommt. Im Seitenkopf steht dieselbe
          Aussage schon als Hinweiszeile unter dem Knopf (ZahnPage, DesktopLead), deshalb nur auf Wunsch. */}
      {hint && (
        <p className="w-full text-sm leading-5 text-slate-300">
          {zahnEinstiegHinweis(lang, direkt)}
        </p>
      )}
    </div>
  );
}
