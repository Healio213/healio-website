
import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, TrendingDown, PiggyBank, HeartHandshake } from 'lucide-react';

const GesundheitSection = () => {
  const hrBenefits = [
    {
      icon: <Stethoscope className="w-10 h-10" />,
      title: "Schnellere Facharzttermine",
      desc: "5–10 Tage statt 6–8 Wochen. Schnellere Diagnose. Schnellere Rückkehr. Weniger Lohnfortzahlung.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: <TrendingDown className="w-10 h-10" />,
      title: "Kranktage senken",
      desc: "Bis zu 30 % weniger Ausfallzeiten. Das ist kein Versprechen — das ist die Statistik.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <PiggyBank className="w-10 h-10" />,
      title: "Kosten sparen",
      desc: "Ein Krankheitstag kostet 400 €. Zwei eingesparte Fehltage amortisieren die gesamten Jahreskosten.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      title: "Mitarbeiterbindung",
      desc: "Gesundheit ist das persönlichste Thema. Wer hier investiert, signalisiert echte Wertschätzung — nicht nur ein höheres Gehalt.",
      color: "text-rose-600",
      bg: "bg-rose-50"
    }
  ];

  return (
    <section className="healio-section bg-white relative z-10" id="bkv-hr-benefits">
      <div className="healio-container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Was eine bKV wirklich kostet — und was sie <span className="text-[#25c990]">bringt.</span>
            </h2>
            <p className="text-lg text-slate-600">
              Zahlen lügen nicht. Eine bKV ist kein Wohlfühl-Benefit. Sie ist eine Investition mit messbarem Return.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hrBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className={`p-4 rounded-full ${benefit.bg} ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GesundheitSection;
