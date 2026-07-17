import React from 'react';

const conceptPositions = {
  glass: [
    'left-[4%] top-[12%] sm:left-[2%] sm:top-[14%]',
    'right-[4%] top-[31%] sm:right-0 sm:top-[29%]',
    'bottom-[11%] left-1/2 -translate-x-1/2 sm:bottom-[9%]',
  ],
  core: [
    'left-[3%] top-[22%] sm:left-0 sm:top-[19%]',
    'right-[3%] top-[17%] sm:right-0 sm:top-[21%]',
    'bottom-[12%] left-[52%] -translate-x-1/2 sm:bottom-[8%]',
  ],
  scroll: [
    'left-[3%] top-[13%] sm:left-0 sm:top-[15%]',
    'right-[3%] top-[23%] sm:right-0 sm:top-[20%]',
    'bottom-[10%] left-1/2 -translate-x-1/2 sm:bottom-[7%]',
  ],
};

const ProtectionLabels = ({ concept = 'glass', labels = [] }) => {
  const positions = conceptPositions[concept] || conceptPositions.glass;

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true" data-concept={concept}>
      {labels.map((label, index) => (
        <div
          key={`${concept}-${label}`}
          aria-hidden="true"
          data-concept={concept}
          data-protection-label={index + 1}
          className={`absolute max-w-[46%] animate-[pulse_5s_ease-in-out_infinite] rounded-xl border border-white/15 bg-home-midnight/90 px-3 py-2 font-display text-[11px] font-bold leading-snug text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md motion-reduce:animate-none sm:max-w-[48%] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${positions[index]}`}
          style={{ animationDelay: `${index * 180}ms` }}
        >
          <span className="mr-2 inline-block h-2 w-2 shrink-0 rounded-full bg-home-mint shadow-[0_0_12px_rgba(94,224,177,0.75)]" />
          {label}
        </div>
      ))}
    </div>
  );
};

export default ProtectionLabels;
