# PR-RECIPE-04 QA: Method Detail / Source / Legal Copy Alignment

## 1. Status

PASS_WITH_NOTES.

Active app-facing method, variant, source-status, and caution copy now matches the runtime truth from PR-RECIPE-01 through PR-RECIPE-03. Runtime recipes, step timing, setup gates, types, History, Rebrew, export, PWA, package files, and historical QA/research records were not changed.

## 2. Source of Truth

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `docs/qa/PR-RECIPE-01-four-six-runtime-truth.md`
- `docs/design/PR-RECIPE-01-four-six-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-02-hybrid-runtime-truth.md`
- `docs/design/PR-RECIPE-02-hybrid-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-03-ice-runtime-truth.md`
- `docs/design/PR-RECIPE-03-ice-runtime-truth-HANDOFF.md`
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

## 3. Scope

- Active app-facing method and variant copy.
- Sources page explanation of source-backed, app-calculated, app-guidance, unresolved, needsReview, unverified, and placeholder states.
- Fixed-example caution copy for 4:6, Hybrid, NEO, and Ice Brew.
- Variant metadata semantics for exact-gated recipes.
- QA and handoff documentation.

## 4. Out of scope

- Runtime value changes.
- Step timing changes.
- `getRecipeForSetup` gate changes.
- Timer state machine, audio, controls, or auto-advance.
- History, Rebrew, storage, export, schemas, or types.
- PWA manifest, service worker, `public/*`, Vite config, package files.
- UI redesign, route changes, POINT/TIPS, Grinder, release metadata.
- Rewriting historical QA or research documents.

## 5. Changed files

- `src/data/placeholderMethods.ts`
- `src/pages/SourcesPage.tsx`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `docs/qa/PR-RECIPE-04-method-source-legal-copy.md`
- `docs/design/PR-RECIPE-04-method-source-legal-copy-HANDOFF.md`

## 6. Active copy audit method

Active source was scanned for stale Hybrid, old 4:6, Ice, Switch, HOT/ICE, and restricted source-authority wording. Results were separated into:

- A. Active app-facing copy: scoped changes in `placeholderMethods`, `SourcesPage`, `RecipeSetupPage`, and `BrewTimerPage`.
- B. Current data/source metadata: `fieldEvidence`, source-status labels, and type/source enums were inspected but type definitions were not changed.
- C. Historical docs / QA / research records: scanned separately and preserved.
- D. Existing forbidden-word lists and negative legal notices: not rewritten unless they conflicted with current runtime copy.

## 7. 4:6 copy verification

PASS.

- R-01 now displays the fixed `20g / 300g / 1:15` balanced + standard example: `60 / 60 / 90 / 90`.
- R-02 now displays the fixed sweet + standard example: `50 / 70 / 90 / 90`.
- R-03 now displays the fixed bright + standard example: `70 / 50 / 90 / 90`.
- 4:6 matrix selection mapping was not expanded: only the standard-center R-01 cell is selectable.
- R-02/R-03 runtime recipes and setup/timer copy remain available through the existing variant selector, not through new matrix cells.
- No selection behavior changed from `origin/main`; the unintended R-02/R-03 matrix mapping found during independent verification was reverted.
- R-04/R-05/R-06 remain unresolved placeholder or needs-review candidates.
- Arbitrary dose / ratio scaling is described as unsupported.
- `3:30` remains drawdown / finish guidance, not guaranteed completion.

## 8. Hybrid copy verification

PASS.

- R-08 fixed example is described as `20g / 300g / 1:15`.
- Pour amounts remain `64g / 64g / 172g`.
- Switch `OPEN` / `CLOSED` remains visible as text.
- `70-80°C` is liquid-temperature guidance only.
- Room-temperature water amount and temperature remain unfixed.
- `3:00` remains finish guidance.
- Arbitrary scaling is unsupported.

## 9. NEO copy verification

PASS.

- R-09 remains the `20g / 300g / 1:15` fixed example.
- 10 pours of `30g` remain unchanged.
- `1:45 / 210g` and `2:30 / 300g` are preserved.
- `3:30` is described as approximate drawdown / finish guidance.
- Non-affiliation copy avoids endorsement or supervision framing.

## 10. Ice Brew copy verification

PASS_WITH_NOTES.

- R-10 is described as `20g / HOT 150g / ICE 80g`.
- Active timer cumulative target is HOT-only `150g`.
- ICE is described as pre-set in the server.
- `230g` appears only as HOT `150g` + ICE `80g` beverage-water equivalent, not as active timer target.
- `3:00` remains chill / finish guidance.

## 11. Source-status semantics verification

PASS.

- `source_original`: kept for values or statements grounded in a source.
- `app_calculated`: kept for values calculated from supported inputs or formulas.
- `app_guidance`: used for app-organized copy, labels, cautions, and explanations.
- `unresolved`: used for unknown or intentionally unsupported fields.
- `needsReview` / `unverified`: kept as caution states, not failure states.
- `placeholder`: kept for unresolved runtime or fallback values only.

## 12. Sources page verification

PASS.

The Sources page now distinguishes source-backed information, app-calculated information, app guidance, and unresolved information. It explains `needsReview`, `unverified`, and `placeholder` without treating them as invalid data. It preserves existing variant source links and attribution without inventing URLs.

## 13. Legal / attribution verification

PASS_WITH_NOTES.

No official/supervised/certified product claim was introduced. Existing global legal/about/settings notices remain negative-context non-affiliation disclaimers and were not changed because they are outside the allowed PR-RECIPE-04 file list.

## 14. Historical document preservation

PASS.

No existing historical QA, design, or research documents were rewritten. Historical scan hits were preserved as historical records or restricted-word examples.

## 15. History / Rebrew / storage impact

PASS.

No History schema, storage key, `BrewSetup`, `BrewSession`, Rebrew logic, or persisted field changed. Historical brew records continue to show their stored snapshots.

## 16. Export schema impact

PASS.

No CSV export schema or JSON backup schema files were changed.

## 17. PWA / service worker impact

PASS.

No manifest, service worker, `public/*`, Vite config, or GitHub Pages base-path file was changed.

## 18. Mobile copy QA

PASS.

- `375x667`: Home method cards, Recipe Setup for 4:6 / Hybrid / NEO / Ice, Brew Timer caution copy, and Sources page were checked.
- `390x844`: Home method cards, Recipe Setup for 4:6 / Hybrid / NEO / Ice, Brew Timer caution copy, and Sources page were checked.
- No horizontal overflow, clipped disclaimer, blocked primary CTA, unreadably small source text, or stale runtime values were observed.

## 19. Validation commands

| Command | Result |
| --- | --- |
| `git status --short` | PASS_WITH_NOTES: intended app-copy/docs files only |
| `git diff --name-only` | PASS_WITH_NOTES: plain diff listed four tracked app files; new QA/handoff docs were visible in `git status --short` before staging |
| `git diff --stat` | PASS_WITH_NOTES: plain diff stat covered the four tracked app files; new QA/handoff docs were untracked before staging |
| `git diff --check` | PASS |
| `npm.cmd ci` | PASS |
| `npm.cmd run build` | PASS |
| `npm.cmd run lint` | NOT AVAILABLE |
| `npm.cmd run typecheck` | NOT AVAILABLE |
| `npm.cmd test` | NOT AVAILABLE |
| Active-source stale-copy scan | PASS_WITH_NOTES: intentional Ice beverage-equivalent `230g` plus existing negative legal/type metadata hits; no stale active runtime copy |
| Historical-doc scan | PASS_WITH_NOTES: historical QA/research and restricted-word records preserved |

## 20. Issues found

- Independent verification found unintended R-02/R-03 matrix cell enablement in `RecipeSetupPage.tsx`; this correction restores the R-01-only matrix mapping.
- Existing About / Legal / Settings pages contain negative non-affiliation wording with restricted terms. They were not changed because the prompt allowed `NOTICE.md` conditionally only, and existing wording was not incomplete or contradictory.

## 21. Required fixes

None known.

## 22. Judgment

PASS_WITH_NOTES.

No runtime value changed.
No step timing changed.
No `getRecipeForSetup` condition changed.
No type/schema changed.
No historical QA/research records were rewritten.
No official/supervised/certified product claim was introduced.

PR-RECIPE-04 is safe for independent verification. The Recipe Truth Refresh implementation series can close after this PR merges if independent verification and GitHub Actions pass.
