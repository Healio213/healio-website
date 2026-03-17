
import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { createServiceSchema } from '@/lib/createSchemaMarkup';
import HospitalBenefits from '@/components/sections/HospitalBenefits';
import HospitalConcept from '@/components/sections/HospitalConcept';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import HospitalContactForm from '@/components/sections/HospitalContactForm';
import { Button } from '@/components/ui/button';
import { Calculator, Gift, CheckCircle } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const StationaerPage = () => {
  const calculatorUrl = "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant&agentId1=901235&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJOb2xpIiwiY29tcGfueSI6Ik5vbGkgR21iSCIsInN0cmVldCI6IkFybmR0c3RyLiA2IiwiemlwY29kZSI6IjIyMDg1IiwiY2l0eSI6IkhhbWJ1cmciLCJtb2JpbGUiOiIwMTc2MjQxNTMxODgiLCJlbWFpbCI6ImZyYW5rQG5vbGktdmVyc2ljaGVydW5nLmRlIn0=&remarks=IkJlaSBGcmFnZW4gc2luZCB3aXIgZvxyIFNpZSBkYS4i&defaultContact=true&employeeInsurance=NOT_BKV";
  const ikkLink = "https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V3700025016";

  const schemaMarkup = createServiceSchema();

  return (
    <>
      <SEOHead
        title="Stationäre Zusatzversicherung – Privatpatienten-Status | Healio"
        description="Einzelzimmer. Chefarztbehandlung. Freie Klinikwahl. Sichern Sie sich jetzt die beste Versorgung im Krankenhaus."
        canonicalUrl="https://healio.de/stationaer"
        ogTitle="Stationäre Zusatzversicherung – Beste Versorgung im Krankenhaus"
        ogDescription="Einzelzimmer, Chefarzt, freie Klinikwahl. Privatpatienten-Status, ohne privat versichert zu sein."
        ogImage="https://healio.de/og-image-stationaer.png"
        ogUrl="https://healio.de/stationaer"
        schemaMarkup={schemaMarkup}
      />
      <article>
        {/* Hero Section */}
        <section className="relative min-h-[90svh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden w-full" aria-labelledby="stationaer-hero-heading">
          {/* Background Image & Gradient Overlays */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <OptimizedImage
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/89e53e31c640cfd5da7e6cf86c62466b.png"
              alt="Modernes Krankenhaus Einzelzimmer"
              priority={true}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10" />
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10" aria-hidden="true" />
          </div>

          <div className="healio-container relative z-20 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <h1 id="stationaer-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                  Im Krankenhaus zählt nur eines: die beste Versorgung.
                </h1>
                
                <p className="mt-4 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                  Einzelzimmer. Chefarztbehandlung. Freie Klinikwahl. Sofortschutz bei Unfällen.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-2xl mx-auto shadow-xl text-left"
                >
                  <CheckCircle className="w-8 h-8 sm:w-6 sm:h-6 text-[#25c990] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-white text-base sm:text-lg font-medium drop-shadow-sm text-center sm:text-left">
                    <strong>Sofortschutz bei Unfällen:</strong> Keine Wartezeiten bei Unfällen, kurze Wartezeiten bei Krankheit. Sichern Sie sich jetzt ab.
                  </p>
                </motion.div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto">
                  <Button asChild className="bg-[#25c990] hover:bg-[#1db37f] text-white shadow-[0_4px_14px_rgba(37,201,144,0.4)] hover:shadow-[0_6px_20px_rgba(37,201,144,0.6)] text-lg px-8 py-6 h-auto rounded-xl border-none transition-all duration-300 w-full sm:w-auto">
                    <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
                      <Calculator className="w-5 h-5 mr-2" aria-hidden="true" />
                      Tarif berechnen
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md shadow-xl text-lg px-8 py-6 h-auto rounded-xl transition-all duration-300 w-full sm:w-auto">
                    <a href={ikkLink} target="_blank" rel="noopener noreferrer">
                      <Gift className="w-5 h-5 mr-2" aria-hidden="true" />
                      Bonus sichern
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <HospitalConcept />
        <HospitalBenefits />
        <Testimonials headline="Was Kunden berichten." />
        <Faq />
        <HospitalContactForm />
      </article>
    </>
  );
};

export default StationaerPage;
