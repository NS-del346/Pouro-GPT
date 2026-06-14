# Pourō-GPT Ver.2.0 UX Strategy

この文書は Ver2.0 のUX計画です。記載する画面構成や改善案は、調査・試作・モバイルQAを
経て判断する候補であり、実装済みまたは承認済みの最終仕様ではありません。

## 1. UX goal

抽出前、抽出中、抽出後の各段階で、ユーザーが次に必要な判断を迷わず行えることを
目標とします。操作数や表示量よりも、重要情報の優先順位、読み取り速度、誤解の
起きにくさを重視します。

## 2. Core principle: Target Total first

抽出中、ユーザーは通常、物理スケールの累計重量を見ています。したがってアプリは
「今回 `+70g` 注ぐ」だけでなく、**「スケールが累計 `120g` になったら止める」**
という Target Total を最優先で示します。

- Target Total を最も強い数値階層に置く
- This Pour は補助情報として併記する
- placeholder または未確認値を大きな確定数値として見せない
- 次工程の Target Total も短く予告する

## 3. 1-second glanceability during brewing

抽出中に長文を読ませず、約1秒の視線移動で次を判別できる状態を目指します。

1. どこまで注ぐか
2. 今どの工程か
3. いつ次へ進むか
4. 次に何が来るか

数値の位置、単位、ラベル、状態色を一貫させ、重要度の低い説明は Timer の主要領域から
分離します。

## 4. Physical scale-oriented timer design

Timer は物理スケールと併用する実行ガイドとして設計します。

- 累計重量を中心に、経過時間、This Pour、現在指示、次工程を整理する
- 手が濡れている状況を想定し、操作対象を十分な大きさにする
- Pause、Back、Next、Finish の状態と結果を明確にする
- Bluetooth scale integration を前提にしない
- 物理スケールの精度や表示値とアプリの案内が一致することを保証しない

## 5. Home as daily brew dashboard

Home は、毎日の抽出開始地点として、直近の抽出、選択中または pinned の抽出条件、
メソッド選択、Start Brew を短い導線でつなぐ候補です。

ここでいう dashboard は、大規模な統計や分析グラフを意味しません。日常の再開と開始に
必要な情報だけを扱い、数値の過密化を避けます。

## 6. Recipe Setup as parameter control panel

Recipe Setup は、抽出前の値と制約を確認する parameter control panel として整理します。

- Basic parameters と Pour structure を分離して読めるようにする
- 編集可能、固定、未確認、placeholder の違いを明示する
- source/provenance と field evidence へ到達できるようにする
- THE NEO BREW は `20g / 300g / 1:15` の固定例として扱い、任意換算しない
- Start Timer の直前に、重要な固定条件と注意事項を確認できるようにする

## 7. Brew Timer as cockpit

Brew Timer は Ver2.0 の中核画面です。

優先順位の候補:

1. Target Total
2. Elapsed
3. Current Instruction
4. This Pour
5. Next Step
6. Step Timeline
7. Controls

「cockpit」は装飾的な計器表現ではなく、重要値を高いコントラストと安定した位置で
読み取れる状態を指します。Timer 中に不要な navigation や補助情報を表示するかは、
375x667 の試作で判断します。

## 8. Brew Result as next-cup feedback

Brew Result は保存確認だけでなく、次の一杯へつなぐ軽い feedback 入力を扱う候補です。

- Brew metrics と drawdown
- 短い taste tags
- 自由記述 memo
- 次回調整候補
- Save、Rebrew、Discard

次回調整候補は、入力された条件に基づく透明なルールとして設計を検討します。
AI diagnosis や結果保証として扱いません。

## 9. History as improvement log

History は大規模分析ではなく、改善ログとして設計します。

- 一覧で条件、時間、短い結果、次回の手掛かりを比較できる
- method filters は日常的な絞り込みに限定する
- Detail と Rebrew を主要導線にする
- 保存済み snapshot と現在のメソッドデータを混同しない

## 10. Settings/Data as trust and safety center

Settings / Data は、機能設定だけでなく信頼と安全の中心として扱います。

- CSV export と JSON backup export
- 将来の restore 設計候補
- 履歴削除と不可逆操作の確認
- `localStorage`、privacy、データ消失リスク
- 非公式性、source/provenance、免責
- PWA install、update、offline の制約

offline 動作やデータ保持を保証する表現は使いません。

## 11. Japanese UI label policy

一般的な操作、状態、注意事項は日本語を優先します。`Target Total`、`local-first`、
`source/provenance` などの専門語は、意味が明確になる場合に限り英語を補助的に使います。

- 生成モック内の英語ラベルをそのまま採用しない
- 短く、一貫し、抽出中に読みやすい表現を選ぶ
- 人物名、ブランド名をコアUIの視覚的主役にしない
- 未確認状態を「確認済み」に見せるラベルを使わない

## 12. Accessibility / mobile usability principles

- 通常テキスト、重要数値、操作状態に十分なコントラストを確保する
- amber だけで状態を伝えず、ラベル、形、位置を併用する
- 主要タップ領域は最低 `44x44` CSS px、可能なら `48x48` CSS px を目安にする
- dynamic text、長い日本語、単位、桁数の変化を考慮する
- keyboard、focus、screen reader の情報順を設計時に確認する
- CTA、固定領域、Bottom Tabs の重なりを避ける

## 13. 375x667 viewport considerations

`375x667` CSS px を最小の実装検証基準とします。視覚参照を採用する前に、少なくとも
次を確認します。

- Target Total、Elapsed、Current Instruction、主要Controlsが同時に判別できる
- 数値、単位、日本語ラベルが折り返しや横スクロールで崩れない
- CTA と Bottom Tabs、safe area、keyboard が重ならない
- dense panel を詰め込みすぎず、重要操作が初期表示または短いスクロールで届く
- THE NEO BREW の10工程と `1:45 / 210g` が読み取れる
- placeholder-safe な確認中表示が、確定数値に見えない

参照モックは `375x667` での実装可能性と実データでの表示を改めて検証します。
