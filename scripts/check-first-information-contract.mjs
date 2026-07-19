import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const parseJson = (relativePath) => JSON.parse(read(relativePath));

const app = read('src/App.jsx');
const header = read('src/components/Header.jsx');
const page = read('src/pages/ErstinformationPage.jsx');
const seoHead = read('src/components/SEOHead.jsx');
const seoRoutes = read('scripts/seo-routes.mjs');
const sitemap = read('public/sitemap.xml');
const deCommon = parseJson('src/i18n/locales/de/common.json');
const enCommon = parseJson('src/i18n/locales/en/common.json');
const deLegal = parseJson('src/i18n/locales/de/legal.json');
const enLegal = parseJson('src/i18n/locales/en/legal.json');

const checks = [
  ['German React route exists', app.includes('path="erstinformation" element={<ErstinformationPage />}')],
  ['English React route exists', app.includes('path="initial-information" element={<ErstinformationPage />}')],
  ['German route uses a solid header', header.includes("'/erstinformation'")],
  ['English route uses a solid header', header.includes("'/en/initial-information'")],
  ['Footer no longer mislabels section 60 VVG as initial information', deCommon.footer.erstinformation === 'Erstinformation' && enCommon.footer.erstinformation === 'Initial information'],
  ['German title names sections 15 and 16 VersVermV', deLegal.erstinformation.title.includes('§§ 15 und 16 VersVermV')],
  ['English title names sections 15 and 16 VersVermV', enLegal.erstinformation.title.includes('§§ 15 and 16 VersVermV')],
  ['Broker registration number is present', page.includes('D-C1LE-OVLQH-98')],
  ['Remuneration disclosure states exclusive commission', deLegal.erstinformation.advice.remuneration.includes('ausschließlich') && deLegal.erstinformation.advice.remuneration.includes('Courtage')],
  ['No direct customer remuneration is disclosed', deLegal.erstinformation.advice.noOtherRemuneration.includes('keine gesonderte direkte Vergütung')],
  ['Both participation directions are disclosed', deLegal.erstinformation.participations.outbound.includes('keine unmittelbare oder mittelbare Beteiligung') && deLegal.erstinformation.participations.inbound.includes('Kein Versicherungsunternehmen')],
  ['Both dispute resolution bodies are present', page.includes('Versicherungsombudsmann e. V.') && page.includes('Ombudsmann Private Kranken- und Pflegeversicherung')],
  ['Section 60 VVG is explained separately', deLegal.erstinformation.advisoryBasis.title.includes('§ 60 VVG')],
  ['German SEO route exists', seoRoutes.includes("path: '/erstinformation'")],
  ['English SEO route exists', seoRoutes.includes("path: '/en/initial-information'")],
  ['Hreflang mapping exists', seoHead.includes('`${SITE_URL}/en/initial-information`') && seoHead.includes('`${SITE_URL}/erstinformation`')],
  ['Sitemap contains both routes', sitemap.includes('https://healio.de/erstinformation') && sitemap.includes('https://healio.de/en/initial-information')],
  ['Page offers print/PDF output', page.includes('window.print()')],
];

const failed = checks.filter(([, passed]) => !passed);

for (const [label, passed] of checks) {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} first-information contract check(s) failed.`);
  process.exit(1);
}

console.log(`\n${checks.length} first-information contract checks passed.`);
