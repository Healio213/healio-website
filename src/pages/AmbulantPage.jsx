
import React from 'react';
import SEOHead from '@/components/SEOHead';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import AmbulantTicker from '@/components/sections/ambulant/AmbulantTicker';

import AmbulantVideoSection from '@/components/sections/ambulant/AmbulantVideoSection';
import AmbulantConceptAccordion from '@/components/sections/ambulant/AmbulantConceptAccordion';
import AmbulantHowItWorks from '@/components/sections/ambulant/AmbulantHowItWorks';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import AmbulantBenefits from '@/components/sections/ambulant/AmbulantBenefits';
import AmbulantTestimonials from '@/components/sections/ambulant/AmbulantTestimonials';
import AmbulantFAQ from '@/components/sections/ambulant/AmbulantFAQ';
import AmbulantFinalCTA from '@/components/sections/ambulant/AmbulantFinalCTA';
import StickyCalculatorButton from '@/components/sections/ambulant/StickyCalculatorButton';

const AmbulantPage = () => {
  return (
    <>
      <SEOHead
        title="Ambulante Zusatzversicherung – Dein 2.500€ Gesundheits-Budget | Healio"
        description="Heilpraktiker, Osteopathie, Massagen, Sehhilfen – alles was die GKV nicht abdeckt. Mit Healio ambulant genießt du Privatpatienten-Leistungen effektiv für 0€."
        canonicalUrl="https://www.healio.de/ambulant"
      />
      <main className="min-h-screen bg-white relative">
        <AmbulantHero />
        <AmbulantTicker />

        {/* SDK Qualitätssiegel */}
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

        <AmbulantVideoSection />
        <AmbulantConceptAccordion />
        
        {/* Task 2: Reordered components sequence */}
        <AmbulantBonusCalculator />
        <AmbulantHowItWorks />
        <AmbulantBenefits />
        
        <AmbulantTestimonials />
        <AmbulantFAQ />
        <AmbulantFinalCTA />
        <StickyCalculatorButton />
      </main>
    </>
  );
};

export default AmbulantPage;
