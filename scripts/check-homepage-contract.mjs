import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const readJson = (relativePath) => JSON.parse(
  fs.readFileSync(path.join(rootDir, relativePath), 'utf8')
);

const de = readJson('src/i18n/locales/de/home.json');
const en = readJson('src/i18n/locales/en/home.json');

assert.equal(de.hero.title, 'Krankenzusatzversicherung, einfach digital.');
assert.equal(en.hero.title, 'Supplementary health insurance, made simple.');
assert.equal(de.products.items.length, 3);
assert.deepEqual(
  de.products.items.map((item) => item.routeKey),
  ['ambulant', 'zahn', 'stationaer']
);
assert.equal(de.process.steps.length, 4);
assert.equal(de.budget.amount, '3.000 EUR');
assert.equal(de.audiences.items.length, 2);
assert.deepEqual(
  de.audiences.items.map((item) => item.routeKey),
  ['unternehmen', 'partner']
);
assert.match(de.seo.title, /Krankenzusatzversicherung/);
assert.equal(en.products.items.length, de.products.items.length);
assert.equal(en.process.steps.length, de.process.steps.length);

console.log('Homepage contract passed.');
