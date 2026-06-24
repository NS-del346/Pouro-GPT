# Codex Development Foundation

## Purpose

This foundation defines a repository-local, bounded development workflow for `NS-del346/Pouro-GPT`. It separates design, implementation, independent evidence review, regression review, and handoff so that scope, protected behavior, Human Gates, and external mutations remain explicit.

## Scope

The committed foundation consists of four Custom Agent role files, three project Skills, one project execution Rule file, a bounded addition to `AGENTS.md`, this development guide, and its QA record. It does not change application code, dependencies, recipes, Timer behavior, storage, PWA behavior, CI, deployment, or release state.

## Architecture

```text
User request and repository AGENTS.md
        |
        v
Design/Specification (read-only)
        |
        v
Implementation (exactly one writer)
        |
        +--> Independent Verification (read-only)
        |
        +--> Regression (read-only)
        |
        v
Memory/Handoff (state-accurate; persistent memory only when authorized)
```

Project-local Rules classify selected commands before execution. Hooks, approval review, and sandboxing are separate controls; no single layer replaces another.

## User-level and project-local separation

User-level profiles, Rules, Hooks, and Skills are not committed to this repository. A clone contains only project-local artifacts. It must not assume the presence or behavior of `pouro-build`, `pouro-audit`, `pouro-full`, user Rules, a user Hook, or user Skills.

The project-local files are portable repository guidance. Each user remains responsible for local profile selection, Hook installation and trust, approval routing, sandbox capabilities, credentials, and machine-specific paths. Cloning the repository does not install or trust a user Hook.

## Profile roles

The local environment may provide profiles such as `pouro-build`, `pouro-audit`, and `pouro-full`, but these are optional user-level conveniences:

- A build profile may support the single writer.
- An audit profile should use read-only sandboxing and no mutation authority.
- A broader profile does not expand repository scope or override `AGENTS.md`.

Configured profile values and effective runtime values must be distinguished. Repository instructions remain valid when these profiles do not exist.

## Fable 5-style loop

1. Design/Specification defines the goal, exact scope, non-goals, source hierarchy, checkable rubric, protected scope, required checks, Human Gates, and implementation handoff.
2. Implementation uses exactly one writer, rechecks repository state, changes only authorized paths, validates the result, and reports direct evidence.
3. Independent Verification audits the implementation against the approved specification and rubric without writing or relying solely on the writer's report.
4. Regression audits protected behavior, prohibited changes, prior-PR compatibility, provenance, mobile, PWA, and storage risks as applicable.
5. Memory/Handoff records current state, changes, non-changes, checks, `NOT RUN`, Human Gates, findings, rollback, links, and one bounded next action. Persistent memory changes require explicit user authorization.

The loop does not auto-merge and does not require agents to spawn other agents recursively.

## Custom Agent roles

### specification

The read-only specification role turns an approved objective into checkable requirements. It stops instead of inventing missing facts or changing files, branches, or pull requests.

### implementation

The implementation role is the sole writer. It follows an approved specification, stays within exact paths, runs required checks, and produces a factual self-report. It cannot clear Human Gates or act as its own independent verifier.

### verifier

The verifier performs an implementation-independent, read-only audit of the specification, rubric, diff, checks, and QA evidence. Missing direct evidence is `NOT RUN`, not PASS.

### regression

The regression role audits protected behavior and compatibility risks independently and read-only. It does not fix findings or broaden the implementation scope.

Role files use the discovered role metadata (`name`, `description`) and the supported `developer_instructions` config key. Model, reasoning, sandbox, and approval overrides are intentionally not embedded; roles inherit the invoking session's supported effective configuration.

## Native role invocation contract

The current operational baseline is Codex CLI 0.142.0. Native project roles must be selected with an explicit `agent_type`; `task_name` identifies a task but does not select a role. Generic-agent fallback is prohibited because it cannot prove that the intended role instructions were applied. If `agent_type` is absent from the active spawn schema, stop before spawning and report the role execution `NOT RUN`.

In 0.142.0, `features.multi_agent_v2.hide_spawn_agent_metadata` defaults to `true`. A role-required session may set the supported session-only override to `false` so the spawn schema exposes role metadata. Use `pouro-build` for implementation and `pouro-audit` for specification, verifier, and regression. Do not make a persistent global configuration change by default, and do not apply the override to sessions that do not require native project roles.

The explicit `agent_type` runtime validation completed 4/4 roles with `PASS_WITH_NOTES`. It proves the tested role markers and bounded outputs under the recorded session configuration. It does not prove the effective child sandbox, model, reasoning level, Hook trust UI, or a workspace-write application pilot; those remain `UNCONFIRMED` or `NOT RUN` as recorded in QA.

Historical limitation: Stage 8 on Codex CLI 0.141.0 was `NOT_PASS` because the normal runtime spawn surface lacked an explicit role selector. That result remains historical evidence and is not rewritten as a 0.142.0 pass.

## Project Skill routing

- `pouro-pr-orchestration` applies to new bounded PR work and new bounded cycles in an existing PR. It coordinates the five phases and enforces one writer.
- `pouro-protected-scope-guard` applies when recipe, method, Timer, History, Settings, storage, PWA, provenance, or POINT/TIPS may be affected. Repository `AGENTS.md` is its protected-scope inventory.
- `pouro-pr-handoff` applies at a PR-stage boundary, chat transfer, interruption, or requested audit handoff. It records current evidence and required model guidance without executing the next action.

A simple question, read-only audit alone, release-only operation, or another repository must not be routed through the full PR orchestration Skill.

## Rules responsibility

`.codex/rules/pouro-project.rules` allows the normal build command and prompts for application dependency mutation, deployment, workflow dispatch, package publication, and GitHub release mutation. It intentionally does not duplicate user-level destructive-Git or secret protections.

Rules classify token prefixes; they do not prove that a command is safe, authorized, or inside task scope. The strictest matching decision wins when multiple files are evaluated. A prompt decision still requires a human judgment and does not grant permission by itself.

## Hook responsibility

A Hook may inspect a proposed tool call and stop it before execution. Hooks are user-local, are not committed here, and may be absent after clone. Hook installation, enabled state, source review, and persisted trust must be verified by each user. Hook bypass is not part of this workflow.

## Approval reviewer responsibility

An approval reviewer evaluates a requested escalation; it does not expand the active task, replace repository instructions, or authorize an external mutation that the user did not request. Auto-review is a routing mechanism, not automatic task authorization.

## Sandbox responsibility

The sandbox limits filesystem and network capabilities. The writer should use the narrowest mode compatible with the approved change; verifier and regression work should remain read-only. Sandbox access does not override exact file scope, secret safety, one-writer rules, or protected behavior.

## Human Gate

Human Gates include subjective UI acceptance, physical-device testing, VoiceOver or other assistive-technology review, and any check explicitly assigned to a person. Automated DOM inspection, screenshots, builds, or static checks are separate evidence. A Human Gate remains `NOT RUN` until the responsible human provides direct evidence.

## Security boundaries

- Never read or print authentication files, tokens, credentials, secret stores, private headers, or unrelated sensitive configuration.
- Do not weaken repository protections, bypass Hook trust or approvals, use destructive Git, force push, or perform opportunistic cleanup.
- External mutations such as workflow dispatch, deployment, release publication, Ready, merge, close, or auto-merge require explicit authorization for that exact action.
- Stop on identity, state, scope, authority, source-of-truth, secret-safety, or validation failure.

## Trust and portability

Project-local discovery is based on the repository root and committed paths, but effective loading also depends on the installed Codex version and the user's configuration layer stack. Trust in a repository does not imply trust in a user Hook, and trust on one machine is not portable to another.

The foundation remains useful without user-level automation because its roles, Skills, Rules, and `AGENTS.md` define safe boundaries directly. User-local controls add defense in depth.

## Setup and discovery validation

For the current Codex CLI 0.142.0 baseline:

1. Confirm `codex --version` reports `0.142.0` before using the pinned sources below.
2. Verify repository root, branch, HEAD, worktree, upstream, intended remote, exact scope, and writer exclusivity.
3. Start a fresh process from the repository root with strict configuration parsing and the appropriate user-local profile.
4. For a role-required session only, set `features.multi_agent_v2.hide_spawn_agent_metadata=false` as a session override and confirm that the active spawn schema exposes `agent_type` before spawning.
5. Pass the exact role name through `agent_type`; use `task_name` only as the task identifier. Stop and report `NOT RUN` if the role selector is absent or the requested role is unavailable. Do not fall back to a generic agent.
6. Confirm the process loads repository `AGENTS.md` after user instructions, discovers the four `.codex/agents/*.toml` roles, discovers the three `.agents/skills/*/SKILL.md` Skills, and reports no startup parse warning.
7. Run `codex execpolicy check` with the project Rule alone and then together with the intended user Rule files. Supply fixture tokens only; do not execute fixture commands.

Do not invent an agent or Skill list command. If the installed CLI exposes no authoritative list surface, use only supported diagnostics and record the limitation. A clone does not contain or install a user profile, Hook, approval-reviewer configuration, user Rule, user Skill, trusted Hook state, or machine-specific writable path.

## Standard PR flow

1. Verify identity and capture preflight state.
2. Freeze goal, exact paths, non-goals, sources, rubric, protected scope, checks, and Human Gates.
3. Create or reuse only the authorized branch and PR state.
4. Run the specification phase read-only.
5. Let exactly one implementation writer make the bounded change.
6. Inspect the exact diff and run proportional checks.
7. Run independent verification and regression read-only.
8. Resolve findings in a newly authorized writer cycle if needed.
9. Produce handoff and memory evidence; do not merge automatically.

## Controlled application pilot checklist

The first workspace-write application pilot remains `NOT RUN`. When separately authorized, it must verify all of the following without weakening the repository contract:

- The main implementation session uses workspace-write only for the exact approved repository paths.
- The implementation role is the sole writer; specification, verifier, and regression remain read-only and perform no fixes.
- The approved specification, exact file scope, explicit non-goals, protected scope, and source-of-truth order are frozen before mutation.
- Hook, Rules, and Skills routing are observed separately and are not treated as interchangeable controls.
- The application build and all proportional static or runtime checks required by the specification are run; every omitted check is labeled `NOT RUN`.
- Human Gates remain separate from automated evidence and require direct human confirmation.
- Commit, push, branch, PR, Ready, merge, close, auto-merge, deployment, and release mutations require explicit authorization for the exact action.

## Failure and recovery

On failure, stop mutation and preserve current evidence. Record branch, HEAD, staged and unstaged files, upstream, latest commits, remote branch, PR state, commands, outputs, and the failing condition. Do not use `reset --hard`, `clean`, broad restore, force push, or unrequested rollback. Resume only after the blocker and authority are clear.

## Maintenance after a Codex upgrade

1. Record the new installed version.
2. Replace the pinned source map with sources from that exact release tag before making schema or discovery claims.
3. Revalidate agent role schema and discovery paths, Skill roots and precedence, Rule syntax and CLI behavior, AGENTS hierarchy, Hook discovery and trust behavior, profile/config schema, and strict parsing.
4. Re-run standalone and combined Rule fixtures.
5. Re-run fresh-process discovery without executing mutation-capable agent tasks.
6. Update this guide and QA evidence only for verified changes.

## Pinned v0.142.0 source map

The current operational schema gate uses only `rust-v0.142.0` sources. Stage 8's `rust-v0.141.0` evidence remains historical in the QA chronology.

- [Config schema](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/config.schema.json)
- [Config layering](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/config/src/loader/README.md)
- [Agent role discovery](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/config/agent_roles.rs)
- [`apply_role_to_config`](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/config/mod.rs)
- [`spawn_agent` schema](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/tools/spec.rs)
- [Tool registration](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/tools/spec.rs)
- [`multi_agent_v2` feature configuration](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/features.rs)
- [v1/v2 multi-agent session selection](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/tools/handlers/multi_agents.rs)
- [Skill loader](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core-skills/src/loader.rs)
- [Exec policy Rules](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/execpolicy/README.md)
- [AGENTS.md hierarchy](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/agents_md.rs)
- [Hook discovery](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/hooks/src/engine/discovery.rs)
- [Hook runtime](https://github.com/openai/codex/blob/rust-v0.142.0/codex-rs/core/src/hook_runtime.rs)

Do not substitute `main`, `latest`, or an unpinned documentation URL as version evidence.

## Known limitations

- The 0.142.0 explicit-`agent_type` runtime validated all four role markers, but the effective child sandbox remains `UNCONFIRMED` and the workspace-write application pilot remains `NOT RUN`.
- Prefix Rules cannot safely represent every shell wrapper, alias, absolute executable path, or semantically equivalent command. Unrepresented forms fall back to other policy layers and human governance.
- A prompted dry-run can still be harmless in effect, but prefix policy intentionally classifies the publication family rather than inferring runtime intent.
- Project-local files cannot install, enable, or trust user Hooks; configure approval routing; or guarantee a sandbox mode.
- Human Gates cannot be automated or inferred.
- No automatic merge, release, or deployment is provided.
