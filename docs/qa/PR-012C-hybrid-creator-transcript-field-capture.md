# PR-012C: Hybrid Creator Transcript / Timestamped Field Capture QA

## 1. Purpose

This PR adds timestamped Hybrid creator-source field capture only.

## 2. Scope

* source access log
* timestamped capture table
* field-level evidence table
* runtime decision
* Independent Verifier Prompt
* Regression Checker Prompt
* Memory / Handoff

## 3. Files changed

* `docs/research/PR-012C-hybrid-creator-transcript-field-capture.md`
* `docs/qa/PR-012C-hybrid-creator-transcript-field-capture.md`

## 4. Verification

| Check                                | Result |
| ------------------------------------ | ------ |
| npm.cmd run build                    | Pass   |
| git diff --check                     | Pass   |
| No dist files                        | Pass   |
| Docs-only runtime impact             | Pass   |
| No app source files changed          | Pass   |
| No runtime recipe values changed     | Pass   |
| No method schedules changed          | Pass   |
| No 4:6 runtime changes               | Pass   |
| No Hybrid runtime changes            | Pass   |
| No 10 Pour runtime changes           | Pass   |
| No Ice Brew runtime changes          | Pass   |
| No sourceStatus weakening            | Pass   |
| No verificationLevel weakening       | Pass   |
| No valuesArePlaceholder weakening    | Pass   |
| No isPlaceholder weakening           | Pass   |
| No runtime fieldEvidence changes     | Pass   |
| No timer logic changes               | Pass   |
| No route changes                     | Pass   |
| No storage schema changes            | Pass   |
| No PWA / manifest / workflow changes | Pass   |
| No package / release-doc changes     | Pass   |

## 5. Evidence QA

| Check                                         | Result |
| --------------------------------------------- | ------ |
| PR-012B baseline summarized                   | Pass   |
| Source access log included                    | Pass   |
| Timestamped capture table included            | Pass   |
| Field-level evidence table included           | Pass   |
| Runtime candidate assessment included         | Pass   |
| Runtime decision explicit                     | Pass   |
| Transcript/caption limitations documented     | Pass   |
| Third-party summaries not promoted to primary | Pass   |
| Independent Verifier Prompt included          | Pass   |
| Regression Checker Prompt included            | Pass   |
| Memory / Handoff included                     | Pass   |

## 6. Runtime decision

**Option B: Still not ready for runtime implementation.**

Creator captions and timestamped visible frames now directly support a fixed
New Hybrid example with `20g / 300g`, four additions, cumulative
`120g / 200g / 300g`, broad switch actions, lower-temperature guidance, and a
completion target around `3:30`.

Runtime remains blocked because:

* initial water temperature is unresolved
* the first pour is a `40-50g` range rather than one exact runtime value
* narrated target times are approximate and differ from observed example times
* finish target versus observed dripper removal needs an explicit semantics
  decision
* exact Switch model / capacity remains unresolved
* arbitrary dose and ratio scaling remain unsupported

## 7. Result

Result: Pass.

Blocking issues: None for this docs-only evidence capture.

Non-blocking follow-ups:

* PR-012D: Hybrid Narrow Fixed-Example Mapping / Approximation Semantics Gate
* Explicitly approve or reject the R-08-to-S1 mapping.
* Decide how to represent the creator's `40-50g` range and approximate times.
* Capture or intentionally omit the initial water temperature.
* Define finish target versus observed dripper-removal semantics.
* Lock arbitrary dose and ratio scaling off before runtime implementation.
