/**
 * Welche Anfrageseiten unter /altersvorsorgedepot/… ein Altersvorsorge-
 * Ratgeber am Artikelende verlinkt, in dieser Reihenfolge.
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 */
import { EINGAENGE } from './gemeinsam.js';

export const RATGEBER_EINSTIEGE = {
  'altersvorsorgedepot-kinderzulage': ['eltern', 'elternzeit', 'kindergeld-endet'],
  'altersvorsorgedepot-kinderzulage-elternteil': ['eltern', 'ehepartner', 'elternzeit'],
  'altersvorsorgedepot-teilzeit-elternzeit': ['elternzeit', 'eltern', 'ehepartner'],
  'altersvorsorgedepot-kindergeld-ende': ['kindergeld-endet', 'eltern', 'unter-25'],
  'altersvorsorgedepot-selbststaendige': ['selbststaendige', 'riester', 'eltern'],
  'altersvorsorgedepot-schwankendes-einkommen': ['selbststaendige', 'riester'],
  'altersvorsorgedepot-heilpraktiker': ['selbststaendige', 'eltern'],
  'altersvorsorgedepot-oder-ruerup': ['selbststaendige', 'riester'],
  'riester-alte-oder-neue-foerderung': ['riester', 'riester-kuendigen', 'eltern'],
  'riester-altersvorsorgedepot-wechsel': ['riester', 'riester-kuendigen'],
  'riester-jahresmitteilung-checkliste': ['riester', 'riester-kuendigen'],
  'riester-kuendigen-oder-behalten': ['riester-kuendigen', 'riester'],
  'altersvorsorgedepot-wer-ist-berechtigt': ['selbststaendige', 'ehepartner', 'unter-25', 'elternzeit'],
  'altersvorsorgedepot-foerderung': ['eltern', 'unter-25', 'selbststaendige'],
  'altersvorsorgedepot-was-ist-das': ['eltern', 'selbststaendige', 'riester', 'unter-25'],
  'altersvorsorgedepot-ab-wann': ['unter-25', 'selbststaendige', 'riester'],
  'altersvorsorgedepot-kosten': ['riester', 'selbststaendige'],
  'altersvorsorgedepot-garantie': ['riester', 'riester-kuendigen'],
  'altersvorsorgedepot-etf-sparplan': ['unter-25', 'selbststaendige'],
  'altersvorsorgedepot-steuern': ['selbststaendige', 'eltern'],
  'altersvorsorgedepot-geld-entnehmen': ['riester-kuendigen', 'unter-25'],
  'altersvorsorgedepot-auszahlung': ['riester', 'selbststaendige'],
  'altersvorsorgedepot-anbieterwechsel': ['riester', 'riester-kuendigen'],
  'altersvorsorgedepot-passt-das-zu-mir': ['eltern', 'selbststaendige', 'riester', 'unter-25'],
};

export const getRatgeberEinstiege = (slug) => (RATGEBER_EINSTIEGE[slug] || [])
  .map((eingangSlug) => EINGAENGE.find((eingang) => eingang.slug === eingangSlug))
  .filter(Boolean);
