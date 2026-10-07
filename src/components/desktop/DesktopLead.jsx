import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import { trackEvent } from '@/lib/analytics';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { scrollToZahnCheck } from '@/components/sections/dental/zahnCheckScroll';
import { useLanguage } from '@/hooks/useLanguage';
import useDesktopLayout from '@/hooks/useDesktopLayout';
import { getDesktopLeadContent } from './desktopLeadContent';

const destinations = { ambulant: '#budget-kompass', zahn: '#zahn-check', stationaer: '#tarife' };

// Vollbild-Foto statt hellem Kasten (Frank 07.10.2026: „überall schöne Bilder“).
// Personen stehen im Bild rechts, links liegt der Text auf einem dunklen Verlauf.
const heroImages = {
  home: { src: '/hero-bg.webp', position: '72% 50%' },
  ambulant: { src: '/images/hero-desktop/ambulant.webp', position: '70% 50%' },
  zahn: { src: '/images/hero-desktop/zahn.webp', position: '68% 35%' },
  stationaer: { src: '/images/hero-desktop/stationaer.webp', position: '72% 50%' },
};

// Nur für die Vorschau: ?hero=split zeigt die Variante mit Foto in der rechten Hälfte.
const usePreviewVariant = () => {
  const [variant, setVariant] = useState('full');
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('hero') === 'split') setVariant('split');
  }, []);
  return variant;
};

// Das Angebot unter dem Foto, ohne Kasten: dieselben Inhalte wie vorher.
const OfferList = ({ copy, surface }) => (
  <div className="min-w-0">
    <h2 className="font-display text-2xl font-bold leading-8 tracking-[-0.01em] text-white">{copy.panelTitle}</h2>
    <p className="mt-1 text-base leading-7 text-[#c9d8de]">{copy.panelText}</p>
    {copy.calculation ? (
      <ol className="mt-5 divide-y divide-white/15 border-y border-white/15">
        {copy.calculation.map((row) => (
          <li key={row.label} className="grid grid-cols-[1.5rem_1fr] gap-3 py-4">
            <span className="font-display text-2xl font-bold leading-6 text-[#5ee0b1]" aria-hidden="true">{row.sign}</span>
            <div>
              <h3 className="font-display text-lg font-bold leading-6">{row.label}</h3>
              <p className="mt-1 text-sm leading-6 text-[#c9d8de]">{row.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    ) : (
      <dl className="mt-5 divide-y divide-white/15 border-y border-white/15">
        {copy.benefits.map((benefit) => (
          <div key={benefit.label} className="py-3.5">
            <div className={`flex justify-between gap-6 ${surface === 'zahn' ? 'flex-col gap-1' : 'items-baseline'}`}>
              <dt className="font-display text-base font-bold leading-6 text-white">{benefit.label}</dt>
              <dd className="shrink-0 font-display text-lg font-extrabold leading-6 text-[#5ee0b1]">{benefit.value}</dd>
            </div>
            {benefit.detail && <p className="mt-1.5 text-sm leading-6 text-[#c9d8de]">{benefit.detail}</p>}
          </div>
        ))}
      </dl>
    )}
    <p className="mt-4 text-sm leading-6 text-[#bfced6]">{copy.panelNote}</p>
  </div>
);

const DesktopLead = ({ surface = 'home', language = 'de', fromBonusTopic = false }) => {
  const copy = getDesktopLeadContent(surface, language, fromBonusTopic);
  const { getPath } = useLanguage();
  const reduceMotion = useReducedMotion();
  const Heading = useDesktopLayout() ? 'h1' : 'h2';
  const isHome = surface === 'home';
  const headingId = `desktop-${surface}-heading`;
  const action = isHome ? KASSENBOOST_COMPARE_URL : fromBonusTopic && surface === 'ambulant' ? '#tarifwahl' : destinations[surface];

  const handleAction = (event) => {
    if (isHome) trackEvent('home_kassenboost_link', { placement: 'desktop-hero' });
    if (surface === 'zahn') {
      event.preventDefault();
      trackMetaRechnerStart();
      scrollToZahnCheck(reduceMotion);
    }
  };

  const variant = usePreviewVariant();
  const image = heroImages[surface] || heroImages.home;
  const split = variant === 'split';

  // Frank 07.10.2026: im Foto nur Überschrift und Knopf. Erklärung, Angebot und
  // Hinweise stehen direkt darunter, damit die Ecke nicht voll Text ist.
  return (
    <section
      data-desktop-lead={surface}
      className="hidden w-full bg-[#071726] text-white lg:block"
      aria-labelledby={headingId}
    >
      <div className="relative isolate overflow-hidden">
        {split ? (
          <div className="absolute inset-y-0 right-0 -z-10 w-[50%]" aria-hidden="true">
            <img src={image.src} alt="" fetchPriority="high" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: image.position }} />
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#071726] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#071726]/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071726] to-transparent" />
          </div>
        ) : (
          <>
            <img src={image.src} alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: image.position }} />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,23,38,0.9)_0%,rgba(7,23,38,0.74)_30%,rgba(7,23,38,0.3)_55%,rgba(7,23,38,0)_78%)]" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#071726]/75 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-gradient-to-t from-[#071726] to-transparent" aria-hidden="true" />
          </>
        )}

        <div className="mx-auto flex min-h-[min(100svh,54rem)] w-full max-w-7xl flex-col justify-end px-8 pb-20 pt-36">
          <div className={split ? 'max-w-[36rem]' : 'max-w-[44rem]'}>
            <Heading id={headingId} className="font-display text-[clamp(2.6rem,3.7vw,3.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em] [text-wrap:balance] [text-shadow:0_2px_28px_rgba(7,23,38,0.45)]">
              <span className="block">{copy.titleLead}</span>
              <span className="mt-1 block text-[#5ee0b1]">{copy.titleAccent}</span>
            </Heading>
            <a
              data-desktop-primary
              href={action}
              {...(isHome ? { target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': `desktop-${surface}-external` } : {})}
              onClick={handleAction}
              className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25c990] px-8 py-4 font-display text-base font-extrabold text-[#071726] transition-colors hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {copy.cta}
              {isHome ? <ArrowUpRight className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
            </a>
            {isHome && <span id={`desktop-${surface}-external`} className="sr-only">{copy.externalHint}</span>}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-8 pb-10 pt-8">
        <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start gap-16 xl:gap-20">
          <div className="min-w-0">
            <p className="max-w-[56ch] text-xl leading-8 text-[#e1ebef]">{copy.description}</p>
            <p className="mt-4 max-w-[62ch] text-sm leading-6 text-[#bfced6]">{copy.condition}</p>
            <p className="mt-2 max-w-[62ch] text-sm leading-6 text-[#bfced6]">{copy.hint}</p>
          </div>
          <OfferList copy={copy} surface={surface} />
        </div>

        <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#425c6c] pt-5 text-sm text-[#d4e1e5]">
          {copy.trust.map((item, index) => (
            <li key={item} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
              {index === 0 ? (
                <Link to={getPath('erstinformation')} title={copy.registration} className="inline-flex min-h-11 items-center rounded-sm underline decoration-[#799d91] underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{item}</Link>
              ) : item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DesktopLead;
