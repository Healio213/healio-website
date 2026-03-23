
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
