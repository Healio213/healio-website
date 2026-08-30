import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const page = readText('src/pages/EmployerBavCalculatorPage.jsx');
const app = readText('src/App.jsx');
const language = readText('src/hooks/useLanguage.js');
const header = readText('src/components/Header.jsx');
const siteSeoContract = readText('scripts/check-site-seo.mjs');
const sitemap = readText('public/sitemap.xml');
const de = readJson('src/i18n/locales/de/unternehmen.json').bavDecisionCalculator;
const en = readJson('src/i18n/locales/en/unternehmen.json').bavDecisionCalculator;

const dePath = '/unternehmen/vorsorge-rechner';
const enPath = '/en/companies/pension-calculator';
const deSeo = seoRoutes.find((route) => route.path === dePath);
const enSeo = seoRoutes.find((route) => route.path === enPath);

assert(deSeo, 'German calculator SEO route is missing.');
assert(enSeo, 'English calculator SEO route is missing.');
assert.equal(deSeo.canonical, `https://healio.de${dePath}`);
assert.equal(enSeo.canonical, `https://healio.de${enPath}`);
assert.equal(deSeo.robots, 'noindex, nofollow');
assert.equal(enSeo.robots, 'noindex, nofollow');
assert.deepEqual(deSeo.hreflang, { de: deSeo.canonical, en: enSeo.canonical });
assert.deepEqual(enSeo.hreflang, { de: deSeo.canonical, en: enSeo.canonical });
assert.equal(deSeo.schemaMarkup?.['@type'], 'WebPage');
assert.equal(deSeo.schemaMarkup?.url, deSeo.canonical);
assert.equal(deSeo.schemaMarkup?.['@id'], `${deSeo.canonical}#webpage`);
assert.equal(enSeo.schemaMarkup?.['@type'], 'WebPage');
assert.equal(enSeo.schemaMarkup?.url, enSeo.canonical);
assert.equal(enSeo.schemaMarkup?.['@id'], `${enSeo.canonical}#webpage`);
assert(!sitemap.includes(deSeo.canonical), 'German noindex calculator must stay out of the sitemap.');
assert(!sitemap.includes(enSeo.canonical), 'English noindex calculator must stay out of the sitemap.');

assert.match(app, /EmployerBavCalculatorPage/);
assert.match(app, /path="unternehmen\/vorsorge-rechner"/);
assert.match(app, /path="companies\/pension-calculator"/);
assert.match(language, /vorsorgeRechner: '\/unternehmen\/vorsorge-rechner'/);
assert.match(language, /vorsorgeRechner: '\/en\/companies\/pension-calculator'/);
assert.match(header, /\/unternehmen\/vorsorge-rechner/);
assert.match(header, /\/en\/companies\/pension-calculator/);
assert.match(siteSeoContract, /'\/unternehmen\/vorsorge-rechner'/);
assert.match(siteSeoContract, /'\/en\/companies\/pension-calculator'/);

assert.match(page, /robots="noindex, nofollow"/);
assert.match(page, /calculateEmployerPlan/);
assert.match(page, /calculateBavScenarios/);
assert.match(page, /calculateIllustrativeMonthlyWithdrawal/);
assert.match(page, /BAV_PAYOUT_MODEL/);
assert.match(page, /data-result-group="company"/);
assert.match(page, /data-result-group="employee"/);
assert.match(page, /data-result-group="capital"/);
assert.match(page, /data-bav-split/);
assert.match(page, /data-standard-scenario/);
assert.match(page, /data-historical-scenario/);
assert.match(page, /MARKET_RATE_PRESETS = \[4, 6, 8, 10, 11\.1\]/);
assert.match(page, /useState\(10\)/);
assert.match(page, /min=\{0\}[\s\S]{0,100}max=\{12\}[\s\S]{0,100}step=\{0\.1\}/);
assert.match(page, /DURATION_OPTIONS = \[25, 30, 35\]/);
assert.match(page, /COST_PRESETS = \[0\.9, 1\.3, 1\.7, 2\]/);
assert.match(page, /min=\{2001\}/);
assert.match(page, /max=\{6450\}/);
assert.match(page, /publicExample[\s\S]{0,260}credit:/);
assert.match(page, /publicExample[\s\S]{0,260}impact:/);
assert.match(page, /aria-describedby/);
assert.match(page, /aria-valuetext=\{valueLabel\}/);
assert.match(page, /focus-visible:ring/);
assert.match(page, /const Metric = \(\{ label, value, primary = false, note, className = '' \}\)/);
assert.match(page, /<Metric[\s\S]{0,120}className="sm:col-span-2"/);
assert.doesNotMatch(page, /<div className="sm:col-span-2">\s*<Metric/);
assert.match(page, /note && <span className="mt-2 block text-xs leading-5 text-slate-600">/);
assert.match(page, /<dt className="text-xs font-bold uppercase tracking-\[0\.12em\] text-slate-600">/);
assert.match(page, /valueLabel=\{formatCurrency\(annualRevenue\)\}/);
assert.match(page, /data-results-announcement/);
assert.doesNotMatch(page, /<section aria-labelledby="results-title" aria-live=/);

assert.equal(de.hero.eyebrow, 'bAV-Entscheidungsrechner 2026');
assert.match(de.hero.title, /676 EUR/);
assert.equal(de.results.company.title, 'Unternehmensaufwand');
assert.equal(de.results.employee.title, 'Mitarbeiterwirkung');
assert.equal(de.results.capital.title, 'Kapitalprojektion');
assert.match(de.results.capital.monthlyGross, /4-%-Modellauszahlung/);
assert.match(de.results.capital.monthlyAfter, /\{\{deduction\}\}/);
assert.match(de.results.capital.monthlyNote, /keine garantierte oder lebenslange Tarif-Rente/i);
assert.equal(en.results.company.title, 'Company cost');
assert.equal(en.results.employee.title, 'Employee impact');
assert.equal(en.results.capital.title, 'Capital projection');
assert.equal(de.results.company.total, 'modellierter Gesamtaufwand pro Jahr');
assert.equal(en.results.company.total, 'modelled total annual employer cost');
assert.match(de.controls.salary.hint, /2\.001–6\.450 EUR/);
assert.match(de.controls.salary.hint, /Übergangsbereich/);
assert.match(de.controls.salary.hint, /Jahresarbeitsentgeltgrenze/);
assert.match(en.controls.salary.hint, /EUR 2,001–6,450/);
assert.match(en.controls.salary.hint, /transition zone/);
assert.match(en.controls.salary.hint, /annual income threshold/);
assert.match(de.controls.contribution.splitFree, /338 EUR/);
assert.match(de.controls.contribution.splitLiable, /338 EUR/);
assert.equal(de.controls.returnRate.standard, 'Standardszenario');
assert.equal(de.controls.returnRate.historical, 'Historischer 15-Jahres-Wert');
assert.equal(de.controls.costs.formulaExample, '10 % − 2 % = 8 %');
assert.match(de.controls.costs.description, /2,00 Prozentpunkte/);
assert.match(de.sources.msci.description, /484,83/);
assert.match(de.sources.msci.description, /11,10 % p\. a\./);
assert.match(de.sources.bafin.description, /1,90 Prozentpunkte/);
assert.equal(de.sources.msci.url, 'https://www.msci.com/documents/10199/255599/msci-world-index-usd-net.pdf');
assert.equal(de.sources.msciEur.url, 'https://www.msci.com/resources/factsheets/index_fact_sheet/msci-world-index-eur-net.pdf');
assert.match(de.sources.bafin.url, /^https:\/\/bafin\.de\//);
assert.match(de.disclaimers.projection, /keine Prognose oder Garantie/);
assert.match(de.disclaimers.projection, /gewählte.*Renditeminderung.*berücksichtigt/i);
assert.match(de.disclaimers.projection, /konkreten Tarifkosten.*nicht vollständig/i);
assert.match(de.disclaimers.projection, /4 %/);
assert.match(de.disclaimers.projection, /30-%-Modellabzug/);
assert.match(de.disclaimers.projection, /keine garantierte oder lebenslange Tarif-Rente/i);
assert.match(de.disclaimers.payroll, /Payroll/);
assert.match(de.disclaimers.assumptions, /durchschnittlicher Zusatzbeitrag von 2,9 %/);
assert.match(de.disclaimers.assumptions, /ein Kind/);
assert.match(de.disclaimers.assumptions, /außerhalb Sachsens/);
assert.match(de.disclaimers.legalFramework, /§ 3 Nr\. 63 EStG/);
assert.match(de.disclaimers.legalFramework, /Pensionsfonds/);
assert.match(de.disclaimers.legalFramework, /Pensionskasse/);
assert.match(de.disclaimers.legalFramework, /Direktversicherung/);
assert.match(de.disclaimers.legalFramework, /8\.112 EUR/);
assert.match(de.disclaimers.legalFramework, /4\.056 EUR/);
assert.match(de.disclaimers.legalFramework, /nicht durch andere Beiträge ausgeschöpft/);
assert.match(de.disclaimers.legalFramework, /zwölf gleich hohe Monatsbeiträge/);
assert.match(en.disclaimers.legalFramework, /Section 3 no\. 63 EStG/);
assert.match(en.disclaimers.legalFramework, /pension fund/);
assert.match(en.disclaimers.legalFramework, /pension scheme/);
assert.match(en.disclaimers.legalFramework, /direct insurance/);
assert.match(en.disclaimers.legalFramework, /EUR 8,112/);
assert.match(en.disclaimers.legalFramework, /EUR 4,056/);
assert.match(en.disclaimers.legalFramework, /not (?:been )?used by other contributions/);
assert.match(en.disclaimers.legalFramework, /twelve equal monthly contributions/);
assert.equal(
  de.sources.drv.url,
  'https://www.deutsche-rentenversicherung.de/DRV/DE/Experten/Arbeitgeber-und-Steuerberater/summa-summarum/Lexikon/B/beitragsfreiheit_von_arbeitgeberbeitraegen_zur_betrieblichen_altersversorgung.html',
);
assert.match(de.sources.drv.description, /8\.112 EUR/);
assert.match(de.sources.drv.description, /4\.056 EUR/);
assert.equal(
  de.sources.federalGovernment.url,
  'https://www.bundesregierung.de/breg-de/aktuelles/beitragsgemessungsgrenzen-2386514',
);
assert.match(de.sources.federalGovernment.description, /8\.450 EUR/);
assert.match(de.sources.federalGovernment.description, /5\.812,50 EUR/);
assert.match(de.sources.federalGovernment.description, /6\.450 EUR/);
assert.equal(de.sources.bmgHealth.url, 'https://www.bundesgesundheitsministerium.de/beitraege/seite');
assert.match(de.sources.bmgHealth.description, /14,6 %/);
assert.match(de.sources.bmgHealth.description, /2,9 %/);
assert.equal(
  de.sources.bmgCare.url,
  'https://www.bundesgesundheitsministerium.de/themen/pflege/online-ratgeber-pflege/die-pflegeversicherung/finanzierung',
);
assert.match(de.sources.bmgCare.description, /3,6 %/);
assert.equal(de.sources.incomeTax.url, 'https://ao.bundesfinanzministerium.de/lsth/2026/B-Anhaenge/Anhang-03/II/inhalt.html');
assert.match(de.sources.incomeTax.description, /§ 22 Nr\. 5 EStG/);
assert.equal(de.sources.healthContributions.url, 'https://www.gesetze-im-internet.de/sgb_5/__229.html');
assert.match(de.sources.healthContributions.description, /Kranken- und Pflegeversicherung/);
for (const sourceKey of ['drv', 'federalGovernment', 'bmgHealth', 'bmgCare', 'incomeTax', 'healthContributions']) {
  assert.equal(en.sources[sourceKey].url, de.sources[sourceKey].url);
}
assert.match(page, /bavDecisionCalculator\.disclaimers\.assumptions/);
assert.match(page, /bavDecisionCalculator\.disclaimers\.legalFramework/);
assert.match(de.results.employee.publicExample, /\{\{credit\}\}/);
assert.match(de.results.employee.publicExample, /\{\{impact\}\}/);
assert.doesNotMatch(JSON.stringify(de), /garantierte Nettorente|garantierter ROI|sichere Rendite/i);

console.log('bAV employer calculator contract passed.');
