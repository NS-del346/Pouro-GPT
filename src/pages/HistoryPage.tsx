import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";

export function HistoryPage() {
  return (
    <Page
      title="History"
      description="抽出履歴一覧の土台です。履歴保存と表示はPR-005で実装します。"
    >
      <RouteLinks
        links={[{ label: "History Detailを確認", to: "/history/example" }]}
      />
    </Page>
  );
}

