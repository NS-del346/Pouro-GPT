# PR-015E: POINT/TIPS Finish UI Integration QA

## 1. Purpose

Surface up to two compact, read-only POINT / TIPS items on Brew Finish so the
user can reflect on the completed brew before writing their own tasting and
adjustment notes.

## 2. Scope

* add a local conservative `BrewSetup` to `CoffeeTipRecipeCode` mapping
* consume PR-015A data through `getTipsForDisplayContext("finish", recipeCode)`
* prioritize recipe-specific finish tips before global `ALL` filler tips
* show at most two source-preserved short items on Brew Finish only
* place the compact section after the summary and before taste inputs
* add only the small Finish-specific style needed for the compact section

No tips source data, tips helper/type, recipe data, schedule, timer calculation,
exact gate, fallback, source/provenance flag, save/discard behavior, result
shape, localStorage schema, Recipe Setup, Timer, History, History Detail,
Settings, route, PWA, package, release, or dist change is in scope.

## 3. Files Changed

* `src/pages/BrewFinishPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-015E-point-tips-finish-ui-integration.md`

## 4. Mapping Table

| Finished setup | Current ID gate | recipeCode |
| --- | --- | --- |
| 4:6 Method | `methodId === "four-six"` | `406` |
| Ice Brew | `methodId === "ice-brew"` | `ICE` |
| New Hybrid | `methodId === "hybrid"` and `variantId === "R-08"` | `HYB_NEW` |
| THE NEO BREW | `methodId === "ten-pour"` and `variantId === "R-09"` | `NEO` |
| Unknown mapping | any unmatched setup | `ALL` |

No mapping is invented for Hybrid base or Hybrid devil. The local helper never
returns `OTHER`.

## 5. Finish Selection Rule

```ts
const finishTips = [...recipeSpecificFinishTips, ...globalFinishTips].slice(0, 2);
```

Recipe-specific finish tips are filtered into their source-order group first.
Displayable global `ALL` finish tips remain in source order and fill only the
remaining visible slots. The final slice fixes the visible cap at two with no
randomization.

Current source-data selection:

| Mapping | Current displayable finish source items |
| --- | --- |
| `406` | `P-406-002` |
| `ICE` | `P-ICE-004`, `T-ICE-003` |
| `HYB_NEW` | none |
| `NEO` | `T-NEO-003` |
| `ALL` | none |

Because the current source has no `ALL` finish items, mapped groups currently
receive no global filler. Unknown mappings and `HYB_NEW` currently render no
section, as required when no finish tips exist.

## 6. UI Placement

The Finish-only section is rendered in DOM order:

```text
summary
POINT / TIPS
taste impression
rating
next adjustment memo
free memo
save / discard CTA
```

At `375x667`, browser QA confirmed the tip section was form child index `1`
and the taste section was index `2`.

The section shows only:

* `POINT / TIPS`
* the source `POINT` or `TIPS` type label
* `contentShortJa`, with `contentJa` only as an empty-short-content fallback

It shows no `whyJa`, source URL, source title, timecode, explanation, or
interaction.

## 7. Reflection-Surface Constraints

| Check | Result |
| --- | --- |
| passive reference text only | Pass; no buttons, links, modal, accordion, tooltip, or generated text. |
| taste fields begin empty | Pass; all three textarea values were empty on every new Finish page. |
| taste tags begin unchanged | Pass. |
| rating default remains unselected | Pass. |
| no automatic memo generation | Pass. |
| no automatic save | Pass. |
| user-entered text remains editable | Pass; browser QA filled all three textareas independently. |

## 8. Recipe-Specific Priority QA

| Required case | Expected current selection | Result |
| --- | --- | --- |
| 4:6 finish prioritizes `406` before `ALL` | `P-406-002` | Pass; browser showed one `406` source item. |
| Ice finish prioritizes `ICE` before `ALL` | `P-ICE-004`, `T-ICE-003` | Pass; browser showed both recipe-specific items in source order. |
| Hybrid `R-08` finish prioritizes `HYB_NEW` before `ALL` | no current item | Pass; current `HYB_NEW` and `ALL` finish groups are empty, so no section rendered. |
| THE NEO BREW `R-09` finish prioritizes `NEO` before `ALL` | `T-NEO-003` | Pass; browser showed one `NEO` source item. |
| visible finish tips capped to 2 | maximum two items | Pass; enforced by `.slice(0, 2)` and Ice browser QA showed exactly two. |
| source order preserved within recipe-specific group | source order | Pass; `.filter(...)` preserves helper/source order. |
| source order preserved within global group | source order | Pass; `.filter(...)` preserves helper/source order; current group is empty. |
| `contentShortJa` used | source short content | Pass; browser strings exactly matched current source short content. |
| `contentJa` fallback only | `contentShortJa || contentJa` | Pass; static implementation. |
| no source text rewritten | exact source field render | Pass. |

## 9. Global Fallback QA

| Required case | Result |
| --- | --- |
| unknown mapping shows `ALL` finish tips only | Pass; local mapping returns `ALL`, the recipe-specific group stays empty, and only the `ALL` group is eligible. |
| unknown mapping renders nothing when no `ALL` finish tip exists | Pass; current `ALL` finish group is empty. |
| global items are filler only for mapped recipes | Pass; concatenation order places globals after recipe-specific items. |
| visible cap remains two after filler | Pass. |
| global source order preserved | Pass; filter order is unchanged. |

## 10. Quarantine Exclusion QA

| Check | Result |
| --- | --- |
| local mapping can return `OTHER` | Pass; no. |
| `OTHER` / quarantine visible | Pass; no. PR-015A display helper exclusion remains in use. |
| current excluded finish source items | None; helper exclusion still applies to future items. |
| source URLs visible | Pass; no link or source field is rendered. |
| source titles visible | Pass; no. |
| source timecodes visible | Pass; no. |
| `whyJa` visible | Pass; no. |

## 11. 375px Mobile QA

Browser QA viewport: `375x667`.

| Check | Result |
| --- | --- |
| no horizontal overflow | Pass; `scrollWidth` equaled `clientWidth` (`360`) on 4:6, Ice, Hybrid `R-08`, and THE NEO BREW Finish pages. |
| summary card remains readable | Pass. |
| POINT / TIPS remains compact | Pass; 4:6 and NEO showed one row, Ice showed two rows, and Hybrid omitted the empty section. |
| taste tags remain usable | Pass; browser QA selected a taste tag. |
| rating buttons remain usable | Pass; browser QA selected a rating. |
| next adjustment memo remains reachable | Pass; browser QA filled the field. |
| free memo remains reachable | Pass; browser QA filled the field. |
| save CTA remains reachable | Pass; browser QA saved and navigated to History Detail. |
| discard CTA remains reachable | Pass; browser QA discarded Hybrid and returned to Brew. |
| bottom-tab behavior unchanged | Pass; Finish continued to omit bottom tabs and no navigation styling changed. |
| no `#007AFF` | Pass; no occurrence in `src`. |
| no frame / device mock border | Pass; app shell computed border remained `0px none`. |
| warm cream / charcoal / muted amber direction preserved | Pass; existing palette and visual direction remain unchanged. |

## 12. Finish Behavior Regression QA

| Required check | Result |
| --- | --- |
| taste note selection unchanged | Pass; browser QA selected a taste tag and no selection code changed. |
| rating behavior unchanged | Pass; browser QA selected a rating and no rating code changed. |
| taste impression textarea unchanged | Pass; browser QA filled it and state code is unchanged. |
| next adjustment textarea unchanged | Pass; browser QA filled it and state code is unchanged. |
| free memo textarea unchanged | Pass; browser QA filled it and state code is unchanged. |
| save behavior unchanged | Pass; save code is unchanged. |
| navigation after save unchanged | Pass; browser QA navigated to the generated `/history/:id` route. |
| discard behavior unchanged | Pass; browser QA returned to Brew. |
| result data type unchanged | Pass; no diff. |
| localStorage schema unchanged | Pass; no storage/repository/type diff. |

## 13. Existing Method Regression QA

| Check | Result |
| --- | --- |
| 4:6 existing flow unchanged | Pass; setup-to-Timer-to-Finish-to-History Detail flow worked. |
| Ice Brew existing flow unchanged | Pass; setup-to-Timer-to-Finish flow worked. |
| Hybrid `R-08` existing flow unchanged | Pass; setup-to-Timer-to-Finish-to-discard flow worked. |
| THE NEO BREW `R-09` existing flow unchanged | Pass; setup-to-Timer-to-Finish flow worked. |
| Recipe Setup unchanged | Pass; no diff. |
| Timer unchanged | Pass; no diff. |
| History unchanged | Pass; no diff. |
| History Detail unchanged | Pass; no diff. |
| Settings unchanged | Pass; no diff. |
| routes unchanged | Pass; no diff. |

## 14. No Runtime-Data-Change Confirmation

Pass. No recipe/method runtime data, tips source JSON, tips helper/type, recipe
value, method schedule, exact gate, fallback logic, `sourceStatus`,
`verificationLevel`, `valuesArePlaceholder`, or `isPlaceholder` field changed.

## 15. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `main` matched expected `9c0b72e` | Pass |
| existing test command available without adding dependencies | None |
| existing lint command available without adding dependencies | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; only the three allowed files are present. |
| `git diff --stat` | Pass; only the three allowed files are present. |
| prohibited-file audit | Pass; no tips data/helper/type, recipe data, package, lockfile, PWA, release, or dist file is included. |

## 16. Findings

Pass. Brew Finish now shows up to two recipe-prioritized, source-preserved
short tips between the completed-brew summary and the user's reflection
inputs, without changing reflection state, save/discard behavior, navigation,
storage, or runtime data.

## 17. Remaining Risks

* The current source dataset has no `HYB_NEW` or `ALL` finish-context items, so
  those paths correctly render no section today. Their ordering and fallback
  behavior are enforced by the shared selection rule and static audit.
* There is no separate unknown-selection route in the current UI, so unknown
  mapping is confirmed through the local fallback and static selection audit.
* The repository has no existing lint or test script, so verification relies
  on the production build, static diff audit, source-data selection audit, and
  browser regression QA.

## 18. Independent Verifier Prompt

```text
Independently verify PR-015E against main after PR-015D.

Pass only if:
- Finish POINT / TIPS UI is limited to Brew Finish
- no History Detail integration is included
- recipe-specific finish tips are prioritized before global finish tips
- global tips are only filler
- visible tips are capped to 2
- source order is preserved within each group
- OTHER / quarantine tips are not visible
- contentShortJa is used without rewriting source content
- whyJa, source URLs, source titles, and timecodes are not shown
- no interaction, randomization, or automatic memo generation is introduced
- no textarea is prefilled
- 375px layout has no horizontal overflow
- taste tags, rating buttons, memo fields, save CTA, and discard CTA remain reachable
- save/discard/navigation behavior remains unchanged
- localStorage schema remains unchanged
- no Recipe Setup / Timer / History / History Detail / Settings / route / PWA / package / dist changes are included unless strictly documented as styling only
- no recipe values, schedules, exact gates, fallback logic, or source/provenance flags are changed
- 4:6, Hybrid, THE NEO BREW, and Ice Brew behavior remains unchanged
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 19. Regression Checker Prompt

```text
Run regression-only review of PR-015E.

Confirm:
- no recipe data changed
- no timing changed
- no exact gate broadening
- no arbitrary scaling
- no source/provenance weakening
- no tips source JSON changes
- no tips type/data helper changes unless strictly required
- no save behavior changed
- no discard behavior changed
- no navigation after save changed
- no result data type changed
- no localStorage schema changed
- no taste tag behavior changed
- no rating behavior changed
- no textarea state behavior changed
- no Recipe Setup behavior changes
- no Timer behavior changes
- no History behavior changes
- no History Detail behavior changes
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

PR-015E keeps Finish mapping and selection local to `BrewFinishPage.tsx`.
Future displayable finish source additions automatically receive recipe-first
priority, global filler, and the two-item cap without changing Finish save or
reflection behavior. Continue using the PR-015A display helper so quarantine /
`OTHER` exclusion remains centralized.
