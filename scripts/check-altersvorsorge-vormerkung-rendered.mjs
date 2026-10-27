/**
 * Prüft den Inline-Vormerkungsablauf nur mit synthetischen Kontaktdaten.
 * Alle externen Requests und sämtliche nicht ausdrücklich gemockten
 * Schreibanfragen werden vor dem Netzwerk blockiert. Kein Mailversand.
 */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const origin = new URL(process.env.HEALIO_VORMERKUNG_PREVIEW_URL || 'http://127.0.0.1:4187').origin;
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'Nur eine lokale Vorschau ist zulässig');
const browser = await puppeteer.launch({
  executablePath: process.env.HEALIO_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const errors = [];
const forbiddenWrites = [];
const sends = [];
const synthetic = { name: 'Vormerkung Prüffall', email: 'vormerkung-pruefung@example.invalid', phone: '+49 30 0000000' };
const formRoot = '[data-altersvorsorge-vormerkung]';
const screenshotDirectory = new URL('../../qa/', import.meta.url);
await mkdir(screenshotDirectory, { recursive: true });
let mode = 'success';
let heldRequest = null;
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };
const pause = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
const corsHeaders = { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': '*' };
const respondEmail = (request, status = 200) => request.respond({ status, headers: corsHeaders, contentType: 'text/plain', body: status === 200 ? 'OK' : 'Mock delivery failure' });

// Komponentenscreenshots blenden nur während der Aufnahme die darüberliegenden
// festen Bedienelemente aus; die eigentliche Funktionsprüfung nutzt die echte UI.
const screenshot = async (page, selector, filename) => {
  await page.evaluate(() => {
    window.__qaHiddenElements = [...document.querySelectorAll('body *')]
      .filter((element) => ['fixed', 'sticky'].includes(getComputedStyle(element).position))
      .map((element) => ({ element, display: element.style.getPropertyValue('display'), priority: element.style.getPropertyPriority('display') }));
    for (const { element } of window.__qaHiddenElements) element.style.setProperty('display', 'none', 'important');
  });
  try {
    await (await page.$(selector)).screenshot({ path: new URL(filename, screenshotDirectory).pathname });
  } finally {
    await page.evaluate(() => {
      for (const { element, display, priority } of window.__qaHiddenElements) {
        if (display) element.style.setProperty('display', display, priority);
        else element.style.removeProperty('display');
      }
      delete window.__qaHiddenElements;
    });
  }
};

const createPage = async (width = 390) => {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.setCacheEnabled(false);
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    if (request.isInterceptResolutionHandled()) return;
    const url = new URL(request.url());
    if (url.hostname === 'api.emailjs.com' && url.pathname === '/api/v1.0/email/send') {
      if (request.method() === 'OPTIONS') {
        await request.respond({ status: 204, headers: corsHeaders }); return;
      }
      if (request.method() === 'POST') {
        sends.push(JSON.parse(request.postData()));
        if (mode === 'hold') { heldRequest = request; return; }
        await respondEmail(request, mode === 'error' ? 500 : 200); return;
      }
    }
    if (request.method() !== 'GET') {
      forbiddenWrites.push(`${request.method()} ${url.pathname}`);
      await request.abort(); return;
    }
    if (url.origin === origin && url.pathname.startsWith('/api/')) {
      await request.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ ready: false }) }); return;
    }
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) await request.continue();
    else await request.abort();
  });
  return page;
};
const load = async (page) => {
  await page.goto(origin + '/altersvorsorgedepot', { waitUntil: 'networkidle0' });
  await page.waitForSelector('#rechner-beitrag');
  const dismiss = await page.evaluateHandle(() => [...document.querySelectorAll('button')].find((button) => /nur notwendige|nur erforderliche|alle ablehnen/i.test(button.textContent)) || null);
  if (dismiss.asElement()) await dismiss.asElement().click();
  await dismiss.dispose();
};
const clickButton = async (page, selector, pattern) => {
  const button = await page.evaluateHandle((root, source) => [...document.querySelectorAll(`${root} button`)].find((item) => new RegExp(source, 'i').test(item.textContent)) || null, selector, pattern);
  check(Boolean(button.asElement()), `Aktion fehlt: ${pattern}`);
  await button.asElement().click();
  await button.dispose();
};
const open = async (page, root = '#rechner') => {
  await clickButton(page, root, 'Berechnung speichern|für Januar vormerken');
  await page.waitForSelector(formRoot + ' input[name="first_name"]', { visible: true });
};
const fill = async (page, { phone = false, consent = true } = {}) => {
  await page.type(formRoot + ' input[name="first_name"]', synthetic.name);
  await page.type(formRoot + ' input[name="email"]', synthetic.email);
  if (phone) await page.type(formRoot + ' input[name="phone"]', synthetic.phone);
  if (consent) await page.click(formRoot + ' input[name="consent"]');
};
const setContribution50 = async (page) => {
  await page.focus('#rechner-beitrag');
  await page.keyboard.press('Home');
  for (let i = 0; i < 8; i += 1) await page.keyboard.press('ArrowRight');
  assert.equal(await page.$eval('#rechner-beitrag', (input) => input.value), '50');
};
const inspectPrivacy = async (page) => {
  const values = await page.evaluate(() => {
    const storage = (store) => { try { return Object.fromEntries(Object.entries(store)); } catch { return {}; } };
    return JSON.stringify({ url: location.href, local: storage(localStorage), session: storage(sessionStorage), dataLayer: window.dataLayer || [] });
  });
  for (const value of Object.values(synthetic)) check(!values.includes(value), 'Kontaktdaten dürfen nicht in URL, Webspeicher oder Messereignissen stehen');
};
const layout = async (page, width) => {
  const state = await page.evaluate((root) => {
    const main = document.querySelector('main').getBoundingClientRect();
    const inputs = [...document.querySelectorAll(`${root} input`)].filter((input) => ['first_name', 'email', 'phone'].includes(input.name));
    return {
      scrollWidth: document.documentElement.scrollWidth, left: main.left, right: main.right,
      fields: inputs.map((input) => ({ label: input.labels.length, font: parseFloat(getComputedStyle(input).fontSize), right: input.getBoundingClientRect().right })),
    };
  }, formRoot);
  check(state.scrollWidth <= width + 1, `${width}px: Seite darf nicht horizontal überlaufen`);
  check(Math.abs(state.left) <= 1 && Math.abs(state.right - width) <= 1, `${width}px: Hauptbereich füllt die Seitenbreite`);
  assert.equal(state.fields.length, 3, 'Genau drei Kontaktdatenfelder');
  check(state.fields.every((field) => field.label > 0 && field.font >= 16 && field.right <= width + 1), 'Beschriftete, lesbare Felder passen in die mobile Breite');
};

try {
  for (const width of [320, 390, 1440]) {
    const page = await createPage(width);
    await load(page);
    assert.equal(await page.$eval('#rechner-beitrag', (input) => input.value), '150', 'Standardrechnung startet bei 150 EUR');
    check((await page.$eval('#rechner', (section) => section.textContent)).includes('540 EUR'), '540 EUR sind ohne Anmeldung sichtbar');
    if (width !== 320) await screenshot(page, '#rechner', `rechner-${width}.png`);
    await open(page);
    await layout(page, width);
    if (width !== 320) await screenshot(page, formRoot, `formular-${width}.png`);
    assert.equal(await page.$eval(formRoot + ' input[name="consent"]', (input) => input.checked), false, 'Einwilligung ist nicht vorbelegt');
    assert.equal(await page.$eval(formRoot + ' input[name="phone"]', (input) => input.required), false, 'Telefonnummer bleibt optional');
    await page.close();
  }

  const page = await createPage();
  await load(page);
  await setContribution50(page);
  await page.click('#rechner button[aria-label="Kinderzahl erhöhen"]');
  await page.click('#rechner button[aria-label="Kinderzahl erhöhen"]');
  for (const groupLabel of ['Hast du schon einen Riester-Vertrag?', 'Bist du selbstständig?']) {
    const yes = await page.$(`#rechner [role="group"][aria-label="${groupLabel}"] button`);
    assert.ok(yes, `Schalter fehlt: ${groupLabel}`); await yes.click();
  }
  const text = await page.$eval('#rechner', (section) => section.textContent);
  check(/Riester[\s\S]*Kosten[\s\S]*Garantien/i.test(text), 'Riester-Hinweis nennt Kosten und Garantien');
  check(/Selbstständige[\s\S]*2027/i.test(text), 'Selbstständigen-Hinweis erscheint dynamisch');
  await open(page);
  check(/50 EUR[\s\S]*840 EUR/.test(await page.$eval(formRoot, (element) => element.textContent)), 'Formular übernimmt Beitrag und Zulage');
  const before = sends.length;
  await page.$eval(formRoot + ' form', (form) => form.requestSubmit());
  await pause(); assert.equal(sends.length, before, 'Unvollständiges Formular darf nicht senden');
  await fill(page, { phone: true, consent: false });
  await page.$eval(formRoot + ' form', (form) => form.requestSubmit());
  await pause(); assert.equal(sends.length, before, 'Ohne Einwilligung darf nicht gesendet werden');
  await page.focus(formRoot + ' input[name="phone"]');
  await page.$eval(formRoot + ' input[name="phone"]', (input) => input.select());
  await page.keyboard.press('Backspace');
  await page.type(formRoot + ' input[name="phone"]', 'abcdef');
  await page.click(formRoot + ' input[name="consent"]');
  await page.$eval(formRoot + ' form', (form) => form.requestSubmit());
  await pause(); assert.equal(sends.length, before, 'Eine ungültige Telefonnummer darf nicht senden');
  check(await page.$eval(formRoot + ' input[name="phone"]', (input) => input.validity.patternMismatch), 'Telefonmuster weist Buchstaben zurück');
  await page.focus(formRoot + ' input[name="phone"]');
  await page.$eval(formRoot + ' input[name="phone"]', (input) => input.select());
  await page.keyboard.press('Backspace');
  await page.type(formRoot + ' input[name="phone"]', synthetic.phone);
  assert.equal(await page.$eval(formRoot + ' input[name="consent"]', (input) => input.checked), false, 'Telefonänderung verlangt erneute Einwilligung');
  await page.click(formRoot + ' input[name="consent"]');
  assert.equal(await page.$eval(formRoot + ' input[name="phone"]', (input) => input.value), synthetic.phone);
  check(await page.$eval(formRoot + ' form', (form) => form.checkValidity()), 'Vollständige gültige Angaben werden akzeptiert');
  mode = 'hold';
  await page.$eval(formRoot + ' form', (form) => { form.requestSubmit(); form.requestSubmit(); });
  await page.waitForFunction(() => document.querySelector('[data-altersvorsorge-vormerkung] button[type="submit"]')?.disabled === true);
  await pause();
  assert.equal(sends.length, before + 1, 'Doppelklick darf nur eine Anfrage erzeugen');
  assert.equal(await page.$('[data-vormerkung-erfolg]'), null, 'Vor Versandannahme keine Erfolgsanzeige');
  assert.ok(heldRequest, 'Mock muss Anfrage bis zum Bestätigen halten');
  await respondEmail(heldRequest); heldRequest = null;
  await page.waitForSelector('[data-vormerkung-erfolg]');
  await page.waitForSelector('[data-vorsorge-modell]');
  const modelBefore = await page.$eval('[data-vorsorge-modell] [aria-live]', (element) => element.textContent);
  await page.focus('#vorsorge-alter');
  for (let i = 0; i < 10; i += 1) await page.keyboard.press('ArrowUp');
  assert.equal(await page.$eval('#vorsorge-alter', (input) => input.value), '52');
  const modelAfter = await page.$eval('[data-vorsorge-modell] [aria-live]', (element) => element.textContent);
  check(modelBefore !== modelAfter && /15 Jahre/.test(modelAfter), 'Alteränderung aktualisiert die Laufzeit und das Endkapital');
  await page.select('#vorsorge-steuersatz', '0.2');
  const steuerText = await page.$eval('[data-vorsorge-modell] [aria-live] > div:nth-child(2) p:nth-child(2)', (element) => element.textContent);
  check(steuerText === '0 EUR', 'Hohe Kinderzulage wird angerechnet; Zusatz-Steuervorteil bleibt mindestens null');
  await screenshot(page, '[data-vorsorge-modell]', 'modell-390.png');
  const params = sends.at(-1).template_params;
  assert.equal(params.from_name, synthetic.name);
  assert.equal(params.from_email, synthetic.email);
  assert.equal(params.phone, synthetic.phone);
  check(/50 EUR/.test(params.message) && /840 EUR/.test(params.message), 'Versand enthält die tatsächlich gewählte Rechnung');
  check(/Riester[\s\S]*(ja|vorhanden)/i.test(params.message), 'Riester-Auswahl wird übergeben');
  await inspectPrivacy(page);

  await load(page);
  mode = 'error';
  await open(page, '#zuschuss-check');
  await fill(page);
  await page.$eval(formRoot + ' form', (form) => form.requestSubmit());
  await page.waitForSelector(formRoot + ' [role="alert"]');
  assert.equal(await page.$eval(formRoot + ' input[name="email"]', (input) => input.value), synthetic.email, 'Fehler erhält die Eingabe');
  assert.equal(await page.$('[data-vormerkung-erfolg]'), null, 'Versandfehler darf keinen Erfolg melden');
  mode = 'success';
  await page.$eval(formRoot + ' form', (form) => form.requestSubmit());
  await page.waitForSelector('[data-vormerkung-erfolg]');
  await inspectPrivacy(page);
  await page.close();
  assert.deepEqual(errors, [], 'Keine unbehandelten Browserfehler');
  assert.deepEqual(forbiddenWrites, [], 'Keine ungemockten Schreibanfragen');
  console.log(`Vormerkung: ${checks} Browserprüfungen plus Versand-, Validierungs- und Fehlerversuchsprüfungen bestanden; sämtliche ${sends.length} Mailanfragen lokal abgefangen.`);
} finally {
  if (heldRequest) await heldRequest.abort().catch(() => {});
  await browser.close();
}
