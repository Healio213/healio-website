// Attrappe des Selbstantrags am Antragsdienst (Vertragsentwurf
// Healio/Antragsstrecken/VERTRAG-SELBSTANTRAG-ENTWURF.md) für die lokale
// Entwicklung und die gerenderte Prüfung der Antragsmaske. Node ohne
// Abhängigkeiten. Prüft wie der künftige Server und rechnet den Beitrag
// unabhängig mit den Funktionen des Antragsdienstes nach
// (sdkAmbulantAntrag.js). Nichts wird gespeichert oder ausgegeben; nur der
// letzte Datensatz liegt im Speicher, damit Prüfskripte ihn lesen können.
//
// Start: node scripts/antrag-selbst-mock.mjs   (Port 8792, ANTRAG_SELBST_MOCK_PORT)
// Website: VITE_ANTRAG_API=http://127.0.0.1:8792/antrag/api VITE_ANTRAGSMASKE=1 VITE_ANTRAGSWAHL=1 npm run dev
// Nur für Prüfskripte:
//   POST /__test/beitrag-aendern     rechnet ab jetzt 1,00 EUR mehr (für 409)
//   POST /__test/unterlagen-leer     der nächste Listenabruf der Unterlagen liefert []
//   POST /__test/zuruecksetzen
//   GET  /__test/letzter             der zuletzt angenommene Datensatz

import fs from 'node:fs';
import http from 'node:http';
import {
  FRAGEN_1B_1K, FRAGE_1A_ITEMS, ZAHLWEISEN, beginnOptionen, beitragMitZuschlag, bmiAusEingabe, grundbeitrag,
  istVolljaehrigAm, parseGeburtsdatum, zuschlagAufteilung,
} from '../src/data/sdkAmbulantAntrag.js';
import { bereinigeHerkunft } from '../src/lib/antragsmaske/vertrag.js';
import { grundbeitragAusTabelle, mitZuschlag } from '../src/lib/antragsmaske/regeln.js';
import { DEFINITIONEN } from '../src/data/antrag/index.js';
import LEVELNINE from '../src/data/antrag/original/levelnine.js';
import {
  KASSE_MUSTER, istEmailText, istIban, istNameText, istPlzText, istStrasseText, istTelefonText,
} from '../src/lib/antragsmaske/regeln.js';

// Zahn (Bayerische): Beiträge aus der Erfassung vom 12.11.2026 (nur Attrappe).
// Preisregion aus den Stichproben des Berichts; unbekannte PLZ zählen wie
// beim Rechner der Bayerischen die ungültige 00000 als „stadt“.
const ZAHN = JSON.parse(fs.readFileSync(new URL('./fixtures/beitraege-bayerische-zahn.json', import.meta.url), 'utf8'));
const ZAHN_TARIFE = ['SMART', 'KOMFORT', 'PRESTIGE'];
function zahnBeitrag({
  tarifCode, bausteine = [], zahlweise, geburtsdatum, beginnIso, plz,
}) {
  const geburt = parseGeburtsdatum(geburtsdatum);
  if (!ZAHN_TARIFE.includes(tarifCode) || !['monatlich', 'jaehrlich'].includes(zahlweise) || !geburt || !/^\d{4}-\d{2}-01$/.test(String(beginnIso)) || !/^\d{5}$/.test(String(plz))) return null;
  const alter = Number(beginnIso.slice(0, 4)) - geburt.jahr;
  const region = ZAHN.plz[plz] || 'stadt';
  const monat = (tarif) => ZAHN.altersstufen[region][tarif.toLowerCase()].find((stufe) => alter >= stufe.von && alter <= stufe.bis)?.beitrag ?? null;
  // Jährlich: 12 Monate minus 2 % Rabatt, auf 10 Cent wie die Stichproben der Strecke.
  const jeZahlweise = (betrag) => (zahlweise === 'jaehrlich' ? Math.round(betrag * 12 * 0.98 * 10) / 10 : betrag);
  const alleTarife = Object.fromEntries(ZAHN_TARIFE.map((tarif) => [tarif, monat(tarif) === null ? null : jeZahlweise(monat(tarif))]));
  const grund = monat(tarifCode);
  if (grund === null) return null;
  const sofort = bausteine.includes('ZAHN_SOFORT') ? ZAHN.zahn_sofort : 0;
  return {
    alter, region, zahlweise, alleTarife, beitrag: jeZahlweise(Math.round((grund + sofort) * 100) / 100), stand: '2026-11-12',
  };
}

// Gesundheitsangaben aus dem Gespräch im Format der Strecke (wie der Dienst sie liefert), für die Prüfseiten-Tests.
export const TELEFON_GESUNDHEIT = {
  zahn: {
    fragebogen: 'KZV', fragebogenId: '9', antworten: [{ frageId: '1', antwortId: '9', antwort: 'nein' }, { frageId: '10', antwortId: '12', antwort: 'nein' }, { frageId: '13', antwortId: '21', antwort: 'nein' }, { frageId: '22', antwortId: '24', antwort: 'nein' }, { frageId: '25', antwortId: '26', antwort: 'ja' }, { frageId: '28', antwortId: '34', antwort: 'unbekannt' }],
  },
  stationaer: {
    fragebogen: 'SDK_SP',
    G0A: '170',
    G0B: '70',
    antworten: [
      ...['G10', 'G11', 'G17'].map((feld) => ({ schritt: 5, feld, wert: 'false' })),
      { schritt: 5, feld: 'G18', wert: 'true' },
      { schritt: 5, feld: 'G18.C', wert: 'Kontrolle Schilddrüse' },
      { schritt: 5, feld: 'G18.D', wert: '2025-03-01' },
      { schritt: 5, feld: 'G18.F', wert: 'false' },
      { schritt: 5, feld: 'G18.G', wert: '0' },
      { schritt: 5, feld: 'G18.H', wert: 'true' },
      { schritt: 5, feld: 'G18.J', wert: '2025-06-01' },
      { schritt: 5, feld: 'G18.K', wert: 'Dr. Test, Teststraße 1, 20095 Hamburg' },
      { schritt: 5, feld: 'G18.1', wert: 'false' },
      ...['G19', 'G20', 'G21', 'G3', 'G35'].map((feld) => ({ schritt: 5, feld, wert: 'false' })),
    ],
  },
  'zahn-ukv': {
    fragebogen: 'UKV_ZAHN',
    antworten: [
      { schritt: 4, feld: 'TF0021', wert: '1' }, { schritt: 4, feld: 'GF0073', wert: 'false' }, { schritt: 4, feld: 'GF0074', wert: 'false' }, { schritt: 4, feld: 'AF0010', wert: 'false' }, { schritt: 4, feld: 'AF_AD_0001', wert: 'Einzelfallentbindung' }, { schritt: 4, feld: 'AF_AD_0005', wert: 'pflichtversichert in deutscher GKV' },
    ],
  },
};

const PORT = Number(process.env.ANTRAG_SELBST_MOCK_PORT || 8792);
const ERLAUBT = new Set((process.env.ANTRAG_ERLAUBTE_HERKUNFT || 'http://localhost:3018,http://127.0.0.1:3018').split(',').map((eintrag) => eintrag.trim()).filter(Boolean));
let aufschlag = 0;
let unterlagenLeer = 0; // NUR TEST: so viele Listenabrufe liefern eine leere Liste
let letzter = null;
let zaehler = 0;

function senden(antwort, status, daten, herkunft) {
  const kopf = {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
  };
  if (herkunft && ERLAUBT.has(herkunft)) {
    kopf['Access-Control-Allow-Origin'] = herkunft;
    kopf['Access-Control-Allow-Headers'] = 'Content-Type, Accept, Authorization';
    kopf['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    kopf.Vary = 'Origin';
  }
  antwort.writeHead(status, kopf);
  antwort.end(status === 204 ? undefined : JSON.stringify(daten));
}

function pruefe(body, heute = new Date()) {
  const felder = [];
  const a = body?.angaben || {};
  const f = a.formular || {};
  if (body?.kanal !== 'web-selbst') return { status: 400, fehler: 'antrag_angaben_ungueltig', felder: ['kanal'] };
  if (body.sparte === 'zahn' && body.versicherer === 'bayerische') return pruefeZahn(body, heute);
  if (body.sparte === 'zahn' && body.versicherer === 'ukv') return pruefeLevelnine(DEFINITIONEN['zahn-ukv'], body, heute);
  if (body.sparte === 'stationaer' && body.versicherer === 'sdk') return pruefeLevelnine(DEFINITIONEN.stationaer, body, heute);
  if (body.sparte !== 'ambulant' || body.versicherer !== 'sdk') return { status: 409, fehler: 'antrag_sparte_nicht_bereit' };
  if (body.schutz?.feld) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder: [] };
  if (!['AP5', 'AP7', 'AP9', 'AP1'].includes(a.tarifCode)) felder.push('angaben.tarifCode');
  const optionen = beginnOptionen(heute);
  if (![optionen.naechstmoeglich, ...optionen.weitere, optionen.frueher].filter(Boolean).some((option) => option.iso === a.beginnIso)) felder.push('angaben.beginnIso');
  if (!['frau', 'herr', 'divers'].includes(a.anrede)) felder.push('angaben.anrede');
  if (!istNameText(f.vorname)) felder.push('angaben.formular.vorname');
  if (!istNameText(f.nachname)) felder.push('angaben.formular.nachname');
  // Ab 12.11.2026 wie die SDK-Online-Strecke: Straße und Hausnummer getrennt, Mobil Pflicht, Bankname.
  if (!String(f.strasse || '').trim()) felder.push('angaben.formular.strasse');
  if (!/^\d+(?:(?:\s*[A-Za-z\s-]+)|(?:\s*-\s*\d+))?(?:\s*\/\s*\d+)?$/.test(String(f.hausnummer || ''))) felder.push('angaben.formular.hausnummer');
  if (!/^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/.test(String(f.plz || ''))) felder.push('angaben.formular.plz');
  if (!istNameText(f.ort)) felder.push('angaben.formular.ort');
  if (!istTelefonText(f.telefon)) felder.push('angaben.formular.telefon');
  if (!istEmailText(f.email)) felder.push('angaben.formular.email');
  if (body.bestaetigungen?.acknowledge !== true) felder.push('bestaetigungen.acknowledge');
  if (a.krankenkasse !== undefined && !KASSE_MUSTER.test(String(a.krankenkasse))) felder.push('angaben.krankenkasse');
  const geburt = parseGeburtsdatum(a.geburtsdatum, heute);
  if (!geburt) felder.push('angaben.geburtsdatum');
  else if (!istVolljaehrigAm(a.geburtsdatum, heute)) return { status: 422, fehler: 'antrag_minderjaehrig' };

  const g = body.gesundheit || {};
  const ids1a = new Set(FRAGE_1A_ITEMS.map((item) => item.id));
  // Seit 19.11.2026 wie der Dienst: 15 Einzelantworten (einzel1a), passend zu antwort1a und kreuze1a.
  const einzel = g.einzel1a || {};
  const jaEinzel = FRAGE_1A_ITEMS.filter((item) => einzel[item.id] === 'ja').map((item) => item.id);
  const einzelOk = FRAGE_1A_ITEMS.every((item) => ['ja', 'nein'].includes(einzel[item.id]))
    && g.antwort1a === (jaEinzel.length ? 'ja' : 'nein') && Array.isArray(g.kreuze1a) && g.kreuze1a.length === jaEinzel.length && jaEinzel.every((id) => g.kreuze1a.includes(id));
  const gesundOk = einzelOk && ((g.antwort1a === 'nein' && g.kreuze1a.length === 0)
    || (g.antwort1a === 'ja' && g.kreuze1a.length > 0 && g.kreuze1a.every((id) => ids1a.has(id))));
  if (!gesundOk || FRAGEN_1B_1K.some((frage) => !['ja', 'nein'].includes(g.antworten?.[frage.id])) || !bmiAusEingabe(g.groesse, g.gewicht).plausibel) felder.push('gesundheit');

  const z = body.zahlung || {};
  if (z.zahlweise !== 'monatlich' || z.kontoinhaber !== 'selbst') felder.push('zahlung.zahlweise');
  if (!istIban(z.iban)) felder.push('zahlung.iban');
  if (!String(z.bankname || '').trim()) felder.push('zahlung.bankname');
  pruefeErklaerungen(DEFINITIONEN.ambulant, body, felder);
  if (felder.length) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder };

  const beginnJahr = Number(a.beginnIso.slice(0, 4));
  const { beitrag: grund } = grundbeitrag(geburt.jahr, beginnJahr, a.tarifCode);
  const zuschlag = zuschlagAufteilung(g).gesamt;
  const beitrag = Math.round((beitragMitZuschlag(grund, zuschlag) + aufschlag) * 100) / 100;
  if (body.beitragAngezeigt !== beitrag) {
    return {
      status: 409, fehler: 'antrag_beitrag_geaendert', beitrag: { grundbeitrag: grund, zuschlagProzent: zuschlag, beitrag, bestaetigt: true },
    };
  }
  return { status: 201, beitrag };
}

// Pflicht-Erklärungen laut Definition (Haken und SEPA), freiwillige als boolean,
// Ja/Nein-Erklärungen als 'ja'/'nein', Bestätigungssatz vor dem Absenden Pflicht
// (wie definitionen.mjs im Dienst seit 19.11.2026).
function pruefeErklaerungen(definition, body, felder) {
  const e = body.erklaerungen || {};
  definition.erklaerungen.flatMap((teil) => teil.eintraege).filter((eintrag) => eintrag.key && eintrag.art !== 'hinweis' && eintrag.art !== 'fest').forEach((eintrag) => {
    if (eintrag.art === 'janein') { if (!['ja', 'nein'].includes(e[eintrag.key])) felder.push(`erklaerungen.${eintrag.key}`); return; }
    if (eintrag.pflicht && e[eintrag.key] !== true) felder.push(`erklaerungen.${eintrag.key}`);
    if (!eintrag.pflicht && typeof e[eintrag.key] !== 'boolean') felder.push(`erklaerungen.${eintrag.key}`);
  });
  if (e[definition.zahlung.sepa.key] !== true) felder.push(`erklaerungen.${definition.zahlung.sepa.key}`);
  const schluss = definition.absenden?.bestaetigung?.key;
  if (schluss && e[schluss] !== true) felder.push(`erklaerungen.${schluss}`);
  // Pflicht-Downloads: Nachweis je Unterlage (Dienst prüft das seit 19.11.2026 selbst).
  if (definition.unterlagenDownload) {
    const tarif = body.angaben?.tarifCode;
    const geoeffnet = new Set((body.unterlagen?.geoeffnet || []).map((eintrag) => eintrag.href));
    if (definition.unterlagenDownload.liste(tarif).some((u, stelle) => !geoeffnet.has(`dienst:${u.id ?? `${definition.produkt === 'ambulant' ? 'AP' : tarif}-${stelle}`}`))) felder.push('unterlagen');
  }
}

// „Mein Antrag“ in der Antwort wie beim Dienst. NUR TEST: ein Platzhalter-PDF, kein echtes Dokument.
const meinAntragAttrappe = (kennung) => ({
  name: `Mein Antrag ${kennung}.pdf`, pdf: Buffer.from(`%PDF-1.4\n% TESTDATEI DER ATTRAPPE: Mein Antrag ${kennung}\n%%EOF\n`).toString('base64'),
});

// SDK stationär und UKV Zahn: Beitrag aus der Tabelle der Definition, UKV mit Zuschlag je fehlendem Zahn.
function pruefeLevelnine(definition, body, heute) {
  const a = body.angaben || {};
  const f = a.formular || {};
  const felder = [];
  if (body.schutz?.feld) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder: [] };
  if (!definition.tarife.some((tarif) => tarif.id === a.tarifCode)) felder.push('angaben.tarifCode');
  if (!['frau', 'herr'].includes(a.anrede)) felder.push('angaben.anrede');
  ['vorname', 'nachname', 'ort'].forEach((key) => { if (!istNameText(f[key])) felder.push(`angaben.formular.${key}`); });
  if (!String(f.strasse || '').trim()) felder.push('angaben.formular.strasse');
  if (!istPlzText(f.plz)) felder.push('angaben.formular.plz');
  if (!istEmailText(f.email)) felder.push('angaben.formular.email');
  const geburt = parseGeburtsdatum(a.geburtsdatum, heute);
  if (!geburt) felder.push('angaben.geburtsdatum');
  else if (!istVolljaehrigAm(a.geburtsdatum, heute)) return { status: 422, fehler: 'antrag_minderjaehrig' };
  (definition.person.bestaetigungen || []).forEach((eintrag) => { if (body.bestaetigungen?.[eintrag.key] !== true) felder.push(`bestaetigungen.${eintrag.key}`); });
  if (!istIban(body.zahlung?.iban)) felder.push('zahlung.iban');
  if (definition.zahlung.bankname && !String(body.zahlung?.bankname || '').trim()) felder.push('zahlung.bankname');
  pruefeErklaerungen(definition, body, felder);
  const antworten = body.gesundheit?.antworten || [];
  if (definition.produkt === 'zahn-ukv') {
    const tf = antworten.find((eintrag) => eintrag.feld === 'TF0021')?.wert;
    const behandlung = antworten.find((eintrag) => eintrag.feld === 'GF0073')?.wert;
    if (!['0', '1', '2', '3'].includes(tf) || behandlung !== 'false') felder.push('gesundheit');
  }
  if (felder.length) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder };
  const alter = Number(a.beginnIso.slice(0, 4)) - geburt.jahr;
  const tabelle = grundbeitragAusTabelle(definition.beitrag, { tarif: a.tarifCode, alter });
  if (!tabelle) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder: ['angaben.geburtsdatum'] };
  let beitrag = tabelle.grund;
  if (definition.produkt === 'zahn-ukv') {
    const zaehne = Number(antworten.find((eintrag) => eintrag.feld === 'TF0021')?.wert || 0);
    beitrag = mitZuschlag(tabelle.grund, 0, ({ Z100: 10.9, Z90: 9.0, Z75: 6.1 }[a.tarifCode] || 0) * zaehne);
  }
  beitrag = Math.round((beitrag + aufschlag) * 100) / 100;
  if (body.beitragAngezeigt !== beitrag) return { status: 409, fehler: 'antrag_beitrag_geaendert', beitrag: { beitrag } };
  return { status: 201, beitrag };
}

function pruefeZahn(body, heute) {
  const a = body.angaben || {};
  const f = a.formular || {};
  const felder = [];
  if (body.schutz?.feld) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder: [] };
  if (!['frau', 'herr', 'divers'].includes(a.anrede)) felder.push('angaben.anrede');
  ['vorname', 'nachname', 'ort'].forEach((key) => { if (!istNameText(f[key])) felder.push(`angaben.formular.${key}`); });
  if (!String(f.strasse || '').trim()) felder.push('angaben.formular.strasse');
  if (!String(f.hausnummer || '').trim()) felder.push('angaben.formular.hausnummer');
  if (!istPlzText(f.plz)) felder.push('angaben.formular.plz');
  if (!istEmailText(f.email)) felder.push('angaben.formular.email');
  const geburt = parseGeburtsdatum(a.geburtsdatum, heute);
  if (!geburt) felder.push('angaben.geburtsdatum');
  const g = body.gesundheit || {};
  const erwartet = g.fragebogen === 'KZV_SMART' ? 5 : 5;
  const abgelehnt = (g.antworten || []).some((eintrag) => ['1', '10', '13', '22'].includes(eintrag.frageId) && eintrag.antwort === 'ja');
  if (!Array.isArray(g.antworten) || g.antworten.filter((eintrag) => eintrag.frageId !== '28').length !== erwartet || abgelehnt) felder.push('gesundheit');
  if (!istIban(body.zahlung?.iban)) felder.push('zahlung.iban');
  const e = body.erklaerungen || {};
  ['verzicht', 'beratungsverzichtVersicherer', 'vollmacht', 'gesundheitsdaten', 'schweigepflicht', 'vvg', 'unterlagen', 'sepa'].forEach((key) => { if (e[key] !== true) felder.push(`erklaerungen.${key}`); });
  if (felder.length) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder };
  const beitrag = zahnBeitrag({
    tarifCode: a.tarifCode, bausteine: body.bausteine || [], zahlweise: body.zahlung?.zahlweise, geburtsdatum: a.geburtsdatum, beginnIso: a.beginnIso, plz: f.plz,
  });
  if (!beitrag) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder: ['angaben.tarifCode'] };
  const wert = Math.round((beitrag.beitrag + aufschlag) * 100) / 100;
  if (body.beitragAngezeigt !== wert) return { status: 409, fehler: 'antrag_beitrag_geaendert', beitrag: { beitrag: wert } };
  return { status: 201, beitrag: wert };
}

const server = http.createServer((anfrage, antwort) => {
  const herkunft = anfrage.headers.origin;
  const pfad = new URL(anfrage.url, 'http://x').pathname;
  if (anfrage.method === 'OPTIONS') { senden(antwort, herkunft && ERLAUBT.has(herkunft) ? 204 : 403, {}, herkunft); return; }
  if (herkunft && !ERLAUBT.has(herkunft)) { senden(antwort, 403, { ok: false, fehler: 'antrag_herkunft' }); return; }
  if (pfad === '/antrag/gesund') { senden(antwort, 200, { ok: true }, herkunft); return; }
  if (pfad === '/__test/telefon') { senden(antwort, 200, { ok: true, telefon: TELEFON_GESUNDHEIT }, herkunft); return; }
  if (pfad === '/__test/letzter') { senden(antwort, 200, { ok: true, letzter }, herkunft); return; }
  if (pfad === '/__test/beitrag-aendern') { aufschlag = 1; senden(antwort, 200, { ok: true }, herkunft); return; }
  if (pfad === '/__test/unterlagen-leer') { unterlagenLeer = 1; senden(antwort, 200, { ok: true }, herkunft); return; }
  if (pfad === '/__test/zuruecksetzen') { unterlagenLeer = 0; aufschlag = 0; letzter = null; senden(antwort, 200, { ok: true }, herkunft); return; }
  // Unterlagen wie der Dienst (SCHNITTSTELLE.md 12.6): Liste und Datei. NUR TEST:
  // Platzhalter-PDFs mit dem Vermerk „Testdatei der Attrappe“, keine echten Unterlagen.
  if ((pfad === '/antrag/api/unterlagen' || pfad === '/antrag/api/unterlagen/datei') && anfrage.method === 'GET') {
    const suche = new URL(anfrage.url, 'http://x').searchParams;
    const produkt = suche.get('produkt');
    const tarif = suche.get('tarif');
    const liste = ['sdk-ambulant', 'sdk-stationaer'].includes(produkt) ? LEVELNINE.sdkUnterlagen[produkt === 'sdk-ambulant' ? 'AP' : tarif] : null;
    if (!liste) { senden(antwort, 404, { ok: false, fehler: 'antrag_unterlagen_unbekannt' }, herkunft); return; }
    const eintraege = liste.map(([id, name], stelle) => ({
      id: String(id ?? `${tarif}-${stelle}`), name, art: name.startsWith('AVB') ? 'avb' : 'tarifbedingungen', stand: name.match(/\d{2}\.\d{2}$/)?.[0] || null, pflichtDownload: true,
    }));
    if (pfad === '/antrag/api/unterlagen' && unterlagenLeer > 0) { unterlagenLeer -= 1; senden(antwort, 200, { ok: true, test: true, produkt, tarif, unterlagen: [] }, herkunft); return; }
    if (pfad === '/antrag/api/unterlagen') { senden(antwort, 200, { ok: true, test: true, produkt, tarif, unterlagen: eintraege }, herkunft); return; }
    const treffer = eintraege.find((eintrag) => eintrag.id === suche.get('id'));
    if (!treffer) { senden(antwort, 404, { ok: false, fehler: 'antrag_unterlagen_unbekannt' }, herkunft); return; }
    const kopf = { 'Content-Type': 'application/pdf', 'Cache-Control': 'no-store' };
    if (herkunft && ERLAUBT.has(herkunft)) { kopf['Access-Control-Allow-Origin'] = herkunft; kopf.Vary = 'Origin'; }
    antwort.writeHead(200, kopf);
    antwort.end(`%PDF-1.4\n% TESTDATEI DER ATTRAPPE, KEIN ECHTES DOKUMENT: ${treffer.name}\n%%EOF\n`);
    return;
  }
  // Prüfseite für einen am Telefon aufgenommenen Zahn-Antrag (Token test-zahn), Vertrag SCHNITTSTELLE.md 4.2 plus Feld sparte.
  if (pfad === '/antrag/api/entwurf' && anfrage.method === 'GET') {
    const optionen = beginnOptionen(new Date());
    // Ambulant mit der Fassung der Online-Strecke (Token test-ambulant-online).
    if (anfrage.headers.authorization === 'Bearer test-ambulant-online') {
      senden(antwort, 200, {
        ok: true,
        kennung: 'HA-261112-AMBO',
        status: 'offen',
        sparte: 'ambulant',
        regelwerkFassung: '2026-11-12-sdk-ambulant-online',
        gesundheitTelefon: {
          antwort1a: 'nein', kreuze1a: [], antworten: Object.fromEntries(FRAGEN_1B_1K.map((frage) => [frage.id, 'nein'])), groesse: '178', gewicht: '75',
        },
        gueltigBis: '2026-11-19',
        angaben: {
          tarifCode: 'AP1', beginnIso: optionen.naechstmoeglich.iso, anrede: 'frau', geburtsdatum: '05.03.1990',
          formular: {
            vorname: 'Lena', nachname: 'Muster', strasse: 'Musterweg', hausnummer: '12', plz: '20095', ort: 'Hamburg', telefon: '0151 1234567', email: 'lena@beispiel.de',
          },
        },
        
        beginnOptionen: optionen,
      }, herkunft);
      return;
    }
    const levelnine = { 'Bearer test-stationaer': 'stationaer', 'Bearer test-ukv': 'zahn-ukv' }[anfrage.headers.authorization];
    if (levelnine) {
      const def = DEFINITIONEN[levelnine];
      senden(antwort, 200, {
        ok: true,
        kennung: levelnine === 'stationaer' ? 'HA-261112-STAT' : 'HA-261112-UKVZ',
        status: 'offen',
        sparte: def.sparte,
        produkt: levelnine === 'stationaer' ? 'sdk-stationaer' : 'zahn-ukv',
        versicherer: def.versicherer.id,
        gueltigBis: '2026-11-19',
        angaben: {
          tarifCode: levelnine === 'stationaer' ? 'SP2' : 'Z100', beginnIso: optionen.naechstmoeglich.iso, anrede: 'frau', geburtsdatum: '05.03.1990',
          formular: {
            vorname: 'Lena', nachname: 'Muster', strasse: levelnine === 'stationaer' ? 'Musterweg' : 'Musterweg 12', ...(levelnine === 'stationaer' ? { hausnummer: '12' } : {}), plz: '20095', ort: 'Hamburg', telefon: '0151 1234567', email: 'lena@beispiel.de',
          },
        },
        gesundheitTelefon: TELEFON_GESUNDHEIT[levelnine],
        beginnOptionen: optionen,
      }, herkunft);
      return;
    }
    if (anfrage.headers.authorization !== 'Bearer test-zahn') { senden(antwort, 404, { ok: false, fehler: 'antrag_link_ungueltig' }, herkunft); return; }
    senden(antwort, 200, {
      ok: true,
      kennung: 'HA-261112-ZAHN',
      status: 'offen',
      sparte: 'zahn',
      gueltigBis: '2026-11-19',
      angaben: {
        tarifCode: 'KOMFORT', bausteine: [], zahlweise: 'monatlich', beginnIso: optionen.naechstmoeglich.iso, anrede: 'frau', geburtsdatum: '05.03.1990',
        formular: {
          vorname: 'Lena', nachname: 'Muster', plz: '20095', ort: 'Hamburg', strasse: 'Musterweg', hausnummer: '12', email: 'lena@beispiel.de',
        },
      },
      gesundheitTelefon: TELEFON_GESUNDHEIT.zahn,
      beginnOptionen: { naechstmoeglich: optionen.naechstmoeglich, weitere: optionen.weitere.slice(0, 4) },
    }, herkunft);
    return;
  }
  if (pfad === '/antrag/api/bestaetigen' && anfrage.method === 'POST') {
    let roh = '';
    anfrage.on('data', (stueck) => { roh += stueck; });
    anfrage.on('end', () => {
      let body = null;
      try { body = JSON.parse(roh); } catch { /* unten */ }
      const token = anfrage.headers.authorization;
      const KENNUNGEN = {
        'Bearer test-zahn': 'HA-261112-ZAHN', 'Bearer test-ambulant-online': 'HA-261112-AMBO', 'Bearer test-stationaer': 'HA-261112-STAT', 'Bearer test-ukv': 'HA-261112-UKVZ',
      };
      if (!KENNUNGEN[token] || !body) { senden(antwort, 404, { ok: false, fehler: 'antrag_link_ungueltig' }, herkunft); return; }
      if (token === 'Bearer test-ambulant-online' && body.textfassung !== DEFINITIONEN.ambulant.textfassung) { senden(antwort, 422, { ok: false, fehler: 'antrag_angaben_ungueltig', felder: ['textfassung'] }, herkunft); return; }
      const ergebnis = token === 'Bearer test-zahn' ? pruefeZahn(body, new Date()) : pruefe(body);
      if (ergebnis.status !== 201) { senden(antwort, ergebnis.status, { ok: false, fehler: ergebnis.fehler, ...(ergebnis.felder ? { felder: ergebnis.felder } : {}) }, herkunft); return; }
      letzter = { ...body, herkunft: bereinigeHerkunft(body.herkunft), ueber: 'pruefseite' };
      senden(antwort, 200, {
        ok: true, kennung: KENNUNGEN[token], status: 'bestaetigt', bestaetigtAm: new Date().toISOString(), meinAntrag: meinAntragAttrappe(KENNUNGEN[token]),
      }, herkunft);
    });
    return;
  }
  if (!['/antrag/api/selbstantrag', '/antrag/api/selbstantrag/beitrag'].includes(pfad) || anfrage.method !== 'POST') { senden(antwort, 404, { ok: false, fehler: 'nicht_gefunden' }, herkunft); return; }
  let roh = '';
  anfrage.on('data', (stueck) => {
    roh += stueck;
    if (roh.length > 32 * 1024) { senden(antwort, 413, { ok: false, fehler: 'antrag_zu_gross' }, herkunft); anfrage.destroy(); }
  });
  anfrage.on('end', () => {
    let body;
    try { body = JSON.parse(roh); } catch { senden(antwort, 400, { ok: false, fehler: 'antrag_angaben_ungueltig', felder: [] }, herkunft); return; }
    if (pfad === '/antrag/api/selbstantrag/beitrag') {
      if (body?.sparte !== 'zahn' || body?.versicherer !== 'bayerische') { senden(antwort, 409, { ok: false, fehler: 'antrag_sparte_nicht_bereit' }, herkunft); return; }
      const beitrag = zahnBeitrag(body);
      if (!beitrag) { senden(antwort, 422, { ok: false, fehler: 'antrag_angaben_ungueltig', felder: [] }, herkunft); return; }
      senden(antwort, 200, {
        ok: true, sparte: 'zahn', produkt: 'bayerische-zahn', tarifCode: body.tarifCode, ...beitrag, alleStufen: beitrag.alleTarife, regionGeprueft: Boolean(ZAHN.plz[body.plz]), ablehnung: null, beitrag: Math.round((beitrag.beitrag + aufschlag) * 100) / 100,
      }, herkunft);
      return;
    }
    const ergebnis = pruefe(body);
    if (ergebnis.status !== 201) {
      senden(antwort, ergebnis.status, { ok: false, fehler: ergebnis.fehler, ...(ergebnis.felder ? { felder: ergebnis.felder } : {}), ...(ergebnis.beitrag ? { beitrag: ergebnis.beitrag } : {}) }, herkunft);
      return;
    }
    zaehler += 1;
    // Herkunft wie der künftige Server: nur bereinigte Kennzeichen, fehlt sie, bleibt sie leer (kein Fehler).
    letzter = { ...body, herkunft: bereinigeHerkunft(body.herkunft) };
    const kennung = `HS-261112-T${String(zaehler).padStart(3, '0')}`;
    senden(antwort, 201, {
      ok: true, kennung, status: 'eingegangen', eingegangenAm: new Date().toISOString(), beitrag: ergebnis.beitrag, meinAntrag: meinAntragAttrappe(kennung),
    }, herkunft);
  });
});

server.listen(PORT, '127.0.0.1');
