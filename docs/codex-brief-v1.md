Pourō Codex投入用仕様 v1
本仕様は、Google Docs「Pourō Master Spec v1 Draft」をもとに、Codexへそのまま投入できる実装仕様として再整理したものです。MVPは「ハンドドリップ中に迷わないための、静かなブリューガイド＆タイマー」に限定し、レシピ値・注湯量・ステップ文言は原典確認完了まで placeholder / needsReview として扱います。

1. 実装目的
1-1. Product Definition
項目
仕様
アプリ名
Pourō
ロゴ表記
pourō
タグライン
Pour slowly. Brew deeply.
種別
ハンドドリップ専用ブリューガイド＆タイマーPWA
位置づけ
静かな抽出補助具
コア体験
抽出中に「今何をするか」「何g注ぐか」「次に何が来るか」が分かる
記録体験
抽出後の気づき・評価・次回改善メモを残す
MVPの主目的
抽出手順・時間・湯量・記録を整理し、次の一杯へつなげる
実装方針
高機能なコーヒー管理アプリにはしない

Pourō v1は、抽出中の迷いを減らすためのPWAです。ログイン、クラウド同期、SNS、豆在庫、統計、Bluetooth連携などには広げません。

2. 技術構成
項目
採用仕様
フレームワーク
React
言語
TypeScript
ビルド
Vite
アプリ形態
PWA
保存
localStorage
外部API
なし
ログイン
なし
広告
なし
Analytics
なし
クラウド同期
なし
最小表示基準
iPhone SE相当 375×667 CSS px
PWA構成
manifest.json / Service Worker
デプロイ想定
静的ホスティング可能な構成

技術方針は、React + TypeScript + Vite、localStorage保存、PWA、外部APIなし、ログインなしで確定です。

3. 実装対象画面
3-1. MVP P0画面
画面ID
画面名
目的
Bottom Tabs
brew-home
Brew Home
抽出メソッドを選ぶ
表示
recipe-setup
Recipe Setup
最低限の抽出条件を設定する
表示または非表示。実装は任意だが、被り禁止
brew-timer
Brew Timer
抽出中の実行ガイド
非表示
brew-finish
Brew Finish
抽出結果を軽く記録する
非表示推奨
history
History
過去の抽出記録を見る
表示
history-detail
History Detail
1回分の抽出詳細を見る
表示または戻る導線
settings
Settings
設定・法務・プライバシー情報
表示

Master Specでは、MVP必須画面は Brew Home / Recipe Setup / Brew Timer / Brew Finish / History / History Detail / Settings の7画面です。
3-2. Bottom Tabs
Tab
遷移先
備考
Brew
/
Brew Homeへ
History
/history
履歴一覧へ
Settings
/settings
設定・About・Legalへ

採用するBottom Tabsは Brew / History / Settings の3つのみです。Beans、Journal、Recipes、Community、Profileは実装しません。

4. 画面遷移
4-1. 基本フロー
Brew Home
  ↓ メソッド選択
Recipe Setup
  ↓ 抽出を開始する
Brew Timer
  ↓ Finish
Brew Finish
  ↓ 保存する / 記録せず終了
History または Brew Home

4-2. 履歴フロー
History
  ↓ 履歴カード選択
History Detail
  ↓ 同じ条件で再抽出
Recipe Setup

4-3. 設定・法務フロー
Settings
  ├─ このアプリについて
  ├─ 出典・参考情報
  ├─ 免責事項
  ├─ プライバシーポリシー
  └─ データ初期化

4-4. 遷移ルール
操作
遷移先
仕様
Brew HomeでCTA押下
Recipe Setup
選択中メソッドIDを渡す
Recipe Setupで開始
Brew Timer
setupSnapshotを生成
Brew TimerでFinish
Brew Finish
sessionSnapshotを渡す
Brew Finishで保存
History Detail または History
保存後の記録を表示
Brew Finishで記録せず終了
Brew Home
セッションは保存しない
History Detailで再抽出
Recipe Setup
methodSnapshot / setupSnapshotを再利用
Settingsで全削除
Settings
確認ダイアログ必須


5. ルーティング設計
React Routerの使用は任意です。軽量実装を優先する場合は、内部状態による画面切替でも可とします。ただし、画面IDと状態管理は以下に準拠してください。
5-1. 推奨ルート
Path
Component
説明
/
BrewHomePage
メソッド選択
/setup/:methodId
RecipeSetupPage
抽出条件設定
/timer
BrewTimerPage
抽出タイマー
/finish
BrewFinishPage
抽出結果保存
/history
HistoryPage
履歴一覧
/history/:sessionId
HistoryDetailPage
履歴詳細
/settings
SettingsPage
設定
/settings/about
AboutPage
このアプリについて
/settings/sources
SourcesPage
出典・参考情報
/settings/legal
LegalPage
免責事項
/settings/privacy
PrivacyPage
プライバシーポリシー

5-2. 実装上の注意
項目
仕様
Timer画面への直アクセス
activeSessionがなければ Brew Home に戻す
Finish画面への直アクセス
finishedSessionがなければ Brew Home に戻す
存在しないmethodId
Brew Homeに戻す
存在しないhistory ID
Historyに戻す
Bottom Tabs
Timer中は非表示
戻る導線
Timer以外の詳細画面には戻るボタンを設置


6. データ型定義
以下の型を基準に実装してください。
export type SourceStatus =
  | "verified"
  | "thirdParty"
  | "placeholder"
  | "needsReview";

export type VerificationLevel =
  | "official"
  | "primary"
  | "manufacturer"
  | "competition"
  | "book"
  | "thirdParty"
  | "unverified"
  | "placeholder";

export type MethodStatus =
  | "candidate"
  | "available"
  | "disabled"
  | "needsReview";

export type TimerStatus =
  | "idle"
  | "running"
  | "paused"
  | "finished"
  | "cancelled";

export interface BrewMethod {
  id: string;
  displayName: string;
  shortName: string;
  shortDescription: string;
  longDescription: string;
  iconKey: string;

  methodStatus: MethodStatus;
  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;

  sourceTitle?: string;
  sourceUrl?: string;
  sourceNote?: string;

  legalNote: string;
  recipe: BrewRecipe;
}

export interface BrewRecipe {
  recipeId: string;
  methodId: string;

  coffeeGrams: number | null;
  waterGrams: number | null;
  ratio: number | null;
  waterTempCelsius: number | null;
  grindSizeLabel: string | null;
  totalTimeSec: number | null;

  valuesArePlaceholder: boolean;
  needsReviewReason: string;

  steps: BrewStep[];
}

export interface BrewStep {
  id: string;
  order: number;

  startSec: number | null;
  endSec: number | null;

  title: string;
  actionLabel: string;

  pourGrams: number | null;
  totalWaterGrams: number | null;

  instruction: string;
  nextPreview: string | null;

  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;
  isPlaceholder: boolean;
}

export interface BrewSetup {
  methodId: string;

  coffeeGrams: number;
  ratio: number;
  waterGrams: number;

  waterTempMemo: string;
  grindMemo: string;
  freeMemo: string;

  createdAt: string;
}

export interface BrewSession {
  id: string;

  methodId: string;
  methodSnapshot: BrewMethod;
  setupSnapshot: BrewSetup;

  timerStatus: TimerStatus;

  startedAtIso: string;
  finishedAtIso: string | null;

  startedAtMs: number;
  pausedAtMs: number | null;
  totalPausedMs: number;

  elapsedMsAtFinish: number | null;

  currentStepIndex: number;

  completed: boolean;
  cancelled: boolean;

  result: BrewResult | null;
}

export interface BrewResult {
  tasteImpression: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  nextAdjustmentMemo: string;
  freeMemo: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrewSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  sleepLockGuideShown: boolean;
}

export interface StorageSchema {
  version: 1;
  brewHistory: BrewSession[];
  settings: BrewSettings;
}

Master Specでは、BrewMethod / BrewStep / BrewRecipe / BrewSetup / BrewSession / BrewSettings / TasteNote / TimerState / SourceStatus が最低限必要な型として整理されています。

7. placeholderメソッドデータ仕様
7-1. 基本方針
MVPでは、UI構造として4カードを実装してよい。ただし、メソッド名・レシピ値・ステップは確定扱いにしない。未確認値はすべて placeholder / needsReview として管理します。
7-2. Brew Home表示メソッド
Brew Homeは2×2カード構成のため、初期表示は4件に限定します。
id
表示名
shortDescription
sourceStatus
verificationLevel
recipe
four-six
4:6 Method
味と濃度の設計を意識する抽出
placeholder
placeholder
placeholder
hybrid
Hybrid Method
浸漬と透過を組み合わせる抽出
needsReview
unverified
placeholder
new-hybrid
New Hybrid Method
温度や工程変化を含む抽出候補
needsReview
unverified
placeholder
ten-pour
10 Pour Method
複数回の注湯で組み立てる抽出候補
needsReview
unverified
placeholder

7-3. Ice Brewの扱い
項目
扱い
Ice Brew / 急冷式系
MVP P0のHomeカードには出さない
理由
2×2カード構成を維持するため
データ構造
将来追加できるよう futureMethods またはコメントで保持してよい
UI表示
しない
Codexへの指示
実装しない。データ構造拡張のみ可

7-4. placeholderステップ例
実装確認用に、Timerが動く最小限の仮ステップを置いてよい。ただし、画面上に「レシピ値確認中」を必ず表示し、確定レシピとして見せないでください。
export const placeholderSteps: BrewStep[] = [
  {
    id: "placeholder-step-1",
    order: 1,
    startSec: 0,
    endSec: 30,
    title: "Step 1",
    actionLabel: "Pour --g",
    pourGrams: null,
    totalWaterGrams: null,
    instruction: "このステップ文言は確認中です。",
    nextPreview: "Next 00:30 / Pour --g",
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    isPlaceholder: true,
  },
  {
    id: "placeholder-step-2",
    order: 2,
    startSec: 30,
    endSec: 60,
    title: "Step 2",
    actionLabel: "Pour --g",
    pourGrams: null,
    totalWaterGrams: null,
    instruction: "このステップ文言は確認中です。",
    nextPreview: "Next 01:00 / Pour --g",
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    isPlaceholder: true,
  },
];

7-5. placeholder表示ルール
場所
表示ルール
Brew Home
メソッド概要のみ。レシピ値を出さない
Recipe Setup
レシピ値確認中バッジを表示
Brew Timer
Pour --g / Total --g を許可。確定値のように見せない
Brew Finish
保存時に methodSnapshot.sourceStatus を保持
History
placeholderで抽出した記録だと分かるラベルを表示
Settings / Sources
原典確認中の説明を表示


8. sourceStatus / verificationLevel仕様
8-1. SourceStatus
値
意味
実装可否
verified
一次情報・公式情報により確認済み
本実装値として表示可
thirdParty
第三者情報を参考にした値
参考値として表示可。注意書き必須
placeholder
UI・動作確認用の仮値
確定値として表示禁止
needsReview
確認が必要
レシピ値として表示禁止

Master Specでは、原典未確認のレシピ値はすべて placeholder として扱う方針です。
8-2. VerificationLevel
値
意味
例
official
公式ページ、本人・団体の直接発信
公式サイト等
primary
本人発信・原資料に近い情報
本人動画、本人記事等
manufacturer
メーカー公式資料
器具メーカー資料
competition
大会関連情報
World Brewers Cup等
book
書籍
書籍・紙面
thirdParty
第三者記事
メディア記事、レビュー等
unverified
未検証
確認待ち
placeholder
仮データ
UI動作確認用

8-3. 表示制御
条件
UI表示
sourceStatus === "verified"
通常表示
sourceStatus === "thirdParty"
参考情報 バッジを表示
sourceStatus === "placeholder"
レシピ値確認中 バッジを表示
sourceStatus === "needsReview"
要確認 バッジを表示
valuesArePlaceholder === true
TimerでもRecipe Setupでも注意表示必須

8-4. 実装ガード
export function canDisplayAsConfirmed(method: BrewMethod): boolean {
  return (
    method.sourceStatus === "verified" &&
    method.verificationLevel !== "placeholder" &&
    method.recipe.valuesArePlaceholder === false
  );
}

export function getRecipeStatusLabel(method: BrewMethod): string {
  if (method.sourceStatus === "verified") return "確認済み";
  if (method.sourceStatus === "thirdParty") return "参考情報";
  if (method.sourceStatus === "needsReview") return "要確認";
  return "レシピ値確認中";
}


9. Timer状態管理
9-1. Timer状態
状態
意味
idle
開始前
running
計測中
paused
一時停止中
finished
完了
cancelled
中止

Timer状態は idle / running / paused / finished / cancelled で確定し、経過時間は Date.now() を基準に計算します。
9-2. 経過時間計算
setIntervalで秒数を加算しないでください。
elapsedMs = Date.now() - startedAtMs - totalPausedMs;

Pause中は pausedAtMs を保持し、Resume時に以下を実行します。
totalPausedMs += Date.now() - pausedAtMs;
pausedAtMs = null;

9-3. Back / Next仕様
Master Specでは、Back / Nextは時間そのものを変更せず、表示中ステップを変更すると整理されています。
操作
仕様
Back
currentStepIndex を1つ戻す
Next
currentStepIndex を1つ進める
最終ステップのNext
Finishに切り替える
Pause
中央配置
Finish
Brew Finishへ遷移
Cancel
MVPでは必須ではない。実装する場合は確認ダイアログ必須

9-4. 表示構成
Brew Timerの最終表示構成は以下で固定します。
[経過時間]
[Pour XXg]
[Total XXXg]
[現在ステップの短文]
[Next 00:00 / Pour XXg]
[Back] [Pause] [Next]

9-5. Timer UI要件
項目
要件
経過時間
上部に大きく表示
Pour XXg
最重要アクションとして中央最大級
Total XXXg
Pourの下に表示
現在ステップ
最大2行程度
Next予告
Next 00:00 / Pour XXg
操作ボタン
下部に大きく配置
Bottom Tabs
Timer中は非表示
placeholder時
Pour --g / Total --g 表示可。ただし「確認中」表示必須


10. localStorage保存仕様
10-1. 保存キー
key
内容
pouro.storage.version
ストレージバージョン
pouro.brewHistory.v1
抽出履歴
pouro.settings.v1
設定
pouro.activeSession.v1
進行中セッション。P0では保存のみ、復元UIは任意

MVPではlocalStorageで確定し、将来IndexedDBへ移行できるようRepository層を分けます。
10-2. 保存対象
対象
保存内容
History
BrewSession[]
Session
methodSnapshot, setupSnapshot, result
Settings
soundEnabled, vibrationEnabled, sleepLockGuideShown
Active Session
抽出中のセッション状態。復元UIはP1でも可

10-3. 保存しないもの
項目
理由
個人アカウント
MVP対象外
メールアドレス
収集しない
位置情報
不要
外部API送信用データ
外部APIなし
Analytics用イベント
Analyticsなし

10-4. 保存仕様
項目
仕様
最大履歴件数
100件
並び順
新しい順
超過時
古い履歴から削除
保存失敗
UIに控えめなエラーを表示
データ初期化
確認ダイアログ必須
全削除後
Brew HomeまたはSettingsへ戻す
JSON parse失敗
空配列で復旧。破損データは破棄可

10-5. Repository層
export interface BrewHistoryRepository {
  getAll(): BrewSession[];
  getById(id: string): BrewSession | null;
  save(session: BrewSession): void;
  deleteById(id: string): void;
  clear(): void;
}

export interface SettingsRepository {
  get(): BrewSettings;
  save(settings: BrewSettings): void;
}


11. UI/UX制約
11-1. 全体デザイン
項目
仕様
背景
warm cream
本文
deep charcoal
アクセント
amber / brown
ロゴ
serif logo、表記は pourō
本文フォント
sans-serif
アイコン
thin line icons
カード
soft card surfaces
影
restrained shadows
余白
generous spacing
印象
calm editorial coffee tool feeling

UI方針は、warm cream / deep charcoal / amber-brownを基調にした、静かで上質な道具感です。
11-2. CSS変数
:root {
  --color-bg: #F7F1E8;
  --color-surface: #FFF9F0;
  --color-surface-muted: #EFE4D6;
  --color-text: #17212B;
  --color-text-muted: #6F6258;
  --color-accent: #B9823B;
  --color-accent-soft: #E6C28E;
  --color-border: #D8CBBE;

  --radius-card: 20px;
  --radius-button: 999px;

  --shadow-soft: 0 8px 24px rgba(23, 33, 43, 0.08);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;

  --font-logo: Georgia, "Times New Roman", serif;
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

11-3. iPhone SE制約
項目
要件
最小基準
375×667 CSS px
タップ領域
最低44×44 CSS px
推奨タップ領域
48×48 CSS px
コントラスト
通常テキストは4.5:1以上を目安
CTA
Bottom Tabsと重ねない
Timer
数字の視認性を最優先
キーボード表示
Recipe Setup / Brew FinishでCTAが隠れないよう配慮

iPhone SE制約として、375×667 CSS px、CTAとBottom Tabsの非干渉、主要ボタン44px以上、Timer数字の視認性優先が整理されています。
11-4. Brew Home制約
表示する
表示しない
ロゴ pourō
豆量
タグライン
比率
2×2メソッドカード
総湯量
選択中メソッド説明
湯温
CTA「レシピ設定へ」
挽き目
Bottom Tabs
詳細設定


ダッシュボード的情報

Brew Homeはメソッド選択専用であり、Dose / Ratio / 湯温 / 詳細設定を表示しない方針です。

12. PWA要件
12-1. manifest.json
項目
値
name
Pourō
short_name
Pourō
description
A quiet brew guide and timer for pour-over coffee.
display
standalone
start_url
/
scope
/
background_color
#F7F1E8
theme_color
#17212B
orientation
portrait 推奨
icons
192×192、512×512

12-2. Service Worker
項目
仕様
キャッシュ対象
HTML / CSS / JS / manifest / icons
外部API
なし
オフライン
初回読み込み後、主要画面を表示可能
履歴保存
Service Worker更新で消えないこと
キャッシュ戦略
App Shellのみで可

12-3. PWA確認項目
項目
確認
manifest読込
DevToolsで確認
standalone表示
ホーム画面追加後に確認
オフライン起動
初回表示後に確認
localStorage維持
reload / SW更新後も履歴が残る
iOS Safari
画面高さ・safe areaを確認
Android Chrome
インストール導線を確認


13. Settings / About / Legalページ仕様
13-1. Settings構成
セクション
内容
基本設定
サウンド、バイブレーション
画面スリープ
P0では案内表示。Wake Lock APIは必須にしない
データ
履歴全削除
アプリ情報
このアプリについて
出典
出典・参考情報
法務
免責事項
プライバシー
プライバシーポリシー

Settingsには、サウンド、バイブレーション、画面スリープ対策案内、データ初期化、アプリ情報、出典・参考情報、免責事項、プライバシー方針を含めます。
13-2. 必須注意書き
Pourōは、ハンドドリップコーヒーの抽出手順、時間、湯量、記録を整理するための非公式ブリューガイド＆タイマーです。

本アプリは、粕谷哲氏、PHILOCOFFEA、HARIOその他の個人・団体・メーカーによる公式・公認・監修・提携アプリではありません。

アプリ内で言及する抽出メソッド、人物名、メーカー名、器具名は、出典・互換性・参考情報の説明を目的として記載しています。各名称はそれぞれの権利者に帰属します。

抽出結果は、豆、焙煎度、挽き目、湯温、器具、注湯速度、環境により変化します。本アプリは特定の味や抽出結果を保証するものではありません。

この文言はMaster Specのアプリ内注意書きに基づきます。
13-3. プライバシー文言
PourōはMVP時点でログイン、外部API、広告、Analytics、クラウド同期を使用しません。

抽出記録と設定は、ユーザーの端末内のlocalStorageに保存されます。

入力内容は外部サーバーへ送信されません。

ブラウザまたは端末のデータ削除操作を行うと、保存された履歴が削除される場合があります。

MVP時点のプライバシー方針は、ログインなし、外部APIなし、広告なし、アクセス解析なし、個人情報収集なし、抽出記録・設定は端末内保存です。
13-4. 外部公開文言
外部公開・Aboutでは、「原典に忠実」という強い表現を避け、以下の表現を使います。
公開情報・書籍・メーカー資料等を参考に、Pourōが独自に整理した抽出ガイドです。

「原典に忠実」は内部コンセプトに留め、公開文言では弱める方針です。

14. 実装禁止事項
14-1. 機能面の禁止
禁止事項
理由
ログイン
MVP外
アカウント作成
MVP外
外部API
MVP外
広告
MVP外
Analytics
MVP外
クラウド同期
MVP外
SNS投稿
高機能化防止
コミュニティ
高機能化防止
レシピ投稿
MVP外
いいね / コメント / フォロー
SNS化防止
大量レシピ集
コンセプトから外れる
豆在庫管理
MVP外
水質管理
MVP外
焙煎ログ
MVP外
Bluetoothスケール連携
MVP外
課金 / サブスク
MVP外
AI味覚診断
MVP外
複雑な統計ダッシュボード
MVP外

これらはMaster Spec上でMVP不採用として確定しています。
14-2. UI面の禁止
禁止事項
Brew Homeのダッシュボード化
HomeにDose / Ratio / 湯温 / 詳細設定を表示
Timer画面の小さい数字
Timer画面の長文説明
過剰なアニメーション
派手な通知演出
黒背景ネオン
ゲームUI
SF調
SNSアプリ風
カフェ注文アプリ風
過度なグラスモーフィズム
Apple純正UIのコピー
SF Symbolsのトレース
競合アプリの画面構造コピー
Blue Bottle等の特定ブランド模倣

UIでの不採用事項はMaster Specで明示されています。
14-3. 表現面の禁止
以下の文言は使わないでください。
禁止文言
公式
公認
監修
提携
粕谷氏公式アプリ
本人監修
完全再現
必ず同じ味になる
世界大会の味を再現
公式レシピ搭載
誰でもプロ級
失敗しない
原典そのまま
必ず美味しくなる

法務チャットの統合結果として、許諾がない限り上記表現は禁止です。

15. QAチェック項目
15-1. 機能QA
項目
チェック
Brew Home
2×2カード、説明カード、CTAが表示される
Brew Home
豆量・比率・湯温・詳細設定が表示されていない
Recipe Setup
豆量、比率、総湯量、湯温メモ、挽き目メモが入力できる
Recipe Setup
総湯量が豆量×比率で自動計算される
Brew Timer
経過時間、Pour、Total、現在ステップ、Next予告が表示される
Brew Timer
Back / Pause / Next が動作する
Brew Timer
最終ステップでNextがFinishに変わる
Brew Finish
結果を保存できる
History
新しい順に履歴が表示される
History Detail
1回分の詳細が表示される
Settings
全削除時に確認ダイアログが出る
Settings
注意書き、出典、免責、プライバシーが見られる

15-2. Timer QA
項目
チェック
Date.now基準
setInterval加算方式になっていない
Pause
Pause中にelapsedが進まない
Resume
停止時間がtotalPausedMsに加算される
Back
時間ではなくステップ表示が戻る
Next
時間ではなくステップ表示が進む
バックグラウンド復帰
復帰時に破綻しない
placeholder
Pour --gなどが確認中表示とセットになっている

15-3. UI QA
項目
チェック
iPhone SE
375×667で主要UIが破綻しない
CTA
Bottom Tabsと重ならない
Timer
数字が十分大きい
Timer
長文説明になっていない
ボタン
44×44 CSS px以上
コントラスト
通常文字が読みやすい
色依存
状態が色だけで表現されていない
アイコン
既存アイコンのトレースに見えない

15-4. PWA QA
項目
チェック
manifest
読み込まれている
icons
192 / 512が設定されている
Service Worker
登録される
オフライン
主要画面が開ける
localStorage
SW更新後も履歴が残る
standalone
ホーム追加後に起動できる

15-5. 法務・表記QA
項目
チェック
禁止語
公式、公認、監修、完全再現等がない
placeholder
未確認値が確定値に見えない
About
非公式注意書きがある
Legal
権利者帰属と非保証文言がある
Privacy
localStorage保存と外部送信なしが明記されている
出典
sourceStatus / verificationLevelがデータにある


16. PR分割案
PR 1：プロジェクト基盤
内容
完了条件
Vite + React + TypeScriptセットアップ
dev server起動
ディレクトリ構成
pages / components / data / hooks / repositories / types
CSS変数
基本テーマが適用される
App Shell
画面枠とBottom Tabsが表示される

PR 2：型定義・placeholderデータ
内容
完了条件
TypeScript型定義
型エラーなし
SourceStatus / VerificationLevel
実装済み
placeholderメソッド4件
Brew Homeで読める
レシピ確認中ラベル
表示できる

PR 3：Brew Home / Recipe Setup
内容
完了条件
Brew Home
2×2カード、説明、CTA
Recipe Setup
豆量、比率、総湯量、湯温メモ、挽き目メモ
Home制約
Homeに詳細設定を出さない
iPhone SE確認
CTAが被らない

PR 4：Timer基盤
内容
完了条件
Timer状態
idle/running/paused/finished/cancelled
Date.now計算
setInterval加算なし
Pause/Resume
正常動作
Back/Next
ステップ移動
Finish
Brew Finishへ遷移

PR 5：Brew Finish / History
内容
完了条件
Brew Finish
結果入力・保存
localStorage Repository
保存・取得・削除
History
新しい順で一覧
History Detail
詳細表示
再抽出導線
Recipe Setupへ戻る

PR 6：Settings / Legal / Privacy
内容
完了条件
Settings
最小設定
About
アプリ説明
Sources
出典・参考情報
Legal
非公式・免責文言
Privacy
localStorage・外部送信なし
全削除
確認ダイアログ付き

PR 7：PWA / QA調整
内容
完了条件
manifest
設定済み
Service Worker
App Shellキャッシュ
icons
192 / 512
iPhone SE調整
375×667で確認
QA修正
主要チェック完了


17. Codexへ貼る最終プロンプト
あなたは、ハンドドリップコーヒー専用PWA「Pourō」の実装担当エンジニアです。
以下の仕様に従い、React + TypeScript + ViteでMVPを実装してください。

# 1. 実装目的

Pourōは、ハンドドリップ中の迷いを減らすための、静かなブリューガイド＆タイマーPWAです。

高機能なコーヒー管理アプリではありません。
抽出手順・時間・湯量・記録を整理し、次の一杯へつなげる抽出補助具として設計してください。

アプリ名：Pourō
ロゴ表記：pourō
タグライン：Pour slowly. Brew deeply.
初期公開形態：PWA
保存：localStorage
外部通信：なし

# 2. 技術構成

- React
- TypeScript
- Vite
- PWA
- localStorage
- 外部APIなし
- ログインなし
- 広告なし
- Analyticsなし
- クラウド同期なし
- iPhone SE 375×667 CSS pxを最小表示基準にする

# 3. 実装対象画面

以下の7画面を実装してください。

1. Brew Home
2. Recipe Setup
3. Brew Timer
4. Brew Finish
5. History
6. History Detail
7. Settings

Bottom Tabsは以下の3つのみです。

- Brew
- History
- Settings

Beans、Journal、Recipes、Community、Profileなどは追加しないでください。

# 4. 画面遷移

基本フロー：

Brew Home
→ Recipe Setup
→ Brew Timer
→ Brew Finish
→ History または Brew Home

履歴フロー：

History
→ History Detail
→ 同じ条件で再抽出
→ Recipe Setup

設定フロー：

Settings
→ このアプリについて
→ 出典・参考情報
→ 免責事項
→ プライバシーポリシー
→ データ初期化

# 5. ルーティング設計

React Routerを使う場合は以下を推奨します。
軽量化のために内部状態で画面切替しても構いませんが、画面IDと状態管理はこの仕様に合わせてください。

- / : BrewHomePage
- /setup/:methodId : RecipeSetupPage
- /timer : BrewTimerPage
- /finish : BrewFinishPage
- /history : HistoryPage
- /history/:sessionId : HistoryDetailPage
- /settings : SettingsPage
- /settings/about : AboutPage
- /settings/sources : SourcesPage
- /settings/legal : LegalPage
- /settings/privacy : PrivacyPage

Timer画面ではBottom Tabsを非表示にしてください。
Timer画面へ直接アクセスされた場合、activeSessionがなければBrew Homeへ戻してください。
Finish画面へ直接アクセスされた場合、finishedSessionがなければBrew Homeへ戻してください。

# 6. データ型定義

以下の型を基準にしてください。

export type SourceStatus =
  | "verified"
  | "thirdParty"
  | "placeholder"
  | "needsReview";

export type VerificationLevel =
  | "official"
  | "primary"
  | "manufacturer"
  | "competition"
  | "book"
  | "thirdParty"
  | "unverified"
  | "placeholder";

export type MethodStatus =
  | "candidate"
  | "available"
  | "disabled"
  | "needsReview";

export type TimerStatus =
  | "idle"
  | "running"
  | "paused"
  | "finished"
  | "cancelled";

export interface BrewMethod {
  id: string;
  displayName: string;
  shortName: string;
  shortDescription: string;
  longDescription: string;
  iconKey: string;

  methodStatus: MethodStatus;
  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;

  sourceTitle?: string;
  sourceUrl?: string;
  sourceNote?: string;

  legalNote: string;
  recipe: BrewRecipe;
}

export interface BrewRecipe {
  recipeId: string;
  methodId: string;

  coffeeGrams: number | null;
  waterGrams: number | null;
  ratio: number | null;
  waterTempCelsius: number | null;
  grindSizeLabel: string | null;
  totalTimeSec: number | null;

  valuesArePlaceholder: boolean;
  needsReviewReason: string;

  steps: BrewStep[];
}

export interface BrewStep {
  id: string;
  order: number;

  startSec: number | null;
  endSec: number | null;

  title: string;
  actionLabel: string;

  pourGrams: number | null;
  totalWaterGrams: number | null;

  instruction: string;
  nextPreview: string | null;

  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;
  isPlaceholder: boolean;
}

export interface BrewSetup {
  methodId: string;

  coffeeGrams: number;
  ratio: number;
  waterGrams: number;

  waterTempMemo: string;
  grindMemo: string;
  freeMemo: string;

  createdAt: string;
}

export interface BrewSession {
  id: string;

  methodId: string;
  methodSnapshot: BrewMethod;
  setupSnapshot: BrewSetup;

  timerStatus: TimerStatus;

  startedAtIso: string;
  finishedAtIso: string | null;

  startedAtMs: number;
  pausedAtMs: number | null;
  totalPausedMs: number;

  elapsedMsAtFinish: number | null;

  currentStepIndex: number;

  completed: boolean;
  cancelled: boolean;

  result: BrewResult | null;
}

export interface BrewResult {
  tasteImpression: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  nextAdjustmentMemo: string;
  freeMemo: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrewSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  sleepLockGuideShown: boolean;
}

export interface StorageSchema {
  version: 1;
  brewHistory: BrewSession[];
  settings: BrewSettings;
}

# 7. placeholderメソッドデータ仕様

MVPでは、UI構造として4カードを実装してください。
ただし、メソッド名・レシピ値・ステップ文言は確定扱いにしないでください。
原典確認が終わるまで、未確認値はすべて placeholder / needsReview として扱ってください。

Brew Home表示メソッドは以下の4件です。

1. 4:6 Method
   - id: four-six
   - shortDescription: 味と濃度の設計を意識する抽出
   - sourceStatus: placeholder
   - verificationLevel: placeholder
   - recipe values: placeholder

2. Hybrid Method
   - id: hybrid
   - shortDescription: 浸漬と透過を組み合わせる抽出
   - sourceStatus: needsReview
   - verificationLevel: unverified
   - recipe values: placeholder

3. New Hybrid Method
   - id: new-hybrid
   - shortDescription: 温度や工程変化を含む抽出候補
   - sourceStatus: needsReview
   - verificationLevel: unverified
   - recipe values: placeholder

4. 10 Pour Method
   - id: ten-pour
   - shortDescription: 複数回の注湯で組み立てる抽出候補
   - sourceStatus: needsReview
   - verificationLevel: unverified
   - recipe values: placeholder

Ice Brew / 急冷式系はMVP P0のHomeカードには出さないでください。
将来追加できるようデータ構造を拡張可能にするのは可ですが、UIには表示しないでください。

placeholderステップは、Timer動作確認用に最小限置いて構いません。
ただし、画面上に「レシピ値確認中」を必ず表示し、確定レシピとして見せないでください。

Pour表示は、未確認値の場合は「Pour --g」としてください。
Total表示は、未確認値の場合は「Total --g」としてください。

# 8. sourceStatus / verificationLevel仕様

SourceStatusの意味：

- verified: 一次情報・公式情報により確認済み
- thirdParty: 第三者情報を参考にした値
- placeholder: UI・動作確認用の仮値
- needsReview: 確認が必要

VerificationLevelの意味：

- official: 公式ページ、本人・団体の直接発信
- primary: 本人発信・原資料に近い情報
- manufacturer: メーカー公式資料
- competition: 大会関連情報
- book: 書籍
- thirdParty: 第三者記事
- unverified: 未検証
- placeholder: 仮データ

表示ルール：

- verified: 通常表示
- thirdParty: 「参考情報」バッジ
- placeholder: 「レシピ値確認中」バッジ
- needsReview: 「要確認」バッジ
- valuesArePlaceholder === true の場合、Recipe SetupとBrew Timerで注意表示必須

以下のようなガード関数を用意してください。

function canDisplayAsConfirmed(method: BrewMethod): boolean {
  return (
    method.sourceStatus === "verified" &&
    method.verificationLevel !== "placeholder" &&
    method.recipe.valuesArePlaceholder === false
  );
}

function getRecipeStatusLabel(method: BrewMethod): string {
  if (method.sourceStatus === "verified") return "確認済み";
  if (method.sourceStatus === "thirdParty") return "参考情報";
  if (method.sourceStatus === "needsReview") return "要確認";
  return "レシピ値確認中";
}

# 9. Timer状態管理

Timer状態：

- idle
- running
- paused
- finished
- cancelled

経過時間はDate.now()基準で計算してください。
setIntervalで秒数を加算する方式は禁止です。

基本式：

elapsedMs = Date.now() - startedAtMs - totalPausedMs

Pause時：

pausedAtMs = Date.now()

Resume時：

totalPausedMs += Date.now() - pausedAtMs
pausedAtMs = null

Back / Nextは時間そのものを変更せず、表示中ステップ currentStepIndex を変更してください。

Back:
currentStepIndexを1つ戻す。

Next:
currentStepIndexを1つ進める。

最終ステップ:
NextボタンをFinishに切り替える。

Finish:
Brew Finishへ遷移する。

Brew Timerの表示構成は以下で固定してください。

[経過時間]
[Pour XXg]
[Total XXXg]
[現在ステップの短文]
[Next 00:00 / Pour XXg]
[Back] [Pause] [Next]

placeholderの場合：

[経過時間]
[Pour --g]
[Total --g]
[このステップ文言は確認中です。]
[Next 00:30 / Pour --g]
[Back] [Pause] [Next]

Timer中はBottom Tabsを非表示にしてください。
Pauseは中央配置にしてください。
Back / Pause / Nextは下部に大きく配置してください。

# 10. localStorage保存仕様

保存キー：

- pouro.storage.version
- pouro.brewHistory.v1
- pouro.settings.v1
- pouro.activeSession.v1

MVP保存はlocalStorageです。
IndexedDBは使わないでください。
ただし、将来IndexedDBへ移行できるようRepository層を分けてください。

保存対象：

- BrewSession[]
- methodSnapshot
- setupSnapshot
- result
- BrewSettings
- activeSession

履歴最大件数：100件
100件を超える場合は古い履歴から削除してください。
履歴は新しい順に表示してください。
保存失敗時はアプリを落とさず、控えめなエラーを表示してください。
データ初期化には確認ダイアログを必須にしてください。

Repository層の例：

export interface BrewHistoryRepository {
  getAll(): BrewSession[];
  getById(id: string): BrewSession | null;
  save(session: BrewSession): void;
  deleteById(id: string): void;
  clear(): void;
}

export interface SettingsRepository {
  get(): BrewSettings;
  save(settings: BrewSettings): void;
}

# 11. UI/UX制約

デザイン方針：

- warm cream background
- deep charcoal text
- amber / brown accent
- serif logo
- sans-serif body
- thin line icons
- soft card surfaces
- restrained shadows
- generous spacing
- calm editorial coffee tool feeling

CSS変数：

:root {
  --color-bg: #F7F1E8;
  --color-surface: #FFF9F0;
  --color-surface-muted: #EFE4D6;
  --color-text: #17212B;
  --color-text-muted: #6F6258;
  --color-accent: #B9823B;
  --color-accent-soft: #E6C28E;
  --color-border: #D8CBBE;

  --radius-card: 20px;
  --radius-button: 999px;

  --shadow-soft: 0 8px 24px rgba(23, 33, 43, 0.08);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;

  --font-logo: Georgia, "Times New Roman", serif;
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

iPhone SE制約：

- 375×667 CSS pxで確認する
- CTAとBottom Tabsを重ねない
- 主要ボタンは44×44 CSS px以上
- 推奨タップ領域は48×48 CSS px
- 通常テキストはコントラスト4.5:1以上を目安
- Timerの数字視認性を最優先する

Brew Homeに表示するもの：

- 小さめのロゴ「pourō」
- タグライン「Pour slowly. Brew deeply.」
- 2×2のメソッドカード
- 選択中メソッドの説明カード
- CTA「レシピ設定へ」
- Bottom Tabs

Brew Homeに表示してはいけないもの：

- 豆量
- 比率
- 総湯量
- 湯温
- 挽き目
- 詳細設定
- ダッシュボード的な情報

# 12. PWA要件

manifest.jsonを作成してください。

推奨値：

{
  "name": "Pourō",
  "short_name": "Pourō",
  "description": "A quiet brew guide and timer for pour-over coffee.",
  "display": "standalone",
  "start_url": "/",
  "scope": "/",
  "background_color": "#F7F1E8",
  "theme_color": "#17212B",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

Service Worker要件：

- HTML / CSS / JS / manifest / iconsをキャッシュする
- 外部APIは使わない
- 初回読み込み後、主要画面をオフライン表示可能にする
- Service Worker更新でlocalStorage履歴が消えないようにする
- App Shellキャッシュでよい

# 13. Settings / About / Legalページ仕様

Settingsに以下を含めてください。

- サウンド
- バイブレーション
- 画面スリープ対策案内
- データ初期化
- このアプリについて
- 出典・参考情報
- 免責事項
- プライバシーポリシー

画面スリープ対策：
P0では案内表示のみで構いません。
Wake Lock APIの実動作は必須にしないでください。

必須注意書き：

Pourōは、ハンドドリップコーヒーの抽出手順、時間、湯量、記録を整理するための非公式ブリューガイド＆タイマーです。

本アプリは、粕谷哲氏、PHILOCOFFEA、HARIOその他の個人・団体・メーカーによる公式・公認・監修・提携アプリではありません。

アプリ内で言及する抽出メソッド、人物名、メーカー名、器具名は、出典・互換性・参考情報の説明を目的として記載しています。各名称はそれぞれの権利者に帰属します。

抽出結果は、豆、焙煎度、挽き目、湯温、器具、注湯速度、環境により変化します。本アプリは特定の味や抽出結果を保証するものではありません。

プライバシー文言：

PourōはMVP時点でログイン、外部API、広告、Analytics、クラウド同期を使用しません。

抽出記録と設定は、ユーザーの端末内のlocalStorageに保存されます。

入力内容は外部サーバーへ送信されません。

ブラウザまたは端末のデータ削除操作を行うと、保存された履歴が削除される場合があります。

外部公開文言では「原典に忠実」とは書かず、以下の表現を使ってください。

公開情報・書籍・メーカー資料等を参考に、Pourōが独自に整理した抽出ガイドです。

# 14. 実装禁止事項

以下は実装しないでください。

- ログイン
- アカウント作成
- 外部API
- 広告
- Analytics
- クラウド同期
- SNS投稿
- コミュニティ
- レシピ投稿
- いいね
- コメント
- フォロー
- 大量レシピ集
- 豆在庫管理
- 水質管理
- 焙煎ログ
- Bluetoothスケール連携
- 課金
- サブスクリプション
- AI味覚診断
- 複雑な統計ダッシュボード

以下のUIは禁止です。

- Brew Homeのダッシュボード化
- HomeにDose / Ratio / 湯温 / 詳細設定を表示
- Timer画面の小さい数字
- Timer画面の長文説明
- 過剰なアニメーション
- 派手な通知演出
- 黒背景ネオン
- ゲームUI
- SF調
- SNSアプリ風
- カフェ注文アプリ風
- 過度なグラスモーフィズム
- Apple純正UIのコピー
- SF Symbolsのトレース
- 競合アプリの画面構造コピー
- Blue Bottle等の特定ブランド模倣

以下の文言は禁止です。

- 公式
- 公認
- 監修
- 提携
- 粕谷氏公式アプリ
- 本人監修
- 完全再現
- 必ず同じ味になる
- 世界大会の味を再現
- 公式レシピ搭載
- 誰でもプロ級
- 失敗しない
- 原典そのまま
- 必ず美味しくなる

# 15. QAチェック項目

機能QA：

- Brew Homeに2×2カード、説明カード、CTAが表示される
- Brew Homeに豆量・比率・湯温・詳細設定が表示されていない
- Recipe Setupで豆量、比率、総湯量、湯温メモ、挽き目メモが入力できる
- 総湯量が豆量×比率で自動計算される
- Brew Timerで経過時間、Pour、Total、現在ステップ、Next予告が表示される
- Brew TimerでBack / Pause / Nextが動作する
- 最終ステップでNextがFinishに変わる
- Brew Finishで結果を保存できる
- Historyで新しい順に履歴が表示される
- History Detailで1回分の詳細が表示される
- Settingsで全削除時に確認ダイアログが出る
- Settingsで注意書き、出典、免責、プライバシーが見られる

Timer QA：

- Date.now基準で計算している
- setInterval加算方式になっていない
- Pause中にelapsedが進まない
- Resume時に停止時間がtotalPausedMsに加算される
- Backは時間ではなくステップ表示を戻す
- Nextは時間ではなくステップ表示を進める
- バックグラウンド復帰時に破綻しない
- placeholder時に「Pour --g」「Total --g」と確認中表示がセットになっている

UI QA：

- iPhone SE 375×667で主要UIが破綻しない
- CTAとBottom Tabsが重ならない
- Timer数字が十分大きい
- Timer説明が長文になっていない
- ボタンが44×44 CSS px以上
- 通常文字が読みやすい
- 状態が色だけで表現されていない
- アイコンが既存アイコンのトレースに見えない

PWA QA：

- manifestが読み込まれている
- icons 192 / 512が設定されている
- Service Workerが登録される
- 初回表示後、主要画面がオフラインで開ける
- Service Worker更新後もlocalStorage履歴が残る
- ホーム画面追加後にstandalone表示で起動できる

法務・表記QA：

- 禁止語が含まれていない
- placeholder値が確定値に見えない
- Aboutに非公式注意書きがある
- Legalに権利者帰属と非保証文言がある
- PrivacyにlocalStorage保存と外部送信なしが明記されている
- sourceStatus / verificationLevelがデータにある

# 16. PR分割案

PR 1：プロジェクト基盤
- Vite + React + TypeScript
- ディレクトリ構成
- CSS変数
- App Shell
- Bottom Tabs

PR 2：型定義・placeholderデータ
- TypeScript型定義
- SourceStatus / VerificationLevel
- placeholderメソッド4件
- レシピ確認中ラベル

PR 3：Brew Home / Recipe Setup
- Brew Home
- Recipe Setup
- Home制約の確認
- iPhone SE確認

PR 4：Timer基盤
- Timer状態
- Date.now計算
- Pause / Resume
- Back / Next
- Finish遷移

PR 5：Brew Finish / History
- Brew Finish
- localStorage Repository
- History
- History Detail
- 再抽出導線

PR 6：Settings / Legal / Privacy
- Settings
- About
- Sources
- Legal
- Privacy
- 全削除確認ダイアログ

PR 7：PWA / QA調整
- manifest
- Service Worker
- icons
- iPhone SE調整
- QA修正

# 17. 完成条件

- React + TypeScript + Viteで起動できる
- PWAとしてmanifestとService Workerがある
- Brew Home / Recipe Setup / Brew Timer / Brew Finish / History / History Detail / Settingsがある
- Brew Homeに豆量・比率・湯温・詳細設定がない
- Brew Timerで経過時間、Pour、Total、現在ステップ、Next予告、Back/Pause/Nextが大きく表示される
- TimerがDate.now基準で動作する
- localStorageに履歴と設定が保存される
- sourceStatus / verificationLevelを持つ
- 未確認レシピ値がplaceholder / needsReview扱いになっている
- SettingsにAbout / Sources / Legal / Privacyがある
- 禁止機能が混入していない
- 禁止文言が含まれていない
- iPhone SE 375×667で主要UIが破綻しない


