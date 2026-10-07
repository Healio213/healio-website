/**
 * Ziel des Buttons "Jetzt Kasse pruefen" im Ratgeber.
 *
 * Vorbild ist die Konstante KASSENBOOST_URL in src/pages/KassenbonusPage.jsx.
 * Unterschied: Der Ratgeber reicht die UTM-Parameter der aufrufenden Adresse
 * durch, damit eine Meta-Anzeige bis zum Check nachvollziehbar bleibt. Fehlt
 * ein Wert, greift der Standard. Der Anker #vergleich bleibt immer erhalten.
 */

export const KASSENBOOST_BASE_URL = 'https://kassenboost.de/';
export const KASSENBOOST_ANCHOR = '#vergleich';

export const RATGEBER_UTM_KEYS = Object.freeze([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
]);

// utm_content hat bewusst keinen Standard: die Anzeigenvariante steht nur
// dann in der Adresse, wenn sie auch wirklich mitgeliefert wurde.
export const RATGEBER_UTM_DEFAULTS = Object.freeze({
  utm_source: 'healio',
  utm_medium: 'advertorial',
  utm_campaign: 'kassenboost-advertorial-1',
});

// Nur harmlose Kampagnenkennungen durchreichen. Alles andere faellt auf den
// Standard zurueck, damit ueber die UTM-Kette nichts Fremdes weiterwandert.
const SAFE_UTM_VALUE = /^[A-Za-z0-9._-]{1,64}$/;

export const buildKassenboostUrl = (search = '') => {
  const incoming = new URLSearchParams(typeof search === 'string' ? search : '');
  const url = new URL(KASSENBOOST_BASE_URL);

  RATGEBER_UTM_KEYS.forEach((key) => {
    const candidate = incoming.get(key);
    const value = typeof candidate === 'string' && SAFE_UTM_VALUE.test(candidate)
      ? candidate
      : RATGEBER_UTM_DEFAULTS[key];

    if (value) url.searchParams.set(key, value);
  });

  return `${url.toString()}${KASSENBOOST_ANCHOR}`;
};

export default buildKassenboostUrl;

/**
 * Ziel eines internen Ratgeber-Buttons, zum Beispiel "Bonus und Beitrag
 * pruefen" auf der IKK-Bonus-Landingpage.
 *
 * Gleiche Mechanik wie buildKassenboostUrl, nur bleibt das Ziel auf
 * healio.de: Die UTM-Parameter der aufrufenden Adresse werden durchgereicht,
 * damit eine Google-Anzeige bis zur Tarifseite nachvollziehbar bleibt. Fehlt
 * ein Wert, greift der Standard. utm_content wird nie erfunden.
 */
export const RATGEBER_INTERNAL_UTM_DEFAULTS = Object.freeze({
  utm_source: 'healio',
  utm_medium: 'ratgeber',
  utm_campaign: 'ikk-bonus-landingpage',
});

// Neben den UTM-Parametern wandern nur diese Kennungen mit, und nur, wenn sie
// in der aufrufenden Adresse stehen: der Empfehlungscode (ref, wie in
// src/lib/referrer.js) und die Google-Klick-Kennungen. So bleibt der Code auch
// erhalten, wenn jemand den Button in einem neuen Tab öffnet (sessionStorage
// wird dort nicht mitgenommen), und die Klick-Kennung steht noch in der
// Adresse, falls die Zustimmung erst auf der Zielseite kommt. Gespeichert wird
// dabei nichts, gelesen wird die Klick-Kennung weiter nur mit Zustimmung
// (readGoogleClickId in src/lib/google-ads.js).
const RATGEBER_PASS_THROUGH = Object.freeze({
  ref: /^[A-Za-z0-9_-]{1,64}$/,
  gclid: /^[A-Za-z0-9_-]{10,200}$/,
  gbraid: /^[A-Za-z0-9_-]{10,200}$/,
  wbraid: /^[A-Za-z0-9_-]{10,200}$/,
});

// defaults: Standardwerte je Artikel. Ohne Angabe gelten die Werte der
// IKK-Bonus-Landingpage; andere Artikel setzen ihre eigene utm_campaign
// (internalCta.utmCampaign), damit organische Leser nicht in der falschen
// Kampagne landen.
export const buildInternalRatgeberUrl = (targetPath, search = '', defaults = RATGEBER_INTERNAL_UTM_DEFAULTS) => {
  if (typeof targetPath !== 'string' || !targetPath.startsWith('/')) {
    throw new TypeError('Das interne Ziel muss ein Pfad auf healio.de sein.');
  }

  // Ein Anker im Ziel (zum Beispiel /zahn#zahn-check) bleibt erhalten und
  // steht immer HINTER der Query. Steht er davor, landen die Parameter im
  // Anker und gehen verloren: der Browser liest alles nach # nicht als Query.
  const hashIndex = targetPath.indexOf('#');
  const hash = hashIndex === -1 || hashIndex === targetPath.length - 1
    ? ''
    : targetPath.slice(hashIndex);
  const pathAndQuery = hashIndex === -1 ? targetPath : targetPath.slice(0, hashIndex);
  const queryIndex = pathAndQuery.indexOf('?');
  const basePath = queryIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, queryIndex);
  const ownQuery = queryIndex === -1 ? '' : pathAndQuery.slice(queryIndex + 1);

  const incoming = new URLSearchParams(typeof search === 'string' ? search : '');
  const params = new URLSearchParams(ownQuery);

  RATGEBER_UTM_KEYS.forEach((key) => {
    const candidate = incoming.get(key);
    const value = typeof candidate === 'string' && SAFE_UTM_VALUE.test(candidate)
      ? candidate
      : defaults[key];

    if (value) params.set(key, value);
  });

  Object.entries(RATGEBER_PASS_THROUGH).forEach(([key, pattern]) => {
    const candidate = incoming.get(key);
    if (typeof candidate === 'string' && pattern.test(candidate)) params.set(key, candidate);
  });

  const query = params.toString();
  return `${basePath}${query ? `?${query}` : ''}${hash}`;
};

/**
 * Weg-Links im Ratgeber (Kurzantwort und Weg-Karten) auf eine Produktseite.
 *
 * Kommt jemand über eine Google-Anzeige auf einen Ratgeber, steht die
 * Klick-Kennung in der Adresse. Auf gesperrten Seiten (GOOGLE_ADS_EXCLUDED_PATHS,
 * etwa Schwangerschaft, Baby, Vorsorge) lädt kein Google-Ads-Tag, die Kennung
 * würde beim Weiterklicken also verloren gehen. Wie auf /schwangerschaft
 * (getPregnancyOnwardPath in src/lib/pregnancyBonus.js) wandert deshalb nur
 * eine gültige Klick-Kennung mit, sonst nichts: keine UTM-Parameter, keine
 * Eingaben. Die Produktseite liest sie nur mit Zustimmung (readGoogleClickId).
 * Ein Anker im Ziel bleibt hinter der Query stehen.
 */
const AD_CLICK_ID_KEYS = Object.freeze(['gclid', 'gbraid', 'wbraid']);
const AD_CLICK_ID_PATTERN = /^[A-Za-z0-9_-]{10,200}$/;

export const withAdClickIds = (targetPath, search = '') => {
  if (typeof targetPath !== 'string' || !targetPath.startsWith('/')) return targetPath;
  const incoming = new URLSearchParams(typeof search === 'string' ? search : '');
  const clickIds = AD_CLICK_ID_KEYS
    .map((key) => [key, incoming.get(key) || ''])
    .filter(([, value]) => AD_CLICK_ID_PATTERN.test(value));
  if (clickIds.length === 0) return targetPath;

  const hashIndex = targetPath.indexOf('#');
  const hash = hashIndex === -1 ? '' : targetPath.slice(hashIndex);
  const pathAndQuery = hashIndex === -1 ? targetPath : targetPath.slice(0, hashIndex);
  const queryIndex = pathAndQuery.indexOf('?');
  const basePath = queryIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, queryIndex);
  const params = new URLSearchParams(queryIndex === -1 ? '' : pathAndQuery.slice(queryIndex + 1));
  clickIds.forEach(([key, value]) => params.set(key, value));
  return `${basePath}?${params.toString()}${hash}`;
};
