// Aufbau einer Produktdefinition für die Antragsmaske /antrag/<sparte>
// (12.11.2026). Eine Definition beschreibt eine Sparte bei einem Versicherer
// vollständig. Die Maske (src/components/antragsmaske/) und das Regelwerk
// (src/lib/antragsmaske/regeln.js) lesen nur diese Felder.
//
// Pflicht für eine fertige Definition (bereit: true):
//   sparte          'ambulant' | 'zahn' | 'stationaer'
//   versicherer     { id, name, kurz }   id passt zu antragAusLink() in index.js
//   kennzeile       Zeile über dem Fortschritt, z. B. „Ambulanter Zusatzschutz der SDK“
//   textfassung     Stand der Pflichttexte (geht mit dem Antrag an den Server)
//   tarife          [{ id, name, zusatz?, zeilen?: [[label, wert]] }]
//   beginn          { art: 'monatsErster', abMonat, bisMonat }
//   alter           { min?, max?, stichtag: 'heute' | 'beginn', hinweisZuJung?, hinweisZuAlt? }
//   beitrag         { art: 'dienst', plz: { frage, label, hinweis } }: Beitrag nur vom Antragsdienst
//                   (POST /antrag/api/selbstantrag/beitrag), z. B. wenn allein der Versicherer die
//                   Preisregion kennt; oder
//                   { alter: 'kalenderjahr' | 'genau', gruppen: [{ von, bis, preise }],
//                     regionen?: { bereiche: [{ von: 'PLZ', bis: 'PLZ', region }], standard? },
//                     berechne?: Funktion (nur in .js, ersetzt die Tabelle), vorbehalt? }
//                   preise ohne Regionen: { TARIF: Monatsbeitrag }, mit Regionen:
//                   { REGION: { TARIF: Monatsbeitrag } }. Nur belegte Werte.
//   gesundheit      { titel, vorspann?: { vorTitel, titel, absaetze, aufklapper?, bestaetigung? },
//                     fragen: [Frage] }
//   person          { anreden, felder, anschrift, bestaetigungen }
//   zahlung         { zahlweisen, kontoinhaberFrage, kontoAndere, sepa }
//   erklaerungen    [{ teil, eintraege: [Eintrag] }]
//   zusammenfassung { titel }, absenden { satz, vorbehalt, knopf }, danke { punkte }
//   gesundheitFuerVertrag  Funktion (antworten, { tarif, bausteine }): Antworten in das Format des Servers
// Freiwillig: bausteine [{ id, name, kennzeichen, preisText, preisTextJe?: { zahlweise: Text }, leistungen, erklaerungen, bedingung? }],
//   tarifHinweisJe?: { zahlweise: Text } (Beschriftung je Zahlweise wie im Original),
//   zahlweiseImTarif (Zahlweise schon in Schritt 1, weil sie den Beitrag ändert), tarifFussnote,
//   tarifVorgabe (vorausgewählt wie im Original).
//
// Frage (eine je Bildschirm, Folgefragen auf demselben Bildschirm):
//   { id, typ: 'janein' | 'auswahl' | 'mehrfach' | 'zahl' | 'masse' | 'text',
//     titel, kurz, text?, stamm?: { label, text }, stammAufklappbar?: { titel, text },
//     liste?: [Text], zuschlagText?, optionen?: [{ id, label, wirkung? }],
//     wirkung?: { ja: [Wirkung], nein: [Wirkung] }, folge?: [Frage mit bedingung],
//     bedingung?: Bedingung, mindestens?, felder? (masse), min?, max? (zahl) }
// Wirkung: { art: 'zuschlag', prozent | euro, grund } | { art: 'ausschluss', text }
//          | { art: 'pruefung', text } | { art: 'keineAufnahme', text }
// Bedingung: siehe bedingungErfuellt() in regeln.js.
//
// Eintrag der Erklärungen:
//   { art: 'hinweis', text }
//   { art: 'haken', key, titel, kurz?, warnung?, volltext?: Blöcke, haken, pflicht }
//   { art: 'wahl', key, titel, kurz?, volltext?, legend, hinweis?, optionen: [{ id, titel, text }], pflicht }
//   { art: 'unterlagen', key, titel, gruppen: [{ von, eintraege: [{ name, dateien: [{ label, href }] }] }],
//     haken, hakenAbsaetze, pflicht }
// Blöcke: ['titel' | 'h' | 'p' | 'fussnote', text], ['ul', [text]], ['wahl', 'I', [Blöcke]].
//
// Lieferformat für Zahn und stationär (JSON, ohne Funktionen) siehe
// Healio/Antragsstrecken/VERTRAG-SELBSTANTRAG-ENTWURF.md, Abschnitt 7.

export const SPARTEN = ['ambulant', 'zahn', 'stationaer'];

const FRAGE_TYPEN = new Set(['janein', 'auswahl', 'mehrfach', 'zahl', 'masse', 'text', 'datum']);
const WIRKUNG_ARTEN = new Set(['zuschlag', 'ausschluss', 'pruefung', 'keineAufnahme']);

function pruefeWirkungen(liste, wo, fehler) {
  if (liste === undefined) return;
  if (!Array.isArray(liste)) { fehler.push(`${wo}: Wirkung muss eine Liste sein`); return; }
  liste.forEach((wirkung, stelle) => {
    if (!WIRKUNG_ARTEN.has(wirkung?.art)) fehler.push(`${wo}[${stelle}]: unbekannte Wirkung ${wirkung?.art}`);
    if (wirkung?.art === 'zuschlag' && !Number.isFinite(wirkung.prozent) && !Number.isFinite(wirkung.euro) && !wirkung.euroJeTarif) fehler.push(`${wo}[${stelle}]: Zuschlag ohne Prozent oder Euro`);
  });
}

function pruefeFrage(frage, ids, fehler) {
  const wo = `Frage ${frage?.id}`;
  if (!frage?.id || ids.has(frage.id)) fehler.push(`${wo}: Kennung fehlt oder doppelt`);
  ids.add(frage?.id);
  if (!FRAGE_TYPEN.has(frage?.typ)) fehler.push(`${wo}: unbekannter Typ ${frage?.typ}`);
  if (!frage?.titel && !frage?.legend && !frage?.label && !frage?.text) fehler.push(`${wo}: Titel fehlt`);
  if (['auswahl', 'mehrfach'].includes(frage?.typ) && !(frage.optionen?.length > 0)) fehler.push(`${wo}: Antworten fehlen`);
  if (frage?.typ === 'janein' && frage.wirkung) {
    pruefeWirkungen(frage.wirkung.ja, `${wo} ja`, fehler);
    pruefeWirkungen(frage.wirkung.nein, `${wo} nein`, fehler);
  }
  (frage?.optionen || []).forEach((option) => pruefeWirkungen(option.wirkung, `${wo} ${option.id}`, fehler));
  (frage?.folge || []).forEach((folge) => {
    if (!folge.bedingung) fehler.push(`Folgefrage ${folge.id}: Bedingung fehlt`);
    pruefeFrage(folge, ids, fehler);
  });
}

// Prüft eine Definition. Liefert die Liste der Mängel (leer: in Ordnung).
// Gerüste (bereit: false) brauchen nur sparte, versicherer und kennzeile.
export function pruefeDefinition(definition) {
  const fehler = [];
  if (!definition || typeof definition !== 'object') return ['Definition fehlt'];
  if (!SPARTEN.includes(definition.sparte)) fehler.push('sparte unbekannt');
  if (!definition.versicherer?.id || !definition.versicherer?.name) fehler.push('versicherer fehlt');
  if (!definition.kennzeile) fehler.push('kennzeile fehlt');
  if (!definition.bereit) return fehler;

  if (!definition.textfassung) fehler.push('textfassung fehlt');
  if (!(definition.tarife?.length > 0)) fehler.push('tarife fehlen');
  if (definition.beginn?.art !== 'monatsErster') fehler.push('beginn: nur monatsErster bekannt');
  if (!definition.alter) fehler.push('alter fehlt');
  const beitrag = definition.beitrag;
  if (!beitrag || (beitrag.art !== 'dienst' && typeof beitrag.berechne !== 'function' && !(beitrag.gruppen?.length > 0))) fehler.push('beitrag fehlt');
  if (beitrag?.gruppen) {
    beitrag.gruppen.forEach((gruppe, stelle) => {
      const preise = beitrag.regionen ? Object.values(gruppe.preise || {}) : [gruppe.preise];
      preise.forEach((zeile) => Object.entries(zeile || {}).forEach(([tarif, wert]) => {
        if (!definition.tarife.some((eintrag) => eintrag.id === tarif)) fehler.push(`beitrag gruppe ${stelle}: Tarif ${tarif} unbekannt`);
        if (typeof wert !== 'number' || !(wert > 0)) fehler.push(`beitrag gruppe ${stelle}: Preis ${tarif} ungültig`);
      }));
    });
  }
  const ids = new Set();
  (definition.gesundheit?.fragen || []).forEach((frage) => pruefeFrage(frage, ids, fehler));
  if (!(definition.gesundheit?.fragen?.length > 0)) fehler.push('gesundheit.fragen fehlen');
  if (!(definition.person?.felder?.length > 0) || !(definition.person?.anschrift?.length > 0)) fehler.push('person unvollständig');
  if (!definition.zahlung?.sepa) fehler.push('zahlung.sepa fehlt');
  if (!(definition.erklaerungen?.length > 0)) fehler.push('erklaerungen fehlen');
  if (!definition.absenden?.knopf) fehler.push('absenden fehlt');
  if (typeof definition.gesundheitFuerVertrag !== 'function') fehler.push('gesundheitFuerVertrag fehlt');
  return fehler;
}
