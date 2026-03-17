
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { 
      label: 'Leistungen', 
      to: '/leistungen',
      type: 'dropdown',
      subLinks: [
        { to: '/ambulant', label: 'Ambulante Zusatzversicherung' },
        { to: '/zahn', label: 'Zahnzusatzversicherung' },
        { to: '/stationaer', label: 'Stationäre Zusatzversicherung' },
        { to: '/tierkrankenversicherung', label: 'Tierkrankenversicherung' },
      ]
    },
    { to: '/partner', label: 'Partner', type: 'link' },
    { to: '/about', label: 'Über uns', type: 'link' },
    { to: '/kontakt', label: 'Kontakt', type: 'link' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      scrolled 
        ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-4" 
        : "bg-transparent py-6"
    )} role="banner">
      <nav className="healio-container flex items-center justify-between px-4 sm:px-6 md:px-8 w-full mx-auto">
        <Link to="/" className="flex items-center z-50 group">
          <img 
            src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/899be0558bfa4782d893bf77fe1fc5f1.png" 
            alt="Healio Logo" 
            className={cn(
              "h-10 md:h-12 w-auto transition-all duration-300",
              "brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            )}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li 
                key={link.label} 
                className="relative"
                ref={link.type === 'dropdown' ? dropdownRef : null}
                onMouseEnter={() => link.type === 'dropdown' && setDropdownOpen(true)}
                onMouseLeave={() => link.type === 'dropdown' && setDropdownOpen(false)}
              >
                {link.type === 'dropdown' ? (
                  <div className="flex items-center h-full py-2">
                    <Link 
                      to={link.to}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-healio-mint relative group text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                        (location.pathname.includes('/ambulant') || 
                         location.pathname.includes('/zahn') || 
                         location.pathname.includes('/stationaer') || 
                         location.pathname.includes('/tierkrankenversicherung') ||
                         location.pathname === '/leistungen') && "text-healio-mint font-bold"
                      )}
                    >
                      {link.label}
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className="ml-1 text-white hover:text-healio-mint drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      aria-label="Toggle dropdown"
                    >
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                    </button>
                    
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-2 z-[110] min-w-[280px]"
                        >
                          <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-2 flex flex-col gap-1 border border-slate-100 overflow-hidden">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.to}
                                to={subLink.to}
                                onClick={() => setDropdownOpen(false)}
                                className={cn(
                                  "px-4 py-3 text-sm rounded-lg transition-all duration-200",
                                  "text-gray-800 hover:bg-gray-100 hover:text-gray-900",
                                  location.pathname === subLink.to ? "bg-slate-50 text-emerald-600 font-semibold" : "font-medium"
                                )}
                              >
                                {subLink.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.type === 'link' ? (
                  <Link 
                    to={link.to} 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-healio-mint relative group text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                      location.pathname === link.to && "text-healio-mint font-bold"
                    )}
                  >
                    {link.label}
                    {location.pathname === link.to && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-healio-mint rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    )}
                  </Link>
                ) : (
                  <a 
                    href={link.to} 
                    className="text-sm font-medium transition-colors hover:text-healio-mint text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <Button 
            asChild
            className="bg-[#10B981] hover:bg-[#059669] text-white rounded-full px-6 shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-transform hover:scale-105 active:scale-95 border-0"
          >
            <Link to="/potenzialanalyse">
              Erstgespräch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 z-50 transition-colors text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-healio-mint"
          aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#1a1a2e]/95 backdrop-blur-md z-40 pt-28 px-6 lg:hidden flex flex-col items-center gap-6 h-screen overflow-y-auto pb-20"
            >
              <ul className="flex flex-col items-center gap-6 text-xl w-full">
                {navLinks.map((link) => (
                  <li key={link.label} className="w-full text-center">
                    {link.type === 'dropdown' ? (
                      <div className="flex flex-col items-center w-full">
                        <div className="flex items-center justify-center gap-2 w-full">
                          <Link 
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-medium hover:text-healio-mint transition-colors text-white"
                          >
                            {link.label}
                          </Link>
                          <button 
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            className="p-2 text-white hover:text-healio-mint"
                          >
                            <ChevronDown className={cn("w-5 h-5 transition-transform", mobileDropdownOpen && "rotate-180")} />
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {mobileDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="w-full flex flex-col items-center gap-4 mt-4 overflow-hidden"
                            >
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.to}
                                  to={subLink.to}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "text-lg transition-colors w-full",
                                    location.pathname === subLink.to ? "text-healio-mint font-bold" : "text-gray-300 hover:text-white"
                                  )}
                                >
                                  {subLink.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : link.type === 'link' ? (
                      <Link 
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block font-medium hover:text-healio-mint transition-colors w-full",
                          location.pathname === link.to ? "text-healio-mint font-bold" : "text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-white font-medium hover:text-healio-mint transition-colors w-full"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <Button 
                asChild
                className="w-full max-w-xs bg-[#10B981] hover:bg-[#059669] text-white py-6 text-lg shadow-xl shadow-[#10B981]/20 rounded-xl mt-6 border-0 shrink-0"
              >
                <Link to="/potenzialanalyse" onClick={() => setMobileMenuOpen(false)}>
                  Erstgespräch
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
