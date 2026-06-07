Pourō｜00 マスター設計・最終仕様管理
専門チャット 01〜09 統合版：Master Spec v1 Draft
以下は、01〜09の戻し要約を統合した最新版です。
結論として、PourōのMVPは 「ハンドドリップ中に迷わないための、静かなブリューガイド＆タイマー」 に絞ります。高機能なコーヒー管理アプリには広げません。競合調査、MVP設計、UI/UX、Codex、ASO、法務の各チャットでこの方向性は一貫しています。

1. 統合サマリー
確定
Pourōは、以下の価値に集中するPWAとして設計します。
抽出中に迷わない
今注ぐ湯量・累計湯量・経過時間が一目で分かる
抽出後の記録を次回改善につなげる
ログインなし・ローカル保存で使える
静かで上質な道具感を持つ
公式・公認・監修アプリとは誤認させない
競合がレシピ数、共有、豆管理、グラフ、Bluetooth連携へ拡張している一方で、Pourōは 機能を絞ること自体を差別化軸 にします。
最重要判断
MVPでは、メソッドの具体レシピ値を未確認のまま確定仕様として扱わない。
Codexに渡すのは、以下です。
画面構成
UI構造
タイマー構造
データ型
sourceStatus / verificationLevel
ローカル保存
PWA基盤
注意書き表示
仮データを本番確定値として扱わないルール
レシピ値、注湯量、ステップ文言は、原典確認が終わるまで placeholder / needsReview 扱いにします。

2. 確定仕様
2-1. プロダクト定義
確定
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
初期公開
PWA
初期保存
ローカル保存
ログイン
なし
外部API
なし
広告
なし
Analytics
なし

MVP時点のプライバシー方針は、ログインなし、外部APIなし、広告なし、アクセス解析なし、個人情報収集なし、抽出記録・設定は端末内保存とします。

2-2. MVP必須画面
確定
Brew Home
Recipe Setup
Brew Timer
Brew Finish
History
History Detail
Settings
この7画面構成は、MVP機能設計、UI/UX、Codex実装の各チャットで一致しています。

2-3. Bottom Tabs
確定
Bottom Tabsは以下の3つのみです。
Brew
History
Settings
Beans、Journal、Recipes、Community、Profileなどは採用しません。

2-4. Brew Home
確定
目的：抽出メソッドを選ぶ画面。
表示するもの：
小さめのロゴ「pourō」
タグライン「Pour slowly. Brew deeply.」
2×2のメソッドカード
選択中メソッドの説明カード
CTA「レシピ設定へ」
Bottom Tabs：Brew / History / Settings
表示しないもの：
豆量
比率
総湯量
湯温
挽き目
詳細設定
ダッシュボード的な情報
Brew Homeは「メソッド選択専用」とし、Dose / Ratio / 詳細設定を表示しない方針で統一します。

2-5. Recipe Setup
確定
目的：抽出開始前に最低限の条件を設定する画面。
表示・入力項目：
選択中メソッド
豆量
比率
総湯量
湯温
挽き目メモ
任意メモ
CTA「抽出を開始する」
総湯量は原則として 豆量 × 比率 で自動計算します。

2-6. Brew Timer
確定
Pourōの最重要画面です。
表示項目：
経過時間
今注ぐ湯量
累計湯量
現在ステップの短い指示
次ステップ予告
Pause / Back / Next / Finish
UI方針：
数字を大きく表示する
長文を読ませない
現在ステップ指示は最大2行程度
Back / Pause / Nextは下部に大きく配置
Pauseは中央配置
最終ステップではNextをFinishへ切り替える
Timer中はBottom Tabsを非表示にする方向で仮採用
Brew Timerは「視認性・安定性・片手操作性」を最優先します。

2-7. Brew Finish
確定
目的：抽出結果を軽く記録する画面。
保存する主な項目：
メソッド名
豆量
総湯量
抽出時間
味の印象
評価
次回改善メモ
「次回改善メモ」はPourōの研究ノート性を支える重要項目です。

2-8. History
確定
目的：過去の抽出を研究ノートとして確認する画面。
表示項目：
日付
メソッド
豆量
総湯量
抽出時間
評価
次回メモの一部
Historyは統計ダッシュボードではなく、次回改善につながる記録帳として扱います。

2-9. History Detail
確定
目的：1回分の抽出条件・味・メモを確認する画面。
表示項目：
抽出条件
味の印象
評価
次回改善メモ
「同じ条件で再抽出」導線
「同じ条件で再抽出」は、MVPに近いP1扱いですが、導線自体は強く推奨します。

2-10. Settings
確定
Settingsは最小限にします。
含めるもの：
サウンド
バイブレーション
画面スリープ対策案内
データ初期化
アプリ情報
出典・参考情報
免責事項
プライバシー方針
データ初期化には確認ダイアログを必須にします。

2-11. 技術仕様
確定
項目
仕様
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
PWA
manifest.json / Service Worker
最小表示基準
iPhone SE相当 375×667 CSS px

Codexチャットでは、React + TypeScript + Vite、ログインなし、外部APIなし、ローカル保存のみのPWA方針が確定扱いになっています。

2-12. タイマー仕様
確定
Timer状態：
idle
running
paused
finished
cancelled
経過時間は、setIntervalで秒数を足す方式ではなく、基準時刻との差分で計算します。
基本式：
elapsedMs = Date.now() - startedAtMs - totalPausedMs

Pause時は pausedAtMs を保存し、Resume時に停止時間を totalPausedMs に加算します。Back / Nextは時間そのものを変更せず、表示中ステップを変更します。

3. 仮採用仕様
3-1. 収録メソッド
仮採用
MVPで扱う候補は以下です。
4:6 Method
Hybrid Method
New Hybrid Method
10 Pour Method
Ice Brew / 急冷式系
ただし、正式収録は原典確認後 です。
02原典確認チャットでは、必須調査対象として4:6 Method、Hybrid Method、New Hybrid Method、10 Pour Methodが挙げられていますが、実際に収録するかは公式ソースで確認できる情報量に応じて判断するとされています。

3-2. sourceStatus / verificationLevel
仮採用から確定寄り
メソッドデータには確認状態を持たせます。
候補：
type SourceStatus =
  | "verified"
  | "thirdParty"
  | "placeholder"
  | "needsReview";

原典未確認のレシピ値はすべて placeholder として扱います。

3-3. サウンド・バイブレーション
仮採用
Settingsには項目を置く
実動作はP1でも可
端末非対応時の表示を要確認
P0では無理に実装しない

3-4. Wake Lock / 画面スリープ対策
仮採用
P0では案内表示
P1でScreen Wake Lock APIを検討
対応ブラウザ差があるため必須機能にしない

3-5. データエクスポート
仮採用 / P1
MVP本体からは外してよいが、将来のJSONエクスポートは候補。
例：
pouro-export-YYYY-MM-DD.json


4. 要確認事項
4-1. 原典確認
要確認 / 最重要
未確定のままCodexへ渡してはいけないもの：
各メソッドの正式名称
粉量
湯量
比率
湯温
挽き目
注湯回数
注湯タイミング
総抽出時間
味調整理論
ステップ文言
粕谷哲氏本人の理論として断定できる範囲
02チャットでは、公式ソース、本人発信、メーカー公式、World Brewers Cup関連、公式販売ページを最優先とし、第三者記事や個人ブログは参考情報扱いとすると整理されています。

4-2. 法務・表現
要確認
特に確認が必要なもの：
「Pourō / pourō / ポウロウ / POURO」の商標
「4:6メソッド」「4:6 Method」「THE NEO BREW」等の商標・表記
粕谷哲氏の氏名使用
HARIO / V60 / Switch / Origami等のメーカー名・器具名使用
公式ページ、動画、書籍内容の要約可能範囲
App Store説明文・スクリーンショットでの人物名・メソッド名使用リスク
法務チャットでは、これらが専門家確認対象として整理されています。

4-3. Timerのバックグラウンド復帰仕様
要確認
以下を明確化する必要があります。
画面ロック後に実時間で補正する
復帰時に一時停止扱いにする
PWAホーム画面起動とブラウザ起動で差が出るか
Service Worker / キャッシュ更新時に履歴が消えないか
QAチャットでは、Timerのバックグラウンド復帰、PWAホーム画面起動、保存データ保持が要確認項目として挙げられています。

4-4. UI細部
要確認
Recipe Setupで比率を編集可能にするか
湯温を必須入力にするか、推奨値＋任意編集にするか
Brew Finishの評価を3段階にするか5段階にするか
Finish操作に確認を挟むか
Recipe Setup / Brew FinishでBottom Tabsを表示するか
iPhone SEでキーボード表示時にCTAが隠れないか

5. 不採用事項
5-1. MVPで不採用
確定
ログイン
アカウント作成
SNS投稿
コミュニティ
レシピ投稿
いいね
コメント
フォロー
大量レシピ集
豆在庫管理
水質管理
焙煎ログ
Bluetoothスケール連携
外部API連携
課金
サブスクリプション
広告
AI味覚診断
複雑な統計ダッシュボード
この除外方針は、01競合、03MVP、06Codex、07ASOの各チャットで一致しています。

5-2. UIで不採用
確定
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

5-3. 表現上不採用
確定
使用禁止：
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
法務チャットでは、許諾がない限り上記表現を使用禁止としています。

6. MVPへ反映する内容
6-1. MVP P0
確定
メソッド選択
Recipe Setup
Brew Timer
ステップ表示
今注ぐ湯量表示
累計湯量表示
経過時間表示
Pause / Resume
Back / Next
Finish
抽出結果保存
履歴一覧
履歴詳細
ローカル保存
PWA対応
Settings内の注意書き・出典・プライバシー方針
データ初期化確認ダイアログ

6-2. MVPに入れるが注意が必要
仮採用
サウンド通知：設定項目は置くが実動作はP1でも可
バイブレーション：同上
同じ条件で再抽出：History Detailに導線を置く方向
activeSession保存：復元UIは要検討
出典表示：Settingsまたは独立ページに表示
非公式注意書き：Settings / About / Method Detailで表示

6-3. MVPで扱わない
確定
分析グラフ
豆在庫
UGC
クラウド同期
ログイン
課金
AI診断
Bluetooth連携

7. UI/UXへ反映する内容
7-1. 画面役割
確定
画面
役割
Brew Home
メソッド選択
Recipe Setup
最低限の抽出条件設定
Brew Timer
抽出中の実行ガイド
Brew Finish
軽い記録保存
History
研究ノート型履歴
History Detail
1回分の詳細確認・再抽出
Settings
最小限設定・注意書き・プライバシー


7-2. デザイン方針
確定
warm cream background
deep charcoal text
amber / brown accent
serif logo
sans-serif body
thin line icons
soft card surfaces
restrained shadows
generous spacing
calm editorial coffee tool feeling
このビジュアル方針は、UI/UX、GPT Image、ASOで共通しています。

7-3. iPhone SE制約
確定
375×667 CSS px相当で確認
CTAとBottom Tabsを重ねない
主要ボタンは44×44 CSS px以上
推奨タップ領域は48×48 CSS px
通常テキストはコントラスト4.5:1以上を目安
Timerの数字視認性を最優先

8. Codexへ渡すべき内容
8-1. Codexに渡す確定仕様
確定
Codexへは以下を渡します。
Pourō MVPは、React + TypeScript + Viteで実装するPWA。
ログインなし、外部APIなし、広告なし、Analyticsなし、クラウド同期なし。
データはMVPではlocalStorageに保存する。
画面は Brew Home / Recipe Setup / Brew Timer / Brew Finish / History / History Detail / Settings。
Bottom Tabsは Brew / History / Settings。
Brew Homeには豆量・比率・湯温・詳細設定を表示しない。
Brew Timerでは、経過時間、今注ぐ湯量、累計湯量、現在ステップ、次ステップ、Pause / Back / Next / Finishを大きく表示する。
TimerはDate.now()基準で経過時間を計算し、setInterval加算方式にしない。
Timer状態は idle / running / paused / finished / cancelled。
履歴にはmethodSnapshotとsetupSnapshotを保存する。
Settingsに「このアプリについて」「出典・参考情報」「プライバシーポリシー」「免責事項」を設ける。
UI文言に「公式」「公認」「監修」「提携」「完全再現」「必ず美味しくなる」を含めない。


8-2. Codexに渡してはいけない内容
確定
原典未確認のレシピ値を確定値として渡さない
「4:6 Method = この値で確定」と断定しない
「粕谷氏公式」「公式レシピ」などの文言を渡さない
競合UIやApple UIを再現させない
HomeにDose / Ratioを戻さない
統計ダッシュボードを作らせない
Bluetooth連携やログインを追加させない

8-3. Codex向けデータ型方針
確定
最低限必要な型：
BrewMethod
BrewStep
BrewRecipe
BrewSetup
BrewSession
BrewSettings
TasteNote
TimerState
SourceStatus
BrewMethod と BrewStep には、出典確認状態を持たせます。
type SourceStatus = "verified" | "thirdParty" | "placeholder" | "needsReview";


9. GPT Imageへ渡すべき内容
9-1. 共通ビジュアル指示
確定
Pourō is a quiet, refined pour-over coffee brew guide and timer.
Use warm cream background, deep charcoal text, restrained amber/brown accent, soft card surfaces, thin line icons, generous spacing, calm editorial coffee tool feeling.
The logo text must be lowercase “pourō”.
The tagline is “Pour slowly. Brew deeply.”
Prioritize readability and usability over decoration.
Do not imitate Apple native UI, SF Symbols, Blue Bottle, HARIO, V60, PHILOCOFFEA, or any existing coffee app.
Do not create a cafe ordering app, SNS app, game UI, cyber UI, neon UI, or excessive glassmorphism.


9-2. 生成優先順位
確定
Brew Home
Brew Timer
Recipe Setup
Brew Finish
History
Settings
アイコンセット
App Icon
App Store / LPスクリーンショット
GPT Imageチャットでは、ブランドムード確認後、Brew Home、Brew Timer、Recipe Setupの順で進める方針が仮採用されています。

9-3. 使用禁止
確定
公式
公認
監修
完全再現
必ず美味しくなる
HARIO / V60 / PHILOCOFFEA等のロゴ
識別可能な商品形状
SF Symbols風のトレース
特定ブランド風の色・構図・ロゴ

10. ASO・公開準備へ反映する内容
10-1. 公開時コピー
仮採用から確定寄り
メインコピー：
迷わず注げる、静かなブリューガイド。
一言コピー：
注ぐ順番を、静かに整える。
サブコピー：
今注ぐ湯量、累計湯量、経過時間をひと目で確認。抽出後の記録を、次の一杯へつなげます。
ASOチャットでは、上記が公開準備上の推奨コピーとして整理されています。

10-2. App Storeサブタイトル候補
仮採用
ハンドドリップ用抽出タイマー
静かに使える抽出タイマー
ハンドドリップ記録とタイマー
法務観点では、人物名・ブランド名・メソッド名をApp Storeタイトルやサブタイトルに前面表示しない方針です。

10-3. スクリーンショット構成
仮採用
6枚構成：
Brew Home
Recipe Setup
Brew Timer
Brew Finish
History
Settings
見出し案：
抽出メソッドを、静かに選ぶ
豆量と比率を整える
今注ぐ湯量が、ひと目で分かる
抽出後の気づきを残す
記録が、次の一杯につながる
使い方を、自分の道具に近づける

10-4. 公開前チェックカテゴリ
確定
機能チェック
UIチェック
表記チェック
出典チェック
PWAチェック
iPhoneチェック
Androidチェック
データ保存チェック
プライバシー確認
法務・表現リスク確認
App Store化前の追加確認

11. 法務・表現リスク上の注意
11-1. 基本方針
確定
Pourōは、粕谷哲氏、PHILOCOFFEA、HARIO、その他メーカー・団体による公式・公認・監修・提携アプリではありません。

11-2. 「原典に忠実」の扱い
重要修正
マスター内部のブランド定義としては、
原典に忠実な、静かな抽出補助具
を維持します。
ただし、外部公開文言では、法務チャットの指摘に従い、より安全な表現に置き換えます。
外部公開向け表現：
公開情報・書籍・メーカー資料等を参考に、Pourōが独自に整理した抽出ガイド
または、
既存の抽出理論を参考にした、非公式のブリューガイド
法務チャットでは、「原典ベース」はそのままだと強いため、上記のように表現する方針が示されています。

11-3. アプリ内注意書き
確定
Settings / About / 出典ページに以下の趣旨を掲載します。
Pourōは、ハンドドリップコーヒーの抽出手順、時間、湯量、記録を整理するための非公式ブリューガイド＆タイマーです。

本アプリは、粕谷哲氏、PHILOCOFFEA、HARIOその他の個人・団体・メーカーによる公式・公認・監修・提携アプリではありません。

アプリ内で言及する抽出メソッド、人物名、メーカー名、器具名は、出典・互換性・参考情報の説明を目的として記載しています。各名称はそれぞれの権利者に帰属します。

抽出結果は、豆、焙煎度、挽き目、湯温、器具、注湯速度、環境により変化します。本アプリは特定の味や抽出結果を保証するものではありません。

この文言は法務チャットのマスター反映案をベースにします。

12. 仕様間の矛盾・衝突
衝突1：Brew Timerの情報優先順位
内容
01では、Brew Timerの優先順位が以下です。
今注ぐ湯量
累計湯量
経過時間
現在ステップ
次ステップ
Pause / Back / Next
一方、03 / 04 / 05 / 08では、経過時間が先に挙がっています。
マスター判断
矛盾は、次のように解消します。
表示順：経過時間を上部に大きく固定表示
行動優先度：今注ぐ湯量を最重要アクションとして中央最大表示
補助情報：累計湯量、現在指示、次ステップを続ける
Codex実装上の最終表示構成：
[経過時間]
[Pour XXg] ← 最重要アクションとして最大級
[Total XXXg]
[現在ステップの短文]
[Next 00:00 / Pour XXg]
[Back] [Pause] [Next]


衝突2：localStorageかIndexedDBか
内容
初期マスターではIndexedDB系も候補でしたが、03 / 06ではMVPはlocalStorageで足りるとされています。
マスター判断
MVPは localStorage で確定。
ただし、Repository層を分け、将来IndexedDBへ移行可能にする。

衝突3：4メソッドを実装するか、原典確認後に限定するか
内容
UI / GPT Imageでは4メソッドカードを前提にしていますが、原典確認では具体値が未確認です。
マスター判断
UI構造としては4カードを維持。
ただし、カード名・レシピ値・ステップは確定扱いにしません。
Codexには以下を指示します。
4カードUIは実装してよい
メソッドデータは sourceStatus 付き
未確認値は placeholder
本公開前に verified または thirdParty に分類
未確認のまま「公式」「原典通り」と表示しない

衝突4：「原典に忠実」と「法務上安全な表現」
内容
ブランド定義では「原典に忠実」が中心ですが、法務チャットでは「原典ベース」は強すぎるため外部公開文言では弱めるべきとされています。
マスター判断
内部コンセプト：原典に忠実な、静かな抽出補助具
外部公開文言：公開情報・書籍・メーカー資料等を参考に、Pourōが独自に整理した抽出ガイド

衝突5：App Iconに文字を入れるか
内容
05では「文字なし抽象シンボル版」と「pourō文字入り版」が要確認です。
マスター判断
現時点では未確定。
ただし、App Iconは特定メーカーや器具形状を強く連想させない抽象モチーフを優先します。

13. 次に進めるべき作業
優先順位1：Codex投入用仕様 v1 作成
次に作るべきものは、Codexへそのまま渡せる最終仕様書 です。
含める内容：
技術構成
画面一覧
ルーティング
データ型
Timerロジック
localStorageキー
UI制約
sourceStatus仕様
Settings内注意書き
PWA要件
QA要件
実装禁止事項

優先順位2：原典確認の再整理
次に、02へ戻すべき追加指示を作ります。
目的：
4:6 Method
Hybrid Method
New Hybrid Method
10 Pour Method
Ice Brew
それぞれについて、
verified
thirdParty
placeholder
needsReview
へ分類できる形にします。

優先順位3：Brew Timer UI確定
Pourōの中核画面なので、Brew Timerのレイアウトを先に固定します。
決めるもの：
経過時間の位置
Pour XXgのサイズ
Total XXXgの位置
現在ステップ文言の最大文字数
Next予告の表示形式
Back / Pause / Nextの位置
Finish操作
Bottom Tabs非表示仕様

優先順位4：Settings / 法務ページ実装
公開前に必須です。
必要ページ：
このアプリについて
出典・参考情報
免責事項
プライバシーポリシー
データ削除

14. Pourōマスター仕様 v1 としての更新案
14-1. Product Definition v1
確定
Pourōは、ハンドドリップ中の迷いを減らすための、静かなブリューガイド＆タイマーPWAである。
高機能なコーヒー管理アプリではなく、抽出手順・時間・湯量・記録を整理し、次の一杯へつなげる抽出補助具として設計する。

14-2. MVP Scope v1
確定
MVPは以下に限定する。
Brew Home
Recipe Setup
Brew Timer
Brew Finish
History
History Detail
Settings
PWA
localStorage保存
sourceStatus付きメソッドデータ
非公式・非提携・非監修の注意書き
ローカル保存型プライバシー方針

14-3. Non-Goals v1
確定
Pourō v1では、SNS、コミュニティ、豆在庫、水質管理、焙煎ログ、クラウド同期、Bluetoothスケール、課金、AI診断、複雑な統計を扱わない。

14-4. UI Direction v1
確定
PourōのUIは、warm cream / deep charcoal / amber-brownを基調にした、静かで上質な道具感を持つ。
Brew Timerでは、美しさよりも可読性・操作性・安定性を優先する。

14-5. Legal Expression v1
確定
外部公開では「公式」「公認」「監修」「完全再現」を使わない。
「原典に忠実」は内部コンセプトに留め、公開文言では「公開情報・書籍・メーカー資料等を参考に、Pourōが独自に整理した抽出ガイド」と表現する。

14-6. Codex Ready Status
結論
Codexに進めてよい範囲：
画面構成
UI骨格
タイマー基盤
localStorage
PWA
Settings
注意書き
sourceStatus対応
placeholderデータ構造
Codexにまだ渡さない範囲：
確定レシピ値
公式扱いのメソッド説明
粕谷氏本人の理論として断定する文言
商標・氏名・メーカー名を前面に出すマーケティング文言
以上を、Pourō Master Spec v1 Draft として採用可能です。

