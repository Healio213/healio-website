import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyBlogEditorialFixes } from '../src/lib/blogEditorialFixes.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(rootDir, 'public', 'data', 'blog-articles-cache.json');
const apiBase = (process.env.BLOG_CONTENT_API_URL || 'https://app.healio.de').replace(/\/$/, '');
const inputIndex = process.argv.indexOf('--input');
const inputPath = inputIndex >= 0 ? process.argv[inputIndex + 1] : null;

const PUBLIC_FIELDS = [
  'slug',
  'title',
  'meta_description',
  'target_group',
  'excerpt',
  'content_html',
  'geo_section',
  'featured_image_url',
  'structured_data',
  'published_at',
  'updated_at',
  'author',
  'reading_time_minutes',
];

function getArticles(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.articles)) return payload.articles;
  throw new Error('Die Quelle enthält keine Artikelliste.');
}

function normalizeArticle(article) {
  return Object.fromEntries(PUBLIC_FIELDS.map((field) => [field, article?.[field] ?? null]));
}

function isCompleteArticle(article) {
  return typeof article?.slug === 'string'
    && article.slug.trim().length > 0
    && typeof article.title === 'string'
    && article.title.trim().length >= 10
    && typeof article.meta_description === 'string'
    && article.meta_description.trim().length >= 40
    && typeof article.content_html === 'string'
    && article.content_html.trim().length >= 500;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status} für ${new URL(url).pathname}`);
  return response.json();
}

async function loadFromApi() {
  const listPayload = await fetchJson(`${apiBase}/api/v1/content/articles`);
  const list = getArticles(listPayload);

  return Promise.all(list.map(async (summary) => {
    if (!summary?.slug) throw new Error('Ein Blogeintrag hat keinen Slug.');
    if (isCompleteArticle(summary)) return summary;

    const detail = await fetchJson(
      `${apiBase}/api/v1/content/articles?slug=${encodeURIComponent(summary.slug)}`,
    );
    return detail.article;
  }));
}

async function loadSource() {
  if (!inputPath) return loadFromApi();
  const absoluteInputPath = path.resolve(inputPath);
  return getArticles(JSON.parse(fs.readFileSync(absoluteInputPath, 'utf8')));
}

const sourceArticles = await loadSource();
const publishedStatuses = new Set(['published', 'veroeffentlicht', 'veröffentlicht']);
const publishedArticles = sourceArticles.filter(
  (article) => !article?.status || publishedStatuses.has(String(article.status).toLowerCase()),
);
if (publishedArticles.length === 0) {
  throw new Error('Die Quelle enthält keine veröffentlichten Blogartikel. Der bestehende Cache bleibt unverändert.');
}
const normalizedArticles = publishedArticles
  .map(applyBlogEditorialFixes)
  .map(normalizeArticle)
  .map((article) => {
    const published = Date.parse(article.published_at || '');
    const modified = Date.parse(article.updated_at || '');
    return Number.isFinite(published) && (!Number.isFinite(modified) || modified < published)
      ? { ...article, updated_at: article.published_at }
      : article;
  })
  .sort((left, right) => String(right.published_at || '').localeCompare(String(left.published_at || '')));

const invalidArticles = normalizedArticles.filter((article) => !isCompleteArticle(article));
if (invalidArticles.length > 0) {
  throw new Error(`Unvollständige Blogartikel: ${invalidArticles.map((article) => article.slug || '(ohne Slug)').join(', ')}`);
}

const duplicateSlugs = normalizedArticles
  .map((article) => article.slug)
  .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);
if (duplicateSlugs.length > 0) {
  throw new Error(`Doppelte Blog-Slugs: ${[...new Set(duplicateSlugs)].join(', ')}`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const temporaryOutputPath = `${outputPath}.tmp`;
fs.writeFileSync(temporaryOutputPath, `${JSON.stringify(normalizedArticles, null, 2)}\n`);
fs.renameSync(temporaryOutputPath, outputPath);
console.log(`Blog-Cache aktualisiert: ${normalizedArticles.length} veröffentlichte Artikel.`);
