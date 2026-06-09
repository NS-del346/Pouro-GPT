import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getBrewHistory } from "../repositories";
import type { TasteNote } from "../types";
import {
  formatDateTime,
  formatElapsedMs,
  getSessionMethodLabel,
  getSessionSetupSummary,
  getSessionVariantLabel,
} from "../utils";

const tasteNoteLabels: Record<TasteNote, string> = {
  clear: "クリア",
  sweet: "甘い",
  acidic: "酸味",
  bitter: "苦味",
  heavy: "重い",
  light: "軽い",
  balanced: "バランス",
  other: "その他",
};

function truncateMemo(memo: string): string {
  if (memo.length <= 42) return memo;
  return `${memo.slice(0, 42)}...`;
}

export function HistoryPage() {
  const history = useMemo(() => getBrewHistory(), []);

  return (
    <Page
      title="History"
      description="抽出の記録を研究ノートのように残します。統計ではなく、次の一杯のための履歴です。"
      className="visual-polish-page visual-polish-page--history"
    >
      {history.length === 0 ? (
        <section className="empty-state">
          <h2>まだ記録がありません</h2>
          <p>Brewから抽出を開始しましょう。</p>
          <Link className="primary-cta" to="/">
            Brewへ戻る
          </Link>
        </section>
      ) : (
        <section className="history-list" aria-label="保存履歴">
          {history.map((session) => {
            const result = session.result;
            const tasteNotes = result?.tasteNotes ?? [];
            const variantLabel = getSessionVariantLabel(session);

            return (
              <Link
                className="history-card"
                key={session.id}
                to={`/history/${session.id}`}
              >
                <div className="section-heading">
                  <p className="eyebrow">{formatDateTime(session.finishedAtIso)}</p>
                  <h2>{getSessionMethodLabel(session)}</h2>
                  {variantLabel && (
                    <p className="session-variant-label session-variant-label--compact">
                      {variantLabel}
                    </p>
                  )}
                </div>
                <p className="history-setup-summary">
                  {getSessionSetupSummary(session)}
                </p>
                <div className="history-card-meta">
                  <span>時間 {formatElapsedMs(session.elapsedMsAtFinish)}</span>
                  <span>評価 {result?.rating ? `${result.rating}/5` : "未記録"}</span>
                </div>
                {tasteNotes.length > 0 && (
                  <div className="tag-row">
                    {tasteNotes.map((note) => (
                      <span className="mini-tag" key={note}>
                        {tasteNoteLabels[note]}
                      </span>
                    ))}
                  </div>
                )}
                {result?.nextAdjustmentMemo && (
                  <p className="history-memo">
                    {truncateMemo(result.nextAdjustmentMemo)}
                  </p>
                )}
              </Link>
            );
          })}
        </section>
      )}
    </Page>
  );
}
