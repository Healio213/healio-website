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
expect(/href=\{fromBonusTopic \? '#tarifwahl' : '#budget-kompass'\}/.test(ambulantHero), 'Der normale Ambulant-Hero führt in den Budget-Kompass, der Themenanschluss direkt zur Tarifwahl.');
expect(/<AmbulantHero\s+fromBonusTopic=\{fromBonusTopic\}\s*\/>[\s\S]*?<AmbulantConversionFlow\s+fromBonusTopic=\{fromBonusTopic\}\s*\/>/.test(ambulantPage), 'Ambulant braucht einen durchgängig optionalen Themenanschluss in Hero und Funnel.');
expect(ambulantFlow.indexOf('<ExplainerVideoCard') < ambulantFlow.indexOf('id="budget-kompass"'), 'Ambulant muss das Erklärvideo vor dem Budget-Kompass zeigen.');
expect(/language === 'de'\s*&&\s*\(\s*<ExplainerVideoCard/.test(ambulantFlow), 'Das deutsche Ambulant-Video darf auf der englischen Route keinen Abschnitt rendern.');
expect(ambulantFlow.indexOf('id="budget-kompass"') < ambulantFlow.indexOf('id="tarifwahl"'), 'Auf Ambulant muss die Bedarfseinordnung vor der Tarifwahl stehen.');
expect(ambulantFlow.indexOf('id="tarifwahl"') < ambulantFlow.indexOf('<section className="bg-[#071722]'), 'KassenBoost darf erst nach der Tarifwahl erklärt werden.');
expect(/Krankenkasse passend zum Tarif finden/.test(ambulantFlow) && /\/kassenboost/.test(ambulantFlow), 'Die Ambulant-Bonusbrücke muss in KassenBoost führen.');
// Rote Linie (Healio/CONTENT-ROTE-LINIE-B2C.md): Der Bonus kann den Beitrag
// „ganz oder teilweise“ ausgleichen, nie pauschal „bis zu 100 %“ oder
// „Hol dir deinen Beitrag zurück“.
expect(/ganz oder teilweise ausgleichen/i.test(ambulantFlow), 'Ambulant muss die mögliche Beitragsentlastung als „ganz oder teilweise“ nennen.');
expect(!/bis zu 100 %[^'\n]{0,40}ausgleich|Bis zu 100 % können möglich|Ja, bis zu 100 %|Hol dir deinen Beitrag zurück|up to 100%[^'\n]{0,40}(?:offset|premium)/i.test(ambulantFlow), 'Ambulant darf die Beitragsentlastung nicht pauschal mit bis zu 100 Prozent bewerben.');
expect(/hängt von deiner Krankenkasse, deinen Aktivitäten, dem gewählten Tarif und den anrechenbaren Kosten ab/i.test(ambulantFlow), 'Der Bonus-Hinweis braucht die persönliche Berechnungsgrundlage in Sichtnähe.');
expect(!/AmbulantIKKWechsel|KassenBoostChoiceHint|AmbulantBonusCalculator/.test(ambulantPage), 'Ambulant darf keine alte IKK- oder Doppelrechner-Strecke mehr rendern.');

// Gemeinsamer Bonusrechner: 2026-Logik trennt Geldbonus und Zuschuss fachlich sauber.
expect(/cash:\s*5,\s*subsidy:\s*15/.test(bonusCalculator) && /cash:\s*25,\s*subsidy:\s*75/.test(bonusCalculator), 'Der Bonusrechner muss Geldbonus und dreifachen Zuschuss getrennt modellieren.');
expect(/id:\s*'mutterschaft'[\s\S]*?countable:\s*true/.test(bonusCalculator), 'Mutterschaftsvorsorge muss je nachgewiesener Untersuchung zählbar sein.');
expect(/category:\s*'status'/.test(bonusCalculator) && /!hasRegularActivity/.test(bonusCalculator), 'Statuswerte dürfen nur zusammen mit einer regelmäßigen Aktivität zählen.');
expect(/Math\.min\(totalSubsidyPotential,\s*jahresbeitrag\)/.test(bonusCalculator), 'Der Versicherungszuschuss muss auf den nachgewiesenen Jahresbeitrag gedeckelt sein.');
expect(!/nettoErgebnis|resultPlus/.test(bonusCalculator), 'Ein nicht auszahlbarer Zuschussüberschuss darf nicht als Plus erscheinen.');
expect(/Geldbonus und Zuschuss sind Alternativen/.test(bonusCalculatorDe), 'Die Entweder-oder-Logik muss direkt am Rechner erklärt werden.');
// Deckt der Zuschuss den Beitrag, zeigt der Rechner einen bedingten Satz statt „0 €“ als effektive Kosten.
expect(/const bonusDecktBeispiel = effektivKosten === 0 && anrechenbarerZuschuss > 0;/.test(bonusCalculator) && /\{!bonusDecktBeispiel && \(/.test(bonusCalculator), 'Der Bonusrechner darf bei gedecktem Beitrag keine „0 €“ als effektive Kosten zeigen.');
expect(/"effectiveZeroNote": "Dein Bonus kann den Beitrag in diesem Beispiel ausgleichen, die Höhe hängt von deinen Aktivitäten ab\."/.test(bonusCalculatorDe), 'Statt „0 €“ braucht der Rechner den bedingten Satz mit Abhängigkeit von den Aktivitäten.');

// Zahn: ein lokaler Check, zwei Wege (Franks Entscheidung 05.10.2026): UKV ZahnPRIVAT
// für alle Situationen ohne angeratene Behandlung, auch 1 bis 3 fehlende Zähne mit
// Zuschlag je Zahn, und die Bayerische nur mit ZAHN Sofort für den Sofortschutz.
expect(dentalPage.indexOf('<DentalVideoSection />') < dentalPage.indexOf('<DentalZahnCheck />'), 'Zahn muss das Erklärvideo vor dem Zahn-Check zeigen.');
expect(/lang === 'de'\s*&&\s*<DentalVideoSection\s*\/>/.test(dentalPage), 'Das deutsche Zahn-Video darf auf der englischen Route keinen Abschnitt rendern.');
expect(dentalPage.indexOf('<DentalZahnCheck />') < dentalPage.indexOf('id="kassenbonus"'), 'Der Zahn-Check muss vor der Bonusbrücke stehen.');
expect(/routes:\s*\['UKV ZahnPRIVAT', 'Bayerische mit ZAHN Sofort'\]/.test(dentalContent), 'Der Zahn-Check muss genau die zwei Wege UKV ZahnPRIVAT und Bayerische mit ZAHN Sofort enthalten.');
expect(/1 bis 3 fehlenden, noch nicht ersetzten Zähnen/.test(dentalContent), 'Der UKV-Lückenweg muss die Grenze von ein bis drei fehlenden Zähnen erklären.');
expect(/6,10 EUR[^']*9,00 EUR[^']*10,90 EUR/.test(dentalContent), 'Der UKV-Lückenweg muss die geprüften Zuschläge je Zahn nennen.');
// UKV-Lückenregel (Maklerbetreuer, 05.10.2026): Heil- und Kostenplan oder Anratung in den
// letzten 2 Jahren schließt genau diese Behandlung aus, liegt das länger zurück, ist sie
// wieder versichert. Ob der bloße Wunsch nach einem Lückenschluss schadet, hat die UKV nicht
// bestätigt, deshalb steht dazu nichts im öffentlichen Text. Der Kontakt bleibt nur als Ergänzung, nie als einzige Aussage.
const zahnDe = read('src/i18n/locales/de/zahn.json');
const zahnEn = read('src/i18n/locales/en/zahn.json');
const seoRoutesSource = read('scripts/seo-routes.mjs');
const nitaKnowledge = read('public/mia-knowledge-base.txt');
const fehlenderZahnRatgeber = read('src/content/ratgeber/zahnzusatzversicherung-fehlender-zahn.js');
expect(/warning: 'Ab 4 fehlenden Zähnen ist keine Aufnahme möglich\. Gab es für deine Lücke in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde ihre Versorgung angeraten, ist genau diese Behandlung nicht versichert\. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert\.'/.test(dentalContent), 'Das UKV-Lückenergebnis muss die 2-Jahres-Regel zu Heil- und Kostenplan und Anratung klar erklären.');
expect(/exactly that treatment is not covered\. If that was more than 2 years ago, it is covered again\./.test(dentalContent), 'Das englische UKV-Lückenergebnis braucht dieselbe 2-Jahres-Regel.');
expect(/Wurde die Versorgung der Lücke in den letzten 2 Jahren angeraten oder geplant, ist genau diese Behandlung nicht versichert\./.test(dentalContent), 'Die UKV-Lückenkarte muss die 2-Jahres-Regel nennen.');
for (const [file, source] of Object.entries({ 'dentalContent.js': dentalContent, 'de/zahn.json': zahnDe, 'en/zahn.json': zahnEn, 'seo-routes.mjs': seoRoutesSource, 'mia-knowledge-base.txt': nitaKnowledge, 'Ratgeber fehlender Zahn': fehlenderZahnRatgeber })) {
  expect(!/(?:bloße Wunsch|irgendwann schließen lassen möchtest|ist kein Hindernis|is no obstacle|genau dieses Implantat)/.test(source), `${file} darf keine unbestätigte Aussage zum Wunsch nach Lückenschluss und kein Implantat-only-Beispiel enthalten.`);
}
expect(/contactLabel: 'Fragen zu deiner Lücke\? Sprich vorher mit uns'/.test(dentalContent) && /result\.contactLabel/.test(dentalCheck) && /getPath\('kontakt'\)/.test(dentalCheck), 'Der UKV-Lückenweg behält den Kontakt als Ergänzung zur Regel.');
const oldGapContactOnly = /(?:schon geplant oder (?:wurde sie dir )?empfohlen, sprich vor dem Antrag mit uns|schon geplant\? Sprich vorher mit uns|already planned or (?:has been )?recommended, talk to us before applying|already planned\? Talk to us first)/i;
for (const [file, source] of Object.entries({ 'dentalContent.js': dentalContent, 'de/zahn.json': zahnDe, 'en/zahn.json': zahnEn, 'seo-routes.mjs': seoRoutesSource, 'mia-knowledge-base.txt': nitaKnowledge, 'Ratgeber fehlender Zahn': fehlenderZahnRatgeber })) {
  expect(!oldGapContactOnly.test(source), `${file} darf bei geplanter Lückenversorgung nicht mehr nur auf das Gespräch verweisen, die 2-Jahres-Regel gehört dazu.`);
}
const gapFaqAnswer = dentalContent.match(/q: 'Kann ich mich mit fehlenden Zähnen noch versichern\?',\s*a: '([^']+)'/)?.[1];
expect(Boolean(gapFaqAnswer) && /ist genau diese Behandlung nicht versichert\. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert\./.test(gapFaqAnswer), 'Die Zahn-FAQ zu fehlenden Zähnen muss die 2-Jahres-Regel enthalten.');
expect(Boolean(gapFaqAnswer) && seoRoutesSource.includes(`name: 'Kann ich mich mit fehlenden Zähnen noch versichern?', acceptedAnswer: { '@type': 'Answer', text: '${gapFaqAnswer}' }`), 'Das FAQ-Schema auf /zahn muss die Lücken-Antwort wortgleich zur sichtbaren FAQ tragen.');
expect(/ist genau diese Behandlung nicht versichert\. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert\./.test(zahnDe) && /exactly that treatment is not covered\. If that was more than 2 years ago, it is covered again\./.test(zahnEn), 'Die Startseiten-FAQ aus zahn.json braucht die 2-Jahres-Regel in DE und EN.');
const nitaZahn = nitaKnowledge.slice(nitaKnowledge.indexOf('## Zahnzusatzversicherung'), nitaKnowledge.indexOf('## Für wen ist HEALIO geeignet?'));
expect(/Gab es in den letzten 2 Jahren einen Heil- und Kostenplan, also einen Kostenvoranschlag, oder hat der Zahnarzt eine Behandlung angeraten, ist genau diese Behandlung nicht versichert\. Liegt der Heil- und Kostenplan oder die Anratung länger als 2 Jahre zurück, ist das Thema wieder versichert\./.test(nitaZahn), 'Nita muss die UKV-2-Jahres-Regel im Zahnabschnitt klar erklären.');
expect(/ist die Versorgung genau dieser Lücke nicht versichert, egal ob Implantat oder Brücke/.test(nitaZahn), 'Nitas Beispiel muss die ganze Lückenversorgung meinen, nicht nur das Implantat.');
expect(!/sagt Nita nicht, wie die UKV dann entscheidet/.test(nitaKnowledge), 'Nita darf die 2-Jahres-Regel nicht mehr verschweigen.');
// Interna bleiben intern: Zuschlag und Vergütung gehören nie in öffentliche Zahntexte.
for (const [file, source] of Object.entries({ 'dentalContent.js': dentalContent, 'de/zahn.json': zahnDe, 'en/zahn.json': zahnEn, 'mia-knowledge-base.txt': nitaKnowledge, 'Ratgeber fehlender Zahn': fehlenderZahnRatgeber })) {
  expect(!/verprovision|Provision|Courtage|commission/i.test(source), `${file} darf keine Vergütung oder Courtage nennen.`);
}
expect(!/lkh|landeskrankenhilfe|zahnupgrade/i.test(`${dentalContent}\n${dentalCheck}\n${dentalPage}`), 'Die LKH darf auf der Zahnseite nicht mehr angeboten werden.');
expect(!/ZAHN Prestige/.test(`${dentalContent}\n${dentalPage}`), 'ZAHN Prestige ist kein eigener Zahn-Weg mehr; die Bayerische bleibt nur für den Sofortschutz.');
expect(/getPath\('kassenboost'\)/.test(dentalPage), 'Die Zahn-Bonusbrücke muss in KassenBoost statt in einen direkten Kassenwechsel führen.');
expect(!/bis zu 100 %[^'\n]{0,40}ausgleich|up to 100%[^'\n]{0,40}(?:offset|premium)/i.test(`${dentalContent}\n${dentalPage}`), 'Zahn darf die Beitragsentlastung nur als „ganz oder teilweise“ nennen, nie pauschal bis zu 100 Prozent.');
expect(!/KassenBoostChoiceHint|Testimonials/.test(dentalPage), 'Zahn darf keine alte Hinweis- oder Testimonials-Doppelstrecke rendern.');
// Brücken-Strecke auf Franks Wunsch (29.09.2026) zurück: genau einmal, als Zahn-Variante und erst nach Bonusbrücke und Bonusrechner.
expect((dentalPage.match(/<AmbulantIKKWechsel\b/g) || []).length === 1 && /<AmbulantIKKWechsel\s+variant="zahn"\s*\/>/.test(dentalPage), 'Zahn zeigt die Brücken-Strecke genau einmal als Zahn-Variante.');
expect(dentalPage.indexOf('<CompactBonusFeature') < dentalPage.indexOf('<AmbulantIKKWechsel') && dentalPage.indexOf('id="kassenbonus"') < dentalPage.indexOf('<AmbulantIKKWechsel'), 'Die Zahn-Brücken-Strecke steht erst nach Bonusbrücke und Bonusrechner.');

// Stationär: SP2, SP1 und SPU werden getrennt; SPU trägt die konkrete Modellrechnung, ohne 0-EUR-Versprechen (Frank 03.10.2026).
expect(inpatientPage.indexOf('<ExplainerVideoCard') < inpatientPage.indexOf('<StationaerTariffSelector />'), 'Stationär muss das Erklärvideo vor der Tarifwahl zeigen.');
expect(/lang === 'de'\s*&&\s*\(\s*<ExplainerVideoCard/.test(inpatientPage), 'Das deutsche Stationär-Video darf auf der englischen Route keinen Abschnitt rendern.');
expect(/<StationaerTariffSelector\s*\/>[\s\S]*?<StationaerBonusBridge\s*\/>/.test(inpatientPage), 'Stationär muss die Tarifwahl vor der Bonusbrücke zeigen.');
expect(!/erklaervideo-stationaer\.mp4/.test(inpatientBonus), 'Das Stationär-Video darf im Bonusblock nicht doppelt erscheinen.');
expect(/SP2/.test(inpatientDe) && /SP1/.test(inpatientDe) && /SPU/.test(inpatientDe), 'Stationär muss SP2, SP1 und SPU sichtbar unterscheiden.');
expect(/Nur nach Unfall|Unfallschutz/i.test(inpatientDe), 'SPU muss sichtbar als Unfallschutz gekennzeichnet sein.');
expect(/7,00\s*EUR/.test(inpatientDe) && /84,00\s*EUR/.test(inpatientDe), 'Die konkrete Modellrechnung muss das aktuelle SPU-Beispiel transparent abbilden.');
expect(!/"0 EUR"|Effektiver Restbeitrag|kein effektiver Restbeitrag/.test(inpatientDe), 'Stationär darf keinen effektiven Restbeitrag von 0 EUR versprechen.');
// Rote Linie: bei SP1/SP2 gleicht der Bonus „teilweise“ aus, ganz nur beim SPU.
expect(/"lead": "Bei SP1 und SP2 gleicht dein Bonus den Beitrag meist teilweise aus, beim günstigen SPU oft ganz\./.test(inpatientDe), 'Die Stationär-Bonusbrücke nennt für SP1/SP2 „teilweise“, ganz nur beim SPU.');
expect(!/effektiven Tarifbeitrag bis zu 100 %|Bis zu 100 % Beitragsentlastung/.test(inpatientDe) && !/teilweise oder bis zu 100 %/.test(inpatientPage), 'Stationär darf die Beitragsentlastung nicht pauschal mit bis zu 100 Prozent bewerben.');
expect(/nach dem Bonusjahr/.test(inpatientDe) && /nachgewiesenen Jahresbeitrags/.test(inpatientDe), 'Das SPU-Beispiel braucht Kostendeckel und Zeitversatz in Sichtnähe.');
expect(/33,41\s*EUR/.test(inpatientDe) && /50,72\s*EUR/.test(inpatientDe), 'Stationär muss die aktuellen SDK-Beispielbeiträge für SP2 und SP1 bei Eintrittsalter 30 nennen.');
expect(!/6,84|82,08|32,82|49,78|10,49|44,91|69,74/.test(inpatientDe), 'Stationär darf keine veralteten oder unbelegten Preisbeispiele enthalten.');
expect(/getPath\('kassenboost'\)/.test(inpatientBonus), 'Die Stationär-Bonusbrücke muss in KassenBoost führen.');
expect(!/AmbulantBonusCalculator|KassenBoostChoiceHint/.test(inpatientPage), 'Stationär darf keinen ambulanten Doppelrechner und keinen alten KassenBoost-Hinweis rendern.');
// Brücken-Strecke auf Franks Wunsch (29.09.2026) zurück: genau einmal, als Stationär-Variante und erst nach Bonusbrücke und Bonusrechner.
expect((inpatientPage.match(/<AmbulantIKKWechsel\b/g) || []).length === 1 && /<AmbulantIKKWechsel\s+variant="stationaer"\s*\/>/.test(inpatientPage), 'Stationär zeigt die Brücken-Strecke genau einmal als Stationär-Variante.');
expect(inpatientPage.indexOf('<StationaerBonusBridge') < inpatientPage.indexOf('<AmbulantIKKWechsel') && inpatientPage.indexOf('<CompactBonusFeature') < inpatientPage.indexOf('<AmbulantIKKWechsel'), 'Die Stationär-Brücken-Strecke steht erst nach Bonusbrücke und Bonusrechner.');

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
