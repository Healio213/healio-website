import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Shield, Heart } from 'lucide-react';

const BkvEmployerBenefits = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Effizienter als Gehaltserhöhungen",
      desc: "Steuervorteil für Arbeitgeber und Arbeitnehmer"
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Weniger Ausfallzeiten",
      desc: "Schnellere Arzttermine und bessere Gesundheitsversorgung"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Keine Gesundheitsprüfung",
      desc: "Einfache Aufnahme aller Mitarbeiter – kein Papierkram"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Starke Mitarbeiterbindung",
      desc: "Echter Benefit statt Obstkorb – zeigt echte Wertschätzung"
    }
  ];

  return (
    <section className="healio-section bg-white">
      <div className="healio-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group h-full"
            >
              <div className="text-healio-primary mb-6 group-hover:scale-110 transition-transform duration-300 inline-block bg-healio-light p-3 rounded-full">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-healio-text mb-3">
                {benefit.title}
              </h3>
              <p className="text-healio-text-muted leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BkvEmployerBenefits;