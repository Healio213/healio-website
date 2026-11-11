// Eine Quelle für Titel, Beschreibung und strukturierte Daten der Schwangerschafts-
// Anlassseiten. Seite (SEOHead) und statische HTML-Dateien (seo-routes.mjs)
// lesen dieselben Werte, damit FAQ-Schema und sichtbarer Text übereinstimmen.
import { createBreadcrumbSchema, createFAQSchema } from '../../lib/createSchemaMarkup.js';
import { SCHWANGERSCHAFT_ANLASS_BASIS_PFAD, SCHWANGERSCHAFT_SEITE_PFAD } from './gemeinsam.js';

const SITE = 'https://healio.de';

export const schwangerschaftAnlassCanonical = (inhalt) => `${SITE}${SCHWANGERSCHAFT_ANLASS_BASIS_PFAD}/${inhalt.slug}`;

export function schwangerschaftAnlassSchema(inhalt) {
  const url = schwangerschaftAnlassCanonical(inhalt);
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
      { name: 'Schwangerschaft', url: `${SITE}${SCHWANGERSCHAFT_SEITE_PFAD}` },
      { name: inhalt.hero.brotkrume, url },
    ]),
    createFAQSchema(inhalt.faq),
  ];
}

export function schwangerschaftAnlassSeoRoute(inhalt) {
  return {
    path: `${SCHWANGERSCHAFT_ANLASS_BASIS_PFAD}/${inhalt.slug}`,
    title: inhalt.seo.title,
    description: inhalt.seo.description,
    canonical: schwangerschaftAnlassCanonical(inhalt),
    lang: 'de',
    schemaMarkup: schwangerschaftAnlassSchema(inhalt),
  };
}
