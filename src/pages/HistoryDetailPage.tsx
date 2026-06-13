import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getTipsForDisplayContext } from "../data/tips";
import { getBrewSessionById } from "../repositories";
import type { BrewSetup, TasteNote } from "../types";
import type { CoffeeTipRecipeCode } from "../types/tips";
import {
  formatDateTime,
  formatElapsedMs,
  getSessionMethodLabel,
  getSessionSetupFields,
  getSessionVariantLabel,
} from "../utils";
import { getRecipeStatusLabel, requiresReviewLabel } from "../utils/sourceStatus";

interface HistoryDetailPageProps {
  onReplayBrew: (setup: BrewSetup) => void;
}

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

function getHistoryDetailTipRecipeCode(setup: BrewSetup): CoffeeTipRecipeCode {
  if (setup.methodId === "four-six") return "406";
  if (setup.methodId === "ice-brew") return "ICE";
  if (setup.methodId === "hybrid" && setup.variantId === "R-08") {
    return "HYB_NEW";
  }
  if (setup.methodId === "ten-pour" && setup.variantId === "R-09") return "NEO";
  return "ALL";
}

export function HistoryDetailPage({ onReplayBrew }: HistoryDetailPageProps) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = sessionId ? getBrewSessionById(sessionId) : null;

  if (!session) {
    return <Navigate to="/history" replace />;
  }

  const currentSession = session;
  const { methodSnapshot, setupSnapshot, result } = currentSession;
  const needsReview = requiresReviewLabel(methodSnapshot);
  const variantLabel = getSessionVariantLabel(currentSession);
  const setupFields = getSessionSetupFields(currentSession);
  const historyDetailTipRecipeCode =
    getHistoryDetailTipRecipeCode(setupSnapshot);
  const recipeSpecificHistoryDetailTips =
    historyDetailTipRecipeCode === "ALL"
      ? []
      : getTipsForDisplayContext(
          "historyDetail",
          historyDetailTipRecipeCode,
        ).filter((tip) => tip.recipeCode === historyDetailTipRecipeCode);
  const globalHistoryDetailTips = getTipsForDisplayContext(
    "historyDetail",
    "ALL",
  ).filter((tip) => tip.recipeCode === "ALL");
  const historyDetailTips = [
    ...recipeSpecificHistoryDetailTips,
    ...globalHistoryDetailTips,
  ].slice(0, 2);

  function handleReplay() {
    onReplayBrew({
      ...setupSnapshot,
      createdAt: new Date().toISOString(),
    });
    navigate(`/setup/${currentSession.methodId}`);
  }

  return (
    <Page
      title="History Detail"
      description="1回分の抽出条件、味の印象、次回メモを確認します。"
      backTo="/history"
      className="visual-polish-page visual-polish-page--history-detail"
    >
      <section className="record-card record-card--summary">
        <div className="section-heading">
          <p className="eyebrow">{formatDateTime(session.finishedAtIso)}</p>
          <h2>
            {getSessionMethodLabel(currentSession)}
            {variantLabel ? ` ・ ${variantLabel}` : ""}
          </h2>
        </div>
        <dl className="detail-list detail-list--compact">
          <div>
            <dt>メソッド</dt>
            <dd>{getSessionMethodLabel(currentSession)}</dd>
          </div>
          {variantLabel && (
            <div>
              <dt>Variant</dt>
              <dd>{variantLabel}</dd>
            </div>
          )}
        </dl>
        <span className="status-pill">{getRecipeStatusLabel(methodSnapshot)}</span>
        {needsReview && (
          <p className="notice-text">
            保存時点の確認中データです。確定レシピではなく、この記録の条件として表示しています。
          </p>
        )}
      </section>

      {historyDetailTips.length > 0 && (
        <section
          className="record-card record-card--tips"
          aria-labelledby="history-detail-tips-label"
        >
          <div className="field-heading">
            <span id="history-detail-tips-label">POINT / TIPS</span>
          </div>
          <div className="history-detail-tip-list">
            {historyDetailTips.map((tip) => (
              <div className="history-detail-tip" key={tip.id}>
                <span className="status-pill status-pill--compact">
                  {tip.type}
                </span>
                <p>{tip.contentShortJa || tip.contentJa}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="record-card">
        <div className="section-heading">
          <p className="eyebrow">条件</p>
          <h2>入力条件</h2>
        </div>
        <dl className="record-list">
          {setupFields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
          <div>
            <dt>抽出時間</dt>
            <dd>{formatElapsedMs(session.elapsedMsAtFinish)}</dd>
          </div>
        </dl>
        <div className="memo-stack">
          <p>
            <strong>湯温メモ</strong>
            {setupSnapshot.waterTempMemo || "未記録"}
          </p>
          <p>
            <strong>挽き目メモ</strong>
            {setupSnapshot.grindMemo || "未記録"}
          </p>
          <p>
            <strong>準備メモ</strong>
            {setupSnapshot.freeMemo || "未記録"}
          </p>
        </div>
      </section>

      <section className="record-card">
        <div className="section-heading">
          <p className="eyebrow">味</p>
          <h2>記録</h2>
        </div>
        {result?.tasteNotes.length ? (
          <div className="tag-row">
            {result.tasteNotes.map((note) => (
              <span className="mini-tag" key={note}>
                {tasteNoteLabels[note]}
              </span>
            ))}
          </div>
        ) : (
          <p className="notice-text">味の印象タグは未記録です。</p>
        )}
        <dl className="detail-list">
          <div>
            <dt>ひとこと</dt>
            <dd>{result?.tasteImpression || "未記録"}</dd>
          </div>
          <div>
            <dt>評価</dt>
            <dd>{result?.rating ? `${result.rating}/5` : "未記録"}</dd>
          </div>
          <div>
            <dt>次回改善メモ</dt>
            <dd>{result?.nextAdjustmentMemo || "未記録"}</dd>
          </div>
          <div>
            <dt>任意メモ</dt>
            <dd>{result?.freeMemo || "未記録"}</dd>
          </div>
        </dl>
      </section>

      <button className="primary-cta" onClick={handleReplay} type="button">
        同じ条件で再抽出
      </button>
    </Page>
  );
}
