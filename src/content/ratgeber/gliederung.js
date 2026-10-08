/**
 * Gliederung des Ratgebers /ratgeber: welche Artikel veröffentlicht sind, in
 * welcher Reihenfolge sie stehen und zu welcher Themengruppe sie gehören.
 * Das ist die einzige Datei, die für einen neuen Artikel von Hand ergänzt wird.
 *
 * Neuer Artikel in zwei Handgriffen:
 *   1. Inhaltsdatei src/content/ratgeber/<slug>.js anlegen, im gleichen
 *      Format wie die Zahn-Ratgeber der Welle 1 (export const article = {
 *      slug, kind, metaTitle, metaDescription, publishedAt, listTitle,
 *      listTeaser, headline, ... }). Dateiname und slug sind gleich.
 *   2. Den Slug hier eintragen: in die slugs einer Gruppe (RATGEBER_GROUPS)
 *      oder, ohne Gruppe, in RATGEBER_EINZELARTIKEL. Die Stelle bestimmt die
 *      Reihenfolge in der Übersicht.
 *
 * Von Hand dazu (Abschnitt 10 in Healio/Marktanalyse-2026-10/
 * PRODUKTION-RATGEBER.md): Karte auf der Bereichsseite der Gruppe, Zielbegriff
 * in SERIEN_ZIELBEGRIFFE und Slug in OPT_IN_SLUGS des Vertragstests
 * (scripts/check-ratgeber-contract.mjs), Eintrag in public/llms.txt.
 *
 * Alles Weitere leitet scripts/build-ratgeber-registry.mjs aus den
 * Inhaltsdateien ab. Es läuft automatisch vor npm run build und npm run dev,
 * von Hand mit npm run ratgeber:register, und schreibt:
 *   - registry.js           schlanke Metadaten aller Artikel, ohne Artikeltext,
 *   - registry.overview.js  genau das, was die Übersicht /ratgeber zeigt,
 *   - registry.loaders.js   je Slug ein dynamischer Import; jede Artikelseite
 *                           lädt damit nur ihren eigenen Chunk,
 *   - public/sitemap.xml    den markierten Block der indexierten Ratgeber.
 * Seitentitel, Beschreibung, robots und strukturierte Daten liest
 * scripts/seo-routes.mjs direkt aus der Inhaltsdatei. npm run test:ratgeber
 * prüft, dass Inhaltsdateien, Gliederung und erzeugte Dateien zusammenpassen;
 * eine Inhaltsdatei ohne Eintrag hier lässt Prüfung und Build scheitern.
 *
 * kind steuert Hinweis und Indexierung:
 *   'advertorial' -> "Anzeige · Ratgeber von Healio", noindex, nicht in der Sitemap
 *   'ratgeber'    -> "Ratgeber von Healio", indexiert, in der Sitemap
 *
 * Die Seiten der Website importieren diese Datei nicht, sondern nur die
 * erzeugten Dateien (Übersicht und Ladeaufrufe) und paths.js.
 */

// Je Themengruppe zeigt /ratgeber die Bereichsseite und danach höchstens so
// viele weitere Artikel der Gruppe (in der Reihenfolge von slugs), dazu den
// Link „Alle anzeigen“ zur Bereichsseite. So bleibt die Übersicht gleich
// schwer, egal wie viele Artikel eine Gruppe bekommt.
export const RATGEBER_OVERVIEW_PER_GROUP = 6;

// Artikel ohne Themengruppe, in der Reihenfolge der Übersicht. Der erste ist
// dort der Leitartikel. Das Advertorial bleibt in der Liste, wird dort aber
// als Anzeige gekennzeichnet.
export const RATGEBER_EINZELARTIKEL = [
  'ikk-classic-bonusprogramm-2026',
  'mkk-bonusprogramm-2026',
  'aok-bonusprogramm-2026',
  'tk-bonusprogramm-2026',
  'barmer-bonusprogramm-2026',
  // schwanger-zusatzversicherung, schwangerschaft-was-steht-mir-zu und
  // hebamme-kosten-krankenkasse stehen seit Stapel 2 (07.10.2026) in der
  // Gruppe familie, weil die Bereichsseite zusatzversicherung-kinder sie in
  // Karten führt und babybonus-krankenkasse sie als Nachbarn braucht.
  'schwangerschaft-worauf-achten',
  'krankenkassen-bonus-zusatzversicherung',
];

// Themengruppen der Übersicht /ratgeber. Jede Gruppe hat einen eigenen
// Abschnitt mit Sprungmarke #ratgeber-<id>. hubSlug ist die Bereichsseite der
// Gruppe; sie steht in slugs und erscheint in der Übersicht immer zuerst.
export const RATGEBER_GROUPS = [
  {
    id: 'zaehne',
    title: 'Zähne',
    intro: 'Was die Kasse beim Zahnarzt zahlt, was an dir hängen bleibt und wann eine Zahnzusatzversicherung hilft. Mit Kosten, Quellen und den Grenzen.',
    icon: 'dental',
    hubSlug: 'zahnersatz-kosten',
    slugs: [
      'zahnersatz-kosten',
      'professionelle-zahnreinigung-kosten',
      'zahnimplantat-kosten',
      'wurzelbehandlung-kosten',
      'zahnkrone-kosten',
      'bonusheft-zahnarzt',
      'zahnzusatzversicherung-ohne-wartezeit',
      'zahnzusatzversicherung-fehlender-zahn',
      // Serie Stapel 1 (07.10.2026): erst die Grundsatzfrage, dann die
      // beiden Tarife, dann die Kassen. Hinten angehängt, damit die Übersicht
      // (Bereichsseite plus sechs Karten) gleich bleibt.
      'zahnzusatzversicherung-lohnt-sich',
      'ukv-zahnzusatzversicherung',
      'bayerische-zahnzusatzversicherung',
      'aok-zahnzusatzversicherung',
      'dak-zahnreinigung',
      // Serie Stapel 2, Zahnkosten (07.10.2026): erst die Versorgungen, dann
      // Überblick und Härtefall. Wieder hinten angehängt.
      'zahnbruecke-kosten',
      'zahnprothese-kosten',
      'zahnfuellung-kosten',
      'parodontitis-behandlung-kosten',
      'zahnersatz-moeglichkeiten',
      'zahnersatz-haertefall',
    ],
  },
  // Serie Stapel 2 (07.10.2026): fünf neue Gruppen mit eigener Bereichsseite.
  {
    id: 'ambulant',
    title: 'Heilpraktiker und Naturheilkunde',
    intro: 'Was Heilpraktiker, Osteopathie, Akupunktur und Physiotherapie kosten, was die Kasse dazugibt und wann ein ambulanter Tarif hilft. Mit Kosten, Quellen und den Grenzen.',
    icon: 'naturopathy',
    hubSlug: 'heilpraktiker-kosten',
    slugs: [
      'heilpraktiker-kosten',
      'heilpraktiker-zusatzversicherung',
      'ambulante-zusatzversicherung',
      'akupunktur-kosten',
      'tk-osteopathie',
      'chiropraktiker-kosten',
      'physiotherapie-zuzahlung',
      'gebuehrenordnung-heilpraktiker',
    ],
  },
  {
    id: 'krankenhaus',
    title: 'Krankenhaus',
    intro: 'Was die Kasse im Krankenhaus zahlt, was Zuzahlung, Einbettzimmer und Reha kosten und wann eine stationäre Zusatzversicherung hilft. Mit Quellen und den Grenzen.',
    icon: 'hospital',
    hubSlug: 'stationaere-zusatzversicherung',
    slugs: [
      'stationaere-zusatzversicherung',
      'einzelzimmer-krankenhaus-kosten',
      'zusatzversicherung-einzelzimmer',
      'krankenhaustagegeld',
      'reha-zuzahlung',
    ],
  },
  {
    id: 'familie',
    title: 'Schwangerschaft und Familie',
    intro: 'Was Kasse und Zusatzschutz rund um Schwangerschaft, Baby und Kinder leisten, wie ein Babybonus funktioniert und worauf es beim Nachversichern ankommt.',
    icon: 'family',
    hubSlug: 'zusatzversicherung-kinder',
    slugs: [
      'zusatzversicherung-kinder',
      // Stapel familienplanung (07.10.2026), Ziel des Werbetests, daher vorn.
      'baby-geplant-zusatzversicherung',
      'neugeborenes-versichern',
      'familienzimmer-krankenhaus',
      'babybonus-krankenkasse',
      // Auftrag Frank 08.10.2026, Rufbereitschaft der Hebamme.
      'hebamme-rufbereitschaft',
      // Ältere Artikel ohne Vorlage (AELTERE_GRUPPENARTIKEL im Vertragstest).
      'schwanger-zusatzversicherung',
      'schwangerschaft-was-steht-mir-zu',
      'hebamme-kosten-krankenkasse',
    ],
  },
  {
    id: 'vorsorge',
    title: 'Vorsorge',
    intro: 'Welche Vorsorgeuntersuchungen die Kasse in welchem Alter zahlt, was privat bleibt und wann Satzungsleistungen oder ein ambulanter Tarif helfen. Mit Quellen und Stand.',
    icon: 'prevention',
    hubSlug: 'vorsorgeuntersuchung',
    slugs: [
      'vorsorgeuntersuchung',
      'vorsorgeuntersuchung-frauen',
      'vorsorgeuntersuchung-maenner',
      'hautkrebsscreening',
      'tk-reiseimpfung',
    ],
  },
  {
    id: 'brille',
    title: 'Brille',
    intro: 'Wann die Kasse bei der Brille zahlt, was Gläser und Gleitsicht kosten und wann sich ein Tarif für Sehhilfen lohnt. Mit Rechenbeispielen und Quellen.',
    icon: 'glasses',
    hubSlug: 'brille-krankenkasse',
    slugs: [
      'brille-krankenkasse',
      'brillenversicherung',
      'gleitsichtbrille-kosten',
    ],
  },
];

// Alle veröffentlichten Slugs in Registerreihenfolge: erst die Einzelartikel,
// dann die Gruppen.
export const RATGEBER_SLUGS = [
  ...RATGEBER_EINZELARTIKEL,
  ...RATGEBER_GROUPS.flatMap((group) => group.slugs),
];
