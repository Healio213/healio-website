const APPROVED_VERSION = '2026-08-31.1';
const APPROVED_STATUS = 'approved';

// Deployfähige serverseitige Projektion der freigegebenen Canonical-Datei
// Healio/openai-telefonagenten/config/knowledge/nita-inbound-realtime21.v1.json.
// Antworten und Eskalationsgrenzen sind wortgleich; der Session-Endpunkt bindet
// dieses Modul zur Laufzeit und nicht nur innerhalb eines Tests ein.
const entries = Object.freeze([
  {
    id: 'healio_rolle',
    answer: 'Healio ist ein unabhängiger Versicherungsmakler und Dienstleister aus Hamburg. Healio ist nicht der Versicherer, sondern erklärt das Konzept, vermittelt passende Lösungen und begleitet Kunden und Praxen.',
    boundary: 'Konkrete Versicherer-, Produkt-, Vertrags- oder Vermittlungsfragen muss das Healio-Team persönlich prüfen.',
  },
  {
    id: 'gesundheitsbudget_grundidee',
    answer: 'Bei passenden persönlichen Voraussetzungen kann durch die Kombination aus Kassenboni und einer passenden Zusatzversicherung ein Gesundheitsbudget von bis zu 3.000 EUR in 2 Jahren möglich sein. Das ist keine Garantie. Die konkrete Möglichkeit muss immer für die jeweilige Person geprüft werden.',
    boundary: 'Nita berechnet kein persönliches Budget und macht keine Zusage zu Anspruch, Annahme oder Erstattung.',
  },
  {
    id: 'ikk_bonus_grundidee',
    answer: 'Der Hinweis „IKK Bonus: 700 EUR+“ bezeichnet ausschließlich ein zweckgebundenes Zuschusspotenzial im passenden Fall. Er ist kein frei verfügbarer Geldbonus, keine Garantie und keine Obergrenze. Geldbonus und zweckgebundener Zuschuss sind alternative Wege und werden nicht addiert. Wenn jemand die jeweilige Maßnahme im Bonusjahr erfüllt und die IKK classic sie anerkennt, kann daraus ein Bonus entstehen. Nachweise und tatsächlichen Anspruch prüft die IKK classic.',
    boundary: 'Keine persönliche Bonusberechnung, Anspruchszusage oder Zusammenrechnung von Geldbonus und Zuschuss.',
  },
  {
    id: 'ikk_bonus_massnahmen_werte',
    answer: 'Wenn die jeweilige Maßnahme im Bonusjahr erfüllt und von der IKK classic anerkannt wird, gelten grundsätzlich: Impfung 5 EUR Geldbonus oder 15 EUR Zuschuss, fällige Vorsorge 10 EUR oder 30 EUR und anerkannte regelmäßige Aktivität 25 EUR oder 75 EUR. Statuswerte wie BMI oder Blutdruck zählen nur zusammen mit mindestens einer anerkannten regelmäßigen Aktivität. Die IKK classic prüft Fälligkeit, Nachweise und Anerkennung.',
    boundary: 'Nita darf nicht behaupten, dass eine Person eine Maßnahme bereits erfüllt hat oder dafür sicher einen Bonus erhält.',
  },
  {
    id: 'ikk_bonus_zuschuss_verwendung',
    answer: 'Der zweckgebundene Zuschuss beträgt das Dreifache des errechneten Geldbonus, höchstens jedoch die tatsächlich anerkannten Kosten; einen festen Höchstbetrag nennt die IKK classic nicht. Zulässige Zwecke sind unter anderem geeignete Geräte zur Messung des Fitness- oder Gesundheitsstatus, Sportveranstaltungen, bestimmte Kurse, der Jahresbeitrag bestimmter privater Zusatzversicherungen sowie Baby-, Kind- oder Elternangebote und zulässige Zyklus-App-Kosten. Bei Smartwatch oder Fitnesstracker darf Nita keine Marke und keinen festen Gerätebetrag zusagen.',
    boundary: 'Ob ein konkretes Gerät, ein Kurs oder eine Ausgabe anerkannt wird, entscheidet ausschließlich die IKK classic.',
  },
  {
    id: 'ikk_bonus_familie_fristen',
    answer: 'Für jede Person und jedes Familienmitglied gilt ein eigener Bonusantrag; Maßnahmen und Ansprüche sind nicht übertragbar. Familienwerte dürfen nur als Summe einzelner bedingter Potenziale erklärt werden. Maßgeblich sind Bonusjahr, Altersfenster, Geschlecht, Fälligkeit und Turnus. Für die meisten U-Untersuchungen gibt es Toleranzzeiten, in denen ein Termin nachgeholt werden kann; eine versäumte Untersuchung soll zeitnah mit der Kinderarztpraxis und die konkrete Bonusanerkennung mit der IKK classic geklärt werden. Der Antrag für 2026 muss spätestens am 31. März 2027 vorliegen.',
    boundary: 'Persönliche Fristen, Altersfenster, Schwangerschaftssituationen und Nachweise muss die IKK classic prüfen.',
  },
  {
    id: 'ikk_bonus_steuer_zusatzleistungen',
    answer: 'Nita macht keine pauschale Aussage zur Steuerfreiheit. Laut Teilnahmebedingungen meldet die IKK classic einen ausschließlich gezahlten Zuschuss nicht als Beitragserstattung; individuelle Steuerfragen gehören zum Steuerberater. Separat vom Bonus nennt die IKK classic Osteopathie bis 160 EUR pro Jahr, professionelle Zahnreinigung bis 40 EUR pro Jahr und qualitätsgeprüfte Gesundheitskurse bis 180 EUR pro Jahr. Diese Leistungen werden nicht in den Bonus hineingerechnet.',
    boundary: 'Keine persönliche Steuerberatung oder Zusage, dass eine konkrete Zusatzleistung übernommen wird.',
  },
  {
    id: 'route_praxis_heilberufler',
    answer: 'Für Praxen und Heilberufler beantwortet Nita allgemeine Fragen zum Healio-Partnernetzwerk und zum Gesundheitsbudget. Aussagen zu einer konkreten Praxis, zu Konditionen oder zur persönlichen Eignung muss das Healio-Team prüfen.',
    boundary: 'Berufs-, praxis- oder konditionsspezifische Aussagen erfordern eine persönliche Prüfung.',
  },
  {
    id: 'route_patient_privat',
    answer: 'Patienten und Privatkunden kann Nita das allgemeine Healio-Konzept, Kassenboni und den grundsätzlichen Ablauf erklären. Sie erhebt keine Gesundheitsdaten und gibt keine individuelle Versicherungs- oder medizinische Beratung.',
    boundary: 'Gesundheits-, Tarif-, Annahme- und Erstattungsfragen müssen persönlich geprüft werden.',
  },
  {
    id: 'versicherungskategorien',
    answer: 'Nita ordnet ein Versicherungsanliegen nur einer allgemeinen Kategorie zu: Zahnzusatz, ambulant, stationär, Antrag beziehungsweise Vertrag oder anderes Anliegen. Individuelle Tarife, Leistungen, Beiträge, Annahmeentscheidungen, Vertragsstände und konkrete Erstattungen muss das Healio-Team persönlich prüfen.',
    boundary: 'Nita darf nur kategorisieren und keine individuelle Produkt-, Leistungs- oder Vertragsauskunft geben.',
  },
  {
    id: 'route_bestandskunde_partner',
    answer: 'Bestehende Kunden und Partner erhalten von Nita nur freigegebene allgemeine Informationen. Persönliche Vorgänge, Vertragsstände, Rechnungen und konkrete Erstattungen muss das Healio-Team prüfen. Kontakt ist über healio.de/kontakt oder info@healio.de möglich.',
    boundary: 'Keine personenbezogenen Vorgänge, Vertragsstände, Rechnungen oder Erstattungen im Pilot bearbeiten.',
  },
  {
    id: 'route_beschwerde_technik_bav',
    answer: 'Nita ordnet Beschwerden, technische Probleme und Fragen zur betrieblichen Altersvorsorge nur als eigenes Anliegen ein. In dieser Version bearbeitet sie diese Fälle nicht fachlich und erfindet keine Lösung oder Übergabe. Für die persönliche Klärung nennt sie healio.de/kontakt oder info@healio.de.',
    boundary: 'Keine Beschwerdebearbeitung, technische Fehlerbehebung oder bAV-Fachauskunft ohne ein separat freigegebenes Modul.',
  },
  {
    id: 'route_sonstiges',
    answer: 'Bei einem sonstigen Anliegen fragt Nita mit genau einer kurzen Frage nach dem Zweck. Für Rechnung, Presse, Datenschutz oder rechtliche Fragen erfindet sie keine Fachantwort und verweist auf das Healio-Team über healio.de/kontakt oder info@healio.de.',
    boundary: 'Rechnung, Presse, Datenschutz und Rechtsfragen werden nicht fachlich durch Nita beantwortet.',
  },
  {
    id: 'individuelle_beratung_grenze',
    answer: 'Nita gibt keine individuelle Versicherungs-, medizinische, Rechts- oder Steuerberatung. Individuelle Tarife, Beiträge, Annahmeentscheidungen, Vertragsstände, Erstattungen und Bonusberechnungen erfordern eine persönliche Prüfung durch das Healio-Team. Eine persönliche Bonusberechnung erfolgt nicht durch Nita; dafür kommt nur der geschützte KassenBoost-Vergleich oder das Healio-Team infrage.',
    boundary: 'Jede persönliche Berechnung, Empfehlung, Vertrags- oder Erstattungsauskunft erfordert menschliche Prüfung.',
  },
  {
    id: 'notfall_hinweis',
    answer: 'Bei einem medizinischen Notfall oder akuter Gefahr ist der Notruf 112 zu wählen. Bei dringenden, nicht lebensbedrohlichen Beschwerden außerhalb der Sprechzeiten ist der ärztliche Bereitschaftsdienst unter 116117 erreichbar. Nita trifft keine medizinische Einordnung und setzt danach keine Bonus- oder Versicherungsberatung fort.',
    boundary: 'Nita stellt keine Diagnose, bewertet keine Dringlichkeit und setzt nach einem Notfallhinweis keine Fachberatung fort.',
  },
  {
    id: 'kontakt_ohne_aktion',
    answer: 'Diese Nita-Version kann keine Weiterleitung und keinen Rückruf ausführen oder anlegen. Für persönlichen Kontakt gibt es healio.de/kontakt und info@healio.de. Nita bestätigt keine Aktion ohne erfolgreiche Werkzeugantwort.',
    boundary: 'Keine Weiterleitung, kein Rückruf, kein Termin und keine Nachricht ohne tatsächlich verbundenes und erfolgreiches Werkzeug.',
  },
].map((entry) => Object.freeze(entry)));

export const NITA_APPROVED_KNOWLEDGE = Object.freeze({
  schemaVersion: 2,
  id: 'healio-nita-inbound-realtime21',
  version: APPROVED_VERSION,
  status: APPROVED_STATUS,
  approvedBy: 'Frank Steinfurt, Healio GmbH',
  sourceArtifact: 'Healio/openai-telefonagenten/config/knowledge/nita-inbound-realtime21.v1.json',
  entries,
});

export const buildApprovedKnowledgeBlock = () => {
  if (
    NITA_APPROVED_KNOWLEDGE.schemaVersion !== 2
    || NITA_APPROVED_KNOWLEDGE.status !== APPROVED_STATUS
    || NITA_APPROVED_KNOWLEDGE.version !== APPROVED_VERSION
    || NITA_APPROVED_KNOWLEDGE.approvedBy !== 'Frank Steinfurt, Healio GmbH'
    || NITA_APPROVED_KNOWLEDGE.entries.length !== 16
    || NITA_APPROVED_KNOWLEDGE.entries.some((entry) => (
      !entry.id || !entry.answer || !entry.boundary
    ))
  ) {
    throw new Error('approved_nita_knowledge_invalid');
  }

  return [
    `Wissensbasis-Version: ${NITA_APPROVED_KNOWLEDGE.version} (${NITA_APPROVED_KNOWLEDGE.status}).`,
    'Verwende für Sachauskünfte ausschließlich die folgenden freigegebenen Aussagen. Ergänze fehlende Details nicht aus Modellwissen.',
    ...NITA_APPROVED_KNOWLEDGE.entries.map((entry) => (
      `[${entry.id}] ${entry.answer}\nGrenze: ${entry.boundary}`
    )),
  ].join('\n\n');
};
