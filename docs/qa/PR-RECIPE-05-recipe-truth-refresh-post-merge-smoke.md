# PR-RECIPE-05 QA: Recipe Truth Refresh Post-Merge Smoke

## 1. Status

PASS WITH NOTES.

Post-merge smoke QA found no blocker in the merged Recipe Truth Refresh series. The PR remains documentation-only. Notes:

- `npm.cmd ci` initially hit an `EPERM` unlink on a repo-local stale Vite/esbuild process, then passed after stopping only that repo-local process and rerunning.
- `lint`, `typecheck`, and `test` package scripts are not present in `package.json`; they are recorded as NOT AVAILABLE.
- Export controls were verified as reachable with a saved history entry, but export files were not downloaded.
- Draft PR #103 was opened after the initial docs commit. GitHub Actions must be checked on the final PR head before merge.

## 2. Tested main commit

`3f839e02a539c3363003006c66e0911754c3969c`

This is the local and `origin/main` commit after PR #102:

`PR-RECIPE-04: Method Detail / Source / Legal Copy Alignment (#102)`

Pre-QA repository checks:

- `git status --short --branch`: clean on `codex/pr-recipe-05-post-merge-smoke-closeout`
- `git branch --show-current`: `codex/pr-recipe-05-post-merge-smoke-closeout`
- `git log --oneline -8`: includes PR #99, #100, #101, and #102 in order
- `git rev-parse HEAD`: `3f839e02a539c3363003006c66e0911754c3969c`
- `git rev-parse origin/main`: `3f839e02a539c3363003006c66e0911754c3969c`

## 3. Source of Truth

Inspected:

- `docs/research/RECIPE_TRUTH_REFRESH_FABLE5_PREFLIGHT.md`
- `docs/qa/PR-RECIPE-01-four-six-runtime-truth.md`
- `docs/design/PR-RECIPE-01-four-six-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-02-hybrid-runtime-truth.md`
- `docs/design/PR-RECIPE-02-hybrid-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-03-ice-runtime-truth.md`
- `docs/design/PR-RECIPE-03-ice-runtime-truth-HANDOFF.md`
- `docs/qa/PR-RECIPE-04-method-source-legal-copy.md`
- `docs/design/PR-RECIPE-04-method-source-legal-copy-HANDOFF.md`
- `src/data/placeholderMethods.ts`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `src/pages/SourcesPage.tsx`
- `src/repositories/brewHistoryRepository.ts`

## 4. Scope

Documentation-only post-merge smoke QA and closeout for PR-RECIPE-01 through PR-RECIPE-04.

## 5. Out of scope

No app code, runtime recipe, timer calculation, route, storage schema, PWA, service worker, package, lockfile, or historical PR document changes.

## 6. Changed files

Expected final diff:

- `docs/qa/PR-RECIPE-05-recipe-truth-refresh-post-merge-smoke.md`
- `docs/design/PR-RECIPE-05-recipe-truth-refresh-CLOSEOUT-HANDOFF.md`

## 7. Environment

- OS/shell: Windows PowerShell
- Package manager command: `npm.cmd`
- Local preview: `http://127.0.0.1:4197/Pouro-GPT/`
- Browser QA: in-app browser automation against Vite preview
- Storage: disposable fresh preview port `4197`; an older preview port had prior local history, so it was not used for QA storage
- Viewports: `375 x 667` and `390 x 844`

## 8. Build validation

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd ci` | PASS WITH NOTES | First attempt failed with `EPERM` on `node_modules/@esbuild/win32-x64/esbuild.exe` because a repo-local Vite/esbuild process was still running. After stopping only that repo-local process, rerun passed: 73 packages added, 0 vulnerabilities. |
| `npm.cmd run build` | PASS | `tsc -b && vite build` completed. Vite built 73 modules and emitted production assets. |
| `npm.cmd run lint` | NOT AVAILABLE | No `lint` script exists in `package.json`. |
| `npm.cmd run typecheck` | NOT AVAILABLE | No `typecheck` script exists in `package.json`; type checking is included in `npm.cmd run build`. |
| `npm test` | NOT AVAILABLE | No `test` script exists in `package.json`. |

## 9. Navigation smoke test

PASS.

Verified route flow:

- Home -> Recipe Setup: PASS
- Recipe Setup -> Active Brew: PASS
- Active Brew -> Finish: PASS
- Finish -> History Detail after save: PASS
- History list: PASS
- History Detail: PASS
- Rebrew -> Recipe Setup: PASS
- Sources page: PASS
- Settings / Data page: PASS

Bottom navigation:

- Visible and usable on Home, Recipe Setup, History, History Detail, Sources, and Settings.
- Hidden on Active Brew / Timer, as expected.

## 10. 4:6 exact-example verification

PASS.

Browser smoke at `375 x 667`:

- R-01 exact setup `20g / 300g / 1:15`: timer showed `60g / 60g / 90g / 90g`, starts `00:00 / 00:45 / 01:30 / 02:15`, and `03:30` drawdown / finish guidance.
- R-02 exact setup through existing variant selector: timer showed `50g / 70g / 90g / 90g`.
- R-03 exact setup through existing variant selector: timer showed `70g / 50g / 90g / 90g`.
- R-01 step progression showed cumulative targets `60g`, `120g`, `210g`, and `300g`.
- Fixed-example caution copy was visible and arbitrary scaling was not offered.

Matrix behavior:

- The 3x3 matrix exposed nine cells.
- Only `標準 x 標準: 基本形を選択` was enabled and selected.
- The other eight cells were disabled with confirmation-pending text.
- R-02 and R-03 remained reachable through the existing variant selector, not through new matrix cells.

## 11. 4:6 fallback verification

PASS.

Unsupported setup tested:

- R-01 with `coffee=18g`

Result:

- Exact fixed runtime was not selected.
- Recipe Setup showed that R-01 source-backed candidate is only `20g / 300g / 1:15`.
- Timer showed `レシピ値確認中`, confirmation-pending target text, two generic fallback steps, and no fabricated scaled grams.

## 12. Hybrid exact-example verification

PASS.

Exact setup:

- method: Hybrid
- variant: R-08
- coffee: `20g`
- ratio: `1:15`
- water: `300g`

Browser smoke showed:

- `0:00` Switch OPEN, `+64g`
- `0:30` Switch OPEN, `+64g`, then close
- `1:15` Switch CLOSED, `+172g`
- `1:45` Switch OPEN / drawdown, no water
- `3:00` finish guidance

Additional checks:

- Switch OPEN / CLOSED was visible as text.
- `70-80°C` was described only as liquid-temperature guidance.
- No fixed room-temperature-water quantity was shown.
- No fixed room-temperature-water temperature was shown.
- Old `40-50g` first-pour copy was not active.
- Old `120g / 200g` runtime sequence was not active.

## 13. Hybrid fallback verification

PASS.

Unsupported setup tested:

- R-08 with `coffee=18g`

Result:

- Exact fixed runtime was not selected.
- Timer showed `レシピ値確認中`, confirmation-pending target text, generic fallback steps, and no fabricated scaled values.

## 14. NEO exact-example verification

PASS.

Exact setup:

- method: 10 Pour
- variant: R-09
- coffee: `20g`
- ratio: `1:15`
- water: `300g`

Browser smoke showed:

- 10 pours.
- Each pour was `30g`.
- Step 7 showed `01:45` and cumulative `210g`.
- Step 10 showed `02:30` and cumulative `300g`.
- Final next guidance said about `3:30` drawdown / completion guidance.
- Fixed-example caution and non-affiliation copy were visible.
- Arbitrary scaling was not offered.

## 15. NEO fallback verification

PASS.

Unsupported setup tested:

- R-09 with `coffee=18g`

Result:

- Exact fixed runtime was not selected.
- Timer showed `レシピ値確認中`, confirmation-pending target text, generic fallback steps, and no fabricated scaled values.

## 16. Ice exact-example verification

PASS.

Exact setup:

- method: Ice Brew
- variant: R-10
- coffee: `20g`
- HOT: `150g`
- ICE: `80g`

Browser smoke showed:

- `0:00`: `+30g HOT`, cumulative HOT `30g`
- `0:30`: `+30g HOT`, cumulative HOT `60g`
- `1:00`: `+30g HOT`, cumulative HOT `90g`
- `1:30`: `+30g HOT`, cumulative HOT `120g`
- `2:00`: `+30g HOT`, cumulative HOT `150g`
- `3:00`: no water / chill-finish guidance
- Timer target total was HOT-only `150g`.
- ICE `80g` was shown as pre-set in the server.
- `230g` appeared only as HOT `150g` + ICE `80g` beverage-water equivalent.
- ICE was never counted as active poured water.

## 17. Ice fallback verification

PASS.

Unsupported setup tested:

- R-10 with HOT changed from `150g` to `140g`, ICE left at `80g`

Result:

- Exact fixed runtime was not selected.
- Recipe Setup said the fixed example is only `20g / HOT 150g / ICE 80g`.
- Timer showed `レシピ値確認中`, confirmation-pending target text, generic fallback steps, and no fabricated HOT/ICE scaled values.

## 18. Source-status verification

PASS.

Sources page verified at `375 x 667` and `390 x 844`.

It distinguishes:

- `source-backed`
- `app-calculated`
- `app guidance`
- `unresolved`
- `needsReview`
- `unverified`
- `placeholder`

It also states:

- `needsReview` and `unverified` are caution states, not failure states.
- `placeholder` is reserved for values or procedures not fixed for execution.
- `valuesArePlaceholder=false` does not imply final confirmation, approval, or endorsement when `needsReview` / `unverified` remain.
- Source attribution identifies references and does not imply affiliation or approval.

Source links remained intact for the displayed source-backed variants:

- HARIO Coffee Scale POLARIS
- R-08 YouTube source link
- R-09 YouTube source link

No invented source URL was observed.

## 19. Legal / active-copy verification

PASS.

Command run:

```bash
rg -n "公式レシピ|公式完全再現|完全再現|メーカー公認|公式推薦|プロ監修|監修|認定|同一抽出|同じ味になる|絶対に失敗しない|certified|supervised|official recipe|guaranteed result" src NOTICE.md
```

Additional scan run:

```bash
rg -n "official|supervised|certified|guaranteed|endorsement|affiliation|affiliated|非公式|提携|保証|公認|監修|認定" src NOTICE.md
```

Classification:

- `NOTICE.md`: negative disclaimer / non-affiliation.
- `src/pages/AboutPage.tsx`: negative disclaimer, not an active official claim.
- `src/pages/LegalPage.tsx`: negative disclaimer, not an active official claim.
- `src/pages/SettingsPage.tsx`: negative disclaimer, not an active official claim.
- `src/pages/ToolsPage.tsx`: negative disclaimer, not an active official claim.
- `src/pages/SourcesPage.tsx`: negative disclaimer and source-status explanation.
- `src/utils/sourceStatus.ts`, `src/types/source.ts`, `src/types/grinder.ts`, and `src/repositories/brewHistoryRepository.ts`: type/status labels.
- `src/data/placeholderMethods.ts` and `src/pages/BrewTimerPage.tsx`: non-affiliation and not-guaranteed caution copy.

No active forbidden official, supervised, certified, guaranteed, or same-result claim was found.

## 20. History / Rebrew verification

PASS.

Completed one exact Ice R-10 brew through the app and saved it.

Verified:

- History entry created.
- History Detail opened after saving.
- Saved snapshot showed:
  - coffee `20g`
  - HOT `150g`
  - ICE `80g`
- Rebrew button returned to Recipe Setup.
- Rebrew restored the saved setup.
- Rebrew did not directly start Timer.
- History list still showed one saved Ice entry afterward.
- No schema error or runtime crash occurred.

## 21. Storage / Export verification

PASS WITH NOTES.

Verified:

- History saved through the normal app flow on the disposable preview origin.
- Settings / Data page showed `保存済み履歴 1件`.
- CSV and JSON export controls were visible and enabled after the saved entry existed.
- No storage schema code changed.
- No runtime storage error appeared during save, History Detail, History list, Settings, or Rebrew.

Note: CSV/JSON export downloads were not triggered in this docs-only closeout smoke to avoid creating local download artifacts.

## 22. PWA / deployment verification

PASS WITH NOTES.

Local production build passed:

- `npm.cmd run build`

Protected files are expected to remain unchanged. Final diff validation must show only the two new docs:

```bash
git diff --name-only origin/main...HEAD
git diff --check
```

At document creation time, app code, package files, public assets, service worker, manifest, Vite config, and GitHub workflow files were not edited.

GitHub Actions: check final PR #103 head before merge.

## 23. Mobile viewport verification

PASS.

`375 x 667`:

- Home: no horizontal overflow, bottom nav visible.
- Recipe Setup: no horizontal overflow, start CTA visible/reachable by click.
- Timer: no horizontal overflow, bottom nav hidden, controls reachable and used.
- Finish: no horizontal overflow, save CTA reachable and used.
- History Detail: no horizontal overflow, bottom nav visible, Rebrew button reachable and used.
- Sources: no horizontal overflow, bottom nav visible.
- Settings / Data: no horizontal overflow, bottom nav visible.

Representative measured widths:

- 375 viewport Home: `innerWidth=375`, `clientWidth=360`, `scrollWidth=360`, `scrollX=0`
- 375 viewport Timer: `innerWidth=375`, `clientWidth=360`, `scrollWidth=360`, `scrollX=0`
- 375 viewport History list: `innerWidth=375`, `clientWidth=375`, `scrollWidth=375`, `scrollX=0`

`390 x 844`:

- Home: no horizontal overflow, bottom nav visible.
- Recipe Setup: no horizontal overflow, start CTA visible/reachable by click.
- Timer: no horizontal overflow, bottom nav hidden, Start button clicked and timer controls usable.
- History: no horizontal overflow, bottom nav visible.
- Sources: no horizontal overflow, bottom nav visible.
- Settings / Data: no horizontal overflow, bottom nav visible.

Representative measured widths:

- 390 viewport Home: `innerWidth=390`, `clientWidth=375`, `scrollWidth=375`, `scrollX=0`
- 390 viewport Timer: `innerWidth=390`, `clientWidth=375`, `scrollWidth=375`, `scrollX=0`
- 390 viewport History list: `innerWidth=390`, `clientWidth=390`, `scrollWidth=390`, `scrollX=0`

## 24. Issues found

None.

Non-blocking notes:

- `npm.cmd ci` needed one retry after stopping a stale repo-local preview/esbuild process.
- Export controls were verified, but export files were not downloaded.
- GitHub Actions must be checked on the final PR #103 head before merge.

## 25. Required fixes

None.

## 26. Judgment

CLOSE.

The Recipe Truth Refresh series is safe to close from local post-merge smoke QA. No corrective implementation PR is required from this QA pass. Final merge should still wait for independent verification and GitHub Actions on the Draft PR.
