import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";

export function BrewHomePage() {
  return (
    <Page
      eyebrow="pourō"
      title="Brew Home"
      description="抽出メソッドを選ぶ画面です。メソッドデータと完成UIは後続PRで実装します。"
    >
      <RouteLinks links={[{ label: "Recipe Setupを確認", to: "/setup/example" }]} />
    </Page>
  );
}

