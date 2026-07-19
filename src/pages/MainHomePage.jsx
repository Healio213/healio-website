import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import HomeHero from '@/components/home/HomeHero';
import InsurancePathway from '@/components/home/InsurancePathway';
import HowHealioWorks from '@/components/home/HowHealioWorks';
import AmbulantBudgetFeature from '@/components/home/AmbulantBudgetFeature';
import HomeTrust from '@/components/home/HomeTrust';
import AudienceLinks from '@/components/home/AudienceLinks';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';
import { useLanguage } from '@/hooks/useLanguage';
import { createOrganizationSchema, createServiceSchema } from '@/lib/createSchemaMarkup';

const withoutContext = ({ '@context': _context, ...schema }) => schema;

const MainHomePage = () => {
  const { t } = useTranslation('home');
  const { lang, getPath } = useLanguage();
  const products = t('products.items', { returnObjects: true });
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en' : 'https://healio.de/';

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...withoutContext(createOrganizationSchema()),
        '@id': 'https://healio.de/#organization',
      },
      ...products.map((product) => withoutContext(createServiceSchema({
        name: product.title,
        serviceType: `${product.label} Krankenzusatzversicherung`,
        description: product.description,
        url: `https://healio.de${getPath(product.routeKey)}`,
        provider: { '@id': 'https://healio.de/#organization' },
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
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <article className="w-full overflow-hidden bg-white">
        <HomeHero />
        <InsurancePathway />
        <AmbulantBudgetFeature />
        <HowHealioWorks />
        <HomeTrust />
        <AudienceLinks />
        <HomeFinalCTA />
      </article>
    </>
  );
};

export default MainHomePage;
