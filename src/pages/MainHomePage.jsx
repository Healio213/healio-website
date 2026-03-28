
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema } from '@/lib/createSchemaMarkup';
import { FadeInUp } from '@/components/ui/ScrollAnimation';

// Eagerly load the Hero section as it's above the fold (LCP)
import HeroSection from '@/components/sections/HeroSection';

// Lazy load below-the-fold components to reduce initial bundle size
const CompoundInterestCalculator = React.lazy(() => import('@/components/sections/CompoundInterestCalculator'));
const BavProviderComparison = React.lazy(() => import('@/components/sections/BavProviderComparison'));
const CombinedZeitfalleRenditeSection = React.lazy(() => import('@/components/sections/CombinedZeitfalleRenditeSection'));
const GesundheitSection = React.lazy(() => import('@/components/sections/GesundheitSection'));
const WhyBkvWithHealio = React.lazy(() => import('@/components/sections/WhyBkvWithHealio'));
const Contact = React.lazy(() => import('@/components/sections/Contact'));

// Fallback loader for lazy components
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 min-h-[300px]">
    <div className="w-8 h-8 border-4 border-[#25c990] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const MainHomePage = () => {
  const { t } = useTranslation('home');
  const { t: tSeo } = useTranslation('seo');

  const schemaMarkup = {
    ...createOrganizationSchema(),
    description: "Spezialisiert auf betriebliche Altersvorsorge (bAV) und betriebliche Krankenversicherung (bKV) für Unternehmen.",
    areaServed: "DE",
    serviceType: ["Corporate Pension Consulting", "Corporate Health Insurance"]
  };

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl="https://www.healio.de/"
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogImage="https://www.healio.de/og-image-b2b.png"
        ogUrl="https://www.healio.de/"
        schemaMarkup={schemaMarkup}
      />
      <main className="w-full">
        {/* Critical LCP component loaded immediately */}
        <HeroSection />

        {/* Defer loading of all below-the-fold sections */}
        <Suspense fallback={<SectionLoader />}>

          <FadeInUp>
            <BavProviderComparison />
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <CompoundInterestCalculator />
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <CombinedZeitfalleRenditeSection />
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <GesundheitSection />
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <WhyBkvWithHealio />
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div id="contact">
              <Contact />
            </div>
          </FadeInUp>
        </Suspense>
      </main>
    </>
  );
};

export default MainHomePage;
