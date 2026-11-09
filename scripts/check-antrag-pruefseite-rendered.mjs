// Gerenderte Prüfung der Prüfseite /antrag/pruefen gegen den Nachbau der
// Antrags-API (scripts/antrag-mock-server.mjs), unsichtbar im Headless-Chrome.
// Klickt den ganzen Ablauf bei 390 px und 1280 px durch und prüft die
// Zustände ungültiger Link, schon bestätigt und Netzfehler.
//
// Aufruf: node scripts/check-antrag-pruefseite-rendered.mjs [--fotos <ordner>] [--api-port 8791] [--web-port 3017] [--extern]
//   --extern: Nachbau und Vite laufen schon (sonst startet das Skript beide und beendet sie am Ende).
// Playwright: aus dem Repo, sonst PLAYWRIGHT_PFAD (Standard: Playwright der
// KassenBoost-Website), Browser: installiertes Chrome.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const arg = (name, standard) => {
  const stelle = args.indexOf(name);
  return stelle >= 0 ? args[stelle + 1] : standard;
};
const API_PORT = Number(arg('--api-port', 8791));
const WEB_PORT = Number(arg('--web-port', 3017));
const FOTOS = arg('--fotos', null);
const EXTERN = args.includes('--extern');
const API = `http://127.0.0.1:${API_PORT}`;
const WEB = `http://localhost:${WEB_PORT}`;

const require = createRequire(import.meta.url);
function ladePlaywright() {
  try { return require('playwright'); } catch { /* nicht im Repo */ }
  return require(process.env.PLAYWRIGHT_PFAD || '/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/node_modules/playwright');
}
const { chromium } = ladePlaywright();

let punkte = 0;
const pruefe = (bedingung, text) => {
  assert.ok(bedingung, text);
  punkte += 1;
};

// ---- Server -------------------------------------------------------------------
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
  if (EXTERN) return;
  prozesse.push(spawn(process.execPath, ['scripts/antrag-mock-server.mjs'], {
    cwd: ROOT, env: { ...process.env, ANTRAG_MOCK_PORT: String(API_PORT), ANTRAG_ERLAUBTE_HERKUNFT: `http://localhost:${WEB_PORT},http://127.0.0.1:${WEB_PORT}` }, stdio: 'ignore',
  }));
  prozesse.push(spawn(path.join(ROOT, 'node_modules/.bin/vite'), ['--host', '127.0.0.1', '--port', String(WEB_PORT), '--strictPort'], {
    cwd: ROOT, env: { ...process.env, VITE_ANTRAG_API: `${API}/antrag/api` }, stdio: 'ignore',
  }));
  await warteAuf(`${API}/antrag/gesund`);
  await warteAuf(`${WEB}/antrag/pruefen`);
}
const stoppeServer = () => prozesse.forEach((kind) => { try { kind.kill('SIGTERM'); } catch { /* schon weg */ } });
const mock = (pfad, methode = 'POST') => fetch(`${API}${pfad}`, { method: methode }).then((antwort) => antwort.json());

// ---- Hilfen im Browser ---------------------------------------------------------
async function foto(page, name) {
  if (!FOTOS) return;
  fs.mkdirSync(FOTOS, { recursive: true });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(FOTOS, `${name}.png`), fullPage: true });
}

async function pruefeSeite(page, wo) {
  const breite = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, innen: window.innerWidth }));
  pruefe(breite.scroll <= breite.innen, `${wo}: waagerechtes Scrollen (${breite.scroll} > ${breite.innen})`);
  const stoerer = await page.evaluate(() => document.querySelectorAll('[data-healio-nita], [class*="healio-nita"], [data-healio-whatsapp], a[href*="wa.me"], .healio-consent-surface').length);
  pruefe(stoerer === 0, `${wo}: Nita-Leiste, WhatsApp-Knopf oder Cookie-Hinweis im DOM`);
  const platzhalter = await page.evaluate(() => /Platzhalter|\[Standort\]|\(folgt\)/i.test(document.body.innerText));
  pruefe(!platzhalter, `${wo}: sichtbarer Platzhalter`);
}

const text = (page) => page.evaluate(() => document.body.innerText);
// Kurz warten: Nach jedem Wechsel sperrt die Seite Tipps für 450 ms (Doppeltipp-Schutz).
const weiter = async (page) => { await page.waitForTimeout(500); await page.locator('[data-weiter]').click(); };
async function erwarteText(page, muster, wo) {
  await page.waitForFunction((quelle) => new RegExp(quelle).test(document.body.innerText), muster.source, { timeout: 8000 }).catch(() => {});
  pruefe(muster.test(await text(page)), `${wo}: Text ${muster} fehlt`);
}
async function erwarteFehler(page, wo) {
  await page.waitForTimeout(150);
  const anzahl = await page.locator('p.text-rose-700').count();
  pruefe(anzahl > 0, `${wo}: Fehlertext erwartet`);
}
const h2 = (page) => page.locator('h2').first().innerText();

async function antworte(page, wert) {
  await page.waitForTimeout(650); // Tippsperre nach dem Wechsel
  await page.getByRole('button', { name: wert === 'ja' ? 'Ja' : 'Nein', exact: true }).click();
  await page.waitForTimeout(450);
}

// ---- Ablauf --------------------------------------------------------------------
async function ganzerAblauf(browser, breite) {
  const w = `${breite}px`;
  await mock('/__test/zuruecksetzen');
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const fremd = [];
  page.on('request', (anfrage) => {
    const host = new URL(anfrage.url()).hostname;
    if (!['localhost', '127.0.0.1'].includes(host)) fremd.push(anfrage.url());
  });
  const fehlerImSkript = [];
  page.on('pageerror', (fehler) => fehlerImSkript.push(fehler.message));

  await page.goto(`${WEB}/antrag/pruefen#test-offen`, { waitUntil: 'networkidle' });
  await erwarteText(page, /Stufe und Beginn/, `${w} Teil 1`);
  const stufenOhne = await fetch(`${API}/antrag/api/beitrag`, {
    method: 'POST', headers: { Authorization: 'Bearer test-offen', 'Content-Type': 'application/json' }, body: JSON.stringify({ tarifCode: 'AP1', geburtsdatum: '05.03.1990', beginnIso: (await (await fetch(`${API}/antrag/api/entwurf`, { headers: { Authorization: 'Bearer test-offen' } })).json()).angaben.beginnIso }),
  }).then((antwort) => antwort.json());
  await page.waitForSelector('[data-stufe-beitrag="AP5"]:has-text("EUR")');
  for (const code of ['AP5', 'AP7', 'AP9', 'AP1']) {
    const zelle = await page.locator(`[data-stufe-beitrag="${code}"]`).innerText();
    pruefe(zelle.includes(stufenOhne.alleStufen[code].toFixed(2).replace('.', ',')), `${w}: Beitrag ${code} aus alleStufen`);
  }
  pruefe(await page.locator('input[name="tarif"][value="AP1"]').isChecked(), `${w}: AP1 vorausgewählt`);
  pruefe(await page.locator('input[name="beginnArt"][value="naechstmoeglich"]').isChecked(), `${w}: Beginn nächstmöglich vorausgewählt`);
  await pruefeSeite(page, `${w} 1.1`);
  await foto(page, `${breite}-01-angaben-stufe`);
  await weiter(page);

  await erwarteText(page, /Zu dir/, `${w} Teil 2`);
  pruefe(await page.locator('input[name="anrede"][value="frau"]').isChecked(), `${w}: Anrede vorausgefüllt`);
  pruefe((await page.locator('#feld-vorname').inputValue()) === 'Lena', `${w}: Vorname vorausgefüllt`);
  pruefe((await page.locator('#feld-nachname').inputValue()) === 'Muster', `${w}: Nachname vorausgefüllt`);
  pruefe((await page.locator('#feld-geburtsdatum').inputValue()) === '05.03.1990', `${w}: Geburtsdatum vorausgefüllt`);
  // Pflichtfeld leeren zeigt einen Fehler und hält an.
  await page.locator('#feld-vorname').fill('');
  await weiter(page);
  await erwarteFehler(page, `${w} Vorname leer`);
  pruefe(/Zu dir/.test(await h2(page)), `${w}: bleibt bei leerem Vornamen stehen`);
  await page.locator('#feld-vorname').fill('Lena');
  await pruefeSeite(page, `${w} 1.2`);
  await foto(page, `${breite}-02-angaben-person`);
  await weiter(page);

  await erwarteText(page, /Adresse und Kontakt/, `${w} Teil 3`);
  for (const [id, wert] of [['strasse', 'Musterweg 12'], ['plz', '20095'], ['ort', 'Hamburg'], ['telefon', '+4915112345678'], ['krankenkasse', 'Techniker Krankenkasse']]) {
    pruefe((await page.locator(`#feld-${id}`).inputValue()) === wert, `${w}: ${id} vorausgefüllt`);
  }
  // Abschnitt 10.2: Mail-Adresse nur angezeigt, nicht änderbar.
  pruefe((await page.locator('#feld-email').count()) === 0, `${w}: kein Eingabefeld für die Mail-Adresse`);
  const mailAnzeige = await page.locator('[data-email-anzeige]').innerText();
  pruefe(mailAnzeige.includes('lena@beispiel.de') && mailAnzeige.includes('Andere Adresse? Antworte kurz auf unsere Mail.'), `${w}: Mail-Adresse mit Hinweis angezeigt`);
  // Abschnitt 10.5: Ort nur mit Buchstaben und Zeichen.
  await page.locator('#feld-ort').fill('Hamburg 1');
  await weiter(page);
  await erwarteText(page, /Bitte nur Buchstaben/, `${w} Ort mit Ziffer`);
  pruefe(await page.locator('#feld-gkv').isChecked(), `${w}: gesetzlich versichert vorausgefüllt`);
  await page.locator('#feld-ort').fill('Hamburg-Altona');
  await pruefeSeite(page, `${w} 1.3`);
  await foto(page, `${breite}-03-angaben-adresse`);
  await weiter(page);

  // Hinweis der SDK
  await erwarteText(page, /Hinweis der SDK/, `${w} Hinweis`);
  pruefe(!(await page.locator('#feld-hinweis').isChecked()), `${w}: Hinweis nicht vorausgewählt`);
  await weiter(page);
  await erwarteFehler(page, `${w} Hinweis ohne Haken`);
  await page.locator('#feld-hinweis').check();
  await pruefeSeite(page, `${w} 2.0`);
  await foto(page, `${breite}-04-hinweis`);
  await weiter(page);

  // 1a
  await erwarteText(page, /Frage 1a/, `${w} 1a`);
  pruefe((await page.locator('[aria-pressed="true"]').count()) === 0, `${w}: 1a nichts vorausgewählt`);
  pruefe((await page.locator('[data-telefon]').innerText()) === 'Am Telefon hast du Nein gesagt.', `${w}: Telefonhinweis 1a`);
  await pruefeSeite(page, `${w} 1a`);
  await foto(page, `${breite}-05-frage-1a`);
  await antworte(page, 'nein');

  // 1b bis 1k
  const ids = ['1b', '1c', '1d', '1e', '1f', '1g', '1h', '1i', '1j', '1k'];
  for (const id of ids) {
    await erwarteText(page, new RegExp(`Frage ${id}`), `${w} ${id}`);
    pruefe((await page.locator('[aria-pressed="true"]').count()) === 0, `${w}: ${id} nichts vorausgewählt`);
    const hinweis = await page.locator('[data-telefon]').innerText();
    pruefe(hinweis === (id === '1b' ? 'Am Telefon hast du Ja gesagt.' : 'Am Telefon hast du Nein gesagt.'), `${w}: Telefonhinweis ${id}`);
    if (id === '1b' || id === '1e') { await pruefeSeite(page, `${w} ${id}`); await foto(page, `${breite}-06-frage-${id}`); }
    await antworte(page, 'nein'); // 1b bewusst anders als am Telefon
  }

  // Größe und Gewicht
  await erwarteText(page, /Körpergröße und Körpergewicht/, `${w} Frage 2`);
  pruefe((await page.locator('#feld-groesse').inputValue()) === '' && (await page.locator('#feld-gewicht').inputValue()) === '', `${w}: Größe/Gewicht leer`);
  pruefe(/170 cm und 65 kg/.test(await page.locator('[data-telefon]').innerText()), `${w}: Telefonhinweis Größe`);
  await page.locator('#feld-groesse').fill('170');
  await page.locator('#feld-gewicht').fill('65');
  await pruefeSeite(page, `${w} 2.12`);
  await foto(page, `${breite}-07-groesse-gewicht`);
  await weiter(page);

  // Beitrag: ohne Zuschlag, dann 1b auf Ja ändern
  await page.waitForSelector('[data-beitrag]');
  const ohne = await page.locator('[data-beitrag]').innerText();
  pruefe(ohne.includes('39,19 EUR'), `${w}: Beitrag ohne Zuschlag 39,19 EUR (${ohne})`);
  await pruefeSeite(page, `${w} 3`);
  await foto(page, `${breite}-08-beitrag`);
  await page.getByRole('button', { name: 'Antworten ändern' }).click();
  await page.locator('#aendern-frage-2').click();
  await erwarteText(page, /Frage 1b/, `${w} 1b ändern`);
  await antworte(page, 'ja');
  await page.waitForFunction(() => document.querySelector('[data-beitrag]')?.innerText.includes('47,03'), null, { timeout: 8000 }).catch(() => {});
  const mit = await page.locator('[data-beitrag]').innerText();
  pruefe(mit.includes('47,03 EUR') && mit.includes('20 %'), `${w}: geänderte Antwort ändert den Beitrag (${mit})`);
  await erwarteText(page, /Atemwege und Allergien/, `${w} Zuschlagsgrund`);
  await foto(page, `${breite}-09-beitrag-mit-zuschlag`);
  await weiter(page);

  // 4.1 Beratung und Auftrag: jeder Haken einzeln nötig
  await erwarteText(page, /Beratung und Auftrag/, `${w} 4.1`);
  await weiter(page);
  await erwarteFehler(page, `${w} 4.1 leer`);
  await page.locator('#feld-erkl-verzicht').check();
  await weiter(page);
  pruefe(/Beratung und Auftrag/.test(await h2(page)), `${w}: ohne Vollmacht kein Weiter`);
  await page.locator('#feld-erkl-verzicht').uncheck();
  await page.locator('#feld-erkl-vollmacht').check();
  await weiter(page);
  pruefe(/Beratung und Auftrag/.test(await h2(page)), `${w}: ohne Verzicht kein Weiter`);
  await page.locator('#feld-erkl-verzicht').check();
  await pruefeSeite(page, `${w} 4.1`);
  await foto(page, `${breite}-10-beratung-auftrag`);
  await weiter(page);

  // 4.2 Einwilligungen: Gesundheitsdaten und Wahl I/II nötig, Bonität freiwillig
  await erwarteText(page, /Deine Einwilligungen/, `${w} 4.2`);
  await page.locator('#feld-erkl-gesundheitsdaten').check();
  await weiter(page);
  pruefe(/Deine Einwilligungen/.test(await h2(page)), `${w}: ohne Wahl I/II kein Weiter`);
  await page.locator('#feld-erkl-gesundheitsdaten').uncheck();
  await page.locator('input[name="schweigepflicht"][value="II"]').check();
  await weiter(page);
  pruefe(/Deine Einwilligungen/.test(await h2(page)), `${w}: ohne Gesundheitsdaten kein Weiter`);
  await page.locator('#feld-erkl-gesundheitsdaten').check();
  // Volltext der SDK aufklappbar und wortgleich vorhanden
  await page.getByText('Ganzen Text lesen').nth(1).click();
  await erwarteText(page, /bereits hier \(I\) oder später im Einzelfall \(II\)/, `${w} SDK-Volltext`);
  await pruefeSeite(page, `${w} 4.2`);
  await foto(page, `${breite}-11-einwilligungen`);
  await weiter(page);

  // 4.3 Zahlung
  await erwarteText(page, /Zahlung/, `${w} 4.3`);
  await page.locator('input[name="zahlweise"][value="monatlich"]').check();
  await page.locator('input[name="kontoinhaber"][value="andere"]').check();
  await erwarteText(page, /Das klären wir am besten kurz zusammen/, `${w} Terminweg`);
  pruefe((await page.locator('[data-weiter]').count()) === 0, `${w}: Konto von jemand anderem lässt nicht weiter`);
  await foto(page, `${breite}-12-zahlung-anderes-konto`);
  await page.locator('input[name="kontoinhaber"][value="selbst"]').check();
  await page.locator('#feld-iban').fill('DE89370400440532013001');
  await page.locator('#feld-iban').blur();
  await erwarteText(page, /Tippfehler/, `${w} IBAN falsch`);
  await page.locator('#feld-iban').fill('AT611904300234573201');
  await page.locator('#feld-iban').blur();
  await erwarteText(page, /deutsche IBAN ein/, `${w} IBAN nicht DE`);
  await foto(page, `${breite}-13-zahlung-iban-falsch`);
  await page.locator('#feld-iban').fill('DE89370400440532013000');
  await page.locator('#feld-iban').blur();
  pruefe((await page.locator('#feld-iban').inputValue()) === 'DE89 3704 0044 0532 0130 00', `${w}: IBAN in Vierergruppen`);
  await weiter(page);
  await erwarteFehler(page, `${w} SEPA fehlt`);
  await page.locator('#feld-erkl-sepa').check();
  await pruefeSeite(page, `${w} 4.3`);
  await foto(page, `${breite}-14-zahlung`);
  await weiter(page);

  // 4.4 Prüfen und bestätigen
  await erwarteText(page, /Prüfen und bestätigen/, `${w} 4.4`);
  const pruef = await text(page);
  pruefe(pruef.includes('DE …3000') && !pruef.includes('0532'), `${w}: IBAN in der Übersicht nur mit den letzten vier Stellen`);
  pruefe(pruef.includes('Hamburg-Altona') && pruef.includes('47,03 EUR'), `${w}: Übersicht mit geänderter Angabe und Beitrag`);
  pruefe(await page.locator('a[href="/unterlagen/sdk/SDK-AVB-Teil-I-1.751.pdf"]').count() === 1, `${w}: AVB Teil I verlinkt`);
  const pdf = await fetch(`${WEB}/unterlagen/sdk/SDK-AVB-Teil-II-AP-Tarife-1.753a.pdf`);
  pruefe(pdf.ok && (pdf.headers.get('content-type') || '').includes('pdf'), `${w}: PDF erreichbar`);
  await page.locator('#knopf-beantragen').click();
  await erwarteFehler(page, `${w} Schlusserklärung fehlt`);
  await page.locator('#feld-erkl-schluss').check();
  await pruefeSeite(page, `${w} 4.4`);
  await foto(page, `${breite}-15-pruefen-bestaetigen`);

  if (breite < 600) {
    // 409: Der Dienst rechnet inzwischen anders, die Seite zeigt den neuen Beitrag.
    await mock('/__test/beitrag-aendern');
    await page.locator('#knopf-beantragen').click();
    await page.waitForSelector('[data-beitrag-neu]', { timeout: 8000 });
    pruefe(/48,03 EUR/.test(await page.locator('[data-beitrag-neu]').innerText()), `${w}: neuer Beitrag nach 409 sichtbar`);
    await foto(page, `${breite}-16-beitrag-geaendert`);
  }
  // Speicher: nichts Sensibles
  const speicher = await page.evaluate(() => ({ lokal: JSON.stringify({ ...localStorage }), sitzung: JSON.stringify({ ...sessionStorage }) }));
  pruefe(!/DE89|3704|antwort|1b|groesse|Lena|Muster/i.test(speicher.lokal + speicher.sitzung), `${w}: keine Angaben im Browser-Speicher`);
  pruefe(!/healio\.antrag/.test(speicher.lokal), `${w}: nichts vom Antrag in localStorage`);

  await page.locator('#knopf-beantragen').click();
  await page.waitForSelector('[data-zustand="abschluss"]', { timeout: 8000 });
  await erwarteText(page, /Dein Antrag ist bei uns/, `${w} Abschluss`);
  await erwarteText(page, /So geht es weiter/, `${w} nächste Schritte`);
  await pruefeSeite(page, `${w} Abschluss`);
  await foto(page, `${breite}-17-abschluss`);

  const { letzte } = await mock('/__test/letzte-bestaetigung', 'GET');
  pruefe(letzte && letzte.versand === 'email' && letzte.textfassung === '2026-11-09', `${w}: versand und textfassung nach Vertrag`);
  pruefe(letzte.erklaerungen.schweigepflicht === 'II' && letzte.erklaerungen.bonitaet === false && letzte.erklaerungen.hinweisOk === true && letzte.erklaerungen.sepa === true, `${w}: Erklärungen nach Vertrag`);
  pruefe(letzte.zahlung.kontoinhaber === 'selbst' && letzte.zahlung.zahlweise === 'monatlich', `${w}: Zahlung nach Vertrag`);
  pruefe(letzte.gesundheit.antworten['1b'] === 'ja' && Object.keys(letzte.gesundheit.antworten).length === 10, `${w}: Gesundheit vollständig`);
  pruefe(letzte.angaben.formular.ort === 'Hamburg-Altona' && letzte.angaben.krankenkasse === 'Techniker Krankenkasse', `${w}: geänderte Angaben gesendet`);
  pruefe(letzte.angaben.formular.email === 'lena@beispiel.de', `${w}: Mail-Adresse unverändert aus dem Entwurf`);
  pruefe(letzte.beitragAngezeigt === (breite < 600 ? 48.03 : 47.03), `${w}: beitragAngezeigt (${letzte.beitragAngezeigt})`);

  // Neuladen: schon bestätigt
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-zustand="bestaetigt"]', { timeout: 8000 });
  const nachher = await text(page);
  pruefe(/schon bestätigt/.test(nachher) && nachher.includes(breite < 600 ? '48,03 EUR' : '47,03 EUR') && nachher.includes('DE …3000'), `${w}: nach Neuladen schon bestätigt mit Zusammenfassung`);
  pruefe(!/Frage 1b|Musterweg/.test(nachher), `${w}: Zusammenfassung ohne Gesundheitsangaben und Adresse`);

  pruefe(fremd.length === 0, `${w}: Anfragen an fremde Hosts: ${fremd.join(', ')}`);
  pruefe(fehlerImSkript.length === 0, `${w}: Skriptfehler: ${fehlerImSkript.join(' | ')}`);
  await context.close();
}

async function zustaende(browser, breite) {
  const w = `${breite}px`;
  await mock('/__test/zuruecksetzen');
  const context = await browser.newContext({ viewport: { width: breite, height: breite < 600 ? 844 : 900 } });
  const page = await context.newPage();
  const fremd = [];
  page.on('request', (anfrage) => { if (!['localhost', '127.0.0.1'].includes(new URL(anfrage.url()).hostname)) fremd.push(anfrage.url()); });

  await page.goto(`${WEB}/antrag/pruefen#gibt-es-nicht-123`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-zustand="ungueltig"]');
  pruefe(await page.locator('a[href="/terminvereinbarung"]', { hasText: 'Termin vereinbaren' }).count() === 1, `${w}: ungültig mit Termin-Knopf`);
  pruefe(await page.locator('a[href="/ambulant"]', { hasText: 'stell den Antrag online' }).count() === 1, `${w}: ungültig mit Hinweis auf /ambulant`);
  await pruefeSeite(page, `${w} ungültig`);
  await foto(page, `${breite}-20-link-ungueltig`);

  await page.goto(`${WEB}/antrag/pruefen#test-bestaetigt`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-zustand="bestaetigt"]');
  const b = await text(page);
  pruefe(b.includes('DE …3000') && b.includes('Lena Muster') && b.includes('08.11.2026') && b.includes('AP1') && b.includes('Monatlich'), `${w}: Bestätigungsansicht mit Zusammenfassung und IBAN-Ende`);
  await pruefeSeite(page, `${w} bestätigt`);
  await foto(page, `${breite}-21-schon-bestaetigt`);

  await page.route('**/antrag/api/entwurf', (route) => route.abort());
  await page.goto(`${WEB}/antrag/pruefen#test-offen`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-zustand="netzfehler"]');
  await pruefeSeite(page, `${w} Netzfehler`);
  await foto(page, `${breite}-22-netzfehler`);
  await page.unroute('**/antrag/api/entwurf');
  await mock('/__test/zuruecksetzen');
  await page.getByRole('button', { name: 'Noch einmal versuchen' }).click();
  await erwarteText(page, /Stufe und Beginn/, `${w} nach Netzfehler geladen`);

  await page.goto(`${WEB}/antrag/pruefen`, { waitUntil: 'networkidle' });
  const robots = await page.locator('meta[name="robots"]').last().getAttribute('content');
  pruefe(/noindex/.test(robots) && /nofollow/.test(robots), `${w}: noindex, nofollow`);
  pruefe(fremd.length === 0, `${w}: Zustände ohne fremde Hosts: ${fremd.join(', ')}`);
  await context.close();
}

try {
  await starteServer();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const breite of [390, 1280]) {
      await ganzerAblauf(browser, breite);
      await zustaende(browser, breite);
    }
  } finally {
    await browser.close();
  }
  console.log(`Prüfseite /antrag/pruefen: ${punkte} Prüfpunkte erfüllt (390 px und 1280 px).`);
} catch (fehler) {
  console.error(`Nach ${punkte} Prüfpunkten gescheitert: ${fehler.message}`);
  process.exitCode = 1;
} finally {
  stoppeServer();
}
