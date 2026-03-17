
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const VeterinaryHero = () => {
  const heroImageUrl = "https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/508591fd10937d976179573701053d1f.png";

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden w-full" aria-labelledby="vet-hero-heading">
      {/* Background Image spanning full viewport height */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <OptimizedImage 
          src={heroImageUrl} 
          alt="Frau umarmt ihren Golden Retriever" 
          lazy={false}
          priority={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Horizontal Gradient Overlay (Left to Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 sm:from-slate-900/60 via-slate-900/40 sm:via-slate-900/30 to-transparent z-10" />
        
        {/* Vertical Gradient Overlay (Top to Bottom) - Ensures Header Transparency & Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/10 to-transparent z-10 h-40" />
        
        <div className="absolute inset-0 bg-amber-900/5 mix-blend-overlay z-10" aria-hidden="true" />
      </div>

      {/* Content wrapper with added top padding to clear the transparent header */}
      <div className="healio-container relative z-20 w-full pt-32 pb-12 sm:pt-40 sm:pb-20 px-4 sm:px-6 md:px-8 mt-12 sm:mt-0">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4 sm:mb-6 shadow-lg">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
              <span className="text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm">GOT-konformer Schutz</span>
            </div>

            <h1 
              id="vet-hero-heading" 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] break-words hyphens-auto"
              lang="de"
            >
              Seit der GOT-Reform: <br />
              <span className="text-blue-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Veterinärmedizin hat</span> <br />
              einen neuen Preis.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium">
              Wer heute keinen Versicherungsschutz hat, entscheidet im Ernstfall nicht nach Medizin — sondern nach Budget. Das muss nicht sein.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] transition-all duration-300 border-0 w-full sm:w-auto"
                onClick={() => document.getElementById('vet-contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Beitrag berechnen
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="outline"
                className="bg-white/10 hover:bg-white/20 sm:bg-white/10 sm:hover:bg-white/20 text-white border-white/20 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-md transition-all duration-300 shadow-xl w-full sm:w-auto"
                onClick={() => document.getElementById('vet-analysis')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Kostenanalyse
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VeterinaryHero;
