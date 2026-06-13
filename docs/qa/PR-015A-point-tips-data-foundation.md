# PR-015A: POINT/TIPS Master v2.1 Data Foundation QA

## 1. Purpose

Add a typed, runtime-validated data foundation for the POINT / TIPS master
without exposing POINT / TIPS in the UI or changing existing recipe behavior.

## 2. Source JSON Path

`docs/research/coffee_app_tips_master_v2.json`

The user-supplied source JSON was present before implementation and is preserved
as the source of truth.

## 3. Scope

* preserve the supplied POINT / TIPS master JSON
* add literal-safe TypeScript definitions
* import and validate the full master object without rewriting content
* add stable-order lookup helpers for future UI work
* exclude quarantine / `OTHER` entries from default display helpers
* add QA and handoff documentation

No UI wiring, recipe data, method schedule, gate, fallback, route, storage, PWA,
package, release, or dist change is in scope.

## 4. Files Changed

* `docs/research/coffee_app_tips_master_v2.json`
* `src/types/tips.ts`
* `src/data/tips.ts`
* `docs/qa/PR-015A-point-tips-data-foundation.md`

## 5. Dataset Summary

| Field | Value |
| --- | --- |
| version | `coffee_app_tips_master_v2` |
| generatedAt | `2026-06-13` |
| item count | `37` |
| POINT count | `21` |
| TIPS count | `16` |
| quarantine / OTHER item count | `1` (`P-OTHER-001`) |

### RecipeCode Counts

| recipeCode | Count |
| --- | ---: |
| `ALL` | 4 |
| `406` | 5 |
| `ICE` | 7 |
| `HYB_BASE` | 3 |
| `HYB_DEVIL` | 6 |
| `HYB_NEW` | 5 |
| `NEO` | 6 |
| `OTHER` | 1 |

### DisplayContext Counts

Entries with multiple contexts are counted once in each context.

| displayContext | Count |
| --- | ---: |
| `setup` | 5 |
| `preview` | 13 |
| `timer` | 15 |
| `finish` | 5 |
| `historyDetail` | 16 |
| `quarantine` | 1 |

## 6. Type Definition QA

| Check | Result |
| --- | --- |
| known type literals represented | Pass |
| known scope literals and quarantine safeguard represented | Pass |
| all recipeCode literals represented | Pass |
| all displayContext literals represented | Pass |
| actual verificationLevel literals represented | Pass |
| actual confidence literals represented | Pass |
| actual appAdoption literals represented | Pass |
| unknown source and item fields remain representable | Pass |

## 7. Data Preservation QA

| Check | Result |
| --- | --- |
| full master object exported | Pass |
| all 37 items exported in source order | Pass |
| methodSources preserved | Pass |
| source metadata preserved | Pass |
| Japanese content imported directly without rewriting | Pass |
| supplied source JSON hash unchanged during implementation | Pass |
| imported source arrays are not sorted or mutated | Pass |
| required structure and known literals validated at module load | Pass |

## 8. Lookup Helper QA

| Check | Result |
| --- | --- |
| `getGlobalTips()` returns displayable `ALL` entries | Pass |
| `getRecipeSpecificTips()` returns exact-code displayable entries | Pass |
| `getTipsForRecipeCode()` includes global plus requested recipe entries | Pass |
| `getTipsForDisplayContext()` supports optional recipe filtering | Pass |
| helpers return fresh arrays | Pass |
| helpers preserve source order | Pass |
| actual compiled helper module execution QA | Pass |

## 9. Quarantine Exclusion QA

`isDisplayableTip()` rejects an item when any of these conditions is true:

* `recipeCode` is `OTHER`
* `scope` is `quarantine`
* `appAdoption` is `quarantine`
* `displayContext` contains `quarantine`

`getTipsForRecipeCode("OTHER")` returns an empty array. All other default lookup
helpers also exclude `P-OTHER-001`.

## 10. No UI Wiring Confirmation

Pass. No page, component, style, route, or other UI file is changed. The new
data module is not imported by existing UI or runtime modules.

## 11. Existing Method Regression Confirmation

| Check | Result |
| --- | --- |
| 4:6 recipe and runtime behavior unchanged | Pass |
| Hybrid recipe and runtime behavior unchanged | Pass |
| THE NEO BREW recipe and runtime behavior unchanged | Pass |
| Ice Brew recipe and runtime behavior unchanged | Pass |
| exact gates and fallback logic unchanged | Pass |
| source/provenance flags unchanged | Pass |

## 12. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `27e5c97` matched `origin/main` before branch creation | Pass |
| source JSON expected count gate | Pass |
| existing test command available without dependency installation | None |
| existing lint command available without dependency installation | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; expected four-file PR scope |
| `git diff --stat` | Pass; expected four-file PR scope |
| prohibited-file audit | Pass |

## 13. Findings

Pass. The preserved source contains all expected entries and metadata. The
typed module compiles, validates the imported master at runtime, preserves
source order, returns fresh lookup arrays, and excludes the sole
quarantine / `OTHER` item from every default helper. No existing runtime or UI
file is changed.

## 14. Remaining Risks

* Source-content accuracy and future adoption decisions remain governed by the
  preserved research master.
* Current app method and variant IDs are intentionally not mapped to recipeCode
  values in this PR.
* Runtime validation checks structure and known literals; it does not
  independently verify source claims.

## 15. Independent Verifier Prompt

```text
Independently verify PR-015A against main after PR-014A.

Pass only if:
- coffee_app_tips_master_v2.json is preserved in docs/research/
- all 37 items are represented
- POINT / TIPS counts match the source JSON
- recipeCode counts match the source JSON
- source metadata is preserved
- Japanese content is not rewritten
- type definitions compile
- lookup helpers are safe and stable
- quarantine / OTHER items are excluded from default display helpers
- no UI wiring is added
- no method recipe values, schedules, exact gates, or fallback logic are changed
- no source/provenance flags are weakened
- no routing/storage/PWA/package/release/dist files are changed
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 16. Regression Checker Prompt

```text
Run regression-only review of PR-015A.

Confirm:
- no UI files changed unless strictly type export plumbing required
- no recipe data changed
- no timing changed
- no exact gate broadening
- no arbitrary scaling
- no source/provenance weakening
- no 4:6 behavior changes
- no Hybrid behavior changes
- no THE NEO BREW runtime behavior changes
- no Ice Brew behavior changes
- no route changes
- no localStorage schema changes
- no PWA / service worker / manifest / icon changes
- no package or lockfile changes
- no release doc changes
- no dist files
- npm.cmd run build passes
- git diff --check passes

Fail on any prohibited file or behavior change.
```

## 17. Memory / Handoff

PR-015A establishes data access only. Future UI work must explicitly map app
method or variant IDs to these recipeCode values, preserve stable source order,
and continue excluding quarantine / `OTHER` entries from default display
surfaces.
