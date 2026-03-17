
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Zap, Lightbulb, Gift, Eye, Sparkles, Leaf, Hand, Activity, Shield, Syringe, Pill, Globe, Heart, Target, Users, Calculator } from 'lucide-react';

const AmbulantConceptAccordion = () => {
  const coreValueCards = [
    { icon: CheckCircle, title: "Planbarkeit", desc: "Du weißt vorher, was du bekommst - keine bösen Überraschungen." },
    { icon: Zap, title: "Erstattung", desc: "Rechnung hochladen, Erstattung folgt, ohne Papierkram." },
    { icon: Lightbulb, title: "Einfachheit", desc: "Schritt für Schritt geführt." },
    { icon: Gift, title: "Turbo", desc: "Bonuszahlungen können Beitrag ausgleichen." }
  ];

  const coverageCards = [
    { icon: Eye, title: "Sehhilfen (Brillen, Kontaktlinsen)", desc: "bis 500 Euro", premium: false },
    { icon: Sparkles, title: "Augen-Laser (Refraktive Chirurgie/LASIK)", desc: "100% je Auge", premium: true },
    { icon: Leaf, title: "Heilpraktiker und Naturheilverfahren", desc: "inkl. Hufelandverzeichnis", premium: false },
    { icon: Hand, title: "Osteopathie und Chiropraktik", desc: "", premium: false },
    { icon: Activity, title: "Traditionelle Chinesische Medizin (TCM)", desc: "", premium: false },
    { icon: Shield, title: "Vorsorgeuntersuchungen und Früherkennung", desc: "", premium: false },
    { icon: Syringe, title: "Schutzimpfungen (STIKO, Grippe, Zecken, Reise)", desc: "", premium: false },
    { icon: Pill, title: "Arznei-, Heil- und Verbandmittel", desc: "", premium: false },
    { icon: Globe, title: "Auslandsschutz", desc: "100%, beliebig viele Reisen bis 56 Tage", premium: false },
    { icon: Heart, title: "Medizinisch-Psychologischer Beratungsservice", desc: "", premium: false }
  ];

  const steps = [
    { num: 1, title: "Tarif berechnen (30 Sek.)", desc: "Gib dein Alter und gewünschte Leistung ein." },
    { num: 2, title: "Online abschließen", desc: "Kein Papierkram, alles digital." },
    { num: 3, title: "Optional zur IKK classic wechseln", desc: "Für maximale Refinanzierung." },
    { num: 4, title: "Bonus nutzen", desc: "Aktivitäten erfassen und Prämie sichern." },
    { num: 5, title: "Leistung nutzen", desc: "Rechnung einreichen, Erstattung erhalten." }
  ];

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
            
            {/* SECTION 1 */}
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

            {/* SECTION 2 */}
            <AccordionItem value="item-2" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Der Kernnutzen für dich
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {coreValueCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow"
                    >
                      <card.icon className="w-10 h-10 text-[#10b981] mb-3" />
                      <h4 className="font-bold text-gray-900 mb-2">{card.title}</h4>
                      <p className="text-sm text-gray-600">{card.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <strong>Hinweis:</strong> Healio ist keine Krankenkasse, sondern die digitale Plattform für ambulante Leistungen.
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 3 */}
            <AccordionItem value="item-3" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Was ist typischerweise abgedeckt?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coverageCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className={`bg-white border p-4 rounded-xl transition-all flex items-start gap-3 ${
                        card.premium ? 'border-yellow-400 shadow-md hover:shadow-lg' : 'border-gray-200 hover:border-[#10b981] hover:shadow-md'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        card.premium ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <card.icon className={`w-6 h-6 ${card.premium ? 'text-yellow-600' : 'text-[#10b981]'}`} />
                      </div>
                      <div className="pt-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                          {card.title}
                          {card.premium && <span className="ml-2 inline-block bg-yellow-400 text-yellow-900 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Premium</span>}
                        </h4>
                        {card.desc && <p className="text-xs text-gray-500 font-medium">{card.desc}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 4 */}
            <AccordionItem value="item-4" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                So funktioniert Healio - der klare Ablauf
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-[#10b981] transition-colors"
                    >
                      <span className="w-10 h-10 bg-[#10b981] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {step.num}
                      </span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 5 */}
            <AccordionItem value="item-5" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Beispielrechnung
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#10b981] rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-8 h-8 text-[#10b981]" />
                    <h4 className="text-2xl font-bold text-gray-900">Tarif: Ambulant 100</h4>
                  </div>
                  
                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between items-center pb-3 border-b border-green-200">
                      <span className="text-gray-700 font-medium">Monatlicher Beitrag:</span>
                      <span className="text-gray-900 font-bold">40 Euro/Monat</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-green-200">
                      <span className="text-gray-700 font-medium">Jährliche Kosten:</span>
                      <span className="text-gray-900 font-bold">480 Euro/Jahr</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-green-200">
                      <span className="text-gray-700 font-medium">IKK-Bonusprogramm:</span>
                      <span className="text-[#10b981] font-bold">bis zu 550 Euro/Jahr</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-white rounded-lg p-4 shadow-sm">
                      <span className="text-gray-900 font-bold text-xl">Ergebnis:</span>
                      <span className="text-[#10b981] font-extrabold text-xl">Der Bonus kann den Beitrag vollständig ausgleichen</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-green-200">
                    <h5 className="font-bold text-gray-900 mb-3">Leistungen:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        Bis zu 1.000 Euro für alternative Behandlungen
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        Bis zu 500 Euro für Brille
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        Bis zu 2.500 Euro Jahresleistung insgesamt
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 6 */}
            <AccordionItem value="item-6" className="border-b-0 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                Warum über Healio?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantConceptAccordion;
