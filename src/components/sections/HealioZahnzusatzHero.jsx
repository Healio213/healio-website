import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const HealioZahnzusatzHero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Lightened Overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1642977109715-b0745ad34c34" 
          alt="Strahlendes Lächeln" 
          lazy={true}
          priority={false}
          className="absolute inset-0"
        />
        {/* Lightened overlay from 80/50 to 40/20 for better background visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10" />
      </div>

      <div className="healio-container relative z-20 w-full">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Schluss mit hohen Zahnarzt-Rechnungen. <span className="text-emerald-400">Sichern Sie sich Privatpatienten-Status</span> beim Zahnarzt.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Egal ob Implantate, Kronen oder professionelle Zahnreinigung: Wir übernehmen die Kosten, die Ihre Krankenkasse nicht zahlt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
            >
              Jetzt Tarif berechnen
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealioZahnzusatzHero;