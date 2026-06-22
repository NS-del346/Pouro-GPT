# PR-UI-HOME-02: Flat Stacked Method Deck QA

## Before problem

Brew Home rendered four full-height method cards, then appended a separate selected-method detail card and CTA below them. The selected state therefore increased the page's effective reading length, pushed the primary action away from the method selector, and made a 375px-wide phone depend on unnecessary scrolling.

The Last Brew shortcut was also a multi-section card containing a heading, summary, completion timestamp, and separate button. Its height competed with the main method-selection task.

## Final Flat Stacked Method Deck specification

- Keeps the `pourō` text wordmark and `Pour slowly. Brew deeply.` tagline.
- Keeps all four method headers visible in DOM order: 4:6, Hybrid, 10 Pour, Ice Brew.
- Uses one fixed-height, 398px deck. Selecting a method never appends content after the deck and never changes deck height.
- Uses the official method PNGs from PR #105 in each header and in the selected front panel.
- Uses flat matte surfaces, 1px borders, 9-10px radii, no card shadow, no filter, no 3D transform, and no gradient.
- Keeps Warm Cream, Deep Charcoal, and Amber through the existing theme variables.

## Last Brew compacting

- Replaces the large Last Brew article with a single 52-64px button strip.
- Displays `前回：method · setup summary ›` in one or two lines.
- Reads only `getBrewHistory()[0]`.
- Copies the existing `setupSnapshot`, refreshes only `createdAt`, and navigates to Recipe Setup.
- Does not start Timer directly and does not change history storage or replay schema.

## Card stacking structure

- Each method header remains a native `button` with a minimum 48px height.
- Headers overlap by 6px, leaving a 42px index step for each rear card.
- DOM order is unchanged. CSS absolute positioning and `z-index` create the deck relationship.
- The selected header moves 12px toward the front and gains an Amber edge, strong border, circular check marker, `aria-pressed="true"`, and `aria-expanded="true"`.
- Only the selected method's related region is visible. Collapsed regions remain `hidden`.

## Front card structure

The fixed front panel contains only:

- official PNG;
- method name;
- concise recipe signature derived from the first existing method variant;
- `shortDescription`, clamped to two lines;
- recipe status;
- 52px Amber `レシピ設定へ` CTA.

The Home view no longer displays `longDescription`, source-status detail lists, verification-level detail lists, raw source material, or large reference badges. Underlying method data is unchanged.

## Motion specification

- Header movement: 12px.
- Duration: 200ms.
- Easing: `ease-out`.
- Front-panel entrance: 12px vertical translation with subtle opacity change.
- No scale, rotate, 3D transform, spring, or bounce.
- `prefers-reduced-motion: reduce` sets both transition and animation duration to `0s`.

## Minimal-scroll decision

Selection marks a pending visibility check. After React commits the new panel, the implementation measures:

1. the selected CTA's `getBoundingClientRect()`;
2. the fixed Bottom Tabs' `getBoundingClientRect()`;
3. the viewport bottom when Bottom Tabs are not obstructing it.

No scrolling occurs when the CTA plus a 12px safety margin is already visible. When obstructed, `window.scrollBy()` receives only the measured hidden amount plus the safety margin. Normal motion uses `smooth`; reduced motion uses `auto`. There is no initial scroll, automatic first-render scroll, `scrollIntoView()`, or scroll-to-top behavior.

## Changed files

- `src/pages/BrewHomePage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-UI-HOME-02-flat-stacked-method-deck.md`

## Protected scope audit

No changes were made to recipe or method data, schedules, source/provenance fields, Timer calculations/state/steps, Finish, History save, History Detail replay, Recipe Setup behavior, Settings, Bottom Tab destinations or visibility, routes, localStorage keys, schemas, `BrewSetup`, `BrewSession`, PWA files, official PNG files, dependencies, or PR #78.

## Commands and build results

| Command | Result |
| --- | --- |
| `npm.cmd ci` | PASS; 73 packages installed, 0 vulnerabilities |
| `npm.cmd run build` | PASS; TypeScript and Vite production build |
| `git diff --check` | PASS |

`package.json` has no `test` or `lint` script, so neither command exists to run.

## Viewport QA

The in-app browser connection could not start because its Windows sandbox process was denied. QA therefore used installed Chrome headless against the same local Vite preview and `/Pouro-GPT/` route. Runtime exceptions and browser log errors: none.

### 375 x 667

- PASS: history absent and Last Brew present states tested.
- PASS: four method headers visible; each header is at least 48px high.
- PASS: selection changed 4:6 to Hybrid while all other headers remained visible.
- PASS: document height stayed `667px` before and after selection.
- PASS: selection scroll calls: `0`; scroll position stayed `0`.
- PASS: CTA bottom was `462.98px`; Bottom Tabs top was `594px`.
- PASS: all 8 rendered deck PNG instances loaded.
- PASS: document width/client width both `375px`; no horizontal overflow.
- PASS: Last Brew present state kept document height `667px`, scroll position `0`, and CTA above Bottom Tabs.

### 393 x 852

- PASS: history absent and Last Brew present states tested.
- PASS: selection changed 4:6 to Ice Brew while all other headers remained visible.
- PASS: document height stayed `852px` before and after selection.
- PASS: selection scroll calls: `0`; scroll position stayed `0`.
- PASS: CTA bottom was `474.88px`; Bottom Tabs top was `779px`.
- PASS: all 8 rendered deck PNG instances loaded.
- PASS: document width/client width both `393px`; no horizontal overflow.
- PASS: selected Ice Brew CTA navigated to `/Pouro-GPT/setup/ice-brew`, not Timer.
- PASS: Last Brew present state kept document height `852px`, scroll position `0`, and CTA above Bottom Tabs.

### Minimal-scroll stress check

At an additional constrained `375 x 480` viewport, selecting 10 Pour measured `79.98px` of obstruction and issued one `window.scrollBy({ top: 79.98, behavior: "smooth" })`. The resulting CTA was above Bottom Tabs, focus remained on the selected header, and document height stayed unchanged. Under reduced motion, the equivalent check issued one `auto` scroll with the measured `67.98px` delta.

## Accessibility QA

- PASS: accessibility tree exposed four buttons named `4:6 Method`, `Hybrid Method`, `10 Pour Method`, and `Ice Brew`.
- PASS: selected region is associated through `aria-controls`/`aria-labelledby`.
- PASS: `aria-pressed` and `aria-expanded` update together.
- PASS: official PNGs use `alt=""` and `aria-hidden="true"`.
- PASS: accessible CTA is exposed as link `レシピ設定へ`.
- PASS: keyboard focus remained on the selected method button after the React update.
- PASS: Bottom Tabs accessibility names remained `抽出`, `ツール`, `履歴`, `設定` under `メインナビゲーション`.
- PASS: reduced-motion computed transition and animation durations were both `0s`.
- PASS: Last Brew button navigated to `/Pouro-GPT/setup/four-six`; Timer was not started.

## Screenshots

Captured outside the repository under `C:\tmp\pouro-home-qa-screenshots` to preserve the requested three-file PR scope:

- `home-375x667-initial.png`
- `home-375x667-hybrid-selected.png`
- `home-393x852-initial.png`
- `home-393x852-ice-selected.png`
- `home-393x852-last-brew.png`

## Known limitations / Human Gate

- Physical iPhone touch testing was not run.
- Actual iOS VoiceOver was not run; Chrome's accessibility tree was used as the VoiceOver-equivalent name/role check.
- The in-app browser could not start in this Windows sandbox; installed Chrome headless was used for browser QA and screenshots.
- Human review should confirm tactile preference for the 42px visual stack step and 12px selected slide on an iPhone. No code change is required for this gate.
