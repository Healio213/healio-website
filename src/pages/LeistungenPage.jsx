import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import ServicesHero from '@/components/services/ServicesHero';
import ProtectionNavigator from '@/components/services/ProtectionNavigator';
import CoverageComparison from '@/components/services/CoverageComparison';
import HonestAdvice from '@/components/services/HonestAdvice';
import ServicesBudget from '@/components/services/ServicesBudget';
import ServicesProcess from '@/components/services/ServicesProcess';
import ServicesFinalCTA from '@/components/services/ServicesFinalCTA';
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
        ogImage="https://healio.de/og-image.png"
        ogImageAlt={t('seo.ogImageAlt')}
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <article className="w-full overflow-hidden bg-white">
        <ServicesHero />
        <ProtectionNavigator />
        <CoverageComparison />
        <HonestAdvice />
        <ServicesBudget />
        <ServicesProcess />
        <ServicesFinalCTA />
      </article>
    </>
  );
};

export default LeistungenPage;
