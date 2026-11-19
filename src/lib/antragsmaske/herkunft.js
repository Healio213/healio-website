// Herkunft des Besuchs sammeln (12.11.2026). Nutzt nur, was die Website schon
// erfasst: den Werber- oder Partnercode ?ref= (src/lib/referrer.js, im
// Arbeitsspeicher, beim Klick auf eigene Links als ?ref= weitergereicht) und
// die geprüften utm-Kennzeichen samt Einstiegsseite und Verweiser vom ersten
// Laden (src/lib/analytics.js). Nichts davon wird hier gespeichert.
//
// Seit 19.11.2026 trägt der Link von der Wahl der Wege zur Maske (und zum
// Antragsgespräch) die Herkunft in der Adresse: ref, utm_*, einstiegsseite,
// letzteSeite, verweiser. So übersteht sie den Seitenwechsel auch ohne
// Zustimmung zur Messung und ohne Ablage im Gerät. Nur diese geprüften
// Kennzeichen, nie Klick-Kennungen der Werbeplattformen (gclid, fbclid ...),
// nie Personen-, Gesundheits- oder Bankdaten.
import { einstiegsHerkunft } from '@/lib/analytics';
import { readStoredReferrer } from '@/lib/referrer';
import { bereinigeHerkunft, leseHerkunft } from '@/lib/herkunftSpeicher';

export const HERKUNFT_PARAMETER = Object.freeze([
  'ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'einstiegsseite', 'letzteSeite', 'verweiser',
]);

const leer = (wert) => !wert || (typeof wert === 'object' && !Object.keys(wert).length);
const erste = (...werte) => werte.find((wert) => !leer(wert)) ?? null;

// Herkunft aus der Adresse der Maske lesen (nur die Kennzeichen oben, bereinigt).
export function herkunftAusAdresse(suche) {
  let werte;
  try {
    werte = new URLSearchParams(typeof suche === 'string' ? suche : (typeof window !== 'undefined' ? window.location.search : ''));
  } catch {
    return null;
  }
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => { if (werte.has(key)) utm[key] = werte.get(key); });
  const sauber = bereinigeHerkunft({
    ref: werte.get('ref'), utm, einstiegsseite: werte.get('einstiegsseite'), letzteSeite: werte.get('letzteSeite'), verweiser: werte.get('verweiser'),
  });
  const teil = {
    ref: sauber.ref, utm: sauber.utm, einstiegsseite: sauber.einstiegsseite, letzteSeite: sauber.letzteSeite, verweiser: sauber.verweiser,
  };
  return Object.values(teil).some((wert) => !leer(wert)) ? teil : null;
}

// Adresse mit Herkunft: nur gesetzte, geprüfte Kennzeichen, feste Reihenfolge.
export function adresseMitHerkunft(pfad, herkunft) {
  const sauber = bereinigeHerkunft(herkunft || {});
  const werte = new URLSearchParams();
  if (sauber.ref) werte.set('ref', sauber.ref);
  Object.entries(sauber.utm).forEach(([key, wert]) => werte.set(key, wert));
  if (sauber.einstiegsseite) werte.set('einstiegsseite', sauber.einstiegsseite);
  if (sauber.letzteSeite) werte.set('letzteSeite', sauber.letzteSeite);
  if (sauber.verweiser) werte.set('verweiser', sauber.verweiser);
  const suche = werte.toString();
  if (!suche) return pfad;
  return `${pfad}${pfad.includes('?') ? '&' : '?'}${suche}`;
}

// mitgebracht: Herkunft aus der Vorbelegung (nur mit Zustimmung). adresse: Standard aus window.location.
// letzteSeite: Pfad der Seite, auf der die Wahl offen ist (nur auf der Zielseite gesetzt).
export function sammleHerkunft({
  sparte = null, weg = null, mitgebracht = null, letzteSeite = null, adresse = undefined,
} = {}) {
  const jetzt = einstiegsHerkunft();
  const vorher = mitgebracht || {};
  const ausAdresse = (adresse === undefined ? herkunftAusAdresse() : adresse) || {};
  // Haltbar für den Besuch im selben Fenster (herkunftSpeicher.js).
  const besuch = leseHerkunft() || {};
  return bereinigeHerkunft({
    ref: erste(readStoredReferrer(), vorher.ref, ausAdresse.ref, besuch.ref),
    utm: erste(vorher.utm, ausAdresse.utm, besuch.utm, jetzt.utm) || {},
    einstiegsseite: erste(vorher.einstiegsseite, ausAdresse.einstiegsseite, besuch.einstiegsseite, jetzt.einstiegsseite),
    letzteSeite: erste(letzteSeite, vorher.letzteSeite, ausAdresse.letzteSeite),
    verweiser: erste(vorher.verweiser, ausAdresse.verweiser, besuch.verweiser, jetzt.verweiser),
    sparte,
    weg,
  });
}
