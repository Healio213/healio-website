/**
 * Prüfung für Anfrage-Ereignis und anonymen Zähler (02.11.2026).
 *
 * Teil 1, ohne Browser:
 * - Regeln des Zählers (shared/anonyme-zaehler.js, seit 10.11.2026 mit
 *   versicherer_klick für Bayerische und UKV) und Browsermodul mit
 *   Attrappen: nur vier Felder, keepalive, keine Cookies, keine Kennung,
 *   Fehler still, Kopf/Menü/Fuß zählen nicht.
 * - Funktion api/zaehler.js mit Attrappen für Anfrage und Supabase.
 * - SQL-Datei: Spalten, Prüfungen, RLS, nur Einfügerecht für anon.
 * - Anfrage-Ereignis: generate_lead und Meta-Lead nur nach erfolgreichem
 *   Absenden, ohne Formular-, Kassen- oder Gesundheitsangaben, keine
 *   Lead-Zählung beim Klick.
 * - Datenschutzerklärung: Absatz in beiden Sprachen.
 *
 * Teil 2, gerendert (nur mit vorhandenem dist/): lokale Vorschau, Chrome
 * headless, alle fremden Anfragen abgefangen, nichts geht ins Netz.
 *
 * Ausführen: npm run test:anfrage-zaehler (vorher npm run build für Teil 2)
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };

// ---------------------------------------------------------------------------
// 1a. Regeln
// ---------------------------------------------------------------------------
const regeln = await import(path.join(root, 'shared/anonyme-zaehler.js'));
const { baueZaehlerEintrag, baueZaehlerNutzlast, geraetAusUserAgent, pruefeZaehlerEintrag, normalisiereZaehlerPfad } = regeln;

check(normalisiereZaehlerPfad('/Ratgeber/Barmer-Osteopathie/?utm_source=x#mitte') === '/ratgeber/barmer-osteopathie', 'Pfad: Suchteil, Anker, Großschreibung und Schrägstrich am Ende fallen weg.');
check(normalisiereZaehlerPfad('/ratgeber/zahnärzte') === null, 'Pfad mit Umlaut wird verworfen statt umgeschrieben.');
check(normalisiereZaehlerPfad(`/${'a'.repeat(160)}`) === null, 'Pfad über 160 Zeichen wird verworfen.');
check(normalisiereZaehlerPfad('https://healio.de/ambulant') === null, 'Nur Pfade, keine vollständigen Adressen.');
check(JSON.stringify(baueZaehlerEintrag('leistungsweg_klick', { vonPfad: '/ratgeber/x', ziel: '/ambulant' }, 'mobil'))
  === JSON.stringify({ ereignis: 'leistungsweg_klick', von_pfad: '/ratgeber/x', ziel: '/ambulant', geraet: 'mobil' }), 'Leistungsweg-Eintrag hat genau vier Felder.');
check(baueZaehlerEintrag('leistungsweg_klick', { vonPfad: '/ratgeber/x', ziel: '/kontakt' }) === null, 'Nur Leistungsseiten zählen als Ziel.');
check(baueZaehlerEintrag('leistungsweg_klick', { vonPfad: '/ambulant', ziel: '/ambulant' }) === null, 'Sprung innerhalb derselben Seite zählt nicht.');
check(baueZaehlerEintrag('sdk_klick', { vonPfad: '/ambulant' }).ziel === null, 'SDK-Klick ohne Ziel.');
check(baueZaehlerEintrag('sdk_klick', { vonPfad: '/ambulant', ziel: 'x' }) === null, 'SDK-Klick mit Ziel wird verworfen.');
check(baueZaehlerEintrag('kurzcheck_abgeschickt', { vonPfad: '/check/naturheilkunde', ziel: 'naturheilkunde' })?.ziel === 'naturheilkunde', 'Kurzcheck mit Variante.');
check(baueZaehlerEintrag('kurzcheck_abgeschickt', { vonPfad: '/check/naturheilkunde', ziel: 'tk' }) === null, 'Unbekannte Variante wird verworfen.');
check(baueZaehlerEintrag('page_view', { vonPfad: '/' }) === null, 'Nur die vier festen Ereignisse.');
check(JSON.stringify(regeln.ZAEHLER_EREIGNISSE) === JSON.stringify(['leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt', 'versicherer_klick']), 'Genau vier Ereignisse.');
check(JSON.stringify(regeln.ZAEHLER_VERSICHERER) === JSON.stringify(['bayerische', 'ukv']), 'Versicherer nur Bayerische und UKV.');
check(JSON.stringify(baueZaehlerEintrag('versicherer_klick', { vonPfad: '/zahn', ziel: 'ukv' }, 'mobil'))
  === JSON.stringify({ ereignis: 'versicherer_klick', von_pfad: '/zahn', ziel: 'ukv', geraet: 'mobil' }), 'Versicherer-Klick hat genau vier Felder.');
check(baueZaehlerEintrag('versicherer_klick', { vonPfad: '/Zahn/Behandlung-steht-an/?utm_source=x#ergebnis', ziel: 'bayerische' })?.von_pfad === '/zahn/behandlung-steht-an', 'Versicherer-Klick: künftige Unterseiten kommen mit ihrem eigenen Pfad an.');
check(baueZaehlerEintrag('versicherer_klick', { vonPfad: '/en/dental', ziel: 'bayerische' })?.ziel === 'bayerische', 'Versicherer-Klick auch auf der englischen Fassung.');
check(baueZaehlerEintrag('versicherer_klick', { vonPfad: '/zahn', ziel: 'ergo' }) === null
  && baueZaehlerEintrag('versicherer_klick', { vonPfad: '/zahn', ziel: 'bayerische_zahn_sofort' }) === null
  && baueZaehlerEintrag('versicherer_klick', { vonPfad: '/zahn', ziel: 'Bayerische' }) === null
  && baueZaehlerEintrag('versicherer_klick', { vonPfad: '/zahn' }) === null
  && baueZaehlerEintrag('versicherer_klick', { vonPfad: '/zahn', ziel: { versicherer: 'ukv' } }) === null, 'Versicherer-Klick nur mit einem Namen aus der festen Liste, nichts anderes im Ziel.');
check(pruefeZaehlerEintrag({ ereignis: 'versicherer_klick', von_pfad: '/zahn', ziel: 'ukv', antwort: 'ja', ergebnis: 'sofort' }, 'desktop')?.ziel === 'ukv'
  && !('antwort' in pruefeZaehlerEintrag({ ereignis: 'versicherer_klick', von_pfad: '/zahn', ziel: 'ukv', antwort: 'ja' })), 'Server übernimmt beim Versicherer-Klick keine Antworten oder Ergebnisse.');
check(baueZaehlerEintrag('sdk_klick', { vonPfad: '/ambulant' }, 'tablet') === null, 'Nur mobil oder desktop.');
check(pruefeZaehlerEintrag({ ereignis: 'sdk_klick', von_pfad: '/Ambulant', ziel: null }, 'mobil') === null, 'Server formt nichts um: nur fertige Form wird angenommen.');
check(JSON.stringify(pruefeZaehlerEintrag({ ereignis: 'sdk_klick', von_pfad: '/ambulant', ziel: null, geraet: 'desktop', email: 'a@b.de', ip: '1.2.3.4' }, 'mobil'))
  === JSON.stringify({ ereignis: 'sdk_klick', von_pfad: '/ambulant', ziel: null, geraet: 'mobil' }), 'Server übernimmt keine Zusatzfelder, auch kein Gerät aus dem Browser.');
check(JSON.stringify(baueZaehlerNutzlast('sdk_klick', { vonPfad: '/ambulant' })) === JSON.stringify({ ereignis: 'sdk_klick', von_pfad: '/ambulant', ziel: null }), 'Browser schickt nur drei Felder, kein Gerät.');
check(geraetAusUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148') === 'mobil', 'iPhone zählt als mobil.');
check(geraetAusUserAgent('Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36') === 'mobil', 'Android-Handy zählt als mobil.');
check(geraetAusUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15') === 'desktop', 'Mac zählt als desktop.');
check(geraetAusUserAgent(undefined) === 'desktop' && geraetAusUserAgent(['x']) === 'desktop', 'Ohne Kennung: desktop.');
check(pruefeZaehlerEintrag([]) === null && pruefeZaehlerEintrag('x') === null && pruefeZaehlerEintrag(null) === null, 'Server verwirft Unsinn.');

// ---------------------------------------------------------------------------
// 1b. Browsermodul mit Attrappen
// ---------------------------------------------------------------------------
const bundle = await build({
  entryPoints: [path.join(root, 'src/lib/anonyme-zaehler.js')],
  bundle: true, format: 'esm', platform: 'neutral', write: false, logLevel: 'silent',
});
const modulUrl = `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`;

const ladeModul = async ({ html = '<!doctype html><body></body>', url = 'https://healio.de/ratgeber/barmer-osteopathie', mobil = true, webdriver = false, fetchVerhalten = 'ok' } = {}) => {
  const dom = new JSDOM(html, { url });
  // Links nicht wirklich öffnen; der Zähler hört vorher (capture) mit.
  dom.window.document.addEventListener('click', (event) => event.preventDefault());
  dom.window.document.addEventListener('auxclick', (event) => event.preventDefault());
  const sends = [];
  const verboten = [];
  const window = dom.window;
  window.matchMedia = () => { verboten.push('matchMedia'); return { matches: mobil }; };
  Object.defineProperty(window.navigator, 'webdriver', { get: () => webdriver, configurable: true });
  window.fetch = (input, init) => {
    sends.push({ input, init });
    if (fetchVerhalten === 'wirft') throw new Error('kein Netz');
    return fetchVerhalten === 'ablehnen' ? Promise.reject(new Error('404')) : Promise.resolve({ ok: true, status: 204 });
  };
  for (const name of ['localStorage', 'sessionStorage']) {
    Object.defineProperty(window, name, { get: () => { verboten.push(name); return undefined; }, configurable: true });
  }
  Object.defineProperty(window.document, 'cookie', { get: () => { verboten.push('cookie lesen'); return ''; }, set: () => { verboten.push('cookie setzen'); }, configurable: true });
  globalThis.window = window;
  globalThis.document = window.document;
  const mod = await import(`${modulUrl}#${Math.random()}`);
  return { mod, dom, sends, verboten };
};

{
  const { mod, sends, verboten } = await ladeModul();
  check(mod.zaehle('sdk_klick') === true, 'zaehle meldet einen angestoßenen Versand.');
  check(sends.length === 1 && sends[0].input === '/api/zaehler', 'Versand geht an /api/zaehler auf der eigenen Domain.');
  const init = sends[0].init;
  check(init.method === 'POST' && init.keepalive === true && init.credentials === 'omit', 'POST mit keepalive und ohne Cookies.');
  check(init.referrerPolicy === 'no-referrer', 'Ohne Referrer.');
  check(JSON.stringify(JSON.parse(init.body)) === JSON.stringify({ ereignis: 'sdk_klick', von_pfad: '/ratgeber/barmer-osteopathie', ziel: null }), 'Inhalt: genau drei Felder, Pfad aus der Adresszeile ohne Suchteil, kein Gerät.');
  check(mod.zaehle('sdk_klick') === false && sends.length === 1, 'Doppelte Auslösung innerhalb einer Sekunde zählt einmal.');
  check(mod.zaehle('kurzcheck_abgeschickt', { vonPfad: '/check/naturheilkunde', ziel: 'naturheilkunde' }) === true && sends.length === 2, 'Kurzcheck-Ereignis wird gesendet.');
  check(mod.zaehle('generate_lead') === false && sends.length === 2, 'Fremde Ereignisse werden nicht gesendet.');
  check(mod.zaehle('versicherer_klick', { ziel: 'ukv' }) === true && sends.length === 3
    && JSON.stringify(JSON.parse(sends[2].init.body)) === JSON.stringify({ ereignis: 'versicherer_klick', von_pfad: '/ratgeber/barmer-osteopathie', ziel: 'ukv' }), 'Versicherer-Klick: drei Felder, Pfad aus der Adresszeile.');
  check(mod.zaehle('versicherer_klick', { ziel: 'ergo' }) === false && sends.length === 3, 'Unbekannter Versicherer wird nicht gesendet.');
  check(verboten.length === 0, `Kein Zugriff auf Cookies, Speicher oder Bildschirmbreite: ${verboten.join(', ')}`);
}
{
  const { mod, sends } = await ladeModul({ webdriver: true });
  check(mod.zaehle('sdk_klick') === false && sends.length === 0, 'Automatisierte Browser zählen nicht.');
}
{
  const { mod, sends } = await ladeModul({ mobil: false, fetchVerhalten: 'wirft' });
  let geworfen = false;
  try { mod.zaehle('sdk_klick'); } catch { geworfen = true; }
  check(!geworfen && sends.length === 1, 'Ein Netzfehler wirft nie bis zur Seite durch.');
  check(!('geraet' in JSON.parse(sends[0].init.body)), 'Der Browser schickt kein Gerät.');
}
{
  const { mod } = await ladeModul({ fetchVerhalten: 'ablehnen' });
  check(mod.zaehle('sdk_klick') === true, 'Abgelehnte Antwort (Tabelle fehlt) bleibt still.');
  await new Promise((resolve) => setTimeout(resolve, 10));
}
{
  const html = `<!doctype html><body>
    <header><a id="kopf" href="/ambulant">Abschließen</a></header>
    <nav><a id="menue" href="/zahn">Zahn</a></nav>
    <main>
      <aside data-leistungsweg="mitte"><a id="mitte" href="/ambulant?ref=x#tarifwahl"><span id="innen">Ansehen</span></a></aside>
      <a id="anker" href="#faq">FAQ</a>
      <a id="fremd" href="https://insurances-online.levelnine.biz/?x=1">Rechner</a>
      <a id="kontakt" href="/kontakt">Kontakt</a>
      <a id="alle" href="/leistungen" data-leistungsweg="alle">Alle Bausteine</a>
    </main>
    <footer><a id="fuss" href="/stationaer">Klinik</a></footer>
  </body>`;
  const { mod, dom, sends } = await ladeModul({ html, url: 'https://healio.de/ratgeber/barmer-osteopathie?utm_source=ig' });
  const stop = mod.installiereLeistungswegZaehler();
  const klick = (id, type = 'click', button = 0) => {
    const event = new dom.window.MouseEvent(type, { bubbles: true, cancelable: true, button });
    dom.window.document.getElementById(id).dispatchEvent(event);
  };
  klick('innen');
  check(sends.length === 1 && JSON.stringify(JSON.parse(sends[0].init.body)) === JSON.stringify({ ereignis: 'leistungsweg_klick', von_pfad: '/ratgeber/barmer-osteopathie', ziel: '/ambulant' }), 'Klick im Inhalt zählt mit Ziel ohne Suchteil und Anker.');
  for (const id of ['kopf', 'menue', 'fuss', 'anker', 'fremd', 'kontakt']) klick(id);
  check(sends.length === 1, 'Kopf, Menü, Fußzeile, Anker, fremde Seiten und Nicht-Leistungsseiten zählen nicht.');
  klick('alle', 'auxclick', 1);
  check(sends.length === 2 && JSON.parse(sends[1].init.body).ziel === '/leistungen', 'Mittlere Maustaste (neuer Tab) zählt.');
  klick('alle', 'auxclick', 2);
  check(sends.length === 2, 'Rechte Maustaste zählt nicht.');
  check(mod.installiereLeistungswegZaehler() !== stop && sends.length === 2, 'Zweite Installation hängt keinen zweiten Zuhörer an.');
  stop();
  await new Promise((resolve) => setTimeout(resolve, 1100));
  klick('innen');
  check(sends.length === 2, 'Nach dem Abbau zählt nichts mehr.');
}
delete globalThis.window;
delete globalThis.document;

// ---------------------------------------------------------------------------
// 1c. Funktion api/zaehler.js
// ---------------------------------------------------------------------------
const api = (await import(path.join(root, 'api/zaehler.js'))).default;
const echterFetch = globalThis.fetch;
const rufe = async ({ method = 'POST', origin = 'https://healio.de', body, ip = '198.51.100.7', env = { SUPABASE_URL: 'https://beispiel.supabase.co/', SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_attrappe' }, fetchVerhalten = 'ok', userAgent = IPHONE_UA } = {}) => {
  const aufrufe = [];
  globalThis.fetch = async (url, init) => {
    aufrufe.push({ url, init });
    if (fetchVerhalten === 'fehler') throw new Error('Tabelle fehlt');
    return { ok: fetchVerhalten === 'ok', status: fetchVerhalten === 'ok' ? 201 : 404 };
  };
  const vorher = { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_PUBLISHABLE_KEY };
  for (const [key, value] of Object.entries({ SUPABASE_URL: env.SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY: env.SUPABASE_PUBLISHABLE_KEY })) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
  const res = { statusCode: 0, headers: {}, setHeader(k, v) { this.headers[k.toLowerCase()] = v; }, status(code) { this.statusCode = code; return this; }, json() { return this; }, end() { return this; } };
  await api({ method, headers: { origin, 'x-forwarded-for': ip, 'user-agent': userAgent }, body }, res);
  globalThis.fetch = echterFetch;
  if (vorher.url === undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL = vorher.url;
  if (vorher.key === undefined) delete process.env.SUPABASE_PUBLISHABLE_KEY; else process.env.SUPABASE_PUBLISHABLE_KEY = vorher.key;
  return { res, aufrufe };
};
const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148';
const gueltig = { ereignis: 'leistungsweg_klick', von_pfad: '/ratgeber/tk-schwangerschaft', ziel: '/schwangerschaft' };
{
  const { res, aufrufe } = await rufe({ body: JSON.stringify({ ...gueltig, ua: 'x', email: 'a@b.de' }) });
  check(res.statusCode === 204, 'Gültige Zählung: 204.');
  check(aufrufe.length === 1 && aufrufe[0].url === 'https://beispiel.supabase.co/rest/v1/anonyme_zaehler', 'Schreibt in public.anonyme_zaehler.');
  check(aufrufe[0].init.headers.Prefer === 'return=minimal' && aufrufe[0].init.headers.apikey === 'sb_publishable_attrappe', 'Nur Einfügen mit dem öffentlichen Schlüssel.');
  check(JSON.stringify(JSON.parse(aufrufe[0].init.body)) === JSON.stringify({ ...gueltig, geraet: 'mobil' }), 'Weitergegeben werden genau vier Felder, Gerät aus der Kennung, keine IP, kein Browser.');
  check(!/iPhone|Mozilla/.test(aufrufe[0].init.body), 'Die Browserkennung selbst verlässt die Funktion nicht.');
  check(!/198\.51\.100\.7/.test(aufrufe[0].init.body) && !Object.values(aufrufe[0].init.headers).some((v) => /198\.51/.test(v)), 'Die IP verlässt die Funktion nicht.');
}
check((await rufe({ method: 'GET' })).res.statusCode === 405, 'Nur POST.');
check((await rufe({ origin: 'https://evil.example', body: gueltig })).res.statusCode === 403, 'Fremde Herkunft wird abgewiesen.');
check((await rufe({ origin: 'https://healio-git-x.vercel.app', body: gueltig })).aufrufe.length === 0, 'Vorschau-Deployments schreiben nicht in die Produktionszahlen.');
check((await rufe({ body: { ...gueltig, ziel: '/kontakt' } })).res.statusCode === 400, 'Ungültiges Ziel: 400, nichts gespeichert.');
check((await rufe({ body: 'x'.repeat(2000) })).aufrufe.length === 0, 'Zu großer Inhalt wird verworfen.');
{
  const { res, aufrufe } = await rufe({ body: gueltig, env: {} });
  check(res.statusCode === 204 && aufrufe.length === 0, 'Ohne Konfiguration still 204.');
}
{
  const { res } = await rufe({ body: gueltig, fetchVerhalten: 'fehler' });
  check(res.statusCode === 204, 'Fehlende Tabelle oder Netzfehler: trotzdem 204.');
}
{
  let letzter;
  for (let i = 0; i < 61; i += 1) letzter = await rufe({ body: gueltig, ip: '203.0.113.9' });
  check(letzter.res.statusCode === 429 && letzter.aufrufe.length === 0, 'Schleifen werden nach 60 Zählungen je Minute gebremst.');
}

// ---------------------------------------------------------------------------
// 1d. SQL-Datei
// ---------------------------------------------------------------------------
const sql = read('docs/supabase/2026-11-02_anonyme_zaehler.sql');
check(/create table if not exists public\.anonyme_zaehler/.test(sql), 'SQL legt public.anonyme_zaehler an.');
check(/tag date not null default current_date/.test(sql), 'Datum setzt die Datenbank.');
check(!/\b(ip|ip_hash|user_agent|created_at|uhrzeit|timestamptz|uuid|identity|serial)\b/i.test(sql.split('-- Prüfung nach dem Einspielen')[0].replace(/^--.*$/gm, '').replace(/comment on table[\s\S]*?';/g, '')), 'Keine IP, keine Uhrzeit, keine Kennung im Schema.');
check(/check \(ereignis in \('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt'\)\)/.test(sql), 'CHECK auf die drei Ereignisse der ersten Fassung.');
check((sql.match(/\^\[a-z0-9\/-\]\{1,160\}\$/g) || []).length >= 4, 'CHECK und Policy prüfen Pfade auf a-z, 0-9, Bindestrich, Schrägstrich, höchstens 160.');
check(/check \(geraet in \('mobil', 'desktop'\)\)/.test(sql), 'CHECK auf mobil und desktop.');
check(/enable row level security/.test(sql), 'RLS an.');
check(/revoke all on table public\.anonyme_zaehler from public, anon, authenticated;/.test(sql), 'Alle Rechte für anon und authenticated zuerst entzogen.');
check(/grant insert \(ereignis, von_pfad, ziel, geraet\) on table public\.anonyme_zaehler to anon;/.test(sql), 'anon darf nur die vier Spalten einfügen.');
check(!/grant[^;]*(select|update|delete)[^;]*to anon/i.test(sql) && !/to authenticated/.test(sql.replace(/revoke[^;]*;/g, '')), 'Kein select, update oder delete für anon und authenticated.');
check(/for insert to anon\s+with check \(\s+tag = current_date/.test(sql), 'Policy: nur Einfügen mit heutigem Datum.');
check(!/supabase\/migrations/.test(path.relative(root, 'docs/supabase/2026-11-02_anonyme_zaehler.sql')) && /NICHT AUSGEFÜHRT/.test(sql), 'SQL liegt vorbereitet neben den anderen und ist nicht angewendet.');
{
  // Gegenprüfung 02.11.2026: kein security definer, keine Funktion, kein
  // Trigger, keine Rechte an anderen Tabellen; Ziele nur aus der festen Liste.
  const sqlCode = sql.replace(/--.*$/gm, '');
  check(!/security\s+definer/i.test(sqlCode) && !/create\s+(or\s+replace\s+)?(function|trigger|procedure)/i.test(sqlCode), 'SQL ohne security-definer-Funktion und ohne Trigger.');
  const tabellen = [...sqlCode.matchAll(/\b(?:grant|revoke)[^;]*\bon\s+table\s+([a-z_.]+)/gi)].map((treffer) => treffer[1]);
  check(
    tabellen.length > 0 && tabellen.every((name) => name === 'public.anonyme_zaehler')
      && !/\bgrant[^;]*\bon\s+(schema|function|procedure|sequence|all\s+(tables|functions|sequences))\b/i.test(sqlCode)
      && !/alter\s+default\s+privileges/i.test(sqlCode),
    'Rechte nur an public.anonyme_zaehler, keine an Schemata, Funktionen oder anderen Tabellen.',
  );
  check(/revoke all on table public\.anonyme_zaehler from service_role;/.test(sqlCode), 'service_role verliert die Standardrechte, behält nur Lesen und Löschen.');
  const zielListe = (sqlCode.match(/constraint anonyme_zaehler_ziel_liste_check[\s\S]*?\n\s*\)\n/) || [''])[0];
  check(
    regeln.LEISTUNGSSEITEN.every((seite) => zielListe.includes(`'${seite}'`))
      && regeln.KURZCHECK_VARIANTEN.every((variante) => zielListe.includes(`'${variante}'`))
      && (zielListe.match(/'\/[a-z/]+'/g) || []).length === regeln.LEISTUNGSSEITEN.length,
    'CHECK erlaubt als Ziel nur die Leistungsseiten und Kurzcheck-Varianten aus shared/anonyme-zaehler.js.',
  );
}
{
  // Erweiterung 10.11.2026: versicherer_klick. Nur CHECKs und Einfügeregel,
  // keine neue Spalte, keine neuen Rechte.
  const sqlV = read('docs/supabase/2026-11-10_anonyme_zaehler_versicherer_klick.sql');
  const sqlVCode = sqlV.replace(/--.*$/gm, '');
  const ereignisListe = `('${regeln.ZAEHLER_EREIGNISSE.join("', '")}')`;
  check(/NICHT AUSGEFÜHRT/.test(sqlV) && /^begin;/.test(sqlV) && /\ncommit;\n/.test(sqlV), 'Erweiterung liegt vorbereitet als eine Transaktion und ist nicht angewendet.');
  check(sqlVCode.includes(`check (ereignis in ${ereignisListe})`), 'Erweiterung: CHECK auf genau die Ereignisse aus shared/anonyme-zaehler.js.');
  check(sqlVCode.includes(`and ereignis in ${ereignisListe}`), 'Erweiterung: Einfügeregel für anon kennt genau dieselben Ereignisse.');
  check(/for insert to anon\s+with check \(\s+tag = current_date/.test(sqlVCode) && /\(\(ereignis = 'sdk_klick'\) = \(ziel is null\)\)/.test(sqlVCode), 'Erweiterung: Policy behält heutiges Datum und Ziel-Regel.');
  const zielListeV = (sqlVCode.match(/add constraint anonyme_zaehler_ziel_liste_check[\s\S]*?\n\s*\);\n/) || [''])[0];
  check(
    regeln.LEISTUNGSSEITEN.every((seite) => zielListeV.includes(`'${seite}'`))
      && regeln.KURZCHECK_VARIANTEN.every((variante) => zielListeV.includes(`'${variante}'`))
      && zielListeV.includes(`(ereignis = 'versicherer_klick' and ziel in ('${regeln.ZAEHLER_VERSICHERER.join("', '")}'))`)
      && (zielListeV.match(/'\/[a-z/]+'/g) || []).length === regeln.LEISTUNGSSEITEN.length,
    'Erweiterung: Ziele nur aus Leistungsseiten, Kurzcheck-Varianten und Versicherern.',
  );
  check(!/\b(grant|revoke|create\s+table|add\s+column|security\s+definer|create\s+(or\s+replace\s+)?(function|trigger|procedure))\b/i.test(sqlVCode), 'Erweiterung ändert keine Rechte, Spalten, Funktionen oder Trigger.');
  check(!/\b(ip|ip_hash|user_agent|created_at|uhrzeit|timestamptz|uuid)\b/i.test(sqlVCode.replace(/comment on table[\s\S]*?';/g, '')), 'Erweiterung ohne IP, Uhrzeit oder Kennung.');
}
const shared = read('shared/anonyme-zaehler.js');
check(/ZAEHLER_PFAD_MUSTER = \/\^\[a-z0-9\/-\]\{1,160\}\$\//.test(shared), 'Browser, Funktion und SQL nutzen dasselbe Pfadmuster.');

// ---------------------------------------------------------------------------
// 1e. Anfrage-Ereignis (generate_lead, Meta-Lead)
// ---------------------------------------------------------------------------
const srcFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel);
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) srcFiles.push(rel);
  }
};
walk('src');
const quellen = Object.fromEntries(srcFiles.map((file) => [file, read(file)]));

const metaLeadOrte = srcFiles.filter((file) => /trackMetaLead\(/.test(quellen[file]) && file !== 'src/lib/meta-pixel.js');
check(JSON.stringify(metaLeadOrte.sort()) === JSON.stringify(['src/components/sections/partner/PraxisLeitfadenForm.jsx', 'src/pages/CheckDankePage.jsx', 'src/services/emailjsService.js']),
  `Meta-Lead nur an den drei Stellen nach erfolgreichem Absenden, gefunden: ${metaLeadOrte.join(', ')}`);
const leadOrte = srcFiles.filter((file) => /['"]generate_lead['"]/.test(quellen[file]));
check(JSON.stringify(leadOrte.sort()) === JSON.stringify(['src/components/sections/partner/PraxisLeitfadenForm.jsx', 'src/pages/CheckDankePage.jsx', 'src/services/emailjsService.js']),
  `generate_lead nur an den drei Stellen nach erfolgreichem Absenden, gefunden: ${leadOrte.join(', ')}`);
check(!srcFiles.some((file) => /on[A-Z][a-zA-Z]*=\{[^}]*trackMetaLead/.test(quellen[file])), 'Kein Meta-Lead in einem Klick- oder Ereignis-Handler.');

const emailjs = quellen['src/services/emailjsService.js'];
check(emailjs.indexOf('response = await emailjs.send(') > 0
  && emailjs.indexOf("trackEvent('generate_lead'") > emailjs.indexOf('response = await emailjs.send(')
  && emailjs.indexOf('if (!track) return') < emailjs.indexOf("trackEvent('generate_lead'"), 'Kontaktformulare: generate_lead erst nach bestätigtem Versand, abschaltbar für die Kurzchecks.');
check(/trackEvent\('generate_lead', \{\s*component: 'contact_form',\s*placement: toPlacementToken\(pageSource\),\s*\}\)/.test(emailjs), 'Kontaktformulare senden nur component und placement.');

const danke = quellen['src/pages/CheckDankePage.jsx'];
check(/if \(counted\.current\) return;\s*counted\.current = true;\s*if \(!consumeCheckLeadPending\(config\.key\)\) return;/.test(danke), 'Dankeseite zählt höchstens einmal und nur mit frischem Merker.');
check(/trackEvent\('generate_lead', \{ component: 'meta_check', placement: config\.key \}\)/.test(danke), 'Dankeseite: generate_lead nur mit component und Variante.');
check(/trackMetaLead\(\{ content_name: config\.metaContentName \}\)/.test(danke), 'Dankeseite: Meta nur mit dem festen Seitenschlüssel.');

const kurzcheck = quellen['src/components/campaign/KurzCheck.jsx'];
const erfolg = kurzcheck.indexOf("zaehle('kurzcheck_abgeschickt'");
check(erfolg > kurzcheck.indexOf('await sendToEuRoute();') && erfolg > kurzcheck.indexOf("setStatus('error');") && erfolg < kurzcheck.indexOf('navigate(`${config.thankYouPath}'), 'Kurzcheck zählt anonym erst nach bestätigtem Eingang.');
check(/zaehle\('kurzcheck_abgeschickt', \{ vonPfad: config\.path, ziel: config\.key \}\)/.test(kurzcheck), 'Kurzcheck-Zähler nur mit Pfad und Variante.');
check(/\}, config\.pageSource, \{ track: false, campaign: false \}\);/.test(kurzcheck), 'Kurzcheck per Mail zählt nicht doppelt (track: false).');
check(!/trackEvent|trackMeta|trackGoogleAds/.test(kurzcheck), 'Kurzcheck selbst sendet nichts an GA4, Meta oder Google Ads.');

const leitfaden = quellen['src/components/sections/partner/PraxisLeitfadenForm.jsx'];
check(leitfaden.indexOf("trackEvent('generate_lead'") > leitfaden.indexOf('if (!response.ok)'), 'Leitfaden: generate_lead erst nach gespeicherter Anfrage.');
check(/trackEvent\('generate_lead', \{ component: 'praxis_leitfaden', placement: 'partner' \}\)/.test(leitfaden), 'Leitfaden: generate_lead ohne Formularangaben.');
check(!/trackMetaLead|trackEvent/.test(quellen['src/pages/PraxisLeitfadenDankePage.jsx']), 'Leitfaden-Dankeseite zählt nichts nach.');

const verbotenInLeadParams = /(email|phone|telefon|name|kasse|krankenkasse|thema|answer|antwort|health|gesund|schwanger)\s*:/i;
for (const file of leadOrte) {
  for (const match of quellen[file].matchAll(/trackEvent\('generate_lead', \{([^}]*)\}/g)) {
    check(!verbotenInLeadParams.test(match[1]), `${file}: generate_lead ohne Kontakt-, Kassen- oder Gesundheitsangaben.`);
  }
}

const analytics = quellen['src/lib/analytics.js'];
check(/'\/check\/schwangerschaft\/danke',/.test(analytics) && /'\/check\/schwangerschaft\/danke',/.test(quellen['src/lib/meta-pixel.js']), 'Schwangeren-Dankeseite bleibt für GA4 und Meta gesperrt.');
check(/export const trackEvent = \(eventName, params = \{\}\) => \{\s*if \(!isBrowser\(\) \|\| isAnalyticsBlocked\(\) \|\| !hasConsent\('analytics'\)\) return false;/.test(analytics), 'GA4-Ereignisse nur mit Statistik-Einwilligung und nie auf gesperrten Seiten.');
check(/if \(!hasConsent\('marketing'\)\) return false;\s*if \(isMetaExcludedRoute\(\)\) return false;/.test(quellen['src/lib/meta-pixel.js']), 'Meta-Ereignisse nur mit Marketing-Einwilligung und nie auf gesperrten Seiten.');

// Zähler-Verdrahtung
check(/zaehle\('sdk_klick'\);/.test(quellen['src/lib/sdk-url.js']), 'SDK-Klick zählt anonym in trackSdkClick.');
check(/installiereLeistungswegZaehler\(\)/.test(quellen['src/App.jsx']), 'Leistungsweg-Zähler hängt einmal für alle Seiten in App.jsx.');
{
  const zahnCheck = quellen['src/components/sections/dental/DentalZahnCheck.jsx'];
  check(/if \(Object\.hasOwn\(CTA_HREFS, insurer\)\) zaehle\('versicherer_klick', \{ ziel: insurer \}\);/.test(zahnCheck)
    && /onClick=\{\(\) => countAntragOpened\(result\.ctaType\)\}/.test(zahnCheck), 'Zahn-Check zählt den geöffneten Antrag anonym nur mit dem Versicherer.');
  check((zahnCheck.match(/zaehle\(/g) || []).length === 1, 'Zahn-Check zählt an genau einer Stelle, Antworten nie.');
  const dentalLinks = quellen['src/components/sections/dental/dentalLinks.js'];
  check(/zaehle\('versicherer_klick', \{ ziel: ZAEHLER_VERSICHERER_JE_ZIEL\[destination\] \}\);/.test(dentalLinks)
    && dentalLinks.indexOf("zaehle('versicherer_klick'") > dentalLinks.indexOf('if (!SAFE_INSURER_DESTINATIONS.has(destination)) return false;'), 'Versicherer-Knöpfe außerhalb des Check zählen anonym, nur nach der Zielprüfung.');
  check(!/zaehle\(/.test(dentalLinks.slice(0, dentalLinks.indexOf('export const trackZahnEvent'))), 'dentalLinks zählt nur in trackZahnEvent; die Links selbst bleiben unverändert.');
}

// ---------------------------------------------------------------------------
// 1f. Datenschutzerklärung
// ---------------------------------------------------------------------------
const legalDe = JSON.parse(read('src/i18n/locales/de/legal.json')).datenschutz;
const legalEn = JSON.parse(read('src/i18n/locales/en/legal.json')).datenschutz;
const privacyPage = read('src/pages/DatenschutzPage.jsx');
check(legalDe.anonymerZaehlerTitle && legalDe.anonymerZaehlerText && legalEn.anonymerZaehlerTitle && legalEn.anonymerZaehlerText, 'Absatz zum anonymen Zähler in Deutsch und Englisch.');
check(/id="anonyme-zaehlung"/.test(privacyPage) && /datenschutz\.anonymerZaehlerText/.test(privacyPage), 'Datenschutzseite gibt den Absatz mit Sprungmarke aus.');
check(/keine IP-Adresse/.test(legalDe.anonymerZaehlerText) && /keine Cookies/.test(legalDe.anonymerZaehlerText) && /Art\. 6 Abs\. 1 lit\. f DSGVO/.test(legalDe.anonymerZaehlerText) && /Frankfurt/.test(legalDe.anonymerZaehlerText) && /25 Monaten/.test(legalDe.anonymerZaehlerText), 'Absatz nennt IP, Cookies, Rechtsgrundlage, Speicherort und Löschfrist.');
check(!/[–—]/.test(legalDe.anonymerZaehlerText + legalDe.anonymerZaehlerTitle), 'Datenschutz-Absatz ohne Gedankenstriche.');
check(/25 months/.test(legalEn.anonymerZaehlerText) && /Article 6\(1\)\(f\) GDPR/.test(legalEn.anonymerZaehlerText), 'Englischer Absatz passt zum deutschen.');

console.log(`Teil 1: ${checks} Prüfungen bestanden.`);

// ---------------------------------------------------------------------------
// 2. Gerendert gegen die lokale Vorschau von dist/
// ---------------------------------------------------------------------------
const dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.log('Teil 2 übersprungen: dist/ fehlt (erst npm run build).');
  process.exit(0);
}

const { preview } = await import('vite');
const { default: puppeteer } = await import('puppeteer');
const server = await preview({ root, logLevel: 'silent', preview: { host: '127.0.0.1', port: 0, strictPort: false, open: false } });
const address = server.httpServer.address();
const origin = `http://127.0.0.1:${address.port}`;
const chromePfad = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'], ...(fs.existsSync(chromePfad) ? { executablePath: chromePfad } : {}) });
const teil2Start = checks;

const consent = (analytics, marketing) => ({ version: 2, decided: true, necessary: true, preferences: { analytics, marketing, google_calendar: false, maps: false, openai: false }, source: 'settings', updatedAt: new Date().toISOString() });
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': '*' };

const neueSeite = async ({ analytics = true, marketing = true, mobil = true, emailjs = 200, kurzcheckApi = 200, leadErfasst = false } = {}) => {
  const page = await browser.newPage();
  const log = { zaehler: [], fremd: [], emailjs: [], ga: [], geoeffnet: [], fehler: [] };
  await page.setViewport(mobil ? { width: 390, height: 844, isMobile: true, hasTouch: true } : { width: 1280, height: 800 });
  await page.evaluateOnNewDocument((state, erfasst) => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    localStorage.setItem('healio:consent:v2', JSON.stringify(state));
    if (erfasst) sessionStorage.setItem('healio:lead-capture:v1', 'captured');
    window.__geoeffnet = [];
    window.open = () => ({ closed: false, opener: null, document: document.implementation.createHTMLDocument(''), location: { replace: (url) => window.__geoeffnet.push(String(url)) }, close() { this.closed = true; } });
    // Links in neue Tabs nicht wirklich öffnen; React-Handler laufen vorher.
    document.addEventListener('click', (event) => {
      const link = event.target.closest && event.target.closest('a[target="_blank"]');
      if (link) event.preventDefault();
    });
  }, consent(analytics, marketing), leadErfasst);
  page.on('pageerror', (error) => log.fehler.push(error.message));
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const url = new URL(request.url());
    if (url.origin === origin && url.pathname === '/api/zaehler') {
      log.zaehler.push({ body: JSON.parse(request.postData() || '{}'), keepalive: true });
      await request.respond({ status: 204, body: '' });
      return;
    }
    if (url.origin === origin && url.pathname === '/api/kurzcheck-lead') {
      await request.respond({ status: kurzcheckApi, contentType: 'application/json', body: kurzcheckApi === 200 ? '{"ok":true}' : '{"error":"storage_failed"}' });
      return;
    }
    if (url.origin === origin && url.pathname.startsWith('/api/')) {
      await request.respond({ status: 204, body: '' });
      return;
    }
    if (url.hostname === 'api.emailjs.com') {
      if (request.method() === 'OPTIONS') { await request.respond({ status: 204, headers: cors }); return; }
      log.emailjs.push(url.pathname);
      await request.respond({ status: emailjs, headers: cors, contentType: 'text/plain', body: emailjs === 200 ? 'OK' : 'Mock rejected' });
      return;
    }
    if (url.hostname === 'www.googletagmanager.com') {
      log.ga.push(url.pathname);
      await request.respond({ status: 200, contentType: 'application/javascript', body: '/* GA4-Attrappe */' });
      return;
    }
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) { await request.continue(); return; }
    log.fremd.push(`${request.method()} ${url.hostname}`);
    await request.abort();
  });
  return { page, log };
};
const bereit = async (page, pfad) => {
  await page.goto(origin + pfad, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => Object.keys(document.getElementById('root') || {}).some((key) => key.startsWith('__reactContainer')), { timeout: 20000 });
  await new Promise((resolve) => setTimeout(resolve, 1200));
};
const leadEvents = (page) => page.evaluate(() => (window.dataLayer || []).map((entry) => Array.from(entry)).filter(([command, name]) => command === 'event' && name === 'generate_lead').map(([, , params]) => params));
const warte = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const kurzcheckAusfuellen = async (page) => {
  for (let schritt = 0; schritt < 2; schritt += 1) {
    await page.waitForSelector('#check-frage');
    const buttons = await page.$$('section[aria-labelledby="check-frage"] button[aria-pressed]');
    await buttons[buttons.length - 1].click();
    await warte(450);
  }
  await page.waitForSelector('#check-vorname');
  await page.type('#check-vorname', 'Prüffall');
  await page.type('#check-email', 'pruefung@example.invalid');
  await page.click('#check-einwilligung');
  await page.click('form button[type="submit"]');
};

try {
  // R1: Art.-9-Ratgeber, mobil, volle Einwilligung: Zähler ja, GA4 still.
  {
    const { page, log } = await neueSeite();
    await bereit(page, '/ratgeber/barmer-osteopathie');
    check(log.ga.length === 0, 'Gesperrter Ratgeber lädt kein GA4, auch mit Einwilligung.');
    const kopfLink = await page.$('header a[href="/ambulant"], header a[href^="/ambulant"]');
    if (kopfLink) {
      await page.evaluate(() => { document.querySelector('header a[href^="/ambulant"]').addEventListener('click', (event) => event.preventDefault(), { once: true }); });
      await kopfLink.evaluate((link) => link.click());
      await warte(300);
      check(log.zaehler.length === 0, 'Kopfzeilen-Link zählt nicht als Leistungsweg.');
    }
    await page.$eval('[data-leistungsweg="mitte"] a', (link) => link.click());
    await page.waitForFunction(() => window.location.pathname === '/ambulant', { timeout: 10000 });
    await warte(500);
    check(log.zaehler.length === 1, `Ein Klick auf den Hinweis zählt genau einmal (${log.zaehler.length}).`);
    check(JSON.stringify(log.zaehler[0]?.body) === JSON.stringify({ ereignis: 'leistungsweg_klick', von_pfad: '/ratgeber/barmer-osteopathie', ziel: '/ambulant' }), `Zähler-Inhalt Leistungsweg: ${JSON.stringify(log.zaehler[0]?.body)}`);
    check(log.fehler.length === 0, `Keine Seitenfehler: ${log.fehler.join(' | ')}`);
    await page.close();
  }

  // R2: Kurzcheck Naturheilkunde, Versand klappt, volle Einwilligung.
  {
    const { page, log } = await neueSeite({ mobil: false });
    await bereit(page, '/check/naturheilkunde');
    check((await leadEvents(page)).length === 0, 'Kein generate_lead vor dem Absenden.');
    await kurzcheckAusfuellen(page);
    await page.waitForFunction(() => window.location.pathname === '/check/naturheilkunde/danke', { timeout: 15000 });
    await warte(800);
    const events = await leadEvents(page);
    check(log.emailjs.length === 1, 'Kurzcheck geht einmal per EmailJS raus (Attrappe).');
    check(events.length === 1, `Genau ein generate_lead nach erfolgreichem Absenden (${events.length}).`);
    const erlaubt = new Set(['component', 'placement', 'page_location', 'page_path', 'page_referrer', 'send_to']);
    check(events[0] && Object.keys(events[0]).every((key) => erlaubt.has(key)) && events[0].component === 'meta_check' && events[0].placement === 'naturheilkunde', `generate_lead nur mit festen Werten: ${JSON.stringify(events[0])}`);
    check(!/pr%C3%BCffall|prüffall|example\.invalid|barmer|tk\b|aok|andere|osteopathie|alles/i.test(JSON.stringify(events[0])), 'generate_lead ohne Name, Kontakt, Kasse oder Antwort.');
    const kz = log.zaehler.filter((z) => z.body.ereignis === 'kurzcheck_abgeschickt');
    check(kz.length === 1 && JSON.stringify(kz[0].body) === JSON.stringify({ ereignis: 'kurzcheck_abgeschickt', von_pfad: '/check/naturheilkunde', ziel: 'naturheilkunde' }), `Anonymer Kurzcheck-Zähler: ${JSON.stringify(kz.map((z) => z.body))}`);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await warte(1500);
    check((await leadEvents(page)).length === 0, 'Neu laden der Dankeseite zählt keinen zweiten Lead.');
    await page.close();
  }

  // R3: Versand scheitert: kein Lead, kein Zähler.
  {
    const { page, log } = await neueSeite({ mobil: false, emailjs: 500 });
    await bereit(page, '/check/naturheilkunde');
    await kurzcheckAusfuellen(page);
    await page.waitForSelector('form [role="alert"]', { timeout: 15000 });
    await warte(500);
    check((await leadEvents(page)).length === 0, 'Gescheiterter Versand löst kein generate_lead aus.');
    check(log.zaehler.length === 0, 'Gescheiterter Versand wird nicht gezählt.');
    check(await page.evaluate(() => window.location.pathname) === '/check/naturheilkunde', 'Gescheiterter Versand bleibt auf dem Formular.');
    await page.close();
  }

  // R4: Ohne Einwilligung: anonymer Zähler ja, GA4 nein.
  {
    const { page, log } = await neueSeite({ analytics: false, marketing: false });
    await bereit(page, '/check/naturheilkunde');
    await kurzcheckAusfuellen(page);
    await page.waitForFunction(() => window.location.pathname === '/check/naturheilkunde/danke', { timeout: 15000 });
    await warte(800);
    check(log.ga.length === 0 && (await leadEvents(page)).length === 0, 'Ohne Statistik-Einwilligung: kein GA4 und kein generate_lead.');
    check(log.zaehler.filter((z) => z.body.ereignis === 'kurzcheck_abgeschickt').length === 1, 'Ohne Einwilligung zählt der anonyme Zähler trotzdem.');
    await page.close();
  }

  // R5: Schwangeren-Check: EU-Weg, nichts an GA4 oder Meta, Zähler mit Variante.
  {
    const { page, log } = await neueSeite();
    await bereit(page, '/check/schwangerschaft');
    await kurzcheckAusfuellen(page);
    await page.waitForFunction(() => window.location.pathname === '/check/schwangerschaft/danke', { timeout: 15000 });
    await warte(800);
    check(log.ga.length === 0 && log.emailjs.length === 0, 'Schwangeren-Check: kein GA4, keine Mail über EmailJS.');
    check(!log.fremd.some((entry) => /facebook|google/.test(entry)), `Schwangeren-Check: nichts an Meta oder Google: ${log.fremd.join(', ')}`);
    check((await leadEvents(page)).length === 0, 'Schwangeren-Check: kein generate_lead.');
    const kz = log.zaehler.map((z) => z.body);
    check(kz.length === 1 && kz[0].ziel === 'schwangerschaft' && kz[0].von_pfad === '/check/schwangerschaft', `Schwangeren-Check zählt anonym: ${JSON.stringify(kz)}`);
    await page.close();
  }

  // R6: SDK-Rechner öffnen auf /ambulant (Leitfaden schon angefordert).
  {
    const { page, log } = await neueSeite({ analytics: false, marketing: false, leadErfasst: true });
    await bereit(page, '/ambulant');
    const geklickt = await page.evaluate(() => {
      const link = [...document.querySelectorAll('a[href*="insurances-online.levelnine.biz"]')].find((item) => item.offsetParent !== null);
      if (!link) return false;
      link.click();
      return true;
    });
    check(geklickt, 'Sichtbarer SDK-Knopf auf /ambulant gefunden.');
    await warte(600);
    const sdk = log.zaehler.filter((z) => z.body.ereignis === 'sdk_klick').map((z) => z.body);
    check(sdk.length === 1 && JSON.stringify(sdk[0]) === JSON.stringify({ ereignis: 'sdk_klick', von_pfad: '/ambulant', ziel: null }), `SDK-Klick zählt anonym: ${JSON.stringify(sdk)}`);
    check((await page.evaluate(() => window.__geoeffnet.length)) === 1, 'Der Rechner wird weiter geöffnet (Attrappe).');
    await page.close();
  }

  // R8: Zahn-Check auf /zahn bis zum Ergebnis, Antrag öffnen (Leitfaden schon
  // angefordert, ohne Einwilligung): versicherer_klick nur mit Pfad und Versicherer.
  for (const [antworten, versicherer, host] of [[[0, 0, 1], 'bayerische', 'diebayerische.de'], [[2, 0, 1, 0], 'ukv', 'levelnine.biz']]) {
    const { page, log } = await neueSeite({ analytics: false, marketing: false, leadErfasst: true, mobil: false });
    await bereit(page, '/zahn');
    for (const index of antworten) {
      await page.waitForFunction(() => document.querySelectorAll('#zahn-check-karte button[type="button"]').length > 1, { timeout: 10000 });
      await page.evaluate((i) => {
        const optionen = [...document.querySelectorAll('#zahn-check-karte .grid > button[type="button"]')];
        optionen[i].click();
      }, index);
      await warte(900);
    }
    const geklickt = await page.evaluate((h) => {
      const link = [...document.querySelectorAll('#zahn-check-karte a[href]')].find((item) => item.href.includes(h));
      if (!link) return false;
      link.click();
      return true;
    }, host);
    check(geklickt, `Zahn-Check zeigt den Antragslink zu ${versicherer}.`);
    await warte(600);
    const vk = log.zaehler.filter((z) => z.body.ereignis === 'versicherer_klick').map((z) => z.body);
    check(vk.length === 1 && JSON.stringify(vk[0]) === JSON.stringify({ ereignis: 'versicherer_klick', von_pfad: '/zahn', ziel: versicherer }), `Zahn-Check zählt anonym: ${JSON.stringify(vk)}`);
    check(log.zaehler.length === 1, `Antworten im Zahn-Check lösen keine Zählung aus (${log.zaehler.length}).`);
    check(log.ga.length === 0 && !log.fremd.some((entry) => /facebook|google/.test(entry)), 'Zahn-Check ohne Einwilligung: nichts an Google oder Meta.');
    check((await page.evaluate(() => window.__geoeffnet.length)) === 1, 'Der Antrag wird weiter geöffnet (Attrappe).');
    check(log.fehler.length === 0, `Keine Seitenfehler: ${log.fehler.join(' | ')}`);
    await page.close();
  }

  // R7: Sprungmarke aus dem Ratgeber auf /stationaer, mobil und Desktop
  // (Wegprüfung 02.11.2026: mobil landete der Besucher oben).
  for (const [mobil, ziel] of [[true, '/stationaer#familie'], [false, '/stationaer#familie'], [true, '/stationaer#tarife']]) {
    const { page } = await neueSeite({ analytics: false, marketing: false, mobil });
    await bereit(page, '/ratgeber/familienzimmer-krankenhaus');
    const vorhanden = await page.evaluate((href) => {
      const link = [...document.querySelectorAll(`a[href="${href}"]`)].find((item) => item.offsetParent !== null) || document.querySelector(`a[href="${href}"]`);
      if (!link) return false;
      link.click();
      return true;
    }, ziel);
    if (!vorhanden) {
      // Nicht jede Karte steht in diesem Ratgeber; dann über die Adresszeile.
      await page.evaluate((href) => { window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')); }, ziel);
    }
    await page.waitForFunction(() => window.location.pathname === '/stationaer', { timeout: 10000 });
    await warte(3000);
    const lage = await page.evaluate((id) => {
      const target = document.getElementById(id);
      if (!target) return null;
      return { oben: Math.round(target.getBoundingClientRect().top), abstand: parseFloat(getComputedStyle(target).scrollMarginTop) || 0, y: Math.round(window.scrollY) };
    }, ziel.split('#')[1]);
    check(lage && lage.y > 0 && Math.abs(lage.oben - lage.abstand) <= 8, `${ziel} ${mobil ? 'mobil' : 'Desktop'}: Abschnitt steht oben im Bild (${JSON.stringify(lage)}).`);
    await page.close();
  }
  console.log(`Teil 2: ${checks - teil2Start} Prüfungen bestanden (${origin}).`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

console.log(`Anfrage-Ereignis und anonymer Zähler: ${checks} Prüfungen bestanden.`);
