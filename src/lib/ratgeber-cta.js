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

export const buildInternalRatgeberUrl = (targetPath, search = '') => {
  if (typeof targetPath !== 'string' || !targetPath.startsWith('/')) {
    throw new TypeError('Das interne Ziel muss ein Pfad auf healio.de sein.');
  }

  const incoming = new URLSearchParams(typeof search === 'string' ? search : '');
  const params = new URLSearchParams();

  RATGEBER_UTM_KEYS.forEach((key) => {
    const candidate = incoming.get(key);
    const value = typeof candidate === 'string' && SAFE_UTM_VALUE.test(candidate)
      ? candidate
      : RATGEBER_INTERNAL_UTM_DEFAULTS[key];

    if (value) params.set(key, value);
  });

  const query = params.toString();
  return query ? `${targetPath}?${query}` : targetPath;
};
