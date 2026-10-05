import React, { useEffect, useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
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
const COPY = {
  de: {
    title: 'Frag Nita',
    subPhone: 'am Telefon',
    subWeb: 'direkt hier',
    callLabel: `Nita anrufen: ${HEALIO_PHONE_DISPLAY}`,
    webLabel: 'Nita auf dieser Seite fragen',
    whatsapp: 'WhatsApp-Chat mit Healio öffnen (neuer Tab)',
  },
  en: {
    title: 'Ask Nita',
    subPhone: 'by phone',
    subWeb: 'right here',
    callLabel: `Call Nita: ${HEALIO_PHONE_DISPLAY}`,
    webLabel: 'Ask Nita on this page',
    whatsapp: 'Open WhatsApp chat with Healio (new tab)',
  },
};

const SHOW_AFTER_PX = 520;

const NitaQuickPill = ({ hideNearIds = [] }) => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [blockedByTarget, setBlockedByTarget] = useState(false);
  const hideKey = hideNearIds.join('|');

  useEffect(() => {
    const handleScroll = () => setScrolledEnough(window.scrollY > SHOW_AFTER_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Über dem Formular und dem Footer hat die Leiste nichts zu suchen, dort
  // würde sie Eingabefelder oder Pflichtlinks verdecken.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const targets = [...hideKey.split('|').filter(Boolean).map((id) => document.getElementById(id)), document.querySelector('footer')]
      .filter(Boolean);
    if (!targets.length) return undefined;
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setBlockedByTarget(visible.size > 0);
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [hideKey]);

  const isShown = scrolledEnough && !blockedByTarget;
  const mainClass = 'home-focus flex min-h-14 items-center gap-2.5 rounded-full pl-5 pr-4 text-left text-white transition hover:bg-white/[0.06]';
  const mainContent = (
    <>
      <Sparkles className="h-5 w-5 shrink-0 text-home-mint-active" aria-hidden="true" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-extrabold">{copy.title}</span>
        <span className="mt-1 text-xs font-semibold text-slate-300">
          {HEALIO_VOICE_CONTACT_ENABLED ? copy.subWeb : copy.subPhone}
        </span>
      </span>
    </>
  );

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
        @media (prefers-reduced-motion: reduce) {
          .healio-nita-pill { transition: none; }
        }
        @media print {
          .healio-nita-pill { display: none !important; }
        }
      `}</style>

      <div
        className="healio-nita-pill flex w-max items-center whitespace-nowrap gap-1 rounded-full border border-home-mint/60 bg-home-midnight p-1 shadow-[0_0_0_4px_rgba(37,201,144,0.12),0_18px_40px_rgba(7,17,31,0.35)]"
        data-shown={isShown ? 'true' : 'false'}
        aria-hidden={isShown ? undefined : 'true'}
      >
        {HEALIO_VOICE_CONTACT_ENABLED ? (
          <button
            type="button"
            onClick={() => {
              trackEvent('nita_leiste_geklickt', { weg: 'web' });
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
            onClick={() => trackEvent('nita_leiste_geklickt', { weg: 'telefon' })}
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
          onClick={() => trackEvent('nita_leiste_geklickt', { weg: 'whatsapp' })}
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
