import { Page } from "../components/layout/Page";

export function LegalPage() {
  return (
    <Page
      title="免責事項"
      description="Pourōの利用前に確認してほしい、独立性・出典・再現性に関する注意事項です。"
      backTo="/settings"
    >
      <section className="content-card">
        <h2>独立したアプリです</h2>
        <p>
          Pourōは、特定の個人、団体、メーカー、ブランド、著者、競技団体による
          公式・公認・監修・提携アプリではありません。
        </p>
      </section>

      <section className="content-card">
        <h2>抽出情報の扱い</h2>
        <p>
          アプリ内の抽出メソッド、手順、湯量、時間、説明文は、出典確認中
          または仮表示を含みます。確定レシピ、公式レシピ、完全再現手順として
          扱わないでください。
        </p>
      </section>

      <section className="content-card">
        <h2>結果の保証について</h2>
        <p>
          抽出結果、味、再現性、美味しさを保証するものではありません。豆、
          焙煎度、挽き目、水質、湯温、器具、注ぎ方、環境によって結果は変わります。
        </p>
      </section>

      <section className="content-card">
        <h2>名称の参照について</h2>
        <p>
          個人名、商品名、メーカー名、ブランド名、器具名等を参照する場合、
          それらは識別・説明目的であり、権利者との関係性を示すものではありません。
        </p>
      </section>

      <section className="content-card">
        <h2>健康・医療について</h2>
        <p>
          Pourōは健康効果・医療効果を扱うものではありません。
        </p>
      </section>
    </Page>
  );
}
