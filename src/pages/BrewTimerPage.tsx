import { Page } from "../components/layout/Page";
import { visiblePlaceholderMethods } from "../data";
import type { BrewSetup } from "../types";

interface BrewTimerPageProps {
  activeSetup: BrewSetup | null;
}

export function BrewTimerPage({ activeSetup }: BrewTimerPageProps) {
  const method = visiblePlaceholderMethods.find(
    (item) => item.id === activeSetup?.methodId,
  );

  return (
    <Page
      title="Brew Timer"
      description="Timer ロジックは PR-004 で実装します。PR-003 では Recipe Setup からここへ進めることだけを確認します。"
      backTo={activeSetup ? `/setup/${activeSetup.methodId}` : "/"}
    >
      <section className="timer-placeholder">
        <p className="eyebrow">PR-003 placeholder</p>
        <h2>{method ? method.displayName : "抽出準備"}</h2>
        {activeSetup ? (
          <p>
            Setup は一時的な React state で受け取りました。保存はまだ行いません。
          </p>
        ) : (
          <p>抽出条件はまだありません。Brew Home から設定してください。</p>
        )}
      </section>
    </Page>
  );
}
