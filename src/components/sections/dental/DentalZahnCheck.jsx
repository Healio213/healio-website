import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Lock, RotateCcw, Sparkles, AlertTriangle, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BAYERISCHE_URL, UKV_URL, trackZahnEvent } from './dentalLinks';

const QUESTION_ORDER = ['q1', 'q2', 'q3', 'q4'];

// q4 wird nur auf dem "alles gesund"-Pfad gestellt
const needsQ4 = (answers) =>
  answers.q1 === 'nein' && answers.q2 === 'keine' && answers.q3 === 'nein';

const computeResult = (answers) => {
  if (answers.q2 === 'viele') return 'sonderViele';
  if (answers.q1 === 'ja') {
    if (answers.q2 === 'wenige') return 'sonderLuecke';
    if (answers.q3 === 'ja') return 'sonderVorgeschichte';
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
      return 'preis';
    default:
      return 'prestige';
  }
};

const CTA_HREFS = {
  bayerische: BAYERISCHE_URL,
  ukv: UKV_URL,
};

const DentalZahnCheck = () => {
  const { t } = useTranslation('zahn');
  const [answers, setAnswers] = useState({});
  const [path, setPath] = useState([]); // beantwortete Fragen in Reihenfolge

  const questions = t('check.questions', { returnObjects: true }) || {};
  const results = t('check.results', { returnObjects: true }) || {};

  const currentQuestionId = QUESTION_ORDER.find((id) => {
    if (id === 'q4' && !needsQ4(answers)) return false;
    return !(id in answers);
  });

  // Ergebnis steht fest, sobald keine relevante Frage mehr offen ist
  const isDone =
    path.length > 0 &&
    (currentQuestionId === undefined ||
      // Abkürzung: sobald das Ergebnis unabhängig von den restlichen Fragen feststeht
      answers.q2 === 'viele' ||
      (answers.q1 === 'ja' && answers.q2 === 'wenige'));

  const resultKey = isDone ? computeResult(answers) : null;
  const result = resultKey ? results[resultKey] : null;

  const answer = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value };
    setAnswers(nextAnswers);
    setPath([...path, questionId]);
    const nextOpen = QUESTION_ORDER.find((id) => {
      if (id === 'q4' && !needsQ4(nextAnswers)) return false;
      return !(id in nextAnswers);
    });
    const shortcut =
      nextAnswers.q2 === 'viele' || (nextAnswers.q1 === 'ja' && nextAnswers.q2 === 'wenige');
    if (nextOpen === undefined || shortcut) {
      trackZahnEvent('zahn_check_ergebnis', computeResult(nextAnswers));
    }
  };

  const goBack = () => {
    if (path.length === 0) return;
    const last = path[path.length - 1];
    const nextAnswers = { ...answers };
    delete nextAnswers[last];
    // q4 verwerfen, falls der Pfad sich ändert
    if (last !== 'q4' && 'q4' in nextAnswers) delete nextAnswers.q4;
    setAnswers(nextAnswers);
    setPath(path.slice(0, -1));
  };

  const restart = () => {
    setAnswers({});
    setPath([]);
  };

  const question = currentQuestionId ? questions[currentQuestionId] : null;
  const options = question ? Object.entries(question.options || {}) : [];

  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('dental-contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBonus = (e) => {
    e.preventDefault();
    const element = document.getElementById('bonus-calculator');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="zahn-check" className="healio-section py-20 bg-slate-50" aria-labelledby="zahn-check-heading">
      <div className="healio-container px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-6">
              {t('check.badge')}
            </span>
            <h2 id="zahn-check-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              {t('check.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{t('check.subtitle')}</p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 p-6 sm:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!result && question && (
                <motion.div
                  key={currentQuestionId}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      {t('check.progress', { current: path.length + 1 })}
                    </p>
                    {path.length > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        {t('check.back')}
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">{question.text}</h3>
                  {question.hint && <p className="text-sm text-slate-500 mb-6">{question.hint}</p>}

                  <div className="grid gap-3 mt-6">
                    {options.map(([value, option]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => answer(currentQuestionId, value)}
                        className="group w-full text-left rounded-xl border-2 border-slate-200 hover:border-healio-primary hover:bg-emerald-50/60 px-5 py-4 transition-all duration-200"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span>
                            <span className="block font-bold text-slate-900">{option.label}</span>
                            {option.sub && <span className="block text-sm text-slate-500 mt-0.5">{option.sub}</span>}
                          </span>
                          <ArrowRight
                            className="w-5 h-5 text-slate-300 group-hover:text-healio-primary flex-shrink-0 transition-colors"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-healio-primary" aria-hidden="true" />
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">{t('check.resultKicker')}</p>
                  </div>

                  <p className="text-sm font-semibold text-slate-500 mb-1">{result.insurer}</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">{result.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{result.text}</p>

                  {Array.isArray(result.reasons) && result.reasons.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {result.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {result.warning && (
                    <div className="flex items-start gap-3 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <strong>{t('check.warningLabel')}</strong> {result.warning}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    {result.ctaType === 'contact' ? (
                      <Button
                        asChild
                        className="w-full bg-[#25c990] hover:bg-[#1db37f] text-white text-base px-6 py-6 h-auto rounded-xl shadow-[0_4px_14px_rgba(37,201,144,0.4)] transition-all duration-300"
                      >
                        <a href="#dental-contact" onClick={(e) => { trackZahnEvent('zahn_check_cta', resultKey); scrollToContact(e); }}>
                          <PhoneCall className="w-4 h-4 mr-2" aria-hidden="true" />
                          {result.cta}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="w-full bg-[#25c990] hover:bg-[#1db37f] text-white text-base px-6 py-6 h-auto rounded-xl shadow-[0_4px_14px_rgba(37,201,144,0.4)] transition-all duration-300"
                      >
                        <a
                          href={CTA_HREFS[result.ctaType]}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackZahnEvent('zahn_check_cta', `${resultKey}_${result.ctaType}`)}
                        >
                          {result.cta}
                          <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                        </a>
                      </Button>
                    )}

                    {result.secondary && result.secondaryType && (
                      <a
                        href={result.secondaryType === 'contact' ? '#dental-contact' : CTA_HREFS[result.secondaryType]}
                        target={result.secondaryType === 'contact' ? undefined : '_blank'}
                        rel={result.secondaryType === 'contact' ? undefined : 'noopener noreferrer'}
                        onClick={result.secondaryType === 'contact' ? scrollToContact : () => trackZahnEvent('zahn_check_cta_sekundaer', resultKey)}
                        className="text-center text-sm font-semibold text-slate-500 hover:text-slate-900 underline underline-offset-4 transition-colors"
                      >
                        {result.secondary}
                      </a>
                    )}
                  </div>

                  {result.note && <p className="text-xs text-slate-400 mt-4 text-center">{result.note}</p>}

                  <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-slate-700">
                      {t('check.ikkNote')}{' '}
                      <a
                        href="#bonus-calculator"
                        onClick={scrollToBonus}
                        className="font-bold text-yellow-700 underline underline-offset-2 hover:text-yellow-800"
                      >
                        {t('check.ikkCta')}
                      </a>
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      {t('check.restart')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <p>{t('check.trust')}</p>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">{t('check.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
};

export default DentalZahnCheck;
