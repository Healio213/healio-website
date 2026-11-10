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

// Antragsgespräch mit Nita auf /antrag/aufnehmen (10.11.2026, SCHNITTSTELLE.md 11.2). Zwei getrennte Schalter:
// HEALIO_ANTRAG_GESPRAECH_AKTIV: die Seite führt das Gespräch (sie bleibt unverlinkt und noindex). Bei false zeigt sie
//   statt des Gesprächs die beiden anderen Wege und fragt den Dienst nicht an.
// HEALIO_ANTRAG_KNOPF_AKTIV: der Einstiegsknopf „Antrag gemeinsam aufnehmen“ auf anderen Seiten (AntragGespraechKnopf.jsx).
//   Er rendert nur, wenn beide Schalter an sind.
// Nur im Entwicklungsmodus (npm run dev) dürfen VITE_ANTRAG_GESPRAECH=0 oder =1 und VITE_ANTRAG_KNOPF=1 die Werte
// überschreiben, im Build nie.
const ANTRAG_GESPRAECH_FREIGABE = true;
const ANTRAG_KNOPF_FREIGABE = false;
const ANTRAG_ENTWICKLUNG = Boolean(import.meta.env?.DEV);
const ANTRAG_GESPRAECH_LOKAL = ANTRAG_ENTWICKLUNG ? import.meta.env?.VITE_ANTRAG_GESPRAECH : undefined;
const ANTRAG_KNOPF_LOKAL = ANTRAG_ENTWICKLUNG ? import.meta.env?.VITE_ANTRAG_KNOPF : undefined;
export const HEALIO_ANTRAG_GESPRAECH_AKTIV = ANTRAG_GESPRAECH_LOKAL === '0' ? false : (ANTRAG_GESPRAECH_LOKAL === '1' || ANTRAG_GESPRAECH_FREIGABE);
export const HEALIO_ANTRAG_KNOPF_AKTIV = ANTRAG_KNOPF_LOKAL === '1' || ANTRAG_KNOPF_FREIGABE;

// Adresse des HD-Dienstes für das Antragsgespräch (Vertrag 11.2).
export const HEALIO_ANTRAG_GESPRAECH_API = import.meta.env?.VITE_ANTRAG_GESPRAECH_API || 'https://voice-pilot.healio.de/nita/antrag';
