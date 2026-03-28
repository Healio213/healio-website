
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Clock, ArrowRight, CheckCircle, Heart, Leaf, HelpCircle } from 'lucide-react';

const fears = [
  {
    question: "Verliere ich Leistungen beim Wechsel?",
    answer: "Nein. Über 98 % aller GKV-Leistungen sind gesetzlich vorgeschrieben und bei jeder Krankenkasse identisch — Arztbesuche, Krankenhausaufenthalte, Medikamente, Therapien. Nur bei den sogenannten Satzungsleistungen (ca. 2 %) gibt es kleine Unterschiede, z. B. Zuschüsse für Osteopathie oder Reiseimpfungen. Hier bietet die IKK classic sogar mehr als viele andere Kassen."
  },
  {
    question: "Muss ich meinen Arzt oder Therapeuten wechseln?",
    answer: "Nein, auf keinen Fall. Du behältst alle deine Ärzte, Therapeuten und Krankenhäuser. Die freie Arztwahl ist gesetzlich garantiert und gilt bei jeder gesetzlichen Krankenkasse gleich."
  },
  {
    question: "Ist der Wechsel kompliziert?",
    answer: "Überhaupt nicht. Du meldest dich online bei der IKK classic an — das dauert wenige Minuten. Die IKK classic kündigt deine alte Kasse automatisch für dich. Du musst dich um nichts weiter kümmern."
  },
  {
    question: "Gibt es eine Lücke in meiner Versorgung?",
    answer: "Nein. Der Übergang ist nahtlos. Ab dem ersten Tag bei der IKK classic bist du voll versichert — ohne Wartezeiten, ohne Unterbrechung."
  },
  {
    question: "Was ist mit laufenden Behandlungen?",
    answer: "Laufende Behandlungen werden nicht unterbrochen. Genehmigte Therapien, Kuren oder Reha-Maßnahmen laufen weiter — die neue Kasse übernimmt."
  }
];

const ikkExtras = [
  {
    icon: "🦴",
    title: "Osteopathie — 160 €/Jahr",
    desc: "4 Sitzungen à 40 € pro Kalenderjahr — auch für Babys und Kinder, ohne Altersbegrenzung."
  },
  {
    icon: "🤰",
    title: "Schwangerschaft — über 1.100 €",
    desc: "250 € Hebammen-Rufbereitschaft, 100 € Vorsorge-Zuschuss, 180 € Baby-Bonus, kostenloser Partner-Kurs, Mineralstoffe inklusive."
  },
  {
    icon: "🎁",
    title: "Bonusprogramm — über 700 € möglich",
    desc: "Für Vorsorge, Sport und Impfungen. Die Zuschuss-Option verdreifacht deinen Geldbonus — ohne Obergrenze."
  },
  {
    icon: "💰",
    title: "Spartarif — bis 600 €/Jahr zurück",
    desc: "Beitragsrückerstattung, wenn du nur Vorsorge nutzt. Impfungen, Check-ups und Krebsvorsorge zählen nicht gegen dich."
  },
  {
    icon: "✈️",
    title: "Reiseimpfungen",
    desc: "Gelbfieber, Hepatitis A/B, Typhus u. v. m. — Zuschuss über das Gesundheitskonto der IKK classic."
  },
  {
    icon: "🧘",
    title: "Präventionskurse",
    desc: "Zuschüsse für Yoga, Rückentraining, Stressbewältigung und mehr — für deine aktive Gesundheitsvorsorge."
  }
];

const AmbulantIKKWechsel = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            Krankenkassenwechsel leicht gemacht
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            IKK classic — dein Partner für mehr Gesundheit
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Die IKK classic ist eine der größten gesetzlichen Krankenkassen Deutschlands mit über 3 Millionen Versicherten und mehr als 140 Jahren Erfahrung. Du bekommst alle gesetzlichen Leistungen — plus viele wertvolle Extras.
          </p>
        </div>

        {/* 98% identisch Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border-2 border-emerald-200 p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="text-5xl md:text-6xl font-black text-emerald-600 flex-shrink-0">98%</div>
            <div>
              <p className="text-xl font-bold text-gray-900">aller Leistungen sind identisch</p>
              <p className="text-gray-500">bei jeder gesetzlichen Krankenkasse — per Gesetz garantiert</p>
            </div>
          </div>
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
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Nur bei den restlichen 2 % (Satzungsleistungen) gibt es Unterschiede zwischen den Kassen. Und genau hier punktet die IKK classic:
          </p>
        </motion.div>

        {/* IKK Extras */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Die Extras der IKK classic
          </h3>
          <p className="text-gray-500 text-center mb-8">Dort, wo sich Krankenkassen unterscheiden, bietet die IKK classic mehr</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ikkExtras.map((extra, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <span className="text-3xl mb-3 block">{extra.icon}</span>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{extra.title}</h4>
                <p className="text-gray-600 text-sm">{extra.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 10% Umweltspende */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-50 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="bg-emerald-100 rounded-full p-4 flex-shrink-0">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">10 % für die Umwelt</h3>
            <p className="text-gray-600">
              Healio spendet 10 % an Umweltverbände. Denn Gesundheit beginnt nicht erst beim Arzt — sondern in einer intakten Umwelt. Mit deinem Wechsel zur IKK classic über Healio unterstützt du aktiv den Umweltschutz.
            </p>
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
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="text-sm font-bold text-emerald-600 mb-1">Schritt {item.step}</div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Häufige Bedenken */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Häufige Bedenken — und warum sie unbegründet sind
          </h3>
          <div className="space-y-3 max-w-3xl mx-auto">
            {fears.map((fear, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{fear.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-600 pl-13 text-sm leading-relaxed">{fear.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AmbulantIKKWechsel;
