
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const ImpressumPage = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [createOrganizationSchema(), createWebPageSchema("Impressum", "Impressum und Kontaktinformationen von Healio.")]
  };

  return (
    <>
      <SEOHead 
        title="Impressum - Healio" 
        description="Impressum und Kontaktinformationen von Healio." 
        canonicalUrl="https://www.healio.de/impressum" 
        schemaMarkup={schemaMarkup} 
      />
      <main className="bg-gray-50 py-16 sm:py-24 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="healio-container"
        >
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-healio-slate mb-6">Impressum</h1>
            
            <nav aria-label="Seitennavigation" className="mb-8 pb-8 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                <Link to="/" className="text-healio-primary hover:underline">Startseite</Link>
                {' / '}
                <span className="text-gray-700">Impressum</span>
              </p>
            </nav>

            <div className="space-y-10 text-gray-700 leading-relaxed">
              <section className="bg-gray-50/50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-healio-slate mb-4">Angaben gemäß § 5 TMG</h2>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Healio GmbH</p>
                  <p>Arndtstraße 6</p>
                  <p>22085 Hamburg</p>
                  <p className="pt-2">Handelsregister: HRB 196 905</p>
                  <p>Registergericht: Amtsgericht Hamburg</p>
                  <p>Steuer-Nr. 43/729/01735</p>
                  <p className="pt-2">Registrierungsnummer nach § 34d Abs. 1 GewO: D-C1LE-OVLQH-98</p>
                  <p>Registrierungsstelle: IHK Hamburg, Adolphsplatz 1, 20457 Hamburg</p>
                  <p>Vermittlerregister: <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">www.vermittlerregister.info</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">Verantwortlich für den Inhalt</h2>
                <p>Frank Steinfurt</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">Kontaktinformationen</h2>
                <div className="space-y-2">
                  <p>Telefon: <a href="tel:+494089755705" className="text-healio-primary hover:underline font-medium">+49 40 89755705</a></p>
                  <p>E-Mail: <a href="mailto:info@healio.de" className="text-healio-primary hover:underline font-medium">info@healio.de</a></p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">Streitschlichtung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline ml-1">
                    http://ec.europa.eu/consumers/odr/
                  </a>.
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default ImpressumPage;
