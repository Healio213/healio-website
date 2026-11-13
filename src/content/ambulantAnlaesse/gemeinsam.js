/**
 * Gemeinsame Bausteine der Ambulant-Anlassseiten unter /ambulant/…
 * Seitenplan: Healio/Ambulant-Mikroseiten/SEITENPLAN-OSTEOPATHIE.md
 * (Faktenblatt Abschnitt 1, Quellen mit Abruf am 13.11.2026).
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 */

export const AMBULANT_ANLASS_BASIS_PFAD = '/ambulant';
export const AMBULANT_SEITE_PFAD = '/ambulant';
export const QUELLENSTAND = '13.11.2026';

// kurz: Linktext in der Faktenkarte. label: Eintrag in der Quellenliste, davor
// steht je Seite, wofür die Quelle dort steht. href null: Die Quelle wird ohne
// Link genannt (Plan 1.2).
export const QUELLEN = {
  ap: {
    kurz: 'SDK Tarifbedingungen AP',
    label: 'SDK, Tarifbedingungen AP5, AP7, AP9 und AP1 (1.753a, Stand 01.01.2023)',
    href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
  },
  avb1: {
    kurz: 'SDK AVB Teil I',
    label: 'SDK, Allgemeine Versicherungsbedingungen Teil I (1.751)',
    href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Kranken-Zusatzversicherung-1.751.pdf',
  },
  gebueh: {
    kurz: 'Gebührenverzeichnis für Heilpraktiker',
    label: 'Gebührenverzeichnis für Heilpraktiker, Ziffer 35',
    href: 'https://www.alte-leipziger.de/gebueh.pdf',
  },
  beitrag: {
    kurz: 'SDK Beiträge nach Altersgruppe',
    label: 'SDK, Beiträge nach Altersgruppe (Stand 29.09.2026)',
    href: null,
  },
  sgb11: {
    kurz: '§ 11 Abs. 6 SGB V',
    label: '§ 11 Abs. 6 SGB V',
    href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
  },
  kassen: {
    kurz: 'Satzungen der Kassen',
    label: 'Satzungen der 15 Kassen im Rechner, Fundstelle je Kasse im Ergebnis',
    href: null,
  },
  preisAok: {
    kurz: 'AOK, Osteopathie',
    label: 'AOK, Osteopathie',
    href: 'https://www.aok.de/pk/leistungen/alternative-heilmethoden/osteopathie/',
  },
  preisVod: {
    kurz: 'Verband der Osteopathen Deutschland',
    label: 'Verband der Osteopathen Deutschland',
    href: 'https://www.osteopathie.de/behandlung',
  },
  vvg19: {
    kurz: '§ 19 VVG',
    label: '§ 19 VVG',
    href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html',
  },
};

// Titel der Ratgeber (listTitle aus dem Ratgeber-Register, vom Prüfskript gegengelesen).
export const RATGEBER_TITEL = {
  'osteopathie-krankenkasse': 'Osteopathie: Welche Krankenkasse übernimmt welche Kosten?',
  'osteopathie-kosten': 'Osteopathie: Was kostet eine Behandlung und wer zahlt?',
  'zusatzversicherung-osteopathie': 'Zusatzversicherung für Osteopathie prüfen',
};

// Anlassseiten für die Karte am Ende der Ratgeber (Plan 6.1).
export const ANLAESSE = [
  {
    slug: 'osteopathie',
    path: '/ambulant/osteopathie',
    label: 'Osteopathie: Kasse plus Tarif',
    kurz: 'Ausrechnen, was deine Kasse dazugibt, was der Tarif Ambulant übernimmt und was bei dir bleibt.',
    linkLabel: 'Jetzt ausrechnen',
    motiv: 'naturopathy',
  },
];

export const AMBULANT_ANLASS_UEBERSCHRIFT_RATGEBER = 'Dein Fall in Zahlen';
