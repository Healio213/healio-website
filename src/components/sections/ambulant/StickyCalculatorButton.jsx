
import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyCalculatorButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Link
        to="/potenzialanalyse"
        className="flex items-center justify-center w-full md:w-auto bg-healio-primary text-white font-bold px-6 py-4 md:py-3 rounded-xl md:rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Tarif berechnen
      </Link>
    </div>
  );
};

export default StickyCalculatorButton;
