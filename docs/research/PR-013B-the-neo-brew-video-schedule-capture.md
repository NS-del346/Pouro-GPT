# PR-013B: THE NEO BREW Creator Video Schedule / Finish Semantics Capture

## 1. Purpose

PR-013B follows PR-013A. PR-013A found major fixed-example fields for
`THE NEO BREW`, but blocked runtime implementation because exact schedule,
first-pour, and finish semantics remained unresolved.

PR-013B inspects the creator video directly and records what the available
video page, creator-authored description, player, and transcript controls can
and cannot support.

This PR is documentation-only. No runtime data or schedules are changed.

## 2. Baseline from PR-013A

| Field | PR-013A baseline |
| ----- | ---------------- |
| methodId | `ten-pour` |
| variantId | `R-09` |
| Candidate label | `THE NEO BREW` |
| PR-013A decision | Option B: not ready |

PR-013A supported `20g`, `300g`, direct `1:15`, ten pours, `30g` each,
`15-second` interval, `95-96 C`, extra coarse / Comandante C40 `40-45`
clicks, and HARIO NEO recommended / V60 acceptable.

PR-013A left R-09 mapping approval, first-pour / bloom semantics, complete
timer timestamps, finish target, drawdown / dripper-removal semantics, filter,
and scaling policy unresolved.

## 3. Video access log

| Source ID | Source | Access result | Captions available | Description available | Visual review possible | Notes |
| --------- | ------ | ------------- | ------------------ | --------------------- | ---------------------- | ----- |
| S1 | TETSU KASUYA creator-channel video, [source URL](https://www.youtube.com/watch?v=k0nsShguOsU) | Partial access on 2026-06-13. Watch page, metadata, chapters, creator description, player duration, thumbnail, and limited player states were accessible. | No usable caption track. Player reported captions unavailable. A transcript control appeared, but opening it yielded zero transcript segments. A limited English auto-generated overlay was visible at `14:22`. | Yes | Partial only. The player could be opened and seek state inspected, but advertising/privacy cards and a non-refreshing paused image prevented reliable frame-by-frame review of the full extraction demonstration. The official embed fallback returned player error 153. | Duration shown as `27:12`; creator description marks extraction demonstration at `12:32` and tasting at `17:17`. Access limitations are not treated as evidence for missing semantics. |

Visual review was attempted in the YouTube watch player by opening the creator
URL, starting playback, skipping available advertising, using the creator's
chapter marker at `12:32`, seeking within the demonstration, checking the
reported player time, and taking player screenshots. Because demonstration
frames did not render reliably, no exact pour event is claimed.

## 4. Timestamped capture log

| Capture ID | Video timestamp | Evidence type | Observed / quoted content | Field supported | Evidence class | Confidence | Notes |
| ---------- | --------------: | ------------- | ------------------------- | --------------- | -------------- | ---------- | ----- |
| C-002 | N/A (description) | official_description | Creator description names `THE NEO BREW` and describes it as a multi-pour recipe. | Recipe heading / method name | primary_confirmed | high | Description evidence has no video timestamp and does not approve Pourō's internal R-09 mapping. |
| C-003 | `3:25` chapter marker | official_description | Chapter is labeled as the concrete recipe parameters section. | Location of parameter discussion | official_or_primary_like | high | Unavailable captions prevent timestamp-level speech claims inside it. |
| C-004 | description; no exact speech timestamp | official_description | Fixed example states `20g`, `300g`, `1:15`, `95-96 C`, extra coarse / C40 `40-45` clicks, HARIO NEO recommended, and V60 acceptable. | Dose, water, ratio, temperature, grind, equipment | primary_confirmed | high | Description-supported fields, not captured creator speech. |
| C-005 | description; no exact speech timestamp | official_description | Total water is split into ten `30g` pours at `15-second` intervals. | Pour count, pour amount, interval | primary_confirmed | high | Does not state timer origin or enumerate exact step starts. |
| C-006 | `12:32` chapter marker | official_description | Chapter is labeled as the actual extraction demonstration. | Demonstration location | official_or_primary_like | high | Reliable frame-by-frame capture was not possible. |
| C-007 | `14:22` | auto_caption | Auto-generated English overlay: "The goal is not to let water sit in the dripper." | General non-lingering guidance | official_or_primary_like | medium | Not a manual caption or verified verbatim Japanese transcript; does not establish finish or removal timing. |
| C-008 | description; no exact speech timestamp | official_description | Pouring guidance says to avoid retaining water in the dripper and let it pass through cleanly. | General drawdown behavior | primary_confirmed | high | Qualitative guidance only. |
| C-009 | `17:17` chapter marker | official_description | Chapter changes to post-extraction tasting and evaluation. | Broad demonstration endpoint context | official_or_primary_like | medium | Does not establish brew timer finish, drawdown completion, or removal time. |
| C-010 | full demonstration review attempt | unresolved | No usable caption transcript or reliable visible-frame sequence was available for exact pour events. | Pour 1 start, pour 2 start, pours 3-10 starts, final pour, finish, removal | unresolved | unresolved | Do not substitute third-party schedules or arithmetic. |
| C-011 | full source review | unresolved | Creator does not directly call the first pour a bloom in the accessible description. | Bloom semantics | unresolved | unresolved | No directly evidenced `30-second` bloom wait was captured. |
| C-012 | full source review | unresolved | No arbitrary dose or ratio scaling policy was captured. | Scaling | unresolved | unresolved | Fixed example and equal pours do not authorize arbitrary scaling. |
| C-013 | full source review | unresolved | No specific filter type, material, or model was directly captured from a reliable visible frame, creator speech, caption, or description. | Filter | unresolved | unresolved | Do not infer filter semantics from the creator thumbnail. |

No manual caption was available. No third-party interpretation is promoted in
this capture log. No `creator_speech` item is claimed because no usable
timestamped transcript was available and speech was not independently
transcribed.

## 5. Schedule reconstruction

| Step | Proposed runtime step label | Start time | Pour amount | Cumulative target | Evidence source | Precision | Runtime-safe? | Notes |
| ---: | --------------------------- | ---------: | ----------: | ----------------: | --------------- | --------- | ------------- | ----- |
| 1 | Pour 1 | unresolved | `30g` | `30g` | S1 description; cumulative is arithmetic | unresolved | No | Timer origin, first-pour start, and bloom label unresolved; cumulative target is app-calculated. |
| 2 | Pour 2 | unresolved | `30g` | `60g` | S1 description; cumulative is arithmetic | unresolved | No | First-to-second timing not directly captured; cumulative target is app-calculated. |
| 3 | Pour 3 | unresolved | `30g` | `90g` | S1 description; cumulative is arithmetic | unresolved | No | `15-second` interval is direct; absolute schedule is not; cumulative target is app-calculated. |
| 4 | Pour 4 | unresolved | `30g` | `120g` | S1 description; cumulative is arithmetic | unresolved | No | Start convention unresolved; cumulative target is app-calculated. |
| 5 | Pour 5 | unresolved | `30g` | `150g` | S1 description; cumulative is arithmetic | unresolved | No | Start convention unresolved; cumulative target is app-calculated. |
| 6 | Pour 6 | unresolved | `30g` | `180g` | S1 description; cumulative is arithmetic | unresolved | No | Start convention unresolved; cumulative target is app-calculated. |
| 7 | Pour 7 | unresolved | `30g` | `210g` | S1 description; cumulative is arithmetic | unresolved | No | Start convention unresolved; cumulative target is app-calculated. |
| 8 | Pour 8 | unresolved | `30g` | `240g` | S1 description; cumulative is arithmetic | unresolved | No | Start convention unresolved; cumulative target is app-calculated. |
| 9 | Pour 9 | unresolved | `30g` | `270g` | S1 description; cumulative is arithmetic | unresolved | No | Start convention unresolved; cumulative target is app-calculated. |
| 10 | Pour 10 | unresolved | `30g` | `300g` | S1 description; cumulative is arithmetic | unresolved | No | Final-pour start and completion unresolved; cumulative target is app-calculated. |

The description supports ten equal pours and a `15-second` interval. It does
not establish that Pour 1 starts at `0:00`, whether Pour 2 starts at `0:15` or
after a separate bloom wait, or what event ends the timer. An exact schedule
cannot be marked runtime-safe.

Any future arithmetic reconstruction must be labeled `app_calculated`, not
source-original.

## 6. First-pour / bloom semantics

1. **Does the creator call the first pour "bloom"?**
   No directly accessible creator-video evidence captured that label.
2. **Is the first pour simply pour 1 of 10?**
   The description is consistent with that interpretation, but the
   demonstration could not be reviewed reliably enough to make it runtime-safe.
3. **Is there a 30-second wait after the first pour?**
   Unresolved. No direct creator evidence was captured.
4. **Is the second pour at `0:15`, `0:30`, or another time?**
   Unresolved. The description supports a general `15-second` interval but not
   a captured timer origin or first-to-second event.
5. **Is the first-to-second interval directly evidenced by the creator video?**
   Not at the required timestamped operational precision.
6. **Can the first step be safely labeled as bloom in the app?**
   No.
7. **If not, what safer label should be used?**
   `Pour 1` is safer, but must not be implemented as a timed runtime step until
   the complete schedule convention is approved.

## 7. Finish / drawdown / removal semantics

1. **Is a target finish time directly stated?** No.
2. **Is `3:30` directly stated by creator source, or only third-party?** It
   remains third-party-only from PR-013A and is not creator-confirmed here.
3. **Is a drawdown target stated?** Only qualitative non-lingering guidance is
   direct; no clock time or numeric range was captured.
4. **Is dripper removal shown or stated?** Unresolved.
5. **What defines completion?** Unspecified. End of final pour, water drained
   through, dripper removed, and target clock time are unconfirmed.
6. **Can the timer safely use a fixed total duration?** No.
7. **What should remain approximate or unresolved?** Final pour timing,
   drawdown duration, removal time, and total timer duration remain unresolved.

The `17:17` chapter change is not a brew finish target. It only shows that the
video has moved to post-extraction evaluation by that video timestamp.

## 8. Filter and equipment semantics

1. **Is HARIO NEO visible or stated?** Directly stated as recommended.
2. **Is V60 acceptable directly stated?** Yes.
3. **Is a specific V60 model stated?** No.
4. **Is the filter type directly stated or visible?** No reliable visible-frame
   or creator-stated evidence was captured. The filter remains unresolved.
5. **Is Origami supported?** No supporting creator evidence was captured.
6. **Are flat-bottom drippers supported?** No supporting evidence was captured.
7. **Should app text limit equipment to NEO / V60 only?** Yes, unless new
   direct evidence is added.

## 9. Scaling policy

1. **Is arbitrary dose scaling directly supported?** No.
2. **Is arbitrary ratio scaling directly supported?** No.
3. **Can ten equal pours be calculated for non-`300g` recipes?** Arithmetic is
   possible, but it would be an app calculation, not source-original.
4. **Is app-calculated scaling approved for Pourō?** No.
5. **Should future runtime fallback to placeholder for all non-exact setups?**
   Yes, unless a later evidence or policy PR approves another behavior.

Scaling remains unsupported.

## 10. Updated field evidence matrix

| Field | Candidate value | Evidence source / timestamp | Evidence class | Confidence | Runtime readiness | Notes |
| ----- | --------------- | --------------------------- | -------------- | ---------- | ----------------- | ----- |
| Method label | Creator recipe: `THE NEO BREW`; parent: `10 Pour Method` | C-002 / description | primary_confirmed / researched_summary | high | needs_model_or_policy | Creator label direct; grouping internal. |
| R-09 mapping | Map `THE NEO BREW` to R-09 | Repository plus S1 | researched_summary | medium | not_ready | Requires internal approval. |
| Equipment | HARIO NEO recommended; V60 acceptable | C-004 | primary_confirmed | high | ready | Do not broaden drippers. |
| Filter | Unspecified | C-013 | unresolved | unresolved | unresolved | Specific filter cannot be claimed. |
| Coffee dose | `20g` | C-004 | primary_confirmed | high | ready | Exact example only. |
| Total water | `300g` | C-004 | primary_confirmed | high | ready | Exact example only. |
| Ratio | `1:15` | C-004 | primary_confirmed | high | ready | Exact example only. |
| Pour count | Ten | C-005 | primary_confirmed | high | ready | Schedule semantics unresolved. |
| Pour amount | `30g` each | C-005 | primary_confirmed | high | ready | Exact example only. |
| Cumulative targets | `30g` through `300g` | C-005 plus arithmetic | app_calculated | high | ready_as_app_calculated | Not source-original. |
| Pour interval | `15 seconds` | C-005 | primary_confirmed | high | ready | Exact event origin unresolved. |
| Exact step schedule | Unresolved | C-010 | unresolved | unresolved | not_ready | Not captured. |
| First-pour semantics | Unresolved | C-010, C-011 | unresolved | unresolved | not_ready | Do not assume `0:00`. |
| Bloom semantics | No supported bloom label or wait | C-011 | unresolved | unresolved | not_ready | Do not label as bloom. |
| Water temperature | `95-96 C` | C-004 | primary_confirmed | high | ready_as_range | Preserve range. |
| Grind size | Extra coarse; C40 `40-45` clicks | C-004 | primary_confirmed | high | ready_as_range | Grinder-specific. |
| Finish target | Unresolved | C-009, C-010 | unresolved | unresolved | not_ready | `3:30` not creator-confirmed. |
| Drawdown/removal | Avoid lingering water; exact completion unresolved | C-007, C-008, C-010 | primary_confirmed for qualitative guidance; otherwise unresolved | medium / unresolved | not_ready | Do not convert to timer event. |
| Scaling | Unsupported | C-012 | unresolved | unresolved | not_ready | Exact fallback required. |
| Legal / non-affiliation | Do not imply affiliation or endorsement | App policy | researched_summary | high | ready | Required caution. |

## 11. Runtime implementation decision

### Option B: Still not ready

PR-013B does not approve a runtime candidate for PR-013C.

Blockers:

* R-09 mapping approval
* direct first-pour / bloom semantics
* directly captured first-to-second timing
* complete ten-pour start-time schedule
* final-pour timing
* target finish time
* drawdown, completion, and dripper-removal semantics
* filter requirement or approved omission
* fixed-example gate, non-exact fallback, and disabled-scaling policy

## 12. Minimum gate for PR-013C

A future runtime PR may proceed only if:

* PR-013B is superseded by Option A or a specific Option C prerequisite.
* Exact setup gate is defined.
* First-pour and complete schedule semantics are resolved.
* Finish/removal semantics are resolved or safely approximate.
* Scaling is explicitly disabled unless evidenced.
* Non-exact fallback is defined.
* Every runtime field has `fieldEvidence`.
* UI caution copy is required.
* No official affiliation or endorsement is implied.
* Build and diff check pass.

## 13. Independent Verifier Prompt

```text
Independently verify PR-013B against origin/main, both PR-013B documents,
PR-013A, and creator video S1.

Pass only if:
- PR is docs-only and no app source, runtime data, or schedules changed
- every timestamped capture is traceable to the creator video page
- description-only evidence is not overstated as visible timestamp evidence
- captions are not overstated; captions were unavailable and transcript
  controls yielded no usable segments
- the limited 14:22 English overlay is classified as auto-generated
- third-party sources are not treated as primary
- first-pour, bloom, finish, drawdown, and removal are resolved or explicitly
  unresolved
- scaling is not approved without evidence
- runtime decision follows the evidence
- no official affiliation or endorsement is implied
- npm.cmd run build and git diff --check pass
- no dist files are included

Report findings first. If no issue is found, state Pass and residual risk.
```

## 14. Regression Checker Prompt

```text
Run a regression-only review of PR-013B against origin/main.

Confirm:
- no runtime source or src/data/placeholderMethods.ts changes
- no method schedules, runtime values, timer, or active-brew-state changes
- no route, BrowserRouter, storage key, or schema changes
- no PWA, Service Worker, manifest, icon, workflow, package, release, or dist
  changes
- no weakening of sourceStatus, verificationLevel, valuesArePlaceholder, or
  isPlaceholder
- no new runtime 10 Pour candidate
- only the two expected PR-013B docs changed
- npm.cmd run build and git diff --check pass

Fail if any prohibited file or runtime behavior changed.
```

## 15. Memory / Handoff

Captured: creator watch page, metadata, chapters, duration, description,
thumbnail, demonstration marker at `12:32`, limited auto-generated overlay at
`14:22`, and tasting marker at `17:17`.

No critical runtime field moved to fully supported operational status. The
qualitative non-lingering instruction gained a timestamped auto-generated
overlay cross-check, but still does not define completion.

R-09 mapping, filter type, first-pour / bloom, first-to-second timing, exact
schedule, final-pour timing, finish, drawdown / removal, and scaling remain
unresolved.

Final decision: **Option B**. PR-013C runtime implementation may not proceed.

Future prompts must preserve docs-only boundaries, not convert description-only
or auto-generated text into creator-speech evidence, not use third-party
schedules as source-original, keep scaling disabled, and preserve
non-affiliation wording.

Recommended next PR:

**PR-013C: THE NEO BREW Additional Source Capture / Missing Semantics Review**

## 16. Out of scope

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
