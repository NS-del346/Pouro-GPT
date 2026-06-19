# PR-RECIPE-03 Handoff: Ice Brew Runtime Truth Alignment

## 1. Status

Implemented. Final validation and Draft PR publication are handled from branch `codex/pr-recipe-03-ice-runtime-truth`.

## 2. Branch / PR

- Branch: `codex/pr-recipe-03-ice-runtime-truth`
- PR: Draft PR to be opened after validation

## 3. Commit

Final commit SHA is intentionally not embedded in this file because embedding it would change the commit. Use the PR head SHA and final Codex report as the source of truth.

## 4. Changed files

- `src/data/placeholderMethods.ts`
- `docs/qa/PR-RECIPE-03-ice-runtime-truth.md`
- `docs/design/PR-RECIPE-03-ice-runtime-truth-HANDOFF.md`

## 5. Source of Truth references used

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `C:\Users\nagan\Pouro-Fable5\app.js`
- `src/data/placeholderMethods.ts`

## 6. What changed

- Added an R-10 Ice Brew fixed runtime recipe for exact `20g / HOT 150g / ICE 80g`.
- Added five `30g HOT` timer pour steps at `0:00`, `0:30`, `1:00`, `1:30`, and `2:00`.
- Added a no-water `3:00` chill / finish guidance row.
- Added an exact `getRecipeForSetup` gate for `methodId=ice-brew`, `variantId=R-10`, `coffeeGrams=20`, `hotWaterGrams=150`, and `iceGrams=80`.
- Linked the R-10 variant to the fixed recipe while keeping caution metadata.

## 7. What did not change

- 4:6 runtime data.
- Hybrid runtime data.
- 10 Pour / THE NEO BREW runtime data.
- Timer state machine, auto-advance, layout, and controls.
- Recipe Setup layout and field model.
- History, Rebrew, localStorage, CSV export, JSON backup schema.
- PWA manifest, service worker, `public/*`, package files, and Vite config.
- POINT/TIPS data and selection logic.

## 8. Runtime recipe values

| Field | Value |
| --- | ---: |
| Coffee | `20g` |
| HOT water | `150g` |
| ICE | `80g` |
| Beverage water equivalent | `230g` |
| Active timer target | `150g HOT only` |
| HOT pours | `30g x 5` |
| Chill / finish guidance | `3:00` |

| Time | Action | Pour | Cumulative HOT |
| --- | --- | ---: | ---: |
| `0:00` | `第1投 / HOT` | `30g` | `30g` |
| `0:30` | `第2投 / HOT` | `30g` | `60g` |
| `1:00` | `第3投 / HOT` | `30g` | `90g` |
| `1:30` | `第4投 / HOT` | `30g` | `120g` |
| `2:00` | `第5投 / HOT` | `30g` | `150g` |
| `3:00` | chill / finish guidance | no water | `150g` |

## 9. HOT / ICE handling

`waterGrams`, `totalWaterGrams`, and `cumulativeWaterGrams` in the R-10 recipe represent active HOT water only. ICE remains pre-set server ice through existing `recommendedIceGrams` / `setup.iceGrams` metadata and is not counted as poured water.

The timer target remains `150g HOT`, not `230g`.

## 10. Storage / schema status

No storage schema changed.

The implementation does not add persisted fields. It uses existing `BrewSetup.hotWaterGrams`, `BrewSetup.iceGrams`, `BrewVariant.recommendedHotWaterGrams`, and `BrewVariant.recommendedIceGrams`.

## 11. PWA status

No PWA file changed.

No manifest, service worker, `public/*`, Vite base path, or GitHub Pages configuration was touched.

## 12. QA results

- `npm.cmd ci`: PASS.
- `npm.cmd run build`: PASS.
- `npm.cmd run lint`: NOT AVAILABLE.
- `npm.cmd run typecheck`: NOT AVAILABLE.
- `npm.cmd test`: NOT AVAILABLE.
- `git diff --check`: PASS.
- Forbidden wording grep: PASS_WITH_NOTES; `grep` is not installed locally, so an `rg` equivalent was used. Broad scan finds existing historical docs/baseline wording and QA forbidden-word lists; diff-specific scan only finds the QA verification sentence and no app/product copy claim.
- Mobile smoke QA at `375x667`: PASS; Ice setup/timer showed HOT `150g`, ICE `80g`, first target `30g`, final HOT target `150g`, and no horizontal overflow.
- Mobile smoke QA at `390x844`: PASS; Ice setup/timer showed HOT `150g`, ICE `80g`, first target `30g`, final HOT target `150g`, and no horizontal overflow.

## 13. Known limitations

- Exact R-10 fixed recipe selection is limited to `20g / HOT 150g / ICE 80g`.
- Arbitrary Ice scaling still falls back to the placeholder recipe.
- The existing `BrewRecipe` type has no recipe-level HOT/ICE fields, so active timer fields represent HOT water only and ICE stays in existing metadata.
- 3:00 remains chill / finish guidance, not exact natural completion.

## 14. Required fixes

None known.

## 15. Next recommended step

Independent Verification.
