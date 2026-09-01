import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const cachePath = path.join(rootDir, 'public', 'data', 'blog-articles-cache.json');
const knownBlogSlugs = [...new Set(
  seoRoutes
    .map((route) => route.path.match(/^\/blog\/([^/]+)$/)?.[1])
    .filter(Boolean),
)];

const readText = (filePath) => fs.readFileSync(filePath, 'utf8');

function getRootMarkup(html) {
  const rootMatch = /<div\s+[^>]*id=["']root["'][^>]*>/i.exec(html);
  assert.ok(rootMatch, '#root fehlt');

  const rootStart = rootMatch.index + rootMatch[0].length;
  const bodyEnd = html.indexOf('</body>', rootStart);
  assert.ok(bodyEnd > rootStart, '#root kann nicht ausgelesen werden');
  return html.slice(rootStart, bodyEnd);
}

function assertNoSoft404(markup, route) {
  assert.doesNotMatch(
    markup,
    /Artikel nicht gefunden|Article not found|Beiträge konnten nicht geladen werden|Articles could not be loaded|Beim Laden des Artikels ist ein Fehler aufgetreten/i,
    `${route}: Soft-404- oder API-Fehlertext im indexierbaren Build`,
  );
}

assert.ok(fs.existsSync(cachePath), 'Der geprüfte Blog-Cache fehlt.');
const cachedArticles = JSON.parse(readText(cachePath));
assert.ok(Array.isArray(cachedArticles), 'Der Blog-Cache muss ein Array sein.');
assert.equal(cachedArticles.length, knownBlogSlugs.length, 'Cache und SEO-Routen müssen dieselben Artikel enthalten.');

const cachedBySlug = new Map(cachedArticles.map((article) => [article.slug, article]));
for (const slug of knownBlogSlugs) {
  const article = cachedBySlug.get(slug);
  assert.ok(article, `Cache-Eintrag fehlt: ${slug}`);
  assert.ok(article.title?.trim().length >= 10, `Titel ist zu kurz: ${slug}`);
  assert.ok(article.meta_description?.trim().length >= 40, `Meta-Beschreibung ist zu kurz: ${slug}`);
  assert.ok(article.content_html?.trim().length >= 500, `Artikelinhalt ist zu kurz: ${slug}`);
}

for (const hubRoute of ['/blog', '/en/blog']) {
  const htmlPath = path.join(distDir, hubRoute.replace(/^\//, ''), 'index.html');
  assert.ok(fs.existsSync(htmlPath), `${hubRoute}: HTML-Datei fehlt.`);
  const rootMarkup = getRootMarkup(readText(htmlPath));
  assertNoSoft404(rootMarkup, hubRoute);
  assert.match(rootMarkup, /data-prerendered-blog-list/, `${hubRoute}: statische Artikelliste fehlt.`);

  const articleLinks = new Set(
    [...rootMarkup.matchAll(/href=["']\/blog\/([^"'#?]+)["']/g)].map((match) => match[1]),
  );
  for (const slug of knownBlogSlugs) {
    assert.ok(articleLinks.has(slug), `${hubRoute}: Link zu ${slug} fehlt.`);
  }
}

for (const slug of knownBlogSlugs) {
  const route = `/blog/${slug}`;
  const htmlPath = path.join(distDir, 'blog', slug, 'index.html');
  assert.ok(fs.existsSync(htmlPath), `${route}: HTML-Datei fehlt.`);

  const html = readText(htmlPath);
  const rootMarkup = getRootMarkup(html);
  assertNoSoft404(rootMarkup, route);
  assert.match(rootMarkup, /data-static-blog-article|data-prerendered-blog-article/, `${route}: Artikel-Markup fehlt.`);
  assert.match(rootMarkup, /<div class="prose prose-lg max-w-none">[\s\S]{500,}<\/div>/, `${route}: Artikeltext fehlt oder ist zu kurz.`);
  assert.match(html, new RegExp(`<link rel="canonical" href="https://healio\\.de/blog/${slug}"`), `${route}: Canonical ist falsch.`);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, `${route}: Artikel ist irrtümlich noindex.`);
}

console.log(`Blog build output contract passed (${knownBlogSlugs.length} Artikel, 2 Hubs).`);
