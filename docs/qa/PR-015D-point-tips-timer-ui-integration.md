# PR-015D: POINT/TIPS Timer UI Integration QA

## 1. Purpose

Surface one compact, read-only POINT / TIPS item on Brew Timer while keeping
the active brewing surface low-cognitive-load and preserving all timer behavior.

## 2. Scope

* add a local conservative `BrewSetup` to `CoffeeTipRecipeCode` mapping
* consume PR-015A data through `getTipsForDisplayContext("timer", recipeCode)`
* prioritize recipe-specific timer tips before global `ALL` fallback tips
* show at most one source-preserved short item on Brew Timer
* add only the small Timer-specific style needed for a subordinate hint

No tips source data, tips helper/type, recipe data, schedule, timer calculation,
exact gate, fallback, source/provenance flag, Recipe Setup, Finish, History,
Settings, route, storage, PWA, package, release, or dist change is in scope.

## 3. Files Changed

* `src/pages/BrewTimerPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-015D-point-tips-timer-ui-integration.md`

## 4. Mapping Table

| Current Timer setup | Current ID gate | recipeCode |
| --- | --- | --- |
| 4:6 Method | `methodId === "four-six"` | `406` |
| Ice Brew | `methodId === "ice-brew"` | `ICE` |
| New Hybrid | `methodId === "hybrid"` and `variantId === "R-08"` | `HYB_NEW` |
| THE NEO BREW | `methodId === "ten-pour"` and `variantId === "R-09"` | `NEO` |
| Unknown mapping | any unmatched setup | `ALL` |

No mapping is invented for Hybrid base or Hybrid devil. The local helper never
returns `OTHER`.

## 5. Timer Selection Rule

```ts
const timerTip = [...recipeSpecificTimerTips, ...globalTimerTips][0];
```

Recipe-specific timer tips are filtered into their source-order group first.
Displayable global `ALL` timer tips remain in source order and are fallback
only. Selecting index zero fixes the visible cap at one with no randomization
or step-specific rotation.

## 6. UI Placement

The Timer-only hint is rendered in DOM order after all existing method-specific
or placeholder schedule notes and before the large timer output. Timer visual
polish keeps the existing notes, compact hint, and timer in that same visible
order. Existing caution-note content and visual treatment remain unchanged;
only the layout order is adjusted.

The hint shows only:

* `POINT / TIPS`
* the source `POINT` or `TIPS` type label
* `contentShortJa`, with `contentJa` only as an empty-short-content fallback

It shows no `whyJa`, source URL, source title, timecode, explanation, or
interaction.

## 7. Cognitive-Load Constraints

| Check | Result |
| --- | --- |
| one visible item maximum | Pass; one item is selected before rendering. |
| short copy only | Pass; render uses `contentShortJa || contentJa`. |
| read-only / no interaction | Pass; no button, link, modal, accordion, or tooltip. |
| non-random / no animation | Pass. |
| no current-step dependency or rotation | Pass. |
| timer and current pour hierarchy retained | Pass; Timer is `89.6px` versus `13.44px` hint copy, and current/cumulative water remain readable after normal scrolling. |
| controls remain reachable | Pass; sticky controls remained visible and usable at `375x667` and `390x844`. |

## 8. Recipe-Specific Priority QA

| Required case | Expected current selection | Result |
| --- | --- | --- |
| 4:6 timer prioritizes `406` before `ALL` | `P-406-001` | Pass; browser showed `落ち切ってから次へ`. |
| Ice timer prioritizes `ICE` before `ALL` | `P-ICE-002` | Pass; browser showed `1・2投目は揺らす`. |
| Hybrid `R-08` timer prioritizes `HYB_NEW` before `ALL` | `P-HYB-NEW-001` | Pass; browser showed `蒸らしはスイッチ閉`. |
| THE NEO BREW `R-09` timer prioritizes `NEO` before `ALL` | `P-NEO-001` | Pass; browser showed `30gずつ10回注ぐ`. |
| visible Timer tips capped to 1 | one item | Pass; browser found exactly one `.timer-tip` on every reachable Timer route. |
| source order preserved within recipe-specific group | first matching source item | Pass; `.filter(...)` preserves helper/source order. |
| source order preserved within global group | first matching source item | Pass; `.filter(...)` preserves helper/source order. |
| `contentShortJa` used | source short content | Pass; all four browser strings exactly matched source `contentShortJa`. |
| `contentJa` fallback only | `contentShortJa || contentJa` | Pass; static implementation. |
| no source text rewritten | exact source field render | Pass. |

## 9. Global Fallback QA

| Required case | Expected current selection | Result |
| --- | --- | --- |
| unknown mapping shows `ALL` timer tips only | `P-ALL-003` | Pass; static fallback mapping and group selection. |
| global item is filler only for mapped recipes | recipe-specific current items win | Pass; concatenation order enforces recipe-first selection. |
| global source order preserved | first displayable `ALL` timer item | Pass. |

## 10. Quarantine Exclusion QA

| Check | Result |
| --- | --- |
| local mapping can return `OTHER` | Pass; no. |
| `OTHER` / quarantine visible | Pass; no. PR-015A display helper exclusion remains in use. |
| source URLs visible | Pass; no link or source field is rendered. |
| source titles visible | Pass; no. |
| source timecodes visible | Pass; no. |
| `whyJa` visible | Pass; no. |

## 11. 375px Mobile QA

Browser QA viewport: `375x667`.

| Check | Result |
| --- | --- |
| no horizontal overflow | Pass; `scrollWidth` equaled `clientWidth` (`360`) on all four reachable Timer routes. |
| timer display remains prominent | Pass; large timer remained `89.6px` and visually dominant over the compact hint. |
| current pour remains readable | Pass; longest-note Hybrid route showed the row fully above controls after normal scrolling. |
| cumulative water remains readable | Pass; longest-note Hybrid route showed the row fully above controls after normal scrolling. |
| timer controls remain reachable | Pass; controls remained sticky and usable. |
| next/back/pause behavior unchanged | Pass; browser regression run exercised Next, Back, Pause, and Resume. |
| bottom-tab behavior unchanged | Pass; Timer continued to omit bottom tabs and no navigation styling changed. |
| no `#007AFF` | Pass; no occurrence in `src`. |
| no frame / device mock border | Pass; app shell computed border remained `0px none`. |
| warm cream / charcoal / muted amber direction preserved | Pass; computed palette remained cream `#f7f1e8`, charcoal `#17212b`, and amber `#b9823b`. |

Additional `390x844` QA passed on the longest-note Hybrid route with no
horizontal overflow, one visible tip, readable target card, and reachable
controls.

## 12. Timer Behavior Regression QA

| Required check | Result |
| --- | --- |
| Start behavior unchanged | Pass; Start changed the primary control to Pause and enabled Next. |
| Pause behavior unchanged | Pass; Pause changed the primary control to Resume and held the displayed elapsed value. |
| Resume behavior unchanged | Pass; Resume restored Pause. |
| Next behavior unchanged | Pass; advanced from Step 1 through Step 5. |
| Back behavior unchanged | Pass; returned from Step 2 to Step 1. |
| Finish navigation unchanged | Pass; Finish navigated to `/finish`. |
| elapsed timer calculation unchanged | Pass; no timer calculation/state code changed. |
| `currentStepIndex` logic unchanged | Pass; no step progression code changed. |
| current pour display unchanged | Pass; render code unchanged. |
| cumulative water display unchanged | Pass; render code unchanged. |
| existing method-specific caution notes unchanged | Pass; content and existing rules unchanged. |

## 13. Existing Method Regression QA

| Check | Result |
| --- | --- |
| 4:6 behavior unchanged | Pass; setup-to-Timer flow and controls worked with the existing R-01 schedule. |
| Ice Brew behavior unchanged | Pass; existing placeholder schedule and fallback target copy remained visible. |
| Hybrid behavior unchanged | Pass; existing R-08 note, step, and target surfaces remained visible. |
| THE NEO BREW behavior unchanged | Pass; existing R-09 note, step, and target surfaces remained visible. |
| Recipe Setup unchanged | Pass; no diff. |
| Finish unchanged | Pass; no diff. |
| History unchanged | Pass; no diff. |
| Settings unchanged | Pass; no diff. |

## 14. No Runtime-Data-Change Confirmation

Pass. No recipe/method runtime data, tips source JSON, tips helper/type, recipe
value, method schedule, exact gate, fallback logic, `sourceStatus`,
`verificationLevel`, `valuesArePlaceholder`, or `isPlaceholder` field changed.

## 15. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `main` matched expected `6ddae99` | Pass |
| existing test command available without adding dependencies | None |
| existing lint command available without adding dependencies | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; only the three allowed files are present. |
| `git diff --stat` | Pass; only the three allowed files are present. |
| prohibited-file audit | Pass; no tips data/helper/type, recipe data, package, lockfile, or dist file is included. |

## 16. Findings

Pass. No blocking findings remain. The Timer now shows one recipe-prioritized,
source-preserved short hint after existing method notes and before the large
timer, without changing Timer behavior or runtime data.

## 17. Remaining Risks

* Unknown mapping is enforced by the local fallback and static selection audit;
  there is no separate unknown-selection route in the current UI.
* Browser QA covers current reachable setup paths and does not invent selectable
  IDs for Hybrid base or Hybrid devil.
* The repository has no existing lint or test script, so verification relies on
  the production build, static diff audit, and browser regression QA.

## 18. Independent Verifier Prompt

```text
Independently verify PR-015D against main after PR-015C.

Pass only if:
- Timer POINT / TIPS UI is limited to Brew Timer
- only one timer tip is visible
- recipe-specific timer tips are prioritized before global timer tips
- global tips are only used as filler
- source order is preserved within each group
- OTHER / quarantine tips are not visible
- contentShortJa is used without rewriting source content
- whyJa, source URLs, source titles, and timecodes are not shown
- no interaction, randomization, or step-specific rotation is introduced
- 375px layout has no horizontal overflow
- timer display remains visually dominant
- current pour / cumulative water remain readable
- timer controls remain reachable
- Start/Pause/Resume/Next/Back/Finish behavior remains unchanged
- elapsed timer calculation remains unchanged
- no Recipe Setup / Finish / History / Settings / route / storage / PWA / package / dist changes are included unless strictly documented as styling only
- no recipe values, schedules, exact gates, fallback logic, or source/provenance flags are changed
- 4:6, Hybrid, THE NEO BREW, and Ice Brew behavior remains unchanged
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 19. Regression Checker Prompt

```text
Run regression-only review of PR-015D.

Confirm:
- no recipe data changed
- no timing changed
- no timer calculation changed
- no currentStepIndex behavior changed
- no Start/Pause/Resume/Next/Back/Finish behavior changed
- no exact gate broadening
- no arbitrary scaling
- no source/provenance weakening
- no tips source JSON changes
- no tips type/data helper changes unless strictly required
- no Recipe Setup behavior changes
- no Finish behavior changes
- no History behavior changes
- no Settings behavior changes
- no route changes
- no localStorage schema changes
- no PWA / service worker / manifest / icon changes
- no package or lockfile changes
- no release doc changes
- no dist files
- no quarantine / OTHER display
- npm.cmd run build passes
- git diff --check passes

Fail on any prohibited file or behavior change.
```

## 20. Memory / Handoff

PR-015D keeps Timer mapping and selection local to `BrewTimerPage.tsx`. Future
timer-tip source additions automatically receive recipe-first priority and the
one-item cap without Timer behavior changes. Continue using the PR-015A display
helper so quarantine / `OTHER` exclusion remains centralized.
