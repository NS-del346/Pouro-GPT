# Grinder Equivalency UI IA Spec — Ver.2.0

## Purpose

This document defines the information architecture and UI copy policy for the Pourō-GPT Grinder Equivalency Engine before any runtime implementation.

It is a docs-only specification. It does not add UI, source code, grinder data, conversion logic, storage, export fields, or runtime behavior.

This spec follows:

- `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
- `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`
- `docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md`

Core principle:

```text
The UI may show nominal adjustment conversion / 公称調整幅ベースの参考換算 only.
It must not imply particle-size, flow-rate, extraction-yield, or taste equivalence.
```

---

## Scope

This document defines:

- recommended screen placement
- phased UI rollout
- Tools-page first implementation IA
- future Recipe Setup IA
- future Settings IA
- future History/export IA
- required labels and warning copy
- confidence/source display rules
- fallback and empty states
- accessibility and mobile layout requirements
- prohibited claims

---

## Non-goals

This document does not:

- implement the UI
- add `src/data/grinders.ts`
- add conversion logic
- change Recipe Setup
- change Timer
- change History schema
- change Settings behavior
- change CSV or JSON backup format
- add grinder preference storage
- add Medium / Low / Experimental display mode
- add Beean Pro or private data

---

## Product role

The Grinder Equivalency Engine is a support tool for reducing setup uncertainty.

It should answer:

```text
If I know a reference grinder setting, what is the closest nominal adjustment setting on another supported grinder?
```

It must not answer:

```text
What setting gives exactly the same grind size?
What setting gives the same flow rate or taste?
What setting is officially recommended by the maker?
```

---

## Rollout phases

### Phase 1 — Tools-only reference converter

Recommended first implementation.

Screen:

```text
Tools / Click Converter
```

Purpose:

- allow users to compare two supported High-evidence grinders
- show nominal setting math and source confidence
- keep the feature isolated from brewing flow
- avoid changing Recipe Setup, History, Settings, CSV, or JSON schema

### Phase 2 — Settings grinder preference

Separate PR only.

Screen:

```text
Settings / Data
```

Purpose:

- allow user to choose a default owned grinder
- store preference separately from brew history
- keep export/schema impact explicit

### Phase 3 — Recipe Setup reference hint

Separate PR only.

Screen:

```text
Recipe Setup
```

Purpose:

- show optional reference hint next to generic grind descriptor
- do not auto-apply setting
- do not replace recipe truth

### Phase 4 — History grinder fields

Separate PR only.

Screen:

```text
Brew Finish / History / History Detail / Export
```

Purpose:

- save grinder model and click setting in brew records
- requires schema/export migration review

### Phase 5 — Experimental sources

Ver.3 or explicit opt-in detailed mode only.

Purpose:

- expose Medium / Low / Experimental references with stronger warnings
- never show experimental values in default Ver.2 UI

---

## Phase 1 IA: Tools / Click Converter

### Entry point

Bottom tab:

```text
ツール
```

Primary card title:

```text
クリック換算
```

Primary badge:

```text
参考換算
```

Subheading:

```text
公称調整幅ベースで、対応グラインダー間の目安を計算します。
```

### Card hierarchy

Recommended sections:

1. Feature header
2. Reference grinder input
3. Target grinder input
4. Result panel
5. Source / confidence metadata
6. Caution block
7. Unsupported / future note

---

## Phase 1 UI structure

### 1. Feature header

Required visible text:

```text
参考換算
公称調整幅ベース
```

Suggested copy:

```text
グラインダーの公称調整幅を使い、基準設定から近い目安を表示します。
```

Do not say:

```text
正確な粒度換算
完全換算
同じ味になります
```

### 2. Reference grinder input

Labels:

```text
基準グラインダー
基準クリック数
Nominal setting
```

Fields:

- reference grinder select
- reference step/click numeric input
- reference nominal setting display

Reference nominal setting should be computed as:

```text
referenceSteps * referenceGrinder.nominalStepMicrons
```

Display example:

```text
Nominal setting: 0.840 mm
```

The label must not be:

```text
Particle size
粒径
```

### 3. Target grinder input

Labels:

```text
使用グラインダー
換算結果
Nominal setting
```

Fields:

- target grinder select
- rounded equivalent step result
- target nominal setting display
- optional nominal deviation

Display example:

```text
56 clicks
Nominal setting: 0.840 mm
Difference: ±0.000 mm
```

### 4. Result panel

Required title:

```text
参考換算結果
```

Required metadata:

```text
Source
Confidence
```

Recommended result copy:

```text
C40 Standard 28 clicks に対する参考換算です。
```

Do not use:

```text
同等の粒度です
同じ抽出になります
公式推奨値です
```

### 5. Source / Confidence panel

Required labels:

```text
Source
Confidence
Evidence
```

Source display should show:

- source label
- source type
- evidence level
- accessed/review date if available

Example:

```text
Source: Beean Coffee public reference
Evidence: High
Confidence: Cautious
```

If source is official manufacturer/manual:

```text
Source: Manufacturer manual
Evidence: High
Confidence: Stable
```

Still do not imply endorsement.

### 6. Caution block

Required caution text:

```text
この換算は、メーカー公称値、Beean Coffee等の外部リファレンス、フォーラム・ブログ等に記載された調整幅をもとにした参考値です。実際の粒径、粒度分布、微粉量、流速、抽出結果、味を保証するものではありません。
```

Optional shorter secondary note:

```text
豆、焙煎度、グラインダー個体差、ゼロ点、器具差により調整してください。
```

### 7. Unsupported note

For unsupported grinders:

```text
このグラインダーは参考換算に未対応です。
```

For low-confidence sources:

```text
この値は確認中のため、標準表示には使用していません。
```

For blank input:

```text
基準クリック数を入力してください。
```

---

## Selection behavior

Default Ver.2 UI must list only default-eligible grinders.

Eligible conditions are defined in `GRINDER_DATASET_SCHEMA_SPEC.md`:

- `conversionEnabled === true`
- `displayEligibility === "default_allowed"`
- `evidenceLevel === "high"`
- public source URL
- source summary present
- no official endorsement wording
- no particle-size/taste equivalence wording

Do not list Medium / Low / Experimental records in default select menus.

If no eligible records exist:

```text
表示できるHigh Evidenceのグラインダーデータがまだありません。
```

---

## Phase 2 IA: Settings grinder preference

This is future-only and must be a separate PR.

Potential placement:

```text
Settings / Data > 抽出補助設定 > 所有グラインダー
```

Purpose:

- save preferred grinder locally
- optionally preselect it in Tools / Click Converter
- later optionally preselect in Recipe Setup

Storage warning:

```text
この設定はこの端末内に保存されます。ブラウザのデータ削除や端末変更で失われる場合があります。
```

Do not include in first Tools-only implementation because it may introduce localStorage and export policy questions.

---

## Phase 3 IA: Recipe Setup reference hint

This is future-only and must be a separate PR.

Recommended placement:

- near grind descriptor
- collapsed/secondary hint, not primary instruction
- shown only if user has selected a supported grinder or manually opens grinder reference

Suggested copy:

```text
参考換算: C40 Standard 28 clicks相当
公称調整幅ベース
```

Critical rules:

- do not replace recipe grind descriptor
- do not auto-adjust recipe values
- do not show unsupported grinder guesses
- do not change timer schedule
- do not change recipe truth

Recipe Setup remains a method/recipe configuration screen, not a grinder calibration lab.

---

## Phase 4 IA: History / Export grinder fields

This is future-only and must be a separate PR because it changes saved session schema and export formats.

Potential saved fields:

```ts
grinderId?: string;
grinderDisplayName?: string;
grinderSteps?: number;
grinderReferenceMode?: "manual_entry" | "nominal_conversion";
grinderSourceConfidence?: string;
```

Do not add these fields in Tools-only implementation.

If added later, update:

- storage schema docs
- CSV export headers
- JSON backup schemaVersion
- History list/detail UI
- Rebrew behavior
- migration notes

---

## Result display rules

### Allowed result precision

Use integer step/click values by default.

Examples:

```text
28 clicks
56 clicks
Nominal setting: 0.840 mm
Difference: -0.003 mm
```

### Avoid raw precision

Do not show raw fractional result by default:

```text
56.193548 clicks
```

If ever shown in an advanced/debug context, label it as raw nominal calculation and not as final recommended setting.

### Deviation display

Deviation may be shown only as nominal deviation:

```text
Nominal difference: -3 μm / -0.4%
```

Do not label it as particle-size error.

---

## Visual hierarchy

Use the Ver.2 Light Precision Cockpit language:

- compact technical cards
- high readability
- tabular numeric treatment
- amber only for action/status/accent
- subtle borders
- mobile-first spacing

Suggested hierarchy:

```text
Feature title > selected grinders > result > source/confidence > caution
```

The result should not overpower the caution/source metadata.

---

## Accessibility requirements

For future implementation:

- every select/input has a visible label
- warning/caution text is normal text, not image-only
- numeric result is readable at 375px width
- source/confidence labels are text, not color-only
- disabled or unsupported states explain why
- no horizontal overflow at 375x667 and 390x844
- input controls remain reachable above bottom navigation

---

## Mobile layout requirements

Required viewport checks for future implementation:

- 375x667
- 390x844
- 430x932 if practical

Check:

- no horizontal overflow
- select menus readable
- numeric input readable
- result card readable
- caution block readable
- bottom tab does not cover input/result actions

---

## Required UI labels summary

Any implementation that displays conversion must include:

```text
参考換算
公称調整幅ベース
Nominal setting
Source
Confidence
```

Preferred Japanese labels:

```text
基準グラインダー
基準クリック数
使用グラインダー
参考換算結果
注意
```

---

## Prohibited UI claims

Do not display:

```text
正確な粒度換算
完全換算
同一粒径
同一抽出
Comandante完全互換
公式推奨
メーカー公認
同じ味になる
同じ流速になる
同じTDSになる
```

Do not display:

```text
same particle size
same grind distribution
same extraction
same taste
manufacturer-approved
official recommendation
exact equivalent
```

---

## QA checklist for future implementation

A future Tools implementation PR must verify:

- Tools page loads
- reference grinder select lists only default-eligible records
- target grinder select lists only default-eligible records
- reference step input rejects empty/invalid values safely
- result shows rounded equivalent step
- result labels Nominal setting correctly
- Source is visible
- Confidence is visible
- caution copy is visible
- Medium / Low / Experimental records are not visible
- no particle-size/taste/extraction guarantee wording
- no manufacturer endorsement wording
- no localStorage schema change unless explicitly planned
- no CSV/JSON export change unless explicitly planned
- Brew flow still works
- Rebrew still works
- 4:6 matrix behavior unchanged
- 10 Pour 1:45 / 210g unchanged

---

## Future implementation order

Recommended next steps after this docs-only IA spec:

1. Small High-evidence dataset seed planning or implementation prompt
2. Nominal conversion helper implementation
3. Tools-page reference converter UI
4. QA doc for Tools implementation
5. Settings preference in separate PR
6. Recipe Setup optional hint in separate PR
7. History/export schema extension in separate PR

---

## Document control

- Author: ChatGPT + GitHub interim workflow
- Created: 2026-06-17
- Status: Docs-only UI IA specification
- Related docs:
  - `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
  - `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`
  - `docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md`
- Next candidate PR: Small High-evidence dataset seed plan or Codex implementation prompt
