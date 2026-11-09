/**
 * Gemeinsame Bausteine der sechs Anfrageseiten unter /altersvorsorgedepot/…
 * Seitenplan: Healio/Altersvorsorgedepot-Funnel/UNTERSEITEN-SEITENPLAN.md
 *
 * Quellen stammen aus der Quellenprüfung vom 08.10.2026
 * (Healio/Altersvorsorgedepot-Funnel/RATGEBER-QUELLENPRÜFUNG-2026-10-08.md),
 * § 18 EStG zusätzlich am 09.11.2026 direkt gegengelesen.
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 */

export const ZIELGRUPPEN_BASIS_PFAD = '/altersvorsorgedepot';
export const ZIELGRUPPEN_QUELLENSTAND = '8. Oktober 2026';
export const ZIELGRUPPEN_VEROEFFENTLICHT = '2026-11-09';

// kurz: Linktext in der Zahlenkarte. label: Eintrag in der Quellenliste, davor
// steht je Seite, wofür die Quelle dort steht.
export const QUELLEN = {
  gesetz: {
    kurz: 'Gesetzesbeschluss',
    label: 'Gesetzesbeschluss, Bundesrats-Drucksache 206/26',
    href: 'https://dserver.bundestag.de/brd/2026/0206-26.pdf',
  },
  regierung: {
    kurz: 'Bundesregierung',
    label: 'Bundesregierung, Reform der privaten Altersvorsorge',
    href: 'https://www.bundesregierung.de/breg-de/aktuelles/reform-private-altersvorsorge-2400072',
  },
  bmf: {
    kurz: 'Bundesfinanzministerium',
    label: 'Bundesfinanzministerium, Fragen zur Reform',
    href: 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/reform-der-privaten-altersvorsorge.html',
  },
  zfa: {
    kurz: 'Zulagenstelle',
    label: 'Zentrale Zulagenstelle, Fragen zur Reform',
    href: 'https://riester.deutsche-rentenversicherung.de/DE/FAQ/FAQ_artikel',
  },
  zfaFoerderung: {
    kurz: 'Rentenversicherung',
    label: 'Rentenversicherung, staatliche Förderung',
    href: 'https://riester.deutsche-rentenversicherung.de/DE/Lohnt-sich-Riester/Staatliche-Foerderung-fuer-Sie/staatliche-foerderung-fuer-sie',
  },
  zfaKuendigen: {
    kurz: 'Zulagenstelle: Kündigen',
    label: 'Rentenversicherung, Kündigen oder nicht kündigen',
    href: 'https://riester.deutsche-rentenversicherung.de/DE/Riester-optimieren/Kuendigen-oder-nicht-kuendigen',
  },
  zfaWechsel: {
    kurz: 'Zulagenstelle: Wechsel',
    label: 'Rentenversicherung, Anbieter- oder Tarifwechsel',
    href: 'https://riester.deutsche-rentenversicherung.de/DE/Riester-optimieren/Anbieter-oder-Tarifwechsel/anbieter-oder-tarifwechsel_node',
  },
  zfaJahr: {
    kurz: 'Das Riester-Jahr',
    label: 'Rentenversicherung, Das Riester-Jahr',
    href: 'https://riester.deutsche-rentenversicherung.de/DE/So-geht-Riester/Das-Riester-Jahr/das-riester-jahr_node',
  },
  drvReform: {
    kurz: 'Reformgesetz',
    label: 'Rentenversicherung, Altersvorsorge-Reformgesetz',
    href: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Moeglichkeiten-der-Altersvorsorge/Altervorsorgereformgesetz',
  },
  rv84: {
    kurz: '§ 84 EStG',
    label: '§ 84 EStG ab 2027',
    href: 'https://rvrecht.deutsche-rentenversicherung.de/SharedDocs/rvRecht/05_Normen_und_Vertraege/02_C-K/EStG/0084/0084_2027_01_01.html',
  },
  rv85: {
    kurz: '§ 85 EStG',
    label: '§ 85 EStG ab 2027',
    href: 'https://rvrecht.deutsche-rentenversicherung.de/SharedDocs/rvRecht/05_Normen_und_Vertraege/02_C-K/EStG/0085/0085_2027_01_01.html',
  },
  rv10a: {
    kurz: '§ 10a EStG',
    label: '§ 10a EStG ab 2027',
    href: 'https://rvrecht.deutsche-rentenversicherung.de/SharedDocs/rvRecht/05_Normen_und_Vertraege/02_C-K/EStG/0010a/0010a_2027_01_01.html',
  },
  estg85: {
    kurz: 'Zuordnung',
    label: '§ 85 EStG, geltende Fassung',
    href: 'https://www.gesetze-im-internet.de/estg/__85.html',
  },
  estg89: {
    kurz: '§ 89 EStG',
    label: '§ 89 EStG',
    href: 'https://www.gesetze-im-internet.de/estg/__89.html',
  },
  estg10: {
    kurz: '§ 10 EStG',
    label: '§ 10 EStG',
    href: 'https://www.gesetze-im-internet.de/estg/__10.html',
  },
  estg18: {
    kurz: '§ 18 EStG',
    label: '§ 18 EStG',
    href: 'https://www.gesetze-im-internet.de/estg/__18.html',
  },
  kindergeld: {
    kurz: 'Familienportal',
    label: 'Familienportal des Bundes, Kindergeld',
    href: 'https://familienportal.de/familienportal/familienleistungen/kindergeld/faq/bis-zu-welchem-alter-meines-kindes-bekomme-ich-kindergeld--124966',
  },
};

// Ratgeber, auf die die Unterseiten verweisen. Titel wie im Ratgeber.
export const RATGEBER_TITEL = {
  'altersvorsorgedepot-kinderzulage': 'Kinderzulage im Altersvorsorgedepot: Was bekommen Eltern ab 2027?',
  'altersvorsorgedepot-kinderzulage-elternteil': 'Welcher Elternteil bekommt die Kinderzulage im Altersvorsorgedepot?',
  'altersvorsorgedepot-kindergeld-ende': 'Kindergeld endet: Was ändert sich bei der Förderung deiner Altersvorsorge?',
  'altersvorsorgedepot-selbststaendige': 'Altersvorsorgedepot für Selbstständige: Wer bekommt ab 2027 eine Zulage?',
  'altersvorsorgedepot-heilpraktiker': 'Altersvorsorgedepot für Heilpraktiker: Was passt neben die Praxis?',
  'altersvorsorgedepot-schwankendes-einkommen': 'Schwankendes Einkommen: Wie planst du den Beitrag fürs Altersvorsorgedepot?',
  'altersvorsorgedepot-oder-ruerup': 'Altersvorsorgedepot oder Rürup-Rente: Was passt ab 2027 zu dir?',
  'riester-altersvorsorgedepot-wechsel': 'Riester ins Altersvorsorgedepot wechseln: Ablauf und Kosten ab 2027',
  'riester-alte-oder-neue-foerderung': 'Riester: Ist die alte oder die neue Förderung günstiger?',
  'altersvorsorgedepot-garantie': 'Altersvorsorgedepot mit oder ohne Garantie: Was der Unterschied für dich bedeutet',
  'altersvorsorgedepot-foerderung': 'Altersvorsorgedepot 2027: Wie viel Förderung bekommst du?',
  'altersvorsorgedepot-wer-ist-berechtigt': 'Wer ist beim Altersvorsorgedepot förderberechtigt?',
  'altersvorsorgedepot-etf-sparplan': 'Altersvorsorgedepot oder ETF-Sparplan: Erst das Ziel, dann der Vertrag',
  'altersvorsorgedepot-teilzeit-elternzeit': 'Altersvorsorgedepot in Teilzeit oder Elternzeit: Worauf kommt es an?',
  'altersvorsorgedepot-passt-das-zu-mir': 'Passt das Altersvorsorgedepot zu mir? Fünf Fragen vor deiner Entscheidung',
  'riester-kuendigen-oder-behalten': 'Riester kündigen oder behalten: Welche Entscheidung passt?',
  'riester-jahresmitteilung-checkliste': 'Riester-Jahresmitteilung prüfen: Eine praktische Checkliste',
  'altersvorsorgedepot-geld-entnehmen': 'Altersvorsorgedepot: Was gilt, wenn du vor der Rente an dein Geld musst?',
  'altersvorsorgedepot-was-ist-das': 'Was ist das Altersvorsorgedepot und wie funktioniert es?',
  'altersvorsorgedepot-steuern': 'Altersvorsorgedepot und Steuern: Absetzen und Auszahlung ab 2027',
};

// Die acht Eingänge (Zielgruppen und Anlässe). label: kurzer Linktext, kurz: Unterzeile auf der Hauptseite.
export const EINGAENGE = [
  { slug: 'eltern', label: 'Eltern', kurz: 'Bis zu 300 EUR je Kind und Jahr', motiv: 'kinderzulage' },
  { slug: 'selbststaendige', label: 'Selbstständige und Heilpraktiker', kurz: 'Ab 2027 neu förderberechtigt', motiv: 'selbststaendige' },
  { slug: 'riester', label: 'Riester-Vertrag', kurz: 'Umzug ins neue Depot prüfen', motiv: 'riester' },
  { slug: 'unter-25', label: 'Unter 25', kurz: '200 EUR Startbonus, einmalig', motiv: 'startbonus' },
  { slug: 'ehepartner', label: 'Ehepartner ohne eigene Förderung', kurz: 'Bis zu 175 EUR Zulage über den Partner', motiv: 'zulage' },
  { slug: 'elternzeit', label: 'Elternzeit', kurz: 'Zulage auch ohne Gehalt', motiv: 'familien' },
  { slug: 'kindergeld-endet', label: 'Kindergeld endet', kurz: 'Grundzulage bleibt, Kind kann starten', motiv: 'startplan' },
  { slug: 'riester-kuendigen', label: 'Riester kündigen?', kurz: 'Erst prüfen, was es kostet', motiv: 'entscheidung' },
].map((eingang) => ({ ...eingang, path: `${ZIELGRUPPEN_BASIS_PFAD}/${eingang.slug}` }));
