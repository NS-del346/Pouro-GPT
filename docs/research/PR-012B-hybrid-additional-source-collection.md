# PR-012B: Hybrid Additional Source Collection / Creator Source Field Review

## 1. Purpose

PR-012A blocked Hybrid runtime implementation because the likely New Hybrid
mapping was not supported by directly inspected, field-level creator evidence.

PR-012B collects additional Hybrid / New Hybrid / HARIO Switch source
evidence, reviews what the creator source actually makes inspectable, and
updates the runtime-readiness decision for R-08.

This PR is documentation-only:

* no runtime data changes
* no method schedule changes
* no app source changes

External sources were inspected on 2026-06-12. Claims below are limited to
content that was actually accessible. Inaccessible transcript text and
third-party recipe summaries are not promoted to primary-confirmed evidence.

## 2. PR-012A baseline

PR-012A selected:

**Runtime decision: Option B - Not ready for runtime implementation.**

The main blockers were:

* the exact method identity represented by R-08 was ambiguous
* the creator source had not been field-transcribed
* third-party summaries were insufficient for runtime use
* exact switch phases, timings, temperatures, pours, and finish conditions
  were unresolved
* arbitrary dose scaling and ratio scaling were unsupported

PR-012B resolves part of the identity question. The creator-channel page
directly presents the recipe as an evolved Hybrid method, identifies HARIO
Switch as the used dripper, and states that the prior sequence was
percolation -> immersion while the evolved sequence is
immersion -> percolation -> immersion.

PR-012B does not resolve the field-level numeric recipe or scaling blockers.

## 3. Source access log

| Source ID | Source | URL | Access result | Inspectable content | Notes |
| --------- | ------ | --- | ------------- | ------------------- | ----- |
| S1 | TETSU KASUYA creator-channel video, `どんなコーヒー豆も「おいしくなる」究極系レシピ、進化しました。` | https://www.youtube.com/watch?v=4FeUp_zNiiY | partially_inspected | Creator channel and title, publication date, description, chapter markers, visible `NEW HYBRID Methods` recipe-chapter frame, HARIO Switch equipment note, caption-track availability metadata, visible comments | The description directly states prior `percolation -> immersion` and current `immersion -> percolation -> immersion`. A transcript control was visible, but transcript text did not load. Caption text could not be retrieved. Visible recipe summaries in comments were user-authored; no creator-authored or pinned field-level recipe comment was identified. Video audio was not transcribed. |
| S2 | HARIO Immersion Dripper SWITCH | https://global.hario.com/product/coffee/dripper/SSD.html | inspected | Product description, switch operation, article numbers, capacities, dimensions, materials | Confirms immersion followed by release when the switch is pressed. Lists 200mL and 360mL finished-capacity models. Does not identify the R-08 recipe or exact Switch model used by S1. |
| S3 | HARIO MUGEN x SWITCH DRIPPER | https://global.hario.com/product/new/mugen_x_switch_dripper.html | inspected | Product description, 200mL finished capacity, multiple named recipes with incompatible doses, temperatures, switch states, and times | Confirms that Switch equipment can alternate pour-over and immersion mid-brew. The published recipes are not identified as Tetsu Kasuya's New Hybrid method or Pourou R-08. |
| S4 | ZEROMILE interview: PHILOCOFFEA - Tetsu Kasuya | https://en.z-mile.com/series/coffeezamurai11_philocofea/ | inspected | Article text and interview context | Distinguishes Hybrid Method from later New Hybrid Method and describes New Hybrid as immersion -> percolation -> immersion. It does not publish a field-level recipe. |
| S5 | TETSU KASUYA creator-channel predecessor video, `【もう戻れない】このレシピは「神」か「悪魔」か？｜どんな豆も簡単に美味しくなる究極系。` | https://www.youtube.com/watch?v=gC8K40kZ_6E | partially_inspected | Creator channel and title, description, chapter markers, HARIO Switch equipment note, caption-track availability metadata | S1 directly links S5 as the prior Hybrid recipe. The page confirms a HARIO Switch extraction recipe but does not expose exact field-level values in its description. Transcript text was not inspected. |
| S6 | Timer.Coffee: `2025 "New Hybrid" Hario Switch recipe by Tetsu Kasuya` | https://www.timer.coffee/recipes/hario-switch/2025-new-hybrid-hario-switch-recipe-by-tetsu-kasuya/ | inspected | Structured recipe page with dose, water, temperature, grind, timing, switch states, and pours | Useful candidate transcription linked to S1, but it is a third-party interpretation and contains timing choices not directly confirmed from S1 in this review. |
| S7 | Timer.Coffee: `Tetsu Kasuya "Devil" recipe for Hario Switch` | https://www.timer.coffee/recipes/hario-switch/tetsu-kasuya-devil-recipe-for-hario-switch/ | inspected | Structured older-recipe page with dose, water, temperature, timing, switch states, and pours | Demonstrates that the older Hybrid / Devil-style recipe conflicts with the New Hybrid candidate. It is third-party interpretation. |
| S8 | Koyo Coffee HARIO Switch guide | https://koyo-coffee.com/switch/ | inspected | Article text, older Hybrid summary, New Hybrid distinction, HARIO Switch size discussion | Separates older Hybrid from the 2025 New Hybrid change and links S1. It is a third-party guide and does not directly transcribe the full New Hybrid recipe. |

No separate official or creator-adjacent field-level recipe publication was
found through focused searches of the creator's site and PHILOCOFFEA site.

## 4. Source classification

| Source ID | Category | Verification strength | Runtime use allowed? | Reason |
| --------- | -------- | --------------------- | -------------------- | ------ |
| S1 | official_or_primary_like | Strong for creator attribution, evolved Hybrid identity, HARIO Switch use, and broad phase order; incomplete for numeric fields | partial | Direct creator-channel page evidence supports only the claims actually visible in the description and recipe-chapter frame. Transcript text and exact field values were not inspected. |
| S2 | official_or_primary_like | Strong for manufacturer equipment facts | partial | May support Switch operation and product capacity facts, but not the R-08 recipe mapping. |
| S3 | official_or_primary_like | Strong for MUGEN x Switch equipment and recipe-diversity facts | no | The named recipes demonstrate possible Switch behavior but are not New Hybrid evidence. |
| S4 | researched_summary | Medium for identity and phase-order corroboration | no | The interview supports the distinction between Hybrid and New Hybrid but does not publish the recipe. |
| S5 | official_or_primary_like | Strong for predecessor creator-source identity and HARIO Switch use; incomplete for fields | partial | It is the creator-channel predecessor linked by S1, but exact recipe fields were not inspected. |
| S6 | third_party_interpretation | Low for runtime authority; useful structured candidate | no | It may identify fields to verify, but it cannot make those fields source-original. |
| S7 | third_party_interpretation | Low for runtime authority; useful conflict evidence | no | It documents an incompatible older recipe but is not primary evidence. |
| S8 | third_party_interpretation | Low for runtime authority; useful version distinction | no | It supports disambiguation only and cannot promote recipe fields. |

No complete source qualifies as `primary_confirmed` for the full runtime
recipe. Limited claims directly visible on S1 can be treated as
primary-confirmed at field level without upgrading the source as a whole or
clearing any runtime caution state.

## 5. Field-level evidence review

| Field | Candidate value / claim | Source support | Category | Runtime readiness | Notes |
| ----- | ----------------------- | -------------- | -------- | ----------------- | ----- |
| method identity | S1 presents an evolved / New Hybrid HARIO Switch method; R-08 most likely maps to it | S1 directly presents an evolved Hybrid, uses a visible `NEW HYBRID Methods` frame, and names HARIO Switch; S4 corroborates the New Hybrid name | researched_summary | partial | The S1 identity facts are directly supported, but the R-08-to-S1 repository mapping remains an unapproved `needs_review` interpretation. |
| creator attribution context | Tetsu Kasuya creator-channel method | S1 and S5 are published by `TETSU KASUYA World Brewers Cup Champion` | primary_confirmed | partial | Attribution may be documented without implying approval, supervision, partnership, or endorsement of Pourou. |
| HARIO Switch equipment | HARIO Switch is the used dripper for S1 | S1 description names HARIO Switch; S2 confirms the equipment mechanism | primary_confirmed for equipment family | partial | Exact model and capacity remain unresolved. |
| Switch model / capacity | 200mL or 360mL standard Switch; exact S1 model unknown | S2 lists both models and capacities | official_or_primary_like | unresolved | Do not select a model from appearance or assume 300g means the 360mL model. |
| coffee dose | Likely 20g candidate | S6, visible user comments on S1, and other third-party summaries agree | third_party_interpretation | not_ready | S1 description and inspected frame do not expose the dose. |
| water amount | Likely 300g candidate | S6 and third-party summaries; older S7 uses 280g | third_party_interpretation | not_ready | Value depends on the selected recipe version. |
| ratio | Likely 1:15 candidate inferred from 20g / 300g | Third-party values and current R-08 recommendation | third_party_interpretation | not_ready | The ratio was not directly confirmed from S1 and must not be promoted by inference. |
| water temperature 1 | Candidate reports differ between about 90C and 93C | S6 says 90C; third-party posts and guides vary; S1 inspected content does not expose it | third_party_interpretation | unresolved | Exact initial temperature is not source-confirmed. |
| water temperature 2 | Candidate reports generally say 70-80C for the later immersion | S6 and third-party summaries | third_party_interpretation | not_ready | The broad temperature-change concept is plausible, but exact range and action are not directly inspected from S1. |
| grind size | Candidate reports include medium-fine, coarse, and 28 Comandante clicks | S6, S8, and other third-party summaries conflict | third_party_interpretation | unresolved | Grinder clicks are device-specific and cannot become a generic runtime label without review. |
| first phase type | immersion | S1 directly states the evolved sequence begins with immersion; S4 corroborates | primary_confirmed | partial | The phase type is supported, but its start/end, switch action, and water amount are not. |
| second phase type | percolation | S1 directly states the evolved sequence places percolation second; S4 corroborates | primary_confirmed | partial | Exact pours and phase boundaries remain unresolved. |
| third phase type | immersion | S1 directly states the evolved sequence ends with immersion; S4 corroborates | primary_confirmed | partial | Release and finish behavior remain unresolved. |
| switch closed/open timing | Candidate summaries give close/open actions around 0:00, 0:35-0:40, 2:05-2:10, and 2:45 | S6 and visible third-party comments | third_party_interpretation | not_ready | S1 confirms phase order, not exact switch-action times. |
| pour count | Likely four pours for the New Hybrid candidate | S6 and third-party summaries; older S7 has a different sequence | third_party_interpretation | not_ready | Count is not directly confirmed from inspected S1 content. |
| pour amounts | Candidate sequence approximately 40-50g, to 120g, to 200g, to 300g | S6 and third-party summaries | third_party_interpretation | not_ready | Exact first-pour range and per-pour interpretation require direct creator-source confirmation. |
| cumulative water | Candidate cumulative targets 120g, 200g, 300g | S6 and third-party summaries | third_party_interpretation | not_ready | Not directly inspected from S1. |
| release timing | Candidate final release at 2:45 | S6 and third-party summaries | third_party_interpretation | not_ready | Must be distinguished from pour timing and finish time. |
| drawdown / finish time | Candidate target around 3:30 | S6 and third-party summaries; older S7 differs | third_party_interpretation | not_ready | S1 inspected content does not establish whether 3:30 is target finish, removal, or guaranteed drawdown. |
| dose scaling | No arbitrary scaling rule confirmed | No inspected primary-like source supports arbitrary dose scaling | unresolved | unresolved | A user comment reports a 30g brew, but user experience is not creator guidance or a scaling formula. |
| ratio scaling | No arbitrary scaling rule confirmed | No inspected primary-like source supports arbitrary ratio changes | unresolved | unresolved | Current app-adjustable ratio behavior is not evidence that the source recipe scales safely. |
| app UI caution copy | Preserve current confirmation-needed / placeholder-safe copy | Current app state and PR-012A gate | researched_summary | ready | The UI must not imply that numeric New Hybrid fields are confirmed. |
| source metadata | S1 should be the creator-source candidate; S2 may support equipment facts | S1 and S2 | official_or_primary_like | partial | A later mapping must state the narrow supported scope and avoid affiliation claims. |
| provenance plan | Identity and three phase types may be candidate `source_original`; numeric fields remain `needs_review` or `unresolved` | S1 plus PR-011D model | researched_summary | ready | This is a future documentation plan only; no runtime `fieldEvidence` changes are made. |

Answers to the evidence questions:

1. The creator source clearly identifies an evolved Hybrid method using HARIO
   Switch; the visible recipe-chapter frame uses `NEW HYBRID Methods`.
2. S1 clearly distinguishes the evolved sequence from the prior Hybrid
   sequence.
3. No complete source-backed recipe was inspectable.
4. The creator page directly supports equipment and broad three-phase order,
   but not the required numeric field set.
5. Arbitrary dose scaling is unsupported.
6. Arbitrary ratio scaling is unsupported.
7. The current `20g / 300g / 1:15` recommendation remains only a plausible
   third-party-aligned candidate.
8. A narrow runtime candidate is not yet safe.
9. Exact numeric fields, timing, switch actions, finish semantics, model
   assumptions, and scaling remain blocked.
10. The next evidence PR must obtain a reviewable creator-source transcript or
    timestamped frame-by-frame field capture and reconcile every field before
    runtime work.

## 6. Conflicting recipe/version analysis

| Candidate recipe/version | Evidence | Matches R-08? | Conflicts / uncertainty |
| ------------------------ | -------- | ------------- | ----------------------- |
| Older Hybrid / Devil-style Switch recipe | S1 directly labels the prior sequence as percolation -> immersion; S5 is the linked predecessor; S7 and S8 provide third-party field summaries | No; it matches the broad parent name but conflicts with the R-08 `NEW` label | Third-party summaries use 20g / 280g, a different phase order, fewer pours, and a different finish target. Exact creator-source fields were not inspected. |
| 2025 evolved / New Hybrid candidate | S1 directly supports evolved Hybrid identity, HARIO Switch use, and immersion -> percolation -> immersion; S4 corroborates; S6 provides a third-party structured candidate | Most likely | Exact numeric fields, timing, switch actions, temperature values, grind, and finish semantics are not directly confirmed from inspected creator content. |
| General HARIO Switch / MUGEN x Switch examples | S2 documents standard Switch operation; S3 publishes multiple incompatible MUGEN x Switch recipes | No | Manufacturer examples prove capability, not the identity or schedule of R-08. |
| Current Pourou R-08 label and recommendations | Repository label suggests `NEW Hybrid / HARIO Switch`; recommendations are 20g / 300g / 1:15 | Plausibly points to the evolved / New Hybrid candidate | The label and recommendations have no attached source metadata or field evidence and remain `needsReview` / `unverified` / placeholder-safe. |

R-08 most likely represents the evolved / New Hybrid HARIO Switch method
shown in S1. That mapping is now more than a general guess because S1 directly
confirms the evolved Hybrid identity, HARIO Switch equipment family, and the
three-phase order.

The mapping is still not complete enough for runtime. Implementing the
third-party candidate schedule would make users reasonably believe that its
exact values and timings were creator-confirmed, even though the directly
inspected creator content did not expose those fields.

## 7. Runtime implementation decision

### Option B: Still not ready for runtime implementation

PR-012B keeps Option B.

The evidence now supports a narrower future identity mapping:

* R-08 most likely maps to the evolved / New Hybrid method in S1
* HARIO Switch is the supported equipment family
* the broad phase order is immersion -> percolation -> immersion

Runtime remains blocked because the required recipe fields are still supported
only by third-party interpretations or remain unresolved:

* coffee dose, water amount, and ratio
* initial and later water temperatures
* grind guidance
* exact switch open/closed actions and times
* pour count, pour amounts, cumulative targets, and timing
* release, drawdown, and finish semantics
* exact Switch model / capacity assumptions
* arbitrary dose scaling and ratio scaling

No Hybrid runtime value, method schedule, or runtime `fieldEvidence` should be
implemented from PR-012B.

## 8. Future Hybrid fieldEvidence plan

| Future field | Candidate treatment | Provenance | Required evidence before implementation |
| ------------ | ------------------- | ---------- | --------------------------------------- |
| R-08 source identity | Candidate mapping to S1 evolved / New Hybrid HARIO Switch method | needs_review | Explicit repo approval of the R-08-to-S1 mapping and a scope note that avoids affiliation claims. |
| creator attribution | Attribute the reviewed method source without endorsement wording | source_original | Direct S1 metadata plus approved user-facing wording. |
| HARIO Switch equipment family | Candidate source-backed equipment family | source_original | S1 equipment note and S2 manufacturer capability facts; exact model must remain separate. |
| exact Switch model / capacity | Leave unimplemented | unresolved | Direct source or reviewed visual evidence that identifies the model and explains capacity implications. |
| first / second / third phase type | Candidate immersion -> percolation -> immersion mapping | needs_review | Timestamped S1 evidence and approved mapping to the runtime step model. |
| coffee dose | Leave unresolved | unresolved | Direct creator-source field evidence and decision on example versus fixed value. |
| water amount | Leave unresolved | unresolved | Direct creator-source field evidence for the selected version. |
| ratio | Leave unresolved; do not infer automatically | unresolved | Direct ratio evidence or an approved `app_calculated` derivation note. |
| water temperatures | Leave unresolved | unresolved | Direct creator-source evidence for each phase and any allowed range. |
| temperature-change instruction | Candidate only | needs_review | Direct timestamped instruction and approved operational wording. |
| grind guidance | Leave unresolved | unresolved | Direct source guidance that can be represented without over-generalizing grinder clicks. |
| switch actions and timing | Leave unresolved | unresolved | Direct creator-source evidence for every open/close action and timestamp. |
| pour count, amounts, and cumulative water | Leave unresolved | unresolved | Direct creator-source evidence for every implemented step. |
| release / drawdown / finish | Leave unresolved | unresolved | Direct evidence distinguishing release action, target finish, and completed drawdown. |
| arbitrary dose scaling | No automatic scaling approved | unresolved | Reviewed creator formula or explicit app-calculated policy with safe fallback. |
| arbitrary ratio scaling | No automatic scaling approved | unresolved | Reviewed source support or explicit app-guidance policy with safe fallback. |
| app caution copy | Preserve current caution behavior | app_guidance | Keep until every displayed runtime field has approved provenance. |
| source metadata | Candidate S1 primary-like source plus S2 equipment source | needs_review | Approved field-level mapping and narrow source notes. |
| current placeholder recipe and generic steps | Preserve | placeholder | Replace only in a separately approved runtime PR after the evidence gate passes. |

## 9. Independent Verifier Prompt

```text
Independently verify PR-012B: Hybrid Additional Source Collection / Creator
Source Field Review.

Review the full diff against origin/main and the two PR-012B documents.

Pass only if:
- the PR is docs-only
- no runtime data, method schedules, or app source files changed
- source access claims describe only content actually inspected
- the creator source is not overclaimed
- inaccessible transcript text is explicitly documented
- user comments and third-party summaries are not treated as primary evidence
- manufacturer sources are used only for equipment facts, not the R-08 recipe
- source classifications are conservative
- the runtime decision follows the evidence
- Option B remains selected while critical numeric fields are unresolved
- no official affiliation, approval, supervision, partnership, or endorsement
  is implied
- follow-up recommendations specify the exact missing creator-source review
- the Independent Verifier Prompt, Regression Checker Prompt, Memory / Handoff,
  and Out of scope sections are present

Report findings first, ordered by severity. If no issue is found, state Pass
and identify any residual evidence risk.
```

## 10. Regression Checker Prompt

```text
Run a regression-only review of PR-012B against origin/main.

Confirm:
- only docs/research/PR-012B-hybrid-additional-source-collection.md and
  docs/qa/PR-012B-hybrid-additional-source-collection.md changed
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
- npm.cmd run build passes
- git diff --check passes

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 11. Memory / Handoff

What was learned:

* S1 directly narrows R-08 toward the evolved / New Hybrid HARIO Switch method.
* S1 directly distinguishes the prior percolation -> immersion sequence from
  the evolved immersion -> percolation -> immersion sequence.
* HARIO Switch equipment family and broad phase order are now supportable
  identity claims.

Useful sources:

* S1 for creator attribution, evolved Hybrid identity, equipment family, and
  broad phase order
* S2 for manufacturer Switch operation and capacity facts
* S4 for corroborating the Hybrid versus New Hybrid distinction

Insufficient sources:

* S1 transcript text and exact field values were not accessible in this review.
* Visible S1 recipe comments, S6, S7, and S8 are third-party interpretations.
* S3 demonstrates Switch flexibility but does not identify the R-08 recipe.

Must not be implemented yet:

* Hybrid numeric recipe values
* Hybrid switch-action schedule
* Hybrid timing, temperature, grind, release, or finish fields
* arbitrary Hybrid dose or ratio scaling
* runtime Hybrid `fieldEvidence`

Recommended next PR:

**PR-012C: Hybrid Creator Transcript / Timestamped Field Capture Gate**

It should remain docs-only unless it obtains a reviewable creator-source
transcript or timestamped frame-by-frame evidence for every required field,
reconciles conflicts, and explicitly approves a narrow runtime candidate.

Future Codex prompts must preserve:

* R-08 most likely maps to S1, but that mapping is not yet runtime-approved.
* Broad phase identity is not permission to invent exact steps.
* Third-party recipe summaries cannot become `source_original`.
* Hybrid remains `needsReview` / `unverified` / placeholder-safe.
* No official affiliation or endorsement may be implied.

## 12. Out of scope

PR-012B makes:

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no storage changes
* no route changes
* no release docs changes
