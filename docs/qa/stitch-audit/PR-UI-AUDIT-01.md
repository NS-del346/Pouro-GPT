# PR-UI-AUDIT-01 QA Record

## Scope

This PR adds a deterministic Stitch artifact audit runner and its manual workflow. It does not change `src/**`, `public/**`, app UI/runtime, Recipe Setup behavior, Timer behavior, History/storage, PWA, or deployment behavior.

## Correction PR-UI-AUDIT-01-CORRECTION-001

Protected-file strategy: **Option 1 — dependency-free runner**.

- Root `package.json` and `package-lock.json` are restored to `main`.
- The runner uses Node.js standard-library APIs only.
- Tool-local scripts live in `tools/stitch-audit/package.json`.
- `.github/workflows/pr-guard.yml` is unchanged.
- Human Gate for protected-file changes is not required because this PR no longer changes protected files.

## Finding closure

- IV-104-B01: package changes removed without weakening PR Guard.
- IV-104-B02: canonical state IDs and legacy-to-current mapping corrected.
- IV-104-B03: dimension tolerance is `0`; exact and ±1px cases are tested.
- IV-104-B04: ZIP-root `manifest.json` is mandatory and file parity is enforced.
- IV-104-B05: `<state-id>__<width>x<height>.png` is enforced.
- IV-104-B06: reports include ZIP SHA-256, tool/schema/config versions, Authority revisions, audit options, timestamp, and Node version.
- IV-104-B07: all eight required `375x667` states are configured and tested without viewport suffixes in `stateId`.

## Automated coverage

The unit suite covers:

- canonical state IDs
- complete eight-state `375x667` inventory
- exact dimensions and four ±1px failure cases
- missing/invalid artifact manifest
- manifest/file mismatch and undeclared file rejection
- deterministic filename contract
- duplicate state/filename detection
- unsupported runnable state rejection
- input ZIP SHA-256 and config/Authority metadata
- same-input deterministic findings/verdict
- traversal, absolute path, and symlink rejection
- exact duplicate failure and near-duplicate warning
- Document 10 fixed Recipe Truth examples
- valid fixture PASS and invalid fixture FAIL

## Validation record

To be finalized on the correction commit:

| Check | Result |
| --- | --- |
| `npm.cmd ci` | PASS |
| `npm.cmd run build` | PASS |
| `npm.cmd --prefix tools/stitch-audit run stitch:audit:test` | PASS |
| `npm.cmd --prefix tools/stitch-audit run stitch:audit:fixtures` | PASS |
| `git diff --check` | PASS |
| PR Guard | Verify on the live PR head |
| CI | Verify on the live PR head |

Manual browser/mobile QA: **NOT RUN**. This correction changes no app UI/runtime; machine artifact audit is not visual approval.

## Synthetic fixture safety

Fixture PNGs and HTML are generated locally from deterministic patterns and text. They contain no private Stitch export, screenshot, Figma asset, or production user data.
