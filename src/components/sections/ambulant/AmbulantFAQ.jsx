
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: "💰 Wie funktioniert die Erstattung?", a: "Du reichst deine Rechnungen (z.B. vom Heilpraktiker oder Optiker) einfach digital über die App der Versicherung ein. Der Betrag wird dann je nach Tarif innerhalb weniger Tage auf dein Konto überwiesen." },
  { q: "🎯 Für wen lohnt sich Healio?", a: "Für alle gesetzlich Versicherten, die mehr Leistungen als die GKV-Standardversorgung wünschen (wie Brillen, Osteopathie) und durch das Bonusprogramm effektiv ihre Kosten senken möchten." },
  { q: "👨‍👩‍👧‍👦 Kann meine Familie teilnehmen?", a: "Ja, absolut. Jeder kann eine eigene Zusatzversicherung abschließen und am Bonusprogramm teilnehmen, was den finanziellen Vorteil für Familien sogar noch multipliziert." },
  { q: "🔄 Ich bin bei einer anderen Krankenkasse - geht das?", a: "Ja. Das Healio Konzept funktioniert am besten in Kombination mit der IKK classic. Ein Wechsel ist unkompliziert und wir helfen dir bei allen Schritten." },
  { q: "✅ Gibt es einen Haken?", a: "Nein. Du nutzt einfach bestehende Systeme intelligenter. Du musst lediglich aktiv an den Bonusprogrammen teilnehmen (z.B. Vorsorgeuntersuchungen machen), um den finanziellen Vorteil zu erzielen." },
  { q: "📋 Welche Leistungen sind genau enthalten?", a: "Das hängt vom gewählten Tarif ab. Typisch sind Heilpraktiker, Osteopathie, Sehhilfen, Auslandsreisekrankenversicherung und Zuzahlungen für Arzneimittel." },
  { q: "💶 Wie hoch ist der monatliche Beitrag?", a: "Die Beiträge für eine ambulante Zusatzversicherung beginnen oft schon bei 15-30€ pro Monat, abhängig von Alter und Leistungsumfang." },
  { q: "🎁 Wie funktioniert das IKK Bonusprogramm?", a: "Du sammelst Nachweise für gesundheitsbewusstes Verhalten (Stempel im Bonusheft oder digital) und reichst diese einmal im Jahr ein. Der Bonus wird dann ausgezahlt." },
  { q: "🤝 Muss ich alles selbst beantragen?", a: "Nein, unser Team und unsere digitalen Prozesse unterstützen dich bei der Tarifwahl, beim Abschluss und auch beim Kassenwechsel." },
  { q: "🏥 Ich bin privat versichert - kann ich teilnehmen?", a: "Das Healio Konzept mit dem IKK Bonus richtet sich ausschließlich an gesetzlich Versicherte. Für PKV-Kunden gibt es andere Optimierungsmöglichkeiten." }
];

const AmbulantFAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Häufig gestellte Fragen</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 border border-gray-100 rounded-xl px-6">
              <AccordionTrigger className="text-left font-bold text-gray-800 hover:text-healio-primary text-lg py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default AmbulantFAQ;
