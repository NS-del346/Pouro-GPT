# PR-DEV-TOOLS-01｜Codex Development Foundation QA

## Goal

Create the project-local Codex Development Foundation as a verifiable, uncommitted exact 11-file diff without application, dependency, Git history, or PR mutation.

## Base SHA

```text
ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
```

## Branch

```text
codex/pr-dev-tools-01-codex-foundation
```

The branch has no upstream. `HEAD`, `origin/main`, and merge-base matched the base SHA at preflight.

## Allowed files

```text
AGENTS.md
.codex/agents/specification.toml
.codex/agents/implementation.toml
.codex/agents/verifier.toml
.codex/agents/regression.toml
.agents/skills/pouro-pr-orchestration/SKILL.md
.agents/skills/pouro-protected-scope-guard/SKILL.md
.agents/skills/pouro-pr-handoff/SKILL.md
.codex/rules/pouro-project.rules
docs/development/CODEX_DEVELOPMENT_FOUNDATION.md
docs/qa/PR-DEV-TOOLS-01-codex-development-foundation.md
```

Expected: 10 new files, 1 modified file, 11 changed files total.

## Out of scope

- Application code, recipes, methods, Timer, History, Settings, storage, PWA, source/provenance data, POINT/TIPS, and GitHub workflow files.
- Dependencies, package metadata, build artifacts, branch operations, staging, commit, push, PR mutation, merge, release, Hook trust bypass, approval bypass, and user-level configuration mutation.
- Actual Custom Agent task execution, browser QA, mobile QA, and physical-device QA.

## Source validation

Status: PASS.

- Installed version: `codex-cli 0.141.0`.
- Authority: source-map entries pinned to `rust-v0.141.0`; `main` and `latest` were not used.
- Confirmed from pinned source: config schema, config-layer participation, `.codex/agents` role discovery, role-file `name`/`description` plus supported `developer_instructions`, `.agents/skills` repository discovery, `prefix_rule` syntax and decisions, `codex execpolicy check`, and user/project AGENTS concatenation.
- No unsupported key, per-agent model override, per-agent sandbox override, or invented validator/list command was added.

## Static checks

Status: PASS.

- Exact status set: 11 expected paths, 11 actual paths, no missing or unexpected path.
- Custom Agent TOML: standard `tomllib` parse passed; each file contains only `name`, `description`, and `developer_instructions`; filename and role name match; all required strings are non-empty; no duplicate role exists.
- Skill frontmatter: all three `skill-creator` validators passed; names match directories and descriptions contain routing triggers.
- Encoding: all 10 new files are UTF-8 without BOM, LF-only, and end with a newline.
- Markdown: heading hierarchy and code-fence counts passed; relative links resolve; no unfinished-work marker, raw-secret assignment, or personal absolute path was found.
- `AGENTS.md`: UTF-8 without BOM, CRLF-only, trailing newline present, and the original 6506-byte prefix SHA-256 matches the pre-change snapshot.
- `git diff --check`: PASS after the final QA update.

## Agent parse and discovery

Status: PASS for parse and source-backed fresh-process discovery.

Discovered role files and names: `specification`, `implementation`, `verifier`, `regression`.

- Pinned v0.141.0 loader evidence confirms recursive `.toml` discovery under the project config folder's `agents` directory and rejects malformed or duplicate roles.
- A fresh `pouro-audit` `codex debug prompt-input` process exited 0 and reported no malformed-agent, parse, unknown-field, or configuration warning.
- The diagnostic does not render tool schemas, so role descriptions do not appear in its prompt JSON. Discovery evidence therefore combines the fresh warning-free loader startup with the pinned loader path and exact four-file TOML/name validation; no unsupported role-list command was invented.
- `--strict-config` is not supported by `codex debug` in v0.141.0, and `--profile` is not supported by `codex app-server`; those rejected combinations were not treated as validation passes.

Actual agent task execution: `NOT RUN` — deferred to Stage 8. Agent spawn count: `0`.

## Skill validation and discovery

Status: PASS.

Fresh-process discovered Skills: `pouro-pr-orchestration`, `pouro-protected-scope-guard`, `pouro-pr-handoff`.

`skill-creator` initialization was not used because it would create `agents/openai.yaml` outside the exact allowed file set. Its `quick_validate.py` validator is used with UTF-8 mode and bytecode writes disabled.

The fresh `pouro-audit` prompt diagnostic contained all three project Skill names and both user-level and repository AGENTS content. It performed no agent task and no workspace mutation.

## Rule parse and fixture results

Status: PASS.

- Standalone project Rule parse: PASS.
- Combined parse with user `default.rules` and `safe-development.rules`: PASS.
- Allow fixtures: `npm run build`, `npm.cmd run build` → `allow`.
- Prompt fixtures: dependency install/uninstall/update, `npm audit fix`, `npm audit fix --force`, deploy, publish, workflow dispatch, and release create/edit/delete → `prompt`.
- Overblocking fixtures with project Rule alone: `npm ci`, `gh pr view 123`, `git status --short --branch` → no matching project decision.
- Combined overblocking fixtures: `npm ci` → no decision; `gh pr view 123` and `git status --short --branch` → user-level `allow`; none were forbidden.

Fixtures are matcher inputs only and are never executed.

Commands routed through unenumerated shell wrappers, aliases, or unsupported executable-resolution forms are `UNREPRESENTABLE` by the requested exact prefix policy without unsafe approximation. They remain governed by user-level Rules, Hook, sandbox, approvals, and explicit task authority.

## AGENTS.md preservation

Pre-change metadata:

```yaml
size: 6506
sha256: 5561805E8719495B930DADC138EB8A8B28F6B39B42AA80F0BC88AE9ADEDC6C99
encoding: UTF-8 without BOM
line_endings: CRLF
trailing_newline: present
```

Validation must prove that the original byte prefix is unchanged and only `## Codex Development Foundation` was appended.

Result: PASS. Original byte-prefix hash matches, the new heading appears once at the end, existing content order is unchanged, and line endings remain CRLF.

## User-level foundation invariants

Before-write metadata snapshot: PASS — 9 specified files recorded by path, size, SHA-256, and UTC timestamp without reading secrets or file contents.

After-write comparison: PASS — all 9 paths, sizes, SHA-256 values, and UTC timestamps are identical.

## User-level Skills invariants

Before-write metadata snapshot: PASS — 6 files under the Stage 5 user Skill root recorded by relative path, size, SHA-256, and UTC timestamp.

After-write comparison: PASS — file count, relative paths, sizes, SHA-256 values, and UTC timestamps are identical.

## Repository invariants

Preflight: PASS.

```yaml
repository: NS-del346/Pouro-GPT
branch: codex/pr-dev-tools-01-codex-foundation
head: ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
origin_main: ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
merge_base: ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
worktree: clean
upstream: absent
```

Post-write invariant comparison: PASS.

```yaml
branch: codex/pr-dev-tools-01-codex-foundation
head: ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
origin_main: ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
commit_created: false
staged_files: 0
upstream: absent
working_tree: expected 11-file unstaged/untracked change set
```

## PR #78 and PR #106 invariants

Preflight: PASS.

```yaml
pr_78:
  state: OPEN
  draft: true
  head: 03025e3f0cb3d5898fa382818f94ca5fc3c59c43
pr_106:
  state: OPEN
  draft: true
  head: 60e318452f0b1dd5f34b7aeb6ca3d7dedb12f19a
```

Post-write comparison: PASS — state, draft flag, and head SHA remained identical for both PRs.

## NOT RUN

```yaml
npm_run_build: NOT RUN — deferred to Stage 9 to preserve the exact 11-file write scope and avoid build artifacts
browser_qa: NOT RUN — no application UI change
mobile_qa: NOT RUN — no application UI change
physical_device_qa: NOT RUN
assistive_technology_qa: NOT RUN
actual_agent_task_execution: NOT RUN — deferred to Stage 8
```

## Human Gates

All human UI, physical-device, assistive-technology, and subjective acceptance checks remain `NOT RUN`. No Human Gate is cleared by this Stage.

## Known limitations

- Static parse and fresh-process discovery do not prove role behavior; Stage 8 must execute independent role tests.
- Project-local files do not install or trust user-level Hooks or profiles.
- Prefix Rules cannot safely classify every wrapper, alias, or semantically equivalent command.
- No application build or runtime QA is performed in this Stage.

## Stage 8 handoff

Stage 8 may begin only after exact change-set, parse, validator, fresh-process discovery, Rules fixtures, encoding, user-level invariants, repository invariants, and frozen-PR invariants pass. Stage 8 must keep Custom Agent execution independent, read-only where specified, and must not treat this document's static results as behavioral proof.
