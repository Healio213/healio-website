import React from 'react';
import { motion } from 'framer-motion';
import { ShieldPlus, CheckSquare, Gift } from 'lucide-react';

const steps = [
  { icon: <ShieldPlus className="w-10 h-10" />, title: "1. Zusatzversicherung wählen", description: "Die Basis für deine Top-Erstattungen bei Heilpraktiker, Brille & Co." },
  { icon: <CheckSquare className="w-10 h-10" />, title: "2. IKK Bonusprogramm nutzen", description: "Dein Schlüssel, um Prämien zu sammeln und Restkosten zu decken." },
  { icon: <Gift className="w-10 h-10" />, title: "3. Kostenlos behandelt werden", description: "Die verbleibenden Kosten deckst du einfach mit deinem angesammelten IKK-Bonus." }
];

const HowItWorks = () => {
  return (
    <section className="healio-section bg-white" aria-labelledby="how-it-works-heading">
      <div className="healio-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 id="how-it-works-heading" className="text-3xl lg:text-5xl font-extrabold text-healio-text">
            Dein Weg zur <span className="healio-gradient-text">vollen Erstattung</span>
          </h2>
          <p className="mt-4 text-lg text-healio-text-light max-w-2xl mx-auto">
            In nur drei einfachen Schritten zu maximaler Gesundheit ohne finanzielle Sorgen.
          </p>
        </motion.div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-200 -translate-y-full mt-4" aria-hidden="true"></div>
           {steps.map((step, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="healio-benefit-card space-y-4 h-full">
                <div className="healio-icon-box mx-auto" aria-hidden="true">{step.icon}</div>
                <h3 className="text-xl font-bold text-healio-text">{step.title}</h3>
                <p className="text-healio-text-light">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-left"
        >
          <h3 className="text-3xl lg:text-4xl font-extrabold text-healio-text text-center">
            Beispielrechnung – So profitierst du konkret
          </h3>
          <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
            <article className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-4">Deine Kosten auf einen Blick</h4>
              <div className="space-y-3 text-lg text-healio-text-light">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-healio-text">Position</span>
                  <span className="font-semibold text-healio-text">Betrag</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monatsbeitrag (z. B. Tarif Ambulant 100)</span>
                  <span className="font-bold">40 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Jahresbeitrag</span>
                  <span className="font-bold">480 €</span>
                </div>
                <div className="flex justify-between items-center text-healio-green">
                  <span>IKK classic Bonus (Beispiel)</span>
                  <span className="font-bold">+ 550 €</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t-2 border-healio-primary-dark font-bold text-healio-text text-xl">
                  <span>Netto-Kosten</span>
                  <span>0 € <span className="text-base font-normal">(Bonus deckt Beitrag & 70 € Überschuss)</span></span>
                </div>
              </div>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-4">Erstattbare Leistungen pro Jahr</h4>
              <div className="space-y-3 text-lg text-healio-text-light">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-healio-text">Leistung</span>
                  <span className="font-semibold text-healio-text">Kosten</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Alternative Behandlungen, Massagen, Osteopathie</span>
                  <span className="font-bold">1 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Neue Brille</span>
                  <span className="font-bold">500 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weitere ambulante Leistungen/Facharzt-Zuzahlungen</span>
                  <span className="font-bold">1 000 €</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t-2 border-healio-primary-dark font-bold text-healio-text text-xl">
                  <span>Gesamtleistung</span>
                  <span>2 500 €</span>
                </div>
              </div>
              <p className="mt-6 text-healio-text-light text-base">
                <span className="font-bold text-healio-green">Effektiver Vorteil:</span> Du zahlst effektiv nichts, denn dein Bonus refinanziert den gesamten Beitrag und kommt jedes Jahr wieder.
              </p>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;