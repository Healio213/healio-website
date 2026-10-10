import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import ClickToPlayVideo from '@/components/sections/shared/ClickToPlayVideo';

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
});

const CompanyExplainerVideo = ({ kind = 'system' }) => {
  const { t } = useTranslation('unternehmen');
  const { lang, getPath } = useLanguage();
  const video = VIDEO_CONFIG[kind];

  if (lang !== 'de' || !video) return null;

  const content = t(`explainerVideos.${kind}`, { returnObjects: true });
  const isDark = Boolean(video.dark);

  const sectionClassName = isDark
    ? 'bg-[#06131c] pb-8 text-white md:pb-14 lg:pb-20'
    : 'bg-white py-8 md:py-14 lg:py-20';

  return (
    <section
      id={video.anchor}
      data-company-explainer={kind}
      className={`scroll-mt-24 ${sectionClassName}`}
      aria-labelledby={`${video.anchor}-title`}
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-5 md:gap-8 lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] lg:gap-x-12 lg:gap-y-5${isDark ? ' border-t border-white/10 pt-6 sm:pt-10 lg:pt-14' : ''}`}>
          <h2
            id={`${video.anchor}-title`}
            className={`max-w-[24ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl lg:col-start-1 lg:row-start-1 lg:self-end lg:text-4xl ${isDark ? 'text-white' : 'text-[#07161f]'}`}
          >
            {content.title}
          </h2>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className={`overflow-hidden rounded-[1.5rem] border bg-[#07161f] ${isDark ? 'border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.35)]' : 'border-[#0b2a32]/10 shadow-[0_24px_70px_rgba(7,22,31,0.16)]'}`}>
              <ClickToPlayVideo
                src={video.source}
                className="aspect-video h-auto w-full bg-[#07161f]"
                poster={video.poster}
                ariaLabel={content.videoLabel}
                captionsSrc={video.captions}
                captionsDefault={Boolean(video.captionsDefault)}
                fallback={content.fallback}
              />
            </div>
            <p className={`mt-3 text-sm leading-5 md:text-xs md:leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {content.captionHint}
            </p>
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <p className={`max-w-xl text-base leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{content.description}</p>
            <p className={`mt-4 text-sm font-semibold leading-6 ${isDark ? 'text-[#8ee7ca]' : 'text-[#07563f]'}`}>{content.note}</p>
            <Link
              to={getPath('potenzialanalyse')}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-home-mint px-6 py-3 text-sm font-bold text-home-midnight transition-colors hover:bg-home-mint-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-2"
            >
              {t('hero.analysisCta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyExplainerVideo;
