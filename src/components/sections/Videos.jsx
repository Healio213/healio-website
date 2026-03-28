import React from 'react';
import { useTranslation } from 'react-i18next';
import VideoCard from '@/components/VideoCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Videos = () => {
  const { t } = useTranslation('home');

  return (
    <section className="healio-section">
      <div className="healio-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-healio-text">
            {t('videos.title')}
          </h2>
          <p className="mt-4 text-lg text-healio-text-light max-w-3xl mx-auto">
            {t('videos.subtitle')}
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <VideoCard
            title={t('videos.conceptTitle')}
            description={t('videos.conceptDesc')}
            thumbnailText={t('videos.conceptLabel')}
            delay={0}
          />

          <div className="mt-8 bg-white rounded-2xl shadow-lg p-2">
             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-healio-text-light hover:no-underline text-left px-4">
                  {t('videos.detailLabel')}
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="prose prose-lg max-w-none text-healio-text-light">
                    <h3 className="text-healio-text">Ambulante Zusatzversicherung – klar und einfach erklärt</h3>
                    <p>Mit Healio sicherst du dir eine moderne und unkomplizierte Zusatzabsicherung für ambulante Leistungen, die von deiner gesetzlichen Krankenkasse nicht oder nur teilweise übernommen werden. Besonders häufig entstehen Zuzahlungen beim Heilpraktiker, beim Frauenarzt (z. B. zusätzliche Untersuchungen in der Schwangerschaft), bei Massagen und Osteopathie sowie vielen weiteren Fachärzten.</p>
                    <p>Healio hilft dir dabei, genau diese ambulanten Gesundheitsleistungen individuell abzusichern – digital, transparent und schnell.</p>
                    
                    <h4 className="text-healio-text">Welche Vorteile hast du mit Healio?</h4>
                    <ul>
                      <li>Ambulante Leistungen individuell absichern (z. B. Heilpraktiker, Frauenarzt, Massagen, Osteopathie)</li>
                      <li>Viele weitere ambulante Leistungen ebenfalls mit eingeschlossen</li>
                      <li>Klarheit über deinen Beitrag – sofort online berechnet, inkl. Risikozuschlag</li>
                      <li>Keine Wartezeiten oder versteckten Kosten</li>
                      <li>Optionale Zusatzersparnis durch das Bonusprogramm der IKK classic</li>
                      <li>Komplett digitaler Abschluss, ohne Papierkram</li>
                    </ul>

                    <h4 className="text-healio-text">So einfach nutzt du Healio:</h4>
                    <ol>
                      <li><strong>Wähle deine Wunschleistungen:</strong> Entscheide selbst, welche ambulanten Leistungen du absichern möchtest: z. B. Behandlungen beim Heilpraktiker, Massagen, Osteopathie, zusätzliche Vorsorgeleistungen beim Frauenarzt oder andere ambulante Facharztleistungen deiner Wahl.</li>
                      <li><strong>Nutze unseren digitalen Tarifrechner:</strong> Einfach Leistungen auswählen, kurze Gesundheitsfragen beantworten und sofort deinen persönlichen Beitrag sehen (inklusive möglichem Risikozuschlag).</li>
                      <li><strong>Versicherung digital abschließen:</strong> Bist du zufrieden mit deinem Angebot? Dann schließe die Zusatzversicherung direkt online ab – einfach, schnell und transparent.</li>
                      <li><strong>Nutze zusätzlich das Bonusprogramm der IKK classic (optional):</strong> Möchtest du noch mehr sparen, empfiehlt sich der Wechsel zur IKK classic. Durch deren attraktives Bonusprogramm erhältst du Prämien für Vorsorge, Prävention oder gesunden Lebensstil. Diese Prämien kannst du nutzen, um deine Zusatzversicherung zusätzlich zu vergünstigen.</li>
                    </ol>

                    <h4 className="text-healio-text">Dein Weg mit Healio auf einen Blick:</h4>
                    <ol>
                      <li>Leistungen wählen (Heilpraktiker, Frauenarzt, Massagen, Osteopathie, weitere ambulante Leistungen)</li>
                      <li>Online Beitrag berechnen</li>
                      <li>Digitale Gesundheitsfragen beantworten</li>
                      <li>Versicherung abschließen</li>
                      <li>Bonus sichern mit der IKK classic (optional)</li>
                    </ol>
                    <p>➡️ Fertig! So einfach bist du rundum ambulant abgesichert.</p>

                    <h4 className="text-healio-text">Für wen ist Healio ideal?</h4>
                    <ul>
                      <li>Für alle, die regelmäßig beim Heilpraktiker behandelt werden</li>
                      <li>Für Frauen, die beim Frauenarzt zusätzliche Leistungen (z. B. in der Schwangerschaft) nutzen möchten</li>
                      <li>Für alle, die regelmäßig Massagen oder Osteopathie in Anspruch nehmen</li>
                      <li>Für alle, die ihre ambulanten Gesundheitsleistungen erweitern wollen (z. B. zusätzliche Diagnostik, Facharztleistungen)</li>
                      <li>Für Menschen, die volle Klarheit und eine einfache, digitale Absicherung suchen</li>
                    </ul>
                    
                    <h3 className="text-healio-text mt-6">Healio – Gesundheit weitergedacht.</h3>
                    <p>📌 Jetzt Tarif berechnen</p>
                    <p>📌 Sofort Beitrag erfahren</p>
                    <p>📌 Ambulant optimal abgesichert sein</p>
                    <p>Hast du noch Fragen? Unser digitaler Assistent hilft dir gerne weiter und erklärt dir ausführlich alles, was du wissen möchtest.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;