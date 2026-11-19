// Herkunft des Besuchs für den Antrag (Franks Vorgabe 12.11.2026): Werber-
// oder Partnercode, utm-Kennzeichen und Einstiegsseite; seit 19.11.2026 dazu
// die verweisende Seite (nur Hostname, beim ersten Laden) und die letzte Seite
// vor der Maske (setzt die Wahl der Wege, src/lib/antragsmaske/herkunft.js).
// - Mit Zustimmung zur Messung (Einwilligung „analytics“, src/lib/consent.js)
//   liegt sie als genau ein Eintrag im sessionStorage und übersteht ein volles
//   Neuladen im selben Fenster, aber nur, wenn mindestens eine Sparte der
//   Antragsmaske eingeschaltet ist (erlaubeSitzungsspeicher, 19.11.2026).
//   Nie Gesundheits-, Bank- oder Personendaten.
// - Ohne Zustimmung gilt Gate 3 vom 08.11.2026: kein Gerätespeicher. Die
//   Herkunft lebt nur im Arbeitsspeicher der geöffneten Seite; ref läuft wie
//   bisher über die Links mit (src/lib/referrer.js).
// - Widerruf der Zustimmung löscht den Eintrag sofort.
// Kein Versand außer mit dem Antrag selbst.
import { hasConsent, subscribeConsent } from './consent.js';

const SCHLUESSEL = 'healio.herkunft';

// Herkunft des Kunden (Franks Vorgabe 12.11.2026: Healio sieht beim Abschluss
// selbst, wer den Kunden geworben hat). Nur Kennzeichen, nie Personen- oder
// Gesundheitsangaben. Gleiche Muster wie src/lib/referrer.js (ref) und
// src/lib/analytics.js (utm_*). Unbekanntes fällt weg, nichts wirft.
const REF_MUSTER = /^[A-Za-z0-9_-]{1,64}$/;
const UTM_SCHLUESSEL = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const UTM_MUSTER = /^[a-z0-9][a-z0-9_.-]{0,99}$/i;
const PFAD_MUSTER = /^\/[a-z0-9/-]{0,159}$/;
// Letzte Seite vor der Maske: nur Pfad (a-z 0-9 / _ -, ohne //), höchstens 200 Zeichen.
// Verweiser: nur Hostname (a-z 0-9 . -), höchstens 100 Zeichen, keine IP, kein Port. Gleiche Regeln wie der Antragsdienst.
const LETZTE_SEITE_MUSTER = /^\/(?!.*\/\/)[a-z0-9/_-]{0,199}$/;
const VERWEISER_MUSTER = /^(?=.{1,100}$)(?![0-9.]+$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/;

export function bereinigeHerkunft(roh = {}) {
  const quelle = roh && typeof roh === 'object' ? roh : {};
  const utm = {};
  UTM_SCHLUESSEL.forEach((key) => {
    const wert = String(quelle.utm?.[key] ?? '').trim();
    if (UTM_MUSTER.test(wert)) utm[key] = wert;
  });
  const ref = String(quelle.ref ?? '').trim();
  const seite = String(quelle.einstiegsseite ?? '').trim().toLowerCase();
  const letzte = String(quelle.letzteSeite ?? '').trim().toLowerCase().replace(/[?#].*$/, '');
  const verweiser = String(quelle.verweiser ?? '').trim().toLowerCase();
  return {
    ref: REF_MUSTER.test(ref) ? ref : null,
    utm,
    einstiegsseite: PFAD_MUSTER.test(seite) ? seite : null,
    sparte: ['ambulant', 'zahn', 'stationaer'].includes(quelle.sparte) ? quelle.sparte : null,
    weg: ['allein', 'telefon'].includes(quelle.weg) ? quelle.weg : null,
    letzteSeite: LETZTE_SEITE_MUSTER.test(letzte) ? letzte : null,
    verweiser: VERWEISER_MUSTER.test(verweiser) ? verweiser : null,
  };
}

// Nur die Felder, die für den ganzen Besuch gelten (ohne Sparte, Weg und letzte Seite).
const besuchsTeil = (sauber) => ({
  ref: sauber.ref, utm: sauber.utm, einstiegsseite: sauber.einstiegsseite, verweiser: sauber.verweiser,
});


// Herkunft dieser Seite im Arbeitsspeicher (gilt immer, auch ohne Zustimmung).
let imSpeicher = null;
// Sitzungsspeicher nur, wenn eine Sparte der Antragsmaske an ist (src/config/contactChannels.js); Standard aus.
let sitzungErlaubt = false;
const zustimmung = () => { try { return sitzungErlaubt && hasConsent('analytics'); } catch { return false; } };

function ausSitzung() {
  try {
    const roh = JSON.parse(window.sessionStorage.getItem(SCHLUESSEL) || 'null');
    if (!roh) return null;
    return besuchsTeil(bereinigeHerkunft(roh));
  } catch {
    return null;
  }
}

function inSitzung(wert) {
  try { window.sessionStorage.setItem(SCHLUESSEL, JSON.stringify(wert)); } catch { /* ohne Speicher bleibt es beim Arbeitsspeicher */ }
}

export function vergissHerkunftImSpeicher() {
  try { window.sessionStorage.removeItem(SCHLUESSEL); } catch { /* nichts zu tun */ }
}

export function leseHerkunft() {
  return (zustimmung() && ausSitzung()) || imSpeicher;
}

// Einstiegsseite und utm nur beim ersten Laden des Besuchs; ein neuer
// Werbercode ersetzt den alten.
export function merkeHerkunft({
  ref = null, utm = null, einstiegsseite = null, verweiser = null,
} = {}) {
  const alt = leseHerkunft() || {
    ref: null, utm: {}, einstiegsseite: null, verweiser: null,
  };
  const neu = bereinigeHerkunft({
    ref: ref || alt.ref,
    utm: Object.keys(alt.utm || {}).length ? alt.utm : (utm || {}),
    einstiegsseite: alt.einstiegsseite || einstiegsseite,
    verweiser: alt.verweiser || verweiser,
  });
  imSpeicher = besuchsTeil(neu);
  if (zustimmung()) inSitzung(imSpeicher);
}

// Schalter aus contactChannels.js (HEALIO_ANTRAG_IRGENDEINE_SPARTE_AKTIV). Aus: kein Eintrag, ein alter wird entfernt.
export function erlaubeSitzungsspeicher(an) {
  sitzungErlaubt = an === true;
  if (!sitzungErlaubt) { vergissHerkunftImSpeicher(); return; }
  if (imSpeicher && zustimmung()) inSitzung(imSpeicher);
}

// Zustimmung erteilt: Herkunft dieser Seite in die Sitzung legen. Widerrufen: löschen.
export function beiZustimmungsWechsel(state) {
  if (sitzungErlaubt && hasConsent('analytics', state)) {
    if (imSpeicher) inSitzung(imSpeicher);
  } else {
    vergissHerkunftImSpeicher();
  }
}

if (typeof window !== 'undefined') subscribeConsent(beiZustimmungsWechsel);
