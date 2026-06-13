# PR-015C: POINT/TIPS Recipe-Specific Prioritization QA

## 1. Purpose

Prioritize recipe-specific Recipe Setup POINT / TIPS before global setup tips
while retaining global tips as filler and keeping the existing two-item cap.

## 2. Scope

* change Recipe Setup tip selection order only
* preserve the PR-015B method / variant to `recipeCode` mapping
* preserve source order within recipe-specific and global groups
* keep the existing Recipe Setup POINT / TIPS UI unchanged

No tips source data, tips helper/type, styling, recipe data, schedule, exact
gate, fallback, source/provenance flag, route, storage, PWA, package, release,
dist, Timer, Finish, History, or Settings change is in scope.

## 3. Files Changed

* `src/pages/RecipeSetupPage.tsx`
* `docs/qa/PR-015C-point-tips-recipe-specific-prioritization.md`

## 4. Selection Rule Before / After

Before:

```ts
getTipsForDisplayContext("setup", recipeCode).slice(0, 2)
```

Global setup tips appear first in the current source order, so the two-item cap
can hide available recipe-specific setup tips.

After:

```ts
const setupTips = [...recipeSpecificSetupTips, ...globalSetupTips].slice(0, 2);
```

Recipe-specific setup tips are filtered into their source-order group first.
Displayable global `ALL` setup tips remain in their source-order group and fill
only the remaining visible slots. The cap remains two.

## 5. Mapping Preservation

| Current app selection | Preserved recipeCode |
| --- | --- |
| 4:6 Method | `406` |
| Ice Brew | `ICE` |
| Hybrid plus `R-08` | `HYB_NEW` |
| 10 Pour plus `R-09` / THE NEO BREW | `NEO` |
| Unknown mapping | `ALL` |

No mapping was invented for Hybrid base or Hybrid devil. The local mapping
helper remains unchanged and never returns `OTHER`.

## 6. Recipe-Specific Priority QA

| Required case | Result |
| --- | --- |
| 4:6 setup prioritizes `406` before `ALL` | Pass; static group order enforces priority. The current source dataset has no `406` setup item, so browser QA correctly showed `ALL`, `ALL`. |
| Ice setup prioritizes `ICE` before `ALL` | Pass; browser QA showed `P-ICE-001`, then `P-ALL-001`. |
| Hybrid `R-08` setup prioritizes `HYB_NEW` before `ALL` | Pass; static group order enforces priority. The current source dataset has no `HYB_NEW` setup item, so browser QA correctly showed `ALL`, `ALL`. |
| THE NEO BREW `R-09` setup prioritizes `NEO` before `ALL` | Pass; browser QA showed `T-NEO-001`, then `P-ALL-001`. |
| visible tips capped to 2 | Pass; cap remains `.slice(0, 2)` after group concatenation. |
| source order preserved within recipe-specific group | Pass; `.filter(...)` preserves helper/source order. |
| source order preserved within global group | Pass; `.filter(...)` preserves helper/source order. |
| `contentShortJa` used | Pass; existing render remains `contentShortJa || contentJa`. |
| `contentJa` fallback only | Pass; existing fallback is unchanged. |
| no source text rewritten | Pass. |

## 7. Global Fallback QA

| Case | Visible selection | Result |
| --- | --- | --- |
| unknown mapping / `ALL` | `P-ALL-001`, `P-ALL-002` | Pass; recipe-specific group is empty. |
| `406` with no current setup-specific source item | `P-ALL-001`, `P-ALL-002` | Pass. |
| `HYB_NEW` with no current setup-specific source item | `P-ALL-001`, `P-ALL-002` | Pass. |
| `ICE` with one current setup-specific source item | `P-ICE-001`, `P-ALL-001` | Pass; one global filler. |
| `NEO` with one current setup-specific source item | `T-NEO-001`, `P-ALL-001` | Pass; one global filler. |

## 8. Quarantine Exclusion QA

| Check | Result |
| --- | --- |
| `OTHER` / quarantine visible | Pass; no. PR-015A helper exclusion remains in use. |
| source URLs visible | Pass; no links in the POINT / TIPS card. |
| source timecodes visible | Pass; no. |
| randomization introduced | Pass; no. |
| source content rewritten | Pass; no. |

## 9. 375px Mobile QA

Browser QA used a `375x667` viewport.

| Check | Result |
| --- | --- |
| no horizontal overflow | Pass; `scrollWidth` equaled `clientWidth` (`360`) on 4:6, Ice, Hybrid `R-08`, and THE NEO BREW routes. |
| CTA reachable | Pass; at maximum scroll CTA bottom was `535.5px`, above bottom tabs starting at `588.7px`. |
| controls usable | Pass; 4:6 variant selection changed from the default to `甘み重視` and retained two visible tips. |
| bottom tabs stable | Pass; remained fixed below the reachable CTA. |
| POINT / TIPS remains capped | Pass; two visible rows on every checked route. |
| no `#007AFF` introduced | Pass; no styling change. |
| no frame / device mock border introduced | Pass; no styling change. |

## 10. Existing Method Regression QA

| Check | Result |
| --- | --- |
| 4:6 runtime behavior unchanged | Pass; only tip selection code changed. |
| Ice Brew runtime behavior unchanged | Pass; only tip selection code changed. |
| Hybrid runtime behavior unchanged | Pass; only tip selection code changed. |
| THE NEO BREW runtime behavior unchanged | Pass; only tip selection code changed. |
| Timer unchanged | Pass. |
| Finish unchanged | Pass. |
| History unchanged | Pass. |
| Settings unchanged | Pass. |
| routes unchanged | Pass. |

## 11. No Runtime-Data-Change Confirmation

Pass. No recipe/method runtime data, tips source JSON, tips helper/type, recipe
value, method schedule, exact gate, fallback logic, `sourceStatus`,
`verificationLevel`, `valuesArePlaceholder`, or `isPlaceholder` field changed.

## 12. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `main` matched expected `8194294` | Pass |
| existing test command available without adding dependencies | None |
| existing lint command available without adding dependencies | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| prohibited-file audit | Pass; diff is limited to the two allowed files. |

## 13. Findings

Pass. Recipe Setup now selects recipe-specific setup tips before global setup
tips, uses global tips only as filler, preserves order within each group, and
keeps the existing two-item cap and UI.

## 14. Remaining Risks

* The current source dataset has no `406` or `HYB_NEW` setup-context
  recipe-specific tips, so those priority paths are enforced by the shared
  selection rule but currently render global fallback tips only.
* Unknown mapping is confirmed by the unchanged local mapping fallback and
  static selection audit; there is no separate unknown-selection route in the
  current UI.

## 15. Independent Verifier Prompt

```text
Independently verify PR-015C against main after PR-015B.

Pass only if:
- Recipe Setup remains the only UI surface affected
- recipe-specific setup tips are displayed before global setup tips
- global tips are only used as filler
- visible tips remain capped to 2
- source order is preserved within each group
- OTHER / quarantine tips are not visible
- contentShortJa is used without rewriting source content
- no source URLs or timecodes are shown
- 375px layout has no horizontal overflow
- CTA remains reachable
- no Timer / Finish / History / Settings / route / storage / PWA / package / dist changes are included
- no recipe values, schedules, exact gates, fallback logic, or source/provenance flags are changed
- 4:6, Hybrid, THE NEO BREW, and Ice Brew behavior remains unchanged
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 16. Regression Checker Prompt

```text
Run regression-only review of PR-015C.

Confirm:
- no recipe data changed
- no timing changed
- no exact gate broadening
- no arbitrary scaling
- no source/provenance weakening
- no tips source JSON changes
- no tips type/data helper changes unless strictly required
- no 4:6 behavior changes
- no Hybrid behavior changes
- no THE NEO BREW runtime behavior changes
- no Ice Brew behavior changes
- no Timer UI change
- no Finish UI change
- no History UI change
- no Settings UI change
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

## 17. Memory / Handoff

PR-015C keeps the Recipe Setup UI and mapping unchanged. Future source-data
additions for `406` or `HYB_NEW` setup tips will automatically receive
recipe-first priority without another UI change. Continue using the display
helper so quarantine / `OTHER` exclusion remains centralized.
