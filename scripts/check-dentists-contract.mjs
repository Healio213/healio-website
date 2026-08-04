import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const page = read('src/pages/ZahnaerztePage.jsx');
const deSource = read('src/i18n/locales/de/zahnaerzte.json');
const enSource = read('src/i18n/locales/en/zahnaerzte.json');
const seoRoutes = read('scripts/seo-routes.mjs');
const de = JSON.parse(deSource);
const en = JSON.parse(enSource);

const get = (object, keyPath) => keyPath.split('.').reduce((value, key) => value?.[key], object);
const directKeys = new Set();

for (const match of page.matchAll(/\bt\(['"]([^'"]+)['"]/g)) {
  directKeys.add(match[1]);
}

for (const key of directKeys) {
  assert.notEqual(get(de, key), undefined, `Missing German dentist translation: ${key}`);
  assert.notEqual(get(en, key), undefined, `Missing English dentist translation: ${key}`);
}

assert.equal(de.proof.items.length, 3);
assert.equal(de.insurerHighlights.highlights.length, 4);
assert.equal(de.bonus.steps.length, 3);
assert.equal(de.legal.items.length, 4);
assert.equal(de.package.items.length, 3);
assert.equal(de.faq.items.length, 5);
assert.equal(en.faq.items.length, de.faq.items.length);

assert.match(de.hero.subtitle, /deinen Patienten/);
assert.match(de.hero.note, /deine Praxis/);
assert.doesNotMatch(
  deSource,
  /\b(?:Sie|Ihr|Ihre|Ihren|Ihrem|Ihnen|Ihrer|Ihres)\b/,
  'The German dentist page must consistently use the informal Du address'
);

const combinedCopy = `${deSource}\n${enSource}`;
assert.doesNotMatch(
  combinedCopy,
  /standesrechtlich (?:sauber|einwandfrei)|null (?:Risiko|Haftung)|zero (?:risk|liability)|100\s*(?:%|Prozent)\s*(?:DSGVO|Haftung)|vollständige Haftungsübernahme|effectively free|effektiv (?:kostenlos|gratis)|kostet (?:dich|den Patienten) nichts/i,
  'Absolute legal or free-cover claims are not allowed'
);
assert.doesNotMatch(combinedCopy, /879\s*€|Jeder 5\.|3 von 4/i, 'Stale pitch statistics must not return');
assert.match(de.bonus.disclaimer, /kein pauschales Gratisversprechen/i);
assert.match(de.legal.disclaimer, /keine Rechtsberatung/i);
assert.match(de.legal.disclaimer, /Landeszahnärztekammer/i);
assert.match(de.legal.items[0].text, /keine Provision/i);
assert.match(de.legal.items[3].text, /keine Daten/i);
assert.match(de.insurerHighlights.title, /Patientenservice/);
assert.match(de.insurerHighlights.highlights[0].text, /1\.500 EUR/);
assert.match(de.insurerHighlights.highlights[0].text, /ZAHN Sofort/);
assert.match(de.insurerHighlights.highlights[1].title, /Zahnreinigung ohne Jahreslimit/);
assert.match(de.insurerHighlights.highlights[1].text, /ZahnPRIVAT 90 und 100/);
assert.match(de.insurerHighlights.highlights[3].title, /3 fehlende Zähne/);
assert.match(de.insurerHighlights.highlights[3].text, /Zahnersatz zum Schließen dieser Lücken/);
assert.match(de.insurerHighlights.highlights[3].text, /noch nicht angeraten/);
assert.match(de.insurerHighlights.practiceNote, /keine Tarifempfehlung/);
assert.match(de.insurerHighlights.sourceNote, /Versicherungsbedingungen/);

assert.match(page, /min-h-\[92svh\]/);
assert.match(page, /w-full overflow-hidden/);
assert.match(page, /zahnaerzte-hero-beratung-v2\.webp/);
assert.equal(
  fs.existsSync(path.join(root, 'public/images/zahnaerzte-hero-beratung-v2.webp')),
  true,
  'The dentist hero image must exist in the public image directory'
);
assert.match(page, /useReducedMotion/);
assert.match(page, /FOUNDER_IMAGE/);
assert.match(page, /calendly\.com\/healio-info\/30min/);
assert.match(page, /loading="lazy"/);
assert.doesNotMatch(page, /rounded-(?:2xl|3xl)/, 'The editorial dental design should not regress to generic oversized rounded cards');
assert.match(seoRoutes, /Patientenservice für Zahnarztpraxen \| Healio/);

console.log(`Dentist page contract passed (${directKeys.size} direct translation keys).`);
