
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingDown, DollarSign, Gift } from 'lucide-react';
import { TextHighlight } from '@/components/ui/ScrollAnimation';

const BavProviderComparison = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gesetzlicher Anspruch",
      description: "§ 1a BetrAVG. Pflicht für jeden Arbeitgeber. Kein Verhandlungsspielraum.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Rentenlücke schließen",
      description: "800 € monatliche Lücke im Durchschnitt. Wer das ignoriert, verliert Mitarbeiter an Arbeitgeber, die es nicht tun.",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Enorme Steuervorteile",
      description: "Bis 338 €/Monat steuer- und sozialabgabenfrei. Das ist kein Benefit — das ist Mathematik.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Arbeitgeberzuschuss",
      description: "15 % gesetzlicher Mindestzuschuss. Clevere Arbeitgeber nutzen das als Bindungsinstrument.",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#25c990]/5 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Engaging B2B Introduction Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Betriebliche Altersvorsorge — Was die meisten Unternehmen <TextHighlight>falsch machen</TextHighlight>
            </h2>
            
            <div className="w-24 h-1.5 bg-[#25c990] rounded-full mx-auto my-8 shadow-sm"></div>
            
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium">
              Seit 2002 hat jeder Arbeitnehmer gesetzlichen Anspruch auf Entgeltumwandlung. Die meisten Unternehmen haken das Thema ab und lassen enormes Potenzial liegen. Wenige nutzen die bAV als das, was sie sein kann: ein strategischer Vorteil, der Sozialabgaben senkt und Fachkräfte bindet. Der Unterschied liegt nicht im Ob, sondern im Wie.
            </p>
          </motion.div>
        </div>

        {/* Part 1: Why bAV is important */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${benefit.bg} ${benefit.color}`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BavProviderComparison;
