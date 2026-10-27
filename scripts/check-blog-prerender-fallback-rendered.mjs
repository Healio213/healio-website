import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const prerenderedListTitle = 'Vorgerenderter Listenbeitrag bleibt sichtbar';
const prerenderedArticleTitle = 'Vorgerenderter Artikel bleibt sichtbar';

const prerenderedMarkup = `
  <div data-prerendered-blog-list>
    <a href="/blog/fallback-test"><h2>${prerenderedListTitle}</h2></a>
  </div>
  <article data-static-blog-article>
    <h1>${prerenderedArticleTitle}</h1>
    <p data-safe-fallback onclick="window.__fallbackClickXss = true">Dieser Text stammt aus dem vorgerenderten HTML.</p>
    <a data-unsafe-fallback-link href="javascript:window.__fallbackLinkXss = true">Unsicherer Link</a>
    <svg data-unsafe-fallback-svg onload="window.__fallbackSvgXss = true"><circle /></svg>
  </article>
`;

const distDir = path.join(rootDir, 'dist');
const [sourceHtml, productionHtml] = await Promise.all([
  readFile(path.join(rootDir, 'index.html'), 'utf8'),
  readFile(path.join(distDir, 'index.html'), 'utf8'),
]);
const moduleTags = productionHtml.match(/<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\/assets\/)[^>]*>\s*<\/script>/gi) || [];
const stylesheetTags = productionHtml.match(/<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']\/assets\/)[^>]*>/gi) || [];
assert.ok(moduleTags.length > 0, 'Zuerst den Produktionsbuild ausführen: dist/index.html enthält kein App-Modul.');
assert.ok(stylesheetTags.length > 0, 'Der Produktionsbuild enthält kein App-Stylesheet.');
assert.ok(sourceHtml.includes('<div id="root"></div>'), 'Das Quelltemplate muss einen leeren App-Root enthalten.');
assert.match(sourceHtml, /<script\b[^>]*\bsrc=["']\/src\/main\.jsx["'][^>]*>\s*<\/script>/i);
const fixtureHtml = sourceHtml
  .replace('<div id="root"></div>', `<div id="root">${prerenderedMarkup}</div>`)
  .replace(/<script\b[^>]*\bsrc=["']\/src\/main\.jsx["'][^>]*>\s*<\/script>/i, [...moduleTags, ...stylesheetTags].join('\n'))
  .replace('<script defer src="/_vercel/insights/script.js"></script>', '');
const contentTypes = {
  '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};
const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(requestUrl.pathname);
    response.setHeader('Cache-Control', 'no-store');
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405); response.end(); return;
    }
    if (pathname === '/data/blog-articles-cache.json') {
      response.writeHead(503, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Static cache unavailable' })); return;
    }
    if (pathname.startsWith('/api/v1/content/articles')) {
      response.writeHead(requestUrl.searchParams.has('slug') ? 404 : 502, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Content API unavailable' })); return;
    }
    if (pathname === '/blog' || pathname === '/blog/fallback-test') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(fixtureHtml); return;
    }
    if (pathname === '/_vercel/insights/script.js') {
      response.writeHead(200, { 'Content-Type': 'text/javascript' }); response.end(''); return;
    }
    const filePath = path.resolve(distDir, `.${pathname}`);
    if (!filePath.startsWith(`${distDir}${path.sep}`)) {
      response.writeHead(403); response.end(); return;
    }
    const body = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404); response.end();
  }
});

let browser;

try {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  assert(address && typeof address !== 'string', 'HTTP test server did not expose a local port.');
  const baseUrl = `http://127.0.0.1:${address.port}`;

  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const requestUrl = new URL(request.url());
    if (requestUrl.origin === baseUrl || requestUrl.protocol === 'data:' || requestUrl.protocol === 'blob:') {
      request.continue();
      return;
    }
    request.abort();
  });

  const listCacheFailure = page.waitForResponse((response) => response.url() === `${baseUrl}/data/blog-articles-cache.json` && response.status() === 503);
  await page.goto(`${baseUrl}/blog`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await listCacheFailure;
  await page.waitForFunction(() => document.querySelector('[data-prerendered-blog-list]') && !document.querySelector('[data-static-blog-article]'));
  const blogText = await page.$eval('#root', (root) => root.textContent.replace(/\s+/g, ' ').trim());
  assert.match(
    blogText,
    new RegExp(prerenderedListTitle),
    'Bei einem API-Ausfall muss die vorgerenderte Blogliste sichtbar bleiben.',
  );
  assert.doesNotMatch(blogText, /Noch keine Beiträge|No posts yet/i);

  const articleCacheFailure = page.waitForResponse((response) => response.url() === `${baseUrl}/data/blog-articles-cache.json` && response.status() === 503);
  await page.goto(`${baseUrl}/blog/fallback-test`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await articleCacheFailure;
  await page.waitForFunction(() => document.querySelector('[data-static-blog-article]') && !document.querySelector('[data-prerendered-blog-list]'));
  const articleText = await page.$eval('#root', (root) => root.textContent.replace(/\s+/g, ' ').trim());
  assert.match(
    articleText,
    new RegExp(prerenderedArticleTitle),
    'Bei einem API-Ausfall muss der vorgerenderte Artikel sichtbar bleiben.',
  );
  assert.doesNotMatch(articleText, /Artikel nicht gefunden|Article not found/i);
  const unsafeFallback = await page.$eval('#root', (root) => ({
    eventAttributes: root.querySelectorAll('[onclick], [onload], [onerror], [onmouseover]').length,
    unsafeHref: root.querySelector('[data-unsafe-fallback-link]')?.getAttribute('href') || '',
    svgCount: root.querySelectorAll('[data-unsafe-fallback-svg]').length,
  }));
  assert.equal(unsafeFallback.eventAttributes, 0, 'Fallback-HTML darf keine Eventhandler erneut einsetzen.');
  assert.doesNotMatch(unsafeFallback.unsafeHref, /^javascript:/i, 'Fallback-HTML darf keine javascript:-URL erneut einsetzen.');
  assert.equal(unsafeFallback.svgCount, 0, 'Fallback-HTML darf keine SVG-Payload erneut einsetzen.');
  const robots = await page.$eval('meta[name="robots"]', (tag) => tag.getAttribute('content'));
  assert.doesNotMatch(
    robots,
    /noindex/i,
    'Ein API-Fehler darf einen vorgerenderten Artikel nicht nachträglich auf noindex setzen.',
  );

  console.log('Blog prerender fallback rendered checks passed.');
} finally {
  await browser?.close();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
