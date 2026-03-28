
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const categoryKeys = ['kosten', 'leistungen', 'ablauf', 'vertrauen'];

const AmbulantFAQ = () => {
  const { t } = useTranslation('ambulant-faq');

  const categories = useMemo(() => {
    let offset = 0;
    return categoryKeys.map(key => {
      const items = t(`categories.${key}.items`, { returnObjects: true });
      const itemsArr = Array.isArray(items) ? items : [];
      const cat = {
        title: t(`categories.${key}.title`),
        items: itemsArr,
        offset,
      };
      offset += itemsArr.length;
      return cat;
    });
  }, [t]);

  const allFaqs = useMemo(() => categories.flatMap(c => c.items), [categories]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="pt-24 pb-32 bg-white" itemScope itemType="https://schema.org/FAQPage">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">{t('title')}</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {categories.map((category, catIdx) => (
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
