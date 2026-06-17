# Grinder Dataset Schema Spec — Ver.2.0

## Purpose

This document defines the planned TypeScript data shape, validation policy, and UI display eligibility for the Pourō-GPT Grinder Equivalency Engine dataset.

It is a docs-only schema specification. It does not implement `src/data/grinders.ts`, conversion logic, UI, storage, export, or runtime behavior.

This spec follows:

- `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
- `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`

The central constraint is:

```text
Use nominal adjustment conversion / 公称調整幅ベースの参考換算 only.
Do not model actual particle size, particle distribution, fines, flow rate, extraction yield, or taste equivalency.
```

---

## Scope

This document defines:

- canonical grinder dataset file location
- TypeScript interfaces
- enum values
- source/evidence/confidence requirements
- display eligibility rules
- validation checklist
- forbidden fields and forbidden claims
- future migration path

---

## Non-goals

This document does not:

- add or change runtime code
- create grinder data records
- create conversion logic
- enable a Tools UI converter
- add Recipe Setup grinder selection
- add Settings grinder preference
- add grinder fields to History
- change CSV or JSON export schema
- change recipe data or timer schedules
- define Medium / Low / Experimental display behavior for the default UI

---

## Planned files

Future implementation PRs may introduce:

```text
src/data/grinders.ts
src/lib/grinderEquivalency.ts
```

They may modify:

```text
src/types/grinder.ts
src/data/index.ts
src/pages/ToolsPage.tsx
src/styles/index.css
```

They must not modify unless explicitly planned in separate PRs:

```text
src/data/placeholderMethods.ts
src/pages/RecipeSetupPage.tsx
src/pages/BrewTimerPage.tsx
src/pages/BrewFinishPage.tsx
src/pages/HistoryPage.tsx
src/pages/HistoryDetailPage.tsx
src/pages/SettingsPage.tsx
src/repositories/*
src/types/brew.ts
public/manifest.webmanifest
service worker
package.json
package-lock.json
docs/releases/*
```

---

## Naming principle

Use `nominalStepMicrons`, not `micronPerClick`.

Reason:

- `micronPerClick` can be misread as measured particle-size change.
- `nominalStepMicrons` means nominal mechanical adjustment width per step/click/mark.
- The dataset is a reference conversion table, not a particle-size measurement database.

Deprecated / avoid in new code:

```ts
micronPerClick
medianParticleSize
particleSizeMicrons
particleDistribution
finesAmount
flowRateEstimate
tdsEstimate
extractionYieldEstimate
tasteEquivalent
```

Preferred:

```ts
nominalStepMicrons
nominalStepUnit
sourceType
evidenceLevel
implementationConfidence
conversionEnabled
```

---

## Canonical enums

```ts
export type GrinderType = "manual" | "electric" | "unknown";

export type GrinderAdjustmentType =
  | "stepped"
  | "external_stepped"
  | "internal_stepped"
  | "numbered_stepped"
  | "grid"
  | "micro_adjustment"
  | "stepless"
  | "unknown";

export type GrinderStepUnit =
  | "click"
  | "number"
  | "mark"
  | "grid"
  | "step"
  | "micro_adjustment"
  | "unknown";

export type GrinderSourceType =
  | "manufacturer_official"
  | "manufacturer_manual"
  | "official_distributor"
  | "authorized_retailer"
  | "beeancoffee_public_reference"
  | "specialty_blog"
  | "forum_reference"
  | "reddit_reference"
  | "youtube_review"
  | "single_user_measurement"
  | "unsourced_chart"
  | "unknown";

export type GrinderEvidenceLevel =
  | "high"
  | "medium"
  | "low"
  | "very_low"
  | "needs_review";

export type GrinderImplementationConfidence =
  | "stable"
  | "cautious"
  | "experimental"
  | "do_not_use";

export type GrinderDisplayEligibility =
  | "default_allowed"
  | "research_only"
  | "experimental_only"
  | "do_not_use";
```

---

## Canonical interface

```ts
export interface GrinderSpec {
  id: string;
  maker: string;
  model: string;
  displayName: string;

  grinderType: GrinderType;
  adjustmentType: GrinderAdjustmentType;
  stepUnit: GrinderStepUnit;

  nominalStepMicrons: number | null;
  conversionEnabled: boolean;
  displayEligibility: GrinderDisplayEligibility;

  sourceType: GrinderSourceType;
  evidenceLevel: GrinderEvidenceLevel;
  implementationConfidence: GrinderImplementationConfidence;

  sourceUrl: string;
  sourceLabel: string;
  sourceSummary: string;
  accessedAt: string;
  lastReviewedAt: string;

  rangeMin?: number;
  rangeMax?: number;
  zeroPointNote?: string;
  notes: string;
}
```

---

## Field definitions

| Field | Required | Meaning | Validation |
| --- | --- | --- | --- |
| `id` | yes | Stable machine-readable identifier. | kebab-case, unique. |
| `maker` | yes | Maker/brand name. | Non-empty string. |
| `model` | yes | Model name. | Non-empty string. |
| `displayName` | yes | UI label. | Non-empty string; no official endorsement language. |
| `grinderType` | yes | Manual/electric/unknown. | Enum only. |
| `adjustmentType` | yes | Adjustment mechanism. | Enum only. |
| `stepUnit` | yes | Unit shown to user. | Enum only. |
| `nominalStepMicrons` | yes | Nominal adjustment width per step. | Positive finite number or null. |
| `conversionEnabled` | yes | Whether default conversion result can be computed. | Must be false unless all eligibility rules pass. |
| `displayEligibility` | yes | Default/research/experimental/do-not-use visibility. | Enum only. |
| `sourceType` | yes | Source class. | Enum only. |
| `evidenceLevel` | yes | Evidence quality. | Enum only. |
| `implementationConfidence` | yes | Implementation confidence label. | Enum only. |
| `sourceUrl` | yes | Citable public URL. | Required for any enabled record. |
| `sourceLabel` | yes | Human-readable source name. | Required for any enabled record. |
| `sourceSummary` | yes | What the source supports. | Required for any enabled record. |
| `accessedAt` | yes | Date source was checked. | ISO date string. |
| `lastReviewedAt` | yes | Dataset review date. | ISO date string. |
| `rangeMin` | no | Physical/display min setting. | Number if known. |
| `rangeMax` | no | Physical/display max setting. | Number if known and >= rangeMin. |
| `zeroPointNote` | no | Zero-point caveat. | Plain caution text only. |
| `notes` | yes | Implementation/research notes. | Plain text; no overclaims. |

---

## Default display eligibility rule

A grinder may be displayed as a default conversion target only if:

```ts
conversionEnabled === true
```

and all conditions below are true:

1. `displayEligibility === "default_allowed"`
2. `nominalStepMicrons` is a positive finite number.
3. `evidenceLevel === "high"`
4. `sourceType` is one of:
   - `manufacturer_official`
   - `manufacturer_manual`
   - `official_distributor`
   - `authorized_retailer`
   - `beeancoffee_public_reference`
5. `implementationConfidence` is `stable` or `cautious`.
6. `sourceUrl` is public and non-empty.
7. `sourceLabel` is non-empty.
8. `sourceSummary` is non-empty.
9. No field contains official endorsement or guaranteed-equivalence wording.

If any condition fails, the record must not produce a default UI conversion result.

---

## Ineligible records

The following records must be `conversionEnabled: false`:

- `evidenceLevel` is `medium`, `low`, `very_low`, or `needs_review`
- `sourceType` is `specialty_blog`, `forum_reference`, `reddit_reference`, `youtube_review`, `single_user_measurement`, `unsourced_chart`, or `unknown`
- `sourceUrl` is missing
- source requires login, paid access, private API, or internal database access
- `nominalStepMicrons` is null, zero, negative, infinite, or NaN
- adjustment is stepless and no discrete display step is defined
- physical setting does not map cleanly to the selected `stepUnit`
- source describes measured grounds rather than nominal mechanical step width

---

## Conversion function input/output planning

Future implementation may use:

```ts
export interface GrinderConversionInput {
  referenceGrinderId: string;
  targetGrinderId: string;
  referenceSteps: number;
}

export interface GrinderConversionResult {
  referenceGrinder: GrinderSpec;
  referenceSteps: number;
  referenceMicrons: number;

  targetGrinder: GrinderSpec;
  rawEquivalentSteps: number;
  roundedEquivalentSteps: number;
  equivalentNominalMicrons: number;

  deviationMicrons: number;
  deviationPercent: number;

  sourceType: GrinderSourceType;
  evidenceLevel: GrinderEvidenceLevel;
  confidence: GrinderImplementationConfidence;
  warning: string;
}
```

Formula:

```text
targetMicrons = referenceSteps * referenceMicronsPerStep
rawEquivalentSteps = targetMicrons / targetMicronsPerStep
roundedEquivalentSteps = Math.round(rawEquivalentSteps)
equivalentNominalMicrons = roundedEquivalentSteps * targetMicronsPerStep
deviationMicrons = equivalentNominalMicrons - targetMicrons
deviationPercent = deviationMicrons / targetMicrons * 100
```

The naming `targetMicrons` in the formula means target nominal adjustment distance, not particle size.

---

## Error model planning

Future implementation may use:

```ts
export type GrinderConversionErrorCode =
  | "reference_grinder_not_found"
  | "target_grinder_not_found"
  | "reference_not_conversion_enabled"
  | "target_not_conversion_enabled"
  | "missing_reference_step_microns"
  | "missing_target_step_microns"
  | "invalid_reference_steps"
  | "unsupported_source_evidence"
  | "unsupported_adjustment_type";

export interface GrinderConversionError {
  code: GrinderConversionErrorCode;
  message: string;
}
```

Error messages must be user-safe and avoid technical overclaims.

Examples:

```text
このグラインダーは参考換算に未対応です。
基準クリック数を入力してください。
この値は公称調整幅ベースの参考換算に使用できません。
```

---

## Required UI metadata

Any default conversion UI must render:

- 参考換算
- 公称調整幅ベース
- Nominal setting
- Source
- Confidence

Required caution copy:

```text
この換算は、メーカー公称値、Beean Coffee等の外部リファレンス、フォーラム・ブログ等に記載された調整幅をもとにした参考値です。実際の粒径、粒度分布、微粉量、流速、抽出結果、味を保証するものではありません。
```

If only High evidence records are shown, the caution copy may still mention forums/blogs because the broader research framework includes them, but the UI must not expose Medium/Low/Experimental records in default mode.

---

## Display precision policy

| Value | Display rule |
| --- | --- |
| referenceSteps | integer unless grinder supports non-integer setting. |
| roundedEquivalentSteps | integer unless target supports non-integer setting. |
| rawEquivalentSteps | do not expose by default. |
| referenceMicrons | show as Nominal setting, not particle size. |
| equivalentNominalMicrons | show as Nominal setting, not particle size. |
| deviationMicrons | optional; label as nominal deviation only. |
| deviationPercent | optional; label as nominal deviation only. |

Recommended formatting:

```text
28 clicks
Nominal setting: 0.840 mm
Difference: -0.003 mm
```

Do not display:

```text
Particle size: 840 μm
Same grind as C40
Exact equivalent
```

---

## Validation checklist for future dataset PR

A future implementation PR adding actual grinder records must verify:

- [ ] Each `id` is unique.
- [ ] Each enabled record has `nominalStepMicrons > 0`.
- [ ] No enabled record has Medium / Low / Very Low / Needs Review evidence.
- [ ] No enabled record uses forum/reddit/blog/video/single-user/unsourced/unknown source types.
- [ ] Every enabled record has public `sourceUrl`.
- [ ] Every enabled record has `sourceLabel` and `sourceSummary`.
- [ ] No enabled source uses login-only, paid, private, or internal data.
- [ ] No record uses Beean Pro/internal/private API data.
- [ ] No field claims official endorsement unless it is literally a manufacturer source.
- [ ] No field claims particle-size, flow, TDS, extraction yield, or taste equivalence.
- [ ] `rangeMax >= rangeMin` when both are present.
- [ ] Stepless/unknown records are not conversion-enabled by default.

---

## Dataset seed size policy

The first implementation PR should not attempt a large grinder database.

Recommended first seed:

```text
3–6 high-evidence records only
```

Preferred candidates:

- Comandante C40 Standard
- Comandante Red Clix
- TIMEMORE model with official step width
- KINGrinder model with official step width
- Pietro model with official step width

A broad 20–50 model dataset must wait until source records are reviewed.

---

## Future migration path

Recommended sequence:

1. Source index policy — completed by `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`
2. Dataset schema spec — this document
3. Small High-evidence dataset seed
4. Nominal conversion helper
5. Tools-page reference conversion UI
6. Settings saved grinder preference, separate PR
7. Recipe Setup optional reference display, separate PR
8. History/CSV/JSON schema extension, separate PR
9. Experimental source mode, Ver.3 or later

---

## Guardrails for implementers

Do not combine dataset implementation with:

- Recipe Setup redesign
- Timer change
- History schema change
- CSV/JSON schema change
- Settings saved preference
- PWA/service worker changes
- package/dependency changes
- Medium/Low/Experimental values
- Beean Pro/internal/private data usage

---

## Document control

- Author: ChatGPT + GitHub interim workflow
- Created: 2026-06-17
- Status: Docs-only schema specification
- Related docs:
  - `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
  - `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`
- Next candidate PR: Small High-evidence dataset seed or Tools-only implementation prompt
