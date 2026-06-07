import { Page } from "../components/layout/Page";

export function AboutPage() {
  return (
    <Page
      title="このアプリについて"
      description="Pourōの概要ページです。本文はPR-006で実装します。"
      backTo="/settings"
    />
  );
}

