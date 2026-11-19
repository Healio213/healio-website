// Erzeugt src/data/antrag/original/levelnine.js aus den Erfassungen der
// Level-Nine-Strecken vom 12.11.2026 (Healio/Antragsstrecken/originale/levelnine/).
// Übernimmt Felder, Kennungen, Wortlaute, Pflicht und Wertebereiche unverändert,
// dazu die Beitragstabellen. Nichts wird umformuliert. Neu erzeugen, wenn eine
// neue Erfassung vorliegt: node scripts/erzeuge-originale-levelnine.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = process.env.LEVELNINE_ORDNER || path.resolve(ROOT, '../../Healio/Antragsstrecken/originale/levelnine');
const lies = (name) => JSON.parse(fs.readFileSync(path.join(QUELLE, name), 'utf8'));

const FELD_SCHLUESSEL = ['id', 'wortlaut', 'art', 'pflicht', 'werte', 'fehlertext', 'bedingung', 'folgefragen', 'link', 'dokument', 'verdeckt', 'vorbelegt', 'gesperrt', 'regex', 'hilfetext', 'nur_lesen'];
function feld(eintrag) {
  const aus = {};
  FELD_SCHLUESSEL.forEach((key) => { if (eintrag[key] !== undefined) aus[key] = key === 'folgefragen' ? eintrag[key].map(feld) : eintrag[key]; });
  return aus;
}
function schritte(erfassung) {
  return erfassung.schritte.map((schritt) => ({
    schritt: schritt.schritt,
    titel: schritt.titel,
    quelle: schritt.quelle,
    gesehen: !/nicht selbst gesehen|aus dem Code/i.test(String(schritt.quelle)),
    felder: Array.isArray(schritt.felder) ? schritt.felder.map(feld) : [],
    hinweise: schritt.hinweise || null,
    regel: schritt.regel || null,
  }));
}
function tabelle(beitraege) {
  return Object.fromEntries(Object.entries(beitraege.tabelle).map(([alter, zeile]) => [alter, zeile]));
}

const stationaer = lies('sdk-stationaer.json');
const ambulant = lies('sdk-ambulant-abgleich.json');
const ukv = lies('ukv-zahn.json');

const aus = {
  stand: '2026-11-12',
  hinweis: 'Erzeugt von scripts/erzeuge-originale-levelnine.mjs, nicht von Hand ändern.',
  sdkStationaer: {
    link: stationaer.link, tarifkennungen: stationaer.tarifkennungen, leistungstexte: stationaer.leistungstexte, beginnRegeln: stationaer.beginn_regeln, schritte: schritte(stationaer),
  },
  sdkAmbulant: { link: ambulant.link, abweichungen: ambulant.abweichungen, schritte: schritte(ambulant) },
  ukvZahn: {
    link: ukv.link, tarifkennungen: ukv.tarifkennungen, leistungstexte: ukv.leistungstexte, unterlagen: ukv.unterlagen_download, schritte: schritte(ukv),
  },
  beitraege: {
    sdkStationaer: tabelle(lies('beitraege-sdk-stationaer.json')),
    ukvZahn: tabelle(lies('beitraege-ukv-zahn.json')),
  },
  // Unterlagen je SDK-Tarif laut Bericht Abschnitt 5 (Pflicht-Download, keine öffentliche Adresse).
  sdkUnterlagen: {
    SP2: [[15445, 'Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26'], [15449, 'Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26'], [15452, 'Tarifbedingungen: 1.671h_Informationsblatt_Gesundheitsfragen_SP2_10.26'], [12764, 'Tarifbedingungen: SP2_1-755a_10.26'], [12289, 'AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22']],
    SP1: [[15445, 'Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26'], [15449, 'Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26'], [null, 'Tarifbedingungen: 1.671g_Informationsblatt_Gesundheitsfragen_SP1_10.26'], [null, 'Tarifbedingungen: SP1_1-754a_10.26'], [12289, 'AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22']],
    SPU: [[15445, 'Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26'], [15449, 'Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26'], [null, 'Tarifbedingungen: SPU_1-756a_10.26'], [null, 'Tarifbedingungen: 1.671f_Informationsblatt_SPU_10.26'], [12289, 'AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22']],
    AP: [[12289, 'AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22'], [15447, 'Tarifbedingungen: Informationsblatt_Gesundheitsfragen_Beitragstabelle_AP_1.671d_10.26'], [13158, 'Tarifbedingungen: AP5, AP7, AP9, AP1 der amb. ZV_1.753a_01.23'], [15445, 'Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26'], [15733, 'Tarifbedingungen: 1.671e_Gesetzliche_Kundeninformation_AP_10.26']],
  },
};

const ziel = path.join(ROOT, 'src/data/antrag/original/levelnine.js');
fs.mkdirSync(path.dirname(ziel), { recursive: true });
fs.writeFileSync(ziel, `// ${aus.hinweis}\n// Quelle: Healio/Antragsstrecken/originale/levelnine/ (Erfassung ${aus.stand}).\n/* eslint-disable */\nconst LEVELNINE = ${JSON.stringify(aus, null, 1)};\nexport default LEVELNINE;\n`);
console.log(`geschrieben: ${path.relative(ROOT, ziel)} (${fs.statSync(ziel).size} Bytes)`);
