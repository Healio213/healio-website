import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

// Der Rechner wird erst geladen, wenn er in die Nähe des Bildschirms kommt
// (Mobil-Prüfung 06.10.2026: nichts unterhalb des ersten Bildschirms vorab
// laden). Überschrift und Einleitung stehen sofort im HTML, der Platzhalter
// hält die Höhe, damit beim Nachladen nichts springt.
const ZahnkostenRechner = lazy(() => import('@/components/ratgeber/ZahnkostenRechner'));

const LazyZahnkostenRechner = ({ block }) => {
  const anchorRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = anchorRef.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver !== 'function') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const placeholder = (
    <div className="mt-5 min-h-[36rem] rounded-[1.5rem] border border-dashed border-slate-200 bg-white/60 sm:min-h-[30rem]" aria-hidden="true" />
  );

  return (
    <section
      ref={anchorRef}
      id={block.id || 'zahnkosten-rechner'}
      aria-labelledby={`${block.id || 'zahnkosten-rechner'}-heading`}
      className="mt-10 scroll-mt-28 rounded-[1.75rem] border border-[#cfeee0] bg-[#f4faf7] p-4 sm:p-7"
      data-ratgeber-calculator="zahnkosten"
    >
      <h3 id={`${block.id || 'zahnkosten-rechner'}-heading`} className="font-display text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-2xl">
        {block.heading}
      </h3>
      {block.intro && <p className="mt-2 text-base leading-7 text-slate-700">{block.intro}</p>}
      {visible ? (
        <Suspense fallback={placeholder}>
          <ZahnkostenRechner preset={block.preset} />
        </Suspense>
      ) : placeholder}
    </section>
  );
};

export default LazyZahnkostenRechner;
