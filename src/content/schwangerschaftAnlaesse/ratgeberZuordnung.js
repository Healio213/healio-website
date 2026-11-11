/**
 * Welche Schwangerschafts-Anlassseite ein Ratgeber am Artikelende verlinkt.
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 * Seitenplan Abschnitt 6.1.
 *
 * Bewusst NICHT zugeordnet: Ratgeber, die vor allem Schwangere oder Eltern mit
 * Baby lesen. Für sie kommt die Seite zu spät; sie bleiben beim Weg nach
 * /schwangerschaft bzw. /stationaer.
 */
import { ANLAESSE } from './gemeinsam.js';

export const SCHWANGERSCHAFT_RATGEBER_EINSTIEGE = {
  'baby-geplant-zusatzversicherung': ['baby-geplant'],
  'familienzimmer-krankenhaus': ['baby-geplant'],
  'krankenhauszusatzversicherung-kinder': ['baby-geplant'],
  'krankenhauszusatzversicherung-ohne-wartezeit': ['baby-geplant'],
  'zusatzversicherung-kinder': ['baby-geplant'],
};

export const SCHWANGERSCHAFT_RATGEBER_AUSGESCHLOSSEN = [
  'schwanger-zusatzversicherung',
  'schwangerschaft-worauf-achten',
  'schwangerschaft-was-steht-mir-zu',
  'schwangerschaft-krankenkasse-melden',
  'tk-schwangerschaft',
  'neugeborenes-versichern',
  'babybonus-krankenkasse',
  'aok-babybonus',
  'hebamme-rufbereitschaft',
  'hebamme-kosten-krankenkasse',
  'geburtsvorbereitungskurs',
  'geburtsvorbereitungskurs-partner',
];

export const getSchwangerschaftRatgeberEinstiege = (slug) => (SCHWANGERSCHAFT_RATGEBER_EINSTIEGE[slug] || [])
  .map((anlassSlug) => ANLAESSE.find((anlass) => anlass.slug === anlassSlug))
  .filter(Boolean);
