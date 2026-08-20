
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Leaf, ChevronDown } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const pillarIcons = [
  { icon: 'planet-care', tone: 'mint' },
  { icon: 'prevention-care', tone: 'sky' },
  { icon: 'protection-path', tone: 'butter' },
];

const AmbulantUmwelt = () => {
  const { t } = useTranslation('ambulant');
  // Eingeklappt als Standard (Frank 06.08.): Herzensthema bleibt sichtbar,
  // verlaengert aber nicht den Weg zum Abschluss.
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50/50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mx-auto mb-6 flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-5 text-left shadow-lg md:p-6"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Leaf className="w-4 h-4" />
              {t('umwelt.badge')}
            </div>
            <h2 className="text-2xl font-extrabold leading-tight text-gray-900">
              <HighlightText text={t('umwelt.title')} />
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              <HighlightText text={t('umwelt.subtitle')} />
            </p>
          </div>
          <ChevronDown className={`h-6 w-6 flex-shrink-0 text-emerald-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        <div className={open ? 'block' : 'hidden'}>
        {/* Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <FriendlyIcon icon="planet-care" tone="mint" size="lg" className="mx-auto mb-6" />

            <p className="text-6xl md:text-7xl font-extrabold mb-4">10 %</p>
            <p className="text-2xl md:text-3xl font-bold mb-6">{t('umwelt.headline')}</p>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {t('umwelt.desc')}
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {['pillar1', 'pillar2', 'pillar3'].map((key, i) => (
                <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <FriendlyIcon
                    icon={pillarIcons[i].icon}
                    tone={pillarIcons[i].tone}
                    size="sm"
                    className="mx-auto mb-3"
                  />
                  <p className="font-bold text-white mb-1">{t(`umwelt.${key}.title`)}</p>
                  <p className="text-white/70 text-sm">{t(`umwelt.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8 max-w-2xl mx-auto"
        >
          {t('umwelt.note')}
        </motion.p>
        </div>

      </div>
    </section>
  );
};

export default AmbulantUmwelt;
