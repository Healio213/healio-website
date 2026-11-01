import React from 'react';
import { ArrowDown, Calculator } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import GuidedCallbackButton from '@/components/guided/GuidedCallbackButton';
import LeadCaptureLink from '@/components/LeadCaptureLink';
import { useLanguage } from '@/hooks/useLanguage';
import { useReferrer } from '@/hooks/useReferrer';
import { useAmbulantStufe } from '@/lib/ambulant-stufe';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';

// Frank 01.11.2026: Auf /ambulant und /stationaer schließen Besucher in erster
// Linie selbst online ab. Der Einstieg führt direkt in den SDK-Tarifrechner,
// der Termin steht nur noch einmal am Seitenende.
export const scrollToTarget = (event, target, reduceMotion) => {
  const node = typeof document !== 'undefined' ? document.getElementById(target) : null;
  if (!node) return;
  event.preventDefault();
  node.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${target}`);
};

const TARIFF_TYPES = { ambulant: 'Ambulant', stationaer: 'Stationär' };

export default function SelfServiceEntryActions({ product, target, className = '', desktop = false }) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const referrer = useReferrer();
  const stufe = useAmbulantStufe();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: TARIFF_TYPES[product], ...(product === 'ambulant' ? { stufe } : {}) });
  const en = lang === 'en';
  return (
    <div data-self-service-actions={product} className={`flex w-full flex-col items-start gap-2 ${className}`}>
      <LeadCaptureLink
        data-desktop-primary={desktop || undefined}
        href={sdkUrl}
        trackingCategory={`sdk-${product}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackSdkClick(`${product}-hero`, referrer)}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-7 py-3 text-center font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.3)] transition hover:bg-home-mint-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
      >
        <Calculator className="h-5 w-5 shrink-0" aria-hidden="true" />
        {en ? 'See what you would pay' : 'Jetzt sehen, was du zahlst'}
      </LeadCaptureLink>
      <p className="text-sm leading-6 text-slate-300">
        {en ? 'SDK premium calculator, apply directly online. ' : 'SDK-Tarifrechner, Antrag direkt online. '}
        <a
          href={`#${target}`}
          onClick={(event) => scrollToTarget(event, target, reduceMotion)}
          className="inline-flex min-h-11 items-center gap-1 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          {en ? 'Compare plans first' : 'Erst Tarife vergleichen'}<ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}

// Einziger Termin-Hinweis der Seite, klein unter dem Schlussknopf.
export function TerminNebenweg({ product, tariff, tone = 'light', className = '', onClick }) {
  const { lang } = useLanguage();
  const dark = tone === 'dark';
  return (
    <p className={`text-sm leading-6 ${dark ? 'text-slate-300' : 'text-home-slate'} ${className}`}>
      {lang === 'en' ? 'Prefer personal guidance? ' : 'Lieber persönlich begleitet? '}
      <GuidedCallbackButton product={product} tariff={tariff} onClick={onClick} className={`inline-flex min-h-11 items-center font-semibold underline underline-offset-4 ${dark ? 'text-white decoration-white/40 hover:decoration-white' : 'text-home-midnight decoration-slate-300 hover:decoration-home-midnight'}`}>
        {lang === 'en' ? 'Book an appointment' : 'Termin buchen'}
      </GuidedCallbackButton>
    </p>
  );
}
