import assert from 'node:assert/strict';
import { test } from 'node:test';

const model = await import('../src/lib/altersvorsorgeVormerkung.js').catch((error) => {
  if (error.code === 'ERR_MODULE_NOT_FOUND') return {};
  throw error;
});

test('Depotmodell: 25 Jahre mit monatlich 150 EUR und jährlicher Grundzulage', () => {
  assert.equal(typeof model.berechneVorsorgeModell, 'function', 'Depotmodell fehlt');
  const result = model.berechneVorsorgeModell({ monatsbeitrag: 150, alter: 42, rendite: 0.04 });
  assert.equal(result.jahre, 25);
  assert.equal(result.eigenbeitraege, 45000);
  assert.equal(result.zulagen, 13500);
  assert.equal(Math.round(result.endkapital), 98816);
});

test('Depotmodell hält bei null Rendite Einzahlungen vollständig auseinander', () => {
  assert.equal(typeof model.berechneVorsorgeModell, 'function', 'Depotmodell fehlt');
  const result = model.berechneVorsorgeModell({ monatsbeitrag: 150, alter: 42, rendite: 0 });
  assert.equal(result.endkapital, 58500);
  assert.equal(model.berechneVorsorgeModell({ monatsbeitrag: 150, alter: 67 }), null);
  assert.equal(model.berechneVorsorgeModell({ monatsbeitrag: NaN, alter: 42 }), null);
  assert.equal(model.berechneVorsorgeModell({ monatsbeitrag: 150, alter: 42, rendite: -0.05 }), null);
});

test('Steuermodell zieht Zulage ab und zeigt keinen doppelten Fördervorteil', () => {
  assert.equal(typeof model.berechneSteuerModell, 'function', 'Steuermodell fehlt');
  assert.equal(model.berechneSteuerModell({ monatsbeitrag: 150, kinder: 0, steuersatz: 0.2 }), 0);
  assert.equal(model.berechneSteuerModell({ monatsbeitrag: 150, kinder: 0, steuersatz: 0.3 }), 162);
  assert.equal(model.berechneSteuerModell({ monatsbeitrag: 150, kinder: 0, steuersatz: 0.42 }), 442.8);
  assert.equal(model.berechneSteuerModell({ monatsbeitrag: 150, kinder: 2, steuersatz: 0.3 }), 0);
});

test('Einmaliger Startbonus mindert den zusätzlichen Steuervorteil nicht (§ 10a Abs. 1 Satz 6)', () => {
  assert.equal(model.berechneSteuerModell({ monatsbeitrag: 150, kinder: 0, unter25: true, steuersatz: 0.3 }), 162);
  assert.equal(model.berechneSteuerModell({ monatsbeitrag: 150, kinder: 2, unter25: true, steuersatz: 0.42 }), 94.8);
});

test('Anfrage enthält die gewählte Rechnung, Status und ausdrücklich erteilte Einwilligung', () => {
  assert.equal(typeof model.buildVormerkungMessage, 'function', 'Anfragetext fehlt');
  const message = model.buildVormerkungMessage({ monatsbeitrag: 50, kinder: 2, unter25: true, selbststaendig: true, riester: true }, true);
  assert.match(message, /50 EUR/);
  assert.match(message, /840 EUR/);
  assert.match(message, /Selbstständig: ja/);
  assert.match(message, /Riester-Vertrag: ja/);
  assert.match(message, /200 EUR/);
  assert.match(message, /telefonisch/);
  assert.doesNotMatch(model.buildVormerkungMessage({ monatsbeitrag: 150, kinder: 0, unter25: false }, false), /telefonisch/);
});
