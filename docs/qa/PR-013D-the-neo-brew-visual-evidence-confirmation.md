# PR-013D: THE NEO BREW Visual Evidence Confirmation QA

## 1. Purpose

This PR verifies whether additional visual evidence is sufficient for
`THE NEO BREW` / R-09 schedule confirmation.

## 2. Scope

* evidence asset inventory
* visual evidence review
* schedule confirmation
* `1:45 / 210g`
* first-pour / bloom
* finish / completion
* filter / equipment
* R-09 mapping
* scaling / exact setup
* runtime decision
* verifier prompt
* regression prompt
* memory handoff
* no runtime changes

## 3. Files changed

* `docs/research/PR-013D-the-neo-brew-visual-evidence-confirmation.md`
* `docs/qa/PR-013D-the-neo-brew-visual-evidence-confirmation.md`

No evidence image was available or added.

## 4. Verification

| Check                                | Result |
| ------------------------------------ | ------ |
| npm.cmd run build                    | Pass   |
| git diff --check                     | Pass   |
| No dist files                        | Pass   |
| Docs/evidence-only runtime impact    | Pass   |
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
| Evidence asset inventory included       | Pass   |
| Visual evidence review included         | Pass   |
| Schedule confirmation matrix included   | Pass   |
| 1:45 / 210g explicitly checked          | Pass   |
| First-pour / bloom semantics addressed  | Pass   |
| Finish / completion semantics addressed | Pass   |
| Filter / equipment semantics addressed  | Pass   |
| R-09 mapping addressed                  | Pass   |
| Scaling / exact setup addressed         | Pass   |
| Candidate evidence not over-promoted    | Pass   |
| App-calculated values separated         | Pass   |
| Missing fields listed if any            | Pass   |
| Runtime decision explicit               | Pass   |
| Independent Verifier Prompt included    | Pass   |
| Regression Checker Prompt included      | Pass   |
| Memory / Handoff included               | Pass   |

## 6. Runtime decision

### Option B: Still not ready

No visual evidence asset or external visual reference was available. The
complete candidate schedule and critical `1:45 / 210g` row therefore remain
unconfirmed and not runtime-ready.

R-09 internal mapping is not approved for runtime. Bloom wording, about-`3:30`
completion meaning, dripper removal, and filter also remain unresolved.
Scaling remains disabled; any later approved candidate must use the exact
`20g / 300g / 1:15` setup and placeholder fallback for non-exact setups.

## 7. Result

Result:
Pass

Blocking issues:
None for this documentation-only review. Runtime implementation remains
blocked by the Option B evidence decision.

Non-blocking follow-ups:

* PR-013E: THE NEO BREW Evidence Gap Follow-up / Source Acquisition
* Attach or reference reviewable, source-traceable visual proof of the
  complete schedule, including `1:45 / 210g`.
* Approve or reject THE NEO BREW to R-09 as an internal project-policy
  mapping.
* Confirm the meaning of about `3:30` without inventing drawdown or
  dripper-removal semantics.
