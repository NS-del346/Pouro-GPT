# PR-V2-04: App Shell, Navigation, and Visual Tokens QA

## 1. Purpose

Verify the smallest safe Ver2.0 runtime foundation for the app shell, four-tab
bottom navigation, and Light Precision Cockpit visual tokens while preserving
existing Ver1.0 flows.

## 2. Scope

Implemented:

- app-level Light Precision Cockpit tokens with limited amber accent use
- a separate contrast-safe amber text token
- four-tab bottom navigation: `抽出 / ツール / 履歴 / 設定`
- a clearly marked planning-only Tools placeholder
- light shell surface alignment and subtle borders
- dark `Active Brew Focus Surface` limited to Brew Timer
- visible keyboard focus treatment
- small-screen overflow and bottom-navigation safety

Explicitly out of scope:

- Brew Timer information hierarchy redesign
- 4:6 9-combination setup redesign
- functional Click Converter
- Brew Result, History, History Detail, or Settings redesign
- recipe data, method schedules, timer calculations, or step progression
- localStorage key or schema changes
- PWA manifest, service worker, GitHub Pages base path, or release metadata
- generated Stitch code or assets
- dark theme or theme-switcher implementation
- account, cloud, AI, SNS, marketplace, Bluetooth, AR, TDS, or water tracking

## 3. Source of truth

Reviewed:

- `docs/v2/VISUAL_SYSTEM_SCREEN_SPEC.md`
- `docs/v2/STITCH_REFERENCE.md`
- `docs/v2/VISUAL_DIRECTION.md`
- `docs/v2/INFORMATION_ARCHITECTURE.md`
- `docs/v2/PR_ROADMAP.md`
- `docs/qa/PR-V2-03-visual-system-screen-spec.md`

The external Stitch ZIP remained a visual reference only. Generated HTML, CSS,
JavaScript, screenshots, ZIP contents, and generated assets were not copied or
committed.

## 4. Changed files

- `src/App.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/navigation/BottomTabs.tsx`
- `src/pages/ToolsPage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-V2-04-app-shell-navigation-visual-tokens.md`

## 5. Implementation notes

- Existing Brew, Setup, Timer, Finish, History, History Detail, Rebrew, and
  Settings routes remain in place.
- The Tools route is planning-only and explicitly states that it does not
  provide conversion results.
- Timer keeps bottom tabs hidden and uses the existing darker focused surface.
- Light-shell fixed dark surfaces were translated to role tokens where needed
  to prevent text-contrast regressions.
- Amber `#FFB000` remains the signal/surface accent; darker amber text is used
  on light surfaces to retain readable contrast.

## 6. Mobile and manual QA

Production preview:

```text
http://127.0.0.1:4175/Pouro-GPT/
```

### 375 x 667

Result: `PASS`

- no document-level horizontal overflow on Brew, Tools, Setup, Timer, Finish,
  History, History Detail, or Settings
- all four bottom-navigation labels are visible
- bottom navigation does not cover the Brew Home primary CTA
- Tools placeholder is readable and navigation-safe
- Recipe Setup remains scrollable; its existing variation strip uses contained
  horizontal scrolling without causing document overflow
- Timer bottom tabs remain hidden
- Timer controls remain reachable and measure 64px high
- Start, Pause, Resume, Next, and Finish behavior remains functional
- Finish save navigates to History Detail
- History Detail Rebrew returns to Recipe Setup, not directly to Timer
- Settings retains CSV export, JSON backup, delete-history, and legal/source
  links

### 390 x 844

Result: `PASS`

- no document-level horizontal overflow on Brew, Tools, History, Settings,
  Setup, or Timer
- Brew Home primary CTA remains above the bottom navigation
- Timer bottom tabs remain hidden and all controls remain reachable

### Accessibility and contrast

Result: `PASS`

- visible text labels remain present for every bottom-navigation item
- global `:focus-visible` treatment is present
- production-preview contrast scan found no visible enabled text below a 3:1
  contrast ratio on Brew, Tools, Timer, History, History Detail, or Settings
- destructive Settings action remains visibly labeled

## 7. Guardrail checks

| Check | Result | Notes |
| --- | --- | --- |
| Existing Ver1.0 flows accessible | PASS | Setup, Timer, Finish, History, History Detail, Rebrew, and Settings were exercised. |
| Source/provenance semantics preserved | PASS | No source/provenance fields, data, or display logic changed. |
| Non-official/legal posture preserved | PASS | No legal or source copy changed. |
| Recipe and method truth unchanged | PASS | No recipe, method, or POINT/TIPS files changed. |
| Timer runtime unchanged | PASS | No timer component, schedule, calculation, or progression code changed. |
| localStorage schema unchanged | PASS | No repository, type, key, or schema files changed. |
| PWA behavior/config unchanged | PASS | No manifest, service worker, base-path, public, or Vite config files changed. |
| Stitch generated asset/code exclusion | PASS | No ZIP, image, generated HTML/CSS/JS, or generated assets added. |

## 8. Command results

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 72 modules transformed. |
| `npm.cmd run lint` | NOT RUN | lint script not available in `package.json`; no lint script added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS | Changes remain limited to the bounded implementation and this QA document. |
| `git diff --stat` | PASS | Reviewed for bounded scope. |

## 9. Known limitations

- `ツール` is intentionally a planning-only placeholder; Click Converter is
  not implemented.
- QA used a local production preview, not a physical iPhone.
- PWA install/offline behavior was not re-run because no PWA files or behavior
  changed.
- CSV/JSON export controls and availability were verified, but downloads were
  not triggered during this shell-focused QA.

## 10. Judgment

`PASS_WITH_NOTES`

The notes are non-blocking and reflect intentional scope boundaries or
environment limitations. Safe for independent verification: YES. Safe to merge
after external verification: YES.
