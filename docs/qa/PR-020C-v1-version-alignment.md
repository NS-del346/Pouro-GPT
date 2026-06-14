# PR-020C: v1.0.0 Version Alignment / Tag Preparation

## 1. Purpose

Align project version metadata and document the final owner steps for creating
the `v1.0.0` tag and GitHub Release after this PR is merged.

This PR does not create a tag or GitHub Release.

## 2. Scope

This is a small version-alignment and release-preparation PR. It changes only
package version metadata, the prepared release-notes status, and this QA
document. It does not change runtime app behavior.

## 3. Changed files

Expected:

- `package.json`
- `package-lock.json`
- `docs/release/v1.0.0-release-notes.md`
- `docs/qa/PR-020C-v1-version-alignment.md`

No source, public asset, configuration, dependency, or script change is in
scope.

## 4. Baseline

| Check | Result |
| --- | --- |
| Repository | `NS-del346/Pouro-GPT` |
| Base branch | `main` |
| Expected latest main | `5ff4661db2d51e42cf9c77e057b56747c6ecb6ac` |
| Actual latest main | `5ff4661db2d51e42cf9c77e057b56747c6ecb6ac` |
| Subject | `PR-020B: README / NOTICE / Release Notes for Ver1.0` |
| `git pull origin main` | PASS, already up to date |
| Branch starting point | PASS, exact expected main commit |

## 5. Version alignment

| Check | Result |
| --- | --- |
| `package.json` package name | PASS, remains `pouro-gpt` |
| `package.json` version | PASS, aligned from `0.1.0` to `1.0.0` |
| Dependencies | PASS, unchanged from `main` |
| Dev dependencies | PASS, unchanged from `main` |
| Scripts | PASS, unchanged from `main` |

## 6. Package-lock review

`npm install --package-lock-only` is used only to align root package version
metadata. The final diff must show the top-level and root-package versions as
`1.0.0`, with no dependency resolution or dependency metadata changes.

Result: PASS. The lockfile diff changes only the top-level and root-package
versions from `0.1.0` to `1.0.0`. No dependency resolution, dependency
metadata, or package integrity entry changed.

The initial `npm install --package-lock-only` invocation was blocked by the
Windows PowerShell script execution policy. The equivalent
`npm.cmd install --package-lock-only` completed successfully and reported the
lockfile up to date. It also reported three existing high-severity audit
findings; no audit fix was run because dependency changes are out of scope.

## 7. Release notes review

The release-notes status states:

> Prepared for v1.0.0 tag and GitHub Release after PR-020C is merged.

It does not claim that the `v1.0.0` tag or GitHub Release already exists.
Known limitations and non-official/source/legal cautions remain unchanged.

## 8. Build/static checks

| Check | Result |
| --- | --- |
| `npm.cmd run build` | PASS, TypeScript and Vite production build completed |
| `git diff --check` | PASS |
| Final changed-file audit | PASS, limited to the four expected files |
| Browser or mobile QA | NOT RUN, no UI or runtime behavior change |

## 9. No runtime change audit

The final audit must confirm no change to:

- `src/**`
- `public/**`
- `index.html`
- `vite.config.*`
- `tsconfig.*`
- recipe data, method schedules, timer behavior, or storage behavior
- PWA manifest, Service Worker, or GitHub Pages base path

Result: PASS. `src/**`, `public/**`, `index.html`, Vite and TypeScript config,
README, NOTICE, and PRIVACY are unchanged. No runtime, recipe, timer, storage,
PWA, or GitHub Pages behavior was changed.

## 10. Tag/release preparation notes

After PR-020C is merged, the owner can run:

```bash
git checkout main
git pull origin main
git status
git log -1 --oneline

git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

Then:

- Create GitHub Release from tag `v1.0.0`.
- Use `docs/release/v1.0.0-release-notes.md` as the release body.
- Mark it as the latest release.
- Do not mark it as a prerelease if the owner accepts the PR-020A/PR-020B
  limitations.

These commands are documented only and are not executed in this PR.

## 11. Out of scope

- Tag creation or tag push
- GitHub Release creation
- Runtime app behavior or UI changes
- Dependencies, devDependencies, scripts, source, public assets, or config
- README, NOTICE, PRIVACY, recipe data, provenance fields, or POINT/TIPS

## 12. Known limitations

- Actual OS-level PWA installation and standalone-window launch remain not
  fully verified.
- Actual iPhone Safari Add to Home Screen remains not fully verified.
- Offline behavior depends on prior Service Worker and cache state.
- Ver1.0 does not include an import or restore UI.
- Method data and brew results are not guaranteed.
- The tag and GitHub Release still require explicit owner action after merge.
- `npm.cmd install --package-lock-only` reported three existing high-severity
  audit findings. They were not changed or fixed because dependencies are out
  of scope.

## 13. Judgment

`PASS_READY_TO_TAG_V1`

Version metadata is aligned, the lockfile changes only root version metadata,
build/static checks pass, dependencies and scripts are unchanged, release
notes remain safe, the strict changed-file boundary passes, and final owner
tag/release commands are documented without being executed.
