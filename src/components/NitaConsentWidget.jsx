import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, PhoneOff, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getConsentState, hasConsent, openConsentSettings, subscribeConsent, updateConsentPurpose } from '@/lib/consent';
import { buildNitaContext, sanitizeNitaEntryPoint } from '@/lib/nitaContext';

export const NITA_CONSENT_REQUEST_EVENT = 'healio:nita-consent-request';

const NITA_SESSION_HARD_STOP_MS = 150_000;
const NITA_SILENCE_STOP_MS = 30_000;

const getSessionEndpoint = () => {
  const configuredEndpoint = import.meta.env.VITE_NITA_WEBRTC_SESSION_ENDPOINT;
  if (typeof window === 'undefined') return null;
  try {
    const hasOverride = typeof configuredEndpoint === 'string' && configuredEndpoint.trim() !== '';
    const endpoint = new URL(hasOverride ? configuredEndpoint : '/api/nita-session', window.location.origin);
    if (endpoint.origin !== window.location.origin) return null;
    if (hasOverride && endpoint.protocol !== 'https:') return null;
    return endpoint.toString();
  } catch {
    return null;
  }
};

const COPY = {
  de: {
    launcher: 'Sprachpanel mit Nita öffnen', panel: 'Sprachpanel von Nita', title: 'Nita, die digitale Assistenz von Healio',
    text: 'Du entscheidest selbst, ob du die Sprachverbindung starten möchtest. Bitte teile keine sensiblen Gesundheitsdaten mit.',
    consentText: 'Für die Sprachverbindung werden Audiodaten an OpenAI übertragen. Die Verbindung startet erst nach deiner ausdrücklichen Freigabe.',
    allow: 'Sprachverbindung erlauben', start: 'Sprachverbindung starten', end: 'Gespräch beenden', close: 'Sprachpanel schließen',
    settings: 'Datenschutz-Einstellungen', privacy: 'Datenschutzerklärung', connecting: 'Nita wird verbunden …', connected: 'Nita hört zu.',
    unavailable: 'Die Sprachverbindung wird gerade vorbereitet.', error: 'Die Sprachverbindung konnte nicht gestartet werden.', retry: 'Erneut versuchen', restart: 'Neues Gespräch starten',
    endedLimit: 'Das Gespräch wurde nach 2:30 Minuten automatisch beendet.',
    endedSilence: 'Das Gespräch wurde wegen längerer Stille automatisch beendet.',
    endedRemote: 'Das Gespräch wurde beendet.',
  },
  en: {
    launcher: 'Open Nita voice panel', panel: 'Nita voice panel', title: 'Nita, Healio’s digital assistant',
    text: 'You decide whether to start the voice connection. Please do not share sensitive health data.',
    consentText: 'Audio data is transferred to OpenAI for the voice connection. The connection starts only after your explicit approval.',
    allow: 'Allow voice connection', start: 'Start voice connection', end: 'End conversation', close: 'Close voice panel',
    settings: 'Privacy settings', privacy: 'Privacy policy', connecting: 'Connecting Nita …', connected: 'Nita is listening.',
    unavailable: 'The voice connection is being prepared.', error: 'The voice connection could not be started.', retry: 'Try again', restart: 'Start a new conversation',
    endedLimit: 'The conversation ended automatically after 2:30 minutes.',
    endedSilence: 'The conversation ended automatically after a longer silence.',
    endedRemote: 'The conversation has ended.',
  },
};

export const requestNitaConsent = (entryPoint = 'delayed_prompt') => {
  if (typeof window === 'undefined') return false;
  window.dispatchEvent(new CustomEvent(NITA_CONSENT_REQUEST_EVENT, { detail: { entryPoint: sanitizeNitaEntryPoint(entryPoint) } }));
  return true;
};

export const NitaConsentWidget = () => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(() => getConsentState());
  const [panelOpen, setPanelOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [connectionEndReason, setConnectionEndReason] = useState(null);
  const [activeNitaContext, setActiveNitaContext] = useState(() => buildNitaContext(pathname));
  const peerConnectionRef = useRef(null);
  const eventChannelRef = useRef(null);
  const microphoneStreamRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const fetchAbortControllerRef = useRef(null);
  const hardStopTimerRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const connectionAttemptRef = useRef(0);
  const greetingSentRef = useRef(false);
  const closeButtonRef = useRef(null);
  const launcherRef = useRef(null);
  const lastContextPathRef = useRef(pathname);
  const pendingContextRef = useRef(activeNitaContext);
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
    if (lastContextPathRef.current === pathname) return;
    lastContextPathRef.current = pathname;
    const nextContext = buildNitaContext(pathname, 'global_launcher');
    pendingContextRef.current = nextContext;
    setActiveNitaContext(nextContext);
  }, [pathname]);
  useEffect(() => {
    const handleNitaRequest = (event) => {
      const requestedContext = buildNitaContext(pathname, sanitizeNitaEntryPoint(event.detail?.entryPoint));
      pendingContextRef.current = requestedContext;
      setActiveNitaContext(requestedContext);
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
      eventChannel.onopen = () => {
        if (!isActiveAttempt() || greetingSentRef.current || eventChannel.readyState !== 'open') return;
        greetingSentRef.current = true;
        eventChannel.send(JSON.stringify({ type: 'response.create' }));
      };
      eventChannel.onmessage = (event) => {
        if (!isActiveAttempt() || typeof event.data !== 'string') return;
        let serverEvent;
        try {
          serverEvent = JSON.parse(event.data);
        } catch {
          return;
        }
        if (serverEvent?.type === 'input_audio_buffer.speech_started') clearSilenceTimer();
        if (serverEvent?.type === 'response.done') {
          if (serverEvent.response?.status === 'failed') stopConnection('error');
          else scheduleSilenceStop();
        }
        if (serverEvent?.type === 'error') stopConnection('error');
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
      const fetchAbortController = new AbortController();
      fetchAbortControllerRef.current = fetchAbortController;
      const response = await fetch(sessionEndpoint, {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sdp: offer.sdp, context: pendingContextRef.current }),
        signal: fetchAbortController.signal,
      });
      fetchAbortControllerRef.current = null;
      if (!isActiveAttempt()) return;
      if (!response.ok) throw new Error('Nita-Session konnte nicht erstellt werden');
      const body = await response.json();
      if (!isActiveAttempt()) return;
      if (typeof body?.sdp !== 'string' || body.sdp.trim() === '') throw new Error('Nita-Session liefert keine SDP-Antwort');
      await peerConnection.setRemoteDescription({ type: 'answer', sdp: body.sdp });
    } catch {
      if (isActiveAttempt()) stopConnection('error');
    }
  };

  const handleLauncherClick = () => {
    if (panelOpen) { closePanel(); return; }
    const requestedContext = buildNitaContext(pathname, 'global_launcher');
    pendingContextRef.current = requestedContext;
    setActiveNitaContext(requestedContext);
    setPanelOpen(true);
  };

  return (
    <>
      <style>{`
        .healio-nita-surface { position: fixed; right: .75rem; bottom: calc(var(--healio-nita-safe-bottom, 8.5rem) + env(safe-area-inset-bottom)); z-index: 90; transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease; }
        .healio-nita-quiet-launcher { display: inline-flex; width: 3.65rem; height: 3.65rem; align-items: center; justify-content: center; border: 0; padding: 0; color: white; background: transparent; cursor: pointer; }
        .healio-nita-orb-shell { position: relative; display: inline-flex; width: 3.65rem; height: 3.65rem; flex: 0 0 3.65rem; overflow: hidden; border: 1px solid rgba(201,255,251,.74); border-radius: 999px; background: radial-gradient(circle at 28% 24%,rgba(255,255,255,.96) 0 5%,rgba(255,255,255,.32) 14%,transparent 29%),radial-gradient(circle at 69% 74%,rgba(94,238,230,.98) 0 8%,rgba(23,177,215,.72) 34%,transparent 55%),conic-gradient(from 214deg,#0b3c96,#22b9d5,#b8fff3,#1977c7,#083886,#56e6de,#0b3c96); box-shadow: 0 0 0 5px rgba(16,155,190,.08),0 12px 30px rgba(7,62,132,.26),inset -8px -10px 18px rgba(5,42,111,.38),inset 8px 8px 16px rgba(211,255,252,.4); isolation: isolate; animation: healio-nita-orb-breathe 4.8s ease-in-out infinite; transition: box-shadow 180ms ease,transform 180ms ease; }
        .healio-nita-orb-shell::before { content: ''; position: absolute; inset: -28%; border-radius: inherit; pointer-events: none; background: conic-gradient(from 30deg,transparent 0 16%,rgba(255,255,255,.68) 24%,transparent 36% 60%,rgba(83,244,226,.5) 72%,transparent 84%); mix-blend-mode: screen; animation: healio-nita-orb-flow 8s linear infinite; }
        .healio-nita-quiet-launcher:hover .healio-nita-orb-shell { transform: translateY(-1px) scale(1.02); }
        .healio-nita-quiet-launcher:focus-visible { outline: 2px solid #1d93c6; outline-offset: 4px; border-radius: 999px; }
        .healio-nita-panel { bottom: calc(var(--healio-nita-safe-bottom, 8.5rem) + 4.5rem + env(safe-area-inset-bottom)); }
        @keyframes healio-nita-orb-breathe { 0%,100% { filter: saturate(.98) brightness(1); } 50% { filter: saturate(1.1) brightness(1.06); } } @keyframes healio-nita-orb-flow { to { transform: rotate(360deg); } }
        html.healio-consent-ui-active .healio-nita-surface,html.healio-nita-teaser-active .healio-nita-surface,html.healio-mobile-menu-active .healio-nita-surface { opacity: 0; pointer-events: none; visibility: hidden; transform: translateY(.5rem); }
        @media (max-width:767px) { .healio-nita-quiet-launcher,.healio-nita-orb-shell { width: 3.4rem; height: 3.4rem; } .healio-nita-orb-shell { flex-basis: 3.4rem; } .healio-nita-panel { bottom: calc(var(--healio-nita-mobile-safe-bottom,10rem) + 4.25rem + env(safe-area-inset-bottom)); } }
        @media (prefers-reduced-motion:reduce) { .healio-nita-orb-shell,.healio-nita-orb-shell::before { animation: none; transition: none; } } @media (min-width:768px) { .healio-nita-surface { right: 1.5rem; bottom: 5.25rem; } .healio-nita-panel { bottom: 9.75rem; } } @media print { .healio-nita-surface { display: none !important; } }
      `}</style>
      <button ref={launcherRef} type="button" onClick={handleLauncherClick} className="healio-nita-surface healio-nita-quiet-launcher" data-healio-nita="launcher" aria-label={copy.launcher} title={copy.launcher} aria-controls="healio-nita-panel" aria-expanded={panelOpen}><span className="healio-nita-orb-shell" aria-hidden="true" /></button>
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

export default NitaConsentWidget;
