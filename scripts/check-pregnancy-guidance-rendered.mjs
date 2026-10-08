import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const screenshotDir = process.env.PREGNANCY_GUIDANCE_SCREENSHOT_DIR;
const clinicNote = 'Nur wenn der Klinikschutz abgeschlossen ist, bevor die Schwangerschaft besteht oder bekannt ist. Für die Entbindung gilt eine Wartezeit von 8 Monaten.';
const forbiddenHost = /(?:^|\.)(?:google\.[a-z.]+|googleapis\.com|gstatic\.com|googletagmanager\.com|googleadservices\.com|google-analytics\.com|doubleclick\.net|facebook\.com|facebook\.net|fbcdn\.net|meta\.com)$/i;
const forbiddenText = /\b(?:kostenlos|gratis|garantiert|sicher|absichern|Kinderwunsch|NIPT|Nackenfalte\w*)\b|\b0\s*EUR\b|bereits schwanger trotzdem versichern|[–—]/i;
// Synthetic IDs make both marketing paths configured: their route gates,
// rather than absent credentials, must prevent every attempted request.
const server = await createServer({
  root, logLevel: 'error',
  define: {
    'import.meta.env.VITE_META_PIXEL_ID': JSON.stringify('111111111111111'),
    'import.meta.env.VITE_GOOGLE_ADS_ID': JSON.stringify('AW-111111111'),
    'import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL': JSON.stringify('testLead111'),
    'import.meta.env.VITE_GOOGLE_ADS_RECHNER_LABEL': JSON.stringify('testAntrag111'),
  },
  server: { host: '127.0.0.1', port: 0, watch: { ignored: ['**/dist/**'] } },
});
const requests = [];
const results = [];
let browser;

try {
  await server.listen();
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  if (screenshotDir) await fs.mkdir(screenshotDir, { recursive: true });

  for (const width of [320, 390, 1440]) {
    const page = await browser.newPage();
    const errors = [];
    const viewportRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewport({ width, height: width === 1440 ? 1000 : 844 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('healio:consent:v2', JSON.stringify({
        version: 2, decided: true, necessary: true,
        preferences: { analytics: true, marketing: true, google_calendar: false, maps: false, openai: false },
        source: 'settings', updatedAt: '2026-10-08T16:00:00.000Z',
      }));
      // Observe provider globals without defining a fake provider or changing its behavior.
      window.__pregnancyTrackingCalls = [];
      for (const name of ['gtag', 'fbq', '_fbq']) {
        let current;
        Object.defineProperty(window, name, {
          configurable: true,
          get: () => current,
          set: value => {
            current = typeof value === 'function' ? new Proxy(value, {
              apply(target, context, args) {
                window.__pregnancyTrackingCalls.push({ name, args });
                return Reflect.apply(target, context, args);
              },
            }) : value;
          },
        });
      }
    });
    await page.setRequestInterception(true);
    page.on('request', request => {
      const record = { url: request.url(), method: request.method(), type: request.resourceType() };
      requests.push(record);
      viewportRequests.push(record);
      // Record before blocking: an attempted provider request must fail the check.
      // No contact, application or third-party operation is sent by this test.
      if ((record.url.startsWith(origin) && record.method === 'GET' && !new URL(record.url).pathname.startsWith('/api/')) || record.url.startsWith('data:')) request.continue();
      else request.abort();
    });
    await page.goto(`${origin}/schwangerschaft?src=reel-f05`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#familien-einstieg button');
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });

    const snapshot = () => page.evaluate(() => ({
      local: { ...localStorage }, session: { ...sessionStorage }, cookies: document.cookie,
      url: location.href,
      dataLayer: (window.dataLayer || []).map(command => Array.from(command)),
      trackingCalls: window.__pregnancyTrackingCalls,
    }));
    const initial = await snapshot();
    const assertPrivacyUnchanged = async (label, calculatorHash = false) => {
      const current = await snapshot();
      if (calculatorHash) current.url = current.url.replace(/#bonus-example$/, '');
      assert.deepEqual(current, initial, `${label}: choices must not change storage, cookies, URL or provider queues at ${width}px`);
    };
    const assertNoOverflow = async label => {
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${label}: no horizontal overflow at ${width}px`);
      const geometry = await page.$$eval('#familien-einstieg button, #kasse-und-zusatzschutz article, aside[aria-labelledby="schon-schwanger-heading"]', nodes => nodes.filter(node => node.getClientRects().length).map(node => {
        const box = node.getBoundingClientRect();
        return { left: box.left, right: box.right };
      }));
      assert(geometry.every(box => box.left >= -1 && box.right <= width + 1), `${label}: guidance fits the screen at ${width}px`);
    };

    assert.equal(await page.$eval('#klinikschutz-fussnote', node => node.textContent.replace(/^\*\s*/, '')), clinicNote, 'Mandatory clinic footnote must be word-for-word');
    const layout = await page.evaluate(() => {
      const visible = node => Boolean(node?.getClientRects().length);
      const notice = document.querySelector('aside[aria-labelledby="schon-schwanger-heading"]');
      let previous = notice.previousElementSibling;
      while (previous && !visible(previous)) previous = previous.previousElementSibling;
      const entry = document.querySelector('#familien-einstieg');
      const table = document.querySelector('#kasse-und-zusatzschutz table');
      return {
        noticeFollowsHero: previous?.tagName === 'SECTION' && Boolean(previous.querySelector('h1')),
        entryBeforeCalculator: entry.nextElementSibling?.id === 'bonus-example',
        noticeVisible: visible(notice), entryVisible: visible(entry),
        tableVisible: visible(table), tableRows: table.querySelectorAll('tbody tr').length,
        mobileCards: [...document.querySelectorAll('#kasse-und-zusatzschutz article')].filter(visible).length,
        clinicMarkers: [...table.querySelectorAll('tbody tr')].map(row => row.querySelectorAll('sup').length),
        buttons: [...entry.querySelectorAll('button')].map(button => ({ text: button.textContent.trim(), height: button.getBoundingClientRect().height, width: button.getBoundingClientRect().width, pressed: button.getAttribute('aria-pressed') })),
      };
    });
    assert(layout.noticeFollowsHero && layout.noticeVisible, 'Already-pregnant box follows the visible hero directly');
    assert(layout.entryBeforeCalculator && layout.entryVisible, 'Stage question immediately precedes the existing calculator');
    assert.equal(layout.tableRows, 5);
    assert.equal(layout.tableVisible, width === 1440, 'Desktop table/mobile cards match the viewport');
    assert.equal(layout.mobileCards, width === 1440 ? 0 : 5);
    assert.deepEqual(layout.clinicMarkers, [0, 0, 1, 1, 0], 'Footnote belongs to the two clinic rows');
    assert.deepEqual(layout.buttons.map(button => button.text), ['Wir planen ein Baby', 'Ich bin schwanger', 'Unser Baby ist da']);
    assert(layout.buttons.every(button => button.height >= 44 && button.width >= 44 && button.pressed === 'false'), 'Three unselected accessible tap targets are at least 44px');
    assert.equal(await page.$eval('aside[aria-labelledby="schon-schwanger-heading"] a', node => node.getAttribute('href')), '/ratgeber/schwanger-zusatzversicherung');
    assert.match(await page.$eval('aside[aria-labelledby="schon-schwanger-heading"]', node => node.textContent), /Schon schwanger\?Dann zählt jetzt der Vorsorgeschutz und dein Kassenbonus\. Die Geburt selbst lässt sich nicht mehr nachträglich versichern\.Was jetzt noch geht/);
    const content = await page.$$eval('aside[aria-labelledby="schon-schwanger-heading"], #kasse-und-zusatzschutz, #familien-einstieg, #fragen details', nodes => nodes.map(node => node.textContent).join('\n'));
    assert(!forbiddenText.test(content), 'Guidance and all FAQ expansions avoid the prohibited claims and terms');
    const hebammeAnswer = await page.$$eval('#fragen details', nodes => nodes.find(node => node.querySelector('summary')?.textContent === 'Wer zahlt meine Hebamme?')?.textContent || '');
    assert(hebammeAnswer && !/ohne Wartezeit|keine Wartezeit/.test(hebammeAnswer), 'Birth-related FAQ never claims no waiting period');
    assert(!initial.dataLayer.some(([kind]) => kind === 'config' || kind === 'event'), 'Consent already granted still cannot configure tracking or send events');
    await assertNoOverflow('Initial state');

    if (screenshotDir) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(screenshotDir, `schwangerschaft-20261008-${width}-gesamt.png`), fullPage: true });
      for (const [name, selector] of [
        ['hinweis', 'aside[aria-labelledby="schon-schwanger-heading"]'],
        ['vergleich', '#kasse-und-zusatzschutz'],
        ['einstieg', '#familien-einstieg'],
      ]) {
        // Capture document coordinates from the top. ElementHandle.screenshot
        // scrolls long mobile sections and places fixed navigation over them.
        await page.evaluate(() => scrollTo(0, 0));
        const clip = await page.$eval(selector, node => {
          const box = node.getBoundingClientRect();
          return { x: box.left + scrollX, y: box.top + scrollY, width: box.width, height: box.height };
        });
        await page.screenshot({ path: path.join(screenshotDir, `schwangerschaft-20261008-${width}-${name}.png`), clip, captureBeyondViewport: true });
      }
    }

    const select = async index => {
      const buttons = await page.$$('#familien-einstieg button');
      await buttons[index].evaluate(button => button.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await buttons[index].click();
      await page.waitForFunction(index => [...document.querySelectorAll('#familien-einstieg button')].every((button, i) => button.getAttribute('aria-pressed') === String(i === index)), {}, index);
      assert(!forbiddenText.test(await page.$eval('#familien-einstieg-hinweis', node => node.textContent)), 'Every selected-stage explanation avoids prohibited terms');
      await assertNoOverflow(`Stage ${index}`);
      await assertPrivacyUnchanged(`Stage ${index}`);
    };
    const links = () => page.$$eval('#familien-einstieg-hinweis a', nodes => nodes.map(node => node.getAttribute('href')));
    await select(0);
    assert.match(await page.$eval('#familien-einstieg-hinweis', node => node.textContent), /Schließe den Klinikschutz jetzt ab und wähle eine Kasse mit Bonus\./);
    assert.deepEqual(await links(), ['/stationaer#familie', '/ratgeber/baby-geplant-zusatzversicherung']);
    await select(2);
    assert.match(await page.$eval('#familien-einstieg-hinweis', node => node.textContent), /Melde dein Kind innerhalb von 2 Monaten beim Versicherer an\./);
    assert.deepEqual(await links(), ['/ratgeber/neugeborenes-versichern']);
    await select(1);
    assert.deepEqual(await links(), ['#bonus-example', '/ambulant?src=reel-f05#tarifwahl']);
    await page.$eval('#familien-einstieg-hinweis a[href="#bonus-example"]', node => node.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.locator('#familien-einstieg-hinweis a[href="#bonus-example"]').click();
    await page.waitForFunction(() => location.hash === '#bonus-example' && document.querySelector('#bonus-example').open);
    await assertPrivacyUnchanged('Open calculator', true);
    await page.locator('input[name="checkups"]').fill('10');
    for (const name of ['course', 'studio', 'bmi', 'bloodPressure', 'dentalFirst', 'dentalSecond']) await page.locator(`input[name="${name}"]`).click();
    const output = label => page.$eval(`output[aria-label="${label}"]`, node => Number(node.textContent.replace(/EUR|€/g, '').trim().replace(/\./g, '').replace(',', '.')));
    assert.equal(await output('Zuschusspotenzial'), 630, 'The existing calculator remains usable after the pregnancy decision');
    assert.equal(await output('Geldbonus'), 210, 'The legitimate alternative Geldbonus remains intact');
    await page.locator('input[name="eligiblePaidPremium"]').fill('800');
    assert.equal(await output('Anrechenbarer Zuschuss'), 630);
    assert.equal(await output('Verbleibender Eigenanteil'), 170);
    assert.deepEqual(await links(), ['#bonus-example', '/ambulant?src=reel-f05#tarifwahl'], 'Calculator answers and stage never enter the onward URL');
    const onward = new URL((await links())[1], origin);
    assert.deepEqual([...onward.searchParams.keys()], ['src'], 'No stage/answer parameters go to /ambulant');
    await assertPrivacyUnchanged('Use calculator', true);
    await assertNoOverflow('Calculator with selections');

    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('#familien-einstieg button');
    assert(await page.$$eval('#familien-einstieg button', nodes => nodes.every(node => node.getAttribute('aria-pressed') === 'false')), 'Reload clears the stage selection');
    assert.equal(await page.$eval('#familien-einstieg-hinweis', node => node.textContent), '');
    assert.equal(await page.$eval('#bonus-example', node => node.open), false);
    assert.equal(await output('Zuschusspotenzial'), 0, 'Reload clears calculator answers');
    assert.deepEqual(errors, []);
    const forbiddenRequests = viewportRequests.filter(record => {
      if (!/^https?:/.test(record.url)) return false;
      const url = new URL(record.url);
      return forbiddenHost.test(url.hostname) || /\/api\/(?:analytics|.*events)/i.test(url.pathname) || record.method !== 'GET';
    });
    assert.deepEqual(forbiddenRequests, [], 'No attempted Google/Meta hosts, analytics/event endpoints or outbound submissions, including after reload');
    results.push({ width, requests: viewportRequests.length, table: layout.tableVisible, mobileCards: layout.mobileCards, choices: 3, calculator: '630 EUR Zuschuss / 210 EUR Geldbonus', privacy: 'unchanged' });
    await page.close();
  }

  if (screenshotDir) await fs.writeFile(path.join(screenshotDir, 'schwangerschaft-20261008-guidance-netzwerk.json'), `${JSON.stringify({ results, requests }, null, 2)}\n`);
  console.log('Pregnancy guidance rendered checks passed:', JSON.stringify(results));
  if (screenshotDir) console.log(`Screenshots and request log: ${screenshotDir}`);
} finally {
  await browser?.close();
  await server.close();
}
