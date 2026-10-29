import React, { useState } from 'react';
import { GUIDED_CALLBACK_ENABLED } from '@/lib/guided-callback';
import GuidedJourney from '@/components/guided/GuidedJourney';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import DesktopLead from '@/components/desktop/DesktopLead';
import AmbulantConversionFlow, { AmbulantExplainerVideo, getAmbulantCompactFaqs } from '@/components/sections/ambulant/AmbulantConversionFlow';
import HealioAwardsRow from '@/components/sections/shared/HealioAwardsRow';
import AmbulantAufEinenBlick from '@/components/sections/ambulant/AmbulantAufEinenBlick';
import AmbulantBrilleKarte from '@/components/sections/ambulant/AmbulantBrilleKarte';
import AmbulantVergleichTeaser from '@/components/sections/ambulant/AmbulantVergleichTeaser';
import AmbulantBonusFeature from '@/components/sections/ambulant/AmbulantBonusFeature';

const AmbulantPage = () => {
  const { t } = useTranslation('seo');
  const { pathname, search } = useLocation();
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const [geburtsjahrEingabe, setGeburtsjahrEingabe] = useState('');
  // These codes identify only the entry path, never a completed bonus check
  // or a verified personal result. No amounts or health details are imported.
  const originCode = new URLSearchParams(search).get('src');
  const fromBonusTopic = pathname === '/ambulant'
    && (originCode === 'reel-f05' || originCode === 'bonus-check');
  const isHeilpraktikerLanding = pathname === '/heilpraktiker-zusatzversicherung';
  const seoTitle = isHeilpraktikerLanding
    ? 'Heilpraktiker Zusatzversicherung mit bis zu 3.000 EUR Budget | Healio'
    : t('ambulant.title');
  const seoDescription = isHeilpraktikerLanding
    ? 'Vergleiche ambulante Zusatzversicherungen für Heilpraktiker, Osteopathie, Brille und Vorsorge. Bis zu 3.000 EUR Gesundheitsbudget in zwei Jahren.'
    : t('ambulant.description');
  const canonicalPath = isHeilpraktikerLanding
    ? '/heilpraktiker-zusatzversicherung'
    : language === 'en' ? '/en/outpatient' : '/ambulant';
  const canonicalUrl = `https://healio.de${canonicalPath}`;
  const faqItems = getAmbulantCompactFaqs(language, fromBonusTopic);
  const schemaMarkup = [
    createWebPageSchema(seoTitle, seoDescription, canonicalUrl, language === 'en' ? 'en-US' : 'de-DE'),
    createServiceSchema({
      serviceType: language === 'en' ? 'Outpatient supplementary insurance and health budget' : 'Ambulante Zusatzversicherung und Gesundheitsbudget',
      name: language === 'en' ? 'Healio outpatient health budget comparison' : 'Healio Vergleich für ambulanten Zusatzschutz',
      description: seoDescription,
      url: canonicalUrl,
      availableChannel: { serviceUrl: canonicalUrl },
      offers: {
        description: language === 'en'
          ? 'Digital tariff and premium comparison with optional statutory insurer bonus check'
          : fromBonusTopic
            ? 'Digitaler Tarif- und Beitragsvergleich. Kassenbonus und Zusatzschutz bleiben getrennte Entscheidungen.'
            : 'Digitaler Tarif- und Beitragsvergleich mit anschließendem Kassenbonus-Check',
      },
    }),
    createFAQSchema(faqItems.map((faq) => ({ question: faq.q, answer: faq.a }))),
  ];

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} canonicalUrl={canonicalUrl} schemaMarkup={schemaMarkup} />
      {/* Der Bonusrechner steht direkt unter dem Einstieg. Tarifwahl und
          Rechner teilen sich den Jahrgang, ohne ihn dauerhaft zu speichern. */}
      <div className="flex min-h-screen flex-col bg-white md:block">
        <DesktopLead surface="ambulant" language={lang} fromBonusTopic={fromBonusTopic} />
        <div className="order-1 md:order-none lg:hidden">
          <AmbulantHero fromBonusTopic={fromBonusTopic} />
        </div>
        <AmbulantBonusFeature geburtsjahrEingabe={geburtsjahrEingabe} fromBonusTopic={fromBonusTopic} />
        {/* Gleiche order-Stufe wie Hero und Bonusrechner; die Quellreihenfolge
            hält „Auf einen Blick“ vor dem Film. */}
        <div className="order-1 md:contents">
          <AmbulantAufEinenBlick fromBonusTopic={fromBonusTopic} />
        </div>
        {/* Frank 10.10.: Film unter dem Einstieg, vor Siegeln und Karten. */}
        <div className="order-2 md:contents">
          <AmbulantExplainerVideo />
        </div>
        {GUIDED_CALLBACK_ENABLED && <div className="order-2 md:order-none"><GuidedJourney product="ambulant" /></div>}
        <div className="order-3 md:contents">
          <HealioAwardsRow size="large" mobileWithIkk={!fromBonusTopic} />
        </div>
        {/* Die Brillen-Karte bleibt mobil als konkreter Einstieg erhalten. */}
        <div className="order-4 md:contents">
          <AmbulantBrilleKarte />
        </div>
        <AmbulantConversionFlow fromBonusTopic={fromBonusTopic} geburtsjahrEingabe={geburtsjahrEingabe} setGeburtsjahrEingabe={setGeburtsjahrEingabe} />
        {/* Frank 15.10.: Verweis auf den Tarifvergleich unter allen Abschnitten. */}
        <div className="order-[12] md:order-none"><AmbulantVergleichTeaser /></div>
      </div>
    </>
  );
};

export default AmbulantPage;
