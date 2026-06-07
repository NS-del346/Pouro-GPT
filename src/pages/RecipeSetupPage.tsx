import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { visiblePlaceholderMethods } from "../data";
import type { BrewSetup } from "../types";
import { getRecipeStatusLabel } from "../utils/sourceStatus";

const coffeeGramOptions = [18, 20, 24, 30];
const ratioOptions = [14, 15, 16];

interface RecipeSetupPageProps {
  onStartBrew: (setup: BrewSetup) => void;
  replaySetupDraft: BrewSetup | null;
  onReplaySetupConsumed: () => void;
}

export function RecipeSetupPage({
  onStartBrew,
  replaySetupDraft,
  onReplaySetupConsumed,
}: RecipeSetupPageProps) {
  const { methodId } = useParams();
  const navigate = useNavigate();
  const method = visiblePlaceholderMethods.find((item) => item.id === methodId);

  const [coffeeGrams, setCoffeeGrams] = useState(20);
  const [ratio, setRatio] = useState(15);
  const [waterTempMemo, setWaterTempMemo] = useState("");
  const [grindMemo, setGrindMemo] = useState("");
  const [freeMemo, setFreeMemo] = useState("");

  useEffect(() => {
    if (!replaySetupDraft || replaySetupDraft.methodId !== methodId) return;

    setCoffeeGrams(replaySetupDraft.coffeeGrams);
    setRatio(replaySetupDraft.ratio);
    setWaterTempMemo(replaySetupDraft.waterTempMemo);
    setGrindMemo(replaySetupDraft.grindMemo);
    setFreeMemo(replaySetupDraft.freeMemo);
    onReplaySetupConsumed();
  }, [methodId, onReplaySetupConsumed, replaySetupDraft]);

  const waterGrams = useMemo(
    () => Math.round(coffeeGrams * ratio),
    [coffeeGrams, ratio],
  );

  if (!method || !methodId) {
    return <Navigate to="/" replace />;
  }

  const currentMethodId = methodId;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const setup: BrewSetup = {
      methodId: currentMethodId,
      coffeeGrams,
      ratio,
      waterGrams,
      waterTempMemo,
      grindMemo,
      freeMemo,
      createdAt: new Date().toISOString(),
    };

    onStartBrew(setup);
    navigate("/timer");
  }

  return (
    <Page
      title="Recipe Setup"
      description="抽出開始前に、今回使う条件だけを設定します。ここで入力する値は、確認中のレシピ値とは別に扱われます。"
      backTo="/"
    >
      <form className="setup-form" onSubmit={handleSubmit}>
        <section className="setup-method-summary">
          <div className="section-heading">
            <p className="eyebrow">選択中メソッド</p>
            <h2>{method.displayName}</h2>
          </div>
          <span className="status-pill">{getRecipeStatusLabel(method)}</span>
          <p>
            {method.needsReviewReason} この画面で設定する値は、今回の抽出用の入力値です。確認中のレシピ値とは別に扱われます。
          </p>
        </section>

        <section className="setup-card" aria-labelledby="coffee-grams-label">
          <div className="field-heading">
            <label id="coffee-grams-label" htmlFor="coffee-grams">
              豆量
            </label>
            <span>{coffeeGrams}g</span>
          </div>
          <div className="choice-row" role="group" aria-labelledby="coffee-grams-label">
            {coffeeGramOptions.map((value) => (
              <button
                className={`choice-button${
                  coffeeGrams === value ? " choice-button--selected" : ""
                }`}
                key={value}
                onClick={() => setCoffeeGrams(value)}
                type="button"
              >
                {value}g
              </button>
            ))}
          </div>
          <input
            id="coffee-grams"
            inputMode="numeric"
            min={1}
            onChange={(event) =>
              setCoffeeGrams(Number(event.currentTarget.value) || 1)
            }
            type="number"
            value={coffeeGrams}
          />
        </section>

        <section className="setup-card" aria-labelledby="ratio-label">
          <div className="field-heading">
            <label id="ratio-label" htmlFor="ratio">
              比率
            </label>
            <span>1:{ratio}</span>
          </div>
          <div className="choice-row" role="group" aria-labelledby="ratio-label">
            {ratioOptions.map((value) => (
              <button
                className={`choice-button${
                  ratio === value ? " choice-button--selected" : ""
                }`}
                key={value}
                onClick={() => setRatio(value)}
                type="button"
              >
                1:{value}
              </button>
            ))}
          </div>
          <input
            id="ratio"
            inputMode="numeric"
            min={1}
            onChange={(event) => setRatio(Number(event.currentTarget.value) || 1)}
            type="number"
            value={ratio}
          />
        </section>

        <section className="setup-card setup-card--result">
          <span>総湯量</span>
          <strong>{waterGrams}g</strong>
          <p>豆量 × 比率から自動計算しています。</p>
        </section>

        <label className="text-field">
          <span>湯温メモ</span>
          <input
            onChange={(event) => setWaterTempMemo(event.currentTarget.value)}
            placeholder="例: 少し低めにしたい"
            type="text"
            value={waterTempMemo}
          />
        </label>

        <label className="text-field">
          <span>挽き目メモ</span>
          <input
            onChange={(event) => setGrindMemo(event.currentTarget.value)}
            placeholder="例: 中細挽き寄り"
            type="text"
            value={grindMemo}
          />
        </label>

        <label className="text-field">
          <span>任意メモ</span>
          <textarea
            onChange={(event) => setFreeMemo(event.currentTarget.value)}
            placeholder="今回試したいことなど"
            rows={3}
            value={freeMemo}
          />
        </label>

        <button className="primary-cta" type="submit">
          抽出を開始する
        </button>
      </form>
    </Page>
  );
}
