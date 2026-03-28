
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Gift, CheckCircle, Euro } from 'lucide-react';
import { Link } from 'react-router-dom';

const AmbulantHero = () => {
  const bgImageUrl = "https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/1974bac73b0ea234e889ffe0cb5e3fad.png";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImageUrl} 
          alt="Gesunde Menschen in der Natur" 
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            id="hero-heading" 
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            Dein <span className="text-healio-primary">2.500 Euro Gesundheits-Budget</span>. Effektiv für 0 Euro.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 font-medium max-w-2xl mx-auto leading-relaxed mb-6 drop-shadow-md"
          >
            Warum Behandlungen selbst bezahlen, wenn das System sie übernehmen kann? Mit der SDK Zusatzversicherung + dem IKK Classic Bonusprogramm bekommst du bis zu 2.500 Euro für Heilpraktiker, Brille, Vorsorge und mehr — und zahlst dank Bonus effektiv nichts dafür. Keine Wartezeiten. Keine Gesundheitsprüfung. Sofort loslegen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10">
              <Euro className="w-4 h-4 text-healio-primary" />
              <span className="text-sm text-white font-medium">Ab 0 Euro effektiv monatlich dank IKK Bonus</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10">
              <CheckCircle className="w-4 h-4 text-healio-primary" />
              <span className="text-sm text-white font-medium">Garantiert ohne Wartezeit</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10">
              <CheckCircle className="w-4 h-4 text-healio-primary" />
              <span className="text-sm text-white font-medium">Stiftung Warentest: Sehr Gut (0,9)</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant,Station%C3%A4r&agentId1=901334&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDE3NjI0MTUzMTg4IiwiZW1haWwiOiJpbmZvQGhlYWxpby5kZSJ9&remarks=IkJlaSBS/GNrZnJhZ2VuIHNpbmQgd2lyIGdlcm5lIGb8ciBTaWUgZGEuIg==&defaultContact=false&employeeInsurance=NOT_BKV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-healio-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Tarif berechnen
            </a>
            <Link 
              to="/kontakt" 
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-healio-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Gift className="w-5 h-5 mr-2" />
              Bonus sichern
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantHero;
