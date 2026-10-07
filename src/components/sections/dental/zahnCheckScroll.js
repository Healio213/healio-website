// Experiment Handy-Conversion 10/2026: gemeinsamer Sprung zum Zahn-Check.
// Am Handy (unter md, 768 px) führen alle Knöpfe zum Check direkt zur
// Fragekarte statt zum Abschnittsanfang, damit nach dem Sprung die erste
// Antwort im ersten Bild steht. Ab md bleibt es beim Sprung zum Abschnitt,
// genau wie vorher. Das ist nur eine Scrollrichtung beim Klick, kein Inhalt.
const SECTION_ID = 'zahn-check';
const CARD_ID = 'zahn-check-karte';

export const ZAHN_CHECK_CARD_ID = CARD_ID;

export const scrollToZahnCheck = (reduceMotion) => {
  const phone = typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 767px)').matches;
  const target = (phone && document.getElementById(CARD_ID)) || document.getElementById(SECTION_ID);
  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};
