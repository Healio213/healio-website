# Gemini-Review: geprüfte Websiteverbesserungen

Stand: 10.10.2026. Ausgangspunkt: GitHub `main` auf `a1610c7`. Umsetzung im getrennten Branch `codex/gemini-review-20261010`; der bestehende Arbeitsstand im Hauptcheckout bleibt erhalten.

Frank hat „Prüfen und einarbeiten“ beauftragt und anschließend präzisiert: UKV soll einfach freiwillig dazubuchbar bleiben. Die Veröffentlichung ist beauftragt. Die vorhandenen Videos überarbeitet Frank separat über Claude; dieser Release enthält keinen neuen Film oder Render.

## Entscheidungen aus dem Review

| Bereich | Eingearbeitet |
| --- | --- |
| Startseite DE/EN | Du-Ansprache für Privatkunden; Jahresbeitrag, angenommener Bonus und verbleibender Aufwand klar getrennt. Dass der Kunde zunächst selbst zahlt und später Nachweise einreicht, steht ausdrücklich dabei. Die Rechnung ist jetzt auch mobil unmittelbar nach dem Einstieg sichtbar. |
| Ambulant DE/EN | SDK bleibt der Hauptweg mit vier getrennten Leistungstöpfen. Vorsorge, Impfungen und Präventionskurse teilen einen Topf. UKV bleibt eine kurze, freiwillige Ergänzung mit eigenem Rechner-Link und aufklappbaren Details. ARAG steht darunter als geschlossene, eigenständige Alternative. |
| Zahn DE/EN | Alle neun Ergebniswege bleiben erhalten. Vor jedem der sechs UKV-Rechnerwege wird die manuelle Auswahl der empfohlenen Tarifstufe erklärt. Eine ältere Behandlungsempfehlung wird nicht mehr automatisch als versichert dargestellt; laufende und beabsichtigte Maßnahmen werden ausdrücklich berücksichtigt. |
| Stationär DE/EN | DKV UZ1 als reiner Einbettzimmerweg sowie SDK SP1, SP2 und SPU stehen früh nebeneinander. Ein Familienlink führt direkt zum Kinderabschnitt. Elternschutz am Geburtstag, Anmeldefrist, maximaler Schutzumfang und die Voraussetzungen für Rooming-in werden zusammenhängend erklärt. |
| Hebamme | Die Bayerische-Leistungspraxis wird von einem eigenständigen ambulanten Tarifanspruch unterschieden. Acht Monate Wartezeit und die Grenzen bei bestehender Schwangerschaft bleiben sichtbar. SDK-Hebammenleistung wird weiterhin an den passenden stationären Fall gebunden. |
| Tier DE/EN | Der vorhandene Weg Tierart → OP-/Vollschutz → persönlicher Prüfauftrag bleibt bestehen. Der Einstieg sagt ausdrücklich: noch kein Versicherungsantrag. |
| Partner DE/EN | Praxis informiert neutral; Healio prüft und berät. Das SDK-Budget wird nicht vollständig als Behandlungsbudget für Heilpraktiker dargestellt. PDF-Einstieg und klare Rollen statt pauschaler Zusagen. |
| Unternehmen DE/EN | Vier konkrete Bausteine, bedingte Steuerhinweise und früher Rechner-Einstieg. Nach dem Firmen-E-Book führt der nächste Schritt zum Vorsorge-Check `/potenzialanalyse`. |
| Zahnärzte DE | Seitentexte durchgehend Sie, Checklisten-Einstieg, keine Provision oder Patientendatenübergabe durch die Praxis. Die Kostenaufklärung bleibt bei der Praxis. Der Checklisten-Download ist weiterhin ein gekennzeichneter Arbeitsstand mit Kammerprüfung. |
| Lead-Popup DE/EN | Überschrift passend zu Ambulant, Zahn oder Klinik. Versprochen wird ausschließlich der tatsächlich verfügbare Bonusleitfaden. Eingaben, Fehler, Wartezustände, Erfolg und Popup-Fallback sind übersetzt; Englisch weist auf den deutschen Leitfaden und Versichererantrag hin. Fehler sind barrierefrei dem richtigen Feld zugeordnet. |

## Einfacher UKV-Zusatzweg

Der sichtbare Einstieg lautet: **„UKV optional dazubuchen.“**

Der Knopf lautet: **„UKV-Beitrag berechnen“**. Er führt über das bestehende Lead-Popup zum bereits auf VorsorgePRIVAT eingeschränkten UKV-Rechner. Eine Teilnahme ist freiwillig. SDK und UKV behalten ihre eigenen Bedingungen; Erstattungen verschiedener Kostenträger sind insgesamt auf den Rechnungsbetrag begrenzt. Daraus wird kein neues frei verfügbares Gesamtbudget gebildet. Beispiele, Schwangerschaftshinweis und SDK-Abgrenzung stehen im bestehenden Aufklapper. Die Karte wurde mobil von knapp 1.000 Pixeln auf rund 650 Pixel Höhe gekürzt; Leistung, Anfangsgrenze, Beitrag, Brillenzuschlag und Antragsfragen bleiben offen sichtbar.

Die UKV-Informationen berücksichtigen andere private Versicherungen ausdrücklich. Das Verbot zusätzlicher überlappender Deckung in Tarifabschnitt IV.1 bezieht sich auf weitere Deckung beim selben Versicherer. Bei weiteren Krankheitskostenverträgen sind die Mitteilungspflichten zu beachten. Quellen: [UKV Informationspaket VorsorgePRIVAT, II.2 / IV.1 / § 9](https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/347260), [SDK allgemeine Bedingungen, A.8 / A.9](https://www.sdk.de/downloads/Bedingungen/AVB-Kranken-Zusatzversicherung-1.751.pdf).

## Ablauf vor dem externen Rechner

1. Ein Nutzer vergleicht Leistungen und Beitrag auf der Tarifseite. Der Zahn-Check gibt zusätzlich die empfohlene Stufe vor; beim Tierweg bleibt es beim persönlichen Prüfauftrag.
2. Der erste unterstützte externe Rechner-Link öffnet den Healio-Dialog. Er fragt nur Vorname und E-Mail ab und erklärt den neuen Rechner-Tab sowie die einmalige Leitfaden-Mail.
3. Die bestehenden Prüfungen validieren Eingaben und erlaubte Zieladresse. Die Anfrage geht über `/api/lead-capture` an das vorhandene eigene Kontaktsystem. Eine bestätigte Annahme ist Voraussetzung für die Weiterleitung.
4. Der Rechner öffnet im neuen Tab; bei einer Popup-Sperre erscheint ein manueller Link. Bei einem Übertragungsfehler bleiben die Angaben erhalten, ohne einen Erfolg zu behaupten.
5. Nach erfolgreicher Erfassung öffnen weitere unterstützte Rechner-Links in derselben Sitzung direkt. Es werden dafür weder eine zweite Eingabe noch eine zweite Guide-Anfrage verlangt. Der KassenBoost-Vergleich bleibt ohne dieses Formular erreichbar.
6. ARAG V100 ist weiterhin eine separate persönliche Angebotsanfrage. Die Bestätigung erklärt, dass damit kein Versicherungsantrag gestellt und keine Versicherung abgeschlossen wurde.

Der bestehende Mailprozess verschickt den deutschen Kassenbonus-Leitfaden. **Keine neuen Zahn-, Klinik- oder Tarifunterlagen und keine neue Mailautomation** wurden in diesem Release eingerichtet. Die heutigen Formularprüfungen simulieren Antworten; sie sind kein erneuter Nachweis realer Mailzustellung.

## Fachlich angepasste Vorschläge

- Die von Gemini vorgeschlagene pauschale Summe „SDK + ARAG = 1.500 EUR“ wird nicht beworben. ARAG fragt gleichartigen vorhandenen oder beantragten Zusatzschutz ab. V100 bleibt ein eigenständiger Vorsorgeweg mit Tarifkatalog und Wartezeit. [ARAG Antrag](https://www.arag-partnervertrieb.de/medien/pdf/KV/Antraege/arag_kv_antrag_zusatz_a842.pdf), [Tarifbedingungen](https://www.arag.de/assets/document/arag-bedingungen-kv-zusatz.pdf).
- Sportliche Diagnostik oder einzelne Laborwerte werden bei ARAG nicht pauschal zugesagt. Die konkrete Untersuchung ist vorher einzuordnen.
- Neugeborenenschutz und Rooming-in werden mit den tatsächlichen Voraussetzungen beschrieben. Eine bestehende Schwangerschaft begründet keine automatische Zusage für die Entbindung. [SDK SP1](https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-SP1-1.754a.pdf), [SDK SP2](https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-SP2-1.755a.pdf).
- DKV UZ1 wird als Zimmerleistung beschrieben, ohne eine Wahlarztleistung zu versprechen. [DKV UZ1](https://sites.dkv.com/dkv-com/pdf/versionen/0373_001.pdf).
- Die korrigierten Zahn-Aussagen stehen konsistent in Ergebnissen, FAQs, zwei betroffenen Ratgebern, FAQ-Schema und der öffentlichen Nita-Wissensdatei. Eine aktuell beabsichtigte oder laufende Behandlung bleibt unabhängig vom Alter einer Empfehlung anzugeben. [UKV aktueller Antrag](https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/342759).

## Abnahme

Die bestehenden Verträge für Homepage, Conversion, Vorsorge, Ratgeber, Nita-Wissen, Partner, Unternehmen, Zahnärzte, Praxisleitfaden, Checkliste, Ads-Messung und Bonusmodell wurden erfolgreich ausgeführt. Die 48 API-/Clientfälle für Lead-Capture und die Schwangerschafts-Integration bestehen. Geänderte JavaScript-/JSX-/TSX-Dateien bestehen den gezielten ESLint.

Responsive Ansichten bei 320, 390 und 1440 Pixeln prüfen Deutsch und Englisch, genau eine sichtbare H1, volle Seitenbreite, Linkziele, Guide-Popup und die entscheidenden Weiterleitungen. Formularantworten werden simuliert oder schreibende Anfragen blockiert; keine echten Leads, Mails oder Versicherungsanträge entstehen durch diese Abnahme.

Der abschließende Produktionsbuild und der konkrete Veröffentlichungsnachweis werden im Releasebericht protokolliert. Die vorhandenen Filme bleiben erhalten. Frank hat ihre separate Überarbeitung über Claude angekündigt, einschließlich der Ansprache auf der Zahnarztseite.

Nachtrag zur Quellenprüfung: Der anfängliche Zweifel am Gesetzesstand 2027 war zu pauschal und wurde gegenüber Frank korrigiert. Das GKV-Beitragssatzstabilisierungsgesetz vom 24.07.2026 ist in [§ 430 SGB V](https://www.gesetze-im-internet.de/sgb_5/__430.html) mit Fundstelle BGBl. 2026 I Nr. 228 genannt. Die [vom Bundestag beschlossene Fassung 21/7016](https://dserver.bundestag.de/btd/21/070/2107016.pdf), Art. 1 Nr. 22, beschreibt 50/60/65 Prozent und den Bestandsschutz für vor dem 01.01.2027 bewilligte Zuschüsse. Aus dem Quellenzweifel wurde deshalb keine Änderung auf „nur geplant“ abgeleitet.
