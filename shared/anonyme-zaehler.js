/**
 * Feste Regeln des anonymen Zählers, gemeinsam für Browser (src/lib/
 * anonyme-zaehler.js) und Funktion (api/zaehler.js). Dieselben Prüfungen
 * stehen als CHECK und RLS-Regel in docs/supabase/2026-11-02_anonyme_zaehler.sql,
 * erweitert um versicherer_klick in
 * docs/supabase/2026-11-10_anonyme_zaehler_versicherer_klick.sql.
 * Wer hier etwas ändert, ändert die SQL-Dateien mit.
 */

export const ZAEHLER_EREIGNISSE = Object.freeze(['leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt', 'versicherer_klick']);
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
  '/schwangerschaft/baby-geplant',
  '/leistungen',
  '/en/outpatient',
  '/en/dental',
  '/en/inpatient',
  '/en/services',
]);
const LEISTUNGSSEITEN_SET = new Set(LEISTUNGSSEITEN);

export const KURZCHECK_VARIANTEN = Object.freeze(['naturheilkunde', 'schwangerschaft']);
const KURZCHECK_VARIANTEN_SET = new Set(KURZCHECK_VARIANTEN);

// Versicherer, deren Online-Abschluss direkt verlinkt ist (Zahn: Bayerische mit
// ZAHN Sofort, UKV ZahnPRIVAT). Nur der Name aus dieser festen Liste, nie Tarif,
// Antwort oder Ergebnis eines Checks.
export const ZAEHLER_VERSICHERER = Object.freeze(['bayerische', 'ukv']);
const VERSICHERER_SET = new Set(ZAEHLER_VERSICHERER);

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
  if (ereignis === 'versicherer_klick') {
    // von_pfad ist jede Seite mit erlaubtem Pfad, auch künftige Unterseiten
    // wie /zahn/behandlung-steht-an. Das Ziel ist nur der Versicherer.
    if (!VERSICHERER_SET.has(ziel)) return null;
    return { ereignis, von_pfad: von, ziel, geraet };
  }
  // sdk_klick: nur die Seite, auf der der Rechner geöffnet wurde.
  if (ziel !== null && ziel !== undefined) return null;
  return { ereignis, von_pfad: von, ziel: null, geraet };
};

/**
 * Was der Browser schickt: drei Felder. Ob mobil oder desktop, leitet erst die
 * Funktion aus der Browserkennung ab, die jede Anfrage ohnehin mitbringt. Der
 * Browser liest dafür nichts aus (§ 25 TDDDG).
 */
export const baueZaehlerNutzlast = (ereignis, angaben = {}) => {
  const eintrag = baueZaehlerEintrag(ereignis, angaben, 'desktop');
  if (!eintrag) return null;
  return { ereignis: eintrag.ereignis, von_pfad: eintrag.von_pfad, ziel: eintrag.ziel };
};

// Handys tragen „Mobi“ (Android, Firefox, Opera) oder „iPhone“/„iPod“ in der
// Kennung. Tablets und alles Unklare zählen als desktop.
const MOBIL_KENNUNG = /Mobi|iPhone|iPod/i;

/** Gerät aus der Browserkennung, nur „mobil“ oder „desktop“. */
export const geraetAusUserAgent = (userAgent) => (
  typeof userAgent === 'string' && MOBIL_KENNUNG.test(userAgent.slice(0, 512)) ? 'mobil' : 'desktop'
);

/**
 * Strenge Prüfung auf dem Server: Der Browser muss schon die fertige Form
 * schicken. Es wird nichts umgeformt, unbekannte Felder fallen weg, auch ein
 * mitgeschicktes Gerät. Das Gerät kommt von der Funktion.
 */
export const pruefeZaehlerEintrag = (payload, geraet = 'desktop') => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const { ereignis, von_pfad: vonPfad, ziel = null } = payload;
  if (typeof ereignis !== 'string' || typeof vonPfad !== 'string') return null;
  if (ziel !== null && typeof ziel !== 'string') return null;
  const eintrag = baueZaehlerEintrag(ereignis, { vonPfad, ziel }, geraet);
  if (!eintrag) return null;
  if (eintrag.von_pfad !== vonPfad || eintrag.ziel !== ziel) return null;
  return eintrag;
};
