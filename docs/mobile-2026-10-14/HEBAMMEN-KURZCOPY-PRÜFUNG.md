# Hebammen: mobile Kurzcopy bestätigt

14.10.2026. Nach dem abgeschlossenen 66-Hauptseitenpass wurden ausschließlich `src/pages/HebammenPage.jsx`, `src/i18n/locales/de/hebammen.json` und `src/i18n/locales/en/hebammen.json` geändert.

Frühe proof-Karten zeigen unter 768 px nur ihre kurzen Titel. Das große Schwangerschaftsbild und alle drei FriendlyIcons bleiben mit denselben Bildquellen und Maßen erhalten. Die bisherigen Beschreibungen bleiben ab md sichtbar. Spätere Rollen-/Ablaufblöcke und fachliche Bedingungen sind vollständig erhalten.

Die zweite dunkle Budgetleiste behält den großen Budgetwert und das Tariflabel. Der mobile Begleittext lautet: **„Tarifliche Erstattung für ergänzende ambulante Leistungen.“** Englisch: **„Plan reimbursement for additional outpatient care.“** Der vollständige ursprüngliche Desktoptext bleibt erhalten; alle bisherigen Übersetzungswerte, Versicherungszahlen und Neugeborenenbedingungen sind unverändert.

Prüfung: gezieltes ESLint, `test:hebammen` für DE/EN und `git diff --check` bestanden. Zwei eng begrenzte Browseransichten auf Dev4834 bei 390 px: **12/12 Checks bestanden**, finaler Lauf Exit 0. H1 unverändert, vier frühe Proofbilder unverändert, positive Kurzcopy und großer Budgetwert sichtbar, spätere Rollen vollständig, vorhandener Klinik-Aufklapper per echtem Pointer funktionstüchtig, keine Überbreite oder doppelten IDs. Ein früher Screenshotselektorfehler im Harness wurde korrigiert; kein Produktfehler. Nach Änderung zur positiven Kurzcopy wurden genau DE/EN390 erneut final bestätigt.

Keine neue Vollprüfung. Die beiläufigen Wortzählfelder aus der begrenzten Abschnittsprüfung werden nicht als Gesamtdelta benutzt. Keine Formulare, persönlichen Daten, Gesundheits-/Kontakt-/Antragsaktionen, Builds, Commits oder Pushes. Browser geschlossen.

Belege: `hebammen-kurzcopy/metrics.json`, `VERIFIKATION.json`, `browser-hebammen.mjs`; jeweils Hero-, proof- und Budget-Viewport für DE/EN.
