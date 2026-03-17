import React from 'react';
import SEOHead from '@/components/SEOHead';
import HealioZahnzusatzHero from '@/components/sections/HealioZahnzusatzHero';
import HealioZahnzusatzProblem from '@/components/sections/HealioZahnzusatzProblem';
import HealioZahnzusatzSolution from '@/components/sections/HealioZahnzusatzSolution';
import HealioZahnzusatzTariffFinder from '@/components/sections/HealioZahnzusatzTariffFinder';

const HealioZahnzusatzPage = () => {
  return (
    <>
      <SEOHead 
        title="Healio Zahnzusatz - Zahnzusatzversicherung mit 100% Erstattung"
        description="Sichern Sie sich Privatpatienten-Status beim Zahnarzt. 100% Kostenerstattung für Zahnersatz, Implantate und professionelle Zahnreinigung. Jetzt Tarif berechnen."
        canonicalUrl="https://healio.de/healio-zahnzusatz"
      />
      
      <main className="bg-white">
        <HealioZahnzusatzHero />
        <HealioZahnzusatzProblem />
        <HealioZahnzusatzSolution />
        <HealioZahnzusatzTariffFinder />
      </main>
    </>
  );
};

export default HealioZahnzusatzPage;