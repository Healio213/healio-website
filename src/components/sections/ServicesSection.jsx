import React from 'react';
import { Stethoscope, Smile, Building2, Heart } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { TextHighlight } from '@/components/ui/ScrollAnimation';

const ServicesSection = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'Ambulante Zusatzversicherung',
      description: 'Warum selbst zahlen? Wir übernehmen die Rechnung für Massagen, Chiropraktiker und Heilpraktiker. Egal ob neue Brille oder spezielle Facharzt-Behandlung (IGeL) – du bekommst den Status eines Privatpatienten. Sei clever und sichere dich ab.',
      link: 'https://ambulant.healio.de',
      delay: 0.1,
      buttonText: 'Prüf deinen Tarif',
      isExternal: true
    },
    {
      icon: Smile,
      title: 'Zahnzusatzversicherung',
      description: 'Dein Lächeln öffnet Türen und du solltest keine Kompromisse eingehen. Wir zahlen bis zu 100% für Zahnersatz und hochwertige Implantate. Nutze die professionelle Zahnreinigung so oft es nötig ist. Sicher dir die besten Zähne ohne dein Konto zu belasten.',
      link: '/zahn',
      delay: 0.2,
      buttonText: 'Zahnschutz aktivieren'
    },
    {
      icon: Building2,
      title: 'Stationäre Zusatzversicherung',
      description: 'Lass deine Gesundheit nicht vom Zufall abhängen. Wir garantieren dir die beste medizinische Versorgung und die Unterbringung im Einbettzimmer. Wenn es darauf ankommt, willst du keine Kompromisse machen.',
      link: '/stationaer',
      delay: 0.3,
      buttonText: 'Prüf deinen Tarif'
    },
    {
      icon: Heart,
      title: 'Tierkrankenversicherung',
      description: 'Die Kosten beim Tierarzt explodieren gerade. Schütze dein Haustier vor Schmerzen and dein Konto vor Operationen im vierstelligen Bereich. Entscheide dich immer für die beste Gesundheit und niemals nach dem Geldbeutel. Dein Tier verlässt sich auf dich.',
      link: '/tierkrankenversicherung',
      delay: 0.4,
      buttonText: 'Schütze dein Tier'
    }
  ];

  return (
    <section className="healio-section bg-white" id="services">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-healio-primary font-bold uppercase tracking-wider text-sm mb-3 block">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-healio-slate mb-6">
            Deine Gesundheit ist <TextHighlight>keine Glückssache</TextHighlight>
          </h2>
          <p className="text-lg text-healio-text-light leading-relaxed">
            Sichere Dir den Status eines Privatpatienten. Schütze Dein Vermögen vor hohen Zuzahlungen und garantiere Dir und Deiner Familie den Zugang zu den besten Spezialitäten.
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