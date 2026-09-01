
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
      createWebPageSchema(t('datenschutz.title'), tSeo('datenschutz.description'))
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
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section1Title')}</h2>
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <p className="mb-2">{t('datenschutz.section1Text')}</p>
                <p className="font-medium text-gray-900">Healio GmbH</p>
                <p>Arndtstraße 6</p>
                <p>22085 Hamburg</p>
                <p className="mt-2">Telefon: +49 40 89755705</p>
                <p>E-Mail: info@healio.de</p>
              </div>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section2Title')}</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.serverLogs')}</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.contactForm')}</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">Eingesetzte Dienste und Drittanbieter</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">Hosting und Auslieferung (Vercel, Cloudflare)</h3>
              <p>
                Diese Website wird bei Vercel Inc. (USA) gehostet und über das Content-Delivery-Netzwerk von Cloudflare Inc. (USA) ausgeliefert. Dabei werden technisch notwendige Verbindungsdaten (u. a. IP-Adresse) verarbeitet, um die Seite bereitzustellen und vor Angriffen zu schützen. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und performanten Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Mit beiden Anbietern bestehen Auftragsverarbeitungsverträge mit EU-Standardvertragsklauseln.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Google Analytics 4</h3>
              <p>
                Wir verwenden Google Analytics 4 (Google Ireland Ltd.), um die Nutzung unserer Website statistisch auszuwerten (z. B. aufgerufene Seiten, Verweildauer). IP-Adressen werden von Google Analytics 4 nicht gespeichert. Die gewonnenen Statistiken helfen uns, unser Angebot zu verbessern. Sie können der Erfassung jederzeit widersprechen, etwa über Browser-Einstellungen, Tracking-Schutz oder Browser-Add-ons zur Deaktivierung von Google Analytics.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Nita, unser KI-Assistent (ElevenLabs)</h3>
              <p>
                Auf unseren Seiten kann ein Sprach- bzw. Chat-Assistent ("Nita") eingebunden sein, der über die Plattform ElevenLabs Inc. (USA) betrieben wird. Wenn Sie den Assistenten aktiv nutzen, werden Ihre Eingaben bzw. Ihre Sprache zur Beantwortung an ElevenLabs übertragen. Die Nutzung ist freiwillig; ohne aktive Nutzung werden keine Gesprächsdaten übertragen. Bitte teilen Sie dem Assistenten keine sensiblen Gesundheitsdaten mit, eine persönliche Beratung erfolgt über unsere genannten Kontaktwege.
              </p>
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
                    If you contact Healio through WhatsApp, WhatsApp/Meta and Twilio Ireland Limited transmit your sender details, message content, time and technical message identifiers to Healio. General text questions may be answered automatically by “Nita”, our AI assistant. For this purpose, the text is sent through the OpenAI API to OpenAI Ireland Limited. Nita identifies itself in generated replies as “Nita (AI)”. The Healio service does not download submitted media and does not use tools, web search or persistent conversation memory.
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
                    Wenn Sie Healio über WhatsApp kontaktieren, übermitteln WhatsApp/Meta und die Twilio Ireland Limited Ihre Absenderangaben, den Nachrichteninhalt, den Zeitpunkt und technische Nachrichtenkennungen an Healio. Allgemeine Textfragen können automatisiert durch „Nita“, unsere KI-Assistentin, beantwortet werden. Dafür wird der Text über die OpenAI-API an die OpenAI Ireland Limited übermittelt. Nita kennzeichnet generierte Antworten mit „Nita (KI)“. Der Healio-Dienst lädt eingesandte Medien nicht herunter und nutzt weder Werkzeuge noch Websuche oder ein dauerhaftes Gesprächsgedächtnis.
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
              <h3 className="text-xl font-semibold mt-6 mb-3">Terminbuchung (Calendly)</h3>
              <p>
                Für die Online-Terminbuchung nutzen wir Calendly LLC (USA). Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, gewählter Termin) an Calendly übertragen und uns bereitgestellt. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">E-Mail-Kommunikation (Brevo)</h3>
              <p>
                Für den Versand von Informations-E-Mails nutzen wir Brevo (Sendinblue GmbH, Deutschland). Ihre E-Mail-Adresse wird dafür nur verwendet, wenn Sie eingewilligt haben oder eine Geschäftsbeziehung besteht; Sie können sich jederzeit über den Abmeldelink austragen.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Externe Abschlussstrecken der Versicherer</h3>
              <p>
                Für Beitragsrechner und Online-Abschlüsse verlinken wir auf Strecken der jeweiligen Versicherer (z. B. SDK, die Bayerische, UKV/Versicherungskammer). Dort gelten die Datenschutzerklärungen des jeweiligen Anbieters; die dort eingegebenen Daten verarbeitet der Versicherer als Verantwortlicher.
              </p>

              {lang === 'de' && (
                <section
                  className="border-t border-gray-100 pt-2"
                  aria-labelledby="linkedin-lead-gen-formulare"
                >
                  <h2 id="linkedin-lead-gen-formulare" className="scroll-mt-[17rem] text-2xl font-bold text-healio-slate mt-10 mb-4 md:scroll-mt-28">
                    LinkedIn Lead Gen Formulare
                  </h2>

                  <div className="not-prose mb-7 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
                    <p className="font-bold">Operativer Prüfhinweis – Arbeitsentwurf</p>
                    <p className="mt-2">
                      Vor Aktivierung eines LinkedIn-Formulars ist dieser Abschnitt fachkundig mit der tatsächlich ausgewählten Feldauswahl, den Formulartexten, den LinkedIn-Vertragsunterlagen, dem internen Löschprozess und einer möglichen CRM-Anbindung abzugleichen. Solange dieser Abgleich nicht dokumentiert ist, darf das Formular nicht live geschaltet werden.
                    </p>
                  </div>

                  <p>
                    Wenn Sie über eine LinkedIn-Anzeige eine B2B-Unterlage von Healio anfordern, stellt LinkedIn das Formular innerhalb seiner Plattform bereit und übermittelt die von Ihnen nach eigener Prüfung abgesendeten Angaben an die Healio GmbH. Die Absendung ist freiwillig.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Verantwortliche und Rollen</h3>
                  <p>
                    Für die Verarbeitung der an Healio übermittelten Formulardaten ist die Healio GmbH verantwortlich. LinkedIn verarbeitet Daten im Rahmen seiner Plattform und der LinkedIn Marketing Solutions auch für eigene Zwecke. Für Mitglieder im Europäischen Wirtschaftsraum ist grundsätzlich die LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland, zuständig. Einzelheiten beschreibt LinkedIn in seiner{' '}
                    <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Datenschutzerklärung</a>
                    {' '}und im{' '}
                    <a href="https://www.linkedin.com/legal/l/linkedin-independent-controller-addendum" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Independent Controller Addendum</a>.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Datenkategorien und Vorbefüllung</h3>
                  <p>Für das derzeit vorgesehene Formular werden nur folgende Angaben angefordert:</p>
                  <ul>
                    <li>Vorname und Nachname,</li>
                    <li>E-Mail-Adresse sowie</li>
                    <li>technische Zuordnungsdaten zum Formular und zur Anzeige, zum Beispiel Formular-, Kampagnen- oder Anzeigenkennung.</li>
                  </ul>
                  <p>
                    LinkedIn kann Kontakt- und berufliche Profildaten aus dem Mitgliedsprofil in das Formular vorbefüllen. Sie können die im Formular sichtbaren Angaben vor dem Absenden prüfen und, soweit LinkedIn dies für das jeweilige Feld ermöglicht, ändern. Healio fordert über dieses Formular keine Gesundheitsdaten, Patientendaten, Versicherungsnummern, Zahlungsdaten oder andere besondere Kategorien personenbezogener Daten an. Bitte tragen Sie solche Angaben auch nicht in Freitextfelder ein; Freitextfelder sind für den vorgesehenen Ablauf nicht geplant.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Zwecke und Rechtsgrundlagen</h3>
                  <p>Healio verarbeitet die übermittelten Angaben ausschließlich, um:</p>
                  <ul>
                    <li>die ausdrücklich angeforderte B2B-Unterlage bereitzustellen,</li>
                    <li>die konkrete Anfrage zu bearbeiten und</li>
                    <li>bei Bedarf einmalig zu dieser Anfrage nachzufragen.</li>
                  </ul>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf vorvertragliche Maßnahmen gerichtet ist. Soweit dies nicht der Fall ist, stützen wir die Bearbeitung der freiwillig angeforderten B2B-Information und eine sachbezogene Rückfrage auf Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in der Bearbeitung selbst veranlasster Geschäftsanfragen und der Bereitstellung der angeforderten Unterlage.
                  </p>
                  <p>
                    Die Anforderung der Unterlage ist nicht an einen Newsletter gebunden. Newsletter, regelmäßige Werbung oder andere darüber hinausgehende Kontaktaufnahmen erfolgen nur nach einer gesonderten, freiwilligen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Eine solche Einwilligung darf nicht vorangekreuzt und muss jederzeit widerrufbar sein.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Empfänger und keine Weitergabe zu fremden Werbezwecken</h3>
                  <p>
                    Empfänger sind LinkedIn im Rahmen der Formularbereitstellung und die hierfür zuständigen, besonders berechtigten Stellen innerhalb der Healio GmbH. Eine CRM- oder Newsletter-Anbindung ist für diesen Arbeitsstand nicht vorgesehen. Wird später ein Dienstleister eingebunden, muss dieser vor der Aktivierung benannt, vertraglich datenschutzkonform eingebunden und dieser Abschnitt aktualisiert werden. Formulardaten werden nicht verkauft und nicht an Versicherer oder Zahnarztpraxen zu deren eigenen Werbezwecken weitergegeben.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Übermittlung in Drittländer</h3>
                  <p>
                    LinkedIn kann Daten durch verbundene Unternehmen oder Dienstleister auch außerhalb des Europäischen Wirtschaftsraums verarbeiten. Für Übermittlungen in Staaten ohne Angemessenheitsbeschluss sehen die aktuellen LinkedIn-Vertragsbedingungen insbesondere die EU-Standardvertragsklauseln für die Übermittlung zwischen eigenständig Verantwortlichen vor. Weitere Angaben finden Sie in den oben verlinkten LinkedIn-Datenschutz- und Vertragsinformationen. Vor Kampagnenstart ist zu prüfen, ob diese Angaben und die tatsächlich geltenden LinkedIn-Vertragsunterlagen noch übereinstimmen.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Speicherdauer</h3>
                  <p>
                    LinkedIn hält Daten aus gesponserten Lead Gen Formularen nach eigener aktueller Dokumentation bis zu 365 Tage im Campaign Manager vor. Für den vorgesehenen Healio-Ablauf ist geplant, abgerufene Formulardaten spätestens zwölf Monate nach Absendung zu löschen oder zu anonymisieren, sofern die konkrete Anfrage nicht vorher erledigt ist, keine fortlaufende Geschäftsbeziehung besteht und keine gesetzliche Aufbewahrungspflicht eine längere Speicherung verlangt. Der entsprechende interne Löschlauf muss vor Aktivierung des Formulars technisch und organisatorisch eingerichtet und geprüft werden. Bei einem wirksamen Widerspruch oder Widerruf löschen wir die Daten früher, soweit keine vorrangige Rechtsgrundlage oder Aufbewahrungspflicht entgegensteht.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Ihre Rechte</h3>
                  <p>
                    Sie haben nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, widersprechen. Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren. Für Anfragen an Healio genügt eine E-Mail an{' '}
                    <a href="mailto:info@healio.de" className="text-healio-primary hover:underline">info@healio.de</a>.
                    {' '}Rechte gegenüber LinkedIn können Sie zusätzlich über die LinkedIn-Einstellungen und die dort genannten Datenschutzkontaktwege ausüben.
                  </p>

                  <p className="mt-6 text-sm text-gray-500">
                    Stand dieses Arbeitsentwurfs: 12. August 2026. Technische Grundlage:{' '}
                    <a href="https://www.linkedin.com/help/lms/answer/a7495170" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">LinkedIn-Dokumentation zu Speicherung und Aufbewahrung von Lead Gen Formularen</a>.
                  </p>
                </section>
              )}

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section3Title')}</h2>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section4Title')}</h2>
              <p>
                Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
              </p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.section5Title')}</h2>
              <p>
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail:
                <br /><br />
                <strong>E-Mail:</strong> <a href="mailto:info@healio.de" className="text-healio-primary hover:underline">info@healio.de</a>
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
