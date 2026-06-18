# PR-RECIPE-03 QA: Ice Brew Runtime Truth Alignment

## 1. Status

PASS_WITH_NOTES.

R-10 Ice Brew now has an exact-gated runtime recipe for `20g / HOT 150g / ICE 80g`. The note is that the existing `BrewRecipe` shape does not have dedicated HOT/ICE fields, so the recipe uses `waterGrams`, `totalWaterGrams`, and `cumulativeWaterGrams` for active HOT water only. ICE remains in existing setup/variant metadata and is not counted as poured water.

## 2. Source of Truth

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `C:\Users\nagan\Pouro-Fable5\app.js`
- `src/data/placeholderMethods.ts`

## 3. Scope

- R-10 / Ice Brew runtime recipe truth only.
- Exact setup: `coffeeGrams=20`, `hotWaterGrams=150`, `iceGrams=80`.
- Fable5 formula: `hotWater = round(dose * 7.5)`, `ice = round(dose * 4)`.
- HOT-only timer cumulative target.
- ICE documented and surfaced as pre-set server ice through the existing setup/timer metadata.
- QA and handoff docs.

## 4. Out of scope

- 4:6 runtime recipe.
- Hybrid runtime recipe.
- 10 Pour / THE NEO BREW runtime recipe.
- Timer behavior redesign, step auto-advance, and UI redesign.
- History schema, Rebrew semantics, CSV export schema, JSON backup schema.
- PWA manifest, service worker, GitHub Pages config.
- `package.json`, `package-lock.json`, release metadata.
- Grinder, POINT/TIPS data, and source metadata suppression rules.

## 5. Changed files

- `src/data/placeholderMethods.ts`
- `docs/qa/PR-RECIPE-03-ice-runtime-truth.md`
- `docs/design/PR-RECIPE-03-ice-runtime-truth-HANDOFF.md`

## 6. Existing Pouro-GPT Ice model

Before this PR, R-10 already stored:

| Field | Value |
| --- | ---: |
| `recommendedCoffeeGrams` | `20` |
| `recommendedHotWaterGrams` | `150` |
| `recommendedIceGrams` | `80` |
| `recommendedWaterGrams` | `null` |
| `recommendedRatio` | `null` |

Recipe Setup already saves `hotWaterGrams` and `iceGrams` for Ice Brew. Brew Timer already calls `getRecipeForSetup(method, setup)` and shows an Ice pre-set chip from `setup.iceGrams`.

The missing piece was an exact R-10 recipe gate and HOT-only runtime step schedule.

## 7. R-10 Ice formula verification

For exact `dose = 20g`:

| Field | Calculation | Result |
| --- | --- | ---: |
| `hotWater` | `round(20 * 7.5)` | `150g` |
| `ice` | `round(20 * 4)` | `80g` |
| beverage water equivalent | `150 + 80` | `230g` |
| timer target | HOT only | `150g` |

Verification: PASS.

## 8. R-10 Ice timing verification

| Time | Step | Pour | Cumulative HOT |
| --- | --- | ---: | ---: |
| `0:00` | `第1投 / HOT` | `30g HOT` | `30g` |
| `0:30` | `第2投 / HOT` | `30g HOT` | `60g` |
| `1:00` | `第3投 / HOT` | `30g HOT` | `90g` |
| `1:30` | `第4投 / HOT` | `30g HOT` | `120g` |
| `2:00` | `第5投 / HOT` | `30g HOT` | `150g` |
| `3:00` | `急冷・完成` | no water | `150g` |

Verification: PASS.

## 9. HOT / ICE separation verification

- Active timer steps use `pourGrams=30` only for HOT pours.
- Active timer steps use HOT-only `totalWaterGrams` / `cumulativeWaterGrams`.
- R-10 variant metadata keeps `recommendedHotWaterGrams=150` and `recommendedIceGrams=80`.
- Exact recipe copy states ICE `80g` is pre-set in the server.
- The final 3:00 guidance row uses `pourGrams=null`.

Verification: PASS.

## 10. Timer cumulative target verification

The R-10 exact recipe never stores `230g` in active timer target fields.

| Step | `totalWaterGrams` | `cumulativeWaterGrams` |
| --- | ---: | ---: |
| 1 | `30` | `30` |
| 2 | `60` | `60` |
| 3 | `90` | `90` |
| 4 | `120` | `120` |
| 5 | `150` | `150` |
| 6 | `150` | `150` |

Verification: PASS.

## 11. Ice pre-set wording verification

Recipe Setup already displays the Ice input separately from HOT water. Brew Timer already displays an Ice pre-set chip from `setup.iceGrams`.

The new runtime recipe also includes step text stating that `ICE 80g` is pre-set in the server and that no additional HOT water is poured at 3:00.

Verification: PASS.

## 12. History / Rebrew / storage impact

No History schema, storage key, `BrewSetup` shape, `BrewSession` shape, or Rebrew semantics were changed.

Existing saved sessions remain compatible. New exact R-10 sessions snapshot the fixed runtime recipe through the existing timer/session flow.

## 13. Export schema impact

No CSV export schema or JSON backup schema files were changed.

## 14. PWA / service worker impact

No `public/*`, manifest, service worker, Vite config, or GitHub Pages path files were changed.

## 15. Validation commands

| Command | Result |
| --- | --- |
| `git status --short` | PASS_WITH_NOTES: intended source/docs changes only |
| `git diff --name-only` | PASS: three intended files |
| `git diff --stat` | PASS: narrow Ice runtime/docs diff |
| `npm.cmd ci` | PASS |
| `npm.cmd run build` | PASS |
| `npm.cmd run lint` | NOT AVAILABLE |
| `npm.cmd run typecheck` | NOT AVAILABLE |
| `npm.cmd test` | NOT AVAILABLE |
| `git diff --check` | PASS |
| Forbidden wording grep | PASS_WITH_NOTES: `grep` is not installed locally; `rg` equivalent broad scan finds existing docs/baseline wording and QA forbidden-word lists; diff-specific scan only finds the QA verification sentence and no app/product copy claim |

Mobile smoke QA:

| Viewport | Route | Result |
| --- | --- | --- |
| `375x667` | `/Pouro-GPT/setup/ice-brew` -> `/Pouro-GPT/timer` | PASS: HOT `150g`, ICE `80g`, first timer target `30g`, final target `150g`, no horizontal overflow |
| `390x844` | `/Pouro-GPT/setup/ice-brew` -> `/Pouro-GPT/timer` | PASS: HOT `150g`, ICE `80g`, first timer target `30g`, final target `150g`, no horizontal overflow |

## 16. Forbidden wording check

`grep` is not installed in this PowerShell environment, so an `rg` equivalent scan was used. Broad scans may find existing historical docs, baseline disclaimers, or this QA forbidden-word verification list. This PR does not introduce restricted product claims about endorsement, supervision, certification, complete reproduction, or guaranteed brew outcomes.

## 17. Issues found

- The existing `BrewRecipe` type cannot express HOT and ICE as separate recipe-level fields. The implementation avoids schema changes by storing active timer water as HOT only and keeping ICE in existing variant/setup metadata.

## 18. Required fixes

None known.

## 19. Judgment

PASS_WITH_NOTES.

The implementation is safe for independent verification. The note is for the existing recipe type limitation, not for a runtime defect.
