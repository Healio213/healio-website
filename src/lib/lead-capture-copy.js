// The existing delivery workflow sends one Kassenbonus guide, not tariff
// documents. Keep that promise clear even when the calculator context changes.
const contexts = {
  de: {
    outpatient: { title: 'Ambulanten Beitrag berechnen & Bonusleitfaden sichern.', calculator: 'der ambulante Rechner' },
    dental: { title: 'Zahnrechner starten & Bonusleitfaden sichern.', calculator: 'der Zahnrechner' },
    inpatient: { title: 'Klinikbeitrag berechnen & Bonusleitfaden sichern.', calculator: 'der Krankenhausrechner' },
    general: { title: 'Rechner starten & Bonusleitfaden sichern.', calculator: 'der Rechner' },
  },
  en: {
    outpatient: { title: 'Calculate your outpatient premium & get the bonus guide.', calculator: 'the outpatient calculator' },
    dental: { title: 'Start the dental calculator & get the bonus guide.', calculator: 'the dental calculator' },
    inpatient: { title: 'Calculate your hospital premium & get the bonus guide.', calculator: 'the hospital insurance calculator' },
    general: { title: 'Start the calculator & get the bonus guide.', calculator: 'the calculator' },
  },
};

const common = {
  de: {
    badge: 'DEIN RECHNERSTART & BONUSLEITFADEN',
    firstNameLabel: 'Vorname',
    firstNamePlaceholder: 'Dein Vorname',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'deine@email.de',
    closeLabel: 'Fenster schließen',
    nameError: 'Bitte gib deinen Vornamen ein.',
    emailError: 'Bitte prüfe deine E-Mail-Adresse, zum Beispiel name@anbieter.de.',
    unavailableError: 'Dieser Rechnerlink ist gerade nicht verfügbar.',
    deliveryError: 'Dein Leitfaden konnte gerade nicht angefordert werden. Bitte versuche es erneut.',
    popupError: 'Bitte erlaube neue Fenster für Healio in deinem Browser und versuche es erneut.',
    loading: 'Einen Moment...',
    pending: 'Deine Anfrage wird noch übermittelt. Bei langsamer Verbindung kann das etwas länger dauern.',
    submit: 'Weiter zum Rechner & Leitfaden sichern ➔',
    captured: 'Deine Anfrage ist gespeichert. Falls dein Browser den neuen Tab blockiert hat, öffne den Rechner hier:',
    manualOpen: 'Weiter zum Rechner ➔',
    microcopy: '100 % kostenlos · Einmalige E-Mail · Kein Newsletter',
    permission: 'Mit deiner Anfrage dürfen wir dir einmalig den Kassenbonus-Leitfaden per E-Mail senden.',
    privacyLabel: 'Datenschutz',
    privacyUrl: '/datenschutz',
    languageNote: '',
    helpLabel: '',
    helpUrl: '/kontakt',
  },
  en: {
    badge: 'YOUR CALCULATOR & BONUS GUIDE',
    firstNameLabel: 'First name',
    firstNamePlaceholder: 'Your first name',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    closeLabel: 'Close window',
    nameError: 'Please enter your first name.',
    emailError: 'Please check your email address, for example name@example.com.',
    unavailableError: 'This calculator link is currently unavailable.',
    deliveryError: 'Your guide could not be requested right now. Please try again.',
    popupError: 'Please allow new windows for Healio in your browser and try again.',
    loading: 'One moment...',
    pending: 'Your request is still being sent. A slow connection can take a little longer.',
    submit: 'Continue to calculator & get the guide ➔',
    captured: 'Your request has been saved. If your browser blocked the new tab, open the calculator here:',
    manualOpen: 'Continue to calculator ➔',
    microcopy: '100% free · One guide email · No newsletter',
    permission: 'By submitting, you ask us to email you the health insurance bonus guide once.',
    privacyLabel: 'Privacy policy',
    privacyUrl: '/en/privacy',
    languageNote: 'The guide and email are in German. The official insurer application is also in German.',
    helpLabel: 'Need help? Contact Healio.',
    helpUrl: '/en/contact',
  },
};

const offers = {
  de: {
    badge: 'ARAG V100 · PERSÖNLICHES ANGEBOT',
    title: 'Wohin dürfen wir dir dein V100-Angebot senden?',
    description: 'Wir melden uns per E-Mail, klären die passenden Leistungen und erstellen dein persönliches Angebot. Den Kassenbonus-Leitfaden erhältst du zusätzlich.',
    unavailableError: 'Diese Anfrage ist gerade nicht verfügbar.',
    deliveryError: 'Deine V100-Angebotsanfrage konnte gerade nicht gespeichert werden. Bitte versuche es erneut.',
    submit: 'Persönliches Angebot anfragen ➔',
    captured: 'Deine V100-Angebotsanfrage ist gespeichert. Wir melden uns per E-Mail für die persönliche Abstimmung. Damit ist noch keine Versicherung beantragt oder abgeschlossen.',
    returnLabel: 'Zurück zur Vorsorgeübersicht',
    microcopy: 'Kostenfreie Anfrage · Persönliche Abstimmung · Kein Versicherungsantrag',
    permission: 'Mit deiner Anfrage dürfen wir dich per E-Mail zu ARAG V100 kontaktieren und dir den Kassenbonus-Leitfaden senden.',
  },
  en: {
    badge: 'ARAG V100 · PERSONAL OFFER',
    title: 'Where should we send your personal V100 offer?',
    description: 'We will contact you by email to discuss the benefits and prepare your personal offer. You will also receive our health insurance bonus guide.',
    unavailableError: 'This request is currently unavailable.',
    deliveryError: 'Your V100 offer request could not be saved right now. Please try again.',
    submit: 'Request a personal offer ➔',
    captured: 'Your V100 offer request has been saved. We will contact you by email to discuss it. This does not submit an insurance application or take out a policy.',
    returnLabel: 'Back to the preventive care overview',
    microcopy: 'Free request · Personal consultation · No insurance application',
    permission: 'By submitting, you ask us to contact you by email about ARAG V100 and send you the health insurance bonus guide.',
  },
};

const categoryContexts = new Map([
  ['sdk-ambulant', 'outpatient'], ['ukv-vorsorge', 'outpatient'],
  ['zahn-antrag', 'dental'],
  ['dkv-stationaer', 'inpatient'], ['sdk-stationaer', 'inpatient'], ['bayerische-stationaer', 'inpatient'],
]);
const pageContexts = new Map([
  ['/ambulant', 'outpatient'], ['/en/outpatient', 'outpatient'],
  ['/zahn', 'dental'], ['/en/dental', 'dental'],
  ['/stationaer', 'inpatient'], ['/en/inpatient', 'inpatient'],
]);

/** @param {{ sourcePage?: string, trackingCategory?: string, personalOffer?: boolean }} options */
export function getLeadCaptureCopy({ sourcePage = '', trackingCategory, personalOffer = false } = {}) {
  const lang = /^\/en(?:\/|$)/.test(sourcePage) ? 'en' : 'de';
  const path = sourcePage.split(/[?#]/, 1)[0].replace(/\/+$/, '');
  const context = contexts[lang][categoryContexts.get(trackingCategory) || pageContexts.get(path) || 'general'];
  const description = lang === 'en'
    ? `After you submit, ${context.calculator} opens in a new tab. We will email you our guide to claiming health insurance bonuses, collecting evidence and considering a change of health insurer.`
    : `Nach dem Absenden öffnet sich ${context.calculator} in einem neuen Tab. Den Kassenbonus-Leitfaden für Bonusabruf, Nachweise und Kassenwechsel senden wir dir per E-Mail.`;

  return { lang, ...common[lang], title: context.title, description, ...(personalOffer ? offers[lang] : {}) };
}
