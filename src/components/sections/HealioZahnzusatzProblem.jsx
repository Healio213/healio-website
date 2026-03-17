import React from 'react';
import { motion } from 'framer-motion';

const HealioZahnzusatzProblem = () => {
  return (
    <section className="py-20 bg-white">
      <div className="healio-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-semibold text-sm mb-6">
            Die Kostenfalle
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            Das Problem: Gesetzliche Krankenversicherung deckt fast nichts ab
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Wenn es beim Zahnarzt ernst wird, wird es teuer. Die gesetzlichen Kassen zahlen bei Zahnersatz nur einen geringen Festzuschuss – oft weniger als 50% der einfachsten Versorgung.
            </p>
            <p>
              Hochwertige Implantate, Keramikkronen oder Inlays müssen Sie fast komplett selbst bezahlen. Eine einzelne Rechnung kann schnell <strong>mehrere tausend Euro</strong> betragen. Ohne Zusatzversicherung bleiben Sie auf diesen Kosten sitzen.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealioZahnzusatzProblem;