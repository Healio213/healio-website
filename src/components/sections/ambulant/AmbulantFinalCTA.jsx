
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, PhoneCall, CheckCircle } from 'lucide-react';

const AmbulantFinalCTA = () => {
  return (
    <section className="py-24 bg-healio-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-healio-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Bereit deine Gesundheit clever zu finanzieren?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 mb-8"
        >
          Starte jetzt und entdecke dein Gesundheits-Budget
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12"
        >
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5 text-healio-primary" />
            <span className="font-medium">Keine versteckten Kosten</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5 text-healio-primary" />
            <span className="font-medium">Persönliche Beratung</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5 text-healio-primary" />
            <span className="font-medium">Sofort starten</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link 
            to="/potenzialanalyse" 
            className="inline-flex items-center justify-center bg-healio-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Tarif rechnen
          </Link>
          <Link 
            to="/kontakt" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-healio-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            Rückruf anfordern
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantFinalCTA;
