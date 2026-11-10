import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const [nitaWidget, consent, whatsapp, contactPage, privacyPage, consentManager] = await Promise.all([
  readSource('src/components/NitaConsentWidget.jsx'),
  readSource('src/lib/consent.js'),
  readSource('src/components/WhatsAppContactButton.jsx'),
  readSource('src/pages/KontaktPage.jsx'),
  readSource('src/pages/DatenschutzPage.jsx'),
  readSource('src/components/ConsentManager.jsx'),
]);

assert.match(nitaWidget, /https:\/\/voice-pilot\.healio\.de\/nita\/realtime\/session/, 'Nita muss ausschließlich den gehärteten Healio-Broker verwenden.');
assert.doesNotMatch(nitaWidget, /VITE_NITA_WEBRTC_SESSION_ENDPOINT|\/api\/nita-session/, 'Der Browser darf keinen frei konfigurierbaren oder Vercel-basierten Session-Endpunkt verwenden.');
assert.match(nitaWidget, /RTCPeerConnection/, 'Nita muss die direkte OpenAI-WebRTC-Strecke verwenden.');
assert.match(nitaWidget, /createDataChannel\(['"]oai-events['"]\)/, 'Nita muss für Begrüßung und Lebenszyklus einen OpenAI-Eventkanal öffnen.');
// Seit 04.11.2026 (Commit 311c085, Dienst natascha-hd mit GPT-Live) meldet sich Nita zuerst: Die Seite hängt dafür einen festen
// Begrüßungsauftrag an (session.instructions.append) und stößt erst nach dessen Bestätigung den ersten Beitrag an
// (session.commentary.append). Vorher genügte response.create.
assert.match(nitaWidget, /type:\s*'session\.instructions\.append'[\s\S]{0,200}?content:\s*'[^'`$]+'/, 'Nita muss sich zuerst melden; die Seite darf dafür nur einen festen Begrüßungsauftrag anhängen.');
assert.match(nitaWidget, /session\.instructions\.appended[\s\S]{0,160}?speakGreeting\(\)/, 'Den ersten Beitrag darf die Seite erst nach der Bestätigung des Begrüßungsauftrags anstoßen.');
assert.match(nitaWidget, /type:\s*'session\.commentary\.append'[\s\S]{0,160}?content:\s*'[^'`$]+'/, 'Den ersten Beitrag stößt die Seite mit einem festen Text an.');
assert.doesNotMatch(nitaWidget, /type:\s*'session\.update'/, 'Der Browser darf die Sitzung nicht umkonfigurieren.');
assert.doesNotMatch(nitaWidget, /content:\s*`/, 'Angehängte Aufträge dürfen keine zusammengesetzten Texte enthalten.');
assert.doesNotMatch(nitaWidget, /response:\s*\{\s*[^}]*instructions:/s, 'Der Browser darf keine Sitzungsanweisung überschreiben.');
assert.match(nitaWidget, /credentials:\s*'omit'/, 'Der Cross-Origin-Broker darf keine Cookies erhalten.');
assert.match(nitaWidget, /referrerPolicy:\s*'no-referrer'/, 'Der Broker darf keinen Seiten-Referrer erhalten.');
assert.match(nitaWidget, /'Content-Type':\s*'application\/sdp'/, 'Der Browser darf ausschließlich SDP an den Broker senden.');
assert.match(nitaWidget, /body:\s*offer\.sdp/, 'Der Browser darf ausschließlich das SDP-Angebot senden.');
assert.doesNotMatch(nitaWidget, /body:\s*JSON\.stringify\(\{\s*sdp:/, 'Der Browser darf keine Zusatzdaten an den Broker senden.');
// Gespräche bis 6 Minuten seit 04.11.2026 (Commit 311c085, vorher 150 Sekunden).
assert.match(nitaWidget, /const NITA_SESSION_HARD_STOP_MS = 360_000;/, 'Eine Browser-Sprachsession muss nach 6 Minuten hart beendet werden.');
assert.match(nitaWidget, /const NITA_SILENCE_STOP_MS = 30_000;/, 'Nach einer fertigen Antwort muss längere Stille die Sprachsession beenden.');
assert.match(nitaWidget, /input_audio_buffer\.speech_started/, 'Erkannte Sprache muss den Silence-Abbruch zurücksetzen.');
assert.match(nitaWidget, /response\.done/, 'Nach einer fertigen Antwort muss der Silence-Abbruch neu beginnen.');
assert.match(nitaWidget, /session\.input_transcript\.delta[\s\S]{0,120}?scheduleSilenceStop\(\)/, 'Die Mitschrift-Ereignisse von GPT-Live müssen den Stille-Abbruch neu starten.');
assert.match(nitaWidget, /stopConnection\(['"]ended['"],\s*['"]limit['"]\)/, 'Der 6-Minuten-Timer muss die Medienverbindung wirklich schließen.');
assert.match(nitaWidget, /stopConnection\(['"]ended['"],\s*['"]silence['"]\)/, 'Der Silence-Timer muss die Medienverbindung wirklich schließen.');
assert.match(nitaWidget, /type:\s*'session\.close'/, 'Beim Beenden muss die Seite die Sitzung beim Dienst schließen.');
// Kommentare zählen nicht: Die Kontaktleiste erwähnt im Kommentar, dass sie dem früheren ElevenLabs-Widget nachempfunden ist.
const nitaWidgetCode = nitaWidget.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"\\])\/\/.*$/gm, '$1');
assert.doesNotMatch(nitaWidgetCode, /ElevenLabs|elevenlabs|unpkg\.com/i, 'Die globale Nita-Oberfläche darf keine ElevenLabs-Einbindung mehr laden.');
assert.match(nitaWidget, /data-healio-nita="launcher"/, 'Der globale Nita-Kreis muss als bedienbarer Launcher erhalten bleiben.');
assert.match(nitaWidget, /aria-expanded/, 'Der Nita-Kreis muss den Zustand des Sprachpanels für die Tastaturbedienung vermitteln.');
assert.match(nitaWidget, /prefers-reduced-motion/, 'Der Nita-Kreis muss reduzierte Bewegung respektieren.');

assert.match(consent, /'openai'/, 'Die Einwilligung muss OpenAI als separaten Dienst abbilden.');
assert.doesNotMatch(consent, /'elevenlabs'/, 'Die alte ElevenLabs-Einwilligung darf nicht fortgeführt werden.');
assert.match(consentManager, /OpenAI/, 'Die Datenschutz-Einstellungen müssen den OpenAI-Sprachdienst erklären.');

assert.match(whatsapp, /HEALIO_WHATSAPP_URL/, 'Der globale WhatsApp-Kreis muss die freigegebene zentrale Nummer verwenden.');
assert.match(whatsapp, /rounded-full/, 'Der globale WhatsApp-Kontakt muss ein Kreis bleiben.');
assert.match(whatsapp, /data-healio-whatsapp="floating"/, 'Der globale WhatsApp-Kreis braucht einen stabilen Selektor.');

// Frank 04.11.2026 (Commit e4c59d9): Auf Nitas Knopf steht „Nita anrufen“, darunter „KI-Assistentin, erklärt dir alles“ (am Handy
// „KI-Assistentin“). Nur dieser Wortlaut ist von der älteren Regel (02.09.2026) ausgenommen; überall sonst gilt sie weiter.
const NITA_KNOPF_DE = "dock: 'Nita anrufen', dockSub: 'KI-Assistentin, erklärt dir alles', dockSubShort: 'KI-Assistentin'";
const NITA_KNOPF_EN = "dock: 'Call Nita', dockSub: 'AI assistant, explains everything', dockSubShort: 'AI assistant'";
assert(nitaWidget.includes(NITA_KNOPF_DE) && nitaWidget.includes(NITA_KNOPF_EN), 'Nitas Knopf muss Franks Wortlaut vom 04.11.2026 tragen.');
const nitaWidgetOhneKnopf = nitaWidget.replace(NITA_KNOPF_DE, '').replace(NITA_KNOPF_EN, '');
for (const [name, source] of Object.entries({ nitaWidget: nitaWidgetOhneKnopf, contactPage, privacyPage, consentManager })) {
  assert.doesNotMatch(source, /KI-Assistent(?:in)?|AI assistant/i, `${name} darf Nita außerhalb des Knopftexts nicht als KI-Assistent bezeichnen.`);
}

console.log('Kontaktoberfläche: Sprachverbindung, Kontaktleiste und Wortlaut-Verträge erfüllt.');
