// Erklärungen und Hinweise für den Entwurf der SDK-Antragsstrecke
// (/antrag-entwurf, Weg B „Healio erledigt das für mich“).
//
// Herkunft:
// - Healio-Texte: Konzept Healio/Antragsstrecke/KONZEPT-BEGLEITETER-ANTRAG-2026-10-12.md,
//   Abschnitt 4 (Texte 6, 8, 9, 10, 12, 13). Den Versicherer nennen wir mit
//   seiner Rechtsform „a. G.“ wie im SDK-Antrag.
// - SDK-Texte: SDK-Antrag 1.770aai (Einwilligung zur Bonitätsprüfung,
//   Schlusserklärung), wortgleich. Silbentrennungen des Formulars sind aufgelöst.
// - Platzhalter stehen sichtbar da, wo der verbindliche Wortlaut der SDK noch
//   fehlt. Vor dem Echtbetrieb ersetzen und rechtlich prüfen lassen.

export const SDK_NAME = 'Süddeutsche Krankenversicherung a. G. (SDK)';

// Schritt 1: Nur gesetzlich Versicherte mit Wohnsitz in Deutschland.
export const GKV_BESTAETIGUNG = 'Ich bin gesetzlich krankenversichert (auch familienversichert) und wohne in Deutschland.';

// Schritt 2: Kenntnisnahme vor den Gesundheitsfragen (Konzept Text 7, ohne „gespeichert“).
export const MITTEILUNG_GELESEN = 'Ich habe die Mitteilung der SDK über die Folgen falscher oder fehlender Angaben gelesen.';

// Aufklappzeile unter dem Vorspann. Der Vorspann verweist auf die „Wichtigen
// Informationen für den Antragsteller“, deshalb steht der Name hier vorn.
export const VVG_19_AUFKLAPPEN = 'Wichtige Informationen für den Antragsteller (Mitteilung nach § 19 Abs. 5 VVG) lesen';
export const VVG_19_PLATZHALTER = 'Platzhalter: Hier steht vor dem Start die Mitteilung der SDK nach § 19 Abs. 5 VVG über die Folgen einer Verletzung der vorvertraglichen Anzeigepflicht im Wortlaut (SDK-Antrag, Seiten 8 und 9).';
// Textform (§ 19 Abs. 5 VVG): Die Mitteilung liegt vor den Antworten als PDF bereit.
export const VVG_19_PDF_PLATZHALTER = 'Mitteilung als PDF speichern (folgt)';

// Frage 1b bis 1k bei wenig Höhe: Die Aufklappzeile beginnt wortgleich mit
// Frage 1, damit der Zeitraum „in den letzten 3 Jahren“ ohne Tippen dasteht.
export const FRAGE_1_ANFANG = 'Werden oder wurden in den letzten 3 Jahren';
export const FRAGE_1_AUFKLAPPEN = `Frage 1: „${FRAGE_1_ANFANG} …“ ganz lesen`;

// Schritt 3
export const BEITRAG_LABEL = 'Dein Monatsbeitrag';
export const BEITRAG_OHNE_ZUSCHLAG = 'Beitragszuschlag: keiner';
export const BEITRAG_HINWEIS = 'Gerechnet nach dem Antragsformular der SDK. Verbindlich ist der Beitrag in der Online-Strecke der SDK.';

// Schritt 4, Weg A. Im Weg A stehen Text 8 und dieser Satz als ein Absatz
// direkt unter dem Knopf zur SDK (Vertragserklärung erst bei der SDK).
export const WEG_A_TRANSPARENZ = 'Beitrag berechnet von Healio. Abschluss in der Online-Strecke der SDK, technisch betrieben von Level Nine. Healio vermittelt als Versicherungsmakler.';

// Text 8: Eingeschränkte Auswahl (Hinweis ohne Haken).
export const TEXT_8_AUSWAHL = 'Gut zu wissen: In diesem Antrag geht es nur um die ambulanten Tarife AP5, AP7, AP9 und AP1 der Süddeutschen Krankenversicherung a. G. (SDK). Grundlage sind die Bedingungen und Beiträge der SDK. Andere Versicherer vergleichen wir hier nicht.';

// Text 9: Verzicht auf Beratung.
export const TEXT_9_HINWEIS = 'Wichtig: Healio ist Versicherungsmakler und würde dich normalerweise beraten und die Beratung schriftlich festhalten. Wenn du darauf verzichtest, kann es für dich schwieriger werden, von Healio Schadensersatz zu verlangen, falls sich später zeigt, dass der Tarif nicht zu dir passt (§ 63 VVG). Möchtest du lieber beraten werden, vereinbare einfach einen Termin mit uns.';
export const TEXT_9_HAKEN = 'Ich verzichte für diesen Antrag gegenüber Healio auf eine Beratung und deren Dokumentation. Den Hinweis auf die möglichen Nachteile habe ich gelesen.';
// Der Satz der SDK gehört in den Haken selbst (Konzept Text 9), bis er
// vorliegt als sichtbarer Platzhalter im Haken.
export const TEXT_9_SDK_PLATZHALTER = '[Platzhalter: Satz der SDK, wortgleich. Er beginnt mit „Im Zuge des Onlineantrages verzichte ich auf die angebotene fachliche Beratung“.]';

// Text 10: Maklerauftrag und Vollmacht (vollständig, wie im Konzept). Die
// Vollmacht bezieht sich auf „meine Prüfseite“: So heißt Teil 3 von Weg B
// (TEIL_3_TITEL), damit der Bezug eindeutig ist.
export const TEXT_10_VOLLMACHT = 'Ich beauftrage die Healio GmbH, meinen Antrag auf die ambulante Zusatzversicherung bei der Süddeutschen Krankenversicherung a. G. (SDK) in meinem Namen zu stellen, und erteile ihr dafür Vollmacht. Healio darf dazu die Online-Antragsstrecke der SDK ausfüllen, die Gesundheitsfragen beantworten, das SEPA-Lastschriftmandat erteilen und den Antrag abschicken. Healio verwendet dabei ausschließlich die Angaben und Antworten, die ich auf meiner Prüfseite bestätigt habe, und trägt nichts Abweichendes ein. Stellt die SDK eine Frage, die ich nicht bestätigt habe, oder ändert sich etwas, fragt Healio mich vorher. Post der SDK zu meinem Vertrag darf Healio nicht für mich empfangen. Kommt trotzdem etwas bei Healio an, leitet Healio es mir noch am selben Werktag weiter. Den vollständigen Maklervertrag habe ich als PDF erhalten.';

export const MAKLERVERTRAG_PDF_PLATZHALTER = 'Maklervertrag als PDF herunterladen (folgt)';

// Text 6: Healios Verarbeitung der Gesundheitsangaben (vollständig, Standort offen).
export const TEXT_6_STANDORT_PLATZHALTER = '[Standort]';
export const TEXT_6_GESUNDHEIT = [
  'Ich bin einverstanden, dass Healio meine Antworten auf die Gesundheitsfragen sowie Größe und Gewicht speichert und verwendet, um meinen Antrag vorzubereiten und in meinem Auftrag an die SDK zu übermitteln. Gespeichert werden sie bei Supabase in Frankfurt und auf dem Server von Healio in ',
  TEXT_6_STANDORT_PLATZHALTER,
  '. Healio überträgt sie in die Online-Antragsstrecke der SDK, die die cpit comparit GmbH (Level Nine) für die SDK betreibt. Healio schickt meine Gesundheitsangaben nie offen per E-Mail und nie über WhatsApp. Meine Antragskopie bekomme ich als verschlüsselte PDF, das Passwort kommt per SMS. Ich kann die Einwilligung jederzeit widerrufen. Dann kann Healio meinen Antrag aber nicht weiterleiten.',
];

// Weg B Teil 2: Lange Erklärungen stehen mit Titel, einer Kurzfassung in
// einfacher Sprache (höchstens 25 Wörter) und dem Haken da; der Volltext steht
// unverändert im Aufklapper „Ganzen Text lesen“. Ganz sichtbar bleiben Text 8,
// Text 9 (Verzicht auf Beratung mit Nachteilshinweis) und die kurze
// Schlusserklärung. Die Kurzfassung zur Schweigepflicht nimmt die Wahl
// zwischen Möglichkeit I und II nicht vorweg (Franks Vorgabe 16.10.2026) und
// nennt wie die SDK-Erklärung den Widerruf (Art. 7 Abs. 3 DSGVO); vor
// dem Echtbetrieb am Wortlaut der SDK prüfen (dort steht noch ein Platzhalter).
export const GANZEN_TEXT_LESEN = 'Ganzen Text lesen';
// Die drei Einwilligungen (Gesundheitsangaben bei Healio, Schweigepflicht und
// Bonität der SDK) stehen in einer gemeinsamen Karte, jede mit eigenem Haken
// (Franks Vorgabe 16.10.2026).
export const EINWILLIGUNGEN_TITEL = 'Deine Einwilligungen';
export const ERKLAERUNG_KURZ = {
  vollmacht: 'Healio stellt deinen Antrag in deinem Namen bei der SDK und trägt dabei nur ein, was du auf deiner Prüfseite bestätigt hast.',
  gesundheitsdaten: 'Healio speichert deine Antworten zu Gesundheit, Größe und Gewicht und nutzt sie nur, um deinen Antrag an die SDK zu übermitteln. Jederzeit widerrufbar.',
  schweigepflicht: 'Die SDK darf deine Gesundheitsangaben für Antrag und Vertrag nutzen. Ob und wie sie bei Behandlern nachfragt, wählst du im ganzen Text. Jederzeit widerrufbar.',
  bonitaet: 'Die SDK darf bei Auskunfteien Angaben zu deiner Zahlungsfähigkeit einholen. Jederzeit widerrufbar.',
};

// Einwilligung und Schweigepflichtentbindung der SDK (Wortlaut folgt).
export const SDK_SCHWEIGEPFLICHT_PLATZHALTER = 'Platzhalter: Hier steht die Einwilligung in die Erhebung und Verwendung von Gesundheitsdaten und die Schweigepflichtentbindungserklärung der SDK im Wortlaut. Darin wählst du zwischen Möglichkeit I und Möglichkeit II.';

// Einwilligung zur Bonitätsprüfung (SDK-Antrag, wortgleich).
export const SDK_BONITAET = 'Ich willige jederzeit für die Zukunft widerrufbar ein, dass die SDK zum Zwecke der Entscheidung über die Begründung und Durchführung eines Versicherungsverhältnisses und bei Bedarf im Einzelfall im Verlauf der aktiven Geschäftsbeziehung, zu Zwecken der Vertragsverwaltung und -abwicklung, Informationen aus dem Datenkatalog der Schuldnerverzeichnis- und Insolvenzverzeichnisdaten über mein allgemeines Zahlungsverhalten und meine Zahlungsfähigkeit (Bonitätsdaten) bei Auskunfteien einholt. Ich entbinde aus diesem Grund im Hinblick auf meine nach § 203 StGB geschützten Daten die für die SDK tätigen Personen von ihrer Schweigepflicht.';

// Schlusserklärung (SDK-Antrag, wortgleich, ohne die Anleitung zur Unterschrift auf Papier).
export const SDK_SCHLUSSERKLAERUNG = [
  'Die gestellten Fragen habe ich wahrheitsgemäß und vollständig beantwortet. Die Mitteilung über die Folgen einer vorvertraglichen Anzeigepflichtverletzung habe ich vor Beantwortung der Gesundheitsfragen zur Kenntnis genommen.',
  'Mir ist bekannt, dass ich einen Antrag in der Krankenversicherung innerhalb von 14 Tagen widerrufen kann. Nähere Einzelheiten zum Widerrufsrecht entnehmen Sie bitte der Widerrufsbelehrung.',
];

// SEPA-Lastschriftmandat der SDK (SDK-Antrag 1.770aai, Seite 2, wortgleich).
// Healio erteilt es laut Text 10 im Namen des Kunden, deshalb steht es
// aufklappbar unter der IBAN.
export const SDK_SEPA_TITEL = 'SEPA-Lastschriftmandat für wiederkehrende SEPA-Basislastschriften';
export const SDK_SEPA_MANDAT = [
  'Ich ermächtige / Wir ermächtigen Sie, wiederkehrende Zahlungen mittels Lastschrift von meinem /unserem Konto einzuziehen und entstandenes Guthaben gutschreiben zu lassen. Zugleich weise ich meinen / weisen wir unseren unten genannten Zahlungsdienstleister an, die von Ihnen auf mein/unser Konto gezogene Lastschriften einzulösen. Sofern die Guthaben auf eine abweichende Bankverbindung ausgezahlt werden sollen, teile ich / teilen wir dies unter Angabe der Vertrags- und Bankverbindungsdaten mit.',
  'Ich kann / Wir können innerhalb von 8 Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem/unserem Zahlungsdienstleister vereinbarten Bedingungen. Mit der Verkürzung der Ankündigungsfrist für fällige Beiträge von 14 auf 5 Tage bin ich einverstanden.',
];
export const SDK_SEPA_ANGABEN = [
  ['Empfänger', 'Süddeutsche Krankenversicherung a. G., Raiffeisenplatz 11, 70736 Fellbach'],
  ['Gläubiger-ID', 'DE62SDK00000062000'],
  ['Mandatsreferenznummer', 'wird nachträglich mitgeteilt'],
];

// Unterlagen (Konzept Text 11), im Entwurf nur als Platzhalter. Im echten
// Betrieb liegen die PDFs hier vor dem Klick zum Herunterladen bereit (§ 7 VVG).
// Je Absender steht eine Zeile mit Kommas („Von der SDK: …“, „Von Healio: …“).
export const UNTERLAGEN_SDK = [
  'Versicherungsbedingungen',
  'Produktinformationsblatt',
  'Kundeninformation',
  'Widerrufsbelehrung',
  'Datenschutz-Infoblatt',
  'Mitteilung nach § 19 Abs. 5 VVG und Gesundheitsfragen',
];
// Im echten Betrieb ist jeder Name selbst der Link zum PDF. Der Maklervertrag
// liegt in der Karte „Auftrag und Vollmacht“ direkt vor seinem Haken bereit.
export const PDF_PLATZHALTER = 'PDFs zum Herunterladen folgen.';
export const UNTERLAGEN_HEALIO = [
  'Hinweis zur Tarifauswahl',
  'Verzicht auf Beratung',
];
// Unterlagen und Schlusserklärung stehen in einer Karte mit einem Haken
// (Franks Vorgabe 16.10.2026): am Haken dieser Satz, danach die
// Schlusserklärung der SDK wortgleich.
export const UNTERLAGEN_SCHLUSS_TITEL = 'Unterlagen und Schlusserklärung';
export const UNTERLAGEN_HAKEN = 'Ich habe die Unterlagen hier als PDF erhalten.';
// „per Post“: Der Haken trägt nur die Schlusserklärung (die Unterlagen sind
// noch unterwegs), dazu dieser Satz. Healio reicht erst ein, wenn die Post da ist.
export const UNTERLAGEN_PER_POST = 'Deine Unterlagen kommen per Post. Healio reicht deinen Antrag erst ein, wenn sie bei dir sind.';

// Konzept Text 2: echte Wahl zwischen Papier und digital, ohne Vorauswahl
// (§ 15 Abs. 1, § 16 VersVermV).
export const VERSAND_FRAGE = 'Wie möchtest du die Erstinformation und deine Antragsunterlagen bekommen?';
export const VERSANDWEGE = [
  { id: 'email', label: 'per E-Mail' },
  { id: 'post', label: 'per Post' },
];

// Teil 3 von Weg B. Text 10 nennt diesen Bildschirm „meine Prüfseite“.
export const TEIL_3_TITEL = 'Deine Prüfseite';
// Angabe aus Schritt 1, die Healio laut Text 10 nur bestätigt eintragen darf.
export const PRUEF_KRANKENVERSICHERUNG = 'Gesetzlich versichert, Wohnsitz in Deutschland';

// Text 12: Bestätigungsknopf (die SMS-Bestätigung gibt es im Entwurf noch nicht).
// Ausgelöst wird der Auftrag wie im Konzept per Klick und SMS-Code; ob es
// stattdessen ein Link per E-Mail wird, entscheidet Frank.
export const TEXT_12_KNOPF = 'Mit dem Klick beauftragst du Healio, deinen Antrag genau so, wie du ihn hier siehst, in deinem Namen bei der SDK zu stellen. Er kostet dich den oben genannten Monatsbeitrag.';
export const TEXT_12_SMS_PLATZHALTER = 'Platzhalter: Im echten Betrieb bestätigst du hier zusätzlich mit dem Code aus einer SMS.';
export const KNOPF_BEANTRAGEN = 'Jetzt kostenpflichtig beantragen lassen';

// Text 13: Kontoinhaber (wie im Konzept). Wie der Link den Kontoinhaber
// erreicht (etwa über den Kunden), klärt der echte Betrieb.
export const TEXT_13_FRAGE = 'Bist du selbst Inhaber des Kontos, von dem der Beitrag abgebucht wird?';
export const TEXT_13_NEIN = 'Wir schicken dem Kontoinhaber einen eigenen Link, über den er das Lastschriftmandat selbst bestätigt.';
export const KONTO_ANDERE_KURZ = 'Gehört jemand anderem, er bestätigt das Lastschriftmandat über einen eigenen Link';

// Vorbehalt zum Beitrag, direkt am Auftragsknopf und im Schlussbild.
export const BEITRAG_VORBEHALT = 'Nennt die SDK einen anderen Beitrag, fragt Healio dich vorher.';

// Schlussbild nach dem Beauftragen (nichts wird gesendet). Punkt 1 und 2
// richten sich nach der Wahl „per E-Mail“ oder „per Post“ und danach, wem das
// Konto gehört: Healio reicht erst ein, wenn die Unterlagen da sind und der
// Kontoinhaber das Lastschriftmandat bestätigt hat.
export const ABSCHLUSS_UNTERLAGEN = {
  email: 'Du bekommst eine Bestätigungs-E-Mail mit deinen Unterlagen und einem Link zu deinem Antrag.',
  post: 'Du bekommst deine Unterlagen per Post.',
};
export const ABSCHLUSS_EINREICHEN = {
  standard: 'Healio reicht deinen Antrag in der Regel am nächsten Werktag in der Online-Strecke der SDK ein.',
  konto: 'Sobald der Kontoinhaber das Lastschriftmandat über seinen Link bestätigt hat, reicht Healio deinen Antrag in der Online-Strecke der SDK ein.',
  post: 'Sobald deine Unterlagen bei dir sind, reicht Healio deinen Antrag in der Online-Strecke der SDK ein.',
  postUndKonto: 'Sobald deine Unterlagen bei dir sind und der Kontoinhaber das Lastschriftmandat über seinen Link bestätigt hat, reicht Healio deinen Antrag in der Online-Strecke der SDK ein.',
};
export function abschlussPunkte({ versand, kontoinhaber } = {}) {
  const post = versand === 'post';
  const andere = kontoinhaber === 'andere';
  let einreichen = ABSCHLUSS_EINREICHEN.standard;
  if (post && andere) einreichen = ABSCHLUSS_EINREICHEN.postUndKonto;
  else if (post) einreichen = ABSCHLUSS_EINREICHEN.post;
  else if (andere) einreichen = ABSCHLUSS_EINREICHEN.konto;
  return [
    post ? ABSCHLUSS_UNTERLAGEN.post : ABSCHLUSS_UNTERLAGEN.email,
    einreichen,
    BEITRAG_VORBEHALT,
    'Du bekommst die Antragsnummer und nach der Annahme durch die SDK die Police.',
  ];
}
