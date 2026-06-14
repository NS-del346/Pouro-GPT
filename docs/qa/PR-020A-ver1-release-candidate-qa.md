# PR-020A: Ver1.0 Release Candidate QA / Final Regression

## 1. Purpose

Perform final release-candidate QA for the current Pouro-GPT `main` baseline.

This docs-only PR determines whether the app can be treated as a Ver1.0
release candidate without changing app code, recipe data, runtime behavior,
PWA resources, or storage schemas.

## 2. Scope

* Final regression QA only.
* Local production-preview QA and public GitHub Pages QA.
* Disposable browser contexts and disposable local-preview storage only.
* No defect fixes in this PR.

## 3. Changed files

Exactly:

* `docs/qa/PR-020A-ver1-release-candidate-qa.md`

No app code was changed.

## 4. Baseline

| Check | Result |
| --- | --- |
| Repository | `NS-del346/Pouro-GPT` |
| Base branch | `main` |
| Expected latest main | `becdc5dc3d4cb8d5359c33451c1e4e0a32a28c79` |
| Actual latest main | `becdc5dc3d4cb8d5359c33451c1e4e0a32a28c79` |
| Subject | `PR-019C: Legacy localStorage Guard / Corrupted History Recovery` |
| `git pull origin main` | PASS, already up to date |
| `main...origin/main` | PASS, `0 0` ahead/behind |
| Branch starting point | PASS, exact expected main commit |

## 5. Test environment

* OS: Microsoft Windows 11 Home, version `10.0.26100`, build `26100`.
* Browser: Google Chrome `149.0.7827.102`.
* Interactive confirmation: Codex in-app Browser.
* Automated browser QA: headless Chrome with fresh disposable contexts.
* Local production preview command:
  `npm.cmd run preview -- --host 127.0.0.1 --port 4181`.
* Ports `4181` and `4182` were occupied, so Vite selected:
  `http://127.0.0.1:4183/Pouro-GPT/`.
* Public target: `https://ns-del346.github.io/Pouro-GPT/`.
* Required viewports: `375x667` and `390x844`.
* Storage safety: all save, export, delete, and corrupt-fixture QA used the
  isolated local-preview origin and disposable browser contexts. Real user
  browser data was not read, changed, exported, or deleted.

## 6. Build and static checks

| Check | Result |
| --- | --- |
| `npm.cmd run build` | PASS, TypeScript and Vite production build completed |
| `git diff --check` | PASS |
| Initial `git status --short --branch` | PASS, clean target branch |
| Final pre-commit `git status --short --branch` | PASS, only the expected QA document |
| Dependency change | PASS, none |
| `package.json` change | PASS, none |
| `package-lock.json` change | PASS, none |
| App source change | PASS, none |

The repository has no separate automated `test` or `lint` script.

## 7. Public GitHub Pages QA

| Target | Result |
| --- | --- |
| Root app | PASS, HTTP `200`, Brew Home rendered, no blank screen |
| `/manifest.webmanifest` | PASS, HTTP `200`, `application/manifest+json` |
| `/icons/icon-192.png` | PASS, HTTP `200`, `image/png` |
| `/icons/icon-512.png` | PASS, HTTP `200`, `image/png` |
| Manifest `start_url` | PASS, `/Pouro-GPT/` |
| Manifest `scope` | PASS, `/Pouro-GPT/` |
| Nested `/setup/manifest.webmanifest` request | PASS, not requested |
| Direct invalid nested-manifest probe | PASS, HTTP `404` |
| Manifest syntax error | PASS, none |
| Public runtime/console error | PASS, none observed |

## 8. PWA / manifest / service worker QA

| Check | Result |
| --- | --- |
| Manifest parses as JSON | PASS |
| CDP app-manifest errors | PASS, none |
| App-specific CDP installability errors | PASS, none |
| Service worker registers | PASS, one public service worker observed |
| Service worker controls page after reload | PASS |
| Offline root app shell | PASS |
| Offline Settings route | PASS |
| Offline History route | PASS |
| Offline Recipe Setup route | PASS |
| Stale asset/base-path failure | PASS, none observed |
| Old nested manifest-path issue | PASS, not observed |
| OS-level install | `NOT RUN_ENVIRONMENT_LIMITATION` |

CDP reported `in-incognito` as an environment-specific installability
limitation in the disposable headless context. It did not report an app
manifest, icon, scope, start URL, or service-worker defect.

## 9. Mobile viewport QA

| Check | `375x667` | `390x844` |
| --- | --- | --- |
| Brew Home usable | PASS | PASS |
| Recipe Setup usable | PASS | PASS |
| Timer usable | PASS | PASS |
| Finish usable | PASS | PASS |
| History list usable | PASS | PASS |
| History Detail usable | PASS | PASS |
| Settings usable | PASS | PASS |
| No horizontal overflow on checked screens | PASS | PASS |
| Bottom Tabs stable on shell pages | PASS | PASS |
| Timer hides Bottom Tabs | PASS | PASS |
| Finish hides Bottom Tabs | PASS | PASS |
| Critical CTA reachable | PASS | PASS |
| Timer controls reachable | PASS, bottom `655/667` | PASS, bottom `832/844` |
| Tap targets usable | PASS | PASS |

Timer target hierarchy measurements:

* `375x667`: Target Total `56.25px`; This Pour `22.5px`.
* `390x844`: Target Total `58.5px`; This Pour `23.4px`.
* Timer control group height: `68px` at both viewports.

## 10. Core flow QA

A clean full flow was completed in disposable local-preview storage:

| Flow | Result |
| --- | --- |
| Brew Home | PASS |
| Recipe Setup | PASS |
| Setup confirmation content | PASS, current app has no standalone Preview route |
| Timer Start / Next / Back / Finish | PASS |
| Finish save | PASS |
| History Detail after save | PASS |
| History list | PASS |
| History Detail Rebrew | PASS, returned to Recipe Setup |
| History list Rebrew | PASS, returned to Recipe Setup |
| Brew Home Last Brew | PASS, appeared after save and returned to Recipe Setup |
| Rebrew direct Timer jump | PASS, no direct Timer jump |
| Settings | PASS |
| CSV export | PASS, download event completed |
| JSON export | PASS, download event completed |
| Delete cancel | PASS, history count remained `1` |
| Delete confirm | PASS, disposable history count became `0` |
| Finish discard | PASS, returned to Brew and did not create history |
| Blank screen | PASS, none |
| Uncaught runtime exception | PASS, none |

## 11. Method coverage QA

All implemented method groups loaded Recipe Setup, started Timer, rendered
primary timer values, and reached Finish safely.

| Method group | Setup | Timer | Finish | Observed step count |
| --- | --- | --- | --- | --- |
| 4:6 Method | PASS | PASS | PASS | 5 |
| Hybrid / HARIO Switch | PASS | PASS | PASS | 5 |
| THE NEO BREW / 10 Pour | PASS | PASS | PASS | 10 |
| Ice Brew | PASS | PASS | PASS | 2 |

No checked method surface exposed a raw source URL. Existing non-official and
confirmation-needed wording remained visible where applicable.

## 12. Timer semantics QA

| Check | Result |
| --- | --- |
| Target Total remains dominant | PASS |
| This Pour remains secondary | PASS |
| Elapsed time remains supportive | PASS |
| Current instruction visible | PASS |
| Next step/cue visible | PASS |
| Pause / Next / Back / Finish usable | PASS |
| Timer Bottom Tabs hidden | PASS |

THE NEO BREW / R-09 critical schedule:

| Check | Result |
| --- | --- |
| Bean `20g` | PASS |
| Water `300g` | PASS |
| Ratio `1:15` | PASS |
| `1:45` step is cumulative `210g` | PASS |
| `2:30` step is cumulative `300g` | PASS |
| `約3:30` is drawdown guidance | PASS |
| Exact completion guarantee absent | PASS, UI states it is not an exact completion time |
| Arbitrary scaling claim absent | PASS, UI states arbitrary conversion is unsupported |

## 13. History / Rebrew / Last Brew QA

| Check | Result |
| --- | --- |
| History list loads | PASS |
| History Detail loads | PASS |
| History list Rebrew returns to Recipe Setup | PASS |
| History Detail Rebrew returns to Recipe Setup | PASS |
| Brew Home Last Brew appears after save | PASS |
| Brew Home Last Brew returns to Recipe Setup | PASS |
| Rebrew auto-starts Timer | PASS, it does not |
| Rebrew refreshes draft `createdAt` | PASS by static inspection of current replay handlers |
| Storage schema migration | PASS, none |

## 14. Settings / Export / Delete QA

| Check | Result |
| --- | --- |
| Settings loads | PASS |
| History count correct | PASS, `1` before delete and `0` after confirm |
| CSV enabled with history | PASS |
| JSON enabled with history | PASS |
| CSV download completes | PASS |
| JSON download completes | PASS |
| Export preserves history | PASS, count remained `1` |
| Delete cancel preserves history | PASS, count remained `1` |
| Delete confirm clears disposable history | PASS, count became `0` |
| Empty history disables CSV/JSON | PASS |
| About / Sources / Legal / Privacy links | PASS |

Full downloaded CSV/JSON content was not re-inspected because that optional
artifact-level check was already covered by PR-018C. This run verified actual
download events, no crash, and no history mutation.

## 15. Legacy localStorage / corrupted history QA

The required representative fixture with missing `coffeeGrams` was written
only to disposable local-preview storage.

| Check | Result |
| --- | --- |
| Brew Home loads | PASS |
| History loads | PASS |
| Settings loads | PASS |
| `coffeeGrams` TypeError | PASS, not observed |
| Invalid record rendered | PASS, no History card rendered |
| Invalid record exportable | PASS, exports disabled with sanitized count `0` |
| Settings sanitized count | PASS, `0` |
| Raw `brewHistory` changed on read | PASS, byte-for-byte unchanged |
| Runtime/console error | PASS, none |

## 16. Source / legal / provenance safety QA

This docs-only PR does not change recipe data, method schedules, provenance
data, source notes, legal copy, or POINT/TIPS behavior.

Confirmed unchanged:

* `sourceStatus`
* `verificationLevel`
* `valuesArePlaceholder`
* `isPlaceholder`
* `fieldEvidence`
* recipe provenance and source notes
* `src/data/tips.ts`
* `src/types/tips.ts`
* `docs/research/coffee_app_tips_master_v2.json`

No checked compact UI surface exposed raw source URLs, timecodes, transcripts,
or source notes. No new official endorsement, supervision, partnership,
affiliation, complete reproduction, guaranteed original accuracy, or
guaranteed brew-result claim was introduced.

## 17. Data/storage safety QA

| Check | Result |
| --- | --- |
| localStorage key remains `brewHistory` | PASS |
| Valid history survives normal use | PASS |
| Invalid history avoids crashes | PASS |
| Invalid fixture read preserves raw storage | PASS |
| Export preserves history | PASS |
| Delete tested only in disposable storage | PASS |
| Real user browser data mutated | PASS, no |
| `BrewSession` shape changed | PASS, no |
| `BrewSetup` shape changed | PASS, no |
| PWA manifest/service worker/base path changed | PASS, no |

## 18. Console/runtime error audit

No blocking or non-blocking browser console/runtime errors were observed
during:

* root load
* Recipe Setup
* Timer and Finish
* save and discard
* History and History Detail
* Rebrew and Last Brew
* Settings, export, and delete
* corrupt-history fixture
* public GitHub Pages load
* service-worker-controlled offline route reloads

Classification: **No errors**.

## 19. Release readiness checklist

| Item | Status |
| --- | --- |
| Brew Home works | PASS |
| Recipe Setup works | PASS |
| Timer works | PASS |
| Finish save/discard works | PASS |
| History works | PASS |
| History Detail works | PASS |
| Rebrew works | PASS |
| Last Brew works | PASS |
| Settings works | PASS |
| CSV export works | PASS |
| JSON export works | PASS |
| Delete cancel/confirm works in disposable storage | PASS |
| PWA manifest valid | PASS |
| PWA icons valid | PASS |
| Service worker/offline app shell works | PASS |
| OS-level PWA install | NOT RUN |
| `375x667` usable | PASS |
| `390x844` usable | PASS |
| No horizontal overflow | PASS |
| No bottom-tab overlap | PASS |
| No source/legal overclaim | PASS |
| No raw source leakage in compact UI | PASS |
| Corrupt history does not blank-screen | PASS |
| No real user data mutated during QA | PASS |
| Build passes | PASS |
| Diff check passes | PASS |

## 20. Known limitations

* Actual OS-level PWA installation and standalone-window launch were not run.
* Actual iPhone Safari Add to Home Screen was not run.
* CDP installability reported the disposable/incognito environment limitation
  `in-incognito`; no app-specific installability error was reported.
* Full downloaded CSV/JSON content was not re-inspected in this run because
  PR-018C already covered that optional artifact-level check.
* Browser QA covers the required viewports and Chrome, not every browser
  engine, device, accessibility zoom level, or OS integration surface.

## 21. Judgment

**PASS_WITH_LIMITATIONS**

The current `main` baseline is suitable to treat as a Ver1.0 release
candidate. All critical brew, timer, save/discard, History, Rebrew, Last Brew,
Settings, export, delete, corrupt-storage, public PWA, offline app-shell, and
required mobile viewport checks passed without a blocking console/runtime,
source/legal, provenance, or storage regression.

The remaining limitations are non-critical environment/OS integration checks:
actual OS-level installation, standalone launch, and actual iPhone Add to Home
Screen.
