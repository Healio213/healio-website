/**
 * Prerender
 *
 * Läuft nach `generate-seo-pages.mjs` und füllt die pro Route erzeugten
 * index.html-Dateien mit dem tatsächlich gerenderten Seiteninhalt
 * (#root-InnerHTML aus einem Headless-Browser). Google und andere
 * Crawler ohne JavaScript sehen damit echte Überschriften, Texte und
 * interne Links statt einer leeren App-Shell. Beim Laden im Browser
 * ersetzt React das Markup wie gewohnt (gleiches DOM, kein sichtbarer
 * Unterschied).
 *
 * Fail-closed: Fehlt der Browser oder bleibt eine indexierbare Route
 * leer, schlägt der Build fehl. So kann keine weitere Meta-only-Seite
 * unbemerkt produktiv ausgeliefert werden.
 *
 * Usage: node scripts/prerender.mjs
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isNoindexRoute, validatePrerenderOutput } from './check-prerender-output.mjs';
import {
  PRERENDER_BROWSER_RESTART_INTERVAL,
  shouldAbortPrerenderRequest,
} from './lib/prerenderResilience.mjs';
import { seoRoutes } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const PORT = 4899;

// Nur diese externen Hosts dürfen im Prerender geladen werden
// (Blog-Artikel kommen zur Laufzeit aus der Content-API).
const ALLOWED_EXTERNAL_HOSTS = new Set(['app.healio.de']);

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.txt': 'text/plain',
  '.pdf': 'application/pdf',
};

// Gegenstueck zum Rewrite in vercel.json: Die Seiten rufen die
// Content-API same-origin auf. In der Produktion reicht Vercel das an
// app.healio.de weiter, hier tut es dieser Server. Ohne den Proxy
// bekaeme der Prerender statt JSON die index.html zurueck und wuerde
// den Leer-Zustand der Blogseiten fest einbacken.
const API_ORIGIN = process.env.VITE_APP_API_URL || 'https://app.healio.de';

function serveDist() {
  const server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

    if (urlPath.startsWith('/api/')) {
      try {
        const upstream = await fetch(`${API_ORIGIN}${req.url}`, {
          headers: { accept: 'application/json' },
        });
        const body = Buffer.from(await upstream.arrayBuffer());
        res.writeHead(upstream.status, {
          'Content-Type': upstream.headers.get('content-type') || 'application/json',
        });
        res.end(body);
      } catch (err) {
        console.warn(`[prerender] API-Proxy fehlgeschlagen (${urlPath}): ${err.message}`);
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end('{}');
      }
      return;
    }

    let filePath = path.join(distDir, urlPath);
    if (!filePath.startsWith(distDir)) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath) && path.extname(urlPath)) {
      console.error(`[prerender] static asset missing: ${urlPath}`);
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html'); // SPA-Fallback
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

function routeToHtmlPath(routePath) {
  return routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

async function prerenderRoute(page, routePath) {
  await page.goto(`http://127.0.0.1:${PORT}${routePath}`, { waitUntil: 'networkidle0', timeout: 45000 });
  // Auf gerenderten React-Inhalt warten
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root && root.children.length > 0;
  }, { timeout: 15000 });
  // Einmal komplett durchscrollen, damit whileInView-Animationen
  // (framer-motion) ausgelöst werden und der Inhalt nicht mit
  // opacity:0 im Snapshot landet.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  return page.evaluate(() => document.getElementById('root').innerHTML);
}

async function createPage(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Externe Requests blocken: keine Analytics-Hits, keine Widgets,
  // keine CDN-Abhängigkeit im Build. Content-API bleibt erlaubt.
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const requestUrl = new URL(req.url());
    if (shouldAbortPrerenderRequest({
      hostname: requestUrl.hostname,
      pathname: requestUrl.pathname,
      resourceType: req.resourceType(),
      allowedExternalHosts: ALLOWED_EXTERNAL_HOSTS,
    })) {
      req.abort();
    } else {
      req.continue();
    }
  });

  return page;
}

async function renderRouteWithRetry({ getBrowser, restartBrowser }, routePath, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    let page;
    const pageErrors = [];
    let restartAfterFailure = false;

    try {
      page = await createPage(getBrowser());
      page.on('pageerror', (error) => pageErrors.push(error.message));
      return await prerenderRoute(page, routePath);
    } catch (error) {
      const details = pageErrors.length > 0 ? `; Browserfehler: ${pageErrors.join(' | ')}` : '';
      lastError = new Error(`${error.message}${details}`);
      restartAfterFailure = true;
      if (attempt < attempts) {
        console.warn(`[prerender] ${routePath}: Versuch ${attempt} fehlgeschlagen, frischer Browser folgt.`);
      }
    } finally {
      await page?.close().catch(() => {});
    }

    // Auch nach dem letzten Fehlversuch neu starten: Noindex-Routen dürfen
    // übersprungen werden, aber keinen defekten Browser an die Folgeroute vererben.
    if (restartAfterFailure) {
      await restartBrowser();
    }
  }

  throw lastError;
}

async function launchBrowser() {
  // 1. Normales puppeteer (lokal, laedt eigenen Chrome)
  try {
    const puppeteer = (await import('puppeteer')).default;
    return await puppeteer.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    });
  } catch (err) {
    console.warn(`[prerender] puppeteer-Start fehlgeschlagen (${err.message.split('\n')[0]}), versuche @sparticuz/chromium ...`);
  }
  // 2. CI-Fallback (Vercel/Lambda): gepacktes Chromium mit allen Systemlibs
  try {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = (await import('puppeteer-core')).default;
    chromium.setGraphicsMode = false;
    return await puppeteerCore.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    });
  } catch (err) {
    console.warn(`[prerender] @sparticuz/chromium-Start fehlgeschlagen (${err.message.split('\n')[0]}).`);
    return null;
  }
}

async function main() {
  let browser = await launchBrowser();
  if (!browser) {
    throw new Error('Kein Browser verfügbar; indexierbare Seiten würden Meta-only bleiben.');
  }

  let renderedSinceBrowserRestart = 0;
  const restartBrowser = async () => {
    await browser.close().catch(() => {});
    browser = await launchBrowser();
    if (!browser) {
      throw new Error('Browser-Neustart fehlgeschlagen; Prerender wird sicher abgebrochen.');
    }
    renderedSinceBrowserRestart = 0;
  };
  const getBrowser = () => browser;

  const server = await serveDist();
  let ok = 0;
  let failed = 0;
  const fatalErrors = [];

  try {
    for (const route of seoRoutes) {
      const htmlPath = routeToHtmlPath(route.path);
      if (!fs.existsSync(htmlPath)) {
        failed += 1;
        fatalErrors.push(`${route.path}: HTML-Datei fehlt`);
        console.error(`[prerender] FEHLER bei ${route.path}: HTML-Datei fehlt.`);
        continue;
      }

      const html = fs.readFileSync(htmlPath, 'utf-8');
      const marker = '<div id="root"></div>';
      if (!html.includes(marker)) {
        // Blog-Artikel werden schon von generate-seo-pages.mjs mit
        // Artikel-Inhalt vorbefüllt und vom Abschlusscheck validiert.
        console.log(`[prerender] übersprungen (bereits vorbefüllt): ${route.path}`);
        continue;
      }

      try {
        if (renderedSinceBrowserRestart >= PRERENDER_BROWSER_RESTART_INTERVAL) {
          await restartBrowser();
        }
        // Eine neue Page pro Route verhindert, dass Router-, Sprach- oder
        // Animationszustand von der vorherigen Route den Snapshot beeinflusst.
        const inner = await renderRouteWithRetry({ getBrowser, restartBrowser }, route.path);
        if (!inner || inner.length < 500) {
          throw new Error(`Inhalt zu kurz (${inner ? inner.length : 0} Zeichen)`);
        }
        fs.writeFileSync(htmlPath, html.replace(marker, `<div id="root">${inner}</div>`));
        renderedSinceBrowserRestart += 1;
        ok += 1;
        console.log(`[prerender] ok: ${route.path} (${Math.round(inner.length / 1024)} kB)`);
      } catch (err) {
        failed += 1;
        const message = err.message.split('\n')[0];
        if (isNoindexRoute(route)) {
          console.warn(`[prerender] WARNUNG bei noindex-Route ${route.path}: ${message}`);
        } else {
          fatalErrors.push(`${route.path}: ${message}`);
          console.error(`[prerender] FEHLER bei ${route.path}: ${message}`);
        }
      }
    }
  } finally {
    await browser.close().catch(() => {});
    await new Promise((resolve) => server.close(resolve));
  }

  const validation = validatePrerenderOutput({ distDir });
  fatalErrors.push(...validation.errors);

  if (fatalErrors.length > 0) {
    const uniqueErrors = [...new Set(fatalErrors)];
    throw new Error(
      `Prerender-Ausgabe unvollständig (${uniqueErrors.length} Fehler):\n- ${uniqueErrors.join('\n- ')}`,
    );
  }

  console.log(`[prerender] fertig: ${ok} Seiten gerendert, ${failed} fehlgeschlagen.`);
  console.log(
    `[prerender-check] ok: ${validation.checkedIndexable} indexierbare und ${validation.checkedNoindex} noindex-Routen geprüft.`,
  );
}

main().catch((err) => {
  console.error(`[prerender] BUILD ABBRUCH: ${err.message}`);
  process.exitCode = 1;
});
