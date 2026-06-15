# Pourō-GPT Ver1.0 UX Audit and Problem Map

## 1. Purpose

この文書は、完成・公開済みの Pourō-GPT Ver1.0.0 を対象とする docs-only UX audit です。

- Ver1.0.0 は complete and stable な基盤として扱います。
- Ver2.0 で改善を検討する機会、変更リスク、保護対象を整理します。
- この監査は production UI、runtime behavior、data schema、recipe、timer behavior の実装を承認しません。
- この監査による runtime behavior の変更はありません。

証拠の表記は次のように区別します。

- **confirmed from source**: 現行リポジトリの実装または文書から確認できる。
- **inferred**: source 構造から想定される UX 上の論点。利用者テスト済みとは扱わない。
- **requires browser validation**: 表示、操作、実環境挙動の確認が必要。
- **requires 375×667 validation**: 小さい iPhone 相当 viewport での確認が必要。
- **planning candidate / not yet implementation-approved**: 将来設計の候補であり、実装承認ではない。

PR-V2-01 の市場・競合調査は planning input として参照しますが、market validation、verified user demand、実装承認としては扱いません。

## 2. Current Ver1.0 UX Baseline

| Area | Current Ver1.0 behavior | Evidence / status |
| --- | --- | --- |
| Recipe Setup | Method / variant、豆量、比率または氷・湯量、温度・挽き目・自由メモを確認し、Timer を開始する。Rebrew / Last Brew は保存済み `setupSnapshot` をここへ戻す。 | **confirmed from source**: `src/pages/RecipeSetupPage.tsx`, `src/App.tsx` |
| Brew Timer | elapsed、Target Total、This Pour、current step、next preview、Back / Start-Pause-Resume / Next-Finish を表示する。Timer と Finish では Bottom Tabs を隠す。 | **confirmed from source**: `src/pages/BrewTimerPage.tsx`, `src/components/layout/AppShell.tsx` |
| Finish save / discard | 味タグ、短い印象、5段階評価、次回改善メモ、自由メモを入力し、保存または破棄できる。 | **confirmed from source**: `src/pages/BrewFinishPage.tsx` |
| History | 新しい保存履歴を先頭に表示し、method、setup summary、elapsed、rating、taste tags、next adjustment の一部を一覧できる。 | **confirmed from source**: `src/pages/HistoryPage.tsx`, `src/repositories/brewHistoryRepository.ts` |
| History Detail | 保存時点の method / setup snapshot、elapsed、味・評価・次回改善メモを確認できる。 | **confirmed from source**: `src/pages/HistoryDetailPage.tsx` |
| Rebrew | History list / History Detail から保存済み setup を Recipe Setup に戻し、確認後に Timer へ進む。Timer を直接開始しない。 | **confirmed from source**: `src/pages/HistoryPage.tsx`, `src/pages/HistoryDetailPage.tsx`, `src/App.tsx` |
| Last Brew shortcut | Home に最新 `history[0]` のみを表示し、Recipe Setup に戻す。 | **confirmed from source**: `src/pages/BrewHomePage.tsx` |
| Settings | sound、vibration、theme、temperature guide の保存 UI と、Data / About / Sources / Legal / Privacy 導線を持つ。設定値の runtime 効果全体はこの監査では検証していない。 | UI と保存は **confirmed from source**。runtime 効果は **not verified in this audit** |
| CSV export | 保存済み brew history を CSV download として書き出す。 | **confirmed from source**: `src/pages/SettingsPage.tsx` |
| JSON backup export | 保存済み brew history を schemaVersion 付き JSON download として書き出す。Ver1.0 に import / restore UI はない。 | **confirmed from source**: `src/pages/SettingsPage.tsx`, `README.md` |
| PWA / offline shell | `/Pouro-GPT/` scope の manifest、Service Worker、navigation fallback 用 app shell cache がある。 | 構成は **confirmed from source**: `public/manifest.webmanifest`, `public/sw.js`; 実端末 install / update は **not verified in this audit** |
| localStorage guard | `brewHistory` 読み取り時に不正・legacy record を UI-safe な値へ絞り、例外時は空配列へ退避する。 | **confirmed from source**: `src/repositories/brewHistoryRepository.ts` |

## 3. Ver1.0 Strengths to Preserve

次の強みは、専用の設計・QA PR なしに削除または弱体化しません。

- local-first operation、no account、no backend、no cloud sync による低い開始摩擦。
- GitHub Pages PWA と offline app shell による軽量な配布構造。
- Home → Recipe Setup → Brew Timer → Finish → History Detail の短い brew flow。
- History、History Detail、Rebrew、Last Brew による再利用ループ。
- CSV export と JSON backup export によるローカルデータの持ち出し手段。
- 不正な `brewHistory` が blank screen を起こしにくい localStorage guard。
- `sourceStatus`、`verificationLevel`、`valuesArePlaceholder`、`isPlaceholder`、`fieldEvidence` による source/provenance safety。
- non-official posture と、approval、supervision、partnership、complete reproduction、guaranteed result を主張しない法的境界。
- method scope を限定し、広い recipe marketplace や community scope に拡張していないこと。
- Rebrew が Timer を直接開始せず、Recipe Setup で確認を挟むこと。

## 4. UX Friction Map

### 4.1 Home / start flow

- **Problem**: method 選択、選択 method の説明、Recipe Setup への CTA、Last Brew が同じ開始画面にあり、日常の最短開始と method 探索の優先順位が競合する可能性がある。
- **Observed / inferred from**: `BrewHomePage` の method grid、selected-method card、Last Brew card から **inferred**。
- **Affected screen**: Brew Home。
- **Severity**: P1。
- **Why it matters**: 毎日の同じ brew を始める利用者と、method を選ぶ利用者で最短導線が異なる。
- **Potential Ver2.0 direction**: Last Brew / selected method / Start Brew の役割を短い一文と一つの primary action で整理する planning candidate。
- **Implementation risk**: Last Brew の `history[0]`、Recipe Setup confirmation、Bottom Tabs behavior を壊さないこと。

### 4.2 Recipe Setup clarity

- **Problem**: variant status、source caution、POINT/TIPS、入力カード、memo が縦に続き、確認すべき固定条件と任意入力の区別が一目で分かりにくい可能性がある。
- **Observed / inferred from**: `RecipeSetupPage` の長い form 構造から **inferred**。
- **Affected screen**: Recipe Setup。
- **Severity**: P1。
- **Why it matters**: Start Timer 前の確認負荷が高いと、brew 開始摩擦が増える。
- **Potential Ver2.0 direction**: fixed / editable / unresolved / optional を明示し、重要条件を Start Timer 直前に再確認できる parameter control panel。
- **Implementation risk**: `BrewSetup` shape、fixed setup gate、placeholder fallback、Rebrew の prefill precedence を変更しないこと。

### 4.3 Brew Timer glanceability

- **Problem**: Target Total は primary 表示だが、method summary、schedule caution、POINT/TIPS、elapsed と同じ上部領域に存在し、実データや長い注意文では一秒視認性が低下する可能性がある。
- **Observed / inferred from**: `BrewTimerPage` の DOM と `src/styles/index.css` の order / compact rules から **inferred**。
- **Affected screen**: Brew Timer。
- **Severity**: P0。
- **Why it matters**: brewing 中は物理スケールを見ながら、停止目標と次操作を短時間で判断する必要がある。
- **Potential Ver2.0 direction**: Target Total、elapsed、current instruction、controls の P0 hierarchy を実 brew context で検証する。
- **Implementation risk**: timer calculations、step progression、method schedules、Finish navigation を変更しないこと。

### 4.4 Target Total / This Pour clarity

- **Problem**: source では Target Total が上位、This Pour が下位だが、利用者が「今 +70g」ではなく「scale が 120g になったら止める」と即時理解できるかは未確認。
- **Observed / inferred from**: `timer-target-row--primary` / `--secondary` は **confirmed from source**。理解速度は **requires browser validation**。
- **Affected screen**: Brew Timer。
- **Severity**: P0。
- **Why it matters**: cumulative target と incremental pour の混同は、物理スケールを使う brew の誤操作につながる。
- **Potential Ver2.0 direction**: Target Total-first の label、数値 hierarchy、補助説明を prototype で比較する。
- **Implementation risk**: placeholder / unresolved cumulative target を確定値に見せないこと。

### 4.5 Step timeline / current step clarity

- **Problem**: current step と next preview は存在するが、全体 timeline は step count と手動 Back / Next が中心で、工程全体の位置関係をどこまで瞬時に把握できるかは未確認。
- **Observed / inferred from**: `Step x / n`、current step card、next preview は **confirmed from source**。compact timeline gap は **inferred**。
- **Affected screen**: Brew Timer。
- **Severity**: P0。
- **Why it matters**: 現在位置と次工程の混同は、step progression の手動操作ミスにつながる。
- **Potential Ver2.0 direction**: compact step timeline を prototype と 375×667 QA で検証する。
- **Implementation risk**: step order、manual progression、THE NEO BREW の10工程を変更しないこと。

### 4.6 Finish / Brew Result flow

- **Problem**: Ver1.0 は十分な feedback input を持つが、入力項目が複数あり、保存・破棄判断と「次の一杯に何を残すか」の優先順位が分散する可能性がある。
- **Observed / inferred from**: taste tags、impression、rating、next adjustment、memo、save / discard は **confirmed from source**。入力負荷は **inferred**。
- **Affected screen**: Brew Finish / future Brew Result。
- **Severity**: P1。
- **Why it matters**: brew 直後に短く記録できなければ、History improvement loop が育たない。
- **Potential Ver2.0 direction**: minimal feedback の必須・任意境界と Save / Rebrew / Discard の設計を専用 PR で決める。
- **Implementation risk**: `BrewResult` schema、save/discard behavior を設計なしに変更しないこと。

### 4.7 History list scanability

- **Problem**: method、setup、elapsed、rating、taste tags、next adjustment が一覧にある一方、どの情報が次の brew 比較に最重要かは未検証。
- **Observed / inferred from**: `HistoryPage` の cards は **confirmed from source**。優先順位は **inferred**。
- **Affected screen**: History。
- **Severity**: P1。
- **Why it matters**: 履歴が保存庫に留まり、改善ログとして使われない可能性がある。
- **Potential Ver2.0 direction**: method、条件、結果、次回手掛かりの scan hierarchy を設計する。
- **Implementation risk**: 大規模 analytics dashboard、schema change、comparison 自動実装へ拡張しないこと。

### 4.8 History Detail usefulness

- **Problem**: setup snapshot と feedback は確認できるが、比較対象、drawdown 記録、編集、individual delete は現行 UI にない。
- **Observed / inferred from**: 現在の表示項目と action は **confirmed from source**。comparison / edit / individual delete は未実装。
- **Affected screen**: History Detail。
- **Severity**: P1。
- **Why it matters**: 一杯の記録を見ても、次の具体的変更へつなげにくい場合がある。
- **Potential Ver2.0 direction**: comparison、edit/delete、drawdown、Next Cup Hint は future design topic として個別に設計する。
- **Implementation risk**: saved snapshot の意味、誤削除防止、legacy compatibility を先に定義すること。

### 4.9 Rebrew clarity

- **Problem**: Rebrew と Last Brew は安全に Recipe Setup へ戻るが、「保存済み条件を確認してから始める」動作であることが action label だけで十分伝わるかは未確認。
- **Observed / inferred from**: replay handlers は **confirmed from source**。label clarity は **requires browser validation**。
- **Affected screen**: Home、History、History Detail、Recipe Setup。
- **Severity**: P1。
- **Why it matters**: direct Timer start と誤認されると、利用者の期待と安全な confirmation flow がずれる。
- **Potential Ver2.0 direction**: Rebrew の遷移先と確認ステップを短い日本語 label で明示する。
- **Implementation risk**: direct Timer start を追加せず、`setupSnapshot` copy と refreshed `createdAt` を保つこと。

### 4.10 Settings / Data discoverability

- **Problem**: CSV、JSON backup、delete-all、localStorage 説明は Settings にまとまるが、CSV と backup の用途差、restore 不在、データ消失リスクの理解は利用者に委ねられる。
- **Observed / inferred from**: export / delete / localStorage copy は **confirmed from source**。理解度は **requires browser validation**。
- **Affected screen**: Settings / Data、Privacy。
- **Severity**: P1。
- **Why it matters**: local-first の信頼性は、保存場所と復旧可能性を正しく理解できることに依存する。
- **Potential Ver2.0 direction**: CSV=閲覧用、JSON=backup、restore=未提供、delete-all=不可逆を簡潔に整理する。
- **Implementation risk**: JSON import / restore は P1 design work であり、この監査から直接実装しないこと。

### 4.11 PWA install / update guidance

- **Problem**: manifest、Service Worker、offline shell は存在するが、app 内に install / update / offline limitation の明確な guidance は確認できない。
- **Observed / inferred from**: PWA 構成は **confirmed from source**。in-app guidance absence は source inspection による。OS-level behavior は **not verified in this audit**。
- **Affected screen**: Settings / Data、About / Privacy。
- **Severity**: P1。
- **Why it matters**: PWA の利用方法や更新状態を誤解すると、offline availability や version freshness を過信しやすい。
- **Potential Ver2.0 direction**: browser / OS 差と非保証事項を含む短い guidance を設計する。
- **Implementation risk**: installability や offline behavior を保証する表現を使わないこと。

### 4.12 Source / provenance visibility

- **Problem**: Home、Setup、Timer caution、Sources、Legal に安全表示がある一方、compact UI で日常利用を妨げずに confidence と根拠へ到達できる最小表示は未確定。
- **Observed / inferred from**: status / caution / Sources page は **confirmed from source**。最適配置は **inferred**。
- **Affected screen**: Home、Recipe Setup、Brew Timer、History Detail、Settings / Sources。
- **Severity**: P0。
- **Why it matters**: 未確認・placeholder 値を確定値に見せず、同時に brew flow を過密にしない必要がある。
- **Potential Ver2.0 direction**: compact status と detail 導線を分離し、raw URL / timecode / transcript を compact UI に出さない。
- **Implementation risk**: provenance fields、non-official posture、source metadata suppression を弱めないこと。

### 4.13 Placeholder / unverified value visibility

- **Problem**: fallback 文言と status pill は存在するが、Timer の大きな数値 hierarchy と caution 表示が同時に出る場合、未確認状態が確定値に見えないかは実データ QA が必要。
- **Observed / inferred from**: fallback / caution behavior は **confirmed from source**。認知上の誤解リスクは **requires browser validation**。
- **Affected screen**: Home、Recipe Setup、Brew Timer、History Detail。
- **Severity**: P0。
- **Why it matters**: authority-sounding display は source/legal safety を損なう。
- **Potential Ver2.0 direction**: unresolved state の label、数値、色、位置を together で検証する。
- **Implementation risk**: `valuesArePlaceholder` / `isPlaceholder` を視覚改善のために弱めないこと。

### 4.14 Small viewport and Japanese label clarity

- **Problem**: 375×667 向け CSS、safe-area padding、sticky controls はあるが、長い日本語 caution、dense panel、Timer 数値、操作 label の同時表示には継続的な overflow / scroll / tap risk がある。
- **Observed / inferred from**: responsive CSS と sticky controls は **confirmed from source**。実 usability は **requires 375×667 validation**。
- **Affected screen**: 全画面、特に Recipe Setup、Brew Timer、Settings。
- **Severity**: P0。
- **Why it matters**: brewing 中の誤読・誤操作や critical CTA の到達困難につながる。
- **Potential Ver2.0 direction**: timer-critical state は短い日本語を優先し、英語 technical term は補助に限定する。
- **Implementation risk**: label 短縮で意味、安全注意、unresolved state を失わないこと。

## 5. Target Total Gap Analysis

### Current behavior confirmed from source

- `BrewTimerPage` は `cumulativeWaterGrams` または `totalWaterGrams` を Target Total として表示します。
- Target Total は `timer-target-row--primary`、This Pour は `timer-target-row--secondary` です。
- CSS では primary Target Total 数値が This Pour より大きく表示されます。
- current step、next preview、manual Back / Next / Finish が存在します。
- cumulative target が不明な場合は「確認中」の fallback を表示し、確定値を作りません。

### Inferred UX issue

現在の構造は「Pour +70g now」だけでなく、「scale が 120g になったら止める」を支援できる基礎を持ちます。ただし、アプリは Bluetooth scale を前提とせず、実際の重量を検知しません。利用者は物理スケールを見ながら Target Total を読み、手動で停止・step progression を行います。

そのため、Ver2.0 の論点は Target Total を新規追加することではなく、次を検証することです。

- cumulative target が一秒で読み取れるか。
- This Pour と混同しないか。
- current instruction と停止目標が同時に理解できるか。
- placeholder / range / unresolved target が確定値に見えないか。

### Not verified without browser/mobile test

- `120g` の停止目標が 375×667 で常に first-glance information になるか。
- 長い schedule caution、POINT/TIPS、current instruction がある場合も hierarchy が維持されるか。
- 実際に片手・濡れた手・明るいキッチン環境で読みやすいか。
- Japanese label が cumulative / incremental の違いを誤解なく伝えるか。

## 6. One-second Glanceability Audit

| Information | Current source finding | Audit judgment |
| --- | --- | --- |
| Current target | Target Total primary と This Pour secondary が存在する。 | P0 hierarchy validation が必要。**requires 375×667 validation** |
| Elapsed time | tabular numeric timer として表示される。 | supportive hierarchy として適切か **requires browser validation** |
| Current instruction | current step card に title / instruction / timing note がある。 | 長文時の一秒視認性は未確認 |
| Next step | next timing と next pour / preview がある。 | current target と競合しないか未確認 |
| Step count | `Step x / n` がある。 | 全体 timeline として十分かは **inferred gap** |
| Controls | Back、Start / Pause / Resume、Next / Finish が sticky control group にある。 | 到達性・誤操作防止は **requires 375×667 validation** |
| Pause clarity | center circular primary control と状態別 label がある。 | running / paused の瞬時判別は **requires browser validation** |
| Back / Next / Finish clarity | state に応じて disabled / Finish label が変わる。 | 日本語利用者への label clarity は未確認 |

Source inspection だけでは full usability failure と判断しません。PR-V2-04 prototype と専用 mobile QA で、一秒視認性を acceptance criteria として計測する必要があります。

## 7. History and Improvement Loop Audit

Ver1.0 は次の改善ループの基礎をすでに持ちます。

```text
Brew Finish feedback
  -> saved History
  -> History Detail
  -> Rebrew / Last Brew
  -> Recipe Setup confirmation
  -> next brew
```

**confirmed from source**:

- Brew Finish で taste tags、taste impression、rating、next adjustment memo、free memo を保存できる。
- History list で結果の一部を scan できる。
- History Detail で setup snapshot と結果を確認できる。
- History / History Detail / Last Brew から Recipe Setup へ戻れる。

**Gaps / future design topics**:

- minimal feedback の必須・任意境界。
- drawdown の記録方法と、正確な完了時間を保証しない表現。
- taste notes / tags の精度と入力負荷。
- next adjustment と rule-based Next Cup Hint の役割分担。
- どの過去 brew と比較するかの説明可能な基準。
- History edit と individual delete の snapshot / 誤操作 / rollback 設計。
- backup、restore、delete を含む data safety。

History edit、individual delete、comparison、Next Cup Hint は **future design topics / not yet implementation-approved** です。大規模 analytics dashboard へ拡張しません。

## 8. Settings / Data Safety Audit

| Topic | Current finding | Ver2.0 planning direction |
| --- | --- | --- |
| CSV export discoverability | Settings / Data に primary export action がある。 | 用途を「閲覧・表計算向け」と短く説明する候補 |
| JSON backup clarity | secondary action として JSON backup を書き出す。backup は history のみを含む。 | restore 不在と保管責任を明示する候補 |
| localStorage explanation | Settings、About、Privacy、README にローカル保存と消失リスクがある。 | compact explanation と詳細ページの役割分担を検証 |
| Data loss risk | browser / site data clear で history と settings が失われ得る。cloud protection はない。 | 非保証表現を保ち、backup guidance を設計 |
| Restore absence | Ver1.0 に JSON import / restore UI はない。 | **P1 design work**, not immediate implementation |
| Delete history clarity | Settings に delete-all と confirmation がある。individual delete UI はない。 | delete scope、不可逆性、誤操作防止を設計 |
| Privacy / legal | local-first、no account、no backend、unofficial notice がある。 | Settings / Data を trust and safety center として整理する候補 |
| PWA install / update | manifest / Service Worker はあるが、明確な in-app guidance は未確認。 | browser / OS 差、update、offline limitation を専用 PR で設計 |

JSON import / restore は schema validation、duplicate handling、compatibility、rollback、failure recovery、user confirmation の設計が必要です。この監査は直接実装を推奨しません。

## 9. Source / Provenance / Legal Safety Audit

Ver2.0 planning と将来実装は、次の field の意味と安全境界を保持します。

```text
sourceStatus
verificationLevel
valuesArePlaceholder
isPlaceholder
fieldEvidence
```

現行 source では method、variant、recipe、step に provenance / placeholder state があり、Home、Setup、Timer caution、History Detail、Sources、Legal で利用者向け表示へ接続されています。compact UI では raw source URL、timecode、raw transcript、source note を不用意に露出しません。

次の claim は行いません。

- official endorsement / official approval
- supervision / certification
- partnership / affiliation
- complete reproduction
- guaranteed original method accuracy
- guaranteed brew result

### THE NEO BREW / R-09 protected boundary

次は変更せず、専用 design / data / runtime / QA PR なしに拡張しません。

- coffee `20g`
- water `300g`
- ratio `1:15`
- arbitrary scaling unsupported
- `1:45 / 210g` unchanged
- 約 `3:30` は drawdown / finish target guidance であり、正確な完了時刻や結果の保証ではない

## 10. 375×667 Risk Map

この section は risk map であり、CSS 変更や production UI 実装を承認しません。

| Risk | Current mitigation confirmed from source | Remaining risk / validation need |
| --- | --- | --- |
| CTA overlap | Bottom Tabs 高さ、safe-area、sticky CTA 用 padding がある。 | Home / Setup の long content と CTA 到達性を **requires 375×667 validation** |
| Bottom navigation overlap | Timer / Finish では Bottom Tabs を隠す。shell page には bottom padding がある。 | long Japanese content、dynamic text、keyboard 時の overlap を検証 |
| Safe area | `env(safe-area-inset-bottom)` を使用する。 | 実 iPhone / standalone PWA は **not verified in this audit** |
| Long Japanese labels | max-width 390px rules と wrapping がある。 | timer-critical labels、status pills、caution の折返しを検証 |
| Dense panels | compact rules と gap reduction がある。 | Setup、Settings、Timer caution の scroll burden を検証 |
| Large timer numerals | responsive clamp と compact Timer style がある。 | Target Total と elapsed の優先順位が崩れないか検証 |
| Scroll burden | Timer controls は sticky。 | Target Total / current instruction / next step を同時に把握できるか検証 |
| Keyboard interaction | form inputs は存在する。 | soft keyboard と CTA / Bottom Tabs / scroll position の関係は未確認 |
| Tap target size | Timer controls は source 上 52-64px 程度の min-height を持つ。 | 全主要 action の実タップ性は **requires browser validation** |
| Horizontal overflow | responsive rules と min-width guards がある。 | 実データ、長い method 名、dynamic text での overflow を検証 |

## 11. Problem Priority Table

| Priority | Problem | Evidence level | Affected area | Recommended next PR | Implementation caution |
| --- | --- | --- | --- | --- | --- |
| P0 | Target Total hierarchy validation | source-confirmed hierarchy + inferred comprehension gap | Brew Timer | PR-V2-04 prototype, then PR-V2-05 QA | calculations / schedules を変更しない |
| P0 | 375×667 Brew Timer glanceability | source-confirmed responsive structure; real use not verified here | Brew Timer | PR-V2-04 / PR-V2-05 | Target Total、controls、instruction を同時検証 |
| P0 | source/provenance safety visibility | source-confirmed fields and current UI; optimal compact placement unresolved | Setup / Timer / History Detail | PR-V2-03 acceptance criteria; later PR-V2-12 | fields と non-official posture を弱めない |
| P0 | small viewport CTA / control risk | source-confirmed sticky / safe-area mitigation; residual risk inferred | Home / Setup / Timer / Settings | PR-V2-03 / PR-V2-05 | overflow、keyboard、safe area を実機相当で確認 |
| P0 | Japanese label clarity for timer-critical states | mixed Japanese / English labels confirmed; comprehension not tested | Brew Timer | PR-V2-04 prototype | 意味と unresolved state を短縮で失わない |
| P1 | Brew Result minimal feedback design | existing multi-field finish flow confirmed | Brew Finish / Result | PR-V2-06 | `BrewResult` schema changeは別判断 |
| P1 | History improvement log design | existing list/detail/rebrew loop confirmed | History / Detail | PR-V2-08 / PR-V2-09 | analytics dashboard 化しない |
| P1 | PWA install / update guidance | PWA source confirmed; in-app guidance gap confirmed | Settings / Data | PR-V2-13 | install / offline を保証しない |
| P1 | JSON import / restore design | export exists; restore absent | Settings / Data | PR-V2-10 | design only before implementation |
| P1 | History edit / individual delete design | repository helper exists; UI absent | History Detail | PR-V2-11 | snapshot、誤削除、rollback を先に設計 |
| P1 | Next Cup Hint rules | next adjustment memo exists; automated hint absent | Result / History Detail | PR-V2-07 | explainable rule-based candidate only; no AI diagnosis |
| P2 | taste tag refinement | current fixed tags confirmed | Brew Finish / History | later bounded PR | 入力負荷を増やさない |
| P2 | sound / vibration polish | settings UI / persistence confirmed; full runtime effect not verified here | Settings / Timer | later bounded PR | browser capability と non-guarantee を明示 |
| P2 | drawdown status refinement | source guidance exists; result field absent | Timer / Result | PR-V2-06 candidate | exact completion guarantee をしない |
| P2 | method detail expansion | limited method scope confirmed | Setup / Sources | later research/design PR | scope と provenance を先に確認 |
| Later | dark theme / theme switcher | current settings has theme choices; Ver2 initial identityでは非優先 | App-wide | separate later validation | app-wide redesignへ広げない |
| Later | simple bean tags only if proven useful | not present | Result / History | separate hypothesis PR | heavy inventory を導入しない |
| Later | broader method expansion | limited method scope is a current strength | Home / Setup | separate research/data PR | source evidence と QA を必須にする |
| Later | advanced comparison views | comparison absent | History | separate later design PR | analytics dashboard 化しない |
| Avoid | Bluetooth / AR / AI diagnosis / LLM recipe generation | outside product scope | App-wide | none in initial Ver2.0 | 導入しない |
| Avoid | cloud sync / account / subscription / SNS / community | conflicts with current local-first scope | App-wide | none in initial Ver2.0 | 導入しない |
| Avoid | heavy bean inventory / water chemistry / TDS / large analytics / marketplace | feature breadth and friction risk | App-wide | none in initial Ver2.0 | 導入しない |

## 12. Recommended Next PRs

既存の [`PR_ROADMAP.md`](./PR_ROADMAP.md) を静かに書き換えず、次の順序を維持します。

1. **PR-V2-03: Visual System / Design Token Planning**
   - P0 acceptance criteria として、Target Total hierarchy、timer-critical Japanese labels、source/provenance state、375×667、contrast、focus、tap target を明文化する。
   - generated mock の exact value / code / asset を production source として採用しない。
2. **PR-V2-04: Brew Timer Cockpit Prototype**
   - production implementation と区別した prototype として、Target Total、elapsed、current instruction、This Pour、next step、timeline、controls を比較検証する。
   - timer calculations、method schedules、step progression、THE NEO BREW constraints を変更しない。
3. **PR-V2-05: 375×667 Timer Cockpit QA**
   - 実データ、長い日本語、placeholder、10-step schedule、safe area、controls、horizontal overflow を検証する。

PR-V2-03 で P0 acceptance criteria を十分に定義できない場合のみ、PR-V2-04 prototype adoption の前に小さい docs-only bridge PR を提案します。これは roadmap の自動変更ではなく、独立した scope / approval が必要な planning candidate です。

## 13. Non-goals and Guardrails

この監査は次を承認しません。

- production UI implementation、app-wide redesign、CSS change
- recipe calculation、method schedule、timer calculation、step progression の変更
- new schema、migration、storage key change
- JSON import / restore implementation
- History edit / individual delete implementation
- Bluetooth、AR、AI diagnosis、LLM recipe generation
- cloud sync、account、subscription
- SNS / community、recipe marketplace
- heavy bean inventory、water chemistry / TDS tracking、large analytics dashboard
- generated Stitch / Figma / Claude Design code or assets の直接利用

すべての将来変更は、専用の bounded design / implementation / QA PR と、source/provenance、mobile、data safety、legal safety の再確認を必要とします。
