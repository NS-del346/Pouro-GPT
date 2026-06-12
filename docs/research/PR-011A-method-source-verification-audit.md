# PR-011A: Method Recipe Data Source Verification Audit

## 1. Purpose

This document audits the current MVP method data and prepares safe source-verification work before recipe values and brew schedules are implemented.

The audit separates repository facts, external source candidates, placeholder data, user-entered setup values, and app-calculated values. It does not promote any current value or source candidate to verified runtime data.

## 2. Scope

The four MVP methods in scope are:

* 4:6 Method
* Hybrid
* 10 Pour Method
* Ice Brew

This PR does not implement final recipe values or brew timer schedules. Source files were inspected but not modified.

The primary repository evidence inspected was:

* `src/data/placeholderMethods.ts`
* `src/types/source.ts`
* `src/types/brew.ts`
* `src/utils/sourceStatus.ts`
* `src/pages/BrewHomePage.tsx`
* `src/pages/RecipeSetupPage.tsx`
* `src/pages/BrewTimerPage.tsx`
* `src/pages/SourcesPage.tsx`

## 3. Current repository state

### Shared method-data behavior

All four methods are exported through `visiblePlaceholderMethods`. Every method and recipe has `valuesArePlaceholder: true`.

Each method recipe currently has:

* `coffeeGrams`, `waterGrams`, `ratio`, `waterTempCelsius`, `grindSizeLabel`, and `totalTimeSec` set to `null`.
* The same two generated placeholder steps.
* Placeholder step timing at `0-30` seconds and `30-60` seconds.
* No `pourGrams` or `totalWaterGrams`.
* Step-level `sourceStatus: "placeholder"`, `verificationLevel: "placeholder"`, and `isPlaceholder: true`.

Recipe Setup initializes user-editable fields from variant recommendations or UI fallback values. Those setup values can affect an individual brew session, but they are not verified source recipe values. Brew Timer reads the two generic recipe steps, so it can reach Finish after the placeholder second step even though no method schedule has been verified.

The method type supports optional `sourceTitle`, `sourceUrl`, and `sourceNote`, but none of the four current method objects populates them. Variants and recipes do not have equivalent URL/note fields. Steps have source status and verification level, but no source URL or source note.

### 4:6 Method

| Field / area | Current state | Source status | Verification level | Placeholder? | Notes |
| ------------ | ------------- | ------------- | ------------------ | ------------ | ----- |
| Display name | `4:6 Method` | `placeholder` | `placeholder` | Yes | Method ID is `four-six`. |
| Short name | `4:6` | `placeholder` | `placeholder` | Yes | Present as display metadata only. |
| Description | General reference copy; says recipe values and steps are under review | `placeholder` | `placeholder` | Yes | Does not claim a final recipe. |
| Variants | R-01 through R-06: Basic, sweetness, brightness/acidity, light 4-pour, clean 3-pour, and advanced competition-style labels | `placeholder` | `placeholder` | Yes | Variant meanings and labels require source verification. |
| Coffee dose | Recipe: `null`; R-01 to R-05: `20g`; R-06: `25g` | `placeholder` | `placeholder` | Yes | Variant values seed Recipe Setup but are not verified. |
| Water amount | Recipe: `null`; all variants: `300g` | `placeholder` | `placeholder` | Yes | Setup also calculates water from user-selected dose and ratio. |
| Ratio | Recipe: `null`; R-01 to R-05: `1:15`; R-06: `1:12` | `placeholder` | `placeholder` | Yes | Must not be treated as source-original until verified. |
| Pour count | Recipe has two generic steps; variant labels mention 3 or 4 pours | `placeholder` | `placeholder` | Yes | No canonical method-specific step array exists. |
| Intervals | Generic starts at `0`, `30`, and implied end at `60` seconds | `placeholder` | `placeholder` | Yes | Same generic interval scaffold is used by all methods. |
| Target drawdown | Not present; `totalTimeSec` is `null` | `placeholder` | `placeholder` | Yes | Generic second step ends at 60 seconds but is not a target drawdown. |
| Ice amount | Not present | `placeholder` | `placeholder` | Yes | Not applicable to the current hot 4:6 variants. |
| Temperature notes | Recipe temperature is `null`; user can enter a free-form memo | `placeholder` | `placeholder` | Yes | User memo is not source recipe data. |
| Brew steps | Two generic placeholder steps with no pour or total grams | `placeholder` | `placeholder` | Yes | Timer displays caution copy instead of confirmed targets. |
| Source notes | Not present | `placeholder` | `placeholder` | Yes | `sourceTitle`, `sourceUrl`, and `sourceNote` are unused. |
| UI caution labels | Home, Setup, variant card, Timer, and Sources communicate review/placeholder state | Existing caution model | Existing caution model | Yes | Caution labels must remain until field-level verification is complete. |

### Hybrid

| Field / area | Current state | Source status | Verification level | Placeholder? | Notes |
| ------------ | ------------- | ------------- | ------------------ | ------------ | ----- |
| Display name | `Hybrid Method` | `needsReview` | `unverified` | Yes | Method ID is `hybrid`. |
| Short name | `Hybrid` | `needsReview` | `unverified` | Yes | The name does not identify a canonical source by itself. |
| Description | Says the proposal combines immersion and percolation | `needsReview` | `unverified` | Yes | Broad description only. |
| Variants | R-08: `NEWハイブリッド / HARIO Switch` | `needsReview` | `unverified` | Yes | The repository suggests a Switch method, but provides no source. |
| Coffee dose | Recipe: `null`; R-08: `20g` | `needsReview` | `unverified` | Yes | R-08 value seeds Recipe Setup. |
| Water amount | Recipe: `null`; R-08: `300g` | `needsReview` | `unverified` | Yes | Setup can calculate water from user-selected dose and ratio. |
| Ratio | Recipe: `null`; R-08: `1:15` | `needsReview` | `unverified` | Yes | Not verified as source-original. |
| Pour count | Recipe has two generic steps | `placeholder` | `placeholder` | Yes | No immersion/percolation sequence exists. |
| Intervals | Generic starts at `0`, `30`, and implied end at `60` seconds | `placeholder` | `placeholder` | Yes | No switch open/close timing exists. |
| Target drawdown | Not present; `totalTimeSec` is `null` | `placeholder` | `placeholder` | Yes | No end condition is represented. |
| Ice amount | Not present | `needsReview` | `unverified` | Yes | No iced-hybrid definition is implied. |
| Temperature notes | Recipe temperature is `null`; user can enter a free-form memo | `needsReview` | `unverified` | Yes | No verified temperature-change sequence exists. |
| Brew steps | Two generic placeholder steps with no pour or total grams | `placeholder` | `placeholder` | Yes | Timer semantic chip only says the Switch state needs confirmation. |
| Source notes | Not present | `needsReview` | `unverified` | Yes | No source maps R-08 to a specific public method. |
| UI caution labels | Home, Setup, variant card, Timer, and Sources communicate review/placeholder state | Existing caution model | Existing caution model | Yes | Must remain. |

### 10 Pour Method

| Field / area | Current state | Source status | Verification level | Placeholder? | Notes |
| ------------ | ------------- | ------------- | ------------------ | ------------ | ----- |
| Display name | `10 Pour Method` | `needsReview` | `unverified` | Yes | Method ID is `ten-pour`; do not rename in this PR. |
| Short name | `10 Pour` | `needsReview` | `unverified` | Yes | Present as display metadata. |
| Description | Says the proposal uses multiple pours | `needsReview` | `unverified` | Yes | Does not establish a canonical recipe. |
| Variants | R-09: `THE NEO BREW / 10投式` | `needsReview` | `unverified` | Yes | Relationship between the two names requires review. |
| Coffee dose | Recipe: `null`; R-09: `20g` | `needsReview` | `unverified` | Yes | R-09 value seeds Recipe Setup. |
| Water amount | Recipe: `null`; R-09: `300g` | `needsReview` | `unverified` | Yes | Not verified as source-original. |
| Ratio | Recipe: `null`; R-09: `1:15` | `needsReview` | `unverified` | Yes | Not verified as source-original. |
| Pour count | Method and variant names say 10; recipe has two generic steps | `needsReview` / `placeholder` | `unverified` / `placeholder` | Yes | Runtime schedule does not contain ten pours. |
| Intervals | Generic starts at `0`, `30`, and implied end at `60` seconds | `placeholder` | `placeholder` | Yes | No verified ten-pour interval schedule exists. |
| Target drawdown | Not present; `totalTimeSec` is `null` | `placeholder` | `placeholder` | Yes | No total time or drawdown condition exists. |
| Ice amount | Not present | `needsReview` | `unverified` | Yes | Not part of the current candidate definition. |
| Temperature notes | Recipe temperature is `null`; user can enter a free-form memo | `needsReview` | `unverified` | Yes | No verified temperature guidance exists. |
| Brew steps | Two generic placeholder steps with no pour or total grams | `placeholder` | `placeholder` | Yes | Timer shows `Step n / 2`, not a ten-pour schedule. |
| Source notes | Not present | `needsReview` | `unverified` | Yes | No source is attached to R-09. |
| UI caution labels | Home, Setup, variant card, Timer, and Sources communicate review/placeholder state | Existing caution model | Existing caution model | Yes | Must remain. |

### Ice Brew

| Field / area | Current state | Source status | Verification level | Placeholder? | Notes |
| ------------ | ------------- | ------------- | ------------------ | ------------ | ----- |
| Display name | `Ice Brew` | `placeholder` | `placeholder` | Yes | Method ID is `ice-brew`. |
| Short name | `Ice` | `placeholder` | `placeholder` | Yes | Present as display metadata only. |
| Description | Describes an unconfirmed cold-brew candidate | `placeholder` | `placeholder` | Yes | Does not identify flash brew, iced 4:6, or ice-on-bed brewing. |
| Variants | R-10: `急冷式アイス4:6 標準` | `placeholder` | `placeholder` | Yes | Variant label implies a flash-chilled 4:6 interpretation. |
| Coffee dose | Recipe: `null`; R-10: `20g` | `placeholder` | `placeholder` | Yes | R-10 value seeds Recipe Setup. |
| Water amount | Recipe: `null`; R-10 regular water is `null`; hot water is `150g` | `placeholder` | `placeholder` | Yes | Hot water field is distinct from total/final beverage yield. |
| Ratio | Recipe and R-10 ratio are `null` | `placeholder` | `placeholder` | Yes | No source ratio is represented. |
| Pour count | Recipe has two generic steps | `placeholder` | `placeholder` | Yes | No iced 4:6 or flash-brew schedule exists. |
| Intervals | Generic starts at `0`, `30`, and implied end at `60` seconds | `placeholder` | `placeholder` | Yes | No method-specific interval schedule exists. |
| Target drawdown | Not present; `totalTimeSec` is `null` | `placeholder` | `placeholder` | Yes | Final yield can be entered by the user, but is not a drawdown target. |
| Ice amount | R-10: `80g`; Recipe Setup fallback: `80g` | `placeholder` | `placeholder` | Yes | Must not be treated as a verified source value. |
| Temperature notes | Recipe temperature is `null`; user can enter a free-form memo | `placeholder` | `placeholder` | Yes | No verified temperature guidance exists. |
| Brew steps | Two generic placeholder steps with no pour or total grams | `placeholder` | `placeholder` | Yes | Timer semantic chip can show the user-entered ice amount only. |
| Source notes | Not present | `placeholder` | `placeholder` | Yes | No source maps R-10 to a specific iced method. |
| UI caution labels | Home, Setup, variant card, Timer, and Sources communicate review/placeholder state | Existing caution model | Existing caution model | Yes | Must remain. |

### External source candidates collected on 2026-06-12

These URLs are research leads, not approved runtime sources. No value from them was copied into runtime data in this PR.

| Method | Candidate source | Candidate quality | Audit note |
| ------ | ---------------- | ----------------- | ---------- |
| 4:6 Method | [HARIO Coffee Scale POLARIS](https://global.hario.com/product/new/CST.html) | Official/manufacturer, supervised recipe | Strong candidate for the basic extraction model. It does not by itself verify every current Pourō variant or app-scaling rule. |
| 4:6 Method | [Philocoffea: How to Make Coffee Using the 4:6 Brewing Method](https://en.philocoffea.com/blogs/blog/coffee-brewing-method) | Primary-like organization/source | Strong candidate for the 4:6 concept, basic formula, and adjustment meanings. Field-by-field review is still required. |
| Hybrid | No clear primary source identified from the repository or focused web search | Unresolved | The repository's `NEWハイブリッド / HARIO Switch` label is insufficient to select one public recipe safely. |
| 10 Pour Method | [Tetsu Kasuya YouTube: THE NEO BREW / multi-pour recipe candidate](https://www.youtube.com/watch?v=k0nsShguOsU) | Primary candidate | Appears relevant to the R-09 relationship between `THE NEO BREW` and a ten-pour method. Because it is recent and not attached in the repository, its naming, values, schedule, and allowed app interpretation require explicit review. |
| Ice Brew | [Kurasu translation of Tetsu Kasuya's Ice Brew video](https://kurasu.kyoto/blogs/kurasu-journal/tetsu-kasuya-ice-brew-coffee-english) and linked [original video](https://youtu.be/HDmhY5adR3s) | Third-party translation plus primary video | Describes an ice-on-coffee-bed method, which is not obviously the same as R-10 `急冷式アイス4:6 標準`. It is useful for disambiguation, not verification of R-10. |

## 4. Verification requirements by method

### 4:6 Method

Before runtime data changes, verify:

* The canonical pour count for each supported variant, rather than assuming one count applies to all variants.
* The water split concept and which variant labels are actually supported by a primary or primary-like source.
* Timing, drain-between-pours, and target drawdown assumptions.
* Dose and ratio assumptions, including whether any value is a source example, fixed rule, supported range, or app default.
* The meanings and permitted wording of R-01 through R-06.
* Which quantities can safely be scaled by the app.
* Which scaled quantities must be labeled app-calculated rather than source-original.
* Whether the current advanced/competition-style label and values can be supported without implying official endorsement.

### Hybrid

Before runtime data changes, verify:

* Whether the current method specifically means a HARIO Switch immersion/percolation hybrid.
* Which public recipe R-08 is intended to represent.
* Switch open and close assumptions.
* Bloom, percolation, immersion, release, and drawdown sequence.
* Temperature-change assumptions, if any.
* Ratio, dose, and water assumptions.
* Which instructions are source-original, interpreted from a demonstration, or Pourō app guidance.
* Whether manufacturer/tool names can be used in the intended public-facing context without implying affiliation.

### 10 Pour Method

Before runtime data changes, verify:

* The canonical public-facing name to use in this app while preserving the existing `10 Pour Method`, `THE NEO BREW`, method ID, and variant ID until a separate approved naming change exists.
* The relationship between `10 Pour Method` and `THE NEO BREW`.
* The intended source and version of the recipe.
* Pour count and whether every pour is a distinct timed step.
* Interval assumptions.
* Total time and drawdown assumptions.
* Dose, water, ratio, temperature, grind, and equipment assumptions.
* Which values must remain `needsReview` because the source is recent, incomplete, or not safely mapped to the app.

### Ice Brew

Before runtime data changes, verify:

* Whether the current app method means iced 4:6 style, flash brew style, ice-on-bed ice brew, or another method.
* Whether R-10 `急冷式アイス4:6 標準` is the intended canonical variant.
* Ice amount assumptions.
* Hot water amount assumptions.
* Total beverage yield and expected dilution assumptions.
* Pour count and interval assumptions.
* Temperature assumptions.
* Which instructions are source-original, interpreted from a demonstration, or Pourō app guidance.
* Whether final yield is user-recorded only, app-calculated, or a source-defined target.

## 5. Source taxonomy

The repository must preserve its current runtime enums:

* `sourceStatus`: `verified`, `thirdParty`, `placeholder`, `needsReview`
* `verificationLevel`: `official`, `primary`, `manufacturer`, `competition`, `book`, `thirdParty`, `unverified`, `placeholder`
* `valuesArePlaceholder`: boolean caution flag on methods, variants, and recipes

The following research taxonomy can guide later reviews without renaming runtime fields:

| Research category | Meaning | Current-model mapping guidance |
| ----------------- | ------- | ------------------------------ |
| `primary_confirmed` | Exact field or instruction confirmed from a directly attributable primary source and reviewed for app use | May become `sourceStatus: "verified"` with the appropriate existing verification level, only after placeholder flags are intentionally cleared for the verified scope. |
| `official_or_primary_like` | Manufacturer, creator organization, creator channel, or similarly strong candidate that still needs field-level review | Keep `needsReview` / `unverified` until the exact claim and app mapping are approved; later use `official`, `primary`, or `manufacturer` as appropriate. |
| `researched_summary` | A documented synthesis across sources | Usually remains `thirdParty`; record that it is a synthesis rather than source-original. |
| `third_party_interpretation` | A third party's recipe, translation, explanation, or adaptation | Use `thirdParty` / `thirdParty`; do not present it as official or source-original. |
| `app_guidance` | Pourō-authored instruction, calculation, default, or usability guidance | The current schema has no dedicated provenance field. Keep it explicitly distinguishable in documentation/source notes and do not imply it is source-original. |
| `placeholder` | UI or behavior scaffold not intended as a recipe claim | Use `placeholder` / `placeholder` with `valuesArePlaceholder: true`. |
| `needs_review` | Candidate identity, value, wording, or source mapping that is not approved | Use `needsReview` / `unverified`; keep placeholder flags where values are still non-final. |

The current metadata model is insufficient for field-level provenance. A method can have one optional source URL/note, but a recipe can mix source-original values, app-calculated values, user-entered values, and app guidance. Variants and recipes also lack source URL/note fields. This gap must be resolved or explicitly worked around before mixed-provenance runtime data is presented as verified.

## 6. Verification level taxonomy

The repository does not use generic `high`, `medium`, `low`, or `needs_review` verification-level values. It uses evidence-kind values and must keep them unchanged.

| General confidence term | Current-model interpretation |
| ----------------------- | ---------------------------- |
| `high` | Exact claim reviewed against a suitable `official`, `primary`, `manufacturer`, `competition`, or `book` source; only the verified scope may use `sourceStatus: "verified"`. |
| `medium` | Useful evidence exists, but the exact app mapping or interpretation is incomplete; keep `needsReview` / `unverified` or `thirdParty` / `thirdParty` as appropriate. |
| `low` | Weak, incomplete, conflicting, or adaptation-only evidence; keep `needsReview` / `unverified`. |
| `needs_review` | No approval to treat the value or instruction as final; keep `needsReview` / `unverified` or `placeholder` / `placeholder`. |

Verification level alone is not enough to make data confirmed. The existing `canDisplayAsConfirmed` guard also requires `sourceStatus: "verified"` and both method and recipe placeholder flags to be false.

## 7. Runtime implementation gates

Before PR-011B or a later PR changes runtime recipe or timer behavior:

* Each runtime value and instruction must have a documented source status.
* Each source example, fixed rule, supported range, user-entered value, and app-calculated value must be distinguishable.
* Each app-calculated value must be distinguishable from a source-original value.
* Placeholder values must not display as verified.
* Existing UI caution labels must remain wherever the displayed method, variant, recipe, step, or value is unverified.
* Brew Timer schedules must not be implemented from unverified assumptions.
* The intended canonical source/version must be selected for Hybrid, 10 Pour Method, and Ice Brew.
* 4:6 variant coverage and app-scaling rules must be approved; verifying a basic recipe does not automatically verify every current variant.
* Method-specific brew steps must include enough verified or clearly labeled app-guidance information for:
  * current step
  * current pour amount
  * total poured amount
  * next step time
  * next pour amount
  * target drawdown or end condition where available
* The step model must distinguish pour timing from drawdown/end conditions. The current generic `endSec` and `totalTimeSec` fields do not establish that distinction by themselves.
* Source metadata must be sufficient to review mixed-provenance recipes. If the current method-only source URL/note is retained, the implementation PR must document how field-level evidence remains reviewable.
* Runtime changes must include tests or QA proving that unverified values cannot appear confirmed.

## 8. Recommended follow-up PRs

* PR-011B: Brew Timer Schedule Data Model / Step Completion
* PR-011C: Method Runtime Data Update after Source Verification
* PR-011D: UI Copy for Source / Placeholder Transparency if needed

PR-011B may prepare a non-runtime data model, but it must not complete runtime schedules from unresolved source assumptions.

## 9. Out of scope

This PR makes:

* no recipe value changes
* no method runtime data changes
* no timer schedule changes
* no timer logic changes
* no route changes
* no storage changes
* no new methods
* no official affiliation claims
* no release docs changes

## 10. Final judgment

**Not ready for PR-011B until specific missing sources are resolved.**

The blocking source questions are:

* 4:6 Method: verify current variant meanings, variant-specific schedules, scaling rules, and the advanced/competition-style mapping.
* Hybrid: identify and approve the exact primary recipe represented by R-08.
* 10 Pour Method: review and approve the relationship between `10 Pour Method`, `THE NEO BREW`, and the intended source/version.
* Ice Brew: choose and approve the intended method identity before treating R-10 as iced 4:6, flash brew, or another ice-brew approach.

Until those questions are resolved, the current placeholder and needs-review metadata must remain unchanged, and no runtime recipe or timer schedule should be completed.
