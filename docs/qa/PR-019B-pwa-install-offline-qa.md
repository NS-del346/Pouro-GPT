# PR-019B: OS-level PWA Install / Offline QA Record

## 1. Purpose

Close the remaining PR-019A PWA QA gaps as far as the available environment
allows, with emphasis on public GitHub Pages readiness, service worker cache
behavior, offline app-shell behavior, and a clean-profile check for the
observed `coffeeGrams` blank-screen error.

## 2. Scope

* Docs-only QA record.
* No app implementation, PWA resource, service worker, data, or storage change.
* OS-level installation is recorded honestly as an environment limitation.
* Real desktop Chrome localStorage was not cleared, changed, or exported.

## 3. Changed files

Exactly:

* `docs/qa/PR-019B-pwa-install-offline-qa.md`

No app code was changed.

## 4. Baseline

* Branch: `codex/pr-019b-pwa-install-offline-qa`
* Latest `main` and branch baseline:
  `c59a937c2f0d7d516fab0947bd0f246660fe314e`
* Baseline subject:
  `PR-019A: PWA / GitHub Pages Manifest Path Fix + QA`
* Branch versus `origin/main` before the QA document: `0 0` ahead/behind.
* No unintended source changes were present before QA.

## 5. Test environment

* Public target: `https://ns-del346.github.io/Pouro-GPT/`
* Local production preview: `http://127.0.0.1:4181/Pouro-GPT/`
* Browser: installed Google Chrome `149.0.7827.102`
* Automation: headless Chrome with disposable temporary profiles and CDP
  network/cache controls
* Required mobile viewports: `375x667` and `390x844`
* Preview endpoint returned HTTP `200`.
* Each disposable profile was removed after its QA run.

Computer Use and Windows OS-level UI automation were not used during the
resumed QA.

## 6. Public GitHub Pages readiness

| Target | Result |
| --- | --- |
| Root app | PASS, HTTP `200`, Brew Home rendered |
| Manifest | PASS, HTTP `200`, `application/manifest+json` |
| Apple touch icon | PASS, HTTP `200`, `image/png` |
| 16px and 32px favicons | PASS, HTTP `200`, `image/png` |
| 192px and 512px manifest icons | PASS, HTTP `200`, `image/png` |

No public browser request to a nested
`/Pouro-GPT/setup/manifest.webmanifest` path was observed. A direct invalid
path probe returned `404`, while the document manifest link and CDP manifest
URL remained `/Pouro-GPT/manifest.webmanifest`.

## 7. Manifest and icon final check

* Manifest parsed as JSON, not HTML: PASS.
* Manifest syntax errors: none.
* CDP `Page.getAppManifest` errors: none.
* CDP installability errors: none.
* `name` and `short_name`: `Pourō`.
* `start_url`: `/Pouro-GPT/`.
* `scope`: `/Pouro-GPT/`.
* `display`: `standalone`.
* Manifest icons resolve under `/Pouro-GPT/icons/`: PASS.
* Icon display was not visually inspected in an installed OS app.

## 8. OS-level install QA

**Result: `NOT RUN_ENVIRONMENT_LIMITATION`**

The available resumed workflow explicitly excluded Computer Use and OS-level
UI operation. Headless Chrome/CDP confirmed a valid manifest and reported zero
installability errors, but this is not claimed as an actual OS-level install.

iPhone Safari manual QA checklist prepared: **YES**

Actual iPhone install by Codex: **NOT RUN**

Owner checklist:

1. Open `https://ns-del346.github.io/Pouro-GPT/` in iPhone Safari.
2. Use Share, then Add to Home Screen.
3. Confirm the home-screen icon appears.
4. Launch from the home screen.
5. Confirm standalone-like display and the `Pourō` title.
6. Confirm Brew Home loads and Bottom Tabs are stable.
7. Confirm Timer hides Bottom Tabs.
8. Confirm Settings opens.

## 9. Standalone launch QA

**Result: `NOT RUN_ENVIRONMENT_LIMITATION`**

An installed OS app window was not created or launched. Manifest display mode,
name, icon URLs, start URL, scope, and CDP installability were checked, but are
not treated as a standalone-launch PASS.

## 10. Offline app-shell QA

Public GitHub Pages was loaded online first in a clean disposable profile.
After the service worker became active and controlled the page, the page was
reloaded online to populate the service worker cache.

CDP then disabled the browser HTTP cache and emulated offline networking.

| Check | Result |
| --- | --- |
| Online first load | PASS |
| Service worker registration | PASS |
| Offline reload root | PASS |
| Offline Settings route | PASS |
| Offline History route | PASS |
| No fatal blank screen | PASS |

This confirms the public app shell works offline through the service worker
cache without relying on the normal browser HTTP cache.

## 11. Offline route behavior QA

| Route/surface | Result | Observation |
| --- | --- | --- |
| Root | PASS | Brew Home rendered offline |
| Brew Home | PASS | Main shell and Bottom Tabs rendered |
| Recipe Setup | PASS | `/setup/four-six` rendered offline |
| Timer direct route | PASS | Safely redirected to Brew Home with no in-memory active setup |
| Active Timer continuity after reload | NOT RUN | Active setup is in-memory and was not treated as persisted state |
| History | PASS_WITH_CACHED_DATA_ONLY | Empty-history shell rendered in the clean public origin |
| Settings | PASS | Settings shell rendered offline |

## 12. Service worker / cache QA

* Public service worker scope:
  `https://ns-del346.github.io/Pouro-GPT/`: PASS.
* Service worker state after controlled reload: `activated`: PASS.
* Page controlled by service worker after reload: PASS.
* Service worker install/activate errors: none observed.
* Cache name: `pouro-gpt-pr-008b`.
* Cache contained root, `index.html`, manifest, all declared static icons,
  built CSS, and built JavaScript after the controlled online reload.
* Offline route reloads passed with CDP browser HTTP cache disabled.
* No stale manifest path or old asset-path failure was observed.

## 13. coffeeGrams / existing localStorage observation

Before the resumed QA, a non-disposable existing desktop Chrome profile
displayed a blank public root and logged:

```text
TypeError: Cannot read properties of undefined (reading 'coffeeGrams')
```

The real browser profile and its localStorage were not cleared, changed, or
exported.

Clean disposable profile result:

```text
NOT_REPRODUCED_IN_CLEAN_PROFILE
```

The clean profile started with no localStorage keys, loaded Brew Home, and
completed Recipe Setup, Timer, Finish save, History Detail, History, Rebrew,
Last Brew, and Settings without a `coffeeGrams` error or blank screen.

The existing-profile-only observation is consistent with a potential legacy
or corrupt `brewHistory` entry that lacks an expected setup snapshot. It is
not fixed in this docs-only PR.

Recommended follow-up:

```text
PR-019C: legacy localStorage guard / corrupted history recovery
```

## 14. Mobile QA

Headless Chrome QA was run at both required viewport sizes.

| Check | 375x667 | 390x844 |
| --- | --- | --- |
| No horizontal overflow | PASS | PASS |
| Bottom Tabs stable on shell pages | PASS | PASS |
| Timer hides Bottom Tabs | PASS | PASS |
| Settings export UI readable | PASS | PASS |
| History list Rebrew readable | PASS | PASS |
| Timer controls reachable | PASS | PASS |

Timer controls were `68px` high and remained within the viewport after being
scrolled into view: bottom `655/667` at `375x667`, and bottom `832/844` at
`390x844`.

## 15. Regression checks

The clean disposable local-preview profile completed this smoke flow:

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
| Settings loads | PASS |
| Settings export buttons appear | PASS |
| About, Sources, Legal, and Privacy links load | PASS |

No page error was observed in the clean regression profile.

## 16. Source/legal/storage safety checks

No changes were made to:

* recipe data or method schedules
* timer calculations or step progression
* History save or replay behavior
* Settings export behavior
* localStorage keys or stored data in the real browser profile
* `BrewSession` or `BrewSetup` shape
* POINT/TIPS data or display behavior
* `sourceStatus`, `verificationLevel`, `valuesArePlaceholder`, `isPlaceholder`,
  or `fieldEvidence`
* PWA name, description, legal wording, manifest, service worker, or base path

No official endorsement, partnership, complete reproduction, or guaranteed
brew-result claim was introduced.

## 17. Commands run

* `git status --short --branch`: PASS.
* `git log -1 --oneline`: PASS, baseline `c59a937`.
* `git diff --stat`: PASS, no changes before the QA document.
* `npm.cmd run build`: PASS.
* `npm.cmd run preview -- --host 127.0.0.1 --port 4181`: PASS; resumed preview
  confirmed at HTTP `200`.
* PowerShell public HTTP response/content-type checks: PASS.
* Disposable-profile headless Chrome/CDP clean-profile regression QA: PASS.
* CDP installability, service worker, cache, HTTP-cache-disabled offline QA:
  PASS.
* Disposable-profile mobile viewport QA: PASS.
* `git diff --check`: PASS.
* `git diff --cached --check`: PASS.
* `git status --short --branch`: PASS before commit; exactly the expected QA
  document changed.

## 18. Known limitations

* Actual OS-level PWA installation was not run.
* Installed standalone app launch was not run.
* Actual iPhone Safari Add to Home Screen was not run.
* Active Timer continuity after an offline page reload was not tested because
  active setup state is in-memory and direct `/timer` correctly redirects
  without it.
* The observed existing-profile `coffeeGrams` error was not repaired or
  destructively investigated in this docs-only PR.

## 19. Judgment

`PASS_WITH_LIMITATIONS`

Public GitHub Pages, manifest, icons, CDP installability checks, service worker
registration/cache, HTTP-cache-disabled offline app-shell routes, clean-profile
regression, and mobile QA passed. The `coffeeGrams` blank screen did not
reproduce in clean disposable profiles. Actual OS-level install, standalone
launch, and iPhone installation remain explicit limitations.
