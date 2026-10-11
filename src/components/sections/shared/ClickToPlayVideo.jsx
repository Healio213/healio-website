import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

const ClickToPlayVideo = ({
  src,
  poster,
  ariaLabel,
  captionsSrc,
  captionsLang = 'de',
  captionsLabel = 'Deutsch',
  captionsDefault = false,
  className = 'aspect-video w-full bg-home-midnight',
  fallback,
  overlayBadge,
  onPlay,
  onTimeUpdate,
  onEnded,
  onError,
}) => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const startVideo = () => {
    // Invoke play in the click itself so mobile browsers retain user activation.
    // Native controls remain available if playback cannot start automatically.
    const playback = videoRef.current?.play();
    setStarted(true);
    playback?.catch(() => {});
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={className}
        controls={started}
        preload="none"
        playsInline
        poster={poster}
        aria-label={ariaLabel}
        onPlay={(event) => {
          setStarted(true);
          onPlay?.(event);
        }}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onError={onError}
      >
        <source src={src} type="video/mp4" />
        {captionsSrc && (
          <track kind="captions" src={captionsSrc} srcLang={captionsLang} label={captionsLabel} default={captionsDefault} />
        )}
        {fallback}
      </video>
      {!started && (
        <button
          type="button"
          onClick={startVideo}
          aria-label={ariaLabel}
          className="absolute inset-0 flex items-end justify-between gap-3 bg-black/10 p-3 transition-colors hover:bg-black/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-home-mint sm:p-5"
        >
          {/* Besuchertest 11.10.2026: Der Startknopf sitzt unten rechts und nicht mehr
              mittig auf der Titelzeile des Vorschaubilds. */}
          {overlayBadge ? <span className="rounded-full bg-home-midnight px-4 py-2 text-left text-sm font-semibold text-white">{overlayBadge}</span> : <span aria-hidden="true" />}
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-home-mint text-home-midnight shadow-lg sm:h-16 sm:w-16">
            <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
};

export default ClickToPlayVideo;
