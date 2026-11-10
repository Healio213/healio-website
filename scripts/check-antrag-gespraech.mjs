// Prüfung der Gesprächslogik für /antrag/aufnehmen (src/lib/nitaAntragGespraech.js), ohne Browser.
// Aufruf: node --test scripts/check-antrag-gespraech.mjs
// Reine Hilfen direkt, dazu ein ganzes Gespräch mit Attrappen für Mikrofon, WebRTC, fetch und Uhr.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  BEGRUESSUNG_REGEL, BEGRUESSUNG_START, STANDARD_MINUTEN, WECK_HINWEIS,
  formatBeitrag, formatUhr, istAudioSdp, karteAusKopf, mailZustand, minutenAusKopf, sammleWerkzeugEreignis,
  sitzungsFehler, starteAntragGespraech, stilleEntscheidung, werteWerkzeugAntwort,
} from '../src/lib/nitaAntragGespraech.js';

const KARTE = `${Buffer.from('sitzung_test').toString('base64url')}.1893456000.${'a'.repeat(64)}`;
const SDP = 'v=0\r\no=- 1 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n';

test('Werkzeugaufrufe je Rückfrage sammeln', () => {
  const speicher = new Map();
  const ev = (event, id = 'd1') => ({ type: 'response.event', delegation_id: id, event });
  assert.equal(sammleWerkzeugEreignis(speicher, ev({ type: 'response.created' })), null);
  const aufruf = (callId, name = 'antrag_beitrag_berechnen') => ev({ type: 'response.output_item.done', item: { type: 'function_call', call_id: callId, name, arguments: '{"tarif_code":"AP1"}' } });
  sammleWerkzeugEreignis(speicher, aufruf('c1'));
  sammleWerkzeugEreignis(speicher, aufruf('c1'));
  sammleWerkzeugEreignis(speicher, aufruf('c2', 'antrag_festhalten'));
  sammleWerkzeugEreignis(speicher, ev({ type: 'response.output_item.done', item: { type: 'message' } }));
  // andere Rückfrage bleibt getrennt
  sammleWerkzeugEreignis(speicher, ev({ type: 'response.created' }, 'd2'));
  sammleWerkzeugEreignis(speicher, ev({ type: 'response.output_item.done', item: { type: 'function_call', call_id: 'x9', name: 'antrag_beitrag_berechnen' } }, 'd2'));
  const fertig = sammleWerkzeugEreignis(speicher, ev({ type: 'response.completed' }));
  assert.deepEqual(fertig, [
    { callId: 'c1', name: 'antrag_beitrag_berechnen', args: '{"tarif_code":"AP1"}' },
    { callId: 'c2', name: 'antrag_festhalten', args: '{"tarif_code":"AP1"}' },
  ]);
  assert.equal(speicher.has('d1'), false);
  assert.deepEqual(sammleWerkzeugEreignis(speicher, ev({ type: 'response.completed' }, 'd2')), [{ callId: 'x9', name: 'antrag_beitrag_berechnen', args: '{}' }]);
  // ohne Aufrufe nichts
  sammleWerkzeugEreignis(speicher, ev({ type: 'response.created' }, 'd3'));
  assert.equal(sammleWerkzeugEreignis(speicher, ev({ type: 'response.completed' }, 'd3')), null);
  // höchstens vier je Rückfrage, kaputte Ereignisse still ignoriert
  for (let i = 0; i < 6; i += 1) sammleWerkzeugEreignis(speicher, aufruf(`v${i}`));
  assert.equal(sammleWerkzeugEreignis(speicher, ev({ type: 'response.completed' })).length, 4);
  assert.equal(sammleWerkzeugEreignis(speicher, null), null);
  assert.equal(sammleWerkzeugEreignis(speicher, { type: 'response.event', delegation_id: 5, event: {} }), null);
});

test('Stillewächter entscheidet aus Zeitstempeln', () => {
  const basis = { laeuft: true, offeneArbeit: false, letzteEingabe: 0, letzteAusgabe: 1000, letzteArbeit: 0, letzterBeitrag: 'Wie ist dein Geburtsdatum?', geweckt: 0 };
  // Person hat zuletzt gesprochen: nach 9 s wecken
  const person = { ...basis, letzteEingabe: 2000 };
  assert.equal(stilleEntscheidung(person, 2000 + 8999), false);
  assert.equal(stilleEntscheidung(person, 2000 + 9000), true);
  // Nita hat eine Frage gestellt: nicht wecken, die Person ist dran
  assert.equal(stilleEntscheidung(basis, 1000 + 60_000), false);
  // Nita mittendrin ohne Frage: nach 10 s
  const mittendrin = { ...basis, letzterBeitrag: 'Ich halte das jetzt fest' };
  assert.equal(stilleEntscheidung(mittendrin, 1000 + 9999), false);
  assert.equal(stilleEntscheidung(mittendrin, 1000 + 10_000), true);
  // Abschied: nie
  assert.equal(stilleEntscheidung({ ...basis, letzterBeitrag: 'Danke dir, tschüss' }, 1000 + 60_000), false);
  // nie während der Hintergrund arbeitet, höchstens zweimal, erst nachdem Nita sprach, nur im laufenden Gespräch
  assert.equal(stilleEntscheidung({ ...person, offeneArbeit: true }, 60_000), false);
  assert.equal(stilleEntscheidung({ ...person, geweckt: 1 }, 60_000), true);
  assert.equal(stilleEntscheidung({ ...person, geweckt: 2 }, 60_000), false);
  assert.equal(stilleEntscheidung({ ...person, letzteAusgabe: 0 }, 60_000), false);
  assert.equal(stilleEntscheidung({ ...person, laeuft: false }, 60_000), false);
  // jüngste Arbeit des Hintergrunds zählt als Lebenszeichen
  assert.equal(stilleEntscheidung({ ...person, letzteArbeit: 20_000 }, 28_000), false);
});

test('Köpfe, SDP und Fehler beim Aufbau', () => {
  assert.equal(minutenAusKopf('15'), 15);
  assert.equal(minutenAusKopf(null), STANDARD_MINUTEN);
  assert.equal(minutenAusKopf('0'), STANDARD_MINUTEN);
  assert.equal(minutenAusKopf('61'), STANDARD_MINUTEN);
  assert.equal(minutenAusKopf('5.5'), STANDARD_MINUTEN);
  assert.equal(karteAusKopf(KARTE), KARTE);
  assert.equal(karteAusKopf(` ${KARTE} `), KARTE);
  assert.equal(karteAusKopf('abc'), null);
  assert.equal(karteAusKopf('a.b.c'), null);
  assert.equal(karteAusKopf(null), null);
  assert.equal(istAudioSdp(SDP), true);
  assert.equal(istAudioSdp('hallo'), false);
  assert.equal(sitzungsFehler(429, { fehler: 'hd_tagesgrenze' }), 'grenze');
  assert.equal(sitzungsFehler(429, { fehler: 'hd_zu_oft' }), 'zu_oft');
  assert.equal(sitzungsFehler(429, null), 'grenze');
  assert.equal(sitzungsFehler(404, { fehler: 'hd_antrag_aus' }), 'aus');
  assert.equal(sitzungsFehler(503, { fehler: 'hd_antrag_nicht_eingerichtet' }), 'nicht_erreichbar');
  assert.equal(sitzungsFehler(403, { fehler: 'hd_herkunft' }), 'nicht_erreichbar');
  assert.equal(sitzungsFehler(500, null), 'nicht_erreichbar');
});

test('Antworten des Dienstes auswerten', () => {
  const beitrag = werteWerkzeugAntwort({ name: 'antrag_beitrag_berechnen', status: 200, daten: { ok: true, name: 'antrag_beitrag_berechnen', modell: { ok: true, ansage: 'siebenundvierzig Euro drei im Monat' }, seite: { beitrag: 47.03, zuschlagProzent: 20 } } });
  assert.deepEqual(beitrag.fuerModell, { ok: true, ansage: 'siebenundvierzig Euro drei im Monat' });
  assert.deepEqual(beitrag.ergebnis, { art: 'beitrag', beitrag: 47.03 });
  const fest = werteWerkzeugAntwort({ name: 'antrag_festhalten', status: 200, daten: { ok: true, modell: { ok: true, kennung: 'HA-1', mail: 'verschickt' }, seite: { kennung: 'HA-1', mail: 'verschickt', pruefLink: 'https://healio.de/antrag/pruefen#geheim' } } });
  assert.deepEqual(fest.ergebnis, { art: 'festgehalten', mail: 'verschickt' });
  assert.ok(!JSON.stringify(fest.ergebnis).includes('pruefen'), 'kein Prüflink an die Seite');
  const abgelehnt = werteWerkzeugAntwort({ name: 'antrag_festhalten', status: 200, daten: { ok: false, modell: { ok: false, fehler: 'antrag_angaben_ungueltig', felder: ['formular.plz'] }, seite: {} } });
  assert.deepEqual(abgelehnt.fuerModell, { ok: false, fehler: 'antrag_angaben_ungueltig', felder: ['formular.plz'] });
  assert.equal(abgelehnt.ergebnis, null);
  assert.deepEqual(werteWerkzeugAntwort({ name: 'antrag_festhalten', status: 401, daten: { fehler: 'hd_karte_ungueltig' } }), { fuerModell: { ok: false, fehler: 'hd_karte_ungueltig' }, ergebnis: null });
  assert.deepEqual(werteWerkzeugAntwort({ name: 'antrag_festhalten', status: 429, daten: { fehler: '<b>frei erfunden</b>' } }).fuerModell, { ok: false, fehler: 'nicht_moeglich' });
  assert.deepEqual(werteWerkzeugAntwort({ name: 'antrag_festhalten', netzfehler: true }).fuerModell, { ok: false, fehler: 'nicht_erreichbar' });
  assert.equal(werteWerkzeugAntwort({ name: 'antrag_beitrag_berechnen', status: 200, daten: { modell: { ok: true }, seite: { beitrag: 'viel' } } }).ergebnis, null);
  assert.equal(mailZustand('verschickt'), 'unterwegs');
  assert.equal(mailZustand('test_verschickt'), 'unterwegs');
  assert.equal(mailZustand('schon_verschickt'), 'unterwegs');
  assert.equal(mailZustand('fehler'), 'fehler');
  assert.equal(mailZustand('datei'), 'test');
  assert.equal(mailZustand('aus'), 'test');
  assert.equal(formatUhr(0), '00:00');
  assert.equal(formatUhr(605), '10:05');
  assert.equal(formatBeitrag(47.03), '47,03');
});

// ---- Ganzes Gespräch mit Attrappen ------------------------------------------------------------------------
function attrappen({ sitzung = { status: 201, karte: KARTE, minuten: '1' }, mikrofon = true, werkzeug } = {}) {
  let jetzt = 1_000_000;
  const zeitgeber = [];
  const stelle = (fn, ms, wiederholt) => { const eintrag = { fn, faellig: jetzt + ms, ms, wiederholt, aktiv: true }; zeitgeber.push(eintrag); return eintrag; };
  const weg = (eintrag) => { if (eintrag) eintrag.aktiv = false; };
  async function vor(ms) {
    const ziel = jetzt + ms;
    for (;;) {
      const naechster = zeitgeber.filter((z) => z.aktiv && z.faellig <= ziel).sort((a, b) => a.faellig - b.faellig)[0];
      if (!naechster) break;
      jetzt = naechster.faellig;
      if (naechster.wiederholt) naechster.faellig += naechster.ms; else naechster.aktiv = false;
      naechster.fn();
      await new Promise((fertig) => { setImmediate(fertig); });
    }
    jetzt = ziel;
  }
  const gesendet = [];
  const anfragen = [];
  const spuren = [{ gestoppt: false, stop() { this.gestoppt = true; } }];
  let pcGeschlossen = false;
  const kanal = { readyState: 'connecting', send: (text) => gesendet.push(JSON.parse(text)), onmessage: null, onopen: null };
  class FakePc {
    constructor() { this.iceGatheringState = 'complete'; this.connectionState = 'new'; this.localDescription = null; }
    addTrack() {}
    createDataChannel(name) { assert.equal(name, 'oai-events'); return kanal; }
    async createOffer() { return { type: 'offer', sdp: SDP }; }
    async setLocalDescription(d) { this.localDescription = d; }
    async setRemoteDescription(d) { assert.equal(d.type, 'answer'); kanal.readyState = 'open'; kanal.onopen && kanal.onopen(); }
    close() { pcGeschlossen = true; }
  }
  const antwortWerkzeug = werkzeug || ((anfrage) => {
    const name = anfrage.name;
    if (name === 'antrag_beitrag_berechnen') return { status: 200, json: { ok: true, name, modell: { ok: true, ansage: 'siebenundvierzig Euro drei' }, seite: { beitrag: 47.03 } } };
    return { status: 200, json: { ok: true, name, modell: { ok: true, kennung: 'HA-261110-TEST', mail: 'verschickt' }, seite: { kennung: 'HA-261110-TEST', mail: 'verschickt' } } };
  });
  const fetch = async (url, init) => {
    anfragen.push({ url, init });
    if (url.endsWith('/session')) {
      assert.equal(init.headers['Content-Type'], 'application/sdp');
      assert.equal(init.credentials, 'omit');
      const kopf = { 'x-antrag-karte': sitzung.karte, 'x-antrag-minuten': sitzung.minuten };
      return {
        ok: sitzung.status >= 200 && sitzung.status < 300,
        status: sitzung.status,
        headers: { get: (n) => kopf[n.toLowerCase()] ?? null },
        text: async () => SDP,
        json: async () => sitzung.json || {},
      };
    }
    const body = JSON.parse(init.body);
    const { status, json } = antwortWerkzeug(body);
    return { ok: status === 200, status, json: async () => json };
  };
  const umgebung = {
    navigator: { mediaDevices: { getUserMedia: async () => { if (!mikrofon) throw new Error('NotAllowedError'); return { getTracks: () => spuren }; } } },
    RTCPeerConnection: FakePc,
    Audio: class { pause() {} play() { return Promise.resolve(); } },
    AbortController,
    fetch,
    setTimeout: (fn, ms) => stelle(fn, ms, false),
    clearTimeout: weg,
    setInterval: (fn, ms) => stelle(fn, ms, true),
    clearInterval: weg,
    jetzt: () => jetzt,
    kennung: (() => { let n = 0; return () => `k${(n += 1)}`; })(),
    fenster: null,
  };
  const schicke = (daten) => kanal.onmessage({ data: JSON.stringify(daten) });
  return {
    umgebung, vor, gesendet, anfragen, schicke, spuren, istGeschlossen: () => pcGeschlossen,
  };
}

const warte = () => new Promise((fertig) => { setImmediate(fertig); });
async function bisPhase(zustaende, phase) {
  for (let i = 0; i < 50 && !zustaende.some((z) => z.phase === phase); i += 1) await warte();
  assert.ok(zustaende.some((z) => z.phase === phase), `Phase ${phase} erwartet, war ${zustaende.map((z) => z.phase).join(',')}`);
}

test('Ganzes Gespräch: Begrüßung, Beitrag, Festhalten, Stillewächter, Beenden', async () => {
  const a = attrappen();
  const zustaende = []; const ergebnisse = [];
  const gespraech = starteAntragGespraech({ api: 'https://dienst.test/nita/antrag/', aufZustand: (z) => zustaende.push(z), aufErgebnis: (e) => ergebnisse.push(e), umgebung: a.umgebung });
  await bisPhase(zustaende, 'gespraech');
  assert.deepEqual(zustaende.slice(0, 2).map((z) => z.phase), ['mikrofon', 'verbinden']);
  assert.equal(a.anfragen[0].url, 'https://dienst.test/nita/antrag/session');
  assert.equal(zustaende.at(-1).minuten, 1);
  assert.equal(zustaende.at(-1).verbunden, false);

  // Begrüßung: session.started, dann instructions.append; Bestätigung führt zu commentary.append
  a.schicke({ type: 'session.started', session: { id: 'sess_1' } });
  assert.equal(zustaende.at(-1).verbunden, true);
  const regel = a.gesendet.find((b) => b.type === 'session.instructions.append');
  assert.equal(regel.content, BEGRUESSUNG_REGEL);
  a.schicke({ type: 'session.instructions.appended', client_event_id: regel.event_id });
  assert.equal(a.gesendet.filter((b) => b.type === 'session.commentary.append' && b.content === BEGRUESSUNG_START).length, 1);
  await a.vor(3000); // Rückfälle greifen kein zweites Mal
  assert.equal(a.gesendet.filter((b) => b.type === 'session.instructions.append').length, 1);
  assert.equal(a.gesendet.filter((b) => b.content === BEGRUESSUNG_START).length, 1);

  // Beitrag rechnen
  const rueckfrage = (id, aufrufe) => {
    a.schicke({ type: 'response.event', delegation_id: id, event: { type: 'response.created' } });
    aufrufe.forEach(([callId, name, args]) => a.schicke({ type: 'response.event', delegation_id: id, event: { type: 'response.output_item.done', item: { type: 'function_call', call_id: callId, name, arguments: args } } }));
    a.schicke({ type: 'response.event', delegation_id: id, event: { type: 'response.completed' } });
  };
  rueckfrage('d1', [['c1', 'antrag_beitrag_berechnen', '{"tarif_code":"AP1","geburtsdatum":"05.03.1990"}']]);
  for (let i = 0; i < 10; i += 1) await warte();
  const werkzeugAnfrage = a.anfragen.find((x) => x.url.endsWith('/werkzeug'));
  assert.deepEqual(JSON.parse(werkzeugAnfrage.init.body), { karte: KARTE, name: 'antrag_beitrag_berechnen', arguments: '{"tarif_code":"AP1","geburtsdatum":"05.03.1990"}' });
  const ausgabe = a.gesendet.find((b) => b.type === 'response.item.create');
  assert.equal(ausgabe.item.call_id, 'c1');
  assert.deepEqual(JSON.parse(ausgabe.item.output), { ok: true, ansage: 'siebenundvierzig Euro drei' });
  assert.equal(a.gesendet.at(-1).type, 'response.create');
  assert.deepEqual(ergebnisse, [{ art: 'beitrag', beitrag: 47.03 }]);

  // Stillewächter: Nita sagt etwas ohne Frage, dann Stille: nach 10 s ein Hinweis, höchstens zweimal
  a.schicke({ type: 'session.output_transcript.delta', delta: 'Einen Moment, ich halte das fest' });
  await a.vor(10_500);
  assert.equal(a.gesendet.filter((b) => b.content === WECK_HINWEIS).length, 1);
  await a.vor(25_000);
  assert.equal(a.gesendet.filter((b) => b.content === WECK_HINWEIS).length, 2);

  // Festhalten (unbekanntes Werkzeug bekommt nur einen festen Code)
  rueckfrage('d2', [['c2', 'antrag_festhalten', '{"vorname":"Lena"}'], ['c3', 'fremd', '{}']]);
  for (let i = 0; i < 10; i += 1) await warte();
  assert.deepEqual(ergebnisse.at(-1), { art: 'festgehalten', mail: 'verschickt' });
  const fremd = a.gesendet.find((b) => b.type === 'response.item.create' && b.item.call_id === 'c3');
  assert.deepEqual(JSON.parse(fremd.item.output), { ok: false, fehler: 'werkzeug_unbekannt' });
  assert.equal(a.anfragen.filter((x) => x.url.endsWith('/werkzeug')).length, 2);

  // Uhr läuft weiter
  assert.match(String(zustaende.filter((z) => z.phase === 'gespraech').at(-1).sekunden), /^\d+$/);

  // Beenden: session.close, Mikrofon sofort aus, nach session.closed abgebaut
  gespraech.beenden();
  assert.equal(a.gesendet.at(-1).type, 'session.close');
  assert.equal(zustaende.at(-1).phase, 'beendet');
  assert.equal(zustaende.at(-1).grund, 'selbst');
  assert.equal(a.spuren[0].gestoppt, true);
  a.schicke({ type: 'session.closed' });
  assert.equal(a.istGeschlossen(), true);
  gespraech.beenden();
  assert.equal(zustaende.filter((z) => z.phase === 'beendet').length, 1);
});

test('Höchstdauer aus X-Antrag-Minuten beendet das Gespräch', async () => {
  const a = attrappen({ sitzung: { status: 201, karte: KARTE, minuten: '1' } });
  const zustaende = [];
  starteAntragGespraech({ api: 'https://dienst.test/nita/antrag', aufZustand: (z) => zustaende.push(z), umgebung: a.umgebung });
  await bisPhase(zustaende, 'gespraech');
  await a.vor(59_000);
  assert.equal(zustaende.at(-1).phase, 'gespraech');
  await a.vor(1500);
  assert.equal(zustaende.at(-1).phase, 'beendet');
  assert.equal(zustaende.at(-1).grund, 'zeit');
  assert.equal(a.gesendet.at(-1).type, 'session.close');
  await a.vor(15_000);
  assert.equal(a.istGeschlossen(), true);
});

test('Fehler beim Aufbau: kein Mikrofon, 429, 503, fehlende Karte', async () => {
  const fall = async (optionen, erwartet) => {
    const a = attrappen(optionen);
    const zustaende = [];
    starteAntragGespraech({ api: 'https://dienst.test/nita/antrag', aufZustand: (z) => zustaende.push(z), umgebung: a.umgebung });
    await bisPhase(zustaende, 'fehler');
    assert.equal(zustaende.at(-1).grund, erwartet);
    assert.equal(a.spuren[0].gestoppt || optionen.mikrofon === false, true, 'Mikrofon wieder aus');
    return a;
  };
  const ohne = await fall({ mikrofon: false }, 'mikrofon');
  assert.equal(ohne.anfragen.length, 0, 'ohne Mikrofon keine Anfrage an den Dienst');
  await fall({ sitzung: { status: 429, json: { fehler: 'hd_tagesgrenze' } } }, 'grenze');
  await fall({ sitzung: { status: 429, json: { fehler: 'hd_zu_oft' } } }, 'zu_oft');
  await fall({ sitzung: { status: 503, json: { fehler: 'hd_antrag_nicht_eingerichtet' } } }, 'nicht_erreichbar');
  await fall({ sitzung: { status: 404, json: { fehler: 'hd_antrag_aus' } } }, 'aus');
  await fall({ sitzung: { status: 201, karte: null, minuten: '20' } }, 'nicht_erreichbar');
  const zustaende = [];
  starteAntragGespraech({ api: 'x', aufZustand: (z) => zustaende.push(z), umgebung: { navigator: {}, RTCPeerConnection: undefined } });
  assert.deepEqual(zustaende, [{ phase: 'fehler', grund: 'technik' }]);
});

test('Ende durch Nita (session.closed)', async () => {
  const a = attrappen();
  const zustaende = [];
  starteAntragGespraech({ api: 'https://dienst.test/nita/antrag', aufZustand: (z) => zustaende.push(z), umgebung: a.umgebung });
  await bisPhase(zustaende, 'gespraech');
  a.schicke({ type: 'session.closed' });
  assert.deepEqual(zustaende.at(-1), { phase: 'beendet', grund: 'aufgelegt' });
  assert.equal(a.istGeschlossen(), true);
});

test('Keine Konsole, kein Speicher im Browser', async () => {
  const quelle = await import('node:fs').then((fs) => fs.readFileSync(new URL('../src/lib/nitaAntragGespraech.js', import.meta.url), 'utf8'));
  const code = quelle.split('\n').filter((zeile) => !zeile.trim().startsWith('//')).join('\n');
  assert.doesNotMatch(code, /console\.|localStorage|sessionStorage|indexedDB|document\.cookie/);
  assert.doesNotMatch(code, /pruefLink/);
});
