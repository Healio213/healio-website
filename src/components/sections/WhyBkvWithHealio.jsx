
import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Clock, Shield, Star } from 'lucide-react';

const WhyBkvWithHealio = () => {
  const cards = [
    {
      icon: <PiggyBank className="w-12 h-12" />,
      title: "Hören Sie auf, Geld zu verschenken.",
      text: "Eine Bruttogehaltserhöhung von 50 € kostet Sie ca. 60 €. Beim Mitarbeiter kommen netto 21 € an. Der Rest geht an Steuern und Sozialabgaben. Ein Gesundheitsbudget von 600 € jährlich kostet Sie denselben Betrag, wird aber zu 100 % vom Mitarbeiter als Wertschätzung wahrgenommen. Das ist keine Meinung, das ist Mathematik.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Wartezeit ist Ihr teuerster Kostenfaktor.",
      text: "Ein kranker Mitarbeiter, der 6 Wochen auf einen Facharzttermin wartet, kostet Lohnfortzahlung ohne Gegenleistung. Healio reduziert diese Wartezeit auf 5 Tage. Weniger Wartezeit, schnellere Diagnose, schnellere Rückkehr. Ein Krankheitstag kostet im Schnitt 400 € – berechnen Sie Ihren ROI selbst.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Zugang für alle. Ohne Ausnahme.",
      text: "Keine Gesundheitsprüfung. Keine Wartezeiten. Keine Ausschlüsse. Jeder Mitarbeiter im Kollektiv wird sofort aufgenommen – auch solche mit chronischen Vorerkrankungen, die privat sonst abgelehnt würden. Ein System, das sofort greift und niemanden zurücklässt.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Fachkräfte erkennen den Unterschied.",
      text: "Obstkörbe und Tischkicker binden keine Leistungsträger mehr. Ein freies, steueroptimiertes Gesundheitsbudget schon. Wenn ein Mitarbeiter die Wahl zwischen 25 € Netto-Erhöhung und 600 € für Brille, Zahnreinigung oder Heilpraktiker hat, gewinnt Letzteres. Es signalisiert echte Wertschätzung und verschafft Ihnen einen klaren Wettbewerbsvorteil auf dem Arbeitsmarkt.",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-[#25c990]/5 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#25c990]/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25c990]/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
      
      <div className="healio-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Warum Unternehmen zu Healio wechseln.
            </h2>
            <p className="text-lg text-slate-600">
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
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col items-start h-full group"
            >
              <div className={`p-4 rounded-2xl mb-6 ${card.color} transition-transform duration-300 group-hover:scale-110`}>
                {card.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {card.title}
              </h3>
              
              <p className="text-slate-600 text-base leading-relaxed">
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
