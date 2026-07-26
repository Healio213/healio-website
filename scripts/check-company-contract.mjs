import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateCohortProjection } from '../src/lib/companyProjection.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const de = readJson('src/i18n/locales/de/unternehmen.json');
const en = readJson('src/i18n/locales/en/unternehmen.json');
const hero = readText('src/components/company/CompanyHero.jsx');
const calculator = readText('src/components/company/CohortImpactSection.jsx');
const responsibility = readText('src/components/company/ResponsibilityStory.jsx');
const economics = readText('src/components/company/CompanyEconomics.jsx');
const workforce = readText('src/components/company/CompanyWorkforceConcept.jsx');
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

assert.match(calculator, /useState\(1000\)/);
assert.match(calculator, /useState\(100\)/);
assert.match(calculator, /useState\(150\)/);
assert.match(calculator, /useState\(30\)/);
assert.match(calculator, /useState\(1\.5\)/);
assert.match(calculator, /useState\(7\)/);
assert.match(de.calculator.description, /einzelnen Mitarbeiter/);
assert.match(de.calculator.description, /Belegschaft/);
assert.match(de.calculator.eyebrow, /\{\{endYear\}\}/);
assert.match(de.calculator.differencePerEmployeeLabel, /\{\{years\}\}/);
assert.match(de.calculator.scenarioARate, /Bruttorendite/);
assert.match(de.calculator.scenarioARateHint, /\(bisher\)/);
assert.match(de.calculator.scenarioBRateHint, /\(neu\)/);
assert.match(en.calculator.scenarioARateHint, /\(existing\)/);
assert.match(en.calculator.scenarioBRateHint, /\(new\)/);
assert.match(de.calculator.scenarioALabel, /bisher/);
assert.match(de.calculator.scenarioBLabel, /neu/);
assert.match(de.calculator.disclaimer, /keine Prognose und keine Garantie/);
assert.match(de.calculator.monthlyContribution, /Modellierter Sparbeitrag/);
assert.match(de.calculator.decisionPrompt, /Kosten, Renditeannahmen und Risiken/);
assert.match(calculator, /Math\.min\(5, scenarioBRate - 0\.1\)/);
assert.match(calculator, /Math\.max\(2, scenarioARate \+ 0\.1\)/);
assert.match(calculator, /scenarioARateHint/);
assert.match(calculator, /scenarioBRateHint/);

const projection = calculateCohortProjection({
  employeeCount: 1000,
  participationRate: 100,
  monthlyContribution: 150,
  years: 30,
  scenarioARate: 1.5,
  scenarioBRate: 7,
});

assert.equal(Math.round(projection.scenarioATotal), 68032919);
assert.equal(Math.round(projection.scenarioBTotal), 175417890);
assert.equal(Math.round(projection.differenceTotal), 107384972);

assert.match(responsibility, /dai\.de/);
assert.match(responsibility, /destatis\.de/);
assert.match(responsibility, /bmas\.de/);
assert.deepEqual(de.solutions.items.map((item) => item.key), ['pension', 'health', 'prevention', 'management']);
assert.equal(de.workforce.budgetAmount, 'bis zu 3.000 EUR');
assert.equal(de.workforce.employerAmount, '0 EUR');
assert.match(de.economics.summaryText, /keine vollständige Erstattung/);
assert.match(de.economics.disclaimer, /Keine Steuerberatung/);
assert.match(economics, /gesetze-im-internet\.de\/estg/);
assert.match(economics, /bundesfinanzhof\.de/);
assert.match(economics, /bundesgesundheitsministerium\.de/);
assert.match(workforce, /healio-belegschaft/);
assert.match(seoRoutes, /Betriebliches Vorsorgemanagement \| bAV, bKV & BGM \| Healio/);
assert.match(seoRoutes, /healio-hero-markenrelief-v1\.webp/);
assert.doesNotMatch(JSON.stringify(de), /Der Staat regelt nichts|garantiert 7|Verlust von 107|Finanzamt zum Sponsor|100 Prozent steuerlich absetzbar/);

[
  'CompanyHero',
  'CompanyRealityCheck',
  'CompanySolutions',
  'CohortImpactSection',
  'ResponsibilityStory',
  'CompanyEconomics',
  'CompanyProcess',
  'CompanyFAQ',
  'CompanyWorkforceConcept',
  'CompanyFinalCTA',
].forEach((componentName) => assert.match(page, new RegExp(componentName)));
assert.doesNotMatch(page, /<main/);

console.log('Company contract passed.');
