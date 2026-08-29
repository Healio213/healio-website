import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const page = readText('src/pages/KassenBoostBridgePage.jsx');
const app = readText('src/App.jsx');
const layout = readText('src/components/Layout.jsx');
const footer = readText('src/components/sections/Footer.jsx');
const i18n = readText('src/i18n/i18n.js');
const seoHead = readText('src/components/SEOHead.jsx');
const language = readText('src/hooks/useLanguage.js');
const seoRoutes = readText('scripts/seo-routes.mjs');
const seoContract = readText('scripts/check-site-seo.mjs');
const sitemap = readText('public/sitemap.xml');
const de = readJson('src/i18n/locales/de/kassenboost.json');
const en = readJson('src/i18n/locales/en/kassenboost.json');

assert.match(app, /path="kassenboost" element=\{<KassenBoostBridgePage \/>\}/);
assert.match(layout, /hideAppPromotion=\{hideAppPromotion\}/);
assert.match(layout, /productSalesRoutes[\s\S]*'\/kassenboost'/);
assert.match(layout, /productSalesRoutes[\s\S]*'\/en\/kassenboost'/);
assert.match(layout, /productSalesRoutes\.has\(pathname\)/);
assert.match(footer, /!hideAppPromotion &&/);
assert.match(i18n, /kassenboost: deKassenBoost/);
assert.match(i18n, /kassenboost: enKassenBoost/);

assert.equal(
  de.privacy.confirmation,
  'Aus deinem KassenBoost-Vergleich wurde nichts an Healio übertragen. Was du im Gespräch teilst, entscheidest du.',
);
assert.equal(
  en.privacy.confirmation,
  'Nothing from your KassenBoost comparison was transferred to Healio. You decide what to share in a call.',
);
assert.equal(de.seo.ogImageAlt, 'KassenBoost und Healio: vergleichen, Bonus nutzen, absichern');
assert.equal(en.seo.ogImageAlt, 'KassenBoost and Healio: compare, use your bonus, get covered');
assert.equal(de.employer.ctaHref, '/unternehmen#healio-belegschaft');
assert.equal(en.employer.ctaHref, '/en/companies#healio-belegschaft');
assert.equal(de.bonus.exampleLabel, 'Belegtes Beispiel, IKK classic, Bonusjahr 2026');
assert.equal(en.bonus.exampleLabel, 'Verified example, IKK classic, bonus year 2026');

assert.match(page, /https:\/\/kassenboost\.de\/\?utm_source=healio&utm_medium=bridge&utm_campaign=kassenboost/);
assert.match(page, /ogImage="https:\/\/healio\.de\/images\/kassenboost-bridge-og\.png"/);
assert.equal((page.match(/kassenboost\.de/gi) || []).length, 1, 'Die Brückenseite darf genau einen externen KassenBoost-Vergleichs-CTA enthalten.');
assert.match(page, /getPath\('leistungen'\)/);
assert.match(page, /employer\.ctaHref/);
const deWithoutLabelledExample = JSON.stringify(de).replace(de.bonus.exampleLabel, '');
const enWithoutLabelledExample = JSON.stringify(en).replace(en.bonus.exampleLabel, '');
assert.doesNotMatch(
  `${page}\n${deWithoutLabelledExample}\n${enWithoutLabelledExample}`,
  /IKK(?:\s|\u00a0|-)?classic|IKK Bonus|700\s*EUR/i,
);

assert.match(page, /https:\/\/healio\.de\/kassenboost/);
assert.match(page, /https:\/\/healio\.de\/en\/kassenboost/);
assert.match(seoHead, /`\$\{SITE_URL\}\/kassenboost`/);
assert.match(seoHead, /`\$\{SITE_URL\}\/en\/kassenboost`/);
assert.match(language, /kassenboost: '\/kassenboost'/);
assert.match(language, /kassenboost: '\/en\/kassenboost'/);
assert.match(seoRoutes, /canonical: 'https:\/\/healio\.de\/kassenboost'/);
assert.match(seoRoutes, /canonical: 'https:\/\/healio\.de\/en\/kassenboost'/);
assert.match(seoContract, /'\/kassenboost'/);
assert.match(seoContract, /'\/en\/kassenboost'/);
assert.match(sitemap, /<loc>https:\/\/healio\.de\/kassenboost<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/healio\.de\/en\/kassenboost<\/loc>/);

console.log('KassenBoost bridge contract passed.');
