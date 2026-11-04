import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, X } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { emailjsService } from '@/services/emailjsService';
import { trackEvent } from '@/lib/analytics';
import { isCampaignLandingRoute } from '@/lib/campaign-landing';
import { getConsentState, subscribeConsent } from '@/lib/consent';
import { GUIDED_CALLBACK_PREVIEW } from '@/lib/guided-callback';
import {
  RUECKRUF_BANNER_FREE_ROUTES,
  RUECKRUF_FIRST_NAME_MAX,
  RUECKRUF_PHONE_INPUT_MAX,
  RUECKRUF_SCROLL_SHARE,
  RUECKRUF_SESSION_KEY,
  RUECKRUF_TEASER_FALLBACK_MS,
  RUECKRUF_TEASER_MIN_DELAY_MS,
  buildRueckrufMessage,
  getRueckrufTopic,
  isValidRueckrufFirstName,
  normalizeRueckrufPath,
  normalizeRueckrufPhone,
} from '@/lib/rueckruf';

// Rückruf-Hinweis „Sprich mit einem Experten“ (Franks Auftrag 04.11.2026:
// derselbe Hinweis wie auf kassenboost.de, Vorlage
// GKV-Vergleichskampagne/website/app/components/RueckrufWidget.tsx).
// - Kleine, nicht modale Karte unten links, frühestens nach 3 s, dann nach
//   60 % Fensterhöhe Scrollen oder spätestens nach 20 s. Am Handy kompakt unten.
// - Rechts in der Mitte sitzt Nitas Kontaktleiste, deshalb links. Liegt der
//   Hinweis über der Nita-Leiste (NitaQuickPill), weicht sie über
//   data-healio-nita-avoid aus.
// - Erst nach der Cookie-Entscheidung, nie gleichzeitig mit einem Nita-Hinweis,
//   nie über einem Knopf der Seite, nie über dem Fuß und nie neben dem
//   Rückruf-Formular auf /zahn.
// - Nach Schließen oder Absenden bleibt in der Sitzung nur ein runder Knopf.
//   Am Handy entfällt er, wo unten schon die Nita-Leiste steht.
// - Seiten und Versandweg: src/lib/rueckruf.js.
const COPY = {
  de: {
    region: 'Persönliche Beratung',
    teaserTitle: 'Sprich mit einem Experten',
    teaserText: '100\u00a0% unverbindlich und kostenlos.',
    teaserButton: 'Beratung anfragen',
    teaserClose: 'Hinweis schließen',
    launcher: 'Beratung anfragen',
    dialogClose: 'Schließen',
    formTitle: 'Sprich mit einem Experten',
    firstName: 'Vorname',
    phone: 'Telefonnummer',
    consent: 'Ja, die Healio GmbH darf mich zu meiner Anfrage anrufen. Meine Angaben werden nur dafür genutzt.',
    privacyLink: 'Mehr im Datenschutz',
    submit: 'Kostenlos beraten lassen',
    sending: 'Wird gesendet …',
    retry: 'Noch einmal senden',
    nextStep: 'Im nächsten Schritt wählst du deinen Wunschtermin für den Videocall. Ohne Termin rufen wir dich zurück.',
    nameError: 'Bitte gib deinen Vornamen ein.',
    phoneError: 'Bitte gib eine Telefonnummer ein, unter der wir dich erreichen, zum Beispiel 0171\u00a01234567 oder +49\u00a0171\u00a01234567.',
    consentError: 'Bitte bestätige, dass wir dich anrufen dürfen.',
    sendError: 'Deine Anfrage ist gerade nicht bei uns angekommen. Bitte versuche es gleich noch einmal.',
    successTitle: 'Danke! Wähle jetzt deinen Wunschtermin.',
    successText: 'Deine Anfrage ist bei uns. Ohne Termin rufen wir dich zurück.',
    successButton: 'Termin jetzt wählen',
    newTab: '(öffnet in einem neuen Tab)',
    sublines: {
      start: 'Persönlicher Check für Kasse, Bonus und Zusatzschutz',
      bonus: 'Persönlicher Check für Bonus und Zusatzschutz',
      ambulant: 'Persönlicher Check für deinen ambulanten Zusatzschutz',
      zahn: 'Persönlicher Check für deinen Zahnzusatzschutz',
      stationaer: 'Persönlicher Check für deinen Klinikschutz',
    },
    terminPath: '/terminvereinbarung',
    privacyPath: '/datenschutz#rueckruf',
  },
  en: {
    region: 'Personal advice',
    teaserTitle: 'Talk to an expert',
    teaserText: '100% free and without obligation.',
    teaserButton: 'Request advice',
    teaserClose: 'Close notice',
    launcher: 'Request advice',
    dialogClose: 'Close',
    formTitle: 'Talk to an expert',
    firstName: 'First name',
    phone: 'Phone number',
    consent: 'Yes, Healio GmbH may call me about my request. My details will only be used for this.',
    privacyLink: 'More in the privacy notice',
    submit: 'Get free advice',
    sending: 'Sending …',
    retry: 'Send again',
    nextStep: 'In the next step, you choose your preferred time for the video call. Without an appointment, we will call you back.',
    nameError: 'Please enter your first name.',
    phoneError: 'Please enter a phone number we can reach you on, for example 0171\u00a01234567 or +49\u00a0171\u00a01234567.',
    consentError: 'Please confirm that we may call you.',
    sendError: 'Your request did not reach us just now. Please try again in a moment.',
    successTitle: 'Thank you! Now choose your preferred appointment.',
    successText: 'We have received your request. Without an appointment, we will call you back.',
    successButton: 'Choose an appointment now',
    newTab: '(opens in a new tab)',
    sublines: {
      start: 'Personal check for health insurance, bonus and extra cover',
      bonus: 'Personal check for bonus and extra cover',
      ambulant: 'Personal check for your outpatient cover',
      zahn: 'Personal check for your dental cover',
      stationaer: 'Personal check for your hospital cover',
    },
    terminPath: '/en/appointment',
    privacyPath: '/en/privacy#rueckruf',
  },
};

const SEND_TIMEOUT_MS = 15_000;
const COMPACT_MAX_WIDTH = 520;
// Unter 768 px läuft die Nita-Leiste (NitaQuickPill, mobileOnly).
const PILL_MAX_WIDTH = 767;
// Knöpfe, Felder und Pillen. Textlinks sind niedriger; große Karten und
// Videobilder bleiben neben dem Hinweis bedienbar und halten ihn nicht auf.
const KEY_ACTION_MIN_HEIGHT = 36;
const KEY_ACTION_MAX_HEIGHT = 120;

// Andere Hinweise haben Vorrang; der Rückruf-Hinweis tritt so lange zurück.
const OTHER_HINT_SELECTOR = '.healio-nita-teaser, #healio-nita-panel, .healio-nita-bubble[data-shown="true"]';
// Hier wäre der Hinweis doppelt (Rückruf-Formular auf /zahn) …
const ON_SCREEN_CLEAR_SELECTOR = '#zahn-kontakt, [data-rueckruf-frei]';
// … oder im Weg (Fuß der Seite).
const ZONE_CLEAR_SELECTOR = 'footer';
// Beim Erscheinen nie über einem Knopf oder Feld der Seite.
const KEY_ACTION_SELECTOR = 'main a[href], main button, main [role="button"], main input, main select, main textarea, main label, [data-healio-nita-avoid]';
const FIELD_SELECTOR = 'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

const readSessionMark = () => {
  try {
    const value = window.sessionStorage.getItem(RUECKRUF_SESSION_KEY);
    return value === 'geschlossen' || value === 'gesendet';
  } catch {
    return false;
  }
};

const writeSessionMark = (value) => {
  try {
    if (value === 'geschlossen' && window.sessionStorage.getItem(RUECKRUF_SESSION_KEY) === 'gesendet') return;
    window.sessionStorage.setItem(RUECKRUF_SESSION_KEY, value);
  } catch {
    // Ohne Speicher gilt der Merker nur für diesen Seitenaufruf.
  }
};

// Fläche, die der Teaser belegt, mit 8 px Luft: Desktop 344 × rund 135 px
// mit 24 px Rand, Handy volle Breite und höchstens 96 px mit 12 px Rand.
const teaserZone = () => {
  const compact = window.innerWidth <= COMPACT_MAX_WIDTH;
  return {
    left: compact ? 0 : 16,
    right: compact ? window.innerWidth : 376,
    top: window.innerHeight - (compact ? 116 : 172),
    bottom: window.innerHeight,
  };
};

const overlaps = (rect, zone) => (
  rect.left < zone.right && rect.right > zone.left && rect.top < zone.bottom && rect.bottom > zone.top
);

const visibleRect = (element) => {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.05) return null;
  return rect;
};

const anyVisibleIn = (selector, zone) => Array.from(document.querySelectorAll(selector)).some((element) => {
  if (element.closest('[data-rueckruf]')) return false;
  const rect = visibleRect(element);
  return Boolean(rect) && overlaps(rect, zone);
});

const coversKeyAction = () => {
  const zone = teaserZone();
  return Array.from(document.querySelectorAll(KEY_ACTION_SELECTOR)).some((element) => {
    if (element.closest('[data-rueckruf]')) return false;
    const rect = element.getBoundingClientRect();
    if (rect.height < KEY_ACTION_MIN_HEIGHT || rect.height > KEY_ACTION_MAX_HEIGHT || !overlaps(rect, zone)) return false;
    return Boolean(visibleRect(element));
  });
};

const readSurroundings = () => {
  const viewport = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
  const focused = document.activeElement;
  const typing = window.innerWidth <= PILL_MAX_WIDTH
    && Boolean(focused?.matches?.(FIELD_SELECTOR)) && !focused.closest('[data-rueckruf]');
  return {
    blocked: anyVisibleIn(OTHER_HINT_SELECTOR, viewport)
      || anyVisibleIn(ON_SCREEN_CLEAR_SELECTOR, viewport)
      || anyVisibleIn(ZONE_CLEAR_SELECTOR, teaserZone())
      || typing,
    launcherSuppressed: window.innerWidth <= PILL_MAX_WIDTH && Boolean(document.querySelector('.healio-nita-pill')),
  };
};

const withTimeout = (promise, timeoutMs) => {
  let timer;
  const timeout = new Promise((_resolve, reject) => {
    timer = window.setTimeout(() => reject(new Error('rueckruf-timeout')), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timer));
};

const RueckrufStyles = () => (
  <style>{`
    .healio-rueckruf-teaser { position: fixed; left: 24px; bottom: calc(24px + env(safe-area-inset-bottom)); z-index: 85; display: grid; grid-template-areas: "avatar title" "avatar text" "action action"; grid-template-columns: 44px minmax(0, 1fr); align-items: center; column-gap: 12px; width: 344px; padding: 16px 18px 14px; border: 1px solid rgba(7,17,31,.08); border-radius: 20px; background: #fff; color: #07111f; box-shadow: 0 22px 54px rgba(7,17,31,.18), 0 2px 6px rgba(7,17,31,.06); animation: healio-rueckruf-in 240ms ease-out both; }
    .healio-rueckruf-avatar { grid-area: avatar; display: inline-flex; width: 44px; height: 44px; align-items: center; justify-content: center; border-radius: 999px; background: #e7f8f0; color: #076046; }
    .healio-rueckruf-avatar svg { width: 21px; height: 21px; }
    .healio-rueckruf-title { grid-area: title; margin: 0; padding-right: 22px; font-family: Manrope, Inter, system-ui, sans-serif; font-size: 15.5px; font-weight: 800; line-height: 1.25; color: #07111f; }
    .healio-rueckruf-text { grid-area: text; margin: 2px 0 0; font-size: 13px; line-height: 1.4; color: #46515e; }
    .healio-rueckruf-action, .healio-rueckruf-submit { display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: #25c990; color: #07111f; font: inherit; font-family: Manrope, Inter, system-ui, sans-serif; font-weight: 800; text-align: center; text-decoration: none; cursor: pointer; transition: background 140ms ease; }
    .healio-rueckruf-action { grid-area: action; min-height: 44px; margin-top: 12px; padding: 10px 18px; font-size: 15px; white-space: nowrap; }
    .healio-rueckruf-action:hover, .healio-rueckruf-submit:hover:not(:disabled) { background: #5ee0b1; }
    .healio-rueckruf-close { position: absolute; top: 6px; right: 6px; display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border: 0; padding: 0; border-radius: 999px; background: transparent; color: #64748b; cursor: pointer; }
    .healio-rueckruf-close:hover { background: #f1f5f9; color: #07111f; }
    .healio-rueckruf-close svg { width: 18px; height: 18px; }
    .healio-rueckruf-launcher { position: fixed; left: 24px; bottom: calc(24px + env(safe-area-inset-bottom)); z-index: 85; display: inline-flex; width: 60px; height: 60px; align-items: center; justify-content: center; border: 0; padding: 0; border-radius: 999px; background: #07111f; color: #5ee0b1; cursor: pointer; box-shadow: 0 0 0 4px rgba(37,201,144,.12), 0 14px 32px rgba(7,17,31,.24); transition: box-shadow 160ms ease, transform 160ms ease, opacity 180ms ease, visibility 180ms ease; }
    .healio-rueckruf-launcher:hover { transform: translateY(-2px); box-shadow: 0 0 0 4px rgba(37,201,144,.16), 0 18px 36px rgba(7,17,31,.3); }
    .healio-rueckruf-launcher svg { width: 26px; height: 26px; }
    .healio-rueckruf-surface[data-zurueck="true"], html.healio-consent-ui-active .healio-rueckruf-surface, html.healio-mobile-menu-active .healio-rueckruf-surface { opacity: 0; visibility: hidden; pointer-events: none; }
    .healio-rueckruf-action:focus-visible, .healio-rueckruf-close:focus-visible, .healio-rueckruf-launcher:focus-visible, .healio-rueckruf-submit:focus-visible, .healio-rueckruf-field input:focus-visible, .healio-rueckruf-consent input:focus-visible, .healio-rueckruf-consent a:focus-visible { outline: 3px solid #076046; outline-offset: 3px; }
    .healio-rueckruf-dialog { position: fixed; inset: auto auto calc(24px + env(safe-area-inset-bottom)) 24px; width: 408px; max-width: calc(100vw - 48px); max-height: calc(100dvh - 48px); margin: 0; padding: 0; overflow-y: auto; overscroll-behavior: contain; border: 0; border-radius: 20px; background: #fff; color: #46515e; box-shadow: 0 24px 70px rgba(7,17,31,.3); }
    .healio-rueckruf-dialog::backdrop { background: rgba(7,17,31,.45); }
    .healio-rueckruf-body { position: relative; padding: 24px 24px 22px; }
    .healio-rueckruf-head { margin-bottom: 18px; padding-right: 34px; }
    .healio-rueckruf-dialog h2 { margin: 0; font-family: Manrope, Inter, system-ui, sans-serif; font-size: 24px; font-weight: 800; letter-spacing: -.01em; line-height: 1.15; color: #07111f; }
    .healio-rueckruf-subline { margin: 4px 0 0; font-size: 14px; font-weight: 700; line-height: 1.4; color: #076046; text-wrap: balance; }
    .healio-rueckruf-form { display: grid; gap: 14px; }
    .healio-rueckruf-field { display: grid; gap: 6px; }
    .healio-rueckruf-field label { font-size: 14px; font-weight: 700; color: #07111f; }
    .healio-rueckruf-field input { width: 100%; min-height: 48px; padding: 10px 12px; border: 1px solid #94a3b8; border-radius: 12px; background: #fff; color: #07111f; font: inherit; font-size: 16px; }
    .healio-rueckruf-field input[aria-invalid="true"], .healio-rueckruf-consent input[aria-invalid="true"] { border-color: #b3261e; outline: 2px solid rgba(179,38,30,.35); outline-offset: 1px; }
    .healio-rueckruf-error { margin: 0; font-size: 13px; font-weight: 600; line-height: 1.45; color: #9b251f; text-wrap: pretty; }
    .healio-rueckruf-consent { display: grid; gap: 6px; font-size: 13px; line-height: 1.5; color: #46515e; }
    .healio-rueckruf-consent label { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
    .healio-rueckruf-consent input { flex: 0 0 auto; width: 20px; height: 20px; margin: 1px 0 0; accent-color: #076046; }
    .healio-rueckruf-consent a { font-weight: 700; color: #076046; text-decoration: underline; text-underline-offset: 3px; }
    .healio-rueckruf-send-error { margin: 0; padding: 10px 12px; border-radius: 12px; background: #fdecea; color: #8a1c1c; font-size: 13.5px; line-height: 1.5; }
    .healio-rueckruf-submit { width: 100%; min-height: 52px; padding: 12px 18px; font-size: 16px; }
    .healio-rueckruf-submit:disabled { cursor: default; opacity: .6; }
    .healio-rueckruf-next { margin: 0; font-size: 12.5px; line-height: 1.5; text-align: center; color: #64748b; }
    .healio-rueckruf-success { display: grid; gap: 12px; }
    .healio-rueckruf-success h3 { margin: 0; font-family: Manrope, Inter, system-ui, sans-serif; font-size: 20px; font-weight: 800; line-height: 1.25; color: #07111f; }
    .healio-rueckruf-success p { margin: 0 0 6px; font-size: 14px; line-height: 1.55; }
    @keyframes healio-rueckruf-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: ${COMPACT_MAX_WIDTH}px) {
      .healio-rueckruf-teaser { left: 8px; right: 8px; bottom: calc(12px + env(safe-area-inset-bottom)); width: auto; grid-template-areas: "title title" "text action"; grid-template-columns: minmax(0, 1fr) auto; column-gap: 10px; padding: 10px 12px; border-radius: 16px; box-shadow: 0 10px 28px rgba(7,17,31,.2); }
      .healio-rueckruf-teaser .healio-rueckruf-avatar { display: none; }
      .healio-rueckruf-title { padding-right: 26px; font-size: 14.5px; }
      .healio-rueckruf-text { margin-top: 3px; font-size: 12px; line-height: 1.35; }
      .healio-rueckruf-action { min-height: 40px; margin-top: 4px; padding: 8px 14px; font-size: 13px; }
      .healio-rueckruf-close { top: 2px; right: 2px; width: 32px; height: 32px; }
      .healio-rueckruf-launcher { left: 8px; bottom: calc(12px + env(safe-area-inset-bottom)); width: 44px; height: 44px; opacity: .94; box-shadow: 0 0 0 3px rgba(37,201,144,.12), 0 8px 18px rgba(7,17,31,.2); }
      .healio-rueckruf-launcher svg { width: 20px; height: 20px; }
      .healio-rueckruf-dialog { inset: auto 0 0 0; width: 100%; max-width: none; max-height: calc(100dvh - 16px); border-radius: 20px 20px 0 0; }
      .healio-rueckruf-body { padding: 20px 18px calc(18px + env(safe-area-inset-bottom)); }
      .healio-rueckruf-dialog h2 { font-size: 22px; }
    }
    @media (max-width: 360px) {
      .healio-rueckruf-teaser { grid-template-areas: "title" "text" "action"; grid-template-columns: minmax(0, 1fr); }
      .healio-rueckruf-action { margin-top: 8px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .healio-rueckruf-teaser { animation: none; }
      .healio-rueckruf-launcher, .healio-rueckruf-action, .healio-rueckruf-submit { transition: none; }
      .healio-rueckruf-launcher:hover { transform: none; }
    }
    @media print { .healio-rueckruf-surface, .healio-rueckruf-dialog { display: none !important; } }
  `}</style>
);

const RueckrufDialog = ({ copy, lang, topic, pathname, sent, onClose, onSent }) => {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const consentRef = useRef(null);
  const successRef = useRef(null);
  const mountedRef = useRef(true);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({ name: false, phone: false, consent: false });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    mountedRef.current = true;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      mountedRef.current = false;
      if (dialog?.open) dialog.close();
    };
  }, []);

  // Fokus beim Öffnen ins erste Feld, nach dem Absenden auf den Terminknopf.
  useEffect(() => {
    if (sent) successRef.current?.focus();
    else nameRef.current?.focus();
  }, [sent]);

  const submit = async (event) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    if (status === 'sending') return;
    const normalizedPhone = normalizeRueckrufPhone(phone);
    const nextErrors = {
      name: !isValidRueckrufFirstName(firstName),
      phone: !normalizedPhone,
      consent: !consent,
    };
    setErrors(nextErrors);
    const firstInvalid = nextErrors.name ? nameRef : nextErrors.phone ? phoneRef : nextErrors.consent ? consentRef : null;
    if (firstInvalid) {
      firstInvalid.current?.focus();
      return;
    }

    setStatus('sending');
    const page = normalizeRueckrufPath(pathname);
    try {
      await withTimeout(emailjsService.sendEmail({
        from_name: firstName.trim(),
        from_email: '',
        phone: normalizedPhone,
        message: buildRueckrufMessage({ pathname: page, topic, lang }),
      }, `Rückruf-Hinweis ${page === '/' ? 'Startseite' : page}`), SEND_TIMEOUT_MS);
      if (!mountedRef.current) return;
      setStatus('idle');
      onSent();
    } catch {
      if (mountedRef.current) setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="healio-rueckruf-title"
      aria-describedby="healio-rueckruf-subline"
      className="healio-rueckruf-dialog"
      data-rueckruf="dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="healio-rueckruf-body">
        <button type="button" className="healio-rueckruf-close" onClick={onClose} aria-label={copy.dialogClose} title={copy.dialogClose}>
          <X aria-hidden="true" />
        </button>
        <div className="healio-rueckruf-head">
          <h2 id="healio-rueckruf-title">{copy.formTitle}</h2>
          <p id="healio-rueckruf-subline" className="healio-rueckruf-subline">{copy.sublines[topic] ?? copy.sublines.start}</p>
        </div>

        {sent ? (
          <div className="healio-rueckruf-success" role="status">
            <h3>{copy.successTitle}</h3>
            <p>{copy.successText}</p>
            <Link
              ref={successRef}
              to={copy.terminPath}
              className="healio-rueckruf-submit"
              onClick={() => {
                trackEvent('rueckruf_termin_geklickt', { component: 'rueckruf_hinweis', placement: topic });
                onClose();
              }}
            >
              {copy.successButton}
            </Link>
          </div>
        ) : (
          <form method="post" action="/kontakt" onSubmit={submit} noValidate className="healio-rueckruf-form">
            <FormHoneypot id="healio-rueckruf-website" />
            <div className="healio-rueckruf-field">
              <label htmlFor="healio-rueckruf-vorname">{copy.firstName}</label>
              <input
                ref={nameRef}
                id="healio-rueckruf-vorname"
                name="firstName"
                autoComplete="given-name"
                maxLength={RUECKRUF_FIRST_NAME_MAX}
                required
                aria-invalid={errors.name}
                aria-describedby={errors.name ? 'healio-rueckruf-vorname-fehler' : undefined}
                value={firstName}
                disabled={sending}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  if (errors.name) setErrors((current) => ({ ...current, name: false }));
                }}
              />
              {errors.name && <p id="healio-rueckruf-vorname-fehler" className="healio-rueckruf-error">{copy.nameError}</p>}
            </div>
            <div className="healio-rueckruf-field">
              <label htmlFor="healio-rueckruf-telefon">{copy.phone}</label>
              <input
                ref={phoneRef}
                id="healio-rueckruf-telefon"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={RUECKRUF_PHONE_INPUT_MAX}
                required
                aria-invalid={errors.phone}
                aria-describedby={errors.phone ? 'healio-rueckruf-telefon-fehler' : undefined}
                value={phone}
                disabled={sending}
                onChange={(event) => {
                  setPhone(event.target.value);
                  if (errors.phone) setErrors((current) => ({ ...current, phone: false }));
                }}
              />
              {errors.phone && <p id="healio-rueckruf-telefon-fehler" className="healio-rueckruf-error">{copy.phoneError}</p>}
            </div>
            <div className="healio-rueckruf-consent">
              <label htmlFor="healio-rueckruf-einwilligung">
                <input
                  ref={consentRef}
                  id="healio-rueckruf-einwilligung"
                  name="consent"
                  type="checkbox"
                  required
                  aria-invalid={errors.consent}
                  aria-describedby={errors.consent ? 'healio-rueckruf-einwilligung-fehler' : undefined}
                  checked={consent}
                  disabled={sending}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    if (errors.consent) setErrors((current) => ({ ...current, consent: false }));
                  }}
                />
                <span>
                  {copy.consent}{' '}
                  <a href={copy.privacyPath} target="_blank" rel="noopener noreferrer">
                    {copy.privacyLink}
                    <span className="sr-only"> {copy.newTab}</span>
                  </a>
                </span>
              </label>
              {errors.consent && <p id="healio-rueckruf-einwilligung-fehler" className="healio-rueckruf-error">{copy.consentError}</p>}
            </div>
            {status === 'error' && <p className="healio-rueckruf-send-error" role="alert">{copy.sendError}</p>}
            <button type="submit" className="healio-rueckruf-submit" disabled={sending}>
              {sending ? copy.sending : status === 'error' ? copy.retry : copy.submit}
            </button>
            <p className="healio-rueckruf-next">{copy.nextStep}</p>
          </form>
        )}
      </div>
    </dialog>
  );
};

const ActiveRueckrufHinweis = ({ path, topic, lang }) => {
  const copy = COPY[lang];
  const [consentDecided, setConsentDecided] = useState(() => getConsentState().decided === true);
  const [phase, setPhase] = useState(() => (readSessionMark() ? 'launcher' : 'waiting'));
  const [surroundings, setSurroundings] = useState({ blocked: false, launcherSuppressed: false });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const launcherRef = useRef(null);
  const teaserRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => subscribeConsent((state) => setConsentDecided(state?.decided === true)), []);

  // Auf /zahn gibt es keinen Cookie-Hinweis, also auch keine Entscheidung, auf die zu warten wäre.
  const eligible = consentDecided || RUECKRUF_BANNER_FREE_ROUTES.has(path);

  // Umgebung laufend prüfen: andere Hinweise, Fuß, Rückruf-Formular, Tastatur am Handy.
  useEffect(() => {
    if (!eligible) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = readSurroundings();
      setSurroundings((current) => (
        current.blocked === next.blocked && current.launcherSuppressed === next.launcherSuppressed ? current : next
      ));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    // Nita-Hinweise erscheinen und verschwinden ohne Scrollen.
    const interval = window.setInterval(schedule, 1000);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('focusin', schedule);
      document.removeEventListener('focusout', schedule);
    };
  }, [eligible]);

  // Teaser frühestens nach 3 s; dann nach 60 % Fensterhöhe Scrollen oder nach
  // 20 s, aber nie über einem Knopf der Seite und nie neben einem anderen Hinweis.
  useEffect(() => {
    if (!eligible || phase !== 'waiting') return undefined;
    let minimumPassed = false;
    let fallbackPassed = false;
    let frame = 0;
    const tryReveal = () => {
      frame = 0;
      if (!minimumPassed) return;
      if (!fallbackPassed && window.scrollY < window.innerHeight * RUECKRUF_SCROLL_SHARE) return;
      if (readSurroundings().blocked || coversKeyAction()) return;
      setPhase((current) => (current === 'waiting' ? 'teaser' : current));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(tryReveal);
    };
    const minimum = window.setTimeout(() => {
      minimumPassed = true;
      schedule();
    }, RUECKRUF_TEASER_MIN_DELAY_MS);
    const fallback = window.setTimeout(() => {
      fallbackPassed = true;
      schedule();
    }, RUECKRUF_TEASER_FALLBACK_MS);
    const interval = window.setInterval(schedule, 1000);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(minimum);
      window.clearTimeout(fallback);
      window.clearInterval(interval);
      window.removeEventListener('scroll', schedule);
    };
  }, [eligible, phase]);

  useEffect(() => {
    if (phase === 'teaser') trackEvent('rueckruf_hinweis_gezeigt', { component: 'rueckruf_hinweis', placement: topic });
  }, [phase, topic]);

  // Nach dem Schließen des Formulars landet der Fokus wieder dort, wo er vorher war.
  useEffect(() => {
    if (dialogOpen || !restoreFocusRef.current) return;
    const target = launcherRef.current ?? restoreFocusRef.current;
    restoreFocusRef.current = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }, [dialogOpen, phase]);

  const closeTeaser = useCallback(() => {
    writeSessionMark('geschlossen');
    restoreFocusRef.current = document.body;
    setPhase('launcher');
  }, []);

  const teaserVisible = eligible && phase === 'teaser' && !dialogOpen;

  // Escape schließt den Teaser, wenn der Fokus darin liegt.
  useEffect(() => {
    if (!teaserVisible) return undefined;
    const handleKey = (event) => {
      if (event.key !== 'Escape' || !teaserRef.current?.contains(document.activeElement)) return;
      closeTeaser();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [teaserVisible, closeTeaser]);

  const openDialog = useCallback((source) => {
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    trackEvent('rueckruf_formular_geoeffnet', { component: 'rueckruf_hinweis', placement: topic, action: source });
    setPhase('launcher');
    setDialogOpen(true);
  }, [topic]);

  const closeDialog = useCallback(() => {
    writeSessionMark('geschlossen');
    restoreFocusRef.current ??= document.body;
    setDialogOpen(false);
  }, []);

  const handleSent = useCallback(() => {
    writeSessionMark('gesendet');
    setSent(true);
  }, []);

  if (!eligible) return null;

  const zurueck = surroundings.blocked;
  const launcherVisible = phase === 'launcher' && !surroundings.launcherSuppressed;

  return (
    <>
      <RueckrufStyles />
      {teaserVisible && (
        <aside
          ref={teaserRef}
          aria-label={copy.region}
          className="healio-rueckruf-surface healio-rueckruf-teaser"
          data-rueckruf="teaser"
          data-zurueck={zurueck ? 'true' : 'false'}
          aria-hidden={zurueck ? 'true' : undefined}
          {...(zurueck ? {} : { 'data-healio-nita-avoid': '' })}
        >
          <span className="healio-rueckruf-avatar" aria-hidden="true"><Phone /></span>
          <p className="healio-rueckruf-title">{copy.teaserTitle}</p>
          <p className="healio-rueckruf-text">{copy.teaserText}</p>
          <button type="button" className="healio-rueckruf-action" onClick={() => openDialog('hinweis')} tabIndex={zurueck ? -1 : undefined}>
            {copy.teaserButton}
          </button>
          <button type="button" className="healio-rueckruf-close" onClick={closeTeaser} aria-label={copy.teaserClose} title={copy.teaserClose} tabIndex={zurueck ? -1 : undefined}>
            <X aria-hidden="true" />
          </button>
        </aside>
      )}
      {launcherVisible && (
        <button
          ref={launcherRef}
          type="button"
          className="healio-rueckruf-surface healio-rueckruf-launcher"
          data-rueckruf="launcher"
          data-zurueck={zurueck && !dialogOpen ? 'true' : 'false'}
          aria-label={copy.launcher}
          title={copy.launcher}
          tabIndex={zurueck && !dialogOpen ? -1 : undefined}
          onClick={() => openDialog('knopf')}
        >
          <Phone aria-hidden="true" />
        </button>
      )}
      {dialogOpen && (
        <RueckrufDialog
          copy={copy}
          lang={lang}
          topic={topic}
          pathname={path}
          sent={sent}
          onClose={closeDialog}
          onSent={handleSent}
        />
      )}
    </>
  );
};

export const RueckrufHinweis = () => {
  const location = useLocation();
  const path = normalizeRueckrufPath(location.pathname);
  const topic = getRueckrufTopic(path);
  if (!topic || GUIDED_CALLBACK_PREVIEW || isCampaignLandingRoute(location)) return null;
  const lang = path === '/en' || path.startsWith('/en/') ? 'en' : 'de';
  // Jede Seite beginnt neu: Der Teaser wartet wieder auf Scrollen und freie Sicht.
  return <ActiveRueckrufHinweis key={path} path={path} topic={topic} lang={lang} />;
};

export default RueckrufHinweis;
