/**
 * Welche Zahn-Anlassseite ein Zahn-Ratgeber am Artikelende verlinkt.
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 * Seitenplan Abschnitt 6.1.
 *
 * Bewusst NICHT zugeordnet (die Bayerische nimmt diese Fälle nicht an):
 * zahnimplantat-kosten, zahnbruecke-kosten, zahnprothese-kosten,
 * zahnzusatzversicherung-fehlender-zahn, parodontitis-behandlung-kosten,
 * weisheitszaehne-ziehen-kosten sowie alle Zahnspangen-, Kinder-, Familien-,
 * Senioren- und Zahnreinigungs-Ratgeber.
 */
import { ANLAESSE } from './gemeinsam.js';

export const ZAHN_RATGEBER_EINSTIEGE = {
  'zahnzusatzversicherung-laufende-behandlung': ['behandlung-steht-an'],
  'zahnzusatzversicherung-sofort-2026': ['behandlung-steht-an'],
  'zahnzusatzversicherung-ohne-wartezeit': ['behandlung-steht-an'],
  'bayerische-zahnzusatzversicherung': ['behandlung-steht-an'],
  'heil-und-kostenplan': ['behandlung-steht-an'],
  'zahnkrone-kosten': ['behandlung-steht-an'],
  'zahnkrone-rausgefallen': ['behandlung-steht-an'],
  'wurzelbehandlung-kosten': ['behandlung-steht-an'],
  'zahnfuellung-kosten': ['behandlung-steht-an'],
  'zahnersatz-kosten': ['behandlung-steht-an'],
  'zahnersatz-haertefall': ['behandlung-steht-an'],
  'bonusheft-zahnarzt': ['behandlung-steht-an'],
  'zahnzusatzversicherung-lohnt-sich': ['behandlung-steht-an'],
  'zahnzusatzversicherung-kosten': ['behandlung-steht-an'],
  'zahnzusatzversicherung-vergleich': ['behandlung-steht-an'],
};

export const ZAHN_RATGEBER_AUSGESCHLOSSEN = [
  'zahnimplantat-kosten',
  'zahnbruecke-kosten',
  'zahnprothese-kosten',
  'zahnzusatzversicherung-fehlender-zahn',
  'parodontitis-behandlung-kosten',
  'weisheitszaehne-ziehen-kosten',
];

export const getZahnRatgeberEinstiege = (slug) => (ZAHN_RATGEBER_EINSTIEGE[slug] || [])
  .map((anlassSlug) => ANLAESSE.find((anlass) => anlass.slug === anlassSlug))
  .filter(Boolean);
