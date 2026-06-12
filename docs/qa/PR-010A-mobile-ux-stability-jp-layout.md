# PR-010A: Mobile UX Stability / Japanese Layout Polish QA

## 1. Purpose

This PR reduces mobile layout instability, awkward Japanese wrapping, redundant custom controls, and interference between page content, the bottom CTA, BottomTabs, and the iPhone safe area.

## 2. Scope

- Polished the Home wordmark accent and method icon labels.
- Stabilized the Recipe Setup method header, variant chips, selected variant card, and Advanced ratio shortcut.
- Hid inactive custom dose and ratio inputs behind accessible Custom gear triggers.
- Adjusted BottomTabs and page spacing for the bottom safe area.
- Did not change recipe data or method data.
- Did not change timer schedules or timer logic.

## 3. Files changed

- `src/pages/BrewHomePage.tsx`
- `src/pages/RecipeSetupPage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-010A-mobile-ux-stability-jp-layout.md`

## 4. Verification

| Check                   | Result |
| ----------------------- | ------ |
| npm.cmd run build       | Pass   |
| git diff --check        | Pass   |
| No dist files           | Pass   |
| No method data changes  | Pass   |
| No recipe value changes | Pass   |
| No route changes        | Pass   |

## 5. Manual mobile QA

Tested at `375x667` and `390x844`.

- Home wordmark remains readable, with the macron accent visible in amber without shifting the wordmark.
- 4:6 Method icon shows `4:6`.
- Ice Brew icon shows `Ice`.
- Recipe Setup keeps the method title separate from the selected variant badge.
- Basic and Advanced variant selection keeps the same measured summary, chip section, selected card, ratio section, and total page heights.
- `甘み重視` stays out of the large method heading.
- `世界大会仕様` and its `Advanced` badge remain readable in the horizontal chip row.
- Dose custom input is hidden by default and opens only from its Custom gear trigger.
- Ratio custom input is hidden by default and opens only from its Custom gear trigger.
- Selecting a dose or ratio preset closes the related custom input.
- The Setup CTA is in normal document flow, does not cover form content, and has clear space above BottomTabs at the end of the form.
- BottomTabs remain visible on Brew, History, Settings, and Settings info pages.
- BottomTabs touch targets measured at least `48px`.
- BottomTabs use additional bottom safe-area padding and do not crowd the viewport bottom.
- Brew Timer continues to hide BottomTabs.
- No horizontal overflow was observed.
- No browser console warnings or errors were observed.

## 6. Out-of-scope follow-ups

- PR-010B: Theme System Alignment, including Settings theme alignment.
- PR-011A: Method Recipe Data Source Verification.
- PR-011B: Brew Timer Schedule Completion.

## 7. Result

Result: Pass.

Blocking issues: None.

Non-blocking follow-ups: Theme system, recipe data, and timer schedule.
