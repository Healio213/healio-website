import { useEffect, useState } from 'react';

const STORAGE_KEY = 'healio_ref';

/**
 * Liest den Referrer-Code aus der URL (?ref=HP123) und speichert ihn
 * in sessionStorage, damit er über Seitenwechsel hinweg erhalten bleibt.
 *
 * Flow: Heilpraktiker teilt healio.de/ambulant?ref=HP-praxis-name
 *       → Patient surft auf der Seite → klickt "Tarif berechnen"
 *       → ref wird in die SDK-URL eingebettet (customValues)
 */
export function useReferrer() {
  const [ref, setRef] = useState(() => {
    // Erst aus sessionStorage lesen (falls schon gesetzt)
    try {
      return sessionStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get('ref');

    if (urlRef) {
      try {
        sessionStorage.setItem(STORAGE_KEY, urlRef);
      } catch {
        // sessionStorage nicht verfügbar
      }
      setRef(urlRef);
    }
  }, []);

  return ref;
}

/**
 * Gibt den Referrer-Code zurück ohne Hook (für Utility-Funktionen).
 */
export function getReferrer() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}
