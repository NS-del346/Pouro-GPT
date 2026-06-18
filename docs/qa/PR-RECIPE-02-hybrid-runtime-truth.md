# PR-RECIPE-02 QA: Hybrid Runtime Truth Alignment

## 1. Status

PASS_WITH_NOTES.

The Hybrid R-08 exact runtime candidate was aligned to the Fable5 Hybrid formula for exact `20g / 300g / 1:15`. Two small UI copy lines were also updated because the existing Recipe Setup and Brew Timer text still described the old `40-50g` Hybrid candidate. No UI layout, timer state, storage, export, PWA, package, or service worker behavior was changed.

## 2. Source of Truth

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `C:\Users\nagan\Pouro-Fable5\app.js`
- `src/data/placeholderMethods.ts`

## 3. Scope

- Hybrid / R-08 / HARIO Switch exact runtime recipe only.
- Exact fixed setup: `20g / 300g / 1:15`.
- Fable5 formula: `h1 = round(totalWater * 3 / 14)`, `h2 = round(totalWater * 3 / 14)`, `h3 = totalWater - h1 - h2`.
- Visible Switch `OPEN` / `CLOSED` text in runtime step copy.
- 3:00 kept as target / finish guidance, not guaranteed completion.
- Stale setup/timer copy updated from old `40-50g` wording to `64g / 64g / 172g`.

## 4. Out of scope

- 4:6 runtime recipe.
- 10 Pour / THE NEO BREW runtime recipe.
- Ice Brew runtime recipe.
- Timer behavior redesign, step auto-advance, and UI redesign.
- History schema, Rebrew semantics, CSV export schema, JSON backup schema.
- PWA manifest, service worker, GitHub Pages config.
- `package.json`, `package-lock.json`, release metadata.
- Grinder Equivalency Engine.

## 5. Changed files

- `src/data/placeholderMethods.ts`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `docs/qa/PR-RECIPE-02-hybrid-runtime-truth.md`
- `docs/design/PR-RECIPE-02-hybrid-runtime-truth-HANDOFF.md`

## 6. Existing Pouro-GPT Hybrid model

Pouro-GPT stores Hybrid runtime data in `src/data/placeholderMethods.ts`.

Before this PR, `hybridR08FixedExampleRecipe` used the older fixed example:

- `40-50g` first pour range.
- Cumulative `120g`, `200g`, and `300g` targets.
- Open/close guidance around `0:45`, `1:30`, `2:10`, and `2:45`.
- About `3:30` target and observed `3:34` removal references.

The existing exact gate in `getRecipeForSetup` was already correct and remains unchanged:

- `method.id === "hybrid"`
- `setup.methodId === "hybrid"`
- `setup.variantId === "R-08"`
- `setup.coffeeGrams === 20`
- `setup.ratio === 15`
- `setup.waterGrams === 300`

## 7. R-08 Hybrid formula verification

For exact `20g / 300g / 1:15`:

| Field | Calculation | Result |
| --- | --- | ---: |
| `totalWater` | `round(20 * 15)` | `300g` |
| `h1` | `round(300 * 3 / 14)` | `64g` |
| `h2` | `round(300 * 3 / 14)` | `64g` |
| `h3` | `300 - 64 - 64` | `172g` |

Verification: PASS.

## 8. R-08 Hybrid timing verification

| Time | Step | Pour | Cumulative |
| --- | --- | ---: | ---: |
| `0:00` | 第1投 / Switch OPEN | `64g` | `64g` |
| `0:30` | 第2投 / Switch OPEN | `64g` | `128g` |
| `1:15` | 第3投 / Switch CLOSED | `172g` | `300g` |
| `1:45` | Switch OPEN / 落とし切り | no water | `300g` |
| `3:00` | target / finish guidance | guidance | `300g` |

Verification: PASS.

## 9. Switch OPEN / CLOSED verification

- Step 1 title/action/instruction includes `Switch OPEN`.
- Step 2 title/action/instruction includes `Switch OPEN` and says to close after pouring.
- Step 3 title/action/instruction includes `Switch CLOSED`.
- Step 4 title/action/instruction includes `Switch OPEN` and no water.
- Recipe Setup and Brew Timer copy both mention `Switch OPEN/CLOSED` as text.

Verification: PASS.

## 10. Room-temperature water wording verification

No fixed room-temperature water amount was added.

App-facing copy states that the room-temperature water amount and temperature are not fixed. It does not introduce a fixed amount.

Verification: PASS.

## 11. Liquid-temperature wording verification

`70-80°C` remains liquid-temperature guidance only.

It is not represented as an initial water temperature, not represented as a fixed room-temperature water temperature, and not used to calculate water amount.

Verification: PASS.

## 12. History / Rebrew / storage impact

No History schema, storage key, `BrewSetup` shape, `BrewSession` shape, or Rebrew semantics were changed.

Existing saved sessions will continue to store the method snapshot they were created with. New exact R-08 sessions will use the updated runtime recipe snapshot.

## 13. Export schema impact

No CSV export schema or JSON backup schema files were changed.

## 14. PWA / service worker impact

No `public/*`, manifest, service worker, Vite config, or GitHub Pages path files were changed.

## 15. Validation commands

| Command | Result |
| --- | --- |
| `git status --short` | PASS_WITH_NOTES: intended source/docs changes only |
| `git diff --name-only` | PASS_WITH_NOTES: includes two required app-copy files |
| `git diff --stat` | PASS_WITH_NOTES: narrow Hybrid runtime/copy/docs diff |
| `npm.cmd ci` | PASS |
| `npm.cmd run build` | PASS |
| `npm.cmd run lint` | NOT AVAILABLE |
| `npm.cmd run typecheck` | NOT AVAILABLE |
| `npm.cmd test` | NOT AVAILABLE |
| `git diff --check` | PASS |
| Forbidden wording grep | PASS_WITH_NOTES: broad scan finds existing historical docs/baseline disclaimers; diff-specific scan introduces no restricted product claim |

Mobile smoke QA:

| Viewport | Route | Result |
| --- | --- | --- |
| `375x667` | `/Pouro-GPT/setup/hybrid` -> `/Pouro-GPT/timer` | PASS: `64g / 64g / 172g` and `Switch OPEN/CLOSED` copy visible; first timer step shows `第1投 / Switch OPEN`; scroll width `375/375`; start CTA reachable |
| `390x844` | `/Pouro-GPT/setup/hybrid` -> `/Pouro-GPT/timer` | PASS: `64g / 64g / 172g` and `Switch OPEN/CLOSED` copy visible; first timer step shows `第1投 / Switch OPEN`; scroll width `390/390`; start CTA reachable |

## 16. Forbidden wording check

Broad scans may find existing historical QA/research text and baseline non-affiliation disclaimers. This PR does not introduce restricted product claims about source status, source approval, or guaranteed brew outcomes.

## 17. Issues found

- The initial diagnosis expected only three files, but source inspection found stale Hybrid exact-copy in Recipe Setup and Brew Timer. Leaving those lines unchanged would display the old `40-50g` model beside the new `64g / 64g / 172g` runtime data.

## 18. Required fixes

None known.

## 19. Judgment

PASS_WITH_NOTES.

The implementation is safe for independent verification. The note is for the intentional addition of two directly required app-copy files beyond the original three-file diagnosis list.
