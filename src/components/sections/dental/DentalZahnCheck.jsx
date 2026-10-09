import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Lock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';
import { BAYERISCHE_URL, UKV_URL } from './dentalLinks';
import { trackGoogleAdsAntrag } from '@/lib/google-ads';
import { getDentalContent } from './dentalContent';
import { ZAHN_CHECK_CARD_ID } from './zahnCheckScroll';

const QUESTION_ORDER = ['q1', 'q2', 'q3', 'q4'];

const needsQ4 = (answers) =>
  answers.q1 === 'nein' && answers.q2 === 'keine' && answers.q3 === 'nein';

// Franks Entscheidung vom 05.10.2026: Beim Zahn gibt es nur noch zwei Wege.
// Die Bayerische (Zahntarif plus Baustein ZAHN Sofort) nur, wenn eine
// Behandlung angeraten oder begonnen ist und weder Zähne fehlen noch eine
// Vorgeschichte besteht. Alle anderen Situationen führen zur UKV ZahnPRIVAT,
// auch 1 bis 3 fehlende Zähne (Aufnahme mit Risikozuschlag je Zahn).
const computeResult = (answers) => {
  if (answers.q2 === 'viele') return 'sonderViele';

  if (answers.q1 === 'ja') {
    if (answers.q2 === 'wenige' || answers.q3 === 'ja') return 'sonderKomplex';
    return 'sofort';
  }

  if (answers.q2 === 'wenige') return 'ukvLuecke';
  if (answers.q3 === 'ja') return 'ukvVorgeschichte';

  switch (answers.q4) {
    case 'familie':
      return 'ukvFamilie';
    case 'pzr':
      return 'ukvPzr';
    case 'preis':
      return 'ukvPreis';
    default:
      return 'ukvLeistung';
  }
};

const CTA_HREFS = {
  bayerische: BAYERISCHE_URL,
  ukv: UKV_URL,
};

// Einziger Messpunkt im Zahn-Check: der Klick auf einen Antragslink zählt bei
// Google Ads als „Antrag geöffnet“. Ohne Argument, ohne Versicherer, ohne
// Antworten. Was jemand im Check angegeben hat, verlässt das Gerät nie.
const countAntragOpened = () => {
  trackGoogleAdsAntrag();
};

const toneClasses = {
  mint: 'border-[#a6e9d2] bg-[#effbf6] text-[#0b6f52]',
  sky: 'border-home-mint/20 bg-home-ice text-home-midnight',
  butter: 'border-[#efd99b] bg-[#fff8df] text-[#7b5b0a]',
  coral: 'border-[#ffc7bc] bg-[#fff1ed] text-[#a84837]',
  neutral: 'border-slate-200 bg-slate-50 text-slate-600',
};

const fillTemplate = (template, values) =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{{${key}}}`, value),
    template,
  );

const DentalZahnCheck = () => {
  const { lang, getPath } = useLanguage();
  const content = useMemo(() => getDentalContent(lang).check, [lang]);
  const reduceMotion = useReducedMotion();

  // Privacy invariant: Antworten bleiben ausschließlich im lokalen React-State.
  // Der Check speichert und versendet weder Antworten noch Ergebnisdaten.
  const [answers, setAnswers] = useState({});
  const [path, setPath] = useState([]);

  // Mobil: Beim Wechsel von Frage zu Frage oder ins Ergebnis ändert sich die
  // Höhe der Karte. Chrome hält die Scrollposition dann an einem Element unterhalb
  // der Karte fest und schiebt die Seite mitten ins Ergebnis. Darauf bauen wir
  // nicht: Beim Einhängen der neuen Ansicht (noch vor dem ersten Bild) stellen wir
  // den Kartenanfang dorthin zurück, wo er beim Tippen war. Lag er oberhalb der
  // Kopfleiste (68 px), gleiten wir anschließend zum Kartenanfang (scroll-mt-20).
  const cardRef = useRef(null);
  const swapStart = useRef(null);

  const markSwap = () => {
    swapStart.current = { top: cardRef.current ? cardRef.current.getBoundingClientRect().top : 0 };
  };

  // Wird beim Einhängen jeder neuen Frage und jedes Ergebnisses aufgerufen
  // (AnimatePresence wartet mit dem Einhängen, bis die alte Ansicht draußen ist).
  const onPanelMount = useCallback((el) => {
    const start = swapStart.current;
    const card = cardRef.current;
    if (!el || !start || !card) return;
    swapStart.current = null;
    if (window.matchMedia('(min-width: 768px)').matches) return;
    // Der Abstand des Kartenanfangs zum Seitenanfang bleibt vom Nachziehen unberührt.
    const target = card.getBoundingClientRect().top + window.scrollY - start.top;
    if (Math.abs(target - window.scrollY) > 0.5) window.scrollTo({ top: target, behavior: 'instant' });
    if (start.top < 68) card.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  const currentQuestionId = QUESTION_ORDER.find((id) => {
    if (id === 'q4' && !needsQ4(answers)) return false;
    return !(id in answers);
  });

  const isDone =
    path.length > 0 &&
    (currentQuestionId === undefined ||
      answers.q2 === 'viele' ||
      (answers.q1 === 'nein' && answers.q2 === 'wenige') ||
      (answers.q1 === 'ja' && answers.q2 === 'wenige'));

  const resultKey = isDone ? computeResult(answers) : null;
  const result = resultKey ? content.results[resultKey] : null;
  const question = currentQuestionId ? content.questions[currentQuestionId] : null;
  const options = question ? Object.entries(question.options || {}) : [];

  const answer = (questionId, value) => {
    markSwap();
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setPath((current) => [...current, questionId]);
  };

  const goBack = () => {
    if (path.length === 0) return;
    markSwap();
    const last = path[path.length - 1];
    setAnswers((current) => {
      const next = { ...current };
      delete next[last];
      if (last !== 'q4') delete next.q4;
      return next;
    });
    setPath((current) => current.slice(0, -1));
  };

  const restart = () => {
    markSwap();
    setAnswers({});
    setPath([]);
  };

  const scrollToBonus = (event) => {
    event.preventDefault();
    document.getElementById('kassenbonus')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const progress = Math.min(path.length + (result ? 0 : 1), 4);

  return (
    <section
      id="zahn-check"
      className="relative isolate scroll-mt-6 overflow-hidden bg-[#07111f] px-4 py-12 text-white sm:px-6 md:scroll-mt-0 md:py-24 lg:px-8 lg:py-28"
      aria-labelledby="zahn-check-heading"
    >
      <div className="absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#25c990]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#ffd67b]/10 blur-3xl" aria-hidden="true" />

      {/* healio-container bringt 16 px Innenabstand mit, der mobil zum Abschnittsabstand dazukommt (32 px Rand). Mobil weg, ab md wie bisher. */}
      <div className="healio-container !px-0 md:!px-4 grid items-start gap-6 md:gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(540px,1.28fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[#5ee0b1] md:text-xs md:tracking-[0.22em]">
            {content.eyebrow}
          </p>
          <h2
            id="zahn-check-heading"
            className="mt-3 max-w-[12ch] text-3xl font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-5xl md:mt-5 lg:text-[3.9rem]"
          >
            <span className="block font-display">{content.titleLead}</span>
            <span className="mt-1 block font-friendly text-[#5ee0b1]">{content.titleAccent}</span>
          </h2>
          <p className="mt-3 max-w-lg text-base leading-6 text-slate-300 sm:text-lg sm:leading-7 md:mt-6">
            {content.subtitle}
          </p>

          {/* Experiment Handy-Conversion 10/2026: Stempel und Fortschrittspunkte nur ab md.
              Am Handy stehen "1 Minute. Keine Kontaktdaten." und "Frage 1 von höchstens 4"
              schon darüber und in der Karte, so rückt die erste Antwort nach dem Sprung ins erste Bild. */}
          <div className="mt-5 hidden max-w-full items-center gap-3 rounded-[1.65rem] border border-[#efd99b]/70 bg-[#fff8df] p-2 pr-5 text-[#07111f] shadow-[0_18px_46px_rgba(0,0,0,0.22)] sm:gap-4 sm:pr-6 md:mt-8 md:inline-flex">
            <FriendlyIcon kind="choice" tone="butter" size="sm" className="-rotate-3 md:h-20 md:w-20 md:rounded-[1.55rem] md:text-[2.75rem]" />
            <div className="min-w-0 md:py-1">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-[#77570c] md:text-xs md:tracking-[0.18em]">
                {content.stampEyebrow}
              </p>
              <strong className="mt-0.5 block font-friendly text-xl font-bold leading-none text-[#075f46] sm:text-2xl">
                {content.stampTime}
              </strong>
              <span className="mt-1 block text-sm font-semibold leading-5 text-slate-600">
                {content.stampText}
              </span>
            </div>
          </div>

          <div className="mt-4 hidden items-center gap-2 md:mt-8 md:flex" aria-label={fillTemplate(content.progress, { current: progress })}>
            {QUESTION_ORDER.map((id, index) => {
              const active = index < progress;
              return (
                <span
                  key={id}
                  className={`h-2.5 rounded-full transition-all duration-300 ${active ? 'w-10 bg-[#25c990]' : 'w-5 bg-white/15'}`}
                  aria-hidden="true"
                />
              );
            })}
          </div>
          {/* Mobil nur im Ergebnis sichtbar: bei einer Frage steht dieselbe Zeile schon oben in der Karte. */}
          <p className={`mt-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-slate-400 md:text-xs md:tracking-[0.16em] ${result ? '' : 'hidden md:block'}`}>
            {fillTemplate(content.progress, { current: progress })}
          </p>
        </div>

        <div className="relative">
          <span className="absolute left-1/2 top-0 z-20 h-3 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8c89d] bg-[#fff5d5] shadow-sm" aria-hidden="true" />
          <div ref={cardRef} id={ZAHN_CHECK_CARD_ID} className="min-h-[26rem] scroll-mt-20 overflow-hidden rounded-[2rem] border border-[#e8dcc0] bg-[#fffdf8] p-5 text-[#07111f] shadow-[0_32px_90px_rgba(0,0,0,0.32)] sm:p-10 md:min-h-[31rem] md:scroll-mt-0 md:rounded-[2.5rem]">
            <AnimatePresence mode="wait">
              {!result && question && (
                <motion.div
                  key={currentQuestionId}
                  ref={onPanelMount}
                  initial={reduceMotion ? false : { opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -22 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22 }}
                >
                  <div className="flex min-h-10 items-center justify-between gap-4">
                    <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-[#087654] md:text-xs md:tracking-[0.18em]">
                      {fillTemplate(content.progress, { current: path.length + 1 })}
                    </p>
                    {path.length > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        {content.back}
                      </button>
                    )}
                  </div>

                  <h3 className="mt-4 max-w-[24ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl md:mt-7">
                    {question.text}
                  </h3>
                  {question.hint && <p className="mt-3 max-w-2xl text-base leading-6 text-slate-600 md:leading-7">{question.hint}</p>}
                  {/* Zeitraum-Regel direkt unter Frage 1 (Frank 05.10.2026): was älter
                      als 2 Jahre ist, zählt nicht mehr. Das Gegenstück (in den letzten
                      2 Jahren oder läuft schon, dann Sofortschutz) steht in der Unterzeile
                      der Ja-Antwort. Kompakt gehalten, damit die Antwortknöpfe am Handy
                      nah an der Frage bleiben. Reine Anzeige, die Weiche bleibt computeResult. */}
                  {question.rules && (
                    <ul className="mt-3 grid max-w-2xl gap-2">
                      {question.rules.map((rule) => (
                        <li key={rule.title} className={`rounded-2xl border px-3 py-2 text-base leading-6 ${toneClasses[rule.tone] || toneClasses.neutral}`}>
                          <strong className="font-display font-extrabold">{rule.title}</strong>{' '}
                          <span className="text-slate-700">{rule.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 grid gap-3 md:mt-8">
                    {options.map(([value, option]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => answer(currentQuestionId, value)}
                        className="group flex min-h-[4.25rem] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left md:min-h-[4.75rem] md:py-4 sm:gap-5 sm:px-5 shadow-[0_7px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#25c990] hover:bg-[#f0fbf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2 motion-reduce:transform-none"
                      >
                        <span>
                          <span className="block font-display text-base font-extrabold text-slate-950 sm:text-lg">
                            {option.label}
                          </span>
                          {option.sub && <span className="mt-1 block text-base text-slate-600">{option.sub}</span>}
                        </span>
                        <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-slate-100 text-slate-400 transition group-hover:bg-[#25c990] group-hover:text-[#07111f]">
                          <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key={resultKey}
                  ref={onPanelMount}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28 }}
                  aria-live="polite"
                >
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-extrabold md:text-xs ${toneClasses[result.tone] || toneClasses.neutral}`}>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {content.resultEyebrow}
                  </div>

                  <p className="mt-5 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[#087654] md:mt-7">
                    {result.insurer}
                  </p>
                  <h3 className="mt-3 max-w-[22ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl">
                    {result.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-6 text-slate-600 md:mt-4 md:leading-7">{result.text}</p>

                  <ul className="mt-5 grid gap-3 md:mt-6 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {result.reasons.map((reason) => (
                      <li key={reason} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-base leading-6 text-slate-700 md:block md:leading-7 lg:flex xl:block">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#0b8b63] md:mb-3 md:mt-0 lg:mb-0 lg:mt-1 xl:mb-3 xl:mt-0" aria-hidden="true" />
                        {reason}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f2d794] bg-[#fff8df] p-4 md:mt-6">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-[#9a6d00]" aria-hidden="true" />
                    <p className="text-base leading-6 text-slate-700 md:leading-7">
                      <strong className="text-slate-950">{content.warningLabel}</strong> {result.warning}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-7">
                    {result.ctaType === 'contact' ? (
                      <Button asChild className="min-h-14 rounded-full bg-[#25c990] px-6 font-display text-base font-extrabold text-[#07111f] shadow-[0_14px_34px_rgba(37,201,144,0.25)] hover:bg-[#5ee0b1]">
                        <a href={getPath('kontakt')}>{result.cta}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></a>
                      </Button>
                    ) : (
                      <Button asChild className="min-h-14 rounded-full bg-[#25c990] px-6 font-display text-base font-extrabold text-[#07111f] shadow-[0_14px_34px_rgba(37,201,144,0.25)] hover:bg-[#5ee0b1]">
                        <a href={CTA_HREFS[result.ctaType]} target="_blank" rel="noopener noreferrer" onClick={countAntragOpened}>
                          {result.cta}<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      {content.restart}
                    </button>
                  </div>

                  {/* Zweiter, interner Weg zum Gespräch, etwa bei Fragen zur Lücke. Die
                      2-Jahres-Regel zu Heil- und Kostenplan und Anratung steht schon im
                      Hinweis des Ergebnisses; der Kontakt ergänzt sie nur. Es werden keine
                      Antworten aus dem Check übergeben, der Link führt nur auf die
                      Kontaktseite. */}
                  {result.contactLabel && (
                    <a
                      href={getPath('kontakt')}
                      className="mt-4 inline-flex min-h-11 items-center gap-1 text-base font-bold text-[#087654] underline underline-offset-4"
                    >
                      {result.contactLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  <p className="mt-3 text-base leading-6 text-slate-600 md:leading-7">{result.note}</p>

                  <div className="mt-5 rounded-2xl border border-[#a6e9d2] bg-[#effbf6] p-4 sm:p-5 md:mt-7">
                    <p className="font-display text-base font-extrabold leading-6 text-[#075c43] md:leading-7">{content.bonusLead}</p>
                    <p className="mt-1 text-base leading-6 text-slate-600 md:leading-7">{content.bonusDetail}</p>
                    <a
                      href="#kassenbonus"
                      onClick={scrollToBonus}
                      className="mt-3 inline-flex min-h-11 items-center gap-2 font-display text-base font-extrabold text-[#075c43] underline decoration-[#25c990] decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                    >
                      {content.bonusCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Beide Hinweise untereinander: in 16 px passen sie nicht mehr sauber nebeneinander. */}
          <div className="mt-4 flex flex-col items-center justify-center gap-1 text-center text-base leading-6 text-slate-300 md:mt-5 md:leading-7">
            <span><Lock className="mr-2 inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />{content.trust}</span>
            <span className="max-w-2xl">{content.disclaimer}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalZahnCheck;
