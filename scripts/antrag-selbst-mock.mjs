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
//   POST /__test/zuruecksetzen
//   GET  /__test/letzter             der zuletzt angenommene Datensatz

import fs from 'node:fs';
import http from 'node:http';
import {
  FRAGEN_1B_1K, FRAGE_1A_ITEMS, ZAHLWEISEN, beginnOptionen, beitragMitZuschlag, bmiAusEingabe, grundbeitrag,
  istVolljaehrigAm, parseGeburtsdatum, zuschlagAufteilung,
} from '../src/data/sdkAmbulantAntrag.js';
import { bereinigeHerkunft } from '../src/lib/antragsmaske/vertrag.js';
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

const PORT = Number(process.env.ANTRAG_SELBST_MOCK_PORT || 8792);
const ERLAUBT = new Set((process.env.ANTRAG_ERLAUBTE_HERKUNFT || 'http://localhost:3018,http://127.0.0.1:3018').split(',').map((eintrag) => eintrag.trim()).filter(Boolean));
let aufschlag = 0;
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
  if (body.sparte !== 'ambulant' || body.versicherer !== 'sdk') return { status: 409, fehler: 'antrag_sparte_nicht_bereit' };
  if (body.schutz?.feld) return { status: 422, fehler: 'antrag_angaben_ungueltig', felder: [] };
  if (!['AP5', 'AP7', 'AP9', 'AP1'].includes(a.tarifCode)) felder.push('angaben.tarifCode');
  const optionen = beginnOptionen(heute);
  if (![optionen.naechstmoeglich, ...optionen.weitere].some((option) => option.iso === a.beginnIso)) felder.push('angaben.beginnIso');
  if (!['frau', 'herr', 'divers'].includes(a.anrede)) felder.push('angaben.anrede');
  if (!istNameText(f.vorname)) felder.push('angaben.formular.vorname');
  if (!istNameText(f.nachname)) felder.push('angaben.formular.nachname');
  if (!istStrasseText(f.strasse)) felder.push('angaben.formular.strasse');
  if (!istPlzText(f.plz)) felder.push('angaben.formular.plz');
  if (!istNameText(f.ort)) felder.push('angaben.formular.ort');
  if (!istTelefonText(f.telefon)) felder.push('angaben.formular.telefon');
  if (!istEmailText(f.email)) felder.push('angaben.formular.email');
  if (a.gkv !== true) felder.push('angaben.gkv');
  if (a.krankenkasse !== undefined && !KASSE_MUSTER.test(String(a.krankenkasse))) felder.push('angaben.krankenkasse');
  const geburt = parseGeburtsdatum(a.geburtsdatum, heute);
  if (!geburt) felder.push('angaben.geburtsdatum');
  else if (!istVolljaehrigAm(a.geburtsdatum, heute)) return { status: 422, fehler: 'antrag_minderjaehrig' };

  const g = body.gesundheit || {};
  const ids1a = new Set(FRAGE_1A_ITEMS.map((item) => item.id));
  const gesundOk = (g.antwort1a === 'nein' && Array.isArray(g.kreuze1a) && g.kreuze1a.length === 0)
    || (g.antwort1a === 'ja' && Array.isArray(g.kreuze1a) && g.kreuze1a.length > 0 && g.kreuze1a.every((id) => ids1a.has(id)));
  if (!gesundOk || FRAGEN_1B_1K.some((frage) => !['ja', 'nein'].includes(g.antworten?.[frage.id])) || !bmiAusEingabe(g.groesse, g.gewicht).plausibel) felder.push('gesundheit');

  const z = body.zahlung || {};
  if (!ZAHLWEISEN.some((eintrag) => eintrag.id === z.zahlweise) || z.kontoinhaber !== 'selbst') felder.push('zahlung.zahlweise');
  if (!istIban(z.iban)) felder.push('zahlung.iban');
  const e = body.erklaerungen || {};
  ['hinweisOk', 'verzicht', 'vollmacht', 'gesundheitsdaten', 'schluss', 'sepa'].forEach((key) => { if (e[key] !== true) felder.push(`erklaerungen.${key}`); });
  if (!['I', 'II'].includes(e.schweigepflicht)) felder.push('erklaerungen.schweigepflicht');
  if (typeof e.bonitaet !== 'boolean') felder.push('erklaerungen.bonitaet');
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
  if (pfad === '/__test/letzter') { senden(antwort, 200, { ok: true, letzter }, herkunft); return; }
  if (pfad === '/__test/beitrag-aendern') { aufschlag = 1; senden(antwort, 200, { ok: true }, herkunft); return; }
  if (pfad === '/__test/zuruecksetzen') { aufschlag = 0; letzter = null; senden(antwort, 200, { ok: true }, herkunft); return; }
  // Prüfseite für einen am Telefon aufgenommenen Zahn-Antrag (Token test-zahn), Vertrag SCHNITTSTELLE.md 4.2 plus Feld sparte.
  if (pfad === '/antrag/api/entwurf' && anfrage.method === 'GET') {
    if (anfrage.headers.authorization !== 'Bearer test-zahn') { senden(antwort, 404, { ok: false, fehler: 'antrag_link_ungueltig' }, herkunft); return; }
    const optionen = beginnOptionen(new Date());
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
      gesundheitTelefon: null,
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
      if (anfrage.headers.authorization !== 'Bearer test-zahn' || !body) { senden(antwort, 404, { ok: false, fehler: 'antrag_link_ungueltig' }, herkunft); return; }
      const ergebnis = pruefeZahn(body, new Date());
      if (ergebnis.status !== 201) { senden(antwort, ergebnis.status, { ok: false, fehler: ergebnis.fehler, ...(ergebnis.felder ? { felder: ergebnis.felder } : {}) }, herkunft); return; }
      letzter = { ...body, herkunft: bereinigeHerkunft(body.herkunft), ueber: 'pruefseite' };
      senden(antwort, 200, { ok: true, kennung: 'HA-261112-ZAHN', status: 'bestaetigt', bestaetigtAm: new Date().toISOString() }, herkunft);
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
      senden(antwort, 200, { ok: true, sparte: 'zahn', tarifCode: body.tarifCode, ...beitrag, beitrag: Math.round((beitrag.beitrag + aufschlag) * 100) / 100 }, herkunft);
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
      ok: true, kennung, status: 'eingegangen', eingegangenAm: new Date().toISOString(), beitrag: ergebnis.beitrag,
    }, herkunft);
  });
});

server.listen(PORT, '127.0.0.1');
