# Pourō-GPT Ver.2.0 PR Roadmap

このロードマップは Ver2.0 の作業順序を検討するための提案です。各PR名、順序、範囲、
実施判断は固定ではなく、調査結果、レビュー、優先度に応じて変更します。

## 1. Roadmap principles

- 完成済みの Ver1.0.0 を安定した基盤として扱う
- 小さく独立してレビュー可能なPRに分ける
- planning、research、prototype、production implementation を混同しない
- UI変更前に source/provenance、データ安全、mobile 制約を確認する
- `375x667` を主要な実装QA基準にする
- generated mock や generated code を production source にしない
- Ver2.0 の全項目が承認済みであるかのように扱わない

## 2. Phase 0: planning docs

### PR-V2-00: Add Ver2.0 planning docs

Product Vision、UX Strategy、Visual Direction、Information Architecture、
PR Roadmap を追加します。docs-only とし、production UI、source、assets、データ、
release metadata は変更しません。

## 3. Phase 1: research and validation

### PR-V2-01: Competitor / market / UX research

対象ユーザー仮説、主要タスク、競合との差、Precision Brew Cockpit の理解しやすさを
調査します。市場受容性を先に結論づけません。

### PR-V2-02: Ver1.0 UX audit and problem map

Ver1.0 の完成済みフローを実測し、改善候補、維持すべき点、変更リスクを整理します。
「Ver1.0 は壊れている」という前提を置きません。

## 4. Phase 2: visual foundation

### PR-V2-03: Visual system / design token planning

Light Precision Cockpit + Amber Accent を planning-phase reference から、
既存構造に適合する token 候補へ翻訳します。contrast、日本語、focus、`375x667` を
検証し、generated code はコピーしません。

## 5. Phase 3: Brew Timer cockpit

### PR-V2-04: Brew Timer cockpit prototype

Target Total-first、Elapsed、This Pour、Current Instruction、Next Step、
Step Timeline、Controls の情報階層を試作します。prototype と production 採用を
区別します。

### PR-V2-05: 375x667 Timer cockpit QA

実データ、placeholder、10工程、長い日本語、操作領域、safe area を検証します。
THE NEO BREW の固定条件、`1:45 / 210g`、任意換算非対応を維持します。

## 6. Phase 4: Brew Result / feedback

### PR-V2-06: Brew Result feedback inputs

taste tags、memo、drawdown、Save / Rebrew / Discard の改善候補を設計・実装します。
TDS / water tracking と AI diagnosis は含めません。

### PR-V2-07: Next cup hint rules

透明で限定的な rule-based hint を検討します。根拠、入力不足、誤解防止、非保証表現を
先に定義します。

## 7. Phase 5: History improvement log

### PR-V2-08: History card redesign

改善ログとして必要な条件、結果、次回手掛かり、Rebrew 導線を整理します。
大規模 analytics dashboard には広げません。

### PR-V2-09: History detail improvement flow

setup snapshot、timer result、taste note、next adjustment、Rebrew の読みやすさを
改善します。edit / delete はこのPRへ自動的に含めません。

## 8. Phase 6: data safety and restore

### PR-V2-10: JSON import / restore design

restore を実装する前に、schema validation、互換性、重複、rollback、失敗時処理、
ユーザー確認を設計します。

### PR-V2-11: History edit / individual delete design

snapshot の意味、編集履歴、誤削除防止、不可逆操作の境界を設計します。実装承認とは
分離します。

## 9. Phase 7: source/provenance UI

### PR-V2-12: Source confidence / Method detail UI

`sourceStatus`、`verificationLevel`、`valuesArePlaceholder`、`isPlaceholder`、
`fieldEvidence` を弱めず、日常利用を妨げない表示方法を検証します。

人物、ブランド、メーカー、専門家による承認、監修、認証、提携、完全再現を示唆せず、
app-guided と source-supported の情報を区別します。

## 10. Phase 8: PWA QA and release candidate

### PR-V2-13: PWA install / update UX

GitHub Pages PWA の install、update、offline guidance を改善し、browser / OS 差と
非保証事項を記録します。

### PR-V2-14: Ver2.0 release candidate QA

機能、mobile、source/provenance、data safety、legal copy、PWA、回帰を総合確認します。
リリース可否は検証結果と既知の制約を明示して判断します。

## 11. Non-goals / later ideas

初期ロードマップには、次を含めません。

- account、backend、cloud sync、subscription
- SNS/community、full recipe marketplace、custom recipe editor
- Bluetooth scale integration、AR、TDS / water tracking、AI diagnosis
- 大規模 analytics dashboard
- dark theme、theme switcher

これらを後で検討する場合も、ロードマップへの自動追加ではなく、別の仮説、調査、
安全性評価が必要です。

## 12. PR acceptance checklist

各 Ver2.0 PR は、該当する項目を明示的に確認します。

- [ ] PRの目的、変更範囲、out of scope が明確
- [ ] Ver1.0.0 の完成済み機能と release metadata を不必要に変更していない
- [ ] app implementation、docs、prototype の区別が明確
- [ ] generated ZIP、画像、HTML、CSS、Reactコードを production source にしていない
- [ ] source/provenance と placeholder の意味を弱めていない
- [ ] 非公式性、非保証、人物・ブランドの扱いが安全
- [ ] THE NEO BREW の固定条件、任意換算非対応、`1:45 / 210g` を保持
- [ ] current scope と将来候補を区別
- [ ] `375x667` を含む必要な mobile QA を実施
- [ ] keyboard、focus、contrast、主要tap領域を確認
- [ ] changed-file boundary、build、static check、必要な回帰確認を記録
- [ ] 既知の制約と未検証項目を隠していない
