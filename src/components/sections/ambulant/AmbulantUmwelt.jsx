
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Leaf, Heart, TreePine, Droplets } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';

const AmbulantUmwelt = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50/50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            {t('umwelt.badge')}
          </div>

          {/* Big Statement */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            <HighlightText text={t('umwelt.title')} />
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            <HighlightText text={t('umwelt.subtitle')} />
          </p>
        </motion.div>

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
            <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <TreePine className="w-10 h-10 text-white" />
            </div>

            <p className="text-6xl md:text-7xl font-extrabold mb-4">10 %</p>
            <p className="text-2xl md:text-3xl font-bold mb-6">{t('umwelt.headline')}</p>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {t('umwelt.desc')}
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {['pillar1', 'pillar2', 'pillar3'].map((key, i) => (
                <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {i === 0 && <TreePine className="w-5 h-5 text-white" />}
                    {i === 1 && <Droplets className="w-5 h-5 text-white" />}
                    {i === 2 && <Heart className="w-5 h-5 text-white" />}
                  </div>
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
    </section>
  );
};

export default AmbulantUmwelt;
