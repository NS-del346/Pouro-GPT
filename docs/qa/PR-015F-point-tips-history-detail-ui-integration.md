# PR-015F: POINT/TIPS History Detail UI Integration QA

## 1. Purpose

Surface up to two compact, passive POINT / TIPS items on History Detail so the
user can review a saved brew and prepare for a possible rebrew without changing
the saved record.

## 2. Scope

* add a local conservative saved `BrewSetup` to `CoffeeTipRecipeCode` mapping
* consume PR-015A data through
  `getTipsForDisplayContext("historyDetail", recipeCode)`
* prioritize recipe-specific History Detail tips before global `ALL` filler
* show at most two source-preserved short items on History Detail only
* place the compact section after summary and before conditions
* add only the small History Detail-specific style needed for the compact section

No tips source data, tips helper/type, recipe data, schedule, timer calculation,
exact gate, fallback, source/provenance flag, saved session shape, storage,
replay behavior, History list, Recipe Setup, Timer, Finish, Settings, route,
PWA, package, release, or dist change is in scope.

## 3. Files Changed

* `src/pages/HistoryDetailPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-015F-point-tips-history-detail-ui-integration.md`

## 4. Mapping Table

| Saved setup | Current ID gate | recipeCode |
| --- | --- | --- |
| 4:6 Method | `methodId === "four-six"` | `406` |
| Ice Brew | `methodId === "ice-brew"` | `ICE` |
| New Hybrid | `methodId === "hybrid"` and `variantId === "R-08"` | `HYB_NEW` |
| THE NEO BREW | `methodId === "ten-pour"` and `variantId === "R-09"` | `NEO` |
| Unknown mapping | any unmatched saved setup | `ALL` |

No mapping is invented for Hybrid base or Hybrid devil. The local helper never
returns `OTHER`.

## 5. History Detail Selection Rule

```ts
const historyDetailTips = [
  ...recipeSpecificHistoryDetailTips,
  ...globalHistoryDetailTips,
].slice(0, 2);
```

Recipe-specific History Detail tips are filtered into their source-order group
first. Displayable global `ALL` History Detail tips remain in source order and
fill only remaining visible slots. The final slice fixes the visible cap at two
with no randomization.

Current source-data selection:

| Mapping | Selected visible source items |
| --- | --- |
| `406` | `T-406-001`, `T-406-002` |
| `ICE` | `T-ICE-001`, `T-ICE-002` |
| `HYB_NEW` | `T-HYB-NEW-001`, `T-HYB-NEW-002` |
| `NEO` | `T-NEO-002`, `T-NEO-003` |
| `ALL` | `T-ALL-001` |

All mapped recipe groups currently fill the two-item cap before global filler is
needed. An unknown mapping selects the one current global History Detail item.

## 6. UI Placement

The History Detail-only section is rendered in DOM order:

```text
summary
POINT / TIPS
conditions
taste record
same condition rebrew CTA
```

Browser QA at `375x667` confirmed that order for 4:6, Ice, Hybrid `R-08`, and
THE NEO BREW `R-09`.

The section shows only:

* `POINT / TIPS`
* the source `POINT` or `TIPS` type label
* `contentShortJa`, with `contentJa` only as an empty-short-content fallback

It shows no `whyJa`, source URL, source title, timecode, explanation, or
interaction.

## 7. Saved-Record Constraints

| Check | Result |
| --- | --- |
| passive reference text only | Pass; no button, link, modal, accordion, tooltip, or generated text is inside the section. |
| saved session data mutation | Pass; no repository, storage, saved type, or mutation code changed. |
| saved setup fields reinterpreted | Pass; existing setup rendering remains unchanged. |
| saved memos rewritten | Pass; existing memo rendering remains unchanged. |
| taste tags or rating changed | Pass; no diff. |
| elapsed time display changed | Pass; no diff. |
| automatic note generation | Pass; none. |
| automatic rebrew | Pass; none. |

## 8. Recipe-Specific Priority QA

| Required case | Expected current selection | Result |
| --- | --- | --- |
| 4:6 History Detail prioritizes `406` before `ALL` | `T-406-001`, `T-406-002` | Pass; browser showed `1投目で味を寄せる`, then `後半で濃度調整`. |
| Ice History Detail prioritizes `ICE` before `ALL` | `T-ICE-001`, `T-ICE-002` | Pass; browser showed `湯温で苦味を調整`, then `1・2投目で味調整`. |
| Hybrid `R-08` History Detail prioritizes `HYB_NEW` before `ALL` | `T-HYB-NEW-001`, `T-HYB-NEW-002` | Pass; browser showed `低温で雑味を抑える`, then `水量は温度目安で`. |
| THE NEO BREW `R-09` History Detail prioritizes `NEO` before `ALL` | `T-NEO-002`, `T-NEO-003` | Pass; browser showed `回数で質感を狙う`, then `3分半までかける`. |
| visible History Detail tips capped to 2 | maximum two items | Pass; `.slice(0, 2)` and all four browser cases showed exactly two. |
| source order preserved within recipe-specific group | source order | Pass; helper/filter order is unchanged and browser text matched the first two source items. |
| source order preserved within global group | source order | Pass; helper/filter order is unchanged. |
| `contentShortJa` used | exact source short content | Pass; browser strings matched source short fields. |
| `contentJa` fallback only | `contentShortJa || contentJa` | Pass; static implementation. |
| no source text rewritten | exact source field render | Pass. |

## 9. Global Fallback QA

| Required case | Result |
| --- | --- |
| unknown mapping shows `ALL` History Detail tips only | Pass; local mapping returns `ALL`, recipe-specific selection stays empty, and only `T-ALL-001` is eligible. |
| global items are filler only for mapped recipes | Pass; concatenation places globals after recipe-specific items. |
| visible cap remains two after filler | Pass. |
| global source order preserved | Pass; filtering does not reorder source items. |
| current selectable unknown-mapping browser case | Not available; current selectable app variants map to `406`, `ICE`, `HYB_NEW`, or `NEO`. Static mapping/selection audit passed. |

## 10. Quarantine Exclusion QA

| Check | Result |
| --- | --- |
| local mapping can return `OTHER` | Pass; no. |
| `OTHER` / quarantine visible | Pass; no. PR-015A display-helper exclusion remains in use. |
| current excluded History Detail source candidates | None; helper exclusion still applies to future items. |
| source URLs visible | Pass; no link or source field is rendered. |
| source titles visible | Pass; no. |
| source timecodes visible | Pass; no. |
| `whyJa` visible | Pass; no. |

## 11. 375px Mobile QA

Browser QA viewport: `375x667`.

| Check | Result |
| --- | --- |
| no horizontal overflow | Pass; document `scrollWidth` equaled `clientWidth` (`360`) on 4:6, Ice, Hybrid `R-08`, and THE NEO BREW History Detail. |
| summary card remains readable | Pass. |
| POINT / TIPS remains compact | Pass; each live mapped case showed two compact rows. |
| condition card remains readable and reachable | Pass. |
| taste record remains readable and reachable | Pass. |
| rebrew CTA remains reachable | Pass; CTA was present, enabled, and successfully navigated for THE NEO BREW. |
| back navigation remains valid | Pass; History Detail back link still targets `/history`. |
| bottom-tab behavior unchanged | Pass; existing Brew, History, and Settings tabs remained present. |
| no `#007AFF` | Pass; no occurrence in `src`. |
| no frame / device mock border | Pass; app shell computed border remained `0px none`. |
| warm cream / charcoal / muted amber direction preserved | Pass; existing palette and visual direction remain unchanged. |

## 12. History Detail Behavior Regression QA

| Required check | Result |
| --- | --- |
| missing session redirect unchanged | Pass; `/history/not-a-real-session` redirected to `/history`. |
| summary display unchanged | Pass; no existing summary code changed. |
| condition display unchanged | Pass; no existing condition code changed. |
| taste tag display unchanged | Pass; no diff. |
| rating display unchanged | Pass; no diff. |
| memo display unchanged | Pass; no diff. |
| elapsed time display unchanged | Pass; no diff. |
| rebrew CTA unchanged | Pass; existing CTA remained enabled and reachable. |
| `onReplayBrew` payload unchanged except existing `createdAt` refresh | Pass; replay handler has no diff. |
| navigation to setup after rebrew unchanged | Pass; THE NEO BREW replay navigated to `/setup/ten-pour` with the saved variant shown. |
| saved session shape unchanged | Pass; no type/storage diff. |
| localStorage schema unchanged | Pass; no repository/storage diff. |

## 13. Existing Method Regression QA

| Check | Result |
| --- | --- |
| 4:6 existing flow unchanged | Pass; setup-to-Timer-to-Finish-to-History Detail flow worked. |
| Ice Brew existing flow unchanged | Pass; setup-to-Timer-to-Finish-to-History Detail flow worked. |
| Hybrid `R-08` existing flow unchanged | Pass; setup-to-Timer-to-Finish-to-History Detail flow worked. |
| THE NEO BREW `R-09` existing flow unchanged | Pass; setup-to-Timer-to-Finish-to-History Detail and replay flow worked. |
| History list unchanged | Pass; no diff and browser list contained no POINT / TIPS integration. |
| Recipe Setup unchanged | Pass; no diff. |
| Timer unchanged | Pass; no diff. |
| Finish unchanged | Pass; no diff. |
| Settings unchanged | Pass; no diff. |
| routes unchanged | Pass; no diff. |

## 14. No Runtime-Data-Change Confirmation

Pass. No recipe/method runtime data, tips source JSON, tips helper/type, recipe
value, method schedule, timer calculation, exact gate, fallback logic,
`sourceStatus`, `verificationLevel`, `valuesArePlaceholder`, or `isPlaceholder`
field changed.

## 15. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `main` matched expected `e75df10` | Pass |
| existing test command available without adding dependencies | None |
| existing lint command available without adding dependencies | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; only the three allowed files are present. |
| `git diff --stat` | Pass; only the three allowed files are present. |
| prohibited-file audit | Pass; no tips source/helper/type, recipe data, package, lockfile, PWA, release, or dist file is included. |

## 16. Findings

Pass. History Detail now shows up to two recipe-prioritized, source-preserved
short tips between the saved-brew summary and conditions without changing the
saved record, replay behavior, navigation, storage, or runtime data.

## 17. Remaining Risks

* All current mapped recipe groups have at least two History Detail tips, so
  global filler order is enforced by the selection rule but is not visible for
  those groups with the current source data.
* There is no current selectable app variant that reaches the unknown mapping,
  so the `ALL`-only case is confirmed through the local fallback and static
  source-selection audit.
* The repository has no existing lint or test script, so verification relies on
  the production build, static diff/source-data audits, and browser regression
  QA.

## 18. Independent Verifier Prompt

```text
Independently verify PR-015F against main after PR-015E.

Pass only if:
- History Detail POINT / TIPS UI is limited to History Detail
- no History list integration is included
- recipe-specific historyDetail tips are prioritized before global historyDetail tips
- global tips are only filler
- visible tips are capped to 2
- source order is preserved within each group
- OTHER / quarantine tips are not visible
- contentShortJa is used without rewriting source content
- whyJa, source URLs, source titles, and timecodes are not shown
- no interaction, randomization, automatic note generation, editing, or deletion is introduced
- saved session data is not mutated
- replay setup payload remains unchanged except existing createdAt refresh
- 375px layout has no horizontal overflow
- summary, conditions, taste record, and rebrew CTA remain reachable
- missing session redirect remains unchanged
- localStorage schema remains unchanged
- no Recipe Setup / Timer / Finish / History list / Settings / route / PWA / package / dist changes are included unless strictly documented as styling only
- no recipe values, schedules, exact gates, fallback logic, or source/provenance flags are changed
- 4:6, Hybrid, THE NEO BREW, and Ice Brew behavior remains unchanged
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 19. Regression Checker Prompt

```text
Run regression-only review of PR-015F.

Confirm:
- no recipe data changed
- no timing changed
- no exact gate broadening
- no arbitrary scaling
- no source/provenance weakening
- no tips source JSON changes
- no tips type/data helper changes unless strictly required
- no saved session data changed
- no localStorage schema changed
- no replay setup payload changed beyond existing createdAt refresh
- no rebrew navigation changed
- no missing-session redirect changed
- no method/variant display changed
- no setup field display changed
- no elapsed time display changed
- no taste tag display changed
- no rating display changed
- no memo display changed
- no Recipe Setup behavior changes
- no Timer behavior changes
- no Finish behavior changes
- no History list behavior changes
- no Settings behavior changes
- no route changes
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

PR-015F keeps History Detail mapping and selection local to
`HistoryDetailPage.tsx`. Future displayable History Detail source additions
automatically receive recipe-first priority, global filler, and the two-item cap
without changing saved-session or replay behavior. Continue using the PR-015A
display helper so quarantine / `OTHER` exclusion remains centralized.
