
import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Clock, Shield, Star } from 'lucide-react';

const WhyBkvWithHealio = () => {
  const cards = [
    {
      icon: <PiggyBank className="w-12 h-12" />,
      title: "Hören Sie auf, Geld zu verschenken.",
      text: "Eine Bruttogehaltserhöhung von 50 € kostet Sie ca. 60 €. Beim Mitarbeiter kommen netto 21 € an. Der Rest geht an Steuern und Sozialabgaben. Ein Gesundheitsbudget von 600 € jährlich kostet Sie denselben Betrag, wird aber zu 100 % vom Mitarbeiter als Wertschätzung wahrgenommen.",
      accent: "text-blue-600",
      accentBg: "bg-blue-50"
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Wartezeit ist Ihr teuerster Kostenfaktor.",
      text: "Ein kranker Mitarbeiter, der 6 Wochen auf einen Facharzttermin wartet, kostet Lohnfortzahlung ohne Gegenleistung. Healio reduziert diese Wartezeit auf 5 Tage. Ein Krankheitstag kostet im Schnitt 400 € – berechnen Sie Ihren ROI selbst.",
      accent: "text-emerald-600",
      accentBg: "bg-emerald-50"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Zugang für alle. Ohne Ausnahme.",
      text: "Keine Gesundheitsprüfung. Keine Wartezeiten. Keine Ausschlüsse. Jeder Mitarbeiter im Kollektiv wird sofort aufgenommen – auch solche mit chronischen Vorerkrankungen, die privat sonst abgelehnt würden.",
      accent: "text-indigo-600",
      accentBg: "bg-indigo-50"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Fachkräfte erkennen den Unterschied.",
      text: "Obstkörbe und Tischkicker binden keine Leistungsträger mehr. Ein freies, steueroptimiertes Gesundheitsbudget schon. Es signalisiert echte Wertschätzung und verschafft Ihnen einen klaren Wettbewerbsvorteil auf dem Arbeitsmarkt.",
      accent: "text-amber-600",
      accentBg: "bg-amber-50"
    }
  ];

  return (
    <section className="py-28 lg:py-36 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="healio-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Warum Unternehmen zu Healio wechseln.
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Vier Gründe. Keine Floskeln.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 lg:p-10 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col items-start h-full group"
            >
              <div className={`p-4 rounded-2xl mb-6 ${card.accentBg} ${card.accent} transition-transform duration-300 group-hover:scale-110`}>
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {card.title}
              </h3>

              <p className="text-slate-500 text-base leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBkvWithHealio;
