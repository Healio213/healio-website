import { HEALIO_VOICE_CONTACT_ENABLED, HEALIO_WHATSAPP_URL } from '@/config/contactChannels';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronRight, Mic, PhoneOff, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getConsentState, hasConsent, openConsentSettings, subscribeConsent, updateConsentPurpose } from '@/lib/consent';
import { trackEvent } from '@/lib/analytics';

// WhatsApp-Zeichen wie auf kassenboost.de, damit beide Seiten gleich aussehen.
const WHATSAPP_PATH = 'M26.6 5.3A14.8 14.8 0 0 0 3.3 23.1L2 30l7.1-1.9A14.8 14.8 0 1 0 26.6 5.3Zm-10.7 22A12.2 12.2 0 0 1 9.7 25.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A12.2 12.2 0 1 1 15.9 27.3Zm6.7-8.9c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.7-.2-1 .2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-2.3-1.1-3.8-2-5.3-4.6-.4-.6.4-.6 1.1-2 .1-.3.1-.6 0-.8l-1.3-3c-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.9 0 2.3 1.7 4.6 1.9 4.9.2.3 3.3 5 8 7 .7.3 1.3.5 1.8.6.8.3 1.5.2 2.1.1.6-.1 2.4-1 2.7-1.9.3-1 .3-1.8.2-2-.1-.2-.4-.3-.8-.5Z';

export const NITA_CONSENT_REQUEST_EVENT = 'healio:nita-consent-request';

// Seit 04.11.2026 läuft Nita in HD über GPT-Live (Dienst natascha-hd hinter voice-pilot.healio.de). Gespräche dürfen bis 6 Minuten
// dauern; der Dienst legt nach 7 Minuten zusätzlich selbst auf.
const NITA_SESSION_HARD_STOP_MS = 360_000;
const NITA_SILENCE_STOP_MS = 30_000;
// Kontaktleiste: klein am rechten Rand, fährt nach ein paar Sekunden aus; eingeklappt bleibt sie für die Sitzung am Rand.
const NITA_DOCK_AUTO_OPEN_MS = 4_000;
const NITA_DOCK_STORAGE_KEY = 'healio-nita-leiste';
// Am Handy fährt die Leiste nicht von selbst aus (Frank 04.11.2026); stattdessen fragt einmal je Sitzung ein kleines Fenster neben der Kugel.
const NITA_TEASER_DELAY_MS = 5_000;
const NITA_TEASER_HIDE_MS = 15_000;
const NITA_TEASER_STORAGE_KEY = 'healio-nita-hinweis';
const NITA_MOBILE_QUERY = '(max-width: 767px)';
const NITA_SESSION_ENDPOINT = 'https://voice-pilot.healio.de/nita/realtime/session';
const HEALIO_PAGE_ORIGINS = new Set(['https://healio.de', 'https://www.healio.de']);

const getSessionEndpoint = () => {
  if (typeof window === 'undefined') return null;
  try {
    if (!HEALIO_PAGE_ORIGINS.has(window.location.origin)) return null;
    const endpoint = new URL(NITA_SESSION_ENDPOINT);
    if (
      endpoint.protocol !== 'https:'
      || endpoint.origin !== 'https://voice-pilot.healio.de'
      || endpoint.pathname !== '/nita/realtime/session'
      || endpoint.search
      || endpoint.hash
    ) return null;
    return endpoint.toString();
  } catch {
    return null;
  }
};

const newEventId = (prefix) => `${prefix}_${(window.crypto?.randomUUID?.() ?? `${Date.now()}${Math.random().toString(16).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, '')}`;

const isAudioSdp = (value) => typeof value === 'string'
  && value.trimStart().startsWith('v=0')
  && /^m=audio\s+\d+\s+\S+\s+.+\r?$/m.test(value)
  && /^a=fingerprint:sha-256\s+[A-Fa-f0-9:]{11,}\r?$/m.test(value);

const COPY = {
  de: {
    launcher: 'Sprachpanel mit Nita öffnen', dock: 'Nita anrufen', dockSub: 'KI-Assistentin, erklärt dir alles', dockSubShort: 'KI-Assistentin', teaser: 'Soll ich dir das Konzept kurz erklären?', teaserCta: 'Ja, Nita anrufen', teaserClose: 'Hinweis schließen', expand: 'Kontaktleiste von Nita ausklappen', collapse: 'Kontaktleiste einklappen', whatsapp: 'WhatsApp-Chat mit Healio öffnen (neuer Tab)', panel: 'Sprachpanel von Nita', title: 'Nita, die digitale Assistenz von Healio',
    text: 'Du entscheidest selbst, ob du die Sprachverbindung starten möchtest. Bitte teile keine sensiblen Gesundheitsdaten mit.',
    consentText: 'Für die Sprachverbindung werden Audiodaten an OpenAI übertragen. Die Verbindung startet erst nach deiner ausdrücklichen Freigabe.',
    allow: 'Sprachverbindung erlauben', start: 'Sprachverbindung starten', end: 'Gespräch beenden', close: 'Sprachpanel schließen',
    settings: 'Datenschutz-Einstellungen', privacy: 'Datenschutzerklärung', connecting: 'Nita wird verbunden …', connected: 'Nita hört zu.',
    unavailable: 'Die Sprachverbindung wird gerade vorbereitet.', error: 'Die Sprachverbindung konnte nicht gestartet werden.', retry: 'Erneut versuchen', restart: 'Neues Gespräch starten',
    endedLimit: 'Das Gespräch wurde nach 6 Minuten automatisch beendet.',
    endedSilence: 'Das Gespräch wurde wegen längerer Stille automatisch beendet.',
    endedRemote: 'Das Gespräch wurde beendet.',
  },
  en: {
    launcher: 'Open Nita voice panel', dock: 'Call Nita', dockSub: 'AI assistant, explains everything', dockSubShort: 'AI assistant', teaser: 'Shall I explain how it works?', teaserCta: 'Yes, call Nita', teaserClose: 'Close hint', expand: 'Expand Nita contact bar', collapse: 'Collapse contact bar', whatsapp: 'Open WhatsApp chat with Healio (new tab)', panel: 'Nita voice panel', title: 'Nita, Healio’s digital assistant',
    text: 'You decide whether to start the voice connection. Please do not share sensitive health data.',
    consentText: 'Audio data is transferred to OpenAI for the voice connection. The connection starts only after your explicit approval.',
    allow: 'Allow voice connection', start: 'Start voice connection', end: 'End conversation', close: 'Close voice panel',
    settings: 'Privacy settings', privacy: 'Privacy policy', connecting: 'Connecting Nita …', connected: 'Nita is listening.',
    unavailable: 'The voice connection is being prepared.', error: 'The voice connection could not be started.', retry: 'Try again', restart: 'Start a new conversation',
    endedLimit: 'The conversation ended automatically after 6 minutes.',
    endedSilence: 'The conversation ended automatically after a longer silence.',
    endedRemote: 'The conversation has ended.',
  },
};

export const requestNitaConsent = (entryPoint = 'delayed_prompt') => {
  if (!HEALIO_VOICE_CONTACT_ENABLED || typeof window === 'undefined') return false;
  window.dispatchEvent(new CustomEvent(NITA_CONSENT_REQUEST_EVENT, { detail: { entryPoint } }));
  return true;
};

const ActiveNitaConsentWidget = ({ whatsapp = false, mobileHidden = false }) => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(() => getConsentState());
  const [panelOpen, setPanelOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [connectionEndReason, setConnectionEndReason] = useState(null);
  const peerConnectionRef = useRef(null);
  const eventChannelRef = useRef(null);
  const microphoneStreamRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const fetchAbortControllerRef = useRef(null);
  const hardStopTimerRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const connectionAttemptRef = useRef(0);
  const greetingSentRef = useRef(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  useEffect(() => {
    const read = (key) => { try { return window.sessionStorage.getItem(key); } catch { return null; } };
    const isMobile = window.matchMedia?.(NITA_MOBILE_QUERY).matches ?? false;
    if (!isMobile) {
      if (read(NITA_DOCK_STORAGE_KEY) === 'zu') return undefined;
      const timer = window.setTimeout(() => setDockOpen(true), NITA_DOCK_AUTO_OPEN_MS);
      return () => window.clearTimeout(timer);
    }
    if (mobileHidden || read(NITA_TEASER_STORAGE_KEY) === 'gesehen') return undefined;
    let hideTimer;
    const showTimer = window.setTimeout(() => {
      setTeaserVisible(true);
      try { window.sessionStorage.setItem(NITA_TEASER_STORAGE_KEY, 'gesehen'); } catch { /* dann eben bei jedem Laden */ }
      hideTimer = window.setTimeout(() => setTeaserVisible(false), NITA_TEASER_HIDE_MS);
    }, NITA_TEASER_DELAY_MS);
    return () => { window.clearTimeout(showTimer); window.clearTimeout(hideTimer); };
  }, [mobileHidden]);
  const openFromTeaser = () => { setTeaserVisible(false); setPanelOpen(true); };
  const collapseDock = () => {
    setDockOpen(false);
    setTeaserVisible(false);
    try { window.sessionStorage.setItem(NITA_DOCK_STORAGE_KEY, 'zu'); } catch { /* bleibt nur bis zum Neuladen eingeklappt */ }
  };
  const closeButtonRef = useRef(null);
  const launcherRef = useRef(null);
  const language = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
  const copy = COPY[language];
  const isDentalCheckRoute = pathname === '/zahn' || pathname === '/en/dental';
  const providerAllowed = hasConsent('openai', consent);
  const sessionEndpoint = getSessionEndpoint();

  const clearConnectionTimers = useCallback(() => {
    if (hardStopTimerRef.current !== null) window.clearTimeout(hardStopTimerRef.current);
    if (silenceTimerRef.current !== null) window.clearTimeout(silenceTimerRef.current);
    hardStopTimerRef.current = null;
    silenceTimerRef.current = null;
  }, []);

  const stopConnection = useCallback((nextStatus = 'idle', nextEndReason = null) => {
    connectionAttemptRef.current += 1;
    clearConnectionTimers();
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = null;

    const eventChannel = eventChannelRef.current;
    eventChannelRef.current = null;
    if (eventChannel) {
      if (eventChannel.readyState === 'open') {
        try { eventChannel.send(JSON.stringify({ type: 'session.close' })); } catch { /* Verbindung wird ohnehin geschlossen */ }
      }
      eventChannel.onopen = null;
      eventChannel.onmessage = null;
      eventChannel.onerror = null;
      eventChannel.onclose = null;
      if (eventChannel.readyState !== 'closed') eventChannel.close();
    }

    const peerConnection = peerConnectionRef.current;
    peerConnectionRef.current = null;
    if (peerConnection) {
      peerConnection.ontrack = null;
      peerConnection.onconnectionstatechange = null;
      peerConnection.close();
    }
    microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
    microphoneStreamRef.current = null;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    greetingSentRef.current = false;
    setConnectionStatus(nextStatus);
    setConnectionEndReason(nextEndReason);
  }, [clearConnectionTimers]);

  const closePanel = () => {
    stopConnection();
    setPanelOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  };

  useEffect(() => subscribeConsent((nextConsent) => {
    setConsent(nextConsent);
    if (!hasConsent('openai', nextConsent)) stopConnection();
  }), [stopConnection]);
  useEffect(() => () => stopConnection(), [stopConnection]);
  useEffect(() => {
    const handleNitaRequest = () => {
      setPanelOpen(true);
    };
    window.addEventListener(NITA_CONSENT_REQUEST_EVENT, handleNitaRequest);
    return () => window.removeEventListener(NITA_CONSENT_REQUEST_EVENT, handleNitaRequest);
  }, [pathname]);
  useEffect(() => {
    if (!panelOpen) return undefined;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event) => { if (event.key === 'Escape') { event.preventDefault(); closePanel(); } };
    document.addEventListener('keydown', handleKeyDown);
    return () => { window.cancelAnimationFrame(focusFrame); document.removeEventListener('keydown', handleKeyDown); };
  }, [panelOpen]);

  const connect = async () => {
    if (!providerAllowed || !sessionEndpoint || connectionStatus === 'connecting') return;
    stopConnection();
    const attemptId = connectionAttemptRef.current;
    setConnectionStatus('connecting');
    setConnectionEndReason(null);
    hardStopTimerRef.current = window.setTimeout(() => {
      if (connectionAttemptRef.current === attemptId) stopConnection('ended', 'limit');
    }, NITA_SESSION_HARD_STOP_MS);

    const isActiveAttempt = () => connectionAttemptRef.current === attemptId;
    const clearSilenceTimer = () => {
      if (silenceTimerRef.current !== null) window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    };
    const scheduleSilenceStop = () => {
      clearSilenceTimer();
      silenceTimerRef.current = window.setTimeout(() => {
        if (isActiveAttempt()) stopConnection('ended', 'silence');
      }, NITA_SILENCE_STOP_MS);
    };

    try {
      const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!isActiveAttempt()) {
        microphoneStream.getTracks().forEach((track) => track.stop());
        return;
      }
      microphoneStreamRef.current = microphoneStream;
      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;
      microphoneStream.getTracks().forEach((track) => peerConnection.addTrack(track, microphoneStream));
      peerConnection.ontrack = (event) => {
        if (!remoteAudioRef.current) return;
        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.play().catch(() => {});
      };
      peerConnection.onconnectionstatechange = () => {
        if (!isActiveAttempt() || peerConnectionRef.current !== peerConnection) return;
        if (peerConnection.connectionState === 'connected') setConnectionStatus('connected');
        if (peerConnection.connectionState === 'failed') stopConnection('error');
        if (peerConnection.connectionState === 'closed') stopConnection('ended', 'remote');
      };

      const eventChannel = peerConnection.createDataChannel('oai-events');
      eventChannelRef.current = eventChannel;
      // GPT-Live: Nita meldet sich zuerst. Nach session.started legt die Seite das fest (instructions.append) und stößt nach der
      // Bestätigung den ersten Beitrag an (commentary.append), wie src/live/browser-call.ts im Telefonagenten-Projekt.
      const sendCommand = (command) => {
        try { if (eventChannel.readyState === 'open') eventChannel.send(JSON.stringify(command)); } catch { /* Stille-Stopp greift */ }
      };
      let greetingEventId = null;
      let greetingSpoken = false;
      const speakGreeting = () => {
        if (!isActiveAttempt() || greetingSpoken) return;
        greetingSpoken = true;
        sendCommand({ type: 'session.commentary.append', event_id: newEventId('begin'), delegation_id: null, content: 'Beginne jetzt das Gespräch nach den Vorgaben.' });
      };
      const requestGreeting = () => {
        if (!isActiveAttempt() || greetingSentRef.current || eventChannel.readyState !== 'open') return;
        greetingSentRef.current = true;
        greetingEventId = newEventId('greeting');
        sendCommand({
          type: 'session.instructions.append', event_id: greetingEventId, delegation_id: null,
          content: 'Der Anruf ist jetzt angenommen. Du meldest dich zuerst, mit der Begrüßung aus deinem Leitfaden, und wartest nicht auf die Person.',
        });
        window.setTimeout(speakGreeting, 2000);
      };
      eventChannel.onopen = () => { window.setTimeout(requestGreeting, 3000); };
      eventChannel.onmessage = (event) => {
        if (!isActiveAttempt() || typeof event.data !== 'string') return;
        let serverEvent;
        try {
          serverEvent = JSON.parse(event.data);
        } catch {
          return;
        }
        if (serverEvent?.type === 'session.started') requestGreeting();
        if (serverEvent?.type === 'session.instructions.appended' && greetingEventId && serverEvent.client_event_id === greetingEventId) speakGreeting();
        if (serverEvent?.type === 'session.input_transcript.delta' || serverEvent?.type === 'session.output_transcript.delta') scheduleSilenceStop();
        if (serverEvent?.type === 'input_audio_buffer.speech_started') clearSilenceTimer();
        if (serverEvent?.type === 'response.done') {
          if (serverEvent.response?.status === 'failed') stopConnection('error');
          else scheduleSilenceStop();
        }
        // GPT-Live meldet auch behebbare Fehler als error. Sie beenden das Gespräch nicht; hängt es wirklich, greift der Stille-Stopp.
      };
      eventChannel.onerror = () => {
        if (isActiveAttempt()) stopConnection('error');
      };
      eventChannel.onclose = () => {
        if (isActiveAttempt()) stopConnection('ended', 'remote');
      };
      const offer = await peerConnection.createOffer();
      if (!isActiveAttempt()) return;
      await peerConnection.setLocalDescription(offer);
      if (!isActiveAttempt()) return;
      if (!isAudioSdp(offer.sdp)) throw new Error('Nita-Angebot ist ungültig');
      const fetchAbortController = new AbortController();
      fetchAbortControllerRef.current = fetchAbortController;
      const response = await fetch(sessionEndpoint, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-store',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/sdp', Accept: 'application/sdp' },
        body: offer.sdp,
        signal: fetchAbortController.signal,
      });
      fetchAbortControllerRef.current = null;
      if (!isActiveAttempt()) return;
      if (
        !response.ok
        || !/^application\/sdp(?:\s*;|$)/i.test(response.headers.get('content-type') || '')
      ) throw new Error('Nita-Session konnte nicht erstellt werden');
      const answerSdp = await response.text();
      if (!isActiveAttempt()) return;
      if (!isAudioSdp(answerSdp)) throw new Error('Nita-Session liefert keine gültige SDP-Antwort');
      await peerConnection.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      scheduleSilenceStop();
    } catch {
      if (isActiveAttempt()) stopConnection('error');
    }
  };

  const handleLauncherClick = () => {
    if (panelOpen) { closePanel(); return; }
    setPanelOpen(true);
  };

  return (
    <>
      <style>{`
        /* Kontaktleiste im Stil des früheren ElevenLabs-Widgets (Frank 04.11.2026): klein in der Mitte des rechten Randes, fährt nach
           ein paar Sekunden aus (Nita-Kugel, dunkler Knopf „Mit Nita sprechen“, WhatsApp) und lässt sich mit dem Pfeil wieder an den
           Rand schieben. Eingeklappt bleibt sie für die Sitzung am Rand. */
        .healio-nita-surface { position: fixed; z-index: 90; transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease; }
        .healio-nita-dock { right: 0; top: 50%; transform: translateY(-50%); display: flex; align-items: center; padding: .375rem .3rem .375rem .4rem; border: 1px solid rgba(11,31,58,.08); border-right: 0; border-radius: 999px 0 0 999px; background: #fff; box-shadow: 0 16px 40px rgba(7,17,31,.16), 0 2px 6px rgba(7,17,31,.06); font-family: Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif; }
        .healio-nita-dock-main { display: inline-flex; align-items: center; border: 0; padding: 0; background: transparent; color: inherit; cursor: pointer; border-radius: 999px; }
        .healio-nita-dock-main:focus-visible, .healio-nita-dock-whatsapp:focus-visible, .healio-nita-dock-zu:focus-visible { outline: 2px solid #076046; outline-offset: 3px; }
        .healio-nita-orb-shell { position: relative; display: inline-flex; width: 2.75rem; height: 2.75rem; flex: 0 0 2.75rem; overflow: hidden; border: 1px solid rgba(94,224,177,.74); border-radius: 999px; background: radial-gradient(circle at 28% 24%,rgba(255,255,255,.96) 0 5%,rgba(255,255,255,.32) 14%,transparent 29%),radial-gradient(circle at 69% 74%,rgba(94,224,177,.98) 0 8%,rgba(37,201,144,.72) 34%,transparent 55%),conic-gradient(from 214deg,#07111f,#25c990,#effdf4,#076046,#07111f,#5ee0b1,#07111f); box-shadow: 0 0 0 4px rgba(37,201,144,.1),inset -6px -8px 14px rgba(7,17,31,.38),inset 6px 6px 12px rgba(239,253,244,.4); isolation: isolate; animation: healio-nita-orb-breathe 4.8s ease-in-out infinite; transition: transform 180ms ease; }
        .healio-nita-orb-shell::before { content: ''; position: absolute; inset: -28%; border-radius: inherit; pointer-events: none; background: conic-gradient(from 30deg,transparent 0 16%,rgba(255,255,255,.68) 24%,transparent 36% 60%,rgba(94,224,177,.5) 72%,transparent 84%); mix-blend-mode: screen; animation: healio-nita-orb-flow 8s linear infinite; }
        .healio-nita-dock-main:hover .healio-nita-orb-shell { transform: scale(1.05); }
        .healio-nita-dock-cta, .healio-nita-dock-whatsapp, .healio-nita-dock-zu { max-width: 0; opacity: 0; overflow: hidden; margin-left: 0; transition: max-width 340ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease, margin 340ms cubic-bezier(.2,.8,.2,1), padding 340ms cubic-bezier(.2,.8,.2,1), background 160ms ease; }
        .healio-nita-dock-cta { display: inline-flex; align-items: center; gap: .5rem; height: 2.75rem; padding: 0; border-radius: 999px; background: #0b1f3a; color: #fff; white-space: nowrap; }
        .healio-nita-dock-text { display: inline-flex; flex-direction: column; align-items: flex-start; line-height: 1.1; }
        .healio-nita-dock-label { font-size: .875rem; font-weight: 700; letter-spacing: -.005em; }
        .healio-nita-dock-sub { margin-top: .15rem; font-size: .6875rem; font-weight: 500; color: rgba(255,255,255,.72); }
        .healio-nita-dock-main:hover .healio-nita-dock-cta { background: #13305a; }
        .healio-nita-dock-cta svg { width: 1rem; height: 1rem; flex: 0 0 1rem; color: #5ee0b1; }
        .healio-nita-dock-short { display: none; }
        .healio-nita-teaser { right: 4.1rem; top: 50%; transform: translateY(-50%); width: min(15.5rem, calc(100vw - 5.5rem)); padding: .85rem 2.25rem .85rem .95rem; border: 1px solid rgba(11,31,58,.08); border-radius: 1.1rem; background: #fff; box-shadow: 0 16px 40px rgba(7,17,31,.18), 0 2px 6px rgba(7,17,31,.06); font-family: Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif; animation: healio-nita-teaser-in 260ms cubic-bezier(.2,.8,.2,1); }
        .healio-nita-teaser::after { content: ''; position: absolute; right: -.45rem; top: 50%; width: .9rem; height: .9rem; background: #fff; border-top: 1px solid rgba(11,31,58,.08); border-right: 1px solid rgba(11,31,58,.08); transform: translateY(-50%) rotate(45deg); }
        .healio-nita-teaser-text { margin: 0 0 .6rem; color: #0b1f3a; font-size: .875rem; font-weight: 700; line-height: 1.3; }
        .healio-nita-teaser-cta { display: inline-flex; align-items: center; gap: .4rem; height: 2.25rem; padding: 0 .9rem; border: 0; border-radius: 999px; background: #0b1f3a; color: #fff; font: inherit; font-size: .8125rem; font-weight: 700; cursor: pointer; }
        .healio-nita-teaser-cta svg { width: .95rem; height: .95rem; color: #5ee0b1; }
        .healio-nita-teaser-close { position: absolute; top: .4rem; right: .4rem; display: inline-flex; width: 1.75rem; height: 1.75rem; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: transparent; color: rgba(11,31,58,.5); cursor: pointer; }
        .healio-nita-teaser-close svg { width: .95rem; height: .95rem; }
        .healio-nita-teaser-cta:focus-visible, .healio-nita-teaser-close:focus-visible { outline: 2px solid #076046; outline-offset: 2px; }
        @keyframes healio-nita-teaser-in { from { opacity: 0; transform: translate(.5rem, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
        .healio-nita-dock-whatsapp { display: inline-flex; height: 2.5rem; flex: 0 0 auto; align-items: center; justify-content: center; border-radius: 999px; background: #effdf4; color: #128c4a; }
        .healio-nita-dock-whatsapp:hover { background: #dcfce7; }
        .healio-nita-dock-whatsapp svg { width: 1.25rem; height: 1.25rem; flex: 0 0 1.25rem; fill: currentColor; }
        .healio-nita-dock-zu { display: inline-flex; height: 2rem; flex: 0 0 auto; align-items: center; justify-content: center; border: 0; padding: 0; border-radius: 999px; background: transparent; color: rgba(11,31,58,.55); cursor: pointer; }
        .healio-nita-dock-zu:hover { background: #f1f5f9; color: #0b1f3a; }
        .healio-nita-dock-zu svg { width: 1.1rem; height: 1.1rem; flex: 0 0 1.1rem; }
        .healio-nita-dock.is-open .healio-nita-dock-cta { max-width: 16rem; opacity: 1; margin-left: .5rem; padding: 0 1.1rem 0 .95rem; }
        .healio-nita-dock.is-open .healio-nita-dock-whatsapp { max-width: 2.5rem; width: 2.5rem; opacity: 1; margin-left: .375rem; }
        .healio-nita-dock.is-open .healio-nita-dock-zu { max-width: 2rem; width: 2rem; opacity: 1; margin-left: .25rem; }
        .healio-nita-panel { right: max(1.25rem, env(safe-area-inset-right)); top: 50%; transform: translateY(-50%); max-height: calc(100dvh - 2rem); overflow-y: auto; }
        @keyframes healio-nita-orb-breathe { 0%,100% { filter: saturate(.98) brightness(1); } 50% { filter: saturate(1.1) brightness(1.06); } } @keyframes healio-nita-orb-flow { to { transform: rotate(360deg); } }
        html.healio-consent-ui-active .healio-nita-surface,html.healio-nita-teaser-active .healio-nita-surface,html.healio-mobile-menu-active .healio-nita-surface { opacity: 0; pointer-events: none; visibility: hidden; transform: translateY(calc(-50% + .5rem)); }
        @media (max-width:767px) {
          .healio-nita-orb-shell { width: 2.4rem; height: 2.4rem; flex-basis: 2.4rem; }
          .healio-nita-dock-cta { height: 2.5rem; }
          .healio-nita-dock-label { font-size: .8125rem; }
          .healio-nita-dock.is-open .healio-nita-dock-cta { padding: 0 .9rem 0 .75rem; }
          .healio-nita-dock-long { display: none; }
          .healio-nita-dock-short { display: inline; }
          .healio-nita-dock-whatsapp { height: 2.25rem; }
          .healio-nita-dock.is-open .healio-nita-dock-whatsapp { max-width: 2.25rem; width: 2.25rem; }
          .healio-nita-dock--desktop-only { display: none; }
          .healio-nita-panel { right: .75rem; }
        }
        @media (prefers-reduced-motion:reduce) { .healio-nita-teaser { animation: none; } .healio-nita-orb-shell,.healio-nita-orb-shell::before { animation: none; transition: none; } .healio-nita-surface, .healio-nita-dock-cta, .healio-nita-dock-whatsapp, .healio-nita-dock-zu { transition: none; } }
        @media print { .healio-nita-surface { display: none !important; } }
      `}</style>
      {!panelOpen && (
        <div className={`healio-nita-surface healio-nita-dock${dockOpen ? ' is-open' : ''}${mobileHidden ? ' healio-nita-dock--desktop-only' : ''}`} data-healio-nita="dock">
          <button ref={launcherRef} type="button" onClick={dockOpen ? handleLauncherClick : () => { setTeaserVisible(false); setDockOpen(true); }} className="healio-nita-dock-main" data-healio-nita="launcher" aria-label={dockOpen ? copy.launcher : copy.expand} title={dockOpen ? copy.launcher : copy.expand} aria-controls="healio-nita-panel" aria-expanded={false}>
            <span className="healio-nita-orb-shell" aria-hidden="true" />
            <span className="healio-nita-dock-cta" aria-hidden="true"><Mic /><span className="healio-nita-dock-text"><span className="healio-nita-dock-label">{copy.dock}</span><span className="healio-nita-dock-sub healio-nita-dock-long">{copy.dockSub}</span><span className="healio-nita-dock-sub healio-nita-dock-short">{copy.dockSubShort}</span></span></span>
          </button>
          {whatsapp && (
            <a href={HEALIO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="healio-nita-dock-whatsapp" data-healio-whatsapp="floating" aria-label={copy.whatsapp} title={copy.whatsapp}
              tabIndex={dockOpen ? 0 : -1} aria-hidden={!dockOpen}
              onClick={() => trackEvent('whatsapp_contact_click', { component: 'whatsapp', destination: 'whatsapp', placement: 'floating' })}>
              <svg aria-hidden="true" viewBox="0 0 32 32"><path d={WHATSAPP_PATH} /></svg>
            </a>
          )}
          <button type="button" className="healio-nita-dock-zu" onClick={collapseDock} aria-label={copy.collapse} title={copy.collapse} tabIndex={dockOpen ? 0 : -1} aria-hidden={!dockOpen}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
      {teaserVisible && !dockOpen && !panelOpen && (
        <div className={`healio-nita-surface healio-nita-teaser${mobileHidden ? ' healio-nita-dock--desktop-only' : ''}`} role="note" aria-label={copy.title}>
          <p className="healio-nita-teaser-text">{copy.teaser}</p>
          <button type="button" className="healio-nita-teaser-cta" onClick={openFromTeaser}><Mic aria-hidden="true" />{copy.teaserCta}</button>
          <button type="button" className="healio-nita-teaser-close" onClick={() => setTeaserVisible(false)} aria-label={copy.teaserClose} title={copy.teaserClose}><X aria-hidden="true" /></button>
        </div>
      )}
      {panelOpen && (
        <section id="healio-nita-panel" className="healio-nita-surface healio-nita-panel w-[min(calc(100vw-1.5rem),23rem)] rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_18px_55px_rgba(15,23,42,0.25)]" role="dialog" aria-modal="false" aria-label={copy.panel}>
          <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h2 className="font-extrabold text-slate-950">{copy.title}</h2></div><button ref={closeButtonRef} type="button" onClick={closePanel} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900" aria-label={copy.close}><X className="h-5 w-5" aria-hidden="true" /></button></div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{copy.text}</p>
          {!providerAllowed && <><p className="mt-3 text-sm leading-6 text-slate-600">{copy.consentText}</p><button type="button" onClick={() => updateConsentPurpose('openai', true, 'provider')} className="mt-5 min-h-11 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">{copy.allow}</button>{!isDentalCheckRoute && <button type="button" onClick={() => openConsentSettings('openai')} className="mt-3 min-h-11 w-full text-sm font-semibold text-slate-600 underline underline-offset-2">{copy.settings}</button>}</>}
          {providerAllowed && !sessionEndpoint && <p className="mt-4 text-sm font-semibold text-slate-700" role="status">{copy.unavailable}</p>}
          {connectionStatus === 'ended' && <p className="mt-4 text-sm font-semibold text-slate-700" role="status">{connectionEndReason === 'limit' ? copy.endedLimit : connectionEndReason === 'silence' ? copy.endedSilence : copy.endedRemote}</p>}
          {providerAllowed && sessionEndpoint && connectionStatus !== 'connected' && <button type="button" onClick={connect} disabled={connectionStatus === 'connecting'} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"><Mic className="h-4 w-4" aria-hidden="true" />{connectionStatus === 'connecting' ? copy.connecting : connectionStatus === 'error' ? copy.retry : connectionStatus === 'ended' ? copy.restart : copy.start}</button>}
          {connectionStatus === 'connected' && <><p className="mt-4 text-sm font-semibold text-emerald-700" role="status">{copy.connected}</p><button type="button" onClick={closePanel} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"><PhoneOff className="h-4 w-4" aria-hidden="true" />{copy.end}</button></>}
          <a href={language === 'en' ? '/en/privacy' : '/datenschutz'} className="mt-4 inline-block text-sm font-semibold text-slate-700 underline underline-offset-2">{copy.privacy}</a>
        </section>
      )}
      <audio ref={remoteAudioRef} autoPlay className="hidden" />
    </>
  );
};

// Der Ratgeber ist bezahlter Einstieg und fuehrt ausschliesslich zum
// KassenBoost-Check. Eine schwebende Chat-Blase wuerde dort vom einzigen
// gewollten Weg ablenken, deshalb bleibt Nita auf /ratgeber und allen
// Unterseiten komplett ungerendert.
const NITA_HIDDEN_ROUTE_PREFIXES = Object.freeze(['/ratgeber']);

export const isNitaHiddenRoute = (pathname = '/') => {
  const normalized = (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';
  return NITA_HIDDEN_ROUTE_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
};

export const NitaConsentWidget = ({ whatsapp = false, mobileHidden = false }) => {
  const { pathname } = useLocation();
  if (!HEALIO_VOICE_CONTACT_ENABLED || isNitaHiddenRoute(pathname)) return null;
  return <ActiveNitaConsentWidget whatsapp={whatsapp} mobileHidden={mobileHidden} />;
};
export default NitaConsentWidget;
