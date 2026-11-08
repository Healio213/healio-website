/**
 * Empfehlungs- und Partnercode aus Links wie
 * healio.de/schwangerschaft?ref=elterngeld-navigator oder ?ref=HP-praxis-name.
 *
 * Seit 08.11.2026 lebt der Code nur im Arbeitsspeicher der geöffneten Seite
 * (Gate 3, Option ii in GKV-Vergleichskampagne/STUFE0-SPEC-2026-09-03.md).
 * Kein sessionStorage, kein Cookie, nichts auf dem Gerät: damit entfällt die
 * Speicherung im Sinne von § 25 TDDDG. Schließen oder Neuladen ohne ?ref=
 * setzt ihn zurück.
 *
 * Damit der Code Seitenwechsel mit vollem Neuladen, neue Tabs und den Weg über
 * kassenboost.de übersteht, hängt attachReferrerToLink ihn beim Klick an Links
 * auf healio.de und kassenboost.de als ?ref= an. kassenboost.de reicht ihn auf
 * seinen Links zurück zu healio.de weiter.
 */
const REFERRER_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
const LEGACY_STORAGE_KEY = 'healio_ref';
const KASSENBOOST_HOSTS = new Set(['kassenboost.de', 'www.kassenboost.de']);
// Dateien und Schnittstellen bekommen keinen Code angehängt.
const FILE_PATH = /\.[a-z0-9]{2,5}$/i;
const SKIPPED_PATH_PREFIXES = ['/api/', '/downloads/'];

let currentReferrer = null;

export function sanitizeReferrer(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return REFERRER_PATTERN.test(trimmed) ? trimmed : null;
}

export function readStoredReferrer() {
  return currentReferrer;
}

export function storeReferrer(value) {
  const sanitized = sanitizeReferrer(value);
  if (!sanitized) return null;
  currentReferrer = sanitized;
  return sanitized;
}

export function readReferrerFromSearch(search) {
  try {
    return sanitizeReferrer(new URLSearchParams(typeof search === 'string' ? search : '').get('ref'));
  } catch {
    return null;
  }
}

// Bis 08.11.2026 stand der Code im sessionStorage. Ein Rest aus einem noch
// offenen Tab wird nicht gelesen, nur entfernt.
export function clearLegacyReferrerStorage() {
  try {
    window.sessionStorage?.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // sessionStorage ist nicht in jedem Browser-Kontext verfügbar.
  }
}

/**
 * Gibt das Linkziel mit angehängtem ?ref= zurück oder null, wenn der Link
 * unverändert bleiben soll. Erfasst werden nur https-Links auf kassenboost.de
 * und Links auf eine andere Seite derselben Domain. Sprungmarken auf derselben
 * Seite, Dateien, Schnittstellen und Links mit eigenem ref bleiben, wie sie sind.
 */
export function withReferrer(href, baseHref, referrer = currentReferrer) {
  const code = sanitizeReferrer(referrer);
  if (!code || typeof href !== 'string' || typeof baseHref !== 'string') return null;

  let url;
  let base;
  try {
    base = new URL(baseHref);
    url = new URL(href, base);
  } catch {
    return null;
  }

  const isKassenboost = url.protocol === 'https:' && KASSENBOOST_HOSTS.has(url.hostname);
  const isSameOrigin = url.origin === base.origin;
  if (!isKassenboost && !isSameOrigin) return null;
  if (url.searchParams.has('ref')) return null;

  if (isSameOrigin) {
    if (url.pathname === base.pathname) return null;
    if (FILE_PATH.test(url.pathname)) return null;
    if (SKIPPED_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return null;
  }

  url.searchParams.set('ref', code);
  return url.toString();
}

export function attachReferrerToLink(anchor, baseHref) {
  if (!anchor || typeof anchor.getAttribute !== 'function') return false;
  if (anchor.hasAttribute('download')) return false;
  const next = withReferrer(anchor.getAttribute('href'), baseHref);
  if (!next) return false;
  anchor.setAttribute('href', next);
  return true;
}
