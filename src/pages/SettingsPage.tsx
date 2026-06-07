import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";

export function SettingsPage() {
  return (
    <Page
      title="Settings"
      description="設定と案内ページへの入口です。設定保存は後続PRで実装します。"
    >
      <RouteLinks
        links={[
          { label: "このアプリについて", to: "/settings/about" },
          { label: "出典・参考情報", to: "/settings/sources" },
          { label: "免責事項", to: "/settings/legal" },
          { label: "プライバシーポリシー", to: "/settings/privacy" },
        ]}
      />
    </Page>
  );
}

