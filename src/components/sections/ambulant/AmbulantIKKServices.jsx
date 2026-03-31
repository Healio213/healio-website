
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Video, Stethoscope, Smartphone, Clock, Shield, Search } from 'lucide-react';

const AmbulantIKKServices = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Smartphone className="w-4 h-4" />
            {t('ikkServices.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t('ikkServices.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('ikkServices.subtitle')}
          </p>
        </div>

        {/* Two Cards: TeleClinic + BetterDoc */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* TeleClinic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{t('ikkServices.teleclinic.title')}</h3>
                  <span className="text-blue-100 text-sm font-medium">{t('ikkServices.teleclinic.badge')}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{t('ikkServices.teleclinic.desc')}</p>

              <div className="space-y-4 mb-6">
                {['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      {key === 'feature1' && <Clock className="w-4 h-4 text-blue-600" />}
                      {key === 'feature2' && <Stethoscope className="w-4 h-4 text-blue-600" />}
                      {key === 'feature3' && <Smartphone className="w-4 h-4 text-blue-600" />}
                      {key === 'feature4' && <Shield className="w-4 h-4 text-blue-600" />}
                      {key === 'feature5' && <Video className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t(`ikkServices.teleclinic.${key}.title`)}</p>
                      <p className="text-gray-500 text-sm">{t(`ikkServices.teleclinic.${key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-blue-900 font-bold text-lg">{t('ikkServices.teleclinic.priceTag')}</p>
                <p className="text-blue-600 text-sm">{t('ikkServices.teleclinic.priceNote')}</p>
              </div>
            </div>
          </motion.div>

          {/* BetterDoc */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{t('ikkServices.betterdoc.title')}</h3>
                  <span className="text-purple-100 text-sm font-medium">{t('ikkServices.betterdoc.badge')}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{t('ikkServices.betterdoc.desc')}</p>

              <div className="space-y-4 mb-6">
                {['feature1', 'feature2', 'feature3', 'feature4'].map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      {key === 'feature1' && <Search className="w-4 h-4 text-purple-600" />}
                      {key === 'feature2' && <Stethoscope className="w-4 h-4 text-purple-600" />}
                      {key === 'feature3' && <Shield className="w-4 h-4 text-purple-600" />}
                      {key === 'feature4' && <Clock className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t(`ikkServices.betterdoc.${key}.title`)}</p>
                      <p className="text-gray-500 text-sm">{t(`ikkServices.betterdoc.${key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-purple-900 font-bold text-lg">{t('ikkServices.betterdoc.priceTag')}</p>
                <p className="text-purple-600 text-sm">{t('ikkServices.betterdoc.priceNote')}</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* BetterDoc Erklärvideo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-lg font-bold text-gray-900 mb-4">{t('ikkServices.betterdoc.videoTitle')}</p>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-purple-100" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/pCxt4tZBq7s"
                title="BetterDoc Erklärvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-xl font-bold text-gray-900 mb-2">{t('ikkServices.bottomCta.title')}</p>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('ikkServices.bottomCta.desc')}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AmbulantIKKServices;
