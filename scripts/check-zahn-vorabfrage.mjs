// Regeltest der Zahn-Vorabfrage (src/components/antragsmaske/zahnVorabfrage.js):
// jede Antwortkombination führt zu genau einem Ziel, die Zuordnung entspricht
// dem Zahn-Check auf /zahn, und vorbelegte Antworten passen zu den Fragen des
// Zielprodukts. Aufruf: node --test scripts/check-zahn-vorabfrage.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  alleKombinationen, ergebnisSchluessel, gestellteFragen, naechsteFrage, zielAus,
} from '../src/components/antragsmaske/zahnVorabfrage.js';
import { DEFINITIONEN } from '../src/data/antrag/index.js';

const ZIELE = new Set(['ukv', 'bayerische-sofort', 'telefon']);

test('jede Kombination hat genau ein Ziel', () => {
  const alle = alleKombinationen();
  assert.ok(alle.length >= 20, `nur ${alle.length} Kombinationen`);
  alle.forEach((a) => {
    const ziel = zielAus(a);
    assert.ok(ziel && ZIELE.has(ziel.ziel), `kein Ziel für ${JSON.stringify(a)}`);
    assert.equal(naechsteFrage(a), null);
  });
});

test('Zuordnung wie im Zahn-Check (computeResult)', () => {
  const ziel = (a) => zielAus(a).ziel;
  assert.equal(ziel({ q1: 'ja', q2: 'keine', q3: 'nein', schmelz: 'nein' }), 'bayerische-sofort');
  assert.equal(zielAus({ q1: 'ja', q2: 'keine', q3: 'nein', schmelz: 'nein' }).bausteine[0], 'ZAHN_SOFORT');
  assert.equal(ziel({ q1: 'ja', q2: 'keine', q3: 'ja' }), 'telefon');
  assert.equal(ziel({ q1: 'ja', q2: 'wenige' }), 'telefon');
  assert.equal(ziel({ q1: 'nein', q2: 'ziehen' }), 'telefon');
  assert.equal(ziel({ q1: 'fertig', q2: 'viele' }), 'telefon');
  assert.equal(ziel({ q1: 'nein', q2: 'wenige', anzahl: '2' }), 'ukv');
  assert.equal(ziel({ q1: 'fertig', q2: 'keine', q3: 'ja' }), 'ukv');
  assert.equal(ergebnisSchluessel({ q1: 'nein', q2: 'keine', q3: 'nein', q4: 'preis' }), 'ukvPreis');
  assert.equal(zielAus({ q1: 'nein', q2: 'keine', q3: 'nein', q4: 'preis' }).tarif, 'Z75');
  assert.equal(zielAus({ q1: 'nein', q2: 'keine', q3: 'nein', q4: 'leistung' }).tarif, 'Z100');
  assert.equal(zielAus({ q1: 'nein', q2: 'wenige', anzahl: '1' }).tarif, null);
  // Neu nur dort, wo die Strecken es brauchen: Zahnschmelzdefekt vor der Bayerischen.
  assert.equal(ziel({ q1: 'ja', q2: 'keine', q3: 'nein', schmelz: 'ja' }), 'telefon');
});

test('gestellte Fragen folgen der Reihenfolge', () => {
  assert.deepEqual(gestellteFragen({}), ['q1']);
  assert.deepEqual(gestellteFragen({ q1: 'nein', q2: 'keine', q3: 'nein' }), ['q1', 'q2', 'q3', 'q4']);
  assert.deepEqual(gestellteFragen({ q1: 'ja', q2: 'keine', q3: 'nein' }), ['q1', 'q2', 'q3', 'schmelz']);
  assert.deepEqual(gestellteFragen({ q1: 'nein', q2: 'wenige' }), ['q1', 'q2', 'anzahl']);
});

test('vorbelegte Antworten gehören zu echten Fragen des Zielprodukts', () => {
  alleKombinationen().forEach((a) => {
    const ziel = zielAus(a);
    if (ziel.ziel === 'telefon') return;
    const definition = DEFINITIONEN[ziel.produkt];
    assert.ok(definition, ziel.produkt);
    if (ziel.tarif) assert.ok(definition.tarife.some((t) => t.id === ziel.tarif), `Tarif ${ziel.tarif}`);
    ziel.bausteine.forEach((id) => assert.ok(definition.bausteine.some((b) => b.id === id), id));
    Object.entries(ziel.antworten).forEach(([id, wert]) => {
      const frage = definition.gesundheit.fragen.find((f) => f.id === id);
      assert.ok(frage, `Frage ${id} fehlt in ${ziel.produkt}`);
      if (frage.typ === 'janein') assert.ok(['ja', 'nein'].includes(wert));
      else assert.ok(frage.optionen.some((o) => o.id === wert), `${id}=${wert}`);
      // Nie eine vorbelegte Antwort, die online ablehnt.
      const wirkung = frage.typ === 'janein' ? frage.wirkung?.[wert] : frage.optionen.find((o) => o.id === wert)?.wirkung;
      assert.ok(!(wirkung || []).some((w) => w.art === 'keineAufnahme'), `${id}=${wert} lehnt ab`);
    });
  });
});
