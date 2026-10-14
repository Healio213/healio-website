# Abschließende mobile Siegelprüfung

14.10.2026 · Dev `http://127.0.0.1:4834` · ein gezielter Browserpass über neun beauftragte Ansichten.

**Keine Siegel-Produktbefunde.** Normale Produktseiten zeigen jeweils genau ein gemeinsames Band: Ambulant/Klinik drei aktuelle Originale, Zahn vier. Nach Öffnen der unteren IKK-Details erscheint keine zweite Siegelreihe. Der Bonuscheck-Einstieg zeigt ausschließlich das statische SDK-Siegel.

Normbewegung läuft fortlaufend und pausiert bei Hover/Tastaturfokus. Reduzierte Bewegung zeigt jedes Original genau einmal ohne Animation. Alttexte, Anbieter-/Tarifcaptions, Quellen und vollständige Zuordnung im Details-Aufklapper passen. Die kurze Zahn-Zuordnungszeile bleibt gemäß Roots Präzisierung bewusst erhalten.

| Ansicht | Viewport | Halbe Liste / Band |
| --- | --- | --- |
| Ambulant | 767 px | 992,9 / 767 px |
| Zahn | 390 und 767 px | 1.515,3 / 390 beziehungsweise 767 px |
| Klinik | 390 px | 992,9 / 390 px |
| EN Dental | 390 px | 1.513,8 / 390 px |
| EN Inpatient | 390 px | 936,7 / 390 px |
| Schwangerschaft | 767 px | 789,3 / 727 px |
| Ambulant Bonuscheck | 390 px | statisch, kein Tickertrack |
| EN Outpatient | 390 px | 936,7 / 390 px |

Alle laufenden Bänder sind geometrisch lang genug, einschließlich Schwangerschaft bei 767 px.

75 Rohchecks wurden erfasst, 73 unmittelbar grün. Zwei strengere Harness-Nebenkriterien wurden eingegrenzt, ohne den Browserpass zu wiederholen:

- Zahn 767: negativer allgemeiner HTTP-/Layout-Sammelcheck; sämtliche gespeicherten Layout-, Bild-, H1- und Laufzeitwerte sind korrekt. Der ursprüngliche HTTP-Status war nicht separat gespeichert. Die reine Cacheprobe liefert 200 normal und 304 mit passendem ETag; der Devstatus ist kein Siegelbefund.
- Einzel-SDK: absolute Y-Position ändert sich nach Wechsel der Bewegungspräferenz durch den umgebenden Seitenablauf um 27,4 px. Der Bild-X-Wert bleibt 147 px, `animation-name: none` und kein Tickertrack; das Siegel selbst läuft nicht.

Nachweise: `seals-metrics.json`, `http-cache-diagnose.json`. Drei repräsentative Normbilder: `zahn-390.png`, `stationaer-390.png`, `schwangerschaft-767.png`; zwei weitere kleine Bilder dokumentieren die ursprünglichen Harness-Kandidaten. Alte Nachweise unverändert.

Nur Details, Bewegung, Hover/Fokus und notwendige Cookieauswahl geprüft. Keine Versichererlinks, Formulare oder Anträge betätigt; schreibende Netzaufrufe blockiert, keine ausgelöst. Browser geschlossen, keine Produktdatei geändert.
