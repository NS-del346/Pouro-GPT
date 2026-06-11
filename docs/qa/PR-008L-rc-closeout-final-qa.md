# PR-008L: RC Closeout / Final QA Note

## 1. Purpose

This document closes out the PR-008 visual polish and deployment stabilization
sequence after PR-008G through PR-008K.

## 2. Scope

- This is a documentation-only closeout PR.
- No app behavior, UI, data, routing, Service Worker, manifest, icons, method
  data, recipe values, timer logic, storage, History, or Rebrew behavior is
  changed.

## 3. Completed PR sequence

| PR | Title | Status | Merge commit | Outcome |
| --- | --- | --- | --- | --- |
| PR-008G | Visual Polish / Mock Alignment Pass 1 | Merged | `10839457...` | Recipe Setup / Brew Finish / History Detail visual polish |
| PR-008H | Brew Home / Active Brew / History Visual Polish | Merged | `2188f212...` | Brew Home / Timer / History visual polish |
| PR-008I | Add GitHub Pages deploy workflow | Merged | `41cba977...` | GitHub Pages deployment workflow added |
| PR-008J | Public Deployment QA / Release Candidate Check | Merged | `1da0e7a...` | RC QA documented |
| PR-008K | Add GitHub Pages SPA fallback | Merged | `99db86f...` | Nested-route branded 404 fallback resolved |

## 4. Public deployment status

- Public URL: <https://ns-del346.github.io/Pouro-GPT/>
- The root URL displays the app correctly.
- GitHub Pages deployment is active.
- The app is visible publicly.
- No previous public-root 404 remains.

## 5. Nested-route fallback status

PR-008K is confirmed working. The following URLs were checked on
2026-06-12:

- <https://ns-del346.github.io/Pouro-GPT/settings>
- <https://ns-del346.github.io/Pouro-GPT/history>
- <https://ns-del346.github.io/Pouro-GPT/setup/four-six>
- <https://ns-del346.github.io/Pouro-GPT/unknown-test-route>
- <https://ns-del346.github.io/Pouro-GPT/404.html>

Recorded result:

- The GitHub Pages branded 404 is not shown.
- The app shell is displayed.
- Settings and History direct access display the app correctly.
- The Setup route and unknown route are handled by existing app behavior or
  the app shell fallback.
- The unknown route and `/404.html` resolve to the app root.
- HTTP status itself is not treated as the acceptance criterion.

## 6. Local verification

| Command | Result |
| --- | --- |
| `git checkout main` | Pass. Switched to `main`. |
| `git pull origin main` | Pass. Already up to date. |
| `npm.cmd run build` | Pass. TypeScript and Vite production build completed successfully. |
| `git diff --check` | Pass. No whitespace errors reported. |
| `git status` | Clean before adding this report. |
| `git log -1 --oneline` | `99db86f PR-008K: Add GitHub Pages SPA fallback` |

## 7. Final RC status

RC status:
RC pass with minor follow-ups

Blocking issues:
None known after PR-008K public confirmation.

## 8. Remaining non-blocking follow-ups

1. Preview screen:

   - A separate Preview route or screen is not MVP-required.
   - The current accepted MVP flow is Recipe Setup -> Brew Timer.
   - Recipe Setup is the pre-brew confirmation surface.
   - Future Preview work, if any, belongs to PR-009 or later.

2. Method naming:

   - The MVP Brew Home label is `10 Pour Method`.
   - `THE NEO BREW` is not promoted to the Brew Home method name in MVP.
   - No method IDs, recipe values, `sourceStatus`, `verificationLevel`,
     `valuesArePlaceholder`, History, Rebrew, or localStorage should change for
     this closeout.

3. PWA/offline deep QA:

   - Service Worker registration state, clear-site-data cold start, and full
     offline app shell can be tested in a later dedicated QA pass if needed.
   - This is not blocking the current RC.

## 9. Out of scope

- App source changes
- UI changes
- Routing changes
- Recipe/method data changes
- Timer/state changes
- localStorage migration
- Service Worker rewrite
- Manifest/icon changes
- Preview screen addition
- Method label rename
- New features

## 10. Final judgment

Final judgment:
PR-008 visual polish / deployment stabilization sequence is complete.

The public GitHub Pages deployment is usable, the main app flow is accessible,
and the GitHub Pages branded 404 issue for direct nested-route access has been
resolved by PR-008K. Remaining items are non-blocking and should move to PR-009
or later.
