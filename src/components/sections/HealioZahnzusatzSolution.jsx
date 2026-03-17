import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Shield } from 'lucide-react';

const HealioZahnzusatzSolution = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "100% Erstattung",
      description: "Wir übernehmen bis zu 100% der Kosten für hochwertigen Zahnersatz, Inlays und Implantate. Keine Kompromisse mehr bei der Qualität."
    },
    {
      icon: Sparkles,
      title: "Zahnreinigung inklusive",
      description: "Professionelle Zahnreinigung so oft Sie wollen. Wir erstatten die Kosten für Ihre Prophylaxe – für ein strahlendes Lächeln."
    },
    {
      icon: Shield,
      title: "Sofort-Schutz",
      description: "Keine Wartezeiten. Ihr Versicherungsschutz beginnt sofort ab dem ersten Tag. Reichen Sie Rechnungen direkt ein."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="healio-container">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Die Lösung</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">Rundum-Schutz für Ihre Zähne</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                <benefit.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealioZahnzusatzSolution;