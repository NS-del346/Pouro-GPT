import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";

export function BrewTimerPage() {
  return (
    <Page
      title="Brew Timer"
      description="TimerロジックはPR-004で実装します。この画面ではBottom Tabsを表示しません。"
      backTo="/setup/example"
    >
      <RouteLinks links={[{ label: "Brew Finishを確認", to: "/finish" }]} />
    </Page>
  );
}

