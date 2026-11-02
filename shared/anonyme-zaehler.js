/**
 * Feste Regeln des anonymen Zählers, gemeinsam für Browser (src/lib/
 * anonyme-zaehler.js) und Funktion (api/zaehler.js). Dieselben Prüfungen
 * stehen als CHECK und RLS-Regel in docs/supabase/2026-11-02_anonyme_zaehler.sql.
 * Wer hier etwas ändert, ändert die SQL-Datei mit.
 */

export const ZAEHLER_EREIGNISSE = Object.freeze(['leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt']);
const EREIGNIS_SET = new Set(ZAEHLER_EREIGNISSE);

export const ZAEHLER_GERAETE = Object.freeze(['mobil', 'desktop']);
const GERAET_SET = new Set(ZAEHLER_GERAETE);

// Höchstens 160 Zeichen, nur a bis z, 0 bis 9, Bindestrich und Schrägstrich.
export const ZAEHLER_PFAD_MUSTER = /^[a-z0-9/-]{1,160}$/;

// Leistungsseiten, deren Aufruf als Weg zählt. Englische Fassungen mit.
export const LEISTUNGSSEITEN = Object.freeze([
  '/ambulant',
  '/zahn',
  '/stationaer',
  '/schwangerschaft',
  '/leistungen',
  '/en/outpatient',
  '/en/dental',
  '/en/inpatient',
  '/en/services',
]);
const LEISTUNGSSEITEN_SET = new Set(LEISTUNGSSEITEN);

export const KURZCHECK_VARIANTEN = Object.freeze(['naturheilkunde', 'schwangerschaft']);
const KURZCHECK_VARIANTEN_SET = new Set(KURZCHECK_VARIANTEN);

export const istLeistungsseite = (pfad) => LEISTUNGSSEITEN_SET.has(pfad);

/** Pfad auf die erlaubte Form bringen oder null. Suchteil und Anker fallen weg. */
export const normalisiereZaehlerPfad = (value) => {
  if (typeof value !== 'string') return null;
  const ohneZusatz = value.split(/[?#]/, 1)[0].trim().toLowerCase();
  if (!ohneZusatz.startsWith('/')) return null;
  const pfad = ohneZusatz.length > 1 ? ohneZusatz.replace(/\/+$/, '') || '/' : ohneZusatz;
  return ZAEHLER_PFAD_MUSTER.test(pfad) ? pfad : null;
};

/**
 * Baut den Datensatz oder gibt null zurück, wenn etwas nicht in die festen
 * Regeln passt. Es gibt genau vier Felder; Datum setzt die Datenbank.
 */
export const baueZaehlerEintrag = (ereignis, { vonPfad, ziel = null } = {}, geraet = 'desktop') => {
  if (!EREIGNIS_SET.has(ereignis)) return null;
  if (!GERAET_SET.has(geraet)) return null;
  const von = normalisiereZaehlerPfad(vonPfad);
  if (!von) return null;

  if (ereignis === 'leistungsweg_klick') {
    const zielPfad = normalisiereZaehlerPfad(ziel);
    if (!zielPfad || !LEISTUNGSSEITEN_SET.has(zielPfad) || zielPfad === von) return null;
    return { ereignis, von_pfad: von, ziel: zielPfad, geraet };
  }
  if (ereignis === 'kurzcheck_abgeschickt') {
    if (!KURZCHECK_VARIANTEN_SET.has(ziel)) return null;
    return { ereignis, von_pfad: von, ziel, geraet };
  }
  // sdk_klick: nur die Seite, auf der der Rechner geöffnet wurde.
  if (ziel !== null && ziel !== undefined) return null;
  return { ereignis, von_pfad: von, ziel: null, geraet };
};

/**
 * Strenge Prüfung auf dem Server: Der Browser muss schon die fertige Form
 * schicken. Es wird nichts umgeformt, unbekannte Felder fallen weg.
 */
export const pruefeZaehlerEintrag = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const { ereignis, von_pfad: vonPfad, ziel = null, geraet } = payload;
  if (typeof ereignis !== 'string' || typeof vonPfad !== 'string' || typeof geraet !== 'string') return null;
  if (ziel !== null && typeof ziel !== 'string') return null;
  const eintrag = baueZaehlerEintrag(ereignis, { vonPfad, ziel }, geraet);
  if (!eintrag) return null;
  if (eintrag.von_pfad !== vonPfad || eintrag.ziel !== ziel) return null;
  return eintrag;
};
