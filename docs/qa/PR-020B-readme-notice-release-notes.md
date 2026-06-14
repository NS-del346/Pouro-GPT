# PR-020B: README / NOTICE / Release Notes for Ver1.0

## 1. Purpose

Prepare the public repository documentation for the Pourō-GPT Ver1.0 release
candidate and the later v1.0.0 tag and release step.

## 2. Scope

This is a docs-only PR. It updates public project, source/legal, privacy, and
release-note documentation without changing app runtime behavior.

## 3. Changed Files

Exactly:

- `README.md`
- `NOTICE.md`
- `PRIVACY.md`
- `docs/release/v1.0.0-release-notes.md`
- `docs/qa/PR-020B-readme-notice-release-notes.md`

No app code was changed.

## 4. Baseline

| Check | Result |
| --- | --- |
| Repository | `NS-del346/Pouro-GPT` |
| Base branch | `main` |
| Expected latest main | `d79beefa9192ac29df64b22bc2a5d5acf7a070d5` |
| Actual latest main | `d79beefa9192ac29df64b22bc2a5d5acf7a070d5` |
| Subject | `PR-020A: Ver1.0 Release Candidate QA / Final Regression` |
| `git pull origin main` | PASS, already up to date |
| Branch starting point | PASS, exact expected main commit |

## 5. Documentation Updates

- Reframed README from Current MVP to Ver1.0 release-candidate documentation.
- Made NOTICE the canonical source and legal caution.
- Updated PRIVACY for the current local-storage, export, delete, and hosting
  behavior.
- Prepared v1.0.0 release notes without creating a tag or GitHub Release.

## 6. README Review

README documents the public URL, Ver1.0 status, main features, supported method
groups, local data model, export behavior, PWA usage, known limitations,
non-official status, development commands, and documentation links.

It does not overstate offline support or method verification.

## 7. NOTICE Review

NOTICE states that Pourō-GPT is personal and unofficial, uses third-party names
descriptively, and is not affiliated with or endorsed by referenced people,
companies, makers, or brands.

It documents the possible recipe-data statuses, preserves all required
provenance metadata names, directs users to original sources when accuracy
matters, and states that brew results are not guaranteed.

## 8. PRIVACY Review

PRIVACY documents the static GitHub Pages PWA, absence of a Pourō account,
backend, cloud sync, dedicated app analytics, or personal-data sale, and the
browser-local storage model.

It explains local CSV and JSON downloads, user responsibility for downloaded
files, local history deletion, browser or site-data clearing risk, and GitHub
Pages platform boundaries.

## 9. Release Notes Review

The prepared v1.0.0 release notes include all required sections, Ver1.0
features, method groups, data and privacy model, PWA and offline limitations,
source/legal notes, QA basis, and post-v1.0 candidates.

They state that release tagging is prepared for after PR-020B merges and do not
claim that a tag or GitHub Release exists.

## 10. Legal / Source / Provenance Safety

- No official endorsement, affiliation, supervision, partnership, approval,
  complete-reproduction, accuracy-guarantee, brew-result-guarantee, or
  offline-guarantee claim was introduced.
- Third-party names are used descriptively.
- `sourceStatus`, `verificationLevel`, `valuesArePlaceholder`, `isPlaceholder`,
  and `fieldEvidence` remain explicitly respected.
- Users are directed to original sources where accuracy or faithful
  reproduction matters.

## 11. Link / Path Checks

Manual relative-link and path review:

| Check | Result |
| --- | --- |
| README links to `NOTICE.md` | PASS |
| README links to `PRIVACY.md` | PASS |
| README links to `docs/release/v1.0.0-release-notes.md` | PASS |
| Release notes path exists | PASS |
| QA document path exists | PASS |
| Release notes link to `NOTICE.md` | PASS |

No Markdown linter is configured, so no Markdown linter was invented or run.

## 12. Build / Static Checks

| Check | Result |
| --- | --- |
| `npm.cmd run build` | PASS, TypeScript and Vite production build completed |
| `git diff --check` | PASS |
| Prohibited-wording review | PASS, matches occur only in explicit negative disclaimers |
| Final changed-file audit | PASS, limited to the five expected documentation files |
| App source or package change | PASS, none |
| Browser or mobile QA | NOT RUN, docs-only change with no app UI or runtime change |

## 13. Out of Scope

- App source, UI, routing, runtime behavior, and dependencies
- Recipe data, method schedules, timer calculations, and step progression
- History, Rebrew, Settings, localStorage key, or saved-session schema changes
- PWA manifest, Service Worker, GitHub Pages base path, tag creation, or GitHub
  Release creation

## 14. Known Limitations

- Actual OS-level PWA installation and standalone-window launch were not run.
- Actual iPhone Safari Add to Home Screen was not run.
- Offline behavior depends on prior Service Worker and cache state.
- Ver1.0 does not include an import or restore UI.
- Local browser or site data can be cleared or become unavailable.
- Method data and brew results are not guaranteed.

## 15. Judgment

`PASS_READY_FOR_V1_TAG`

README, NOTICE, PRIVACY, the prepared release notes, and this QA document are
consistent. Known limitations are explicit, no unsafe source or legal
overclaim was introduced, the build and diff checks pass, and only the five
expected documentation files changed.
