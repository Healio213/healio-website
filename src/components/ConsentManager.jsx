import React, { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  CONSENT_PURPOSES,
  CONSENT_SETTINGS_EVENT,
  allowAllConsent,
  allowNecessaryConsent,
  getConsentState,
  getStoredConsentState,
  saveConsentPreferences,
  subscribeConsent,
} from '@/lib/consent';
import { initializeAnalytics } from '@/lib/analytics';

const COPY = {
  de: {
    bannerLabel: 'Datenschutzeinstellungen',
    bannerTitle: 'Du entscheidest, was geladen wird.',
    bannerText: 'Analyse und externe Dienste starten erst nach deiner Zustimmung. Unsere Auswahlhilfen bleiben lokal und funktionieren ohne optionale Dienste.',
    necessaryOnly: 'Nur notwendige',
    allowAll: 'Alle erlauben',
    settings: 'Einstellungen',
    privacy: 'Datenschutz',
    dialogTitle: 'Datenschutz-Einstellungen',
    dialogText: 'Notwendige Funktionen sind immer aktiv. Alle anderen Dienste bleiben aus, bis du sie ausdrücklich erlaubst.',
    necessaryTitle: 'Notwendig',
    necessaryText: 'Speichert ausschließlich deine Auswahl auf diesem Gerät.',
    save: 'Auswahl speichern',
    cancel: 'Abbrechen',
    close: 'Einstellungen schließen',
    purposes: {
      analytics: ['Analyse', 'Google Analytics hilft uns nach deiner Zustimmung, die Website zu verbessern. Antworten aus unseren Auswahlhilfen werden nicht übertragen.'],
      calendly: ['Terminbuchung', 'Calendly wird nur geladen, wenn du eine eingebettete Terminbuchung öffnest.'],
      maps: ['Karten', 'Externe Karten werden erst nach deiner Freigabe geladen.'],
      openai: ['Nita, digitale Assistenz', 'OpenAI wird erst für die Sprachverbindung mit Nita geladen, wenn du sie ausdrücklich erlaubst.'],
    },
  },
  en: {
    bannerLabel: 'Privacy settings',
    bannerTitle: 'You decide what is loaded.',
    bannerText: 'Analytics and external services start only after your consent. Our selection tools stay local and work without optional services.',
    necessaryOnly: 'Necessary only',
    allowAll: 'Allow all',
    settings: 'Settings',
    privacy: 'Privacy',
    dialogTitle: 'Privacy settings',
    dialogText: 'Necessary functions are always active. All other services remain off until you explicitly allow them.',
    necessaryTitle: 'Necessary',
    necessaryText: 'Only stores your selection on this device.',
    save: 'Save selection',
    cancel: 'Cancel',
    close: 'Close settings',
    purposes: {
      analytics: ['Analytics', 'Google Analytics helps us improve the website after your consent. Answers from our selection tools are never transmitted.'],
      calendly: ['Appointment booking', 'Calendly loads only when you open an embedded appointment booking.'],
      maps: ['Maps', 'External maps load only after you allow them.'],
      openai: ['Nita, digital assistant', 'OpenAI loads for Nita’s voice connection only after you explicitly allow it.'],
    },
  },
};

const getInitialState = () => {
  const stored = getStoredConsentState();
  return {
    consent: stored || getConsentState(),
    showBanner: !stored,
  };
};

const focusableSelector = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const ConsentManager = () => {
  const { pathname } = useLocation();
  const initialState = useRef(getInitialState()).current;
  const [consent, setConsent] = useState(initialState.consent);
  const [showBanner, setShowBanner] = useState(initialState.showBanner);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState(initialState.consent.preferences);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const language = pathname.startsWith('/en') ? 'en' : 'de';
  const copy = COPY[language];
  const isDentalCheckRoute = pathname === '/zahn' || pathname === '/en/dental';
  const consentUiActive = (showBanner && !isDentalCheckRoute) || (settingsOpen && !isDentalCheckRoute);

  useEffect(() => initializeAnalytics(), []);

  useEffect(() => subscribeConsent((nextConsent) => {
    setConsent(nextConsent);
    setDraft(nextConsent.preferences);
    setShowBanner(!nextConsent.decided);
  }), []);

  useEffect(() => {
    const handleSettingsRequest = () => {
      const current = getConsentState();
      setDraft(current.preferences);
      setSettingsOpen(true);
    };

    window.addEventListener(CONSENT_SETTINGS_EVENT, handleSettingsRequest);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, handleSettingsRequest);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('healio-consent-ui-active', consentUiActive);
    return () => root.classList.remove('healio-consent-ui-active');
  }, [consentUiActive]);

  useEffect(() => {
    if (isDentalCheckRoute) setSettingsOpen(false);
  }, [isDentalCheckRoute]);

  useEffect(() => {
    if (!settingsOpen) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSettingsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [settingsOpen]);

  const openSettings = () => {
    setDraft(consent.preferences);
    setSettingsOpen(true);
  };

  const handleNecessaryOnly = (source = 'banner') => {
    allowNecessaryConsent(source);
    setSettingsOpen(false);
    setShowBanner(false);
  };

  const handleAllowAll = () => {
    allowAllConsent('banner');
    setSettingsOpen(false);
    setShowBanner(false);
  };

  const handleSave = () => {
    saveConsentPreferences(draft, 'settings');
    setSettingsOpen(false);
    setShowBanner(false);
  };

  return (
    <>
      <style>{`
        html.healio-mobile-menu-active .healio-consent-surface {
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
        }
        @media print {
          .healio-consent-surface { display: none !important; }
        }
      `}</style>

      {showBanner && !settingsOpen && !isDentalCheckRoute && (
        <section
          className="healio-consent-surface fixed inset-x-3 top-[5.25rem] z-[120] mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-3 text-slate-900 shadow-[0_14px_50px_rgba(15,23,42,0.22)] md:bottom-3 md:top-auto md:max-w-5xl md:rounded-2xl md:p-5"
          role="region"
          aria-label={copy.bannerLabel}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <div className="max-w-2xl min-w-0">
              <h2 className="text-sm font-extrabold text-slate-950 md:text-lg">{copy.bannerTitle}</h2>
              <p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm md:leading-6">
                {copy.bannerText}{' '}
                <a href={language === 'en' ? '/en/privacy' : '/datenschutz'} className="font-semibold text-slate-800 underline underline-offset-2">
                  {copy.privacy}
                </a>
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-3 gap-1.5 md:gap-2">
              <button
                type="button"
                onClick={() => handleNecessaryOnly('banner')}
                className="min-h-11 rounded-xl border border-slate-300 px-2 py-2 text-[11px] font-bold leading-tight text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 md:px-4 md:py-2.5 md:text-sm"
              >
                {copy.necessaryOnly}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="min-h-11 rounded-xl border border-slate-300 px-2 py-2 text-[11px] font-bold leading-tight text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 md:px-4 md:py-2.5 md:text-sm"
              >
                {copy.settings}
              </button>
              <button
                type="button"
                onClick={handleAllowAll}
                className="min-h-11 rounded-xl bg-slate-900 px-2 py-2 text-[11px] font-bold leading-tight text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 md:px-4 md:py-2.5 md:text-sm"
              >
                {copy.allowAll}
              </button>
            </div>
          </div>
        </section>
      )}

      {settingsOpen && !isDentalCheckRoute && (
        <div className="healio-consent-surface fixed inset-0 z-[130] flex items-end justify-center bg-slate-950/55 p-0 sm:items-center sm:p-6">
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-5 text-slate-900 shadow-[0_20px_70px_rgba(2,6,23,0.35)] sm:rounded-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 id={titleId} className="text-xl font-extrabold text-slate-950 sm:text-2xl">{copy.dialogTitle}</h2>
                <p id={descriptionId} className="mt-2 text-sm leading-6 text-slate-600">{copy.dialogText}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                aria-label={copy.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <fieldset className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              <legend className="sr-only">{copy.dialogTitle}</legend>

              <div className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-bold text-slate-900">{copy.necessaryTitle}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{copy.necessaryText}</p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 h-5 w-5 accent-emerald-600" aria-label={copy.necessaryTitle} />
              </div>

              {CONSENT_PURPOSES.map((purpose) => {
                const [title, description] = copy.purposes[purpose];
                return (
                  <label key={purpose} className="flex cursor-pointer items-start justify-between gap-4 py-4">
                    <span>
                      <span className="block font-bold text-slate-900">{title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={draft[purpose] === true}
                      onChange={(event) => setDraft((current) => ({ ...current, [purpose]: event.target.checked }))}
                      className="mt-1 h-5 w-5 shrink-0 accent-emerald-600"
                    />
                  </label>
                );
              })}
            </fieldset>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleNecessaryOnly('settings')}
                className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {copy.necessaryOnly}
              </button>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {copy.cancel}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="min-h-11 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {copy.save}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ConsentManager;
