import { Page } from "../components/layout/Page";

export function PrivacyPage() {
  return (
    <Page
      title="プライバシーポリシー"
      description="PourōのMVP時点における保存データと、外部送信の扱いについて説明します。"
      backTo="/settings"
    >
      <section className="content-card">
        <h2>保存場所</h2>
        <p>
          Pourōは、抽出履歴や設定をブラウザのlocalStorageに保存します。
        </p>
        <p>
          MVP時点では、アカウント登録、ログイン、クラウド同期はありません。
          また、抽出履歴や設定を外部サーバーへ送信しません。
        </p>
      </section>

      <section className="content-card">
        <h2>保存される情報</h2>
        <ul className="content-list">
          <li>抽出メソッドID</li>
          <li>入力した豆量・比率・湯量</li>
          <li>メモ</li>
          <li>味の印象</li>
          <li>評価</li>
          <li>抽出時間</li>
          <li>設定値</li>
        </ul>
      </section>

      <section className="content-card">
        <h2>削除とデータ保持</h2>
        <p>
          設定画面から保存済みの抽出履歴を削除できます。
        </p>
        <p>
          ブラウザのデータ削除、端末変更、別ブラウザ利用などにより、保存データが
          失われる場合があります。
        </p>
      </section>
    </Page>
  );
}
