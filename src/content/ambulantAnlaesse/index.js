// Node-Einstieg für SEO-Routen und Prüfskripte. Der Browser lädt jede
// Anlassseite einzeln über ihre eigene Seitendatei.
import osteopathie from './osteopathie.js';
import { AMBULANT_ANLASS_BASIS_PFAD } from './gemeinsam.js';

export * from './gemeinsam.js';

export const ambulantAnlassSeiten = [osteopathie];

export const ambulantAnlassPfad = (slug) => `${AMBULANT_ANLASS_BASIS_PFAD}/${slug}`;
