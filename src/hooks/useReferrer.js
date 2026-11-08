import { useEffect, useState } from 'react';
import {
  attachReferrerToLink,
  clearLegacyReferrerStorage,
  readReferrerFromSearch,
  readStoredReferrer,
  storeReferrer,
} from '@/lib/referrer';

/**
 * Liest den Empfehlungs- oder Partnercode aus der URL (?ref=HP123) und hält
 * ihn im Arbeitsspeicher der geöffneten Seite (src/lib/referrer.js), damit er
 * beim Wechsel zwischen Seiten erhalten bleibt. Auf dem Gerät wird nichts
 * gespeichert.
 *
 * Flow: Partner teilt healio.de/schwangerschaft?ref=elterngeld-navigator
 *       → Besucherin wechselt auf /ambulant oder über kassenboost.de zurück
 *       → klickt "Tarif berechnen" → ref steht in der SDK-URL (customValues)
 */
export function useReferrer() {
  const [ref, setRef] = useState(() => readStoredReferrer());

  useEffect(() => {
    const urlRef = readReferrerFromSearch(window.location.search);
    if (urlRef) setRef(storeReferrer(urlRef));
  }, []);

  return ref;
}

/**
 * Einmal auf App-Ebene: Klick (auch Mittelklick, Kontextmenü und Enter) auf
 * einen Link zu kassenboost.de oder zu einer anderen healio.de-Seite hängt den
 * Code als ?ref= an. So überlebt er neue Tabs, Seiten mit vollem Neuladen und
 * den Umweg über kassenboost.de. Ohne Code passiert nichts.
 */
const LINK_EVENTS = ['click', 'auxclick', 'contextmenu'];

export function useReferrerLinks() {
  useEffect(() => {
    clearLegacyReferrerStorage();

    const handleLinkActivation = (event) => {
      if (!readStoredReferrer()) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor) attachReferrerToLink(anchor, window.location.href);
    };

    LINK_EVENTS.forEach((type) => document.addEventListener(type, handleLinkActivation, true));
    return () => LINK_EVENTS.forEach((type) => document.removeEventListener(type, handleLinkActivation, true));
  }, []);
}
