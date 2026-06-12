# PR-012D: Hybrid Narrow Fixed-Example Mapping / Approximation Semantics Gate

## 1. Purpose

PR-012C captured timestamped creator-source captions and visible-frame evidence
for the evolved / New Hybrid HARIO Switch candidate. It still selected Option B
because several values are ranged, approximate, observed rather than narrated,
or unresolved.

PR-012D decides whether a later narrow fixed-example runtime mapping is safe,
and what approximation semantics must exist before that work starts.

This PR is docs-only:

* no runtime data or schedule changes are made
* no data model changes are made
* no UI or app source changes are made

## 2. PR-012C baseline

PR-012C captured:

* New Hybrid identity from the creator source
* HARIO Switch equipment family
* a fixed `20g / 300g` demonstrated example
* immersion -> percolation -> immersion -> release / completion phase order
* four additions
* a creator-supported first-pour range of `40-50g`
* cumulative targets of `120g / 200g / 300g`
* switch closed / open actions
* later lower-temperature guidance around `70-80°C`
* approximate completion around `3:30`
* observed dripper removal around `3:34`

PR-012C left these blockers:

* initial water temperature is unresolved
* exact Switch model / capacity is unresolved
* first-pour range semantics are unresolved
* approximate timing semantics are unresolved
* finish target versus observed removal semantics are unresolved
* arbitrary dose and ratio scaling are unsupported

## 3. Candidate mapping summary

| Candidate field | Proposed future value / treatment | Evidence basis | Runtime treatment |
| --------------- | --------------------------------- | -------------- | ----------------- |
| source identity | Tetsu Kasuya creator-channel evolved / New Hybrid HARIO Switch example | PR-012C S1 captions and visible frames | Approve attribution-only mapping; do not imply affiliation or endorsement. |
| method / variant mapping | `Hybrid` / `R-08` maps to the S1 New Hybrid example | Existing R-08 identity plus PR-012C evidence | Approve only as a narrow repository mapping to the demonstrated example. |
| coffee | `20g` | Direct creator-source caption evidence | Future `source_original`, fixed example only. |
| water | `300g` | Direct creator-source caption and visible-frame evidence | Future `source_original`, fixed example only. |
| ratio | `1:15` calculated from `20g / 300g` | Directly supported inputs; ratio is not directly stated for New Hybrid | Future `app_calculated` with calculation note, never `source_original`. |
| phase order | immersion -> percolation -> immersion -> release / completion | Direct creator-source caption evidence | Conceptual order may be source-backed; exact event timing requires approximation semantics. |
| first pour | `40-50g` range | Directly readable visible frame | Do not collapse to one number; wait for range-capable runtime representation. |
| cumulative targets | `120g / 200g / 300g` | Direct captions and visible frames | May be future `source_original` numeric cumulative targets for the fixed example. |
| switch states | closed at start, open for percolation, closed for later immersion, then final release | Direct captions and visible frames | State sequence may be source-backed; exact action times remain approximate. |
| timing | narrated approximate targets, with observed frames sometimes several seconds later | PR-012C timestamped capture | Do not store as silently exact `startSec` / `endSec`; wait for approximation metadata. |
| temperature | initial temperature unresolved; later lower-temperature guidance around `70-80°C` | No initial-temperature evidence; direct later-temperature captions | Initial value stays `null` / unresolved. Later range waits for range or guidance representation. |
| finish | target completion around `3:30`; observed dripper removal around `3:34` | Captioned target plus visible-frame observation | Keep target and observed event separate; do not choose one exact `totalTimeSec`. |
| dose scaling | unsupported | No creator-source scaling formula | Disabled. Non-20g setup falls back to placeholder-safe schedule. |
| ratio scaling | unsupported | No creator-source scaling formula | Disabled. Non-300g / non-1:15 setup falls back to placeholder-safe schedule. |
| unresolved fields | initial water temperature; exact Switch model / capacity; exact first-pour value; exact schedule precision; exact single finish time | PR-012C evidence gaps and semantics review | Keep unresolved, nullable, omitted, or placeholder-safe. |

## 4. Approximation semantics review

| Ambiguous / approximate field | Evidence from PR-012C | Risk if implemented as exact | Safe treatment |
| ----------------------------- | --------------------- | ---------------------------- | -------------- |
| first pour `40-50g` | Visible frame directly shows the range | Selecting `40g`, `45g`, or `50g` invents unsupported precision | Represent the range as a range after model support exists; until then keep it out of runtime schedule values. |
| approximate target times | Captions use approximate targets | Numeric `startSec` suggests an exact action boundary | Add explicit approximation semantics before using numeric timer events. |
| observed frame times differing from narration | Open / close / removal frames occur several seconds after narrated targets | Treating observed time as the instruction, or target as the observation, changes the source meaning | Store target guidance and observed-example evidence separately. |
| later temperature `70-80°C` | Creator captions support about `80°C`, with around `70°C` as a stronger lower-temperature option | One exact temperature falsely selects an official value | Represent as a range / choice / guidance note after an approved model decision. |
| missing initial temperature | No inspected creator caption or readable frame states it | Filling a value from third-party material promotes unsupported evidence | Keep `waterTempCelsius: null` and state that the initial temperature is unresolved. |
| `3:30` completion versus `3:34` dripper removal | Caption says completion at `3:30`; visible frame shows removal around `03:33.92` | One exact finish value erases target-versus-observed distinction | Represent `about 3:30` as target guidance and `about 3:34` as observed-example evidence, not one exact completion event. |
| exact Switch model / capacity | Equipment family is supported; exact model is not identified | Naming a model or capacity could be wrong | State HARIO Switch equipment family only; omit exact model / capacity. |
| dose scaling | The source demonstrates an example but gives no arbitrary scaling formula | Scaled pours would look creator-supported | Disable scaling; non-exact dose uses placeholder-safe fallback. |
| ratio scaling | No arbitrary ratio formula is supported | Recalculated water and pours would look source-supported | Disable scaling; non-exact ratio or water uses placeholder-safe fallback. |

## 5. Current data model fit

| Requirement | Current model support | Risk | Recommendation |
| ----------- | --------------------- | ---- | -------------- |
| range pour value | Not supported. `BrewStep.pourGrams` and `nextPourGrams` accept one number or `null`. | A range must be lost, hidden in text, or collapsed to false precision. | Add an approved range-capable field or value shape before runtime implementation. |
| approximate timing | Not supported as structured semantics. Timer fields accept one number or `null`. | Numeric seconds appear exact and drive exact timer behavior. | Add timing precision / approximation metadata before a Hybrid schedule. |
| timing label vs exact `startSec` | Free-text `instruction` / `nextPreview` can say "around", but timer progression still depends on numeric fields. | Text and timer behavior can contradict each other. | Do not treat free text alone as sufficient for a runtime schedule. |
| target completion vs observed removal | Not supported as separate typed events. `totalTimeSec` is one number. | One value conflates a narrated target with an observed action. | Add explicit target / observed / action semantics or keep both out of exact runtime fields. |
| temperature range | Not supported. `waterTempCelsius` accepts one number or `null`. | Choosing one value invents precision and hides the creator-supported choice. | Keep initial temperature `null`; add a range / guidance model before later-temperature runtime use. |
| fixed-example-only variant | Partially supported by current recipe selection logic, which can return a source-backed recipe only for an exact setup and otherwise return the method placeholder recipe. | The type itself does not declare fixed-example restrictions, and Setup still permits arbitrary inputs. | Reuse exact-match fallback behavior in a future runtime PR, with explicit UI caution and tests. |
| disabled scaling | Policy can be enforced through exact-match fallback, but no declarative scaling policy exists. | Users may interpret editable setup values as a supported scaled recipe. | Define and test exact `20g / 300g / 1:15` gating; all other combinations must remain placeholder-safe. |
| fieldEvidence for app-calculated ratio | Supported by the PR-011D `fieldEvidence` model and `calculationNote`. | Mislabeling `1:15` as source-original would overstate evidence. | Use `app_calculated` with `300g / 20g = 15` calculation note. |
| caution UI copy | Free-text caution copy is possible, but no Hybrid-specific fixed-example caution exists. | A source-backed subset could make the whole variant look verified or scalable. | Require explicit future UI copy and preserve container-level caution metadata until separately reviewed. |
| placeholder fallback for non-exact setup | Existing 4:6 exact-match selection demonstrates a feasible fallback pattern. | A future Hybrid branch could accidentally return the source-backed schedule for edited setup values. | Require negative tests for every non-exact dose, ratio, or water combination. |

The evidence is sufficient to approve the narrow R-08-to-S1 mapping and the
fixed `20g / 300g` example. The current model is not sufficient to represent
the candidate schedule without losing range, approximation, temperature, or
finish semantics.

PR-012D does not change the model. A later model / policy prerequisite PR is
required before a Hybrid runtime data PR.

## 6. Future fieldEvidence plan

| Future runtime field | Proposed provenance | Source / evidence basis | Note required |
| -------------------- | ------------------- | ----------------------- | ------------- |
| R-08-to-S1 repository mapping | `app_guidance` | PR-012C creator identity evidence plus PR-012D mapping approval | State that Pourō maps R-08 to the inspected New Hybrid fixed example and does not imply affiliation. |
| creator / source identity | `source_original` | PR-012C S1 title, captions, and visible frames | Attribution only; no approval or endorsement claim. |
| equipment family | `source_original` | PR-012C S1 and reviewed HARIO equipment context | HARIO Switch family only; exact model remains unresolved. |
| coffee `20g` | `source_original` | Direct creator captions | Fixed demonstrated example only. |
| water `300g` | `source_original` | Direct creator captions and visible frames | Fixed demonstrated example only. |
| ratio `1:15` | `app_calculated` | Directly supported `20g / 300g` inputs | `calculationNote`: `300g / 20g = 15`; not directly stated as New Hybrid ratio. |
| phase order | `source_original` | Direct creator captions | Preserve conceptual order; do not imply exact timing. |
| first-pour range `40-50g` | `source_original` | Directly readable visible frame | Requires range-capable runtime field; do not select one exact value. |
| cumulative `120g / 200g / 300g` | `source_original` | Direct captions and visible frames | Fixed example only. |
| switch-state sequence | `source_original` | Direct captions and visible frames | State actions separately from approximate timestamps. |
| approximate action targets | `source_original` | Narrated creator targets | Requires approximation metadata and a note distinguishing target from observation. |
| observed example timestamps | `source_original` | Timestamped visible frames | Observation only; not an instruction or exact target. |
| initial water temperature | `unresolved` | No inspected direct evidence | Must stay `null`, omitted, or placeholder-safe. |
| later `70-80°C` guidance | `source_original` | Direct creator captions | Requires range / choice semantics; do not store one exact value. |
| target completion around `3:30` | `source_original` | Direct creator caption | Approximate target guidance, not observed removal. |
| observed removal around `3:34` | `source_original` | Direct visible frame | Observed example only, separate from target completion. |
| exact Switch model / capacity | `unresolved` | PR-012C evidence gap | Omit the model / capacity claim. |
| arbitrary dose scaling | `unresolved` | No reviewed scaling formula | Scaling disabled; non-exact setup falls back to placeholder. |
| arbitrary ratio scaling | `unresolved` | No reviewed scaling formula | Scaling disabled; non-exact setup falls back to placeholder. |
| caution copy and fallback policy | `app_guidance` | PR-012D policy | Explain fixed-example scope, approximation, unresolved fields, and non-affiliation. |

Existing runtime metadata must not be weakened merely because some future
fields can carry `source_original` or `app_calculated` evidence.

## 7. Scaling and setup policy

Future Hybrid R-08 policy:

* The only source-backed candidate is exact `20g / 300g / 1:15`.
* `20g` and `300g` are source-original values for the demonstrated example.
* `1:15` is app-calculated from those source-original values.
* Recipe Setup may continue to collect user-entered dose and ratio values, but
  those edits must not scale the source-backed Hybrid schedule.
* Any setup other than exact `20g / 300g / 1:15` must use the existing
  placeholder-safe Hybrid recipe / schedule display.
* Ratio changes must not produce a source-backed Hybrid schedule. The UI must
  warn or fall back to placeholder-safe display.
* Arbitrary dose and ratio scaling are deferred until a separate scaling
  evidence and policy PR approves a formula.

## 8. Required UI caution copy for future runtime PR

A future runtime PR must provide user-facing caution copy that communicates all
of the following:

* New Hybrid fixed example only
* based on directly inspected creator-source captions and visible frames
* limited to `20g / 300g`
* the first pour is a `40-50g` range, not one exact value
* times are approximate targets
* initial water temperature remains unresolved and is omitted
* later lower-temperature guidance is a range / choice
* arbitrary dose and ratio scaling are not supported
* Pourō is non-official and has no affiliation or endorsement

Draft future Japanese copy requirements:

```text
New Hybrid の固定例（20g / 300g）のみを表示します。
制作者公開動画の字幕と確認できた画面をもとにした参考表示です。
最初の注湯は 40-50g の範囲、時刻は目安です。
初期湯温は未確認です。後半の低い湯温は 70-80°C の目安として扱います。
任意の粉量・比率への換算には対応していません。
Pourō は非公式で、制作者・メーカーとの提携や承認を示すものではありません。
```

The wording may be polished in the runtime PR, but none of these meanings may
be removed.

## 9. Runtime implementation decision

### Option C: Runtime blocker / data model prerequisite

R-08 may now be approved as Pourō's narrow mapping to the inspected S1 New
Hybrid HARIO Switch fixed example. The evidence also supports future mapping of
`20g`, `300g`, the app-calculated `1:15`, conceptual phase order, and cumulative
`120g / 200g / 300g` targets.

A runtime implementation may not proceed yet. The current model cannot safely
represent the creator-supported first-pour range, approximate target timing,
temperature range / choice, or target completion separately from observed
dripper removal. Implementing a schedule now would create false precision.

Required prerequisite:

* approve a range-capable pour representation
* approve approximation metadata for timer targets and observed-example times
* approve target-completion versus observed-removal semantics
* approve temperature range / guidance representation while initial
  temperature stays unresolved
* approve exact fixed-example gating and placeholder fallback for non-exact
  setups

Explicit answers to the decision questions:

1. Yes. R-08 can be mapped to the creator-source New Hybrid HARIO Switch example.
2. Yes. It can be treated as a fixed example only.
3. Yes. `20g` can be future runtime `source_original` within that fixed example.
4. Yes. `300g` can be future runtime `source_original` within that fixed example.
5. Yes. `1:15` can be future runtime `app_calculated` from `20g / 300g`, with a calculation note.
6. Yes in principle, but the first pour must remain the range `40-50g`.
7. No. The current `BrewStep` model cannot store a range without source loss.
8. Yes. Runtime implementation must wait for a range-capable data model extension.
9. Yes. Cumulative `120g / 200g / 300g` targets can be represented safely for the exact fixed example.
10. No. Current `startSec` / `endSec` fields cannot declare that a time is approximate.
11. Timing may remain caution / guidance text, but a timer schedule must wait for approximation metadata.
12. The later lower temperature may be documented as range / guidance, but the current single-temperature runtime field is insufficient.
13. Yes. Initial water temperature must remain `null` / unresolved.
14. `3:30` may be represented later as an approximate target completion, not one exact observed finish.
15. Yes. Observed dripper removal around `3:34` must be represented separately as observation evidence.
16. Yes. Arbitrary dose scaling must be disabled.
17. Yes. Arbitrary ratio scaling must be disabled.
18. UI caution must state fixed-example scope, ranges, approximate times, unresolved initial temperature, no scaling, and non-affiliation.
19. Yes. A model / policy prerequisite is required before runtime implementation.
20. Final decision: Option C, runtime blocker / data model prerequisite.

## 10. Minimum gate for future runtime PR

A future Hybrid runtime PR may proceed only if:

* [x] R-08 -> S1 mapping approved.
* [x] Fixed source-backed setup limited to `20g / 300g / 1:15`.
* [x] Non-exact setup fallback defined.
* [ ] First-pour range representation defined in the runtime model.
* [ ] Approximate timing representation defined in the runtime model.
* [ ] Temperature range / missing initial temp policy implemented without false precision.
* [ ] Finish/removal semantics defined in the runtime model.
* [x] Scaling disabled or separately evidenced.
* [ ] Every changed runtime field has `fieldEvidence`.
* [ ] UI caution copy is implemented.
* [x] No official affiliation implied.
* [ ] Mobile QA completed.
* [ ] Build / diff check pass for the future runtime PR.

Unchecked items are future gates, not failures of this docs-only PR.

## 11. Independent Verifier Prompt

```text
Independently verify PR-012D: Hybrid Narrow Fixed-Example Mapping /
Approximation Semantics Gate.

Review the full diff against origin/main, PR-012C, the current BrewStep /
BrewRecipe types, recipe selection behavior, and the two PR-012D documents.

Pass only if:
- the PR is docs-only
- no app source files changed
- no runtime data changed
- no method schedules changed
- PR-012C evidence is represented accurately and is not overstated
- R-08-to-S1 approval is limited to the fixed New Hybrid example
- 20g and 300g are treated as source-original only within the fixed example
- 1:15 is treated as app-calculated, not source-original
- approximate values are not treated as exact without a declared policy
- the 40-50g first pour remains a range and is not collapsed to one value
- target times and observed frame times remain distinguishable
- 3:30 target completion and about 3:34 observed removal remain distinguishable
- initial temperature and exact Switch model / capacity remain unresolved
- arbitrary dose and ratio scaling remain disabled
- third-party summaries are not treated as primary evidence
- the runtime decision follows the evidence and current model fit
- Option C is selected while range, approximation, temperature, and finish
  semantics lack safe runtime representation
- no official affiliation, approval, supervision, partnership, or endorsement
  is implied
- the follow-up recommendation is specific

Report findings first, ordered by severity. If no issue is found, state Pass
and identify residual model and evidence risk.
```

## 12. Regression Checker Prompt

```text
Run a regression-only review of PR-012D against origin/main.

Confirm:
- only docs/research/PR-012D-hybrid-fixed-example-mapping-gate.md and
  docs/qa/PR-012D-hybrid-fixed-example-mapping-gate.md changed
- no runtime source files changed
- no method data changed
- no 4:6, Hybrid, 10 Pour, or Ice Brew runtime data changed
- no timer logic or active-brew state logic changed
- no route or BrowserRouter changes
- no storage, localStorage key, or schema changes
- no Service Worker, manifest, icon, PWA, workflow, or package changes
- no release docs changed
- no dist files changed
- sourceStatus, verificationLevel, valuesArePlaceholder, and isPlaceholder
  were not weakened
- no runtime fieldEvidence changed
- no new runtime recipe values were added
- no new schedules were added
- npm.cmd run build passes
- git diff --check passes

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 13. Memory / Handoff

PR-012D approves R-08 as Pourō's narrow mapping to the inspected S1 New Hybrid
HARIO Switch fixed example. Future fields that can be mapped include
source-original `20g`, source-original `300g`, app-calculated `1:15`,
conceptual phase order, four additions, and cumulative
`120g / 200g / 300g` targets.

Runtime implementation is not yet allowed. Option C is selected because the
current model cannot safely preserve the `40-50g` first-pour range,
approximate target times, target-versus-observed timestamps, later temperature
range / choice, or target completion versus observed dripper removal.

These fields must stay unresolved or omitted:

* initial water temperature
* exact Switch model / capacity
* one exact first-pour value
* one exact schedule replacing approximate targets and observations
* one exact finish value replacing target and observed removal
* arbitrary dose or ratio scaling

Future Codex prompts must preserve:

* exact fixed-example scope: `20g / 300g / 1:15`
* `1:15` as app-calculated
* placeholder-safe fallback for every non-exact setup
* range and approximation semantics without false precision
* target and observed evidence as separate meanings
* unresolved initial temperature and exact Switch model / capacity
* no official affiliation or endorsement
* no runtime implementation until the prerequisite is complete

Recommended next PR:

**PR-012E: Hybrid Range / Approximation Runtime Model Prerequisite**

It should define the minimum additive model and policy needed for ranged pour
values, approximate target times, observed-example timestamps, temperature
range / guidance, finish semantics, and exact fixed-example gating. It should
not add Hybrid runtime recipe values or schedules.

## 14. Out of scope

PR-012D makes:

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
