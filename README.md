# Umzugshelden Kerem Website

<!-- VS Code Preview: Strg+Shift+V (Win/Linux) | Cmd+Shift+V (Mac) -->

Saubere, modulare Landingpage mit lokal gebautem Tailwind CSS und ausgelagerten HTML-Sections.
Die Darstellung bleibt identisch, der Code ist leichter zu pflegen.

## Inhalte

- `index.html` (nur Includes + Grundstruktur)
- `partials/` (Header, Footer, Sections)
- `pages/` (seitenspezifische Sections + Legal)
- `css/tailwind.css` (kompiliertes Tailwind CSS)
- `css/tailwind-input.css` (Quelle fuer Tailwind Build)
- `css/custom.css` (kleine Zusatzstyles)
- `js/main.js` (Interaktionen + Includes)

## Lokale Vorschau

Die Includes werden per `fetch` geladen. Deshalb bitte mit einem lokalen Server
starten (nicht per `file://`).

Optionen:

1. VS Code Extension: Live Server
2. Ein beliebiger lokaler HTTP-Server

## Struktur (Kurzuebersicht)

- `partials/layout/` -> Header, Footer
- `partials/sections/` -> Hero
- `pages/` -> Leistungen, Ablauf, Preise, Bewertungen, Kontakt
- `pages/legal/` -> Impressum, Datenschutz, Cookie-Banner

## Hinweise

- Cookie-Banner blockiert die Seite, bis eine Auswahl getroffen wurde.
- Impressum und Datenschutz sind als Modals umgesetzt.
- Tailwind wird lokal gebaut (kein CDN). Build:
  - Windows (ohne npm.ps1): `node .\\node_modules\\@tailwindcss\\cli\\dist\\index.mjs -i .\\css\\tailwind-input.css -o .\\css\\tailwind.css --minify`
  - Standard: `npm run build:css`
- Bei Aenderungen an `tailwind.config.js` oder Klassen in HTML/JS bitte neu bauen.
- HTTPS-Warnung im Browser kommt von der Domain/Server-Konfiguration, nicht vom Code.
