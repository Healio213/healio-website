// Herkunft des Besuchs sammeln (12.11.2026). Nutzt nur, was die Website schon
// erfasst: den Werber- oder Partnercode ?ref= (src/lib/referrer.js, im
// Arbeitsspeicher, beim Klick auf eigene Links als ?ref= weitergereicht) und
// die geprüften utm-Kennzeichen samt Einstiegsseite vom ersten Laden
// (src/lib/analytics.js). Nichts davon wird hier gespeichert.
import { einstiegsHerkunft } from '@/lib/analytics';
import { readStoredReferrer } from '@/lib/referrer';
import { bereinigeHerkunft } from './vertrag';

export function sammleHerkunft({ sparte = null, weg = null, mitgebracht = null } = {}) {
  const jetzt = einstiegsHerkunft();
  const vorher = mitgebracht || {};
  const utm = Object.keys(vorher.utm || {}).length ? vorher.utm : jetzt.utm;
  return bereinigeHerkunft({
    ref: readStoredReferrer() || vorher.ref,
    utm,
    einstiegsseite: vorher.einstiegsseite || jetzt.einstiegsseite,
    sparte,
    weg,
  });
}
