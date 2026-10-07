/**
 * Prüft nach dem Build jede vorgerenderte Ratgeberseite.
 *
 * Seit dem Register-Umbau (07.10.2026) lädt die Website den Artikeltext je
 * Slug als eigenen Chunk nach. Suchmaschinen und Leser ohne JavaScript sollen
 * trotzdem den vollständigen Artikel im ausgelieferten HTML bekommen. Für
 * jeden Artikel aus src/content/ratgeber/gliederung.js wird deshalb
 * dist/ratgeber/<slug>/index.html geprüft: Seitentitel, Beschreibung,
 * Canonical, robots, strukturierte Daten, genau eine H1 mit der Überschrift,
 * der Vorspann, ein Satz aus dem letzten Abschnitt und die letzte FAQ-Frage.
 *
 * Aufruf: npm run test:ratgeber-build (läuft auch in npm run build).
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { collectBlockText } from '../src/content/ratgeber/articleText.js';
import { ratgeberArticles } from './lib/ratgeber-articles.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (text) => text
  .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
  .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
const normalize = (text) => decode(text).replace(/[\s ]+/g, ' ').trim();
// Tags ersatzlos entfernen: Links und Hervorhebungen mitten im Satz trennen
// den Text dann nicht.
const visibleText = (markup) => normalize(markup
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ''));

const rootMarkup = (html) => {
  const tag = /<div\s+[^>]*id=["']root["'][^>]*>/i.exec(html);
  if (!tag) return '';
  const start = tag.index + tag[0].length;
  const end = html.indexOf('</body>', start);
  return end < 0 ? '' : html.slice(start, end);
};

const snippet = (text, length = 80) => normalize(text).slice(0, length).trim();

// Ein Satz aus dem letzten Abschnitt: der letzte sichtbare Text mit mindestens
// 20 Zeichen. Der Zahnkosten-Rechner rendert seinen Text erst beim Scrollen
// und zählt deshalb nicht.
const lastSectionSnippet = (article) => {
  const lastSection = article.sections?.at(-1);
  if (!lastSection) return null;
  const blocks = (lastSection.blocks || []).filter((block) => block.type !== 'calculator');
  const parts = collectBlockText(blocks, []).filter((part) => typeof part === 'string' && normalize(part).length >= 20);
  return parts.length > 0 ? snippet(parts.at(-1)) : snippet(lastSection.heading);
};

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('[ratgeber-build] dist/ fehlt. Zuerst npm run build ausführen.');
  process.exit(1);
}

for (const article of ratgeberArticles) {
  const label = `/ratgeber/${article.slug}`;
  const file = path.join(distDir, 'ratgeber', article.slug, 'index.html');
  if (!fs.existsSync(file)) {
    failures.push(`${label}: dist/ratgeber/${article.slug}/index.html fehlt.`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const body = rootMarkup(html);
  const text = visibleText(body);

  expect(normalize(head.match(/<title>([^<]*)<\/title>/)?.[1] || '') === normalize(article.metaTitle), `${label}: <title> ist nicht der metaTitle.`);
  expect(
    normalize(head.match(/<meta name="description" content="([^"]*)"/)?.[1] || '') === normalize(article.metaDescription),
    `${label}: Beschreibung ist nicht die metaDescription.`,
  );
  expect(head.includes(`<link rel="canonical" href="https://healio.de${label}"`), `${label}: Canonical fehlt.`);

  const jsonLd = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]).join('\n');
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(head);
  if (article.kind === 'advertorial') {
    expect(noindex, `${label}: Advertorial muss noindex ausliefern.`);
    expect(!jsonLd.includes('"@type":"Article"'), `${label}: Advertorial ohne Article-Auszeichnung.`);
  } else {
    expect(!noindex, `${label}: Ratgeberartikel darf nicht auf noindex stehen.`);
    expect(jsonLd.includes('"@type":"Article"') && jsonLd.includes(JSON.stringify(article.headline).slice(1, -1)), `${label}: Article-Auszeichnung mit Überschrift fehlt.`);
    if (article.faqs?.length) expect(jsonLd.includes('"@type":"FAQPage"'), `${label}: FAQPage-Auszeichnung fehlt.`);
  }

  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => visibleText(match[1]));
  expect(h1s.length === 1, `${label}: ${h1s.length} H1 statt genau einer im vorgerenderten Inhalt.`);
  expect(h1s[0] === normalize(article.headline), `${label}: H1 ist nicht die Überschrift des Artikels.`);

  expect(text.includes(snippet(article.lead)), `${label}: Vorspann fehlt im vorgerenderten Inhalt.`);
  const last = lastSectionSnippet(article);
  expect(Boolean(last) && text.includes(last), `${label}: Text aus dem letzten Abschnitt fehlt im vorgerenderten Inhalt ("${last}").`);
  const lastFaq = article.faqs?.at(-1)?.question;
  if (lastFaq) expect(text.includes(normalize(lastFaq)), `${label}: Letzte FAQ-Frage fehlt im vorgerenderten Inhalt.`);
}

if (failures.length > 0) {
  console.error(`[ratgeber-build] FEHLER (${failures.length}):`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(`[ratgeber-build] ok: ${ratgeberArticles.length} vorgerenderte Ratgeberseiten mit Titel, Beschreibung, Auszeichnung, H1, Vorspann, letztem Abschnitt und FAQ geprüft.`);
