import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const page = read('src/pages/PartnerPage.jsx');
const faq = read('src/components/sections/partner/PartnerFAQ.jsx');
const trustBar = read('src/components/sections/partner/PartnerTrustBar.jsx');
const roleProcess = read('src/components/sections/partner/PartnerRoleProcess.jsx');
const deSource = read('src/i18n/locales/de/partner.json');
const enSource = read('src/i18n/locales/en/partner.json');
const de = JSON.parse(deSource);
const en = JSON.parse(enSource);

const get = (object, keyPath) => keyPath.split('.').reduce((value, key) => value?.[key], object);
const renderedSources = [page, faq, trustBar, roleProcess];
const translationKeys = new Set();

for (const source of renderedSources) {
  for (const match of source.matchAll(/\bt\(['"]([^'"]+)['"]/g)) {
    translationKeys.add(match[1]);
  }
}

for (const key of translationKeys) {
  assert.notEqual(get(de, key), undefined, `Missing German partner translation: ${key}`);
  assert.notEqual(get(en, key), undefined, `Missing English partner translation: ${key}`);
}

assert.match(page, /calendly\.com\/healio-info\/30min/, 'Calendly must remain the 30-minute meeting');
assert.match(page, /canonicalUrl,\s*isEnglish \? 'en-US' : 'de-DE'/, 'Partner schema must use the canonical URL and active language');
assert.match(page, /<PartnerRoleProcess\s*\/>/, 'The verifiable role process must be rendered');
assert.doesNotMatch(page, /PartnerTestimonials/, 'Unverified testimonials must not be imported or rendered');
assert.match(faq, /returnObjects:\s*true/, 'FAQ content must come from the active locale');
assert.match(roleProcess, /HighlightText[^>]*className="text-\[#75e6bf\]"/, 'Dark role section needs a high-contrast highlight');

for (const [locale, source] of [['de', deSource], ['en', enSource]]) {
  assert.doesNotMatch(source, /\b600\s*(?:€|EUR)|(?:€|EUR)\s*600\b/i, `${locale}: outdated EUR 600 vision claim`);
  assert.doesNotMatch(source, /45\s*(?:Minuten|minutes)/i, `${locale}: outdated 45-minute claim`);
  assert.doesNotMatch(source, /keine Therapieabbrüche|no more therapy dropouts|Null Aufwand|Zero Effort|Null Risiko|Zero Risk|Umsatz steig|increase revenue/i, `${locale}: absolute or unsupported claim`);
}

assert.equal(de.budget.sehhilfenAmount, 'bis zu 500 EUR');
assert.match(de.budget.sehhilfenDesc, /frei verwendbarer IKK-Geldbonus/i);
assert.match(de.faq.items.at(-1).answer, /kein pauschaler Brillenzuschuss/i);
assert.equal(de.trust.meeting, '30 Minuten Kennenlernen');
assert.match(de.roleProcess.closing, /fachlich unabhängig/i);

console.log(`Partner contract checks passed (${translationKeys.size} translation keys).`);
