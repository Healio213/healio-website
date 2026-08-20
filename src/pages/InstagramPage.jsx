
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

/**
 * Instagram Bio-Link Landing Page
 *
 * Eigenständige Seite OHNE Header/Footer — rein mobile-optimiert.
 * Nutzer kommen über den Instagram Bio-Link hierher und wählen ihr Produkt.
 * Jede Karte leitet auf die vollständige Verkaufsseite weiter.
 */

const ProductCard = ({ card, index, colorClass, gradientClass, textColorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
    >
      <Link
        to={card.link}
        className="group block relative bg-white/[0.06] border border-white/10 rounded-2xl p-6 transition-all duration-200 active:scale-[0.98] hover:bg-white/[0.1] overflow-hidden"
      >
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] ${gradientClass}`} />

        <div className="flex justify-between items-start mb-3">
          <div>
            <FriendlyIcon icon={card.icon} tone="mint" size="sm" className="mb-2" />
            <h2 className="text-lg font-bold text-white">
              {card.title}
              {card.budgetHighlight && (
                <span className="ml-2 text-[12px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md align-middle">{card.budgetHighlight}</span>
              )}
            </h2>
            <p className="text-[13px] text-slate-400 leading-relaxed mt-1">{card.subtitle}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <span className={`text-[22px] font-extrabold ${textColorClass}`}>{card.price}</span>
            <span className="block text-[11px] text-slate-500">{card.period}</span>
          </div>
        </div>

        <div className="inline-block bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold px-2.5 py-1 rounded-md mt-2">
          {card.badge}
        </div>

        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

const InstagramPage = () => {
  const { t } = useTranslation('instagram');
  const { lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/instagram' : 'https://healio.de/instagram';

  const cards = [
    {
      ...t('cards.ambulant', { returnObjects: true }),
      gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      textColor: 'text-cyan-400',
    },
    {
      ...t('cards.zahn', { returnObjects: true }),
      gradient: 'bg-gradient-to-r from-violet-400 to-purple-500',
      textColor: 'text-violet-400',
    },
    {
      ...t('cards.klinik', { returnObjects: true }),
      gradient: 'bg-gradient-to-r from-emerald-400 to-green-500',
      textColor: 'text-emerald-400',
    },
  ];

  const stats = t('stats', { returnObjects: true });

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('meta.title')}
        ogDescription={t('meta.description')}
        ogUrl={canonicalUrl}
        robots="noindex, follow"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center text-white">
        <div className="w-full max-w-[420px] px-5 py-10 pb-16">

          {/* Logo + Tagline */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-9"
          >
            <img
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/899be0558bfa4782d893bf77fe1fc5f1.png"
              alt="Healio Logo"
              className="h-10 w-auto mx-auto brightness-0 invert"
            />
            <p className="text-[15px] text-slate-400 mt-1">{t('header.tagline')}</p>
            <p className="text-[14px] text-cyan-400 font-semibold mt-2 italic">{t('header.provocation')}</p>
          </motion.header>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-center gap-4 mb-8 text-[12px] text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {t('trust.noWaiting')}
            </span>
          </motion.div>

          {/* Product Cards */}
          <div className="space-y-4 mb-8">
            {cards.map((card, i) => (
              <ProductCard
                key={i}
                card={card}
                index={i}
                gradientClass={card.gradient}
                textColorClass={card.textColor}
              />
            ))}
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex justify-center gap-6 py-4 px-4 bg-white/[0.03] rounded-xl mb-7"
          >
            {Object.values(stats).map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-[14px] font-extrabold text-white">{stat.value}</span>
                <span className="block text-[11px] text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Powered By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2 text-[12px] text-slate-400">
              {t('poweredBy')} <strong className="text-white">Healio</strong>
            </div>
          </motion.div>

          {/* Footer */}
          <footer className="text-center">
            <p className="text-[11px] text-slate-600 mb-2">{t('footnote')}</p>
            <div className="text-[12px] text-slate-600 space-x-2">
              <Link to="/" className="hover:text-slate-400 transition-colors">{t('links.home')}</Link>
              <span>·</span>
              <Link to="/impressum" className="hover:text-slate-400 transition-colors">{t('links.impressum')}</Link>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
};

export default InstagramPage;
