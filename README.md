# Pourō-GPT

Pourō-GPT is a quiet, mobile-first brewing execution guide and timer PWA for
following a selected pour-over method from setup through finish.

Public app: <https://ns-del346.github.io/Pouro-GPT/>

## Ver1.0 Status

The current app is a Ver1.0 release candidate. Critical brew, history,
Settings, export, delete, storage-guard, public PWA, and offline app-shell
flows passed PR-020A QA, with the OS-level PWA limitations listed below.

## Main Features

- Brew method selection
- Recipe setup
- Target-total-first brew timer
- Brew finish with save or discard
- Brew history and History Detail
- Rebrew from History
- Last Brew shortcut
- Settings
- CSV history export
- JSON backup export
- Local history delete
- GitHub Pages PWA support
- Offline app-shell support after Service Worker caching
- Legacy or corrupt `localStorage` guard

## Supported Method Groups

- 4:6 Method
- Hybrid / HARIO Switch-style
- THE NEO BREW / 10 Pour
- Ice Brew

Method names describe user-facing brewing categories. Recipe values may be
verified, researched, summarized, interpreted, app-guided, unverified, or
placeholder. They are not guaranteed to be official or complete.

## Data Storage and Privacy

Pourō-GPT has no account, backend database, or cloud sync. Brew history and
settings are stored in the browser's `localStorage` for this site. Clearing
browser or site data can delete saved history and settings.

See [PRIVACY.md](PRIVACY.md) for the current data-handling details.

## Export and Backup

Settings can create local CSV history exports and JSON backup exports as
downloads. Ver1.0 does not include an import or restore UI. Users are
responsible for storing downloaded files safely.

## PWA and GitHub Pages Usage

Pourō-GPT is served as a static PWA through GitHub Pages. The app shell can
load offline after the Service Worker has cached it. Offline behavior depends
on the browser, Service Worker, and cache state and is not guaranteed.

## Known Limitations

- No account system, cloud sync, backend database, or cross-device
  synchronization
- No import or restore UI yet
- No analytics dashboard, bean inventory, scale integration, or TDS and
  water-tracking integration
- No official endorsement or supervision
- Browser or site data clearing can delete local history and settings
- OS-level PWA installation, standalone-window launch, and actual iPhone
  Safari Add to Home Screen were not fully verified in automated QA
- Offline behavior depends on prior browser, Service Worker, and cache state

## Source and Legal Notice

Pourō-GPT is personal and unofficial. It is not affiliated with, endorsed by,
supervised by, sponsored by, partnered with, or approved by any referenced
person, company, maker, or brand. Method data is not guaranteed to be an
official or complete reproduction, and brew results are not guaranteed.

See [NOTICE.md](NOTICE.md) for the canonical source and legal caution.

## Development

```powershell
npm install
npm.cmd run dev
npm.cmd run build
```

## Documentation

- [Notice and source caution](NOTICE.md)
- [Privacy and local data behavior](PRIVACY.md)
- [Prepared v1.0.0 release notes](docs/release/v1.0.0-release-notes.md)
- [PR-020B documentation QA](docs/qa/PR-020B-readme-notice-release-notes.md)
