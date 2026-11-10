// Gerenderte Prüfung der Seite /antrag/aufnehmen (Antragsgespräch mit Nita, SCHNITTSTELLE.md 11.2) gegen den
// Nachbau des HD-Dienstes (scripts/antrag-gespraech-mock.mjs), unsichtbar im Headless-Chrome bei 390 und 1280 px.
//   Schalter aus: zwei Wege, keine Anfrage an den Dienst, Einstiegsknopf rendert nicht.
//   Schalter an: Einstieg, Knopf erst mit Häkchen, Verbindungsaufbau, Fehler 429 und 503, kein Mikrofon,
//   Gespräch und Festhalten mit Attrappen für RTCPeerConnection und getUserMedia (Ereignisse des Datenkanals
//   werden eingespielt, die Werkzeugaufrufe gehen echt an den Nachbau), Gespräch ohne Festhalten beendet.
//   Überall: kein waagerechtes Scrollen, keine fremden Hosts, keine Nita-Leiste, kein WhatsApp, kein Cookie-Hinweis.
//
// Aufruf: node scripts/check-antrag-aufnehmen-rendered.mjs [--fotos <ordner>] [--api-port 8794] [--web-port 3019]
// (Der Nachbau läuft sonst auf 8793; die Prüfung nimmt 8794, damit sie neben einem offenen Nachbau laufen kann.)
// Playwright: aus dem Repo, sonst PLAYWRIGHT_PFAD (Standard: Playwright der KassenBoost-Website), Browser: installiertes Chrome.
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
const API_PORT = Number(arg('--api-port', 8794));
const WEB_PORT = Number(arg('--web-port', 3019));
const FOTOS = arg('--fotos', null);
const API = `http://127.0.0.1:${API_PORT}`;
const WEB = `http://127.0.0.1:${WEB_PORT}`;
const SEITE = `${WEB}/antrag/aufnehmen`;
const BREITEN = [390, 1280];

const require = createRequire(import.meta.url);
function ladePlaywright() {
  try { return require('playwright'); } catch { /* nicht im Repo */ }
  return require(process.env.PLAYWRIGHT_PFAD || '/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/node_modules/playwright');
}
const { chromium } = ladePlaywright();

let punkte = 0;
const pruefe = (bedingung, text) => { assert.ok(bedingung, text); punkte += 1; };

// ---- Server -------------------------------------------------------------------------------------------
let mockProzess = null;
let viteProzess = null;
async function warteAuf(url, ms = 60000) {
  const ende = Date.now() + ms;
  while (Date.now() < ende) {
    try { const antwort = await fetch(url); if (antwort.status < 500) return; } catch { /* noch nicht da */ }
    await new Promise((fertig) => { setTimeout(fertig, 300); });
  }
  throw new Error(`Server antwortet nicht: ${url}`);
}
async function starteMock() {
  mockProzess = spawn(process.execPath, ['scripts/antrag-gespraech-mock.mjs'], {
    cwd: ROOT, env: { ...process.env, ANTRAG_GESPRAECH_MOCK_PORT: String(API_PORT), ANTRAG_GESPRAECH_MOCK_HERKUNFT: WEB }, stdio: 'ignore',
  });
  await warteAuf(`${API}/gesund`);
  const kennung = await fetch(`${API}/gesund`).then((antwort) => antwort.json()).catch(() => ({}));
  if (kennung.dienst !== 'antrag-gespraech-mock') throw new Error(`Port ${API_PORT} ist belegt (kein Nachbau). Anderen Port mit --api-port wählen.`);
}
async function starteVite(schalter) {
  const env = { ...process.env, VITE_ANTRAG_GESPRAECH_API: `${API}/nita/antrag` };
  delete env.VITE_ANTRAG_GESPRAECH;
  if (schalter) env.VITE_ANTRAG_GESPRAECH = '1';
  viteProzess = spawn(path.join(ROOT, 'node_modules/.bin/vite'), ['--host', '127.0.0.1', '--port', String(WEB_PORT), '--strictPort'], { cwd: ROOT, env, stdio: 'ignore' });
  await warteAuf(SEITE);
}
async function stoppeVite() {
  if (!viteProzess) return;
  const prozess = viteProzess;
  viteProzess = null;
  await new Promise((fertig) => { prozess.once('exit', fertig); prozess.kill('SIGTERM'); setTimeout(fertig, 3000); });
}
const stoppeAlles = async () => { await stoppeVite(); try { mockProzess?.kill('SIGTERM'); } catch { /* schon weg */ } };
const mock = (pfad, methode = 'POST') => fetch(`${API}${pfad}`, { method: methode }).then((antwort) => antwort.json());

// ---- Hilfen im Browser ----------------------------------------------------------------------------------
async function foto(page, name) {
  if (!FOTOS) return;
  fs.mkdirSync(FOTOS, { recursive: true });
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(FOTOS, `${name}.png`), fullPage: true, animations: 'disabled' });
}
const text = (page) => page.evaluate(() => document.body.innerText);
async function erwarteText(page, muster, wo) {
  await page.waitForFunction((quelle) => new RegExp(quelle).test(document.body.innerText), muster.source, { timeout: 8000 }).catch(() => {});
  pruefe(muster.test(await text(page)), `${wo}: Text ${muster} fehlt`);
}
async function pruefeSeite(page, wo) {
  const breite = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, innen: window.innerWidth }));
  pruefe(breite.scroll <= breite.innen, `${wo}: waagerechtes Scrollen (${breite.scroll} > ${breite.innen})`);
  const stoerer = await page.evaluate(() => document.querySelectorAll('[data-healio-nita], [class*="healio-nita"], [data-healio-whatsapp], a[href*="wa.me"], .healio-consent-surface').length);
  pruefe(stoerer === 0, `${wo}: Nita-Leiste, WhatsApp-Knopf oder Cookie-Hinweis im DOM`);
  const sichtbar = await text(page);
  pruefe(!/Platzhalter|\[Standort\]|\(folgt\)/i.test(sichtbar), `${wo}: sichtbarer Platzhalter`);
  pruefe(!/ – | — /.test(sichtbar), `${wo}: Gedankenstrich im sichtbaren Text`);
  pruefe(!/keine Gesundheitsfragen/i.test(sichtbar), `${wo}: „keine Gesundheitsfragen“`);
  const pruef = await page.evaluate(() => ({ links: document.querySelectorAll('a[href*="/antrag/pruefen"]').length, text: /antrag\/pruefen|#nachbau/.test(document.body.innerHTML) }));
  pruefe(pruef.links === 0 && !pruef.text, `${wo}: Prüflink auf der Seite`);
  const robots = await page.evaluate(() => document.querySelector('meta[name="robots"]')?.getAttribute('content') || '');
  pruefe(/noindex/.test(robots) && /nofollow/.test(robots), `${wo}: robots noindex, nofollow fehlt (${robots})`);
  const speicher = await page.evaluate(() => {
    const schluessel = [];
    for (let i = 0; i < localStorage.length; i += 1) schluessel.push(localStorage.key(i));
    for (let i = 0; i < sessionStorage.length; i += 1) schluessel.push(sessionStorage.key(i));
    return schluessel.filter((k) => /antrag|nita|gespraech|zustimmung/i.test(k));
  });
  pruefe(speicher.length === 0, `${wo}: Speicher im Browser (${speicher.join(', ')})`);
}
async function neueSeite(browser, breite, { attrappen = false, mikrofon = true } = {}) {
  const context = await browser.newContext({
    viewport: { width: breite, height: breite < 600 ? 844 : 900 }, deviceScaleFactor: 1, permissions: mikrofon ? ['microphone'] : [],
  });
  if (attrappen) await context.addInitScript(ATTRAPPEN);
  const page = await context.newPage();
  const fremd = [];
  const dienst = [];
  page.on('request', (anfrage) => {
    const url = new URL(anfrage.url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) fremd.push(anfrage.url());
    if (url.port === String(API_PORT)) dienst.push(`${anfrage.method()} ${url.pathname}`);
  });
  const skriptFehler = [];
  page.on('pageerror', (fehler) => skriptFehler.push(fehler.message));
  const konsole = [];
  page.on('console', (nachricht) => { if (['log', 'info', 'debug'].includes(nachricht.type())) konsole.push(nachricht.text()); });
  return { context, page, fremd, dienst, skriptFehler, konsole };
}
async function schliesse(sitzung, wo) {
  pruefe(sitzung.fremd.length === 0, `${wo}: Anfrage an fremde Hosts: ${sitzung.fremd.join(', ')}`);
  pruefe(sitzung.skriptFehler.length === 0, `${wo}: Skriptfehler: ${sitzung.skriptFehler.join(' | ')}`);
  await sitzung.context.close();
}
async function knopfProbe(page) {
  return page.evaluate(async () => {
    const modul = await import('/scripts/lib/antrag-knopf-probe.jsx');
    const ziel = document.createElement('div');
    ziel.id = 'knopf-probe';
    document.body.append(ziel);
    modul.zeigeKnopf(ziel);
    await new Promise((fertig) => { setTimeout(fertig, 300); });
    const link = ziel.querySelector('a');
    const ergebnis = link ? { href: link.getAttribute('href'), text: link.innerText.trim() } : null;
    ziel.remove();
    return ergebnis;
  });
}
async function startenMitHaken(page) {
  await page.locator('#feld-zustimmung').check();
  await page.locator('[data-start]').click();
}

// Attrappen für den Gesprächszustand: getUserMedia und RTCPeerConnection. Der Datenkanal liegt unter
// window.__nita.kanal, gesendete Befehle unter window.__nita.gesendet. fetch bleibt echt (geht an den Nachbau).
const ATTRAPPEN = `(() => {
  const nita = { gesendet: [], kanal: null, mikroAus: false, geschlossen: false, antwortSdp: null };
  window.__nita = nita;
  nita.schicke = (daten) => nita.kanal && nita.kanal.onmessage && nita.kanal.onmessage({ data: JSON.stringify(daten) });
  if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = async () => ({ getTracks: () => [{ stop() { nita.mikroAus = true; } }] });
  window.RTCPeerConnection = class {
    constructor() { this.iceGatheringState = 'complete'; this.connectionState = 'new'; this.localDescription = null; }
    addTrack() {}
    addEventListener() {}
    removeEventListener() {}
    createDataChannel() {
      const kanal = { readyState: 'connecting', onmessage: null, onopen: null, send: (t) => nita.gesendet.push(JSON.parse(t)) };
      this.kanal = kanal; nita.kanal = kanal; return kanal;
    }
    async createOffer() { return { type: 'offer', sdp: 'v=0\\r\\no=- 1 2 IN IP4 127.0.0.1\\r\\ns=-\\r\\nt=0 0\\r\\nm=audio 9 UDP/TLS/RTP/SAVPF 111\\r\\n' }; }
    async setLocalDescription(d) { this.localDescription = d; }
    async setRemoteDescription(d) { nita.antwortSdp = d.sdp; this.kanal.readyState = 'open'; if (this.kanal.onopen) this.kanal.onopen(); }
    close() { nita.geschlossen = true; if (this.kanal) this.kanal.readyState = 'closed'; }
  };
})();`;

const schicke = (page, daten) => page.evaluate((d) => window.__nita.schicke(d), daten);
async function rueckfrage(page, id, aufrufe) {
  await schicke(page, { type: 'response.event', delegation_id: id, event: { type: 'response.created' } });
  for (const [callId, name, werte] of aufrufe) {
    await schicke(page, {
      type: 'response.event', delegation_id: id, event: { type: 'response.output_item.done', item: { type: 'function_call', call_id: callId, name, arguments: JSON.stringify(werte) } },
    });
  }
  await schicke(page, { type: 'response.event', delegation_id: id, event: { type: 'response.completed' } });
}
const gesendet = (page) => page.evaluate(() => window.__nita.gesendet);
const FESTHALTEN = {
  tarif_code: 'AP1', beginn: '2026-12-01', anrede: 'frau', vorname: 'Lena', nachname: 'Muster', geburtsdatum: '05.03.1990', strasse_hausnummer: 'Musterweg 12', plz: '20095', ort: 'Hamburg', telefon: '+4915112345678', email: 'lena@beispiel.de', gesetzlich_versichert: true,
};

async function bisGespraech(page, wo) {
  await page.waitForSelector('[data-zustand="gespraech"]', { timeout: 8000 });
  pruefe(true, `${wo}: Gespräch läuft`);
}

// ---- Abläufe ------------------------------------------------------------------------------------------
async function schalterAus(browser, breite) {
  const w = `${breite}px aus`;
  const s = await neueSeite(browser, breite);
  await s.page.goto(SEITE, { waitUntil: 'networkidle' });
  await erwarteText(s.page, /zwei einfache Wege/, w);
  pruefe(await s.page.locator('a[href="/ambulant"]').count() >= 1, `${w}: Weg online fehlt`);
  pruefe(await s.page.locator('a[href="/terminvereinbarung"]').count() >= 1, `${w}: Weg Termin fehlt`);
  pruefe(await s.page.locator('[data-start]').count() === 0, `${w}: Gesprächsknopf trotz Schalter aus`);
  await pruefeSeite(s.page, w);
  await foto(s.page, `${breite}-00-schalter-aus`);
  const knopf = await knopfProbe(s.page);
  pruefe(knopf === null, `${w}: Einstiegsknopf rendert trotz Schalter aus`);
  await s.page.waitForTimeout(300);
  pruefe(s.dienst.length === 0, `${w}: Anfrage an den Dienst (${s.dienst.join(', ')})`);
  await schliesse(s, w);
}

async function einstiegUndFehler(browser, breite) {
  const w = `${breite}px`;
  // Einstieg, Häkchen, Knopf
  let s = await neueSeite(browser, breite);
  await s.page.goto(SEITE, { waitUntil: 'networkidle' });
  await erwarteText(s.page, /Deinen Antrag gemeinsam mit Nita aufnehmen/, `${w} Einstieg`);
  const sichtbar = await text(s.page);
  for (const muster of [/Nita ist eine KI/, /fünf bis zehn Minuten/, /bekommst du eine Mail/, /Vorher ist nichts abgeschlossen/, /Halte bereit/, /Geburtsdatum/, /Adresse/, /Mail-Adresse/, /Krankenkasse/,
    /Deine IBAN brauchst du erst später auf der Prüfseite, nie am Telefon/, /Für das Gespräch wird mein Ton an OpenAI übertragen und dort verarbeitet\./, /Mehr dazu in der Datenschutzerklärung/, /Kopfhörer verhindern Echo/]) {
    pruefe(muster.test(sichtbar), `${w} Einstieg: ${muster} fehlt`);
  }
  pruefe(await s.page.locator('a[href="/datenschutz"]').count() >= 1, `${w}: Link Datenschutz fehlt`);
  pruefe(!(await s.page.locator('#feld-zustimmung').isChecked()), `${w}: Häkchen vorausgewählt`);
  pruefe(await s.page.locator('[data-start]').isDisabled(), `${w}: Knopf ohne Häkchen aktiv`);
  await pruefeSeite(s.page, `${w} Einstieg`);
  await foto(s.page, `${breite}-01-einstieg`);
  await s.page.locator('#feld-zustimmung').check();
  pruefe(await s.page.locator('[data-start]').isEnabled(), `${w}: Knopf mit Häkchen nicht aktiv`);
  await foto(s.page, `${breite}-02-einstieg-haekchen`);
  const knopf = await knopfProbe(s.page);
  pruefe(knopf && knopf.href === '/antrag/aufnehmen' && knopf.text === 'Antrag gemeinsam aufnehmen', `${w}: Einstiegsknopf mit Schalter falsch (${JSON.stringify(knopf)})`);
  pruefe(s.dienst.length === 0, `${w}: Anfrage an den Dienst vor dem Start`);

  // Verbindung wird aufgebaut (Nachbau antwortet verzögert), dann Abbrechen
  await mock('/__test/zuruecksetzen');
  await mock('/__test/verzoegerung/4000');
  await s.page.locator('[data-start]').click();
  await erwarteText(s.page, /Verbindung wird aufgebaut/, `${w} Aufbau`);
  await s.page.waitForFunction(() => /gleich ist Nita für dich da/.test(document.body.innerText), null, { timeout: 4000 }).catch(() => {});
  await pruefeSeite(s.page, `${w} Aufbau`);
  await foto(s.page, `${breite}-03-verbindung`);
  await s.page.getByRole('button', { name: 'Abbrechen' }).click();
  await erwarteText(s.page, /Es ist nichts gespeichert/, `${w} Abbrechen`);
  await mock('/__test/verzoegerung/0');

  // 429 Tagesgrenze
  await mock('/__test/session-fehler/429');
  await s.page.locator('[data-nochmal]').click();
  await erwarteText(s.page, /Heute sind keine Gespräche mehr frei/, `${w} 429`);
  pruefe(await s.page.locator('[data-andere-wege] a[href="/ambulant"]').count() === 1 && await s.page.locator('[data-andere-wege] a[href="/terminvereinbarung"]').count() === 1, `${w} 429: zwei Wege fehlen`);
  pruefe(s.dienst.some((a) => a === 'POST /nita/antrag/session'), `${w}: Anfrage an /session fehlt`);
  await pruefeSeite(s.page, `${w} 429`);
  await foto(s.page, `${breite}-04-fehler-429`);
  await schliesse(s, `${w} 429`);

  // 503 Dienst nicht erreichbar
  s = await neueSeite(browser, breite);
  await mock('/__test/session-fehler/503');
  await s.page.goto(SEITE, { waitUntil: 'networkidle' });
  await startenMitHaken(s.page);
  await erwarteText(s.page, /Nita ist gerade nicht erreichbar/, `${w} 503`);
  pruefe(await s.page.locator('[data-nochmal]').count() === 1, `${w} 503: Noch einmal fehlt`);
  pruefe(await s.page.locator('[data-andere-wege] a').count() === 2, `${w} 503: zwei Wege fehlen`);
  await pruefeSeite(s.page, `${w} 503`);
  await foto(s.page, `${breite}-05-fehler-503`);
  await schliesse(s, `${w} 503`);
  await mock('/__test/zuruecksetzen');
}

async function keinMikrofon(browserOhne, breite) {
  const w = `${breite}px ohne Mikrofon`;
  const s = await neueSeite(browserOhne, breite, { mikrofon: false });
  await s.page.goto(SEITE, { waitUntil: 'networkidle' });
  await startenMitHaken(s.page);
  await erwarteText(s.page, /Ohne Mikrofon geht es leider nicht/, w);
  pruefe(await s.page.locator('[data-andere-wege] a').count() === 2, `${w}: zwei Wege fehlen`);
  pruefe(s.dienst.length === 0, `${w}: Anfrage an den Dienst ohne Mikrofon`);
  await pruefeSeite(s.page, w);
  await foto(s.page, `${breite}-06-kein-mikrofon`);
  await schliesse(s, w);
}

async function gespraechMitAttrappen(browser, breite) {
  const w = `${breite}px Gespräch`;
  await mock('/__test/zuruecksetzen');
  await mock('/__test/prueflink/an');
  let s = await neueSeite(browser, breite, { attrappen: true });
  await s.page.goto(SEITE, { waitUntil: 'networkidle' });
  await startenMitHaken(s.page);
  await bisGespraech(s.page, w);
  await erwarteText(s.page, /Nita meldet sich gleich/, `${w} vor session.started`);
  pruefe(/^v=0/.test(await s.page.evaluate(() => window.__nita.antwortSdp || '')), `${w}: SDP-Antwort des Nachbaus nicht gesetzt`);
  await schicke(s.page, { type: 'session.started', session: { id: 'sess_nachbau' } });
  await erwarteText(s.page, /Nita hört zu/, `${w} verbunden`);
  pruefe((await gesendet(s.page)).some((b) => b.type === 'session.instructions.append'), `${w}: Begrüßung nicht angestoßen`);
  await s.page.waitForTimeout(1200);
  pruefe(/^\d\d:\d\d$/.test((await s.page.locator('[data-uhr]').innerText()).replace('Gesprächsdauer', '').trim()), `${w}: Uhr fehlt`);
  pruefe(await s.page.locator('[data-beitrag]').count() === 0, `${w}: Beitrag vor der Rechnung`);
  await pruefeSeite(s.page, `${w} läuft`);
  await foto(s.page, `${breite}-07-gespraech`);

  // Beitrag rechnen: Weitergabe an den Nachbau mit Karte, Ergebnis an das Modell, Anzeige auf der Seite
  await rueckfrage(s.page, 'd1', [['call_beitrag', 'antrag_beitrag_berechnen', { tarif_code: 'AP1', geburtsdatum: '05.03.1990' }]]);
  await erwarteText(s.page, /Dein Beitrag: 47,03 EUR im Monat/, `${w} Beitrag`);
  let befehle = await gesendet(s.page);
  const ausgabe = befehle.find((b) => b.type === 'response.item.create' && b.item?.call_id === 'call_beitrag');
  pruefe(ausgabe && JSON.parse(ausgabe.item.output).ok === true && /siebenundvierzig/.test(JSON.parse(ausgabe.item.output).ansage), `${w}: function_call_output fehlt`);
  pruefe(befehle.at(-1).type === 'response.create', `${w}: response.create fehlt`);
  let zaehler = await mock('/__test/zaehler', 'GET');
  pruefe(zaehler.letzteWerkzeuge.at(-1)?.name === 'antrag_beitrag_berechnen' && zaehler.letzteWerkzeuge.at(-1)?.karteOk === true, `${w}: Werkzeug ohne gültige Karte`);
  await pruefeSeite(s.page, `${w} Beitrag`);
  await foto(s.page, `${breite}-08-gespraech-beitrag`);

  // Festhalten während das Gespräch läuft (Nachbau schmuggelt einen Prüflink in seite, die Seite zeigt ihn nie)
  await rueckfrage(s.page, 'd2', [['call_fest', 'antrag_festhalten', FESTHALTEN]]);
  await erwarteText(s.page, /Deine Mail ist unterwegs/, `${w} Festhalten`);
  const t = await text(s.page);
  pruefe(/Antrag prüfen und bestätigen/.test(t) && /Der Link gilt 7 Tage/.test(t), `${w}: Hinweis auf den Knopf in der Mail fehlt`);
  pruefe(/Das Gespräch läuft noch/.test(t), `${w}: laufendes Gespräch nicht angezeigt`);
  befehle = await gesendet(s.page);
  const fest = befehle.find((b) => b.type === 'response.item.create' && b.item?.call_id === 'call_fest');
  pruefe(fest && !/pruef/i.test(fest.item.output), `${w}: Ausgabe an das Modell fehlt oder trägt einen Prüflink`);
  await pruefeSeite(s.page, `${w} festgehalten`);
  await foto(s.page, `${breite}-09-mail-unterwegs-gespraech-laeuft`);

  // Beenden
  await s.page.locator('[data-beenden]').click();
  await s.page.waitForFunction(() => !document.querySelector('[data-laeuft-noch]'), null, { timeout: 4000 });
  befehle = await gesendet(s.page);
  pruefe(befehle.at(-1).type === 'session.close', `${w}: session.close fehlt`);
  pruefe(await s.page.evaluate(() => window.__nita.mikroAus), `${w}: Mikrofon nach dem Beenden noch an`);
  await erwarteText(s.page, /Deine Mail ist unterwegs/, `${w} nach dem Beenden`);
  await schicke(s.page, { type: 'session.closed' });
  pruefe(await s.page.evaluate(() => window.__nita.geschlossen), `${w}: Verbindung nicht geschlossen`);
  await pruefeSeite(s.page, `${w} beendet mit Mail`);
  await foto(s.page, `${breite}-10-mail-unterwegs`);
  // Vite und React melden sich im Entwicklungsmodus selbst; verboten sind Inhalte des Gesprächs.
  const inhalte = s.konsole.filter((zeile) => /Lena|Muster|05\.03\.1990|beispiel\.de|20095|47[.,]03|antrag_|karte|sess_/i.test(zeile));
  pruefe(inhalte.length === 0, `${w}: Inhalte in der Konsole: ${inhalte.join(' | ')}`);
  await schliesse(s, w);

  // Mail ging nicht raus, Testbetrieb (datei)
  for (const [modus, muster, nr] of [['fehler', /Die Mail ging gerade nicht raus, wir schicken dir den Link\./, '11'], ['datei', /Dein Antrag ist festgehalten/, '12']]) {
    await mock('/__test/zuruecksetzen');
    await mock(`/__test/mail/${modus}`);
    s = await neueSeite(browser, breite, { attrappen: true });
    await s.page.goto(SEITE, { waitUntil: 'networkidle' });
    await startenMitHaken(s.page);
    await bisGespraech(s.page, `${w} ${modus}`);
    await schicke(s.page, { type: 'session.started', session: { id: 'sess_nachbau' } });
    await rueckfrage(s.page, 'd1', [['call_fest', 'antrag_festhalten', FESTHALTEN]]);
    await erwarteText(s.page, muster, `${w} Mail ${modus}`);
    pruefe(!/Deine Mail ist unterwegs/.test(await text(s.page)), `${w} Mail ${modus}: falsche Überschrift`);
    await s.page.locator('[data-beenden]').click();
    await s.page.waitForFunction(() => !document.querySelector('[data-laeuft-noch]'), null, { timeout: 4000 });
    await pruefeSeite(s.page, `${w} Mail ${modus}`);
    await foto(s.page, `${breite}-${nr}-festgehalten-mail-${modus}`);
    await schliesse(s, `${w} Mail ${modus}`);
  }

  // Beendet ohne Festhalten, dann noch einmal starten
  await mock('/__test/zuruecksetzen');
  s = await neueSeite(browser, breite, { attrappen: true });
  await s.page.goto(SEITE, { waitUntil: 'networkidle' });
  await startenMitHaken(s.page);
  await bisGespraech(s.page, `${w} ohne Festhalten`);
  await s.page.locator('[data-beenden]').click();
  await erwarteText(s.page, /Es ist nichts gespeichert/, `${w} beendet`);
  pruefe(await s.page.locator('[data-nochmal]').innerText() === 'Noch einmal starten', `${w}: Noch einmal starten fehlt`);
  pruefe(await s.page.locator('[data-andere-wege] a').count() === 2, `${w} beendet: zwei Wege fehlen`);
  await pruefeSeite(s.page, `${w} beendet`);
  await foto(s.page, `${breite}-13-beendet-nichts-gespeichert`);
  await s.page.locator('[data-nochmal]').click();
  await bisGespraech(s.page, `${w} noch einmal`);
  zaehler = await mock('/__test/zaehler', 'GET');
  pruefe(zaehler.session === 2, `${w}: zweiter Start ging nicht an den Dienst (${zaehler.session})`);
  await schliesse(s, `${w} noch einmal`);
}

// ---- Lauf ---------------------------------------------------------------------------------------------
try {
  await starteMock();
  // Schalter aus
  await starteVite(false);
  let browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const breite of BREITEN) await schalterAus(browser, breite);
  await browser.close();
  await stoppeVite();

  // Schalter an (lokale Prüfung im Entwicklungsmodus)
  await starteVite(true);
  browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  const browserOhne = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const breite of BREITEN) {
      await einstiegUndFehler(browser, breite);
      await keinMikrofon(browserOhne, breite);
      await gespraechMitAttrappen(browser, breite);
    }
  } finally {
    await browser.close();
    await browserOhne.close();
  }
  process.stdout.write(`Antragsgespräch /antrag/aufnehmen gerendert geprüft: ${punkte} Prüfpunkte grün${FOTOS ? `, Fotos in ${FOTOS}` : ''}\n`);
} finally {
  await stoppeAlles();
}
