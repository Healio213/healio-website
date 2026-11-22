/**
 * Gemeinsame Bausteine der Zahn-Anlassseiten unter /zahn/…
 * Seitenplan: Healio/Zahn-Mikroseiten/SEITENPLAN-BEHANDLUNG-STEHT-AN.md
 * (Faktenblatt Abschnitt 1, Quellen mit Abruf am 10.11.2026).
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 */

export const ZAHN_ANLASS_BASIS_PFAD = '/zahn';
export const ZAHN_SEITE_PFAD = '/zahn';
export const ZAHN_ANLASS_QUELLENSTAND = '10.11.2026';
export const ZAHN_ANLASS_VEROEFFENTLICHT = '2026-11-10';

// kurz: Linktext in der Faktenkarte. label: Eintrag in der Quellenliste, davor
// steht je Seite, wofür die Quelle dort steht.
export const QUELLEN = {
  bbSofort: {
    kurz: 'Bedingungen ZAHN Sofort',
    label: 'Die Bayerische, Besondere Bedingungen ZAHN Sofort 2023 (B 261005)',
    href: 'https://www.diebayerische.de/dam/jcr:a4c467fb-8060-4ed2-afea-6d44757e1970/261005_besondere_bedignungen_zahn_sofort_2023.pdf',
  },
  hbStadt: {
    kurz: 'Highlightblatt Zahn',
    label: 'Die Bayerische, Highlightblatt Zahn (B 333551, Stand 07.2026)',
    href: 'https://www.diebayerische.de/dam/jcr:65e23042-960a-4478-90c7-a249e0b5f628/333551_highlightblatt_zahn_allgemein_regio1.pdf',
  },
  hbLand: {
    kurz: 'Highlightblatt Zahn Land',
    label: 'Die Bayerische, Highlightblatt Zahn Land (B 333552, Stand 07.2026)',
    href: 'https://www.diebayerische.de/dam/jcr:4960e375-18f8-4aa1-84c6-f5d6756f6f66/333552_highlightblatt_zahn_allgemein_regio2.pdf',
  },
  bbKomfort: {
    kurz: 'Bedingungen Zahn Komfort',
    label: 'Die Bayerische, Besondere Bedingungen Zahn Komfort 2023 (B 333502)',
    href: 'https://www.diebayerische.de/dam/jcr:bd6878a7-e7ef-41e0-8d88-6301ff62fc98/333502_besondere-bedingungen_zahn-komfort.pdf',
  },
  avb: {
    kurz: 'Allgemeine Versicherungsbedingungen',
    label: 'Die Bayerische, Allgemeine Versicherungsbedingungen 2023 (B 333500), § 2 und § 4',
    href: 'https://www.diebayerische.de/dam/jcr:3b9b640a-45fb-40c6-83b0-2dd2f208dd9e/333500_allgemeine_versicherungsbedingungen_fuer_die%20krankheitskostenversicherung_avb.pdf',
  },
  sgb55: {
    kurz: '§ 55 SGB V',
    label: '§ 55 SGB V',
    href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
  },
  bgbl228: {
    kurz: 'BGBl. 2026 I Nr. 228',
    label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
    href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
  },
};

// Titel der Ratgeber (listTitle aus dem Ratgeber-Register, vom Prüfskript gegengelesen).
export const RATGEBER_TITEL = {
  'zahnzusatzversicherung-laufende-behandlung': 'Zahnzusatzversicherung bei laufender Behandlung: Was geht?',
  'zahnzusatzversicherung-sofort-2026': 'Zahnzusatzversicherung sofort 2026: Was ab Tag eins zahlt',
  'heil-und-kostenplan': 'Heil- und Kostenplan: Wie liest du ihn richtig?',
  'bayerische-zahnzusatzversicherung': 'Bayerische Zahnzusatzversicherung mit ZAHN Sofort im Überblick',
  'bonusheft-zahnarzt': 'Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse',
  'zahnersatz-haertefall': 'Härtefall beim Zahnersatz: Einkommensgrenze, Antrag, Rechenbeispiel',
};

// Anlassseiten für die Karte am Ende der Ratgeber (Plan 6.1).
export const ANLAESSE = [
  {
    slug: 'behandlung-steht-an',
    path: '/zahn/behandlung-steht-an',
    label: 'Behandlung steht an',
    // 22.11.2026 (Zahn an): ohne „abschließen“, denn die Karte führt zur Anlassseite, nicht direkt in den Antrag.
    kurz: 'Heil- und Kostenplan nachrechnen und den Sofortschutz rechtzeitig beantragen, damit der Versicherungsbeginn vor der Rechnung liegt.',
    linkLabel: 'Plan nachrechnen',
    motiv: 'dental',
  },
];

export const ZAHN_ANLASS_UEBERSCHRIFT_RATGEBER = 'Die passende Seite für deinen Fall';
