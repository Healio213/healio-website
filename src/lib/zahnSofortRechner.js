/**
 * Rechenlogik der Seite /zahn/behandlung-steht-an (Seitenplan
 * Healio/Zahn-Mikroseiten/SEITENPLAN-BEHANDLUNG-STEHT-AN.md, Abschnitt 4).
 *
 * Reine Funktionen ohne React und ohne Browser, damit Node-Prüfskripte sie laden.
 * Alle Beträge laufen intern in Cent als Ganzzahl, gerundet wird kaufmännisch.
 * Es wird nichts gespeichert, übertragen oder gemessen.
 */

/**
 * Schalter für die Jahresgrenze im Beginnjahr (Plan 4.5). true: Der Rechner
 * kürzt den Jahreshöchstbetrag nach AVB § 4 Abs. 1 um ein Zwölftel je Monat
 * vor dem Vertragsbeginn. false: volle 750 EUR im ersten Kalenderjahr. Bei
 * false entfallen das Feld Beginnmonat und der Pflichtsatz P5 von selbst.
 */
export const BEGINNJAHR_ANTEILIG = false;

export const JAHRESGRENZE_CENT = 75000;
export const BAUSTEIN_MONATSBEITRAG_CENT = 2990;
export const BAUSTEIN_MONATE = 24;
export const BAUSTEIN_BEITRAG_CENT = BAUSTEIN_MONATSBEITRAG_CENT * BAUSTEIN_MONATE;
export const GESAMT_MAX_CENT = 5000000;

export const TARIFE = Object.freeze(['smart', 'komfort', 'prestige']);
export const ARTEN = Object.freeze(['regel', 'hoeher', 'behandlung', 'unbekannt']);
export const TARIF_NAMEN = Object.freeze({ smart: 'Smart', komfort: 'Komfort', prestige: 'Prestige' });

/** Erstattungssatz in Prozent (Plan 4.3). */
export const erstattungssatz = ({ tarif, art, vorsorge }) => {
  if (tarif === 'smart') return 75;
  if (tarif === 'prestige') return 100;
  if (art === 'regel' || art === 'behandlung') return 100;
  return vorsorge ? 90 : 80;
};

/**
 * Liest einen Betrag in deutscher Schreibweise. Punkt als Tausendertrenner,
 * Komma als Dezimalzeichen. Gibt { status: 'leer' | 'ungueltig' | 'ok', cent }.
 */
export const parseBetrag = (eingabe) => {
  if (eingabe === null || eingabe === undefined) return { status: 'leer', cent: null };
  const roh = String(eingabe).replace(/€|eur/gi, '').replace(/[\s ]/g, '');
  if (roh === '') return { status: 'leer', cent: null };
  let zahl;
  if (roh.includes(',')) {
    if (!/^\d{1,3}(\.\d{3})*,\d{1,2}$|^\d+,\d{1,2}$/.test(roh)) return { status: 'ungueltig', cent: null };
    zahl = roh.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+$/.test(roh)) {
    zahl = roh.replace(/\./g, '');
  } else if (/^\d+(\.\d{1,2})?$/.test(roh)) {
    zahl = roh;
  } else {
    return { status: 'ungueltig', cent: null };
  }
  const cent = Math.round(Number(zahl) * 100);
  if (!Number.isFinite(cent)) return { status: 'ungueltig', cent: null };
  return { status: 'ok', cent };
};

/** Cent als deutscher Betrag mit zwei Nachkommastellen, ohne Währung: 62131 -> "621,31". */
export const formatBetrag = (cent) => {
  const vorzeichen = cent < 0 ? '-' : '';
  const betrag = Math.abs(cent);
  const euro = String(Math.floor(betrag / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${vorzeichen}${euro},${String(betrag % 100).padStart(2, '0')}`;
};

/** Cent als deutscher Betrag mit Währung: 62131 -> "621,31 EUR". */
export const formatEuro = (cent) => `${formatBetrag(cent)} EUR`;

/** Vorwahl für den Beginnmonat: der Monat nach dem heutigen, im Dezember der Januar. */
export const vorwahlBeginnMonat = (heute = new Date()) => ((heute.getMonth() + 1) % 12) + 1;

/**
 * Rechnet den Plan nach. Eingaben als Rohtext (gesamt, kasse) und Auswahl.
 * Ergebnis ohne Text: { ok: false, gesamt, kasse } mit Statuscodes je Feld oder
 * { ok: true, ... } mit allen Beträgen in Cent.
 *
 * Statuscodes: gesamt: 'leer' | 'ungueltig' | 'ok'
 *              kasse: 'leer' | 'ungueltig' | 'zuHoch' | 'ok'
 */
export const berechneZahnSofort = (eingabe, optionen = {}) => {
  const anteilig = optionen.anteilig === undefined ? BEGINNJAHR_ANTEILIG : Boolean(optionen.anteilig);
  const tarif = TARIFE.includes(eingabe.tarif) ? eingabe.tarif : 'komfort';
  const gesamtLesen = parseBetrag(eingabe.gesamt);
  const kasseLesen = parseBetrag(eingabe.kasse);

  let gesamtStatus = gesamtLesen.status;
  if (gesamtStatus === 'ok' && gesamtLesen.cent === 0) gesamtStatus = 'leer';
  if (gesamtStatus === 'ok' && (gesamtLesen.cent < 0 || gesamtLesen.cent > GESAMT_MAX_CENT)) gesamtStatus = 'ungueltig';
  if (gesamtStatus !== 'ok') return { ok: false, gesamt: gesamtStatus, kasse: kasseLesen.status === 'ok' ? 'ok' : kasseLesen.status };

  const gesamt = gesamtLesen.cent;
  let kasseStatus = kasseLesen.status;
  if (kasseStatus === 'ok' && kasseLesen.cent > gesamt) kasseStatus = 'zuHoch';
  if (kasseStatus !== 'ok') return { ok: false, gesamt: 'ok', kasse: kasseStatus };

  const kasse = kasseLesen.cent;
  // Art und Vorsorge gelten nur bei Komfort. Bei Regelversorgung und
  // Zahnbehandlung gilt der Vorsorgenachweis als „nein“ (Plan 4.4).
  const art = ARTEN.includes(eingabe.art) ? eingabe.art : 'unbekannt';
  const vorsorge = tarif === 'komfort' && (art === 'hoeher' || art === 'unbekannt') && Boolean(eingabe.vorsorge);
  const satz = erstattungssatz({ tarif, art, vorsorge });

  const monat = Math.min(12, Math.max(1, Math.trunc(Number(eingabe.beginnMonat)) || 1));
  const tarifanteil = Math.max(0, Math.round((satz * gesamt) / 100) - kasse);
  const jahr1 = anteilig ? Math.round((JAHRESGRENZE_CENT * (13 - monat)) / 12) : JAHRESGRENZE_CENT;
  const sofort1 = Math.min(tarifanteil, jahr1);
  const sofort2 = Math.min(tarifanteil, jahr1 + JAHRESGRENZE_CENT);

  return {
    ok: true,
    anteilig,
    tarif,
    tarifName: TARIF_NAMEN[tarif],
    satz,
    gesamt,
    kasse,
    tarifanteil,
    jahr1,
    sofort1,
    sofort2,
    bleibt1: gesamt - kasse - sofort1,
    bleibt2: gesamt - kasse - sofort2,
    zweiJahre: sofort2 > sofort1,
    kasseZahltAlles: kasse === gesamt,
    tarifDeckt: tarifanteil === 0 && kasse < gesamt,
    baustein: BAUSTEIN_BEITRAG_CENT,
  };
};
