// Handy-Durchlauf der drei Antragsmasken (ambulant, Zahn, stationär) bei 390 px,
// unsichtbar im Headless-Chrome gegen die Attrappe. Testperson „Test Healio-Prüfung“,
// jede Strecke endet unmittelbar vor dem Abschicken (#knopf-absenden wird nie geklickt).
//
// Prüft je Schritt: Foto, kein waagerechtes Scrollen, kein abgeschnittener Text,
// Weiter-Knopf sichtbar, auch mit simulierter Bildschirmtastatur (Höhe 844 auf 508 px),
// Fehlermeldungen bei leeren und falschen Eingaben am Feld, Zurück ohne Verlust.
//
// Aufruf: node scripts/check-antragsmaske-mobil.mjs --fotos <ordner> [--api-port 8812] [--port 3048]
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const arg = (name, standard) => { const stelle = args.indexOf(name); return stelle >= 0 ? args[stelle + 1] : standard; };
const FOTOS = arg('--fotos', path.join(ROOT, 'tmp-maske-mobil'));
// --nachsatz nachher: Fotos der Zusammenfassung zusätzlich als <name>-nachher.png (Vorher-Nachher-Vergleich).
const NACHSATZ = arg('--nachsatz', '');
const API_PORT = Number(arg('--api-port', 8812));
const PORT = Number(arg('--port', 3048));
const API = `http://127.0.0.1:${API_PORT}`;
const AN = `http://127.0.0.1:${PORT}`;
const require = createRequire(import.meta.url);
const { chromium } = (() => {
  try { return require('playwright'); } catch { /* nicht im Repo */ }
  return require(process.env.PLAYWRIGHT_PFAD || '/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/node_modules/playwright');
})();

const PERSON = { vorname: 'Test', nachname: 'Healio-Prüfung', geburt: '15.05.1990', strasse: 'Musterstraße', nr: '1', plz: '20095', ort: 'Hamburg', mail: 'test@example.com', tel: '0151 1234567' };
// Öffentliche Beispiel-IBAN; wird nirgends protokolliert.
const TEST_IBAN = ['DE89', '3704', '0044', '0532', '0130', '00'].join(' ');

const bericht = { strecken: {}, werte: {}, mängel: [], knöpfe: new Set(), fehlertexte: [] };
let punkte = 0;
const pruefe = (bedingung, text) => { assert.ok(bedingung, text); punkte += 1; };
const mangel = (strecke, text) => { bericht.mängel.push(`${strecke}: ${text}`); };

const prozesse = [];
async function warteAuf(url, ms = 90000) {
  const ende = Date.now() + ms;
  while (Date.now() < ende) {
    try { const antwort = await fetch(url); if (antwort.status < 500) return; } catch { /* noch nicht da */ }
    await new Promise((fertig) => { setTimeout(fertig, 300); });
  }
  throw new Error(`Server antwortet nicht: ${url}`);
}
async function starteServer() {
  prozesse.push(spawn(process.execPath, ['scripts/antrag-selbst-mock.mjs'], {
    cwd: ROOT, env: { ...process.env, ANTRAG_SELBST_MOCK_PORT: String(API_PORT), ANTRAG_ERLAUBTE_HERKUNFT: AN }, stdio: 'ignore',
  }));
  prozesse.push(spawn(path.join(ROOT, 'node_modules/.bin/vite'), ['--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT, env: { ...process.env, VITE_ANTRAG_API: `${API}/antrag/api`, VITE_ANTRAGSMASKE: '1', VITE_ANTRAGSWAHL: '1', VITE_ANTRAGSMASKE_UKV_ZAHN: '1', VITE_ANTRAG_TELEFON: 'ambulant' }, stdio: 'ignore',
  }));
  await warteAuf(`${API}/antrag/gesund`);
  await warteAuf(`${AN}/antrag/ambulant`);
}
const stoppe = () => prozesse.forEach((kind) => { try { kind.kill('SIGTERM'); } catch { /* weg */ } });

// Ein Schritt: Foto, Layout, Knopfnamen, Tastatur-Simulation.
async function schritt(page, strecke, nr, name) {
  await page.waitForTimeout(350);
  fs.mkdirSync(FOTOS, { recursive: true });
  const endung = NACHSATZ && name === 'zusammenfassung' ? `-${NACHSATZ}` : '';
  await page.screenshot({ path: path.join(FOTOS, `${strecke}-${String(nr).padStart(2, '0')}-${name}${endung}.png`), fullPage: true });
  const lage = await page.evaluate(() => {
    const breit = document.documentElement.scrollWidth > window.innerWidth;
    // Nur für Sehende sichtbare Elemente; Screenreader-Texte und Wischkarten-Leisten zählen nicht.
    const sichtbar = (el) => el.offsetParent !== null && !el.closest('.sr-only') && el.getBoundingClientRect().width > 2;
    const imWischbereich = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll') return true; } return false; };
    // Abgeschnitten: Element mit Text, dessen Inhalt breiter ist als die Box und das Überlauf versteckt.
    const geschnitten = [...document.querySelectorAll('[data-antragsmaske] *, main *')]
      .filter((el) => sichtbar(el) && el.textContent.trim() && el.children.length === 0)
      .filter((el) => { const s = getComputedStyle(el); return (s.overflow === 'hidden' || s.textOverflow === 'ellipsis' || s.overflowX === 'hidden') && el.scrollWidth > el.clientWidth + 1; })
      .map((el) => el.textContent.trim().slice(0, 50));
    const rechts = [...document.querySelectorAll('[data-antragsmaske] *, main *')]
      .filter((el) => sichtbar(el) && el.children.length === 0 && el.textContent.trim() && !imWischbereich(el) && el.getAttribute("for") !== "feld-firmenseite")
      .filter((el) => { const r = el.getBoundingClientRect(); return r.right > window.innerWidth + 1 || r.left < -1; })
      .map((el) => `${el.textContent.trim().slice(0, 50)} <${el.tagName.toLowerCase()} ${el.className.toString().slice(0, 60)}>`);
    const knoepfe = [...document.querySelectorAll('button, a[role="button"], [data-weiter]')]
      .filter((el) => el.offsetParent !== null)
      .map((el) => (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60))
      .filter(Boolean);
    const leer = [...document.querySelectorAll('button')].filter((el) => el.offsetParent !== null && !(el.getAttribute('aria-label') || el.textContent.trim() || el.getAttribute('title'))).length;
    return { breit, geschnitten, rechts, knoepfe, leer };
  });
  if (lage.breit) mangel(strecke, `${name}: waagerechtes Scrollen`);
  if (lage.geschnitten.length) mangel(strecke, `${name}: abgeschnitten: ${lage.geschnitten.join(' | ')}`);
  if (lage.rechts.length) mangel(strecke, `${name}: ragt aus dem Bild: ${lage.rechts.join(' | ')}`);
  if (lage.leer) mangel(strecke, `${name}: ${lage.leer} Knopf ohne Namen`);
  lage.knoepfe.forEach((k) => bericht.knöpfe.add(k));
  bericht.strecken[strecke].push(name);
  return lage;
}

// Simulierte Bildschirmtastatur: erstes Eingabefeld fokussieren, Höhe 508 px, Weiter muss sichtbar bleiben.
async function tastatur(page, strecke, name) {
  const feld = page.locator('[data-antragsmaske] input[type="text"], [data-antragsmaske] input[inputmode], [data-antragsmaske] input[type="email"], [data-antragsmaske] input[type="tel"], [data-antragsmaske] textarea, main input[type="text"]').filter({ visible: true }).first();
  if (!(await feld.count())) return;
  await page.setViewportSize({ width: 390, height: 508 });
  await feld.focus();
  await page.waitForTimeout(300);
  const sichtbar = await page.evaluate(() => {
    const knopf = document.querySelector('[data-weiter]');
    if (!knopf) return { gibt: false };
    const r = knopf.getBoundingClientRect();
    const fokus = document.activeElement?.getBoundingClientRect();
    return { gibt: true, imBild: r.top >= 0 && r.bottom <= window.innerHeight, verdecktFeld: fokus ? fokus.bottom > r.top && fokus.top < r.bottom : false };
  });
  if (sichtbar.gibt && !sichtbar.imBild) mangel(strecke, `${name}: Weiter mit Tastatur nicht im Bild`);
  if (sichtbar.gibt && sichtbar.verdecktFeld) mangel(strecke, `${name}: Leiste verdeckt das Eingabefeld mit Tastatur`);
  await page.screenshot({ path: path.join(FOTOS, `${strecke}-tastatur-${name}.png`) });
  await feld.blur();
  await page.setViewportSize({ width: 390, height: 844 });
}

async function bildschirm(page, id) { await page.waitForSelector(`[data-bildschirm="${id}"]`, { timeout: 10000 }); }
async function weiter(page) { await page.waitForTimeout(500); await page.locator('[data-weiter]').click(); }
async function zurueck(page) { await page.waitForTimeout(500); await page.locator('button[aria-label="Zurück"]').click(); }

// Leer weiter: Fehler müssen sichtbar sein, jeweils am Feld (aria-describedby), und der erste im Bild.
async function fehlerPruefen(page, strecke, name, { erwartet = true } = {}) {
  await weiter(page);
  await page.waitForTimeout(400);
  const fehler = await page.evaluate(() => [...document.querySelectorAll('[id^="fehler-"], [id$="-fehler"]')]
    .filter((el) => el.offsetParent !== null && el.textContent.trim())
    .map((el) => {
      const feld = document.querySelector(`[aria-describedby~="${el.id}"]`);
      const r = el.getBoundingClientRect();
      const fr = feld?.getBoundingClientRect();
      return { id: el.id, text: el.textContent.trim(), amFeld: Boolean(feld) && Boolean(fr), imBild: r.top >= 0 && r.bottom <= window.innerHeight };
    }));
  if (erwartet && !fehler.length) mangel(strecke, `${name}: leeres Weiter ohne Fehlermeldung`);
  for (const f of fehler) {
    bericht.fehlertexte.push(`${strecke}/${name}: ${f.text}`);
    if (!f.amFeld) mangel(strecke, `${name}: Fehler „${f.text}“ nicht am Feld verknüpft`);
  }
  if (fehler.length && !fehler.some((f) => f.imBild)) mangel(strecke, `${name}: keine Fehlermeldung im sichtbaren Bereich`);
  return fehler;
}
async function falsch(page, strecke, name, selektor, wert, richtig) {
  await page.fill(selektor, wert);
  await page.locator(selektor).blur();
  const fehler = await fehlerPruefen(page, strecke, `${name}-falsch`, { erwartet: false });
  const id = selektor.replace('#', '');
  if (!fehler.some((f) => f.id.includes(id.replace('feld-', '')))) mangel(strecke, `${name}: „${wert}“ wird nicht abgewiesen`);
  await page.fill(selektor, richtig);
  await page.locator(selektor).blur();
}

async function anschriftFuellen(page, strecke) {
  await fehlerPruefen(page, strecke, 'anschrift-leer');
  if (await page.locator('input#feld-plz').count()) {
    await page.fill('#feld-plz', PERSON.plz);
  }
  await page.fill('#feld-strasse', PERSON.strasse);
  if (await page.locator('#feld-hausnummer').count()) await page.fill('#feld-hausnummer', PERSON.nr);
  await page.fill('#feld-ort', PERSON.ort);
  await falsch(page, strecke, 'email', '#feld-email', 'test@', PERSON.mail);
  if (await page.locator('#feld-telefon').count()) await falsch(page, strecke, 'telefon', '#feld-telefon', 'abc', PERSON.tel);
  if (await page.locator('input#feld-plz').count()) await falsch(page, strecke, 'plz', '#feld-plz', '2009', PERSON.plz);
  if (await page.locator('#feld-adresseBestaetigt').count()) await page.locator('label:has(#feld-adresseBestaetigt)').click();
}
async function zahlungFuellen(page, strecke) {
  await fehlerPruefen(page, strecke, 'zahlung-leer');
  await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 01');
  await page.locator('#feld-iban').blur();
  const f = await fehlerPruefen(page, strecke, 'iban-falsch', { erwartet: false });
  if (!f.some((x) => x.id.includes('iban'))) mangel(strecke, 'IBAN mit falscher Prüfziffer nicht abgewiesen');
  await page.fill('#feld-iban', TEST_IBAN);
  await page.locator('#feld-iban').blur();
  if (await page.locator('#feld-bankname').count()) await page.fill('#feld-bankname', 'Testbank');
  const sepa = (await page.locator('#feld-sepaMandatConfirmation').count()) ? '#feld-sepaMandatConfirmation' : '#feld-sepa';
  await page.locator(`label:has(${sepa})`).click();
}
// Zurück aus der Zahlung zur Anschrift und wieder vor: nichts darf verloren gehen.
async function zurueckPruefen(page, strecke) {
  await zurueck(page);
  await bildschirm(page, 'anschrift');
  const werte = { strasse: await page.inputValue('#feld-strasse'), email: await page.inputValue('#feld-email') };
  if (werte.strasse !== PERSON.strasse || werte.email !== PERSON.mail) mangel(strecke, `Zurück verliert Anschrift (${JSON.stringify(werte)})`);
  await weiter(page);
  await bildschirm(page, 'zahlung');
  const iban = (await page.inputValue('#feld-iban')).replace(/\s/g, '');
  if (iban !== TEST_IBAN.replace(/\s/g, '')) mangel(strecke, 'Zurück verliert die IBAN');
  pruefe(true, `${strecke}: Zurück geprüft`);
}
async function personFuellen(page, strecke) {
  await fehlerPruefen(page, strecke, 'person-leer');
  await page.locator('label:has(input[name="anrede"][value="herr"])').click();
  await page.fill('#feld-vorname', PERSON.vorname);
  await page.fill('#feld-nachname', PERSON.nachname);
  if (await page.locator('#feld-acknowledge').count()) await page.locator('label:has(#feld-acknowledge)').click();
}
async function beitragLesen(page) { return (await page.textContent('[data-beitrag-wert]')).replace(/\s+/g, ' ').trim(); }
async function vorAbsenden(page, strecke) {
  await bildschirm(page, 'zusammenfassung');
  const knopf = page.locator('#knopf-absenden');
  pruefe(await knopf.count() === 1, `${strecke}: Absenden-Knopf vorhanden`);
  await knopf.scrollIntoViewIfNeeded();
  bericht.werte[`${strecke}.absendenText`] = (await knopf.textContent()).trim();
  bericht.werte[`${strecke}.absendenAktiv`] = await knopf.isEnabled();
  const text = await page.textContent('[data-bildschirm="zusammenfassung"]');
  if (/ohne Gesundheitsfragen/i.test(text)) mangel(strecke, 'Zusammenfassung enthält „ohne Gesundheitsfragen“');
  if (/[–—]/.test(text)) mangel(strecke, 'Gedankenstrich in der Zusammenfassung');
  if (/DE89370400440532013000|0532 0130/.test(text)) mangel(strecke, 'IBAN ungekürzt in der Zusammenfassung');
}

async function ambulant(browser) {
  const s = 'ambulant'; bericht.strecken[s] = [];
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(`${AN}/antrag/ambulant`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  await fehlerPruefen(page, s, 'tarif-leer');
  await falsch(page, s, 'geburtsdatum', '#feld-geburtsdatum', '31.02.1990', PERSON.geburt);
  await page.locator('label:has(input[name="tarif"][value="AP1"])').click();
  await page.waitForFunction(() => /EUR/.test(document.querySelector('[data-stufe-beitrag="AP1"]')?.textContent || ''));
  bericht.werte[`${s}.tarifPreis`] = (await page.textContent('[data-stufe-beitrag="AP1"]')).trim();
  await tastatur(page, s, 'tarif');
  let n = 1; await schritt(page, s, n++, 'tarif'); await weiter(page);
  await bildschirm(page, 'person'); await personFuellen(page, s); await tastatur(page, s, 'person'); await schritt(page, s, n++, 'person'); await weiter(page);
  await bildschirm(page, 'unterlagenDownload'); await page.waitForSelector('[data-download]');
  await fehlerPruefen(page, s, 'unterlagen-leer');
  await page.click('[data-alle-downloads]'); await schritt(page, s, n++, 'unterlagen'); await weiter(page);
  await bildschirm(page, 'erkl:erklaerungen'); await fehlerPruefen(page, s, 'erklaerungen-leer');
  for (const key of ['saveConfirmationtext', 'declarationOfConsentTermsOfContract', 'declarationOfConsentAndReleaseFromConfidentiality']) await page.locator(`label:has(#feld-${key})`).click();
  // Werbeeinwilligung der SDK: Ja oder Nein ist Pflicht (Paket 1, 19.11.2026).
  await page.locator('label:has(input[name="declarationOfConsentAdvertising"][value="nein"])').click();
  await schritt(page, s, n++, 'erklaerungen'); await weiter(page);
  await bildschirm(page, 'frage:1a-aids-hepatitis'); await schritt(page, s, n++, 'frage-1a');
  // Frage 1a als 15 Einzelfragen wie in der SDK-Strecke.
  const punkte1a = ['aids-hepatitis', 'als', 'weichteilrheuma', 'chorea', 'niere', 'colitis', 'diabetes', 'gliedmassen', 'fertilitaet', 'hoerschaedigung', 'krebs', 'lunge', 'lymphoedem', 'ms', 'osteoporose'].map((id) => `1a-${id}`);
  for (const id of [...punkte1a, '1b', '1c', '1d', '1e', '1f', '1g', '1h', '1i', '1j', '1k']) {
    await bildschirm(page, `frage:${id}`); await page.waitForTimeout(700);
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
  }
  await bildschirm(page, 'frage:2'); await fehlerPruefen(page, s, 'frage-2-leer');
  await page.fill('#feld-frage-2-groesse', '178'); await page.fill('#feld-frage-2-gewicht', '75');
  await tastatur(page, s, 'frage-2'); await schritt(page, s, n++, 'frage-2'); await weiter(page);
  await bildschirm(page, 'beitrag'); bericht.werte[`${s}.beitrag`] = await beitragLesen(page); await schritt(page, s, n++, 'beitrag');
  // Zurück von Beitrag zu Frage 2: Werte bleiben.
  await zurueck(page); await bildschirm(page, 'frage:2');
  if (await page.inputValue('#feld-frage-2-groesse') !== '178') mangel(s, 'Zurück verliert die Größe');
  await weiter(page); await bildschirm(page, 'beitrag'); await weiter(page);
  await bildschirm(page, 'erkl:beratung'); await fehlerPruefen(page, s, 'beratung-leer');
  for (const key of ['avoidAdvice', 'verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
  await schritt(page, s, n++, 'beratung'); await weiter(page);
  await bildschirm(page, 'anschrift'); await anschriftFuellen(page, s); await tastatur(page, s, 'anschrift'); await schritt(page, s, n++, 'anschrift'); await weiter(page);
  await bildschirm(page, 'zahlung'); await zahlungFuellen(page, s); await zurueckPruefen(page, s); await tastatur(page, s, 'zahlung'); await schritt(page, s, n++, 'zahlung'); await weiter(page);
  await vorAbsenden(page, s); await schritt(page, s, n++, 'zusammenfassung');
  await context.close();
}

async function zahn(browser) {
  const s = 'zahn'; bericht.strecken[s] = [];
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.route('https://bayculator.diebayerische.de/**', (route) => route.fulfill({ status: 200, body: 'PDF' }));
  const page = await context.newPage();
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  let n = 1;
  // Paket C (20.11.2026): Weiche mit Geburtsdatum, Krankenversicherung, Einwilligung und Vorfragen, PLZ an der Weiche.
  await page.waitForSelector('[data-vorab-frage="V1"]');
  await schritt(page, s, n++, 'vorab-V1');
  // Leeres und falsches Geburtsdatum.
  await page.click('[data-vorab-weiter]'); await page.waitForTimeout(400);
  const vorabFehler = await page.evaluate(() => [...document.querySelectorAll('[data-vorab-frage] [role="alert"], [data-vorab-frage] [id*="fehler"]')].filter((el) => el.offsetParent !== null).map((el) => el.textContent.trim()).filter(Boolean));
  if (!vorabFehler.length) mangel(s, 'Weiche: leeres Weiter beim Geburtsdatum ohne Fehlermeldung');
  vorabFehler.forEach((t) => bericht.fehlertexte.push(`zahn/vorab-leer: ${t}`));
  await page.fill('#vorab-geburtsdatum', PERSON.geburt);
  await tastatur(page, s, 'vorab-V1');
  await page.click('[data-vorab-weiter]');
  await page.waitForSelector('[data-vorab-frage="V2"]');
  await schritt(page, s, n++, 'vorab-V2');
  await page.click('[data-vorab-antwort="pflicht"]');
  await page.waitForSelector('[data-einwilligung]');
  await page.click('[data-einwilligung-weiter]'); await page.waitForTimeout(400);
  const einwFehler = await page.evaluate(() => [...document.querySelectorAll('[data-einwilligung] [role="alert"], [data-einwilligung] [id*="fehler"]')].filter((el) => el.offsetParent !== null).map((el) => el.textContent.trim()).filter(Boolean));
  if (!einwFehler.length) mangel(s, 'Weiche: Einwilligung ohne Haken ohne Fehlermeldung');
  einwFehler.forEach((t) => bericht.fehlertexte.push(`zahn/einwilligung: ${t}`));
  await schritt(page, s, n++, 'vorab-einwilligung');
  await page.locator('label:has(#feld-weicheEinwilligung)').click();
  await page.click('[data-einwilligung-weiter]');
  for (const [frage, wert] of [['V3', 'steht_an'], ['V3a', 'nein'], ['V4', '0'], ['V5', 'nein']]) {
    await page.waitForSelector(`[data-vorab-frage="${frage}"]`);
    await schritt(page, s, n++, `vorab-${frage}`);
    await page.click(`[data-vorab-frage="${frage}"] [data-vorab-antwort="${wert}"]`);
  }
  await page.waitForSelector('[data-weiche-ergebnis]');
  await page.fill('#weiche-plz', '209');
  await page.click('[data-weiche-plz-weiter]'); await page.waitForTimeout(400);
  const plzFehler = await page.evaluate(() => [...document.querySelectorAll('[data-weiche-ergebnis] [role="alert"], [data-weiche-ergebnis] [id*="fehler"]')].filter((el) => el.offsetParent !== null).map((el) => el.textContent.trim()).filter(Boolean));
  if (!plzFehler.length) mangel(s, 'Weiche: PLZ mit drei Ziffern nicht abgewiesen');
  plzFehler.forEach((t) => bericht.fehlertexte.push(`zahn/vorab-plz: ${t}`));
  await page.fill('#weiche-plz', PERSON.plz);
  await tastatur(page, s, 'weiche-plz');
  await page.waitForFunction(() => document.querySelectorAll('[data-weiche-stufe]').length === 3, null, { timeout: 15000 }).catch(() => {});
  bericht.werte[`${s}.vorabErgebnis`] = (await page.getAttribute('[data-weiche-ergebnis]', 'data-weiche-ergebnis'));
  bericht.werte[`${s}.vorabPreis`] = ((await page.textContent('[data-weiche-preis]').catch(() => '')) || '').replace(/\s+/g, ' ').trim();
  await schritt(page, s, n++, 'vorab-ergebnis');
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  await page.waitForSelector('[data-gesamtbeitrag]');
  bericht.werte[`${s}.tarifGesamt`] = (await page.textContent('[data-gesamtbeitrag]')).replace(/\s+/g, ' ').trim();
  await schritt(page, s, n++, 'tarif'); await weiter(page);
  await bildschirm(page, 'hinweis'); await schritt(page, s, n++, 'hinweis'); await weiter(page);
  for (const id of ['z1', 'z2', 'z3', 'z4', 'z5']) {
    await bildschirm(page, `frage:${id}`); await page.waitForTimeout(700);
    if (id === 'z1' || id === 'z5') await schritt(page, s, n++, `frage-${id}`);
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
  }
  await bildschirm(page, 'beitrag'); bericht.werte[`${s}.beitrag`] = await beitragLesen(page); await schritt(page, s, n++, 'beitrag'); await weiter(page);
  await bildschirm(page, 'person'); await personFuellen(page, s); await tastatur(page, s, 'person'); await schritt(page, s, n++, 'person'); await weiter(page);
  await bildschirm(page, 'anschrift'); await anschriftFuellen(page, s); await tastatur(page, s, 'anschrift'); await schritt(page, s, n++, 'anschrift'); await weiter(page);
  await bildschirm(page, 'zahlung'); await zahlungFuellen(page, s); await zurueckPruefen(page, s); await schritt(page, s, n++, 'zahlung'); await weiter(page);
  await bildschirm(page, 'erkl:0'); await fehlerPruefen(page, s, 'erkl0-leer');
  for (const key of ['verzicht', 'beratungsverzichtVersicherer', 'vollmacht']) await page.locator(`label:has(#feld-${key})`).click();
  await schritt(page, s, n++, 'erklaerungen-1'); await weiter(page);
  await bildschirm(page, 'erkl:1'); await fehlerPruefen(page, s, 'erkl1-leer');
  for (const key of ['gesundheitsdaten', 'schweigepflicht', 'vvg']) await page.locator(`label:has(#feld-${key})`).click();
  await schritt(page, s, n++, 'einwilligungen'); await weiter(page);
  await bildschirm(page, 'erkl:2'); await fehlerPruefen(page, s, 'unterlagen-leer');
  const [neu] = await Promise.all([context.waitForEvent('page'), page.locator('[data-bildschirm="erkl:2"] [data-unterlage]').first().click()]);
  await neu.close();
  await page.locator('label:has(#feld-unterlagen)').click();
  await schritt(page, s, n++, 'unterlagen'); await weiter(page);
  await vorAbsenden(page, s); await schritt(page, s, n++, 'zusammenfassung');
  await context.close();
}

async function stationaer(browser) {
  const s = 'stationaer'; bericht.strecken[s] = [];
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(`${AN}/antrag/stationaer`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  await fehlerPruefen(page, s, 'tarif-leer');
  await falsch(page, s, 'geburtsdatum', '#feld-geburtsdatum', '15.13.1990', PERSON.geburt);
  await page.locator('label:has(input[name="tarif"][value="SP2"])').click();
  await page.waitForFunction(() => /EUR/.test(document.querySelector('[data-stufe-beitrag="SP2"]')?.textContent || ''));
  bericht.werte[`${s}.tarifPreis`] = (await page.textContent('[data-stufe-beitrag="SP2"]')).trim();
  let n = 1; await schritt(page, s, n++, 'tarif'); await weiter(page);
  await bildschirm(page, 'person'); await personFuellen(page, s); await schritt(page, s, n++, 'person'); await weiter(page);
  await bildschirm(page, 'unterlagenDownload'); await page.waitForSelector('[data-alle-downloads]');
  await page.click('[data-alle-downloads]'); await schritt(page, s, n++, 'unterlagen'); await weiter(page);
  await bildschirm(page, 'erkl:erklaerungen');
  for (const key of ['saveConfirmationtext', 'declarationOfConsentTermsOfContract', 'declarationOfConsentAndReleaseFromConfidentiality']) await page.locator(`label:has(#feld-${key})`).click();
  // Werbeeinwilligung der SDK: Ja oder Nein ist Pflicht (Paket 1, 19.11.2026).
  await page.locator('label:has(input[name="declarationOfConsentAdvertising"][value="nein"])').click();
  await schritt(page, s, n++, 'erklaerungen'); await weiter(page);
  await bildschirm(page, 'frage:G0'); await fehlerPruefen(page, s, 'frage-G0-leer');
  await page.fill('#feld-frage-G0-groesse', '180'); await page.fill('#feld-frage-G0-gewicht', '80');
  await tastatur(page, s, 'frage-G0'); await schritt(page, s, n++, 'frage-G0'); await weiter(page);
  for (const id of ['G10', 'G11', 'G17', 'G18', 'G19', 'G20', 'G21', 'G3', 'G35']) {
    await bildschirm(page, `frage:${id}`); await page.waitForTimeout(700);
    if (id === 'G10') await schritt(page, s, n++, 'frage-G10');
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
  }
  await bildschirm(page, 'beitrag'); bericht.werte[`${s}.beitrag`] = await beitragLesen(page); await schritt(page, s, n++, 'beitrag'); await weiter(page);
  await bildschirm(page, 'erkl:beratung');
  for (const key of ['avoidAdvice', 'verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
  await schritt(page, s, n++, 'beratung'); await weiter(page);
  await bildschirm(page, 'anschrift'); await anschriftFuellen(page, s); await schritt(page, s, n++, 'anschrift'); await weiter(page);
  await bildschirm(page, 'zahlung'); await zahlungFuellen(page, s); await zurueckPruefen(page, s); await schritt(page, s, n++, 'zahlung'); await weiter(page);
  await vorAbsenden(page, s); await schritt(page, s, n++, 'zusammenfassung');
  await context.close();
}

await starteServer();
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
let fehler = null;
for (const [name, lauf] of [['ambulant', ambulant], ['zahn', zahn], ['stationaer', stationaer]]) {
  try { await lauf(browser); } catch (e) { fehler = fehler || e; bericht.mängel.push(`${name}: ABBRUCH ${e.message.split('\n')[0]}`); }
}
await browser.close();
stoppe();
const ausgabe = { ...bericht, knöpfe: [...bericht.knöpfe].sort() };
fs.writeFileSync(path.join(FOTOS, 'bericht.json'), `${JSON.stringify(ausgabe, null, 2)}\n`);
console.log(JSON.stringify(ausgabe, null, 2));
console.log(`Handy-Durchlauf: ${punkte} Prüfpunkte, ${bericht.mängel.length} Auffälligkeiten`);
process.exit(fehler ? 1 : 0);
