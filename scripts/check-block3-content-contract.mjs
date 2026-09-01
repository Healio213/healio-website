import assert from 'node:assert/strict';
import fs from 'node:fs';
import { seoRoutes } from './seo-routes.mjs';
import { getLanguageSwitchTarget, routeMap } from '../src/hooks/useLanguage.js';
import { buildNitaContext } from '../src/lib/nitaContext.js';

const read = (relativePath) => fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
const readJson = (relativePath) => JSON.parse(read(relativePath));

const datenschutzPage = read('src/pages/DatenschutzPage.jsx');
assert(!datenschutzPage.includes('LinkedIn Lead Gen Formulare'), 'Nicht aktiver LinkedIn-Lead-Gen-Abschnitt darf nicht öffentlich gerendert werden.');
assert(!datenschutzPage.includes('Operativer Prüfhinweis'), 'Interner Arbeitsentwurf darf nicht öffentlich gerendert werden.');

const praxisChecklistePage = read('src/pages/ZahnaerztePraxisChecklistePage.jsx');
assert(praxisChecklistePage.includes('Fachlicher Arbeitsstand'), 'Freigabe-Banner der Praxis-Checkliste muss bis zur Freigabe sichtbar bleiben.');
assert(praxisChecklistePage.includes('robots="noindex, nofollow"'), 'Praxis-Checkliste muss bis zur Freigabe noindex bleiben.');
const praxisChecklisteSeo = seoRoutes.find(({ path }) => path === '/zahnaerzte/praxis-checkliste');
assert.equal(praxisChecklisteSeo?.robots, 'noindex, nofollow', 'SEO-Route der Praxis-Checkliste muss noindex bleiben.');
assert(!read('public/sitemap.xml').includes('<loc>https://healio.de/zahnaerzte/praxis-checkliste</loc>'), 'Praxis-Checkliste darf nicht in der Sitemap stehen.');

const miaKnowledge = read('public/mia-knowledge-base.txt');
assert(!miaKnowledge.includes('Faustregel: Bei Kinderwunsch'), 'Stationärer Tarifvergleich darf nicht mit Kinderwunsch argumentieren.');
assert(miaKnowledge.includes('Die SDK hat keine tarifliche Wartezeit'), 'Stationärer Tarifvergleich muss die fehlende SDK-Wartezeit neutral erklären.');
assert(miaKnowledge.includes('bei der Bayerischen gelten für eine Entbindung acht Monate'), 'Stationärer Tarifvergleich muss die achtmonatige Wartezeit der Bayerischen neutral erklären.');

const enHeilberufe = readJson('src/i18n/locales/en/heilberufe.json');
assert.equal(enHeilberufe.ablauf.steps[1].text, '30 minutes by phone or video call, Germany-wide. No preparation needed.');
assert.equal(enHeilberufe.cta.primary.description, '30 minutes with Frank Steinfurt personally by phone or video call, Germany-wide.');

const deLegal = readJson('src/i18n/locales/de/legal.json');
const enLegal = readJson('src/i18n/locales/en/legal.json');
assert.equal(deLegal.impressum.representedBy, 'Vertreten durch: Geschäftsführer Frank Steinfurt');
assert.equal(enLegal.impressum.representedBy, 'Represented by: Managing Director Frank Steinfurt');
const impressumPage = read('src/pages/ImpressumPage.jsx');
assert(impressumPage.includes("t('impressum.representedBy')"), 'Vertretungsangabe muss im Impressum gerendert werden.');
assert(!read('src/pages/ErstinformationPage.jsx').includes('HRB 196 905'), 'Handelsregisternummer muss einheitlich ohne Leerzeichen erscheinen.');

for (const platform of ['TikTok', 'Instagram']) {
  const page = read(`src/pages/${platform}Page.jsx`);
  assert(page.includes("getPath('datenschutz')"), `${platform}-Seite muss sprachabhängig zur Datenschutzerklärung verlinken.`);
}
const confirmationPage = read('src/pages/ConfirmationPage.jsx');
assert(confirmationPage.includes("getPath('impressum')"), 'Bestätigungsseite muss zum Impressum verlinken.');
assert(confirmationPage.includes("getPath('datenschutz')"), 'Bestätigungsseite muss zur Datenschutzerklärung verlinken.');

assert.equal(routeMap.de.heilberufeVorsorge, '/heilberufe-vorsorge', 'Deutscher Sprachpfad der Heilberufe-Seite muss deutsch bleiben.');
assert.equal(routeMap.en.heilberufeVorsorge, '/en/healthcare-professionals-protection', 'Englischer Sprachwechsel der Heilberufe-Seite muss auf eine englische URL führen.');
assert.deepEqual(
  buildNitaContext('/en/healthcare-professionals-protection'),
  {
    healio_language: 'en',
    healio_product: 'general',
    healio_page: 'healthcare_professionals',
    healio_entry_point: 'global_launcher',
  },
  'Nita muss die englische Heilberufe-Route als Heilberufe-Seite erkennen.',
);
const app = read('src/App.jsx');
assert(app.includes('path="healthcare-professionals-protection" element={<HeilberufeVorsorgePage />}'), 'Englische Heilberufe-Route muss im Router registriert sein.');
const heilberufePage = read('src/pages/HeilberufeVorsorgePage.jsx');
assert.match(
  heilberufePage,
  /createWebPageSchema\(\s*tSeo\('heilberufe\.title'\),\s*tSeo\('heilberufe\.description'\),\s*canonicalUrl,\s*lang === 'en' \? 'en-US' : 'de-DE'\s*\)/,
  'WebPage-Schema der Heilberufe-Seite muss Canonical und Sprache der aktiven Route verwenden.',
);
for (const routeKey of ['partner', 'terminvereinbarung', 'kontakt']) {
  assert(heilberufePage.includes(`to={getPath('${routeKey}')}`), `Heilberufe-Seite muss ${routeKey} sprachabhängig verlinken.`);
}
const deHeilberufeSeo = seoRoutes.find(({ path }) => path === '/heilberufe-vorsorge');
const enHeilberufeSeo = seoRoutes.find(({ path }) => path === '/en/healthcare-professionals-protection');
const expectedHreflang = {
  de: 'https://healio.de/heilberufe-vorsorge',
  en: 'https://healio.de/en/healthcare-professionals-protection',
};
assert.deepEqual(deHeilberufeSeo?.hreflang, expectedHreflang, 'Deutsche Heilberufe-Route braucht vollständiges hreflang.');
assert.deepEqual(enHeilberufeSeo?.hreflang, expectedHreflang, 'Englische Heilberufe-Route braucht vollständiges hreflang.');

const enLeistungen = readJson('src/i18n/locales/en/leistungen.json');
assert.equal(enLeistungen.budget.amount, '3,000 EUR', 'Englische Zahlenschreibweise muss ein Komma verwenden.');

const footer = read('src/components/sections/Footer.jsx');
assert(
  footer.includes("to={getPath('heilberufeVorsorge')}"),
  'Der Footer muss die Heilberufe-Vorsorge in beiden Sprachen sprachabhängig intern verlinken.',
);
const partnerPage = read('src/pages/PartnerPage.jsx');
assert(
  partnerPage.includes("to={getPath('heilberufeVorsorge')}"),
  'Die Partner-Seite muss sprachabhängig zur Heilberufe-Vorsorge verlinken.',
);

assert.equal(
  getLanguageSwitchTarget('/blog/heilpraktiker-kosten-guide-2026', 'de'),
  '/en/blog',
  'Ohne englische Artikelübersetzung muss der Sprachwechsel vom deutschen Artikel zum englischen Blog-Hub führen.',
);
assert.equal(
  getLanguageSwitchTarget('/en/blog/heilpraktiker-kosten-guide-2026', 'en'),
  '/blog/heilpraktiker-kosten-guide-2026',
  'Ein historischer englischer Artikellink muss clientseitig zur deutschen Original-URL führen.',
);
assert.equal(
  getLanguageSwitchTarget('/en/unbekannter-pfad', 'en'),
  '/',
  'Unbekannte englische Pfade dürfen nicht als Unterseite von /en eine doppelte Slash-URL erzeugen.',
);
const vercelConfig = readJson('vercel.json');
assert(
  vercelConfig.redirects?.some(({ source, destination, permanent }) => (
    source === '/en/blog/:slug'
    && destination === '/blog/:slug'
    && permanent === true
  )),
  'Vercel muss englische Artikelpfade permanent zur deutschen Original-URL umleiten.',
);
assert(
  !vercelConfig.rewrites?.some(({ source }) => source === '/en/blog/:slug'),
  'Der permanente Redirect darf nicht durch einen Rewrite des englischen Artikelpfads unterlaufen werden.',
);
assert(
  app.includes('path="blog/:slug" element={<EnglishBlogArticleRedirect />}'),
  'Der englische Router muss historische Artikelpfade auch clientseitig zur deutschen URL umleiten.',
);

for (const key of [
  'intro',
  'serverLogsText',
  'servicesTitle',
  'hostingTitle',
  'hostingText',
  'analyticsTitle',
  'analyticsText',
  'nitaTitle',
  'nitaText',
  'calendlyTitle',
  'calendlyText',
  'brevoTitle',
  'brevoText',
  'insurerFlowsTitle',
  'insurerFlowsText',
  'section3Text',
  'section4Text',
  'section5Text',
]) {
  assert.equal(typeof enLegal.datenschutz[key], 'string', `Englischer Datenschutztext fehlt: datenschutz.${key}`);
  assert(enLegal.datenschutz[key].trim().length >= 12, `Englischer Datenschutztext ist zu kurz: datenschutz.${key}`);
  if (key === 'intro' || key.endsWith('Text')) {
    assert.notEqual(
      enLegal.datenschutz[key],
      deLegal.datenschutz[key],
      `Englischer Datenschutztext darf nicht unverändert deutsch bleiben: datenschutz.${key}`,
    );
  }
  assert(
    datenschutzPage.includes(`t('datenschutz.${key}')`),
    `Datenschutzseite muss datenschutz.${key} aus der aktiven Sprache rendern.`,
  );
}
assert(
  impressumPage.includes("t('impressum.disputeText')"),
  'Das Impressum muss den Schlichtungstext aus der aktiven Sprache rendern.',
);

for (const [localeName, legal, consentReference, settingsReference] of [
  ['DE', deLegal, /Art\. 6 Abs\. 1 lit\. a DSGVO/, /Datenschutz-Einstellungen/],
  ['EN', enLegal, /Article 6\(1\)\(a\) GDPR/, /privacy settings/],
]) {
  for (const providerKey of ['analyticsText', 'nitaText', 'calendlyText']) {
    assert.match(
      legal.datenschutz[providerKey],
      consentReference,
      `${localeName} datenschutz.${providerKey} muss die Einwilligung als Rechtsgrundlage nennen.`,
    );
    assert.match(
      legal.datenschutz[providerKey],
      settingsReference,
      `${localeName} datenschutz.${providerKey} muss den Widerruf über die Datenschutz-Einstellungen erklären.`,
    );
  }
}
assert.match(deLegal.datenschutz.calendlyText, /Art\. 6 Abs\. 1 lit\. b DSGVO/);
assert.match(enLegal.datenschutz.calendlyText, /Article 6\(1\)\(b\) GDPR/);

console.log('Block-3-Inhaltsvertrag erfüllt.');
