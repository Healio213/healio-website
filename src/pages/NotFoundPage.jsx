import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Home, Calculator } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Seite nicht gefunden | Healio</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="text-center max-w-xl">
          <p className="text-7xl font-extrabold text-healio-primary mb-4">404</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 break-words hyphens-auto">
            Diese Seite gibt es nicht (mehr).
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Kein Problem: Dein Gesundheitsbudget findest du trotzdem. Rechne es dir direkt aus oder starte auf der Startseite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#25c990] hover:bg-[#1db37f] text-white px-6 py-5 h-auto rounded-xl">
              <Link to="/ambulant">
                <Calculator className="w-4 h-4 mr-2" aria-hidden="true" />
                Gesundheitsbudget berechnen
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-5 h-auto rounded-xl">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Zur Startseite
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
