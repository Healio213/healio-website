
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqsData = [
  {
    question: "Was kostet das ZahnUpgrade monatlich?",
    answer: "Die Beiträge starten ab 5 Euro im Monat (ZahnUpgrade 50) ohne Alterungsrückstellungen. Der beliebteste Tarif ZahnUpgrade 70+ liegt ab 8 Euro, der Testsieger ZahnUpgrade 90+ ab 13,50 Euro. Optional können Beiträge mit Alterungsrückstellungen abgeschlossen werden, um im Alter günstigere Beiträge zu sichern."
  },
  {
    question: "Kann ich die Versicherung auch mit fehlenden Zähnen abschließen?",
    answer: "Ja. Bis zu 3 bereits fehlende Zähne können mitversichert werden. Der Risikozuschlag beträgt lediglich 5 Euro pro fehlendem Zahn und Monat. Das ist ein echtes Alleinstellungsmerkmal, denn viele andere Zahnzusatzversicherungen lehnen Kunden mit fehlenden Zähnen ab."
  },
  {
    question: "Was ist BonusPlus und wie funktioniert es?",
    answer: "BonusPlus erhöht Ihre Erstattung automatisch, wenn Sie ein lückenlos geführtes Bonusheft vorweisen können. Im Tarif ZahnUpgrade 70+ steigt die Erstattung von 70 % auf 75 % (nach 5 Jahren Bonusheft). Im Tarif ZahnUpgrade 90+ steigt sie von 90 % auf 95 % (5 Jahre) und sogar auf 100 % (10 Jahre). BonusPlus ist ab 21 Jahren verfügbar."
  },
  {
    question: "Gibt es Wartezeiten beim ZahnUpgrade?",
    answer: "Nein. Der Versicherungsschutz gilt sofort ab dem ersten Tag. Professionelle Zahnreinigung, Prophylaxe und alle anderen Leistungen können direkt in Anspruch genommen werden. In den ersten Kalenderjahren gelten allerdings Summenbegrenzungen (1.000 Euro im 1./2. Jahr), die danach entfallen."
  },
  {
    question: "Ich habe bereits eine Zahnzusatzversicherung. Kann ich wechseln?",
    answer: "Ja. Bei einem Wechsel von einer anderen Zahnzusatzversicherung zum ZahnUpgrade wird Ihre Vorversicherung angerechnet. Die Summenbegrenzung im ersten Kalenderjahr wird erlassen, wenn Ihre bisherige Versicherung mindestens 40 % Zahnersatz erstattet hat. Die Wechsel-Option ermöglicht es, nach 3, 6 oder 9 Jahren ohne erneute Gesundheitsprüfung in den höheren Tarif zu wechseln."
  },
  {
    question: "Welche Leistungen sind in allen Tarifen enthalten?",
    answer: "Alle drei Tarife beinhalten: Hochwertigen Zahnersatz (Implantate, Kronen, Brücken, Inlays), Zahnbehandlungen (Füllungen, Wurzelbehandlungen, Parodontose, Knirscherschienen), professionelle Zahnreinigung und Fissurenversiegelung, Unfall-Sofortschutz ohne Höchstsummen, Inflationsvorsorge und Innovationsvorsorge. Ab dem 70+-Tarif kommen zusätzlich Bleaching und besondere Schmerzausschaltung (Lachgas, Hypnose, Akupunktur) hinzu."
  },
  {
    question: "Wie wurde das ZahnUpgrade bewertet?",
    answer: "Der Tarif ZahnUpgrade 90+ wurde von Stiftung Warentest mit der Note SEHR GUT (0,8) ausgezeichnet und ist Testsieger in der Kategorie 'Gut und günstig' (Finanzen, Ausgabe 07/2025). Zusätzlich hat der Versicherer das Siegel 'Höchste Kundenzufriedenheit' von Focus Money erhalten und wird von Morgen & Morgen als 'Ausgezeichnet' bewertet."
  },
  {
    question: "Können auch Kinder versichert werden?",
    answer: "Ja. Die ZahnUpgrade-Tarife bieten auch für Kinder eine hervorragende Absicherung. Kieferorthopädische Behandlungen werden je nach Tarif mit 50 % bis 90 % erstattet (max. 1.500 bis 2.500 Euro). Die Kinderbeiträge starten bei 6,50 Euro monatlich. Auch bei leichten Fehlstellungen (KIG 1-5) wird geleistet, nicht erst ab KIG 3 wie bei manchen Mitbewerbern."
  },
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
