# PR-V2-06: Recipe Setup 4:6 Combination UI QA

## 1. Purpose

Present the 4:6 Method as a visible taste-direction x strength 9-combination
system without inventing recipe values, schedules, or source-verified mappings.

## 2. Changed files

- `src/pages/RecipeSetupPage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-V2-06-recipe-setup-four-six-combination-ui.md`

## 3. Implementation summary

- added a Japanese-first 3 x 3 matrix for the 4:6 Method only
- explained the first 40% as the taste-direction axis and the later 60% as the
  strength axis
- made the selected combination and current existing variant visible
- kept all existing 4:6 variants selectable in the existing selector
- added 4:6-only compact mobile styling and neutral unavailable states

## 4. Out-of-scope confirmation

Not changed:

- recipe data, method definitions, schedules, timer calculations, or timer
  progression
- non-4:6 setup UI behavior
- Brew Timer cockpit, Brew Finish, History, History Detail, Settings, or Tools
  implementation
- POINT/TIPS data or selection logic
- types, localStorage key, saved session schema, export format, PWA manifest,
  service worker, GitHub Pages base path, release metadata, or package files

## 5. 4:6 mapping strategy

Result: `PASS_WITH_NOTES`

- the 3 x 3 axis labels are planning labels and are explicitly shown as
  confirmation-needed
- only existing `R-01` / `基本形` is provisionally mapped to the center
  `標準 x 標準` cell
- `R-02` through `R-06` are not assigned to intersections because their
  existing names do not safely establish both axes
- all existing variants remain selectable below the matrix
- selecting `R-01` from the matrix updates the existing variant selection
- selecting an existing unmapped variant clears the matrix selected state and
  shows that its 9-combination mapping is still being confirmed
- no new recipe IDs, values, schedules, water amounts, or timings were added

Available cells:

- 1: `標準 x 標準` -> existing `R-01` / `基本形`

Disabled or planning-only cells:

- 8: all other taste-direction x strength intersections
- disabled cells are non-actionable and cannot create hidden setup data

## 6. Mobile QA

Production preview:

```text
http://127.0.0.1:4177/Pouro-GPT/
```

QA used headless Microsoft Edge because the in-app Browser and Windows
automation helpers were unavailable under the current OS permission profile.

### 375 x 667

Result: `PASS`

- document client width and scroll width: `375px`; no horizontal overflow
- matrix client width and scroll width: `325px`; no matrix overflow
- matrix displayed 9 cells: 1 selectable, 8 disabled, 1 selected by default
- all 6 existing variant chips remained available
- selecting existing `R-02` produced 1 selected variant chip and no falsely
  selected matrix cell
- selecting the available center cell restored `R-01` and the selected matrix
  state
- keyboard focus displayed a `2px` solid focus outline
- custom coffee input opened and remained usable
- Start CTA measured `52px`, remained visible, and did not overlap Bottom Tabs
- no console warning or error was observed

### 390 x 844

Result: `PASS`

- document client width and scroll width: `390px`; no horizontal overflow
- matrix client width and scroll width: `336px`; no matrix overflow
- matrix displayed 9 cells: 1 selectable, 8 disabled, 1 selected by default
- existing variant selection, center-cell restore, keyboard focus, and custom
  input checks passed
- Start CTA measured `52px`, remained visible, and did not overlap Bottom Tabs
- no console warning or error was observed

## 7. Flow QA

### Recipe Setup -> Timer

Result: `PASS`

- selected existing `R-02` from the fallback selector
- Start CTA navigated to `/Pouro-GPT/timer`
- Timer displayed 3 controls and 0 Bottom Tabs
- Timer progressed to `/Pouro-GPT/finish`

### Rebrew -> Recipe Setup

Result: `PASS`

- saved the test brew and opened History Detail
- `同じ条件で再抽出` returned to `/Pouro-GPT/setup/four-six`
- existing `R-02` selection was preserved
- the matrix correctly showed no selected cell for the unmapped variant
- document client width and scroll width remained `375px`

## 8. Source, legal, and Stitch guardrails

Result: `PASS`

- source/provenance fields and semantics were not changed
- placeholder and confirmation-needed states remain visible
- no official approval, supervision, partnership, endorsement, accuracy, or
  result-guarantee wording was added
- no Stitch ZIP, screenshot, generated HTML, CSS, JavaScript, or generated
  asset was copied or committed

## 9. Command results

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 72 modules transformed. |
| `npm.cmd run lint` | NOT RUN | lint script is not available in `package.json`; no lint script was added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS | Changes are limited to Recipe Setup UI, 4:6-only CSS, and this QA document. |
| `git diff --stat` | PASS | Reviewed for bounded implementation scope. |

## 10. Known limitations

- 8 of 9 matrix cells remain disabled and planning-only because existing data
  does not safely establish both axes.
- the `標準 x 標準` center mapping is explicitly provisional UI organization,
  not newly verified recipe truth.
- mobile QA used headless Edge, not a physical iPhone.
- external independent verification is still required before merge.

## 11. Judgment

`PASS_WITH_NOTES`

Safe for independent verification: YES

Safe to merge after external verification: YES
