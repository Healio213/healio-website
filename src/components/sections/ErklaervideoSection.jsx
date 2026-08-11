
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

// Gemeinsame Erklaervideo-Sektion fuer /ambulant, /zahn und /stationaer.
// Die Videos erklaeren, was der Zuschauer bekommt und wie er es umsetzt.
const ErklaervideoSection = ({
  video,
  poster,
  titel,
  untertitel,
  dauer,
  trackingLabel,
  hintergrund = 'bg-gray-50',
}) => {
  const [spielt, setSpielt] = useState(false);
  const videoRef = useRef(null);
  const meilensteine = useRef(new Set());

  const track = (action, value = 0) => trackEvent(action, {
    component: 'explanation_video',
    placement: trackingLabel,
    value,
  });

  const starten = () => {
    setSpielt(true);
    track('video_play');
  };

  const fortschritt = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = Math.floor((v.currentTime / v.duration) * 100);
    [25, 50, 75, 100].forEach((m) => {
      if (pct >= m && !meilensteine.current.has(m)) {
        meilensteine.current.add(m);
        track('video_progress', m);
      }
    });
  };

  return (
    <section className={`py-16 md:py-20 ${hintergrund}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-healio-dark">{titel}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-600">
            {untertitel}
          </p>
          {dauer && (
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-healio-primary">
              {dauer}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
            onClick={() => { if (!spielt) starten(); }}
          >
            {!spielt ? (
              <>
                <img
                  src={poster}
                  alt={titel}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/35">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-healio-primary shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-9 w-9 text-white" />
                  </div>
                </div>
              </>
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full"
                controls
                autoPlay
                playsInline
                poster={poster}
                onTimeUpdate={fortschritt}
                onEnded={() => track('video_complete', 100)}
              >
                <source src={video} type="video/mp4" />
                Ihr Browser unterstützt kein Video.
              </video>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ErklaervideoSection;
