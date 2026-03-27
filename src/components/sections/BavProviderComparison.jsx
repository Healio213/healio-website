
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingDown, DollarSign, Gift } from 'lucide-react';
import { TextHighlight, AnimatedCounter } from '@/components/ui/ScrollAnimation';

const BavProviderComparison = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gesetzlicher Anspruch",
      description: "§ 1a BetrAVG. Pflicht für jeden Arbeitgeber. Kein Verhandlungsspielraum.",
      accent: "text-blue-600",
      accentBg: "bg-blue-50",
      border: "border-l-blue-500"
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Rentenlücke schließen",
      description: "800 € monatliche Lücke im Durchschnitt. Wer das ignoriert, verliert Mitarbeiter an Arbeitgeber, die es nicht tun.",
      accent: "text-rose-600",
      accentBg: "bg-rose-50",
      border: "border-l-rose-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Enorme Steuervorteile",
      description: "Bis 338 €/Monat steuer- und sozialabgabenfrei. Das ist kein Benefit — das ist Mathematik.",
      accent: "text-emerald-600",
      accentBg: "bg-emerald-50",
      border: "border-l-emerald-500"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Arbeitgeberzuschuss",
      description: "15 % gesetzlicher Mindestzuschuss. Clevere Arbeitgeber nutzen das als Bindungsinstrument.",
      accent: "text-indigo-600",
      accentBg: "bg-indigo-50",
      border: "border-l-indigo-500"
    }
  ];

  return (
    <section className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

        {/* Introduction */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Betriebliche Altersvorsorge — Was die meisten Unternehmen <TextHighlight>falsch machen</TextHighlight>
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-[#25c990] to-emerald-300 rounded-full mx-auto my-8"></div>

            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium">
              Seit 2002 hat jeder Arbeitnehmer gesetzlichen Anspruch auf Entgeltumwandlung. Die meisten Unternehmen haken das Thema ab und lassen enormes Potenzial liegen. Wenige nutzen die bAV als das, was sie sein kann: ein strategischer Vorteil, der Sozialabgaben senkt und Fachkräfte bindet.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: 800, suffix: " €", label: "Rentenlücke / Monat" },
            { value: 338, suffix: " €", label: "Steuerfrei / Monat" },
            { value: 15, suffix: " %", label: "Pflichtzuschuss AG" },
            { value: 2002, suffix: "", label: "Gesetzlicher Anspruch seit" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-healio-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm lg:text-base text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Clean Cards with colored left border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white p-7 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 border-l-4 ${benefit.border} group`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${benefit.accentBg} ${benefit.accent}`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BavProviderComparison;
