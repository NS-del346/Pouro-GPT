# PR-011D: Field-level Provenance Model

## 1. Purpose

Field-level provenance is needed before verified runtime recipe data is
implemented because one recipe can combine source-original values,
app-calculated values, app guidance, placeholders, and unresolved claims.

This PR adds a reviewable, optional scaffold for those distinctions. It does
not implement recipe values or method schedules.

## 2. Problem statement

Method-level `sourceStatus`, `verificationLevel`, and source notes describe the
method as a whole. They cannot explain the origin of each recipe field,
variant recommendation, or step instruction when one method contains mixed
provenance.

A future method may contain source-original examples, numbers calculated by
Pourō from a source-supported formula, placeholder fields, and app-authored
guidance at the same time. Current 4:6 evidence cannot be implemented safely
until those categories can remain distinguishable and reviewable.

## 3. Provenance categories

| Category | Meaning | Runtime implication | UI implication |
| -------- | ------- | ------------------- | -------------- |
| `source_original` | A value or statement directly supported by cited source evidence. | May be implemented only within the reviewed scope of its evidence. | Identify it as source-backed without implying affiliation or endorsement. |
| `app_calculated` | A value calculated by Pourō from documented inputs and a reviewed formula. | Must include a calculation note and must not be represented as quoted directly from a source. | Label it as an app-calculated value. |
| `app_guidance` | Guidance authored by Pourō rather than stated by the cited source. | May assist the user but must remain distinguishable from source claims. | Label it as app guidance. |
| `placeholder` | A temporary value or behavior scaffold that is not a recipe claim. | Must keep existing placeholder guards and caution behavior. | Continue to show placeholder or review caution. |
| `needs_review` | Evidence or mapping exists but has not been approved for runtime use. | Must not be displayed as verified. | Show that review is required. |
| `unresolved` | The intended value, mapping, or source is not established. | Must remain unimplemented or safely nullable/placeholder. | Show an unresolved state rather than certainty. |

## 4. Relationship to existing sourceStatus and verificationLevel

Field-level provenance complements and does not replace the existing model:

* `sourceStatus` continues to express the source state for a method, variant,
  or step.
* `verificationLevel` continues to express the type or level of verification.
* `valuesArePlaceholder` continues to guard methods, variants, and recipes.
* `isPlaceholder` continues to guard brew steps.

The new model describes the origin and treatment of an individual field. A
field marked `source_original` does not automatically make its containing
method verified, and it does not clear any existing placeholder flag.

## 5. Proposed TypeScript model

PR-011D adds these source types:

```ts
export type ValueProvenance =
  | "source_original"
  | "app_calculated"
  | "app_guidance"
  | "placeholder"
  | "needs_review"
  | "unresolved";

export interface FieldSourceEvidence {
  provenance: ValueProvenance;
  sourceId?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  sourceStatus?: SourceStatus;
  verificationLevel?: VerificationLevel;
  calculationNote?: string;
  note?: string;
}

export type FieldEvidenceMap<FieldName extends string = string> = Partial<
  Record<FieldName, FieldSourceEvidence>
>;
```

Optional `fieldEvidence?: FieldEvidenceMap` containers are available on
`BrewMethod`, `BrewVariant`, `BrewRecipe`, and `BrewStep`.

The container is optional so existing placeholder methods and saved brew
snapshots remain valid without migration. The map is sparse so later runtime
PRs can add evidence only for fields changed within their reviewed scope.
`sourceId` may point to an evidence-pack source row. `calculationNote` records
the reviewed formula and inputs for `app_calculated` values.

PR-011D also adds pure helper functions for provenance labels and basic
category checks. No current UI consumes the helpers.

## 6. Runtime implementation rules

* Verified source-original values require field-level source evidence.
* App-calculated values require formula evidence in `calculationNote` and must
  be labeled `app_calculated`.
* Placeholder values must keep existing caution labels and placeholder flags.
* Unresolved and needs-review values must not be displayed as verified.
* One method may contain mixed provenance.
* Field-level provenance must be reviewable in future runtime PRs.
* Adding field evidence does not by itself weaken `sourceStatus`,
  `verificationLevel`, `valuesArePlaceholder`, or `isPlaceholder`.

## 7. 4:6 Method application

A later reviewed 4:6 basic implementation could use this model to distinguish:

* `20g` / `300g` as source examples, not universal fixed values.
* Values derived for another user-entered dose as `app_calculated`.
* The `1:15` basic ratio as source-supported within its reviewed scope.
* R-02 through R-06 as unresolved until separately reviewed and approved.
* `3:30` as a dripper-removal action, not necessarily a guaranteed natural
  drawdown completion.

These examples describe future evidence mapping only. PR-011D does not add
them to runtime data.

## 8. Follow-up PR gate

A later PR may implement 4:6 runtime data only if:

* each changed field has provenance
* each changed field has a source note or app-calculation note
* unresolved variants remain placeholder
* UI caution labels remain for partial verification
* no official affiliation, approval, supervision, partnership, or endorsement
  claim is introduced

## 9. Out of scope

PR-011D makes:

* no runtime recipe data changes
* no method schedule changes
* no timer logic changes
* no storage migration
* no route changes
* no release docs changes
