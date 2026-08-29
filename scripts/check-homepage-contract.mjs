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

assert.equal(de.hero.title, 'Starker Schutz für Sie. Echter Mehrwert für Ihr Team.');
assert.equal(en.hero.title, 'Strong protection for you. Real value for your team.');
assert.equal(de.hero.titleAccent, 'Echter Mehrwert für Ihr Team.');
assert.equal(de.products.items.length, 3);
assert.deepEqual(
  de.products.items.map((item) => item.routeKey),
  ['ambulant', 'zahn', 'stationaer']
);
assert.equal(de.process.steps.length, 3);
assert.equal(de.trust.items.length, 3);
assert.equal(de.budget.prefix, 'Bis zu');
assert.equal(de.budget.amount, '3.000 EUR');
assert.equal(de.audiences.items.length, 2);
assert.deepEqual(
  de.audiences.items.map((item) => item.routeKey),
  ['unternehmen', 'partner']
);
assert.match(de.seo.title, /Privatkunden & Unternehmen/);
assert.equal(en.products.items.length, de.products.items.length);
assert.equal(en.process.steps.length, de.process.steps.length);
assert.equal(deCommon.nav.versicherungen, 'Versicherungen');
assert.equal(deCommon.nav.unternehmen, 'Für Unternehmen');
assert.equal(deCommon.nav.partner, 'Für Praxen');
assert.equal(deCommon.nav.kontakt, 'Kontakt');
assert.equal(deCommon.nav.schutzWaehlen, 'Schutz auswählen');
assert.equal(deCommon.nav.kassenvorteil, 'Kassenvorteil prüfen');
assert.equal(enCommon.nav.versicherungen, 'Insurance');
assert.equal(enCommon.nav.kontakt, 'Contact');
assert.equal(enCommon.nav.kassenvorteil, 'Check insurer value');
assert.match(indexCss, /family=Manrope/);
assert.match(tailwindConfig, /'home-midnight': '#07111F'/);

const homeHero = readText('src/components/home/HomeHero.jsx');
const productTicker = readText('src/components/sections/ProductTicker.jsx');
const header = readText('src/components/Header.jsx');

assert.match(header, /getPath\('kontakt'\)/);
assert.match(header, /t\('nav\.kontakt'\)/);
assert.doesNotMatch(header, /getPath\('blog'\)[\s\S]{0,80}t\('nav\.ratgeber'\)/);
assert.match(header, /solidHeaderRoutes/);
assert.match(header, /forceSolidHeader/);
assert.match(header, /t\('nav\.kassenvorteil'\)/);
assert.match(header, /KASSENBOOST_COMPARE_URL/);

assert.match(homeHero, /id="home-hero-heading"/);
assert.match(homeHero, /home-hero-passed/);
assert.match(homeHero, /\/hero-bg\.webp/);
assert.match(homeHero, /object-\[72%_center\]/);
assert.match(homeHero, /useScroll/);
assert.match(homeHero, /useTransform/);
assert.match(homeHero, /useReducedMotion/);
assert.match(homeHero, /getPath\('leistungen'\)/);
assert.match(homeHero, /getPath\('unternehmen'\)/);
assert.match(homeHero, /hero\.secondaryCta/);
assert.doesNotMatch(homeHero, /hero\.bonusCheckCta|HighlightText/);
assert.doesNotMatch(homeHero, /HealthPassHeroVisual|conceptOptions|HomeProtectionScene|HomeProtectionFallback|QuietProtectionHeroVisual/);
assert.doesNotMatch(homeHero, /PrivateProtectionHeroVisual/);
assert.doesNotMatch(homeHero, /hero\.sceneLabel/);
assert.match(homeHero, /\[hyphens:manual\]/);
assert.doesNotMatch(homeHero, /hyphens-auto/);
assert.match(homeHero, /hero\.titleLead/);
assert.match(homeHero, /hero\.titleAccent/);
assert.match(homeHero, /radial-gradient\(ellipse_at_center/);
assert.doesNotMatch(homeHero, /hero\.proof|proofIcons/);
assert.match(productTicker, /home:[\s\S]*?ticker\.kassenBoost[\s\S]*?ticker\.bav[\s\S]*?ticker\.bkv/);
assert.doesNotMatch(homeHero, /\[overflow-wrap:anywhere\]/);
assert.match(indexCss, /#root[\s\S]{0,160}width: 100%/);
assert.match(indexCss, /overflow-x: clip/);

const insurancePathway = readText('src/components/home/InsurancePathway.jsx');
const howHealioWorks = readText('src/components/home/HowHealioWorks.jsx');
const footer = readText('src/components/sections/Footer.jsx');
const layout = readText('src/components/Layout.jsx');

assert.match(insurancePathway, /id="schutz"/);
assert.match(insurancePathway, /getPath\(item\.routeKey\)/);
assert.match(insurancePathway, /items\.map/);
assert.match(insurancePathway, /item\.routeKey/);
assert.doesNotMatch(insurancePathway, /iconMap|cardStyles/);
assert.match(insurancePathway, /\{item\.cta\}/);
assert.doesNotMatch(insurancePathway, /item\.detail/);
assert.match(howHealioWorks, /id="so-funktioniert"/);
assert.doesNotMatch(howHealioWorks, /healio-app-dashboard-card|appFeatures/);
assert.match(footer, /\/images\/healio-app-dashboard-card\.webp/);
assert.match(footer, /width="720"/);
assert.match(footer, /height="1565"/);
assert.match(footer, /loading="lazy"/);
assert.match(footer, /!hideAppPromotion/);
assert.match(layout, /pathname === '\/'/);
assert.match(layout, /<Footer hideCta=\{hideCta\} hideAppPromotion=\{hideAppPromotion\}/);

const homeTrust = readText('src/components/home/HomeTrust.jsx');
const audienceLinks = readText('src/components/home/AudienceLinks.jsx');
const homeFinalCta = readText('src/components/home/HomeFinalCTA.jsx');

assert.match(homeTrust, /trust\.items/);
assert.match(homeTrust, /\/images\/healio-app-dashboard-card\.webp/);
assert.match(homeTrust, /trust\.appScreenshotAlt/);
assert.match(homeTrust, /width="720"/);
assert.match(homeTrust, /height="1565"/);
assert.match(homeTrust, /loading="lazy"/);
assert.match(audienceLinks, /getPath\(company\.routeKey\)/);
assert.match(audienceLinks, /getPath\(practice\.routeKey\)/);
assert.match(audienceLinks, /healio-hero-markenrelief-v1\.webp/);
assert.match(homeFinalCta, /KASSENBOOST_COMPARE_URL/);
assert.doesNotMatch(homeFinalCta, /finalCta\.items|getPath\('terminvereinbarung'\)/);

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
  'ProductTicker',
  'InsurancePathway',
  'HowHealioWorks',
  'HomeTrust',
  'AudienceLinks',
  'HomeFinalCTA',
].forEach((componentName) => assert.match(mainHomePage, new RegExp(componentName)));

const funnelOrder = [
  '<HomeHero',
  '<ProductTicker variant="home"',
  '<HowHealioWorks',
  '<InsurancePathway',
  '<HomeTrust',
  '<HomeFinalCTA',
  '<AudienceLinks',
];
funnelOrder.slice(1).forEach((component, index) => {
  assert.ok(
    mainHomePage.indexOf(funnelOrder[index]) < mainHomePage.indexOf(component),
    `${funnelOrder[index]} muss vor ${component} stehen`
  );
});
assert.match(mainHomePage, /<ProductTicker variant="home"/);
assert.doesNotMatch(mainHomePage, /AmbulantBudgetFeature/);

assert.doesNotMatch(
  mainHomePage,
  /BavProviderComparison|CompoundInterestCalculator|CombinedZeitfalleRenditeSection|GesundheitSection|WhyBkvWithHealio|Contact/
);
assert.match(indexHtml, /<title>Versicherungen für Privatkunden &amp; Unternehmen \| Healio<\/title>/);
assert.doesNotMatch(indexHtml, /Healio B2B/);
assert.match(indexHtml, /home-hero-active:not\(\.home-hero-passed\)/);
assert.match(seoRoutes, /path: '\/'[\s\S]{0,240}title: 'Versicherungen für Privatkunden & Unternehmen/);
assert.match(schemaMarkup, /unabhängiger Versicherungsmakler/);

console.log('Homepage contract passed.');
