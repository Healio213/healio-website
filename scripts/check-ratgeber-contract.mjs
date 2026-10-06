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
import { ratgeberArticles, getRatgeberArticle } from '../src/content/ratgeber/index.js';
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

// Die organischen Ratgeberartikel (seit 05.10.2026 auch mkk, AOK, TK und
// BARMER, alle ohne internen Button). Sie muessen vorhanden, indexierbar
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

// --- 2b. Die vier organischen Ratgeberartikel -----------------------------

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
  expect(article.updatedAt === '2026-10-05' && article.updatedAtLabel === '5. Oktober 2026', `${slug} traegt Stand 2026-10-05 / 5. Oktober 2026.`);
  expect(
    new RegExp(`<loc>https://healio\\.de/ratgeber/${slug}</loc>\\s*<lastmod>2026-10-05</lastmod>`).test(sitemap),
    `Die Sitemap nennt fuer ${slug} lastmod 2026-10-05.`,
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
expect(
  /\{isAdvertorial && \(\s*<div className="mt-14">/.test(layout),
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

const renderBlocks = (blocks, parts) => {
  for (const block of blocks) {
    if (block.type === 'list') {
      for (const item of block.items) {
        if (typeof item === 'string') parts.push(item);
        else parts.push(item.lead, item.text);
      }
    } else if (block.type === 'table') {
      parts.push(block.caption, block.note, ...block.head);
      for (const row of block.rows) parts.push(...row);
    } else if (block.type === 'segments') {
      for (const segment of block.segments) parts.push(segment.text);
    } else {
      parts.push(block.text);
    }
  }
};

// Alles, was wirklich auf der Seite landet, einschliesslich Tabellen,
// Fact Nugget, FAQ, internem Button und dem Weg am Ende.
const renderArticleText = (article) => {
  const parts = [article.headline, article.lead, article.ctaLabel, article.footnote, article.listTitle, article.listTeaser, article.metaTitle, article.metaDescription, article.factNugget];
  for (const section of article.sections) {
    parts.push(section.heading);
    renderBlocks(section.blocks, parts);
  }
  for (const faq of article.faqs || []) parts.push(faq.question, faq.answer);
  if (article.internalCta) {
    parts.push(article.internalCta.heading, article.internalCta.label);
    renderBlocks(article.internalCta.blocks, parts);
  }
  if (article.onward) {
    parts.push(article.onward.heading);
    for (const segment of article.onward.segments) parts.push(segment.text);
  }
  return parts.filter(Boolean).join('\n');
};

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
      } else {
        units.push(block.text);
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
    !/kostenlos|kostenfrei|gratis|umsonst|garantiert|unbegrenzt|ohne Obergrenze|Maximalbetrag|absicher|(?<![\d.,])0 EUR|(?:keine|ohne) Gesundheits(?:fragen|prüfung)/i.test(text),
    `${WAS_STEHT_SLUG}: Sperrwort (kostenlos, gratis, 0 EUR, garantiert, unbegrenzt, absichern, keine/ohne Gesundheitsfragen).`,
  );
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

if (failures.length > 0) {
  console.error(`Ratgeber-Vertrag verletzt (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Ratgeber-Vertrag erfüllt: ${ratgeberArticles.length} Artikel (${RATGEBER_SLUGS.length} indexiert), 3 Buttons auf ${ADVERTORIAL_PATH}, ${Object.keys(INTERNAL_BUTTONS).length} Artikel mit je einem internen Button (IKK-Landingpage und Schwangerschaft auf /ambulant, fehlender Zahn auf /zahn#zahn-check), 1.155 EUR nur mit Schwangerschaftsbezug, Schwangerschafts-Hinweis im Vorsorge-Baustein, Fact Nugget unter neuer Überschrift, FAQ-Schema, Pflichtlinks und Schreibregeln geprüft.`,
);
