# PR-013F: THE NEO BREW Fixed Runtime Candidate QA

## 1. Purpose

This PR implements only the exact `20g / 300g / 1:15` THE NEO BREW / R-09
runtime candidate.

## 2. Scope

* Adds an exact setup gate for `ten-pour` / `R-09`.
* Adds the fixed 10-pour schedule and preserves `1:45 / 210g`.
* Keeps about `3:30` as approximate completion/drawdown guidance.
* Applies conservative field evidence classifications.
* Falls back to the existing placeholder recipe for every non-exact setup.
* Adds no scaling and changes no unrelated method behavior.

## 3. Files changed

* `src/data/placeholderMethods.ts`
* `src/pages/RecipeSetupPage.tsx`
* `src/pages/BrewTimerPage.tsx`
* `src/types/source.ts`
* `src/utils/provenance.ts`
* `docs/qa/PR-013F-the-neo-brew-fixed-runtime-candidate.md`

`src/utils/provenance.ts` adds display labels required by the two new
evidence-provenance enum values.

## 4. Runtime behavior QA

| Check                                                     | Result |
| --------------------------------------------------------- | ------ |
| `ten-pour` exact 20g / 300g / 1:15 returns R-09 candidate | Pass   |
| non-exact dose falls back to placeholder                  | Pass   |
| non-exact water falls back to placeholder                 | Pass   |
| non-exact ratio falls back to placeholder                 | Pass   |
| no arbitrary scaling                                      | Pass   |
| schedule has 10 pours                                     | Pass   |
| schedule includes 1:45 / 210g                             | Pass   |
| schedule ends 2:30 / 300g                                 | Pass   |
| about 3:30 is approximate guidance only                   | Pass   |
| first step not over-labeled as unsupported Bloom          | Pass   |
| filter not invented                                       | Pass   |
| equipment copy narrow                                     | Pass   |
| unofficial / no affiliation copy preserved                | Pass   |

## 5. Regression QA

| Check                                     | Result |
| ----------------------------------------- | ------ |
| npm.cmd run build                         | Pass   |
| git diff --check                          | Pass   |
| No 4:6 runtime regression                 | Pass   |
| No Hybrid runtime regression              | Pass   |
| No Ice Brew runtime regression            | Pass   |
| Existing 4:6 R-01 exact gate preserved    | Pass   |
| Existing Hybrid R-08 exact gate preserved | Pass   |
| sourceStatus not weakened                 | Pass   |
| verificationLevel not weakened            | Pass   |
| valuesArePlaceholder not weakened         | Pass   |
| isPlaceholder not weakened                | Pass   |
| No route changes                          | Pass   |
| No storage schema changes                 | Pass   |
| No PWA / manifest / workflow changes      | Pass   |
| No package changes                        | Pass   |
| No dist files                             | Pass   |

## 6. Evidence QA

| Field                    | Evidence class                                                 | Result |
| ------------------------ | -------------------------------------------------------------- | ------ |
| 20g                      | primary_description_confirmed                                  | Pass   |
| 300g                     | primary_description_confirmed                                  | Pass   |
| 1:15                     | primary_description_confirmed                                  | Pass   |
| 10 pours                 | primary_description_confirmed                                  | Pass   |
| 30g each                 | primary_description_confirmed                                  | Pass   |
| exact timestamp schedule | user_supplied_visual_evidence_confirmed                        | Pass   |
| 1:45 / 210g              | user_supplied_visual_evidence_confirmed                        | Pass   |
| about 3:30               | user_supplied_visual_evidence_confirmed / approximate guidance | Pass   |
| per-step delta           | app_calculated                                                 | Pass   |
| filter                   | unresolved                                                     | Pass   |
| scaling                  | unresolved / unsupported                                       | Pass   |

The runtime does not calculate pour deltas because the creator description
directly confirms `30g` each. Any future derived delta, duration, or progress
value must use `app_calculated`.

## 7. Result

Result:
Pass

Blocking issues:
None.

Non-blocking follow-up:
Run the dedicated mobile regression gate in PR-013G.

## Independent Verifier Prompt

```text
Independently verify PR-013F against origin/main and the PR-013A through
PR-013E source chain.

Pass only if:
- runtime selection is limited to ten-pour / R-09 / exact 20g / 300g / 1:15
- arbitrary scaling is absent
- every non-exact setup receives the existing placeholder recipe
- the schedule has ten neutral Pour steps and preserves 1:45 / 210g
- about 3:30 is approximate completion/drawdown guidance only
- no filter type is invented
- field evidence is not over-promoted
- sourceStatus, verificationLevel, valuesArePlaceholder, and isPlaceholder
  are not weakened at method, variant, or step-container level
- 4:6, Hybrid, and Ice Brew behavior is unchanged
- no official affiliation, approval, supervision, or endorsement is implied
- npm.cmd run build and git diff --check pass

Report findings first, ordered by severity. If no issue is found, state Pass
and identify the remaining unresolved filter, exact completion, dripper
removal, scaling, and independent creator-video traceability risks.
```

## Regression Checker Prompt

```text
Run a regression-only review of PR-013F against origin/main.

Confirm:
- no unrelated files changed
- no routes or BrowserRouter behavior changed
- no localStorage key or storage schema changed
- no PWA, Service Worker, manifest, icon, or workflow changed
- no package or lockfile changed
- existing 4:6 R-01 exact gate is preserved
- existing Hybrid R-08 exact gate is preserved
- existing placeholder fallback is preserved
- non-exact 10 Pour setups do not receive the R-09 runtime schedule
- prohibited copy implying official status, complete reproduction,
  supervision, endorsement, or universal correctness is absent
- no dist files are included
- npm.cmd run build and git diff --check pass

Fail the regression check if any prohibited file or behavior changed.
```

## Memory / Handoff

Implemented:

* Fixed THE NEO BREW / R-09 candidate for exact `20g / 300g / 1:15`.
* Exact setup gate with placeholder fallback for all non-exact setups.
* Ten `30g` pours at `0:00`, `0:30`, `0:45`, `1:00`, `1:15`, `1:30`,
  `1:45`, `2:00`, `2:15`, and `2:30`.
* Critical `1:45 / 210g` row.
* About `3:30` as approximate completion/drawdown guidance only.
* `95-96°C` range, extra coarse / Comandante C40 `40-45` clicks, and narrow
  HARIO V60 NEO recommended / V60 acceptable copy.

Not implemented:

* Arbitrary scaling or a calculated replacement schedule.
* Exact completion duration or dripper-removal timing.
* A filter type.
* UI redesign, routes, previews, storage changes, or unrelated method changes.

Unresolved fields:

* Filter.
* Exact completion duration.
* Dripper-removal timing.
* Arbitrary scaling.
* Independent creator-video-frame traceability.

Recommended next PR:

**PR-013G: THE NEO BREW Runtime QA / Mobile Regression Gate**

Future caution:

Preserve the exact gate, the `1:45 / 210g` row, neutral `Pour 1` labeling,
approximate-only `3:30` guidance, unresolved filter, disabled scaling,
placeholder fallback, and non-affiliation wording.
