
import React from 'react';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createServiceSchema, createAggregateRatingSchema, createFAQSchema } from '@/lib/createSchemaMarkup';
import Hero from '@/components/sections/Hero';
import Concept from '@/components/sections/Concept';
import Benefits from '@/components/sections/Benefits';
import RenditeVergleichSection from '@/components/sections/RenditeVergleichSection';
import CompoundInterestCalculator from '@/components/sections/CompoundInterestCalculator';
import GesundheitSection from '@/components/sections/GesundheitSection';
import BonusCalculator from '@/components/sections/BonusCalculator';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';

const HomePage = () => {
  // Create combined schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createServiceSchema(),
      createAggregateRatingSchema(),
      createFAQSchema([
        {
          question: "Wie funktioniert das genau mit der Erstattung?",
          answer: "Ganz einfach: Du reichst die Rechnung deiner privaten Zusatzversicherung ein und erhältst – je nach Vertrag – bis zu 100 % der Kosten zurück. So kannst du dir hochwertige Gesundheitsleistungen leisten, ohne sie komplett selbst zahlen zu müssen."
        },
        {
          question: "Für wen lohnt sich das Konzept?",
          answer: "Für alle gesetzlich Versicherten, die mehr für ihre Gesundheit tun wollen, ohne sich finanziell zu überlasten. Besonders Familien, Berufseinsteiger und gesundheitsbewusste Menschen profitieren – durch clevere Erstattung und attraktive Bonusprogramme."
        },
        {
          question: "Kann meine ganze Familie teilnehmen?",
          answer: "Ja, absolut! Jeder Familienangehörige kann eine eigene Zusatzversicherung abschließen und ebenfalls am IKK Bonusprogramm teilnehmen. So könnt ihr gemeinsam über 1.000 € jährlich an Boni sammeln."
        }
      ])
    ]
  };

  return (
    <>
      <SEOHead
        title="Healio - Ganzheitliche Gesundheit & Bonusoptimierung | healio.de"
        description="Healio revolutioniert Gesundheit durch intelligente Bonusoptimierung. Maximiere deine Gesundheitsvorteile mit unserem innovativen Konzept. Jetzt kostenlos entdecken."
        canonicalUrl="https://healio.de/"
        ogTitle="Healio - Ganzheitliche Gesundheit & Bonusoptimierung"
        ogDescription="Maximiere deine Gesundheitsvorteile mit Healio. Bis zu 100% Erstattung für Heilpraktiker, Massagen und mehr durch clevere Kombination aus Zusatzversicherung und IKK Bonusprogramm."
        ogImage="https://healio.de/og-image-home.png"
        ogUrl="https://healio.de/"
        schemaMarkup={schemaMarkup}
      />
      <article>
        <Hero />
        <Concept />
        <Benefits />
        <RenditeVergleichSection />
        <CompoundInterestCalculator />
        <GesundheitSection />
        <BonusCalculator />
        <Testimonials />
        <Faq />
        <Contact />
      </article>
    </>
  );
};

export default HomePage;
