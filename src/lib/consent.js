export const CONSENT_VERSION = 2;
export const CONSENT_STORAGE_KEY = 'healio:consent:v2';
export const CONSENT_CHANGE_EVENT = 'healio:consent-change';
export const CONSENT_SETTINGS_EVENT = 'healio:consent-settings';

export const CONSENT_PURPOSES = Object.freeze([
  'analytics',
  'calendly',
  'maps',
  'openai',
]);

const PURPOSE_SET = new Set(CONSENT_PURPOSES);
const SOURCE_SET = new Set(['banner', 'settings', 'provider', 'external', 'unknown']);
const EMPTY_PREFERENCES = Object.freeze({
  analytics: false,
  calendly: false,
  maps: false,
  openai: false,
});

let volatileConsentState = null;

const isBrowser = () => typeof window !== 'undefined';

const clonePreferences = (preferences = {}) => Object.freeze(
  CONSENT_PURPOSES.reduce((result, purpose) => {
    result[purpose] = preferences[purpose] === true;
    return result;
  }, {}),
);

const normalizeSource = (source) => SOURCE_SET.has(source) ? source : 'unknown';

const normalizeUpdatedAt = (value) => {
  if (typeof value !== 'string') return new Date().toISOString();
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : new Date().toISOString();
};

const createState = ({ preferences, source, updatedAt, decided }) => Object.freeze({
  version: CONSENT_VERSION,
  decided: decided === true,
  necessary: true,
  preferences: clonePreferences(preferences),
  source: normalizeSource(source),
  updatedAt: decided === true ? normalizeUpdatedAt(updatedAt) : null,
});

export const getDefaultConsentState = () => createState({
  preferences: EMPTY_PREFERENCES,
  source: 'unknown',
  updatedAt: null,
  decided: false,
});

export const parseConsentState = (value) => {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (!parsed || parsed.version !== CONSENT_VERSION || parsed.decided !== true) return null;
    if (!parsed.preferences || typeof parsed.preferences !== 'object') return null;

    return createState({
      preferences: parsed.preferences,
      source: parsed.source,
      updatedAt: parsed.updatedAt,
      decided: true,
    });
  } catch {
    return null;
  }
};

export const getStoredConsentState = () => {
  if (!isBrowser()) return volatileConsentState;

  try {
    const stored = parseConsentState(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (stored) {
      volatileConsentState = stored;
      return stored;
    }
  } catch {
    // Local storage can be unavailable in strict privacy modes.
  }

  return volatileConsentState;
};

export const getConsentState = () => getStoredConsentState() || getDefaultConsentState();

export const hasConsent = (purpose, state = getConsentState()) => (
  PURPOSE_SET.has(purpose) && state?.decided === true && state.preferences?.[purpose] === true
);

const dispatchConsentChange = (state) => {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: state }));
};

export const saveConsentPreferences = (preferences, source = 'settings') => {
  const state = createState({
    preferences,
    source,
    updatedAt: new Date().toISOString(),
    decided: true,
  });

  volatileConsentState = state;

  if (isBrowser()) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Keep the in-memory decision for this page view when storage is blocked.
    }
  }

  dispatchConsentChange(state);
  return state;
};

export const allowAllConsent = (source = 'banner') => saveConsentPreferences(
  CONSENT_PURPOSES.reduce((preferences, purpose) => {
    preferences[purpose] = true;
    return preferences;
  }, {}),
  source,
);

export const allowNecessaryConsent = (source = 'banner') => saveConsentPreferences(
  EMPTY_PREFERENCES,
  source,
);

export const updateConsentPurpose = (purpose, allowed, source = 'provider') => {
  if (!PURPOSE_SET.has(purpose)) return getConsentState();
  const current = getConsentState();

  return saveConsentPreferences({
    ...current.preferences,
    [purpose]: allowed === true,
  }, source);
};

export const clearConsentDecision = () => {
  volatileConsentState = null;

  if (isBrowser()) {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // Nothing else to clear when storage is unavailable.
    }
  }

  const state = getDefaultConsentState();
  dispatchConsentChange(state);
  return state;
};

export const openConsentSettings = (purpose = null) => {
  if (!isBrowser()) return false;
  const safePurpose = PURPOSE_SET.has(purpose) ? purpose : null;
  window.dispatchEvent(new CustomEvent(CONSENT_SETTINGS_EVENT, {
    detail: Object.freeze({ purpose: safePurpose }),
  }));
  return true;
};

export const subscribeConsent = (listener) => {
  if (!isBrowser() || typeof listener !== 'function') return () => {};

  const handleConsentChange = (event) => {
    listener(parseConsentState(event.detail) || getConsentState());
  };

  const handleStorage = (event) => {
    if (event.key !== CONSENT_STORAGE_KEY) return;
    volatileConsentState = parseConsentState(event.newValue);
    listener(volatileConsentState || getDefaultConsentState());
  };

  window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    window.removeEventListener('storage', handleStorage);
  };
};
