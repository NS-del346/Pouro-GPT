import { Page } from "../components/layout/Page";

export function AboutPage() {
  return (
    <Page
      title="Pourōについて"
      description="Pourōは、静かに使えるモバイルファーストのハンドドリップコーヒー用ブリューガイド＆タイマーPWAです。"
      backTo="/settings"
    >
      <section className="content-card">
        <p className="logo-mark">pourō</p>
        <h2>Pourō</h2>
        <p>Pour slowly. Brew deeply.</p>
        <p>
          Pourōは、抽出中の手順、時間、湯量、記録を整理するための、個人制作の
          非公式な抽出補助ツールです。
        </p>
      </section>

      <section className="content-card">
        <h2>現在のMVPでできること</h2>
        <ul className="content-list">
          <li>抽出メソッドの選択</li>
          <li>レシピ設定</li>
          <li>抽出タイマー</li>
          <li>抽出完了時のメモ</li>
          <li>抽出履歴と履歴詳細</li>
          <li>Rebrew</li>
          <li>Settings</li>
        </ul>
      </section>

      <section className="content-card">
        <h2>保存と位置づけ</h2>
        <p>
          現在のMVPにはログインやクラウド同期はありません。抽出履歴と設定は、
          このブラウザのlocalStorageに保存されます。
        </p>
        <p>
          Pourōは公式レシピの完全再現を目的とするものではなく、公式・公認・監修
          アプリでもありません。
        </p>
      </section>
    </Page>
  );
}
