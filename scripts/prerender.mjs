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
 * Fail-safe: Startet der Browser nicht (z. B. fehlende Systemlibs im
 * CI) oder scheitert eine einzelne Route, bleibt die jeweilige Seite
 * einfach Meta-only wie bisher; der Build schlägt NICHT fehl.
 *
 * Usage: node scripts/prerender.mjs
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
};

function serveDist() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let filePath = path.join(distDir, urlPath);
    if (!filePath.startsWith(distDir)) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
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
  const browser = await launchBrowser();
  if (!browser) {
    console.warn('[prerender] Kein Browser verfuegbar, Seiten bleiben Meta-only.');
    return;
  }

  const server = await serveDist();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Externe Requests blocken: keine Analytics-Hits, keine Widgets,
  // keine CDN-Abhängigkeit im Build. Content-API bleibt erlaubt.
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const host = new URL(req.url()).hostname;
    if (host === '127.0.0.1' || host === 'localhost' || ALLOWED_EXTERNAL_HOSTS.has(host)) {
      req.continue();
    } else {
      req.abort();
    }
  });

  let ok = 0;
  let failed = 0;
  for (const route of seoRoutes) {
    const htmlPath = routeToHtmlPath(route.path);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`[prerender] übersprungen (kein HTML): ${route.path}`);
      continue;
    }
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const marker = '<div id="root"></div>';
    if (!html.includes(marker)) {
      // Blog-Artikel werden schon von generate-seo-pages.mjs mit
      // Artikel-Inhalt vorbefuellt und behalten diesen.
      console.log(`[prerender] übersprungen (bereits vorbefüllt): ${route.path}`);
      continue;
    }
    try {
      const inner = await prerenderRoute(page, route.path);
      if (!inner || inner.length < 500) throw new Error(`Inhalt zu kurz (${inner ? inner.length : 0} Zeichen)`);
      fs.writeFileSync(htmlPath, html.replace(marker, `<div id="root">${inner}</div>`));
      ok += 1;
      console.log(`[prerender] ok: ${route.path} (${Math.round(inner.length / 1024)} kB)`);
    } catch (err) {
      failed += 1;
      console.warn(`[prerender] FEHLER bei ${route.path}: ${err.message.split('\n')[0]} (Seite bleibt Meta-only)`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] fertig: ${ok} Seiten gerendert, ${failed} fehlgeschlagen.`);
}

main().catch((err) => {
  console.warn(`[prerender] unerwarteter Fehler: ${err.message}, Build läuft weiter.`);
});
