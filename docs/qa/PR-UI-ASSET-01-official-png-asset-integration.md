# PR-UI-ASSET-01 Official PNG Asset Integration QA

## Scope and SHAs

- Repository: `NS-del346/Pouro-GPT`
- Branch: `codex/pr-ui-asset-01-official-png-integration`
- Base SHA: `559f19fa4e8f755b1dbff9dcd917058d415850fd`
- Head SHA: the exact final PR head is recorded in the PR metadata and final task report. This QA document is part of that commit, so the commit cannot embed its own SHA.
- Open PR audit: only unrelated Draft PR #78 was open during preflight; it was not changed.

## Canonical asset sources

- Brand audit source: Google Drive `02_Brand_Assets`
  - `https://drive.google.com/drive/folders/19BVRVbnm_4lwWijokD_1U12J2futtgfu`
- Integrated PNG source: Google Drive `01_UI_Icons_Transparent_PNG`
  - `https://drive.google.com/drive/folders/1UIfyFJdfGYzo9Tu_iBbBgJzDjWaupUK4`
- Mapping reference: Figma file `1VWirQej7DMgFKn7TKooCo`
  - Asset Library `55:2`
  - Set A `41:226`
  - Set B `41:2135`
  - Set C `41:2944`
- Drive manifest audit: 001–004 are 1254 × 1254 RGBA PNGs; 049–060 are 640 × 640 RGBA PNGs; all report transparent pixels.

No asset was generated, redrawn, recolored, cropped into a new file, or sourced from `03_Method_Icons`, an old ZIP, or a screenshot.

## Added PNGs

| Repository file | Canonical Drive file | Dimensions | SHA-256 |
| --- | --- | ---: | --- |
| `src/assets/methods/method-four-six.png` | `pouro_icon_001_pour_over_carafe.png` | 1254 × 1254 | `0EEA871FC47C49D8898A60E2249FDD75C2EEF023C5EF3D1D63676D0F4C8F3CF2` |
| `src/assets/methods/method-hybrid.png` | `pouro_icon_002_switch_dripper.png` | 1254 × 1254 | `75B42BF4E3778BE5814FCB449702F552D326218E4C03BAB3DA04F3A65E4A9F9C` |
| `src/assets/methods/method-ten-pour.png` | `pouro_icon_003_gooseneck_kettle.png` | 1254 × 1254 | `26AD692D8B779F1F8EA89A6957AD92FB6C8C9D4DEE1A2469C44BFEF43ED5FA50` |
| `src/assets/methods/method-ice-brew.png` | `pouro_icon_004_iced_glass.png` | 1254 × 1254 | `68E37DB27C94779E1E5C041150628E44E9738BBDC22BA914FF819A18E1DFA81D` |
| `src/assets/navigation/nav-brew.png` | `pouro_icon_049_dripper_drop.png` | 640 × 640 | `4231EB40103268ED5D48C658C20595447F8A3B4D5EB49A97F2988EF1E79EF840` |
| `src/assets/navigation/nav-tools.png` | `pouro_icon_050_sliders.png` | 640 × 640 | `879E2176AF6753D25658123640D75549BC0C3D1875D1F8490AEF4F5DB2336617` |
| `src/assets/navigation/nav-history.png` | `pouro_icon_051_history_note.png` | 640 × 640 | `6F9EF599034061A60053EE431547F1618CAFD0EB404061F2D52D98FD0DE1CA8D` |
| `src/assets/navigation/nav-settings.png` | `pouro_icon_052_settings.png` | 640 × 640 | `03FA3206DD480B147C8106EF1BC58B5A1D2F58F89EF02725D3FA9DBC7278162E` |
| `src/assets/actions/action-back.png` | `pouro_icon_053_back_arrow.png` | 640 × 640 | `4F5FB5B936FBC4C4663A975E25724EA7AD6E8E826DE16CDDD5A0B4F048CCB1D1` |

## Method mapping

| Method ID | Official PNG |
| --- | --- |
| `four-six` | 001 / `method-four-six.png` |
| `hybrid` | 002 / `method-hybrid.png` |
| `ten-pour` | 003 / `method-ten-pour.png` |
| `ice-brew` | 004 / `method-ice-brew.png` |

`src/assets/methods/methodIcons.ts` provides the exhaustive `BrewMethodId` mapping. Method names, descriptions, selection behavior, card structure, recipe values, and source states are unchanged.

## Navigation mapping

| Existing Bottom Tab | Official PNG |
| --- | --- |
| 抽出 | 049 / `nav-brew.png` |
| ツール | 050 / `nav-tools.png` |
| 履歴 | 051 / `nav-history.png` |
| 設定 | 052 / `nav-settings.png` |

The `NavLink` destinations, active predicate, visible labels, safe-area padding, and tap regions are unchanged. Active images use opacity `1` and no filter; inactive images use opacity `0.62` and `saturate(0.68)`. The existing active tab background remains, so state is not communicated by color alone.

## Action icon mapping

| Figma/Drive action | Runtime result |
| --- | --- |
| 053 back | Replaced the shared CSS-generated back arrow with `action-back.png`; the visible behavior and accessible text `戻る` are preserved. |
| 054 close | Figma placement confirmed, but the current runtime has no existing close action to replace. Not added. |
| 055 add | Figma placement confirmed for the converter design, but the current runtime has no existing add action. Not added. |
| 056 edit | Not placed in Set A, B, or C. Not added. |
| 057 save | Figma placement confirmed, but the current runtime save control is a text-only button. The prompt forbids adding icons to text-only buttons. Not added. |
| 058 delete | Not placed in Set A, B, or C. Not added. |
| 059 search | Not placed in Set A, B, or C. Not added. |
| 060 more | Not placed in Set A, B, or C. Not added. |

## Changed files

- `src/assets/actions/action-back.png`
- `src/assets/methods/method-four-six.png`
- `src/assets/methods/method-hybrid.png`
- `src/assets/methods/method-ten-pour.png`
- `src/assets/methods/method-ice-brew.png`
- `src/assets/methods/methodIcons.ts`
- `src/assets/navigation/nav-brew.png`
- `src/assets/navigation/nav-tools.png`
- `src/assets/navigation/nav-history.png`
- `src/assets/navigation/nav-settings.png`
- `src/components/layout/Page.tsx`
- `src/components/navigation/BottomTabs.tsx`
- `src/pages/BrewHomePage.tsx`
- `src/styles/index.css`
- `docs/qa/PR-UI-ASSET-01-official-png-asset-integration.md`
- `docs/qa/screenshots/PR-UI-ASSET-01-about-back-393x852.png`
- `docs/qa/screenshots/PR-UI-ASSET-01-history-393x852.png`
- `docs/qa/screenshots/PR-UI-ASSET-01-settings-393x852.png`
- `docs/qa/screenshots/PR-UI-ASSET-01-tools-393x852.png`

## Explicit non-changes

- No recipe truth, method data, variant data, `sourceStatus`, `verificationLevel`, or placeholder field changed.
- No `BrewSetup`, `BrewSession`, History schema, localStorage key, Timer calculation, Timer state machine, step progression, Finish behavior, replay behavior, Settings behavior, routing, legal/source copy, dependency, manifest, Service Worker, favicon, Apple touch icon, or PWA icon declaration changed.
- Screen text `pourō` remains text and keeps its accessible label and macron construction. `Wordmark.png` was audited but not integrated into screen headers.
- PR #78 was not changed.

Protected-file SHA-256 values after implementation:

- `public/manifest.webmanifest`: `764CC2EACBD375FEEF20F7ED49324DCF425965DE562348EDCC802EC2FF609E97`
- `public/sw.js`: `495221624B5A44B08E33040071FBF40E867A068E4DAE550AFB06B1F9C725A8E3`
- `src/data/placeholderMethods.ts`: `C5A1EEB4F419E5ED109E30BAEDD5B51DE2690693B3D9B115AEF3C2FB544C0521`
- `src/types/brew.ts`: `351B1DC5524E59B929D9BFDF9F5D8D85DF32064EF58432C522A50BDA589579F2`

## Viewport QA

### 375 × 667

- Home: all four method images loaded (`complete=true`, `naturalWidth=1254`), rendered through 50 × 50 transparent frames, and produced no broken image.
- Home document: `scrollWidth=clientWidth=375`, `scrollX=0`.
- Home CTA: 52px high and reachable above Bottom Tabs.
- Bottom Tabs: each link was 83 × 52px in the in-app browser; active and inactive styles were distinct.
- Timer safety smoke: `theme-active-brew` active, Bottom Tabs absent, controls visible at viewport bottom, `scrollWidth=clientWidth=375`.

### 393 × 852

- Home: all four method images loaded at 50 × 50 frame size with no broken image; `scrollWidth=clientWidth=393`.
- Tools, History, and Settings: all four navigation PNGs loaded (`naturalWidth=640`), the correct tab was active on each route, and `scrollWidth=clientWidth=393`.
- Bottom Tab tap regions were approximately 91 × 52px.
- About: back target was at least 44px high, the official image loaded (`naturalWidth=640`) in a 16 × 16 frame, and the link retained the accessible text `戻る`.
- Timer safety smoke: controls remained reachable, Bottom Tabs remained absent, and no horizontal overflow occurred.

## Accessibility QA

- All method, navigation, and action PNGs use `alt=""` and `aria-hidden="true"`.
- Method buttons retain their accessible names, `aria-pressed` state, and click behavior. Selecting Hybrid updated the selected heading and CTA route without changing the image set.
- Bottom Tab accessible names continue to come from the visible Japanese labels.
- The icon-only visual back link retains the screen-reader text `戻る` and a target of at least 44px.
- Browser audit found zero broken images on Home, Tools, History, Settings, About, Recipe Setup, and Timer smoke routes.

## Build and test results

- `npm.cmd ci`: PASS; 73 packages installed, 0 vulnerabilities reported.
- `npm.cmd run build`: PASS; includes TypeScript project build and Vite production build.
- Existing test script: NOT AVAILABLE (`package.json` defines no `test` script).
- Lint script: NOT AVAILABLE (`package.json` defines no `lint` script).
- `git diff --check`: PASS.

## App Icon audit

- Canonical Drive `app-icon-master.png`: 1254 × 1254, SHA-256 `3C2524C19974B43EE4F9FB1691F3286857E6A4665D7399B505741134B5F38A7E`.
- Current `public/icons/icon-512.png`: 512 × 512, SHA-256 `5CF1823A7EAFC7149849D818ABC4D7BC44DC84BBC7EEC0ACCCD93DB05DD5F115`.
- Current `public/icons/icon-192.png`: 192 × 192, SHA-256 `120ACCB74AA0B76855B5CC67472A3D07D381F7755CA683FF578A517A5CB74D10`.
- Visual audit confirms different artwork: the canonical master is the amber droplet/timer mark, while the current PWA icons use the `pourō` wordmark artwork.
- Per scope, no PWA icon, manifest declaration, favicon, Apple touch icon, Service Worker entry, install behavior, or OS-level name was changed. Replacing the PWA icon is a separate PR candidate.

## Screenshot evidence

- `docs/qa/screenshots/PR-UI-ASSET-01-tools-393x852.png`
- `docs/qa/screenshots/PR-UI-ASSET-01-history-393x852.png`
- `docs/qa/screenshots/PR-UI-ASSET-01-settings-393x852.png`
- `docs/qa/screenshots/PR-UI-ASSET-01-about-back-393x852.png`

The in-app browser screenshot API timed out twice. Microsoft Edge headless produced the committed screenshots above. Its Home capture did not paint the large transparent Method PNG layers even though the in-app browser reported all four images complete with their natural dimensions and zero broken images, so that inaccurate Home capture was intentionally not committed.

## Known limitations

- Close, add, and save PNGs were not integrated because there is no qualifying existing icon-bearing runtime action under the prompt rules.
- Home Method image confirmation is recorded as browser DOM/load/layout evidence rather than a committed screenshot because of the headless capture limitation described above.
- The current PWA icon artwork differs from the canonical master and requires a separate, explicitly scoped PR.
