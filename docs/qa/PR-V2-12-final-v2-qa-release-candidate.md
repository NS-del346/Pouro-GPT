# PR-V2-12: Final Ver2.0 QA Release Candidate

## 1. Purpose

Perform the final Ver2.0 release-candidate QA pass after PR-V2-04 through
PR-V2-11, covering the app shell, major screens, navigation, storage, export,
History, Rebrew, Settings/Data, and Click Converter foundation.

This PR is QA-document-only. No runtime app code changed.

## 2. Changed files

Expected changed file:

- `docs/qa/PR-V2-12-final-v2-qa-release-candidate.md`

No app code, package files, PWA files, recipe data, generated assets, or
release metadata changed.

## 3. Release candidate scope

Covered:

- Brew Home
- Recipe Setup
- Brew Timer
- Brew Finish / Brew Result
- Tools / Click Converter
- History List
- History Detail
- Settings / Data
- Four-Six R-01 save flow
- Four-Six legacy R-02 preservation flow
- Discard flow
- History Detail Rebrew flow
- Settings CSV/JSON export flow
- 10 Pour / THE NEO BREW fixed-constraint spot check
- GitHub Pages base path `/Pouro-GPT/` on local production preview

Browser target:

- `http://127.0.0.1:42812/Pouro-GPT/`

## 4. Out-of-scope confirmation

Confirmed not added:

- new UI features, screens, recipes, grinder data, Click Converter output,
  JSON import/restore, custom recipe editor, history edit/delete,
  filter/search/sort, analytics/charts, AI diagnosis, account/cloud/sync,
  SNS/community, Bluetooth scale, AR, TDS/water tracking, theme switching, or
  dark-theme work

Confirmed not changed:

- recipe data, method definitions, timer schedules, 4:6 mapping, 10 Pour
  constraints, `1:45 / 210g`, saved session schema, `localStorage` keys, CSV
  export format, JSON backup format, PWA manifest, service worker, package
  files, and release metadata

## 5. Build / command results

| Command | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 73 modules transformed. |
| `npm.cmd run lint` | NOT RUN | No `lint` script exists in `package.json`; no lint script was added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS_WITH_NOTES | Plain working-tree diff was empty because the only change was this new untracked QA doc; `git status --short --branch` listed it. |
| `git diff --stat` | PASS_WITH_NOTES | Plain working-tree stat was empty because the only change was this new untracked QA doc; `git status --short --branch` listed it. |
| `git status --short --branch` | PASS | Branch: `codex/pr-v2-12-final-v2-qa-release-candidate`; only untracked file was this QA doc. |

## 6. Viewport QA

QA used in-app Browser for visible app checks and headless Microsoft Edge for
repeatable storage/download verification.

### 375 x 667

Result: `PASS`

| Screen | clientWidth | documentScrollWidth | bodyScrollWidth | Horizontal overflow | Bottom nav |
| --- | ---: | ---: | ---: | --- | --- |
| Brew Home | 375 | 375 | 375 | no | top `594`, bottom `667` |
| Recipe Setup | 375 | 375 | 375 | no | top `594`, bottom `667` |
| Brew Timer | 375 | 375 | 375 | no | hidden as intended |
| Brew Finish / Result | 375 | 375 | 375 | no | hidden as intended |
| Tools / Click Converter | 375 | 375 | 375 | no | top `594`, bottom `667` |
| History List | 375 | 375 | 375 | no | top `594`, bottom `667` |
| History Detail | 375 | 375 | 375 | no | top `594`, bottom `667` |
| Settings / Data | 375 | 375 | 375 | no | top `594`, bottom `667` |

Reachability checks:

- Brew Home primary CTA bottom `571`; bottom-nav top `594`; clearance `23px`.
- Recipe Setup start CTA at max scroll: bottom `539`; bottom-nav top `594`;
  clearance `55px`.
- History Detail Rebrew at max scroll: bottom `544`; bottom-nav top `594`;
  clearance `50px`.
- Settings CSV, JSON, and delete-history controls were center-scrolled with
  `237px+` clearance above bottom navigation.
- Timer controls were visible at the bottom of the Timer screen; Timer bottom
  tabs were hidden as intended.

### 390 x 844

Result: `PASS`

| Screen | clientWidth | documentScrollWidth | bodyScrollWidth | Horizontal overflow | Bottom nav |
| --- | ---: | ---: | ---: | --- | --- |
| Brew Home | 390 | 390 | 390 | no | top `771`, bottom `844` |
| Recipe Setup | 390 | 390 | 390 | no | top `771`, bottom `844` |
| Brew Timer | 390 | 390 | 390 | no | hidden as intended |
| Brew Finish / Result | 390 | 390 | 390 | no | hidden as intended |
| Tools / Click Converter | 390 | 390 | 390 | no | top `771`, bottom `844` |
| History List | 390 | 390 | 390 | no | top `771`, bottom `844` |
| History Detail | 390 | 390 | 390 | no | top `771`, bottom `844` |
| Settings / Data | 390 | 390 | 390 | no | top `771`, bottom `844` |

Timer controls were visible; measured control bottom `820` within the `844px`
viewport.

### 430 x 932

Result: `PASS`

| Screen | clientWidth | documentScrollWidth | bodyScrollWidth | Horizontal overflow | Bottom nav |
| --- | ---: | ---: | ---: | --- | --- |
| Brew Home | 430 | 430 | 430 | no | top `859`, bottom `932` |
| Recipe Setup | 430 | 430 | 430 | no | top `859`, bottom `932` |
| Brew Timer | 430 | 430 | 430 | no | hidden as intended |
| Brew Finish / Result | 430 | 430 | 430 | no | hidden as intended |
| Tools / Click Converter | 430 | 430 | 430 | no | top `859`, bottom `932` |
| History List | 430 | 430 | 430 | no | top `859`, bottom `932` |
| History Detail | 430 | 430 | 430 | no | top `859`, bottom `932` |
| Settings / Data | 430 | 430 | 430 | no | top `859`, bottom `932` |

Timer controls were visible; measured control bottom `908` within the `932px`
viewport.

## 7. Screen-by-screen QA

Result: `PASS`

| Screen | Result | Notes |
| --- | --- | --- |
| Brew Home | PASS | Opens at `/Pouro-GPT/`; Japanese-first labels render; method cards and setup CTA visible; no overflow. |
| Recipe Setup | PASS | Opens at `/Pouro-GPT/setup/four-six`; 4:6 matrix and legacy variant selector render; start CTA reachable by scroll. |
| Brew Timer | PASS | Opens through setup flow; time-first hierarchy shows Target Total before This Pour; bottom tabs hidden. |
| Brew Finish / Result | PASS | Opens from Timer completion; feedback controls and save/discard actions render; bottom tabs hidden. |
| Tools / Click Converter | PASS | Opens from `/tools`; disabled foundation visible; no real conversion result. |
| History List | PASS | Opens from `/history`; saved cards route to `/history/:sessionId`; no overflow. |
| History Detail | PASS | Shows saved setup/result, source state, POINT/TIPS, and Rebrew CTA; no overflow. |
| Settings / Data | PASS | Shows saved-data status, CSV/JSON actions, no-restore caution, source/legal copy, danger zone, and existing settings. |

No replacement-character rendering was detected in the browser text checks.

## 8. Flow QA

### 8.1 Four-Six Basic Brew Flow

Result: `PASS`

Flow:

`Brew Home -> 4:6 -> Recipe Setup -> Brew Timer -> Brew Finish -> Save -> History Detail`

Evidence:

- 4:6 matrix contained `9` cells: `1` enabled/selected R-01 center cell and
  `8` disabled cells.
- Timer preserved the time-first hierarchy; `Target Total` appeared before
  `This Pour`.
- Finish screen accepted feedback: one taste note and rating `4`.
- Save changed history count from `0` to `1`.
- Saved record opened at `/Pouro-GPT/history/:sessionId`.
- Saved setup was `methodId: four-six`, `variantId: R-01`, `20g`, `300g`,
  `1:15`.

### 8.2 Legacy Variant Preservation

Result: `PASS`

Verified R-02 via the legacy selector:

- R-02 label selected as `甘み重視`.
- Matrix selected-cell count became `0`, so R-02 did not falsely select a
  3x3 matrix cell.
- Timer started and Finish/save completed.
- History count became `2`.
- History Detail preserved the R-02 setup.
- Rebrew returned to `/Pouro-GPT/setup/four-six`, not Timer.
- Rebrew preserved `甘み重視` and did not create or mutate history; count
  remained `2`.

### 8.3 Discard Flow

Result: `PASS`

Flow:

`Setup -> Timer -> Finish -> Discard`

Evidence:

- History count before discard: `2`.
- Discard returned to `/Pouro-GPT/`.
- History count after discard: `2`.

### 8.4 History Flow

Result: `PASS`

Flow:

`History tab -> History card -> History Detail -> Rebrew`

Evidence:

- History List showed `2` saved cards.
- First card opened `/history/:sessionId`.
- History Detail showed saved setup/result content.
- Rebrew returned to `/Pouro-GPT/setup/four-six`.
- Rebrew did not create a new history record; count remained `2`.

### 8.5 Settings / Data Flow

Result: `PASS`

Evidence:

- Settings opened at `/Pouro-GPT/settings`.
- CSV and JSON buttons were enabled with history present.
- JSON restore was not exposed; `input[type="file"]` count was `0`.
- Danger zone confirmation appeared and was cancelled.
- History remained after visiting Settings and cancelling delete; count stayed
  `2`.

### 8.6 Tools / Click Converter Flow

Result: `PASS`

Evidence:

- Tools opened at `/Pouro-GPT/tools`.
- Click Converter foundation rendered.
- Disabled controls: `2` disabled selects and `1` disabled input.
- Result area stated that real conversion values are not shown in this PR.
- Particle-size and no-guarantee warnings were present.

### 8.7 10 Pour Constraint Spot Check

Result: `PASS`

Evidence:

- THE NEO BREW setup retained `20g / 300g / 1:15`.
- Timer retained THE NEO BREW fixed-example copy.
- Unsupported arbitrary scaling remained explicitly non-supported.
- Step 7 retained `01:45` and `210g`.

## 9. Storage/export QA

Result: `PASS`

Storage:

- `localStorage` key remained `brewHistory`.
- Final disposable test history count was `2`.
- Saved session top-level keys matched the established saved-session shape:
  `cancelled`, `completed`, `currentStepIndex`, `elapsedMsAtFinish`,
  `finishedAtIso`, `id`, `methodId`, `methodSnapshot`, `pausedAtMs`, `result`,
  `setupSnapshot`, `startedAtIso`, `startedAtMs`, `timerStatus`,
  `totalPausedMs`.
- Saved setup keys matched the established setup snapshot shape:
  `coffeeGrams`, `createdAt`, `freeMemo`, `grindMemo`, `methodId`, `ratio`,
  `variantId`, `waterGrams`, `waterTempMemo`.

CSV:

- Download filename: `pouro-brew-history-20260616-134752.csv`.
- Header unchanged:
  `"id","finishedAtIso","methodId","methodName","variantId","coffeeGrams","waterGrams","ratio","elapsedMsAtFinish","rating","tasteNotes","tasteImpression","nextAdjustmentMemo","freeMemo"`
- CSV included saved `four-six` history rows.

JSON:

- Download filename: `pouro-brew-history-backup-20260616-134752.json`.
- `exportType`: `brewHistoryBackup`.
- `schemaVersion`: `1`.
- `brewHistory` payload length: `2`.

## 10. Click Converter foundation QA

Result: `PASS`

- Foundation remains visible under Tools.
- Inputs/selectors remain disabled.
- No real conversion result is shown.
- Approximation / non-particle-size / no-guarantee warnings remain present.
- No Click Converter conversion behavior was introduced.

## 11. Recipe constraint spot checks

Result: `PASS`

- 4:6 R-01 center mapping remains the only enabled 3x3 matrix cell.
- R-02 remains selectable only through the legacy selector and does not map to a
  3x3 cell.
- THE NEO BREW / R-09 remains a fixed example.
- `20g / 300g / 1:15` remains intact where displayed.
- `1:45 / 210g` remains intact in the Timer schedule.
- Arbitrary scaling was not introduced.

## 12. Source/legal guardrail check

Result: `PASS`

Checked for wording that would imply official approval, official app status,
supervision, certification, partnership, endorsement, complete reproduction,
guaranteed accuracy, guaranteed brew result, guaranteed improvement, guaranteed
offline persistence, cloud backup, AI diagnosis, or particle-size equivalence.

The matching source/docs hits were existing negative/guardrail statements, such
as non-official posture, no cloud/account sync, no guaranteed result, no exact
conversion, and no AI diagnosis. No overclaiming copy was found in the verified
runtime screens.

Source/provenance concepts remain intact. This PR does not edit:

- `sourceStatus`
- `verificationLevel`
- `valuesArePlaceholder`
- `isPlaceholder`
- `fieldEvidence`

## 13. Stitch/generated asset exclusion check

Result: `PASS`

No generated visual artifacts were added or changed:

- no `stitch_pour_gpt_precision_brew_cockpit.zip`
- no `screen.png`
- no contact sheet
- no generated HTML/CSS/JS
- no generated React code
- no generated image assets

The PR diff is expected to contain only this QA document.

## 14. Known limitations

- Physical iPhone QA was not run.
- PWA install/offline QA was not run.
- The local QA used production preview and headless Microsoft Edge, not public
  GitHub Pages after this PR branch.
- The in-app Browser blocked direct `localStorage` reads, so storage/export
  inspection was performed in headless Microsoft Edge instead.
- Some headless Playwright text/class locators were unreliable in this Windows
  shell encoding path; the successful storage/export run used DOM-click helpers
  against the live preview and verified outcomes through URL, DOM, downloads,
  and `localStorage`.

## 15. Release candidate judgment

`PASS_WITH_NOTES`

No blocking defect was found. The Ver2.0 release candidate is safe for
independent verification as a QA-document-only PR.

It should remain Draft until an independent verifier reviews the PR diff and QA
document. It is safe to mark Ready and merge after external verification if the
independent verifier agrees with this evidence.
