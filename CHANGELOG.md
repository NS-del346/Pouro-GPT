# Changelog

## v0.1.0 - Public MVP

Release type: Public MVP / Release Candidate pass

### Added

- Mobile-first pour-over brewing guide PWA
- Brew method selection
- Recipe setup
- Brew timer
- Brew finish note
- Brew history
- History detail
- Rebrew
- Settings
- In-app About / Sources / Legal / Privacy pages
- GitHub Pages deployment workflow
- GitHub Pages SPA fallback
- Public release documentation: README / NOTICE / PRIVACY
- Public release smoke QA notes

### Methods included

- 4:6 Method
- Hybrid
- 10 Pour Method
- Ice Brew

### Public deployment

- Public URL: <https://ns-del346.github.io/Pouro-GPT/>
- GitHub Pages deployment is active.
- Direct nested-route access is handled by the GitHub Pages SPA fallback.
- HTTP status itself is not the acceptance criterion for fallback behavior.

### Data and privacy

- Brew history and settings are stored in browser `localStorage`.
- No account system.
- No Pourō backend.
- No Pourō cloud sync.
- No dedicated in-app analytics tracking.
- Clearing browser or site data may delete saved history and settings.

### Notice

- Pourō is unofficial.
- Pourō is not affiliated with, sponsored, endorsed, supervised, or approved by
  粕谷哲氏, PHILOCOFFEA, HARIO, or any referenced person, company, maker, or
  brand.
- Method data may include verified, researched, summarized, interpreted,
  app-guided, unverified, or placeholder values depending on metadata.

### Known limitations

- Some method data may still be placeholder or carry a needs-review status.
- A separate Preview screen is not included in the MVP.
- PWA and offline behavior may depend on browser cache and Service Worker state.
- No cloud sync.
- No account system.
- No analytics dashboard.
- No TDS, Extraction Yield, or chart features.
- No Bluetooth scale integration.
- No community or recipe sharing.

### Non-goals for v0.1.0

- Not an official recipe reproduction app.
- Not a complete method encyclopedia.
- Not a medical or health advice tool.
- Not a cloud account product.
- Not a social or community app.
