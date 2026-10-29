import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

// Real navigation and calculator interactions; no provider or form submissions.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({ root, logLevel: 'silent', server: { host: '127.0.0.1', port: 0, watch: { ignored: ['**/dist/**'] } } });
let browser;
try {
  await server.listen();
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) request.continue();
    else request.abort();
  });
  await page.evaluateOnNewDocument(() => localStorage.setItem('healio:consent:v2', JSON.stringify({
    version: 2, decided: true, necessary: true,
    preferences: { analytics: false, marketing: false, google_calendar: false, maps: false, openai: false },
    source: 'settings', updatedAt: '2026-10-29T12:00:00.000Z',
  })));
  const go = async (route) => {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('h1');
  };
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewport({ width, height: 960 });
    await go('/ambulant');
    const geometry = await page.evaluate(() => {
      const feature = document.getElementById('bonus-rechner');
      const overview = document.querySelector('[data-ambulant-overview]')
        || [...document.querySelectorAll('h2')].find((node) => node.textContent === 'Auf einen Blick');
      return {
        feature: feature.getBoundingClientRect().top,
        overview: overview.getBoundingClientRect().top,
        mounted: Boolean(document.getElementById('bonus-calculator')),
        width: document.documentElement.scrollWidth,
      };
    });
    assert(geometry.feature < geometry.overview, `Bonus entry must precede overview at ${width}px.`);
    assert.equal(geometry.mounted, false, 'Closed calculator must not mount during initial load.');
    assert(geometry.width <= width + 1, `Horizontal overflow at ${width}px.`);
    const nav = await page.$eval('[data-bonus-calculator-link="desktop"]', (node) => ({
      visible: Boolean(node.getClientRects().length),
      right: node.getBoundingClientRect().right,
    }));
    if (nav.visible) assert(nav.right <= width, `Bonus navigation outside viewport at ${width}px.`);
    console.log(`Bonus placement and width passed: ${width}px.`);
  }

  // Desktop entry from a different page opens and focuses the calculator.
  await go('/zahn');
  await page.click('[data-bonus-calculator-link="desktop"]');
  await page.waitForSelector('#bonus-calculator', { visible: true });
  assert(page.url().endsWith('/ambulant#bonus-rechner'));
  assert(await page.$eval('#bonus-rechner details', (node) => node.open));
  assert(await page.$eval('#bonus-rechner summary', (node) => node === document.activeElement));

  // Closing retains values. Repeating the same navigation reopens the panel.
  await page.click('#bonus-calculator button[aria-label="Schutzimpfung: Anzahl erhöhen"]');
  const count = () => page.$eval('#bonus-calculator button[aria-label="Schutzimpfung: Anzahl erhöhen"]', (node) => node.previousElementSibling.textContent);
  const before = await count();
  await page.click('#bonus-rechner summary');
  await page.waitForFunction(() => !document.querySelector('#bonus-rechner details').open);
  await page.click('[data-bonus-calculator-link="desktop"]');
  await page.waitForFunction(() => document.querySelector('#bonus-rechner details').open);
  assert.equal(await count(), before, 'Closing must retain the visitor’s activity choices.');

  // Mobile entry closes the menu and restores page scrolling.
  await page.setViewport({ width: 390, height: 844 });
  await go('/');
  await page.click('header button[aria-controls="mobile-navigation"]');
  await page.waitForSelector('[data-bonus-calculator-link="mobile"]', { visible: true });
  await page.click('[data-bonus-calculator-link="mobile"]');
  await page.waitForSelector('#bonus-calculator', { visible: true });
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');

  // English and legacy shared links resolve to the same working calculator.
  await go('/en/outpatient#bonus-rechner');
  await page.waitForSelector('#bonus-calculator', { visible: true });
  assert.match(await page.$eval('#bonus-rechner', (node) => node.textContent), /Select your activities/);
  await go('/ambulant#bonus-calculator');
  await page.waitForSelector('#bonus-calculator', { visible: true });
  await go('/ambulant?src=bonus-check');
  assert.equal(await page.$('#bonus-rechner'), null, 'Bonuscheck continuation keeps its focused tariff flow.');
  assert.deepEqual(errors, [], 'Bonus entry must not produce runtime errors.');
  console.log('Bonus navigation, lazy mount, retained inputs, English and legacy links passed.');
} finally {
  await browser?.close();
  await server.close();
}
