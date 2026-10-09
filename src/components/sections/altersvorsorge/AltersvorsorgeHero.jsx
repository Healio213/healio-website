import React from 'react';
import { ArrowRight } from 'lucide-react';
import AltersvorsorgeAngebotsKarte from '@/components/sections/altersvorsorge/AltersvorsorgeAngebotsKarte';
import { getHeroKacheln, hero } from '@/content/altersvorsorgedepotContent';

/** Unternehmensmotiv, vorhandene geprüfte Texte und die vollständige Zulagenkarte. */
const AltersvorsorgeHero = ({ variante, onRechner, onCheck }) => (
  <section data-altersvorsorge-hero aria-labelledby="altersvorsorge-hero-title" className="w-full bg-[#f4faf7]">
    <div className="relative isolate w-full overflow-hidden bg-[#06131c] text-white">
      <img
        src="/images/healio-hero-markenrelief-v1.webp"
        alt=""
        aria-hidden="true"
        width="1586"
        height="992"
        loading="eager"
        {...{ fetchpriority: 'high' }}
        decoding="async"
        draggable="false"
        className="pointer-events-none absolute right-[-7rem] top-12 -z-30 h-auto w-[38rem] max-w-none select-none opacity-80 md:inset-0 md:h-full md:w-full md:object-cover md:object-[64%_center] md:opacity-100"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(6,19,28,0.92)_0%,rgba(6,19,28,0.65)_100%)] md:bg-[linear-gradient(90deg,rgba(3,12,21,0.97)_0%,rgba(3,12,21,0.91)_34%,rgba(3,12,21,0.70)_50%,rgba(3,12,21,0.08)_76%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(6,19,28,0.45)_30%,#06131c_70%)] md:bg-[linear-gradient(180deg,rgba(6,19,28,0.15)_0%,transparent_60%,#06131c_100%)]" />

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 md:flex md:min-h-[720px] md:items-center md:px-8 md:pb-20 md:pt-32 lg:min-h-[760px]">
        <div className="w-full min-w-0 max-w-[660px] text-left">
          <p className="max-w-[36rem] text-base font-bold leading-6 text-[#8ee7ca]">{variante.eyebrow}</p>
          <h1 id="altersvorsorge-hero-title" className="mt-4 font-display text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-white [text-wrap:balance] sm:text-[2.75rem] md:mt-5 lg:text-[clamp(2.75rem,3.7vw,3.25rem)]">
            {variante.h1}
          </h1>
          <p className="mt-5 max-w-[36rem] text-base leading-7 text-[#d5e2e7] sm:text-lg sm:leading-8">
            {variante.unterzeile}
          </p>
          {variante.fussnote && (
            <p className="mt-3 max-w-[36rem] text-base leading-6 text-[#bdced6]">{variante.fussnote}</p>
          )}

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:items-start">
            <button
              type="button"
              onClick={onRechner}
              className="inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-full bg-[#25c990] px-5 py-4 text-center font-display text-base font-extrabold leading-6 text-[#07141d] shadow-[0_12px_36px_rgba(37,201,144,0.18)] transition-colors hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#06131c] sm:px-6"
            >
              {hero.knopfRechner}
              <ArrowRight className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true" />
            </button>
            <a
              href="#zuschuss-check"
              onClick={(event) => { event.preventDefault(); onCheck(); }}
              className="inline-flex min-h-11 max-w-full items-center justify-center px-1 text-center text-base font-semibold leading-6 text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-[#8ee7ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] sm:justify-start sm:text-left"
            >
              {hero.linkCheck}
            </a>
          </div>
          <p className="mt-6 max-w-[36rem] border-t border-white/15 pt-5 text-base font-medium leading-7 text-[#c4d3da] sm:mt-8">
            {hero.vertrauenszeile}
          </p>
        </div>
      </div>
    </div>

    <div className="mx-auto w-full max-w-[1280px] px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 md:px-8">
      <AltersvorsorgeAngebotsKarte
        titel={hero.angebotskarte.titel}
        kacheln={getHeroKacheln(variante)}
        hinweis={hero.angebotskarte.hinweis}
      />
    </div>
  </section>
);

export default AltersvorsorgeHero;
