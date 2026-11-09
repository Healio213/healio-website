/**
 * Unsichtbare Prüfung der Nachverfolgung im Zuschuss-Check (Vormerkung) auf
 * den Altersvorsorge-Seiten. Kein einziger Treffer verlässt den Rechner:
 * Google, Meta, EmailJS und die Anfragen-Zentrale werden lokal abgefangen und
 * nur mitgeschrieben. Nur synthetische Daten (…@example.invalid).
 *
 * Baut dafür eine Testfassung mit einer Platzhalter-Pixel-ID, damit der
 * Meta-Pfad überhaupt aktiv wird, und prüft drei Fälle:
 *   A  Analyse und Marketing erlaubt: GA4, Google Ads und Meta melden je
 *      genau einen Lead, ohne Namen, Mail oder Telefon
 *   B  nur Analyse erlaubt: GA4 ja, Google Ads und Meta nichts
 *   C  noch keine Entscheidung: gar keine Messung, die Anfrage kommt trotzdem an
 * Dazu: Seiten-Herkunft und Kampagne (utm) stehen in Mail und Zentrale.
 */
import assert from 'node:assert/strict';
import { build, preview } from 'vite';
import puppeteer from 'puppeteer';

const PORT = Number(process.env.HEALIO_NACHVERFOLGUNG_PORT || 4936);
const OUT_DIR = new URL('../.pruefskripte/dist-nachverfolgung/', import.meta.url).pathname;
const PIXEL_PLATZHALTER = '000000000000001';
const SYNTH = { name: 'Nachverfolgung Prüffall', email: 'nachverfolgung-pruefung@example.invalid' };
const UTM = 'utm_source=instagram&utm_medium=paid_social&utm_campaign=altersvorsorge-test';
const MESSDIENSTE = /(^|\.)(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|googleadservices\.com|doubleclick\.net|google\.com|connect\.facebook\.net|facebook\.com|facebook\.net)$/;

process.env.VITE_META_PIXEL_ID = PIXEL_PLATZHALTER;
// HEALIO_NACHVERFOLGUNG_OHNE_BAU=1 nutzt eine schon gebaute Testfassung (nur für schnelle Wiederholungen).
if (process.env.HEALIO_NACHVERFOLGUNG_OHNE_BAU !== '1') await build({ logLevel: 'error', build: { outDir: OUT_DIR, emptyOutDir: true } });
const server = await preview({ logLevel: 'error', preview: { host: '127.0.0.1', port: PORT, strictPort: true }, build: { outDir: OUT_DIR } });
const origin = `http://127.0.0.1:${PORT}`;
const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
let pruefungen = 0;
const check = (bedingung, text) => { assert.ok(bedingung, text); pruefungen += 1; };

const zustimmung = (analytics, marketing) => ({
  version: 2, decided: true, necessary: true, source: 'settings', updatedAt: new Date().toISOString(),
  preferences: { analytics, marketing, google_calendar: false, maps: false, openai: false },
});

async function lauf({ name, consent, pfad = '/altersvorsorgedepot/eltern' }) {
  // Eigenes, leeres Profil je Fall: keine gespeicherte Zustimmung aus einem anderen Fall.
  const profil = await browser.createBrowserContext();
  const page = await profil.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const mitschrift = { emailjs: [], zentrale: [], metaServer: [], messdienste: [], fehler: [] };
  page.on('pageerror', (error) => mitschrift.fehler.push(error.message));
  if (consent) await page.evaluateOnNewDocument((state) => localStorage.setItem('healio:consent:v2', JSON.stringify(state)), consent);
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const url = new URL(request.url());
    const cors = { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': '*' };
    if (url.origin === origin) {
      if (url.pathname === '/api/meta-events') {
        // sendBeacon schickt einen Blob; dessen Inhalt liefert erst fetchPostData().
        const inhalt = request.postData() ?? await request.fetchPostData().catch(() => undefined);
        mitschrift.metaServer.push(inhalt || '');
        return request.respond({ status: 204 });
      }
      if (url.pathname.startsWith('/api/')) return request.respond({ status: 200, contentType: 'application/json', body: '{"ready":false}' });
      return request.continue();
    }
    if (url.hostname === 'api.emailjs.com') {
      if (request.method() === 'OPTIONS') return request.respond({ status: 204, headers: cors });
      mitschrift.emailjs.push(JSON.parse(request.postData() || '{}'));
      return request.respond({ status: 200, headers: cors, contentType: 'text/plain', body: 'OK' });
    }
    if (url.hostname === 'anfragen.healio.de') {
      if (request.method() === 'OPTIONS') return request.respond({ status: 204, headers: cors });
      mitschrift.zentrale.push(JSON.parse(request.postData() || '{}'));
      return request.respond({ status: 200, headers: cors, contentType: 'application/json', body: '{"ok":true}' });
    }
    if (MESSDIENSTE.test(url.hostname)) {
      mitschrift.messdienste.push(`${request.method()} ${url.hostname}${url.pathname}${url.search}`);
      // Leeres Skript: Befehle bleiben in dataLayer bzw. fbq.queue liegen und gehen nirgendwohin.
      return request.respond({ status: 200, contentType: 'application/javascript', body: '' });
    }
    if (['data:', 'blob:'].includes(url.protocol)) return request.continue();
    return request.respond({ status: 204 });
  });

  await page.goto(`${origin}${pfad}?${UTM}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.click('#rechner button.bg-white');
  await page.waitForSelector('[data-altersvorsorge-vormerkung] form');
  await page.type('#vormerkung-name', SYNTH.name);
  await page.type('#vormerkung-email', SYNTH.email);
  await page.click('[data-altersvorsorge-vormerkung] input[name="consent"]');
  await page.click('[data-altersvorsorge-vormerkung] button[type="submit"]');
  await page.waitForSelector('[data-vormerkung-erfolg]', { timeout: 15000 });
  await new Promise((resolve) => setTimeout(resolve, 800));

  const messung = await page.evaluate(() => {
    const layer = Array.from(window.dataLayer || [], (eintrag) => Array.from(eintrag));
    const ereignis = (name) => layer.filter((e) => e[0] === 'event' && e[1] === name);
    const fbqQueue = Array.from(window.fbq?.queue || [], (eintrag) => Array.from(eintrag));
    return {
      altersvorsorgeLead: ereignis('altersvorsorge_lead').length,
      generateLead: ereignis('generate_lead').length,
      adsConversion: ereignis('conversion').map((e) => e[2]?.send_to || ''),
      metaLead: fbqQueue.filter((e) => e[0] === 'track' && e[1] === 'Lead').length,
      metaPayloads: fbqQueue.filter((e) => e[0] === 'track').map((e) => JSON.stringify(e)),
    };
  });
  await profil.close();
  return { name, ...mitschrift, ...messung };
}

const enthaeltPersonendaten = (text) => /@|example\.invalid|Prüffall|Nachverfolgung%20Pr|nachverfolgung-pruefung/i.test(text);

// A: alles erlaubt
const a = await lauf({ name: 'A Analyse und Marketing', consent: zustimmung(true, true) });
check(a.altersvorsorgeLead === 1, `A: genau ein altersvorsorge_lead (${a.altersvorsorgeLead})`);
check(a.generateLead === 1, `A: genau ein generate_lead (${a.generateLead})`);
check(a.adsConversion.length === 1 && /^AW-\d+\/[A-Za-z0-9_-]+$/.test(a.adsConversion[0]), `A: genau eine Google-Ads-Conversion (${a.adsConversion.join(', ')})`);
check(a.metaLead === 1, `A: genau ein Meta-Lead (${a.metaLead})`);
const metaServerLead = a.metaServer.filter((body) => body.includes('"event_name":"Lead"'));
check(metaServerLead.length === 1, `A: genau ein Lead an die Meta-Serverleitung (${metaServerLead.length})`);
for (const body of metaServerLead) {
  const keys = Object.keys(JSON.parse(body));
  check(keys.every((key) => ['event_name', 'event_id', 'event_source_url', 'custom_data', 'fbp', 'fbc'].includes(key)), `A: Meta-Serverdaten nur mit erlaubten Feldern (${keys.join(', ')})`);
}
check(![...a.metaServer, ...a.metaPayloads, ...a.messdienste].some(enthaeltPersonendaten), 'A: keine Namen, Mails oder Telefonnummern an Google oder Meta');

// Herkunft in Mail und Zentrale (gilt unabhängig von der Zustimmung)
check(a.emailjs.length === 1 && a.zentrale.length === 1, `A: Anfrage genau einmal an Mail und Zentrale (${a.emailjs.length}/${a.zentrale.length})`);
const mail = a.emailjs[0]?.template_params?.message || '';
check(mail.includes('Seiten-Herkunft: /altersvorsorgedepot/eltern'), 'A: Mail nennt die Unterseite');
check(/utm_source: instagram/.test(mail) && /utm_campaign: altersvorsorge-test/.test(mail), 'A: Mail enthält den Kampagnenblock');
const zentrale = a.zentrale[0] || {};
check(zentrale.seite === '/altersvorsorgedepot/eltern', `A: Zentrale kennt die Seite (${zentrale.seite})`);
check(zentrale.utm?.utm_source === 'instagram' && zentrale.utm?.utm_campaign === 'altersvorsorge-test', 'A: Zentrale kennt Quelle und Kampagne');

// B: nur Analyse
const b = await lauf({ name: 'B nur Analyse', consent: zustimmung(true, false) });
check(b.altersvorsorgeLead === 1 && b.generateLead === 1, `B: GA4 meldet den Lead (${b.altersvorsorgeLead}/${b.generateLead})`);
check(b.adsConversion.length === 0 && b.metaLead === 0 && b.metaServer.length === 0, 'B: ohne Marketing-Zustimmung nichts an Google Ads oder Meta');
check(!b.messdienste.some((zeile) => /facebook|googleadservices|doubleclick|id=AW-/.test(zeile)), `B: kein Werbe-Skript geladen (${b.messdienste.join(', ')})`);

// C: keine Entscheidung
const c = await lauf({ name: 'C ohne Entscheidung', consent: null });
check(c.altersvorsorgeLead === 0 && c.generateLead === 0 && c.adsConversion.length === 0 && c.metaLead === 0, `C: ohne Zustimmung keine Messung (${JSON.stringify({ a: c.altersvorsorgeLead, g: c.generateLead, ads: c.adsConversion, meta: c.metaLead })})`);
check(c.messdienste.length === 0 && c.metaServer.length === 0, `C: kein einziger Aufruf an Mess-Dienste (${c.messdienste.join(', ')})`);
check(c.emailjs.length === 1 && c.zentrale.length === 1, 'C: die Anfrage kommt trotzdem an');

// Hauptseite nutzt dieselbe Vormerkung
const d = await lauf({ name: 'D Hauptseite', consent: zustimmung(true, true), pfad: '/altersvorsorgedepot' });
check(d.metaLead === 1 && d.adsConversion.length === 1 && d.generateLead === 1, 'D: Hauptseite meldet den Lead ebenso');

for (const lauf_ of [a, b, c, d]) check(lauf_.fehler.length === 0, `${lauf_.name}: keine Laufzeitfehler (${lauf_.fehler.join(' | ')})`);

await browser.close();
await new Promise((resolve) => server.httpServer.close(resolve));
console.log(`Nachverfolgung geprüft: ${pruefungen} Prüfungen bestanden, kein Treffer hat den Rechner verlassen.`);
