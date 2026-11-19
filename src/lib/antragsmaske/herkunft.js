// Herkunft des Besuchs sammeln (12.11.2026). Nutzt nur, was die Website schon
// erfasst: den Werber- oder Partnercode ?ref= (src/lib/referrer.js, im
// Arbeitsspeicher, beim Klick auf eigene Links als ?ref= weitergereicht) und
// die geprüften utm-Kennzeichen samt Einstiegsseite vom ersten Laden
// (src/lib/analytics.js). Nichts davon wird hier gespeichert.
import { einstiegsHerkunft } from '@/lib/analytics';
import { readStoredReferrer } from '@/lib/referrer';
import { leseHerkunft } from '@/lib/herkunftSpeicher';
import { bereinigeHerkunft } from './vertrag';

export function sammleHerkunft({ sparte = null, weg = null, mitgebracht = null } = {}) {
  const jetzt = einstiegsHerkunft();
  const vorher = mitgebracht || {};
  // Haltbar für den Besuch im selben Fenster (herkunftSpeicher.js).
  const besuch = leseHerkunft() || {};
  const erste = (...listen) => listen.find((liste) => Object.keys(liste || {}).length) || {};
  return bereinigeHerkunft({
    ref: readStoredReferrer() || vorher.ref || besuch.ref,
    utm: erste(vorher.utm, besuch.utm, jetzt.utm),
    einstiegsseite: vorher.einstiegsseite || besuch.einstiegsseite || jetzt.einstiegsseite,
    sparte,
    weg,
  });
}
