import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import HealioZahnzusatzHero from '@/components/sections/HealioZahnzusatzHero';
import HealioZahnzusatzProblem from '@/components/sections/HealioZahnzusatzProblem';
import HealioZahnzusatzSolution from '@/components/sections/HealioZahnzusatzSolution';
import HealioZahnzusatzTariffFinder from '@/components/sections/HealioZahnzusatzTariffFinder';

const HealioZahnzusatzPage = () => {
  const { t: tSeo } = useTranslation('seo');

  return (
    <>
      <SEOHead
        title={tSeo('zahnzusatz.title')}
        description={tSeo('zahnzusatz.description')}
        canonicalUrl="https://www.healio.de/healio-zahnzusatz"
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