
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Hero Bild – Fullscreen */}
      <div className="relative flex-1 flex items-center justify-center">
        <motion.img
          src="/hero-b2b.png"
          alt="HEALIO – Gesundheit fördern. Mitarbeiter binden. Steuern sparen. Unabhängige Experten für betriebliche Vorsorge und Zusatzversicherungen. Speicherstadt Hamburg."
          className="w-full h-screen object-cover object-[20%_center] bg-[#1a2332]"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Dezenter Gradient unten für Übergang */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a2332] to-transparent z-10" />

        {/* CTA Button über dem Bild */}
        <motion.div
          className="absolute bottom-16 left-0 right-0 z-20 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/terminvereinbarung"
            className="inline-block bg-[#25C990] hover:bg-[#1da877] text-white font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,201,144,0.39)] hover:shadow-[0_6px_20px_rgba(37,201,144,0.23)] hover:-translate-y-0.5"
          >
            Strategiegespräch sichern
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
