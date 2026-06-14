# PR-016B: Rebrew Shortcut / Last Brew Entry Point

## Scope

Add one compact Last Brew shortcut near the top of Brew Home when local brew
history exists. The shortcut returns the latest saved setup to Recipe Setup for
review before brewing.

## Changed files

* `src/App.tsx`
* `src/pages/BrewHomePage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-016B-rebrew-shortcut-last-brew-entry.md`

## Implementation summary

* Brew Home reads the existing local history and shows only `history[0]`.
* The card reuses existing session method, variant, setup summary, and date
  display helpers.
* The CTA copies the latest `setupSnapshot`, refreshes only `createdAt`, sends
  it through the existing replay draft mechanism, and navigates to the saved
  method's Recipe Setup route.
* The compact card and real button use the existing design tokens.

## Out of scope confirmations

No account, cloud sync, analytics, comparison, graph, history editing, direct
timer start, recipe data, method schedule, timer logic, finish flow, POINT /
TIPS, provenance, PWA, package, or storage schema change is included.

## Manual QA

* 375x667 browser interactive QA: NOT RUN in local environment
* 390x844 browser interactive QA: NOT RUN in local environment
* Reason: local environment did not support interactive browser verification.

## Regression checks

* Static scope review: PASS
* Changed files limited to intended PR scope: PASS
* No recipe data changes: PASS
* No method schedule changes: PASS
* No timer behavior changes: PASS
* No POINT/TIPS changes: PASS
* No source/provenance flag changes: PASS
* No localStorage schema changes: PASS
* No route changes except Brew Home wiring to existing replay mechanism: PASS
* History Detail replay not directly modified: PASS
* Timer / Finish / Settings not directly modified: PASS
* No direct Timer start added: PASS
* No account / cloud / analytics / graph / SNS / bean inventory added: PASS

## Source/legal safety checks

The Last Brew card displays only the user's locally saved session summary. It
does not expose source URLs, titles, timecodes, transcripts, or source notes,
and it makes no official endorsement, partnership, or guaranteed accuracy
claim.

## Commands run

* `npm run build`: PASS
* `git diff --check`: PASS
* `git status --short --branch`: PASS
* `git commit`: PASS

## Known limitations

This PR does not add cloud sync, analytics, comparison, history editing, or direct timer start. The shortcut returns the user to Recipe Setup for confirmation before brewing.

Interactive mobile browser QA at 375x667 and 390x844 remains pending.
