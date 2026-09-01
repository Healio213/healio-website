import React from 'react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const AudienceProofBar = ({ items, ariaLabel }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="relative z-30 -mt-7 px-4 sm:px-6 md:px-8" aria-label={ariaLabel}>
      <div className="container mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-[#dbe6e3] bg-[#dbe6e3] md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4 bg-white px-6 py-6 sm:px-7">
            <FriendlyIcon
              kind={item.kind}
              label={item.title}
              tone={item.tone}
              size="sm"
              decorative={false}
              className="mt-0.5"
            />
            <div>
              <p className="font-display text-sm font-extrabold text-[#07111f] sm:text-base">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#52666d]">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudienceProofBar;
