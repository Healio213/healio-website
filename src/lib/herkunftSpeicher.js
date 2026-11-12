// Herkunft des Besuchs für den Antrag (Franks Vorgabe 12.11.2026): Werber-
// oder Partnercode, utm-Kennzeichen und Einstiegsseite sollen ein volles
// Neuladen im selben Fenster überstehen. Dafür liegt im sessionStorage genau
// dieser eine Eintrag, geprüft und gekürzt (bereinigeHerkunft). Nie
// Gesundheitsangaben, Bankdaten oder Personendaten. Schließen des Fensters
// löscht ihn. Kein Versand außer mit dem Antrag selbst.

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


export function leseHerkunft() {
  try {
    const roh = JSON.parse(window.sessionStorage.getItem(SCHLUESSEL) || 'null');
    if (!roh) return null;
    const sauber = bereinigeHerkunft(roh);
    return { ref: sauber.ref, utm: sauber.utm, einstiegsseite: sauber.einstiegsseite };
  } catch {
    return null;
  }
}

// Einstiegsseite und utm nur beim ersten Laden des Besuchs; ein neuer
// Werbercode ersetzt den alten.
export function merkeHerkunft({ ref = null, utm = null, einstiegsseite = null } = {}) {
  try {
    const alt = leseHerkunft() || { ref: null, utm: {}, einstiegsseite: null };
    const neu = bereinigeHerkunft({
      ref: ref || alt.ref,
      utm: Object.keys(alt.utm || {}).length ? alt.utm : (utm || {}),
      einstiegsseite: alt.einstiegsseite || einstiegsseite,
    });
    window.sessionStorage.setItem(SCHLUESSEL, JSON.stringify({ ref: neu.ref, utm: neu.utm, einstiegsseite: neu.einstiegsseite }));
  } catch { /* ohne Speicher bleibt es beim Arbeitsspeicher */ }
}
