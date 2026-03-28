
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Heart, Glasses, Baby, GraduationCap, Stethoscope } from 'lucide-react';

const testimonialKeys = ['julia', 'thomas', 'max', 'sandra', 'andreas', 'lisa'];
const testimonialIcons = {
  julia: Stethoscope,
  thomas: Baby,
  max: GraduationCap,
  sandra: Heart,
  andreas: Glasses,
  lisa: Baby,
};
const testimonialInitials = {
  julia: 'JS',
  thomas: 'TK',
  max: 'MB',
  sandra: 'SM',
  andreas: 'AK',
  lisa: 'LM',
};

const statKeys = ['sdk', 'ikk', 'budget', 'cost'];

const AmbulantTestimonials = () => {
  const { t } = useTranslation('ambulant');

  const testimonials = useMemo(() => testimonialKeys.map(key => ({
    key,
    name: t(`testimonials.items.${key}.name`),
    age: t(`testimonials.items.${key}.age`),
    city: t(`testimonials.items.${key}.city`),
    tag: t(`testimonials.items.${key}.tag`),
    highlight: t(`testimonials.items.${key}.highlight`),
    text: t(`testimonials.items.${key}.text`),
    icon: testimonialIcons[key],
    initials: testimonialInitials[key],
  })), [t]);

  const stats = useMemo(() => statKeys.map(key => ({
    value: t(`testimonials.stats.${key}.value`),
    label: t(`testimonials.stats.${key}.label`),
  })), [t]);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "HEALIO GmbH",
    "url": "https://www.healio.de",
    "review": testimonials.map(item => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": item.name },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": item.text,
      "datePublished": "2026-03-01"
    }))
  };

  return (
    <section className="py-24 bg-green-50/50">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">{t('testimonials.title')}</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
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

                  {/* Stars */}
                  <div className="flex space-x-0.5 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 relative z-10 mb-6 text-[15px] leading-relaxed">
                    "{item.text}"
                  </p>
                </div>

                {/* Author */}
                <div className="border-t border-gray-100 pt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-healio-primary text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.age} Jahre, {item.city}</p>
                  </div>
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
