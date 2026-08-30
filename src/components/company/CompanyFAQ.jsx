import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CompanyFAQ = () => {
  const { t } = useTranslation('unternehmen');
  const items = t('faq.items', { returnObjects: true });

  return (
    <section className="bg-[#f7f9f8] py-14 lg:py-20" aria-labelledby="company-faq-title">
      <div className="healio-container grid gap-9 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('faq.eyebrow')}</p>
          <h2
            id="company-faq-title"
            className="mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#10202a] sm:text-5xl"
          >
            {t('faq.title')}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">{t('faq.description')}</p>
        </div>

        <div className="border-t border-slate-300">
          {items.map((item, index) => (
            <details key={item.question} className="group border-b border-slate-300 py-1">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-display text-lg font-extrabold leading-7 tracking-[-0.02em] text-[#10202a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 sm:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex gap-4">
                  <span className="pt-0.5 text-xs tracking-[0.16em] text-emerald-700">0{index + 1}</span>
                  {item.question}
                </span>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-6 pl-10 pr-8 text-base leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyFAQ;
