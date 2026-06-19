# PR-RECIPE-04 Handoff: Method Detail / Source / Legal Copy Alignment

## 1. Status

Implemented. Final validation, commit SHA, Draft PR URL, and GitHub Actions status are recorded in the final Codex implementation report.

## 2. Branch / PR

- Branch: `codex/pr-recipe-04-method-source-legal-copy`
- PR: Draft PR to be opened after final validation and push

## 3. Commit

Final commit SHA is intentionally not embedded in this file because embedding it would change the commit. Use the PR head SHA and final Codex report as the source of truth.

## 4. Changed files

- `src/data/placeholderMethods.ts`
- `src/pages/SourcesPage.tsx`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `docs/qa/PR-RECIPE-04-method-source-legal-copy.md`
- `docs/design/PR-RECIPE-04-method-source-legal-copy-HANDOFF.md`

## 5. Source of Truth references

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `docs/qa/PR-RECIPE-01-four-six-runtime-truth.md`
- `docs/design/PR-RECIPE-01-four-six-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-02-hybrid-runtime-truth.md`
- `docs/design/PR-RECIPE-02-hybrid-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-03-ice-runtime-truth.md`
- `docs/design/PR-RECIPE-03-ice-runtime-truth-HANDOFF.md`
- Active app files named in the PR prompt

## 6. Active copy audited

- `src/data/placeholderMethods.ts`
- `src/pages/SourcesPage.tsx`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `src/pages/BrewHomePage.tsx`
- `src/pages/BrewFinishPage.tsx`
- `src/pages/HistoryDetailPage.tsx`
- `src/utils/sourceStatus.ts`
- `src/types/source.ts`
- `NOTICE.md`

## 7. What changed

- Method descriptions now name the supported fixed examples instead of treating every recipe as generic placeholder data.
- Exact-gated variants R-01/R-02/R-03/R-08/R-09/R-10 no longer use the variant-level placeholder flag; caution remains through `needsReview` and `unverified`.
- Recipe Setup copy now aligns R-01/R-02/R-03 standard fixed examples without expanding the 4:6 matrix interaction, and adds R-10 HOT/ICE guidance.
- Brew Timer now shows fixed-example caution copy for R-01/R-02/R-03 and R-10.
- Sources page now explains source-backed, app-calculated, app-guidance, unresolved, needsReview, unverified, and placeholder states and preserves existing source links.
- QA and handoff docs were added.

## 8. What did not change

- Runtime recipe values.
- Runtime step arrays.
- `getRecipeForSetup` gate conditions.
- Timer state machine, auto-advance, controls, and audio.
- History, Rebrew, storage, export, persisted fields, or schemas.
- Type definitions.
- POINT/TIPS, Grinder, PWA, service worker, package files, route structure, or visual redesign.
- Existing historical docs, QA docs, or research records.

## 9. Method-by-method copy status

- 4:6: R-01/R-02/R-03 fixed-example copy shows `60/60/90/90`, `50/70/90/90`, and `70/50/90/90`; the 3x3 matrix remains R-01-only, R-02/R-03 remain reachable through the existing variant selector, and R-04/R-05/R-06 remain unresolved.
- Hybrid: R-08 remains exact `64g / 64g / 172g`, Switch `OPEN/CLOSED`, `70-80°C` liquid-temperature guidance, and `3:00` finish guidance.
- NEO: R-09 remains 10 pours, `1:45 / 210g`, `2:30 / 300g`, and approximate `3:30` drawdown / finish guidance.
- Ice: R-10 remains `HOT 150g / ICE 80g`, active timer HOT-only `150g`, and `3:00` chill / finish guidance; `230g` is beverage-water equivalent only.

## 10. Source-status handling

`sourceStatus`, `verificationLevel`, and `fieldEvidence` types were not changed. Exact-gated implemented recipes are separated from true placeholder data, while `needsReview` / `unverified` continue to signal caution and non-finality.

## 11. Legal / attribution handling

No endorsement, supervision, certification, partnership, or guaranteed-result claim was introduced. Active recipe copy uses concise non-affiliation language. Existing global legal/about/settings disclaimers were preserved.

## 12. Historical document preservation

Existing historical QA, design, and research documents were not modified. Historical stale values remain historical records.

## 13. Storage / schema status

No storage schema, localStorage key, `BrewSetup`, `BrewSession`, History, Rebrew, CSV export, JSON backup, or persisted field changed.

## 14. PWA status

No PWA file changed. Manifest, service worker, `public/*`, Vite config, and GitHub Pages base-path files were not touched.

## 15. QA results

- `npm.cmd ci`: PASS.
- `npm.cmd run build`: PASS.
- `npm.cmd run lint`: NOT AVAILABLE.
- `npm.cmd run typecheck`: NOT AVAILABLE.
- `npm.cmd test`: NOT AVAILABLE.
- `git diff --check`: PASS.
- Active-source stale-copy scan: PASS_WITH_NOTES.
- Historical-doc scan: PASS_WITH_NOTES.
- Mobile copy QA at `375x667`: PASS.
- Mobile copy QA at `390x844`: PASS.

## 16. Known limitations

- Fixed examples remain narrow exact gates.
- Arbitrary dose / ratio / HOT-ICE scaling remains unsupported.
- Method-level fallback recipes remain placeholder where exact setup gates do not apply.
- Existing legal/about/settings pages were not rewritten because they were not in the allowed file list and were not contradictory.

## 17. Required fixes

None known.

## 18. Recipe Truth Refresh closeout status

Ready to close after merge, assuming independent verification and GitHub Actions pass.

## 19. Next recommended step

Independent Verification.
