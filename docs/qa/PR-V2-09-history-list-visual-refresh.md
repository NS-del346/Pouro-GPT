# PR-V2-09: History List Visual Refresh QA

## 1. Purpose

Verify that the History list now reads as a compact brew log dashboard while
preserving saved data, History Detail, Rebrew, export, and storage behavior.

## 2. Changed files

- `src/pages/HistoryPage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-V2-09-history-list-visual-refresh.md`

## 3. Implementation summary

- changed History List cards into full-card links to History Detail
- added a Japanese-first History header and saved-log summary
- added a compact condition snapshot for dose, water or hot water/ice, ratio,
  and finish time from existing session data
- added a feedback summary for rating, taste tags, and next-adjustment memo
- added cautious missing-value states: `未記録` and `メモなし`
- refreshed the empty state with a route back to Brew
- kept visual styling in the existing Light Precision Cockpit direction with
  compact cards, restrained borders, and amber only for status/action accents

## 4. Out-of-scope confirmation

Not changed or added:

- History Detail redesign
- Rebrew logic or route flow
- saved session schema, `BrewSetup`, `BrewSession`, or localStorage key
- CSV export, JSON backup export, Settings/Data behavior
- Brew Finish, Brew Timer, Recipe Setup, Click Converter, or recipe data
- method schedules, timer calculations, step progression, 4:6 mapping,
  10 Pour constraints, or `1:45 / 210g`
- PWA manifest, service worker, base path, release metadata, or package files
- filter, search, sort, charts, edit/delete actions, AI summaries, or generated
  recommendations
- Stitch ZIP, generated screenshots, generated HTML/CSS/JS, or generated assets

## 5. History card content behavior

Result: `PASS`

- each card is a single link to `/history/:sessionId`
- method name and variant label display when available
- saved date/time displays in the card topline
- normal brew condition snapshot displays coffee, water, ratio, and finish time
- ice brew support remains display-only through hot water and ice fields
- rating displays as `n/5` when recorded and `未記録` when absent
- taste tags display only from recorded `result.tasteNotes`
- next-adjustment memo displays when recorded and `メモなし` when absent
- missing finish time displays as `未記録`
- no new values are invented

## 6. Empty state behavior

Result: `PASS`

- empty History shows `まだ履歴がありません`
- empty copy says saved brews will appear here
- existing route back to Brew is exposed through `Brewへ戻る`
- no onboarding flow, filter, search, or new data behavior was introduced

## 7. Storage and export schema check

Result: `PASS`

- no `src/types/`, `src/repositories/`, or `src/pages/SettingsPage.tsx` files
  changed
- no storage key, sanitizer, saved record shape, CSV field list, or JSON backup
  implementation changed
- save/discard QA confirmed `brewHistory` count changed only on save
- raw export downloads were not re-run because export code was unchanged

## 8. Mobile QA

Production preview:

```text
http://127.0.0.1:4180/Pouro-GPT/
```

QA used isolated Microsoft Edge/Playwright browser contexts with disposable
storage. Physical iPhone and PWA install/offline QA were not run.

### 375 x 667

Result: `PASS`

- document client width: `375px`
- document scroll width: `375px`
- body scroll width: `375px`
- no horizontal overflow
- two seeded History cards measured `351px` wide
- saved-log summary displayed saved count, latest record time, and feedback
  count
- feedback card displayed `4/5`, `甘い`, `バランス`, and next memo
- minimal card displayed `未記録` and `メモなし`
- card tap target opened History Detail
- History Detail Rebrew returned to `/setup/four-six`
- bottom tabs were present and left `35px` clearance below the last card at
  scroll end

### 390 x 844

Result: `PASS`

- document client width: `390px`
- document scroll width: `390px`
- body scroll width: `390px`
- no horizontal overflow
- two seeded History cards measured `366px` wide
- saved-log summary displayed saved count, latest record time, and feedback
  count
- feedback and minimal cards displayed safely
- card tap target opened History Detail
- History Detail Rebrew returned to `/setup/four-six`
- bottom tabs were present and left `35px` clearance below the last card at
  scroll end

## 9. Flow QA

### Finish -> Save -> History Detail

Result: `PASS`

- completed a 4:6 brew through Setup -> Timer -> Finish in a disposable browser
  context
- selected taste tags `甘い` and `バランス`
- selected rating `4/5`
- entered a taste impression, free memo, and next-adjustment memo
- save wrote one `brewHistory` item and opened History Detail
- History Detail showed the same setup and feedback values

### History tab/list

Result: `PASS`

- after the first save, History showed one saved card
- after a second minimal save, History showed two saved cards
- seeded list QA confirmed both feedback-rich and minimal cards render safely

### History card -> History Detail

Result: `PASS`

- clicking the History card opened the matching `/history/:sessionId` detail
  route
- History Detail URL structure was unchanged

### Discard exclusion

Result: `PASS`

- completed another brew and used `保存せずBrewへ戻る`
- navigation returned to Brew
- History still showed two saved cards
- `brewHistory` storage count remained `2`

### Rebrew

Result: `PASS`

- History Detail `同じ条件で再抽出` returned to Recipe Setup
- Rebrew did not start Timer directly
- no Rebrew storage or schema behavior changed

## 10. Source, legal, and Stitch guardrails

Result: `PASS`

- no source/provenance fields or semantics were changed
- no official approval, supervision, partnership, endorsement, guaranteed
  accuracy, guaranteed result, guaranteed improvement, or AI diagnosis language
  was added
- source URLs, transcripts, timecodes, and raw source notes were not exposed in
  compact History cards
- the Stitch ZIP was not committed
- no generated Stitch HTML, CSS, JS, screenshots, or assets were copied or
  committed

## 11. Commands and checks

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 73 modules transformed. |
| `npm.cmd run lint` | NOT RUN | lint script not available in `package.json`; no lint script added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS_WITH_NOTES | Before staging, listed the two tracked app files; `git status --short` also showed this QA doc as untracked. |
| `git diff --stat` | PASS_WITH_NOTES | Before staging, listed tracked app-file diff size; final changed-file scope includes this QA doc. |
| `git status --short --branch` | PASS | Confirmed branch and untracked QA doc before staging. |
| Browser QA | PASS_WITH_NOTES | Local Edge/Playwright preview QA completed; physical iPhone/PWA install QA not run. |

## 12. Known limitations

- Physical iPhone QA was not run.
- PWA install/offline behavior was not re-run because no PWA files or behavior
  changed.
- Raw CSV/JSON export files were not downloaded because export code was
  unchanged.
- The external Stitch ZIP was not downloaded; local V2 visual docs and
  `docs/v2/STITCH_REFERENCE.md` were used, and no Stitch-generated artifact was
  committed.
- Independent verification is still required before merge.

## 13. Judgment

`PASS_WITH_NOTES`

Safe for independent verification: YES

Safe to merge after external verification: YES
