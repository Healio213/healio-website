import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { requestNitaConsent } from '@/components/NitaConsentWidget';

const PROMPT_DELAY_MS = 60000;
const VIDEO_RECHECK_MS = 2000;

// Der Prompt darf sich nicht ueber ein laufendes Erklaervideo legen.
// Blockiert wird, solange ein Video spielt oder pausiert im Blickfeld steht.
const videoBlockiertPrompt = () => {
  const videos = Array.from(document.querySelectorAll('video'));
  return videos.some((video) => {
    if (video.ended || video.currentTime === 0) return false;
    if (!video.paused) return true;
    const rect = video.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  });
};

const getPromptDismissed = (storageKey) => {
  try {
    return window.sessionStorage.getItem(storageKey) === 'true';
  } catch {
    return false;
  }
};

const setPromptDismissed = (storageKey) => {
  try {
    window.sessionStorage.setItem(storageKey, 'true');
  } catch {
    // Session storage can be unavailable in strict privacy modes.
  }
};

const supportedNamespaces = new Set(['ambulant', 'zahn', 'stationaer', 'partner', 'zahnaerzte', 'hebammen', 'heilberufe']);

const AmbulantMiaPrompt = ({ variant = 'ambulant' }) => {
  const namespace = supportedNamespaces.has(variant) ? variant : 'ambulant';
  const storageKey = `healio:${namespace}-nita-prompt-dismissed`;
  const { t } = useTranslation(namespace);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (getPromptDismissed(storageKey)) return undefined;

    let timer;

    const revealPrompt = () => {
      if (getPromptDismissed(storageKey)) return;
      const root = document.documentElement;
      const interfaceBlocked = root.classList.contains('healio-consent-ui-active')
        || root.classList.contains('healio-mobile-menu-active');
      if (videoBlockiertPrompt() || interfaceBlocked) {
        timer = window.setTimeout(revealPrompt, VIDEO_RECHECK_MS);
        return;
      }
      setShowPrompt(true);
    };

    timer = window.setTimeout(revealPrompt, PROMPT_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [storageKey]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('healio-nita-teaser-active', showPrompt);
    return () => root.classList.remove('healio-nita-teaser-active');
  }, [showPrompt]);

  const handleDismiss = () => {
    setPromptDismissed(storageKey);
    setShowPrompt(false);
  };

  const handleOpen = () => {
    setPromptDismissed(storageKey);
    setShowPrompt(false);
    requestNitaConsent();
  };

  return (
    <>
      <style>{`
        html.healio-consent-ui-active .healio-nita-teaser,
        html.healio-mobile-menu-active .healio-nita-teaser {
          display: none !important;
        }
      `}</style>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="healio-nita-teaser fixed bottom-24 right-4 z-[9998] w-[min(calc(100vw-2rem),360px)] md:bottom-auto md:right-24 md:top-1/2 md:-translate-y-1/2"
            role="dialog"
            aria-live="polite"
            aria-label={t('miaPrompt.ariaLabel')}
          >
            <div className="relative rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl shadow-slate-950/15">
              <button
                type="button"
                onClick={handleDismiss}
                className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label={t('miaPrompt.close')}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-start gap-3 pr-6">
                <img
                  src="/nita-avatar.jpg"
                  alt=""
                  className="h-11 w-11 flex-shrink-0 rounded-full object-cover shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-100"
                  aria-hidden="true"
                />
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
                    className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
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
    </>
  );
};

export default AmbulantMiaPrompt;
