/**
 * Regelprüfung der Zahn-Anlassseite /zahn/behandlung-steht-an ohne Browser.
 * Grundlage: Healio/Zahn-Mikroseiten/SEITENPLAN-BEHANDLUNG-STEHT-AN.md
 * (Kopfdaten 2, Texte 3, Zuordnung 6.1, Sperrlisten 6.3, SEO 6.4, Verbote 1.3).
 *
 * - Kopfdaten (Titel, Beschreibung, H1, Brotkrume, Canonical) wie im Plan
 * - keine Gedankenstriche, keine Sperrwörter, echte Umlaute
 * - verbotene Aussagen aus Plan 1.3 kommen nicht vor
 * - FAQ im Schema = sichtbare Fragen, sieben Fragen
 * - Ratgeber-Zuordnung: jeder Slug existiert, jedes Ziel existiert, keiner der
 *   ausgeschlossenen Slugs steht drin, Titel stimmen mit dem Register überein
 * - Ausschlusslisten, Zähler-Seitenliste, Sitemap, SEO-Route
 * - Abschlussknöpfe: nur BAYERISCHE_URL, Zähler-Ereignis, kein Google Ads
 * - mit vorhandenem dist/: gerendertes HTML der Seite (nur lesend)
 *
 * Ausführen: npm run test:zahn-anlaesse (vorher npm run build für den letzten Teil)
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { zahnAnlassSeiten, QUELLEN, RATGEBER_TITEL, ANLAESSE } from '../src/content/zahnAnlaesse/index.js';
import { zahnAnlassSchema, zahnAnlassSeoRoute } from '../src/content/zahnAnlaesse/seo.js';
import { ZAHN_RATGEBER_EINSTIEGE, ZAHN_RATGEBER_AUSGESCHLOSSEN } from '../src/content/zahnAnlaesse/ratgeberZuordnung.js';
import { LEISTUNGSSEITEN } from '../shared/anonyme-zaehler.js';
import { seoRoutes } from './seo-routes.mjs';

const PFAD = '/zahn/behandlung-steht-an';
const lies = (pfad) => readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');
const seite = zahnAnlassSeiten.find((eintrag) => eintrag.slug === 'behandlung-steht-an');

const TECHNISCH = new Set(['slug', 'key', 'motiv', 'quelle', 'to', 'id', 'value', 'weiterlesen', 'herkunft', 'startThema', 'nr']);
const texteVon = (wert, pfad = '') => {
  if (typeof wert === 'string') return [{ pfad, text: wert }];
  if (Array.isArray(wert)) return wert.flatMap((eintrag, index) => texteVon(eintrag, `${pfad}[${index}]`));
  if (wert && typeof wert === 'object') {
    return Object.entries(wert).flatMap(([schluessel, eintrag]) => (TECHNISCH.has(schluessel) ? [] : texteVon(eintrag, pfad ? `${pfad}.${schluessel}` : schluessel)));
  }
  return [];
};
const alleTexte = texteVon(seite);

test('Kopfdaten stimmen mit dem Seitenplan überein', () => {
  assert.equal(seite.seo.title, 'Zahnzusatzversicherung sofort: Zuschuss berechnen | Healio');
  assert.equal(seite.seo.title.length, 58);
  assert.equal(seite.seo.description, 'Heil- und Kostenplan schon da? Rechne aus, was ZAHN Sofort der Bayerischen zahlt: bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR.');
  assert.equal(seite.seo.description.length, 141);
  assert.equal(seite.hero.h1, 'Behandlung schon angeraten? Mit Sofortschutz zahlt der Versicherer bis zu 1.500 EUR mit.');
  assert.equal(seite.seo.ogImageAlt, 'Healio: Sofortschutz bei angeratener Zahnbehandlung nachrechnen');
  assert.equal(seite.hero.brotkrume, 'Behandlung steht an');
  const route = zahnAnlassSeoRoute(seite);
  assert.equal(route.path, PFAD);
  assert.equal(route.canonical, `https://healio.de${PFAD}`);
  assert.notEqual(route.robots, 'noindex, nofollow', 'Seite wird indexiert');
  assert.ok(!('robots' in route) || /^index/.test(route.robots));
});

test('Gedankenstriche, Sperrwörter und fehlende Umlaute kommen nicht vor', () => {
  const sperren = [
    [/[–—]|\s-\s/, 'Gedankenstrich'],
    [/\bsicher\w*|\bsicherheit/i, 'sicher'],
    [/garantiert|garantie\b/i, 'garantiert'],
    [/testsieger|siegel/i, 'Testsieger oder Siegel'],
    [/\b(?:ergo|da direkt|dadirekt|allianz|debeka|signal iduna|huk)\b/i, 'Fremdversicherer'],
    [/versorgungswerk/i, 'Versorgungswerk'],
    [/\b(?:fuer|ueber|koennen|moeglich|muessen|waehrend|zurueck|haelt|Rueck)\b/i, 'fehlende Umlaute'],
    [/kostenlos|gratis|umsonst/i, 'Gratis-Versprechen'],
  ];
  for (const { pfad, text } of alleTexte) {
    for (const [muster, grund] of sperren) assert.doesNotMatch(text, muster, `${pfad}: ${grund} in „${text}“`);
  }
});

test('Verbotene Aussagen aus Plan 1.3 stehen nicht auf der Seite', () => {
  const alles = alleTexte.map((eintrag) => eintrag.text).join('\n');
  assert.doesNotMatch(alles, /bis zur Rechnung|vor der Rechnung abschlie|Abschluss vor der Rechnung/i, 'Der Versicherungsbeginn zählt, nicht der Abschluss');
  assert.doesNotMatch(alles, /ohne Gesundheitsfragen|keine Gesundheitsfragen/i);
  assert.doesNotMatch(alles, /Implantat|Brücke|Sofortschutz für fehlende/i, 'Kein Implantat-Beispiel, kein Sofortschutz für fehlende Zähne');
  // „keine Wartezeit“ nur für den Baustein: einzige Stelle ist die Faktenkarte mit dem Titel „im Baustein“
  const wartezeiten = alleTexte.filter((eintrag) => /Wartezeit/i.test(eintrag.text));
  assert.equal(wartezeiten.length, 1, 'Wartezeit kommt genau einmal vor');
  const wartezeitKarte = seite.fakten.karten.find((karte) => /Wartezeit/i.test(karte.wert));
  assert.equal(wartezeitKarte.titel, 'im Baustein');
  // „bis zu 1.500 EUR“ nie ohne „bis zu“ oder „insgesamt“ und nie als Jahresbetrag
  for (const treffer of alles.matchAll(/.{0,25}1\.500 EUR.{0,25}/g)) assert.match(treffer[0], /bis zu|insgesamt|zusammen/i, `1.500 EUR ohne „bis zu“: ${treffer[0]}`);
  assert.doesNotMatch(alles, /Euro-Festzuschuss|Festzuschuss von \d/i);
  assert.doesNotMatch(alles, /Healio verdient|Provision|Courtage/i, 'Kein Thema für die Seite: Verdienst');
  // Beitragszahlen des Zahntarifs nur mit Stand 07.2026 und Alter und Wohnort
  assert.match(seite.rechner.ergebnis.vergleich, /Stand 07\.2026/);
  assert.match(seite.rechner.ergebnis.vergleich, /Alter und Wohnort/);
});

test('Sichtbare Texte kommen wortgleich aus dem Seitenplan', () => {
  const plan = {
    eyebrow: 'Sofortschutz der Bayerischen',
    knopfRechner: 'Meinen Plan nachrechnen',
    knopfAbschluss: 'Gleich online abschließen',
    vertrauenszeile: 'Bedingungen der Bayerischen verlinkt · Rechner ohne Anmeldung, nichts wird gespeichert · Healio ist Versicherungsmakler',
  };
  for (const [feld, wert] of Object.entries(plan)) assert.equal(seite.hero[feld], wert, `hero.${feld}`);
  assert.equal(seite.hero.karte.titel, 'ZAHN Sofort auf einen Blick');
  assert.deepEqual(seite.hero.karte.kacheln.map((kachel) => kachel.wert), ['bis zu 750 EUR', 'bis zu 1.500 EUR', '29,90 EUR']);
  assert.equal(seite.ablauf.schritte.length, 4);
  assert.deepEqual(seite.ablauf.schritte.map((schritt) => schritt.motiv), ['document', 'calculator', 'choice', 'calendar']);
  assert.equal(seite.fakten.karten.length, 5);
  assert.equal(seite.passt.passtItems.length, 5);
  assert.equal(seite.passt.passtNichtItems.length, 5);
  assert.equal(seite.rueckruf.herkunft, PFAD);
  assert.equal(seite.rueckruf.startThema, 'angeraten');
  assert.equal(seite.quellen.length, 7);
  assert.equal(seite.rechner.abschluss.knopf, 'Bei der Bayerischen online abschließen');
  for (const nr of ['p1', 'p2', 'p3', 'p4', 'p5']) assert.ok(seite.rechner.pflichtsaetze[nr].length > 40, `Pflichtsatz ${nr}`);
});

test('FAQ: sieben Fragen, Schema gleich sichtbarem Text', () => {
  assert.equal(seite.faq.length, 7);
  const faqSchema = zahnAnlassSchema(seite).find((eintrag) => eintrag['@type'] === 'FAQPage');
  assert.ok(faqSchema, 'FAQPage im Schema');
  assert.deepEqual(
    faqSchema.mainEntity.map((frage) => [frage.name, frage.acceptedAnswer.text]),
    seite.faq.map((frage) => [frage.question, frage.answer]),
  );
  const brotkrume = zahnAnlassSchema(seite).find((eintrag) => eintrag['@type'] === 'BreadcrumbList');
  assert.deepEqual(brotkrume.itemListElement.map((element) => element.name), ['Zahnzusatzversicherung', 'Behandlung steht an']);
  assert.equal(brotkrume.itemListElement[0].item, 'https://healio.de/zahn');
});

test('Quellen und Ratgeber existieren, Titel stimmen mit dem Register überein', async () => {
  for (const karte of seite.fakten.karten) for (const { id } of karte.quelle) assert.ok(QUELLEN[id], `unbekannte Quelle ${id}`);
  for (const { id, wofuer } of seite.quellen) {
    assert.ok(QUELLEN[id], `unbekannte Quelle ${id}`);
    assert.ok(wofuer.length > 5);
    assert.match(QUELLEN[id].href, /^https:\/\/(www\.diebayerische\.de|www\.gesetze-im-internet\.de|www\.recht\.bund\.de)\//);
  }
  assert.deepEqual(seite.weiterlesen, [
    'zahnzusatzversicherung-laufende-behandlung', 'zahnzusatzversicherung-sofort-2026', 'heil-und-kostenplan',
    'bayerische-zahnzusatzversicherung', 'bonusheft-zahnarzt', 'zahnersatz-haertefall',
  ]);
  for (const slug of seite.weiterlesen) {
    assert.ok(RATGEBER_TITEL[slug], `Ratgeber ${slug} ohne Titel`);
    const { article } = await import(`../src/content/ratgeber/${slug}.js`);
    assert.equal(RATGEBER_TITEL[slug], article.listTitle, `Titel von ${slug} weicht vom Register ab`);
  }
});

test('Ratgeber-Zuordnung: Slugs und Ziele existieren, Ausschlüsse stehen nicht drin', () => {
  const slugs = Object.keys(ZAHN_RATGEBER_EINSTIEGE);
  assert.equal(slugs.length, 15);
  for (const slug of slugs) {
    assert.ok(existsSync(new URL(`../src/content/ratgeber/${slug}.js`, import.meta.url)), `Ratgeberdatei ${slug} fehlt`);
    for (const ziel of ZAHN_RATGEBER_EINSTIEGE[slug]) {
      assert.ok(ANLAESSE.some((anlass) => anlass.slug === ziel), `Ziel ${ziel} fehlt in ANLAESSE`);
      assert.ok(zahnAnlassSeiten.some((eintrag) => eintrag.slug === ziel), `Seite ${ziel} fehlt`);
      assert.ok(seoRoutes.some((route) => route.path === `/zahn/${ziel}`), `SEO-Route für ${ziel} fehlt`);
    }
    assert.ok(!ZAHN_RATGEBER_AUSGESCHLOSSEN.includes(slug), `${slug} ist ausgeschlossen`);
  }
  for (const slug of ZAHN_RATGEBER_AUSGESCHLOSSEN) {
    assert.ok(!(slug in ZAHN_RATGEBER_EINSTIEGE), `${slug} darf nicht zugeordnet sein`);
  }
  for (const slug of slugs) assert.doesNotMatch(slug, /spange|kind|familie|senior|reinigung|implantat|bruecke|prothese|parodontitis|weisheit|fehlender/i, `${slug} gehört zu den ausgeschlossenen Fällen`);
  assert.deepEqual(ANLAESSE[0], {
    slug: 'behandlung-steht-an',
    path: PFAD,
    label: 'Behandlung steht an',
    kurz: 'Heil- und Kostenplan nachrechnen und den Sofortschutz so abschließen, dass der Versicherungsbeginn vor der Rechnung liegt.',
    linkLabel: 'Plan nachrechnen',
    motiv: 'dental',
  });
  const layout = lies('src/components/ratgeber/RatgeberArticleLayout.jsx');
  assert.match(layout, /getZahnRatgeberEinstiege\(article\.slug\)/);
  const leistungsweg = lies('src/content/leistungsweg.js');
  assert.match(leistungsweg, /to: '\/zahn',/, 'Der Leistungsweg-Abschluss bleibt auf /zahn');
});

test('Ausschlusslisten: keine Messung, aber im anonymen Zähler', () => {
  for (const datei of ['src/lib/analytics.js', 'src/lib/meta-pixel.js', 'src/lib/google-ads.js']) {
    assert.ok(lies(datei).includes(`'${PFAD}'`), `${datei}: Sperrliste fehlt`);
  }
  for (const datei of ['src/components/ConsentManager.jsx', 'src/components/Layout.jsx', 'src/lib/lead-capture-copy.js', 'src/lib/nitaContext.js']) {
    assert.ok(lies(datei).includes(`'${PFAD}'`), `${datei}: Eintrag fehlt`);
  }
  assert.ok(!lies('src/lib/rueckruf.js').includes(PFAD), 'Nicht in RUECKRUF_ROUTE_TOPICS');
  assert.ok(LEISTUNGSSEITEN.includes(PFAD), 'Leistungsseite im anonymen Zähler');
  for (const sql of ['docs/supabase/2026-11-02_anonyme_zaehler.sql', 'docs/supabase/2026-11-10_anonyme_zaehler_versicherer_klick.sql']) {
    assert.ok(lies(sql).includes(`'${PFAD}'`), `${sql}: Zielliste fehlt`);
  }
  assert.ok(lies('public/sitemap.xml').includes(`<loc>https://healio.de${PFAD}</loc>`), 'Sitemap');
});

test('Abschlussknöpfe: nur der Link der Bayerischen, nur das anonyme Zähler-Ereignis', () => {
  const quelle = lies('src/pages/ZahnAnlassPage.jsx');
  assert.match(quelle, /BAYERISCHE_URL.*from '@\/components\/sections\/dental\/dentalLinks'|from '@\/components\/sections\/dental\/dentalLinks'/);
  assert.match(quelle, /zaehle\('versicherer_klick', \{ ziel: 'bayerische' \}\)/);
  for (const verboten of ['trackZahnEvent', 'trackGoogleAdsAntrag', 'trackEvent', 'trackMeta', 'localStorage', 'sessionStorage', 'URLSearchParams']) {
    assert.ok(!quelle.includes(verboten), `Seite darf ${verboten} nicht verwenden`);
  }
  assert.ok(!/BAYERISCHE_URL\s*\+|BAYERISCHE_URL\}\?|\$\{BAYERISCHE_URL\}[?&#]/.test(quelle), 'Am Link hängt kein Parameter');
  assert.equal((quelle.match(/href: BAYERISCHE_URL/g) || []).length, 1, 'Ein gemeinsames Attribut für alle Abschlussknöpfe');
});

const DIST = new URL('../dist/zahn/behandlung-steht-an/index.html', import.meta.url);
test('Gerendertes HTML der Seite (nur mit vorhandenem dist/)', { skip: !existsSync(DIST) }, () => {
  const html = readFileSync(DIST, 'utf8');
  assert.match(html, /<title[^>]*>Zahnzusatzversicherung sofort: Zuschuss berechnen \| Healio<\/title>/);
  assert.ok(html.includes(seite.seo.description));
  assert.ok(html.includes(`<link rel="canonical" href="https://healio.de${PFAD}"`) || html.includes(`rel="canonical" href="https://healio.de${PFAD}"`));
  assert.ok(html.includes(seite.hero.h1), 'H1 im HTML');
  assert.match(html, /"@type":"FAQPage"/);
  for (const nr of ['p1', 'p2', 'p3', 'p4']) assert.ok(html.includes(seite.rechner.pflichtsaetze[nr]), `Pflichtsatz ${nr} im HTML`);
  assert.ok(!html.includes(seite.rechner.pflichtsaetze.p5), 'Pflichtsatz P5 fehlt im HTML (Schalter steht auf false)');
  assert.ok(!html.includes(seite.rechner.felder.beginnMonat.label), 'Feld Beginnmonat fehlt im HTML (Schalter steht auf false)');
  assert.doesNotMatch(html, /googletagmanager|connect\.facebook\.net|googleadservices/);
  assert.ok(!/name="robots" content="noindex/.test(html), 'indexierbar');
});
