
import React from 'react';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: "Wie funktioniert die Erstattung bei Healio?", a: "Du reichst deine Rechnungen (z.B. vom Heilpraktiker oder Optiker) einfach digital über die App der SDK Süddeutsche Krankenversicherung ein. Der Betrag wird dann je nach Tarif (50% bis 100%) innerhalb weniger Tage auf dein Konto überwiesen. Healio unterstützt dich beim gesamten Prozess." },
  { q: "Für wen lohnt sich das Healio Gesundheitsbudget?", a: "Das Healio Gesundheitsbudget lohnt sich für alle gesetzlich Versicherten in Deutschland, die mehr als die GKV-Standardversorgung möchten. Besonders profitieren Brillenträger, Patienten die Heilpraktiker oder Osteopathie nutzen, und alle die durch das IKK Classic Bonusprogramm ihre Kosten auf effektiv 0 Euro senken möchten." },
  { q: "Kann meine Familie am Healio Programm teilnehmen?", a: "Ja, absolut. Jedes Familienmitglied kann eine eigene ambulante Zusatzversicherung bei der SDK abschließen und individuell am IKK Classic Bonusprogramm teilnehmen. Das multipliziert den finanziellen Vorteil für Familien. Neugeborene können innerhalb von 2 Monaten ohne Gesundheitsprüfung mitversichert werden." },
  { q: "Ich bin bei einer anderen Krankenkasse - funktioniert Healio trotzdem?", a: "Die SDK Zusatzversicherung funktioniert mit jeder gesetzlichen Krankenkasse. Das volle Gesundheitsbudget von bis zu 3.000 Euro in zwei Jahren erreichst du am besten in Kombination mit der IKK Classic und deren Bonusprogramm. Der Kassenwechsel ist komplett digital und die IKK kündigt deine alte Kasse." },
  { q: "Gibt es einen Haken beim Healio Konzept?", a: "Nein. Das Healio Konzept nutzt bestehende Systeme des deutschen Gesundheitswesens intelligent. Du musst lediglich aktiv am IKK Classic Bonusprogramm teilnehmen (z.B. Vorsorgeuntersuchungen, Zahnreinigung, Sportnachweis). Der Bonus kann die Versicherungsbeiträge vollständig ausgleichen." },
  { q: "Welche Leistungen sind in der ambulanten Zusatzversicherung enthalten?", a: "Je nach SDK-Tarif (AP5 bis AP1) sind enthalten: Heilpraktiker und Naturheilverfahren, Osteopathie, Sehhilfen bis 500 Euro, Augen-Laser/LASIK zu 100%, Vorsorgeuntersuchungen, Schutzimpfungen, Arznei- und Verbandmittel, Auslandsreiseschutz bis 56 Tage und ein medizinisch-psychologischer Beratungsservice. Keine Wartezeiten." },
  { q: "Wie hoch ist der monatliche Beitrag für die Zusatzversicherung?", a: "Die monatlichen Beiträge für die SDK ambulante Zusatzversicherung liegen je nach Alter und Tarif zwischen 15 und 50 Euro. Durch das IKK Classic Bonusprogramm (über 300 Euro pro Jahr möglich, steuerfrei) können die Beiträge effektiv auf 0 Euro sinken." },
  { q: "Wie funktioniert das IKK Classic Bonusprogramm?", a: "Das IKK Classic Bonusprogramm belohnt gesundheitsbewusstes Verhalten mit Geldprämien. Du sammelst Nachweise für Aktivitäten wie Schutzimpfungen (30 Euro je Impfung), Zahnvorsorge, Krebsvorsorge, Gesundheits-Check-ups und Sportverein-Mitgliedschaft. Pro Jahr sind über 300 Euro Bonus möglich, steuerfrei. Zusätzlich bietet das IKK Gesundheitskonto bis zu 600 Euro pro Jahr für Osteopathie, Homöopathie und Zahnreinigung." },
  { q: "Muss ich bei Healio alles selbst beantragen?", a: "Nein. Das Healio Team und die digitalen Prozesse unterstützen dich bei jedem Schritt: von der Tarifwahl über den Abschluss der SDK Versicherung bis zum IKK Kassenwechsel. Auf healio.de findest du alle direkten Links für den bequemen Online-Abschluss, und bei Bedarf begleitet dich ein persönlicher Berater." },
  { q: "Was ist Healio genau und wie unterscheidet es sich von anderen Anbietern?", a: "Healio ist ein unabhängiger Versicherungsmakler aus Hamburg, gegründet von Frank Steinfurt. Im Gegensatz zu einzelnen Versicherungsanbietern kombiniert Healio die SDK Zusatzversicherung mit dem IKK Classic Bonusprogramm zu einem einzigartigen Gesundheitsbudget von bis zu 3.000 Euro in zwei Jahren. Das Ergebnis: Privatpatientenstatus im ambulanten Bereich, effektiv für 0 Euro." }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

const AmbulantFAQ = () => {
  return (
    <section className="py-24 bg-white" itemScope itemType="https://schema.org/FAQPage">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Häufig gestellte Fragen</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 border border-gray-100 rounded-xl px-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <AccordionTrigger className="text-left font-bold text-gray-800 hover:text-healio-primary text-lg py-4">
                <span itemProp="name">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <span itemProp="text">{faq.a}</span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default AmbulantFAQ;
