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
import { article as mkkBonusprogramm2026 } from './mkk-bonusprogramm-2026.js';
import { article as aokBonusprogramm2026 } from './aok-bonusprogramm-2026.js';
import { article as tkBonusprogramm2026 } from './tk-bonusprogramm-2026.js';
import { article as barmerBonusprogramm2026 } from './barmer-bonusprogramm-2026.js';
import { article as zahnzusatzversicherungFehlenderZahn } from './zahnzusatzversicherung-fehlender-zahn.js';
import { article as schwangerZusatzversicherung } from './schwanger-zusatzversicherung.js';
import { article as schwangerschaftWoraufAchten } from './schwangerschaft-worauf-achten.js';
import { article as schwangerschaftWasStehtMirZu } from './schwangerschaft-was-steht-mir-zu.js';
import { article as hebammeKostenKrankenkasse } from './hebamme-kosten-krankenkasse.js';
import { article as zahnersatzKosten } from './zahnersatz-kosten.js';
import { article as professionelleZahnreinigungKosten } from './professionelle-zahnreinigung-kosten.js';
import { article as zahnimplantatKosten } from './zahnimplantat-kosten.js';
import { article as wurzelbehandlungKosten } from './wurzelbehandlung-kosten.js';
import { article as zahnkroneKosten } from './zahnkrone-kosten.js';
import { article as bonusheftZahnarzt } from './bonusheft-zahnarzt.js';
import { article as zahnzusatzversicherungOhneWartezeit } from './zahnzusatzversicherung-ohne-wartezeit.js';

export const RATGEBER_BASE_PATH = '/ratgeber';

// Reihenfolge im Array ist die Reihenfolge in der Uebersicht /ratgeber.
// Die organischen Ratgeberartikel stehen vorn, das Advertorial bleibt in
// der Liste, wird dort aber als Anzeige gekennzeichnet.
export const ratgeberArticles = [
  ikkClassicBonusprogramm2026,
  mkkBonusprogramm2026,
  aokBonusprogramm2026,
  tkBonusprogramm2026,
  barmerBonusprogramm2026,
  zahnzusatzversicherungFehlenderZahn,
  schwangerZusatzversicherung,
  schwangerschaftWoraufAchten,
  schwangerschaftWasStehtMirZu,
  hebammeKostenKrankenkasse,
  zahnersatzKosten,
  professionelleZahnreinigungKosten,
  zahnimplantatKosten,
  wurzelbehandlungKosten,
  zahnkroneKosten,
  bonusheftZahnarzt,
  zahnzusatzversicherungOhneWartezeit,
  krankenkassenBonusZusatzversicherung,
];

// Themengruppen der Übersicht /ratgeber. Artikel einer Gruppe erscheinen dort
// in einem eigenen Abschnitt, alle übrigen wie bisher oben in der Liste. Die
// Reihenfolge hier ist die Reihenfolge in der Gruppe; Slugs, die (noch) nicht
// im Register stehen, fallen still weg.
export const RATGEBER_GROUPS = [
  {
    id: 'zaehne',
    title: 'Zähne',
    intro: 'Was die Kasse beim Zahnarzt zahlt, was an dir hängen bleibt und wann eine Zahnzusatzversicherung hilft. Mit Kosten, Quellen und den Grenzen.',
    icon: 'dental',
    slugs: [
      'zahnersatz-kosten',
      'professionelle-zahnreinigung-kosten',
      'zahnimplantat-kosten',
      'wurzelbehandlung-kosten',
      'zahnkrone-kosten',
      'bonusheft-zahnarzt',
      'zahnzusatzversicherung-ohne-wartezeit',
      'zahnzusatzversicherung-fehlender-zahn',
    ],
  },
];

export const getRatgeberGroupArticles = (group) => group.slugs
  .map((slug) => ratgeberArticles.find((entry) => entry.slug === slug))
  .filter(Boolean);

const GROUPED_SLUGS = new Set(RATGEBER_GROUPS.flatMap((group) => group.slugs));
export const ungroupedRatgeberArticles = () => ratgeberArticles.filter((entry) => !GROUPED_SLUGS.has(entry.slug));

export const getRatgeberArticle = (slug) => (
  ratgeberArticles.find((entry) => entry.slug === slug) || null
);

export const getRatgeberPath = (slug) => `${RATGEBER_BASE_PATH}/${slug}`;

export default ratgeberArticles;
