import React from 'react';
import { motion } from 'framer-motion';
import { Euro, PiggyBank, TrendingDown, CheckCircle2 } from 'lucide-react';

const WirtschaftlichkeitsSection = () => {
  return (
    <section className="py-24 bg-white" id="analyse">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">Wirtschaftlichkeitsanalyse</h2>
          <p className="text-lg text-gray-600">
            Qualität hat ihren Preis – aber durch intelligente Kombination mit Bonusprogrammen wird sie finanzierbar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Fact 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg relative overflow-hidden group hover:border-[#1E3A5F] transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-[#1E3A5F] transition-colors" />
            <div className="mb-6 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center">
              <Euro className="w-7 h-7 text-gray-600 group-hover:text-[#1E3A5F] transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">Brutto-Beitrag</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">~ 70 € <span className="text-base font-normal text-gray-500">/ Monat</span></p>
            <p className="text-gray-600 text-sm mt-4">
              Ein Tarif ohne Gesundheitsfragen oder mit vereinfachter Prüfung für Menschen mit Vorerkrankungen kostet ca. 70 Euro monatlich.
            </p>
          </motion.div>

          {/* Fact 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg relative overflow-hidden group hover:border-[#1E3A5F] transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-[#1E3A5F] transition-colors" />
            <div className="mb-6 bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center">
              <PiggyBank className="w-7 h-7 text-[#1E3A5F]" />
            </div>
            <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">Bonus-Erstattung</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">bis 500 € <span className="text-base font-normal text-gray-500">/ Jahr</span></p>
            <p className="text-gray-600 text-sm mt-4">
              Der IKK Gesundheitsbonus erstattet bis zu 500 Euro pro Jahr für private Zusatzversicherungen.
            </p>
          </motion.div>

          {/* Fact 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E3A5F] p-8 rounded-xl shadow-xl relative overflow-hidden text-white"
          >
            <div className="mb-6 bg-white/10 w-14 h-14 rounded-full flex items-center justify-center">
              <TrendingDown className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Effektivkosten</h3>
            <p className="text-3xl font-bold text-white mb-2">~ 20 € <span className="text-base font-normal text-blue-200">/ Monat</span></p>
            <p className="text-blue-100 text-sm mt-4">
              Ihr effektiver Eigenanteil sinkt auf ca 20 Euro monatlich nach Verrechnung des Bonus.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-100 p-6 rounded-lg text-center"
        >
          <p className="text-lg md:text-xl font-semibold text-[#1E3A5F] flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            Hochwertige Medizin wird durch intelligente Finanzierung für jeden bezahlbar.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WirtschaftlichkeitsSection;