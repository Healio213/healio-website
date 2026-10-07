/**
 * Alle veröffentlichten Ratgeberartikel vollständig für Node: Vertragstests,
 * scripts/seo-routes.mjs (Titel, Beschreibung, strukturierte Daten) und die
 * Registry-Erzeugung lesen die Artikel hier, synchron nach dem Import.
 *
 * Die Website importiert diese Datei nie. Sie lädt einen Artikeltext je Slug
 * über src/content/ratgeber/registry.loaders.js, damit jede Artikelseite nur
 * ihren eigenen Chunk lädt.
 *
 * Welche Artikel veröffentlicht sind, steht in src/content/ratgeber/gliederung.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  RATGEBER_EINZELARTIKEL,
  RATGEBER_GROUPS,
  RATGEBER_OVERVIEW_PER_GROUP,
  RATGEBER_SLUGS,
} from '../../src/content/ratgeber/gliederung.js';

export { RATGEBER_EINZELARTIKEL, RATGEBER_GROUPS, RATGEBER_OVERVIEW_PER_GROUP, RATGEBER_SLUGS };

export const RATGEBER_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'content', 'ratgeber');

const importModule = (file) => import(pathToFileURL(file).href);

const loadArticle = async (slug) => {
  const file = path.join(RATGEBER_DIR, `${slug}.js`);
  if (!fs.existsSync(file)) {
    throw new Error(`Ratgeber: "${slug}" steht in gliederung.js, aber src/content/ratgeber/${slug}.js fehlt.`);
  }
  const { article } = await importModule(file);
  if (!article || typeof article !== 'object') {
    throw new Error(`Ratgeber: src/content/ratgeber/${slug}.js exportiert kein "article".`);
  }
  if (article.slug !== slug) {
    throw new Error(`Ratgeber: src/content/ratgeber/${slug}.js trägt slug "${article.slug}"; Dateiname und slug müssen gleich sein.`);
  }
  return article;
};

// Doppelte Slugs lädt der Import nur einmal; validateRatgeberSources meldet sie.
export const ratgeberArticles = await Promise.all([...new Set(RATGEBER_SLUGS)].map(loadArticle));

const articlesBySlug = new Map(ratgeberArticles.map((article) => [article.slug, article]));

export const getRatgeberArticle = (slug) => articlesBySlug.get(slug) || null;

export const getRatgeberGroupArticles = (group) => group.slugs.map(getRatgeberArticle).filter(Boolean);

/**
 * Alle Inhaltsdateien im Ordner, eingetragen oder nicht: jede .js-Datei, die
 * ein Objekt "article" exportiert. Hilfsdateien (articleText.js, authors.js,
 * gliederung.js, registry*.js, ...) exportieren keins und fallen weg.
 */
export const findArticleFiles = async () => {
  const files = fs.readdirSync(RATGEBER_DIR).filter((name) => name.endsWith('.js')).sort();
  const found = [];
  for (const name of files) {
    const source = fs.readFileSync(path.join(RATGEBER_DIR, name), 'utf8');
    if (!/^export const article\b/m.test(source)) continue;
    const { article } = await importModule(path.join(RATGEBER_DIR, name));
    if (article && typeof article === 'object') found.push({ file: name, slug: article.slug });
  }
  return found;
};

/**
 * Prüft Gliederung und Inhaltsdateien gegeneinander. Liefert eine Liste von
 * Fehlertexten, leer heißt: alles passt.
 */
export const validateRatgeberSources = async () => {
  const errors = [];
  const seen = new Set();
  for (const slug of RATGEBER_SLUGS) {
    if (seen.has(slug)) errors.push(`"${slug}" steht mehrfach in gliederung.js.`);
    seen.add(slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`"${slug}" ist kein gültiger Slug (nur a-z, 0-9 und Bindestrich).`);
  }

  const groupIds = new Set();
  for (const group of RATGEBER_GROUPS) {
    if (!group.id || groupIds.has(group.id)) errors.push(`Gruppe ohne eindeutige id: ${JSON.stringify(group.id)}.`);
    groupIds.add(group.id);
    if (!group.title) errors.push(`Gruppe ${group.id}: title fehlt.`);
    if (!Array.isArray(group.slugs) || group.slugs.length === 0) errors.push(`Gruppe ${group.id}: slugs ist leer.`);
    if (!group.hubSlug || !group.slugs?.includes(group.hubSlug)) {
      errors.push(`Gruppe ${group.id}: hubSlug "${group.hubSlug}" muss in slugs stehen.`);
    }
  }

  for (const article of ratgeberArticles) {
    for (const field of ['kind', 'metaTitle', 'metaDescription', 'listTitle', 'listTeaser', 'headline']) {
      if (typeof article[field] !== 'string' || !article[field].trim()) {
        errors.push(`${article.slug}: Pflichtfeld ${field} fehlt.`);
      }
    }
    if (!['ratgeber', 'advertorial'].includes(article.kind)) errors.push(`${article.slug}: unbekannte Artikelart "${article.kind}".`);
    if (article.kind === 'ratgeber' && !/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt || '')) {
      errors.push(`${article.slug}: publishedAt fehlt oder ist kein ISO-Datum (für Sitemap und strukturierte Daten).`);
    }
  }

  for (const { file, slug } of await findArticleFiles()) {
    if (file !== `${slug}.js`) errors.push(`src/content/ratgeber/${file} trägt slug "${slug}"; Dateiname und slug müssen gleich sein.`);
    if (!seen.has(slug)) {
      errors.push(`src/content/ratgeber/${file} steht nicht in gliederung.js. Slug in eine Gruppe oder in RATGEBER_EINZELARTIKEL eintragen.`);
    }
  }

  return errors;
};
