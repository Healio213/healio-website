import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Info, AlertCircle } from 'lucide-react';

const ZeitfalleSection = () => {
  const { t } = useTranslation('home');
  // Default values
  const [contribution, setContribution] = useState(338);
  const [years, setYears] = useState(25);

  // Constants
  const healioRate = 0.0847; // 8.47% displayed in UI
  const bankRate = 0.007;    // 0.7%

  // Calculation Logic (vorschüssiger Sparplan)
  const calculateValues = (monthlyAmount, rate, timeInYears) => {
    if (timeInYears === 0) return { endkapital: 0, einzahlung: 0, gewinn: 0 };
    
    let monatszins = rate / 12;
    let monate = timeInYears * 12;
    
    let endkapital = monthlyAmount * ((Math.pow(1 + monatszins, monate) - 1) / monatszins) * (1 + monatszins);
    let einzahlung = monthlyAmount * monate;
    let gewinn = endkapital - einzahlung;
    
    return { endkapital, einzahlung, gewinn };
  };

  const healioData = calculateValues(contribution, healioRate, years);
  const bankData = calculateValues(contribution, bankRate, years);
  
  const difference = healioData.endkapital - bankData.endkapital;

  const formatCurrency = (val) => new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(val);

  return (
    <section className="py-20 lg:py-24 bg-[#F3F4F6] overflow-hidden" id="zeitfalle-calculator">
      {/* Custom Styles for Slider to ensure high contrast and visibility */}
      <style>{`
        .healio-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 8px;
          background: #9CA3AF; /* Darker gray track for better contrast */
          outline: none;
        }
        .healio-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #07C090; /* Healio Green */
          border: 3px solid white; /* Thick white border to pop */
          box-shadow: 0 2px 8px rgba(7, 192, 144, 0.5);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: -8px; /* Centers thumb on track in some browsers if height differs */
          position: relative;
          z-index: 2;
        }
        /* Fix for vertical alignment in some Webkit browsers */
        .healio-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #9CA3AF;
          border-radius: 8px;
        }
        
        .healio-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(7, 192, 144, 0.7);
        }
        
        /* Firefox */
        .healio-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #07C090;
          border: 3px solid white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(7, 192, 144, 0.5);
        }
        .healio-slider::-moz-range-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #9CA3AF;
          border-radius: 8px;
        }
      `}</style>

      <div className="healio-container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 mb-6 text-[#07C090] font-bold bg-[#07C090]/10 px-4 py-1.5 rounded-full text-sm uppercase tracking-wide">
              <Clock className="w-4 h-4" />
              <span>{t('zeitfalle.title')}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-[1.15]">
              {t('zeitfalle.subtitle')}
            </h2>

            <h3 className="text-xl text-gray-600 font-medium mb-8">
              {t('zeitfalle.description')}
            </h3>

            <div className="prose prose-lg text-gray-600 mb-10">
              <p>
                {t('zeitfalle.explanation')}
              </p>
              <p>
                In der klassischen bAV wird das Geld oft durch Kosten und niedrige Zinsen "aufgefressen". Mit der Healio-Strategie nutzen wir die Kraft des Kapitalmarktes – steueroptimiert und effizient.
              </p>
            </div>
          </motion.div>


          {/* RIGHT COLUMN: Interactive Calculator & Results */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* 1. Calculator Controls */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100">
              {/* Slider 1: Monthly Contribution */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{t('zeitfalle.monthlyRate')}</label>
                  <div className="text-xl font-bold text-gray-900 bg-[#E5E7EB] px-4 py-1.5 rounded-lg border border-gray-300 min-w-[90px] text-center shadow-inner">
                    {contribution} €
                  </div>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="675" 
                  step="1" 
                  value={contribution} 
                  onChange={e => setContribution(parseInt(e.target.value))} 
                  className="healio-slider"
                />
                <div className="flex justify-between mt-3 text-xs text-gray-500 font-bold">
                  <span>50 €</span>
                  <span>675 €</span>
                </div>
              </div>

              {/* Slider 2: Duration */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{t('zeitfalle.duration')}</label>
                  <div className="text-xl font-bold text-gray-900 bg-[#E5E7EB] px-4 py-1.5 rounded-lg border border-gray-300 min-w-[90px] text-center shadow-inner">
                    {years} J.
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  step="1" 
                  value={years} 
                  onChange={e => setYears(parseInt(e.target.value))} 
                  className="healio-slider"
                />
                 <div className="flex justify-between mt-3 text-xs text-gray-500 font-bold">
                  <span>1 Jahr</span>
                  <span>40 Jahre</span>
                </div>
              </div>

              {/* Info Box - High Contrast */}
              <div className="bg-[#F0F9F7] rounded-xl p-5 flex items-start gap-3 border border-emerald-100 shadow-sm">
                <Info className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#065F46] leading-relaxed font-medium">
                  Nutzen Sie die Regler, um zu simulieren, wie sich das Kapital Ihrer Mitarbeiter über die Jahre entwickeln könnte. Die Zinseszins-Effekte werden bei längeren Laufzeiten extrem deutlich.
                </p>
              </div>
            </div>

            {/* 2. Result Card: The Difference */}
            <div className="bg-[#07C090] rounded-2xl p-6 md:p-8 shadow-lg text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-white" />
                  {t('zeitfalle.healioAdvantage')}
                </h3>
                <p className="text-white leading-relaxed font-medium text-lg">
                  Während klassische Produkte oft kaum die Inflation ausgleichen, baut die Healio-Strategie echtes Vermögen auf. Das ist der Unterschied zwischen "gut gemeint" und "gut gemacht".
                </p>
                <div className="mt-6 pt-5 border-t border-white/20 font-extrabold text-2xl">
                  {t('zeitfalle.advantage')} {formatCurrency(difference)}
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ZeitfalleSection;