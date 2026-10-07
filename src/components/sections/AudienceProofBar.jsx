import React from 'react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

// Mobil (unter md) wischen die drei Rollen als Karten nebeneinander, damit die
// Leiste nicht drei Bildschirmhälften füllt. Ab md bleibt es der bisherige
// Dreier-Rahmen mit den hellen Trennfeldern.
const AudienceProofBar = ({ items, ariaLabel, className = '' }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className={`relative z-30 mt-6 px-4 sm:px-6 md:-mt-7 md:px-8 ${className}`} aria-label={ariaLabel}>
      <div className="container mx-auto max-w-6xl px-0 md:overflow-hidden md:rounded-2xl md:border md:border-[#dbe6e3] md:bg-[#dbe6e3] md:px-8">
        <MobileSwipeRow
          label={ariaLabel}
          desktopClassName="md:grid md:grid-cols-3 md:gap-0"
          mobileItemWidth="w-[84vw] max-w-[22rem]"
        >
          {items.map((item) => (
            <div
              key={item.title}
              className="flex h-full gap-4 rounded-2xl border border-[#dbe6e3] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(7,17,31,0.08)] sm:px-7 md:rounded-none md:border-0 md:px-7 md:py-6 md:shadow-none"
            >
              <FriendlyIcon
                kind={item.kind}
                label={item.title}
                tone={item.tone}
                size="sm"
                decorative={false}
                className="mt-0.5"
              />
              <div>
                <p className="font-display text-base font-extrabold text-[#07111f] sm:text-base">
                  {item.title}
                </p>
                <p className="mt-1 text-base leading-6 text-[#52666d] md:text-sm md:leading-6">{item.text}</p>
              </div>
            </div>
          ))}
        </MobileSwipeRow>
      </div>
    </section>
  );
};

export default AudienceProofBar;
