import { Page } from "../components/layout/Page";
import { visiblePlaceholderMethods } from "../data";

export function SourcesPage() {
  return (
    <Page
      title="出典・確認状況"
      description="Pourōで扱う抽出メソッド情報の出典確認状況と、仮データの扱いについて説明します。"
      backTo="/settings"
    >
      <section className="content-card">
        <h2>現在のデータについて</h2>
        <p>
          現在のメソッドデータは確認中・未確定の情報を含みます。抽出手順、
          湯量、時間、説明文は、確定レシピとして扱わないでください。
        </p>
        <p>
          型として verified / official は存在しますが、現在のplaceholderデータは
          verified / official ではありません。
        </p>
        <p>
          sourceStatus と verificationLevel は、将来の原典確認に応じて情報を
          更新するための分類です。
        </p>
      </section>

      <section className="content-card">
        <h2>sourceStatus</h2>
        <dl className="detail-list">
          <div>
            <dt>placeholder</dt>
            <dd>仮データ</dd>
          </div>
          <div>
            <dt>needsReview</dt>
            <dd>出典確認中</dd>
          </div>
          <div>
            <dt>thirdParty</dt>
            <dd>第三者情報</dd>
          </div>
          <div>
            <dt>verified</dt>
            <dd>確認済み</dd>
          </div>
        </dl>
      </section>

      <section className="content-card">
        <h2>verificationLevel</h2>
        <dl className="detail-list">
          <div>
            <dt>placeholder</dt>
            <dd>仮段階</dd>
          </div>
          <div>
            <dt>unverified</dt>
            <dd>未確認</dd>
          </div>
          <div>
            <dt>thirdParty</dt>
            <dd>第三者情報</dd>
          </div>
          <div>
            <dt>book</dt>
            <dd>書籍情報</dd>
          </div>
          <div>
            <dt>competition</dt>
            <dd>競技・大会情報</dd>
          </div>
          <div>
            <dt>manufacturer</dt>
            <dd>メーカー情報</dd>
          </div>
          <div>
            <dt>primary</dt>
            <dd>一次情報</dd>
          </div>
          <div>
            <dt>official</dt>
            <dd>公式情報</dd>
          </div>
        </dl>
      </section>

      <section className="content-card">
        <h2>現在のメソッドデータ</h2>
        <dl className="detail-list">
          {visiblePlaceholderMethods.map((method) => (
            <div key={method.id}>
              <dt>{method.displayName}</dt>
              <dd>
                sourceStatus: {method.sourceStatus} / verificationLevel:{" "}
                {method.verificationLevel}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Page>
  );
}
