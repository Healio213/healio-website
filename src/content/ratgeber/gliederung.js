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
  'schwanger-zusatzversicherung',
  'schwangerschaft-worauf-achten',
  'schwangerschaft-was-steht-mir-zu',
  'hebamme-kosten-krankenkasse',
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
    ],
  },
];

// Alle veröffentlichten Slugs in Registerreihenfolge: erst die Einzelartikel,
// dann die Gruppen.
export const RATGEBER_SLUGS = [
  ...RATGEBER_EINZELARTIKEL,
  ...RATGEBER_GROUPS.flatMap((group) => group.slugs),
];
