// Herkunft des Besuchs für den Antrag (Franks Vorgabe 12.11.2026): Werber-
// oder Partnercode, utm-Kennzeichen und Einstiegsseite.
// - Mit Zustimmung zur Messung (Einwilligung „analytics“, src/lib/consent.js)
//   liegt sie als genau ein Eintrag im sessionStorage und übersteht ein volles
//   Neuladen im selben Fenster. Nie Gesundheits-, Bank- oder Personendaten.
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

export function bereinigeHerkunft(roh = {}) {
  const quelle = roh && typeof roh === 'object' ? roh : {};
  const utm = {};
  UTM_SCHLUESSEL.forEach((key) => {
    const wert = String(quelle.utm?.[key] ?? '').trim();
    if (UTM_MUSTER.test(wert)) utm[key] = wert;
  });
  const ref = String(quelle.ref ?? '').trim();
  const seite = String(quelle.einstiegsseite ?? '').trim().toLowerCase();
  return {
    ref: REF_MUSTER.test(ref) ? ref : null,
    utm,
    einstiegsseite: PFAD_MUSTER.test(seite) ? seite : null,
    sparte: ['ambulant', 'zahn', 'stationaer'].includes(quelle.sparte) ? quelle.sparte : null,
    weg: ['allein', 'telefon'].includes(quelle.weg) ? quelle.weg : null,
  };
}


// Herkunft dieser Seite im Arbeitsspeicher (gilt immer, auch ohne Zustimmung).
let imSpeicher = null;
const zustimmung = () => { try { return hasConsent('analytics'); } catch { return false; } };

function ausSitzung() {
  try {
    const roh = JSON.parse(window.sessionStorage.getItem(SCHLUESSEL) || 'null');
    if (!roh) return null;
    const sauber = bereinigeHerkunft(roh);
    return { ref: sauber.ref, utm: sauber.utm, einstiegsseite: sauber.einstiegsseite };
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
export function merkeHerkunft({ ref = null, utm = null, einstiegsseite = null } = {}) {
  const alt = leseHerkunft() || { ref: null, utm: {}, einstiegsseite: null };
  const neu = bereinigeHerkunft({
    ref: ref || alt.ref,
    utm: Object.keys(alt.utm || {}).length ? alt.utm : (utm || {}),
    einstiegsseite: alt.einstiegsseite || einstiegsseite,
  });
  imSpeicher = { ref: neu.ref, utm: neu.utm, einstiegsseite: neu.einstiegsseite };
  if (zustimmung()) inSitzung(imSpeicher);
}

// Zustimmung erteilt: Herkunft dieser Seite in die Sitzung legen. Widerrufen: löschen.
export function beiZustimmungsWechsel(state) {
  if (hasConsent('analytics', state)) {
    if (imSpeicher) inSitzung(imSpeicher);
  } else {
    vergissHerkunftImSpeicher();
  }
}

if (typeof window !== 'undefined') subscribeConsent(beiZustimmungsWechsel);
