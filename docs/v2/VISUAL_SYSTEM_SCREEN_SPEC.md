# Pourō-GPT Ver2.0 Visual System and Screen Spec

## 1. Purpose

This document freezes the current planning-phase UI direction for Pourō-GPT Ver2.0 before implementation begins.

It translates the final Stitch visual reference into a human-readable implementation specification for later Codex work. It is not production code and does not approve implementation by itself.

This PR is docs-only. It does not change app runtime behavior, recipe data, timer behavior, localStorage behavior, PWA configuration, release metadata, package files, generated assets, or production UI.

## 2. Source references

Primary planning sources:

- `docs/v2/PRODUCT_VISION.md`
- `docs/v2/UX_STRATEGY.md`
- `docs/v2/VISUAL_DIRECTION.md`
- `docs/v2/INFORMATION_ARCHITECTURE.md`
- `docs/v2/PR_ROADMAP.md`
- `docs/v2/PR-V2-01-market-research-consolidation.md`
- `docs/v2/research/PR-V2-01-market-research-summary.md`
- Google Drive Stitch reference: `stitch_pour_gpt_precision_brew_cockpit.zip`
  - `https://drive.google.com/file/d/194TsAvsSsA7oQsqM25qnnQAnXpJP0Lv6/view`

The Stitch reference is a visual reference only. Generated HTML, CSS, JavaScript, ZIP contents, or generated images must not be copied into production source or committed as app assets.

## 3. Product position

Pourō-GPT Ver2.0 should feel like a precise manual brewing instrument.

The approved planning direction is:

- Precision Brew Cockpit
- Light Precision Cockpit + Amber Accent
- local-first
- no account by default
- no backend by default
- GitHub Pages PWA compatible
- source/provenance aware
- not a coffee photo diary
- not a bean inventory product
- not a social or marketplace product
- not an AI diagnosis product

The app should help the user manage brewing rhythm, method structure, repeatability, and feedback. The physical coffee scale remains the primary tool for gram measurement during brewing.

## 4. Visual system candidate

### 4.1 Color

Use a light, technical surface by default.

Candidate palette:

| Role | Candidate |
| --- | --- |
| App background | `#F7F7F4` or `#F8F8F6` |
| Panel surface | `#FFFFFF` |
| Primary text | `#111111` |
| Secondary text | `#374151` |
| Tertiary text | `#6B7280` |
| Border | `#D4D4D4` or lighter |
| Strong border | Use rarely |
| Amber accent | `#FFB000` |
| Muted amber | `#FFF4D6` |
| Danger | muted red only for destructive actions |

Amber is a limited signal color. Use it for selected state, current step, primary CTA, active timer emphasis, progress, and click-converter tick feedback. Do not make the whole UI amber.

### 4.2 Borders and surfaces

The final Stitch direction intentionally softened aggressive outlines.

Implementation guidance:

- Prefer subtle gray borders over dark black borders.
- Use spacing, typography, and surface grouping before strong outlines.
- Avoid heavy framed cards.
- Avoid decorative coffee textures and large photography.
- Keep card radii modest and technical rather than cute.

### 4.3 Typography

Use Japanese-first UI text.

Numeric values should use tabular numerals or a stable monospace-like treatment for:

- elapsed time
- countdown
- grams
- ratios
- temperatures
- grinder click values
- step numbers

The UI may feel technical, but it must not become a terminal-style interface.

## 5. Navigation model

Use a four-tab bottom navigation model:

```text
抽出
ツール
履歴
設定
```

Rules:

- Icons are supporting elements only.
- Every bottom navigation item must have a text label.
- Do not rely on icon-only meaning.
- The Click Converter belongs naturally under `ツール`, and may also be reachable from Recipe Setup.

## 6. Screen list and intent

The Ver2.0 screen set is:

1. 抽出ホーム
2. レシピ設定
3. クリック換算
4. 抽出タイマー
5. 抽出結果
6. 履歴
7. 履歴詳細
8. 設定・データ

Optional later screen:

- メソッド詳細

## 7. 抽出ホーム

Purpose: daily starting point for brewing.

Primary questions answered:

- What did I brew last?
- Which method do I want now?
- Can I start quickly?

Required content:

- `pourō` wordmark or concise product header
- `Precision Brew Cockpit` as secondary subtitle if useful
- 前回の抽出
- 再抽出
- メソッド選択
- primary start flow
- bottom navigation

Method cards must use this scope:

```text
4:6
Hybrid
10 Pour
Ice
```

4:6 card language should communicate:

```text
味 × 濃さの9組合せ
```

Avoid:

- `V60 STANDARD` as a primary method name
- `Chemex`, `Aeropress`, `French Press`, or `Nel Drip` as main method categories
- long English explanations
- person or brand names as dominant UI elements

## 8. レシピ設定

Purpose: structured setup before brewing.

Required content:

- selected method
- dose / water / ratio
- temperature
- grind reference
- pour structure preview
- source/provenance status
- CTA to start timer
- entry point to Click Converter

### 8.1 4:6 structure

4:6 should use a 9-combination model aligned with Pourō-Fable5 logic.

Acceptable UI forms:

- 3 × 3 matrix
- two-axis selector that clearly expresses 3 × 3 = 9
- selected combination cell

Example planning labels, pending source confirmation:

```text
味方向: 甘み / 標準 / 酸味
濃さ: 軽め / 標準 / しっかり
```

These labels must not be treated as final source-verified labels unless later docs verify them.

### 8.2 10 Pour / THE NEO BREW

10 Pour must remain fixed and non-scalable unless a later source-verification PR changes that assumption.

Carry forward constraints:

```text
20g coffee
300g water
1:15
95–96℃
arbitrary scaling unsupported
1:45 / 210g unchanged
```

Do not show arbitrary scaled 10 Pour values.

## 9. クリック換算

Purpose: approximate translation between grinder click references.

This is a Ver2.0 differentiator, but it is a planning candidate until source data and preset provenance are separately specified.

Required content:

- 比較元グラインダー
- クリック数
- 使用グラインダー
- 推定結果
- ± stepper controls
- source / verification state
- caution copy

Required caution:

```text
クリック換算は刃間移動量の目安です。
粉粒径そのものではありません。
豆、焙煎度、刃、ゼロ点、個体差で変わります。
```

Result wording:

```text
32 clicks 前後
±1〜2クリックで調整
```

Do not use misleading precision terms:

- calibration active
- algorithm version
- total gap shift
- micro-adjustment visualization
- exact powder size

Future grinder preset data must include source/provenance fields and verification level. Presets must distinguish official source, manufacturer-like source, third-party measurement, user report, and needs-review values.

## 10. 抽出タイマー

Purpose: core execution cockpit.

This is the most important screen.

### 10.1 Responsibility split

During brewing:

- The physical scale manages grams.
- The app manages time, rhythm, sequence, current instruction, and next step.

Therefore, timer UI must be time-first, not grams-first.

### 10.2 Information hierarchy

Primary:

```text
経過時間
次の工程まで
```

Secondary:

```text
現在の工程
現在の指示
次の工程
工程タイムライン
```

Supporting only:

```text
目安g
累計目安
今回の注湯
```

The user must understand in one second:

```text
今は何秒か？
次の工程まであと何秒か？
今は何をするか？
次はいつ何をするか？
```

Only secondarily:

```text
目安gはいくつか？
```

### 10.3 10 Pour schedule example

If the timer example uses 10 Pour, the displayed schedule must remain internally consistent:

```text
0:00 30g
0:30 60g
0:45 90g
1:00 120g
1:15 150g
1:30 180g
1:45 210g
2:00 240g
2:15 270g
2:30 300g
```

At elapsed `01:02`, a valid example is:

```text
経過時間 01:02
次の工程まで 00:13
現在の工程 4投目
次の工程 01:15 / 150g / 5投目
```

Do not display schedule contradictions.

### 10.4 Controls

Timer controls must have labels:

```text
前へ
一時停止
次へ
中断
完了
```

Use `中断` for exiting an active brew before completion. Use `完了` only for actual completion. Avoid ambiguous `終了`.

### 10.5 Timer surface

The final Stitch reference uses a darker active timer surface. This is allowed only as:

```text
Active Brew Focus Surface
```

This does not approve a general dark theme. Do not expand it into dark mode or a theme switcher in early Ver2.0.

## 11. 抽出結果

Purpose: lightweight result confirmation and save decision screen.

No photos. No coffee lifestyle imagery. No bean/cup/dripper image cards.

Required sections:

- 抽出結果
- メソッド
- 総時間
- 使用湯量
- 比率
- 味の記録
- メモ
- 次回候補, optional
- 保存
- 再抽出
- 破棄

The user should quickly decide:

- save this brew
- rebrew
- discard
- note what to change next

If `次回候補` appears, include:

```text
目安です。結果を保証しません。
```

Do not present suggestions as AI diagnosis.

## 12. 履歴

Purpose: brew repeatability log, not bean inventory.

Primary card information:

- date/time
- method
- dose / water / ratio
- total time
- taste record summary
- details
- rebrew

Preferred card heading examples:

```text
4:6｜15g / 240ml
Hybrid｜18g / 270ml
10 Pour｜20g / 300ml
Ice｜20g / 150ml
```

Bean name may appear as optional secondary metadata:

```text
豆: Ethiopia Yirgacheffe
```

Filters:

```text
すべて
4:6
Hybrid
10 Pour
Ice
```

Do not use unrelated method filters.

## 13. 履歴詳細

Purpose: saved brew snapshot for reproducibility and improvement.

The top summary should be method/condition-first, not bean-first.

Required sections:

- 抽出条件
- タイマー結果
- 味の記録
- メモ
- 次回の調整候補
- 出典・注意
- 同じ条件で再抽出
- 共有
- 削除

Deletion must have a visible `削除` label and must imply confirmation. Do not use an icon-only destructive action.

## 14. 設定・データ

Purpose: trust, data safety, sound, and PWA guidance center.

Required sections:

- サウンド設定
- クリック音
- タイマー音
- データ書き出し
- CSV書き出し
- JSONバックアップ
- 復元機能は設計中
- データ保存について
- PWAインストール
- 法務・注意
- 非公式アプリについて
- 危険な操作
- 全データ削除

Destructive actions must be secondary/danger and must require confirmation.

Suggested legal/data copy:

```text
このアプリは非公式の抽出補助ツールです。
各メーカー・人物・ブランドとは関係ありません。
データは端末・ブラウザ内に保存されます。
ブラウザデータを削除すると履歴が消える場合があります。
```

## 15. Japanese-first label policy

Replace unnecessary English labels during implementation.

| Avoid | Use |
| --- | --- |
| PARAMETERS | 抽出条件 |
| DOSE | 豆量 |
| WATER | 湯量 |
| TEMP | 湯温 |
| GRIND | 粒度 |
| POUR STEPS PREVIEW | 注湯プレビュー |
| METHOD | メソッド |
| TOTAL TIME | 総時間 |
| FEEDBACK | 味の記録 |
| MEMO | メモ |
| NEXT CUP HINT | 次回候補 |
| SOURCE GRINDER | 比較元グラインダー |
| TARGET GRINDER | 使用グラインダー |
| ESTIMATED RESULT | 推定結果 |
| DATA EXPORT | データ書き出し |
| PREFERENCES | 設定 |
| LEGAL | 法務・注意 |

English may remain only where it is product-like or clearer:

- Target Total
- PWA
- Rebrew, if not confusing
- local-first
- source/provenance

## 16. Icon and action rules

- Icons must support labels, not replace them.
- Bottom navigation must always show labels.
- Timer controls must show labels.
- Save / Rebrew / Discard must show labels.
- Share and delete must show labels.
- Destructive actions must never be icon-only.
- Decorative icons must not look interactive.

## 17. Motion guidelines

Motion is allowed as implementation polish, not as the source of truth.

Allowed motion references:

- active timer step pulse
- next-step countdown ring or bar
- step transition highlight
- button press state
- click converter tick feedback

Implementation rules:

- Stitch animation is a motion reference only.
- Do not copy Stitch-generated HTML/CSS/JS directly.
- Timer state must be controlled by app logic, not CSS animation alone.
- Pause, resume, previous, next, and completion must remain state-safe.
- Provide reduced-motion fallback.
- Sound must be optional and user-controlled.

## 18. 375×667 usability constraints

Use `375×667` as the strict small-screen QA target.

Check:

- no horizontal overflow
- no CTA hidden under bottom navigation
- no clipped filter labels
- no clipped timer controls
- no unreadable small text for critical data
- no card overlap
- adequate tap targets
- timer readable in one second
- Japanese labels remain short enough

## 19. Source/provenance and legal guardrails

Do not weaken existing source/provenance concepts:

- `sourceStatus`
- `verificationLevel`
- `valuesArePlaceholder`
- `isPlaceholder`
- `fieldEvidence`

Do not imply:

- official approval
- supervision
- certification
- partnership
- endorsement
- complete reproduction
- guaranteed accuracy
- guaranteed brew result

Allowed posture:

```text
unofficial
not approved
not supervised
not a complete reproduction
not guaranteed
```

## 20. Implementation boundary

This specification does not approve direct implementation. Later implementation PRs must be split.

Suggested later implementation sequence:

1. App shell / navigation / visual tokens
2. Time-first Brew Timer cockpit
3. Recipe Setup 4:6 combination UI
4. Grinder Click Converter
5. Brew Result and History improvement loop
6. Settings / Data safety / source safety polish

Do not implement all screens in one PR.
