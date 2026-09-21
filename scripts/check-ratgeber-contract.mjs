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
  RATGEBER_UTM_DEFAULTS,
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

const app = read('src/App.jsx');
const layout = read('src/components/ratgeber/RatgeberArticleLayout.jsx');
const overview = read('src/pages/RatgeberPage.jsx');
const sitemap = read('public/sitemap.xml');
const routeByPath = new Map(seoRoutes.map((route) => [route.path, route]));

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
  }
}

expect(Boolean(getRatgeberArticle(ADVERTORIAL_SLUG)), 'Advertorial 1 fehlt im Inhaltsregister.');

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
expect(/trackMetaLead\(\)/.test(layout), 'Jeder Button-Klick muss ein Lead-Ereignis ausloesen.');

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

const renderArticleText = (article) => {
  const parts = [article.headline, article.lead, article.ctaLabel, article.footnote, article.listTitle, article.listTeaser, article.metaTitle, article.metaDescription];
  for (const section of article.sections) {
    parts.push(section.heading);
    for (const block of section.blocks) {
      if (block.type === 'list') parts.push(...block.items);
      else parts.push(block.text);
    }
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
  expect(!/(?:ae|oe|ue|ss)\b/.test(article.headline), `Umlaut-Ersatzschreibung in der Headline: ${article.slug}`);
  expect(['advertorial', 'ratgeber'].includes(article.kind), `Unbekannte Artikelart: ${article.slug}`);
  expect(
    article.sections.some((section) => section.id === article.ctaAfterSectionId),
    `ctaAfterSectionId zeigt auf keinen Abschnitt: ${article.slug}`,
  );
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

if (failures.length > 0) {
  console.error(`Ratgeber-Vertrag verletzt (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Ratgeber-Vertrag erfüllt: ${ratgeberArticles.length} Artikel, 3 Buttons auf ${ADVERTORIAL_PATH}, Pflichtlinks und Schreibregeln geprüft.`,
);
