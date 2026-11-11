/**
 * Regelprüfung der Anlassseite /schwangerschaft/baby-geplant ohne Browser.
 * Grundlage: Healio/Schwangerschaft-Mikroseiten/SEITENPLAN-BABY-GEPLANT.md
 * (Kopfdaten 2, Texte 3, Rechner 4, Abschluss 5, Zuordnung 6.1, Zähler 6.2,
 * Sperrlisten 6.3, SEO 6.4, Verbote 1.4).
 *
 * - Kopfdaten (Titel, Beschreibung, H1, Brotkrume, Canonical) wie im Plan
 * - keine Gedankenstriche, keine Sperrwörter, echte Umlaute
 * - verbotene Aussagen aus Plan 1.4 kommen nicht vor
 * - FAQ im Schema = sichtbare Fragen (sechs, Frage 7 bleibt draußen)
 * - Ratgeber-Zuordnung: jeder Slug existiert, jedes Ziel existiert, keiner der
 *   ausgeschlossenen Slugs steht drin, Titel stimmen mit dem Register überein
 * - Text-Überschneidung mit Ratgebern und /schwangerschaft
 * - Ausschlusslisten, Zähler-Seitenliste, Sitemap, SEO-Route
 * - Abschlussknöpfe: nur die festen Links, nur anonyme Zähler-Ereignisse
 * - mit vorhandenem dist/: gerendertes HTML der Seite (nur lesend)
 *
 * Ausführen: npm run test:schwangerschaft-anlaesse (vorher npm run build für den letzten Teil)
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { schwangerschaftAnlassSeiten, QUELLEN, RATGEBER_TITEL, ANLAESSE } from '../src/content/schwangerschaftAnlaesse/index.js';
import { schwangerschaftAnlassSchema, schwangerschaftAnlassSeoRoute } from '../src/content/schwangerschaftAnlaesse/seo.js';
import { SCHWANGERSCHAFT_RATGEBER_EINSTIEGE, SCHWANGERSCHAFT_RATGEBER_AUSGESCHLOSSEN } from '../src/content/schwangerschaftAnlaesse/ratgeberZuordnung.js';
import { berechneStichtage, formatiereDatum } from '../src/lib/babyGeplantRechner.js';
import { LEISTUNGSSEITEN } from '../shared/anonyme-zaehler.js';
import { seoRoutes } from './seo-routes.mjs';

const PFAD = '/schwangerschaft/baby-geplant';
const lies = (pfad) => readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');
const seite = schwangerschaftAnlassSeiten.find((eintrag) => eintrag.slug === 'baby-geplant');

const TECHNISCH = new Set(['slug', 'key', 'motiv', 'quelle', 'to', 'id', 'value', 'weiterlesen', 'nr']);
const texteVon = (wert, pfad = '') => {
  if (typeof wert === 'string') return [{ pfad, text: wert }];
  if (Array.isArray(wert)) return wert.flatMap((eintrag, index) => texteVon(eintrag, `${pfad}[${index}]`));
  if (wert && typeof wert === 'object') {
    return Object.entries(wert).flatMap(([schluessel, eintrag]) => (TECHNISCH.has(schluessel) ? [] : texteVon(eintrag, pfad ? `${pfad}.${schluessel}` : schluessel)));
  }
  return [];
};
const alleTexte = texteVon(seite);
const alles = alleTexte.map((eintrag) => eintrag.text).join('\n');

test('Kopfdaten stimmen mit dem Seitenplan überein', () => {
  assert.equal(seite.seo.title, 'Baby geplant: Stichtag für Klinikschutz berechnen | Healio');
  assert.ok(seite.seo.title.length <= 60, 'Titel höchstens 60 Zeichen');
  assert.equal(seite.seo.title.length, 58);
  assert.equal(seite.seo.description, 'Baby geplant? Rechne aus, ab welchem Tag Entbindung und Familienzimmer im Klinik-Tarif versichert sind. Bayerische nach 8 Monaten, SDK ohne Wartezeit.');
  assert.ok(seite.seo.description.length <= 155, 'Beschreibung höchstens 155 Zeichen');
  assert.equal(seite.seo.description.length, 150);
  assert.equal(seite.hero.h1, 'Baby geplant? Rechne aus, ab wann die Geburt im Klinikschutz mitversichert ist.');
  assert.equal(seite.seo.ogImageAlt, 'Healio: Stichtag für den Klinikschutz rund um die Geburt ausrechnen');
  assert.equal(seite.hero.brotkrume, 'Baby geplant');
  assert.equal(seite.hero.bildAlt, 'Eine junge Familie mit ihrem Baby');
  const route = schwangerschaftAnlassSeoRoute(seite);
  assert.equal(route.path, PFAD);
  assert.equal(route.canonical, `https://healio.de${PFAD}`);
  assert.ok(!('robots' in route) || /^index/.test(route.robots), 'Seite wird indexiert');
  assert.equal(route.lang, 'de');
});

test('Gedankenstriche, Sperrwörter und fehlende Umlaute kommen nicht vor (Plan 4.6)', () => {
  const sperren = [
    [/[–—]/, 'Gedankenstrich'],
    [/\bKinderwunsch|\bIVF\b|\bICSI\b|Fruchtbarkeit|\bZyklus|Empfängnis/i, 'Kinderwunsch-Wortfeld'],
    [/\bsicher\b/i, 'sicher'],
    [/garantiert/i, 'garantiert'],
    [/Testsieger/i, 'Testsieger'],
    [/Wartezimmer/i, 'Wartezimmer'],
    [/ohne Gesundheitsfragen/i, 'ohne Gesundheitsfragen'],
    [/\b(?:fuer|ueber|koennen|moeglich|muessen|waehrend|zurueck|haelt|Rueck)\b/i, 'fehlende Umlaute'],
  ];
  for (const { pfad, text } of alleTexte) {
    for (const [muster, grund] of sperren) assert.doesNotMatch(text, muster, `${pfad}: ${grund} in „${text}“`);
    for (const treffer of text.matchAll(/[^.]*ohne Gesundheitsprüfung[^.]*/g)) {
      assert.match(treffer[0], /Baby|Kind|anmeld/, `${pfad}: „ohne Gesundheitsprüfung“ nur beim Kind: „${treffer[0]}“`);
    }
  }
});

test('Verbotene Aussagen aus Plan 1.4 stehen nicht auf der Seite', () => {
  assert.doesNotMatch(alles, /Bonus|IKK|Kassenbonus/, 'Kein Kassenbonus, keine IKK-Zahl (3.12)');
  assert.doesNotMatch(alles, /Hebamme/i, 'Keine Hebammenleistungen (3.12)');
  assert.doesNotMatch(alles, /Schwangerschaftswoche|\bSSW\b|Wahrscheinlichkeit/i, 'Keine Schwangerschaftswochen-Rechnung');
  assert.doesNotMatch(alles, /Rückdatier|Wartezeiterlass/i, 'Rückdatierung kein Weg (1.4 Nr. 12)');
  assert.doesNotMatch(alles, /Stiftung Warentest|einziger Weg/i);
  assert.doesNotMatch(alles, /Smart/, 'Kein Bayerische Smart (3.12)');
  // SDK-Beiträge nie in Euro (1.4 Nr. 9): kein EUR-Betrag in einer Zeile oder Karte der SDK
  const sdkTexte = [
    ...seite.tarife.zeilen.map((zeile) => zeile.sdk),
    seite.rechner.ergebnis.sdk.beitrag,
    seite.tarife.kopfSdk,
  ];
  for (const textSdk of sdkTexte) assert.doesNotMatch(textSdk, /EUR|günstiger|teurer/, `SDK ohne Euro-Beitrag: ${textSdk}`);
  // Beiträge der Bayerischen nie ohne Stand 08.2025 und Altersgruppe
  for (const { pfad, text } of alleTexte.filter((eintrag) => /13,40 EUR|10,20 EUR|17,60 EUR|13,90 EUR/.test(eintrag.text) && !/\.wert$/.test(eintrag.pfad))) {
    assert.match(text, /Stand 08\.2025/, `${pfad}: Beitrag ohne Stand`);
    assert.match(text, /\d\d bis \d\d Jahre/, `${pfad}: Beitrag ohne Altersgruppe`);
  }
  assert.equal(seite.hero.karte.kacheln[2].wert, '13,40 EUR');
  // Wartezeit beginnt nie mit Antrag, Test oder Geburtstermin
  assert.doesNotMatch(alles, /Wartezeit (?:beginnt|läuft|zählt) (?:mit|ab) dem (?:Antrag|Test|Geburtstermin)/i);
  // Familienzimmer nie „garantiert“, im Komfort nie „ohne Begrenzung“
  assert.doesNotMatch(alles, /Komfort[^.\n]*ohne (?:festen )?(?:Höchstbetrag|Begrenzung)/i);
  // „Die Geburt ist versichert“ nie ohne Bedingung: der Titel nennt „ab wann“
  assert.doesNotMatch(alles, /Die Geburt ist versichert/i);
});

test('Sichtbare Texte kommen wortgleich aus dem Seitenplan', () => {
  const plan = {
    eyebrow: 'Klinikschutz rund um die Geburt',
    knopfRechner: 'Stichtag ausrechnen',
    knopfAbschluss: 'Gleich online abschließen',
    fussnote: 'Für beide Tarife gilt: Schließ ab, solange keine Schwangerschaft besteht oder bekannt ist.',
    vertrauenszeile: 'Bedingungen der Versicherer verlinkt · Rechner ohne Anmeldung, nichts wird gespeichert · Healio ist Versicherungsmakler',
  };
  for (const [feld, wert] of Object.entries(plan)) assert.equal(seite.hero[feld], wert, `hero.${feld}`);
  assert.equal(seite.hero.karte.titel, 'Klinikschutz vor dem Baby auf einen Blick');
  assert.deepEqual(seite.hero.karte.kacheln.map((kachel) => kachel.key), ['jahr', 'partner', 'beitrag']);
  assert.deepEqual(seite.hero.karte.kacheln.map((kachel) => kachel.wert), ['8 Monate', '2 Monate', '13,40 EUR']);
  assert.equal(seite.rechner.feld.label, 'Wann soll dein Klinikschutz beginnen?');
  assert.equal(seite.rechner.ergebnis.bayerische.knopf, 'Bei der Bayerischen online abschließen');
  assert.equal(seite.rechner.ergebnis.sdk.knopf, 'Bei der SDK online abschließen');
  assert.equal(seite.rechner.ergebnis.hinweisKnoepfe, 'Du landest im Rechner des Versicherers. Dort wählst du Tarif und Beginn.');
  assert.equal(seite.rechner.planung.ueberschrift, 'Was das für eure Planung heißt');
  assert.equal(seite.rechner.abschluss.rueckrufLink, 'Lieber zurückrufen lassen');
  assert.equal(seite.rechner.abschluss.terminLink, 'oder einen Termin buchen');
  assert.equal(seite.tarife.zeilen.length, 9);
  assert.equal(seite.tarife.knopfBayerische, 'Bei der Bayerischen online abschließen');
  assert.equal(seite.tarife.knopfSdk, 'Bei der SDK online abschließen');
  assert.equal(seite.ablauf.schritte.length, 4);
  assert.deepEqual(seite.ablauf.schritte.map((schritt) => schritt.motiv), ['calendar', 'choice', 'document', 'family']);
  assert.equal(seite.ablauf.knopf, 'Tarife nebeneinander ansehen');
  assert.equal(seite.fakten.karten.length, 5);
  assert.equal(seite.passt.passtItems.length, 5);
  assert.equal(seite.passt.passtNichtItems.length, 4);
  assert.equal(seite.passt.anderer.to, '/schwangerschaft');
  assert.equal(seite.quellen.length, 10);
  assert.equal(seite.rueckruf.ueberschrift, 'Lieber kurz sprechen?');
  assert.equal(seite.andereWege.to, '/schwangerschaft');
  assert.equal(seite.andereWege.knopf, 'Zur Seite Schwangerschaft');
  for (const nr of ['p1', 'p2', 'p3', 'p4']) assert.ok(seite.rechner.pflichtsaetze[nr].length > 40, `Pflichtsatz ${nr}`);
  assert.ok(seite.fussHinweis.startsWith('Healio GmbH ist Versicherungsmakler. Alle Angaben folgen den Bedingungen'));
});

test('FAQ: sechs Fragen (Frage 7 bleibt draußen), Schema gleich sichtbarem Text', () => {
  assert.equal(seite.faq.length, 6);
  assert.ok(!seite.faq.some((frage) => /früheren Beginn/.test(frage.question)), 'Frage zur Vorausdatierung bleibt draußen');
  assert.doesNotMatch(alles, /fünf Monate nach dem laufenden Monat|Vorausdatier/i);
  const faqSchema = schwangerschaftAnlassSchema(seite).find((eintrag) => eintrag['@type'] === 'FAQPage');
  assert.ok(faqSchema, 'FAQPage im Schema');
  assert.deepEqual(
    faqSchema.mainEntity.map((frage) => [frage.name, frage.acceptedAnswer.text]),
    seite.faq.map((frage) => [frage.question, frage.answer]),
  );
  const brotkrume = schwangerschaftAnlassSchema(seite).find((eintrag) => eintrag['@type'] === 'BreadcrumbList');
  assert.deepEqual(brotkrume.itemListElement.map((element) => element.name), ['Schwangerschaft', 'Baby geplant']);
  assert.equal(brotkrume.itemListElement[0].item, 'https://healio.de/schwangerschaft');
  // Beispiel aus Frage 1 stimmt mit der Rechenregel überein
  const r = berechneStichtage({ jahr: 2026, monat: 12, tag: 1 });
  assert.ok(seite.faq[0].answer.includes(`endet die Wartezeit am ${formatiereDatum(r.bayerische.wartezeitBis)}`));
  assert.ok(seite.faq[0].answer.includes(`Ab dem ${formatiereDatum(r.bayerische.entbindungAb)}`));
});

test('Quellen und Ratgeber existieren, Titel stimmen mit dem Register überein', async () => {
  for (const karte of seite.fakten.karten) for (const { id } of karte.quelle) assert.ok(QUELLEN[id]?.href, `Quelle ${id} ohne Link`);
  for (const { id, wofuer } of seite.quellen) {
    assert.ok(QUELLEN[id], `unbekannte Quelle ${id}`);
    assert.ok(wofuer.length > 5);
    if (QUELLEN[id].href) assert.match(QUELLEN[id].href, /^https:\/\/(www\.diebayerische\.de|www\.sdk\.de|www\.gesetze-im-internet\.de)\//);
  }
  // Vermittlerunterlage und Auskunft stehen ohne Link (Plan 1.2)
  assert.equal(QUELLEN.steckbrief.href, null);
  assert.equal(QUELLEN.auskunft.href, null);
  assert.deepEqual(seite.weiterlesen, [
    'baby-geplant-zusatzversicherung', 'familienzimmer-krankenhaus', 'neugeborenes-versichern', 'krankenhauszusatzversicherung-kinder',
  ]);
  for (const slug of seite.weiterlesen) {
    assert.ok(RATGEBER_TITEL[slug], `Ratgeber ${slug} ohne Titel`);
    const { article } = await import(`../src/content/ratgeber/${slug}.js`);
    assert.equal(RATGEBER_TITEL[slug], article.listTitle, `Titel von ${slug} weicht vom Register ab`);
  }
});

test('Ratgeber-Zuordnung: Slugs und Ziele existieren, Ausschlüsse stehen nicht drin', () => {
  const slugs = Object.keys(SCHWANGERSCHAFT_RATGEBER_EINSTIEGE);
  assert.deepEqual(slugs.sort(), [
    'baby-geplant-zusatzversicherung', 'familienzimmer-krankenhaus', 'krankenhauszusatzversicherung-kinder',
    'krankenhauszusatzversicherung-ohne-wartezeit', 'zusatzversicherung-kinder',
  ]);
  for (const slug of slugs) {
    assert.ok(existsSync(new URL(`../src/content/ratgeber/${slug}.js`, import.meta.url)), `Ratgeberdatei ${slug} fehlt`);
    for (const ziel of SCHWANGERSCHAFT_RATGEBER_EINSTIEGE[slug]) {
      assert.ok(ANLAESSE.some((anlass) => anlass.slug === ziel), `Ziel ${ziel} fehlt in ANLAESSE`);
      assert.ok(schwangerschaftAnlassSeiten.some((eintrag) => eintrag.slug === ziel), `Seite ${ziel} fehlt`);
      assert.ok(seoRoutes.some((route) => route.path === `/schwangerschaft/${ziel}`), `SEO-Route für ${ziel} fehlt`);
    }
    assert.ok(!SCHWANGERSCHAFT_RATGEBER_AUSGESCHLOSSEN.includes(slug), `${slug} ist ausgeschlossen`);
  }
  for (const slug of SCHWANGERSCHAFT_RATGEBER_AUSGESCHLOSSEN) {
    assert.ok(!(slug in SCHWANGERSCHAFT_RATGEBER_EINSTIEGE), `${slug} darf nicht zugeordnet sein`);
  }
  assert.deepEqual(ANLAESSE[0], {
    slug: 'baby-geplant',
    path: PFAD,
    label: 'Baby geplant',
    kurz: 'Ausrechnen, ab welchem Tag Entbindung und Baby im Klinikschutz versichert sind, und online abschließen.',
    linkLabel: 'Stichtag ausrechnen',
    motiv: 'family',
  });
  const layout = lies('src/components/ratgeber/RatgeberArticleLayout.jsx');
  assert.match(layout, /getSchwangerschaftRatgeberEinstiege\(article\.slug\)/);
  const leistungsweg = lies('src/content/leistungsweg.js');
  assert.ok(!leistungsweg.includes(PFAD), 'leistungsweg.js bleibt unverändert');
});

test('Text-Überschneidung: kein Satz über 8 Wörtern steht wortgleich in Ratgebern oder auf /schwangerschaft', () => {
  const vergleich = [
    'src/content/ratgeber/baby-geplant-zusatzversicherung.js',
    'src/content/ratgeber/familienzimmer-krankenhaus.js',
    'src/components/BenefitFunnelPage.jsx',
    'src/components/PregnancyGuidance.jsx',
  ].map((datei) => lies(datei).replace(/\s+/g, ' '));
  const saetze = alleTexte
    .filter((eintrag) => !/^(?:faq|quellen)/.test(eintrag.pfad) || /^faq/.test(eintrag.pfad))
    .flatMap((eintrag) => eintrag.text.split(/(?<=[.!?])\s+/))
    .map((satz) => satz.trim())
    .filter((satz) => satz.split(/\s+/).length > 8);
  const treffer = saetze.filter((satz) => vergleich.some((quelle) => quelle.includes(satz)));
  assert.ok(treffer.length / Math.max(saetze.length, 1) < 0.1, `Zu viel gleicher Text: ${treffer.join(' | ')}`);
  assert.deepEqual(treffer, [], `Wortgleiche Sätze: ${treffer.join(' | ')}`);
});

test('Ausschlusslisten: keine Messung, aber im anonymen Zähler', () => {
  for (const datei of ['src/lib/analytics.js', 'src/lib/meta-pixel.js', 'src/lib/google-ads.js', 'api/meta-events.js', 'scripts/lib/ratgeber-sensitive-paths.mjs', 'src/components/Layout.jsx']) {
    assert.ok(lies(datei).includes(`'${PFAD}'`), `${datei}: Eintrag fehlt`);
  }
  const layout = lies('src/components/Layout.jsx');
  assert.equal((layout.match(new RegExp(`'${PFAD}'`, 'g')) || []).length, 2, 'Layout: productSalesRoutes und NITA_PILL_ROUTES');
  const sensible = lies('scripts/lib/ratgeber-sensitive-paths.mjs');
  assert.equal((sensible.match(new RegExp(`'${PFAD}'`, 'g')) || []).length, 2, 'beide Listen der Sperrpfade');
  assert.ok(!lies('src/lib/rueckruf.js').includes(PFAD), 'Nicht in RUECKRUF_ROUTE_TOPICS');
  assert.ok(!lies('src/lib/lead-capture-copy.js').includes(PFAD), 'Nicht in lead-capture-copy');
  assert.ok(!lies('src/lib/nitaContext.js').includes(PFAD), 'Nicht in nitaContext');
  assert.ok(LEISTUNGSSEITEN.includes(PFAD), 'Leistungsseite im anonymen Zähler');
  for (const sql of ['docs/supabase/2026-11-02_anonyme_zaehler.sql', 'docs/supabase/2026-11-10_anonyme_zaehler_versicherer_klick.sql']) {
    assert.ok(lies(sql).includes(`'${PFAD}'`), `${sql}: Zielliste fehlt`);
  }
  assert.ok(lies('public/sitemap.xml').includes(`<loc>https://healio.de${PFAD}</loc>`), 'Sitemap');
});

test('Die Seite /schwangerschaft selbst bleibt unberührt: kein Link auf die neue Seite', () => {
  for (const datei of ['src/components/BenefitFunnelPage.jsx', 'src/components/PregnancyGuidance.jsx']) {
    assert.ok(!lies(datei).includes(PFAD), `${datei} verlinkt die neue Seite nicht`);
  }
});

test('Abschlussknöpfe: feste Links ohne Parameter, nur anonyme Zähler-Ereignisse', () => {
  const quelle = lies('src/pages/SchwangerschaftAnlassPage.jsx');
  assert.match(quelle, /BAYERISCHE_STATIONAER_URL.*from '@\/components\/sections\/hospital\/hospitalLinks'/);
  assert.match(quelle, /buildSdkUrl\(\{ ref: referrer, tarifTypes: 'Stationär' \}\)/);
  assert.match(quelle, /zaehle\('versicherer_klick', \{ ziel: 'bayerische' \}\)/);
  assert.match(quelle, /zaehle\('sdk_klick'\)/);
  for (const verboten of ['trackStationaerBayerischeClick', 'trackSdkClick', 'trackGoogleAdsAntrag', 'trackEvent', 'trackMeta', 'localStorage', 'sessionStorage', 'URLSearchParams']) {
    assert.ok(!quelle.includes(verboten), `Seite darf ${verboten} nicht verwenden`);
  }
  assert.ok(!/BAYERISCHE_STATIONAER_URL\s*\+|BAYERISCHE_STATIONAER_URL\}[?&#]/.test(quelle), 'Am Link der Bayerischen hängt kein Parameter');
  assert.equal((quelle.match(/href=\{BAYERISCHE_STATIONAER_URL\}/g) || []).length, 1, 'Ein gemeinsamer Baustein für alle Knöpfe der Bayerischen');
  assert.equal((quelle.match(/href=\{sdkUrl\}/g) || []).length, 1, 'Ein gemeinsamer Baustein für alle Knöpfe der SDK');
  const rueckruf = lies('src/components/sections/schwangerschaft/BabyGeplantRueckruf.jsx').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const verboten of ['trackEvent', 'zaehle', 'localStorage', 'sessionStorage', 'URLSearchParams']) {
    assert.ok(!rueckruf.includes(verboten), `Rückruf darf ${verboten} nicht verwenden`);
  }
  assert.match(rueckruf, /Baby geplant Rückruf', \{ track: false \}/);
  assert.match(rueckruf, /const HERKUNFT = '\/schwangerschaft\/baby-geplant'/);
  assert.ok(!/type="email"|name="email"|<textarea|nachricht|thema/i.test(rueckruf), 'Kein Thema, kein Freitext, keine E-Mail im Rückruf');
});

const DIST = new URL('../dist/schwangerschaft/baby-geplant/index.html', import.meta.url);
test('Gerendertes HTML der Seite (nur mit vorhandenem dist/)', { skip: !existsSync(DIST) }, () => {
  const html = readFileSync(DIST, 'utf8');
  assert.match(html, /<title[^>]*>Baby geplant: Stichtag für Klinikschutz berechnen \| Healio<\/title>/);
  assert.ok(html.includes(seite.seo.description));
  assert.ok(html.includes(`rel="canonical" href="https://healio.de${PFAD}"`));
  assert.ok(html.includes(seite.hero.h1), 'H1 im HTML');
  assert.match(html, /"@type":"FAQPage"/);
  for (const nr of ['p1', 'p2', 'p3', 'p4']) assert.ok(html.includes(seite.rechner.pflichtsaetze[nr]), `Pflichtsatz ${nr} im HTML`);
  assert.doesNotMatch(html, /googletagmanager|connect\.facebook\.net|googleadservices/);
  assert.ok(!/name="robots" content="noindex/.test(html), 'indexierbar');
});
