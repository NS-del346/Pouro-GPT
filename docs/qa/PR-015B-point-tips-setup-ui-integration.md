# PR-015B: POINT/TIPS Recipe Setup UI Integration QA

## 1. Purpose

Surface a compact, read-only POINT / TIPS section on Recipe Setup so users can
see source-preserved setup guidance before starting a brew.

## 2. Scope

* map current app method and variant IDs conservatively to POINT / TIPS
  `recipeCode` values
* consume PR-015A tips through `getTipsForDisplayContext("setup", recipeCode)`
* show at most two displayable tips in source order
* use `contentShortJa`, with `contentJa` only as an empty-short-content fallback
* keep the UI limited to Recipe Setup

No recipe data, schedule, exact gate, fallback, source/provenance flag, route,
storage, PWA, package, release, dist, Timer, Finish, History, or Settings change
is in scope.

## 3. Files Changed

* `src/pages/RecipeSetupPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-015B-point-tips-setup-ui-integration.md`

## 4. Mapping Table

| Current app selection | Current ID gate | recipeCode | Result |
| --- | --- | --- | --- |
| 4:6 Method | `methodId === "four-six"` | `406` | Reachable |
| Ice Brew | `methodId === "ice-brew"` | `ICE` | Reachable |
| Hybrid base | No current selectable variant ID | `ALL` only | Not reachable from current UI |
| Hybrid devil | No current selectable variant ID | `ALL` only | Not reachable from current UI |
| New Hybrid | `methodId === "hybrid"` and `variantId === "R-08"` | `HYB_NEW` | Reachable |
| THE NEO BREW / R-09 | `methodId === "ten-pour"` and `variantId === "R-09"` | `NEO` | Reachable |
| Unknown mapping | Any unmatched method / variant pair | `ALL` | Conservative fallback |

No current app ID is guessed for `HYB_BASE` or `HYB_DEVIL`. `OTHER` is never
passed by the local mapping helper.

## 5. UI Placement

The POINT / TIPS section appears after the selected-variant overview and
recommendation area, before setup controls and the main CTA. When no setup tips
are returned, the section renders nothing.

## 6. Data Helper Usage

`RecipeSetupPage.tsx` calls:

```ts
getTipsForDisplayContext("setup", recipeCode).slice(0, 2)
```

PR-015A's helper preserves source order, includes displayable global `ALL` tips
for mapped recipe codes, and excludes quarantine / `OTHER` items.

## 7. Visible Item Cap

Pass. The UI uses a fixed `.slice(0, 2)` cap with no randomness or rotation.

## 8. Quarantine Exclusion QA

| Check | Result |
| --- | --- |
| local mapping can return `OTHER` | Pass; no |
| PR-015A helper excludes quarantine / `OTHER` | Pass |
| `P-OTHER-001` visible in Recipe Setup | Pass; no |
| source URLs or timecodes visible | Pass; no |
| source tip text rewritten | Pass; no |

## 9. 375px Mobile QA

| Check | Result |
| --- | --- |
| viewport | Pass; browser override set to `375x667` |
| no horizontal overflow | Pass; content `scrollWidth` equals `clientWidth` |
| CTA reachable | Pass; visible above bottom tabs after scrolling |
| method setup controls usable | Pass; 4:6 variant selection remained usable |
| POINT / TIPS card remains compact | Pass; two rows, approximately 119px tall |
| bottom tabs stable | Pass |
| no `#007AFF` introduced | Pass |
| no device frame / mock border introduced | Pass |

## 10. Existing Method Regression QA

| Required case | Result |
| --- | --- |
| 4:6 setup shows only displayable `406` / `ALL` setup tips | Pass |
| Ice setup shows only displayable `ICE` / `ALL` setup tips | Pass |
| Hybrid base setup | Not reachable from current UI; no ID guessed |
| Hybrid devil setup | Not reachable from current UI; no ID guessed |
| Hybrid new setup shows only displayable `HYB_NEW` / `ALL` setup tips | Pass |
| THE NEO BREW setup shows only displayable `NEO` / `ALL` setup tips | Pass |
| visible tips capped to two | Pass; static implementation |
| `contentShortJa` used | Pass; `contentJa` is fallback only |
| source URLs or timecodes hidden | Pass |
| source text preserved | Pass |
| `OTHER` / quarantine tips hidden | Pass |

The current setup dataset has global setup tips first in source order. With the
two-item cap, reachable methods currently show the same first two global tips;
recipe-specific setup tips remain safely available if source ordering or the cap
changes in a future approved PR.

## 11. No Runtime-Data-Change Confirmation

Pass. The final diff is limited to Recipe Setup UI, its small styling addition,
and this QA document. It does not edit recipe values, method schedules, exact
gates, fallback logic, sourceStatus, verificationLevel, valuesArePlaceholder,
or isPlaceholder.

## 12. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `main` matched expected `b613239` | Pass |
| baseline `npm.cmd run build` | Pass |
| existing test command available without dependency installation | None |
| existing lint command available without dependency installation | None |
| final `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; only the three allowed files changed |
| `git diff --stat` | Pass; only the three allowed files changed |
| prohibited-file audit | Pass |

## 13. Findings

Pass. No blocking findings were found. Recipe Setup displays two
source-preserved setup tips through the PR-015A helper, and browser QA found no
mobile overflow, CTA obstruction, bottom-tab instability, source link/timecode,
or quarantine display.

## 14. Remaining Risks

* Hybrid base and Hybrid devil have no current selectable app variant IDs, so
  they intentionally fall back to global `ALL` tips rather than guessed
  mappings.
* The current source order and two-item cap place global setup tips before
  recipe-specific setup tips.
* Browser QA covers current reachable methods and variants; it does not invent
  UI for unreachable variants.

## 15. Independent Verifier Prompt

```text
Independently verify PR-015B against main after PR-015A.

Pass only if:
- POINT / TIPS UI is limited to Recipe Setup
- data is consumed through PR-015A helpers or equivalent safe filtering
- OTHER / quarantine tips are not visible
- visible tips are capped for mobile readability
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
Run regression-only review of PR-015B.

Confirm:
- no recipe data changed
- no timing changed
- no exact gate broadening
- no arbitrary scaling
- no source/provenance weakening
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

PR-015B keeps mapping local to Recipe Setup. Future work should add an exact
current app variant ID before mapping Hybrid base or Hybrid devil, continue
using PR-015A display helpers, preserve source order, and keep quarantine /
`OTHER` excluded.
