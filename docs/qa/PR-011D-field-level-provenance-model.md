# PR-011D: Field-level Provenance Model QA

## 1. Purpose

This PR creates a field-level provenance scaffold before verified runtime
recipe data is implemented.

## 2. Scope

The PR adds source/provenance types, optional field evidence containers, pure
provenance helpers, and documentation of the relationship to existing
`sourceStatus` and `verificationLevel`.

It adds no recipe values, method schedules, or Brew Timer state-machine
changes.

## 3. Files changed

* `src/types/source.ts`
* `src/types/brew.ts`
* `src/types/index.ts`
* `src/utils/provenance.ts`
* `src/utils/index.ts`
* `docs/research/PR-011D-field-level-provenance-model.md`
* `docs/qa/PR-011D-field-level-provenance-model.md`

## 4. Verification

| Check | Result |
| ----- | ------ |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| No dist files | Pass |
| No runtime recipe values changed | Pass |
| No method schedules changed | Pass |
| No source status weakened | Pass |
| No verification level weakened | Pass |
| No timer logic changes | Pass |
| No route changes | Pass |
| No storage schema changes | Pass |
| No PWA / manifest / workflow changes | Pass |

## 5. Manual review

* Provenance categories are clearly defined.
* The model complements existing `sourceStatus` and `verificationLevel`.
* No unverified values are marked as verified.
* No official affiliation claim is introduced.
* The future runtime gate is clear.
* Existing app behavior is unchanged.

## 6. Result

Result: Pass.

Blocking issues: None.

Non-blocking follow-ups: 4:6 basic runtime candidate decision and other method
evidence packs.
