
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, Users, ArrowDown, ArrowUp, CheckCircle2, XCircle } from 'lucide-react';
import { TextHighlight } from '@/components/ui/ScrollAnimation';

const RenditeVergleichSection = () => {
  // Fixed values instead of state
  const pmt = 338;
  const jahre = 25;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateValues = (monthlyPmt, years, interestRate) => {
    if (years === 0) return { endkapital: 0, einzahlung: 0, gewinn: 0 };
    
    let monatszins = interestRate / 12;
    let monate = years * 12;
    
    let endkapital = monthlyPmt * ((Math.pow(1 + monatszins, monate) - 1) / monatszins) * (1 + monatszins);
    let einzahlung = monthlyPmt * monate;
    let gewinn = endkapital - einzahlung;
    
    return { endkapital, einzahlung, gewinn };
  };

  const healioZins = 0.0847; // 8.47%
  const klassischZins = 0.007; // 0.7%

  const currentHealio = calculateValues(pmt, jahre, healioZins);
  const currentKlassisch = calculateValues(pmt, jahre, klassischZins);

  const data = useMemo(() => {
    return Array.from({ length: jahre + 1 }, (_, i) => {
      const healioVals = calculateValues(pmt, i, healioZins);
      const klassischVals = calculateValues(pmt, i, klassischZins);

      return {
        year: i,
        healio: Math.round(healioVals.endkapital),
        klassisch: Math.round(klassischVals.endkapital),
        einzahlung: Math.round(healioVals.einzahlung)
      };
    });
  }, [pmt, jahre]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 p-3 border border-slate-700 shadow-xl rounded-md text-xs text-white min-w-[180px]">
          <p className="font-bold text-white mb-2 pb-1 border-b border-white/20">Nach {label} {label === 1 ? 'Jahr' : 'Jahren'}</p>
          <div className="flex justify-between items-center gap-4 text-[#25c990] mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#25c990]"></div>
              <span>Healio (8,47%):</span>
            </div>
            <span className="font-bold">{formatCurrency(payload[0].value)}</span>
          </div>
          <div className="flex justify-between items-center gap-4 text-slate-300 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <span>Klassisch (0,7%):</span>
            </div>
            <span className="font-bold">{formatCurrency(payload[1].value)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden" id="rendite">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#25c990]/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            Rendite Vergleich <br className="hidden md:block"/>
            <TextHighlight>Healio vs. Klassische bAV</TextHighlight>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Berechnung bei einer monatlichen Sparrate von {pmt} € über eine Laufzeit von {jahre} Jahren.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* Results Panel */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-6 justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Results Display */}
            <div className="grid grid-cols-1 gap-6">
              {/* Healio Result */}
              <div className="bg-slate-900 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#25c990]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#25c990]"></div>
                  Healio Strategie (8,47%)
                </h4>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between text-base">
                    <span className="text-slate-300">Einzahlung:</span>
                    <span className="text-white font-medium">{formatCurrency(currentHealio.einzahlung)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-slate-300">Gewinn:</span>
                    <span className="text-[#25c990] font-medium">+{formatCurrency(currentHealio.gewinn)}</span>
                  </div>
                  <div className="h-px w-full bg-white/20 my-4"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-300 font-medium text-lg">Endkapital:</span>
                    <span className="text-3xl font-bold text-white">{formatCurrency(currentHealio.endkapital)}</span>
                  </div>
                </div>
              </div>

              {/* Klassisch Result */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200">
                <h4 className="text-slate-900 font-bold text-xl mb-6 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  Klassische bAV (0,7%)
                </h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-slate-500">Einzahlung:</span>
                    <span className="text-slate-900 font-medium">{formatCurrency(currentKlassisch.einzahlung)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-slate-500">Gewinn:</span>
                    <span className="text-slate-600 font-medium">+{formatCurrency(currentKlassisch.gewinn)}</span>
                  </div>
                  <div className="h-px w-full bg-slate-200 my-4"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-500 font-medium text-lg">Endkapital:</span>
                    <span className="text-2xl font-bold text-slate-900">{formatCurrency(currentKlassisch.endkapital)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart Panel */}
          <motion.div 
            className="lg:col-span-7 bg-white rounded-2xl p-4 md:p-8 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Wertentwicklung über {jahre} Jahre</h3>
            
            <div className="flex-1 min-h-[300px] w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorHealio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#25c990" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#25c990" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorKlassisch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="year" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(val) => val % 5 === 0 ? `${val} J.` : ''}
                  />
                  <YAxis 
                    hide={true} 
                    domain={[0, 'dataMax']} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="healio" 
                    stroke="#25c990" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHealio)" 
                    animationDuration={1000}
                  />
                  
                  <Area 
                    type="monotone" 
                    dataKey="klassisch" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorKlassisch)" 
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-[#25c990]/10 rounded-xl border border-[#25c990]/20 text-center">
              <p className="text-sm md:text-base font-medium text-slate-800">
                Der Zinseszinseffekt generiert bei der Healio Strategie ein <br className="hidden md:block"/>
                <span className="text-[#25c990] font-bold">
                  Mehrkapital von {formatCurrency(currentHealio.endkapital - currentKlassisch.endkapital)}
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* bKV Pricing Comparison Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mt-16 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-20 -mt-20 z-0"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Lohnerhöhung vs. Gesundheits-Benefit
              </h3>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Warum eine klassische Gehaltserhöhung verpufft, während ein Gesundheits-Benefit bei Ihren Mitarbeitern im Gedächtnis bleibt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
              
              {/* Klassische Lohnerhöhung Card */}
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 flex flex-col relative">
                <div className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow-sm">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-6 text-center">
                  Klassische Lohnerhöhung
                </h4>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">AG-Aufwand</span>
                    <span className="text-lg font-bold text-slate-800">50 €</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-4 h-4 text-red-500" />
                      <span className="text-slate-600">Steuern & Abgaben</span>
                    </div>
                    <span className="text-lg font-bold text-red-500">- 29 €</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 text-center border border-slate-200 shadow-sm mt-auto">
                  <span className="block text-sm text-slate-500 font-medium mb-1 uppercase tracking-wide">Netto-Effekt Mitarbeiter</span>
                  <span className="text-3xl font-black text-slate-800">21 €</span>
                </div>
              </div>

              {/* Healio Benefit Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-100/50 rounded-2xl p-6 md:p-8 border border-green-200 flex flex-col relative shadow-md shadow-green-100">
                <div className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#25c990]" />
                </div>
                <h4 className="text-xl font-bold text-green-900 mb-6 text-center">
                  Healio Gesundheits-Benefit
                </h4>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex justify-between items-center py-3 border-b border-green-200/60">
                    <span className="text-green-800 font-medium">AG-Aufwand</span>
                    <span className="text-lg font-bold text-green-900">50 €</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-green-200/60">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-green-800">Steuerfrei für Mitarbeiter</span>
                    </div>
                    <span className="text-lg font-bold text-emerald-600">✓</span>
                  </div>
                </div>

                <div className="bg-[#25c990] rounded-xl p-5 text-center shadow-lg mt-auto transform hover:scale-[1.02] transition-transform">
                  <span className="block text-sm text-green-50 font-medium mb-1 uppercase tracking-wide">Gesundheitsbudget / Jahr</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-black text-white">1.500 €</span>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* VS Badge */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center z-20">
                <span className="text-slate-400 font-bold text-sm">VS</span>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="inline-block bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-full font-medium shadow-sm">
                <strong className="text-green-600 font-bold text-xl mr-2">1.500 € Budget</strong> statt 21 € Netto auf dem Konto!
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default RenditeVergleichSection;
