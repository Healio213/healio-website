
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Syringe, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TariffSelection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A8A] mb-4">
            Zwei Konzepte. Ein Ziel.
          </h2>
          <p className="text-lg text-slate-600">
            Rasse, Alter, Vorgeschichte — wir kalkulieren individuell. Sie entscheiden.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* VOLLSCHUTZ */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-blue-400 shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1E3A8A] transition-colors">
              <Shield className="w-8 h-8 text-[#1E3A8A] group-hover:text-white transition-colors" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Vollschutz</h3>
            <p className="text-slate-500 mb-6 h-12">Rundum-Sorglos-Paket für ambulante und stationäre Behandlungen.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Syringe className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">Heilbehandlungen & Medikamente</span>
              </li>
              <li className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">Vorsorge (Impfungen, Check-ups)</span>
              </li>
              <li className="flex items-center gap-3">
                <HeartPulse className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">Operationen unbegrenzt</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full mb-4">
                Ideal für junge Tiere & Welpen
              </p>
              <Button className="w-full bg-slate-900 hover:bg-[#1E3A8A] text-white">
                Angebot anfordern
              </Button>
            </div>
          </motion.div>

          {/* OPERATIONSSCHUTZ */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-blue-400 shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1E3A8A] transition-colors">
              <Activity className="w-8 h-8 text-[#1E3A8A] group-hover:text-white transition-colors" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Operationsschutz</h3>
            <p className="text-slate-500 mb-6 h-12">Fokus auf das hohe Kostenrisiko bei chirurgischen Eingriffen.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <HeartPulse className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">Operationen inkl. Diagnostik</span>
              </li>
              <li className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">Nachsorge nach OPs</span>
              </li>
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">Freie Klinikwahl</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full mb-4">
                Ideal für ältere Tiere oder günstige Beiträge
              </p>
              <Button className="w-full bg-slate-900 hover:bg-[#1E3A8A] text-white">
                Angebot anfordern
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TariffSelection;
