/**
 * Regelprüfung der Anlassseite /ambulant/osteopathie ohne Browser.
 * Grundlage: Healio/Ambulant-Mikroseiten/SEITENPLAN-OSTEOPATHIE.md
 * (Kopfdaten 2, Texte 3, Rechner 4, Abschluss 5, Zuordnung 6.1, Zähler 6.2,
 * Sperrlisten 6.3, SEO 6.4, Verbote 1.4, Textregeln 4.6).
 *
 * - Kopfdaten (Titel, Beschreibung, H1, Brotkrume, Canonical) wie im Plan
 * - keine Gedankenstriche, keine Sperrwörter, keine verbotenen Aussagen,
 *   jedes „1.000 EUR“ im Fließtext mit „zwei Kalenderjahr“, echte Umlaute
 * - FAQ im Schema = sichtbare Fragen (sieben)
 * - Ratgeber-Zuordnung: sieben Slugs, jeder im Register mit group ambulant,
 *   Titel stimmen mit dem Register überein
 * - Text-Überschneidung mit Ratgebern und /ambulant
 * - Sperrlisten, Zähler-Seitenliste, Sitemap, SEO-Route
 * - Abschlussknöpfe: nur der feste SDK-Link mit Stufe, nur anonymer Zähler
 * - mit vorhandenem dist/: gerendertes HTML der Seite und der Ratgeberkarten
 *
 * Ausführen: npm run test:ambulant-anlaesse (vorher npm run build für den letzten Teil)
 */
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ambulantAnlassSeiten, QUELLEN, RATGEBER_TITEL, ANLAESSE,
} from '../src/content/ambulantAnlaesse/index.js';
import { ambulantAnlassSchema, ambulantAnlassSeoRoute } from '../src/content/ambulantAnlaesse/seo.js';
import { AMBULANT_RATGEBER_EINSTIEGE } from '../src/content/ambulantAnlaesse/ratgeberZuordnung.js';
import { RATGEBER_ENTRIES } from '../src/content/ratgeber/registry.js';
import { LEISTUNGSSEITEN } from '../shared/anonyme-zaehler.js';
import { seoRoutes } from './seo-routes.mjs';

const PFAD = '/ambulant/osteopathie';
const lies = (pfad) => readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');
const seite = ambulantAnlassSeiten.find((eintrag) => eintrag.slug === 'osteopathie');

const SIEBEN = [
  'aok-osteopathie', 'barmer-osteopathie', 'mobil-krankenkasse-osteopathie', 'osteopathie-kosten',
  'osteopathie-krankenkasse', 'tk-osteopathie', 'zusatzversicherung-osteopathie',
];

const TECHNISCH = new Set(['slug', 'key', 'motiv', 'quelle', 'to', 'id', 'ids', 'value', 'wert', 'weiterlesen', 'nr', 'stufe', 'href']);
const texteVon = (wert, pfad = '') => {
  if (typeof wert === 'string') return [{ pfad, text: wert }];
  if (Array.isArray(wert)) return wert.flatMap((eintrag, index) => texteVon(eintrag, `${pfad}[${index}]`));
  if (wert && typeof wert === 'object') {
    return Object.entries(wert).flatMap(([schluessel, eintrag]) => (TECHNISCH.has(schluessel) && !/kacheln\[\d\]$/.test(pfad) ? [] : texteVon(eintrag, pfad ? `${pfad}.${schluessel}` : schluessel)));
  }
  return [];
};
// Kachelwerte (Schlüssel „wert“) und Optionen des Rechners sind sichtbare Texte, die Optionswerte nicht.
const alleTexte = [
  ...texteVon(seite),
  ...seite.hero.karte.kacheln.map((kachel, index) => ({ pfad: `hero.karte.kacheln[${index}].wert`, text: kachel.wert })),
  ...seite.fakten.karten.map((karte, index) => ({ pfad: `fakten.karten[${index}].wert`, text: karte.wert })),
];
const alles = alleTexte.map((eintrag) => eintrag.text).join('\n');
const dateiTexte = ['src/data/osteopathieKassen.js', 'src/lib/osteopathieRechner.js'].map((datei) => ({ datei, text: lies(datei) }));

test('Kopfdaten stimmen mit dem Seitenplan überein', () => {
  assert.equal(seite.seo.title, 'Osteopathie: Kasse plus Tarif ausrechnen | Healio');
  assert.ok(seite.seo.title.length <= 60, 'Titel höchstens 60 Zeichen');
  assert.equal(seite.seo.title.length, 49);
  assert.equal(seite.seo.description, 'Was zahlt deine Kasse für Osteopathie, was die SDK im Tarif Ambulant und was bleibt bei dir? Rechne es mit deiner Kasse aus und schließ online ab.');
  assert.ok(seite.seo.description.length <= 155, 'Beschreibung höchstens 155 Zeichen');
  assert.equal(seite.seo.description.length, 146);
  assert.equal(seite.hero.h1, 'Osteopathie: Rechne aus, was Kasse und Tarif zusammen zahlen.');
  assert.equal(seite.seo.ogImageAlt, 'Healio: Osteopathie mit Kassenzuschuss und Zusatzversicherung ausrechnen');
  assert.equal(seite.hero.brotkrume, 'Osteopathie');
  assert.equal(seite.hero.bildAlt, 'Ein Behandler legt einer liegenden Patientin in einem ruhigen Behandlungsraum die Hände an den Kopf');
  const route = ambulantAnlassSeoRoute(seite);
  assert.equal(route.path, PFAD);
  assert.equal(route.canonical, `https://healio.de${PFAD}`);
  assert.ok(!('robots' in route) || /^index/.test(route.robots), 'Seite wird indexiert');
  assert.equal(route.lang, 'de');
});

test('Gedankenstriche, Sperrwörter und fehlende Umlaute kommen nicht vor (Plan 4.6)', () => {
  const sperren = [
    [/[–—]/, 'Gedankenstrich'],
    [/\bsicher\b/i, 'sicher'],
    [/garantiert/i, 'garantiert'],
    [/Testsieger/i, 'Testsieger'],
    [/Bonus/, 'Bonus'],
    [/wechseln|Kassenwechsel/i, 'wechseln'],
    [/günstigste/i, 'günstigste'],
    [/\bbeste(?:n|r|s|m)?\b/i, 'beste'],
    [/ohne Gesundheitsfragen/i, 'ohne Gesundheitsfragen'],
    [/keine Gesundheitsfragen/i, 'keine Gesundheitsfragen'],
    [/ohne Gesundheitsprüfung/i, 'ohne Gesundheitsprüfung'],
    [/angeraten/i, 'angeraten'],
    [/oder angeraten/i, 'oder angeraten'],
    [/Wartezimmer/i, 'Wartezimmer'],
    [/\b(?:fuer|ueber|koennen|moeglich|muessen|waehrend|zurueck|haelt|Rueck)\b/i, 'fehlende Umlaute'],
  ];
  for (const { pfad, text } of alleTexte) {
    for (const [muster, grund] of sperren) assert.doesNotMatch(text, muster, `${pfad}: ${grund} in „${text}“`);
  }
  for (const { datei, text } of dateiTexte) {
    for (const [muster, grund] of sperren) assert.doesNotMatch(text, muster, `${datei}: ${grund}`);
  }
});

test('Verbotene Aussagen aus Plan 1.4 stehen nicht auf der Seite', () => {
  assert.doesNotMatch(alles, /IKK|Kassenbonus|Kassenvergleich|Rangliste|großzügig|schlecht/, 'Kein Kassenbonus, keine IKK-Zahl, kein Kassenvergleich (3.12)');
  assert.doesNotMatch(alles, /Gesamtbudget|3\.000 EUR/, 'Kein Gesamtbudget des Hauses (1.4 Nr. 11)');
  assert.doesNotMatch(alles, /ohne Gesundheitsprüfung/i);
  assert.doesNotMatch(alles, /1\.000 EUR im Jahr|1\.000 EUR für Osteopathie/, 'Topf gilt für zwei Kalenderjahre (1.4 Nr. 3)');
  assert.doesNotMatch(alles, /noch zu klären|ohne Gewähr|Prüfvermerk|unbestätigt/i, 'Keine Prüfvermerke im sichtbaren Text (1.4 Nr. 10)');
  assert.doesNotMatch(alles, /Physiotherapeut(?:en)? (?:zahlt|erstattet)|zahlt (?:auch )?Osteopathie beim Physiotherapeuten[^?]/i);
  // Jedes „1.000 EUR“ im Fließtext steht im selben Satz wie „zwei Kalenderjahr“ (Zahlenkarte und Tabellenzellen ausgenommen)
  for (const { pfad, text } of alleTexte) {
    if (/^hero\.karte\.kacheln\[\d\]\.wert$/.test(pfad) || /^stufen\.zeilen\[\d\]\.topf$/.test(pfad)) continue;
    for (const satz of text.split(/(?<=[.!?])\s+/).filter((eintrag) => eintrag.includes('1.000 EUR'))) {
      assert.match(satz, /zwei Kalenderjahr/, `${pfad}: „${satz}“`);
    }
  }
  assert.match(seite.hero.karte.kacheln[0].text, /zwei Kalenderjahren/, 'Zahlenkarte nennt die zwei Kalenderjahre');
  assert.match(seite.stufen.kopf[2], /zwei Kalenderjahren/, 'Tabellenkopf nennt die zwei Kalenderjahre');
  // Hausregel zu Gesundheitsfragen im Wortlaut des Plans (Entscheidung 3)
  assert.equal(seite.stufen.hinweisGesundheit, 'Im Antrag gibt es Gesundheitsfragen. Wegen der Antworten lehnt die SDK niemanden ab, Vorerkrankungen versichert sie mit einem Zuschlag mit.');
  assert.equal(seite.faq[5].answer, 'Im Antrag gibt es Gesundheitsfragen, die du vollständig beantwortest. Wegen der Antworten lehnt die SDK niemanden ab. Vorerkrankungen versichert sie mit einem Zuschlag auf den Beitrag mit.');
  // Auf der Seite steht kein Wort der Unsicherheit zum Rechner (Entscheidung 2)
  assert.doesNotMatch(JSON.stringify(seite.rechner), /vorsichtig|unsicher|vermutlich|voraussichtlich|vielleicht/i);
  // Beiträge nie ohne Stand
  for (const { pfad, text } of alleTexte.filter((eintrag) => /\d\d,\d\d EUR/.test(eintrag.text) && !/\.wert$/.test(eintrag.pfad) && /^(?:hero|stufen)/.test(eintrag.pfad) && !/zeilen/.test(eintrag.pfad))) {
    assert.match(text, /Stand 29\.09\.2026/, `${pfad}: Beitrag ohne Stand`);
  }
  assert.deepEqual(seite.hero.karte.kacheln.map((kachel) => kachel.wert), ['bis zu 1.000 EUR', 'keine Wartezeit', '31,64 EUR']);
});

test('Sichtbare Texte kommen wortgleich aus dem Seitenplan', () => {
  const plan = {
    eyebrow: 'Osteopathie mit Kasse und Zusatzversicherung',
    knopfRechner: 'Jetzt ausrechnen',
    knopfAbschluss: 'Gleich online abschließen',
    fussnote: 'Neue Behandlungen ab Versicherungsbeginn sind versichert. Was schon vorher läuft, bleibt draußen.',
    vertrauenszeile: 'Bedingungen der SDK verlinkt · Rechner ohne Anmeldung, nichts wird gespeichert · Healio ist Versicherungsmakler',
  };
  for (const [feld, wert] of Object.entries(plan)) assert.equal(seite.hero[feld], wert, `hero.${feld}`);
  assert.equal(seite.hero.unterzeile, 'Viele Kassen geben zur Osteopathie etwas dazu, meist für wenige Sitzungen im Jahr. Den Rest kann der ambulante Tarif der SDK übernehmen, wenn dich ein Heilpraktiker behandelt. Wähl deine Kasse, deinen Preis und die Zahl der Sitzungen. Du siehst sofort, was bei dir bleibt.');
  assert.equal(seite.hero.karte.titel, 'Osteopathie im Tarif Ambulant auf einen Blick');
  assert.deepEqual(seite.hero.karte.kacheln.map((kachel) => kachel.key), ['nachweis', 'jahr', 'beitrag']);
  assert.equal(seite.hero.karte.hinweis, 'Ambulant 50, 70 und 90 erstatten 50, 70 oder 90 Prozent, bis zu 500, 700 oder 900 EUR in zwei Kalenderjahren.');
  assert.equal(seite.rechner.ueberschrift, 'Kasse plus Tarif: dein Jahr in Zahlen');
  assert.equal(seite.rechner.intro, 'Gib ein, was du über deine Behandlung weißt. Deine Angaben bleiben auf deinem Gerät und werden nicht gespeichert.');
  assert.equal(seite.rechner.hinweisErwachsene, 'Der Rechner nutzt die Werte für Erwachsene. Für Kinder gelten bei manchen Kassen eigene Regeln.');
  assert.equal(seite.rechner.kassenlisteAusgeblendet, 'Die Werte der Kassen werden gerade neu geprüft. Gib den Zuschuss deiner Kasse bitte selbst ein.');
  assert.equal(seite.rechner.felder.kasse.label, 'Bei welcher Kasse bist du?');
  assert.equal(seite.rechner.felder.kasse.eigen, 'Meine Kasse steht nicht dabei');
  assert.deepEqual(seite.rechner.felder.behandler.optionen.map((option) => option.text), ['Heilpraktiker', 'Ärztin oder Arzt', 'Physiotherapeut']);
  assert.deepEqual(seite.rechner.felder.stufe.optionen.map((option) => option.text), ['Ambulant 50', 'Ambulant 70', 'Ambulant 90', 'Ambulant 100']);
  assert.equal(seite.rechner.fehler, 'Bitte gib eine Zahl zwischen {min} und {max} ein.');
  assert.equal(seite.rechner.ergebnis.kopf, 'Bei {n} Sitzungen zu je {P} kostet dich Osteopathie {R} im Jahr.');
  assert.equal(seite.rechner.ergebnis.kasse.titel, 'Das gibt deine Kasse dazu');
  assert.equal(seite.rechner.ergebnis.tarif.titel, 'Das übernimmt der Tarif Ambulant {s}');
  assert.equal(seite.rechner.ergebnis.eigenanteil.titel, 'Das bleibt bei dir');
  assert.equal(seite.rechner.ergebnis.zweitesJahr.titel, 'Und im zweiten Kalenderjahr?');
  assert.equal(seite.rechner.ergebnis.knopf, 'Ambulant {s} online abschließen');
  assert.equal(seite.rechner.abschluss.rueckrufLink, 'Lieber zurückrufen lassen');
  assert.equal(seite.rechner.abschluss.terminLink, 'oder einen Termin buchen');
  assert.equal(seite.zusammenspiel.schritte.length, 4);
  assert.deepEqual(seite.zusammenspiel.schritte.map((schritt) => schritt.motiv), ['document', 'ambulant', 'money', 'budget']);
  assert.equal(seite.zusammenspiel.knopf, 'Mit deinen Zahlen ausrechnen');
  assert.equal(seite.stufen.zeilen.length, 4);
  assert.deepEqual(seite.stufen.zeilen.map((zeile) => zeile.beitrag), ['10,36 EUR', '15,82 EUR', '27,44 EUR', '31,64 EUR']);
  assert.deepEqual(seite.stufen.zeilen.map((zeile) => zeile.topf), ['bis zu 500 EUR', 'bis zu 700 EUR', 'bis zu 900 EUR', 'bis zu 1.000 EUR']);
  assert.equal(seite.stufen.knopf, 'Ambulant {s} online abschließen');
  assert.equal(seite.fakten.karten.length, 5);
  assert.equal(seite.passt.passtItems.length, 5);
  assert.equal(seite.passt.passtNichtItems.length, 4);
  assert.equal(seite.passt.anderer.to, '/ambulant');
  assert.equal(seite.passt.anderer.label, 'Alle Leistungen des Tarifs Ambulant ansehen');
  assert.equal(seite.quellen.length, 8);
  assert.equal(seite.pruefstand, 'Prüfstand 13.11.2026, Kassensatzungen 09.11.2026');
  assert.equal(seite.rueckruf.ueberschrift, 'Lieber kurz sprechen?');
  assert.equal(seite.rueckruf.text, 'Schick uns Vorname und Telefonnummer. Wir rufen dich an und rechnen deinen Fall mit dir durch.');
  assert.equal(seite.andereWege.to, '/ambulant');
  assert.equal(seite.andereWege.knopf, 'Zum Tarif Ambulant');
  assert.equal(seite.praxissuche.href, 'https://naturheilregister.de/fachgebiet/osteopathie');
  for (const nr of ['p1', 'p2', 'p3', 'p4', 'p5']) assert.ok(seite.rechner.pflichtsaetze[nr].length > 40, `Pflichtsatz ${nr}`);
  assert.equal(seite.fussHinweis, 'Healio GmbH ist Versicherungsmakler. Alle Angaben folgen den Bedingungen der SDK und den Satzungen der genannten Kassen, die oben verlinkt sind. Über deinen Antrag und die Erstattung entscheidet die SDK.');
});

test('FAQ: sieben Fragen, Schema gleich sichtbarem Text, Link nur auf der Seite', () => {
  assert.equal(seite.faq.length, 7);
  const faqSchema = ambulantAnlassSchema(seite).find((eintrag) => eintrag['@type'] === 'FAQPage');
  assert.ok(faqSchema, 'FAQPage im Schema');
  assert.deepEqual(
    faqSchema.mainEntity.map((frage) => [frage.name, frage.acceptedAnswer.text]),
    seite.faq.map((frage) => [frage.question, frage.answer]),
  );
  assert.deepEqual(seite.faq.map((frage) => frage.question), [
    'Gibt die SDK etwas dazu, wenn meine Kasse schon zahlt?',
    'Gilt der Topf für Naturheilverfahren jedes Jahr neu?',
    'Zahlt der Tarif auch Osteopathie beim Physiotherapeuten?',
    'Wie muss die Rechnung aussehen?',
    'Ich bin schon in Behandlung. Hilft mir der Tarif?',
    'Werde ich mit Vorerkrankungen angenommen?',
    'Meine Kasse steht nicht im Rechner. Was nun?',
  ]);
  assert.ok(seite.faq[6].answer.includes(seite.faq[6].link.text));
  assert.equal(seite.faq[6].link.to, '/ratgeber/osteopathie-krankenkasse');
  assert.ok(!JSON.stringify(faqSchema).includes('/ratgeber/osteopathie-krankenkasse'), 'Im Schema reiner Text');
  const brotkrume = ambulantAnlassSchema(seite).find((eintrag) => eintrag['@type'] === 'BreadcrumbList');
  assert.deepEqual(brotkrume.itemListElement.map((element) => element.name), ['Ambulant', 'Osteopathie']);
  assert.equal(brotkrume.itemListElement[0].item, 'https://healio.de/ambulant');
  assert.ok(ambulantAnlassSchema(seite).some((eintrag) => eintrag['@type'] === 'WebPage'));
});

test('Quellen und Ratgeber existieren, Titel stimmen mit dem Register überein', async () => {
  for (const karte of seite.fakten.karten) for (const { id } of karte.quelle) assert.ok(QUELLEN[id]?.href, `Quelle ${id} ohne Link`);
  for (const { ids, wofuer } of seite.quellen) {
    assert.ok(wofuer.length > 5);
    for (const id of ids) {
      assert.ok(QUELLEN[id], `unbekannte Quelle ${id}`);
      if (QUELLEN[id].href) assert.match(QUELLEN[id].href, /^https:\/\/(www\.sdk\.de|www\.alte-leipziger\.de|www\.gesetze-im-internet\.de|www\.aok\.de|www\.osteopathie\.de)\//);
    }
  }
  // Beitragstabelle und Kassensatzungen stehen ohne Link (Plan 3.8)
  assert.equal(QUELLEN.beitrag.href, null);
  assert.equal(QUELLEN.kassen.href, null);
  assert.deepEqual(seite.weiterlesen, ['osteopathie-krankenkasse', 'osteopathie-kosten', 'zusatzversicherung-osteopathie']);
  for (const slug of seite.weiterlesen) {
    assert.ok(RATGEBER_TITEL[slug], `Ratgeber ${slug} ohne Titel`);
    const { article } = await import(`../src/content/ratgeber/${slug}.js`);
    assert.equal(RATGEBER_TITEL[slug], article.listTitle, `Titel von ${slug} weicht vom Register ab`);
  }
});

test('Ratgeber-Zuordnung: sieben Slugs, Gruppe ambulant, Ziele existieren', () => {
  const slugs = Object.keys(AMBULANT_RATGEBER_EINSTIEGE);
  assert.deepEqual([...slugs].sort(), SIEBEN);
  for (const slug of slugs) {
    assert.ok(existsSync(new URL(`../src/content/ratgeber/${slug}.js`, import.meta.url)), `Ratgeberdatei ${slug} fehlt`);
    const eintrag = RATGEBER_ENTRIES.find((kandidat) => kandidat.slug === slug);
    assert.ok(eintrag, `${slug} fehlt im Register`);
    assert.equal(eintrag.group, 'ambulant', `${slug} hat nicht group ambulant`);
    for (const ziel of AMBULANT_RATGEBER_EINSTIEGE[slug]) {
      assert.ok(ANLAESSE.some((anlass) => anlass.slug === ziel), `Ziel ${ziel} fehlt in ANLAESSE`);
      assert.ok(ambulantAnlassSeiten.some((eintrag2) => eintrag2.slug === ziel), `Seite ${ziel} fehlt`);
      assert.ok(seoRoutes.some((route) => route.path === `/ambulant/${ziel}`), `SEO-Route für ${ziel} fehlt`);
    }
  }
  assert.deepEqual(ANLAESSE[0], {
    slug: 'osteopathie',
    path: PFAD,
    label: 'Osteopathie: Kasse plus Tarif',
    kurz: 'Ausrechnen, was deine Kasse dazugibt, was der Tarif Ambulant übernimmt und was bei dir bleibt.',
    linkLabel: 'Jetzt ausrechnen',
    motiv: 'naturopathy',
  });
  const layout = lies('src/components/ratgeber/RatgeberArticleLayout.jsx');
  assert.match(layout, /getAmbulantRatgeberEinstiege\(article\.slug\)/);
  assert.ok(layout.indexOf('getAmbulantRatgeberEinstiege(article.slug).length') > layout.indexOf('getSchwangerschaftRatgeberEinstiege(article.slug).length'), 'Block steht unter dem Schwangerschaftsblock');
  const leistungsweg = lies('src/content/leistungsweg.js');
  assert.ok(!leistungsweg.includes(PFAD), 'leistungsweg.js bleibt unverändert');
  assert.equal(lies('src/components/sections/ambulant/AmbulantAnlassEinstiege.jsx').includes('Dein Fall in Zahlen') || lies('src/content/ambulantAnlaesse/gemeinsam.js').includes("'Dein Fall in Zahlen'"), true);
});

test('Text-Überschneidung: kein Satz über 8 Wörtern steht wortgleich in Ratgebern oder auf /ambulant', () => {
  const vergleich = [
    'src/content/ratgeber/zusatzversicherung-osteopathie.js',
    'src/content/ratgeber/osteopathie-kosten.js',
    'src/content/ratgeber/osteopathie-krankenkasse.js',
    'src/content/ratgeber/tk-osteopathie.js',
    'src/content/ratgeber/aok-osteopathie.js',
    'src/content/ratgeber/barmer-osteopathie.js',
    'src/content/ratgeber/mobil-krankenkasse-osteopathie.js',
    'src/i18n/locales/de/ambulant.json',
  ].map((datei) => lies(datei).replace(/\s+/g, ' '));
  const saetze = alleTexte
    .flatMap((eintrag) => eintrag.text.split(/(?<=[.!?])\s+/))
    .map((satz) => satz.trim())
    .filter((satz) => satz.split(/\s+/).length > 8);
  const treffer = saetze.filter((satz) => vergleich.some((quelle) => quelle.includes(satz)));
  assert.ok(treffer.length / Math.max(saetze.length, 1) < 0.1, `Zu viel gleicher Text: ${treffer.join(' | ')}`);
  assert.deepEqual(treffer, [], `Wortgleiche Sätze: ${treffer.join(' | ')}`);
});

test('Sperrlisten: keine Messung, aber im anonymen Zähler und in der Darstellung wie /ambulant', () => {
  for (const datei of ['src/lib/analytics.js', 'src/lib/meta-pixel.js', 'src/lib/google-ads.js', 'api/meta-events.js', 'scripts/lib/ratgeber-sensitive-paths.mjs', 'src/components/Layout.jsx']) {
    assert.ok(lies(datei).includes(`'${PFAD}'`), `${datei}: Eintrag fehlt`);
  }
  for (const datei of ['src/lib/analytics.js', 'src/lib/meta-pixel.js', 'src/lib/google-ads.js', 'api/meta-events.js']) {
    assert.equal((lies(datei).match(new RegExp(`'${PFAD}'`, 'g')) || []).length, 1, `${datei}: genau ein Eintrag`);
  }
  const layout = lies('src/components/Layout.jsx');
  assert.equal((layout.match(new RegExp(`'${PFAD}'`, 'g')) || []).length, 2, 'Layout: productSalesRoutes und NITA_PILL_ROUTES');
  const sensible = lies('scripts/lib/ratgeber-sensitive-paths.mjs');
  assert.equal((sensible.match(new RegExp(`'${PFAD}'`, 'g')) || []).length, 2, 'beide Listen der Sperrpfade');
  // Nicht eintragen: Rechnerstart bei Meta, Antrag bei Google Ads, Rückruf-Themen, Texte, Nita-Kontext
  assert.ok(!/META_CALCULATOR_PATHS = new Set\([^)]*osteopathie/.test(lies('src/lib/meta-pixel.js')), 'Nicht in META_CALCULATOR_PATHS');
  assert.ok(!/GOOGLE_ADS_ANTRAG_PATHS = new Set\(\[[^\]]*osteopathie/.test(lies('src/lib/google-ads.js')), 'Nicht in GOOGLE_ADS_ANTRAG_PATHS');
  assert.ok(!lies('src/lib/rueckruf.js').includes(PFAD), 'Nicht in RUECKRUF_ROUTE_TOPICS');
  assert.ok(!lies('src/lib/lead-capture-copy.js').includes(PFAD), 'Nicht in lead-capture-copy');
  assert.ok(!lies('src/lib/nitaContext.js').includes(PFAD), 'Nicht in nitaContext');
  assert.ok(LEISTUNGSSEITEN.includes(PFAD), 'Leistungsseite im anonymen Zähler');
  for (const sql of ['docs/supabase/2026-11-02_anonyme_zaehler.sql', 'docs/supabase/2026-11-10_anonyme_zaehler_versicherer_klick.sql']) {
    assert.ok(lies(sql).includes(`'${PFAD}'`), `${sql}: Zielliste fehlt`);
  }
  assert.ok(lies('scripts/check-leistungsweg-contract.mjs').includes(`'${PFAD}'`), 'Menge LEISTUNGSSEITEN im Leistungsweg-Test');
  assert.ok(lies('public/sitemap.xml').includes(`<loc>https://healio.de${PFAD}</loc>`), 'Sitemap');
  assert.ok(lies('src/App.jsx').includes('path="ambulant/osteopathie"'), 'Route');
});

test('Die Seite /ambulant selbst bleibt unberührt: kein Link auf die neue Seite', () => {
  for (const datei of ['src/pages/AmbulantPage.jsx', 'src/i18n/locales/de/ambulant.json', 'src/i18n/locales/en/ambulant.json']) {
    if (existsSync(new URL(`../${datei}`, import.meta.url))) assert.ok(!lies(datei).includes(PFAD), `${datei} verlinkt die neue Seite nicht`);
  }
  for (const datei of readdirSync(new URL('../src/components/sections/ambulant/', import.meta.url))) {
    if (/^(?:Ambulant(?!Anlass)|TrustBar|StickyCalculator|IkkSwitch|ambulantFaqs|ukvAmbulantLinks)/.test(datei)) {
      assert.ok(!lies(`src/components/sections/ambulant/${datei}`).includes(PFAD), `${datei} verlinkt die neue Seite nicht`);
    }
  }
});

test('Abschlussknöpfe: fester SDK-Link mit Stufe, nur anonyme Zähler-Ereignisse', () => {
  const quelle = lies('src/pages/AmbulantAnlassPage.jsx');
  assert.match(quelle, /buildSdkUrl\(\{ ref: referrer, tarifTypes: 'Ambulant', stufe \}\)/);
  assert.match(quelle, /zaehle\('sdk_klick'\)/);
  for (const verboten of ['trackSdkClick', 'trackGoogleAdsAntrag', 'trackEvent', 'trackMeta', 'localStorage', 'sessionStorage', 'URLSearchParams', 'ambulant-stufe', 'LeadCaptureLink']) {
    assert.ok(!quelle.includes(verboten), `Seite darf ${verboten} nicht verwenden`);
  }
  assert.equal((quelle.match(/href=\{sdkUrl\}/g) || []).length, 1, 'Ein gemeinsamer Baustein für alle Knöpfe der SDK');
  assert.match(quelle, /<a href=\{sdkUrl\} target="_blank" rel="noopener noreferrer" onClick=\{zaehleSdk\}/);
  assert.equal((quelle.match(/zaehle\(/g) || []).length, 1, 'Genau ein Zählaufruf');
  const rueckruf = lies('src/components/sections/ambulant/OsteopathieRueckruf.jsx').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const verboten of ['trackEvent', 'zaehle', 'localStorage', 'sessionStorage', 'URLSearchParams']) {
    assert.ok(!rueckruf.includes(verboten), `Rückruf darf ${verboten} nicht verwenden`);
  }
  assert.match(rueckruf, /Osteopathie Rückruf', \{ track: false \}/);
  assert.match(rueckruf, /const HERKUNFT = '\/ambulant\/osteopathie'/);
  assert.ok(!/type="email"|name="email"|<textarea|nachricht|thema|kasse|preis/i.test(rueckruf), 'Kein Thema, kein Freitext, keine E-Mail, keine Kasse im Rückruf');
  assert.match(rueckruf, /id="osteo-rueckruf-/);
  assert.match(rueckruf, /Rückrufwunsch von healio\.de\$\{HERKUNFT\}\\nBeste Zeit: \$\{zeit\}/);
});

const DIST = new URL('../dist/ambulant/osteopathie/index.html', import.meta.url);
test('Gerendertes HTML der Seite und der Ratgeberkarten (nur mit vorhandenem dist/)', { skip: !existsSync(DIST) }, () => {
  const html = readFileSync(DIST, 'utf8');
  assert.match(html, /<title[^>]*>Osteopathie: Kasse plus Tarif ausrechnen \| Healio<\/title>/);
  assert.ok(html.includes(seite.seo.description));
  assert.ok(html.includes(`rel="canonical" href="https://healio.de${PFAD}"`));
  assert.ok(html.includes(seite.hero.h1), 'H1 im HTML');
  assert.match(html, /"@type":"FAQPage"/);
  for (const nr of ['p1', 'p2', 'p3', 'p4', 'p5']) assert.ok(html.includes(seite.rechner.pflichtsaetze[nr]), `Pflichtsatz ${nr} im HTML`);
  assert.ok(html.includes('Bei 6 Sitzungen zu je 90 EUR kostet dich Osteopathie 540 EUR im Jahr.'), 'Kopfzeile aus Fall 1');
  assert.doesNotMatch(html, /googletagmanager|connect\.facebook\.net|googleadservices/);
  assert.ok(!/name="robots" content="noindex/.test(html), 'indexierbar');
  for (const frage of seite.faq) assert.ok(html.includes(frage.question.replace(/&/g, '&amp;')), `Frage im HTML: ${frage.question}`);
  // Karte: genau die sieben Ratgeber, andere nicht; Schwangerschaftskarte bleibt auf ihren fünf
  const ratgeberOrdner = new URL('../dist/ratgeber/', import.meta.url);
  const mitAmbulant = [];
  const mitSchwangerschaft = [];
  for (const slug of readdirSync(ratgeberOrdner)) {
    const datei = new URL(`../dist/ratgeber/${slug}/index.html`, import.meta.url);
    if (!existsSync(datei)) continue;
    const seitenHtml = readFileSync(datei, 'utf8');
    if (seitenHtml.includes('data-ambulant-anlass-einstiege')) mitAmbulant.push(slug);
    if (seitenHtml.includes('data-schwangerschaft-anlass-einstiege')) mitSchwangerschaft.push(slug);
  }
  assert.deepEqual(mitAmbulant.sort(), SIEBEN);
  assert.deepEqual(mitSchwangerschaft.sort(), [
    'baby-geplant-zusatzversicherung', 'familienzimmer-krankenhaus', 'krankenhauszusatzversicherung-kinder',
    'krankenhauszusatzversicherung-ohne-wartezeit', 'zusatzversicherung-kinder',
  ]);
  const karte = readFileSync(new URL('../dist/ratgeber/osteopathie-kosten/index.html', import.meta.url), 'utf8');
  assert.ok(karte.includes('Dein Fall in Zahlen') && karte.includes('Osteopathie: Kasse plus Tarif') && karte.includes('href="/ambulant/osteopathie"'));
});
