# PR-019A: PWA / GitHub Pages Manifest Path Fix + QA

## 1. Purpose

Fix the manifest and icon references that previously resolved under nested
BrowserRouter routes, then verify the production build under the GitHub Pages
base path `/Pouro-GPT/`.

## 2. Scope

* Change only the static PWA resource paths in `index.html` and
  `public/manifest.webmanifest`.
* Add this QA record.
* Do not change app UI, runtime behavior, data, storage, dependencies, or
  service worker behavior.

## 3. Changed files

* `index.html`
* `public/manifest.webmanifest`
* `docs/qa/PR-019A-pwa-manifest-path-qa.md`

## 4. Implementation summary

* Changed the manifest and HTML icon references from route-relative paths to
  absolute GitHub Pages subpath URLs under `/Pouro-GPT/`.
* Changed manifest icon `src` values to `/Pouro-GPT/icons/...`.
* Made manifest `start_url` and `scope` explicitly `/Pouro-GPT/`.
* Kept the PWA name, short name, description, display mode, orientation,
  colors, and language unchanged.
* No change was required in `public/sw.js` or `src/main.tsx`.

## 5. Manifest path QA

Local production preview:

```text
http://127.0.0.1:4181/Pouro-GPT/
```

Results:

* `/Pouro-GPT/manifest.webmanifest`: PASS, HTTP `200`,
  `application/manifest+json`, valid JSON.
* Root, `/setup/four-six`, `/history`, and `/settings` all resolved the
  document manifest link to
  `http://127.0.0.1:4181/Pouro-GPT/manifest.webmanifest`: PASS.
* No nested-route manifest link resolved to
  `/Pouro-GPT/setup/manifest.webmanifest`,
  `/Pouro-GPT/history/manifest.webmanifest`, or
  `/Pouro-GPT/settings/manifest.webmanifest`: PASS.
* No manifest syntax error or other browser error/warning was observed: PASS.

## 6. Icon path QA

HTTP results:

| Path | Status | Content type |
| --- | --- | --- |
| `/Pouro-GPT/icons/apple-touch-icon.png` | PASS, `200` | `image/png` |
| `/Pouro-GPT/icons/favicon-32.png` | PASS, `200` | `image/png` |
| `/Pouro-GPT/icons/favicon-16.png` | PASS, `200` | `image/png` |
| `/Pouro-GPT/icons/icon-192.png` | PASS, `200` | `image/png` |
| `/Pouro-GPT/icons/icon-512.png` | PASS, `200` | `image/png` |

Additional results:

* Root, Setup, History, and Settings all resolved HTML icon links under
  `/Pouro-GPT/icons/`: PASS.
* Manifest icon `src` values resolve to the verified 192px and 512px image
  files: PASS.
* No icon link resolved under `/setup/icons/`, `/history/icons/`, or
  `/settings/icons/`: PASS.

## 7. Nested-route QA

Checked direct production-preview navigation to:

* `/Pouro-GPT/`
* `/Pouro-GPT/setup/four-six`
* `/Pouro-GPT/history`
* `/Pouro-GPT/settings`

All routes loaded successfully, resolved manifest and icon links to the
base-prefixed resource URLs, had no horizontal overflow, and produced no
browser error/warning logs.

## 8. GitHub Pages / base path QA

* `vite.config.ts` remains `base: "/Pouro-GPT/"`: PASS.
* `BrowserRouter` basename remains `/Pouro-GPT/`: PASS.
* Built `dist/index.html` manifest and icon paths point to
  `/Pouro-GPT/...`: PASS.
* Built script and stylesheet paths point to `/Pouro-GPT/assets/...`: PASS.
* Built manifest `start_url` and `scope` are `/Pouro-GPT/`: PASS.
* No `dist` file is included in the PR: PASS.

## 9. PWA install / standalone QA

Manifest validation:

* Valid JSON: PASS.
* `name` and `short_name` remain `Pourō`: PASS.
* `display` remains `standalone`: PASS.
* `start_url` and `scope` are under `/Pouro-GPT/`: PASS.
* `background_color` remains `#FAF7F1`: PASS.
* `theme_color` remains `#17212B`: PASS.

Actual OS-level PWA installation: **NOT RUN**. The available browser QA
environment was used for manifest validation but not an OS install flow.

## 10. Offline / service worker QA

* `public/sw.js` exists and remains unchanged: PASS.
* Its existing precache URLs already use `/Pouro-GPT/`: PASS.
* Refresh after production build preview loaded successfully: PASS.
* No new service worker error was observed in browser logs: PASS.
* Offline app-shell behavior: **NOT RUN**. The available in-app browser did not
  expose an offline-network toggle for this QA.

## 11. Mobile QA

Interactive production-preview QA was run at `375x667` and `390x844`.

| Check | 375x667 | 390x844 |
| --- | --- | --- |
| No horizontal overflow | PASS | PASS |
| Bottom tabs stable on shell pages | PASS | PASS |
| Timer route hides bottom tabs | PASS | PASS |
| Timer controls reachable | PASS | PASS |
| Settings export UI readable | PASS | PASS |
| History list Rebrew readable | PASS | PASS |
| Critical CTA reachable | PASS | PASS |
| Tap targets usable | PASS | PASS |

Measured examples:

* Recipe Setup start CTA: `52px` high at `375x667`.
* Timer controls: `64px` high and within the viewport at both sizes.
* Settings export buttons: `52px` high at both sizes.
* History list Rebrew buttons: `44px` high at both sizes.

## 12. Regression checks

| Check | Result |
| --- | --- |
| Brew Home loads | PASS |
| Recipe Setup loads | PASS |
| Preview/setup confirmation flow loads | PASS |
| Timer starts | PASS |
| Finish navigation works | PASS |
| Finish save works | PASS |
| History list loads | PASS |
| History Detail loads | PASS |
| History list Rebrew works | PASS, returned to Recipe Setup |
| Brew Home Last Brew works | PASS, returned to Recipe Setup |
| Settings loads | PASS |
| Settings export buttons still appear | PASS |
| Settings links still work | PASS, all four information routes loaded |

The Finish-save check created one disposable record only in the local
`127.0.0.1:4181` preview origin.

## 13. Source/legal/storage safety checks

No changes were made to:

* recipe data or method schedules
* timer calculations or step progression
* History save or replay behavior
* Settings export behavior
* localStorage key
* `BrewSession` or `BrewSetup` shape
* POINT/TIPS data or selection behavior
* `sourceStatus`, `verificationLevel`, `valuesArePlaceholder`, `isPlaceholder`,
  or `fieldEvidence`
* PWA name, description, or legal wording

No official endorsement, partnership, complete reproduction, or guaranteed
brew-result claim was introduced.

## 14. Commands run

* `npm.cmd run build`: PASS.
* `npm.cmd run preview -- --host 127.0.0.1 --port 4181`: PASS.
* PowerShell HTTP response/content-type checks: PASS.
* Built `dist/index.html` and manifest inspection: PASS.
* Codex in-app Browser nested-route, console, mobile, and regression QA: PASS.
* `git diff --check`: PASS.
* `git status --short --branch`: PASS; only the expected three files changed
  before commit.

## 15. Known limitations

* Actual OS-level PWA installation was not run.
* Offline app-shell behavior was not run.
* No standalone browser network-waterfall artifact was saved. Nested-route
  safety was verified from the resolved document manifest/icon URLs on each
  required route and the absence of manifest or browser errors.

## 16. Judgment

`PASS_WITH_LIMITATIONS`

The GitHub Pages base-prefixed manifest and icon paths are valid on root and
nested routes, the previous manifest syntax error is no longer observed, and
the required mobile and regression checks pass. The remaining limitations are
OS-level install and offline-mode testing.
