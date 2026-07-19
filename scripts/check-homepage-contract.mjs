import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const readJson = (relativePath) => JSON.parse(
  fs.readFileSync(path.join(rootDir, relativePath), 'utf8')
);
const readText = (relativePath) => {
  const absolutePath = path.join(rootDir, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : '';
};

const de = readJson('src/i18n/locales/de/home.json');
const en = readJson('src/i18n/locales/en/home.json');
const deCommon = readJson('src/i18n/locales/de/common.json');
const enCommon = readJson('src/i18n/locales/en/common.json');
const indexCss = fs.readFileSync(path.join(rootDir, 'src/index.css'), 'utf8');
const tailwindConfig = fs.readFileSync(path.join(rootDir, 'tailwind.config.js'), 'utf8');

assert.equal(de.hero.title, 'Krankenzusatzversicherung, die zu deinem Leben passt.');
assert.equal(en.hero.title, 'Supplementary health insurance that fits your life.');
assert.equal(de.hero.proof.length, 3);
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
assert.equal(deCommon.nav.versicherungen, 'Versicherungen');
assert.equal(deCommon.nav.unternehmen, 'Für Unternehmen');
assert.equal(deCommon.nav.partner, 'Für Praxen');
assert.equal(deCommon.nav.ratgeber, 'Ratgeber');
assert.equal(deCommon.nav.schutzWaehlen, 'Schutz auswählen');
assert.equal(enCommon.nav.versicherungen, 'Insurance');
assert.match(indexCss, /family=Manrope/);
assert.match(tailwindConfig, /'home-midnight': '#07111F'/);

const homeHero = readText('src/components/home/HomeHero.jsx');

assert.match(homeHero, /id="home-hero-heading"/);
assert.match(homeHero, /home-hero-passed/);
assert.match(homeHero, /\/hero-bg\.webp/);
assert.match(homeHero, /object-\[72%_center\]/);
assert.match(homeHero, /useScroll/);
assert.match(homeHero, /useTransform/);
assert.match(homeHero, /useReducedMotion/);
assert.match(homeHero, /HighlightText/);
assert.match(homeHero, /<highlight>\$\{titleTail\}<\/highlight>/);
assert.doesNotMatch(homeHero, /HealthPassHeroVisual|conceptOptions|HomeProtectionScene|HomeProtectionFallback|QuietProtectionHeroVisual/);
assert.doesNotMatch(homeHero, /PrivateProtectionHeroVisual/);
assert.doesNotMatch(homeHero, /hero\.sceneLabel/);
assert.match(homeHero, /\[hyphens:manual\]/);
assert.doesNotMatch(homeHero, /hyphens-auto/);
assert.match(homeHero, /Krankenzusatz\\u00adversicherung/);
assert.doesNotMatch(homeHero, /\[overflow-wrap:anywhere\]/);
assert.match(indexCss, /#root[\s\S]{0,160}width: 100%/);
assert.match(indexCss, /overflow-x: clip/);

const insurancePathway = readText('src/components/home/InsurancePathway.jsx');
const howHealioWorks = readText('src/components/home/HowHealioWorks.jsx');

assert.match(insurancePathway, /id="schutz"/);
assert.match(insurancePathway, /getPath\(item\.routeKey\)/);
assert.match(insurancePathway, /items\.map/);
assert.match(insurancePathway, /item\.routeKey/);
assert.doesNotMatch(insurancePathway, /iconMap|cardStyles/);
assert.match(howHealioWorks, /id="so-funktioniert"/);
assert.match(howHealioWorks, /\/images\/healio-app-dashboard\.png/);

const ambulantBudgetFeature = readText('src/components/home/AmbulantBudgetFeature.jsx');
const homeTrust = readText('src/components/home/HomeTrust.jsx');
const audienceLinks = readText('src/components/home/AudienceLinks.jsx');
const homeFinalCta = readText('src/components/home/HomeFinalCTA.jsx');

assert.match(ambulantBudgetFeature, /t\('budget\.amount'\)/);
assert.match(ambulantBudgetFeature, /getPath\('ambulant'\)/);
assert.match(homeTrust, /trust\.items/);
assert.match(audienceLinks, /getPath\(company\.routeKey\)/);
assert.match(audienceLinks, /getPath\(practice\.routeKey\)/);
assert.match(audienceLinks, /healio-hero-markenrelief-v1\.webp/);
assert.match(homeFinalCta, /getPath\('terminvereinbarung'\)/);

const homeComponentDir = path.join(rootDir, 'src/components/home');
const nonBudgetHomeSource = fs.existsSync(homeComponentDir)
  ? fs.readdirSync(homeComponentDir)
    .filter((file) => file.endsWith('.jsx') && file !== 'AmbulantBudgetFeature.jsx')
    .map((file) => fs.readFileSync(path.join(homeComponentDir, file), 'utf8'))
    .join('\n')
  : '';

assert.doesNotMatch(nonBudgetHomeSource, /3[.,]000\s*(?:EUR|€)/);

const mainHomePage = readText('src/pages/MainHomePage.jsx');
const indexHtml = readText('index.html');
const seoRoutes = readText('scripts/seo-routes.mjs');
const schemaMarkup = readText('src/lib/createSchemaMarkup.js');

[
  'HomeHero',
  'InsurancePathway',
  'HowHealioWorks',
  'AmbulantBudgetFeature',
  'HomeTrust',
  'AudienceLinks',
  'HomeFinalCTA',
].forEach((componentName) => assert.match(mainHomePage, new RegExp(componentName)));

assert.doesNotMatch(
  mainHomePage,
  /BavProviderComparison|CompoundInterestCalculator|CombinedZeitfalleRenditeSection|GesundheitSection|WhyBkvWithHealio|Contact/
);
assert.match(indexHtml, /<title>Krankenzusatzversicherung einfach digital \| Healio<\/title>/);
assert.doesNotMatch(indexHtml, /Healio B2B/);
assert.match(indexHtml, /home-hero-active:not\(\.home-hero-passed\)/);
assert.match(seoRoutes, /path: '\/'[\s\S]{0,240}title: 'Krankenzusatzversicherung/);
assert.match(schemaMarkup, /unabhängiger Versicherungsmakler/);

console.log('Homepage contract passed.');
