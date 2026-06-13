# PR-013B: THE NEO BREW Video Schedule Capture QA

## 1. Purpose

This PR verifies creator-video schedule and finish semantics for
`THE NEO BREW` / R-09 only.

## 2. Scope

* video access
* timestamped capture log
* schedule reconstruction
* first-pour / bloom semantics
* finish / drawdown / removal semantics
* filter / equipment semantics
* scaling policy
* runtime decision
* verifier prompt
* regression prompt
* memory handoff
* no runtime changes

## 3. Files changed

* `docs/research/PR-013B-the-neo-brew-video-schedule-capture.md`
* `docs/qa/PR-013B-the-neo-brew-video-schedule-capture.md`

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
| No timer logic changes               | Pass   |
| No route changes                     | Pass   |
| No storage schema changes            | Pass   |
| No PWA / manifest / workflow changes | Pass   |
| No package / release-doc changes     | Pass   |

## 5. Evidence QA

| Check                                           | Result |
| ----------------------------------------------- | ------ |
| Video access log included                       | Pass   |
| Timestamped capture log included                | Pass   |
| Schedule reconstruction included                | Pass   |
| First-pour / bloom semantics addressed          | Pass   |
| Finish / drawdown / removal semantics addressed | Pass   |
| Filter / equipment semantics addressed          | Pass   |
| Scaling policy addressed                        | Pass   |
| Third-party sources not over-promoted           | Pass   |
| App-calculated values separated                 | Pass   |
| Missing fields listed                           | Pass   |
| Runtime decision explicit                       | Pass   |
| Independent Verifier Prompt included            | Pass   |
| Regression Checker Prompt included              | Pass   |
| Memory / Handoff included                       | Pass   |

## 6. Runtime decision

### Option B: Still not ready

The creator-authored description supports the fixed parameters, ten equal
pours, `15-second` interval, equipment guidance, and qualitative non-lingering
instruction.

Runtime implementation remains blocked because:

* player reported captions unavailable
* transcript control yielded no usable transcript segments
* reliable frame-by-frame review of the demonstration was not possible
* R-09 mapping approval remains missing
* first-pour / bloom semantics remain unresolved
* first-to-second timing and exact schedule remain unresolved
* finish, drawdown, completion, and removal remain unresolved
* filter type remains unresolved
* fixed-example fallback and disabled-scaling policy remain unapproved

## 7. Result

Result:
Pass

Blocking issues:
None for this documentation-only capture PR.

Non-blocking follow-ups:

* PR-013C: THE NEO BREW Additional Source Capture / Missing Semantics Review
* Obtain a reliably reviewable creator-video copy or verified manual
  transcript.
* Capture exact first-pour, subsequent pour events, finish, drawdown, and
  removal semantics.
* Approve or reject the fixed `THE NEO BREW` to R-09 mapping before runtime
  implementation.
