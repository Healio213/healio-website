import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, Stethoscope, Clock } from 'lucide-react';

const CostAnalysisSection = () => {
  return (
    <section id="vet-analysis" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="healio-container px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#1E3A8A] font-bold uppercase tracking-wide text-xs sm:text-sm mb-2 sm:mb-3 block">
              Marktsituation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight break-words">
              Die finanzielle Realität nach der GOT Reform
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed py-1 sm:py-2">
              Seit der Anpassung der Gebührenordnung für Tierärzte (GOT) sind die Kosten für veterinärmedizinische Behandlungen spürbar gestiegen. Was früher Routine war, kann heute schnell zu einer finanziellen Belastung werden.
            </p>
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed py-1 sm:py-2">
              Besonders im Notdienst oder bei Spezialisten können bis zum 4-fachen Satz abgerechnet werden. Eine einfache Kreuzband-OP kann inklusive Nachsorge schnell <strong className="text-slate-900">über 3.000 Euro</strong> kosten.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 md:p-6 bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-start">
                <div className="bg-[#1E3A8A] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <TrendingUp className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 sm:mb-2 text-base sm:text-lg">Steigende Sätze</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Abrechnung bis zum 4-fachen Satz im Notdienst möglich.
                  </p>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 md:p-6 bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-start">
                <div className="bg-[#1E3A8A] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <Stethoscope className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 sm:mb-2 text-base sm:text-lg">Spezialisten</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Moderne Diagnostik (MRT/CT) verursacht hohe Fixkosten.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-[#1E3A8A]/5 transform rotate-2 sm:rotate-3 rounded-2xl sm:rounded-3xl" />
            <div className="relative bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
                <div className="bg-red-100 p-2.5 sm:p-3 rounded-full shrink-0">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">Beispielkosten: Kreuzbandriss</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Typischer Behandlungsverlauf</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-1.5 sm:py-2">
                  <span className="text-sm sm:text-base text-slate-600 pr-2">Diagnostik (Röntgen/CT)</span>
                  <span className="font-semibold text-slate-900 shrink-0">ca. 650 €</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-2.5 bg-gray-50 px-3 rounded-lg">
                  <span className="text-sm sm:text-base text-slate-600 pr-2">Operation (TPLO)</span>
                  <span className="font-semibold text-slate-900 shrink-0">ca. 2.100 €</span>
                </div>
                <div className="flex justify-between items-center py-1.5 sm:py-2">
                  <span className="text-sm sm:text-base text-slate-600 pr-2">Narkose & Überwachung</span>
                  <span className="font-semibold text-slate-900 shrink-0">ca. 350 €</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-2.5 bg-gray-50 px-3 rounded-lg">
                  <span className="text-sm sm:text-base text-slate-600 pr-2">Medikamente & Nachsorge</span>
                  <span className="font-semibold text-slate-900 shrink-0">ca. 450 €</span>
                </div>
                
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-base sm:text-lg text-[#1E3A8A]">Gesamtkosten</span>
                  <span className="font-bold text-xl sm:text-2xl text-[#1E3A8A]">~ 3.550 €</span>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 flex items-start gap-3 text-xs sm:text-sm text-slate-500 bg-gray-50 p-3 sm:p-4 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Diese Kosten müssen oft sofort beglichen werden. Eine Tierkrankenversicherung übernimmt diese Rechnungen direkt.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CostAnalysisSection;