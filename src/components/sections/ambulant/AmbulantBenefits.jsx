
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const highlightCards = [
  {
    emoji: "🌿",
    title: "Heilpraktiker & Naturheilkunde",
    desc: "Heilpraktiker, Osteopathie, TCM, Chiropraktik, Akupunktur",
    budget: "Bis zu 1.000 € (alle 2 Jahre) | inkl. Hufelandverzeichnis",
    bgColor: "bg-amber-50"
  },
  {
    emoji: "👓",
    title: "Sehhilfen & Augen-Laser",
    desc: "Brillen, Kontaktlinsen, Sonnenbrillen mit Sehstärke",
    budget: "Bis zu 500 € (alle 2 Jahre) | LASIK bis 1.000 € je Auge",
    bgColor: "bg-blue-50"
  },
  {
    emoji: "🩺",
    title: "Vorsorge & Impfungen",
    desc: "Krebsvorsorge, Check-ups, STIKO-Impfungen, Reiseimpfungen",
    budget: "Bis zu 500 € (alle 2 Jahre) | inkl. Präventionskurse",
    bgColor: "bg-teal-50"
  },
  {
    emoji: "💊",
    title: "Arzneimittel & Zuzahlungen",
    desc: "Gesetzliche Zuzahlungen für Arznei-, Heil- und Hilfsmittel",
    budget: "Bis zu 1.000 € (alle 2 Jahre) | plus Auslandsschutz inklusive",
    bgColor: "bg-green-50"
  },
];

const moreBenefits = [
  { emoji: "🤲", title: "Osteopathie und Chiropraktik", desc: "" },
  { emoji: "☯️", title: "Traditionelle Chinesische Medizin (TCM)", desc: "" },
  { emoji: "✈️", title: "Auslandsschutz", desc: "100%, beliebig viele Reisen bis 56 Tage" },
  { emoji: "🫶", title: "Medizinisch-Psychologischer Beratungsservice", desc: "" },
  { emoji: "👨‍⚕️", title: "Naturheilkundliche Behandlungen durch Ärzte", desc: "Erstattung für ärztliche Naturheilverfahren nach GOÄ bis zum 3,5-fachen Satz" },
  { emoji: "📍", title: "Akupunktur", desc: "Professionelle Akupunkturbehandlungen" },
];

const AmbulantBenefits = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Das bekommst du mit Healio
          </h2>
        </div>

        {/* 4 Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {highlightCards.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-green-200 hover:border-[#10b981] transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className={`${benefit.bgColor} rounded-full p-5 w-fit mb-4`}>
                <span className="text-4xl" role="img" aria-label={benefit.title}>
                  {benefit.emoji}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{benefit.desc}</p>
              <p className="text-[#10b981] font-semibold text-sm">{benefit.budget}</p>
            </motion.div>
          ))}
        </div>

        {/* Accordion for remaining benefits */}
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            <span>Alle Leistungen im Detail</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>

          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
            >
              {moreBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col items-center text-center"
                >
                  <span className="text-3xl mb-3" role="img" aria-label={benefit.title}>
                    {benefit.emoji}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  {benefit.desc && <p className="text-gray-600 text-sm">{benefit.desc}</p>}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AmbulantBenefits;
