# Pourō-GPT Ver.2.0 Information Architecture

この文書は Ver2.0 の情報構造候補を整理します。Ver1.0.0 の完成済みフローを基盤とし、
新しいrouteや機能の実装をこの文書だけで承認するものではありません。

## 1. IA goals

- 抽出開始、実行、記録、再抽出の流れを短く保つ
- 重要情報を、その判断が必要な画面に置く
- source/provenance、保存場所、注意事項へ到達できるようにする
- current method data と保存済み snapshot を混同しない
- 将来候補を現在機能に見せない

## 2. Primary navigation model

Primary navigation の候補は、日常利用に必要な次の領域です。

- Brew: Home、Recipe Setup、Brew Timer、Brew Result
- History: History、History Detail、Rebrew
- Settings / Data: export、backup、privacy、legal、PWA guidance

Library、Method Detail、Source Detail が必要かは、source/provenance UI の調査後に
判断します。Bottom navigation の項目追加を前提にしません。

## 3. Screen map

```text
Home
  |- Last Brew / Pinned Brew
  |- Method Grid
  `- Start Brew

Recipe Setup
  |- Basic parameters
  |- Pour structure
  |- Source / provenance
  `- Start Timer

Brew Timer
  |- Target Total
  |- Elapsed
  |- This Pour
  |- Next Step
  |- Current Instruction
  |- Step Timeline
  `- Controls

Brew Result
  |- Brew metrics
  |- Drawdown
  |- Taste tags
  |- Memo
  |- Next cup hint
  `- Save / Rebrew / Discard

History
  |- Brew list
  |- Method filters
  |- Summary info
  |- Detail
  `- Rebrew

History Detail
  |- Setup snapshot
  |- Timer result
  |- Taste notes
  |- Drawdown
  |- Next adjustment
  `- Rebrew / future edit-delete

Settings / Data
  |- Export
  |- Backup
  |- Future restore
  |- Delete history
  |- Privacy / localStorage
  |- Legal / unofficial notice
  `- PWA guidance
```

## 4. Brew Home

役割は、日々の抽出開始と再開です。

- Last Brew または Pinned Brew の候補
- 既存4メソッドの Method Grid
- 選択状態と、必要最小限の説明
- Recipe Setup または Rebrew への Start Brew

大規模な統計、TDS、水質、account 情報は置きません。Pinned Brew は計画候補であり、
実装済み機能ではありません。

## 5. Recipe Setup

役割は、抽出開始前の条件確認と安全な parameter selection です。

- bean、water、ratio、temperature、grind などの Basic parameters
- Pour structure と Target Total の並び
- fixed、editable、unverified、placeholder の区別
- source/provenance と field evidence への導線
- Start Timer

THE NEO BREW は `20g / 300g / 1:15` の固定例として扱い、`1:45 / 210g` を含む
固定スケジュールを任意換算しません。

## 6. Brew Timer

役割は、抽出中の実行判断を支えることです。

- Target Total を主要情報にする
- Elapsed、This Pour、Current Instruction、Next Step を安定した位置に置く
- Step Timeline で現在地を示す
- Pause、Back、Next、Finish を誤操作しにくくする
- placeholder の場合は確定した重量指示に見せない

Timer 中の補助navigationやBottom Tabsは、`375x667` の視認性と誤操作リスクを
確認してから判断します。

## 7. Brew Result

役割は、抽出結果を軽く記録し、次の一杯へつなぐことです。

- Brew metrics と drawdown
- taste tags と memo
- 透明なルールに基づく Next cup hint の候補
- Save、Rebrew、Discard

TDS入力、water tracking、AI diagnosis は現在の範囲に含めません。参照モックに表示が
あっても採用済みではありません。

## 8. History

役割は、過去の抽出を改善ログとして一覧することです。

- Brew list
- 軽量な method filters
- 条件、時間、taste note、次回調整の短い summary
- History Detail と Rebrew への導線

大量の分析グラフや市場比較ではなく、次回の抽出に必要な比較を優先します。

## 9. History Detail

役割は、保存時点の1回分の抽出条件と結果を確認することです。

- setup snapshot
- timer result と pour structure
- taste notes、memo、drawdown
- next adjustment
- Rebrew

History edit と individual delete は将来の設計候補です。データの意味、誤削除防止、
snapshot の完全性を検討する独立PRなしに追加しません。

## 10. Settings / Data

役割は、データ管理、privacy、legal、PWA 制約をまとめて理解できるようにすることです。

- 現行の CSV export と JSON backup export
- 将来の JSON import / restore の設計候補
- delete history と確認
- `localStorage`、端末・サイト依存、消失リスク
- 非公式性、source/provenance、免責
- PWA install、update、offline guidance

restore は現行機能ではありません。設計・検証・安全な失敗時処理が承認されるまで、
利用可能に見せません。

## 11. Source/provenance placement

source/provenance は Settings の奥だけに閉じず、判断が必要な場所から到達可能にします。

- Home: メソッド状態の短い表示候補
- Recipe Setup: 値、固定条件、source status、field evidence
- Brew Timer: 未確認または placeholder の短い注意
- Brew Result / History Detail: 保存時点の snapshot と注意
- Settings / Data: 全体方針、非公式性、出典一覧

表示は `sourceStatus`、`verificationLevel`、`valuesArePlaceholder`、
`isPlaceholder`、`fieldEvidence` を弱めず、`verified`、`researched`、
`summarized`、`interpreted`、`app-guided`、`unverified`、`placeholder` を
区別します。

## 12. Data/export placement

export、backup、delete、将来の restore は Settings / Data にまとめます。

- CSV は軽量な表形式 export
- JSON は設定と履歴の backup snapshot
- restore は将来候補であり、schema、validation、重複、rollback の設計が必要
- delete は不可逆性と対象範囲を明示し、確認を必須にする
- データは初期段階では local-first / `localStorage`

## 13. Future features and where they might fit

次は将来の検討候補であり、採用済みではありません。

| Candidate | Possible placement | Prerequisite |
| --- | --- | --- |
| JSON import / restore | Settings / Data | schema、validation、rollback 設計 |
| History edit / individual delete | History Detail | snapshot と誤操作防止の設計 |
| Source confidence / Method detail | Recipe Setup または独立detail | 用語、根拠、navigation の検証 |
| PWA install / update UX | Settings / Data | browser / OS 別QA |
| Pinned Brew | Home | 日常導線のユーザー検証 |

## 14. Out-of-scope IA items

初期 Ver2.0 IA には、次を含めません。

- account、profile、backend、cloud sync、subscription
- SNS/community、recipe marketplace、custom recipe editor
- Bluetooth scale、AR、TDS / water tracking、AI diagnosis
- 大規模 analytics dashboard
- dark theme / theme switcher
- 広告、外部APIを前提にした領域

将来検討する場合も、既存の local-first、source/provenance、安全なデータ管理を
損なわない独立した提案と検証が必要です。
