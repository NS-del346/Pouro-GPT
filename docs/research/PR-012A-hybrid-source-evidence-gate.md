# PR-012A: Hybrid / HARIO Switch Source Evidence Pack / Runtime Candidate Gate

## 1. Purpose

This PR evaluates source evidence for the current Pourō `Hybrid` method and
decides whether any later runtime recipe or Brew Timer schedule implementation
is safe.

PR-012A is evidence and gate documentation only:

* no runtime values changed
* no schedules changed
* no method behavior changed
* no source, verification, provenance, or placeholder runtime metadata changed

External sources were accessed on 2026-06-12. A source is used only for the
claims that could be inspected. A general HARIO Switch source is not treated as
evidence for a specific Tetsu Kasuya Hybrid or New Hybrid recipe.

## 2. Local repository state

| Field / area | Current state | Current status | Notes |
| ------------ | ------------- | -------------- | ----- |
| Method ID | `hybrid` | Existing repository identity | The ID is part of `BrewMethodId` and is unchanged. |
| Display name | `Hybrid Method`; short name `Hybrid` | `needsReview` / `unverified`; placeholder-cautioned | The parent method name does not distinguish the older Hybrid recipe, New Hybrid recipe, or a general hybrid technique. |
| Method description | `浸漬と透過を組み合わせる抽出案として参考表示します。`; long description says recipe values and steps are under review | App guidance; placeholder-cautioned | The description supports only a broad immersion/percolation concept. |
| Variant IDs | One variant: `R-08` | Existing repository identity | No alternative Hybrid variant is represented. |
| R-08 display name | `NEWハイブリッド / HARIO Switch`; short label `NEWハイブリッド` | `needsReview` / `unverified`; `valuesArePlaceholder: true` | The label suggests a specific New Hybrid Switch mapping, but no source is attached. |
| R-08 description | `Hybrid Methodの独立variantとして参考表示します。` | App guidance; placeholder-cautioned | It does not identify a creator, source version, or supported schedule. |
| Coffee recommendation | R-08 recommends `20g`; recipe value is `null` | Placeholder recommendation | The recommendation seeds Recipe Setup and is not source-backed runtime data. |
| Water recommendation | R-08 recommends `300g`; recipe value is `null` | Placeholder recommendation | Recipe Setup calculates water from the selected dose and ratio. |
| Ratio | R-08 recommends `1:15`; recipe value is `null` | Placeholder recommendation | Stored as `recommendedRatio: 15`; user-selectable in Recipe Setup. |
| Other recipe values | `waterTempCelsius`, `grindSizeLabel`, and `totalTimeSec` are `null` | Placeholder | No temperature-change, grind, or finish-time candidate is implemented. |
| Recipe ID | `hybrid-placeholder-recipe` | Placeholder | The method has no variant-scoped runtime recipe. |
| Recipe steps | Two generic steps: `0-30` seconds and `30-60` seconds | `placeholder` / `placeholder`; `isPlaceholder: true` | Both steps have null pour, cumulative-water, next-time, and next-pour fields. They are not a Hybrid schedule. |
| Switch phases | No open or closed phase is represented in runtime data | Unresolved | The generic steps do not model percolation, immersion, release, or drawdown. |
| Method `sourceStatus` | `needsReview` | Correct caution state | Must not be weakened by evidence-only work. |
| Method `verificationLevel` | `unverified` | Correct caution state | Must not be weakened by evidence-only work. |
| Method / recipe `valuesArePlaceholder` | `true` / `true` | Correct placeholder guard | R-08 also remains `true`. |
| `fieldEvidence` | Absent on method, R-08, recipe, and steps | No runtime field-level mapping | PR-011D makes the optional model available, but Hybrid does not use it. |
| Source metadata | No `sourceTitle`, `sourceUrl`, or `sourceNote` on method or R-08 | Unresolved | The repository does not identify which public Hybrid recipe R-08 represents. |
| Recipe Setup UI | Method and R-08 show `レシピ確認中`; R-08 is selected by default; dose and ratio are user-adjustable | Placeholder-safe | Setup values are current-brew inputs, not source recipe values. |
| Brew Timer UI | Always receives the method placeholder recipe for Hybrid and shows generic schedule-caution copy | Placeholder-safe | `Switch状態確認` exists as a semantic-chip candidate, but the chip is suppressed while the schedule is placeholder. |

The current repository therefore contains two different identity signals:

* the parent method is broad: `Hybrid Method`
* the only variant is specific-looking: `NEWハイブリッド / HARIO Switch`

The repository does not document whether the parent exists only to contain
Tetsu Kasuya's New Hybrid candidate, whether R-08 is intended to replace an
older Hybrid candidate, or whether `Hybrid Method` is meant to remain a general
immersion/percolation category.

## 3. Source inventory

| Source ID | Source title | URL or local reference | Category | Used for runtime? | Notes |
| --------- | ------------ | ---------------------- | -------- | ----------------- | ----- |
| S1 | TETSU KASUYA creator-channel video, `どんなコーヒー豆も「おいしくなる」究極系レシピ、進化しました。` | https://www.youtube.com/watch?v=4FeUp_zNiiY | `official_or_primary_like` | No; evidence candidate only | The video is published by `TETSU KASUYA World Brewers Cup Champion` and links the evolved recipe to the prior Hybrid recipe. The video page was inspectable, but captions were unavailable, so precise field values and timing were not transcribed as primary-confirmed evidence in this PR. |
| S2 | HARIO Immersion Dripper SWITCH | https://global.hario.com/product/coffee/dripper/SSD.html | `official_or_primary_like` | No; equipment evidence only | HARIO states that the brewer immerses coffee and starts dripping when the switch is pressed. It supports a Switch equipment assumption, not a specific Hybrid recipe mapping. |
| S3 | HARIO MUGEN x SWITCH DRIPPER | https://global.hario.com/product/new/mugen_x_switch_dripper.html | `official_or_primary_like` | No; equipment and disambiguation evidence only | HARIO states that the product can switch between pour-over and immersion mid-brew and publishes multiple incompatible Switch recipes. None is identified as Pourō R-08 or Tetsu Kasuya's New Hybrid recipe. |
| S4 | ZEROMILE interview: `PHILOCOFFEA — Tetsu Kasuya` | https://en.z-mile.com/series/coffeezamurai11_philocofea/ | `researched_summary` | No; identity context only | The interview distinguishes Hybrid Method from the later New Hybrid Method and describes New Hybrid as immersion -> percolation -> immersion. It does not publish the field-level recipe needed for runtime. |
| S5 | `2025 "New Hybrid" Hario Switch recipe by Tetsu Kasuya` | https://www.timer.coffee/recipes/hario-switch/2025-new-hybrid-hario-switch-recipe-by-tetsu-kasuya/ | `third_party_interpretation` | No | This structured summary maps New Hybrid to HARIO Switch and lists `20g`, `300g`, two temperatures, switch phases, pours, timing, and a `3:30` finish. It is useful supporting context but is not primary confirmation. |
| S6 | `Tetsu Kasuya "Devil" recipe for Hario Switch` | https://www.timer.coffee/recipes/hario-switch/tetsu-kasuya-devil-recipe-for-hario-switch/ | `third_party_interpretation` | No | This summary lists a different older Switch recipe with `20g`, `280g`, a different phase order, different timing, and a `3:00` brew time. It demonstrates why `Hybrid` cannot be mapped from a general Switch reference. |
| S7 | `ハリオ スイッチ 使い方完全ガイド` | https://koyo-coffee.com/switch/ | `third_party_interpretation` | No | This guide separately describes an older Hybrid recipe and notes that the 2025 New Hybrid changes the initial bloom to immersion. It links S1 but does not replace direct field-level review of S1. |

S1 is the strongest candidate source for a future New Hybrid evidence pack.
However, this PR could not inspect a text transcript or another directly
attributable field-level publication for S1. S5 and S7 help identify the likely
candidate, but third-party interpretations are not sufficient to promote
runtime values.

S2 and S3 are strong HARIO equipment sources. They do not establish that one
particular HARIO Switch recipe is Tetsu Kasuya's Hybrid or New Hybrid method.

## 4. Evidence matrix

Verification terms in this matrix describe evidence confidence for the claim,
not the repository's runtime `verificationLevel` enum:

* `high`: directly inspectable source support for the limited claim
* `medium`: useful evidence exists, but mapping or interpretation is incomplete
* `low`: third-party or conflicting support only
* `needs_review`: evidence requires explicit review before runtime use
* `placeholder`: current repository scaffold only

| Claim / field | Evidence found | Evidence category | Runtime readiness | Notes |
| ------------- | -------------- | ----------------- | ----------------- | ----- |
| Method name | S4 distinguishes `Hybrid Method` and later `New Hybrid Method`; current parent uses `Hybrid Method`, while R-08 uses `NEWハイブリッド` | `researched_summary`; medium | `partial` | The current parent/variant relationship is not explicitly approved. |
| HARIO Switch equipment assumption | S2 documents the HARIO Switch mechanism; S5/S6/S7 map candidate recipes to HARIO Switch | `official_or_primary_like` for equipment; third-party for recipe mapping; high/low | `partial` | HARIO Switch is a plausible and well-supported equipment assumption, but exact model/capacity and the R-08 mapping remain unapproved. |
| Immersion/percolation hybrid structure | S3 supports switching between pour-over and immersion; S4 describes Hybrid and New Hybrid as combinations of the two modes | `official_or_primary_like` plus `researched_summary`; high/medium | `partial` | The broad concept is supported, but it does not select a runtime schedule. |
| Switch open/closed operation | S2/S3 support switch-controlled release and mid-brew mode changes; S5/S6/S7 describe different phase sequences | Mixed; medium | `not_ready` | Exact open/closed order depends on whether the intended recipe is older Hybrid or New Hybrid. |
| Immersion phase | S2 supports immersion capability; S4 says New Hybrid uses immersion twice; S5 gives a candidate schedule | Mixed; medium/low | `not_ready` | Exact start, duration, and release timing are not primary-confirmed in this pack. |
| Percolation phase | S3 supports pour-over mode; S4 places percolation between New Hybrid immersion phases | Mixed; medium | `not_ready` | Exact pour and phase boundaries remain unapproved. |
| Coffee dose | Current R-08 recommends `20g`; S5 and S6 both list `20g` | `third_party_interpretation`; low | `not_ready` | Agreement between third-party summaries does not make the field source-original. |
| Water amount | Current R-08 recommends `300g`; S5 lists `300g`, while S6 lists `280g` for the older Hybrid candidate | `third_party_interpretation`; low | `not_ready` | The value depends on selecting New Hybrid rather than older Hybrid. |
| Ratio | Current R-08 recommends `1:15`; S5's `20g` / `300g` implies `1:15`; S6 implies `1:14` | `third_party_interpretation`; low | `not_ready` | A ratio must not be inferred or promoted without an approved source/version mapping. |
| Water temperature | S5 and S6 describe a hot initial stage and cooler later immersion, with different ranges/details | `third_party_interpretation`; low | `not_ready` | Directly attributable temperature instructions were not transcribed from S1. |
| Temperature change / two-temperature structure | S4 describes New Hybrid's evolving structure; S5/S6/S7 describe lowering temperature for a later phase | Mixed; medium/low | `partial` | The concept is plausible, but exact temperatures and transition instructions remain unapproved. |
| Grind size | S5 says medium-fine; other third-party summaries describe coarser settings | `third_party_interpretation`; low | `unresolved` | Conflicting interpretations block a runtime grind label. |
| Pour count | S5 describes four pours for New Hybrid; S6 describes three pour additions for the older candidate | `third_party_interpretation`; low | `not_ready` | Count depends on selected version and step interpretation. |
| Pour amounts | S5 and S6 publish incompatible totals and sequences | `third_party_interpretation`; low | `not_ready` | No amount is approved as source-original. |
| Timing | S5 and S6 publish incompatible schedules | `third_party_interpretation`; low | `not_ready` | Exact candidate timing requires direct S1 review and explicit version selection. |
| Release / drain timing | HARIO sources support release behavior generally; S5 and S6 publish different release times | Mixed; medium/low | `not_ready` | General switch operation cannot establish the intended recipe's release timing. |
| Target finish time | S5 lists `3:30`; S6 lists `3:00` | `third_party_interpretation`; low | `not_ready` | The target changes with recipe identity. |
| User-adjustable dose behavior | Current Recipe Setup allows predefined and custom doses | `app_guidance`; needs_review | `unresolved` | No inspected source supports scaling the intended Hybrid candidate to arbitrary doses. |
| User-adjustable ratio behavior | Current Recipe Setup allows predefined and custom ratios and calculates water | `app_calculated` / `app_guidance`; needs_review | `unresolved` | No inspected source supports arbitrary ratio scaling or schedule scaling. |
| Source metadata | S1 is the strongest source candidate; S2 may support equipment context | `official_or_primary_like`; medium | `partial` | A future mapping must tie each field to the exact source/version and avoid implying affiliation. |
| UI caution copy | Current `レシピ確認中` and generic schedule-caution copy accurately reflect unresolved runtime data | `app_guidance`; high | `ready` | Preserve current caution behavior until a later reviewed runtime PR. |
| Runtime implementation readiness | A likely New Hybrid candidate exists, but critical fields are supported only by unapproved third-party interpretations in this pack | `unresolved`; needs_review | `not_ready` | No Hybrid runtime value or schedule is safe to promote now. |

## 5. Current app mapping assessment

### What the current Pourō Hybrid appears to represent

The most plausible interpretation is:

* parent method: a broad Hybrid immersion/percolation category
* R-08: a candidate mapping to Tetsu Kasuya's later New Hybrid method using a
  HARIO Switch

That interpretation is plausible because R-08 says `NEWハイブリッド / HARIO
Switch`, S1 is a creator-channel evolved-recipe source, S4 distinguishes Hybrid
from New Hybrid, and S5 maps a New Hybrid Switch recipe to the current
`20g / 300g / 1:15` recommendations.

It is not yet a safe runtime mapping because the repository contains no source
attachment or decision document approving that interpretation.

### Parts that match

* The current broad description matches the supported concept of combining
  immersion and percolation.
* The R-08 label plausibly matches a New Hybrid HARIO Switch candidate.
* The current `20g / 300g / 1:15` recommendation matches S5's third-party New
  Hybrid summary.
* The current placeholder-safe status correctly reflects the unresolved
  mapping.

### Parts that are ambiguous or unsupported

* Whether `Hybrid Method` means the older Hybrid recipe, New Hybrid recipe, or
  a general category.
* Whether R-08 is explicitly approved as the Tetsu Kasuya New Hybrid candidate.
* Whether `20g / 300g / 1:15` is a source example, fixed recipe, or app default.
* Exact HARIO Switch model/capacity and equipment assumptions.
* Exact open/closed sequence, phase boundaries, pours, timing, temperature
  transition, grind, release timing, and finish condition.
* Whether and how dose or ratio changes may be scaled.

Implementing the current recommendations now would make users reasonably
believe that Pourō has selected and verified a specific New Hybrid schedule.
That would be misleading because the current evidence pack has not approved
the source/version or field-level mapping, and older Hybrid and New Hybrid
recipes contain incompatible values and phase sequences.

## 6. Runtime implementation decision

### Option B: Not ready for runtime implementation

No Hybrid runtime value or schedule should be implemented from PR-012A.

The blocker is not a lack of any plausible source. S1 is a strong
official-or-primary-like candidate, and S4/S5 provide useful supporting
context. The blocker is that the exact New Hybrid recipe has not yet been
transcribed, reviewed, and approved field by field from a directly
attributable source.

Critical missing evidence and decisions:

* explicit approval that R-08 represents Tetsu Kasuya's New Hybrid HARIO
  Switch recipe rather than older Hybrid or a general hybrid category
* directly attributable field-level evidence for dose, water, ratio,
  temperatures, grind, pours, timing, switch state changes, release, and finish
* a decision on source example versus fixed rule versus app guidance
* an approved policy for user-adjustable dose and ratio behavior
* field-level provenance for every later runtime change

Until those are resolved, Hybrid must remain `needsReview` / `unverified` and
placeholder-safe.

## 7. Field-level provenance plan for a future PR

| Future field | Candidate treatment | Provenance | Required note |
| ------------ | ------------------- | ---------- | ------------- |
| Parent display name `Hybrid Method` | Keep only as a repository category unless a source/version decision says otherwise | `app_guidance` / `needs_review` | Explain whether it contains only New Hybrid or multiple future Hybrid variants. |
| R-08 display name | Preserve the existing label until a naming review approves its exact source mapping | `needs_review` | Do not imply official approval, affiliation, or endorsement. |
| HARIO Switch equipment | Add only after exact equipment assumptions are documented | `source_original` for HARIO capability; `needs_review` for recipe mapping | Distinguish manufacturer equipment facts from the creator recipe. |
| Coffee dose | Leave unresolved until directly attributable evidence is reviewed | `unresolved` | If later approved as an example, state that it is not automatically a universal fixed dose. |
| Water amount | Leave unresolved until the selected recipe version is approved | `unresolved` | Do not mix older Hybrid `280g` context with New Hybrid `300g` context. |
| Ratio | Leave unresolved; do not infer from third-party values | `unresolved` | A calculated ratio must be labeled `app_calculated`, not source-original. |
| Water temperatures | Leave unresolved until exact source instructions are reviewed | `unresolved` | Record each phase's temperature and any allowed range separately. |
| Temperature-change instruction | Candidate only after direct review | `needs_review` | Distinguish source instruction from Pourō-authored operational guidance. |
| Grind guidance | Leave unresolved because summaries conflict | `unresolved` | Avoid a single grinder-specific setting unless the reviewed source supports it. |
| Pour count, amounts, and timing | Leave unresolved until S1 is reviewed field by field | `unresolved` | Every implemented step must carry field evidence. |
| Switch open/closed phases | Leave unresolved until exact phase order and times are approved | `unresolved` | Represent state changes explicitly and do not infer them from general Switch operation. |
| Release / drawdown / finish | Leave unresolved until the source distinguishes release action, target finish, and natural drawdown | `unresolved` | Do not treat a target time as guaranteed natural drawdown completion. |
| User dose scaling | No automatic scaling approved | `unresolved` | A later approved formula would be `app_calculated` with a `calculationNote`. |
| User ratio scaling | No automatic scaling approved | `unresolved` | Arbitrary ratio changes must fall back to placeholder-safe behavior unless reviewed. |
| UI caution copy | Preserve current placeholder-safe wording | `app_guidance` | State the limited source-backed scope if a later narrow candidate is implemented. |
| Source metadata | Attach the selected creator source and any equipment source only after mapping approval | `source_original` metadata plus `app_guidance` note | Explain the exact supported scope and avoid affiliation or endorsement claims. |

Most Hybrid runtime fields remain `unresolved` or `needs_review`. A future
source-backed field would not automatically verify the parent method or clear
container-level placeholder flags.

## 8. Runtime gate for future Hybrid implementation

A future Hybrid runtime PR may proceed only if:

* method identity is clear
* source-backed recipe values are documented
* equipment assumptions are explicit
* open/closed switch phases are supported
* timing and pour quantities are supported
* temperature handling is supported or explicitly omitted
* every changed field has `fieldEvidence`
* unsupported fields remain placeholder-safe
* older Hybrid and New Hybrid values are not merged
* source examples, fixed rules, app calculations, and app guidance remain
  distinguishable
* arbitrary user dose or ratio changes fall back safely unless their scaling
  behavior is reviewed
* no official endorsement, approval, supervision, partnership, or affiliation
  is implied
* `npm.cmd run build` and `git diff --check` pass
* mobile QA passes

## 9. Recommended next PR

Recommended follow-up:

**PR-012A-Follow-up: Hybrid Additional Source Collection**

The follow-up should inspect and document S1 field by field, select the exact
Hybrid/New Hybrid version represented by R-08, and reconcile or reject
third-party interpretations. It should remain evidence-only unless that review
produces an explicit narrow runtime candidate gate.

PR-012B and PR-012C may proceed independently, but they do not resolve the
Hybrid blocker.

## 10. Out of scope

PR-012A makes:

* no runtime recipe data changes
* no method schedule changes
* no timer logic changes
* no storage migration
* no route changes
* no release docs changes
* no 4:6 R-01 changes
* no 4:6 R-02 through R-06 changes
* no 10 Pour Method changes
* no Ice Brew changes
