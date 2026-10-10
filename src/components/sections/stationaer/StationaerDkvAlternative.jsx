import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';
import { DKV_UZ1_URL, trackStationaerDkvClick } from './stationaerDkvLink';

// Leistungsumfang und Wartezeiten im persönlichen DKV-UZ1-Rechner am
// 10.10.2026 geprüft. Quelle: DKV_UZ1_URL, „Alle Details“ und Beitragsberechnung.
const COPY = {
  de: {
    title: 'Nur Einbettzimmer? DKV UZ1.',
    body: '100 % der gesondert berechenbaren Kosten für die Unterbringung im Einbettzimmer. Ohne Chefarzt und privatärztliche Behandlung.',
    note: 'Wartezeit: 3 Monate allgemein, 8 Monate für Entbindung. Die allgemeine Wartezeit entfällt bei Unfall. Es gelten die Tarifbedingungen.',
    cta: 'Einbettzimmer-Beitrag berechnen',
    destination: 'Zum DKV-Rechner · öffnet in einem neuen Tab',
  },
  en: {
    title: 'Single room only? DKV UZ1.',
    body: '100% of separately billed accommodation costs for a single room. Without head-physician or private medical treatment.',
    note: 'Waiting periods: 3 months generally, 8 months for childbirth. The general waiting period is waived after an accident. Policy terms apply.',
    cta: 'Calculate single-room premium',
    destination: 'DKV calculator in German · opens in a new tab',
  },
};

const StationaerDkvAlternative = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];

  return (
    <article id="dkv-einbettzimmer" className="mt-8 grid scroll-mt-24 gap-5 border-y border-[#cde8dc] bg-white px-5 py-6 sm:px-7 md:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center" aria-labelledby="stationaer-dkv-heading">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <FriendlyIcon src="/images/friendly-icons/hospital-room.webp" tone="mint" size="sm" />
          <h3 id="stationaer-dkv-heading" className="font-display text-xl font-extrabold leading-tight text-[#071726] sm:text-2xl">{copy.title}</h3>
        </div>
        <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-[#294c40]">{copy.body}</p>
        <p className="mt-2 max-w-[74ch] text-sm leading-relaxed text-[#426153]">{copy.note}</p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <a href={DKV_UZ1_URL} target="_blank" rel="noopener noreferrer" aria-describedby="stationaer-dkv-destination" onClick={trackStationaerDkvClick} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071726] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#12304a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075f46] sm:w-auto">
          {copy.cta}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
        <p id="stationaer-dkv-destination" className="text-sm leading-5 text-[#426153]">{copy.destination}</p>
      </div>
    </article>
  );
};

export default StationaerDkvAlternative;
