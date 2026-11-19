// Vorbelegung der Antragsmaske und des Antragsgesprächs aus der Wahl der zwei
// Wege (12.11.2026). Dazu die Herkunft (Werbercode, utm, Einstiegsseite),
// damit sie den Seitenwechsel übersteht.
// Die Maske öffnet als echte Seitennavigation (keine Mess-Skripte der vorigen
// Seite im selben Dokument). Tarifstufe und Geburtsjahr gehen deshalb einmalig
// über sessionStorage mit, nie über die Adresse. Die Maske liest den Eintrag
// beim Start und löscht ihn sofort. Gesundheitsangaben und IBAN stehen hier nie.

const SCHLUESSEL = 'healio.antragsmaske.vorbelegung';
const GUELTIG_MS = 10 * 60 * 1000;

export function merkeVorbelegung({
  sparte, tarif = null, geburtsjahr = null, herkunft = null,
}) {
  try {
    const eintrag = { sparte, zeit: Date.now() };
    if (herkunft) eintrag.herkunft = { ref: herkunft.ref || null, utm: herkunft.utm || {}, einstiegsseite: herkunft.einstiegsseite || null };
    if (typeof tarif === 'string' && /^[A-Z0-9]{2,6}$/.test(tarif)) eintrag.tarif = tarif;
    if (Number.isInteger(geburtsjahr) && geburtsjahr > 1900 && geburtsjahr < 2100) eintrag.geburtsjahr = geburtsjahr;
    window.sessionStorage.setItem(SCHLUESSEL, JSON.stringify(eintrag));
  } catch { /* ohne Speicher startet die Maske leer */ }
}

// sparte null: jede Sparte (Antragsgespräch, das die Sparte selbst aus der Adresse liest).
// Das Ergebnis bleibt für diese Seite im Arbeitsspeicher, damit ein zweiter
// Aufruf (React StrictMode ruft Initialisierer doppelt) dasselbe bekommt.
let gelesen = null;
export function holeVorbelegung(sparte) {
  if (gelesen) return gelesen;
  gelesen = lies(sparte);
  return gelesen;
}

function lies(sparte) {
  try {
    const roh = window.sessionStorage.getItem(SCHLUESSEL);
    window.sessionStorage.removeItem(SCHLUESSEL);
    const eintrag = JSON.parse(roh || 'null');
    if (!eintrag || (sparte !== null && eintrag.sparte !== sparte) || !(Date.now() - eintrag.zeit < GUELTIG_MS)) return {};
    return { tarif: eintrag.tarif || null, geburtsjahr: eintrag.geburtsjahr || null, herkunft: eintrag.herkunft || null };
  } catch {
    return {};
  }
}
