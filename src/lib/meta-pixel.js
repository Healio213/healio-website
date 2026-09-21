import {
  getConsentState,
  hasConsent,
  subscribeConsent,
} from '@/lib/consent';
import { PRIVATE_FUNNEL_SOURCES } from '@/lib/analytics';

/**
 * Meta-Funnel-Messung (Pixel + Conversions API) fuer healio.de.
 *
 * Grundregeln, die dieses Modul technisch erzwingt:
 * 1. Ohne Zustimmung fuer den Zweck "marketing" wird kein Skript geladen,
 *    kein Ereignis gesendet und kein Cookie gesetzt.
 * 2. Ohne gesetzte Pixel-ID (VITE_META_PIXEL_ID) ist das Modul vollstaendig
 *    inaktiv. Es fliesst kein Werbeeuro, solange Frank nichts konfiguriert.
 * 3. Es werden ausschliesslich vier Ereignisnamen und ein einziger,
 *    wertbeschraenkter Parameter (content_name) uebertragen. Antworten aus
 *    Rechnern, Auswahlhilfen oder Formularen erreichen Meta nie.
 * 4. Jedes Ereignis erhaelt eine event_id und geht an Pixel UND CAPI, damit
 *    Meta beide Wege dedupliziert.
 */

const META_SCRIPT_URL = 'https://connect.facebook.net/en_US/fbevents.js';
const META_SCRIPT_SELECTOR = 'script[data-healio-meta="true"]';
const META_CAPI_ENDPOINT = '/api/meta-events';

// Whitelist der Ereignisse. "RechnerStart" ist ein Custom Event.
export const META_EVENTS = Object.freeze(['PageView', 'ViewContent', 'RechnerStart', 'Lead']);
const META_STANDARD_EVENTS = new Set(['PageView', 'ViewContent', 'Lead']);
const META_EVENT_SET = new Set(META_EVENTS);

// Einziger erlaubter Parameterschluessel. Er darf niemals auf den
// SENSITIVE_PARAM_KEY-Filter aus analytics.js passen.
export const META_ALLOWED_PARAM_KEYS = Object.freeze(new Set(['content_name']));
export const META_PAGE_KEYS = Object.freeze(new Set(['zahn', 'ambulant', 'partner', 'ratgeber']));

// Seitenschluessel fuer ViewContent. Alles andere bleibt ohne ViewContent.
const META_PAGE_KEY_BY_PATH = Object.freeze({
  '/zahn': 'zahn',
  '/en/dental': 'zahn',
  '/ambulant': 'ambulant',
  '/en/outpatient': 'ambulant',
  '/partner': 'partner',
  '/en/partner': 'partner',
  '/ratgeber': 'ratgeber',
});

// Der Ratgeber hat Unterseiten (Advertorials, spaeter organische Artikel).
// Sie alle zaehlen als ein einziger, neutraler Seitenschluessel. Der Slug
// selbst geht nie an Meta.
const META_PAGE_KEY_BY_PREFIX = Object.freeze({
  '/ratgeber/': 'ratgeber',
});

// Auf diesen Routen darf Meta niemals messen. /zahn und /ambulant sind
// bewusst NICHT gesperrt: dorthin soll geworben werden, es gehen aber nur
// Ereignisnamen und der Seitenschluessel raus, nie Antworten.
const META_EXCLUDED_PATHS = new Set(['/schwangerschaft']);

// RechnerStart gilt nur fuer die Rechner- und Auswahlhilfe-Einstiege.
const META_CALCULATOR_PATHS = new Set(['/ambulant', '/en/outpatient', '/zahn', '/en/dental']);

const META_QUERY_ALLOWLIST = /^(?:utm_[a-z_]{1,30}|fbclid)$/i;
const META_PIXEL_ID_PATTERN = /^\d{6,20}$/;
const META_COOKIE = /^_fb[pc]$/;
const META_FBP_PATTERN = /^fb\.[12]\.\d{1,20}\.[A-Za-z0-9_-]{1,64}$/;
const META_FBC_PATTERN = /^fb\.[12]\.\d{1,20}\.[A-Za-z0-9_-]{1,255}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Defensiv lesen: in Prerender-, Test- und CJS-Bundles kann import.meta.env
// fehlen. Ohne lesbare Pixel-ID bleibt der gesamte Meta-Pfad inaktiv.
const META_ENV = (typeof import.meta !== 'undefined' && import.meta.env) || {};
const rawPixelId = typeof META_ENV.VITE_META_PIXEL_ID === 'string'
  ? META_ENV.VITE_META_PIXEL_ID.trim()
  : '';

export const META_PIXEL_ID = META_PIXEL_ID_PATTERN.test(rawPixelId) ? rawPixelId : '';

let pixelLoaded = false;
let pixelActive = false;
let consentUnsubscribe = null;
let metaConsumerCount = 0;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/** Ohne Pixel-ID bleibt der gesamte Meta-Pfad tot. */
export const isMetaConfigured = () => META_PIXEL_ID !== '';

const normalizePath = (pathname) => (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';

export const isMetaExcludedRoute = (location = isBrowser() ? window.location : null) => {
  if (!location) return true;
  const pathname = normalizePath(location.pathname);
  if (META_EXCLUDED_PATHS.has(pathname)) return true;

  // Neutrale Kampagnencodes fuehren in private Gesundheitsstrecken. Auch
  // Meta darf dort nichts sehen, selbst wenn "marketing" erlaubt wurde.
  return new URLSearchParams(location.search || '')
    .getAll('src')
    .some((source) => PRIVATE_FUNNEL_SOURCES.has(source));
};

export const getMetaPageKey = (location = isBrowser() ? window.location : null) => {
  if (!location) return null;
  const pathname = normalizePath(location.pathname);
  const key = META_PAGE_KEY_BY_PATH[pathname]
    || Object.entries(META_PAGE_KEY_BY_PREFIX)
      .find(([prefix]) => pathname.startsWith(prefix))?.[1];
  return key && META_PAGE_KEYS.has(key) ? key : null;
};

export const isMetaCalculatorRoute = (location = isBrowser() ? window.location : null) => (
  Boolean(location) && META_CALCULATOR_PATHS.has(normalizePath(location.pathname))
);

/**
 * event_source_url ohne alles, was ein Antwort- oder Personenmerkmal sein
 * koennte. Es bleiben nur utm_* und fbclid uebrig, der Hash faellt weg.
 */
export const sanitizeMetaEventSourceUrl = (value) => {
  if (!isBrowser()) return null;

  try {
    const url = new URL(value || window.location.href, window.location.origin);
    if (url.origin !== window.location.origin) return null;

    const safeParams = new URLSearchParams();
    url.searchParams.forEach((paramValue, paramKey) => {
      if (META_QUERY_ALLOWLIST.test(paramKey)) safeParams.append(paramKey, paramValue);
    });

    const query = safeParams.toString();
    return `${url.origin}${url.pathname}${query ? `?${query}` : ''}`;
  } catch {
    return null;
  }
};

export const sanitizeMetaCustomData = (params = {}) => {
  if (!params || typeof params !== 'object' || Array.isArray(params)) return {};

  return Object.entries(params).reduce((safeParams, [key, value]) => {
    if (!META_ALLOWED_PARAM_KEYS.has(key)) return safeParams;
    if (key === 'content_name' && typeof value === 'string' && META_PAGE_KEYS.has(value)) {
      safeParams[key] = value;
    }
    return safeParams;
  }, {});
};

export const createMetaEventId = () => {
  try {
    if (isBrowser() && typeof window.crypto?.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
  } catch {
    // Fallback unten.
  }

  const random = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
  return `${random()}${random()}-${random()}-4${random().slice(1)}-a${random().slice(1)}-${random()}${random()}${random()}`;
};

const readCookie = (name) => {
  if (!isBrowser() || !document.cookie) return null;
  const match = document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
};

const clearMetaCookies = () => {
  if (!isBrowser() || !document.cookie) return;

  const hostname = window.location.hostname;
  const domains = hostname && hostname !== 'localhost'
    ? ['', `domain=${hostname};`, `domain=.${hostname};`]
    : [''];

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !META_COOKIE.test(name)) return;

    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; ${domain} SameSite=Lax`;
    });
  });
};

const safeMetaScriptUrl = () => {
  try {
    const url = new URL(META_SCRIPT_URL);
    if (url.protocol !== 'https:' || url.hostname !== 'connect.facebook.net') return null;
    if (url.pathname !== '/en_US/fbevents.js') return null;
    return url.toString();
  } catch {
    return null;
  }
};

const ensureFbqStub = () => {
  if (!isBrowser()) return null;
  if (typeof window.fbq === 'function') return window.fbq;

  const fbq = function queueFbqCommand() {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
    else fbq.queue.push(arguments);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = window._fbq || fbq;
  return fbq;
};

/**
 * Laedt fbevents.js. Strikt an Zustimmung und Konfiguration gebunden.
 */
const loadMetaPixel = () => {
  if (!isBrowser() || !isMetaConfigured() || !hasConsent('marketing')) return false;

  if (pixelLoaded) {
    // Nach einem Widerruf bleibt das Skript im Dokument. Erst eine erneute
    // Zustimmung schaltet die Messung wieder frei.
    if (!pixelActive && typeof window.fbq === 'function') {
      window.fbq('consent', 'grant');
      pixelActive = true;
    }
    return pixelActive;
  }

  const scriptUrl = safeMetaScriptUrl();
  if (!scriptUrl) return false;

  const fbq = ensureFbqStub();
  if (!fbq) return false;

  // Vor der Initialisierung: keine automatische Button- und Formularerfassung,
  // kein Automatic Advanced Matching. Wir senden nur eigene Ereignisse.
  fbq('consent', 'revoke');
  fbq('set', 'autoConfig', false, META_PIXEL_ID);
  fbq('init', META_PIXEL_ID);
  fbq('consent', 'grant');

  if (!document.querySelector(META_SCRIPT_SELECTOR)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    script.dataset.healioMeta = 'true';
    document.head.appendChild(script);
  }

  pixelLoaded = true;
  pixelActive = true;
  return true;
};

const revokeMetaPixel = () => {
  pixelActive = false;
  if (!isBrowser()) return false;
  if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
  clearMetaCookies();
  return false;
};

const sendMetaCapiEvent = (payload) => {
  if (!isBrowser() || !isMetaConfigured() || !hasConsent('marketing')) return false;

  const fbp = readCookie('_fbp');
  const fbc = readCookie('_fbc');
  const body = JSON.stringify({
    ...payload,
    ...(fbp && META_FBP_PATTERN.test(fbp) ? { fbp } : {}),
    ...(fbc && META_FBC_PATTERN.test(fbc) ? { fbc } : {}),
  });

  try {
    if (typeof navigator?.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(META_CAPI_ENDPOINT, blob)) return true;
    }
  } catch {
    // Fallback unten.
  }

  try {
    fetch(META_CAPI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    }).catch(() => {});
    return true;
  } catch {
    return false;
  }
};

/**
 * Einziger Ausgang fuer Meta-Ereignisse. Pixel und CAPI bekommen dieselbe
 * event_id, damit Meta dedupliziert.
 */
const emitMetaEvent = (eventName, params = {}) => {
  if (!isBrowser() || !isMetaConfigured()) return false;
  if (!META_EVENT_SET.has(eventName)) return false;
  if (!hasConsent('marketing')) return false;
  if (isMetaExcludedRoute()) return false;
  if (!loadMetaPixel()) return false;

  const eventId = createMetaEventId();
  if (!UUID_PATTERN.test(eventId)) return false;

  const eventSourceUrl = sanitizeMetaEventSourceUrl();
  if (!eventSourceUrl) return false;

  const customData = sanitizeMetaCustomData(params);
  const method = META_STANDARD_EVENTS.has(eventName) ? 'track' : 'trackCustom';

  window.fbq(method, eventName, customData, { eventID: eventId });

  sendMetaCapiEvent({
    event_name: eventName,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    ...(Object.keys(customData).length > 0 ? { custom_data: customData } : {}),
  });

  return true;
};

export const trackMetaPageView = () => emitMetaEvent('PageView');

export const trackMetaViewContent = () => {
  const pageKey = getMetaPageKey();
  if (!pageKey) return false;
  return emitMetaEvent('ViewContent', { content_name: pageKey });
};

/** Klick auf den primaeren Rechner-CTA auf /ambulant und /zahn. */
export const trackMetaRechnerStart = () => {
  if (!isMetaCalculatorRoute()) return false;
  return emitMetaEvent('RechnerStart');
};

/** Abgeschickte Anfrage: Kontaktformular, Terminlink, "Bonus sichern". */
export const trackMetaLead = () => emitMetaEvent('Lead');

export const syncMetaConsent = (state = getConsentState()) => {
  if (!isBrowser() || !isMetaConfigured()) return false;
  if (!hasConsent('marketing', state)) return revokeMetaPixel();
  return pixelLoaded ? (pixelActive = true) : true;
};

export const initializeMetaPixel = () => {
  if (!isBrowser() || !isMetaConfigured()) return () => {};

  metaConsumerCount += 1;
  syncMetaConsent();

  if (!consentUnsubscribe) {
    consentUnsubscribe = subscribeConsent((state) => {
      syncMetaConsent(state);
    });
  }

  return () => {
    metaConsumerCount = Math.max(0, metaConsumerCount - 1);
    if (metaConsumerCount === 0 && consentUnsubscribe) {
      consentUnsubscribe();
      consentUnsubscribe = null;
    }
  };
};
