
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hintergrundbild */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      />

      {/* Dunkler Overlay für Lesbarkeit */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,35,50,0.5) 0%, rgba(26,35,50,0.3) 40%, rgba(26,35,50,0.6) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 sm:px-8 max-w-5xl mx-auto">
        {/* HEALIO Logo */}
        <motion.img
          src="/healio-logo-white.svg"
          alt="HEALIO"
          className="w-64 sm:w-80 md:w-[420px] lg:w-[500px] h-auto mb-6 md:mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />

        {/* Haupttext */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Gesundheit fördern. Mitarbeiter binden. Steuern sparen.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-2 md:mb-3 leading-relaxed drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          Machen Sie das Finanzamt zum Sponsor Ihrer Mitarbeiterloyalität.
        </motion.p>

        <motion.p
          className="text-sm sm:text-base text-gray-300 mb-8 md:mb-10 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Unabhängige Experten für betriebliche Vorsorge & Zusatzversicherungen.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/terminvereinbarung"
            className="inline-block bg-[#25C990] hover:bg-[#1da877] text-white font-semibold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,201,144,0.39)] hover:shadow-[0_6px_20px_rgba(37,201,144,0.23)] hover:-translate-y-0.5"
          >
            Strategiegespräch sichern
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
