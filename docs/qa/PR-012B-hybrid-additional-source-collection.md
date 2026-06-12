# PR-012B: Hybrid Additional Source Collection QA

## 1. Purpose

This PR adds Hybrid additional source collection and creator-source field
review only.

## 2. Scope

* additional source access log
* source classification
* field-level evidence review
* runtime decision
* Independent Verifier Prompt
* Regression Checker Prompt
* Memory / Handoff

## 3. Files changed

* `docs/research/PR-012B-hybrid-additional-source-collection.md`
* `docs/qa/PR-012B-hybrid-additional-source-collection.md`

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
| PR-012A baseline summarized                   | Pass   |
| Source access log included                    | Pass   |
| Source classification included                | Pass   |
| Field-level evidence table included           | Pass   |
| Conflicting recipe/version analysis included  | Pass   |
| Runtime decision explicit                     | Pass   |
| Missing evidence documented                   | Pass   |
| Independent Verifier Prompt included          | Pass   |
| Regression Checker Prompt included            | Pass   |
| Memory / Handoff included                     | Pass   |

## 6. Runtime decision

**Option B: Still not ready for runtime implementation.**

PR-012B directly narrows R-08 toward the evolved / New Hybrid HARIO Switch
method and supports the broad immersion -> percolation -> immersion phase
order.

Runtime remains blocked because the directly inspected creator content did not
expose the complete numeric recipe. Exact dose, water, ratio, temperatures,
grind, switch-action timing, pours, release, finish semantics, equipment
model, and scaling behavior remain third-party-supported or unresolved.

## 7. Result

Result: Pass.

Blocking issues: None for this docs-only source review.

Non-blocking follow-ups:

* PR-012C: Hybrid Creator Transcript / Timestamped Field Capture Gate
* Obtain a reviewable creator-source transcript or timestamped frame evidence.
* Reconcile every numeric field and switch action before a runtime candidate.
* Keep Hybrid runtime data placeholder-safe until that gate passes.
