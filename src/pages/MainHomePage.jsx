import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import HomeHero from '@/components/home/HomeHero';
import HomeContributionExample from '@/components/home/HomeContributionExample';
import GuidedJourney from '@/components/guided/GuidedJourney';
import { GUIDED_CALLBACK_ENABLED } from '@/lib/guided-callback';
import DesktopHomeJourney from '@/components/desktop/DesktopHomeJourney';
import InsurancePathway from '@/components/home/InsurancePathway';
import HowHealioWorks from '@/components/home/HowHealioWorks';
import HomeTrust from '@/components/home/HomeTrust';
import AudienceLinks from '@/components/home/AudienceLinks';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';
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
        ogImage="https://healio.de/images/healio-linkvorschau-v2.png"
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <article className="w-full overflow-hidden bg-white">
        <HomeHero />
        {/* Erklärfilm Startseite (V2 seit 11.10.2026, nur Deutsch): eine schlanke Karte
            direkt nach dem Einstieg, danach Ablauf und Produkte wie bisher. */}
        {lang === 'de' && (
          <ExplainerVideoCard
            id="startseite-erklaervideo"
            videoSrc="/videos/erklaerfilme/erklaervideo-startseite-v2.mp4"
            poster="/videos/erklaerfilme/erklaervideo-startseite-v2-poster.jpg"
            captionsSrc="/videos/erklaerfilme/erklaervideo-startseite-v2-de.vtt"
            eyebrow={t('explanationVideo.eyebrow')}
            title={<><span className="md:hidden">{t('mobile.explanationVideo.title')}</span><span className="hidden md:inline">{t('explanationVideo.title')}</span></>}
            subtitle={t('explanationVideo.subtitle')}
            disclosure={t('explanationVideo.disclosure')}
            ariaLabel={t('explanationVideo.aria')}
            className="bg-white"
          />
        )}
        {GUIDED_CALLBACK_ENABLED ? <GuidedJourney product="any" showImages /> : <HomeContributionExample language={lang} />}
        <DesktopHomeJourney language={lang} />
        <div className="lg:hidden">
        <HowHealioWorks />
        <InsurancePathway />
        <HomeTrust />
        <HomeFinalCTA />
        {/* Experiment Handy-Conversion 10/2026: Der Abschnitt wiederholt die Hero-Karten
            „Unternehmen“ und „Praxis“ samt Knöpfen; am Handy ausgeblendet. Beide Wege bleiben
            über die Wischkarten im Einstieg und über das Menü erreichbar. Ab md unverändert. */}
        <div className="hidden md:block">
          <AudienceLinks />
        </div>
        </div>
      </article>
    </>
  );
};

export default MainHomePage;
