---
name: pouro-protected-scope-guard
description: Assess whether a proposed or current NS-del346/Pouro-GPT change touches protected recipe, method, Timer, History, Settings, storage, PWA, provenance, or POINT/TIPS behavior. Use before mutation or during audit whenever those areas may be affected.
---

# Pourō Protected Scope Guard

## Trigger

Use when a proposed or current change may affect recipe data, method schedules, Timer, History, Settings, storage, PWA, source/legal/provenance, or POINT/TIPS.

## Non-trigger

Do not use for an unrelated documentation-only change with direct evidence that no protected area is touched, a general question without a change proposal, release execution alone, or another repository.

## Required inputs

- Repository identity, current branch, HEAD, worktree status, and the exact proposed or current diff.
- Goal, allowed paths, explicit non-goals, and current user authorization.
- Applicable [repository AGENTS.md](../../../AGENTS.md) sections and product source-of-truth documents.

## Allowed tools

- Read-only file, search, Git, history, and approved PR inspection tools.
- Read-only runtime inspection when needed to establish current protected behavior.

## Forbidden tools

- File mutation, staging, commits, pushes, branch or PR mutation, merge, release, destructive Git, secret access, and Hook or approval bypass.
- Implementing a fix or expanding scope while performing this guard.

## Workflow

1. Verify repository identity and current state.
2. Read the applicable protected-behavior and forbidden-change sections in repository AGENTS.md; treat them as the controlling protected-scope inventory.
3. Trace the proposed or actual change to affected data, types, calculations, navigation, persistence, UI, build, service worker, manifest, and provenance paths.
4. Record direct evidence for each affected protected area and compare it with explicit user authorization.
5. Return `CLEAR` only when direct evidence shows the change is either outside protected scope or explicitly authorized. Return `NEEDS_EXPLICIT_SCOPE` when a protected change is plausible but not authorized. Return `BLOCKED` for a demonstrated violation or unresolved conflict.

## Stop conditions

Stop and return a non-clear status when repository identity, target diff, protected behavior, authority, source-of-truth precedence, or secret safety cannot be established; when unexpected worktree changes exist; or when safe evaluation would require mutation.

## Output contract

```yaml
status: CLEAR | BLOCKED | NEEDS_EXPLICIT_SCOPE
affected_protected_areas:
direct_evidence:
allowed_scope:
violations:
required_authorization:
safe_next_action:
```

## Validator

Confirm every protected-area conclusion cites direct repository evidence, repository AGENTS.md remains the inventory source, authorization is explicit rather than inferred, no protected change is labeled `CLEAR` solely from a self-report, unknowns are not passed, and the guard performed no mutation.

## Positive fixture

Prompt: `BrewTimerPageの累計目標表示を変更する前にprotected scopeを判定してください。`

Expected: trigger this Skill, inspect Timer protections, and return `NEEDS_EXPLICIT_SCOPE` unless the change is expressly authorized.

## Negative fixture

Prompt: `このrepositoryのREADMEの見出しを要約してください。`

Expected: do not trigger this Skill when no protected behavior can be affected.
