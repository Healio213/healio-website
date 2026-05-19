import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const STORAGE_KEY = 'healio:ambulant-mia-prompt-dismissed';
const PROMPT_DELAY_MS = 150000;

const getPromptDismissed = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const setPromptDismissed = () => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Session storage can be unavailable in strict privacy modes.
  }
};

const openMiaWidget = () => {
  const widget = document.querySelector('elevenlabs-convai');
  const button = widget?.shadowRoot?.querySelector('button');
  if (button) {
    button.click();
    return true;
  }
  widget?.click?.();
  return false;
};

const AmbulantMiaPrompt = () => {
  const { t } = useTranslation('ambulant');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (getPromptDismissed()) return undefined;

    const revealPrompt = () => {
      if (!getPromptDismissed()) {
        setShowPrompt(true);
      }
    };

    const timer = window.setTimeout(revealPrompt, PROMPT_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setPromptDismissed();
    setShowPrompt(false);
  };

  const handleOpen = () => {
    setPromptDismissed();
    setShowPrompt(false);
    [0, 450, 1200].forEach((delay) => {
      window.setTimeout(openMiaWidget, delay);
    });
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-24 right-4 z-[9998] w-[min(calc(100vw-2rem),360px)] md:bottom-auto md:right-24 md:top-1/2 md:-translate-y-1/2"
          role="dialog"
          aria-live="polite"
          aria-label={t('miaPrompt.ariaLabel')}
        >
          <div className="relative rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl shadow-slate-950/15">
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-3 top-3 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label={t('miaPrompt.close')}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-start gap-3 pr-6">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">
                  {t('miaPrompt.eyebrow')}
                </p>
                <p className="mt-1 text-base font-extrabold text-slate-950">
                  {t('miaPrompt.title')}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t('miaPrompt.body')}
                </p>
                <button
                  type="button"
                  onClick={handleOpen}
                  className="mt-4 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
                >
                  {t('miaPrompt.cta')}
                </button>
              </div>
            </div>
            <div className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-emerald-100 bg-white md:block" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AmbulantMiaPrompt;
