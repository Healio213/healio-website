// Node-Einstieg für SEO-Routen und Prüfskripte. Der Browser lädt jede
// Unterseite einzeln über ihre eigene Seitendatei.
import eltern from './eltern.js';
import selbststaendige from './selbststaendige.js';
import riester from './riester.js';
import unter25 from './unter-25.js';
import elternzeit from './elternzeit.js';
import riesterKuendigen from './riester-kuendigen.js';
import ehepartner from './ehepartner.js';
import kindergeldEndet from './kindergeld-endet.js';
import { ZIELGRUPPEN_BASIS_PFAD } from './gemeinsam.js';

export * from './gemeinsam.js';

export const zielgruppenSeiten = [eltern, selbststaendige, riester, unter25, ehepartner, elternzeit, kindergeldEndet, riesterKuendigen];

export const zielgruppenPfad = (slug) => `${ZIELGRUPPEN_BASIS_PFAD}/${slug}`;
