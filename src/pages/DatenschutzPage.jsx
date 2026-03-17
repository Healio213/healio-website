
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const DatenschutzPage = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createWebPageSchema("Datenschutzerklärung", "Datenschutzerklärung von Healio.")
    ]
  };

  return (
    <>
      <SEOHead
        title="Datenschutz - Healio"
        description="Datenschutzerklärung von Healio."
        canonicalUrl="https://healio.de/datenschutz"
        schemaMarkup={schemaMarkup}
      />
      <main className="bg-gray-50 py-16 sm:py-24 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="healio-container"
        >
          <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-healio-slate mb-6">Datenschutzerklärung</h1>
            
            <nav aria-label="Seitennavigation" className="mb-8 pb-8 border-b border-gray-100 text-sm">
              <Link to="/" className="text-healio-primary hover:underline">Startseite</Link>
              {' / '}
              <Link to="/impressum" className="text-healio-primary hover:underline">Impressum</Link>
            </nav>

            <div className="prose prose-lg prose-gray max-w-none text-gray-700">
              <p className="lead text-xl text-gray-600 mb-8">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">1. Verantwortlicher</h2>
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <p className="mb-2">Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
                <p className="font-medium text-gray-900">Healio GmbH</p>
                <p>Arndtstraße 6</p>
                <p>22085 Hamburg</p>
                <p className="mt-2">Telefon: +49 40 89755705</p>
                <p>E-Mail: info@healio.de</p>
              </div>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">2. Datenerfassung auf unserer Website</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">3. Benutzerrechte</h2>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">4. Cookies</h2>
              <p>
                Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">5. Kontakt zum Datenschutzbeauftragten</h2>
              <p>
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:
                <br /><br />
                <strong>E-Mail:</strong> info@healio.de
              </p>

              <p className="mt-12 text-sm text-gray-500 pt-8 border-t border-gray-100">Stand: März 2026</p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default DatenschutzPage;
