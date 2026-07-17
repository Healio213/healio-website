import React from 'react';
import ProtectionLabels from './ProtectionLabels';

const shieldClipPath = 'polygon(50% 0%, 91% 14%, 86% 64%, 72% 84%, 50% 100%, 28% 84%, 14% 64%, 9% 14%)';

const HomeProtectionFallback = ({ concept = 'glass', labels = [], showLabels = true }) => (
  <div
    className="absolute inset-0 overflow-hidden"
    aria-hidden="true"
    data-fallback-concept={concept}
  >
    <div data-shield-layer="outer" className="absolute left-1/2 top-1/2 h-[72%] max-h-[430px] w-[54%] max-w-[310px] -translate-x-1/2 -translate-y-1/2 bg-white/[0.08] p-[9%] shadow-[0_24px_80px_rgba(37,201,144,0.12)]" style={{ clipPath: shieldClipPath }}>
      <div data-shield-layer="middle" className="relative h-full w-full bg-home-midnight/80 p-[12%]" style={{ clipPath: shieldClipPath }}>
        <div data-shield-layer="inner" className="relative grid h-full w-full place-items-center bg-home-mint/[0.14]" style={{ clipPath: shieldClipPath }}>
          <span data-protection-core className="h-14 w-14 rounded-full bg-home-mint shadow-[0_0_46px_rgba(94,224,177,0.58)] sm:h-20 sm:w-20" />
        </div>
      </div>
    </div>
    {showLabels && <ProtectionLabels concept={concept} labels={labels} />}
  </div>
);

export default HomeProtectionFallback;
