
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <article className="border border-slate-100 rounded-xl mb-4 bg-white overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.q.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.q}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" aria-hidden="true" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.q.replace(/\s+/g, '-').toLowerCase()}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6"
          >
            <p className="pb-6 text-slate-600 leading-relaxed font-medium">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

const Faq = () => {
  const { t } = useTranslation('zahn');
  const [openFaq, setOpenFaq] = useState(0);

  const faqItems = t('faq.items', { returnObjects: true });
  const faqs = Array.isArray(faqItems) ? faqItems : [];

  return (
    <section className="py-24 bg-slate-50" aria-labelledby="faq-heading">
      <div className="healio-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            {t('faq.subtitle')}
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
