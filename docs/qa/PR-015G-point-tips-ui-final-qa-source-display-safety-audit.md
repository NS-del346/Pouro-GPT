# PR-015G: POINT/TIPS UI Final QA / Source Display Safety Audit

## 1. Purpose

Perform final QA and a source-display safety audit for the POINT / TIPS UI
introduced across PR-015A through PR-015F.

This is a documentation-only audit. It verifies the current implementation
without changing POINT / TIPS behavior, source data, recipes, timers, gates,
fallbacks, storage, navigation, or legal text.

Overall result: **Pass**

## 2. Scope

Audited:

* data source usage and safe helper filtering
* the four intended display contexts
* conservative recipe-code mapping
* visible item caps
* recipe-specific priority and global filler behavior
* quarantine / `OTHER` exclusion
* source-field suppression and source-text preservation
* 375x667 mobile behavior
* non-official / legal expression safety
* regression safety for recipes, gates, fallback logic, storage, navigation,
  package/PWA files, and release files

No runtime or source-data change is included.

## 3. Files audited

Required audit targets:

* `docs/research/coffee_app_tips_master_v2.json`
* `src/types/tips.ts`
* `src/data/tips.ts`
* `src/pages/RecipeSetupPage.tsx`
* `src/pages/BrewTimerPage.tsx`
* `src/pages/BrewFinishPage.tsx`
* `src/pages/HistoryDetailPage.tsx`
* `src/styles/index.css`

Supporting regression and legal-positioning references:

* `src/App.tsx`
* `src/components/layout/AppShell.tsx`
* `src/repositories/brewHistoryRepository.ts`
* `src/pages/HistoryPage.tsx`
* `src/pages/AboutPage.tsx`
* `src/pages/LegalPage.tsx`
* `src/pages/SourcesPage.tsx`
* `src/data/placeholderMethods.ts`
* `package.json`
* PR-015A through PR-015F QA documents

## 4. Files changed

Only:

* `docs/qa/PR-015G-point-tips-ui-final-qa-source-display-safety-audit.md`

Result: **Pass; docs-only**

## 5. Display-context audit

| Surface | Required context | Current usage | Result |
| --- | --- | --- | --- |
| Recipe Setup | `setup` | `getTipsForDisplayContext("setup", ...)` | Pass |
| Brew Timer | `timer` | `getTipsForDisplayContext("timer", ...)` | Pass |
| Brew Finish | `finish` | `getTipsForDisplayContext("finish", ...)` | Pass |
| History Detail | `historyDetail` | `getTipsForDisplayContext("historyDetail", ...)` | Pass |

No page uses the wrong context. Static search found POINT / TIPS UI only in the
four intended page modules. History list, Settings, and other pages do not
render POINT / TIPS.

## 6. Item-cap audit

| Surface | Required visible cap | Current implementation | Browser-observed maximum | Result |
| --- | ---: | --- | ---: | --- |
| Recipe Setup | 2 | `.slice(0, 2)` | 2 | Pass |
| Brew Timer | 1 | first concatenated item, `[0]` | 1 | Pass |
| Brew Finish | 2 | `.slice(0, 2)` | 1 in checked 4:6 flow; static cap 2 | Pass |
| History Detail | 2 | `.slice(0, 2)` | 2 | Pass |

There is no randomization, rotation, modal, accordion, tooltip, or settings
toggle that can expose additional items.

## 7. Recipe-code mapping audit

All four page-local mapping helpers use the same conservative mapping:

| App selection | recipeCode | Result |
| --- | --- | --- |
| `four-six` | `406` | Pass |
| `ice-brew` | `ICE` | Pass |
| `hybrid` plus `R-08` | `HYB_NEW` | Pass |
| `ten-pour` plus `R-09` | `NEO` | Pass |
| unknown / unmatched | `ALL` | Pass |

No surface maps to `OTHER`. No mapping is invented for Hybrid base or Hybrid
devil because no current selectable IDs explicitly represent those variants.

## 8. Priority / fallback audit

Every surface constructs a recipe-specific source-order group first and a
global `ALL` source-order group second. The final cap is applied after the
groups are concatenated.

Result:

* recipe-specific tips are selected first: **Pass**
* global `ALL` tips are filler only: **Pass**
* source order within the recipe-specific group is preserved: **Pass**
* source order within the global group is preserved: **Pass**
* unknown mappings use `ALL` only: **Pass**
* mapped recipes use global tips only when recipe-specific items leave open
  visible slots: **Pass**

Current display selections from the 37-item master:

| Context | `ALL` | `406` | `ICE` | `HYB_NEW` | `NEO` |
| --- | --- | --- | --- | --- | --- |
| setup | `P-ALL-001`, `P-ALL-002` | `P-ALL-001`, `P-ALL-002` | `P-ICE-001`, `P-ALL-001` | `P-ALL-001`, `P-ALL-002` | `T-NEO-001`, `P-ALL-001` |
| timer | `P-ALL-003` | `P-406-001` | `P-ICE-002` | `P-HYB-NEW-001` | `P-NEO-001` |
| finish | none | `P-406-002` | `P-ICE-004`, `T-ICE-003` | none | `T-NEO-003` |
| historyDetail | `T-ALL-001` | `T-406-001`, `T-406-002` | `T-ICE-001`, `T-ICE-002` | `T-HYB-NEW-001`, `T-HYB-NEW-002` | `T-NEO-002`, `T-NEO-003` |

Current data lacks recipe-specific setup items for `406` and `HYB_NEW`, so
their two setup slots correctly use global items. Current data has no global
finish items and no `HYB_NEW` finish item, so unknown and New Hybrid Finish
correctly render no POINT / TIPS section.

## 9. Quarantine / OTHER exclusion audit

`src/data/tips.ts` enforces display safety through `isDisplayableTip()`:

* rejects `recipeCode === "OTHER"`
* rejects `scope === "quarantine"`
* rejects `appAdoption === "quarantine"`
* rejects items whose `displayContext` includes `quarantine`
* returns an empty array from `getTipsForRecipeCode("OTHER")`

All four surfaces consume `getTipsForDisplayContext(...)`. No UI surface
imports or directly renders unfiltered `coffeeTipItems`.

The current master contains one excluded item, `P-OTHER-001`, and it is blocked
by all four exclusion conditions relevant to the item.

Result: **Pass**

## 10. Source-field suppression audit

The compact POINT / TIPS sections render only:

* `tip.type`
* `tip.contentShortJa || tip.contentJa`

They do not render:

* `whyJa`
* source URL
* source title
* source timecode
* raw transcript
* source notes
* verification notes
* confidence or verification metadata

Browser QA found no links inside any checked POINT / TIPS section.

Result: **Pass**

## 11. Source-text preservation audit

All four surfaces render the source-preserved field expression:

```ts
tip.contentShortJa || tip.contentJa
```

UI logic does not concatenate, rewrite, summarize, or paraphrase source fields.
The only general UI labels are `POINT / TIPS` and the source-provided `POINT`
or `TIPS` type.

Result: **Pass**

## 12. Surface-by-surface QA

### 12.1 Recipe Setup

| Check | Result |
| --- | --- |
| integration limited to Recipe Setup for the setup context | Pass |
| uses `setup` context | Pass |
| visible cap 2 | Pass |
| recipe-specific before `ALL` | Pass |
| `OTHER` / quarantine excluded | Pass |
| source URLs/timecodes/metadata hidden | Pass |
| `contentShortJa` with `contentJa` fallback | Pass |
| no source-text rewrite | Pass |
| setup controls usable | Pass; 4:6 variant selection was exercised |
| primary CTA reachable | Pass; enabled and successfully opened Timer |

375px mapped-route sweep:

| Route | Visible tips | Result |
| --- | --- | --- |
| 4:6 | `P-ALL-001`, `P-ALL-002` text | Pass |
| Ice Brew | `P-ICE-001`, `P-ALL-001` text | Pass |
| New Hybrid | `P-ALL-001`, `P-ALL-002` text | Pass |
| THE NEO BREW | `T-NEO-001`, `P-ALL-001` text | Pass |

### 12.2 Brew Timer

| Check | Result |
| --- | --- |
| integration limited to Brew Timer for the timer context | Pass |
| uses `timer` context | Pass |
| visible cap 1 | Pass |
| recipe-specific before `ALL` | Pass |
| `OTHER` / quarantine excluded | Pass |
| source URLs/timecodes/metadata hidden | Pass |
| `contentShortJa` with `contentJa` fallback | Pass |
| no source-text rewrite | Pass |
| timer remains visually dominant | Pass; timer measured 89.6px and occupied the dominant central treatment |
| current pour / cumulative water readable | Pass; checked placeholder-safe labels remained readable |
| Start / Pause / Resume / Next / Back / Finish | Pass; all exercised successfully |

### 12.3 Brew Finish

| Check | Result |
| --- | --- |
| integration limited to Brew Finish for the finish context | Pass |
| uses `finish` context | Pass |
| visible cap 2 | Pass |
| recipe-specific before `ALL` | Pass |
| `OTHER` / quarantine excluded | Pass |
| source URLs/timecodes/metadata hidden | Pass |
| `contentShortJa` with `contentJa` fallback | Pass |
| no source-text rewrite | Pass |
| no textarea prefill | Pass; all three textareas were empty on entry |
| no automatic memo generation | Pass |
| taste tags usable | Pass; a taste tag was selected |
| rating usable | Pass; rating 5 was selected |
| memo fields usable | Pass; all three fields accepted QA input |
| save / history navigation | Pass; save opened the generated History Detail |
| discard navigation | Pass; a second flow returned to Brew without saving |

### 12.4 History Detail

| Check | Result |
| --- | --- |
| integration limited to History Detail for the `historyDetail` context | Pass |
| uses `historyDetail` context | Pass |
| visible cap 2 | Pass |
| recipe-specific before `ALL` | Pass |
| `OTHER` / quarantine excluded | Pass |
| source URLs/timecodes/metadata hidden | Pass |
| `contentShortJa` with `contentJa` fallback | Pass |
| no source-text rewrite | Pass |
| saved session data mutation | Pass; display is read-only and no repository write occurs |
| rebrew payload | Pass; existing setup spread plus `createdAt` refresh only |
| rebrew navigation | Pass; returned to the saved 4:6 / sweet-focused setup |

375px saved-record sweep:

| Saved mapping | Visible tips | Result |
| --- | --- | --- |
| `406` | `T-406-001`, `T-406-002` text | Pass |
| `ICE` | `T-ICE-001`, `T-ICE-002` text | Pass |
| `HYB_NEW` | `T-HYB-NEW-001`, `T-HYB-NEW-002` text | Pass |
| `NEO` | `T-NEO-002`, `T-NEO-003` text | Pass |

## 13. 375px mobile QA

Browser viewport: `375x667`.

| Check | Recipe Setup | Brew Timer | Brew Finish | History Detail |
| --- | --- | --- | --- | --- |
| no horizontal overflow | Pass; `360 == 360` | Pass; `360 == 360` | Pass; `360 == 360` | Pass; `360 == 360` |
| primary CTA / controls reachable | Pass | Pass; sticky controls within viewport | Pass; save/discard reachable by scroll | Pass; rebrew reachable by scroll |
| bottom-tab behavior unchanged | Pass; fixed | Pass; intentionally hidden | Pass; intentionally hidden | Pass; fixed |
| POINT / TIPS compact | Pass | Pass | Pass | Pass |

Additional mobile checks:

* Recipe Setup controls remained usable and all four mapped setup routes had no
  overflow.
* Timer remained visually dominant; current pour and cumulative water stayed
  readable; controls remained reachable.
* Finish taste tags, rating, memo fields, save, and discard were usable.
* History Detail summary, conditions, taste record, and rebrew CTA were
  readable/reachable. All four mapped saved records had no overflow.
* History list remained unchanged and contained no POINT / TIPS section.
* App shell computed border was `0px none`; no device frame / mock border.
* No `#007AFF` occurrence exists in `src`.
* Existing warm cream, charcoal, and muted amber palette variables remain in
  use. No styling file changes are included.

Result: **Pass**

## 14. Legal / source safety audit

The POINT / TIPS compact UI does not state or imply:

* official endorsement
* supervision
* partnership
* complete reproduction
* guaranteed source-method accuracy or guaranteed result

The existing non-official stance remains intact in About, Legal, Sources, and
the narrow source-backed runtime notices. The master itself instructs against
official-approval, complete-reproduction, and guaranteed-result wording.

The compact UI renders only short guidance from the preserved source fields. It
does not expose source titles or creator branding as an endorsement signal, and
it adds no new explanatory or definitive copy.

Lower-confidence displayable cases:

| Case | Verification | Safety result |
| --- | --- | --- |
| unknown/global Timer fallback `P-ALL-003` | `researched_summary`, medium | Pass; short general measurement guidance, not official or definitive |
| New Hybrid History Detail filler `T-HYB-NEW-002` | `researched_summary`, medium | Pass; short adjustment guidance, not official or definitive |

No legal text is changed in this PR.

Result: **Pass**

## 15. Regression audit

The PR diff changes only this QA document. It does not change:

* recipe or method data
* timer calculations
* exact gate logic
* fallback logic
* `1:45 / 210g`
* about `3:30` semantics
* `sourceStatus`, `verificationLevel`, `valuesArePlaceholder`, or
  `isPlaceholder`
* tips source JSON, types, or helpers
* localStorage schema or repository behavior
* routes or navigation
* Service Worker, manifest, icons, package files, lockfile, dist, or release
  docs

Browser regression checks passed for Recipe Setup start; Timer
Start/Pause/Resume/Next/Back/Finish; Finish input/save/discard/navigation;
History list; History Detail display/rebrew; and bottom-tab behavior.

Result: **Pass**

## 16. Build / static checks

| Check | Result |
| --- | --- |
| baseline expected `c7ecdc1` | Pass |
| baseline matched `origin/main` | Pass; `0 0` ahead/behind |
| existing test command without adding dependencies | None |
| existing lint command without adding dependencies | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; only this QA document |
| `git diff --stat` | Pass; only this QA document |
| prohibited-file audit | Pass |

## 17. Findings

**Blocking findings: none**

Non-blocking findings:

* The current master has no recipe-specific setup items for `406` or
  `HYB_NEW`; those mapped routes correctly use global filler for both slots.
* The current master has no global finish items and no `HYB_NEW` finish item;
  those Finish cases correctly render no POINT / TIPS section.
* The global Timer fallback `P-ALL-003` and New Hybrid History Detail item
  `T-HYB-NEW-002` are `researched_summary` / medium confidence. Their compact
  wording is safe and non-definitive, but future source upgrades should retain
  the current non-official positioning.

## 18. Remaining risks

* No current selectable app route reaches an unknown recipe-code mapping, so
  the `ALL`-only unknown case is verified statically.
* Hybrid base and Hybrid devil remain intentionally unmapped because selectable
  IDs do not exist.
* Empty future `contentShortJa` values would expose the longer preserved
  `contentJa` fallback; the field remains source-preserved and safe, but future
  data additions should be checked for compactness.
* The repository has no test or lint script. Verification relies on production
  build, static source/diff audit, structured master-data audit, and browser QA.

## 19. Follow-up recommendations

No corrective follow-up PR is required.

Optional future work, only when supported by approved source data:

* add recipe-specific setup items for `406` and `HYB_NEW`
* add approved global or `HYB_NEW` finish items if a Finish fallback is desired
* upgrade evidence for the two current `researched_summary` / medium-confidence
  visible cases

Do not invent Hybrid base/devil mappings or weaken quarantine filtering to fill
current data gaps.

## 20. Independent verifier prompt

```text
Independently verify PR-015G against main after PR-015F.

Pass only if:
- PR-015G changes only docs/qa/PR-015G-point-tips-ui-final-qa-source-display-safety-audit.md
- Recipe Setup, Brew Timer, Brew Finish, and History Detail POINT / TIPS surfaces are all audited
- each surface uses the correct display context: setup, timer, finish, historyDetail
- caps are correct: Setup 2, Timer 1, Finish 2, History Detail 2
- recipe-specific tips are prioritized before global tips
- global tips are filler only
- OTHER / quarantine entries are not displayable
- compact UI does not render whyJa, source URLs, source titles, or timecodes
- compact UI uses contentShortJa with contentJa fallback only
- source text is not rewritten
- 375px mobile QA is recorded
- legal / non-official / source-safety audit is recorded
- no app code, data, route, storage, recipe, timer, PWA, package, release, or dist files change
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 21. Regression checker prompt

```text
Run regression-only review of PR-015G.

Confirm:
- docs-only PR
- no source code changes
- no tips source JSON changes
- no tips helper/type changes
- no recipe data changes
- no method data changes
- no timer calculations changed
- no exact gate broadening
- no arbitrary scaling
- no fallback logic changed
- no source/provenance weakening
- no localStorage schema changed
- no routes changed
- no PWA / service worker / manifest / icon changes
- no package or lockfile changes
- no release doc changes
- no dist files
- no UI behavior changes
- npm.cmd run build passes
- git diff --check passes

Fail on any prohibited file or behavior change.
```

## 22. Memory / handoff

PR-015G is the final documentation-only QA pass for PR-015A through PR-015F.
The current implementation is safe to hand off with no blocking findings:

* keep all four page-local mappings conservative and identical
* keep recipe-specific items before global filler
* keep the current visible caps
* continue consuming `getTipsForDisplayContext(...)`
* never directly render unfiltered `coffeeTipItems`
* preserve `contentShortJa || contentJa` without UI rewriting
* keep source metadata suppressed in compact UI
* preserve the existing non-official / non-guarantee positioning

Future defects should be fixed in a separate follow-up PR, not by changing this
audit document.
