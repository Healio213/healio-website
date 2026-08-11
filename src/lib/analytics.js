import {
  getConsentState,
  hasConsent,
  subscribeConsent,
} from '@/lib/consent';

export const GA4_MEASUREMENT_ID = 'G-VSN76YW5SC';

const GA4_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
const GA4_DISABLE_KEY = `ga-disable-${GA4_MEASUREMENT_ID}`;
const GA4_SCRIPT_SELECTOR = 'script[data-healio-ga4="true"]';
const ANALYTICS_EXCLUDED_PATHS = new Set(['/zahn', '/en/dental']);
const SAFE_EVENT_NAME = /^[a-z][a-z0-9_]{0,39}$/;
const SAFE_PARAM_KEY = /^[a-z][a-z0-9_]{0,39}$/;
const SAFE_TOKEN_VALUE = /^[a-z0-9][a-z0-9._-]{0,63}$/i;
const SENSITIVE_PATH_VALUE = /@|(?:\d[ ._+-]?){7,}|^[a-f0-9]{24,}$/i;
const SAFE_ANALYTICS_PARAM_KEYS = new Set([
  'action',
  'component',
  'currency',
  'destination',
  'interaction_type',
  'item_count',
  'link_domain',
  'link_type',
  'placement',
  'value',
]);
const SENSITIVE_PARAM_KEY = /(answer|condition|diagnos|email|health|history|message|name|phone|query|result|search|tooth|user)/i;
const ANALYTICS_COOKIE = /^_(?:ga|gid|gat|gac_)/;

const CONSENT_DENIED = Object.freeze({
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500,
});

const CONSENT_GRANTED = Object.freeze({
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: 'granted',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
});

let consentDefaultQueued = false;
let gaConfigured = false;
let gaLoadPromise = null;
let consentUnsubscribe = null;
let analyticsConsumerCount = 0;
let analyticsRouteBlocked = false;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';
const isAnalyticsExcludedRoute = () => (
  isBrowser() && ANALYTICS_EXCLUDED_PATHS.has(window.location.pathname)
);
const isAnalyticsBlocked = () => analyticsRouteBlocked || isAnalyticsExcludedRoute();

const ensureDataLayer = () => {
  if (!isBrowser()) return null;
  window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  return window.dataLayer;
};

function queueGtagCommand() {
  const dataLayer = ensureDataLayer();
  if (dataLayer) dataLayer.push(arguments);
}

const queueConsentDefault = () => {
  if (!isBrowser() || consentDefaultQueued) return;
  queueGtagCommand('consent', 'default', CONSENT_DENIED);
  consentDefaultQueued = true;
};

const clearAnalyticsCookies = () => {
  if (!isBrowser() || !document.cookie) return;

  const hostname = window.location.hostname;
  const domains = hostname && hostname !== 'localhost'
    ? ['', `domain=${hostname};`, `domain=.${hostname};`]
    : [''];

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !ANALYTICS_COOKIE.test(name)) return;

    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; ${domain} SameSite=Lax`;
    });
  });
};

const safeGa4ScriptUrl = () => {
  try {
    const url = new URL(GA4_SCRIPT_URL);
    if (url.protocol !== 'https:' || url.hostname !== 'www.googletagmanager.com') return null;
    if (url.pathname !== '/gtag/js' || url.searchParams.get('id') !== GA4_MEASUREMENT_ID) return null;
    return url.toString();
  } catch {
    return null;
  }
};

const decodePathSegment = (segment) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return '';
  }
};

export const sanitizePagePath = (value) => {
  if (!isBrowser()) return '/';

  try {
    const url = new URL(value || window.location.href, window.location.origin);
    if (url.origin !== window.location.origin) return '/';

    const safeSegments = url.pathname
      .split('/')
      .filter(Boolean)
      .map(decodePathSegment)
      .map((segment) => (
        SAFE_TOKEN_VALUE.test(segment) && !SENSITIVE_PATH_VALUE.test(segment)
          ? segment
          : 'redacted'
      ));

    return `/${safeSegments.map(encodeURIComponent).join('/')}`;
  } catch {
    return '/';
  }
};

export const sanitizePageUrl = (value) => {
  if (!isBrowser()) return null;
  return `${window.location.origin}${sanitizePagePath(value)}`;
};

export const sanitizeEventName = (value) => {
  if (typeof value !== 'string') return null;
  const eventName = value.trim().toLowerCase();
  return SAFE_EVENT_NAME.test(eventName) ? eventName : null;
};

const sanitizeParamValue = (key, value) => {
  if (key === 'currency') {
    return typeof value === 'string' && /^[A-Z]{3}$/.test(value) ? value : null;
  }

  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return Number.isFinite(value) && Math.abs(value) <= 1_000_000_000 ? value : null;
  if (typeof value !== 'string') return null;

  const token = value.trim();
  return SAFE_TOKEN_VALUE.test(token) ? token.toLowerCase() : null;
};

export const sanitizeAnalyticsParams = (params = {}) => {
  if (!params || typeof params !== 'object' || Array.isArray(params)) return {};

  return Object.entries(params).reduce((safeParams, [key, value]) => {
    if (!SAFE_PARAM_KEY.test(key) || SENSITIVE_PARAM_KEY.test(key)) return safeParams;
    if (!SAFE_ANALYTICS_PARAM_KEYS.has(key)) return safeParams;

    const safeValue = sanitizeParamValue(key, value);
    if (safeValue !== null) safeParams[key] = safeValue;
    return safeParams;
  }, {});
};

const getSafePageContext = (pageUrl) => ({
  page_location: sanitizePageUrl(pageUrl),
  page_path: sanitizePagePath(pageUrl),
  page_referrer: '',
});

export const loadGoogleAnalytics = () => {
  if (!isBrowser() || isAnalyticsBlocked() || !hasConsent('analytics')) return Promise.resolve(false);
  if (gaLoadPromise) return gaLoadPromise;

  const scriptUrl = safeGa4ScriptUrl();
  if (!scriptUrl) return Promise.reject(new Error('Ungültige GA4-Script-URL'));

  const existingScript = document.querySelector(GA4_SCRIPT_SELECTOR);
  if (existingScript?.dataset.loaded === 'true') return Promise.resolve(true);

  gaLoadPromise = new Promise((resolve, reject) => {
    const script = existingScript || document.createElement('script');

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      resolve(true);
    };

    const handleError = () => {
      gaLoadPromise = null;
      script.remove();
      reject(new Error('Google Analytics konnte nicht geladen werden'));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      script.async = true;
      script.src = scriptUrl;
      script.dataset.healioGa4 = 'true';
      document.head.appendChild(script);
    }
  });

  return gaLoadPromise;
};

const grantAnalyticsConsent = () => {
  queueConsentDefault();
  if (!isBrowser() || isAnalyticsBlocked()) return denyAnalyticsConsent();

  queueGtagCommand('consent', 'update', CONSENT_GRANTED);

  if (!gaConfigured) {
    queueGtagCommand('js', new Date());
    queueGtagCommand('config', GA4_MEASUREMENT_ID, {
      ...getSafePageContext(),
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      send_page_view: false,
    });
    gaConfigured = true;
  }

  return loadGoogleAnalytics();
};

const denyAnalyticsConsent = () => {
  queueConsentDefault();
  if (isBrowser()) queueGtagCommand('consent', 'update', CONSENT_DENIED);
  clearAnalyticsCookies();
  return Promise.resolve(false);
};

export const setAnalyticsRouteBlocked = (blocked) => {
  analyticsRouteBlocked = blocked === true;
  if (!isBrowser()) return Promise.resolve(false);
  window[GA4_DISABLE_KEY] = analyticsRouteBlocked || isAnalyticsExcludedRoute();
  return analyticsRouteBlocked ? denyAnalyticsConsent() : syncAnalyticsConsent();
};

export const syncAnalyticsConsent = (state = getConsentState()) => (
  !isAnalyticsBlocked() && hasConsent('analytics', state) ? grantAnalyticsConsent() : denyAnalyticsConsent()
);

export const initializeAnalytics = () => {
  if (!isBrowser()) return () => {};

  analyticsConsumerCount += 1;
  window[GA4_DISABLE_KEY] = isAnalyticsBlocked();
  queueConsentDefault();
  syncAnalyticsConsent().catch(() => {});

  if (!consentUnsubscribe) {
    consentUnsubscribe = subscribeConsent((state) => {
      syncAnalyticsConsent(state).catch(() => {});
    });
  }

  return () => {
    analyticsConsumerCount = Math.max(0, analyticsConsumerCount - 1);
    if (analyticsConsumerCount === 0 && consentUnsubscribe) {
      consentUnsubscribe();
      consentUnsubscribe = null;
    }
  };
};

export const trackPageView = (pageUrl) => {
  if (!isBrowser() || isAnalyticsBlocked() || !hasConsent('analytics')) return false;

  loadGoogleAnalytics().catch(() => {});
  queueGtagCommand('event', 'page_view', getSafePageContext(pageUrl));
  return true;
};

export const trackEvent = (eventName, params = {}) => {
  if (!isBrowser() || isAnalyticsBlocked() || !hasConsent('analytics')) return false;

  const safeEventName = sanitizeEventName(eventName);
  if (!safeEventName) return false;

  loadGoogleAnalytics().catch(() => {});
  queueGtagCommand('event', safeEventName, {
    ...sanitizeAnalyticsParams(params),
    ...getSafePageContext(),
  });
  return true;
};
