# PR-018B: Settings Data Export Minimal Review

## Scope

Add minimal local CSV and JSON export actions to Settings data management while
preserving existing history storage and deletion behavior.

## Changed files

* `src/pages/SettingsPage.tsx`
* `src/styles/index.css`
* `docs/qa/PR-018B-settings-data-export.md`

## Implementation summary

* Added a primary CSV export action for user-readable history review.
* Added a visually secondary JSON backup action for detailed local backup.
* Added disabled empty-history export states and a short explanatory message.
* Kept the existing delete-all action visually dangerous and separated from
  export actions.

## Export behavior

* Both exports read the current saved history through `getBrewHistory()`.
* CSV includes the required review columns, safely escapes values, and includes
  a UTF-8 BOM for Japanese spreadsheet compatibility.
* JSON includes `app`, `exportType`, `exportedAt`, `schemaVersion`, and the
  unmodified saved `brewHistory`, formatted with two-space indentation.
* Export uses browser-native Blob downloads with timestamped filenames.
* Successful exports update the existing Settings status message.

## Manual QA

* Zero-history Settings load and disabled export actions: PASS
* Empty-history explanatory text: PASS
* Created and saved one brew record through the app for populated-history QA:
  PASS
* Populated Settings count updates to one and enables both export actions: PASS
* CSV export action and success status message: PASS
* JSON export action and success status message: PASS
* Export preserves the saved history count: PASS
* Existing delete confirmation and deletion behavior: NOT RUN (destructive
  confirmation action was not completed)
* Downloaded CSV filename and file contents: NOT RUN (the available browser QA
  environment does not expose download artifacts)
* Downloaded JSON filename and file contents: NOT RUN (the available browser QA
  environment does not expose download artifacts)
* CSV required headers, saved-record mapping, UTF-8 BOM, null handling, and CSV
  escaping: PASS by implementation review
* JSON backup structure, saved-history mapping, and two-space formatting: PASS
  by implementation review
* 375x667 no horizontal overflow, readable actions, separated danger action,
  and 52px button height: PASS
* 390x844 no horizontal overflow, readable actions, separated danger action,
  and 52px button height: PASS
* Console/runtime crash check: PASS

## Regression checks

* Existing Settings load and history count behavior: PASS
* Existing history save behavior: PASS
* Existing delete behavior: NOT RUN
* Storage keys and saved object shapes unchanged: PASS by scope review
* Recipe, timer, replay, POINT/TIPS, and PWA behavior unchanged: PASS by scope
  review

## Source/legal safety checks

The exports contain only the user's locally saved brew history. The compact
Settings UI does not expose raw source metadata or add endorsement,
partnership, complete-reproduction, or guaranteed-result claims. Existing
source and provenance fields are unchanged.

## Commands run

* `npm run build`: PASS
* `git diff --check`: PASS
* `git status --short --branch`: PASS

## Known limitations

This PR does not add import/restore, cloud sync, account, sharing, analytics,
history editing, per-record delete, CSV customization, storage migration, or
schema changes.
