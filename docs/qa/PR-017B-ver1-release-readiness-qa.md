# PR-017B: Ver1.0 Release Readiness QA / Regression Checklist

## 1. Purpose

This is a docs-only release-readiness checklist for Pouro-GPT Ver1.0 after
PR-015A through PR-015G, PR-016A through PR-016B, and PR-017A.

It records the current build, browser, mobile, regression, source-safety, PWA,
and local-data readiness state without adding features or changing app
behavior.

## 2. Scope

* docs-only
* no app code change
* no recipe data change
* no runtime behavior change

This PR verifies and documents the current baseline. Any bug found by this
checklist must be fixed in a separate, bounded follow-up PR.

## 3. Changed files

Only:

* `docs/qa/PR-017B-ver1-release-readiness-qa.md`

No app code was changed.

## 4. Current main baseline

Latest known and locally verified `main` merge:

* PR-017A: Add AGENTS.md for Codex workflow guardrails
* merge commit: `302ef62e785cf6da720b22ecb9bbd7e098375fea`
* local `git log -1 --oneline`: `302ef62 PR-017A: Add AGENTS.md for Codex workflow guardrails`
* local `main` versus `origin/main` before branch creation: `0 0` ahead/behind

## 5. Prior PRs covered

* PR-015A: POINT/TIPS Master v2.1 Data Foundation
* PR-015B: POINT/TIPS Recipe Setup UI Integration
* PR-015C: POINT/TIPS Recipe-Specific Prioritization
* PR-015D: POINT/TIPS Timer UI Integration
* PR-015E: POINT/TIPS Finish UI Integration
* PR-015F: POINT/TIPS History Detail UI Integration
* PR-015G: POINT/TIPS UI Final QA / Source Display Audit
* PR-016A: Brew Timer Target Total Priority UI
* PR-016B: Rebrew Shortcut / Last Brew Entry Point
* PR-017A: Add AGENTS.md for Codex workflow guardrails

## 6. Required command checks

| Command | Status | Recorded result |
| --- | --- | --- |
| `git status --short --branch` | PASS | On `codex/pr-017b-ver1-release-readiness-qa`; only the expected QA document is changed before commit. |
| `git diff --check` | PASS | No whitespace errors. |
| `npm.cmd run build` | PASS | Windows equivalent of `npm run build`; TypeScript and Vite production build completed successfully. |

The repository has no `test` or `lint` script. No dependency was added.

## 7. Manual QA checklist

Browser QA used the local production preview at the GitHub Pages base-prefixed
route `/Pouro-GPT/`. A synthetic brew record was created only to exercise save,
History Detail, Rebrew, and Last Brew behavior.

| Check | Status | Observation |
| --- | --- | --- |
| Brew Home loads | PASS | Loaded with method cards, Recipe Setup CTA, and bottom tabs. |
| Recipe Setup loads for each method | PASS | Loaded `four-six`, `hybrid`, `ten-pour`, and `ice-brew`; each exposed an enabled start CTA. |
| Preview / setup-to-timer flow works | PASS | Current confirmation/preview content remains in Recipe Setup; the start CTA opened Brew Timer. There is no standalone Preview route. |
| Brew Timer starts | PASS | Start changed the timer from pre-start to running. |
| Brew Timer pause/resume works | PASS | Paused elapsed time remained `00:10` during the wait; Resume advanced it to `00:11`. |
| Brew Timer next/back works | PASS | Next moved from Step 1 to Step 2; Back returned to Step 1; progression reached Step 5. |
| Brew Timer finish navigation works | PASS | Finish opened `/Pouro-GPT/finish`. |
| Finish page save works | PASS | Saving opened the generated History Detail record. |
| Finish page discard works | PASS | Discard returned to Brew Home without creating a record. |
| History list loads | PASS | Saved synthetic record appeared in History. |
| History Detail loads | PASS | Saved setup, result placeholders, POINT/TIPS, and Rebrew CTA rendered. |
| History Detail rebrew works | PASS | Returned to `/Pouro-GPT/setup/four-six` for confirmation. |
| Brew Home Last Brew shortcut appears when history exists | PASS | Appeared after the synthetic record was saved. |
| Brew Home Last Brew shortcut is hidden when history is empty | PASS | Confirmed before the synthetic record was created. |
| Settings page loads | PASS | Settings and local-data sections rendered. |
| Bottom tabs work | PASS | Brew, History, and Settings navigation was exercised. |
| Timer page hides bottom tabs | PASS | Bottom navigation was absent on Timer at both mobile viewports. |
| No obvious console/runtime crash | PASS | No browser error logs were observed during the checked flows. |

## 8. Screen-by-screen regression checklist

### Brew Home

* PASS: method cards remain selectable.
* PASS: Recipe Setup CTA still routes to the selected method.
* PASS: Last Brew uses only the latest locally saved brew.
* PASS: Last Brew returns to Recipe Setup; it does not directly start Timer.
* PASS: Last Brew remains hidden when local history is empty.

### Recipe Setup

* PASS: all four current method routes load.
* PASS: setup controls and POINT/TIPS remain readable.
* PASS: start CTA remains enabled for the checked default setups.
* PASS: setup-to-timer flow remains functional.

### Preview

* PASS: the current app has no standalone Preview route.
* PASS: method, variant, source-status, setup values, and guidance remain
  available for confirmation in Recipe Setup before Timer starts.
* PASS: no new route or behavior was introduced by this docs-only PR.

### Brew Timer

* PASS: Timer starts, pauses, resumes, moves Next/Back, and finishes.
* PASS: Target Total remains the dominant execution value.
* PASS: This Pour, elapsed time, instruction, next preview, and controls remain
  readable.
* PASS: bottom tabs remain hidden.

### Finish

* PASS: summary, POINT/TIPS, taste controls, rating, and memo fields render.
* PASS: save opens History Detail.
* PASS: discard returns to Brew without saving.
* PASS: bottom tabs remain hidden.

### History

* PASS: empty and populated history behavior were both exercised.
* PASS: saved records remain selectable.
* PASS: history remains focused on local brew records.

### History Detail

* PASS: setup snapshot, result fields, and POINT/TIPS render.
* PASS: Rebrew copies the saved setup and returns to Recipe Setup.
* PASS: no direct Timer start occurs.

### Settings

* PASS: settings, local-data count, and app-information links render.
* PASS: bottom-tab navigation remains available.
* PASS: no Settings behavior or local-data schema was changed.

## 9. Feature regression checklist

### POINT/TIPS

* PASS: Setup cap remains 2 through `.slice(0, 2)`.
* PASS: Timer cap remains 1 through selection of the first eligible item.
* PASS: Finish cap remains 2 through `.slice(0, 2)`.
* PASS: History Detail cap remains 2 through `.slice(0, 2)`.
* PASS: quarantine / `OTHER` content remains hidden by the existing display
  filters.
* PASS: source metadata remains suppressed in compact UI.

### Timer

* PASS: Target Total remains primary.
* PASS: This Pour remains secondary.
* PASS: elapsed time remains readable but supportive.
* PASS: Next Step remains readable.
* PASS: controls remain accessible.
* PASS: no timer calculation, method schedule, or step-progression code changed.

### Rebrew

* PASS: History Detail replay remains compatible.
* PASS: Brew Home Last Brew returns to Recipe Setup.
* PASS: `setupSnapshot` is copied.
* PASS: `createdAt` may be refreshed.
* PASS: no direct Timer start.
* PASS: no storage schema change.

## 10. Source / legal / provenance safety checklist

No changes were made to:

* PASS: `sourceStatus`
* PASS: `verificationLevel`
* PASS: `valuesArePlaceholder`
* PASS: `isPlaceholder`
* PASS: `fieldEvidence`
* PASS: tips source metadata
* PASS: recipe provenance
* PASS: legal / unofficial wording

No official endorsement, supervision, partnership, affiliation, complete
reproduction, or guaranteed brew-result claim is introduced.

The compact UI remains free of raw source URLs, timecodes, transcripts, and
source notes in the checked surfaces.

## 11. Mobile QA checklist

Interactive browser QA was run at both required mobile viewports.

| Check | 375 x 667 | 390 x 844 |
| --- | --- | --- |
| Brew Home | PASS | PASS |
| Recipe Setup | PASS | PASS |
| Brew Timer | PASS | PASS |
| Finish | PASS | PASS |
| History | PASS | PASS |
| History Detail | PASS | PASS |
| Settings | PASS | PASS |
| no horizontal overflow | PASS | PASS |
| critical CTA reachable | PASS | PASS |
| tap targets usable | PASS | PASS |
| bottom tabs not overlapping core CTA | PASS | PASS |
| Timer controls reachable | PASS | PASS |
| Last Brew card readable | PASS | PASS |

Additional observations:

* At 390 x 844, Target Total rendered at `58.5px` and This Pour at `23.4px`,
  preserving the intended priority.
* Timer controls were within the viewport at both sizes.
* Bottom tabs were visible on shell pages and hidden on Timer and Finish.
* No browser error logs were observed during either viewport sweep.

## 12. PWA / GitHub Pages checklist

* PASS: Vite base path `/Pouro-GPT/` remains unchanged.
* PASS: `BrowserRouter` basename `/Pouro-GPT/` remains unchanged.
* PASS: manifest / service worker / icons are unchanged.
* PASS: GitHub Pages base-prefixed route safety remains unchanged; direct
  base-prefixed History, History Detail, Settings, and setup routes loaded in
  the local production preview.
* PASS: `dist` is ignored and not committed.

## 13. Data / localStorage checklist

* PASS: localStorage key remains `brewHistory`.
* PASS: `BrewSession` shape is unchanged.
* PASS: `BrewSetup` shape is unchanged.
* PASS: history save behavior is unchanged.
* PASS: history max count remains 500.
* PASS: replay setup draft behavior is unchanged except for the prior PR-016B
  intended wiring.
* PASS: save, History Detail, History Detail Rebrew, Last Brew Rebrew, and
  discard behavior were exercised without a schema change.

## 14. Known limitations

* The repository has no automated lint/test script beyond build.
* Browser QA covered the required 375 x 667 and 390 x 844 viewports, but not
  every device, accessibility zoom level, or browser engine.
* The current app has no standalone Preview route; preview/confirmation content
  is part of Recipe Setup.
* This PR does not fix bugs; it records release-readiness status.
* PWA install/update/offline behavior was not interactively exercised; this PR
  verifies that PWA files and registration wiring are unchanged.

## 15. Release-readiness judgment

**READY_FOR_NEXT_POLISH_PR**

Rationale:

* required build and diff checks pass;
* required mobile browser QA was run at both target sizes;
* the core brew, save/discard, history, rebrew, Last Brew, Settings, and
  navigation flows passed;
* no blocking regression or runtime crash was observed;
* this PR changes only the release-readiness QA document.

This judgment does not claim final release approval. It indicates that the
current baseline is stable enough for the next bounded polish or review PR.

## 16. Next recommended PR candidates

Do not implement these in PR-017B:

* PR-018A: History List Rebrew CTA Minimal Review
* PR-018A alternative: Settings / Data Export Review
* PR-018A alternative: Mobile Browser QA Fixes if PR-017B finds issues
