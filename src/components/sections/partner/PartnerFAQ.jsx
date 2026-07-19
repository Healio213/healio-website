
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HighlightText from '@/components/ui/HighlightText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PartnerFAQ = () => {
  const { t } = useTranslation('partner');
  const translatedItems = t('faq.items', { returnObjects: true });
  const faqs = Array.isArray(translatedItems) ? translatedItems : [];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            <HighlightText text={t('faq.title')} />
          </h2>
          <p className="text-lg text-slate-600">
            {t('faq.subtitle')}
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
                key={faq.question}
                value={`item-${index}`}
                className="bg-white border border-slate-100 rounded-xl px-6 data-[state=open]:border-[#25c990] data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-[#25c990] hover:no-underline py-6">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 flex-shrink-0 text-[#25c990]" aria-hidden="true" />
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
