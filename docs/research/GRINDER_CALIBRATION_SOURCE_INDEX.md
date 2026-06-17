# Grinder Calibration Source Index

## Purpose

This document defines the source-index policy for the Pourō-GPT Grinder Equivalency Engine.

It extends `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md` by separating source eligibility, evidence levels, citation requirements, and false-precision prevention before any implementation PR introduces a grinder dataset or conversion UI.

The feature direction is limited to:

- nominal adjustment conversion
- 公称調整幅ベースの参考換算
- source-based estimate
- daily brew starting-point guidance

It is not a particle-size equivalency system.

---

## Relationship to PR-V2-01 planning

PR-V2-01 introduced the high-level Grinder Equivalency Engine planning handoff.

This document narrows and clarifies the research policy before implementation:

- `micronPerClick` style data must be treated as **nominal adjustment width per step**, not measured particle-size change.
- UI must avoid implying exact grind-size, particle-distribution, flow-rate, extraction-yield, or taste equivalence.
- Community and unofficial sources may be useful for research backlog, but they are not eligible for default Ver.2 UI display.
- Initial implementation should prefer High evidence sources only.

---

## Core principle: no false precision

The application must never present grinder values as exact or guaranteed.

Allowed language:

- reference conversion
- 参考換算
- nominal adjustment conversion
- 公称調整幅ベース
- Nominal setting
- source-based estimate
- starting point
- approximate
- confidence
- source

Forbidden language:

- exact grind conversion
- exact particle size
- same particle distribution
- same fines amount
- same flow rate
- same extraction yield
- same taste
- manufacturer-approved setting
- official recommendation
- fully equivalent to Comandante
- guaranteed setting

---

## Source type taxonomy

| Source type | Description | Default Ver.2 UI eligibility | Default evidence level | Notes |
| --- | --- | --- | --- | --- |
| `manufacturer_official` | Manufacturer product/spec/support page or official app/documentation. | Eligible | High | Preferred source when nominal step width is explicit. |
| `manufacturer_manual` | Official PDF/manual/printed documentation from maker. | Eligible | High | Preferred when adjustment pitch or click width is clearly stated. |
| `official_distributor` | Official distributor or importer page quoting maker specs. | Eligible if traceable | High or Medium | Do not label as manufacturer official unless attributable. |
| `authorized_retailer` | Authorized retailer product page with technical specs. | Eligible only if maker-derived | High or Medium | Retailer marketing copy alone is insufficient. |
| `beeancoffee_public_reference` | Public Beean Coffee reference page requiring no login, Pro access, private API, or paid data. | Eligible if publicly visible | High or Medium | Cite as external reference, not official maker data. |
| `specialty_blog` | Coffee blog, equipment review, or independent article. | Not eligible by default | Medium or Low | Research backlog only unless later Experimental mode is added. |
| `forum_reference` | Forum post/table/community thread. | Not eligible by default | Medium, Low, or Very Low | Must not be shown in default Ver.2 UI. |
| `reddit_reference` | Reddit post/comment/thread. | Not eligible by default | Low or Very Low | Research backlog only. |
| `youtube_review` | Video review or creator claim. | Not eligible by default | Low or Very Low | Needs transcript/timecode if ever used in research. |
| `single_user_measurement` | One user's measurement or personal calibration. | Not eligible by default | Low or Very Low | Candidate signal only. |
| `unsourced_chart` | Chart with no traceable source. | Not eligible | Very Low | Do not use for UI. |
| `unknown` | Unknown or unclear source. | Not eligible | Very Low | Do not use for UI. |

---

## Evidence level matrix

| Evidence level | Criteria | UI default display | Required treatment |
| --- | --- | --- | --- |
| High | Official source, official manual, official/distributor source with maker attribution, or public reference with strong traceability. | Allowed | Show Source and Confidence; include approximation warning. |
| Medium | Multiple plausible third-party sources or strong public reference without maker confirmation. | Not in default Ver.2 UI | Research backlog or future detailed mode only. |
| Low | Single blog, single video, small forum sample, unclear methodology. | Not in default Ver.2 UI | Research backlog only. |
| Very Low | Reddit-only, unsourced chart, anecdotal user claim, unclear units. | Never in default UI | Use only as a lead for later verification. |
| Needs Review | Value exists but source, unit, or meaning is unresolved. | Not displayed as conversion | Keep as candidate with explicit `needs_review`. |

---

## Ver.2 initial display eligibility

For Ver.2 default UI, a grinder record is display-eligible only when all of the following are true:

1. `conversionEnabled === true`
2. `nominalStepMicrons` is a positive finite number.
3. `evidenceLevel === "high"`
4. `sourceType` is one of:
   - `manufacturer_official`
   - `manufacturer_manual`
   - `official_distributor`
   - `authorized_retailer`
   - `beeancoffee_public_reference`
5. `sourceUrl` is present.
6. `sourceLabel` is present.
7. `sourceSummary` explains what the source supports.
8. UI copy includes Source, Confidence, and Nominal setting.
9. Required caution copy is displayed near the result.

Records that fail any requirement must not produce a visible default conversion result.

---

## Beean Coffee policy

Beean Coffee may be used only as an external public reference source.

Allowed:

- publicly accessible Beean Coffee reference pages
- values visible without account login
- pages that can be cited by URL
- public grinder-setting/converter reference values if visible to general users

Forbidden:

- Beean Pro internal database
- login-only pages
- private API responses
- paid/internal data
- scraped internal data
- values inferred from hidden app state

UI wording must not imply Beean is an official source for a manufacturer unless the cited page proves that relationship.

Recommended source type:

```ts
"beeancoffee_public_reference"
```

Recommended confidence when only Beean public data supports the value:

```ts
"cautious"
```

---

## Citation policy

Every grinder value must have a citation record before implementation.

Minimum required fields:

```ts
interface GrinderSourceRecord {
  grinderId: string;
  maker: string;
  model: string;
  claimedNominalStepMicrons: number | null;
  sourceType: GrinderSourceType;
  evidenceLevel: GrinderEvidenceLevel;
  sourceUrl: string;
  sourceLabel: string;
  sourceSummary: string;
  accessedAt: string;
  notes: string;
}
```

Citation rules:

- Prefer official pages or manuals.
- Preserve source URL and access date.
- Summarize the source; do not copy long copyrighted passages.
- Do not cite private, login-only, or paid internal sources.
- If a value is found in several sources, record the strongest source as primary and keep weaker sources as notes or backlog references.
- If the source gives units in mm/turn, clicks/rotation, or other indirect terms, document the conversion logic before using it.

---

## Units and conversion notes

The preferred internal unit is microns per step.

Accepted source forms:

- microns per click
- mm per click
- microns per mark/number
- mm per numbered step
- microns per micro-adjustment

Normalize as:

```ts
nominalStepMicrons: number
```

Examples:

```text
0.015 mm per click = 15 μm per click
0.030 mm per click = 30 μm per click
```

Do not normalize actual particle-size measurements into `nominalStepMicrons` unless the source explicitly defines the value as adjustment mechanism movement or step width. If the source describes measured grounds, treat it as a separate research note, not nominal adjustment width.

---

## Community source handling

Community sources are useful for research discovery but must not drive default Ver.2 conversion display.

Allowed use:

- backlog candidate
- source triangulation
- future Experimental mode consideration
- identifying models worth official-source research

Forbidden default use:

- showing a forum value as a normal default setting
- displaying a precise click number from one community source
- hiding sample size or variance
- implying official approval
- deriving universal conversion across grinders

If future Experimental mode is introduced, UI must require explicit opt-in and stronger caution language.

Future-only display style:

```text
~18 clicks
Community estimate, n=12, observed range 16–20
Not manufacturer verified
```

This style is not for default Ver.2 UI.

---

## False precision prevention rules

Never display:

- fractional clicks unless the physical grinder supports fractional or micro-adjustment steps
- more decimal places than the source supports
- exact equivalence wording
- exact particle-size wording
- exact taste/flow/TDS/EY wording

Default display rules:

| Data type | Display rule |
| --- | --- |
| reference steps | integer step/click value entered by user |
| target equivalent | rounded integer step/click value |
| nominal setting | show mm to 3 decimals only when derived from step width; otherwise show μm as integer |
| deviation | show rounded microns and percent only as nominal deviation, not particle-size error |
| source | show source type + label |
| confidence | show stable/cautious/experimental/do_not_use or equivalent UI label |

Recommended result copy:

```text
参考換算 / 公称調整幅ベース
Nominal setting: 0.840 mm
Source: Beean Coffee public reference
Confidence: Cautious
```

---

## Required UI wording

Any UI that displays a grinder conversion must include:

- 参考換算
- 公称調整幅ベース
- Nominal setting
- Source
- Confidence

Required caution copy:

```text
この換算は、メーカー公称値、Beean Coffee等の外部リファレンス、フォーラム・ブログ等に記載された調整幅をもとにした参考値です。実際の粒径、粒度分布、微粉量、流速、抽出結果、味を保証するものではありません。
```

Optional additional copy:

```text
豆、焙煎度、グラインダー個体差、ゼロ点、注湯速度、器具差により調整してください。
```

---

## Prohibited UI wording

Do not use:

- 正確な粒度換算
- 完全換算
- 同一粒径
- 同一抽出
- Comandante完全互換
- 公式推奨
- メーカー公認
- 同じ味になる
- 同じ流速になる
- 同じTDSになる
- same particle size
- same grind distribution
- same extraction
- same taste
- manufacturer-approved
- official recommendation

---

## Initial grinder research backlog format

Future research docs or JSON index should use this structure:

```ts
interface GrinderResearchBacklogItem {
  grinderId: string;
  maker: string;
  model: string;
  candidateValue: string;
  normalizedNominalStepMicrons: number | null;
  sourceType: GrinderSourceType;
  evidenceLevel: GrinderEvidenceLevel;
  sourceUrl: string;
  sourceLabel: string;
  sourceSummary: string;
  accessStatus: "public" | "login_required" | "paid" | "private" | "unknown";
  displayEligibility: "default_allowed" | "research_only" | "experimental_only" | "do_not_use";
  reviewNotes: string;
  lastChecked: string;
}
```

Backlog priorities:

1. Comandante C40 Standard
2. Comandante Red Clix
3. TIMEMORE high-evidence manual grinders
4. KINGrinder models with official values
5. Pietro models with official values
6. Other hand grinders with manufacturer or manual values
7. Electric grinders only when step units are clear and official-like

---

## Future JSON/source-index candidate

A future machine-readable research index may live at:

```text
docs/research/grinder_calibration_sources.json
```

Do not create this JSON file until the schema is reviewed in a separate PR.

This Markdown document remains the human-readable policy source until then.

---

## Implementation readiness checklist

Before adding `src/data/grinders.ts`, confirm:

- [ ] Source taxonomy is accepted.
- [ ] Evidence level matrix is accepted.
- [ ] Ver.2 initial display eligibility is accepted.
- [ ] Required UI wording is accepted.
- [ ] Required caution copy is accepted.
- [ ] Beean public-only policy is accepted.
- [ ] Medium / Low / Experimental exclusion is accepted.
- [ ] No false precision policy is accepted.
- [ ] No recipe/timer/storage/export changes are included.

---

## Document control

- Author: ChatGPT + GitHub interim workflow
- Created: 2026-06-17
- Status: Docs-only source-index policy
- Related PR: PR-V2-02 / Grinder Calibration Source Index
- Related planning doc: `docs/v2/GRINDER_EQUIVALENCY_ENGINE_PLANNING.md`
