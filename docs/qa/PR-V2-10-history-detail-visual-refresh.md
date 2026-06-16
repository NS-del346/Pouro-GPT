# PR-V2-10: History Detail Visual Refresh QA

## 1. Purpose

Verify that History Detail now reads as a clear saved brew record for inspection
and rebrew while preserving saved data, storage, export, History List, Rebrew,
recipe, and timer behavior.

## 2. Changed files

- `src/pages/HistoryDetailPage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-V2-10-history-detail-visual-refresh.md`

## 3. Implementation summary

- restructured History Detail into explicit saved-record sections:
  saved brew header, condition snapshot, setup memo, result / feedback,
  next-cup memo, source / verification note, POINT / TIPS, and Rebrew
- kept all displayed values sourced from the existing `BrewSession`,
  `BrewSetup`, `BrewResult`, method snapshot, and existing status helpers
- replaced raw-data-list presentation with compact, mobile-first record panels
- kept Rebrew as a labeled CTA and moved it into a dedicated action section
- added cautious empty states: `未記録` and `メモなし`
- added History Detail-specific CSS only; History List was not redesigned again

## 4. Out-of-scope confirmation

Not changed or added:

- Rebrew logic or route/data flow
- saved session schema, `BrewSetup`, `BrewSession`, or localStorage key
- CSV export, JSON backup export, Settings/Data behavior
- History List card design or navigation behavior
- Brew Finish, Brew Timer, Recipe Setup, Click Converter, or recipe data
- method schedules, timer calculations, step progression, 4:6 mapping,
  10 Pour constraints, or `1:45 / 210g`
- PWA manifest, service worker, base path, release metadata, or package files
- edit/delete actions, filters, search, sort, charts, AI summaries, or generated
  recommendations
- Stitch ZIP, screenshots, generated HTML/CSS/JS, or generated assets

## 5. History Detail content behavior

Result: `PASS`

- saved brew identity displays method and variant
- saved date/time displays in the hero and summary grid
- condition snapshot displays coffee, water, ratio, and actual finish time
- setup memos display water-temperature memo, grind memo, and free memo
- result section displays rating, finish time, taste tags, taste impression, and
  free memo
- next-cup memo is separated into its own section
- source / verification status displays via the existing status helper and
  existing caution copy
- POINT / TIPS remain capped to the existing two-item History Detail selection
- no raw source URLs, transcripts, timecodes, or source notes were exposed
- no missing values were invented

## 6. Rebrew behavior

Result: `PASS`

- Rebrew remains a visible labeled button, not icon-only
- Rebrew still calls the existing `onReplayBrew` flow with the saved setup
  snapshot and refreshed `createdAt`
- Rebrew navigates to `/setup/four-six` in the verified flow
- Rebrew did not start Timer directly
- Rebrew did not create or mutate a history record; `brewHistory` count remained
  `2`

## 7. Missing-value behavior

Result: `PASS`

- absent taste tags display `味の印象タグは未記録です。`
- absent taste impression displays `未記録`
- absent rating displays `未記録`
- absent setup/result memos display `メモなし`
- absent elapsed finish time would display `未記録`; saved QA records had
  `00:00` because they were completed quickly through automation

## 8. Storage and export schema check

Result: `PASS`

- no `src/types/`, `src/repositories/`, `src/pages/SettingsPage.tsx`, export, or
  storage code changed
- disposable browser QA verified saved records retained the existing top-level
  `BrewSession` keys:
  `cancelled`, `completed`, `currentStepIndex`, `elapsedMsAtFinish`,
  `finishedAtIso`, `id`, `methodId`, `methodSnapshot`, `pausedAtMs`, `result`,
  `setupSnapshot`, `startedAtIso`, `startedAtMs`, `timerStatus`,
  `totalPausedMs`
- saved 4:6 `BrewSetup` keys remained:
  `coffeeGrams`, `createdAt`, `freeMemo`, `grindMemo`, `methodId`, `ratio`,
  `variantId`, `waterGrams`, `waterTempMemo`
- `BrewResult` keys remained:
  `createdAt`, `freeMemo`, `nextAdjustmentMemo`, `rating`, `tasteImpression`,
  `tasteNotes`, `updatedAt`
- raw CSV/JSON export downloads were not re-run because export code was
  unchanged

## 9. Mobile QA

Production preview:

```text
http://127.0.0.1:4180/Pouro-GPT/
```

QA used an isolated Microsoft Edge / Playwright browser context with disposable
storage. Physical iPhone and PWA install/offline QA were not run.

### 375 x 667

Result: `PASS`

- document client width: `375px`
- document scroll width: `375px`
- body scroll width: `375px`
- no horizontal overflow
- History Detail sections measured `351px` wide
- saved brew header readable
- condition snapshot readable
- setup memo section readable
- feedback section readable and showed `4/5`, `甘い`, `バランス`
- next memo section readable and showed the recorded next memo
- Rebrew CTA reachable at scroll end
- bottom tabs top: `594px`; Rebrew CTA bottom: `544px`; clearance: `50px`
- card tap from History List opened History Detail at this width

### 390 x 844

Result: `PASS`

- document client width: `390px`
- document scroll width: `390px`
- body scroll width: `390px`
- no horizontal overflow
- History Detail sections measured `366px` wide
- saved brew header, condition snapshot, setup memos, feedback, next memo,
  source note, POINT / TIPS, and Rebrew sections rendered safely
- Rebrew CTA reachable at scroll end
- bottom tabs top: `771px`; Rebrew CTA bottom: `721px`; clearance: `50px`

## 10. Flow QA

### Finish -> Save -> History Detail

Result: `PASS`

- completed a 4:6 brew through Setup -> Timer -> Finish in disposable storage
- entered setup memos
- selected taste tags `甘い` and `バランス`
- selected rating `4/5`
- entered taste impression, result free memo, and next-adjustment memo
- Save wrote one `brewHistory` item
- Save navigated to `/history/:sessionId`
- History Detail displayed the saved setup and feedback values

### Minimal/no-feedback saved brew

Result: `PASS`

- completed and saved a second 4:6 brew without feedback entries
- History Detail rendered missing values with cautious empty states
- `brewHistory` count became `2`

### History List card -> History Detail

Result: `PASS`

- clicking a History card opened the matching `/history/:sessionId` detail route
- verified in the main flow and at `375 x 667`

### History Detail -> Rebrew

Result: `PASS`

- clicking `同じ条件で再抽出` opened `/setup/four-six`
- Timer did not start directly
- `brewHistory` count stayed `2`

### Discard exclusion

Result: `PASS`

- completed another brew and used discard on Brew Finish
- navigation returned to Brew Home
- `brewHistory` count remained `2`
- discarded brew did not appear in History

## 11. Source, legal, and Stitch guardrails

Result: `PASS`

- no source/provenance fields or semantics were changed
- no official approval, supervision, certification, partnership, endorsement,
  guaranteed accuracy, guaranteed result, guaranteed improvement, or AI
  diagnosis language was added
- source URLs, transcripts, timecodes, and raw source notes were not exposed
- Stitch ZIP was not downloaded or committed
- no generated Stitch HTML, CSS, JS, screenshots, or assets were copied or
  committed

## 12. Commands and checks

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 73 modules transformed. |
| `npm.cmd run lint` | NOT RUN | lint script is not available in `package.json`; no lint script added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS | Run after implementation; changed-file scope recorded in this QA doc. |
| `git diff --stat` | PASS | Run after implementation; diff stayed in History Detail, CSS, and QA doc. |
| Browser QA | PASS_WITH_NOTES | Local Edge/Playwright preview QA completed; physical iPhone/PWA install QA not run. |

## 13. Known limitations

- Physical iPhone QA was not run.
- PWA install/offline behavior was not re-run because no PWA files or behavior
  changed.
- CSV/JSON export files were not downloaded because export code was unchanged.
- Independent verification is still required before merge.

## 14. Judgment

`PASS_WITH_NOTES`

Safe for independent verification: YES

Safe to merge after external verification: YES
