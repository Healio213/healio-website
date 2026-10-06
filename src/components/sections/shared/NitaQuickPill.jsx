import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import {
  HEALIO_PHONE_DISPLAY,
  HEALIO_PHONE_TEL,
  HEALIO_VOICE_CONTACT_ENABLED,
  HEALIO_WHATSAPP_URL,
} from '@/config/contactChannels';
import { requestNitaConsent } from '@/components/NitaConsentWidget';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';

// Experiment 05.10.2026 nach dem „Frag KI“-Knopf auf mercedes-benz.de: eine
// schwebende Leiste mittig unten. Solange die Sprach-KI im Browser aus ist
// (HEALIO_VOICE_CONTACT_ENABLED), ruft „Frag Nita“ die Nita-Sprachlinie an;
// danach öffnet derselbe Knopf Nita direkt auf der Seite. Rechts sitzt der
// WhatsApp-Chat, der sonst als eigener Knopf unten rechts schwebt.
//
// Stand 06.10.2026 (Handy-Rückmeldung): Nach 30 Sekunden auf der Seite
// erscheint über der Leiste eine kleine, wegklickbare Sprechblase „Soll Nita dir
// das Konzept erklären oder dich beraten?“ mit zwei Knöpfen.
// - Solange die Sprach-KI aus ist: „Konzept erklären“ springt zum Erklärvideo
//   der Seite (sonst zum Anfang des Hauptinhalts), „Beraten lassen“ ruft die
//   Nita-Sprachlinie an. Ist sie an, öffnen beide Knöpfe Nita.
// - Auf /schwangerschaft läuft das Nita-Panel nicht (kein NitaConsentWidget,
//   Messsperre), dort gilt immer der Telefonweg.
// - Wegklicken merkt sich der Browser für die Sitzung (sessionStorage).
// - Die Blase erscheint nur, wenn auch die Leiste sichtbar ist, nie über dem
//   Fuß, Kontaktblöcken oder Formularfeldern und nie, solange ein Feld den
//   Fokus hat. prefers-reduced-motion: keine Bewegung.
// - mobileOnly: Leiste und Blase nur unter md (768 px). So bleibt der Desktop
//   dort wie live, wo die Leiste vorher nicht stand (/ambulant, /stationaer).
const COPY = {
  de: {
    title: 'Frag Nita',
    subPhone: 'am Telefon',
    subWeb: 'direkt hier',
    callLabel: `Nita anrufen: ${HEALIO_PHONE_DISPLAY}`,
    webLabel: 'Nita auf dieser Seite fragen',
    whatsapp: 'WhatsApp-Chat mit Healio öffnen (neuer Tab)',
    bubbleLabel: 'Nita, unsere digitale Assistenz',
    bubbleText: 'Soll Nita dir das Konzept erklären oder dich beraten?',
    explain: 'Konzept erklären',
    advise: 'Beraten lassen',
    adviseCall: `Beraten lassen: Nita anrufen, ${HEALIO_PHONE_DISPLAY}`,
    close: 'Hinweis schließen',
  },
  en: {
    title: 'Ask Nita',
    subPhone: 'by phone',
    subWeb: 'right here',
    callLabel: `Call Nita: ${HEALIO_PHONE_DISPLAY}`,
    webLabel: 'Ask Nita on this page',
    whatsapp: 'Open WhatsApp chat with Healio (new tab)',
    bubbleLabel: 'Nita, our digital assistant',
    bubbleText: 'Should Nita explain the concept or advise you?',
    explain: 'Explain the concept',
    advise: 'Get advice',
    adviseCall: `Get advice: call Nita, ${HEALIO_PHONE_DISPLAY}`,
    close: 'Close hint',
  },
};

const SHOW_AFTER_PX = 520;
const BUBBLE_DELAY_MS = 30_000;
const DISMISS_KEY = 'healio-nita-bubble-dismissed';
// Erklärvideo der Seite (Ambulant, Stationär, Zahn). Fehlt es, geht es zum
// Anfang des Hauptinhalts.
const EXPLAINER_IDS = ['erklaervideo', 'stationaer-erklaervideo', 'zahn-erklaervideo'];
const CONTACT_BLOCK_SELECTOR = '[data-healio-contact-block]';
const FIELD_SELECTOR = [
  'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="submit"]):not([type="button"])',
  'textarea',
  'select',
].join(',');
const NITA_PANEL_BLOCKED_PATHS = new Set(['/schwangerschaft']);

const readDismissed = () => {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
};

const writeDismissed = () => {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    // Privates Fenster oder gesperrter Speicher: dann gilt es nur bis zum Neuladen.
  }
};

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const isOnScreen = (element, bottomShare = 1) => {
  const rect = element.getBoundingClientRect();
  if (!rect.width && !rect.height) return false;
  return rect.bottom > 0 && rect.top < window.innerHeight * bottomShare;
};

const NitaQuickPill = ({ hideNearIds = [], mobileOnly = false }) => {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [blockedByTarget, setBlockedByTarget] = useState(false);
  const [fieldInView, setFieldInView] = useState(false);
  const [bubbleDue, setBubbleDue] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(readDismissed);
  const hideKey = hideNearIds.join('|');
  const webAvailable = HEALIO_VOICE_CONTACT_ENABLED && !NITA_PANEL_BLOCKED_PATHS.has(pathname.replace(/\/+$/, '') || '/');

  // Eine Messung für alles: Scrolltiefe, Fuß und Kontaktblöcke, Formularfelder.
  // Über dem Formular und dem Footer hat die Leiste nichts zu suchen, dort
  // würde sie Eingabefelder oder Pflichtlinks verdecken.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolledEnough(window.scrollY > SHOW_AFTER_PX);
      const targets = [
        ...hideKey.split('|').filter(Boolean).map((id) => document.getElementById(id)),
        document.querySelector('footer'),
        ...document.querySelectorAll(CONTACT_BLOCK_SELECTOR),
      ].filter(Boolean);
      setBlockedByTarget(targets.some((target) => isOnScreen(target, 0.9)));
      const focused = document.activeElement;
      setFieldInView(
        Boolean(focused && focused.matches && focused.matches(FIELD_SELECTOR))
        || [...document.querySelectorAll(FIELD_SELECTOR)].some((field) => isOnScreen(field)),
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    // Seiteninhalt kann sich ohne Scrollen ändern (aufklappen, nachladen).
    const interval = window.setInterval(schedule, 1000);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('focusin', schedule);
      document.removeEventListener('focusout', schedule);
    };
  }, [hideKey]);

  // 30 Sekunden nach dem Seitenaufruf wird die Blase fällig, außer sie wurde
  // in dieser Sitzung schon weggeklickt.
  useEffect(() => {
    if (bubbleDismissed || bubbleDue) return undefined;
    const timer = window.setTimeout(() => setBubbleDue(true), BUBBLE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [bubbleDismissed, bubbleDue]);

  const dismissBubble = useCallback(() => {
    writeDismissed();
    setBubbleDismissed(true);
  }, []);

  const isShown = scrolledEnough && !blockedByTarget;
  const bubbleShown = isShown && bubbleDue && !bubbleDismissed && !fieldInView;

  const handleExplain = () => {
    trackEvent('nita_blase_geklickt', { aktion: 'konzept' });
    dismissBubble();
    if (webAvailable) {
      requestNitaConsent('quick_pill_bubble_concept');
      return;
    }
    const target = EXPLAINER_IDS.map((id) => document.getElementById(id)).find(Boolean)
      || document.querySelector('main');
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    if (target.tagName !== 'MAIN') {
      // Fokus mitnehmen, damit die Tastatur dort weitermacht, wo der Inhalt jetzt steht.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      // Der Abschnitt ist nicht bedienbar; ein Fokusrahmen wäre dort nur Rauschen.
      target.style.outline = 'none';
      target.focus({ preventScroll: true });
    }
  };

  const handleAdviseWeb = () => {
    trackEvent('nita_blase_geklickt', { aktion: 'beratung', weg: 'web' });
    dismissBubble();
    requestNitaConsent('quick_pill_bubble_advice');
  };

  const mainClass = 'home-focus flex min-h-14 items-center gap-2.5 rounded-full pl-5 pr-4 text-left text-white transition hover:bg-white/[0.06]';
  const mainContent = (
    <>
      <Sparkles className="h-5 w-5 shrink-0 text-home-mint-active" aria-hidden="true" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-extrabold">{copy.title}</span>
        <span className="mt-1 text-xs font-semibold text-slate-300">
          {webAvailable ? copy.subWeb : copy.subPhone}
        </span>
      </span>
    </>
  );

  const bubbleButton = 'home-focus inline-flex min-h-11 flex-1 basis-[7rem] items-center justify-center whitespace-nowrap rounded-full px-2 text-center font-display text-base font-extrabold transition';

  return (
    <>
      <style>{`
        .healio-nita-pill {
          position: fixed;
          left: 50%;
          bottom: calc(1rem + env(safe-area-inset-bottom));
          z-index: 80;
          transform: translate(-50%, 0);
          transition: opacity 200ms ease, transform 200ms ease, visibility 200ms ease;
        }
        .healio-nita-pill[data-shown='false'],
        html.healio-consent-ui-active .healio-nita-pill,
        html.healio-mobile-menu-active .healio-nita-pill {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate(-50%, 0.75rem);
        }
        .healio-nita-bubble {
          position: fixed;
          left: 50%;
          /* Über der Leiste: 1 rem Rand, 4,25 rem Leistenhöhe, 0,75 rem Luft */
          bottom: calc(6rem + env(safe-area-inset-bottom));
          z-index: 80;
          width: min(24rem, calc(100vw - 1.5rem));
          transform: translate(-50%, 0);
          transition: opacity 220ms ease, transform 220ms ease, visibility 220ms ease;
        }
        .healio-nita-bubble[data-shown='false'],
        html.healio-consent-ui-active .healio-nita-bubble,
        html.healio-mobile-menu-active .healio-nita-bubble {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate(-50%, 0.5rem);
        }
        @media (prefers-reduced-motion: reduce) {
          .healio-nita-pill,
          .healio-nita-bubble { transition: none; }
        }
        @media (min-width: 768px) {
          .healio-nita-pill--mobile-only,
          .healio-nita-bubble--mobile-only { display: none !important; }
        }
        @media print {
          .healio-nita-pill,
          .healio-nita-bubble { display: none !important; }
        }
      `}</style>

      {bubbleDue && !bubbleDismissed && (
        <div
          role="group"
          aria-label={copy.bubbleLabel}
          data-shown={bubbleShown ? 'true' : 'false'}
          aria-hidden={bubbleShown ? undefined : 'true'}
          className={`healio-nita-bubble ${mobileOnly ? 'healio-nita-bubble--mobile-only' : ''} rounded-3xl border border-home-mint/60 bg-white p-4 text-home-midnight shadow-[0_18px_44px_rgba(7,17,31,0.22)]`}
        >
          <p className="pr-9 font-display text-base font-extrabold leading-snug">{copy.bubbleText}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleExplain}
              tabIndex={bubbleShown ? undefined : -1}
              className={`${bubbleButton} bg-home-mint text-home-midnight hover:bg-home-mint-active`}
            >
              {copy.explain}
            </button>
            {webAvailable ? (
              <button
                type="button"
                onClick={handleAdviseWeb}
                tabIndex={bubbleShown ? undefined : -1}
                className={`${bubbleButton} bg-home-midnight text-white hover:bg-[#143247]`}
              >
                {copy.advise}
              </button>
            ) : (
              <a
                href={HEALIO_PHONE_TEL}
                onClick={() => {
                  trackEvent('nita_blase_geklickt', { aktion: 'beratung', weg: 'telefon' });
                  dismissBubble();
                }}
                aria-label={copy.adviseCall}
                tabIndex={bubbleShown ? undefined : -1}
                className={`${bubbleButton} bg-home-midnight text-white hover:bg-[#143247]`}
              >
                {copy.advise}
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              trackEvent('nita_blase_geklickt', { aktion: 'schliessen' });
              dismissBubble();
            }}
            aria-label={copy.close}
            tabIndex={bubbleShown ? undefined : -1}
            className="home-focus absolute right-1 top-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-home-slate transition hover:bg-home-ice hover:text-home-midnight"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          {/* Zipfel der Sprechblase, zeigt auf die Leiste */}
          <span
            className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-b border-r border-home-mint/60 bg-white"
            aria-hidden="true"
          />
        </div>
      )}

      <div
        className={`healio-nita-pill ${mobileOnly ? 'healio-nita-pill--mobile-only' : ''} flex w-max items-center whitespace-nowrap gap-1 rounded-full border border-home-mint/60 bg-home-midnight p-1 shadow-[0_0_0_4px_rgba(37,201,144,0.12),0_18px_40px_rgba(7,17,31,0.35)]`}
        data-shown={isShown ? 'true' : 'false'}
        aria-hidden={isShown ? undefined : 'true'}
      >
        {webAvailable ? (
          <button
            type="button"
            onClick={() => {
              trackEvent('nita_leiste_geklickt', { weg: 'web' });
              dismissBubble();
              requestNitaConsent('quick_pill');
            }}
            aria-label={copy.webLabel}
            tabIndex={isShown ? undefined : -1}
            className={mainClass}
          >
            {mainContent}
          </button>
        ) : (
          <a
            href={HEALIO_PHONE_TEL}
            onClick={() => {
              trackEvent('nita_leiste_geklickt', { weg: 'telefon' });
              dismissBubble();
            }}
            aria-label={copy.callLabel}
            tabIndex={isShown ? undefined : -1}
            className={mainClass}
          >
            {mainContent}
          </a>
        )}
        <span className="h-7 w-px bg-white/15" aria-hidden="true" />
        <a
          href={HEALIO_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent('nita_leiste_geklickt', { weg: 'whatsapp' });
            dismissBubble();
          }}
          aria-label={copy.whatsapp}
          tabIndex={isShown ? undefined : -1}
          className="home-focus inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-home-midnight transition hover:bg-home-mint-active"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </>
  );
};

export default NitaQuickPill;
