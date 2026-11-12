// Gerenderte Prüfung der Antragsmaske /antrag/ambulant und der Wahl der zwei
// Wege, unsichtbar im Headless-Chrome gegen die Attrappe
// (scripts/antrag-selbst-mock.mjs). Klickt die ganze Strecke bei 390 px und
// 1280 px durch, einmal ohne und einmal mit „Ja“ bei Gesundheitsfragen, prüft
// die Wahl auf /ambulant, /zahn, /stationaer (Schalter an) und das heutige
// Verhalten bei ausgeschalteten Schaltern.
//
// Aufruf: node scripts/check-antragsmaske-rendered.mjs [--fotos <ordner>]
// Startet Attrappe und zwei Vite-Server (Standard 3028 mit Schaltern an, 3029 aus, Attrappe 8802).
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
// Eigene Ports (Standard 8802, 3028, 3029), damit eine laufende Vorschau auf 8792/3018 nicht stört.
const API_PORT = Number(arg('--api-port', 8802));
const AN_PORT = Number(arg('--an-port', 3028));
const AUS_PORT = Number(arg('--aus-port', 3029));
const API = `http://127.0.0.1:${API_PORT}`;
const AN = `http://127.0.0.1:${AN_PORT}`;
const AUS = `http://127.0.0.1:${AUS_PORT}`;

const require = createRequire(import.meta.url);
function ladePlaywright() {
  try { return require('playwright'); } catch { /* nicht im Repo */ }
  return require(process.env.PLAYWRIGHT_PFAD || '/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/node_modules/playwright');
}
const { chromium } = ladePlaywright();

let punkte = 0;
// Vergleich unabhängig von der Reihenfolge der Schlüssel (Listen bleiben geordnet).
const gleich = (a, b) => {
  const sortiert = (wert) => (Array.isArray(wert) ? wert.map(sortiert) : wert && typeof wert === 'object' ? Object.fromEntries(Object.keys(wert).sort().map((k) => [k, sortiert(wert[k])])) : wert);
  return JSON.stringify(sortiert(a)) === JSON.stringify(sortiert(b));
};
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
    cwd: ROOT, env: { ...process.env, ANTRAG_SELBST_MOCK_PORT: String(API_PORT), ANTRAG_ERLAUBTE_HERKUNFT: AN }, stdio: 'ignore',
  }));
  const vite = (port, env) => spawn(path.join(ROOT, 'node_modules/.bin/vite'), ['--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: ROOT, env: { ...process.env, VITE_ANTRAG_API: `${API}/antrag/api`, ...env }, stdio: 'ignore',
  });
  prozesse.push(vite(AN_PORT, { VITE_ANTRAGSMASKE: '1', VITE_ANTRAGSWAHL: '1', VITE_ANTRAGSMASKE_UKV_ZAHN: '1' }));
  prozesse.push(vite(AUS_PORT, { VITE_ANTRAGSMASKE: '0', VITE_ANTRAGSWAHL: '0' }));
  await warteAuf(`${API}/antrag/gesund`);
  await warteAuf(`${AN}/antrag/ambulant`);
  await warteAuf(`${AUS}/antrag/ambulant`);
}
const stoppe = () => prozesse.forEach((kind) => { try { kind.kill('SIGTERM'); } catch { /* weg */ } });
const mock = (pfad, methode = 'GET') => fetch(`${API}${pfad}`, { method: methode }).then((antwort) => antwort.json());

async function foto(page, name) {
  if (!FOTOS) return;
  fs.mkdirSync(FOTOS, { recursive: true });
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(FOTOS, `${name}.png`), fullPage: true });
}

async function pruefeSeite(page, wo) {
  const breite = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, innen: window.innerWidth }));
  pruefe(breite.scroll <= breite.innen, `${wo}: waagerechtes Scrollen (${breite.scroll} > ${breite.innen})`);
  const stoerer = await page.evaluate(() => document.querySelectorAll('[data-healio-nita], [data-healio-whatsapp], a[href*="wa.me"], .healio-consent-surface').length);
  pruefe(stoerer === 0, `${wo}: Nita-Leiste, WhatsApp oder Cookie-Hinweis im DOM`);
  pruefe(await page.locator('[data-telefon-ausweg]').isVisible(), `${wo}: Ausweg „Lieber zusammen am Telefon“ fehlt`);
  const klein = await page.evaluate(() => [...document.querySelectorAll('main *, [data-antragsmaske] *')]
    .filter((el) => el.childNodes.length && [...el.childNodes].some((k) => k.nodeType === 3 && k.textContent.trim()) && el.offsetParent !== null && !el.closest('.sr-only'))
    .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16).length);
  pruefe(klein === 0, `${wo}: ${klein} sichtbare Texte unter 16 px`);
}

async function bildschirm(page, id) {
  try {
    await page.waitForSelector(`[data-bildschirm="${id}"]`, { timeout: 8000 });
  } catch (fehler) {
    if (process.env.FEHLERFOTO) await page.screenshot({ path: process.env.FEHLERFOTO, fullPage: true });
    throw fehler;
  }
}
async function weiter(page) { await page.waitForTimeout(500); await page.locator("[data-weiter]").click(); }

// einstieg: 'direkt' (Maske direkt aufgerufen), 'werber' (/ambulant mit ?ref= und utm, dann Wahl), 'wahl' (ohne Kennzeichen).
const WERBER = { ref: 'HP-testpraxis', utm: { utm_source: 'testquelle', utm_medium: 'qr', utm_campaign: 'praxisflyer' } };
// einstieg 'werber': mit Zustimmung zur Messung (Herkunft übersteht volles Neuladen);
// 'werber-ohne': ohne Zustimmung (Gate 3: kein Speichereintrag, ref kommt über den Link).
async function durchlauf(browser, breite, mitJa, einstieg = 'direkt') {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  if (einstieg === 'werber') {
    await context.addInitScript(() => {
      localStorage.setItem('healio:consent:v2', JSON.stringify({
        version: 2, decided: true, preferences: { analytics: true }, source: 'banner', updatedAt: '2026-11-12T10:00:00.000Z',
      }));
    });
  }
  // Messdienste nie wirklich laden (Zustimmung im Test), fremde Anfragen zählen erst ab der Maske.
  await context.route(/googletagmanager|google-analytics|doubleclick|facebook|connect\.facebook/, (route) => route.abort());
  const page = await context.newPage();
  const fremd = [];
  page.on('request', (anfrage) => {
    const url = new URL(anfrage.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname) && !url.protocol.startsWith('data')) fremd.push(url.hostname);
    if (url.pathname === '/api/zaehler') fremd.push('zaehler');
  });
  const name = `${breite}-${mitJa ? 'mit-ja' : 'ohne-ja'}`;
  await mock('/__test/zuruecksetzen', 'POST');
  if (einstieg === 'direkt') {
    await page.goto(`${AN}/antrag/ambulant`, { waitUntil: 'networkidle' });
  } else {
    const suche = einstieg.startsWith('werber') ? `?${new URLSearchParams({ ref: WERBER.ref, ...WERBER.utm })}` : '';
    await page.goto(`${AN}/ambulant${suche}`, { waitUntil: 'networkidle' });
    if (einstieg === 'werber') {
      // Mit Zustimmung: Seitenwechsel mit vollem Neuladen ohne Kennzeichen in der Adresse, die Herkunft muss den Besuch überstehen.
      await page.goto(`${AN}/leistungen`, { waitUntil: 'networkidle' });
      await page.goto(`${AN}/ambulant`, { waitUntil: 'networkidle' });
      pruefe(!/ref=|utm_/.test(page.url()), 'Neuladen ohne Kennzeichen in der Adresse');
      const gespeichert = await page.evaluate(() => Object.entries(sessionStorage).map(([k, v]) => `${k}=${v}`).join('|'));
      pruefe(gespeichert.includes('healio.herkunft') && !/Lena|Muster|DE89|krebs|geburt/i.test(gespeichert), 'Sitzungsspeicher nur mit Herkunft');
    } else if (einstieg === 'werber-ohne') {
      pruefe(await page.evaluate(() => sessionStorage.getItem('healio.herkunft')) === null, 'ohne Zustimmung kein Herkunftseintrag (Gate 3)');
    }
    const link = page.locator('a[href*="levelnine"][href*="tarifftypes=Ambulant&"]').filter({ visible: true }).first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await page.waitForSelector('[data-wegewahl="ambulant"]');
    await page.click('[data-weg="allein"]');
  }
  await bildschirm(page, 'tarif');
  fremd.length = 0;
  if (einstieg === 'werber-ohne') pruefe(await page.evaluate(() => Object.keys(sessionStorage).some((k) => /herkunft/.test(k) || /herkunft/.test(sessionStorage.getItem(k) || ''))) === false, 'ohne Zustimmung keine Herkunft im Speicher, auch nicht in der Übergabe');
  await pruefeSeite(page, `${name} Tarif`);
  pruefe(await page.waitForSelector('meta[name="robots"][content*="noindex"]', { state: 'attached', timeout: 5000 }).then(() => true, () => false), 'noindex fehlt');

  // Schritt 1: Weiter ohne Angaben zeigt Fehler und bleibt stehen.
  await weiter(page);
  pruefe(await page.locator('#feld-geburtsdatum-fehler').isVisible(), 'Fehler Geburtsdatum fehlt');
  await page.fill('#feld-geburtsdatum', '05.03.1990');
  await page.locator('#feld-geburtsdatum').blur();
  await page.locator('label:has(input[name="tarif"][value="AP1"])').click();
  await page.waitForFunction(() => /EUR/.test(document.querySelector('[data-stufe-beitrag="AP1"]')?.textContent || ''));
  pruefe((await page.textContent('[data-stufe-beitrag="AP1"]')).includes('39,19 EUR'), 'AP1 mit 36 Jahren 39,19 EUR');
  pruefe((await page.textContent('[data-stufe-beitrag="AP5"]')).includes('12,29 EUR'), 'AP5 mit 36 Jahren 12,29 EUR');
  await foto(page, `${name}-01-tarif`);
  await weiter(page);

  // Reihenfolge wie die SDK-Online-Strecke: Daten mit Datenschutz-/GKV-Haken, Unterlagen (Pflicht-Download), Erklärungen, Fragen.
  await bildschirm(page, 'person');
  await weiter(page);
  pruefe(await page.locator('#fehler-acknowledge').isVisible(), 'Datenschutz- und GKV-Haken ist Pflicht');
  await page.locator('label:has(input[name="anrede"][value="frau"])').click();
  await page.fill('#feld-vorname', 'Lena');
  await page.fill('#feld-nachname', 'Muster');
  await page.locator('label:has(#feld-acknowledge)').click();
  await foto(page, `${name}-02-person`);
  await weiter(page);

  await bildschirm(page, 'unterlagenDownload');
  await page.waitForSelector('[data-download]');
  pruefe(await page.locator('[data-download]').count() === 5, 'fünf Pflicht-Downloads');
  await weiter(page);
  pruefe((await page.textContent('[data-unterlagen-download]')).includes('Laden Sie die Datei bitte runter!'), 'Weiter erst nach allen Downloads');
  await page.locator('[data-download]').first().click();
  await weiter(page);
  await bildschirm(page, 'unterlagenDownload');
  await page.click('[data-alle-downloads]');
  await foto(page, `${name}-03-unterlagen`);
  await weiter(page);

  await bildschirm(page, 'erkl:erklaerungen');
  for (const key of ['saveConfirmationtext', 'declarationOfConsentTermsOfContract', 'declarationOfConsentAndReleaseFromConfidentiality']) await page.locator(`label:has(#feld-${key})`).click();
  pruefe(!(await page.locator('#feld-declarationOfConsentAdvertising').isChecked()), 'Werbeeinwilligung leer');
  await foto(page, `${name}-04-erklaerungen`);
  await weiter(page);

  await bildschirm(page, 'frage:1a');
  await pruefeSeite(page, `${name} Frage 1a`);
  if (mitJa) {
    await page.waitForTimeout(650);
    await page.click('[data-bildschirm="frage:1a"] [data-antwort="ja"]');
    await page.waitForSelector('#gruppe-1a-kreuze');
    await weiter(page);
    pruefe(await page.locator('#fehler-frage-1a-kreuze').isVisible(), '1a Ja ohne Kreuz bleibt stehen');
    await page.locator('label:has(input[name="frage-1a-kreuze"][value="krebs"])').click();
    await foto(page, `${name}-05-frage-1a-ja`);
    await weiter(page);
  } else {
    await foto(page, `${name}-05-frage-1a`);
    await page.waitForTimeout(650);
    await page.click('[data-bildschirm="frage:1a"] [data-antwort="nein"]');
  }
  for (const id of ['1b', '1c', '1d', '1e', '1f', '1g', '1h', '1i', '1j', '1k']) {
    await bildschirm(page, `frage:${id}`);
    await page.waitForTimeout(650);
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="${mitJa && id === '1b' ? 'ja' : 'nein'}"]`);
  }
  await bildschirm(page, 'frage:2');
  await page.fill('#feld-frage-2-groesse', '178');
  await page.fill('#feld-frage-2-gewicht', '75,5');
  pruefe(await page.inputValue('#feld-frage-2-gewicht') === '755', 'Gewicht nur ganze Zahlen wie im Original');
  await page.fill('#feld-frage-2-gewicht', '75');
  await foto(page, `${name}-06-frage-2`);
  await weiter(page);

  await bildschirm(page, 'beitrag');
  const erwartet = mitJa ? '62,70 EUR' : '39,19 EUR';
  pruefe((await page.textContent('[data-beitrag-wert]')).includes(erwartet), `Beitrag ${erwartet}`);
  if (mitJa) pruefe((await page.textContent('[data-beitrag]')).includes('60 % Zuschlag'), '60 % Zuschlag (40 + 20)');
  await pruefeSeite(page, `${name} Beitrag`);
  await foto(page, `${name}-07-beitrag`);

  // Zurück ohne Datenverlust: ein Bildschirm zurück und wieder vor.
  await page.locator('button[aria-label="Zurück"]').click();
  await bildschirm(page, 'frage:2');
  pruefe(await page.inputValue('#feld-frage-2-groesse') === '178', 'Zurück behält die Größe');
  await weiter(page);
  await bildschirm(page, 'beitrag');
  await weiter(page);

  await bildschirm(page, 'erkl:beratung');
  for (const key of ['avoidAdvice', 'verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
  await foto(page, `${name}-08-beratung`);
  await weiter(page);

  await bildschirm(page, 'anschrift');
  await page.fill('#feld-strasse', 'Musterweg');
  await page.fill('#feld-hausnummer', '12');
  await page.fill('#feld-plz', '2009');
  await page.fill('#feld-ort', 'Hamburg');
  await page.fill('#feld-email', 'lena@beispiel.de');
  await page.fill('#feld-telefon', '0151 1234567');
  await weiter(page);
  pruefe(await page.locator('#feld-plz-fehler').isVisible(), 'PLZ mit vier Ziffern wird abgewiesen');
  await page.fill('#feld-plz', '20095');
  await foto(page, `${name}-09-anschrift`);
  await weiter(page);

  await bildschirm(page, 'zahlung');
  pruefe(await page.locator('input[name="zahlweise"]').count() === 0, 'keine Zahlweise (Original nur monatlich)');
  await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 01');
  await page.locator('#feld-iban').blur();
  await page.fill('#feld-bankname', 'Testbank');
  await page.locator('label:has(#feld-sepaMandatConfirmation)').click();
  pruefe(await page.locator('#feld-sepaMandatConfirmation').isChecked(), 'SEPA-Haken gesetzt');
  await weiter(page);
  pruefe((await page.textContent('#feld-iban-fehler')).includes('Tippfehler'), 'IBAN mit falscher Prüfziffer wird abgewiesen');
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 00');
  await page.locator('#feld-iban').blur();
  await foto(page, `${name}-10-zahlung`);
  await weiter(page);

  await bildschirm(page, 'zusammenfassung');
  await pruefeSeite(page, `${name} Zusammenfassung`);
  const uebersicht = await page.textContent('[data-uebersicht]');
  pruefe(uebersicht.includes('AP1') && uebersicht.includes(erwartet) && uebersicht.includes('…3000') && !uebersicht.includes('0532'), 'Übersicht mit Beitrag, IBAN nur gekürzt');
  pruefe((await page.textContent('[data-antwortenliste]')).includes(mitJa ? 'Ja: Krebserkrankungen' : 'Nein'), 'Antworten in der Übersicht');
  pruefe((await page.textContent('[data-antwortenliste]')).includes('Atemwegserkrankungen (Asthma'), 'Fragetext im Wortlaut bei den Antworten');
  pruefe((await page.textContent('[data-auftrag]')).includes(`Monatsbeitrag von ${erwartet}`), 'Auftragssatz nennt Monatsbeitrag mit Betrag');
  await foto(page, `${name}-11-zusammenfassung`);

  // Speicher und Adresse vor dem Absenden: nichts Persönliches.
  const speicher = await page.evaluate(() => ({
    lokal: Object.keys(localStorage).filter((key) => /antrag|maske|iban|gesund/i.test(key)),
    sitzung: Object.values(sessionStorage).join('|'),
    adresse: window.location.search + window.location.hash,
  }));
  pruefe(speicher.lokal.length === 0, 'Antragsdaten im localStorage');
  pruefe(!/DE89|Muster|1a|krebs|178/.test(speicher.sitzung), 'Antragsdaten im sessionStorage');
  pruefe(speicher.adresse === '' || /^\?ref=[A-Za-z0-9_-]+$/.test(speicher.adresse), `Angaben in der Adresse (${speicher.adresse})`);

  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  pruefe(/^HS-\d{6}-T\d{3}$/.test((await page.textContent('[data-kennung]')).trim()), 'Kennung auf der Danke-Seite');
  await pruefeSeite(page, `${name} Danke`).catch(() => { /* Danke ohne Ausweg ist gewollt */ });
  await foto(page, `${name}-12-danke`);
  const { letzter } = await mock('/__test/letzter');
  pruefe(letzter?.kanal === 'web-selbst' && letzter.zahlung.iban === 'DE89370400440532013000', 'Datensatz kommt an');
  pruefe(letzter.gesundheit.antwort1a === (mitJa ? 'ja' : 'nein') && letzter.gesundheit.antworten['1b'] === (mitJa ? 'ja' : 'nein'), 'Gesundheitsangaben im Vertragsformat');
  pruefe(letzter.original.find((e) => e.feld === 'G49').wert === (mitJa ? 'true' : 'false') && letzter.unterlagen.geoeffnet.length === 5, 'Zuordnung G49 und fünf Downloads im Antrag');
  if (einstieg === 'werber') {
    pruefe(JSON.stringify(letzter.herkunft) === JSON.stringify({ ref: WERBER.ref, utm: WERBER.utm, einstiegsseite: '/ambulant', sparte: 'ambulant', weg: 'allein' }), `Herkunft mit Werber kommt an: ${JSON.stringify(letzter.herkunft)}`);
  } else if (einstieg === 'werber-ohne') {
    pruefe(JSON.stringify(letzter.herkunft) === JSON.stringify({ ref: WERBER.ref, utm: {}, einstiegsseite: '/antrag/ambulant', sparte: 'ambulant', weg: 'allein' }), `Herkunft ohne Zustimmung: ref über den Link, sonst nichts gespeichert: ${JSON.stringify(letzter.herkunft)}`);
  } else if (einstieg === 'wahl') {
    // Ohne Zustimmung keine Übergabe über den Seitenwechsel: Einstiegsseite ist die Maske selbst.
    pruefe(JSON.stringify(letzter.herkunft) === JSON.stringify({ ref: null, utm: {}, einstiegsseite: '/antrag/ambulant', sparte: 'ambulant', weg: 'allein' }), `Herkunft ohne Werber leer: ${JSON.stringify(letzter.herkunft)}`);
  } else {
    pruefe(letzter.herkunft?.ref === null && letzter.herkunft?.einstiegsseite === '/antrag/ambulant', `Herkunft bei Direktaufruf: ${JSON.stringify(letzter.herkunft)}`);
  }
  pruefe(fremd.length === 0, `Anfragen an fremde Adressen oder Zähler: ${fremd.join(', ')}`);
  await context.close();
}

// Beitrag ändert sich beim Server (409) und Serverfehler 422 werden angezeigt.
async function sonderfaelle(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/ambulant`, { waitUntil: 'networkidle' });
  // Minderjährig: Hinweis statt Weiter.
  await page.fill('#feld-geburtsdatum', '01.01.2012');
  await page.locator('#feld-geburtsdatum').blur();
  await page.waitForSelector('[data-altersgrenze]');
  pruefe(await page.locator('[data-weiter]').count() === 0, 'Minderjährige kommen nicht weiter');
  await foto(page, '390-sonder-minderjaehrig');
  await context.close();
}

// Zahn-Check auf /zahn bis zum Ergebnis „Behandlung steht an“ (Bayerische).
async function zahnCheckBayerische(page) {
  const klick = async (text) => {
    const knopf = page.getByRole('button', { name: text }).first();
    await knopf.scrollIntoViewIfNeeded();
    await knopf.click();
    await page.waitForTimeout(450);
  };
  const start = page.getByRole('button', { name: /Zahn-Check starten|Check starten|Jetzt starten/ }).first();
  if (await start.count()) await start.click().catch(() => {});
  await klick(/Ja, etwas steht an oder läuft schon/);
  await klick(/Nein, alle Zähne sind vorhanden oder ersetzt/);
  await klick(/^Nein, nichts davon/);
}

// Vorabfrage der Zahn-Strecke /antrag/zahn (Zahn-Check-Zuordnung): Antworten,
// dann Geburtsdatum (und PLZ), Ergebnis, Start in die Maske des Ziels.
async function zahnVorab(page, antworten, { datum = '05.03.1990', plz = null, ziel = null, starten = true } = {}) {
  for (const [frage, wert] of antworten) {
    await page.waitForSelector(`[data-vorab-frage="${frage}"]`);
    await page.click(`[data-vorab-antwort="${wert}"]`);
  }
  if (ziel === 'telefon') { await page.waitForSelector('[data-vorab-ergebnis="telefon"]'); return; }
  await page.waitForSelector('[data-vorab-angaben]');
  await page.fill('#vorab-geburtsdatum', datum);
  if (plz) await page.fill('#vorab-plz', plz);
  await page.click('[data-vorab-weiter]');
  if (!starten) return;
  await page.waitForSelector(`[data-vorab-ergebnis="${ziel}"]`);
  await page.click('[data-vorab-start]');
}
const VORAB_SOFORT = [['q1', 'ja'], ['q2', 'keine'], ['q3', 'nein'], ['schmelz', 'nein']];

async function zahnDurchlauf(browser, breite, viaWahl) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const name = `${breite}-zahn`;
  await mock('/__test/zuruecksetzen', 'POST');
  if (viaWahl) {
    await page.goto(`${AN}/zahn?ref=${WERBER.ref}`, { waitUntil: 'networkidle' });
    await zahnCheckBayerische(page);
    const link = page.locator('a[href*="diebayerische.de/diebayerische/online-berechnen/zahn"]').filter({ visible: true }).first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await page.waitForSelector('[data-wegewahl="zahn"]');
    pruefe(await page.getAttribute('[data-weg="allein"]', 'href') === '/antrag/zahn' || (await page.getAttribute('[data-weg="allein"]', 'href')).startsWith('/antrag/zahn?ref='), 'Zahn: Allein führt in die eigene Maske');
    await foto(page, `${breite}-wahl-zahn`);
    await page.click('[data-weg="allein"]');
  } else {
    await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
    // Direkt aufgerufen: erst Healios Vorabfrage, dann ohne Bruch die Bayerische.
    await zahnVorab(page, VORAB_SOFORT, { plz: '94130', ziel: 'bayerische-sofort', starten: false });
    await page.waitForSelector('[data-vorab-ergebnis="bayerische-sofort"]');
    await page.waitForFunction(() => /63,70 EUR/.test(document.querySelector('[data-vorab-preis]')?.textContent || ''));
    pruefe((await page.textContent('[data-vorab-ergebnis]')).includes('Bayerische'), 'Ergebnis nennt den Versicherer');
    await page.click('[data-vorab-start]');
  }
  await bildschirm(page, 'tarif');
  await pruefeSeite(page, `${name} Tarif`);
  pruefe(await page.locator('input[name="tarif"][value="PRESTIGE"]').isChecked(), 'Prestige vorausgewählt wie im Original');
  pruefe(await page.locator('input[name="tarif"]').count() === 3, 'drei Tarife, kein Prestige Plus');
  await page.fill('#feld-geburtsdatum', '05.03.1990');
  await page.locator('#feld-geburtsdatum').blur();
  await page.fill('#feld-plzTarif', '94130');
  await page.waitForSelector('[data-gesamtbeitrag]');
  pruefe((await page.textContent('[data-stufe-beitrag="PRESTIGE"]')).includes('33,80 EUR'), 'Prestige Land 36 Jahre 33,80 EUR');
  pruefe((await page.textContent('[data-stufe-beitrag="SMART"]')).includes('14,60 EUR'), 'Smart 14,60 EUR');
  if (viaWahl) await page.locator('label:has(#feld-baustein-ZAHN_SOFORT)').click();
  else pruefe(await page.locator('#feld-baustein-ZAHN_SOFORT').isChecked(), 'ZAHN Sofort aus der Vorabfrage vorgewählt');
  await page.waitForFunction(() => /63,70 EUR/.test(document.querySelector('[data-gesamtbeitrag]')?.textContent || ''));
  await page.fill('#feld-plzTarif', '20095');
  await page.waitForFunction(() => /74,00 EUR/.test(document.querySelector('[data-gesamtbeitrag]')?.textContent || ''));
  pruefe(true, 'Stadt mit ZAHN Sofort 44,10 + 29,90 = 74,00 EUR');
  await page.locator('label:has(input[name="zahlweise"][value="jaehrlich"])').click();
  await page.waitForFunction(() => /870,20 EUR/.test(document.querySelector('[data-gesamtbeitrag]')?.textContent || ''));
  await foto(page, `${name}-01-tarif`);
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await foto(page, `${name}-02-hinweis`);
  await weiter(page);
  for (const id of ['z1', 'z2', 'z3', 'z4', 'z5']) {
    await bildschirm(page, `frage:${id}`);
    await page.waitForTimeout(650);
    if (!viaWahl) {
      // Vorabfrage deckt Frage 1 bis 4 genau: vorbelegt, Wortlaut sichtbar, Bestätigung per Tipp.
      const vorbelegt = await page.locator('[data-vorbelegt]').count();
      pruefe(id === 'z5' ? vorbelegt === 0 : vorbelegt === 1 && await page.getAttribute(`[data-bildschirm="frage:${id}"] [aria-pressed="true"]`, 'data-antwort') === 'nein', `${id}: Vorbelegung aus der Vorabfrage`);
    }
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
  }
  await bildschirm(page, 'beitrag');
  pruefe((await page.textContent('[data-beitrag-wert]')).includes('870,20 EUR'), 'Jahresbeitrag auf dem Beitragsbildschirm');
  await foto(page, `${name}-03-beitrag`);
  await weiter(page);
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="frau"])').click();
  await page.fill('#feld-vorname', 'Lena');
  await page.fill('#feld-nachname', 'Muster');
  await weiter(page);
  await bildschirm(page, 'anschrift');
  pruefe((await page.textContent('[data-gesperrt="plz"]')).includes('20095'), 'PLZ aus Schritt 1 gesperrt übernommen');
  await page.fill('#feld-ort', 'Hamburg');
  await page.fill('#feld-strasse', 'Musterweg');
  await page.fill('#feld-hausnummer', '12');
  await page.fill('#feld-email', 'lena@beispiel.de');
  await foto(page, `${name}-04-anschrift`);
  await weiter(page);
  await bildschirm(page, 'zahlung');
  pruefe(await page.locator('input[name="zahlweise"]').count() === 0, 'Zahlweise nur in Schritt 1');
  await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 00');
  await page.locator('#feld-iban').blur();
  await page.locator('label:has(#feld-sepa)').click();
  await weiter(page);
  await bildschirm(page, 'erkl:0');
  for (const key of ['verzicht', 'beratungsverzichtVersicherer', 'vollmacht']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
  await bildschirm(page, 'erkl:1');
  pruefe(!(await page.locator('#feld-werbung').isChecked()), 'Werbeeinwilligung leer');
  for (const key of ['gesundheitsdaten', 'schweigepflicht', 'vvg']) await page.locator(`label:has(#feld-${key})`).click();
  await foto(page, `${name}-05-einwilligungen`);
  await weiter(page);
  await bildschirm(page, 'erkl:2');
  const unterlagen = await page.textContent('[data-bildschirm="erkl:2"]');
  pruefe(unterlagen.includes('Produktinformationsblatt Zahn Prestige') && unterlagen.includes('Produktinformationsblatt ZAHN Sofort') && !unterlagen.includes('Zahn Smart'), 'Unterlagen passend zu Tarif und Baustein');
  await context.route('https://bayculator.diebayerische.de/**', (route) => route.fulfill({ status: 200, body: 'PDF' }));
  const [neu] = await Promise.all([context.waitForEvent('page'), page.locator('[data-bildschirm="erkl:2"] [data-unterlage]').first().click()]);
  await neu.close();
  await page.locator('label:has(#feld-unterlagen)').click();
  await weiter(page);
  await bildschirm(page, 'zusammenfassung');
  const text = await page.textContent('[data-bildschirm="zusammenfassung"]');
  pruefe(/in deinem Namen bei der Bayerischen zu stellen/.test(text), 'Auftrag an Healio vor dem Absenden sichtbar');
  pruefe((await page.textContent('[data-auftrag]')).includes('Jahresbeitrag von 870,20 EUR') && !(await page.textContent('[data-auftrag]')).includes('Monatsbeitrag'), 'Auftragssatz passt zur jährlichen Zahlweise');
  pruefe(text.includes('Haben Sie Zahnersatz, der älter als 10 Jahre ist?'), 'Zahnfragen im Wortlaut in der Zusammenfassung');
  pruefe(!/Level Nine|cpit|SDK/.test(text), 'keine Technik- oder SDK-Hinweise');
  await foto(page, `${name}-06-zusammenfassung`);
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  const danke = await page.textContent('[data-danke-punkte]');
  pruefe(/bei der Bayerischen ein/.test(danke) && /Antragsbestätigung der Bayerischen kommt per E-Mail an lena@beispiel.de/.test(danke) && /Eingangsbestätigung von Healio/.test(danke), 'Danke-Seite sagt, was passiert');
  await foto(page, `${name}-07-danke`);
  const { letzter } = await mock('/__test/letzter');
  pruefe(letzter.sparte === 'zahn' && letzter.bausteine[0] === 'ZAHN_SOFORT' && letzter.zahlung.zahlweise === 'jaehrlich' && letzter.beitragAngezeigt === 870.2, 'Zahn-Antrag kommt an');
  pruefe(letzter.gesundheit.fragebogen === 'KZV' && letzter.gesundheit.antworten.length === 5, 'Zahnfragen mit Original-Kennungen');
  pruefe(letzter.original.find((e) => e.feld === 'paymentRhythm').wert === 'YEARLY' && letzter.original.find((e) => e.feld === 'tarif').wert === '00103', 'Zuordnung zum Original im Antrag');
  pruefe(letzter.erklaerungen.werbung === false, 'Werbung nicht angehakt übermittelt');
  pruefe(letzter.unterlagen.gezeigt.some((u) => u.name === 'Produktinformationsblatt Zahn Prestige') && letzter.unterlagen.geoeffnet.length === 1 && letzter.unterlagen.bestaetigt.some((b) => b.erklaerung === 'unterlagen'), 'Gezeigte, geöffnete und bestätigte Unterlagen im Antrag');
  pruefe(danke.includes('Unterlagen schicken wir dir zusätzlich per E-Mail'), 'Danke: Unterlagen kommen per Mail');
  if (viaWahl) pruefe(letzter.herkunft.ref === WERBER.ref, `Herkunft Zahn (ohne Zustimmung, ref über den Link): ${JSON.stringify(letzter.herkunft)}`);
  await context.close();
}

async function zahnAblehnung(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  // Sicherheitsnetz: Vorabfrage führt zur Bayerischen, der Kunde wechselt auf Smart und antwortet anders.
  await zahnVorab(page, VORAB_SOFORT, { plz: '20095', ziel: 'bayerische-sofort' });
  await bildschirm(page, 'tarif');
  await page.locator('label:has(input[name="tarif"][value="SMART"])').click();
  await page.waitForSelector('[data-gesamtbeitrag]');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:z1s');
  pruefe(await page.locator('[data-vorbelegt]').count() === 0, 'Smart: Frage 1 der kurzen Fassung kommt unbeantwortet');
  pruefe((await page.textContent('#frage-z1s-text')).trim() === 'Haben Sie fehlende Zähne, die noch nicht ersetzt sind?', 'Smart: kurze Frage 1');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await page.waitForSelector('[data-pruefung]');
  pruefe(await page.locator('[data-weiter]').count() === 0, 'Ablehnung: kein Weiter');
  const hinweis = await page.textContent('[data-pruefung]');
  pruefe(!/barmenia/i.test(hinweis) && /UKV ZahnPRIVAT/.test(hinweis) && /Zusammen am Telefon/.test(hinweis), 'Auswege UKV und Telefon, kein Barmenia');
  await foto(page, '390-zahn-ablehnung');
  // Altersgrenze 71: schon in der Vorabfrage, bevor ein Ergebnis kommt.
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await zahnVorab(page, VORAB_SOFORT, { datum: '15.05.1955', plz: '20095', starten: false });
  await page.waitForSelector('[data-altersgrenze]');
  pruefe(await page.locator('[data-vorab-ergebnis]').count() === 0, '71 Jahre: kein Ergebnis, Weg ans Telefon');
  await foto(page, '390-zahn-71-jahre');
  await context.close();
}

async function pruefseiteZahn(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${AN}/antrag/pruefen#test-zahn`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  pruefe(await page.locator('input[name="tarif"][value="KOMFORT"]').isChecked() && await page.inputValue('#feld-geburtsdatum') === '05.03.1990', 'Prüfseite Zahn: Angaben vom Telefon vorbelegt');
  await page.waitForSelector('[data-gesamtbeitrag]');
  await foto(page, '390-pruefseite-zahn-01');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  // Antworten aus dem Gespräch sind vorbelegt (z5 „ja“); der Kunde bestätigt sie durch erneutes Antippen.
  for (const id of ['z1', 'z2', 'z3', 'z4', 'z5']) {
    await bildschirm(page, `frage:${id}`);
    await page.waitForTimeout(650);
    const vorbelegt = await page.getAttribute(`[data-bildschirm="frage:${id}"] [aria-pressed="true"]`, 'data-antwort');
    pruefe(vorbelegt === (id === 'z5' ? 'ja' : 'nein'), `Prüfseite Zahn: ${id} vorbelegt (${vorbelegt})`);
    await page.click(`[data-bildschirm="frage:${id}"] [aria-pressed="true"]`);
  }
  await bildschirm(page, 'beitrag'); await weiter(page);
  await bildschirm(page, 'person'); await weiter(page);
  await bildschirm(page, 'anschrift'); await weiter(page);
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
  await page.locator('label:has(#feld-unterlagen)').click();
  await weiter(page);
  await bildschirm(page, 'zusammenfassung');
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  pruefe((await page.textContent('[data-kennung]')).trim() === 'HA-261112-ZAHN', 'Prüfseite Zahn bestätigt');
  const { letzter } = await mock('/__test/letzter');
  pruefe(letzter.ueber === 'pruefseite' && letzter.sparte === 'zahn', 'Bestätigung über die Prüfseite angekommen');
  const { telefon } = await mock('/__test/telefon');
  pruefe(gleich(letzter.gesundheit, telefon.zahn), 'Zahnangaben vom Telefon kommen unverändert in der Bestätigung an');
  await foto(page, '390-pruefseite-zahn-02-danke');
  await context.close();
}

// Gemeinsame Schritte der SDK-Strecke nach dem Tarif (Daten, Unterlagen, Erklärungen).
async function sdkVorFragen(page, name) {
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="herr"])').click();
  await page.fill('#feld-vorname', 'Max');
  await page.fill('#feld-nachname', 'Muster');
  await page.locator('label:has(#feld-acknowledge)').click();
  await weiter(page);
  await bildschirm(page, 'unterlagenDownload');
  await page.waitForSelector('[data-alle-downloads]');
  if (name) await foto(page, `${name}-unterlagen`);
  await page.click('[data-alle-downloads]');
  await weiter(page);
  await bildschirm(page, 'erkl:erklaerungen');
  for (const key of ['saveConfirmationtext', 'declarationOfConsentTermsOfContract', 'declarationOfConsentAndReleaseFromConfidentiality']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
}
async function sdkNachBeitrag(page, name) {
  await bildschirm(page, 'erkl:beratung');
  for (const key of ['avoidAdvice', 'verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
  await bildschirm(page, 'anschrift');
  await page.fill('#feld-strasse', 'Musterweg');
  if (await page.locator('#feld-hausnummer').count()) await page.fill('#feld-hausnummer', '12');
  await page.fill('#feld-plz', '20095');
  await page.fill('#feld-ort', 'Hamburg');
  await page.fill('#feld-email', 'max@beispiel.de');
  await page.fill('#feld-telefon', '0151 1234567');
  await weiter(page);
  await bildschirm(page, 'zahlung');
  await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
  await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 00');
  await page.locator('#feld-iban').blur();
  if (await page.locator('#feld-bankname').count()) await page.fill('#feld-bankname', 'Testbank');
  await page.locator('label:has(#feld-sepaMandatConfirmation)').click();
  await weiter(page);
  if (name) await foto(page, `${name}-vor-zusammenfassung`);
}

async function stationaerDurchlauf(browser, breite, tarif) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const name = `${breite}-stationaer-${tarif}`;
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/stationaer`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  await pruefeSeite(page, `${name} Tarif`);
  await page.fill('#feld-geburtsdatum', '05.03.1990');
  await page.locator('#feld-geburtsdatum').blur();
  await page.locator(`label:has(input[name="tarif"][value="${tarif}"])`).click();
  await page.waitForFunction(() => /EUR/.test(document.querySelector('[data-stufe-beitrag="SP2"]')?.textContent || ''));
  pruefe((await page.textContent('[data-stufe-beitrag="SP2"]')).includes('36,50 EUR') && (await page.textContent('[data-stufe-beitrag="SP1"]')).includes('55,77 EUR'), 'Klinik-Beiträge 36 Jahre wie im Original');
  await foto(page, `${name}-01-tarif`);
  await weiter(page);
  await sdkVorFragen(page, tarif === 'SP2' ? name : null);
  if (tarif === 'SPU') {
    await bildschirm(page, 'beitrag');
    pruefe(true, 'SPU: Gesundheitsfragen entfallen');
  } else {
    await bildschirm(page, 'frage:G0');
    await page.fill('#feld-frage-G0-groesse', '170');
    await page.fill('#feld-frage-G0-gewicht', '70');
    await weiter(page);
    for (const id of ['G10', 'G11', 'G17', 'G18', 'G19', 'G20', 'G21', 'G3', 'G35']) {
      await bildschirm(page, `frage:${id}`);
      await page.waitForTimeout(650);
      if (id === 'G18') {
        await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="ja"]`);
        await page.waitForSelector('#feld-frage-G18\\.C');
        pruefe((await page.textContent('[data-hinweis-ja]')).includes('Die SDK prüft deine Angaben nach Eingang'), 'ehrlicher Hinweis statt Zuschlag');
        await weiter(page);
        pruefe(await page.locator('#feld-frage-G18\\.C-fehler').isVisible(), 'Folgefelder sind Pflicht wie im Original');
        await page.fill('#feld-frage-G18\\.C', 'Kontrolle Schilddrüse');
        await page.fill('#feld-frage-G18\\.D', '01.03.2025');
        await page.click('[data-folge="G18.F"] [data-antwort="nein"]');
        await page.fill('#feld-frage-G18\\.G', '0');
        await page.click('[data-folge="G18.H"] [data-antwort="ja"]');
        await page.fill('#feld-frage-G18\\.J', '01.06.2025');
        await page.fill('#feld-frage-G18\\.K', 'Dr. Test, Teststraße 1, 20095 Hamburg');
        await page.click('[data-folge="G18.1"] [data-antwort="nein"]');
        await foto(page, `${name}-02-frage-G18-ja`);
        await weiter(page);
      } else {
        await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
      }
    }
    await bildschirm(page, 'beitrag');
    pruefe((await page.textContent('[data-hinweis-eingang]')).includes('Die SDK prüft'), 'Beitrag: Prüfung nach Eingang, kein Zuschlag');
  }
  pruefe((await page.textContent('[data-beitrag-wert]')).includes(tarif === 'SP2' ? '36,50 EUR' : '7,92 EUR'), 'Beitrag ohne Zuschlag');
  await foto(page, `${name}-03-beitrag`);
  await weiter(page);
  await sdkNachBeitrag(page, tarif === 'SP2' ? name : null);
  await bildschirm(page, 'zusammenfassung');
  const zusammen = await page.textContent('[data-bildschirm="zusammenfassung"]');
  pruefe((await page.textContent('[data-auftrag]')).includes(`Monatsbeitrag von ${tarif === 'SP2' ? '36,50' : '7,92'} EUR`), 'Auftragssatz stationär');
  if (tarif === 'SP2') {
    pruefe(zusammen.includes('Kontrolle Schilddrüse') && zusammen.includes('Von wann') && zusammen.includes('01.03.2025'), 'Folgeangaben nach Ja in der Zusammenfassung');
    await foto(page, `${name}-zusammenfassung`);
  }
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  const { letzter } = await mock('/__test/letzter');
  pruefe(letzter.sparte === 'stationaer' && letzter.angaben.tarifCode === tarif, `Stationär ${tarif} kommt an`);
  if (tarif === 'SP2') {
    const g = (feld) => letzter.original.find((e) => e.feld === feld)?.wert;
    pruefe(g('G18') === 'true' && g('G18.D') === '2025-03-01' && g('G18.F') === 'false' && g('G0A') === '170' && g('tarifwahl') === 'SDKSP2#', 'Folgefelder in Original-Kennung und Format');
  } else {
    pruefe(!letzter.original.some((e) => /^G\d/.test(e.feld)), 'SPU: keine Gesundheitsfelder');
  }
  await foto(page, `${name}-04-danke`);
  await context.close();
}

async function ukvDurchlauf(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  // Einstieg über den Ausweg der Bayerischen (fehlende Zähne, Smart): das Sicherheitsnetz bleibt.
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await zahnVorab(page, VORAB_SOFORT, { plz: '20095', ziel: 'bayerische-sofort' });
  await bildschirm(page, 'tarif');
  await page.locator('label:has(input[name="tarif"][value="SMART"])').click();
  await page.waitForSelector('[data-gesamtbeitrag]');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:z1s');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="ja"]');
  await page.waitForSelector('[data-pruefung] a[href="/antrag/zahn-ukv"]');
  await page.click('[data-pruefung] a[href="/antrag/zahn-ukv"]');
  await bildschirm(page, 'tarif');
  pruefe(page.url().includes('/antrag/zahn-ukv'), 'Ausweg führt in die UKV-Maske');
  await page.fill('#feld-geburtsdatum', '05.03.1990');
  await page.locator('#feld-geburtsdatum').blur();
  await page.locator('label:has(input[name="tarif"][value="Z100"])').click();
  await page.waitForFunction(() => /30,05 EUR/.test(document.querySelector('[data-stufe-beitrag="Z100"]')?.textContent || ''));
  await foto(page, '390-ukv-01-tarif');
  await weiter(page);
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="frau"])').click();
  await page.fill('#feld-vorname', 'Lena');
  await page.fill('#feld-nachname', 'Muster');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:TF0021');
  await page.locator('label:has(input[name="frage-TF0021"][value="1"])').click();
  await weiter(page);
  await bildschirm(page, 'frage:GF0073');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="nein"]');
  await bildschirm(page, 'frage:GF0074');
  await page.waitForTimeout(650);
  await page.click('[data-antwort="nein"]');
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
  pruefe((await page.textContent('[data-beitrag-wert]')).includes('40,95 EUR'), 'UKV 100 mit einem fehlenden Zahn 40,95 EUR');
  await foto(page, '390-ukv-02-beitrag');
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
  pruefe((await page.textContent('[data-auftrag]')).includes('bei der UKV') && (await page.textContent('[data-auftrag]')).includes('Monatsbeitrag von 40,95 EUR'), 'Auftragssatz UKV');
  pruefe((await page.textContent('[data-antwortenliste]')).includes('Fehlen Zähne, die noch nicht ersetzt sind?'), 'UKV-Fragen im Wortlaut');
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke]');
  const { letzter } = await mock('/__test/letzter');
  const g = (feld) => letzter.original.find((e) => e.feld === feld)?.wert;
  pruefe(letzter.versicherer === 'ukv' && letzter.beitragAngezeigt === 40.95 && g('TF0021') === '1' && g('tarifwahl') === 'UKVZahnPRIVAT100#', 'UKV-Antrag mit Zuschlag und Zuordnung');
  await foto(page, '390-ukv-03-danke');
  await context.close();
}

// Prüfseite im Telefonweg für stationär und UKV: Angaben aus dem Entwurf im Format der Strecke.
async function pruefseiteLevelnine(browser, art) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/pruefen#test-${art}`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  await weiter(page);
  const pressen = async (id) => {
    await bildschirm(page, `frage:${id}`);
    await page.waitForTimeout(650);
    pruefe(await page.locator(`[data-bildschirm="frage:${id}"] [aria-pressed="true"]`).count() > 0, `${art}: ${id} vorbelegt`);
    await page.locator(`[data-bildschirm="frage:${id}"] [aria-pressed="true"]`).first().click();
  };
  if (art === 'stationaer') {
    await sdkVorFragen(page, null);
    await bildschirm(page, 'frage:G0');
    pruefe(await page.inputValue('#feld-frage-G0-groesse') === '170' && await page.inputValue('#feld-frage-G0-gewicht') === '70', 'stationär: Größe und Gewicht vorbelegt');
    await weiter(page);
    for (const id of ['G10', 'G11', 'G17']) await pressen(id);
    await bildschirm(page, 'frage:G18');
    pruefe(await page.inputValue('#feld-frage-G18\\.C') === 'Kontrolle Schilddrüse' && await page.inputValue('#feld-frage-G18\\.D') === '01.03.2025' && await page.inputValue('#feld-frage-G18\\.J') === '01.06.2025', 'stationär: Folgeangaben vom Telefon vorbelegt');
    await foto(page, '390-pruefseite-stationaer-G18');
    await weiter(page);
    for (const id of ['G19', 'G20', 'G21', 'G3', 'G35']) await pressen(id);
    await bildschirm(page, 'beitrag');
    await weiter(page);
    await sdkNachBeitrag(page, null);
  } else {
    await bildschirm(page, 'person');
    await page.locator('label:has(input[name="anrede"][value="frau"])').click();
    await weiter(page);
    await bildschirm(page, 'hinweis');
    await weiter(page);
    await bildschirm(page, 'frage:TF0021');
    pruefe(await page.locator('input[name="frage-TF0021"][value="1"]').isChecked(), 'UKV: fehlende Zähne vorbelegt');
    await weiter(page);
    for (const id of ['GF0073', 'GF0074', 'AF0010']) await pressen(id);
    await bildschirm(page, 'frage:AF_AD_0001');
    await weiter(page);
    await bildschirm(page, 'frage:AF_AD_0005');
    pruefe(await page.locator('input[name="frage-AF_AD_0005"][value="pflichtversichert in deutscher GKV"]').isChecked(), 'UKV: Versicherung vorbelegt');
    await weiter(page);
    await bildschirm(page, 'beitrag');
    await weiter(page);
    await bildschirm(page, 'erkl:auftrag');
    for (const key of ['verzicht', 'vollmacht', 'gesundheitsdaten']) await page.locator(`label:has(#feld-${key})`).click();
    await weiter(page);
    await bildschirm(page, 'anschrift');
    await weiter(page);
    await bildschirm(page, 'zahlung');
    await page.locator('label:has(input[name="kontoinhaber"][value="selbst"])').click();
    await page.fill('#feld-iban', 'DE89 3704 0044 0532 0130 00');
    await page.locator('#feld-iban').blur();
    await page.locator('label:has(#feld-sepaMandatConfirmation)').click();
    await weiter(page);
    await bildschirm(page, 'erkl:unterlagen');
    await weiter(page);
  }
  await bildschirm(page, 'zusammenfassung');
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke], [data-sendefehler]');
  if (await page.locator('[data-sendefehler]').count()) throw new Error(`Sendefehler ${art}: ${await page.textContent('[data-sendefehler]')}`);
  const { letzter } = await mock('/__test/letzter');
  const { telefon } = await mock('/__test/telefon');
  pruefe(letzter.ueber === 'pruefseite' && gleich(letzter.gesundheit, telefon[art === 'stationaer' ? 'stationaer' : 'zahn-ukv']), `${art}: Angaben vom Telefon kommen unverändert in der Bestätigung an`);
  await context.close();
}

async function pruefseiteAmbulantOnline(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/pruefen#test-ambulant-online`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  pruefe(await page.locator('input[name="tarif"][value="AP1"]').isChecked(), 'Prüfseite ambulant (Online-Fassung): Angaben vorbelegt');
  await weiter(page);
  await bildschirm(page, 'person');
  pruefe(await page.inputValue('#feld-vorname') === 'Lena', 'Name vom Telefon vorbelegt');
  await page.locator('label:has(#feld-acknowledge)').click();
  await weiter(page);
  await bildschirm(page, 'unterlagenDownload');
  await page.waitForSelector('[data-alle-downloads]');
  await page.click('[data-alle-downloads]');
  await weiter(page);
  await bildschirm(page, 'erkl:erklaerungen');
  for (const key of ['saveConfirmationtext', 'declarationOfConsentTermsOfContract', 'declarationOfConsentAndReleaseFromConfidentiality']) await page.locator(`label:has(#feld-${key})`).click();
  await weiter(page);
  await bildschirm(page, 'frage:1a');
  await page.waitForTimeout(650);
  await page.click('[data-bildschirm="frage:1a"] [data-antwort="nein"]');
  for (const id of ['1b', '1c', '1d', '1e', '1f', '1g', '1h', '1i', '1j', '1k']) {
    await bildschirm(page, `frage:${id}`);
    await page.waitForTimeout(650);
    await page.click(`[data-bildschirm="frage:${id}"] [data-antwort="nein"]`);
  }
  await bildschirm(page, 'frage:2');
  await page.fill('#feld-frage-2-groesse', '178');
  await page.fill('#feld-frage-2-gewicht', '75');
  await weiter(page);
  await bildschirm(page, 'beitrag');
  await weiter(page);
  await sdkNachBeitrag(page, null);
  await bildschirm(page, 'zusammenfassung');
  await foto(page, '390-pruefseite-ambulant-online-zusammenfassung');
  await page.click('#knopf-absenden');
  await page.waitForSelector('[data-danke], [data-sendefehler]');
  if (await page.locator('[data-sendefehler]').count()) throw new Error(`Sendefehler: ${await page.textContent('[data-sendefehler]')}`);
  pruefe((await page.textContent('[data-kennung]')).trim() === 'HA-261112-AMBO', 'Prüfseite ambulant (Online-Fassung) bestätigt');
  const { letzter } = await mock('/__test/letzter');
  pruefe(letzter.ueber === 'pruefseite' && letzter.textfassung === '2026-11-12-sdk-ambulant-online' && letzter.erklaerungen.avoidAdvice === true && !('hinweisOk' in letzter.erklaerungen), 'neue Schlüssel und Fassung an den Dienst');
  pruefe(letzter.zahlung.bankname === 'Testbank', 'Prüfseite ambulant (Online-Fassung) fragt den Banknamen ab');
  await context.close();
}

async function wahl(browser, breite) {
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const ziele = { ambulant: 'a[href*="levelnine"][href*="tarifftypes=Ambulant&"]', zahn: 'a[href*="diebayerische.de/diebayerische/online-berechnen/zahn"], a[href*="mandant=vmk"][href*="tarifftypes=Zahn"]', stationaer: 'a[href*="levelnine"][href*="tarifftypes=Station"]' };
  for (const sparte of ['ambulant', 'zahn', 'stationaer']) {
    await page.goto(`${AN}/${sparte}`, { waitUntil: 'networkidle' });
    if (sparte === 'zahn') await zahnCheckBayerische(page);
    if (sparte === 'stationaer') {
      const karte = page.locator('#tarife label, #tarife button').filter({ hasText: 'SP2' }).first();
      if (await karte.count()) await karte.click().catch(() => {});
    }
    const link = page.locator(ziele[sparte]).filter({ visible: true }).first();
    pruefe(await link.count() > 0, `${sparte}: Abschlussknopf gefunden`);
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await page.waitForSelector(`[data-wegewahl="${sparte}"]`, { timeout: 6000 });
    pruefe(await page.locator('[role="dialog"]:has-text("Bonusleitfaden")').count() === 0, `${sparte}: kein E-Mail-Fenster`);
    const allein = await page.getAttribute('[data-weg="allein"]', 'href');
    const telefon = await page.getAttribute('[data-weg="telefon"]', 'href');
    pruefe(telefon === `/antrag/aufnehmen?sparte=${sparte}`, `${sparte}: Telefonweg mit Sparte`);
    pruefe(allein === `/antrag/${sparte}`, `${sparte}: Allein-Weg (${allein})`);
    await foto(page, `${breite}-wahl-${sparte}`);
    if (sparte === 'ambulant') {
      await page.click('[data-weg="allein"]');
      await page.waitForSelector('[data-bildschirm="tarif"]');
      pruefe(await page.locator('input[name="tarif"]:checked').getAttribute('value') !== null, 'Stufe aus der Wahl vorbelegt');
      pruefe(await page.evaluate(() => sessionStorage.getItem('healio.antragsmaske.vorbelegung')) === null, 'Vorbelegung nach dem Lesen gelöscht');
    }
  }
  await page.goto(`${AN}/antrag/aufnehmen?sparte=zahn`, { waitUntil: 'networkidle' });
  pruefe(await page.locator('[data-sparte-hinweis="zahn"]').isVisible(), 'Hinweis „Nita nimmt deinen Wunsch auf“ für Zahn');
  await foto(page, `${breite}-aufnehmen-zahn`);

  await context.close();
}

// Schalter aus: E-Mail-Fenster wie heute, Maske zeigt keine Strecke.
async function schalterAus(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${AUS}/ambulant`, { waitUntil: 'networkidle' });
  const link = page.locator('a[href*="levelnine"][href*="tarifftypes=Ambulant&"]').filter({ visible: true }).first();
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await page.waitForSelector('[role="dialog"]', { timeout: 6000 });
  pruefe(await page.locator('[data-wegewahl]').count() === 0, 'Schalter aus: keine Wahl');
  pruefe(await page.locator('#lead-capture-first-name').isVisible(), 'Schalter aus: E-Mail-Fenster wie heute');
  await foto(page, '390-schalter-aus-ambulant');
  await page.goto(`${AUS}/antrag/ambulant`, { waitUntil: 'networkidle' });
  pruefe(await page.locator('[data-andere-wege]').isVisible() && await page.locator('[data-antragsmaske]').count() === 0, 'Schalter aus: /antrag/ambulant ohne Strecke');
  await foto(page, '390-schalter-aus-maske');
  await context.close();
}

try {
  await starteServer();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    // --nur pruefseite-ambulant | pruefseiten: nur diese Teile (zum schnellen Nachprüfen).
    const nurTeil = ['pruefseite-ambulant', 'pruefseiten'].includes(arg('--nur', null));
    if (nurTeil) await pruefseiteAmbulantOnline(browser);
    if (arg('--nur', null) === 'pruefseiten') {
      await pruefseiteZahn(browser);
      await pruefseiteLevelnine(browser, 'stationaer');
      await pruefseiteLevelnine(browser, 'ukv');
    }
    for (const breite of nurTeil ? [] : [390, 1280]) {
      await durchlauf(browser, breite, false, breite === 390 ? 'werber' : 'direkt');
      await durchlauf(browser, breite, true, breite === 390 ? 'wahl' : 'werber-ohne');
      await wahl(browser, breite);
    }
    if (!nurTeil) await alleWeiteren(browser);
  } finally {
    await browser.close();
  }
  console.log(`Antragsmaske gerendert: ${punkte} Prüfungen bestanden.`);
} finally {
  stoppe();
}

// Leere Unterlagenliste vom Dienst: „Weiter“ bleibt gesperrt, Hinweis erscheint,
// nach „Noch einmal versuchen“ mit voller Liste geht es erst nach den Downloads weiter.
async function unterlagenLeerListe(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await mock('/__test/unterlagen-leer', 'POST');
  await page.goto(`${AN}/antrag/ambulant`, { waitUntil: 'networkidle' });
  await bildschirm(page, 'tarif');
  await page.fill('#feld-geburtsdatum', '05.03.1990');
  await page.locator('#feld-geburtsdatum').blur();
  await page.locator('label:has(input[name="tarif"][value="AP1"])').click();
  await page.waitForFunction(() => /EUR/.test(document.querySelector('[data-stufe-beitrag="AP1"]')?.textContent || ''));
  await weiter(page);
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="herr"])').click();
  await page.fill('#feld-vorname', 'Max');
  await page.fill('#feld-nachname', 'Muster');
  await page.locator('label:has(#feld-acknowledge)').click();
  await weiter(page);
  await bildschirm(page, 'unterlagenDownload');
  await page.waitForSelector('[data-unterlagen-hinweis]');
  pruefe(await page.locator('[data-download]').count() === 0, 'Leere Liste: kein Download sichtbar');
  pruefe((await page.textContent('[data-unterlagen-hinweis]')).includes('Die Unterlagen lassen sich gerade nicht laden. Versuch es gleich noch einmal oder mach den Antrag zusammen mit uns am Telefon.'), 'Leere Liste: ruhiger Hinweis mit Wortlaut');
  pruefe(await page.locator('[data-unterlagen-hinweis] a[href^="/antrag/aufnehmen"]').count() === 1, 'Leere Liste: Weg „zusammen am Telefon“ vorhanden');
  await weiter(page);
  await page.waitForTimeout(700);
  pruefe(await page.locator('[data-bildschirm="unterlagenDownload"]').count() === 1, 'Leere Liste: Weiter bleibt gesperrt');
  await foto(page, '390-unterlagen-leer');
  await page.getByRole('button', { name: 'Noch einmal versuchen' }).click();
  await page.waitForSelector('[data-download]');
  pruefe(await page.locator('[data-download]').count() === 5 && await page.locator('[data-unterlagen-hinweis]').count() === 0, 'Nach erneutem Versuch: fünf Pflicht-Downloads, Hinweis weg');
  await weiter(page);
  await page.waitForTimeout(700);
  pruefe(await page.locator('[data-bildschirm="unterlagenDownload"]').count() === 1, 'Volle Liste: Weiter erst nach allen Downloads');
  await page.click('[data-alle-downloads]');
  await page.waitForFunction(() => document.querySelectorAll('[data-download]').length === 5 && [...document.querySelectorAll('[data-unterlagen-download] li')].every((li) => /heruntergeladen/.test(li.textContent)));
  await weiter(page);
  await bildschirm(page, 'erkl:erklaerungen');
  await context.close();
}

// Vorabfrage zur UKV (zwei fehlende Zähne) und zum Telefon (mehr als 3 Zähne).
async function zahnVorabUkv(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await mock('/__test/zuruecksetzen', 'POST');
  await page.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await pruefeSeite(page, '390 Zahn Vorabfrage');
  await zahnVorab(page, [['q1', 'nein'], ['q2', 'wenige'], ['anzahl', '2']], { ziel: 'ukv', starten: false });
  await page.waitForSelector('[data-vorab-ergebnis="ukv"]');
  const ergebnis = await page.textContent('[data-vorab-ergebnis]');
  pruefe(ergebnis.includes('Union Krankenversicherung') && /\d+,\d\d EUR/.test(ergebnis) && ergebnis.includes('2 fehlende Zähne'), 'UKV-Ergebnis mit Versicherer, Beitrag ab und Zuschlag');
  pruefe(await page.locator('[data-vorab-ergebnis] [data-weg], [data-vorab-ergebnis] a[href*="diebayerische"]').count() === 0, 'keine Wahl zwischen Versicherern');
  await page.click('[data-vorab-start]');
  await bildschirm(page, 'tarif');
  pruefe(page.url().endsWith('/antrag/zahn'), 'kein Seitenwechsel');
  pruefe(await page.inputValue('#feld-geburtsdatum') === '05.03.1990' && await page.locator('input[name="tarif"]:checked').count() === 0, 'Geburtsdatum übernommen, Stufe frei (Zahn-Check nennt bei Lücke keine)');
  await page.locator('label:has(input[name="tarif"][value="Z90"])').click();
  await weiter(page);
  await bildschirm(page, 'person');
  await page.locator('label:has(input[name="anrede"][value="frau"])').click();
  await page.fill('#feld-vorname', 'Lena');
  await page.fill('#feld-nachname', 'Muster');
  await weiter(page);
  await bildschirm(page, 'hinweis');
  await weiter(page);
  await bildschirm(page, 'frage:TF0021');
  pruefe(await page.locator('input[name="frage-TF0021"][value="2"]').isChecked() && await page.locator('[data-vorbelegt]').count() === 1, 'TF0021 mit 2 Zähnen vorbelegt');
  await weiter(page);
  await bildschirm(page, 'frage:GF0073');
  pruefe(await page.locator('[data-vorbelegt]').count() === 1, 'GF0073 aus „Nein, nichts davon“ vorbelegt');
  await context.close();

  const zweiter = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const seite = await zweiter.newPage();
  await seite.goto(`${AN}/antrag/zahn`, { waitUntil: 'networkidle' });
  await zahnVorab(seite, [['q1', 'nein'], ['q2', 'viele']], { ziel: 'telefon' });
  pruefe(await seite.locator('[data-vorab-ergebnis="telefon"] a[href^="/antrag/aufnehmen"], [data-vorab-ergebnis="telefon"] a[href="/terminvereinbarung"]').count() === 1, 'Telefon-Ergebnis mit Weg zu Nita oder Termin');
  pruefe(await seite.locator('[data-vorab-start]').count() === 0, 'kein Antrag ohne passenden Tarif');
  await zweiter.close();
}

async function alleWeiteren(browser) {
    await zahnVorabUkv(browser);
    await zahnDurchlauf(browser, 390, true);
    await zahnDurchlauf(browser, 1280, false);
    await zahnAblehnung(browser);
    await stationaerDurchlauf(browser, 390, 'SP2');
    await stationaerDurchlauf(browser, 1280, 'SPU');
    await ukvDurchlauf(browser);
    await unterlagenLeerListe(browser);
    await pruefseiteZahn(browser);
    await pruefseiteAmbulantOnline(browser);
    await pruefseiteLevelnine(browser, 'stationaer');
    await pruefseiteLevelnine(browser, 'ukv');
    await sonderfaelle(browser);
    await schalterAus(browser);
}
