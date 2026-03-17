import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, ClipboardCheck, PenLine, Coins, UploadCloud } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Tarifrechner öffnen",
    icon: Calculator,
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Wunschtarif wählen",
    icon: CheckCircle2,
    gradient: "from-cyan-400 to-teal-400"
  },
  {
    id: 3,
    title: "Gesundheitsfragen beantworten",
    icon: ClipboardCheck,
    gradient: "from-teal-400 to-emerald-400"
  },
  {
    id: 4,
    title: "Digital abschließen",
    icon: PenLine,
    gradient: "from-emerald-400 to-green-400"
  },
  {
    id: 5,
    title: "Optional IKK‑Bonus aktivieren",
    icon: Coins,
    gradient: "from-green-400 to-lime-400"
  },
  {
    id: 6,
    title: "Rechnungen einreichen & Erstattung",
    icon: UploadCloud,
    gradient: "from-lime-400 to-yellow-400"
  }
];

const Concept = () => {
  return (
    <section className="healio-section bg-gray-50 -mt-10 pt-10 pb-20 overflow-hidden" aria-labelledby="concept-heading">
      <div className="healio-container">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 id="concept-heading" className="sr-only">Das Healio-Konzept</h2>
          <div className="bg-white rounded-2xl shadow-xl p-3 transform hover:scale-[1.02] transition-transform duration-300 relative z-10">
             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-xl font-bold text-healio-text hover:no-underline text-left px-6 py-4" aria-label="Mehr über das Healio-Konzept erfahren">
                  Healio: Das Konzept, das sich selbst rechnet
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none text-healio-text-light">
                    
                    <h3 className="text-lg font-bold text-healio-text mb-2">1. Warum wir Healio gegründet haben</h3>
                    <p className="mb-4">
                      Die Wahrheit ist einfach: In der GKV bekommst du die Basis – aber nicht das, was Menschen im Alltag wirklich nutzen. Heilpraktiker, Osteopathie, Massagen, Chiropraktik, Brille, Facharzt, Zusatzchecks beim Frauenarzt – genau dort entstehen die Rechnungen, die dich jedes Jahr wieder überraschen. Und während in Deutschland Miete, Energie und Lebensmittel steigen, bleibt für Gesundheit immer weniger Luft. Wir haben Healio gegründet, um das zu drehen: Gesundheit planbar machen und zwar so, dass du den Vorteil sofort spürst.
                    </p>
                    <p className="mb-6">
                      <strong>Healio verbindet beides:</strong> Wir sorgen dafür, dass du eine leistungsstarke ambulante Zusatzversicherung bekommst, die deine Rechnungen bezahlt – und zeigen dir, wie du sie durch den IKK-Bonus (fast) komplett refinanzierst.
                    </p>
                    
                    <h3 className="text-lg font-bold text-healio-text mb-2">2. Der Kernnutzen für dich</h3>
                    <p className="mb-4">Mit Healio bekommst du ein System, nicht nur einen Tarif:</p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li><strong>Planbarkeit statt Bauchschmerzen:</strong> Du ersetzt unvorhersehbare Einzelrechnungen durch einen klaren Beitrag.</li>
                      <li><strong>Erstattung statt Diskussion:</strong> Rechnung hochladen → Erstattung folgt. Ohne Papierkram.</li>
                      <li><strong>Einfachheit statt Tarif‑Dschungel:</strong> Du wirst geführt – Schritt für Schritt.</li>
                      <li><strong>Optionaler Turbo durch IKK classic:</strong> Bonuszahlungen können deinen Beitrag teilweise oder vollständig ausgleichen.</li>
                    </ul>
                    <p className="mb-6 font-semibold">
                      Wichtig: Healio ist keine Krankenkasse. Healio ist die digitale Plattform, die dir den schnellsten Weg zu ambulanten Leistungen baut – transparent, strukturiert, verständlich.
                    </p>

                    <h3 className="text-lg font-bold text-healio-text mb-2">3. Was ist typischerweise abgedeckt?</h3>
                    <p className="mb-2">Je nach Tarif sicherst du genau die Leistungen ab, die in der GKV häufig fehlen:</p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li>Heilpraktiker</li>
                      <li>Osteopathie & Chiropraktik</li>
                      <li>Massagen</li>
                      <li>Frauenarzt‑Extras (z. B. Vorsorge / Untersuchungen in der Schwangerschaft)</li>
                      <li>weitere ambulante Facharztleistungen und Zuzahlungen</li>
                      <li>Brille (je nach Leistungspaket)</li>
                    </ul>

                    <h3 className="text-lg font-bold text-healio-text mb-4">4. So funktioniert Healio – der klare Ablauf</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 1: Tarif berechnen (30 Sek.)</h4>
                        <p className="mt-1">Du startest den digitalen Tarifrechner, wählst z. B. Ambulant 100 und siehst sofort deinen Beitrag – inkl. möglichem Risikozuschlag auf Basis deiner Angaben.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 2: Online abschließen</h4>
                        <p className="mt-1">Gesundheitsfragen digital beantworten, Vertrag papierlos abschließen, Police per E‑Mail. Fertig.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 3: Optional: Zur IKK Classic wechseln ( Bonus aktivieren )</h4>
                        <p className="mt-1">Wenn du den maximalen Vorteil willst, nutzt du den IKK‑Bonus. Der Wechsel ist einfach geregelt:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Kündigungsfrist in der GKV: zwei volle Kalendermonate</li>
                          <li>Wechsel zum Monatsanfang nach Ablauf der Frist</li>
                          <li>du füllst nur eine Online‑Maske aus</li>
                          <li>die IKK classic übernimmt die Kündigung bei deiner bisherigen Kasse.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 4: Bonus nutzen & Kosten senken</h4>
                        <p className="mt-1">Für Vorsorge, Prävention und gesundheitsbewusstes Verhalten bekommst du Bonuszahlungen, die deine laufenden Kosten spürbar reduzieren können.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 5: Leistung nutzen und Erstattung bekommen</h4>
                        <p className="mt-1">Du nimmst Leistungen in Anspruch, reichst Rechnungen digital ein und bekommst die Erstattung schnell und unkompliziert.</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-healio-text mb-2">5. Beispielrechnung: warum Healio logisch ist</h3>
                    <p className="mb-4">Nehmen wir den Tarif Ambulant 100:</p>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>40 € / Monat → 480 € / Jahr</li>
                      <li>IKK‑Bonus (Beispiel): 550 € / Jahr (je nach Aktivitäten auch höher möglich)</li>
                    </ul>
                    <p className="mb-4"><strong>Ergebnis:</strong> Der Bonus kann den Jahresbeitrag vollständig abdecken – und kommt jedes Jahr wieder, solange du die Voraussetzungen erfüllst.</p>
                    <p className="mb-2">Und gleichzeitig stehen dir Leistungen zur Verfügung, z. B.:</p>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>1.000 € alternative Behandlungen / Massagen / Osteopathie oder 1000 € für Facharzt ( Igel Leistungen )</li>
                      <li>500 € Brille</li>
                      <li>plus weitere ambulante Leistungen bis zu 2.500 € Jahresleistung</li>
                    </ul>
                    <p className="mb-6">Das ist der Punkt: Du bekommst echten Leistungsumfang – und kannst den Beitrag durch den Bonus effektiv ausgleichen.</p>

                    <h3 className="text-lg font-bold text-healio-text mb-2">6. Warum über Healio – und nicht einfach irgendwo abschließen?</h3>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li><strong>Mehr als nur Tarife zeigen:</strong> Wir liefern Ergebnisse. Du siehst nicht nur Preise, sondern den direkten Mehrwert für deine Gesundheit.</li>
                      <li><strong>Begleitung durch den Prozess:</strong> Von der Tarifwahl bis zur Antragsstellung – wir navigieren dich durch die "Gesundheitsfragen", damit du keine bösen Überraschungen erlebst.</li>
                      <li><strong>Klarheit in Minuten:</strong> Kein stundenlanges Vergleichen. Wir zeigen dir schnell, was für dich Sinn macht und was du wirklich sparst.</li>
                      <li><strong>Zentraler Ansprechpartner:</strong> Wir sind dein Lotse. Bei Fragen oder im Leistungsfall hast du einen festen Kontakt.</li>
                      <li><strong>Strategische Bonusnutzung:</strong> Wir optimieren mit dir, wie du den IKK-Bonus maximal nutzt, um deinen Beitrag zu reduzieren.</li>
                    </ul>
                    
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* New 60 Seconds Start Section */}
        <div className="max-w-6xl mx-auto mt-20 relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-healio-text mb-4">
                Dein Start in 60 Sekunden
              </h2>
              <p className="text-lg text-healio-text-light max-w-2xl mx-auto">
                Der schnellste Weg zu deiner optimierten Gesundheitsversorgung.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              >
                {/* Gradient Border Overlay on Hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Schritt {step.id}</span>
                    </div>
                    <h3 className="font-bold text-lg text-healio-text group-hover:text-healio-primary transition-colors">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

           {/* Decorative Background Elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none blur-3xl bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 -z-10 rounded-full" />
        </div>

      </div>
    </section>
  );
};

export default Concept;