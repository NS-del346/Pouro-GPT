# PR-013A: 10 Pour Method Source Evidence Pack / Runtime Candidate Gate

## 1. Purpose

PR-013A begins source verification for the current Pourō `10 Pour Method`,
variant `R-09`, and `THE NEO BREW` candidate.

This PR is documentation-only. It changes no runtime recipe data, method
schedules, source metadata, verification metadata, placeholder flags, or app
behavior.

The goal is to decide whether a future runtime implementation is safe.
External sources were inspected on 2026-06-13. Direct creator-source claims,
app calculations, third-party interpretations, and unresolved fields remain
separate.

## 2. Current repository baseline

| Field / area | Current state | Evidence status |
| ------------ | ------------- | --------------- |
| Method ID | `ten-pour` | Existing repository identity |
| Method display name | `10 Pour Method` | Repository grouping label; not established as the creator's formal recipe name |
| Variant ID | `R-09` | Existing repository identity; source mapping is not yet approved |
| Variant display name | `THE NEO BREW / 10投式` | Plausible candidate label; only `THE NEO BREW` is directly used as the creator-source recipe heading |
| Variant short label | `THE NEO BREW` | Matches the creator-source recipe heading |
| Recommended setup | `20g`, `300g`, `1:15` | Currently placeholder-cautioned despite matching creator-source parameters |
| Method status | `methodStatus: candidate`; `sourceStatus: needsReview`; `verificationLevel: unverified` | Must remain unchanged in PR-013A |
| Variant status | `sourceStatus: needsReview`; `verificationLevel: unverified`; `valuesArePlaceholder: true` | Must remain unchanged in PR-013A |
| Runtime recipe | `ten-pour-placeholder-recipe` | No source-backed runtime recipe |
| Runtime behavior | Two generic placeholder-safe steps with null recipe values | Not a 10 Pour schedule |
| Runtime field evidence | No R-09 `fieldEvidence` | No field-level runtime mapping |

The current runtime therefore remains placeholder-safe. The repository has no
source-backed R-09 runtime recipe or schedule.

## 3. Source search log

| Source ID | Source title | URL / location | Access result | Source category | Notes |
| --------- | ------------ | -------------- | ------------- | --------------- | ----- |
| S1 | TETSU KASUYA creator-channel video, `世界制覇から10年かけて辿り着いた最新式のドリップレシピ完成しました！！` | https://www.youtube.com/watch?v=k0nsShguOsU | Accessible; creator-authored description and metadata inspected; published 2026-05-29; manual Japanese captions were listed but timed-text retrieval returned no content | `official_or_primary_like` source; directly stated fields may be `primary_confirmed` | Strongest source. Its description names `THE NEO BREW (多投レシピ)` and directly states the fixed parameters and multi-pour instruction. |
| S2 | PHILOCOFFEA, `HARIO V60ドリッパーNEO 01` | https://philocoffea.com/?pid=191121770 | Accessible | `official_or_primary_like` | Creator-owned store page confirms the NEO product identity. It does not publish the 10-pour recipe. |
| S3 | HARIO, `V60 Dripper NEO` | https://global.hario.com/product/coffee/dripper/VDN.html | Accessible | `official_or_primary_like` | Manufacturer page confirms NEO equipment facts and even-water-flow design. It does not establish the recipe or R-09 mapping. |
| S4 | `10投式 レシピ` | https://note.com/din_grogu/n/n399353644b1a | Accessible | `third_party_interpretation` | User trial lists a complete schedule and `3:30-4:00` finish range. Useful as a lead only; not creator evidence. |
| S5 | RoastAroma, `Tetsu Kasuya's New "Multi-Pour" Method (2026)` | https://roastaroma.com/blog/tetsu-kasuyas-new-multi-pour-method-2026-the-10-pour-super-coarse-v60-recipe | Accessible | `third_party_interpretation` | Detailed independent summary. It interprets the first pour as a 30-second bloom and finish as about `3:30`, but those details are not directly stated in the inspected S1 description. |
| S6 | Reddit, `THE NEO BREW (Multiple-Pour Recipe) by Tetsu Kasuya` | https://www.reddit.com/r/pourover/comments/1tr6gv6/the_neo_brew_multiplepour_recipe_by_tetsu_kasuya/ | Accessible | `third_party_interpretation` | Reposts S1 parameters. User post and comments are not source evidence. |
| S7 | Creator-site and PHILOCOFFEA site searches for `THE NEO BREW` / `10投式` | https://tetsukasuya.com/ and https://philocoffea.com/blog | No dedicated recipe publication found in inspected search results | `unresolved` | No separate creator-owned text page was found to resolve schedule and finish gaps. |

No inspected timer app, repost, blog, user comment, or trial report is treated
as source-original evidence.

## 4. Source quality assessment

| Source ID | Claim supported | Directness | Reliability | Runtime-use status |
| --------- | --------------- | ---------- | ----------- | ------------------ |
| S1 | Recipe heading, fixed parameters, recommended/acceptable drippers, ten equal pours, interval, non-lingering pour guidance | Direct creator-authored description | High for explicitly written fields; lower for anything requiring unavailable captions or video interpretation | `usable_for_field` |
| S2 | NEO product identity and creator-owned commercial context | Direct product page | High for product identity only | `usable_for_field` for equipment metadata; otherwise `insufficient` |
| S3 | V60 Dripper NEO identity and manufacturer equipment facts | Direct manufacturer page | High for equipment facts only | `usable_for_field` for equipment metadata; otherwise `insufficient` |
| S4 | Third-party trial schedule, filter, and finish range | Directly readable third-party account | Low for creator-recipe claims | `lead_only` |
| S5 | Detailed independent interpretation of S1 | Directly readable summary, but not creator-owned | Medium as a research lead; insufficient as source-original | `lead_only` |
| S6 | Reposted parameter list and user discussion | Repost and user comments | Low | `lead_only` |
| S7 | Absence of an inspected dedicated creator/PHILOCOFFEA recipe page | Search-result observation only | Medium for documenting the search gap | `needs_manual_review` |

S1 can support individual `primary_confirmed` fields because its
creator-authored description states them directly and unambiguously. It does
not make every possible schedule or finish claim primary-confirmed.

## 5. Field evidence matrix

| Field | Candidate value | Evidence source | Evidence class | Confidence | Runtime readiness | Notes |
| ----- | --------------- | --------------- | -------------- | ---------- | ----------------- | ----- |
| Method label | Parent grouping: `10 Pour Method`; creator recipe: `THE NEO BREW` | Repository baseline; S1 | `app_guidance` for parent; `primary_confirmed` for creator recipe heading | high | `needs_model_or_policy` | Keep `10 Pour Method` as the repository grouping unless a naming PR changes policy. Use `THE NEO BREW` as the candidate recipe label. |
| Variant mapping | Map creator recipe `THE NEO BREW` to repository R-09 | Repository baseline plus S1 | `researched_summary` | medium | `not_ready` | Plausible, but no source can establish Pourō's internal R-09 identity. Requires explicit mapping approval. |
| Equipment | HARIO NEO recommended; V60 acceptable | S1; S2; S3 | `primary_confirmed` for S1 recipe guidance; `official_or_primary_like` for product facts | high | `ready` | Do not imply that flat-bottom, Origami, or other drippers are supported. |
| Filter | Unspecified | S1 does not directly state filter; S4 states V60 paper filter | `unresolved`; third-party lead only | unresolved | `unresolved` | Obtain creator-source confirmation or omit the filter field. |
| Coffee dose | `20g`, light roast recommended | S1 | `primary_confirmed` | high | `ready` | Fixed creator-source example only. |
| Total water | `300g` | S1 | `primary_confirmed` | high | `ready` | Fixed creator-source example only. |
| Ratio | `1:15` | S1 | `primary_confirmed` | high | `ready` | S1 states the ratio directly. It need not be represented as app-calculated for the fixed example. |
| Pour count | `10` | S1 | `primary_confirmed` | high | `ready` | Directly stated as ten portions. |
| Pour interval | `15-second intervals` | S1 | `primary_confirmed` | high | `ready` | The interval field is direct, but the exact first-to-second gap and complete timer timestamps are not explicit in the inspected description. |
| Pour amounts | Ten pours of `30g` each | S1 | `primary_confirmed` | high | `ready` | Ready only for the exact `300g` source example. |
| Cumulative targets | `30g` through `300g` in `30g` increments | S1 inputs; arithmetic | `app_calculated` | high | `ready_as_app_calculated` | Calculation: pour number multiplied by `30g`. The inspected S1 description does not enumerate cumulative targets. |
| Complete start-time schedule | Unresolved | S1 says `15-second intervals`; S4/S5 show `0:00`, then `0:30`, then every `15s` | `unresolved`; third-party lead only | low | `not_ready` | A runtime timer must not guess whether the first interval is `15s` or a separate `30s` bloom. |
| Water temperature | `95-96°C` | S1 | `primary_confirmed` | high | `ready_as_range` | Current model can represent a numeric range, but a later runtime PR must choose the correct field treatment and caution copy. |
| Grind size | Extra coarse; Comandante C40 `40-45` clicks | S1 | `primary_confirmed` | high | `ready_as_range` | Keep the click range grinder-specific and retain the generic extra-coarse descriptor. |
| Bloom / first pour semantics | Unresolved | S1 directly states ten pours but does not call the first pour a bloom in the inspected description; S4/S5 interpret a 30-second bloom | `unresolved`; third-party lead only | low | `not_ready` | Do not label the first step as bloom or assign a 30-second wait without direct review. |
| Finish target | Unresolved; third-party sources suggest about `3:30` or `3:30-4:00` | S4; S5 | `third_party_interpretation` | low | `not_ready` | S1's inspected description does not state a target finish time. |
| Drawdown / dripper removal semantics | Pour so water does not linger and drains cleanly; final removal/completion action unresolved | S1; S4/S5 leads | `primary_confirmed` for general pouring guidance; otherwise `unresolved` | medium / unresolved | `not_ready` | Do not convert general non-lingering guidance into an exact drawdown or removal rule. |
| Dose scaling | No arbitrary scaling formula found | No inspected source | `unresolved` | unresolved | `not_ready` | Disable scaling or use placeholder fallback until directly supported and reviewed. |
| Ratio scaling | No arbitrary ratio policy found | No inspected source | `unresolved` | unresolved | `not_ready` | The direct fixed ratio does not authorize arbitrary ratio changes. |
| Legal / non-affiliation note | State that Pourō is unofficial and does not imply affiliation or endorsement | App policy | `app_guidance` | high | `ready` | Source attribution must not imply creator, PHILOCOFFEA, or HARIO approval of Pourō. |

### Explicit evidence answers

1. The creator-source recipe label is `THE NEO BREW`; `10 Pour Method` is the
   current Pourō parent grouping; `10投式` is a descriptive third-party/common
   label, not the inspected S1 heading.
2. `THE NEO BREW` is the creator-source multi-pour recipe. R-09 is Pourō's
   plausible internal mapping, not a source-defined identity.
3. Yes. S1 is a creator-owned source and directly supports multiple fields.
4. S1 recommends HARIO NEO and says V60 is acceptable.
5. NEO and V60 are supported; Origami, flat-bottom, and generic drippers are
   not supported by inspected creator evidence.
6. Yes, `20g`.
7. Yes, `300g`.
8. Yes, `1:15`.
9. Not needed for the fixed example because S1 states `1:15` directly.
10. Yes, ten pours.
11. Yes, `15-second intervals`, but exact timer timestamps remain ambiguous.
12. No. Around `3:30` is third-party-supported only in this evidence pack.
13. Yes, ten portions of `30g`.
14. No. Cumulative targets can be `app_calculated` from direct fields.
15. Yes, `95-96°C`.
16. Yes, extra coarse and Comandante C40 `40-45` clicks.
17. No. Bloom / first-pour semantics remain unresolved.
18. General non-lingering pour guidance is direct; exact drawdown, completion,
   and dripper-removal semantics remain unresolved.
19. No arbitrary dose scaling is supported.
20. No arbitrary ratio scaling is supported.
21. A fixed-example candidate may become possible after the remaining schedule
   and finish semantics are directly reviewed.
22. No. Exact schedule values are not yet safe because the first gap and finish
   semantics remain unresolved.
23. R-09 mapping approval, filter, exact schedule timestamps, first-pour/bloom
   semantics, finish target, removal/completion semantics, and scaling remain
   unresolved.
24. Minimum additional evidence is direct creator-source capture or manual
   review that resolves the exact first-pour sequence and complete timer
   schedule, plus explicit finish/drawdown semantics and R-09 mapping approval.

## 6. Candidate runtime scenarios

| Candidate | Description | Pros | Risks | Decision |
| --------- | ----------- | ---- | ----- | -------- |
| Fixed source-backed example only | Exact `20g / 300g / 1:15`, ten `30g` pours, `95-96°C`, extra-coarse guidance, NEO recommended / V60 acceptable | Most core fields are directly creator-supported | Exact timer and finish semantics remain incomplete | Block pending direct schedule/finish review |
| App-calculated ratio from dose/water | Calculate `300 / 20 = 15` | Mathematically valid | Would obscure that S1 already states `1:15` directly | Do not use for the fixed example |
| App-calculated cumulative targets | Calculate each cumulative target as pour number multiplied by `30g` | Transparent arithmetic from direct fields | Must not be presented as source-original | Allow only if future policy explicitly approves and labels it `app_calculated` |
| Ten equal pours based on total water divided by ten | Use `300 / 10 = 30g` | Matches S1's direct fixed example | Could be misused as a scaling formula | Allow only for exact `300g`; do not generalize |
| 15-second interval schedule | Build exact step timestamps from the stated interval | Interval itself is direct | First-to-second gap conflicts with third-party interpretations; exact start schedule is not directly captured | Not ready |
| `3:30` target finish | Use about `3:30` as finish or drawdown target | Common third-party interpretation | Not directly stated in inspected S1 description; semantics unclear | Not ready |
| Arbitrary dose scaling | Scale water, pours, and targets from user dose | Flexible | No creator-source formula or approved app policy | Reject |
| Arbitrary ratio scaling | Allow user-selected ratios and rescale schedule | Flexible | Direct evidence supports only fixed `1:15` | Reject |

Equal-pour and scaling logic must not be broadened beyond the exact source
example unless a later policy explicitly categorizes and labels it as app
guidance or app calculation.

## 7. Runtime implementation decision

### Option B: Not ready; more source collection required

PR-013A does not approve a runtime R-09 candidate.

S1 directly supports many fixed-example fields, so this is not a general lack
of creator evidence. The blocker is that a Brew Timer schedule requires exact
operational semantics that the inspected creator-authored description does not
fully provide:

* explicit approval that Pourō R-09 maps to `THE NEO BREW`
* exact first-pour / bloom treatment
* complete timer start times, including the first-to-second interval
* target finish time
* final drawdown, completion, and dripper-removal semantics
* filter requirement or an explicit decision to omit it
* explicit fixed-example fallback policy with scaling disabled

The source-supported fields may be reused in a follow-up evidence-capture PR,
but no runtime recipe or schedule may proceed from PR-013A alone.

## 8. Minimum gate for future runtime PR

A future runtime PR may proceed only if:

* R-09 mapping is approved.
* Source category is sufficient for each runtime field.
* Directly supported fields are distinguished from app-calculated fields.
* Pour count and pour timing have source support.
* Pour amounts and cumulative targets have source support or explicitly
  approved `app_calculated` treatment.
* The exact first-pour / bloom and complete schedule semantics are clear.
* Target finish semantics are clear.
* Drawdown and dripper-removal semantics are clear.
* Temperature policy preserves the direct `95-96°C` range.
* Scaling is disabled unless directly evidenced.
* Non-exact setup fallback is defined.
* Every runtime field has `fieldEvidence`.
* UI caution copy is required.
* No official affiliation or endorsement is implied.
* `npm.cmd run build` and `git diff --check` pass.

## 9. Independent Verifier Prompt

```text
Independently verify PR-013A: 10 Pour Method Source Evidence Pack / Runtime
Candidate Gate.

Review the full diff against origin/main, src/data/placeholderMethods.ts,
src/types/brew.ts, src/types/source.ts, the inspected source URLs, and both
PR-013A documents.

Pass only if:
- the PR is docs-only
- no app source files changed
- no runtime data or method schedules changed
- every inspected source is categorized correctly
- third-party summaries, timer apps, reposts, and user comments are not
  treated as primary evidence
- each primary_confirmed field is directly and unambiguously supported by the
  creator source
- app-calculated cumulative targets are separated from source-original values
- exact timer timestamps, bloom semantics, 3:30 finish, and scaling are not
  overstated
- the runtime decision follows the evidence
- missing fields and blockers are listed
- no official affiliation or endorsement is implied
- the follow-up recommendation is specific
- npm.cmd run build passes
- git diff --check passes
- no dist files are included

Report findings first, ordered by severity. If no issue is found, state Pass
and identify residual source-capture risk.
```

## 10. Regression Checker Prompt

```text
Run a regression-only review of PR-013A against origin/main.

Confirm:
- no runtime source files changed
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
- only docs/research/PR-013A-10-pour-source-evidence-gate.md and
  docs/qa/PR-013A-10-pour-source-evidence-gate.md changed
- npm.cmd run build passes
- git diff --check passes

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 11. Memory / Handoff

Sources inspected:

* Tetsu Kasuya creator-channel S1
* PHILOCOFFEA NEO product page S2
* HARIO NEO manufacturer page S3
* third-party trial, summary, and repost leads S4-S6
* creator-site / PHILOCOFFEA search gap S7

Source-supported fields:

* creator recipe label `THE NEO BREW`
* `20g`, `300g`, direct `1:15`
* `95-96°C`
* extra coarse; Comandante C40 `40-45` clicks
* HARIO NEO recommended; V60 acceptable
* ten `30g` pours at `15-second` intervals
* general guidance not to let water linger in the dripper

App-calculated candidate:

* cumulative targets in `30g` increments, only if explicitly approved and
  labeled as app-calculated

Unresolved:

* R-09 mapping approval
* filter
* first-pour / bloom semantics
* complete exact timer schedule
* target finish time
* drawdown / completion / dripper-removal semantics
* arbitrary dose and ratio scaling

Final decision: **Option B**. Runtime implementation may not proceed from
PR-013A.

Future Codex prompts must preserve docs-only evidence boundaries until the
missing creator-source schedule and finish semantics are captured. They must
not use third-party schedules as source-original, must keep scaling disabled,
and must preserve non-affiliation wording.

Recommended next PR:

**PR-013B: THE NEO BREW Creator Video Schedule / Finish Semantics Capture**

That PR should manually inspect the creator video demonstration and
non-auto-generated captions, capture exact timestamped evidence for the first
pour, all subsequent pours, finish, and dripper-removal semantics, then decide
whether the fixed example can pass a narrow runtime mapping gate.

## 12. Out of scope

PR-013A makes:

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no app source changes
* no storage changes
* no route changes
* no release docs changes
