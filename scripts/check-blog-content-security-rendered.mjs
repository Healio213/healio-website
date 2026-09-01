import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const maliciousArticle = {
  slug: 'xss-test',
  title: '</script><script>window.__jsonLdXss = true</script>',
  meta_description: 'Sicherheitsprüfung für dynamische Ratgeberinhalte.',
  target_group: 'endkunden',
  author: 'Healio Redaktion',
  published_at: '2026-09-01T00:00:00.000Z',
  reading_time_minutes: 2,
  content_html: `
    <article>
      <h1>Wird entfernt</h1>
      <p data-safe-copy onmouseover="window.__eventXss = true">
        Sichtbarer <strong>Ratgebertext</strong>
      </p>
      <a data-unsafe-link href="javascript:window.__linkXss = true">Unsicherer Link</a>
      <img data-unsafe-image src="invalid://x" onerror="window.__imageXss = true">
      <script>window.__scriptXss = true</script>
      <svg onload="window.__svgXss = true"><circle /></svg>
    </article>
  `,
  structured_data: {
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '</script><script>window.__schemaXss = true</script>',
    },
  },
};

const server = await createServer({
  root: rootDir,
  logLevel: 'silent',
  plugins: [{
    name: 'test-blog-content-security',
    resolveId(id) {
      return id === '/_vercel/insights/script.js' ? '\0test-vercel-insights-stub' : null;
    },
    load(id) {
      return id === '\0test-vercel-insights-stub' ? '' : null;
    },
    transformIndexHtml(html) {
      return html.replace('<script defer src="/_vercel/insights/script.js"></script>', '');
    },
    configureServer(viteServer) {
      viteServer.middlewares.use('/api/v1/content/articles', (_request, response) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ article: maliciousArticle }));
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
  await page.evaluateOnNewDocument(() => {
    window.__eventXss = false;
    window.__linkXss = false;
    window.__imageXss = false;
    window.__scriptXss = false;
    window.__svgXss = false;
    window.__schemaXss = false;
    window.__jsonLdXss = false;
  });
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const requestUrl = new URL(request.url());
    if (requestUrl.origin === baseUrl || requestUrl.protocol === 'data:' || requestUrl.protocol === 'blob:') {
      request.continue();
      return;
    }
    request.abort();
  });

  await page.goto(`${baseUrl}/blog/xss-test`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForSelector('[data-prerendered-blog-article] [data-safe-copy]', { timeout: 30_000 });
  await new Promise((resolve) => setTimeout(resolve, 250));

  const result = await page.evaluate(() => {
    const root = document.querySelector('[data-prerendered-blog-article]');
    const articleContent = root?.querySelector('.prose');
    const unsafeLink = articleContent?.querySelector('[data-unsafe-link]');
    return {
      safeText: root?.querySelector('[data-safe-copy]')?.textContent || '',
      strongText: root?.querySelector('[data-safe-copy] strong')?.textContent || '',
      scripts: articleContent?.querySelectorAll('script').length || 0,
      eventAttributes: articleContent?.querySelectorAll('[onerror], [onload], [onclick], [onmouseover]').length || 0,
      unsafeHref: unsafeLink?.getAttribute('href') || '',
      svgCount: articleContent?.querySelectorAll('svg').length || 0,
      sentinels: [
        window.__eventXss,
        window.__linkXss,
        window.__imageXss,
        window.__scriptXss,
        window.__svgXss,
        window.__schemaXss,
        window.__jsonLdXss,
      ],
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((script) => script.textContent || ''),
    };
  });

  assert.match(result.safeText, /Sichtbarer\s+Ratgebertext/, 'Sicherer Artikeltext muss sichtbar bleiben.');
  assert.equal(result.strongText, 'Ratgebertext', 'Sichere Rich-Text-Formatierung muss erhalten bleiben.');
  assert.equal(result.scripts, 0, 'API-Inhalt darf keine Script-Tags rendern.');
  assert.equal(result.eventAttributes, 0, 'API-Inhalt darf keine Eventhandler rendern.');
  assert.doesNotMatch(result.unsafeHref, /^javascript:/i, 'API-Inhalt darf keine javascript:-URL rendern.');
  assert.equal(result.svgCount, 0, 'API-Inhalt darf keine SVG-Payload rendern.');
  assert.deepEqual(result.sentinels, [false, false, false, false, false, false, false]);
  assert.ok(result.jsonLd.length > 0, 'Die Seite muss weiterhin JSON-LD ausgeben.');
  for (const json of result.jsonLd) {
    assert.doesNotMatch(json, /<\/script/i, 'JSON-LD darf keinen schließenden Script-Tag enthalten.');
    JSON.parse(json);
  }

  console.log('Blog content security rendered checks passed.');
} finally {
  await browser?.close();
  await server.close();
}
