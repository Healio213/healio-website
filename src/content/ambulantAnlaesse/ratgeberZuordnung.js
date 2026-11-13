/**
 * Welche Ambulant-Anlassseite ein Ratgeber am Artikelende verlinkt.
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 * Seitenplan Abschnitt 6.1.
 *
 * barmer-osteopathie gehört dazu: Für Barmer-Versicherte zeigt der Rechner, dass
 * die Kasse Erwachsenen außerhalb der Schwangerschaft nichts zahlt. Die Leser von
 * mobil-krankenkasse-osteopathie rechnen mit „Meine Kasse steht nicht dabei“.
 */
import { ANLAESSE } from './gemeinsam.js';

export const AMBULANT_RATGEBER_EINSTIEGE = {
  'zusatzversicherung-osteopathie': ['osteopathie'],
  'osteopathie-kosten': ['osteopathie'],
  'osteopathie-krankenkasse': ['osteopathie'],
  'aok-osteopathie': ['osteopathie'],
  'tk-osteopathie': ['osteopathie'],
  'barmer-osteopathie': ['osteopathie'],
  'mobil-krankenkasse-osteopathie': ['osteopathie'],
};

export const getAmbulantRatgeberEinstiege = (slug) => (AMBULANT_RATGEBER_EINSTIEGE[slug] || [])
  .map((anlassSlug) => ANLAESSE.find((anlass) => anlass.slug === anlassSlug))
  .filter(Boolean);
