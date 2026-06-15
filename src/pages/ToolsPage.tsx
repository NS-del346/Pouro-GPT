import { Page } from "../components/layout/Page";

export function ToolsPage() {
  return (
    <Page
      className="tools-page"
      title="ツール"
      eyebrow="Precision Brew Cockpit"
      description="抽出を支える補助ツールを準備するエリアです。"
    >
      <section
        className="content-card tools-placeholder"
        aria-labelledby="tools-planning-heading"
      >
        <span className="status-pill">計画中</span>
        <div className="section-heading">
          <p className="eyebrow">今後の実装</p>
          <h2 id="tools-planning-heading">クリック換算</h2>
        </div>
        <p>
          グラインダー間のクリック換算は、出典と検証状態を確認したうえで今後のPRで実装します。
        </p>
        <p className="tools-placeholder__note">
          現在、この画面では換算結果を提供していません。
        </p>
      </section>
    </Page>
  );
}
