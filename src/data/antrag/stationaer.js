// GERÜST, NICHT FERTIG: Produktdefinition der Antragsmaske stationär (12.11.2026).
//
// Die Original-Strecke der SDK für SP1, SP2 und SPU (Level Nine, Exklusivlink
// 901334) wird gerade erfasst (Healio/Antragsstrecken/originale/levelnine/).
// Bis Fragen im Wortlaut, Wirkungen, Beitragstabelle nach Eintrittsalter,
// Altersgrenzen, Beginnregeln und Pflichttexte vorliegen, bleibt bereit:
// false. Dann zeigt /antrag/stationaer keine Strecke, und die Wahl „Allein
// abschließen“ führt wie heute zum Rechner der SDK. Hier steht bewusst nichts
// Erfundenes. Aufbau: aufbau.js.

const stationaer = {
  sparte: 'stationaer',
  bereit: false,
  versicherer: { id: 'sdk', name: 'Süddeutsche Krankenversicherung a. G. (SDK)', kurz: 'SDK' },
  kennzeile: 'Klinikschutz der SDK',
  seitentitel: 'Antrag Klinikschutz | Healio',
  beschreibung: 'Dein Antrag auf den Klinikschutz der SDK.',
  // Tarifkennungen wie im Abschlusslink (src/lib/sdk-url.js), sonst nichts.
  tarifKennungen: ['SP1', 'SP2', 'SPU'],
  offen: [
    'Fragen der Original-Strecke im Wortlaut mit Folgefragen und Wirkung je Antwort',
    'Beitragstabelle SP1, SP2, SPU nach Eintrittsalter (nur Beispielwerte für 30 Jahre bekannt)',
    'Altersgrenzen und Regeln zum Versicherungsbeginn',
    'Pflichttexte und Unterlagen mit Links',
  ],
};

export default stationaer;
