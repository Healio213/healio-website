// Eine Quelle für Titel, Beschreibung und strukturierte Daten der
// Unterseiten. Seite (SEOHead) und statische HTML-Dateien (seo-routes.mjs)
// lesen dieselben Werte, damit FAQ-Schema und sichtbarer Text übereinstimmen.
import { createBreadcrumbSchema, createFAQSchema } from '../../lib/createSchemaMarkup.js';
import { ZIELGRUPPEN_BASIS_PFAD } from './gemeinsam.js';

const SITE = 'https://healio.de';

export const zielgruppenCanonical = (inhalt) => `${SITE}${ZIELGRUPPEN_BASIS_PFAD}/${inhalt.slug}`;

export function zielgruppenSchema(inhalt) {
  const url = zielgruppenCanonical(inhalt);
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
      { name: 'Altersvorsorgedepot', url: `${SITE}${ZIELGRUPPEN_BASIS_PFAD}` },
      { name: inhalt.hero.brotkrume, url },
    ]),
    createFAQSchema(inhalt.faq),
  ];
}

export function zielgruppenSeoRoute(inhalt) {
  return {
    path: `${ZIELGRUPPEN_BASIS_PFAD}/${inhalt.slug}`,
    title: inhalt.seo.title,
    description: inhalt.seo.description,
    canonical: zielgruppenCanonical(inhalt),
    lang: 'de',
    schemaMarkup: zielgruppenSchema(inhalt),
  };
}
