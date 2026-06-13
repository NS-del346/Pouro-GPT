# PR-013C: THE NEO BREW Additional Source Capture / Missing Semantics Review

## 1. Purpose

PR-013C follows PR-013A and PR-013B. PR-013B remained Option B because direct
creator-video capture was limited: the official description, chapters,
metadata, and limited player states were accessible, but no usable caption
track, transcript segments, or reliable frame-by-frame visual review was
available.

PR-013C incorporates additional handoff source-review input for THE NEO BREW.
The handoff is treated as user-supplied source-review input and a candidate
visual report, not automatically as runtime data or independently reviewable
primary visual evidence.

This PR is documentation-only. No runtime data or schedules are changed.

## 2. Baseline from PR-013A and PR-013B

| Field | Baseline |
| ----- | -------- |
| methodId | `ten-pour` |
| variantId | `R-09` |
| Candidate label | `THE NEO BREW` |
| PR-013A decision | Option B |
| PR-013B decision | Option B |

PR-013A and PR-013B confirmed from the creator description:

* `20g` coffee
* `300g` water
* direct `1:15` ratio
* ten pours
* `30g` each
* `15-second` interval
* `95-96 C`
* extra coarse / Comandante C40 `40-45` clicks
* HARIO NEO recommended / V60 acceptable

PR-013B left these fields unresolved:

* R-09 mapping approval
* first-pour / bloom semantics
* complete timer timestamps
* finish target
* drawdown / dripper-removal semantics
* filter
* scaling policy

## 3. Additional handoff input

The handoff reports a main display candidate equivalent to a 10-pour recipe,
with subtitle candidate `THE NEO BREW / HARIO V60 NEO`. Its reported recipe
card contains the complete candidate schedule below. The handoff text is
classified as `user_supplied_visual_review` or `candidate_visual_report`
because PR-013C does not include independently reviewable screenshot, clip, or
timestamped visual proof.

| Handoff field | Handoff value | Handoff status | Implementation status |
| ------------- | ------------- | -------------- | --------------------- |
| Coffee | `20g` | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Water | `300g` | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Ratio | `1:15` | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Temperature | `95-96 C` | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Grind | Comandante C40 `40-45` clicks | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Dripper | HARIO V60 NEO | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Pour count | `10` | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Each pour | `30g` | `already_primary_confirmed_by_PR013A` | `eligible_for_future_runtime_if_verified` |
| Step 1 | `0:00 / 30g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 2 | `0:30 / 60g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 3 | `0:45 / 90g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 4 | `1:00 / 120g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 5 | `1:15 / 150g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 6 | `1:30 / 180g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 7 | `1:45 / 210g` | `user_supplied_visual_review` | `not_eligible_without_reviewable_evidence` |
| Step 8 | `2:00 / 240g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 9 | `2:15 / 270g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Step 10 | `2:30 / 300g` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Completion | About `3:30` | `candidate_visual_report` | `not_eligible_without_reviewable_evidence` |
| Cumulative-target arithmetic | `30g` increments through `300g` | `app_calculated_from_confirmed_fields` | `eligible_as_app_calculated` |
| Filter | Not supplied | `unresolved` | `unresolved` |
| Scaling | No policy supplied | `unresolved` | `reject_for_scaling` |

The handoff explicitly states that `1:45 / 210g` was reportedly confirmed on
the video recipe card and must not be omitted or misread. It also states that
Gemini-assisted extraction is candidate input, not final implementation JSON.
Any future runtime JSON must be reconstructed and audited under project source
policy.

## 4. Evidence reconciliation matrix

| Field | PR-013A evidence | PR-013B evidence | PR-013C handoff input | Reconciled status | Runtime readiness | Notes |
| ----- | ---------------- | ---------------- | --------------------- | ----------------- | ----------------- | ----- |
| Method label | Creator heading `THE NEO BREW`; parent grouping internal | Creator description confirms `THE NEO BREW` | Display/subtitle candidate | `partial` | `needs_policy` | `THE NEO BREW` is `primary_confirmed`; do not imply that the repository grouping is creator-defined. |
| R-09 mapping | Plausible internal mapping only | Explicit approval missing | Assumes THE NEO BREW / R-09 review target | `unresolved` | `not_ready` | A source cannot approve an internal ID; project approval is still required. |
| Equipment | HARIO NEO recommended / V60 acceptable | Direct description support | HARIO V60 NEO | `primary_confirmed` | `ready` | Keep copy narrow. |
| Filter | No creator evidence | No reliable visible or stated evidence | Not supplied | `unresolved` | `unresolved` | Omit unless directly evidenced. |
| Coffee dose | `20g` direct | Reconfirmed from description | `20g` | `primary_confirmed` | `ready` | Exact example only. |
| Total water | `300g` direct | Reconfirmed from description | `300g` | `primary_confirmed` | `ready` | Exact example only. |
| Ratio | `1:15` direct | Reconfirmed from description | `1:15` | `primary_confirmed` | `ready` | Exact example only. |
| Pour count | Ten direct | Reconfirmed from description | Ten | `primary_confirmed` | `ready` | Does not by itself prove timestamps. |
| Pour amount | Ten `30g` pours direct | Reconfirmed from description | `30g` each | `primary_confirmed` | `ready` | Exact example only. |
| Cumulative targets | Arithmetic from confirmed fields | `app_calculated` | Reported on candidate card | `app_calculated` | `ready_as_app_calculated` | Until the card is reviewable, do not call cumulative targets visually confirmed. |
| Pour interval | `15-second` interval direct | Reconfirmed from description; first gap unresolved | Candidate starts `0:00`, `0:30`, then every `15s` | `partial` | `ready` | Only the general interval is ready; the distinct first-to-second gap remains candidate-only. |
| Exact step schedule | Third-party lead only | Unresolved | Complete candidate schedule | `candidate_visual_report` | `ready_as_candidate_pending_review` | Requires reviewable visual confirmation before runtime. |
| First-pour semantics | Unresolved | Unresolved | First candidate step at `0:00 / 30g` | `candidate_visual_report` | `ready_as_candidate_pending_review` | Supports a candidate start, not a bloom label. |
| Bloom semantics | Third parties interpret bloom | Creator did not directly use bloom label | First-to-second gap is `30s` | `unresolved` | `not_ready` | A `30s` gap does not prove the creator calls it bloom. |
| Water temperature | `95-96 C` direct | Reconfirmed from description | `95-96 C` | `primary_confirmed` | `ready` | Preserve as a range. |
| Grind size | Extra coarse / C40 `40-45` direct | Reconfirmed from description | C40 `40-45` clicks | `primary_confirmed` | `ready` | Keep clicks grinder-specific. |
| Finish target | `third_party_interpretation` lead only | Unresolved | About `3:30` completion | `candidate_visual_report` | `ready_as_candidate_pending_review` | After review, represent only as approximate guidance; meaning remains unclear without card context. |
| Drawdown/removal | Qualitative non-lingering guidance; exact action unresolved | Exact completion/removal unresolved | About `3:30` completion, no removal detail | `partial` | `not_ready` | Do not claim dripper-removal timing. |
| Scaling | Unsupported | Unsupported | No scaling policy | `rejected` | `not_ready` | Exact setup only if a future runtime candidate is approved. |
| Legal / non-affiliation | App policy | App policy | No affiliation claim | `partial` | `ready` | Future UI caution must state unofficial / no affiliation. |

No field is classified as `primary_visual_confirmed` in PR-013C. The handoff
does not include evidence that another reviewer can independently inspect.

## 5. Candidate schedule review

| Step | Handoff timestamp | Handoff cumulative target | Step pour amount | Evidence classification | App-calculation status | Runtime-safe in PR-013D? | Notes |
| ---: | ----------------: | ------------------------: | ---------------: | ----------------------- | ---------------------- | ------------------------ | ----- |
| 1 | `0:00` | `30g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Use `Pour 1`, not bloom. |
| 2 | `0:30` | `60g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Candidate first-to-second gap is `30s`. |
| 3 | `0:45` | `90g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Consistent with direct general `15s` interval. |
| 4 | `1:00` | `120g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Requires reviewable evidence. |
| 5 | `1:15` | `150g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Requires reviewable evidence. |
| 6 | `1:30` | `180g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Requires reviewable evidence. |
| 7 | `1:45` | `210g` | `30g` | Timestamp `user_supplied_visual_review`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Explicitly preserved; must not be omitted or misread. |
| 8 | `2:00` | `240g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Requires reviewable evidence. |
| 9 | `2:15` | `270g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Requires reviewable evidence. |
| 10 | `2:30` | `300g` | `30g` | Timestamp `candidate_visual_report`; pour amount `primary_confirmed` | Cumulative target `app_calculated` | No | Final-pour start is candidate-only. |
| 11 | About `3:30` completion | No pour | No pour | `candidate_visual_report` | Not applicable | No | Treat only as approximate guidance after manual confirmation; not removal timing. |

The candidate schedule is coherent with ten direct `30g` pours and the general
direct `15-second` interval after the candidate second pour. Coherence does not
promote the handoff timestamps to `primary_visual_confirmed`.

## 6. First-pour / bloom semantics review

1. **Does the handoff resolve first-pour start?** It supplies `0:00 / 30g` as
   a `candidate_visual_report`, but does not resolve it to reviewable primary
   evidence.
2. **Does it resolve first-to-second timing?** It supplies a candidate second
   pour at `0:30`; manual visual confirmation is still required for runtime.
3. **Does it resolve whether the first step is bloom?** No. The handoff does
   not provide direct creator wording that labels the first step bloom.
4. **Is `0:00 / 30g` and `0:30 / 60g` enough to treat first pour as a
   30-second bloom?** No. It supports a candidate `30-second` gap, not bloom
   semantics.
5. **Should future runtime label the first step Bloom or Pour 1?** Use
   `Pour 1` unless creator evidence explicitly labels it bloom.
6. **What must PR-013D do if runtime proceeds?** Confirm the visual schedule,
   use `Pour 1`, classify the timestamp as the accepted project evidence
   category, and avoid bloom wording.

## 7. Finish / drawdown / removal semantics review

1. **Does the handoff resolve about `3:30` completion?** It supplies about
   `3:30` as a `candidate_visual_report`, but not as independently reviewable
   proof.
2. **Is about `3:30` completion a target finish, observed finish, drawdown, or
   recipe-card guidance?** The handoff does not distinguish these meanings.
   Treat it as candidate recipe-card guidance.
3. **Can timer use `3:30` as `targetFinishSec`?** Not as an exact finish event
   from PR-013C. The semantics and evidence remain insufficient.
4. **Should it be `targetFinishApproxSec` or similar guidance instead?** If
   manually confirmed and the runtime model supports it safely, represent it
   as approximate target/guidance rather than an exact completion event.
5. **Is dripper removal still unresolved?** Yes.
6. **What must PR-013D do if runtime proceeds?** Preserve about `3:30` as
   approximate guidance, state what the field means, and make no
   dripper-removal claim without direct evidence.

## 8. Filter / equipment review

1. **Is HARIO V60 NEO supported?** Yes. Creator-description evidence supports
   HARIO NEO as recommended equipment.
2. **Does V60 acceptable remain supported?** Yes.
3. **Is HARIO V60 NEO required or recommended?** Recommended, not established
   as required.
4. **Is filter type resolved?** No.
5. **Should filter remain unresolved or omitted from runtime?** Yes. Omit it
   unless direct evidence resolves it.
6. **Should equipment copy be narrow?** Yes: HARIO V60 NEO recommended / V60
   acceptable. Do not claim Origami, flat-bottom, or generic dripper support.

## 9. Scaling review

1. **Does the handoff support arbitrary dose scaling?** No.
2. **Does the handoff support arbitrary ratio scaling?** No.
3. **Can non-`20g` / non-`300g` setup use the schedule?** Not as source-backed
   runtime behavior.
4. **Should PR-013D exact gate be `20g / 300g / 1:15` only?** Yes, if runtime
   later proceeds.
5. **Should non-exact setup fallback to placeholder?** Yes.

Scaling is unsupported. A future runtime candidate must use the exact setup
only, with placeholder fallback for every non-exact setup.

## 10. Runtime implementation decision

### Option B: Still not ready

The handoff is accepted as useful source-review input and preserves a coherent
complete candidate schedule, including `1:45 / 210g`. It is not sufficient
project-level evidence for runtime because PR-013C contains no independently
reviewable screenshot, clip, or timestamped visual proof. R-09 mapping also
remains unapproved, bloom wording remains unsupported, and about `3:30`
completion lacks precise semantics.

PR-013D runtime implementation may not proceed from PR-013C.

Missing evidence and approvals:

* independently reviewable visual capture of the full recipe card or schedule
* explicit project approval mapping `THE NEO BREW` to `R-09`
* confirmation that the exact schedule includes `1:45 / 210g`
* confirmation that about `3:30` is recipe-card guidance and how it should be
  represented
* confirmation that `Pour 1` is the safe first-step label
* explicit approval to omit the unresolved filter
* exact fixed-setup gate, disabled-scaling policy, and non-exact placeholder
  fallback for a later runtime PR

## 11. Minimum gate for PR-013D

A future runtime PR may proceed only if:

* PR-013C is superseded by Option A, or a specific Option C prerequisite is
  resolved.
* Exact setup gate is defined as `20g / 300g / 1:15` only.
* First step label is safe and does not overclaim bloom.
* Complete 10-pour schedule is accepted.
* `1:45 / 210g` is included.
* Completion at about `3:30` is approximate guidance unless exact semantics
  are directly evidenced.
* Scaling is disabled.
* Non-exact fallback is defined.
* Runtime `fieldEvidence` distinguishes `primary_confirmed`,
  `candidate_visual_report`, `app_calculated`, and `unresolved`.
* UI caution copy is required.
* No official affiliation or endorsement is implied.
* `npm.cmd run build` and `git diff --check` pass.

## 12. Independent Verifier Prompt

```text
Independently verify PR-013C against origin/main, PR-013A, PR-013B, and both
PR-013C documents.

Pass only if:
- the PR is docs-only
- no app source files, runtime data, or method schedules changed
- the handoff schedule is not overstated as runtime source_original
- primary_visual_confirmed is not used because no independently reviewable
  visual evidence is included
- candidate_visual_report and user_supplied_visual_review are used where
  appropriate
- 1:45 / 210g is included and not omitted
- first-pour and bloom semantics are safe and do not call Pour 1 a bloom
- about 3:30 is not overstated as exact finish, drawdown, or removal timing
- scaling is not approved without evidence
- app-calculated cumulative targets are separated from visual claims
- the Option B runtime decision follows the evidence
- no official affiliation or endorsement is implied
- npm.cmd run build and git diff --check pass
- no dist files are included

Report findings first, ordered by severity. If no issue is found, state Pass
and identify the residual manual visual-confirmation risk.
```

## 13. Regression Checker Prompt

```text
Run a regression-only review of PR-013C against origin/main.

Confirm:
- no runtime source file changes
- no src/data/placeholderMethods.ts changes
- no method schedules or runtime recipe values changed
- no timer or active-brew-state logic changed
- no route or BrowserRouter changes
- no localStorage key or storage schema changes
- no PWA, Service Worker, manifest, icon, workflow, or package changes
- no release docs or dist files
- no weakening of sourceStatus, verificationLevel, valuesArePlaceholder, or
  isPlaceholder
- no fieldEvidence changes in runtime files
- no new runtime 10 Pour candidate
- only docs/research/PR-013C-the-neo-brew-missing-semantics-review.md and
  docs/qa/PR-013C-the-neo-brew-missing-semantics-review.md changed
- npm.cmd run build and git diff --check pass

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 14. Memory / Handoff

Additional input incorporated:

* user-supplied / Gemini-assisted candidate visual report of the complete
  ten-pour recipe-card schedule
* candidate `0:00 / 30g`, `0:30 / 60g`, then `15-second` step starts through
  `2:30 / 300g`
* candidate about `3:30` completion guidance

The candidate schedule is accepted for documentation as
`candidate_visual_report`, not accepted for runtime. `1:45 / 210g` is
explicitly preserved and must not be omitted.

Runtime-ready direct fields remain `20g`, `300g`, `1:15`, ten pours, `30g`
each, general `15-second` interval, `95-96 C`, extra coarse / C40 `40-45`
clicks, and HARIO NEO recommended / V60 acceptable. Cumulative targets are
ready only as `app_calculated`.

Unresolved or blocked fields remain R-09 mapping approval, independently
reviewable exact schedule evidence, bloom semantics, precise about-`3:30`
finish meaning, dripper removal, filter, and scaling.

Final decision: **Option B**. PR-013D runtime implementation may not proceed.
Future Codex prompts must preserve the candidate evidence classification, the
complete schedule including `1:45 / 210g`, safe `Pour 1` wording, approximate
finish treatment, disabled scaling, placeholder fallback, and
non-affiliation wording.

Recommended next PR:

**PR-013D: THE NEO BREW Visual Evidence Attachment / Manual Source
Confirmation**

## 15. Out of scope

PR-013C makes:

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
