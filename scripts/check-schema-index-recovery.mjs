import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEBSITE_ID = 'https://healio.de/#website';
const ORGANIZATION_ID = 'https://healio.de/#organization';

function typesOf(value) {
  if (!value || typeof value !== 'object') return [];
  return Array.isArray(value['@type']) ? value['@type'] : [value['@type']].filter(Boolean);
}

function collectTyped(value, type, results = []) {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectTyped(entry, type, results));
    return results;
  }
  if (!value || typeof value !== 'object') return results;

  if (typesOf(value).includes(type)) results.push(value);
  Object.values(value).forEach((entry) => collectTyped(entry, type, results));
  return results;
}

function readSchemas(file) {
  const html = fs.readFileSync(file, 'utf8');
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

function htmlPath(routePath) {
  return routePath === '/'
    ? path.join(rootDir, 'dist/index.html')
    : path.join(rootDir, 'dist', routePath.replace(/^\//, ''), 'index.html');
}

const sourceSchemas = readSchemas(path.join(rootDir, 'index.html'));
assert.equal(collectTyped(sourceSchemas, 'WebPage').length, 0, 'index.html darf keine globale WebPage erben.');

const organizations = collectTyped(sourceSchemas, 'Organization');
const healio = organizations.find((entry) => entry['@id'] === ORGANIZATION_ID);
assert(healio, 'Healio-Organisation fehlt im Basis-Schema.');
assert.deepEqual(
  healio.sameAs,
  ['https://www.tiktok.com/@healio.de'],
  'sameAs darf weder KassenBoost noch die fremde US-LinkedIn-Seite als Healio-Identität ausweisen.',
);

for (const route of seoRoutes) {
  const schemas = readSchemas(htmlPath(route.path));
  const webPages = collectTyped(schemas, 'WebPage');
  const indexable = !/^noindex\b/i.test(route.robots || 'index, follow');
  const explicitWebPage = route.schemaMarkup?.['@type'] === 'WebPage';
  const expectedWebPages = indexable || explicitWebPage ? 1 : 0;

  assert.equal(
    webPages.length,
    expectedWebPages,
    `${route.path} muss ${expectedWebPages ? 'genau eine' : 'keine'} WebPage-Definition enthalten.`,
  );

  if (!expectedWebPages) continue;
  const [webPage] = webPages;
  assert.deepEqual(
    {
      id: webPage['@id'],
      url: webPage.url,
      name: webPage.name,
      description: webPage.description,
      inLanguage: webPage.inLanguage,
      isPartOf: webPage.isPartOf,
      about: webPage.about,
    },
    {
      id: `${route.canonical}#webpage`,
      url: route.canonical,
      name: route.title,
      description: route.description,
      inLanguage: route.lang === 'en' ? 'en-US' : 'de-DE',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
    },
    `WebPage-Daten passen nicht zur Route ${route.path}.`,
  );
}

const ambulantSchemas = readSchemas(htmlPath('/ambulant'));
assert.equal(collectTyped(ambulantSchemas, 'Service').length, 1, 'Ambulant-Service-Schema fehlt oder ist doppelt.');
assert.equal(collectTyped(ambulantSchemas, 'FAQPage').length, 1, 'Ambulant-FAQ-Schema fehlt oder ist doppelt.');

const stationaerSchemas = readSchemas(htmlPath('/stationaer'));
assert.equal(collectTyped(stationaerSchemas, 'FAQPage').length, 1, 'Stationär-FAQ-Schema fehlt oder ist doppelt.');

console.log(`Schema-Indexierungsvertrag erfüllt: ${seoRoutes.length} Routen geprüft.`);
