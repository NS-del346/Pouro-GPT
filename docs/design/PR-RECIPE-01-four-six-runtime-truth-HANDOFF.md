# PR-RECIPE-01 Handoff: 4:6 Runtime Truth Alignment

## 1. Status

Implemented. Final validation and Draft PR publication are handled from branch `codex/pr-recipe-01-four-six-runtime-truth`.

## 2. Branch / PR

- Branch: `codex/pr-recipe-01-four-six-runtime-truth`
- PR: Draft PR to be opened after validation

## 3. Commit

Final commit SHA is intentionally not embedded in this file because embedding it would change the commit. Use the PR head SHA and final Codex report as the source of truth.

## 4. Changed files

- `src/data/placeholderMethods.ts`
- `docs/qa/PR-RECIPE-01-four-six-runtime-truth.md`
- `docs/design/PR-RECIPE-01-four-six-runtime-truth-HANDOFF.md`

## 5. Source of Truth references used

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `C:\Users\nagan\Pouro-Fable5\app.js`
- `src/data/placeholderMethods.ts`

## 6. What changed

- Replaced R-01 4:6 fixed recipe steps with balanced + standard `60 / 60 / 90 / 90`.
- Added R-02 sweet + standard fixed recipe `50 / 70 / 90 / 90`.
- Added R-03 bright + standard fixed recipe `70 / 50 / 90 / 90`.
- Added a shared 4:6 standard fixed-example builder inside `placeholderMethods.ts`.
- Expanded `getRecipeForSetup` so only exact R-01/R-02/R-03 `20g / 300g / 1:15` setups return fixed recipes.

## 7. What did not change

- Hybrid / HARIO Switch.
- 10 Pour / THE NEO BREW.
- Ice Brew.
- Timer UI, timer auto-advance, and step progression logic.
- History, Rebrew, storage, export, PWA, package, and lockfile behavior.
- R-04/R-05/R-06 placeholder status.

## 8. Variant mapping

- R-01: 4:6 balanced + standard.
- R-02: 4:6 sweet + standard.
- R-03: 4:6 bright + standard.
- R-04/R-05/R-06: placeholder / needs_review, no invented runtime recipes.

## 9. Runtime recipe values

| Variant | 0:00 | 0:45 | 1:30 | 2:15 | 3:30 |
| --- | ---: | ---: | ---: | ---: | --- |
| R-01 | 60g / 60g | 60g / 120g | 90g / 210g | 90g / 300g | guidance |
| R-02 | 50g / 50g | 70g / 120g | 90g / 210g | 90g / 300g | guidance |
| R-03 | 70g / 70g | 50g / 120g | 90g / 210g | 90g / 300g | guidance |

`3:30` remains drawdown / finish target guidance.

## 10. Storage / schema status

No storage schema, localStorage key, `BrewSetup`, `BrewSession`, History, Rebrew, CSV export, or JSON backup schema was changed.

## 11. PWA status

No manifest, service worker, `public/*`, Vite config, or GitHub Pages base path file was changed.

## 12. QA results

- `npm.cmd ci`: PASS.
- `npm.cmd run build`: PASS.
- Optional lint/typecheck/test scripts: NOT AVAILABLE in `package.json`.
- `git diff --check`: PASS.
- `git diff --name-only`: PASS, three intended files.
- `git diff --stat`: PASS, three intended files.
- Forbidden wording grep: PASS_WITH_NOTES; broad scan found existing baseline disclaimers/lists, and diff-specific scan found no introduced restricted claim wording.

## 13. Known limitations

- Only standard strength is implemented.
- R-04/R-05/R-06 remain placeholders.
- Arbitrary dose/ratio scaling falls back to the placeholder recipe.
- Recipe Setup matrix UI remains unchanged; R-02/R-03 are reachable through existing variation chips.

## 14. Required fixes

None known.

## 15. Next recommended step

Independent Verification.
