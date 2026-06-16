import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getTipsForDisplayContext } from "../data/tips";
import { getBrewSessionById } from "../repositories";
import type { BrewSession, BrewSetup, TasteNote } from "../types";
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

type DetailItem = {
  label: string;
  value: string;
};

const emptyLabel = "未記録";
const emptyMemoLabel = "メモなし";
const checkingLabel = "確認中";

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

function displayMemo(value: string | undefined): string {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : emptyMemoLabel;
}

function displayText(value: string | undefined): string {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : emptyLabel;
}

function displayElapsed(value: number | null): string {
  return typeof value === "number" ? formatElapsedMs(value) : emptyLabel;
}

function getConditionSnapshot(session: BrewSession): DetailItem[] {
  return [
    ...getSessionSetupFields(session),
    {
      label: "完了時間",
      value: displayElapsed(session.elapsedMsAtFinish),
    },
  ];
}

function getHeaderSnapshot(
  session: BrewSession,
  variantLabel: string | null,
): DetailItem[] {
  return [
    {
      label: "保存時間",
      value: formatDateTime(session.finishedAtIso),
    },
    {
      label: "メソッド",
      value: getSessionMethodLabel(session),
    },
    {
      label: "バリアント",
      value: variantLabel ?? emptyLabel,
    },
  ];
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
  const headerSnapshot = getHeaderSnapshot(currentSession, variantLabel);
  const conditionSnapshot = getConditionSnapshot(currentSession);
  const recipeStatusLabel = getRecipeStatusLabel(methodSnapshot);
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
      title="履歴詳細"
      description="保存された1回分の条件と味の記録を、次回に向けて確認します。"
      backTo="/history"
      className="visual-polish-page visual-polish-page--history-detail"
    >
      <section className="record-card history-detail-hero">
        <div className="history-detail-hero__topline">
          <p className="eyebrow">保存された抽出</p>
          <span className="status-pill">{recipeStatusLabel}</span>
        </div>

        <div className="section-heading">
          <h2>
            {getSessionMethodLabel(currentSession)}
            {variantLabel ? ` ・ ${variantLabel}` : ""}
          </h2>
          <p className="history-detail-date">
            {formatDateTime(currentSession.finishedAtIso)}
          </p>
        </div>

        <dl className="history-detail-key-grid" aria-label="保存内容">
          {headerSnapshot.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="record-card history-detail-section">
        <div className="section-heading">
          <p className="eyebrow">Condition Snapshot</p>
          <h2>今回の条件</h2>
        </div>
        <dl className="history-detail-condition-grid">
          {conditionSnapshot.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="record-card history-detail-section">
        <div className="section-heading">
          <p className="eyebrow">Setup Memo</p>
          <h2>準備メモ</h2>
        </div>
        <dl className="history-detail-memo-list">
          <div>
            <dt>湯温メモ</dt>
            <dd>{displayMemo(setupSnapshot.waterTempMemo)}</dd>
          </div>
          <div>
            <dt>挽き目メモ</dt>
            <dd>{displayMemo(setupSnapshot.grindMemo)}</dd>
          </div>
          <div>
            <dt>準備メモ</dt>
            <dd>{displayMemo(setupSnapshot.freeMemo)}</dd>
          </div>
        </dl>
      </section>

      <section className="record-card history-detail-section">
        <div className="section-heading">
          <p className="eyebrow">Result / Feedback</p>
          <h2>味の記録</h2>
        </div>

        <div className="history-detail-feedback-summary">
          <div>
            <span>評価</span>
            <strong>{result?.rating ? `${result.rating}/5` : emptyLabel}</strong>
          </div>
          <div>
            <span>完了時間</span>
            <strong>{displayElapsed(currentSession.elapsedMsAtFinish)}</strong>
          </div>
        </div>

        {result?.tasteNotes.length ? (
          <div className="tag-row history-detail-tag-row" aria-label="味タグ">
            {result.tasteNotes.map((note) => (
              <span className="mini-tag" key={note}>
                {tasteNoteLabels[note]}
              </span>
            ))}
          </div>
        ) : (
          <p className="notice-text">味の印象タグは{emptyLabel}です。</p>
        )}

        <dl className="history-detail-memo-list history-detail-memo-list--result">
          <div>
            <dt>ひとこと</dt>
            <dd>{displayText(result?.tasteImpression)}</dd>
          </div>
          <div>
            <dt>任意メモ</dt>
            <dd>{displayMemo(result?.freeMemo)}</dd>
          </div>
        </dl>
      </section>

      <section className="record-card history-detail-section history-detail-next-card">
        <div className="section-heading">
          <p className="eyebrow">Next Cup</p>
          <h2>次回メモ</h2>
        </div>
        <p>{displayMemo(result?.nextAdjustmentMemo)}</p>
      </section>

      <section className="record-card history-detail-section history-detail-source-card">
        <div className="section-heading">
          <p className="eyebrow">Source / Verification</p>
          <h2>出典・確認状態</h2>
        </div>
        <dl className="history-detail-source-list">
          <div>
            <dt>状態</dt>
            <dd>{recipeStatusLabel}</dd>
          </div>
          <div>
            <dt>確認</dt>
            <dd>{needsReview ? checkingLabel : "確認済み"}</dd>
          </div>
        </dl>
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

      <section className="record-card history-detail-rebrew-card">
        <div className="section-heading">
          <p className="eyebrow">Rebrew</p>
          <h2>同じ条件で再抽出</h2>
        </div>
        <p>
          保存された条件をRecipe Setupに読み込みます。開始前に豆量やメモを確認できます。
        </p>
        <button className="primary-cta" onClick={handleReplay} type="button">
          同じ条件で再抽出
        </button>
      </section>
    </Page>
  );
}
