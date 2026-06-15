# PR-V2-05: Time-first Brew Timer Cockpit QA

## 1. Purpose

Verify the production Brew Timer cockpit redesign while preserving existing
timer state, method data, recipe data, schedule truth, step progression, and
Finish behavior.

## 2. Changed files

- `src/pages/BrewTimerPage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-V2-05-time-first-brew-timer-cockpit.md`

## 3. Implementation summary

- made elapsed time the dominant Timer value
- added a strongly visible countdown to the next scheduled step
- added explicit current-step and current-instruction sections
- expanded the next-step preview with time, supporting grams, and instruction
- added a compact full-sequence step timeline
- moved grams to a smaller supporting reference surface
- placed labeled controls on a solid, separate control surface
- separated scrollable cockpit content from the control surface so controls do
  not overlap cards
- changed visible control labels to Japanese-first labels

## 4. Out-of-scope confirmation

Not changed:

- Recipe Setup, Brew Finish, History, History Detail, Settings, or Tools UI
- recipe data, method definitions, schedule data, timer calculations, or step
  progression
- Finish navigation or history-save behavior
- types, localStorage key, saved session schema, PWA manifest, service worker,
  GitHub Pages base path, release metadata, or package files
- POINT/TIPS data, selection logic, caps, or source metadata suppression
- app-wide theme, dark mode, or theme switcher

## 5. Timer hierarchy verification

Result: `PASS`

- elapsed time is the largest value and measured approximately `82.6px` at
  `375x667`
- next-step countdown is the second strongest value and uses restrained amber
- current step, current instruction, next step, and the sequence timeline are
  explicitly labeled
- cumulative target and this-pour grams remain visible only on the smaller
  `参考グラム` surface
- controls remain labeled: `前へ / 開始・一時停止・再開 / 次へ・完了`

## 6. 10 Pour / 1:45 / 210g guardrail

Result: `PASS`

- no recipe or method data file changed
- the full Timer timeline displayed:
  `00:00 / 00:30 / 00:45 / 01:00 / 01:15 / 01:30 / 01:45 / 02:00 / 02:15 / 02:30`
- Step 7 displayed `01:45 に30g注ぎ、累計210gにします。`
- the Step 7 supporting cumulative target displayed `210g`
- Step 10 displayed `02:30` and cumulative `300g`
- final preview preserved `約3:30` as approximate drawdown guidance

## 7. Mobile QA

Production preview:

```text
http://127.0.0.1:4177/Pouro-GPT/
```

### 375 x 667

Result: `PASS`

- document width: `375px`; scroll width: `375px`; no horizontal overflow
- Bottom Tabs count on Timer: `0`
- controls remained visible on a solid surface and measured `52px` high
- scrollable cockpit content ended exactly where the control surface began
- elapsed time, countdown, current instruction, next preview, timeline, and
  supporting grams remained readable
- timeline client width and scroll width both measured `325px`
- no clipped controls or card overlap

### 390 x 844

Result: `PASS`

- document width: `390px`; scroll width: `390px`; no horizontal overflow
- Bottom Tabs count on Timer: `0`
- controls remained visible and measured `52px` high
- timeline client width and scroll width both measured `340px`
- current instruction and next-step preview remained readable above the
  separate control surface

## 8. Interaction QA

Result: `PASS`

- Start: elapsed time advanced from `00:00`
- Pause: elapsed time remained `00:01` during a 1.2-second paused check
- Resume: elapsed time advanced from `00:01` to `00:03`
- Next: advanced from Step 1 through Step 7 and then through Step 10
- Previous: moved Step 7 back to Step 6; Next returned to Step 7
- Finish: `完了` navigated from Step 10 to `/Pouro-GPT/finish`
- recovery: browser Back from Finish returned safely to `/Pouro-GPT/timer`
- keyboard focus: keyboard activation showed a `2px` solid amber focus ring
  with `2px` offset
- preview console: no error or warning entries observed

## 9. Source, legal, and Stitch guardrails

Result: `PASS`

- source/provenance fields and display logic were not changed
- no official approval, supervision, partnership, endorsement, accuracy, or
  result-guarantee wording was added
- the external Stitch ZIP was inspected only from a temporary directory
- no Stitch ZIP, screenshot, generated HTML, CSS, JavaScript, or generated
  asset was copied or committed

## 10. Command results

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 72 modules transformed. |
| `npm.cmd run lint` | NOT RUN | lint script is not available in `package.json`; no lint script was added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS | Limited to Brew Timer display/CSS and this QA document. |
| `git diff --stat` | PASS | Reviewed for bounded implementation scope. |

## 11. Known limitations

- QA used local production preview, not a physical iPhone.
- PWA install/offline behavior was not re-run because no PWA file or behavior
  changed.
- The countdown displays existing schedule truth but does not automatically
  change the current step; existing manual step progression is intentionally
  preserved.
- External independent verification is still required before merge.

## 12. Judgment

`PASS_WITH_NOTES`

Safe for independent verification: YES

Safe to merge after external verification: YES
