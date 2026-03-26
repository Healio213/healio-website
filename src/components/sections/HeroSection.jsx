
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col overflow-hidden bg-[#1a2332]">
      {/* === DESKTOP VERSION === */}
      <div className="hidden md:block relative min-h-screen">
        <motion.img
          src="/hero-b2b.png"
          alt="HEALIO – Gesundheit fördern. Mitarbeiter binden. Steuern sparen. Unabhängige Experten für betriebliche Vorsorge und Zusatzversicherungen. Speicherstadt Hamburg."
          className="w-full h-screen object-cover object-[20%_center]"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a2332] to-transparent z-10" />
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

      {/* === MOBILE VERSION === */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Navbar Platz */}
        <div className="h-16" />

        {/* Bild – volle Breite, komplett sichtbar */}
        <motion.img
          src="/hero-b2b.png"
          alt="HEALIO – Gesundheit fördern. Mitarbeiter binden. Steuern sparen."
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />

        {/* Text + CTA unter dem Bild */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
          <motion.h1
            className="text-2xl font-bold text-white mb-3 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Machen Sie das Finanzamt zum Sponsor Ihrer Mitarbeiterloyalität.
          </motion.h1>
          <motion.p
            className="text-sm text-gray-300 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Unabhängige Experten für betriebliche Vorsorge & Zusatzversicherungen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              to="/terminvereinbarung"
              className="inline-block w-full bg-[#25C990] hover:bg-[#1da877] text-white font-semibold text-base px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,201,144,0.39)]"
            >
              Strategiegespräch sichern
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
