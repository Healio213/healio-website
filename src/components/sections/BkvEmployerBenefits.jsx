import React from 'react';
import { motion } from 'framer-motion';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const BkvEmployerBenefits = () => {
  const benefits = [
    {
      kind: 'money', tone: 'butter',
      title: "Effizienter als Gehaltserhöhungen",
      desc: "Steuervorteil für Arbeitgeber und Arbeitnehmer"
    },
    {
      kind: 'switch', tone: 'sky',
      title: "Weniger Ausfallzeiten",
      desc: "Schnellere Arzttermine und bessere Gesundheitsversorgung"
    },
    {
      kind: 'protection', tone: 'mint',
      title: "Keine Gesundheitsprüfung",
      desc: "Einfache Aufnahme aller Mitarbeiter – kein Papierkram"
    },
    {
      kind: 'support', tone: 'coral',
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
              <FriendlyIcon kind={benefit.kind} tone={benefit.tone} className="mb-6 transition-transform duration-300 group-hover:scale-110" />
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
