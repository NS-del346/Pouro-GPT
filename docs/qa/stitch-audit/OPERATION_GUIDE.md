# Stitch Audit Operation Guide

## 1. Prepare the artifact

Provide one normalized ZIP with a root `manifest.json` and canonical files under `screens/`. Raw Stitch folder exports are not audited directly.

The filename must be `<state-id>__<width>x<height>.png`; the HTML companion uses the same stem. `stateId` never receives a viewport suffix.

## 2. Local verification

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd --prefix tools/stitch-audit run stitch:audit:test
npm.cmd --prefix tools/stitch-audit run stitch:audit:fixtures
npm.cmd --prefix tools/stitch-audit run stitch:audit -- C:\path\artifact.zip --set set-a --strict
git diff --check
```

## 3. GitHub Actions

Run `Stitch Audit` with the source Actions run ID, audit set, and strict flag. The source run must expose exactly one ZIP in an artifact named `stitch-export`.

The workflow runs the unit and synthetic fixture suites before auditing the downloaded ZIP. It uploads the report files even when the artifact fails.

## 4. Interpret the result

- `PASS`: all deterministic checks passed.
- `PASS WITH WARNINGS`: deterministic blockers passed; warnings need review.
- `FAIL`: the artifact violates inventory, manifest, filename, dimensions, Recipe Truth, forbidden-copy, duplicate, or runnable-state requirements.
- `BLOCKED`: the ZIP could not be safely/readably audited.

Review `report.json` for machine evidence and `report.md` for the human summary. Tie any independent verification to the report's `inputZipSha256`, config versions, and PR head SHA.

## 5. Boundaries

The runner does not prove visual quality, responsive usability, accessibility, Figma editability, or app runtime behavior. Do not promote the PR to Ready or merge it until the required independent verification and Human Gate state are handled outside this runner.
