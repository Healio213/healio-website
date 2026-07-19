import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const de = readJson('src/i18n/locales/de/leistungen.json');
const en = readJson('src/i18n/locales/en/leistungen.json');
const page = readText('src/pages/LeistungenPage.jsx');
const hero = readText('src/components/services/ServicesHero.jsx');
const navigator = readText('src/components/services/ProtectionNavigator.jsx');
const budget = readText('src/components/services/ServicesBudget.jsx');
const finalCta = readText('src/components/services/ServicesFinalCTA.jsx');
const seoRoutes = readText('scripts/seo-routes.mjs');

assert.equal(de.hero.titleLine1, 'Kranken\u00adzusatz\u00adversicherung.');
assert.equal(de.hero.titleLine2, 'Nur dort, wo sie zählt.');
assert.equal(de.paths.items.length, 3);
assert.deepEqual(de.paths.items.map((item) => item.routeKey), ['ambulant', 'zahn', 'stationaer']);
assert.equal(de.paths.items[1].highlight.label, 'Highlight · die Bayerische');
assert.match(de.paths.items[1].highlight.title, /ZAHN Sofort/);
assert.match(de.paths.items[1].highlight.note, /Versicherungsbedingungen/);
assert.equal(en.paths.items.length, de.paths.items.length);
assert.equal(de.budget.amount, '3.000 EUR');
assert.equal(en.budget.amount, '3.000 EUR');
assert.equal(de.budget.amountPrefix, 'Bis zu');
assert.match(de.seo.title, /Krankenzusatzversicherung/);
assert.doesNotMatch(JSON.stringify(de.paths.items), /tier|Tier/);
assert.doesNotMatch(JSON.stringify(de), /die meisten enttäuschen|sofort leisten|kompletter Zahnschutz|maßgeschneidert/i);

[
  'ServicesHero',
  'ProtectionNavigator',
  'CoverageComparison',
  'HonestAdvice',
  'ServicesBudget',
  'ServicesProcess',
  'ServicesFinalCTA',
].forEach((componentName) => assert.match(page, new RegExp(componentName)));

assert.doesNotMatch(page, /LeistungenContactForm/);
assert.match(page, /createServiceSchema/);
assert.match(hero, /id=\"#?schutz-kompass\"|href=\"#schutz-kompass\"/);
assert.doesNotMatch(hero, /hero-bg|markenrelief|health-pass/);
assert.match(navigator, /getPath\(item\.routeKey\)/);
assert.match(budget, /\[hyphens:auto\]/);
assert.match(finalCta, /getPath\('tierkrankenversicherung'\)/);
assert.match(finalCta, /getPath\('terminvereinbarung'\)/);
assert.match(seoRoutes, /Krankenzusatzversicherung: Ambulant, Zahn & Klinik \| Healio/);
assert.match(seoRoutes, /Supplementary Health Insurance: Outpatient, Dental & Hospital \| Healio/);

console.log('Services contract passed.');
