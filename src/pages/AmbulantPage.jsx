
import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import { FadeInUp } from '@/components/ui/ScrollAnimation';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import AmbulantTicker from '@/components/sections/ambulant/AmbulantTicker';
import AmbulantVideoSection from '@/components/sections/ambulant/AmbulantVideoSection';
import AmbulantBenefits from '@/components/sections/ambulant/AmbulantBenefits';
import AmbulantBeispielrechnung from '@/components/sections/ambulant/AmbulantBeispielrechnung';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import AmbulantConceptAccordion from '@/components/sections/ambulant/AmbulantConceptAccordion';
import AmbulantIKKWechsel from '@/components/sections/ambulant/AmbulantIKKWechsel';
import AmbulantTestimonials from '@/components/sections/ambulant/AmbulantTestimonials';
import AmbulantFAQ from '@/components/sections/ambulant/AmbulantFAQ';
import AmbulantFinalCTA from '@/components/sections/ambulant/AmbulantFinalCTA';
import StickyCalculatorButton from '@/components/sections/ambulant/StickyCalculatorButton';

const AmbulantPage = () => {
  const { t } = useTranslation('seo');

  return (
    <>
      <SEOHead
        title={t('ambulant.title')}
        description={t('ambulant.description')}
        canonicalUrl="https://www.healio.de/ambulant"
      />
      <main className="min-h-screen bg-white relative">
        <AmbulantHero />
        <AmbulantTicker />

        {/* SDK Qualitätssiegel */}
        <FadeInUp>
          <section className="py-8 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
              <p className="text-center text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Unser Partner: SDK Süddeutsche Krankenversicherung</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
                <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-16 md:h-20 w-auto" loading="lazy" />
                <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025 - Gesamtsieger Private Krankenversicherer" className="h-16 md:h-20 w-auto" loading="lazy" />
                <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet - PKV Beitragsstabilität" className="h-16 md:h-20 w-auto" loading="lazy" />
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

        {/* IKK Classic Wechsel — Angst nehmen */}
        <FadeInUp>
          <AmbulantIKKWechsel />
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
