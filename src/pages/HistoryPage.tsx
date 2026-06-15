import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getBrewHistory } from "../repositories";
import type { BrewSession, BrewSetup, TasteNote } from "../types";
import {
  formatDateTime,
  formatElapsedMs,
  getSessionMethodLabel,
  getSessionSetupSummary,
  getSessionVariantLabel,
} from "../utils";

const emptyLabel = "未記録";
const emptyMemoLabel = "メモなし";

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

interface HistoryPageProps {
  onReplayBrew: (setup: BrewSetup) => void;
}

type ConditionSnapshotItem = {
  label: string;
  value: string;
};

function formatOptionalGrams(value: number | undefined): string {
  return typeof value === "number" ? `${value}g` : emptyLabel;
}

function formatOptionalElapsed(value: number | null): string {
  return typeof value === "number" ? formatElapsedMs(value) : emptyLabel;
}

function truncateMemo(memo: string): string {
  if (memo.length <= 54) return memo;
  return `${memo.slice(0, 54)}...`;
}

function getConditionSnapshot(session: BrewSession): ConditionSnapshotItem[] {
  const setup = session.setupSnapshot;

  if (setup.methodId === "ice-brew") {
    return [
      { label: "コーヒー", value: formatOptionalGrams(setup.coffeeGrams) },
      { label: "注湯", value: formatOptionalGrams(setup.hotWaterGrams) },
      { label: "氷", value: formatOptionalGrams(setup.iceGrams) },
      { label: "時間", value: formatOptionalElapsed(session.elapsedMsAtFinish) },
    ];
  }

  return [
    { label: "コーヒー", value: formatOptionalGrams(setup.coffeeGrams) },
    { label: "湯量", value: formatOptionalGrams(setup.waterGrams) },
    {
      label: "比率",
      value: typeof setup.ratio === "number" ? `1:${setup.ratio}` : emptyLabel,
    },
    { label: "時間", value: formatOptionalElapsed(session.elapsedMsAtFinish) },
  ];
}

function hasRecordedFeedback(session: BrewSession): boolean {
  const result = session.result;

  return Boolean(
    result?.rating ||
      result?.tasteNotes.length ||
      result?.tasteImpression ||
      result?.nextAdjustmentMemo ||
      result?.freeMemo,
  );
}

export function HistoryPage(_props: HistoryPageProps) {
  const history = useMemo(() => getBrewHistory(), []);
  const feedbackCount = history.filter(hasRecordedFeedback).length;
  const latestSession = history[0] ?? null;

  return (
    <Page
      title="履歴"
      eyebrow="Brew Log"
      description="抽出の条件と味の記録を、次の一杯のために短く比較します。"
      className="visual-polish-page visual-polish-page--history"
    >
      {history.length === 0 ? (
        <section className="empty-state history-empty-state">
          <p className="eyebrow">抽出ログ</p>
          <h2>まだ履歴がありません</h2>
          <p>
            抽出を保存すると、条件と味のメモがここに並びます。
          </p>
          <Link className="primary-cta" to="/">
            Brewへ戻る
          </Link>
        </section>
      ) : (
        <>
          <section className="history-log-summary" aria-label="抽出ログの概要">
            <div>
              <span>保存済み</span>
              <strong>{history.length}</strong>
            </div>
            <div>
              <span>最新の記録</span>
              <strong>{latestSession ? formatDateTime(latestSession.finishedAtIso) : emptyLabel}</strong>
            </div>
            <div>
              <span>味の記録</span>
              <strong>{feedbackCount}</strong>
            </div>
          </section>

          <section className="history-list" aria-label="保存履歴">
            {history.map((session) => {
              const result = session.result;
              const tasteNotes = result?.tasteNotes ?? [];
              const variantLabel = getSessionVariantLabel(session);
              const conditionSnapshot = getConditionSnapshot(session);
              const nextMemo = result?.nextAdjustmentMemo
                ? truncateMemo(result.nextAdjustmentMemo)
                : emptyMemoLabel;

              return (
                <Link
                  aria-label={`${getSessionMethodLabel(session)} ${formatDateTime(
                    session.finishedAtIso,
                  )} 詳細を見る`}
                  className="history-card history-card--dashboard"
                  key={session.id}
                  to={`/history/${session.id}`}
                >
                  <div className="history-card__topline">
                    <span>{formatDateTime(session.finishedAtIso)}</span>
                    <span className="history-card__open">詳細を見る</span>
                  </div>

                  <div className="section-heading">
                    <p className="eyebrow">抽出ログ</p>
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

                  <dl className="history-condition-grid" aria-label="今回の条件">
                    {conditionSnapshot.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="history-feedback-summary">
                    <div className="history-feedback-summary__header">
                      <span>評価</span>
                      <strong>{result?.rating ? `${result.rating}/5` : emptyLabel}</strong>
                    </div>

                    <div className="history-feedback-summary__tags">
                      {tasteNotes.length > 0 ? (
                        <div className="tag-row">
                          {tasteNotes.map((note) => (
                            <span className="mini-tag" key={note}>
                              {tasteNoteLabels[note]}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span>{emptyLabel}</span>
                      )}
                    </div>

                    <p className="history-memo">
                      <span>次回メモ</span>
                      {nextMemo}
                    </p>
                  </div>
                </Link>
              );
            })}
          </section>
        </>
      )}
    </Page>
  );
}
