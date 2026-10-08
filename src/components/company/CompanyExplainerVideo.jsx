import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const VIDEO_CONFIG = Object.freeze({
  // Erklärfilm „Der Fachkräfte-Weckruf“ (unternehmen-1, 58 Sekunden), seit
  // 08.10.2026 im dunklen Kopfbereich direkt unter dem Einstieg.
  weckruf: {
    anchor: 'fachkraefte-erklaervideo',
    source: '/videos/erklaerfilme/erklaervideo-unternehmen-1-v1.mp4',
    poster: '/videos/erklaerfilme/erklaervideo-unternehmen-1-v1-poster.jpg',
    captions: '/videos/erklaerfilme/erklaervideo-unternehmen-1-v1-de.vtt',
    // Untertitel zum Einschalten, damit sie die Bedingungszeilen im Bild nicht verdecken.
    captionsDefault: false,
    dark: true,
  },
  // Seit 08.10.2026 Erklärfilm „Der kaufmännische Hebel“ (unternehmen-2, 60 Sekunden)
  // statt des früheren Vorsorgemanagement-Films; Anker bleibt für bestehende Links.
  system: {
    anchor: 'vorsorgemanagement-erklaervideo',
    source: '/videos/erklaerfilme/erklaervideo-unternehmen-2-v1.mp4',
    poster: '/videos/erklaerfilme/erklaervideo-unternehmen-2-v1-poster.jpg',
    captions: '/videos/erklaerfilme/erklaervideo-unternehmen-2-v1-de.vtt',
  },
  bav: {
    anchor: 'bav-zahlenbeispiel-video',
    source: '/videos/unternehmen/bav-zahlenbeispiel-b-v4.mp4',
    poster: '/videos/unternehmen/bav-zahlenbeispiel-b-v4-poster.webp',
    captions: '/videos/unternehmen/bav-zahlenbeispiel-b-v4-de.vtt',
  },
});

const CompanyExplainerVideo = ({ kind = 'system' }) => {
  const { t } = useTranslation('unternehmen');
  const { lang } = useLanguage();
  const video = VIDEO_CONFIG[kind];

  if (lang !== 'de' || !video) return null;

  const content = t(`explainerVideos.${kind}`, { returnObjects: true });
  const isBav = kind === 'bav';
  const isDark = Boolean(video.dark);

  // Hell (system, bav) wie bisher. Dunkel (weckruf) schließt nahtlos an den
  // dunklen Einstieg an, mit derselben Trennlinie wie der Reality Check darunter.
  let sectionClassName = 'bg-white py-10 md:py-14 lg:py-20';
  if (isBav) sectionClassName = 'bg-[#eef8f4] py-10 md:py-14 lg:py-20';
  if (isDark) sectionClassName = 'bg-[#06131c] pb-10 text-white md:pb-14 lg:pb-20';

  return (
    <section
      id={video.anchor}
      data-company-explainer={kind}
      className={sectionClassName}
      aria-labelledby={`${video.anchor}-title`}
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-6 md:gap-8 lg:items-center lg:gap-12 ${isBav ? 'lg:grid-cols-[minmax(0,1.32fr)_minmax(16rem,0.68fr)]' : 'lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)]'}${isDark ? ' border-t border-white/10 pt-8 sm:pt-12 lg:pt-14' : ''}`}>
          <div className={isBav ? 'lg:order-2' : ''}>
            <p className={`text-sm font-bold uppercase tracking-[0.2em] md:text-xs ${isDark ? 'text-[#8ee7ca]' : 'text-[#087052]'}`}>
              {content.eyebrow}
            </p>
            <h2
              id={`${video.anchor}-title`}
              className={`mt-4 max-w-[15ch] break-words font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-[#07161f]'}`}
            >
              {content.title}
            </h2>
            <p className={`mt-4 max-w-xl text-base leading-7 md:mt-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {content.description}
            </p>
            <p className={`mt-4 border-l-2 border-[#25c990] pl-4 text-base font-semibold leading-6 md:mt-5 md:text-sm md:leading-6 ${isDark ? 'text-[#8ee7ca]' : 'text-[#07563f]'}`}>
              {content.note}
            </p>
          </div>

          <div className={isBav ? 'lg:order-1' : ''}>
            <div className={`overflow-hidden rounded-[1.5rem] border bg-[#07161f] ${isDark ? 'border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.35)]' : 'border-[#0b2a32]/10 shadow-[0_24px_70px_rgba(7,22,31,0.16)]'}`}>
              <video
                className="aspect-video h-auto w-full bg-[#07161f]"
                controls
                playsInline
                preload="none"
                poster={video.poster}
                aria-label={content.videoLabel}
              >
                <source src={video.source} type="video/mp4" />
                <track
                  kind="captions"
                  src={video.captions}
                  srcLang="de"
                  label="Deutsch"
                  default={video.captionsDefault || undefined}
                />
                {content.fallback}
              </video>
            </div>
            <p className={`mt-3 text-sm leading-5 md:text-xs md:leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {content.captionHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyExplainerVideo;
