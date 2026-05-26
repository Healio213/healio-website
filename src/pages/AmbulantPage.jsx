
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import { FadeInUp } from '@/components/ui/ScrollAnimation';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import AmbulantTicker from '@/components/sections/ambulant/AmbulantTicker';
import AmbulantConversionNudge from '@/components/sections/ambulant/AmbulantConversionNudge';
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
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';

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
          <section className="bg-white py-10 md:py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm md:text-base text-slate-500 mb-7 font-semibold uppercase tracking-[0.18em]">Unsere Partner: SDK Süddeutsche Krankenversicherung & IKK classic</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 max-w-7xl mx-auto">
                <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/ikk/schwangere-test.webp" alt="Krankenkassentest für Schwangere & junge Eltern, Note 1,7 Gut" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/ikk/familien-test.webp" alt="Krankenkassentest für Familien, Note 1,6 Gut" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
              </div>
              <div className="mt-8 md:mt-10 max-w-4xl mx-auto rounded-lg border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 px-5 py-5 md:px-8 md:py-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
                  <p className="text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                    In Kooperation mit
                  </p>
                  <img
                    src="/logos/ikk-classic.svg"
                    alt="IKK classic Logo"
                    className="h-14 sm:h-16 md:h-20 w-auto max-w-[240px] object-contain"
                    loading="lazy"
                  />
                  <p className="max-w-sm text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                    IKK classic Bonusprogramm als zentraler Baustein für dein Healio-Gesundheitsbudget.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* Entscheidungsimpuls: Selbstzahler-Problem direkt greifbar machen */}
        <AmbulantConversionNudge />

        {/* Erklärvideo — nach Vertrauens- und Entscheidungsbereich */}
        <FadeInUp>
          <AmbulantVideoSection />
        </FadeInUp>

        {/* 4 Highlight-Leistungskarten + Akkordeon */}
        <FadeInUp>
          <AmbulantBenefits />
        </FadeInUp>

        {/* Konzept zuerst: SDK-Tarif und Healio-System erklären */}
        <FadeInUp>
          <AmbulantConceptAccordion />
        </FadeInUp>

        {/* IKK classic Wechsel — Bonus als Verstärker und Refinanzierung erklären */}
        <FadeInUp>
          <AmbulantIKKWechsel />
        </FadeInUp>

        {/* Interaktiver Bonus-Rechner */}
        <FadeInUp>
          <AmbulantBonusCalculator />
        </FadeInUp>

        {/* Beispielrechnung — konkrete Einordnung nach dem Bonus-Rechner */}
        <FadeInUp>
          <AmbulantBeispielrechnung />
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
        <AmbulantMiaPrompt />
      </main>
    </>
  );
};

export default AmbulantPage;
