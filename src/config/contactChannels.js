export const HEALIO_WHATSAPP_URL = 'https://wa.me/494089755500';

// Seit 04.11.2026 an (Frank: „bringe die Telefonagenten auf die Seiten“): Nita in HD über GPT-Live, Dienst natascha-hd hinter
// voice-pilot.healio.de. Zum Abschalten auf false setzen.
export const HEALIO_VOICE_CONTACT_ENABLED = true;

// Inline-Hilfe (WhatsAppHelpHint) auf /schwangerschaft und /stationaer.
// Erst einschalten, wenn der WhatsApp-Dienst öffentlich freigeschaltet ist und
// eine Testnachricht von einer fremden Nummer beantwortet wurde.
export const HEALIO_WHATSAPP_HELP_ENABLED = false;

// Nur auf true setzen, wenn eingehende WhatsApp-Nachrichten von einem Menschen
// beantwortet werden. Bei false antwortet zuerst Nita, und der Hilfe-Baustein
// sagt das offen, ohne „persönlich“ zu versprechen.
export const HEALIO_WHATSAPP_HUMAN_REPLY = false;

// Öffentliche Nummer, auf der die Nita-Sprachlinie läuft (wie Footer und /kontakt).
export const HEALIO_PHONE_TEL = 'tel:+494089755705';
export const HEALIO_PHONE_DISPLAY = '040 89755705';

// Antragsgespräch mit Nita auf /antrag/aufnehmen (10.11.2026, SCHNITTSTELLE.md 11.2). Noch nicht live: Solange
// die Freigabe false ist, gibt es keinen Knopf „Antrag gemeinsam aufnehmen“ auf anderen Seiten, und die Seite
// zeigt statt des Gesprächs die beiden anderen Wege. Für die lokale Prüfung schaltet VITE_ANTRAG_GESPRAECH=1
// das Gespräch ein, aber nur im Entwicklungsmodus (npm run dev), nie im Build.
const ANTRAG_GESPRAECH_FREIGABE = false;
const ANTRAG_GESPRAECH_LOKAL = Boolean(import.meta.env?.DEV) && import.meta.env?.VITE_ANTRAG_GESPRAECH === '1';
export const HEALIO_ANTRAG_GESPRAECH_AKTIV = ANTRAG_GESPRAECH_FREIGABE || ANTRAG_GESPRAECH_LOKAL;

// Adresse des HD-Dienstes für das Antragsgespräch (Vertrag 11.2).
export const HEALIO_ANTRAG_GESPRAECH_API = import.meta.env?.VITE_ANTRAG_GESPRAECH_API || 'https://voice-pilot.healio.de/nita/antrag';
