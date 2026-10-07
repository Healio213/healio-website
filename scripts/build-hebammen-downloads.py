"""Build the three blank, fillable practice handouts; never process patient data."""
from pathlib import Path
import re

from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "downloads"
FONT = Path.home() / ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/standard_fonts"
pdfmetrics.registerFont(TTFont("Healio", str(FONT / "LiberationSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("HealioBold", str(FONT / "LiberationSans-Bold.ttf")))
W, H = A4
NAVY = HexColor("#10363D")
MINT = HexColor("#D5F2E7")
INK = HexColor("#243A40")
GREY = HexColor("#52666A")
LINE = HexColor("#C8D6D6")
LEFT, RIGHT = 42, W - 42
CONTENT = RIGHT - LEFT
EXPECTED = {}


def paragraph(c, text, y, size=10, bold=False, x=LEFT, width=CONTENT, color=INK):
    style = ParagraphStyle("body", fontName="HealioBold" if bold else "Healio",
                           fontSize=size, leading=size * 1.4, textColor=color)
    p = Paragraph(text, style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, y - height)
    return y - height


def start(filename, title, subtitle):
    OUT.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT / filename), pagesize=A4)
    c.setTitle(title)
    c.setAuthor("Healio GmbH")
    c.setSubject("Ausfüllbare Arbeitsvorlage ohne Patientendaten. Stand 07.10.2026")
    c.setFillColor(NAVY)
    c.rect(0, H - 116, W, 116, stroke=0, fill=1)
    c.setFillColor(MINT)
    c.setFont("HealioBold", 16)
    c.drawString(LEFT, H - 31, "healio")
    c.setFont("Healio", 9)
    c.drawRightString(RIGHT, H - 30, "HEBAMMENPRAXIS · 07.10.2026")
    y = paragraph(c, title, H - 49, size=21, bold=True, color=white)
    paragraph(c, subtitle, y - 6, size=9, color=MINT)
    return c, H - 134


def box(c, text, y, size=9.5):
    style = ParagraphStyle("box", fontName="Healio", fontSize=size, leading=size * 1.4, textColor=INK)
    p = Paragraph(text, style)
    _, height = p.wrap(CONTENT - 24, H)
    c.setFillColor(MINT)
    c.roundRect(LEFT, y - height - 20, CONTENT, height + 20, 7, stroke=0, fill=1)
    p.drawOn(c, LEFT + 12, y - height - 10)
    return y - height - 32


def field(c, name, label, y, height=21, x=LEFT, width=CONTENT, multiline=False):
    c.setFillColor(GREY)
    c.setFont("Healio", 8)
    c.drawString(x, y, label)
    c.acroForm.textfield(name=name, tooltip=label, x=x, y=y - height - 5,
                        width=width, height=height, fontName="Helvetica", fontSize=10,
                        borderWidth=.6, borderStyle="solid", borderColor=LINE,
                        fillColor=white, textColor=INK, value="",
                        fieldFlags="multiline" if multiline else "", forceBorder=True)
    return y - height - 18


def pair(c, first, second, y):
    half = (CONTENT - 16) / 2
    field(c, first[0], first[1], y, width=half)
    return field(c, second[0], second[1], y, x=LEFT + half + 16, width=half)


def finish(c, filename, note):
    c.setStrokeColor(LINE)
    c.line(LEFT, 49, RIGHT, 49)
    paragraph(c, note, 41, size=7.5, color=GREY)
    c.setFont("Healio", 8)
    c.drawRightString(RIGHT, 17, "healio.de/hebammen · 1 / 1")
    c.save()
    reader = PdfReader(OUT / filename)
    fields = reader.get_fields() or {}
    assert fields, f"No fillable fields in {filename}"
    assert len(fields) == len(set(fields)), "Duplicate form field names"
    assert all(str(f.get("/V", "")) == "" for f in fields.values()), "Forms must be blank"
    widgets = [a.get_object() for p in reader.pages for a in p.get("/Annots", [])
               if a.get_object().get("/Subtype") == "/Widget"]
    assert len(widgets) == len(fields)
    assert all(w.get("/AP", {}).get("/N") for w in widgets)
    assert len(reader.pages) == 1
    EXPECTED[filename] = {"pages": len(reader.pages), "blankFields": len(fields)}


def invoice():
    filename = "hebammen-rechnungsmuster.pdf"
    c, y = start(filename, "Kosten- und Rechnungsmuster", "Für die Praxis · GKV-Leistung und zulässige Privatleistung sauber trennen")
    y = box(c, "<b>Arbeitsvorlage, keine fertige Rechnung.</b> Nur tatsächlich erbrachte, zulässig privat berechenbare Leistungen eintragen. Für dieselbe GKV-Vertragsleistung darf kein zusätzlicher Eigenanteil verlangt werden.", y)
    y = pair(c, ("praxis", "Praxis / Hebamme"), ("rechnung", "Rechnungsnummer / Ausstellungsdatum"), y)
    y = field(c, "anschrift", "Praxisanschrift und erforderliche Rechnungsangaben", y)
    y = field(c, "empfaenger", "Rechnungsempfänger / Anschrift", y)
    y = paragraph(c, "Leistungen einzeln dokumentieren", y + 1, bold=True, size=11) - 14
    for n in range(1, 3):
        y = pair(c, (f"datum_{n}", f"Position {n}: Datum / Dauer / ggf. Wegegeld"),
                 (f"grundlage_{n}", "Gebührenregelung / Position / Satz"), y)
        y = field(c, f"leistung_{n}", "Leistungsinhalt und Abgrenzung zur GKV-Leistung", y)
    y = pair(c, ("privathonorar", "Summe zulässiger Privatleistungen (EUR)"),
             ("gkv_bezug", "GKV-Vorleistung: Betrag / Bescheid / Zuordnung"), y)
    y = pair(c, ("vorabvereinbarung", "Datum der vorherigen Leistungsvereinbarung"),
             ("zahlbetrag", "Tatsächlicher Rechnungsbetrag (EUR)"), y)
    y = paragraph(c, "<b>Fiktives Rechenbeispiel Rufbereitschaft:</b> 800 EUR vereinbarte Kosten abzüglich 250 EUR tatsächlich bewilligtem Kassenzuschuss ergeben 550 EUR offene Kosten. Dies belegt weder eine zulässige Privatforderung noch eine Erstattung durch einen Zusatzversicherer.", y, size=9.5) - 11
    y = paragraph(c, "GKV-Belege und private Rechnungspositionen eindeutig zuordnen. Keine doppelte Abrechnung. Ein längerer Kassenbesuch begründet keinen pauschalen 50-EUR-Aufschlag. Den zutreffenden Gebührenrahmen und eventuelle Steuerpflichten für den konkreten Fall prüfen.", y, size=9)
    assert y > 65, y
    finish(c, filename, "Grundlage: Hebammenhilfevertrag ab 01.04.2026, Anlage 1.1 § 1; Bayerische-Fachauskunft vom 06.10.2026. Die Rechnung ersetzt keine Deckungszusage.")


def agreement():
    filename = "hebammen-leistungs-und-honorarvereinbarung.pdf"
    c, y = start(filename, "Leistung und Honorar vereinbaren", "Ausfüllbare Arbeitsvorlage · Vor der privaten Zusatzleistung besprechen")
    y = box(c, "<b>Vor Verwendung individuell vervollständigen.</b> Zuerst GKV-Anspruch, Zeit- und Kontingentgrenzen sowie ggf. ärztliche Anordnung prüfen. Nur eine davon abgrenzbare, zulässige Privatleistung vereinbaren.", y)
    y = field(c, "hebamme", "Hebamme / Praxis / Anschrift", y)
    y = field(c, "kundin", "Kundin / Anschrift", y)
    y = field(c, "inhalt", "Gewünschte private Leistung, Umfang und geplanter Termin", y, height=39, multiline=True)
    y = field(c, "abgrenzung", "Warum ist dies keine bereits vergütete GKV-Vertragsleistung?", y, height=39, multiline=True)
    y = pair(c, ("gebuehren", "Anwendbare Gebührenregelung / Gebührenposition"),
             ("satz", "Satz / Einheiten / ggf. gesondertes Wegegeld"), y)
    y = pair(c, ("honorar", "Vereinbartes Honorar / ggf. Kostenschätzung (EUR)"),
             ("gkv", "Bekannte GKV-Leistung / Nachweis"), y)
    y = field(c, "deckung", "Erstattungsprüfung: Versicherer / Bestätigung / Datum / offene Kosten", y)
    y = paragraph(c, "<b>Versicherung und Honorar sind getrennt.</b> Eine Vereinbarung mit der Hebamme schafft keinen Anspruch gegen die Krankenkasse oder einen Zusatzversicherer. Eine mögliche Erstattung vorab anhand der konkreten Leistung und des Vertrages klären; nicht bestätigte Kosten bleiben offen.", y, size=9.5) - 12
    y = paragraph(c, "Für die Bayerische gilt bei den hier besprochenen ambulanten Leistungen im Zusammenhang mit Schwangerschaft und Entbindung laut Fachauskunft vom 06.10.2026 ebenfalls eine Wartezeit von acht Monaten ab Versicherungsbeginn. Die Erstattung beruht auf aktueller Leistungspraxis, nicht auf einem eigenständigen ambulanten Anspruch in Komfort/Prestige.", y, size=9) - 17
    y = pair(c, ("ort_datum", "Ort / Datum (vor Leistungserbringung)"),
             ("sonstiges", "Weitere vereinbarte Bedingungen / Anlagen"), y)
    c.setStrokeColor(LINE)
    half = (CONTENT - 30) / 2
    c.line(LEFT, y - 14, LEFT + half, y - 14)
    c.line(LEFT + half + 30, y - 14, RIGHT, y - 14)
    paragraph(c, "Unterschrift Hebamme", y - 20, size=8, width=half)
    paragraph(c, "Unterschrift Kundin", y - 20, size=8, x=LEFT + half + 30, width=half)
    assert y - 32 > 65, y
    finish(c, filename, "Die Vorlage ist keine allgemein geprüfte Vertragsfassung. Gebührenrecht und Angaben für den konkreten Fall prüfen. Keine Doppelabrechnung von GKV-Leistungen.")


def family():
    filename = "hebammen-familien-checkliste.pdf"
    c, y = start(filename, "Gut vorbereitet in die Familienplanung", "Für Familien · Leistungen, Kosten und Versicherung vorab klären")
    y = box(c, "<b>Frühzeitig prüfen, möglichst vor einer Schwangerschaft.</b> Die Bayerische nennt acht Monate Wartezeit auch für die hier besprochenen ambulanten Hebammenleistungen. Ein Neuabschluss ist keine Sofortlösung für eine laufende Schwangerschaft.", y)
    steps = [
        ("1  Die gewünschte Leistung benennen", "Geht es um Vorsorge, einen zusätzlichen Hausbesuch, einen Kurs oder Rufbereitschaft? Lass dir Inhalt, Zeitpunkt und Kosten von der Hebamme konkret erläutern."),
        ("2  Zuerst die Krankenkasse fragen", "Welche Leistung bezahlt deine Kasse bereits? Welche Zeit- oder Besuchsgrenzen gelten? Bewilligte Zuschüsse und Bescheide aufbewahren."),
        ("3  Privatanteile nachvollziehen", "Nur tatsächlich zusätzliche, zulässig privat berechenbare Leistungen vereinbaren. Für dieselbe vollständig abgerechnete Kassenleistung darf keine zweite Rechnung entstehen."),
        ("4  Die Erstattung schriftlich prüfen lassen", "Mit Leistungsbeschreibung, Gebührenposition, Kostenschätzung und GKV-Nachweis eine konkrete Deckungsprüfung anfordern. Wartezeit, Versicherungsbeginn und mögliche Ausschlüsse gehören dazu."),
        ("5  Familie und Klinik getrennt betrachten", "Familienzimmer bei stationärer Entbindung läuft über den Vertrag der Mutter. Auch hier gilt die besondere Wartezeit für Entbindung. Ein Vertrag des Vaters allein reicht dafür nicht."),
    ]
    for title, body in steps:
        y = paragraph(c, title, y, size=11, bold=True) - 5
        y = paragraph(c, body, y, size=9.5) - 14
    y = pair(c, ("leistung", "Gewünschte Leistung / geplanter Zeitpunkt"),
             ("kosten", "Kostenschätzung / GKV-Zuschuss (EUR)"), y)
    y = pair(c, ("beginn", "Versicherungsbeginn / Tarif"),
             ("bestätigung", "Deckungsbestätigung / Datum / offene Fragen"), y)
    y = paragraph(c, "<b>Was Healio klärt:</b> Vertrag, Annahme, Wartezeiten und konkrete Erstattungsmöglichkeit. Die Hebamme beschreibt und berechnet ihre Leistung. Der Versicherer entscheidet über die Deckung.", y, size=9.5) - 10
    y = paragraph(c, "Komfort und Prestige berücksichtigen ambulante Hebammenleistungen nach aktueller Bayerische-Leistungspraxis. Diese ist kein eigenständiger Leistungsanspruch in den Tarifbedingungen. Auch nach Ablauf der Wartezeit ist die konkrete Leistung individuell zu prüfen.", y, size=9)
    assert y > 65, y
    finish(c, filename, "Stand 07.10.2026 · Fachauskünfte der Bayerischen vom 05./06.10.2026; AVB B 275000 und Tarifbedingungen B 275005 / B 275006, Stand 11/2024.")


if __name__ == "__main__":
    invoice()
    agreement()
    family()
    for filename, result in EXPECTED.items():
        print(f"{filename}: {result['pages']} page, {result['blankFields']} blank interactive fields")
