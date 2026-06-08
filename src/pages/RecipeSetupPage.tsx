import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Page } from "../components/layout/Page";
import {
  getDefaultVariantForMethod,
  getVariantById,
  getVariantsByMethodId,
  visiblePlaceholderMethods,
} from "../data";
import type { BrewMethodId, BrewSetup, BrewVariant, BrewVariantId } from "../types";
import { getRecipeStatusLabel } from "../utils/sourceStatus";

const coffeeGramOptions = [15, 18, 20, 24, 30];
const ratioOptions = [14, 15, 16];

interface RecipeSetupPageProps {
  onStartBrew: (setup: BrewSetup) => void;
  replaySetupDraft: BrewSetup | null;
  onReplaySetupConsumed: () => void;
}

function getVariantStatusLabel(variant: BrewVariant): string {
  if (variant.valuesArePlaceholder) return "レシピ確認中";
  if (variant.sourceStatus === "needsReview") return "出典確認中";
  if (variant.sourceStatus === "thirdParty") return "参考表示";
  if (variant.verificationLevel === "unverified") return "未確定";
  return "確認中";
}

function getInitialVariantId(methodId: BrewMethodId): BrewVariantId | undefined {
  return getDefaultVariantForMethod(methodId)?.id;
}

export function RecipeSetupPage({
  onStartBrew,
  replaySetupDraft,
  onReplaySetupConsumed,
}: RecipeSetupPageProps) {
  const { methodId } = useParams();
  const navigate = useNavigate();
  const method = visiblePlaceholderMethods.find((item) => item.id === methodId);

  const currentMethodId = method?.id;
  const [variantId, setVariantId] = useState<BrewVariantId | undefined>(() =>
    currentMethodId ? getInitialVariantId(currentMethodId) : undefined,
  );
  const selectedVariant =
    getVariantById(variantId) ??
    (currentMethodId ? getDefaultVariantForMethod(currentMethodId) : undefined);
  const methodVariants = currentMethodId
    ? getVariantsByMethodId(currentMethodId)
    : [];
  const isIceBrew = currentMethodId === "ice-brew";
  const showsFourSixVariantSelector = currentMethodId === "four-six";

  const [coffeeGrams, setCoffeeGrams] = useState(20);
  const [ratio, setRatio] = useState(15);
  const [hotWaterGrams, setHotWaterGrams] = useState(150);
  const [iceGrams, setIceGrams] = useState(80);
  const [finalYieldGrams, setFinalYieldGrams] = useState("");
  const [waterTempMemo, setWaterTempMemo] = useState("");
  const [grindMemo, setGrindMemo] = useState("");
  const [freeMemo, setFreeMemo] = useState("");

  useEffect(() => {
    if (!currentMethodId || replaySetupDraft?.methodId === currentMethodId) return;

    const defaultVariant = getDefaultVariantForMethod(currentMethodId);
    setVariantId(defaultVariant?.id);
    setCoffeeGrams(defaultVariant?.recommendedCoffeeGrams ?? 20);
    setRatio(defaultVariant?.recommendedRatio ?? 15);
    setHotWaterGrams(defaultVariant?.recommendedHotWaterGrams ?? 150);
    setIceGrams(defaultVariant?.recommendedIceGrams ?? 80);
    setFinalYieldGrams("");
  }, [currentMethodId, replaySetupDraft?.methodId]);

  useEffect(() => {
    if (!replaySetupDraft || replaySetupDraft.methodId !== currentMethodId) return;

    const replayVariant =
      getVariantById(replaySetupDraft.variantId) ??
      getDefaultVariantForMethod(replaySetupDraft.methodId);

    setVariantId(replayVariant?.id);
    setCoffeeGrams(replaySetupDraft.coffeeGrams);
    setRatio(replaySetupDraft.ratio ?? replayVariant?.recommendedRatio ?? 15);
    setHotWaterGrams(
      replaySetupDraft.hotWaterGrams ??
        replayVariant?.recommendedHotWaterGrams ??
        150,
    );
    setIceGrams(replaySetupDraft.iceGrams ?? replayVariant?.recommendedIceGrams ?? 80);
    setFinalYieldGrams(
      replaySetupDraft.finalYieldGrams
        ? String(replaySetupDraft.finalYieldGrams)
        : "",
    );
    setWaterTempMemo(replaySetupDraft.waterTempMemo);
    setGrindMemo(replaySetupDraft.grindMemo);
    setFreeMemo(replaySetupDraft.freeMemo);
    onReplaySetupConsumed();
  }, [currentMethodId, onReplaySetupConsumed, replaySetupDraft]);

  useEffect(() => {
    if (!selectedVariant || replaySetupDraft?.methodId === currentMethodId) return;

    setCoffeeGrams(selectedVariant.recommendedCoffeeGrams ?? 20);
    setRatio(selectedVariant.recommendedRatio ?? 15);
    setHotWaterGrams(selectedVariant.recommendedHotWaterGrams ?? 150);
    setIceGrams(selectedVariant.recommendedIceGrams ?? 80);
    setFinalYieldGrams("");
  }, [currentMethodId, replaySetupDraft?.methodId, selectedVariant]);

  const waterGrams = useMemo(
    () => Math.round(coffeeGrams * ratio),
    [coffeeGrams, ratio],
  );

  if (!method || !currentMethodId || !selectedVariant) {
    return <Navigate to="/" replace />;
  }

  const setupMethodId = currentMethodId;
  const setupVariant = selectedVariant;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const setup: BrewSetup = {
      methodId: setupMethodId,
      variantId: setupVariant.id,
      coffeeGrams,
      waterTempMemo,
      grindMemo,
      freeMemo,
      createdAt: new Date().toISOString(),
    };

    if (isIceBrew) {
      setup.hotWaterGrams = hotWaterGrams;
      setup.iceGrams = iceGrams;
      const parsedFinalYield = Number(finalYieldGrams);
      if (finalYieldGrams.trim() && Number.isFinite(parsedFinalYield)) {
        setup.finalYieldGrams = parsedFinalYield;
      }
    } else {
      setup.ratio = ratio;
      setup.waterGrams = waterGrams;
    }

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
          <div className="status-row">
            <span className="status-pill">{getRecipeStatusLabel(method)}</span>
            <span className="status-note">{selectedVariant.id}</span>
          </div>
          <p>
            {method.needsReviewReason} この画面で設定する値は、今回の抽出用の入力値です。確認中のレシピ値とは別に扱われます。
          </p>
        </section>

        {showsFourSixVariantSelector && (
          <section className="setup-card" aria-labelledby="variant-label">
            <div className="field-heading">
              <span id="variant-label">4:6 Method</span>
              <span>{selectedVariant.shortLabel}</span>
            </div>
            <div
              className="variant-chip-grid"
              role="group"
              aria-labelledby="variant-label"
            >
              {methodVariants.map((variant) => (
                <button
                  className={`variant-chip${
                    selectedVariant.id === variant.id ? " variant-chip--selected" : ""
                  }`}
                  key={variant.id}
                  onClick={() => setVariantId(variant.id)}
                  type="button"
                >
                  <span>{variant.shortLabel}</span>
                  {variant.isAdvanced && (
                    <small className="advanced-badge">Advanced</small>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="setup-card setup-card--variant">
          <div className="field-heading">
            <span>選択中variant</span>
            <span>{getVariantStatusLabel(selectedVariant)}</span>
          </div>
          <strong>{selectedVariant.displayName}</strong>
          <p>{selectedVariant.shortDescription}</p>
          {selectedVariant.isAdvanced && (
            <p className="recommendation-note">
              この派生の推奨: {selectedVariant.recommendedCoffeeGrams}g / 1:
              {selectedVariant.recommendedRatio}
            </p>
          )}
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
          <label className="inline-input" htmlFor="coffee-grams">
            <span>Custom</span>
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
          </label>
        </section>

        {isIceBrew ? (
          <>
            <section className="setup-card" aria-labelledby="hot-water-label">
              <div className="field-heading">
                <label id="hot-water-label" htmlFor="hot-water-grams">
                  注湯量
                </label>
                <span>{hotWaterGrams}g</span>
              </div>
              <input
                id="hot-water-grams"
                inputMode="numeric"
                min={1}
                onChange={(event) =>
                  setHotWaterGrams(Number(event.currentTarget.value) || 1)
                }
                type="number"
                value={hotWaterGrams}
              />
            </section>

            <section className="setup-card" aria-labelledby="ice-grams-label">
              <div className="field-heading">
                <label id="ice-grams-label" htmlFor="ice-grams">
                  氷量
                </label>
                <span>{iceGrams}g</span>
              </div>
              <input
                id="ice-grams"
                inputMode="numeric"
                min={1}
                onChange={(event) =>
                  setIceGrams(Number(event.currentTarget.value) || 1)
                }
                type="number"
                value={iceGrams}
              />
            </section>

            <section className="setup-card" aria-labelledby="final-yield-label">
              <div className="field-heading">
                <label id="final-yield-label" htmlFor="final-yield-grams">
                  完成量
                </label>
                <span>optional</span>
              </div>
              <input
                id="final-yield-grams"
                inputMode="numeric"
                min={1}
                onChange={(event) => setFinalYieldGrams(event.currentTarget.value)}
                placeholder="未入力でもOK"
                type="number"
                value={finalYieldGrams}
              />
              <p className="notice-text">
                氷をサーバーに入れたあと、スケールを0gにして注湯を開始します。
              </p>
            </section>
          </>
        ) : (
          <>
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
              {selectedVariant.isAdvanced && (
                <button
                  className={`choice-button choice-button--inline${
                    ratio === selectedVariant.recommendedRatio
                      ? " choice-button--selected"
                      : ""
                  }`}
                  onClick={() => setRatio(selectedVariant.recommendedRatio ?? 12)}
                  type="button"
                >
                  この派生の推奨: 1:{selectedVariant.recommendedRatio}
                </button>
              )}
              <label className="inline-input" htmlFor="ratio">
                <span>Custom</span>
                <input
                  id="ratio"
                  inputMode="numeric"
                  min={1}
                  onChange={(event) =>
                    setRatio(Number(event.currentTarget.value) || 1)
                  }
                  type="number"
                  value={ratio}
                />
              </label>
            </section>

            <section className="setup-card setup-card--result">
              <span>総湯量</span>
              <strong>{waterGrams}g</strong>
              <p>豆量 × 比率から自動計算しています。</p>
            </section>
          </>
        )}

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
