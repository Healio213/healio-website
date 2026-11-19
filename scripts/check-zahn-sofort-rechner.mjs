/**
 * Prüfung des Rechners auf /zahn/behandlung-steht-an ohne Browser.
 * Grundlage: Healio/Zahn-Mikroseiten/SEITENPLAN-BEHANDLUNG-STEHT-AN.md, Abschnitt 4
 * (Formeln 4.3, Grenzfälle 4.4, Schalter 4.5, Prüffälle 4.7).
 *
 * - alle 13 Prüffälle, je mit Jahresgrenze anteilig (Schalter true) und voll (false)
 * - Schalter BEGINNJAHR_ANTEILIG steht auf false (volle Jahressumme im Beginnjahr) und ist eine einzelne Konstante
 * - Eingabe „1.040,50“ und „1040,5“ werden richtig gelesen
 * - S1 ist nie 1.500 EUR, Beträge in ganzen Cent
 * - Datenschutz: Quelltext von Logik und Oberfläche enthält weder localStorage,
 *   sessionStorage, fetch, trackEvent noch URLSearchParams
 *
 * Ausführen: npm run test:zahn-sofort-rechner
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  BEGINNJAHR_ANTEILIG, BAUSTEIN_BEITRAG_CENT, berechneZahnSofort, formatEuro, parseBetrag, vorwahlBeginnMonat,
} from '../src/lib/zahnSofortRechner.js';

const cent = (euro) => Math.round(euro * 100);

const rechne = (eingabe, anteilig) => berechneZahnSofort({
  art: 'unbekannt', vorsorge: false, beginnMonat: 1, ...eingabe,
}, { anteilig });

// Spalten: G, K, Eingabe, M, P, [S1, R1, S2, R2] anteilig, [S1, R1, S2, R2] voll (Werte in EUR)
const FAELLE = [
  { nr: 1, name: 'Krone, Zahlen aus Q-HB-STADT', e: { gesamt: '1.040,00', kasse: '210,69', tarif: 'komfort', art: 'hoeher', vorsorge: false, beginnMonat: 1 }, p: 621.31, anteilig: [621.31, 208.00, 621.31, 208.00], voll: [621.31, 208.00, 621.31, 208.00] },
  { nr: 2, name: 'dieselbe Krone mit Prestige', e: { gesamt: '1.040,00', kasse: '210,69', tarif: 'prestige', beginnMonat: 1 }, p: 829.31, anteilig: [750.00, 79.31, 829.31, 0.00], voll: [750.00, 79.31, 829.31, 0.00] },
  { nr: 3, name: 'Inlay, Zahlen aus Q-HB-STADT', e: { gesamt: '650,00', kasse: '40,00', tarif: 'smart', beginnMonat: 1 }, p: 447.50, anteilig: [447.50, 162.50, 447.50, 162.50], voll: [447.50, 162.50, 447.50, 162.50] },
  { nr: 4, name: 'zwei Kronen und ein Inlay, Vorsorgenachweis', e: { gesamt: '1.900,00', kasse: '487,04', tarif: 'komfort', art: 'hoeher', vorsorge: true, beginnMonat: 1 }, p: 1222.96, anteilig: [750.00, 662.96, 1222.96, 190.00], voll: [750.00, 662.96, 1222.96, 190.00] },
  { nr: 5, name: 'Wurzelbehandlung und Krone, Beginn Juli', e: { gesamt: '2.400,00', kasse: '300,00', tarif: 'prestige', beginnMonat: 7 }, p: 2100.00, anteilig: [375.00, 1725.00, 1125.00, 975.00], voll: [750.00, 1350.00, 1500.00, 600.00] },
  { nr: 6, name: 'Kasse trägt mehr als Smart-Satz', e: { gesamt: '500,00', kasse: '400,00', tarif: 'smart', beginnMonat: 1 }, p: 0.00, anteilig: [0.00, 100.00, 0.00, 100.00], voll: [0.00, 100.00, 0.00, 100.00] },
  { nr: 7, name: 'Regelversorgung mit Komfort', e: { gesamt: '800,00', kasse: '480,00', tarif: 'komfort', art: 'regel', beginnMonat: 1 }, p: 320.00, anteilig: [320.00, 0.00, 320.00, 0.00], voll: [320.00, 0.00, 320.00, 0.00] },
  { nr: 8, name: 'Beginn Dezember', e: { gesamt: '1.200,00', kasse: '200,00', tarif: 'prestige', beginnMonat: 12 }, p: 1000.00, anteilig: [62.50, 937.50, 812.50, 187.50], voll: [750.00, 250.00, 1000.00, 0.00] },
  { nr: 9, name: 'Beginn Oktober, Komfort ohne Nachweis, Art unbekannt', e: { gesamt: '3.000,00', kasse: '600,00', tarif: 'komfort', art: 'unbekannt', vorsorge: false, beginnMonat: 10 }, p: 1800.00, anteilig: [187.50, 2212.50, 937.50, 1462.50], voll: [750.00, 1650.00, 1500.00, 900.00] },
];

for (const fall of FAELLE) {
  for (const [bezeichnung, anteilig, erwartet] of [['anteilig', true, fall.anteilig], ['voll', false, fall.voll]]) {
    test(`Fall ${fall.nr} (${fall.name}), Jahresgrenze ${bezeichnung}`, () => {
      const r = rechne(fall.e, anteilig);
      assert.equal(r.ok, true);
      assert.equal(r.tarifanteil, cent(fall.p), 'Tarifanteil P');
      assert.equal(r.sofort1, cent(erwartet[0]), 'S1');
      assert.equal(r.bleibt1, cent(erwartet[1]), 'R1');
      assert.equal(r.sofort2, cent(erwartet[2]), 'S2');
      assert.equal(r.bleibt2, cent(erwartet[3]), 'R2');
      assert.equal(r.kasse, cent(parseBetrag(fall.e.kasse).cent / 100), 'K bleibt unverändert');
      assert.equal(r.zweiJahre, r.sofort2 > r.sofort1, 'Zwei-Jahres-Zeile nur bei S2 > S1');
      assert.notEqual(r.sofort1, 150000, 'S1 ist nie 1.500 EUR');
      for (const wert of [r.tarifanteil, r.sofort1, r.sofort2, r.bleibt1, r.bleibt2]) assert.ok(Number.isInteger(wert), 'ganze Cent');
      assert.equal(r.baustein, BAUSTEIN_BEITRAG_CENT);
    });
  }
}

test('Fall 1 ergibt genau den Eigenanteil 208 EUR der Bayerischen (Krone mit Komfort), Fall 3 genau 162,50 EUR (Inlay mit Smart)', () => {
  assert.equal(formatEuro(rechne(FAELLE[0].e, true).bleibt1), '208,00 EUR');
  assert.equal(formatEuro(rechne(FAELLE[2].e, true).bleibt1), '162,50 EUR');
});

for (const anteilig of [true, false]) {
  test(`Fall 10: K > G gibt einen Fehler am Feld K und kein Ergebnis (${anteilig ? 'anteilig' : 'voll'})`, () => {
    const r = rechne({ gesamt: '500,00', kasse: '600,00', tarif: 'prestige' }, anteilig);
    assert.equal(r.ok, false);
    assert.equal(r.gesamt, 'ok');
    assert.equal(r.kasse, 'zuHoch');
  });

  test(`Fall 11: G leer gibt einen Hinweis und kein Ergebnis (${anteilig ? 'anteilig' : 'voll'})`, () => {
    for (const leer of ['', '   ', '0', '0,00']) {
      const r = rechne({ gesamt: leer, kasse: '100,00', tarif: 'komfort' }, anteilig);
      assert.equal(r.ok, false);
      assert.equal(r.gesamt, 'leer');
    }
  });

  test(`Fall 12: K = G gibt ein Ergebnis mit S = 0 und dem Hinweis „zahlt den ganzen Plan“ (${anteilig ? 'anteilig' : 'voll'})`, () => {
    const r = rechne({ gesamt: '700,00', kasse: '700,00', tarif: 'prestige' }, anteilig);
    assert.equal(r.ok, true);
    assert.equal(r.sofort1, 0);
    assert.equal(r.sofort2, 0);
    assert.equal(r.bleibt1, 0);
    assert.equal(r.bleibt2, 0);
    assert.equal(r.kasseZahltAlles, true);
    assert.equal(r.zweiJahre, false);
  });
}

test('Grenzfälle: K leer, ungültige Beträge, Obergrenze 50.000 EUR, Null als Festzuschuss', () => {
  assert.equal(rechne({ gesamt: '500', kasse: '' }, true).kasse, 'leer');
  assert.equal(rechne({ gesamt: '500', kasse: '0' }, true).ok, true, 'Festzuschuss 0 ist erlaubt');
  assert.equal(rechne({ gesamt: 'abc', kasse: '0' }, true).gesamt, 'ungueltig');
  assert.equal(rechne({ gesamt: '50.000,01', kasse: '0' }, true).gesamt, 'ungueltig');
  assert.equal(rechne({ gesamt: '50.000', kasse: '0' }, true).ok, true);
  assert.equal(rechne({ gesamt: '500', kasse: 'x' }, true).kasse, 'ungueltig');
  assert.equal(rechne({ gesamt: '-5', kasse: '0' }, true).gesamt, 'ungueltig');
});

test('Fall 6: Kasse trägt mehr als der Tarifsatz, Tarifanteil ist 0 bei K < G', () => {
  const r = rechne(FAELLE[5].e, true);
  assert.equal(r.tarifDeckt, true);
  assert.equal(r.kasseZahltAlles, false);
});

test('Art und Vorsorge gelten nur bei Komfort; Regelversorgung und Zahnbehandlung zählen den Nachweis als „nein“', () => {
  const regel = rechne({ gesamt: '1000', kasse: '100', tarif: 'komfort', art: 'regel', vorsorge: true }, true);
  assert.equal(regel.satz, 100);
  const behandlung = rechne({ gesamt: '1000', kasse: '100', tarif: 'komfort', art: 'behandlung', vorsorge: true }, true);
  assert.equal(behandlung.satz, 100);
  assert.equal(rechne({ gesamt: '1000', kasse: '100', tarif: 'komfort', art: 'hoeher', vorsorge: false }, true).satz, 80);
  assert.equal(rechne({ gesamt: '1000', kasse: '100', tarif: 'komfort', art: 'unbekannt', vorsorge: true }, true).satz, 90);
  assert.equal(rechne({ gesamt: '1000', kasse: '100', tarif: 'smart', art: 'hoeher', vorsorge: true }, true).satz, 75);
  assert.equal(rechne({ gesamt: '1000', kasse: '100', tarif: 'prestige', art: 'hoeher', vorsorge: false }, true).satz, 100);
});

test('Fall 13: „1.040,50“ wird als 1040,50 gelesen, „1040,5“ ebenso', () => {
  assert.deepEqual(parseBetrag('1.040,50'), { status: 'ok', cent: 104050 });
  assert.deepEqual(parseBetrag('1040,5'), { status: 'ok', cent: 104050 });
  assert.deepEqual(parseBetrag('1040,50'), { status: 'ok', cent: 104050 });
  assert.deepEqual(parseBetrag('1.040'), { status: 'ok', cent: 104000 });
  assert.deepEqual(parseBetrag(' 1.040,50 EUR '), { status: 'ok', cent: 104050 });
  assert.equal(parseBetrag('1,040,50').status, 'ungueltig');
  assert.equal(parseBetrag('1.04,50').status, 'ungueltig');
  assert.equal(parseBetrag('').status, 'leer');
  assert.equal(parseBetrag(undefined).status, 'leer');
});

test('Formatierung: deutsch mit zwei Nachkommastellen und EUR', () => {
  assert.equal(formatEuro(62131), '621,31 EUR');
  assert.equal(formatEuro(0), '0,00 EUR');
  assert.equal(formatEuro(150000), '1.500,00 EUR');
  assert.equal(formatEuro(6250), '62,50 EUR');
});

test('Schalter BEGINNJAHR_ANTEILIG steht auf false und ist genau eine Konstante im Code', () => {
  assert.equal(BEGINNJAHR_ANTEILIG, false);
  const quelle = readFileSync(new URL('../src/lib/zahnSofortRechner.js', import.meta.url), 'utf8');
  assert.equal((quelle.match(/export const BEGINNJAHR_ANTEILIG = false;/g) || []).length, 1);
  // Ohne ausdrückliche Option rechnet die Funktion mit dem Schalter.
  const ohneOption = berechneZahnSofort({ gesamt: '1.200,00', kasse: '200,00', tarif: 'prestige', beginnMonat: 12 });
  assert.equal(ohneOption.sofort1, 75000);
  assert.equal(ohneOption.anteilig, false);
});

test('Vorwahl des Beginnmonats: Monat nach dem heutigen, im Dezember der Januar', () => {
  assert.equal(vorwahlBeginnMonat(new Date(2026, 10, 10)), 12);
  assert.equal(vorwahlBeginnMonat(new Date(2026, 11, 3)), 1);
  assert.equal(vorwahlBeginnMonat(new Date(2026, 0, 15)), 2);
});

test('Datenschutz: Logik und Oberfläche speichern und senden nichts', () => {
  for (const datei of ['../src/lib/zahnSofortRechner.js', '../src/components/sections/dental/ZahnSofortRechner.jsx']) {
    const quelle = readFileSync(new URL(datei, import.meta.url), 'utf8');
    for (const verboten of ['localStorage', 'sessionStorage', 'fetch', 'trackEvent', 'URLSearchParams', 'document.cookie', 'sendBeacon', 'XMLHttpRequest']) {
      assert.ok(!quelle.includes(verboten), `${datei} darf „${verboten}“ nicht enthalten`);
    }
  }
});
