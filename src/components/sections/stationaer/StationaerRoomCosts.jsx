import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const priceList = 'https://www.unimedizin-mainz.de/fileadmin/kliniken/kl33/Dokumente/UEbersicht_Entgelte_fuer_Wahlleistung_Unterkunft_UM_Stand_01.01.2026.pdf';
const copy = {
  de: {
    eyebrow: 'Einzelzimmerkosten verstehen',
    title: 'Was kostet ein Einzelzimmer im Krankenhaus?',
    lead: 'Der Zimmerzuschlag hängt von der Klinik und der Station ab. Ein konkretes Beispiel macht die Größenordnung greifbar.',
    example: 'Universitätsmedizin Mainz · Preisliste vom 01.01.2026',
    calculation: '70,64 EUR je Berechnungstag × 5 Berechnungstage',
    amount: '353,20 EUR',
    note: 'Eigene Rechnung nur für das Einbettzimmer. Ärztliche Wahlleistungen und andere Kosten sind nicht enthalten. Ein Beispiel, kein Durchschnittspreis.',
    source: 'Originalpreisliste ansehen (PDF)',
    futureTitle: 'Für künftige Aufenthalte vorsorgen',
    futureBody: 'Vergleiche jetzt, welcher Klinikschutz zu deinem Zimmerwunsch passt. SP1 enthält das Einbettzimmer, SP2 das Zweibettzimmer; SPU gilt ausschließlich nach einem Unfall. Es gelten die jeweiligen Tarifbedingungen.',
    futureCta: 'Zimmerleistungen und Beitrag vergleichen',
    currentTitle: 'Du brauchst das Zimmer bereits jetzt?',
    currentBody: 'Frag deine Klinik nach dem konkreten Zuschlag und prüfe vorhandenen Versicherungsschutz. Ein neu abgeschlossener Tarif übernimmt keinen bereits eingetretenen Versicherungsfall.',
    detailCta: 'Weitere Zimmerpreise und Zahlungswege',
  },
  en: {
    eyebrow: 'Understand single-room costs',
    title: 'What does a single hospital room cost?',
    lead: 'The room supplement depends on the hospital and ward. A specific example helps put the cost into perspective.',
    example: 'University Medical Center Mainz · Price list dated 1 January 2026',
    calculation: 'EUR 70.64 per chargeable day × 5 chargeable days',
    amount: 'EUR 353.20',
    note: 'Our calculation covers only the single room. Private medical services and other charges are excluded. One example, not an average price.',
    source: 'Read the original price list (PDF)',
    futureTitle: 'Plan for future hospital stays',
    futureBody: 'Compare hospital cover for your room preference. SP1 includes a single room, SP2 a twin room; SPU applies only after an accident. The respective tariff conditions apply.',
    futureCta: 'Compare room benefits and premiums',
    currentTitle: 'Do you need the room right now?',
    currentBody: 'Ask your hospital about the actual supplement and check any existing cover. A new policy does not cover an insured event that has already occurred.',
  },
};

export default function StationaerRoomCosts() {
  const { lang } = useLanguage();
  const text = copy[lang === 'en' ? 'en' : 'de'];

  return (
    <section id="einzelzimmer-kosten" aria-labelledby="stationaer-room-costs-heading" className="scroll-mt-24 bg-[#fbfaf7] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold text-[#087454]">{text.eyebrow}</p>
        <h2 id="stationaer-room-costs-heading" className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[#071726] sm:text-3xl">{text.title}</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{text.lead}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#eefaf5] p-5 sm:p-6">
            <p className="text-sm font-semibold text-slate-600">{text.example}</p>
            <p className="mt-4 font-medium text-[#071726]">{text.calculation}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-[#087454]">{text.amount}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{text.note}</p>
            <a href={priceList} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#087454] underline underline-offset-4">{text.source}</a>
            {text.detailCta && <Link to="/ratgeber/einzelzimmer-krankenhaus-kosten" className="mt-1 block py-2 text-sm font-semibold text-[#087454] underline underline-offset-4">{text.detailCta}</Link>}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-bold text-[#071726]">{text.futureTitle}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{text.futureBody}</p>
            <a href="#tarife" className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[#25c990] px-5 py-3 font-bold text-[#071726] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087454]">{text.futureCta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
            <h3 className="mt-6 font-bold text-[#071726]">{text.currentTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{text.currentBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
