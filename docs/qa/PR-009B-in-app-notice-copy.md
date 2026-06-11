# PR-009B: In-app Notice / Privacy Copy Alignment QA

## 1. Purpose

Align the in-app About, Sources, Legal, and Privacy copy with the public
release wording introduced by PR-009A.

## 2. Files Changed

- `src/pages/AboutPage.tsx`
- `src/pages/SourcesPage.tsx`
- `src/pages/LegalPage.tsx`
- `src/pages/PrivacyPage.tsx`
- `docs/qa/PR-009B-in-app-notice-copy.md`

## 3. Verification

| Check | Result |
| --- | --- |
| `npm.cmd run build` | Pass. TypeScript and Vite production build completed successfully. |
| `git diff --check` | Pass. No whitespace errors reported. |
| Copy/content alignment check | Pass. Changes are limited to in-app informational copy and this QA note. |
| `dist` check | Pass. No `dist` files are included in the diff. |

## 4. Scope Confirmation

This PR aligns in-app copy and content with the public README, NOTICE, and
PRIVACY wording from PR-009A.

It does not change app behavior, data, routing, storage keys or schema, method
data, recipe values, timer logic, active brew state, Service Worker, manifest,
icons, PWA assets, GitHub Pages workflow, Bottom Tabs, layout components, or
the styling system.

## 5. Manual QA Checklist

- [x] Settings page opens.
- [x] About page opens.
- [x] Sources page opens and retains the current method metadata list.
- [x] Legal page opens.
- [x] Privacy page opens.
- [x] Back links return to Settings.
- [x] Bottom Tabs behavior is unchanged.
- [x] The `375x667` layout has no obvious horizontal overflow from copy changes.
