import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import MobileDetails from '@/components/ui/MobileDetails';

// Gleiche Figuren und Farbtöne wie auf der Startseite, damit jeder Bereich überall gleich aussieht.
const pathVisuals = {
  ambulant: { kind: 'ambulant', tone: 'mint' },
  dental: { kind: 'dental', tone: 'butter' },
  hospital: { kind: 'hospital', tone: 'sky' },
  pet: { kind: 'pet', tone: 'lavender' },
};

// Kopfband der Karte nur mobil: Farbe je Bereich, damit sofort klar ist, worum es geht.
const headerTones = {
  ambulant: { band: 'bg-[#E4F6EE] border-[#CBEBDC]', label: 'text-[#0B6B4B]' },
  dental: { band: 'bg-[#FFF3D6] border-[#F5E2AE]', label: 'text-[#7A5600]' },
  hospital: { band: 'bg-healio-light border-home-mint/20', label: 'text-home-midnight' },
  pet: { band: 'bg-[#EFEAFB] border-[#DDD5F3]', label: 'text-[#5B3FA8]' },
};

// Das letzte Wort bleibt mit dem Pfeil zusammen, damit der Pfeil nie allein in einer Zeile steht.
const LinkLabel = ({ text }) => {
  const words = String(text).split(' ');
  const lastWord = words.pop();

  return (
    <>
      {words.length > 0 && `${words.join(' ')} `}
      <span className="whitespace-nowrap">
        {lastWord}
        <ArrowUpRight className="ml-2 inline-block h-4 w-4 align-[-0.2em] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </>
  );
};

// Die Einblend-Animation der Karten gilt nur ab md. In der Wischreihe darf keine Karte
// unsichtbar warten, bis sie ganz im Bild ist (die Nachbarkarte ragt nur teilweise herein).
const useIsDesktop = () => {
  const query = '(min-width: 768px)';
  const [isDesktop, setIsDesktop] = useState(() => (typeof window === 'undefined' || !window.matchMedia ? true : window.matchMedia(query).matches));

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia(query);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isDesktop;
};

// Das Highlight bleibt ab md in der Zahn-Karte. Mobil zeigen die vier
// Bereichskarten die Orientierung; Details stehen auf der jeweiligen Zielseite.
const HighlightBox = ({ highlight, className = '' }) => (
  <aside className={`overflow-hidden bg-[#10202A] p-5 text-white shadow-[0_2px_10px_rgba(16,32,42,0.16)] sm:p-6 md:shadow-[0_18px_50px_rgba(16,32,42,0.14)] ${className}`} aria-label={highlight.label}>
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25C990] text-[#07111F]">
        <Zap className="h-4 w-4" fill="currentColor" aria-hidden="true" />
      </span>
      <p className="min-w-0 font-display text-sm font-extrabold uppercase tracking-[0.17em] text-[#8EE7CA] md:text-xs">{highlight.label}</p>
    </div>
    <h4 className="mt-4 break-words font-display text-xl font-extrabold leading-tight tracking-[-0.025em] text-white [text-wrap:balance] sm:text-2xl">
      {highlight.title}
    </h4>
    <p className="mt-3 text-base leading-7 text-slate-300 sm:text-[1.0625rem]">{highlight.description}</p>
    <ul className="mt-5 flex flex-wrap gap-2">
      {highlight.facts.map((fact) => (
        <li key={fact} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-sm font-bold leading-5 text-slate-200">
          {fact}
        </li>
      ))}
    </ul>
    <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-slate-400">{highlight.note}</p>
  </aside>
);

const ProtectionNavigator = () => {
  const { t } = useTranslation('leistungen');
  const { getPath, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const items = t('paths.items', { returnObjects: true });
  const checks = t('comparison.items', { returnObjects: true });
  const checkLabel = t('comparison.headers.check');
  const cards = items.map((item, index) => {
    const visual = pathVisuals[item.key] || pathVisuals.ambulant;
    const header = headerTones[item.key] || headerTones.ambulant;
    const check = Array.isArray(checks) ? checks.find((entry) => entry.key === item.key) : null;
    return (
      <motion.article
        id={item.anchor}
        key={item.key}
        initial={prefersReducedMotion || !isDesktop ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, delay: index * 0.06 }}
        className="group flex h-full w-full scroll-mt-24 flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-0 shadow-[0_2px_10px_rgba(7,17,31,0.08)] md:block md:overflow-visible md:p-9 md:shadow-[0_24px_60px_rgba(7,17,31,0.10)] lg:p-11"
      >
        {check && (
          <div className={`flex items-center gap-3 border-b px-5 py-4 md:hidden ${header.band}`}>
            <FriendlyIcon kind={visual.kind} tone={visual.tone} size="md" />
            <p className={`font-display text-sm font-extrabold uppercase tracking-[0.16em] ${header.label}`}>{check.label}</p>
          </div>
        )}
        <div className="flex flex-1 flex-col gap-4 p-5 md:grid md:p-0 md:gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div className="min-w-0">
            <FriendlyIcon kind={visual.kind} tone={visual.tone} size="xl" className="max-md:hidden" />
            <h3 className="max-w-[18ch] font-display text-2xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#10202A] [text-wrap:balance] sm:text-4xl md:mt-6">
              <span className="md:hidden">{t(`mobile.paths.${item.key}.title`)}</span>
              <span className="hidden md:inline">{item.title}</span>
            </h3>
          </div>
          <div className="flex min-w-0 flex-1 flex-col md:block lg:self-end">
            <p className="mb-4 max-w-2xl text-[1.0625rem] leading-7 text-slate-600 sm:text-lg sm:leading-8 md:mb-0"><span className="md:hidden">{t(`mobile.paths.${item.key}.text`)}</span><span className="hidden md:inline">{item.description}</span></p>
            {check && (
              <div className="mb-3 md:hidden">
                <MobileDetails summary={checkLabel} className="text-slate-600">
                  <p className="text-base leading-7 text-[#10202A]">{check.check}</p>
                </MobileDetails>
              </div>
            )}
            {item.highlight && <HighlightBox highlight={item.highlight} className="mt-7 hidden rounded-2xl md:block" />}
            <Link
              to={getPath(item.routeKey)}
              className="home-focus mt-4 inline-block min-h-[48px] rounded-full bg-[#10202A] px-5 py-3 text-center font-display text-base font-extrabold leading-6 text-white transition hover:bg-[#18333C] max-md:w-full md:mt-6 md:min-h-0 md:self-start md:rounded-none md:bg-transparent md:p-0 md:text-left md:leading-7 md:text-emerald-700 md:hover:bg-transparent md:hover:text-emerald-900"
            >
              <LinkLabel text={item.cta} />
            </Link>
          </div>
        </div>
      </motion.article>
    );

  });

  return (
    <section id="schutz-kompass" className="scroll-mt-20 bg-[#F5F8F6] px-4 py-12 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="protection-navigator-title">
      <div className="healio-container max-md:px-0">
        <div>
          <p className="hidden font-display text-sm font-extrabold uppercase tracking-[0.22em] text-emerald-700 md:block md:text-xs">{t('paths.eyebrow')}</p>
          <h2 id="protection-navigator-title" className="max-w-[20ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[#10202A] md:mt-4 md:max-w-[14ch] md:text-5xl md:tracking-[-0.045em]">
            <span className="md:hidden">{t('mobile.pathsTitle')}</span>
            <span className="hidden md:inline">{t('paths.title')}</span>
          </h2>
          {/* Streckencheck 22.10.2026: Schwangerschaft hat keine eigene Karte. Am Handy
              führt eine Zeile unter der Überschrift direkt hin (nur auf Deutsch, wie im Menü). */}
          {lang === 'de' && (
            <Link
              to="/schwangerschaft"
              className="home-focus mt-3 inline-block font-display text-base font-extrabold leading-6 text-emerald-700 underline underline-offset-4 hover:text-emerald-900 md:hidden"
            >
              {t('mobile.pregnancyLink')} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {/* Mobil Wischreihe (vier Schutzwege), ab md die bisherigen Karten untereinander. */}
        <MobileSwipeRow
          label={t('paths.title')}
          className="mt-8 md:mt-12 lg:mt-14"
          desktopClassName="md:grid md:gap-6 lg:gap-7"
          itemClassName="flex"
        >
          {cards}
        </MobileSwipeRow>
      </div>
    </section>
  );
};

export default ProtectionNavigator;
