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
assert.match(layout, /pathname === '\/kassenboost'/);
assert.match(layout, /pathname === '\/en\/kassenboost'/);
assert.match(footer, /!hideAppPromotion &&/);
assert.match(i18n, /kassenboost: deKassenBoost/);
assert.match(i18n, /kassenboost: enKassenBoost/);

assert.equal(de.privacy.confirmation, 'Keine Angaben aus deinem Vergleich wurden an Healio übertragen.');
assert.match(en.privacy.confirmation, /No information from your comparison was shared with Healio\./);
assert.equal(de.employer.ctaHref, '/unternehmen#healio-belegschaft');
assert.equal(en.employer.ctaHref, '/en/companies#healio-belegschaft');

assert.match(page, /https:\/\/kassenboost\.de\/\?utm_source=healio&utm_medium=bridge&utm_campaign=kassenboost/);
assert.equal((page.match(/kassenboost\.de/gi) || []).length, 1, 'Die Brückenseite darf genau einen externen KassenBoost-Vergleichs-CTA enthalten.');
assert.match(page, /getPath\('leistungen'\)/);
assert.match(page, /employer\.ctaHref/);
assert.doesNotMatch(`${page}\n${JSON.stringify(de)}\n${JSON.stringify(en)}`, /IKK(?:\s|\u00a0|-)?classic|IKK Bonus|700\s*EUR/i);

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
