import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pages = [
  {
    file: 'dist/potenzialanalyse/index.html',
    canonical: 'https://healio.de/potenzialanalyse',
    name: 'Potenzialanalyse für KassenBoost, bAV und bKV | Healio',
    description:
      'Kostenlose Potenzialanalyse für KassenBoost als Mitarbeiterzugang, betriebliche Altersvorsorge (bAV), bKV oder ein integriertes Gesamtsystem.',
    inLanguage: 'de-DE',
  },
  {
    file: 'dist/en/potential-analysis/index.html',
    canonical: 'https://healio.de/en/potential-analysis',
    name: 'Potential analysis for KassenBoost, pension and health | Healio',
    description:
      'Free potential analysis for KassenBoost employee access, corporate pension, corporate health insurance or an integrated benefits system.',
    inLanguage: 'en-US',
  },
];

const collectWebPages = (value, results = []) => {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectWebPages(entry, results));
    return results;
  }
  if (!value || typeof value !== 'object') return results;

  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
  if (types.includes('WebPage')) results.push(value);
  Object.values(value).forEach((entry) => collectWebPages(entry, results));
  return results;
};

for (const page of pages) {
  const html = fs.readFileSync(path.join(rootDir, page.file), 'utf8');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const webPages = schemas.flatMap((schema) => collectWebPages(schema));

  assert(
    webPages.some(
      (schema) =>
        schema.url === page.canonical &&
        schema['@id'] === `${page.canonical}#webpage` &&
        schema.name === page.name &&
        schema.description === page.description &&
        schema.inLanguage === page.inLanguage,
    ),
    `Localized route-specific WebPage schema is missing in ${page.file}`,
  );

  assert(
    !webPages.some(
      (schema) =>
        schema.url === 'https://healio.de/ambulant' ||
        schema['@id'] === 'https://healio.de/ambulant#webpage' ||
        /Ambulante Zusatzversicherung|Gesundheitsbudget für Heilpraktiker/i.test(
          `${schema.name ?? ''} ${schema.description ?? ''}`,
        ),
    ),
    `Ambulant WebPage entity must not be inherited by ${page.file}`,
  );
}

console.log('Rendered potential analysis schema contract passed.');
