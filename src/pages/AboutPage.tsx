import { Page } from "../components/layout/Page";

export function AboutPage() {
  return (
    <Page
      title="Pourōについて"
      description="Pourōは、ハンドドリップコーヒー専用のブリューガイド＆タイマーPWAです。"
      backTo="/settings"
    >
      <section className="content-card">
        <p className="logo-mark">pourō</p>
        <h2>Pourō</h2>
        <p>Pour slowly. Brew deeply.</p>
        <p>
          Pourōは、抽出中に迷いやすい手順、時間、湯量、記録を整理するための
          静かな抽出補助ツールです。
        </p>
      </section>

      <section className="content-card">
        <h2>できること</h2>
        <p>
          抽出メソッドの選択、豆量・比率・湯量などの抽出条件入力、タイマーによる
          抽出補助、抽出後の記録、履歴からの再抽出を行えます。
        </p>
        <p>
          MVP時点では、入力内容と履歴はブラウザ内に保存され、ログインや
          クラウド同期を前提にしない構成です。
        </p>
      </section>

      <section className="content-card">
        <h2>意図していないこと</h2>
        <p>
          Pourōは、美味しさの保証、公式レシピの完全再現、公式・公認・監修
          アプリとしての表示、AI診断、コミュニティ機能を意図していません。
        </p>
      </section>
    </Page>
  );
}
