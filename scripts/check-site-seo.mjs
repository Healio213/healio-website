import assert from 'node:assert/strict';
import fs from 'node:fs';
import { seoRoutes } from './seo-routes.mjs';

const SITE_URL = 'https://healio.de';

const publicRouterPaths = [
  '/', '/about', '/leistungen', '/kassenboost', '/unternehmen', '/partner', '/hebammen', '/zahnaerzte',
  '/heilberufe-vorsorge', '/lebenshilfe', '/kontakt', '/terminvereinbarung', '/ambulant',
  '/zahn', '/stationaer', '/impressum', '/agb', '/datenschutz', '/erstinformation',
  '/konto-loeschen', '/blog',
  '/en', '/en/about', '/en/services', '/en/kassenboost', '/en/companies', '/en/partner', '/en/midwives',
  '/en/contact', '/en/appointment', '/en/outpatient', '/en/dental', '/en/inpatient',
  '/en/legal-notice', '/en/terms', '/en/privacy', '/en/initial-information', '/en/blog',
  '/tiktok', '/en/tiktok', '/instagram', '/en/instagram',
  '/potenzialanalyse', '/en/potential-analysis', '/confirmation', '/en/confirmation',
  '/app-bestaetigt', '/reset-password', '/tierkrankenversicherung', '/en/pet-insurance',
];

const noindexPaths = new Set([
  '/lebenshilfe', '/konto-loeschen', '/confirmation', '/en/confirmation',
  '/app-bestaetigt', '/reset-password', '/tiktok', '/en/tiktok',
  '/instagram', '/en/instagram',
]);

const bilingualPairs = [
  ['/', '/en'],
  ['/about', '/en/about'],
  ['/leistungen', '/en/services'],
  ['/kassenboost', '/en/kassenboost'],
  ['/unternehmen', '/en/companies'],
  ['/partner', '/en/partner'],
  ['/hebammen', '/en/midwives'],
  ['/kontakt', '/en/contact'],
  ['/terminvereinbarung', '/en/appointment'],
  ['/ambulant', '/en/outpatient'],
  ['/zahn', '/en/dental'],
  ['/stationaer', '/en/inpatient'],
  ['/impressum', '/en/legal-notice'],
  ['/agb', '/en/terms'],
  ['/datenschutz', '/en/privacy'],
  ['/erstinformation', '/en/initial-information'],
  ['/blog', '/en/blog'],
  ['/potenzialanalyse', '/en/potential-analysis'],
  ['/tierkrankenversicherung', '/en/pet-insurance'],
];

const normalizeCanonical = (path) => path === '/' ? SITE_URL : `${SITE_URL}${path}`;
const routeMap = new Map();
const canonicals = new Set();

for (const route of seoRoutes) {
  assert(!routeMap.has(route.path), `Doppelte SEO-Route: ${route.path}`);
  assert(!canonicals.has(route.canonical), `Doppelter Canonical: ${route.canonical}`);
  assert.equal(route.canonical, normalizeCanonical(route.path), `Canonical passt nicht zur Route ${route.path}`);
  assert(route.title?.trim().length >= 12, `SEO-Titel fehlt oder ist zu kurz: ${route.path}`);
  assert(route.description?.trim().length >= 35, `Meta-Description fehlt oder ist zu kurz: ${route.path}`);
  assert.equal(route.lang, route.path === '/en' || route.path.startsWith('/en/') ? 'en' : 'de', `Falsche Sprache: ${route.path}`);
  routeMap.set(route.path, route);
  canonicals.add(route.canonical);
}

for (const path of publicRouterPaths) {
  assert(routeMap.has(path), `Öffentliche Router-Seite ohne statische SEO-Konfiguration: ${path}`);
}

for (const path of noindexPaths) {
  assert.match(routeMap.get(path).robots || '', /^noindex\b/, `Funktionsseite muss noindex sein: ${path}`);
}

for (const [dePath, enPath] of bilingualPairs) {
  const deRoute = routeMap.get(dePath);
  const enRoute = routeMap.get(enPath);
  const expected = { de: deRoute.canonical, en: enRoute.canonical };
  assert.deepEqual(deRoute.hreflang, expected, `Unvollständiges hreflang für ${dePath}`);
  assert.deepEqual(enRoute.hreflang, expected, `Unvollständiges hreflang für ${enPath}`);
}

const sitemap = fs.readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
for (const path of publicRouterPaths) {
  const route = routeMap.get(path);
  const sitemapCanonical = route.canonical === SITE_URL ? `${SITE_URL}/` : route.canonical;
  if (noindexPaths.has(path)) {
    assert(!sitemap.includes(`<loc>${sitemapCanonical}</loc>`), `Noindex-Seite steht in der Sitemap: ${path}`);
  } else {
    assert(sitemap.includes(`<loc>${sitemapCanonical}</loc>`), `Indexierbare Seite fehlt in der Sitemap: ${path}`);
  }
}

const vercelConfig = JSON.parse(fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
assert(
  !(vercelConfig.rewrites || []).some((rewrite) => rewrite.destination === '/404.html'),
  '404.html darf nicht per Rewrite mit Status 200 ausgeliefert werden.'
);

const generator = fs.readFileSync(new URL('./generate-seo-pages.mjs', import.meta.url), 'utf8');
const htmlTemplate = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert(generator.includes("path.join(distDir, '404.html')"), 'Der Build muss eine statische 404.html erzeugen.');
assert(generator.includes('noindex, follow'), 'Die 404-Seite muss noindex erhalten.');
assert.match(htmlTemplate, /<link rel="canonical" href="https:\/\/healio\.de" data-react-helmet="true">/, 'Das statische Canonical muss von React Helmet übernommen werden, damit clientseitig kein zweites Canonical entsteht.');
assert(generator.includes('data-react-helmet="true"'), 'Der SEO-Generator muss das von React Helmet verwaltete Canonical erhalten.');

console.log(`SEO-Vertrag erfüllt: ${publicRouterPaths.length} Router-Seiten, ${bilingualPairs.length} Sprachpaare, ${noindexPaths.size} Noindex-Seiten.`);
