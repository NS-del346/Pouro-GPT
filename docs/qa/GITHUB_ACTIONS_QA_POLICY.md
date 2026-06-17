# GitHub Actions QA Policy

## Purpose

This document defines the minimum GitHub Actions and PR guardrail policy for Pourō-GPT.

The goal is to make implementation PRs safer by running build checks and detecting protected file changes before merge.

---

## Required checks

All implementation PRs should pass:

- CI / Build
- PR Guard / Protected files check

Docs-only PRs may still use these checks when GitHub Actions is available, but docs-only status must also be verified through changed files review.

---

## Protected files

The following files and paths must not be changed unless the PR explicitly targets them:

- `package.json`
- `package-lock.json`
- `vite.config.*`
- `public/*`
- `src/service-worker.ts`
- `src/sw.ts`

A PR touching these areas should be split into a dedicated PR with explicit scope and review.

---

## Required manual QA for implementation PRs

Implementation PRs should record:

- 375x667 viewport
- 390x844 viewport
- Brew Home -> Recipe Setup -> Timer -> Finish -> Save -> History Detail
- History Detail -> Rebrew -> Recipe Setup
- Settings CSV export app-side status
- Settings JSON backup app-side status
- Source/legal wording check

---

## Docs-only PRs

Docs-only PRs should not change:

- `src/*`
- `public/*`
- `package.json`
- `package-lock.json`
- service worker files
- Vite config
- release metadata

---

## Branch protection rollout

Recommended rollout:

1. Add workflows and PR template.
2. Confirm checks run on a test PR or on push to `main` after merge.
3. Enable branch protection for `main`.
4. Require the `Build` and `Protected files check` checks once they are visible in GitHub branch protection settings.
5. Keep required approvals optional for solo development unless a second reviewer is available.

---

## Notes

This policy does not replace manual QA. GitHub Actions only catches build failures and protected file changes. It does not verify visual quality, iPhone PWA behavior, recipe truth, source/legal wording, or public GitHub Pages deployment.
