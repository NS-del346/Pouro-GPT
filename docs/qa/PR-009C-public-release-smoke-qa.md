# PR-009C: Public Release Smoke QA / Docs & In-app Notice Check

## 1. Purpose

This is a docs-only smoke QA note after PR-009A and PR-009B. It focuses on
public release documentation and the reachability and readability of the
in-app notice and privacy pages.

## 2. Scope

- Documentation-only QA note.
- No source, UI, routing, storage, data, timer, Service Worker, manifest, icon,
  workflow, README, NOTICE, or PRIVACY changes.

## 3. Baseline

- Repository: `NS-del346/Pouro-GPT`
- Public URL: <https://ns-del346.github.io/Pouro-GPT/>
- Latest main commit: `4e57741 PR-009B: In-app Notice / Privacy Copy Alignment`
- PR-009A: Merged
- PR-009B: Merged
- QA date: `2026-06-12 JST`

## 4. Local verification

| Check | Result |
| --- | --- |
| `git checkout main` | Pass. The checkout was already on `main`. |
| `git pull origin main` | Pass. Already up to date. |
| `npm.cmd run build` | Pass. TypeScript and Vite production build completed successfully. |
| `git diff --check` | Pass. No whitespace errors reported. |
| `git status` before QA note | Clean. |
| `git log -1 --oneline` | `4e57741 PR-009B: In-app Notice / Privacy Copy Alignment` |

## 5. Public app smoke QA

HTTP status itself was not used as the acceptance criterion. The acceptance
criterion was that the app shell rendered and the GitHub Pages branded 404 was
not shown.

| URL | Expected result | Result |
| --- | --- | --- |
| <https://ns-del346.github.io/Pouro-GPT/> | App shell displays. | Pass. Brew Home displayed. |
| <https://ns-del346.github.io/Pouro-GPT/settings> | Settings page opens without a branded 404. | Pass. Settings displayed. |
| <https://ns-del346.github.io/Pouro-GPT/settings/about> | About page opens without a branded 404. | Pass. About displayed. |
| <https://ns-del346.github.io/Pouro-GPT/settings/sources> | Sources page opens without a branded 404. | Pass. Sources displayed. |
| <https://ns-del346.github.io/Pouro-GPT/settings/legal> | Legal page opens without a branded 404. | Pass. Legal displayed. |
| <https://ns-del346.github.io/Pouro-GPT/settings/privacy> | Privacy page opens without a branded 404. | Pass. Privacy displayed. |
| <https://ns-del346.github.io/Pouro-GPT/history> | Direct access does not show a branded 404. | Pass. History displayed. |
| <https://ns-del346.github.io/Pouro-GPT/setup/four-six> | Direct access does not show a branded 404; existing app behavior is acceptable. | Pass. Recipe Setup displayed. |
| <https://ns-del346.github.io/Pouro-GPT/unknown-test-route> | Direct access does not show a branded 404; existing app fallback behavior is acceptable. | Pass. The app fell back to Brew Home. |
| <https://ns-del346.github.io/Pouro-GPT/404.html> | App shell displays without the branded 404. | Pass. The app fell back to Brew Home. |

## 6. GitHub docs QA

The following files were checked on synced `origin/main`.

| File | Result | Required public-release coverage |
| --- | --- | --- |
| `README.md` | Pass. File exists. | Covers the Pourō project name, public URL, current MVP scope, current methods, unofficial status, data accuracy and source-status explanation, `localStorage` data storage, PWA usage, and development commands. |
| `NOTICE.md` | Pass. File exists. | Covers unofficial status, descriptive-only use of third-party names, no implied endorsement or affiliation, the range of method and recipe data statuses, and guidance to consult original sources where accuracy matters. |
| `PRIVACY.md` | Pass. File exists. | Covers no user account, no Pourō backend, no cloud sync, no dedicated in-app analytics tracking, `localStorage`-based history and settings, deletion through the in-app clear function or browser/site-data clearing, and GitHub Pages hosting. |

## 7. In-app notice/privacy QA

- `/settings` opened.
- `/settings/about` opened.
- `/settings/sources` opened.
- `/settings/legal` opened.
- `/settings/privacy` opened.
- About, Sources, Legal, and Privacy content remained readable.
- Each info-page Back link returned to Settings.
- BottomTabs remained available on Settings and the info pages.
- No GitHub Pages branded 404 appeared on direct access.

## 8. Mobile 375x667 QA

- Checked with a `375 x 667` browser viewport override.
- Root and Settings had no horizontal overflow.
- About, Sources, Legal, and Privacy had no horizontal overflow and remained
  readable.
- Checked pages reported `scrollWidth === clientWidth`.
- No CTA is present on the info pages, and no BottomTabs/content overlap was
  observed.
- Page scrolling was acceptable for the longer Sources, Legal, and Privacy
  content.
- BottomTabs behavior was unchanged.
- Brew Timer regression testing was not part of this docs-only PR, and Brew
  Timer behavior was not modified.

## 9. Result

Result:
Pass with no blocking issues.

Blocking issues:
None identified.

Non-blocking follow-ups:

- If deeper PWA/offline validation is needed, handle in a later dedicated PR.
- If source verification changes later, update README / NOTICE / Sources copy
  accordingly.

## 10. Out of scope

- app source changes
- UI redesign
- route changes
- method data changes
- recipe values
- `sourceStatus` / `verificationLevel` / `valuesArePlaceholder` changes
- storage schema
- timer logic
- History / Rebrew behavior
- Service Worker changes
- manifest / icon changes
- workflow changes
- analytics / cloud / account features
