// Gerenderte Prüfung der gemeinsamen Zahn-Maske mit Weiche /antrag/zahn (Paket C, Schritte 8 und 9, 20.11.2026), unsichtbar im
// Headless-Chrome gegen die Attrappe (scripts/antrag-selbst-mock.mjs), mit den Entwicklungsschaltern. Teil 4 der Ergänzung Nr. 45 bis 53,
// 55 bis 61. Fotos bei 390 px (ganze Seite) und 1280 px.
//
// Aufruf: node scripts/check-zahn-weiche-rendered.mjs [--fotos <ordner>] [--variante <url>]
// Startet die Attrappe (8812) und drei Vite-Server: 3038 alle Schalter an (Telefonweg Zahn aus, Ausgang Termin), 3039 Maske an,
// UKV-Schalter aus, 3040 wie 3038 mit Telefonweg Zahn (Ausgang Telefon, nur Fotos und Knopftext).
// --variante: zusätzlich eine bereits laufende Vite-Seite mit WAHLREGEL „beide“ (nur für die Rückweiche Bayerische zur UKV).
// Nachbesserung Paket C (20.11.2026): Fotos bei 390 und 1280 px für alle Motive, W2, W3, K1, K2, K3 gerendert.
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
const FOTOS = arg('--fotos', null);
const VARIANTE = arg('--variante', null);
const API_PORT = Number(arg('--api-port', 8812));
const AN_PORT = Number(arg('--an-port', 3038));
const UKVAUS_PORT = Number(arg('--ukvaus-port', 3039));
const TEL_PORT = Number(arg('--tel-port', 3040));
const API = `http://127.0.0.1:${API_PORT}`;
const AN = `http://127.0.0.1:${AN_PORT}`;
const UKVAUS = `http://127.0.0.1:${UKVAUS_PORT}`;
const TEL = `http://127.0.0.1:${TEL_PORT}`;

const require = createRequire(import.meta.url);
function ladePlaywright() {
  try { return require('playwright'); } catch { /* nicht im Repo */ }
  return require(process.env.PLAYWRIGHT_PFAD || '/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/node_modules/playwright');
}
const { chromium } = ladePlaywright();

let punkte = 0;
const pruefe = (bedingung, text) => { assert.ok(bedingung, text); punkte += 1; };
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
    cwd: ROOT, env: { ...process.env, ANTRAG_SELBST_MOCK_PORT: String(API_PORT), ANTRAG_ERLAUBTE_HERKUNFT: `${AN},${UKVAUS},${TEL}${VARIANTE ? `,${VARIANTE}` : ''}` }, stdio: 'ignore',
  }));
  const vite = (port, env) => spawn(path.join(ROOT, 'node_modules/.bin/vite'), ['--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: ROOT, env: { ...process.env, VITE_ANTRAG_API: `${API}/antrag/api`, ...env }, stdio: 'ignore',
  });
  prozesse.push(vite(AN_PORT, {
    VITE_ANTRAGSMASKE: '1', VITE_ANTRAGSWAHL: '1', VITE_ANTRAGSMASKE_UKV_ZAHN: '1', VITE_ANTRAG_TELEFON: 'ambulant',
  }));
  prozesse.push(vite(UKVAUS_PORT, {
    VITE_ANTRAGSMASKE: '1', VITE_ANTRAGSWAHL: '0', VITE_ANTRAGSMASKE_UKV_ZAHN: '0', VITE_ANTRAG_TELEFON: '0',
  }));
  prozesse.push(vite(TEL_PORT, {
    VITE_ANTRAGSMASKE: '1', VITE_ANTRAGSWAHL: '1', VITE_ANTRAGSMASKE_UKV_ZAHN: '1', VITE_ANTRAG_TELEFON: 'ambulant,zahn',
  }));
  await warteAuf(`${API}/antrag/gesund`);
  await warteAuf(`${AN}/antrag/zahn`);
  await warteAuf(`${UKVAUS}/antrag/zahn`);
  await warteAuf(`${TEL}/antrag/zahn`);
}
const stoppe = () => prozesse.forEach((kind) => { try { kind.kill('SIGTERM'); } catch { /* weg */ } });
const mock = (pfad, methode = 'GET') => fetch(`${API}${pfad}`, { method: methode }).then((antwort) => antwort.json());

async function foto(page, name) {
  if (!FOTOS) return;
  fs.mkdirSync(FOTOS, { recursive: true });
  await page.waitForTimeout(250);
  // Ganze Seite ohne mitlaufende Leiste mitten im Bild: Fenster kurz auf Seitenhöhe ziehen, dann zurück.
  const groesse = page.viewportSize();
  const hoehe = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight));
  await page.setViewportSize({ width: groesse.width, height: Math.max(groesse.height, hoehe) });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(FOTOS, `${name}.png`), fullPage: true });
  await page.setViewportSize(groesse);
}
async function pruefeSeite(page, wo) {
  const breite = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, innen: window.innerWidth }));
  pruefe(breite.scroll <= breite.innen, `${wo}: waagerechtes Scrollen (${breite.scroll} > ${breite.innen})`);
  const klein = await page.evaluate(() => [...document.querySelectorAll('main *, [data-zahn-vorab] *, [data-antragsmaske] *')]
    .filter((el) => el.childNodes.length && [...el.childNodes].some((k) => k.nodeType === 3 && k.textContent.trim()) && el.offsetParent !== null && !el.closest('.sr-only'))
    .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16).length);
  pruefe(klein === 0, `${wo}: ${klein} sichtbare Texte unter 16 px`);
}
const bildschirm = (page, id) => page.waitForSelector(`[data-bildschirm="${id}"]`, { timeout: 10000 });
async function weiter(page) { await page.waitForTimeout(500); await page.locator('[data-weiter]').click(); }
const VERBOTEN = /passt zu dir|Darum passt das|Dein passender Tarif|Versicherer vergleichen|Aus deinen Antworten vorab übernommen/;

// Vorfragen bis zur Weiche. antworten: [[schritt, wert], ...]; V1 und die Einwilligung macht die Hilfe selbst.
async function vorfragen(page, {
  datum = '05.03.1990', antworten = [], name = null, einwilligungFehler = false,
} = {}) {
  await page.waitForSelector('[data-vorab-frage="V1"]');
  if (name) await foto(page, `${name}-00-einstieg`);
  await page.fill('#vorab-geburtsdatum', datum);
  await page.click('[data-vorab-weiter]');
  for (const [schritt, wert] of antworten) {
    if (schritt === 'einwilligung') {
      await page.waitForSelector('[data-einwilligung]');
      if (name) await foto(page, `${name}-02-einwilligung`);
      if (einwilligungFehler) {
        await page.click('[data-einwilligung-weiter]');
        pruefe(await page.locator('#fehler-weicheEinwilligung').isVisible(), 'Einwilligung ist Pflicht');
      }
      await page.locator('label:has(#feld-weicheEinwilligung)').click();
      await page.click('[data-einwilligung-weiter]');
      continue; // eslint-disable-line no-continue
    }
    await page.waitForSelector(`[data-vorab-frage="${schritt}"]`);
    if (name && ['V2', 'V3', 'V4', 'V5', 'V3a'].includes(schritt)) await foto(page, `${name}-01-vorfrage-${schritt}`);
    await page.click(`[data-vorab-frage="${schritt}"] [data-vorab-antwort="${wert}"]`);
  }
}

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

// A: UKV ohne Zuschlag, ganzer Antrag bis zur Danke-Seite (390) bzw. bis zur Maske (1280).
async function ukvWeg(browser, breite) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const name = `${breite}-weiche-ukv`;
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-vorab-frage="V1"]');
  await pruefeSeite(page, `${name} Einstieg`);
  const einstieg = await page.textContent('[data-zahn-vorab]');
  pruefe(einstieg.includes('Zahnzusatzversicherung online beantragen') && einstieg.includes('Erstinformation') && einstieg.includes('Frage 1 von 6'), 'Einstieg mit Erstinformation und Fortschritt');
  pruefe(einstieg.includes('Du bleibst die ganze Zeit bei Healio.') && einstieg.includes('Die Bestätigung bekommst du per E-Mail.') && (await page.textContent('[data-vertrauen]')).includes('Alle Unterlagen bekommst du per E-Mail'), 'W2: mit UKV-Maske alle Einstiegssätze');
  pruefe(!/Bayerische|UKV/.test(await page.textContent('[data-vorab-frage="V1"]')), 'Vorfragen ohne Gesellschaftsnamen');
  await vorfragen(page, {
    antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '0']], name, einwilligungFehler: true,
  });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  await pruefeSeite(page, `${name} Weiche`);
  const weiche = await page.textContent('[data-weiche-ergebnis]');
  pruefe(weiche.includes('Mit deinen Angaben kannst du online bei der UKV abschließen.'), 'Titel der Weiche');
  pruefe(await page.locator('[data-weiche-stufe]').count() === 3 && (await page.textContent('[data-weiche-stufe="Z100"]')).includes('30,05 EUR'), 'drei Stufen mit Beitrag, kein „ab“');
  pruefe(weiche.includes('Beitrag bei Beginn am 01.12.2026') && weiche.includes('Deine Stufe wählst du im nächsten Schritt.'), 'Beginn und Hinweis am Preis');
  pruefe(weiche.includes('Healio wählt hier nur zwischen zwei Gesellschaften aus') && !VERBOTEN.test(await page.textContent('body')), 'Satz zur Auswahl, keine Empfehlungswörter');
  pruefe(!/ab \d/.test(await page.textContent('[data-weiche-preis]')), 'kein „ab“-Preis');
  await foto(page, `${name}-03-weiche`);
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  pruefe(await page.inputValue('#feld-geburtsdatum') === '05.03.1990' && await page.locator('input[name="tarif"]:checked').count() === 0, 'Maske: Geburtsdatum übernommen, Stufe frei');
  pruefe(!VERBOTEN.test(await page.textContent('body')), 'Maske ohne „vorab übernommen“');
  // 60: Zurück aus dem ersten Maskenschritt führt zur Weiche, Eingaben bleiben.
  await page.locator('label:has(input[name="tarif"][value="Z90"])').click();
  await page.click('[data-leiste] button[aria-label="Zurück"]');
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  pruefe(true, 'Zurück führt zur Weiche');
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  pruefe(await page.locator('input[name="tarif"][value="Z90"]').isChecked(), 'Stufe nach Zurück erhalten');
  // 47: anderer Beginn, andere Altersgruppe? Bei 1990 bleibt die Gruppe; Hinweis nur bei Sprung (siehe ukvBeginn).
  await ukvBisFragen(page);
  // 45: Originalfragen leer.
  pruefe(await page.locator('input[name="frage-TF0021"]:checked').count() === 0 && await page.locator('[data-vorbelegt]').count() === 0, 'TF0021 leer, keine Vorbelegung');
  await foto(page, `${name}-04-maske-leere-frage`);
  if (breite > 600) { await context.close(); return; }
  // 48: andere Zahl als in V4: neuer Beitrag mit Hinweis.
  await page.locator('label:has(input[name="frage-TF0021"][value="2"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:GF0073');
  pruefe(await page.locator('[data-bildschirm="frage:GF0073"] [aria-pressed="true"]').count() === 0, 'GF0073 leer');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="nein"]');
  await bildschirm(page, 'frage:GF0074');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await page.waitForSelector('[data-hinweis-ja]');
  pruefe((await page.textContent('[data-hinweis-ja]')).includes('Für Parodontosebehandlungen hast du bei der UKV keinen Versicherungsschutz. Dein Beitrag ändert sich dadurch nicht.'), 'GF0074: Satz zum Ausschluss');
  await foto(page, `${name}-05-gf0074-ausschluss`);
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
  await page.waitForSelector('[data-beitrag-geaendert]');
  const hinweis = await page.textContent('[data-beitrag-geaendert]');
  pruefe(hinweis.includes('Dein Beitrag hat sich geändert. Vorher 30,05 EUR, jetzt 51,85 EUR im Monat, weil du bei der Frage zu fehlenden Zähnen 2 angegeben hast.'), `Hinweis 2.7 TF0021: ${hinweis}`);
  await foto(page, `${name}-06-beitrag-geaendert`);
  await weiter(page);
  await bildschirm(page, 'erkl:auftrag');
  const auftrag = await page.textContent('[data-bildschirm="erkl:auftrag"]');
  pruefe(auftrag.includes('Gut zu wissen: Healio hat für deine Angaben nur zwischen der Bayerischen und der UKV ausgewählt.') && auftrag.includes('Healio hat die Gesellschaft nur nach deren Annahmeregeln und meinen Angaben ausgewählt'), 'Texte der Weiche in der Maske (2.9 Nr. 1 und 3)');
  pruefe(!(await page.locator('#feld-verzicht').isChecked()) && !(await page.locator('#feld-vollmacht').isChecked()), 'Erklärungen nicht vorangehakt');
  for (const key of ['verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
  await foto(page, `${name}-07-erklaerungen`);
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
  pruefe((await page.textContent('[data-bildschirm="zusammenfassung"]')).includes('Zu einer anderen Gesellschaft wechselt Healio nur, wenn du es neu bestätigst.'), 'Vorbehalt der Weiche (2.9 Nr. 12)');
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  const { letzter } = await mock('/__test/letzter');
  pruefe(letzter.weiche === true && letzter.erklaerungen.weicheEinwilligung === true && letzter.unterlagen.bestaetigt.some((b) => b.erklaerung === 'weicheEinwilligung' && /^\d{4}-\d\d-\d\dT/.test(b.um)), '53: Einwilligung mit Zeitpunkt im Antrag');
  pruefe(letzter.textfassung === '2026-11-20e-ukv-zahn-online' && letzter.beitragAngezeigt === 51.85, 'Fassung und Beitrag');
  pruefe(!JSON.stringify(letzter).includes('"V3"') && !JSON.stringify(letzter).includes('"V5"'), 'keine Vorfragen im Antrag');
  await foto(page, `${name}-08-danke`);
  await context.close();
}

// 47: anderer Beginn mit anderer Altersgruppe (Jahrgang 1997 im 100er: 21,55 zu 30,05 zum 01.01.2027).
async function ukvBeginn(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { datum: '05.03.1997', antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '0']] });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  pruefe((await page.textContent('[data-weiche-stufe="Z100"]')).includes('21,55 EUR'), '1997: Z100 21,55 EUR bei Beginn 01.12.2026');
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  await page.locator('label:has(input[name="tarif"][value="Z100"])').click();
  await page.locator('label:has(input[name="beginnArt"][value="anderer"])').click();
  await page.selectOption('#feld-beginnDatum', '2027-01-01');
  await page.waitForSelector('[data-beitrag-geaendert]');
  pruefe((await page.textContent('[data-beitrag-geaendert]')).includes('Dein Beitrag hat sich geändert. Bei Beginn am 01.01.2027 gilt für dich eine andere Altersgruppe. Vorher 21,55 EUR, jetzt 30,05 EUR im Monat.'), 'Hinweis 2.7 Beginn');
  await foto(page, '390-weiche-ukv-09-beginn-geaendert');
  await context.close();
}

// Bayerische mit ZAHN Sofort, Bayerische ohne, Telefon, Region ungeprüft.
async function bayerischeWege(browser, breite) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const name = `${breite}-weiche-bayerische`;
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, {
    antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'steht_an'], ['V3a', 'nein'], ['V4', '0'], ['V5', 'nein']], name,
  });
  await page.waitForSelector('[data-weiche-ergebnis="bayerische-sofort"]');
  pruefe(await page.locator('[data-weiche-stufe]').count() === 0, 'ohne PLZ kein Preis');
  await page.fill('#weiche-plz', '20095');
  await page.waitForFunction(() => document.querySelectorAll('[data-weiche-stufe]').length === 3);
  await pruefeSeite(page, `${name} Weiche`);
  const text = await page.textContent('[data-weiche-ergebnis]');
  pruefe(text.includes('Mit deinen Angaben kannst du online bei der Bayerischen abschließen.') && text.includes('ZAHN Sofort kostet 29,90 Euro im Monat zusätzlich zum Zahntarif.') && text.includes('Ohne ZAHN Sofort siehst du die Beiträge im nächsten Schritt.'), 'Weiche Bayerische mit ZAHN Sofort');
  pruefe((await page.textContent('[data-weiche-stufe="PRESTIGE"]')).includes('74,00 EUR'), 'Prestige Stadt 36 Jahre mit ZAHN Sofort 44,10 + 29,90 = 74,00');
  const anfragen = (await mock('/__test/preisanfragen')).anfragen;
  pruefe(anfragen.length > 0 && anfragen.every((a) => Array.isArray(a.bausteine) && a.bausteine.length === 0), '50: Preisabfrage der Weiche ohne Baustein');
  await foto(page, `${name}-03-weiche-sofort`);
  await page.click('[data-weiche-weiter]');
  await bildschirm(page, 'tarif');
  pruefe(await page.locator('#feld-baustein-ZAHN_SOFORT').isChecked() && await page.locator('input[name="tarif"][value="PRESTIGE"]').isChecked() && await page.inputValue('#feld-plzTarif') === '20095', 'Maske: Vorauswahl des Originals, Baustein, PLZ');
  await page.waitForSelector('[data-gesamtbeitrag]');
  if (breite < 600) {
    // Nachbesserung K1: jährlich wie das Original.
    pruefe((await page.textContent('[data-tarif-hinweis]')) === 'Monatlicher Gesamtbeitrag der versicherten Person' && (await page.textContent('[data-baustein-preis]')) === '+ 29,90 € monatlich', 'K1: monatlich wie das Original');
    await page.locator('label:has(input[name="zahlweise"][value="jaehrlich"])').click();
    await page.waitForFunction(() => document.querySelector('[data-tarif-hinweis]')?.textContent === 'Jährlicher Gesamtbeitrag der versicherten Person');
    pruefe((await page.textContent('[data-baustein-preis]')) === '+ 351,60 € jährlich', 'K1: jährlich Beschriftung und Bausteinpreis wie das Original');
    await page.waitForSelector('[data-gesamtbeitrag]');
    await foto(page, `${name}-03b-maske-tarif-jaehrlich`);
    await page.locator('label:has(input[name="zahlweise"][value="monatlich"])').click();
    await page.waitForSelector('[data-gesamtbeitrag]');
  }
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:z1');
  pruefe(await page.locator('[data-bildschirm="frage:z1"] [aria-pressed="true"]').count() === 0 && await page.locator('[data-vorbelegt]').count() === 0, '45: Frage 1 der Bayerischen leer');
  await foto(page, `${name}-04-maske-leere-frage`);
  await context.close();

  // Ausgang Termin (Telefonweg Zahn aus, wie heute) und Ausgang Telefon (Telefonweg Zahn an): mehr als 3 Zähne; privat vor der Einwilligung.
  const seite = await browser.newPage({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  for (const [basis, art, knopf] of [[AN, 'termin', 'Termin vereinbaren'], [TEL, 'telefon', 'Mit Nita am Telefon']]) {
    await seite.goto(`${basis}/antrag/zahn`, { waitUntil: 'networkidle' });
    await vorfragen(seite, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '>3']] });
    await seite.waitForSelector('[data-weiche-ergebnis="telefon"]');
    pruefe((await seite.textContent('[data-weiche-ergebnis]')).includes('Fehlen mehr als 3 Zähne, ist online bei keiner der beiden Gesellschaften ein Abschluss möglich.') && (await seite.textContent('[data-weiche-ergebnis]')).includes('Deine Antworten von hier nehmen wir nicht mit.'), `Ausgang ${art} mit Grund`);
    pruefe((await seite.textContent('[data-weiche-ergebnis] [data-weiche-telefon]')).trim() === knopf, `Ausgang ${art}: Knopf „${knopf}“`);
    await pruefeSeite(seite, `${breite} Ausgang ${art}`);
    await foto(seite, `${breite}-ausgang-${art}-mehr-als-3`);
    await seite.goto(`${basis}/antrag/zahn`, { waitUntil: 'networkidle' });
    await vorfragen(seite, { antworten: [['V2', 'privat']] });
    await seite.waitForSelector('[data-weiche-ergebnis="telefon"]');
    pruefe(await seite.locator('[data-einwilligung]').count() === 0 && (await seite.textContent('[data-weiche-ergebnis]')).includes('Die beiden Zahntarife hier ergänzen eine gesetzliche Krankenversicherung.'), `39: privat endet vor der Einwilligung (${art})`);
    await foto(seite, `${breite}-ausgang-${art}-privat`);
  }
  if (breite > 600) { await seite.close(); return; }
  // 49: Region der Bayerischen ungeprüft: kein Preis, kein Wechsel zur UKV.
  await mock('/__test/region-weg', 'POST');
  await seite.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(seite, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'fertig'], ['V4', '0'], ['V5', 'nein']] });
  await seite.waitForSelector('[data-weiche-ergebnis="bayerische"]');
  await seite.fill('#weiche-plz', '37139');
  await seite.waitForSelector('[data-weiche-region]');
  pruefe((await seite.textContent('[data-weiche-region]')).includes('Deinen Beitrag können wir gerade nicht bestätigen. Versuch es später noch einmal oder vereinbare einen Termin.') && await seite.locator('[data-weiche-stufe]').count() === 0 && await seite.locator('[data-weiche-weiter]').count() === 0 && !/UKV abschließen/.test(await seite.textContent('[data-weiche-ergebnis]')), '49: Region ungeprüft');
  await foto(seite, '390-weiche-bayerische-region-ungeprueft');
  await mock('/__test/zuruecksetzen', 'POST');
  await seite.fill('#weiche-plz', '20095');
  await seite.waitForFunction(() => document.querySelectorAll('[data-weiche-stufe]').length === 3);
  pruefe((await seite.textContent('[data-weiche-ergebnis]')).includes('Deine Behandlung ist abgerechnet.') && (await seite.textContent('[data-weiche-ergebnis]')).includes('Deine abgerechnete Behandlung ist nicht versichert.'), 'Bayerische ohne ZAHN Sofort');
  await foto(seite, '390-weiche-bayerische-03-ohne-sofort');
  await seite.close();
}

// 55, 57: Rückweiche UKV zur Bayerischen (GF0073 „Ja“ nach V3 nein, V4 keiner).
async function rueckweicheZurBayerischen(browser, breite) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const name = `${breite}-rueckweiche-ukv-zur-bayerischen`;
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '0']] });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  await page.click('[data-weiche-weiter]');
  await ukvBisFragen(page);
  await page.locator('label:has(input[name="frage-TF0021"][value="0"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:GF0073');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await page.waitForSelector('[data-rueckweiche]');
  const kasten = await page.textContent('[data-rueckweiche]');
  pruefe(kasten.includes('Mit dieser Antwort geht es bei der UKV online nicht weiter.') && kasten.includes('Dafür brauchen wir noch vier kurze Angaben.') && kasten.includes('Lieber am Telefon'), 'Kasten Rückweiche');
  pruefe(await page.locator('[data-weiter]').count() === 0, 'kein Weiter, kein Wechsel ohne Klick');
  await foto(page, `${name}-01-kasten`);
  await page.click('[data-rueckweiche-knopf]');
  await bildschirm(page, 'wechsel:W1');
  pruefe(!(await page.textContent('[data-vertrauen]')).includes('UKV') && (await page.textContent('[data-vertrauen]')).includes('Der Vertrag kommt direkt vom Versicherer.'), 'W3: Zusatzangaben ohne Gesellschaft in der Seitenspalte');
  await foto(page, `${name}-02-abgerechnet`);
  await page.click('[data-vorab-antwort="steht_an"]');
  await bildschirm(page, 'wechsel:V3a');
  await page.click('[data-vorab-antwort="nein"]');
  await bildschirm(page, 'wechsel:V5');
  await page.click('[data-vorab-antwort="nein"]');
  await bildschirm(page, 'wechsel:plz');
  await foto(page, `${name}-03-plz`);
  await page.fill('#wechsel-plz', '20095');
  await page.click('[data-wechsel-plz-weiter]');
  await bildschirm(page, 'wechsel:wechsel');
  await page.waitForFunction(() => document.querySelectorAll('[data-weiche-stufe]').length === 3);
  const ergebnis = await page.textContent('[data-wechsel-ergebnis]');
  pruefe(ergebnis.includes('Bei der Bayerischen kannst du mit deinen Angaben online abschließen.') && ergebnis.includes('Deine Antworten auf die Fragen der UKV nehmen wir nicht mit.') && (await page.textContent('[data-weiche-stufe="PRESTIGE"]')).includes('74,00 EUR'), '55: neuer Preis vor dem Klick');
  await pruefeSeite(page, `${name} Ergebnis`);
  pruefe((await page.textContent('[data-vertrauen]')).includes('Der Vertrag kommt direkt von der Bayerischen.') && !(await page.textContent('[data-vertrauen]')).includes('UKV'), 'W3: Ergebnis der Rückweiche mit der Bayerischen in der Seitenspalte');
  await foto(page, `${name}-04-ergebnis`);
  await page.click('[data-wechsel-weiter]');
  await bildschirm(page, 'tarif');
  pruefe(await page.locator('#feld-baustein-ZAHN_SOFORT').isChecked() && await page.inputValue('#feld-geburtsdatum') === '05.03.1990' && await page.inputValue('#feld-plzTarif') === '20095', '57: Geburtsdatum und PLZ übernommen, Baustein für die anstehende Behandlung');
  await page.waitForSelector('[data-gesamtbeitrag]');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  for (const id of ['z1', 'z2', 'z3', 'z4', 'z5']) {
    await bildschirm(page, `frage:${id}`);
    pruefe(await page.locator(`[data-bildschirm="frage:${id}"] [aria-pressed="true"]`).count() === 0, `57: ${id} leer, Antworten an die UKV verworfen`);
    await page.waitForTimeout(650);
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
  }
  await bildschirm(page, 'beitrag');
  await weiter(page);
  await bildschirm(page, 'person');
  pruefe(await page.inputValue('#feld-vorname') === 'Lena' && await page.inputValue('#feld-nachname') === 'Muster' && await page.locator('input[name="anrede"][value="frau"]').isChecked(), '57: Anrede und Name übernommen');
  await context.close();
}

// 52 und Teil 6 Nr. 2: UKV-Ziel bei ausgeschaltetem UKV-Schalter: heutiger Link zur UKV, kein Antrag bei Healio.
async function ukvSchalterAus(browser, breite = 390) {
  const page = await browser.newPage({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  await page.goto(`${UKVAUS}/antrag/zahn`, { waitUntil: 'networkidle' });
  // Nachbesserung W2: ohne die Sätze, die für UKV-Kunden mit Link nicht gelten.
  await page.waitForSelector('[data-vorab-frage="V1"]');
  const einstieg = await page.textContent('[data-zahn-vorab]');
  pruefe(!einstieg.includes('Du bleibst die ganze Zeit bei Healio.') && !einstieg.includes('Die Bestätigung bekommst du per E-Mail.') && einstieg.includes('Ein paar kurze Fragen'), 'W2: Einstieg ohne „bei Healio“ und „per E-Mail“');
  pruefe(!(await page.textContent('[data-vertrauen]')).includes('Alle Unterlagen bekommst du per E-Mail') && (await page.textContent('[data-seitenspalte-fuss]')) === 'Deine Antworten zu deinen Zähnen bleiben auf dieser Seite.', 'W2: Seitenspalte ohne Unterlagen per E-Mail und ohne „Deinen Antrag senden wir“');
  await foto(page, `${breite}-ukv-schalter-aus-00-einstieg`);
  await vorfragen(page, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '1']] });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  const link = await page.getAttribute('[data-weiche-ukv-link]', 'href');
  pruefe(/mandant=vmk/.test(link || '') && await page.locator('[data-weiche-weiter]').count() === 0, `52: Link zum Online-Abschluss der UKV (${link})`);
  pruefe((await page.textContent('[data-weiche-ergebnis]')).includes('Dir fehlt 1 Zahn, der noch nicht ersetzt ist.'), 'UKV mit Zuschlag: Grund');
  pruefe(!(await page.textContent('[data-vertrauen]')).includes('Alle Unterlagen bekommst du per E-Mail'), 'W2: Weiche zur UKV per Link ohne Unterlagen per E-Mail');
  await foto(page, `${breite}-weiche-ukv-schalter-aus`);
  // Ziel Bayerische: der Weg bleibt bei Healio, die Seitenspalte nennt die Unterlagen wieder.
  await page.goto(`${UKVAUS}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'fertig'], ['V4', '0'], ['V5', 'nein']] });
  await page.waitForSelector('[data-weiche-ergebnis="bayerische"]');
  pruefe((await page.textContent('[data-vertrauen]')).includes('Alle Unterlagen bekommst du per E-Mail'), 'W2: Ziel Bayerische mit Unterlagen per E-Mail');
  await page.close();
}

// Nachbesserung K2 und K3: Rückweiche nach AF_AD_0005 „freiwillig“ (zwei Angaben), V3 bleibt, Zurück aus der Maske zum Ergebnis.
async function rueckweicheNachVersicherung(browser, breite) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const name = `${breite}-rueckweiche-freiwillig-zur-bayerischen`;
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '0']] });
  await page.waitForSelector('[data-weiche-ergebnis="ukv"]');
  await page.click('[data-weiche-weiter]');
  await ukvBisFragen(page);
  await page.locator('label:has(input[name="frage-TF0021"][value="0"])').click();
  await weiter(page);
  for (const [id, wert] of [['GF0073', 'nein'], ['GF0074', 'nein']]) {
    await bildschirm(page, `frage:${id}`);
    await page.waitForTimeout(650);
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="${wert}"]`);
  }
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
  await page.locator('label:has(input[name="frage-AF_AD_0005"][value="freiwillig gesetzlich versichert in deutscher GKV"])').click();
  await page.waitForSelector('[data-rueckweiche]');
  pruefe((await page.textContent('[data-rueckweiche]')).includes('Dafür brauchen wir noch zwei kurze Angaben.'), 'K2: nach AF_AD_0005 zwei Angaben');
  await foto(page, `${name}-01-kasten`);
  await page.click('[data-rueckweiche-knopf]');
  await bildschirm(page, 'wechsel:V5');
  await page.click('[data-vorab-antwort="nein"]');
  await bildschirm(page, 'wechsel:plz');
  await page.fill('#wechsel-plz', '20095');
  await page.click('[data-wechsel-plz-weiter]');
  await bildschirm(page, 'wechsel:wechsel');
  await page.waitForFunction(() => document.querySelectorAll('[data-weiche-stufe]').length === 3);
  pruefe(await page.locator('text=mit ZAHN Sofort').count() === 0, 'K3: ohne ZAHN Sofort (nichts angeraten)');
  await foto(page, `${name}-02-ergebnis`);
  await page.click('[data-wechsel-weiter]');
  await bildschirm(page, 'tarif');
  pruefe(!(await page.locator('#feld-baustein-ZAHN_SOFORT').isChecked()) && await page.inputValue('#feld-plzTarif') === '20095', 'K3: Maske der Bayerischen ohne Baustein, PLZ übernommen');
  await page.waitForSelector('[data-gesamtbeitrag]');
  // K3: Zurück führt zum Ergebnis der Rückweiche, nicht zur Frage nach der abgerechneten Behandlung.
  await page.click('[data-leiste] button[aria-label="Zurück"]');
  await page.waitForSelector('[data-bildschirm^="wechsel:"]');
  pruefe(await page.getAttribute('[data-bildschirm^="wechsel:"]', 'data-bildschirm') === 'wechsel:wechsel', `K3: Zurück zum Ergebnis (${await page.getAttribute('[data-bildschirm^="wechsel:"]', 'data-bildschirm')})`);
  await context.close();
}

// 61: Prüfseite ohne Rückweiche (Ablehnung bleibt Telefon).
async function pruefseiteOhneRueckweiche(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${AN}/antrag/pruefen#test-zahn`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  await page.waitForSelector('[data-gesamtbeitrag]');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:z1');
  await page.waitForTimeout(650);
  await page.click('[data-bildschirm="frage:z1"] [data-antwort="ja"]');
  await page.waitForSelector('[data-pruefung]');
  pruefe(await page.locator('[data-rueckweiche]').count() === 0, '61: Prüfseite ohne Rückweiche');
  await page.close();
}

// Rückweiche Bayerische zur UKV: nur mit WAHLREGEL „beide“ erreichbar (Variante im Zwischenordner, --variante).
async function rueckweicheZurUkv(browser, basis, breite = 390) {
  const page = await browser.newPage({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  await page.goto(`${basis}/antrag/zahn`, { waitUntil: 'networkidle' });
  await vorfragen(page, { antworten: [['V2', 'pflicht'], ['einwilligung'], ['V3', 'nein'], ['V4', '0'], ['V5', 'nein']] });
  await page.waitForSelector('[data-weiche-ergebnis="beide"]');
  await page.fill('#weiche-plz', '20095');
  await page.waitForSelector('[data-weiche-waehle="zahn"]');
  await foto(page, `${breite}-weiche-beide-variante`);
  await page.click('[data-weiche-waehle="zahn"]');
  await bildschirm(page, 'tarif');
  await page.waitForSelector('[data-gesamtbeitrag]');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:z1');
  await page.waitForTimeout(650);
  await page.click('[data-bildschirm="frage:z1"] [data-antwort="nein"]');
  await bildschirm(page, 'frage:z2');
  await page.waitForTimeout(650);
  await page.click('[data-bildschirm="frage:z2"] [data-antwort="nein"]');
  await bildschirm(page, 'frage:z3');
  await page.waitForTimeout(650);
  await page.click('[data-bildschirm="frage:z3"] [data-antwort="ja"]');
  await page.waitForSelector('[data-rueckweiche]');
  const kasten = await page.textContent('[data-rueckweiche]');
  pruefe(kasten.includes('Mit dieser Antwort geht es bei der Bayerischen online nicht weiter.') && kasten.includes('ZahnPRIVAT 100') && /\d+,\d\d EUR im Monat/.test(kasten), 'Rückweiche zur UKV mit neuem Preis');
  await foto(page, `${breite}-rueckweiche-bayerische-zur-ukv-01-kasten`);
  await page.click('[data-rueckweiche-knopf]');
  await bildschirm(page, 'tarif');
  pruefe(await page.inputValue('#feld-geburtsdatum') === '05.03.1990' && (await page.textContent('body')).includes('ZahnPRIVAT'), 'Wechsel zur UKV-Maske');
  await foto(page, `${breite}-rueckweiche-bayerische-zur-ukv-02-maske`);
  await page.close();
}

let browser;
try {
  await starteServer();
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  await ukvWeg(browser, 390);
  await ukvWeg(browser, 1280);
  await ukvBeginn(browser);
  await bayerischeWege(browser, 390);
  await bayerischeWege(browser, 1280);
  await rueckweicheZurBayerischen(browser, 390);
  await rueckweicheZurBayerischen(browser, 1280);
  await ukvSchalterAus(browser, 390);
  await ukvSchalterAus(browser, 1280);
  await rueckweicheNachVersicherung(browser, 390);
  await rueckweicheNachVersicherung(browser, 1280);
  await pruefseiteOhneRueckweiche(browser);
  if (VARIANTE) { await rueckweicheZurUkv(browser, VARIANTE, 390); await rueckweicheZurUkv(browser, VARIANTE, 1280); }
  console.log(`Zahn-Weiche gerendert: ${punkte} Prüfungen grün.`);
} finally {
  await browser?.close();
  stoppe();
}
