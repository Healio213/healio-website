
import React from 'react';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Kategorie: Kosten & Finanzierung
const faqsKosten = [
  { q: "Was kostet eine ambulante Zusatzversicherung monatlich?", a: "Die monatlichen Beiträge für die SDK ambulante Zusatzversicherung liegen je nach Alter und gewähltem Tarif zwischen 15 und 50 Euro. Ein 30-Jähriger zahlt für den Tarif AP7 (70% Erstattung) beispielsweise rund 25 Euro im Monat. Das Besondere: Durch das IKK Classic Bonusprogramm kannst du über 300 Euro pro Jahr steuerfrei zurückbekommen. In vielen Fällen deckt der Bonus die Beiträge vollständig ab, sodass die Versicherung dich effektiv 0 Euro kostet." },
  { q: "Übernimmt die Krankenkasse Heilpraktiker-Kosten?", a: "Die gesetzliche Krankenversicherung (GKV) übernimmt in der Regel keine Heilpraktiker-Kosten. Mit einer ambulanten Zusatzversicherung der SDK werden Heilpraktiker-Behandlungen je nach Tarif zu 50% bis 100% erstattet. Im Tarif AP1 stehen dir bis zu 1.000 Euro in zwei Jahren allein für Naturheilverfahren und Heilpraktiker zur Verfügung. In Kombination mit dem IKK Classic Gesundheitskonto, das zusätzlich bis zu 600 Euro pro Jahr für Osteopathie und Homöopathie abdeckt, ergibt sich ein umfangreiches Budget für alternative Heilmethoden." },
  { q: "Gibt es einen Haken? Klingt zu gut um wahr zu sein.", a: "Das ist die häufigste Frage, die wir bekommen, und sie ist absolut berechtigt. Nein, es gibt keinen Haken. Das Healio Konzept nutzt zwei bestehende, seriöse Systeme des deutschen Gesundheitswesens: die SDK Süddeutsche Krankenversicherung (seit über 90 Jahren am Markt) und das IKK Classic Bonusprogramm (größte Innungskrankenkasse Deutschlands). Du musst lediglich aktiv am Bonusprogramm teilnehmen, also z.B. Vorsorgeuntersuchungen wahrnehmen, zur Zahnreinigung gehen oder einen Sportnachweis erbringen. Das sind Dinge, die ohnehin gut für deine Gesundheit sind." },
  { q: "Ist der IKK Classic Bonus steuerfrei?", a: "Ja, der IKK Classic Bonus ist komplett steuerfrei. Er wird als Prämie für gesundheitsbewusstes Verhalten ausgezahlt und unterliegt nicht der Einkommensteuer. Das bedeutet: Die über 300 Euro pro Jahr landen netto auf deinem Konto. Zusätzlich bietet das IKK Gesundheitskonto bis zu 600 Euro pro Jahr für Leistungen wie Osteopathie, professionelle Zahnreinigung und Krebsvorsorge, die direkt mit deiner Gesundheitskarte abgerechnet werden." },
];

// Kategorie: Leistungen & Erstattung
const faqsLeistungen = [
  { q: "Welche Leistungen werden von der ambulanten Zusatzversicherung erstattet?", a: "Die SDK ambulante Zusatzversicherung erstattet je nach Tarif (AP5 bis AP1) folgende Leistungen: Heilpraktiker und Naturheilverfahren wie Osteopathie, Homöopathie, Akupunktur und Chiropraktik. Sehhilfen (Brillen, Kontaktlinsen) bis 500 Euro. Augen-Laser-Operationen (LASIK/Refraktive Chirurgie) zu 100% je Auge. Vorsorgeuntersuchungen und Krebsfrüherkennung. Schutzimpfungen inklusive Reiseimpfungen. Arznei-, Heil- und Verbandmittel bei ärztlicher Verordnung. Auslandsreiseschutz für bis zu 56 Tage. Und ein medizinisch-psychologischer Beratungsservice rund um die Uhr. Besonders wichtig: Es gibt keine Wartezeiten, der Schutz gilt ab dem ersten Tag." },
  { q: "Werden Osteopathie-Behandlungen erstattet?", a: "Ja, Osteopathie wird gleich doppelt abgedeckt. Erstens über die SDK Zusatzversicherung: Je nach Tarif werden 50% bis 100% der Kosten erstattet, das Budget für Naturheilverfahren liegt bei bis zu 1.000 Euro in zwei Jahren. Zweitens über das IKK Classic Gesundheitskonto: Die IKK erstattet Osteopathie-Behandlungen als Teil der bis zu 600 Euro pro Jahr. Du kannst also beide Töpfe nutzen und hast damit ein sehr großzügiges Budget für regelmäßige Osteopathie-Sitzungen." },
  { q: "Bekomme ich eine neue Brille erstattet?", a: "Ja. Die gesetzliche Krankenversicherung bezuschusst Brillen nur noch in Ausnahmefällen (ab 6 Dioptrien). Mit der SDK Zusatzversicherung erhältst du je nach Tarif bis zu 500 Euro für Sehhilfen innerhalb von zwei Jahren. Das gilt für Brillengläser, Brillenfassungen und Kontaktlinsen. Im Tarif AP1 (100% Erstattung) werden die Kosten komplett übernommen. Augen-Laser-Operationen wie LASIK werden sogar zu 100% je Auge erstattet, ohne Budgetbegrenzung." },
  { q: "Wie funktioniert die Erstattung? Wie reiche ich Rechnungen ein?", a: "Die Erstattung ist bewusst einfach gehalten: Du gehst zum Arzt, Heilpraktiker oder Optiker und bezahlst die Rechnung wie gewohnt. Anschließend fotografierst du die Rechnung mit der App der SDK Süddeutsche Krankenversicherung und reichst sie digital ein. Die Prüfung dauert in der Regel nur wenige Tage, dann wird der Erstattungsbetrag direkt auf dein Konto überwiesen. Alternativ kannst du Rechnungen auch per Post oder E-Mail einreichen." },
];

// Kategorie: Ablauf & Kassenwechsel
const faqsAblauf = [
  { q: "Wie wechsle ich zur IKK Classic? Ist das kompliziert?", a: "Der Wechsel zur IKK Classic ist komplett digital und dauert etwa 5 Minuten. Du füllst den Online-Antrag aus und die IKK übernimmt alles Weitere. Die IKK kündigt deine alte Krankenkasse für dich, du musst dich um nichts kümmern. Voraussetzung: Du bist mindestens 12 Monate bei deiner aktuellen Kasse versichert (oder es liegt ein Sonderkündigungsrecht vor, z.B. bei Beitragserhöhung). Der Wechsel ist kostenlos und deine ärztliche Versorgung bleibt durchgehend gewährleistet." },
  { q: "Brauche ich eine Gesundheitsprüfung für die Zusatzversicherung?", a: "Nein. Die SDK ambulante Zusatzversicherung hat keine Gesundheitsprüfung und keine Gesundheitsfragen. Du wirst garantiert angenommen, auch bei bestehenden Vorerkrankungen. Es gibt auch keine Wartezeiten, der volle Versicherungsschutz beginnt ab dem ersten Tag. Das gilt für alle Tarife von AP5 bis AP1. Auch Neugeborene können innerhalb der ersten 2 Lebensmonate ohne Gesundheitsprüfung mitversichert werden." },
  { q: "Muss ich alles selbst beantragen oder hilft mir jemand?", a: "Healio begleitet dich bei jedem Schritt. Du kannst den gesamten Abschluss bequem online auf healio.de durchführen, wo alle direkten Links bereitstehen. Wenn du lieber persönliche Begleitung möchtest, vereinbare einfach einen kostenlosen Beratungstermin. Ein Berater führt dich dann Schritt für Schritt durch den Abschluss der SDK Versicherung und den IKK Kassenwechsel. Auch nach dem Abschluss steht dir das Healio Team bei Fragen zur Verfügung." },
  { q: "Kann ich die Zusatzversicherung auch ohne Kassenwechsel abschließen?", a: "Ja, die SDK ambulante Zusatzversicherung funktioniert mit jeder gesetzlichen Krankenkasse in Deutschland. Du kannst bei deiner aktuellen Kasse bleiben und trotzdem alle Leistungen der Zusatzversicherung nutzen. Der Wechsel zur IKK Classic ist optional, aber empfehlenswert: Erst in Kombination mit dem IKK Bonusprogramm und dem Gesundheitskonto entfaltet sich das volle Gesundheitsbudget von bis zu 2.500 Euro in zwei Jahren, und der Bonus kann deine Versicherungsbeiträge komplett ausgleichen." },
];

// Kategorie: Vertrauen & Sicherheit
const faqsVertrauen = [
  { q: "Wer steckt hinter Healio?", a: "Healio ist ein unabhängiger Versicherungsmakler mit Sitz in Hamburg, gegründet von Frank Steinfurt. Als Makler sind wir gesetzlich verpflichtet, im Interesse unserer Kunden zu handeln, nicht im Interesse einer Versicherungsgesellschaft. Unsere Partner sind die SDK Süddeutsche Krankenversicherung (gegründet 1926, über 90 Jahre Erfahrung) und die IKK Classic (größte Innungskrankenkasse Deutschlands mit über 3 Millionen Versicherten). Beide sind etablierte, regulierte Unternehmen des deutschen Gesundheitswesens." },
  { q: "Kann ich die Versicherung jederzeit kündigen?", a: "Die SDK ambulante Zusatzversicherung hat eine Mindestlaufzeit von 2 Jahren. Danach kannst du mit einer Frist von 3 Monaten zum Ende des Versicherungsjahres kündigen. Die IKK Classic Mitgliedschaft hat eine Bindungsfrist von 12 Monaten (gesetzlich geregelt), danach kannst du jederzeit mit 2 Monaten Frist wechseln. Es gibt keine versteckten Gebühren oder Stornokosten." },
  { q: "Ist Healio seriös? Kann ich den Erfahrungen vertrauen?", a: "Healio ist als Versicherungsmakler nach §34d GewO zugelassen und im Vermittlerregister eingetragen. Wir unterliegen der Aufsicht der IHK Hamburg und sind an strenge Beratungsstandards gebunden. Die SDK Süddeutsche Krankenversicherung ist seit 1926 am Markt und die IKK Classic ist mit über 3 Millionen Versicherten die größte Innungskrankenkasse Deutschlands. Beide sind von der BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) reguliert." },
  { q: "Für wen lohnt sich das Healio Gesundheitsbudget besonders?", a: "Das Healio Gesundheitsbudget lohnt sich besonders für: Brillenträger, die alle 2 Jahre neue Gläser brauchen (bis 500 Euro Erstattung). Patienten, die regelmäßig zum Heilpraktiker, Osteopathen oder Chiropraktiker gehen. Familien mit Kindern, da jedes Mitglied ein eigenes Budget erhält und Neugeborene sofort mitversichert werden können. Menschen, die Wert auf Vorsorge legen und ohnehin Impfungen, Zahnreinigungen und Check-ups wahrnehmen. Und Studenten oder Berufseinsteiger, die günstig einsteigen und oft schon mit dem Bonus plus kommen." },
];

const faqs = [...faqsKosten, ...faqsLeistungen, ...faqsAblauf, ...faqsVertrauen];

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
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">Alles was du über das Healio Gesundheitsbudget, die SDK Zusatzversicherung und das IKK Classic Bonusprogramm wissen musst.</p>
        </div>

        {[
          { title: "Kosten & Finanzierung", items: faqsKosten, offset: 0 },
          { title: "Leistungen & Erstattung", items: faqsLeistungen, offset: faqsKosten.length },
          { title: "Ablauf & Kassenwechsel", items: faqsAblauf, offset: faqsKosten.length + faqsLeistungen.length },
          { title: "Vertrauen & Sicherheit", items: faqsVertrauen, offset: faqsKosten.length + faqsLeistungen.length + faqsAblauf.length },
        ].map((category, catIdx) => (
          <div key={catIdx} className="mb-10">
            <h3 className="text-xl font-bold text-healio-dark mb-4">{category.title}</h3>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {category.items.map((faq, index) => (
                <AccordionItem key={index} value={`item-${category.offset + index}`} className="bg-gray-50 border border-gray-100 rounded-xl px-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
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
        ))}
      </div>
    </section>
  );
};

export default AmbulantFAQ;
