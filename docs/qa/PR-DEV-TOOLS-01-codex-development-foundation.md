# PR-DEV-TOOLS-01｜Codex Development Foundation QA

## Current cumulative state before Stage U4 commit

```yaml
repository: NS-del346/Pouro-GPT
initial_base_sha: ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
branch: codex/pr-dev-tools-01-codex-foundation
pre_u4_head: 6c14c051503e4144adb5044a5f13d64bf36254e6
upstream: origin/codex/pr-dev-tools-01-codex-foundation
pr: "#107 OPEN/Draft"
foundation_file_count: 11
pre_u4_commits_over_base: 1
stage_9_build: PASS
ignored_dist_entries_observed_at_stage_9: 19
cli: codex-cli 0.142.0
backup_files_verified: 15/15
hook_corrected_fixtures: PASS
rules: PASS
skills_user: 4/4
skills_project: 3/3
agent_toml: 4/4
explicit_agent_type_runtime: 4/4 PASS_WITH_NOTES
FILE_COUNT: 11
PROTECTED_SCOPE_CHANGED: NO
generic_fallback: false
nested_agents: 0
external_mutations_during_role_runtime: 0
```

The 11-file count is the committed foundation scope, not an unstaged pre-U4 tree. Before Stage U4, `HEAD` equals its upstream and the worktree is clean. The current branch contains one foundation commit over the initial base. No claim in this document changes the historical Stage 9 ignored-`dist` stop or the historical U3 and U3R `NOT_PASS` results.

## Cumulative chronology

| Stage | Result | Evidence and disposition |
| --- | --- | --- |
| Stage 7B | PASS | Initial static QA established the exact 11-file foundation scope from base `ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0`; the detailed historical record remains below. |
| Stage 8 | NOT_PASS | Codex CLI 0.141.0 normal runtime surface lacked an explicit role selector. |
| Stage 8A | PASS | Agent TOML 4/4 parse, static role contract, discovery eligibility, and Skill routing passed. |
| Stage 9 | NOT_PASS | The application build passed, but the strict stop detected 19 ignored `dist` entries. |
| Stage 9R | NOT_PASS | Approval auto-review reached its usage limit. |
| Stage 9R2 | PASS | The exact 11 paths were committed and pushed, and Draft PR #107 was created. |
| U1 | PASS | `READY_FOR_STAGE_U2_WITH_CONDITIONS`. |
| U2 | PASS | Upgraded 0.141.0 to 0.142.0, verified the 15-file backup, and confirmed repository and user foundation files were unchanged. |
| U3 | NOT_PASS | Historical safe-negative Hook fixture expectation was inappropriate. The fixture was separately reconciled as `CORRECTED_TO_PASS`; the U3 stage result remains `NOT_PASS`. |
| U3R | NOT_PASS | The default `spawn_agent` schema hid `agent_type`. This historical result remains `NOT_PASS`. |
| U3S | PASS_WITH_NOTES | `features.multi_agent_v2.hide_spawn_agent_metadata` defaults to `true` and supports the session override `false`. |
| U3T | PASS_WITH_NOTES | Explicit `agent_type` ran 4/4 roles and produced 4/4 markers; verifier reported `FILE_COUNT=11` and `PROTECTED_SCOPE_CHANGED=NO`; generic fallback was false, nested agents 0, and mutations 0. |
| Stage U4 | IN PROGRESS | Documentation/governance reconciliation only, limited to the three existing files listed below. No build, Git, GitHub, user-level, app, or foundation-artifact mutation is authorized. |

Historical failures remain visible rather than being converted into later passes. The corrected Hook fixtures are `PASS`; Rules are `PASS`; user Skills are 4/4; project Skills are 3/3; Agent TOML is 4/4; and the explicit-`agent_type` runtime is 4/4 `PASS_WITH_NOTES`.

## Stage U4 scope and authoring-time status

Allowed existing files:

```text
AGENTS.md
docs/development/CODEX_DEVELOPMENT_FOUNDATION.md
docs/qa/PR-DEV-TOOLS-01-codex-development-foundation.md
```

The other eight foundation artifacts under `.agents/` and `.codex/` are read-only and unchanged. User-level configuration, backup, application code, dependencies, protected behavior, Hooks, Rules, Skills, Agent TOML, package files, `dist`, Git history, and GitHub state are out of scope.

At the time this Stage U4 record is authored, the intended documentation diff is exactly the three paths above. Post-write diff validation, commit, push, PR update, and later independent checks are not pre-claimed here:

```yaml
stage_u4_git_diff_check: PENDING — run after the final documentation write
stage_u4_exact_changed_path_check: PENDING — run after the final documentation write
stage_u4_commit: NOT RUN — not authorized in the implementation stage
stage_u4_push: NOT RUN — not authorized in the implementation stage
stage_u4_pr_mutation: NOT RUN — not authorized in the implementation stage
npm_run_build: NOT RUN — documentation/governance-only and explicitly prohibited for Stage U4
workspace_write_application_pilot: NOT RUN
child_effective_sandbox: UNCONFIRMED
hook_trust_ui: UNCONFIRMED
effective_child_model_and_reasoning: UNCONFIRMED
```

The Stage 9 build remains a historical `PASS`; Stage U4 does not rerun or infer it.

## Initial Stage 7B goal (historical)

Create the project-local Codex Development Foundation as a verifiable, uncommitted exact 11-file diff without application, dependency, Git history, or PR mutation.

## Base SHA

```text
ab8e3bea12f1bcfc5e527f101ff77b25ebfe51c0
```

## Initial Stage 7B branch state (historical)

```text
codex/pr-dev-tools-01-codex-foundation
```

At the initial Stage 7B preflight, the branch had no upstream and `HEAD`, `origin/main`, and merge-base matched the base SHA. This is not the current Stage U4 branch state; the current upstream and HEAD are recorded above.

## Initial Stage 7B allowed files (historical)

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

## Initial Stage 7B out of scope (historical)

- Application code, recipes, methods, Timer, History, Settings, storage, PWA, source/provenance data, POINT/TIPS, and GitHub workflow files.
- Dependencies, package metadata, build artifacts, branch operations, staging, commit, push, PR mutation, merge, release, Hook trust bypass, approval bypass, and user-level configuration mutation.
- Actual Custom Agent task execution, browser QA, mobile QA, and physical-device QA for that initial static stage.

## Initial Stage 7B source validation (historical)

Status: PASS.

- Installed version: `codex-cli 0.141.0`.
- Authority: source-map entries pinned to `rust-v0.141.0`; `main` and `latest` were not used.
- Confirmed from pinned source: config schema, config-layer participation, `.codex/agents` role discovery, role-file `name`/`description` plus supported `developer_instructions`, `.agents/skills` repository discovery, `prefix_rule` syntax and decisions, `codex execpolicy check`, and user/project AGENTS concatenation.
- No unsupported key, per-agent model override, per-agent sandbox override, or invented validator/list command was added.

## Initial Stage 7B static checks (historical)

Status: PASS.

- Exact status set: 11 expected paths, 11 actual paths, no missing or unexpected path.
- Custom Agent TOML: standard `tomllib` parse passed; each file contains only `name`, `description`, and `developer_instructions`; filename and role name match; all required strings are non-empty; no duplicate role exists.
- Skill frontmatter: all three `skill-creator` validators passed; names match directories and descriptions contain routing triggers.
- Encoding: all 10 new files are UTF-8 without BOM, LF-only, and end with a newline.
- Markdown: heading hierarchy and code-fence counts passed; relative links resolve; no unfinished-work marker, raw-secret assignment, or personal absolute path was found.
- `AGENTS.md`: UTF-8 without BOM, CRLF-only, trailing newline present, and the original 6506-byte prefix SHA-256 matches the pre-change snapshot.
- `git diff --check`: PASS after the final QA update.

## Initial Stage 7B agent parse and discovery (historical)

Status: PASS for parse and source-backed fresh-process discovery.

Discovered role files and names: `specification`, `implementation`, `verifier`, `regression`.

- Pinned v0.141.0 loader evidence confirms recursive `.toml` discovery under the project config folder's `agents` directory and rejects malformed or duplicate roles.
- A fresh `pouro-audit` `codex debug prompt-input` process exited 0 and reported no malformed-agent, parse, unknown-field, or configuration warning.
- The diagnostic does not render tool schemas, so role descriptions do not appear in its prompt JSON. Discovery evidence therefore combines the fresh warning-free loader startup with the pinned loader path and exact four-file TOML/name validation; no unsupported role-list command was invented.
- `--strict-config` is not supported by `codex debug` in v0.141.0, and `--profile` is not supported by `codex app-server`; those rejected combinations were not treated as validation passes.

At Stage 7B, actual agent task execution was `NOT RUN` and deferred to Stage 8. Agent spawn count was `0`. Later role-runtime evidence is recorded in the cumulative chronology and must not be confused with this historical static result.

## Initial Stage 7B Skill validation and discovery (historical)

Status: PASS.

Fresh-process discovered Skills: `pouro-pr-orchestration`, `pouro-protected-scope-guard`, `pouro-pr-handoff`.

`skill-creator` initialization was not used because it would create `agents/openai.yaml` outside the exact allowed file set. Its `quick_validate.py` validator is used with UTF-8 mode and bytecode writes disabled.

The fresh `pouro-audit` prompt diagnostic contained all three project Skill names and both user-level and repository AGENTS content. It performed no agent task and no workspace mutation.

## Initial Stage 7B Rule parse and fixture results (historical)

Status: PASS.

- Standalone project Rule parse: PASS.
- Combined parse with user `default.rules` and `safe-development.rules`: PASS.
- Allow fixtures: `npm run build`, `npm.cmd run build` → `allow`.
- Prompt fixtures: dependency install/uninstall/update, `npm audit fix`, `npm audit fix --force`, deploy, publish, workflow dispatch, and release create/edit/delete → `prompt`.
- Overblocking fixtures with project Rule alone: `npm ci`, `gh pr view 123`, `git status --short --branch` → no matching project decision.
- Combined overblocking fixtures: `npm ci` → no decision; `gh pr view 123` and `git status --short --branch` → user-level `allow`; none were forbidden.

Fixtures are matcher inputs only and are never executed.

Commands routed through unenumerated shell wrappers, aliases, or unsupported executable-resolution forms are `UNREPRESENTABLE` by the requested exact prefix policy without unsafe approximation. They remain governed by user-level Rules, Hook, sandbox, approvals, and explicit task authority.

## Initial Stage 7B AGENTS.md preservation (historical)

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

## Initial Stage 7B user-level foundation invariants (historical)

Before-write metadata snapshot: PASS — 9 specified files recorded by path, size, SHA-256, and UTC timestamp without reading secrets or file contents.

After-write comparison: PASS — all 9 paths, sizes, SHA-256 values, and UTC timestamps are identical.

## Initial Stage 7B user-level Skills invariants (historical)

Before-write metadata snapshot: PASS — 6 files under the Stage 5 user Skill root recorded by relative path, size, SHA-256, and UTC timestamp.

After-write comparison: PASS — file count, relative paths, sizes, SHA-256 values, and UTC timestamps are identical.

## Initial Stage 7B repository invariants (historical)

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

## Initial Stage 7B PR #78 and PR #106 invariants (historical)

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

## Initial Stage 7B NOT RUN (historical)

```yaml
npm_run_build: NOT RUN — deferred to Stage 9 to preserve the exact 11-file write scope and avoid build artifacts
browser_qa: NOT RUN — no application UI change
mobile_qa: NOT RUN — no application UI change
physical_device_qa: NOT RUN
assistive_technology_qa: NOT RUN
actual_agent_task_execution: NOT RUN — deferred from Stage 7B to Stage 8
```

## Current NOT RUN and Human Gates

```yaml
browser_qa: NOT RUN — no application UI change
mobile_qa_375x667: NOT RUN — no application UI change
mobile_qa_390x844: NOT RUN — no application UI change
physical_device_qa: NOT RUN
assistive_technology_qa: NOT RUN
workspace_write_application_pilot: NOT RUN
subjective_acceptance: NOT RUN
rollback: NOT RUN — no rollback was authorized or required during Stage U4 authoring
```

All human UI, physical-device, assistive-technology, and subjective acceptance checks remain `NOT RUN`. No automated evidence clears a Human Gate.

## Current known limitations

- The explicit-`agent_type` runtime proved the four tested role markers but did not confirm the effective child sandbox, effective model/reasoning, Hook trust UI, or a workspace-write application pilot.
- Project-local files do not install or trust user-level Hooks or profiles.
- Prefix Rules cannot safely classify every wrapper, alias, or semantically equivalent command.
- Stage U4 performs no application build or runtime QA; the Stage 9 build is historical evidence only.

## Historical Stage 8 handoff

The original handoff required Stage 8 to begin only after exact change-set, parse, validator, fresh-process discovery, Rules fixtures, encoding, user-level invariants, repository invariants, and frozen-PR invariants passed. Stage 8 was required to keep Custom Agent execution independent and read-only where specified and not treat static results as behavioral proof. Stage 8 has since run with the historical result recorded above; this paragraph is not a current next-step instruction.
