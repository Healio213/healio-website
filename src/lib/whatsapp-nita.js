/**
 * Freiwilliges WhatsApp-Häkchen für Anfragen von Privatkunden (Franks Auftrag
 * 09.11.2026). Wer eine Telefonnummer einträgt und das Häkchen setzt, bekommt
 * zuerst eine Nachricht von Nita, der digitalen Assistentin von Healio.
 *
 * Der Wortlaut ist der Beleg der Einwilligung: Die Anfragen-Zentrale speichert
 * genau den Text, der am Häkchen stand. Partner-, Praxis- und Firmenformulare
 * bekommen kein Häkchen.
 */

export const WHATSAPP_NITA_TEXT = 'Antwort gern auch per WhatsApp von Healio (040 89755 500). Nita, unsere digitale Assistentin, schreibt dir zuerst. Abbestellen jederzeit mit STOP.';
export const WHATSAPP_NITA_TEXT_EN = 'You are welcome to receive replies on WhatsApp from Healio (040 89755 500) as well. Nita, our digital assistant, will message you first. You can opt out at any time by sending STOP.';

export const WHATSAPP_DANKE_JETZT = 'Nita, unsere digitale Assistentin, schreibt dir gleich per WhatsApp.';
export const WHATSAPP_DANKE_MORGEN = 'Nita, unsere digitale Assistentin, schreibt dir morgen früh per WhatsApp.';
export const WHATSAPP_DANKE_JETZT_EN = 'Nita, our digital assistant, will message you on WhatsApp shortly.';
export const WHATSAPP_DANKE_MORGEN_EN = 'Nita, our digital assistant, will message you on WhatsApp tomorrow morning.';

/** Das Häkchen erscheint erst, wenn eine Telefonnummer im Feld steht. */
export const hatTelefon = (phone) => String(phone ?? '').trim() !== '';

export const whatsappText = (lang = 'de') => (lang === 'en' ? WHATSAPP_NITA_TEXT_EN : WHATSAPP_NITA_TEXT);

/** Stunde (0 bis 23) in Berlin, unabhängig von der Zeitzone des Geräts. */
export function berlinStunde(jetzt = new Date()) {
  try {
    const teile = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', hour: 'numeric', hourCycle: 'h23' }).formatToParts(jetzt);
    const stunde = Number(teile.find((teil) => teil.type === 'hour')?.value);
    if (Number.isFinite(stunde)) return stunde;
  } catch { /* Fällt auf die Gerätezeit zurück. */ }
  return jetzt.getHours();
}

/** Zwischen 21 und 8 Uhr schreibt Nita erst am nächsten Morgen. */
export const schreibtNitaMorgenFrueh = (jetzt = new Date()) => {
  const stunde = berlinStunde(jetzt);
  return stunde >= 21 || stunde < 8;
};

export function whatsappDankeText(lang = 'de', jetzt = new Date()) {
  const morgen = schreibtNitaMorgenFrueh(jetzt);
  if (lang === 'en') return morgen ? WHATSAPP_DANKE_MORGEN_EN : WHATSAPP_DANKE_JETZT_EN;
  return morgen ? WHATSAPP_DANKE_MORGEN : WHATSAPP_DANKE_JETZT;
}

/**
 * Option für emailjsService.sendEmail. Das Häkchen gilt nur mit Telefonnummer.
 * `angeboten` sorgt für die Zeile „WhatsApp: ja/nein“ in der Mail an info@.
 */
export const whatsappOption = ({ checked, phone, lang = 'de' }) => ({
  angeboten: true,
  einwilligung: Boolean(checked) && hatTelefon(phone),
  text: whatsappText(lang),
});
