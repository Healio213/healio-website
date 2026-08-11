import React, { useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  getConsentState,
  hasConsent,
  openConsentSettings,
  subscribeConsent,
  updateConsentPurpose,
} from '@/lib/consent';

const COPY = {
  de: {
    calendly: {
      title: 'Terminbuchung erst nach deiner Freigabe',
      text: 'Beim Laden werden technische Verbindungsdaten an Calendly übertragen. Der übrige Seiteninhalt bleibt ohne Calendly nutzbar.',
      load: 'Calendly laden',
      external: 'Direkt bei Calendly öffnen',
    },
    maps: {
      title: 'Karte erst nach deiner Freigabe',
      text: 'Beim Laden werden technische Verbindungsdaten an Google Maps übertragen. Die Adresse findest du auch auf unserer Kontaktseite.',
      load: 'Google Maps laden',
      external: 'In Google Maps öffnen',
    },
    settings: 'Datenschutz-Einstellungen',
  },
  en: {
    calendly: {
      title: 'Appointment booking after your approval',
      text: 'Loading transfers technical connection data to Calendly. The rest of this page remains available without Calendly.',
      load: 'Load Calendly',
      external: 'Open directly in Calendly',
    },
    maps: {
      title: 'Map after your approval',
      text: 'Loading transfers technical connection data to Google Maps. You can also find the address on our contact page.',
      load: 'Load Google Maps',
      external: 'Open in Google Maps',
    },
    settings: 'Privacy settings',
  },
};

const ExternalProviderGate = ({
  children,
  externalUrl,
  placeholderClassName = 'min-h-[420px]',
  provider,
}) => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(() => getConsentState());
  const language = pathname.startsWith('/en') ? 'en' : 'de';
  const copy = COPY[language];
  const providerCopy = copy[provider];
  const allowed = hasConsent(provider, consent);

  useEffect(() => subscribeConsent(setConsent), []);

  if (allowed) return children;
  if (!providerCopy) return null;

  return (
    <div
      className={`flex w-full items-center justify-center bg-slate-50 px-5 py-10 text-center ${placeholderClassName}`}
      role="region"
      aria-label={providerCopy.title}
    >
      <div className="mx-auto max-w-xl">
        <ShieldCheck className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold text-slate-950">{providerCopy.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{providerCopy.text}</p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => updateConsentPurpose(provider, true, 'provider')}
            className="min-h-11 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {providerCopy.load}
          </button>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {providerCopy.external}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => openConsentSettings(provider)}
          className="mt-4 min-h-11 px-3 text-sm font-semibold text-slate-600 underline underline-offset-2"
        >
          {copy.settings}
        </button>
      </div>
    </div>
  );
};

export default ExternalProviderGate;
