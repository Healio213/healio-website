// Antragsgespräch mit Nita auf healio.de/antrag/aufnehmen (10.11.2026, SCHNITTSTELLE.md Abschnitt 11).
// Gesprächslogik ohne React, damit sie mit node --test prüfbar ist (scripts/check-antrag-gespraech.mjs).
// Vorlage ist die bewährte Testseite des HD-Dienstes (deploy/natascha-hd-20261104/seite/seite.js):
// Mikrofon, WebRTC mit Datenkanal oai-events, Begrüßung anstoßen, Werkzeugaufrufe je Rückfrage sammeln und
// an POST <api>/werkzeug geben (mit der Karte aus X-Antrag-Karte), Stillewächter, Uhr und Höchstdauer
// (X-Antrag-Minuten), session.close beim Beenden.
//
// Datenschutz: keine Mitschrift, nichts in localStorage oder sessionStorage, keine Ausgabe in der Konsole.
// Der Stillewächter hält nur das Ende des letzten Satzes von Nita im Speicher (höchstens 600 Zeichen), damit er
// eine offene Frage erkennt; er verschwindet mit dem Gespräch. Ein Prüflink geht nie an die Seite.

export const ANTRAG_WERKZEUGE = Object.freeze(['antrag_beitrag_berechnen', 'antrag_festhalten']);
export const STANDARD_MINUTEN = 20;
export const STILLE_NACH_PERSON_MS = 9000;
export const STILLE_NITA_MITTENDRIN_MS = 10_000;
export const HOECHSTENS_WECKEN = 2;
export const HOECHSTENS_AUFRUFE_JE_RUECKFRAGE = 4;
const ABSCHIED = /tschüss|auf wiederhören|schönen tag/i;

export const WECK_HINWEIS = 'Die Person wartet auf dich. Mach jetzt mit dem offenen Schritt weiter. Wolltest du etwas rechnen oder festhalten, frag jetzt deinen Hintergrund.';
export const BEGRUESSUNG_REGEL = 'Der Anruf ist jetzt angenommen. Du meldest dich zuerst, mit der Begrüßung aus deinem Leitfaden, und wartest nicht auf die Person.';
export const BEGRUESSUNG_START = 'Beginne jetzt das Gespräch nach den Vorgaben.';

// ---- Reine Hilfen ---------------------------------------------------------------------------------------

// Sammelt Werkzeugaufrufe je Rückfrage des Hintergrunds (delegation_id). Gibt bei response.completed die
// gesammelten Aufrufe zurück (sonst null). speicher ist eine Map, die über das Gespräch lebt.
export function sammleWerkzeugEreignis(speicher, daten) {
  if (!daten || typeof daten !== 'object') return null;
  const id = daten.delegation_id;
  const ev = daten.event;
  if (typeof id !== 'string' || !ev || typeof ev !== 'object') return null;
  if (ev.type === 'response.created') { speicher.set(id, []); return null; }
  if (ev.type === 'response.output_item.done' && ev.item && ev.item.type === 'function_call' && typeof ev.item.call_id === 'string') {
    if (!speicher.has(id)) speicher.set(id, []);
    const liste = speicher.get(id);
    if (liste.length < HOECHSTENS_AUFRUFE_JE_RUECKFRAGE && !liste.some((a) => a.callId === ev.item.call_id)) {
      liste.push({ callId: ev.item.call_id, name: String(ev.item.name), args: typeof ev.item.arguments === 'string' ? ev.item.arguments : '{}' });
    }
    return null;
  }
  if (ev.type === 'response.completed') {
    const liste = speicher.get(id) || [];
    speicher.delete(id);
    return liste.length ? liste : null;
  }
  return null;
}

// Entscheidung des Stillewächters aus Zeitstempeln (Millisekunden). true heißt: Nita jetzt kurz wecken.
// Nie während der Hintergrund arbeitet, höchstens zweimal je Stille, erst nachdem Nita etwas gesagt hat.
export function stilleEntscheidung(z, jetzt) {
  if (!z || !z.laeuft || z.offeneArbeit || !z.letzteAusgabe || z.geweckt >= HOECHSTENS_WECKEN) return false;
  const still = jetzt - Math.max(z.letzteEingabe || 0, z.letzteAusgabe || 0, z.letzteArbeit || 0);
  const personZuletzt = (z.letzteEingabe || 0) > z.letzteAusgabe;
  const beitrag = String(z.letzterBeitrag || '').trim();
  const nitaMittendrin = !personZuletzt && !/\?\s*$/.test(beitrag) && !ABSCHIED.test(beitrag);
  return (personZuletzt && still >= STILLE_NACH_PERSON_MS) || (nitaMittendrin && still >= STILLE_NITA_MITTENDRIN_MS);
}

// Kopf X-Antrag-Minuten: ganze Zahl von 1 bis 60, sonst der Standard.
export function minutenAusKopf(wert) {
  const text = String(wert ?? '').trim();
  if (!/^\d{1,2}$/.test(text)) return STANDARD_MINUTEN;
  const n = Number(text);
  return n >= 1 && n <= 60 ? n : STANDARD_MINUTEN;
}

// Kopf X-Antrag-Karte: <base64url>.<Unix-Sekunden>.<HMAC hex>. Alles andere gilt als fehlend.
export function karteAusKopf(wert) {
  const text = String(wert ?? '').trim();
  return /^[A-Za-z0-9_-]{1,240}\.\d{1,12}\.[0-9a-f]{16,128}$/.test(text) ? text : null;
}

export const istAudioSdp = (sdp) => typeof sdp === 'string' && sdp.length < 100_000 && /^v=0/.test(sdp) && /\nm=audio /.test(sdp);

// Fehler beim Aufbau (POST <api>/session) als Grund für die Seite.
export function sitzungsFehler(status, daten) {
  const code = daten && typeof daten.fehler === 'string' ? daten.fehler : '';
  if (code === 'hd_tagesgrenze') return 'grenze';
  if (code === 'hd_zu_oft') return 'zu_oft';
  if (status === 429) return 'grenze';
  if (code === 'hd_antrag_aus' || status === 404) return 'aus';
  return 'nicht_erreichbar';
}

const festerCode = (wert, ersatz) => (typeof wert === 'string' && /^[a-z0-9_]{1,60}$/.test(wert) ? wert : ersatz);

// Antwort des Dienstes auf POST <api>/werkzeug auswerten.
// fuerModell geht als function_call_output an das Modell (bei 200 unverändert das Feld modell, sonst nur ein fester Code).
// ergebnis ist das, was die Seite zeigen darf: Beitrag oder Festhalten mit Mailstatus, nie ein Prüflink.
export function werteWerkzeugAntwort({ name, status = 0, daten = null, netzfehler = false }) {
  if (netzfehler) return { fuerModell: { ok: false, fehler: 'nicht_erreichbar' }, ergebnis: null };
  if (status < 200 || status >= 300) {
    return { fuerModell: { ok: false, fehler: festerCode(daten && daten.fehler, 'nicht_moeglich') }, ergebnis: null };
  }
  const modell = daten && daten.modell && typeof daten.modell === 'object' ? daten.modell : null;
  if (!modell) return { fuerModell: { ok: false, fehler: 'nicht_moeglich' }, ergebnis: null };
  const seite = daten.seite && typeof daten.seite === 'object' ? daten.seite : {};
  let ergebnis = null;
  if (modell.ok === true && name === 'antrag_beitrag_berechnen' && Number.isFinite(seite.beitrag) && seite.beitrag > 0 && seite.beitrag < 1000) {
    ergebnis = { art: 'beitrag', beitrag: Math.round(seite.beitrag * 100) / 100 };
  }
  if (modell.ok === true && name === 'antrag_festhalten') {
    ergebnis = { art: 'festgehalten', mail: festerCode(seite.mail ?? modell.mail, 'unbekannt') };
  }
  return { fuerModell: modell, ergebnis };
}

// Was die Seite nach dem Festhalten sagt: unterwegs (Mail raus), fehler (Mail ging nicht raus), test (datei oder aus).
export function mailZustand(mail) {
  if (['verschickt', 'test_verschickt', 'schon_verschickt'].includes(mail)) return 'unterwegs';
  if (mail === 'fehler') return 'fehler';
  if (mail === 'datei' || mail === 'aus') return 'test';
  return 'festgehalten';
}

const zweistellig = (n) => String(n).padStart(2, '0');
export function formatUhr(sekunden) {
  const s = Math.max(0, Math.floor(Number(sekunden) || 0));
  return `${zweistellig(Math.floor(s / 60))}:${zweistellig(s % 60)}`;
}

export const formatBeitrag = (betrag) => Number(betrag).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---- Gespräch ------------------------------------------------------------------------------------------

function standardUmgebung() {
  const g = typeof globalThis !== 'undefined' ? globalThis : {};
  return {
    navigator: g.navigator,
    RTCPeerConnection: g.RTCPeerConnection,
    Audio: g.Audio,
    AbortController: g.AbortController,
    fetch: g.fetch ? g.fetch.bind(g) : null,
    setTimeout: g.setTimeout.bind(g),
    clearTimeout: g.clearTimeout.bind(g),
    setInterval: g.setInterval.bind(g),
    clearInterval: g.clearInterval.bind(g),
    jetzt: () => Date.now(),
    kennung: () => (g.crypto && g.crypto.randomUUID ? g.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`),
    fenster: typeof window !== 'undefined' ? window : null,
  };
}

function warteAufKandidaten(verbindung, ms, u) {
  if (!verbindung.addEventListener || verbindung.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise((fertig) => {
    let frist = null;
    const pruefe = () => { if (verbindung.iceGatheringState === 'complete') ende(); };
    const ende = () => { verbindung.removeEventListener('icegatheringstatechange', pruefe); u.clearTimeout(frist); fertig(); };
    verbindung.addEventListener('icegatheringstatechange', pruefe);
    frist = u.setTimeout(ende, ms);
  });
}

// Startet das Gespräch. aufZustand bekommt { phase, ... }:
//   mikrofon (Browser fragt), verbinden, gespraech { sekunden, minuten, verbunden },
//   fehler { grund: mikrofon | technik | grenze | zu_oft | aus | nicht_erreichbar },
//   beendet { grund: selbst | zeit | getrennt | aufgelegt }.
// aufErgebnis bekommt { art: 'beitrag', beitrag } oder { art: 'festgehalten', mail }.
// Rückgabe: { beenden() }.
export function starteAntragGespraech({
  api, aufZustand = () => {}, aufErgebnis = () => {}, umgebung = {},
}) {
  const u = { ...standardUmgebung(), ...umgebung };
  const basis = String(api || '').replace(/\/+$/, '');
  const speicher = new Map();
  const still = {
    laeuft: false, offeneArbeit: false, letzteEingabe: 0, letzteAusgabe: 0, letzteArbeit: 0, letzterBeitrag: '', geweckt: 0,
  };
  let phase = 'start';
  let vorbei = false;
  let verbunden = false;
  let pc = null; let kanal = null; let mikro = null; let ton = null; let abbruch = null;
  let karte = null; let minuten = STANDARD_MINUTEN; let beginn = 0; let sekunden = 0;
  let uhr = null; let waechter = null; let schluss = null; let ersatz = null; let anstossFrist = null;
  let angestossen = false; let gesprochen = false; let begruessungsId = null;
  let werkzeugeOffen = 0;

  const melde = (zustand) => { try { aufZustand(zustand); } catch { /* Anzeige darf das Gespräch nicht stören */ } };
  const meldeErgebnis = (ergebnis) => { try { aufErgebnis(ergebnis); } catch { /* wie oben */ } };
  const meldeGespraech = () => melde({ phase: 'gespraech', sekunden, minuten, verbunden });
  const id = (vorsilbe) => `${vorsilbe}_${u.kennung()}`;

  const sende = (befehl) => {
    try { if (kanal && kanal.readyState === 'open') { kanal.send(JSON.stringify(befehl)); return true; } } catch { /* Kanal zu */ }
    return false;
  };

  const stoppeMikro = () => { try { if (mikro) mikro.getTracks().forEach((spur) => spur.stop()); } catch { /* schon aus */ } };

  function stoppeZeitgeber() {
    u.clearInterval(uhr); u.clearInterval(waechter); u.clearTimeout(ersatz); u.clearTimeout(anstossFrist);
    uhr = waechter = ersatz = anstossFrist = null;
  }

  function abbauen() {
    stoppeZeitgeber();
    u.clearTimeout(schluss); schluss = null;
    stoppeMikro();
    try { if (pc) pc.close(); } catch { /* schon zu */ }
    try { if (ton) { ton.pause(); ton.srcObject = null; } } catch { /* schon still */ }
    if (u.fenster) u.fenster.removeEventListener('pagehide', beiSeitenwechsel);
    pc = kanal = mikro = ton = null;
    still.laeuft = false;
  }

  function scheitern(grund) {
    if (vorbei) return;
    vorbei = true; phase = 'fehler';
    abbauen();
    melde({ phase: 'fehler', grund });
  }

  function beenden(grund = 'selbst') {
    if (vorbei) return;
    vorbei = true;
    const imGespraech = phase === 'gespraech';
    phase = 'beendet';
    still.laeuft = false;
    try { if (abbruch) abbruch.abort(); } catch { /* schon fertig */ }
    stoppeZeitgeber();
    stoppeMikro();
    // Wie die Testseite: session.close schicken und auf session.closed warten, Rückfall nach 15 s.
    if (imGespraech && sende({ type: 'session.close' })) schluss = u.setTimeout(abbauen, 15_000);
    else abbauen();
    melde({ phase: 'beendet', grund });
  }

  function beiSeitenwechsel() { beenden('selbst'); }

  function pruefeStille() {
    const jetzt = u.jetzt();
    if (!stilleEntscheidung({ ...still, offeneArbeit: still.offeneArbeit || werkzeugeOffen > 0 }, jetzt)) return;
    still.geweckt += 1; still.letzteArbeit = jetzt;
    sende({ type: 'session.commentary.append', event_id: id('wecken'), delegation_id: null, content: WECK_HINWEIS });
  }

  function sprichJetzt() {
    u.clearTimeout(ersatz); ersatz = null;
    if (gesprochen || vorbei) return;
    gesprochen = true;
    sende({ type: 'session.commentary.append', event_id: id('begin'), delegation_id: null, content: BEGRUESSUNG_START });
  }

  function stosseAn() {
    if (angestossen || vorbei || !kanal || kanal.readyState !== 'open') return;
    angestossen = true;
    begruessungsId = id('greeting');
    sende({ type: 'session.instructions.append', event_id: begruessungsId, delegation_id: null, content: BEGRUESSUNG_REGEL });
    ersatz = u.setTimeout(sprichJetzt, 2000);
  }

  async function fuehreWerkzeugeAus(aufrufe) {
    werkzeugeOffen += 1;
    try {
      for (const aufruf of aufrufe) {
        let auswertung;
        if (!ANTRAG_WERKZEUGE.includes(aufruf.name)) {
          auswertung = { fuerModell: { ok: false, fehler: 'werkzeug_unbekannt' }, ergebnis: null };
        } else {
          try {
            const antwort = await u.fetch(`${basis}/werkzeug`, {
              method: 'POST',
              credentials: 'omit',
              cache: 'no-store',
              mode: 'cors',
              referrerPolicy: 'no-referrer',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ karte, name: aufruf.name, arguments: aufruf.args }),
            });
            const daten = await antwort.json().catch(() => null);
            auswertung = werteWerkzeugAntwort({ name: aufruf.name, status: antwort.status, daten });
          } catch {
            auswertung = werteWerkzeugAntwort({ name: aufruf.name, netzfehler: true });
          }
        }
        sende({
          type: 'response.item.create',
          event_id: id('result'),
          item: { type: 'function_call_output', call_id: aufruf.callId, output: JSON.stringify(auswertung.fuerModell) },
        });
        if (auswertung.ergebnis) meldeErgebnis(auswertung.ergebnis);
      }
      sende({ type: 'response.create', event_id: id('continue') });
    } finally {
      werkzeugeOffen -= 1;
      still.letzteArbeit = u.jetzt();
    }
  }

  function zeigeVerbunden() {
    if (verbunden || vorbei) return;
    verbunden = true;
    if (phase === 'gespraech') meldeGespraech();
  }

  function aufNachricht(ereignis) {
    if (vorbei && phase !== 'beendet') return;
    let daten;
    try { daten = JSON.parse(ereignis.data); } catch { return; }
    if (!daten || typeof daten !== 'object') return;
    if (daten.type === 'session.closed') {
      if (vorbei) { abbauen(); return; }
      vorbei = true; phase = 'beendet'; abbauen();
      melde({ phase: 'beendet', grund: 'aufgelegt' });
      return;
    }
    if (vorbei) return;
    if (daten.type === 'response.event') {
      // Arbeit des Hintergrunds: offen von response.created bis response.completed
      const art = daten.event && daten.event.type;
      still.letzteArbeit = u.jetzt();
      if (art === 'response.created') still.offeneArbeit = true;
      if (art === 'response.completed' || art === 'response.failed' || art === 'response.incomplete') still.offeneArbeit = false;
      const aufrufe = sammleWerkzeugEreignis(speicher, daten);
      if (aufrufe) fuehreWerkzeugeAus(aufrufe);
      return;
    }
    if (daten.type === 'session.delegation.created') { still.offeneArbeit = true; still.letzteArbeit = u.jetzt(); }
    if (daten.type === 'session.output_transcript.delta' && typeof daten.delta === 'string') {
      if (still.letzteEingabe > still.letzteAusgabe) still.letzterBeitrag = '';
      still.letzterBeitrag = (still.letzterBeitrag + daten.delta).slice(-600);
      still.letzteAusgabe = u.jetzt(); still.geweckt = 0;
      zeigeVerbunden();
    }
    if (daten.type === 'session.input_transcript.delta' && typeof daten.delta === 'string') still.letzteEingabe = u.jetzt();
    if (daten.type === 'session.started') { zeigeVerbunden(); stosseAn(); }
    if (daten.type === 'session.instructions.appended' && begruessungsId && daten.client_event_id === begruessungsId) sprichJetzt();
  }

  function tick() {
    sekunden = Math.floor((u.jetzt() - beginn) / 1000);
    if (sekunden >= minuten * 60) { beenden('zeit'); return; }
    meldeGespraech();
  }

  async function aufbauen() {
    if (!u.navigator || !u.navigator.mediaDevices || !u.navigator.mediaDevices.getUserMedia || !u.RTCPeerConnection || !u.fetch) {
      scheitern('technik'); return;
    }
    phase = 'mikrofon'; melde({ phase: 'mikrofon' });
    let strom;
    try {
      strom = await u.navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    } catch { scheitern('mikrofon'); return; }
    if (vorbei) { try { strom.getTracks().forEach((spur) => spur.stop()); } catch { /* schon aus */ } return; }
    mikro = strom;
    phase = 'verbinden'; melde({ phase: 'verbinden' });
    try {
      pc = new u.RTCPeerConnection();
      if (u.Audio) { ton = new u.Audio(); ton.autoplay = true; }
      pc.ontrack = (e) => {
        if (!ton) return;
        ton.srcObject = e.streams[0];
        const spielt = ton.play && ton.play();
        if (spielt && spielt.catch) spielt.catch(() => {});
      };
      pc.onconnectionstatechange = () => {
        if (phase === 'gespraech' && !vorbei && pc && ['failed', 'disconnected'].includes(pc.connectionState)) beenden('getrennt');
      };
      mikro.getTracks().forEach((spur) => pc.addTrack(spur, mikro));
      kanal = pc.createDataChannel('oai-events');
      kanal.onmessage = aufNachricht;
      // Rückfall, falls session.started nicht über den Kanal kommt: drei Sekunden nach dem Öffnen trotzdem anstoßen.
      kanal.onopen = () => { anstossFrist = u.setTimeout(stosseAn, 3000); };
      await pc.setLocalDescription(await pc.createOffer());
      await warteAufKandidaten(pc, 3000, u);
      if (vorbei) return;
      const sdpAngebot = pc.localDescription && pc.localDescription.sdp;
      if (!istAudioSdp(sdpAngebot)) { scheitern('technik'); return; }
      abbruch = u.AbortController ? new u.AbortController() : null;
      let antwort;
      try {
        antwort = await u.fetch(`${basis}/session`, {
          method: 'POST',
          credentials: 'omit',
          cache: 'no-store',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          headers: { 'Content-Type': 'application/sdp', Accept: 'application/sdp' },
          body: sdpAngebot,
          signal: abbruch ? abbruch.signal : undefined,
        });
      } catch { if (!vorbei) scheitern('nicht_erreichbar'); return; }
      abbruch = null;
      if (vorbei) return;
      if (!antwort.ok) {
        const daten = await antwort.json().catch(() => null);
        scheitern(sitzungsFehler(antwort.status, daten)); return;
      }
      karte = karteAusKopf(antwort.headers.get('X-Antrag-Karte'));
      minuten = minutenAusKopf(antwort.headers.get('X-Antrag-Minuten'));
      const sdpAntwort = await antwort.text();
      if (vorbei) return;
      if (!karte || !istAudioSdp(sdpAntwort)) { scheitern('nicht_erreichbar'); return; }
      await pc.setRemoteDescription({ type: 'answer', sdp: sdpAntwort });
    } catch { if (!vorbei) scheitern('nicht_erreichbar'); return; }
    if (vorbei) return;
    phase = 'gespraech';
    beginn = u.jetzt(); sekunden = 0;
    Object.assign(still, {
      laeuft: true, offeneArbeit: false, letzteEingabe: 0, letzteAusgabe: 0, letzteArbeit: 0, letzterBeitrag: '', geweckt: 0,
    });
    waechter = u.setInterval(pruefeStille, 1000);
    uhr = u.setInterval(tick, 1000);
    if (u.fenster) u.fenster.addEventListener('pagehide', beiSeitenwechsel);
    meldeGespraech();
  }

  aufbauen();
  return { beenden: () => beenden('selbst') };
}
