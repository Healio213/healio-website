/**
 * Prüft das freiwillige WhatsApp-Häkchen im gebauten Stand, nur mit
 * synthetischen Angaben. Externe Requests sind blockiert, EmailJS und die
 * Anfragen-Zentrale antworten lokal. Kein Mailversand, kein Netz.
 *
 * Vorschau starten: npx vite preview --host 127.0.0.1 --port 4173 --strictPort
 * Bildschirmfotos (optional): HEALIO_WHATSAPP_SHOTS=<Ordner>
 */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const origin = new URL(process.env.HEALIO_TEST_BASE_URL || 'http://127.0.0.1:4173').origin;
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'Nur eine lokale Vorschau ist zulässig');
const shotDirectory = process.env.HEALIO_WHATSAPP_SHOTS || '';
if (shotDirectory) await mkdir(shotDirectory, { recursive: true });

const WORTLAUT = 'Antwort gern auch per WhatsApp von Healio (040 89755 500). Nita, unsere digitale Assistentin, schreibt dir zuerst. Abbestellen jederzeit mit STOP.';
const JETZT = 'Nita, unsere digitale Assistentin, schreibt dir gleich per WhatsApp.';
const MORGEN = 'Nita, unsere digitale Assistentin, schreibt dir morgen früh per WhatsApp.';
const TAG = '2026-11-09T11:00:00+01:00';
const NACHT = '2026-11-09T22:30:00+01:00';
const decidedConsent = JSON.stringify({
  version: 2, decided: true, necessary: true,
  preferences: { analytics: false, marketing: false, google_calendar: false, maps: false, openai: false },
  source: 'settings', updatedAt: '2026-11-04T10:00:00.000Z',
});
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const WA = '[data-whatsapp-haekchen] input[type="checkbox"]';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: await puppeteer.executablePath(),
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});
const pageErrors = [];
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openPage(viewport, { jetzt = TAG } = {}) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  page.close = () => context.close();
  const mails = [];
  const zentrale = [];
  await page.setViewport(viewport);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const url = new URL(request.url());
    if (url.hostname === 'api.emailjs.com' && url.pathname === '/api/v1.0/email/send') {
      if (request.method() === 'OPTIONS') { await request.respond({ status: 204, headers: cors }); return; }
      mails.push(JSON.parse(request.postData()));
      await request.respond({ status: 200, headers: cors, contentType: 'text/plain', body: 'OK' });
      return;
    }
    if (url.hostname === 'anfragen.healio.de') {
      if (request.method() === 'OPTIONS') { await request.respond({ status: 204, headers: cors }); return; }
      zentrale.push(JSON.parse(request.postData()));
      await request.respond({ status: 200, headers: cors, contentType: 'application/json', body: '{"ok":true}' });
      return;
    }
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) await request.continue();
    else await request.abort();
  });
  await page.evaluateOnNewDocument((stored, iso) => {
    window.localStorage.setItem('healio:consent:v2', stored);
    window.sessionStorage.setItem('healio-nita-hinweis', 'gesehen');
    // Feste Uhrzeit, damit der Hinweis "gleich" und "morgen früh" prüfbar ist.
    const fixed = new Date(iso).getTime();
    const RealDate = Date;
    class FakeDate extends RealDate {
      constructor(...args) { if (args.length === 0) super(fixed); else super(...args); }
      static now() { return fixed; }
    }
    window.Date = FakeDate;
  }, decidedConsent, jetzt);
  return { page, mails, zentrale };
}

const goto = (page, route) => page.goto(`${origin}${route}`, { waitUntil: 'networkidle0', timeout: 45_000 });
const count = (page, selector) => page.$$eval(selector, (elements) => elements.length);
const shoot = async (page, name, { fullPage = false } = {}) => {
  if (shotDirectory) await page.screenshot({ path: path.join(shotDirectory, `whatsapp-haekchen-${name}.png`), fullPage });
};
const waAnzeige = async (page) => page.$eval(WA, (input) => {
  const label = input.closest('label');
  const rect = label.getBoundingClientRect();
  return { checked: input.checked, text: label.innerText.trim().replace(/\s+/g, ' '), hoehe: rect.height, breite: rect.width, links: rect.left, rechts: rect.right, box: input.getBoundingClientRect().width };
});

// Meta-Check Naturheilkunde: Kacheln wählen, bis das Kontaktformular da ist.
async function zumKontaktschritt(page) {
  await goto(page, '/check/naturheilkunde');
  for (let schritt = 0; schritt < 8; schritt += 1) {
    if (await count(page, '#check-vorname')) return;
    await page.click('button[aria-pressed]');
    await pause(450);
  }
  assert.ok(await count(page, '#check-vorname'), 'Kontaktschritt nicht erreicht');
}

async function checkFlow(viewport, name, { haken, jetzt, erwartetDanke }) {
  const { page, mails, zentrale } = await openPage(viewport, { jetzt });
  await zumKontaktschritt(page);
  check(await count(page, WA) === 0, `${name}: Häkchen darf ohne Telefonnummer nicht sichtbar sein.`);
  await page.type('#check-vorname', 'Test');
  await page.type('#check-telefon', '0176 12345678');
  await page.waitForSelector(WA);
  const anzeige = await waAnzeige(page);
  check(anzeige.text === WORTLAUT, `${name}: Wortlaut weicht ab: ${anzeige.text}`);
  check(anzeige.checked === false, `${name}: Häkchen darf nicht vorausgewählt sein.`);
  check(anzeige.hoehe >= 44, `${name}: Tippfläche zu klein (${anzeige.hoehe}px).`);
  check(anzeige.links >= 0 && anzeige.rechts <= viewport.width, `${name}: Häkchen ragt aus dem Bild.`);
  // Telefonnummer wieder leeren: Häkchen verschwindet.
  await page.focus('#check-telefon');
  for (let i = 0; i < 20; i += 1) await page.keyboard.press('Backspace');
  await pause(200);
  check(await count(page, WA) === 0, `${name}: Häkchen muss mit leerem Telefonfeld verschwinden.`);
  await page.type('#check-telefon', '0176 12345678');
  await page.waitForSelector(WA);
  if (haken) await page.click(WA);
  await page.click('#check-einwilligung');
  await page.evaluate(() => document.querySelector('[data-whatsapp-haekchen]').scrollIntoView({ block: 'center' }));
  await shoot(page, `${name}-formular`);
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => location.pathname.endsWith('/danke'), { timeout: 15_000 });
  await pause(500);
  check(mails.length === 1, `${name}: genau eine Mail erwartet.`);
  const nachricht = mails[0].template_params.message;
  check(nachricht.includes(`WhatsApp: ${haken ? 'ja' : 'nein'}`), `${name}: Mailzeile fehlt.`);
  check(zentrale.length >= 1, `${name}: Zentrale nicht erreicht.`);
  const ersteAnfrage = zentrale[0];
  if (haken) {
    check(ersteAnfrage.whatsapp?.einwilligung === true && ersteAnfrage.whatsapp.text === WORTLAUT, `${name}: Beleg an die Zentrale fehlt.`);
  } else {
    check(!('whatsapp' in ersteAnfrage), `${name}: ohne Häkchen darf die Zentrale kein whatsapp-Feld bekommen.`);
  }
  const danke = await page.$$eval('[data-whatsapp-danke]', (nodes) => nodes.map((node) => node.innerText.trim()));
  if (erwartetDanke) check(danke.length === 1 && danke[0] === erwartetDanke, `${name}: Dankehinweis falsch: ${JSON.stringify(danke)}`);
  else check(danke.length === 0, `${name}: ohne Häkchen kein Dankehinweis.`);
  if (erwartetDanke) await shoot(page, `${name}-danke`);
  await page.close();
}

try {
  // 1. Meta-Check Naturheilkunde
  await checkFlow(MOBILE, 'check-390', { haken: true, jetzt: TAG, erwartetDanke: JETZT });
  await checkFlow(DESKTOP, 'check-1440', { haken: true, jetzt: TAG, erwartetDanke: JETZT });
  await checkFlow(MOBILE, 'check-390-nacht', { haken: true, jetzt: NACHT, erwartetDanke: MORGEN });
  await checkFlow(MOBILE, 'check-390-ohne', { haken: false, jetzt: TAG, erwartetDanke: null });

  // 2. Schwangerschafts-Check (Gesundheitsangabe, EU-Weg): nie ein Häkchen.
  {
    const { page } = await openPage(MOBILE);
    await goto(page, '/check/schwangerschaft');
    for (let schritt = 0; schritt < 8 && !(await count(page, '#check-vorname')); schritt += 1) {
      await page.click('button[aria-pressed]');
      await pause(450);
    }
    await page.type('#check-telefon', '0176 12345678');
    await pause(300);
    check(await count(page, '[data-whatsapp-haekchen]') === 0, 'Schwangerschafts-Check darf kein WhatsApp-Häkchen haben.');
    await page.close();
  }

  // 3. Das Zahn-Rückruf-Formular (DentalCallbackForm) steht nur noch ohne Terminbuchung
  // auf /zahn. Mit Terminbuchung (heute der Fall) ist es nicht eingebunden und hat kein Häkchen im Bild.
  {
    const { page } = await openPage(DESKTOP);
    await goto(page, '/zahn');
    check(await count(page, '[data-whatsapp-haekchen]') === 0, 'zahn: ohne Telefonnummer und ohne Formular kein Häkchen.');
    await page.close();
  }

  // 4. Rückruf-Fenster „Sprich mit einem Experten“
  for (const [viewport, name] of [[MOBILE, 'rueckruf-390'], [DESKTOP, 'rueckruf-1440']]) {
    const { page, mails, zentrale } = await openPage(viewport);
    await goto(page, '/ambulant');
    let geoeffnet = false;
    for (let schritt = 0; schritt < 10 && !geoeffnet; schritt += 1) {
      await page.evaluate(() => window.scrollBy(0, 320));
      await pause(1_200);
      geoeffnet = await page.evaluate(() => {
        const knopf = document.querySelector('[data-rueckruf="teaser"] .healio-rueckruf-action:not([tabindex="-1"]), [data-rueckruf="launcher"]:not([tabindex="-1"])');
        if (!knopf) return false;
        knopf.click();
        return true;
      });
    }
    check(geoeffnet, `${name}: Rückruf-Fenster ließ sich nicht öffnen.`);
    await page.waitForSelector('#healio-rueckruf-vorname', { visible: true });
    check(await count(page, WA) === 0, `${name}: ohne Telefonnummer kein Häkchen.`);
    await page.type('#healio-rueckruf-vorname', 'Test');
    await page.type('#healio-rueckruf-telefon', '0171 0000000');
    await page.waitForSelector(WA);
    const anzeige = await waAnzeige(page);
    check(anzeige.text === WORTLAUT && anzeige.checked === false, `${name}: Häkchen falsch: ${anzeige.text}`);
    check(anzeige.hoehe >= 24 && anzeige.box >= 20, `${name}: Tippfläche zu klein.`);
    await page.click('#healio-rueckruf-einwilligung');
    await page.click(WA);
    await shoot(page, `${name}-formular`);
    await page.click('dialog[data-rueckruf="dialog"] button[type="submit"]');
    await page.waitForSelector('[data-whatsapp-danke]', { timeout: 10_000 });
    check((await page.$eval('[data-whatsapp-danke]', (node) => node.innerText.trim())) === JETZT, `${name}: Dankehinweis falsch.`);
    check(mails[0].template_params.message.includes('WhatsApp: ja'), `${name}: Mailzeile fehlt.`);
    check(zentrale[0].whatsapp?.einwilligung === true, `${name}: Beleg fehlt.`);
    await shoot(page, `${name}-danke`);
    await page.close();
  }

  assert.equal(pageErrors.length, 0, `Seitenfehler: ${pageErrors.join(' | ')}`);
  console.log(`WhatsApp-Häkchen (gebaut): ${checks} Prüfungen bestanden.`);
} finally {
  await browser.close();
}
