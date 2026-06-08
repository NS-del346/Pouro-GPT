\# PR-008D: Post-merge QA / Release Candidate Check



\## Scope



Post-merge QA after PR-008C: iPhone UI Polish and QA.



This QA pass verifies the merged main branch after PR-008C.

No new features, recipe values, method data, timer logic, storage schema, Service Worker, manifest, or icon changes are included.



\## Environment



\- Branch: qa/post-merge-release-candidate

\- Base: main

\- Build command: npm.cmd run build

\- Dev command: npm.cmd run dev

\- Local URL: http://localhost:5173/Pouro-GPT/

\- Viewport: 375 x 667, iPhone SE equivalent



\## Result Summary



\- Build: passed

\- Dev server: passed

\- Brew Home: passed

\- Recipe Setup: fix recommended

\- Brew Timer: fix recommended

\- Brew Finish: passed

\- History: passed

\- History Detail: passed

\- Settings: passed

\- Bottom Tab / CTA spacing: generally passed

\- Horizontal overflow: none observed



\## Screen QA



\### Brew Home



Passed.



\- Wordmark is centered and acceptable.

\- Method cards do not overflow horizontally.

\- Selected method card is readable.

\- CTA and Bottom Tab do not overlap.

\- Bottom Tab remains tappable.



\### Recipe Setup



Fix recommended.



Observed at 375 x 667 viewport:



\- No horizontal overflow.

\- CTA and Bottom Tab do not overlap.

\- Inputs remain usable.

\- However, vertical scroll is too long for iPhone SE.

\- User must scroll through many full cards before starting brew.

\- Sticky CTA works, but it can visually cover lower content while scrolling.



Follow-up recommendation:



\- Create a focused PR for compact Recipe Setup layout.

\- Do not add new features.

\- Do not change recipe values, method data, timer logic, or storage schema.



\### Brew Timer



Fix recommended.



Observed at 375 x 667 viewport:



\- Route scroll reset works; Timer top is not clipped after entering from Recipe Setup.

\- Timer display is readable.

\- Control buttons do not overlap and remain tappable.

\- Bottom Tab is hidden on Timer, as expected.

\- However, cumulative target card displays placeholder "--gまで注ぐ" as a very large primary value.

\- This is visually misleading and reduces active brew readability.



Follow-up recommendation:



\- Do not solve by adding or confirming recipe values.

\- Adjust fallback display only when pour target values are unavailable.

\- Keep sourceStatus / verificationLevel / valuesArePlaceholder semantics unchanged.

\- Do not change method data or timer logic.



\### Brew Finish



Passed.



\- No horizontal overflow.

\- Save CTA is visible and tappable.

\- Secondary return CTA is visible.

\- Taste tags, rating buttons, and memo fields remain usable.

\- No Bottom Tab overlap.

\- Vertical scroll exists but is acceptable for a post-brew note form.



\### History



Passed.



\- Saved record card is displayed.

\- No horizontal overflow.

\- Bottom Tab does not overlap the card.

\- Active tab display is correct.

\- Information density is acceptable.



\### History Detail



Passed.



\- Saved brew navigates to History Detail correctly.

\- No horizontal overflow.

\- Summary, setup conditions, and brew note sections are readable.

\- Rebrew CTA is visible and tappable.

\- Rebrew CTA does not overlap Bottom Tab.

\- Bottom Tab remains usable.

\- Vertical scroll exists but is acceptable for a detail screen.



\### Settings



Passed.



\- No horizontal overflow.

\- Settings cards remain readable.

\- Notification, vibration, theme, temperature guide, data management, and legal entry sections are usable.

\- Bottom Tab does not overlap the content.



\## Follow-up PR Candidates



\### PR-008E: Timer Placeholder Display Polish



Priority: high.



Goal:

\- Prevent unavailable pour target placeholders from becoming the dominant active brew value.



Constraints:

\- Do not add recipe values.

\- Do not change method data.

\- Do not change timer logic.

\- Do not change localStorage schema.

\- Do not change Service Worker, manifest, or icons.



\### PR-008F: Compact Recipe Setup for iPhone SE



Priority: medium.



Goal:

\- Reduce vertical scroll on Recipe Setup at 375 x 667.



Constraints:

\- Do not add new settings.

\- Do not remove existing required controls.

\- Do not change recipe values or method data.

\- Do not change timer logic.

\- Do not change storage schema.



\## Final QA Decision



PR-008C is merged and generally stable.



Release-candidate QA found no blocking issue, no horizontal overflow, and no critical navigation failure.



Two follow-up UX improvements are recommended:



1\. Timer placeholder display polish.

2\. Compact Recipe Setup layout for iPhone SE.

