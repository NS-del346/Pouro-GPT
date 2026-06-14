# PR-018C: Export Download Artifact QA / Delete Safety Check

## 1. Purpose

Verify the Settings export/download/delete behavior introduced in PR-018B and
record actual QA results without changing app code.

## 2. Scope

* Docs-only QA record.
* No app source change.
* No storage schema change.
* No export implementation change.

## 3. Changed files

* `docs/qa/PR-018C-export-delete-qa.md`

## 4. Baseline

* Latest `main` commit: `4bc5d7937d7ea22f05691cbaa61b1ecf95d43c3c`
* PR-018B merge commit present:
  `4bc5d7937d7ea22f05691cbaa61b1ecf95d43c3c`
* `git log -1 --oneline`: `4bc5d79 PR-018B: Settings Data Export Minimal Review`
* `git pull origin main`: already up to date

## 5. Test environment

* OS: Microsoft Windows 11 Home, version `10.0.26100`, build `26100`
* Browser: Google Chrome `149.0.7827.102`, headless mode with an isolated
  temporary user-data directory
* Additional UI confirmation: Codex in-app Browser on the same local preview
* Local command: `npm.cmd run preview -- --host 127.0.0.1 --port 4181`
* URL tested: `http://127.0.0.1:4181/Pouro-GPT/settings`
* Viewports: `375x667` and `390x844`
* Storage safety: QA used the isolated `127.0.0.1:4181` origin and a disposable
  Chrome profile. No production history or normal browser profile was deleted.
* Download directory:
  `C:\Users\nagan\AppData\Local\Temp\pouro-pr018c-downloads-U54o9v`

## 6. Test data setup

A disposable saved brew record was created through the app before export:

* Method: `4:6 Method`
* Variant: `基本形 / R-01`
* Coffee: `20g`
* Water: `300g`
* Rating: `4/5`
* Taste note: `sweet`
* Taste impression: `日本語テスト: 甘くクリア`
* Next adjustment memo: `次回は少し細かく`
* Free memo:

  ```text
  CSV確認, "quote"
  改行テスト
  ```

* History count before export: `1`

## 7. CSV artifact QA

Actual downloaded artifact:

```text
pouro-brew-history-20260614-181231.csv
```

Results:

* File downloaded: PASS
* Filename starts with `pouro-brew-history-`: PASS
* Filename ends with `.csv`: PASS
* File is non-empty: PASS, `421` bytes
* UTF-8 BOM exists: PASS, `EF BB BF`
* All required headers exist: PASS
* Saved record exists: PASS
* Japanese text is readable: PASS
* Comma escaping: PASS
* Quote escaping: PASS, exported as `""quote""`
* Newline escaping: PASS, newline remained inside the quoted memo field

Required headers verified:

```text
id
finishedAtIso
methodId
methodName
variantId
coffeeGrams
waterGrams
ratio
elapsedMsAtFinish
rating
tasteNotes
tasteImpression
nextAdjustmentMemo
freeMemo
```

## 8. JSON artifact QA

Actual downloaded artifact:

```text
pouro-brew-history-backup-20260614-181231.json
```

Results:

* File downloaded: PASS
* Filename starts with `pouro-brew-history-backup-`: PASS
* Filename ends with `.json`: PASS
* File is non-empty: PASS, `4037` bytes
* Valid JSON: PASS
* Pretty-printed: PASS
* `app` is `Pouro-GPT`: PASS
* `exportType` is `brewHistoryBackup`: PASS
* `exportedAt` exists and is ISO-like: PASS,
  `2026-06-14T09:12:31.241Z`
* `schemaVersion` is `1`: PASS
* `brewHistory` is an array: PASS
* `brewHistory` contains the saved test record: PASS, count `1`

## 9. Export behavior QA

* CSV success message appears: PASS, `CSVを書き出しました。`
* JSON success message appears: PASS,
  `JSONバックアップを書き出しました。`
* CSV export preserves history: PASS, count remained `1`
* JSON export preserves history: PASS, count remained `1`
* Settings remains usable after export: PASS
* Saved Settings value remained present after export: PASS
* Export/delete-related console or runtime exception: none observed

Two manifest syntax errors were observed while visiting Recipe Setup:

```text
Manifest: Line: 1, column: 1, Syntax error.
http://127.0.0.1:4181/Pouro-GPT/setup/manifest.webmanifest
```

They did not crash the app or affect export/delete QA, but they are recorded as
a known limitation because the requested console/runtime check was not fully
clean.

## 10. Delete safety QA

Delete confirmation text:

```text
このブラウザに保存された抽出履歴をすべて削除します。設定は削除されません。
```

Cancel path:

* Click delete and confirmation appears: PASS
* Choose Cancel: PASS
* History count remains `1`: PASS
* History page still shows the saved record: PASS

Confirm path:

* Backup CSV and JSON were downloaded before confirm delete: PASS
* Confirm delete was run only in disposable browser storage: PASS
* Choose OK: PASS
* History count becomes `0`: PASS
* History page shows `まだ記録がありません`: PASS
* Settings export buttons become disabled: PASS
* Settings remain preserved: PASS; the disposable vibration setting remained
  enabled

## 11. Empty-history QA

* CSV export button disabled: PASS
* JSON export button disabled: PASS
* Empty explanation appears: PASS,
  `書き出せる保存済み履歴はありません。`
* Delete button remains visible: PASS
* No export error alert appears: PASS

## 12. Mobile QA

### `375x667`

* No horizontal overflow: PASS
* CSV button readable: PASS
* JSON button readable: PASS
* Danger delete is separated from export actions: PASS, measured gap `58.6px`
* Tap targets usable: PASS, all data-action buttons measured `52px` high
* Bottom tabs do not overlap data actions: PASS, measured overlap `0px`

### `390x844`

* No horizontal overflow: PASS
* CSV button readable: PASS
* JSON button readable: PASS
* Danger delete is separated from export actions: PASS, measured gap `58.6px`
* Tap targets usable: PASS, all data-action buttons measured `52px` high
* Bottom tabs do not overlap data actions: PASS, measured overlap `0px`

## 13. Regression checks

* Brew Home loads: PASS
* Recipe Setup loads: PASS
* Timer starts: PASS
* Finish save works: PASS
* History list loads: PASS
* History Detail loads: PASS
* History list Rebrew still works: PASS, returned to Recipe Setup
* Brew Home Last Brew still works: PASS, returned to Recipe Setup
* Settings links still work: PASS; About opened and all four Settings links
  remained present

## 14. Source/legal/storage safety checks

This PR changes only the QA document. No changes were made to:

* `sourceStatus`
* `verificationLevel`
* `valuesArePlaceholder`
* `isPlaceholder`
* `fieldEvidence`
* recipe data
* method schedules
* timer behavior
* POINT/TIPS
* PWA config
* package files
* localStorage key
* `BrewSession` shape
* `BrewSetup` shape

No official endorsement, partnership, complete reproduction, or guaranteed
brew-result claim was introduced.

## 15. Commands run

* `git status --short --branch`: PASS
* `git log -1 --oneline`: PASS
* `git pull origin main`: PASS, already up to date
* `git switch -c codex/pr-018c-export-delete-qa`: PASS
* `npm.cmd run build`: PASS
* `npm.cmd run preview -- --host 127.0.0.1 --port 4181`: PASS
* Isolated headless Chrome/CDP QA script: PASS
* PowerShell CSV BOM/header/content inspection: PASS
* PowerShell JSON `ConvertFrom-Json` inspection: PASS
* `git diff --check`: PASS
* `git status --short --branch`: PASS

## 16. Known limitations

* CSV was verified as UTF-8 text and with PowerShell, but not opened in Excel.
* PWA installed/offline export behavior was not tested.
* The in-app Browser confirmed the UI flow but does not persist browser
  downloads. Actual artifact downloads were therefore verified in an isolated
  temporary headless Chrome profile.
* Two Recipe Setup manifest syntax errors were observed at the relative
  `setup/manifest.webmanifest` URL. They were outside this docs-only PR scope
  and did not affect export/delete behavior.

## 17. Judgment

`PASS_WITH_LIMITATIONS`

CSV and JSON artifacts are valid, export preserves history, delete Cancel
preserves history, and delete Confirm clears only disposable history while
preserving Settings. The remaining limitations are the untested Excel/PWA
surfaces and the unrelated manifest errors observed during regression QA.
