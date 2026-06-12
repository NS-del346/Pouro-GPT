# PR-010B: Theme System Alignment QA

## 1. Purpose

This PR makes the existing Warm / Dark visual split intentional and prepares the app for future theme switching.

## 2. Scope

- Dark brew-flow token alignment
- Warm settings/info page token alignment
- No recipe, timer, data, storage, or routing changes
- No full theme switcher; the existing saved theme option remains deferred for a later PR

## 3. Files changed

- `src/components/layout/AppShell.tsx`
- `src/styles/index.css`
- `docs/qa/PR-010B-theme-system-alignment.md`

## 4. Verification

| Check                     | Result |
| ------------------------- | ------ |
| npm.cmd run build         | Pass   |
| git diff --check          | Pass   |
| No dist files             | Pass   |
| No method data changes    | Pass   |
| No recipe value changes   | Pass   |
| No timer logic changes    | Pass   |
| No route changes          | Pass   |
| No storage schema changes | Pass   |

## 5. Manual QA

Tested at:

- 375x667
- 390x844

Checks:

- Brew Home still uses the dark visual direction.
- Recipe Setup still uses the dark visual direction and the PR-010A layout remains stable.
- Settings intentionally uses the warm visual direction.
- About / Sources / Legal / Privacy visually match Settings.
- Text remains readable.
- Back links are visible and usable.
- BottomTabs do not collide with the iPhone home indicator.
- No horizontal overflow.
- No browser console warnings or errors.
- Existing Settings navigation works.

## 6. Out-of-scope follow-ups

- PR-011A Method Recipe Data Source Verification
- PR-011B Brew Timer Schedule Completion
- Future user-facing theme switcher
- Deeper PWA/offline QA if still needed

## 7. Result

Result: Pass

Blocking issues: None

Non-blocking follow-ups: Recipe data, timer schedule, full theme switcher.
