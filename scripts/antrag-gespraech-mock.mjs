// Nachbau der öffentlichen Adressen des HD-Dienstes für das Antragsgespräch (SCHNITTSTELLE.md 11.1), nur für
// die lokale Prüfung der Seite /antrag/aufnehmen. Node ohne Abhängigkeiten, nichts wird gespeichert.
// Eine echte Sprachverbindung kommt damit nicht zustande (die SDP-Antwort ist ein fester Text).
//
// Start: node scripts/antrag-gespraech-mock.mjs   (Port 8793, ANTRAG_GESPRAECH_MOCK_PORT)
// Website: VITE_ANTRAG_GESPRAECH=1 VITE_ANTRAG_GESPRAECH_API=http://127.0.0.1:8793/nita/antrag npm run dev -- --port 3019
// Fehler von Anfang an: ANTRAG_GESPRAECH_MOCK_FEHLER=429 oder 503.
//
// Nur für Prüfskripte (nicht Teil des Vertrags):
//   POST /__test/zuruecksetzen           alles auf Anfang (kein Fehler, Mail „verschickt“, Zähler 0)
//   POST /__test/session-fehler/<code>   429 (Tagesgrenze), 429-ip (je IP), 503, 404 oder aus
//   POST /__test/mail/<modus>            verschickt, test_verschickt, schon_verschickt, fehler, datei, aus
//   POST /__test/verzoegerung/<ms>       antwortet auf /session erst nach so vielen Millisekunden (bis 30000)
//   POST /__test/prueflink/an            schmuggelt einen Prüflink in seite (die Seite darf ihn nie zeigen)
//   GET  /__test/zaehler                 { session, werkzeug, letzteWerkzeuge: [{ name, karteOk }] }

import crypto from 'node:crypto';
import http from 'node:http';

const PORT = Number(process.env.ANTRAG_GESPRAECH_MOCK_PORT || 8793);
const ERLAUBT = new Set((process.env.ANTRAG_GESPRAECH_MOCK_HERKUNFT || 'http://localhost:3019,http://127.0.0.1:3019').split(',').map((e) => e.trim()).filter(Boolean));
const SCHLUESSEL = crypto.randomBytes(32);
const MINUTEN = Number(process.env.ANTRAG_GESPRAECH_MOCK_MINUTEN || 20);
const STUFEN = { AP5: 14.75, AP7: 22.45, AP9: 40.61, AP1: 47.03 };
const ANSAGE = {
  AP5: 'vierzehn Euro fünfundsiebzig', AP7: 'zweiundzwanzig Euro fünfundvierzig', AP9: 'vierzig Euro einundsechzig', AP1: 'siebenundvierzig Euro drei',
};
const SDP_ANTWORT = [
  'v=0', 'o=- 4611731400430051336 2 IN IP4 127.0.0.1', 's=-', 't=0 0', 'a=group:BUNDLE 0 1', 'a=msid-semantic: WMS',
  'm=audio 9 UDP/TLS/RTP/SAVPF 111', 'c=IN IP4 0.0.0.0', 'a=rtcp:9 IN IP4 0.0.0.0', 'a=ice-ufrag:nach', 'a=ice-pwd:nachbaunachbaunachbaunach',
  'a=fingerprint:sha-256 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF',
  'a=setup:active', 'a=mid:0', 'a=sendrecv', 'a=rtcp-mux', 'a=rtpmap:111 opus/48000/2',
  'm=application 9 UDP/DTLS/SCTP webrtc-datachannel', 'c=IN IP4 0.0.0.0', 'a=ice-ufrag:nach', 'a=ice-pwd:nachbaunachbaunachbaunach',
  'a=setup:active', 'a=mid:1', 'a=sctp-port:5000', '',
].join('\r\n');

let zustand;
function zuruecksetzen() {
  zustand = {
    sessionFehler: process.env.ANTRAG_GESPRAECH_MOCK_FEHLER || null, mail: 'verschickt', pruefLink: false, verzoegerung: 0,
    zaehler: { session: 0, werkzeug: 0 }, letzteWerkzeuge: [], karten: new Map(),
  };
}
zuruecksetzen();

// Karte wie im Vertrag: base64url(Sitzung).Ablauf.HMAC-SHA256 hex über "Sitzung.Ablauf"
const hmac = (text) => crypto.createHmac('sha256', SCHLUESSEL).update(text).digest('hex');
function neueKarte() {
  const sitzung = `sess_${crypto.randomBytes(8).toString('hex')}`;
  const ablauf = Math.floor(Date.now() / 1000) + (MINUTEN + 2) * 60;
  return `${Buffer.from(sitzung).toString('base64url')}.${ablauf}.${hmac(`${sitzung}.${ablauf}`)}`;
}
function pruefeKarte(karte) {
  const teile = typeof karte === 'string' ? karte.split('.') : [];
  if (teile.length !== 3) return null;
  let sitzung;
  try { sitzung = Buffer.from(teile[0], 'base64url').toString('utf8'); } catch { return null; }
  const soll = Buffer.from(hmac(`${sitzung}.${teile[1]}`));
  const ist = Buffer.from(teile[2]);
  if (soll.length !== ist.length || !crypto.timingSafeEqual(soll, ist)) return null;
  if (Number(teile[1]) < Date.now() / 1000) return null;
  return sitzung;
}

function cors(req, res) {
  const herkunft = req.headers.origin;
  if (!herkunft) return true;
  if (!ERLAUBT.has(herkunft)) return false;
  res.setHeader('Access-Control-Allow-Origin', herkunft);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Expose-Headers', 'X-Antrag-Karte, X-Antrag-Minuten');
  return true;
}
function json(res, status, daten) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(daten));
}
function lies(req) {
  return new Promise((fertig, fehler) => {
    let text = '';
    req.setEncoding('utf8');
    req.on('data', (stueck) => { text += stueck; if (text.length > 32_768) { fehler(new Error('zu_gross')); req.destroy(); } });
    req.on('end', () => fertig(text));
    req.on('error', fehler);
  });
}

const PFLICHT = ['tarif_code', 'beginn', 'anrede', 'vorname', 'nachname', 'geburtsdatum', 'strasse_hausnummer', 'plz', 'ort', 'telefon', 'email'];
function werkzeug(name, args, sitzung) {
  if (name === 'antrag_beitrag_berechnen') {
    const code = STUFEN[args.tarif_code] ? args.tarif_code : null;
    if (!code || !/^\d{2}\.\d{2}\.\d{4}$/.test(String(args.geburtsdatum || ''))) {
      return { ok: false, name, modell: { ok: false, fehler: 'antrag_angaben_ungueltig' }, seite: {} };
    }
    const seite = { tarifCode: code, beitrag: STUFEN[code], zuschlagProzent: 20, beginnText: '1. Dezember 2026', bestaetigt: true };
    return {
      ok: true, name, modell: { ok: true, ansage: `${ANSAGE[code]} im Monat, darin zwanzig Prozent Zuschlag`, alleStufenAnsage: ANSAGE, beginnText: seite.beginnText, zuschlagProzent: 20, gruende: ['Atemwege und Allergien'], bestaetigt: true }, seite,
    };
  }
  const felder = PFLICHT.filter((feld) => !String(args[feld] ?? '').trim());
  if (args.gesetzlich_versichert !== true) felder.push('gkv');
  if (felder.length) return { ok: false, name, modell: { ok: false, fehler: 'antrag_angaben_ungueltig', felder }, seite: {} };
  const kennung = `HA-261110-${sitzung.slice(-4).toUpperCase()}`;
  const seite = { kennung, mail: zustand.mail, beitrag: STUFEN[args.tarif_code] || 47.03, tarifCode: args.tarif_code };
  if (zustand.pruefLink) seite.pruefLink = 'https://healio.de/antrag/pruefen#nachbau-darf-nie-erscheinen';
  return { ok: true, name, modell: { ok: true, kennung, mail: zustand.mail, beitrag: seite.beitrag }, seite };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pfad = url.pathname;
  try {
    if (pfad.startsWith('/__test/')) {
      if (req.method === 'GET' && pfad === '/__test/zaehler') return json(res, 200, { ...zustand.zaehler, letzteWerkzeuge: zustand.letzteWerkzeuge });
      if (req.method !== 'POST') return json(res, 405, { fehler: 'methode' });
      if (pfad === '/__test/zuruecksetzen') { zuruecksetzen(); zustand.sessionFehler = null; return json(res, 200, { ok: true }); }
      let treffer = /^\/__test\/session-fehler\/(429|429-ip|503|404|aus)$/.exec(pfad);
      if (treffer) { zustand.sessionFehler = treffer[1] === 'aus' ? null : treffer[1]; return json(res, 200, { ok: true }); }
      treffer = /^\/__test\/mail\/(verschickt|test_verschickt|schon_verschickt|fehler|datei|aus)$/.exec(pfad);
      if (treffer) { zustand.mail = treffer[1]; return json(res, 200, { ok: true }); }
      treffer = /^\/__test\/verzoegerung\/(\d{1,5})$/.exec(pfad);
      if (treffer) { zustand.verzoegerung = Math.min(Number(treffer[1]), 30_000); return json(res, 200, { ok: true }); }
      if (pfad === '/__test/prueflink/an') { zustand.pruefLink = true; return json(res, 200, { ok: true }); }
      return json(res, 404, { fehler: 'unbekannt' });
    }
    if (pfad === '/gesund') return json(res, 200, { ok: true, dienst: 'antrag-gespraech-mock' });
    if (!['/nita/antrag/session', '/nita/antrag/werkzeug'].includes(pfad)) return json(res, 404, { fehler: 'nicht_gefunden' });
    if (!cors(req, res)) return json(res, 403, { fehler: 'hd_herkunft' });
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
    if (req.method !== 'POST') return json(res, 405, { fehler: 'methode' });

    if (pfad === '/nita/antrag/session') {
      zustand.zaehler.session += 1;
      await lies(req);
      if (!/^application\/sdp/i.test(req.headers['content-type'] || '')) return json(res, 415, { fehler: 'hd_sdp_fehlt' });
      if (zustand.verzoegerung) await new Promise((fertig) => { setTimeout(fertig, zustand.verzoegerung); });
      const fehler = zustand.sessionFehler;
      if (fehler === '429') return json(res, 429, { fehler: 'hd_tagesgrenze' });
      if (fehler === '429-ip') return json(res, 429, { fehler: 'hd_zu_oft' });
      if (fehler === '503') return json(res, 503, { fehler: 'hd_antrag_nicht_eingerichtet' });
      if (fehler === '404') return json(res, 404, { fehler: 'hd_antrag_aus' });
      const karte = neueKarte();
      res.writeHead(201, {
        'Content-Type': 'application/sdp', 'Cache-Control': 'no-store', 'X-Antrag-Karte': karte, 'X-Antrag-Minuten': String(MINUTEN),
      });
      return res.end(SDP_ANTWORT);
    }

    // /nita/antrag/werkzeug
    zustand.zaehler.werkzeug += 1;
    let anfrage;
    try { anfrage = JSON.parse(await lies(req)); } catch { return json(res, 400, { fehler: 'hd_werkzeug_angaben_ungueltig' }); }
    const sitzung = pruefeKarte(anfrage && anfrage.karte);
    zustand.letzteWerkzeuge.push({ name: anfrage && anfrage.name, karteOk: Boolean(sitzung) });
    if (!sitzung) return json(res, 401, { fehler: 'hd_karte_ungueltig' });
    if (!['antrag_beitrag_berechnen', 'antrag_festhalten'].includes(anfrage.name) || typeof anfrage.arguments !== 'string') {
      return json(res, 400, { fehler: 'hd_werkzeug_angaben_ungueltig' });
    }
    let args;
    try { args = JSON.parse(anfrage.arguments); } catch { return json(res, 400, { fehler: 'hd_werkzeug_angaben_ungueltig' }); }
    if (!args || typeof args !== 'object' || Array.isArray(args)) return json(res, 400, { fehler: 'hd_werkzeug_angaben_ungueltig' });
    const zaehler = zustand.karten.get(sitzung) || { antrag_beitrag_berechnen: 0, antrag_festhalten: 0 };
    zaehler[anfrage.name] += 1;
    zustand.karten.set(sitzung, zaehler);
    if (zaehler.antrag_beitrag_berechnen > 15 || zaehler.antrag_festhalten > 3) return json(res, 429, { fehler: 'hd_werkzeug_grenze' });
    return json(res, 200, werkzeug(anfrage.name, args, sitzung));
  } catch {
    return json(res, 500, { fehler: 'intern' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`Nachbau Antragsgespräch auf http://127.0.0.1:${PORT}/nita/antrag\n`);
});
