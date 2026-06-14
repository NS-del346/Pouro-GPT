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
this PR. The summary preserves confirmed, inference, hypothesis, and
recommendation distinctions where possible.

The supplied HTML is incomplete: it ends during Section 9, Risk 3 and has no
closing HTML tags. This PR preserves that artifact byte-for-byte and limits its
summary to the available content plus the explicit task-directed consolidation
requirements.

## 4. Key Findings

- Target Total-first timer hierarchy is the strongest differentiation
  opportunity.
- One-second glanceability is a P0 UX requirement for brewing execution.
- Execution-first UX should take priority over discovery, marketplace, and
  community scope.
- A lightweight Brew Result to History Detail improvement loop is a core
  opportunity.
- Source transparency and provenance can differentiate Pourō-GPT.
- Local-first and no-account remain strategically useful, but are not unique.
- Light high-contrast UI and stable monospace/tabular numerals support live
  brewing readability.
- Dark mode is P2/later, not P0.
- Broad feature competition with premium all-rounders and parameter-dense
  trackers would create scope and positioning risk.

## 5. Strategic Interpretation

Pourō-GPT should compete on reduced brewing friction and execution clarity, not
feature count. The early Ver2.0 value proposition is a focused manual brewing
cockpit that makes the next action and stopping target immediately clear, then
supports a small, understandable improvement loop.

Research recommendations are planning inputs, not verified user demand or
implementation approval. Visual direction alone is insufficient differentiation;
the Target Total-first hierarchy, execution flow, provenance safety, and
lightweight improvement loop must carry the product position.

## 6. Adopted Direction

Use `Light Precision Cockpit + Amber Accent` as a provisional Ver2.0 baseline
direction.

This is not yet an implementation decision. It must be translated into Product
Vision, UX Strategy, Information Architecture, and Visual Direction in PR-V2-02
before any UI implementation PR.

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

Rule-based Next Cup Hint, JSON import/restore, History edit/delete, source
confidence UI, and PWA guidance remain planning candidates. Their inclusion,
behavior, safety boundaries, and PR placement require explicit follow-up
decisions.

The source report also labels an auto-backup reminder as P0 mitigation for
local-first data loss. It is not adopted by this consolidation because it is not
part of the task-directed P0 feature summary and requires explicit UX, frequency,
and non-cloud-protection wording decisions.

## 8. Ver2.0 Priority Buckets

### P0

- Target Total-first timer with compact step timeline
- Brew Result feedback
- History Detail comparison view
- One-second glanceability
- Execution-first cockpit information hierarchy
- Specify the bounded, explainable role of the source report's P0 Next Cup Hint
  recommendation before adoption
- Reconcile the source report's P0 auto-backup-reminder mitigation with the
  task-directed priority summary before adoption

### P1

- History edit and individual delete
- JSON import / restore
- Source confidence UI
- PWA install / update guidance

### P2

- Dark mode toggle
- Bean name field
- Grind size reference

### Later

- Bluetooth scale integration
- Recipe marketplace / community
- Advanced analytics

### Avoid for early Ver2.0

- Cloud sync / account system
- AI diagnosis
- Heavy bean inventory
- AR guides
- TDS / water-quality tracking

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

The current `PR_ROADMAP.md` defines PR-V2-02 as a Ver1.0 UX audit and problem
map. This task also directs PR-V2-02 to translate the PR-V2-01 research into
reviewed Product Vision, UX Strategy, Information Architecture, and Visual
Direction decisions before UI implementation begins.

This PR does not change the roadmap or silently redefine PR-V2-02. The next
docs-only planning decision should reconcile those two scopes, the existing
PR-V2-00 planning documents, and the PR-V2-01 research before implementation.

It should define:

- the P0 execution loop and measurable one-second glanceability criteria;
- the Target Total-first information hierarchy;
- the compact step timeline and critical timer content;
- the Brew Result and History Detail improvement loop;
- source-confidence presentation that preserves provenance safety;
- the provisional visual direction's accessibility, warmth, and mobile
  validation requirements;
- explicit boundaries for P1, P2, Later, and Avoid items.
- the status and safety wording of the source report's P0 auto-backup-reminder
  mitigation;
- whether a complete replacement for the truncated Genspark artifact is required
  before the research phase is considered complete.
