import React, { useMemo, useState } from 'react';
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
import { BAYERISCHE_URL, LKH_URL, LKH_URLS, UKV_URL } from './dentalLinks';
import { getDentalContent, LKH_GUIDELINE_URL } from './dentalContent';

const QUESTION_ORDER = ['q1', 'q2', 'q3', 'q4'];

const needsQ4 = (answers) =>
  answers.q1 === 'nein' && answers.q2 === 'keine' && answers.q3 === 'nein';

const computeResult = (answers) => {
  if (answers.q2 === 'viele') return 'sonderViele';

  if (answers.q1 === 'ja') {
    if (answers.q2 === 'wenige' || answers.q3 === 'ja') return 'sonderKomplex';
    return 'sofort';
  }

  if (answers.q2 === 'wenige') return 'lkhLuecke';
  if (answers.q3 === 'ja') return 'ukvVorgeschichte';

  switch (answers.q4) {
    case 'familie':
      return 'ukvFamilie';
    case 'pzr':
      return 'ukvPzr';
    case 'preis':
      return 'preis';
    default:
      return 'prestige';
  }
};

const CTA_HREFS = {
  bayerische: BAYERISCHE_URL,
  ukv: UKV_URL,
  lkh: LKH_URL,
};

const toneClasses = {
  mint: 'border-[#a6e9d2] bg-[#effbf6] text-[#0b6f52]',
  sky: 'border-[#b9def4] bg-[#eef8ff] text-[#27658b]',
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
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setPath((current) => [...current, questionId]);
  };

  const goBack = () => {
    if (path.length === 0) return;
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
      className="relative isolate overflow-hidden bg-[#07111f] px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8 lg:py-28"
      aria-labelledby="zahn-check-heading"
    >
      <div className="absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#25c990]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#ffd67b]/10 blur-3xl" aria-hidden="true" />

      <div className="healio-container grid items-start gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(540px,1.28fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#5ee0b1]">
            {content.eyebrow}
          </p>
          <h2
            id="zahn-check-heading"
            className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-[3.9rem]"
          >
            <span className="block font-display">{content.titleLead}</span>
            <span className="mt-1 block font-friendly text-[#5ee0b1]">{content.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
            {content.subtitle}
          </p>

          <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-[1.65rem] border border-[#efd99b]/70 bg-[#fff8df] p-2 pr-5 text-[#07111f] shadow-[0_18px_46px_rgba(0,0,0,0.22)] sm:gap-4 sm:pr-6">
            <FriendlyIcon kind="choice" tone="butter" size="lg" className="-rotate-3" />
            <div className="min-w-0 py-1">
              <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-[#77570c] sm:text-[0.68rem]">
                {content.stampEyebrow}
              </p>
              <strong className="mt-0.5 block font-friendly text-xl font-bold leading-none text-[#075f46] sm:text-2xl">
                {content.stampTime}
              </strong>
              <span className="mt-1 block text-[0.68rem] font-semibold leading-4 text-slate-600 sm:text-xs">
                {content.stampText}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-label={fillTemplate(content.progress, { current: progress })}>
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
          <p className="mt-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            {fillTemplate(content.progress, { current: progress })}
          </p>
        </div>

        <div className="relative">
          <span className="absolute left-1/2 top-0 z-20 h-3 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8c89d] bg-[#fff5d5] shadow-sm" aria-hidden="true" />
          <div className="min-h-[31rem] overflow-hidden rounded-[2.5rem] border border-[#e8dcc0] bg-[#fffdf8] p-6 text-[#07111f] shadow-[0_32px_90px_rgba(0,0,0,0.32)] sm:p-10">
            <AnimatePresence mode="wait">
              {!result && question && (
                <motion.div
                  key={currentQuestionId}
                  initial={reduceMotion ? false : { opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -22 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22 }}
                >
                  <div className="flex min-h-10 items-center justify-between gap-4">
                    <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#087654]">
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

                  <h3 className="mt-7 max-w-[24ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl">
                    {question.text}
                  </h3>
                  {question.hint && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{question.hint}</p>}

                  <div className="mt-8 grid gap-3">
                    {options.map(([value, option]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => answer(currentQuestionId, value)}
                        className="group flex min-h-[4.75rem] w-full items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-[0_7px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#25c990] hover:bg-[#f0fbf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2 motion-reduce:transform-none"
                      >
                        <span>
                          <span className="block font-display text-base font-extrabold text-slate-950 sm:text-lg">
                            {option.label}
                          </span>
                          {option.sub && <span className="mt-1 block text-sm text-slate-500">{option.sub}</span>}
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
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28 }}
                  aria-live="polite"
                >
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-extrabold ${toneClasses[result.tone] || toneClasses.neutral}`}>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {content.resultEyebrow}
                  </div>

                  <p className="mt-7 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[#087654]">
                    {result.insurer}
                  </p>
                  <h3 className="mt-3 max-w-[22ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl">
                    {result.title}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">{result.text}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                    {result.reasons.map((reason) => (
                      <li key={reason} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                        <Check className="mb-3 h-5 w-5 text-[#0b8b63]" aria-hidden="true" />
                        {reason}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f2d794] bg-[#fff8df] p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-[#9a6d00]" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-700">
                      <strong className="text-slate-950">{content.warningLabel}</strong> {result.warning}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {result.ctaType === 'contact' ? (
                      <Button asChild className="min-h-14 rounded-full bg-[#25c990] px-6 font-display text-base font-extrabold text-[#07111f] shadow-[0_14px_34px_rgba(37,201,144,0.25)] hover:bg-[#5ee0b1]">
                        <a href={getPath('kontakt')}>{result.cta}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></a>
                      </Button>
                    ) : result.ctaType === 'lkh' && result.cta70 ? (
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild className="min-h-14 rounded-full bg-[#25c990] px-6 font-display text-base font-extrabold text-[#07111f] shadow-[0_14px_34px_rgba(37,201,144,0.25)] hover:bg-[#5ee0b1]">
                          <a href={LKH_URLS.zu90} target="_blank" rel="noopener noreferrer">
                            {result.cta90}<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="min-h-14 rounded-full border-slate-300 bg-white px-6 font-display text-base font-extrabold text-[#07111f] hover:bg-slate-50">
                          <a href={LKH_URLS.zu70} target="_blank" rel="noopener noreferrer">
                            {result.cta70}<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <Button asChild className="min-h-14 rounded-full bg-[#25c990] px-6 font-display text-base font-extrabold text-[#07111f] shadow-[0_14px_34px_rgba(37,201,144,0.25)] hover:bg-[#5ee0b1]">
                        <a href={CTA_HREFS[result.ctaType]} target="_blank" rel="noopener noreferrer">
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

                  {result.sourceLabel && (
                    <a
                      href={LKH_GUIDELINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#087654] underline underline-offset-4"
                    >
                      {result.sourceLabel}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  <p className="mt-3 text-xs leading-5 text-slate-400">{result.note}</p>

                  <div className="mt-7 rounded-2xl border border-[#a6e9d2] bg-[#effbf6] p-5">
                    <p className="font-display text-sm font-extrabold leading-6 text-[#075c43]">{content.bonusLead}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{content.bonusDetail}</p>
                    <a
                      href="#kassenbonus"
                      onClick={scrollToBonus}
                      className="mt-3 inline-flex min-h-11 items-center gap-2 font-display text-sm font-extrabold text-[#075c43] underline decoration-[#25c990] decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                    >
                      {content.bonusCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center text-xs leading-5 text-slate-400 sm:flex-row sm:gap-5">
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4" aria-hidden="true" />{content.trust}</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" aria-hidden="true" />
            <span>{content.disclaimer}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalZahnCheck;
