import React from 'react';
import { Play } from 'lucide-react';

const ExplainerVideoCard = ({
  id,
  videoSrc,
  poster,
  eyebrow,
  title,
  ariaLabel,
  className = 'bg-home-ice',
}) => {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden px-4 py-12 sm:px-6 md:py-16 lg:px-8 ${className}`}
      aria-labelledby={headingId}
    >
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-home-mint/[0.08] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-[#fffdf8] p-2 shadow-[0_24px_70px_rgba(7,23,34,0.14)] sm:rounded-[2.1rem] sm:p-3">
        <div className="overflow-hidden rounded-[1.25rem] bg-home-midnight p-1.5 sm:rounded-[1.55rem] sm:p-2">
          <video
            className="aspect-video w-full rounded-[0.95rem] bg-black object-cover sm:rounded-[1.15rem]"
            controls
            preload="metadata"
            playsInline
            poster={poster}
            aria-label={ariaLabel}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 sm:px-5 sm:py-4">
          <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full bg-home-mint text-home-midnight" aria-hidden="true">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-emerald-700 sm:text-[0.68rem]">{eyebrow}</p>
            <h2 id={headingId} className="mt-0.5 font-display text-sm font-extrabold leading-snug text-home-midnight sm:text-base">{title}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplainerVideoCard;
