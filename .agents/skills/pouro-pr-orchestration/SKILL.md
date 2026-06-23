---
name: pouro-pr-orchestration
description: Orchestrate a bounded NS-del346/Pouro-GPT PR through specification, single-writer implementation, independent verification, regression review, and memory/handoff. Use for a new bounded PR or when adding a new bounded implementation cycle to an existing PR.
---

# Pourō PR Orchestration

## Trigger

Use for a new bounded Pourō-GPT PR or a new bounded implementation cycle on an existing PR.

## Non-trigger

Do not use for a simple question, a read-only PR audit alone, release execution alone, or another repository.

## Required inputs

- Repository identity, root, base, branch, HEAD, worktree state, and remote state when relevant.
- Goal, exact allowed paths, explicit out-of-scope items, source of truth, protected scope, required checks, and Human Gates.
- Existing PR number and expected head when continuing an existing PR.

## Allowed tools

- Read-only repository, Git, and approved remote-state inspection.
- One writer's file-editing and validation tools during the authorized implementation phase.
- Read-only verification and regression tools after implementation.
- Handoff or memory recording only when explicitly authorized.

## Forbidden tools

- Multiple or parallel writers.
- Destructive Git commands, force push, secret access, scope-external writes, Hook or approval bypass, and unauthorized branch, commit, push, PR, merge, or release mutation.
- Recursive agent spawning as a workflow requirement.

## Workflow

1. Design/Specification: establish Goal, Scope, Out of Scope, source hierarchy, rubric, protected areas, checks, Human Gates, and implementation handoff. Do not write implementation files.
2. Implementation: assign exactly one writer, recheck state, make only approved changes, inspect the diff, run required checks, and produce a factual self-report.
3. Independent Verification: use a read-only role independent from the writer to inspect the specification, rubric, changed files, diff, checks, and QA evidence directly.
4. Regression: use a read-only role to inspect protected behavior, prohibited changes, prior-PR compatibility, provenance, mobile, PWA, and storage risks as applicable.
5. Memory/Handoff: record current branch, HEAD, PR state, changes, non-changes, checks, NOT RUN items, Human Gates, findings, rollback, links, and the bounded next action. Update persistent memory only with explicit user authorization.

At every phase, apply [repository AGENTS.md](../../../AGENTS.md), stop on state drift, and preserve Human Gates. Do not auto-merge.

## Stop conditions

Stop before further mutation when identity, branch, HEAD, worktree, upstream, expected PR state, authority, scope, source-of-truth precedence, secret safety, validation, or writer exclusivity is uncertain or mismatched. Preserve the current diff and report the blocker.

## Output contract

```yaml
goal:
scope:
out_of_scope:
source_of_truth:
rubric:
implementation:
verification:
regression:
human_gates:
memory_handoff:
next_action:
```

Use `PASS`, `FAIL`, or `NOT RUN` per check and keep Human Gates separate from automated evidence.

## Validator

Confirm the repository is `NS-del346/Pouro-GPT`, all five phases appear in order, exactly one writer is identified, verifier and regression roles are read-only, the diff stays within allowed paths, every skipped check says `NOT RUN`, Human Gates remain unresolved without human evidence, and no merge or release action occurred without explicit authorization.

## Positive fixture

Prompt: `Pourō-GPTでRecipe Setupの1つの表示修正を新規bounded PRとして設計・実装・独立検証してください。`

Expected: trigger this Skill and execute the five-phase contract with one writer.

## Negative fixture

Prompt: `PR #123のdiffをread-onlyで要約してください。`

Expected: do not trigger this Skill; route to a read-only PR audit workflow.
