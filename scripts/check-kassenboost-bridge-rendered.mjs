import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagePaths = [
  path.join(rootDir, 'public/images/kassenboost-bridge-og.png'),
  path.join(rootDir, 'dist/images/kassenboost-bridge-og.png'),
];
const imageUrl = 'https://healio.de/images/kassenboost-bridge-og.png';

const pages = [
  {
    file: 'dist/kassenboost/index.html',
    canonical: 'https://healio.de/kassenboost',
    alt: 'KassenBoost und Healio: vergleichen, Bonus nutzen, absichern',
  },
  {
    file: 'dist/en/kassenboost/index.html',
    canonical: 'https://healio.de/en/kassenboost',
    alt: 'KassenBoost and Healio: compare, use your bonus, get covered',
  },
];

const readHtml = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readMeta = (html, attribute, value) => {
  const pattern = new RegExp(`<meta ${attribute}="${value}" content="([^"]*)">`);
  return html.match(pattern)?.[1] || null;
};

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
  const html = readHtml(page.file);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  assert.equal(canonical, page.canonical, `Falscher Canonical in ${page.file}`);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const webPages = schemas.flatMap((schema) => collectWebPages(schema));

  assert(
    webPages.some((schema) => schema.url === page.canonical && schema['@id'] === `${page.canonical}#webpage`),
    `Route-spezifisches WebPage-Schema fehlt in ${page.file}`
  );
  assert(
    !webPages.some((schema) => schema.url === 'https://healio.de/ambulant' || schema['@id'] === 'https://healio.de/ambulant#webpage'),
    `Ambulant-WebPage-Schema darf nicht in ${page.file} vererbt werden`
  );

  assert.equal(readMeta(html, 'property', 'og:image'), imageUrl, `Falsches OG-Bild in ${page.file}`);
  assert.equal(readMeta(html, 'name', 'twitter:image'), imageUrl, `Falsches Twitter-Bild in ${page.file}`);
  assert.equal(readMeta(html, 'property', 'og:image:alt'), page.alt, `Falscher OG-Alt-Text in ${page.file}`);
  assert.equal(readMeta(html, 'name', 'twitter:image:alt'), page.alt, `Falscher Twitter-Alt-Text in ${page.file}`);
}

for (const imagePath of imagePaths) {
  assert(fs.existsSync(imagePath), `Neutrales Brücken-OG-Bild fehlt: ${imagePath}`);
  const png = fs.readFileSync(imagePath);
  assert.equal(png.toString('ascii', 1, 4), 'PNG', 'OG-Bild muss als PNG vorliegen.');
  assert.equal(png.readUInt32BE(16), 1200, 'OG-Bild muss 1200 Pixel breit sein.');
  assert.equal(png.readUInt32BE(20), 630, 'OG-Bild muss 630 Pixel hoch sein.');
}

console.log('KassenBoost rendered bridge contract passed.');
