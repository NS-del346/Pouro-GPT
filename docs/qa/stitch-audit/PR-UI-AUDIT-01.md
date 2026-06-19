# PR-UI-AUDIT-01 QA Record

## Scope

- Deterministic Stitch ZIP audit CLI
- Set A manifest and config-driven Recipe Truth
- Visible HTML text / numeric extraction
- PNG viewport, SHA-256, dHash inspection
- exact / near duplicate detection
- JSON, Markdown, contact sheet, inventory, extracted-text artifacts
- small generated valid / invalid fixtures
- manual GitHub Actions workflow

## App/runtime status

No application code, application UI, recipe runtime, History, storage, export schema, route, PWA manifest, service worker, or GitHub Pages base path is changed.

## Automated coverage

Unit tests cover:

- folder normalization and alias resolution
- inventory and missing screen detection
- incorrect viewport
- exact duplicate detection
- visible text / gram / time / ratio extraction
- hidden script / element suppression
- 4:6 invalid `18g` and `1 / 5`
- Hybrid missing `3:00`
- Ice missing `30g × 5`
- fallback invented device behavior
- Finish wrong values/source-heavy label
- local save cloud implication
- Markdown and JSON reporting

## Validation record

| Command | Result | Notes |
| --- | --- | --- |
| `npm.cmd ci` | PASS | 134 packages installed; 0 vulnerabilities |
| `npm.cmd run build` | PASS | App production build completed; 73 modules transformed |
| `npm.cmd run stitch:audit:test` | PASS | 5 files / 24 tests passed; includes tool TypeScript check |
| `npm.cmd run stitch:audit:fixtures` | PASS | Small valid and invalid ZIPs regenerated |
| valid fixture, Set A, strict | PASS | Exit 0; 25/25 screens; 0 errors; 0 warnings; contact sheet readable |
| invalid fixture, Set A, strict | PASS | Audit verdict FAIL and exit 1 as expected; 20 errors; 1 missing screen; 1 exact duplicate |
| `--json-only --no-contact-sheet` smoke | PASS | JSON stdout parsed; contact sheet omitted and report field was null |
| `git diff --check` | PASS | No whitespace errors |

Root `lint`, standalone `typecheck`, and root `test` scripts are NOT AVAILABLE. Tool type checking and tests run through `stitch:audit:test`.

## Manual QA

Application browser QA: NOT RUN. No app source or UI is changed. Contact sheet readability was checked visually, and PNG integrity is also verified by reopening generated output through Sharp metadata inspection.

## Safety notes

- ZIP extraction rejects traversal, absolute paths, and symbolic links.
- Generated outputs are not committed.
- Fixtures contain generated images and short synthetic HTML only, not Stitch design exports.
- GitHub Actions downloads an existing artifact; it does not require committing a ZIP.
