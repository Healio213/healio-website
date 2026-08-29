import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQ_KEYS = ['difference', 'preExisting', 'age', 'horse', 'next'];

const VeterinaryFaq = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section className="relative overflow-hidden bg-[#0a202b] py-20 text-white sm:py-24 lg:py-28" aria-labelledby="vet-faq-title">
      <div className="absolute -left-48 bottom-0 h-[32rem] w-[32rem] rounded-full border border-[#25c990]/10" aria-hidden="true" />
      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#76e2bd]">{t('faq.eyebrow')}</p>
            <h2 id="vet-faq-title" className="mt-4 max-w-[13ch] font-display text-[clamp(2.4rem,4.5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#fffdf8]">
              {t('faq.title')}
            </h2>
            <div className="mt-8 hidden h-px w-32 bg-gradient-to-r from-[#25c990] to-transparent lg:block" aria-hidden="true" />
          </div>

          <div>
            <div className="border-t border-white/20">
              {FAQ_KEYS.map((key, index) => (
                <details key={key} className="group border-b border-white/20">
                  <summary className="grid cursor-pointer list-none grid-cols-[34px_1fr_24px] items-center gap-2 py-5 font-display text-base font-extrabold leading-snug text-[#fffdf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#25c990] sm:grid-cols-[48px_1fr_24px] sm:py-6 sm:text-lg">
                    <span className="text-xs tracking-[0.14em] text-[#76e2bd]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{t(`faq.items.${key}.question`)}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#76e2bd] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="max-w-3xl pb-6 pl-[36px] pr-6 text-sm leading-relaxed text-slate-300 sm:pl-[50px] sm:text-base">{t(`faq.items.${key}.answer`)}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-6 bg-[#f8efdc] p-6 text-[#10272d] shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-friendly text-2xl font-bold leading-tight sm:text-3xl">{t('faq.ctaTitle')}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#61706d]">{t('faq.ctaText')}</p>
              </div>
              <Button
                type="button"
                onClick={() => document.getElementById('tier-check')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="h-auto w-full shrink-0 rounded-full bg-[#25c990] px-6 py-4 font-display font-extrabold text-[#062319] hover:bg-[#5ee0b1] md:w-auto"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeterinaryFaq;
