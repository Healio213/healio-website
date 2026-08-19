import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const de = readJson('src/i18n/locales/de/unternehmen.json');
const en = readJson('src/i18n/locales/en/unternehmen.json');
const hero = readText('src/components/company/CompanyHero.jsx');
const responsibility = readText('src/components/company/ResponsibilityStory.jsx');
const economics = readText('src/components/company/CompanyEconomics.jsx');
const workforce = readText('src/components/company/CompanyWorkforceConcept.jsx');
assert(
  fs.existsSync(path.join(rootDir, 'src/components/company/CompanyBavLeverage.jsx')),
  'Der kompakte bAV-Hebel fehlt.',
);
const bavLeverage = readText('src/components/company/CompanyBavLeverage.jsx');
const page = readText('src/pages/UnternehmenPage.jsx');
const seoRoutes = readText('scripts/seo-routes.mjs');

assert.equal(de.hero.titleLead, 'Gesundheit fördern. Mitarbeiter binden.');
assert.equal(de.hero.titleHighlight, 'Vorsorge richtig gestalten.');
assert.equal(de.hero.analysisCta, 'Vorsorge-Check starten');
assert.match(de.hero.description, /bAV, bKV, BGM-Koordination/);
assert.equal(en.hero.titleLead, 'Promote health. Retain employees.');
assert.match(hero, /healio-hero-markenrelief-v1\.webp/);
assert.match(hero, /object-\[62%_center\]/);
assert.doesNotMatch(hero, /healio-wordmark-white/);
assert.match(hero, /min-h-\[100svh\]/);

assert.match(responsibility, /dai\.de/);
assert.match(responsibility, /destatis\.de/);
assert.match(responsibility, /bmas\.de/);
assert.deepEqual(de.solutions.items.map((item) => item.key), ['pension', 'health', 'prevention', 'management']);
assert.equal(de.workforce.eyebrow, 'KassenBoost für Mitarbeiter');
assert.equal(en.workforce.eyebrow, 'KassenBoost for employees');
assert.match(de.workforce.description, /freiwilligen, kostenlosen Zugang/);
assert.match(de.workforce.description, /ohne Kontaktdaten/);
assert.match(de.workforce.privacyDescription, /weder an den Arbeitgeber noch an Healio übermittelt/);
assert.doesNotMatch(JSON.stringify(de.workforce), /3\.000|IKK|Bonus/);
assert.doesNotMatch(JSON.stringify(en.workforce), /3,000|IKK|bonus/i);
assert.match(de.economics.summaryText, /keine vollständige Erstattung/);
assert.match(de.economics.disclaimer, /Keine Steuerberatung/);
assert.match(economics, /gesetze-im-internet\.de\/estg/);
assert.match(economics, /bundesfinanzhof\.de/);
assert.match(economics, /bundesgesundheitsministerium\.de/);
assert.match(workforce, /healio-belegschaft/);
assert.match(workforce, /https:\/\/kassenboost\.de\/\?utm_source=healio&utm_medium=website&utm_campaign=arbeitgeberzugang/);
assert.match(workforce, /potenzialanalyse\?interest=kassenboost/);
assert.doesNotMatch(workforce, /getPath\('partner'\)|to=["']\/partner/);
assert.equal(de.bavLeverage.title, '676 EUR Vorsorgebeitrag. Rund 75 EUR möglicher Nettoeffekt.*');
assert.match(de.bavLeverage.splitFree, /338 EUR/);
assert.match(de.bavLeverage.splitLiable, /338 EUR/);
assert.match(de.bavLeverage.employerCost, /rund 747 EUR/);
assert.equal(de.bavLeverage.standardFormula, '10 % − 2 Prozentpunkte = 8 % Modellrendite');
assert.match(de.bavLeverage.historicalContext, /Juli 2011 bis Juli 2026/);
assert.match(de.bavLeverage.historicalContext, /31\.07\.2026/);
assert.match(de.bavLeverage.historicalContext, /11,10 % p\. a\./);
assert.match(de.bavLeverage.historicalContext, /9,10 % p\. a\./);
assert.match(de.bavLeverage.disclaimer, /keine Prognose oder Garantie/);
assert.doesNotMatch(JSON.stringify(de.bavLeverage), /garantierte Nettorente|garantierter ROI|sichere Rendite/i);
assert.match(bavLeverage, /getPath\('vorsorgeRechner'\)/);
assert.match(bavLeverage, /msci-world-index-usd-net\.pdf/);
assert.doesNotMatch(bavLeverage, /getPath\('partner'\)|to=["']\/partner/);
assert.match(seoRoutes, /Betriebliches Vorsorgemanagement \| bAV, bKV & BGM \| Healio/);
assert.match(seoRoutes, /healio-hero-markenrelief-v1\.webp/);
assert.doesNotMatch(JSON.stringify(de), /Der Staat regelt nichts|garantiert 7|Verlust von 107|Finanzamt zum Sponsor|100 Prozent steuerlich absetzbar/);

[
  'CompanyHero',
  'CompanyRealityCheck',
  'CompanyWorkforceConcept',
  'CompanySolutions',
  'CompanyBavLeverage',
  'ResponsibilityStory',
  'CompanyEconomics',
  'CompanyProcess',
  'CompanyFAQ',
  'CompanyFinalCTA',
].forEach((componentName) => assert.match(page, new RegExp(componentName)));
assert.doesNotMatch(page, /CohortImpactSection/);
assert(
  page.indexOf('<CompanyRealityCheck />') < page.indexOf('<CompanyWorkforceConcept />'),
  'Der Mitarbeiterzugang muss direkt nach dem Reality Check folgen.',
);
assert(
  page.indexOf('<CompanyWorkforceConcept />') < page.indexOf('<CompanySolutions />'),
  'Der Mitarbeiterzugang muss vor den Produktbausteinen stehen.',
);
assert(
  !page.slice(page.indexOf('<CompanyRealityCheck />'), page.indexOf('<CompanyWorkforceConcept />')).includes('/>\n        <'),
  'Zwischen Reality Check und Mitarbeiterzugang darf keine weitere Sektion stehen.',
);
assert.doesNotMatch(page, /<main/);

console.log('Company contract passed.');
