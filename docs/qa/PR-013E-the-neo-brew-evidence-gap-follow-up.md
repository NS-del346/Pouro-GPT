# PR-013E: THE NEO BREW Evidence Gap Follow-up QA

## 1. Purpose

This PR verifies whether source acquisition resolved the evidence gap for
THE NEO BREW / R-09.

## 2. Scope

* evidence acquisition log
* evidence asset inventory
* visual schedule review
* `1:45 / 210g`
* first-pour / bloom
* completion / finish
* filter / equipment
* R-09 mapping
* exact setup / scaling
* runtime decision
* verifier prompt
* regression prompt
* memory handoff
* no runtime changes

## 3. Files changed

* `docs/research/PR-013E-the-neo-brew-evidence-gap-follow-up.md`
* `docs/qa/PR-013E-the-neo-brew-evidence-gap-follow-up.md`
* `docs/research/evidence/PR-013E-the-neo-brew-recipe-card.png`

The evidence asset uses `.png` because the supplied image is a PNG.

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
| Evidence acquisition log included       | Pass   |
| Evidence asset inventory included       | Pass   |
| Evidence image added                    | Pass   |
| Visual schedule review included         | Pass   |
| 1:45 / 210g explicitly checked          | Pass   |
| 1:45 / 210g visible and legible         | Pass   |
| First-pour / bloom semantics addressed  | Pass   |
| Completion / finish semantics addressed | Pass   |
| Filter / equipment semantics addressed  | Pass   |
| R-09 mapping addressed                  | Pass   |
| Exact setup / scaling addressed         | Pass   |
| Evidence not over-promoted              | Pass   |
| App-calculated values separated         | Pass   |
| Missing fields listed if any            | Pass   |
| Runtime decision explicit               | Pass   |
| Independent Verifier Prompt included    | Pass   |
| Regression Checker Prompt included      | Pass   |
| Memory / Handoff included               | Pass   |

## 6. Runtime decision

### Option A: Ready for PR-013F runtime candidate

PR-013F is limited to `ten-pour` / `R-09` at the exact `20g / 300g / 1:15`
setup. It may use only the confirmed ten-step schedule, including
`1:45 / 210g`; about `3:30` as approximate completion/drawdown guidance;
neutral `Pour 1` through `Pour 10` labels; `95-96 C`; extra coarse /
Comandante C40 `40-45` clicks; and HARIO V60 NEO recommended / V60
acceptable.

Filter remains omitted or unresolved. Scaling remains unsupported. Every
non-exact setup must fall back to placeholder guidance. Runtime evidence must
distinguish primary description fields, user-supplied visual evidence,
app-calculated values, and unresolved values. UI caution must state fixed
example only, unofficial, and no affiliation or endorsement.

## 7. Result

Result:
Pass

Blocking issues:
None for PR-013E. PR-013F remains bound by the exact setup, evidence,
placeholder fallback, and UI caution gates.

Non-blocking follow-ups:

* PR-013F: THE NEO BREW Fixed Example Runtime Candidate / Exact Setup Gate
* Keep the filter unresolved or omitted.
* Preserve about `3:30` as approximate guidance and do not invent
  dripper-removal timing.
* Preserve the `user_supplied_visual_evidence_confirmed` classification unless
  independently source-traceable creator-video evidence is later added.
