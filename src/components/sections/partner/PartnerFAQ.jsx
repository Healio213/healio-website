
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
    question: "Kostet die Partnerschaft etwas?",
    emoji: "💰",
    answer: "Nein, die Partnerschaft mit Healio ist vollständig kostenlos. Sie zahlen nur für die Materialien, die Sie tatsächlich nutzen."
  },
  {
    question: "Welche Materialien bekomme ich?",
    emoji: "📚",
    answer: "Sie erhalten professionelle Therapiematerialien, Patienteninformationen und Marketing-Unterstützung für Ihre Praxis."
  },
  {
    question: "Wie profitieren meine Patienten?",
    emoji: "👥",
    answer: "Ihre Patienten erhalten Zugang zu hochwertigen Therapiematerialien und können ihre Behandlung optimal unterstützen."
  },
  {
    question: "Wie werde ich Partner?",
    emoji: "🤝",
    answer: "Buchen Sie einfach einen Kennenlerntermin. Unser Team stellt Ihnen alles vor und beantwortet Ihre Fragen."
  },
  {
    question: "Muss ich mein Praxis-Konzept ändern?",
    emoji: "🏥",
    answer: "Nein, Sie behalten Ihre Unabhängigkeit. Healio passt sich Ihrer Praxis an, nicht umgekehrt."
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
            Hier finden Sie die Antworten auf die wichtigsten Fragen.
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
                className="bg-slate-50 border border-slate-100 rounded-xl px-6 data-[state=open]:border-[#25c990] data-[state=open]:shadow-md transition-all duration-300"
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
