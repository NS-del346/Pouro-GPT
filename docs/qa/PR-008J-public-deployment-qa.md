# PR-008J: Public Deployment QA / Release Candidate Check

## 1. Purpose

This QA pass verifies the public GitHub Pages deployment and local `main` after
PR-008G, PR-008H, and PR-008I.

This is a documentation-only release-candidate check. No app behavior, UI,
data, Service Worker, manifest, icons, or deployment workflow was changed.

## 2. Environment

- Repository: `NS-del346/Pouro-GPT`
- Public URL: <https://ns-del346.github.io/Pouro-GPT/>
- Branch tested: `main`
- QA report branch: `codex/pr-008j-public-deployment-qa`
- Latest commit tested: `41cba97 PR-008I: Add GitHub Pages deploy workflow`
- Local OS: Windows, Tokyo Standard Time
- Browser: Codex in-app Chromium browser
- Viewports tested: `375 x 667` and `1280 x 720`
- QA date/time: `2026-06-11 23:27 JST`

## 3. Commands run

| Command | Result |
| --- | --- |
| `git checkout main` | Pass. The checkout was already on `main`. |
| `git pull origin main` | Pass. Already up to date. |
| `npm.cmd run build` | Pass. TypeScript and Vite production build completed successfully. |
| `git diff --check` | Pass. No whitespace errors reported. |
| `git status` | Pass. Working tree was clean before adding this QA report. |
| `git log -1 --oneline` | `41cba97 PR-008I: Add GitHub Pages deploy workflow` |

## 4. Public deployment check

| Check | Result | Notes |
| --- | --- | --- |
| Public root URL | Pass | Returned HTTP `200` and displayed Brew Home without the previous GitHub Pages 404. |
| Root page reload | Pass | Browser reload returned Brew Home and the four method cards. A DevTools cache-bypass hard reload was not separately performed. |
| Asset loading under `/Pouro-GPT/` | Pass | Current JS and CSS assets returned HTTP `200` and matched the local production build hashes. |
| Manifest and icons | Pass | Manifest, 192px icon, 512px icon, and Apple touch icon returned HTTP `200`. |
| Service Worker file | Pass | `/Pouro-GPT/sw.js` returned HTTP `200`. |
| Blank screen / obvious console errors | Pass | No blank screen or warning/error console entries were observed on the public root. |
| Deployment workflow | Pass | `Deploy to GitHub Pages` completed successfully for commit `41cba97`. |
| Direct nested-route reload | Needs follow-up | SPA navigation to `/Pouro-GPT/settings` worked, but reloading that route displayed the GitHub Pages 404. Direct HTTP checks for `/Pouro-GPT/setup/four-six` and `/Pouro-GPT/settings` also returned `404`. |

Deployment run:
<https://github.com/NS-del346/Pouro-GPT/actions/runs/27352637554>

## 5. Screen QA results

| Area | Result | Notes |
| --- | --- | --- |
| Brew Home | Needs follow-up | Public and local roots loaded, the pourō wordmark and four method cards appeared, selection state and explanation were readable, Home remained method-selection only, and tabs/CTA did not overlap. The checklist expects `THE NEO BREW`, while the current app displays `10 Pour Method`. |
| Recipe Setup | Pass | Opened from Brew Home. Preset and custom coffee/ratio controls, 4:6 variants, memo fields, and CTA were usable. PR-008G styling remained intact. |
| Preview | Needs follow-up | No separate Preview route or screen exists in the current app flow. Recipe Setup currently opens Brew Timer directly. |
| Active Brew / Timer | Pass | Opened from Setup, Bottom Tabs were hidden, current/next instructions were readable, and Start/Pause/Resume/Back/Next/Finish worked. Pause froze elapsed time. Placeholder-safe display remained intact and no large unavailable gram target appeared. |
| Brew Finish | Pass | Opened after Finish. Integer-only rating buttons `1` through `5`, memo inputs, and save worked. |
| History | Pass | Existing and newly saved records rendered, remained readable after local reload, and cards opened History Detail. History tab active state was correct. |
| History Detail | Pass | Saved setup/result content was readable and retained the selected method, variant, rating, and memo data. |
| Rebrew | Pass | Rebrew returned to Recipe Setup with the saved method context and setup values, and the timer flow could be opened again without altering existing history. |
| Settings | Pass | Settings opened with active tab state, gear icon, readable content, and no observed PR-008H visual regression. A changed setting remained selected after local reload. |

Data coverage passed through visible UI behavior:

- A local QA brew saved into History and remained readable after reload.
- A public-deployment QA brew saved into History and opened in History Detail.
- A pre-existing local History record remained readable beside the new record.
- Rebrew preserved the saved method, variant, coffee amount, ratio, and memos.

## 6. 375 x 667 mobile QA

- No horizontal overflow was observed on Brew Home, Recipe Setup, Brew Timer,
  Brew Finish, History, History Detail, Rebrew Setup, or Settings.
- Measured pages consistently reported `scrollWidth === clientWidth`.
- Brew Home and Recipe Setup CTA-to-Bottom-Tab separation measured about
  `15.3px`; no overlap was observed.
- Timer controls were visible, tappable, and contained within the viewport.
- History and History Detail cards remained readable.
- Bottom Tabs showed Brew / History / Settings only, with the expected active
  state. Bottom Tabs were hidden on Timer and Brew Finish.
- Normal desktop-width checks at `1280 x 720` also showed no horizontal
  overflow or CTA/Bottom-Tab overlap on local and public Brew Home.

## 7. PWA / Service Worker / cache QA

| Check | Result | Notes |
| --- | --- | --- |
| Manifest availability | Pass | Public manifest returned HTTP `200`. |
| Icon availability | Pass | Public app icons checked returned HTTP `200`. |
| Service Worker script availability | Pass | Public `sw.js` returned HTTP `200`. |
| Obviously stale UI | Pass | Public asset hashes matched the current local build, and PR-008G/PR-008H visual flow was present. |
| Service Worker registration/control state | Not verified in this pass | Registration state was not directly inspected in browser developer tools. |
| Clear-site-data cold start | Not verified in this pass | Site data was not manually cleared. |
| Offline app shell | Not verified in this pass | Browser network-offline mode was not available in this pass. |
| Root reload | Pass | Brew Home reopened successfully. |
| Nested-route reload | Needs follow-up | Reloading a client-side route returned the GitHub Pages 404. |

## 8. Findings

### Blocking issues

None. The public root loads and the primary Brew -> Setup -> Timer -> Finish ->
History -> History Detail -> Rebrew flow is usable.

### Follow-up candidates

1. Add a GitHub Pages SPA fallback strategy so direct requests and reloads on
   nested routes do not return the GitHub Pages 404.
2. Confirm whether a separate Preview screen is required. The current Setup
   action navigates directly to Brew Timer.
3. Resolve the Brew Home checklist naming mismatch: the expected label is
   `THE NEO BREW`, while the current app displays `10 Pour Method`. This may
   require a method-data decision and was intentionally not changed here.

### Not in scope

- App source, styles, routes, components, method data, and recipe values
- Recipe calculations, timer logic, active brew state, and navigation behavior
- History save/restore schema, localStorage keys, and History Detail behavior
- Service Worker, manifest, icons, PWA assets, and deployment workflow
- New UI, features, analytics, charts, cloud sync, accounts, or dependencies

## 9. Release candidate judgment

**RC pass with minor follow-ups**

The public root deployment is usable, current assets load correctly, the main
brew/history/rebrew flow passes on local `main` and the public deployment, and
no blocking issue was found. The nested-route reload 404, absent Preview
screen, and method-label mismatch should be handled in focused follow-up PRs.
