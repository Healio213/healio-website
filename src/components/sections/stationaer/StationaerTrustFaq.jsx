import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const trustCards = [
  { key: 'broker', kind: 'broker', tone: 'mint' },
  { key: 'clarity', kind: 'document', tone: 'butter' },
  {
    key: 'support',
    kind: 'broker',
    src: '/images/friendly-icons/trust-broker-headset.webp',
    tone: 'lavender',
  },
];

const StationaerTrustFaq = () => {
  const { t } = useTranslation('stationaer');
  const [openFaq, setOpenFaq] = useState(0);
  const faqItems = t('refresh.faq.items', { returnObjects: true });
  const faqs = Array.isArray(faqItems) ? faqItems : [];

  return (
    <section className="bg-[#f5faf8] px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="stationaer-trust-heading">
      <div className="healio-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#087454]">
            {t('refresh.trust.eyebrow')}
          </p>
          <h2 id="stationaer-trust-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#071726] sm:text-4xl lg:text-5xl">
            {t('refresh.trust.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('refresh.trust.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {trustCards.map((card) => (
            <article
              key={card.key}
              className="rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_14px_35px_rgba(31,57,66,0.06)]"
            >
              <FriendlyIcon kind={card.kind} src={card.src} tone={card.tone} size="sm" />
              <h3 className="mt-4 font-display text-lg font-extrabold text-[#071726]">{t(`refresh.trust.cards.${card.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(`refresh.trust.cards.${card.key}.body`)}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#087454]">{t('refresh.faq.eyebrow')}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-[#071726] sm:text-4xl">{t('refresh.faq.title')}</h2>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const contentId = `stationaer-faq-${index}`;
              return (
                <article key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex min-h-14 w-full items-center justify-between gap-5 px-5 py-4 text-left font-extrabold text-[#071726] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#25c990] sm:px-6"
                  >
                    <span>{faq.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-5 w-5 text-[#087454]" aria-hidden="true" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a6c50] to-[#063e35] px-6 py-9 text-center text-white shadow-[0_24px_60px_rgba(6,62,53,0.18)] sm:px-9 md:flex-row md:text-left">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9af0d1]">{t('refresh.final.eyebrow')}</p>
            <h2 className="mt-2 max-w-[20ch] font-display text-2xl font-extrabold leading-tight sm:text-3xl">{t('refresh.final.title')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">{t('refresh.final.body')}</p>
          </div>
          <a
            href="#tarife"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#075f46] transition hover:-translate-y-0.5 hover:bg-[#e9fff7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            {t('refresh.hero.cta')}
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StationaerTrustFaq;
