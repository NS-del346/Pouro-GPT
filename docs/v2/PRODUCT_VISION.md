# Pourō-GPT Ver.2.0 Product Vision

この文書は、完成済みの Pourō-GPT Ver1.0.0 を基盤にした Ver2.0 の計画仮説を
整理するものです。Ver2.0 が実装済み、または記載機能の採用が確定済みであることを
示すものではありません。

## 1. Purpose

Ver2.0 の目的は、日々の抽出を明確に実行し、成功した条件を繰り返し、次の一杯を
改善しやすくすることです。機能量を増やすこと自体ではなく、抽出中の判断負荷を減らし、
記録を次回の具体的な行動へつなげることを重視します。

## 2. Current baseline: Ver1.0.0 complete

Ver1.0.0 は完成・公開済みの安定した local-first PWA です。Ver2.0 は Ver1.0 を
未完成または不具合のある製品として扱わず、次の完成済み基盤を保持して計画します。

- Recipe Setup、Brew Timer、Finish の保存・破棄
- History、History Detail、Rebrew、Last Brew ショートカット
- Settings、CSV export、JSON backup export
- PWA manifest、icons、Service Worker、offline app shell
- `localStorage` guard

## 3. Ver2.0 concept: Precision Brew Cockpit

**Pourō-GPT Ver.2.0 - Precision Brew Cockpit** を計画コンセプトとします。

定義:

> Pourō-GPT Ver.2.0 は、ユーザーがより明確に抽出を実行し、成功した抽出を繰り返し、
> 次の一杯を改善できるよう支援する、精度優先の抽出実行・改善インターフェースです。

「Cockpit」は情報量の多さではなく、重要な情報が適切な優先順位で即座に読める状態を
意味します。

## 4. Product promise

Ver2.0 が目指す価値は、次の3点です。

- 抽出中に「スケールが何gになったら止めるか」を短時間で判断できる
- 良かった抽出条件を軽い操作で再利用できる
- 結果と気づきを、次回の具体的な調整候補へつなげられる

これはプロダクト上の目標であり、特定の味、精度、抽出結果を保証するものでは
ありません。

## 5. Target users

初期の対象ユーザー像は、検証前の仮説として次のように置きます。

- スペシャルティコーヒーの中級者
- 物理スケールを見ながら抽出する人
- 抽出の再現性を高めたい人
- 軽量な履歴と Rebrew を求める人
- 温かい日記風UIより、精密な道具としてのUIを好む人

これらは市場検証済みの結論ではありません。PR-V2-01 以降の調査とユーザー検証で
見直します。

## 6. What Ver2.0 should improve

- Brew Timer の Target Total-first 階層と1秒での視認性
- Home から直近の抽出や選択中メソッドへ戻る速さ
- Recipe Setup における値、根拠、固定条件の理解しやすさ
- Brew Result での短いフィードバック入力と次回調整への接続
- History と History Detail における比較、再抽出、振り返り
- Settings / Data における保存場所、export、backup、注意事項の透明性

## 7. What Ver2.0 should preserve

- local-first、GitHub Pages PWA、アカウントなし、backend なし
- 初期段階では cloud sync なし
- source/provenance の透明性と非公式であることの明示
- 日常利用で負担にならない軽量な抽出フロー
- Ver1.0 のメソッド範囲: 4:6 Method、Hybrid / HARIO Switch-style、
  THE NEO BREW / 10 Pour、Ice Brew
- `sourceStatus`、`verificationLevel`、`valuesArePlaceholder`、
  `isPlaceholder`、`fieldEvidence` の意味と安全境界

### THE NEO BREW / 10 Pour safety boundary

THE NEO BREW は、将来の追加調査で明示的に変更されない限り、任意換算しない固定例として
扱います。

| 項目 | 固定条件 |
| --- | --- |
| Bean | `20g` |
| Water | `300g` |
| Ratio | `1:15` |
| Temp | `95-96°C` |
| Grind | Comandante C40 `40-45` clicks / very coarse |
| Recommended dripper | HARIO V60 NEO |
| Compatible dripper | V60 |
| Scaling | 任意スケール非対応 |

固定スケジュール:

| Time | Target Total |
| --- | --- |
| `0:00` | `30g` |
| `0:30` | `60g` |
| `0:45` | `90g` |
| `1:00` | `120g` |
| `1:15` | `150g` |
| `1:30` | `180g` |
| `1:45` | `210g` |
| `2:00` | `240g` |
| `2:15` | `270g` |
| `2:30` | `300g` |

`1:45 / 210g` は変更しません。約 `3:30` は落ち切り・終了の目安であり、正確な完了時刻や
抽出結果の保証ではありません。

## 8. What Ver2.0 should not become

- 多機能化を目的とした大規模なコーヒー管理サービス
- 大量レシピの marketplace や SNS/community
- 大規模な分析 dashboard
- 物理スケールを置き換えることを前提にした自動化製品
- 出典の不確実性や placeholder を隠す製品
- 特定の人物、ブランド、メーカーを中心に据えた製品

## 9. Differentiation from Pourō-Fable5

Pourō-Fable5 は、warm、affectionate、quiet、human-centered、soft、poetic、
notebook-like な日常の伴走者を目指す別方向の構想です。

Pourō-GPT Ver2.0 は、precision-focused、contemporary、advanced、
execution-oriented、feedback-oriented、high-visibility、cockpit-like、
repeatability-focused な道具を目指します。Fable5 の温かいノート風表現を模倣せず、
リポジトリ、プロダクト方針、視覚言語を混同しません。

## 10. Initial non-goals

初期 Ver2.0 計画では、次を採用範囲に含めません。

- account、backend、cloud sync、subscription
- SNS/community、full recipe marketplace、custom recipe editor
- Bluetooth scale integration、AR、TDS / water tracking、AI diagnosis
- dark theme、theme switcher
- 大規模な analytics dashboard

将来候補として再検討する場合も、独立した調査、設計、承認が必要です。

## 11. Legal/source/provenance safety principles

Pourō-GPT は非公式です。人物、ブランド、ロースター、ドリッパーメーカー、
コーヒー専門家による承認、監修、認証、提携、完全再現を示唆しません。

- 抽出方法の情報は、`verified`、`researched`、`summarized`、`interpreted`、
  `app-guided`、`unverified`、`placeholder` を区別する
- フィールド単位の根拠がある場合は `fieldEvidence` を保持する
- 未確認値や仮値を確定値に見せない
- `valuesArePlaceholder` と `isPlaceholder` を弱めない
- 出典とアプリ独自の整理・計算を区別する
- 出典、互換性、注意事項をUIから到達可能にする
- 特定の味、抽出結果、完全な再現性、offline 動作を保証しない

人物名やブランド名は、出典、互換性、参考情報の説明に必要な範囲だけで扱い、
コアUIで強調しません。
