# PR-016A: Brew Timer Target Total Priority UI

## 1. Purpose

Make cumulative Target Total the visually dominant Brew Timer execution value
while keeping This Pour visible as secondary information.

Overall result: **Pass**

## 2. Market / UX rationale

During brewing, the user is watching a scale. Showing the cumulative scale
target as the primary value removes the need to mentally add the current pour
to prior pours. Brew Timer remains focused on brewing execution rather than
recipe discovery, social features, or analysis.

## 3. Scope

This PR changes only Brew Timer presentation hierarchy:

* Target Total is first and largest.
* This Pour is second and smaller.
* elapsed time is compact supporting information.
* semantic chip, step instruction, next preview, and controls keep their
  existing behavior.

No calculation, runtime-data, schedule, state-machine, storage, route, or
navigation change is included.

## 4. Files changed

Only:

* `src/pages/BrewTimerPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-016A-brew-timer-target-total-priority-ui.md`

## 5. Before / after information hierarchy

Before:

1. elapsed time was the largest number
2. This Pour appeared before cumulative water
3. This Pour and cumulative water had insufficient visual separation

After:

1. `累計目標 / Target Total` appears first and is the largest execution number
2. `今回の注湯 / This Pour` remains visible with smaller muted styling
3. elapsed time remains readable with compact supporting styling
4. semantic chip follows the target card
5. step instruction and next preview retain their existing order and content

## 6. Target Total rendering QA

| Check | Result |
| --- | --- |
| `cumulativeWaterGrams` available | Pass; rendered through the existing `formatRecipeGrams` helper |
| cumulative target unavailable | Pass; renders `累計目標は確認中` |
| target appears before This Pour | Pass |
| numeric target visually dominant | Pass; 56.3px at 375px and 58.5px at 390px in checked numeric cases |
| unavailable target remains primary | Pass; 26.4px versus Hybrid range value at 22.52px / 23.4px |
| target number clipped | Pass; checked target `scrollWidth === clientWidth` |

## 7. This Pour rendering QA

| Check | Result |
| --- | --- |
| `pourGrams` available | Pass; rendered through the existing `formatRecipeGrams` helper |
| current pour unavailable | Pass; renders `今回の注湯量は確認中` |
| remains visible | Pass |
| remains secondary to numeric target | Pass; 22.52px / 23.4px versus 56.3px / 58.5px |
| secondary color treatment | Pass; muted text color retained |

## 8. Range-value QA

`pourGramsRange` and `nextPourGramsRange` support remains unchanged.

Browser QA confirmed Hybrid Step 1 still renders:

* This Pour: `40-50g`
* next preview: `約0:45 に Open、120gまで注ぐ`

`formatNumericRange` was not changed.

## 9. Placeholder / unavailable-value QA

Ice Brew placeholder schedule was checked at both mobile viewports:

* Target Total: `累計目標は確認中`
* This Pour: `今回の注湯量は確認中`
* next timing and next pour confirmation-needed copy remain visible

Hybrid Step 1 was also checked because its cumulative target is unavailable
while its This Pour range is available. The primary fallback is larger than
the secondary `40-50g` range.

No fallback logic changed.

## 10. Timer behavior regression QA

At both required viewports, each required method exercised:

* Start
* Pause
* Resume
* Next
* Back
* Finish
* Finish navigation to `/Pouro-GPT/finish`

Pause was checked by reading the elapsed value, waiting, and confirming the
value remained frozen. Next and Back restored the expected adjacent step.

No timer handler, elapsed calculation, `currentStepIndex` behavior, control
label logic, session construction, or Finish navigation code changed.

## 11. Existing method regression QA

| Method | Result |
| --- | --- |
| 4:6 Method | Pass; Step 1/5 through Step 5/5, 60g increments, 300g final target, and 03:30 dripper-removal wording unchanged |
| Ice Brew | Pass; placeholder-safe two-step schedule and unavailable-value copy unchanged |
| Hybrid R-08 | Pass; `40-50g` range, cumulative targets, `Switch状態確認`, open/close guidance, and about-3:30 finish guidance unchanged |
| THE NEO BREW R-09 | Pass; ten 30g pours, Step 1/10 through Step 10/10, and 300g final target unchanged |

Static regression confirms THE NEO BREW Step 7 remains `1:45 / 210g`:
the unchanged starts array contains 105 seconds at order 7 and the unchanged
cumulative calculation remains `order * 30`.

THE NEO BREW `約3:30` remains approximate drawdown / finish guidance, not an
exact completion guarantee. No arbitrary scaling was added.

## 12. Mobile 375 / 390 QA

| Check | 375x667 | 390x844 |
| --- | --- | --- |
| Target Total readable at a glance | Pass | Pass |
| This Pour visible | Pass | Pass |
| elapsed readable and subordinate | Pass | Pass |
| step instruction readable | Pass | Pass |
| next preview readable | Pass | Pass |
| controls reachable | Pass; sticky controls bottom 655.3px within 667px | Pass; bottom at or below 832px within 844px |
| horizontal overflow | Pass; 360 == 360 | Pass; 375 == 375 or 390 == 390 |
| clipped target numbers | Pass | Pass |
| layout jump during step changes | Pass | Pass |
| device frame | Pass; app-shell border is `0px none` | Pass |
| `#007AFF` | Pass; no occurrence in `src` and no checked rendered use | Pass |
| POINT / TIPS subordinate | Pass | Pass |

All four required methods passed the control and Finish-navigation sweep at
390x844. All four passed the same sweep at 375x667; Hybrid was repeated after
the fallback hierarchy refinement.

## 13. Source/provenance safety

No source or provenance data changed. The PR does not change:

* `sourceStatus`
* `verificationLevel`
* `valuesArePlaceholder`
* `isPlaceholder`
* tips source JSON
* tips helpers or types
* non-official / non-affiliation wording

## 14. No runtime-data-change confirmation

No recipe or method runtime-data file changed. The PR does not change:

* recipe values
* method schedules
* exact candidate gates
* fixed setup gates
* fallback behavior
* timer calculations or progression
* session or localStorage schema

The diff against `origin/main` is limited to the three allowed files.

## 15. Build / static checks

| Check | Result |
| --- | --- |
| expected baseline `6bf54b6` | Pass |
| branch starts at `origin/main` | Pass; `0 0` ahead/behind before commit |
| existing test command | None |
| existing lint command | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| prohibited-file audit | Pass |
| package / lockfile audit | Pass; unchanged |
| dist audit | Pass; ignored and not included |

## 16. Findings

**Blocking findings: none**

One issue found during QA was fixed before publication:

* Hybrid Step 1 has no cumulative numeric target but does have a `40-50g`
  This Pour range. The first fallback styling made the primary fallback
  slightly smaller than the range. The final CSS makes the unavailable Target
  Total fallback larger while retaining the existing copy and logic.

## 17. Remaining risks

* The repository has no automated test or lint script. Verification relies on
  production build, static diff audit, and browser control sweeps.
* Mobile checks cover the required 375x667 and 390x844 viewports, not every
  possible browser font-scaling or accessibility zoom configuration.
* Ice Brew remains intentionally placeholder-safe; this PR does not supply
  missing schedule values.

## 18. Independent verifier prompt

```text
Independently verify PR-016A against main after PR-015G.

Pass only if:
- Brew Timer now makes cumulative Target Total / 累計目標 the visually dominant number
- This Pour / 今回の注湯 remains visible but secondary
- elapsed timer remains readable
- current step instruction remains readable
- next preview remains readable
- Back / Start / Pause / Resume / Next / Finish behavior is unchanged
- Finish navigation is unchanged
- all method schedules are unchanged
- THE NEO BREW 1:45 / 210g is unchanged
- THE NEO BREW 約3:30 remains drawdown/finish target, not exact completion guarantee
- Hybrid Switch guidance remains visible
- POINT / TIPS remains subordinate to Timer execution information
- no recipe values, exact gates, fallback logic, source/provenance flags, localStorage schema, routes, PWA files, package files, release docs, or dist files are changed
- 375px and 390px have no horizontal overflow or clipped target numbers
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 19. Regression checker prompt

```text
Run regression-only review of PR-016A.

Confirm:
- no recipe data changed
- no method schedules changed
- no timer calculations changed
- no step progression changed
- no exact gate broadening
- no arbitrary scaling
- no fallback logic changed
- no source/provenance weakening
- no tips source JSON changes
- no tips helper/type changes
- no saved session data changes
- no localStorage schema changes
- no Finish navigation changes
- no Recipe Setup behavior changes
- no Finish behavior changes
- no History behavior changes
- no History Detail behavior changes
- no Settings behavior changes
- no route changes
- no PWA / service worker / manifest / icon changes
- no package or lockfile changes
- no release doc changes
- no dist files
- npm.cmd run build passes
- git diff --check passes

Fail on any prohibited file or behavior change.
```

## 20. Memory / handoff

PR-016A is a presentation-only Brew Timer hierarchy change:

* preserve Target Total as the primary execution value
* preserve This Pour as secondary
* keep range and unavailable-value guards
* keep elapsed compact and readable
* keep POINT / TIPS subordinate
* do not move this hierarchy work into recipe data, timer calculations, or
  session/storage behavior

Future runtime-data work must remain separate and retain exact-match gating,
placeholder-safe fallbacks, and source/provenance boundaries.
