
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const DatenschutzPage = () => {
  const { t } = useTranslation('legal');
  const { t: tSeo } = useTranslation('seo');
  const { getPath, lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/privacy' : 'https://healio.de/datenschutz';
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createWebPageSchema(
        t('datenschutz.title'),
        tSeo('datenschutz.description'),
        canonicalUrl,
        lang === 'en' ? 'en-US' : 'de-DE',
      )
    ]
  };

  return (
    <>
      <SEOHead
        title={tSeo('datenschutz.title')}
        description={tSeo('datenschutz.description')}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <main className="min-h-screen bg-gray-50 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="healio-container"
        >
          <div className="max-w-4xl mx-auto bg-white p-5 sm:p-12 rounded-2xl shadow-sm border border-gray-100 break-words [&_h1]:[hyphens:auto] [&_h2]:[hyphens:auto]">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-healio-slate mb-6">{t('datenschutz.title')}</h1>

            <nav aria-label={t('impressum.breadcrumb')} className="mb-8 pb-8 border-b border-gray-100 text-sm">
              <Link to={getPath('home')} className="text-healio-primary hover:underline">{t('impressum.home')}</Link>
              {' / '}
              <Link to={getPath('impressum')} className="text-healio-primary hover:underline">{t('impressum.title')}</Link>
            </nav>

            <div className="prose prose-lg prose-gray max-w-none text-gray-700">
              <p className="lead text-xl text-gray-600 mb-8">
                {t('datenschutz.intro')}
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section1Title')}</h2>
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <p className="mb-2">{t('datenschutz.section1Text')}</p>
                <p className="font-medium text-gray-900">Healio GmbH</p>
                <p>Arndtstraße 6</p>
                <p>22085 Hamburg</p>
                <p className="mt-2">{t('impressum.phoneLabel')} +49 40 89755705</p>
                <p>{t('impressum.emailLabel')} info@healio.de</p>
              </div>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section2Title')}</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.serverLogs')}</h3>
              <p>{t('datenschutz.serverLogsText')}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.contactForm')}</h3>
              <p>{t('datenschutz.contactFormText')}</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.emailJsTitle')}</h3>
              <p>{t('datenschutz.emailJsText')}</p>
              <p className="mt-3">
                <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">
                  {t('datenschutz.emailJsPrivacyLink')}
                </a>
                {' · '}
                <a href="https://www.emailjs.com/legal/data-protection-agreement/" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">
                  {t('datenschutz.emailJsDpaLink')}
                </a>
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.servicesTitle')}</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.hostingTitle')}</h3>
              <p>{t('datenschutz.hostingText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.analyticsTitle')}</h3>
              <p>{t('datenschutz.analyticsText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.nitaTitle')}</h3>
              <p>{t('datenschutz.nitaText')}</p>
              <h3 id="whatsapp-kontakt" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">
                {lang === 'en' ? 'Contact via WhatsApp' : 'Kontakt über WhatsApp'}
              </h3>
              {lang === 'en' ? (
                <>
                  <p>
                    We provide a voluntary link to WhatsApp, a service provided in the European Region by WhatsApp Ireland Limited. Healio does not load WhatsApp code or transmit data to WhatsApp before you click the link. When you open the link, you leave our website. Depending on how you use the service, WhatsApp processes information such as your telephone number, profile and communication data as well as device, usage and connection data. Further information is available in the{' '}
                    <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">WhatsApp Privacy Policy</a>.
                  </p>
                  <p>
                    If you contact Healio through WhatsApp, WhatsApp/Meta and Twilio Ireland Limited transmit your sender details, message content, time and technical message identifiers to Healio. General text questions may be answered automatically by “Nita”, Healio’s digital assistant. For this purpose, the text is sent through the OpenAI API to OpenAI Ireland Limited. Nita identifies itself in generated replies as Healio’s digital assistant. The Healio service does not download submitted media and does not use tools, web search or persistent conversation memory.
                  </p>
                  <p>
                    The Healio application does not retain raw message texts, telephone numbers, media or generated answers after processing. It stores only pseudonymous identifiers for duplicate protection for up to seven days and a pseudonymous opt-out status after STOP until START or deletion. OpenAI requests are sent with storage disabled. OpenAI may nevertheless retain prompts and replies in abuse-monitoring logs for up to 30 days unless stricter data controls have been activated for the API project. WhatsApp/Meta and Twilio may process or retain communication and usage data under their own service rules. See the{' '}
                    <a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Twilio Privacy Notice</a>{' '}and the{' '}
                    <a href="https://platform.openai.com/docs/models/default-usage-policies-by-endpoint" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">OpenAI API data controls</a>.
                  </p>
                  <p>
                    We process the data to answer your voluntarily initiated request and to secure the channel. The legal basis is Article 6(1)(b) GDPR where the request concerns pre-contractual steps, and otherwise Article 6(1)(f) GDPR based on our legitimate interest in answering enquiries and preventing misuse. Providers and subprocessors may process data outside the EEA. Depending on the provider and transfer, safeguards may include adequacy decisions, standard contractual clauses or binding corporate rules. You can contact us equally by telephone, email or the contact form.
                  </p>
                  <p>
                    Please do not send health data, patient data, insurance numbers, diagnoses, findings, invoices, photographs, voice messages or documents through WhatsApp. A keyword filter cannot reliably recognise every sensitive statement. Messages recognised as sensitive, media and requests for a human contact bypass the AI and receive a fixed information response; no employee is automatically notified and no callback is commissioned.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Wir stellen freiwillig einen Link zu WhatsApp bereit. Anbieter in der Europäischen Region ist die WhatsApp Ireland Limited. Vor Ihrem Klick lädt Healio keinen WhatsApp-Code und übermittelt keine Daten an WhatsApp. Mit dem Öffnen des Links verlassen Sie unsere Website. WhatsApp verarbeitet je nach Nutzung insbesondere Ihre Telefonnummer, Profil- und Kommunikationsdaten sowie Geräte-, Nutzungs- und Verbindungsdaten. Weitere Informationen finden Sie in der{' '}
                    <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Datenschutzerklärung von WhatsApp</a>.
                  </p>
                  <p>
                    Wenn Sie Healio über WhatsApp kontaktieren, übermitteln WhatsApp/Meta und die Twilio Ireland Limited Ihre Absenderangaben, den Nachrichteninhalt, den Zeitpunkt und technische Nachrichtenkennungen an Healio. Allgemeine Textfragen können automatisiert durch „Nita“, die digitale Assistenz von Healio, beantwortet werden. Dafür wird der Text über die OpenAI-API an die OpenAI Ireland Limited übermittelt. Nita kennzeichnet generierte Antworten als digitale Assistenz von Healio. Der Healio-Dienst lädt eingesandte Medien nicht herunter und nutzt weder Werkzeuge noch Websuche oder ein dauerhaftes Gesprächsgedächtnis.
                  </p>
                  <p>
                    Die Healio-Anwendung speichert nach der Verarbeitung keine Klartexte der Nachrichten, Telefonnummern, Medien oder generierten Antworten. Gespeichert werden nur pseudonyme Kennungen zum Schutz vor Doppelverarbeitung für bis zu sieben Tage sowie nach STOP ein pseudonymer Sperrstatus bis START oder Löschung. OpenAI-Anfragen werden mit deaktivierter Speicherung gesendet. OpenAI kann Eingaben und Antworten dennoch standardmäßig bis zu 30 Tage in Protokollen zur Missbrauchserkennung aufbewahren, sofern für das API-Projekt keine strengeren Datenkontrollen aktiviert wurden. WhatsApp/Meta und Twilio können Kommunikations- und Nutzungsdaten nach ihren eigenen Dienstregeln verarbeiten oder speichern. Weitere Informationen finden Sie in der{' '}
                    <a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Datenschutzerklärung von Twilio</a>{' '}und den{' '}
                    <a href="https://platform.openai.com/docs/models/default-usage-policies-by-endpoint" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Datenkontrollen der OpenAI-API</a>.
                  </p>
                  <p>
                    Wir verarbeiten die Angaben zur Beantwortung Ihrer freiwillig veranlassten Anfrage und zur Absicherung des Kanals. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Maßnahmen geht, andernfalls Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an der Bearbeitung von Anfragen und der Missbrauchsvermeidung. Anbieter und Unterauftragnehmer können Daten außerhalb des EWR verarbeiten. Je nach Anbieter und Übermittlung kommen dabei insbesondere Angemessenheitsbeschlüsse, Standardvertragsklauseln oder verbindliche interne Datenschutzvorschriften als Schutzmechanismen in Betracht. Telefon, E-Mail und Kontaktformular stehen gleichwertig zur Verfügung.
                  </p>
                  <p>
                    Bitte senden Sie über WhatsApp keine Gesundheitsdaten, Patientendaten, Versicherungsnummern, Diagnosen, Befunde, Rechnungen, Fotos, Sprachnachrichten oder Dokumente. Ein Stichwortfilter kann nicht jede sensible Angabe zuverlässig erkennen. Als sensibel erkannte Nachrichten, Medien und der Wunsch nach einem persönlichen Kontakt umgehen die KI und erhalten eine feste Hinweisantwort; ein Mitarbeiter wird dadurch nicht automatisch informiert und es wird kein Rückruf beauftragt.
                  </p>
                </>
              )}
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.calendlyTitle')}</h3>
              <p>{t('datenschutz.calendlyText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.brevoTitle')}</h3>
              <p>{t('datenschutz.brevoText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.insurerFlowsTitle')}</h3>
              <p>{t('datenschutz.insurerFlowsText')}</p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section3Title')}</h2>
              <p>{t('datenschutz.section3Text')}</p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section4Title')}</h2>
              <p>{t('datenschutz.section4Text')}</p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section5Title')}</h2>
              <p>
                {t('datenschutz.section5Text')}
                <br /><br />
                <strong>{t('datenschutz.emailLabel')}</strong> <a href="mailto:info@healio.de" className="text-healio-primary hover:underline">info@healio.de</a>
              </p>

              <p className="mt-12 text-sm text-gray-500 pt-8 border-t border-gray-100">{t('datenschutz.lastUpdated')}</p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default DatenschutzPage;
