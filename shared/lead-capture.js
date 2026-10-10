// Gemeinsame Prüfung für Browser und Server. Hier stehen ausschließlich die
// öffentlichen, bereits verwendeten Vermittler-URLs, keine Zugangsdaten.
const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/;

export const isValidLeadEmail = (value) => (
  typeof value === 'string' && value.trim().length <= 254 && EMAIL_PATTERN.test(value.trim())
);

const LEVEL_NINE_HOST = 'insurances-online.levelnine.biz';
const LEVEL_NINE_PARAMS = new Set([
  'mandant', 'tarifftypes', 'agentId1', 'agentId2', 'insurers', 'tariffs',
  'customValues', 'contactInformation', 'remarks', 'defaultContact', 'employeeInsurance',
]);

const SDK_CONTACT = 'eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDQwODk3NTU3MDUiLCJlbWFpbCI6ImluZm9AaGVhbGlvLmRlIn0=';
const UKV_CONTACT = 'eyJmaXJzdE5hbWUiOiJVS1YiLCJsYXN0TmFtZSI6IlVuaW9uIEtyYW5rZW52ZXJzaWNoZXJ1bmcgQUciLCJjb21wYW55IjoiIiwic3RyZWV0IjoiUGV0ZXItWmltbWVyLVN0ci4gMiIsInppcGNvZGUiOiI2NjEyMyIsImNpdHkiOiJTYWFyYnL8Y2tlbiIsIm1vYmlsZSI6IiIsImVtYWlsIjoia3JhbmtlbkBmb25kc2ZpbmFuei5kZSJ9';

const hasOnlyParams = (url, allowed, required) => {
  const seen = new Set();
  for (const [key, value] of url.searchParams) {
    if (!allowed.has(key) || seen.has(key) || value.length > 2048 || /[\u0000-\u001f\u007f]/.test(value)) return false;
    seen.add(key);
  }
  return Object.entries(required).every(([key, value]) => url.searchParams.get(key) === value);
};

// V100 wird über ein persönliches Angebot vermittelt. Dies ist ausschließlich
// unser Anfrageziel, kein Kundenrechner oder Onlineabschluss bei ARAG.
export const ARAG_OFFER_URL = 'https://healio.de/ambulant?angebot=arag-v100';
export const isPersonalOfferUrl = (value) => value === ARAG_OFFER_URL;

// Der SDK-Empfehlungscode bleibt erhalten. Freie Daten im Base64-Feld werden
// abgewiesen, damit sich dort keine Formulareingaben verstecken lassen.
const isSdkCustomValues = (value) => {
  if (typeof value !== 'string' || value.length > 512 || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) return false;
  try {
    const data = JSON.parse(atob(value));
    if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
    const keys = Object.keys(data);
    if (keys.length === 0) return true;
    return keys.length === 3
      && keys.every((key) => ['ref', 'source', 'ts'].includes(key))
      && typeof data.ref === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(data.ref)
      && data.source === 'healio.de'
      && Number.isSafeInteger(data.ts) && data.ts > 0;
  } catch {
    return false;
  }
};

/** Validierte, kanonische externe Antrags-URL oder null. Keine Netzwerkanfrage. */
export const validateApplicationUrl = (value) => {
  if (typeof value !== 'string' || value.length > 8000 || /[\s\u0000-\u001f\u007f]/.test(value)) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash) return null;

    if (isPersonalOfferUrl(url.toString())) return url.toString();

    if (url.hostname === 'www.diebayerische.de'
      && ['/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen', '/online-berechnen/krankenhauszusatzversicherung-berechnen/'].includes(url.pathname)
      && hasOnlyParams(url, new Set(['m', 'um']), { m: '002637', um: 'MAK226487' })) {
      return url.toString();
    }

    // Persönlicher Fonds-Finanz-Link für den reinen Einbettzimmer-Tarif.
    // Weder Vermittlerzuordnung noch zusätzliche Kundendaten verändern.
    if (url.hostname === 'www.beitragsrechner.dkv.com'
      && url.pathname === '/tarifrechner/600085/UZ1'
      && hasOnlyParams(url, new Set(['leitmerk']), { leitmerk: 'MAK226487' })) {
      return url.toString();
    }

    if (url.hostname !== LEVEL_NINE_HOST || url.pathname !== '/') return null;
    if (url.searchParams.get('mandant') === 'sdk') {
      if (!hasOnlyParams(url, LEVEL_NINE_PARAMS, {
        mandant: 'sdk', agentId1: '901334', agentId2: '', insurers: '36', tariffs: '',
        contactInformation: SDK_CONTACT,
        remarks: 'IkJlaSBSw7xja2ZyYWdlbiBzaW5kIHdpciBnZXJuZSBmw7xyIFNpZSBkYS4i',
        defaultContact: 'false', employeeInsurance: 'NOT_BKV',
      })) return null;
      if (!['Ambulant', 'Ambulant,Stationär', 'Stationär'].includes(url.searchParams.get('tarifftypes'))) return null;
      return isSdkCustomValues(url.searchParams.get('customValues')) ? url.toString() : null;
    }

    if (!hasOnlyParams(url, new Set([...LEVEL_NINE_PARAMS].filter((key) => key !== 'employeeInsurance')), {
      mandant: 'vmk', agentId1: '180188803', agentId2: '226487', insurers: '37',
      customValues: 'e30=', contactInformation: UKV_CONTACT, remarks: 'IiI=', defaultContact: 'false',
    })) return null;
    const type = url.searchParams.get('tarifftypes');
    const tariff = url.searchParams.get('tariffs');
    return ((type === 'Zahn' && tariff === '') || (type === 'Ambulant' && tariff === 'UKVVorsorgePRIVAT@'))
      ? url.toString() : null;
  } catch {
    return null;
  }
};

const SOURCE_PAGES = new Set([
  '/ambulant', '/zahn', '/stationaer', '/kassenbonus', '/tierkrankenversicherung',
  '/en/outpatient', '/en/dental', '/en/inpatient', '/en/health-insurance-bonus', '/en/pet-insurance',
]);

/** Nur die freigegebenen Seitenpfade, ohne Query, Hash oder Antworten. */
export const sanitizeLeadSourcePage = (value) => {
  if (typeof value !== 'string' || value.length > 2048 || !value.startsWith('/') || value.startsWith('//')) return null;
  const pathname = value.split(/[?#]/, 1)[0].replace(/\/+$/, '');
  return SOURCE_PAGES.has(pathname) ? pathname : null;
};
