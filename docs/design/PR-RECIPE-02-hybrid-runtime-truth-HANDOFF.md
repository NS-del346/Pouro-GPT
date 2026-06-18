# PR-RECIPE-02 Handoff: Hybrid Runtime Truth Alignment

## 1. Status

Implemented. Final validation and Draft PR publication are handled from branch `codex/pr-recipe-02-hybrid-runtime-truth`.

## 2. Branch / PR

- Branch: `codex/pr-recipe-02-hybrid-runtime-truth`
- PR: Draft PR to be opened after validation

## 3. Commit

Final commit SHA is intentionally not embedded in this file because embedding it would change the commit. Use the PR head SHA and final Codex report as the source of truth.

## 4. Changed files

- `src/data/placeholderMethods.ts`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `docs/qa/PR-RECIPE-02-hybrid-runtime-truth.md`
- `docs/design/PR-RECIPE-02-hybrid-runtime-truth-HANDOFF.md`

## 5. Source of Truth references used

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `C:\Users\nagan\Pouro-Fable5\app.js`
- `src/data/placeholderMethods.ts`

## 6. What changed

- Replaced the older Hybrid R-08 fixed runtime sequence with the Fable5-aligned `64g / 64g / 172g` sequence.
- Preserved the exact `20g / 300g / 1:15` setup gate.
- Added a local Fable5 evidence marker for Hybrid field evidence.
- Updated exact Hybrid setup/timer copy that still referenced the old `40-50g` candidate.
- Changed Hybrid finish guidance from about `3:30` / observed `3:34` to `3:00` target guidance.

## 7. What did not change

- 4:6 Method runtime data.
- 10 Pour / THE NEO BREW runtime data.
- Ice Brew runtime data.
- Timer state machine, auto-advance, layout, and controls.
- History, Rebrew, localStorage, CSV export, JSON backup schema.
- PWA manifest, service worker, `public/*`, package files, and Vite config.
- POINT/TIPS data and selection logic.

## 8. Runtime recipe values

| Time | Action | Pour | Cumulative |
| --- | --- | ---: | ---: |
| `0:00` | 第1投 / Switch OPEN | `64g` | `64g` |
| `0:30` | 第2投 / Switch OPEN, then close | `64g` | `128g` |
| `1:15` | 第3投 / Switch CLOSED | `172g` | `300g` |
| `1:45` | Switch OPEN / 落とし切り | no water | `300g` |
| `3:00` | target / finish guidance | guidance | `300g` |

## 9. Switch state handling

Switch state is visible in text:

- `Switch OPEN` appears in the first pour.
- `Switch OPEN` appears in the second pour, with close-after-pour instruction.
- `Switch CLOSED` appears in the third pour.
- `Switch OPEN` appears in the drawdown step.

State is not represented by color alone.

## 10. Storage / schema status

No storage schema changed.

Existing History/Rebrew data remains compatible. New exact R-08 sessions will snapshot the updated recipe data through the existing session flow.

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
- Forbidden wording grep: PASS_WITH_NOTES; broad scan finds existing historical docs/baseline disclaimers, and diff-specific scan introduces no restricted product claim.
- Mobile smoke QA at `375x667`: PASS; Hybrid setup/timer showed `64g / 64g / 172g`, `Switch OPEN/CLOSED`, `第1投 / Switch OPEN`, no horizontal overflow, and reachable start CTA.
- Mobile smoke QA at `390x844`: PASS; Hybrid setup/timer showed `64g / 64g / 172g`, `Switch OPEN/CLOSED`, `第1投 / Switch OPEN`, no horizontal overflow, and reachable start CTA.

## 13. Known limitations

- Source-backed Hybrid remains limited to exact `20g / 300g / 1:15`.
- Arbitrary dose/ratio scaling still falls back to the placeholder recipe.
- Initial water temperature remains unresolved.
- `70-80°C` remains liquid-temperature guidance only.
- Room-temperature water amount and temperature are not fixed.

## 14. Required fixes

None known.

## 15. Next recommended step

Independent Verification.
