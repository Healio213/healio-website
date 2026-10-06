import { useEffect, useState } from 'react';

// Ab Tailwind-md (768 px) gilt die bisherige Desktop-Darstellung. Wo Handy und
// Desktop unterschiedliche Bäume brauchen (Wischreihe statt Raster, Akkordeon
// statt offener Liste), schaltet dieser Hook zwischen beiden um. Ohne window
// (Vorab-Rendern, Tests) gilt Desktop, damit das ausgelieferte HTML dem
// bisherigen entspricht.
const QUERY = '(min-width: 768px)';

const readMatch = () => (
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY).matches
    : true
);

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(readMatch);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia(QUERY);
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return isDesktop;
}
