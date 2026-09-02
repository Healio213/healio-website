import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const [nitaWidget, nitaSession, consent, whatsapp, contactPage, privacyPage, consentManager] = await Promise.all([
  readSource('src/components/NitaConsentWidget.jsx'),
  readSource('api/nita-session.js'),
  readSource('src/lib/consent.js'),
  readSource('src/components/WhatsAppContactButton.jsx'),
  readSource('src/pages/KontaktPage.jsx'),
  readSource('src/pages/DatenschutzPage.jsx'),
  readSource('src/components/ConsentManager.jsx'),
]);

assert.match(nitaWidget, /VITE_NITA_WEBRTC_SESSION_ENDPOINT/, 'Nita braucht einen explizit konfigurierten WebRTC-Session-Endpunkt.');
assert.match(nitaWidget, /RTCPeerConnection/, 'Nita muss die direkte OpenAI-WebRTC-Strecke verwenden.');
assert.match(nitaWidget, /createDataChannel\(['"]oai-events['"]\)/, 'Nita muss für Begrüßung und Lebenszyklus einen OpenAI-Eventkanal öffnen.');
assert.match(nitaWidget, /type:\s*['"]response\.create['"]/, 'Nita muss ihren natürlichen Initialgruß über response.create anfordern.');
assert.match(nitaSession, /Hallo, ich bin Nita, die digitale Assistenz von Healio – wie kann ich helfen\?/, 'Der deutsche Initialgruß muss serverseitig verbindlich bleiben.');
assert.match(nitaWidget, /JSON\.stringify\(\{ type: 'response\.create' \}\)/, 'Der Browser darf den serverseitigen Gruß nicht mit eigenen Anweisungen überschreiben.');
assert.doesNotMatch(nitaWidget, /response:\s*\{\s*[^}]*instructions:/s, 'Der Browser darf keine Sitzungsanweisung überschreiben.');
assert.match(nitaWidget, /150_000/, 'Eine Browser-Sprachsession muss nach 150 Sekunden hart beendet werden.');
assert.match(nitaWidget, /30_000/, 'Nach einer fertigen Antwort muss längere Stille die Sprachsession beenden.');
assert.match(nitaWidget, /input_audio_buffer\.speech_started/, 'Erkannte Sprache muss den Silence-Abbruch zurücksetzen.');
assert.match(nitaWidget, /response\.done/, 'Nach einer fertigen Antwort muss der Silence-Abbruch neu beginnen.');
assert.match(nitaWidget, /stopConnection\(['"]ended['"],\s*['"]limit['"]\)/, 'Der 150-Sekunden-Timer muss die Medienverbindung wirklich schließen.');
assert.match(nitaWidget, /stopConnection\(['"]ended['"],\s*['"]silence['"]\)/, 'Der Silence-Timer muss die Medienverbindung wirklich schließen.');
assert.doesNotMatch(nitaWidget, /ElevenLabs|elevenlabs-convai|unpkg\.com/, 'Die globale Nita-Oberfläche darf keine ElevenLabs-Einbindung mehr laden.');
assert.match(nitaWidget, /data-healio-nita="launcher"/, 'Der globale Nita-Kreis muss als bedienbarer Launcher erhalten bleiben.');
assert.match(nitaWidget, /aria-expanded/, 'Der Nita-Kreis muss den Zustand des Sprachpanels für die Tastaturbedienung vermitteln.');
assert.match(nitaWidget, /prefers-reduced-motion/, 'Der Nita-Kreis muss reduzierte Bewegung respektieren.');

assert.match(consent, /'openai'/, 'Die Einwilligung muss OpenAI als separaten Dienst abbilden.');
assert.doesNotMatch(consent, /'elevenlabs'/, 'Die alte ElevenLabs-Einwilligung darf nicht fortgeführt werden.');
assert.match(consentManager, /OpenAI/, 'Die Datenschutz-Einstellungen müssen den OpenAI-Sprachdienst erklären.');

assert.match(whatsapp, /HEALIO_WHATSAPP_URL/, 'Der globale WhatsApp-Kreis muss die freigegebene zentrale Nummer verwenden.');
assert.match(whatsapp, /rounded-full/, 'Der globale WhatsApp-Kontakt muss ein Kreis bleiben.');
assert.match(whatsapp, /data-healio-whatsapp="floating"/, 'Der globale WhatsApp-Kreis braucht einen stabilen Selektor.');

for (const [name, source] of Object.entries({ nitaWidget, nitaSession, contactPage, privacyPage, consentManager })) {
  assert.doesNotMatch(source, /KI-Assistent(?:in)?|AI assistant/i, `${name} darf Nita nicht als KI-Assistent bezeichnen.`);
}

console.log('Kontaktoberfläche: direkte OpenAI-WebRTC- und Zwei-Kreise-Verträge erfüllt.');
