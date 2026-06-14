# PR-V2-01 Market Research Summary

## 1. Source

- Archived report: [`PR-V2-01-market-research.html`](./PR-V2-01-market-research.html)
- Report title: `Pourō-GPT Ver.2.0 Research Report | PR-V2-01`
- Report type: Market Analysis, Competitor Intelligence & Strategic Recommendations
- Archived SHA-256: `4B810131293C43E330206C1C573DE87B51451EEB0698649342C9082DE8922166`

This document summarizes the supplied Genspark report. It does not independently
verify every external market, competitor, or trend claim. The report's evidence
categories are retained where useful:

- **Confirmed:** presented by the report as a sourced fact or established trend.
- **Inference:** interpretation drawn from competitor or trend observations.
- **Hypothesis:** proposition that still requires product or user validation.
- **Recommendation:** proposed action or priority, not an implementation decision.

Source completeness limitation: the supplied HTML ends abruptly during Section 9,
Risk 3 (`Limited Method Scope Perception`) and has no closing HTML tags. Content
after that point is unavailable. This summary covers the available report plus
the task-directed consolidation requirements; it does not fabricate the missing
tail.

## 2. Executive Summary

The report recommends positioning Pourō-GPT as an execution-first brewing tool:
a professional daily brew cockpit rather than a recipe-discovery app, marketplace,
community, or comprehensive coffee journal.

The strongest opportunity is the combination of a Target Total-first timer,
one-second glanceability, a compact step timeline, and a lightweight improvement
loop spanning Brew Result and History Detail. Source transparency and provenance
are also identified as meaningful differentiation.

`Light Precision Cockpit + Amber Accent` is recommended as a viable provisional
Ver2.0 design direction. Light high-contrast UI, stable numeric layouts, and
monospace or tabular numerals support brewing-time readability. Dark mode is a
P2/later option, not a P0 requirement.

Local-first and no-account remain strategically useful for privacy, low setup
friction, and trust, but they are not unique in the competitor set.

## 3. Competitor Landscape

| Competitor | Reported position and strengths | Implication for Pourō-GPT |
| --- | --- | --- |
| Filtru | Premium all-rounder with polished device, cloud, accessibility, Live Activities, Bluetooth, and premium UX | Avoid a direct feature arms race; focus on execution and repetition rather than broad discovery and device coverage |
| Beanconqueror | Free, open-source, privacy-focused, local-first, powerful, and parameter-dense | Confirms local-first viability while demonstrating complexity and logging-friction risks |
| Timer.Coffee | Free, open-source, simple timer and recipe/diary experience | Confirms the value of simplicity, but also shows recipe-first competition |
| FourSix | Focused method specialist with a glanceable timer and visual pour preview | Useful reference for method-focused execution; Target Total-first remains a differentiation opportunity |
| Brew Timer | Recipe library, community, discovery, sharing, and audio-assistant direction | Do not copy marketplace/community scope in early Ver2.0 |
| Aeromatic | Specialist guided workflow with a large AeroPress recipe library and video walkthroughs | Focused guided UX is useful; video-heavy discovery is not an early priority |

The report treats competitor details as a mixture of sourced claims and strategic
interpretation. This PR preserves those conclusions without promoting them to
internally verified product facts.

## 4. UI/UX Trend Findings

- **Confirmed/established in the report:** light high-contrast utility UI,
  accessibility contrast, and monospace/tabular numerals for changing numeric
  values.
- **Critical UX principle:** brewing-time information should be understandable
  in a one-second glance. Target Total, elapsed time, and current step must be
  stable and immediately readable.
- **Recommendation:** default to a light, high-contrast interface suitable for a
  well-lit kitchen and apply stable numeric styling to live values.
- **Recommendation:** use compact modular panels only when they clarify
  hierarchy; avoid dense dashboard behavior that competes with the brewing task.
- **Mixed evidence:** dark mode has user and environment benefits, but it is not
  required for the initial Ver2.0 direction. Treat it as P2/later.
- **Inference:** a restrained technical mobile UI can communicate precision, but
  it must remain warm enough to avoid a sterile or overly clinical impression.

## 5. Light Precision Cockpit + Amber Accent Assessment

The report's verdict is to proceed with `Light Precision Cockpit + Amber Accent`
as a baseline for further planning and validation.

Supporting assessment:

- **Inference:** the light cockpit direction is market-acceptable and can
  differentiate Pourō-GPT from warmer coffee-journal and recipe-library visuals.
- **Hypothesis:** high contrast, stable numeric layout, and a Target Total-first
  hierarchy will improve one-second glanceability during brewing.
- **Recommendation:** use amber selectively for active state, primary action, and
  important progress signals.
- **Recommendation:** use rounded corners, subtle warmth, and restrained
  micro-interactions to mitigate a too-clinical impression.
- **Recommendation:** validate the direction in realistic kitchen and mobile
  conditions before implementation.

This is a provisional design direction, not approval of production UI, design
tokens, generated mock code, or an app-wide redesign.

## 6. Differentiation Opportunities

1. **Target Total-first execution:** Make cumulative target weight the primary
   timer value and the current pour amount secondary. The report treats this as
   the strongest differentiation opportunity.
2. **Execution-first UX:** Optimize for starting, performing, finishing,
   reviewing, and repeating a brew rather than recipe discovery or marketplace
   participation.
3. **Lightweight improvement loop:** Connect Brew Result feedback, History Detail
   comparison, and a carefully bounded next-cup adjustment path.
4. **Source transparency and provenance:** Preserve visible confidence and
   provenance distinctions without overwhelming the compact brewing UI.
5. **Zero-setup local-first use:** Keep no-account and local-first benefits, while
   acknowledging that competing products also offer them and that backup/restore
   safety becomes more important.

## 7. Feature Priority Recommendations

The report's feature cards and this consolidation's UX requirements are recorded
separately so that priority meaning is not lost.

### P0: Critical execution experience

- Target Total-first timer with compact step timeline
- Brew Result feedback
- History Detail comparison view
- One-second glanceability
- Execution-first cockpit information hierarchy
- Rule-based Next Cup Hint is listed as P0 in the source report, but its behavior
  and safety boundaries still require specification before adoption
- The source report separately labels an auto-backup reminder as P0 mitigation
  for local-first data loss. It is recorded as an unresolved priority input, not
  adopted implementation, because it is outside the task-directed P0 feature
  summary and requires UX/safety specification

### P1: High-value early candidates

- History edit and individual delete
- JSON import / restore
- Source confidence UI
- PWA install / update guidance

### P2: Useful, non-critical candidates

- Dark mode toggle
- Bean name field
- Grind size reference

### Later: Evaluate after core UX validation

- Bluetooth scale integration
- Recipe marketplace / community
- Advanced analytics

### Avoid for early Ver2.0

- Cloud sync / account system
- AI diagnosis
- Heavy bean inventory
- AR guides
- TDS / water-quality tracking

## 8. Features to Defer or Avoid

Early Ver2.0 should not compete on breadth. Bluetooth support, marketplace
features, and advanced analytics carry significant scope and competitive
pressure, so they should be evaluated only after the core manual execution and
improvement loop is validated.

Cloud sync, AI diagnosis, heavy bean inventory, AR guides, and TDS/water tracking
conflict with current product constraints or introduce disproportionate
complexity. They are explicitly not part of the early Ver2.0 direction.

## 9. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Too clinical perception | Use amber accent, rounded corners, subtle warmth, and restrained micro-interactions |
| Competitor convergence | Differentiate through Target Total-first execution and improvement-loop UX, not visual style alone |
| Overbuilding | Exclude cloud, AI, marketplace, Bluetooth, heavy inventory, AR, TDS, and broad analytics from early Ver2.0 |
| Accessibility or glanceability failure | Maintain high contrast, large target numbers, stable numeric layout, clear labels, and realistic mobile/kitchen validation |
| Local-first data loss | Reconcile the report's P0 auto-backup-reminder proposal with understandable export, backup, and future restore safety without implying cloud protection |
| Unsupported external conclusions | Keep confirmed facts, inferences, hypotheses, and recommendations visibly distinct until independently validated |

## 10. Implications for PR-V2-02

This section is a task-directed bridge, not a summary of the unavailable tail of
the truncated report.

The current [`../PR_ROADMAP.md`](../PR_ROADMAP.md) defines PR-V2-02 as a Ver1.0
UX audit and problem map, while this task directs PR-V2-02 to translate the
research into reviewed Product Vision, UX Strategy, Information Architecture,
and Visual Direction before any UI implementation PR. PR-V2-02 should reconcile
those scopes and the existing provisional `docs/v2/` documents rather than
silently replacing or duplicating them.

Required decisions include:

- define the P0 execution loop and one-second glanceability acceptance criteria;
- specify the Target Total-first timer hierarchy and compact step timeline;
- define the lightweight Brew Result to History Detail improvement loop;
- decide how source confidence appears without weakening provenance or
  overwhelming compact UI;
- validate the provisional light cockpit direction and amber usage;
- keep P1, P2, Later, and Avoid boundaries explicit.

## 11. Open Questions

- What user evidence is required before the provisional visual direction becomes
  an implementation decision?
- What exact information must be visible within one second on `375x667` and
  `390x844` timer layouts?
- How should History Detail comparison choose a comparison target without
  becoming an analytics dashboard?
- What rule-based Next Cup Hint behavior is useful, explainable, and
  non-authoritative?
- What restore validation and rollback guarantees are required before JSON import
  can move from P1 planning to implementation?
- How should source confidence be concise in daily use while preserving access to
  provenance detail?
- Should PR-V2-02 retain the current roadmap's Ver1.0 UX audit/problem-map scope,
  combine it with the task-directed strategy translation, or require a roadmap
  update in a separate docs-only decision?
- Can a complete copy of the Genspark report be obtained so the missing tail can
  be reviewed without inference?
