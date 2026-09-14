import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

// Regression: selecting a tier must update the premium AND benefit budget in
// the bonus example. This test never opens a provider or sends form data.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({ root, logLevel: 'silent', server: { host: '127.0.0.1', port: 0 } });
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
  const open = async (route) => {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#tarifwahl');
    await page.evaluate(() => { document.querySelector('#bonus-calculator').closest('details').open = true; });
  };
  const choose = async (code) => {
    await page.evaluate((tariff) => [...document.querySelectorAll('#tarifwahl button')].find((button) => button.textContent.includes(tariff)).click(), code);
    await page.waitForFunction((tariff) => document.querySelector('#bonus-calculator').textContent.includes(`(${tariff})`), {}, code);
  };
  const read = () => page.evaluate(() => {
    const bonus = document.querySelector('#bonus-calculator');
    const valueFor = (label) => [...bonus.querySelectorAll('span')].find((el) => el.textContent === label)?.parentElement?.lastElementChild?.textContent;
    return {
      text: bonus.textContent,
      monthly: bonus.querySelector('button[aria-label^="Monatlichen Tarifbeitrag"]')?.textContent,
      annual: valueFor('= Jahresbeitrag:'),
      potential: valueFor('Erreichtes Zuschusspotenzial:'),
      eligible: valueFor('Für diesen Beitrag anrechenbar:'),
      budget: valueFor('Dein Gesundheitsbudget dafür (2 Jahre)'),
      handoffs: [...document.querySelectorAll('[data-healio-ambulant="calculator-handoff"]')].map((node) => node.textContent),
      tariffsParam: new URL(document.querySelector('#tarifwahl a[target="_blank"]').href).searchParams.get('tariffs'),
    };
  });

  await page.setViewport({ width: 1440, height: 960 });
  await open('/ambulant');
  const initial = await read();
  await page.click('#bonus-calculator button[aria-label^="Monatlichen Tarifbeitrag"]');
  await page.keyboard.press('Enter');
  for (const [code, monthly, annual, budget] of [
    ['AP5', '14,14', '169,68 €', '1.400'],
    ['AP7', '23,10', '277,20 €', '2.000'],
    ['AP9', '37,95', '455,40 €', '2.600'],
    ['AP1', '44,13', '529,56 €', '3.000'],
  ]) {
    await choose(code);
    const current = await read();
    assert(current.monthly.includes(monthly), `${code}: example premium must follow the selection.`);
    assert.equal(current.annual, annual);
    assert(current.budget.includes(budget), `${code}: benefit budget must follow the selection.`);
    assert.equal(current.potential, initial.potential, 'Changing tariff must preserve the activity selection.');
    assert(current.handoffs.length === 3 && current.handoffs.every((text) => text.includes(code) && text.includes('dieselbe Stufe')), 'Every provider CTA must explain which tier to choose again.');
    assert.equal(current.tariffsParam, '', 'Do not invent undocumented provider tariff identifiers.');
  }

  // Personal premiums are explicit user input, not another published example.
  await page.click('#bonus-calculator button[aria-label^="Monatlichen Tarifbeitrag"]');
  await page.type('#bonus-calculator input[aria-label="Monatlichen Tarifbeitrag eingeben"]', '30,50');
  await page.keyboard.press('Enter');
  await choose('AP5');
  const custom = await read();
  assert.equal(custom.annual, '366 €', 'Typing a decimal comma must preserve cents instead of turning 30,50 into 3050.');
  assert(custom.text.includes('Dein eingegebener Beitrag bleibt erhalten.'));
  assert.equal(custom.potential, initial.potential);
  await page.evaluate(() => [...document.querySelectorAll('#bonus-calculator button')].find((button) => button.textContent.trim() === 'Auswahl zurücksetzen').click());
  const reset = await read();
  assert(reset.monthly.includes('14,14'), 'Reset must restore the currently selected tariff example.');
  assert.equal(reset.potential, '0 €');
  assert.equal(reset.eligible, '0 €');

  await open('/en/outpatient');
  await choose('AP7');
  const english = await page.$eval('#bonus-calculator', (node) => node.textContent);
  assert(english.includes('AP7') && english.includes('23.10') && english.includes('2,000'));
  assert(english.includes('pick the same tier') && english.includes('German'));

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
  console.log('Ambulant-Auswahl: vier Tarifstufen, Bonusbudget/Beitrag, eigene Eingaben, Rücksetzen, DE/EN und mobile Hero-CTAs bestanden.');
} finally {
  await browser?.close();
  await server.close();
}
