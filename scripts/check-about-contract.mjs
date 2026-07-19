import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const page = readText('src/pages/AboutPage.jsx');
const de = readJson('src/i18n/locales/de/about.json');
const en = readJson('src/i18n/locales/en/about.json');

assert.match(de.hero.description, /unabhängiger Versicherungsmakler/);
assert.match(de.hero.description, /Partnernetzwerk/);
assert.match(en.hero.description, /independent insurance broker/);
assert.match(en.hero.description, /partner network/);

assert.equal(de.hero.audiences.length, 3);
assert.deepEqual(de.hero.audiences.map((item) => item.key), ['private', 'practices', 'companies']);
assert.equal(de.principles.items.length, 4);
assert.equal(en.principles.items.length, de.principles.items.length);

assert.deepEqual(de.impact.items.map((item) => item.value), ['3.000 EUR', '1.000 EUR', '700 EUR+']);
assert.match(de.impact.items[0].label, /2 Jahren/);
assert.match(de.impact.items[1].detail, /Naturheilkunde und Osteopathie/);
assert.match(de.impact.items[2].detail, /Bonusmaßnahmen/);
assert.match(de.impact.disclaimer, /nicht automatisch/);
assert.match(de.impact.disclaimer, /Versicherungs- und Kassenbedingungen/);

assert.equal(de.routes.items.length, 3);
assert.deepEqual(de.routes.items.map((item) => item.routeKey), ['leistungen', 'partner', 'unternehmen']);
assert.deepEqual(en.routes.items.map((item) => item.routeKey), ['leistungen', 'partner', 'unternehmen']);

const combinedCopy = `${JSON.stringify(de)}\n${JSON.stringify(en)}`;
assert.doesNotMatch(combinedCopy, /120\+|thousands|tausende|100\s*%|10\s*%/i);
assert.doesNotMatch(combinedCopy, /Plattform|platform/i);
assert.doesNotMatch(combinedCopy, /💡|🤝|🚀|❤️/u);

assert.match(page, /min-h-\[92svh\]/);
assert.match(page, /w-full overflow-hidden/);
assert.match(page, /useReducedMotion/);
assert.match(page, /canonicalUrl = lang === 'en'/);
assert.match(page, /getPath\(route\.routeKey\)/);
assert.match(page, /FOUNDER_IMAGE/);
assert.match(page, /FOUNDER_IMAGE = '\/images\/frank-steinfurt-gruender-healio\.webp'/);
assert.doesNotMatch(page, /<ul[^>]*>\s*<div/);
assert.match(page, /<dt className="order-2/);
assert.match(page, /<dd className="order-1/);
assert.match(page, /impact\.disclaimer[\s\S]{0,200}text-slate-400|text-slate-400[\s\S]{0,200}impact\.disclaimer/);
assert.doesNotMatch(page, /grayscale|animate-pulse|hover:-translate-y/);

console.log('About page contract passed.');
