// SDK-Monatsbeiträge der ambulanten Tarife (AP5, AP7, AP9, AP1) nach
// Altersgruppe. Nur belegte Werte, nie interpolieren.
//
// Beitragslogik laut AVB AP-Tarife 1.753a/01.23, Abschnitt III.1: Maßgeblich
// ist das erreichte Alter (laufendes Kalenderjahr minus Geburtsjahr). Ab dem
// Kalenderjahr nach dem 20., 30., 40., 50., 60. und 70. Geburtstag gilt der
// Beitrag der nächsthöheren Gruppe. Keine Alterungsrückstellungen.
//
// Belege (Recherche 29.09.2026, zwei Suchwege plus Gegenprüfung):
// - Tabelle: SDK-Beitragstabelle 06/2020 (acio.de/archiv/tariffs/1095 bis 1097,
//   PDF mit SDK-Kopf) und deckungsgleich test-heilpraktikerversicherung.de
//   (alle vier Stufen) sowie heilpraktikerzusatz-versicherung.de (AP1, AP9).
// - 2026 bestätigt: 21 bis 30 alle Stufen (Abschlussstrecke 15.07.2026),
//   31 bis 40 alle Stufen (Abschlussstrecke 28.07.2026, Jahrgang 1990),
//   41 bis 50 alle Stufen (sdk.de-Tarifkarten 29.09.2026, Beispiel 43 Jahre
//   AP7, Versicherungsschein AP5), 51 bis 60 AP5 (sdk.de-Beispiel 51 Jahre),
//   0 bis 20 AP1 (Abschlussstrecke, Kind 8 Jahre). Übrige Zellen: Tabelle
//   06/2020, ohne Abweichung in irgendeiner Stichprobe.

export const SDK_AMBULANT_BEITRAEGE = {
  stand: '29.09.2026',
  gruppen: [
    { von: 0, bis: 20, AP5: 6.79, AP7: 10.13, AP9: 18.08, AP1: 20.76 },
    { von: 21, bis: 30, AP5: 10.36, AP7: 15.82, AP9: 27.44, AP1: 31.64 },
    { von: 31, bis: 40, AP5: 12.29, AP7: 18.71, AP9: 33.84, AP1: 39.19 },
    { von: 41, bis: 50, AP5: 14.14, AP7: 23.10, AP9: 37.95, AP1: 44.13 },
    { von: 51, bis: 60, AP5: 16.05, AP7: 25.71, AP9: 39.98, AP1: 46.62 },
    { von: 61, bis: 70, AP5: 18.87, AP7: 28.97, AP9: 43.29, AP1: 50.34 },
    { von: 71, bis: null, AP5: 21.00, AP7: 33.13, AP9: 43.91, AP1: 50.76 },
  ],
};

// Beispiel, solange niemand sein Geburtsjahr eingibt: Gruppe 21 bis 30, für
// die alle vier Stufen direkt aus der SDK-Abschlussstrecke belegt sind.
export const BEISPIEL_GRUPPE = SDK_AMBULANT_BEITRAEGE.gruppen[1];

export function parseGeburtsjahr(value, jahr = new Date().getFullYear()) {
  const text = String(value ?? '').trim();
  if (!/^\d{4}$/.test(text)) return null;
  const geburtsjahr = Number(text);
  return geburtsjahr <= jahr && geburtsjahr >= jahr - 110 ? geburtsjahr : null;
}

export function findeAltersgruppe(geburtsjahr, jahr = new Date().getFullYear()) {
  if (!Number.isInteger(geburtsjahr)) return null;
  const alter = jahr - geburtsjahr;
  return SDK_AMBULANT_BEITRAEGE.gruppen.find((gruppe) => alter >= gruppe.von && (gruppe.bis === null || alter <= gruppe.bis)) || null;
}

export function beitragInGruppe(gruppe, code) {
  const beitrag = gruppe?.[code];
  return typeof beitrag === 'number' ? beitrag : null;
}

export function beitragsSpanne(code) {
  const werte = SDK_AMBULANT_BEITRAEGE.gruppen.map((gruppe) => gruppe[code]).filter((wert) => typeof wert === 'number');
  return { min: Math.min(...werte), max: Math.max(...werte) };
}
