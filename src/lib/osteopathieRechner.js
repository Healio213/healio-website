/**
 * Rechenlogik der Seite /ambulant/osteopathie (Seitenplan
 * Healio/Ambulant-Mikroseiten/SEITENPLAN-OSTEOPATHIE.md, Abschnitt 4).
 *
 * Reine Funktionen ohne React und ohne Browser, damit Node-Prüfskripte sie laden.
 * Alle Beträge intern in ganzen Cent (Integer), Prozentrechnung mit
 * Math.floor(betragCent * prozent / 100), keine Gleitkomma-Euro.
 * Es wird nichts gespeichert, übertragen oder gemessen. Date kommt nur einmal
 * für „heute“ vor und ist als Parameter austauschbar.
 */
import { OSTEOPATHIE_KASSEN, PRUEFEN_BIS } from '../data/osteopathieKassen.js';
import {
  BEISPIEL_GRUPPE, beitragInGruppe, findeAltersgruppe, parseGeburtsjahr,
} from '../data/sdkAmbulantBeitraege.js';

export const STUFEN = Object.freeze({
  50: Object.freeze({ prozent: 50, topfCent: 50000, code: 'AP5' }),
  70: Object.freeze({ prozent: 70, topfCent: 70000, code: 'AP7' }),
  90: Object.freeze({ prozent: 90, topfCent: 90000, code: 'AP9' }),
  100: Object.freeze({ prozent: 100, topfCent: 100000, code: 'AP1' }),
});

/** Offener Punkt 3 im Seitenplan: Tarif beim Arzt (Osteopathie) nicht ausdrücklich belegt. */
export const TARIF_RECHNET_ARZT = false;
/** Offener Punkt 4: 'rest' = Prozentsatz auf den Rest nach dem Kassenzuschuss, Alternative 'gesamt'. */
export const ANRECHNUNG = 'rest';

export const TARIF_BEHANDLER = Object.freeze({ heilpraktiker: true, arzt: TARIF_RECHNET_ARZT, physio: false });

export const GRENZEN = Object.freeze({
  preis: Object.freeze({ min: 30, max: 300, vorwahl: 90 }),
  sitzungen: Object.freeze({ min: 1, max: 20, vorwahl: 6 }),
  eigenZuschuss: Object.freeze({ min: 0, max: 200, vorwahl: 0 }),
  eigenSitzungen: Object.freeze({ min: 0, max: 20, vorwahl: 0 }),
});

export const STUFE_VORWAHL = 100;
export const BEHANDLER_VORWAHL = 'heilpraktiker';

export { OSTEOPATHIE_KASSEN, PRUEFEN_BIS };

const BEHANDLER = ['heilpraktiker', 'arzt', 'physio'];
const imBereich = (wert, grenze) => Number.isInteger(wert) && wert >= grenze.min && wert <= grenze.max;

const zweistellig = (zahl) => String(zahl).padStart(2, '0');

/** Heutiges Datum als { jahr, monat, tag } (einzige Stelle mit Date). */
export const heuteAlsDatum = () => {
  const jetzt = new Date();
  return { jahr: jetzt.getFullYear(), monat: jetzt.getMonth() + 1, tag: jetzt.getDate() };
};

const normalisiereHeute = (heute) => {
  if (!heute) return heuteAlsDatum();
  if (heute instanceof Date) return { jahr: heute.getFullYear(), monat: heute.getMonth() + 1, tag: heute.getDate() };
  return heute;
};

const datumAlsText = (datum) => `${datum.jahr}-${zweistellig(datum.monat)}-${zweistellig(datum.tag)}`;

/** Kassenliste nur bis einschließlich PRUEFEN_BIS (Regel R9). */
export const kassenlisteSichtbar = (heute) => datumAlsText(normalisiereHeute(heute)) <= PRUEFEN_BIS;

export const findeKasse = (id) => OSTEOPATHIE_KASSEN.find((kasse) => kasse.id === id) || null;

/** Betragsformat: ganze Euro ohne Nachkommastellen, sonst zwei Stellen mit Komma, Tausenderpunkt. */
export const formatiereEuro = (cent) => {
  const betrag = Math.abs(cent);
  const euro = Math.floor(betrag / 100);
  const rest = betrag % 100;
  const euroText = String(euro).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const vorzeichen = cent < 0 ? '-' : '';
  return rest === 0 ? `${vorzeichen}${euroText} EUR` : `${vorzeichen}${euroText},${zweistellig(rest)} EUR`;
};

/** Hinweistext der Kasse für die Zustände 'erwachsene' und 'behandlerKasse'. */
export const kassenHinweis = (kasse, zustand, behandler) => {
  if (!kasse?.hinweis) return '';
  if (zustand === 'erwachsene') return kasse.hinweis.erwachsene || '';
  if (zustand === 'behandlerKasse') return kasse.hinweis[behandler] || '';
  return '';
};

/**
 * @param {object} eingabe { kasse, eigenZuschuss, eigenSitzungen, behandler, preis, sitzungen, stufe, geburtsjahr }
 * @param {object} [optionen] { heute, anrechnung, tarifRechnetArzt } (nur für Tests und Umstellung)
 * @returns {object|null} Ergebnis oder null bei ungültiger Eingabe (Regel R10)
 */
export function berechneOsteopathie(eingabe, optionen = {}) {
  const heute = normalisiereHeute(optionen.heute);
  const anrechnung = optionen.anrechnung || ANRECHNUNG;
  const tarifBehandler = { ...TARIF_BEHANDLER, arzt: optionen.tarifRechnetArzt ?? TARIF_RECHNET_ARZT };
  const {
    eigenZuschuss, eigenSitzungen, behandler, preis, sitzungen, stufe, geburtsjahr,
  } = eingabe || {};
  const kasseWahl = eingabe?.kasse ?? null;

  // R10 Eingabeprüfung
  if (!imBereich(preis, GRENZEN.preis) || !imBereich(sitzungen, GRENZEN.sitzungen)) return null;
  if (!Object.hasOwn(STUFEN, String(stufe)) || !Number.isInteger(stufe)) return null;
  if (!BEHANDLER.includes(behandler)) return null;

  const eigen = kasseWahl === 'eigen';
  let kasse = null;
  if (eigen) {
    if (!imBereich(eigenZuschuss, GRENZEN.eigenZuschuss) || !imBereich(eigenSitzungen, GRENZEN.eigenSitzungen)) return null;
  } else if (kasseWahl !== null && kasseWahl !== '') {
    // R9: nach dem Stichtag ist keine Kasse der Liste wählbar
    if (!kassenlisteSichtbar(heute)) return null;
    kasse = findeKasse(kasseWahl);
    if (!kasse) return null;
  }

  const stufeDaten = STUFEN[stufe];
  const pCent = preis * 100;
  const rechnungCent = pCent * sitzungen;

  // Kasse
  let kasseCent = 0;
  let kasseZustand = 'keineKasse';
  if (eigen) {
    const je = Math.min(pCent, eigenZuschuss * 100);
    kasseCent = Math.min(sitzungen, eigenSitzungen) * je;
    kasseZustand = 'eigen';
  } else if (kasse) {
    if (kasse.erwachsene !== 'ja') {
      kasseZustand = 'erwachsene';
    } else if (kasse.behandler[behandler] === false) {
      kasseZustand = 'behandlerKasse';
    } else {
      const anzahl = kasse.sitzungenJahr === null ? sitzungen : Math.min(sitzungen, kasse.sitzungenJahr);
      let je = Math.floor((pCent * kasse.prozent) / 100);
      if (kasse.hoechstJeSitzung !== null) je = Math.min(je, kasse.hoechstJeSitzung * 100);
      kasseCent = anzahl * je;
      if (kasse.jahresdeckel !== null) kasseCent = Math.min(kasseCent, kasse.jahresdeckel * 100);
      kasseZustand = 'kasse';
    }
  }

  // Tarif
  let tarifJahr1Cent = 0;
  let tarifJahr2Cent = 0;
  let tarifZustand = 'behandlerTarif';
  if (tarifBehandler[behandler]) {
    const basis = rechnungCent - kasseCent;
    const roh = anrechnung === 'rest'
      ? Math.floor((basis * stufeDaten.prozent) / 100)
      : Math.min(Math.floor((rechnungCent * stufeDaten.prozent) / 100), basis);
    tarifJahr1Cent = Math.min(roh, stufeDaten.topfCent);
    tarifJahr2Cent = Math.min(roh, stufeDaten.topfCent - tarifJahr1Cent);
    tarifZustand = 'tarif';
  }

  // Beitrag (R8)
  const gueltigesJahr = parseGeburtsjahr(geburtsjahr, heute.jahr);
  const eigeneGruppe = gueltigesJahr !== null ? findeAltersgruppe(gueltigesJahr, heute.jahr) : null;
  const gruppe = eigeneGruppe || BEISPIEL_GRUPPE;
  const beitragMonatCent = Math.round(beitragInGruppe(gruppe, stufeDaten.code) * 100);

  return {
    rechnungCent,
    kasseCent,
    kasseZustand,
    tarifJahr1Cent,
    tarifJahr2Cent,
    topfRestCent: stufeDaten.topfCent - tarifJahr1Cent,
    eigenJahr1Cent: rechnungCent - kasseCent - tarifJahr1Cent,
    eigenJahr2Cent: rechnungCent - kasseCent - tarifJahr2Cent,
    tarifZustand,
    beitragMonatCent,
    beitragJahrCent: beitragMonatCent * 12,
    beitragGruppe: { von: gruppe.von, bis: gruppe.bis },
    beitragMitGeburtsjahr: eigeneGruppe !== null,
    topfCent: stufeDaten.topfCent,
    tarifProzent: stufeDaten.prozent,
    kasse,
  };
}

/** Setzt {platzhalter} in einem Text aus der Inhaltsdatei ein. */
export const fuelleText = (vorlage, werte) => String(vorlage).replace(/\{(\w+)\}/g, (treffer, name) => (name in werte ? String(werte[name]) : treffer));

/** Beitragszeile (Plan 4.5). */
export const beitragsZeile = (texte, ergebnis, stufe, stand) => {
  const { von, bis } = ergebnis.beitragGruppe;
  const alter = bis === null ? `ab ${von} Jahren` : `${von} bis ${bis} Jahren`;
  let zusatz;
  if (ergebnis.beitragMitGeburtsjahr) zusatz = bis === null ? ` (${alter}, Stand ${stand})` : ` (mit ${alter}, Stand ${stand})`;
  else zusatz = ` (Beispiel mit ${alter}, Stand ${stand})`;
  return fuelleText(texte, {
    s: stufe, monat: formatiereEuro(ergebnis.beitragMonatCent), jahr: formatiereEuro(ergebnis.beitragJahrCent),
  }) + zusatz;
};
