import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

// Regression: selecting a tier must update the premium AND benefit budget in
// the tariff selection. This test never opens a provider or sends form data.
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
    preferences: { analytics: false, calendly: false, maps: false, openai: false },
    source: 'settings', updatedAt: '2026-09-14T12:00:00.000Z',
  })));
  // Frank 01.11.2026: Kein Bonusrechner mehr vor der Tarifwahl. Er steht
  // zugeklappt am Ende der IKK-Strecke, damit „Bonusrechner“ im Kopfbereich
  // weiter funktioniert. Geprüft wird die Tarifwahl selbst: Stufe, Beitrag
  // nach Alter, Budget und Rechner-Link.
  const open = async (route) => {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#tarifwahl');
    const placement = await page.evaluate(() => {
      const bonus = document.querySelector('#bonus-rechner');
      return bonus && {
        afterTariffs: bonus.getBoundingClientRect().top > document.querySelector('#tarifwahl').getBoundingClientRect().bottom,
        open: bonus.querySelector('details').open,
      };
    });
    assert.deepEqual(placement, { afterTariffs: true, open: false }, 'The collapsed bonus calculator follows the tariff selection.');
  };
  const choose = async (code) => {
    await page.evaluate((tariff) => [...document.querySelectorAll('#tarifwahl button')].find((button) => button.textContent.includes(tariff)).click(), code);
    await page.waitForFunction((tariff) => document.querySelector('#tarifwahl button[aria-pressed="true"]')?.textContent.includes(tariff), {}, code);
  };
  const read = () => page.evaluate(() => ({
    text: document.querySelector('#tarifwahl').textContent,
    agePrice: document.querySelector('[data-healio-ambulant="age-price"]').textContent,
    handoffs: [...document.querySelectorAll('[data-healio-ambulant="calculator-handoff"]')].map((node) => node.textContent),
    tariffsParam: new URL(document.querySelector('#tarifwahl a[href^="https://insurances-online.levelnine.biz/"]').href).searchParams.get('tariffs'),
  }));

  await page.setViewport({ width: 1440, height: 960 });
  await open('/ambulant');
  // Ohne Geburtsjahr nie ein Pauschalbetrag: Spanne über alle Altersgruppen.
  for (const [code, min, max, budget] of [
    ['AP5', '6,79', '21,00', '1.400'],
    ['AP7', '10,13', '33,13', '2.000'],
    ['AP9', '18,08', '43,91', '2.600'],
    ['AP1', '20,76', '50,76', '3.000'],
  ]) {
    await choose(code);
    const current = await read();
    assert(current.agePrice.includes(min) && current.agePrice.includes(max) && current.agePrice.includes('bis'), `${code}: without a year of birth the tariff card must show the price range.`);
    assert(current.text.includes(budget), `${code}: benefit budget must follow the selection.`);
    assert(current.handoffs.length === 2 && current.handoffs.every((text) => text.includes(code) && text.includes('dieselbe Stufe')), 'Every calculator handoff must explain which tier to choose again (tier selection, final box).');
    assert.equal(current.tariffsParam, `SDK${code}@`, 'The calculator link must preselect the chosen tier (Level Nine identifier SDKAP5@ to SDKAP1@).');
  }

  // Mit Geburtsjahr zählt das erreichte Alter (Kalenderjahr minus Geburtsjahr).
  await choose('AP5');
  const year = new Date().getFullYear();
  await page.type('#ambulant-geburtsjahr', String(year - 43));
  await page.waitForFunction(() => document.querySelector('[data-healio-ambulant="age-price"]').textContent.includes('bis') === false);
  assert((await read()).agePrice.includes('14,14'), 'AP5 at reached age 43 must show the 41 to 50 group premium.');
  await choose('AP1');
  assert((await read()).agePrice.includes('44,13'), 'AP1 at reached age 43 must show 44,13.');

  await open('/en/outpatient');
  await choose('AP7');
  const english = await read();
  assert(english.text.includes('AP7') && english.text.includes('2,000'));
  assert(english.handoffs.every((text) => text.includes('pick the same tier') && text.includes('German')));

  for (const width of [390, 320]) {
    await page.setViewport({ width, height: 740 });
    await open('/ambulant');
    await page.evaluate(() => { window.scrollTo(0, 0); });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const layout = await page.evaluate(() => {
      const cta = document.querySelector('#hero-heading').closest('section').querySelector('a');
      const rect = cta.getBoundingClientRect();
      const walker = document.createTreeWalker(document.querySelector('#hero-heading'), NodeFilter.SHOW_TEXT);
      let clippedHeading = false;
      while (walker.nextNode()) {
        const range = document.createRange();
        range.selectNodeContents(walker.currentNode);
        if ([...range.getClientRects()].some((box) => box.left < 0 || box.right > innerWidth)) clippedHeading = true;
      }
      return { bottom: rect.bottom, top: rect.top, height: innerHeight, overflow: document.documentElement.scrollWidth > innerWidth, opacity: getComputedStyle(cta.parentElement).opacity, clippedHeading };
    });
    assert(layout.top >= 0 && layout.bottom <= layout.height, `${width}px: hero CTA must be visible without scrolling.`);
    assert.equal(layout.opacity, '1');
    assert.equal(layout.overflow, false);
    assert.equal(layout.clippedHeading, false, `${width}px: hero text must not be clipped by overflow-hidden.`);
  }
  assert.deepEqual(errors, []);
  console.log('Ambulant-Auswahl: vier Tarifstufen, Budget/Beitrag nach Alter, Rechner-Link, DE/EN und mobile Hero-CTAs bestanden.');
} finally {
  await browser?.close();
  await server.close();
}
