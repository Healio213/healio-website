
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
              <p>
                {t('datenschutz.appPointer')}{' '}
                <a href="#healio-tree" className="text-healio-primary hover:underline">{t('datenschutz.appPointerLink')}</a>.
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

              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.ebookRequest')}</h3>
              <p>{t('datenschutz.ebookRequestText')}</p>

              <h3 id="kassenbonus-leitfaden" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.bonusGuideTitle')}</h3>
              <p>{t('datenschutz.bonusGuideText')}</p>

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

              <h3 id="rueckruf" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.rueckrufTitle')}</h3>
              <p>{t('datenschutz.rueckrufText')}</p>
              <p>{t('datenschutz.rueckrufLegalBasis')}</p>
              <p>{t('datenschutz.rueckrufStorage')}</p>

              <h3 id="kurzcheck" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.kurzCheckTitle')}</h3>
              <p>{t('datenschutz.kurzCheckText')}</p>
              <p>{t('datenschutz.kurzCheckLegalBasis')}</p>
              <p>{t('datenschutz.kurzCheckTracking')}</p>
              <p>{t('datenschutz.kurzCheckRecipients')}</p>
              <p>{t('datenschutz.kurzCheckStorage')}</p>
              <p>{t('datenschutz.kurzCheckRevocation')}</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.leitfadenTitle')}</h3>
              <p>{t('datenschutz.leitfadenText')}</p>

              <h2 className="text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.servicesTitle')}</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.hostingTitle')}</h3>
              <p>{t('datenschutz.hostingText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.analyticsTitle')}</h3>
              <p>{t('datenschutz.analyticsText')}</p>
              <h3 id="anonyme-zaehlung" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.anonymerZaehlerTitle')}</h3>
              <p>{t('datenschutz.anonymerZaehlerText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.googleAdsTitle')}</h3>
              <p>{t('datenschutz.googleAdsText')}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.metaTitle')}</h3>
              <p>{t('datenschutz.metaText')}</p>
              <h3 id="meta-formulare" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.metaLeadFormsTitle')}</h3>
              <p>{t('datenschutz.metaLeadFormsText')}</p>
              <p>{t('datenschutz.metaLeadFormsLegalBasis')}</p>
              <p>{t('datenschutz.metaLeadFormsStorage')}</p>
              <p>{t('datenschutz.metaLeadFormsPlatform')}</p>
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
                    If you contact Healio through WhatsApp, WhatsApp/Meta and Twilio Ireland Limited transmit your sender details, message content, time and technical message identifiers to Healio. Your text messages are first answered by “Nita”, Healio’s digital assistant. Nita is an AI and tells you so in her first substantive reply. Nita’s replies are generated with the AI language model Claude from Anthropic Ireland, Limited, 6th Floor, South Bank House, Barrow Street, Dublin 4, D04 TR29, Ireland. For this purpose we send Anthropic your current message, the previous conversation history and a pseudonymous identifier from which your telephone number cannot be derived. If you previously contacted us through a form on our website, the topic of that enquiry is added, for example “dental insurance”. The model also receives our conversation rules and our Healio knowledge, neither of which contains personal data. Your telephone number and your WhatsApp profile name are not transmitted to Anthropic. Before that, our system replaces email addresses, telephone numbers, IBANs, health insurance numbers, dates of birth and postal addresses in your messages with placeholders, as far as it recognises them. Anthropic processes this content on our behalf and, under its contractual terms, may not use it to train its models. The Healio service does not download images, files or voice messages you send. It uses neither tools nor web search.
                  </p>
                  <p>
                    Our WhatsApp service runs on our own server at Hetzner Online GmbH in Germany. There we store your message and your WhatsApp telephone number in encrypted form until the reply has been sent, for no longer than 24 hours. So that Nita understands the context of follow-up questions, we also store the conversation history, meaning your messages and Nita’s replies, in encrypted form and without your telephone number. The history is deleted automatically no later than 24 hours after the conversation began. Only pseudonymous technical data without message wording and without your telephone number is kept longer: the link to your enquiry in our contact system until 24 hours after your last message, identifiers that prevent duplicate processing for up to seven days, limited counters that protect against misuse and overload and, after STOP, a block marker until you send START. According to Anthropic, it generally deletes the transmitted content within 30 days, or later where there are indications of a breach of its usage policies or where the law requires it. WhatsApp/Meta and Twilio may process or retain communication and usage data under their own service rules. See the{' '}
                    <a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Twilio Privacy Notice</a>{' '}and{' '}
                    <a href="https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Anthropic’s information on retention periods</a>.
                  </p>
                  <p>
                    So that we can assign your enquiry and get back to you personally if needed, the WhatsApp service matches your telephone number against our Healio contact system (enquiry centre) on the same server. If you have already contacted us with this number within the last 90 days, for example through a form on our website, we assign your WhatsApp conversation to that enquiry. Otherwise we create a new enquiry there with your telephone number. In the contact system we record when you wrote and how things should continue, for example with a callback, with the online application or with the end of WhatsApp replies after STOP. Depending on the conversation, a preferred callback time and a short note on your request without health information are added. If you tell Nita your age, for example to calculate your premium, we also store your age. The contact system does not store the wording of your messages. A notification on our work phones informs us about new enquiries and about conversations in which we should get in touch personally. It contains neither your name nor your contact details. We delete enquiries in the contact system after 90 days at the latest.
                  </p>
                  <p>
                    We process the data to answer your voluntarily initiated request and to secure the channel. The legal basis is Article 6(1)(b) GDPR where the request concerns pre-contractual steps, and otherwise Article 6(1)(f) GDPR based on our legitimate interest in answering enquiries and preventing misuse. Providers and subprocessors may also process data outside the EEA, for example in the United States. Depending on the provider and transfer, safeguards may include adequacy decisions, standard contractual clauses or binding corporate rules. For Anthropic, the EU standard contractual clauses apply. You can contact us equally by telephone, email or the contact form.
                  </p>
                  <p>
                    Please do not send health data, patient data, insurance numbers, diagnoses, findings, invoices, photographs, voice messages or documents through WhatsApp. We discuss health questions by telephone when we take up the application together. If our system recognises personal health information in a message, that message is not sent to Anthropic and we do not store its wording, not even in the conversation history. You then receive a fixed reply and can arrange a callback. However, a keyword filter cannot reliably recognise every sensitive statement. Before sending, our system automatically checks every reply from Nita against fixed rules and replaces it with a prepared notice if it breaks one. You can end the replies at any time by sending STOP. We then immediately delete your conversation history and any pending messages and record in the contact system that you no longer wish to receive WhatsApp messages. Send START to reach Nita again.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Wir stellen freiwillig einen Link zu WhatsApp bereit. Anbieter in der Europäischen Region ist die WhatsApp Ireland Limited. Vor Ihrem Klick lädt Healio keinen WhatsApp-Code und übermittelt keine Daten an WhatsApp. Mit dem Öffnen des Links verlassen Sie unsere Website. WhatsApp verarbeitet je nach Nutzung insbesondere Ihre Telefonnummer, Profil- und Kommunikationsdaten sowie Geräte-, Nutzungs- und Verbindungsdaten. Weitere Informationen finden Sie in der{' '}
                    <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Datenschutzerklärung von WhatsApp</a>.
                  </p>
                  <p>
                    Wenn Sie Healio über WhatsApp kontaktieren, übermitteln WhatsApp/Meta und die Twilio Ireland Limited Ihre Absenderangaben, den Nachrichteninhalt, den Zeitpunkt und technische Nachrichtenkennungen an Healio. Ihre Textnachrichten beantwortet zunächst „Nita“, die digitale Assistenz von Healio. Nita ist eine KI und sagt Ihnen das mit ihrer ersten inhaltlichen Antwort. Nitas Antworten entstehen mit dem KI-Sprachmodell Claude der Anthropic Ireland, Limited, 6th Floor, South Bank House, Barrow Street, Dublin 4, D04 TR29, Irland. Dafür übermitteln wir an Anthropic Ihre aktuelle Nachricht, den bisherigen Gesprächsverlauf und eine pseudonyme Kennung, aus der sich Ihre Rufnummer nicht ablesen lässt. Haben Sie uns vorher über ein Formular auf unserer Website angefragt, kommt das Thema dieser Anfrage hinzu, zum Beispiel „Zahnzusatzversicherung“. Dazu erhält das Modell unsere Gesprächsregeln und unser Healio-Wissen, beides ohne personenbezogene Daten. Ihre Rufnummer und Ihr WhatsApp-Profilname werden nicht an Anthropic übermittelt. E-Mail-Adressen, Telefonnummern, IBAN, Versichertennummern, Geburtsdaten und Anschriften in Ihren Nachrichten ersetzt unser System vorher durch Platzhalter, soweit es sie erkennt. Anthropic verarbeitet diese Inhalte in unserem Auftrag und darf sie nach den Vertragsbedingungen nicht zum Training seiner Modelle verwenden. Eingesandte Bilder, Dateien und Sprachnachrichten lädt der Healio-Dienst nicht herunter. Er nutzt weder Werkzeuge noch Websuche.
                  </p>
                  <p>
                    Unser WhatsApp-Dienst läuft auf unserem eigenen Server bei der Hetzner Online GmbH in Deutschland. Dort speichern wir Ihre Nachricht und Ihre WhatsApp-Rufnummer verschlüsselt, bis die Antwort verschickt ist, längstens 24 Stunden. Damit Nita bei Folgefragen den Zusammenhang kennt, speichern wir außerdem den Gesprächsverlauf, also Ihre Nachrichten und Nitas Antworten, verschlüsselt und ohne Ihre Rufnummer. Spätestens 24 Stunden nach Beginn des Gesprächs wird der Verlauf automatisch gelöscht. Länger speichern wir nur pseudonyme technische Angaben ohne Wortlaut und ohne Rufnummer. Das sind die Zuordnung zu Ihrer Anfrage in unserem Kontaktsystem bis 24 Stunden nach Ihrer letzten Nachricht, Kennungen zum Schutz vor doppelter Verarbeitung für bis zu sieben Tage, begrenzte Zähler zum Schutz vor Missbrauch und Überlastung sowie nach STOP ein Sperrvermerk, bis Sie START schreiben. Anthropic löscht die übermittelten Inhalte nach eigenen Angaben im Regelfall innerhalb von 30 Tagen, bei Hinweisen auf einen Verstoß gegen seine Nutzungsrichtlinien oder bei gesetzlichen Pflichten später. WhatsApp/Meta und Twilio können Kommunikations- und Nutzungsdaten nach ihren eigenen Dienstregeln verarbeiten oder speichern. Weitere Informationen finden Sie in der{' '}
                    <a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Datenschutzerklärung von Twilio</a>{' '}und in den{' '}
                    <a href="https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Angaben von Anthropic zur Speicherdauer</a>.
                  </p>
                  <p>
                    Damit wir Ihre Anfrage zuordnen und uns bei Bedarf persönlich melden können, gleicht der WhatsApp-Dienst Ihre Rufnummer mit unserem Healio-Kontaktsystem (Anfragen-Zentrale) auf demselben Server ab. Haben Sie uns in den letzten 90 Tagen bereits mit dieser Rufnummer angefragt, zum Beispiel über ein Formular auf unserer Website, ordnen wir Ihr WhatsApp-Gespräch dieser Anfrage zu. Sonst legen wir dort eine neue Anfrage mit Ihrer Rufnummer an. Im Kontaktsystem halten wir fest, wann Sie geschrieben haben und wie es weitergehen soll, etwa mit einem Rückruf, mit dem Online-Antrag oder mit dem Ende der WhatsApp-Antworten nach STOP. Je nach Gespräch kommen eine Wunschzeit für den Rückruf und eine kurze Notiz zu Ihrem Anliegen ohne Gesundheitsangaben hinzu. Nennen Sie Nita Ihr Alter, zum Beispiel für die Berechnung Ihres Beitrags, speichern wir auch das Alter. Den Wortlaut Ihrer Nachrichten speichert das Kontaktsystem nicht. Über neue Anfragen und über Gespräche, in denen wir uns persönlich melden sollen, informiert uns eine Mitteilung auf unseren Diensthandys. Sie enthält weder Ihren Namen noch Ihre Kontaktdaten. Im Kontaktsystem löschen wir Anfragen spätestens nach 90 Tagen.
                  </p>
                  <p>
                    Wir verarbeiten die Angaben zur Beantwortung Ihrer freiwillig veranlassten Anfrage und zur Absicherung des Kanals. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Maßnahmen geht, andernfalls Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an der Bearbeitung von Anfragen und der Missbrauchsvermeidung. Anbieter und Unterauftragnehmer können Daten auch außerhalb des EWR verarbeiten, etwa in den USA. Je nach Anbieter und Übermittlung kommen dabei insbesondere Angemessenheitsbeschlüsse, Standardvertragsklauseln oder verbindliche interne Datenschutzvorschriften als Schutzmechanismen in Betracht. Für Anthropic gelten die EU-Standardvertragsklauseln. Telefon, E-Mail und Kontaktformular stehen gleichwertig zur Verfügung.
                  </p>
                  <p>
                    Bitte senden Sie über WhatsApp keine Gesundheitsdaten, Patientendaten, Versicherungsnummern, Diagnosen, Befunde, Rechnungen, Fotos, Sprachnachrichten oder Dokumente. Ihre Gesundheitsfragen klären wir am Telefon, wenn wir den Antrag gemeinsam aufnehmen. Erkennt unser System in einer Nachricht eine persönliche Gesundheitsangabe, geht diese Nachricht nicht an Anthropic, und wir speichern ihren Wortlaut nicht, auch nicht im Gesprächsverlauf. Sie erhalten dann eine feste Antwort und können einen Rückruf vereinbaren. Ein Stichwortfilter kann aber nicht jede sensible Angabe zuverlässig erkennen. Vor dem Versand prüft unser System jede Antwort von Nita automatisch gegen feste Regeln und ersetzt sie bei einem Verstoß durch einen vorbereiteten Hinweistext. Mit STOP beenden Sie die Antworten jederzeit. Wir löschen dann Ihren Gesprächsverlauf und noch offene Nachrichten sofort und vermerken im Kontaktsystem, dass Sie keine WhatsApp-Nachrichten mehr wünschen. Mit START erreichen Sie Nita wieder.
                  </p>
                </>
              )}
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.calendarTitle')}</h3>
              <p>{t('datenschutz.calendarText')}</p>
              <p><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">Google: Privacy Policy / Datenschutzerklärung</a></p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.brevoTitle')}</h3>
              <p>{t('datenschutz.brevoText')}</p>
              <h3 id="altersvorsorge-startinfos" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{lang === 'en' ? 'Retirement account launch information' : 'Startinfos zum Altersvorsorgedepot'}</h3>
              <p>{lang === 'en' ? 'If you request retirement account launch updates, we process your name, email address, the originating page, the consent version and the request time. We send a confirmation email via Brevo (Sendinblue SAS, France). Only after you confirm your email address are you added to the separate launch information list. Based on your consent under Article 6(1)(a) GDPR, we then send new details, launch information from 2027 and relevant webinar invitations. The secure relay uses our existing n8n service on Hetzner; regular execution contents are not retained. No calculator inputs, health data or contract details are transmitted for this subscription.' : 'Wenn Sie Startinfos zum Altersvorsorgedepot anfordern, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, die aufrufende Seite, die Einwilligungsfassung und den Anforderungszeitpunkt. Über Brevo (Sendinblue SAS, Frankreich) senden wir eine Bestätigungsmail. Erst nach Ihrer Bestätigung werden Sie in die eigene Startinfo-Liste aufgenommen. Auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO erhalten Sie anschließend neue Details, Informationen zum Start ab 2027 und passende Webinar-Einladungen. Die geschützte Weiterleitung verwendet unseren bestehenden n8n-Dienst bei Hetzner; reguläre Ausführungsinhalte werden nicht gespeichert. Rechnerwerte, Gesundheitsdaten und Vertragsunterlagen werden für diese Anmeldung nicht übermittelt.'}</p>
              <p>{lang === 'en' ? 'You may withdraw consent at any time through the unsubscribe link in each update or by emailing info@healio.de. The mailing address is retained while your subscription is active; after withdrawal we stop sending and retain only evidence necessary to demonstrate consent or prevent further messages for as long as that purpose requires. Your choice does not affect access to articles, the calculator or personal enquiries. A session-only browser flag prevents repeated automatic pop-ups; it contains no name, email address or tracking identifier.' : 'Sie können Ihre Einwilligung jederzeit über den Abmeldelink in jeder Informationsmail oder per E-Mail an info@healio.de widerrufen. Die Versandadresse bleibt während Ihrer Anmeldung gespeichert; nach dem Widerruf stoppen wir den Versand und bewahren nur erforderliche Nachweise der Einwilligung beziehungsweise eine notwendige Versandsperre zweckgebunden auf. Ihre Entscheidung hat keinen Einfluss auf den Zugang zu Ratgebern, Rechner oder persönlichen Anfragen. Eine nur für die Browsersitzung gespeicherte Markierung verhindert wiederholte automatische Pop-ups; sie enthält keinen Namen, keine E-Mail-Adresse und keine Trackingkennung.'}</p>
              <h3 className="text-xl font-semibold mt-6 mb-3">{t('datenschutz.insurerFlowsTitle')}</h3>
              <p>{t('datenschutz.insurerFlowsText')}</p>
              <h3 id="partnercode" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.partnerCodeTitle')}</h3>
              <p>{t('datenschutz.partnerCodeText')}</p>
              <p>{t('datenschutz.partnerCodeLinks')}</p>
              <p>{t('datenschutz.partnerCodeLegalBasis')}</p>

              <h2 id="healio-tree" className="scroll-mt-28 text-2xl font-bold text-healio-slate mt-10 mb-4">{t('datenschutz.appTitle')}</h2>
              <p>{t('datenschutz.appIntro')}</p>
              <p>{t('datenschutz.appNoTracking')}</p>
              <p>{t('datenschutz.appStores')}</p>
              <p>{t('datenschutz.appLinks')}</p>

              <h3 id="anfragen-app" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.appRequestTitle')}</h3>
              <p>{t('datenschutz.appRequestText')}</p>
              <p>{t('datenschutz.appRequestChannel')}</p>
              <p>{t('datenschutz.appRequestHealth')}</p>

              <h3 id="anfragen-versicherung" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.appHealioTitle')}</h3>
              <p>{t('datenschutz.appHealioText')}</p>
              <p>{t('datenschutz.appHealioPurpose')}</p>

              <h3 id="anfragen-geldanlage" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.anlageTitle')}</h3>
              <p>{t('datenschutz.anlageText')}</p>
              <p>{t('datenschutz.anlageContact')}</p>
              <p>{t('datenschutz.anlageLegalBasis')}</p>
              <p>{t('datenschutz.anlageRecipients')}</p>
              <p>{t('datenschutz.anlageProcessors')}</p>
              <p>{t('datenschutz.anlageStorage')}</p>
              <p>{t('datenschutz.anlageRevocation')}</p>

              <h3 id="anfragen-kanzlei" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.kanzleiTitle')}</h3>
              <p>{t('datenschutz.kanzleiText')}</p>
              <p>{t('datenschutz.kanzleiPurpose')}</p>
              <p>{t('datenschutz.kanzleiRecipients')}</p>
              <p>{t('datenschutz.kanzleiStorage')}</p>

              <h3 id="aufbewahrung-anfragen" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.mailboxTitle')}</h3>
              <p>{t('datenschutz.appMailbox')}</p>
              <p>{t('datenschutz.appStorage')}</p>
              <p>{t('datenschutz.appProof')}</p>

              <h3 id="widerruf-app" className="scroll-mt-28 text-xl font-semibold mt-6 mb-3">{t('datenschutz.appRevocationTitle')}</h3>
              <p>{t('datenschutz.appRevocation')}</p>

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
