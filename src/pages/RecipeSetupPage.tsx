import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";

export function RecipeSetupPage() {
  return (
    <Page
      title="Recipe Setup"
      description="抽出条件を設定する画面の土台です。入力項目はPR-003で実装します。"
      backTo="/"
    >
      <RouteLinks links={[{ label: "Timer画面を確認", to: "/timer" }]} />
    </Page>
  );
}

