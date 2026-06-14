# Pourō-GPT Ver.2.0 Visual Direction

この文書は Ver2.0 の planning-phase visual reference を整理します。色、書体、寸法、
component は実装前の guidance であり、最終 design token や production UI では
ありません。

## 1. Baseline name: Light Precision Cockpit + Amber Accent

Ver2.0 の visual baseline candidate は、
**Light Precision Cockpit + Amber Accent** です。

白と明るい neutral を基盤に、graphite の文字と限定的な amber を使い、精密な
測定道具としての明瞭さを目指します。

## 2. Why this direction was selected

計画段階では、次のバランスが良い候補として選定します。

- readability
- 幅広いユーザーが理解しやすい明るいUI
- 技術的で現代的なアイデンティティ
- Pourō-Fable5 との差別化
- mobile PWA での実装可能性
- Target Total や active step の高い視認性

市場受容性が検証済みという意味ではありません。調査、試作、アクセシビリティ確認で
評価します。

## 3. Visual attributes

- light neutral base
- white panels
- graphite typography
- amber accent
- high contrast
- technical panels
- compact precision layout
- professional measurement-tool feel

情報密度は高めでも、重要値の周囲には判別に必要な余白を確保します。装飾より機能を
優先します。

## 4. Color principles

推奨 palette は guidance であり、最終 token ではありません。

| Role | Guidance |
| --- | --- |
| background | cool off-white |
| panel | white |
| primary text | graphite / near black |
| secondary text | dark grey |
| border | neutral grey |
| accent | amber |

色は意味を補助するために使い、色だけで状態を伝えません。error、warning、
source/provenance state は amber と混同しない体系を別途検証します。

## 5. Typography principles

- UI label と説明文は、日本語を含めて高い可読性を優先する
- Target Total、Elapsed、重量などの数値は、桁の比較がしやすい表現を検討する
- label、data、instruction の役割差を、サイズ、weight、spacing で明確にする
- 抽出中に長文や小さすぎる文字を要求しない
- 参照モックの Inter / JetBrains Mono は候補であり、採用確定ではない

## 6. Layout principles

- mobile-first で重要情報を上から明確に並べる
- white panel と細い border で情報単位を分ける
- heavy shadow や装飾的な depth に依存しない
- compact でも、操作対象と重要数値の周囲には十分な余白を取る
- desktop の grid より先に `375x667` の成立性を確認する
- 横スクロールは、必要性と可読性を検証せずに導入しない

## 7. Component principles

- Primary CTA: 主要行動が一つのときだけ強く示す
- Secondary action: primary と競合しない明確な outline または neutral surface
- Cards / panels: 情報のまとまりと優先順位を伝える
- Data display: 数値、単位、状態、根拠を混同しない
- Focus state: keyboard と touch の双方で識別できる
- Target Total display: Timer で最初に視線が届く専用領域として検討する
- Status indicator: 色だけでなくラベルを併用する

丸み、border、spacing は統一しますが、生成モックの具体値をそのまま production token に
しません。

## 8. Amber usage policy

Amber は高視認性の signal color として、次に限定して使います。

- Target Total
- active step
- primary CTA
- selected state
- focus state
- important progress highlight

大面積の装飾背景、すべての見出し、通常データには多用しません。Amber が常に見える
状態を避け、重要な変化の意味を保ちます。

## 9. Dark Electric Amber as secondary reference

Dark Electric Amber は、secondary reference または将来の theme candidate としてのみ
保持します。現行 baseline ではなく、Ver2.0 初期実装の dark theme や theme switcher を
意味しません。

## 10. Stitch / Figma / Claude Design generated mock handling policy

Stitch、Figma、Claude Design などで生成された出力は、planning-phase の視覚・UX参考に
限定します。

参照可能な内容:

- 画面間の情報階層
- Target Total-first の視線誘導
- light neutral、white panel、graphite、amber の関係
- 7画面の役割と情報密度

採用済みとみなさない内容:

- exact mock values
- 英語ラベル
- TDS / water tracking
- edit、individual delete、restore などの将来候補
- 特定のフォント、色コード、寸法、icon

生成ZIP、スクリーンショット、画像、HTML、CSS、Reactコードをリポジトリへ追加しません。

## 11. Do-not-copy generated code policy

Generated Stitch/Figma/Claude Design outputs are visual references only.
Do not copy generated code directly into the app.

実装する場合は、既存の React + TypeScript + Vite 構造、現在のデータ安全境界、
アクセシビリティ要件に翻訳し、独立したPRでレビューと検証を行います。生成HTML、
Tailwind、CSS、component structure を production source として扱いません。

## 12. Differentiation from Pourō-Fable5

Pourō-Fable5 の warm cream / brown / amber、soft、poetic、notebook-like な方向を
模倣しません。

Pourō-GPT Ver2.0 は、cool off-white、white panel、graphite、限定的な amber、
compact technical panel、高い視認性を中心にします。Amber を使う点だけで両者の
視覚言語を近づけず、役割、密度、typography、interaction の違いを明確にします。

## 13. Known cautions before implementation

- 生成モック内の英語ラベルは、可能な限り自然で短い日本語へ置き換える
- 人物名やブランド名をコアUIで強調しない
- THE NEO BREW を任意換算した値で表示しない
- exact mock values を検証なしに採用しない
- TDS、water tracking、edit、restore などを視覚参照だけで実装範囲へ入れない
- `sourceStatus`、`verificationLevel`、placeholder、field evidence の状態を
  視覚的に誤解させない
- `375x667` で情報階層、操作領域、折り返し、safe area を実装検証する
- contrast、focus、dynamic text、日本語の実データを確認する
