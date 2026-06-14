# Privacy

## Ver1.0 Service Model

Pourō-GPT is a static PWA served by GitHub Pages. The app provides no Pourō
account, Pourō backend server, or Pourō cloud sync. No dedicated analytics
tracking is implemented by the app, and the app does not sell personal data.

## Local Data

Brew history and settings are stored in the browser's `localStorage` for this
site. Data stays in the browser or site-data area unless the user exports it or
the browser or operating system handles it otherwise. Pourō-GPT does not
control browser-vendor, operating-system, backup, or device-sync behavior.

Clearing browser or site data can delete saved history and settings. Changing
browsers, browser profiles, or devices may also make locally stored data
unavailable.

## Export and Delete

CSV history exports and JSON backup exports are created locally as downloaded
files. The user is responsible for storing downloaded export and backup files
safely.

Deleting history in Settings clears local brew history for that browser and
site. It does not provide a cloud deletion operation because Pourō-GPT has no
backend or cloud sync.

## Hosting

GitHub Pages serves the static app files. Use of the hosted site may be subject
to GitHub platform behavior and policies. This document describes the current
Pourō-GPT app implementation and does not claim control over GitHub or other
third-party platform behavior.
