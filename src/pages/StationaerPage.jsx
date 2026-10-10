import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';
import StationaerHero from '@/components/sections/stationaer/StationaerHero';
import StationaerRoomCosts from '@/components/sections/stationaer/StationaerRoomCosts';
import DesktopLead from '@/components/desktop/DesktopLead';
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
import ZielseitenKontakt from '@/components/sections/shared/ZielseitenKontakt';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';

// Mobile Reihenfolge (unter md): Die Abschnitte stehen als Geschwister in einem
// Flex-Container und bekommen über "order" ihren Platz im Besucher-Ablauf:
// Einstieg, Erklärvideo, Kostenhilfe, Siegel, Tarif wählen, weitere Tarife, Details,
// Kontakt für Rückfragen, Finanzierung und Bonus, Familie, Fragen. Familie
// steht mobil hinter dem Bonus, damit die Finanzierung früher kommt und der
// Kontaktblock nicht erst nach rund 14 Bildschirmen auftaucht (Experiment
// Handy-Conversion 10/2026). Ab md (768 px) gilt
// "md:order-none", der Container ist wieder ein Block und alles steht in der
// Reihenfolge des Quelltexts wie bisher. Der Umhüllende ist ein normales
// Block-Element ohne eigenes Aussehen.
const Slot = ({ order, children }) => <div className={`${order} md:order-none`}>{children}</div>;

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
        ogImage="https://healio.de/images/healio-linkvorschau-v2.png"
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <article className="flex flex-col md:block">
        <Slot order="order-1">
          <DesktopLead surface="stationaer" language={lang} />
          <div className="lg:hidden">
            <StationaerHero />
          </div>
        </Slot>
        {lang === 'de' && (
          <Slot order="order-2">
            <ExplainerVideoCard
              id="stationaer-erklaervideo"
              videoSrc="/videos/erklaerfilme/erklaervideo-stationaer-v1.mp4"
              poster="/videos/erklaerfilme/erklaervideo-stationaer-v1-poster.jpg"
              captionsSrc="/videos/erklaerfilme/erklaervideo-stationaer-v1-de.vtt"
              eyebrow={t('refresh.video.eyebrow')}
              title={t('refresh.video.title')}
              subtitle="Das Video erklärt die SDK-Klinik-Tarife. Die DKV-Alternative nur fürs Einbettzimmer findest du unten in der Tarifwahl."
              ariaLabel={t('refresh.video.aria')}
              className="bg-[#f4f8f6]"
            />
          </Slot>
        )}
        <Slot order="order-3">
          <StationaerRoomCosts />
        </Slot>
        <Slot order="order-4">
          <HealioAwardsRow size="large" productSet="stationaer" />
        </Slot>
        <Slot order="order-6">
          <StationaerTariffSelector />
        </Slot>
        {/* Zweiter Klinik-Versicherer direkt nach der SDK-Tarifwahl. */}
        <Slot order="order-7">
          <StationaerBayerischeAlternative />
        </Slot>
        {/* Die konkreten Tarifwege stehen vor den ausführlichen SDK-Details,
            damit die Einbettzimmer-Alternative auf Mobil früh erreichbar ist. */}
        <Slot order="order-7">
          <StationaerBenefits />
        </Slot>
        {/* Familie, Kinder und Hebamme: mobil hinter Finanzierung und Bonus
            (order-13). Der Anker #familie
            bleibt erreichbar, ab md ändert sich die Reihenfolge nicht. */}
        <Slot order="order-[13]">
          <StationaerFamily />
        </Slot>
        {/* Zwei-Wege-Botschaft direkt vor dem KassenBoost-Abschnitt. Der Link zu
            /kassenboost steht mobil gleich darunter in der Bonus-Brücke noch
            einmal; die Option blendet ihn hier unter md aus (Experiment
            Handy-Conversion 10/2026, wirkt sobald der Baustein sie kennt). */}
        <Slot order="order-9">
          <ZweiWegeFinanzierung produkt="stationaer" mobileSwipe hideLinkOnMobile />
        </Slot>
        <Slot order="order-10">
          <StationaerBonusBridge />
        </Slot>
        <Slot order="order-11">
          <CompactBonusFeature
            className="bg-[#fbfaf7]"
            mobileSwipe
            calculatorProps={{
              tarifTypes: 'Stationär',
              defaultMonatsbeitrag: 33.41,
              tariffInfoText: t('bonusRechner.tariffInfo'),
              effectiveLabel: t('bonusRechner.effectiveLabel'),
              effectiveValue: t('bonusRechner.effectiveValue'),
              effectiveNote: t('bonusRechner.effectiveNote'),
              bonusPayoutText: lang === 'en'
                ? 'With SP1 and SP2 your statutory-insurer bonus usually offsets part of the eligible hospital-plan premium, with the affordable SPU often all of it. The applicable bonus and tariff terms determine the result.'
                : 'Bei SP1 und SP2 gleicht dein Kassenbonus den anrechenbaren Beitrag deines Klinikschutzes meist teilweise aus, beim günstigen SPU oft ganz. Maßgeblich sind die aktuellen Bonus- und Tarifbedingungen.',
            }}
          />
        </Slot>
        {/* Brücken-Strecke nach dem Bonusrechner, wie auf /ambulant. */}
        <Slot order="order-12">
          <AmbulantIKKWechsel variant="stationaer" mobileSwipe />
        </Slot>
        <Slot order="order-[14]">
          <SalesAiAssist className="bg-[#fbfaf7]" />
        </Slot>
        {/* Gleicher Kontaktblock wie auf /ambulant und /zahn (Marktanalyse W6).
            Mobil direkt hinter Tarifwahl und zweitem Versicherer (order-8),
            damit eine Rückfrage früh möglich ist (Experiment Handy-Conversion
            10/2026); ab md bleibt er am Ende vor den Fragen. */}
        <Slot order="order-8">
          <ZielseitenKontakt placement="stationaer" className="bg-[#fbfaf7]" />
        </Slot>
        <Slot order="order-last">
          <StationaerTrustFaq />
        </Slot>
      </article>
    </>
  );
};

export default StationaerPage;
