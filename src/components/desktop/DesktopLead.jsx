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

const benefitColumns = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };

// Das Angebot als ruhige Zeile statt als Kasten: dieselben Inhalte wie vorher.
const OfferLine = ({ copy, surface }) => (
  <div className="border-t border-white/25 pt-4">
    <p className="font-display text-lg font-bold leading-7 text-white">
      {copy.panelTitle} <span className="font-sans text-base font-normal text-[#c9d8de]">{copy.panelText}</span>
    </p>
    {copy.calculation ? (
      <ol className="mt-3 grid grid-cols-3 gap-8">
        {copy.calculation.map((row) => (
          <li key={row.label} className="grid grid-cols-[1.25rem_1fr] gap-2">
            <span className="font-display text-2xl font-bold leading-6 text-[#5ee0b1]" aria-hidden="true">{row.sign}</span>
            <div>
              <h3 className="font-display text-base font-bold leading-6">{row.label}</h3>
              <p className="mt-1 text-sm leading-6 text-[#c9d8de]">{row.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    ) : (
      <dl className={`mt-3 grid gap-x-8 gap-y-4 ${benefitColumns[copy.benefits.length] || 'grid-cols-3'}`}>
        {copy.benefits.map((benefit) => (
          <div key={benefit.label} className="min-w-0">
            <dt className="text-base font-semibold leading-6 text-white">{benefit.label}</dt>
            <dd className="mt-0.5 font-display text-lg font-extrabold leading-7 text-[#5ee0b1]">{benefit.value}</dd>
            {benefit.detail && <p className={`mt-1 text-sm leading-6 text-[#c9d8de] ${surface === 'zahn' ? 'max-w-[52ch]' : ''}`}>{benefit.detail}</p>}
          </div>
        ))}
      </dl>
    )}
    <p className="mt-3 max-w-[96ch] text-sm leading-6 text-[#bfced6]">{copy.panelNote}</p>
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

  return (
    <section
      data-desktop-lead={surface}
      className="relative isolate hidden w-full overflow-hidden bg-[#071726] text-white lg:block"
      aria-labelledby={headingId}
    >
      {split ? (
        <div className="absolute inset-y-0 right-0 -z-10 w-[47%]" aria-hidden="true">
          <img src={image.src} alt="" fetchPriority="high" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: image.position }} />
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#071726] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#071726]/80 to-transparent" />
        </div>
      ) : (
        <>
          <img src={image.src} alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: image.position }} />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071726_0%,rgba(7,23,38,0.93)_32%,rgba(7,23,38,0.66)_55%,rgba(7,23,38,0.18)_76%,rgba(7,23,38,0)_100%)]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#071726]/75 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-[46%] bg-gradient-to-t from-[#071726] via-[#071726]/85 to-transparent" aria-hidden="true" />
        </>
      )}

      <div className="mx-auto flex min-h-[min(100svh,58rem)] w-full max-w-7xl flex-col px-8 pb-6 pt-28 xl:pt-32">
        <div className={split ? 'max-w-[38rem]' : 'max-w-[46rem]'}>
          <Heading id={headingId} className="font-display text-[clamp(2.3rem,3.2vw,3.25rem)] font-extrabold leading-[1.07] tracking-[-0.03em] [text-wrap:balance] [text-shadow:0_2px_24px_rgba(7,23,38,0.35)]">
            <span className="block">{copy.titleLead}</span>
            <span className="mt-1 block text-[#5ee0b1]">{copy.titleAccent}</span>
          </Heading>
          <p className="mt-4 max-w-[60ch] text-lg leading-7 text-[#e1ebef]">{copy.description}</p>
          <p className="mt-2 max-w-[64ch] text-sm leading-6 text-[#bfced6]">{copy.condition}</p>
          <a
            data-desktop-primary
            href={action}
            {...(isHome ? { target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': `desktop-${surface}-external` } : {})}
            onClick={handleAction}
            className="mt-5 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25c990] px-7 py-4 font-display text-base font-extrabold text-[#071726] transition-colors hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {copy.cta}
            {isHome ? <ArrowUpRight className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </a>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#c9d8de]">{copy.hint}</p>
          {isHome && <span id={`desktop-${surface}-external`} className="sr-only">{copy.externalHint}</span>}
        </div>

        <div className={`mt-auto pt-8 ${split ? 'max-w-[44rem]' : ''}`}>
          <OfferLine copy={copy} surface={surface} />
        </div>

        <ul className={`mt-3 flex flex-wrap items-center gap-x-8 gap-y-1 text-sm text-[#d4e1e5] ${split ? 'max-w-[44rem]' : ''}`}>
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
