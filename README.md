# Pouro-GPT

Pourō is a quiet pour-over coffee brew guide and timer PWA.

## PR-001 Project Foundation

This repository currently contains the application foundation:

- Vite + React + TypeScript
- React Router-based page routing
- App Shell and Brew / History / Settings Bottom Tabs
- Empty foundations for the seven MVP screens
- Minimal About / Sources / Legal / Privacy pages
- Shared CSS variables and responsive base styles

Recipe data, timer logic, local storage, PWA files, and finished screen UI are intentionally deferred to later PRs.

## Getting Started

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Routes

- `/` - Brew Home
- `/setup/:methodId` - Recipe Setup
- `/timer` - Brew Timer
- `/finish` - Brew Finish
- `/history` - History
- `/history/:sessionId` - History Detail
- `/settings` - Settings
- `/settings/about` - About
- `/settings/sources` - Sources
- `/settings/legal` - Legal
- `/settings/privacy` - Privacy

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   └── navigation/
├── data/
├── hooks/
├── pages/
├── repositories/
├── styles/
└── types/
```

## Product Constraints

- No login, external API, advertising, analytics, or cloud sync
- Brew Home remains focused on method selection
- Brew Timer does not display Bottom Tabs
- iPhone SE equivalent `375 × 667 CSS px` is the minimum layout baseline
