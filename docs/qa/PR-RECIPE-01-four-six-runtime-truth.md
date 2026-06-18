# PR-RECIPE-01 QA: 4:6 Runtime Truth Alignment

## 1. Status

PASS_WITH_NOTES.

Implementation is limited to 4:6 runtime recipe truth for fixed 20g / 300g / 1:15 examples plus this QA document and the handoff document.

## 2. Source of Truth

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `C:\Users\nagan\Pouro-Fable5\app.js`
- `src/data/placeholderMethods.ts`

## 3. Scope

- Replaced the old R-01 five-pour `60 / 60 / 60 / 60 / 60` candidate with balanced + standard `60 / 60 / 90 / 90`.
- Added exact-gated R-02 sweet + standard runtime recipe values.
- Added exact-gated R-03 bright + standard runtime recipe values.
- Preserved 3:30 as drawdown / finish target guidance, not exact natural completion.
- Preserved unsupported setups as placeholder fallback.

## 4. Out of scope

- Hybrid / HARIO Switch runtime recipe.
- 10 Pour / THE NEO BREW runtime recipe.
- Ice Brew runtime recipe.
- Timer behavior redesign, step auto-advance, and UI redesign.
- History schema, Rebrew semantics, CSV export schema, JSON backup schema.
- PWA manifest, service worker, GitHub Pages config.
- `package.json`, `package-lock.json`, release metadata.

## 5. Changed files

- `src/data/placeholderMethods.ts`
- `docs/qa/PR-RECIPE-01-four-six-runtime-truth.md`
- `docs/design/PR-RECIPE-01-four-six-runtime-truth-HANDOFF.md`

## 6. Existing Pouro-GPT 4:6 model

Current Pouro-GPT uses `src/data/placeholderMethods.ts` for method data, variant data, and `getRecipeForSetup`.

Before this PR, only R-01 returned a fixed recipe for exact `coffeeGrams=20`, `ratio=15`, and `waterGrams=300`. R-02 through R-06 fell back to the method placeholder recipe.

This PR keeps the exact-gated model and expands only the 4:6 gate to R-01/R-02/R-03 for the fixed setup.

## 7. R-01 balanced + standard verification

R-01 maps to balanced + standard.

| Time | Pour | Cumulative |
| --- | ---: | ---: |
| 0:00 | 60g | 60g |
| 0:45 | 60g | 120g |
| 1:30 | 90g | 210g |
| 2:15 | 90g | 300g |
| 3:30 | guidance | 300g |

Verification: PASS.

## 8. R-02 sweet + standard verification

R-02 maps to sweet + standard.

| Time | Pour | Cumulative |
| --- | ---: | ---: |
| 0:00 | 50g | 50g |
| 0:45 | 70g | 120g |
| 1:30 | 90g | 210g |
| 2:15 | 90g | 300g |
| 3:30 | guidance | 300g |

Verification: PASS.

## 9. R-03 bright + standard verification

R-03 maps to bright + standard.

| Time | Pour | Cumulative |
| --- | ---: | ---: |
| 0:00 | 70g | 70g |
| 0:45 | 50g | 120g |
| 1:30 | 90g | 210g |
| 2:15 | 90g | 300g |
| 3:30 | guidance | 300g |

Verification: PASS.

## 10. Placeholder preservation for R-04/R-05/R-06

R-04, R-05, and R-06 remain without fixed `recipe` objects and retain:

- `sourceStatus: "placeholder"`
- `verificationLevel: "placeholder"`
- `valuesArePlaceholder: true`

Verification: PASS.

## 11. History / Rebrew / storage impact

No History schema, storage key, `BrewSetup` shape, `BrewSession` shape, or Rebrew semantics were changed.

The only runtime behavior change is that exact R-02/R-03 20g / 300g / 1:15 setups now resolve to fixed 4:6 recipes instead of the method placeholder recipe.

## 12. Export schema impact

No CSV export schema or JSON backup schema files were changed.

## 13. PWA / service worker impact

No `public/*`, manifest, service worker, Vite config, or GitHub Pages path files were changed.

## 14. Validation commands

| Command | Result |
| --- | --- |
| `npm.cmd ci` | PASS |
| `npm.cmd run build` | PASS |
| `npm.cmd run lint` | NOT AVAILABLE |
| `npm.cmd run typecheck` | NOT AVAILABLE |
| `npm.cmd test` | NOT AVAILABLE |
| `git diff --check` | PASS |
| `git status --short` | PASS_WITH_NOTES: exactly the intended modified data file and two added docs |
| `git diff --name-only` | PASS: three intended files |
| `git diff --stat` | PASS: three intended files |
| Forbidden wording grep | PASS_WITH_NOTES: broad scan found existing baseline disclaimers/lists; diff-specific scan found no introduced restricted claim wording |

## 15. Forbidden wording check

Broad scan found existing baseline legal disclaimers, source-audit notes, and restricted-word lists. A diff-specific scan across this PR found no introduced restricted claim wording.

## 16. Issues found

- Existing Recipe Setup 3x3 matrix UI remains unchanged by scope. R-02/R-03 can still be selected through the existing variation chip list.

## 17. Required fixes

None for PR-RECIPE-01.

## 18. Judgment

PASS_WITH_NOTES.

This PR is safe for independent verification once the final diff checks and forbidden wording grep are rerun on the completed branch.
This PR is safe for independent verification.
