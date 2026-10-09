/**
 * Erzeugt aus den Inhaltsdateien und src/content/ratgeber/gliederung.js die
 * abgeleiteten Dateien des Ratgebers. Reine Funktion ohne Schreibzugriff:
 * scripts/build-ratgeber-registry.mjs schreibt die Ergebnisse, der
 * Vertragstest vergleicht sie mit dem Stand auf der Platte.
 *
 * Ablauf für neue Artikel: siehe Kopfkommentar in gliederung.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  RATGEBER_EINZELARTIKEL,
  RATGEBER_GROUPS,
  RATGEBER_OVERVIEW_PER_GROUP,
  getRatgeberArticle,
  ratgeberArticles,
} from './ratgeber-articles.mjs';

export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const REGISTRY_FILE = 'src/content/ratgeber/registry.js';
export const OVERVIEW_FILE = 'src/content/ratgeber/registry.overview.js';
export const LOADERS_FILE = 'src/content/ratgeber/registry.loaders.js';
export const ALTERSVORSORGE_RELATED_FILE = 'src/content/ratgeber/altersvorsorge/related.js';
export const SITEMAP_FILE = 'public/sitemap.xml';

export const SITEMAP_BLOCK_START = '<!-- Ratgeberartikel: automatisch aus src/content/ratgeber/gliederung.js (npm run ratgeber:register), nicht von Hand bearbeiten -->';
export const SITEMAP_BLOCK_END = '<!-- /Ratgeberartikel -->';

const SITE_URL = 'https://healio.de';

const GENERATED_NOTE = [
  ' * AUTOMATISCH ERZEUGT von scripts/build-ratgeber-registry.mjs. Nicht von Hand',
  ' * bearbeiten: Quelle sind die Inhaltsdateien und gliederung.js (Ablauf für',
  ' * neue Artikel dort im Kopfkommentar).',
].join('\n');

const groupOf = new Map(RATGEBER_GROUPS.flatMap((group) => group.slugs.map((slug) => [slug, group.id])));

const pick = (source, fields) => Object.fromEntries(
  fields
    .filter((field) => source[field] !== undefined && source[field] !== null)
    .map((field) => [field, source[field]]),
);

// Felder einer Karte in der Übersicht.
const OVERVIEW_FIELDS = ['slug', 'kind', 'listTitle', 'listTeaser', 'readingTimeMinutes'];

// Schlanke Metadaten je Artikel: Übersicht, Links, Gruppen, Weiterlesen,
// Sitemap und Prüfungen. Kein Artikeltext.
const REGISTRY_FIELDS = [
  'slug',
  'kind',
  'group',
  'cluster',
  'listTitle',
  'listTeaser',
  'readingTimeMinutes',
  'metaTitle',
  'metaDescription',
  'publishedAt',
  'updatedAt',
];

const json = (value) => JSON.stringify(value, null, 2);

export const registryEntryFor = (article) => pick({ ...article, group: groupOf.get(article.slug) || null }, REGISTRY_FIELDS);

const buildRegistrySource = () => `/**
${GENERATED_NOTE}
 *
 * Schlanke Metadaten aller veröffentlichten Ratgeberartikel in
 * Registerreihenfolge (Einzelartikel, dann die Gruppen), ohne Artikeltext.
 * Für Links, Gruppen, Weiterlesen-Listen und Prüfungen. Die Übersicht lädt
 * registry.overview.js, eine Artikelseite registry.loaders.js; diese Datei
 * gehört in keine der beiden, damit sie mit neuen Artikeln nicht wachsen.
 */

export { RATGEBER_GROUPS } from './gliederung.js';
export { RATGEBER_BASE_PATH, getRatgeberPath } from './paths.js';

export const RATGEBER_ENTRIES = ${json(ratgeberArticles.map(registryEntryFor))};

const ENTRIES_BY_SLUG = new Map(RATGEBER_ENTRIES.map((entry) => [entry.slug, entry]));

export const getRatgeberEntry = (slug) => ENTRIES_BY_SLUG.get(slug) || null;
`;

export const buildOverviewData = () => {
  const card = (slug) => pick(getRatgeberArticle(slug), OVERVIEW_FIELDS);
  return {
    single: RATGEBER_EINZELARTIKEL.map(card),
    groups: RATGEBER_GROUPS.map((group) => {
      const rest = group.slugs.filter((slug) => slug !== group.hubSlug);
      return {
        ...pick(group, ['id', 'title', 'intro', 'icon', 'hubSlug']),
        total: group.slugs.length,
        entries: [group.hubSlug, ...rest.slice(0, RATGEBER_OVERVIEW_PER_GROUP)].map(card),
      };
    }),
  };
};

const buildOverviewSource = () => `/**
${GENERATED_NOTE}
 *
 * Genau das, was die Übersicht /ratgeber zeigt: alle Einzelartikel und je
 * Themengruppe die Bereichsseite plus die nächsten
 * RATGEBER_OVERVIEW_PER_GROUP (${RATGEBER_OVERVIEW_PER_GROUP}) Artikel. total ist die Zahl aller Artikel
 * der Gruppe; ist sie größer als entries, zeigt die Übersicht „Alle anzeigen“.
 */

export const RATGEBER_OVERVIEW = ${json(buildOverviewData())};
`;

const buildLoadersSource = () => `/**
${GENERATED_NOTE}
 *
 * Je veröffentlichtem Slug ein dynamischer Import. Vite legt dadurch jede
 * Inhaltsdatei in einen eigenen Chunk, und eine Artikelseite lädt nur ihren.
 * Nur src/pages/RatgeberArtikelPage.jsx importiert diese Datei.
 */

export const RATGEBER_LOADERS = new Map([
${ratgeberArticles.map((article) => `  ['${article.slug}', () => import('./${article.slug}.js')],`).join('\n')}
]);

// Themengruppe je Slug (nur Artikel mit Gruppe). Die Vorlage wählt damit die
// Rechner-Karte am Ende des Artikels (src/content/ratgeber/rechnerWege.js),
// ohne die Gliederung oder das Register zu laden.
export const RATGEBER_GROUP_OF = new Map([
${ratgeberArticles.filter((article) => groupOf.has(article.slug)).map((article) => `  ['${article.slug}', '${groupOf.get(article.slug)}'],`).join('\n')}
]);
`;

// Die Artikelvorlage benötigt nur die Titel der Altersvorsorge-Querverweise.
// Das vollständige Register mit Metadaten aller Fachbereiche bleibt draußen.
const buildAltersvorsorgeRelatedSource = () => `/**
${GENERATED_NOTE}
 * Nur die Titel der Altersvorsorge-Ratgeber für ihre Querverweise, ohne
 * Volltexte oder das vollständige Website-Register.
 */

const TITLES = new Map(${json(ratgeberArticles
  .filter((article) => article.topic === 'altersvorsorge')
  .map((article) => [article.slug, article.listTitle]))});

export const getAltersvorsorgeRelatedTitle = (slug) => TITLES.get(slug) || null;
`;

const sitemapEntry = (article) => [
  '  <url>',
  `    <loc>${SITE_URL}/ratgeber/${article.slug}</loc>`,
  `    <lastmod>${article.updatedAt || article.publishedAt}</lastmod>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.7</priority>',
  '  </url>',
].join('\n');

/**
 * Ersetzt den markierten Ratgeber-Block der Sitemap. Indexiert sind alle
 * Artikel mit kind 'ratgeber'; Advertorials bleiben draußen. lastmod ist das
 * Änderungsdatum, sonst das Erscheinungsdatum.
 */
export const updateSitemap = (sitemap) => {
  const start = sitemap.indexOf(SITEMAP_BLOCK_START);
  const end = sitemap.indexOf(SITEMAP_BLOCK_END);
  if (start < 0 || end < start) {
    throw new Error(`${SITEMAP_FILE}: Markierung des Ratgeber-Blocks fehlt (${SITEMAP_BLOCK_START} ... ${SITEMAP_BLOCK_END}).`);
  }
  const entries = ratgeberArticles.filter((article) => article.kind === 'ratgeber').map(sitemapEntry);
  return `${sitemap.slice(0, start)}${SITEMAP_BLOCK_START}\n${entries.join('\n')}\n  ${sitemap.slice(end)}`;
};

/**
 * Alle abgeleiteten Dateien als { relativer Pfad: Inhalt }.
 */
export const buildRatgeberRegistryFiles = () => ({
  [REGISTRY_FILE]: buildRegistrySource(),
  [OVERVIEW_FILE]: buildOverviewSource(),
  [LOADERS_FILE]: buildLoadersSource(),
  [ALTERSVORSORGE_RELATED_FILE]: buildAltersvorsorgeRelatedSource(),
  [SITEMAP_FILE]: updateSitemap(fs.readFileSync(path.join(PROJECT_ROOT, SITEMAP_FILE), 'utf8')),
});

/**
 * Dateien, deren Stand auf der Platte von der Erzeugung abweicht.
 */
export const staleRatgeberRegistryFiles = () => Object.entries(buildRatgeberRegistryFiles())
  .filter(([file, content]) => {
    const target = path.join(PROJECT_ROOT, file);
    return !fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content;
  })
  .map(([file]) => file);
