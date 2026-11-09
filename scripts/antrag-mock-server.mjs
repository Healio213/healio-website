// Nachbau der öffentlichen Antrags-API (SCHNITTSTELLE.md 4.2) für die
// lokale Entwicklung der Prüfseite /antrag/pruefen. Node ohne Abhängigkeiten,
// rechnet mit src/data/sdkAmbulantAntrag.js. Erfundene Testdaten, nichts
// wird gespeichert (alles nur im Speicher dieses Prozesses).
//
// Start: node scripts/antrag-mock-server.mjs   (Port 8791, ANTRAG_MOCK_PORT)
// Website: VITE_ANTRAG_API=http://localhost:8791/antrag/api npm run dev -- --port 3017
//
// Tokens: test-offen (offener Entwurf), test-bestaetigt (schon bestätigt),
// alles andere 404 antrag_link_ungueltig.
// Nur für Prüfskripte (nicht Teil des Vertrags):
//   POST /__test/zuruecksetzen      setzt test-offen wieder auf „offen“
//   POST /__test/beitrag-aendern    rechnet ab jetzt 1,00 EUR mehr (für 409)
//   GET  /__test/letzte-bestaetigung die zuletzt angenommene Bestätigung

import http from 'node:http';
import {
  FRAGEN_1B_1K,
  FRAGE_1A_ITEMS,
  ZAHLWEISEN,
  alterAmTag,
  beginnOptionen,
  beitragFuer2026Bestaetigt,
  beitragMitZuschlag,
  bmiAusEingabe,
  findeTarif,
  geburtsjahrAusDatum,
  grundbeitrag,
  istEmail,
  istName,
  istPlz,
  istStrasseMitNummer,
  istTelefon,
  istVolljaehrigAm,
  parseGeburtsdatum,
  zuschlagAufteilung,
} from '../src/data/sdkAmbulantAntrag.js';

const PORT = Number(process.env.ANTRAG_MOCK_PORT || 8791);
const ERLAUBT = new Set((process.env.ANTRAG_ERLAUBTE_HERKUNFT || 'http://localhost:3017,http://127.0.0.1:3017').split(',').map((eintrag) => eintrag.trim()).filter(Boolean));
const CODES = ['AP5', 'AP7', 'AP9', 'AP1'];
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const heute = () => new Date();
const isoTag = (datum) => `${datum.getFullYear()}-${String(datum.getMonth() + 1).padStart(2, '0')}-${String(datum.getDate()).padStart(2, '0')}`;

// ---- Zahlen in Worten (für alleStufenAnsage) --------------------------------
const EINER = ['null', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const ZEHNER = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
function unterHundert(zahl) {
  if (zahl < 20) return zahl === 1 ? 'eins' : EINER[zahl];
  const einer = zahl % 10;
  const zehner = ZEHNER[Math.floor(zahl / 10)];
  return einer === 0 ? zehner : `${EINER[einer]}und${zehner}`;
}
function inWorten(zahl) {
  if (zahl < 100) return unterHundert(zahl);
  const hundert = Math.floor(zahl / 100);
  const rest = zahl % 100;
  return `${hundert === 1 ? 'ein' : EINER[hundert]}hundert${rest ? unterHundert(rest) : ''}`;
}
function euroAnsage(betrag) {
  const cent = Math.round(betrag * 100);
  const euro = Math.floor(cent / 100);
  const rest = cent % 100;
  const euroText = euro === 1 ? 'ein Euro' : `${inWorten(euro)} Euro`;
  return rest ? `${euroText} ${inWorten(rest)}` : euroText;
}

// ---- Testdaten --------------------------------------------------------------
function optionen() {
  const opt = beginnOptionen(heute());
  const knapp = ({ iso, label }) => ({ iso, label });
  return { naechstmoeglich: knapp(opt.naechstmoeglich), weitere: opt.weitere.map(knapp) };
}

function angabenLena() {
  return {
    tarifCode: 'AP1',
    beginnIso: beginnOptionen(heute()).naechstmoeglich.iso,
    anrede: 'frau',
    formular: {
      vorname: 'Lena', nachname: 'Muster', strasse: 'Musterweg 12', plz: '20095', ort: 'Hamburg', telefon: '+4915112345678', email: 'lena@beispiel.de',
    },
    geburtsdatum: '05.03.1990',
    gkv: true,
    krankenkasse: 'Techniker Krankenkasse',
  };
}

function gesundheitTelefonLena() {
  return {
    antwort1a: 'nein',
    kreuze1a: [],
    antworten: Object.fromEntries(FRAGEN_1B_1K.map((frage) => [frage.id, frage.id === '1b' ? 'ja' : 'nein'])),
    groesse: '170',
    gewicht: '65',
  };
}

const zustand = {
  offen: { status: 'offen', bestaetigung: null, bestaetigtAm: null },
  aufschlag: 0,
  letzte: null,
};
const zuruecksetzen = () => {
  zustand.offen = { status: 'offen', bestaetigung: null, bestaetigtAm: null };
  zustand.aufschlag = 0;
  zustand.letzte = null;
};

// ---- Rechnen ----------------------------------------------------------------
function beitragRechnen({
  tarifCode, geburtsdatum, beginnIso, gesundheit,
}) {
  const felder = [];
  if (!findeTarif(tarifCode)) felder.push('tarifCode');
  const datum = parseGeburtsdatum(geburtsdatum, heute());
  if (!datum) felder.push('geburtsdatum');
  const opt = beginnOptionen(heute());
  const alle = [opt.naechstmoeglich, ...opt.weitere];
  const beginn = beginnIso ? alle.find((option) => option.iso === beginnIso) : opt.naechstmoeglich;
  if (!beginn) felder.push('beginnIso');
  if (felder.length) return { fehler: 'antrag_angaben_ungueltig', felder };
  if (!istVolljaehrigAm(geburtsdatum, heute())) return { fehler: 'antrag_minderjaehrig' };

  const geburtsjahr = geburtsjahrAusDatum(geburtsdatum, heute());
  const g = gesundheit || {};
  const zuschlag = gesundheit ? zuschlagAufteilung({
    antwort1a: g.antwort1a, kreuze1a: g.kreuze1a || [], antworten: g.antworten || {}, groesse: g.groesse || '', gewicht: g.gewicht || '',
  }) : { gesamt: 0, jaFragen: [], bmi: null };
  const prozent = zuschlag.gesamt;
  const beitragFuer = (code) => {
    const { beitrag: grund } = grundbeitrag(geburtsjahr, beginn.jahr, code);
    return grund === null ? null : Math.round((beitragMitZuschlag(grund, prozent) + zustand.aufschlag) * 100) / 100;
  };
  const { gruppe, beitrag: grund } = grundbeitrag(geburtsjahr, beginn.jahr, tarifCode);
  const gruende = [];
  if (gesundheit) {
    if (g.antwort1a === 'ja') FRAGE_1A_ITEMS.filter((item) => (g.kreuze1a || []).includes(item.id)).forEach((item) => gruende.push(item.label.replace(/​/g, '')));
    FRAGEN_1B_1K.filter((frage) => zuschlag.jaFragen.includes(frage.id)).forEach((frage) => gruende.push(frage.kurz));
    if ((zuschlag.bmi || 0) > 0) gruende.push('Größe und Gewicht');
  }
  const alleStufen = Object.fromEntries(CODES.map((code) => [code, beitragFuer(code)]));
  return {
    ok: true,
    tarifCode,
    beginnIso: beginn.iso,
    beginnText: `1. ${MONATE[beginn.monat - 1]} ${beginn.jahr}`,
    alter: alterAmTag(geburtsdatum, new Date(beginn.jahr, beginn.monat - 1, 1)),
    grundbeitrag: grund,
    zuschlagProzent: prozent,
    beitrag: beitragFuer(tarifCode),
    bestaetigt: beitragFuer2026Bestaetigt(gruppe, tarifCode),
    gruende,
    alleStufen,
    alleStufenAnsage: Object.fromEntries(CODES.map((code) => [code, alleStufen[code] === null ? '' : euroAnsage(alleStufen[code])])),
  };
}

// ---- Prüfung der Bestätigung -----------------------------------------------
function istDeutscheIban(text) {
  const iban = String(text || '').replace(/\s/g, '').toUpperCase();
  if (!/^DE\d{20}$/.test(iban)) return false;
  const ziffern = `${iban.slice(4)}${iban.slice(0, 4)}`.replace(/[A-Z]/g, (buchstabe) => String(buchstabe.charCodeAt(0) - 55));
  let rest = 0;
  for (let stelle = 0; stelle < ziffern.length; stelle += 7) rest = Number(`${rest}${ziffern.slice(stelle, stelle + 7)}`) % 97;
  return rest === 1;
}

function pruefeAngaben(a) {
  const felder = [];
  if (!a || typeof a !== 'object') return ['angaben'];
  if (!findeTarif(a.tarifCode)) felder.push('tarifCode');
  const opt = beginnOptionen(heute());
  if (![opt.naechstmoeglich, ...opt.weitere].some((option) => option.iso === a.beginnIso)) felder.push('beginnIso');
  if (!['frau', 'herr', 'divers'].includes(a.anrede)) felder.push('anrede');
  const f = a.formular || {};
  const NAME = /^\p{L}[\p{L}\p{M}' .-]{1,79}$/u;
  if (!istName(f.vorname) || !NAME.test(f.vorname)) felder.push('formular.vorname');
  if (!istName(f.nachname) || !NAME.test(f.nachname)) felder.push('formular.nachname');
  if (!istStrasseMitNummer(f.strasse)) felder.push('formular.strasse');
  if (!istPlz(f.plz)) felder.push('formular.plz');
  if (!istName(f.ort) || !NAME.test(f.ort)) felder.push('formular.ort');
  if (!istTelefon(f.telefon)) felder.push('formular.telefon');
  // Abschnitt 10.2: genau die hinterlegte Adresse.
  if (!istEmail(f.email) || f.email !== angabenLena().formular.email) felder.push('formular.email');
  if (!parseGeburtsdatum(a.geburtsdatum, heute())) felder.push('geburtsdatum');
  if (a.gkv !== true) felder.push('gkv');
  if (a.krankenkasse !== undefined && (typeof a.krankenkasse !== 'string' || a.krankenkasse.length > 80 || !/^[\p{L}\p{M}\d' .&+()-]*$/u.test(a.krankenkasse))) felder.push('krankenkasse');
  return felder;
}

function pruefeGesundheit(g) {
  const felder = [];
  if (!g || typeof g !== 'object') return ['gesundheit'];
  if (!['ja', 'nein'].includes(g.antwort1a)) felder.push('gesundheit.antwort1a');
  const bekannt = new Set(FRAGE_1A_ITEMS.map((item) => item.id));
  if (!Array.isArray(g.kreuze1a) || g.kreuze1a.some((id) => !bekannt.has(id)) || (g.antwort1a === 'ja' && g.kreuze1a.length === 0)) felder.push('gesundheit.kreuze1a');
  const antworten = g.antworten || {};
  if (Object.keys(antworten).length !== FRAGEN_1B_1K.length) felder.push('gesundheit.antworten');
  FRAGEN_1B_1K.forEach((frage) => { if (!['ja', 'nein'].includes(antworten[frage.id])) felder.push(`gesundheit.antworten.${frage.id}`); });
  if (!bmiAusEingabe(g.groesse, g.gewicht).plausibel) felder.push('gesundheit.groesse');
  return felder;
}

function pruefeBestaetigung(body) {
  const felder = [...pruefeAngaben(body.angaben), ...pruefeGesundheit(body.gesundheit)];
  const z = body.zahlung || {};
  if (!ZAHLWEISEN.some((eintrag) => eintrag.id === z.zahlweise)) felder.push('zahlung.zahlweise');
  if (z.kontoinhaber !== 'selbst') felder.push('zahlung.kontoinhaber');
  if (!istDeutscheIban(z.iban)) felder.push('zahlung.iban');
  if (body.versand !== 'email') felder.push('versand');
  const e = body.erklaerungen || {};
  ['hinweisOk', 'verzicht', 'vollmacht', 'gesundheitsdaten', 'schluss', 'sepa'].forEach((key) => { if (e[key] !== true) felder.push(`erklaerungen.${key}`); });
  if (!['I', 'II'].includes(e.schweigepflicht)) felder.push('erklaerungen.schweigepflicht');
  if (typeof e.bonitaet !== 'boolean') felder.push('erklaerungen.bonitaet');
  if (body.textfassung !== '2026-11-09') felder.push('textfassung');
  if (!Number.isFinite(body.beitragAngezeigt)) felder.push('beitragAngezeigt');
  return felder;
}

// ---- Antworten --------------------------------------------------------------
function entwurfAntwort(token) {
  const angaben = angabenLena();
  const opt = optionen();
  const gueltig = new Date(heute().getTime() + 7 * 24 * 3600 * 1000);
  const basis = beitragRechnen({ tarifCode: angaben.tarifCode, geburtsdatum: angaben.geburtsdatum, beginnIso: angaben.beginnIso, gesundheit: gesundheitTelefonLena() });
  const antwort = {
    ok: true,
    kennung: token === 'test-bestaetigt' ? 'HA-261108-T3ST' : 'HA-261109-K7QF',
    status: 'offen',
    gueltigBis: isoTag(gueltig),
    angaben,
    gesundheitTelefon: gesundheitTelefonLena(),
    beginnOptionen: opt,
    beitrag: {
      grundbeitrag: basis.grundbeitrag, zuschlagProzent: basis.zuschlagProzent, beitrag: basis.beitrag, bestaetigt: basis.bestaetigt,
    },
  };
  // Abschnitt 10.3: nach der Bestätigung nur eine Zusammenfassung.
  const zusammenfassung = (bestaetigtAm, quelle) => ({
    ok: true, kennung: antwort.kennung, status: 'bestaetigt', bestaetigtAm, gueltigBis: antwort.gueltigBis, bestaetigung: quelle,
  });
  if (token === 'test-bestaetigt') {
    return zusammenfassung('2026-11-08T16:20:00Z', {
      vorname: angaben.formular.vorname, nachname: angaben.formular.nachname, tarifCode: angaben.tarifCode, beginnIso: angaben.beginnIso, zahlweise: 'monatlich', ibanEnde: '3000', beitrag: antwort.beitrag,
    });
  }
  if (zustand.offen.status === 'bestaetigt') return zusammenfassung(zustand.offen.bestaetigtAm, zustand.offen.bestaetigung);
  return antwort;
}

function senden(res, status, daten, kopf = {}) {
  const text = daten === null ? '' : JSON.stringify(daten);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    ...kopf,
  });
  res.end(text);
}

function leseKoerper(req) {
  return new Promise((resolve, reject) => {
    let groesse = 0;
    const teile = [];
    req.on('data', (stueck) => {
      groesse += stueck.length;
      if (groesse > 32 * 1024) { reject(new Error('zu_gross')); req.destroy(); return; }
      teile.push(stueck);
    });
    req.on('end', () => {
      try { resolve(teile.length ? JSON.parse(Buffer.concat(teile).toString('utf8')) : {}); } catch { reject(new Error('json')); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const herkunft = req.headers.origin;
  const cors = herkunft && ERLAUBT.has(herkunft)
    ? {
      'Access-Control-Allow-Origin': herkunft, Vary: 'Origin', 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Max-Age': '600',
    }
    : {};
  if (herkunft && !ERLAUBT.has(herkunft)) { senden(res, 403, { ok: false, fehler: 'antrag_herkunft' }); return; }
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return; }

  // Prüfhilfen (nicht Teil des Vertrags).
  if (url.pathname === '/__test/zuruecksetzen' && req.method === 'POST') { zuruecksetzen(); senden(res, 200, { ok: true }, cors); return; }
  if (url.pathname === '/__test/beitrag-aendern' && req.method === 'POST') { zustand.aufschlag = 1; senden(res, 200, { ok: true }, cors); return; }
  if (url.pathname === '/__test/letzte-bestaetigung' && req.method === 'GET') { senden(res, 200, { ok: true, letzte: zustand.letzte }, cors); return; }

  if (url.pathname === '/antrag/gesund') { senden(res, 200, { ok: true }, cors); return; }
  if (!url.pathname.startsWith('/antrag/api/')) { senden(res, 404, { ok: false, fehler: 'nicht_gefunden' }, cors); return; }

  const token = /^Bearer\s+(.+)$/.exec(req.headers.authorization || '')?.[1]?.trim();
  if (token !== 'test-offen' && token !== 'test-bestaetigt') { senden(res, 404, { ok: false, fehler: 'antrag_link_ungueltig' }, cors); return; }

  let body = {};
  if (req.method === 'POST') {
    try { body = await leseKoerper(req); } catch (fehler) {
      senden(res, fehler.message === 'zu_gross' ? 413 : 400, { ok: false, fehler: fehler.message === 'zu_gross' ? 'antrag_zu_gross' : 'antrag_json_ungueltig' }, cors);
      return;
    }
  }

  const pfad = url.pathname.slice('/antrag/api'.length);
  if (pfad === '/entwurf' && req.method === 'GET') { senden(res, 200, entwurfAntwort(token), cors); return; }

  if (pfad === '/beitrag' && req.method === 'POST') {
    const ergebnis = beitragRechnen(body);
    if (ergebnis.fehler) { senden(res, 422, { ok: false, fehler: ergebnis.fehler, ...(ergebnis.felder ? { felder: ergebnis.felder } : {}) }, cors); return; }
    senden(res, 200, ergebnis, cors);
    return;
  }

  if (pfad === '/bestaetigen' && req.method === 'POST') {
    if (token === 'test-bestaetigt' || zustand.offen.status === 'bestaetigt') { senden(res, 409, { ok: false, fehler: 'antrag_schon_bestaetigt' }, cors); return; }
    const felder = pruefeBestaetigung(body);
    if (felder.length) { senden(res, 422, { ok: false, fehler: 'antrag_angaben_ungueltig', felder }, cors); return; }
    const a = body.angaben;
    if (!istVolljaehrigAm(a.geburtsdatum, heute())) { senden(res, 422, { ok: false, fehler: 'antrag_minderjaehrig' }, cors); return; }
    const gerechnet = beitragRechnen({
      tarifCode: a.tarifCode, geburtsdatum: a.geburtsdatum, beginnIso: a.beginnIso, gesundheit: body.gesundheit,
    });
    const beitragObjekt = {
      grundbeitrag: gerechnet.grundbeitrag, zuschlagProzent: gerechnet.zuschlagProzent, beitrag: gerechnet.beitrag, bestaetigt: gerechnet.bestaetigt,
    };
    if (Math.abs(gerechnet.beitrag - body.beitragAngezeigt) > 0.004) { senden(res, 409, { ok: false, fehler: 'antrag_beitrag_geaendert', beitrag: beitragObjekt }, cors); return; }
    const bestaetigtAm = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
    const iban = String(body.zahlung.iban).replace(/\s/g, '');
    zustand.offen = {
      status: 'bestaetigt',
      bestaetigtAm,
      bestaetigung: {
        vorname: a.formular.vorname, nachname: a.formular.nachname, tarifCode: a.tarifCode, beginnIso: a.beginnIso, zahlweise: body.zahlung.zahlweise, ibanEnde: iban.slice(-4), beitrag: beitragObjekt,
      },
    };
    zustand.letzte = { ...body, zahlung: { ...body.zahlung, iban: `…${iban.slice(-4)}` } };
    senden(res, 200, {
      ok: true, kennung: 'HA-261109-K7QF', status: 'bestaetigt', bestaetigtAm,
    }, cors);
    return;
  }

  senden(res, 404, { ok: false, fehler: 'nicht_gefunden' }, cors);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Antrags-API-Nachbau läuft auf http://localhost:${PORT}/antrag/api (Tokens: test-offen, test-bestaetigt)`);
});
