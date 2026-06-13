# PR-012G: Hybrid R-08 Runtime QA / Mobile Regression Gate

## 1. Purpose

PR-012F added the narrow Hybrid R-08 fixed-example runtime candidate.

PR-012G verifies its behavior and regression safety.

This PR does not add runtime data.

This PR does not change schedules or app behavior.

## 2. Scope

This QA gate covers:

* exact setup gate
* non-exact placeholder fallback
* range and approximation display
* source-safety copy
* mobile iPhone SE QA
* 4:6 / 10 Pour / Ice Brew regression
* no timer state-machine changes

## 3. Files changed

Expected and actual changed file:

* `docs/qa/PR-012G-hybrid-r08-runtime-qa.md`

No other file is changed.

## 4. Exact setup gate verification

| Case | Setup                              | Expected result                            | Result |
| ---- | ---------------------------------- | ------------------------------------------ | ------ |
| H-01 | Hybrid / R-08 / 20g / 1:15 / 300g | Hybrid fixed-example candidate is selected | Pass   |
| H-02 | Hybrid / R-08 / 18g / 1:15 / 270g | placeholder fallback                       | Pass   |
| H-03 | Hybrid / R-08 / 24g / 1:15 / 360g | placeholder fallback                       | Pass   |
| H-04 | Hybrid / R-08 / 20g / 1:14 / 280g | placeholder fallback                       | Pass   |
| H-05 | Hybrid / R-08 / 20g / 1:16 / 320g | placeholder fallback                       | Pass   |
| H-06 | Hybrid / R-08 / custom dose        | placeholder fallback                       | Pass   |
| H-07 | Hybrid / R-08 / custom ratio       | placeholder fallback                       | Pass   |

The exact gate depends on `methodId`, `variantId`, `coffeeGrams`, `ratio`, and
`waterGrams`.

The custom-dose check used `22g / 330g / 1:15`. The custom-ratio check used
`20g / 340g / 1:17`. Both displayed the two-step placeholder schedule.

Non-exact setups do not show the source-backed five-step schedule.

## 5. Runtime data verification

| Field                                | Expected                                 | Result |
| ------------------------------------ | ---------------------------------------- | ------ |
| coffeeGrams                          | 20 only                                  | Pass   |
| waterGrams                           | 300 only                                 | Pass   |
| ratio                                | 15 as app_calculated                     | Pass   |
| waterTempCelsius                     | null / unresolved                        | Pass   |
| waterTempCelsiusRange                | 70-80°C guidance only                    | Pass   |
| grindSizeLabel                       | grinder-specific guidance, not universal | Pass   |
| totalTimeSec                         | null / no single exact total             | Pass   |
| totalTimeReferences                  | approx 3:30 and observed 3:34 separated  | Pass   |
| fixedSetupGate                       | scalingSupported false                   | Pass   |
| valuesArePlaceholder on exact recipe | false                                    | Pass   |
| method container                     | still needsReview / unverified caution   | Pass   |
| R-08 variant container               | still valuesArePlaceholder true          | Pass   |

Source inspection confirms that the recipe uses `20g`, `300g`, an
app-calculated ratio of `15`, unresolved initial temperature, later
`70-80°C` guidance, and no single exact total time. The method and R-08
variant containers remain caution-protected.

## 6. Step verification

| Step   | Expected behavior                                                    | Result |
| ------ | -------------------------------------------------------------------- | ------ |
| Step 1 | 40-50g range appears, no invented exact pour                         | Pass   |
| Step 2 | 120g cumulative target, approximate/observed timing kept separate    | Pass   |
| Step 3 | 200g cumulative target, approximate/observed timing kept separate    | Pass   |
| Step 4 | 300g cumulative target, Close action, 70-80°C guidance               | Pass   |
| Step 5 | Open / finish, 3:30 target and 3:34 observed removal remain distinct | Pass   |

Confirmed:

* no false exact timing claim
* no false exact first-pour value
* no unsupported incremental pour amounts after Step 1
* no unsupported Switch model/capacity claim

## 7. Recipe Setup UI QA

| Case                        | Expected UI copy               | Result |
| --------------------------- | ------------------------------ | ------ |
| exact Hybrid R-08 setup     | fixed-example caution appears  | Pass   |
| non-exact Hybrid R-08 setup | fallback caution appears       | Pass   |
| custom dose shown           | fallback caution remains clear | Pass   |
| custom ratio shown          | fallback caution remains clear | Pass   |
| 4:6 R-01 exact              | existing 4:6 caution unchanged | Pass   |
| 10 Pour                     | unchanged placeholder status   | Pass   |
| Ice Brew                    | unchanged placeholder status   | Pass   |

Required copy checks:

* fixed example only
* 20g / 300g / 1:15 only
* 40-50g range
* approximate timings
* no arbitrary scaling

## 8. Brew Timer UI QA

| Case                    | Expected UI behavior                          | Result |
| ----------------------- | --------------------------------------------- | ------ |
| exact Hybrid R-08 setup | R-08 fixed-example label appears              | Pass   |
| exact Hybrid R-08 setup | schedule note appears                         | Pass   |
| Step 1                  | current pour displays 40-50g                  | Pass   |
| Step 1                  | no invented single value appears              | Pass   |
| later steps             | cumulative targets visible                    | Pass   |
| timing note             | approximate wording visible                   | Pass   |
| finish step             | target / observed removal distinction visible | Pass   |
| non-exact Hybrid setup  | placeholder-safe timer note appears           | Pass   |
| non-exact Hybrid setup  | no source-backed schedule appears             | Pass   |

Required copy checks:

* first pour range
* approximate timing
* initial water temperature unresolved
* 70-80°C later guidance
* no arbitrary scaling
* non-official / no affiliation

## 9. Mobile QA

iPhone SE `375x667` is the baseline.

| Screen                          | Expected                            | Result |
| ------------------------------- | ----------------------------------- | ------ |
| Brew Home                       | unchanged, no layout regression     | Pass   |
| Recipe Setup / Hybrid exact     | caution copy readable               | Pass   |
| Recipe Setup / Hybrid non-exact | fallback copy readable              | Pass   |
| Brew Timer / Hybrid exact       | current pour card readable          | Pass   |
| Brew Timer / Hybrid exact       | schedule note does not overflow     | Pass   |
| Brew Timer / Hybrid exact       | timing note does not break controls | Pass   |
| Brew Timer / Hybrid exact       | bottom controls remain reachable    | Pass   |
| Brew Timer / Hybrid non-exact   | placeholder fallback readable       | Pass   |
| Finish                          | still reachable                     | Pass   |
| History                         | save path still works               | Pass   |

Observed mobile checks:

* no horizontal overflow on Brew Home, Recipe Setup, Brew Timer, or Finish
* Brew Timer and Finish keep Bottom Tabs hidden
* controls remain reachable through normal vertical scrolling
* no visible `undefined`, `null`, `NaN`, or `--g`
* exact Hybrid Finish -> save -> History Detail completed successfully

Non-blocking limitation:

* The caution and timing copy is dense at iPhone SE width, but it remains
  readable and does not overflow or block controls.

## 10. Regression QA

| Area                            | Expected                              | Result |
| ------------------------------- | ------------------------------------- | ------ |
| 4:6 R-01 exact setup            | still returns source-backed candidate | Pass   |
| 4:6 R-01 non-exact setup        | still placeholder fallback            | Pass   |
| R-02 through R-06               | unchanged placeholder                 | Pass   |
| 10 Pour / R-09                  | unchanged placeholder                 | Pass   |
| Ice Brew / R-10                 | unchanged placeholder                 | Pass   |
| timer state machine             | unchanged                             | Pass   |
| route definitions               | unchanged                             | Pass   |
| BrowserRouter                   | unchanged                             | Pass   |
| localStorage keys               | unchanged                             | Pass   |
| localStorage schema             | unchanged                             | Pass   |
| PWA / manifest / service worker | unchanged                             | Pass   |
| package files                   | unchanged                             | Pass   |
| release docs                    | unchanged                             | Pass   |
| dist files                      | not included                          | Pass   |

The 4:6 R-01 exact setup still displays its five-step source-backed candidate.
The non-exact R-01 setup and each of R-02 through R-06 display the two-step
placeholder schedule. 10 Pour and Ice Brew also display their unchanged
two-step placeholder schedules.

## 11. Verification commands

Recorded results:

```text
npm.cmd run build
Pass: tsc -b and vite build completed successfully.

git diff --check
Pass: no whitespace errors.

git status
Pass: only docs/qa/PR-012G-hybrid-r08-runtime-qa.md is staged before commit.
Publication gate: verify the working tree is clean after commit and push.
```

Confirmed:

* build pass
* diff check pass
* post-commit clean-tree check required before Draft PR publication
* no dist files

## 12. Independent Verifier Prompt

```text
Independently verify PR-012G: Hybrid R-08 Runtime QA / Mobile Regression Gate.

Review the full diff against origin/main, the PR-012F QA baseline,
src/data/placeholderMethods.ts, src/pages/RecipeSetupPage.tsx,
src/pages/BrewTimerPage.tsx, src/types/brew.ts, src/types/source.ts, and the
PR-012G QA document.

Pass only if:
- the PR is docs-only
- if any code changed, block unless explicitly justified
- the exact Hybrid R-08 gate from PR-012F remains present
- the exact gate is limited to Hybrid / R-08 / 20g / 300g / 1:15
- non-exact placeholder fallback is documented
- the first pour remains a 40-50g range
- approximate timings are not treated as exact
- initial water temperature remains unresolved
- later 70-80°C temperature remains guidance
- finish target and observed dripper removal remain separate
- no arbitrary scaling is introduced
- 4:6, 10 Pour, and Ice Brew regressions are covered
- mobile iPhone SE QA is recorded
- no official affiliation or endorsement is implied
- npm.cmd run build passes
- git diff --check passes
- no dist files are included

Report findings first, ordered by severity. If no issue is found, state Pass
and identify residual copy-density or future-source risk.
```

## 13. Regression Checker Prompt

```text
Run a regression-only review of PR-012G against origin/main.

Confirm:
- no runtime data changes
- no method schedule changes
- no src/data/placeholderMethods.ts changes
- no src/pages/BrewTimerPage.tsx changes
- no src/pages/RecipeSetupPage.tsx changes
- no type changes
- no route changes
- no storage schema changes
- no PWA, manifest, workflow, or package changes
- no release docs
- no dist files
- no weakening of sourceStatus, verificationLevel, valuesArePlaceholder, or
  isPlaceholder
- only docs/qa/PR-012G-hybrid-r08-runtime-qa.md changed
- npm.cmd run build passes
- git diff --check passes

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 14. Memory / Handoff

PR-012F introduced the Hybrid R-08 exact runtime candidate. PR-012G verified
it.

Hybrid R-08 is source-backed only for exact `20g / 300g / 1:15`. All
non-exact setups remain placeholder fallback. The first pour remains a range,
timings remain approximate, initial temperature remains unresolved, and the
later lower temperature remains `70-80°C` guidance. No arbitrary scaling is
supported.

The method and variant containers remain caution-protected. Future PRs must
not broaden Hybrid support without new source evidence.

Recommended next PR:

**PR-013A: 10 Pour Method Source Evidence Pack / Runtime Candidate Gate**

## 15. Result

Result:
Pass

Blocking issues:
None.

Non-blocking follow-ups:

* PR-013A: 10 Pour Method Source Evidence Pack / Runtime Candidate Gate
* Later mobile visual polish if copy density is high
