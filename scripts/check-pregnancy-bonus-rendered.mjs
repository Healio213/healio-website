import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const visualAssets = process.env.PREGNANCY_VISUAL_ASSETS === '1';
const server = await createServer({ root, logLevel: 'error', server: { host: '127.0.0.1', port: 0, watch: { ignored: ['**/dist/**'] } } });
let browser;
try {
  await server.listen();
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('healio:consent:v2', JSON.stringify({
      version: 2, decided: true, necessary: true,
      preferences: { analytics: false, calendly: false, maps: false, openai: false },
      source: 'settings', updatedAt: '2026-09-08T10:00:00.000Z',
    }));
  });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = request.url();
    const host = new URL(url).hostname;
    const publicAsset = visualAssets && (
      (host === 'fonts.googleapis.com' && request.resourceType() === 'stylesheet')
      || (host === 'fonts.gstatic.com' && request.resourceType() === 'font')
      || (host === 'horizons-cdn.hostinger.com' && request.resourceType() === 'image')
    );
    if (url.startsWith(origin) || url.startsWith('data:') || publicAsset) request.continue();
    else request.abort(); // No provider, insurer or tracking requests in this test.
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${origin}/schwangerschaft?src=reel-f05`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('input[name="checkups"]');
  // The header must enter the protection section, not skip ahead to the bonus.
  const protectionHeader = await page.$('header a[href="/schwangerschaft?src=reel-f05#zusatzschutz"]');
  assert(protectionHeader, 'Pregnancy header must preserve the source and lead to protection first');
  await protectionHeader.click();
  await page.waitForFunction(() => location.hash === '#zusatzschutz');
  assert(await page.$('#zusatzschutz'), 'The header anchor must have a real destination');
  assert.equal(await page.$('[aria-label="Sprachpanel mit Nita öffnen"]'), null, 'No voice launcher may mount on the pregnancy funnel');
  assert.equal(await page.$('[data-healio-whatsapp="floating"]'), null, 'No WhatsApp launcher may mount on the pregnancy funnel');
  await page.evaluate(() => window.scrollTo(0, 0));
  if (visualAssets) {
    await page.evaluate(() => document.fonts.ready);
    const assets = await page.evaluate(() => ({
      logo: Boolean(document.querySelector('header img')?.naturalWidth),
      fonts: [...document.fonts].filter(font => font.status === 'loaded').map(font => font.family),
      headingFont: getComputedStyle(document.querySelector('h1')).fontFamily,
      headingClass: document.querySelector('h1').className,
      fontRules: [...document.styleSheets].flatMap(sheet => {
        try { return [...sheet.cssRules].filter(rule => rule.selectorText === '.font-friendly').map(rule => rule.cssText); }
        catch { return []; }
      }),
      pageImages: [...document.querySelectorAll('main section img')].every(img => img.complete && img.naturalWidth > 0),
    }));
    console.log('Public visual assets:', assets);
    assert(assets.logo && assets.pageImages && assets.fonts.some(font => font.includes('Baloo')), 'Visual review requires the real logo, figures and friendly font');
  }
  // Native test clicks must not race the site's animated anchor scrolling.
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  assert(await page.$('input[name="checkups"]'), 'Missing individual check on the pregnancy route');
  assert.equal(await page.$$eval('h1', nodes => nodes.length), 1);
  assert.equal(await page.$eval('link[rel="canonical"]', node => node.href), 'https://healio.de/schwangerschaft');
  await page.$$eval('script[type="application/ld+json"]', nodes => nodes.forEach(node => JSON.parse(node.textContent)));
  const storage = () => page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }));
  const initialStorage = await storage();
  const initial = await page.$$eval('input', nodes => nodes.filter(node => node.name).map(node => ({ name: node.name, value: node.value, checked: node.checked, type: node.type })));
  assert(initial.every(input => input.type !== 'checkbox' || !input.checked), 'No evidence may be assumed at entry');
  assert(['', '0'].includes(initial.find(input => input.name === 'checkups')?.value));
  assert.equal(initial.find(input => input.name === 'eligiblePaidPremium')?.value, '');
  const output = label => page.$eval(`output[aria-label="${label}"]`, node => Number(node.textContent.replace(/EUR|€/g, '').trim().replace(/\./g, '').replace(',', '.')));
  assert(await page.$('#bonus-example'), 'The illustration must have a compact expandable entry');
  assert.equal(await page.$eval('#bonus-example', node => node.open), false, 'Keep the reading flow compact on entry');
  assert.equal(await page.$('input[name="sameYear"]'), null, 'An illustration must not demand a personal declaration');
  assert.equal(await page.$eval('label[for="bmi"]', node => node.textContent), 'BMI im passenden Bereich');
  assert.equal(await output('Zuschusspotenzial'), 0, 'An empty example must not assume earned activities');
  // Use the real CTA and then the native accordion, not DOM-forced open state.
  await page.locator('#bonus-example > summary').click();
  await page.waitForFunction(() => document.querySelector('#bonus-example').open);
  const toggleExample = async () => {
    await page.$eval('#bonus-example > summary', node => node.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.locator('#bonus-example > summary').click();
  };
  const fill = async (name, value) => {
    await page.click(`input[name="${name}"]`, { clickCount: 3 });
    await page.$eval(`input[name="${name}"]`, node => node.select());
    await page.keyboard.press('Backspace');
    await page.type(`input[name="${name}"]`, value);
    assert.equal(await page.$eval(`input[name="${name}"]`, node => node.value), value, `Input ${name} must reflect the replacement value`);
  };
  await fill('checkups', '10');
  for (const name of ['course', 'studio', 'bmi', 'bloodPressure', 'dentalFirst', 'dentalSecond']) await page.click(`input[name="${name}"]`);
  assert.equal(await output('Zuschusspotenzial'), 630);
  assert.equal(await output('Geldbonus'), 210);
  assert.match(await page.$eval('#bonus-example', node => node.textContent), /eine Person.*Bonusjahr 2026/, 'The single-person, single-year scenario must be explicit without a declaration');
  assert.equal(await page.$eval('#bonus-conditions', node => node.open), false);
  await page.$eval('#bonus-conditions > summary', node => node.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.locator('#bonus-conditions > summary').click();
  const conditions = await page.$eval('#bonus-conditions', node => node.textContent);
  assert.match(conditions, /ärztlich beurteilt/);
  assert.match(conditions, /Nachweise/);
  assert.match(conditions, /bestätigt werden/);
  assert.match(conditions, /tatsächlich gezahlt/);
  await toggleExample();
  assert.equal(await page.$eval('#bonus-example', node => node.open), false);
  await toggleExample();
  assert.equal(await output('Zuschusspotenzial'), 630, 'Collapsing must preserve the current local example');
  await fill('eligiblePaidPremium', '132,39');
  assert.equal(await output('Anrechenbarer Zuschuss'), 132.39);
  assert.equal(await output('Verbleibender Eigenanteil'), 0);
  await fill('eligiblePaidPremium', '800');
  assert.equal(await output('Anrechenbarer Zuschuss'), 630);
  assert.equal(await output('Verbleibender Eigenanteil'), 170);
  for (const name of ['course', 'studio']) {
    await page.$eval(`input[name="${name}"]`, node => node.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.locator(`input[name="${name}"]`).click();
    await page.waitForFunction(name => !document.querySelector(`input[name="${name}"]`).checked, { timeout: 5000 }, name);
  }
  assert.equal(await output('Zuschusspotenzial'), 330, 'Status values require a regular activity');
  assert.equal(await storage(), initialStorage, 'Personal selections must stay out of browser storage');
  const next = await page.$('a[href="/ambulant?src=reel-f05#tarifwahl"]');
  assert(next, 'Onward link must preserve only neutral campaign source');
  const targetDir = process.env.PREGNANCY_SCREENSHOT_DIR;
  if (targetDir) await fs.mkdir(targetDir, { recursive: true });
  for (const width of [1440, 390, 320]) {
    await page.setViewport({ width, height: width === 1440 ? 1000 : 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Horizontal overflow at ${width}px`);
    if (targetDir) {
      await page.screenshot({ path: path.join(targetDir, `pregnancy-${width}.png`), fullPage: true });
      await page.screenshot({ path: path.join(targetDir, `pregnancy-hero-${width}.png`) });
      await page.$eval('#bonus-check', node => node.scrollIntoView());
      await page.screenshot({ path: path.join(targetDir, `pregnancy-check-${width}.png`) });
    }
  }
  await page.goto(`${origin}/schwangerschaft?src=reel-f05#fragen`, { waitUntil: 'networkidle0' });
  // A hash change is same-document navigation; only a real reload clears state.
  await page.reload({ waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  assert(await page.$('#fragen'), 'The ManyChat question button must have a real destination');
  assert(await page.$('#fragen a[href="/kontakt"]'), 'The FAQ must offer voluntary real contact');
  assert.equal(await page.$eval('#bonus-example', node => node.open), false, 'Reload returns to the compact entry');
  assert.equal(await output('Zuschusspotenzial'), 0, 'Reload must not retain example choices');
  await toggleExample();
  await fill('eligiblePaidPremium', '1.200,00');
  assert.equal(await page.$eval('input[name="eligiblePaidPremium"]', node => node.getAttribute('aria-invalid')), 'true');
  assert.equal(await page.$eval('output[aria-label="Anrechenbarer Zuschuss"]', node => node.textContent), 'Noch offen', 'Invalid premium must not be treated as a paid amount');
  assert.deepEqual(errors, []);
  // The suppression is route-local; the existing site contact entry points stay.
  await page.goto(`${origin}/leistungen`, { waitUntil: 'networkidle0' });
  assert(await page.$('[aria-label="Sprachpanel mit Nita öffnen"]'), 'The normal site must retain its voice launcher');
  assert(await page.$('[data-healio-whatsapp="floating"]'), 'The normal site must retain its WhatsApp launcher');
  assert.deepEqual(errors, []);
  console.log('Pregnancy rendered flow passed: collapsed illustration, native CTA/toggle, conditions, empty/630/partial/premium/status cases, no stored answers, links, schema, 1440/390/320px.');
} finally {
  await browser?.close();
  await server.close();
}
