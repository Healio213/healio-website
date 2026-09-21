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

// Die vier organischen Ratgeberartikel. Sie muessen vorhanden, indexierbar
// und in der Sitemap sein. ikk-classic-bonusprogramm-2026 ist zugleich die
// Landingpage der Google-Anzeigengruppe G1-A und traegt als einziger einen
// internen Button auf /ambulant.
const RATGEBER_SLUGS = [
  'ikk-classic-bonusprogramm-2026',
  'zahnzusatzversicherung-fehlender-zahn',
  'schwanger-zusatzversicherung',
  'schwangerschaft-worauf-achten',
];
const IKK_LANDING_SLUG = 'ikk-classic-bonusprogramm-2026';

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
expect(/createFAQSchema\(article\.faqs\)/.test(layout), 'Die FAQ muessen als FAQPage ausgezeichnet werden.');
expect(/createArticleSchema\(/.test(layout), 'Ratgeberartikel brauchen eine Article-Auszeichnung.');
expect(
  /robots=\{isAdvertorial \? 'noindex, nofollow' : 'index, follow'\}/.test(layout),
  'Nur Advertorials duerfen auf noindex stehen.',
);

// --- 2c. Die IKK-Bonus-Landingpage ----------------------------------------

const ikkLanding = getRatgeberArticle(IKK_LANDING_SLUG);
expect(Boolean(ikkLanding), 'Die IKK-Bonus-Landingpage fehlt im Inhaltsregister.');
if (ikkLanding) {
  expect(ikkLanding.internalCta?.to === '/ambulant', 'Der Button der IKK-Landingpage muss auf /ambulant zeigen.');
  expect(
    ikkLanding.internalCta?.label === 'Bonus und Beitrag prüfen',
    'Der Button der IKK-Landingpage heisst "Bonus und Beitrag pruefen".',
  );
  expect(
    ikkLanding.internalCta?.heading === 'Bonus in Zusatzschutz umwandeln',
    'Der Abschnitt der IKK-Landingpage heisst "Bonus in Zusatzschutz umwandeln".',
  );
}

// Kein zweiter Artikel darf sich einen internen Button anhaengen, ohne dass
// er hier bewusst eingetragen wird.
for (const article of ratgeberArticles) {
  if (article.slug === IKK_LANDING_SLUG) continue;
  expect(!article.internalCta, `Unerwarteter interner Button: ${article.slug}`);
}

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

  if (slug === IKK_LANDING_SLUG) {
    expect(html.includes('data-ratgeber-internal-cta='), 'Der interne Button fehlt im gebauten HTML der IKK-Landingpage.');
    expect((html.match(/data-ratgeber-internal-cta=/g) || []).length === 1, 'Die IKK-Landingpage traegt genau einen Button.');
    expect(html.includes('href="/ambulant?'), 'Der Button der IKK-Landingpage muss mit UTM auf /ambulant zeigen.');
  }
}

if (failures.length > 0) {
  console.error(`Ratgeber-Vertrag verletzt (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Ratgeber-Vertrag erfüllt: ${ratgeberArticles.length} Artikel (${RATGEBER_SLUGS.length} indexiert), 3 Buttons auf ${ADVERTORIAL_PATH}, 1 interner Button auf /ratgeber/${IKK_LANDING_SLUG}, Fact Nugget, FAQ-Schema, Pflichtlinks und Schreibregeln geprüft.`,
);
