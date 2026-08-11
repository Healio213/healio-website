import { trackEvent } from '@/lib/analytics';

// Persönliche Abschluss-Links (Vermittler-Zuordnung über MAK-Nummer in der URL).
// Die URL-Parameter werden statisch validiert. Seitenparameter, Referrer-Codes oder
// Zahn-Check-Antworten werden nie an diese Links angehängt.
const BAYERISCHE_RAW_URL = 'https://www.diebayerische.de/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen?m=002637&um=MAK226487';
const UKV_RAW_URL = 'https://insurances-online.levelnine.biz/?mandant=vmk&tarifftypes=Zahn&agentId1=180188803&agentId2=226487&insurers=37&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJVS1YiLCJsYXN0TmFtZSI6IlVuaW9uIEtyYW5rZW52ZXJzaWNoZXJ1bmcgQUciLCJjb21wYW55IjoiIiwic3RyZWV0IjoiUGV0ZXItWmltbWVyLVN0ci4gMiIsInppcGNvZGUiOiI2NjEyMyIsImNpdHkiOiJTYWFyYnL8Y2tlbiIsIm1vYmlsZSI6IiIsImVtYWlsIjoia3JhbmtlbkBmb25kc2ZpbmFuei5kZSJ9&remarks=IiI=&defaultContact=false';

const PROVIDER_RULES = Object.freeze({
  bayerische: Object.freeze({
    hostname: 'www.diebayerische.de',
    pathname: '/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen',
    allowedSearchParams: Object.freeze(['m', 'um']),
    requiredSearchParams: Object.freeze({ m: '002637', um: 'MAK226487' }),
  }),
  ukv: Object.freeze({
    hostname: 'insurances-online.levelnine.biz',
    pathname: '/',
    allowedSearchParams: Object.freeze([
      'mandant',
      'tarifftypes',
      'agentId1',
      'agentId2',
      'insurers',
      'tariffs',
      'customValues',
      'contactInformation',
      'remarks',
      'defaultContact',
    ]),
    requiredSearchParams: Object.freeze({
      mandant: 'vmk',
      tarifftypes: 'Zahn',
      agentId1: '180188803',
      agentId2: '226487',
      insurers: '37',
      defaultContact: 'false',
    }),
  }),
});

export const sanitizeProviderUrl = (rawUrl, rules) => {
  try {
    if (typeof rawUrl !== 'string' || rawUrl.length > 8_000) return null;
    if (!rules || typeof rules !== 'object') return null;

    const url = new URL(rawUrl);
    if (url.protocol !== 'https:' || url.hostname !== rules.hostname || url.pathname !== rules.pathname) return null;
    if (url.port || url.username || url.password || url.hash) return null;

    const allowedParams = new Set(rules.allowedSearchParams || []);
    const seenParams = new Set();

    for (const [key, value] of url.searchParams.entries()) {
      if (!allowedParams.has(key) || seenParams.has(key)) return null;
      if (value.length > 2_048 || /[\u0000-\u001F\u007F]/.test(value)) return null;
      seenParams.add(key);
    }

    for (const [key, expectedValue] of Object.entries(rules.requiredSearchParams || {})) {
      if (url.searchParams.get(key) !== expectedValue) return null;
    }

    return url.toString();
  } catch {
    return null;
  }
};

const requireSafeProviderUrl = (rawUrl, rules, provider) => {
  const safeUrl = sanitizeProviderUrl(rawUrl, rules);
  if (!safeUrl) throw new Error(`Ungültige statische Abschluss-URL für ${provider}`);
  return safeUrl;
};

// UKV-URL wie von der UKV geliefert, nur tarifftypes bewusst auf "Zahn" gefiltert
// (verifiziert 15.07.2026: Strecke zeigt dann nur ZahnPRIVAT 75/90/100, Zuordnung
// über agentId2=226487 bleibt unverändert). URL-Parameter niemals manuell ändern.
export const BAYERISCHE_URL = requireSafeProviderUrl(BAYERISCHE_RAW_URL, PROVIDER_RULES.bayerische, 'die Bayerische');
export const UKV_URL = requireSafeProviderUrl(UKV_RAW_URL, PROVIDER_RULES.ukv, 'UKV');

// Vorbereitet, aktuell BEWUSST NICHT verlinkt (Franks Ansage 02.08.2026:
// Fremdanbieter noch nicht öffentlich benennen, Strecke bleibt Bayerische/UKV).
export const ERGO_URL = 'https://www.ergo.de/de/Produkte/Zahnzusatzversicherung/Zahnzusatzversicherung-ohne-Wartezeit';
export const DADIREKT_URL = 'https://www.da-direkt.de/zahnzusatzversicherung-sofort';

const SAFE_INSURER_DESTINATIONS = new Set([
  'bayerische_zahn_sofort',
  'ukv_zahnprivat',
]);

// Ausschließlich neutrale Versicherer-Klicks außerhalb des Zahn-Checks.
// Der Zahn-Check selbst importiert oder verwendet diese Funktion bewusst nicht.
export const trackZahnEvent = (action, destination) => {
  if (action !== 'zahnzusatz_versicherer_click') return false;
  if (!SAFE_INSURER_DESTINATIONS.has(destination)) return false;

  return trackEvent('zahnzusatz_versicherer_click', {
    component: 'dental_insurer_choice',
    destination,
  });
};
