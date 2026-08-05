import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyRealityCheck from '@/components/company/CompanyRealityCheck';
import CohortImpactSection from '@/components/company/CohortImpactSection';
import ResponsibilityStory from '@/components/company/ResponsibilityStory';
import CompanySolutions from '@/components/company/CompanySolutions';
import CompanyEconomics from '@/components/company/CompanyEconomics';
import CompanyProcess from '@/components/company/CompanyProcess';
import CompanyFAQ from '@/components/company/CompanyFAQ';
import CompanyWorkforceConcept from '@/components/company/CompanyWorkforceConcept';
import CompanyFinalCTA from '@/components/company/CompanyFinalCTA';
import ProductTicker from '@/components/sections/ProductTicker';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';

const UnternehmenPage = () => {
  const { t } = useTranslation('unternehmen');
  const { lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/companies' : 'https://healio.de/unternehmen';
  const schemaMarkup = [
    createWebPageSchema(t('seo.title'), t('seo.description'), canonicalUrl, lang === 'en' ? 'en-US' : 'de-DE'),
    createOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: lang === 'en' ? 'Healio corporate benefits management' : 'Healio betriebliches Vorsorgemanagement',
      description: t('seo.description'),
      url: canonicalUrl,
      serviceType: lang === 'en'
        ? ['Corporate pension', 'Corporate health insurance', 'Workplace wellbeing coordination and prevention']
        : ['Betriebliche Altersvorsorge', 'Betriebliche Krankenversicherung', 'BGM-Koordination und Prävention'],
      provider: {
        '@type': 'Organization',
        name: 'Healio GmbH',
        url: 'https://healio.de',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Germany',
      },
    },
  ];

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('seo.title')}
        ogDescription={t('seo.description')}
        ogImage="https://healio.de/images/healio-hero-markenrelief-v1.webp"
        ogImageWidth={1586}
        ogImageHeight={992}
        ogImageAlt={lang === 'en' ? 'Healio brand relief for corporate benefits management' : 'Healio Markenrelief für betriebliches Vorsorgemanagement'}
        ogUrl={canonicalUrl}
        alternateUrls={{
          de: 'https://healio.de/unternehmen',
          en: 'https://healio.de/en/companies',
        }}
        schemaMarkup={schemaMarkup}
      />

      <article className="w-full overflow-hidden bg-white">
        <CompanyHero />
        <ProductTicker variant="unternehmen" />
        <CompanyRealityCheck />
        <CompanySolutions />
        <CohortImpactSection />
        <ResponsibilityStory />
        <CompanyEconomics />
        <CompanyProcess />
        <CompanyFAQ />
        <CompanyWorkforceConcept />
        <CompanyFinalCTA />
      </article>
    </>
  );
};

export default UnternehmenPage;
