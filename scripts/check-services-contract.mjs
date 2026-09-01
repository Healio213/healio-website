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
const header = readText('src/components/Header.jsx');
const veterinaryLayout = readText('src/components/sections/veterinary/VeterinaryLayout.jsx');
const seoRoutes = readText('scripts/seo-routes.mjs');

assert.equal(de.hero.titleLine1, 'Kranken\u00adzusatz\u00adversicherung.');
assert.equal(de.hero.titleLine2, 'Nur dort, wo sie zählt.');
assert.equal(de.paths.items.length, 4);
assert.deepEqual(de.paths.items.map((item) => item.routeKey), ['ambulant', 'zahn', 'stationaer', 'tierkrankenversicherung']);
assert.equal(de.comparison.items.length, 4);
assert.deepEqual(de.comparison.items.map((item) => item.key), ['ambulant', 'dental', 'hospital', 'pet']);
assert.equal(de.paths.items[1].highlight.label, 'Highlight · die Bayerische');
assert.match(de.paths.items[1].highlight.title, /ZAHN Sofort/);
assert.match(de.paths.items[1].highlight.note, /Versicherungsbedingungen/);
assert.equal(en.paths.items.length, de.paths.items.length);
assert.equal(en.comparison.items.length, de.comparison.items.length);
assert.equal(de.budget.amount, '3.000 EUR');
assert.equal(en.budget.amount, '3.000 EUR');
assert.equal(de.budget.amountPrefix, 'Bis zu');
assert.match(de.seo.title, /Ambulant, Zahn, Klinik & Tier/);
assert.match(JSON.stringify(de.paths.items), /tier|Tier/);
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
assert.match(hero, /decision-thinking\.webp/);
assert.doesNotMatch(hero, /routes\.map/);
assert.match(header, /const isServices =/);
assert.match(header, /isServices[\s\S]{0,100}nav\.schutzWaehlen/);
assert.match(header, /getPath\('leistungen'\)\}#schutz-kompass/);
assert.match(veterinaryLayout, /<Footer hideCta hideAppPromotion \/>/);
assert.match(navigator, /getPath\(item\.routeKey\)/);
assert.match(budget, /\[hyphens:auto\]/);
assert.doesNotMatch(finalCta, /getPath\('tierkrankenversicherung'\)/);
assert.match(finalCta, /getPath\('terminvereinbarung'\)/);
assert.match(seoRoutes, /Versicherungen: Ambulant, Zahn, Klinik & Tier \| Healio/);
assert.match(seoRoutes, /Insurance: Outpatient, Dental, Hospital & Pet \| Healio/);

console.log('Services contract passed.');
