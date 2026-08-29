import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { sanitizeReferrer } from '../src/lib/referrer.js';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const expect = (condition, message) => {
  if (!condition) {
    console.error(`Conversion-Disclosure-Contract verletzt: ${message}`);
    process.exit(1);
  }
};

const ikkSwitch = read('src/components/sections/ambulant/AmbulantIKKWechsel.jsx');
const ambulantPage = read('src/pages/AmbulantPage.jsx');
const dentalPage = read('src/pages/ZahnPage.jsx');
const inpatientPage = read('src/pages/StationaerPage.jsx');
const bonusCalculator = read('src/components/sections/ambulant/AmbulantBonusCalculator.jsx');
const tariffTable = read('src/components/sections/ambulant/AmbulantTarifTabelle.jsx');
const englishFaq = read('src/i18n/locales/en/ambulant-faq.json');
const conversionNudge = read('src/components/sections/ambulant/AmbulantConversionNudge.jsx');
const explanationVideo = read('src/components/sections/ErklaervideoSection.jsx');
const ambulantHero = read('src/components/sections/ambulant/AmbulantHero.jsx');
const qualityCooperation = read('src/components/sections/QualityCooperationSection.jsx');
const header = read('src/components/Header.jsx');
const kassenBoostChoiceHint = read('src/components/sections/KassenBoostChoiceHint.jsx');
const sdkUrl = read('src/lib/sdk-url.js');
const localizedAmbulantDetails = [
  read('src/components/sections/ambulant/AmbulantBenefits.jsx'),
  read('src/components/sections/ambulant/AmbulantConceptAccordion.jsx'),
  read('src/components/sections/ambulant/AmbulantIKKWechsel.jsx'),
  read('src/components/sections/ambulant/AmbulantBonusCalculator.jsx'),
].join('\n');
const dentalChoice = read('src/components/sections/DentalInsurerChoice.jsx');
const dentalBenefits = read('src/components/sections/DentalBenefits.jsx');
const hospitalConcept = read('src/components/sections/HospitalConcept.jsx');
const hospitalBenefits = read('src/components/sections/HospitalBenefits.jsx');

expect(
  /const \[detailsOpen, setDetailsOpen\] = useState\(false\)/.test(ikkSwitch),
  'Die lange Kassenwechsel-Erklärung muss standardmäßig eingeklappt starten.',
);
expect(
  /aria-expanded=\{detailsOpen\}[\s\S]*?aria-controls="ikk-wechsel-details"/.test(ikkSwitch),
  'Der Aufklappschalter braucht einen zugänglichen, eindeutig zugeordneten Zustand.',
);
expect(
  /href=\{IKK_LINK\}[\s\S]*?\{t\('ikkWechsel\.ctaBonus'\)\}[\s\S]*?detailsOpen &&/.test(ikkSwitch),
  'Der direkte IKK-Weg muss sichtbar bleiben, bevor die Detailstrecke geöffnet wird.',
);
expect(
  /detailsOpen && \([\s\S]*?<IkkSwitch3DScene/.test(ikkSwitch),
  'Die schwere 3D-Erklärung darf erst nach einem bewussten Öffnen geladen werden.',
);
expect(
  ambulantPage.indexOf('<AmbulantTarifTabelle />') < ambulantPage.indexOf('<AmbulantIKKWechsel'),
  'Auf Ambulant muss der Tarifabschluss vor den optionalen Kassenwechsel-Details stehen.',
);
expect(
  dentalPage.indexOf('<DentalZahnCheck />') < dentalPage.indexOf('<AmbulantIKKWechsel'),
  'Auf Zahn muss der lokale Zahn-Check vor den optionalen Kassenwechsel-Details stehen.',
);
expect(
  inpatientPage.indexOf('<HospitalBenefits />') < inpatientPage.indexOf('<AmbulantIKKWechsel'),
  'Auf Stationär müssen die Produktleistungen vor den optionalen Kassenwechsel-Details stehen.',
);
expect(
  /subLinks:[\s\S]*?getPath\('kassenbonus'\)/.test(header)
    && /KASSENBOOST_COMPARE_URL/.test(header)
    && /t\('nav\.kassenvorteil'\)/.test(header),
  'KassenBoost muss im Versicherungsmenü und als klarer Startseiten-CTA erreichbar bleiben.',
);
expect(/to=\{getPath\('kassenbonus'\)\}/.test(kassenBoostChoiceHint), 'Der dezente KassenBoost-Hinweis muss zur Healio-Kassenbonus-Seite führen.');
expect(/kassenboostHint\.title/.test(kassenBoostChoiceHint) && /kassenboostHint\.cta/.test(kassenBoostChoiceHint), 'Der KassenBoost-Hinweis muss lokalisierte, verständliche Texte verwenden.');
expect(ambulantPage.indexOf('<AmbulantIKKWechsel') < ambulantPage.indexOf('<KassenBoostChoiceHint'), 'Auf Ambulant muss die individuelle Kassenalternative direkt nach dem IKK-Weg folgen.');
expect(dentalPage.indexOf('<AmbulantIKKWechsel') < dentalPage.indexOf('<KassenBoostChoiceHint'), 'Auf Zahn muss die individuelle Kassenalternative direkt nach dem IKK-Weg folgen.');
expect(inpatientPage.indexOf('<AmbulantIKKWechsel') < inpatientPage.indexOf('<KassenBoostChoiceHint'), 'Auf Stationär muss die individuelle Kassenalternative direkt nach dem IKK-Weg folgen.');
expect(/scroll-mt-24/.test(bonusCalculator), 'Der Bonus-Rechner muss unter dem festen Header vollständig sichtbar anspringen.');
expect(/scroll-mt-24/.test(tariffTable), 'Die Tariftabelle muss unter dem festen Header vollständig sichtbar anspringen.');
expect(sanitizeReferrer('HP-praxis_123') === 'HP-praxis_123', 'Gültige Partnercodes müssen erhalten bleiben.');
expect(sanitizeReferrer('🚀') === null, 'Unicode darf die SDK-URL nicht mehr zum Absturz bringen.');
expect(sanitizeReferrer(`HP-${'a'.repeat(65)}`) === null, 'Überlange Partnercodes müssen verworfen werden.');
expect(sanitizeReferrer('HP%0Aevil') === null, 'Nicht freigegebene Zeichen müssen verworfen werden.');
expect(!/@\/hooks\//.test(sdkUrl), 'Die reine SDK-URL-Hilfe darf keinen React-Hook importieren.');
expect(!/no health check and no health questions|guaranteed acceptance|AP7 plan|over €300|up to €600 per year/i.test(englishFaq), 'Die englische FAQ darf keine veralteten oder widersprüchlichen Abschlussangaben enthalten.');
expect(/href="#tarif-tabelle"/.test(conversionNudge), 'Der zweite Erklärungsweg muss direkt zum sichtbaren Tarifvergleich führen.');
expect(/sectionId[\s\S]*?id=\{sectionId\}[\s\S]*?scroll-mt-24/.test(explanationVideo), 'Das Erklärvideo braucht ein header-sicheres Ankerziel.');
expect(/lang === 'de' && \([\s\S]*?<ErklaervideoSection/.test(ambulantPage), 'Das deutschsprachige Ambulant-Video darf auf der englischen Seite nicht als englische Erklärung erscheinen.');
expect(/lang === 'de' && \([\s\S]*?<ErklaervideoSection/.test(dentalPage), 'Das deutschsprachige Zahn-Video darf auf der englischen Seite nicht erscheinen.');
expect(/lang === 'de' && \([\s\S]*?<ErklaervideoSection/.test(inpatientPage), 'Das deutschsprachige Stationär-Video darf auf der englischen Seite nicht erscheinen.');
expect(/lang === 'de' && <FadeInUp><Testimonials/.test(dentalPage), 'Deutsche Zahn-Testimonials dürfen nicht auf /en/dental erscheinen.');
expect(ambulantPage.indexOf('<AmbulantTarifTabelle />') < ambulantPage.indexOf('<AmbulantBonusCalculator />'), 'Der Tarifvergleich muss vor dem optionalen Bonus-Rechner stehen.');
expect(/useState\(false\)[\s\S]*?aria-expanded=\{mobileOpen\}[\s\S]*?aria-controls="bonus-calculator-content"/.test(bonusCalculator), 'Der lange Bonus-Rechner muss mobil geschlossen und zugänglich aufklappbar starten.');
expect(/href="#tarif-tabelle"/.test(ambulantHero), 'Der zweite Hero-Weg muss zum Tarifvergleich statt in einen konkurrierenden Bonuspfad führen.');
expect(/hidden[^"\n]*sm:flex/.test(ambulantHero), 'Der mobile Hero muss auf höchstens zwei sofort sichtbare Vertrauenssignale verdichtet sein.');
expect(/<details[\s\S]*?ikkKrankenkasseninfoSeals/.test(ambulantPage), 'Weitere Ambulant-Auszeichnungen müssen progressiv aufklappbar sein.');
expect(/<details[\s\S]*?remainingIkkAwards/.test(qualityCooperation), 'Weitere Zahn- und Stationär-Auszeichnungen müssen progressiv aufklappbar sein.');
expect(/German form/i.test(read('src/i18n/locales/en/ambulant.json')), 'Englische Abschluss-CTAs müssen die derzeit deutschsprachige Antragsstrecke transparent benennen.');
expect(/AMBULANT_CTA_DELAY_MS\s*=\s*30_000/.test(header), 'Der Ambulant-Header-CTA muss 30 Sekunden verzögert bleiben.');
expect(/data-ambulant-header-cta="desktop"/.test(header) && /data-ambulant-header-cta="mobile"/.test(header), 'Der verzögerte Tarif-CTA muss auf Desktop und Mobil verfügbar sein.');
expect(/isAmbulant \? \([\s\S]*?showSolidHeader && ambulantCtaReady/.test(header) && /isAmbulant && showSolidHeader && ambulantCtaReady/.test(header), 'Desktop und Mobil dürfen den Tarif-CTA erst im dunklen Header nach Ablauf der Wartezeit zeigen.');
expect(!/>\s*(?:Hinweis:|Schritt \{|SDK Zusatzversicherung|IKK classic Leistung)|€\/Monat</.test(localizedAmbulantDetails), 'Aufklappbare Ambulant-Details dürfen auf Englisch keine hartcodierten deutschen Labels zeigen.');
expect((dentalChoice.match(/<details/g) || []).length >= 2 && /<motion\.details/.test(dentalChoice), 'Zahn-Tarifdetails und Bedarfsfinder müssen standardmäßig einklappbar sein.');
expect((dentalChoice.match(/<Button asChild/g) || []).length >= 2, 'Beide Zahn-Abschlusswege müssen trotz Verdichtung sichtbar bleiben.');
expect(/primaryBenefitKeys[\s\S]*?additionalBenefitKeys[\s\S]*?<details/.test(dentalBenefits), 'Zahn-Kernleistungen müssen sichtbar und ergänzende Leistungen aufklappbar bleiben.');
expect((hospitalConcept.match(/<details/g) || []).length >= 2, 'Stationär-Modellrechnungen und Besonderheiten müssen standardmäßig einklappbar sein.');
expect(/tariffRows\.map[\s\S]*?vergleichTitle[\s\S]*?<\/motion\.div>[\s\S]*?<details/.test(hospitalConcept), 'Stationär-Tarifdaten und SP1/SP2-Vergleich müssen vor den optionalen Details sichtbar bleiben.');
expect(/mainBenefitKeys\.map[\s\S]*?<details/.test(hospitalBenefits), 'Vier stationäre Hauptvorteile müssen vor den aufklappbaren Detailleistungen sichtbar bleiben.');

console.log('Conversion-Disclosure-Contract erfüllt: Abschlusswege sichtbar, Zusatzdetails progressiv.');
