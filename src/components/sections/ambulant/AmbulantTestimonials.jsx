
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Glasses, Baby, GraduationCap, Stethoscope } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';

const testimonialKeys = ['julia', 'thomas', 'max', 'sandra', 'andreas', 'lisa'];
const testimonialIcons = {
  julia: Stethoscope,
  thomas: Baby,
  max: GraduationCap,
  sandra: Heart,
  andreas: Glasses,
  lisa: Baby,
};

const statKeys = ['sdk', 'ikk', 'budget', 'cost'];

const AmbulantTestimonials = () => {
  const { t } = useTranslation('ambulant');

  const testimonials = useMemo(() => testimonialKeys.map(key => ({
    key,
    name: t(`testimonials.items.${key}.name`),
    tag: t(`testimonials.items.${key}.tag`),
    highlight: t(`testimonials.items.${key}.highlight`),
    text: t(`testimonials.items.${key}.text`),
    icon: testimonialIcons[key],
  })), [t]);

  const stats = useMemo(() => statKeys.map(key => ({
    value: t(`testimonials.stats.${key}.value`),
    label: t(`testimonials.stats.${key}.label`),
  })), [t]);

  return (
    <section className="py-24 bg-green-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            <HighlightText text={t('testimonials.title')} />
          </h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            <HighlightText text={t('testimonials.subtitle')} />
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="text-center py-4"
            >
              <p className="text-2xl md:text-3xl font-extrabold text-healio-primary">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between group"
              >
                <div>
                  {/* Header: Tag + Highlight */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-healio-primary text-sm font-semibold rounded-full">
                      <Icon className="w-3.5 h-3.5" />
                      {item.tag}
                    </span>
                    <span className="text-sm font-bold text-healio-primary flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.highlight}
                    </span>
                  </div>

                  {/* Szenario-Titel */}
                  <p className="font-bold text-gray-900 mb-3">{item.name}</p>

                  {/* Beschreibung */}
                  <p className="text-gray-600 relative z-10 text-[15px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmbulantTestimonials;
