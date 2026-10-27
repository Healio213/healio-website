/** Echte lokale Komponenten und Consent-Module; Mail/GA-Skripte nur als Mocks. */
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const origin = new URL(process.env.HEALIO_ANALYTICS_PREVIEW_URL || 'http://127.0.0.1:4187').origin;
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'Nur lokale Vorschau');
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const form = '[data-altersvorsorge-vormerkung]';
const articleSlug = 'altersvorsorgedepot-foerderung';
const errors = [];
const previewFailures = [];
const forbiddenWrites = [];
const posts = [];
const analyticsRequests = [];
let delivery = 'success';
let heldRequest = null;
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };
const cors = { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': '*' };
const reply = (request, status = 200) => request.respond({ status, headers: cors, contentType: 'text/plain', body: status === 200 ? 'OK' : 'Mock rejected' });
const consentState = (analytics) => ({ version: 2, decided: true, necessary: true, preferences: { analytics, marketing: false, google_calendar: false, maps: false, openai: false }, source: 'settings', updatedAt: new Date().toISOString() });
const create = async (analytics) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.evaluateOnNewDocument((state) => { localStorage.setItem('healio:consent:v2', JSON.stringify(state)); sessionStorage.setItem('healio-altersvorsorge-startinfo-dismissed', '1'); }, consentState(analytics));
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400 && response.url().startsWith(origin)) previewFailures.push(`${response.status()} ${new URL(response.url()).pathname}`); });
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const url = new URL(request.url());
    if (url.hostname === 'api.emailjs.com' && url.pathname === '/api/v1.0/email/send') {
      if (request.method() === 'OPTIONS') { await request.respond({ status: 204, headers: cors }); return; }
      if (request.method() === 'POST') {
        posts.push(JSON.parse(request.postData()));
        if (delivery === 'hold') { heldRequest = request; return; }
        await reply(request, delivery === 'error' ? 500 : 200); return;
      }
    }
    if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') {
      analyticsRequests.push(url.href);
      await request.respond({ status: 200, contentType: 'application/javascript', body: '/* local GA4 stub: no provider connection */' }); return;
    }
    if (request.method() !== 'GET') { forbiddenWrites.push(`${request.method()} ${url.hostname}${url.pathname}`); await request.abort(); return; }
    if (url.origin === origin && url.pathname.startsWith('/api/')) { await request.respond({ status: 200, contentType: 'application/json', body: '{"ready":false}' }); return; }
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) await request.continue(); else await request.abort();
  });
  return page;
};
const load = async (page, path) => {
  // Nicht beteiligte Bild-/Editoranfragen sind kein Bereitschaftssignal für den Funnel.
  await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  if (path.startsWith('/ratgeber/')) await page.waitForSelector('[data-altersvorsorge-artikel-check] input[type="range"]');
  else if (path.startsWith('/altersvorsorgedepot')) await page.waitForSelector('#rechner-beitrag');
};
const events = (page) => page.evaluate(() => (window.dataLayer || []).map((entry) => Array.from(entry)).filter(([command, name]) => command === 'event' && name.startsWith('altersvorsorge_')));
const count = async (page, name, placement) => (await events(page)).filter(([, eventName, params]) => eventName === name && (!placement || params.placement === placement)).length;
const open = async (page) => {
  const button = await page.evaluateHandle(() => [...document.querySelectorAll('#rechner button')].find((item) => /Berechnung speichern/.test(item.textContent)));
  await button.asElement().click(); await button.dispose();
  await page.waitForSelector(form + ' input[name="first_name"]', { visible: true });
};
const fill = async (page) => {
  await page.type(form + ' input[name="first_name"]', 'Analytics Prüffall');
  await page.type(form + ' input[name="email"]', 'analytics-pruefung@example.invalid');
  await page.type(form + ' input[name="phone"]', '+49 30 0000000');
  await page.click(form + ' input[name="consent"]');
};
const changeCalculator = async (page, selector) => { await page.focus(selector); await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft'); };
const submit = (page) => page.$eval(form + ' form', (element) => element.requestSubmit());
const waitSending = async (page) => { await page.waitForFunction(() => document.querySelector('[data-altersvorsorge-vormerkung] button[type="submit"]')?.disabled === true); };

try {
  // Ein kopierter Artikel-Link trägt kein history.state in den neuen Tab.
  let page = await create(true);
  await load(page, '/ratgeber/' + articleSlug);
  await changeCalculator(page, '[data-altersvorsorge-artikel-check] input[type="range"]');
  const articleHref = await page.$eval('[data-altersvorsorge-artikel-check] a[href*="#altersvorsorge-vormerkung"]', (link) => link.getAttribute('href'));
  await page.close();
  page = await create(true);
  await load(page, articleHref);
  check(Boolean(await page.$(form)), 'Kopierter Artikel-Link öffnet das Inlineformular ohne history.state');
  assert.equal(await page.$('#rechner-beitrag').then((element) => element.evaluate((input) => input.value)), '150', 'Neuer Tab übernimmt keinen verlorenen Rechnungssnapshot');
  assert.equal(await page.$('[data-artikel-check-uebernahme]'), null, 'Ohne gültigen Zustand keine Behauptung einer Artikelübernahme');
  assert.equal(await count(page, 'altersvorsorge_article_click'), 0, 'Ein kopierter Link behauptet keinen Artikel-Klick');
  assert.equal(await count(page, 'altersvorsorge_form_open', 'inline_form'), 1);
  await page.close();

  // Freie Query-/History-Angaben dürfen beim direkten Hash kein Snapshot werden.
  page = await create(true);
  await page.evaluateOnNewDocument(() => {
    history.replaceState({ usr: { altersvorsorgeVormerkung: true, altersvorsorgeArtikelCheck: { slug: 'altersvorsorgedepot-fremd', value: { monatsbeitrag: 9999, kinder: 2, unter25: true } } } }, '');
  });
  await load(page, '/altersvorsorgedepot?monatsbeitrag=50&kinder=2&article_slug=' + articleSlug + '#altersvorsorge-vormerkung');
  check(Boolean(await page.$(form)), 'Expliziter Formularhash öffnet auch ohne gültigen Snapshot');
  assert.equal(await page.$eval('#rechner-beitrag', (input) => input.value), '150');
  assert.equal(await page.$('[data-artikel-check-uebernahme]'), null);
  assert.equal(await page.$eval(form + ' input[name="first_name"]', (input) => input.value), '');
  assert.equal(await page.$eval(form + ' input[name="consent"]', (input) => input.checked), false);
  await page.close();

  // Versandannahme bleibt auch bei SPA-Unmount messbar, Fehler bleibt erfolglos.
  for (const { status, destination, expected } of [
    { status: 200, destination: '/ratgeber/altersvorsorgedepot', expected: 1 },
    { status: 500, destination: '/ratgeber/altersvorsorgedepot', expected: 0 },
    { status: 200, destination: '/zahn', expected: 0 },
  ]) {
    page = await create(true); delivery = 'hold';
    await load(page, '/altersvorsorgedepot'); await open(page); await fill(page); await submit(page); await waitSending(page);
    if (destination === '/zahn') {
      // Browser-History-Navigation lässt die SPA bestehen und wechselt die Route.
      await page.evaluate((path) => { history.pushState(null, '', path); window.dispatchEvent(new PopStateEvent('popstate')); }, destination);
    } else await page.$eval(`a[href="${destination}"]`, (link) => link.click());
    await page.waitForFunction((path) => location.pathname === path && !document.querySelector('[data-altersvorsorge-vormerkung]'), {}, destination);
    assert.ok(heldRequest); await reply(heldRequest, status); heldRequest = null;
    if (expected) await page.waitForFunction(() => (window.dataLayer || []).some((entry) => entry[0] === 'event' && entry[1] === 'altersvorsorge_lead'), { timeout: 4000 });
    else await new Promise((resolve) => setTimeout(resolve, 150));
    assert.equal(await count(page, 'altersvorsorge_lead'), expected, 'SPA-Unmount: genau ein Erfolg nur bei Annahme und erlaubter Zielroute');
    check(true, 'SPA-Unmount nach Versand bleibt für Erfolg/Fehler korrekt');
    await page.close();
  }

  // RED vor Integration: Der bisherige Artikelknopf erzeugt dieses Ereignis noch nicht.
  page = await create(true);
  await load(page, '/ratgeber/' + articleSlug + '?email=private@example.invalid&phone=0300000000&kinder=2');
  await changeCalculator(page, '[data-altersvorsorge-artikel-check] input[type="range"]');
  await page.click('[data-ratgeber-internal-cta="end"]');
  await page.waitForSelector('#rechner-beitrag');
  assert.equal(await count(page, 'altersvorsorge_article_click'), 1, 'Ratgeber->Rechner-Klick muss genau einmal gezählt werden');
  assert.equal(await count(page, 'altersvorsorge_calculator_start', 'article_calculator'), 1, 'Erste Artikelrechner-Interaktion zählt nur einmal');
  await changeCalculator(page, '#rechner-beitrag');
  assert.equal(await count(page, 'altersvorsorge_calculator_start', 'landing_calculator'), 1);
  await open(page);
  assert.equal(await count(page, 'altersvorsorge_form_open'), 1);
  assert.equal(await count(page, 'altersvorsorge_form_start'), 0, 'Autofokus ist kein Formulareinstieg');
  await fill(page);
  assert.equal(await count(page, 'altersvorsorge_form_start'), 1, 'Mehrere eingegebene Zeichen ergeben nur einen Einstieg');
  delivery = 'hold';
  const sendsBefore = posts.length;
  await page.$eval(form + ' form', (element) => { element.requestSubmit(); element.requestSubmit(); });
  await waitSending(page);
  assert.equal(await count(page, 'altersvorsorge_lead'), 0, 'Vor Annahme kein Erfolgsereignis');
  assert.equal(posts.length, sendsBefore + 1, 'Doppelklick darf keinen zweiten Versand auslösen');
  assert.ok(heldRequest); await reply(heldRequest); heldRequest = null;
  await page.waitForSelector('[data-vormerkung-erfolg]');
  assert.equal(await count(page, 'altersvorsorge_lead'), 1, 'Eine angenommene Anfrage erzeugt genau einen Erfolg');
  check(posts.at(-1).template_params.message.includes('/ratgeber/' + articleSlug), 'Bekannte Artikelherkunft ist intern in der Anfrage erhalten');
  const measured = await events(page);
  const allowed = new Set(['component', 'action', 'placement', 'page_location', 'page_path', 'page_referrer', 'send_to']);
  for (const [, name, params] of measured) {
    check(name.length <= 40 && Object.keys(params).every((key) => allowed.has(key)), 'Nur feste Ereignisse und freigegebene Metadaten');
    check(params.send_to === 'G-VSN76YW5SC', 'Funnelereignisse gehen ausschließlich an GA4');
    check(!/[?@+]|Analytics Prüffall|analytics-pruefung|0300000000/.test(JSON.stringify(params)), 'Keine Kontaktdaten oder URL-Query in Messereignissen');
    check(!Object.hasOwn(params, 'article_slug'), 'Zentrale Analytics-Allowlist wird nicht erweitert');
  }
  const sourceChecks = await page.evaluate(async (slug) => {
    const module = await import('/src/lib/altersvorsorgeAnalytics.js');
    return [module.getAltersvorsorgeArticleSource(slug), ...['fremder-artikel', slug + '?email=private', '/ratgeber/' + slug, 'private@example.invalid', null, {}, 42].map((value) => module.getAltersvorsorgeArticleSource(value))];
  }, articleSlug);
  assert.deepEqual(sourceChecks, [articleSlug, null, null, null, null, null, null, null]);
  check(await page.evaluate(async () => {
    const module = await import('/src/lib/altersvorsorgeAnalytics.js');
    return module.trackAltersvorsorgeFunnel('beliebig', 'inline_form') === false && module.trackAltersvorsorgeFunnel('lead', 'private@example.invalid') === false;
  }), 'Unbekannte Ereignisse und Placements werden verworfen');
  await page.close();

  page = await create(false);
  const requestsBefore = analyticsRequests.length;
  delivery = 'success';
  await load(page, '/ratgeber/' + articleSlug);
  await changeCalculator(page, '[data-altersvorsorge-artikel-check] input[type="range"]');
  await page.click('[data-ratgeber-internal-cta="end"]'); await page.waitForSelector('#rechner-beitrag');
  await changeCalculator(page, '#rechner-beitrag'); await open(page); await fill(page); await submit(page);
  await page.waitForSelector('[data-vormerkung-erfolg]');
  assert.deepEqual(await events(page), [], 'Ohne Analytics-Consent bleibt der gesamte Funnel still');
  assert.equal(analyticsRequests.length, requestsBefore, 'Ohne Consent kein GA4-Script laden');
  await page.close();

  page = await create(true); delivery = 'error';
  await load(page, '/altersvorsorgedepot'); await open(page); await fill(page); await submit(page);
  await page.waitForSelector(form + ' [role="alert"]');
  assert.equal(await count(page, 'altersvorsorge_lead'), 0, 'Versandfehler erzeugt keinen Erfolg');
  delivery = 'hold'; await submit(page); await waitSending(page);
  await page.evaluate(async () => { const consent = await import('/src/lib/consent.js'); consent.allowNecessaryConsent('settings'); });
  assert.ok(heldRequest); await reply(heldRequest); heldRequest = null;
  await page.waitForSelector('[data-vormerkung-erfolg]');
  assert.equal(await count(page, 'altersvorsorge_lead'), 0, 'Widerruf vor Versandannahme verhindert das Erfolgsereignis');
  await page.close();

  page = await create(true); delivery = 'success';
  await load(page, '/altersvorsorgedepot'); await open(page); await fill(page);
  await page.evaluate(() => { window.dataLayer.push = () => { throw new Error('mock analytics outage'); }; });
  await submit(page); await page.waitForSelector('[data-vormerkung-erfolg]');
  assert.equal(await page.$(form + ' [role="alert"]'), null, 'Trackingausfall darf den angenommenen Versand nicht zum Fehler machen');
  await page.close();

  for (const path of ['/zahn', '/ambulant?src=reel-f05']) {
    page = await create(true); await load(page, path);
    check(await page.evaluate(async () => { const module = await import('/src/lib/altersvorsorgeAnalytics.js'); return module.trackAltersvorsorgeFunnel('lead', 'inline_form') === false; }), 'Bestehende private Routensperre bleibt wirksam');
    assert.deepEqual(await events(page), []); await page.close();
  }
  assert.deepEqual(errors, [], 'Keine unbehandelten Browserfehler');
  assert.deepEqual(forbiddenWrites, [], 'Keine ungemockten Schreibanfragen');
  console.log(`Altersvorsorge-Analytics: ${checks} Sicherheits-/Metadatenprüfungen plus Funnel-, Consent-, Widerruf- und Erfolgschecks bestanden; ${posts.length} Mailanfragen nur lokal gemockt.`);
} catch (error) {
  if (errors.length) console.error('Browserfehler:', errors);
  if (previewFailures.length) console.error('Vorschauantworten:', previewFailures);
  throw error;
} finally {
  if (heldRequest) await heldRequest.abort().catch(() => {});
  await browser.close();
}
