# PR-V2-02: Ver1.0 UX Audit and Problem Map QA

## 1. Purpose

完成・公開済みの Pourō-GPT Ver1.0.0 を、runtime を変更せず docs-only で監査し、Ver2.0 の problem map、priority、guardrail を記録します。

## 2. Changed Files

- `docs/v2/VER1_UX_AUDIT_PROBLEM_MAP.md`
- `docs/v2/README.md`
- `docs/qa/PR-V2-02-ver1-ux-audit-problem-map.md`

Changed-file allowlist: PASS

## 3. Docs-only Confirmation

- App source changed: NO
- Public assets changed: NO
- Package / dependency files changed: NO
- PWA manifest / Service Worker / base path changed: NO
- Recipe data / timer behavior / localStorage behavior changed: NO
- Production UI changed: NO
- Release metadata changed: NO

No app code was changed.

## 4. Source Files Inspected

Primary Ver2 planning sources:

- `docs/v2/PRODUCT_VISION.md`
- `docs/v2/UX_STRATEGY.md`
- `docs/v2/VISUAL_DIRECTION.md`
- `docs/v2/INFORMATION_ARCHITECTURE.md`
- `docs/v2/PR_ROADMAP.md`
- `docs/v2/PR-V2-01-market-research-consolidation.md`
- `docs/v2/research/PR-V2-01-market-research-summary.md`
- `docs/v2/README.md`

Current Ver1.0 implementation and public/runtime sources:

- `README.md`
- `src/App.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/navigation/BottomTabs.tsx`
- `src/pages/BrewHomePage.tsx`
- `src/pages/RecipeSetupPage.tsx`
- `src/pages/BrewTimerPage.tsx`
- `src/pages/BrewFinishPage.tsx`
- `src/pages/HistoryPage.tsx`
- `src/pages/HistoryDetailPage.tsx`
- `src/pages/SettingsPage.tsx`
- `src/pages/SourcesPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/LegalPage.tsx`
- `src/pages/PrivacyPage.tsx`
- `src/repositories/brewHistoryRepository.ts`
- `src/repositories/userSettingsRepository.ts`
- `src/types/brew.ts`
- `src/types/source.ts`
- `src/utils/provenance.ts`
- `src/utils/sourceStatus.ts`
- `src/utils/registerServiceWorker.ts`
- `src/data/placeholderMethods.ts`
- `src/styles/index.css`
- `public/manifest.webmanifest`
- `public/sw.js`

Selected prior QA records were used only as secondary repo evidence, not as a replacement for current source inspection:

- `docs/qa/PR-013F-the-neo-brew-fixed-runtime-candidate.md`
- `docs/qa/PR-013G-the-neo-brew-runtime-qa-mobile-regression.md`
- `docs/qa/PR-016A-brew-timer-target-total-priority-ui.md`
- `docs/qa/PR-018A-history-list-rebrew-cta.md`
- `docs/qa/PR-018B-settings-data-export.md`
- `docs/qa/PR-019B-pwa-install-offline-qa.md`
- `docs/qa/PR-019C-legacy-localstorage-guard.md`
- `docs/qa/PR-020A-ver1-release-candidate-qa.md`

## 5. Ver1.0 Constraints Preserved

- Ver1.0.0 is treated as complete and stable: PRESERVED
- local-first / no account / no backend: PRESERVED
- GitHub Pages PWA simplicity: PRESERVED
- History / Rebrew / Last Brew loop: PRESERVED
- source/provenance metadata: PRESERVED
- non-official legal posture: PRESERVED
- limited method scope: PRESERVED
- protected runtime / schema / recipe / timer behavior: UNCHANGED

THE NEO BREW / R-09 protected constraints:

- exact `20g / 300g / 1:15`: PRESERVED
- arbitrary scaling unsupported: PRESERVED
- `1:45 / 210g`: PRESERVED
- about `3:30` remains drawdown / finish guidance, not a guarantee: PRESERVED

## 6. PR-V2-01 Use

PR-V2-01 findings were used as planning input only.

- Treated as final market validation: NO
- Treated as verified user demand: NO
- Treated as implementation approval: NO
- Target Total-first and Light Precision Cockpit described as fully solved: NO

## 7. Evidence Separation Check

The audit separates:

- confirmed from source
- inferred UX issue
- requires browser validation
- requires 375×667 validation
- planning candidate
- not yet implementation-approved

Result: PASS

## 8. Runtime / Manual QA

- Browser QA: NOT RUN
- 375×667 mobile QA: NOT RUN
- 390×844 mobile QA: NOT RUN
- Manual production UI changes to verify: NONE

Reason: this PR is docs-only and intentionally records browser/mobile validation needs rather than claiming a new usability result.

## 9. Known Limitations

- This audit inspects current source and repository documentation; it is not a new user study or market-validation exercise.
- Browser, actual iPhone, standalone PWA install, update behavior, keyboard behavior, and real brewing-context usability were not tested in this PR.
- One-second glanceability, Japanese label comprehension, and small-viewport risks remain validation topics.
- Future comparison, edit/delete, restore, drawdown, and Next Cup Hint behavior remains design work and is not implementation-approved.

## 10. Checks Run

- `git diff --name-only`: PASS; before staging, the tracked working-tree diff
  showed only `docs/v2/README.md`. Git does not include untracked files in this
  command, so the two new documents were also verified with the staged checks
  below.
- `git diff --stat`: PASS; tracked working-tree diff reviewed before staging.
- `git diff --check`: PASS; tracked working-tree whitespace check before
  staging.
- `git diff --cached --name-only`: PASS; exactly the three allowed docs files.
- `git diff --cached --stat`: PASS; staged docs-only diff reviewed.
- `git diff --cached --check`: PASS; all three staged files included.
- `npm.cmd run build`: PASS; TypeScript and Vite production build completed.
- `git status --short --branch`: PASS; exactly the three allowed docs files
  staged on `codex/pr-v2-02-ver1-ux-audit-problem-map`.

## 11. Judgment

`PASS_WITH_NOTES`

The notes are expected for a docs-only UX audit: browser/mobile findings are deliberately not claimed as newly verified, and P0 items require follow-up prototype and QA work.
