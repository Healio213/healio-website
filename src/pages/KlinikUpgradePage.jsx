import React from 'react';
import SEOHead from '@/components/SEOHead';
import KlinikHero from '@/components/sections/klinik-upgrade/KlinikHero';
import UnterbringungSection from '@/components/sections/klinik-upgrade/UnterbringungSection';
import WirtschaftlichkeitsSection from '@/components/sections/klinik-upgrade/WirtschaftlichkeitsSection';
import VersorgungswegSection from '@/components/sections/klinik-upgrade/VersorgungswegSection';
import KlinikUpgradeCTA from '@/components/sections/klinik-upgrade/KlinikUpgradeCTA';
import Contact from '@/components/sections/Contact';

const KlinikUpgradePage = () => {
  return (
    <>
      <SEOHead
        title="Klinik Upgrade - Privatpatient im Krankenhaus | Healio"
        description="Sichern Sie sich Einbettzimmer & Chefarztbehandlung im Krankenhaus. Auch mit Vorerkrankungen möglich & durch Bonusprogramme finanzierbar."
        canonicalUrl="https://healio.de/klinik-upgrade"
      />
      <main className="bg-white">
        <KlinikHero />
        <UnterbringungSection />
        <WirtschaftlichkeitsSection />
        <VersorgungswegSection />
        <KlinikUpgradeCTA />
        <div id="contact" className="bg-gray-50 border-t border-gray-200">
           <Contact />
        </div>
      </main>
    </>
  );
};

export default KlinikUpgradePage;