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

const ambulantPage = read('src/pages/AmbulantPage.jsx');
const ambulantHero = read('src/components/sections/ambulant/AmbulantHero.jsx');
const ambulantFlow = read('src/components/sections/ambulant/AmbulantConversionFlow.jsx');
const bonusCalculator = read('src/components/sections/ambulant/AmbulantBonusCalculator.jsx');
const bonusCalculatorDe = read('src/i18n/locales/de/ambulant.json');
const dentalPage = read('src/pages/ZahnPage.jsx');
const dentalCheck = read('src/components/sections/dental/DentalZahnCheck.jsx');
const dentalContent = read('src/components/sections/dental/dentalContent.js');
const inpatientPage = read('src/pages/StationaerPage.jsx');
const inpatientSelector = read('src/components/sections/stationaer/StationaerTariffSelector.jsx');
const inpatientBonus = read('src/components/sections/stationaer/StationaerBonusBridge.jsx');
const inpatientDe = read('src/i18n/locales/de/stationaer.json');
const veterinaryPage = read('src/pages/VeterinaryHomePage.jsx');
const veterinarySelector = read('src/components/sections/veterinary/TariffSelection.jsx');
const veterinaryForm = read('src/components/sections/VeterinaryContactForm.jsx');
const veterinaryDe = read('src/i18n/locales/de/veterinary.json');
const friendlyIcons = read('src/components/ui/healioSoftClayIcons.js');
const header = read('src/components/Header.jsx');
const sdkUrl = read('src/lib/sdk-url.js');

// Ambulant: Bedarf, Tarif und KassenBoost bleiben ein einziger linearer Weg.
expect(/href="#budget-kompass"/.test(ambulantHero), 'Der Ambulant-Hero muss in den Budget-Kompass führen.');
expect(/<AmbulantHero\s*\/>[\s\S]*?<AmbulantConversionFlow\s*\/>/.test(ambulantPage), 'Ambulant braucht genau den kompakten Hero-und-Funnel-Aufbau.');
expect(ambulantFlow.indexOf('<ExplainerVideoCard') < ambulantFlow.indexOf('id="budget-kompass"'), 'Ambulant muss das Erklärvideo vor dem Budget-Kompass zeigen.');
expect(/language === 'de'\s*&&\s*\(\s*<ExplainerVideoCard/.test(ambulantFlow), 'Das deutsche Ambulant-Video darf auf der englischen Route keinen Abschnitt rendern.');
expect(ambulantFlow.indexOf('id="budget-kompass"') < ambulantFlow.indexOf('id="tarifwahl"'), 'Auf Ambulant muss die Bedarfseinordnung vor der Tarifwahl stehen.');
expect(ambulantFlow.indexOf('id="tarifwahl"') < ambulantFlow.indexOf('<section className="bg-[#071722]'), 'KassenBoost darf erst nach der Tarifwahl erklärt werden.');
expect(/Krankenkasse passend zum Tarif finden/.test(ambulantFlow) && /\/kassenboost/.test(ambulantFlow), 'Die Ambulant-Bonusbrücke muss in KassenBoost führen.');
expect(/bis zu 100 % ausgleichen/i.test(ambulantFlow), 'Ambulant muss die mögliche Beitragsentlastung bis zu 100 Prozent klar nennen.');
expect(/hängt von deiner Krankenkasse, deinen Aktivitäten, dem gewählten Tarif und den anrechenbaren Kosten ab/i.test(ambulantFlow), 'Der 100-Prozent-Hinweis braucht die persönliche Berechnungsgrundlage in Sichtnähe.');
expect(!/AmbulantIKKWechsel|KassenBoostChoiceHint|AmbulantBonusCalculator/.test(ambulantPage), 'Ambulant darf keine alte IKK- oder Doppelrechner-Strecke mehr rendern.');

// Gemeinsamer Bonusrechner: 2026-Logik trennt Geldbonus und Zuschuss fachlich sauber.
expect(/cash:\s*5,\s*subsidy:\s*15/.test(bonusCalculator) && /cash:\s*25,\s*subsidy:\s*75/.test(bonusCalculator), 'Der Bonusrechner muss Geldbonus und dreifachen Zuschuss getrennt modellieren.');
expect(/id:\s*'mutterschaft'[\s\S]*?countable:\s*true/.test(bonusCalculator), 'Mutterschaftsvorsorge muss je nachgewiesener Untersuchung zählbar sein.');
expect(/category:\s*'status'/.test(bonusCalculator) && /!hasRegularActivity/.test(bonusCalculator), 'Statuswerte dürfen nur zusammen mit einer regelmäßigen Aktivität zählen.');
expect(/Math\.min\(totalSubsidyPotential,\s*jahresbeitrag\)/.test(bonusCalculator), 'Der Versicherungszuschuss muss auf den nachgewiesenen Jahresbeitrag gedeckelt sein.');
expect(!/nettoErgebnis|resultPlus/.test(bonusCalculator), 'Ein nicht auszahlbarer Zuschussüberschuss darf nicht als Plus erscheinen.');
expect(/Geldbonus und Zuschuss sind Alternativen/.test(bonusCalculatorDe), 'Die Entweder-oder-Logik muss direkt am Rechner erklärt werden.');

// Zahn: ein lokaler Check, vier strategische Wege inklusive verifizierter LKH-Lücke.
expect(dentalPage.indexOf('<DentalVideoSection />') < dentalPage.indexOf('<DentalZahnCheck />'), 'Zahn muss das Erklärvideo vor dem Zahn-Check zeigen.');
expect(/lang === 'de'\s*&&\s*<DentalVideoSection\s*\/>/.test(dentalPage), 'Das deutsche Zahn-Video darf auf der englischen Route keinen Abschnitt rendern.');
expect(dentalPage.indexOf('<DentalZahnCheck />') < dentalPage.indexOf('id="kassenbonus"'), 'Der Zahn-Check muss vor der Bonusbrücke stehen.');
expect(/routes:\s*\['Bayerische', 'UKV', 'LKH', 'Sofortschutz'\]/.test(dentalContent), 'Der Zahn-Check muss alle vier strategischen Wege enthalten.');
expect(/1 bis 3 fehlenden, noch nicht ersetzten Zähnen/.test(dentalContent), 'Der LKH-Weg muss die Grenze von ein bis drei fehlenden Zähnen erklären.');
expect(/5 EUR Risikozuschlag je fehlendem Zahn/.test(dentalContent), 'Der LKH-Weg muss den verifizierten Zuschlag nennen.');
expect(/Keine Annahmegarantie/.test(dentalContent) && /LKH_GUIDELINE_URL/.test(dentalCheck), 'LKH braucht Quelle und sichtbaren Annahmehinweis.');
expect(/getPath\('kassenboost'\)/.test(dentalPage), 'Die Zahn-Bonusbrücke muss in KassenBoost statt in einen direkten Kassenwechsel führen.');
expect(!/AmbulantIKKWechsel|KassenBoostChoiceHint|Testimonials/.test(dentalPage), 'Zahn darf keine alte IKK-, Hinweis- oder Testimonials-Doppelstrecke rendern.');

// Stationär: SP2, SP1 und SPU werden getrennt; nur SPU trägt die konkrete Null-Euro-Rechnung.
expect(inpatientPage.indexOf('<ExplainerVideoCard') < inpatientPage.indexOf('<StationaerTariffSelector />'), 'Stationär muss das Erklärvideo vor der Tarifwahl zeigen.');
expect(/lang === 'de'\s*&&\s*\(\s*<ExplainerVideoCard/.test(inpatientPage), 'Das deutsche Stationär-Video darf auf der englischen Route keinen Abschnitt rendern.');
expect(/<StationaerTariffSelector\s*\/>[\s\S]*?<StationaerBonusBridge\s*\/>/.test(inpatientPage), 'Stationär muss die Tarifwahl vor der Bonusbrücke zeigen.');
expect(!/erklaervideo-stationaer\.mp4/.test(inpatientBonus), 'Das Stationär-Video darf im Bonusblock nicht doppelt erscheinen.');
expect(/SP2/.test(inpatientDe) && /SP1/.test(inpatientDe) && /SPU/.test(inpatientDe), 'Stationär muss SP2, SP1 und SPU sichtbar unterscheiden.');
expect(/Nur nach Unfall|Unfallschutz/i.test(inpatientDe), 'SPU muss sichtbar als Unfallschutz gekennzeichnet sein.');
expect(/7,00\s*EUR/.test(inpatientDe) && /84,00\s*EUR/.test(inpatientDe) && /0\s*EUR/.test(inpatientDe), 'Die konkrete 100-Prozent-Rechnung muss das aktuelle SPU-Beispiel transparent abbilden.');
expect(/33,41\s*EUR/.test(inpatientDe) && /50,72\s*EUR/.test(inpatientDe), 'Stationär muss die aktuellen SDK-Beispielbeiträge für SP2 und SP1 bei Eintrittsalter 30 nennen.');
expect(!/6,84|82,08|32,82|49,78|10,49|44,91|69,74/.test(inpatientDe), 'Stationär darf keine veralteten oder unbelegten Preisbeispiele enthalten.');
expect(/getPath\('kassenboost'\)/.test(inpatientBonus), 'Die Stationär-Bonusbrücke muss in KassenBoost führen.');
expect(!/AmbulantIKKWechsel|AmbulantBonusCalculator|KassenBoostChoiceHint/.test(inpatientPage), 'Stationär darf keine ambulante oder direkte IKK-Nachlaufstrecke rendern.');

// Tier: Hund, Katze und Pferd mit wahrheitsgemäßer Tarifprüfung statt Pseudorechner.
expect(/animalType:\s*''/.test(veterinaryPage) && /coverage:\s*''/.test(veterinaryPage), 'Die Tierseite muss das gewählte Profil bis zum Formular halten.');
expect(/value:\s*'dog'/.test(veterinarySelector) && /value:\s*'cat'/.test(veterinarySelector) && /value:\s*'horse'/.test(veterinarySelector), 'Die Tierauswahl muss Hund, Katze und Pferd enthalten.');
expect(/selection\.animalType === 'horse'/.test(veterinarySelector), 'Pferd braucht einen eigenen Bedarfspfad.');
expect(/Unverbindliche Tarifprüfung|tariff review/i.test(`${veterinaryForm}\n${veterinaryDe}`), 'Das Tierformular muss eine Tarifprüfung statt eines falschen Beitragsrechners versprechen.');
expect(!/PawPrint/.test(veterinarySelector) && !/PawPrint/.test(veterinaryForm), 'Die Tierstrecke darf keine funktionslose Pfoten- oder Tierpasskarte mehr zeigen.');
expect(/kind="mandate"/.test(veterinaryForm) && /kind="comparison"/.test(veterinaryForm), 'Prüfauftrag und Auftragsgrenze brauchen semantisch passende Healio-3D-Icons.');
expect(/mandate:\s*'\/images\/friendly-icons\/tariff-review-advisor-v1\.webp'/.test(friendlyIcons), 'Die persönliche Prüfbeauftragung muss im gemeinsamen FriendlyIcon-System registriert bleiben.');
expect(/reviewOrderAccepted:\s*false/.test(veterinaryForm) && /name="reviewOrderAccepted"[\s\S]*?required/.test(veterinaryForm), 'Die persönliche Tarifprüfung braucht einen eigenen, nicht vorangekreuzten Pflichtauftrag.');
expect(/Prüf- und Beratungsauftrag: erteilt/.test(veterinaryForm) && /REVIEW_ORDER_VERSION/.test(veterinaryForm) && /Auftrag erteilt am:/.test(veterinaryForm), 'Der Tier-Prüfauftrag muss mit Fassung und Zeitpunkt in der Anfrage dokumentiert werden.');
expect(/getPath\('erstinformation'\)/.test(veterinaryForm) && /getPath\('agb'\)/.test(veterinaryForm), 'Erstinformation und Makler-AGB müssen unmittelbar vor dem Tier-Prüfauftrag erreichbar sein.');
expect(/noch kein Versicherungsantrag/i.test(veterinaryDe) && /keine Abschluss-, Änderungs- oder Kündigungsvollmacht/i.test(veterinaryDe), 'Der Tier-Prüfauftrag muss klar von Versicherungsantrag und Maklervollmacht getrennt bleiben.');

// Gemeinsame technische Leitplanken.
expect(/subLinks:[\s\S]*?getPath\('kassenbonus'\)/.test(header) && /KASSENBOOST_COMPARE_URL/.test(header), 'KassenBoost und Kassenbonus müssen weiterhin in der Hauptnavigation erreichbar sein.');
expect(sanitizeReferrer('HP-praxis_123') === 'HP-praxis_123', 'Gültige Partnercodes müssen erhalten bleiben.');
expect(sanitizeReferrer('🚀') === null, 'Unicode darf die SDK-URL nicht zum Absturz bringen.');
expect(sanitizeReferrer(`HP-${'a'.repeat(65)}`) === null, 'Überlange Partnercodes müssen verworfen werden.');
expect(sanitizeReferrer('HP%0Aevil') === null, 'Nicht freigegebene Zeichen müssen verworfen werden.');
expect(!/@\/hooks\//.test(sdkUrl), 'Die reine SDK-URL-Hilfe darf keinen React-Hook importieren.');
expect(/German form/i.test(read('src/i18n/locales/en/ambulant.json')), 'Die englische Ambulant-Seite muss die deutschsprachige Abschlussstrecke benennen.');

console.log('Conversion-Disclosure-Contract erfüllt: vier klare Produktfunnels, starke Bonuschance und sichtbare Bedingungen.');
