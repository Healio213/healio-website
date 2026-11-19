// Prüfungen des Regelwerks der Antragsmaske (12.11.2026), ohne Browser:
// Definitionen, Bedingungen und Folgefragen, Beitragsrechnung ambulant gegen
// sdkAmbulantBeitraege.js und die Rechnung des Antragsdienstes, IBAN,
// Zuordnung der Abschlusslinks, Datensatz für den Selbstantrag, Texte.
// Aufruf: node --test scripts/check-antragsmaske-regeln.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { DEFINITIONEN, antragAusLink, eigeneMaskeFuer } from '../src/data/antrag/index.js';
import { pruefeDefinition } from '../src/data/antrag/aufbau.js';
import ambulant, {
  ORIGINAL_1A, ORIGINAL_1B_1K, SCHWEIGEPFLICHT_KURZ, SCHWEIGEPFLICHT_WAHL,
} from '../src/data/antrag/ambulant.js';
import {
  altersgrenze, antwortenBereinigt, bedingungErfuellt, beginnOptionenAus, berechneBeitrag, feldFehler, ibanHinweis, istIban,
  mitZuschlag, offeneGesundheitsfragen, regionAusPlz, sichtbareFolgefragen, sichtbareFragen, wirkungen,
} from '../src/lib/antragsmaske/regeln.js';
import { fehlerUnterlagen, unterlagenUnvollstaendig } from '../src/components/antragsmaske/unterlagenPflicht.js';
import { baueSelbstantrag, bereinigeHerkunft, bildschirmFuerFeld } from '../src/lib/antragsmaske/vertrag.js';
import { SDK_AMBULANT_BEITRAEGE } from '../src/data/sdkAmbulantBeitraege.js';
import {
  FRAGEN_1B_1K, FRAGE_1A_ITEMS, beginnOptionen, beitragMitZuschlag, grundbeitrag, zuschlagAufteilung,
} from '../src/data/sdkAmbulantAntrag.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HEUTE = new Date(2026, 10, 12);
const BEGINN = { iso: '2026-12-01', jahr: 2026, monat: 12, label: '01.12.2026' };
const BEGINN_JAN = { iso: '2027-01-01', jahr: 2027, monat: 1, label: '01.01.2027' };

// Nein auf alles, Größe und Gewicht ohne Zuschlag.
// Frage 1a seit 19.11.2026 als 15 Einzelfragen wie in der SDK-Strecke (Paket 1 Punkt 7).
const EINZEL_1A = (wert = 'nein') => Object.fromEntries(FRAGE_1A_ITEMS.map((item) => [`1a-${item.id}`, wert]));
const alleNein = () => ({
  hinweisOk: true,
  ...EINZEL_1A(),
  ...Object.fromEntries(FRAGEN_1B_1K.map((frage) => [frage.id, 'nein'])),
  2: { groesse: '178', gewicht: '75' },
});

// Fester Zufall, damit jeder Lauf dieselben Fälle prüft.
function zufall(saat) {
  let wert = saat;
  return () => { wert = (wert * 1103515245 + 12345) % 2147483648; return wert / 2147483648; };
}

test('Definitionen: alle vier Produkte fertig und gültig', () => {
  for (const [name, definition] of Object.entries(DEFINITIONEN)) {
    assert.deepEqual(pruefeDefinition(definition), [], name);
    assert.equal(definition.bereit, true, name);
  }
  assert.ok(pruefeDefinition({ ...ambulant, tarife: [] }).includes('tarife fehlen'));
  assert.ok(pruefeDefinition({ ...ambulant, gesundheit: { fragen: [{ id: 'x', typ: 'quatsch', titel: 'x' }] } }).some((text) => text.includes('unbekannter Typ')));
});

test('Bedingungen und Folgefragen', () => {
  const kontext = { antworten: { a: 'ja', b: ['x', 'y'], c: '' }, tarif: 'AP1', alter: 40 };
  assert.equal(bedingungErfuellt(undefined, kontext), true);
  assert.equal(bedingungErfuellt({ frage: 'a', ist: 'ja' }, kontext), true);
  assert.equal(bedingungErfuellt({ frage: 'a', ist: 'nein' }, kontext), false);
  assert.equal(bedingungErfuellt({ frage: 'b', enthaelt: 'y' }, kontext), true);
  assert.equal(bedingungErfuellt({ frage: 'c', beantwortet: true }, kontext), false);
  assert.equal(bedingungErfuellt({ tarif: ['AP5', 'AP1'] }, kontext), true);
  assert.equal(bedingungErfuellt({ alle: [{ alterAb: 40 }, { alterBis: 40 }] }, kontext), true);
  assert.equal(bedingungErfuellt({ eine: [{ alterAb: 41 }, { nicht: { frage: 'a', ist: 'ja' } }] }, kontext), false);
  assert.equal(bedingungErfuellt({ frgae: 'a', ist: 'ja' }, kontext), false, 'Tippfehler schaltet nichts frei');

  const frage1a = ambulant.gesundheit.fragen[0];
  assert.equal(frage1a.id, '1a-aids-hepatitis');
  assert.equal(sichtbareFolgefragen(frage1a, { antworten: { [frage1a.id]: 'ja' } }).length, 0, 'keine Ankreuzliste mehr');
  assert.equal(sichtbareFragen(ambulant, {}).length, 26, '26 Fragen wie in der SDK-Strecke (15 Punkte von 1a, 1b bis 1k, 2)');
  assert.deepEqual(ambulant.gesundheit.fragen.slice(0, 15).map((frage) => frage.original.id), ['G42', 'G43', 'G43A', 'G43B', 'G44', 'G45', 'G46', 'G47', 'G47A', 'G48', 'G49', 'G50', 'G50A', 'G51', 'G53']);

  const bereinigt = antwortenBereinigt(ambulant, { antworten: { '1a-krebs': 'nein', '1a-kreuze': ['krebs'], hinweisOk: true } });
  assert.deepEqual(bereinigt, { '1a-krebs': 'nein' }, 'alte Ankreuzliste fällt weg, ohne Vorspann der Online-Strecke');
  assert.deepEqual(offeneGesundheitsfragen(ambulant, { antworten: alleNein() }), []);
  const ohneEinen = alleNein(); delete ohneEinen['1a-osteoporose'];
  assert.deepEqual(offeneGesundheitsfragen(ambulant, { antworten: ohneEinen }), ['1a-osteoporose'], 'jeder Punkt einzeln Pflicht');
  assert.ok(offeneGesundheitsfragen(ambulant, { antworten: { ...alleNein(), 2: { groesse: '90', gewicht: '75' } } }).includes('2'));
});

test('Beitrag ambulant ohne Zuschlag: jede Altersgruppe und Stufe wie sdkAmbulantBeitraege.js', () => {
  let faelle = 0;
  for (const gruppe of SDK_AMBULANT_BEITRAEGE.gruppen) {
    for (const alter of [gruppe.von, gruppe.bis ?? gruppe.von + 9]) {
      if (alter < 18) continue; // Online nur Volljährige
      for (const tarif of ['AP5', 'AP7', 'AP9', 'AP1']) {
        const geburtsdatum = { tag: 1, monat: 1, jahr: BEGINN.jahr - alter };
        const ergebnis = berechneBeitrag(ambulant, {
          tarif, geburtsdatum, beginn: BEGINN, antworten: alleNein(),
        });
        assert.equal(ergebnis.grundbeitrag, gruppe[tarif], `${tarif} ${alter} Jahre`);
        assert.equal(ergebnis.beitrag, gruppe[tarif]);
        assert.equal(ergebnis.zuschlagProzent, 0);
        faelle += 1;
      }
    }
  }
  assert.ok(faelle >= 48);
  // Beispiel aus SCHNITTSTELLE.md: AP1, 36 Jahre, Beginn 01.12.2026, 20 % Zuschlag = 47,03 EUR.
  const beispiel = berechneBeitrag(ambulant, {
    tarif: 'AP1', geburtsdatum: { tag: 5, monat: 3, jahr: 1990 }, beginn: BEGINN, antworten: { ...alleNein(), '1b': 'ja' },
  });
  assert.equal(beispiel.beitrag, 47.03);
  assert.deepEqual(beispiel.gruende, ['Atemwege und Allergien']);
  // Altersgruppe wechselt zum Folgejahr (30 im Jahr des Beginns).
  const wechsel = berechneBeitrag(ambulant, {
    tarif: 'AP5', geburtsdatum: { tag: 1, monat: 6, jahr: 1996 }, beginn: BEGINN, antworten: alleNein(),
  });
  assert.equal(wechsel.beitrag, 10.36);
  assert.deepEqual(wechsel.folgejahr, { ab: '01.01.2027', beitrag: 12.29 });
  assert.equal(berechneBeitrag(ambulant, {
    tarif: 'AP5', geburtsdatum: { tag: 1, monat: 6, jahr: 1996 }, beginn: BEGINN_JAN, antworten: alleNein(),
  }).folgejahr, null);
});

test('Zuschlag ambulant: 300 zufällige Antworten gleich zuschlagAufteilung() des Antragsdienstes', () => {
  const wuerfel = zufall(20261112);
  for (let lauf = 0; lauf < 300; lauf += 1) {
    const antworten = { hinweisOk: true, ...EINZEL_1A() };
    if (wuerfel() < 0.3) FRAGE_1A_ITEMS.forEach((item, stelle) => { if (stelle === 0 || wuerfel() < 0.2) antworten[`1a-${item.id}`] = 'ja'; });
    FRAGEN_1B_1K.forEach((frage) => { antworten[frage.id] = wuerfel() < 0.25 ? 'ja' : 'nein'; });
    const groesse = String(150 + Math.floor(wuerfel() * 50));
    const gewicht = String(40 + Math.floor(wuerfel() * 90));
    antworten[2] = { groesse, gewicht };
    const geburtsjahr = 1940 + Math.floor(wuerfel() * 67);
    const tarif = ['AP5', 'AP7', 'AP9', 'AP1'][Math.floor(wuerfel() * 4)];
    const server = ambulant.gesundheitFuerVertrag(antworten);
    const erwartet = zuschlagAufteilung(server);
    const maske = wirkungen(ambulant, { antworten: antwortenBereinigt(ambulant, { antworten }) });
    assert.equal(maske.zuschlagProzent, erwartet.gesamt, `Lauf ${lauf}`);
    const ergebnis = berechneBeitrag(ambulant, {
      tarif, geburtsdatum: { tag: 1, monat: 1, jahr: geburtsjahr }, beginn: BEGINN, antworten,
    });
    const { beitrag: grund } = grundbeitrag(geburtsjahr, BEGINN.jahr, tarif);
    assert.equal(ergebnis.beitrag, beitragMitZuschlag(grund, erwartet.gesamt), `Lauf ${lauf}: Beitrag`);
  }
});

test('Beginn, Altersgrenze und Tabelle mit Preisregion', () => {
  assert.deepEqual(beginnOptionenAus(ambulant.beginn, HEUTE), beginnOptionen(HEUTE), 'gleiche Monatsersten wie die Prüfseite');
  assert.equal(altersgrenze(ambulant, { tag: 1, monat: 1, jahr: 2010 }, { heute: HEUTE }).art, 'zuJung');
  assert.equal(altersgrenze(ambulant, { tag: 12, monat: 11, jahr: 2008 }, { heute: HEUTE }), null, 'heute 18 geworden');

  // Erfundene Testtabelle, nur für die Rechenregel (keine echten Preise).
  const test = {
    tarife: [{ id: 'T1' }],
    beitrag: {
      alter: 'genau',
      regionen: { bereiche: [{ von: '20000', bis: '22999', region: 'stadt' }], standard: 'land' },
      gruppen: [{ von: 18, bis: 40, preise: { stadt: { T1: 20 }, land: { T1: 15 } } }, { von: 41, bis: null, preise: { stadt: { T1: 30 }, land: { T1: 25 } } }],
    },
    gesundheit: { fragen: [{ id: 'z', typ: 'auswahl', titel: 'z', optionen: [{ id: 'a', label: 'a', wirkung: [{ art: 'zuschlag', euro: 9 }] }, { id: 'b', label: 'b', wirkung: [{ art: 'pruefung', text: 'Prüfen' }] }] }] },
  };
  assert.equal(regionAusPlz(test.beitrag.regionen, '20095'), 'stadt');
  assert.equal(regionAusPlz(test.beitrag.regionen, '99999'), 'land');
  assert.equal(regionAusPlz(test.beitrag.regionen, '2009'), null);
  const geburt = { tag: 2, monat: 12, jahr: 1985 }; // am 01.12.2026 noch 40
  assert.equal(berechneBeitrag(test, {
    tarif: 'T1', geburtsdatum: geburt, beginn: BEGINN, plz: '20095', antworten: { z: 'a' },
  }).beitrag, 29);
  assert.equal(berechneBeitrag(test, {
    tarif: 'T1', geburtsdatum: geburt, beginn: BEGINN_JAN, plz: '80331', antworten: {},
  }).beitrag, 25, 'mit 41 die nächste Gruppe, Region Land');
  assert.equal(berechneBeitrag(test, { tarif: 'T1', geburtsdatum: geburt, beginn: BEGINN }), null, 'ohne PLZ kein Beitrag');
  assert.deepEqual(wirkungen(test, { antworten: { z: 'b' } }).pruefung, ['Prüfen']);
  assert.equal(mitZuschlag(39.19, 20), 47.03);
  assert.equal(mitZuschlag(10, 0, 6.1), 16.1);
});

test('IBAN und Eingaben', () => {
  assert.equal(istIban('DE89 3704 0044 0532 0130 00'), true);
  assert.equal(istIban('DE89370400440532013001'), false);
  assert.equal(istIban('AT611904300234573201'), false);
  assert.equal(ibanHinweis(''), 'Bitte gib deine IBAN ein.');
  assert.match(ibanHinweis('DE8937040044'), /22 Zeichen/);
  assert.match(ibanHinweis('DE89370400440532013001'), /Tippfehler/);
  assert.equal(ibanHinweis('de89370400440532013000'), null);
  const plz = ambulant.person.anschrift.find((feld) => feld.id === 'plz');
  assert.equal(feldFehler(plz, '2009'), 'Bitte gib eine fünfstellige PLZ ein.');
  assert.equal(feldFehler(plz, '20095'), null);
  const vorname = ambulant.person.felder[0];
  assert.match(feldFehler(vorname, 'Lena2'), /nur Buchstaben/);
  assert.equal(feldFehler(vorname, 'Anna-Lena'), null);
  const hausnummer = ambulant.person.anschrift.find((feld) => feld.id === 'hausnummer');
  assert.equal(feldFehler(hausnummer, '12a'), null);
  assert.ok(feldFehler(hausnummer, 'zwölf'), 'Hausnummer nach dem Muster der SDK');
  assert.ok(feldFehler(ambulant.person.anschrift.find((feld) => feld.id === 'plz'), '99999'), 'PLZ 99999 lehnt die SDK ab');
  const mobil = ambulant.person.anschrift.find((feld) => feld.id === 'telefon');
  assert.equal(feldFehler(mobil, '+49 151 1234567'), null);
  assert.ok(feldFehler(mobil, '(040) 123456'), 'Klammern nimmt die SDK nicht an');
});

test('Abschlusslinks: Sparte, Versicherer, Stufe', () => {
  const sdk = (typ, tarif) => `https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=${encodeURIComponent(typ)}&agentId1=901334&agentId2=&insurers=36&tariffs=${encodeURIComponent(tarif)}`;
  assert.deepEqual(antragAusLink(sdk('Ambulant', 'SDKAP7@')), { sparte: 'ambulant', versicherer: 'sdk', tarif: 'AP7' });
  assert.deepEqual(antragAusLink(sdk('Stationär', 'SDKSP2@')), { sparte: 'stationaer', versicherer: 'sdk', tarif: 'SP2' });
  assert.deepEqual(antragAusLink(sdk('Stationär', '')), { sparte: 'stationaer', versicherer: 'sdk', tarif: null });
  assert.equal(antragAusLink(sdk('Ambulant,Stationär', '')), null);
  assert.deepEqual(antragAusLink('https://www.diebayerische.de/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen?m=032834'), { sparte: 'zahn', versicherer: 'bayerische', tarif: null });
  assert.equal(antragAusLink('https://www.diebayerische.de/online-berechnen/krankenhauszusatzversicherung-berechnen/?m=032834'), null, 'Bayerische Klinik bleibt wie heute');
  assert.equal(antragAusLink('https://www.beitragsrechner.dkv.com/tarifrechner/600085/UZ1?leitmerk=MAK226487'), null, 'DKV bleibt wie heute');
  assert.equal(antragAusLink('https://insurances-online.levelnine.biz/?mandant=vmk&tarifftypes=Ambulant&tariffs=UKVVorsorgePRIVAT@'), null, 'UKV Vorsorge bleibt wie heute');
  assert.equal(antragAusLink('https://healio.de/ambulant?angebot=arag-v100'), null);
  assert.equal(eigeneMaskeFuer({ sparte: 'ambulant', versicherer: 'sdk' })?.produkt, 'ambulant');
  assert.equal(eigeneMaskeFuer({ sparte: 'zahn', versicherer: 'bayerische' })?.produkt, 'zahn');
  assert.equal(eigeneMaskeFuer({ sparte: 'stationaer', versicherer: 'sdk' })?.produkt, 'stationaer');
  assert.equal(eigeneMaskeFuer({ sparte: 'zahn', versicherer: 'ukv' }), null, 'UKV Zahn ohne Schalter: weiter zum Versicherer');
  assert.equal(eigeneMaskeFuer({ sparte: 'zahn', versicherer: 'ukv' }, { ukvZahn: true })?.produkt, 'zahn-ukv');
});

test('Datensatz für den Selbstantrag (ambulant, Online-Strecke)', () => {
  const daten = {
    tarif: 'AP1',
    geburtsdatum: '5.3.1990',
    antworten: { ...alleNein(), '1a-krebs': 'ja', '1a-als': 'ja' },
    anrede: 'frau',
    formular: {
      vorname: ' Lena ', nachname: 'Muster', strasse: 'Musterweg', hausnummer: '12', plz: '20095', ort: 'Hamburg', telefon: '0151 1234567', email: 'lena@beispiel.de',
    },
    bestaetigungen: { acknowledge: true },
    zahlweise: 'monatlich',
    kontoinhaber: 'selbst',
    iban: 'DE89 3704 0044 0532 0130 00',
    bankname: 'Testbank',
    erklaerungen: {
      saveConfirmationtext: true, declarationOfConsentTermsOfContract: true, declarationOfConsentAndReleaseFromConfidentiality: true, avoidAdvice: true, verzicht: true, vollmacht: true, gesundheitsdaten: true, sepaMandatConfirmation: true,
    },
    unterlagenDienst: [{ id: 12289, name: 'AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22' }],
    unterlagenGeoeffnet: { 'dienst:12289': '2026-11-12T10:00:00.000Z' },
  };
  const beitrag = berechneBeitrag(ambulant, {
    tarif: 'AP1', geburtsdatum: { tag: 5, monat: 3, jahr: 1990 }, beginn: BEGINN, antworten: daten.antworten,
  });
  const body = baueSelbstantrag(ambulant, daten, { beginn: BEGINN, beitrag, heute: HEUTE });
  assert.equal(body.kanal, 'web-selbst');
  assert.deepEqual(Object.keys(body).sort(), ['angaben', 'beitragAngezeigt', 'bestaetigungen', 'erklaerungen', 'gesundheit', 'herkunft', 'kanal', 'original', 'schutz', 'sparte', 'textfassung', 'unterlagen', 'versand', 'versicherer', 'zahlung']);
  assert.deepEqual(body.angaben, {
    tarifCode: 'AP1', beginnIso: '2026-12-01', anrede: 'frau', formular: { vorname: 'Lena', nachname: 'Muster', strasse: 'Musterweg', hausnummer: '12', plz: '20095', ort: 'Hamburg', telefon: '0151 1234567', email: 'lena@beispiel.de' }, geburtsdatum: '05.03.1990',
  });
  assert.deepEqual(body.bestaetigungen, { acknowledge: true });
  assert.deepEqual(body.gesundheit.kreuze1a, ['als', 'krebs'], 'Reihenfolge wie im Formular');
  assert.equal(body.gesundheit.antwort1a, 'ja');
  assert.equal(Object.keys(body.gesundheit.einzel1a).length, 15, '15 Einzelantworten');
  assert.equal(body.gesundheit.einzel1a.krebs, 'ja'); assert.equal(body.gesundheit.einzel1a.diabetes, 'nein');
  assert.equal(body.zahlung.iban, 'DE89370400440532013000');
  assert.equal(body.zahlung.bankname, 'Testbank');
  assert.equal(body.erklaerungen.declarationOfConsentAdvertising, null, 'Werbung ohne Antwort bleibt leer (Pflicht Ja/Nein, nichts vorbelegt)');
  assert.equal(body.erklaerungen.angabenBestaetigt, false, 'Bestätigungssatz nicht angehakt');
  const mitWahl = baueSelbstantrag(ambulant, { ...daten, erklaerungen: { ...daten.erklaerungen, declarationOfConsentAdvertising: 'nein', angabenBestaetigt: true } }, { beginn: BEGINN, beitrag, heute: HEUTE });
  assert.equal(mitWahl.erklaerungen.declarationOfConsentAdvertising, 'nein');
  assert.equal(mitWahl.erklaerungen.angabenBestaetigt, true);
  const o = (feld) => mitWahl.original.find((eintrag) => eintrag.feld === feld)?.wert;
  assert.equal(o('declarationOfConsentAdvertising'), 'false');
  assert.equal(o('bestaetigungsdialog'), 'true');
  assert.equal(o('policyHolderIsEqualInsuredPerson'), 'true', 'Versicherungsnehmer sichtbar, fest Ja');
  assert.equal(body.erklaerungen.avoidAdvice, true);
  const g = (feld) => body.original.find((eintrag) => eintrag.feld === feld)?.wert;
  assert.equal(g('G43'), 'true', 'ALS: eigene Zuordnung G43');
  assert.equal(g('G49'), 'true', 'Krebs: G49');
  assert.equal(g('G42'), 'false');
  assert.equal(g('G54'), 'false');
  assert.equal(g('G0A'), '178');
  assert.equal(g('tarifwahl'), 'SDKAP1#');
  assert.equal(g('downloadLnDocument_12289'), 'true');
  assert.equal(g('confirmDataProtection'), 'true', 'verdeckte Antwort wie im Original');
  assert.equal(body.unterlagen.gezeigt[0].pflichtDownload, true);
  assert.deepEqual(body.unterlagen.geoeffnet, [{ href: 'dienst:12289', um: '2026-11-12T10:00:00.000Z' }]);
  assert.equal(body.beitragAngezeigt, beitragMitZuschlag(39.19, 80));
  assert.equal(bildschirmFuerFeld('angaben.formular.plz').bildschirm, 'anschrift');
  assert.equal(bildschirmFuerFeld('zahlung.iban').bildschirm, 'zahlung');
  assert.deepEqual(body.herkunft, {
    ref: null, utm: {}, einstiegsseite: null, sparte: 'ambulant', weg: 'allein', letzteSeite: null, verweiser: null,
  }, 'ohne Kennzeichen: leere Herkunft, kein Fehler');
  const mitRef = baueSelbstantrag(ambulant, daten, {
    beginn: BEGINN, beitrag, heute: HEUTE, herkunft: { ref: 'HP-praxis-test', utm: { utm_source: 'qr', utm_campaign: 'flyer-1', gclid: 'x' }, einstiegsseite: '/ambulant' },
  });
  assert.deepEqual(mitRef.herkunft, {
    ref: 'HP-praxis-test', utm: { utm_source: 'qr', utm_campaign: 'flyer-1' }, einstiegsseite: '/ambulant', sparte: 'ambulant', weg: 'allein', letzteSeite: null, verweiser: null,
  });
  assert.deepEqual(bereinigeHerkunft({ ref: 'a b<script>', utm: { utm_source: 'x y' }, einstiegsseite: '/a?x=1', weg: 'fax' }), {
    ref: null, utm: {}, einstiegsseite: null, sparte: null, weg: null, letzteSeite: null, verweiser: null,
  }, 'unsaubere Kennzeichen fallen weg');
});

test('Texte: Wortlaut wie Prüfseite, keine Gedankenstriche, nie „ohne Gesundheitsfragen“', () => {
  const pruefseite = fs.readFileSync(path.join(ROOT, 'src/components/antrag/StepBestaetigen.jsx'), 'utf8');
  assert.ok(pruefseite.includes(SCHWEIGEPFLICHT_KURZ), 'Kurzfassung Schweigepflicht wortgleich mit der Prüfseite');
  SCHWEIGEPFLICHT_WAHL.forEach((wahl) => assert.ok(pruefseite.includes(wahl.text), `Möglichkeit ${wahl.id} wortgleich`));
  const dateien = [
    ...fs.readdirSync(path.join(ROOT, 'src/components/antragsmaske')).map((name) => `src/components/antragsmaske/${name}`),
    'src/pages/AntragsmaskePage.jsx', 'src/data/antrag/ambulant.js', 'src/data/antrag/zahn.js', 'src/data/antrag/stationaer.js', 'src/lib/antragsmaske/regeln.js',
  ];
  for (const datei of dateien) {
    const text = fs.readFileSync(path.join(ROOT, datei), 'utf8');
    const ohneKommentare = text.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    assert.ok(!/[—–]/.test(ohneKommentare), `${datei}: Gedankenstrich in sichtbarem Text`);
    assert.ok(!/ohne Gesundheitsfragen|keine Gesundheitsfragen/i.test(text), `${datei}: verbotene Aussage`);
    assert.ok(!/localStorage|console\.(log|info|warn|error)/.test(ohneKommentare), `${datei}: Speicher oder Protokollausgabe`);
  }
});

// ---------------------------------------------------------------------------
// Zahn (Bayerische) und Vollständigkeit gegen das Original
// ---------------------------------------------------------------------------
const zahn = DEFINITIONEN.zahn;
const ERFASSUNG_ZAHN = path.join(ROOT, '../../Healio/Antragsstrecken/originale/bayerische-zahn/bayerische-zahn.json');

test('Zahn: Fragen je Tarif, Ablehnung bei Frage 1 bis 4, Antwort-Kennungen', () => {
  const ids = (tarif) => sichtbareFragen(zahn, { tarif }).map((frage) => frage.id);
  assert.deepEqual(ids('SMART'), ['z1s', 'z2', 'z3', 'z4', 'z5'], 'Smart: kürzere Frage 1');
  assert.deepEqual(ids('PRESTIGE'), ['z1', 'z2', 'z3', 'z4', 'z5']);
  assert.ok(!zahn.tarife.some((tarif) => /plus/i.test(tarif.name)), 'kein Prestige Plus');
  const nein = { z1: 'nein', z2: 'nein', z3: 'nein', z4: 'nein', z5: 'nein' };
  for (const id of ['z1', 'z2', 'z3', 'z4']) {
    const w = wirkungen(zahn, { tarif: 'KOMFORT', antworten: { ...nein, [id]: 'ja' } });
    assert.equal(w.keineAufnahme.length, 1, `${id} ja: keine Aufnahme`);
    assert.equal(w.zuschlagProzent + w.zuschlagEuro, 0, 'kein Zuschlag');
    assert.ok(!/barmenia/i.test(w.keineAufnahme[0]), 'kein Barmenia-Hinweis');
  }
  assert.equal(wirkungen(zahn, { tarif: 'KOMFORT', antworten: { ...nein, z5: 'ja' } }).keineAufnahme.length, 0, 'Frage 5 ja: angenommen');
  const g = zahn.gesundheitFuerVertrag({ ...nein, z1s: 'nein', z5: 'ja' }, { tarif: 'SMART' });
  assert.equal(g.fragebogen, 'KZV_SMART');
  assert.deepEqual(g.antworten.map((a) => `${a.frageId}:${a.antwortId}`), ['1:9', '10:12', '13:21', '22:24', '25:26', '28:34']);
  assert.equal(berechneBeitrag(zahn, { tarif: 'SMART', geburtsdatum: { tag: 1, monat: 1, jahr: 1990 }, beginn: BEGINN }), null, 'Zahn: nie ein lokal geratener Preis');
  assert.equal(altersgrenze(zahn, { tag: 1, monat: 6, jahr: 1956 }, { heute: HEUTE, beginn: BEGINN }), null, '70 im Beginnjahr: online');
  assert.equal(altersgrenze(zahn, { tag: 1, monat: 6, jahr: 1955 }, { heute: HEUTE, beginn: BEGINN }).art, 'zuAlt', '71: Telefonweg');
  assert.deepEqual(beginnOptionenAus(zahn.beginn, HEUTE).naechstmoeglich.iso, '2026-12-01', 'nächster Monatserster, nichts Rückwirkendes');
  const werbung = zahn.erklaerungen.flatMap((teil) => teil.eintraege).find((e) => e.original === 'ADVERTISING_ALLOWED');
  assert.equal(werbung.pflicht, false, 'Werbeeinwilligung freiwillig und leer');
  for (const text of [zahn.absenden.satz, zahn.absenden.vorbehalt, JSON.stringify(zahn.erklaerungen)]) assert.ok(!/SDK|Level Nine|cpit/.test(text), 'keine SDK- oder Technik-Reste');
});

// Vollständigkeit: jedes Pflichtfeld des Originals hat eine Zuordnung, jede
// Auswahl der Maske ist ein gültiger Wert des Originals. Zählt ungesehene Felder.
export function vollstaendigkeitZahn(erfassung) {
  const schritte = erfassung.schritte;
  const pflicht = [];
  schritte.forEach((schritt) => (schritt.felder || []).forEach((feld) => {
    if (feld.pflicht === true && feld.name) pflicht.push({ schritt: schritt.nr, feld: feld.name, ungesehen: String(schritt.quelle).startsWith('C') });
    if (feld.pflicht === true && !feld.name && /ziehen Sie den Beitrag ein/.test(feld.beschriftung || '')) pflicht.push({ schritt: schritt.nr, feld: 'sepaEinzug', ungesehen: true });
  }));
  const s3 = schritte.find((schritt) => schritt.nr === 3);
  s3.fragebogen_komfort_prestige.fragen.forEach((frage) => pflicht.push({ schritt: 3, feld: `frage:${frage.id}`, ungesehen: false }));
  const s7 = schritte.find((schritt) => schritt.nr === 7);
  s7.einwilligungen.filter((e) => e.pflicht).forEach((e) => pflicht.push({ schritt: 7, feld: e.typ, ungesehen: true }));
  return pflicht;
}

test('Zahn: Vollständigkeit gegen bayerische-zahn.json', { skip: !fs.existsSync(ERFASSUNG_ZAHN) && 'Erfassung fehlt' }, () => {
  const erfassung = JSON.parse(fs.readFileSync(ERFASSUNG_ZAHN, 'utf8'));
  const daten = {
    tarif: 'PRESTIGE', bausteine: ['ZAHN_SOFORT'], zahlweise: 'jaehrlich', plz: '20095', geburtsdatumText: '05.03.1990', anrede: 'frau',
    antworten: { z1: 'nein', z2: 'nein', z3: 'nein', z4: 'nein', z5: 'nein' },
    formular: { vorname: 'Lena', nachname: 'Muster', ort: 'Hamburg', strasse: 'Musterweg', hausnummer: '12', email: 'lena@beispiel.de' },
    iban: 'DE89 3704 0044 0532 0130 00',
    erklaerungen: { sepa: true, vvg: true, unterlagen: true, beratungsverzichtVersicherer: true, schweigepflicht: true },
  };
  const zuordnung = zahn.originalFuerVertrag(daten, { beginn: BEGINN });
  const felder = new Set(zuordnung.map((eintrag) => eintrag.feld));
  const pflicht = vollstaendigkeitZahn(erfassung);
  const fehlend = pflicht.filter((eintrag) => !felder.has(eintrag.feld));
  assert.deepEqual(fehlend, [], 'Pflichtfelder ohne Zuordnung');
  zuordnung.filter((eintrag) => pflicht.some((p) => p.feld === eintrag.feld)).forEach((eintrag) => assert.ok(eintrag.wert !== null && eintrag.wert !== '', `${eintrag.feld} ohne Wert`));
  // Wertebereiche
  const s1 = erfassung.schritte[0].felder;
  const beginnWerte = s1.find((f) => f.name === 'policyBegin').werte;
  [beginnOptionenAus(zahn.beginn, HEUTE).naechstmoeglich, ...beginnOptionenAus(zahn.beginn, HEUTE).weitere].forEach((option) => assert.ok(beginnWerte.includes(option.label), `Beginn ${option.label} im Original wählbar`));
  const s2 = erfassung.schritte[1].felder;
  const skus = s2.find((f) => f.name === 'tarif').werte.map((w) => w.sku);
  zahn.tarife.forEach((tarif) => assert.ok(skus.includes(tarif.original.sku), `Tarif ${tarif.id}`));
  const rhythmus = s2.find((f) => f.name === 'paymentRhythm').werte;
  assert.ok(rhythmus.includes('monatlich') && rhythmus.some((w) => w.startsWith('jährlich')), 'Zahlweisen im Original');
  assert.deepEqual(zahn.zahlung.zahlweisen.map((z) => z.original), ['MONTHLY', 'YEARLY']);
  const anreden = erfassung.schritte[3].felder.find((f) => f.name === 'salutation').werte;
  ['herr', 'frau', 'divers'].forEach((id) => assert.ok(anreden.includes(zahn.originalFuerVertrag({ ...daten, anrede: id }, { beginn: BEGINN }).find((e) => e.feld === 'salutation').wert)));
  const fragebogen = erfassung.schritte[2].fragebogen_komfort_prestige.fragen;
  zahn.gesundheit.fragen.forEach((frage) => {
    const original = fragebogen.find((f) => f.id === frage.original.frageId);
    const antworten = original.antworten.map((a) => a.id);
    assert.ok(antworten.includes(frage.original.ja) && antworten.includes(frage.original.nein), `Antwort-Kennungen Frage ${frage.id}`);
    if (frage.id !== 'z1s') assert.equal(frage.text.trim(), original.wortlaut.trim(), `Wortlaut Frage ${frage.id}`);
  });
  assert.equal(zahn.gesundheit.fragen.find((f) => f.id === 'z1s').text, erfassung.schritte[2].fragebogen_smart.fragen[0].wortlaut);
  const ungesehen = pflicht.filter((p) => p.ungesehen).length;
  console.log(`Zahn: ${pflicht.length} Pflichtfelder im Original, ${pflicht.length - fehlend.length} abgedeckt, ${ungesehen} davon ungesehen.`);
});


// ---------------------------------------------------------------------------
// Level-Nine-Produkte: SDK stationär, SDK ambulant, UKV Zahn
// ---------------------------------------------------------------------------
const ERFASSUNG_LN = path.join(ROOT, '../../Healio/Antragsstrecken/originale/levelnine');
const lnDa = fs.existsSync(path.join(ERFASSUNG_LN, 'sdk-stationaer.json'));
const NICHT_FELDER = new Set(['Knopf', 'Anzeige', 'Hinweistext', 'Überschrift', 'Hinweistexte', 'Liste mit Knöpfen', 'Liste aller Antworten (nur lesen)', 'Kontaktkasten', 'Knopf (öffnet Bestätigungsdialog)']);
// Felder nur für einen abweichenden Versicherungsnehmer: Die Maske gilt nur für Versicherungsnehmer = versicherte Person
// (im Original mit Ja vorbelegt und gesperrt).
const NUR_ABWEICHENDER_VN = /^policyHolder(Gender|FirstName|FamilyName|Birthday)/;

function pflichtfelderLevelnine(erfassung) {
  const liste = [];
  const geh = (feld, schritt, ungesehen) => {
    if (!feld.id || NICHT_FELDER.has(feld.art) || /\s/.test(feld.id) || NUR_ABWEICHENDER_VN.test(feld.id)) return;
    if (feld.pflicht === true) liste.push({ schritt, feld: feld.id, werte: (feld.werte || []).map((wert) => wert.wert), ungesehen });
    (feld.folgefragen || []).forEach((folge) => geh(folge, schritt, ungesehen));
  };
  erfassung.schritte.forEach((schritt) => (Array.isArray(schritt.felder) ? schritt.felder : [])
    .forEach((feld) => geh(feld, schritt.schritt, /nicht selbst gesehen|aus dem Code/i.test(String(schritt.quelle)))));
  return liste;
}

// Abdeckung: Zuordnung aus originalFuerVertrag (Beispieldaten) plus alle Fragen der Definition (auch bedingte Folgefelder).
function abdeckung(definition, daten) {
  const felder = new Set(definition.originalFuerVertrag(daten, { beginn: BEGINN }).map((eintrag) => eintrag.feld));
  const werte = {};
  const geh = (frage) => {
    const id = frage.original?.id || frage.id;
    felder.add(id);
    if (frage.typ === 'janein') werte[id] = ['true', 'false'];
    if (frage.typ === 'auswahl' || frage.typ === 'mehrfach') werte[id] = frage.optionen.map((option) => option.id);
    (frage.felder || []).forEach((feld) => feld.original && felder.add(feld.original));
    (frage.folge || []).forEach(geh);
  };
  definition.gesundheit.fragen.forEach(geh);
  return { felder, werte };
}

function pruefeVollstaendigkeit(name, definition, erfassung, daten) {
  const pflicht = pflichtfelderLevelnine(erfassung);
  const { felder, werte } = abdeckung(definition, daten);
  const fehlend = pflicht.filter((eintrag) => !felder.has(eintrag.feld));
  assert.deepEqual(fehlend.map((e) => `${e.schritt}:${e.feld}`), [], `${name}: Pflichtfelder ohne Zuordnung`);
  for (const eintrag of pflicht) {
    if (werte[eintrag.feld] && eintrag.werte.length) {
      werte[eintrag.feld].forEach((wert) => assert.ok(eintrag.werte.includes(wert), `${name}: ${eintrag.feld} Wert ${wert} gibt es im Original nicht`));
    }
  }
  const ungesehen = pflicht.filter((e) => e.ungesehen).length;
  console.log(`${name}: ${pflicht.length} Pflichtfelder im Original, ${pflicht.length - fehlend.length} abgedeckt, ${ungesehen} davon ungesehen.`);
}

const lnDaten = (tarif, antworten) => ({
  tarif,
  geburtsdatumText: '05.03.1990',
  anrede: 'frau',
  antworten,
  formular: {
    vorname: 'Lena', nachname: 'Muster', strasse: 'Musterweg', hausnummer: '12', plz: '20095', ort: 'Hamburg', telefon: '0151 1234567', email: 'lena@beispiel.de',
  },
  bestaetigungen: { acknowledge: true },
  iban: 'DE89370400440532013000',
  bankname: 'Testbank',
  erklaerungen: {},
  unterlagenDienst: (DEFINITIONEN[tarif.startsWith('AP') ? 'ambulant' : 'stationaer'].unterlagenDownload?.liste(tarif) || []),
});

test('SDK stationär: Fragen nur bei SP1/SP2, kein Zuschlag, Tabelle und Vollständigkeit', { skip: !lnDa && 'Erfassung fehlt' }, () => {
  const def = DEFINITIONEN.stationaer;
  assert.equal(sichtbareFragen(def, { tarif: 'SPU' }).length, 0, 'SPU ohne Gesundheitsschritt');
  assert.equal(sichtbareFragen(def, { tarif: 'SP2' }).length, 10, 'Größe/Gewicht plus 9 Fragen');
  const ja = { G0: { groesse: '170', gewicht: '150' }, G18: 'ja' };
  assert.equal(wirkungen(def, { tarif: 'SP2', antworten: ja }).zuschlagProzent, 0, 'Ja ändert online nichts');
  const folge = sichtbareFolgefragen(def.gesundheit.fragen.find((f) => f.id === 'G18'), { antworten: ja, tarif: 'SP2' }).map((f) => f.id);
  assert.deepEqual(folge.slice(0, 7), ['G18.C', 'G18.D', 'G18.E', 'G18.F', 'G18.G', 'G18.H', 'G18.K']);
  // Beispiele aus dem Bericht: Eintrittsalter 30 (geboren 1996, Beginn 2026) und 31.
  const b = (tarif, jahr, beginn = BEGINN) => berechneBeitrag(def, { tarif, geburtsdatum: { tag: 1, monat: 1, jahr }, beginn, antworten: {} })?.beitrag;
  assert.equal(b('SP1', 1996), 49.78);
  assert.equal(b('SP2', 1996), 32.82);
  assert.equal(b('SPU', 1996), 6.84);
  assert.equal(b('SP1', 1996, BEGINN_JAN), 50.72);
  assert.equal(b('SP2', 1990), 36.5, 'Alter 36: 36,50 EUR wie in der Strecke');
  const erfassung = JSON.parse(fs.readFileSync(path.join(ERFASSUNG_LN, 'sdk-stationaer.json'), 'utf8'));
  pruefeVollstaendigkeit('SDK stationär', def, erfassung, lnDaten('SP2', { G0: { groesse: '170', gewicht: '70' } }));
});

test('SDK ambulant: Vollständigkeit gegen die Online-Strecke, Wortlaut der 25 Fragen', { skip: !lnDa && 'Erfassung fehlt' }, () => {
  const erfassung = JSON.parse(fs.readFileSync(path.join(ERFASSUNG_LN, 'sdk-ambulant-abgleich.json'), 'utf8'));
  const felder = erfassung.schritte.find((s) => s.schritt === 5).felder;
  const wort = (id) => felder.find((f) => f.id === id).wortlaut;
  assert.equal(FRAGE_1A_ITEMS.length, ORIGINAL_1A.length);
  FRAGE_1A_ITEMS.forEach((item, stelle) => assert.equal(item.label.replace(/​/g, ''), wort(ORIGINAL_1A[stelle]), `1a: ${ORIGINAL_1A[stelle]}`));
  FRAGEN_1B_1K.forEach((frage, stelle) => assert.equal(frage.text, wort(ORIGINAL_1B_1K[stelle]), `${frage.id}: ${ORIGINAL_1B_1K[stelle]}`));
  assert.equal(ambulant.gesundheit.fragen[0].stamm.text, wort('G40'));
  const daten = lnDaten('AP1', alleNein());
  // Die 15 Einzelfragen und 1b bis 1k haben in der Maske keine eigene Frage-Kennung, nur die Zuordnung.
  pruefeVollstaendigkeit('SDK ambulant', ambulant, { ...erfassung }, daten);
});

test('SDK ambulant: Regeländerungen 12.11.2026 (BMI gerundet, Beginn)', () => {
  const bmi = (g, w) => wirkungen(ambulant, { antworten: { ...alleNein(), 2: { groesse: String(g), gewicht: String(w) } } }).zuschlagProzent;
  assert.equal(bmi(191, 62), 0, '16,995 gerundet 17,0: 0 %');
  assert.equal(bmi(189, 107), 20, '29,954 gerundet 30,0: 20 %');
  assert.equal(bmi(170, 104), 40, '35,986 gerundet 36,0: 40 %');
  assert.equal(bmi(175, 51), 20);
  const optionen = beginnOptionenAus(ambulant.beginn, HEUTE);
  assert.equal(optionen.frueher?.iso, '2026-11-01', 'bis zum 15. auch der laufende Monat');
  assert.equal(optionen.weitere.at(-1).iso, '2027-05-01', 'höchstens 5 weitere Monate');
  assert.equal(beginnOptionenAus(ambulant.beginn, new Date(2026, 10, 16)).frueher, null, 'ab dem 16. nicht mehr');
  assert.deepEqual(beginnOptionen(HEUTE).frueher?.iso, '2026-11-01', 'Regelwerk der Prüfseite gleich');
});

test('UKV Zahn: Zuschlag je Zahn und Tarif, Ablehnung, Ausschluss, Vollständigkeit', { skip: !lnDa && 'Erfassung fehlt' }, () => {
  const def = DEFINITIONEN['zahn-ukv'];
  const basis = {
    TF0021: '0', GF0073: 'nein', GF0074: 'nein', AF0010: 'nein', AF_AD_0001: 'Einzelfallentbindung', AF_AD_0005: 'pflichtversichert in deutscher GKV',
  };
  const b = (tarif, antworten) => berechneBeitrag(def, { tarif, geburtsdatum: { tag: 1, monat: 1, jahr: 1990 }, beginn: BEGINN, antworten })?.beitrag;
  assert.equal(b('Z100', basis), 30.05, '36 Jahre ZahnPRIVAT 100');
  assert.equal(b('Z100', { ...basis, TF0021: '1' }), 40.95, '1 Zahn: 30,05 + 10,90');
  assert.equal(b('Z100', { ...basis, TF0021: '3' }), 62.75, '3 Zähne');
  assert.equal(b('Z90', { ...basis, TF0021: '1' }), 31.77);
  assert.equal(b('Z75', { ...basis, TF0021: '3' }), 30.0);
  assert.equal(wirkungen(def, { tarif: 'Z100', antworten: { ...basis, TF0021: '>3' } }).keineAufnahme.length, 1, 'mehr als 3: keine Aufnahme');
  assert.equal(wirkungen(def, { tarif: 'Z100', antworten: { ...basis, GF0073: 'ja' } }).keineAufnahme.length, 1, 'laufende Behandlung: keine Aufnahme');
  assert.deepEqual(wirkungen(def, { tarif: 'Z100', antworten: { ...basis, GF0074: 'ja' } }).ausschluesse, ['Für Parodontosebehandlungen besteht kein Versicherungsschutz.']);
  const erfassung = JSON.parse(fs.readFileSync(path.join(ERFASSUNG_LN, 'ukv-zahn.json'), 'utf8'));
  pruefeVollstaendigkeit('UKV Zahn', def, erfassung, { ...lnDaten('Z100', basis), unterlagenDienst: [] });
});

test('Auftragssatz vor dem Absenden passt zur Zahlweise und nennt den Betrag (alle vier Produkte)', async () => {
  const { auftragSatz } = await import('../src/lib/antragsmaske/vertrag.js');
  const faelle = [
    ['ambulant', 'monatlich', 39.19, 'bei der SDK', 'Monatsbeitrag von 39,19 EUR'],
    ['stationaer', 'monatlich', 36.5, 'bei der SDK', 'Monatsbeitrag von 36,50 EUR'],
    ['zahn', 'monatlich', 74, 'bei der Bayerischen', 'Monatsbeitrag von 74,00 EUR'],
    ['zahn', 'jaehrlich', 870.2, 'bei der Bayerischen', 'Jahresbeitrag von 870,20 EUR'],
    ['zahn-ukv', 'monatlich', 40.95, 'bei der UKV', 'Monatsbeitrag von 40,95 EUR'],
  ];
  for (const [produkt, zahlweise, betrag, bei, erwartet] of faelle) {
    const satz = auftragSatz(DEFINITIONEN[produkt], { zahlweise }, { beitrag: betrag });
    assert.ok(satz.includes(bei) && satz.includes(`Er kostet dich den oben genannten ${erwartet}.`), `${produkt} ${zahlweise}: ${satz}`);
  }
});

test('Herkunft: ohne Zustimmung kein Speichereintrag (Gate 3), mit Zustimmung im Sitzungsspeicher, Widerruf löscht', async () => {
  const sitzung = new Map();
  const lokal = new Map();
  const speicherAus = (karte) => ({ getItem: (k) => karte.get(k) ?? null, setItem: (k, v) => karte.set(k, String(v)), removeItem: (k) => karte.delete(k) });
  globalThis.window = {
    sessionStorage: speicherAus(sitzung), localStorage: speicherAus(lokal), addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => true,
  };
  const {
    leseHerkunft, merkeHerkunft, beiZustimmungsWechsel, erlaubeSitzungsspeicher,
  } = await import('../src/lib/herkunftSpeicher.js');
  const { parseConsentState, getDefaultConsentState } = await import('../src/lib/consent.js');
  // Ohne Zustimmung: nur Arbeitsspeicher.
  merkeHerkunft({ utm: { utm_source: 'qr', name: 'Lena' }, einstiegsseite: '/ambulant' });
  merkeHerkunft({ ref: 'HP-test', iban: 'DE89370400440532013000' });
  assert.equal(sitzung.size, 0, 'ohne Zustimmung kein Eintrag im Sitzungsspeicher');
  assert.deepEqual(leseHerkunft(), {
    ref: 'HP-test', utm: { utm_source: 'qr' }, einstiegsseite: '/ambulant', verweiser: null,
  });
  // Zustimmung erteilt, aber alle Sparten aus (Standard, 19.11.2026): weiter kein Eintrag.
  const zustimmung = { version: 2, decided: true, preferences: { analytics: true }, source: 'banner', updatedAt: '2026-11-12T10:00:00.000Z' };
  lokal.set('healio:consent:v2', JSON.stringify(zustimmung));
  beiZustimmungsWechsel(parseConsentState(zustimmung));
  merkeHerkunft({ utm: { utm_source: 'spaeter' }, einstiegsseite: '/zahn' });
  assert.equal(sitzung.size, 0, 'Schalter aus: auch mit Zustimmung kein Eintrag im Sitzungsspeicher');
  // Eine Sparte an: Eintrag mit genau den Kennzeichen.
  erlaubeSitzungsspeicher(true);
  merkeHerkunft({ utm: { utm_source: 'spaeter' }, einstiegsseite: '/zahn', verweiser: 'www.google.com' });
  assert.deepEqual([...sitzung.keys()], ['healio.herkunft']);
  assert.deepEqual(JSON.parse(sitzung.get('healio.herkunft')), {
    ref: 'HP-test', utm: { utm_source: 'qr' }, einstiegsseite: '/ambulant', verweiser: 'www.google.com',
  }, 'erste Einstiegsseite bleibt, Verweiser kommt dazu');
  assert.ok(!/Lena|DE89/.test(sitzung.get('healio.herkunft')), 'keine Personen- oder Bankdaten');
  // Widerruf: Eintrag weg.
  lokal.delete('healio:consent:v2');
  beiZustimmungsWechsel(getDefaultConsentState());
  assert.equal(sitzung.size, 0, 'Widerruf löscht den Eintrag');
  // Schalter wieder aus: ein alter Eintrag wird entfernt.
  sitzung.set('healio.herkunft', '{}');
  erlaubeSitzungsspeicher(false);
  assert.equal(sitzung.size, 0, 'Schalter aus entfernt einen alten Eintrag');
  delete globalThis.window;
});

test('Unterlagen-Schritt: leere oder zu kurze Liste und Abruffehler sperren, volle Liste verlangt jeden Download', () => {
  const erwartet = ambulant.unterlagenDownload.liste('AP1');
  assert.equal(erwartet.length, 5, 'SDK ambulant: fünf Pflichtunterlagen');
  const voll = erwartet.map((u) => ({ id: String(u.id), name: u.name }));
  const alle = Object.fromEntries(voll.map((u) => [`dienst:${u.id}`, '2026-11-12T10:00:00.000Z']));
  // Abruf fehlgeschlagen, leere Liste, zu kurze Liste: gesperrt (Schlüssel ohne Text)
  assert.deepEqual(fehlerUnterlagen({ erwartet, liste: null, geoeffnet: alle }).map((f) => f.key), ['unterlagenDienst']);
  assert.deepEqual(fehlerUnterlagen({ erwartet, liste: [], geoeffnet: alle }).map((f) => f.key), ['unterlagenDienst']);
  assert.deepEqual(fehlerUnterlagen({ erwartet, liste: voll.slice(0, 4), geoeffnet: alle }).map((f) => f.key), ['unterlagenDienst']);
  assert.equal(unterlagenUnvollstaendig(erwartet, []), true);
  // Volle Liste: jede nicht geöffnete Unterlage sperrt, alle geöffnet geht weiter
  assert.equal(fehlerUnterlagen({ erwartet, liste: voll, geoeffnet: {} }).length, 5);
  assert.equal(fehlerUnterlagen({ erwartet, liste: voll, geoeffnet: { ...alle, [`dienst:${voll[0].id}`]: undefined } }).length, 1);
  assert.equal(fehlerUnterlagen({ erwartet, liste: voll, geoeffnet: alle }).length, 0);
  // Produkte ohne Pflichtunterlagen an dieser Stelle (Zahn): unverändert, es gibt den Schritt gar nicht
  assert.equal(DEFINITIONEN.zahn?.unterlagenDownload, undefined);
  assert.equal(unterlagenUnvollstaendig([], []), false);
});

// ---------------------------------------------------------------------------
// Nachtrag 12.11.2026 abends: Adressbestätigung Bayerische, Unterlagen UKV

test('Bayerische: Adressbestätigung wie im Original (Pflicht in der Maske, Feld adresseBestaetigt in der Zuordnung und im Antrag)', () => {
  const def = DEFINITIONEN.zahn;
  const eintrag = def.person.bestaetigungen.find((b) => b.key === 'adresseBestaetigt');
  assert.ok(eintrag, 'Bestätigung definiert');
  assert.equal(eintrag.label, 'Ich bestätige, dass die eingegebene Adresse korrekt ist.');
  const daten = {
    tarif: 'KOMFORT', bausteine: [], zahlweise: 'monatlich', plz: '22085', geburtsdatumText: '15.05.1990', anrede: 'frau',
    antworten: { z1: 'nein', z2: 'nein', z3: 'nein', z4: 'nein', z5: 'nein' },
    formular: { vorname: 'Test', nachname: 'Healio-Prüfung', ort: 'Hamburg', strasse: 'Arndtstraße', hausnummer: '6', email: 'test@example.com' },
    erklaerungen: {},
  };
  const wert = (b) => def.originalFuerVertrag({ ...daten, bestaetigungen: b }, { beginn: BEGINN }).find((e) => e.feld === 'adresseBestaetigt');
  assert.deepEqual([wert({ adresseBestaetigt: true }).schritt, wert({ adresseBestaetigt: true }).wert], [5, true]);
  assert.equal(wert({}).wert, false, 'ohne Haken des Kunden: false');
});

test('UKV: Unterlagen über den Antragsdienst, neun PDF mit Kennung, im Antrag als dienst:<id> gezeigt', async () => {
  const { UKV_UNTERLAGEN } = await import('../src/data/antrag/zahnUkv.js');
  const { gezeigteUnterlagen } = await import('../src/lib/antragsmaske/vertrag.js');
  const def = DEFINITIONEN['zahn-ukv'];
  assert.equal(UKV_UNTERLAGEN.length, 9);
  const eintrag = def.erklaerungen.flatMap((t) => t.eintraege).find((e) => e.key === 'unterlagenUkv');
  assert.equal(eintrag.dienstProdukt, 'ukv-zahn');
  const ukv = eintrag.gruppen.find((g) => g.von === 'Von der UKV').eintraege;
  assert.deepEqual(ukv.map((u) => u.dateien[0].dienstId), UKV_UNTERLAGEN.map(([id]) => id));
  const gezeigt = gezeigteUnterlagen(def, { tarif: 'Z90' });
  UKV_UNTERLAGEN.forEach(([id, name]) => assert.ok(gezeigt.some((g) => g.href === `dienst:${id}` && g.name === name), `${id} gezeigt`));
});

test('Paket 2: Bayerische Adressprüfung und Bonität im Wortlaut des Originals', async () => {
  const { default: zahn, ADRESSE_NICHT_ERKANNT, BONITAET } = await import('../src/data/antrag/zahn.js');
  assert.equal(zahn.person.bestaetigungen[0].originalText, ADRESSE_NICHT_ERKANNT);
  assert.match(ADRESSE_NICHT_ERKANNT, /^Die angegebene Adresse wurde von unserem System nicht erkannt\. Bitte korrigieren Sie die Adresse oder bestätigen Sie, dass diese Adresse existiert:$/);
  assert.equal(zahn.erklaerungen.flatMap((teil) => teil.eintraege).at(-1), BONITAET, 'Kasten nach allen Einwilligungen');
  assert.equal(BONITAET.schluss, 'Mit dieser Bonitätsprüfung bin ich einverstanden. Meine Einwilligung ist jederzeit widerruflich.');
  assert.equal(zahn.textfassung, '2026-11-19-bayerische-zahn');
});
