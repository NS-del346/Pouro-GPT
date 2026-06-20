# Stitch Audit Runner

PR-UI-AUDIT-01 provides a deterministic, dependency-free Node.js audit for normalized Stitch handoff ZIPs. It does not generate Stitch/Figma assets, approve visual quality, or change the Pourō app runtime.

## Run

From the repository root:

```powershell
npm.cmd --prefix tools/stitch-audit run stitch:audit:test
npm.cmd --prefix tools/stitch-audit run stitch:audit:fixtures
npm.cmd --prefix tools/stitch-audit run stitch:audit -- C:\path\artifact.zip --set set-a --strict
```

No root package script or added dependency is required. The tool uses Node.js standard-library APIs only.

## Normalized ZIP contract

```text
artifact.zip
├── manifest.json
└── screens/
    ├── setup-four-six__393x852.png
    ├── setup-four-six__393x852.html
    └── ...
```

`manifest.json` is mandatory at the ZIP root. Each `screens[]` item requires:

- `stateId`
- `fileName`
- `htmlFileName`
- `expectedWidth` / `expectedHeight`
- `methodId` / `variantId` (nullable where not applicable)
- `recipeTruthSummary`
- `sourceStatus`
- `verificationLevel`
- `knownGaps`

The PNG filename is exactly:

```text
<state-id>__<width>x<height>.png
```

The HTML companion uses the same stem with `.html`. Manifest entries and ZIP files must match in both directions. Duplicate state/viewport pairs, duplicate filenames, undeclared files, unsafe paths, nested ZIPs, symlinks, invalid JSON, and unsupported runnable states fail the audit.

Raw Stitch exports that use folder names and `screen.png` must first be normalized by a separate adapter. The runner intentionally does not infer artifact identity from folder names.

## Canonical state identity

Viewport is metadata, not part of `stateId`. For example, both artifacts below use `stateId: "brew-waiting"`:

```text
brew-waiting__393x852.png
brew-waiting__375x667.png
```

Legacy aliases may be documented in the internal config, but reports always use the current canonical state ID.

## Exact dimensions

Primary artifacts are `393x852`; the minimum matrix is `375x667`. Tolerance is zero. Any ±1px width or height mismatch fails.

The required `375x667` states are:

- `home-previous-brew`
- `setup-four-six`
- `setup-unsupported`
- `brew-pouring`
- `brew-waiting`
- `brew-paused`
- `finish-unsaved`
- `settings-data`

## Checks and outputs

The audit checks ZIP safety, manifest/file parity, inventory, canonical filenames, exact PNG dimensions, Recipe Truth fixed examples, forbidden copy, exact duplicates, near duplicates, and unsupported runnable schedules.

It writes:

- `report.json`
- `report.md`
- `contact-sheet.png`
- `extracted-text.json`
- `screen-inventory.json`
- normalized PNG/HTML copies

`report.json` and `report.md` record tool/config versions, Authority IDs/effective dates, input ZIP filename and SHA-256, audit set, strict flag, timestamp, and Node version. The same ZIP, configs, and tool version produce the same findings and verdict; timestamp remains metadata only.

Exact duplicates between distinct required states fail in strict mode. Near duplicates remain warnings for independent visual review.

## Exit codes

- `0`: PASS or PASS WITH WARNINGS
- `1`: FAIL
- `2`: BLOCKED before a complete audit (for example, unsafe/corrupt ZIP)

Machine audit PASS is not visual approval, accessibility approval, or runtime verification.
