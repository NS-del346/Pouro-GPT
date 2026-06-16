# PR-V2-14 Final Stitch Visual Parity Polish QA

## 1. Purpose

Implement a visual-only parity polish pass against the final Stitch mock PNG set for the Ver2.0 screen family.

This PR is limited to spacing, density, typography hierarchy, surface contrast, button hierarchy, amber accent consistency, section hierarchy, modest radii, and screen-specific CSS polish. It does not intentionally change runtime behavior.

## 2. Changed files

- `src/styles/index.css`
- `docs/qa/PR-V2-14-final-stitch-visual-parity-polish.md`

## 3. Visual reference inspected

Inspected the 8 final Stitch mock PNGs from the temporary reference folder outside the repository:

- `brew_home_final_usability_alignment/screen.png`
- `recipe_setup_final_usability_alignment/screen.png`
- `click_converter_final_usability_alignment/screen.png`
- `brew_timer_final_usability_alignment/screen.png`
- `brew_result_final_usability_alignment/screen.png`
- `history_final_usability_alignment/screen.png`
- `history_detail_final_usability_alignment/screen.png`
- `settings_data_final_usability_alignment/screen.png`

The Stitch ZIP, generated HTML/CSS/JS, extracted PNGs, and browser screenshots were not placed in the repository.

## 4. Out-of-scope confirmation

No intentional changes were made to recipe data, method definitions, timer schedules, 4:6 mapping logic, 10 Pour constraints, Click Converter data model, real conversion output, brew setup calculations, timer runtime logic, Finish save/discard behavior, History save behavior, History Detail Rebrew behavior, Settings CSV export logic, Settings JSON backup logic, localStorage keys, saved session schema, CSV format, JSON backup format, PWA manifest, service worker, package files, release metadata, or tag/release files.

No new screens, tabs, dependencies, generated assets, JSON import/restore, edit/delete/filter/search/sort flows, analytics, AI diagnosis, account/cloud/sync, Bluetooth, AR, TDS/water tracking, theme switching, global dark mode, or real grinder conversion were added.

## 5. Visual parity audit matrix

| Screen | Gap observed | Change made | Regression risk | QA result | Remaining difference |
| --- | --- | --- | --- | --- | --- |
| Brew Home | Mock uses compact stacked method cards, modest radii, amber-selected state, and a stronger app-bar impression. | Tightened page gap, left-aligned wordmark, flattened method cards, reduced radii, changed method grid to single-column dense rows, reduced decorative status noise. | Low; CSS-only. | PASS | Live app keeps its existing home structure and does not add generated header icons. |
| Recipe Setup | Mock is highly condensed with parameter grid first; live app must preserve source-safety summary, 4:6 matrix, unresolved cells, tips, and memo inputs. | Tightened setup gaps, card radii, matrix density, selected-cell treatment, result card, buttons, and input hierarchy. | Medium-low; visual CSS touches dense mobile layout. | PASS | More content remains than the mock because provenance and planning-only states are protected. |
| Click Converter | Mock shows a conversion-like planning form; live app must stay disabled/no-result until data is verified. | Flattened content cards, reduced radii, strengthened disabled-note and result surfaces while preserving disabled fields. | Low; CSS-only and disabled state retained. | PASS | No real result value is shown, by design. |
| Brew Timer | Mock prioritizes dark cockpit, elapsed time, next countdown, current step, next step, timeline, and reachable controls. | Tightened dark timer cockpit, reduced vertical spacing, flattened method/step/next cards, tabular numeric hierarchy, sticky control density, and timeline treatment. | Medium; timer screen is dense and critical. | PASS | Live header remains method-summary-card based rather than copying Stitch top bar. |
| Brew Result | Mock is flatter and summary-first. | Flattened finish hero, reduced radius/shadow, tightened feedback/guidance/save sections and numeric display. | Low; CSS-only. | PASS | Live app keeps full save-confirmation and source-safety sections. |
| History List | Mock uses flat log cards with tabular right-side metadata. | Tightened history summary, log card, condition grid, chips, detail affordance, and amber states. | Low; CSS-only. | PASS | Live app uses existing dashboard summary instead of mock-only filter chips. |
| History Detail | Mock is method/condition-first with flat records and bottom action bar style. | Flattened hero and record cards, reduced radii/shadows, tightened key grids, source/tips/rebrew cards. | Low; CSS-only. | PASS | Live app keeps full provenance, POINT/TIPS, and rebrew sections rather than mock compression. |
| Settings / Data | Mock is a compact trust/data center. | Flattened panels and controls, tightened export/danger/settings rows, reduced radii, amber action hierarchy. | Low; CSS-only. | PASS_WITH_NOTES | In-app Browser cannot observe actual downloaded files; app-side export status was verified. |

## 6. Screen-by-screen QA

- Brew Home: 375x667 screenshot inspected; no horizontal overflow; Last Brew and Start CTAs reachable after a saved QA brew exists.
- Recipe Setup: 375x667 screenshot inspected; 4:6 matrix, legacy variant chips, inputs, and Start CTA remain readable and reachable.
- Click Converter: 375x667 screenshot inspected; all converter inputs/selects remain disabled and no real conversion value is displayed.
- Brew Timer: 375x667 running-state screenshot inspected; bottom tabs hidden; timer controls reachable; elapsed and next countdown readable.
- Brew Result: reached through live Timer completion; no horizontal overflow; Save and Discard actions present.
- History List: saved QA brew displayed; no horizontal overflow; bottom nav present.
- History Detail: saved QA brew detail displayed; Rebrew CTA reachable; bottom nav does not cover CTA when scrolled into view.
- Settings / Data: export and danger controls reachable when scrolled into view; no horizontal overflow; legal/non-official copy remains visible.

## 7. Flow regression QA

- Brew Home -> Recipe Setup -> Timer -> Finish -> Save -> History Detail: PASS.
- History Detail -> Rebrew -> Recipe Setup: PASS. Replayed setup showed `20g`, `1:15`, and `300g`.
- Setup -> Timer -> Finish -> Discard: PASS at 390x844 and 430x932; returned to Brew Home.
- Settings CSV export: PASS_WITH_LIMITATIONS. App status changed to `CSVを書き出しました。`; in-app Browser downloads are unsupported, so filesystem download observation was not available there.
- Settings JSON backup: PASS_WITH_LIMITATIONS. App status changed to `JSONバックアップを書き出しました。`; in-app Browser downloads are unsupported, so filesystem download observation was not available there.
- Tools / Click Converter remains disabled/no-result: PASS.

## 8. Viewport QA

375x667:

- Brew Home, Recipe Setup, Timer, Finish, History List, History Detail, Settings, and Tools were checked in the in-app Browser.
- No horizontal overflow observed on checked screens.
- Bottom nav was hidden on Timer and Finish.
- Timer controls were reachable.
- Primary CTAs were reachable by normal scroll where below the fold.

390x844:

- Brew Home, Recipe Setup, Tools, History List, History Detail, Settings, Timer, and Finish were checked.
- No horizontal overflow observed.
- Timer controls remained reachable: all control bottoms were within the viewport and controls were at least 52px high.
- Settings CSV, JSON, and danger controls were reachable after focused scroll and did not overlap the bottom nav.

430x932:

- Brew Home, Recipe Setup, Tools, History List, History Detail, Settings, Timer, and Finish were checked.
- No horizontal overflow observed.
- Timer controls remained reachable: all control bottoms were within the viewport and controls were at least 52px high.
- Settings CSV, JSON, and danger controls were reachable after focused scroll and did not overlap the bottom nav.

## 9. Storage/export/schema regression check

- `src/repositories/brewHistoryRepository.ts` was not changed.
- `src/repositories/userSettingsRepository.ts` was not changed.
- localStorage keys were not changed.
- `BrewSetup` and `BrewSession` shapes were not changed.
- CSV header/format code was not changed.
- JSON backup structure code was not changed.
- Browser QA used disposable local Vite-origin data on `127.0.0.1:5193`.

## 10. Recipe/timer constraint regression check

- 4:6 R-01 remained the only enabled matrix cell: 9 cells total, 1 enabled selected center/basic cell, 8 disabled planning cells.
- 4:6 R-02 remained selectable only through the legacy variant chip and did not falsely select a matrix cell.
- 10 Pour setup remained `20g / 300g / 1:15`.
- 10 Pour step 7 remained `01:45` with cumulative target `210g`.
- 10 Pour next step from step 7 remained `02:00 / 240g`.
- Timer calculations, schedules, and step progression code were not changed.

## 11. Click Converter foundation regression check

- Source grinder select remained disabled.
- Target grinder select remained disabled.
- Click input remained disabled.
- Result panel continued to state that conversion data is under verification.
- No real grinder conversion output was introduced.

## 12. Source/legal guardrail check

- No source/provenance fields were removed or weakened.
- No raw source URLs, timecodes, transcripts, or source notes were exposed in compact UI.
- Non-official/legal caution copy remained visible in Settings.
- No official endorsement, supervision, partnership, affiliation, complete reproduction, guaranteed method accuracy, or guaranteed brew result language was introduced.

## 13. Stitch/generated asset exclusion check

- Stitch ZIP was kept outside the repository.
- Extracted PNGs were kept outside the repository.
- Generated Stitch HTML/CSS/JS was not copied into app source.
- Browser screenshots were not committed.
- No generated assets were committed.

## 14. Commands and checks

Commands run during implementation/QA:

- `git status --short --branch`
- `git diff -- src/styles/index.css`
- `Get-ChildItem` inspections for the temporary Stitch mock set
- In-app Browser QA at `375x667`, `390x844`, and `430x932`
- `npm.cmd run build`
- `git diff --check`
- `git diff --name-only`
- `git diff --stat`
- `git status --short --branch`

Lint status:

- `lint script not available`

## 15. Known limitations

- Visual parity is implemented as a safe app polish pass, not a generated-code port. The live app intentionally keeps protected source-safety, placeholder, POINT/TIPS, setup, history, and export structures that differ from the mock.
- The in-app Browser cannot observe actual filesystem downloads. CSV/JSON export button behavior was verified through visible status updates and absence of console errors, with export implementation code unchanged.
- The final Stitch mock app-bar icons and some compressed mock-only layouts were not copied or recreated as generated assets.

## 16. Judgment

PASS_WITH_NOTES.

The PR is safe for independent visual verification as a Draft PR. It should remain Draft until an external reviewer confirms visual parity expectations against the final Stitch PNGs, especially the deliberate differences kept for provenance, protected behavior, and disabled Click Converter safety.
