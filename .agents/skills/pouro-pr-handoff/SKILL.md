---
name: pouro-pr-handoff
description: Produce a state-accurate NS-del346/Pouro-GPT PR or work-session handoff with changes, checks, Human Gates, rollback, links, and next-step model guidance. Use at PR-stage completion, chat transfer, work interruption, or after an audit when memory recording is requested.
---

# Pourō PR Handoff

## Trigger

Use at completion of a PR stage, transfer to a new chat, interruption of work, or after an audit when a handoff or memory record is requested.

## Non-trigger

Do not use for active implementation before a handoff is needed, a simple question, release execution alone, another repository, or persistent memory mutation without explicit user authorization.

## Required inputs

- Repository root, branch, HEAD, worktree and staged state, upstream, remote branch, and PR state when applicable.
- Exact diff, changed and unchanged scope, commands and outputs, QA evidence, findings, Human Gates, limitations, rollback information, and relevant links.
- The next bounded objective and its model/reasoning needs.

## Allowed tools

- Read-only Git, filesystem, validation-result, and approved remote-state inspection.
- Writing the explicitly authorized handoff artifact or memory update only within its exact allowed path.

## Forbidden tools

- Inferred or unauthorized memory writes, implementation changes, staging, commit, push, branch or PR mutation, merge, release, destructive Git, secret access, and Hook or approval bypass.
- Converting skipped, manual, or inferred QA into PASS.

## Workflow

1. Re-verify repository identity, branch, HEAD, worktree, staged files, upstream, and PR state.
2. Inspect the exact diff and evidence; do not rely only on an implementation or audit self-report.
3. Record what changed and what did not change, checks with exact outcomes, all `NOT RUN` items, Human Gates, findings, limitations, rollback information, next-PR cautions, recurrence-prevention rules, and links.
4. Recommend a concrete model and reasoning level for the next bounded task under both required Japanese labels.
5. State one safe next action. Do not execute it unless separately authorized.

## Stop conditions

Stop and report a blocker when repository identity, target revision, diff, PR state, check evidence, authorization, or secret safety is uncertain; when state changes during collection; or when a requested memory write is not explicitly authorized.

## Output contract

```yaml
repository:
branch:
head:
pull_request:
changed:
not_changed:
checks:
not_run:
human_gates:
findings:
limitations:
rollback:
next_pr_cautions:
recurrence_prevention_rules:
links:
推奨されるモデル:
最高の成果を期待する場合のモデル:
next_action:
```

## Validator

Confirm branch, HEAD, worktree, staged state, and PR data come from current direct evidence; changed files match the diff; every skipped check is `NOT RUN`; Human Gates are separate; rollback and links are present or explicitly unavailable; both model-guidance labels contain concrete model and reasoning choices; and no next action was executed implicitly.

## Positive fixture

Prompt: `このPourō-GPT PR stageを停止するので、新しいchat向けhandoffを作ってください。`

Expected: trigger this Skill and produce the complete state-verified contract without mutating Git or the PR.

## Negative fixture

Prompt: `Timer画面を実装してcommitしてください。`

Expected: do not use this Skill as the implementation workflow; a handoff may follow only after the authorized implementation stage.
