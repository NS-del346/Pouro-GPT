# PR-012F: Hybrid R-08 Fixed Example Runtime QA

## 1. Purpose

This PR adds the narrow Hybrid R-08 fixed-example runtime candidate.

Scope is limited to exact `20g / 300g / 1:15`.

Arbitrary dose and ratio scaling are not supported.

## 2. Scope

This PR covers:

- fixed Hybrid R-08 recipe data
- exact setup gate
- placeholder fallback
- minimal Recipe Setup caution copy
- minimal Brew Timer range / approximation caution copy
- no timer state-machine changes

## 3. Files changed

- `src/data/placeholderMethods.ts`
- `src/pages/BrewTimerPage.tsx`
- `src/pages/RecipeSetupPage.tsx`
- `docs/qa/PR-012F-hybrid-r08-fixed-example-runtime.md`

## 4. Runtime gate verification

| Setup | Expected recipe | Result |
|---|---|---|
| hybrid / R-08 / 20g / 1:15 / 300g | source-backed fixed candidate | Pass |
| hybrid / R-08 / 18g / 1:15 / 270g | placeholder fallback | Pass |
| hybrid / R-08 / 20g / 1:14 / 280g | placeholder fallback | Pass |
| hybrid / R-08 / 20g / 1:16 / 320g | placeholder fallback | Pass |
| hybrid / R-08 / custom dose | placeholder fallback | Pass |
| four-six / R-01 / 20g / 1:15 / 300g | existing 4:6 R-01 source-backed candidate unchanged | Pass |
| ten-pour / R-09 | unchanged placeholder | Pass |
| ice-brew / R-10 | unchanged placeholder | Pass |

## 5. Source-safety verification

| Check | Result |
|---|---|
| 20g treated as source_original | Pass |
| 300g treated as source_original | Pass |
| 1:15 treated as app_calculated, not source_original | Pass |
| first pour preserved as 40-50g range | Pass |
| approximate timings not treated as exact source truth | Pass |
| later temperature represented as 70-80°C guidance | Pass |
| initial temperature remains null/unresolved | Pass |
| finish target and observed dripper removal are separated | Pass |
| exact Switch model/capacity not claimed | Pass |
| arbitrary dose scaling disabled | Pass |
| arbitrary ratio scaling disabled | Pass |
| non-official / no affiliation copy present | Pass |

## 6. Regression verification

| Check | Result |
|---|---|
| npm.cmd run build | Pass |
| git diff --check | Pass |
| No dist files | Pass |
| No package changes | Pass |
| No route changes | Pass |
| No storage schema changes | Pass |
| No PWA / manifest / workflow changes | Pass |
| 4:6 R-01 exact source-backed candidate unchanged | Pass |
| R-02 through R-06 unchanged | Pass |
| 10 Pour unchanged | Pass |
| Ice Brew unchanged | Pass |
| Timer state machine unchanged | Pass |
| BrowserRouter unchanged | Pass |
| localStorage keys unchanged | Pass |

## 7. Manual QA checklist

- iPhone SE width check: Pass
- Brew Home -> Hybrid -> Recipe Setup: Pass
- Exact 20g / 1:15 shows fixed-example caution: Pass
- Changing dose or ratio shows fallback caution: Pass
- Exact setup -> Brew Timer shows New Hybrid fixed-example schedule note: Pass
- First pour range displays as 40-50g, not one invented value: Pass
- Approximate timing copy is visible: Pass
- Finish semantics copy is visible: Pass
- Non-exact setup -> Brew Timer shows placeholder-safe schedule: Pass
- 4:6 R-01 exact still works: Pass
- Finish flow still works: Pass
- History save still works: Pass

## 8. Result

Result: Pass

Blocking issues: None after this QA document is added.

Non-blocking follow-ups:

- PR-012G: Hybrid R-08 Runtime QA / Mobile Regression Gate
- Confirm exact-gate behavior on actual mobile viewport.
- Confirm range and approximation copy is readable on iPhone SE width.
