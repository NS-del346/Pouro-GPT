import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";

export function BrewFinishPage() {
  return (
    <Page
      title="Brew Finish"
      description="抽出結果を記録する画面の土台です。保存機能はPR-005で実装します。"
      backTo="/"
    >
      <RouteLinks links={[{ label: "Historyを確認", to: "/history" }]} />
    </Page>
  );
}

