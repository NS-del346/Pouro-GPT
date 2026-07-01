# PR-AB-00: Test and Feature-Flag Foundation QA

## Gate

- Gate: `POURO-GPT-ACTIVE-BREW-TEST-FEATURE-FLAG-FOUNDATION-HG-018`
- Base SHA: `34ce3a04139614c8d09de2eeea4a0a68431a2fab`
- Branch: `codex/pr-ab-00-test-feature-flag-foundation`
- Result: **PASS_WITH_E2E_NOT_RUN**

## Scope

This PR adds development-only test infrastructure and a compile-time,
default-off Active Brew feature flag. It does not integrate or render the new
Active Brew surface.

## Dependencies added

Dev dependencies only:

- `vitest` 3.2.4
- `@testing-library/react` 16.3.0
- `@testing-library/jest-dom` 6.6.3
- `jsdom` 26.1.0
- `@playwright/test` 1.52.0

Production dependencies are unchanged.

## Scripts added

- `npm run test`
- `npm run test:watch`
- `npm run test:e2e`

Existing `dev`, `build` and `preview` semantics are unchanged.

## Feature flag

`ACTIVE_BREW_REFERENCE_ENABLED` is a compile-time constant and remains
strictly `false`. No production component imports it in this PR.

## Command results

| Check | Result |
| --- | --- |
| `npm run build` | PASS |
| `npm run test` | PASS |
| Playwright Chromium availability | NOT_RUN_BROWSER_DISCOVERY_SKIPPED_AFTER_ENVIRONMENT_HANG |
| `npm run test:e2e` | NOT_RUN_BROWSER_UNAVAILABLE |
| `git diff --check` | PASS |

## E2E smoke contract

When Chromium is available, the smoke test verifies:

- `/Pouro-GPT/` loads;
- title is `Pourō`;
- the root contains rendered application content;
- the current Home tagline is visible;
- 375×667 has no horizontal document/body overflow;
- no uncaught page error occurs.

## Protected scope

Confirmed unchanged:

- Timer UI and calculations;
- recipe and method data;
- Timer/domain types;
- Finish navigation and History-save boundary;
- routes and App state;
- storage repositories and keys;
- POINT/TIPS;
- manifest, Service Worker, icons and GitHub Pages base;
- production dependencies.

## Dependency security boundary

The install reported unresolved npm audit findings. Neither `npm audit fix`
nor `npm audit fix --force` was run. Remediation requires a separate
dependency-security review and is not treated as PASS in this PR.

## NOT_RUN

- dependency-vulnerability remediation: NOT_RUN / separate review required;
- physical-device QA: NOT_RUN;
- VoiceOver/TalkBack: NOT_RUN;
- Active Brew UI integration: NOT_RUN / not authorized;
- PR-AB-01 and later: NOT_RUN / not authorized;
- merge: NOT_RUN / not authorized;
- release and deploy: NOT_RUN / not authorized.

## Rollback

Revert PR-AB-00. No user-data or schema rollback is required.
