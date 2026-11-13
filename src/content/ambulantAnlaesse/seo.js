// Eine Quelle für Titel, Beschreibung und strukturierte Daten der Ambulant-
// Anlassseiten. Seite (SEOHead) und statische HTML-Dateien (seo-routes.mjs)
// lesen dieselben Werte, damit FAQ-Schema und sichtbarer Text übereinstimmen.
import { createBreadcrumbSchema, createFAQSchema } from '../../lib/createSchemaMarkup.js';
import { AMBULANT_ANLASS_BASIS_PFAD, AMBULANT_SEITE_PFAD } from './gemeinsam.js';

const SITE = 'https://healio.de';

export const ambulantAnlassCanonical = (inhalt) => `${SITE}${AMBULANT_ANLASS_BASIS_PFAD}/${inhalt.slug}`;

export function ambulantAnlassSchema(inhalt) {
  const url = ambulantAnlassCanonical(inhalt);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: inhalt.hero.h1,
      description: inhalt.seo.description,
      inLanguage: 'de-DE',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
    },
    createBreadcrumbSchema([
      { name: 'Ambulant', url: `${SITE}${AMBULANT_SEITE_PFAD}` },
      { name: inhalt.hero.brotkrume, url },
    ]),
    createFAQSchema(inhalt.faq),
  ];
}

export function ambulantAnlassSeoRoute(inhalt) {
  return {
    path: `${AMBULANT_ANLASS_BASIS_PFAD}/${inhalt.slug}`,
    title: inhalt.seo.title,
    description: inhalt.seo.description,
    canonical: ambulantAnlassCanonical(inhalt),
    lang: 'de',
    schemaMarkup: ambulantAnlassSchema(inhalt),
  };
}
