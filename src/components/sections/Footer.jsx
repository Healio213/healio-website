
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = ({ hideCta = false }) => {
  const { t } = useTranslation('common');
  const { getPath } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-8 mt-auto relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-healio-primary/40 to-transparent"></div>

      <div className="healio-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Healio</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              {t('footer.disclaimer')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to={getPath('about')} className="hover:text-healio-primary transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to={getPath('leistungen')} className="hover:text-healio-primary transition-colors">{t('footer.leistungen')}</Link></li>
              <li><Link to={getPath('partner')} className="hover:text-healio-primary transition-colors">{t('footer.partner')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="mailto:kontakt@healio.de" className="hover:text-healio-primary transition-colors">kontakt@healio.de</a></li>
              <li><a href="tel:+494089755705" className="hover:text-healio-primary transition-colors">+49 40 89755705</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.legal')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to={getPath('impressum')} className="hover:text-healio-primary transition-colors">{t('footer.impressum')}</Link></li>
              <li><Link to={getPath('datenschutz')} className="hover:text-healio-primary transition-colors">{t('footer.datenschutz')}</Link></li>
              <li><Link to={getPath('agb')} className="hover:text-healio-primary transition-colors">{t('footer.agb')}</Link></li>
              <li><Link to={getPath('erstinformation')} className="hover:text-healio-primary transition-colors">{t('footer.erstinformation')}</Link></li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        {!hideCta && (
          <div className="bg-gradient-to-r from-healio-primary/10 to-emerald-500/10 border border-healio-primary/20 rounded-2xl p-8 lg:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{t('footer.ctaTitle')}</h3>
              <p className="text-slate-400">{t('footer.ctaSubtitle')}</p>
            </div>
            <Link
              to={getPath('terminvereinbarung')}
              className="inline-block bg-healio-primary hover:bg-[#1da877] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_6px_20px_rgba(37,201,144,0.3)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t('footer.ctaButton')}
            </Link>
          </div>
        )}

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
