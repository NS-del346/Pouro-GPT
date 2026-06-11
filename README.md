# Pourō

A quiet, mobile-first pour-over coffee brewing guide and timer PWA.

Public app: <https://ns-del346.github.io/Pouro-GPT/>

Pourō is a personal, unofficial brewing aid. It is not affiliated with,
endorsed by, supervised by, sponsored by, or officially approved by 粕谷哲氏,
PHILOCOFFEA, HARIO, or any referenced person, company, maker, or brand.

## Current MVP Scope

- Brew method selection
- Recipe setup
- Brew timer
- Brew finish note
- Brew history
- History detail
- Rebrew
- Settings
- PWA deployment on GitHub Pages

## Current Methods

- 4:6 Method
- Hybrid
- 10 Pour Method
- Ice Brew

Method names describe brewing approaches and user-facing categories. Some
method data is researched, summarized, app-guided, or placeholder. The app may
include metadata such as `sourceStatus`, `verificationLevel`, and
`valuesArePlaceholder` to describe the status of its data. Unverified or
placeholder values should not be treated as official original recipes or as a
complete reproduction of an original method. See [NOTICE.md](NOTICE.md) for
additional details.

## Data Storage

Brew history and settings are stored locally in the browser via
`localStorage`. The current MVP has no account system, cloud sync, backend
server, dedicated analytics tracking, subscription, or advertising. Clearing
browser or site data may delete saved brew history and settings. See
[PRIVACY.md](PRIVACY.md) for details.

## PWA Usage

On iPhone Safari, users can install Pourō with **Add to Home Screen**. Offline
behavior may depend on browser cache and Service Worker state.

## Development

```powershell
npm install
npm.cmd run build
npm.cmd run dev
```
