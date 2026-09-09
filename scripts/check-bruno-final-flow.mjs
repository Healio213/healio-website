import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(`${root}/package.json`);
const { createServer } = require('vite');
const puppeteer = require('puppeteer');
const server = await createServer({ root, logLevel: 'silent', server: { host: '127.0.0.1', port: 0, watch: { ignored: ['**/dist/**'] } } });
let browser;
try {
  await server.listen();
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = new URL(request.url());
    const type = request.resourceType();
    const blockedDataRequest = request.method() !== 'GET'
      || ['xhr', 'fetch', 'ping', 'eventsource', 'websocket'].includes(type)
      || /^\/(?:api(?:\/|$)|_vercel\/|cdn-cgi\/rum)/.test(url.pathname);
    const publicAsset = (url.hostname === 'fonts.googleapis.com' && type === 'stylesheet')
      || (url.hostname === 'fonts.gstatic.com' && type === 'font')
      || (url.hostname === 'horizons-cdn.hostinger.com' && type === 'image');
    if (!blockedDataRequest && (url.origin === origin || url.protocol === 'data:' || publicAsset)) request.continue();
    else request.abort();
  });
  await page.evaluateOnNewDocument(() => localStorage.setItem('healio:consent:v2', JSON.stringify({ version: 2, decided: true, preferences: { analytics: false, google_calendar: false, maps: false, openai: false }, updatedAt: '2026-09-08T10:00:00.000Z' })));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const settleRealFonts = async () => {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const loaded = [...document.fonts].filter(font => font.status === 'loaded').map(font => font.family.replaceAll('"', ''));
      return loaded.includes('Inter') && loaded.includes('Manrope');
    }, { timeout: 10_000 });
    await new Promise(resolve => setTimeout(resolve, 1800));
  };
  const assertFits = async (label) => {
    const layout = await page.evaluate(() => ({ viewport: innerWidth, documentWidth: document.documentElement.scrollWidth }));
    assert(layout.documentWidth <= layout.viewport + 1, `${label}: document ${layout.documentWidth}px exceeds viewport ${layout.viewport}px`);
  };
  for (const width of [1440, 390, 320]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${origin}/schwangerschaft?src=reel-f05#fragen`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-funnel-topic="pregnancy"]', { timeout: 8000 }).catch(async error => {
      throw new Error(`${error.message}; local JS errors: ${JSON.stringify(errors)}; body: ${await page.$eval('body', node => node.innerText.slice(0, 500))}`);
    });
    await settleRealFonts();
    assert(await page.evaluate(() => [...document.fonts].some(font => font.status === 'loaded' && font.family.replaceAll('"', '') === 'Baloo 2')), 'The pregnancy page must be checked with its loaded public display font.');
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    assert(await page.$('#fragen [data-product-link]'), 'The reader needs a direct tariff CTA after the FAQ, without returning to the top.');
    const links = await page.$$eval('[data-product-link]', nodes => nodes.map(node => ({ href: node.getAttribute('href'), text: node.textContent })));
    assert.equal(links.length, 2);
    assert(links.every(link => link.href === '/ambulant?src=reel-f05#tarifwahl' && link.text === links[0].text));
    const schemas = await page.$$eval('script[type="application/ld+json"]', nodes => nodes.flatMap(node => {
      const json = JSON.parse(node.textContent);
      return Array.isArray(json) ? json : json['@graph'] || [json];
    }));
    const questions = await page.$$eval('#fragen details', nodes => nodes.map(node => ({ question: node.querySelector('summary').textContent, answer: node.querySelector('p').textContent })));
    const faq = schemas.filter(item => item['@type'] === 'FAQPage').flatMap(item => item.mainEntity);
    assert.deepEqual(faq.map(item => ({ question: item.name, answer: item.acceptedAnswer.text })), questions, 'Visible FAQ and machine-readable answers must agree.');
    assert(questions.some(item => /3\.000/.test(item.question)), 'The video budget must have an accessible explanation.');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.$eval('#fragen [data-product-link]', node => node.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.locator('#fragen [data-product-link]').click();
    await page.waitForSelector('#tarifwahl');
    await settleRealFonts();
    assert.equal(page.url(), `${origin}/ambulant?src=reel-f05#tarifwahl`);
    assert(await page.$('#bonus-topic-continuation-heading'));
    const hero = await page.$eval('section[aria-labelledby="hero-heading"]', node => node.textContent);
    assert.doesNotMatch(hero, /effektiv ab 0|ohne Wartezeit/i, 'The topic entry must not imply automatic pregnancy coverage.');
    await assertFits(`Campaign Ambulant at ${width}px with real fonts`);

    await page.goto(`${origin}/ambulant`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#tarifwahl');
    await settleRealFonts();
    await assertFits(`Ordinary Ambulant at ${width}px with real fonts`);
  }
  assert.deepEqual(errors, []);
  console.log('Final Bruno flow passed with loaded Inter/Manrope/Baloo fonts: matching lower CTA, visible/structured budget FAQ, actual direct tariff transition, neutral topic hero, campaign and ordinary Ambulant without overflow at 1440/390/320px.');
} finally {
  await browser?.close();
  await server.close();
}
