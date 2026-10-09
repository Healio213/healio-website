import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { altersvorsorgeArticles, ALTERSVORSORGE_HUB_PATH } from '../src/content/ratgeber/altersvorsorge/index.js';

const origin = new URL(process.env.HEALIO_ARTIKEL_PREVIEW_URL || 'http://127.0.0.1:4177').origin;
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const errors = [];
const attemptedWrites = [];
const page = await browser.newPage();
await page.setCacheEnabled(false);
page.on('pageerror', (error) => errors.push(error.message));
await page.setRequestInterception(true);
page.on('request', (request) => {
  const url = new URL(request.url());
  if (request.method() !== 'GET') {
    attemptedWrites.push(`${request.method()} ${url.pathname}`);
    request.abort();
  } else if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) request.continue();
  else request.abort();
});

async function load(path) {
  const response = await page.goto(`${origin}${path}`, { waitUntil: 'networkidle0' });
  assert.equal(response.status(), 200, `${path}: Vorschau nicht erreichbar`);
  await page.waitForSelector('h1');
  const consentButton = await page.evaluateHandle(() => [...document.querySelectorAll('button')].find((button) => /nur notwendige|nur erforderliche|alle ablehnen/i.test(button.textContent)) || null);
  const element = consentButton.asElement();
  if (element) await element.click();
  await consentButton.dispose();
}

async function layout(width, selector) {
  const result = await page.$eval(selector, (element) => ({
    left: element.getBoundingClientRect().left,
    width: element.getBoundingClientRect().width,
    pageWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(result.pageWidth <= width + 1, `Seite läuft horizontal über: ${JSON.stringify(result)}`);
  assert.ok(Math.abs(result.left) < 1 && Math.abs(result.width - width) < 1, 'Äußerer Seitenbereich füllt die Browserbreite nicht');
}

try {
  for (const width of [360, 390, 1440]) {
    await page.setViewport({ width, height: 900 });
    await load('/altersvorsorgedepot');
    await layout(width, 'main');
    assert.equal(await page.$eval('#rechner-beitrag', (input) => input.max), '150', 'Rechner endet bei 150 EUR Monatsbeitrag');
  }
  console.log('360/390/1440px: Landingpage füllt die Browserbreite; Rechnergrenze 150 EUR.');

  for (const width of [390, 1440]) {
    await page.setViewport({ width, height: 900 });
    await load(ALTERSVORSORGE_HUB_PATH);
    await layout(width, 'main');
    const linked = await page.$$eval('main a', (links) => links.map((link) => link.getAttribute('href')));
    for (const article of altersvorsorgeArticles) assert.ok(linked.includes(`/ratgeber/${article.slug}`), `Hub-Link fehlt: ${article.slug}`);

    for (const article of altersvorsorgeArticles) {
      await load(`/ratgeber/${article.slug}`);
      await layout(width, 'article');
      assert.equal(await page.$eval('article h1', (element) => element.textContent), article.headline);
      assert.equal((await page.$$('[data-ratgeber-internal-cta]')).length, 1);
      assert.equal(await page.$eval('[data-altersvorsorge-artikel-check] input[type="range"]', (input) => input.max), '150', 'Artikelrechner endet bei 150 EUR Monatsbeitrag');
      const info = await page.$eval('[data-altersvorsorge-artikel-check]', (element) => ({
        contactInputs: element.querySelectorAll('input[type="email"], input[type="tel"]').length,
        inputs: [...element.querySelectorAll('select')].map((input) => ({ label: document.querySelector(`label[for="${CSS.escape(input.id)}"]`)?.textContent, font: parseFloat(getComputedStyle(input).fontSize) })),
        text: element.textContent,
      }));
      assert.equal(info.contactInputs, 0, 'Rechnung verlangt Kontaktdaten');
      assert.ok(info.inputs.every((input) => input.label && input.font >= 16), 'Eingabefelder brauchen lesbare Beschriftungen');
      assert.ok(info.text.includes('unmittelbar Förderberechtigte'));
    }
    console.log(`${width}px: Übersicht und alle 24 Ratgeber erreichbar, volle Seitenbreite und lesbare Eingaben.`);
  }

  await page.setViewport({ width: 390, height: 844 });
  await load('/ratgeber/altersvorsorgedepot-kinderzulage?utm_source=test&email=nicht-weiterreichen');
  await page.focus('[data-altersvorsorge-artikel-check] input[type="range"]');
  await page.keyboard.press('Home');
  for (let step = 0; step < 8; step += 1) await page.keyboard.press('ArrowRight');
  assert.equal(await page.$eval('[data-altersvorsorge-artikel-check] input[type="range"]', (input) => input.value), '50');
  await page.select('[data-altersvorsorge-artikel-check] select', '3');
  await page.click('[data-altersvorsorge-artikel-check] input[type="checkbox"]');
  const result = await page.$eval('[data-altersvorsorge-artikel-check] [role="status"]', (element) => element.textContent);
  assert.ok(result.includes('1.140 EUR') && result.includes('200 EUR'), 'Jahreszulage und einmaliger Bonus stimmen nicht');
  await page.click('[data-ratgeber-internal-cta]');
  await page.waitForSelector('[data-artikel-check-uebernahme]');
  const url = new URL(page.url());
  assert.equal(url.pathname, '/altersvorsorgedepot');
  assert.equal(url.hash, '#zuschuss-check');
  assert.equal(url.searchParams.get('fuer'), 'eltern');
  assert.equal(url.searchParams.get('utm_content'), 'altersvorsorgedepot-kinderzulage');
  for (const key of ['email', 'monatsbeitrag', 'kinder', 'unter25']) assert.equal(url.searchParams.get(key), null);
  assert.equal(await page.$eval('#rechner-beitrag', (input) => input.value), '50');
  assert.ok((await page.$eval('[data-artikel-check-uebernahme]', (element) => element.textContent)).includes('3 berücksichtigte Kinder'));
  await page.waitForFunction(() => document.getElementById('zuschuss-check').getBoundingClientRect().top < 200);
  assert.equal((await page.$$('a[href*="TODO-"]')).length, 0, 'Unfertiger Buchungslink darf nicht klickbar sein');
  const checkLink = await page.evaluateHandle(() => [...document.querySelectorAll('#zuschuss-check a')].find((link) => link.textContent.includes('Zuschuss-Check anfragen')));
  assert.ok(checkLink.asElement(), 'Check-Anfrage braucht einen klaren Kontaktweg');
  await checkLink.asElement().click();
  await page.waitForSelector('#kontaktformular #message');
  assert.equal(new URL(page.url()).pathname, '/kontakt');
  assert.equal(new URL(page.url()).hash, '#kontaktformular');
  const checkMessage = await page.$eval('#message', (input) => input.value);
  assert.ok(/Zuschuss-Check/.test(checkMessage) && /50 EUR/.test(checkMessage) && /3 zugeordnete/.test(checkMessage), 'Kontakt-Nachricht übernimmt die gewählten Beispielwerte');
  assert.equal(new URL(page.url()).searchParams.get('email'), null);
  await page.goBack({ waitUntil: 'networkidle0' });
  await page.waitForSelector('#zuschuss-check');
  const callback = await page.evaluateHandle(() => [...document.querySelectorAll('#zuschuss-check a')].find((link) => link.textContent.includes('Rückruf anfragen')));
  assert.ok(callback.asElement(), 'Rückruf muss als Anfrage bezeichnet sein');
  await callback.asElement().click();
  await page.waitForSelector('#kontaktformular #message');
  assert.equal(new URL(page.url()).pathname, '/kontakt');
  assert.equal(new URL(page.url()).hash, '#kontaktformular');
  assert.ok(/Rückruf/.test(await page.$eval('#message', (input) => input.value)), 'Kontakt-Nachricht benennt den Rückrufwunsch');
  console.log('Handy: 50 EUR, drei Kinder, 1.140 EUR jährlich plus 200 EUR einmalig; Werteübergabe und Kontaktanfragen für Check und Rückruf funktionieren.');

  await load('/ratgeber/riester-jahresmitteilung-checkliste');
  assert.ok((await page.$eval('[data-altersvorsorge-artikel-check] h2', (element) => element.textContent)).includes('Riester-Vertrag'));
  const webinarLink = await page.$('[data-altersvorsorge-artikel-check] a[href$="#webinar"]');
  await webinarLink.click();
  await page.waitForSelector('[data-artikel-check-uebernahme]');
  assert.equal(new URL(page.url()).hash, '#webinar');
  assert.equal(new URL(page.url()).searchParams.get('fuer'), 'riester');
  await page.waitForFunction(() => document.getElementById('webinar').getBoundingClientRect().top < 200);
  console.log('Riester: passende Ansprache und alternativer Webinarweg mit Werteübernahme funktionieren.');
  assert.deepEqual(errors, [], 'Browserfehler');
  assert.deepEqual(attemptedWrites, [], 'Die Prüfung darf keine Anmeldung oder andere Schreibanfrage auslösen');
} finally {
  await browser.close();
}
