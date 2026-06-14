# PR-019C: Legacy localStorage Guard / Corrupted History Recovery

## 1. Purpose

Prevent blank-screen crashes when the `brewHistory` localStorage value contains
legacy, partial, malformed, or otherwise corrupted records.

## 2. Scope

* Add defensive validation and returned-value normalization in the existing
  brew history repository.
* Keep the `brewHistory` key, `MAX_HISTORY_COUNT`, save/replay behavior, export
  format, and current storage schema unchanged.
* Do not change page UI, recipe data, timer behavior, POINT/TIPS, PWA files, or
  package dependencies.

## 3. Changed files

Exactly:

* `src/repositories/brewHistoryRepository.ts`
* `docs/qa/PR-019C-legacy-localstorage-guard.md`

## 4. Implementation summary

* `readHistoryValue()` safely parses unknown storage input and returns only
  sessions that are safe for current Brew Home, History, History Detail,
  Rebrew, and Settings export consumers.
* Required session, method snapshot, setup snapshot, method-specific numeric,
  and timer status values are checked before a record is returned.
* Malformed optional result values are ignored or normalized only in returned
  objects. Missing setup memo strings are normalized to empty strings for safe
  Rebrew input state.
* Normal hot-brew records require finite `coffeeGrams`, `waterGrams`, and
  `ratio`. Existing ice-brew records retain their current method-specific shape
  and require finite `coffeeGrams`, `hotWaterGrams`, and `iceGrams`.
* `getBrewHistory()` and `getBrewSessionById()` share the same sanitized read
  path. Settings CSV/JSON export already reads through `getBrewHistory()`.
* `saveBrewSession()` reads the sanitized current history before writing the
  new valid session plus valid existing sessions.

## 5. Corrupted localStorage fixtures

All fixture QA used the isolated local-preview origin in a disposable headless
Chrome profile. No real browser profile or production history was changed.

| Fixture | Actual result |
| --- | --- |
| A: `not-json` | PASS: Brew Home, History, and Settings loaded; no Last Brew; zero History cards; Settings count `0`; exports disabled; no page exception |
| B: `{"bad": true}` | PASS: Brew Home, History, and Settings loaded with safe empty-history behavior; no page exception |
| C: array item missing `setupSnapshot` | PASS: invalid item was not rendered or exported; direct malformed History Detail ID redirected to History |
| D: setup missing `coffeeGrams` | PASS: invalid item was not rendered; no `coffeeGrams` exception; direct malformed History Detail ID redirected to History |
| E: mixed current valid and invalid items | PASS: one valid item rendered; invalid item was ignored; count was `1`; Detail, list Rebrew, Last Brew, CSV, and JSON remained usable |

For fixtures A-D, the raw `brewHistory` string remained byte-for-byte unchanged
after Brew Home, History, Settings, and direct malformed-ID reads.

Additional defensive fixtures:

* Malformed optional `result.tasteNotes`, `result.rating`, and memo values:
  PASS; the record remained renderable after returned-value normalization.
* Mixed valid and invalid ice-brew records: PASS; the valid method-specific
  setup rendered in History and History Detail while the invalid record was
  ignored.

## 6. Manual QA

Local production preview:

```text
npm.cmd run preview -- --host 127.0.0.1 --port 4181
```

Port `4181` was already occupied, so Vite started this PR build at:

```text
http://127.0.0.1:4182/Pouro-GPT/
```

Results:

* Brew Home loads with corrupt history: PASS.
* History loads with corrupt history: PASS.
* Settings loads with corrupt history: PASS.
* Last Brew remains hidden for invalid-only history: PASS.
* Last Brew works for a valid mixed-fixture record: PASS.
* History Detail rejects malformed records and loads valid records: PASS.
* History list Rebrew works for a valid mixed-fixture record: PASS.
* Settings CSV/JSON export does not crash: PASS.
* Clear history works in disposable storage: PASS.
* No page exception was observed across the required fixtures.

Mobile viewport QA was not rerun because this PR changes no page UI, layout, or
styles.

## 7. Regression checks

A clean in-app Browser origin completed the normal flow:

| Check | Result |
| --- | --- |
| Brew Home loads | PASS |
| Recipe Setup loads | PASS |
| Timer starts and reaches Finish | PASS |
| Finish save works | PASS |
| History Detail loads | PASS |
| History list loads | PASS |
| History list Rebrew returns to Recipe Setup | PASS |
| Brew Home Last Brew appears and returns to Recipe Setup | PASS |
| Settings loads with count `1` | PASS |

The mixed-history save path was also exercised in disposable storage. A normal
new brew save produced:

* the new current app record
* the existing valid record
* no invalid record

The invalid entry was excluded only when that later app-managed save rewrote
history. No page exception occurred.

PWA resource checks:

* `/Pouro-GPT/manifest.webmanifest`: HTTP `200`
* `/Pouro-GPT/icons/icon-192.png`: HTTP `200`
* `/Pouro-GPT/icons/icon-512.png`: HTTP `200`

## 8. Settings export safety

Settings CSV and JSON export both call `getBrewHistory()`. With one valid and
one invalid mixed record:

* Settings visible history count: `1`
* CSV generation: PASS
* JSON generation: PASS
* generated CSV includes valid ID: PASS
* generated JSON includes valid ID: PASS
* generated CSV excludes invalid ID: PASS
* generated JSON excludes invalid ID: PASS
* raw localStorage remains unchanged after export: PASS
* export-related page exception: none

The disposable headless Chrome run captured and inspected the generated Blob
artifacts before the anchor download:

```text
pouro-brew-history-20260614-211503.csv
pouro-brew-history-backup-20260614-211503.json
```

## 9. Data safety notes

Reading corrupt history does not call `setItem`, `removeItem`, or clear the
`brewHistory` key. Required and additional corrupt fixture reads confirmed the
raw stored string remained unchanged.

When the app later performs a normal save or per-record delete, the existing
repository write flow naturally rewrites the returned safe history and excludes
invalid records from that future app-managed value. The mixed-history normal
save QA confirmed this behavior.

Clear history was tested only in disposable storage.

## 10. Source/legal/storage safety checks

Final diff audit confirms no changes to:

* recipe data, method schedules, timer calculations, or step progression
* History save/replay semantics for valid records
* Settings export UI or export format
* POINT/TIPS data or display behavior
* `sourceStatus`, `verificationLevel`, `valuesArePlaceholder`, `isPlaceholder`,
  or `fieldEvidence`
* localStorage key, `BrewSession` shape, or `BrewSetup` shape
* PWA manifest, service worker, base path, or package dependencies

No official endorsement, partnership, complete reproduction, guaranteed
method accuracy, or guaranteed brew-result claim was introduced.

## 11. Commands run

* `git fetch origin`: PASS.
* `git rev-list --left-right --count main...origin/main`: PASS, `0 0`.
* `git switch -c codex/pr-019c-legacy-localstorage-guard`: PASS.
* `npm.cmd run build`: PASS.
* `npm.cmd run preview -- --host 127.0.0.1 --port 4181`: PASS; Vite selected
  `4182` because `4181` was already occupied.
* Disposable-profile Chrome/CDP corrupted-fixture QA: PASS.
* In-app Browser clean-profile brew/history/rebrew/Last Brew smoke: PASS.
* `git diff --check`: PASS.
* `git diff --cached --check`: PASS.
* `git status --short --branch`: PASS; exactly the two expected files were
  staged.

## 12. Known limitations

* The in-app Browser does not support retaining downloads. Mixed-history CSV
  and JSON safety was therefore verified by capturing the generated Blob
  artifacts in disposable headless Chrome before the anchor download.
* Mobile viewport QA was not rerun because no page UI, layout, style, or tap
  target changed.
* Validation intentionally focuses on current UI-safe records. Unsupported
  future method IDs or future storage shapes will remain hidden until repository
  validation is extended for them.

## 13. Judgment

`PASS_READY_FOR_NEXT_PR`

All required corrupted fixtures avoid blank screens and uncaught exceptions.
Valid mixed-history records remain usable across History, Detail, Rebrew, Last
Brew, and Settings export. Reads leave raw storage untouched, and a later normal
save safely excludes invalid records from the app-managed rewrite.
