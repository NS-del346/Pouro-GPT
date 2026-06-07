import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { saveBrewSession } from "../repositories";
import type { BrewResult, BrewSession, TasteNote } from "../types";
import { formatElapsedMs } from "../utils";
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
    >
      <form className="finish-form" onSubmit={handleSave}>
        <section className="record-card">
          <div className="section-heading">
            <p className="eyebrow">今回の抽出</p>
            <h2>{methodSnapshot.displayName}</h2>
          </div>
          <span className="status-pill">{getRecipeStatusLabel(methodSnapshot)}</span>
          {needsReview && (
            <p className="notice-text">
              このメソッドのレシピ値は確認中です。確定レシピとして扱わず、記録用の条件として保存します。
            </p>
          )}
          <dl className="record-list">
            <div>
              <dt>コーヒー</dt>
              <dd>{setupSnapshot.coffeeGrams}g</dd>
            </div>
            <div>
              <dt>湯量</dt>
              <dd>{setupSnapshot.waterGrams}g</dd>
            </div>
            <div>
              <dt>比率</dt>
              <dd>1:{setupSnapshot.ratio}</dd>
            </div>
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
          <div className="choice-row" aria-label="評価">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                className={`choice-button${
                  rating === value ? " choice-button--selected" : ""
                }`}
                key={value}
                onClick={() => setRating(value as BrewResult["rating"])}
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
