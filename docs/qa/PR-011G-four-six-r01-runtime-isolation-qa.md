# PR-011G: 4:6 R-01 Runtime Isolation QA

## 1. Purpose

This PR verifies the PR-011F 4:6 R-01 runtime implementation before any
additional recipe or method expansion.

## 2. Scope

* 4:6 R-01 runtime isolation.
* Non-exact R-01 fallback.
* R-02 through R-06 placeholder safety.
* Hybrid, 10 Pour Method, and Ice Brew unchanged.
* No new runtime data.
* No new method schedules.
* No Brew Timer state-machine rewrite.

## 3. Files changed

* `docs/qa/PR-011G-four-six-r01-runtime-isolation-qa.md`

This is docs-only QA evidence. No source files changed.

## 4. Runtime isolation checks

| Scenario                      | Expected behavior                          | Result |
| ----------------------------- | ------------------------------------------ | ------ |
| 4:6 R-01 / 20g / 1:15 / 300g | Source-backed five-pour candidate is used  | Pass   |
| 4:6 R-01 / non-20g            | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-01 / non-1:15           | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-01 / non-300g           | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-02                      | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-03                      | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-04                      | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-05                      | Placeholder-safe recipe is used            | Pass   |
| 4:6 R-06                      | Placeholder-safe recipe is used            | Pass   |
| Hybrid                        | Existing placeholder-safe behavior remains | Pass   |
| 10 Pour                       | Existing placeholder-safe behavior remains | Pass   |
| Ice Brew                      | Existing placeholder-safe behavior remains | Pass   |

`getRecipeForSetup` was inspected directly. It returns the R-01
variant-scoped recipe only when the method, setup method, variant, coffee,
ratio, and water guards exactly match `four-six`, `four-six`, `R-01`, `20`,
`15`, and `300`. Each mismatch returns the selected method's own placeholder
recipe. The independent non-300g fallback is confirmed by the explicit
`setup.waterGrams !== 300` guard; Recipe Setup derives water from coffee and
ratio, so that mismatch is not independently editable in the current UI.

## 5. Runtime data checks

| Check                                                               | Result |
| ------------------------------------------------------------------- | ------ |
| No new runtime values added in PR-011G                              | Pass   |
| No new schedules added in PR-011G                                   | Pass   |
| R-02 through R-06 unchanged                                         | Pass   |
| Hybrid unchanged                                                    | Pass   |
| 10 Pour unchanged                                                   | Pass   |
| Ice Brew unchanged                                                  | Pass   |
| No sourceStatus weakening                                           | Pass   |
| No verificationLevel weakening                                      | Pass   |
| No valuesArePlaceholder weakening outside PR-011F R-01 recipe scope | Pass   |
| fieldEvidence for PR-011F R-01 fields remains present               | Pass   |

The method-level 4:6 caution remains `sourceStatus: "placeholder"`,
`verificationLevel: "placeholder"`, and `valuesArePlaceholder: true`. R-01
also remains placeholder-cautioned at variant level. Only its exact
variant-scoped recipe has `valuesArePlaceholder: false`. Its source-backed
candidate steps remain `needsReview` / `unverified` at container level and
retain field-level evidence. R-02 through R-06 remain placeholder-cautioned
without runtime recipes.

## 6. Brew Timer display checks

| Check                                                            | Result |
| ---------------------------------------------------------------- | ------ |
| Exact R-01 shows five pour steps                                 | Pass   |
| Exact R-01 shows 60g per pour                                    | Pass   |
| Exact R-01 shows cumulative 60 / 120 / 180 / 240 / 300g          | Pass   |
| Exact R-01 shows 03:30 as dripper removal                        | Pass   |
| Exact R-01 does not claim guaranteed natural drawdown completion | Pass   |
| Non-exact R-01 remains placeholder-safe                          | Pass   |
| R-02 through R-06 remain placeholder-safe                        | Pass   |
| No undefined/null/NaN/--g displayed                              | Pass   |
| Pause / Resume works                                             | Pass   |
| Next step works                                                  | Pass   |
| Back works                                                       | Pass   |
| Finish works                                                     | Pass   |
| BottomTabs remain hidden on Brew Timer                           | Pass   |

The exact R-01 sequence displayed five `60g` pours with cumulative targets of
`60g`, `120g`, `180g`, `240g`, and `300g`. The final step and next-action
preview describe `03:30` as removing the dripper and explicitly state that it
does not guarantee natural drawdown completion.

## 7. Manual mobile QA

| Viewport | Scenario                 | Result | Notes |
| -------- | ------------------------ | ------ | ----- |
| 375x667  | R-01 exact setup         | Pass   | Five-pour candidate displayed; controls usable. |
| 375x667  | R-01 non-exact setup     | Pass   | Placeholder-safe schedule displayed. |
| 375x667  | R-02 placeholder setup   | Pass   | Placeholder-safe schedule displayed. |
| 375x667  | Hybrid placeholder setup | Pass   | Hybrid placeholder schedule displayed. |
| 390x844  | R-01 exact setup         | Pass   | Five-pour candidate displayed; controls usable. |
| 390x844  | R-01 non-exact setup     | Pass   | Placeholder-safe schedule displayed. |
| 390x844  | R-02 placeholder setup   | Pass   | Placeholder-safe schedule displayed. |
| 390x844  | Hybrid placeholder setup | Pass   | Hybrid placeholder schedule displayed. |

Additional focused checks:

* R-03 through R-06, 10 Pour Method, and Ice Brew were verified at `375x667`
  and remained placeholder-safe.
* No horizontal overflow was observed.
* No browser console warnings or errors were observed.
* The UI remained usable at iPhone SE width.

## 8. Verification commands

| Command             | Result                             |
| ------------------- | ---------------------------------- |
| `npm.cmd run build` | Pass                               |
| `git diff --check`  | Pass                               |
| `git status`        | Expected changed docs only         |

PR-011F's diff against PR-011E was also inspected. It is limited to the
variant-scoped recipe model, R-01 runtime candidate, Brew Timer selection and
display treatment, data export, and its QA document. It contains no route,
storage, PWA, workflow, package, release-doc, or dist changes.

## 9. Decision

### Pass - PR-011F isolation confirmed

No R-01 runtime leakage, timer regression, or placeholder-safety issue was
found. No code fix is required.

## 10. Recommended next PR

Recommended next PR:

* PR-011H: 4:6 R-01 Source Transparency UI Copy Polish

Do not implement R-02 through R-06 until their evidence is reviewed.

## 11. Out of scope

* No runtime recipe data changes.
* No method schedule changes.
* No timer state-machine changes.
* No storage migration.
* No route changes.
* No release docs changes.
