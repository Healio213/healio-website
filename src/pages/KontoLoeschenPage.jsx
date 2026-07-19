import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

const KontoLoeschenPage = () => {
  return (
    <>
      <SEOHead
        title="Konto löschen | HEALIO"
        description="So kannst du dein HEALIO Konto und alle zugehörigen Daten löschen."
        canonicalUrl="https://healio.de/konto-loeschen"
      />
      <main className="min-h-screen bg-gray-50 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8 sm:p-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Konto löschen
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Du kannst dein HEALIO Konto jederzeit löschen. Alle persönlichen Daten,
              eingereichten Rechnungen, Chat-Verläufe und zugehörigen Informationen
              werden unwiderruflich entfernt.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-900 mb-4">
                In der HEALIO App (empfohlen)
              </h2>
              <ol className="space-y-2 text-gray-700 list-decimal pl-5">
                <li>Öffne die HEALIO App auf deinem Smartphone</li>
                <li>Tippe auf <strong>Einstellungen</strong></li>
                <li>Scrolle nach unten und tippe auf <strong>Konto löschen</strong></li>
                <li>Bestätige die Löschung mit <strong>Konto endgültig löschen</strong></li>
              </ol>
              <p className="text-sm text-gray-600 mt-4">
                Das Konto und alle Daten werden sofort und vollständig gelöscht.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Per E-Mail
              </h2>
              <p className="text-gray-700 mb-4">
                Wenn du keine App installiert hast oder Probleme mit der Löschung hast,
                schreib uns einfach eine E-Mail an:
              </p>
              <a
                href="mailto:info@healio.de?subject=Konto%20l%C3%B6schen"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                info@healio.de
              </a>
              <p className="text-sm text-gray-600 mt-4">
                Bitte schreib in der E-Mail, dass du dein Konto löschen möchtest und
                gib deine registrierte E-Mail-Adresse an. Wir löschen dein Konto
                innerhalb von 7 Werktagen.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Welche Daten werden gelöscht?
              </h2>
              <ul className="space-y-2 text-gray-700 list-disc pl-5">
                <li>Dein Nutzerprofil (Name, E-Mail, Adresse, Telefonnummer)</li>
                <li>Alle eingereichten Rechnungen und dazugehörige Fotos</li>
                <li>Chat-Verlauf mit Nita</li>
                <li>Empfehlungscode und Lead-Verlauf</li>
                <li>Auszahlungsanfragen (bereits abgerechnete Zahlungen bleiben aus steuerrechtlichen Gründen gespeichert)</li>
                <li>Flyer-Bestellungen (aus buchhalterischen Gründen bleiben Rechnungen 10 Jahre gespeichert)</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Einzelne Daten löschen
              </h2>
              <p className="text-gray-700">
                Du kannst auch nur einzelne Daten entfernen lassen, ohne dein gesamtes
                Konto zu löschen. Schreib uns dazu einfach eine E-Mail an{' '}
                <a href="mailto:info@healio.de" className="text-green-600 hover:underline">
                  info@healio.de
                </a>{' '}
                und beschreib, welche Daten wir für dich löschen sollen.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8 text-sm text-gray-500">
              <p>
                HEALIO GmbH · Arndtstraße 6 · 22085 Hamburg ·{' '}
                <a href="/datenschutz" className="text-green-600 hover:underline">
                  Datenschutzerklärung
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default KontoLoeschenPage;
