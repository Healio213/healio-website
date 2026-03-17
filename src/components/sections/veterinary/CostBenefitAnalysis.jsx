
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const CostBenefitAnalysis = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A8A] mb-4">
            Kosten-Nutzen Analyse
          </h2>
          <p className="text-lg text-slate-600">
            Verwandeln Sie ein unkalkulierbares Großrisiko in eine kleine, planbare monatliche Ausgabe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Scenario WITHOUT Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          >
            <div className="bg-slate-100 p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-white">
                  <X className="w-5 h-5" />
                </span>
                Ohne Absicherung
              </h3>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <p className="text-slate-500 mb-2">Finanzielles Risiko</p>
                <div className="text-4xl font-bold text-red-500">Unbegrenzt</div>
                <p className="text-sm text-slate-400 mt-1">Im Ernstfall 3.000€ - 5.000€ sofort fällig</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-slate-600">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Volles Kostenrisiko bei jeder Behandlung</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Entscheidung über Behandlung oft budgetabhängig</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Keine Kostenerstattung für Vorsorge</span>
                </li>
              </ul>

              <div className="mt-auto p-4 bg-red-50 rounded-lg border border-red-100 text-red-800 text-sm">
                <strong>Fazit:</strong> Eine einzige Operation kann Ihre Ersparnisse aufbrauchen.
              </div>
            </div>
          </motion.div>

          {/* Scenario WITH Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-[#1E3A8A] overflow-hidden flex flex-col transform md:-translate-y-4"
          >
            <div className="bg-[#1E3A8A] p-6 border-b border-blue-900">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E3A8A]">
                  <Check className="w-5 h-5" />
                </span>
                Mit Absicherung
              </h3>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <p className="text-blue-600/80 mb-2 font-medium">Planbare Kosten</p>
                <div className="text-4xl font-bold text-[#1E3A8A]">ab 20 € <span className="text-lg text-slate-500 font-normal">/Monat</span></div>
                <p className="text-sm text-slate-400 mt-1">Für reinen OP-Schutz</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Kostenübernahme bis zum 4-fachen GOT-Satz</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Freie Tierarzt- und Klinikwahl</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Beste medizinische Versorgung gesichert</span>
                </li>
              </ul>

              <div className="mt-auto p-4 bg-blue-50 rounded-lg border border-blue-100 text-[#1E3A8A] text-sm">
                <strong>Fazit:</strong> Kalkulierbare Kosten. Bestmögliche Versorgung.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CostBenefitAnalysis;
