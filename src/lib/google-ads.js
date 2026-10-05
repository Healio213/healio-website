import {
  getConsentState,
  hasConsent,
  subscribeConsent,
} from '@/lib/consent';
import {
  PRIVATE_FUNNEL_SOURCES,
  queueConsentDefault,
  queueGtagCommand,
} from '@/lib/analytics';
import {
  ANTRAG_LABEL as CONFIG_ANTRAG_LABEL,
  GOOGLE_ADS_ID as CONFIG_GOOGLE_ADS_ID,
  LEAD_LABEL as CONFIG_LEAD_LABEL,
} from '@/lib/google-ads-config';

/**
 * Google-Ads-Conversion-Messung fuer healio.de.
 *
 * Grundregeln, die dieses Modul technisch erzwingt und die bewusst dieselben
 * sind wie im Meta-Modul (src/lib/meta-pixel.js):
 * 1. Ohne Zustimmung fuer den Zweck "marketing" wird kein Google-Ads-Tag
 *    geladen, kein Conversion-Ereignis gesendet und die Werbe-Achse des
 *    Consent Mode bleibt auf denied.
 * 2. Ohne Konto-ID ist das Modul vollständig inaktiv. Sie kommt aus
 *    VITE_GOOGLE_ADS_ID oder, wenn die Variable fehlt, aus der festen
 *    Konstante in src/lib/google-ads-config.js. Beide Wege laufen durch
 *    dieselbe Formatprüfung. Solange beide leer sind, passiert nichts.
 * 3. Es gibt genau zwei Erfolge: "Anfrage" (Lead-Label) und
 *    "Antrag geöffnet" (Antrag-Label, Umgebungsvariable heißt aus
 *    Kompatibilität weiter VITE_GOOGLE_ADS_RECHNER_LABEL). Ohne gültiges
 *    Label bleibt das jeweilige Ereignis still. Klicks auf "IKK-Bonus
 *    sichern", KassenBoost und interne Weiter-Knöpfe sind kein Erfolg.
 * 4. Es geht genau ein Parameter raus: send_to mit Konto-ID und Label.
 *    Keine Rechnerinhalte, keine Antworten, keine Namen, keine Adressen,
 *    kein Wert, keine Transaktions-ID.
 * 5. ad_personalization bleibt dauerhaft denied. Zugestimmt wird nur der
 *    Messung, nicht der Profilbildung fuer personalisierte Werbung.
 * 6. Gesperrte Routen sind dieselben wie bei Meta: /schwangerschaft sowie
 *    die neutralen Kampagnencodes src=bonus-check und src=reel-f05.
 */

const GOOGLE_ADS_ID_PATTERN = /^AW-\d{6,20}$/;
const GOOGLE_ADS_LABEL_PATTERN = /^[A-Za-z0-9_-]{5,40}$/;
const GOOGLE_ADS_SCRIPT_SELECTOR = 'script[data-healio-google-ads="true"]';
const GTAG_SCRIPT_SELECTOR = 'script[data-healio-ga4="true"], script[data-healio-google-ads="true"]';
const GOOGLE_ADS_COOKIE = /^_gcl_/;

// Klick-Kennung aus der Anzeige. Sie ist ein Google-eigener Zaehlwert und
// enthaelt keine Eingaben aus Rechnern oder Formularen.
const GCLID_PATTERN = /^[A-Za-z0-9_-]{10,200}$/;

// Auf diesen Routen darf Google Ads niemals messen. /zahn und /ambulant sind
// bewusst NICHT gesperrt: dorthin soll geworben werden.
const GOOGLE_ADS_EXCLUDED_PATHS = new Set(['/schwangerschaft']);

// "Antrag geöffnet" zählt nur auf den beworbenen Produktseiten, auf denen
// Abschluss- und Rechnerlinks der Versicherer stehen.
const GOOGLE_ADS_ANTRAG_PATHS = new Set([
  '/ambulant',
  '/en/outpatient',
  '/stationaer',
  '/en/inpatient',
  '/zahn',
  '/en/dental',
]);

// Werbe-Achse des Consent Mode. ad_personalization bleibt in beiden
// Richtungen denied, es wird also nie ein Werbeprofil freigegeben.
const AD_CONSENT_GRANTED = Object.freeze({
  ad_personalization: 'denied',
  ad_storage: 'granted',
  ad_user_data: 'granted',
});

const AD_CONSENT_DENIED = Object.freeze({
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
});

// Defensiv lesen: in Prerender-, Test- und CJS-Bundles kann import.meta.env
// fehlen. Ohne lesbare Konto-ID bleibt der gesamte Google-Ads-Pfad inaktiv.
const GOOGLE_ADS_ENV = (typeof import.meta !== 'undefined' && import.meta.env) || {};

// Zuerst die Umgebungsvariable, sonst die feste Konstante. Beide Werte
// durchlaufen dieselbe Formatprüfung, ungültige Werte bleiben leer.
const readConfig = (key, pattern, fallback) => {
  const raw = typeof GOOGLE_ADS_ENV[key] === 'string' ? GOOGLE_ADS_ENV[key].trim() : '';
  if (pattern.test(raw)) return raw;
  const fixed = typeof fallback === 'string' ? fallback.trim() : '';
  return pattern.test(fixed) ? fixed : '';
};

export const GOOGLE_ADS_ID = readConfig('VITE_GOOGLE_ADS_ID', GOOGLE_ADS_ID_PATTERN, CONFIG_GOOGLE_ADS_ID);
export const GOOGLE_ADS_LEAD_LABEL = readConfig('VITE_GOOGLE_ADS_LEAD_LABEL', GOOGLE_ADS_LABEL_PATTERN, CONFIG_LEAD_LABEL);
export const GOOGLE_ADS_ANTRAG_LABEL = readConfig('VITE_GOOGLE_ADS_RECHNER_LABEL', GOOGLE_ADS_LABEL_PATTERN, CONFIG_ANTRAG_LABEL);
/** Alter Name, bleibt als Alias. */
export const GOOGLE_ADS_RECHNER_LABEL = GOOGLE_ADS_ANTRAG_LABEL;

let tagConfigured = false;
let adConsentGranted = false;
let consentUnsubscribe = null;
let googleAdsConsumerCount = 0;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/** Ohne Konto-ID bleibt der gesamte Google-Ads-Pfad tot. */
export const isGoogleAdsConfigured = () => GOOGLE_ADS_ID !== '';

const normalizePath = (pathname) => (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';

export const isGoogleAdsExcludedRoute = (location = isBrowser() ? window.location : null) => {
  if (!location) return true;
  const pathname = normalizePath(location.pathname);
  if (GOOGLE_ADS_EXCLUDED_PATHS.has(pathname)) return true;

  // Neutrale Kampagnencodes fuehren in private Gesundheitsstrecken. Auch
  // Google darf dort nichts sehen, selbst wenn "marketing" erlaubt wurde.
  return new URLSearchParams(location.search || '')
    .getAll('src')
    .some((source) => PRIVATE_FUNNEL_SOURCES.has(source));
};

export const isGoogleAdsAntragRoute = (location = isBrowser() ? window.location : null) => (
  Boolean(location) && GOOGLE_ADS_ANTRAG_PATHS.has(normalizePath(location.pathname))
);

/**
 * Klick-Kennung der Anzeige aus der aktuellen Adresszeile.
 *
 * Bewusst ohne eigenen Speicher: der Wert wird nur gelesen, solange er in
 * der URL steht. Eine Ablage in Cookie oder Storage waere ein eigener
 * Einwilligungsgegenstand und ist hier nicht gebaut.
 */
export const readGoogleClickId = (location = isBrowser() ? window.location : null) => {
  if (!location || !isGoogleAdsConfigured()) return '';
  if (!hasConsent('marketing') || isGoogleAdsExcludedRoute(location)) return '';

  try {
    const gclid = new URLSearchParams(location.search || '').get('gclid') || '';
    return GCLID_PATTERN.test(gclid) ? gclid : '';
  } catch {
    return '';
  }
};

const clearGoogleAdsCookies = () => {
  if (!isBrowser() || !document.cookie) return;

  const hostname = window.location.hostname;
  const domains = hostname && hostname !== 'localhost'
    ? ['', `domain=${hostname};`, `domain=.${hostname};`]
    : [''];

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !GOOGLE_ADS_COOKIE.test(name)) return;

    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; ${domain} SameSite=Lax`;
    });
  });
};

const safeGoogleAdsScriptUrl = () => {
  try {
    const url = new URL(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
    if (url.protocol !== 'https:' || url.hostname !== 'www.googletagmanager.com') return null;
    if (url.pathname !== '/gtag/js' || url.searchParams.get('id') !== GOOGLE_ADS_ID) return null;
    return url.toString();
  } catch {
    return null;
  }
};

/**
 * Laedt gtag.js und konfiguriert das Google-Ads-Konto. Strikt an Zustimmung,
 * Konto-ID und freigegebene Route gebunden. Liegt schon ein gtag-Skript im
 * Dokument (GA4), wird kein zweites geladen: es ist dieselbe Bibliothek.
 */
const loadGoogleAdsTag = () => {
  if (!isBrowser() || !isGoogleAdsConfigured() || !hasConsent('marketing')) return false;
  if (isGoogleAdsExcludedRoute()) return false;
  if (tagConfigured) return true;

  const scriptUrl = safeGoogleAdsScriptUrl();
  if (!scriptUrl) return false;

  queueConsentDefault();
  queueGtagCommand('consent', 'update', AD_CONSENT_GRANTED);
  adConsentGranted = true;

  if (!document.querySelector(GTAG_SCRIPT_SELECTOR)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    script.dataset.healioGoogleAds = 'true';
    document.head.appendChild(script);
  }

  queueGtagCommand('js', new Date());
  queueGtagCommand('config', GOOGLE_ADS_ID, {
    allow_ad_personalization_signals: false,
    send_page_view: false,
  });

  tagConfigured = true;
  return true;
};

/**
 * Einziger Ausgang fuer Google-Ads-Conversions. Ohne Label bleibt es still.
 */
const emitGoogleAdsConversion = (label) => {
  if (!isBrowser() || !isGoogleAdsConfigured()) return false;
  if (!GOOGLE_ADS_LABEL_PATTERN.test(label || '')) return false;
  if (!hasConsent('marketing')) return false;
  if (isGoogleAdsExcludedRoute()) return false;
  if (!loadGoogleAdsTag()) return false;

  queueGtagCommand('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}` });
  return true;
};

/**
 * Erfolg "Antrag geöffnet": Klick auf den Abschluss- oder Rechnerlink eines
 * Versicherers (SDK über Level Nine, UKV, LKH, die Bayerische) auf
 * /ambulant, /stationaer und /zahn samt englischer Fassung. Bewusst ohne
 * Parameter: welcher Versicherer und welche Antworten, erfährt Google nie.
 */
export const trackGoogleAdsAntrag = () => {
  if (!isGoogleAdsAntragRoute()) return false;
  return emitGoogleAdsConversion(GOOGLE_ADS_ANTRAG_LABEL);
};

/** Alter Name, bleibt als Alias. */
export const trackGoogleAdsRechnerStart = trackGoogleAdsAntrag;

/**
 * Erfolg "Anfrage": abgeschicktes Kontaktformular, Klick auf die
 * Calendly-Buchung, Buchung über den Google Kalender. Sonst nichts.
 */
export const trackGoogleAdsLead = () => emitGoogleAdsConversion(GOOGLE_ADS_LEAD_LABEL);

const revokeGoogleAds = () => {
  if (!isBrowser()) return false;
  if (adConsentGranted || tagConfigured) {
    queueConsentDefault();
    queueGtagCommand('consent', 'update', AD_CONSENT_DENIED);
    adConsentGranted = false;
  }
  clearGoogleAdsCookies();
  return false;
};

export const syncGoogleAdsConsent = (state = getConsentState()) => {
  if (!isBrowser() || !isGoogleAdsConfigured()) return false;
  if (!hasConsent('marketing', state) || isGoogleAdsExcludedRoute()) return revokeGoogleAds();
  return loadGoogleAdsTag();
};

export const initializeGoogleAds = () => {
  if (!isBrowser() || !isGoogleAdsConfigured()) return () => {};

  googleAdsConsumerCount += 1;
  syncGoogleAdsConsent();

  if (!consentUnsubscribe) {
    consentUnsubscribe = subscribeConsent((state) => {
      syncGoogleAdsConsent(state);
    });
  }

  return () => {
    googleAdsConsumerCount = Math.max(0, googleAdsConsumerCount - 1);
    if (googleAdsConsumerCount === 0 && consentUnsubscribe) {
      consentUnsubscribe();
      consentUnsubscribe = null;
    }
  };
};
