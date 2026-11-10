/**
 * Anonymer Zähler ohne Cookies und Kennungen (Vorbild: „healio_klick“ auf
 * kassenboost.de). Er zählt nur vier Ereignisse und läuft auf allen Seiten,
 * auch dort, wo Google Analytics und Meta wegen Art. 9 DSGVO schweigen:
 *
 *   leistungsweg_klick     Klick auf einen Link zu einer Leistungsseite
 *                          (von_pfad = Seite des Klicks, ziel = Leistungsseite)
 *   sdk_klick              Der SDK-Rechner wird geöffnet (von_pfad)
 *   kurzcheck_abgeschickt  Ein Kurzcheck wurde erfolgreich abgeschickt
 *                          (von_pfad = Pfad des Checks, ziel = Variante)
 *   versicherer_klick      Der Online-Abschluss eines Versicherers wird
 *                          geöffnet (von_pfad = Seite des Klicks,
 *                          ziel = bayerische oder ukv)
 *
 * Grundregeln, die dieses Modul technisch erzwingt:
 * - Kein Cookie, kein localStorage, kein sessionStorage, keine Nutzer- oder
 *   Sitzungskennung, keine Uhrzeit. Das Datum setzt die Datenbank.
 * - Übertragen werden nur Ereignisname und zwei geprüfte Pfade. Ob mobil oder
 *   desktop, leitet die Funktion aus der Browserkennung der Anfrage ab; der
 *   Browser liest dafür nichts aus. Suchparameter, Sprungmarken, Antworten,
 *   Formularinhalte und Kontaktdaten verlassen den Browser nie über diesen Weg.
 * - Gesendet wird per fetch mit keepalive an /api/zaehler (eigene Domain).
 *   Die Funktion schreibt mit dem vorhandenen öffentlichen Supabase-Schlüssel
 *   in public.anonyme_zaehler (HEALIO Production), ohne IP und Browserdaten.
 * - Fehler bleiben still, ein Klick wird nie blockiert oder verzögert. Fehlt
 *   die Tabelle oder die Funktion, passiert für Besucher nichts.
 * - Automatisierte Browser (navigator.webdriver) zählen nicht, damit Prüfläufe
 *   die Zahlen nicht verfälschen.
 * - Links in Kopf, Menü und Fußzeile zählen nicht als Weg: gezählt wird, was
 *   aus dem Inhalt einer Seite zur Leistungsseite führt.
 */

import {
  baueZaehlerNutzlast,
  istLeistungsseite,
  normalisiereZaehlerPfad,
} from '../../shared/anonyme-zaehler.js';

export {
  KURZCHECK_VARIANTEN,
  LEISTUNGSSEITEN,
  ZAEHLER_EREIGNISSE,
  ZAEHLER_PFAD_MUSTER,
  ZAEHLER_VERSICHERER,
  baueZaehlerEintrag,
  normalisiereZaehlerPfad,
} from '../../shared/anonyme-zaehler.js';

export const ZAEHLER_ENDPOINT = '/api/zaehler';

// Kopf, Menü und Fußzeile sind Seitennavigation, kein Weg aus dem Inhalt.
const NAVIGATIONS_BEREICH = 'header, footer, nav, [role="navigation"], [data-zaehler-ignorieren]';
// Doppelklicks und doppelte Auslöser derselben Geste zählen einmal.
const DOPPEL_SPERRE_MS = 1000;

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

let letzterSchluessel = '';
let letzterZeitpunkt = 0;

/**
 * Zählt ein Ereignis. Gibt true zurück, wenn ein Versand angestoßen wurde.
 * Wirft nie und wartet nie auf eine Antwort.
 */
export const zaehle = (ereignis, angaben = {}) => {
  try {
    if (!isBrowser() || typeof window.fetch !== 'function') return false;
    if (window.navigator?.webdriver === true) return false;
    const eintrag = baueZaehlerNutzlast(ereignis, {
      vonPfad: angaben.vonPfad ?? window.location.pathname,
      ziel: angaben.ziel ?? null,
    });
    if (!eintrag) return false;

    const schluessel = `${eintrag.ereignis}|${eintrag.von_pfad}|${eintrag.ziel || ''}`;
    const jetzt = Date.now();
    if (schluessel === letzterSchluessel && jetzt - letzterZeitpunkt < DOPPEL_SPERRE_MS) return false;
    letzterSchluessel = schluessel;
    letzterZeitpunkt = jetzt;

    window.fetch(ZAEHLER_ENDPOINT, {
      method: 'POST',
      keepalive: true,
      credentials: 'omit',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eintrag),
    }).catch(() => { /* Zählung ist optional. */ });
    return true;
  } catch {
    return false;
  }
};

/** Ziel eines angeklickten Links, wenn er auf eine Leistungsseite führt. */
export const leistungszielAusLink = (anchor, aktuellerPfad) => {
  try {
    if (!anchor || typeof anchor.getAttribute !== 'function') return null;
    if (anchor.closest?.(NAVIGATIONS_BEREICH)) return null;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#')) return null;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    const ziel = normalisiereZaehlerPfad(url.pathname);
    if (!ziel || !istLeistungsseite(ziel)) return null;
    if (ziel === normalisiereZaehlerPfad(aktuellerPfad)) return null;
    return ziel;
  } catch {
    return null;
  }
};

let klickZaehlerAktiv = false;

/**
 * Ein einziger Zuhörer am Dokument für alle Seiten. Er liest nur das Ziel des
 * angeklickten Links und lässt Klick, Navigation und andere Zuhörer unberührt.
 */
export const installiereLeistungswegZaehler = () => {
  if (!isBrowser() || klickZaehlerAktiv) return () => {};
  klickZaehlerAktiv = true;
  const beiKlick = (event) => {
    try {
      // Linke Taste (click) oder mittlere Taste (auxclick, neuer Tab).
      if (event.type === 'auxclick' && event.button !== 1) return;
      const anchor = event.target?.closest?.('a[href]');
      if (!anchor) return;
      const vonPfad = window.location.pathname;
      const ziel = leistungszielAusLink(anchor, vonPfad);
      if (ziel) zaehle('leistungsweg_klick', { vonPfad, ziel });
    } catch { /* Zählung ist optional. */ }
  };
  // Capture: läuft vor dem Seitenwechsel des Routers, ändert aber nichts.
  document.addEventListener('click', beiKlick, { capture: true, passive: true });
  document.addEventListener('auxclick', beiKlick, { capture: true, passive: true });
  return () => {
    document.removeEventListener('click', beiKlick, { capture: true });
    document.removeEventListener('auxclick', beiKlick, { capture: true });
    klickZaehlerAktiv = false;
  };
};
