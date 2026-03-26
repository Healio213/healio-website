
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { TextHighlight } from '@/components/ui/ScrollAnimation';

const CompoundInterestCalculator = () => {
  const [sparrate, setSparrate] = useState(338);
  const [jahre, setJahre] = useState(25);

  const healioZins = 0.0847; // 8.47%
  const klassischZins = 0.007; // 0.7%

  const calculateValues = (monthlyPmt, years, interestRate) => {
    if (years === 0) return 0;
    let monatszins = interestRate / 12;
    let monate = years * 12;
    let endkapital = monthlyPmt * ((Math.pow(1 + monatszins, monate) - 1) / monatszins) * (1 + monatszins);
    return endkapital;
  };

  const healioResult = calculateValues(sparrate, jahre, healioZins);
  const klassischResult = calculateValues(sparrate, jahre, klassischZins);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="calculator">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Der Zinseszins wartet auf <TextHighlight>niemanden.</TextHighlight>
            </h2>
            <p className="text-xl text-slate-600">
              Berechnen Sie hier, wie sich kleine Unterschiede im Zinssatz über die Jahre auf Ihr Vermögen auswirken.
            </p>
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100 inline-flex">
              Der Beweis in Zahlen: <span className="text-2xl">👉</span>
            </div>
          </motion.div>

          {/* Right Column - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 space-y-8"
          >
            {/* Sliders */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Monatliche Sparrate</label>
                  <span className="text-2xl font-bold text-[#25c990]">{sparrate} €</span>
                </div>
                <Slider
                  defaultValue={[338]}
                  min={50}
                  max={676}
                  step={1}
                  value={[sparrate]}
                  onValueChange={(val) => setSparrate(val[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>50 €</span>
                  <span>676 €</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Laufzeit</label>
                  <span className="text-2xl font-bold text-[#25c990]">{jahre} Jahre</span>
                </div>
                <Slider
                  defaultValue={[25]}
                  min={1}
                  max={40}
                  step={1}
                  value={[jahre]}
                  onValueChange={(val) => setJahre(val[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>1 Jahr</span>
                  <span>40 Jahre</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 pt-4">
              <div className="border-2 border-[#25c990] bg-[#25c990]/5 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-sm font-bold text-[#25c990] mb-1 uppercase tracking-wide">Healio Strategie (8,47%)</div>
                  <div className="text-3xl font-black text-slate-900">{formatCurrency(healioResult)}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#25c990]/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#25c990]" />
                </div>
              </div>

              <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wide">Klassische bAV (0,7% Netto)</div>
                  <div className="text-2xl font-bold text-slate-700">{formatCurrency(klassischResult)}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#25c990]/10 border border-[#25c990]/20 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#25c990] shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                <strong className="text-slate-900">Der Unterschied:</strong> Mit der Healio-Strategie erzielen Sie deutlich mehr Vermögenszuwachs als mit klassischen Sparmodellen, wodurch sich langfristig enorme Summen aufbauen.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 border border-slate-100"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Die Rentenlücke schließen</h3>
          <p className="text-slate-600 leading-relaxed">
            Statistisch gesehen klafft bei vielen Arbeitnehmern im Alter eine Lücke von ca. <strong className="text-slate-900">800€ monatlich</strong>. 
            Durch kluges, zinseszins-optimiertes Sparen mit der Healio-Strategie können Sie diese Lücke nicht nur schließen, 
            sondern Ihren Lebensstandard im Alter aktiv absichern und verbessern.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompoundInterestCalculator;
