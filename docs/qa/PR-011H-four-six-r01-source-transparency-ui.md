# PR-011H: 4:6 R-01 Source Transparency UI QA

## 1. Purpose

This PR improves small UI copy so users understand the narrow scope of the
R-01 source-backed runtime candidate.

## 2. Scope

* 4:6 R-01 UI copy only.
* Exact R-01 setup source-scope wording.
* Non-exact R-01 placeholder-safe wording.
* No runtime recipe data changes.
* No method schedule changes.
* No changes to R-02 through R-06 or other methods.

## 3. Files changed

* `src/pages/RecipeSetupPage.tsx`
* `src/pages/BrewTimerPage.tsx`
* `docs/qa/PR-011H-four-six-r01-source-transparency-ui.md`

## 4. Copy behavior

| Scenario                                      | Expected copy / behavior                                           | Result |
| --------------------------------------------- | ------------------------------------------------------------------ | ------ |
| 4:6 R-01 / 20g / 1:15 / 300g in Recipe Setup | UI states that only this R-01 basic candidate is source-backed     | Pass   |
| 4:6 R-01 / non-exact setup in Recipe Setup    | UI states detailed schedule is still checking / placeholder-safe   | Pass   |
| 4:6 R-01 exact setup in Brew Timer            | UI labels it as R-01 basic candidate, not full method verification | Pass   |
| 4:6 R-01 exact setup in Brew Timer            | 03:30 is described as dripper removal, not guaranteed drawdown     | Pass   |
| 4:6 R-02 through R-06                         | UI remains placeholder-safe                                        | Pass   |
| Hybrid / 10 Pour / Ice Brew                   | UI remains unchanged                                               | Pass   |

## 5. Runtime safety checks

| Check                                | Result |
| ------------------------------------ | ------ |
| No runtime recipe values changed     | Pass   |
| No method schedules changed          | Pass   |
| No R-02 through R-06 data changes    | Pass   |
| No Hybrid data changes               | Pass   |
| No 10 Pour data changes              | Pass   |
| No Ice Brew data changes             | Pass   |
| No fieldEvidence changes             | Pass   |
| No sourceStatus weakening            | Pass   |
| No verificationLevel weakening       | Pass   |
| No valuesArePlaceholder weakening    | Pass   |
| No timer state-machine rewrite       | Pass   |
| No route changes                     | Pass   |
| No storage schema changes            | Pass   |
| No PWA / manifest / workflow changes | Pass   |
| No dist files                        | Pass   |

## 6. Manual mobile QA

Test at:

* `375x667`
* `390x844`

| Viewport | Scenario                      | Result | Notes |
| -------- | ----------------------------- | ------ | ----- |
| 375x667  | Recipe Setup / R-01 exact     | Pass   | Narrow source-scope note wraps; no horizontal overflow. |
| 375x667  | Recipe Setup / R-01 non-exact | Pass   | Placeholder-safe fallback reason is visible; no horizontal overflow. |
| 375x667  | Brew Timer / R-01 exact       | Pass   | R-01 basic candidate and 03:30 removal wording are visible; BottomTabs hidden. |
| 375x667  | Brew Timer / R-02 placeholder | Pass   | Existing generic placeholder-safe wording remains; BottomTabs hidden. |
| 390x844  | Recipe Setup / R-01 exact     | Pass   | Narrow source-scope note wraps; no horizontal overflow. |
| 390x844  | Recipe Setup / R-01 non-exact | Pass   | Placeholder-safe fallback reason is visible; no horizontal overflow. |
| 390x844  | Brew Timer / R-01 exact       | Pass   | R-01 basic candidate and 03:30 removal wording are visible; BottomTabs hidden. |
| 390x844  | Brew Timer / R-02 placeholder | Pass   | Existing generic placeholder-safe wording remains; BottomTabs hidden. |

Also check:

* No horizontal overflow: Pass.
* No clipped Japanese copy: Pass.
* No layout shift caused by note: Pass.
* No browser console warnings: Pass.
* No browser console errors: Pass.
* BottomTabs still hidden on Brew Timer: Pass.
* Settings / History unaffected: Pass.

At the bottom of Recipe Setup, the primary CTA remained approximately `53px`
above BottomTabs at both viewports.

## 7. Verification commands

| Command             | Result                              |
| ------------------- | ----------------------------------- |
| `npm.cmd run build` | Pass                                |
| `git diff --check`  | Pass                                |
| `git status`        | Expected changed files only         |

## 8. Result

Result: Pass.

Blocking issues: None.

Non-blocking follow-ups:

* PR-012A Hybrid Source Evidence Pack
* PR-012B 10 Pour Source Evidence Pack
* PR-012C Ice Brew Source Evidence Pack
* R-02 through R-06 evidence review
