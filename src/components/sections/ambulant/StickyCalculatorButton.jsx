
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
      <a
        href="https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant,Station%C3%A4r&agentId1=901334&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDE3NjI0MTUzMTg4IiwiZW1haWwiOiJpbmZvQGhlYWxpby5kZSJ9&remarks=IkJlaSBS/GNrZnJhZ2VuIHNpbmQgd2lyIGdlcm5lIGb8ciBTaWUgZGEuIg==&defaultContact=false&employeeInsurance=NOT_BKV"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full md:w-auto bg-healio-primary text-white font-bold px-6 py-4 md:py-3 rounded-xl md:rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Tarif berechnen
      </a>
    </div>
  );
};

export default StickyCalculatorButton;
