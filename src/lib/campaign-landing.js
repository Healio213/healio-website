/**
 * Ablenkungsfreie Zielseiten fuer Meta-Anzeigen (19.10.2026).
 *
 * - /check/naturheilkunde und /check/schwangerschaft samt Dankeseiten laufen
 *   ohne Hauptmenue, nur mit Logo, Impressum und Datenschutz.
 * - /partner/leitfaden?kampagne=meta zeigt die bestehende Leitfaden-Strecke
 *   in derselben schlanken Huelle.
 * - Ein Lead zaehlt erst auf der Dankeseite und nur einmal je erfolgreich
 *   abgeschickter Anfrage. Ein direkter Aufruf der Dankeseite zaehlt nicht.
 */

export const CAMPAIGN_PARAM = 'kampagne';
export const CAMPAIGN_META = 'meta';

const LEITFADEN_CAMPAIGN_PATHS = new Set(['/partner/leitfaden', '/partner/leitfaden/danke']);
const CHECK_PREFIX = '/check/';
const PASS_THROUGH_PARAM = /^(?:utm_(?:source|medium|campaign|content|term)|fbclid)$/;
const PENDING_PREFIX = 'healio:check-lead:';

const normalizePath = (pathname) => (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';

export const isLeitfadenCampaign = (location) => {
  if (!location) return false;
  if (!LEITFADEN_CAMPAIGN_PATHS.has(normalizePath(location.pathname))) return false;
  return new URLSearchParams(location.search || '').get(CAMPAIGN_PARAM) === CAMPAIGN_META;
};

export const isCampaignLandingRoute = (location) => (
  Boolean(location)
  && (normalizePath(location.pathname).startsWith(CHECK_PREFIX) || isLeitfadenCampaign(location))
);

/**
 * Reicht nur Kampagnenmerkmale weiter (kampagne, utm_*, fbclid), nie
 * Formularinhalte. Ergebnis mit fuehrendem "?" oder leer.
 */
export const readCampaignSearch = (search) => {
  const params = new URLSearchParams(search || '');
  const kept = new URLSearchParams();
  params.forEach((value, key) => {
    if (key === CAMPAIGN_PARAM && value === CAMPAIGN_META) kept.set(key, value);
    else if (PASS_THROUGH_PARAM.test(key) && value) kept.set(key, value.slice(0, 200));
  });
  const query = kept.toString();
  return query ? `?${query}` : '';
};

/** Kampagnenmerkmale als Textzeilen fuer die Anfrage-Mail an Healio. */
/** Nur die utm-Werte als Objekt, ohne Klick-Kennungen wie fbclid. */
export const readCampaignUtm = (search) => {
  const params = new URLSearchParams(readCampaignSearch(search));
  const utm = {};
  params.forEach((value, key) => {
    if (key.startsWith('utm_')) utm[key] = value;
  });
  return Object.keys(utm).length > 0 ? utm : null;
};

export const describeCampaignSource = (search) => {
  const params = new URLSearchParams(readCampaignSearch(search));
  const lines = [];
  params.forEach((value, key) => {
    if (key.startsWith('utm_')) lines.push(`${key}: ${value}`);
  });
  return lines.length > 0 ? lines.join('\n') : 'keine Kampagnenmerkmale';
};

export const markCheckLeadPending = (key) => {
  try { window.sessionStorage.setItem(`${PENDING_PREFIX}${key}`, String(Date.now())); } catch { /* Ohne Speicher zaehlt die Dankeseite nicht. */ }
};

/** Liefert true genau einmal je abgeschickter Anfrage. */
export const consumeCheckLeadPending = (key) => {
  try {
    const storageKey = `${PENDING_PREFIX}${key}`;
    const startedAt = Number(window.sessionStorage.getItem(storageKey));
    window.sessionStorage.removeItem(storageKey);
    // Nur frische Anfragen (30 Minuten), damit ein spaeter Tab-Wechsel nicht doppelt zaehlt.
    return Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 30 * 60 * 1000;
  } catch {
    return false;
  }
};
