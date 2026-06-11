# Privacy

## Current MVP

Pourō is a static PWA served through GitHub Pages. The current MVP does not
provide a user account, backend server, or cloud sync. No dedicated analytics
tracking is implemented in the app, and the app does not sell personal data.

## Local Data

Brew history and settings are stored locally in the browser using
`localStorage`. This data remains associated with that browser and site data;
it is not synchronized by Pourō to another device or a Pourō backend.

Users can clear saved brew history with the in-app **すべての履歴を削除**
function. Users can also clear Pourō data by clearing browser or site data.
Clearing browser or site data, changing browsers or devices, or browser storage
behavior may delete saved history and settings.

## Hosting

GitHub Pages serves the static app files. Use of the hosted site may therefore
be subject to GitHub's own hosting practices and policies. This document
describes the current Pourō app implementation and does not make guarantees
about third-party platform behavior.
