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

assert.equal(de.hero.title, 'Krankenzusatzversicherung, einfach digital.');
assert.equal(en.hero.title, 'Supplementary health insurance, made simple.');
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
const protectionScene = readText('src/components/home/HomeProtectionScene.jsx');

assert.match(homeHero, /id="home-hero-heading"/);
assert.match(homeHero, /prefers-reduced-motion/);
assert.match(homeHero, /home-hero-passed/);
assert.match(protectionScene, /renderer\.dispose\(\)/);
assert.match(protectionScene, /cancelAnimationFrame/);
assert.match(protectionScene, /aria-hidden="true"/);

const insurancePathway = readText('src/components/home/InsurancePathway.jsx');
const howHealioWorks = readText('src/components/home/HowHealioWorks.jsx');

assert.match(insurancePathway, /id="schutz"/);
assert.match(insurancePathway, /getPath\(item\.routeKey\)/);
assert.match(insurancePathway, /ambulant:/);
assert.match(insurancePathway, /dental:/);
assert.match(insurancePathway, /hospital:/);
assert.match(howHealioWorks, /id="so-funktioniert"/);
assert.match(howHealioWorks, /\/images\/healio-app-dashboard\.png/);

const ambulantBudgetFeature = readText('src/components/home/AmbulantBudgetFeature.jsx');
const homeTrust = readText('src/components/home/HomeTrust.jsx');
const audienceLinks = readText('src/components/home/AudienceLinks.jsx');
const homeFinalCta = readText('src/components/home/HomeFinalCTA.jsx');

assert.match(ambulantBudgetFeature, /t\('budget\.amount'\)/);
assert.match(ambulantBudgetFeature, /getPath\('ambulant'\)/);
assert.match(homeTrust, /trust\.items/);
assert.match(audienceLinks, /getPath\(item\.routeKey\)/);
assert.match(homeFinalCta, /getPath\('terminvereinbarung'\)/);

const homeComponentDir = path.join(rootDir, 'src/components/home');
const nonBudgetHomeSource = fs.existsSync(homeComponentDir)
  ? fs.readdirSync(homeComponentDir)
    .filter((file) => file.endsWith('.jsx') && file !== 'AmbulantBudgetFeature.jsx')
    .map((file) => fs.readFileSync(path.join(homeComponentDir, file), 'utf8'))
    .join('\n')
  : '';

assert.doesNotMatch(nonBudgetHomeSource, /3[.,]000\s*(?:EUR|€)/);

console.log('Homepage contract passed.');
