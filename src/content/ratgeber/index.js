/**
 * Zentrales Inhaltsregister fuer /ratgeber.
 *
 * Ein weiterer Artikel braucht genau drei Schritte:
 *   1. Inhaltsdatei in diesem Ordner anlegen (Muster:
 *      krankenkassen-bonus-zusatzversicherung.js),
 *   2. sie hier importieren und in ratgeberArticles eintragen,
 *   3. Eintrag in scripts/seo-routes.mjs ergaenzen (Advertorials auf
 *      noindex, organische Ratgeberartikel indexiert plus Sitemap).
 *
 * kind steuert nur den Hinweis oben auf der Seite:
 *   'advertorial' -> "Anzeige . Ratgeber von Healio"
 *   'ratgeber'    -> "Ratgeber von Healio"
 */

import { article as krankenkassenBonusZusatzversicherung } from './krankenkassen-bonus-zusatzversicherung.js';
import { article as ikkClassicBonusprogramm2026 } from './ikk-classic-bonusprogramm-2026.js';
import { article as zahnzusatzversicherungFehlenderZahn } from './zahnzusatzversicherung-fehlender-zahn.js';
import { article as schwangerZusatzversicherung } from './schwanger-zusatzversicherung.js';
import { article as schwangerschaftWoraufAchten } from './schwangerschaft-worauf-achten.js';

export const RATGEBER_BASE_PATH = '/ratgeber';

// Reihenfolge im Array ist die Reihenfolge in der Uebersicht /ratgeber.
// Die organischen Ratgeberartikel stehen vorn, das Advertorial bleibt in
// der Liste, wird dort aber als Anzeige gekennzeichnet.
export const ratgeberArticles = [
  ikkClassicBonusprogramm2026,
  zahnzusatzversicherungFehlenderZahn,
  schwangerZusatzversicherung,
  schwangerschaftWoraufAchten,
  krankenkassenBonusZusatzversicherung,
];

export const getRatgeberArticle = (slug) => (
  ratgeberArticles.find((entry) => entry.slug === slug) || null
);

export const getRatgeberPath = (slug) => `${RATGEBER_BASE_PATH}/${slug}`;

export default ratgeberArticles;
