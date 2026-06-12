# PR-012C: Hybrid Creator Transcript / Timestamped Field Capture Gate

## 1. Purpose

PR-012B kept Hybrid runtime implementation blocked because the creator-source
identity was narrower, but the numeric recipe, action timing, temperature,
finish, and scaling fields were not directly captured.

PR-012C attempts a timestamped creator-source field capture from the evolved /
New Hybrid HARIO Switch video and directly inspectable supporting sources.

This PR is documentation-only:

* no runtime data changes
* no method schedule changes
* no app source changes

## 2. PR-012B baseline

PR-012B selected:

**Runtime decision: Option B - Still not ready for runtime implementation.**

PR-012B narrowed the likely identity:

* R-08 most likely maps to the evolved / New Hybrid HARIO Switch method.
* HARIO Switch is the supported equipment family.
* The broad phase order is immersion -> percolation -> immersion.

The remaining blockers were:

* creator transcript / numeric recipe
* exact timings
* water temperatures
* switch open / closed actions
* pour amounts
* finish semantics
* exact equipment model / capacity
* dose scaling
* ratio scaling

## 3. Source access and capture log

External sources were inspected on 2026-06-13. Only directly inspectable
content is used as creator or official-like evidence.

| Source ID | Source | URL | Access result | What was inspected | Limitation |
| --------- | ------ | --- | ------------- | ------------------ | ---------- |
| S1 | TETSU KASUYA creator-channel video, `どんなコーヒー豆も「おいしくなる」究極系レシピ、進化しました。` | https://www.youtube.com/watch?v=4FeUp_zNiiY | inspected | Title, channel, full description, creator chapter markers, on-page transcript control, player caption state, Japanese and English subtitle tracks, and timestamped visible video frames | The on-page transcript panel stayed loading and the player reported captions unavailable. Subtitle tracks were separately retrievable and read. The description says the English subtitles were AI-generated, so the Japanese caption track and visible frames were preferred. Video audio was not independently transcribed. |
| S2 | TETSU KASUYA creator-channel predecessor video, `【もう戻れない】このレシピは「神」か「悪魔」か？｜どんな豆も簡単に美味しくなる究極系。` | https://www.youtube.com/watch?v=gC8K40kZ_6E | partially_inspected | Title, channel, description, chapter markers, HARIO Switch equipment note | S2 confirms the predecessor source and recipe chapter, but PR-012C did not perform a full timestamped S2 field transcription or use S2 numeric fields for the New Hybrid candidate. |
| S3 | HARIO Immersion Dripper SWITCH | https://global.hario.com/product/coffee/dripper/SSD.html | inspected | Product description, switch operation, article numbers, and finished capacities | Confirms the equipment mechanism and 200mL / 360mL products, but not the exact S1 model or the New Hybrid recipe. |
| S4 | HARIO MUGEN x SWITCH DRIPPER | https://global.hario.com/product/new/mugen_x_switch_dripper.html | inspected | Product description, mid-brew pour-over / immersion switching, 200mL finished capacity, and multiple incompatible manufacturer-published recipes | Demonstrates Switch flexibility and why equipment capability cannot select the R-08 schedule. It is not S1's recipe and does not identify the exact S1 model. |
| S5 | ZEROMILE interview: PHILOCOFFEA - Tetsu Kasuya | https://en.z-mile.com/series/coffeezamurai11_philocofea/ | inspected | Interview text distinguishing Hybrid Method from New Hybrid Method and stating immersion -> percolation -> immersion | Supports identity and phase-order corroboration only. It does not publish the numeric recipe. |

Supporting third-party summaries from PR-012A / PR-012B remain
third-party interpretation and are not promoted to creator evidence here.

## 4. Timestamped capture table

The `Timestamp` column uses the S1 video timestamp. When a visible frame also
shows the brew timer, the on-screen brew time is recorded in `Notes`.
Confidence is also recorded in `Notes`: `high` means the limited claim is
directly readable / inspectable, while `medium` means the direct evidence
still requires a range, approximation, or repository-mapping decision.

| Timestamp | Field / claim | Observed creator-source evidence | Evidence type | Category | Runtime readiness | Notes |
| --------- | ------------- | -------------------------------- | ------------- | -------- | ----------------- | ----- |
| 00:00-20:58 | On-page transcript access | A transcript control was visible, but transcript text stayed loading; no on-page transcript text was read. | transcript | unresolved | unresolved | Confidence: high for the access limitation. It must not be rewritten as successful on-page transcript access. |
| 00:00-20:58 | Caption access | Japanese and English subtitle tracks were retrievable and read as timestamped caption text. | caption | primary_confirmed | partial | Confidence: high for track access; medium for English wording. The description says the English subtitles were AI-generated. Japanese captions and visible frames were preferred. Video audio was not independently transcribed. |
| 00:00 | Creator chapters | Description lists `0:00` overview / logic, `5:17` extraction recipe introduction, `10:55` flavor profile, and `13:08` tasting impressions. | description | primary_confirmed | ready | Confidence: high. Chapter markers identify where the recipe demonstration starts, but are not recipe values. |
| 00:43 | Equipment family | Creator caption introduces a Switch recipe; the description identifies the used dripper as HARIO Switch. | caption | primary_confirmed | partial | Confidence: high for equipment family; exact Switch model and capacity remain unresolved. |
| 02:00-02:06 | Older Hybrid distinction | Creator caption summarizes the prior Hybrid as pour-over first, then closing the valve for immersion. | caption | primary_confirmed | ready | Confidence: high. Directly distinguishes the predecessor structure from New Hybrid. |
| 03:01-03:18 | Evolved phase order | Creator caption states start closed, open to return to pour-over, then return to immersion. | caption | primary_confirmed | ready | Confidence: high. Supports immersion -> percolation -> immersion at phase level. |
| 04:12-04:31 | Evolved logic and temperature change | Creator caption again states immersion first, then pour-over, then immersion while lowering water temperature. | caption | primary_confirmed | partial | Confidence: high for phase order; medium for temperature mapping because the initial temperature is absent. |
| 05:17 | Recipe chapter start | Creator chapter marker identifies the extraction recipe introduction. | chapter | primary_confirmed | ready | Confidence: high. The visible chapter frame says `NEW HYBRID Methods`. |
| 05:23-05:52 | Dose and final water | Caption contrasts prior Hybrid `20g / 280ml` with the current example and states `20g / 300ml`; later visible frames show `300g`. | caption | primary_confirmed | ready | Confidence: high for the fixed S1 example; it is not a scaling rule. |
| 05:55-06:10 | Grind guidance | Caption states Comandante 28 clicks and says the older 20-click guidance was too fine for many users. | caption | primary_confirmed | partial | Confidence: high for grinder-specific guidance; it cannot safely become a generic grind label. |
| 06:16-06:30 | Action sequence | Caption states start closed, bloom thoroughly, open, then add room-temperature water to lower temperature and immerse again. | caption | primary_confirmed | partial | Confidence: high for sequence; medium for scheduling because exact target times are later described as approximate. |
| 06:36 | Coffee dose confirmation | Caption states that 20g has been measured. | caption | primary_confirmed | ready | Confidence: high. Direct fixed-example dose confirmation. |
| 07:02-07:09 | Initial switch state and start | Caption states the extraction is closed so water does not drip, then brewing starts. | caption | primary_confirmed | ready | Confidence: high. Supports closed-at-start behavior. |
| 07:22 | First pour amount and state | Visible frame directly shows `40-50g`, `Close`, and brew timer `00:08.93`. | visible frame | primary_confirmed | partial | Confidence: high for the readable range / state; the creator does not provide one exact first-pour value. |
| 07:59-08:07 | First release and cumulative target | Caption says the switch is now open and to pour to `120`; visible frame shows `120g`, `Open`, and brew timer `00:45.91`. | caption | primary_confirmed | partial | Confidence: high for state / target; medium for timing. Observed example timing is about 0:46. |
| 08:24-08:33 | Method name | Caption repeatedly calls the method `New Hybrid`. | caption | primary_confirmed | partial | Confidence: high for creator naming; medium for the R-08-to-S1 repository mapping, which still needs explicit approval. |
| 08:41-08:50 | Second cumulative target | Caption says around `1:30` to pour to `200`; visible frame shows `200g`, `Open`, and brew timer `01:36.91`. | caption | primary_confirmed | partial | Confidence: high for target / state; medium for timing because the narration is approximate and differs from the observed example frame. |
| 09:13-09:20 | Later water temperature | Caption says about `80°C` is acceptable and lowering to `70°C` makes the taste difference easier to perceive. | caption | primary_confirmed | partial | Confidence: high for the creator range / choice; medium for runtime mapping because it is not one required temperature. |
| 09:25-09:34 | Final pour, cumulative target, and close | Caption says around `2:10` to lower water temperature and go to `300`; frames show `Open` at brew timer `02:11.90` and `300g` / `Close` at `02:20.90`. | visible frame | primary_confirmed | partial | Confidence: high for observed state / target; medium for timing because the narrated target and observed time are not identical. |
| 09:50-10:02 | Final immersion and release | Caption says wait until about `2:45`, then open after 45 seconds; frames show `Close` at `02:45.92` and `Open` at `02:48.92`. | visible frame | primary_confirmed | partial | Confidence: high for observed release; medium for the approximate target time. |
| 10:18-10:22 | Example versus universal rule | Caption says this is one example / a format. | caption | primary_confirmed | ready | Confidence: high. Supports preserving fixed-example scope and not inventing arbitrary scaling. |
| 10:46-10:47 | Finish time and removal | Caption says completion is at `3:30`; visible frame shows the dripper being removed at brew timer `03:33.92`. | visible frame | primary_confirmed | partial | Confidence: high for observed removal and captioned target; medium for one runtime finish value because they differ by several seconds. |
| 17:29-17:34 | New Hybrid name | Caption identifies this version as New Hybrid. | caption | primary_confirmed | partial | Confidence: high for creator naming; medium for repository mapping approval. |
| 18:27-18:30 | Fixed example and predecessor ratio | Caption says the current method can use `20g / 300g` and that old Hybrid was `1:14`. | caption | primary_confirmed | partial | Confidence: high for direct claims; medium for New Hybrid `1:15`, which is an app calculation from directly supported dose and water rather than a directly stated ratio. |

No user comment was used as creator evidence. No third-party numeric value was
promoted to primary-confirmed evidence.

## 5. Field-level evidence table

| Field | Candidate value | Direct source support | Category | Runtime readiness | Required follow-up |
| ----- | --------------- | --------------------- | -------- | ----------------- | ------------------ |
| method identity | Evolved / New Hybrid HARIO Switch method; likely R-08 source | S1 captions and visible `NEW HYBRID Methods` frame; S5 corroborates New Hybrid identity | researched_summary | partial | Explicitly approve the R-08-to-S1 mapping without implying affiliation. |
| creator attribution | Tetsu Kasuya creator-channel method | S1 title and channel | primary_confirmed | ready | Use attribution-only wording; do not imply approval or endorsement of Pourou. |
| HARIO Switch equipment | HARIO Switch equipment family | S1 description and captions; S3 manufacturer mechanism | primary_confirmed | ready | Keep exact model separate. |
| exact Switch model / capacity | unresolved | S3 lists 200mL and 360mL standard Switch products; S1 does not identify which model | unresolved | unresolved | Obtain direct model evidence or intentionally avoid a model claim. |
| phase order | immersion -> percolation -> immersion -> release | S1 captions at 03:01-03:18, 04:12-04:31, and 06:16-06:30 | primary_confirmed | ready | Map phase concepts without converting approximate actions into false precision. |
| first phase type | closed immersion bloom | S1 captions and visible closed-state frame | primary_confirmed | ready | Preserve first-pour range and approximate duration. |
| second phase type | open percolation | S1 captions and visible open-state frames | primary_confirmed | ready | Decide how approximate target timing is represented. |
| third phase type | closed lower-temperature immersion | S1 captions and visible `300g` / `Close` frame | primary_confirmed | ready | Preserve the temperature range and observed-example nature. |
| coffee dose | 20g fixed example | S1 captions at 05:51 and 06:36 | primary_confirmed | ready | Disable arbitrary dose scaling unless separately approved. |
| water amount | 300g final fixed example | S1 caption plus visible `300g` frames | primary_confirmed | ready | Keep this limited to the fixed 20g example. |
| ratio | 1:15 calculated from 20g / 300g | Directly supported inputs; ratio itself is not stated as New Hybrid `1:15` | app_calculated | partial | Record the calculation note and do not label it source-original. |
| water temperature 1 | unresolved | No inspected S1 caption or readable frame states the initial water temperature | unresolved | unresolved | Capture directly or intentionally omit it in a future fixed-example mapping. |
| water temperature 2 | about 80°C, with 70°C as a stronger lower-temperature option | S1 captions at 09:13-09:20 | primary_confirmed | partial | Decide whether UI/runtime can represent a creator-supported range / choice without selecting one official value. |
| grind size | Comandante 28 clicks; somewhat coarse | S1 captions at 05:55 and 09:37 | primary_confirmed | partial | Keep grinder-specific; do not convert to a universal generic grind label without review. |
| switch closed timing | Closed at start; closed after reaching 300g in the observed example at about 2:20 | S1 caption and visible frames | primary_confirmed | partial | Reconcile target actions with observed-example timestamps before creating an exact schedule. |
| switch open / release timing | First open observed about 0:46; final release target about 2:45 and observed open about 2:49 | S1 caption and visible frames | primary_confirmed | partial | Represent approximate target timing honestly. |
| pour count | Four additions in the demonstrated example | Visible / caption sequence: 40-50g, to 120g, to 200g, to 300g | primary_confirmed | ready | Keep count limited to the fixed example. |
| pour amounts | 40-50g first pour, then cumulative targets 120g, 200g, 300g | S1 visible frames and captions | primary_confirmed | partial | Current runtime should not collapse `40-50g` into one unsupported exact value. |
| cumulative water | 120g, 200g, 300g | S1 visible frames and captions | primary_confirmed | ready | Preserve as cumulative targets in the fixed example only. |
| drawdown / finish time | About 3:30 target; dripper removed around observed 3:34 | S1 caption and visible frame | primary_confirmed | partial | Approve whether runtime displays target completion, observed removal, or both. |
| finish semantics | Completion / removal after final release and drawdown; not the release action itself | Final release around 2:45-2:49; completion caption at 3:30; removal visible around 3:34 | primary_confirmed | partial | Document target-versus-observed semantics before timer implementation. |
| dose scaling | No arbitrary formula | S1 calls the recipe an example / format but gives no dose-scaling formula | unresolved | not_ready | Disable scaling or obtain a reviewed creator formula. |
| ratio scaling | No arbitrary formula | No inspected primary-like source supports arbitrary ratio changes | unresolved | not_ready | Disable scaling or define a separately reviewed app-calculated policy. |
| UI caution copy | Preserve current confirmation-needed / placeholder-safe copy | Current app state plus unresolved range, timing, temperature, and scaling fields | researched_summary | ready | Do not present the candidate as fully verified or official. |
| source metadata | S1 creator source; S3 equipment facts; S5 identity corroboration | Directly inspected sources | official_or_primary_like | partial | Attach sources only within their reviewed field scope. |
| future provenance | Captions / visible frames may support `source_original`; ratio may be `app_calculated`; unresolved fields stay unresolved | S1 plus PR-011D provenance model | researched_summary | ready | Every future runtime field needs fieldEvidence and a narrow note. |

## 6. Runtime candidate assessment

R-08 is now substantially mapped to a creator source:

* S1 directly supports New Hybrid identity, HARIO Switch equipment family, and
  immersion -> percolation -> immersion.
* S1 directly supports a fixed `20g / 300g` example, four additions, cumulative
  `120g / 200g / 300g` targets, creator-supported switch actions, later
  temperature guidance, and a completion target around `3:30`.

Fields ready for a future narrow fixed-example review:

* creator attribution
* HARIO Switch equipment family
* broad phase order and phase types
* fixed 20g dose and 300g final water
* four-addition count
* cumulative 120g / 200g / 300g targets

Fields that are only partial:

* R-08-to-S1 repository mapping
* `1:15` as an app-calculated ratio
* Comandante-specific grind guidance
* later temperature as a 70-80°C creator choice
* switch-action timing
* first pour as a 40-50g range
* finish target versus observed removal time

Fields that remain unresolved:

* initial water temperature
* exact Switch model / capacity
* arbitrary dose scaling
* arbitrary ratio scaling
* how runtime should represent ranges and approximate target times

The initial temperature remains third-party-only in the earlier research and
is not promoted here.

Implementing now would still risk misleading users. A precise runtime schedule
could silently turn the source's `40-50g` range, `about` timings, and observed
example times into false exactness. Current user-adjustable dose and ratio
behavior could also imply unsupported scaling.

### Evidence question answers

1. Yes. S1 captions call the evolved version New Hybrid.
2. Yes. S1 identifies HARIO Switch as the used dripper.
3. Yes. S1 directly distinguishes older Hybrid from New Hybrid.
4. Yes. S1 states immersion -> percolation -> immersion.
5. Yes. S1 states and measures 20g.
6. Yes. S1 states 300ml and visible frames show 300g.
7. Not directly as New Hybrid `1:15`; it can be app-calculated from 20g / 300g.
8. No. Initial water temperature remains unresolved.
9. Partially. S1 supports about 80°C or a stronger change around 70°C.
10. Partially. S1 supports Comandante 28 clicks / somewhat coarse.
11. Yes at action level; exact target-versus-observed timing remains partial.
12. Yes. The demonstrated example has four additions.
13. Partially. The first addition is a 40-50g range; later values are cumulative.
14. Yes. S1 supports cumulative 120g, 200g, and 300g.
15. Partially. Final release target is about 2:45; observed open is about 2:49.
16. Partially. S1 states completion around 3:30.
17. Partially. It is completion / removal after release and drawdown, not release itself.
18. No. Arbitrary dose scaling is unsupported.
19. No. Arbitrary ratio scaling is unsupported.
20. No. A narrow runtime candidate is closer, but is not safe until approximation, range, initial-temperature, finish, and scaling policies are approved.

## 7. Runtime implementation decision

### Option B: Still not ready for runtime implementation

PR-012C keeps Option B.

The creator captions and timestamped visible frames now directly support much
of a fixed New Hybrid example. Runtime implementation remains blocked because:

* initial water temperature is unresolved
* the first pour is a creator-supported `40-50g` range, not one exact value
* narrated target times are approximate and differ from observed example times
* finish target and observed dripper-removal time need an explicit runtime
  semantics decision
* exact Switch model / capacity remains unresolved
* arbitrary dose and ratio scaling remain unsupported

No Hybrid runtime value, schedule, or runtime `fieldEvidence` should be changed
from PR-012C.

## 8. Minimum gate for a future Hybrid runtime PR

A future runtime PR may proceed only if all are true:

* R-08 source identity is explicitly selected.
* Creator-source or official-like evidence supports the exact candidate fields.
* Coffee dose is directly supported.
* Water amount is directly supported.
* Ratio is either directly supported or calculated from directly supported
  dose / water.
* Temperatures are directly supported or intentionally omitted.
* Switch closed / open actions are directly supported.
* Pour amounts and timing are directly supported.
* Finish semantics are explicit.
* Scaling behavior is either supported or disabled.
* Every runtime field has fieldEvidence.
* Unsupported fields stay placeholder-safe.
* UI copy remains non-official and non-affiliation.
* QA verifies iPhone SE layout.
* Build and diff check pass.

For this candidate specifically, the future gate must also decide how a
`40-50g` range and `about` timings can be represented without false precision.

## 9. Independent Verifier Prompt

```text
Independently verify PR-012C: Hybrid Creator Transcript / Timestamped Field
Capture Gate.

Review the full diff against origin/main and the two PR-012C documents.

Pass only if:
- the PR is docs-only
- no app source files changed
- no runtime data or method schedules changed
- source access claims describe only content actually inspected
- on-page transcript access is not overclaimed
- retrievable subtitle / caption tracks are distinguished from independent
  video-audio transcription
- the English AI-subtitle limitation is documented
- every timestamped creator claim is tied to an inspected caption, description,
  chapter marker, or readable visible frame
- visible-frame claims record only directly readable text / state
- user comments and third-party summaries are not treated as primary evidence
- manufacturer sources are used only within their equipment / recipe scope
- the runtime decision follows the remaining evidence gaps
- Option B remains selected while range, approximation, initial-temperature,
  finish, model, or scaling blockers remain unresolved
- no official affiliation, approval, supervision, partnership, or endorsement
  of Pourou is implied
- the follow-up recommendation is specific
- Independent Verifier Prompt, Regression Checker Prompt, Memory / Handoff,
  and Out of scope sections are present

Report findings first, ordered by severity. If no issue is found, state Pass
and identify residual evidence risk.
```

## 10. Regression Checker Prompt

```text
Run a regression-only review of PR-012C against origin/main.

Confirm:
- only docs/research/PR-012C-hybrid-creator-transcript-field-capture.md and
  docs/qa/PR-012C-hybrid-creator-transcript-field-capture.md changed
- no src files changed
- no runtime recipe values or method data changed
- no 4:6, Hybrid, 10 Pour, or Ice Brew schedules changed
- no timer state-machine or active-brew logic changed
- no route, BrowserRouter, storage, localStorage key, or schema changed
- no Service Worker, manifest, icon, PWA, workflow, package, release-doc, or
  dist file changed
- sourceStatus, verificationLevel, valuesArePlaceholder, and isPlaceholder
  were not weakened
- no runtime fieldEvidence or new runtime recipe value was added
- no new schedule was added
- npm.cmd run build passes
- git diff --check passes

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 11. Memory / Handoff

What was captured:

* S1 subtitle tracks were retrievable and directly read.
* Timestamped captions and visible frames support New Hybrid identity, HARIO
  Switch equipment family, phase order, fixed 20g / 300g example, four
  additions, cumulative 120g / 200g / 300g targets, later 70-80°C guidance,
  switch-state actions, final release, and completion around 3:30.

What could not be captured or approved:

* initial water temperature
* exact Switch model / capacity
* one exact first-pour value instead of 40-50g
* one exact schedule replacing approximate target / observed-example timing
* arbitrary dose or ratio scaling

Option B remains selected. Do not implement Hybrid numeric runtime values,
schedule steps, runtime `fieldEvidence`, scaling, or exact timer actions yet.

Recommended next PR:

**PR-012D: Hybrid Narrow Fixed-Example Mapping / Approximation Semantics Gate**

It should explicitly approve or reject the R-08-to-S1 mapping, decide how to
represent the 40-50g range and approximate timings, intentionally capture or
omit initial temperature, define finish semantics, and lock scaling off before
any runtime implementation PR.

Future Codex prompts must preserve:

* Creator captions are now accessible, but on-page transcript text was not.
* Direct captions and visible frames must remain distinguishable.
* The English subtitle track is described as AI-generated.
* The fixed example must not become an arbitrary scaling rule.
* Approximate / ranged creator instructions must not become false precision.
* Hybrid remains `needsReview` / `unverified` / placeholder-safe.
* No official affiliation or endorsement may be implied.

## 12. Out of scope

PR-012C makes:

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
