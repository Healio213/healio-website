
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
      {/* Experiment 06.10.2026: mobile Reihenfolge, wie ein Besucher denkt: Einstieg,
          Vertrauen, verstehen (Kosten), Nita-Hilfe, Tier und Schutz wählen, Auftrag
          (Schritt 03 direkt nach der Auswahl, die ihn vorbefüllt), Fragen. Ab md
          bleibt die bisherige Reihenfolge (md:block, order-none). */}
      <div className="veterinary-page-content flex flex-col overflow-x-clip bg-[#f5f0e7] text-[#11262a] md:block">
        <div className="order-1 md:order-none"><VeterinaryHero /></div>
        <div className="order-2 md:order-none"><VeterinaryTrustStrip /></div>
        <div className="order-5 md:order-none"><TariffSelection selection={selection} onSelectionChange={setSelection} /></div>
        <div className="order-3 md:order-none"><CostAnalysisSection /></div>
        <div className="order-4 md:order-none"><SalesAiAssist className="bg-[#f5f0e7]" variant="pet" /></div>
        <div className="order-6 md:order-none"><VeterinaryContactForm selection={selection} onSelectionChange={setSelection} /></div>
        <div className="order-7 md:order-none"><VeterinaryFaq /></div>
      </div>
    </>
  );
};

export default VeterinaryHomePage;
