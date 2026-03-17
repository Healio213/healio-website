import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Eye, Stethoscope, Hand, Smile, Gift, Plane, ShieldCheck } from 'lucide-react';

const benefitsData = [{
  icon: <Leaf className="w-8 h-8" />,
  title: "Heilpraktiker & Osteopathie",
  description: "100% Erstattung für alternative Heilmethoden (bis 1.000€ in 2 Jahren)."
}, {
  icon: <Eye className="w-8 h-8" />,
  title: "Sehhilfen bis 500€",
  description: "Großzügiger Zuschuss für deine neue Brille oder Kontaktlinsen."
}, {
  icon: <Stethoscope className="w-8 h-8" />,
  title: "Ärztliche Zusatzleistungen",
  description: "Viele Extraleistungen beim Arzt (z.B. Gynäkologie) sind mitversichert."
}, {
  icon: <Hand className="w-8 h-8" />,
  title: "Massagen & Physiotherapie",
  description: "Erstattung für medizinische Massagen und weitere physiotherapeutische Behandlungen."
}, {
  icon: <Smile className="w-8 h-8" />,
  title: "Zahnreinigung & Vorsorge",
  description: "Professionelle Zahnreinigung und Vorsorge werden über den Bonus voll finanziert."
}, {
  icon: <Gift className="w-8 h-8" />,
  title: "IKK Bonus bis 700€+",
  description: "Sichere dir jährlich einen riesigen Bonus für deine gesunden Aktivitäten."
}, {
  icon: <Plane className="w-8 h-8" />,
  title: "Auslandsreisen",
  description: "100% Kostenübernahme für die weltweite Reisekrankenversicherung."
}, {
  icon: <ShieldCheck className="w-8 h-8" />,
  title: "Vorsorge & Impfungen",
  description: "Über das Bonusprogramm werden viele wichtige Vorsorgeleistungen voll finanziert."
}];

const Benefits = () => {
  return (
    <section className="healio-section" aria-labelledby="benefits-heading">
      <div className="healio-container text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <h2 id="benefits-heading" className="text-3xl lg:text-5xl font-extrabold text-healio-text">
            Deine Vorteile <span className="healio-gradient-text">im Überblick</span>
          </h2>
          <p className="mt-4 text-lg text-healio-text-light max-w-3xl mx-auto">
            Maximal profitieren, minimal selbst zahlen. Das ist das Healio-Prinzip.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          viewport={{ once: true }} 
          className="mt-16 text-left"
        >
          <h3 className="text-3xl lg:text-4xl font-extrabold text-healio-text text-center mb-8">
            Kurz auf den Punkt gebracht
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-2">Alles-aus-einer-Hand-Erlebnis</h4>
              <p className="text-healio-text-light">Ein Anbieter, ein Ablauf – statt fünf Stellen und 20 Minuten Chaos.</p>
            </article>
            <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-2">Netto-Beitrag ≈ 0 €</h4>
              <p className="text-healio-text-light">Durch die IKK classic Bonus-Kopplung wird sich dein Beitrag oft ganz oder teilweise ausgleichen.</p>
            </article>
            <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-2">Spezialisierung statt Tarif-Dschungel</h4>
              <p className="text-healio-text-light">Du willst ambulante Lücken schließen, nicht 50 Tarife wälzen. Healio filtert vor und zeigt nur das, was diese Lücke wirklich füllt.</p>
            </article>
            <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-2">Digitale Einfachheit</h4>
              <p className="text-healio-text-light">Ein Login, ein Chat, ein Prozess – ohne Papier, ohne Hotline, ohne Rätselraten.</p>
            </article>
            <article className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-healio-text mb-2">Schnelle Liquidität</h4>
              <p className="text-healio-text-light">Rechnung hochladen, einreichen, fertig – du kommst schneller an dein Geld, ohne hinterherzulaufen.</p>
            </article>
          </div>
          <p className="mt-8 text-lg text-healio-text-light max-w-4xl mx-auto text-center">
            Wer also wenig Zeit, einen klaren Mehrwert und maximalen Nutzen will, wählt das Healio Konzept – und überlässt die komplette Recherche und die gesamte Abwicklung einem einzigen, spezialisierten Partner.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsData.map((benefit, index) => (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="healio-benefit-card"
            >
              <div className="healio-icon-box mx-auto" aria-hidden="true">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-healio-text">{benefit.title}</h3>
              <p className="text-healio-text-light text-sm">{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Benefits;