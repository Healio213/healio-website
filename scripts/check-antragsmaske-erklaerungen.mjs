// Erklärungen der Antragsmaske je Produkt einheitlich (19.11.2026): Hinweis auf
// die eingeschränkte Auswahl, Erstinformation, Link zur Datenschutzerklärung an
// der Einwilligung zu den Gesundheitsangaben, Level Nine als Empfänger bei SDK
// und UKV, kein SMS-Platzhalter.
//
// Aufruf: node --test scripts/check-antragsmaske-erklaerungen.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { DEFINITIONEN } from '../src/data/antrag/index.js';
import * as texte from '../src/data/sdkAmbulantAntragTexte.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const alle = (definition) => definition.erklaerungen.flatMap((teil) => teil.eintraege);
const volltext = (eintrag) => (eintrag.volltext || []).map(([, inhalt]) => inhalt).join(' ');

for (const [pfad, definition] of Object.entries(DEFINITIONEN)) {
  test(`${pfad}: Auswahl, Erstinformation, Datenschutz-Link`, () => {
    const eintraege = alle(definition);
    const auftrag = definition.erklaerungen.find((teil) => teil.teil === 'Beratung und Auftrag');
    assert.ok(auftrag, 'Teil „Beratung und Auftrag“');
    const auswahl = auftrag.eintraege[0];
    assert.equal(auswahl.art, 'hinweis');
    assert.match(auswahl.text, /^Gut zu wissen: In diesem Antrag geht es nur um die .+ Grundlage sind die Bedingungen und Beiträge der (SDK|Bayerischen|UKV)\. Andere Versicherer vergleichen wir hier nicht\.$/);
    const healio = eintraege.flatMap((eintrag) => eintrag.gruppen || []).filter((gruppe) => gruppe.von === 'Von Healio');
    assert.equal(healio.length, 1, 'genau eine Gruppe „Von Healio“');
    assert.deepEqual(healio[0].eintraege[0], { name: 'Erstinformation', dateien: [{ label: 'Erstinformation', href: '/erstinformation' }] });
    assert.deepEqual(healio[0].eintraege.slice(1).map((e) => e.name), texte.UNTERLAGEN_HEALIO);
    const einwilligung = eintraege.find((eintrag) => eintrag.key === 'gesundheitsdaten');
    assert.deepEqual(einwilligung.links, [{ label: 'Datenschutzerklärung', href: '/datenschutz' }]);
    assert.equal(einwilligung.haken, 'Ich bin einverstanden.', 'Wortlaut des Hakens unverändert');
    assert.doesNotMatch(volltext(einwilligung), /\b\d+ Tage/, 'keine Löschfrist (Anwaltsfrage)');
  });
}

test('Empfänger in der Einwilligung: Level Nine bei SDK und UKV, nicht bei der Bayerischen', () => {
  const text = (pfad) => volltext(alle(DEFINITIONEN[pfad]).find((eintrag) => eintrag.key === 'gesundheitsdaten'));
  assert.match(text('ambulant'), /Online-Antragsstrecke der SDK, die die cpit comparit GmbH \(Level Nine\) für die SDK betreibt/);
  assert.match(text('stationaer'), /Online-Antragsstrecke der SDK, die die cpit comparit GmbH \(Level Nine\) für die SDK betreibt/);
  assert.match(text('zahn-ukv'), /Online-Antragsstrecke der UKV, die die cpit comparit GmbH \(Level Nine\) für die UKV betreibt/);
  assert.doesNotMatch(text('zahn-ukv'), /SDK|Süddeutsche/);
  assert.doesNotMatch(text('zahn'), /Level Nine|cpit|SDK/);
});

test('Stationär: Auswahl nennt SP1, SP2, SPU; ambulant AP5 bis AP1', () => {
  const erster = (pfad) => DEFINITIONEN[pfad].erklaerungen.find((teil) => teil.teil === 'Beratung und Auftrag').eintraege[0].text;
  assert.match(erster('stationaer'), /SP1, SP2 und SPU/);
  assert.equal(erster('ambulant'), texte.TEXT_8_AUSWAHL);
});

test('SMS-Platzhalter entfernt', () => {
  assert.equal('TEXT_12_SMS_PLATZHALTER' in texte, false);
  const quellen = fs.readdirSync(path.join(ROOT, 'src'), { recursive: true }).filter((f) => /\.(jsx?|tsx?)$/.test(f));
  assert.deepEqual(quellen.filter((f) => /SMS_PLATZHALTER|Platzhalter: Im echten Betrieb/.test(fs.readFileSync(path.join(ROOT, 'src', f), 'utf8'))), []);
});
