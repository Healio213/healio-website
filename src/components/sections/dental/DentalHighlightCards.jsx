import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { getDentalContent } from '@/components/sections/dental/dentalContent';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';

// Experiment 05.10.2026 nach dem Vorbild der Highlight-Karten auf
// mercedes-benz.de: wischbare Karten mit großem Bildteil und dunklem
// Textband, ein Tipp öffnet alle Details. Die Texte kommen bewusst 1:1 aus
// den geprüften Ergebnissen des Zahn-Checks (dentalContent.js), hier steht
// nur, welche Karte welche Kennzahl und welches Bild zeigt.
const CARDS = [
  {
    key: 'sofort',
    tone: 'coral',
    icon: 'verified-calendar',
    label: { de: 'Behandlung schon angeraten', en: 'Treatment already advised' },
    figure: { de: '1.500 EUR', en: 'EUR 1,500' },
    figureNote: { de: 'Zuschuss insgesamt möglich', en: 'total contribution possible' },
  },
  {
    key: 'ukvLeistung',
    tone: 'mint',
    icon: 'dental-shield',
    label: { de: 'Maximaler Zahnschutz', en: 'Maximum dental cover' },
    figure: { de: '100 %', en: '100%' },
    figureNote: { de: 'der erstattungsfähigen Kosten nach Kassenleistung', en: 'of eligible costs after statutory cover' },
  },
  {
    key: 'ukvLuecke',
    tone: 'butter',
    icon: 'document-check',
    label: { de: 'Zähne fehlen schon', en: 'Teeth already missing' },
    figure: { de: '1 bis 3', en: '1 to 3' },
    figureNote: { de: 'fehlende Zähne mit Zuschlag versicherbar', en: 'missing teeth insurable with a surcharge' },
  },
  {
    key: 'ukvFamilie',
    tone: 'sky',
    icon: 'family',
    label: { de: 'Familie und Kinder', en: 'Family and children' },
  },
  {
    key: 'ukvPreis',
    tone: 'lavender',
    icon: 'calculator',
    label: { de: 'Günstiger Einstieg', en: 'Affordable start' },
    figure: { de: '75 %', en: '75%' },
    figureNote: { de: 'der erstattungsfähigen Kosten nach Kassenleistung', en: 'of eligible costs after statutory cover' },
  },
  {
    key: 'bonus',
    tone: 'mintDeep',
    icon: 'bonus-medal',
    label: { de: 'Beitrag finanzieren', en: 'Fund your premium' },
  },
];

const TONES = {
  coral: { panel: 'bg-[#fff1ed]', ink: 'text-[#934638]', glow: 'bg-[#ffb59f]/45', soft: 'bg-[#fff1ed]' },
  mint: { panel: 'bg-[#e7f8f0]', ink: 'text-[#075f46]', glow: 'bg-[#5ee0b1]/40', soft: 'bg-[#effbf6]' },
  butter: { panel: 'bg-[#fff6d6]', ink: 'text-[#70520b]', glow: 'bg-[#f5cf5f]/40', soft: 'bg-[#fff8df]' },
  sky: { panel: 'bg-[#e8f4fd]', ink: 'text-[#245f83]', glow: 'bg-[#8cc3ec]/45', soft: 'bg-[#eef8ff]' },
  lavender: { panel: 'bg-[#f1effb]', ink: 'text-[#4b4485]', glow: 'bg-[#b7aee8]/45', soft: 'bg-[#f4f2fc]' },
  mintDeep: { panel: 'bg-[#0d2a2a]', ink: 'text-[#5ee0b1]', glow: 'bg-[#25c990]/30', soft: 'bg-[#effbf6]' },
};

const COPY = {
  de: {
    label: 'Auf einen Blick',
    title: 'Dein Zahnschutz, Karte für Karte.',
    text: 'Jede Karte zeigt eine typische Situation und den Weg, der dazu passt. Tippe auf eine Karte, dann siehst du alle Details.',
    more: 'Details ansehen',
    prev: 'Vorherige Karte',
    next: 'Nächste Karte',
    goTo: 'Zu Karte {{n}} springen',
    carousel: 'Zahn-Situationen als Karten',
    close: 'Details schließen',
    personal: 'Lieber persönlich klären',
    bonusCta: 'Zum Kassenbonus',
  },
  en: {
    label: 'At a glance',
    title: 'Your dental cover, card by card.',
    text: 'Each card shows a typical situation and the route that fits it. Tap a card to see all details.',
    more: 'See details',
    prev: 'Previous card',
    next: 'Next card',
    goTo: 'Go to card {{n}}',
    carousel: 'Dental situations as cards',
    close: 'Close details',
    personal: 'Talk it through in person',
    bonusCta: 'Go to health insurer bonus',
  },
};

const GAP_PX = 12;

const scrollToId = (id, reduceMotion) => {
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
};

const buildCardContent = (card, content, language) => {
  if (card.key === 'bonus') {
    return {
      insurer: content.bonus.eyebrow,
      title: content.bonus.title,
      text: content.bonus.text,
      reasons: [content.bonus.detail],
      warning: null,
    };
  }
  const result = content.check.results[card.key];
  return {
    insurer: result.insurer,
    title: result.title,
    text: result.text,
    reasons: result.reasons,
    warning: result.warning,
  };
};

const DentalHighlightCards = () => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];
  const content = useMemo(() => getDentalContent(language), [language]);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openKey, setOpenKey] = useState(null);
  const pendingTargetRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const cards = useMemo(
    () => CARDS.map((card) => ({ ...card, body: buildCardContent(card, content, language) })),
    [content, language],
  );
  const openCard = cards.find((card) => card.key === openKey) || null;

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    const first = track?.querySelector('[data-highlight-card]');
    if (!track || !first) return;
    const step = first.offsetWidth + GAP_PX;
    const nextIndex = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(cards.length - 1, nextIndex)));
  }, [cards.length]);

  // Tastaturfokus auf eine halb verdeckte Karte: nur die Reihe weiterschieben,
  // damit die fokussierte Karte ganz zu sehen ist (wie in MobileSwipeRow).
  const revealFocusedCard = useCallback((event) => {
    const track = trackRef.current;
    const item = event.target.closest?.('[data-highlight-card]');
    if (!track || !item || track.scrollWidth <= track.clientWidth + 1) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft || '0');
    const visibleLeft = track.scrollLeft + padding;
    const visibleRight = track.scrollLeft + track.clientWidth;
    if (item.offsetLeft >= visibleLeft && item.offsetLeft + item.offsetWidth <= visibleRight) return;
    track.scrollTo({ left: item.offsetLeft - padding, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    track.addEventListener('scroll', updateActiveIndex, { passive: true });
    track.addEventListener('focusin', revealFocusedCard);
    return () => {
      track.removeEventListener('scroll', updateActiveIndex);
      track.removeEventListener('focusin', revealFocusedCard);
    };
  }, [updateActiveIndex, revealFocusedCard]);

  const scrollToCard = (index) => {
    const track = trackRef.current;
    const target = track?.querySelectorAll('[data-highlight-card]')[index];
    if (!track || !target) return;
    track.scrollTo({ left: target.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handleOpenChange = (nextOpen) => {
    if (nextOpen) return;
    setOpenKey(null);
  };

  // Sprungziel erst nach dem Schließen ansteuern, sonst setzt Radix den
  // Fokus zurück auf die Karte und die Seite springt wieder hoch.
  const closeAndGo = (targetId) => {
    pendingTargetRef.current = targetId;
    setOpenKey(null);
  };

  // Mehrere Karten teilen sich einen Dialog; den Fokus geben wir deshalb
  // selbst an die angetippte Karte zurück, ohne dass das Karussell springt.
  const handleCloseAutoFocus = (event) => {
    event.preventDefault();
    const targetId = pendingTargetRef.current;
    pendingTargetRef.current = null;
    if (targetId) {
      window.requestAnimationFrame(() => scrollToId(targetId, reduceMotion));
      return;
    }
    lastTriggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24" aria-labelledby="zahn-highlights-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-display text-base font-bold text-[#0b7a5a]">{copy.label}</p>
            <h2 id="zahn-highlights-heading" className="mt-3 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#07111f] [text-wrap:balance] sm:text-4xl lg:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{copy.text}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label={copy.prev}
              className="home-focus inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-[#07111f] transition hover:border-[#07111f] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
              disabled={activeIndex === cards.length - 1}
              aria-label={copy.next}
              className="home-focus inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-[#07111f] transition hover:border-[#07111f] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Dialog.Root open={Boolean(openCard)} onOpenChange={handleOpenChange}>
        <ul
          ref={trackRef}
          aria-label={copy.carousel}
          className="relative mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-4 px-4 pb-3 [scrollbar-width:none] sm:scroll-pl-6 sm:px-6 lg:scroll-pl-8 lg:px-8 xl:scroll-pl-[calc((100vw_-_80rem)/2_+_2rem)] xl:px-[calc((100vw_-_80rem)/2_+_2rem)] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card, index) => {
            const tone = TONES[card.tone];
            const isDark = card.tone === 'mintDeep';
            return (
              <li key={card.key} data-highlight-card className="relative w-[84vw] max-w-[23.5rem] shrink-0 snap-start sm:w-[22.5rem]">
                <button
                    type="button"
                    onClick={(event) => {
                      lastTriggerRef.current = event.currentTarget;
                      setOpenKey(card.key);
                      trackEvent('zahn_karte_geoeffnet', { karte: card.key });
                    }}
                    aria-label={`${card.label[language]}: ${card.body.title}. ${copy.more} (${index + 1}/${cards.length})`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] bg-home-midnight text-left shadow-[0_18px_44px_rgba(7,17,31,0.12)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4"
                  >
                    <span className={`relative block h-[15.5rem] overflow-hidden ${tone.panel}`}>
                      <span className={`absolute -bottom-10 -right-8 block h-56 w-56 rounded-full blur-2xl ${tone.glow}`} aria-hidden="true" />
                      <span className="relative block p-6">
                        <span className={`block text-base font-semibold ${isDark ? 'text-slate-200' : 'text-[#07111f]/75'}`}>
                          {card.label[language]}
                        </span>
                        {card.figure ? (
                          <>
                            <span className={`mt-2 block font-display text-[3.4rem] font-extrabold leading-none tracking-[-0.05em] ${tone.ink}`}>
                              {card.figure[language]}
                            </span>
                            <span className={`mt-2 block max-w-[11rem] text-sm leading-5 ${isDark ? 'text-slate-300' : 'text-[#07111f]/70'}`}>
                              {card.figureNote[language]}
                            </span>
                          </>
                        ) : null}
                      </span>
                      <img
                        src={`/images/friendly-icons/${card.icon}.webp`}
                        alt=""
                        width="320"
                        height="320"
                        loading="lazy"
                        decoding="async"
                        className={`absolute bottom-2 right-2 object-contain drop-shadow-[0_16px_18px_rgba(7,17,31,0.18)] transition duration-300 group-hover:scale-[1.04] motion-reduce:transition-none ${card.figure ? 'h-32 w-32' : 'h-44 w-44'}`}
                      />
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="block font-display text-xl font-extrabold leading-snug text-white [text-wrap:balance]">
                        {card.body.title}
                      </span>
                      <span className="mt-2 line-clamp-2 text-base leading-6 text-slate-300">{card.body.text}</span>
                      <span className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <span className="text-sm font-semibold text-home-mint-active">{card.body.insurer}</span>
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-home-mint group-hover:text-home-midnight" aria-hidden="true">
                          <Plus className="h-5 w-5" />
                        </span>
                      </span>
                    </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-5 flex w-full max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
          {cards.map((card, index) => (
            <button
              key={card.key}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={copy.goTo.replace('{{n}}', String(index + 1))}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="home-focus flex h-6 items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${index === activeIndex ? 'w-8 bg-[#07111f]' : 'w-3 bg-slate-300'}`} />
            </button>
          ))}
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[120] bg-[#07111f]/55 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          {openCard ? (
            <Dialog.Content
              onCloseAutoFocus={handleCloseAutoFocus}
              className="fixed inset-x-0 bottom-0 z-[121] max-h-[88vh] overflow-y-auto rounded-t-[1.75rem] bg-white pb-[env(safe-area-inset-bottom)] text-[#07111f] shadow-[0_-20px_60px_rgba(7,17,31,0.25)] focus:outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom motion-reduce:animate-none md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-[min(40rem,92vw)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[1.75rem] md:pb-0 md:data-[state=closed]:slide-out-to-bottom-4 md:data-[state=open]:slide-in-from-bottom-4"
            >
              <div className={`relative overflow-hidden px-6 pb-6 pt-4 ${TONES[openCard.tone].panel}`}>
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#07111f]/15 md:hidden" aria-hidden="true" />
                <Dialog.Close
                  aria-label={copy.close}
                  className="home-focus absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#07111f] shadow-sm transition hover:bg-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Dialog.Close>
                <div className="flex items-center gap-4 pr-12">
                  <img
                    src={`/images/friendly-icons/${openCard.icon}.webp`}
                    alt=""
                    width="320"
                    height="320"
                    className="h-20 w-20 shrink-0 object-contain drop-shadow-[0_12px_14px_rgba(7,17,31,0.16)]"
                  />
                  <div className="min-w-0">
                    <p className={`text-base font-semibold ${openCard.tone === 'mintDeep' ? 'text-slate-200' : 'text-[#07111f]/75'}`}>{openCard.label[language]}</p>
                    <p className={`mt-1 text-sm font-bold ${TONES[openCard.tone].ink}`}>{openCard.body.insurer}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-7 pt-6 md:px-8 md:pb-8">
                <Dialog.Title className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] [text-wrap:balance] sm:text-3xl">
                  {openCard.body.title}
                </Dialog.Title>
                <Dialog.Description className="mt-3 text-base leading-7 text-slate-700">
                  {openCard.body.text}
                </Dialog.Description>

                <ul className="mt-5 space-y-3">
                  {openCard.body.reasons.map((reason) => (
                    <li key={reason} className="flex gap-3 text-base leading-6 text-slate-800">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7f8f0] text-[#0b7a5a]" aria-hidden="true">
                        <Check className="h-4 w-4" />
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                {openCard.body.warning ? (
                  <div className={`mt-6 flex gap-3 rounded-2xl p-4 ${TONES[openCard.tone].soft}`}>
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#07111f]/70" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-800">
                      <span className="font-bold">{content.check.warningLabel}</span>{' '}
                      {openCard.body.warning}
                    </p>
                  </div>
                ) : null}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => closeAndGo(openCard.key === 'bonus' ? 'kassenbonus' : 'zahn-check')}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_14px_34px_rgba(37,201,144,0.25)] transition hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4"
                  >
                    {openCard.key === 'bonus' ? copy.bonusCta : content.hero.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => closeAndGo('zahn-kontakt')}
                    className="home-focus inline-flex min-h-12 items-center justify-center rounded-full px-5 text-base font-bold text-[#07111f] underline decoration-[#25c990] decoration-2 underline-offset-4 transition hover:text-[#0b7a5a]"
                  >
                    {copy.personal}
                  </button>
                </div>

                <p className="mt-6 text-sm leading-6 text-slate-500">{content.paths.footer}</p>
              </div>
            </Dialog.Content>
          ) : null}
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default DentalHighlightCards;
