
import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import VeterinaryHero from '@/components/sections/veterinary/VeterinaryHero';
import CostAnalysisSection from '@/components/sections/veterinary/CostAnalysisSection';
import CostBenefitAnalysis from '@/components/sections/veterinary/CostBenefitAnalysis';
import TariffSelection from '@/components/sections/veterinary/TariffSelection';
import VeterinaryContactForm from '@/components/sections/VeterinaryContactForm';
import { useLanguage } from '@/hooks/useLanguage';

const VeterinaryHomePage = () => {
  const { t: tSeo } = useTranslation('seo');
  const { lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/pet-insurance' : 'https://healio.de/tierkrankenversicherung';

  return (
    <>
      <SEOHead
        title={tSeo('veterinary.title')}
        description={tSeo('veterinary.description')}
        canonicalUrl={canonicalUrl}
        ogTitle="Healio Tierkrankenversicherung - Bester Schutz für Ihr Tier"
        ogDescription="Sichern Sie sich gegen steigende Tierarztkosten ab. Jetzt Beitrag berechnen."
      />
      <div className="veterinary-page-content overflow-x-clip [&_button.bg-blue-600]:!bg-[#25c990] [&_button.bg-blue-600:hover]:!bg-[#1db37f] [&_button.bg-blue-500]:!bg-[#25c990] [&_button.bg-blue-500:hover]:!bg-[#1db37f] [&_.text-blue-600]:!text-[#25c990] [&_.bg-blue-100]:!bg-[#25c990]/10 [&_.bg-blue-50]:!bg-[#25c990]/5">
        <VeterinaryHero />
        <CostAnalysisSection />
        <CostBenefitAnalysis />
        <TariffSelection />
        <VeterinaryContactForm />
      </div>
    </>
  );
};

export default VeterinaryHomePage;
