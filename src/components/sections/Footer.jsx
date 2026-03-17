
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-healio-slate text-white py-12 mt-auto">
      <div className="healio-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Healio</h3>
            <p className="text-gray-300 text-sm">
              Ihre Experten für betriebliche Altersvorsorge und Krankenversicherung.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Über uns</Link></li>
              <li><Link to="/leistungen" className="hover:text-white transition-colors">Leistungen</Link></li>
              <li><Link to="/partner" className="hover:text-white transition-colors">Partner</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="mailto:info@healio.de" className="hover:text-white transition-colors">info@healio.de</a></li>
              <li><a href="tel:+494089755705" className="hover:text-white transition-colors">+49 40 89755705</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link to="/agb" className="hover:text-white transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Healio GmbH. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
