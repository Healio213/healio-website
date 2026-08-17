import { trackEvent } from '@/lib/analytics';
import { readStoredReferrer, sanitizeReferrer } from '@/lib/referrer';

/**
 * Zentrale SDK-URL-Konfiguration für Level Nine Antragsstrecke.
 *
 * Alle "Tarif berechnen"-Buttons nutzen diese Funktion statt hardcodierter URLs.
 * Der Referrer-Code wird automatisch in customValues eingebettet,
 * sodass Level Nine sieht, welcher Heilpraktiker den Patienten geschickt hat.
 */

const SDK_BASE = 'https://insurances-online.levelnine.biz/';
const AGENT_ID = '901334';
const INSURER_ID = '36';

// Healio GmbH Kontaktdaten (Base64-encoded JSON) — als Rückrufnummer nur die
// öffentliche Festnetznummer verwenden, niemals die private 0176-Nummer
const CONTACT_INFO = 'eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDQwODk3NTU3MDUiLCJlbWFpbCI6ImluZm9AaGVhbGlvLmRlIn0=';

// Bemerkungsfeld (Base64, UTF-8)
const REMARKS = 'IkJlaSBSw7xja2ZyYWdlbiBzaW5kIHdpciBnZXJuZSBmw7xyIFNpZSBkYS4i';

const IKK_LINK = 'https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V37000250016';

/**
 * Erstellt die SDK-URL mit optionalem Referrer-Code in customValues.
 *
 * @param {Object} options
 * @param {string} [options.tarifTypes] - z.B. "Ambulant,Stationär" (default: Ambulant + Stationär)
 * @param {string} [options.ref] - Referrer-Code (überschreibt sessionStorage)
 * @returns {string} Vollständige SDK-URL
 */
export function buildSdkUrl({ tarifTypes, ref } = {}) {
  const referrer = sanitizeReferrer(ref) || readStoredReferrer();

  // customValues: JSON → Base64
  // Wenn Referrer vorhanden, in customValues einbetten
  const customData = referrer
    ? { ref: referrer, source: 'healio.de', ts: Date.now() }
    : {};
  const customValues = btoa(JSON.stringify(customData));

  const params = new URLSearchParams({
    mandant: 'sdk',
    tarifftypes: tarifTypes || 'Ambulant,Stationär',
    agentId1: AGENT_ID,
    agentId2: '',
    insurers: INSURER_ID,
    tariffs: '',
    customValues,
    contactInformation: CONTACT_INFO,
    remarks: REMARKS,
    defaultContact: 'false',
    employeeInsurance: 'NOT_BKV',
  });

  return `${SDK_BASE}?${params.toString()}`;
}

/**
 * Trackt den Klick auf "Tarif berechnen" in Google Analytics.
 *
 * @param {string} page - z.B. "ambulant", "zahn", "stationaer"
 * @param {string|null} referrer - Referrer-Code
 */
export function trackSdkClick(page) {
  return trackEvent('tariff_calculator_click', {
    component: 'sdk',
    destination: 'levelnine',
    placement: page,
  });
}

/**
 * Trackt Klicks auf IKK-Links (Bonusprogramm/Mitgliedsantrag). Die halbe
 * 3.000-EUR-Story lief bis 17.08.2026 komplett ohne Messung.
 *
 * @param {string} placement - z.B. "bonusrechner", "ikk-wechsel", "stationaer"
 */
export function trackIkkClick(placement) {
  return trackEvent('ikk_bonus_click', {
    component: 'ikk',
    destination: 'ikk_classic',
    placement,
  });
}

export { IKK_LINK };
