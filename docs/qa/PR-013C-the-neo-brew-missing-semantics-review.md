# PR-013C: THE NEO BREW Missing Semantics Review QA

## 1. Purpose

This PR reviews additional source-capture input for `THE NEO BREW` / R-09
only.

## 2. Scope

* handoff input incorporation
* evidence reconciliation
* candidate schedule review
* first-pour / bloom semantics
* finish / completion semantics
* filter / equipment
* scaling
* runtime decision
* verifier prompt
* regression prompt
* memory handoff
* no runtime changes

## 3. Files changed

* `docs/research/PR-013C-the-neo-brew-missing-semantics-review.md`
* `docs/qa/PR-013C-the-neo-brew-missing-semantics-review.md`

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

| Check                                   | Result |
| --------------------------------------- | ------ |
| Handoff input recorded                  | Pass   |
| Evidence reconciliation matrix included | Pass   |
| Candidate schedule review included      | Pass   |
| 1:45 / 210g explicitly included         | Pass   |
| First-pour / bloom semantics addressed  | Pass   |
| Finish / completion semantics addressed | Pass   |
| Filter / equipment semantics addressed  | Pass   |
| Scaling policy addressed                | Pass   |
| Candidate evidence not over-promoted    | Pass   |
| App-calculated values separated         | Pass   |
| Missing fields listed                   | Pass   |
| Runtime decision explicit               | Pass   |
| Independent Verifier Prompt included    | Pass   |
| Regression Checker Prompt included      | Pass   |
| Memory / Handoff included               | Pass   |

## 6. Runtime decision

### Option B: Still not ready

The complete handoff schedule is accepted for documentation as
`candidate_visual_report`, including the explicitly preserved
`1:45 / 210g` step. It is not accepted for runtime because PR-013C includes no
independently reviewable visual capture and no explicit project approval of
the `THE NEO BREW` to R-09 mapping.

Missing evidence and approvals:

* independently reviewable screenshot, clip, or equivalent visual proof of
  the complete schedule
* explicit R-09 mapping approval
* manual confirmation of the about-`3:30` guidance and its meaning
* approval to use `Pour 1` without bloom wording
* approval to omit the unresolved filter
* fixed exact-setup gate, disabled scaling, and non-exact placeholder fallback

## 7. Result

Result:
Pass

Blocking issues:
None for this documentation-only review. Runtime implementation remains
blocked by the Option B evidence decision.

Non-blocking follow-ups:

* PR-013D: THE NEO BREW Visual Evidence Attachment / Manual Source Confirmation
* Attach or reference independently reviewable visual proof of the complete
  schedule, including `1:45 / 210g`.
* Approve or reject THE NEO BREW to R-09 mapping.
* Confirm that about `3:30` is approximate recipe guidance rather than an exact
  drawdown or removal event.
