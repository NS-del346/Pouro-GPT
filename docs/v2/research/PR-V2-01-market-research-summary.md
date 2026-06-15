# PR-V2-01 Market Research Summary

## 1. Source

- Archived report: [`PR-V2-01-market-research.html`](./PR-V2-01-market-research.html)
- Report title: `Pourō-GPT Ver.2.0 Research Report | PR-V2-01`
- Report type: Market Analysis, Competitor Intelligence & Strategic Recommendations
- Archived SHA-256: `4B810131293C43E330206C1C573DE87B51451EEB0698649342C9082DE8922166`

This document summarizes the supplied Genspark report. It does not independently
verify every external market, competitor, or trend claim. The report's evidence
categories are retained where useful:

- **Report-labeled fact/trend:** presented by the report as sourced or
  established, but not independently verified by this PR.
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

The most useful differentiation hypothesis is the combination of a Target
Total-first timer, one-second glanceability, a compact step timeline, and a
lightweight improvement loop spanning Brew Result and History. Source
transparency and provenance are also useful differentiation opportunities.

Recommendation: Yes with modifications. Continue `Light Precision Cockpit +
Amber Accent` as a reasonable Ver2.0 baseline candidate, but do not treat it as
market-validated. It remains a promising planning hypothesis that requires
`375×667` usability validation, contrast/accessibility review, Japanese label
review, and real brewing-context testing.

Local-first and no-account remain strategically useful for privacy, low setup
friction, and trust, but they are not unique in the competitor set.

## 3. Competitor Landscape

| Competitor | Reported position and strengths | Implication for Pourō-GPT |
| --- | --- | --- |
| Filtru | Premium all-rounder with polished device, cloud, accessibility, Live Activities, Bluetooth, and premium UX | Avoid a direct feature arms race; focus on execution and repetition rather than broad discovery and device coverage |
| Beanconqueror | Free, open-source, privacy-focused, local-first, powerful, and parameter-dense | Shows local-first viability while demonstrating complexity and logging-friction risks |
| Timer.Coffee | Free, open-source, simple timer and recipe/diary experience | Shows the value of simplicity, but also shows recipe-first competition |
| FourSix | Focused method specialist with a glanceable timer and visual pour preview | Useful reference for method-focused execution; Target Total-first remains a differentiation opportunity |
| Brew Timer | Recipe library, community, discovery, sharing, and audio-assistant direction | Do not copy marketplace/community scope in early Ver2.0 |
| Aeromatic | Specialist guided workflow with a large AeroPress recipe library and video walkthroughs | Focused guided UX is useful; video-heavy discovery is not an early priority |

Filtru and Drippe appear to include target water amount or target weight
concepts in guided brewing flows. Target Total-first should therefore not be
described as completely unique.

The report treats competitor details as a mixture of sourced claims and strategic
interpretation. This PR preserves those conclusions without promoting them to
internally verified product facts.

## 4. UI/UX Trend Findings

- **Report-supported practice:** light high-contrast utility UI, accessibility
  contrast, and monospace/tabular numerals for changing numeric values.
- **Critical UX principle:** brewing-time information should be understandable
  in a one-second glance. Target Total, elapsed time, and current step must be
  stable and immediately readable.
- **Recommendation:** default to a light, high-contrast interface suitable for a
  well-lit kitchen and apply stable numeric styling to live values.
- **Recommendation:** use compact modular panels only when they clarify
  hierarchy; avoid dense dashboard behavior that competes with the brewing task.
- **Mixed evidence:** dark mode has user and environment benefits, but it is not
  required for initial Ver2.0. Defer it until later validation.
- **Inference:** a restrained technical mobile UI can communicate precision, but
  it must remain warm enough to avoid a sterile or overly clinical impression.

## 5. Light Precision Cockpit + Amber Accent Assessment

Recommendation: Yes with modifications.

Continue `Light Precision Cockpit + Amber Accent` as the Ver2.0 baseline
candidate. However, it is not market-validated yet. It appears promising and
requires `375×667` usability validation, contrast/accessibility review, Japanese
label review, and real brewing-context testing.

- **Inference:** the light cockpit direction may provide useful differentiation
  from warmer coffee-journal and recipe-library visuals.
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

1. **Target Total-first execution:** Filtru and Drippe appear to include target
   water amount or target weight concepts in guided brewing flows. Pourō-GPT can
   differentiate by making cumulative Target Total the dominant, persistent
   hierarchy for physical-scale brewing, while remaining lightweight,
   local-first, no-account, source-transparent, and free from Bluetooth, AR, and
   cloud dependencies in initial Ver2.0.
2. **Execution-first UX:** Optimize for starting, performing, finishing,
   reviewing, and repeating a brew rather than recipe discovery or marketplace
   participation.
3. **Lightweight improvement loop:** Connect Brew Result feedback, History Detail
   comparison, and a carefully bounded next-cup adjustment path.
4. **Source transparency and provenance:** Preserve visible confidence and
   provenance distinctions without overwhelming the compact brewing UI.
5. **Focused local-first execution:** BeanConqueror and Timer.Coffee show that
   local/offline/open-source oriented tools already exist. Position Pourō-GPT as
   a focused execution-first PWA that combines local-first operation with a
   constrained method set, Target Total-first timer, and source/provenance
   transparency.

## 7. Feature Priority Recommendations

These corrected priority buckets are planning recommendations. They do not adopt
features or authorize implementation.

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

History Detail comparison and Next cup hint rules are P1 design candidates, not
adopted P0 features. Dark theme and simple bean tags are deferred. The source
report's auto-backup-reminder proposal is not adopted as P0 without separate UX
design.

## 8. Features to Defer or Avoid

Early Ver2.0 should not compete on breadth. Bluetooth support, marketplace
features, and advanced analytics carry significant scope and competitive
pressure, so they should be evaluated only after the core manual execution and
improvement loop receives usability validation.

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
| Local-first data loss | Treat backup reminders as a separate UX design question; prioritize understandable export and future restore safety without implying cloud protection |
| Unsupported external conclusions | Keep report-labeled facts, inferences, hypotheses, and recommendations visibly distinct until independently verified |

## 10. Implications for PR-V2-02

PR-V2-02 remains aligned with the existing
[`../PR_ROADMAP.md`](../PR_ROADMAP.md): Ver1.0 UX audit and problem map.
PR-V2-01 findings should be used as inputs to PR-V2-02, but they do not replace
or expand the PR-V2-02 scope.

During the Ver1.0 UX audit, PR-V2-02 may reference the corrected P0 identity
criteria, Target Total-first hypothesis, source/provenance safety, and visual
candidate validation needs recorded here. If a separate strategy-translation
document is needed, create a later docs-only PR rather than expanding PR-V2-02
silently.

## 11. Open Questions

- What user evidence is required before the provisional visual direction becomes
  an implementation decision?
- What exact information must be visible within one second on `375×667` and
  `390x844` timer layouts?
- How should History Detail comparison choose a comparison target without
  becoming an analytics dashboard?
- What rule-based Next Cup Hint behavior is useful, explainable, and
  non-authoritative?
- What restore validation and rollback guarantees are required before JSON import
  can move from P1 planning to implementation?
- How should source confidence be concise in daily use while preserving access to
  provenance detail?
- Is a later docs-only strategy-translation PR needed after PR-V2-02 completes
  the roadmap-defined Ver1.0 UX audit and problem map?
- Can a complete copy of the Genspark report be obtained so the missing tail can
  be reviewed without inference?
