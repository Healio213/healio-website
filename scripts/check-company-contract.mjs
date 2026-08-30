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
const solutions = readText('src/components/company/CompanySolutions.jsx');
const economics = readText('src/components/company/CompanyEconomics.jsx');
const workforce = readText('src/components/company/CompanyWorkforceConcept.jsx');
const explainerVideos = readText('src/components/company/CompanyExplainerVideo.jsx');
assert(
  fs.existsSync(path.join(rootDir, 'src/components/company/CompanyBavLeverage.jsx')),
  'Der kompakte bAV-Hebel fehlt.',
);
const bavLeverage = readText('src/components/company/CompanyBavLeverage.jsx');
const page = readText('src/pages/UnternehmenPage.jsx');
const seoRoutes = readText('scripts/seo-routes.mjs');

assert.equal(de.hero.titleLead, 'Vorsorge, die Mitarbeiter verstehen.');
assert.equal(de.hero.titleHighlight, 'Ein System, das Sie steuern.');
assert.equal(de.hero.analysisCta, 'Vorsorge-Check starten');
assert.match(de.hero.description, /bAV, bKV und Gesundheitsmanagement/);
assert.equal(en.hero.titleLead, 'Benefits employees understand.');
assert.match(hero, /healio-hero-markenrelief-v1\.webp/);
assert.match(hero, /object-\[62%_center\]/);
assert.doesNotMatch(hero, /healio-wordmark-white/);
assert.match(hero, /min-h-\[100svh\]/);
assert.match(hero, /href="#unternehmen-leistungen"/);
assert.match(solutions, /id="unternehmen-leistungen"/);

assert.match(responsibility, /dai\.de/);
assert.match(responsibility, /destatis\.de/);
assert.match(responsibility, /bmas\.de/);
assert.deepEqual(de.solutions.items.map((item) => item.key), ['pension', 'health', 'prevention', 'management']);
assert.equal(de.workforce.eyebrow, 'KassenBoost für Mitarbeiter');
assert.equal(en.workforce.eyebrow, 'KassenBoost for employees');
assert.match(de.workforce.description, /freiwillig und kostenlos/);
assert.match(de.workforce.points.join(' '), /Ohne Kontaktdaten/);
assert.match(de.workforce.privacyDescription, /weder an den Arbeitgeber noch an Healio übermittelt/);
assert.doesNotMatch(JSON.stringify(de.workforce), /3\.000|IKK|Bonus/);
assert.doesNotMatch(JSON.stringify(en.workforce), /3,000|IKK|bonus/i);
assert.match(de.economics.summaryText, /keine Erstattung/);
assert.match(de.economics.disclaimer, /Keine Steuerberatung/);
assert.match(economics, /gesetze-im-internet\.de\/estg/);
assert.match(economics, /bundesfinanzhof\.de/);
assert.match(economics, /bundesgesundheitsministerium\.de/);
assert.match(workforce, /healio-belegschaft/);
assert.match(workforce, /https:\/\/kassenboost\.de\/\?utm_source=healio&utm_medium=website&utm_campaign=arbeitgeberzugang/);
assert.match(workforce, /useLanguage/);
assert.match(explainerVideos, /lang !== 'de'/);
assert.match(explainerVideos, /controls/);
assert.match(explainerVideos, /playsInline/);
assert.match(explainerVideos, /preload="metadata"/);
assert.match(explainerVideos, /kind="captions"/);
assert.doesNotMatch(explainerVideos, /autoPlay|autoplay/);
assert.match(explainerVideos, /vorsorgemanagement-a-v1\.mp4/);
assert.match(explainerVideos, /bav-zahlenbeispiel-b-v1\.mp4/);
[
  'public/videos/unternehmen/vorsorgemanagement-a-v1.mp4',
  'public/videos/unternehmen/vorsorgemanagement-a-v1-poster.webp',
  'public/videos/unternehmen/vorsorgemanagement-a-v1-de.vtt',
  'public/videos/unternehmen/bav-zahlenbeispiel-b-v1.mp4',
  'public/videos/unternehmen/bav-zahlenbeispiel-b-v1-poster.webp',
  'public/videos/unternehmen/bav-zahlenbeispiel-b-v1-de.vtt',
].forEach((relativePath) => assert(fs.existsSync(path.join(rootDir, relativePath)), `${relativePath} fehlt.`));
assert.match(workforce, /getPath\('potenzialanalyse'\)/);
assert.match(workforce, /\?interest=kassenboost/);
assert.doesNotMatch(workforce, /to=["']\/potenzialanalyse\?interest=kassenboost/);
assert.doesNotMatch(workforce, /getPath\('partner'\)|to=["']\/partner/);
assert.equal(de.bavLeverage.title, 'Rund 75 EUR Nettoeffekt. 676 EUR Vorsorge. 30 Jahre Zeit.');
assert.equal(
  [de.bavLeverage.titleLine1, de.bavLeverage.titleLine2, de.bavLeverage.titleLine3].join(' '),
  de.bavLeverage.title,
);
assert.match(bavLeverage, /bavLeverage\.titleLine2/);
assert.match(de.bavLeverage.netEffectExplanation, /Auszahlungsnetto/);
assert.match(de.bavLeverage.netEffectExplanation, /rund 75 EUR/);
assert.match(en.bavLeverage.netEffectExplanation, /take-home pay/i);
assert.match(bavLeverage, /bavLeverage\.netEffectExplanation/);
assert.match(bavLeverage, /calculateBavScenarios/);
assert.match(bavLeverage, /calculateEmployerBavLeverage/);
assert.match(bavLeverage, /calculateIllustrativeMonthlyWithdrawal/);
assert.match(bavLeverage, /useState\('capital'\)/);
assert.match(bavLeverage, /data-bav-flow="true"/);
assert.match(bavLeverage, /data-payout-mode=\{resultMode\}/);
assert.match(de.bavLeverage.flow.formula, /8 % Modellrendite/);
assert.match(de.bavLeverage.flow.contractNote, /Einzahlungen in 30 Jahren/);
assert.match(de.bavLeverage.flow.monthlyNote, /keine garantierte oder lebenslange Tarif-Rente/i);
assert.match(de.bavLeverage.payoutModel, /4 %/);
assert.match(de.bavLeverage.payoutModel, /30 %/);
assert.match(bavLeverage, /<details/);
assert.match(solutions, /<details/);
assert.match(responsibility, /<details/);
assert.match(economics, /<details/);
assert.match(workforce, /<details/);
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
assert.match(bavLeverage, /calculator-sources-title/);
assert.match(de.bavLeverage.legalSource, /Rechtsgrundlagen und Annahmen/);
assert.match(bavLeverage, /msci-world-index-usd-net\.pdf/);
assert.doesNotMatch(bavLeverage, /getPath\('partner'\)|to=["']\/partner/);
assert.match(seoRoutes, /Betriebliches Vorsorgemanagement \| bAV, bKV & BGM \| Healio/);
assert.match(seoRoutes, /healio-hero-markenrelief-v1\.webp/);
assert.doesNotMatch(JSON.stringify(de), /Der Staat regelt nichts|garantiert 7|Verlust von 107|Finanzamt zum Sponsor|100 Prozent steuerlich absetzbar/);
assert.match(de.faq.items[3].answer, /kostenlosen KassenBoost-Vergleich/);
assert.match(de.faq.items[3].answer, /weder dem Arbeitgeber noch Healio übermittelt/);
assert.match(de.faq.items[3].answer, /können daraus Kosten entstehen/);
assert.match(en.faq.items[3].answer, /free KassenBoost comparison/);
assert.match(en.faq.items[3].answer, /neither the employer nor Healio/);
assert.match(en.faq.items[3].answer, /may involve costs/);

[
  'CompanyHero',
  'CompanyRealityCheck',
  'CompanyExplainerVideo',
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
  page.indexOf('<CompanyRealityCheck />') < page.indexOf('<CompanySolutions />'),
  'Der Reality Check muss vor den Produktbausteinen stehen.',
);
assert(
  page.indexOf('<CompanyRealityCheck />') < page.indexOf('<CompanyExplainerVideo kind="system" />')
    && page.indexOf('<CompanyExplainerVideo kind="system" />') < page.indexOf('<CompanySolutions />'),
  'Video A muss zwischen Reality Check und Produktbausteinen stehen.',
);
assert(
  page.indexOf('<CompanyBavLeverage />') < page.indexOf('<CompanyExplainerVideo kind="bav" />'),
  'Video B muss direkt nach dem bAV-Zahlenbeispiel stehen.',
);
assert(
  page.indexOf('<CompanyProcess />') < page.indexOf('<CompanyWorkforceConcept />'),
  'Der kostenlose Mitarbeiterzugang soll erst nach dem Hauptprozess erscheinen.',
);
assert(
  page.indexOf('<CompanyWorkforceConcept />') < page.indexOf('<CompanyFAQ />'),
  'Der Mitarbeiterzugang muss vor den FAQ stehen.',
);
assert.doesNotMatch(page, /ProductTicker/);
assert.doesNotMatch(page, /<main/);

console.log('Company contract passed.');
