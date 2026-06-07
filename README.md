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

## PR-002 Types and Placeholder Data

PR-002 adds the domain model and placeholder method data used by later UI work:

- `SourceStatus` and `VerificationLevel` for source and verification state
- Brew domain types for methods, recipes, steps, setup, sessions, settings, and taste notes
- Four placeholder methods: `4:6 Method`, `Hybrid Method`, `10 Pour Method`, and `Ice Brew`
- Review labels such as `レシピ確認中`, `出典確認中`, `参考表示`, and `未確定`
- Formatting helpers that can render unknown pour values as `Pour --g` and `Total --g`

The placeholder methods are not confirmed recipes. Their recipe values, pour amounts, timings, and step text are intentionally nullable or marked as placeholder data until source review is complete.

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
