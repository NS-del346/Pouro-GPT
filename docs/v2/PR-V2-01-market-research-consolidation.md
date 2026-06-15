# PR-V2-01: Ver2.0 Market Research Consolidation

## 1. Purpose

This document bridges the completed Ver1.0.0 product, the supplied PR-V2-01
Genspark market research report, and the next Ver2.0 planning phase.

PR-V2-01 is docs-only. It records research findings and priority boundaries; it
does not approve or implement UI, runtime behavior, data-model changes, or new
features.

## 2. Ver1.0 Baseline

Ver1.0.0 is complete and public.

- Repository: `NS-del346/Pouro-GPT`
- Public app: `https://ns-del346.github.io/Pouro-GPT/`
- Release: `https://github.com/NS-del346/Pouro-GPT/releases/tag/v1.0.0`
- Tag: `v1.0.0`
- Tag target: `f48857b3b6d8519944b2fe754333cc739bc653c6`

The completed baseline is a local-first, no-account, no-backend, non-official
GitHub Pages PWA with Recipe Setup, Timer, History, Rebrew, and export behavior.

The actual PR-V2-01 branch baseline is latest `origin/main`:
`c62fc2766f08a7c382c0b223b066457048a7af38`, which includes PR-V2-00 planning
documents under `docs/v2/`.

## 3. Research Source

- Original archived report:
  [`research/PR-V2-01-market-research.html`](./research/PR-V2-01-market-research.html)
- Repo-readable summary:
  [`research/PR-V2-01-market-research-summary.md`](./research/PR-V2-01-market-research-summary.md)
- Archived SHA-256:
  `4B810131293C43E330206C1C573DE87B51451EEB0698649342C9082DE8922166`

The archived HTML is the supplied Genspark artifact and is not part of app or
public runtime. External claims in the report are not independently verified by
this PR. The summary preserves report-labeled facts, inferences, hypotheses, and
recommendations where possible.

The archived HTML is preserved as a source artifact only. It is incomplete and
ends during Section 9, Risk 3. It is not production source, not public runtime,
and not a complete research report. The markdown summary and consolidation do
not fabricate or infer the missing tail.

The CRLF/whitespace warning is accepted only because the archived HTML is
byte-preserved source material. It does not affect runtime because the file is
under `docs/` and outside public/app code.

## 4. Key Findings

- Target Total-first persistent hierarchy is a useful differentiation
  opportunity, but target water/weight concepts are not completely unique.
- One-second glanceability is a P0 UX requirement for brewing execution.
- Execution-first UX should take priority over discovery, marketplace, and
  community scope.
- A lightweight Brew Result to History Detail improvement loop is a core
  opportunity.
- Source transparency and provenance can differentiate Pourō-GPT.
- Local-first and no-account remain strategically useful, but are not unique.
- Light high-contrast UI and stable monospace/tabular numerals support live
  brewing readability.
- Dark theme is deferred and is not part of initial Ver2.0 identity.
- Broad feature competition with premium all-rounders and parameter-dense
  trackers would create scope and positioning risk.

## 5. Strategic Interpretation

Pourō-GPT should compete on reduced brewing friction and execution clarity, not
feature count. The early Ver2.0 value proposition is a focused manual brewing
cockpit that makes the next action and stopping target immediately clear, then
supports a small, understandable improvement loop.

Research recommendations are planning inputs, not verified user demand, market
validation, or implementation approval. Filtru and Drippe appear to include
target water amount or target weight concepts in guided brewing flows, so
Target Total-first must not be described as completely unique.

Pourō-GPT can differentiate by making cumulative Target Total the dominant,
persistent hierarchy for physical-scale brewing, while remaining lightweight,
local-first, no-account, source-transparent, and free from Bluetooth, AR, and
cloud dependencies in initial Ver2.0.

BeanConqueror and Timer.Coffee show that local/offline/open-source oriented tools
already exist. Pourō-GPT's opportunity is a focused execution-first PWA that
combines local-first operation with a constrained method set, Target Total-first
timer, and source/provenance transparency.

## 6. Adopted Direction

Recommendation: Yes with modifications.

Continue `Light Precision Cockpit + Amber Accent` as the Ver2.0 baseline
candidate. However, it is not market-validated yet. It remains a promising
planning hypothesis that requires `375×667` usability validation,
contrast/accessibility review, Japanese label review, and real brewing-context
testing.

This is not yet an implementation decision.

The provisional direction includes:

- light, high-contrast default;
- amber used selectively for active and important states;
- stable monospace or tabular numerals for live numeric values;
- Target Total-first timer hierarchy;
- one-second glanceability;
- restrained warmth to avoid an overly clinical result.

## 7. Not Yet Adopted

The following are not adopted for early Ver2.0 implementation:

- Bluetooth scale integration
- AI diagnosis
- Cloud sync
- Recipe marketplace / community
- Heavy bean inventory
- AR guide
- TDS / water-quality tracking
- Full analytics dashboard

Next cup hint rules, JSON import/restore design, History edit/delete design,
source confidence expansion, and PWA guidance remain planning candidates. Their
inclusion, behavior, safety boundaries, and PR placement require explicit
follow-up decisions.

The source report also labels an auto-backup reminder as P0 mitigation for
local-first data loss. It is not adopted as P0 by this consolidation and requires
separate UX, frequency, and non-cloud-protection wording design.

## 8. Ver2.0 Priority Buckets

### P0: Essential for Ver2.0 identity

- Target Total-first timer
- compact step timeline
- `375×667` timer glanceability validation
- minimal Brew Result feedback
- History improvement log
- source/provenance safety visibility
- Japanese label clarity

### P1: High-value, should consider early

- JSON import / restore design
- History edit / individual delete design
- Next cup hint rules
- PWA install / update guidance
- History Detail comparison
- drawdown status refinement

JSON import / restore is P1 design work, not immediate implementation. It
requires schema validation, duplicate handling, rollback/failure behavior, and
user confirmation design.

### P2: Useful but not required

- taste tag refinement
- sound / vibration polish
- method detail / source confidence expansion

### Later: Defer

- dark theme / theme switcher
- simple bean tags only if proven useful
- broader method expansion
- advanced comparison views

### Avoid initially

- Bluetooth scale integration
- AR
- AI diagnosis / LLM recipe generation
- cloud sync
- account
- subscription
- SNS/community
- heavy bean inventory
- water chemistry / TDS tracking
- large analytics dashboard
- recipe marketplace

## 9. Constraints Carried Forward from Ver1.0

- local-first
- no account by default
- no backend by default
- GitHub Pages PWA compatibility
- source/provenance metadata must not be weakened
- non-official legal disclaimer must remain
- no claim of official approval, supervision, partnership, endorsement, or
  complete reproduction
- unresolved, interpreted, unverified, and placeholder values must not be made to
  appear authoritative
- existing Ver1.0 runtime, recipe data, timer behavior, storage schema, and
  release status remain unchanged by this PR

## 10. Recommended Next PR: PR-V2-02

PR-V2-02 remains aligned with the existing roadmap: Ver1.0 UX audit and problem
map.

PR-V2-01 findings should be used as inputs to PR-V2-02, but they do not replace
the PR-V2-02 scope. PR-V2-02 may reference the corrected P0 identity criteria,
Target Total-first hypothesis, source/provenance safety, and baseline-candidate
validation needs while auditing the completed Ver1.0 UX.

If a separate strategy-translation document is needed, create a later docs-only
PR rather than expanding PR-V2-02 silently.
