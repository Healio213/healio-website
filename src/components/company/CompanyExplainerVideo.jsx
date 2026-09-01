import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const VIDEO_CONFIG = Object.freeze({
  system: {
    anchor: 'vorsorgemanagement-erklaervideo',
    source: '/videos/unternehmen/vorsorgemanagement-a-v3.mp4',
    poster: '/videos/unternehmen/vorsorgemanagement-a-v3-poster.webp',
    captions: '/videos/unternehmen/vorsorgemanagement-a-v3-de.vtt',
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

  return (
    <section
      id={video.anchor}
      data-company-explainer={kind}
      className={isBav ? 'bg-[#eef8f4] py-14 lg:py-20' : 'bg-white py-14 lg:py-20'}
      aria-labelledby={`${video.anchor}-title`}
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-8 lg:items-center lg:gap-12 ${isBav ? 'lg:grid-cols-[minmax(0,1.32fr)_minmax(16rem,0.68fr)]' : 'lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)]'}`}>
          <div className={isBav ? 'lg:order-2' : ''}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087052]">
              {content.eyebrow}
            </p>
            <h2
              id={`${video.anchor}-title`}
              className="mt-4 max-w-[15ch] break-words font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#07161f] sm:text-4xl lg:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              {content.description}
            </p>
            <p className="mt-5 border-l-2 border-[#25c990] pl-4 text-sm font-semibold leading-6 text-[#07563f]">
              {content.note}
            </p>
          </div>

          <div className={isBav ? 'lg:order-1' : ''}>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#0b2a32]/10 bg-[#07161f] shadow-[0_24px_70px_rgba(7,22,31,0.16)]">
              <video
                className="aspect-video h-auto w-full bg-[#07161f]"
                controls
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={content.videoLabel}
              >
                <source src={video.source} type="video/mp4" />
                <track
                  kind="captions"
                  src={video.captions}
                  srcLang="de"
                  label="Deutsch"
                />
                {content.fallback}
              </video>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              {content.captionHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyExplainerVideo;
