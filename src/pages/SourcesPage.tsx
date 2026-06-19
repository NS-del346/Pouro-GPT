import { Page } from "../components/layout/Page";
import { brewVariants, visiblePlaceholderMethods } from "../data";

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
          Pourōのメソッドデータには、出典に基づく情報、アプリ内で計算した情報、
          アプリ向けの案内、未解決の情報が混在します。
        </p>
        <p>
          sourceStatus、verificationLevel、valuesArePlaceholderは、データの
          信頼度と確認状況を示すためのメタデータです。実際のメタデータが示さない
          限り、確認済みの値として扱いません。
        </p>
        <p>
          出典名、人物名、ブランド名、器具名の表示は、参照元の識別と出典表示の
          ためです。出典元との提携関係や承認を示すものではありません。
        </p>
      </section>

      <section className="content-card">
        <h2>値の扱い</h2>
        <dl className="detail-list">
          <div>
            <dt>source-backed</dt>
            <dd>出典で確認できる値や説明です。</dd>
          </div>
          <div>
            <dt>app-calculated</dt>
            <dd>出典で確認できる入力値や式から、Pourōが計算した値です。</dd>
          </div>
          <div>
            <dt>app guidance</dt>
            <dd>画面表示、注意書き、操作案内など、Pourōが整理した案内です。</dd>
          </div>
          <div>
            <dt>unresolved</dt>
            <dd>まだ値を固定しない項目です。</dd>
          </div>
        </dl>
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
            <dd>確認済みとして扱えるデータ</dd>
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
            <dd>原典・提供元の直接発信</dd>
          </div>
        </dl>
      </section>

      <section className="content-card">
        <h2>仮の値（valuesArePlaceholder）</h2>
        <p>
          trueの場合、レシピ値に確認用の仮データが含まれます。falseでも、
          sourceStatusやverificationLevelがneedsReview / unverifiedの場合は、
          固定例として整理済みであっても最終確定や承認を意味しません。
        </p>
      </section>

      <section className="content-card">
        <h2>needsReview / unverified / placeholder</h2>
        <p>
          needsReviewとunverifiedは、候補データがあるが出典・解釈の注意が残る状態です。
          falseや無効という意味ではありません。
        </p>
        <p>
          placeholderは、実行用の値や手順がまだ固定されていない状態に使います。
          対応済みの固定例は、必要な注意を残しながらplaceholderとは分けて扱います。
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

      <section className="content-card">
        <h2>現在のバリエーション出典</h2>
        <dl className="detail-list">
          {brewVariants.map((variant) => (
            <div key={variant.id}>
              <dt>
                {variant.id} / {variant.displayName}
              </dt>
              <dd>
                <span>
                  出典状態: {variant.sourceStatus} / 確認段階:{" "}
                  {variant.verificationLevel}
                </span>
                {variant.sourceUrl && variant.sourceTitle && (
                  <>
                    {" "}
                    <a
                      href={variant.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {variant.sourceTitle}
                    </a>
                  </>
                )}
                {variant.sourceTitle && !variant.sourceUrl && (
                  <> {variant.sourceTitle}</>
                )}
                {variant.sourceNote && <p>{variant.sourceNote}</p>}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Page>
  );
}
