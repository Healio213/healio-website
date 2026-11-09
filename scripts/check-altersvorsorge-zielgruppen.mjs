/**
 * Regelprüfung der Anfrageseiten unter /altersvorsorgedepot/… ohne Browser.
 * Grundlage: Healio/Altersvorsorgedepot-Funnel/FAKTENBASIS.md (Leitplanken)
 * und UNTERSEITEN-SEITENPLAN.md.
 *
 * - keine Sperrwörter (kostenlos, gratis, sicher beim Geld, Versorgungswerk …)
 * - keine Gedankenstriche, kein Januar-Druck
 * - jede Zahl im Text steht in der Liste der belegten Werte
 * - „Nicht kündigen, erst prüfen“ überall, wo Riester vorkommt
 * - Quellen, Ratgeber und Eingänge existieren
 * - Rechenbeispiele stimmen mit der Rechenlogik des Rechners überein
 * - Titel und Beschreibungen in sinnvoller Länge, FAQ-Schema = sichtbare Fragen
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { berechneZulagen } from '../src/lib/altersvorsorgeZulagen.js';
import {
  zielgruppenSeiten, QUELLEN, RATGEBER_TITEL, EINGAENGE,
} from '../src/content/altersvorsorgeZielgruppen/index.js';
import { zielgruppenSchema, zielgruppenSeoRoute } from '../src/content/altersvorsorgeZielgruppen/seo.js';
import { seoRoutes } from './seo-routes.mjs';

const TECHNISCH = new Set(['slug', 'icon', 'key', 'motiv', 'quelle', 'to', 'voreinstellung', 'felder', 'eingabe', 'weiterlesen', 'id', 'verwandt']);

const texteVon = (wert, pfad = '') => {
  if (typeof wert === 'string') return [{ pfad, text: wert }];
  if (Array.isArray(wert)) return wert.flatMap((eintrag, index) => texteVon(eintrag, `${pfad}[${index}]`));
  if (wert && typeof wert === 'object') {
    return Object.entries(wert).flatMap(([schluessel, eintrag]) => (TECHNISCH.has(schluessel) ? [] : texteVon(eintrag, pfad ? `${pfad}.${schluessel}` : schluessel)));
  }
  return [];
};

const SPERRWOERTER = [
  [/kostenlos|kostenfrei|gebührenfrei|gratis|umsonst|ohne\s+kosten|geschenkt/i, 'Gratis-Versprechen'],
  [/\bsicher\w*|\bsicherheit/i, 'sicher beim Geld'],
  [/versorgungswerk/i, 'Wort Versorgungswerk'],
  [/makler/i, 'Makler-Label'],
  [/\b(?:allianz|debeka|ergo|axa|generali|signal iduna|zurich|huk|provinzial|cosmosdirekt|dws|union investment|deka|trade republic|scalable|comdirect|ing|r\+v)\b/i, 'Anbieter- oder Versicherername'],
  [/altersarmut|droht dir|zu spät/i, 'Angstwerbung'],
  [/garantiert\s+(?:\d|rendite|gewinn)|rendite von|\d+\s*% rendite/i, 'Renditeversprechen'],
  [/bis (?:zum )?(?:1\. )?januar|vor dem (?:1\. )?januar|stichtag|nur noch bis|letzte chance|jetzt oder nie/i, 'Fristdruck'],
  [/\b(?:fuer|ueber|koennen|moeglich|muessen|waehrend|zurueck|haelt|Rueck)\b/i, 'fehlende Umlaute'],
];

test('Sperrwörter, Gedankenstriche und Fristdruck kommen nicht vor', () => {
  for (const seite of zielgruppenSeiten) {
    for (const { pfad, text } of texteVon(seite)) {
      for (const [muster, grund] of SPERRWOERTER) assert.doesNotMatch(text, muster, `${seite.slug} ${pfad}: ${grund} in „${text}“`);
      assert.doesNotMatch(text, /[—–]|\s-\s/, `${seite.slug} ${pfad}: Gedankenstrich in „${text}“`);
    }
  }
});

// Belegte Werte aus FAKTENBASIS.md und der Quellenprüfung vom 08.10.2026,
// dazu Jahreszahlen, Normen und Formularnummern. Rechenbeispiele stehen nicht
// im Text, sie werden mit berechneZulagen() erzeugt.
const BELEGTE_ZAHLEN = new Set([
  '0', '1', '2', '3', '4', '10', '15', '18', '20', '21', '24', '25', '30', '40', '50', '60', '65', '67', '70', '75', '80', '85', '100', '120', '150', '175', '185', '200', '300', '360', '540',
  '1.800', '2.100', '6.840', '2026', '2027', '2028', '2029', '31.12.2029', '8', '206', '26', '0800', '84', '10a', '15', '18', '19', '89', '81a',
]);

test('Jede Zahl im Text ist belegt', () => {
  for (const seite of zielgruppenSeiten) {
    for (const { pfad, text } of texteVon(seite)) {
      const ohneNormen = text.replace(/§\s*\d+[a-z]?(?:\s*Abs\.\s*\d+)?(?:\s*Nr\.\s*\d+(?:\s*bis\s*\d+)?)?/g, '').replace(/V0800/g, '');
      for (const zahl of ohneNormen.match(/\d+(?:[.,]\d+)*/g) || []) {
        assert.ok(BELEGTE_ZAHLEN.has(zahl), `${seite.slug} ${pfad}: Zahl ${zahl} nicht in der Faktenbasis-Liste („${text}“)`);
      }
    }
  }
});

test('Riester kommt nur mit „Nicht kündigen, erst prüfen“ vor', () => {
  for (const seite of zielgruppenSeiten) {
    const alles = texteVon(seite).map((eintrag) => eintrag.text).join(' ');
    if (/riester/i.test(alles)) assert.match(alles, /nicht kündigen, erst prüfen/i, `${seite.slug}: Riester ohne Kernbotschaft`);
  }
});

test('Healio vermittelt nur Versicherungsvarianten, Bindung bis zur Rente steht da', () => {
  for (const seite of zielgruppenSeiten) {
    const alles = texteVon(seite).map((eintrag) => eintrag.text).join(' ');
    assert.match(alles, /Versicherungsvariante/, `${seite.slug}: Hinweis auf Versicherungsvarianten fehlt`);
    assert.match(alles, /Rente/, `${seite.slug}: Bindung bis zur Rente fehlt`);
    assert.match(alles, /Verlust|schwank|an Wert verlieren|im Wert fallen/i, `${seite.slug}: Schwankungshinweis fehlt`);
  }
});

const STARTINFO_FELDER = ['eyebrow', 'ueberschrift', 'text', 'knopf', 'fahrplan', 'rechnerLink'];

// Die Startinfo-Texte laufen über texteVon() mit durch Sperrwort- und Zahlenprüfung.
test('Jede Seite hat die Startinfo-Eintragung mit sechs Texten', () => {
  for (const seite of zielgruppenSeiten) {
    assert.ok(seite.startinfo && typeof seite.startinfo === 'object', `${seite.slug}: startinfo fehlt`);
    assert.deepEqual(Object.keys(seite.startinfo).sort(), [...STARTINFO_FELDER].sort(), `${seite.slug}: startinfo-Felder stimmen nicht`);
    for (const feld of STARTINFO_FELDER) {
      assert.equal(typeof seite.startinfo[feld], 'string', `${seite.slug}: startinfo.${feld} ist kein Text`);
      assert.ok(seite.startinfo[feld].trim().length > 0, `${seite.slug}: startinfo.${feld} ist leer`);
    }
  }
});

test('Quellen, Ratgeber und Eingänge existieren', () => {
  for (const seite of zielgruppenSeiten) {
    for (const karte of seite.fakten.karten) assert.ok(QUELLEN[karte.quelle], `${seite.slug}: unbekannte Quelle ${karte.quelle}`);
    assert.ok(seite.quellen.length >= 4, `${seite.slug}: zu wenige Quellen`);
    for (const { id, wofuer } of seite.quellen) {
      assert.ok(QUELLEN[id], `${seite.slug}: unbekannte Quelle ${id}`);
      assert.ok(wofuer?.length > 5, `${seite.slug}: Zweck der Quelle ${id} fehlt`);
      assert.match(QUELLEN[id].href, /^https:\/\//);
    }
    for (const slug of seite.weiterlesen) {
      assert.ok(RATGEBER_TITEL[slug], `${seite.slug}: Ratgeber ${slug} ohne Titel`);
      assert.ok(existsSync(new URL(`../src/content/ratgeber/${slug}.js`, import.meta.url)), `${seite.slug}: Ratgeberdatei ${slug} fehlt`);
    }
    for (const slug of seite.verwandt) assert.ok(EINGAENGE.some((eingang) => eingang.slug === slug), `${seite.slug}: unbekannter Eingang ${slug}`);
    assert.equal(new Set([...seite.verwandt, seite.slug]).size, EINGAENGE.length, `${seite.slug}: Eingänge unvollständig`);
  }
  assert.deepEqual(EINGAENGE.map((eingang) => eingang.slug).sort(), zielgruppenSeiten.map((seite) => seite.slug).sort());
});

test('Rechenbeispiele und Rechner folgen der Faktenbasis', () => {
  // Geprüfte Beispiele aus FAKTENBASIS.md und Quellenprüfung
  assert.equal(berechneZulagen({ monatsbeitrag: 25, kinder: 2 }).zulageJahr, 750);
  assert.equal(berechneZulagen({ monatsbeitrag: 25, kinder: 1 }).zulageJahr, 450);
  assert.equal(berechneZulagen({ monatsbeitrag: 150, kinder: 2 }).zulageJahr, 1140);
  assert.equal(berechneZulagen({ monatsbeitrag: 10, kinder: 2 }).zulageJahr, 300);
  assert.equal(berechneZulagen({ monatsbeitrag: 30, unter25: true }).startbonus, 200);
  for (const seite of zielgruppenSeiten) {
    const { voreinstellung, felder } = seite.rechner;
    assert.ok(voreinstellung.monatsbeitrag >= 10 && voreinstellung.monatsbeitrag <= 150 && voreinstellung.monatsbeitrag % 5 === 0, `${seite.slug}: Voreinstellung außerhalb des Reglers`);
    assert.ok(felder.includes('monatsbeitrag'));
    for (const karte of seite.beispiele.karten) {
      if (!karte.eingabe) continue;
      const ergebnis = berechneZulagen(karte.eingabe);
      assert.ok(ergebnis.berechtigt, `${seite.slug}: Beispiel unter Mindestbeitrag`);
      assert.ok(ergebnis.grundzulage <= 540 && ergebnis.kinderzulage <= 300 * (karte.eingabe.kinder || 0));
    }
  }
});

test('Titel, Beschreibung, Schema und Routen passen', () => {
  const pfade = new Set(seoRoutes.map((route) => route.path));
  for (const seite of zielgruppenSeiten) {
    const route = zielgruppenSeoRoute(seite);
    assert.ok(route.title.length <= 65, `${seite.slug}: Titel zu lang (${route.title.length})`);
    assert.ok(route.description.length >= 110 && route.description.length <= 160, `${seite.slug}: Beschreibung ${route.description.length} Zeichen`);
    assert.ok(pfade.has(route.path), `${seite.slug}: fehlt in seo-routes.mjs`);
    const faqSchema = zielgruppenSchema(seite).find((eintrag) => eintrag['@type'] === 'FAQPage');
    assert.deepEqual(faqSchema.mainEntity.map((frage) => frage.name), seite.faq.map((frage) => frage.question));
  }
  const titel = zielgruppenSeiten.map((seite) => seite.seo.title);
  assert.equal(new Set(titel).size, titel.length, 'Titel doppelt');
  const h1 = zielgruppenSeiten.map((seite) => seite.hero.h1);
  assert.equal(new Set(h1).size, h1.length, 'H1 doppelt');
});
