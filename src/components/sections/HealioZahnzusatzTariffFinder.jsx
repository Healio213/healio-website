import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Plus } from 'lucide-react';

const HealioZahnzusatzTariffFinder = () => {
  const options = [
    {
      icon: Smile,
      title: "Alles gesund & vollzählig",
      description: "Ich habe keine fehlenden Zähne und keine laufenden Behandlungen.",
      link: "#"
    },
    {
      icon: Plus,
      title: "1 Zahn fehlt aktuell",
      description: "Mir fehlt derzeit ein Zahn (außer Weisheitszähne), der noch nicht ersetzt ist.",
      link: "#"
    },
    {
      icon: Frown,
      title: "2 bis 3 Zähne fehlen",
      description: "Mir fehlen derzeit mehrere Zähne, für die ich Ersatz benötige.",
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Finden Sie den Tarif, der Sie garantiert annimmt.
          </h2>
          <p className="text-xl text-gray-500">
            Wählen Sie Ihren aktuellen Zahnstatus für ein maßgeschneidertes Angebot.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.a
              key={index}
              href={option.link}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="block group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full text-center"
            >
              <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors duration-300">
                <option.icon className="w-8 h-8 text-gray-400 group-hover:text-emerald-600 transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {option.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {option.description}
              </p>
              
              <span className="inline-block text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Tarif anzeigen →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealioZahnzusatzTariffFinder;