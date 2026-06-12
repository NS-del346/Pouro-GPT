# PR-011B: Brew Timer Schedule Model QA

## 1. Purpose

This PR prepares a richer Brew Timer step model and placeholder-safe display behavior without implementing verified recipe values or method schedules.

## 2. Scope

* Adds an optional Brew step data model foundation for cumulative water, next-step time, next-pour amount, and step type.
* Updates Brew Timer display handling for current pour, cumulative water, next step, and missing values.
* Keeps placeholder schedule messaging visible and confirmation-needed copy compact.
* Adds no verified recipe values.
* Makes no timer state-machine rewrite.

## 3. Files changed

* `src/types/brew.ts`
* `src/types/index.ts`
* `src/data/placeholderMethods.ts`
* `src/pages/BrewTimerPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-011B-brew-timer-schedule-model.md`

## 4. Verification

| Check                                | Result |
| ------------------------------------ | ------ |
| npm.cmd run build                    | Pass   |
| git diff --check                     | Pass   |
| No dist files                        | Pass   |
| No verified recipe values added      | Pass   |
| No source status weakened            | Pass   |
| No timer state-machine rewrite       | Pass   |
| No route changes                     | Pass   |
| No storage schema changes            | Pass   |
| No PWA / manifest / workflow changes | Pass   |

## 5. Manual mobile QA

Tested at:

* 375×667
* 390×844

Results:

* Brew Timer opens from Recipe Setup.
* Timer does not show `undefined`, `null`, `NaN`, or misleading `--g` values.
* Missing pour amount displays compact confirmation-needed text.
* Missing cumulative water displays compact confirmation-needed text.
* Missing next-pour timing displays compact confirmation-needed text.
* Missing next-pour amount displays compact confirmation-needed text.
* Placeholder schedule status is visible but not overly disruptive.
* Pause / resume works, and elapsed time remains frozen while paused.
* Next step works.
* Back works.
* Finish behavior remains unchanged and navigates to Brew Finish.
* BottomTabs remain hidden on Brew Timer.
* No horizontal overflow.
* No browser console warnings or errors.

## 6. Out-of-scope follow-ups

* PR-011C Method Runtime Data Update after Source Verification
* PR-011D Source Transparency UI Copy if needed
* Future full schedule implementation for each verified method

## 7. Result

Result: Pass.

Blocking issues: None.

Non-blocking follow-ups: Verified method schedules and runtime recipe values.
