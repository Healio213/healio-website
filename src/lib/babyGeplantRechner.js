/**
 * Rechenlogik der Seite /schwangerschaft/baby-geplant (Seitenplan
 * Healio/Schwangerschaft-Mikroseiten/SEITENPLAN-BABY-GEPLANT.md, Abschnitt 4).
 *
 * Reine Funktionen ohne React und ohne Browser, damit Node-Prüfskripte sie laden.
 * Datumsrechnung nur mit ganzen Zahlen { jahr, monat, tag }, nie mit
 * Date-Arithmetik. Date kommt nur einmal für „heute“ vor und ist als Parameter
 * austauschbar. Es wird nichts gespeichert, übertragen oder gemessen.
 */

const MONATSNAMEN = Object.freeze([
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]);

/** Wartezeit der Bayerischen für die Entbindung (Monate ab Versicherungsbeginn). */
export const WARTEZEIT_BAYERISCHE_MONATE = 8;
/** Vorsichtige Vorversicherungszeit eines Elternteils bei der Bayerischen (volle Monate). */
export const ELTERNTEIL_MONATE_BAYERISCHE = 3;
/** Wählbare Beginne: der nächste Monatserste bis fünf Monate nach dem laufenden Monat. */
export const ANZAHL_OPTIONEN = 5;

const istSchaltjahr = (jahr) => (jahr % 4 === 0 && jahr % 100 !== 0) || jahr % 400 === 0;

const tageImMonat = (jahr, monat) => {
  if (monat === 2) return istSchaltjahr(jahr) ? 29 : 28;
  return [4, 6, 9, 11].includes(monat) ? 30 : 31;
};

const istGanzzahl = (wert) => Number.isInteger(wert);

const istDatum = (datum) => Boolean(datum)
  && istGanzzahl(datum.jahr) && istGanzzahl(datum.monat) && istGanzzahl(datum.tag)
  && datum.monat >= 1 && datum.monat <= 12
  && datum.tag >= 1 && datum.tag <= tageImMonat(datum.jahr, datum.monat);

/** Monat um n weiterzählen, Jahr übertragen, der Tag bleibt 1. */
export const plusMonate = (datum, n) => {
  const index = (datum.jahr * 12) + (datum.monat - 1) + n;
  return { jahr: Math.floor(index / 12), monat: (index % 12) + 1, tag: 1 };
};

/** Letzter Tag des Vormonats von D. */
export const vortag = (datum) => {
  const davor = plusMonate(datum, -1);
  return { jahr: davor.jahr, monat: davor.monat, tag: tageImMonat(davor.jahr, davor.monat) };
};

/** „1. August 2027“: Tag ohne führende Null, Monat ausgeschrieben, Jahr vierstellig. */
export const formatiereDatum = (datum) => `${datum.tag}. ${MONATSNAMEN[datum.monat - 1]} ${datum.jahr}`;

/** Fünf wählbare Beginne: jeweils der Erste der nächsten fünf Monate nach heute. */
export const optionen = (heute) => {
  const monatsErster = { jahr: heute.jahr, monat: heute.monat, tag: 1 };
  return Array.from({ length: ANZAHL_OPTIONEN }, (_, index) => plusMonate(monatsErster, index + 1));
};

const gleich = (a, b) => a.jahr === b.jahr && a.monat === b.monat && a.tag === b.tag;

/** Ist B einer der fünf Monatsersten aus optionen(heute)? */
export const istWaehlbar = (beginn, heute) => istDatum(beginn) && istDatum(heute)
  && optionen(heute).some((option) => gleich(option, beginn));

/**
 * Kernfunktion ohne Optionsprüfung. Gibt null zurück, wenn B kein gültiger
 * Monatserster ist.
 */
export const berechneStichtage = (beginn) => {
  if (!istDatum(beginn) || beginn.tag !== 1) return null;
  const entbindungBayerische = plusMonate(beginn, WARTEZEIT_BAYERISCHE_MONATE);
  return {
    beginn: { jahr: beginn.jahr, monat: beginn.monat, tag: 1 },
    bayerische: {
      wartezeitBis: vortag(entbindungBayerische),
      entbindungAb: entbindungBayerische,
      babyAb: plusMonate(beginn, ELTERNTEIL_MONATE_BAYERISCHE),
    },
    sdk: {
      entbindungAb: { ...beginn, tag: 1 },
      babyAb: { ...beginn, tag: 1 },
    },
  };
};

/** Ergebnis nur für einen wählbaren Beginn, sonst null (kein Ergebnis). */
export const berechne = (beginn, heute) => (istWaehlbar(beginn, heute) ? berechneStichtage(beginn) : null);

/** Heutiges Datum als ganze Zahlen. Einzige Stelle mit Date. */
export const heuteAlsDatum = (jetzt = new Date()) => ({
  jahr: jetzt.getFullYear(),
  monat: jetzt.getMonth() + 1,
  tag: jetzt.getDate(),
});

/** Schlüssel einer Option für Auswahl und Vergleich, zum Beispiel „2026-12“. */
export const optionSchluessel = (datum) => `${datum.jahr}-${String(datum.monat).padStart(2, '0')}`;

/** Setzt die Daten in den Planungstext ein. */
export const planungsText = (vorlage, stichtage) => vorlage
  .replace('{B}', formatiereDatum(stichtage.beginn))
  .replace('{E_BAY}', formatiereDatum(stichtage.bayerische.entbindungAb));
