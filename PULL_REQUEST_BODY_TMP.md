# PR-016B: Rebrew Shortcut / Last Brew Entry Point

## Summary

Adds a compact Last Brew shortcut to Brew Home when local brew history exists. The shortcut uses the latest saved brew session and routes the user back to Recipe Setup with the previous setup values prefilled for confirmation.

## Scope

- Connect BrewHomePage to the existing replaySetupDraft mechanism.
- Show only the latest history entry on Brew Home.
- Copy setupSnapshot and refresh createdAt before replay.
- Add compact styling for the Last Brew card.
- Add PR QA documentation.

## Out of scope

- Direct Timer start.
- Storage schema changes.
- Recipe or timer behavior changes.
- POINT/TIPS changes.
- App-wide dark/cockpit redesign.
- Cloud sync, analytics, comparison, history editing, SNS, or bean inventory.

## Checks

- npm run build
- git diff --check

## Manual QA note

Browser interaction checks at 375x667 and 390x844 were not completed in the local environment and are documented in the QA file.
