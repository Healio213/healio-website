import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';
import StationaerHero from '@/components/sections/stationaer/StationaerHero';
import StationaerTariffSelector from '@/components/sections/stationaer/StationaerTariffSelector';
import StationaerBenefits from '@/components/sections/stationaer/StationaerBenefits';
import StationaerFamily from '@/components/sections/stationaer/StationaerFamily';
import StationaerBonusBridge from '@/components/sections/stationaer/StationaerBonusBridge';
import StationaerTrustFaq from '@/components/sections/stationaer/StationaerTrustFaq';
import CompactBonusFeature from '@/components/sections/shared/CompactBonusFeature';
import SalesAiAssist from '@/components/sections/shared/SalesAiAssist';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';

const StationaerPage = () => {
  const { t } = useTranslation('stationaer');
  const { t: tSeo } = useTranslation('seo');
  const { lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/inpatient' : 'https://healio.de/stationaer';
  const faqItems = t('refresh.faq.items', { returnObjects: true });
  const faqs = Array.isArray(faqItems) ? faqItems : [];
  const schemaMarkup = [
    createServiceSchema(),
    createFAQSchema(faqs.map((item) => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <>
      <SEOHead
        title={tSeo('stationaer.title')}
        description={tSeo('stationaer.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={tSeo('stationaer.title')}
        ogDescription={tSeo('stationaer.description')}
        ogImage="https://healio.de/og-image.png"
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <article>
        <StationaerHero />
        {lang === 'de' && (
          <ExplainerVideoCard
            id="stationaer-erklaervideo"
            videoSrc="/erklaervideo-stationaer.mp4"
            poster="/images/erklaervideo-stationaer-poster.jpg"
            eyebrow={t('refresh.video.eyebrow')}
            title={t('refresh.video.title')}
            ariaLabel={t('refresh.video.aria')}
            className="bg-[#f4f8f6]"
          />
        )}
        <StationaerTariffSelector />
        <StationaerBenefits />
        <StationaerFamily />
        <StationaerBonusBridge />
        <CompactBonusFeature
          className="bg-[#fbfaf7]"
          calculatorProps={{
            tarifTypes: 'Stationär',
            defaultMonatsbeitrag: 33.41,
            tariffInfoText: t('bonusRechner.tariffInfo'),
            effectiveLabel: t('bonusRechner.effectiveLabel'),
            effectiveValue: t('bonusRechner.effectiveValue'),
            effectiveNote: t('bonusRechner.effectiveNote'),
            bonusPayoutText: lang === 'en'
              ? 'Your statutory-insurer bonus may offset part or up to 100% of the eligible hospital-plan premium. The applicable bonus and tariff terms determine the result.'
              : 'Dein Kassenbonus kann den anrechenbaren Beitrag deines Klinikschutzes teilweise oder bis zu 100 % ausgleichen. Maßgeblich sind die aktuellen Bonus- und Tarifbedingungen.',
          }}
        />
        <SalesAiAssist className="bg-[#fbfaf7]" />
        <StationaerTrustFaq />
      </article>
    </>
  );
};

export default StationaerPage;
