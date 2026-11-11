/**
 * Prüfung des Stichtagsrechners auf /schwangerschaft/baby-geplant ohne Browser.
 * Grundlage: Healio/Schwangerschaft-Mikroseiten/SEITENPLAN-BABY-GEPLANT.md,
 * Abschnitt 4 (Formeln 4.3, Grenzfälle 4.4, Ausgabe 4.5, Prüffälle 4.6).
 *
 * - Fall 1 bis 9: Ergebnis zu B (Fall 8 und 9 über die Kernfunktion ohne Optionsprüfung)
 * - Fall 10 bis 13: optionen(heute) am Monatsanfang, Monatsende, über den Jahreswechsel
 * - Fall 14: ungültige Eingabe und Beginn außerhalb der Optionen ergeben null
 * - Datumsformat, Planungstext, Schaltjahre
 * - Datenschutz: Quelltext von Logik und Oberfläche enthält weder localStorage,
 *   sessionStorage, fetch, trackEvent, zaehle noch URLSearchParams
 *
 * Ausführen: npm run test:baby-geplant-rechner
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  berechne, berechneStichtage, formatiereDatum, heuteAlsDatum, istWaehlbar, optionen, planungsText, plusMonate, vortag,
} from '../src/lib/babyGeplantRechner.js';
import inhalt from '../src/content/schwangerschaftAnlaesse/baby-geplant.js';

// TT.MM.JJJJ -> { jahr, monat, tag }
const d = (text) => {
  const [tag, monat, jahr] = text.split('.').map(Number);
  return { jahr, monat, tag };
};
const text = (datum) => `${String(datum.tag).padStart(2, '0')}.${String(datum.monat).padStart(2, '0')}.${datum.jahr}`;

// Spalten: Nr, Beschreibung, B, W_BAY, E_BAY, K_BAY, E_SDK = K_SDK
const FAELLE = [
  [1, 'Vorwahl am 11.11.2026, zugleich Beispiel aus Frage 1', '01.12.2026', '31.07.2027', '01.08.2027', '01.03.2027', '01.12.2026'],
  [2, 'Jahresbeginn', '01.01.2027', '31.08.2027', '01.09.2027', '01.04.2027', '01.01.2027'],
  [3, 'Wartezeit endet an einem 30.', '01.02.2027', '30.09.2027', '01.10.2027', '01.05.2027', '01.02.2027'],
  [4, 'Wartezeit endet an einem 30. (November)', '01.04.2027', '30.11.2027', '01.12.2027', '01.07.2027', '01.04.2027'],
  [5, 'Jahreswechsel bei E', '01.05.2027', '31.12.2027', '01.01.2028', '01.08.2027', '01.05.2027'],
  [6, 'Wartezeit endet Januar', '01.06.2027', '31.01.2028', '01.02.2028', '01.09.2027', '01.06.2027'],
  [7, 'Schaltjahr', '01.07.2027', '29.02.2028', '01.03.2028', '01.10.2027', '01.07.2027'],
  [8, 'kein Schaltjahr', '01.07.2026', '28.02.2027', '01.03.2027', '01.10.2026', '01.07.2026'],
  [9, 'Jahreswechsel bei K', '01.11.2027', '30.06.2028', '01.07.2028', '01.02.2028', '01.11.2027'],
];

for (const [nr, beschreibung, b, wBay, eBay, kBay, eSdk] of FAELLE) {
  test(`Fall ${nr} (${beschreibung}): B ${b}`, () => {
    const r = berechneStichtage(d(b));
    assert.ok(r, 'Ergebnis vorhanden');
    assert.equal(text(r.bayerische.wartezeitBis), wBay, 'W_BAY');
    assert.equal(text(r.bayerische.entbindungAb), eBay, 'E_BAY');
    assert.equal(text(r.bayerische.babyAb), kBay, 'K_BAY');
    assert.equal(text(r.sdk.entbindungAb), eSdk, 'E_SDK');
    assert.equal(text(r.sdk.babyAb), eSdk, 'K_SDK');
  });
}

const OPTIONEN = [
  [10, 'Optionen am 11.11.2026', '11.11.2026', ['01.12.2026', '01.01.2027', '01.02.2027', '01.03.2027', '01.04.2027']],
  [11, 'Optionen am Monatsersten', '01.12.2026', ['01.01.2027', '01.02.2027', '01.03.2027', '01.04.2027', '01.05.2027']],
  [12, 'Optionen am Monatsletzten', '31.12.2026', ['01.01.2027', '01.02.2027', '01.03.2027', '01.04.2027', '01.05.2027']],
  [13, 'Optionen über den Jahreswechsel', '15.08.2027', ['01.09.2027', '01.10.2027', '01.11.2027', '01.12.2027', '01.01.2028']],
];

for (const [nr, beschreibung, heute, erwartet] of OPTIONEN) {
  test(`Fall ${nr} (${beschreibung}): heute ${heute}`, () => {
    const liste = optionen(d(heute));
    assert.equal(liste.length, 5, 'genau fünf Optionen');
    assert.deepEqual(liste.map(text), erwartet);
    for (const option of liste) assert.equal(istWaehlbar(option, d(heute)), true);
  });
}

test('Fall 10: Vorwahl am 11.11.2026 ist die erste Option, 01.12.2026', () => {
  assert.equal(text(optionen(d('11.11.2026'))[0]), '01.12.2026');
  // Vorwahl liefert das Ergebnis aus Fall 1
  const r = berechne(optionen(d('11.11.2026'))[0], d('11.11.2026'));
  assert.equal(text(r.bayerische.entbindungAb), '01.08.2027');
});

test('Fall 14: ungültige Eingabe ergibt null, kein Ergebnis', () => {
  const heute = d('11.11.2026');
  assert.equal(berechneStichtage(d('15.12.2026')), null, 'kein Monatserster');
  assert.equal(berechne(d('15.12.2026'), heute), null);
  assert.equal(istWaehlbar(d('15.12.2026'), heute), false);
  assert.equal(istWaehlbar(d('01.06.2027'), heute), false, 'außerhalb der fünf Optionen');
  assert.equal(berechne(d('01.06.2027'), heute), null);
  assert.equal(istWaehlbar(d('01.11.2026'), heute), false, 'der laufende Monat ist nicht wählbar');
  assert.equal(berechneStichtage(null), null);
  assert.equal(berechneStichtage({ jahr: 2026, monat: 13, tag: 1 }), null);
  assert.equal(berechneStichtage({ jahr: 2026, monat: 2, tag: 30 }), null);
  assert.equal(berechneStichtage({ jahr: '2026', monat: 12, tag: 1 }), null);
});

test('Datumsformat: Tag ohne führende Null, Monat ausgeschrieben, Jahr vierstellig', () => {
  assert.equal(formatiereDatum({ jahr: 2027, monat: 8, tag: 1 }), '1. August 2027');
  assert.equal(formatiereDatum({ jahr: 2028, monat: 2, tag: 29 }), '29. Februar 2028');
  assert.equal(formatiereDatum({ jahr: 2027, monat: 3, tag: 31 }), '31. März 2027');
  assert.equal(formatiereDatum({ jahr: 2026, monat: 12, tag: 1 }), '1. Dezember 2026');
});

test('Hilfsfunktionen: plusMonate und vortag über Jahreswechsel und Schaltjahre', () => {
  assert.deepEqual(plusMonate({ jahr: 2026, monat: 11, tag: 1 }, 2), { jahr: 2027, monat: 1, tag: 1 });
  assert.deepEqual(plusMonate({ jahr: 2026, monat: 1, tag: 1 }, 12), { jahr: 2027, monat: 1, tag: 1 });
  assert.deepEqual(plusMonate({ jahr: 2026, monat: 1, tag: 1 }, -1), { jahr: 2025, monat: 12, tag: 1 });
  assert.deepEqual(vortag({ jahr: 2028, monat: 3, tag: 1 }), { jahr: 2028, monat: 2, tag: 29 });
  assert.deepEqual(vortag({ jahr: 2027, monat: 3, tag: 1 }), { jahr: 2027, monat: 2, tag: 28 });
  assert.deepEqual(vortag({ jahr: 2100, monat: 3, tag: 1 }), { jahr: 2100, monat: 2, tag: 28 }, '2100 ist kein Schaltjahr');
  assert.deepEqual(vortag({ jahr: 2000, monat: 3, tag: 1 }), { jahr: 2000, monat: 2, tag: 29 }, '2000 ist ein Schaltjahr');
  assert.deepEqual(vortag({ jahr: 2027, monat: 1, tag: 1 }), { jahr: 2026, monat: 12, tag: 31 });
});

test('heuteAlsDatum nimmt ein übergebenes Datum und liefert ganze Zahlen', () => {
  assert.deepEqual(heuteAlsDatum(new Date(2026, 10, 11, 23, 59)), { jahr: 2026, monat: 11, tag: 11 });
  const jetzt = heuteAlsDatum();
  for (const wert of Object.values(jetzt)) assert.ok(Number.isInteger(wert));
});

test('Planungstext setzt Beginn und Ende der Wartezeit aus Fall 1 ein', () => {
  const r = berechneStichtage(d('01.12.2026'));
  const geplant = planungsText(inhalt.rechner.planung.text, r);
  assert.ok(geplant.startsWith('Beginnt dein Vertrag am 1. Dezember 2026, ist bei der Bayerischen jede Entbindung ab dem 1. August 2027 mitversichert.'));
  assert.doesNotMatch(geplant, /\{[A-Z_]+\}/, 'kein Platzhalter bleibt stehen');
  // Beispiel aus Frage 1 stimmt mit dem Rechner überein
  const frage1 = inhalt.faq[0].answer;
  assert.ok(frage1.includes('Beginnt dein Vertrag am 1. Dezember 2026, endet die Wartezeit am 31. Juli 2027. Ab dem 1. August 2027'));
  assert.ok(frage1.includes(formatiereDatum(r.bayerische.wartezeitBis)));
  assert.ok(frage1.includes(formatiereDatum(r.bayerische.entbindungAb)));
});

test('Datenschutz: Logik und Oberfläche speichern und senden nichts', () => {
  for (const datei of ['../src/lib/babyGeplantRechner.js', '../src/components/sections/schwangerschaft/BabyGeplantRechner.jsx']) {
    const quelle = readFileSync(new URL(datei, import.meta.url), 'utf8');
    for (const verboten of ['localStorage', 'sessionStorage', 'fetch', 'trackEvent', 'zaehle', 'URLSearchParams', 'document.cookie', 'sendBeacon', 'XMLHttpRequest']) {
      assert.ok(!quelle.includes(verboten), `${datei} darf „${verboten}“ nicht enthalten`);
    }
  }
});

test('Die Rechenlogik ist ohne React und ohne @/-Importe ladbar', () => {
  const quelle = readFileSync(new URL('../src/lib/babyGeplantRechner.js', import.meta.url), 'utf8');
  assert.doesNotMatch(quelle, /from\s+['"]react|from\s+['"]@\//);
  assert.doesNotMatch(quelle, /\.toLocale\w*String|Date\.UTC|setMonth|getTime/, 'keine Date-Arithmetik, kein toLocaleDateString');
  assert.equal((quelle.match(/new Date\(/g) || []).length, 1, 'Date nur einmal für heute');
});
