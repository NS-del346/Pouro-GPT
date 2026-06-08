import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getBrewHistory } from "../repositories";
import type { TasteNote } from "../types";
import { formatDateTime, formatElapsedMs } from "../utils";

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

function getSetupWaterLabel(session: ReturnType<typeof getBrewHistory>[number]): string {
  const setup = session.setupSnapshot;

  if (setup.methodId === "ice-brew") {
    return setup.hotWaterGrams ? `${setup.hotWaterGrams}g 注湯` : "未記録";
  }

  return setup.waterGrams ? `${setup.waterGrams}g` : "未記録";
}

function getSetupRatioLabel(session: ReturnType<typeof getBrewHistory>[number]): string {
  const setup = session.setupSnapshot;

  if (setup.methodId === "ice-brew") {
    return setup.iceGrams ? `${setup.iceGrams}g 氷` : "未記録";
  }

  return setup.ratio ? `1:${setup.ratio}` : "未記録";
}

export function HistoryPage() {
  const history = useMemo(() => getBrewHistory(), []);

  return (
    <Page
      title="History"
      description="抽出の記録を研究ノートのように残します。統計ではなく、次の一杯のための履歴です。"
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

            return (
              <Link
                className="history-card"
                key={session.id}
                to={`/history/${session.id}`}
              >
                <div className="section-heading">
                  <p className="eyebrow">{formatDateTime(session.finishedAtIso)}</p>
                  <h2>{session.methodSnapshot.displayName}</h2>
                </div>
                <dl className="record-list">
                  <div>
                    <dt>コーヒー</dt>
                    <dd>{session.setupSnapshot.coffeeGrams}g</dd>
                  </div>
                  <div>
                    <dt>{session.setupSnapshot.methodId === "ice-brew" ? "注湯量" : "湯量"}</dt>
                    <dd>{getSetupWaterLabel(session)}</dd>
                  </div>
                  <div>
                    <dt>{session.setupSnapshot.methodId === "ice-brew" ? "氷量" : "比率"}</dt>
                    <dd>{getSetupRatioLabel(session)}</dd>
                  </div>
                  <div>
                    <dt>時間</dt>
                    <dd>{formatElapsedMs(session.elapsedMsAtFinish)}</dd>
                  </div>
                  <div>
                    <dt>評価</dt>
                    <dd>{result?.rating ? `${result.rating}/5` : "未記録"}</dd>
                  </div>
                </dl>
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
