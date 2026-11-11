// Node-Einstieg für SEO-Routen und Prüfskripte. Der Browser lädt jede
// Anlassseite einzeln über ihre eigene Seitendatei.
import babyGeplant from './baby-geplant.js';
import { SCHWANGERSCHAFT_ANLASS_BASIS_PFAD } from './gemeinsam.js';

export * from './gemeinsam.js';

export const schwangerschaftAnlassSeiten = [babyGeplant];

export const schwangerschaftAnlassPfad = (slug) => `${SCHWANGERSCHAFT_ANLASS_BASIS_PFAD}/${slug}`;
