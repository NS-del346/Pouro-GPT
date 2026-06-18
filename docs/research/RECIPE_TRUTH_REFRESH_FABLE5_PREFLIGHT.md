# Recipe Truth Refresh from Pouro-Fable5 — Preflight

## Status

This is a docs-only preflight for the future runtime PR:

```text
Recipe Truth Refresh: Align recipes with Pouro-Fable5
```

Runtime implementation is intentionally deferred because the requested task changes recipe data, timer schedules, method guidance, QA docs, and potentially History/Rebrew compatibility. This preflight records the inspected source files, current Pouro-GPT recipe model, Fable5 source-of-truth values, expected mapping, scope boundaries, and recommended implementation plan.

---

## Target repository

```text
Repository: NS-del346/Pouro-GPT
Current base observed after PR-GH-01: ea892599ade9e0cc9ea693ba06d02a254e151cf7
Target future branch: pr-recipe-refresh-fable5-truth
Target future PR title: Recipe Truth Refresh: Align recipes with Pouro-Fable5
```

This preflight changes no runtime files.

---

## Source repositories inspected

### Target repo

```text
NS-del346/Pouro-GPT
```

Inspected files:

```text
src/data/placeholderMethods.ts
docs/qa/* search results touching recipe/timer/source
.github/workflows/ci.yml
.github/workflows/pr-guard.yml
.github/pull_request_template.md
docs/qa/GITHUB_ACTIONS_QA_POLICY.md
```

### Primary reference repo

```text
NS-del346/Pouro-Fable5
```

Inspected files:

```text
app.js
docs/design/PR-011R2_RECIPE_METHOD_DETAIL_INFORMATION_ARCHITECTURE.md
docs/design/PR-011R3C_METHOD_DETAIL_PLANNING.md
docs/design/PR-013A_TIMER_V2_SPEC.md
docs/design/PR-014A_MEMORY_HANDOFF.md
docs/design/PR-014B_MEMORY_HANDOFF.md
```

Primary runtime reference found:

```text
Pouro-Fable5 app.js
```

---

## Current Pouro-GPT recipe model findings

Primary current recipe source appears to be:

```text
src/data/placeholderMethods.ts
```

Important current structures:

```text
placeholderMethods: BrewMethod[]
brewVariants: BrewVariant[]
getVariantsByMethodId(methodId)
getVariantById(variantId)
getRecipeForSetup(method, setup)
getDefaultVariantForMethod(methodId)
```

Observed method IDs:

```text
four-six
hybrid
ten-pour
ice-brew
```

Observed variant IDs:

```text
R-01: 4:6 Method 基本形
R-02: 4:6 Method 甘み重視
R-03: 4:6 Method 酸味・明るさ重視
R-04: 4:6 Method 軽め 4投
R-05: 4:6 Method すっきり 3投
R-06: 世界大会系 placeholder
R-08: NEWハイブリッド / HARIO Switch
R-09: THE NEO BREW / 10投式
R-10: 急冷式アイス4:6 標準
```

Observed runtime gates:

```text
R-01 returns a fixed recipe only when coffee=20g, ratio=15, water=300g.
R-08 returns a fixed recipe only when coffee=20g, ratio=15, water=300g.
R-09 returns a fixed recipe only when coffee=20g, ratio=15, water=300g.
R-10 currently has recommendedHotWaterGrams / recommendedIceGrams but no observed runtime recipe gate.
```

---

## Current mismatch summary

### 4:6

Current Pouro-GPT R-01 appears to use a five-pour 60g × 5 candidate schedule for 20g / 300g:

```text
0:00 60g
0:45 60g
1:30 60g
2:15 60g
2:45 60g
3:30 finish / dripper removal guidance
```

Requested Fable5-aligned target for balanced + standard is:

```text
60 / 60 / 90 / 90
```

This is a runtime change and should not be merged without implementation QA.

### Hybrid

Current Pouro-GPT R-08 appears to use an older fixed example model:

```text
40-50g bloom / Close
Open to 120g
Open to 200g
300g / Close
Open / finish around 2:45–3:30
```

Requested Fable5-aligned runtime target is:

```text
0:00  第1投  Switch OPEN    h1 = round(totalWater * 3 / 14)
0:30  第2投  Switch OPEN    h2 = round(totalWater * 3 / 14), then close
1:15  第3投  Switch CLOSED  h3 = remainder
1:45  Switch OPEN / drawdown, no water
3:00 target
```

This is a runtime change and should not be mixed with UI redesign.

### 10 Pour / NEO

Current Pouro-GPT R-09 already contains the important fixed example:

```text
20g / 300g / 1:15
95-96°C guidance
very coarse / C40 40-45 clicks
10-pour schedule
1:45 / 210g milestone
2:30 / 300g
3:30 approximate completion/drawdown guidance
```

Future implementation should verify it has not regressed, but this area may need only copy/QA alignment rather than major runtime change.

### Ice Brew

Current Pouro-GPT R-10 variant contains:

```text
recommendedHotWaterGrams: 150
recommendedIceGrams: 80
recommendedCoffeeGrams: 20
```

But current `getRecipeForSetup` does not appear to return an Ice fixed recipe gate. A future implementation should add or align a runtime recipe so Timer cumulative target uses HOT water only.

Requested target:

```text
20g example:
HOT water = 150g
ICE = 80g
HOT pours = 30g × 5
Timer target total = 150g HOT only
0:00 / 0:30 / 1:00 / 1:30 / 2:00 / 3:00 chill-finish
```

---

## Fable5 source-of-truth values to preserve

### 4:6 Method

Runtime formula:

```text
totalWater = round(dose * ratio)
frontWater = round(totalWater * 0.4)
backWater = totalWater - frontWater
```

Flavor split:

```text
balanced:
p1 = round(frontWater / 2)
p2 = frontWater - p1

sweet:
p1 = round(frontWater * 5 / 12)
p2 = frontWater - p1

bright:
p1 = round(frontWater * 7 / 12)
p2 = frontWater - p1
```

Strength split:

```text
light:    backPourCount = 1
standard: backPourCount = 2
strong:   backPourCount = 3
```

Back pour distribution:

```text
perBack = round(backWater / backPourCount)
last back pour adjusts remainder
```

Timing:

```text
front:
0:00
0:45

back:
light:    1:30
standard: 1:30, 2:15
strong:   1:30, 2:15, 2:45

drawdown:
3:30 target / timeSec 210
```

20g / 300g examples:

```text
balanced + standard: 60 / 60 / 90 / 90
sweet + standard:    50 / 70 / 90 / 90
bright + standard:   70 / 50 / 90 / 90
balanced + light:    60 / 60 / 180
balanced + strong:   60 / 60 / 60 / 60 / 60
```

Important guardrail:

```text
standard / balanced must not regress to 48 / 72 or 72 / 48.
```

### Hybrid / HARIO Switch

Runtime formula:

```text
totalWater = round(dose * ratio)
h1 = round(totalWater * 3 / 14)
h2 = round(totalWater * 3 / 14)
h3 = totalWater - h1 - h2
```

Runtime steps:

```text
0:00  第1投  Switch OPEN    pourAmount = h1
0:30  第2投  Switch OPEN    pourAmount = h2; after pour, close Switch
1:15  第3投  Switch CLOSED  pourAmount = h3
1:45  Switch OPEN・落とし切り no water
3:00  target / 180 sec
```

Required UI/copy guardrails:

```text
Switch OPEN/CLOSED must be text-visible.
State must not be color-only.
Do not fix exact room-temperature water amount.
Do not display fixed 20°C / 20℃ room-temperature water.
70–80℃ is liquid-temperature guidance only.
Do not imply official HARIO supervision.
```

### 10 Pour / NEO

Runtime formula:

```text
totalWater = round(dose * ratio)
each = round(totalWater / 10)
last pour adjusts remainder
```

Timing:

```text
0:00
0:30
0:45
1:00
1:15
1:30
1:45
2:00
2:15
2:30
3:30 drawdown / timeSec 210
```

20g / 300g example:

```text
1  0:00  +30g  cumulative 30g
2  0:30  +30g  cumulative 60g
3  0:45  +30g  cumulative 90g
4  1:00  +30g  cumulative 120g
5  1:15  +30g  cumulative 150g
6  1:30  +30g  cumulative 180g
7  1:45  +30g  cumulative 210g
8  2:00  +30g  cumulative 240g
9  2:15  +30g  cumulative 270g
10 2:30  +30g  cumulative 300g
3:30 drawdown
```

Required guardrail:

```text
1:45 / 210g must not be omitted.
```

### Ice Brew

Runtime formula:

```text
hotWater = round(dose * 7.5)
ice = round(dose * 4)
totalWater = hotWater + ice
```

Important:

```text
Timer cumulative target uses HOT water only.
Ice is pre-set in the server and not counted as poured water.
```

20g example:

```text
hotWater = 150g
ice = 80g
HOT pours = 30g × 5
Timer target total = 150g HOT
```

Steps:

```text
0:00 第1投 蒸らし HOT
0:30 第2投 HOT
1:00 第3投 HOT
1:30 第4投 HOT
2:00 第5投 HOT
3:00 急冷・完成
```

---

## Future implementation file candidates

Likely implementation file:

```text
src/data/placeholderMethods.ts
```

Likely docs to add/update:

```text
docs/qa/PR-RECIPE-REFRESH-FABLE5-TRUTH.md
docs/design/PR-RECIPE-REFRESH-FABLE5-TRUTH-HANDOFF.md
```

Do not assume this is exhaustive. The implementation agent must inspect current imports and call sites before editing.

---

## Scope for future runtime PR

Allowed:

```text
recipe data
recipe schedule data
RecipeEngine equivalent
method detail / recipe explanation copy
recipe source/verification labels
recipe QA docs
recipe handoff docs
tests/fixtures directly tied to recipes
```

Forbidden:

```text
UI redesign
Home layout redesign
Timer Ver.2.0 behavior redesign
Timer Step Timing / auto-advance implementation
History schema change
Rebrew semantics change
My Recipes / saved presets
CSV / JSON export schema
PWA manifest
service worker
GitHub Pages path/base config
package/dependency changes
Grinder Equivalency Engine
release metadata
README overhaul
```

---

## Implementation strategy recommendation

Because current Pouro-GPT uses exact-gated fixed recipes for R-01/R-08/R-09 and placeholder fallback otherwise, the safest implementation path is:

1. Keep existing type model unless a type change is unavoidable.
2. Update or replace R-01 fixed recipe to Fable5 4:6 balanced + standard 20g / 300g truth.
3. Consider whether R-02/R-03 should receive exact-gated recipes for sweet/bright standard 20g / 300g.
4. Keep R-04/R-05/R-06 as needs_review unless mapping is explicit.
5. Replace R-08 fixed recipe with Hybrid Fable5 runtime formula for 20g / 300g.
6. Verify R-09 schedule already preserves 1:45 / 210g and only adjust copy if needed.
7. Add R-10 fixed recipe gate for Ice 20g / HOT 150g / ICE 80g / HOT-only timer target if current type model supports it.
8. Add QA and handoff docs.
9. Let GitHub Actions Build and PR Guard run.
10. Independent verification before merge.

---

## Required future QA

Future implementation must verify:

```text
4:6 balanced/standard 20g/300g: 60 / 60 / 90 / 90
4:6 sweet/standard 20g/300g:    50 / 70 / 90 / 90
4:6 bright/standard 20g/300g:   70 / 50 / 90 / 90
NEO 20g/300g:                   10 pours, 1:45 / 210g, 2:30 / 300g, 3:30 drawdown
Ice 20g:                        HOT 150g, ICE 80g, HOT target only, 30g × 5, 3:00 finish
Hybrid 20g/300g:                OPEN/CLOSED text, no fixed room-temp water amount, no fixed 20°C
```

Also verify:

```text
History schema unchanged
Rebrew schema unchanged
CSV export schema unchanged
JSON backup schema unchanged
PWA manifest unchanged
service worker unchanged
package/lockfile unchanged
Grinder files unchanged
```

---

## Forbidden wording check

Future implementation should run a forbidden wording grep equivalent for:

```text
complete reproduction
supervised
certified
公式完全再現
完全再現
絶対に失敗しない
世界チャンピオンの味
公式レシピ
正解レシピ
プロ監修
公式推奨
メーカー公認
同一抽出
同じ味になる
```

These may appear only in QA/docs sections that list forbidden words, not in app-facing claims.

---

## Recommended next action

Because Codex is currently unavailable, do not implement runtime recipe refresh from ChatGPT alone unless the user explicitly accepts the increased risk.

Recommended next step after this preflight:

```text
Wait for Codex or local implementation environment.
Then use the supplied Recipe Truth Refresh prompt together with this preflight document.
```

If continuing without Codex, split the implementation into smaller PRs:

```text
PR-RECIPE-01: 4:6 R-01/R-02/R-03 runtime truth only
PR-RECIPE-02: Hybrid runtime truth only
PR-RECIPE-03: Ice runtime truth only
PR-RECIPE-04: Method Detail / source/legal copy alignment
```

This is safer than a single broad PR.

---

## Document control

```text
Created by: ChatGPT + GitHub interim workflow
Status: Docs-only preflight
Target future runtime PR: Recipe Truth Refresh: Align recipes with Pouro-Fable5
Do not treat this document as implementation.
```
