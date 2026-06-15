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
      title="抽出結果"
      eyebrow="Brew Result"
      description="今回の条件と結果を確認し、忘れないうちに次の一杯へのメモを残します。"
      backTo="/"
      className="visual-polish-page visual-polish-page--finish"
    >
      <form className="finish-form" onSubmit={handleSave}>
        <section
          className="finish-result-hero"
          aria-labelledby="finish-result-heading"
        >
          <div className="finish-result-hero__topline">
            <span className="status-pill status-pill--compact">抽出完了</span>
            <span className="finish-save-state">
              履歴にはまだ保存されていません
            </span>
          </div>
          <div className="section-heading">
            <p className="eyebrow">今回の抽出</p>
            <h2 id="finish-result-heading">
              {methodSnapshot.displayName}
              {variantLabel ? ` ・ ${variantLabel}` : ""}
            </h2>
          </div>
          <div className="finish-result-hero__time">
            <span>完了時の抽出時間</span>
            <strong>{formatElapsedMs(sessionDraft.elapsedMsAtFinish)}</strong>
          </div>
          <p className="finish-result-hero__prompt">
            味の印象と、次に変えたいことを短く残してから保存します。
          </p>
        </section>

        <section
          className="record-card finish-condition-card"
          aria-labelledby="finish-condition-heading"
        >
          <div className="section-heading finish-section-heading">
            <p className="eyebrow">今回の条件</p>
            <h2 id="finish-condition-heading">条件スナップショット</h2>
          </div>
          <dl className="record-list">
            <div>
              <dt>メソッド</dt>
              <dd>{methodSnapshot.displayName}</dd>
            </div>
            <div>
              <dt>バリエーション</dt>
              <dd>{variantLabel || "未記録"}</dd>
            </div>
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
          <div className="status-row">
            <span className="status-pill">{getRecipeStatusLabel(methodSnapshot)}</span>
            <span className="status-note">保存時点のレシピ状態</span>
          </div>
          {needsReview && (
            <p className="notice-text">
              このメソッドのレシピ値は確認中です。確定レシピとして扱わず、記録用の条件として保存します。
            </p>
          )}
          <div className="memo-stack finish-condition-memos">
            <p>
              <strong>湯温メモ</strong>
              {setupSnapshot.waterTempMemo || "未記録"}
            </p>
            <p>
              <strong>挽き目メモ</strong>
              {setupSnapshot.grindMemo || "未記録"}
            </p>
            {setupSnapshot.freeMemo && (
              <p>
                <strong>準備メモ</strong>
                {setupSnapshot.freeMemo}
              </p>
            )}
          </div>
        </section>

        {finishTips.length > 0 && (
          <section
            className="record-card record-card--tips"
            aria-labelledby="finish-tips-label"
          >
            <div className="field-heading">
              <span id="finish-tips-label">抽出後の確認</span>
              <span>POINT / TIPS</span>
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

        <section
          className="record-card finish-feedback-card"
          aria-labelledby="finish-feedback-heading"
        >
          <div className="section-heading finish-section-heading">
            <p className="eyebrow">記録する前に</p>
            <h2 id="finish-feedback-heading">味の記録</h2>
            <p className="finish-section-description">
              今感じていることだけを、短く残せば十分です。
            </p>
          </div>

          <div className="finish-subsection">
            <div className="field-heading">
              <span>味の印象</span>
              <span>{tasteNotes.length > 0 ? `${tasteNotes.length}件選択` : "任意"}</span>
            </div>
            <div className="choice-row choice-row--wrap" aria-label="味の印象">
              {tasteNoteOptions.map((option) => (
                <button
                  aria-pressed={tasteNotes.includes(option.value)}
                  className={`choice-button${
                    tasteNotes.includes(option.value)
                      ? " choice-button--selected"
                      : ""
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
          </div>

          <div className="finish-subsection">
            <div className="field-heading">
              <span>評価</span>
              <span>{rating ? `${rating}/5` : "未選択"}</span>
            </div>
            <div className="choice-row choice-row--rating" aria-label="評価">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  aria-pressed={rating === value}
                  className={`choice-button${
                    rating !== null && rating >= value
                      ? " choice-button--selected"
                      : ""
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
          </div>

          <label className="text-field text-field--embedded">
            <span>任意メモ</span>
            <textarea
              onChange={(event) => setFreeMemo(event.currentTarget.value)}
              placeholder="豆や抽出中に気づいたこと"
              rows={3}
              value={freeMemo}
            />
          </label>
        </section>

        <section
          className="record-card finish-guidance-card"
          aria-labelledby="finish-guidance-heading"
        >
          <div className="section-heading finish-section-heading">
            <p className="eyebrow">次の一杯へ</p>
            <h2 id="finish-guidance-heading">変える点を1つだけ残す</h2>
          </div>
          <p className="finish-guidance-copy">
            酸味・甘み・濃さ・後味などから気になった点を振り返り、次回は挽き目・湯温・注湯リズムのどれを調整するかを1つに決めると比較しやすくなります。
          </p>
          <label className="text-field text-field--embedded">
            <span>次回改善メモ</span>
            <textarea
              onChange={(event) => setNextAdjustmentMemo(event.currentTarget.value)}
              placeholder="例: 次は挽き目だけを少し細かくする"
              rows={3}
              value={nextAdjustmentMemo}
            />
          </label>
        </section>

        <section
          className="record-card finish-save-card"
          aria-labelledby="finish-save-heading"
        >
          <div className="section-heading finish-section-heading">
            <p className="eyebrow">保存の確認</p>
            <h2 id="finish-save-heading">この抽出を履歴に保存</h2>
          </div>
          <p className="finish-save-copy">
            保存すると、今回の条件と入力した記録が履歴に追加されます。保存しない場合、この画面で入力した内容は残りません。
          </p>
          <div className="cta-stack">
            <button className="primary-cta" type="submit">
              履歴に保存する
            </button>
            <button className="secondary-cta" onClick={handleDiscard} type="button">
              保存せずBrewへ戻る
            </button>
          </div>
        </section>
      </form>
    </Page>
  );
}
