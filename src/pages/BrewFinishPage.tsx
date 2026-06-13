import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getTipsForDisplayContext } from "../data/tips";
import { saveBrewSession } from "../repositories";
import type { BrewResult, BrewSession, BrewSetup, TasteNote } from "../types";
import type { CoffeeTipRecipeCode } from "../types/tips";
import {
  formatElapsedMs,
  getSessionSetupFields,
  getSessionVariantLabel,
} from "../utils";
import { getRecipeStatusLabel, requiresReviewLabel } from "../utils/sourceStatus";

interface BrewFinishPageProps {
  finishedSessionDraft: BrewSession | null;
  onClearFinishedSession: () => void;
}

const tasteNoteOptions: Array<{ value: TasteNote; label: string }> = [
  { value: "clear", label: "クリア" },
  { value: "sweet", label: "甘い" },
  { value: "acidic", label: "酸味" },
  { value: "bitter", label: "苦味" },
  { value: "heavy", label: "重い" },
  { value: "light", label: "軽い" },
  { value: "balanced", label: "バランス" },
  { value: "other", label: "その他" },
];

function getFinishTipRecipeCode(setup: BrewSetup): CoffeeTipRecipeCode {
  if (setup.methodId === "four-six") return "406";
  if (setup.methodId === "ice-brew") return "ICE";
  if (setup.methodId === "hybrid" && setup.variantId === "R-08") {
    return "HYB_NEW";
  }
  if (setup.methodId === "ten-pour" && setup.variantId === "R-09") return "NEO";
  return "ALL";
}

export function BrewFinishPage({
  finishedSessionDraft,
  onClearFinishedSession,
}: BrewFinishPageProps) {
  const navigate = useNavigate();
  const [tasteNotes, setTasteNotes] = useState<TasteNote[]>([]);
  const [tasteImpression, setTasteImpression] = useState("");
  const [rating, setRating] = useState<BrewResult["rating"]>(null);
  const [nextAdjustmentMemo, setNextAdjustmentMemo] = useState("");
  const [freeMemo, setFreeMemo] = useState("");

  if (!finishedSessionDraft) {
    return <Navigate to="/" replace />;
  }

  const sessionDraft = finishedSessionDraft;
  const { methodSnapshot, setupSnapshot } = sessionDraft;
  const needsReview = requiresReviewLabel(methodSnapshot);
  const variantLabel = getSessionVariantLabel(sessionDraft);
  const setupFields = getSessionSetupFields(sessionDraft);
  const finishTipRecipeCode = getFinishTipRecipeCode(setupSnapshot);
  const recipeSpecificFinishTips =
    finishTipRecipeCode === "ALL"
      ? []
      : getTipsForDisplayContext("finish", finishTipRecipeCode).filter(
          (tip) => tip.recipeCode === finishTipRecipeCode,
        );
  const globalFinishTips = getTipsForDisplayContext("finish", "ALL").filter(
    (tip) => tip.recipeCode === "ALL",
  );
  const finishTips = [...recipeSpecificFinishTips, ...globalFinishTips].slice(0, 2);

  function toggleTasteNote(note: TasteNote) {
    setTasteNotes((currentNotes) =>
      currentNotes.includes(note)
        ? currentNotes.filter((item) => item !== note)
        : [...currentNotes, note],
    );
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nowIso = new Date().toISOString();
    const result: BrewResult = {
      tasteNotes,
      tasteImpression,
      rating,
      nextAdjustmentMemo,
      freeMemo,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    const savedSession: BrewSession = {
      ...sessionDraft,
      result,
    };

    saveBrewSession(savedSession);
    navigate(`/history/${savedSession.id}`);
  }

  function handleDiscard() {
    onClearFinishedSession();
    navigate("/");
  }

  return (
    <Page
      title="Brew Finish"
      description="抽出後の印象を短く残します。保存操作をするまで履歴には入りません。"
      backTo="/"
      className="visual-polish-page visual-polish-page--finish"
    >
      <form className="finish-form" onSubmit={handleSave}>
        <section className="record-card record-card--summary">
          <div className="section-heading">
            <p className="eyebrow">今回の抽出</p>
            <h2>
              {methodSnapshot.displayName}
              {variantLabel ? ` ・ ${variantLabel}` : ""}
            </h2>
            {variantLabel && (
              <p className="session-variant-label">{variantLabel}</p>
            )}
          </div>
          <span className="status-pill">{getRecipeStatusLabel(methodSnapshot)}</span>
          {needsReview && (
            <p className="notice-text">
              このメソッドのレシピ値は確認中です。確定レシピとして扱わず、記録用の条件として保存します。
            </p>
          )}
          <dl className="record-list">
            {setupFields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
            <div>
              <dt>抽出時間</dt>
              <dd>{formatElapsedMs(sessionDraft.elapsedMsAtFinish)}</dd>
            </div>
          </dl>
          {(setupSnapshot.waterTempMemo ||
            setupSnapshot.grindMemo ||
            setupSnapshot.freeMemo) && (
            <div className="memo-stack">
              {setupSnapshot.waterTempMemo && (
                <p>
                  <strong>湯温メモ</strong>
                  {setupSnapshot.waterTempMemo}
                </p>
              )}
              {setupSnapshot.grindMemo && (
                <p>
                  <strong>挽き目メモ</strong>
                  {setupSnapshot.grindMemo}
                </p>
              )}
              {setupSnapshot.freeMemo && (
                <p>
                  <strong>準備メモ</strong>
                  {setupSnapshot.freeMemo}
                </p>
              )}
            </div>
          )}
        </section>

        {finishTips.length > 0 && (
          <section
            className="record-card record-card--tips"
            aria-labelledby="finish-tips-label"
          >
            <div className="field-heading">
              <span id="finish-tips-label">POINT / TIPS</span>
            </div>
            <div className="finish-tip-list">
              {finishTips.map((tip) => (
                <div className="finish-tip" key={tip.id}>
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
          <div className="field-heading">
            <span>味の印象</span>
          </div>
          <div className="choice-row choice-row--wrap" aria-label="味の印象">
            {tasteNoteOptions.map((option) => (
              <button
                className={`choice-button${
                  tasteNotes.includes(option.value) ? " choice-button--selected" : ""
                }`}
                key={option.value}
                onClick={() => toggleTasteNote(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          <label className="text-field text-field--embedded">
            <span>ひとこと</span>
            <textarea
              onChange={(event) => setTasteImpression(event.currentTarget.value)}
              placeholder="例: 余韻は軽いが、少し平たい"
              rows={3}
              value={tasteImpression}
            />
          </label>
        </section>

        <section className="record-card">
          <div className="field-heading">
            <span>評価</span>
            <span>{rating ? `${rating}/5` : "未選択"}</span>
          </div>
          <div className="choice-row choice-row--rating" aria-label="評価">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                className={`choice-button${
                  rating !== null && rating >= value ? " choice-button--selected" : ""
                }`}
                key={value}
                onClick={() => setRating(value as BrewResult["rating"])}
                aria-label={`${value} / 5`}
                type="button"
              >
                {value}
              </button>
            ))}
          </div>
        </section>

        <label className="text-field">
          <span>次回改善メモ</span>
          <textarea
            onChange={(event) => setNextAdjustmentMemo(event.currentTarget.value)}
            placeholder="例: 次は少し細かく、湯温を下げる"
            rows={3}
            value={nextAdjustmentMemo}
          />
        </label>

        <label className="text-field">
          <span>任意メモ</span>
          <textarea
            onChange={(event) => setFreeMemo(event.currentTarget.value)}
            placeholder="豆や抽出中に気づいたこと"
            rows={3}
            value={freeMemo}
          />
        </label>

        <div className="cta-stack">
          <button className="primary-cta" type="submit">
            記録を保存する
          </button>
          <button className="secondary-cta" onClick={handleDiscard} type="button">
            保存せずBrewへ戻る
          </button>
        </div>
      </form>
    </Page>
  );
}
