
import React, { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import VeterinaryHero from '@/components/sections/veterinary/VeterinaryHero';
import CostAnalysisSection from '@/components/sections/veterinary/CostAnalysisSection';
import TariffSelection from '@/components/sections/veterinary/TariffSelection';
import VeterinaryTrustStrip from '@/components/sections/veterinary/VeterinaryTrustStrip';
import VeterinaryFaq from '@/components/sections/veterinary/VeterinaryFaq';
import VeterinaryContactForm from '@/components/sections/VeterinaryContactForm';
import SalesAiAssist from '@/components/sections/shared/SalesAiAssist';
import { useLanguage } from '@/hooks/useLanguage';

const VeterinaryHomePage = () => {
  const { lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/pet-insurance' : 'https://healio.de/tierkrankenversicherung';
  const seoTitle = lang === 'en'
    ? 'Pet health insurance for dogs, cats & horses | Healio'
    : 'Tierkrankenversicherung für Hund, Katze & Pferd | Healio';
  const seoDescription = lang === 'en'
    ? 'Have surgery-only or full cover reviewed personally for your dog, cat or horse – based on age, breed or use and subject to the plan.'
    : 'OP- oder Vollschutz für Hund, Katze oder Pferd persönlich prüfen lassen – passend zu Alter, Rasse beziehungsweise Nutzung und je nach Tarif.';
  const [selection, setSelection] = useState({ animalType: '', coverage: '' });

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        ogTitle="Tierkrankenversicherung für Hund, Katze und Pferd | Healio"
        ogDescription="OP- oder Vollschutz passend zu Tierart, Alter, Rasse beziehungsweise Nutzung persönlich prüfen lassen."
      />
      <div className="veterinary-page-content overflow-x-clip bg-[#f5f0e7] text-[#11262a]">
        <VeterinaryHero />
        <VeterinaryTrustStrip />
        <TariffSelection selection={selection} onSelectionChange={setSelection} />
        <CostAnalysisSection />
        <SalesAiAssist className="bg-[#f5f0e7]" variant="pet" />
        <VeterinaryContactForm selection={selection} onSelectionChange={setSelection} />
        <VeterinaryFaq />
      </div>
    </>
  );
};

export default VeterinaryHomePage;
