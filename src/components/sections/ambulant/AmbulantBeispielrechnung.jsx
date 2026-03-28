
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle } from 'lucide-react';

const AmbulantBeispielrechnung = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            So rechnet sich dein Gesundheits-Budget
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#10b981] rounded-2xl p-8 md:p-10 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-[#10b981]" />
            <h3 className="text-2xl font-bold text-gray-900">Beispiel: Frau Müller, 32 Jahre, gesetzlich versichert</h3>
          </div>

          {/* SDK Beitrag */}
          <div className="space-y-4 text-lg mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-gray-700 font-medium">SDK Ambulant 90 (Tarif AP9):</span>
              <span className="text-gray-900 font-bold">22 €/Monat = 264 €/Jahr</span>
            </div>
          </div>

          {/* IKK Bonus Aufschlüsselung */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">IKK Classic Bonus pro Jahr:</h4>
            <div className="space-y-3 ml-4">
              {[
                { label: "Grippeimpfung", amount: "30 €" },
                { label: "Zahnvorsorge (2×)", amount: "60 €" },
                { label: "Gesundheits-Check-up", amount: "75 €" },
                { label: "Fitnessstudio-Mitgliedschaft", amount: "75 €" },
                { label: "BMI im Normalbereich", amount: "75 €" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    {item.label}
                  </span>
                  <span className="font-semibold">{item.amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-green-300 font-bold text-gray-900">
                <span>= Bonus gesamt:</span>
                <span className="text-[#10b981]">315 €/Jahr</span>
              </div>
            </div>
          </div>

          {/* Ergebnis */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">Ergebnis:</span>
              <span className="text-xl font-extrabold text-[#10b981]">315 € Bonus − 264 € Beitrag = 51 € Plus</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              Frau Müller bekommt mehr zurück als sie zahlt — und hat 900 € Budget für Heilpraktiker, Brille und Vorsorge.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantBeispielrechnung;
