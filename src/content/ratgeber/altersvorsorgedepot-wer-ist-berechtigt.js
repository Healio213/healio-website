import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-wer-ist-berechtigt',
    cluster: 'grundlagen',
    audience: 'standard',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot: Wer ist förderberechtigt?',
    metaDescription: 'Angestellte, Beamte, Selbstständige und Ehepartner: Welche Voraussetzungen ab 2027 gelten und warum nicht jede Gruppe gleich gerechnet wird.',
    headline: 'Wer ist beim Altersvorsorgedepot förderberechtigt?',
    lead: 'Die bisher begünstigten Personengruppen bleiben grundsätzlich förderberechtigt. Neu kommen bestimmte Selbstständige und Pflichtmitglieder berufsständischer Altersversorgung hinzu. Für diese neuen Gruppen gelten zusätzliche Voraussetzungen und eine Altersgrenze unter 67. Ehepartner können mittelbar berechtigt sein. Ob du Förderung erhältst, lässt sich deshalb nicht allein aus deinem Beruf ableiten.',
    listTeaser: 'Die wichtigsten Gruppen und Voraussetzungen vor der persönlichen Zulagenrechnung.',
    sections: [
      {
        id: 'berechtigung-vor-rechnung',
        heading: 'Erst den Status klären, dann die Zulage rechnen',
        blocks: [
          { type: 'paragraph', text: 'Eine Zulagenformel beantwortet die Frage nach dem Betrag. Die Formel beantwortet noch nicht, ob du zum begünstigten Personenkreis gehörst. Bevor du mit 540 EUR Grundzulage oder einer Kinderzulage planst, brauchst du daher eine Zuordnung deines Status im jeweiligen Beitragsjahr. Ein Berufswechsel, eine neue Selbstständigkeit oder eine veränderte Familiensituation können dabei relevant sein.' },
          { type: 'paragraph', text: 'Unmittelbar Berechtigte erfüllen die gesetzlichen Voraussetzungen selbst. Mittelbar Berechtigte leiten ihre Berechtigung von einem unmittelbar berechtigten Ehepartner oder eingetragenen Lebenspartner ab. Diese Unterscheidung ist für die Rechnung wichtig: Zwei Partner erhalten nicht automatisch dieselbe Grundzulage, nur weil beide einen eigenen Vorsorgevertrag besitzen.' },
        ],
      },
      {
        id: 'gruppen-ueberblick',
        heading: 'Die wichtigsten Gruppen im Überblick',
        blocks: [
          { type: 'table', caption: 'Orientierung für die Förderprüfung', head: ['Situation', 'Grundsätzlich möglicher Zugang', 'Was du konkret prüfen solltest'], rows: [
            ['Angestellt und gesetzlich rentenversicherungspflichtig', 'Unmittelbar', 'Tatsächliche Pflichtversicherung im Beitragsjahr'],
            ['Beamter', 'Unmittelbar unter weiteren Voraussetzungen', 'Erforderliche Einwilligung zur Datenübermittlung'],
            ['Selbstständig mit bestimmten Einkünften', 'Neu unmittelbar', 'Unter 67, Einkunftsart und abgegebene Steuererklärung'],
            ['Angestellt mit berufsständischer Altersversorgung', 'Neu unmittelbar', 'Unter 67, Pflichtmitgliedschaft, Beitrag und Einwilligung'],
            ['Ehepartner ohne eigenen unmittelbaren Zugang', 'Mittelbar unter Voraussetzungen', 'Berechtigung des Partners, eigener Vertrag und Mindestbeitrag'],
          ], note: 'Diese Auswahl ist keine vollständige Liste aller begünstigten Sonderfälle. Die konkrete Prüfung erfolgt anhand der gesetzlichen Voraussetzungen.' },
          { type: 'paragraph', text: 'Ausbildungs-, Pflege- oder Kindererziehungszeiten können ebenfalls relevant sein, wenn daraus eine begünstigte Versicherungs- oder Berechtigungssituation entsteht. Eine Teilzeitstelle ist nicht automatisch ausgeschlossen. Umgekehrt schafft eine freiwillige Einzahlung in die gesetzliche Rentenversicherung allein nicht zwangsläufig denselben Status wie eine Pflichtversicherung.' },
        ],
      },
      {
        id: 'selbststaendige',
        heading: 'Was für Selbstständige neu ist',
        blocks: [
          { type: 'paragraph', text: 'Für den neuen unmittelbaren Zugang musst du das 67. Lebensjahr noch nicht vollendet haben und im Beitragsjahr Einkünfte nach § 15 EStG oder § 18 Absatz 1 Nummer 1 bis 3 EStG erzielen. Außerdem muss eine Einkommensteuererklärung für dieses Beitragsjahr abgegeben worden sein. Dazu können gewerbliche und bestimmte freiberufliche Tätigkeiten gehören.' },
          { type: 'paragraph', text: 'Bei Heilpraktikern ist die freiberufliche Tätigkeit deshalb ein möglicher Zugang. Die bloße Berufsbezeichnung ersetzt aber keine Prüfung der Einkunftsart und der Erklärung. Wer hauptberuflich angestellt ist und nebenbei selbstständig arbeitet, kann bereits über die Pflichtversicherung unmittelbar berechtigt sein. Für die Förderprüfung solltest du beide Tätigkeiten nennen, ohne daraus zwei getrennte Höchstgrundzulagen abzuleiten.' },
        ],
      },
      {
        id: 'berufsstaendige-altersversorgung',
        heading: 'Berufsständische Altersversorgung: Mitgliedschaft allein genügt nicht',
        blocks: [
          { type: 'paragraph', text: 'Der zusätzliche Zugang für angestellte Pflichtmitglieder berufsständischer Altersversorgung setzt ebenfalls ein Alter unter 67 voraus. Hinzu kommen Einkünfte nach § 19 EStG sowie eine entrichtete Versorgungsabgabe. Spätestens bis zum Ablauf des Beitragsjahres muss die erforderliche schriftliche oder elektronische Einwilligung zur Datenübermittlung an die zuständige Stelle vorliegen.' },
          { type: 'paragraph', text: 'Ein angestellter Arzt sollte deshalb seinen tatsächlichen Versicherungs- und Mitgliedschaftsstatus klären. Bei selbstständiger Tätigkeit kann stattdessen der neue Zugang über die entsprechenden Einkünfte einschlägig sein. Für die Unterlagenliste sind Nachweise über Tätigkeit, Pflichtmitgliedschaft und Beiträge sowie die Bestätigung der Einwilligung hilfreich. Die konkreten Datenwege musst du mit Anbieter und zuständiger Stelle abstimmen.' },
        ],
      },
      {
        id: 'mittelbare-berechtigung',
        heading: 'Für mittelbare Berechtigung gilt eine eigene Rechnung',
        blocks: [
          { type: 'paragraph', text: 'Bei verheirateten oder eingetragenen Lebenspartnern kann eine Person mittelbar berechtigt sein, wenn der andere Partner unmittelbar berechtigt ist. Weitere Voraussetzungen betreffen unter anderem den eigenen Vertrag, das Nichtgetrenntleben und einen eigenen Jahresbeitrag von mindestens 120 EUR. Die Grundzulage ist auf 175 EUR begrenzt und wird anhand der Beiträge des unmittelbar Berechtigten berechnet.' },
          { type: 'paragraph', text: 'Für eine Familienrechnung brauchst du deshalb zwei klar bezeichnete Rollen und die Zuordnung der Kinderzulage. Rechne nicht einfach zweimal eine Standardzulage aus. Halte außerdem Veränderungen aktuell: Wer wieder eine rentenversicherungspflichtige Beschäftigung aufnimmt, kann künftig einen eigenen unmittelbaren Zugang haben. Eine persönliche Berechtigungsprüfung sollte der Auswahl des konkreten Produkts vorausgehen.' },
        ],
      },
    ],
    faqs: [
      { question: 'Sind alle Selbstständigen automatisch berechtigt?', answer: 'Nein. Für den neuen Zugang gelten unter anderem die Altersgrenze unter 67, bestimmte Einkünfte im Beitragsjahr und die abgegebene Einkommensteuererklärung für dieses Jahr. Der Einzelfall muss dazu passen.' },
      { question: 'Bekomme ich als mittelbar berechtigter Partner auch bis zu 540 EUR?', answer: 'Die Grundzulage mittelbar Berechtigter ist auf 175 EUR begrenzt. Maßgeblich sind außerdem die Beiträge des unmittelbar berechtigten Partners. Eine allgemeine Standardrechnung passt deshalb nicht.' },
      { question: 'Gilt die Altersgrenze unter 67 für jeden bisherigen Riester-Sparer?', answer: 'Die hier beschriebene Altersgrenze gehört zum neu erweiterten Zugang für bestimmte Selbstständige und Personen mit berufsständischer Altersversorgung. Daraus lässt sich kein pauschaler Ausschluss sämtlicher bisher begünstigter Personen ableiten.' },
    ],
    sourceIds: ['gesetz', 'bmf', 'zfa'],
    relatedSlugs: ['altersvorsorgedepot-foerderung', 'altersvorsorgedepot-passt-das-zu-mir'],
  });
