/**
 * Prüft den Rückruf-Hinweis „Sprich mit einem Experten“ im gebauten Stand,
 * nur mit synthetischen Angaben. Alle externen Requests werden blockiert,
 * EmailJS wird lokal beantwortet. Kein Mailversand.
 *
 * Vorschau starten: npx vite preview --host 127.0.0.1 --port 4173 --strictPort
 * Bildschirmfotos (optional): HEALIO_RUECKRUF_SHOTS=<Ordner>
 */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const origin = new URL(process.env.HEALIO_TEST_BASE_URL || 'http://127.0.0.1:4173').origin;
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'Nur eine lokale Vorschau ist zulässig');
const shotDirectory = process.env.HEALIO_RUECKRUF_SHOTS || '';
if (shotDirectory) await mkdir(shotDirectory, { recursive: true });

const decidedConsent = JSON.stringify({
  version: 2,
  decided: true,
  necessary: true,
  preferences: { analytics: false, marketing: false, google_calendar: false, maps: false, openai: false },
  source: 'settings',
  updatedAt: '2026-11-04T10:00:00.000Z',
});
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
const TEASER = '[data-rueckruf="teaser"]';
const LAUNCHER = '[data-rueckruf="launcher"]';
const DIALOG = 'dialog[data-rueckruf="dialog"]';
const DESKTOP = { width: 1280, height: 800, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

const browser = await puppeteer.launch({
  headless: true,
  executablePath: await puppeteer.executablePath(),
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});
const pageErrors = [];
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Jeder Fall bekommt einen frischen Kontext: eigener Speicher, keine Cookie-Entscheidung aus dem Fall davor.
async function openPage(viewport, { consent = true, nitaHint = false, delivery = () => 200 } = {}) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  page.close = () => context.close();
  const posts = [];
  await page.setViewport(viewport);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const url = new URL(request.url());
    if (url.hostname === 'api.emailjs.com' && url.pathname === '/api/v1.0/email/send') {
      if (request.method() === 'OPTIONS') { await request.respond({ status: 204, headers: cors }); return; }
      posts.push(JSON.parse(request.postData()));
      const status = delivery(posts.length);
      await request.respond({ status, headers: cors, contentType: 'text/plain', body: status === 200 ? 'OK' : 'synthetic failure' });
      return;
    }
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) await request.continue();
    else await request.abort();
  });
  if (consent) {
    await page.evaluateOnNewDocument((stored) => window.localStorage.setItem('healio:consent:v2', stored), decidedConsent);
  }
  // Nitas Hinweisfenster (5 bis 20 s nach dem Laden) nur dort, wo der Fall es prüft.
  if (!nitaHint) await page.evaluateOnNewDocument(() => window.sessionStorage.setItem('healio-nita-hinweis', 'gesehen'));
  return { page, posts };
}

const goto = (page, route) => page.goto(`${origin}${route}`, { waitUntil: 'networkidle0', timeout: 45_000 });
const scrollPastShare = (page) => page.evaluate(() => window.scrollTo(0, Math.ceil(window.innerHeight * 0.7)));
const box = (page, selector) => page.$eval(selector, (element) => {
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
});
const count = (page, selector) => page.$$eval(selector, (elements) => elements.length);
const shown = (page, selector) => page.$$eval(selector, (elements) => elements.some((element) => {
  const style = window.getComputedStyle(element);
  return element.getAttribute('data-zurueck') !== 'true' && style.visibility !== 'hidden' && Number(style.opacity) > 0.5;
}));
const overlaps = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
const shoot = async (page, name) => {
  if (shotDirectory) await page.screenshot({ path: path.join(shotDirectory, name) });
};

async function waitForTeaser(page, timeout = 8_000) {
  await page.waitForFunction((selector) => {
    const element = document.querySelector(selector);
    return element && element.getAttribute('data-zurueck') !== 'true';
  }, { timeout }, TEASER);
}

// Liegt gerade ein Knopf der Seite unter der Ecke, wartet der Hinweis aufs
// Weiterscrollen. Der Test scrollt deshalb wie ein Mensch in Schritten weiter.
async function revealTeaser(page, firstWait = 6_000) {
  await scrollPastShare(page);
  for (let step = 0; step < 6; step += 1) {
    try {
      await waitForTeaser(page, step === 0 ? firstWait : 2_500);
      return;
    } catch (error) {
      if (step === 5) throw error;
      await page.evaluate(() => window.scrollBy(0, 240));
    }
  }
}

async function fillAndSend(dialog, page, { name = 'Test', phone = '0171 0000000' } = {}) {
  await page.type('#healio-rueckruf-vorname', name);
  await page.type('#healio-rueckruf-telefon', phone);
  await page.click('#healio-rueckruf-einwilligung');
  await page.click(`${DIALOG} button[type="submit"]`);
}

try {
  // 1. Desktop Startseite: erscheint nicht sofort, dann unten links, frei von Nitas Leiste.
  {
    const { page, posts } = await openPage(DESKTOP);
    await goto(page, '/');
    await scrollPastShare(page);
    await pause(1_500);
    check(await count(page, TEASER) === 0, 'Der Hinweis darf nicht vor 3 Sekunden erscheinen.');
    await revealTeaser(page, 4_500);
    const teaserText = await page.$eval(TEASER, (element) => element.innerText);
    check(teaserText.includes('Sprich mit einem Experten'), 'Überschrift fehlt.');
    check(teaserText.includes('100\u00a0% unverbindlich und kostenlos.') || teaserText.includes('100 % unverbindlich und kostenlos.'), 'Unterzeile fehlt.');
    check(teaserText.includes('Beratung anfragen'), 'Knopf fehlt.');
    check(await page.$eval(TEASER, (element) => element.getAttribute('aria-label')) === 'Persönliche Beratung', 'Bereichsname fehlt.');
    check(await page.evaluate(() => !document.activeElement?.closest('[data-rueckruf]')), 'Der Hinweis darf den Fokus nicht an sich ziehen.');
    const teaserBox = await box(page, TEASER);
    check(teaserBox.x < DESKTOP.width / 2 && teaserBox.bottom <= DESKTOP.height, 'Desktop: Hinweis gehört nach unten links.');
    if (await count(page, '[data-healio-nita="dock"]')) {
      check(!overlaps(teaserBox, await box(page, '[data-healio-nita="dock"]')), 'Der Hinweis überdeckt Nitas Kontaktleiste.');
    }
    await shoot(page, 'desktop-1280-startseite-hinweis.png');

    await page.click(`${TEASER} .healio-rueckruf-action`);
    await page.waitForSelector(`${DIALOG}[open]`);
    check(await page.evaluate(() => document.activeElement?.id) === 'healio-rueckruf-vorname', 'Fokus gehört ins Vornamenfeld.');
    const head = await page.$eval(DIALOG, (element) => element.innerText);
    check(head.includes('Persönlicher Check für Kasse, Bonus und Zusatzschutz'), 'Unterzeile der Startseite fehlt.');
    check(head.includes('Im nächsten Schritt wählst du deinen Wunschtermin für den Videocall.'), 'Hinweis auf den nächsten Schritt fehlt.');
    check(await page.$eval(`${DIALOG} .healio-rueckruf-consent a`, (link) => link.getAttribute('href')) === '/datenschutz#rueckruf', 'Datenschutzlink zeigt nicht auf #rueckruf.');
    await shoot(page, 'desktop-1280-startseite-formular.png');

    await page.click(`${DIALOG} button[type="submit"]`);
    check(await page.$eval(DIALOG, (element) => element.innerText.includes('Bitte gib deinen Vornamen ein.')), 'Fehlermeldung Vorname fehlt.');
    check(await page.evaluate(() => document.activeElement?.id) === 'healio-rueckruf-vorname', 'Fokus muss auf das fehlerhafte Feld.');
    await page.type('#healio-rueckruf-vorname', ' Test ');
    await page.type('#healio-rueckruf-telefon', '12 34');
    await page.click(`${DIALOG} button[type="submit"]`);
    check(await page.evaluate(() => document.activeElement?.id) === 'healio-rueckruf-telefon', 'Kurze Nummer muss abgelehnt werden.');
    await page.$eval('#healio-rueckruf-telefon', (input) => { input.select(); });
    await page.type('#healio-rueckruf-telefon', '+49 (0) 171 000-0000');
    await page.click(`${DIALOG} button[type="submit"]`);
    check(await page.evaluate(() => document.activeElement?.id) === 'healio-rueckruf-einwilligung', 'Ohne Häkchen darf nichts gesendet werden.');
    check(posts.length === 0, 'Vor gültigen Angaben darf nichts gesendet werden.');

    await page.click('#healio-rueckruf-einwilligung');
    await page.click(`${DIALOG} button[type="submit"]`);
    await page.waitForFunction((selector) => document.querySelector(selector)?.innerText.includes('Danke! Wähle jetzt deinen Wunschtermin.'), { timeout: 8_000 }, DIALOG);
    check(posts.length === 1, 'Genau eine Anfrage erwartet.');
    const params = posts[0].template_params;
    check(params.from_name === 'Test' && params.phone === '+491710000000', 'Vorname und Nummer kommen nicht bereinigt an.');
    check(params.page_source === 'Rückruf-Hinweis Startseite', 'Quelle der Anfrage fehlt.');
    check(params.to_email === 'info@healio.de', 'Anfrage muss an info@healio.de gehen.');
    check(/Seite: healio\.de\nThema: Allgemein/.test(params.message) && params.message.includes('Fassung rueckruf-2026-11-04'), 'Mailtext ohne Seite, Thema oder Einwilligung.');
    check(await page.$eval(`${DIALOG} .healio-rueckruf-success a`, (link) => link.getAttribute('href')) === '/terminvereinbarung', 'Terminknopf muss auf /terminvereinbarung zeigen.');
    check(await page.evaluate(() => document.activeElement?.textContent) === 'Termin jetzt wählen', 'Fokus gehört auf den Terminknopf.');
    check(await page.evaluate(() => sessionStorage.getItem('healio.rueckruf')) === 'gesendet', 'Sitzungsmerker fehlt.');
    await shoot(page, 'desktop-1280-startseite-danke.png');

    await page.click(`${DIALOG} .healio-rueckruf-close`);
    await page.waitForSelector(DIALOG, { hidden: true });
    check(await shown(page, LAUNCHER), 'Nach dem Absenden bleibt der runde Knopf.');
    check(await page.evaluate(() => document.activeElement?.getAttribute('data-rueckruf')) === 'launcher', 'Fokus gehört auf den runden Knopf.');
    await page.close();
  }

  // 2. Fehler beim Senden: freundliche Meldung, zweiter Versuch klappt.
  {
    const { page, posts } = await openPage(DESKTOP, { delivery: (attempt) => (attempt === 1 ? 500 : 200) });
    await goto(page, '/ambulant');
    await revealTeaser(page);
    await shoot(page, 'desktop-1280-ambulant-hinweis.png');
    await page.click(`${TEASER} .healio-rueckruf-action`);
    await page.waitForSelector(`${DIALOG}[open]`);
    check((await page.$eval(DIALOG, (element) => element.innerText)).includes('Persönlicher Check für deinen ambulanten Zusatzschutz'), 'Unterzeile Ambulant fehlt.');
    await fillAndSend(DIALOG, page);
    await page.waitForSelector(`${DIALOG} [role="alert"]`, { timeout: 8_000 });
    check((await page.$eval(`${DIALOG} [role="alert"]`, (element) => element.textContent)).startsWith('Deine Anfrage ist gerade nicht bei uns angekommen.'), 'Fehlermeldung fehlt.');
    check((await page.$eval(`${DIALOG} button[type="submit"]`, (button) => button.textContent)) === 'Noch einmal senden', 'Knopf für den zweiten Versuch fehlt.');
    await page.click(`${DIALOG} button[type="submit"]`);
    await page.waitForFunction((selector) => document.querySelector(selector)?.innerText.includes('Danke!'), { timeout: 8_000 }, DIALOG);
    check(posts.length === 2 && posts[1].template_params.page_source === 'Rückruf-Hinweis /ambulant', 'Zweiter Versuch mit Quelle /ambulant erwartet.');
    await page.close();
  }

  // 3. Schließen lässt nur den runden Knopf, auch nach dem Neuladen; Escape schließt das Formular.
  {
    const { page } = await openPage(DESKTOP);
    await goto(page, '/stationaer');
    await revealTeaser(page);
    await page.click(`${TEASER} .healio-rueckruf-close`);
    await page.waitForSelector(TEASER, { hidden: true });
    check(await shown(page, LAUNCHER), 'Nach dem Schließen fehlt der runde Knopf.');
    check(await page.evaluate(() => sessionStorage.getItem('healio.rueckruf')) === 'geschlossen', 'Merker „geschlossen“ fehlt.');
    await goto(page, '/stationaer');
    await scrollPastShare(page);
    await pause(3_600);
    check(await count(page, TEASER) === 0, 'In derselben Sitzung kein zweiter Hinweis.');
    check(await shown(page, LAUNCHER), 'Der runde Knopf fehlt nach dem Neuladen.');
    await page.click(LAUNCHER);
    await page.waitForSelector(`${DIALOG}[open]`);
    await page.keyboard.press('Escape');
    await page.waitForSelector(DIALOG, { hidden: true });
    check(await page.evaluate(() => document.activeElement?.getAttribute('data-rueckruf')) === 'launcher', 'Escape bringt den Fokus zurück zum Knopf.');
    await page.close();
  }

  // 4. Nita-Hinweise haben Vorrang, das Rückruf-Formular auf /zahn auch.
  {
    const { page } = await openPage(DESKTOP);
    await goto(page, '/zahn');
    await revealTeaser(page);
    await page.evaluate(() => {
      const hint = document.createElement('div');
      hint.className = 'healio-nita-teaser';
      hint.id = 'synthetischer-nita-hinweis';
      hint.style.cssText = 'position:fixed;right:80px;top:50%;width:200px;height:80px;background:#fff';
      document.body.append(hint);
    });
    await page.waitForFunction((selector) => document.querySelector(selector)?.getAttribute('data-zurueck') === 'true', { timeout: 3_000 }, TEASER);
    check(await page.$eval(TEASER, (element) => !element.hasAttribute('data-healio-nita-avoid')), 'Ausgeblendet darf der Hinweis der Nita-Leiste nicht im Weg sein.');
    await page.evaluate(() => document.getElementById('synthetischer-nita-hinweis').remove());
    await waitForTeaser(page, 3_000);
    if (await count(page, '#zahn-kontakt')) {
      await page.$eval('#zahn-kontakt', (section) => section.scrollIntoView({ block: 'center' }));
      await page.waitForFunction((selector) => document.querySelector(selector)?.getAttribute('data-zurueck') === 'true', { timeout: 3_000 }, TEASER);
      checks += 1;
    }
    await page.close();
  }

  // 4b. Nitas echtes Hinweisfenster kommt zuerst, der Rückruf-Hinweis danach. Es läuft nur am
  // Handy und nur dort, wo Nitas Leiste auch am Handy steht (nicht auf Ambulant, Stationär, Zahn).
  {
    const { page } = await openPage(MOBILE, { nitaHint: true });
    await goto(page, '/leistungen');
    await scrollPastShare(page);
    await page.waitForSelector('.healio-nita-teaser', { visible: true, timeout: 8_000 });
    await pause(1_200);
    check(!(await shown(page, TEASER)), 'Neben Nitas Hinweisfenster darf der Rückruf-Hinweis nicht stehen.');
    await page.click('.healio-nita-teaser-close');
    await page.waitForSelector('.healio-nita-teaser', { hidden: true });
    await revealTeaser(page, 3_000);
    checks += 1;
    await page.close();
  }

  // 5. Nicht auf Rechtsseiten, Ratgebern, Kampagnen-, B2B- und Sonderseiten.
  {
    const { page } = await openPage(DESKTOP);
    for (const route of ['/datenschutz', '/impressum', '/ratgeber', '/schwangerschaft', '/partner', '/kontakt', '/terminvereinbarung', '/check/naturheilkunde']) {
      await goto(page, route);
      await scrollPastShare(page);
      await pause(3_600);
      check(await count(page, `${TEASER}, ${LAUNCHER}`) === 0, `${route} darf keinen Rückruf-Hinweis zeigen.`);
    }
    await goto(page, '/datenschutz');
    check(await count(page, 'h3#rueckruf') === 1, 'Datenschutz-Abschnitt #rueckruf fehlt.');
    await page.close();
  }

  // 6. Ohne Cookie-Entscheidung wartet der Hinweis.
  {
    const { page } = await openPage(DESKTOP, { consent: false });
    await goto(page, '/leistungen');
    await page.waitForSelector('.healio-consent-surface');
    await scrollPastShare(page);
    await pause(3_800);
    check(await count(page, TEASER) === 0, 'Solange der Cookie-Hinweis offen ist, bleibt der Hinweis weg.');
    const [necessary] = await page.$$('xpath/.//button[normalize-space()="Nur notwendige"]');
    await necessary.click();
    await page.waitForSelector('.healio-consent-surface', { hidden: true });
    await revealTeaser(page);
    checks += 1;
    await page.close();
  }

  // 7. Handy: nach 20 s ohne Scrollen kompakt unten, frei von Nita, ohne Querscrollen.
  {
    const { page } = await openPage(MOBILE);
    await goto(page, '/ambulant');
    await pause(20_800);
    if (!(await count(page, TEASER))) {
      // Liegt gerade ein Knopf der Seite unten, wartet der Hinweis auf das nächste Scrollen.
      await page.evaluate(() => window.scrollBy(0, 160));
    }
    await waitForTeaser(page, 4_000);
    const card = await box(page, TEASER);
    check(card.height <= 96, `Handy: Hinweis zu hoch (${card.height} px).`);
    check(card.bottom <= MOBILE.height && card.x >= 0 && card.right <= MOBILE.width, 'Handy: Hinweis ragt aus dem Bildschirm.');
    check(await page.evaluate(() => document.documentElement.scrollWidth) <= MOBILE.width, 'Handy: Seite darf nicht quer scrollen.');
    for (const selector of ['[data-healio-nita="dock"]', '.healio-nita-pill[data-shown="true"]', '.healio-nita-bubble[data-shown="true"]']) {
      for (const handle of await page.$$(selector)) {
        const other = await handle.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return style.display === 'none' || style.visibility === 'hidden' ? null : { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        });
        if (other && other.width) check(!overlaps(card, other), `Handy: Hinweis überdeckt ${selector}.`);
      }
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await pause(400);
    await shoot(page, 'handy-390-ambulant-hinweis.png');
    await page.click(`${TEASER} .healio-rueckruf-action`);
    await page.waitForSelector(`${DIALOG}[open]`);
    const sheet = await box(page, DIALOG);
    check(Math.round(sheet.width) === MOBILE.width && Math.round(sheet.bottom) === MOBILE.height, 'Handy: Formular gehört als Blatt an den unteren Rand.');
    await page.evaluate(() => document.activeElement?.blur());
    await shoot(page, 'handy-390-ambulant-formular.png');
    await page.close();
  }

  // 8. Handy /zahn: ohne Cookie-Hinweis gibt es nichts abzuwarten.
  {
    const { page } = await openPage(MOBILE, { consent: false });
    await goto(page, '/zahn');
    await revealTeaser(page);
    await shoot(page, 'handy-390-zahn-hinweis.png');
    await page.click(`${TEASER} .healio-rueckruf-close`);
    await page.waitForSelector(TEASER, { hidden: true });
    const pillPresent = await count(page, '.healio-nita-pill');
    check(pillPresent ? (await count(page, LAUNCHER)) === 0 : await shown(page, LAUNCHER), 'Handy: runder Knopf nur, wo unten keine Nita-Leiste steht.');
    await page.close();
  }

  assert.deepEqual(pageErrors, [], `Fehler im Browser: ${pageErrors.join(' | ')}`);
  console.log(`Rückruf-Hinweis gerendert geprüft: ${checks} Prüfungen.${shotDirectory ? ` Bilder in ${shotDirectory}` : ''}`);
} finally {
  await browser.close();
}
