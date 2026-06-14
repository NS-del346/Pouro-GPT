# AGENTS.md｜Pouro-GPT Codex Workflow Guardrails

## Project identity

This repository is:

```text
NS-del346/Pouro-GPT
```

Target app:

```text
Pourō / Pouro-GPT
```

Do not confuse this repository with:

```text
NS-del346/Pouro-Fable5
NS-del346/Pouro-Claude
```

Unless the user explicitly says otherwise, all Codex work in this repository must target `NS-del346/Pouro-GPT`.

---

## Product positioning

Pouro-GPT is a brewing execution tool.

It is not:

```text
recipe search app
coffee SNS
Beanconqueror clone
Filtru clone
Brewfather clone
data-analysis app
coffee community platform
```

Primary product question:

```text
Does this make brewing easier than a YouTube video, screenshot, paper memo, mental calculation, or phone timer?
```

Prefer small, bounded implementation that reduces brewing friction.

---

## Technical stack

Current stack:

```text
React
TypeScript
Vite
BrowserRouter
GitHub Pages
PWA
```

Important constraints:

```text
Vite base path: /Pouro-GPT/
Target device: iPhone / mobile browser
Main QA width: 375px
Bottom tabs: Brew / History / Settings
Timer page hides bottom tabs
```

---

## Standard workflow

Use one bounded PR per task.

Default workflow:

```text
1. Start from latest main.
2. Create a dedicated branch.
3. Keep the PR scope narrow.
4. Avoid unrelated refactors.
5. Run required checks.
6. Create a Draft PR.
7. Provide a complete self-report.
```

Default branch naming:

```text
codex/pr-<number-or-topic>-<short-slug>
```

Example:

```text
codex/pr-017a-add-agents-workflow-guardrails
```

---

## Required checks

For implementation PRs, run:

```bash
npm run build
git diff --check
```

For docs-only PRs, run at minimum:

```bash
git diff --check
git status --short
```

If a command is not run, state that explicitly and explain why.

Do not claim browser QA passed unless it was actually performed.

---

## Required final self-report

Every Codex task must end with:

```text
1. PR number or PR URL
2. Branch name
3. Latest commit SHA
4. Changed files
5. Implementation summary
6. Commands run
7. Manual QA
8. Regression/safety notes
9. Known limitations
```

For docs-only PRs, clearly state that no app code was changed.

---

## Forbidden unless explicitly scoped

Do not introduce the following unless the user explicitly requests it in the current task:

```text
external UI framework
new dependency
account
cloud sync
analytics dashboard
SNS/community features
recipe sharing
Bluetooth scale
bean inventory
TDS tracking
water-quality tracking
advanced graphs
AI diagnosis
AR
app-wide redesign
full dark/cockpit redesign
```

---

## Protected app behavior

Do not change unless explicitly scoped:

```text
recipe data
method schedules
timer calculations
step progression
Finish navigation
History save behavior
History Detail replay behavior
Recipe Setup replay behavior
Settings behavior
Bottom tab behavior
localStorage key
saved session schema
BrewSetup shape
BrewSession shape
PWA manifest
service worker
GitHub Pages base path
```

---

## Source and legal safety

Pouro-GPT is non-official.

Do not imply:

```text
official endorsement
supervision
partnership
affiliation
complete reproduction
guaranteed original method accuracy
guaranteed brew result
```

Do not weaken or remove source/provenance-related fields unless explicitly scoped:

```text
sourceStatus
verificationLevel
valuesArePlaceholder
isPlaceholder
fieldEvidence
```

Compact UI must not expose raw source URLs, timecodes, raw transcripts, or source notes unless explicitly requested.

---

## POINT/TIPS constraints

POINT/TIPS data and display behavior are protected after PR-015A through PR-015G.

Do not change unless explicitly scoped:

```text
src/data/tips.ts
src/types/tips.ts
docs/research/coffee_app_tips_master_v2.json
POINT/TIPS selection logic
display caps
quarantine exclusion
source metadata suppression
```

Compact UI should display only safe short user-facing text.

---

## Timer constraints

Brew Timer hierarchy after PR-016A is protected.

Preserve:

```text
Target Total / 累計目標 as primary
This Pour / 今回の注湯 as secondary
elapsed time readable but supportive
POINT/TIPS subordinate
step instruction readable
next preview readable
controls accessible
```

Do not change timer calculations, method schedules, or step progression unless explicitly scoped.

THE NEO BREW / R-09 constraints:

```text
1:45 / 210g must remain unchanged
約3:30 is drawdown / finish target guidance, not a guaranteed exact completion time
arbitrary scaling is unsupported
```

---

## Rebrew constraints

After PR-016B, Brew Home may expose a Last Brew shortcut.

Preserve:

```text
Last Brew uses local history only
only latest history[0] appears on Brew Home
setupSnapshot is copied
createdAt may be refreshed for replay
user returns to Recipe Setup for confirmation
no direct Timer start
no storage schema change
```

History Detail replay behavior must remain compatible.

---

## Mobile QA expectations

When UI changes are made, check or explicitly mark as not run:

```text
375 x 667
390 x 844
no horizontal overflow
critical CTA reachable
tap targets usable
Timer controls reachable
```

Do not claim mobile QA passed unless checked.

---

## File hygiene

Do not commit:

```text
dist
temporary files
NOOP files
PULL_REQUEST_BODY_TMP files
debug logs
screenshots unless explicitly requested
local environment files
```

Do not leave placeholder files or accidental commits in the PR branch.

---

## PR documentation

For implementation PRs, add or update a QA document under:

```text
docs/qa/
```

Use a clear filename, for example:

```text
docs/qa/PR-017A-add-agents-workflow-guardrails.md
```

For docs-only operational PRs, a separate QA document is optional if `AGENTS.md` itself documents scope and checks.

---

## Recovery guidance

If Codex or the environment crashes, do not assume changes are saved.

Before stopping, report:

```text
git status --short --branch
git log -3 --oneline
current branch
whether changes are committed
whether branch is pushed
whether Draft PR exists
```

GitHub PR, branch, commit SHA, and QA documents are the source of truth.
