/**
 * Prüfung des Rechners „Kasse plus Tarif“ auf /ambulant/osteopathie ohne Browser.
 * Grundlage: Healio/Ambulant-Mikroseiten/SEITENPLAN-OSTEOPATHIE.md, Abschnitt 4
 * (Daten 4.3, Formeln 4.4, Ausgabe 4.5, Prüffälle 4.6).
 *
 * - Fall 1 bis 26 aus Plan 4.6 (Fall 25 und 26: Ausblenden der Kassenliste nach dem Stichtag)
 * - Umschalter ANRECHNUNG = 'gesamt' und Betragsformat
 * - Summe Kasse + Tarif nie über der Rechnung (alle Kassen, Stufen, Behandler)
 * - Datendatei: 15 Kassen, alphabetisch, mit Fundstelle, Stand, https-Quelle
 * - Datenschutz: Quelltext von Logik, Daten und Oberfläche ohne Speicherung, Netz, Messung
 *
 * Ausführen: npm run test:osteopathie-rechner
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ANRECHNUNG, GRENZEN, STUFEN, TARIF_RECHNET_ARZT, berechneOsteopathie, beitragsZeile, formatiereEuro,
  kassenHinweis, kassenlisteSichtbar,
} from '../src/lib/osteopathieRechner.js';
import { OSTEOPATHIE_KASSEN, PRUEFEN_BIS } from '../src/data/osteopathieKassen.js';
import inhalt from '../src/content/ambulantAnlaesse/osteopathie.js';

const HEUTE = { jahr: 2026, monat: 11, tag: 13 };
const cent = (euro) => Math.round(euro * 100);

const rechne = (eingabe, optionen = {}) => berechneOsteopathie({
  kasse: null, eigenZuschuss: 0, eigenSitzungen: 0, geburtsjahr: null, ...eingabe,
}, { heute: HEUTE, ...optionen });

// Spalten: Nr, Kasse, Behandler, Preis, Sitzungen, Stufe, R, Kasse, T1, T2, E1, E2, Zustand
const FAELLE = [
  [1, 'tk', 'heilpraktiker', 90, 6, 100, 540, 120, 420, 420, 0, 0, 'kasse'],
  [2, 'tk', 'heilpraktiker', 90, 12, 100, 1080, 120, 960, 40, 0, 920, 'kasse'],
  [3, 'tk', 'heilpraktiker', 90, 6, 50, 540, 120, 210, 210, 210, 210, 'kasse'],
  [4, 'barmer', 'heilpraktiker', 90, 6, 100, 540, 0, 540, 460, 0, 80, 'erwachsene'],
  [5, 'aok-bw', 'heilpraktiker', 100, 5, 100, 500, 0, 500, 500, 0, 0, 'behandlerKasse'],
  [6, 'aok-bw', 'physio', 100, 5, 100, 500, 300, 0, 0, 200, 200, 'kasse'],
  [7, 'aok-bremen', 'heilpraktiker', 100, 5, 70, 500, 240, 182, 182, 78, 78, 'kasse'],
  [8, 'aok-niedersachsen', 'heilpraktiker', 100, 6, 90, 600, 300, 270, 270, 30, 30, 'kasse'],
  [9, 'aok-nordost', 'heilpraktiker', 80, 4, 100, 320, 40, 280, 280, 0, 0, 'kasse'],
  [10, 'aok-plus', 'heilpraktiker', 50, 4, 100, 200, 135, 65, 65, 0, 0, 'kasse'],
  [11, 'aok-plus', 'heilpraktiker', 95, 3, 70, 285, 180, 73.5, 73.5, 31.5, 31.5, 'kasse'],
  [12, 'ikk-classic', 'arzt', 90, 6, 100, 540, 160, 0, 0, 380, 380, 'kasse'],
  [13, 'aok-hessen', 'heilpraktiker', 70, 4, 90, 280, 240, 36, 36, 4, 4, 'kasse'],
  [14, 'aok-hessen', 'physio', 70, 4, 90, 280, 0, 0, 0, 280, 280, 'behandlerKasse'],
  [15, 'aok-rps', 'physio', 120, 6, 50, 720, 240, 0, 0, 480, 480, 'kasse'],
  [16, 'aok-rheinland-hamburg', 'heilpraktiker', 90, 6, 100, 540, 0, 540, 460, 0, 80, 'erwachsene'],
  [17, 'aok-nordwest', 'physio', 110, 8, 100, 880, 300, 0, 0, 580, 580, 'kasse'],
  [18, 'dak', 'heilpraktiker', 120, 10, 100, 1200, 120, 1000, 0, 80, 1080, 'kasse'],
  [19, null, 'heilpraktiker', 90, 6, 100, 540, 0, 540, 460, 0, 80, 'keineKasse'],
];

for (const [nr, kasse, behandler, preis, sitzungen, stufe, r, kc, t1, t2, e1, e2, zustand] of FAELLE) {
  test(`Fall ${nr}: ${kasse ?? 'ohne Kasse'}, ${behandler}, ${preis} EUR, ${sitzungen} Sitzungen, Stufe ${stufe}`, () => {
    const erg = rechne({ kasse, behandler, preis, sitzungen, stufe });
    assert.ok(erg, 'Ergebnis vorhanden');
    assert.equal(erg.rechnungCent, cent(r), 'Rechnung');
    assert.equal(erg.kasseCent, cent(kc), 'Kasse');
    assert.equal(erg.tarifJahr1Cent, cent(t1), 'Tarif Jahr 1');
    assert.equal(erg.tarifJahr2Cent, cent(t2), 'Tarif Jahr 2');
    assert.equal(erg.eigenJahr1Cent, cent(e1), 'Eigen Jahr 1');
    assert.equal(erg.eigenJahr2Cent, cent(e2), 'Eigen Jahr 2');
    assert.equal(erg.kasseZustand, zustand, 'Zustand Kasse');
    assert.equal(erg.tarifZustand, behandler === 'heilpraktiker' ? 'tarif' : 'behandlerTarif', 'Zustand Tarif');
    assert.equal(erg.topfRestCent, STUFEN[stufe].topfCent - cent(t1), 'Topfrest');
  });
}

test('Fall 2: Topfrest 40 EUR nach dem ersten Jahr', () => {
  assert.equal(rechne({ kasse: 'tk', behandler: 'heilpraktiker', preis: 90, sitzungen: 12, stufe: 100 }).topfRestCent, 4000);
});

test('Fall 20: eigene Eingabe 30 EUR, 2 Sitzungen, Physiotherapeut', () => {
  const erg = rechne({ kasse: 'eigen', eigenZuschuss: 30, eigenSitzungen: 2, behandler: 'physio', preis: 80, sitzungen: 5, stufe: 100 });
  assert.equal(erg.rechnungCent, 40000);
  assert.equal(erg.kasseCent, 6000);
  assert.equal(erg.tarifJahr1Cent, 0);
  assert.equal(erg.eigenJahr1Cent, 34000);
  assert.equal(erg.eigenJahr2Cent, 34000);
  assert.equal(erg.kasseZustand, 'eigen');
});

test('Fall 21: eigene Eingabe, Kasse höchstens Preis; Geburtsjahr 1990 ergibt 39,19 / 470,28', () => {
  const erg = rechne({
    kasse: 'eigen', eigenZuschuss: 100, eigenSitzungen: 3, behandler: 'heilpraktiker', preis: 60, sitzungen: 3, stufe: 100, geburtsjahr: 1990,
  });
  assert.equal(erg.kasseCent, 18000);
  assert.equal(erg.tarifJahr1Cent, 0);
  assert.equal(erg.eigenJahr1Cent, 0);
  assert.equal(erg.beitragMonatCent, 3919);
  assert.equal(erg.beitragJahrCent, 47028);
  assert.deepEqual(erg.beitragGruppe, { von: 31, bis: 40 });
});

test('Fall 22: Topfrest 311,50; Geburtsjahr 1950 ergibt AP7 33,13 / 397,56 (ab 71)', () => {
  const erg = rechne({
    kasse: 'eigen', eigenZuschuss: 25, eigenSitzungen: 5, behandler: 'heilpraktiker', preis: 85, sitzungen: 8, stufe: 70, geburtsjahr: 1950,
  });
  assert.equal(erg.kasseCent, 12500);
  assert.equal(erg.tarifJahr1Cent, 38850);
  assert.equal(erg.tarifJahr2Cent, 31150);
  assert.equal(erg.eigenJahr1Cent, 16650);
  assert.equal(erg.eigenJahr2Cent, 24350);
  assert.equal(erg.beitragMonatCent, 3313);
  assert.equal(erg.beitragJahrCent, 39756);
  assert.deepEqual(erg.beitragGruppe, { von: 71, bis: null });
});

test('Fall 23: Kasse deckt alles', () => {
  const erg = rechne({ kasse: 'tk', behandler: 'heilpraktiker', preis: 30, sitzungen: 2, stufe: 100 });
  assert.equal(erg.rechnungCent, 6000);
  assert.equal(erg.kasseCent, 6000);
  assert.equal(erg.tarifJahr1Cent, 0);
  assert.equal(erg.eigenJahr1Cent, 0);
});

test('Fall 24: ungültige Eingaben ergeben null (R10)', () => {
  const ok = { kasse: null, behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100 };
  assert.ok(rechne(ok));
  for (const preis of [0, 29, 301, 90.5, '90', null, NaN]) assert.equal(rechne({ ...ok, preis }), null, `Preis ${preis}`);
  for (const sitzungen of [0, 21, 2.5, '6', null]) assert.equal(rechne({ ...ok, sitzungen }), null, `Sitzungen ${sitzungen}`);
  for (const stufe of [60, 0, '100', null, 101]) assert.equal(rechne({ ...ok, stufe }), null, `Stufe ${stufe}`);
  assert.equal(rechne({ ...ok, behandler: 'osteopath' }), null);
  assert.equal(rechne({ ...ok, behandler: null }), null);
  assert.equal(rechne({ ...ok, kasse: 'xyz' }), null);
  assert.equal(rechne({ ...ok, kasse: 'eigen', eigenZuschuss: 201, eigenSitzungen: 3 }), null);
  assert.equal(rechne({ ...ok, kasse: 'eigen', eigenZuschuss: -1, eigenSitzungen: 3 }), null);
  assert.equal(rechne({ ...ok, kasse: 'eigen', eigenZuschuss: 30, eigenSitzungen: 21 }), null);
  assert.equal(rechne({ ...ok, kasse: 'eigen', eigenZuschuss: 30, eigenSitzungen: 2.5 }), null);
  assert.equal(rechne({ ...ok, kasse: 'eigen', eigenZuschuss: null, eigenSitzungen: 0 }), null);
  assert.ok(rechne({ ...ok, kasse: 'eigen', eigenZuschuss: 0, eigenSitzungen: 0 }), 'eigen mit 0 und 0 ist gültig');
  assert.equal(berechneOsteopathie(null, { heute: HEUTE }), null);
  assert.equal(berechneOsteopathie(undefined, { heute: HEUTE }), null);
});

test('Fall 25: nach dem 31.01.2027 verschwindet die Kassenliste, eigene Eingabe bleibt', () => {
  const eingabe = { behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100 };
  const spaet = { heute: { jahr: 2027, monat: 2, tag: 1 } };
  assert.equal(kassenlisteSichtbar(spaet.heute), false);
  assert.equal(rechne({ ...eingabe, kasse: 'tk' }, spaet), null, 'Kasse aus der Liste ergibt null');
  const erg = rechne({ ...eingabe, kasse: 'eigen', eigenZuschuss: 40, eigenSitzungen: 3 }, spaet);
  assert.equal(erg.kasseCent, 12000);
  assert.equal(erg.tarifJahr1Cent, 42000);
  const ohne = rechne({ ...eingabe, kasse: null }, spaet);
  assert.equal(ohne.kasseZustand, 'keineKasse', 'ohne Kasse rechnet weiter');
  // auch als Date und später im Jahr
  assert.equal(rechne({ ...eingabe, kasse: 'tk' }, { heute: new Date(2027, 5, 1) }), null);
  assert.equal(rechne({ ...eingabe, kasse: 'tk' }, { heute: { jahr: 2028, monat: 1, tag: 1 } }), null);
});

test('Fall 26: 31.01.2027 ist der letzte gültige Tag, Ergebnis wie Fall 1', () => {
  const tag = { jahr: 2027, monat: 1, tag: 31 };
  assert.equal(kassenlisteSichtbar(tag), true);
  const erg = rechne({ kasse: 'tk', behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100 }, { heute: tag });
  assert.equal(erg.kasseCent, 12000);
  assert.equal(erg.tarifJahr1Cent, 42000);
  assert.equal(erg.eigenJahr1Cent, 0);
  assert.equal(PRUEFEN_BIS, '2027-01-31');
});

test('Beitrag ohne Geburtsjahr: Beispiel mit 21 bis 30 Jahren (alle Stufen)', () => {
  const erwartet = { 100: [3164, 37968], 50: [1036, 12432], 70: [1582, 18984], 90: [2744, 32928] };
  for (const [stufe, [monat, jahr]] of Object.entries(erwartet)) {
    const erg = rechne({ kasse: 'tk', behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: Number(stufe) });
    assert.equal(erg.beitragMonatCent, monat, `Stufe ${stufe} Monat`);
    assert.equal(erg.beitragJahrCent, jahr, `Stufe ${stufe} Jahr`);
    assert.deepEqual(erg.beitragGruppe, { von: 21, bis: 30 });
    assert.equal(erg.beitragMitGeburtsjahr, false);
  }
  // ungültiges Geburtsjahr fällt auf das Beispiel zurück
  const erg = rechne({ kasse: null, behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100, geburtsjahr: 19 });
  assert.equal(erg.beitragMonatCent, 3164);
});

test('Beitragszeile folgt dem Wortlaut des Plans (4.5)', () => {
  const vorlage = inhalt.rechner.ergebnis.beitrag;
  assert.equal(vorlage, 'Beitrag für Ambulant {s}: {monat} im Monat, {jahr} im Jahr');
  const beispiel = rechne({ kasse: null, behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100 });
  assert.equal(beitragsZeile(vorlage, beispiel, 100, '29.09.2026'), 'Beitrag für Ambulant 100: 31,64 EUR im Monat, 379,68 EUR im Jahr (Beispiel mit 21 bis 30 Jahren, Stand 29.09.2026)');
  const eigene = rechne({ kasse: null, behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100, geburtsjahr: 1990 });
  assert.equal(beitragsZeile(vorlage, eigene, 100, '29.09.2026'), 'Beitrag für Ambulant 100: 39,19 EUR im Monat, 470,28 EUR im Jahr (mit 31 bis 40 Jahren, Stand 29.09.2026)');
  const alt = rechne({ kasse: null, behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 70, geburtsjahr: 1950 });
  assert.match(beitragsZeile(vorlage, alt, 70, '29.09.2026'), /33,13 EUR im Monat, 397,56 EUR im Jahr \(ab 71 Jahren, Stand 29\.09\.2026\)$/);
});

test('Voreinstellungen des Plans: Anrechnung auf den Rest, Arzt ohne Tarif', () => {
  assert.equal(ANRECHNUNG, 'rest');
  assert.equal(TARIF_RECHNET_ARZT, false);
});

test('Umschalter ANRECHNUNG = gesamt (nur im Test): Fall 3, 7 und 1', () => {
  const gesamt = { anrechnung: 'gesamt' };
  const f3 = rechne({ kasse: 'tk', behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 50 }, gesamt);
  assert.deepEqual([f3.tarifJahr1Cent, f3.tarifJahr2Cent, f3.eigenJahr1Cent, f3.eigenJahr2Cent], [27000, 23000, 15000, 19000]);
  const f7 = rechne({ kasse: 'aok-bremen', behandler: 'heilpraktiker', preis: 100, sitzungen: 5, stufe: 70 }, gesamt);
  assert.equal(f7.tarifJahr1Cent, 26000, 'min(350, 260)');
  const f1 = rechne({ kasse: 'tk', behandler: 'heilpraktiker', preis: 90, sitzungen: 6, stufe: 100 }, gesamt);
  assert.deepEqual([f1.tarifJahr1Cent, f1.tarifJahr2Cent], [42000, 42000]);
});

test('Umschalter TARIF_RECHNET_ARZT = true (nur im Test)', () => {
  const erg = rechne({ kasse: 'ikk-classic', behandler: 'arzt', preis: 90, sitzungen: 6, stufe: 100 }, { tarifRechnetArzt: true });
  assert.equal(erg.tarifJahr1Cent, 38000);
  assert.equal(erg.tarifZustand, 'tarif');
});

test('Betragsformat: ganze Euro ohne Stellen, sonst Komma, Tausenderpunkt', () => {
  assert.equal(formatiereEuro(7350), '73,50 EUR');
  assert.equal(formatiereEuro(108000), '1.080 EUR');
  assert.equal(formatiereEuro(0), '0 EUR');
  assert.equal(formatiereEuro(42000), '420 EUR');
  assert.equal(formatiereEuro(100000), '1.000 EUR');
  assert.equal(formatiereEuro(31150), '311,50 EUR');
  assert.equal(formatiereEuro(5), '0,05 EUR');
  assert.equal(formatiereEuro(120000000), '1.200.000 EUR');
});

test('Summe aus Kasse und Tarif liegt nie über der Rechnung (alle Kassen, Stufen, Behandler)', () => {
  let faelle = 0;
  const kassen = [...OSTEOPATHIE_KASSEN.map((kasse) => kasse.id), 'eigen', null];
  for (const kasse of kassen) {
    for (const behandler of ['heilpraktiker', 'arzt', 'physio']) {
      for (const stufe of Object.keys(STUFEN).map(Number)) {
        for (const preis of [30, 90, 300]) {
          for (const sitzungen of [1, 6, 20]) {
            for (const arzt of [false, true]) {
              for (const anrechnung of ['rest', 'gesamt']) {
                const erg = rechne({
                  kasse, behandler, preis, sitzungen, stufe, eigenZuschuss: 200, eigenSitzungen: 20,
                }, { anrechnung, tarifRechnetArzt: arzt });
                assert.ok(erg, `${kasse} ${behandler} ${stufe} ${preis} ${sitzungen}`);
                for (const tarif of [erg.tarifJahr1Cent, erg.tarifJahr2Cent]) {
                  assert.ok(erg.kasseCent + tarif <= erg.rechnungCent, `Summe über Rechnung: ${kasse} ${behandler} ${stufe} ${preis} ${sitzungen}`);
                  assert.ok(tarif >= 0 && tarif <= STUFEN[stufe].topfCent);
                }
                assert.ok(erg.tarifJahr1Cent + erg.tarifJahr2Cent <= 2 * STUFEN[stufe].topfCent);
                assert.ok(erg.eigenJahr1Cent >= 0 && erg.eigenJahr2Cent >= 0, 'Eigenanteil nie negativ');
                assert.ok(erg.kasseCent >= 0 && Number.isInteger(erg.kasseCent) && Number.isInteger(erg.tarifJahr1Cent) && Number.isInteger(erg.tarifJahr2Cent));
                faelle += 1;
              }
            }
          }
        }
      }
    }
  }
  assert.ok(faelle > 3000);
});

test('Hinweistexte der Kasse nach Zustand und Behandler (4.3)', () => {
  const finde = (id) => OSTEOPATHIE_KASSEN.find((kasse) => kasse.id === id);
  assert.match(kassenHinweis(finde('barmer'), 'erwachsene', 'heilpraktiker'), /^Die BARMER zahlt Osteopathie laut Satzung nur für Babys/);
  assert.match(kassenHinweis(finde('aok-bw'), 'behandlerKasse', 'heilpraktiker'), /keine Heilpraktiker\. Der Rechner rechnet deshalb mit 0 EUR/);
  assert.match(kassenHinweis(finde('aok-bremen'), 'behandlerKasse', 'physio'), /Physiotherapeut ohne Heilpraktikererlaubnis/);
  assert.match(kassenHinweis(finde('aok-hessen'), 'behandlerKasse', 'physio'), /Ärzte und Heilpraktiker, keine Physiotherapeuten/);
  assert.match(kassenHinweis(finde('aok-rheinland-hamburg'), 'erwachsene', 'physio'), /Kostenerstattung gewählt/);
  assert.match(kassenHinweis(finde('aok-bayern'), 'erwachsene', 'arzt'), /nur bis zum 18\. Geburtstag/);
  assert.equal(kassenHinweis(finde('tk'), 'kasse', 'heilpraktiker'), '');
  // Jeder Fall mit Zustand erwachsene/behandlerKasse hat einen Hinweistext
  for (const kasse of OSTEOPATHIE_KASSEN) {
    for (const behandler of ['heilpraktiker', 'arzt', 'physio']) {
      const erg = rechne({ kasse: kasse.id, behandler, preis: 90, sitzungen: 6, stufe: 100 });
      if (erg.kasseZustand === 'erwachsene' || erg.kasseZustand === 'behandlerKasse') {
        assert.ok(kassenHinweis(kasse, erg.kasseZustand, behandler).length > 40, `${kasse.id} ${behandler}: Hinweis fehlt`);
      }
    }
  }
});

test('Datendatei: 15 Kassen, alphabetisch, mit Fundstelle, Stand und https-Quelle', () => {
  assert.equal(OSTEOPATHIE_KASSEN.length, 15);
  assert.equal(PRUEFEN_BIS, '2027-01-31');
  const schluessel = (name) => name.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
  const namen = OSTEOPATHIE_KASSEN.map((kasse) => kasse.name);
  assert.deepEqual(namen, [...namen].sort((a, b) => schluessel(a).localeCompare(schluessel(b), 'de')));
  assert.equal(new Set(OSTEOPATHIE_KASSEN.map((kasse) => kasse.id)).size, 15);
  for (const kasse of OSTEOPATHIE_KASSEN) {
    assert.ok(kasse.fundstelle.startsWith('§'), `${kasse.id} Fundstelle`);
    assert.ok(kasse.stand.length > 5, `${kasse.id} Stand`);
    assert.match(kasse.quelleUrl, /^https:\/\//);
    assert.ok(['ja', 'nein', 'sonderfall'].includes(kasse.erwachsene));
    assert.ok(kasse.prozent >= 0 && kasse.prozent <= 100);
    assert.deepEqual(Object.keys(kasse.behandler), ['heilpraktiker', 'arzt', 'physio']);
    if (kasse.erwachsene === 'ja') assert.ok(kasse.bedingung.startsWith('Bedingungen:'), `${kasse.id} Bedingung`);
    else assert.equal(kasse.bedingung, '');
    assert.ok(kasse.erwachsene === 'ja' || kasse.hinweis.erwachsene, `${kasse.id} braucht Hinweis`);
  }
  assert.deepEqual(OSTEOPATHIE_KASSEN.map((kasse) => kasse.id), [
    'aok-bw', 'aok-bayern', 'aok-bremen', 'aok-hessen', 'aok-niedersachsen', 'aok-nordost', 'aok-nordwest', 'aok-plus',
    'aok-rheinland-hamburg', 'aok-rps', 'aok-sachsen-anhalt', 'barmer', 'dak', 'ikk-classic', 'tk',
  ]);
  assert.deepEqual(GRENZEN.preis, { min: 30, max: 300, vorwahl: 90 });
});

test('Datenschutz: Logik, Daten und Oberfläche ohne Speicherung, Netz und Messung (Plan 4.1)', () => {
  const dateien = ['src/lib/osteopathieRechner.js', 'src/data/osteopathieKassen.js', 'src/components/sections/ambulant/OsteopathieRechner.jsx'];
  for (const datei of dateien) {
    const quelle = readFileSync(new URL(`../${datei}`, import.meta.url), 'utf8');
    for (const verboten of ['localStorage', 'sessionStorage', 'document.cookie', 'fetch', 'XMLHttpRequest', 'sendBeacon', 'trackEvent', 'trackSdkClick', 'zaehle', 'URLSearchParams', 'ambulant-stufe', 'location.search', 'history.']) {
      assert.ok(!quelle.includes(verboten), `${datei} darf ${verboten} nicht enthalten`);
    }
    assert.doesNotMatch(quelle, /[–—]/, `${datei}: Gedankenstrich`);
  }
  const logik = readFileSync(new URL('../src/lib/osteopathieRechner.js', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/@\//.test(logik), 'Logik ohne @/-Importe');
  assert.ok(!/\bimport\b[^;]*from '(?!\.\.?\/)/.test(logik), 'nur relative Importe');
});
