
import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  { emoji: "👓", title: "Sehhilfen (Brillen, Kontaktlinsen)", desc: "bis 500 Euro", bgColor: "bg-green-50" },
  { emoji: "👁️", title: "Augen-Laser (Refraktive Chirurgie/LASIK)", desc: "100% je Auge", bgColor: "bg-blue-50" },
  { emoji: "🌿", title: "Heilpraktiker und Naturheilverfahren", desc: "inkl. Hufelandverzeichnis", bgColor: "bg-amber-50" },
  { emoji: "🤲", title: "Osteopathie und Chiropraktik", desc: "", bgColor: "bg-purple-50" },
  { emoji: "☯️", title: "Traditionelle Chinesische Medizin (TCM)", desc: "", bgColor: "bg-rose-50" },
  { emoji: "🩺", title: "Vorsorgeuntersuchungen und Früherkennung", desc: "", bgColor: "bg-teal-50" },
  { emoji: "💉", title: "Schutzimpfungen (STIKO, Grippe, Zecken, Reise)", desc: "", bgColor: "bg-green-50" },
  { emoji: "💊", title: "Arznei-, Heil- und Verbandmittel", desc: "", bgColor: "bg-blue-50" },
  { emoji: "✈️", title: "Auslandsschutz", desc: "100%, beliebig viele Reisen bis 56 Tage", bgColor: "bg-amber-50" },
  { emoji: "🫶", title: "Medizinisch-Psychologischer Beratungsservice", desc: "", bgColor: "bg-purple-50" },
  { emoji: "👨‍⚕️", title: "Facharzt", desc: "Erstattung für Facharztbehandlungen und spezielle ärztliche Leistungen", bgColor: "bg-rose-50" }
];

const AmbulantBenefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Das bekommst du mit Healio
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-green-200 hover:scale-105 hover:bg-green-50 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className={`${benefit.bgColor} rounded-full p-5 w-fit mb-4`}>
                <span className="text-4xl" role="img" aria-label={benefit.title}>
                  {benefit.emoji}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              {benefit.desc && <p className="text-gray-600 font-medium">{benefit.desc}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbulantBenefits;
