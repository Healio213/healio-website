import React from 'react';

// Ruhige, kleine Fassung der Desktop-Szene für Handy und Tablet (Frank 11.10.2026):
// derselbe Bildausschnitt mit Figur, Überschrift und Knopf stehen darunter. Die
// Bilder sind eigene Handy-Fassungen (720 x 480, webp, je unter 40 KB) aus den
// Desktop-Szenen. Das Bild im ersten Bildschirm lädt sofort (priority), alle
// anderen Vorkommen laden verzögert.
export const mobileSceneImages = {
  home: '/images/hero-mobile/start.webp',
  ambulant: '/images/hero-mobile/ambulant.webp',
  zahn: '/images/hero-mobile/zahn.webp',
  stationaer: '/images/hero-mobile/stationaer.webp',
  schwangerschaft: '/images/hero-mobile/schwangerschaft.webp',
  partner: '/images/hero-mobile/partner.webp',
  about: '/images/hero-mobile/about.webp',
};

const MobileScene = ({ surface, priority = true, className = '' }) => (
  <div className={`mx-auto w-full max-w-[28rem] overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#071726] shadow-[0_18px_44px_rgba(7,23,38,0.28)] lg:hidden ${className}`} data-mobile-scene={surface}>
    <img
      src={mobileSceneImages[surface]}
      alt=""
      aria-hidden="true"
      width="720"
      height="480"
      {...(priority ? { fetchpriority: 'high' } : { loading: 'lazy' })}
      decoding="async"
      className="block h-auto w-full"
    />
  </div>
);

export default MobileScene;
