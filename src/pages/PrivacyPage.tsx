import { Page } from "../components/layout/Page";

export function PrivacyPage() {
  return (
    <Page
      title="プライバシーポリシー"
      description="Pourōの現在のMVPにおけるローカルデータ、削除方法、ホスティングについて説明します。"
      backTo="/settings"
    >
      <section className="content-card">
        <h2>現在のMVP</h2>
        <p>
          PourōはGitHub Pagesで配信される静的PWAです。現在のMVPには、ユーザー
          アカウント、バックエンドサーバー、クラウド同期はありません。
          アプリ専用のアクセス解析は実装しておらず、個人データを販売しません。
        </p>
      </section>

      <section className="content-card">
        <h2>ローカルデータ</h2>
        <p>
          抽出履歴と設定は、このブラウザのlocalStorageに保存されます。Pourōが
          別の端末やPourōのバックエンドへ同期することはありません。
        </p>
      </section>

      <section className="content-card">
        <h2>データの削除</h2>
        <p>
          保存済みの抽出履歴は、設定画面の「すべての履歴を削除」から削除できます。
          Pourōのデータは、ブラウザまたはサイトデータを消去することでも削除できます。
        </p>
        <p>
          ブラウザまたはサイトデータの消去、端末やブラウザの変更、ブラウザの
          ストレージ動作によって、保存済みの抽出履歴と設定が失われる場合があります。
        </p>
      </section>

      <section className="content-card">
        <h2>ホスティング</h2>
        <p>
          GitHub Pagesが静的なアプリファイルを配信します。ホストされたサイトの
          利用にはGitHub側の方針が適用される場合があります。この説明は現在の
          Pourōアプリ実装についてのもので、第三者プラットフォームの動作を
          保証するものではありません。
        </p>
      </section>
    </Page>
  );
}
