import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

// Vier gleich gebaute Punkte (Frank 30.09.2026: die Leiste sah "voll bescheuert"
// aus, weil der letzte Punkt in einer schmalen Spalte in fünf Zeilen umbrach und
// nur zwei von vier Punkten eine Nummer trugen). Symbol links, Text rechts, auf
// dem Handy zwei mal zwei.
const items = [
  { key: 'broker' },
  { key: 'personal', kind: 'support', tone: 'sky' },
  { key: 'nonBinding', kind: 'document', tone: 'butter' },
  { key: 'animals', kind: 'pet', tone: 'mint' },
];

const VeterinaryTrustStrip = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section className="relative z-20 bg-[#f5f0e7]" aria-label={t('trust.ariaLabel')}>
      <div className="healio-container -translate-y-10 px-4 sm:-translate-y-12 sm:px-6 md:px-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-[1.8rem] bg-[#fffdf8] px-5 py-5 shadow-[0_24px_70px_rgba(7,24,39,0.17)] sm:px-7 sm:py-6 lg:grid-cols-4 lg:gap-0 lg:px-2">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={`flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:px-6 ${index > 0 ? 'lg:border-l lg:border-[#143a35]/10' : ''}`}
            >
              {item.kind ? (
                <FriendlyIcon kind={item.kind} tone={item.tone} size="sm" />
              ) : (
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#087451]/25 bg-[#e5f8f0] font-friendly text-base font-bold text-[#087451] shadow-[inset_0_0_0_4px_#fffdf8]"
                  aria-hidden="true"
                >
                  §34d
                </span>
              )}
              <span className="font-display text-sm font-extrabold leading-snug text-[#173338] sm:text-[0.95rem]">
                {t(`trust.${item.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VeterinaryTrustStrip;
