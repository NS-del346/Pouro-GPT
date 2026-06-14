# PR-018A: History List Rebrew CTA Minimal Review

## Scope

Add a minimal Rebrew entry point to each saved History list item while
preserving the existing History Detail review path.

## Changed files

* `src/App.tsx`
* `src/pages/HistoryPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-018A-history-list-rebrew-cta.md`

## Implementation summary

* Replaced each full-card History Detail link with an article containing two
  explicit actions.
* Kept `詳細を見る` linked to the existing History Detail route.
* Added `同じ条件で再抽出`, which copies the saved `setupSnapshot`, refreshes
  only `createdAt`, sends it through the existing replay draft mechanism, and
  navigates to Recipe Setup for the saved method.
* Added compact token-based action styling with stacked actions at narrow
  mobile widths.

## Behavior

* Empty History behavior is unchanged.
* Populated History cards keep their existing summary content.
* `詳細を見る` opens the same History Detail route as before.
* `同じ条件で再抽出` opens Recipe Setup with the saved setup prefilled.
* Rebrew does not start Timer directly.

## Manual QA

* Empty History state and Brew link: PASS
* Populated History explicit actions: PASS
* History Detail navigation: PASS
* History list Rebrew to prefilled Recipe Setup: PASS
* Timer does not auto-start: PASS
* Existing History Detail replay: PASS
* Existing Brew Home Last Brew replay: PASS
* 375x667 no horizontal overflow and usable tap targets: PASS
* 390x844 no horizontal overflow and usable tap targets: PASS
* Both mobile widths kept both actions visible at a measured 44px height.

## Regression checks

* History list load and empty state unchanged: PASS
* History Detail replay behavior unchanged: PASS
* Brew Home Last Brew behavior unchanged: PASS
* Recipe Setup replay behavior unchanged: PASS
* Timer calculations, schedules, progression, and Finish behavior unchanged:
  PASS by scope review
* History save behavior and storage schema unchanged: PASS by scope review
* `BrewSession` and `BrewSetup` shapes unchanged: PASS by scope review
* POINT/TIPS and source/provenance fields unchanged: PASS by scope review

## Source/legal safety checks

The new action uses only the user's locally saved brew session. It does not
expose source URLs, timecodes, transcripts, source notes, or endorsement or
result-guarantee claims. Source/provenance fields are unchanged.

## Commands run

* `npm run build`: PASS
* `git diff --check`: PASS
* `git status --short --branch`: PASS
* In-app browser interactive QA at 375x667 and 390x844: PASS

## Known limitations

This PR does not add direct Timer start, history editing, analytics,
comparison, cloud sync, account, sharing, or storage schema changes. Rebrew
from History list returns the user to Recipe Setup for confirmation before
brewing.
