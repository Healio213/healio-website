import React from 'react';
import LeadCaptureLink from '@/components/LeadCaptureLink';
import { ARAG_OFFER_URL } from '@/lib/lead-capture';
import { ArrowRight, ChevronDown } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';

// Originale vom 10.10.2026: ARAG V100 Produktseite sowie A842 04.2026,
// Tarifbeschreibung S. 40–41. V100 als eigenständige Vorsorgeoption zeigen;
// keine Budgetaddition oder Kombination mit SDK/UKV voraussetzen.
const COPY = {
  de: {
    entry: 'Weitere Vorsorge-Alternative: ARAG V100',
    eyebrow: 'Eigener Vorsorgeweg · ARAG V100',
    title: 'Nur zusätzliche ärztliche Vorsorge wichtig?',
    body: 'Wenn du gezielte Checks suchst, ist ARAG V100 ein eigener Prüfweg: bis zu 1.000 EUR für Vorsorge aus einem festen Tarifkatalog, etwa großer Gesundheitscheck, Sonografie der inneren Organe, Lungencheck und Krebsfrüherkennung.',
    benefit: '100 % der anerkannten Restkosten · bis 1.000 EUR Vorsorge in zwei aufeinanderfolgenden Kalenderjahren',
    vaccine: 'Impfungen: separater Höchstbetrag von 200 EUR im selben Zeitraum',
    note: 'Keine Ablehnung wegen Vorerkrankungen · 3 Monate allgemeine Wartezeit. Kassenleistungen zuerst nutzen. Tarifkatalog und Bedingungen gelten.',
    cta: 'Mein V100-Angebot anfragen',
    destination: 'Vorname und E-Mail genügen für den Start. Angebot und Antrag begleiten wir persönlich.',
    checksTitle: 'Welche Checks werden erstattet?',
    checks: 'Versichert sind die im Tarifkatalog genannten Vorsorgeuntersuchungen zur Früherkennung von Krankheiten. Ein frei verfügbares Labor- oder Trainingsbudget ist das nicht. Für Laktattests, Spiroergometrie oder einzelne Vitamin- und Blutwerte klären wir die konkreten ärztlichen Leistungen vor einer Zusage. Kassenleistungen sind zuerst zu nutzen. Privatrechnungen nach GOÄ werden nur berücksichtigt, soweit keine Abrechnung über die gesetzliche Krankenkasse möglich ist.',
    details: 'Was ist bei Schwangerschaft wichtig?',
    pregnancy: 'Der Katalog nennt je einmal zusätzliche Sonografie und Triple-Test. Nicht jeder Pränataltest ist versichert. Bei bereits bestehender Schwangerschaft ist der Leistungsanspruch vor einer Zusage individuell zu klären.',
    combination: 'Schon privat zusatzversichert? Gib deinen vorhandenen Schutz an. Der ARAG-Antrag schließt gleichartigen Schutz bei einem anderen Versicherer aus. Die Vorsorgebudgets von SDK und ARAG lassen sich deshalb nicht als gemeinsames Paket zusagen.',
  },
  en: {
    entry: 'Another screening option: ARAG V100',
    eyebrow: 'A separate screening route · ARAG V100',
    title: 'Only looking for additional medical screening?',
    body: 'For targeted health checks, ARAG V100 is a separate route to assess: up to EUR 1,000 for screening in a fixed benefit catalogue, such as a comprehensive health check, ultrasound of internal organs, lung checks and cancer screening.',
    benefit: '100% of eligible remaining costs · up to EUR 1,000 for screening over two consecutive calendar years',
    vaccine: 'Vaccinations: a separate EUR 200 limit over the same period',
    note: 'No health questions · 3-month general waiting period. Use statutory benefits first. Benefit catalogue and policy terms apply.',
    cta: 'Request my V100 quote',
    destination: 'Start with your first name and email. We personally guide your quote and application.',
    checksTitle: 'Which checks are eligible?',
    checks: 'The plan covers screening for early detection of disease listed in its benefit catalogue. It is not a freely available laboratory or training budget. For lactate tests, cardiopulmonary exercise testing or individual vitamin and blood markers, we clarify the specific medical services before promising cover. Statutory benefits must be used first. Private invoices under GOÄ are considered only where the service cannot be billed to the statutory insurer.',
    details: 'What matters during pregnancy?',
    pregnancy: 'The catalogue lists one additional ultrasound and one triple test per pregnancy. Not every prenatal test is covered. For an existing pregnancy, entitlement must be clarified individually before any cover is promised.',
    combination: 'Already have private supplementary insurance? Declare your existing cover. ARAG’s application excludes equivalent cover with another insurer. SDK and ARAG screening budgets therefore cannot be promised as one combined package.',
  },
};

const AmbulantAragVorsorge = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];
  const ctaClass = 'home-focus inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-home-midnight px-5 py-3 font-display text-sm font-extrabold text-white transition hover:bg-[#12304a] sm:w-auto';

  return (
    <aside id="arag-vorsorge" aria-labelledby="arag-vorsorge-title" data-healio-ambulant="arag-vorsorge" className="mt-5 scroll-mt-24 border-y border-[#d3e4eb] bg-[#f4f9fc] px-5 sm:px-7">
      <details className="group/arag">
        <summary className="home-focus flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-bold text-home-midnight [&::-webkit-details-marker]:hidden">
          <span id="arag-vorsorge-title">{copy.entry}</span><ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/arag:rotate-180" aria-hidden="true" />
        </summary>
        <div className="pb-6 pt-2">
      <p className="mb-3 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-[#087654]">{copy.eyebrow}</p>
      <div className="flex items-center gap-3">
        <FriendlyIcon kind="prevention" tone="sky" size="sm" />
        <h3 className="font-display text-xl font-extrabold leading-tight text-home-midnight sm:text-2xl">{copy.title}</h3>
      </div>
      <p className="mt-3 max-w-[70ch] text-base leading-relaxed text-[#324d60]">{copy.body}</p>
      <p className="mt-3 max-w-[70ch] text-base font-bold leading-relaxed text-home-midnight">{copy.benefit}</p>
      <p className="mt-1 text-sm leading-relaxed text-[#324d60]">{copy.vaccine}</p>
      <p className="mt-3 max-w-[76ch] text-sm leading-relaxed text-[#324d60]">{copy.note}</p>
      <p className="mt-3 max-w-[76ch] text-sm leading-relaxed text-[#324d60]">{copy.combination}</p>
      <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <LeadCaptureLink href={ARAG_OFFER_URL} trackingCategory="arag-v100" aria-describedby="arag-vorsorge-destination" className={ctaClass}>
          {copy.cta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </LeadCaptureLink>
        <p id="arag-vorsorge-destination" className="text-sm leading-5 text-[#324d60]">{copy.destination}</p>
      </div>
      <details className="group mt-4 border-t border-[#d3e4eb] pt-2">
        <summary className="home-focus flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-home-midnight [&::-webkit-details-marker]:hidden">
          {copy.checksTitle}<ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p className="mt-1 max-w-[74ch] text-sm leading-6 text-[#324d60]">{copy.checks}</p>
      </details>
      <details className="group mt-4 border-t border-[#d3e4eb] pt-2">
        <summary className="home-focus flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-home-midnight [&::-webkit-details-marker]:hidden">
          {copy.details}<ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p className="mt-1 max-w-[74ch] text-sm leading-6 text-[#324d60]">{copy.pregnancy}</p>
      </details>
        </div>
      </details>
    </aside>
  );
};

export default AmbulantAragVorsorge;
