import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ShieldCheck, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  getConsentState,
  hasConsent,
  openConsentSettings,
  subscribeConsent,
  updateConsentPurpose,
} from '@/lib/consent';

export const NITA_CONSENT_REQUEST_EVENT = 'healio:nita-consent-request';

const ELEVENLABS_AGENT_ID = 'agent_3701kkc8xr4be70a3v4mfmzptpqs';
const ELEVENLABS_SCRIPT_URL = 'https://elevenlabs.io/convai-widget/index.js';
const SCRIPT_SELECTOR = 'script[data-healio-elevenlabs="true"]';

const HIDDEN_ROUTE_PREFIXES = [
  '/zahn',
  '/en/dental',
  '/unternehmen',
  '/en/companies',
  '/potenzialanalyse',
  '/en/potential-analysis',
  '/impressum',
  '/en/legal-notice',
  '/agb',
  '/en/terms',
  '/datenschutz',
  '/en/privacy',
  '/erstinformation',
  '/en/initial-information',
  '/konto-loeschen',
  '/confirmation',
  '/en/confirmation',
  '/app-bestaetigt',
  '/reset-password',
  '/auth',
];

const COPY = {
  de: {
    launcher: 'Mit Nita sprechen',
    title: 'Nita erst nach deiner Freigabe laden',
    text: 'Nita wird von ElevenLabs bereitgestellt. Beim Laden werden technische Verbindungsdaten an ElevenLabs übertragen. Ein Gespräch startet erst, wenn du das Widget selbst aktivierst. Bitte teile dort keine sensiblen Gesundheitsdaten.',
    allow: 'Nita laden',
    cancel: 'Nicht jetzt',
    settings: 'Datenschutz-Einstellungen',
    privacy: 'Datenschutzerklärung',
    close: 'Hinweis schließen',
    loading: 'Nita wird geladen …',
    error: 'Nita konnte nicht geladen werden.',
    retry: 'Erneut versuchen',
  },
  en: {
    launcher: 'Talk to Nita',
    title: 'Load Nita only after your approval',
    text: 'Nita is provided by ElevenLabs. Loading it transfers technical connection data to ElevenLabs. A conversation starts only when you activate the widget yourself. Please do not share sensitive health data.',
    allow: 'Load Nita',
    cancel: 'Not now',
    settings: 'Privacy settings',
    privacy: 'Privacy policy',
    close: 'Close notice',
    loading: 'Loading Nita …',
    error: 'Nita could not be loaded.',
    retry: 'Try again',
  },
};

let elevenLabsLoadPromise = null;

const getSafeScriptUrl = () => {
  try {
    const url = new URL(ELEVENLABS_SCRIPT_URL);
    if (url.protocol !== 'https:' || url.hostname !== 'elevenlabs.io') return null;
    if (url.pathname !== '/convai-widget/index.js' || url.search || url.hash) return null;
    return url.toString();
  } catch {
    return null;
  }
};

export const loadElevenLabsWidget = () => {
  if (typeof document === 'undefined' || !hasConsent('elevenlabs')) return Promise.resolve(false);
  if (window.customElements?.get('elevenlabs-convai')) return Promise.resolve(true);
  if (elevenLabsLoadPromise) return elevenLabsLoadPromise;

  const scriptUrl = getSafeScriptUrl();
  if (!scriptUrl) return Promise.reject(new Error('Ungültige ElevenLabs-Script-URL'));

  const existingScript = document.querySelector(SCRIPT_SELECTOR);
  if (existingScript?.dataset.loaded === 'true') return Promise.resolve(true);

  elevenLabsLoadPromise = new Promise((resolve, reject) => {
    const script = existingScript || document.createElement('script');

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      resolve(true);
    };

    const handleError = () => {
      elevenLabsLoadPromise = null;
      script.remove();
      reject(new Error('ElevenLabs konnte nicht geladen werden'));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      script.async = true;
      script.src = scriptUrl;
      script.dataset.healioElevenlabs = 'true';
      document.body.appendChild(script);
    }
  });

  return elevenLabsLoadPromise;
};

const openLoadedWidget = () => {
  const widget = document.querySelector('elevenlabs-convai');
  const button = widget?.shadowRoot?.querySelector('button');
  if (button) {
    button.click();
    return true;
  }
  return false;
};

export const requestNitaConsent = () => {
  if (typeof window === 'undefined') return false;
  window.dispatchEvent(new CustomEvent(NITA_CONSENT_REQUEST_EVENT));
  return true;
};

export const NitaConsentWidget = () => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(() => getConsentState());
  const [promptOpen, setPromptOpen] = useState(false);
  const [loadStatus, setLoadStatus] = useState('idle');
  const closeButtonRef = useRef(null);
  const launcherRef = useRef(null);
  const hiddenOnRoute = HIDDEN_ROUTE_PREFIXES.some((prefix) => (
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  ));
  const providerAllowed = hasConsent('elevenlabs', consent);
  const language = pathname.startsWith('/en') ? 'en' : 'de';
  const copy = COPY[language];

  useEffect(() => subscribeConsent((nextConsent) => {
    setConsent(nextConsent);
    if (!hasConsent('elevenlabs', nextConsent)) setLoadStatus('idle');
  }), []);

  useEffect(() => {
    if (!providerAllowed || hiddenOnRoute) return undefined;
    let active = true;
    setLoadStatus('loading');

    loadElevenLabsWidget()
      .then(() => {
        if (active) setLoadStatus('ready');
      })
      .catch(() => {
        if (active) setLoadStatus('error');
      });

    return () => {
      active = false;
    };
  }, [hiddenOnRoute, providerAllowed]);

  useEffect(() => {
    const handleNitaRequest = () => {
      const currentConsent = getConsentState();
      if (!hasConsent('elevenlabs', currentConsent)) {
        setPromptOpen(true);
        return;
      }

      loadElevenLabsWidget().then(() => {
        [0, 350, 900].forEach((delay) => window.setTimeout(openLoadedWidget, delay));
      }).catch(() => setLoadStatus('error'));
    };

    window.addEventListener(NITA_CONSENT_REQUEST_EVENT, handleNitaRequest);
    return () => window.removeEventListener(NITA_CONSENT_REQUEST_EVENT, handleNitaRequest);
  }, []);

  useEffect(() => {
    if (!promptOpen) return undefined;
    const previousFocus = document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPromptOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [promptOpen]);

  const handleAllow = () => {
    updateConsentPurpose('elevenlabs', true, 'provider');
    setPromptOpen(false);
  };

  const handleRetry = () => {
    setLoadStatus('loading');
    loadElevenLabsWidget()
      .then(() => setLoadStatus('ready'))
      .catch(() => setLoadStatus('error'));
  };

  if (hiddenOnRoute) return null;

  return (
    <>
      <style>{`
        .healio-nita-surface {
          position: fixed;
          right: 0.75rem;
          bottom: calc(var(--healio-nita-safe-bottom, 6.75rem) + env(safe-area-inset-bottom));
          z-index: 90;
          transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
        }
        .healio-nita-widget elevenlabs-convai { display: block; }
        html.home-hero-active:not(.home-hero-passed) .healio-nita-surface,
        html.legal-information-active .healio-nita-surface,
        html.healio-consent-ui-active .healio-nita-surface,
        html.healio-nita-teaser-active .healio-nita-surface {
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transform: translateY(0.5rem);
        }
        @media (min-width: 768px) {
          .healio-nita-surface {
            right: 1.5rem;
            bottom: 1.5rem;
          }
        }
        @media print {
          .healio-nita-surface { display: none !important; }
        }
      `}</style>

      {!providerAllowed && !promptOpen && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setPromptOpen(true)}
          className="healio-nita-surface inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)] transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          aria-haspopup="dialog"
          aria-expanded="false"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {copy.launcher}
        </button>
      )}

      {!providerAllowed && promptOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="healio-nita-consent-title"
          className="healio-nita-surface w-[min(calc(100vw-1.5rem),23rem)] rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_18px_55px_rgba(15,23,42,0.25)]"
        >
          <div className="flex items-start justify-between gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h2 id="healio-nita-consent-title" className="font-extrabold text-slate-950">{copy.title}</h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setPromptOpen(false)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              aria-label={copy.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{copy.text}</p>
          <a href={language === 'en' ? '/en/privacy' : '/datenschutz'} className="mt-2 inline-block text-sm font-semibold text-slate-700 underline underline-offset-2">
            {copy.privacy}
          </a>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAllow}
              className="min-h-11 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {copy.allow}
            </button>
            <button
              type="button"
              onClick={() => setPromptOpen(false)}
              className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {copy.cancel}
            </button>
          </div>
          <button
            type="button"
            onClick={() => openConsentSettings('elevenlabs')}
            className="mt-3 min-h-11 w-full text-sm font-semibold text-slate-600 underline underline-offset-2"
          >
            {copy.settings}
          </button>
        </section>
      )}

      {providerAllowed && loadStatus === 'loading' && (
        <p className="healio-nita-surface rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_8px_26px_rgba(15,23,42,0.16)]" role="status">
          {copy.loading}
        </p>
      )}

      {providerAllowed && loadStatus === 'error' && (
        <div className="healio-nita-surface w-[min(calc(100vw-1.5rem),20rem)] rounded-2xl border border-rose-200 bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.2)]" role="alert">
          <p className="text-sm font-semibold text-slate-800">{copy.error}</p>
          <button type="button" onClick={handleRetry} className="mt-3 min-h-11 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
            {copy.retry}
          </button>
        </div>
      )}

      {providerAllowed && loadStatus === 'ready' && (
        <div className="healio-nita-surface healio-nita-widget" aria-label={copy.launcher}>
          <elevenlabs-convai agent-id={ELEVENLABS_AGENT_ID}></elevenlabs-convai>
        </div>
      )}
    </>
  );
};

export default NitaConsentWidget;
