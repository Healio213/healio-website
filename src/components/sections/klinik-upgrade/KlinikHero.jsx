import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const KlinikHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1584516150909-c43483ee7932" 
          alt="Professional doctor consulting with patient" 
          lazy={true}
          priority={false}
          className="absolute inset-0"
        />
        {/* Lightened Gradient Overlay - Reduced opacity for transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/60 via-[#1E3A5F]/30 to-transparent z-[1]" />
      </div>

      <div className="healio-container relative z-10 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Privatpatienten-Status
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
              Stationärer Komfort als Patientenrecht. <br />
              <span className="text-blue-100">
                Finanzierbar durch Bonus Strategie.
              </span>
            </h1>
            
            <p className="text-xl text-white max-w-2xl mb-10 font-medium leading-relaxed border-l-4 border-blue-400 pl-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Wie Sie trotz Vorerkrankung oder BMI Themen den Status eines Privatpatienten im Krankenhaus erhalten. Finanziert durch Ihre Krankenkasse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => document.getElementById('analyse').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[#1E3A5F] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-xl transition-all flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                Anspruch prüfen
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KlinikHero;