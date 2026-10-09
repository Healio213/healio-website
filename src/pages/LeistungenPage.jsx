import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import ServicesHero, { ServicesDesktopHero } from '@/components/services/ServicesHero';
import ProtectionNavigator from '@/components/services/ProtectionNavigator';
import CoverageComparison from '@/components/services/CoverageComparison';
import HonestAdvice from '@/components/services/HonestAdvice';
import ServicesBudget from '@/components/services/ServicesBudget';
import ServicesProcess from '@/components/services/ServicesProcess';
import ServicesFinalCTA from '@/components/services/ServicesFinalCTA';
import ProductTicker from '@/components/sections/ProductTicker';
import { useLanguage } from '@/hooks/useLanguage';
import { createOrganizationSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const withoutContext = ({ '@context': _context, ...schema }) => schema;

const LeistungenPage = () => {
  const { t } = useTranslation('leistungen');
  const { lang, getPath } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/services' : 'https://healio.de/leistungen';
  const services = t('paths.items', { returnObjects: true });
  const organizationSchema = withoutContext(createOrganizationSchema());

  if (lang === 'en') {
    organizationSchema.description = 'Healio is an independent insurance broker for outpatient, dental and hospital supplementary health insurance with digital and personal support.';
  }

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...organizationSchema,
        '@id': 'https://healio.de/#organization',
      },
      {
        ...withoutContext(createWebPageSchema(t('seo.title'), t('seo.description'), canonicalUrl, lang === 'en' ? 'en' : 'de-DE')),
        '@id': `${canonicalUrl}#webpage`,
      },
      ...services.map((service) => withoutContext(createServiceSchema({
        name: service.schemaName,
        serviceType: service.schemaName,
        description: service.description,
        url: `https://healio.de${getPath(service.routeKey)}`,
        provider: { '@id': 'https://healio.de/#organization' },
        offers: { description: t('seo.offerDescription') },
      }))),
    ],
  };

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogImage="https://healio.de/images/healio-linkvorschau-v2.png"
        ogImageAlt={t('seo.ogImageAlt')}
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      {/* Experiment Handy-Conversion 10/2026: Mobil stehen die Abschnitte als
          Geschwister in einer Spalte und folgen der Reihenfolge, wie ein
          Besucher denkt (Hero, Schutz-Kompass, Budget und Finanzierung, ehrlich
          beraten, Ablauf, nächster Schritt). Die Nummern stehen an den
          Abschnitten (order-N md:order-none); ab md bleibt es ein normaler
          Block mit der bisherigen Reihenfolge. Das Textband entfällt mobil, weil
          es nur wiederholt, was die Seite ohnehin sagt. */}
      <article className="flex w-full flex-col overflow-hidden bg-white md:block">
        <ServicesDesktopHero />
        {/* Ab lg übernimmt der Szenen-Kopfbereich, die bisherige Fassung bleibt für Handy und Tablet. */}
        <div className="order-1 md:contents lg:hidden"><ServicesHero /></div>
        <div className="hidden md:block"><ProductTicker variant="leistungen" textSize="base" /></div>
        <div className="order-2 md:contents"><ProtectionNavigator /></div>
        <CoverageComparison />
        <div className="order-4 md:contents"><HonestAdvice /></div>
        <div className="order-3 md:contents"><ServicesBudget /></div>
        <div className="order-5 md:contents"><ServicesProcess /></div>
        <div className="order-6 md:contents"><ServicesFinalCTA /></div>
      </article>
    </>
  );
};

export default LeistungenPage;
