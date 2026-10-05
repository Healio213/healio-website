import React, { Children, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Experiment 05.10.2026 (Franks Wunsch nach dem Mercedes-Vergleich): Auf dem
// Handy wird eine Reihe von Karten zur Wischreihe mit sichtbarer Nachbarkarte
// und Punkten darunter, damit die Seite nicht endlos lang wird. Ab md (768 px)
// rendert dieselbe Liste unverändert als das bisherige Raster.
//
// Vertrag für alle Nutzer:
// - desktopClassName enthält die bisherigen Raster-Klassen, aber ALLE mit
//   md:-Präfix (z. B. "md:grid md:grid-cols-3 md:gap-6"), weil die Basis
//   mobil die Wischreihe ist.
// - itemClassName gilt für jedes Listenelement auf allen Größen (z. B. "h-full").
// - Jedes Kind wird ein <li>; die Kinder selbst bleiben, wie sie sind.
// - bleed (Standard true) zieht die Reihe mobil bis an den Bildschirmrand und
//   setzt voraus, dass der Elternbereich px-4 sm:px-6 hat. Sonst bleed={false}.
const DEFAULT_ITEM_WIDTH = 'w-[82vw] max-w-[22rem]';

const MobileSwipeRow = ({
  children,
  label,
  className = '',
  desktopClassName = 'md:grid md:grid-cols-2 md:gap-6',
  itemClassName = '',
  mobileItemWidth = DEFAULT_ITEM_WIDTH,
  dotsLabel,
  dotsTone = 'light',
  as: ListTag = 'ul',
  bleed = true,
}) => {
  const items = Children.toArray(children).filter(Boolean);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll(':scope > li');
    if (!cards.length) return;
    const trackLeft = track.getBoundingClientRect().left;
    let nearest = 0;
    let nearestDistance = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft - parseFloat(getComputedStyle(track).paddingLeft || '0'));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    track.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => track.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToItem = (index) => {
    const track = trackRef.current;
    const target = track?.querySelectorAll(':scope > li')[index];
    if (!track || !target) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft || '0');
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft - padding, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const dotActive = dotsTone === 'dark' ? 'bg-white' : 'bg-[#07111f]';
  const dotIdle = dotsTone === 'dark' ? 'bg-white/30' : 'bg-slate-300';

  return (
    <div className={`relative ${className}`}>
      <ListTag
        ref={trackRef}
        aria-label={label}
        className={`relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:snap-none md:overflow-visible md:pb-0 ${bleed ? '-mx-4 scroll-pl-4 px-4 sm:-mx-6 sm:scroll-pl-6 sm:px-6 md:mx-0 md:px-0' : ''} ${desktopClassName}`}
      >
        {items.map((child, index) => (
          <li
            key={child.key ?? index}
            className={`relative shrink-0 snap-start ${mobileItemWidth} md:w-auto md:max-w-none md:shrink ${itemClassName}`}
          >
            {child}
          </li>
        ))}
      </ListTag>

      {items.length > 1 ? (
        <div role="group" className="mt-4 flex items-center gap-2 md:hidden" aria-label={dotsLabel || label}>
          {items.map((child, index) => (
            <button
              key={child.key ?? index}
              type="button"
              onClick={() => scrollToItem(index)}
              aria-label={`Karte ${index + 1} von ${items.length}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="flex h-8 min-w-6 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${index === activeIndex ? `w-8 ${dotActive}` : `w-3 ${dotIdle}`}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MobileSwipeRow;
