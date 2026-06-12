# PR-012E: Hybrid Range / Approximation Runtime Model QA

## 1. Purpose

This PR adds additive type support for range, approximation, distinct time
references, and fixed setup gating only.

## 2. Scope

* additive brew type model
* research and QA documentation
* no runtime data
* no UI behavior
* no method schedule

## 3. Files changed

* `src/types/brew.ts`
* `docs/research/PR-012E-hybrid-range-approximation-model.md`
* `docs/qa/PR-012E-hybrid-range-approximation-model.md`

## 4. Verification

| Check                                | Result |
| ------------------------------------ | ------ |
| npm.cmd run build                    | Pass   |
| git diff --check                     | Pass   |
| No dist files                        | Pass   |
| Only allowed files changed           | Pass   |
| Type changes are additive            | Pass   |
| Existing required fields unchanged   | Pass   |
| No placeholderMethods changes        | Pass   |
| No app source behavior changes       | Pass   |
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
| No timer logic changes               | Pass   |
| No route changes                     | Pass   |
| No storage schema changes            | Pass   |
| No PWA / manifest / workflow changes | Pass   |
| No package / release-doc changes     | Pass   |

## 5. Model QA

| Check                                            | Result |
| ------------------------------------------------ | ------ |
| BrewNumericRange added                           | Pass   |
| BrewValuePrecision added                         | Pass   |
| BrewTimeReference added                          | Pass   |
| BrewFixedSetupGate added                         | Pass   |
| BrewRecipe optional range/time/gate fields added | Pass   |
| BrewStep optional range/time fields added        | Pass   |
| Existing exact fields retained                   | Pass   |
| No UI consumption added                          | Pass   |
| Future Hybrid use documented                     | Pass   |
| Independent Verifier Prompt included             | Pass   |
| Regression Checker Prompt included               | Pass   |
| Memory / Handoff included                        | Pass   |

## 6. Runtime decision

PR-012E does not implement runtime.

Model prerequisite status: **Complete**.

A later runtime candidate PR may start only if it preserves exact
`20g / 300g / 1:15` fixed-example gating, placeholder fallback for every
non-exact setup, disabled arbitrary scaling, separate target and observed time
semantics, unresolved initial temperature, field-level evidence, non-official
caution copy, and mobile QA.

## 7. Result

Result: Pass.

Blocking issues: None.

Non-blocking follow-ups:

* Add a narrow Hybrid R-08 fixed-example runtime candidate in a separate PR.
* Populate only reviewed fields and attach field-level evidence.
* Add exact-match and negative fallback tests before exposing source-backed
  runtime data.
* Add UI caution copy and mobile QA without weakening placeholder safeguards.
