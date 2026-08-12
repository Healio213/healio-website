import { useEffect, useState } from 'react';
import { readStoredReferrer, sanitizeReferrer, storeReferrer } from '@/lib/referrer';

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
    return readStoredReferrer();
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRef = sanitizeReferrer(params.get('ref'));

    if (urlRef) {
      setRef(storeReferrer(urlRef));
    }
  }, []);

  return ref;
}
