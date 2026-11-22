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

// Eigene Antragsmaske (12.11.2026, je Sparte getrennt seit 19.11.2026). Drei Schalter je Sparte
// (ambulant, zahn, stationaer), alle Standard aus. Eine Sparte geht nur live, wenn ihr Wert hier auf true steht.
// ANTRAGSMASKE_FREIGABE[sparte]: /antrag/<sparte> zeigt die Strecke (unverlinkt, noindex, nicht in der Sitemap).
//   Bei false ist dort nichts ausfüllbar; die Seite führt zur Produktseite (/ambulant, /zahn, /stationaer) zurück.
// ANTRAGSWAHL_FREIGABE[sparte]: Die Abschlussknöpfe auf /ambulant, /zahn, /stationaer zeigen statt des E-Mail-
//   Fensters die Wahl der Wege (LeadCaptureProvider.jsx). Bei false bleibt diese Seite wie heute.
//   „Allein abschließen“ führt nur dann zur eigenen Maske, wenn auch ANTRAGSMASKE_FREIGABE[sparte] an ist, sonst
//   wie heute zum Online-Abschluss des Versicherers.
// ANTRAG_TELEFON_FREIGABE[sparte]: Der Weg „Antrag zusammen am Telefon“ (Nita, /antrag/aufnehmen) in der Wahl und
//   in der Maske dieser Sparte. Zahn und stationär bleiben aus, bis Nita diese Anträge aufnehmen kann.
//   Wirkt nur zusammen mit HEALIO_ANTRAG_GESPRAECH_AKTIV.
// Nur im Entwicklungsmodus (npm run dev) dürfen VITE_ANTRAGSMASKE, VITE_ANTRAGSWAHL und VITE_ANTRAG_TELEFON die
// Werte überschreiben, im Build nie: '1' schaltet alle Sparten ein, '0' alle aus, eine Liste wie 'ambulant,zahn'
// genau diese ein.
export const ANTRAG_SPARTEN = Object.freeze(['ambulant', 'zahn', 'stationaer']);
// 19.11.2026 (Franks Ja): Stationär (SDK) an. 21.11.2026 (Franks Ja „Ambulant an“): Ambulant (SDK) dazu.
// 22.11.2026 (Franks Vorgabe „wenn dieses Ergebnis dann geklappt hat für den ambulanten Bereich, machst du es für den
// Zahnbereich“): Zahn dazu, mit der gemeinsamen Maske (Weiche zwischen Bayerischer und UKV) und der UKV.
// Mit Maske und Wahl an und ohne Telefonweg führt jeder Abschlussknopf für SDK stationär und SDK ambulant
// direkt in die Maske der Sparte, jeder Zahn-Abschlussknopf (Bayerische oder UKV) in den Einstieg der
// gemeinsamen Maske /antrag/zahn (LeadCaptureProvider.jsx, direkteMaske).
const ANTRAGSMASKE_FREIGABE = { ambulant: true, zahn: true, stationaer: true };
const ANTRAGSWAHL_FREIGABE = { ambulant: true, zahn: true, stationaer: true };
const ANTRAG_TELEFON_FREIGABE = { ambulant: false, zahn: false, stationaer: false };

// freigabe: { sparte: boolean }; lokal: Wert der VITE_-Variable oder undefined. Nur bekannte Sparten zählen.
export function schalterJeSparte(freigabe, lokal) {
  const liste = typeof lokal === 'string' ? lokal.split(',').map((teil) => teil.trim()).filter(Boolean) : [];
  return Object.freeze(Object.fromEntries(ANTRAG_SPARTEN.map((sparte) => {
    if (lokal === '1') return [sparte, true];
    if (lokal === '0') return [sparte, false];
    if (liste.length) return [sparte, liste.includes(sparte)];
    return [sparte, freigabe?.[sparte] === true];
  })));
}

const lokalerWert = (name) => (ANTRAG_ENTWICKLUNG ? import.meta.env?.[name] : undefined);
export const HEALIO_ANTRAGSMASKE_SPARTEN = schalterJeSparte(ANTRAGSMASKE_FREIGABE, lokalerWert('VITE_ANTRAGSMASKE'));
export const HEALIO_ANTRAGSWAHL_SPARTEN = schalterJeSparte(ANTRAGSWAHL_FREIGABE, lokalerWert('VITE_ANTRAGSWAHL'));
export const HEALIO_ANTRAG_TELEFON_SPARTEN = schalterJeSparte(ANTRAG_TELEFON_FREIGABE, lokalerWert('VITE_ANTRAG_TELEFON'));

export const antragsmaskeAktiv = (sparte) => HEALIO_ANTRAGSMASKE_SPARTEN[sparte] === true;
export const antragswahlAktiv = (sparte) => HEALIO_ANTRAGSWAHL_SPARTEN[sparte] === true;
export const antragTelefonAktiv = (sparte) => HEALIO_ANTRAG_GESPRAECH_AKTIV && HEALIO_ANTRAG_TELEFON_SPARTEN[sparte] === true;
// Irgendeine Sparte an (Maske oder Wahl): nur dann darf die Herkunft mit Zustimmung im Sitzungsspeicher liegen.
export const HEALIO_ANTRAG_IRGENDEINE_SPARTE_AKTIV = ANTRAG_SPARTEN.some((sparte) => antragsmaskeAktiv(sparte) || antragswahlAktiv(sparte));

// Zweites Zahn-Produkt UKV ZahnPRIVAT 75/90/100 in der eigenen Maske (/antrag/zahn-ukv, 12.11.2026), Standard aus.
// Wirkt nur, wenn auch die Sparte zahn (ANTRAGSMASKE_FREIGABE.zahn) an ist.
// 22.11.2026 an (Frank: „Nein, die Oberfläche bleibt nicht gesperrt. Du machst das.“). Die Direktanbindung klärt
// Frank selbst; das endgültige Absenden sperrt weiter der Dienst (UKV-Riegel, ANTRAG_ABSENDEN_FREIGABE).
const ANTRAGSMASKE_UKV_ZAHN_FREIGABE = true;
const ANTRAGSMASKE_UKV_ZAHN_LOKAL = ANTRAG_ENTWICKLUNG ? import.meta.env?.VITE_ANTRAGSMASKE_UKV_ZAHN : undefined;
// Nur im Entwicklungsmodus: VITE_ANTRAGSMASKE_UKV_ZAHN=0 schaltet die UKV aus (Prüfung „UKV aus“), =1 ein; im Build gilt die Freigabe.
export const HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV = ANTRAGSMASKE_UKV_ZAHN_LOKAL === '0' ? false : (ANTRAGSMASKE_UKV_ZAHN_LOKAL === '1' || ANTRAGSMASKE_UKV_ZAHN_FREIGABE);
