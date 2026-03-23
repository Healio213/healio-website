
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqsData = [
  {
    question: "Was kostet das ZahnUpgrade 90+ monatlich?",
    answer: "Der ZahnUpgrade 90+ Tarif beginnt ab 13,50 Euro im Monat ohne Alterungsrückstellungen. Mit Alterungsrückstellungen ab 29,06 Euro. In Kombination mit dem IKK Classic Bonusprogramm (über 300 Euro pro Jahr, steuerfrei) finanziert sich die Versicherung effektiv komplett selbst. Bei nur 162 Euro Jahresbeitrag und über 300 Euro Bonus zahlst du unterm Strich 0 Euro."
  },
  {
    question: "Wie komme ich von 90 % auf 100 % Erstattung?",
    answer: "Durch BonusPlus steigt deine Erstattung automatisch: Sofort ab Tag 1 bekommst du 90 % erstattet. Wenn du ein lückenlos geführtes Bonusheft deiner Krankenkasse vorweisen kannst, steigt die Erstattung nach 5 Jahren auf 95 % und nach 10 Jahren auf volle 100 %. BonusPlus ist ab 21 Jahren verfügbar. Du musst nichts extra beantragen, der Nachweis des Bonushefts reicht."
  },
  {
    question: "Kann ich die Versicherung auch mit fehlenden Zähnen abschließen?",
    answer: "Ja, das ist ein echtes Alleinstellungsmerkmal. Bis zu 3 bereits fehlende Zähne können mitversichert werden. Der Risikozuschlag beträgt lediglich 5 Euro pro fehlendem Zahn und Monat. Viele andere Zahnzusatzversicherungen lehnen Kunden mit fehlenden Zähnen komplett ab oder schließen diese von der Erstattung aus."
  },
  {
    question: "Gibt es Wartezeiten?",
    answer: "Nein. Der volle Versicherungsschutz gilt sofort ab Tag 1. Professionelle Zahnreinigung, Prophylaxe, Fissurenversiegelung und alle anderen Leistungen kannst du direkt in Anspruch nehmen. In den ersten Kalenderjahren gilt eine Summenbegrenzung von 1.000 Euro (1./2. Jahr), die danach entfällt und ab dem 5. Kalenderjahr komplett unbegrenzt ist."
  },
  {
    question: "Ich habe bereits eine Zahnzusatzversicherung. Lohnt sich ein Wechsel?",
    answer: "Sehr wahrscheinlich ja, besonders wenn du aktuell weniger als 90 % Erstattung bekommst. Dein großer Vorteil: Die Vorversicherung wird angerechnet. Wenn deine bisherige Versicherung mindestens 40 % Zahnersatz erstattet hat, entfällt die Summenbegrenzung im ersten Kalenderjahr komplett. Du startest also sofort mit vollem Leistungsumfang, nicht bei Null."
  },
  {
    question: "Was genau wird alles erstattet?",
    answer: "Der ZahnUpgrade 90+ erstattet 90 bis 100 Prozent für: Hochwertigen Zahnersatz wie Implantate, Kronen, Brücken und Inlays. Zahnbehandlungen wie Füllungen, Wurzelbehandlungen, Parodontose und Knirscherschienen. Professionelle Zahnreinigung und Fissurenversiegelung (bis 180 Euro pro Jahr). Bleaching und besondere Schmerzausschaltung wie Lachgas, Hypnose oder Akupunktur. Kieferorthopädie für Kinder (90 %, max. 2.500 Euro). Dazu Unfall-Sofortschutz ohne Höchstsummen."
  },
  {
    question: "Wie funktioniert das zusammen mit dem IKK Classic Bonus?",
    answer: "Die Kombination ist der Schlüssel: Du schließt den ZahnUpgrade 90+ ab (13,50 Euro pro Monat = 162 Euro im Jahr). Gleichzeitig sammelst du als IKK Classic Mitglied Bonuspunkte für gesundheitsbewusstes Verhalten: Impfungen, Zahnvorsorge, Sportverein, Gesundheits-Check-ups. Der Bonus beträgt über 300 Euro pro Jahr, steuerfrei. Zusätzlich erstattet das IKK Gesundheitskonto bis zu 600 Euro pro Jahr für Zahnreinigung und Vorsorge. Ergebnis: Dein Zahnschutz kostet dich effektiv 0 Euro."
  },
  {
    question: "Brauche ich eine Gesundheitsprüfung?",
    answer: "Nein, es gibt keine aufwändige Gesundheitsprüfung. Der Antrag enthält maximal 3 einfache Gesundheitsfragen. Das macht den Abschluss schnell und unkompliziert. Selbst mit bis zu 3 fehlenden Zähnen wirst du angenommen (gegen einen kleinen Risikozuschlag von 5 Euro pro Zahn)."
  },
  {
    question: "Können auch meine Kinder mitversichert werden?",
    answer: "Ja. Für Kinder bietet der ZahnUpgrade 90+ eine besonders starke Absicherung: Kieferorthopädische Behandlungen werden zu 90 % erstattet, maximal 2.500 Euro für die gesamte Vertragsdauer. Auch bei leichten Fehlstellungen (KIG 1-5) wird geleistet, nicht erst ab KIG 3 wie bei vielen Mitbewerbern. Der Kinderbeitrag liegt bei 21,50 Euro im Monat. Behandlungsbeginn muss vor dem 18. Lebensjahr sein."
  },
  {
    question: "Wie wurde der ZahnUpgrade 90+ von unabhängigen Testern bewertet?",
    answer: "Der ZahnUpgrade 90+ wurde von Stiftung Warentest mit der Note SEHR GUT (0,8) ausgezeichnet und ist Testsieger in der Kategorie 'Gut und günstig' (Finanzen, Ausgabe 07/2025). Darüber hinaus hat der Versicherer das Siegel 'Höchste Kundenzufriedenheit' von Focus Money und die Bestnote 'Ausgezeichnet' von Morgen und Morgen erhalten."
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
