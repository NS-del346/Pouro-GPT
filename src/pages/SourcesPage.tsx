import { Page } from "../components/layout/Page";
import { visiblePlaceholderMethods } from "../data";

export function SourcesPage() {
  return (
    <Page
      title="出典・確認状況"
      description="Pourōで扱う抽出メソッド情報の出典・確認状況と、データの信頼度を示すメタデータについて説明します。"
      backTo="/settings"
    >
      <section className="content-card">
        <h2>現在のデータについて</h2>
        <p>
          現在のメソッドデータには、仮データ、確認中、第三者情報、調査・要約した
          情報、Pourō向けに整理した案内が含まれる場合があります。
        </p>
        <p>
          sourceStatus、verificationLevel、valuesArePlaceholderは、データの
          信頼度と確認状況を示すためのメタデータです。実際のメタデータが示さない
          限り、確認済み・公式の情報として扱いません。
        </p>
        <p>
          未確認または仮の値は、公式の原典レシピや完全な再現手順ではありません。
          正確さや忠実な再現が重要な場合は、原典を確認してください。
        </p>
      </section>

      <section className="content-card">
        <h2>出典状態（sourceStatus）</h2>
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
        <h2>確認段階（verificationLevel）</h2>
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
        <h2>仮の値（valuesArePlaceholder）</h2>
        <p>
          trueの場合、レシピ値に確認用の仮データが含まれます。公式の値や確認済みの
          原典レシピとして扱わないでください。
        </p>
      </section>

      <section className="content-card">
        <h2>現在のメソッドデータ</h2>
        <dl className="detail-list">
          {visiblePlaceholderMethods.map((method) => (
            <div key={method.id}>
              <dt>{method.displayName}</dt>
              <dd>
                出典状態: {method.sourceStatus} / 確認段階:{" "}
                {method.verificationLevel}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Page>
  );
}
