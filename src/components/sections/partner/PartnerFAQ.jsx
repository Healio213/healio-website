
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was genau ist das Healio Gesundheitsbudget?",
    emoji: "💰",
    answer: "Deine Patienten kombinieren den IKK Kassenbonus (über 700 € pro Jahr) mit einer günstigen Zusatzversicherung. So entsteht ein echtes Gesundheitsbudget von bis zu 3.000 € in zwei Jahren — davon bis zu 1.000 € für Naturheilkunde, Osteopathie, TCM und alternative Therapien."
  },
  {
    question: "Kostet mich die Partnerschaft etwas?",
    emoji: "🤝",
    answer: "Nein. Die Partnerschaft ist komplett kostenlos. Die Informationsmaterialien und den Aufsteller für dein Wartezimmer liefern wir ebenfalls kostenfrei. Es gibt keine Vertragsbindung und keine Verpflichtungen."
  },
  {
    question: "Was muss ich als Behandler tun?",
    emoji: "📋",
    answer: "Praktisch nichts. Du stellst unseren Aufsteller mit Flyern in dein Wartezimmer oder gibst die Karten direkt an interessierte Patienten weiter. Den gesamten Rest — Beratung, Antrag, Abwicklung — übernimmt Healio. Du konzentrierst dich auf deine Behandlung."
  },
  {
    question: "Welche Leistungen werden erstattet?",
    emoji: "✅",
    answer: "Das Budget deckt ein breites Spektrum ab: Heilpraktiker Behandlungen, Osteopathie, TCM (Akupunktur, Kräutertherapie), Chiropraktik, Sehhilfen (Brillen, Kontaktlinsen), Zahnbehandlungen und vieles mehr. Die genauen Erstattungssätze hängen vom gewählten Tarif ab."
  },
  {
    question: "Muss ich mein Praxiskonzept ändern?",
    emoji: "🏥",
    answer: "Nein. Du behandelst weiter wie bisher. Healio verändert nicht deine Arbeit, sondern ermöglicht es deinen Patienten, sich diese Arbeit auch leisten zu können. Du behältst deine volle fachliche Unabhängigkeit."
  },
  {
    question: "Ist das auch für Brillengeschäfte und Optiker interessant?",
    emoji: "👓",
    answer: "Ja. Das Gesundheitsbudget enthält bis zu 600 € für Sehhilfen. Deine Kunden können sich damit die Brille leisten, die sie wirklich möchten — statt nur das günstigste Kassengestell. Das erhöht deinen durchschnittlichen Auftragswert."
  }
];

const PartnerFAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Häufige Fragen zur Partnerschaft</h2>
          <p className="text-lg text-slate-600">
            Alles was du wissen musst — kurz und ehrlich.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-slate-100 rounded-xl px-6 data-[state=open]:border-[#25c990] data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-[#25c990] hover:no-underline py-6">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">{faq.emoji}</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6 pl-10">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerFAQ;
