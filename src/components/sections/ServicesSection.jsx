import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stethoscope, Smile, Building2, Heart } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { TextHighlight } from '@/components/ui/ScrollAnimation';

const ServicesSection = () => {
  const { t } = useTranslation('home');

  const services = [
    {
      icon: Stethoscope,
      title: t('services.ambulant.title'),
      description: t('services.ambulant.description'),
      link: 'https://ambulant.healio.de',
      delay: 0.1,
      buttonText: t('services.ambulant.cta'),
      isExternal: true
    },
    {
      icon: Smile,
      title: t('services.zahn.title'),
      description: t('services.zahn.description'),
      link: '/zahn',
      delay: 0.2,
      buttonText: t('services.zahn.cta')
    },
    {
      icon: Building2,
      title: t('services.stationaer.title'),
      description: t('services.stationaer.description'),
      link: '/stationaer',
      delay: 0.3,
      buttonText: t('services.stationaer.cta')
    },
    {
      icon: Heart,
      title: t('services.tier.title'),
      description: t('services.tier.description'),
      link: '/tierkrankenversicherung',
      delay: 0.4,
      buttonText: t('services.tier.cta')
    }
  ];

  return (
    <section className="healio-section bg-white" id="services">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-healio-primary font-bold uppercase tracking-wider text-sm mb-3 block">
            {t('services.title')}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-healio-slate mb-6">
            {t('services.subtitle')}
          </h2>
          <p className="text-lg text-healio-text-light leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        {/* Updated layout to 1 column for maximum readability, scaling to 2 columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              delay={service.delay}
              buttonText={service.buttonText}
              isExternal={service.isExternal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;