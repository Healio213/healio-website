/**
 * Startinfo-Vertrag mit vollständigen API-Mocks; --browser prüft zusätzlich
 * die lokale Vorschau. Alle POST-Anfragen werden abgefangen. Keine echte
 * Anmeldung, kein Brevo-/n8n-Aufruf und keine Testmail.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import handler, { CONSENT_VERSION, validateStartinfo, startinfoConfig } from '../api/altersvorsorge-startinfo.js';
import { STARTINFO_CONSENT_VERSION, STARTINFO_CONSENT_TEXT, STARTINFO_EVENT, isAltersvorsorgeRoute } from '../src/lib/altersvorsorgeStartinfo.js';

const payload = {
  first_name: ' Prüfname ', email: 'Startinfo@Example.invalid', consent: true,
  consent_version: CONSENT_VERSION, source_path: '/ratgeber/altersvorsorgedepot-kinderzulage',
  website: '', elapsed_ms: 3500,
};
const endpoint = 'https://n8n.healio.de/webhook/healio-altersvorsorge-startinfos';
const originalFetch = globalThis.fetch;
const envNames = ['ALTERSVORSORGE_STARTINFO_ENABLED', 'ALTERSVORSORGE_STARTINFO_WEBHOOK_URL', 'ALTERSVORSORGE_STARTINFO_WEBHOOK_SECRET', 'VERCEL_URL'];
const savedEnv = new Map(envNames.map((name) => [name, process.env[name]]));
let checks = 0;
let outbound = [];
let responseMode = 'accepted';
let sequence = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };
const config = () => {
  process.env.ALTERSVORSORGE_STARTINFO_ENABLED = 'true';
  process.env.ALTERSVORSORGE_STARTINFO_WEBHOOK_URL = endpoint;
  process.env.ALTERSVORSORGE_STARTINFO_WEBHOOK_SECRET = 'local-mock-only-' + (++sequence) + '-'.repeat(40);
  delete process.env.VERCEL_URL;
  outbound = [];
  responseMode = 'accepted';
};
const invoke = async (patch = {}) => {
  const req = {
    method: 'POST', body: { ...payload },
    headers: { origin: 'https://healio.de', 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.10' },
    ...patch,
  };
  const result = { headers: {}, status: null, body: null };
  const res = {
    setHeader(name, value) { result.headers[name.toLowerCase()] = value; return this; },
    status(status) { result.status = status; return this; },
    json(body) { result.body = body; return this; },
  };
  await handler(req, res);
  assert.equal(result.headers['cache-control'], 'no-store');
  return result;
};

try {
  // Der gesamte Prozess verwendet nur diesen Mock, auch bei Fehlerfällen.
  globalThis.fetch = async (url, options) => {
    assert.equal(url, endpoint);
    assert.equal(options.method, 'POST');
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(options.headers['x-healio-startinfo-secret'], process.env.ALTERSVORSORGE_STARTINFO_WEBHOOK_SECRET);
    outbound.push(JSON.parse(options.body));
    if (responseMode === 'throw') throw new Error('mock-network-error');
    if (responseMode === 'abort') throw new DOMException('mock-abort', 'AbortError');
    return {
      ok: responseMode !== 'upstream-error',
      json: async () => {
        if (responseMode === 'invalid-json') throw new Error('mock-json-error');
        return responseMode === 'accepted' ? { accepted: true }
          : responseMode === 'string-accepted' ? { accepted: 'true' } : { accepted: false };
      },
    };
  };
  assert.equal(STARTINFO_CONSENT_VERSION, CONSENT_VERSION);
  check(/Altersvorsorgedepot/.test(STARTINFO_CONSENT_TEXT) && /Webinar/.test(STARTINFO_CONSENT_TEXT) && /Abmeldelink/.test(STARTINFO_CONSENT_TEXT), 'Einwilligung braucht Themen, Webinar und Abmeldung');
  const clean = validateStartinfo(payload);
  assert.deepEqual(clean.value, { first_name: 'Prüfname', email: 'startinfo@example.invalid', consent_version: CONSENT_VERSION, source_path: payload.source_path });
  checks += 1;
  const invalidBodies = [
    null, [], 'json', { ...payload, phone: 'nicht-erlaubt' }, { ...payload, tracking: {} },
    { ...payload, first_name: '' }, { ...payload, first_name: 'x'.repeat(81) }, { ...payload, first_name: 'Name\nZeile' },
    { ...payload, email: 'falsch' }, { ...payload, email: 'a b@example.invalid' }, { ...payload, email: 'x'.repeat(65) + '@example.invalid' },
    { ...payload, consent: false }, { ...payload, consent: 'true' }, { ...payload, consent_version: 'alte-fassung' },
    { ...payload, source_path: '/zahn' }, { ...payload, source_path: '/kontakt?email=privat' }, { ...payload, source_path: 'https://fremd.invalid' },
    { ...payload, website: 'bot.invalid' }, { ...payload, website: undefined },
    { ...payload, elapsed_ms: 1999 }, { ...payload, elapsed_ms: 86400001 }, { ...payload, elapsed_ms: NaN }, { ...payload, elapsed_ms: Infinity },
  ];
  for (const body of invalidBodies) check(Boolean(validateStartinfo(body).error), 'Ungültige Eingabe muss abgewiesen werden');
  for (const route of ['/altersvorsorgedepot', '/ratgeber/altersvorsorgedepot', payload.source_path, '/ratgeber/riester-kuendigen-oder-behalten']) {
    check(isAltersvorsorgeRoute(route), 'Erlaubte Route nicht erkannt');
    check(!validateStartinfo({ ...payload, source_path: route }).error, 'API und Browser müssen dieselben erlaubten Routen kennen');
  }
  for (const route of ['/zahn', '/ratgeber', '/kontakt', '/altersvorsorgedepot/danke', '/en/ratgeber/riester-wechsel']) check(!isAltersvorsorgeRoute(route), 'Popup außerhalb seines Fachbereichs');
  config();
  check(Boolean(startinfoConfig()), 'Vollständig konfigurierte Anmeldung muss bereit sein');
  for (const [name, value] of [
    ['ALTERSVORSORGE_STARTINFO_ENABLED', 'false'],
    ['ALTERSVORSORGE_STARTINFO_WEBHOOK_URL', 'https://fremd.invalid/webhook'],
    ['ALTERSVORSORGE_STARTINFO_WEBHOOK_SECRET', 'zu-kurz'],
  ]) {
    const previous = process.env[name]; process.env[name] = value;
    check(startinfoConfig() === null, 'Ungültige Konfiguration darf nicht aktiv werden');
    process.env[name] = previous;
  }
  let result = await invoke({ method: 'GET' });
  assert.deepEqual(result.body, { ready: true }); check(result.status === 200 && outbound.length === 0, 'GET darf nur Bereitschaft nennen');
  process.env.ALTERSVORSORGE_STARTINFO_ENABLED = 'false';
  result = await invoke({ method: 'GET' }); assert.deepEqual(result.body, { ready: false });
  result = await invoke(); check(result.status === 503 && outbound.length === 0, 'Ohne Konfiguration keine Registrierung');
  config();
  result = await invoke({ method: 'DELETE' }); check(result.status === 405 && result.headers.allow === 'GET, POST', 'Unzulässige Methode');
  for (const origin of [undefined, 'null', 'http://healio.de', 'https://fremd.invalid', 'https://healio.de.fremd.invalid']) {
    result = await invoke({ headers: { origin, 'content-type': 'application/json' } });
    check(result.status === 403 && outbound.length === 0, 'Fremder Ursprung darf nichts auslösen');
  }
  result = await invoke({ headers: { origin: 'https://healio.de', 'content-type': 'text/plain' } });
  check(result.status === 415 && outbound.length === 0, 'Nur JSON akzeptieren');
  for (const body of ['{kaputt', Buffer.from('{kaputt'), 'x'.repeat(2049), { ...payload, consent: false }]) {
    result = await invoke({ body }); check(result.status === 400 && outbound.length === 0, 'Ungültiger Request darf nichts auslösen');
  }
  for (const body of [{ ...payload }, JSON.stringify(payload), Buffer.from(JSON.stringify(payload))]) {
    config(); result = await invoke({ body });
    check(result.status === 202 && result.body.accepted === true && outbound.length === 1, 'Erfolg erst nach bestätigter Annahme');
    assert.deepEqual(Object.keys(outbound[0]).sort(), ['first_name', 'email', 'consent_version', 'source_path', 'requested_at'].sort());
    assert.equal(outbound[0].email, 'startinfo@example.invalid');
    check(!JSON.stringify(result.body).includes('example.invalid'), 'Antwort darf keine Kontaktwerte spiegeln');
  }
  config(); process.env.VERCEL_URL = 'release-test.vercel.app';
  result = await invoke({ headers: { origin: 'https://release-test.vercel.app', 'content-type': 'application/json' } });
  check(result.status === 202, 'Eigener Vercel-Kandidat darf anmelden');
  result = await invoke({ headers: { origin: 'https://andere-vorschau.vercel.app', 'content-type': 'application/json' } });
  check(result.status === 403, 'Andere Vorschau darf nicht anmelden');
  for (const mode of ['not-accepted', 'string-accepted', 'upstream-error', 'invalid-json', 'throw', 'abort']) {
    config(); responseMode = mode; result = await invoke();
    check(result.status === 502 && result.body.accepted !== true && result.body.error === 'registration_failed', 'Fehler darf nicht als Registrierung bestätigt werden');
  }
  config();
  for (let i = 0; i < 6; i += 1) {
    result = await invoke({ body: { ...payload, email: 'ip-test-' + i + '@example.invalid' } });
    check(result.status === (i < 5 ? 202 : 429), 'IP-Begrenzung muss nach fünf Anfragen greifen');
  }
  assert.equal(outbound.length, 5);
  config();
  for (let i = 0; i < 3; i += 1) {
    result = await invoke({ headers: { origin: 'https://healio.de', 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.' + (20 + i) } });
    check(result.status === (i < 2 ? 202 : 429), 'Adressbegrenzung muss nach zwei Anfragen greifen');
  }
  assert.equal(outbound.length, 2);
  const popupSource = fs.readFileSync(new URL('../src/components/ratgeber/AltersvorsorgeStartinfoPopup.jsx', import.meta.url), 'utf8');
  check(/35000/.test(popupSource) && /0\.25/.test(popupSource), 'Automatik benötigt 35 Sekunden und 25 Prozent Scroll');
  check(/<dialog\b/.test(popupSource) && /showModal\(\)/.test(popupSource) && /onCancel=/.test(popupSource), 'Nativer Dialog mit Escape');
  check(!/localStorage|console\.|dataLayer|gtag|fbq/.test(popupSource), 'Popup darf Kontaktwerte weder dauerhaft speichern noch messen');
  console.log('Startinfos: ' + checks + ' API-, Routen-, Einwilligungs- und Popup-Verträge mit ausschließlich lokalen Mocks erfüllt.');
} finally {
  globalThis.fetch = originalFetch;
  for (const [name, value] of savedEnv) {
    if (value === undefined) delete process.env[name]; else process.env[name] = value;
  }
}

if (process.argv.includes('--browser')) {
  const { default: puppeteer } = await import('puppeteer');
  const origin = new URL(process.env.HEALIO_STARTINFO_PREVIEW_URL || 'http://127.0.0.1:4181').origin;
  assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'Diese Browserprüfung benötigt eine lokale Vorschau');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const forbiddenWrites = [];
  const browserErrors = [];
  const posts = [];
  const popup = 'dialog[data-altersvorsorge-startinfo]';
  let readiness = true;
  let mode = 'accepted';
  let heldRequest = null;
  let readinessCalls = 0;
  const createPage = async (width = 390, height = 844) => {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.setCacheEnabled(false);
    await page.evaluateOnNewDocument(() => {
      const base = Date.now();
      window.__startinfoTime = 0;
      Date.now = () => base + window.__startinfoTime;
    });
    page.on('pageerror', (error) => browserErrors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', async (request) => {
      const url = new URL(request.url());
      if (url.origin === origin && url.pathname === '/api/altersvorsorge-startinfo') {
        if (request.method() === 'GET') {
          readinessCalls += 1;
          await request.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ ready: readiness }) });
        } else if (request.method() === 'POST') {
          posts.push(JSON.parse(request.postData()));
          if (mode === 'hold') { heldRequest = request; return; }
          await request.respond({ status: mode === 'rate' ? 429 : mode === 'server-error' ? 500 : 200, contentType: 'application/json', body: JSON.stringify(['accepted', 'server-error'].includes(mode) ? { accepted: true } : { accepted: false }) });
        } else { forbiddenWrites.push(request.method() + ' ' + url.pathname); await request.abort(); }
      } else if (request.method() !== 'GET') {
        forbiddenWrites.push(request.method() + ' ' + url.pathname); await request.abort();
      } else if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) await request.continue();
      else await request.abort();
    });
    return page;
  };
  const load = async (page, path) => {
    const response = await page.goto(origin + path, { waitUntil: 'networkidle0' });
    assert.equal(response.status(), 200);
    await page.waitForSelector('h1');
    const consent = await page.evaluateHandle(() => [...document.querySelectorAll('button')].find((button) => /nur notwendige|nur erforderliche|alle ablehnen/i.test(button.textContent)) || null);
    if (consent.asElement()) await consent.asElement().click();
    await consent.dispose();
  };
  const open = async (page) => {
    await page.evaluate((event) => window.dispatchEvent(new Event(event)), STARTINFO_EVENT);
    await page.waitForSelector(popup + '[open]');
  };
  const advance = (page, delta) => page.evaluate((time) => { window.__startinfoTime += time; window.dispatchEvent(new Event('scroll')); }, delta);
  const fill = async (page) => {
    await page.type('#startinfo-name', 'Prüfname');
    await page.type('#startinfo-email', 'startinfo@example.invalid');
    await page.click(popup + ' input[name="consent"]');
    await advance(page, 3000);
  };
  const fit = async (page, width, height) => {
    const box = await page.$eval(popup, (dialog) => {
      const rect = dialog.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, scrollWidth: document.documentElement.scrollWidth,
        fonts: [...dialog.querySelectorAll('#startinfo-name, #startinfo-email')].map((input) => parseFloat(getComputedStyle(input).fontSize)) };
    });
    assert.ok(box.left >= 0 && box.right <= width + 1 && box.top >= 0 && box.bottom <= height + 1, 'Dialog muss ins sichtbare Fenster passen');
    assert.ok(box.scrollWidth <= width + 1 && box.fonts.every((font) => font >= 16), 'Keine Überbreite; Eingaben mindestens 16 px');
  };
  try {
    let page = await createPage();
    await load(page, '/ratgeber/altersvorsorgedepot-kinderzulage');
    assert.equal(await page.$eval(popup, (dialog) => dialog.open), false);
    await advance(page, 35000);
    assert.equal(await page.$eval(popup, (dialog) => dialog.open), false, 'Zeit allein darf das Popup nicht öffnen');
    await page.evaluate(() => { window.__startinfoTime = 34000; window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * 0.3); window.dispatchEvent(new Event('scroll')); });
    assert.equal(await page.$eval(popup, (dialog) => dialog.open), false, 'Scroll allein darf es vor 35 Sekunden nicht öffnen');
    await page.evaluate(() => {
      const other = document.createElement('div'); other.id = 'test-other-dialog'; other.setAttribute('role', 'dialog'); document.body.append(other);
    });
    await advance(page, 1000);
    assert.equal(await page.$eval(popup, (dialog) => dialog.open), false, 'Ein bestehender Dialog darf nicht überlagert werden');
    await page.evaluate(() => document.getElementById('test-other-dialog').remove());
    await advance(page, 0);
    await page.waitForSelector(popup + '[open]');
    await fit(page, 390, 844);
    assert.ok(await page.$eval(popup, (dialog) => dialog.contains(document.activeElement)), 'Fokus muss im nativen Dialog liegen');
    for (let i = 0; i < 9; i += 1) {
      await page.keyboard.press('Tab');
      assert.ok(await page.$eval(popup, (dialog) => {
        // Chrome nutzt zwischen letztem Feld und erneutem Dialogfokus eine
        // native BODY-Zwischenstation. Die übrige Seite bleibt dabei inert.
        const safePosition = dialog.contains(document.activeElement) || document.activeElement === document.body;
        const background = document.querySelector('main button, main a');
        if (background) background.focus();
        return dialog.open && safePosition && (!background || document.activeElement !== background);
      }), 'Nativer Modalzustand muss jeden Fokus auf Seiteninhalte blockieren');
    }
    await page.keyboard.press('Escape');
    await page.waitForFunction((selector) => !document.querySelector(selector).open, {}, popup);
    await advance(page, 60000);
    assert.equal(await page.$eval(popup, (dialog) => dialog.open), false, 'Automatik höchstens einmal je Sitzung');
    await open(page);
    await page.click(popup + ' button[type="submit"]');
    assert.equal(posts.length, 0, 'Leere Pflichtfelder müssen im Browser blockieren');
    assert.ok(await page.$eval(popup + ' a[href="/datenschutz#altersvorsorge-startinfos"]', (link) => link.textContent.includes('Datenschutzerklärung')));
    assert.equal(await page.$eval(popup + ' input[name="consent"]', (input) => input.checked), false, 'Einwilligung darf nicht vorbelegt sein');
    await fill(page);
    mode = 'not-accepted';
    await page.click(popup + ' button[type="submit"]');
    await page.waitForSelector(popup + ' [role="alert"]');
    assert.equal(await page.$eval('#startinfo-name', (input) => input.value), 'Prüfname');
    assert.equal(await page.$eval('#startinfo-email', (input) => input.value), 'startinfo@example.invalid');
    assert.equal(await page.$eval(popup + ' input[name="consent"]', (input) => input.checked), true);
    assert.equal(await page.$eval(popup, (dialog) => dialog.textContent.includes('Ein Klick fehlt noch.')), false, 'accepted:false darf keinen Erfolg zeigen');
    mode = 'rate';
    await page.click(popup + ' button[type="submit"]');
    await page.waitForFunction((selector) => /Minuten/.test(document.querySelector(selector).textContent), {}, popup);
    mode = 'server-error';
    await page.click(popup + ' button[type="submit"]');
    await page.waitForFunction((selector) => /Postfach/.test(document.querySelector(selector).textContent), {}, popup);
    assert.equal(await page.$eval(popup, (dialog) => dialog.textContent.includes('Ein Klick fehlt noch.')), false, 'HTTP-Fehler bleibt auch bei accepted:true ein Fehler');
    mode = 'accepted';
    await page.click(popup + ' button[type="submit"]');
    await page.waitForFunction((selector) => /Ein Klick fehlt noch/.test(document.querySelector(selector).textContent), {}, popup);
    const submitted = posts.at(-1);
    assert.deepEqual(Object.keys(submitted).sort(), Object.keys(payload).sort(), 'Browser sendet ausschließlich die sieben erlaubten Felder');
    assert.equal(submitted.consent, true); assert.equal(submitted.consent_version, STARTINFO_CONSENT_VERSION);
    assert.equal(submitted.source_path, '/ratgeber/altersvorsorgedepot-kinderzulage');
    assert.ok(submitted.elapsed_ms >= 2000);
    assert.ok(await page.evaluate(() => ![...Object.values(localStorage), ...Object.values(sessionStorage)].some((value) => /startinfo@example.invalid|Prüfname/.test(value))), 'Keine Kontaktwerte im Browser-Speicher');
    await page.close();

    for (const [width, height] of [[360, 800], [390, 844], [1440, 900]]) {
      page = await createPage(width, height);
      await load(page, '/altersvorsorgedepot');
      await open(page); await fit(page, width, height);
      if (width < 500) { await page.setViewport({ width, height: 360 }); await fit(page, width, 360); }
      const rect = await page.$eval(popup, (dialog) => { const box = dialog.getBoundingClientRect(); return { left: box.left, top: box.top }; });
      await page.mouse.click(rect.left + 3, rect.top + 3);
      assert.equal(await page.$eval(popup, (dialog) => dialog.open), true, 'Klick im Innenabstand ist kein Backdrop-Klick');
      await page.click(popup + ' button[aria-label="Fenster schließen"]');
      await page.waitForFunction((selector) => !document.querySelector(selector).open, {}, popup);
      assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'Schließen muss den Seitenscroll freigeben');
      await page.close();
    }

    readiness = false; page = await createPage();
    await load(page, '/ratgeber/altersvorsorgedepot');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await advance(page, 60000);
    assert.equal(await page.$eval(popup, (dialog) => dialog.open), false, 'Nicht verfügbare Anmeldung darf nicht automatisch erscheinen');
    await open(page);
    assert.equal(await page.$eval(popup, (dialog) => dialog.querySelector('form')), null);
    assert.ok(await page.$eval(popup + ' a[href="/kontakt"]', (link) => link.textContent.includes('Kontaktformular')));
    await page.close();

    readiness = true; mode = 'hold'; heldRequest = null; page = await createPage();
    await load(page, '/ratgeber/altersvorsorgedepot-kosten'); await open(page); await fill(page);
    await page.click(popup + ' button[type="submit"]');
    await page.waitForFunction((selector) => document.querySelector(selector + ' button[type="submit"]').disabled, {}, popup);
    assert.ok(heldRequest, 'Mock muss den laufenden Request abfangen');
    const pendingPostCount = posts.length;
    await page.keyboard.press('Escape'); await open(page);
    assert.equal(await page.$eval(popup + ' button[type="submit"]', (button) => button.disabled), true, 'Wiederöffnen darf einen laufenden Request nicht verdoppeln');
    assert.equal(posts.length, pendingPostCount);
    await heldRequest.respond({ status: 202, contentType: 'application/json', body: JSON.stringify({ accepted: true }) });
    await page.waitForFunction((selector) => /Ein Klick fehlt noch/.test(document.querySelector(selector).textContent), {}, popup);
    await page.close();

    mode = 'hold'; heldRequest = null; page = await createPage();
    await load(page, '/ratgeber/altersvorsorgedepot-kosten'); await open(page); await fill(page);
    await page.click(popup + ' button[type="submit"]');
    await page.waitForFunction((selector) => document.querySelector(selector + ' button[type="submit"]').disabled, {}, popup);
    await page.evaluate(() => {
      window.history.pushState({}, '', '/zahn'); window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await page.waitForFunction((selector) => !document.querySelector(selector), {}, popup);
    assert.equal(await page.$(popup), null, 'Navigation beendet den Dialog und den laufenden Clientrequest');
    await page.close();

    mode = 'accepted'; page = await createPage(); const before = readinessCalls;
    await load(page, '/zahn');
    assert.equal(await page.$(popup), null, 'Popup darf auf Gesundheitsrouten nicht montiert werden');
    assert.equal(readinessCalls, before, 'Andere Fachbereiche brauchen keine Startinfo-Bereitschaftsabfrage');
    await page.close();
    assert.deepEqual(forbiddenWrites, [], 'Keine echten Schreibanfragen erlaubt');
    assert.deepEqual(browserErrors, [], 'Keine Laufzeitfehler im Browser');
    console.log('Startinfo-Browser: Automatik, einmalige Sitzung, nativer Fokus/Escape, 360/390/1440 px, Tastaturhöhe, Datenschutz, Fehler/Wiederholung und Annahme mit ausschließlich Mock-POSTs geprüft.');
  } finally {
    await browser.close();
  }
}
