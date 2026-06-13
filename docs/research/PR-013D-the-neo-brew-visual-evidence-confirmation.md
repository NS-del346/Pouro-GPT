# PR-013D: THE NEO BREW Visual Evidence Attachment / Manual Source Confirmation

## 1. Purpose

PR-013D follows PR-013A, PR-013B, and PR-013C. PR-013C kept the NEO
schedule as `candidate_visual_report` / `user_supplied_visual_review` because
reviewable visual evidence was not in the repository.

PR-013D attempts to attach or reference independently reviewable visual
evidence. No screenshot, image, clip, or equivalent visual proof was supplied
with this review, so the candidate schedule cannot be upgraded to
`primary_visual_confirmed` or `user_supplied_visual_evidence_confirmed`.

This PR is documentation/evidence only. No runtime data or schedules are
changed.

## 2. Baseline from PR-013C

| Field | PR-013C baseline |
| ----- | ---------------- |
| methodId | `ten-pour` |
| variantId | `R-09` |
| Candidate label | `THE NEO BREW` |
| PR-013C decision | Option B |

PR-013C preserved this candidate schedule:

* `0:00 / 30g`
* `0:30 / 60g`
* `0:45 / 90g`
* `1:00 / 120g`
* `1:15 / 150g`
* `1:30 / 180g`
* `1:45 / 210g`
* `2:00 / 240g`
* `2:15 / 270g`
* `2:30 / 300g`
* about `3:30` completion

PR-013C did not allow runtime implementation because there was no
independently reviewable visual evidence, R-09 mapping was not explicitly
approved, finish semantics were unclear, filter remained unresolved, and a
fixed-setup policy was not approved for runtime use.

## 3. Evidence asset inventory

| Evidence ID | File / reference | Type | Source traceability | Legibility | Contains schedule? | Contains 1:45 / 210g? | Accepted for review? | Notes |
| ----------- | ---------------- | ---- | ------------------- | ---------- | ------------------ | --------------------- | -------------------- | ----- |
| E-001 | No visual asset or external visual reference supplied for PR-013D | `unavailable` | `not_available` | `not_available` | No | No | No | The PR-013D attachment set contained only the task brief. No image is added under `docs/research/evidence/`. |

PR-013D does not invent an evidence asset and does not claim direct
creator-video access.

## 4. Visual evidence review

| Field | Candidate value | Visible in evidence? | Evidence ID | Evidence class | Confidence | Notes |
| ----- | --------------- | -------------------- | ----------- | -------------- | ---------- | ----- |
| method / recipe heading | `THE NEO BREW` | No | E-001 | `primary_description_confirmed` | high for description; none visually | Creator-description support from PR-013A-C remains valid, but no PR-013D visual confirmation exists. |
| 20g coffee | `20g` | No | E-001 | `primary_description_confirmed` | high for description; none visually | Exact fixed-example field from prior description review. |
| 300g water | `300g` | No | E-001 | `primary_description_confirmed` | high for description; none visually | Exact fixed-example field from prior description review. |
| 1:15 | `1:15` | No | E-001 | `primary_description_confirmed` | high for description; none visually | Direct prior description field, not a visual claim. |
| 95-96 C | `95-96 C` | No | E-001 | `primary_description_confirmed` | high for description; none visually | Preserve as a range. |
| Comandante C40 40-45 clicks | C40 `40-45` clicks | No | E-001 | `primary_description_confirmed` | high for description; none visually | Keep grinder-specific. |
| HARIO V60 NEO | HARIO V60 NEO recommended | No | E-001 | `primary_description_confirmed` | high for description; none visually | V60 acceptable remains supported by prior description review. |
| 10 pours | Ten pours | No | E-001 | `primary_description_confirmed` | high for description; none visually | Does not establish exact schedule timestamps. |
| 30g per pour | `30g` each | No | E-001 | `primary_description_confirmed` | high for description; none visually | Exact `300g` example only. |
| 0:00 / 30g | `0:00 / 30g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 0:30 / 60g | `0:30 / 60g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 0:45 / 90g | `0:45 / 90g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 1:00 / 120g | `1:00 / 120g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 1:15 / 150g | `1:15 / 150g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 1:30 / 180g | `1:30 / 180g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 1:45 / 210g | `1:45 / 210g` | No | E-001 | `candidate_visual_report` | low | Explicitly preserved. It is not visible or legible in any PR-013D evidence and is not runtime-ready. |
| 2:00 / 240g | `2:00 / 240g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 2:15 / 270g | `2:15 / 270g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| 2:30 / 300g | `2:30 / 300g` | No | E-001 | `candidate_visual_report` | low | Preserved candidate; not visually confirmed. |
| about 3:30 completion | About `3:30` | No | E-001 | `candidate_visual_report` | low | Meaning remains unspecified; do not claim exact finish or removal timing. |
| filter | Unspecified | No | E-001 | `unresolved` | unresolved | Do not invent filter type. |
| bloom label | Unspecified | No | E-001 | `unresolved` | unresolved | Do not infer bloom from the candidate first-to-second gap. |
| dripper removal | Unspecified | No | E-001 | `unresolved` | unresolved | No removal action or timing is evidenced. |

No field is upgraded to `primary_visual_confirmed` or
`user_supplied_visual_evidence_confirmed`.

## 5. Schedule confirmation matrix

| Step | Candidate timestamp | Candidate cumulative target | Confirmed visually? | Evidence class | App-calculated? | Runtime-ready? | Notes |
| ---: | ------------------: | --------------------------: | ------------------- | -------------- | --------------- | -------------- | ----- |
| 1 | `0:00` | `30g` | No | `candidate_visual_report` | Target can be calculated from confirmed `30g` pours | No | Candidate start only; use `Pour 1`, not bloom. |
| 2 | `0:30` | `60g` | No | `candidate_visual_report` | Yes | No | Candidate first-to-second gap remains unconfirmed. |
| 3 | `0:45` | `90g` | No | `candidate_visual_report` | Yes | No | Consistent with the direct general interval, but not visually confirmed. |
| 4 | `1:00` | `120g` | No | `candidate_visual_report` | Yes | No | No reviewable visual evidence. |
| 5 | `1:15` | `150g` | No | `candidate_visual_report` | Yes | No | No reviewable visual evidence. |
| 6 | `1:30` | `180g` | No | `candidate_visual_report` | Yes | No | No reviewable visual evidence. |
| 7 | `1:45` | `210g` | No | `candidate_visual_report` | Yes | No | Critical row explicitly checked and preserved. `1:45 / 210g` is not visible or legible in PR-013D evidence. |
| 8 | `2:00` | `240g` | No | `candidate_visual_report` | Yes | No | No reviewable visual evidence. |
| 9 | `2:15` | `270g` | No | `candidate_visual_report` | Yes | No | No reviewable visual evidence. |
| 10 | `2:30` | `300g` | No | `candidate_visual_report` | Yes | No | Final-pour start remains candidate-only. |
| 11 | About `3:30` completion | Not applicable | No | `candidate_visual_report` | No | No | Keep only as candidate approximate guidance; semantics unresolved. |

Because row 7 is not visible in reviewable evidence, PR-013E runtime remains
blocked.

## 6. First-pour / bloom semantics

1. **Does the visual evidence show `0:00 / 30g`?** No. No visual evidence is
   available.
2. **Does the visual evidence show `0:30 / 60g`?** No.
3. **Does the visual evidence label the first step as bloom?** No.
4. **Does creator description or visual card label bloom?** The accessible
   creator description reviewed in PR-013A-C did not label it bloom, and no
   visual card is available here.
5. **Should future runtime use `Bloom`?** No, unless directly labeled by
   reviewable evidence.
6. **Should future runtime use `Pour 1`?** Yes, if a future runtime candidate
   is otherwise approved.
7. **Does the first-to-second gap imply bloom, or only a first pour plus next
   pour?** It establishes neither without reviewable evidence. Preserve it as
   a candidate first pour followed by a candidate next pour.

## 7. Finish / completion semantics

1. **Does the evidence show about `3:30`?** No.
2. **Is it labeled completion, drawdown, finish, or unspecified?** Unspecified.
3. **Is dripper removal shown?** No.
4. **Can future runtime use exact total duration?** No.
5. **Should future runtime represent `3:30` as approximate guidance?** Only
   after reviewable confirmation; it must remain approximate unless exact
   semantics are directly evidenced.
6. **What copy should be used to avoid overclaiming?** A future approved
   candidate should use wording such as `Target guidance: about 3:30` and
   should not claim exact completion, drawdown, or dripper-removal timing.

## 8. Filter / equipment semantics

1. **Is HARIO V60 NEO visible or stated?** It is stated in prior
   creator-description evidence, but is not visible in PR-013D evidence.
2. **Is V60 acceptable from prior description still valid?** Yes.
3. **Is a specific filter visible?** No.
4. **Is filter type readable?** No.
5. **Should future runtime omit filter or mark unresolved?** Yes. Omit it or
   mark it unresolved unless directly evidenced.
6. **Should equipment copy stay narrow?** Yes: HARIO V60 NEO recommended / V60
   acceptable. Do not broaden to Origami or flat-bottom drippers.

## 9. R-09 mapping approval

1. **Does PR-013D approve mapping THE NEO BREW to R-09 for Pourō internal
   runtime purposes?** No. PR-013D preserves it as the internal candidate
   review target but does not approve it for runtime.
2. **Is this a project policy decision rather than a source claim?** Yes.
   Sources cannot approve Pourō internal IDs.
3. **If approved, what exact wording applies?** Not applicable in PR-013D. A
   later project-policy approval may use:
   `R-09 is Pourō's internal candidate mapping for THE NEO BREW fixed-example runtime.`
4. **If not approved, what is the result?** Runtime remains blocked.

## 10. Scaling / exact setup policy

1. **Is arbitrary dose scaling allowed?** No.
2. **Is arbitrary ratio scaling allowed?** No.
3. **Is future runtime exact setup only?** If runtime is later approved, it
   must be exact setup only.
4. **What is the exact gate?** Coffee `20g`, water `300g`, ratio `1:15`.
5. **What is non-exact setup behavior?** Placeholder fallback.
6. **How should UI caution copy phrase this?** A future approved candidate
   should state: `Fixed 20g / 300g example only. Other setups remain
   unverified and use placeholder guidance. Unofficial; no affiliation or
   endorsement.`

Scaling is unsupported. This policy definition does not itself approve a
runtime candidate.

## 11. Runtime implementation decision

### Option B: Still not ready

PR-013D selects Option B because no screenshot, image, clip, external visual
reference, or equivalent reviewable evidence is available. The complete
candidate schedule cannot be visually confirmed, and the critical
`1:45 / 210g` row is not visible or legible in independently reviewable
evidence.

Additional blockers remain:

* R-09 internal mapping is not approved for runtime
* bloom wording remains unsupported
* about-`3:30` completion semantics remain unspecified
* filter remains unresolved
* the exact-setup and placeholder-fallback policy is defined here but has not
  been approved as part of an evidence-complete runtime candidate

PR-013E must not implement runtime data from PR-013D.

## 12. Minimum gate for PR-013E

A future runtime PR may proceed only if a later evidence review selects
Option A, or an Option C prerequisite is resolved.

Requirements:

* complete schedule accepted from reviewable evidence
* `1:45 / 210g` accepted from reviewable evidence
* R-09 mapping approved as project policy
* exact setup gate approved
* bloom wording avoided unless directly evidenced
* completion semantics safely represented
* filter omission / unresolved status approved
* scaling disabled
* non-exact placeholder fallback defined
* runtime `fieldEvidence` distinguishes
  `primary_description_confirmed`, accepted visual evidence,
  `app_calculated`, and `unresolved`
* UI caution copy required
* no official affiliation or endorsement
* build and diff check pass

## 13. Independent Verifier Prompt

```text
Independently verify PR-013D against origin/main, PR-013A, PR-013B, PR-013C,
and both PR-013D documents.

Pass only if:
- the PR is docs/evidence-only
- no app source files, runtime data, or method schedules changed
- an evidence asset exists if Option A is selected
- every claimed evidence asset is legible and its source traceability stated
- the unavailable evidence is not invented or over-promoted
- the schedule remains candidate-only without reviewable visual proof
- 1:45 / 210g is explicitly preserved and remains not runtime-ready because
  it is not visible in reviewable evidence
- bloom wording is not invented
- finish, drawdown, completion, and dripper-removal semantics are not
  overclaimed
- filter type is not invented
- R-09 mapping is treated as project policy, not a source fact
- scaling is not approved without evidence
- the Option B runtime decision follows the evidence
- no official affiliation or endorsement is implied
- npm.cmd run build and git diff --check pass
- no dist files are included

Report findings first, ordered by severity. If no issue is found, state Pass
and identify the remaining visual-source acquisition risk.
```

## 14. Regression Checker Prompt

```text
Run a regression-only review of PR-013D against origin/main.

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
- only docs/research/PR-013D-the-neo-brew-visual-evidence-confirmation.md and
  docs/qa/PR-013D-the-neo-brew-visual-evidence-confirmation.md changed
- npm.cmd run build and git diff --check pass

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 15. Memory / Handoff

No visual evidence was attached. There is no evidence file path.

The complete schedule was not visually confirmed. The candidate schedule is
preserved without promotion, including the critical `1:45 / 210g` row.
`1:45 / 210g` was explicitly checked and is not confirmed.

R-09 mapping was not approved for runtime. Description-supported fields remain
ready for a future evidence-complete candidate: `20g`, `300g`, `1:15`, ten
`30g` pours, general `15-second` interval, `95-96 C`, extra coarse / C40
`40-45` clicks, and HARIO V60 NEO recommended / V60 acceptable.

Unresolved or blocked fields remain the complete visual schedule,
`1:45 / 210g` visual confirmation, bloom semantics, about-`3:30` meaning,
dripper removal, filter, and R-09 project-policy approval.

Final runtime decision: **Option B**. PR-013E runtime implementation may not
proceed.

Future Codex prompts must preserve the complete candidate schedule including
`1:45 / 210g`, keep it candidate-only until visual proof is attached, use
`Pour 1` rather than bloom, keep about `3:30` approximate and unresolved,
disable scaling, use placeholder fallback for non-exact setups, and preserve
non-affiliation wording.

Recommended next PR:

**PR-013E: THE NEO BREW Evidence Gap Follow-up / Source Acquisition**

## 16. Out of scope

PR-013D makes:

* no runtime recipe data changes
* no schedule changes in app source
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
