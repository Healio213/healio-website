import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Activity, ArrowRight } from 'lucide-react';

const VersorgungswegSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">Ihr Weg zum Status</h2>
          <p className="text-lg text-gray-600">
            Wir unterscheiden zwei Wege, die zum gleichen Ziel führen: Beste medizinische Versorgung. Welcher Weg für Sie der richtige ist, klären wir im Kurzcheck.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pathway A */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-gray-100 p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Activity className="w-8 h-8 text-[#1E3A5F]" />
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Gesund</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1E3A5F]">Standard Acceptance</h3>
              <p className="text-gray-500 font-medium mt-1">Versorgungsweg A</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Für Antragsteller ohne schwere Vorerkrankungen und mit normalem BMI. Hier greifen Standard-Tarife mit besonders günstigen Konditionen.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Gesundheitsprüfung erforderlich</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Niedrigster Monatsbeitrag</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-[#1E3A5F]">Bonus deckt oft 100% der Kosten</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Pathway B */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-[#1E3A5F] p-6 border-b border-[#1E3A5F]">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg shadow-sm">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Spezial</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Extended Acceptance</h3>
              <p className="text-blue-200 font-medium mt-1">Versorgungsweg B</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Für Antragsteller mit Vorerkrankungen oder erhöhtem BMI. Spezialisierte Tarife ohne Gesundheitsfragen oder mit stark vereinfachter Prüfung.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#1E3A5F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Keine / Vereinfachte Gesundheitsfragen</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#1E3A5F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Annahme trotz Diagnosen möglich</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#1E3A5F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-[#1E3A5F]">Effektivkosten ~20€ durch Bonus</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VersorgungswegSection;