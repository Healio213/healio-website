import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import AmbulantConversionFlow, { getAmbulantCompactFaqs } from '@/components/sections/ambulant/AmbulantConversionFlow';

const AmbulantPage = () => {
  const { t } = useTranslation('seo');
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
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
  const faqItems = getAmbulantCompactFaqs(language);
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
          : 'Digitaler Tarif- und Beitragsvergleich mit anschließendem Kassenbonus-Check',
      },
    }),
    createFAQSchema(faqItems.map((faq) => ({ question: faq.q, answer: faq.a }))),
  ];

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} canonicalUrl={canonicalUrl} schemaMarkup={schemaMarkup} />
      <div className="min-h-screen bg-white">
        <AmbulantHero />
        <AmbulantConversionFlow />
      </div>
    </>
  );
};

export default AmbulantPage;
