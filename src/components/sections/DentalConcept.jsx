import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const DentalConcept = () => {
  return (
    <section className="healio-section bg-gray-50" aria-labelledby="dental-concept-heading">
      <div className="healio-container">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 id="dental-concept-heading" className="sr-only">Das Healio Zahnversicherungs-Konzept</h2>
          <div className="bg-white rounded-2xl shadow-xl p-3 transform hover:scale-[1.02] transition-transform duration-300 relative z-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-xl font-bold text-healio-text hover:no-underline text-left px-6 py-4" aria-label="Mehr über die Zahnzusatzversicherung erfahren">
                  Zahnzusatzversicherung: Investition in Ihr Lächeln
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none text-healio-text-light">
                    
                    <h3 className="text-lg font-bold text-healio-text mb-2">Warum eine Zahnzusatzversicherung?</h3>
                    <p className="mb-4">
                      Die gesetzliche Krankenversicherung übernimmt nur einen Bruchteil der Kosten für hochwertigen Zahnersatz, Implantate oder kieferorthopädische Behandlungen. Ein Implantat kann schnell 2.000-3.000 € kosten, von denen die GKV nur einen Festzuschuss zahlt. Mit unserer Zahnzusatzversicherung schützen Sie sich vor hohen Eigenkosten und sichern sich Zugang zu modernster Zahnmedizin.
                    </p>

                    <h3 className="text-lg font-bold text-healio-text mb-2">Was ist abgedeckt?</h3>
                    <p className="mb-2">Unsere Zahnzusatzversicherung deckt umfassend ab:</p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li><strong>Zahnersatz:</strong> Bis zu 90% Erstattung für Kronen, Brücken, Implantate</li>
                      <li><strong>Prophylaxe:</strong> 100% für professionelle Zahnreinigung (2x jährlich)</li>
                      <li><strong>Kieferorthopädie:</strong> Umfassende Erstattung für Kinder und Erwachsene</li>
                      <li><strong>Zahnbehandlungen:</strong> Füllungen, Wurzelbehandlungen, Parodontosebehandlung</li>
                      <li><strong>Ästhetik:</strong> Zuschüsse für Bleaching, Veneers, unsichtbare Zahnspangen</li>
                    </ul>

                    <h3 className="text-lg font-bold text-healio-text mb-2">So funktioniert es – in 3 Schritten</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 1: Tarif wählen & abschließen</h4>
                        <p className="mt-1">Wählen Sie Ihren Wunschtarif online aus, beantworten Sie ein paar einfache Gesundheitsfragen und schließen Sie digital ab. Keine Wartezeiten, kein Papierkram.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 2: Behandlung beim Zahnarzt</h4>
                        <p className="mt-1">Gehen Sie zu Ihrem Zahnarzt – Sie können jeden beliebigen Zahnarzt wählen. Lassen Sie sich beraten und behandeln.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 3: Rechnung einreichen & Erstattung erhalten</h4>
                        <p className="mt-1">Laden Sie Ihre Rechnung digital hoch und erhalten Sie innerhalb weniger Tage Ihre Erstattung – schnell, einfach, transparent.</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-healio-text mb-2">Beispielrechnung: Was Sie wirklich sparen</h3>
                    <p className="mb-4">Nehmen wir an, Sie benötigen ein Implantat:</p>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>Gesamtkosten: 2.500 €</li>
                      <li>GKV-Festzuschuss: ~500 €</li>
                      <li>Ohne Zusatzversicherung Ihr Eigenanteil: 2.000 €</li>
                      <li>Mit unserer Zusatzversicherung (90% Erstattung): Nur 250 € Eigenanteil</li>
                    </ul>
                    <p className="mb-6"><strong>Ihre Ersparnis: 1.750 €</strong> – und das bei monatlichen Beiträgen ab ca. 20-30 €.</p>

                    <h3 className="text-lg font-bold text-healio-text mb-2">Warum über Healio?</h3>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li><strong>Transparenter Vergleich:</strong> Wir zeigen Ihnen die besten Tarife für Ihre Bedürfnisse</li>
                      <li><strong>Digitaler Abschluss:</strong> Keine Formulare, kein Postweg – alles online in Minuten</li>
                      <li><strong>Persönliche Beratung:</strong> Bei Fragen stehen wir Ihnen zur Seite</li>
                      <li><strong>Schnelle Abwicklung:</strong> Rechnungen digital einreichen, schnelle Erstattung</li>
                    </ul>
                    
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalConcept;