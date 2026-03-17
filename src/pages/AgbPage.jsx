import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const AgbPage = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createWebPageSchema("Allgemeine Geschäftsbedingungen", "AGB von Healio. Lese unsere Geschäftsbedingungen und verstehe die Nutzungsrichtlinien unserer Gesundheitsplattform.")
    ]
  };

  return (
    <>
      <SEOHead
        title="Allgemeine Geschäftsbedingungen - Healio"
        description="AGB von Healio. Lese unsere Geschäftsbedingungen und verstehe die Nutzungsrichtlinien unserer Gesundheitsplattform."
        canonicalUrl="https://www.healio.de/agb"
        ogTitle="Allgemeine Geschäftsbedingungen - Healio"
        ogDescription="Allgemeine Geschäftsbedingungen (AGB) für Versicherungsmakler der Noli GmbH."
        ogUrl="https://www.healio.de/agb"
        schemaMarkup={schemaMarkup}
      />
      <main className="bg-white py-16 sm:py-24">
        <div className="healio-container">
          <div className="prose prose-lg mx-auto text-healio-text-light max-w-4xl">
            <h1 className="text-4xl font-extrabold text-healio-text mb-8">Allgemeine Geschäftsbedingungen für Versicherungsmakler</h1>
            
            <nav aria-label="Seitennavigation" className="mb-8 text-sm">
              <Link to="/" className="text-healio-green hover:underline">Startseite</Link>
              {' / '}
              <Link to="/impressum" className="text-healio-green hover:underline">Impressum</Link>
              {' / '}
              <Link to="/datenschutz" className="text-healio-green hover:underline">Datenschutz</Link>
            </nav>

            <p className="text-healio-text-light mb-8">Healio ist eine Marke der Noli GmbH.</p>
            
            <h2 className="text-2xl font-bold text-healio-text mt-12 mb-4">1. Vertragsgegenstand lt. Maklervertrag</h2>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(1)</h3>
            <p>Der Versicherungsmaklervertrag unter Einbeziehung dieser allgemeine Geschäftsbedingungen (AGB) bezieht sich nur auf die im Maklervertrag ausdrücklich benannten privatrechtlichen Versicherungsverträge, für die eine Vermittlungstätigkeit gewünscht wurde oder eine Verwaltungsübernahme auf den Makler erfolgte.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(2)</h3>
            <p>Es kann gesondert vereinbart werden, dass sich die Beauftragung auf bereits beim Abschluss dieses Vertrages bestehende Versicherungsverhältnisse erstrecken soll. Diese Vertragsverhältnisse werden dann künftig durch den Makler verwaltet, sofern sie der Versicherer courtagepflichtig in den Bestand des Maklers überträgt.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(3)</h3>
            <p>Eine anderweitige oder weitergehende Tätigkeits- oder Beratungsverpflichtung, außer für die Vermittlung und/oder Verwaltung des gewünschten Versicherungsschutzes des Mandanten, besteht nicht. Insbesondere ist eine Beratung oder Betreuung der gesetzlichen Sozialversicherungen nicht von der Maklertätigkeit umfasst.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(4)</h3>
            <p>Schließt der Mandant nach Abschluss des vorliegenden Vertrages einen Versicherungsvertrag über einen anderen Vermittler ab, so erstreckt sich der vorliegende Maklervertrag nicht auf diesen über den anderen Vermittler abgeschlossenen Versicherungsvertrag. Den Makler trifft diesbezüglich keine Beratungspflicht, es sei denn, der Mandant legt den entsprechenden Vertrag gegenüber dem Makler offen und der Versicherer stimmt einer Übertragung des Versicherungsvertrages in den Bestand des Maklers zu.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(5)</h3>
            <p>Wünscht der Mandant nach Abschluss des vorliegenden Maklervertrages die Vermittlung eines Versicherungsvertrages zusätzlich zu den in diesem Maklervertrag festgelegten Verträgen und nimmt der Makler daraufhin eine Beratung gegenüber dem Mandanten auf, so erstreckt sich der vorliegende Maklervertrag auch auf diese Beratung und den neu vermittelten Versicherungsvertrag.</p>

            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(6)</h3>
            <p>Dieser Versicherungsmaklervertrag bezieht sich nur auf die Beratung und Vermittlung von Versicherungsverträgen, wofür es einer Berufszulassung nach § 34d GewO bedarf. Sonstige Finanz- oder Kapitalanlageprodukte, die nicht unter diese Berufszulassung für die Versicherungsvermittlung fallen, werden nicht über uns vermittelt oder beraten. Wir sind auch nur für die von uns geprüften Versicherungsprodukte verantwortlich, die über uns vermittelt wurden.</p>
            
            <h2 className="text-2xl font-bold text-healio-text mt-12 mb-4">2. Pflichten des Mandanten</h2>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(1)</h3>
            <p>Der Mandant ist zur Mitwirkung, insbesondere zur unverzüglichen und vollständigen Erteilung wahrheitsgemäßer Angaben verpflichtet, soweit es zur ordnungsgemäßen Erledigung der Beauftragung erforderlich ist. Dies gilt auch für Änderungen seiner Risiko- oder Rechtsverhältnisse oder der zugrunde liegenden Tatsachen nach Vertragsschluss, die für den jeweiligen Versicherungsschutz relevant sein könnten. Unterlässt der Mandant die unverzügliche Information, besteht eventuell kein oder kein vollständiger Anspruch aus dem Versicherungsvertrag. Insbesondere hat er dem Makler unaufgefordert alle für die Ausführung des Auftrages notwendigen Unterlagen vollständig zu übergeben.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(2)</h3>
            <p>Bei der Bearbeitung der Vermittlungsanfrage kann nur der vom Mandanten geschilderte Sachverhalt zugrunde gelegt werden. Der dargelegte Sachverhalt ist als vollständig, wahrheitsgemäß und abschließend als Beratungsgrundlage anzunehmen.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(3)</h3>
            <p>Der Makler ist nicht verpflichtet und nicht in der Lage, sich nach der Vermittlung des gewünschten Versicherungsschutzes fortlaufend über eventuelle Änderungen der Verhältnisse des Mandanten zu informieren. Entsprechendes gilt für die Unterrichtung über alle Vorgänge und Umstände, die für die Ausführung des Auftrages von Bedeutung sein können, auch wenn der Mandant selbst erst später eigene Kenntnis erhält.</p>

            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(4)</h3>
            <p>Der Mandant verpflichtet sich, Arbeitsergebnisse und -konzepte des Maklers nur mit seiner schriftlichen vorherigen Einwilligung an Dritte (z.B. Kreditinstitute, Konkurrenzunternehmen) weiterzugeben. Für eigene Versicherungsanalysen und individuell erstellte Deckungskonzepte nimmt der Makler Urheberrechtsschutz nach den Bestimmungen des Urhebergesetzes in Anspruch. Eine Haftungsverantwortung des Maklers für deren Inhalt gegenüber Dritten wird ausgeschlossen.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(5)</h3>
            <p>Die aus den Versicherungsverträgen unmittelbar erwachsenden Verpflichtungen, wie die Prämienzahlungen, Anzeigepflichten und die Einhaltung vertraglicher Obliegenheiten, etc. sind vom Mandanten zu erfüllen.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(6)</h3>
            <p>Der Mandant ist verpflichtet, dem Makler die vertragsbezogene Korrespondenz des Versicherers für eine gewünschte Interessenwahrnehmung zur Verfügung zu stellen oder den Schriftverkehr mit dem Versicherer ausschließlich über den Makler zu führen.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(7)</h3>
            <p>Der Mandant ist unabhängig von dem Fortbestand des vorliegenden Maklervertrages jederzeit berechtigt, einen anderen Vermittler mit der Vermittlung und Verwaltung seiner Versicherungsverträge zu beauftragen. Der Mandant ist zuvor verpflichtet, den Makler über die neue Beauftragung zu informieren, damit der Makler an der geordneten Übernahme der Verwaltung durch den neu beauftragten Vermittler mitwirken kann. Alsdann ist davon auszugehen, dass der neubeauftragte Vermittler ab dem berechtigten Übernahmezeitpunkt der Versicherungsverträge die Vergütung vom Versicherer erhält und seinerseits die umfassende Betreuungstätigkeit gegenüber dem Mandanten erbringt. Ein Anlass für eine weitere Verwaltungstätigkeit des Maklers für den Mandanten besteht daher nicht. Beiden Parteien steht es frei, die Zusammenarbeit ganz oder teilweise zu beenden. Der vom Mandanten neubeauftragte Vermittler haftet selbständig gegenüber dem Mandanten für seine Beratung. Eine gesamtschuldnerische Haftung besteht nicht.</p>

            <h2 className="text-2xl font-bold text-healio-text mt-12 mb-4">3. Haftung</h2>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(1)</h3>
            <p>Der Makler übernimmt die Haftung für die ordnungsgemäße Erfüllung seiner Aufgaben aus diesem Vertrag im Rahmen der gesetzlichen Bestimmungen. Es wird darauf hingewiesen, dass ein ordnungsgemäß abgeschlossener Versicherungsvertrag zwischen dem Mandanten und dem Versicherer für die Leistungen des Versicherers maßgeblich ist. Der Versicherungsmakler haftet nicht für die Bonität des Versicherers oder die Erfüllung von Versicherungsleistungen, soweit diese nicht auf einer fehlerhaften Beratung oder Vermittlung beruhen.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(2)</h3>
            <p>Der Makler haftet nicht für die Richtigkeit und Vollständigkeit der vom Mandanten oder von Dritten (z.B. Versicherern) erhaltenen Informationen.</p>
            
            <h3 className="text-xl font-semibold text-healio-text mt-6 mb-2">(3)</h3>
            <p>Der Makler haftet nicht für unvorhersehbare Ereignisse, höhere Gewalt oder Verschulden Dritter, die weder vom Mandanten noch vom Makler zu vertreten sind, wie etwa Betriebsstörungen bei Dritten oder nicht durch den Makler verursachte Internet- und Netzwerkstörungen</p>

            <p className="mt-12 text-sm text-gray-500">Stand: Februar 2026</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default AgbPage;