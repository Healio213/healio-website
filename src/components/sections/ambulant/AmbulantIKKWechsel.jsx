
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Shield, Clock, ArrowRight, CheckCircle, Heart, Baby, Stethoscope, Sparkles, HelpCircle } from 'lucide-react';

const fears = [
  {
    question: "Verliere ich beim Wechsel Leistungen?",
    answer: "Nein. Rund 95 % aller GKV-Leistungen sind gesetzlich vorgeschrieben und bei jeder Kasse identisch. Dein Arzt, dein Krankenhaus, deine Medikamente — alles bleibt gleich. Die restlichen 5 % sind Satzungsleistungen, bei denen die IKK classic sogar oft mehr bietet als andere Kassen."
  },
  {
    question: "Muss ich meinen Arzt wechseln?",
    answer: "Nein, auf keinen Fall. Du behältst alle deine Ärzte, Therapeuten und Krankenhäuser. Die freie Arztwahl ist gesetzlich garantiert und gilt bei jeder gesetzlichen Krankenkasse gleich."
  },
  {
    question: "Gibt es eine Versorgungslücke beim Wechsel?",
    answer: "Nein. Der Übergang ist nahtlos. Deine alte und deine neue Kasse sorgen gemeinsam dafür, dass du durchgehend versichert bist. Sollte der Wechsel nicht zustande kommen, bleibst du automatisch bei deiner alten Kasse."
  },
  {
    question: "Ist der Wechsel kompliziert?",
    answer: "Überhaupt nicht. Seit 2021 musst du deine alte Kasse nicht einmal mehr selbst kündigen. Du stellst einfach einen Antrag bei der IKK classic — die erledigt den Rest. Der ganze Vorgang dauert wenige Minuten online."
  },
  {
    question: "Was ist mit laufenden Behandlungen?",
    answer: "Laufende Behandlungen werden nicht unterbrochen. Genehmigungen, die deine alte Kasse erteilt hat (z. B. für Reha oder Hilfsmittel), werden von der neuen Kasse übernommen."
  }
];

const ikkExtras = [
  {
    icon: Sparkles,
    title: "Bonusprogramm bis 550 €/Jahr",
    desc: "Vorsorge wahrnehmen, Aktivitäten nachweisen — und den Bonus für deine Healio-Zusatzversicherung nutzen."
  },
  {
    icon: Baby,
    title: "Schwangerschaft & Geburt",
    desc: "Hebammen-Rufbereitschaft (bis 250 €), Geburtsvorbereitungskurse, Rückbildung, Zuschuss für Vorsorge (bis 100 € pro Schwangerschaft)."
  },
  {
    icon: Stethoscope,
    title: "Osteopathie",
    desc: "Kostenübernahme für osteopathische Behandlungen — auch bei Schwangerschaft, Geburtsvorbereitung und Nachsorge."
  },
  {
    icon: Heart,
    title: "Gesundheitskonto",
    desc: "Zusätzliches Budget für Leistungen wie professionelle Zahnreinigung, Reiseimpfungen und erweiterte Vorsorge."
  }
];

const AmbulantIKKWechsel = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            Optional, aber lohnenswert
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Wechsel zur IKK classic — einfacher als du denkst
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Die IKK classic ist eine der größten gesetzlichen Krankenkassen Deutschlands mit über 3 Millionen Versicherten.
            Der Wechsel ist freiwillig, kostenlos und in wenigen Minuten erledigt.
          </p>
        </div>

        {/* Was sich NICHT ändert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            95 % aller GKV-Leistungen sind identisch
          </h3>
          <p className="text-gray-600 mb-6">
            Das Sozialgesetzbuch (SGB V) schreibt vor, welche Leistungen jede gesetzliche Krankenkasse erbringen muss.
            Egal ob AOK, TK, Barmer oder IKK classic — bei diesen Pflichtleistungen gibt es keinen Unterschied:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Arztbesuche & Facharztbehandlungen",
              "Krankenhausaufenthalte",
              "Medikamente & Rezepte",
              "Vorsorgeuntersuchungen",
              "Zahnbehandlungen (Grundversorgung)",
              "Krankengeld & Rehabilitation",
              "Schwangerschaftsvorsorge & Geburt",
              "Psychotherapie",
              "Physiotherapie & Ergotherapie"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Was die IKK ZUSÄTZLICH bietet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Was die IKK classic zusätzlich bietet
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Bei den 5 % Satzungsleistungen — also den freiwilligen Extras — punktet die IKK classic besonders:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {ikkExtras.map((extra, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <extra.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{extra.title}</h4>
                <p className="text-gray-600 text-sm">{extra.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* So funktioniert der Wechsel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            So funktioniert der Wechsel
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, icon: Clock, title: "Antrag stellen", desc: "Du meldest dich online bei der IKK classic an. Das dauert wenige Minuten." },
              { step: 2, icon: ArrowRight, title: "IKK erledigt den Rest", desc: "Die IKK classic kündigt deine alte Kasse automatisch für dich. Du musst nichts tun." },
              { step: 3, icon: Shield, title: "Nahtlos versichert", desc: "Nach 2 Monaten bist du Mitglied. Dein Versicherungsschutz läuft durchgehend weiter." }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-1">Schritt {item.step}</div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Häufige Bedenken */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Häufige Bedenken — und warum sie unbegründet sind
          </h3>
          <div className="space-y-3 max-w-3xl mx-auto">
            {fears.map((fear, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{fear.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-600 pl-8">{fear.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AmbulantIKKWechsel;
