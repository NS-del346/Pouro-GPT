# Pourō-GPT v2.0.0 Final Handoff

## 1. Current status

Pourō-GPT v2.0.0 is prepared as a release candidate.

Current judgment:

```text
PASS_WITH_NOTES
```

The release is not complete until PR-V2-13 is merged, `main` is verified, an
annotated `v2.0.0` tag is created, and a GitHub Release is published.

## 2. Last merged PR

Last merged Ver2.0 source PR in this handoff set:

- PR #88 / PR-V2-12: Final Ver2.0 QA Release Candidate

PR-V2-12 was QA-document-only and recorded the final RC evidence after
PR-V2-04 through PR-V2-11.

## 3. Ver2.0 implemented scope

Implemented or documented for v2.0.0:

- Ver2.0 planning docs and research consolidation
- Light Precision Cockpit + Amber Accent visual direction
- Four-tab bottom navigation: `抽出 / ツール / 履歴 / 設定`
- Time-first Brew Timer cockpit
- Recipe Setup 4:6 3x3 combination UI foundation
- Click Converter foundation under Tools
- Brew Result feedback cockpit
- History List brew-log dashboard
- History Detail saved-brew record view
- Settings / Data Trust Center
- Final Ver2.0 release-candidate QA record
- Release notes, handoff, and PR-V2-13 QA documentation

## 4. Runtime behavior preserved

PR-V2-13 is docs-only. It does not change runtime app behavior.

The Ver2.0 implementation sequence preserves these protected behaviors:

- recipe data boundaries
- method schedules
- timer calculations and step progression
- Finish navigation
- History save behavior
- History Detail Rebrew behavior
- Recipe Setup replay behavior
- Settings export behavior
- bottom-tab hiding on Timer / Finish
- `localStorage` key
- saved session schema
- CSV export format
- JSON backup format
- PWA manifest
- service worker
- GitHub Pages base path
- release metadata

## 5. Known limitations

- Physical iPhone QA was not run.
- PWA install/offline QA was not run.
- Public GitHub Pages QA after release was not yet run.
- Click Converter is a foundation only and does not produce real conversion values.
- Click Converter does not convert particle size and is not manufacturer-approved.
- Full 4:6 9-combination source verification is not complete.
- Only the existing `R-01 / 基本形` center mapping is enabled in the 3x3 matrix.
- JSON import/restore is not implemented.
- History edit/delete design is not implemented.
- Data remains local browser storage and can be lost.

## 6. Release candidate judgment

PR-V2-12 judgment:

```text
PASS_WITH_NOTES
```

No blocking defect was found in the local release-candidate QA pass. The notes
remain important because public GitHub Pages, physical iPhone, and PWA
install/offline checks still need external or post-release verification.

## 7. Remaining manual release steps

1. Verify `main` is up to date after PR-V2-13 merge.
2. Create annotated tag `v2.0.0` from `main`.
3. Create GitHub Release titled `Pourō-GPT v2.0.0`.
4. Paste or summarize `docs/releases/v2.0.0.md` into GitHub Release notes.
5. Confirm release is non-draft, non-prerelease, latest.
6. Verify GitHub Pages public URL after deployment.
7. Run smoke QA on public URL.

## 8. Post-release QA checklist

Public URL:

```text
https://ns-del346.github.io/Pouro-GPT/
```

- [ ] Public app shell loads under `/Pouro-GPT/`.
- [ ] Bottom navigation shows `抽出 / ツール / 履歴 / 設定`.
- [ ] Brew Home -> Recipe Setup -> Timer -> Finish -> Save -> History Detail works.
- [ ] History Detail -> Rebrew returns to Recipe Setup and does not start Timer directly.
- [ ] Tools / Click Converter remains foundation-only with disabled controls.
- [ ] Settings CSV export downloads a spreadsheet-friendly file.
- [ ] Settings JSON backup downloads a detailed backup payload.
- [ ] JSON import/restore is not exposed.
- [ ] 10 Pour retains `20g / 300g / 1:15`.
- [ ] 10 Pour retains `1:45 / 210g`.
- [ ] No horizontal overflow at `375x667`.
- [ ] No horizontal overflow at `390x844`.
- [ ] Physical iPhone smoke QA is recorded if available.
- [ ] PWA install/offline behavior is recorded if available.

## 9. Future PR candidates

These are not included in v2.0.0 and should not be treated as immediate
commitments:

- physical iPhone QA / PWA install QA
- public GitHub Pages post-release QA
- real grinder database research
- Click Converter verified data and formula
- 4:6 full 9-combination data confirmation
- JSON import/restore design
- history edit/delete design
- optional theme/dark-mode study
- recipe source refinement

## 10. Do-not-change guardrails

Do not change without a separately scoped PR:

- recipe data
- method schedules
- timer calculations
- step progression
- Finish navigation
- History save behavior
- History Detail replay behavior
- Recipe Setup replay behavior
- Settings behavior
- bottom tab behavior
- `localStorage` key
- saved session schema
- `BrewSetup` shape
- `BrewSession` shape
- PWA manifest
- service worker
- GitHub Pages base path
- source/provenance fields
- POINT/TIPS data or selection behavior
- Click Converter foundation status
- 10 Pour fixed constraints
- non-official legal posture
