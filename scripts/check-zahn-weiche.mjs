// Regeltest der gemeinsamen Zahn-Maske mit Weiche (src/data/antrag/zahnWeiche.js), Paket C, Schritte 7 bis 10:
// Testliste der Ergänzung Teil 4, Nr. 16, 35 bis 43, 50 (Seite), 51, 54, 55 bis 59, 62 bis 68.
// Aufruf: node --test scripts/check-zahn-weiche.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as W from '../src/data/antrag/zahnWeiche.js';
import zahn from '../src/data/antrag/zahn.js';
import zahnUkv, { UKV_BELEGT } from '../src/data/antrag/zahnUkv.js';
import ambulant from '../src/data/antrag/ambulant.js';
import stationaer from '../src/data/antrag/stationaer.js';
import { baueSelbstantrag } from '../src/lib/antragsmaske/vertrag.js';
import { bedingungErfuellt, wirkungen } from '../src/lib/antragsmaske/regeln.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = path.join(ROOT, 'src/data/antrag/zahnWeiche.js');
const STRECKE = fs.readFileSync(path.join(ROOT, 'src/components/antragsmaske/ZahnStrecke.jsx'), 'utf8');
const NOV = new Date(2026, 10, 20);
const DEZ = new Date(2026, 11, 10);
const g = (jahr, monat = 3, tag = 5) => ({ jahr, monat, tag });
const basis = (extra = {}) => ({
  geburt: g(1990), V2: 'pflicht', einwilligung: '2026-11-20T10:00:00.000Z', ...extra,
});
const ziel = (v, heute = NOV) => W.zielAus(v, { heute });
const wirkungenUkv = (antworten) => wirkungen(zahnUkv, { tarif: 'Z100', antworten: { TF0021: '0', ...antworten } }).keineAufnahme;

// Kopie der Regel mit anderen Voreinstellungen (Konstanten als eine Zeile, Teil 5).
async function mitKonstanten(ersatz) {
  let text = fs.readFileSync(QUELLE, 'utf8')
    .replace("from './zahn.js'", `from '${pathToFileURL(path.join(ROOT, 'src/data/antrag/zahn.js')).href}'`)
    .replace("from './zahnUkv.js'", `from '${pathToFileURL(path.join(ROOT, 'src/data/antrag/zahnUkv.js')).href}'`)
    .replace("from '../../lib/antragsmaske/regeln.js'", `from '${pathToFileURL(path.join(ROOT, 'src/lib/antragsmaske/regeln.js')).href}'`);
  Object.entries(ersatz).forEach(([name, wert]) => {
    const muster = new RegExp(`export const ${name} = [^;]+;`);
    assert.match(text, muster, name);
    text = text.replace(muster, `export const ${name} = ${JSON.stringify(wert)};`);
  });
  const datei = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'zahnweiche-')), 'zahnWeiche.mjs');
  fs.writeFileSync(datei, text);
  return import(pathToFileURL(datei).href);
}

// Abschluss UKV (20.11.2026): Kopie von zahnUkv.js mit anderen UKV_BELEGT-Werten und eine Weiche, die diese Kopie liest. So bleibt
// geprüft, dass eine Konstante auf false den Fall wieder zum Telefon schickt (Voreinstellung vor der Messung).
const ANTRAG = path.join(ROOT, 'src/data/antrag');
const OFFEN_ALLE = {
  z90DreiZaehne: false, z75ZweiZaehne: false, kfo1819: false, freiwilligGkv: false, alter71bis80: false,
};
async function mitBelegt(ersatz) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'zahnweiche-belegt-'));
  const absolut = (text) => text.replace(/from '(\.\.?\/[^']+)'/g, (_, rel) => `from '${pathToFileURL(path.resolve(ANTRAG, rel)).href}'`);
  let ukv = absolut(fs.readFileSync(path.join(ANTRAG, 'zahnUkv.js'), 'utf8'));
  Object.entries(ersatz).forEach(([name, wert]) => {
    const muster = new RegExp(`(\\n  ${name}: )(true|false),`);
    assert.match(ukv, muster, name);
    ukv = ukv.replace(muster, `$1${wert},`);
  });
  const ukvDatei = path.join(ordner, 'zahnUkv.mjs');
  fs.writeFileSync(ukvDatei, ukv);
  const weiche = absolut(fs.readFileSync(QUELLE, 'utf8').replace("from './zahnUkv.js'", `from '${pathToFileURL(ukvDatei).href}'`));
  const weicheDatei = path.join(ordner, 'zahnWeiche.mjs');
  fs.writeFileSync(weicheDatei, weiche);
  return { W: await import(pathToFileURL(weicheDatei).href), ukv: (await import(pathToFileURL(ukvDatei).href)) };
}

// Alle Wege für eine Reihe von Geburtsdaten (Regelalter, Grenzen, offene Altersfälle) und zwei Tage.
const GEBURTEN = [g(1990), g(2008, 1, 1), g(2007, 12, 31), g(2006, 6, 1), g(1956, 6, 1), g(1950, 6, 1), g(1946, 6, 1), g(1940, 6, 1)];
function alleFaelle(modul = W) {
  const liste = [];
  [NOV, DEZ].forEach((heute) => GEBURTEN.forEach((geburt) => {
    modul.alleWege({ geburt }, { heute }).forEach((weg) => liste.push({ ...weg, heute }));
  }));
  return liste;
}

test('35: jede Antwortkombination ergibt genau ein Ziel, jeder Fall steht in der Matrix', async () => {
  const faelle = alleFaelle();
  assert.ok(faelle.length > 100, `nur ${faelle.length} Wege`);
  faelle.forEach(({ v, heute }) => {
    const z = W.zielAus(v, { heute });
    assert.ok(z, JSON.stringify(v));
    assert.ok(['ukv', 'bayerische', 'bayerische-sofort', 'beide', 'telefon'].includes(z.ziel));
    assert.ok(W.MATRIX[z.fall], z.fall);
    assert.equal(z.klasse, W.MATRIX[z.fall].klasse);
  });
  Object.values(W.MATRIX).forEach((zeile) => {
    assert.ok(['belegt', 'gleichgestellt', 'offen', 'grenze'].includes(zeile.klasse));
    assert.ok(zeile.beleg && zeile.beleg.length > 10, 'Beleg je Zeile');
  });
  // Jede Zeile der Matrix 1.0 als eigener Fall (unter den Voreinstellungen erreichbar).
  const fall = (v, heute) => ziel(v, heute).fall;
  assert.equal(fall({ geburt: g(2010) }), 'unter18');
  assert.equal(fall({ geburt: g(1940) }), 'ab81');
  assert.equal(fall({ geburt: g(2008, 1, 1), V2: 'pflicht' }), 'alter1819');
  assert.equal(fall({ geburt: g(1990), V2: 'privat' }), 'privat');
  assert.equal(fall({ geburt: g(1990), V2: 'heilfuersorge' }), 'heilfuersorge');
  // Abschluss UKV (20.11.2026): Eintrittsalter 71 bis 80 und „freiwillig gesetzlich“ gehen wie der Regelfall zur UKV (UKV_BELEGT).
  assert.equal(W.naechsterSchritt({ geburt: g(1950), V2: 'pflicht' }, { heute: NOV }), 'einwilligung');
  assert.equal(fall(basis({ geburt: g(1950), V3: 'nein', V4: '0' })), 'regelfall');
  assert.equal(fall(basis({ V2: 'freiwillig', V3: 'nein', V4: '0' })), 'regelfall');
  assert.equal(fall(basis({ V2: 'freiwillig', V3: 'nein', V4: '1' })), 'luecke');
  // Mit den Konstanten vor der Messung (alle false) bleiben die offenen Zeilen erreichbar und gehen zum Telefon.
  const { W: offen } = await mitBelegt(OFFEN_ALLE);
  const fallOffen = (v, heute = NOV) => offen.zielAus(v, { heute }).fall;
  assert.equal(fallOffen({ geburt: g(1950), V2: 'pflicht' }), 'alter71bis80');
  assert.equal(fallOffen(basis({ V2: 'freiwillig', V3: 'nein', V4: '0', V5: 'nein' })), 'freiwilligBay');
  assert.equal(fallOffen(basis({ V2: 'freiwillig', V3: 'nein', V4: '1' })), 'freiwilligOffen');
  assert.equal(fallOffen(basis({ geburt: g(1990), V3: 'nein', V4: '3' })), 'luecke', 'Z100 mit 3 bleibt auch vor der Messung');
  assert.equal(offen.zielAus({ geburt: g(1950), V2: 'pflicht' }, { heute: NOV }).ziel, 'telefon');
  assert.equal(fall(basis({ V3: 'nein', V4: '0' })), 'regelfall');
  assert.equal(fall(basis({ V3: 'nein', V4: '2' })), 'luecke');
  assert.equal(fall(basis({ V3: 'nein', V4: '>3' })), 'mehrAls3');
  assert.equal(fall(basis({ V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein' })), 'behandlungSofort');
  assert.equal(fall(basis({ V3: 'fertig', V4: '0', V5: 'nein' })), 'behandlungFertig');
  assert.equal(fall(basis({ V3: 'steht_an', V3a: 'ja' })), 'ziehen');
  assert.equal(fall(basis({ V3: 'steht_an', V3a: 'nein', V4: '1' })), 'behandlungMitLuecke');
  assert.equal(fall(basis({ V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'ja' })), 'behandlungMitLuecke');
  assert.equal(fall(basis({ V3: 'fertig', V4: '2' })), 'fertigMitLuecke');
  // Ziele der Voreinstellung.
  assert.equal(ziel(basis({ V3: 'nein', V4: '0' })).ziel, 'ukv');
  assert.equal(ziel(basis({ V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein' })).ziel, 'bayerische-sofort');
  assert.deepEqual(ziel(basis({ V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein' })).bausteine, ['ZAHN_SOFORT']);
  assert.equal(ziel(basis({ V3: 'fertig', V4: '0', V5: 'nein' })).ziel, 'bayerische');
});

test('22/35: 90er mit 3 und 75er mit 2 seit der Messung an der Weiche (Preis wie das Original); mit false fehlen sie, 100er mit 3 bleibt', async () => {
  assert.equal(UKV_BELEGT.z90DreiZaehne, true);
  assert.equal(UKV_BELEGT.z75ZweiZaehne, true);
  const stufe = (V4, id) => ziel(basis({ V3: 'nein', V4 })).stufen.find((s) => s.id === id);
  // Messung 20.11.2026 Fall 4 und 5 (Jahrgang 1990): 22,77 + 3 × 9,00 = 49,77 und 11,70 + 2 × 6,10 = 23,90.
  assert.deepEqual([stufe('3', 'Z90').grundbeitrag, stufe('3', 'Z90').beitrag], [22.77, 49.77]);
  assert.deepEqual([stufe('2', 'Z75').grundbeitrag, stufe('2', 'Z75').beitrag], [11.7, 23.9]);
  const { W: offen } = await mitBelegt(OFFEN_ALLE);
  const drei = offen.zielAus(basis({ V3: 'nein', V4: '3' }), { heute: NOV }).stufen.map((s) => s.id);
  const zwei = offen.zielAus(basis({ V3: 'nein', V4: '2' }), { heute: NOV }).stufen.map((s) => s.id);
  assert.ok(drei.includes('Z100') && !drei.includes('Z90'), drei.join());
  assert.ok(zwei.includes('Z100') && !zwei.includes('Z75'), zwei.join());
  // Zuschlag wie die UKV: 100er bei 36 Jahren 30,05 + 3 × 10,90 = 62,75 (TABELLE, lauf3).
  assert.equal(ziel(basis({ V3: 'nein', V4: '3' })).stufen.find((s) => s.id === 'Z100').beitrag, 62.75);
});

test('36: kein Fall der Klasse „offen“ online; mit GLEICHGESTELLT_ONLINE = false auch kein „gleichgestellt“', async () => {
  alleFaelle().forEach(({ v, heute }) => {
    const z = W.zielAus(v, { heute });
    if (z.klasse === 'offen' || z.klasse === 'grenze') assert.equal(z.ziel, 'telefon', `${z.fall} ${JSON.stringify(v)}`);
  });
  const streng = await mitKonstanten({ GLEICHGESTELLT_ONLINE: false });
  let gleichgestellt = 0;
  alleFaelle(streng).forEach(({ v, heute }) => {
    const z = streng.zielAus(v, { heute });
    if (z.klasse === 'gleichgestellt') { gleichgestellt += 1; assert.equal(z.ziel, 'telefon', z.fall); }
    if (z.klasse === 'offen') assert.equal(z.ziel, 'telefon');
  });
  assert.ok(gleichgestellt > 0, 'Fälle der Klasse gleichgestellt gefunden');
  // Ohne „gleichgestellt“ wird V5 auch auf dem Weg zur UKV gestellt.
  assert.equal(streng.naechsterSchritt(basis({ V3: 'nein', V4: '0' }), { heute: NOV }), 'V5');
  assert.equal(streng.zielAus(basis({ V3: 'nein', V4: '0', V5: 'ja' }), { heute: NOV }).ziel, 'telefon');
});

test('37: Ergebnis der Weiche ohne Gesundheitsantworten; Maske startet ohne Antworten', () => {
  alleFaelle().forEach(({ v, heute }) => {
    const z = W.zielAus(v, { heute });
    assert.ok(!('antworten' in z), 'kein Feld antworten');
    ['V3', 'V3a', 'V5'].forEach((key) => assert.ok(!(key in z)));
  });
  // ZahnStrecke gibt der Maske keine Antworten mit (C1), keine Vorbelegung „Aus deinen Antworten vorab übernommen“.
  assert.doesNotMatch(STRECKE, /antworten:\s*ziel/);
  assert.doesNotMatch(STRECKE, /vorbelegt:|Aus deinen Antworten vorab übernommen/);
});

test('38: V5 nur, wenn das Ziel sonst die Bayerische wäre; V3a nur bei „steht an“; Ziehen „ja“ endet vor V4', () => {
  const n = (v) => W.naechsterSchritt(v, { heute: NOV });
  assert.equal(n(basis({ V3: 'nein', V4: '0' })), null, 'Regelfall ohne V5');
  assert.equal(n(basis({ V3: 'nein', V4: '2' })), null, 'Lücke ohne V5');
  assert.equal(n(basis({ V3: 'steht_an', V3a: 'nein', V4: '0' })), 'V5');
  assert.equal(n(basis({ V3: 'fertig', V4: '0' })), 'V5');
  // Abschluss UKV: „freiwillig gesetzlich“ geht wie der Regelfall zur UKV, ohne V5 (vor der Messung V5, Weg zur Bayerischen).
  assert.equal(n(basis({ V2: 'freiwillig', V3: 'nein', V4: '0' })), null);
  assert.equal(n(basis({ V3: 'steht_an' })), 'V3a');
  assert.equal(n(basis({ V3: 'fertig' })), 'V4');
  assert.equal(n(basis({ V3: 'nein' })), 'V4');
  assert.equal(n(basis({ V3: 'steht_an', V3a: 'ja' })), null);
  alleFaelle().forEach(({ v, fragen }) => {
    if (fragen.includes('V3a')) assert.equal(v.V3, 'steht_an');
    if (v.V3a === 'ja') assert.ok(!fragen.includes('V4'));
    if (fragen.includes('V5')) {
      const ohne = { ...v };
      delete ohne.V5;
      const z = W.zielAus({ ...ohne, V5: 'nein' }, { heute: NOV });
      assert.ok(['bayerische', 'bayerische-sofort'].includes(z.ziel) || z.klasse !== 'belegt' || ['freiwilligOffen', 'heilfuersorge'].includes(z.fall), `${z.fall}`);
    }
  });
});

test('39: privat, unter 18 und ab 81 enden vor der Einwilligung', () => {
  ['privat', 'heilfuersorge'].forEach((V2) => assert.equal(W.naechsterSchritt({ geburt: g(1990), V2 }, { heute: NOV }), null));
  assert.equal(W.naechsterSchritt({ geburt: g(2010) }, { heute: NOV }), null);
  assert.equal(W.naechsterSchritt({ geburt: g(1940) }, { heute: NOV }), null);
  assert.equal(W.naechsterSchritt({ geburt: g(1990), V2: 'pflicht' }, { heute: NOV }), 'einwilligung');
  alleFaelle().forEach(({ v }) => {
    if (['privat', 'unter18', 'ab81'].includes(W.fallAus(v, { heute: NOV }))) assert.ok(!v.einwilligung);
  });
});

test('40: freiwillig seit der Messung wie pflicht zur UKV; vor der Messung (false) zur Bayerischen oder zum Telefon', async () => {
  assert.equal(ziel(basis({ V2: 'freiwillig', V3: 'nein', V4: '0' })).ziel, 'ukv');
  assert.equal(ziel(basis({ V2: 'freiwillig', V3: 'nein', V4: '2' })).ziel, 'ukv');
  assert.equal(ziel(basis({ V2: 'freiwillig', V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein' })).ziel, 'bayerische-sofort');
  const { W: offen } = await mitBelegt({ freiwilligGkv: false });
  const zo = (v) => offen.zielAus(v, { heute: NOV }).ziel;
  assert.equal(zo(basis({ V2: 'freiwillig', V3: 'nein', V4: '0', V5: 'nein' })), 'bayerische');
  assert.equal(zo(basis({ V2: 'freiwillig', V3: 'nein', V4: '2' })), 'telefon');
  assert.equal(zo(basis({ V2: 'freiwillig', V3: 'nein', V4: '0', V5: 'ja' })), 'telefon');
});

test('41: Heilfürsorge zum Telefon; mit WEICHE_HEILFUERSORGE_BAY = true zur Bayerischen', async () => {
  assert.equal(ziel({ geburt: g(1990), V2: 'heilfuersorge' }).ziel, 'telefon');
  const offen = await mitKonstanten({ WEICHE_HEILFUERSORGE_BAY: true });
  assert.equal(offen.naechsterSchritt({ geburt: g(1990), V2: 'heilfuersorge' }, { heute: NOV }), 'einwilligung');
  assert.equal(offen.zielAus(basis({ V2: 'heilfuersorge', V3: 'nein', V4: '0', V5: 'nein' }), { heute: NOV }).ziel, 'bayerische');
  assert.equal(offen.zielAus(basis({ V2: 'heilfuersorge', V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein' }), { heute: NOV }).ziel, 'bayerische-sofort');
  assert.equal(offen.zielAus(basis({ V2: 'heilfuersorge', V3: 'nein', V4: '1' }), { heute: NOV }).ziel, 'telefon');
});

test('42: Alter mit dem Beginn, den die Maske vorbelegt; Jahrgang 1956 und 1946 an den Jahresgrenzen', async () => {
  const sofort = (geburt, heute) => W.zielAus({ ...basis({ geburt }), V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein' }, { heute });
  // Bayerische: 1956 mit Beginn 01.12.2026 Eintrittsalter 70 (online), mit 01.01.2027 71 (gesperrt).
  assert.equal(sofort(g(1956, 6, 1), NOV).ziel, 'bayerische-sofort');
  assert.equal(sofort(g(1956, 6, 1), NOV).beginn.iso, '2026-12-01');
  // Abschluss UKV: Eintrittsalter 71 im Dezember geht zur UKV (UKV_BELEGT.alter71bis80), die Bayerische bleibt bei 70.
  assert.equal(W.naechsterSchritt({ geburt: g(1956, 6, 1), V2: 'pflicht' }, { heute: DEZ }), 'einwilligung');
  assert.equal(sofort(g(1956, 6, 1), DEZ).ziel, 'telefon', 'steht an, Bayerische nicht möglich, UKV lehnt Behandlung ab');
  assert.equal(W.zielAus({ ...basis({ geburt: g(1956, 6, 1) }), V3: 'nein', V4: '0' }, { heute: DEZ }).ziel, 'ukv');
  // UKV: 1946 im November Eintrittsalter 80 (online, 84,14 im 100er), im Dezember 81 (ab 81).
  const achtzig = W.zielAus({ ...basis({ geburt: g(1946, 6, 1) }), V3: 'nein', V4: '0' }, { heute: NOV });
  assert.deepEqual([achtzig.ziel, achtzig.stufen.find((s) => s.id === 'Z100').beitrag], ['ukv', 84.14]);
  assert.equal(W.zielAus({ geburt: g(1946, 6, 1) }, { heute: DEZ }).fall, 'ab81');
  // Vor der Messung (false): beide Altersfälle zum Telefon.
  const { W: offen } = await mitBelegt({ alter71bis80: false });
  assert.equal(offen.zielAus({ geburt: g(1956, 6, 1), V2: 'pflicht' }, { heute: DEZ }).fall, 'alter71bis80');
  assert.equal(offen.zielAus({ geburt: g(1946, 6, 1), V2: 'pflicht' }, { heute: NOV }).fall, 'alter71bis80');
  // Beginnfilter der Maske: 1956 bei der Bayerischen nur Dezember.
  assert.equal(W.bayerischeAlterOk({ geburt: g(1956, 6, 1), heute: NOV, beginn: { jahr: 2026, monat: 12 } }), true);
  assert.equal(W.bayerischeAlterOk({ geburt: g(1956, 6, 1), heute: NOV, beginn: { jahr: 2027, monat: 1 } }), false);
});

test('43: keine Wunschfrage q4, kein UKV_STUFE, keine Stufenvorgabe; mit WAHLREGEL „beide“ beide Karten und V5 im Regelfall', async () => {
  const quelle = fs.readFileSync(QUELLE, 'utf8');
  [quelle, STRECKE].forEach((text) => {
    assert.doesNotMatch(text, /UKV_STUFE|\bq4\b|from '[^']*zahnVorabfrage|getDentalContent|from '[^']*dentalContent/);
  });
  assert.equal(W.WAHLREGEL, 'ukv');
  const z = ziel(basis({ V3: 'nein', V4: '0' }));
  assert.ok(!('tarif' in z), 'keine Stufenvorgabe');
  assert.deepEqual(z.stufen.map((s) => s.id), ['Z100', 'Z90', 'Z75']);
  const beide = await mitKonstanten({ WAHLREGEL: 'beide' });
  assert.equal(beide.naechsterSchritt(basis({ V3: 'nein', V4: '0' }), { heute: NOV }), 'V5');
  assert.equal(beide.zielAus(basis({ V3: 'nein', V4: '0', V5: 'nein' }), { heute: NOV }).ziel, 'beide');
  assert.equal(beide.zielAus(basis({ V3: 'nein', V4: '0', V5: 'ja' }), { heute: NOV }).ziel, 'ukv');
  assert.match(STRECKE, /WEICHE_TEXTE\.beide\.titel/);
});

test('16: die Weiche zeigt nie einen Tarif bis 5,00 Euro (Jahrgang 2007 im Dezember, alle Alter)', () => {
  for (let jahr = 1946; jahr <= 2008; jahr += 1) {
    [NOV, DEZ].forEach((heute) => ['0', '1', '2', '3'].forEach((zaehne) => {
      W.ukvStufen({ geburt: g(jahr, 6, 1), zaehne, heute }).forEach((stufe) => {
        assert.ok(stufe.grundbeitrag > 5 && stufe.beitrag > 5, `${jahr} ${stufe.id} ${stufe.grundbeitrag}`);
      });
    }));
  }
  // 2007 mit Beginn 01.12.2026: ZahnPRIVAT 75 zu 0,99 Euro wird nicht angeboten (C8), die Weiche endet dort beim Telefon.
  assert.equal(W.ukvStufen({ geburt: g(2007, 6, 1), heute: NOV }).length, 0);
  assert.equal(ziel({ geburt: g(2007, 6, 1), V2: 'pflicht' }).ziel, 'telefon');
});

test('50 (Seite): ZAHN Sofort mit derselben Rundung wie der Dienst; Preisabfrage ohne Baustein', () => {
  assert.equal(W.ZAHN_SOFORT_MONAT, 29.9);
  assert.equal(W.bayerischeMitBaustein(14.6, W.ZAHN_SOFORT_MONAT), 44.5);
  assert.equal(W.bayerischeMitBaustein(44.1, W.ZAHN_SOFORT_MONAT), 74);
  assert.equal(W.bayerischeMitBaustein(W.bayerischeJeZahlweise(31.1, 'jaehrlich'), W.ZAHN_SOFORT_MONAT, 'jaehrlich'), 717.3);
  // Die Seite fragt den Dienst nur nach Geburtsdatum, PLZ, Beginn, ohne Baustein (1.6).
  assert.match(STRECKE, /tarifCode: 'PRESTIGE', bausteine: \[\], zahlweise: 'monatlich', geburtsdatum, beginnIso: beginn\.iso, plz/);
  assert.doesNotMatch(STRECKE.slice(STRECKE.indexOf('function useBayerischePreise'), STRECKE.indexOf('const bayerischeStufen')), /ZAHN_SOFORT|antworten|V3|V5/);
});

test('51: Fortschritt „Frage n von m“ stimmt für jeden Weg', () => {
  alleFaelle().forEach(({ v, fragen, heute }) => {
    // V1 ist schon beantwortet (alleWege ab dem Geburtsdatum), am Anfang gilt „Frage 1 von 6“.
    assert.deepEqual(W.fortschritt({}, { heute }), { n: 1, m: 6 });
    let vorher = null;
    const stand = { geburt: v.geburt };
    fragen.forEach((id, stelle) => {
      if (id === 'V3' && v.einwilligung) stand.einwilligung = v.einwilligung;
      const f = W.fortschritt(stand, { heute });
      assert.ok(f, `${id} ${JSON.stringify(stand)}`);
      assert.equal(f.n, stelle + 2, `n bei ${id}`);
      assert.ok(f.m >= f.n && f.m <= 6);
      if (vorher) assert.ok(f.m <= vorher.m, 'm wächst nie');
      // m ist die größte noch mögliche Zahl: Endet der Weg früher (etwa Ziehen „ja“), bleibt m darüber. Auf einem längsten Weg gilt am Ende n = m.
      if (stelle === fragen.length - 1) {
        const laengster = Math.max(...W.alleWege({ geburt: v.geburt }, { heute }).map((weg) => weg.fragen.length));
        if (fragen.length === laengster) assert.equal(f.n, f.m, `letzte Frage ${JSON.stringify(v)}`);
        else assert.ok(f.n <= f.m);
      }
      vorher = f;
      if (id === 'V1') stand.geburt = v.geburt; else stand[id] = v[id];
    });
  });
});

test('54: kein neuer Zähler, ANTRAGSWEG_ZIELE weiter 9', async () => {
  const zaehler = await import('../src/lib/anonyme-zaehler.js');
  assert.equal(zaehler.ANTRAGSWEG_ZIELE.length, 9);
  assert.doesNotMatch(STRECKE, /anonyme-zaehler|\bzaehle\(|zaehleEreignis|meldeZaehler/);
  assert.doesNotMatch(fs.readFileSync(QUELLE, 'utf8'), /localStorage|sessionStorage|fetch\(/);
});

test('55 bis 58: Rückweiche', async () => {
  const v = basis({ V3: 'nein', V4: '0' });
  const rw = (extra) => W.rueckweiche({
    v, vonProdukt: 'zahn-ukv', frageId: 'GF0073', wert: 'ja', heute: NOV, ...extra,
  });
  // 55: UKV GF0073 „Ja“ nach V3 nein und V4 keiner: Bayerische erst nach den Zusatzangaben.
  assert.deepEqual(rw().fehlt, ['W1']);
  assert.deepEqual(rw({ zusatz: { V3: 'steht_an' } }).fehlt, ['V3a']);
  assert.deepEqual(rw({ zusatz: { V3: 'steht_an', V3a: 'nein' } }).fehlt, ['V5']);
  assert.deepEqual(rw({ zusatz: { V3: 'steht_an', V3a: 'nein', V5: 'nein' } }).fehlt, ['plz']);
  const fertig = rw({
    zusatz: {
      V3: 'steht_an', V3a: 'nein', V5: 'nein', plz: '20095',
    },
  });
  assert.equal(fertig.art, 'wechsel');
  assert.equal(fertig.zu, 'zahn');
  assert.deepEqual(fertig.ziel.bausteine, ['ZAHN_SOFORT']);
  assert.equal(rw({
    zusatz: {
      V3: 'fertig', V5: 'nein', plz: '20095',
    },
  }).ziel.ziel, 'bayerische');
  assert.equal(W.zusatzAnzahl({ v, heute: NOV }), 4);
  // 56: mit Ziehen oder fehlenden Zähnen nur Telefon.
  assert.equal(rw({ zusatz: { V3: 'steht_an', V3a: 'ja' } }).art, 'telefon');
  assert.equal(W.rueckweiche({
    v: basis({ V3: 'nein', V4: '1' }), vonProdukt: 'zahn-ukv', frageId: 'GF0073', wert: 'ja', heute: NOV,
  }).art, 'telefon');
  assert.equal(rw({ zusatz: { V3: 'fertig', V5: 'ja' } }).art, 'telefon');
  // Andere UKV-Ablehnungen: mehr als 3 Zähne, privat, Versicherungsnehmer nein.
  assert.equal(W.rueckweiche({
    v, vonProdukt: 'zahn-ukv', frageId: 'TF0021', wert: '>3', heute: NOV,
  }).art, 'telefon');
  assert.equal(W.rueckweiche({
    v, vonProdukt: 'zahn-ukv', frageId: 'AF_AD_0005', wert: 'private Krankenversicherung/Heilfürsorge', heute: NOV,
  }).art, 'telefon');
  assert.equal(W.rueckweiche({
    v, vonProdukt: 'zahn-ukv', frageId: 'policyHolderIsEqualInsuredPerson', wert: 'nein', heute: NOV,
  }).art, 'telefon');
  // 58: Bayerische nach V3 „steht an“, dann Ablehnung: kein Angebot UKV.
  ['z1', 'z2', 'z3', 'z4'].forEach((frageId) => assert.equal(W.rueckweiche({
    v: basis({
      V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'nein',
    }),
    vonProdukt: 'zahn',
    frageId,
    wert: 'ja',
    heute: NOV,
  }).art, 'telefon'));
  // Freiwillig bei der Bayerischen (V3 nein): vor der Messung UKV offen, also Telefon. Seit der Messung kommt ein solcher Kunde mit V3 nein
  // gar nicht zur Bayerischen (Weiche zur UKV, Test 40).
  const { W: offen } = await mitBelegt({ freiwilligGkv: false });
  assert.equal(offen.rueckweiche({
    v: basis({
      V2: 'freiwillig', V3: 'nein', V4: '0', V5: 'nein',
    }),
    vonProdukt: 'zahn',
    frageId: 'z2',
    wert: 'ja',
    heute: NOV,
  }).art, 'telefon');
});

test('55 bis 59: Bayerische zur UKV mit WAHLREGEL „beide“, mit neuem Preis', async () => {
  const beide = await mitKonstanten({ WAHLREGEL: 'beide' });
  const r = beide.rueckweiche({
    v: basis({ V3: 'nein', V4: '0', V5: 'nein' }), vonProdukt: 'zahn', frageId: 'z3', wert: 'ja', heute: NOV,
  });
  assert.equal(r.art, 'wechsel');
  assert.equal(r.zu, 'zahn-ukv');
  assert.ok(r.ziel.stufen.length === 3 && r.ziel.stufen.every((s) => Number.isFinite(s.beitrag)));
  // 57: Beim Wechsel nur Anrede, Name, Geburtsdatum und PLZ (ZahnStrecke personDaten), Erklärungen neu.
  assert.match(STRECKE, /const personDaten = \{\s*anrede: daten\.anrede, vorname: daten\.formular\?\.vorname, nachname: daten\.formular\?\.nachname, plz: daten\.formular\?\.plz \|\| daten\.plz,\s*\};/);
  assert.match(STRECKE, /erklaerungen: \{ \[EINWILLIGUNG\.key\]: true \}/);
});

test('62 bis 64, 66: Texte der Maske auf dem Weg über die Weiche, alte Sätze sonst', () => {
  const wz = W.definitionFuerWeiche(zahn);
  const wu = W.definitionFuerWeiche(zahnUkv);
  assert.equal(W.definitionFuerWeiche(wz), wz, 'nur einmal');
  assert.equal(wz.textfassung, zahn.textfassung);
  const eintraege = (def) => def.erklaerungen.flatMap((teil) => teil.eintraege);
  const hinweise = (def, kontext) => eintraege(def).filter((e) => e.art === 'hinweis' && bedingungErfuellt(e.bedingung, kontext)).map((e) => e.text);
  assert.deepEqual(hinweise(wu, {}), [W.HINWEIS_AUSWAHL['zahn-ukv']]);
  assert.deepEqual(hinweise(wz, { bausteine: ['ZAHN_SOFORT'] }), [W.HINWEIS_AUSWAHL.zahn(true)]);
  assert.deepEqual(hinweise(wz, { bausteine: [] }), [W.HINWEIS_AUSWAHL.zahn(false)]);
  assert.match(W.HINWEIS_AUSWAHL.zahn(true), /Prestige der Bayerischen mit dem Baustein ZAHN Sofort\./);
  assert.match(W.HINWEIS_AUSWAHL.zahn(false), /Prestige der Bayerischen\. Grundlage/);
  [wz, wu].forEach((def) => {
    assert.equal(eintraege(def).find((e) => e.key === 'verzicht').haken, W.VERZICHT_WEICHE);
    assert.match(eintraege(def).find((e) => e.key === 'gesundheitsdaten').volltext.at(-1)[1], /^Meine Antworten auf die Vorfragen zur Auswahl der Gesellschaft speichert Healio nicht\.$/);
    assert.ok(def.absenden.vorbehalt.endsWith(` ${W.VORBEHALT_WEICHE}`));
    assert.ok(def.beitrag.vorbehalt.endsWith(` ${W.VORBEHALT_WEICHE}`));
    const nachweis = eintraege(def).find((e) => e.art === 'nachweis');
    assert.equal(nachweis.key, 'weicheEinwilligung');
    assert.equal(nachweis.haken, W.EINWILLIGUNG.haken);
    assert.ok(def.weiche);
  });
  // Einzelmasken und Prüfseite: alte Sätze.
  [zahn, zahnUkv].forEach((def) => {
    assert.ok(!def.weiche);
    assert.ok(!eintraege(def).some((e) => e.art === 'nachweis'));
    assert.match(eintraege(def).find((e) => e.art === 'hinweis').text, /^Gut zu wissen: In diesem Antrag geht es nur um/);
    assert.ok(!def.absenden.vorbehalt.includes(W.VORBEHALT_WEICHE));
    // 63: Text 6 und Kurzfassung bei Zahn ohne „Größe und Gewicht“.
    const e = eintraege(def).find((x) => x.key === 'gesundheitsdaten');
    assert.doesNotMatch(`${e.kurz} ${e.volltext.map((t) => t[1]).join(' ')}`, /Größe|Gewicht/);
    assert.match(e.kurz, /^Healio speichert deine Antworten auf die Zahnfragen und nutzt sie nur, um deinen Antrag an die (Bayerische|UKV) zu übermitteln\. Jederzeit widerrufbar\.$/);
  });
  // stationär und ambulant unverändert.
  [ambulant, stationaer].forEach((def) => {
    const e = eintraege(def).find((x) => x.key === 'gesundheitsdaten');
    if (e) assert.match(`${e.kurz} ${(e.volltext || []).map((t) => t[1]).join(' ')}`, /Größe und Gewicht|Größe, Gewicht|Gewicht/);
  });
  // 64: UKV mit „vorbehaltlich der Annahme“.
  assert.match(zahnUkv.absenden.vorbehalt, /^Dein Beitrag gilt vorbehaltlich der Annahme durch die UKV\./);
  // 66: keine Unterlagen ohne Datei.
  [zahn, zahnUkv, wz, wu].forEach((def) => eintraege(def).filter((x) => x.art === 'unterlagen').forEach((x) => x.gruppen.forEach((gruppe) => gruppe.eintraege.forEach((u) => assert.ok(u.dateien.length > 0, u.name)))));
  // GF0074: Satz nach „Ja“ (2.9 Nr. 14).
  assert.equal(zahnUkv.gesundheit.fragen.find((f) => f.id === 'GF0074').hinweisNachJa, 'Für Parodontosebehandlungen hast du bei der UKV keinen Versicherungsschutz. Dein Beitrag ändert sich dadurch nicht.');
});

test('53 (Seite): Antrag über die Weiche trägt weiche und die Einwilligung mit Zeitpunkt; ohne Weiche fehlt sie', () => {
  const wu = W.definitionFuerWeiche(zahnUkv);
  const daten = {
    tarif: 'Z100', bausteine: [], antworten: {}, formular: {}, erklaerungen: { weicheEinwilligung: true }, zeitpunkte: { weicheEinwilligung: '2026-11-20T10:00:00.000Z' }, geburtsdatum: '05.03.1990', iban: '',
  };
  const mit = baueSelbstantrag(wu, daten, { beginn: { iso: '2026-12-01' }, beitrag: { beitrag: 30.05 }, heute: NOV });
  assert.equal(mit.weiche, true);
  assert.equal(mit.erklaerungen.weicheEinwilligung, true);
  assert.deepEqual(mit.unterlagen.bestaetigt.find((b) => b.erklaerung === 'weicheEinwilligung'), { erklaerung: 'weicheEinwilligung', um: '2026-11-20T10:00:00.000Z' });
  const ohne = baueSelbstantrag(zahnUkv, { ...daten, erklaerungen: {}, zeitpunkte: {} }, { beginn: { iso: '2026-12-01' }, beitrag: { beitrag: 30.05 }, heute: NOV });
  assert.ok(!('weiche' in ohne));
  assert.ok(!('weicheEinwilligung' in ohne.erklaerungen));
});

test('46, 68: keine verbotenen Wendungen, keine Gedankenstriche, nie „ohne Gesundheitsfragen“', () => {
  const texte = JSON.stringify({
    EINSTIEG: W.EINSTIEG, VORFRAGEN: W.VORFRAGEN, EINWILLIGUNG: W.EINWILLIGUNG, SATZ: W.SATZ_AUSWAHL, GRUND: W.GRUND_TEXTE, H: W.HINWEIS_AUSWAHL['zahn-ukv'], V: W.VERZICHT_WEICHE, T6: W.TEXT6_WEICHE, VB: W.VORBEHALT_WEICHE,
  }) + [W.WEICHE_TEXTE.titel('zahn'), W.WEICHE_TEXTE.bruecke('zahn-ukv'), ...Object.values(W.WEICHE_TEXTE.warum).map((t) => (typeof t === 'function' ? t('2') : t)), ...W.WEICHE_TEXTE.gut.sofort, ...W.WEICHE_TEXTE.gut.luecke, W.WEICHE_TEXTE.telefon.text, W.WEICHE_TEXTE.telefon.darunter, W.WEICHE_TEXTE.beide.text, W.RUECKWEICHE_TEXTE.zurBayerischen.text(4), W.RUECKWEICHE_TEXTE.zurBayerischen.ergebnisText, W.RUECKWEICHE_TEXTE.zurUkv.text(true), W.RUECKWEICHE_TEXTE.stufe.text, W.HINWEIS_BEITRAG.zaehne('1', '2', '2'), W.HINWEIS_BEITRAG.beginn('01.01.2027', '1', '2'), W.HINWEIS_AUSWAHL.zahn(true)].join(' ');
  assert.doesNotMatch(texte, /[–—]/);
  assert.doesNotMatch(texte, /ohne Gesundheitsfragen|passt zu dir|Dein passender Tarif|vergleichen|empfehlen wir|garantiert/i);
  assert.doesNotMatch(STRECKE, /Das passt zu dir|Darum passt das|Dein passender Tarif|Du musst keine Versicherer vergleichen/);
  assert.doesNotMatch(fs.readFileSync(QUELLE, 'utf8'), /[–—]/);
  assert.equal(W.WEICHE_TEXTE.luecke, undefined);
  assert.equal(W.WEICHE_TEXTE.warum.luecke('1'), 'Dir fehlt 1 Zahn, der noch nicht ersetzt ist. Bei der Bayerischen ist dann online kein Abschluss möglich. Bei der UKV geht es mit einem Zuschlag je fehlendem Zahn.');
  assert.equal(W.WEICHE_TEXTE.warum.luecke('3'), 'Dir fehlen 3 Zähne, die noch nicht ersetzt sind. Bei der Bayerischen ist dann online kein Abschluss möglich. Bei der UKV geht es mit einem Zuschlag je fehlendem Zahn.');
});

test('Teil 6 Nr. 2: UKV-Ziel bei ausgeschaltetem UKV-Schalter ist der heutige Link mit Healios Kennung', () => {
  assert.equal(W.UKV_AUS_ZIEL, 'link');
  assert.match(STRECKE, /ukvAus && UKV_AUS_ZIEL === 'link'/);
  assert.match(STRECKE, /href=\{UKV_URL\}/);
});

// ---------------------------------------------------------------------------
// Nachbesserung Paket C (20.11.2026): je behobenem Mangel ein Test, der gegen den Stand 42d1969 fehlschlägt.
// ---------------------------------------------------------------------------

test('Nachbesserung W2: bei ausgeschalteter UKV-Maske ohne die Sätze zu Healio, E-Mail und Absenden', () => {
  assert.deepEqual(W.einstiegPunkte(), W.EINSTIEG.punkte);
  assert.deepEqual(W.einstiegPunkte({ ukvBeiHealio: false }), ['Ein paar kurze Fragen, dann siehst du, wo du mit deinen Angaben online abschließen kannst und was es kostet.']);
  assert.equal(W.seitenspalteFuss(), W.EINSTIEG.seitenspalteFuss);
  assert.equal(W.seitenspalteFuss({ ukvBeiHealio: false }), 'Deine Antworten zu deinen Zähnen bleiben auf dieser Seite.');
  assert.match(STRECKE, /einstiegPunkte\(\{ ukvBeiHealio: !ukvAus \}\)/);
  assert.match(STRECKE, /ohneUnterlagen=\{ukvAus && unklarObUkv\}/);
  assert.doesNotMatch(STRECKE, /EINSTIEG\.punkte\.map/);
});

test('Nachbesserung W3: Seitenspalte der Rückweiche nennt die neue Gesellschaft erst beim Ergebnis', () => {
  assert.match(STRECKE, /if \(phase === 'wechsel'\) vertrauenDef = rw\?\.art === 'wechsel' \? DEFINITIONEN\[rw\.zu\] : null;/);
  assert.match(STRECKE, /<VertrauenPunkte definition=\{vertrauenDef\}/);
});

test('Nachbesserung K2: Anzahl im Rückweiche-Kasten aus der Lage', async () => {
  const v = basis({ V3: 'nein', V4: '0' });
  const af = 'freiwillig gesetzlich versichert in deutscher GKV';
  assert.equal(W.zusatzAnzahl({ v, heute: NOV }), 4);
  assert.equal(W.zusatzAnzahl({ v: { ...v, V5: 'nein' }, heute: NOV }), 3);
  // Abschluss UKV: AF_AD_0005 „freiwillig“ hat in der UKV-Maske keine Wirkung mehr, eine Rückweiche entsteht dort nicht.
  assert.deepEqual(wirkungenUkv({ AF_AD_0005: af }), []);
  // Vor der Messung (false): Rückweiche nach AF_AD_0005 mit zwei Angaben.
  const { W: offen } = await mitBelegt({ freiwilligGkv: false });
  assert.equal(offen.zusatzAnzahl({
    v, frageId: 'AF_AD_0005', wert: af, heute: NOV,
  }), 2);
  assert.equal(W.RUECKWEICHE_TEXTE.zurBayerischen.text(2), 'Bei der Bayerischen kannst du vielleicht trotzdem online abschließen. Dafür brauchen wir noch zwei kurze Angaben.');
  assert.equal(W.RUECKWEICHE_TEXTE.zurBayerischen.text(1), 'Bei der Bayerischen kannst du vielleicht trotzdem online abschließen. Dafür brauchen wir noch eine kurze Angabe.');
  assert.match(STRECKE, /zusatzAnzahl\(\{\s*v, vonProdukt: produkt, frageId, wert, heute,\s*\}\)/);
});

test('Nachbesserung K3: Wechsel nach AF_AD_0005 behält V3, übernimmt die Krankenversicherung und neu Gefragtes', async () => {
  const v = basis({ V3: 'nein', V4: '0' });
  const af = 'freiwillig gesetzlich versichert in deutscher GKV';
  // Gilt nur vor der Messung (UKV_BELEGT.freiwilligGkv = false); seit der Messung gibt es diesen Wechsel nicht mehr (K2).
  const { W: offen } = await mitBelegt({ freiwilligGkv: false });
  const nach = offen.vorfragenNachWechsel({
    v, vonProdukt: 'zahn-ukv', frageId: 'AF_AD_0005', wert: af, zusatz: { V5: 'nein', plz: '20095' },
  });
  assert.equal(nach.V3, 'nein');
  assert.equal(nach.V2, 'freiwillig');
  assert.equal(nach.V5, 'nein');
  assert.equal(offen.zielAus(nach, { heute: NOV }).ziel, 'bayerische');
  const gf = W.vorfragenNachWechsel({
    v, vonProdukt: 'zahn-ukv', frageId: 'GF0073', wert: 'ja', zusatz: { V3: 'steht_an', V3a: 'nein', V5: 'nein' },
  });
  assert.deepEqual([gf.V3, gf.V3a, gf.V5], ['steht_an', 'nein', 'nein']);
  assert.equal(W.zielAus(gf, { heute: NOV }).ziel, 'bayerische-sofort');
  assert.doesNotMatch(STRECKE, /V3: wechsel\.zusatz\.V3,/);
  assert.match(STRECKE, /vorher: v/);
});

test('Nachbesserung K4: abgerechnete Behandlung mit Vorgeschichte oder fehlenden Zähnen hat einen eigenen Grund', () => {
  const fall = (v) => W.fallAus(v, { heute: NOV });
  assert.equal(fall(basis({ V3: 'fertig', V4: '0', V5: 'ja' })), 'fertigMitLuecke');
  assert.equal(fall(basis({ V3: 'steht_an', V3a: 'nein', V4: '0', V5: 'ja' })), 'behandlungMitLuecke');
  for (const v of [basis({ V3: 'fertig', V4: '0', V5: 'ja' }), basis({ V3: 'fertig', V4: '2' })]) {
    const z = W.zielAus(v, { heute: NOV });
    assert.equal(z.ziel, 'telefon');
    assert.equal(z.grund, 'fertigMitLuecke');
    assert.equal(W.GRUND_TEXTE[z.grund], 'Kommen eine abgerechnete Behandlung und fehlende Zähne oder eine Vorgeschichte zusammen, bieten wir online keinen Abschluss an.');
  }
  assert.doesNotMatch(W.GRUND_TEXTE.fertigMitLuecke, /[–—]/);
});
