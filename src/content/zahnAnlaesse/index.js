// Node-Einstieg für SEO-Routen und Prüfskripte. Der Browser lädt jede
// Anlassseite einzeln über ihre eigene Seitendatei.
import behandlungSteht from './behandlung-steht-an.js';
import { ZAHN_ANLASS_BASIS_PFAD } from './gemeinsam.js';

export * from './gemeinsam.js';

export const zahnAnlassSeiten = [behandlungSteht];

export const zahnAnlassPfad = (slug) => `${ZAHN_ANLASS_BASIS_PFAD}/${slug}`;
