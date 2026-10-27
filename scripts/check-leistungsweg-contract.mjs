/**
 * Vertrag Leistungsweg (Auftrag Frank, 27.10.2026): Jeder Ratgeber und jeder
 * veröffentlichte Blogartikel führt zur passenden Leistungsseite, mindestens
 * zur Bausteinübersicht /leistungen, mit einem Hinweis im Textverlauf und
 * einem Abschluss.
 *
 * Geprüft wird
 *   1. die Zuordnung je Ratgeber und Blogartikel (src/content/leistungsweg.js),
 *      jedes Ziel ist eine Route, unbekannte Slugs fallen auf /leistungen,
 *   2. der Zwischendurch-Hinweis: neu eingefügt oder schon gleichwertig im
 *      Text vorhanden, nie neben einem großen Klickbaustein,
 *   3. der Abschluss: eigener Block oder ein gleichwertiger Abschluss auf
 *      dieselbe Seite, dann mit Textlink „Alle Bausteine ansehen“,
 *   4. die Texte (Du-Form, Umlaute, keine Gedankenstriche, Sperrwörter,
 *      Nutzen vor Kassenbonus, Gesundheitsfragen ja, keine Ablehnung),
 *   5. die Verdrahtung in Vorlage, Blogseite und statischem Blog-HTML, ohne
 *      Messcode,
 *   6. falls gebaut: das ausgelieferte HTML jedes Ratgebers und Blogartikels.
 *
 * Aufruf: npm run test:leistungsweg (läuft auch am Ende von npm run build).
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';
import { ratgeberArticles } from './lib/ratgeber-articles.mjs';
import { RATGEBER_GROUPS } from '../src/content/ratgeber/gliederung.js';
import { RATGEBER_GROUP_OF } from '../src/content/ratgeber/registry.loaders.js';
import { resolveRatgeberRechner } from '../src/content/ratgeber/rechnerWege.js';
import { getBlogArticleCta } from '../src/lib/blogArticleCta.js';
import { collectBlockText } from '../src/content/ratgeber/articleText.js';
import {
  BLOG_ZIEL_JE_SLUG,
  LEISTUNGEN_PFAD,
  LEISTUNGSZIELE,
  MIN_ABSTAND_ANTEIL,
  MIN_ABSTAND_WOERTER,
  MITTE_BEREICH,
  RATGEBER_ZIEL_JE_GRUPPE,
  RATGEBER_ZIEL_JE_SLUG,
  ZWEITER_HINWEIS_AB_WOERTERN,
  basisPfad,
  getLeistungsziel,
  gleichwertigePositionen,
  planBlogLeistungsweg,
  planRatgeberLeistungsweg,
  resolveBlogLeistungsziel,
  resolveRatgeberLeistungsziel,
  teileBlogHtml,
} from '../src/content/leistungsweg.js';
import { LEISTUNGSWEG_KLASSEN, leistungsHinweisEndeHtml, leistungsHinweisMitteHtml } from '../src/lib/leistungswegMarkup.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const zaehleWoerter = (parts) => parts
  .filter((part) => typeof part === 'string')
  .join(' ')
  .split(/\s+/)
  .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const routes = new Set(seoRoutes.map((route) => route.path));
// Leistungsseiten im Sinn des Auftrags: Bausteine, Übersicht, eigene
// Produktseiten (Schwangerschaft, Altersvorsorge) und Firmenkunden.
const LEISTUNGSSEITEN = new Set(['/ambulant', '/zahn', '/stationaer', '/schwangerschaft', '/tierkrankenversicherung', LEISTUNGEN_PFAD, '/altersvorsorgedepot', '/unternehmen']);
const OHNE_UEBERSICHTSLINK = new Set(['leistungen', 'altersvorsorge', 'unternehmen']);

/* --- 1. Ziele und Zuordnung ---------------------------------------------- */

for (const [id, ziel] of Object.entries(LEISTUNGSZIELE)) {
  expect(LEISTUNGSSEITEN.has(ziel.to), `Ziel ${id}: ${ziel.to} ist keine Leistungsseite.`);
  expect(routes.has(ziel.to), `Ziel ${id}: ${ziel.to} ist keine Route in scripts/seo-routes.mjs.`);
  expect(ziel.alleBausteine === !OHNE_UEBERSICHTSLINK.has(id), `Ziel ${id}: Textlink auf die Übersicht ${OHNE_UEBERSICHTSLINK.has(id) ? 'nicht ' : ''}vorgesehen.`);
  if (ziel.eigenerWeg) continue;
  for (const variante of [null, ...Object.keys(ziel.varianten || {})]) {
    const aufgeloest = getLeistungsziel(id, variante);
    expect(Boolean(aufgeloest.mitte?.frage && aufgeloest.mitte?.text && aufgeloest.mitte?.label), `Ziel ${id}${variante ? `/${variante}` : ''}: Zwischendurch-Hinweis unvollständig.`);
    expect(Boolean(aufgeloest.ende?.titel && aufgeloest.ende?.text && aufgeloest.ende?.label), `Ziel ${id}${variante ? `/${variante}` : ''}: Abschluss unvollständig.`);
  }
}
for (const eintrag of [...Object.values(RATGEBER_ZIEL_JE_GRUPPE), ...Object.values(RATGEBER_ZIEL_JE_SLUG), ...Object.values(BLOG_ZIEL_JE_SLUG)]) {
  expect(Boolean(LEISTUNGSZIELE[eintrag.ziel]), `Zuordnung auf unbekanntes Ziel ${eintrag.ziel}.`);
  if (eintrag.variante) expect(Boolean(LEISTUNGSZIELE[eintrag.ziel]?.varianten?.[eintrag.variante]), `Unbekannte Variante ${eintrag.ziel}/${eintrag.variante}.`);
}
for (const group of RATGEBER_GROUPS) {
  expect(Boolean(RATGEBER_ZIEL_JE_GRUPPE[group.id]), `Gruppe ${group.id} ohne Leistungsziel in RATGEBER_ZIEL_JE_GRUPPE.`);
}
const ratgeberSlugs = new Set(ratgeberArticles.map((article) => article.slug));
for (const slug of Object.keys(RATGEBER_ZIEL_JE_SLUG)) {
  expect(ratgeberSlugs.has(slug), `RATGEBER_ZIEL_JE_SLUG nennt einen unbekannten Ratgeber: ${slug}`);
}

// Festgeschriebene Zuordnung (Bestandsbericht 27.10.2026). Wer hier ändert,
// ändert bewusst, wohin eine ganze Gruppe führt.
const GRUPPE_ERWARTET = {
  zaehne: 'zahn',
  ambulant: 'ambulant',
  brille: 'ambulant',
  vorsorge: 'ambulant',
  krankenhaus: 'stationaer',
  familie: 'stationaer',
  'kasse-bonus': 'ambulant',
  altersvorsorge: 'altersvorsorge',
};
for (const [gruppe, ziel] of Object.entries(GRUPPE_ERWARTET)) {
  expect(RATGEBER_ZIEL_JE_GRUPPE[gruppe]?.ziel === ziel, `Gruppe ${gruppe} muss zu ${ziel} führen.`);
}
const SLUG_ERWARTET = {
  'krankenkasse-wechseln': 'leistungen',
  'zusatzbeitrag-krankenkasse-2026': 'leistungen',
  'krankenzusatzversicherung-vergleichen': 'leistungen',
  'familienversicherung-krankenkasse': 'leistungen',
  'krankenkassen-bonus-zusatzversicherung': 'leistungen',
  'schwangerschaft-worauf-achten': 'schwangerschaft',
  'schwanger-zusatzversicherung': 'schwangerschaft',
  'hebamme-kosten-krankenkasse': 'schwangerschaft',
  'baby-geplant-zusatzversicherung': 'stationaer',
  'praeventionskurs-krankenkasse': 'ambulant',
  'zuzahlung-medikamente': 'ambulant',
};
for (const [slug, ziel] of Object.entries(SLUG_ERWARTET)) {
  expect(resolveRatgeberLeistungsziel(slug, RATGEBER_GROUP_OF.get(slug) || null).ziel === ziel, `Ratgeber ${slug} muss zu ${ziel} führen.`);
}
// Zuzahlungs-Ratgeber zeigen auf den Zuzahlungs-Topf, nicht auf Heilpraktiker oder Brille.
for (const slug of [...ratgeberSlugs].filter((entry) => /zuzahlung/.test(entry) && entry !== 'reha-zuzahlung')) {
  expect(resolveRatgeberLeistungsziel(slug, RATGEBER_GROUP_OF.get(slug) || null).variante === 'zuzahlung', `Ratgeber ${slug}: Hinweis auf den Zuzahlungs-Topf (Variante zuzahlung).`);
}
const BLOG_ERWARTET = {
  'zahnersatz-beitrag-vom-bonus': 'zahn',
  'krankenhauszusatzversicherung-sportverein-best-ager': 'stationaer',
  'kassenbonus-schwangerschaft-vorsorge': 'schwangerschaft',
  'healio-konzept-fuer-heilpraktiker': 'ambulant',
  'healio-konzept-fuer-hebammen': 'schwangerschaft',
  'bkv-und-kassenbonus-fuer-arbeitgeber': 'unternehmen',
};
for (const [slug, ziel] of Object.entries(BLOG_ERWARTET)) {
  expect(resolveBlogLeistungsziel(slug).ziel === ziel, `Blog ${slug} muss zu ${ziel} führen.`);
}

// Rückfall für künftige Artikel.
expect(resolveRatgeberLeistungsziel('neuer-ratgeber-ohne-gruppe', null).ziel === 'leistungen', 'Rückfall Ratgeber ohne Gruppe muss /leistungen sein.');
expect(resolveRatgeberLeistungsziel('toString', 'toString').ziel === 'leistungen', 'Rückfall darf nicht über Objekt-Eigenschaften stolpern.');
expect(resolveRatgeberLeistungsziel('neuer-zahn-ratgeber', 'zaehne').ziel === 'zahn', 'Neuer Ratgeber in einer Gruppe bekommt das Ziel der Gruppe.');
expect(resolveBlogLeistungsziel('neuer-blogartikel', 'endkunden').ziel === 'leistungen', 'Rückfall Blog muss /leistungen sein.');
expect(resolveBlogLeistungsziel('constructor', 'unbekannt').ziel === 'leistungen', 'Rückfall Blog darf nicht über Objekt-Eigenschaften stolpern.');

/* --- 2. und 3. Jeder Ratgeber -------------------------------------------- */

const zaehler = {};
const ratgeberPlaene = new Map();
for (const article of ratgeberArticles) {
  const groupId = RATGEBER_GROUP_OF.get(article.slug) || null;
  const plan = planRatgeberLeistungsweg(article, groupId);
  ratgeberPlaene.set(article.slug, plan);
  const label = `Ratgeber ${article.slug}`;
  zaehler[plan.ziel.id] = (zaehler[plan.ziel.id] || 0) + 1;
  expect(LEISTUNGSSEITEN.has(plan.ziel.to), `${label}: kein Weg zu einer Leistungsseite.`);

  // Zwischendurch: neu eingefügt oder schon gleichwertig vorhanden.
  expect(plan.mitteNach.length > 0 || plan.mitteVorhanden, `${label}: weder Zwischendurch-Hinweis noch gleichwertiger Hinweis im Text.`);
  expect(plan.mitteNach.length <= 2, `${label}: höchstens zwei Zwischendurch-Hinweise.`);
  for (const index of plan.mitteNach) {
    expect(index >= 0 && index < article.sections.length - 1, `${label}: Hinweis nach Abschnitt ${index} liegt nicht zwischen zwei Abschnitten.`);
    const davor = article.sections[index]?.blocks?.at(-1);
    const danach = article.sections[index + 1]?.blocks?.[0];
    for (const block of [davor, danach]) {
      expect(!['path', 'calculator', 'tarifvergleich'].includes(block?.type), `${label}: Hinweis nach Abschnitt ${index} steht direkt neben einem ${block?.type}-Baustein.`);
    }
    if (article.kind === 'advertorial') expect(article.sections[index].id !== article.ctaAfterSectionId, `${label}: Hinweis an der Stelle des KassenBoost-Knopfs.`);
  }
  if (plan.mitteNach.length === 2) expect(plan.mitteNach[1] - plan.mitteNach[0] >= 2, `${label}: zwei Hinweise zu dicht beieinander.`);

  // Nichts doppelt: Ein neuer Hinweis hält Abstand zu jeder Weg-Karte auf
  // dieselbe Seite, und eine Weg-Karte mitten im Text belegt einen Platz.
  if (!plan.ziel.eigenerWeg) {
    const vorhanden = gleichwertigePositionen(article.sections, plan.ziel.to);
    const enden = [];
    let lauf = 0;
    for (const section of article.sections) {
      lauf += zaehleWoerter(collectBlockText(section.blocks, [section.heading]));
      enden.push(lauf);
    }
    const abstand = Math.max(MIN_ABSTAND_WOERTER, MIN_ABSTAND_ANTEIL * lauf);
    for (const index of plan.mitteNach) {
      expect(vorhanden.every((position) => Math.abs(position - enden[index]) >= abstand), `${label}: Hinweis nach Abschnitt ${index} doppelt eine Weg-Karte auf ${plan.ziel.to} (unter ${Math.round(abstand)} Wörter Abstand).`);
    }
    const inMitte = vorhanden.filter((position) => position / lauf >= MITTE_BEREICH[0] && position / lauf <= MITTE_BEREICH[1]).length;
    const plaetze = lauf >= ZWEITER_HINWEIS_AB_WOERTERN ? 2 : 1;
    expect(plan.mitteNach.length + inMitte <= Math.max(plaetze, inMitte), `${label}: ${plan.mitteNach.length} neue Hinweise, obwohl schon ${inMitte} Weg-Karte(n) mitten im Text auf ${plan.ziel.to} zeigen.`);
  }

  // Abschluss.
  expect(['block', 'rechner', 'internalCta', 'eigen'].includes(plan.ende), `${label}: unbekannter Abschluss ${plan.ende}.`);
  if (plan.ende === 'rechner') {
    const rechner = resolveRatgeberRechner(article, groupId);
    expect(basisPfad(rechner?.to) === plan.ziel.to, `${label}: Rechner-Karte zeigt nicht auf ${plan.ziel.to}.`);
  }
  if (plan.ende === 'internalCta') expect(basisPfad(article.internalCta?.to) === plan.ziel.to, `${label}: Schlussknopf zeigt nicht auf ${plan.ziel.to}.`);
  if (plan.ende === 'eigen') expect(plan.ziel.id === 'altersvorsorge' && article.topic === 'altersvorsorge', `${label}: eigener Weg nur für Altersvorsorge.`);
  expect(plan.alleBausteine === !OHNE_UEBERSICHTSLINK.has(plan.ziel.id), `${label}: Textlink auf /leistungen fehlt oder ist überflüssig.`);
}

/* --- Jeder Blogartikel ----------------------------------------------------- */

const blogCache = JSON.parse(read('public/data/blog-articles-cache.json'));
const blogSlugs = [...new Set(seoRoutes.map((route) => route.path.match(/^\/blog\/([^/]+)$/)?.[1]).filter(Boolean))];
expect(blogSlugs.length === blogCache.length, 'Blog: SEO-Routen und Cache nennen verschieden viele Artikel.');
const blogZaehler = {};
for (const article of blogCache) {
  const label = `Blog ${article.slug}`;
  const cta = getBlogArticleCta({ slug: article.slug, targetGroup: article.target_group, lang: 'de' });
  const plan = planBlogLeistungsweg({ slug: article.slug, targetGroup: article.target_group, ctaHref: cta.href });
  blogZaehler[plan.ziel.id] = (blogZaehler[plan.ziel.id] || 0) + 1;
  expect(Object.prototype.hasOwnProperty.call(BLOG_ZIEL_JE_SLUG, article.slug), `${label}: keine eigene Zuordnung in BLOG_ZIEL_JE_SLUG (Rückfall /leistungen griffe).`);
  expect(LEISTUNGSSEITEN.has(plan.ziel.to) && !plan.ziel.eigenerWeg, `${label}: kein Weg zu einer Leistungsseite.`);
  const teile = teileBlogHtml(article.content_html);
  expect(teile.length >= 2, `${label}: keine passende H2-Grenze für den Zwischendurch-Hinweis.`);
  expect(teile.join('').replace(/<\/?(?:article|div|section|main)\b[^>]*>/g, '').length >= article.content_html.replace(/<\/?(?:article|div|section|main)\b[^>]*>/g, '').length, `${label}: Beim Teilen ging Text verloren.`);
  for (const teil of teile.slice(1)) expect(!/^(?:<[^>]+>)*\s*<h2[^>]*>\s*Häufige Fragen/i.test(teil), `${label}: Hinweis direkt vor den häufigen Fragen.`);
  if (plan.ende === 'zielkasten') expect(basisPfad(cta.href) === plan.ziel.to, `${label}: Ziel-Kasten zeigt nicht auf ${plan.ziel.to}.`);
}
// Teilen hält die Hülle (<article>) gültig.
const probe = teileBlogHtml(`<article><p>${'Einleitung '.repeat(40)}</p><h2 id="a">Eins</h2><p>${'Text '.repeat(60)}</p><h2>Zwei</h2><p>${'Mehr '.repeat(80)}</p></article>`);
expect(probe.length === 2 && probe[0].endsWith('</article>') && probe[1].startsWith('<article>'), 'teileBlogHtml schließt und öffnet die Hülle an der Teilungsstelle nicht sauber.');
expect(teileBlogHtml('<p>Kurz ohne Zwischenüberschrift.</p>').length === 1, 'Ohne H2-Grenze bleibt der Text ungeteilt.');

/* --- 4. Texte ------------------------------------------------------------ */

const UMLAUT_ERSATZ = /\b(?:fuer|ueber|koenn\w*|moegl\w*|muess\w*|waehrend|naechst\w*|zurueck|haeufig\w*|aehnlich\w*|ueblich\w*|zusaetzlich\w*|gemaess|regelmaessig\w*|erhoeh\w*|hoech\w*|verfuegbar|gross|groess\w*|schliesslich)\b/i;
const SPERRWORTE = /kostenlos|kostenfrei|gratis|umsonst|ohne Obergrenze|unbegrenzt|Maximalbetrag|garantiert|absicher|(?:keine|ohne) Gesundheits(?:fragen|prüfung)|Testsieger|\bSiegel|Courtage|Provision|Geldbonus|Bargeld|in bar\b|Auszahlung|ausgezahlt/i;
const texteJeZiel = [];
for (const [id, ziel] of Object.entries(LEISTUNGSZIELE)) {
  if (ziel.eigenerWeg) continue;
  for (const variante of [null, ...Object.keys(ziel.varianten || {})]) {
    const z = getLeistungsziel(id, variante);
    texteJeZiel.push({ id: `${id}${variante ? `/${variante}` : ''}`, ziel: z, felder: [z.mitte.frage, z.mitte.text, z.mitte.label, z.ende.titel, z.ende.text, z.ende.label] });
  }
}
for (const { id, ziel, felder } of texteJeZiel) {
  const text = felder.join('\n');
  expect(!/[–—]|\s-\s/.test(text), `Texte ${id}: keine Gedankenstriche.`);
  expect(!/\bSie\b|\bIhre?[nmrs]?\b/.test(text), `Texte ${id}: Du-Form oder neutral, nie Sie.`);
  expect(!UMLAUT_ERSATZ.test(text), `Texte ${id}: echte Umlaute.`);
  expect(!SPERRWORTE.test(text), `Texte ${id}: Sperrwort "${text.match(SPERRWORTE)?.[0]}".`);
  expect(!/(?<!Soziale )\bsicher/i.test(text), `Texte ${id}: Wortstamm "sicher" nicht als Versprechen.`);
  expect(!/3\.000/.test(text), `Texte ${id}: 3.000 EUR nur zusammen mit Vorsorge, Sehhilfen und Zuzahlungen, hier nicht nötig.`);
  expect(ziel.mitte.label.length <= 28 && ziel.ende.label.length <= 28, `Texte ${id}: Knopftexte höchstens 28 Zeichen.`);
  expect(`${ziel.mitte.frage} ${ziel.mitte.text}`.length <= 170, `Texte ${id}: Zwischendurch-Hinweis zu lang für das Handy.`);
  expect(ziel.ende.text.length <= 200, `Texte ${id}: Abschluss-Satz zu lang.`);
  for (const satz of [ziel.mitte.text, ziel.ende.text]) {
    const bonus = satz.search(/Kassenbonus/);
    if (bonus >= 0) expect(bonus > satz.search(/erstattet|zahlt|versichert/), `Texte ${id}: Nutzen zuerst, der Kassenbonus erst danach.`);
  }
  if (ziel.id === 'ambulant') expect(/Gesundheitsfragen ja, keine Ablehnung\./.test(ziel.ende.text), `Texte ${id}: ambulant mit „Gesundheitsfragen ja, keine Ablehnung“.`);
}

/* --- 5. Verdrahtung ------------------------------------------------------ */

const layout = read('src/components/ratgeber/RatgeberArticleLayout.jsx');
expect(/planRatgeberLeistungsweg\(article, groupId\)/.test(layout), 'Vorlage: Leistungsweg über planRatgeberLeistungsweg(article, groupId) planen.');
expect(/leistungsweg\.mitteNach\.includes\(sectionIndex\) && <LeistungsHinweisMitte/.test(layout), 'Vorlage: Zwischendurch-Hinweis nach den geplanten Abschnitten.');
expect(/leistungsweg\.ende === 'block' && \(\s*<LeistungsHinweisEnde/.test(layout), 'Vorlage: Abschluss-Block, wenn kein gleichwertiger Abschluss da ist.');
expect(/alleBausteine=\{leistungsweg\.ende === 'rechner' && leistungsweg\.alleBausteine\}/.test(layout), 'Vorlage: Rechner-Karte bekommt den Textlink auf alle Bausteine.');
expect(/leistungsweg\.ende === 'internalCta' && leistungsweg\.alleBausteine/.test(layout), 'Vorlage: Schlussknopf bekommt den Textlink auf alle Bausteine.');
const endePos = layout.indexOf('<LeistungsHinweisEnde');
expect(endePos > layout.indexOf('article.faqs?.length > 0') && endePos < layout.indexOf('<RechnerKarte') && endePos < layout.indexOf('<SourcesBlock'), 'Vorlage: Abschluss-Block nach den häufigen Fragen, vor Rechner-Karte und Quellen.');
const bausteine = read('src/components/ratgeber/RatgeberBausteine.jsx');
expect(/\{alleBausteine && <AlleBausteineLink ton="dunkel" \/>\}/.test(bausteine), 'Rechner-Karte: Textlink „Alle Bausteine ansehen“ auf dunklem Grund.');
const blogPage = read('src/pages/BlogArticlePage.jsx');
expect(/teileBlogHtml\(articleBodyHtml\)/.test(blogPage) && /planBlogLeistungsweg\(/.test(blogPage), 'Blogseite: Text teilen und Leistungsweg planen.');
expect(/<LeistungsHinweisMitte ziel=\{leistungsweg\.ziel\} \/>/.test(blogPage) && /<LeistungsHinweisEnde/.test(blogPage) && /<AlleBausteineLink ton="gruen" \/>/.test(blogPage), 'Blogseite: Hinweis, Abschluss und Textlink im Ziel-Kasten.');
const seoPages = read('scripts/generate-seo-pages.mjs');
expect(/leistungsHinweisMitteHtml\(leistungsweg\.ziel\)/.test(seoPages) && /leistungsHinweisEndeHtml\(leistungsweg\.ziel\)/.test(seoPages), 'Statisches Blog-HTML: Hinweis und Abschluss fehlen.');
const komponente = read('src/components/leistungsweg/LeistungsHinweis.jsx');
const markup = read('src/lib/leistungswegMarkup.js');
for (const [name, quelle] of [['LeistungsHinweis.jsx', komponente], ['leistungswegMarkup.js', markup], ['leistungsweg.js', read('src/content/leistungsweg.js')]]) {
  expect(!/fetch\(|sendBeacon|dataLayer|gtag|fbq|track[A-Z]\w*\(|onClick|localStorage|sessionStorage|@\/lib\/(?:analytics|google-ads|meta-pixel|consent)/.test(quelle), `${name}: Der Leistungsweg misst und speichert nichts.`);
}
expect(/from 'react-router-dom'/.test(komponente) && !/<a\s/.test(komponente) && !/target=/.test(komponente), 'LeistungsHinweis.jsx: interne Links nur per React Router, kein neuer Tab.');
expect((komponente.match(/withAdClickIds\(/g) || []).length >= 3, 'LeistungsHinweis.jsx: Links reichen nur die Klick-Kennung weiter (withAdClickIds).');
expect(/min-h-11/.test(LEISTUNGSWEG_KLASSEN.mitteKnopf) && /min-h-\[3\.25rem\]/.test(LEISTUNGSWEG_KLASSEN.endeKnopf) && Object.values(LEISTUNGSWEG_KLASSEN.alleLink).every((klasse) => /min-h-11/.test(klasse)), 'Tippflächen ab 44 px.');
for (const [id] of Object.entries(LEISTUNGSZIELE).filter(([, ziel]) => !ziel.eigenerWeg)) {
  const ziel = getLeistungsziel(id);
  const html = leistungsHinweisMitteHtml(ziel) + leistungsHinweisEndeHtml(ziel);
  expect(html.includes(`href="${ziel.to}"`) && html.includes(`data-leistungsziel="${id}"`), `Statisches HTML ${id}: Ziel oder Kennung fehlt.`);
  expect(ziel.alleBausteine === html.includes(`href="${LEISTUNGEN_PFAD}" data-leistungsweg="alle"`), `Statisches HTML ${id}: Textlink auf alle Bausteine stimmt nicht.`);
}

/* --- 6. Gebautes HTML ---------------------------------------------------- */

const distDir = path.join(root, 'dist');
let gebauteRatgeber = 0;
let gebauteBlogs = 0;
// Reihenfolge der Attribute ist im React-HTML anders als im statischen HTML.
const hatAlleLink = (html) => [...html.matchAll(/<a\b[^>]*data-leistungsweg="alle"[^>]*>/g)].some((match) => /href="\/leistungen"/.test(match[0]));
const hrefsZu = (html, pfad) => [...html.matchAll(/href="([^"]*)"/g)].map((match) => match[1].replace(/&amp;/g, '&')).filter((href) => basisPfad(href) === pfad);
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  for (const article of ratgeberArticles) {
    const file = path.join(distDir, 'ratgeber', article.slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    gebauteRatgeber += 1;
    const html = fs.readFileSync(file, 'utf8');
    const plan = ratgeberPlaene.get(article.slug);
    const label = `Gebaut /ratgeber/${article.slug}`;
    expect(hrefsZu(html, plan.ziel.to).length > 0, `${label}: kein Link auf ${plan.ziel.to}.`);
    const mitte = (html.match(/data-leistungsweg="mitte"/g) || []).length;
    expect(mitte === plan.mitteNach.length, `${label}: ${mitte} statt ${plan.mitteNach.length} Zwischendurch-Hinweise.`);
    const ende = (html.match(/data-leistungsweg="ende"/g) || []).length;
    expect(ende === (plan.ende === 'block' ? 1 : 0), `${label}: Abschluss-Block ${ende}-mal (erwartet ${plan.ende === 'block' ? 1 : 0}).`);
    if (plan.alleBausteine) expect(hatAlleLink(html), `${label}: Textlink „Alle Bausteine ansehen“ fehlt.`);
    if (plan.ziel.id === 'leistungen') expect(hrefsZu(html, LEISTUNGEN_PFAD).length > 0, `${label}: Rückfall ohne Link auf /leistungen.`);
  }
  for (const slug of blogSlugs) {
    const file = path.join(distDir, 'blog', slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    gebauteBlogs += 1;
    const html = fs.readFileSync(file, 'utf8');
    const article = blogCache.find((entry) => entry.slug === slug);
    const { ziel } = planBlogLeistungsweg({ slug, targetGroup: article?.target_group });
    const label = `Gebaut /blog/${slug}`;
    expect(/data-leistungsweg="mitte"/.test(html) && /data-leistungsweg="ende"/.test(html), `${label}: Hinweis oder Abschluss fehlt im statischen HTML.`);
    expect(hrefsZu(html, ziel.to).length >= 2, `${label}: Hinweis und Abschluss zeigen nicht auf ${ziel.to}.`);
    if (ziel.alleBausteine) expect(hatAlleLink(html), `${label}: Textlink „Alle Bausteine ansehen“ fehlt.`);
  }
}

if (failures.length > 0) {
  console.error(`Leistungsweg-Vertrag verletzt (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const liste = (objekt) => Object.entries(objekt).sort((a, b) => b[1] - a[1]).map(([id, anzahl]) => `${id} ${anzahl}`).join(', ');
console.log(`Leistungsweg-Vertrag erfüllt: ${ratgeberArticles.length} Ratgeber (${liste(zaehler)}) und ${blogCache.length} Blogartikel (${liste(blogZaehler)}) führen zur passenden Leistungsseite, mit Hinweis im Text und Abschluss.${gebauteRatgeber + gebauteBlogs ? ` Gebaut geprüft: ${gebauteRatgeber} Ratgeber, ${gebauteBlogs} Blogartikel.` : ''}`);
