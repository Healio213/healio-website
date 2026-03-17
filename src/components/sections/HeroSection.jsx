
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Updated to professional business handshake */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1686771416282-3888ddaf249b")' 
        }}
      />
      
      {/* Dark Overlay with Gradient */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(26,35,50,0.92) 0%, rgba(26,35,50,0.85) 50%, rgba(26,35,50,0.92) 100%)'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center text-center pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Machen Sie das Finanzamt zum Sponsor Ihrer Mitarbeiterloyalität.
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed opacity-90 font-light"
          >
            Clevere Arbeitgeber verwandeln unvermeidbare Abgaben in wertvolle Gesundheitsbudgets. Das Ergebnis ist maximale Bindung Ihrer Leistungsträger bei minimalen Kosten. Nutzen Sie das System zu Ihrem Vorteil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link 
              to="/terminvereinbarung"
              className="inline-block bg-[#25C990] hover:bg-[#1da877] text-white font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,201,144,0.39)] hover:shadow-[0_6px_20px_rgba(37,201,144,0.23)] hover:-translate-y-0.5"
            >
              Strategiegespräch sichern
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
