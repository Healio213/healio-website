# HEALIO Website - Technische Dokumentation

**Stand:** 17. Maerz 2026
**Projekt:** healio.de B2B Website
**Repository:** https://github.com/Healio213/healio-website
**Live:** https://www.healio.de

---

## 1. Infrastruktur-Uebersicht

### Domain & DNS
| Dienst | Details |
|--------|---------|
| Domain | healio.de |
| Registrar | Hostinger (Transfer zu Cloudflare laeuft) |
| DNS-Provider | Cloudflare (neu) |
| Nameserver | ali.ns.cloudflare.com / clint.ns.cloudflare.com |
| Cloudflare-Tarif | Kostenlos (Free) |
| Cloudflare Zonen-ID | a59f2688d36981661f74cd55b4a1d365 |

### Hosting & Deployment
| Dienst | Details |
|--------|---------|
| Website-Hosting | Vercel (automatisches Deployment via GitHub) |
| Backend-Server | Hetzner VPS (162.55.104.119) |
| CI/CD | GitHub Push → Vercel Auto-Deploy |

### DNS-Records (Cloudflare)
| Typ | Name | Wert | Proxy |
|-----|------|------|-------|
| A | @ (healio.de) | 216.198.79.1 | Proxied |
| A | www | 216.198.79.1 | Proxied |
| A | app | 162.55.104.119 | Proxied |
| A | n8n | 162.55.104.119 | Proxied |
| A | status | 162.55.104.119 | Proxied |
| MX | @ | ASPMX.L.GOOGLE.COM (Prio 1) | DNS only |
| MX | @ | ALT1.ASPMX.L.GOOGLE.COM (Prio 5) | DNS only |
| MX | @ | ALT2.ASPMX.L.GOOGLE.COM (Prio 5) | DNS only |
| MX | @ | ALT3.ASPMX.L.GOOGLE.COM (Prio 10) | DNS only |
| MX | @ | ALT4.ASPMX.L.GOOGLE.COM (Prio 10) | DNS only |
| CNAME | brevo1_domainkey | b1.healio-de.dkim... | Proxied |
| CNAME | brevo2_domainkey | b2.healio-de.dkim... | Proxied |
| TXT | @ | v=spf1 include:_spf.google.com ~all | DNS only |
| TXT | @ | google-site-verification=... | DNS only |
| TXT | @ | brevo-code:65... | DNS only |
| TXT | _dmarc | v=DMARC1; p=... | DNS only |
| CAA | @ | 0 issue letsencrypt.org (+ weitere) | DNS only |

### Externe Dienste
| Dienst | Zweck | Account |
|--------|-------|---------|
| Google Workspace | E-Mail (@healio.de) | fr.steinfurt@gmail.com |
| Brevo | E-Mail-Marketing (DKIM) | - |
| Supabase | Datenbank & Auth | qoqndrehdwvzoxzodlyv.supabase.co |
| EmailJS | Kontaktformulare | Service: service_w6wf2rj |
| ElevenLabs | KI-Chatbot-Widget | Agent: agent_3701kkc8xr4be70a3v4mfmzptpqs |
| Google Analytics | Tracking | G-VSN76YW5SC |
| Cloudflare | DNS, CDN, DDoS-Schutz | Fr.steinfurt@gmail.com |

---

## 2. Tech Stack

### Frontend
| Technologie | Version | Zweck |
|-------------|---------|-------|
| React | 18.2.0 | UI-Framework |
| Vite | 4.4.5 | Build-Tool & Dev-Server |
| React Router | 6.16.0 | Client-Side Routing |
| Tailwind CSS | 3.3.3 | Utility-First CSS |
| Framer Motion | 10.16.4 | Animationen |
| Radix UI | diverse | Barrierefreie UI-Komponenten |
| Lucide React | 0.285.0 | Icon-Bibliothek |
| Recharts | 2.12.0 | Diagramme |
| React Helmet | 6.1.0 | SEO Meta-Tags |

### Backend & Daten
| Technologie | Zweck |
|-------------|-------|
| Supabase | PostgreSQL-Datenbank, Auth, Realtime |
| EmailJS | E-Mail-Versand (Client-Side) |
| Hetzner VPS | App-Server (Docker, Traefik, n8n) |

---

## 3. Projekt-Struktur

```
website-b2b-src/
├── public/                     # Statische Assets
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt
├── src/
│   ├── App.jsx                 # Haupt-Routing
│   ├── main.jsx                # React Entry Point
│   ├── index.css               # Globale Styles + Tailwind
│   ├── components/
│   │   ├── Header.jsx          # Navigation
│   │   ├── Layout.jsx          # Haupt-Layout (Header + Footer)
│   │   ├── SEOHead.jsx         # SEO-Komponente
│   │   ├── ui/                 # Basis-UI-Komponenten (Radix)
│   │   │   ├── accordion.jsx
│   │   │   ├── button.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   ├── slider.jsx
│   │   │   ├── toast.jsx
│   │   │   └── ...
│   │   └── sections/           # Seiten-Sektionen
│   │       ├── ambulant/       # Ambulante Versicherung
│   │       ├── veterinary/     # Tierkrankenversicherung
│   │       ├── partner/        # Partner-Seite
│   │       ├── Hero.jsx
│   │       ├── Footer.jsx
│   │       ├── Contact.jsx
│   │       └── ...
│   ├── pages/                  # Seiten-Komponenten
│   │   ├── MainHomePage.jsx
│   │   ├── AmbulantPage.jsx
│   │   ├── ZahnPage.jsx
│   │   ├── StationaerPage.jsx
│   │   ├── KontaktPage.jsx
│   │   ├── PartnerPage.jsx
│   │   └── ... (20 Seiten)
│   ├── config/                 # Konfiguration
│   │   └── emailjs.js
│   ├── contexts/               # React Contexts
│   │   └── SupabaseAuthContext.jsx
│   ├── services/               # API-Services
│   │   └── emailjsService.js
│   ├── hooks/                  # Custom Hooks
│   └── lib/                    # Utilities
│       ├── utils.js            # cn() Helper etc.
│       └── customSupabaseClient.js
├── plugins/                    # Custom Vite Plugins
├── tools/                      # Build-Skripte
├── vite.config.js
├── tailwind.config.js
├── vercel.json
├── package.json
└── index.html
```

---

## 4. Routing

### Haupt-Routen (SPA mit React Router)

| Pfad | Seite | Beschreibung |
|------|-------|-------------|
| `/` | MainHomePage | Startseite (bAV/bKV) |
| `/about` | AboutPage | Ueber Healio |
| `/leistungen` | LeistungenPage | Leistungsuebersicht |
| `/ambulant` | AmbulantPage | Ambulante Zusatzversicherung |
| `/zahn` | ZahnPage | Zahnzusatzversicherung |
| `/healio-zahnzusatz` | HealioZahnzusatzPage | Healio Zahnzusatz |
| `/stationaer` | StationaerPage | Stationaere Versicherung |
| `/klinik-upgrade` | KlinikUpgradePage | Klinik Upgrade |
| `/partner` | PartnerPage | Partner-Informationen |
| `/kontakt` | KontaktPage | Kontaktformular |
| `/terminvereinbarung` | TerminvereinbarungPage | Terminbuchung |
| `/potenzialanalyse` | PotenzialanalysePage | Lead-Formular |
| `/confirmation` | ConfirmationPage | Bestaetigung |
| `/tierkrankenversicherung` | VeterinaryHomePage | Tier-Versicherung |
| `/impressum` | ImpressumPage | Impressum |
| `/agb` | AgbPage | AGB |
| `/datenschutz` | DatenschutzPage | Datenschutz |

**SPA-Routing:** Vercel leitet alle Requests auf `/index.html` um (vercel.json rewrite).
**Code-Splitting:** Alle Seiten werden per `React.lazy()` geladen.

---

## 5. Design-System

### Farben (Tailwind Custom Theme)
```
healio-primary:      #25c990  (Haupt-Gruen/Teal)
healio-primary-dark: #076046  (Dunkelgruen)
healio-slate:        #464f5d  (Dunkel-Slate)
healio-gray:         #bec7c9  (Hellgrau)
healio-mint:         #effdf4  (Helles Mint)
healio-text:         #464f5d  (Standard-Textfarbe)
healio-text-muted:   #94a3b8  (Gedaempfter Text)
healio-text-light:   #64748B  (Heller Text)
```

### Schriftart
- **Font:** Inter (Google Fonts)
- **Gewichte:** 300, 400, 500, 600, 700, 800

### CSS-Klassen
```css
.healio-section        /* Standard-Sektion: py-20 px-4 sm:px-6 lg:px-8 */
.healio-container      /* Container: max-w-7xl mx-auto */
.healio-btn-primary    /* Primaer-Button (Teal) */
.healio-btn-secondary  /* Sekundaer-Button (Outline) */
.healio-gradient-text  /* Gradient-Text-Effekt */
```

---

## 6. Build & Deployment

### Entwicklung
```bash
cd website-b2b-src
npm install
npm run dev          # Startet Vite Dev-Server auf Port 3000
```

### Produktion
```bash
npm run build        # Erstellt optimierten Build in /dist
npm run preview      # Lokale Vorschau des Builds
```

### Vercel Deployment
1. Code wird auf GitHub gepusht (Branch: main)
2. Vercel erkennt Push und startet automatischen Build
3. Vite Build erstellt optimierte Assets
4. Vercel deployt die statischen Dateien
5. SPA-Rewrite leitet alle Routen auf index.html

### Vercel Konfiguration (vercel.json)
```json
{
  "rewrites": [
    {
      "source": "/((?!assets|favicon|og-image|sitemap|robots).*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 7. Hetzner Server (162.55.104.119)

### Subdomains auf Hetzner
| Subdomain | Dienst |
|-----------|--------|
| app.healio.de | Healio Web-App (Supabase Frontend) |
| n8n.healio.de | n8n Workflow-Automatisierung |
| status.healio.de | Status-Monitoring |

### Server-Stack
- Docker + Docker Compose
- Traefik (Reverse Proxy + SSL)
- n8n (Workflow-Automatisierung)

---

## 8. SEO & Analytics

### SEO-Implementierung
- React Helmet fuer dynamische Meta-Tags
- Strukturierte Daten (JSON-LD Schema)
  - Organization
  - FinancialService
  - FAQ
  - Breadcrumb
  - AggregateRating
- Sitemap.xml
- Robots.txt
- Canonical URLs

### Google Analytics
- Tracking-ID: `G-VSN76YW5SC`
- Implementierung via gtag.js in index.html

---

## 9. Formular-Integration

### EmailJS
```
Service-ID:  service_w6wf2rj
Template-ID: template_47m8i9i
Public-Key:  wdni5dzYPqYt--TfW
Empfaenger:  info@healio.de
```

### Formular-Flow
1. Nutzer fuellt Formular aus (Kontakt, Potenzialanalyse, etc.)
2. EmailJS sendet E-Mail an info@healio.de
3. Nutzer wird auf /confirmation weitergeleitet

---

## 10. Produkt-Architektur

Healio bietet verschiedene Versicherungsprodukte:

| Produkt | Route | Beschreibung |
|---------|-------|-------------|
| bAV | / (Startseite) | Betriebliche Altersvorsorge |
| bKV | / (Startseite) | Betriebliche Krankenversicherung |
| Ambulant | /ambulant | Ambulante Zusatzversicherung + IKK Bonus |
| Zahn | /zahn, /healio-zahnzusatz | Zahnzusatzversicherung |
| Stationaer | /stationaer, /klinik-upgrade | Stationaere Zusatzversicherung |
| Tier | /tierkrankenversicherung | Tierkrankenversicherung |

### Ambulant-Konzept (Kernprodukt B2C)
- Ambulante Zusatzversicherung (Hallesche)
- IKK classic Bonusprogramm (bis 550 EUR/Jahr)
- Bonus kann Versicherungsbeitrag vollstaendig ausgleichen
- Tarife: Ambulant 50, Ambulant 80, Ambulant 100

---

## 11. Wichtige Konfigurationsdateien

| Datei | Zweck |
|-------|-------|
| `vite.config.js` | Build-Konfiguration, Plugins, Aliase |
| `tailwind.config.js` | Design-System, Farben, Fonts |
| `vercel.json` | Deployment-Rewrites |
| `package.json` | Dependencies, Scripts |
| `postcss.config.js` | PostCSS Pipeline |
| `jsconfig.json` | Path-Aliase (@/ → ./src/) |
| `index.html` | HTML-Template, Analytics, Chatbot |

---

## 12. Zugangsdaten-Referenz

| Dienst | Zugang |
|--------|--------|
| GitHub | github.com/Healio213/healio-website |
| Vercel | Via GitHub-Account |
| Cloudflare | Fr.steinfurt@gmail.com |
| Hostinger | hpanel.hostinger.com (Domain-Transfer laeuft) |
| Hetzner | 162.55.104.119 (SSH) |
| Supabase | qoqndrehdwvzoxzodlyv.supabase.co |
| Google Analytics | G-VSN76YW5SC |

---

## 13. Offene TODOs / Naechste Schritte

- [ ] Domain-Transfer: Cloudflare Nameserver-Aktivierung abwarten, dann Registrar-Transfer starten (Auth-Code: kpwjuc34XeRl43Ky)
- [ ] A-Records fuer @ und www auf Vercel umstellen (76.76.21.21 oder CNAME cname.vercel-dns.com)
- [ ] Hostinger kuendigen nach erfolgreichem Transfer
- [ ] Rollen-Split implementieren (Praxis vs. Empfehler) - siehe Plan sorted-pondering-origami.md
- [ ] ftp-DNS-Record bei Cloudflare loeschen (nicht benoetigt)
