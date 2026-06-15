# PR-V2-03: Visual System and Screen Spec QA

## 1. Purpose

Verify that PR-V2-03 records the Stitch-based Ver2.0 visual system and screen specification as docs-only planning material without changing production app behavior.

## 2. Scope

Allowed changes:

- `docs/v2/VISUAL_SYSTEM_SCREEN_SPEC.md`
- `docs/v2/STITCH_REFERENCE.md`
- `docs/v2/README.md`
- `docs/qa/PR-V2-03-visual-system-screen-spec.md`

No app code is changed.

## 3. Source material

Reference artifact:

```text
stitch_pour_gpt_precision_brew_cockpit.zip
https://drive.google.com/file/d/194TsAvsSsA7oQsqM25qnnQAnXpJP0Lv6/view
```

Existing repo planning docs inspected:

- `docs/v2/README.md`
- `docs/v2/PR_ROADMAP.md`

## 4. Changed-file audit

Expected docs-only files:

- `docs/v2/VISUAL_SYSTEM_SCREEN_SPEC.md`
- `docs/v2/STITCH_REFERENCE.md`
- `docs/v2/README.md`
- `docs/qa/PR-V2-03-visual-system-screen-spec.md`

Disallowed changes:

- `src/`
- `public/`
- package files
- manifest / service worker / PWA config
- recipe data
- timer runtime
- localStorage behavior
- generated ZIP / image / HTML / CSS / JS assets
- release metadata

## 5. Guardrail checks

The spec records these implementation constraints:

- Stitch output is a visual reference only.
- Generated code must not be copied into production source.
- The app remains local-first, no-account, no-backend by default.
- The final visual direction is Light Precision Cockpit + Amber Accent.
- Timer UX is time-first, not grams-first.
- Physical scale remains primary for grams.
- Approved method scope is `4:6 / Hybrid / 10 Pour / Ice`.
- 4:6 is represented as a 9-combination system.
- 10 Pour remains fixed / non-scalable.
- `1:45 / 210g` remains preserved for 10 Pour.
- Brew Result must not include photos.
- History remains brew-log-first, not bean-inventory-first.
- Click Converter is approximate and must not imply exact particle size.
- Source/provenance and non-official legal constraints remain preserved.

## 6. Known limitations

- This PR does not run browser/mobile QA because no production UI changed.
- This PR does not inspect or modify generated Stitch code.
- This PR does not implement visual tokens.
- This PR does not implement navigation, timer, click converter, 4:6 UI, history, settings, or motion.
- The Drive ZIP is referenced as an external artifact and is not committed to the repository.
- The current branch was created from the PR-V2-01 merged main baseline; if additional PRs merged after that baseline, rebase/update may be required before merge.

## 7. Checks to run before merge

Recommended local checks:

```text
git diff --name-only
git diff --stat
git diff --check
npm.cmd run build
```

Because this PR was created through GitHub file operations, local build has not been run at creation time.

## 8. Judgment

`PASS_WITH_NOTES`

The remaining notes are non-blocking for a docs-only planning PR if changed files remain within the allowed docs boundary.

Ready for independent verification: YES
Ready for review: YES, subject to changed-file audit
