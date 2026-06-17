# Grinder Tools Implementation Prompt — Ver.2.0

## Purpose

This document is a paste-ready implementation prompt for Codex or another implementation agent after the current Codex usage limit is lifted.

It is a docs-only handoff document. It does not implement code, add data, change UI, or alter runtime behavior.

The implementation target is a **Tools-only Grinder Equivalency Engine foundation** using nominal adjustment conversion / 公称調整幅ベースの参考換算 only.

---

## Target repository

```text
NS-del346/Pouro-GPT
```

Target app:

```text
Pourō-GPT / Pourō
```

Recommended implementation branch:

```text
codex/pr-v2-06-tools-grinder-equivalency-foundation
```

Recommended PR title:

```text
PR-V2-06: Tools Grinder Equivalency Foundation
```

---

## Required source documents

Before implementing, read:

```text
docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md
docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md
docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md
docs/v2/GRINDER_EQUIVALENCY_UI_IA_SPEC.md
```

Treat these as the source of truth.

If there is conflict, prefer this order:

1. `GRINDER_CALIBRATION_SOURCE_INDEX.md`
2. `GRINDER_DATASET_SCHEMA_SPEC.md`
3. `GRINDER_EQUIVALENCY_UI_IA_SPEC.md`
4. `GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`

Reason: the original planning doc may contain older `micronPerClick` wording, while the later docs clarify that the feature is nominal adjustment conversion only.

---

## Goal

Implement a small Tools-page grinder reference converter that:

- uses High-evidence-only grinder records
- calculates nominal adjustment equivalency
- shows rounded reference output
- displays Source, Confidence, Evidence, and Nominal setting
- displays required caution copy
- keeps all Recipe Setup, Timer, History, Settings, export, storage, PWA, and release behavior unchanged

---

## Scope

Allowed implementation scope:

```text
src/types/grinder.ts
src/data/grinders.ts
src/data/index.ts
src/lib/grinderEquivalency.ts
src/pages/ToolsPage.tsx
src/styles/index.css
docs/qa/PR-V2-06-tools-grinder-equivalency-foundation.md
```

Use the current app structure and existing Tools page as the integration point.

---

## Out of scope

Do not change:

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

Do not add:

```text
Settings saved grinder preference
Recipe Setup grinder hint
History grinder fields
CSV export schema changes
JSON backup schema changes
Medium / Low / Experimental source display
Beean Pro/private/login-only data
large grinder database
AI diagnosis
Bluetooth scale
cloud sync
account/login
```

---

## Critical terminology

Use:

```text
参考換算
公称調整幅ベース
Nominal setting
Source
Confidence
Evidence
```

Do not use:

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
same particle size
same grind distribution
same extraction
same taste
manufacturer-approved
official recommendation
exact equivalent
```

---

## Required caution copy

The UI must show this text near the result:

```text
この換算は、メーカー公称値、Beean Coffee等の外部リファレンス、フォーラム・ブログ等に記載された調整幅をもとにした参考値です。実際の粒径、粒度分布、微粉量、流速、抽出結果、味を保証するものではありません。
```

Optional secondary note:

```text
豆、焙煎度、グラインダー個体差、ゼロ点、器具差により調整してください。
```

---

## Data model requirements

Implement or adapt `src/types/grinder.ts` to include the following concepts.

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

If existing `GrinderPreset` is already used, keep backward compatibility by aliasing or carefully migrating.

Do not introduce `micronPerClick` as the canonical field.

---

## Dataset seed requirements

Create `src/data/grinders.ts` with a very small initial dataset.

Recommended seed size:

```text
3–6 records maximum
```

Allowed records must satisfy:

- `conversionEnabled: true`
- `displayEligibility: "default_allowed"`
- `evidenceLevel: "high"`
- public `sourceUrl`
- `sourceLabel`
- `sourceSummary`
- `nominalStepMicrons > 0`
- no private/login-only/paid/internal source

Do not add Medium / Low / Experimental records to the default exported list.

If adding research-only records for future reference, do not expose them through the default UI list.

---

## Source policy

Allowed default source types:

```ts
"manufacturer_official"
"manufacturer_manual"
"official_distributor"
"authorized_retailer"
"beeancoffee_public_reference"
```

Forbidden for default UI:

```ts
"specialty_blog"
"forum_reference"
"reddit_reference"
"youtube_review"
"single_user_measurement"
"unsourced_chart"
"unknown"
```

Forbidden data sources:

```text
Beean Pro internal database
login-only Beean pages
private API responses
paid/internal data
scraped internal data
hidden app state
```

---

## Conversion helper requirements

Create `src/lib/grinderEquivalency.ts`.

Suggested public function:

```ts
export function calculateNominalGrinderEquivalency(
  input: GrinderConversionInput,
  grinders: readonly GrinderSpec[],
): GrinderConversionResult | GrinderConversionError;
```

Use this formula:

```text
targetMicrons = referenceSteps * referenceMicronsPerStep
rawEquivalentSteps = targetMicrons / targetMicronsPerStep
roundedEquivalentSteps = Math.round(rawEquivalentSteps)
equivalentNominalMicrons = roundedEquivalentSteps * targetMicronsPerStep
deviationMicrons = equivalentNominalMicrons - targetMicrons
deviationPercent = deviationMicrons / targetMicrons * 100
```

Clarification:

```text
targetMicrons means nominal adjustment distance, not particle size.
```

Error handling must cover:

- missing reference grinder
- missing target grinder
- unsupported reference grinder
- unsupported target grinder
- missing nominal step value
- invalid reference step value
- unsupported evidence/source
- unsupported adjustment type

---

## Tools UI requirements

Update only the Tools / Click Converter area.

Recommended sections:

1. Feature header
2. Reference grinder input
3. Target grinder input
4. Result panel
5. Source / Confidence metadata
6. Caution block
7. Unsupported/future note

Required visible labels:

```text
クリック換算
参考換算
公称調整幅ベース
基準グラインダー
基準クリック数
使用グラインダー
参考換算結果
Nominal setting
Source
Confidence
Evidence
```

The result panel should show:

- rounded equivalent steps
- reference nominal setting
- target nominal setting
- optional nominal deviation
- Source
- Confidence
- Evidence

Do not show raw fractional result by default.

Do not show particle size.

---

## Empty / invalid / unsupported states

Blank input:

```text
基準クリック数を入力してください。
```

Unsupported grinder:

```text
このグラインダーは参考換算に未対応です。
```

No eligible records:

```text
表示できるHigh Evidenceのグラインダーデータがまだありません。
```

Unpublished low-confidence value:

```text
この値は確認中のため、標準表示には使用していません。
```

---

## Display precision policy

Allowed:

```text
28 clicks
56 clicks
Nominal setting: 0.840 mm
Difference: -0.003 mm
```

Do not show by default:

```text
56.193548 clicks
Particle size: 840 μm
Same grind as C40
Exact equivalent
```

Deviation must be labeled as nominal deviation, not particle-size error.

---

## Styling requirements

Use existing v2 visual language:

- Light Precision Cockpit
- compact technical cards
- high readability
- tabular numeric styling
- amber only for status/accent/action
- subtle borders
- mobile-first layout

Do not introduce a new visual system.

---

## QA document requirement

Create:

```text
docs/qa/PR-V2-06-tools-grinder-equivalency-foundation.md
```

Include:

1. Purpose
2. Changed files
3. Source docs reviewed
4. Scope / Out of scope
5. Dataset seed summary
6. Source/evidence validation
7. Conversion helper validation
8. Tools UI QA
9. Viewport QA
10. Flow regression QA
11. Storage/export regression QA
12. Recipe/timer regression QA
13. Source/legal wording check
14. Commands and results
15. Known limitations
16. Judgment

---

## Required commands

Run:

```bash
npm.cmd run build
git diff --check
git diff --name-only
git diff --stat
git status --short --branch
```

If lint script exists, run:

```bash
npm.cmd run lint
```

If lint script does not exist, report:

```text
npm.cmd run lint: NOT RUN, lint script not available
```

Do not add a lint script.

---

## Unit-level validation examples

If C40 uses 30 μm nominal step and target uses 15 μm nominal step:

```text
referenceSteps: 28
referenceNominalMicrons: 840
rawEquivalentSteps: 56
roundedEquivalentSteps: 56
equivalentNominalMicrons: 840
deviationMicrons: 0
deviationPercent: 0
```

Also verify non-integer cases:

```text
rawEquivalentSteps is rounded with Math.round
nominal deviation is calculated after rounding
```

Invalid cases:

- zero steps
- negative steps
- NaN
- missing grinder
- unsupported grinder
- missing nominalStepMicrons
- medium/low evidence
- unsupported source type

---

## UI QA

Verify at:

```text
375x667
390x844
430x932 if practical
```

Check:

- Tools page loads
- no horizontal overflow
- bottom nav does not cover controls
- selects are readable
- input is reachable
- result is readable
- caution copy is readable
- Source / Confidence / Evidence visible
- unsupported states are understandable
- no particle-size/taste/extraction guarantee appears

---

## Flow regression QA

Verify:

- Brew Home -> Recipe Setup -> Timer -> Finish -> Save -> History Detail
- History Detail -> Rebrew -> Recipe Setup
- Setup -> Timer -> Finish -> Discard
- Settings CSV export app-side status
- Settings JSON backup app-side status

Verify unchanged:

- 4:6 R-01 center/basic only
- 4:6 R-02 legacy selector only
- 10 Pour 20g / 300g / 1:15
- 10 Pour 1:45 / 210g
- localStorage key
- saved session schema
- CSV export format
- JSON backup format

---

## PR body requirement

The implementation PR body must state:

```text
This PR implements a Tools-only nominal adjustment reference converter.
It does not claim particle-size, flow, extraction, TDS, or taste equivalence.
It does not use Beean Pro, login-only, private API, or paid/internal data.
```

It must list all changed files and explicitly state that Recipe Setup, Timer, History schema, Settings storage, CSV/JSON export, PWA, package, and release metadata were not changed.

---

## Independent verifier prompt

Verifier should check:

1. Only allowed implementation files changed.
2. No Recipe Setup / Timer / History / Settings behavior changed.
3. No CSV/JSON schema changed.
4. No PWA/package/release files changed.
5. Dataset seed has only High evidence default-enabled records.
6. No Medium / Low / Experimental values are exposed in default UI.
7. Beean Pro/private/login-only/paid data is not used.
8. `nominalStepMicrons` is used, not `micronPerClick` as canonical field.
9. Conversion helper uses nominal adjustment math only.
10. UI includes 参考換算, 公称調整幅ベース, Nominal setting, Source, Confidence.
11. Required caution copy is present.
12. No particle-size/taste/official-endorsement claim appears.
13. Build passes.
14. Mobile QA passes.
15. Flow regression passes.

---

## Final report format

Implementation agent must report:

```text
1. PR URL:
2. Branch:
3. Final commit hash:
4. Changed files:
5. Source docs reviewed:
6. Dataset records added:
7. Default-enabled records:
8. Medium/Low/Experimental exposed: yes/no
9. Beean Pro/private/login-only/paid data used: yes/no
10. Conversion helper summary:
11. Tools UI summary:
12. Required warning present: yes/no
13. Source/Confidence/Nominal setting present: yes/no
14. Recipe Setup changed: yes/no
15. Timer changed: yes/no
16. History schema changed: yes/no
17. Settings storage changed: yes/no
18. CSV/JSON format changed: yes/no
19. PWA/package/release files changed: yes/no
20. 375x667 QA:
21. 390x844 QA:
22. 430x932 QA:
23. Flow regression:
24. npm.cmd run build:
25. npm.cmd run lint:
26. git diff --check:
27. QA judgment:
28. Safe for independent verification: yes/no
29. Safe to merge after external verification: yes/no
```

---

## Document control

- Author: ChatGPT + GitHub interim workflow
- Created: 2026-06-17
- Status: Docs-only implementation handoff prompt
- Related docs:
  - `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
  - `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`
  - `docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md`
  - `docs/v2/GRINDER_EQUIVALENCY_UI_IA_SPEC.md`
