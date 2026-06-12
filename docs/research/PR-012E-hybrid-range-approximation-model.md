# PR-012E: Hybrid Range / Approximation Runtime Model Prerequisite

## 1. Purpose

PR-012D selected Option C: Runtime blocker / data model prerequisite.

This PR adds the minimum additive TypeScript model needed to safely represent
range values, approximate and observed time references, distinct finish
semantics, and fixed-example setup gating in a later runtime PR.

This PR does not add Hybrid runtime data, method schedules, UI behavior, or
runtime validation.

## 2. PR-012D baseline

PR-012D approved R-08 as the repository's narrow mapping to the inspected S1
New Hybrid fixed example.

The approved future fixed-example scope is:

* `20g` coffee and `300g` water as future source-original values
* `1:15` as a future app-calculated value
* arbitrary dose and ratio scaling disabled
* placeholder-safe fallback for every non-exact setup

The remaining model blockers were safe representation of:

* first-pour range `40-50g`
* approximate timings
* narrated target timing versus observed frame timing
* later temperature range / choice `70-80 degrees Celsius`
* target completion around `3:30` versus observed dripper removal around `3:34`
* exact fixed setup gating

## 3. Added type model

`BrewNumericRange.min <= BrewNumericRange.max` is a model convention. This PR
does not add runtime validation for that convention. All new fields on existing
interfaces are optional, so existing recipes, steps, and saved snapshots remain
type-compatible.

| Type / field | Location | Purpose | Backward compatibility |
| ------------ | -------- | ------- | ---------------------- |
| `BrewMeasurementUnit` | `src/types/brew.ts` | Limits range units to grams, seconds, or Celsius. | New exported union; no existing union changed. |
| `BrewNumericRange` | `src/types/brew.ts` | Stores a numeric minimum and maximum with unit plus optional source-facing label and note. | New exported interface; no runtime validation added. |
| `BrewValuePrecision` | `src/types/brew.ts` | Declares whether a value is exact, ranged, approximate, observed, or unresolved. | New exported union; no existing union changed. |
| `BrewTimeReferenceKind` | `src/types/brew.ts` | Distinguishes instruction targets, observed examples, finish targets, dripper removal, and display guidance. | New exported union; no existing timer field changed. |
| `BrewTimeReference` | `src/types/brew.ts` | Associates seconds with precision and time-reference meaning. | New exported interface; does not drive timer behavior. |
| `BrewUnsupportedSetupBehavior` | `src/types/brew.ts` | Declares placeholder fallback, caution-only, or unsupported behavior for a setup outside a fixed gate. | New exported union; no selection behavior changed. |
| `BrewFixedSetupGate` | `src/types/brew.ts` | Declares an exact coffee, water, and ratio setup plus scaling and unsupported-setup policy. | New exported interface; does not enforce a gate at runtime. |
| `BrewRecipe.waterTempCelsiusRange` | `BrewRecipe` | Can later preserve temperature guidance as a range without choosing one exact value. | Optional and nullable; `waterTempCelsius` is retained unchanged. |
| `BrewRecipe.totalTimeReferences` | `BrewRecipe` | Can later keep target finish and observed removal as separate references. | Optional; `totalTimeSec` is retained unchanged. |
| `BrewRecipe.fixedSetupGate` | `BrewRecipe` | Can later declare exact fixed-example and fallback policy. | Optional and nullable; no current recipe selection changes. |
| `BrewStep.pourGramsRange` | `BrewStep` | Can later preserve a ranged pour such as `40-50g`. | Optional and nullable; `pourGrams` is retained unchanged. |
| `BrewStep.nextPourGramsRange` | `BrewStep` | Can later preview a ranged next pour without selecting an exact value. | Optional and nullable; `nextPourGrams` is retained unchanged. |
| `BrewStep.timeReferences` | `BrewStep` | Can later separate approximate instruction targets from observed example times. | Optional; existing timing fields are retained unchanged. |
| `BrewStep.timingNote` | `BrewStep` | Can later explain timing ambiguity without overloading the instruction text. | Optional; no current UI consumes it. |

No `temperatureNote` or `finishNote` fields were added. The range and time
reference types already include optional notes, so additional fields were not
needed for the minimum prerequisite.

## 4. Hybrid applicability

The table describes possible future use only. PR-012E does not instantiate or
implement any of these values.

| Hybrid issue | Future model support | Remaining runtime decision |
| ------------ | -------------------- | -------------------------- |
| first pour `40-50g` | `BrewStep.pourGramsRange` with a grams `BrewNumericRange` | Decide the future step mapping, evidence, and UI treatment without populating `pourGrams` as false precision. |
| approximate timings | `BrewStep.timeReferences` with `precision: "approximate"` | Decide which narrated targets belong to each runtime step and how the timer presents guidance. |
| target vs observed timing | Separate `BrewTimeReference` entries using `instruction_target` and `observed_example` | Keep observations informational and prevent them from silently driving exact timer actions. |
| `70-80 degrees Celsius` lower-temperature guidance | `BrewRecipe.waterTempCelsiusRange` with a Celsius `BrewNumericRange` and optional note | Preserve initial temperature as unresolved and decide whether the later guidance belongs at recipe or step level. |
| `3:30` vs `3:34` finish/removal | Separate `totalTimeReferences` using `finish_target` and `dripper_removal` | Do not choose one exact `totalTimeSec`; decide future display and timer behavior. |
| fixed `20g / 300g / 1:15` gate | `BrewRecipe.fixedSetupGate` | Add the gate only with field evidence and tests in a later runtime PR. |
| non-exact setup fallback | `unsupportedSetupBehavior: "placeholder_fallback"` | Reuse and test placeholder-safe selection behavior in a later runtime PR. |

## 5. Non-goals

* No Hybrid schedule was added.
* No runtime recipe was added.
* No method data was changed.
* No UI consumes the new fields yet.
* No scaling behavior was implemented.
* No localStorage schema migration was added.

## 6. Future runtime implementation gate

A later Hybrid runtime PR may proceed only if:

* PR-012E types exist and compile.
* R-08 -> S1 mapping remains approved.
* The fixed example is limited to exact `20g / 300g / 1:15`.
* The range pour uses `pourGramsRange`.
* Approximate timing uses `timeReferences`.
* Exact `startSec` / `endSec` are not used to imply false precision.
* Target completion and observed removal are represented separately.
* Lower-temperature guidance uses `waterTempCelsiusRange` or a note.
* Initial water temperature remains `null` or unresolved.
* A fixed setup gate is present.
* All other setups fall back to placeholder-safe display.
* Every runtime field has `fieldEvidence`.
* UI copy warns that the method is fixed example only and non-official.
* Mobile QA passes.

## 7. Independent Verifier Prompt

```text
Independently verify PR-012E: Hybrid Range / Approximation Runtime Model
Prerequisite.

Review the full diff against origin/main, src/types/brew.ts, the PR-012D
research and QA documents, and both PR-012E documents.

Pass only if:
- the PR changes only src/types/brew.ts and the two allowed PR-012E documents
- all source changes are additive type definitions or optional fields
- no existing required field, existing field type, or existing union value was
  removed or changed
- no existing runtime recipe data changed
- no Hybrid runtime values or method schedules were added
- no localStorage schema version changed
- no UI, timer, route, selection, or other runtime behavior changed
- no runtime validation was introduced
- npm.cmd run build passes
- git diff --check passes
- the documents explain the model, limitations, and future-only use
- the documents preserve fixed 20g / 300g / 1:15 gating, placeholder fallback,
  disabled scaling, unresolved initial temperature, and separate target versus
  observed semantics
- no official affiliation, approval, supervision, partnership, or endorsement
  is implied

Report findings first, ordered by severity. If no issue is found, state Pass
and identify any residual future-runtime risk.
```

## 8. Regression Checker Prompt

```text
Run a regression-only review of PR-012E against origin/main.

Confirm:
- src/data/placeholderMethods.ts did not change
- no runtime recipe values changed
- no method schedules changed
- no 4:6, Hybrid, 10 Pour, or Ice Brew runtime data changed
- no timer or active-brew state logic changed
- no route or BrowserRouter changes
- no storage, localStorage key, or schema changes
- no Service Worker, manifest, icon, PWA, workflow, package, or dependency
  changes
- no release docs changed
- no dist files changed
- sourceStatus, verificationLevel, valuesArePlaceholder, and isPlaceholder
  were not weakened
- no runtime fieldEvidence changed
- no new runtime Hybrid candidate was added
- npm.cmd run build passes
- git diff --check passes

Fail the regression check if any prohibited file or runtime behavior changed.
```

## 9. Memory / Handoff

PR-012E adds optional, generic brew types for numeric ranges, value precision,
typed time references, and fixed setup gating. It enables a later PR to
represent the approved Hybrid fixed example without collapsing range,
approximation, target-versus-observed, finish, or fallback semantics.

It does not implement Hybrid runtime data, schedules, scaling, selection
behavior, UI consumption, runtime validation, or storage migration.

Files changed:

* `src/types/brew.ts`
* `docs/research/PR-012E-hybrid-range-approximation-model.md`
* `docs/qa/PR-012E-hybrid-range-approximation-model.md`

The future Hybrid runtime PR must preserve exact `20g / 300g / 1:15` gating,
use range and time-reference fields instead of false precision, keep target and
observed events separate, keep initial temperature unresolved, add field-level
evidence, provide non-official caution copy, test placeholder fallback, and
pass mobile QA.

The future PR must not introduce arbitrary dose or ratio scaling, convert
ranges or approximate values to unsupported exact values, treat observations
as instructions, or weaken existing placeholder and verification guards.

## 10. Out of scope

* no runtime recipe data changes
* no schedule changes
* no timer logic changes
* no app UI changes
* no storage changes
* no route changes
* no release docs changes
