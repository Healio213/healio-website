
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Calculator, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';

const AMBULANT_CTA_DELAY_MS = 30_000;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [ambulantCtaReady, setAmbulantCtaReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const location = useLocation();
  const { t } = useTranslation('common');
  const { lang, getPath, switchLanguage } = useLanguage();
  const referrer = useReferrer();
  const isHome = location.pathname === '/' || location.pathname === '/en';
  const isAmbulant = location.pathname === '/ambulant' || location.pathname === '/en/outpatient';
  const isCompany = location.pathname === '/unternehmen'
    || location.pathname === '/en/companies'
    || location.pathname === '/unternehmen/vorsorge-rechner'
    || location.pathname === '/en/companies/pension-calculator';
  const isPartner = location.pathname === '/partner' || location.pathname === '/en/partner';
  const solidHeaderRoutes = [
    '/kontakt', '/en/contact',
    '/terminvereinbarung', '/en/appointment',
    '/impressum', '/en/legal-notice',
    '/agb', '/en/terms',
    '/datenschutz', '/en/privacy',
    '/erstinformation', '/en/initial-information',
    '/konto-loeschen',
    '/blog', '/en/blog',
    '/potenzialanalyse', '/en/potential-analysis',
    '/unternehmen/vorsorge-rechner', '/en/companies/pension-calculator',
  ];
  const forceSolidHeader = solidHeaderRoutes.some((path) => (
    location.pathname === path || location.pathname.startsWith(`${path}/`)
  ));
  const showSolidHeader = scrolled || forceSolidHeader;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setAmbulantCtaReady(false);
    if (!isAmbulant) return undefined;

    const timer = window.setTimeout(() => {
      setAmbulantCtaReady(true);
    }, AMBULANT_CTA_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [isAmbulant, location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    root.classList.add('healio-mobile-menu-active');
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setMobileMenuOpen(false);
      window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      root.classList.remove('healio-mobile-menu-active');
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

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
      label: t('nav.versicherungen'),
      to: getPath('leistungen'),
      type: 'dropdown',
      subLinks: [
        { to: getPath('ambulant'), label: t('nav.ambulant') },
        { to: getPath('zahn'), label: t('nav.zahn') },
        { to: getPath('stationaer'), label: t('nav.stationaer') },
        { to: getPath('tierkrankenversicherung'), label: t('nav.tier') },
      ]
    },
    {
      to: getPath('kassenbonus'),
      label: t('nav.kassenboost'),
      type: 'link',
      feature: 'kassenboost',
    },
    { to: getPath('unternehmen'), label: t('nav.unternehmen'), type: 'link' },
    { to: getPath('partner'), label: t('nav.partner'), type: 'link' },
    { to: getPath('about'), label: t('nav.about'), type: 'link' },
    { to: getPath('kontakt'), label: t('nav.kontakt'), type: 'link' },
  ];

  const ctaLabel = isHome
    ? t('nav.schutzWaehlen')
    : isCompany
      ? t('nav.potenzialanalyse')
      : isPartner
        ? t('nav.kennenlernen')
        : t('nav.beratung');

  const ctaPath = isCompany ? getPath('potenzialanalyse') : getPath('terminvereinbarung');
  const ambulantSdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out",
      showSolidHeader
        ? "bg-slate-900/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3"
        : "bg-transparent py-5"
    )} role="banner">
      <nav className="healio-container flex items-center justify-between px-4 sm:px-6 md:px-8 w-full mx-auto">
        <Link to={getPath('home')} className="flex items-center z-50 group">
          <motion.img
            src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/899be0558bfa4782d893bf77fe1fc5f1.png"
            alt="Healio Logo"
            className={cn(
              "w-auto transition-all duration-500",
              showSolidHeader ? "h-8 md:h-10" : "h-10 md:h-12",
              "brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
          <ul className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
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
                        (location.pathname.includes('/ambulant') || location.pathname.includes('/outpatient') ||
                         location.pathname.includes('/zahn') || location.pathname.includes('/dental') ||
                         location.pathname.includes('/stationaer') || location.pathname.includes('/inpatient') ||
                         location.pathname.includes('/tierkrankenversicherung') || location.pathname.includes('/pet-insurance') ||
                         location.pathname === '/leistungen' || location.pathname === '/en/services') && "text-healio-mint font-bold"
                      )}
                    >
                      {link.label}
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className="ml-1 inline-flex h-11 w-11 items-center justify-center text-white hover:text-healio-mint drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      aria-label={t('nav.toggleDropdown')}
                      aria-expanded={dropdownOpen}
                      aria-controls="insurance-dropdown-desktop"
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
                          id="insurance-dropdown-desktop"
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
                      "relative group text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-healio-mint",
                      link.feature === 'kassenboost'
                        ? "inline-flex min-h-9 items-center gap-2 rounded-full border border-healio-mint/50 bg-slate-950/25 px-3 text-healio-mint shadow-[0_5px_16px_rgba(7,17,31,0.18)] hover:border-healio-mint hover:bg-slate-950/40"
                        : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-healio-mint",
                      location.pathname === link.to && (link.feature === 'kassenboost'
                        ? "border-healio-mint bg-healio-mint text-slate-950 font-bold"
                        : "text-healio-mint font-bold")
                    )}
                  >
                    {link.feature === 'kassenboost' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" aria-hidden="true" />
                    )}
                    {link.label}
                    {location.pathname === link.to && link.feature !== 'kassenboost' && (
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
          <button
            onClick={switchLanguage}
            className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40"
            aria-label={lang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
          >
            {t('langSwitch')}
          </button>
          {isAmbulant ? (
            <AnimatePresence initial={false}>
              {showSolidHeader && ambulantCtaReady && (
                <motion.a
                  href={ambulantSdkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSdkClick('ambulant-header-desktop', referrer)}
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  data-ambulant-header-cta="desktop"
                  className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#10B981] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-colors hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
                  {lang === 'de' ? 'Beitrag berechnen' : 'Quote (German form)'}
                </motion.a>
              )}
            </AnimatePresence>
          ) : (
            <Button
              asChild
              className="bg-[#10B981] hover:bg-[#059669] text-white rounded-full px-6 shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-transform hover:scale-105 active:scale-95 border-0"
            >
              {isHome ? (
                <a href="#schutz">
                  {ctaLabel}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              ) : (
                <Link to={ctaPath}>
                  {ctaLabel}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              )}
            </Button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {isAmbulant && showSolidHeader && ambulantCtaReady && (
            <motion.a
              href={ambulantSdkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSdkClick('ambulant-header-mobile', referrer)}
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              data-ambulant-header-cta="mobile"
              className="absolute right-[4.5rem] z-50 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-healio-primary px-3 text-xs font-bold text-white shadow-[0_4px_14px_rgba(16,185,129,0.28)] transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
              aria-label={lang === 'de' ? 'Beitrag berechnen' : 'Get quote – German form'}
            >
              <Calculator className="h-4 w-4" aria-hidden="true" />
              <span className="min-[390px]:hidden">{lang === 'de' ? 'Beitrag' : 'Quote DE'}</span>
              <span className="hidden min-[390px]:inline">{lang === 'de' ? 'Beitrag berechnen' : 'Quote (German)'}</span>
            </motion.a>
          )}
        </AnimatePresence>

        <button
          ref={mobileMenuButtonRef}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center z-50 transition-colors text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-healio-mint"
          aria-label={mobileMenuOpen ? t('aria.menuClose') : t('aria.menuOpen')}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
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
                            className="inline-flex h-11 w-11 items-center justify-center text-white hover:text-healio-mint"
                            aria-label={t('nav.toggleDropdown')}
                            aria-expanded={mobileDropdownOpen}
                            aria-controls="insurance-dropdown-mobile"
                          >
                            <ChevronDown className={cn("w-5 h-5 transition-transform", mobileDropdownOpen && "rotate-180")} />
                          </button>
                        </div>

                        <AnimatePresence>
                          {mobileDropdownOpen && (
                            <motion.div
                              id="insurance-dropdown-mobile"
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
                          "font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-healio-mint",
                          link.feature === 'kassenboost'
                            ? "inline-flex min-h-11 w-auto items-center justify-center gap-2 rounded-full border border-healio-mint/60 bg-white/5 px-5 text-healio-mint hover:bg-white/10"
                            : "block w-full hover:text-healio-mint",
                          location.pathname === link.to
                            ? (link.feature === 'kassenboost' ? "bg-healio-mint text-slate-950 font-bold" : "text-healio-mint font-bold")
                            : (link.feature === 'kassenboost' ? "text-healio-mint" : "text-white")
                        )}
                      >
                        {link.feature === 'kassenboost' && (
                          <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" aria-hidden="true" />
                        )}
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
              <button
                onClick={() => { switchLanguage(); setMobileMenuOpen(false); }}
                className="text-lg font-semibold text-white/80 hover:text-white transition-colors px-6 py-2 rounded-full border border-white/20 hover:border-white/40"
              >
                {t('langSwitch')}
              </button>
              <Button
                asChild
                className="w-full max-w-xs bg-[#10B981] hover:bg-[#059669] text-white py-6 text-lg shadow-xl shadow-[#10B981]/20 rounded-xl mt-6 border-0 shrink-0"
              >
                {isHome ? (
                  <a href="#schutz" onClick={() => setMobileMenuOpen(false)}>
                    {ctaLabel}
                  </a>
                ) : (
                  <Link to={ctaPath} onClick={() => setMobileMenuOpen(false)}>
                    {ctaLabel}
                  </Link>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
