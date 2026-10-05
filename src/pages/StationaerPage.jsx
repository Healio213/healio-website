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
import StationaerBayerischeAlternative from '@/components/sections/stationaer/StationaerBayerischeAlternative';
import AmbulantIKKWechsel from '@/components/sections/ambulant/AmbulantIKKWechsel';
import HealioAwardsRow from '@/components/sections/shared/HealioAwardsRow';
import ZweiWegeFinanzierung from '@/components/sections/shared/ZweiWegeFinanzierung';
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
        {/* Siegel direkt unter dem Hero, wie auf /ambulant und /partner. */}
        <HealioAwardsRow size="large" productSet="stationaer" />
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
        {/* Zweiter Klinik-Versicherer direkt nach der SDK-Tarifwahl. */}
        <StationaerBayerischeAlternative />
        <StationaerBenefits />
        <StationaerFamily />
        {/* Zwei-Wege-Botschaft direkt vor dem KassenBoost-Abschnitt. */}
        <ZweiWegeFinanzierung produkt="stationaer" />
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
              ? 'With SP1 and SP2 your statutory-insurer bonus may offset part of the eligible hospital-plan premium, with the affordable SPU even all of it. The applicable bonus and tariff terms determine the result.'
              : 'Bei SP1 und SP2 kann dein Kassenbonus den anrechenbaren Beitrag deines Klinikschutzes teilweise ausgleichen, beim günstigen SPU auch ganz. Maßgeblich sind die aktuellen Bonus- und Tarifbedingungen.',
          }}
        />
        {/* Brücken-Strecke nach dem Bonusrechner, wie auf /ambulant. */}
        <AmbulantIKKWechsel variant="stationaer" />
        <SalesAiAssist className="bg-[#fbfaf7]" />
        <StationaerTrustFaq />
      </article>
    </>
  );
};

export default StationaerPage;
