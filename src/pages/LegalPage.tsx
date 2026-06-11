import { Page } from "../components/layout/Page";

export function LegalPage() {
  return (
    <Page
      title="免責事項"
      description="Pourōの非公式な位置づけ、第三者名称、メソッドデータ、抽出結果に関する注意事項です。"
      backTo="/settings"
    >
      <section className="content-card">
        <h2>非公式の位置づけ</h2>
        <p>
          Pourōは個人制作の非公式なコーヒーブリューガイドPWAです。粕谷哲氏、
          PHILOCOFFEA、HARIO、その他参照される個人、会社、メーカー、ブランドの
          公式・スポンサー・公認・監修・提携・承認を受けたものではありません。
        </p>
      </section>

      <section className="content-card">
        <h2>第三者名称とブランド</h2>
        <p>
          第三者の名称、ブランド名、商品名、器具名は、説明と識別のためだけに
          使用しています。その使用は、公認、提携、パートナーシップ、監修、
          承認を意味しません。
        </p>
      </section>

      <section className="content-card">
        <h2>メソッドとレシピデータ</h2>
        <p>
          レシピ値、手順、その他のメソッドデータには、確認済み、調査・要約・解釈
          した情報、Pourō向けの案内、未確認または仮の値が含まれる場合があります。
          Pourōは抽出補助ツールであり、原典メソッドの公式または完全な再現では
          ありません。
        </p>
      </section>

      <section className="content-card">
        <h2>抽出結果について</h2>
        <p>
          Pourōは、味、抽出結果、正確さ、原典メソッドの忠実な再現を保証しません。
          豆、焙煎度、挽き目、水質、湯温、器具、注ぎ方、環境によって結果は変わります。
        </p>
      </section>

      <section className="content-card">
        <h2>健康・医療に関する注意</h2>
        <p>
          Pourōは健康・医療上の助言や診断を提供するものではありません。
        </p>
      </section>
    </Page>
  );
}
