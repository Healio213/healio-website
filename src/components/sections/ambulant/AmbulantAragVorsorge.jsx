import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';

// Originale vom 10.10.2026: ARAG V100 Produktseite sowie A842 04.2026,
// Tarifbeschreibung S. 40–41. V100 als eigenständige Vorsorgeoption zeigen;
// keine Budgetaddition oder Kombination mit SDK/UKV voraussetzen.
const COPY = {
  de: {
    title: 'ARAG V100: Vorsorge gezielt absichern.',
    body: 'Ein eigenständiger Tarif für zusätzliche ärztliche Vorsorge aus dem Leistungskatalog, etwa Gesundheitscheck und Krebsfrüherkennung.',
    benefit: '100 % der anerkannten Restkosten · bis 1.000 EUR Vorsorge in zwei aufeinanderfolgenden Kalenderjahren',
    vaccine: 'Impfungen: separater Höchstbetrag von 200 EUR im selben Zeitraum',
    note: 'Ohne Gesundheitsfragen · 3 Monate allgemeine Wartezeit. Kassenleistungen zuerst nutzen. Tarifkatalog und Bedingungen gelten.',
    cta: 'ARAG-Vorsorge persönlich anfragen',
    destination: 'Wir prüfen den passenden Abschlussweg für dich.',
    details: 'Was ist bei Schwangerschaft wichtig?',
    pregnancy: 'Der Katalog nennt je einmal zusätzliche Sonografie und Triple-Test. Nicht jeder Pränataltest ist versichert. Bei bereits bestehender Schwangerschaft ist der Leistungsanspruch vor einer Zusage individuell zu klären.',
    combination: 'Vorhandene Zusatzversicherungen angeben. Die zulässige Kombination und die tatsächliche Restkostenerstattung werden im Einzelfall geprüft.',
  },
  en: {
    title: 'ARAG V100: focused preventive cover.',
    body: 'A separate plan for additional medical screening in its benefit catalogue, such as health checks and cancer screening.',
    benefit: '100% of eligible remaining costs · up to EUR 1,000 for screening over two consecutive calendar years',
    vaccine: 'Vaccinations: a separate EUR 200 limit over the same period',
    note: 'No health questions · 3-month general waiting period. Use statutory benefits first. Benefit catalogue and policy terms apply.',
    cta: 'Ask about ARAG preventive cover',
    destination: 'We check the appropriate application route for you.',
    details: 'What matters during pregnancy?',
    pregnancy: 'The catalogue lists one additional ultrasound and one triple test per pregnancy. Not every prenatal test is covered. For an existing pregnancy, entitlement must be clarified individually before any cover is promised.',
    combination: 'Declare existing supplementary policies. Permitted combinations and actual remaining-cost reimbursement require individual assessment.',
  },
};

const AmbulantAragVorsorge = () => {
  const { lang, getPath } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];
  const ctaClass = 'home-focus inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-home-midnight px-5 py-3 font-display text-sm font-extrabold text-white transition hover:bg-[#12304a] sm:w-auto';

  return (
    <aside id="arag-vorsorge" aria-labelledby="arag-vorsorge-title" className="mt-8 scroll-mt-24 border-y border-[#d3e4eb] bg-[#f4f9fc] px-5 py-6 sm:px-7 md:mt-10">
      <div className="flex items-center gap-3">
        <FriendlyIcon kind="prevention" tone="sky" size="sm" />
        <h3 id="arag-vorsorge-title" className="font-display text-xl font-extrabold leading-tight text-home-midnight sm:text-2xl">{copy.title}</h3>
      </div>
      <p className="mt-3 max-w-[70ch] text-base leading-relaxed text-[#324d60]">{copy.body}</p>
      <p className="mt-3 max-w-[70ch] text-base font-bold leading-relaxed text-home-midnight">{copy.benefit}</p>
      <p className="mt-1 text-sm leading-relaxed text-[#324d60]">{copy.vaccine}</p>
      <p className="mt-3 max-w-[76ch] text-sm leading-relaxed text-[#324d60]">{copy.note}</p>
      <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Link to={getPath('kontakt')} aria-describedby="arag-vorsorge-destination" className={ctaClass}>
          {copy.cta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
        <p id="arag-vorsorge-destination" className="text-sm leading-5 text-[#324d60]">{copy.destination}</p>
      </div>
      <details className="group mt-4 border-t border-[#d3e4eb] pt-2">
        <summary className="home-focus flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-home-midnight [&::-webkit-details-marker]:hidden">
          {copy.details}<ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p className="mt-1 max-w-[74ch] text-sm leading-6 text-[#324d60]">{copy.pregnancy}</p>
      </details>
      <p className="mt-3 max-w-[76ch] text-sm leading-relaxed text-[#324d60]">{copy.combination}</p>
    </aside>
  );
};

export default AmbulantAragVorsorge;
