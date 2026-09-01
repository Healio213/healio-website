import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

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

const server = await createServer({
  root: rootDir,
  logLevel: 'silent',
  plugins: [{
    name: 'test-blog-prerender-fallback',
    resolveId(id) {
      return id === '/_vercel/insights/script.js' ? '\0test-vercel-insights-stub' : null;
    },
    load(id) {
      return id === '\0test-vercel-insights-stub' ? '' : null;
    },
    transformIndexHtml(html) {
      return html
        .replace('<div id="root"></div>', `<div id="root">${prerenderedMarkup}</div>`)
        .replace('<script defer src="/_vercel/insights/script.js"></script>', '');
    },
    configureServer(viteServer) {
      viteServer.middlewares.use('/api/v1/content/articles', (request, response) => {
        const requestUrl = new URL(request.url, 'http://localhost');
        response.statusCode = requestUrl.searchParams.has('slug') ? 404 : 502;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ error: 'Content API unavailable' }));
      });
    },
  }],
  server: {
    host: '127.0.0.1',
    port: 0,
  },
});

let browser;

try {
  await server.listen();
  const address = server.httpServer?.address();
  assert(address && typeof address !== 'string', 'Vite test server did not expose a local port.');
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

  await page.goto(`${baseUrl}/blog`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await new Promise((resolve) => setTimeout(resolve, 750));
  const blogText = await page.$eval('#root', (root) => root.textContent.replace(/\s+/g, ' ').trim());
  assert.match(
    blogText,
    new RegExp(prerenderedListTitle),
    'Bei einem API-Ausfall muss die vorgerenderte Blogliste sichtbar bleiben.',
  );
  assert.doesNotMatch(blogText, /Noch keine Beiträge|No posts yet/i);

  await page.goto(`${baseUrl}/blog/fallback-test`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await new Promise((resolve) => setTimeout(resolve, 750));
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
  await server.close();
}
