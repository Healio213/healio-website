/**
 * Vertragstest fuer den Ratgeber-Bereich und die Advertorials.
 *
 * Geprueft wird, was beim naechsten Umbau still kaputtgehen koennte:
 * Routen, Indexierbarkeit, die drei Buttons mit ihrem KassenBoost-Ziel samt
 * UTM-Durchreichung, der Anzeigenhinweis, die drei Pflichtlinks und die
 * Schreibregeln im veroeffentlichten Text.
 *
 * Aufruf: npm run test:ratgeber
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';
// Node lädt alle Artikel vollständig; die Website lädt sie je Slug (Abschnitt 10).
import {
  RATGEBER_EINZELARTIKEL,
  RATGEBER_GROUPS,
  RATGEBER_OVERVIEW_PER_GROUP,
  RATGEBER_DIR,
  findArticleFiles,
  getRatgeberArticle,
  ratgeberArticles,
  validateRatgeberSources,
} from './lib/ratgeber-articles.mjs';
import { buildOverviewData, registryEntryFor, staleRatgeberRegistryFiles } from './lib/ratgeber-registry.mjs';
import { collectBlockText, countArticleWords, renderArticleText as renderSharedArticleText, shouldShowToc } from '../src/content/ratgeber/articleText.js';
import { AUTHORS } from '../src/content/ratgeber/authors.js';
import { ZAHN_WEITERLESEN } from '../src/content/ratgeber/zahnWeiterlesen.js';
import { RATGEBER_RECHNER_JE_GRUPPE, resolveRatgeberRechner } from '../src/content/ratgeber/rechnerWege.js';
import {
  KASSENBOOST_ANCHOR,
  RATGEBER_INTERNAL_UTM_DEFAULTS,
  RATGEBER_UTM_DEFAULTS,
  buildInternalRatgeberUrl,
  buildKassenboostUrl,
} from '../src/lib/ratgeber-cta.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const ADVERTORIAL_SLUG = 'krankenkassen-bonus-zusatzversicherung';
const ADVERTORIAL_PATH = `/ratgeber/${ADVERTORIAL_SLUG}`;

// Die organischen Ratgeberartikel (seit 05.10.2026 auch mkk, AOK, TK,
// BARMER und hebamme-kosten-krankenkasse, alle ohne internen Button). Sie muessen vorhanden, indexierbar
// und in der Sitemap sein. ikk-classic-bonusprogramm-2026 ist zugleich die
// Landingpage der Google-Anzeigengruppe G1-A. Seit 05.10.2026 tragen genau
// drei Artikel einen internen Button (Tabelle INTERNAL_BUTTONS), alle anderen
// bleiben ohne.
const RATGEBER_SLUGS = [
  'ikk-classic-bonusprogramm-2026',
  'mkk-bonusprogramm-2026',
  'aok-bonusprogramm-2026',
  'tk-bonusprogramm-2026',
  'barmer-bonusprogramm-2026',
  'zahnzusatzversicherung-fehlender-zahn',
  'schwanger-zusatzversicherung',
  'schwangerschaft-worauf-achten',
  'schwangerschaft-was-steht-mir-zu',
  'hebamme-kosten-krankenkasse',
];
const IKK_LANDING_SLUG = 'ikk-classic-bonusprogramm-2026';
const SCHWANGER_SLUG = 'schwanger-zusatzversicherung';
const ZAHN_SLUG = 'zahnzusatzversicherung-fehlender-zahn';

// Die einzigen Artikel mit internem Button. Ziel, Beschriftung und
// Abschnittsueberschrift sind festgeschrieben. Die Schwangerschaftsseite
// fuehrt bewusst zur SDK auf /ambulant (dort steht seit 05.10. auch der
// UKV-Vorsorge-Baustein, der fuer eine bestehende Schwangerschaft nicht
// gedacht ist), die Zahnseite zum Zahn-Check auf /zahn. Der Anker bleibt
// im Ziel stehen, die UTM-Parameter kommen davor.
const INTERNAL_BUTTONS = {
  [IKK_LANDING_SLUG]: {
    to: '/ambulant',
    label: 'Bonus und Beitrag prüfen',
    heading: 'Bonus in Zusatzschutz umwandeln',
    builtHrefStart: '/ambulant?',
  },
  [SCHWANGER_SLUG]: {
    to: '/ambulant#tarifwahl',
    label: 'SDK-Tarife ansehen',
    heading: 'Vorsorge in der Schwangerschaft: der Topf der SDK',
    builtHrefStart: '/ambulant?',
    builtHrefEnd: '#tarifwahl',
    utmCampaign: 'ratgeber-a3',
  },
  [ZAHN_SLUG]: {
    to: '/zahn#zahn-check',
    label: 'Zahn-Check starten',
    heading: 'Welcher Weg passt zu deiner Lücke?',
    builtHrefStart: '/zahn?',
    builtHrefEnd: '#zahn-check',
    utmCampaign: 'ratgeber-a1',
  },
};

const app = read('src/App.jsx');
const layout = read('src/components/ratgeber/RatgeberArticleLayout.jsx');
const overview = read('src/pages/RatgeberPage.jsx');
const sitemap = read('public/sitemap.xml');
const routeByPath = new Map(seoRoutes.map((route) => [route.path, route]));
const stripLayoutComments = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/(^|\s)\/\/[^\n]*/g, '$1');

// --- 1. Routen -------------------------------------------------------------

expect(/path="ratgeber" element=\{<RatgeberPage \/>\}/.test(app), 'Die Uebersichtsroute /ratgeber fehlt im Router.');
expect(/path="ratgeber\/:slug" element=\{<RatgeberArtikelPage \/>\}/.test(app), 'Die Artikelroute /ratgeber/:slug fehlt im Router.');

const englishTree = app.slice(app.indexOf('{/* English routes */}'));
expect(!/ratgeber/i.test(englishTree), 'Der Ratgeber darf im englischen Routenbaum nicht auftauchen.');

// --- 2. Indexierbarkeit ----------------------------------------------------

const overviewRoute = routeByPath.get('/ratgeber');
expect(Boolean(overviewRoute), 'Die Uebersicht /ratgeber braucht einen Eintrag in scripts/seo-routes.mjs.');
if (overviewRoute) {
  expect(!/noindex/i.test(overviewRoute.robots || ''), 'Die Uebersicht /ratgeber muss indexierbar bleiben.');
  expect(overviewRoute.canonical === 'https://healio.de/ratgeber', 'Die Uebersicht /ratgeber braucht ihr eigenes Canonical.');
  expect((overviewRoute.title || '').trim().length >= 12, 'Die Uebersicht /ratgeber braucht einen Seitentitel.');
  expect((overviewRoute.description || '').trim().length >= 35, 'Die Uebersicht /ratgeber braucht eine Beschreibung.');
  expect(sitemap.includes('<loc>https://healio.de/ratgeber</loc>'), 'Die Uebersicht /ratgeber muss in der Sitemap stehen.');
}

for (const article of ratgeberArticles) {
  const articlePath = `/ratgeber/${article.slug}`;
  const route = routeByPath.get(articlePath);
  expect(Boolean(route), `Ratgeberartikel ohne SEO-Eintrag: ${articlePath}`);
  if (!route) continue;

  expect((route.title || '').trim().length >= 12, `Seitentitel fehlt: ${articlePath}`);
  expect((route.description || '').trim().length >= 35, `Beschreibung fehlt: ${articlePath}`);
  expect(route.title === article.metaTitle, `Seitentitel weicht von der Inhaltsdatei ab: ${articlePath}`);
  expect(route.description === article.metaDescription, `Beschreibung weicht von der Inhaltsdatei ab: ${articlePath}`);

  if (article.kind === 'advertorial') {
    expect(route.robots === 'noindex, nofollow', `Advertorial muss auf noindex, nofollow stehen: ${articlePath}`);
    expect(
      !sitemap.includes(`<loc>https://healio.de${articlePath}</loc>`),
      `Advertorial darf nicht in der Sitemap stehen: ${articlePath}`,
    );
  } else {
    // Organische Ratgeberartikel sind der Gegenfall: kein robots-Feld mit
    // noindex und dafuer ein Sitemap-Eintrag.
    expect(
      !/noindex/i.test(route.robots || ''),
      `Ratgeberartikel muss indexierbar bleiben: ${articlePath}`,
    );
    expect(
      sitemap.includes(`<loc>https://healio.de${articlePath}</loc>`),
      `Indexierbarer Ratgeberartikel fehlt in der Sitemap: ${articlePath}`,
    );
  }
}

expect(Boolean(getRatgeberArticle(ADVERTORIAL_SLUG)), 'Advertorial 1 fehlt im Inhaltsregister.');

// --- 2b. Die organischen Ratgeberartikel ---------------------------------

for (const slug of RATGEBER_SLUGS) {
  const article = getRatgeberArticle(slug);
  expect(Boolean(article), `Ratgeberartikel fehlt im Inhaltsregister: ${slug}`);
  if (!article) continue;

  expect(article.kind === 'ratgeber', `Dieser Artikel muss kind "ratgeber" tragen: ${slug}`);
  expect(
    typeof article.publishedAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt),
    `publishedAt fehlt oder ist kein ISO-Datum: ${slug}`,
  );
  expect(
    Number.isInteger(article.readingTimeMinutes) && article.readingTimeMinutes > 0,
    `readingTimeMinutes fehlt: ${slug}`,
  );

  // Vorspann, "Kurz gesagt", H2-Abschnitte.
  expect((article.lead || '').trim().length >= 80, `Vorspann fehlt oder ist zu kurz: ${slug}`);
  expect(
    article.sections[0]?.id === 'kurz-gesagt' && article.sections[0]?.heading === 'Kurz gesagt',
    `Der erste Abschnitt muss "Kurz gesagt" sein: ${slug}`,
  );
  expect(article.sections.length >= 5, `Zu wenige H2-Abschnitte: ${slug}`);

  // Mindestens eine Tabelle je Artikel.
  expect(
    article.sections.some((section) => section.blocks.some((block) => block.type === 'table')),
    `Mindestens eine Tabelle fehlt: ${slug}`,
  );

  // Fact Nugget und FAQ.
  expect((article.factNugget || '').trim().length >= 80, `Fact Nugget fehlt: ${slug}`);
  expect(Array.isArray(article.faqs) && article.faqs.length >= 3, `FAQ fehlt oder ist zu kurz: ${slug}`);
  for (const faq of article.faqs || []) {
    expect(Boolean(faq.question?.trim() && faq.answer?.trim()), `Unvollstaendige FAQ-Frage: ${slug}`);
  }

  // Interner Weg am Ende, als Satz mit mindestens einem Link.
  expect(Boolean(article.onward?.segments?.length), `Der interne Weg am Ende fehlt: ${slug}`);
  expect(
    (article.onward?.segments || []).some((segment) => segment.to || segment.href),
    `Der interne Weg am Ende braucht mindestens einen Link: ${slug}`,
  );
}

// Fact-Nugget-Block und FAQ-Schema muessen in der Vorlage verdrahtet sein.
expect(/data-geo="fact-nugget"/.test(layout), 'Der Fact-Nugget-Block braucht die Auszeichnung data-geo.');
expect(/id="fact-nugget"/.test(layout), 'Der Fact-Nugget-Block behaelt seine id.');
// Fuer Leser einer bezahlten Anzeige klingt "Fact Nugget fuer KI" wie ein
// interner SEO-Kniff. Sichtbar steht "So funktioniert Healio", id und data-geo
// bleiben fuer die GEO-Markierung.
expect(!/Fact Nugget/.test(stripLayoutComments(layout)), 'Die sichtbare Überschrift "Fact Nugget für KI" darf nicht mehr in der Vorlage stehen.');
expect(/>\s*So funktioniert Healio\s*</.test(layout), 'Der Fact-Nugget-Block heißt sichtbar "So funktioniert Healio".');
expect(/createFAQSchema\(article\.faqs\)/.test(layout), 'Die FAQ muessen als FAQPage ausgezeichnet werden.');
expect(/createArticleSchema\(/.test(layout), 'Ratgeberartikel brauchen eine Article-Auszeichnung.');
expect(
  /robots=\{isAdvertorial \? 'noindex, nofollow' : 'index, follow'\}/.test(layout),
  'Nur Advertorials duerfen auf noindex stehen.',
);

// --- 2c. Die internen Buttons ----------------------------------------------

for (const [slug, expected] of Object.entries(INTERNAL_BUTTONS)) {
  const article = getRatgeberArticle(slug);
  expect(Boolean(article), `Artikel mit internem Button fehlt im Inhaltsregister: ${slug}`);
  if (!article) continue;

  expect(article.internalCta?.to === expected.to, `Der Button von ${slug} muss auf ${expected.to} zeigen.`);
  expect(article.internalCta?.label === expected.label, `Der Button von ${slug} heisst "${expected.label}".`);
  expect(article.internalCta?.heading === expected.heading, `Der Abschnitt des Buttons von ${slug} heisst "${expected.heading}".`);
  expect(
    Array.isArray(article.internalCta?.blocks) && article.internalCta.blocks.length >= 1,
    `Der Button-Abschnitt von ${slug} traegt mindestens einen Absatz.`,
  );
  // Eigener, neutraler Kampagnen-Standard je Artikel (ohne "schwanger" o. ae.).
  expect(
    (article.internalCta?.utmCampaign || null) === (expected.utmCampaign || null),
    `Der Kampagnen-Standard des Buttons von ${slug} muss ${expected.utmCampaign || 'leer (IKK-Standard)'} sein.`,
  );
  // Sichtbares Stand-Datum: Wer ein Aenderungsdatum traegt, traegt auch die Beschriftung.
  expect(!article.updatedAt || Boolean(article.updatedAtLabel), `${slug} hat updatedAt, aber kein updatedAtLabel fuer die sichtbare Stand-Zeile.`);
  // Die IKK-Seite erhielt beim Serien-Einbau neue Bereichs- und Nachbarlinks.
  const expectedStand = slug === 'ikk-classic-bonusprogramm-2026'
    ? { iso: '2026-10-08', label: '8. Oktober 2026' }
    : { iso: '2026-10-05', label: '5. Oktober 2026' };
  expect(article.updatedAt === expectedStand.iso && article.updatedAtLabel === expectedStand.label, `${slug} trägt Stand ${expectedStand.iso} / ${expectedStand.label}.`);
  expect(
    new RegExp(`<loc>https://healio\\.de/ratgeber/${slug}</loc>\\s*<lastmod>${expectedStand.iso}</lastmod>`).test(sitemap),
    `Die Sitemap nennt für ${slug} lastmod ${expectedStand.iso}.`,
  );
}
expect(/Stand: <time dateTime=\{standIso\}>\{standLabel\}<\/time>/.test(layout), 'Die Fusszeile zeigt das Aenderungsdatum, sobald es gepflegt ist.');

// Sperrliste auf den Anzeigen-Zielseiten: kein "Maximalbetrag gibt es nicht"
// (sinngemaess "ohne Obergrenze") und kein "unbegrenzt".
for (const slug of [IKK_LANDING_SLUG, SCHWANGER_SLUG, ZAHN_SLUG]) {
  const corpus = JSON.stringify(getRatgeberArticle(slug) || {});
  expect(!/Maximalbetrag|unbegrenzt|ohne Obergrenze/i.test(corpus), `${slug}: Sperrwort (Maximalbetrag/unbegrenzt/ohne Obergrenze) auf einer Anzeigen-Zielseite.`);
}

// Kein weiterer Artikel darf sich einen internen Button anhaengen, ohne dass
// er hier bewusst eingetragen wird. Das gilt auch fuer das Advertorial.
for (const article of ratgeberArticles) {
  if (INTERNAL_BUTTONS[article.slug]) continue;
  expect(!article.internalCta, `Unerwarteter interner Button: ${article.slug}`);
}

// Schwangerschaft: Der Button fuehrt zur SDK, nie zum UKV-Vorsorge-Baustein
// als Empfehlung. Der Absatz benennt beide Produkte und sagt, was gilt.
const schwanger = getRatgeberArticle(SCHWANGER_SLUG);
if (schwanger) {
  const ctaText = (schwanger.internalCta?.blocks || []).map((block) => block.text).join(' ');
  expect(/Vorsorge-Topf der SDK/.test(ctaText) && /Wähle dort deshalb eine SDK-Stufe\./.test(ctaText), 'Der Schwangerschafts-Button muss den Vorsorge-Topf der SDK und die Wahl einer SDK-Stufe nennen.');
  expect(/Vorsorge-Baustein der UKV/.test(ctaText) && /für eine bestehende Schwangerschaft nicht gedacht/.test(ctaText), 'Der Schwangerschafts-Button muss sagen, dass der UKV-Vorsorge-Baustein für eine bestehende Schwangerschaft nicht gedacht ist.');
  expect(/50 bis 100 Prozent/.test(ctaText) && /200 bis 500 EUR in zwei Kalenderjahren/.test(ctaText), 'Die Zahlen im Schwangerschafts-Button gehören zur Tabelle (50 bis 100 Prozent, 200 bis 500 EUR in zwei Kalenderjahren).');
  // Zahlen gegen die Tabelle des Artikels: kleinste und groesste Erstattung und Hoechstbetrag.
  const tarifTable = schwanger.sections.flatMap((section) => section.blocks).find((block) => block.type === 'table' && /Vorsorge-Topf je Tarifstufe/.test(block.caption || ''));
  expect(Boolean(tarifTable), 'Die Tabelle "Vorsorge-Topf je Tarifstufe" fehlt im Schwangerschaftsartikel.');
  if (tarifTable) {
    const percents = tarifTable.rows.map((row) => Number.parseInt(row[1], 10));
    const euros = tarifTable.rows.map((row) => Number.parseInt(row[2], 10));
    expect(Math.min(...percents) === 50 && Math.max(...percents) === 100, 'Der Button nennt 50 bis 100 Prozent, die Tabelle muss dazu passen.');
    expect(Math.min(...euros) === 200 && Math.max(...euros) === 500, 'Der Button nennt 200 bis 500 EUR, die Tabelle muss dazu passen.');
  }

  // Weg am Ende: Healio-Produktseiten vor kassenboost.de, SDK statt Baustein.
  const onwardText = (schwanger.onward?.segments || []).map((segment) => segment.text).join('');
  expect(/Vorsorge-Topf der SDK je Tarifstufe/.test(onwardText), 'Der Weg am Ende muss den Vorsorge-Topf der SDK nennen.');
  expect(/Für eine bestehende Schwangerschaft wählst du dort eine SDK-Stufe, nicht den UKV-Vorsorge-Baustein\./.test(onwardText), 'Der Weg am Ende muss sagen: SDK-Stufe wählen, nicht den UKV-Vorsorge-Baustein.');
  const onwardSegments = schwanger.onward?.segments || [];
  const idxAmbulant = onwardSegments.findIndex((segment) => segment.to === '/ambulant');
  const idxKassenboost = onwardSegments.findIndex((segment) => /kassenboost\.de/.test(segment.href || ''));
  expect(idxAmbulant > -1 && idxKassenboost > idxAmbulant, 'Im Weg am Ende stehen die Healio-Produktseiten vor kassenboost.de.');

  // "Kurz gesagt": der rechnerische Hoechstwert steht nie ohne die breite Masse.
  const kurz = schwanger.sections[0].blocks.flatMap((block) => (block.items || []).map((item) => (typeof item === 'string' ? item : `${item.lead} ${item.text}`)));
  const bonusPoint = kurz.find((item) => /1\.155 EUR/.test(item));
  expect(Boolean(bonusPoint) && /In der breiten Masse liegen aktive Versicherte bei 400 bis 700 EUR im Jahr\./.test(bonusPoint), '"Kurz gesagt" nennt neben 1.155 EUR die breite Masse mit 400 bis 700 EUR im Jahr.');
  expect(schwanger.updatedAt === '2026-10-05', 'Der Schwangerschaftsartikel traegt das Aenderungsdatum 2026-10-05.');
}

// /ambulant: Der UKV-Vorsorge-Baustein sagt sichtbar, dass eine festgestellte
// Schwangerschaft zum SDK-Vorsorge-Topf gehoert. Der Satz steht in DE und EN,
// nicht im Aufklapper, und wird von check-ukv-vorsorge-contract.mjs als einzige
// Stelle mit dem Wort Schwangerschaft im Baustein zugelassen.
const ambulantDe = JSON.parse(read('src/i18n/locales/de/ambulant.json')).vorsorgeBaustein;
const ambulantEn = JSON.parse(read('src/i18n/locales/en/ambulant.json')).vorsorgeBaustein;
expect(
  ambulantDe?.pregnancyNote === 'Für eine schon festgestellte Schwangerschaft ist der Vorsorge-Topf der SDK der richtige Weg.',
  'ambulant.json (DE) braucht im Vorsorge-Baustein den Hinweis auf den Vorsorge-Topf der SDK bei festgestellter Schwangerschaft.',
);
expect(
  /pregnancy/i.test(ambulantEn?.pregnancyNote || '') && /SDK/.test(ambulantEn?.pregnancyNote || ''),
  'ambulant.json (EN) braucht im Vorsorge-Baustein den Hinweis auf den SDK-Vorsorge-Topf bei festgestellter Schwangerschaft.',
);
const vorsorgeComponent = read('src/components/sections/ambulant/AmbulantVorsorgeBaustein.jsx');
const vorsorgeVisible = vorsorgeComponent.slice(0, vorsorgeComponent.indexOf('<details'));
expect(/text\('pregnancyNote'\)/.test(vorsorgeVisible), 'Der Schwangerschafts-Hinweis muss im Baustein ohne Aufklappen sichtbar sein.');

const internalDefault = buildInternalRatgeberUrl('/ambulant', '');
expect(internalDefault.startsWith('/ambulant?'), 'Das interne Button-Ziel muss ein Pfad auf healio.de sein.');
expect(!internalDefault.includes('kassenboost.de'), 'Das interne Button-Ziel darf nicht auf kassenboost.de zeigen.');
for (const [key, value] of Object.entries(RATGEBER_INTERNAL_UTM_DEFAULTS)) {
  expect(internalDefault.includes(`${key}=${value}`), `Standardwert ${key}=${value} fehlt im internen Button-Ziel.`);
}
expect(!internalDefault.includes('utm_content='), 'utm_content darf auch intern nicht erfunden werden.');

const internalPassed = buildInternalRatgeberUrl(
  '/ambulant',
  '?utm_source=google&utm_medium=cpc&utm_campaign=g1-a&utm_content=ikk-bonus',
);
const internalParams = new URL(internalPassed, 'https://healio.de').searchParams;
expect(internalParams.get('utm_source') === 'google', 'utm_source muss intern durchgereicht werden.');
expect(internalParams.get('utm_medium') === 'cpc', 'utm_medium muss intern durchgereicht werden.');
expect(internalParams.get('utm_campaign') === 'g1-a', 'utm_campaign muss intern durchgereicht werden.');
expect(internalParams.get('utm_content') === 'ikk-bonus', 'utm_content muss intern durchgereicht werden.');

// Anker im Ziel (/zahn#zahn-check): bleibt erhalten und steht HINTER der Query.
// Steht er davor, landen die Parameter im Anker und gehen verloren.
const anchorDefault = buildInternalRatgeberUrl('/zahn#zahn-check', '');
expect(anchorDefault.startsWith('/zahn?'), 'Mit Anker im Ziel muss der Pfad vor der Query stehen.');
expect(anchorDefault.endsWith('#zahn-check'), 'Der Anker #zahn-check muss am Ende der Adresse erhalten bleiben.');
expect((anchorDefault.match(/#/g) || []).length === 1, 'Die Adresse darf genau einen Anker tragen.');
expect(anchorDefault.indexOf('?') < anchorDefault.indexOf('#'), 'Die Query muss vor dem Anker stehen.');
for (const [key, value] of Object.entries(RATGEBER_INTERNAL_UTM_DEFAULTS)) {
  expect(anchorDefault.includes(`${key}=${value}`), `Standardwert ${key}=${value} fehlt im Ziel mit Anker.`);
}
const anchorPassed = buildInternalRatgeberUrl(
  '/zahn#zahn-check',
  '?utm_source=google&utm_medium=demandgen&utm_campaign=ratgeber_2026-10&utm_content=fehlender-zahn&ref=gads-dg1',
);
const anchorUrl = new URL(anchorPassed, 'https://healio.de');
expect(anchorUrl.pathname === '/zahn' && anchorUrl.hash === '#zahn-check', 'Pfad und Anker des Ziels muessen /zahn und #zahn-check bleiben.');
expect(anchorUrl.searchParams.get('utm_source') === 'google', 'utm_source muss mit Anker im Ziel durchgereicht werden.');
expect(anchorUrl.searchParams.get('utm_medium') === 'demandgen', 'utm_medium muss mit Anker im Ziel durchgereicht werden.');
expect(anchorUrl.searchParams.get('utm_campaign') === 'ratgeber_2026-10', 'utm_campaign muss mit Anker im Ziel durchgereicht werden.');
expect(anchorUrl.searchParams.get('utm_content') === 'fehlender-zahn', 'utm_content muss mit Anker im Ziel durchgereicht werden.');
expect(anchorUrl.searchParams.get('ref') === 'gads-dg1', 'Der Empfehlungscode ref muss durch den Button gereicht werden (neuer Tab ohne sessionStorage).');
const foreign = new URL(buildInternalRatgeberUrl('/ambulant', '?ref=<x>&gclid=Cj0Kabc123XYZ&foo=bar&email=a@b.de'), 'https://healio.de').searchParams;
expect(!foreign.has('ref') && !foreign.has('foo') && !foreign.has('email'), 'Ungültige oder fremde Parameter wandern nie mit.');
expect(foreign.get('gclid') === 'Cj0Kabc123XYZ', 'Die Google-Klick-Kennung wandert mit, wenn sie gültig ist.');
const ownDefault = new URL(buildInternalRatgeberUrl('/zahn#zahn-check', '', { ...RATGEBER_INTERNAL_UTM_DEFAULTS, utm_campaign: 'ratgeber-a1' }), 'https://healio.de').searchParams;
expect(ownDefault.get('utm_campaign') === 'ratgeber-a1', 'Ein eigener Standard je Artikel ersetzt ikk-bonus-landingpage.');
expect(!anchorUrl.hash.includes('utm_'), 'Kein Parameter darf im Anker landen.');
expect(buildInternalRatgeberUrl('/ambulant#tarif-tabelle', '').endsWith('#tarif-tabelle'), 'Auch ein anderer Anker bleibt am Ende stehen.');
expect(!buildInternalRatgeberUrl('/ambulant#', '').includes('#'), 'Ein leerer Anker faellt weg.');
expect(buildInternalRatgeberUrl('/ambulant', '') === internalDefault, 'Ohne Anker aendert sich das Ziel nicht.');

// --- 2d. Kein dreifacher Button und keine feste Leiste im Ratgeber --------

expect(
  /\{isAdvertorial && section\.id === article\.ctaAfterSectionId/.test(layout),
  'Der Button im Text gehoert allein zum Advertorial.',
);
// Seit der Handy-Runde auf main (d105da5) mit engerem Abstand unter sm.
expect(
  /\{isAdvertorial && \(\s*<div className="mt-10 sm:mt-14">/.test(layout),
  'Der Button am Ende gehoert allein zum Advertorial.',
);
expect(
  /\{isAdvertorial && \(\s*<div\s+className=\{`fixed inset-x-0 bottom-0/.test(layout),
  'Die feste Leiste am unteren Rand gehoert allein zum Advertorial.',
);

// --- 3. Die drei Buttons ---------------------------------------------------

for (const placement of ['inline', 'end', 'mobile']) {
  expect(
    layout.includes(`placement="${placement}"`),
    `Der Button fehlt an der Position ${placement}.`,
  );
}
expect(/data-ratgeber-cta=\{placement\}/.test(layout), 'Die Button-Position muss im Markup kenntlich bleiben.');
expect(/target="_blank"/.test(layout) && /rel="noopener"/.test(layout), 'Der Button muss ein externer Link mit rel="noopener" sein.');
expect(/md:hidden/.test(layout), 'Die feste Leiste darf nur unter md erscheinen.');
expect(!/trackMetaLead|trackGoogleAds/.test(layout), 'KassenBoost- und Weiter-Knoepfe sind kein Erfolg: kein Meta-Lead, keine Google-Ads-Conversion.');

// --- 4. Ziel und UTM-Durchreichung ----------------------------------------

const defaultUrl = buildKassenboostUrl('');
expect(defaultUrl.startsWith('https://kassenboost.de/'), 'Der Button muss auf kassenboost.de zeigen.');
expect(defaultUrl.endsWith(KASSENBOOST_ANCHOR), 'Der Anker #vergleich muss erhalten bleiben.');
for (const [key, value] of Object.entries(RATGEBER_UTM_DEFAULTS)) {
  expect(defaultUrl.includes(`${key}=${value}`), `Der Standardwert ${key}=${value} fehlt im Button-Ziel.`);
}
expect(!defaultUrl.includes('utm_content='), 'utm_content darf ohne aufrufenden Wert nicht erfunden werden.');

const passedThrough = buildKassenboostUrl(
  '?utm_source=meta&utm_medium=paid&utm_campaign=kassenboost-advertorial-1&utm_content=zahl',
);
const passedParams = new URL(passedThrough.replace(KASSENBOOST_ANCHOR, '')).searchParams;
expect(passedParams.get('utm_source') === 'meta', 'utm_source der aufrufenden Adresse muss durchgereicht werden.');
expect(passedParams.get('utm_medium') === 'paid', 'utm_medium der aufrufenden Adresse muss durchgereicht werden.');
expect(passedParams.get('utm_campaign') === 'kassenboost-advertorial-1', 'utm_campaign der aufrufenden Adresse muss durchgereicht werden.');
expect(passedParams.get('utm_content') === 'zahl', 'utm_content der aufrufenden Adresse muss durchgereicht werden.');
expect(passedThrough.endsWith(KASSENBOOST_ANCHOR), 'Auch mit UTM-Durchreichung bleibt der Anker #vergleich stehen.');

const partial = buildKassenboostUrl('?utm_source=meta');
expect(
  partial.includes('utm_source=meta') && partial.includes(`utm_medium=${RATGEBER_UTM_DEFAULTS.utm_medium}`),
  'Fehlende UTM-Werte muessen auf den Standard zurueckfallen.',
);

// --- 5. Anzeigenhinweis und Pflichtlinks ----------------------------------

expect(/advertorial: 'Anzeige/.test(layout), 'Advertorials brauchen den sichtbaren Hinweis "Anzeige".');
expect(/ratgeber: 'Ratgeber von Healio'/.test(layout), 'Organische Ratgeberartikel brauchen den Hinweis "Ratgeber von Healio".');

for (const [to, label] of [['/impressum', 'Impressum'], ['/datenschutz', 'Datenschutz'], ['/erstinformation', 'Erstinformation']]) {
  expect(layout.includes(`to: '${to}'`), `Pflichtlink fehlt in der Fusszeile: ${to}`);
  expect(layout.includes(label), `Beschriftung des Pflichtlinks fehlt: ${label}`);
}
expect(/§ 15 VersVermV/.test(layout), 'Die Erstinformation muss als Erstinformation nach § 15 VersVermV benannt sein.');

// --- 6. Schreibregeln im veroeffentlichten Text ----------------------------

const UMLAUT_ERSATZ = /\b(?:fuer|ueber|koenn\w*|moegl\w*|muess\w*|waehrend|naechst\w*|zurueck|haeufig\w*|aehnlich\w*|ueblich\w*|urspruenglich|beruecksichtig\w*|zusaetzlich\w*|gemaess|regelmaessig\w*|erhoeh\w*|hoech\w*|verfuegbar|gross|groess\w*|strasse\w*|fuess\w*|massnahm\w*|schliesslich)\b/i;

// Alles, was wirklich auf der Seite landet, einschliesslich Tabellen,
// Fact Nugget, FAQ, internem Button, dem Weg am Ende und den optionalen
// Bausteinen der Zahn-Vorlage. Gemeinsame Quelle mit der Vorlage.
const renderArticleText = (article) => renderSharedArticleText(article);

for (const article of ratgeberArticles) {
  const text = renderArticleText(article);
  expect(!/[[\]]/.test(text), `Platzhalter in eckigen Klammern duerfen nicht veroeffentlicht werden: ${article.slug}`);
  expect(!/350\s*bis\s*500/.test(text), `Veraltete Bonusspanne "350 bis 500 Euro": ${article.slug}`);
  expect(!/Ich selbst komme auf/.test(text), `Frank 21.09.: keine persoenliche Bonuszahl im Text: ${article.slug}`);
  expect(!/[–—]/.test(text), `Gedankenstriche sind im Ratgebertext nicht erlaubt: ${article.slug}`);
  expect(!/\bSie\b/.test(text), `Die Anrede muss Du sein, kein "Sie": ${article.slug}`);
  expect(!/\bIhre?[nmrs]?\b/.test(text), `Die Anrede muss Du sein, kein "Ihr/Ihre": ${article.slug}`);
  // Frueher wurde hier auf /(?:ae|oe|ue|ss)\b/ geprueft. Das schlug bei
  // jedem regulaeren Wort auf ss an ("Mutterpass", "muss") und bei jedem auf
  // ue ("neue", "blaue"). Geprueft wird deshalb jetzt eine Liste typischer
  // Ersatzschreibungen, dafuer im gesamten veroeffentlichten Text.
  expect(!UMLAUT_ERSATZ.test(text), `Umlaut-Ersatzschreibung statt echtem Umlaut: ${article.slug}`);
  expect(['advertorial', 'ratgeber'].includes(article.kind), `Unbekannte Artikelart: ${article.slug}`);
  if (article.ctaAfterSectionId) {
    expect(
      article.sections.some((section) => section.id === article.ctaAfterSectionId),
      `ctaAfterSectionId zeigt auf keinen Abschnitt: ${article.slug}`,
    );
  }
  // Der Verweis auf einen anderen Ratgeberartikel muss ins Register passen.
  for (const segment of article.onward?.segments || []) {
    if (!segment.to?.startsWith('/ratgeber/')) continue;
    const targetSlug = segment.to.slice('/ratgeber/'.length);
    expect(
      Boolean(getRatgeberArticle(targetSlug)),
      `Interner Ratgeber-Link zeigt ins Leere: ${article.slug} -> ${segment.to}`,
    );
  }
}

// --- 6a0. 1.155 EUR nur mit Schwangerschaftsbezug --------------------------

// Frank (Satzungsregel): Bei der IKK classic gilt laut Satzung bis zu 810 EUR,
// nur in der Schwangerschaft bis zu 1.155 EUR, beides theoretische Werte. Die
// Zahl 1.155 darf nie als allgemeine IKK-Zahl stehen. Geprueft wird je
// Textstueck (Absatz, Listenpunkt, Faktenkasten, FAQ-Antwort, Tabellenzeile):
// Wo 1.155 steht, muss im selben Stueck die Schwangerschaft stehen.
const textUnits = (article) => {
  const units = [article.lead, article.factNugget, article.metaDescription, article.listTeaser];
  const collect = (blocks) => {
    for (const block of blocks) {
      if (block.type === 'list') {
        for (const item of block.items) units.push(typeof item === 'string' ? item : `${item.lead} ${item.text || ''}`);
      } else if (block.type === 'table') {
        units.push(block.caption, block.note);
        for (const row of block.rows) units.push(row.join(' | '));
      } else if (block.type === 'segments') {
        units.push(block.segments.map((segment) => segment.text).join(''));
      } else if (block.type === 'paragraph' || !block.type) {
        units.push(block.text);
      } else {
        units.push(collectBlockText([block], []).filter(Boolean).join(' '));
      }
    }
  };
  for (const section of article.sections) collect(section.blocks);
  for (const faq of article.faqs || []) units.push(faq.answer);
  if (article.internalCta) collect(article.internalCta.blocks);
  if (article.onward) units.push(article.onward.segments.map((segment) => segment.text).join(''));
  return units.filter(Boolean);
};

for (const article of ratgeberArticles) {
  for (const unit of textUnits(article)) {
    if (!/1\.155/.test(unit)) continue;
    expect(
      /Schwanger/i.test(unit),
      `1.155 EUR darf nur mit Schwangerschaftsbezug stehen (allgemein gilt bis zu 810 EUR): ${article.slug}: ${unit.slice(0, 90)}`,
    );
  }
}

const zahnArtikel = getRatgeberArticle(ZAHN_SLUG);
if (zahnArtikel) {
  expect(/laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1\.155 EUR/.test(zahnArtikel.factNugget), 'Der Faktenkasten im Zahn-Ratgeber nennt 810 EUR allgemein und 1.155 EUR nur in der Schwangerschaft.');
  expect(/400 bis 700 EUR/.test(zahnArtikel.factNugget), 'Der Faktenkasten im Zahn-Ratgeber nennt die breite Masse mit 400 bis 700 EUR.');
}

// --- 6a1. Was steht mir in der Schwangerschaft zu (seit 06.10.2026) -------

// Quelle: Healio/Marktanalyse-2026-10/schwangere-suchabsicht.md, Abschnitt 4.
// Gesperrte Themen und Woerter, Pflichtsaetze der Healio-Bruecken, der
// Vorsorge-Topf gegen /ambulant und die beiden eingehenden Links.
const WAS_STEHT_SLUG = 'schwangerschaft-was-steht-mir-zu';
const WAS_STEHT_PATH = `/ratgeber/${WAS_STEHT_SLUG}`;
const wasSteht = getRatgeberArticle(WAS_STEHT_SLUG);
expect(Boolean(wasSteht), `Ratgeberartikel fehlt im Inhaltsregister: ${WAS_STEHT_SLUG}`);
if (wasSteht) {
  const text = renderArticleText(wasSteht);
  expect(wasSteht.publishedAt === '2026-10-06', `${WAS_STEHT_SLUG} traegt publishedAt 2026-10-06.`);
  expect(
    new RegExp(`<loc>https://healio\\.de${WAS_STEHT_PATH}</loc>\\s*<lastmod>2026-10-06</lastmod>`).test(sitemap),
    `Die Sitemap nennt fuer ${WAS_STEHT_SLUG} lastmod 2026-10-06.`,
  );
  expect(!/NIPT|Ersttrimester|Nackenfalt|Kinderwunsch|\bERGO\b|DA Direkt|\bLKH\b/i.test(text), `${WAS_STEHT_SLUG}: gesperrtes Thema oder gesperrter Anbietername.`);
  expect(
    !/kostenlos|kostenfrei|gratis|umsonst|garantiert|unbegrenzt|ohne Obergrenze|Maximalbetrag|absicher|(?<![\d.,])0 EUR|(?:keine|ohne) Gesundheitsfragen|keine Gesundheitsprüfung/i.test(text),
    `${WAS_STEHT_SLUG}: Sperrwort (kostenlos, gratis, 0 EUR, garantiert, unbegrenzt, absichern, keine/ohne Gesundheitsfragen).`,
  );
  // "ohne Gesundheitsprüfung" ist nur bei der Kindernachversicherung richtig
  // (§ 198 VVG: keine Prüfung, also auch kein Risikozuschlag). Für Anträge von
  // Erwachsenen bleibt die Formel gesperrt.
  for (const match of text.matchAll(/ohne Gesundheitsprüfung/gi)) {
    const context = text.slice(Math.max(0, match.index - 220), match.index);
    expect(/Kind|Baby|Neugeboren|Geburt/.test(context), `${WAS_STEHT_SLUG}: "ohne Gesundheitsprüfung" nur bei der Kindernachversicherung.`);
  }
  expect(!/(?<!Soziale )\bsicher/i.test(text), `${WAS_STEHT_SLUG}: Wortstamm "sicher" nicht als Versprechen.`);
  expect(!/Geldbonus|Bargeld/.test(text), `${WAS_STEHT_SLUG}: Bonus nur als Zuschuss, nie als Bargeld.`);
  expect(!/3\.000/.test(text), `${WAS_STEHT_SLUG}: Die 3.000 EUR bleiben aus diesem Ratgeber draussen.`);
  expect(/Die Entbindung selbst ist bei bestehender Schwangerschaft nicht mehr versicherbar/.test(text), `${WAS_STEHT_SLUG}: Der Vorsorge-Topf-Absatz muss sagen, dass die Entbindung nicht versicherbar ist.`);
  // Pruefrunde 06.10.2026: Fuer IKK-classic-Wechsel ist eine Verguetung ueber
  // Makleraktiv vorgesehen, dazu der IKK-Werbezuschuss. Der Satz, Healio
  // verdiene am Wechsel nichts, darf deshalb nicht auf die Seite; ob und wie
  // offengelegt wird, entscheidet Frank.
  expect(!/verdient (?:an einem|am) Kassenwechsel nichts|An einem Kassenwechsel verdient/i.test(text), `${WAS_STEHT_SLUG}: Kein Satz, Healio verdiene am Kassenwechsel nichts (Verguetung ueber Makleraktiv vorgesehen).`);
  expect(/Ob sich ein Wechsel für dich lohnt, hängt auch am Zusatzbeitrag der neuen Kasse\./.test(text), `${WAS_STEHT_SLUG}: Der Kassenwechsel-Abschnitt nennt den Zusatzbeitrag der neuen Kasse.`);
  expect(!/210 bis 240 EUR|sieben bis acht Vorsorgetermine/.test(text), `${WAS_STEHT_SLUG}: Die Wechsel-Rechnung nennt keine Euro-Spanne und keine Terminzahl, solange die IKK-Zahl bonusfaehiger Vorsorgen [Annahme] ist.`);
  expect(!/im AOK-Ratgeber/.test(text), `${WAS_STEHT_SLUG}: Die Bonus-Spalte verweist nicht auf AOK-Werte, die der AOK-Ratgeber nicht nennt.`);
  expect(/höchstens bis zur Höhe deines Beitrags/.test(text), `${WAS_STEHT_SLUG}: Die Wechsel-Rechnung nennt den Zuschuss nur bis zur Beitragshöhe.`);
  expect(/80 Prozent bis 500 EUR je Kalenderjahr/.test(text), `${WAS_STEHT_SLUG}: AOK NordWest ist ein Jahresbudget, kein Betrag je Schwangerschaft.`);
  const pflichtZusatz = (text.match(/Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab/g) || []).length;
  expect(pflichtZusatz >= 2, `${WAS_STEHT_SLUG}: Bonus-Bruecke und Wechsel-Rechnung tragen je den Pflicht-Zusatz.`);

  // Der Vorsorge-Topf im Text muss zu /ambulant passen (AP1, Ambulant 100).
  const conversionFlow = read('src/components/sections/ambulant/AmbulantConversionFlow.jsx');
  const ap1Prevention = Number((conversionFlow.match(/code: 'AP1'[^}]*prevention: (\d+)/) || [])[1]);
  expect(ap1Prevention === 500 && /Im Tarif Ambulant 100 stehen dafür bis zu 500 EUR je zwei Kalenderjahre bereit\./.test(text), `${WAS_STEHT_SLUG}: Der Vorsorge-Topf im Text (500 EUR) muss zum AP1-Topf auf /ambulant passen (gefunden ${ap1Prevention}).`);

  // Auch Links innerhalb der Abschnitte duerfen nicht ins Leere zeigen.
  for (const section of wasSteht.sections) {
    for (const block of section.blocks) {
      if (block.type !== 'segments') continue;
      for (const segment of block.segments) {
        if (!segment.to?.startsWith('/ratgeber/')) continue;
        const targetSlug = segment.to.slice('/ratgeber/'.length).split('#')[0];
        expect(Boolean(getRatgeberArticle(targetSlug)), `Interner Ratgeber-Link zeigt ins Leere: ${WAS_STEHT_SLUG} -> ${segment.to}`);
      }
    }
  }

  // Genau ein eingehender Link aus jedem der beiden aelteren Schwangerschafts-Ratgeber.
  for (const sourceSlug of [SCHWANGER_SLUG, 'schwangerschaft-worauf-achten']) {
    const source = getRatgeberArticle(sourceSlug);
    const inbound = (source?.sections || [])
      .flatMap((section) => section.blocks)
      .filter((block) => block.type === 'segments')
      .flatMap((block) => block.segments)
      .filter((segment) => segment.to === WAS_STEHT_PATH);
    expect(
      inbound.length === 1 && inbound[0].text === 'Was dir in der Schwangerschaft zusteht',
      `${sourceSlug} braucht genau einen Link "Was dir in der Schwangerschaft zusteht" auf ${WAS_STEHT_PATH} (gefunden ${inbound.length}).`,
    );
  }
}

// Keine Ratgeberseite darf "Fact Nugget" sichtbar tragen, auch nicht im Text.
for (const article of ratgeberArticles) {
  expect(!/Fact Nugget/i.test(renderArticleText(article)), `"Fact Nugget" darf nicht im sichtbaren Text stehen: ${article.slug}`);
}

// --- 6a. Fehlender Zahn: UKV-Zwei-Jahres-Regel klar erklaert -------------

// Vom UKV-Maklerbetreuer am 05.10.2026 bestaetigt: Heil- und Kostenplan oder
// Anratung in den letzten zwei Jahren schliesst genau diese Behandlung aus,
// liegt das laenger zurueck, ist sie wieder versichert. Der Kontakt darf
// bleiben, aber nicht als einzige Aussage. Interne Verguetung nie im Text.
const fehlenderZahn = getRatgeberArticle('zahnzusatzversicherung-fehlender-zahn');
if (fehlenderZahn) {
  const text = renderArticleText(fehlenderZahn);
  const rule = /Gab es (?:für die Lücke )?in den letzten zwei Jahren einen Heil- und Kostenplan oder wurde (?:die Versorgung der Lücke|ihre Versorgung|die Behandlung) angeraten, ist genau diese Behandlung nicht versichert[.;] (?:L|l)iegt das länger als zwei Jahre zurück, ist sie wieder versichert\./g;
  expect((text.match(rule) || []).length >= 3, 'Der Ratgeber fehlender Zahn muss die UKV-Zwei-Jahres-Regel in Kurz gesagt, im Abschnitt und in der FAQ klar nennen.');
  expect(!/bloße Wunsch|ist kein Hindernis|genau dieses Implantat/.test(text), 'Der Ratgeber fehlender Zahn darf keine unbestätigte Aussage zum Wunsch nach Lückenschluss enthalten.');
  expect(/ist die Versorgung genau dieser Lücke nicht versichert, egal ob Implantat oder Brücke/.test(text), 'Das Beispiel im Ratgeber fehlender Zahn muss die ganze Lückenversorgung meinen.');
  expect(fehlenderZahn.faqs.some((faq) => /in den letzten zwei Jahren einen Heil- und Kostenplan/.test(faq.answer) && /wieder versichert/.test(faq.answer) && /angesprochen/.test(faq.question)), 'Die FAQ braucht die Frage zur früher angesprochenen Lücke mit der Zwei-Jahres-Regel.');
  expect(!/schon geplant oder empfohlen|sprich deshalb vor dem Antrag|Ist die Versorgung deiner Lücke schon geplant/.test(text), 'Der Ratgeber fehlender Zahn darf bei geplanter Versorgung nicht mehr nur auf das Gespräch verweisen.');
  expect(!/verprovision|Provision|Courtage/i.test(text), 'Der Ratgeber fehlender Zahn darf keine Vergütung oder Courtage nennen.');
  expect(fehlenderZahn.updatedAt === '2026-10-05', 'Der Ratgeber fehlender Zahn trägt das Änderungsdatum 2026-10-05.');
}

// Kommentare erklaeren die Regel und duerfen sie deshalb zitieren. Geprueft
// wird nur, was tatsaechlich auf die Seite kommt.
const stripComments = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/(^|\s)\/\/[^\n]*/g, '$1');

const advertorialSource = fs.readFileSync(path.join(root, 'src', 'content', 'ratgeber', `${ADVERTORIAL_SLUG}.js`), 'utf8');
expect(!/rund 600 Euro/.test(advertorialSource), 'Frank 21.09.: der 600-Euro-Platzhalter ist ersatzlos gestrichen, auch als Kommentar.');

for (const [label, source] of [['Vorlage', layout], ['Uebersicht', overview]]) {
  const visible = stripComments(source);
  expect(!/\bSie\b/.test(visible), `${label} darf keine Sie-Anrede enthalten.`);
  expect(!/[–—]/.test(visible), `${label} darf keine Gedankenstriche enthalten.`);
}

// --- 6b. Keine schwebende Chat-Blase im Ratgeber --------------------------

// Der Ratgeber ist bezahlter Einstieg. Neben den drei KassenBoost-Buttons
// darf dort kein zweiter, schwebender Gespraechsweg auftauchen.
const nitaWidget = read('src/components/NitaConsentWidget.jsx');
expect(
  /const NITA_HIDDEN_ROUTE_PREFIXES = Object\.freeze\(\['\/ratgeber'\]\)/.test(nitaWidget),
  'Der Ratgeber muss in der Sperrliste des Nita-Widgets stehen.',
);
expect(
  /if \(!HEALIO_VOICE_CONTACT_ENABLED \|\| isNitaHiddenRoute\(pathname\)\) return null;/.test(nitaWidget),
  'Das Nita-Widget muss auf gesperrten Routen ungerendert bleiben, nicht nur unsichtbar.',
);

// --- 7. Falls schon gebaut wurde: das ausgelieferte HTML gegenpruefen ------

const builtAdvertorial = path.join(root, 'dist', 'ratgeber', ADVERTORIAL_SLUG, 'index.html');
if (fs.existsSync(builtAdvertorial)) {
  const html = fs.readFileSync(builtAdvertorial, 'utf8');
  expect(/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html) || /noindex/i.test(html), 'Das gebaute Advertorial muss noindex ausliefern.');
  expect(html.includes('Anzeige'), 'Das gebaute Advertorial muss den Hinweis "Anzeige" zeigen.');
  expect((html.match(/data-ratgeber-cta=/g) || []).length >= 3, 'Das gebaute Advertorial muss drei Buttons enthalten.');
  expect(html.includes('kassenboost.de') && html.includes('#vergleich'), 'Das gebaute Advertorial muss auf den KassenBoost-Check mit Anker zeigen.');
  for (const link of ['/impressum', '/datenschutz', '/erstinformation']) {
    expect(html.includes(`href="${link}"`), `Pflichtlink fehlt im gebauten Advertorial: ${link}`);
  }
  expect(
    !html.includes('data-healio-nita=') && !html.includes('healio-nita-quiet-launcher'),
    'Das gebaute Advertorial darf keine Nita-Chat-Blase ausliefern.',
  );
}

for (const slug of RATGEBER_SLUGS) {
  const builtArticle = path.join(root, 'dist', 'ratgeber', slug, 'index.html');
  if (!fs.existsSync(builtArticle)) continue;

  const html = fs.readFileSync(builtArticle, 'utf8');
  expect(!/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html), `Der gebaute Ratgeberartikel darf nicht auf noindex stehen: ${slug}`);
  expect(html.includes('Ratgeber von Healio'), `Der gebaute Ratgeberartikel muss den Hinweis "Ratgeber von Healio" zeigen: ${slug}`);
  expect(!html.includes('>Anzeige'), `Ein organischer Ratgeberartikel darf nicht als Anzeige ausgewiesen werden: ${slug}`);
  expect(html.includes('data-geo="fact-nugget"'), `Der Fact-Nugget-Block fehlt im gebauten HTML: ${slug}`);
  expect(html.includes('id="fact-nugget"'), `Die id des Fact-Nugget-Blocks fehlt im gebauten HTML: ${slug}`);
  expect(!html.includes('Fact Nugget für KI'), `Die Überschrift "Fact Nugget für KI" ist im gebauten HTML sichtbar: ${slug}`);
  expect(html.includes('So funktioniert Healio'), `Die Überschrift "So funktioniert Healio" fehlt im gebauten HTML: ${slug}`);
  expect(html.includes('"@type":"FAQPage"'), `Das FAQ-Schema fehlt im gebauten HTML: ${slug}`);
  expect(html.includes('"@type":"Article"'), `Das Article-Schema fehlt im gebauten HTML: ${slug}`);
  expect(!html.includes('data-ratgeber-cta='), `Ein organischer Ratgeberartikel darf keinen KassenBoost-Button tragen: ${slug}`);
  for (const link of ['/impressum', '/datenschutz', '/erstinformation']) {
    expect(html.includes(`href="${link}"`), `Pflichtlink fehlt im gebauten Ratgeberartikel: ${slug} ${link}`);
  }
  expect(
    !html.includes('data-healio-nita=') && !html.includes('healio-nita-quiet-launcher'),
    `Der gebaute Ratgeberartikel darf keine Nita-Chat-Blase ausliefern: ${slug}`,
  );

  const internalCtaCount = (html.match(/data-ratgeber-internal-cta=/g) || []).length;
  const expectedButton = INTERNAL_BUTTONS[slug];
  if (expectedButton) {
    expect(internalCtaCount === 1, `Der gebaute Artikel traegt genau einen internen Button (gefunden ${internalCtaCount}): ${slug}`);
    const anchorTag = (html.match(/<a\b[^>]*data-ratgeber-internal-cta="end"[^>]*>[^<]*<\/a>/) || [''])[0];
    const hrefValue = ((anchorTag.match(/href="([^"]*)"/) || [])[1] || '').replace(/&amp;/g, '&');
    expect(anchorTag.includes(`>${expectedButton.label}</a>`), `Der gebaute Button von ${slug} heisst "${expectedButton.label}".`);
    expect(hrefValue.startsWith(expectedButton.builtHrefStart), `Der gebaute Button von ${slug} muss mit UTM auf ${expectedButton.builtHrefStart} zeigen (gefunden "${hrefValue}").`);
    if (expectedButton.builtHrefEnd) {
      expect(hrefValue.endsWith(expectedButton.builtHrefEnd), `Der Anker ${expectedButton.builtHrefEnd} muss im gebauten Button von ${slug} hinter der Query stehen (gefunden "${hrefValue}").`);
      expect(hrefValue.indexOf('?') > -1 && hrefValue.indexOf('?') < hrefValue.indexOf('#'), `Die Query muss im gebauten Button von ${slug} vor dem Anker stehen.`);
    }
    expect(html.includes(`>${expectedButton.heading}</h2>`), `Die Überschrift des Button-Abschnitts fehlt im gebauten HTML: ${slug}`);
    const builtCampaign = expectedButton.utmCampaign || RATGEBER_INTERNAL_UTM_DEFAULTS.utm_campaign;
    expect(hrefValue.includes(`utm_campaign=${builtCampaign}`), `Der gebaute Button von ${slug} traegt ohne eingehende UTM utm_campaign=${builtCampaign} (gefunden "${hrefValue}").`);
  } else {
    expect(internalCtaCount === 0, `Ein Artikel ohne vorgesehenen Button darf keinen internen Button tragen: ${slug}`);
  }
}

// Das Schwangerschafts-Ziel /ambulant liefert den Hinweis zum Vorsorge-Baustein
// im ausgelieferten HTML. Prerender fuellt den Baustein nur, wenn die Route
// vorgerendert ist; fehlt die Datei, bleibt es bei der Pruefung der Quelle oben.
const builtAmbulant = path.join(root, 'dist', 'ambulant', 'index.html');
if (fs.existsSync(builtAmbulant)) {
  const html = fs.readFileSync(builtAmbulant, 'utf8');
  if (html.includes('data-healio-ambulant="vorsorge-baustein"')) {
    expect(html.includes('Für eine schon festgestellte Schwangerschaft ist der Vorsorge-Topf der SDK der richtige Weg.'), 'Der gebaute Vorsorge-Baustein auf /ambulant muss den Hinweis auf den SDK-Vorsorge-Topf zeigen.');
  }
}

// --- 8. Optionale Bausteine der Vorlage (seit 06.10.2026) ---

// Autor, Kurzantwort, Quellenblock, Inhaltsverzeichnis, FAQ zum Aufklappen,
// Kostenkarte, Schritt-Leiste, "Ehrlich gesagt", Wischkarten, Weg-Karten und
// der Zahnkosten-Rechner (src/components/ratgeber/RatgeberBausteine.jsx) sind
// Opt-in. Wer sie nutzt, steht in OPT_IN_SLUGS; alle anderen Artikel bleiben
// unverändert. Sperrwörter nach Franks Regeln (Marktanalyse 06.10.2026).
const RATGEBER_SPERRWORTE = /kostenlos|kostenfrei|gratis|umsonst|(?<![\d.,])0(?:,00)? ?(?:EUR|Euro|€)|ohne Obergrenze|unbegrenzt|Maximalbetrag|garantiert|absicher|(?:keine|ohne) Gesundheits(?:fragen|prüfung)|Testsieger|\bSiegel|\bERGO\b|DA Direkt|\bLKH\b|Courtage|Provision|Geldbonus|Bargeld|in bar\b|Antragsfrage/i;
const OPT_IN_SLUGS = [
  'zahnersatz-kosten',
  'professionelle-zahnreinigung-kosten',
  'zahnimplantat-kosten',
  'wurzelbehandlung-kosten',
  'zahnkrone-kosten',
  'bonusheft-zahnarzt',
  'zahnzusatzversicherung-ohne-wartezeit',
  // Serie Stapel 1, Zahn Kasse und Partner (07.10.2026)
  'zahnzusatzversicherung-lohnt-sich',
  'ukv-zahnzusatzversicherung',
  'bayerische-zahnzusatzversicherung',
  'aok-zahnzusatzversicherung',
  'dak-zahnreinigung',
  // Serie Stapel 2, Zahnkosten (07.10.2026)
  'zahnbruecke-kosten',
  'zahnprothese-kosten',
  'zahnfuellung-kosten',
  'parodontitis-behandlung-kosten',
  'zahnersatz-moeglichkeiten',
  'zahnersatz-haertefall',
  // Serie Stapel 2, Heilpraktiker und Naturheilkunde (07.10.2026)
  'heilpraktiker-kosten',
  'heilpraktiker-zusatzversicherung',
  'ambulante-zusatzversicherung',
  'akupunktur-kosten',
  'tk-osteopathie',
  'chiropraktiker-kosten',
  'physiotherapie-zuzahlung',
  'gebuehrenordnung-heilpraktiker',
  // Serie Stapel 2, Krankenhaus (07.10.2026)
  'stationaere-zusatzversicherung',
  'einzelzimmer-krankenhaus-kosten',
  'zusatzversicherung-einzelzimmer',
  'krankenhaustagegeld',
  'reha-zuzahlung',
  // Serie Stapel 2, Schwangerschaft und Familie (07.10.2026)
  'zusatzversicherung-kinder',
  'babybonus-krankenkasse',
  // Serie Stapel 2, familienplanung (07.10.2026)
  'baby-geplant-zusatzversicherung',
  'neugeborenes-versichern',
  'familienzimmer-krankenhaus',
  // Auftrag Frank 08.10.2026
  'hebamme-rufbereitschaft',
  // Serie Stapel 2, Vorsorge (07.10.2026)
  'vorsorgeuntersuchung',
  'vorsorgeuntersuchung-frauen',
  'vorsorgeuntersuchung-maenner',
  'hautkrebsscreening',
  'tk-reiseimpfung',
  // Serie Stapel 2, Brille (07.10.2026)
  'brille-krankenkasse',
  'brillenversicherung',
  'gleitsichtbrille-kosten',
  // Vollständig faktengeprüfte Wellen B/C und Claude-Stapel, Einbau 08.10.2026.
  'zusatzbeitrag-krankenkasse-2026',
  'krankenkasse-wechseln',
  'aok-zuzahlungsbefreiung',
  'zusatzbeitrag-rentner',
  'praeventionskurs-krankenkasse',
  'guenstigste-krankenkasse',
  'mindestbeitrag-krankenkasse',
  'dak-zuzahlungsbefreiung',
  'krankenkasse-studenten',
  'dak-bonusprogramm-2026',
  'krankenkasse-zuschuss-fitnessstudio',
  'zuzahlungsbefreiung-chronisch-krank',
  'ikk-zuzahlungsbefreiung',
  'zuzahlung-medikamente',
  'krankenkasse-wechseln-nachteile',
  'zahnzusatzversicherung-vergleich',
  'aok-zahnreinigung',
  'tk-zahnreinigung',
  'barmer-zahnreinigung',
  'tk-zahnzusatzversicherung',
  'zahnzusatzversicherung-kosten',
  'zahnzusatzversicherung-laufende-behandlung',
  'professionelle-zahnreinigung-sinnvoll',
  'zahnreinigung-wie-oft',
  'weisheitszaehne-ziehen-kosten',
  'vollnarkose-zahnarzt-kosten',
  'barmer-zahnzusatzversicherung',
  'zahnkrone-rausgefallen',
  'dak-zahnzusatzversicherung',
  'ikk-zahnreinigung',
  'krankenhauszusatzversicherung-vergleich',
  'chefarztbehandlung',
  'krankenhauszusatzversicherung-kosten',
  'krankenhauszusatzversicherung-ohne-wartezeit',
  'begleitperson-krankenhaus',
  'osteopathie-kosten',
  'naturheilkunde',
  'osteopathie-krankenkasse',
  'physiotherapie-kosten',
  'akupunktur-krankenkasse',
  'augenlasern-kosten',
  'brillenversicherung-kinder',
  'tk-brille',
  'aok-brille',
  'check-up-35',
  'reiseimpfung-krankenkasse',
  'tk-hautkrebsscreening',
  'geburtsvorbereitungskurs',
  'familienversicherung-krankenkasse',
  'zuzahlungsbefreiung-schwerbehinderung',
  'hkk-bonusprogramm-2026',
  'hek-bonusprogramm-2026',
  'abnehmen-krankenkasse',
  'beitragserhoehung-krankenkasse',
  'mobil-krankenkasse-bonusprogramm',
  'zahnersatz-guenstig',
  'heil-und-kostenplan',
  'zahnzusatzversicherung-senioren',
  'implantat-oder-bruecke',
  'ikk-zahnzusatzversicherung',
  'aok-krankenhauszusatzversicherung',
  'krankenhauszusatzversicherung-vorerkrankung',
  'krankenhauszusatzversicherung-kinder',
  'krankenhauszusatzversicherung-senioren',
  'aok-osteopathie',
  'aok-heilpraktiker',
  'zusatzversicherung-osteopathie',
  'heilpraktiker-zusatzversicherung-ohne-wartezeit',
  'barmer-osteopathie',
  'tk-heilpraktiker',
  'mobil-krankenkasse-osteopathie',
  'kontaktlinsen-krankenkasse',
  'brille-verloren-versicherung',
  'brillenkosten',
  'zahn-und-brillenversicherung',
  'aok-reiseimpfung',
  'aok-babybonus',
  'geburtsvorbereitungskurs-partner',
  'schwangerschaft-krankenkasse-melden',
  'tk-schwangerschaft',
  'zuzahlungsbefreiung',
  'krankenversicherung-beitrag-2026',
  'tk-zuzahlungsbefreiung',
  'barmer-zuzahlungsbefreiung',
  'zuzahlungsbefreiung-rentner',
  'bkk-firmus-bonusprogramm-2026',
  'bonusprogramm-krankenkasse',
  'krankenkasse-wechseln-rentner',
  'zahnzusatzversicherung-kinder',
  'zahnspange-kosten',
  'zahnspange-erwachsene',
  'unsichtbare-zahnspange-kosten',
  'zahnzusatzversicherung-kieferorthopaedie',
  'zahnzusatzversicherung-familie',
  'wechselpraemie-krankenkasse',
  'tk-krankenhauszusatzversicherung',
  'tcm-krankenkasse',
  'vorsorgeuntersuchungen-kinder',

];

// Nur echte Abschnitts-Anker im Inhaltsverzeichnis: ids eindeutig.
for (const article of ratgeberArticles) {
  const ids = (article.sections || []).map((section) => section.id);
  expect(new Set(ids).size === ids.length, `Doppelte Abschnitts-id in ${article.slug}.`);
}

// Ein Autor muss im Autorenregister stehen (src/content/ratgeber/authors.js).
for (const article of ratgeberArticles) {
  if (!article.author) continue;
  expect(Boolean(AUTHORS[article.author]), `Unbekannter Autor in ${article.slug}: ${article.author}`);
}

// Ältere Artikel ohne Opt-in bleiben unverändert: keine neuen Felder.
for (const article of ratgeberArticles) {
  if (OPT_IN_SLUGS.includes(article.slug)) continue;
  expect(!article.quickAnswer && !article.sources && !article.author && !article.faqStyle && !shouldShowToc(article), `Opt-in-Baustein in einem älteren Artikel ohne Auftrag: ${article.slug}`);
}

// Zahnkosten-Rechner: nur lokaler Zustand, keine Messung, kein Formular,
// keine Sperrwörter in seinen Texten.
const rechnerUi = stripLayoutComments(read('src/components/ratgeber/ZahnkostenRechner.jsx'));
const rechnerLazy = stripLayoutComments(read('src/components/ratgeber/LazyZahnkostenRechner.jsx'));
const rechnerModel = read('src/lib/zahnkostenRechner.js');
for (const [name, source] of [['ZahnkostenRechner.jsx', rechnerUi], ['LazyZahnkostenRechner.jsx', rechnerLazy], ['zahnkostenRechner.js', stripLayoutComments(rechnerModel)]]) {
  expect(!/fetch\(|XMLHttpRequest|sendBeacon|dataLayer|gtag|fbq|track[A-Z]\w*\(|localStorage|sessionStorage|document\.cookie|<form/.test(source), `${name}: Der Rechner darf nichts senden, speichern oder messen.`);
  expect(!/@\/lib\/(?:analytics|google-ads|meta-pixel|consent)/.test(source), `${name}: keine Mess-Module im Rechner.`);
}
const rechnerTexte = rechnerModel.match(/'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g).join('\n');
expect(!RATGEBER_SPERRWORTE.test(rechnerTexte), `zahnkostenRechner.js: Sperrwort in den Rechnertexten: "${rechnerTexte.match(RATGEBER_SPERRWORTE)?.[0]}".`);
expect(!/[–—]/.test(rechnerTexte), 'zahnkostenRechner.js: keine Gedankenstriche in den Rechnertexten.');
expect(!/\bSie\b|\bIhre?[nmrs]?\b/.test(rechnerTexte), 'zahnkostenRechner.js: Du-Form in den Rechnertexten.');

for (const slug of RATGEBER_SLUGS) {
  const builtArticle = path.join(root, 'dist', 'ratgeber', slug, 'index.html');
  if (!fs.existsSync(builtArticle)) continue;
  const html = fs.readFileSync(builtArticle, 'utf8');
  expect(!/data-ratgeber-(?:quick|sources|author|toc|costcard)/.test(html) && !/"author":\{"@type":"Person"/.test(html), `Gebaut ${slug}: ältere Artikel bleiben ohne die neuen Bausteine.`);
}


// --- 9. Serien-Ratgeber je Feld (Zahn-Welle 1 seit 06.10.2026, Serie seit 07.10.2026) ---

// Quelle: Healio/Marktanalyse-2026-10/ZAHN-RATGEBER-PLAN.md (Abschnitte 4
// und 5), PRODUKTION-RATGEBER.md (Abschnitte 7 bis 10) und die Mobil-Prüfung
// vom 06.10.2026. Jede Serienseite trägt Autor, Kurzantwort mit Angebotsweg,
// Quellenblock mit Prüfdatum, Kostenkarte oder Karten-Tabelle, Kasten
// "Ehrlich gesagt", FAQ zum Aufklappen und die Pflichtlinks.
//
// Feld = Themengruppe in gliederung.js (RATGEBER_GROUPS, id). Je Feld steht
// hier, wohin der Angebotsweg führen darf. Interne Pfade (mit /) dürfen
// Kurzantwort und Weg-Karten tragen, externe Ziele (kassenboost.de) zählen
// nur als Link im Text. Eine neue Gruppe in gliederung.js braucht zuerst
// einen Eintrag hier, sonst schlägt der Test an.
const RATGEBER_FELDER = {
  zaehne: { label: 'Zahn-Ratgeber', angebotsPfade: ['/zahn'], rechner: true },
  krankenhaus: { label: 'Krankenhaus-Ratgeber', angebotsPfade: ['/stationaer'] },
  ambulant: { label: 'Ambulant-Ratgeber', angebotsPfade: ['/ambulant'] },
  brille: { label: 'Brillen-Ratgeber', angebotsPfade: ['/ambulant'] },
  vorsorge: { label: 'Vorsorge-Ratgeber', angebotsPfade: ['/ambulant'] },
  'kasse-bonus': { label: 'Kassen-Ratgeber', angebotsPfade: ['/kassenbonus', '/ambulant', 'https://kassenboost.de'] },
  familie: { label: 'Familien-Ratgeber', angebotsPfade: ['/stationaer', '/zahn', '/ambulant', 'https://kassenboost.de'] },
};

// Zielbegriff je Serienseite: muss in H1 und Seitentitel stehen. Wer hier
// steht, bekommt alle Pflichtprüfungen dieses Abschnitts; die Gruppe (und
// damit das Feld) kommt aus gliederung.js.
const SERIEN_ZIELBEGRIFFE = {
  // Zahn-Welle 1 (Commit d4f7126)
  'zahnersatz-kosten': /zahnersatz kosten/i,
  'professionelle-zahnreinigung-kosten': /professionelle zahnreinigung/i,
  'zahnimplantat-kosten': /zahnimplantat/i,
  'wurzelbehandlung-kosten': /wurzelbehandlung/i,
  'zahnkrone-kosten': /zahnkrone/i,
  'bonusheft-zahnarzt': /bonusheft beim zahnarzt/i,
  'zahnzusatzversicherung-ohne-wartezeit': /zahnzusatzversicherung ohne wartezeit/i,
  // Serie Stapel 1, Zahn Kasse und Partner (07.10.2026)
  'zahnzusatzversicherung-lohnt-sich': /lohnt sich eine zahnzusatzversicherung/i,
  'ukv-zahnzusatzversicherung': /ukv zahnzusatzversicherung/i,
  'bayerische-zahnzusatzversicherung': /bayerische zahnzusatzversicherung/i,
  'aok-zahnzusatzversicherung': /aok zahnzusatzversicherung/i,
  'dak-zahnreinigung': /zahnreinigung dak/i,
  // Serie Stapel 2, Zahnkosten (07.10.2026)
  'zahnbruecke-kosten': /zahnbrücke:? kosten/i,
  'zahnprothese-kosten': /zahnprothese:? (?:arten, )?kosten/i,
  'zahnfuellung-kosten': /zahnfüllung:? kosten/i,
  'parodontitis-behandlung-kosten': /parodontitis[- ]behandlung/i,
  'zahnersatz-moeglichkeiten': /zahnersatz möglichkeiten/i,
  'zahnersatz-haertefall': /härtefall (?:beim )?zahnersatz/i,
  // Serie Stapel 2, Heilpraktiker und Naturheilkunde (07.10.2026)
  'heilpraktiker-kosten': /heilpraktiker kosten/i,
  'heilpraktiker-zusatzversicherung': /heilpraktiker zusatzversicherung/i,
  'ambulante-zusatzversicherung': /ambulante zusatzversicherung/i,
  'akupunktur-kosten': /akupunktur kosten/i,
  'tk-osteopathie': /techniker krankenkasse osteopathie/i,
  'chiropraktiker-kosten': /chiropraktiker kosten/i,
  'physiotherapie-zuzahlung': /zuzahlung physiotherapie/i,
  'gebuehrenordnung-heilpraktiker': /gebührenordnung heilpraktiker/i,
  // Serie Stapel 2, Krankenhaus (07.10.2026)
  'stationaere-zusatzversicherung': /stationäre zusatzversicherung/i,
  'einzelzimmer-krankenhaus-kosten': /einzelzimmer (?:im )?krankenhaus/i,
  'zusatzversicherung-einzelzimmer': /zusatzversicherung krankenhaus einzelzimmer/i,
  'krankenhaustagegeld': /krankenhaustagegeld/i,
  'reha-zuzahlung': /zuzahlung reha/i,
  // Serie Stapel 2, Schwangerschaft und Familie (07.10.2026)
  'zusatzversicherung-kinder': /zusatzversicherung kinder/i,
  'babybonus-krankenkasse': /babybonus krankenkasse/i,
  // Serie Stapel 2, familienplanung (07.10.2026)
  'baby-geplant-zusatzversicherung': /zusatzversicherung vor der schwangerschaft/i,
  'neugeborenes-versichern': /neugeborenes versichern/i,
  'familienzimmer-krankenhaus': /familienzimmer (?:im )?krankenhaus/i,
  // Auftrag Frank 08.10.2026
  'hebamme-rufbereitschaft': /rufbereitschaft der hebamme|hebamme rufbereitschaft/i,
  // Serie Stapel 2, Vorsorge (07.10.2026)
  'vorsorgeuntersuchung': /vorsorgeuntersuchung/i,
  'vorsorgeuntersuchung-frauen': /vorsorgeuntersuchung(?:en)? frauen/i,
  'vorsorgeuntersuchung-maenner': /vorsorgeuntersuchung(?:en)? männer/i,
  'hautkrebsscreening': /hautkrebsscreening/i,
  'tk-reiseimpfung': /tk reiseimpfung/i,
  // Serie Stapel 2, Brille (07.10.2026)
  'brille-krankenkasse': /zahlt die krankenkasse eine brille/i,
  'brillenversicherung': /brillenversicherung/i,
  'gleitsichtbrille-kosten': /gleitsichtbrille kosten/i,
  // Zielbegriffe der freigegebenen Artikel, mit zulässigen Wortformen.
  "zusatzbeitrag-krankenkasse-2026": new RegExp("(?=.*zusatzbeitrag)(?=.*krankenkasse)", 'i'),
  "krankenkasse-wechseln": new RegExp("(?=.*krankenkasse)(?=.*wechseln)", 'i'),
  "aok-zuzahlungsbefreiung": new RegExp("(?=.*aok)(?=.*zuzahlungsbefreiung)", 'i'),
  "zusatzbeitrag-rentner": new RegExp("(?=.*zusatzbeitrag)(?=.*rentner)", 'i'),
  "praeventionskurs-krankenkasse": new RegExp("(?=.*präventionskurs)(?=.*krankenkasse)", 'i'),
  "guenstigste-krankenkasse": new RegExp("(?=.*günstigste)(?=.*krankenkasse)", 'i'),
  "mindestbeitrag-krankenkasse": new RegExp("(?=.*mindestbeitrag)(?=.*krankenkasse)", 'i'),
  "dak-zuzahlungsbefreiung": new RegExp("(?=.*dak)(?=.*zuzahlungsbefreiung)", 'i'),
  "krankenkasse-studenten": new RegExp("(?=.*krankenkasse)(?=.*student)", 'i'),
  "dak-bonusprogramm-2026": new RegExp("(?=.*dak)(?=.*bonusprogramm)", 'i'),
  "krankenkasse-zuschuss-fitnessstudio": new RegExp("(?=.*krankenkasse)(?=.*zuschuss)(?=.*fitnessstudio)", 'i'),
  "zuzahlungsbefreiung-chronisch-krank": new RegExp("(?=.*zuzahlungsbefreiung)(?=.*chronisch)(?=.*krank)", 'i'),
  "ikk-zuzahlungsbefreiung": new RegExp("(?=.*ikk)(?=.*zuzahlungsbefreiung)", 'i'),
  "zuzahlung-medikamente": new RegExp("(?=.*zuzahlung)(?=.*medikamente)", 'i'),
  "krankenkasse-wechseln-nachteile": new RegExp("(?=.*krankenkasse)(?=.*wechseln)(?=.*nachteile)", 'i'),
  "zahnzusatzversicherung-vergleich": new RegExp("(?=.*zahnzusatzversicherung)(?=.*vergleich)", 'i'),
  "aok-zahnreinigung": new RegExp("(?=.*aok)(?=.*zahnreinigung)", 'i'),
  "tk-zahnreinigung": new RegExp("(?=.*tk)(?=.*zahnreinigung)", 'i'),
  "barmer-zahnreinigung": new RegExp("(?=.*barmer)(?=.*zahnreinigung)", 'i'),
  "tk-zahnzusatzversicherung": new RegExp("(?=.*tk)(?=.*zahnzusatzversicherung)", 'i'),
  "zahnzusatzversicherung-kosten": new RegExp("(?=.*zahnzusatzversicherung)(?=.*kost)", 'i'),
  "zahnzusatzversicherung-laufende-behandlung": new RegExp("(?=.*zahnzusatzversicherung)(?=.*laufende)(?=.*behandlung)", 'i'),
  "professionelle-zahnreinigung-sinnvoll": new RegExp("(?=.*professionelle)(?=.*zahnreinigung)(?=.*sinnvoll)", 'i'),
  "zahnreinigung-wie-oft": new RegExp("(?=.*zahnreinigung)(?=.*wie)(?=.*oft)", 'i'),
  "weisheitszaehne-ziehen-kosten": new RegExp("(?=.*weisheitszähne)(?=.*zieh)(?=.*kost)", 'i'),
  "vollnarkose-zahnarzt-kosten": new RegExp("(?=.*vollnarkose)(?=.*zahnarzt)(?=.*kost)", 'i'),
  "barmer-zahnzusatzversicherung": new RegExp("(?=.*barmer)(?=.*zahnzusatzversicherung)", 'i'),
  "zahnkrone-rausgefallen": new RegExp("(?=.*zahnkrone)(?=.*rausgefallen)", 'i'),
  "dak-zahnzusatzversicherung": new RegExp("(?=.*dak)(?=.*zahnzusatzversicherung)", 'i'),
  "ikk-zahnreinigung": new RegExp("(?=.*ikk)(?=.*zahnreinigung)", 'i'),
  "krankenhauszusatzversicherung-vergleich": new RegExp("(?=.*krankenhauszusatz)(?=.*vergleich)", 'i'),
  "chefarztbehandlung": new RegExp("(?=.*chefarztbehandlung)", 'i'),
  "krankenhauszusatzversicherung-kosten": new RegExp("(?=.*krankenhauszusatz)(?=.*kost)", 'i'),
  "krankenhauszusatzversicherung-ohne-wartezeit": new RegExp("(?=.*krankenhauszusatz)(?=.*ohne)(?=.*wartezeit)", 'i'),
  "begleitperson-krankenhaus": new RegExp("(?=.*begleitperson)(?=.*krankenhaus)", 'i'),
  "osteopathie-kosten": new RegExp("(?=.*osteopathie)(?=.*kost)", 'i'),
  "naturheilkunde": new RegExp("(?=.*naturheilkunde)", 'i'),
  "osteopathie-krankenkasse": new RegExp("(?=.*osteopathie)(?=.*krankenkasse)", 'i'),
  "physiotherapie-kosten": new RegExp("(?=.*physiotherapie)(?=.*kost)", 'i'),
  "akupunktur-krankenkasse": new RegExp("(?=.*akupunktur)(?=.*krankenkasse)", 'i'),
  "augenlasern-kosten": new RegExp("(?=.*augenlasern)(?=.*kost)", 'i'),
  "brillenversicherung-kinder": new RegExp("(?=.*brillenversicherung)(?=.*kinder)", 'i'),
  "tk-brille": new RegExp("(?=.*tk)(?=.*brille)", 'i'),
  "aok-brille": new RegExp("(?=.*aok)(?=.*brille)", 'i'),
  "check-up-35": new RegExp("(?=.*check)(?=.*up)(?=.*35)", 'i'),
  "reiseimpfung-krankenkasse": new RegExp("(?=.*reiseimpfung)(?=.*krankenkasse)", 'i'),
  "tk-hautkrebsscreening": new RegExp("(?=.*tk)(?=.*hautkrebsscreening)", 'i'),
  "geburtsvorbereitungskurs": new RegExp("(?=.*geburtsvorbereitungskurs)", 'i'),
  "familienversicherung-krankenkasse": new RegExp("(?=.*familienversicherung)", 'i'),
  "zuzahlungsbefreiung-schwerbehinderung": new RegExp("(?=.*zuzahlungsbefreiung)(?=.*schwerbehinderung)", 'i'),
  "hkk-bonusprogramm-2026": new RegExp("(?=.*hkk)(?=.*bonusprogramm)", 'i'),
  "hek-bonusprogramm-2026": new RegExp("(?=.*hek)(?=.*bonusprogramm)", 'i'),
  "abnehmen-krankenkasse": new RegExp("(?=.*abnehmen)(?=.*krankenkasse)", 'i'),
  "beitragserhoehung-krankenkasse": new RegExp("(?=.*erhöh)(?=.*krankenkasse)", 'i'),
  "mobil-krankenkasse-bonusprogramm": new RegExp("(?=.*mobil)(?=.*bonusprogramm)", 'i'),
  "zahnersatz-guenstig": new RegExp("(?=.*zahnersatz)(?=.*günstig)", 'i'),
  "heil-und-kostenplan": new RegExp("(?=.*heil)(?=.*kostenplan)", 'i'),
  "zahnzusatzversicherung-senioren": new RegExp("(?=.*zahnzusatzversicherung)(?=.*(?:senior|ab 50|ab 65))", 'i'),
  "implantat-oder-bruecke": new RegExp("(?=.*implantat)(?=.*brücke)", 'i'),
  "ikk-zahnzusatzversicherung": new RegExp("(?=.*ikk)(?=.*(?:zahnzusatzversicherung|zähne))", 'i'),
  "aok-krankenhauszusatzversicherung": new RegExp("(?=.*aok)(?=.*(?:krankenhaus|einzelzimmer))", 'i'),
  "krankenhauszusatzversicherung-vorerkrankung": new RegExp("(?=.*krankenhauszusatz)(?=.*vorerkrank)", 'i'),
  "krankenhauszusatzversicherung-kinder": new RegExp("(?=.*krankenhauszusatz)(?=.*kinder)", 'i'),
  "krankenhauszusatzversicherung-senioren": new RegExp("(?=.*krankenhauszusatz)(?=.*(?:senior|ab 50|ab 65))", 'i'),
  "aok-osteopathie": new RegExp("(?=.*aok)(?=.*osteopathie)", 'i'),
  "aok-heilpraktiker": new RegExp("(?=.*aok)(?=.*heilpraktiker)", 'i'),
  "zusatzversicherung-osteopathie": new RegExp("(?=.*zusatz)(?=.*osteopathie)", 'i'),
  "heilpraktiker-zusatzversicherung-ohne-wartezeit": new RegExp("(?=.*heilpraktiker)(?=.*zusatz)(?=.*ohne wartezeit)", 'i'),
  "barmer-osteopathie": new RegExp("(?=.*barmer)(?=.*osteopathie)", 'i'),
  "tk-heilpraktiker": new RegExp("(?=.*tk)(?=.*heilpraktiker)", 'i'),
  "mobil-krankenkasse-osteopathie": new RegExp("(?=.*mobil)(?=.*krankenkasse)(?=.*osteopathie)", 'i'),
  "kontaktlinsen-krankenkasse": new RegExp("(?=.*kontaktlinsen)(?=.*krankenkasse)", 'i'),
  "brille-verloren-versicherung": new RegExp("(?=.*brille)(?=.*(?:verloren|kaputt))(?=.*versicherung)", 'i'),
  "brillenkosten": new RegExp("(?=.*brill.*kost|kost.*brill)", 'i'),
  "zahn-und-brillenversicherung": new RegExp("(?=.*zahn)(?=.*brillenversicherung)", 'i'),
  "aok-reiseimpfung": new RegExp("(?=.*aok)(?=.*reiseimpfung)", 'i'),
  "aok-babybonus": new RegExp("(?=.*aok)(?=.*babybonus)", 'i'),
  "geburtsvorbereitungskurs-partner": new RegExp("(?=.*geburtsvorbereitungskurs)(?=.*partner)", 'i'),
  "schwangerschaft-krankenkasse-melden": new RegExp("(?=.*schwangerschaft)(?=.*krankenkasse)(?=.*melden)", 'i'),
  "tk-schwangerschaft": new RegExp("(?=.*tk)(?=.*schwangerschaft)", 'i'),
  "zuzahlungsbefreiung": new RegExp("(?=.*zuzahlungsbefreiung)", 'i'),
  "krankenversicherung-beitrag-2026": new RegExp("(?=.*krankenversicherung)(?=.*beitrag)", 'i'),
  "tk-zuzahlungsbefreiung": new RegExp("(?=.*tk)(?=.*zuzahlungsbefreiung)", 'i'),
  "barmer-zuzahlungsbefreiung": new RegExp("(?=.*barmer)(?=.*zuzahlungsbefreiung)", 'i'),
  "zuzahlungsbefreiung-rentner": new RegExp("(?=.*zuzahlungsbefreiung)(?=.*rentner)", 'i'),
  "bkk-firmus-bonusprogramm-2026": new RegExp("(?=.*bkk)(?=.*firmus)(?=.*bonusprogramm)", 'i'),
  "bonusprogramm-krankenkasse": new RegExp("(?=.*bonusprogramm)(?=.*krankenkasse)", 'i'),
  "krankenkasse-wechseln-rentner": new RegExp("(?=.*krankenkasse)(?=.*wechseln)(?=.*rentner)", 'i'),
  "zahnzusatzversicherung-kinder": new RegExp("(?=.*zahnzusatzversicherung)(?=.*kinder)", 'i'),
  "zahnspange-kosten": new RegExp("(?=.*zahnspange)(?=.*kost)", 'i'),
  "zahnspange-erwachsene": new RegExp("(?=.*zahnspange)(?=.*erwachsene)", 'i'),
  "unsichtbare-zahnspange-kosten": new RegExp("(?=.*unsichtbare)(?=.*zahnspange)(?=.*kost)", 'i'),
  "zahnzusatzversicherung-kieferorthopaedie": new RegExp("(?=.*zahnzusatzversicherung)(?=.*kieferorthopädie)", 'i'),
  "zahnzusatzversicherung-familie": new RegExp("(?=.*zahnzusatzversicherung)(?=.*familie)", 'i'),
  "wechselpraemie-krankenkasse": new RegExp("(?=.*krankenkasse)(?=.*wechsel)(?=.*prämie)", 'i'),
  "tk-krankenhauszusatzversicherung": new RegExp("(?=.*tk)(?=.*krankenhaus)", 'i'),
  "tcm-krankenkasse": new RegExp("(?=.*tcm)(?=.*kassenzulassung)", 'i'),
  "vorsorgeuntersuchungen-kinder": new RegExp("(?=.*vorsorgeuntersuchungen)(?=.*kind)", 'i'),

};

// Ältere Artikel in einer Feld-Gruppe, die vor der Vorlage entstanden sind
// und eigene Prüfungen haben (Abschnitte 2b, 2c, 6a). Sie zählen als
// Gruppenartikel (Bereichsseite, Nachbarn), aber nicht als Serienseite.
const AELTERE_GRUPPENARTIKEL = [
  'zahnzusatzversicherung-fehlender-zahn',
  // Gruppe familie seit Stapel 2 (07.10.2026)
  'schwanger-zusatzversicherung',
  'schwangerschaft-was-steht-mir-zu',
  'hebamme-kosten-krankenkasse',
  // Bestehende Bonusartikel und Advertorial, jetzt in der Kasse-Gruppe.
  'ikk-classic-bonusprogramm-2026',
  'mkk-bonusprogramm-2026',
  'aok-bonusprogramm-2026',
  'tk-bonusprogramm-2026',
  'barmer-bonusprogramm-2026',
  'krankenkassen-bonus-zusatzversicherung',

];

// Seit Einbau Welle B/C haben auch Brillenseiten mindestens zwei Nachbarn.
// Keine Ausnahme mehr für eine Gruppe; Bereichsseite und Höchstzahl bleiben geprüft.
const NACHBARN_MINDESTZAHL_AUSNAHME = {};

// Die Zahn-Welle 1 steht zusätzlich im Weiterlesen-Block auf /zahn (unten).
const ZAHN_WELLE1 = [
  'zahnersatz-kosten',
  'professionelle-zahnreinigung-kosten',
  'zahnimplantat-kosten',
  'wurzelbehandlung-kosten',
  'zahnkrone-kosten',
  'bonusheft-zahnarzt',
  'zahnzusatzversicherung-ohne-wartezeit',
];

// Sperrwörter der Serienseiten: wie RATGEBER_SPERRWORTE, nur "ohne
// Gesundheitsprüfung" prüft die Schleife unten mit Kontext (Kindernachversicherung).
const SERIEN_SPERRWORTE = new RegExp(
  RATGEBER_SPERRWORTE.source.replace('(?:keine|ohne) Gesundheits(?:fragen|prüfung)', '(?:keine|ohne) Gesundheitsfragen|keine Gesundheitsprüfung'),
  'i',
);
expect(SERIEN_SPERRWORTE.source !== RATGEBER_SPERRWORTE.source && SERIEN_SPERRWORTE.test('keine Gesundheitsprüfung') && SERIEN_SPERRWORTE.test('ohne Gesundheitsfragen') && !SERIEN_SPERRWORTE.test('ohne Gesundheitsprüfung'), 'SERIEN_SPERRWORTE: Ausnahme für "ohne Gesundheitsprüfung" nicht sauber abgeleitet.');
// Der Satz rund um eine Fundstelle: bis zum vorigen und nächsten Satzende
// (Punkt, Frage- oder Ausrufezeichen vor Großbuchstabe) oder Zeilenwechsel.
const satzUm = (text, index) => {
  const before = text.slice(0, index);
  const starts = [...before.matchAll(/[.!?]\s+(?=[A-ZÄÖÜ])|\n/g)];
  const start = starts.length ? starts[starts.length - 1].index + starts[starts.length - 1][0].length : 0;
  const after = text.slice(index).search(/[.!?](?=\s+[A-ZÄÖÜ])|\n/);
  return text.slice(start, after === -1 ? text.length : index + after + 1);
};

const SERIEN_ALL = Object.keys(SERIEN_ZIELBEGRIFFE);
// SERIE_ONLY=slug1,slug2 (früher ZAHN_ONLY) prüft beim Schreiben nur die
// genannten Seiten im Detail. Die Querprüfungen laufen immer über alle.
const SERIE_ONLY = (process.env.SERIE_ONLY || process.env.ZAHN_ONLY || '').split(',').map((entry) => entry.trim()).filter(Boolean);
const SERIEN_SLUGS = SERIE_ONLY.length ? SERIEN_ALL.filter((slug) => SERIE_ONLY.includes(slug)) : SERIEN_ALL;

const groupOf = (slug) => RATGEBER_GROUPS.find((group) => group.slugs.includes(slug));
const groupPaths = (group) => new Set((group?.slugs || []).map((entry) => `/ratgeber/${entry}`));
const stripTarget = (to) => to.split('#')[0].split('?')[0];
const matchesAngebot = (target, pfade) => pfade.some((pfad) => (pfad.startsWith('/') ? stripTarget(target) === pfad : target.startsWith(pfad)));
const internalPfade = (feld) => feld.angebotsPfade.filter((pfad) => pfad.startsWith('/'));

// Gliederung und Feldliste passen zusammen.
for (const group of RATGEBER_GROUPS) {
  expect(Boolean(RATGEBER_FELDER[group.id]), `Gruppe ${group.id} in gliederung.js ohne Eintrag in RATGEBER_FELDER (erlaubte Angebotspfade).`);
  expect(group.slugs.includes(group.hubSlug), `Gruppe ${group.id}: Die Bereichsseite ${group.hubSlug} steht nicht in slugs.`);
  expect(Boolean(SERIEN_ZIELBEGRIFFE[group.hubSlug]), `Gruppe ${group.id}: Die Bereichsseite ${group.hubSlug} braucht einen Zielbegriff und die Serienprüfung.`);
  for (const slug of group.slugs) {
    expect(Boolean(SERIEN_ZIELBEGRIFFE[slug]) || AELTERE_GRUPPENARTIKEL.includes(slug), `Gruppe ${group.id}: ${slug} ohne Zielbegriff in SERIEN_ZIELBEGRIFFE.`);
  }
}
for (const [id, feld] of Object.entries(RATGEBER_FELDER)) {
  expect(feld.angebotsPfade.length >= 1 && internalPfade(feld).length >= 1, `Feld ${id}: mindestens ein interner Angebotspfad.`);
  for (const pfad of internalPfade(feld)) {
    expect(routeByPath.has(pfad), `Feld ${id}: Angebotspfad ${pfad} ist keine Route in scripts/seo-routes.mjs.`);
  }
}
for (const slug of SERIEN_ALL) {
  expect(OPT_IN_SLUGS.includes(slug), `Serienseite ${slug} steht nicht in OPT_IN_SLUGS.`);
  expect(Boolean(groupOf(slug)), `Serienseite ${slug} steht in keiner Gruppe von gliederung.js.`);
}
for (const slug of OPT_IN_SLUGS) {
  expect(SERIEN_ALL.includes(slug), `${slug} nutzt die Bausteine (OPT_IN_SLUGS), hat aber keinen Zielbegriff und damit keine Serienprüfung.`);
}

const internalTargets = (article) => {
  const targets = [];
  const fromBlocks = (blocks) => {
    for (const block of blocks || []) {
      if (block.type === 'segments') block.segments.forEach((segment) => segment.to && targets.push(segment.to));
      if (block.type === 'path' && block.to) targets.push(block.to);
      if (block.type === 'cards') (block.items || []).forEach((card) => card.to && targets.push(card.to));
    }
  };
  for (const section of article.sections || []) fromBlocks(section.blocks);
  if (article.quickAnswer?.path?.to) targets.push(article.quickAnswer.path.to);
  for (const segment of article.onward?.segments || []) if (segment.to) targets.push(segment.to);
  return targets.map(stripTarget);
};
// Alle Linkziele samt externen (href), für den Angebotsweg eines Feldes.
const allLinkTargets = (article) => {
  const targets = [...internalTargets(article)];
  for (const section of article.sections || []) {
    for (const block of section.blocks || []) {
      if (block.type === 'segments') block.segments.forEach((segment) => segment.href && targets.push(segment.href));
    }
  }
  for (const segment of article.onward?.segments || []) if (segment.href) targets.push(segment.href);
  return targets;
};

for (const slug of SERIEN_SLUGS) {
  const article = getRatgeberArticle(slug);
  const group = groupOf(slug);
  const feld = RATGEBER_FELDER[group?.id];
  const label = `${feld?.label || 'Serien-Ratgeber'} ${slug}`;
  expect(Boolean(article), `${label}: fehlt im Inhaltsregister.`);
  if (!article || !group || !feld) continue;
  const text = renderArticleText(article);
  const hubPath = `/ratgeber/${group.hubSlug}`;

  expect(article.kind === 'ratgeber', `${label}: kind muss "ratgeber" sein.`);
  expect(/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt || '') && Boolean(article.publishedAtLabel), `${label}: publishedAt und publishedAtLabel fehlen.`);
  expect(!article.updatedAt || (/^\d{4}-\d{2}-\d{2}$/.test(article.updatedAt) && Boolean(article.updatedAtLabel)), `${label}: updatedAt braucht ISO-Datum und updatedAtLabel.`);
  expect(new RegExp(`<loc>https://healio\\.de/ratgeber/${slug}</loc>\\s*<lastmod>${article.updatedAt || article.publishedAt}</lastmod>`).test(sitemap), `${label}: Sitemap-Eintrag mit lastmod ${article.updatedAt || article.publishedAt} fehlt.`);
  expect(Number.isInteger(article.readingTimeMinutes) && article.readingTimeMinutes > 0, `${label}: readingTimeMinutes fehlt.`);

  // Zielbegriff in Titel und H1, Kurzantwort zuerst, Fragen als Überschriften.
  expect(SERIEN_ZIELBEGRIFFE[slug].test(article.headline) && SERIEN_ZIELBEGRIFFE[slug].test(article.metaTitle), `${label}: Zielbegriff fehlt in H1 oder Seitentitel.`);
  expect((article.metaTitle || '').length <= 65, `${label}: Seitentitel länger als 65 Zeichen.`);
  expect((article.metaDescription || '').length >= 110 && (article.metaDescription || '').length <= 165, `${label}: Beschreibung sollte 110 bis 165 Zeichen haben.`);
  const questionHeadings = (article.sections || []).filter((section) => /\?$/.test(section.heading));
  expect(questionHeadings.length >= 4, `${label}: mindestens vier Zwischenüberschriften als Frage.`);

  // Autor, Kurzantwort, Quellen, Inhaltsverzeichnis, FAQ zum Aufklappen.
  expect(article.author === 'frank-steinfurt' && Boolean(AUTHORS[article.author]), `${label}: Autor Frank Steinfurt fehlt.`);
  const quick = article.quickAnswer;
  expect(Boolean(quick?.title) && Array.isArray(quick?.facts) && quick.facts.length >= 1 && quick.facts.length <= 3, `${label}: Kurzantwort-Karte mit ein bis drei Zahlen fehlt.`);
  expect((quick?.facts || []).every((fact) => fact.value && fact.label), `${label}: jede Zahl der Kurzantwort braucht Wert und Beschriftung.`);
  // Mobil zuerst: kurze Beschriftungen, damit der Weg im ersten Bildschirm liegt.
  expect((quick?.facts || []).every((fact) => fact.value.length <= 24 && fact.label.length <= 70), `${label}: Kurzantwort-Zahlen höchstens 24, Beschriftungen höchstens 70 Zeichen.`);
  expect((quick?.path?.text || '').length <= 60, `${label}: Der Satz am Angebotsweg der Kurzantwort hat höchstens 60 Zeichen.`);
  expect(Boolean(quick?.path?.to) && matchesAngebot(quick.path.to, internalPfade(feld)) && Boolean(quick?.path?.label), `${label}: Die Kurzantwort zeigt den Angebotsweg des Feldes (${internalPfade(feld).join(', ')}) im ersten Bildschirm.`);
  const sources = article.sources;
  expect(/^\d{4}-\d{2}-\d{2}$/.test(sources?.checkedAt || '') && Boolean(sources?.checkedAtLabel), `${label}: Quellenblock braucht ein sichtbares Prüfdatum.`);
  expect(Array.isArray(sources?.items) && sources.items.length >= 3, `${label}: Quellenblock braucht mindestens drei Quellen.`);
  expect((sources?.items || []).filter((source) => /^https:\/\//.test(source.href || '') && source.accessedAt).length >= 3, `${label}: mindestens drei verlinkte https-Quellen mit Abrufdatum.`);
  for (const source of sources?.items || []) {
    expect(Boolean(source.label && source.publisher), `${label}: Quelle ohne Titel oder Herausgeber.`);
    expect(!source.href || /^https:\/\//.test(source.href), `${label}: Quellen-Link muss https sein: ${source.href}`);
    expect(!source.href || Boolean(source.accessedAt), `${label}: Verlinkte Quelle ohne Abrufdatum: ${source.label}`);
  }
  expect(article.toc === 'auto', `${label}: toc: 'auto' setzen (Inhaltsverzeichnis ab rund 1.500 Wörtern).`);
  expect(article.faqStyle === 'accordion', `${label}: FAQ zum Aufklappen (faqStyle: 'accordion').`);
  expect(Array.isArray(article.faqs) && article.faqs.length >= 4, `${label}: mindestens vier FAQ.`);
  expect((article.factNugget || '').trim().length >= 80, `${label}: Faktenkasten fehlt.`);
  expect(!article.internalCta, `${label}: kein interner Button, der Angebotsweg läuft über Kurzantwort, Weg-Karten und den Schluss.`);

  // Bausteine im Text. Zahn-Seiten brauchen die Kostenkarte, andere Felder
  // eine Kostenkarte oder eine Tabelle, die mobil zu Karten wird.
  const blocks = (article.sections || []).flatMap((section) => section.blocks);
  const costCards = blocks.filter((block) => block.type === 'costCard');
  const tables = blocks.filter((block) => block.type === 'table');
  if (group.id === 'zaehne') {
    expect(costCards.length >= 1, `${label}: Kostenkarte (costCard) fehlt.`);
  } else {
    expect(costCards.length + tables.length >= 1, `${label}: Kostenkarte oder Tabelle fehlt.`);
  }
  for (const card of costCards) {
    expect(card.head?.length === 4 && /Kasse/.test(card.head[1]) && /ohne Tarif/.test(card.head[2]) && /mit Tarif/.test(card.head[3]), `${label}: Kostenkarte braucht die Spalten Kasse zahlt, ohne Tarif, mit Tarif.`);
    expect(card.rows.every((row) => row.length === 4), `${label}: Jede Zeile der Kostenkarte hat vier Zellen.`);
    expect(Boolean(card.note), `${label}: Kostenkarte braucht eine Quellen- und Annahmenzeile (note).`);
  }
  expect(blocks.some((block) => block.type === 'honest' && block.heading === 'Ehrlich gesagt'), `${label}: Kasten "Ehrlich gesagt" fehlt.`);
  for (const table of tables) {
    expect(table.mobile === 'cards', `${label}: Tabellen in Serien-Ratgebern werden auf dem Handy zu Karten (mobile: 'cards').`);
  }
  const pathBlocks = blocks.filter((block) => block.type === 'path');
  expect(pathBlocks.length >= 1, `${label}: mindestens eine Weg-Karte zum Angebotsweg im Text.`);
  for (const block of pathBlocks) {
    expect(matchesAngebot(block.to || '', internalPfade(feld)), `${label}: Weg-Karte zeigt nicht auf einen Angebotspfad des Feldes: ${block.to}`);
  }
  for (const block of blocks.filter((entry) => entry.type === 'calculator')) {
    expect(Boolean(feld.rechner), `${label}: Der Zahnkosten-Rechner gehört nur in Zahn-Ratgeber.`);
    expect(['krone-metall', 'bruecke', 'implantat'].includes(block.preset), `${label}: unbekannte Rechner-Vorgabe ${block.preset}.`);
  }

  // Verlinkung: Bereichsseite, zwei bis vier Nachbarn der eigenen Gruppe,
  // Angebotsweg des Feldes.
  const targets = internalTargets(article);
  const ratgeberTargets = [...new Set(targets.filter((to) => to.startsWith('/ratgeber/')))];
  for (const target of ratgeberTargets) {
    expect(Boolean(getRatgeberArticle(target.slice('/ratgeber/'.length))), `${label}: Interner Ratgeber-Link zeigt ins Leere: ${target}`);
  }
  expect(allLinkTargets(article).some((target) => matchesAngebot(target, feld.angebotsPfade)), `${label}: Link auf den Angebotsweg des Feldes (${feld.angebotsPfade.join(', ')}) fehlt.`);
  if (slug === group.hubSlug) {
    // Die Bereichsseite listet alle Artikel ihrer Gruppe in Karten (die
    // Übersicht zeigt je Gruppe nur Bereichsseite plus sechs).
    const cardTargets = new Set(blocks.filter((block) => block.type === 'cards').flatMap((block) => (block.items || []).map((card) => stripTarget(card.to || ''))));
    for (const other of group.slugs.filter((entry) => entry !== group.hubSlug)) {
      expect(cardTargets.has(`/ratgeber/${other}`), `Bereichsseite ${slug}: Karte auf ${other} fehlt (Bereichsseite listet alle Gruppenartikel).`);
    }
  } else {
    expect(ratgeberTargets.includes(hubPath), `${label}: Link auf die Bereichsseite fehlt.`);
    // Nachbarn sind die übrigen Artikel der eigenen Gruppe; Links in andere
    // Gruppen oder auf Einzelartikel zählen nicht mit.
    const ownPaths = groupPaths(group);
    const neighbours = ratgeberTargets.filter((target) => target !== hubPath && target !== `/ratgeber/${slug}` && ownPaths.has(target));
    const minNeighbours = NACHBARN_MINDESTZAHL_AUSNAHME[group.id] ?? 2;
    expect(neighbours.length >= minNeighbours && neighbours.length <= 4, `${label}: zwei bis vier Nachbarn der eigenen Gruppe verlinken (gefunden ${neighbours.length}).`);
  }

  // Wortregeln (zusätzlich zu Abschnitt 6) und Pflichtgrenzen.
  // "ohne Gesundheitsprüfung" ist nur bei der Kindernachversicherung richtig
  // (§ 198 VVG), Regel wie in Commit 5bf4c8c: in den 220 Zeichen davor steht
  // Kind, Baby, Neugeborenes oder Geburt. Zusätzlich (Stapel familienplanung,
  // 07.10.2026) stehen die Voraussetzungen im selben Satz: ein versicherter
  // Elternteil und die Anmeldefrist von zwei Monaten. Für Anträge von
  // Erwachsenen bleibt die Formel gesperrt, "keine Gesundheitsprüfung" und
  // "keine/ohne Gesundheitsfragen" bleiben es überall.
  const sperr = text.match(SERIEN_SPERRWORTE);
  expect(!sperr, `${label}: Sperrwort im Text: "${sperr?.[0]}".`);
  for (const match of text.matchAll(/ohne Gesundheitsprüfung/gi)) {
    const context = text.slice(Math.max(0, match.index - 220), match.index);
    const sentence = satzUm(text, match.index);
    expect(
      /Kind|Baby|Neugeboren|Geburt/.test(context) && /Elternteil/.test(sentence) && /(?:zwei|2) Monat/.test(sentence),
      `${label}: "ohne Gesundheitsprüfung" nur bei der Kindernachversicherung, mit Elternteil und Zwei-Monats-Frist im selben Satz: ${sentence.slice(0, 90)}`,
    );
  }
  expect(!/(?<!Soziale )\bsicher/i.test(text), `${label}: Wortstamm "sicher" nicht als Versprechen.`);
  expect(!/verdient (?:an einem|am) Kassenwechsel|An einem Kassenwechsel verdient/i.test(text), `${label}: nie schreiben, ob Healio am Kassenwechsel verdient.`);
  expect(!/Zahnärzt\w* (?:erhalten|bekommen) (?:eine )?(?:Vergütung|Prämie)/i.test(text), `${label}: keine Vergütung für Zahnärzte.`);
  expect(!/Versorgungswerk/i.test(text), `${label}: "Versorgungswerk" ist gesperrt.`);
  for (const unit of text.split('\n')) {
    if (/810 EUR/.test(unit)) {
      expect(/bis zu 810 EUR/.test(unit) && /laut Satzung/.test(unit) && /400 bis 700 EUR/.test(unit), `${label}: 810 EUR nur als "laut Satzung bis zu" und mit der breiten Masse 400 bis 700 EUR: ${unit.slice(0, 90)}`);
      expect(/Zusatzbeitrag/.test(unit), `${label}: Der IKK-Tipp braucht die Gegenrechnung mit dem Zusatzbeitrag: ${unit.slice(0, 90)}`);
    }
    if (/ZAHN Sofort/.test(unit) && /EUR/.test(unit) && /750|1\.500/.test(unit)) {
      expect(/750 EUR je Kalenderjahr/.test(unit) && /1\.500 EUR/.test(unit), `${label}: ZAHN Sofort nur wortgleich mit /zahn (750 EUR je Kalenderjahr, insgesamt 1.500 EUR): ${unit.slice(0, 90)}`);
    }
    if (/Zahnstaffel/.test(unit) && /6\.000/.test(unit)) {
      expect(/bis 1\.000 EUR im ersten (?:Kalender)?[Jj]ahr, zusammen bis 3\.000 EUR in den ersten zwei und bis 6\.000 EUR in den ersten drei (?:Kalender)?[Jj]ahren/.test(unit), `${label}: Zahnstaffel 90/100 wortgleich mit /zahn: ${unit.slice(0, 90)}`);
    }
    // Der Satz der UKV bezieht sich auf die ganze erstattungsfähige Rechnung,
    // die Kassenleistung wird abgezogen (Rechner: satz * kosten - kasse).
    // "75 % vom Rest" oder "Kasse kommt dazu" ist die falsche Lesart.
    expect(!/(?:75|90) ?(?:%|Prozent) (?:vom|des) (?:Rest|Eigenanteil)|die Kasse kommt (?:noch )?dazu/i.test(unit), `${label}: UKV-Satz falsch gelesen (Satz gilt für die ganze erstattungsfähige Rechnung, minus Kassenleistung): ${unit.slice(0, 90)}`);
  }
  // Härtefall: Einkommensgrenze 2026 (§ 55 Abs. 2 SGB V, 40 Prozent der
  // Bezugsgröße 3.955 EUR) ist 1.582,00 EUR; 1.498 EUR war der Wert 2025.
  expect(!/1\.498/.test(text) && !/2\.059,75/.test(text) && !/374,50/.test(text), `${label}: veraltete Härtefallgrenze 2025 (1.498 EUR); 2026 gilt 1.582,00 EUR.`);
  expect(countArticleWords(article) >= 900, `${label}: unter 900 Wörtern, zu dünn für den Zielbegriff (gefunden ${countArticleWords(article)}).`);
}

// --- 9b. Rechner-Karte am Ende jedes Gruppen-Ratgebers (seit 08.10.2026) ---

// Auftrag Frank 08.10.2026: Jeder Ratgeber mit Themengruppe endet vor Quellen
// und Autorenkasten mit einer einheitlichen Rechner-Karte. Gesteuert zentral
// über die Gruppe (src/content/ratgeber/rechnerWege.js), nicht je Artikel;
// ein Artikel darf per Feld rechner abweichen oder abschalten. Ziel ist ein
// Angebotspfad des Feldes. Interne Ziele reichen nur die Klick-Kennung weiter
// (withAdClickIds), die Karte misst nichts, auch nicht auf gesperrten Seiten.
const RECHNER_ERWARTET = {
  zaehne: '/zahn#zahn-check',
  ambulant: '/ambulant#tarifwahl',
  brille: '/ambulant#tarifwahl',
  vorsorge: '/ambulant#tarifwahl',
  krankenhaus: '/stationaer#tarife',
  familie: '/stationaer#familie',
};
const rechnerZiel = (rechner) => rechner?.to || rechner?.href || '';
const rechnerKartenTexte = (rechner) => ['eyebrow', 'title', 'text', 'label'].map((field) => rechner?.[field] || '').join('\n');
for (const [id, feld] of Object.entries(RATGEBER_FELDER)) {
  const rechner = RATGEBER_RECHNER_JE_GRUPPE[id];
  expect(Boolean(rechner), `Rechner-Karte: Feld ${id} ohne Eintrag in rechnerWege.js.`);
  if (!rechner) continue;
  expect(Boolean(rechner.title && rechner.text && rechner.label) && Boolean(rechner.to) !== Boolean(rechner.href), `Rechner-Karte ${id}: Titel, Text, Knopf und genau ein Ziel (to oder href).`);
  expect(matchesAngebot(rechnerZiel(rechner), feld.angebotsPfade), `Rechner-Karte ${id}: Ziel ${rechnerZiel(rechner)} ist kein Angebotspfad des Feldes.`);
  if (RECHNER_ERWARTET[id]) expect(rechner.to === RECHNER_ERWARTET[id], `Rechner-Karte ${id}: Ziel muss ${RECHNER_ERWARTET[id]} sein (gefunden ${rechnerZiel(rechner)}).`);
  if (rechner.href) expect(/^https:\/\/kassenboost\.de\//.test(rechner.href), `Rechner-Karte ${id}: externes Ziel nur kassenboost.de.`);
  const texte = rechnerKartenTexte(rechner);
  expect(!SERIEN_SPERRWORTE.test(texte) && !/kostenlos/i.test(texte), `Rechner-Karte ${id}: Sperrwort "${texte.match(SERIEN_SPERRWORTE)?.[0]}".`);
  expect(!/[–—]|\s-\s/.test(texte), `Rechner-Karte ${id}: keine Gedankenstriche.`);
  expect(!/\bSie\b|\bIhre?[nmrs]?\b/.test(texte), `Rechner-Karte ${id}: Du-Form.`);
  expect(!UMLAUT_ERSATZ.test(texte), `Rechner-Karte ${id}: echte Umlaute.`);
  expect(!/(?<!Soziale )\bsicher/i.test(texte), `Rechner-Karte ${id}: Wortstamm "sicher" nicht als Versprechen.`);
  expect(rechner.label.length <= 28, `Rechner-Karte ${id}: Knopftext höchstens 28 Zeichen.`);
}
expect(RATGEBER_RECHNER_JE_GRUPPE['kasse-bonus']?.href?.startsWith('https://kassenboost.de/'), 'Rechner-Karte kasse-bonus: KassenBoost-Vergleich (auf /kassenbonus gibt es keinen eigenen Bonus-Rechner).');

// Jeder Gruppenartikel bekommt die Karte, außer er schaltet sie ab oder hat
// schon einen internen Schluss-Button. Abweichungen zeigen auf den
// Angebotsweg des Feldes.
const { RATGEBER_GROUP_OF } = await import('../src/content/ratgeber/registry.loaders.js');
for (const group of RATGEBER_GROUPS) {
  const feld = RATGEBER_FELDER[group.id];
  for (const slug of group.slugs) {
    const article = getRatgeberArticle(slug);
    expect(RATGEBER_GROUP_OF?.get(slug) === group.id, `Rechner-Karte: registry.loaders.js nennt für ${slug} nicht die Gruppe ${group.id}.`);
    if (!article) continue;
    const rechner = resolveRatgeberRechner(article, group.id);
    if (article.rechner === false || article.internalCta) {
      expect(!rechner, `Rechner-Karte ${slug}: abgeschaltet oder interner Button, also keine Karte.`);
      continue;
    }
    expect(Boolean(rechner), `Rechner-Karte fehlt in ${slug} (Gruppe ${group.id}).`);
    if (rechner && feld) expect(matchesAngebot(rechnerZiel(rechner), feld.angebotsPfade), `Rechner-Karte ${slug}: Ziel ${rechnerZiel(rechner)} ist kein Angebotspfad des Feldes ${group.id}.`);
    if (rechner && article.rechner) {
      const texte = rechnerKartenTexte(rechner);
      expect(!SERIEN_SPERRWORTE.test(texte) && !/[–—]/.test(texte) && !/\bSie\b|\bIhre?[nmrs]?\b/.test(texte), `Rechner-Karte ${slug}: abweichender Text verletzt die Schreibregeln.`);
    }
  }
}
for (const article of ratgeberArticles) {
  if (RATGEBER_GROUP_OF?.has(article.slug)) continue;
  expect(!resolveRatgeberRechner(article, null), `Rechner-Karte: ${article.slug} hat keine Gruppe und bekommt keine Karte.`);
}

// Vorlage: Karte nach dem Artikeltext, vor Quellen und Autor; kein Messcode.
const bausteine = read('src/components/ratgeber/RatgeberBausteine.jsx');
const rechnerKarteQuelle = bausteine.slice(bausteine.indexOf('export const RechnerKarte'), bausteine.indexOf('export const FaqAccordion'));
expect(rechnerKarteQuelle.length > 200, 'RatgeberBausteine.jsx: RechnerKarte fehlt.');
expect(/withAdClickIds\(rechner\.to, search\)/.test(rechnerKarteQuelle), 'RechnerKarte: interne Ziele reichen die Klick-Kennung über withAdClickIds weiter.');
expect(/min-h-\[3\.25rem\]/.test(rechnerKarteQuelle), 'RechnerKarte: Tippfläche des Knopfs mindestens 44 px (min-h-[3.25rem]).');
expect(/data-ratgeber-rechner=/.test(rechnerKarteQuelle), 'RechnerKarte: Markierung data-ratgeber-rechner fehlt.');
expect(!/fetch\(|sendBeacon|dataLayer|gtag|fbq|track[A-Z]\w*\(|onClick|localStorage|sessionStorage/.test(rechnerKarteQuelle), 'RechnerKarte: Die Karte darf nichts messen oder speichern.');
expect(!/@\/lib\/(?:analytics|google-ads|meta-pixel|consent)/.test(bausteine), 'RatgeberBausteine.jsx: keine Mess-Module.');
const rechnerPos = layout.indexOf('<RechnerKarte');
expect(rechnerPos > layout.indexOf('article.faqs?.length > 0') && rechnerPos < layout.indexOf('<SourcesBlock') && rechnerPos < layout.indexOf('<AuthorBox'), 'Vorlage: Rechner-Karte steht am Ende, vor Quellen und Autorenkasten.');
expect(/resolveRatgeberRechner\(article, groupId\)/.test(layout), 'Vorlage: Rechner-Karte über die Gruppe auflösen (resolveRatgeberRechner).');
const artikelSeite = read('src/pages/RatgeberArtikelPage.jsx');
expect(/RATGEBER_GROUP_OF\.get\(slug\)/.test(artikelSeite) && /groupId=\{groupId\}/.test(artikelSeite), 'Artikelseite: Gruppe aus registry.loaders.js an die Vorlage geben.');

// Gebaut: Karte mit Ziel vor dem Quellenblock.
for (const group of RATGEBER_GROUPS) {
  for (const slug of group.slugs) {
    const builtArticle = path.join(root, 'dist', 'ratgeber', slug, 'index.html');
    const article = getRatgeberArticle(slug);
    const rechner = article && resolveRatgeberRechner(article, group.id);
    if (!rechner || !fs.existsSync(builtArticle)) continue;
    const html = fs.readFileSync(builtArticle, 'utf8');
    const kartePos = html.indexOf('data-ratgeber-rechner=');
    expect(kartePos > -1, `Gebaut ${slug}: Rechner-Karte fehlt.`);
    expect(html.includes(`href="${(rechner.to || rechner.href).replace(/&/g, '&amp;')}"`), `Gebaut ${slug}: Rechner-Karte zeigt nicht auf ${rechner.to || rechner.href}.`);
    const quellenPos = html.indexOf('data-ratgeber-sources');
    expect(quellenPos === -1 || kartePos < quellenPos, `Gebaut ${slug}: Rechner-Karte steht nicht vor den Quellen.`);
  }
}

// Übersicht: Gruppe Zähne mit allen Zahn-Ratgebern und dem fehlenden Zahn.
const zahnGroup = RATGEBER_GROUPS.find((group) => group.id === 'zaehne');
expect(Boolean(zahnGroup) && zahnGroup.title === 'Zähne', 'Die Übersicht /ratgeber braucht die Gruppe "Zähne".');
for (const slug of [...ZAHN_WELLE1, 'zahnzusatzversicherung-fehlender-zahn']) {
  expect(zahnGroup?.slugs.includes(slug), `Gruppe Zähne ohne ${slug}.`);
}
expect(/RATGEBER_OVERVIEW\.groups/.test(overview) && /ratgeber-\$\{group\.id\}/.test(overview), 'Die Übersicht rendert die Themengruppen mit eigener Sprungmarke.');

// Weiterlesen-Block auf /zahn: Slugs im Register, Titel gleich listTitle.
// Pflicht für die Zahn-Welle 1; weitere Serienseiten nur, wenn Frank sie dort
// haben will (der Block bleibt kuratiert und klein).
const zahnPage = read('src/pages/ZahnPage.jsx');
expect(/ZAHN_WEITERLESEN/.test(zahnPage) && /data-zahn-weiterlesen/.test(zahnPage), '/zahn braucht den Weiterlesen-Block.');
for (const entry of ZAHN_WEITERLESEN) {
  const target = getRatgeberArticle(entry.slug);
  expect(Boolean(target), `/zahn Weiterlesen zeigt ins Leere: ${entry.slug}`);
  expect(!target || target.listTitle === entry.title, `/zahn Weiterlesen: Titel weicht von listTitle ab: ${entry.slug}`);
}
for (const slug of ZAHN_WELLE1) {
  expect(ZAHN_WEITERLESEN.some((entry) => entry.slug === slug), `/zahn Weiterlesen ohne ${slug}.`);
}

// llms.txt nennt jede Serienseite.
const llms = read('public/llms.txt');
for (const slug of SERIEN_ALL) {
  expect(llms.includes(`https://healio.de/ratgeber/${slug})`), `public/llms.txt ohne ${slug}.`);
}

// Gebaute Serienseiten: Person, Bausteine, keine Nita-Blase.
for (const slug of SERIEN_SLUGS) {
  const builtArticle = path.join(root, 'dist', 'ratgeber', slug, 'index.html');
  if (!fs.existsSync(builtArticle)) continue;
  const html = fs.readFileSync(builtArticle, 'utf8');
  const article = getRatgeberArticle(slug);
  const hasCostCard = (article?.sections || []).some((section) => section.blocks.some((block) => block.type === 'costCard'));
  expect(/"author":\{"@type":"Person","@id":"https:\/\/healio\.de\/#frank_steinfurt","name":"Frank Steinfurt"/.test(html), `Gebaut ${slug}: Autor als Person in den strukturierten Daten fehlt.`);
  expect(html.includes('"@type":"FAQPage"') && html.includes('"@type":"Article"'), `Gebaut ${slug}: Article- oder FAQ-Schema fehlt.`);
  for (const marker of ['data-ratgeber-quick', 'data-ratgeber-sources', 'data-ratgeber-author="frank-steinfurt"', 'data-ratgeber-honest', 'Quellen und Stand', ...(hasCostCard ? ['data-ratgeber-costcard'] : [])]) {
    expect(html.includes(marker), `Gebaut ${slug}: ${marker} fehlt im HTML.`);
  }
  expect(!html.includes('data-ratgeber-cta=') && !html.includes('data-ratgeber-internal-cta='), `Gebaut ${slug}: kein Werbe- oder interner Button.`);
  expect(!html.includes('data-healio-nita=') && !html.includes('healio-nita-quiet-launcher'), `Gebaut ${slug}: keine Nita-Blase.`);
  expect(!/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html), `Gebaut ${slug}: darf nicht auf noindex stehen.`);
}

// --- 10. Register, Übersicht und Ladeweg (seit 07.10.2026) ---

// Hunderte Ratgeber dürfen weder die Übersicht noch eine Artikelseite
// schwerer machen. Deshalb lädt die Website Artikeltext nur über
// registry.loaders.js (je Slug ein eigener Chunk) und die Übersicht nur
// registry.overview.js. Beide und registry.js sind aus den Inhaltsdateien und
// gliederung.js erzeugt (scripts/build-ratgeber-registry.mjs) und müssen zu
// ihnen passen. Ablauf für neue Artikel: Kopfkommentar in gliederung.js.

for (const error of await validateRatgeberSources()) expect(false, `Register: ${error}`);

const staleRegistryFiles = staleRatgeberRegistryFiles();
expect(
  staleRegistryFiles.length === 0,
  `Erzeugte Ratgeber-Dateien passen nicht zu Inhaltsdateien und Gliederung: ${staleRegistryFiles.join(', ')}. npm run ratgeber:register ausführen.`,
);

const articleFiles = await findArticleFiles();
expect(
  articleFiles.length === ratgeberArticles.length,
  `Inhaltsdateien (${articleFiles.length}) und Register (${ratgeberArticles.length}) zählen verschieden viele Artikel.`,
);

const { RATGEBER_ENTRIES } = await import('../src/content/ratgeber/registry.js');
const { RATGEBER_OVERVIEW } = await import('../src/content/ratgeber/registry.overview.js');
const { RATGEBER_LOADERS } = await import('../src/content/ratgeber/registry.loaders.js');

expect(
  JSON.stringify(RATGEBER_ENTRIES.map((entry) => entry.slug)) === JSON.stringify(ratgeberArticles.map((article) => article.slug)),
  'registry.js nennt andere Artikel oder eine andere Reihenfolge als gliederung.js.',
);
for (const article of ratgeberArticles) {
  const entry = RATGEBER_ENTRIES.find((candidate) => candidate.slug === article.slug);
  expect(JSON.stringify(entry) === JSON.stringify(registryEntryFor(article)), `registry.js weicht von der Inhaltsdatei ab: ${article.slug}`);
}

// Schlank heißt: kein Artikeltext im Register und in der Übersicht.
const ARTICLE_BODY_FIELDS = ['headline', 'lead', 'sections', 'faqs', 'factNugget', 'quickAnswer', 'sources', 'onward', 'internalCta'];
const overviewCards = [...RATGEBER_OVERVIEW.single, ...RATGEBER_OVERVIEW.groups.flatMap((group) => group.entries)];
for (const entry of [...RATGEBER_ENTRIES, ...overviewCards]) {
  expect(ARTICLE_BODY_FIELDS.every((field) => !(field in entry)), `Artikeltext im Register oder in der Übersicht: ${entry.slug}`);
}

// Übersicht: alle Einzelartikel, je Gruppe die Bereichsseite zuerst und
// höchstens RATGEBER_OVERVIEW_PER_GROUP weitere Artikel.
expect(JSON.stringify(RATGEBER_OVERVIEW) === JSON.stringify(buildOverviewData()), 'registry.overview.js passt nicht zur Gliederung.');
expect(
  JSON.stringify(RATGEBER_OVERVIEW.single.map((entry) => entry.slug)) === JSON.stringify(RATGEBER_EINZELARTIKEL),
  'Die Übersicht zeigt nicht alle Einzelartikel in der Reihenfolge der Gliederung.',
);
for (const group of RATGEBER_OVERVIEW.groups) {
  const source = RATGEBER_GROUPS.find((candidate) => candidate.id === group.id);
  expect(group.entries[0]?.slug === source?.hubSlug, `Gruppe ${group.id}: Die Bereichsseite steht in der Übersicht nicht zuerst.`);
  expect(group.entries.length <= RATGEBER_OVERVIEW_PER_GROUP + 1, `Gruppe ${group.id}: mehr Karten als Bereichsseite plus ${RATGEBER_OVERVIEW_PER_GROUP}.`);
  expect(group.total === source?.slugs.length, `Gruppe ${group.id}: total stimmt nicht.`);
}
expect(
  /group\.total > group\.entries\.length/.test(overview)
    && /getRatgeberPath\(group\.hubSlug\)/.test(overview)
    && /data-ratgeber-group-all=\{group\.id\}/.test(overview)
    && />\s*Alle anzeigen\s*</.test(overview),
  'Die Übersicht braucht je Gruppe den Link „Alle anzeigen“ zur Bereichsseite, sobald die Gruppe mehr Artikel hat als Karten.',
);

// Ladeweg: je Slug genau ein dynamischer Import, der den richtigen Artikel liefert.
expect(
  JSON.stringify([...RATGEBER_LOADERS.keys()]) === JSON.stringify(ratgeberArticles.map((article) => article.slug)),
  'registry.loaders.js nennt andere Artikel als gliederung.js.',
);
for (const [slug, load] of RATGEBER_LOADERS) {
  const { article } = await load();
  expect(article?.slug === slug, `registry.loaders.js lädt für ${slug} nicht den passenden Artikel.`);
}
const loadersSource = read('src/content/ratgeber/registry.loaders.js');
expect(!/^\s*import\s/m.test(loadersSource) && !/^\s*export\s.*\sfrom\s/m.test(loadersSource), 'registry.loaders.js darf Artikel nur dynamisch laden (import()), nie statisch.');

// Kein Website-Modul lädt Artikeltext oder Artikellisten statisch. Erlaubt
// sind registry.loaders.js (dynamisch) und Node-Skripte unter scripts/.
const articleSlugPattern = articleFiles.map(({ slug }) => slug.replace(/[-]/g, '\\-')).join('|');
const staticArticleImport = new RegExp(`(?:from\\s*|import\\s*)['"](?:@/content/ratgeber/|\\./|(?:\\.\\./)+content/ratgeber/)(?:${articleSlugPattern})(?:\\.js)?['"]`);
const srcFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) return srcFiles(full);
  return /\.(?:js|jsx)$/.test(entry.name) ? [full] : [];
});
for (const file of srcFiles(path.join(root, 'src'))) {
  const relative = path.relative(root, file);
  const source = fs.readFileSync(file, 'utf8');
  expect(!/scripts\/lib\/ratgeber-/.test(source), `${relative}: Website-Code darf die Node-Ladehilfe nicht importieren.`);
  if (relative === path.join('src', 'content', 'ratgeber', 'registry.loaders.js')) continue;
  expect(!staticArticleImport.test(source), `${relative}: Artikeltext darf nur über registry.loaders.js geladen werden.`);
}
const articlePage = read('src/pages/RatgeberArtikelPage.jsx');
expect(/from '@\/content\/ratgeber\/registry\.loaders'/.test(articlePage), 'Die Artikelseite lädt ihren Artikel über registry.loaders.js.');
expect(/<Suspense\b/.test(articlePage) && /React\.lazy\(/.test(articlePage), 'Die Artikelseite lädt den Artikel-Chunk über React.lazy mit eigenem Suspense.');
for (const [label, source] of [['Übersicht', overview], ['Artikelseite', articlePage], ['Vorlage', layout], ['/zahn', read('src/pages/ZahnPage.jsx')]]) {
  expect(
    !/@\/content\/ratgeber\/(?:registry|gliederung)['"]|@\/content\/ratgeber['"]/.test(source),
    `${label}: keine vollständige Artikelliste importieren (registry.js, gliederung.js), sie wächst mit jedem Artikel.`,
  );
}
expect(!/registry\.loaders/.test(overview), 'Die Übersicht lädt keine Artikel-Chunks.');
expect(fs.existsSync(RATGEBER_DIR) && !fs.existsSync(path.join(RATGEBER_DIR, 'index.js')), 'src/content/ratgeber/index.js gibt es nicht mehr; Einstieg ist gliederung.js.');

if (failures.length > 0) {
  console.error(`Ratgeber-Vertrag verletzt (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Serien-Ratgeber: ${SERIEN_SLUGS.length} Seiten in ${new Set(SERIEN_SLUGS.map((slug) => groupOf(slug)?.id)).size} Feld(ern) mit Autor, Kurzantwort, Quellen, Kostenkarte, Angebotsweg je Feld und Rechner-Datenschutz geprüft.`,
);
console.log(
  `Register: ${ratgeberArticles.length} Artikel, erzeugte Dateien aktuell, Übersicht mit ${RATGEBER_OVERVIEW.single.length} Einzelartikeln und ${RATGEBER_OVERVIEW.groups.length} Gruppe(n), Artikeltext nur über registry.loaders.js.`,
);
console.log(
  `Ratgeber-Vertrag erfüllt: ${ratgeberArticles.length} Artikel (${RATGEBER_SLUGS.length} indexiert), 3 Buttons auf ${ADVERTORIAL_PATH}, ${Object.keys(INTERNAL_BUTTONS).length} Artikel mit je einem internen Button (IKK-Landingpage und Schwangerschaft auf /ambulant, fehlender Zahn auf /zahn#zahn-check), 1.155 EUR nur mit Schwangerschaftsbezug, Schwangerschafts-Hinweis im Vorsorge-Baustein, Fact Nugget unter neuer Überschrift, FAQ-Schema, Pflichtlinks und Schreibregeln geprüft.`,
);
