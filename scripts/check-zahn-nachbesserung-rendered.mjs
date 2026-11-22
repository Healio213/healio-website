// Gerenderte Prüfung der Nachbesserung „Zahn einschalten“ (22.11.2026) aus den Gegenprüfungen Kundensicht und Sicherheit, unsichtbar
// im Headless-Chrome gegen den fertigen Bau (vite preview auf dist, Schalter wie im Bau) und die Attrappe des Antragsdienstes
// (scripts/antrag-selbst-mock.mjs). Anfragen an den Antragsdienst gehen an die Attrappe, alles andere nach außen wird abgebrochen.
// Keine Anfrage an eine Gesellschaft, an Level Nine oder an den Rechner der Bayerischen.
//
// Aufruf (nach npm run build): node scripts/check-zahn-nachbesserung-rendered.mjs [--web-port 4981] [--api-port 8881] [--fotos <ordner>] [--lauf <name>]
// Jede Prüfung trägt die Nummer des Mangels aus GEGENPRUEFUNG-KUNDENSICHT.md. Am Ende: Liste je Mangel, Rückgabewert 1 bei einem Fehler.
//   M1  Knöpfe und Überschrift im Zahn-Check und auf der Anlassseite ohne Gesellschaft, einheitlich „Online abschließen“
//   M2  „Jetzt sehen, was du zahlst“ führt direkt in den Einstieg des Antrags
//   M4  Tarifseite nennt den Beitrag mit dem Zuschlag aus der Weiche
//   M5  Browser-Zurück in den Vorfragen und von der Maske zur Weiche
//   M6  „Lieber am Telefon“ öffnet die Terminbuchung in einem neuen Tab
//   M7  Danke-Seite: kein Text ragt über die Karten (1280 und 390)
//   M10 Datenschutz nennt den direkten Abruf der Unterlagen der Bayerischen
//   M11 Zahn-Check und Anlassseite zählen keinen versicherer_klick mehr
//   WEG Kundenweg UKV und Bayerische am Handy bis zur Danke-Seite (Beitrag gleich, kein waagerechtes Scrollen)
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const arg = (name, standard) => { const stelle = args.indexOf(name); return stelle >= 0 ? args[stelle + 1] : standard; };
const WEB_PORT = Number(arg('--web-port', 4981));
const API_PORT = Number(arg('--api-port', 8881));
const FOTOS = arg('--fotos', null);
const LAUF = arg('--lauf', 'lauf');
const WEB = `http://127.0.0.1:${WEB_PORT}`;
const API = `http://127.0.0.1:${API_PORT}`;
const DIENST = 'https://voice-pilot.healio.de';

const require = createRequire(import.meta.url);
function ladePlaywright() {
  try { return require('playwright'); } catch { /* nicht im Repo */ }
  return require(process.env.PLAYWRIGHT_PFAD || '/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/node_modules/playwright');
}
const { chromium } = ladePlaywright();

const ergebnisse = [];
const befund = (mangel, ok, text) => { ergebnisse.push({ mangel, ok: Boolean(ok), text }); if (!ok) console.log(`FEHLT ${mangel}: ${text}`); };
const prozesse = [];
async function warteAuf(url, ms = 60000) {
  const ende = Date.now() + ms;
  while (Date.now() < ende) {
    try { const antwort = await fetch(url); if (antwort.status < 500) return; } catch { /* noch nicht da */ }
    await new Promise((fertig) => { setTimeout(fertig, 300); });
  }
  throw new Error(`Server antwortet nicht: ${url}`);
}
async function starteServer() {
  prozesse.push(spawn(process.execPath, ['scripts/antrag-selbst-mock.mjs'], {
    cwd: ROOT, env: { ...process.env, ANTRAG_SELBST_MOCK_PORT: String(API_PORT), ANTRAG_ERLAUBTE_HERKUNFT: WEB }, stdio: 'ignore',
  }));
  prozesse.push(spawn(path.join(ROOT, 'node_modules/.bin/vite'), ['preview', '--host', '127.0.0.1', '--port', String(WEB_PORT), '--strictPort'], { cwd: ROOT, stdio: 'ignore' }));
  await warteAuf(`${API}/antrag/gesund`);
  await warteAuf(`${WEB}/zahn`);
}
const stoppe = () => prozesse.forEach((kind) => { try { kind.kill('SIGTERM'); } catch { /* weg */ } });
const mock = (pfad, methode = 'GET') => fetch(`${API}${pfad}`, { method: methode }).then((antwort) => antwort.json());

// Kontext wie beim Kunden ohne Zustimmung zu Messung und Marketing. navigator.webdriver auf false, damit der anonyme Zähler sendet
// (er wird hier abgefangen und nur mitgeschrieben).
async function kontext(browser, breite) {
  const protokoll = { zaehler: [], extern: [] };
  const context = await browser.newContext({
    viewport: { width: breite, height: breite < 600 ? 844 : 900 }, ...(breite < 600 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
  });
  await context.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });
    try {
      localStorage.setItem('healio:consent:v2', JSON.stringify({
        version: 2, decided: true, necessary: true, preferences: { analytics: false, marketing: false }, source: 'banner', updatedAt: new Date().toISOString(),
      }));
    } catch { /* ohne Speicher */ }
  });
  await context.route('**/*', async (route) => {
    const anfrage = route.request();
    const url = anfrage.url();
    if (url.startsWith(WEB)) {
      if (new URL(url).pathname === '/api/zaehler') {
        try { protokoll.zaehler.push(JSON.parse(anfrage.postData() || '{}')); } catch { protokoll.zaehler.push({}); }
        return route.fulfill({ status: 204, body: '' });
      }
      return route.continue();
    }
    if (url.startsWith('data:') || url.startsWith('blob:')) return route.continue();
    if (url.startsWith(`${DIENST}/antrag/api`)) {
      try {
        const antwort = await route.fetch({ url: url.replace(DIENST, API), headers: { ...anfrage.headers(), origin: WEB } });
        return route.fulfill({ response: antwort });
      } catch { return route.abort(); }
    }
    protokoll.extern.push(url.slice(0, 120));
    if (/bayculator\.diebayerische\.de/.test(url) && anfrage.method() === 'GET') return route.fulfill({ status: 200, contentType: 'application/pdf', body: '%PDF-1.4 attrappe' });
    return route.abort();
  });
  return { context, protokoll };
}

async function foto(page, name) {
  if (!FOTOS) return;
  fs.mkdirSync(FOTOS, { recursive: true });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(FOTOS, `nachbesserung-${LAUF}-${name}.png`), fullPage: true });
}
async function fotoTeil(teil, name) {
  if (!FOTOS) return;
  fs.mkdirSync(FOTOS, { recursive: true });
  await teil.scrollIntoViewIfNeeded();
  await teil.page().waitForTimeout(300);
  await teil.screenshot({ path: path.join(FOTOS, `nachbesserung-${LAUF}-${name}.png`) });
}
const bildschirm = (page, id) => page.waitForSelector(`[data-bildschirm="${id}"]`, { timeout: 15000 });
async function weiter(page) { await page.waitForTimeout(500); await page.locator('[data-weiter]').click(); }
async function ohneQuerScrollen(page, wo) {
  const breite = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, innen: window.innerWidth }));
  befund('WEG', breite.scroll <= breite.innen, `${wo}: kein waagerechtes Scrollen (${breite.scroll} zu ${breite.innen})`);
}
const euroAus = (text) => (String(text).match(/\d{1,3}(?:\.\d{3})*,\d{2}\s?EUR/) || [null])[0]?.replace(/\s/g, ' ') || null;
// Betrag aus der Karte der Weiche (nur das Feld mit dem Betrag, sonst verschmilzt „ZahnPRIVAT 100“ mit dem Betrag).
const weicheBetrag = async (page, stufe) => euroAus(await page.locator(`[data-weiche-stufe="${stufe}"] p.whitespace-nowrap`).first().innerText());

// ---- M1, M11: Zahn-Check auf /zahn -------------------------------------------------------------------------------------------------
const CHECK_WEGE = {
  ukvLeistung: [['Hat dein Zahnarzt', 'Nein, nichts davon'], ['Fehlen dir Zähne', 'Nein, alle Zähne sind vorhanden oder ersetzt'], ['Zahn-Vorgeschichte', 'Nein, nichts davon'], ['Was ist dir am wichtigsten', 'Maximale Leistung']],
  sofort: [['Hat dein Zahnarzt', 'Ja, etwas steht an oder läuft schon'], ['Fehlen dir Zähne', 'Nein, alle Zähne sind vorhanden oder ersetzt'], ['Zahn-Vorgeschichte', 'Nein, nichts davon']],
  bayerischeOhneSofort: [['Hat dein Zahnarzt', 'Ja, aber schon fertig behandelt und abgerechnet'], ['Fehlen dir Zähne', 'Nein, alle Zähne sind vorhanden oder ersetzt'], ['Zahn-Vorgeschichte', 'Nein, nichts davon']],
};
async function zahnCheck(browser, breite) {
  for (const [weg, schritte] of Object.entries(CHECK_WEGE)) {
    const { context, protokoll } = await kontext(browser, breite);
    const page = await context.newPage();
    await page.goto(`${WEB}/zahn`, { waitUntil: 'networkidle' });
    const karte = page.locator('#zahn-check');
    for (const [frage, antwort] of schritte) {
      await karte.locator('h3', { hasText: frage }).waitFor({ timeout: 10000 });
      await karte.locator('button', { hasText: antwort }).first().click();
    }
    const aktionen = karte.locator('[data-dental-result-actions] a');
    await aktionen.first().waitFor({ timeout: 10000 });
    const kopf = (await karte.locator('[aria-live="polite"] > p').first().textContent()).trim();
    const knopf = (await aktionen.first().textContent()).trim();
    befund('M1', !/UKV|Bayerisch/i.test(kopf), `${breite} Zahn-Check ${weg}: Überschrift ohne Gesellschaft („${kopf}“)`);
    befund('M1', knopf === 'Online abschließen', `${breite} Zahn-Check ${weg}: Knopf „Online abschließen“ („${knopf}“)`);
    if (weg !== 'bayerischeOhneSofort') await fotoTeil(page.locator(`#${'zahn-check'} [aria-live="polite"]`).first(), `${breite}-zahncheck-${weg}`);
    await aktionen.first().click();
    await page.waitForURL(/\/antrag\/zahn/, { timeout: 10000 });
    await page.waitForSelector('[data-vorab-frage="V1"]', { timeout: 10000 });
    await page.waitForTimeout(300);
    const vk = protokoll.zaehler.filter((z) => z.ereignis === 'versicherer_klick');
    befund('M11', vk.length === 0, `${breite} Zahn-Check ${weg}: kein versicherer_klick (${JSON.stringify(vk)})`);
    befund('M11', protokoll.zaehler.some((z) => z.ereignis === 'antragsweg' && z.ziel === 'zahn-allein'), `${breite} Zahn-Check ${weg}: antragsweg zahn-allein gezählt`);
    befund('WEG', protokoll.extern.every((u) => !/levelnine|diebayerische|uniondt|ukv/i.test(u)), `${breite} Zahn-Check ${weg}: keine Anfrage an eine Gesellschaft`);
    await context.close();
  }
}

// ---- M1, M11: Anlassseite /zahn/behandlung-steht-an ---------------------------------------------------------------------------------
async function anlassseite(browser, breite) {
  const { context, protokoll } = await kontext(browser, breite);
  const page = await context.newPage();
  await page.goto(`${WEB}/zahn/behandlung-steht-an`, { waitUntil: 'networkidle' });
  const knoepfe = await page.locator('main a[href*="online-berechnen/zahn"]').evaluateAll((liste) => liste.map((a) => (a.textContent || '').trim()));
  befund('M1', knoepfe.length >= 3, `${breite} Anlassseite: drei Abschlussknöpfe (${knoepfe.length})`);
  befund('M1', knoepfe.every((t) => !/UKV|Bayerisch/i.test(t)), `${breite} Anlassseite: kein Knopf nennt eine Gesellschaft (${JSON.stringify(knoepfe)})`);
  befund('M1', knoepfe.filter((t) => t !== 'Gleich online abschließen').every((t) => t === 'Online abschließen'), `${breite} Anlassseite: Knöpfe unter dem Rechner und im Ablauf heißen „Online abschließen“`);
  const ziel = page.locator('main a[href*="online-berechnen/zahn"]').nth(1);
  await fotoTeil(ziel.locator('xpath=..'), `${breite}-anlassseite-knopf`);
  await ziel.click();
  await page.waitForURL(/\/antrag\/zahn/, { timeout: 10000 });
  await page.waitForSelector('[data-vorab-frage="V1"]', { timeout: 10000 });
  await page.waitForTimeout(300);
  const vk = protokoll.zaehler.filter((z) => z.ereignis === 'versicherer_klick');
  befund('M11', vk.length === 0, `${breite} Anlassseite: kein versicherer_klick (${JSON.stringify(vk)})`);
  await context.close();
}

// ---- M2: „Jetzt sehen, was du zahlst“ ----------------------------------------------------------------------------------------------
async function jetztSehen(browser, breite) {
  const { context } = await kontext(browser, breite);
  const page = await context.newPage();
  await page.goto(`${WEB}/zahn`, { waitUntil: 'networkidle' });
  const knopf = page.locator('[data-dental-entry-actions] a').filter({ visible: true }).first();
  const text = (await knopf.textContent()).trim();
  befund('M2', text === 'Jetzt sehen, was du zahlst', `${breite} /zahn: Kopfknopf heißt „Jetzt sehen, was du zahlst“ („${text}“)`);
  const alterHinweis = await page.getByText('dann zum Beitragsrechner').filter({ visible: true }).count();
  befund('M2', alterHinweis === 0, `${breite} /zahn: kein sichtbarer Hinweis „dann zum Beitragsrechner“ (${alterHinweis})`);
  await knopf.click();
  let imAntrag = false;
  try { await page.waitForURL(/\/antrag\/zahn/, { timeout: 6000 }); await page.waitForSelector('[data-vorab-frage="V1"]', { timeout: 8000 }); imAntrag = true; } catch { imAntrag = false; }
  befund('M2', imAntrag, `${breite} /zahn: „Jetzt sehen, was du zahlst“ öffnet den Einstieg von /antrag/zahn (${page.url()})`);
  await context.close();
}

// Vorfragen bis zur Weiche.
async function vorfragen(page, { datum = '05.03.1990', antworten = [] } = {}) {
  await page.waitForSelector('[data-vorab-frage="V1"]');
  await page.fill('#vorab-geburtsdatum', datum);
  await page.click('[data-vorab-weiter]');
  for (const [schritt, wert] of antworten) {
    if (schritt === 'einwilligung') {
      await page.waitForSelector('[data-einwilligung]');
      await page.locator('label:has(#feld-weicheEinwilligung)').click();
      await page.click('[data-einwilligung-weiter]');
      continue; // eslint-disable-line no-continue
    }
    await page.waitForSelector(`[data-vorab-frage="${schritt}"]`);
    await page.click(`[data-vorab-frage="${schritt}"] [data-vorab-antwort="${wert}"]`);
  }
}

// ---- M4: Tarifseite mit Zuschlag ---------------------------------------------------------------------------------------------------
async function tarifMitZuschlag(browser) {
  const { context } = await kontext(browser, 390);
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${WEB}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { datum: '14.08.1975', antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '2']] });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"] [data-weiche-stufe="Z100"]');
  const weiche = await weicheBetrag(page, 'Z100');
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  await page.waitForSelector('[data-stufe="Z100"] [data-stufe-beitrag="Z100"]');
  const karte = await page.locator('[data-stufe="Z100"]').innerText();
  befund('M4', weiche && karte.includes(weiche), `Tarifseite nennt den Beitrag der Weiche mit Zuschlag (${weiche}) in der Karte ZahnPRIVAT 100`);
  befund('M4', /fehlende Zähne/.test(karte), 'Tarifseite sagt, wofür der Zuschlag ist');
  await fotoTeil(page.locator('[data-stufe="Z100"]'), '390-tarif-mit-zuschlag');
  await context.close();
}

// ---- M5: Browser-Zurück --------------------------------------------------------------------------------------------------------------
async function browserZurueck(browser) {
  const { context } = await kontext(browser, 390);
  const page = await context.newPage();
  await page.goto(`${WEB}/zahn`, { waitUntil: 'networkidle' });
  await page.goto(`${WEB}/antrag/zahn`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-vorab-frage="V1"]');
  await page.fill('#vorab-geburtsdatum', '05.03.1990');
  await page.click('[data-vorab-weiter]');
  await page.waitForSelector('[data-vorab-frage="V2"]');
  await page.click('[data-vorab-frage="V2"] [data-vorab-antwort="pflicht"]');
  await page.waitForSelector('[data-einwilligung]');
  const nach = async (selektor) => { try { await page.waitForSelector(selektor, { timeout: 4000 }); return new URL(page.url()).pathname === '/antrag/zahn'; } catch { return false; } };
  await page.goBack();
  befund('M5', await nach('[data-vorab-frage="V2"]'), `Zurück auf der Einwilligung führt zu Frage 2 (${page.url()})`);
  if (new URL(page.url()).pathname !== '/antrag/zahn') { await context.close(); return; }
  await page.goBack();
  befund('M5', await nach('[data-vorab-frage="V1"]'), 'Zurück auf Frage 2 führt zu Frage 1');
  befund('M5', (await page.inputValue('#vorab-geburtsdatum').catch(() => '')) === '05.03.1990', 'Frage 1 behält das Geburtsdatum');
  await page.click('[data-vorab-weiter]');
  await page.click('[data-vorab-frage="V2"] [data-vorab-antwort="pflicht"]');
  await page.waitForSelector('[data-einwilligung]');
  await page.locator('label:has(#feld-weicheEinwilligung)').click();
  await page.click('[data-einwilligung-weiter]');
  for (const [schritt, wert] of [['V3', 'nein'], ['V4', '0']]) {
    await page.waitForSelector(`[data-vorab-frage="${schritt}"]`);
    await page.click(`[data-vorab-frage="${schritt}"] [data-vorab-antwort="${wert}"]`);
  }
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  await page.locator('label:has(input[name="tarif"][value="Z90"])').click();
  await page.goBack();
  befund('M5', await nach('[data-weiche-ergebnis="ukv"]'), 'Zurück auf der Tarifseite führt zur Weiche');
  await page.goBack();
  befund('M5', await nach('[data-vorab-frage="V4"]'), 'Zurück auf der Weiche führt zur letzten Vorfrage');
  await page.click('[data-weiche-zurueck]');
  befund('M5', await nach('[data-vorab-frage="V3"]'), 'Knopf Zurück geht weiter wie bisher (Frage 3)');
  await page.click('[data-vorab-frage="V3"] [data-vorab-antwort="nein"]');
  await page.click('[data-vorab-frage="V4"] [data-vorab-antwort="0"]');
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  befund('M5', await page.locator('input[name="tarif"][value="Z90"]').isChecked(), 'Maske behält die Stufe nach Zurück und Weiter');
  await context.close();
}

// ---- UKV ab der Tarifseite bis zu den Zahnfragen (wie check-zahn-weiche-rendered) ---------------------------------------------------
async function ukvBisFragen(page) {
  await bildschirm(page, 'tarif');
  await page.locator('label:has(input[name="tarif"][value="Z100"])').click();
  await weiter(page);
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="frau"])').click();
  await page.fill('#feld-vorname', 'Lena');
  await page.fill('#feld-nachname', 'Muster');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:policyHolderIsEqualInsuredPerson');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await bildschirm(page, 'frage:TF0021');
}

// ---- M6: „Lieber am Telefon“ -------------------------------------------------------------------------------------------------------
async function lieberAmTelefon(browser) {
  const { context } = await kontext(browser, 390);
  const page = await context.newPage();
  await page.goto(`${WEB}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { antworten: [['V2', 'pflicht']] });
  await page.waitForSelector('[data-einwilligung] [data-weiche-telefon]');
  const ziel = await page.locator('[data-einwilligung] [data-weiche-telefon]').evaluate((a) => ({ target: a.getAttribute('target'), href: a.getAttribute('href') }));
  befund('M6', ziel.target === '_blank' && ziel.href === '/terminvereinbarung', `Einwilligung: „Lieber am Telefon“ öffnet die Terminbuchung im neuen Tab (${JSON.stringify(ziel)})`);
  await foto(page, '390-einwilligung');
  await page.locator('label:has(#feld-weicheEinwilligung)').click();
  await page.click('[data-einwilligung-weiter]');
  for (const [schritt, wert] of [['V3', 'nein'], ['V4', '0']]) {
    await page.waitForSelector(`[data-vorab-frage="${schritt}"]`);
    await page.click(`[data-vorab-frage="${schritt}"] [data-vorab-antwort="${wert}"]`);
  }
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  await page.click('[data-weiche-weiter]');
  await ukvBisFragen(page);
  await page.locator('label:has(input[name="frage-TF0021"][value="0"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:GF0073');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await page.waitForSelector('[data-rueckweiche] [data-ausweg]');
  const kasten = await page.locator('[data-rueckweiche] [data-ausweg]').evaluate((a) => ({ target: a.getAttribute('target'), href: a.getAttribute('href') }));
  befund('M6', kasten.target === '_blank' && kasten.href === '/terminvereinbarung', `Rückweiche: „Lieber am Telefon“ öffnet die Terminbuchung im neuen Tab (${JSON.stringify(kasten)})`);
  await page.click('[data-rueckweiche-knopf]');
  await bildschirm(page, 'wechsel:W1');
  await page.click('[data-vorab-antwort="steht_an"]');
  await bildschirm(page, 'wechsel:V3a');
  await page.click('[data-vorab-antwort="nein"]');
  await bildschirm(page, 'wechsel:V5');
  await page.click('[data-vorab-antwort="nein"]');
  await page.waitForSelector('#wechsel-plz');
  await page.fill('#wechsel-plz', '20095');
  await page.click('[data-wechsel-plz-weiter]');
  await page.waitForSelector('[data-wechsel-ergebnis="bayerische"] [data-weiche-telefon]');
  const wechsel = await page.locator('[data-wechsel-ergebnis="bayerische"] [data-weiche-telefon]').evaluate((a) => ({ target: a.getAttribute('target'), href: a.getAttribute('href') }));
  befund('M6', wechsel.target === '_blank' && wechsel.href === '/terminvereinbarung', `Ergebnis der Rückweiche: „Lieber am Telefon“ im neuen Tab (${JSON.stringify(wechsel)})`);
  await context.close();
}

// Überlauf in den Karten der Danke-Seite.
async function dankeOhneUeberlauf(page, wo) {
  const ueber = await page.evaluate(() => [...document.querySelectorAll('[data-danke-punkte] li, [data-danke-punkte] li *')]
    .filter((el) => !el.closest('.sr-only') && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).display !== 'inline')
    .map((el) => (el.textContent || '').trim().slice(0, 40)));
  const rand = await page.evaluate(() => [...document.querySelectorAll('[data-danke-punkte] li')].some((li) => {
    const kasten = li.getBoundingClientRect();
    return [...li.querySelectorAll('p')].filter((p) => !p.closest('.sr-only')).some((p) => {
      const bereich = document.createRange(); bereich.selectNodeContents(p);
      return [...bereich.getClientRects()].some((r) => r.right > kasten.right + 1);
    });
  }));
  befund('M7', ueber.length === 0 && !rand, `${wo}: kein Text ragt über die Karten der Danke-Seite (${JSON.stringify(ueber)})`);
}

// ---- WEG + M7: UKV ganz bis zur Danke-Seite ------------------------------------------------------------------------------------------
async function ukvGanz(browser, breite) {
  const { context, protokoll } = await kontext(browser, breite);
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${WEB}/zahn`, { waitUntil: 'networkidle' });
  const kopf = page.locator('[data-self-service-header]').filter({ visible: true }).first();
  if (await kopf.count()) {
    await kopf.click();
  } else {
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(800);
    await page.locator('[data-self-service-header]').filter({ visible: true }).first().click();
  }
  await page.waitForURL(/\/antrag\/zahn/, { timeout: 10000 });
  await vorfragen(page, { datum: '14.08.1982', antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '0']] });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"] [data-weiche-stufe="Z100"]');
  const weiche = await weicheBetrag(page, 'Z100');
  await ohneQuerScrollen(page, `${breite} UKV Weiche`);
  await page.click('[data-weiche-weiter]');
  await ukvBisFragen(page);
  await ohneQuerScrollen(page, `${breite} UKV Frage TF0021`);
  await page.locator('label:has(input[name="frage-TF0021"][value="0"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:GF0073');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="nein"]');
  await bildschirm(page, 'frage:GF0074');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await page.waitForSelector('[data-hinweis-ja]');
  await bildschirm(page, 'frage:VP0004');
  await page.locator('label:has(input[name="frage-VP0004"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:AF0010');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="nein"]');
  await bildschirm(page, 'frage:AF_AD_0001');
  await page.locator('label:has(input[name="frage-AF_AD_0001"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:AF_AD_0005');
  await page.locator('label:has(input[name="frage-AF_AD_0005"][value="pflichtversichert in deutscher GKV"])').click();
  await weiter(page);
  await bildschirm(page, 'beitrag');
  const beitrag = euroAus(await page.locator('[data-beitrag-wert]').innerText());
  befund('WEG', weiche && beitrag === weiche, `${breite} UKV: Beitragsseite gleich der Weiche (${beitrag} zu ${weiche})`);
  await ohneQuerScrollen(page, `${breite} UKV Beitrag`);
  await weiter(page);
  await bildschirm(page, 'erkl:auftrag');
  for (const key of ['verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
  await bildschirm(page, 'anschrift');
  await page.fill('#feld-strasse', 'Musterweg 12');
  await page.fill('#feld-plz', '20095');
  await page.fill('#feld-ort', 'Hamburg');
  await page.fill('#feld-email', 'lena@beispiel.de');
  await weiter(page);
  await bildschirm(page, 'zahlung');
  await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 00');
  await page.locator('#feld-iban').blur();
  await page.locator('label:has(#feld-sepaMandatConfirmation)').click();
  await weiter(page);
  await bildschirm(page, 'erkl:unterlagen');
  await weiter(page);
  await bildschirm(page, 'zusammenfassung');
  await ohneQuerScrollen(page, `${breite} UKV Zusammenfassung`);
  const letzterKnopf = (await page.textContent('#knopf-absenden')).trim();
  befund('WEG', /kostenpflichtig/i.test(letzterKnopf), `${breite} UKV: letzter Knopf „${letzterKnopf}“`);
  await page.locator('label:has(#feld-angabenBestaetigt)').click();
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  const danke = await page.textContent('[data-danke-punkte]');
  befund('WEG', danke.includes('Nimmt die UKV deinen Antrag an, schickt sie dir die Police direkt.') && !/Antragsbestätigung der UKV/.test(danke), `${breite} UKV: Danke-Seite ohne Antragsbestätigung der UKV`);
  const { letzter } = await mock('/__test/letzter');
  befund('WEG', letzter?.textfassung === '2026-11-20f-ukv-zahn-online' && letzter?.weiche === true && euroAus(`${String(letzter?.beitragAngezeigt?.toFixed(2)).replace('.', ',')} EUR`) === weiche, `${breite} UKV: Antrag kommt mit Fassung, Weiche und Beitrag an`);
  await ohneQuerScrollen(page, `${breite} UKV Danke`);
  await dankeOhneUeberlauf(page, `${breite} UKV`);
  await fotoTeil(page.locator('[data-danke-punkte]'), `${breite}-ukv-danke`);
  befund('WEG', protokoll.extern.every((u) => !/levelnine|diebayerische|uniondt/i.test(u)), `${breite} UKV: keine Anfrage an eine Gesellschaft (${JSON.stringify(protokoll.extern.slice(0, 5))})`);
  await context.close();
}

// ---- WEG + M7: Bayerische mit ZAHN Sofort ganz bis zur Danke-Seite -------------------------------------------------------------------
async function bayerischeGanz(browser, breite) {
  const { context, protokoll } = await kontext(browser, breite);
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${WEB}/zahn/behandlung-steht-an`, { waitUntil: 'networkidle' });
  await page.locator('main a[href*="online-berechnen/zahn"]').first().click();
  await page.waitForURL(/\/antrag\/zahn/, { timeout: 10000 });
  await vorfragen(page, { datum: '05.03.1990', antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'steht_an'], ['V3a', 'nein'], ['V4', '0'], ['V5', 'nein']] });
  await page.waitForSelector('[data-weiche-ergebnis="bayerische-sofort"]');
  await page.fill('#weiche-plz', '20095');
  await page.waitForFunction(() => document.querySelectorAll('[data-weiche-stufe]').length === 3);
  const weiche = await weicheBetrag(page, 'PRESTIGE');
  await ohneQuerScrollen(page, `${breite} Bayerische Weiche`);
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  await page.waitForSelector('[data-gesamtbeitrag]');
  befund('WEG', await page.locator('#feld-baustein-ZAHN_SOFORT').isChecked() && await page.locator('input[name="tarif"][value="PRESTIGE"]').isChecked(), `${breite} Bayerische: Prestige und ZAHN Sofort vorgewählt`);
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  for (let runde = 0; runde < 12; runde += 1) {
    const jetzt = await page.waitForSelector('[data-bildschirm^="frage:"], [data-bildschirm="beitrag"]', { timeout: 15000 });
    const id = await jetzt.getAttribute('data-bildschirm');
    if (id === 'beitrag') break;
    await page.waitForTimeout(650);
    await page.click(`[data-bildschirm="${id}"] [data-antwort="nein"]`);
    await page.waitForFunction((alt) => document.querySelector('[data-bildschirm]')?.getAttribute('data-bildschirm') !== alt, id, { timeout: 15000 });
  }
  await bildschirm(page, 'beitrag');
  const beitrag = euroAus(await page.locator('[data-beitrag-wert]').innerText());
  befund('WEG', weiche && beitrag === weiche, `${breite} Bayerische: Beitragsseite gleich der Weiche (${beitrag} zu ${weiche})`);
  await weiter(page);
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="frau"])').click();
  await page.fill('#feld-vorname', 'Lena');
  await page.fill('#feld-nachname', 'Muster');
  await weiter(page);
  await bildschirm(page, 'anschrift');
  await page.fill('#feld-ort', 'Hamburg');
  await page.fill('#feld-strasse', 'Musterweg');
  await page.fill('#feld-hausnummer', '12');
  await page.fill('#feld-email', 'lena@beispiel.de');
  await weiter(page);
  await bildschirm(page, 'anschrift');
  await page.locator('label:has(#feld-adresseBestaetigt)').click();
  await weiter(page);
  await bildschirm(page, 'zahlung');
  await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 00');
  await page.locator('#feld-iban').blur();
  await page.locator('label:has(#feld-sepa)').click();
  await weiter(page);
  await bildschirm(page, 'erkl:0');
  for (const key of ['verzicht', 'beratungsverzichtVersicherer', 'vollmacht']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
  await bildschirm(page, 'erkl:1');
  for (const key of ['gesundheitsdaten', 'schweigepflicht', 'vvg']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
  await bildschirm(page, 'erkl:2');
  const [neu] = await Promise.all([context.waitForEvent('page'), page.locator('[data-bildschirm="erkl:2"] [data-unterlage]').first().click()]);
  await neu.close();
  await page.locator('label:has(#feld-unterlagen)').click();
  await weiter(page);
  await bildschirm(page, 'zusammenfassung');
  await ohneQuerScrollen(page, `${breite} Bayerische Zusammenfassung`);
  const letzterKnopf = (await page.textContent('#knopf-absenden')).trim();
  befund('WEG', letzterKnopf.length > 0, `${breite} Bayerische: letzter Knopf „${letzterKnopf}“`);
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  const { letzter } = await mock('/__test/letzter');
  befund('WEG', letzter?.textfassung === '2026-11-20d-bayerische-zahn' && letzter?.weiche === true && letzter?.bausteine?.[0] === 'ZAHN_SOFORT', `${breite} Bayerische: Antrag mit Fassung, Weiche und ZAHN Sofort`);
  await ohneQuerScrollen(page, `${breite} Bayerische Danke`);
  await dankeOhneUeberlauf(page, `${breite} Bayerische`);
  await fotoTeil(page.locator('[data-danke-punkte]'), `${breite}-bayerische-danke`);
  befund('WEG', protokoll.extern.every((u) => !/levelnine|uniondt/i.test(u)) && protokoll.extern.filter((u) => /diebayerische/.test(u)).every((u) => /cms\/assets/.test(u)), `${breite} Bayerische: nur das Öffnen einer Unterlage ging (abgefangen) zur Bayerischen (${JSON.stringify(protokoll.extern.slice(0, 5))})`);
  await context.close();
}

// ---- M10: Datenschutz -------------------------------------------------------------------------------------------------------------
async function datenschutz(browser) {
  const { context } = await kontext(browser, 1280);
  const page = await context.newPage();
  await page.goto(`${WEB}/datenschutz`, { waitUntil: 'networkidle' });
  const text = await page.textContent('main');
  befund('M10', /Vertragsunterlagen der Bayerischen[^.]*bayculator\.diebayerische\.de/.test(text), 'Datenschutz nennt den direkten Abruf der Unterlagen der Bayerischen');
  await context.close();
}

async function main() {
  await starteServer();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const schritte = [
    ['Zahn-Check 390', () => zahnCheck(browser, 390)], ['Zahn-Check 1280', () => zahnCheck(browser, 1280)],
    ['Anlassseite 390', () => anlassseite(browser, 390)], ['Anlassseite 1280', () => anlassseite(browser, 1280)],
    ['Jetzt sehen 390', () => jetztSehen(browser, 390)], ['Jetzt sehen 1280', () => jetztSehen(browser, 1280)],
    ['Tarif mit Zuschlag', () => tarifMitZuschlag(browser)], ['Browser-Zurück', () => browserZurueck(browser)],
    ['Lieber am Telefon', () => lieberAmTelefon(browser)], ['UKV 390', () => ukvGanz(browser, 390)], ['UKV 1280', () => ukvGanz(browser, 1280)],
    ['Bayerische 390', () => bayerischeGanz(browser, 390)], ['Datenschutz', () => datenschutz(browser)],
  ];
  try {
    for (const [name, schritt] of schritte) {
      try { await schritt(); } catch (fehler) { befund(name, false, `${name} abgebrochen: ${String(fehler?.message || fehler).split('\n')[0]}`); }
    }
  } finally {
    await browser.close();
    stoppe();
  }
  const je = {};
  for (const e of ergebnisse) { je[e.mangel] = je[e.mangel] || { ok: 0, fehlt: 0 }; je[e.mangel][e.ok ? 'ok' : 'fehlt'] += 1; }
  console.log(JSON.stringify({ lauf: LAUF, gesamt: ergebnisse.length, fehlt: ergebnisse.filter((e) => !e.ok).length, je }, null, 2));
  if (ergebnisse.some((e) => !e.ok)) process.exitCode = 1;
}

main().catch((fehler) => { console.error(fehler); stoppe(); process.exitCode = 1; });
