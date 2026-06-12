# PR-011C: 4:6 Method Source Evidence Pack

## 1. Purpose

This document gathers field-level evidence for the 4:6 Method before any
runtime recipe or Brew Timer schedule implementation.

It separates:

* source-original statements and examples
* values that Pourō would need to calculate
* current repository placeholders and app defaults
* unresolved mappings between source evidence and current variants

No runtime method data is changed in PR-011C.

## 2. Sources reviewed

Sources were accessed on 2026-06-12. In this document, `S1` and `S2` refer to
the source rows below.

| Source | URL | Source category | Accessible? | Used for runtime? | Notes |
| ------ | --- | --------------- | ----------- | ----------------- | ----- |
| S1: HARIO Coffee Scale POLARIS | https://global.hario.com/product/new/CST.html | `official_or_primary_like` | Yes | No; evidence only in PR-011C | HARIO manufacturer page. It publishes a "Basic extraction recipe 4:6 Method" described as supervised by Tetsu Kasuya. It directly states ratio, grind range, roast-based temperatures, five-pour timing, five equal 20% pours, and the 3:30 dripper-removal point. The supervision statement is recorded as source context, not as an affiliation or endorsement of Pourō. |
| S2: Philocoffea, "How to Make Coffee Using the 4:6 Brewing Method" | https://en.philocoffea.com/blogs/blog/coffee-brewing-method | `official_or_primary_like` | Yes | No; evidence only in PR-011C | Philocoffea identifies Tetsu Kasuya as its founder and the method creator. The page directly explains the 40% / 60% concept, basic 1:15 formula, example values, flavor and concentration adjustments, drain-between-pours guidance, timing, and the 3:30 dripper-removal point. The page is strong primary-like evidence, but PR-011C does not independently establish its editorial authorship as a directly attributable primary statement for every claim. |

Neither source is marked `primary_confirmed` in this evidence pack. Both are
strong candidates for a later basic-recipe implementation, but the current
repository contains variant labels and app behaviors that the sources do not
fully verify.

No lower-quality third-party summary was used.

## 3. Evidence matrix

Verification levels used in this matrix:

* `Corroborated`: directly stated by both reviewed sources.
* `Direct`: directly stated by one reviewed source.
* `Partial`: evidence supports only part of the repository concept or only a
  source example.
* `Unresolved`: the reviewed sources do not verify the candidate.

`Can implement?` describes a possible later PR, not a change made by PR-011C.

| Runtime field / concept | Candidate value | Source support | Source category | Verification level | Can implement? | Notes |
| ----------------------- | --------------- | -------------- | --------------- | ------------------ | -------------- | ----- |
| Method display name | `4:6 Method` | S1 and S2 use this name | `official_or_primary_like` | Corroborated | Later | The existing repository display name matches. No rename is needed. |
| Method short name | `Unresolved` | Neither source establishes `4:6` as a separate app short-name field | `unresolved` | Unresolved | No | The current `4:6` short name remains repository display metadata. |
| `sourceTitle` | S1 and/or S2 title | Titles and pages are accessible | `official_or_primary_like` | Direct | Later | A later PR could attach source metadata, but one method-level title cannot express field-level mixed provenance. |
| `sourceUrl` | S1 and/or S2 URL | URLs are accessible | `official_or_primary_like` | Direct | Later | Do not imply the selected source approves, supervises, or endorses Pourō. |
| `sourceNote` | Accurate note distinguishing S1 basic recipe, S2 concepts, and app calculations | Must be authored by Pourō from the evidence matrix | `app_guidance` | Partial | Later | The note must not claim all variants are source-verified. |
| Coffee dose | `20g` as an example, not a fixed universal rule | S1 gives `20g` with `1:15` as a scale example; S2 gives `20g` in its basic formula example | `official_or_primary_like` | Corroborated example | Partial | May be represented as a cited source example. It is not verified as the one required dose for every 4:6 brew or variant. |
| Water amount | `300g` as an example paired with `20g` at `1:15` | S1 and S2 directly state the example | `official_or_primary_like` | Corroborated example | Partial | May be represented as a cited source example, not as a universal fixed value. |
| Ratio | `1:15` for the reviewed basic recipe | S1 basic extraction recipe; S2 says to start with `1:15` | `official_or_primary_like` | Corroborated | Yes | Evidence supports the basic candidate. It does not verify the current R-06 `1:12` placeholder. |
| Pour count | Five pours for the basic recipe; the 60% portion may be divided into one, two, or three pours | S1 gives five 20% pours; S2 gives the five-pour basic formula and explains one-to-three pours for the final 60% | `official_or_primary_like` | Corroborated basic / Direct adjustment | Partial | The sources support a five-pour basic candidate and a total of three-to-five pours as a concentration-control concept. They do not verify the current R-04 or R-05 labels as written. |
| Pour sequence | First 40% split into two pours; remaining 60% controls concentration through its number of pours | S2 directly explains the split; S1's basic model uses five equal 20% pours | `official_or_primary_like` | Corroborated basic / Direct concept | Partial | Exact non-basic variant sequences and labels remain unresolved. |
| Per-pour water amounts | Basic example: `60g + 60g + 60g + 60g + 60g` for `20g` coffee and `300g` water | S2 states the exact example; S1 states five 20% pours | `official_or_primary_like` | Corroborated | Yes | This is source-original as an example. A value calculated for another dose would be app-calculated. |
| Timing | Basic candidate: `0:00`, `0:45`, `1:30`, `2:15`, `2:45`; remove dripper at `3:30` | S1 and S2 state the same schedule | `official_or_primary_like` | Corroborated | Yes | Evidence supports the reviewed five-pour basic schedule only. |
| Drawdown / end condition | Remove the dripper at `3:30` | S1 and S2 directly state this action | `official_or_primary_like` | Corroborated | Yes | This is an end action, not proof that drawdown must naturally complete at exactly `3:30`. |
| Water split concept | 40% for flavor adjustment and 60% for concentration adjustment | S2 directly explains the concept; S1's five equal 20% pours are consistent with the basic split | `official_or_primary_like` | Direct concept / corroborated basic model | Yes | Runtime copy must distinguish the concept from any app-authored variant mapping. |
| Sweetness / acidity control concept | Within the first 40%, a smaller first pour than second is described as sweeter; a larger first pour than second is described as brighter | S2 directly states the relationship | `official_or_primary_like` | Direct | Partial | The concept is supported. Exact alternative pour amounts and the current R-02 / R-03 mappings remain unresolved. |
| Concentration / strength control concept | Pouring the final 60% once is described as lighter; dividing it into more pours is described as stronger | S2 directly states the relationship | `official_or_primary_like` | Direct | Partial | The concept is supported. Current R-04 / R-05 wording and schedules are not fully supported. |
| Drain-between-pours assumption | Begin the next pour after water has almost completely passed through the filter | S2 directly states this guidance | `official_or_primary_like` | Direct | Yes | This is not evidence for a strict fully-drained rule or a fixed drain duration under all conditions. |
| App scaling rule | At the reviewed basic `1:15` formula, each of five equal pours is coffee dose multiplied by three and total water is coffee dose multiplied by fifteen | S2 directly states the multiplication formula; S1 explains ratio-based total-water calculation and percentage pours | `official_or_primary_like` | Corroborated basic / Partial app mapping | Partial | A later implementation could calculate the basic equal-pour recipe for another dose at `1:15`. Arbitrary ratios, unequal flavor pours, and variant-specific scaling remain unresolved. |
| App-calculated vs source-original distinction | Source examples and formula remain source-original; numbers produced from a user-entered dose are app-calculated | The distinction is required when applying S1/S2 formulas in Pourō | `app_guidance` | Partial | Later | The current runtime model lacks field-level provenance metadata. This must be documented or modeled before mixed-provenance values are presented as verified. |
| Current variant R-01: basic | Basic five-pour candidate is supported; current repository values remain placeholder | S1 and S2 support a basic recipe, but do not identify Pourō variant `R-01` | `official_or_primary_like` | Partial | Later | Mapping the source-backed basic candidate to R-01 requires an explicit review decision. |
| Current variant R-02: sweetness emphasis | Concept supported; exact current variant mapping and values unresolved | S2 supports the sweetness-control concept | `official_or_primary_like` | Partial | No | Do not implement a schedule until exact amounts and the R-02 mapping are reviewed. |
| Current variant R-03: brightness / acidity emphasis | Brightness concept supported; exact current variant mapping and values unresolved | S2 supports a brighter-result concept, but does not verify Pourō's complete label or schedule | `official_or_primary_like` | Partial | No | Do not implement a schedule until exact amounts and the R-03 mapping are reviewed. |
| Current variant R-04: light 4-pour | `Unresolved` as a repository variant | S2 supports varying the number of final-60% pours, but does not verify the current label or exact four-pour recipe | `unresolved` | Partial | No | The reviewed source does not establish the current label as source-original. |
| Current variant R-05: clean 3-pour | `Unresolved` | S2 discusses a lighter result when the final 60% is poured once, but does not verify the repository's "clean" label or exact recipe | `unresolved` | Partial | No | Do not equate "lighter" with the current "clean" wording without evidence. |
| Current variant R-06: advanced / competition-style | `Unresolved` | Neither reviewed source verifies the current R-06 label, `25g`, `1:12`, `300g`, or an advanced schedule | `unresolved` | Unresolved | No | Keep all R-06 values placeholder. Do not imply competition validation or endorsement. |

### Source-original and app-calculated boundary

The reviewed sources support a later basic candidate with:

* a `1:15` ratio
* five equal 20% pours
* the stated five-pour timing
* a `3:30` dripper-removal action
* a formula that yields five `60g` pours for the `20g` / `300g` example

If Pourō applies that formula to another user-entered coffee dose, the resulting
gram values are app-calculated from a source-supported formula. They must not
be described as source-original values quoted from S1 or S2.

The sources do not support automatic scaling of:

* arbitrary user-entered ratios
* unequal sweetness or brightness pours
* current R-04, R-05, or R-06 recipes
* timing changes caused by a changed dose, grind, dripper, or pour count

## 4. Current repository mapping

| Repository area | Current value/state | Evidence status | Action |
| --------------- | ------------------- | --------------- | ------ |
| Method object | `four-six`; display name `4:6 Method`; short name `4:6`; method and recipe remain placeholder | Display name is corroborated; short-name field and full object verification are unresolved | Keep runtime unchanged in PR-011C. |
| Variants R-01 through R-06 | Six placeholder variants with repository-authored labels and recommendations | R-01 has a plausible basic-candidate mapping; R-02/R-03 concepts have partial support; R-04/R-05 labels and R-06 remain unresolved | Keep every variant placeholder. Review and approve mappings separately before runtime implementation. |
| Recipe values | Recipe fields are `null`; variants currently seed placeholder recommendations including R-01 to R-05 `20g`, `1:15`, `300g`, and R-06 `25g`, `1:12`, `300g` | The `20g` / `300g` pair is supported only as a source example; `1:15` is supported for the basic candidate; R-06 values are unsupported | Do not promote current recommendations to verified recipe values. |
| Recipe steps | Two generic placeholder steps shared by all methods | Not a 4:6 schedule and not source-supported | Keep unchanged until a separately reviewed runtime implementation. |
| Source metadata | `sourceTitle`, `sourceUrl`, and `sourceNote` are absent | S1/S2 are valid metadata candidates, but method-only metadata cannot express all field-level provenance | Keep unchanged in this docs-only PR; resolve the provenance approach first. |
| `valuesArePlaceholder` | `true` on method, recipe, and every R-01 to R-06 variant | Correct for the current mixed and unresolved state | Preserve. |
| `sourceStatus` | `placeholder` on method, steps, and every R-01 to R-06 variant | Correct because no field-level runtime mapping has been reviewed | Preserve. |
| `verificationLevel` | `placeholder` on method, steps, and every R-01 to R-06 variant | Correct for current runtime data | Preserve. |
| UI caution labels | Home, Recipe Setup, Brew Timer, and Sources expose placeholder / review caution; Timer hides its semantic chip while the schedule is placeholder | Appropriate and required while runtime data remains unresolved | Preserve wherever partial or placeholder data remains. |

## 5. Implementation gate

A later runtime PR may implement 4:6 data only if:

* Every implemented value has a source row in this document or an approved
  follow-up evidence document.
* Source-original values are distinguished from app-calculated values.
* App scaling behavior is documented.
* Placeholder values remain labeled as placeholder.
* Variants without evidence remain placeholder / needs review.
* UI caution labels are preserved where partial verification remains.
* No official affiliation, approval, supervision, partnership, or endorsement
  of Pourō is implied.
* The implementation scope states whether it is limited to a reviewed basic
  candidate or includes variant mappings.
* Any mapping from source evidence to R-01 through R-06 is explicitly reviewed.
* Any app-calculated schedule is restricted to a documented source-supported
  formula and is labeled as app-calculated.
* The runtime metadata approach makes mixed field-level provenance reviewable.
* The basic end condition is represented as a `3:30` dripper-removal action,
  not silently reinterpreted as guaranteed natural drawdown completion.

## 6. Recommended next PR

**Option B: Not ready for runtime implementation.**

The reviewed sources are sufficient to define a strong basic 4:6 runtime
candidate, but the application is not yet ready to implement it safely as the
next PR because:

* the current R-01 mapping has not been explicitly approved
* R-02 through R-06 are partially supported or unresolved
* arbitrary ratio and variant scaling rules are unresolved
* the current method-level source metadata cannot distinguish field-level
  source-original, app-calculated, placeholder, and app-guidance values

A follow-up should first approve a narrow provenance strategy and decide
whether the initial runtime scope is basic-only. It must leave unsupported
variants as placeholder.

## 7. Out of scope

This PR makes:

* no Hybrid implementation
* no 10 Pour implementation
* no Ice Brew implementation
* no runtime data changes unless explicitly documented
* no timer logic changes
* no storage changes
* no route changes
* no release docs changes
