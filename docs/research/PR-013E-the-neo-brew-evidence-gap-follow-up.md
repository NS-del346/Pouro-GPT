# PR-013E: THE NEO BREW Evidence Gap Follow-up / Source Acquisition

## 1. Purpose

PR-013E follows PR-013A, PR-013B, PR-013C, and PR-013D. PR-013D remained
Option B because no reviewable visual evidence was supplied.

PR-013E adds the user-supplied recipe-card screenshot as an in-repository
evidence asset and reviews it conservatively. This PR is docs/evidence-only.
No runtime data or schedules are changed.

## 2. Baseline from PR-013D

| Field | PR-013D baseline |
| ----- | ---------------- |
| methodId | `ten-pour` |
| variantId | `R-09` |
| Candidate label | `THE NEO BREW` |
| PR-013D decision | Option B |

PR-013D was blocked because no reviewable visual evidence asset existed.
The candidate `1:45 / 210g` row was preserved but not visually confirmed,
R-09 mapping was not approved, completion semantics and filter were
unresolved, bloom semantics were unresolved, and scaling was unsupported.

## 3. Evidence acquisition log

| Evidence attempt | Input source | Result | Evidence file path | Source traceability | Legibility | Notes |
| ---------------- | ------------ | ------ | ------------------ | ------------------- | ---------- | ----- |
| User-supplied screenshot | Recipe-card screenshot attached to the PR-013E task | `accepted_for_review` | `docs/research/evidence/PR-013E-the-neo-brew-recipe-card.png` | `user_supplied_visual_evidence` | `clear` | The supplied asset is a PNG, so it is preserved as `.png`. It is reviewable in-repository but is not independently established as a creator-video frame. |

## 4. Evidence asset inventory

| Evidence ID | File / reference | Type | Source traceability | Legibility | Contains full schedule? | Contains 1:45 / 210g? | Accepted for review? | Notes |
| ----------- | ---------------- | ---- | ------------------- | ---------- | ----------------------- | --------------------- | -------------------- | ----- |
| E-001 | `docs/research/evidence/PR-013E-the-neo-brew-recipe-card.png` | `in_repo_image` | `user_supplied_visual_evidence` | `clear` | Yes | Yes | Yes | Full recipe card is legible. Classification remains user-supplied visual evidence; it is not promoted to `primary_visual_confirmed`. |

## 5. Visual schedule review

| Step | Candidate timestamp | Candidate cumulative target | Visible in evidence? | Evidence ID | Evidence class | Confidence | Runtime-ready? | Notes |
| ---: | ------------------: | --------------------------: | -------------------- | ----------- | -------------- | ---------- | -------------- | ----- |
| 1 | `0:00` | `30g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | First row is visible and includes a bloom/rest instruction. Keep the runtime step label neutral as `Pour 1`. |
| 2 | `0:30` | `60g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | The note says to pour to `60g`, then continue at `15-second` intervals in `30g` increments. |
| 3 | `0:45` | `90g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible. |
| 4 | `1:00` | `120g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible. |
| 5 | `1:15` | `150g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible. |
| 6 | `1:30` | `180g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible. |
| 7 | `1:45` | `210g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Critical row explicitly checked. `1:45 / 210g` is visible and legible and must not be omitted or replaced by an earlier misread. |
| 8 | `2:00` | `240g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible; nearby note says drawdown begins to slow around this point. |
| 9 | `2:15` | `270g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible. |
| 10 | `2:30` | `300g` | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes | Visible and legible; note says to finish pouring to `300g`. |
| 11 | About `3:30` completion | Not applicable | Yes | E-001 | `user_supplied_visual_evidence_confirmed` | high | Yes, as approximate guidance only | The card states completion after all liquid has drained through at about `3:30`. It does not state dripper-removal timing. |

The complete schedule is legible and accepted as
`user_supplied_visual_evidence_confirmed`. The image is not classified as
`primary_visual_confirmed` because PR-013E cannot independently establish that
it is a source-traceable creator-video frame.

The displayed timestamps and cumulative targets are visual-evidence fields.
Any future derived per-step delta, interval, countdown, or other arithmetic
must be classified separately as `app_calculated`; it must not inherit the
visual-evidence classification.

## 6. First-pour / bloom semantics

1. **Does evidence show `0:00 / 30g`?** Yes.
2. **Does evidence show `0:30 / 60g`?** Yes.
3. **Does evidence label the first step as bloom?** Yes. The first-row note
   visibly says `30g注いで蒸らす`, instructing the brewer to pour `30g` and
   bloom/rest.
4. **Is bloom wording approved?** It is approved only as
   `user_supplied_visual_evidence_confirmed` guidance. It must not be
   over-promoted to creator-primary evidence.
5. **Should future runtime use `Pour 1` instead?** Yes. `Pour 1` remains the
   safest step label; any bloom instruction must stay close to the visible
   wording and carry the visual-evidence classification.
6. **What remains unresolved?** No separate bloom-end event or additional
   bloom technique is shown. The `30-second` first-to-second gap must not be
   expanded into unsupported instructions.

## 7. Completion / finish semantics

1. **Does evidence show about `3:30`?** Yes.
2. **Is it labeled completion, drawdown, finish, or unspecified?** The
   Japanese line states that the recipe is complete once the full volume has
   drained through at about `3:30`. This supports approximate
   completion/drawdown guidance.
3. **Is dripper removal visible or stated?** No.
4. **Can runtime use exact total duration?** No. The card uses approximate
   wording.
5. **Should runtime use approximate guidance?** Yes: about `3:30`, after the
   full volume has drained through.
6. **What remains unresolved?** Exact finish time and dripper-removal timing
   remain unresolved.

## 8. Filter / equipment semantics

1. **Does evidence show HARIO V60 NEO?** Yes. `HARIO V60 NEO` is visible in
   the dripper field.
2. **Does prior creator description still support HARIO NEO recommended / V60
   acceptable?** Yes.
3. **Does evidence show a specific filter?** No specific filter type or model
   is stated.
4. **Should filter remain unresolved or omitted?** Yes.
5. **Should equipment copy remain narrow?** Yes: HARIO V60 NEO recommended /
   V60 acceptable. Do not broaden equipment support.

## 9. R-09 mapping approval

PR-013E approves the following project-policy wording:

`R-09 is Pourō's internal candidate mapping for THE NEO BREW fixed-example runtime. This mapping is a project implementation label, not a creator-provided name or official classification.`

1. **Does PR-013E approve mapping THE NEO BREW to R-09?** Yes.
2. **Is this approval a project policy decision?** Yes.
3. **Does it avoid claiming that the source uses R-09?** Yes.
4. **Does this approval apply only to the fixed `20g / 300g / 1:15` runtime
   candidate?** Yes.

## 10. Exact setup / scaling policy

1. **Does evidence support arbitrary dose scaling?** No.
2. **Does evidence support arbitrary ratio scaling?** No.
3. **Is runtime limited to exact setup only?** Yes.
4. **What is the exact setup candidate?** Coffee `20g`, water `300g`, ratio
   `1:15`.
5. **What is non-exact behavior?** Placeholder fallback.
6. **What UI caution is required?** State that this is a fixed example only,
   that non-exact setups remain unverified and use placeholder guidance, and
   that the app is unofficial with no affiliation or endorsement.

Scaling is unsupported.

## 11. Runtime implementation decision

### Option A: Ready for PR-013F runtime candidate

PR-013E selects Option A because the evidence image exists in-repository and
is legible; the complete schedule and critical `1:45 / 210g` row are visible;
R-09 mapping is approved as internal project policy; first-pour wording can be
represented safely; completion can be represented as approximate guidance;
filter omission is approved; and the exact-setup, disabled-scaling, and
non-exact placeholder-fallback policies are approved.

PR-013F boundaries:

* methodId: `ten-pour`
* variantId: `R-09`
* exact setup only: coffee `20g`, water `300g`, ratio `1:15`
* schedule:
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
* completion: about `3:30` as approximate completion/drawdown guidance, not
  an exact duration or dripper-removal event
* step labels: `Pour 1`, `Pour 2`, and so on; the first-pour bloom/rest note
  may be used only with its visual-evidence classification
* temperature: `95-96 C` range
* grind: extra coarse / Comandante C40 `40-45` clicks
* equipment: HARIO V60 NEO recommended / V60 acceptable
* filter: omit or keep unresolved
* scaling: unsupported
* non-exact setup: placeholder fallback
* UI caution: fixed example only; unofficial / no affiliation; source
  evidence is limited to the fixed setup

## 12. Minimum gate for PR-013F

A future runtime PR may proceed because PR-013E selects Option A, but it must
still satisfy all of these requirements:

* complete schedule accepted
* `1:45 / 210g` accepted
* R-09 mapping approved as internal project policy
* exact setup gate approved
* bloom wording avoided unless tied directly to the accepted visual evidence
* completion semantics represented only as approximate guidance
* filter omitted or unresolved
* scaling disabled
* non-exact placeholder fallback defined
* runtime `fieldEvidence` distinguishes:
  * `primary_description_confirmed`
  * `user_supplied_visual_evidence_confirmed`
  * `app_calculated`
  * `unresolved`
* UI caution copy required
* no official affiliation or endorsement
* build and diff check pass

## 13. Independent Verifier Prompt

```text
Independently verify PR-013E against origin/main and the PR-013A through
PR-013D research handoff.

Pass only if:
- the PR is docs/evidence-only
- no app source files, runtime data, or method schedules changed
- the evidence asset exists at
  docs/research/evidence/PR-013E-the-neo-brew-recipe-card.png
- the evidence asset is legible and contains the complete schedule
- the schedule is classified as user_supplied_visual_evidence_confirmed and
  is not over-promoted to primary_visual_confirmed
- 1:45 / 210g is explicitly checked, visible, and legible
- bloom wording is not invented or expanded beyond the visible first-row note
- about 3:30 is approximate completion/drawdown guidance, not an exact
  duration or dripper-removal event
- filter type is not invented
- R-09 mapping is project policy, not a source fact
- scaling is not approved without evidence
- Option A follows the evidence and retains an exact setup gate
- no official affiliation or endorsement is implied
- npm.cmd run build and git diff --check pass
- no dist files are included

Report findings first, ordered by severity. If no issue is found, state Pass
and identify the remaining source-traceability and unresolved-filter risks.
```

## 14. Regression Checker Prompt

```text
Run a regression-only review of PR-013E against origin/main.

Confirm:
- no runtime source file changes
- no src/data/placeholderMethods.ts changes
- no runtime recipe values or method schedules changed
- no timer or active-brew-state logic changed
- no route or BrowserRouter changes
- no localStorage key or storage schema changes
- no PWA, Service Worker, manifest, icon, workflow, or package changes
- no release docs or dist files
- no weakening of sourceStatus, verificationLevel, valuesArePlaceholder, or
  isPlaceholder
- no fieldEvidence changes in runtime files
- no new runtime 10 Pour candidate
- only the two PR-013E docs and the PR-013E evidence PNG changed
- npm.cmd run build and git diff --check pass

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 15. Memory / Handoff

Evidence was obtained and saved at
`docs/research/evidence/PR-013E-the-neo-brew-recipe-card.png`. The complete
ten-pour schedule was confirmed as
`user_supplied_visual_evidence_confirmed`, including the critical
`1:45 / 210g` row.

R-09 mapping is approved as an internal project-policy label only for the
fixed `20g / 300g / 1:15` candidate. Ready fields are the full schedule,
first-pour start and visible bloom/rest instruction, about-`3:30` approximate
completion/drawdown guidance, `95-96 C`, extra coarse / C40 `40-45` clicks,
and HARIO V60 NEO recommended / V60 acceptable.

Unresolved fields are a specific filter, exact completion time, dripper
removal, arbitrary scaling, and independent creator-video-frame
traceability. Final runtime decision: **Option A**. PR-013F may proceed within
the strict fixed-example boundaries in this document.

Future Codex prompts must preserve `1:45 / 210g`, the
`user_supplied_visual_evidence_confirmed` classification, neutral `Pour 1`
labeling, approximate completion guidance, unresolved filter, disabled
scaling, non-exact placeholder fallback, and non-affiliation wording.

Recommended next PR:

**PR-013F: THE NEO BREW Fixed Example Runtime Candidate / Exact Setup Gate**

## 16. Out of scope

PR-013E makes:

* no runtime recipe data changes
* no schedule changes in app source
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
