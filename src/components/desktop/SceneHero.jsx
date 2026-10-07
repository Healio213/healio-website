import React from 'react';
import useDesktopLayout from '@/hooks/useDesktopLayout';

// Einheitlicher Desktop-Kopfbereich (Frank 07.10.2026): eine 3D-Szene im
// Healio-Figurenstil füllt die Bühne, im Bild stehen nur Überschrift und Knopf.
// Erklärung, Angebot und Hinweise kommen als `children` direkt darunter.
// Die Szenen sind links dunkel (#071726), deshalb beginnt das Bild erst nach
// dem ersten Siebtel und läuft über einen Verlauf in den Grund. Oben beginnt
// es unter der Navigation und ist nach oben ausgerichtet, damit auf großen
// Bildschirmen keine Köpfe abgeschnitten werden (Frank 07.10.2026).
export const sceneHeroImages = {
  home: '/images/hero-desktop/start.webp',
  ambulant: '/images/hero-desktop/ambulant.webp',
  zahn: '/images/hero-desktop/zahn.webp',
  stationaer: '/images/hero-desktop/stationaer.webp',
  schwangerschaft: '/images/hero-desktop/schwangerschaft.webp',
  // /hebammen (08.10.2026): vorerst dieselbe Szene wie /schwangerschaft, die
  // Hausbesuch-Situation (Hebamme mit Notizbuch bei der Schwangeren zu Hause)
  // passt auch hier. Eine eigene Szene kann diese Zeile später ersetzen.
  hebammen: '/images/hero-desktop/schwangerschaft.webp',
  leistungen: '/images/hero-desktop/leistungen.webp',
  partner: '/images/hero-desktop/partner.webp',
  about: '/images/hero-desktop/about.webp',
};

export const sceneAccentClass = 'mt-1 block text-[#5ee0b1]';

// Gemeinsame Stile für den Bereich unter dem Bild, damit alle Seiten gleich lesen.
export const sceneBelow = {
  grid: 'grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start gap-16 xl:gap-20',
  lead: 'max-w-[56ch] text-xl leading-8 text-[#e1ebef]',
  note: 'mt-4 max-w-[62ch] text-sm leading-6 text-[#bfced6]',
  listTitle: 'font-display text-2xl font-bold leading-8 tracking-[-0.01em] text-white',
  listIntro: 'mt-1 text-base leading-7 text-[#c9d8de]',
  list: 'mt-5 divide-y divide-white/15 border-y border-white/15',
  trust: 'mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#425c6c] pt-5 text-sm text-[#d4e1e5]',
};

export const scenePrimaryButtonClass =
  'inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25c990] px-8 py-4 font-display text-base font-extrabold text-[#071726] transition-colors hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export const sceneSecondaryButtonClass =
  'inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/35 px-7 py-4 font-display text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const SceneHero = ({ surface, image, headingId, heading, actions, children, className = '', dataAttributes = {} }) => {
  // Auf dem Rechner trägt dieser Kopfbereich die h1; die Handy-Fassung der Seite nutzt dort h2.
  const Heading = useDesktopLayout() ? 'h1' : 'h2';
  const src = image || sceneHeroImages[surface];

  return (
    <section
      {...dataAttributes}
      className={`hidden w-full bg-[#071726] text-white lg:block ${className}`}
      aria-labelledby={headingId}
    >
      <div className="relative isolate overflow-hidden">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute bottom-0 right-0 top-20 -z-20 h-[calc(100%-5rem)] w-[86%] object-cover object-[80%_22%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071726_0%,#071726_14%,rgba(7,23,38,0.78)_30%,rgba(7,23,38,0.32)_52%,rgba(7,23,38,0)_74%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-20 -z-10 h-28 bg-gradient-to-b from-[#071726] to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-gradient-to-t from-[#071726] to-transparent" aria-hidden="true" />

        <div className="mx-auto flex min-h-[min(100svh,54rem)] w-full max-w-7xl flex-col justify-end px-8 pb-20 pt-36 2xl:min-h-[min(100svh,62rem)]">
          <div className="max-w-[44rem]">
            <Heading
              id={headingId}
              className="font-display text-[clamp(2.6rem,3.7vw,3.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em] [text-wrap:balance] [text-shadow:0_2px_28px_rgba(7,23,38,0.45)]"
            >
              {heading}
            </Heading>
            {actions && <div className="mt-9 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>
        </div>
      </div>

      {children && <div className="mx-auto w-full max-w-7xl px-8 pb-10 pt-8">{children}</div>}
    </section>
  );
};

export default SceneHero;
