/**
 * AUTOMATISCH ERZEUGT von scripts/build-ratgeber-registry.mjs. Nicht von Hand
 * bearbeiten: Quelle sind die Inhaltsdateien und gliederung.js (Ablauf für
 * neue Artikel dort im Kopfkommentar).
 *
 * Je veröffentlichtem Slug ein dynamischer Import. Vite legt dadurch jede
 * Inhaltsdatei in einen eigenen Chunk, und eine Artikelseite lädt nur ihren.
 * Nur src/pages/RatgeberArtikelPage.jsx importiert diese Datei.
 */

export const RATGEBER_LOADERS = new Map([
  ['ikk-classic-bonusprogramm-2026', () => import('./ikk-classic-bonusprogramm-2026.js')],
  ['mkk-bonusprogramm-2026', () => import('./mkk-bonusprogramm-2026.js')],
  ['aok-bonusprogramm-2026', () => import('./aok-bonusprogramm-2026.js')],
  ['tk-bonusprogramm-2026', () => import('./tk-bonusprogramm-2026.js')],
  ['barmer-bonusprogramm-2026', () => import('./barmer-bonusprogramm-2026.js')],
  ['schwanger-zusatzversicherung', () => import('./schwanger-zusatzversicherung.js')],
  ['schwangerschaft-worauf-achten', () => import('./schwangerschaft-worauf-achten.js')],
  ['schwangerschaft-was-steht-mir-zu', () => import('./schwangerschaft-was-steht-mir-zu.js')],
  ['hebamme-kosten-krankenkasse', () => import('./hebamme-kosten-krankenkasse.js')],
  ['krankenkassen-bonus-zusatzversicherung', () => import('./krankenkassen-bonus-zusatzversicherung.js')],
  ['zahnersatz-kosten', () => import('./zahnersatz-kosten.js')],
  ['professionelle-zahnreinigung-kosten', () => import('./professionelle-zahnreinigung-kosten.js')],
  ['zahnimplantat-kosten', () => import('./zahnimplantat-kosten.js')],
  ['wurzelbehandlung-kosten', () => import('./wurzelbehandlung-kosten.js')],
  ['zahnkrone-kosten', () => import('./zahnkrone-kosten.js')],
  ['bonusheft-zahnarzt', () => import('./bonusheft-zahnarzt.js')],
  ['zahnzusatzversicherung-ohne-wartezeit', () => import('./zahnzusatzversicherung-ohne-wartezeit.js')],
  ['zahnzusatzversicherung-fehlender-zahn', () => import('./zahnzusatzversicherung-fehlender-zahn.js')],
]);
