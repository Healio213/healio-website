// Eine Quelle für Titel, Beschreibung und strukturierte Daten der Zahn-
// Anlassseiten. Seite (SEOHead) und statische HTML-Dateien (seo-routes.mjs)
// lesen dieselben Werte, damit FAQ-Schema und sichtbarer Text übereinstimmen.
import { createBreadcrumbSchema, createFAQSchema } from '../../lib/createSchemaMarkup.js';
import { ZAHN_ANLASS_BASIS_PFAD, ZAHN_SEITE_PFAD } from './gemeinsam.js';

const SITE = 'https://healio.de';

export const zahnAnlassCanonical = (inhalt) => `${SITE}${ZAHN_ANLASS_BASIS_PFAD}/${inhalt.slug}`;

export function zahnAnlassSchema(inhalt) {
  const url = zahnAnlassCanonical(inhalt);
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
      { name: 'Zahnzusatzversicherung', url: `${SITE}${ZAHN_SEITE_PFAD}` },
      { name: inhalt.hero.brotkrume, url },
    ]),
    createFAQSchema(inhalt.faq),
  ];
}

export function zahnAnlassSeoRoute(inhalt) {
  return {
    path: `${ZAHN_ANLASS_BASIS_PFAD}/${inhalt.slug}`,
    title: inhalt.seo.title,
    description: inhalt.seo.description,
    canonical: zahnAnlassCanonical(inhalt),
    lang: 'de',
    schemaMarkup: zahnAnlassSchema(inhalt),
  };
}
