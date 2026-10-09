/**
 * Reine Rechenlogik fuer den Zulagen-Rechner /altersvorsorgedepot.
 *
 * Grundlage: Healio/Altersvorsorgedepot-Funnel/FAKTENBASIS.md (Stand 08.10.2026).
 * Keine Seiteneffekte, kein React, kein DOM. Wird sowohl von der Komponente
 * als auch vom Contract-Test scripts/check-altersvorsorge.mjs verwendet.
 *
 * Rechenlogik laut Faktenbasis:
 *   Jahresbeitrag J = Monatsbeitrag x 12
 *   Wenn J < 120: keine Zulage
 *   Grundzulage = 0,5 x min(J, 360) + 0,25 x max(0, min(J, 1800) - 360)   (max. 540)
 *   Kinderzulage = Anzahl Kinder x min(J, 300)                            (max. 300 je Kind)
 *   Startbonus = 200 einmalig, unmittelbar berechtigt und zu Jahresbeginn unter 25
 */

export const MINDEST_JAHRESBEITRAG = 120;
export const GRUNDZULAGE_MAX = 540;
export const KINDERZULAGE_MAX_JE_KIND = 300;
export const STARTBONUS_BETRAG = 200;
// Öffentliches UI-Limit: Bei 150 EUR monatlich ist die maximale Grundzulage
// erreicht. Die reine Formel kann weiterhin höhere fachliche Beiträge prüfen.
export const RECHNER_MAX_MONATSBEITRAG = 150;

const rundeEuro = (value) => Math.round((Number(value) || 0) * 100) / 100;

const sichererBeitrag = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
};

const sichereKinderzahl = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : 0;
};

/**
 * @param {{ monatsbeitrag: number, kinder?: number, unter25?: boolean }} eingabe
 * @returns {{
 *   monatsbeitrag: number,
 *   kinder: number,
 *   unter25: boolean,
 *   jahresbeitrag: number,
 *   grundzulage: number,
 *   kinderzulage: number,
 *   startbonus: number,
 *   zulageJahr: number,
 *   zulageMonat: number,
 *   quote: number,
 *   berechtigt: boolean,
 * }}
 */
export const berechneZulagen = ({ monatsbeitrag, kinder = 0, unter25 = false } = {}) => {
  const beitrag = sichererBeitrag(monatsbeitrag);
  const kinderzahl = sichereKinderzahl(kinder);
  const istUnter25 = Boolean(unter25);
  const jahresbeitrag = rundeEuro(beitrag * 12);
  const berechtigt = jahresbeitrag >= MINDEST_JAHRESBEITRAG;

  if (!berechtigt) {
    return {
      monatsbeitrag: beitrag,
      kinder: kinderzahl,
      unter25: istUnter25,
      jahresbeitrag,
      grundzulage: 0,
      kinderzulage: 0,
      startbonus: 0,
      zulageJahr: 0,
      zulageMonat: 0,
      quote: 0,
      berechtigt: false,
    };
  }

  const grundzulage = rundeEuro(
    0.5 * Math.min(jahresbeitrag, 360) + 0.25 * Math.max(0, Math.min(jahresbeitrag, 1800) - 360),
  );
  const kinderzulage = rundeEuro(kinderzahl * Math.min(jahresbeitrag, KINDERZULAGE_MAX_JE_KIND));
  const startbonus = istUnter25 ? STARTBONUS_BETRAG : 0;
  const zulageJahr = rundeEuro(grundzulage + kinderzulage);
  const zulageMonat = rundeEuro(zulageJahr / 12);
  const quote = jahresbeitrag > 0 ? zulageJahr / jahresbeitrag : 0;

  return {
    monatsbeitrag: beitrag,
    kinder: kinderzahl,
    unter25: istUnter25,
    jahresbeitrag,
    grundzulage,
    kinderzulage,
    startbonus,
    zulageJahr,
    zulageMonat,
    quote,
    berechtigt: true,
  };
};

const EURO_GANZ = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const EURO_KOMMA = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Deutsche Zahlenschreibweise ohne Einheit, ohne Nachkommastellen bei ganzen
 * Beträgen: 240 -> "240", 1050 -> "1.050", 62.5 -> "62,50".
 */
export const formatZahlDE = (value) => {
  const rounded = rundeEuro(value);
  const formatter = Number.isInteger(rounded) ? EURO_GANZ : EURO_KOMMA;
  return formatter.format(rounded);
};

/** Deutsche Betragsschreibweise, z. B. 1050 -> "1.050 EUR", 62.5 -> "62,50 EUR". */
export const formatEuroDE = (value) => `${formatZahlDE(value)} EUR`;

/** Cent-Schreibweise fuer die Quote unter 100 %, z. B. 0.3 -> "30 Cent". */
export const formatCentDE = (quoteAnteil) => {
  const cent = Math.round((Number(quoteAnteil) || 0) * 100);
  return `${EURO_GANZ.format(cent)} Cent`;
};
