# PR-V2-07: Click Converter Foundation QA

## 1. Purpose

Create the first production-safe Click Converter foundation under the Tools tab
without activating real grinder conversion, adding verified grinder data, or
changing existing brew behavior.

## 2. Changed files

- `src/pages/ToolsPage.tsx`
- `src/styles/index.css`
- `src/types/grinder.ts`
- `src/types/index.ts`
- `src/data/grinderPresets.ts`
- `src/data/index.ts`
- `docs/qa/PR-V2-07-click-converter-foundation.md`

## 3. Implementation summary

- replaced the Tools planning placeholder with a visible Click Converter
  foundation
- added disabled source grinder, target grinder, and source click controls
- added an explicitly non-result-producing estimated-result placeholder
- added approximate-use, particle-size, variable-condition, result-guarantee,
  and non-official disclaimer copy
- added a compact future data-status surface
- added a bounded grinder preset type and placeholder-only preset data boundary
- added Tools-only responsive styling aligned with the Light Precision Cockpit
  and restrained amber status accent

## 4. Out-of-scope confirmation

Not changed or added:

- real click conversion formula or visible conversion result
- verified grinder database or verified numeric click-step values
- custom grinder editing or grinder preference saving
- Recipe Setup, Brew Timer, Brew Result, History, Settings, or Rebrew behavior
- recipe data, method definitions, schedules, timer calculations, progression,
  4:6 mapping, or 10 Pour fixed constraints
- localStorage key, saved session schema, or export format
- PWA manifest, service worker, GitHub Pages base path, or release metadata
- package files or dependencies
- sound, click animation, account, cloud, SNS, AI, Bluetooth, AR, or TDS scope

## 5. Data model boundary

Result: `PASS_WITH_NOTES`

- `GrinderPreset` separates preset status, adjustment type, source status, and
  verification level
- `clickStepMicrons` is optional and no numeric value is provided
- the Comandante C40 reference candidate is marked `needs_review`
- the user grinder candidate is marked `placeholder`
- both presets use `needs_review` or `placeholder` provenance states
- all preset controls are disabled and cannot produce a result
- the visible data-status surface translates internal status values to the
  Japanese user-facing label `要検証`

## 6. Conversion-disabled behavior

Result: `PASS`

- source grinder selector: disabled
- target grinder selector: disabled
- source click input: disabled
- result area states `換算データを検証中です。`
- result area states `このPRでは実換算値を表示しません。`
- no conversion function or formula was added
- no numeric click result appears in the result area
- empty or invalid input cannot affect state because the input remains disabled

## 7. Disclaimer verification

Result: `PASS`

The Tools screen clearly states:

- click conversion is a starting-position reference
- it is not particle-size conversion
- beans, roast level, burr, zero point, and individual differences affect it
- extraction results and matching grind settings are not guaranteed
- the feature is not approved or supervised by grinder manufacturers
- the feature is still in preparation and displays no real conversion value

## 8. Mobile and navigation QA

Production preview:

```text
http://127.0.0.1:4178/Pouro-GPT/
```

QA used the in-app Browser against the local production preview.

### 375 x 667

Result: `PASS`

- Tools was opened from the labeled four-tab bottom navigation
- Tools remained the active bottom tab
- viewport override: `375 x 667`
- the browser reserved `15px` for its vertical scrollbar; document client and
  scroll widths both measured `360px`, with no horizontal overflow
- Click Converter card was visible on initial load; safety and data-status
  cards were safely scrollable
- source selector, target selector, input placeholder, result placeholder,
  disclaimer, and future data status were readable
- all three disabled controls measured `48px` high
- all four bottom-navigation targets measured `52px` high
- at the bottom of the page, the data-status card ended `36px` above the fixed
  bottom navigation
- no console warning or error was observed

### 390 x 844

Result: `PASS`

- viewport override: `390 x 844`
- the browser reserved `15px` for its vertical scrollbar; document client and
  scroll widths both measured `375px`, with no horizontal overflow
- Click Converter, safety note, and future data-status surfaces remained
  readable and safely scrollable
- all three disabled controls measured `48px` high
- all four bottom-navigation targets measured `52px` high
- at the bottom of the page, the data-status card ended `35px` above the fixed
  bottom navigation
- no console warning or error was observed

### Focus and touch targets

Result: `PASS_WITH_NOTES`

- bottom-navigation keyboard focus displayed a visible solid outline
- native controls are intentionally disabled until verified data exists, so
  they are not currently keyboard-focusable or actionable
- disabled controls retain readable labels, values, and `48px` surfaces

## 9. Source, legal, and Stitch guardrails

Result: `PASS`

- existing source/provenance concepts were not weakened
- no preset is presented as verified
- no official approval, supervision, endorsement, particle-size equivalence,
  exact conversion, or guaranteed-result claim was added
- no source URL, raw source note, transcript, or timecode is displayed
- no Stitch ZIP, screenshot, generated HTML, generated CSS, generated
  JavaScript, or generated asset was copied or committed

## 10. Command results

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run build` | PASS | TypeScript and Vite production build completed; 73 modules transformed. |
| `npm.cmd run lint` | NOT RUN | lint script is not available in `package.json`; no lint script was added. |
| `git diff --check` | PASS | No whitespace errors. |
| `git diff --name-only` | PASS | Reviewed with untracked-file status; changes remain limited to Tools, bounded grinder model/data, CSS, and this QA document. |
| `git diff --stat` | PASS | Reviewed for bounded implementation scope. |

## 11. Known limitations

- no real conversion data, formula, or result is active
- both grinder presets are placeholder or needs-review candidates
- native controls remain disabled until a later source-verification PR
- mobile QA used the in-app Browser, not a physical iPhone
- external independent verification is still required before merge

## 12. Judgment

`PASS_WITH_NOTES`

Safe for independent verification: YES

Safe to merge after external verification: YES
