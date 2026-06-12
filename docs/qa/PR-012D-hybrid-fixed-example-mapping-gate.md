# PR-012D: Hybrid Fixed-Example Mapping Gate QA

## 1. Purpose

This PR decides future Hybrid fixed-example mapping and approximation semantics
only.

## 2. Scope

* PR-012C baseline
* candidate mapping summary
* approximation semantics review
* current data model fit
* future fieldEvidence plan
* scaling / setup policy
* UI caution copy requirements
* runtime decision
* Independent Verifier Prompt
* Regression Checker Prompt
* Memory / Handoff

## 3. Files changed

* `docs/research/PR-012D-hybrid-fixed-example-mapping-gate.md`
* `docs/qa/PR-012D-hybrid-fixed-example-mapping-gate.md`

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

## 5. Evidence / decision QA

| Check                                        | Result |
| -------------------------------------------- | ------ |
| PR-012C baseline summarized                  | Pass   |
| Candidate mapping summary included           | Pass   |
| Approximation semantics reviewed             | Pass   |
| Data model fit reviewed                      | Pass   |
| Scaling/setup policy included                | Pass   |
| Future UI caution copy requirements included | Pass   |
| Runtime decision explicit                    | Pass   |
| Independent Verifier Prompt included         | Pass   |
| Regression Checker Prompt included           | Pass   |
| Memory / Handoff included                    | Pass   |

## 6. Runtime decision

**Option C: Runtime blocker / data model prerequisite.**

PR-012D approves the narrow R-08-to-S1 mapping and the exact fixed-example
scope of `20g / 300g / 1:15`, with `1:15` treated as app-calculated.

A runtime implementation must wait for an approved prerequisite that can
safely represent:

* first-pour range `40-50g`
* approximate timer targets
* narrated target versus observed-example timestamps
* later temperature range / choice while initial temperature stays unresolved
* target completion around `3:30` versus observed removal around `3:34`
* exact fixed-example gating with placeholder-safe fallback for every
  non-exact setup

Arbitrary dose and ratio scaling remain disabled.

## 7. Result

Result: Pass.

Blocking issues: None for this docs-only mapping gate.

Non-blocking follow-ups:

* PR-012E: Hybrid Range / Approximation Runtime Model Prerequisite
* Add the minimum additive range and approximation semantics without adding
  Hybrid runtime recipe values or schedules.
* Keep initial temperature and exact Switch model / capacity unresolved.
* Preserve exact `20g / 300g / 1:15` gating and placeholder fallback policy.
