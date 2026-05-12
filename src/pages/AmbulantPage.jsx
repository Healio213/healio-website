
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import { FadeInUp } from '@/components/ui/ScrollAnimation';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import AmbulantTicker from '@/components/sections/ambulant/AmbulantTicker';
import AmbulantVideoSection from '@/components/sections/ambulant/AmbulantVideoSection';
import AmbulantBenefits from '@/components/sections/ambulant/AmbulantBenefits';
import AmbulantBeispielrechnung from '@/components/sections/ambulant/AmbulantBeispielrechnung';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import AmbulantConceptAccordion from '@/components/sections/ambulant/AmbulantConceptAccordion';
import AmbulantIKKWechsel from '@/components/sections/ambulant/AmbulantIKKWechsel';
import AmbulantIKKServices from '@/components/sections/ambulant/AmbulantIKKServices';
import AmbulantUmwelt from '@/components/sections/ambulant/AmbulantUmwelt';
import AmbulantTestimonials from '@/components/sections/ambulant/AmbulantTestimonials';
import AmbulantFAQ from '@/components/sections/ambulant/AmbulantFAQ';
import AmbulantFinalCTA from '@/components/sections/ambulant/AmbulantFinalCTA';
import StickyCalculatorButton from '@/components/sections/ambulant/StickyCalculatorButton';

const faqCategoryKeys = ['kosten', 'leistungen', 'ablauf', 'vertrauen'];

const AmbulantPage = () => {
  const { t } = useTranslation('seo');
  const { t: tFaq } = useTranslation('ambulant-faq');
  const { pathname } = useLocation();
  const isHeilpraktikerLanding = pathname === '/heilpraktiker-zusatzversicherung';
  const seoTitle = isHeilpraktikerLanding
    ? 'Heilpraktiker Zusatzversicherung – 3.000 € Budget | Vergleich 2026 | Healio'
    : t('ambulant.title');
  const seoDescription = isHeilpraktikerLanding
    ? 'Heilpraktiker Zusatzversicherung im Vergleich 2026: Bis zu 3.000 € Gesundheitsbudget durch IKK Bonus + SDK Zusatzversicherung. Ohne Wartezeit starten.'
    : t('ambulant.description');
  const canonicalPath = isHeilpraktikerLanding
    ? '/heilpraktiker-zusatzversicherung'
    : '/ambulant';
  const canonicalUrl = `https://healio.de${canonicalPath}`;
  const faqItems = faqCategoryKeys.flatMap((key) => {
    const items = tFaq(`categories.${key}.items`, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  });
  const schemaMarkup = [
    createWebPageSchema(seoTitle, seoDescription, canonicalUrl),
    createServiceSchema({
      serviceType: 'Ambulante Zusatzversicherung und Gesundheitsbudget',
      name: 'Healio Gesundheitsbudget für Heilpraktiker, Osteopathie und Naturheilkunde',
      description: seoDescription,
      url: canonicalUrl,
      availableChannel: {
        serviceUrl: canonicalUrl
      },
      offers: {
        description: 'Kostenlose Beratung und Berechnung des möglichen Gesundheitsbudgets'
      }
    }),
    createFAQSchema(faqItems.map((faq) => ({
      question: faq.q,
      answer: faq.a
    })))
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <main className="min-h-screen bg-white relative">
        <AmbulantHero />
        <AmbulantTicker />

        {/* Qualitätssiegel: SDK + IKK classic */}
        <FadeInUp>
          <section className="py-8 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
              <p className="text-center text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Unsere Partner: SDK Süddeutsche Krankenversicherung & IKK classic</p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
                <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-16 md:h-20 w-auto" loading="lazy" />
                <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025" className="h-16 md:h-20 w-auto" loading="lazy" />
                <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet" className="h-16 md:h-20 w-auto" loading="lazy" />
                <img src="/siegel/ikk/schwangere-test.webp" alt="Krankenkassentest für Schwangere & junge Eltern, Note 1,7 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
                <img src="/siegel/ikk/familien-test.webp" alt="Krankenkassentest für Familien, Note 1,6 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* Erklärvideo — direkt nach Siegel für vorbereitete Besucher */}
        <FadeInUp>
          <AmbulantVideoSection />
        </FadeInUp>

        {/* 4 Highlight-Leistungskarten + Akkordeon */}
        <FadeInUp>
          <AmbulantBenefits />
        </FadeInUp>

        {/* Beispielrechnung (offen, prominent) */}
        <FadeInUp>
          <AmbulantBeispielrechnung />
        </FadeInUp>

        {/* Interaktiver Bonus-Rechner */}
        <FadeInUp>
          <AmbulantBonusCalculator />
        </FadeInUp>

        {/* Konzept-Akkordeon (ausführlich, 6 Punkte) */}
        <FadeInUp>
          <AmbulantConceptAccordion />
        </FadeInUp>

        {/* IKK classic Wechsel — Angst nehmen */}
        <FadeInUp>
          <AmbulantIKKWechsel />
        </FadeInUp>

        {/* TeleClinic + BetterDoc */}
        <FadeInUp>
          <AmbulantIKKServices />
        </FadeInUp>

        {/* 10 % für die Umwelt */}
        <FadeInUp>
          <AmbulantUmwelt />
        </FadeInUp>

        {/* Testimonials */}
        <FadeInUp>
          <AmbulantTestimonials />
        </FadeInUp>

        {/* FAQ */}
        <FadeInUp>
          <AmbulantFAQ />
        </FadeInUp>

        {/* Closing CTA + Footer */}
        <FadeInUp>
          <AmbulantFinalCTA />
        </FadeInUp>

        <StickyCalculatorButton />
      </main>
    </>
  );
};

export default AmbulantPage;
