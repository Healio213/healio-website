import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Play } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const B2BExplainerVideo = ({
  sectionId,
  title,
  subtitle,
  statusLabel,
  message,
  points = [],
  ctaLabel,
  onCta,
  trackingLabel,
  videoSrc,
  posterSrc,
  captionsSrc,
  captionsLanguage = 'de',
  captionsLabel = 'Deutsch',
  privacyText,
  videoFallbackText,
  avatarAlt,
  assistantName,
  errorLabel,
}) => {
  const [playing, setPlaying] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef(null);
  const milestones = useRef(new Set());
  const playTracked = useRef(false);
  const reduceMotion = useReducedMotion();
  const hasApprovedVideo = Boolean(videoSrc && posterSrc && !mediaError);

  const track = (action, value = 0) => trackEvent(action, {
    component: 'explanation_video',
    placement: trackingLabel,
    value,
  });

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video?.duration) return;
    const progress = Math.floor((video.currentTime / video.duration) * 100);
    [25, 50, 75, 100].forEach((milestone) => {
      if (progress >= milestone && !milestones.current.has(milestone)) {
        milestones.current.add(milestone);
        track('video_progress', milestone);
      }
    });
  };

  return (
    <section id={sectionId} className="scroll-mt-24 bg-[#f4faf7] px-4 py-20 sm:px-6 md:px-8 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[#07111f] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#52666d]">{subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          {hasApprovedVideo ? (
            playing ? (
              <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_24px_70px_rgba(7,17,31,0.2)]">
                <video
                  ref={videoRef}
                  className="h-full w-full"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={posterSrc}
                  onPlay={() => {
                    if (!playTracked.current) {
                      playTracked.current = true;
                      track('video_play');
                    }
                  }}
                  onTimeUpdate={handleProgress}
                  onEnded={() => track('video_complete', 100)}
                  onError={() => {
                    setPlaying(false);
                    setMediaError(true);
                    track('video_error');
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                  {captionsSrc && <track kind="captions" src={captionsSrc} srcLang={captionsLanguage} label={captionsLabel} default />}
                  {videoFallbackText}
                </video>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={title}
                className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-[#07111f] shadow-[0_24px_70px_rgba(7,17,31,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25c990]/55 focus-visible:ring-offset-4"
                initial={reduceMotion ? false : { opacity: 0.76, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={posterSrc} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-[#07111f]/30 transition-colors group-hover:bg-[#07111f]/40">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#25c990] shadow-[0_12px_30px_rgba(7,96,70,0.3)]">
                    <Play className="ml-1 h-9 w-9 text-white" aria-hidden="true" />
                  </span>
                </span>
              </motion.button>
            )
          ) : (
            <div className="grid min-h-[26rem] overflow-hidden rounded-2xl bg-[#07111f] text-white shadow-[0_24px_70px_rgba(7,17,31,0.2)] sm:grid-cols-[0.82fr_1.18fr]">
              <div className="relative min-h-[19rem] overflow-hidden bg-[#dcefe8] sm:min-h-full">
                <motion.img
                  src="/nita-avatar.jpg"
                  alt={avatarAlt}
                  width="768"
                  height="768"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  initial={reduceMotion ? false : { scale: 1.025, y: 6 }}
                  whileInView={reduceMotion ? undefined : { scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07111f]/80 to-transparent" aria-hidden="true" />
                <p className="absolute bottom-5 left-5 right-5 text-sm font-bold text-white">{assistantName}</p>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="w-fit rounded-full bg-[#163547] px-3 py-1.5 text-xs font-bold text-[#9cebd0]">
                  {mediaError ? errorLabel : statusLabel}
                </p>
                <p className="mt-6 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
                  {message}
                </p>
                <ul className="mt-7 space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#d6e6e8] sm:text-base">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#75e6bf]" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => {
                track('video_cta_click');
                onCta?.();
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#25c990] px-8 py-3 text-base font-bold text-white shadow-[0_12px_30px_rgba(7,96,70,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1fb37f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087654] focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              {ctaLabel}
            </button>
            <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-[#60747c]">
              {privacyText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BExplainerVideo;
