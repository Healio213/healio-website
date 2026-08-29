import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const VeterinaryTrustStrip = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section className="relative z-20 bg-[#f5f0e7]" aria-label={t('trust.ariaLabel')}>
      <div className="healio-container -translate-y-10 px-4 sm:-translate-y-12 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-[#fffdf8] px-5 py-5 shadow-[0_24px_70px_rgba(7,24,39,0.17)] sm:px-7 sm:py-6 lg:grid lg:grid-cols-[210px_1fr_1fr_190px] lg:items-center lg:gap-0 lg:px-8">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-[#25c990]/15" aria-hidden="true" />

          <div className="flex items-center gap-4 border-b border-[#143a35]/10 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
            <span className="flex h-16 w-16 shrink-0 rotate-[-5deg] items-center justify-center rounded-full border border-[#087451]/25 bg-[#e5f8f0] font-friendly text-2xl font-bold text-[#087451] shadow-[inset_0_0_0_5px_#fffdf8]">
              §34d
            </span>
            <span className="font-display text-sm font-extrabold leading-snug text-[#173338]">{t('trust.broker')}</span>
          </div>

          <div className="grid grid-cols-2 gap-5 py-5 lg:contents">
            <div className="lg:px-8">
              <span className="block font-display text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-[#087451]">01</span>
              <span className="mt-1 block text-sm font-bold leading-snug text-[#173338] sm:text-base">{t('trust.personal')}</span>
            </div>
            <div className="border-l border-[#143a35]/10 pl-5 lg:px-8">
              <span className="block font-display text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-[#087451]">02</span>
              <span className="mt-1 block text-sm font-bold leading-snug text-[#173338] sm:text-base">{t('trust.nonBinding')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-[#143a35]/10 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <FriendlyIcon icon="pet-care" tone="mint" size="sm" />
            <span className="font-friendly text-xl font-bold leading-tight text-[#0b5b47] sm:text-2xl">{t('trust.animals')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeterinaryTrustStrip;
