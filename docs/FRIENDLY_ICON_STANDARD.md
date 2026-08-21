# Friendly-Icon-Standard

Stand: 21. August 2026

Dieser Stil ist die verbindliche Bildsprache für inhaltliche Icons auf Healio
und KassenBoost, bis er bewusst durch einen besseren gemeinsamen Standard
ersetzt wird.

## Gestaltungsprinzip

- freundliche, hochwertige 3D-Clay-Motive
- klare Bedeutung schon vor dem Lesen der Überschrift
- gemeinsame Farben: Navy, Mint, Creme, Buttergelb, Koralle und helles Blau
- keine echten Banknoten, Markenlogos oder unnötigen Schriftzüge im Motiv
- keine zufälligen System-Emojis oder austauschbaren Linien-Icons in
  Inhaltskarten
- kleine Funktionszeichen wie Pfeile, Plus, Haken und Aufklapp-Chevrons dürfen
  als reduzierte UI-Glyphen bleiben

## Verbindliche Bedeutungen

- `money`: Beitrag und Sparen
- `bonus`: verdienter Bonus
- `budget`: Gesundheitsbudget oder zweckgebundenes Guthaben
- `calculator`: persönliche Berechnung
- `family`: Familie und Kinder
- `fitness`: Sport und Aktivität
- `smartwatch`: Fitnesstracker und Gesundheitsdaten
- `ambulant`: ambulante Leistungen
- `dental`: Zahnleistungen
- `hospital`: stationäre Leistungen
- `support`: persönliche Erklärung und Begleitung
- `document`: Antrag, Nachweis und Unterlagen
- `region`: regionale Verfügbarkeit
- `protection`: Versicherungsschutz und geprüfte Sicherheit
- `comparison`: Abwägung und Vergleich
- `switch`: Wechsel und Fortschritt
- `privacy`: Datenschutz
- `calendar`: Termin oder Prüfstand
- `glasses`: Sehhilfen
- `pregnancy`: Schwangerschaft
- `prevention`: Vorsorge und Impfungen
- `medication`: Arzneimittel und Zuzahlungen
- `naturopathy`: Naturheilkunde, Osteopathie und TCM

## Technische Quelle

- Komponente: `src/components/ui/FriendlyIcon.jsx`
- Registry: `src/components/ui/healioSoftClayIcons.js`
- Assets: `public/images/friendly-icons/`

Neue Inhaltskarten verwenden `kind` an der zentralen Komponente. Ein neues
Motiv wird erst nach Prüfung auf Eindeutigkeit, Barrierefreiheit und Konsistenz
in die zentrale Zuordnung aufgenommen. Bestehende `icon`-Aufrufe bleiben als
rückwärtskompatible API erhalten und werden zentral auf die neue Bildsprache
abgebildet. Die bisherigen Soft-Clay-Dateien bleiben als geprüfter Fallback im
Projekt.
