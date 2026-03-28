import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Stethoscope, Smile, Building2, ArrowRight } from 'lucide-react';

const insuranceTypes = [
  {
    id: 'ambulant',
    title: 'Ambulante Zusatzversicherung',
    icon: Stethoscope,
    gradient: 'from-emerald-500 to-teal-400',
    description: 'Heilpraktiker, Osteopathie, Massagen, Sehhilfen und vieles mehr – alles was die GKV nicht abdeckt.',
    features: [
      'Heilpraktiker & Osteopathie',
      'Sehhilfen bis 500€',
      'Massagen & Physiotherapie',
      'Vorsorge & Impfungen'
    ],
    link: '/ambulant',
    budget: '2.500€ Jahresbudget'
  },
  {
    id: 'zahn',
    title: 'Zahnzusatzversicherung',
    icon: Smile,
    gradient: 'from-blue-500 to-cyan-400',
    description: 'Von der Prophylaxe bis zum hochwertigen Zahnersatz – Ihr Lächeln verdient den besten Schutz.',
    features: [
      'Professionelle Zahnreinigung',
      'Zahnersatz bis 90%',
      'Implantate & Kronen',
      'Kieferorthopädie'
    ],
    link: '/zahn',
    budget: 'Bis 90% Erstattung'
  },
  {
    id: 'stationaer',
    title: 'Stationäre Zusatzversicherung',
    icon: Building2,
    gradient: 'from-purple-500 to-pink-400',
    description: 'Privatpatientenkomfort im Krankenhaus – Einzelzimmer, Chefarzt und freie Krankenhauswahl.',
    features: [
      'Ein- oder Zweibettzimmer',
      'Chefarztbehandlung',
      'Freie Krankenhauswahl',
      'Weltweiter Schutz'
    ],
    link: '/stationaer',
    budget: 'Premium-Komfort'
  }
];

const InsuranceOverview = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();

  return (
    <section className="healio-section bg-gradient-to-b from-white to-gray-50" aria-labelledby="insurance-overview-heading">
      <div className="healio-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="insurance-overview-heading" className="text-3xl lg:text-5xl font-extrabold text-healio-text mb-4">
            {t('insurance.title')}
          </h2>
          <p className="text-lg text-healio-text-light max-w-3xl mx-auto">
            {t('insurance.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {insuranceTypes.map((insurance, index) => (
            <motion.article
              key={insurance.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${insurance.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${insurance.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <insurance.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                {/* Budget Badge */}
                <div className="inline-block px-4 py-1 bg-healio-green/10 text-healio-green text-sm font-semibold rounded-full mb-4">
                  {insurance.budget}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-healio-text mb-3">
                  {insurance.title}
                </h3>

                {/* Description */}
                <p className="text-healio-text-light mb-6">
                  {insurance.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {insurance.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-healio-text-light">
                      <span className="text-healio-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button asChild className="w-full healio-button bg-gradient-to-r from-healio-primary to-healio-dark hover:shadow-lg group">
                  <Link to={insurance.link}>
                    {t('insurance.moreInfo')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-healio-text-light mb-6">
            {t('insurance.notSure')}
          </p>
          <Button asChild variant="outline" className="healio-button">
            <a href="mailto:kontakt@healio.de">
              {t('insurance.freeConsultation')}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceOverview;