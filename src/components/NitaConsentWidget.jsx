import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  getConsentState,
  hasConsent,
  openConsentSettings,
  subscribeConsent,
  updateConsentPurpose,
} from '@/lib/consent';
import {
  buildNitaContext,
  buildNitaFirstMessage,
  sanitizeNitaEntryPoint,
} from '@/lib/nitaContext';

export const NITA_CONSENT_REQUEST_EVENT = 'healio:nita-consent-request';

const ELEVENLABS_AGENT_ID = 'agent_3701kkc8xr4be70a3v4mfmzptpqs';
const ELEVENLABS_SCRIPT_URL = 'https://unpkg.com/@elevenlabs/convai-widget-embed@0.15.1/dist/index.js';
const SCRIPT_SELECTOR = 'script[data-healio-elevenlabs="true"]';

const EN_WIDGET_TEXT_CONTENTS = JSON.stringify({
  main_label: 'Need help?',
  start_call: 'Start call',
  start_chat: 'Start chat',
  new_call: 'New call',
  end_call: 'End',
  mute_microphone: 'Mute microphone',
  change_language: 'Change language',
  collapse: 'Collapse',
  expand: 'Expand',
  accept_terms: 'Accept',
  dismiss_terms: 'Decline',
  listening_status: 'Listening…',
  speaking_status: 'Speak to interrupt',
  connecting_status: 'Connecting…',
  chatting_status: 'Chat with Nita',
  input_label: 'Type a message',
  input_placeholder: 'Write a message',
  input_placeholder_text_only: 'Write a message',
  input_placeholder_new_conversation: 'Start a new conversation',
  user_ended_conversation: 'You ended the conversation.',
  agent_ended_conversation: 'Nita ended the conversation.',
  error_occurred: 'Something went wrong',
  send_message: 'Send',
  text_mode: 'Switch to text',
  voice_mode: 'Switch to voice',
  switched_to_text_mode: 'Switched to text',
  switched_to_voice_mode: 'Switched to voice',
  agent_working: 'Nita is working…',
  agent_done: 'Done',
  agent_error: 'Something went wrong',
  typing_indicator: 'Nita is typing…',
});

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
    if (url.protocol !== 'https:' || url.hostname !== 'unpkg.com') return null;
    if (url.pathname !== '/@elevenlabs/convai-widget-embed@0.15.1/dist/index.js' || url.search || url.hash) return null;
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

export const requestNitaConsent = (entryPoint = 'delayed_prompt') => {
  if (typeof window === 'undefined') return false;
  window.dispatchEvent(new CustomEvent(NITA_CONSENT_REQUEST_EVENT, {
    detail: { entryPoint: sanitizeNitaEntryPoint(entryPoint) },
  }));
  return true;
};

export const NitaConsentWidget = () => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(() => getConsentState());
  const [promptOpen, setPromptOpen] = useState(false);
  const [loadStatus, setLoadStatus] = useState('idle');
  const [widgetActivated, setWidgetActivated] = useState(false);
  const [widgetActivationPending, setWidgetActivationPending] = useState(false);
  const [activeNitaContext, setActiveNitaContext] = useState(() => buildNitaContext(pathname));
  const closeButtonRef = useRef(null);
  const launcherRef = useRef(null);
  const lastContextPathRef = useRef(pathname);
  const pendingContextRef = useRef(activeNitaContext);
  const isDentalCheckRoute = pathname === '/zahn' || pathname === '/en/dental';
  const providerAllowed = hasConsent('elevenlabs', consent);
  const language = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
  const copy = COPY[language];

  useEffect(() => subscribeConsent((nextConsent) => {
    setConsent(nextConsent);
    if (!hasConsent('elevenlabs', nextConsent)) {
      setLoadStatus('idle');
      setWidgetActivated(false);
      setWidgetActivationPending(false);
    }
  }), []);

  useEffect(() => {
    if (lastContextPathRef.current === pathname) return;
    lastContextPathRef.current = pathname;
    const nextContext = buildNitaContext(pathname, 'global_launcher');
    pendingContextRef.current = nextContext;
    setActiveNitaContext(nextContext);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!widgetActivationPending) return;
    setWidgetActivated(true);
    setWidgetActivationPending(false);
  }, [activeNitaContext, widgetActivationPending]);

  useEffect(() => {
    if (!providerAllowed) return undefined;
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
  }, [providerAllowed]);

  useEffect(() => {
    const handleNitaRequest = (event) => {
      const entryPoint = sanitizeNitaEntryPoint(event.detail?.entryPoint);
      const requestedContext = buildNitaContext(pathname, entryPoint);
      pendingContextRef.current = requestedContext;
      const currentConsent = getConsentState();
      if (!hasConsent('elevenlabs', currentConsent)) {
        setPromptOpen(true);
        return;
      }

      setActiveNitaContext(requestedContext);
      setWidgetActivationPending(true);
      loadElevenLabsWidget()
        .then(() => setLoadStatus('ready'))
        .catch(() => setLoadStatus('error'));
    };

    window.addEventListener(NITA_CONSENT_REQUEST_EVENT, handleNitaRequest);
    return () => window.removeEventListener(NITA_CONSENT_REQUEST_EVENT, handleNitaRequest);
  }, [pathname]);

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

  const activateWidgetWithContext = (context) => {
    setActiveNitaContext(context);
    setWidgetActivationPending(true);
  };

  const handleAllow = () => {
    activateWidgetWithContext(pendingContextRef.current);
    updateConsentPurpose('elevenlabs', true, 'provider');
    setPromptOpen(false);
  };

  const handleRetry = () => {
    setLoadStatus('loading');
    loadElevenLabsWidget()
      .then(() => setLoadStatus('ready'))
      .catch(() => setLoadStatus('error'));
  };

  const handleLauncherClick = () => {
    const requestedContext = buildNitaContext(pathname, 'global_launcher');
    pendingContextRef.current = requestedContext;
    if (!providerAllowed) {
      setPromptOpen(true);
      return;
    }

    activateWidgetWithContext(requestedContext);
    if (loadStatus === 'error') handleRetry();
  };

  const handleOpenSettings = () => {
    setPromptOpen(false);
    openConsentSettings('elevenlabs');
  };

  const showQuietLauncher = !promptOpen && (
    !providerAllowed
    || !widgetActivated
    || loadStatus === 'idle'
    || loadStatus === 'loading'
  );

  return (
    <>
      <style>{`
        .healio-nita-surface {
          position: fixed;
          right: 0.75rem;
          bottom: calc(var(--healio-nita-safe-bottom, 8.5rem) + env(safe-area-inset-bottom));
          z-index: 90;
          transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
        }
        .healio-nita-widget elevenlabs-convai {
          display: block;
          right: 0.75rem !important;
          bottom: calc(var(--healio-nita-safe-bottom, 8.5rem) + env(safe-area-inset-bottom)) !important;
        }
        .healio-nita-quiet-launcher {
          display: inline-flex;
          width: 3.65rem;
          height: 3.65rem;
          align-items: center;
          justify-content: center;
          border: 0;
          padding: 0;
          color: white;
          background: transparent;
          cursor: pointer;
        }
        .healio-nita-orb-shell {
          position: relative;
          display: inline-flex;
          width: 3.65rem;
          height: 3.65rem;
          flex: 0 0 3.65rem;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(201, 255, 251, 0.74);
          border-radius: 999px;
          background:
            radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.96) 0 5%, rgba(255, 255, 255, 0.32) 14%, transparent 29%),
            radial-gradient(circle at 69% 74%, rgba(94, 238, 230, 0.98) 0 8%, rgba(23, 177, 215, 0.72) 34%, transparent 55%),
            conic-gradient(from 214deg, #0b3c96, #22b9d5, #b8fff3, #1977c7, #083886, #56e6de, #0b3c96);
          box-shadow:
            0 0 0 5px rgba(16, 155, 190, 0.08),
            0 12px 30px rgba(7, 62, 132, 0.26),
            inset -8px -10px 18px rgba(5, 42, 111, 0.38),
            inset 8px 8px 16px rgba(211, 255, 252, 0.4);
          isolation: isolate;
          transform: translateZ(0);
          animation: healio-nita-orb-breathe 4.8s ease-in-out infinite;
          transition: box-shadow 180ms ease, transform 180ms ease;
        }
        .healio-nita-orb-shell::before,
        .healio-nita-orb-shell::after {
          content: '';
          position: absolute;
          border-radius: inherit;
          pointer-events: none;
        }
        .healio-nita-orb-shell::before {
          inset: -28%;
          z-index: 0;
          background: conic-gradient(from 30deg, transparent 0 16%, rgba(255, 255, 255, 0.68) 24%, transparent 36% 60%, rgba(83, 244, 226, 0.5) 72%, transparent 84%);
          mix-blend-mode: screen;
          animation: healio-nita-orb-flow 8s linear infinite;
        }
        .healio-nita-orb-shell::after {
          inset: 0.18rem;
          z-index: 1;
          border: 1px solid rgba(255, 255, 255, 0.28);
          box-shadow: inset 0 0 12px rgba(223, 255, 253, 0.36);
        }
        .healio-nita-quiet-launcher:hover .healio-nita-orb-shell {
          box-shadow:
            0 0 0 6px rgba(16, 155, 190, 0.12),
            0 14px 34px rgba(7, 62, 132, 0.32),
            inset -8px -10px 18px rgba(5, 42, 111, 0.38),
            inset 8px 8px 16px rgba(211, 255, 252, 0.44);
          transform: translateY(-1px) scale(1.02);
        }
        .healio-nita-quiet-launcher:active .healio-nita-orb-shell {
          transform: translateY(1px) scale(0.99);
        }
        .healio-nita-quiet-launcher:focus-visible {
          outline: 2px solid #1d93c6;
          outline-offset: 4px;
          border-radius: 999px;
        }
        @keyframes healio-nita-orb-breathe {
          0%, 100% { filter: saturate(0.98) brightness(1); }
          50% { filter: saturate(1.1) brightness(1.06); }
        }
        @keyframes healio-nita-orb-flow {
          to { transform: rotate(360deg); }
        }
        html.healio-consent-ui-active .healio-nita-surface,
        html.healio-nita-teaser-active .healio-nita-surface,
        html.healio-mobile-menu-active .healio-nita-surface {
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transform: translateY(0.5rem);
        }
        @media (max-width: 767px) {
          .healio-nita-quiet-launcher,
          .healio-nita-widget {
            right: 0.75rem;
            bottom: calc(var(--healio-nita-mobile-safe-bottom, 10rem) + env(safe-area-inset-bottom));
          }
          .healio-nita-widget elevenlabs-convai {
            right: 0.75rem !important;
            bottom: calc(var(--healio-nita-mobile-safe-bottom, 10rem) + env(safe-area-inset-bottom)) !important;
          }
          .healio-nita-quiet-launcher,
          .healio-nita-orb-shell {
            width: 3.4rem;
            height: 3.4rem;
          }
          .healio-nita-orb-shell {
            flex-basis: 3.4rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .healio-nita-orb-shell {
            animation: none;
            transition: none;
          }
          .healio-nita-orb-shell::before {
            animation: none;
          }
        }
        @media (min-width: 768px) {
          .healio-nita-surface {
            right: 1.5rem;
            bottom: 5.25rem;
          }
          .healio-nita-widget elevenlabs-convai {
            right: 1.5rem !important;
            bottom: 5.25rem !important;
          }
        }
        @media print {
          .healio-nita-surface { display: none !important; }
        }
      `}</style>

      {showQuietLauncher && (
        <button
          ref={launcherRef}
          type="button"
          onClick={handleLauncherClick}
          className="healio-nita-surface healio-nita-quiet-launcher"
          data-healio-nita="launcher"
          aria-label={copy.launcher}
          title={copy.launcher}
          aria-haspopup="dialog"
          aria-expanded={providerAllowed && widgetActivated && loadStatus === 'ready'}
          aria-busy={providerAllowed && widgetActivated && loadStatus === 'loading'}
        >
          <span className="healio-nita-orb-shell" aria-hidden="true" />
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
          {!isDentalCheckRoute && (
            <button
              type="button"
              onClick={handleOpenSettings}
              className="mt-3 min-h-11 w-full text-sm font-semibold text-slate-600 underline underline-offset-2"
            >
              {copy.settings}
            </button>
          )}
        </section>
      )}

      {widgetActivated && providerAllowed && loadStatus === 'loading' && (
        <p className="sr-only" role="status">
          {copy.loading}
        </p>
      )}

      {widgetActivated && providerAllowed && loadStatus === 'error' && (
        <div className="healio-nita-surface w-[min(calc(100vw-1.5rem),20rem)] rounded-2xl border border-rose-200 bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.2)]" role="alert">
          <p className="text-sm font-semibold text-slate-800">{copy.error}</p>
          <button type="button" onClick={handleRetry} className="mt-3 min-h-11 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
            {copy.retry}
          </button>
        </div>
      )}

      {providerAllowed && loadStatus === 'ready' && widgetActivated && (
        <div className="healio-nita-surface healio-nita-widget" aria-label={copy.launcher}>
          <elevenlabs-convai
            agent-id={ELEVENLABS_AGENT_ID}
            language={language}
            dynamic-variables={JSON.stringify(activeNitaContext)}
            override-first-message={buildNitaFirstMessage(activeNitaContext)}
            variant="tiny"
            default-expanded="false"
            always-expanded="false"
            text-contents={language === 'en' ? EN_WIDGET_TEXT_CONTENTS : undefined}
            dismissible="true"
            text-input="true"
            show-resize-button="true"
          ></elevenlabs-convai>
        </div>
      )}
    </>
  );
};

export default NitaConsentWidget;
