import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const HospitalConcept = () => {
  return (
    <section className="healio-section bg-gray-50" aria-labelledby="hospital-concept-heading">
      <div className="healio-container">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 id="hospital-concept-heading" className="sr-only">Das Healio Stationärversicherungs-Konzept</h2>
          <div className="bg-white rounded-2xl shadow-xl p-3 transform hover:scale-[1.02] transition-transform duration-300 relative z-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-xl font-bold text-healio-text hover:no-underline text-left px-6 py-4" aria-label="Mehr über die stationäre Zusatzversicherung erfahren">
                  Stationäre Zusatzversicherung: Ihr Komfort im Krankenhaus
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none text-healio-text-light">
                    
                    <h3 className="text-lg font-bold text-healio-text mb-2">Warum eine stationäre Zusatzversicherung?</h3>
                    <p className="mb-4">
                      Als gesetzlich Versicherter haben Sie im Krankenhaus Anspruch auf eine medizinisch notwendige Behandlung – aber nicht unbedingt auf Komfort und freie Arztwahl. Sie landen im Mehrbettzimmer und werden vom diensthabenden Arzt behandelt. Mit einer stationären Zusatzversicherung genießen Sie Privatpatientenkomfort: Einzelzimmer, Chefarztbehandlung und freie Krankenhauswahl.
                    </p>

                    <h3 className="text-lg font-bold text-healio-text mb-2">Was ist abgedeckt?</h3>
                    <p className="mb-2">Unsere stationäre Zusatzversicherung bietet Ihnen:</p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li><strong>Unterkunft:</strong> Ein- oder Zweibettzimmer statt Mehrbettzimmer</li>
                      <li><strong>Chefarztbehandlung:</strong> Die erfahrensten Spezialisten kümmern sich um Sie</li>
                      <li><strong>Freie Krankenhauswahl:</strong> Auch Privatkliniken und Spezialkliniken deutschlandweit</li>
                      <li><strong>Rooming-in:</strong> Eltern können bei ihren kranken Kindern im Krankenhaus bleiben</li>
                      <li><strong>Krankenhaustagegeld:</strong> Zusätzliche finanzielle Unterstützung bei stationärem Aufenthalt</li>
                      <li><strong>Weltweiter Schutz:</strong> Auch im Ausland sind Sie abgesichert</li>
                    </ul>

                    <h3 className="text-lg font-bold text-healio-text mb-2">So funktioniert es – einfach erklärt</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 1: Versicherung abschließen</h4>
                        <p className="mt-1">Wählen Sie online Ihren passenden Tarif, beantworten Sie die Gesundheitsfragen und schließen Sie digital ab. Bei Unfällen gibt es keine Wartezeit, bei Krankheit nur kurze Wartezeiten.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 2: Im Krankenhaus behandeln lassen</h4>
                        <p className="mt-1">Wenn ein Krankenhausaufenthalt notwendig wird, wählen Sie frei das Krankenhaus und lassen sich von erfahrenen Chefärzten behandeln. Genießen Sie die Privatsphäre Ihres Ein- oder Zweibettzimmers.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-healio-text">Schritt 3: Automatische Abrechnung</h4>
                        <p className="mt-1">In den meisten Fällen rechnet das Krankenhaus direkt mit Ihrer Versicherung ab – Sie müssen sich um nichts kümmern. Bei Eigenleistungen reichen Sie einfach die Rechnung ein.</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-healio-text mb-2">Beispielrechnung: Der Unterschied</h3>
                    <p className="mb-4">Vergleich: 5 Tage Krankenhausaufenthalt nach einer Operation</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-bold text-healio-text mb-2">Ohne Zusatzversicherung (GKV)</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Mehrbettzimmer (3-4 Personen)</li>
                          <li>• Behandlung durch diensthabenden Arzt</li>
                          <li>• Begrenzte Besuchszeiten</li>
                          <li>• Standardverpflegung</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-bold text-healio-text mb-2">Mit Zusatzversicherung</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Einzelzimmer mit eigenem Bad</li>
                          <li>• Chefarztbehandlung</li>
                          <li>• Erweiterte Besuchszeiten</li>
                          <li>• Premium-Verpflegung</li>
                        </ul>
                      </div>
                    </div>
                    <p className="mb-6">Monatlicher Beitrag: Ab ca. 15-25 € – für deutlich mehr Komfort und bessere medizinische Versorgung.</p>

                    <h3 className="text-lg font-bold text-healio-text mb-2">Warum über Healio?</h3>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li><strong>Transparenter Vergleich:</strong> Finden Sie den besten Tarif für Ihre Bedürfnisse</li>
                      <li><strong>Schneller Online-Abschluss:</strong> Digital, einfach, ohne Papierkram</li>
                      <li><strong>Kompetente Beratung:</strong> Wir helfen Ihnen bei allen Fragen</li>
                      <li><strong>Langfristiger Partner:</strong> Auch nach Abschluss stehen wir Ihnen zur Seite</li>
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

export default HospitalConcept;