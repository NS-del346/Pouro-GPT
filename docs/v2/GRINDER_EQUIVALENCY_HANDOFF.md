# Grinder Equivalency Engine Handoff — Ver.2.0

## Purpose

This handoff closes the current ChatGPT + GitHub interim docs-only preparation sequence for the Pourō-GPT Grinder Equivalency Engine.

It records what has been merged, what is now stable as planning/spec, what must not be changed, and what should be handed to Codex or another implementation agent when full implementation work resumes.

This document does not implement runtime behavior, UI, data, conversion logic, storage, export, PWA behavior, or release metadata.

---

## Target project

```text
Repository: NS-del346/Pouro-GPT
App: Pourō-GPT / Pourō
Public URL: https://ns-del346.github.io/Pouro-GPT/
```

This handoff applies only to Pourō-GPT. It does not apply to Pouro-Fable5 or Pourō-Claude.

---

## Current status

The Grinder Equivalency Engine is now ready for a future Tools-only implementation PR, but implementation is intentionally not included in the current docs-only sequence.

Current status:

```text
planning/spec/docs: prepared
runtime implementation: not started in this sequence
recommended next implementation: Tools-only grinder equivalency foundation
```

---

## Completed docs-only PR sequence

### PR #91 — PR-V2-01: Grinder Equivalency Engine Planning

```text
Branch: codex/pr-v2-01-grinder-equivalency-engine
Head commit: 3e020f84a1ebf16c8f109e744fbd76d89439876c
Squash merge commit: 2d18733777e9137609a815c6f34423d39b44c0fe
Changed file: docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md
Scope: docs-only
```

Purpose:

- introduced initial Grinder Equivalency Engine planning
- defined purpose, expected data model, source confidence policy, approximation policy, UI precision guardrails, non-goals, implementation cautions, and future PR candidates

Note:

- this early planning document may contain older `micronPerClick` wording
- later documents clarify that the canonical model is nominal adjustment conversion / 公称調整幅ベース

### PR #92 — PR-V2-02: Grinder Calibration Source Index

```text
Branch: codex/pr-v2-02-grinder-calibration-source-index
Head commit: ea46d93bc6e9bce7e53b7343c2023d6846a8efb7
Squash merge commit: cee58187c3b23d147e475861f0db69ee84d2ec51
Changed file: docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md
Scope: docs-only
```

Purpose:

- fixed source classification before implementation
- defined source type taxonomy, evidence level matrix, Ver.2 initial display eligibility, Beean public-only policy, citation policy, units policy, community source handling, false precision prevention, required UI wording, and prohibited claims

### PR #93 — PR-V2-03: Grinder Dataset Schema Spec

```text
Branch: codex/pr-v2-03-grinder-dataset-schema-spec
Head commit: 6e5becb82b3c44abf96fd2cfc4cb591ce380672f
Squash merge commit: 86695b67eeab51a7eadd4fb0817bfbb9aae4f643
Changed file: docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md
Scope: docs-only
```

Purpose:

- defined the planned TypeScript dataset schema before implementation
- established `nominalStepMicrons` as canonical terminology
- defined enums, `GrinderSpec`, display eligibility, ineligible record rules, conversion input/output planning, error model planning, required UI metadata, display precision policy, validation checklist, seed-size policy, and future migration path

### PR #94 — PR-V2-04: Grinder Equivalency UI IA Spec

```text
Branch: codex/pr-v2-04-grinder-ui-ia-spec
Head commit: 587d7919daa2737f28decc6b1d10b0b9af5b55e3
Squash merge commit: ee1287728445b25b6d9cf9e7ee98654a64b07715
Changed file: docs/v2/GRINDER_EQUIVALENCY_UI_IA_SPEC.md
Scope: docs-only
```

Purpose:

- defined the UI information architecture before implementation
- fixed rollout phases, Tools-first implementation, future Settings / Recipe Setup / History boundaries, result display rules, source/confidence display, caution copy, mobile requirements, accessibility requirements, and future implementation QA checklist

### PR #95 — PR-V2-05: Grinder Tools Implementation Prompt

```text
Branch: codex/pr-v2-05-grinder-tools-implementation-prompt
Head commit: ab3ed7b3d347e05826485dfa028adf54b5a52971
Squash merge commit: 51cf2fc577aa190775146e3fa243c8bfa4e624ab
Changed file: docs/v2/GRINDER_TOOLS_IMPLEMENTATION_PROMPT.md
Scope: docs-only
```

Purpose:

- created a paste-ready implementation prompt for Codex or another implementation agent
- fixed the future implementation scope to Tools / Click Converter only
- included required source docs, data model requirements, dataset seed requirements, conversion helper requirements, Tools UI requirements, QA document requirements, required commands, unit validation examples, UI QA, flow regression, PR body requirements, independent verifier prompt, and final report format

---

## Current main after grinder docs sequence

After PR #95, the expected `main` commit is:

```text
51cf2fc577aa190775146e3fa243c8bfa4e624ab
```

This handoff PR should be based on that commit unless main has advanced.

---

## Canonical source documents

Future implementation work must read these in this order:

```text
1. docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md
2. docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md
3. docs/v2/GRINDER_EQUIVALENCY_UI_IA_SPEC.md
4. docs/v2/GRINDER_TOOLS_IMPLEMENTATION_PROMPT.md
5. docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md
```

If documents conflict, prefer the later narrowing documents over the initial planning document.

Reason:

- the initial planning document introduced the feature direction
- the later source/schema/UI/prompt documents corrected vocabulary and constrained the implementation to nominal adjustment conversion only

---

## Canonical terminology

Use:

```text
nominal adjustment conversion
公称調整幅ベースの参考換算
reference conversion
参考換算
Nominal setting
Source
Confidence
Evidence
```

Canonical field:

```text
nominalStepMicrons
```

Avoid canonical use of:

```text
micronPerClick
particleSizeMicrons
medianParticleSize
particleDistribution
finesAmount
flowRateEstimate
tdsEstimate
extractionYieldEstimate
tasteEquivalent
```

`micronPerClick` may exist in legacy planning text, but future implementation should use `nominalStepMicrons` to avoid implying particle-size measurement.

---

## Non-negotiable product constraints

The Grinder Equivalency Engine must not claim or imply:

```text
exact particle size
equivalent particle distribution
equivalent fines amount
equivalent flow rate
equivalent extraction yield
equivalent TDS
equivalent taste
manufacturer approval
official recommendation
full Comandante equivalency
guaranteed setting
```

Japanese prohibited wording:

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

---

## Evidence and source policy

Default Ver.2 UI may expose only records satisfying all of:

```text
conversionEnabled === true
displayEligibility === default_allowed
evidenceLevel === high
nominalStepMicrons is a positive finite number
sourceUrl is public
sourceLabel is present
sourceSummary is present
```

Allowed default source types:

```text
manufacturer_official
manufacturer_manual
official_distributor
authorized_retailer
beeancoffee_public_reference
```

Not default-eligible:

```text
specialty_blog
forum_reference
reddit_reference
youtube_review
single_user_measurement
unsourced_chart
unknown
```

Forbidden sources:

```text
Beean Pro internal database
login-only pages
private API responses
paid/internal data
scraped internal data
hidden app state
```

Beean Coffee may only be cited as a public external reference when visible without login/private/paid access.

---

## Required UI text

Any implementation that displays grinder conversion must include:

```text
参考換算
公称調整幅ベース
Nominal setting
Source
Confidence
```

Recommended additional label:

```text
Evidence
```

Required caution copy:

```text
この換算は、メーカー公称値、Beean Coffee等の外部リファレンス、フォーラム・ブログ等に記載された調整幅をもとにした参考値です。実際の粒径、粒度分布、微粉量、流速、抽出結果、味を保証するものではありません。
```

Optional secondary note:

```text
豆、焙煎度、グラインダー個体差、ゼロ点、器具差により調整してください。
```

---

## Recommended next implementation PR

Recommended future implementation PR:

```text
PR-V2-06: Tools Grinder Equivalency Foundation
Branch: codex/pr-v2-06-tools-grinder-equivalency-foundation
```

Allowed files for future implementation:

```text
src/types/grinder.ts
src/data/grinders.ts
src/data/index.ts
src/lib/grinderEquivalency.ts
src/pages/ToolsPage.tsx
src/styles/index.css
docs/qa/PR-V2-06-tools-grinder-equivalency-foundation.md
```

Implementation should use `docs/v2/GRINDER_TOOLS_IMPLEMENTATION_PROMPT.md` as the starting prompt.

---

## Do not include in next implementation PR

The first runtime implementation must not include:

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

Do not modify:

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

## Minimum dataset seed policy

The first implementation should not attempt a large grinder database.

Recommended seed size:

```text
3–6 high-evidence records maximum
```

Each default-enabled record must have:

```text
nominalStepMicrons > 0
evidenceLevel: high
displayEligibility: default_allowed
conversionEnabled: true
sourceUrl
sourceLabel
sourceSummary
accessedAt
lastReviewedAt
```

Do not expose Medium / Low / Experimental records in the default UI.

---

## Conversion formula to implement

Future implementation should use:

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

Display rounded equivalent steps by default. Do not show raw fractional steps by default.

---

## QA expectations for future implementation

Future implementation must include a QA document:

```text
docs/qa/PR-V2-06-tools-grinder-equivalency-foundation.md
```

Required checks:

```text
npm.cmd run build
git diff --check
git diff --name-only
git diff --stat
git status --short --branch
```

If lint script exists, run it. If not:

```text
npm.cmd run lint: NOT RUN, lint script not available
```

Required viewport QA:

```text
375x667
390x844
430x932 if practical
```

Required regression QA:

```text
Brew Home -> Recipe Setup -> Timer -> Finish -> Save -> History Detail
History Detail -> Rebrew -> Recipe Setup
Setup -> Timer -> Finish -> Discard
Settings CSV export app-side status
Settings JSON backup app-side status
4:6 R-01 center/basic only
4:6 R-02 legacy selector only
10 Pour 20g / 300g / 1:15
10 Pour 1:45 / 210g
localStorage key unchanged
saved session schema unchanged
CSV export format unchanged
JSON backup format unchanged
```

---

## Independent verification checklist

Verifier must check:

1. Only allowed implementation files changed.
2. No Recipe Setup / Timer / History / Settings behavior changed.
3. No CSV/JSON schema changed.
4. No PWA/package/release files changed.
5. Dataset seed has only High evidence default-enabled records.
6. No Medium / Low / Experimental values are exposed in default UI.
7. Beean Pro/private/login-only/paid data is not used.
8. `nominalStepMicrons` is canonical.
9. Conversion helper uses nominal adjustment math only.
10. UI includes required labels.
11. Required caution copy is present.
12. No particle-size/taste/official-endorsement claim appears.
13. Build passes.
14. Mobile QA passes.
15. Flow regression passes.

---

## ChatGPT + GitHub interim workflow status

This docs-only sequence was performed during Codex usage limitation.

Confirmed safe interim workflow:

```text
1 PR = 1 docs-only theme
single file additions preferred
no src/public/package/runtime changes
Draft PR creation
changed-files verification
Ready for review
Squash merge
merge commit recorded
```

This workflow should continue for planning/spec/docs while Codex remains limited.

Runtime implementation should wait for Codex or another environment able to run build/QA locally.

---

## Next safe actions

Option A — wait for Codex recovery:

```text
Use docs/v2/GRINDER_TOOLS_IMPLEMENTATION_PROMPT.md as the implementation prompt.
```

Option B — if continuing docs-only work:

```text
Create a small high-evidence dataset seed review doc.
Do not implement runtime code.
```

Potential docs-only next file:

```text
docs/research/GRINDER_HIGH_EVIDENCE_SEED_REVIEW.md
```

Purpose:

- list candidate 3–6 seed grinders
- record source URLs and evidence level
- keep values out of runtime until verified

---

## Completion criteria for this handoff

This handoff is complete when:

- all PR #91–#95 documents are merged
- this handoff document is merged
- future implementation agents can start from `GRINDER_TOOLS_IMPLEMENTATION_PROMPT.md`
- no runtime code has been changed by the docs-only sequence

---

## Document control

- Author: ChatGPT + GitHub interim workflow
- Created: 2026-06-17
- Status: Grinder docs-only sequence handoff
- Related docs:
  - `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
  - `docs/research/GRINDER_CALIBRATION_SOURCE_INDEX.md`
  - `docs/v2/GRINDER_DATASET_SCHEMA_SPEC.md`
  - `docs/v2/GRINDER_EQUIVALENCY_UI_IA_SPEC.md`
  - `docs/v2/GRINDER_TOOLS_IMPLEMENTATION_PROMPT.md`
