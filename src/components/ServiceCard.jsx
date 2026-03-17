
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ icon: Icon, title, description, link, delay = 0, buttonText = "Mehr erfahren" }) => {
  // Logic to determine target URLs based on the link prop
  const isTargetAmbulant = 
    link === '/ambulant' || 
    link === '/Ambulante-zusatzversicherung' || 
    link === 'https://healio.de' || 
    link === 'https://healio.de/ambulant' ||
    link === 'https://ambulant.healio.de' ||
    link === 'https://ambulant.healio.de/' ||
    link === 'https://healio-de-741676.hostingersite.com/ambulant';
    
  const isTargetZahn = link === '/zahn' || link === '/zahnzusatz' || link === '/healio-zahnzusatz';
  const isTargetStationaer = link === '/stationaer';
    
  let targetLink = link;
  let displayButtonText = buttonText;

  if (isTargetAmbulant) {
    targetLink = 'https://healio.de/ambulant';
    displayButtonText = 'Prüf deinen Tarif';
  } else if (isTargetZahn) {
    targetLink = 'https://a1cb5eb5-2a0a-4a64-9318-bf32833dca0d.app-preview.com/healio-zahnzusatz';
  } else if (isTargetStationaer) {
    targetLink = 'https://a1cb5eb5-2a0a-4a64-9318-bf32833dca0d.app-preview.com/klinik-upgrade';
  }
  
  const isExternal = targetLink.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-2xl p-6 md:p-8 border border-healio-gray/20 shadow-lg hover:shadow-xl hover:border-healio-primary/30 transition-all duration-300 h-full flex flex-col"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-healio-mint/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

      {/* Header Section: Icon */}
      <div className="relative z-10 mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-healio-mint/50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 group-hover:bg-healio-primary group-hover:shadow-md">
          <Icon className="w-7 h-7 md:w-8 md:h-8 text-healio-primary group-hover:text-white transition-colors duration-300" />
        </div>
      </div>

      {/* Content Section: Title & Description */}
      <div className="relative z-10 flex-1 flex flex-col gap-3 md:gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-healio-slate leading-tight group-hover:text-healio-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-base text-healio-text-light leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Footer Section: Action Button */}
      <div className="relative z-10 mt-auto pt-2">
        <Button 
          asChild 
          variant="ghost" 
          className="group/btn p-0 hover:bg-transparent hover:text-healio-primary-dark text-healio-primary font-semibold text-base md:text-lg h-auto tracking-tight"
        >
          {isExternal ? (
            <a 
              href={targetLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2"
            >
              {displayButtonText}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <a href={targetLink} className="flex items-center gap-2">
              {displayButtonText}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
