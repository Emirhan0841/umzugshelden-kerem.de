# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dual-stack website for Umzugshelden Kerem (moving company):

- **Root level**: Static HTML landing page with Tailwind CSS and vanilla JS
- **frontend/**: Angular 21 SPA (in progress, currently untracked)

## Directory Structure

### Root Level (Static Website)

```
├── index.html           # Main entry point with section includes
├── partials/            # Reusable layout components
│   ├── layout/          # Header, Footer
│   └── sections/        # Hero, Services, etc.
├── pages/               # Page-specific sections
│   ├── legal/           # Impressum, Datenschutz, Cookie-Banner
│   ├── ablauf.html
│   ├── bewertungen.html
│   ├── kontakt.html
│   ├── leistungen.html
│   └── preise.html
├── css/                 # Tailwind CSS (compiled and source)
│   ├── tailwind.css     # Compiled output (DO NOT EDIT)
│   ├── tailwind-input.css  # Build source
│   └── custom.css       # Additional styles
├── js/                  # Vanilla JavaScript
│   ├── main.js          # Interactions and includes loader
│   └── includes.js      # Include fetcher
└── assets/ & img/       # Static assets
```

### Frontend (Angular App)

```
frontend/
├── src/                 # TypeScript source
│   ├── main.ts          # Bootstrap entry
│   ├── app/             # Application modules
│   │   ├── app.component.ts/html/scss
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.spec.ts  # Unit tests
│   └── styles.scss
├── public/              # Static assets
├── angular.json         # Angular CLI config
├── tsconfig.json        # TypeScript config (strict mode enabled)
└── package.json         # Dependencies (Angular 21, RxJS, Vitest)
```

## Build & Development Commands

### Root Level (HTML/CSS)

**Tailwind CSS Build (one-time)**

```bash
npm run build:css
```

**Tailwind CSS Watch (live rebuild)**

```bash
npm run watch:css
```

Run this during HTML/CSS development. Watches `css/tailwind-input.css` and template files, regenerates `css/tailwind.css` on changes.

**Local Server**
The HTML includes load via `fetch()`, so use a local HTTP server (not `file://`):

- VS Code: Use Live Server extension
- Any HTTP server: `npx serve` or `python -m http.server`

### Frontend (Angular)

**Install dependencies**

```bash
cd frontend
npm install
```

**Development server**

```bash
cd frontend
npm start
# or: ng serve
```

Server runs on `http://localhost:4200/`. Hot reload enabled.

**Run tests**

```bash
cd frontend
npm test
# or: ng test
```

Uses Vitest. Tests in `*.spec.ts` files.

**Build for production**

```bash
cd frontend
npm run build
# or: ng build
```

Output: `frontend/dist/`. Production budgets set to 500kB initial, 1MB max, 4kB component styles.

**Generate new component**

```bash
cd frontend
ng generate component component-name
```

Creates component with SCSS styling by default (configured in angular.json).

## Key Architectural Decisions

### Root Level HTML/CSS

- **Include system**: Uses `fetch()` to load HTML partials. `js/includes.js` handles loading, `js/main.js` calls it.
- **Tailwind CSS**: Compiled locally (not CDN). Must rebuild after HTML/template changes or Tailwind config edits.
- **Cookie Banner**: Blocks page until user chooses; styled as modal.
- **Modals**: Impressum and Datenschutz implemented as modal dialogs.
- **Custom theme**: Defines `ink`, `paper`, `muted`, `line` colors and `soft` shadow in tailwind.config.js.

### Frontend Angular App

- **TypeScript strict mode**: All strict compiler options enabled (`strict: true`, `strictTemplates: true`, etc.)
- **Angular 21**: Latest stable. Uses standalone components (Angular 14+).
- **Styling**: SCSS preprocessor, scoped to components.
- **Testing**: Vitest (modern, fast test runner). Use `ng test` to run.
- **Router**: `app.routes.ts` defines route configuration.

## Important Notes

### HTML Includes

- Includes are loaded at runtime via `fetch()` in the browser.
- Requires local HTTP server; does not work with `file://` URLs.
- Path patterns: `partials/layout/header.html`, `pages/ablauf.html`, etc.
- If includes aren't loading, check browser console for 404 errors.

### Tailwind CSS Rebuilding

- After editing HTML class names or updating `tailwind.config.js`, rebuild CSS:
  ```bash
  npm run build:css
  ```
- Use `npm run watch:css` during development to avoid manual rebuilds.

### Frontend Deployment

- Angular build produces `frontend/dist/` with minified, hashed assets.
- Production budget constraints in angular.json will error if bundles exceed thresholds.
- Check that no breaking changes exist in Angular 21 docs if upgrading.

### Git Workflow

- Main branch is `main`.
- Frontend folder is currently untracked (git status shows `?? frontend/`). Add to .gitignore if not tracking, or commit when ready.
- Recent commits reference HTML changes, email updates, and README updates.

## Development Workflow

**For HTML/CSS updates:**

1. Edit HTML or CSS classes in partials/pages/index.html
2. Run `npm run watch:css` to auto-rebuild Tailwind
3. Open local server (Live Server or `npx serve`)
4. Test changes in browser (refresh if needed)

**For Angular updates:**

1. `cd frontend && npm start`
2. Edit TypeScript/HTML/SCSS in `src/`
3. Changes hot-reload automatically
4. Run `npm test` to verify unit tests pass

**Before committing:**

- Rebuild Tailwind CSS: `npm run build:css`
- Run frontend tests: `cd frontend && npm test`
- Ensure no console errors in browser (both root and Angular dev server)

## Prettier Configuration

Frontend uses Prettier with custom config (printWidth: 100, singleQuote: true). Angular HTML uses `angular` parser.
