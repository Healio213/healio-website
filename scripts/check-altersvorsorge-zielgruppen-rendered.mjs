/**
 * Unsichtbare Prüfung der Anfrageseiten unter /altersvorsorgedepot/…
 * (Seitenplan: Healio/Altersvorsorgedepot-Funnel/UNTERSEITEN-SEITENPLAN.md)
 *
 * - startet Vite nur für die Dauer der Prüfung, außer HEALIO_ZIELGRUPPEN_URL
 *   zeigt auf eine laufende lokale Vorschau (zum Beispiel vite preview)
 * - Desktop 1440 px und Handy 390 px, helles Farbschema, Chrome ohne Fenster
 * - keine Konsolenfehler, kein seitliches Scrollen, Schrift und Tippflächen
 * - Formular erst nach „Berechnung speichern“, Einwilligung nicht vorbelegt,
 *   kein Absenden und keine Schreibanfrage
 * - Textüberschneidung der Unterseiten über Fünf-Wort-Folgen, Ziel unter 10 %
 *
 * Externe Anfragen werden lokal mit 204 beantwortet, Schreibanfragen gezählt.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { zielgruppenSeiten } from '../src/content/altersvorsorgeZielgruppen/index.js';

const SHOTS = process.env.HEALIO_QA_DIR
  ? new URL(`file://${process.env.HEALIO_QA_DIR.replace(/\/?$/, '/')}`)
  : new URL('../../qa/altersvorsorge-zielgruppen/', import.meta.url);
const GRENZE_UEBERSCHNEIDUNG = 0.10;
const SHINGLE = 5;

let vite = null;
let origin = process.env.HEALIO_ZIELGRUPPEN_URL ? new URL(process.env.HEALIO_ZIELGRUPPEN_URL).origin : null;
if (origin) {
  assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'Nur eine lokale Vorschau ist zulässig');
} else {
  const { createServer } = await import('vite');
  const port = Number(process.env.HEALIO_ZIELGRUPPEN_PORT || 4931);
  vite = await createServer({ logLevel: 'error', server: { host: '127.0.0.1', port, strictPort: true, hmr: false } });
  await vite.listen();
  origin = `http://127.0.0.1:${port}`;
}

const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox', '--hide-scrollbars'] });
const ergebnisse = [];
const fehler = [];
const schreibanfragen = [];

const pfade = [...zielgruppenSeiten.map((seite) => `/altersvorsorgedepot/${seite.slug}`), '/altersvorsorgedepot'];

async function oeffne(pfad, breite) {
  const page = await browser.newPage();
  const mobil = breite < 768;
  await page.setViewport({ width: breite, height: mobil ? 844 : 900, isMobile: mobil, hasTouch: mobil, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  const konsole = [];
  const fehlerAntworten = [];
  page.on('response', (response) => { if (response.status() >= 400) fehlerAntworten.push(`${response.status()} ${response.url()}`); });
  page.on('console', (message) => { if (message.type() === 'error') konsole.push(message.text()); });
  page.on('pageerror', (error) => konsole.push(`pageerror: ${error.message}`));
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = new URL(request.url());
    const lokal = url.origin === origin || url.protocol === 'data:' || url.protocol === 'blob:';
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method())) schreibanfragen.push(`${request.method()} ${url.href}`);
    if (lokal && !url.pathname.startsWith('/api/')) return request.continue();
    return request.respond({ status: 204, body: '' });
  });
  await page.goto(`${origin}${pfad}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('main h1', { timeout: 30000 });
  // Zustimmungsbanner o. Ä. nicht anklicken: Wir prüfen den Erstaufruf.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { page, konsole, fehlerAntworten };
}

const messeLayout = (page) => page.evaluate(() => {
  const doc = document.documentElement;
  const main = document.querySelector('main');
  const zuKlein = [];
  const zuKleineFlaechen = [];
  for (const element of main.querySelectorAll('p, li, a, button, label, h1, h2, h3, span')) {
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height || !element.textContent.trim()) continue;
    const eigenerText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
    if (eigenerText && parseFloat(getComputedStyle(element).fontSize) < 16) zuKlein.push(`${element.tagName.toLowerCase()}: ${element.textContent.trim().slice(0, 50)}`);
  }
  for (const element of main.querySelectorAll('a[href], button')) {
    const rect = element.getBoundingClientRect();
    if (rect.width && rect.height && (rect.height < 44 || rect.width < 44) && getComputedStyle(element).visibility !== 'hidden') {
      zuKleineFlaechen.push(`${element.tagName.toLowerCase()} ${Math.round(rect.width)}x${Math.round(rect.height)}: ${(element.textContent || element.getAttribute('aria-label') || '').trim().slice(0, 40)}`);
    }
  }
  return {
    innerWidth: window.innerWidth,
    scrollWidth: Math.max(doc.scrollWidth, document.body.scrollWidth),
    hoehe: doc.scrollHeight,
    h1: document.querySelector('main h1')?.textContent.trim(),
    formularSichtbar: Boolean(document.querySelector('[data-altersvorsorge-vormerkung]')),
    zuKlein: [...new Set(zuKlein)],
    zuKleineFlaechen: [...new Set(zuKleineFlaechen)],
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    abschnitte: [...main.querySelectorAll(':scope > section, :scope > div > section')].map((section) => Math.round(section.getBoundingClientRect().height)),
  };
});

// Fortlaufender Text der Seite, so wie er im HTML steht: alle Textknoten der
// Seite ohne Kopf- und Fußzeile, auch zugeklappte Antworten der Fragen.
const seitenText = (page) => page.evaluate(() => {
  const root = document.querySelector('[data-altersvorsorge-zielgruppe]') || document.querySelector('main main') || document.querySelector('main');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => (node.parentElement?.closest('script, style, noscript') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const teile = [];
  while (walker.nextNode()) teile.push(walker.currentNode.textContent);
  return teile.join(' ');
});

// Meldungen, die nur der Entwicklungsserver erzeugt (React-Strict-Mode,
// Editor-Plugin von Vite). Gegen den Produktionsbuild zählen sie als Fehler.
const NUR_ENTWICKLUNG = [/UNSAFE_componentWillMount in strict mode/, /visual-editor-config\.js/];

for (const pfad of pfade) {
  const slug = pfad.split('/').pop();
  const inhalt = zielgruppenSeiten.find((seite) => seite.slug === slug);
  for (const breite of [1440, 390]) {
    const { page, konsole: rohKonsole, fehlerAntworten } = await oeffne(pfad, breite);
    const entwicklung = Boolean(vite);
    const nurEntwicklung404 = fehlerAntworten.length > 0 && fehlerAntworten.every((zeile) => NUR_ENTWICKLUNG.some((muster) => muster.test(zeile)));
    const konsole = rohKonsole.filter((zeile) => !(entwicklung && (NUR_ENTWICKLUNG.some((muster) => muster.test(zeile)) || (nurEntwicklung404 && /Failed to load resource/.test(zeile)))));
    const layout = await messeLayout(page);
    const eintrag = { pfad, breite, ...layout, konsole, entwicklungsMeldungen: rohKonsole.length - konsole.length, fehlerAntworten };
    if (inhalt) {
      if (layout.h1 !== inhalt.hero.h1) fehler.push(`${pfad} ${breite}: H1 weicht ab`);
      if (layout.formularSichtbar) fehler.push(`${pfad} ${breite}: Formular steht schon vor dem Rechnen auf der Seite`);
      if (!layout.canonical?.endsWith(pfad)) fehler.push(`${pfad} ${breite}: Canonical ${layout.canonical}`);
      if (breite === 1440) eintrag.text = await seitenText(page);
      // Weg zur Anfrage: Rechner-Knopf öffnet das bestehende Kurzformular.
      const knopf = await page.$('#rechner button.bg-white');
      if (!knopf) fehler.push(`${pfad} ${breite}: Knopf im Rechner fehlt`);
      else {
        await knopf.click();
        await page.waitForSelector('[data-altersvorsorge-vormerkung] form', { timeout: 10000 });
        const formular = await page.evaluate(() => {
          const root = document.querySelector('[data-altersvorsorge-vormerkung]');
          const consent = root.querySelector('input[name="consent"]');
          return { consentVorbelegt: consent?.checked, consentText: consent?.closest('label')?.textContent || '', ueberschrift: root.querySelector('h3')?.textContent };
        });
        if (formular.consentVorbelegt !== false) fehler.push(`${pfad} ${breite}: Einwilligung vorbelegt oder fehlt`);
        if (!/Diese Einwilligung kann ich jederzeit für die Zukunft widerrufen/.test(formular.consentText)) fehler.push(`${pfad} ${breite}: Einwilligungstext fehlt`);
        if (formular.ueberschrift !== inhalt.vormerkung.ueberschrift) fehler.push(`${pfad} ${breite}: Formularüberschrift weicht ab`);
        const nachher = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
        if (nachher > breite + 1) fehler.push(`${pfad} ${breite}: seitliches Scrollen mit offenem Formular (${nachher})`);
        eintrag.formular = formular;
      }
    }
    if (layout.scrollWidth > layout.innerWidth + 1) fehler.push(`${pfad} ${breite}: seitliches Scrollen (${layout.scrollWidth} > ${layout.innerWidth})`);
    if (konsole.length) fehler.push(`${pfad} ${breite}: Konsole: ${konsole.join(' | ')}`);
    await mkdir(SHOTS, { recursive: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: new URL(`${slug || 'hauptseite'}-${breite}.png`, SHOTS).pathname, fullPage: true });
    ergebnisse.push(eintrag);
    await page.close();
  }
}

await browser.close();
if (vite) await vite.close();

// Textüberschneidung wie bei gängigen Duplicate-Content-Prüfungen: Der
// ganze Seitentext (ohne Kopf- und Fußzeile, mit Rechner, Knöpfen, Quellen
// und zugeklappten Antworten) wird als ein Wortstrom gelesen. Ein Wort zählt
// als doppelt, wenn es in einer Fünf-Wort-Folge steht, die auch auf einer
// anderen Unterseite vorkommt.
const woerter = (text) => text.toLowerCase().replace(/[^\p{L}\p{N}%]+/gu, ' ').trim().split(/\s+/).filter(Boolean);
const folgen = (w) => {
  const keys = [];
  for (let i = 0; i + SHINGLE <= w.length; i += 1) keys.push(w.slice(i, i + SHINGLE).join(' '));
  return keys;
};
const unterseitenText = ergebnisse.filter((e) => e.text && e.pfad !== '/altersvorsorgedepot').map((e) => ({ pfad: e.pfad, w: woerter(e.text) }));
const mengen = new Map(unterseitenText.map((e) => [e.pfad, new Set(folgen(e.w))]));
const anteil = (pfad, vergleich) => {
  const { w } = unterseitenText.find((e) => e.pfad === pfad);
  const mark = new Array(w.length).fill(false);
  folgen(w).forEach((key, i) => { if (vergleich.some((set) => set.has(key))) for (let j = i; j < i + SHINGLE; j += 1) mark[j] = true; });
  return { gesamt: w.length, anteil: mark.filter(Boolean).length / w.length };
};
const ueberschneidung = unterseitenText.map((e) => {
  const andere = [...mengen.entries()].filter(([pfad]) => pfad !== e.pfad);
  const gegenAlle = anteil(e.pfad, andere.map(([, set]) => set));
  const paarweise = andere.map(([pfad, set]) => ({ mit: pfad, anteil: anteil(e.pfad, [set]).anteil })).sort((a, b) => b.anteil - a.anteil);
  return { pfad: e.pfad, woerter: gegenAlle.gesamt, gegenAlleAnderen: gegenAlle.anteil, hoechstesPaar: paarweise[0] };
});
for (const zeile of ueberschneidung) {
  if (zeile.gegenAlleAnderen >= GRENZE_UEBERSCHNEIDUNG) fehler.push(`${zeile.pfad}: Textüberschneidung ${(zeile.gegenAlleAnderen * 100).toFixed(1)} % (Grenze 10 %)`);
}

const bericht = {
  geprueft: new Date().toISOString(),
  origin,
  schreibanfragen,
  seiten: ergebnisse.map(({ text, ...rest }) => rest),
  ueberschneidung: ueberschneidung.map((zeile) => ({
    ...zeile,
    gegenAlleAnderen: `${(zeile.gegenAlleAnderen * 100).toFixed(1)} %`,
    hoechstesPaar: `${(zeile.hoechstesPaar.anteil * 100).toFixed(1)} % mit ${zeile.hoechstesPaar.mit}`,
  })),
  fehler,
};
await writeFile(new URL('bericht.json', SHOTS), JSON.stringify(bericht, null, 2));
await writeFile(new URL('seitentexte.json', SHOTS), JSON.stringify(Object.fromEntries(unterseitenText.map((e) => [e.pfad, e.w.join(' ')])), null, 1));

console.log('Textüberschneidung (Hauptbereich, Fünf-Wort-Folgen):');
for (const zeile of bericht.ueberschneidung) console.log(`  ${zeile.pfad.padEnd(40)} ${String(zeile.woerter).padStart(5)} Wörter  gegen alle: ${zeile.gegenAlleAnderen.padStart(7)}  höchstes Paar: ${zeile.hoechstesPaar}`);
for (const seite of bericht.seiten) {
  console.log(`${seite.pfad} @${seite.breite}: Breite ${seite.scrollWidth}/${seite.innerWidth}, Höhe ${seite.hoehe}, Konsole ${seite.konsole.length}, Schrift <16px ${seite.zuKlein.length}, kleine Tippflächen ${seite.zuKleineFlaechen.length}`);
}
if (schreibanfragen.length) fehler.push(`Schreibanfragen: ${schreibanfragen.join(', ')}`);
if (fehler.length) {
  console.error('\nFEHLER:\n' + fehler.map((zeile) => `- ${zeile}`).join('\n'));
  process.exit(1);
}
console.log(`\nAlle Prüfungen bestanden. Bericht und Bildschirmfotos: ${SHOTS.pathname}`);
