import React from 'react';
import { Play } from 'lucide-react';
import ClickToPlayVideo from '@/components/sections/shared/ClickToPlayVideo';
import MobileDetails from '@/components/ui/MobileDetails';
import { useLanguage } from '@/hooks/useLanguage';

const ExplainerVideoCard = ({
  id,
  videoSrc,
  poster,
  eyebrow,
  title,
  badge,
  subtitle,
  disclosure,
  ariaLabel,
  // Optional: Untertitel-Datei (WebVTT). Ohne Angabe bleibt das Video wie bisher.
  captionsSrc,
  captionsLang = 'de',
  captionsLabel = 'Deutsch',
  className = 'bg-home-ice',
}) => {
  const headingId = `${id}-heading`;
  const { lang } = useLanguage();

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden px-4 py-6 sm:px-6 sm:py-10 md:py-16 lg:px-8 ${className}`}
      aria-labelledby={headingId}
    >
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-home-mint/[0.08] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-emerald-950/10 bg-[#fffdf8] p-2 md:rounded-[2.1rem] md:p-3 md:shadow-[0_24px_70px_rgba(7,23,34,0.14)]">
        <div className="flex items-start gap-3 px-3 py-3 sm:px-5 sm:py-4">
          <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full bg-home-mint text-home-midnight" aria-hidden="true">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
          <div className="min-w-0">
            <p className="hidden font-display text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700 md:block">{eyebrow}</p>
            <h2 id={headingId} className="font-display text-xl font-extrabold leading-snug text-home-midnight md:mt-1 md:text-2xl">{title}</h2>
            {badge && <p className="mt-3 inline-flex rounded-xl bg-home-mint/20 px-3 py-2 text-sm font-bold leading-5 text-emerald-950">{badge}</p>}
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.25rem] bg-home-midnight p-1.5 sm:rounded-[1.55rem] sm:p-2">
          <ClickToPlayVideo
            src={videoSrc}
            className="aspect-video w-full rounded-[0.95rem] bg-black object-cover sm:rounded-[1.15rem]"
            poster={poster}
            ariaLabel={ariaLabel}
            captionsSrc={captionsSrc}
            captionsLang={captionsLang}
            captionsLabel={captionsLabel}
          />
        </div>

        {(subtitle || disclosure) && <div className="px-3 py-3 sm:px-5 sm:py-4">
          <MobileDetails summary={lang === 'en' ? 'About this video' : 'Hinweise zum Video'} className="text-slate-600">
            {subtitle && <p className="text-base font-semibold leading-7 text-home-midnight">{subtitle}</p>}
            {disclosure && <p className="mt-2 text-sm leading-6 text-slate-600">{disclosure}</p>}
          </MobileDetails>
        </div>}
      </div>
    </section>
  );
};

export default ExplainerVideoCard;
