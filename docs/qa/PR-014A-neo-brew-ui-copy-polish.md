# PR-014A: THE NEO BREW UI Copy Polish / Dense Caution Text Reduction

## 1. Purpose

Reduce dense THE NEO BREW / R-09 caution copy on Recipe Setup and Brew Timer
while preserving the fixed-example boundary, placeholder fallback, unresolved
filter, unsupported scaling, approximate-only about `3:30` guidance, and
non-affiliation wording.

## 2. Scope

This PR changes only the visible exact and non-exact R-09 caution copy on:

* Recipe Setup
* Brew Timer

It does not change recipe data, schedules, gates, fallback logic, provenance
flags, routes, storage, PWA behavior, packages, release files, or dist files.

## 3. Files Changed

* `src/pages/RecipeSetupPage.tsx`
* `src/pages/BrewTimerPage.tsx`
* `docs/qa/PR-014A-neo-brew-ui-copy-polish.md`

No CSS change was needed.

## 4. Copy Before / After Summary

### Recipe Setup exact R-09 note

Before:

```text
THE NEO BREW の固定例（20g / 300g / 1:15）のみ確認済み候補として表示します。約3:30は落ち切りの目安です。任意換算には対応していません。
```

After:

```text
THE NEO BREWは20g / 300g / 1:15の固定例のみ表示します。約3:30は落ち切り目安で、任意換算は未対応です。
```

### Recipe Setup non-exact R-09 fallback note

Before:

```text
THE NEO BREW の確認済み候補は20g / 300g / 1:15のみです。この設定ではplaceholderガイドを表示します。
```

After:

```text
確認済み候補は20g / 300g / 1:15のみです。この設定ではplaceholderガイドを表示します。
```

### Brew Timer exact R-09 note

The heading remains:

```text
THE NEO BREW 固定例（20g / 300g / 1:15）
```

Before:

```text
10投の確認済み候補です。約3:30は落ち切りの目安で、正確な完了時刻やドリッパー取り外し時刻ではありません。フィルターは未解決、任意換算は非対応です。HARIO V60 NEO推奨、V60対応です。Pourōは非公式で、出典元との提携・監修関係はありません。
```

After:

```text
THE NEO BREW固定例のみです。約3:30は落ち切り目安で、正確な完了時刻ではありません。フィルターは未解決、任意換算は非対応です。Pourōは非公式で、出典元との提携・監修関係はありません。
```

### Brew Timer non-exact R-09 fallback note

The heading remains:

```text
THE NEO BREW の確認済み候補は 20g / 300g / 1:15 のみです
```

Before:

```text
この設定ではplaceholderガイドを表示しています。
```

After:

```text
この設定はplaceholderガイドです。
```

## 5. Exact R-09 Setup QA

| Check | Result |
| --- | --- |
| exact setup remains `20g / 300g / 1:15` | Pass |
| Recipe Setup identifies a fixed example only | Pass |
| Brew Timer identifies a fixed example only | Pass |
| `1:45 / 210g` remains unchanged | Pass |
| about `3:30` remains approximate-only guidance | Pass |
| scaling remains unsupported | Pass |

## 6. Non-Exact R-09 Fallback QA

| Check | Result |
| --- | --- |
| non-exact setup remains placeholder fallback | Pass |
| Recipe Setup fallback note is shorter and clear | Pass |
| Brew Timer fallback note is shorter and clear | Pass |
| no exact gate broadening | Pass |

## 7. Mobile 375px Readability QA

Viewport:

`375x667`

| Check | Result |
| --- | --- |
| exact Recipe Setup note is readable | Pass |
| non-exact Recipe Setup note is readable | Pass |
| exact Brew Timer note is readable | Pass |
| non-exact Brew Timer note is readable | Pass |
| no horizontal overflow | Pass |
| controls remain tappable and reachable | Pass |
| Brew Timer bottom-tab behavior remains unchanged | Pass |

The browser viewport was set to `375x667`. Exact and fallback Recipe Setup and
Brew Timer states stayed within the viewport width. Timer controls remained
reachable, and the exact caution block could be scrolled fully above the fixed
controls.

## 8. Existing Method Regression QA

| Check | Result |
| --- | --- |
| 4:6 behavior unchanged | Pass |
| Hybrid behavior unchanged | Pass |
| Ice Brew behavior unchanged | Pass |
| no existing-method copy or runtime file changed | Pass |

## 9. Provenance / Legal Wording QA

| Check | Result |
| --- | --- |
| filter remains unresolved | Pass |
| scaling remains unsupported | Pass |
| Pourō remains explicitly non-official | Pass |
| no source affiliation or supervision is implied | Pass |
| no endorsement or partnership is implied | Pass |
| source/status/provenance flags remain unchanged | Pass |

## 10. Build / Static Checks

| Check | Result |
| --- | --- |
| baseline `6abafdd` matched `origin/main` before branch creation | Pass |
| existing test command available without dependency installation | None |
| existing lint command available without dependency installation | None |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass; expected three-file PR scope |
| `git diff --stat` | Pass; expected three-file PR scope |
| prohibited-file audit | Pass |

## 11. Findings

Pass. The four R-09 caution surfaces are shorter while retaining their required
fixed-example, fallback, approximate timing, unresolved-filter,
unsupported-scaling, and non-affiliation semantics. No CSS change was needed.

## 12. Remaining Risks

* Filter type remains unresolved.
* Exact completion duration remains unresolved.
* Arbitrary scaling remains unsupported.
* Readability depends on concise safety copy remaining intact in future edits.

## 13. Independent Verifier Prompt

```text
Independently verify PR-014A against main after PR-013G.

Pass only if:
- PR-014A only reduces dense R-09 caution copy
- exact gate behavior is unchanged
- placeholder fallback is unchanged
- 1:45 / 210g is unchanged
- about 3:30 remains approximate-only guidance
- filter remains unresolved
- scaling remains unsupported
- non-affiliation / non-official wording is preserved
- sourceStatus, verificationLevel, valuesArePlaceholder, and isPlaceholder are not weakened
- 4:6, Hybrid, and Ice Brew behavior is unchanged
- mobile 375px readability has no new blocking regression
- no prohibited files are changed
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 14. Regression Checker Prompt

```text
Run regression-only review of PR-014A.

Confirm:
- no recipe data changed
- no timing changed
- no 1:45 / 210g change
- no exact gate broadening
- no arbitrary scaling
- no filter invention
- no official endorsement or affiliation copy
- no 4:6 behavior changes
- no Hybrid behavior changes
- no Ice Brew behavior changes
- no route changes
- no localStorage schema changes
- no PWA / service worker / manifest / icon changes
- no package or lockfile changes
- no dist files
- npm.cmd run build passes
- git diff --check passes

Fail on any prohibited file or behavior change.
```

## 15. Memory / Handoff

PR-014A is a copy-only readability pass. Future changes must preserve the exact
R-09 setup gate, placeholder fallback, critical `1:45 / 210g` seventh pour,
approximate-only about `3:30` guidance, unresolved filter, unsupported scaling,
and explicit non-affiliation wording.
