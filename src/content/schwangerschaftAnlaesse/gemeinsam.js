/**
 * Gemeinsame Bausteine der Schwangerschafts-Anlassseiten unter /schwangerschaft/…
 * Seitenplan: Healio/Schwangerschaft-Mikroseiten/SEITENPLAN-BABY-GEPLANT.md
 * (Faktenblatt Abschnitt 1, Quellen mit Abruf am 11.11.2026).
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 */

export const SCHWANGERSCHAFT_ANLASS_BASIS_PFAD = '/schwangerschaft';
export const SCHWANGERSCHAFT_SEITE_PFAD = '/schwangerschaft';
export const QUELLENSTAND = '11.11.2026';

// kurz: Linktext in der Faktenkarte. label: Eintrag in der Quellenliste, davor
// steht je Seite, wofür die Quelle dort steht. href null: Die Quelle wird ohne
// Link genannt (Vermittlerunterlage oder Auskunft, Plan 1.2).
export const QUELLEN = {
  avb: {
    kurz: 'Bayerische AVB 2025',
    label: 'Die Bayerische, Allgemeine Versicherungsbedingungen 2025 (B 275000), § 1 bis § 3',
    href: 'https://www.diebayerische.de/dam/jcr:0159d4a8-b666-4f77-a345-9acdb8e95608/275000_allgemeine_versicherungsbedingungen_krankheitskostenversicherung.pdf',
  },
  tbPrestige: {
    kurz: 'Bayerische Tarifbedingungen Prestige',
    label: 'Die Bayerische, Tarifbedingungen Prestige 2025 (B 275006)',
    href: 'https://www.diebayerische.de/dam/jcr:4195af63-fc92-4395-88fc-8db70f6a0d47/275006_besondere_tarifbedingungen_krankenhauszusatzversicherung_2025_prestige.pdf',
  },
  tbKomfort: {
    kurz: 'Bayerische Tarifbedingungen Komfort',
    label: 'Die Bayerische, Tarifbedingungen Komfort 2025 (B 275005)',
    href: 'https://www.diebayerische.de/dam/jcr:d6054602-ee8e-4fe9-ab8a-3f01aec1bdef/275005_besondere_tarifbedingungen-krankenhauszusatzversicherung_2025_komfort.pdf',
  },
  steckbrief: {
    kurz: 'Bayerische Produktsteckbrief',
    label: 'Die Bayerische, Produktsteckbrief Krankenhauszusatzversicherung (B 275010, Stand 08.2025)',
    href: null,
  },
  auskunft: {
    kurz: 'Auskunft der Bayerischen',
    label: 'Auskunft der Bayerischen an Healio vom Oktober 2026',
    href: null,
  },
  sdkSp1: {
    kurz: 'SDK Tarifbedingungen SP1',
    label: 'SDK, Tarifbedingungen SP1 (1.754a, Stand 01.08.2025)',
    href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-SP1-1.754a.pdf',
  },
  sdkI: {
    kurz: 'SDK AVB Teil I',
    label: 'SDK, Allgemeine Versicherungsbedingungen Teil I (1.751)',
    href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Kranken-Zusatzversicherung-1.751.pdf',
  },
  vvg198: {
    kurz: '§ 198 VVG',
    label: '§ 198 VVG',
    href: 'https://www.gesetze-im-internet.de/vvg_2008/__198.html',
  },
  vvg19: {
    kurz: '§ 19 VVG',
    label: '§ 19 VVG',
    href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html',
  },
  sgb24f: {
    kurz: '§ 24f SGB V',
    label: '§ 24f SGB V',
    href: 'https://www.gesetze-im-internet.de/sgb_5/__24f.html',
  },
};

// Titel der Ratgeber (listTitle aus dem Ratgeber-Register, vom Prüfskript gegengelesen).
export const RATGEBER_TITEL = {
  'baby-geplant-zusatzversicherung': 'Baby geplant: Klinikschutz vor der Schwangerschaft abschließen',
  'familienzimmer-krankenhaus': 'Familienzimmer im Krankenhaus: Kosten und wer zahlt',
  'neugeborenes-versichern': 'Neugeborenes versichern: Kasse, Zusatzversicherung und Fristen',
  'krankenhauszusatzversicherung-kinder': 'Krankenhauszusatzversicherung für Kinder und Familien',
};

// Anlassseiten für die Karte am Ende der Ratgeber (Plan 6.1).
export const ANLAESSE = [
  {
    slug: 'baby-geplant',
    path: '/schwangerschaft/baby-geplant',
    label: 'Baby geplant',
    kurz: 'Ausrechnen, ab welchem Tag Entbindung und Baby im Klinikschutz versichert sind, und online abschließen.',
    linkLabel: 'Stichtag ausrechnen',
    motiv: 'family',
  },
];

export const SCHWANGERSCHAFT_ANLASS_UEBERSCHRIFT_RATGEBER = 'Die passende Seite für euren Plan';
