import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe2,
  Info,
  Languages,
  HelpCircle,
  Sparkles,
  TrendingUp,
  CalendarCheck,
  ArrowUpRight,
  HeartPulse
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import SEOHead from '@/components/SEOHead';

// Beispielseite für die Mitarbeiter von Tabea (Diakonie, Pflege, Hamburg), Stand 19.11.2026.
// Aufgebaut nach /fallen-anker (Kopie, damit /fallen-anker unverändert bleibt).
// Noindex, nirgends verlinkt, nicht in der Sitemap. Texte bewusst in der Seite,
// damit die globalen i18n-Dateien unberührt bleiben.

// Rahmenwerte 2026 (jährlich prüfen)
// Kein Arbeitgeberbeitrag im Rechner: Mitarbeiter sind über die EZVK versorgt, dazu kommt ein freiwilliger Eigenbeitrag
const BEITRAG_MIN = 25;
const BEITRAG_MAX = 338; // 4 % der BBG (allg. Rentenversicherung) 2026 pro Monat
const KASSENBOOST_URL = 'https://kassenboost.de';

// Beispielwerte, vor Kundeneinsatz mit echten Tarifen abgleichen.
// BU-Beispiel: 1.000 EUR Rente im Monat, 30 Jahre alt, Schutz bis 67, Beitrag im Monat vom Bruttolohn.
const BU_BEISPIELE = [
  { von: 35, bis: 55 }, // Verwaltung und Büro
  { von: 60, bis: 90 }, // Betreuung und Hauswirtschaft
  { von: 80, bis: 130 } // Pflege
];
const TERMIN_URL = 'https://healio.de/termin';

const SZENARIEN = [
  { zins: 0.007, key: 'old' },
  { zins: 0.04, key: 'model' },
  { zins: 0.06, key: 'model' },
  { zins: 0.08, key: 'model' }
];

const euro = (wert) =>
  new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(wert));

const prozent = (wert) =>
  `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(wert * 100)} %`;

// FV = B × ((1 + r/12)^(12·n) − 1) / (r/12), Einzahlung zum Monatsende
const endkapital = (monatlich, zinsProJahr, jahre) => {
  const i = zinsProJahr / 12;
  const n = jahre * 12;
  if (i === 0) return monatlich * n;
  return monatlich * ((Math.pow(1 + i, n) - 1) / i);
};

// Jahresangabe mit passender Mehrzahl je Sprache
const jahreText = (lang, n) => {
  if (lang === 'en') return `${n} ${n === 1 ? 'year' : 'years'}`;
  if (lang === 'tr') return `${n} yıl`;
  if (lang === 'pl') {
    if (n === 1) return '1 rok';
    const m10 = n % 10;
    const m100 = n % 100;
    return `${n} ${m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'lata' : 'lat'}`;
  }
  return `${n} ${n === 1 ? 'Jahr' : 'Jahre'}`;
};

// Platzhalter {key} durch hervorgehobene Werte ersetzen
const mitWerten = (text, werte, className) =>
  text.split(/(\{[a-z]+\})/).map((teil, i) => {
    const key = teil.match(/^\{([a-z]+)\}$/)?.[1];
    return key && key in werte ? (
      <strong key={i} className={className}>{werte[key]}</strong>
    ) : (
      <React.Fragment key={i}>{teil}</React.Fragment>
    );
  });

const kurzEuro = (wert) =>
  wert >= 1000 ? `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(wert / 1000)} T` : euro(wert);

const SPRACHEN = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'pl', label: 'Polski' }
];

const TEXTE = {
  de: {
    badge: 'Beispielseite für Tabea',
    h1: 'Du hast schon eine Betriebsrente. Weißt du, was noch möglich ist?',
    intro: 'Hier siehst du in wenigen Minuten, was du schon hast. Und was du freiwillig noch tun kannst, wenn du möchtest.',
    ctaCalc: 'Jetzt ausrechnen',
    ctaAdvice: 'Beratung anfragen',
    langLabel: 'Sprache wählen',
    moreLangs: 'Weitere Sprachen nach Wunsch.',
    whyBadge: 'Deine Lage',
    whyTitle: 'Das hast du schon',
    why: [
      { title: 'Du bist in der EZVK', text: 'Über deinen Arbeitgeber bist du in der EZVK. Das ist die Zusatzversorgung im kirchlichen Dienst. Sie ist eine Betriebsrente für dich.' },
      { title: 'Eine gute Grundlage', text: 'Die EZVK ist eine gute Grundlage für dein Alter. Sie bleibt, wie sie ist. Du musst dafür nichts ändern.' },
      { title: 'Du kannst mehr tun', text: 'Daneben kannst du freiwillig mehr tun. Zum Beispiel zusätzlich fürs Alter vorsorgen oder deine Arbeitskraft absichern. Du entscheidest selbst.' }
    ],
    waysBadge: 'Drei Wege',
    waysTitle: 'Was willst du zusätzlich tun?',
    waysSub: 'Du kannst einen Weg wählen oder beide verbinden.',
    ways: [
      { title: 'Zusätzlich fürs Alter vorsorgen', text: 'Du legst jeden Monat einen Betrag zur Seite, direkt aus dem Bruttolohn. So zahlst du darauf weniger Steuern und Abgaben. Im Rechner unten siehst du, was daraus werden kann.' },
      { title: 'Deine Arbeitskraft absichern', text: 'Gerade in der Pflege ist eine Berufsunfähigkeitsversicherung privat oft teuer oder gar nicht zu bekommen. Über eine Gruppenlösung des Arbeitgebers ist der Zugang je nach Anbieter deutlich leichter.' },
      { title: 'Beides', text: 'Du sorgst fürs Alter vor und schützt deine Arbeitskraft. Was zu dir passt und was es kostet, klären wir in der Beratung.' }
    ],
    buBadge: 'Arbeitskraft',
    buTitle: 'Deine Arbeitskraft absichern',
    buIntro: 'Wenn du wegen Krankheit oder Unfall lange nicht mehr arbeiten kannst, fehlt dein Lohn. Eine Berufsunfähigkeitsversicherung zahlt dir dann jeden Monat eine Rente. Gerade in der Pflege ist sie privat oft teuer oder gar nicht zu bekommen. Über eine Gruppenlösung des Arbeitgebers ist der Zugang je nach Anbieter deutlich leichter.',
    buPriceTitle: 'So viel könnte es kosten',
    buPriceSub: 'Beispiel: 1.000 EUR Rente im Monat, 30 Jahre alt, Schutz bis 67.',
    buGroups: ['Verwaltung und Büro', 'Betreuung und Hauswirtschaft', 'Pflege'],
    buRange: 'etwa {von} bis {bis} EUR',
    buPer: 'Beitrag im Monat, vom Bruttolohn',
    buNetto: 'Weil der Beitrag vom Bruttolohn abgeht, fehlt dir netto deutlich weniger, oft nur etwa die Hälfte.',
    buNote: 'Beispielwerte zur Orientierung, kein Angebot. Dein Beitrag hängt von Alter, Tätigkeit, Gesundheitsangaben, Rentenhöhe und Anbieter ab. Die Rente aus einer betrieblichen Absicherung ist zu versteuern, es fallen Beiträge zur Kranken- und Pflegeversicherung an.',
    buButton: 'Meinen Beitrag anfragen',
    calcSub: 'Stell ein, wie viel du im Monat zusätzlich zur Seite legen möchtest.',
    ownLabel: 'Dein eigener Beitrag im Monat',
    ownHint: 'Möglich sind 25 bis {max} EUR im Monat.',
    nettoNote: 'Dein Beitrag geht vom Bruttolohn ab. Darauf zahlst du weniger Steuern und Abgaben. Darum fehlt dir netto weniger, als du einzahlst. Wie viel genau, rechnen wir in der Beratung für dich aus.',
    kbBadge: 'Krankenkasse',
    kbTitle: 'Hast du die passende Krankenkasse?',
    kbText: 'KassenBoost vergleicht die gesetzlichen Krankenkassen in wenigen Minuten: Zusatzbeitrag nach Bundesland, Bonus und Leistungen. Du siehst, wie viel Geld in deiner Kasse für dich steckt. Kostenlos.',
    kbPoints: ['Zusatzbeitrag nach Bundesland', 'Bonus', 'Leistungen'],
    kbButton: 'Jetzt vergleichen',
    rvBadge: 'Möglich, wenn dein Arbeitgeber mitmacht',
    rvTitle: 'Auch für Hausrat, Haftpflicht und Auto',
    rvText: 'Über Rahmenverträge kann es für Mitarbeiter vergünstigte Konditionen geben. Das ist möglich, wenn dein Arbeitgeber mitmacht. Alles digital, in wenigen Minuten.',
    rvItems: ['Hausrat', 'Haftpflicht', 'Auto'],
    grossNote: 'Bruttolohn heißt: dein Lohn vor Steuern und Abgaben.',
    calcBadge: 'Dein Rechner',
    calcTitle: 'Rechne selbst nach',
    yearsLabel: 'Wie viele Jahre noch bis zur Rente?',
    yearsUnit: 'Jahre',
    perMonth: 'im Monat',
    ziBadge: 'Zinseszins',
    ziTitle: 'Zinseszins: Dein Geld arbeitet für dich',
    ziText: 'Du bekommst Zinsen auf dein Geld. Im nächsten Jahr bekommst du auch Zinsen auf diese Zinsen. Darum wächst es am Ende immer schneller.',
    ziRateLabel: 'Wähle eine Verzinsung im Jahr',
    ziKey: 'Von {ende} hast du {einzahlung} eingezahlt. {zuwachs} kommen aus Zinsen und Zinseszins.',
    ziEndLabel: 'Guthaben nach {jahre} Jahren',
    ziLegendPaid: 'Eingezahlt',
    ziLegendGain: 'Zinsen und Zinseszins',
    ziAxisYears: 'Jahre',
    ziChartAria: 'Diagramm: So wächst dein Guthaben über {jt} bei {zins} im Jahr.',
    ziValuesToggle: 'Werte als Text anzeigen',
    ziValuesRow: 'Nach {jahr} Jahren: {wert} EUR, davon eingezahlt {einzahlung} EUR',
    earlyTitle: 'Früh anfangen lohnt sich',
    earlyText: 'Gleiche Rate von {rate} EUR im Monat, gleiche Verzinsung. Nur der Start ist anders.',
    earlyNow: 'Heute anfangen ({jt})',
    earlyLater: '10 Jahre später anfangen ({jt})',
    earlyDiff: 'So viel mehr bringt dir der frühe Start',
    cardsTitle: 'Alle Beispiele im Überblick',
    cardsHint: 'Tippe auf eine Karte, dann siehst du sie im Diagramm.',
    rateNote: 'Die Prozentwerte sind Beispiele für eine mögliche jährliche Wertentwicklung, keine festen Zinsen.',
    scenSub: 'Gleiche Einzahlung, {jt} lang. Nur die Verzinsung ist anders.',
    perYear: 'im Jahr',
    tagOld: 'klassischer Altvertrag, Beispiel',
    tagModel: 'Modellrechnung',
    paidIn: 'Eingezahlt',
    endValue: 'Mögliches Guthaben am Ende',
    swipeHint: 'Wische zur Seite für mehr Beispiele.',
    disclaimer: 'Unverbindliche Modellrechnung, keine Zusage. Bei Anlagen am Aktienmarkt schwankt der Wert, auch Verluste sind möglich. Frühere Wertentwicklungen sagen nichts Verlässliches über die Zukunft. Betriebsrenten sind in der Auszahlung zu versteuern, es fallen Beiträge zur Kranken- und Pflegeversicherung an.',
    askBadge: 'Beispiel, geplante Leistung',
    askTitle: 'Fragen? Frag einfach.',
    askNote: 'So könnte es aussehen. Die Telefonnummer bekommst du, sobald der Dienst startet.',
    baTitle: 'Dein Vorher und Nachher',
    baText: 'In einer persönlichen Beratung schauen wir uns deine Unterlagen gemeinsam an. Du siehst auf den Cent genau, was du heute hast und was möglich wäre. Danach entscheidest du in Ruhe.',
    beforeTitle: 'Vorher: Das hast du heute',
    afterTitle: 'Nachher: Das wäre möglich',
    baButton: 'Beratung anfragen',
    baNote: 'Die Beratung kostet dich nichts.',
    faqTitle: 'Häufige Fragen',
    footer: 'Beispielseite der Healio GmbH, Hamburg',
    footerNote: 'Diese Seite ist eine allgemeine Information und ersetzt keine persönliche Beratung.',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    askText: 'Bald kannst du anrufen und mit einem Telefonassistenten sprechen. Der Assistent arbeitet mit künstlicher Intelligenz (KI). Er spricht deine Sprache und ist rund um die Uhr für dich da. Du kannst ihn alles zur Betriebsrente und zur Absicherung fragen.',
    askPoints: ['In deiner Sprache', 'Rund um die Uhr', 'Alle Fragen zu Rente und Absicherung'],
    beforePoints: ['Was steht in deinen Unterlagen zur EZVK?', 'Wie bist du heute geschützt, wenn du nicht mehr arbeiten kannst?', 'Was bekommst du später insgesamt?'],
    afterPoints: ['Was bringt ein eigener Beitrag?', 'Was bleibt dir netto im Monat?', 'Welcher Schutz passt zu dir?'],
    faq: [
      { q: 'Was ist mit meiner EZVK?', a: 'Deine EZVK bleibt unverändert. Alles auf dieser Seite kommt freiwillig dazu. Du gibst nichts auf.' },
      { q: 'Kostet mich das etwas?', a: 'Die Beratung ist für dich kostenlos. Wenn du selbst einen Beitrag zahlst, geht er von deinem Bruttolohn ab. Netto fehlt dir dann weniger, als du einzahlst.' },
      { q: 'Was ist eine Berufsunfähigkeitsversicherung?', a: 'Sie zahlt dir jeden Monat eine Rente, wenn du deinen Beruf aus gesundheitlichen Gründen nicht mehr ausüben kannst. Die genauen Bedingungen stehen im Vertrag.' },
      { q: 'Was ist mit Steuern?', a: 'Beiträge zur zusätzlichen Altersvorsorge aus dem Bruttolohn sind bis zu einer Grenze frei von Steuern und Sozialabgaben. Steuern zahlst du später, wenn das Geld in der Rente ausgezahlt wird. Dann fallen auch Beiträge zur Kranken- und Pflegeversicherung an.' },
      { q: 'Muss ich etwas tun?', a: 'Nein. Alles hier ist freiwillig. Wenn du möchtest, schauen wir gemeinsam, was zu dir passt.' }
    ]
  },
  en: {
    badge: 'Example page for Tabea',
    h1: 'You already have a company pension. Do you know what else is possible?',
    intro: 'Here you can see in a few minutes what you already have. And what more you can do, if you want to.',
    ctaCalc: 'Calculate now',
    ctaAdvice: 'Ask for advice',
    langLabel: 'Choose language',
    moreLangs: 'More languages on request.',
    whyBadge: 'Your situation',
    whyTitle: 'What you already have',
    why: [
      { title: 'You are in the EZVK', text: 'Through your employer, you are in the EZVK. This is the supplementary pension scheme for people who work for the church. It is a company pension for you.' },
      { title: 'A good foundation', text: 'The EZVK is a good foundation for your retirement. It stays as it is. You do not have to change anything.' },
      { title: 'You can do more', text: 'On top of that, you can choose to do more. For example, save extra for retirement or protect your ability to work. It is your decision.' }
    ],
    waysBadge: 'Three options',
    waysTitle: 'What would you like to add?',
    waysSub: 'You can choose one option or combine both.',
    ways: [
      { title: 'Save extra for retirement', text: 'You put money aside every month, straight from your gross pay. That way you pay less tax and fewer deductions on it. The calculator below shows what it could grow into.' },
      { title: 'Protect your ability to work', text: 'In care work in particular, private occupational disability insurance is often expensive or not available at all. With a group plan through your employer, access is much easier, depending on the provider.' },
      { title: 'Both', text: 'You save for retirement and protect your ability to work. In a personal meeting we work out what suits you and what it costs.' }
    ],
    buBadge: 'Ability to work',
    buTitle: 'Protect your ability to work',
    buIntro: 'If you cannot work for a long time because of illness or an accident, your wages stop. Occupational disability insurance then pays you a pension every month. In care work in particular, it is often expensive or not available at all as a private policy. With a group plan through your employer, access is much easier, depending on the provider.',
    buPriceTitle: 'What it could cost',
    buPriceSub: 'Example: 1.000 EUR pension a month, age 30, cover until 67.',
    buGroups: ['Administration and office', 'Support and housekeeping', 'Nursing care'],
    buRange: 'about {von} to {bis} EUR',
    buPer: 'Contribution per month, from your gross pay',
    buNetto: 'Because the contribution comes out of your gross pay, your take-home pay goes down by much less, often only about half.',
    buNote: 'Example figures for guidance, not an offer. Your contribution depends on your age, job, health information, pension amount and provider. A pension from a company plan is taxable, and contributions to health and long-term care insurance apply.',
    buButton: 'Ask about my contribution',
    calcSub: 'Set how much you would like to put aside each month.',
    ownLabel: 'Your own contribution per month',
    ownHint: 'Anything from 25 to {max} EUR a month.',
    nettoNote: 'Your contribution comes out of your gross pay. You pay less tax and fewer deductions on it. So your take-home pay goes down by less than you pay in. We work out the exact amount for you in a personal meeting.',
    kbBadge: 'Health insurance',
    kbTitle: 'Do you have the right health insurance fund?',
    kbText: 'KassenBoost compares the statutory health insurance funds in just a few minutes: additional contribution by federal state, bonus and benefits. You can see how much money your fund holds for you. Free of charge.',
    kbPoints: ['Additional contribution by federal state', 'Bonus', 'Benefits'],
    kbButton: 'Compare now',
    rvBadge: 'Possible if your employer takes part',
    rvTitle: 'Also for home contents, liability and car',
    rvText: 'Through group agreements, employees may get better terms. This is possible if your employer takes part. Everything is digital and takes just a few minutes.',
    rvItems: ['Home contents', 'Personal liability', 'Car'],
    grossNote: 'Gross pay means your pay before tax and deductions.',
    calcBadge: 'Your calculator',
    calcTitle: 'Do the maths yourself',
    yearsLabel: 'How many years until you retire?',
    yearsUnit: 'years',
    perMonth: 'a month',
    ziBadge: 'Compound interest',
    ziTitle: 'Compound interest: your money works for you',
    ziText: 'You get interest on your money. The next year, you also get interest on that interest. That is why it grows faster and faster in the end.',
    ziRateLabel: 'Choose a yearly rate',
    ziKey: 'Of {ende}, you paid in {einzahlung}. {zuwachs} come from interest and compound interest.',
    ziEndLabel: 'Savings after {jahre} years',
    ziLegendPaid: 'Paid in',
    ziLegendGain: 'Interest and compound interest',
    ziAxisYears: 'Years',
    ziChartAria: 'Chart: how your savings grow over {jt} at {zins} a year.',
    ziValuesToggle: 'Show values as text',
    ziValuesRow: 'After {jahr} years: {wert} EUR, of which {einzahlung} EUR paid in',
    earlyTitle: 'Starting early pays off',
    earlyText: 'Same {rate} EUR a month, same rate. Only the start is different.',
    earlyNow: 'Start today ({jt})',
    earlyLater: 'Start 10 years later ({jt})',
    earlyDiff: 'This is how much more an early start gives you',
    cardsTitle: 'All examples at a glance',
    cardsHint: 'Tap a card to see it in the chart.',
    rateNote: 'The percentages are examples of possible yearly growth, not fixed interest rates.',
    scenSub: 'Same payment for {jt}. Only the rate is different.',
    perYear: 'a year',
    tagOld: 'classic old contract, example',
    tagModel: 'model calculation',
    paidIn: 'Paid in',
    endValue: 'Possible amount at the end',
    swipeHint: 'Swipe sideways for more examples.',
    disclaimer: 'Non-binding model calculation, not a promise. With stock market investments the value goes up and down, and losses are possible. Past performance tells you nothing reliable about the future. Company pensions are taxed when they are paid out, and contributions to health and long-term care insurance apply.',
    askBadge: 'Example, planned service',
    askTitle: 'Questions? Just ask.',
    askNote: 'This is how it could look. You will get the phone number as soon as the service starts.',
    baTitle: 'Your before and after',
    baText: 'In a personal meeting we look at your documents together. You see down to the cent what you have today and what would be possible. Then you decide in your own time.',
    beforeTitle: 'Before: what you have today',
    afterTitle: 'After: what would be possible',
    baButton: 'Ask for advice',
    baNote: 'The advice is free for you.',
    faqTitle: 'Common questions',
    footer: 'Example page by Healio GmbH, Hamburg',
    footerNote: 'This page is general information and does not replace personal advice.',
    imprint: 'Legal notice',
    privacy: 'Privacy',
    askText: 'Soon you will be able to call and talk to a phone assistant. The assistant uses artificial intelligence (AI). It speaks your language and is there for you day and night. You can ask it anything about your company pension and about protecting your income.',
    askPoints: ['In your language', 'Day and night', 'All questions about pensions and protection'],
    beforePoints: ['What do your EZVK documents say?', 'How are you covered today if you can no longer work?', 'What will you get later in total?'],
    afterPoints: ['What does your own contribution add?', 'What is left of your take-home pay?', 'Which protection suits you?'],
    faq: [
      { q: 'What about my EZVK?', a: 'Your EZVK stays exactly as it is. Everything on this page is voluntary and comes on top. You do not give anything up.' },
      { q: 'Does it cost me anything?', a: 'The advice is free for you. If you pay a contribution yourself, it comes out of your gross pay. Your take-home pay then goes down by less than you pay in.' },
      { q: 'What is occupational disability insurance?', a: 'It pays you a pension every month if you can no longer do your job for health reasons. The exact conditions are set out in the contract.' },
      { q: 'What about taxes?', a: 'Extra retirement contributions from your gross pay are free of tax and social security contributions up to a limit. You pay tax later, when the money is paid out in retirement. Contributions to health and long-term care insurance are due then as well.' },
      { q: 'Do I have to do anything?', a: 'No. Everything here is voluntary. If you like, we can look together at what suits you.' }
    ]
  },
  tr: {
    badge: 'Tabea için örnek sayfa',
    h1: 'Zaten bir işyeri emekliliğin var. Başka neler mümkün, biliyor musun?',
    intro: 'Burada birkaç dakikada neye sahip olduğunu görürsün. İstersen başka neler yapabileceğini de.',
    ctaCalc: 'Hemen hesapla',
    ctaAdvice: 'Danışmanlık iste',
    langLabel: 'Dil seç',
    moreLangs: 'İstersen başka diller de eklenebilir.',
    whyBadge: 'Durumun',
    whyTitle: 'Zaten sahip oldukların',
    why: [
      { title: 'EZVK’dasın', text: 'İşverenin aracılığıyla EZVK’dasın. EZVK, kilise kurumlarında çalışanlar için ek emeklilik sistemidir. Senin için bir işyeri emekliliğidir.' },
      { title: 'İyi bir temel', text: 'EZVK, emekliliğin için iyi bir temeldir. Olduğu gibi kalır. Bir şey değiştirmen gerekmez.' },
      { title: 'Daha fazlasını yapabilirsin', text: 'Bunun yanında isteğe bağlı olarak daha fazlasını yapabilirsin. Örneğin emeklilik için ek birikim yapabilir ya da çalışma gücünü koruma altına alabilirsin. Karar senin.' }
    ],
    waysBadge: 'Üç yol',
    waysTitle: 'Ek olarak ne yapmak istersin?',
    waysSub: 'Bir yol seçebilir ya da ikisini birleştirebilirsin.',
    ways: [
      { title: 'Emeklilik için ek birikim', text: 'Her ay doğrudan brüt maaşından bir miktar ayırırsın. Böylece bu tutar için daha az vergi ve kesinti ödersin. Aşağıdaki hesaplayıcıda bunun neye dönüşebileceğini görürsün.' },
      { title: 'Çalışma gücünü koru', text: 'Özellikle bakım sektöründe özel bir meslekte çalışamama sigortası (Berufsunfähigkeitsversicherung) çoğu zaman pahalıdır ya da hiç yapılamaz. İşverenin grup çözümüyle, sağlayıcıya göre erişim çok daha kolaydır.' },
      { title: 'İkisi birden', text: 'Hem emekliliğin için birikim yaparsın hem de çalışma gücünü korursun. Sana neyin uyduğunu ve maliyetini danışmanlıkta birlikte konuşuruz.' }
    ],
    buBadge: 'Çalışma gücü',
    buTitle: 'Çalışma gücünü koru',
    buIntro: 'Hastalık ya da kaza yüzünden uzun süre çalışamazsan maaşın kesilir. Meslekte çalışamama sigortası o zaman sana her ay bir ödeme yapar. Özellikle bakım sektöründe bu sigorta özel olarak çoğu zaman pahalıdır ya da hiç yapılamaz. İşverenin grup çözümüyle, sağlayıcıya göre erişim çok daha kolaydır.',
    buPriceTitle: 'Maliyeti ne kadar olabilir',
    buPriceSub: 'Örnek: Ayda 1.000 EUR ödeme, 30 yaşında, 67 yaşına kadar koruma.',
    buGroups: ['İdare ve büro', 'Bakım desteği ve ev işleri', 'Hemşirelik ve bakım'],
    buRange: 'yaklaşık {von} ile {bis} EUR',
    buPer: 'Aylık prim, brüt maaştan',
    buNetto: 'Prim brüt maaşından kesildiği için net maaşından çok daha azı eksilir, çoğu zaman yaklaşık yarısı.',
    buNote: 'Yönlendirme amaçlı örnek değerlerdir, teklif değildir. Primin; yaşına, işine, sağlık bilgilerine, ödeme tutarına ve sağlayıcıya bağlıdır. İşyeri üzerinden yapılan korumadan alınan ödeme vergilendirilir, sağlık ve bakım sigortası primleri kesilir.',
    buButton: 'Primimi sor',
    calcSub: 'Her ay ek olarak ne kadar ayırmak istediğini ayarla.',
    ownLabel: 'Aylık kendi katkın',
    ownHint: 'Ayda 25 ile {max} EUR arası mümkün.',
    nettoNote: 'Katkın brüt maaşından kesilir. Bu tutar için daha az vergi ve kesinti ödersin. Bu yüzden net maaşından, yatırdığın tutardan daha azı eksilir. Tam tutarı danışmanlıkta senin için hesaplarız.',
    kbBadge: 'Sağlık sigortası',
    kbTitle: 'Sana uygun sağlık sigortası kurumunda mısın?',
    kbText: 'KassenBoost, yasal sağlık sigortası kurumlarını birkaç dakikada karşılaştırır: eyalete göre ek prim, bonus ve hizmetler. Kurumunda senin için ne kadar para olduğunu görürsün. Ücretsiz.',
    kbPoints: ['Eyalete göre ek prim', 'Bonus', 'Hizmetler'],
    kbButton: 'Hemen karşılaştır',
    rvBadge: 'İşverenin katılırsa mümkün',
    rvTitle: 'Ev eşyası, sorumluluk ve araç için de',
    rvText: 'Çerçeve sözleşmeler sayesinde çalışanlar için daha uygun koşullar olabilir. Bu, işverenin katılırsa mümkündür. Her şey dijital, birkaç dakikada.',
    rvItems: ['Ev eşyası', 'Sorumluluk', 'Araç'],
    grossNote: 'Brüt maaş, vergiler ve kesintilerden önceki maaşındır.',
    calcBadge: 'Hesaplayıcın',
    calcTitle: 'Kendin hesapla',
    yearsLabel: 'Emekliliğe kaç yıl kaldı?',
    yearsUnit: 'yıl',
    perMonth: 'ayda',
    ziBadge: 'Bileşik faiz',
    ziTitle: 'Bileşik faiz: Paran senin için çalışır',
    ziText: 'Paran için faiz alırsın. Ertesi yıl bu faizin de faizini alırsın. Bu yüzden paran sonunda giderek daha hızlı büyür.',
    ziRateLabel: 'Yıllık bir oran seç',
    ziKey: 'Toplam {ende}. Bunun {einzahlung} kısmını sen yatırdın. {zuwachs} faiz ve bileşik faizden gelir.',
    ziEndLabel: '{jahre} yıl sonra birikim',
    ziLegendPaid: 'Yatırılan',
    ziLegendGain: 'Faiz ve bileşik faiz',
    ziAxisYears: 'Yıl',
    ziChartAria: 'Grafik: Birikimin yıllık {zins} ile {jt} içinde böyle büyür.',
    ziValuesToggle: 'Değerleri metin olarak göster',
    ziValuesRow: '{jahr} yıl sonra: {wert} EUR, bunun {einzahlung} EUR kısmı yatırılan',
    earlyTitle: 'Erken başlamak kazandırır',
    earlyText: 'Ayda aynı {rate} EUR, aynı oran. Sadece başlangıç farklı.',
    earlyNow: 'Bugün başla ({jt})',
    earlyLater: '10 yıl sonra başla ({jt})',
    earlyDiff: 'Erken başlamak sana bu kadar fazlasını getirir',
    cardsTitle: 'Tüm örnekler bir bakışta',
    cardsHint: 'Grafikte görmek için bir karta dokun.',
    rateNote: 'Yüzde değerleri, olası bir yıllık değer artışı için örneklerdir, sabit faiz değildir.',
    scenSub: '{jt} boyunca aynı ödeme. Sadece oran farklı.',
    perYear: 'yıllık',
    tagOld: 'klasik eski sözleşme, örnek',
    tagModel: 'model hesaplama',
    paidIn: 'Yatırılan',
    endValue: 'Sonunda olası birikim',
    swipeHint: 'Daha fazla örnek için yana kaydır.',
    disclaimer: 'Bağlayıcı olmayan bir model hesaplamadır, bir taahhüt değildir. Borsadaki yatırımlarda değer iner ve çıkar, kayıplar da mümkündür. Geçmişteki getiriler gelecek hakkında güvenilir bir bilgi vermez. İşyeri emeklilik ödemeleri ödeme sırasında vergilendirilir, ayrıca sağlık ve bakım sigortası primleri kesilir.',
    askBadge: 'Örnek, planlanan hizmet',
    askTitle: 'Soruların mı var? Hemen sor.',
    askNote: 'Böyle görünebilir. Hizmet başlar başlamaz telefon numarasını alacaksın.',
    baTitle: 'Senin öncen ve sonran',
    baText: 'Kişisel bir görüşmede belgelerine birlikte bakarız. Bugün neye sahip olduğunu ve neyin mümkün olduğunu kuruşu kuruşuna görürsün. Sonra acele etmeden karar verirsin.',
    beforeTitle: 'Önce: bugün sahip oldukların',
    afterTitle: 'Sonra: mümkün olanlar',
    baButton: 'Danışmanlık iste',
    baNote: 'Danışmanlık senin için ücretsiz.',
    faqTitle: 'Sık sorulan sorular',
    footer: 'Healio GmbH’nin örnek sayfası, Hamburg',
    footerNote: 'Bu sayfa genel bilgi içindir ve kişisel danışmanlığın yerini tutmaz.',
    imprint: 'Künye (Impressum)',
    privacy: 'Gizlilik (Datenschutz)',
    askText: 'Yakında arayıp bir telefon asistanıyla konuşabileceksin. Asistan yapay zekâ (YZ) ile çalışır. Senin dilini konuşur ve günün her saatinde yanındadır. İşyeri emekliliği ve korunma hakkında ona her şeyi sorabilirsin.',
    askPoints: ['Kendi dilinde', 'Günün her saatinde', 'Emeklilik ve korunmayla ilgili tüm sorular'],
    beforePoints: ['EZVK belgelerinde ne yazıyor?', 'Çalışamazsan bugün nasıl korunuyorsun?', 'İleride toplam ne alacaksın?'],
    afterPoints: ['Kendi katkın ne kazandırır?', 'Ayda net olarak sana ne kalır?', 'Sana hangi koruma uyar?'],
    faq: [
      { q: 'EZVK’m ne olacak?', a: 'EZVK’n hiç değişmeden kalır. Bu sayfadaki her şey isteğe bağlıdır ve ek olarak gelir. Hiçbir şeyden vazgeçmezsin.' },
      { q: 'Bunun bana bir maliyeti var mı?', a: 'Danışmanlık senin için ücretsiz. Kendin katkı ödersen, bu tutar brüt maaşından kesilir. Net maaşından, yatırdığın tutardan daha azı eksilir.' },
      { q: 'Meslekte çalışamama sigortası nedir?', a: 'Sağlık nedeniyle mesleğini artık yapamazsan sana her ay bir ödeme yapar. Kesin koşullar sözleşmede yazar.' },
      { q: 'Vergiler ne olacak?', a: 'Brüt maaştan yapılan ek emeklilik katkıları belli bir sınıra kadar vergiden ve sosyal sigorta priminden muaftır. Vergiyi daha sonra, para emeklilikte ödenirken ödersin. O zaman sağlık ve bakım sigortası primleri de kesilir.' },
      { q: 'Bir şey yapmam gerekiyor mu?', a: 'Hayır. Buradaki her şey isteğe bağlıdır. İstersen sana neyin uyduğuna birlikte bakarız.' }
    ]
  },
  pl: {
    badge: 'Przykładowa strona dla Tabea',
    h1: 'Masz już emeryturę pracowniczą. Wiesz, co jeszcze jest możliwe?',
    intro: 'Tutaj w kilka minut zobaczysz, co już masz. I co jeszcze możesz dobrowolnie zrobić, jeśli chcesz.',
    ctaCalc: 'Oblicz teraz',
    ctaAdvice: 'Poproś o doradztwo',
    langLabel: 'Wybierz język',
    moreLangs: 'Inne języki na życzenie.',
    whyBadge: 'Twoja sytuacja',
    whyTitle: 'To już masz',
    why: [
      { title: 'Jesteś w EZVK', text: 'Przez swojego pracodawcę jesteś w EZVK. To dodatkowy system emerytalny dla osób pracujących w instytucjach kościelnych. To twoja emerytura pracownicza.' },
      { title: 'Dobra podstawa', text: 'EZVK to dobra podstawa na starość. Zostaje bez zmian. Nie musisz nic zmieniać.' },
      { title: 'Możesz zrobić więcej', text: 'Obok tego możesz dobrowolnie zrobić więcej. Na przykład dodatkowo oszczędzać na emeryturę albo chronić swoją zdolność do pracy. Sam decydujesz.' }
    ],
    waysBadge: 'Trzy drogi',
    waysTitle: 'Co chcesz zrobić dodatkowo?',
    waysSub: 'Możesz wybrać jedną drogę albo połączyć obie.',
    ways: [
      { title: 'Dodatkowo oszczędzać na emeryturę', text: 'Co miesiąc odkładasz kwotę prosto z wynagrodzenia brutto. Dzięki temu płacisz od niej mniej podatków i składek. W kalkulatorze poniżej zobaczysz, co może z tego wyrosnąć.' },
      { title: 'Chronić swoją zdolność do pracy', text: 'Zwłaszcza w opiece prywatne ubezpieczenie od niezdolności do wykonywania zawodu (Berufsunfähigkeitsversicherung) jest często drogie albo w ogóle niedostępne. Przez rozwiązanie grupowe pracodawcy dostęp jest, zależnie od ubezpieczyciela, dużo łatwiejszy.' },
      { title: 'Jedno i drugie', text: 'Oszczędzasz na emeryturę i chronisz swoją zdolność do pracy. Co do ciebie pasuje i ile to kosztuje, ustalimy na rozmowie.' }
    ],
    buBadge: 'Zdolność do pracy',
    buTitle: 'Chroń swoją zdolność do pracy',
    buIntro: 'Jeśli przez chorobę albo wypadek długo nie możesz pracować, brakuje twojej pensji. Ubezpieczenie od niezdolności do wykonywania zawodu wypłaca ci wtedy co miesiąc rentę. Zwłaszcza w opiece prywatnie jest ono często drogie albo w ogóle niedostępne. Przez rozwiązanie grupowe pracodawcy dostęp jest, zależnie od ubezpieczyciela, dużo łatwiejszy.',
    buPriceTitle: 'Ile to może kosztować',
    buPriceSub: 'Przykład: 1.000 EUR renty miesięcznie, wiek 30 lat, ochrona do 67. roku życia.',
    buGroups: ['Administracja i biuro', 'Opieka i gospodarstwo domowe', 'Pielęgniarstwo i opieka'],
    buRange: 'około {von} do {bis} EUR',
    buPer: 'Składka miesięcznie, z wynagrodzenia brutto',
    buNetto: 'Ponieważ składka jest pobierana z wynagrodzenia brutto, netto brakuje ci dużo mniej, często tylko około połowy.',
    buNote: 'Przykładowe wartości orientacyjne, a nie oferta. Twoja składka zależy od wieku, wykonywanej pracy, informacji o zdrowiu, wysokości renty i ubezpieczyciela. Renta z ochrony pracowniczej podlega opodatkowaniu, pobierane są też składki na ubezpieczenie zdrowotne i pielęgnacyjne.',
    buButton: 'Zapytaj o moją składkę',
    calcSub: 'Ustaw, ile chcesz co miesiąc dodatkowo odkładać.',
    ownLabel: 'Twoja własna wpłata miesięcznie',
    ownHint: 'Możliwe od 25 do {max} EUR miesięcznie.',
    nettoNote: 'Twoja wpłata jest pobierana z wynagrodzenia brutto. Płacisz od niej mniej podatków i składek. Dlatego netto brakuje ci mniej, niż wpłacasz. Dokładną kwotę policzymy dla ciebie na rozmowie.',
    kbBadge: 'Kasa chorych',
    kbTitle: 'Czy masz odpowiednią kasę chorych?',
    kbText: 'KassenBoost w kilka minut porównuje ustawowe kasy chorych: składkę dodatkową według kraju związkowego, bonus i świadczenia. Zobaczysz, ile pieniędzy jest w twojej kasie dla ciebie. Bezpłatnie.',
    kbPoints: ['Składka dodatkowa według kraju związkowego', 'Bonus', 'Świadczenia'],
    kbButton: 'Porównaj teraz',
    rvBadge: 'Możliwe, jeśli twój pracodawca weźmie udział',
    rvTitle: 'Także dla mienia domowego, OC i auta',
    rvText: 'Dzięki umowom ramowym pracownicy mogą dostać korzystniejsze warunki. Jest to możliwe, jeśli twój pracodawca weźmie udział. Wszystko cyfrowo, w kilka minut.',
    rvItems: ['Mienie domowe', 'OC w życiu prywatnym', 'Samochód'],
    grossNote: 'Brutto to twoje wynagrodzenie przed podatkami i składkami.',
    calcBadge: 'Twój kalkulator',
    calcTitle: 'Policz sam',
    yearsLabel: 'Ile lat zostało ci do emerytury?',
    yearsUnit: 'lat',
    perMonth: 'miesięcznie',
    ziBadge: 'Procent składany',
    ziTitle: 'Procent składany: twoje pieniądze pracują dla ciebie',
    ziText: 'Dostajesz odsetki od swoich pieniędzy. W kolejnym roku dostajesz też odsetki od tych odsetek. Dlatego na końcu pieniądze rosną coraz szybciej.',
    ziRateLabel: 'Wybierz roczne oprocentowanie',
    ziKey: 'Z {ende} wpłaciłeś {einzahlung}. {zuwachs} pochodzi z odsetek i procentu składanego.',
    ziEndLabel: 'Kapitał po {jahre} latach',
    ziLegendPaid: 'Wpłacono',
    ziLegendGain: 'Odsetki i procent składany',
    ziAxisYears: 'Lata',
    ziChartAria: 'Wykres: tak rośnie twój kapitał przez {jt} przy {zins} rocznie.',
    ziValuesToggle: 'Pokaż wartości jako tekst',
    ziValuesRow: 'Po {jahr} latach: {wert} EUR, w tym wpłacono {einzahlung} EUR',
    earlyTitle: 'Wczesny start się opłaca',
    earlyText: 'Ta sama wpłata {rate} EUR miesięcznie, to samo oprocentowanie. Różni się tylko start.',
    earlyNow: 'Start dziś ({jt})',
    earlyLater: 'Start 10 lat później ({jt})',
    earlyDiff: 'Tyle więcej daje ci wczesny start',
    cardsTitle: 'Wszystkie przykłady w skrócie',
    cardsHint: 'Dotknij karty, aby zobaczyć ją na wykresie.',
    rateNote: 'Wartości procentowe to przykłady możliwego rocznego wzrostu wartości, a nie stałe odsetki.',
    scenSub: 'Ta sama wpłata przez {jt}. Różni się tylko oprocentowanie.',
    perYear: 'rocznie',
    tagOld: 'klasyczna stara umowa, przykład',
    tagModel: 'obliczenie modelowe',
    paidIn: 'Wpłacono',
    endValue: 'Możliwy kapitał na końcu',
    swipeHint: 'Przesuń w bok, aby zobaczyć więcej przykładów.',
    disclaimer: 'Niewiążące obliczenie modelowe, a nie obietnica. Przy inwestycjach na giełdzie wartość się waha, możliwe są też straty. Wcześniejsze wyniki nie mówią nic wiarygodnego o przyszłości. Emerytura pracownicza podlega opodatkowaniu przy wypłacie, pobierane są też składki na ubezpieczenie zdrowotne i pielęgnacyjne.',
    askBadge: 'Przykład, usługa planowana',
    askTitle: 'Pytania? Po prostu zapytaj.',
    askNote: 'Tak mogłoby to wyglądać. Numer telefonu dostaniesz, gdy tylko usługa ruszy.',
    baTitle: 'Twoje przed i po',
    baText: 'Na osobistej rozmowie wspólnie przeglądamy twoje dokumenty. Zobaczysz co do centa, co masz dziś i co byłoby możliwe. Potem spokojnie decydujesz.',
    beforeTitle: 'Przed: to masz dziś',
    afterTitle: 'Po: to byłoby możliwe',
    baButton: 'Poproś o doradztwo',
    baNote: 'Doradztwo jest dla ciebie bezpłatne.',
    faqTitle: 'Częste pytania',
    footer: 'Przykładowa strona Healio GmbH, Hamburg',
    footerNote: 'Ta strona jest ogólną informacją i nie zastępuje osobistego doradztwa.',
    imprint: 'Impressum',
    privacy: 'Ochrona danych',
    askText: 'Wkrótce będziesz mógł zadzwonić i porozmawiać z asystentem telefonicznym. Asystent działa dzięki sztucznej inteligencji (AI). Mówi w twoim języku i jest dostępny przez całą dobę. Możesz go zapytać o wszystko, co dotyczy emerytury pracowniczej i ochrony.',
    askPoints: ['W twoim języku', 'Przez całą dobę', 'Wszystkie pytania o emeryturę i ochronę'],
    beforePoints: ['Co jest w twoich dokumentach EZVK?', 'Jak jesteś dziś chroniony, gdy nie możesz pracować?', 'Ile dostaniesz później łącznie?'],
    afterPoints: ['Co daje twoja własna wpłata?', 'Ile zostaje ci netto co miesiąc?', 'Jaka ochrona do ciebie pasuje?'],
    faq: [
      { q: 'Co z moim EZVK?', a: 'Twoje EZVK zostaje bez zmian. Wszystko na tej stronie jest dobrowolne i dochodzi dodatkowo. Z niczego nie rezygnujesz.' },
      { q: 'Czy to mnie coś kosztuje?', a: 'Doradztwo jest dla ciebie bezpłatne. Jeśli sam płacisz wpłatę, jest ona pobierana z wynagrodzenia brutto. Netto brakuje ci wtedy mniej, niż wpłacasz.' },
      { q: 'Czym jest ubezpieczenie od niezdolności do wykonywania zawodu?', a: 'Wypłaca ci co miesiąc rentę, jeśli ze względów zdrowotnych nie możesz już wykonywać swojego zawodu. Dokładne warunki są w umowie.' },
      { q: 'A co z podatkami?', a: 'Dodatkowe wpłaty na emeryturę z wynagrodzenia brutto są do pewnej granicy wolne od podatku i składek na ubezpieczenia społeczne. Podatek płacisz później, przy wypłacie na emeryturze. Wtedy pobierane są też składki na ubezpieczenie zdrowotne i pielęgnacyjne.' },
      { q: 'Czy muszę coś zrobić?', a: 'Nie. Wszystko tutaj jest dobrowolne. Jeśli chcesz, wspólnie sprawdzimy, co do ciebie pasuje.' }
    ]
  }
};

const fuelle = (text, werte) =>
  Object.entries(werte).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), text);

// Gerenderte 3D-Icons (public/images/icons-3d, 192 px WebP), reine Zierde
const Icon3D = ({ name, size = 72, className = '' }) => (
  <img
    src={`/images/icons-3d/${name}.webp`}
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    alt=""
    aria-hidden="true"
    className={`select-none ${className}`}
    style={{ width: size, height: size }}
  />
);

const SectionBadge = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2 border bg-healio-light border-home-mint/20 text-healio-primary-dark text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
    <Icon className="w-3.5 h-3.5" />
    {children}
  </div>
);

const TabeaPage = () => {
  const [lang, setLang] = useState('de');
  const [beitrag, setBeitrag] = useState(100);
  const [laufzeit, setLaufzeit] = useState(30);
  const [openFaq, setOpenFaq] = useState(null);
  const [zinsIndex, setZinsIndex] = useState(2);
  const t = TEXTE[lang];

  const werte = useMemo(
    () => ({ gesamt: Math.min(BEITRAG_MAX, Math.max(BEITRAG_MIN, Number(beitrag) || 0)) }),
    [beitrag]
  );

  const szenarien = useMemo(
    () =>
      SZENARIEN.map((s) => ({
        ...s,
        eingezahlt: werte.gesamt * 12 * laufzeit,
        ende: endkapital(werte.gesamt, s.zins, laufzeit)
      })),
    [werte.gesamt, laufzeit]
  );

  const gewaehlt = SZENARIEN[zinsIndex];
  const verlauf = useMemo(() => {
    const punkte = [];
    for (let jahr = 0; jahr <= laufzeit; jahr += 1) {
      const eingezahlt = werte.gesamt * 12 * jahr;
      const wert = endkapital(werte.gesamt, gewaehlt.zins, jahr);
      punkte.push({ jahr, eingezahlt: Math.round(eingezahlt), zuwachs: Math.round(wert - eingezahlt), wert });
    }
    return punkte;
  }, [werte.gesamt, gewaehlt.zins, laufzeit]);
  const ergebnis = verlauf[verlauf.length - 1];
  const spaeter = laufzeit > 10 ? endkapital(werte.gesamt, gewaehlt.zins, laufzeit - 10) : null;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const isEn = lang === 'en';

  return (
    <>
      <SEOHead
        title="Beispielseite Vorsorge für Tabea | Healio"
        description="Beispielseite für Mitarbeiter in der Pflege: zusätzliche Altersvorsorge, Absicherung der Arbeitskraft und Modellrechnung."
        canonicalUrl="https://healio.de/tabea"
        robots="noindex, nofollow"
      />

      <main lang={lang} className="bg-white overflow-hidden w-full" data-testid="tabea-page">
        {/* KOPF */}
        <section className="relative text-white pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-home-midnight via-[#06131c] to-[#0b2a22]">
          <div className="absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full bg-[#25c990]/15 blur-3xl" aria-hidden="true" />
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/25 text-white/95 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-[#25c990]" />
                  {t.badge}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-balance">
                  {t.h1}
                </h1>
                <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl">{t.intro}</p>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollTo('rechner')}
                    className="inline-flex items-center bg-[#25c990] hover:bg-[#1fb17e] text-slate-900 font-semibold px-7 py-4 text-base rounded-full"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    {t.ctaCalc}
                  </button>
                  <a
                    href={TERMIN_URL}
                    className="inline-flex items-center border border-white/40 text-white hover:bg-white/10 px-7 py-4 text-base rounded-full"
                  >
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    {t.ctaAdvice}
                  </a>
                </div>
              </div>

              {/* SPRACHUMSCHALTER */}
              <div className="w-full lg:w-72 rounded-2xl bg-white/10 ring-1 ring-white/25 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <Languages className="w-5 h-5 text-[#25c990]" />
                  {t.langLabel}
                </p>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label={t.langLabel}>
                  {SPRACHEN.map((s) => (
                    <button
                      key={s.code}
                      type="button"
                      lang={s.code}
                      onClick={() => setLang(s.code)}
                      aria-pressed={lang === s.code}
                      data-lang={s.code}
                      className={`rounded-xl px-3 py-2.5 text-base font-semibold transition ${
                        lang === s.code
                          ? 'bg-[#25c990] text-slate-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-white/70 mt-3">{t.moreLangs}</p>
              </div>
            </div>
          </div>
        </section>

        {/* DEINE LAGE: EZVK */}
        <section className="py-16 lg:py-24 bg-slate-50" data-testid="tb-lage">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionBadge icon={Info}>{t.whyBadge}</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-balance">{t.whyTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {t.why.map((block, i) => (
                <div key={block.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon3D name={['dokument', 'anker', 'klemmbrett'][i]} size={80} className="mb-3 -ml-1" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{block.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DREI WEGE */}
        <section className="py-16 lg:py-24 bg-healio-light/50" data-testid="tb-wege">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionBadge icon={Sparkles}>{t.waysBadge}</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">{t.waysTitle}</h2>
              <p className="text-slate-600">{t.waysSub}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {t.ways.map((weg, i) => (
                <div key={weg.title} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <Icon3D name={['sparschwein', 'schild-herz', 'beides'][i]} size={96} className="mb-4 -ml-1" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    <span className="text-healio-primary-dark mr-1">{i + 1}.</span> {weg.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{weg.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 mt-8">{t.grossNote}</p>
          </div>
        </section>

        {/* ARBEITSKRAFT ABSICHERN */}
        <section id="absicherung" className="py-16 lg:py-24" data-testid="tb-bu">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <SectionBadge icon={HeartPulse}>{t.buBadge}</SectionBadge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">{t.buTitle}</h2>
                <p className="text-slate-600 leading-relaxed">{t.buIntro}</p>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">{t.buPriceTitle}</h3>
              <p className="text-slate-600 text-center mb-6">{t.buPriceSub}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {BU_BEISPIELE.map((preis, i) => {
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl p-6 ${
                        i === 2 ? 'border-2 border-[#25c990] bg-healio-light/60' : 'border border-slate-200 bg-white'
                      }`}
                      data-testid={`tb-bu-${i}`}
                    >
                      <Icon3D name={['aktentasche', 'haende', 'stethoskop'][i]} size={72} className="mb-3 -ml-1" />
                      <p className="font-semibold text-slate-900 mb-2">{t.buGroups[i]}</p>
                      <p className="text-2xl font-bold text-slate-900 whitespace-nowrap">
                        {fuelle(t.buRange, { von: preis.von, bis: preis.bis })}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">{t.buPer}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-center font-medium text-slate-800 mt-6 max-w-3xl mx-auto">{t.buNetto}</p>
              <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-5 flex items-start gap-3">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-healio-primary-dark" />
                <p className="text-base text-slate-700 leading-relaxed" data-testid="tb-bu-hinweis">{t.buNote}</p>
              </div>
              <div className="text-center mt-8">
                <a
                  href={TERMIN_URL}
                  className="inline-flex items-center bg-[#25c990] hover:bg-[#1fb17e] text-slate-900 font-semibold px-8 py-4 text-base rounded-full"
                  data-testid="tb-bu-anfragen"
                >
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  {t.buButton}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* RECHNER */}
        <section id="rechner" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <SectionBadge icon={Calculator}>{t.calcBadge}</SectionBadge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.calcTitle}</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">{t.calcSub}</p>
              </div>

              <div className="bg-slate-900 rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <label htmlFor="fa-eigen" className="text-sm font-medium text-white/85">{t.ownLabel}</label>
                      <span className="text-xl font-bold whitespace-nowrap text-[#25c990]" data-testid="fa-gesamt">
                        {euro(werte.gesamt)} EUR
                      </span>
                    </div>
                    <input
                      id="fa-eigen"
                      type="range"
                      min={BEITRAG_MIN}
                      max={BEITRAG_MAX}
                      step="1"
                      value={werte.gesamt}
                      onChange={(e) => setBeitrag(Number(e.target.value))}
                      className="w-full accent-[#25c990]"
                    />
                    <p className="text-sm text-white/65 mt-2">{fuelle(t.ownHint, { max: euro(BEITRAG_MAX) })}</p>
                  </div>
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <label htmlFor="fa-laufzeit" className="text-sm font-medium text-white/85">
                        {t.yearsLabel}
                      </label>
                      <span className="font-bold text-xl whitespace-nowrap" data-testid="fa-laufzeit-wert">
                        {jahreText(lang, laufzeit)}
                      </span>
                    </div>
                    <input
                      id="fa-laufzeit"
                      type="range"
                      min="5"
                      max="45"
                      step="1"
                      value={laufzeit}
                      onChange={(e) => setLaufzeit(Number(e.target.value))}
                      className="w-full accent-[#25c990]"
                    />
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-6 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#25c990]" />
                  {t.nettoNote}
                </p>
              </div>

              {/* ZINSESZINS (nutzt die Eingaben des Rechners) */}
              <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm" data-testid="fa-zinseszins">
                <div className="text-center max-w-2xl mx-auto">
                  <SectionBadge icon={TrendingUp}>{t.ziBadge}</SectionBadge>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-balance">{t.ziTitle}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.ziText}</p>
                </div>

                <p className="text-sm font-medium text-slate-700 mt-8 mb-3 text-center">{t.ziRateLabel}</p>
                <div className="grid grid-cols-4 gap-2 max-w-md mx-auto" role="group" aria-label={t.ziRateLabel}>
                  {SZENARIEN.map((s, i) => (
                    <button
                      key={s.zins}
                      type="button"
                      onClick={() => setZinsIndex(i)}
                      aria-pressed={zinsIndex === i}
                      data-zins={i}
                      className={`rounded-xl px-2 py-3 text-base font-bold whitespace-nowrap transition ${
                        zinsIndex === i
                          ? 'bg-[#25c990] text-slate-900 shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {prozent(s.zins)}
                    </button>
                  ))}
                </div>

                <p className="text-lg md:text-2xl text-slate-700 leading-snug text-center max-w-3xl mx-auto mt-8" data-testid="fa-zi-aussage">
                  {mitWerten(
                    t.ziKey,
                    {
                      ende: `${euro(ergebnis.wert)}\u00a0EUR`,
                      einzahlung: `${euro(ergebnis.eingezahlt)}\u00a0EUR`,
                      zuwachs: `${euro(ergebnis.wert - ergebnis.eingezahlt)}\u00a0EUR`
                    },
                    'font-bold text-slate-900 whitespace-nowrap'
                  )}
                </p>

                <div className="grid lg:grid-cols-[1fr_15rem] gap-6 mt-8 items-center">
                  <div
                    role="img"
                    aria-label={fuelle(t.ziChartAria, { jt: jahreText(lang, laufzeit), zins: prozent(gewaehlt.zins) })}
                    className="min-w-0"
                  >
                    <p className="text-xs text-slate-500 mb-1" aria-hidden="true">EUR</p>
                    <div className="h-64 sm:h-80" data-testid="fa-zi-diagramm">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={verlauf} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis
                            dataKey="jahr"
                            ticks={verlauf.filter((p) => p.jahr % 5 === 0).map((p) => p.jahr)}
                            tickLine={false}
                            axisLine={{ stroke: '#cbd5e1' }}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                          />
                          <YAxis
                            tickFormatter={kurzEuro}
                            tickLine={false}
                            axisLine={false}
                            width={52}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="eingezahlt"
                            stackId="1"
                            stroke="#94a3b8"
                            fill="#cbd5e1"
                            fillOpacity={0.9}
                            isAnimationActive={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="zuwachs"
                            stackId="1"
                            stroke="#1fb17e"
                            fill="#25c990"
                            fillOpacity={0.75}
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-500 text-right mt-1" aria-hidden="true">{t.ziAxisYears}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 text-white p-5">
                    <p className="text-sm text-white/75">{fuelle(t.ziEndLabel, { jahre: laufzeit })}</p>
                    <p className="text-3xl font-bold text-[#25c990] mb-4 whitespace-nowrap" data-testid="fa-zi-ende">
                      {euro(ergebnis.wert)} EUR
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-3 h-3 rounded-sm bg-[#cbd5e1] shrink-0" aria-hidden="true" />
                        <span>
                          {t.ziLegendPaid}
                          <br />
                          <strong className="text-base" data-testid="fa-zi-einzahlung">{euro(ergebnis.eingezahlt)} EUR</strong>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-3 h-3 rounded-sm bg-[#25c990] shrink-0" aria-hidden="true" />
                        <span>
                          {t.ziLegendGain}
                          <br />
                          <strong className="text-base" data-testid="fa-zi-zuwachs">
                            {euro(ergebnis.wert - ergebnis.eingezahlt)} EUR
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <details className="mt-4 text-sm text-slate-600">
                  <summary className="cursor-pointer font-medium text-healio-primary-dark">{t.ziValuesToggle}</summary>
                  <ul className="mt-2 space-y-1">
                    {verlauf
                      .filter((p) => p.jahr > 0 && (p.jahr % 5 === 0 || p.jahr === laufzeit))
                      .map((p) => (
                        <li key={p.jahr}>
                          {fuelle(t.ziValuesRow, { jahr: p.jahr, wert: euro(p.wert), einzahlung: euro(p.eingezahlt) })}
                        </li>
                      ))}
                  </ul>
                </details>

                {spaeter !== null && (
                  <div className="mt-8 rounded-2xl bg-healio-light/60 border border-home-mint/30 p-5 sm:p-6" data-testid="fa-frueh">
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{t.earlyTitle}</h4>
                    <p className="text-slate-600 mb-5">{fuelle(t.earlyText, { rate: euro(werte.gesamt) })}</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="rounded-xl bg-white border border-slate-200 p-4">
                        <p className="text-sm text-slate-500">{fuelle(t.earlyNow, { jt: jahreText(lang, laufzeit) })}</p>
                        <p className="text-2xl font-bold text-slate-900 whitespace-nowrap" data-testid="fa-frueh-heute">
                          {euro(ergebnis.wert)} EUR
                        </p>
                      </div>
                      <div className="rounded-xl bg-white border border-slate-200 p-4">
                        <p className="text-sm text-slate-500">{fuelle(t.earlyLater, { jt: jahreText(lang, laufzeit - 10) })}</p>
                        <p className="text-2xl font-bold text-slate-700 whitespace-nowrap" data-testid="fa-frueh-spaeter">
                          {euro(spaeter)} EUR
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-900 text-white p-4">
                        <p className="text-sm text-white/75">{t.earlyDiff}</p>
                        <p className="text-2xl font-bold text-[#25c990] whitespace-nowrap" data-testid="fa-frueh-diff">
                          + {euro(ergebnis.wert - spaeter)} EUR
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ALLE BEISPIELE (Karte wählt die Kurve) */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">{t.cardsTitle}</h3>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
                  {fuelle(t.scenSub, { jt: jahreText(lang, laufzeit) })} {t.cardsHint}
                </p>
                <div
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
                  data-testid="fa-szenarien"
                >
                  {szenarien.map((s, i) => {
                    const aktiv = i === zinsIndex;
                    return (
                      <button
                        type="button"
                        key={s.zins}
                        onClick={() => setZinsIndex(i)}
                        aria-pressed={aktiv}
                        className={`text-left snap-start shrink-0 w-[78%] sm:w-[45%] md:w-auto rounded-2xl p-6 transition ${
                          aktiv
                            ? 'border-2 border-[#25c990] bg-healio-light/60 shadow-md'
                            : 'border border-slate-200 bg-white hover:border-slate-300'
                        }`}
                        data-testid={`fa-szenario-${i}`}
                      >
                        <p className="text-3xl font-bold text-slate-900">{prozent(s.zins)}</p>
                        <p className="text-sm text-slate-500 mb-4">{t.perYear}</p>
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${
                            s.key === 'old' ? 'bg-slate-100 text-slate-600' : 'bg-[#25c990]/20 text-healio-primary-dark'
                          }`}
                        >
                          {s.key === 'old' ? t.tagOld : t.tagModel}
                        </span>
                        <p className="text-sm text-slate-500">{t.paidIn}</p>
                        <p className="text-lg font-semibold text-slate-700 mb-3" data-testid="fa-eingezahlt">
                          {euro(s.eingezahlt)} EUR
                        </p>
                        <p className="text-sm text-slate-500">{t.endValue}</p>
                        <p
                          className={`text-2xl font-bold ${aktiv ? 'text-healio-primary-dark' : 'text-slate-900'}`}
                          data-testid="fa-ende"
                        >
                          {euro(s.ende)} EUR
                        </p>
                      </button>
                    );
                  })}
                </div>
                <p className="md:hidden text-center text-sm text-slate-500 mt-2">{t.swipeHint}</p>
                <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5 text-healio-primary-dark" />
                  <div className="text-base text-slate-700 leading-relaxed space-y-2" data-testid="fa-hinweis">
                    <p>{t.disclaimer}</p>
                    <p>{t.rateNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KRANKENKASSE: KASSENBOOST */}
        <section className="py-16 lg:py-24" data-testid="tb-kassenboost">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto rounded-3xl bg-healio-light/60 border border-home-mint/30 p-6 sm:p-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <Icon3D name="kassenkarte" size={96} className="mb-4 -ml-1" />
                <SectionBadge icon={Info}>{t.kbBadge}</SectionBadge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">{t.kbTitle}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{t.kbText}</p>
                <a
                  href={KASSENBOOST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-4 text-base rounded-full"
                  data-testid="tb-kassenboost-link"
                >
                  {t.kbButton}
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </a>
              </div>
              <ul className="space-y-3">
                {t.kbPoints.map((punkt) => (
                  <li key={punkt} className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-[#25c990]" />
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FRAGEN: TELEFONASSISTENT */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-5">
                  {t.askBadge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.askTitle}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{t.askText}</p>
                <p className="text-sm text-slate-500">{t.askNote}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl">
                <Icon3D name="telefon" size={96} className="mb-5 -ml-1" />
                <ul className="space-y-4">
                  {t.askPoints.map((punkt, i) => {
                    const Icon = [Globe2, Clock, HelpCircle][i];
                    return (
                      <li key={punkt} className="flex items-center gap-3 text-lg">
                        <Icon className="w-5 h-5 shrink-0 text-[#25c990]" />
                        {punkt}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* VORHER UND NACHHER */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-home-midnight via-[#06131c] to-home-midnight text-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.baTitle}</h2>
              <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">{t.baText}</p>
              <div className="grid md:grid-cols-2 gap-4 text-left mb-10">
                <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 p-6">
                  <p className="font-semibold text-white mb-4">{t.beforeTitle}</p>
                  <ul className="space-y-2 text-white/75">
                    {t.beforePoints.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl bg-[#25c990]/15 ring-2 ring-[#25c990] p-6">
                  <p className="font-semibold text-[#25c990] mb-4">{t.afterTitle}</p>
                  <ul className="space-y-2 text-white/85">
                    {t.afterPoints.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
              <a
                href={TERMIN_URL}
                className="inline-flex items-center bg-[#25c990] hover:bg-[#1fb17e] text-slate-900 font-semibold px-8 py-4 text-base rounded-full"
                data-testid="fa-beratung"
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                {t.baButton}
              </a>
              <p className="text-sm text-white/60 mt-4">{t.baNote}</p>
            </div>
          </div>
        </section>

        {/* RAHMENVERTRÄGE */}
        <section className="py-16 lg:py-20 bg-slate-50" data-testid="tb-rahmen">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-healio-primary-dark bg-[#25c990]/20 px-3 py-1 rounded-full mb-5">
                {t.rvBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">{t.rvTitle}</h2>
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">{t.rvText}</p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
                {t.rvItems.map((item, i) => {
                  return (
                    <div key={item} className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6">
                      <Icon3D name={['haus', 'regenschirm', 'auto'][i]} size={72} className="mx-auto" />
                      <p className="font-semibold text-slate-900 text-sm sm:text-base mt-2 break-words hyphens-auto">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{t.faqTitle}</h2>
              <div className="space-y-3">
                {t.faq.map((item, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-slate-900">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FUSS */}
        <section className="py-10 bg-slate-100 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
            <p className="font-semibold text-slate-800">{t.footer}</p>
            <p className="text-sm text-slate-500 mt-1">{t.footerNote}</p>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <Link to={isEn ? '/en/legal-notice' : '/impressum'} className="text-healio-primary-dark underline">
                {t.imprint}
              </Link>
              <Link to={isEn ? '/en/privacy' : '/datenschutz'} className="text-healio-primary-dark underline">
                {t.privacy}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TabeaPage;
