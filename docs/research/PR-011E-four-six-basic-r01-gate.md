# PR-011E: 4:6 Basic Candidate Mapping / R-01 Runtime Gate

## 1. Purpose

This PR decides whether current repository variant `R-01` may be used as the
narrow basic 4:6 runtime candidate in a later implementation PR.

The decision is limited to mapping the source-supported basic five-pour
candidate documented in PR-011C to `R-01`. This PR does not change runtime
data, add method schedules, or verify `R-02` through `R-06`.

## 2. Inputs

The decision reviewed:

* PR-011A Method Recipe Data Source Verification Audit
* PR-011C 4:6 Method Source Evidence Pack
* PR-011D Field-level Provenance Model

PR-011C reviewed these source candidates:

* S1: HARIO Coffee Scale POLARIS
* S2: Philocoffea, "How to Make Coffee Using the 4:6 Brewing Method"

PR-011C records both as strong `official_or_primary_like` evidence candidates
for a basic 4:6 recipe. It does not mark either source `primary_confirmed`, and
it does not establish every current Pourō variant or app-scaling rule. This PR
adds no source claims beyond PR-011C.

## 3. Current repository R-01 state

| Field / area | Current state | Current status | Notes |
| ------------ | ------------- | -------------- | ----- |
| Method ID | `four-six` | Existing repository identity | Unchanged. |
| Variant ID | `R-01` | Existing repository identity | Unchanged. |
| Display label | `4:6 Method 基本形`; short label `基本形` | Placeholder repository-authored mapping | The reviewed sources support `4:6 Method` and a basic candidate, but do not identify Pourō variant `R-01`. |
| Recommended dose | `20g` | Placeholder variant recommendation | Seeds Recipe Setup; it is not currently marked as a source example. |
| Recommended water | `300g` | Placeholder variant recommendation | Seeds Recipe Setup; it is not currently marked as a source example. |
| Recommended ratio | `1:15` | Placeholder variant recommendation | Stored as `15`; it is not currently marked as source-supported runtime data. |
| Recipe values | `coffeeGrams`, `waterGrams`, `ratio`, `waterTempCelsius`, `grindSizeLabel`, and `totalTimeSec` are `null` | Placeholder recipe | No basic 4:6 values are implemented in the recipe. |
| Recipe steps | Two generic placeholder steps at `0-30` and `30-60` seconds, with no pour or cumulative-water values | Placeholder schedule scaffold | Not a 4:6 schedule and not source-supported. |
| `sourceStatus` | Method, R-01, and recipe steps use `placeholder` | Placeholder | Preserved by this PR. |
| `verificationLevel` | Method, R-01, and recipe steps use `placeholder` | Placeholder | Preserved by this PR. |
| `valuesArePlaceholder` | `true` on the method, R-01, and recipe | Placeholder guard active | Preserved by this PR. |
| `isPlaceholder` | `true` on both recipe steps | Placeholder guard active | Preserved by this PR. |
| `fieldEvidence` | Absent on the method, R-01, recipe, and recipe steps | No runtime field-level mapping yet | PR-011D made the containers available, but this PR does not populate them. |

## 4. R-01 mapping decision

| Decision item | Decision | Reason |
| ------------- | -------- | ------ |
| May R-01 represent a narrow basic 4:6 candidate in a later PR? | Yes, under the implementation constraints in this document. | PR-011C supports a strong basic five-pour candidate, and R-01 is the repository's basic variant. |
| Does mapping R-01 verify all 4:6 variants? | No. | The reviewed sources do not verify the exact mappings and schedules for R-02 through R-06. |
| Should R-01 be implemented with R-02 through R-06? | No. | Separating the basic candidate prevents partial concepts and unresolved variants from being promoted with it. |
| Must R-01 preserve provenance distinctions? | Yes. | The candidate mixes source-original examples, possible app-calculated values, app guidance, and unresolved fields. |
| Must caution labels remain where verification is partial? | Yes. | A source-backed field does not automatically verify its containing method, variant, recipe, or schedule. |

**Decision:** `R-01` can be used as the narrow basic 4:6 runtime candidate for
a later PR, but only under the constraints below.

## 5. Fields allowed for later implementation

The following table describes fields allowed in a later narrow implementation
PR. It does not describe fields implemented by PR-011E.

| Future field | Candidate treatment | Provenance | Required note |
| ------------ | ------------------- | ---------- | ------------- |
| `displayName` | Keep method display name `4:6 Method`; use the R-01 basic mapping without implying all variants are verified | Method name: `source_original`; R-01 mapping/label: `app_guidance` unless separately supported | The sources use `4:6 Method` but do not identify Pourō variant `R-01`. |
| `sourceTitle` | Attach an accurately selected S1 and/or S2 title | `source_original` metadata | Do not imply that a source approves, supervises, or endorses Pourō. |
| `sourceUrl` | Attach the matching S1 and/or S2 URL | `source_original` metadata | Keep the URL tied to the exact supported fields. |
| `sourceNote` | Explain the basic-only scope, mixed provenance, and app calculations | `app_guidance` | State that R-02 through R-06 remain unresolved or placeholder. |
| `coffeeGrams` | Allow `20g` only as the cited basic source example | `source_original` | Do not describe `20g` as a universal required dose. |
| `waterGrams` | Allow `300g` only as the cited example paired with `20g` at `1:15` | `source_original` | Do not describe `300g` as universal. |
| `ratio` | Allow `1:15` for the reviewed basic candidate | `source_original` | Do not extend this approval to arbitrary ratios or R-06 `1:12`. |
| Pour count | Allow five pours for the basic candidate | `source_original` | Do not infer current R-04 or R-05 mappings from the broader concentration-control concept. |
| Pour amounts | Allow the basic `20g` / `300g` example as five `60g` pours | `source_original` | Numbers produced for another dose are not source-original. |
| Timing | Allow `0:00`, `0:45`, `1:30`, `2:15`, and `2:45` for the reviewed basic five-pour candidate | `source_original` | Do not infer timing changes for another dose, ratio, grind, dripper, or pour count. |
| `3:30` dripper-removal action | Allow as the basic candidate's end action | `source_original` | Represent it as removing the dripper, not as guaranteed natural drawdown completion. |
| Water split concept | Allow the 40% flavor / 60% concentration concept | `source_original` | Keep the concept distinct from Pourō-authored variant mappings and copy. |
| App-calculated dose scaling, if used later | Allow only the reviewed basic `1:15` formula and five equal-pour calculation | `app_calculated` | Record inputs and formula in `calculationNote`; label resulting values as app-calculated. |

## 6. Fields not allowed yet

The R-01 decision does not approve:

* R-02 sweetness schedule
* R-03 brightness / acidity schedule
* R-04 light 4-pour schedule
* R-05 clean 3-pour schedule
* R-06 advanced / competition-style variant
* arbitrary ratio scaling
* arbitrary non-`20g` dose behavior unless the reviewed basic formula and
  app-calculated status are explicitly implemented
* temperature values; PR-011C mentions source temperature guidance but does
  not map and approve a temperature field for this R-01 gate
* timing changes caused by dose, grind, dripper, ratio, or pour-count changes
* any claim of official endorsement, approval, supervision, affiliation, or
  partnership

R-02 through R-06 must remain placeholder, `needs_review`, or `unresolved`
until separately reviewed.

## 7. Required fieldEvidence plan

A later runtime implementation must apply the optional `fieldEvidence` model
added in PR-011D to every changed field.

| Evidence treatment | Required use in a later PR |
| ------------------ | -------------------------- |
| `source_original` | Use for exact supported source examples, formula statements, basic timing, pour count, water split, and the `3:30` removal action. Include the applicable S1/S2 `sourceId`, title or URL, and a note limiting the supported scope. |
| `app_calculated` | Use for values calculated from a user-entered dose with the approved basic formula. Include a `calculationNote` that records the formula and inputs. |
| `app_guidance` | Use for Pourō-authored caution copy, the R-01 repository mapping explanation, and notes that distinguish source examples from app calculations. |
| `placeholder` | Keep for the current generic steps and any temporary field that is not a recipe claim. Preserve existing placeholder guards. |
| `needs_review` | Use where evidence exists but an exact runtime mapping or wording has not been approved. Do not display it as verified. |
| `unresolved` | Use for unsupported variant mappings, values, schedules, or source identities. Leave the runtime value safely unimplemented or placeholder. |

Source examples such as `20g`, `300g`, five `60g` pours, and the reviewed basic
timing should be `source_original` only within their documented example scope.
Values produced for another dose must be `app_calculated`. Pourō-authored
caution and explanation copy must be `app_guidance`. R-02 through R-06 must
remain `placeholder`, `needs_review`, or `unresolved`.

Field evidence does not automatically weaken or clear `sourceStatus`,
`verificationLevel`, `valuesArePlaceholder`, or `isPlaceholder`. A later PR
must make any container-level status change explicit and justify it against the
remaining mixed and unresolved fields.

PR-011E does not edit runtime data or populate `fieldEvidence`.

## 8. Runtime implementation gate for PR-011F

PR-011F may implement R-01 runtime data only if:

* It changes only 4:6 R-01 and shared 4:6 basic recipe fields.
* It does not modify Hybrid, 10 Pour Method, or Ice Brew.
* It does not implement R-02 through R-06.
* Every changed field has `fieldEvidence`.
* Source-original and app-calculated values are distinguished.
* App calculations are limited to an explicitly documented, reviewed formula.
* Unsupported variants remain placeholder.
* UI caution labels remain for any partial or placeholder areas.
* Brew Timer does not display unverified schedules as fully verified.
* The `3:30` action is represented as dripper removal, not guaranteed drawdown.
* No official affiliation, approval, supervision, partnership, or endorsement
  claim is introduced.
* `npm.cmd run build` and `git diff --check` pass.

## 9. Recommended next PR

Recommended follow-up:

**PR-011F: 4:6 Basic Runtime Data / R-01 Source-backed Candidate**

PR-011F must remain narrow and must not implement R-02 through R-06 or other
methods.

## 10. Out of scope

PR-011E makes:

* no runtime recipe data changes
* no method schedule changes
* no timer logic changes
* no storage migration
* no route changes
* no release docs changes
