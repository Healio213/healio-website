
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqsData = [
  {
    question: "Wie funktioniert die Erstattung?",
    answer: "Sie reichen die Rechnung der Behandlung ein und erhalten vertragsgemäß bis zu 100 % der Kosten zurück. Effizient, schnell und ohne bürokratische Hürden."
  },
  {
    question: "Für wen lohnt sich das Konzept?",
    answer: "Für jeden gesetzlich Versicherten, der medizinische Premium-Leistungen beanspruchen möchte, ohne diese aus eigener Tasche zu zahlen. Zahlen und Fakten belegen den Mehrwert."
  },
  {
    question: "Kann die gesamte Familie teilnehmen?",
    answer: "Ja. Jedes Familienmitglied kann eine eigene Zusatzversicherung abschließen. Die Leistungen greifen individuell und bedarfsgerecht."
  },
  {
    question: "Gibt es einen Haken?",
    answer: "Nein. Wir kombinieren bewährte Versicherungstarife zu einem transparenten Konzept. Sie nutzen geltendes Recht und bestehende Angebote optimal aus — ohne versteckte Klauseln."
  },
  {
    question: "Welche Leistungen werden erstattet?",
    answer: "Die Erstattung hängt vom gewählten Tarif ab. Typische Leistungen umfassen Zahnprophylaxe, hochwertigen Zahnersatz, Facharztbehandlungen, Heilpraktiker sowie stationäre Unterbringung im Ein- oder Zweibettzimmer."
  },
  {
    question: "Wie hoch ist der monatliche Beitrag?",
    answer: "Die Beiträge variieren je nach Alter und Leistungsumfang, meist zwischen 20 € und 40 € monatlich. Ein Bruchteil der Kosten, die im Ernstfall auf Sie zukommen würden."
  },
  {
    question: "Was ist das IKK Bonusprogramm?",
    answer: "Ein gesetzliches Bonusprogramm, das gesundheitsbewusstes Verhalten belohnt. Sie erhalten finanzielle Rückerstattungen für Vorsorgemaßnahmen, die Ihre Beitragskosten signifikant senken können."
  },
  {
    question: "Muss ich alles selbst beantragen?",
    answer: "Nein. Wir übernehmen die Abwicklung. Sie erhalten eine fertige Lösung und sparen Zeit und Nerven."
  }
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <article className="border border-slate-100 rounded-xl mb-4 bg-white overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" aria-hidden="true" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6"
          >
            <p className="pb-6 text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-24 bg-slate-50" aria-labelledby="faq-heading">
      <div className="healio-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Häufige Fragen — direkt beantwortet.
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Die wichtigsten Fakten im Überblick. Klar und transparent.
          </p>
        </div>
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
