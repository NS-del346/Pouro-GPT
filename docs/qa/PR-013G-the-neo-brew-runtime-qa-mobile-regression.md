# PR-013G: THE NEO BREW Runtime QA / Mobile Regression Gate

## 1. Purpose

Verify that the PR-013F THE NEO BREW / R-09 exact runtime candidate works in
the app without regressing existing mobile UI, routing, placeholder fallback,
provenance handling, or existing methods.

## 2. Scope

This QA gate covers:

* exact R-09 `20g / 300g / 1:15` runtime selection
* required non-exact R-09 placeholder fallback cases
* the fixed 10-pour schedule and approximate completion guidance
* Recipe Setup and Brew Timer behavior at iPhone SE `375x667`
* 4:6 R-01, Hybrid R-08, Ice Brew, and generic placeholder regression checks
* provenance/status caution and non-affiliation wording
* allowed-file and static/build checks

This PR does not add or change runtime values, scaling, variants, routes,
storage, PWA behavior, packages, release files, or dist files.

## 3. Files Inspected

* `src/data/placeholderMethods.ts`
* `src/data/index.ts`
* `src/pages/BrewHomePage.tsx`
* `src/pages/RecipeSetupPage.tsx`
* `src/pages/BrewTimerPage.tsx`
* `src/components/layout/AppShell.tsx`
* `src/components/navigation/BottomTabs.tsx`
* `src/types/brew.ts`
* `src/types/source.ts`
* `src/utils/provenance.ts`
* `src/utils/sourceStatus.ts`
* `src/styles/index.css`
* `src/App.tsx`
* `package.json`
* `docs/qa/PR-011G-four-six-r01-runtime-isolation-qa.md`
* `docs/qa/PR-012G-hybrid-r08-runtime-qa.md`
* `docs/qa/PR-013F-the-neo-brew-fixed-runtime-candidate.md`

## 4. Files Changed

* `docs/qa/PR-013G-the-neo-brew-runtime-qa-mobile-regression.md`

No source file changed. No blocking PR-013F regression required a fix.

## 5. Runtime Exact-Gate QA

A temporary local executable assertion bundle imported the current
`placeholderMethods.ts` exports and called `getRecipeForSetup` directly. The
temporary bundle was created outside the repository and removed after the
check.

| Check | Expected | Result |
| --- | --- | --- |
| method | `ten-pour` | Pass |
| variant | `R-09` | Pass |
| coffee | `20g` | Pass |
| water | `300g` | Pass |
| ratio | `1:15` | Pass |
| resolved recipe | `ten-pour-r09-the-neo-brew-fixed-example` | Pass |
| exact recipe `valuesArePlaceholder` | `false` | Pass |
| exact gate scaling | unsupported | Pass |
| unsupported setup behavior | `placeholder_fallback` | Pass |

Result:

`R-09 exact 20g / 300g / 1:15 returns fixed candidate` - Pass.

The selector requires exact equality for method, setup method, variant, dose,
ratio, and water. No arbitrary scaling path exists.

## 6. Runtime Fallback QA

| Setup | Expected | Result |
| --- | --- | --- |
| R-09 `18g / 270g / 1:15` | existing method placeholder recipe | Pass |
| R-09 `20g / 280g / 1:14` | existing method placeholder recipe | Pass |
| R-09 `24g / 360g / 1:15` | existing method placeholder recipe | Pass |
| R-09 `20g / 300g / 1:16` | existing method placeholder recipe | Pass |

All four cases returned the same existing `ten-pour` method placeholder
recipe. Each result retained `valuesArePlaceholder: true`, and every returned
step retained `isPlaceholder: true`.

At `375x667`, R-09 `18g / 270g / 1:15` showed:

* the readable non-exact Recipe Setup fallback note
* `レシピ値確認中`
* `Step 1 / 2`
* confirmation-needed current and cumulative water copy
* no R-09 fixed-candidate chip or fixed 10-pour schedule

Result:

`R-09 non-exact fallback` - Pass.

## 7. Timer Schedule QA

| Pour | Start | Cumulative water | Result |
| --- | --- | --- | --- |
| 1 | `0:00` | `30g` | Pass |
| 2 | `0:30` | `60g` | Pass |
| 3 | `0:45` | `90g` | Pass |
| 4 | `1:00` | `120g` | Pass |
| 5 | `1:15` | `150g` | Pass |
| 6 | `1:30` | `180g` | Pass |
| 7 | `1:45` | `210g` | Pass |
| 8 | `2:00` | `240g` | Pass |
| 9 | `2:15` | `270g` | Pass |
| 10 | `2:30` | `300g` | Pass |

Additional schedule checks:

| Check | Result |
| --- | --- |
| R-09 fixed candidate has exactly 10 pours | Pass |
| every pour is `30g` and uses neutral `pour` semantics | Pass |
| `1:45 / 210g` is preserved as Pour 7 | Pass |
| final pour is `2:30 / 300g` | Pass |
| final step has no exact next event | Pass |
| about `3:30` remains an approximate `finish_target` only | Pass |
| exact total duration remains `null` / unresolved | Pass |
| no dripper-removal timing is invented | Pass |
| filter remains unresolved | Pass |
| scaling remains unsupported | Pass |

At `375x667`, Brew Timer interaction reached and visibly displayed:

* `Step 7 / 10`, `Pour 7`, `01:45`, and cumulative `210g`
* `Step 10 / 10`, `Pour 10`, `02:30`, and cumulative `300g`
* `約3:30` only as the approximate drawdown/completion preview

## 8. Mobile UI QA

Viewport:

`375x667` iPhone SE baseline.

| Check | Result | Evidence |
| --- | --- | --- |
| Brew Home still renders within 375px | Pass | document and body scroll width equaled client width |
| Recipe Setup still renders within 375px | Pass | document and body scroll width equaled client width |
| THE NEO BREW exact setup note is readable | Pass | exact fixed-example, approximate `3:30`, and unsupported-scaling copy visible |
| THE NEO BREW non-exact fallback note is readable | Pass | `18g / 270g / 1:15` fallback copy visible |
| Brew Timer current step area does not overflow | Pass | exact, fallback, Pour 7, and Pour 10 cards stayed within the viewport |
| Brew Timer next step preview does not overflow | Pass | `00:30`, `02:00`, placeholder, and approximate `3:30` previews stayed within the viewport |
| Pause / Back / Next controls remain tappable | Pass | Start, Pause, Resume, Next, and Back interactions completed |
| controls / CTA remain reachable | Pass | timer controls stayed within the viewport; Setup CTA remained reachable by normal scrolling |
| Bottom tabs remain stable outside Brew Timer | Pass | one bottom-tab navigation rendered on Home and Setup |
| Brew Timer bottom-tab visibility remains consistent | Pass | bottom tabs remained hidden on Brew Timer |
| provenance/status copy remains readable | Pass | exact caution copy remained readable through normal scrolling |
| no horizontal overflow | Pass | body and document scroll width equaled client width in all checked views |
| no blue `#007AFF` regression | Pass | no `#007AFF` / equivalent source match and no visual regression observed |
| no frame / device mock border introduced | Pass | no source match and no visual frame observed |

The exact R-09 Timer schedule note is dense at iPhone SE height but remains
readable through normal scrolling. Sticky controls remain reachable without
covering the focused step, target, note, or next-preview content after scroll.

## 9. Existing Method Regression QA

Executable runtime assertions:

| Check | Expected | Result |
| --- | --- | --- |
| 4:6 R-01 exact gate | non-placeholder five-step candidate | Pass |
| Hybrid R-08 exact gate | non-placeholder five-step candidate | Pass |
| 4:6 R-02 generic fallback | existing placeholder recipe | Pass |
| Ice Brew R-10 | existing placeholder recipe | Pass |

Mobile `375x667` browser checks:

| Check | Observed | Result |
| --- | --- | --- |
| 4:6 R-01 exact | `R-01 基本候補`, `Step 1 / 5` | Pass |
| 4:6 R-02 placeholder | `レシピ値確認中`, `Step 1 / 2` | Pass |
| Hybrid R-08 exact | `R-08 固定例候補`, `Step 1 / 5` | Pass |
| Ice Brew R-10 | `レシピ値確認中`, `Step 1 / 2` | Pass |
| generic placeholder fallback | confirmation-needed placeholder copy | Pass |
| bottom tabs on existing-method timers | hidden, unchanged | Pass |
| horizontal overflow | none observed | Pass |

No existing method source or UI file changed in PR-013G.

## 10. Provenance / Legal Wording QA

| Check | Expected | Result |
| --- | --- | --- |
| R-09 method `sourceStatus` | `needsReview` | Pass |
| R-09 method `verificationLevel` | `unverified` | Pass |
| R-09 variant `sourceStatus` | `needsReview` | Pass |
| R-09 variant `verificationLevel` | `unverified` | Pass |
| R-09 variant `valuesArePlaceholder` | `true` caution retained | Pass |
| exact candidate `valuesArePlaceholder` | `false` only inside exact gate | Pass |
| exact candidate steps `sourceStatus` | `needsReview` | Pass |
| exact candidate steps `verificationLevel` | `unverified` | Pass |
| exact candidate steps `isPlaceholder` | `false` only for exact candidate | Pass |
| filter evidence | `unresolved` | Pass |
| scaling evidence | `unresolved` / unsupported | Pass |
| non-affiliation wording | preserved | Pass |
| official endorsement / supervision / partnership implication | absent | Pass |

The visible exact R-09 Timer copy states that Pourō is unofficial and has no
affiliation or supervision relationship with the source. The copy does not
claim endorsement, partnership, or official status.

## 11. Build / Static Checks

| Check | Result |
| --- | --- |
| expected merged main HEAD `a0b2460` verified before branch creation | Pass |
| local `main` matched `origin/main` before branch creation | Pass |
| existing test command available without dependency installation | None |
| existing lint command available without dependency installation | None |
| executable runtime assertion matrix | Pass |
| `npm.cmd run build` | Pass |
| `git diff --check` | Pass |
| `git status --short` | Pass: only the PR-013G QA document before commit |
| `git diff --stat` | Pass: QA-doc-only |
| prohibited-file audit | Pass |
| no package or lockfile change | Pass |
| no route or storage change | Pass |
| no PWA / service worker / manifest / icon change | Pass |
| no release-doc or dist change | Pass |

## 12. Findings

Result:

Pass.

Blocking issues:

None.

Non-blocking observation:

The full exact-candidate caution copy is dense at `375x667`, but it remains
readable, scrollable, and does not cause horizontal overflow or block controls.

## 13. Fixes Made

None.

No source file changed because no blocking PR-013F runtime regression was
found.

## 14. Remaining Risks

* Filter type remains unresolved.
* Exact completion duration remains unresolved.
* Dripper-removal timing remains unresolved.
* Arbitrary scaling remains unsupported.
* Independent creator-video-frame traceability remains a future evidence task.
* Dense caution copy should remain part of future iPhone SE regression checks.

## 15. Independent Verifier Prompt

```text
Independently verify PR-013G against main after PR-013F.

Pass only if:
- PR-013G is QA/regression-focused
- R-09 exact 20g / 300g / 1:15 candidate behavior is verified
- non-exact R-09 fallback is verified
- 1:45 / 210g is preserved
- about 3:30 remains approximate only
- no arbitrary scaling is introduced
- no filter type is invented
- 4:6, Hybrid, and Ice Brew behavior is unchanged
- mobile 375px UI has no new blocking regression
- sourceStatus, verificationLevel, valuesArePlaceholder, and isPlaceholder are not weakened
- no official affiliation, endorsement, supervision, or partnership is implied
- no prohibited files are changed
- npm.cmd run build and git diff --check pass

Report findings by severity. If no issues are found, state Pass and identify remaining risks.
```

## 16. Regression Checker Prompt

```text
Run regression-only review of PR-013G.

Confirm:
- no unrelated files changed
- no dist files
- no package or lockfile changes
- no routing changes
- no localStorage schema changes
- no PWA / service worker / manifest / icon changes
- no release doc changes
- no 4:6 behavior changes
- no Hybrid behavior changes
- no Ice Brew behavior changes
- no R-09 exact gate broadening
- no R-09 arbitrary scaling
- no 1:45 / 210g change
- no official endorsement or affiliation copy
- npm.cmd run build passes
- git diff --check passes

Fail on any prohibited file or behavior change.
```

## 17. Memory / Handoff

PR-013F remains intact and PR-013G adds docs-only QA evidence.

Verified:

* exact R-09 `20g / 300g / 1:15` fixed candidate
* required non-exact placeholder fallback cases
* ten pours including critical `1:45 / 210g`
* final pour at `2:30 / 300g`
* about `3:30` as approximate completion/drawdown guidance only
* unresolved filter and unsupported scaling
* readable exact and fallback mobile notes at `375x667`
* tappable timer controls and unchanged bottom-tab behavior
* existing 4:6 R-01, Hybrid R-08, Ice Brew, and generic placeholder behavior
* conservative provenance/status flags and non-affiliation wording

Future changes must preserve the exact setup gate, placeholder fallback,
critical seventh pour, approximate-only completion semantics, unresolved
fields, disabled scaling, and non-affiliation wording.
