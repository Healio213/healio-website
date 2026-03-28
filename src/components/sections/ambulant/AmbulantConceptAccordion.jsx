
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Target, Users, Lightbulb, Shield, Sparkles, Leaf } from 'lucide-react';

const AmbulantConceptAccordion = () => {
  const whyHealioPoints = [
    { icon: Target, title: "Ergebnisse statt Tarife", desc: "Wir zeigen dir, was du bekommst - nicht, was du zahlen sollst." },
    { icon: Users, title: "Begleitung", desc: "Du wirst nicht allein gelassen." },
    { icon: Lightbulb, title: "Klarheit", desc: "Alles verständlich erklärt, kein Versicherungsdeutsch." },
    { icon: Shield, title: "Zentraler Ansprechpartner", desc: "Ein Kontakt für alles." },
    { icon: Sparkles, title: "Strategische Bonusnutzung", desc: "Wir helfen dir, das Maximum rauszuholen." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Healio: Das Konzept, das sich selbst rechnet
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <Accordion type="single" collapsible className="w-full">

            {/* SECTION 1: Warum wir Healio gegründet haben */}
            <AccordionItem value="item-1" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Warum wir Healio gegründet haben
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Die gesetzliche Krankenversicherung bietet dir eine solide Grundversorgung. Aber seien wir ehrlich: Für das, was viele Menschen wirklich brauchen, reicht sie oft nicht.
                  </p>
                  <p>
                    Ob Heilpraktiker, Osteopathie, hochwertige Versorgung oder einfach nur eine neue Brille - all das zahlst du in der Regel selbst.
                  </p>
                  <p>
                    Healio verbindet zwei Dinge, die einzeln schon stark sind - zusammen aber ein echtes System ergeben:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Eine ambulante Zusatzversicherung, die deine Lücken schließt.</li>
                    <li>Und die IKK classic mit einem Bonusprogramm, das diese Zusatzversicherung praktisch refinanziert.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 2: Was du bekommst — und was es dich kostet (merged 2+3) */}
            <AccordionItem value="item-2" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Was du bekommst — und was es dich kostet
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Du bekommst ein umfassendes Gesundheits-Budget von bis zu 2.500 Euro in zwei Jahren für Heilpraktiker, Naturheilverfahren, Sehhilfen, Vorsorge, Impfungen und mehr.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Leaf, title: "Planbarkeit", desc: "Du weißt vorher, was du bekommst - keine bösen Überraschungen." },
                      { icon: Sparkles, title: "Schnelle Erstattung", desc: "Rechnung hochladen, Erstattung folgt, ohne Papierkram." },
                      { icon: Lightbulb, title: "Einfachheit", desc: "Schritt für Schritt geführt." },
                      { icon: Shield, title: "Bonus-Turbo", desc: "Bonuszahlungen können den Beitrag vollständig ausgleichen." }
                    ].map((card, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100">
                        <card.icon className="w-8 h-8 text-[#10b981] mb-2" />
                        <h4 className="font-bold text-gray-900 mb-1">{card.title}</h4>
                        <p className="text-sm text-gray-600">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <strong>Hinweis:</strong> Healio ist keine Krankenkasse, sondern die digitale Plattform für ambulante Leistungen.
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 3: Warum über Healio? */}
            <AccordionItem value="item-3" className="border-b-0 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Warum über Healio?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {whyHealioPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg hover:border-[#10b981] transition-all"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <point.icon className="w-6 h-6 text-[#10b981]" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{point.title}</h4>
                      <p className="text-sm text-gray-600">{point.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                  <strong>🌱 Unser Versprechen:</strong> 10% unserer Erlöse gehen an Umweltorganisationen.
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantConceptAccordion;
