import { Fragment, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Page } from "../components/layout/Page";
import {
  getDefaultVariantForMethod,
  getVariantById,
  getVariantsByMethodId,
  visiblePlaceholderMethods,
} from "../data";
import { getTipsForDisplayContext } from "../data/tips";
import type { BrewMethodId, BrewSetup, BrewVariant, BrewVariantId } from "../types";
import type { CoffeeTipRecipeCode } from "../types/tips";
import { getRecipeStatusLabel } from "../utils/sourceStatus";

const coffeeGramOptions = [15, 18, 20, 24, 30];
const ratioOptions = [14, 15, 16];
const fourSixTasteDirections = ["甘み", "標準", "酸味"] as const;
const fourSixCombinationRows: {
  strength: string;
  variantIds: (BrewVariantId | undefined)[];
}[] = [
  { strength: "軽め", variantIds: [undefined, undefined, undefined] },
  { strength: "標準", variantIds: ["R-02", "R-01", "R-03"] },
  { strength: "しっかり", variantIds: [undefined, undefined, undefined] },
];

function getFourSixFixedCopy(variantId: BrewVariantId): {
  label: string;
  schedule: string;
} | null {
  if (variantId === "R-01") {
    return { label: "バランス × 標準", schedule: "60g / 60g / 90g / 90g" };
  }

  if (variantId === "R-02") {
    return { label: "甘め寄り × 標準", schedule: "50g / 70g / 90g / 90g" };
  }

  if (variantId === "R-03") {
    return { label: "明るめ寄り × 標準", schedule: "70g / 50g / 90g / 90g" };
  }

  return null;
}

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

function getSetupTipRecipeCode(
  methodId: BrewMethodId,
  variantId: BrewVariantId,
): CoffeeTipRecipeCode {
  if (methodId === "four-six") return "406";
  if (methodId === "ice-brew") return "ICE";
  if (methodId === "hybrid" && variantId === "R-08") return "HYB_NEW";
  if (methodId === "ten-pour" && variantId === "R-09") return "NEO";
  return "ALL";
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
  const [showCustomCoffeeGrams, setShowCustomCoffeeGrams] = useState(false);
  const [showCustomRatio, setShowCustomRatio] = useState(false);
  const replayMethodDefaultSuppressedForRef = useRef<BrewMethodId | null>(null);
  const replayVariantDefaultSuppressedForRef = useRef<BrewVariantId | null>(null);

  useEffect(() => {
    if (!currentMethodId || replaySetupDraft?.methodId === currentMethodId) return;
    if (replayMethodDefaultSuppressedForRef.current === currentMethodId) {
      replayMethodDefaultSuppressedForRef.current = null;
      return;
    }

    const defaultVariant = getDefaultVariantForMethod(currentMethodId);
    setVariantId(defaultVariant?.id);
    setCoffeeGrams(defaultVariant?.recommendedCoffeeGrams ?? 20);
    setRatio(defaultVariant?.recommendedRatio ?? 15);
    setHotWaterGrams(defaultVariant?.recommendedHotWaterGrams ?? 150);
    setIceGrams(defaultVariant?.recommendedIceGrams ?? 80);
    setFinalYieldGrams("");
    setShowCustomCoffeeGrams(false);
    setShowCustomRatio(false);
  }, [currentMethodId, replaySetupDraft?.methodId]);

  useEffect(() => {
    if (!replaySetupDraft || replaySetupDraft.methodId !== currentMethodId) return;

    const replayVariant =
      getVariantById(replaySetupDraft.variantId) ??
      getDefaultVariantForMethod(replaySetupDraft.methodId);

    replayMethodDefaultSuppressedForRef.current = replaySetupDraft.methodId;
    replayVariantDefaultSuppressedForRef.current = replayVariant?.id ?? null;
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
    setShowCustomCoffeeGrams(
      !coffeeGramOptions.includes(replaySetupDraft.coffeeGrams),
    );
    setShowCustomRatio(
      replaySetupDraft.ratio !== undefined &&
        !ratioOptions.includes(replaySetupDraft.ratio),
    );
    onReplaySetupConsumed();
  }, [currentMethodId, onReplaySetupConsumed, replaySetupDraft]);

  useEffect(() => {
    if (!selectedVariant || replaySetupDraft?.methodId === currentMethodId) return;
    if (replayVariantDefaultSuppressedForRef.current === selectedVariant.id) {
      replayVariantDefaultSuppressedForRef.current = null;
      return;
    }

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
  const setupTipRecipeCode = getSetupTipRecipeCode(
    setupMethodId,
    setupVariant.id,
  );
  const recipeSpecificSetupTips =
    setupTipRecipeCode === "ALL"
      ? []
      : getTipsForDisplayContext("setup", setupTipRecipeCode).filter(
          (tip) => tip.recipeCode === setupTipRecipeCode,
        );
  const globalSetupTips = getTipsForDisplayContext("setup", "ALL").filter(
    (tip) => tip.recipeCode === "ALL",
  );
  const setupTips = [...recipeSpecificSetupTips, ...globalSetupTips].slice(0, 2);
  const fourSixFixedCopy =
    setupMethodId === "four-six" ? getFourSixFixedCopy(setupVariant.id) : null;
  const isFourSixFixedVariant = fourSixFixedCopy !== null;
  const isExactFourSixFixedSetup =
    isFourSixFixedVariant &&
    coffeeGrams === 20 &&
    ratio === 15 &&
    waterGrams === 300;
  const isHybridR08 =
    setupMethodId === "hybrid" && setupVariant.id === "R-08";
  const isExactHybridR08Setup =
    isHybridR08 &&
    coffeeGrams === 20 &&
    ratio === 15 &&
    waterGrams === 300;
  const isTenPourR09 =
    setupMethodId === "ten-pour" && setupVariant.id === "R-09";
  const isExactTenPourR09Setup =
    isTenPourR09 &&
    coffeeGrams === 20 &&
    ratio === 15 &&
    waterGrams === 300;
  const isIceBrewR10 =
    setupMethodId === "ice-brew" && setupVariant.id === "R-10";
  const isExactIceBrewR10Setup =
    isIceBrewR10 &&
    coffeeGrams === 20 &&
    hotWaterGrams === 150 &&
    iceGrams === 80;

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
      className="visual-polish-page visual-polish-page--setup"
    >
      <form className="setup-form" onSubmit={handleSubmit}>
        <section className="setup-method-summary">
          <div className="section-heading">
            <p className="eyebrow">選択中メソッド</p>
            <div className="setup-method-title-row">
              <h2>{method.displayName}</h2>
              <span className="selected-variant-badge">
                {selectedVariant.shortLabel}
              </span>
            </div>
          </div>
          <div className="status-row">
            <span className="status-pill status-pill--compact">
              {getRecipeStatusLabel(method)}
            </span>
          </div>
          <p>
            {method.needsReviewReason} この画面で設定する値は、今回の抽出用の入力値です。確認中のレシピ値とは別に扱われます。
          </p>
        </section>

        {showsFourSixVariantSelector && (
          <>
            <section
              className="setup-card four-six-combination-card"
              aria-labelledby="four-six-combination-label"
            >
              <div className="field-heading">
                <span id="four-six-combination-label">
                  味 × 濃さの9組み合わせ
                </span>
                <span className="status-pill status-pill--compact">設計中</span>
              </div>
              <p className="four-six-combination-description">
                最初の40%を味方向、後半60%を濃さの軸として整理します。軸ラベルと未対応セルは確認中です。
              </p>
              <div className="four-six-selection-summary" aria-live="polite">
                <span>現在の選択</span>
                <strong>{selectedVariant.shortLabel}</strong>
                <small>
                  {fourSixFixedCopy
                    ? `${fourSixFixedCopy.label}（固定例）`
                    : "9組み合わせへの対応確認中"}
                </small>
              </div>
              <div className="four-six-axis-note" aria-hidden="true">
                <span>横: 味方向</span>
                <span>縦: 濃さ</span>
              </div>
              <div
                className="four-six-combination-grid"
                role="group"
                aria-label="4:6 味方向と濃さの9組み合わせ"
              >
                <span className="four-six-matrix-corner" aria-hidden="true" />
                {fourSixTasteDirections.map((taste) => (
                  <span className="four-six-matrix-heading" key={taste}>
                    {taste}
                  </span>
                ))}
                {fourSixCombinationRows.map((row) => (
                  <Fragment key={row.strength}>
                    <span className="four-six-matrix-heading four-six-matrix-heading--row">
                      {row.strength}
                    </span>
                    {row.variantIds.map((cellVariantId, index) => {
                      const cellVariant = cellVariantId
                        ? methodVariants.find(
                            (variant) => variant.id === cellVariantId,
                          )
                        : undefined;
                      const isSelected = cellVariant?.id === selectedVariant.id;
                      const taste = fourSixTasteDirections[index];

                      return (
                        <button
                          aria-label={`${taste} × ${row.strength}: ${
                            cellVariant
                              ? `${cellVariant.shortLabel}を選択`
                              : "対応確認中"
                          }`}
                          aria-pressed={cellVariant ? isSelected : undefined}
                          className={`four-six-combination-cell${
                            isSelected
                              ? " four-six-combination-cell--selected"
                              : ""
                          }`}
                          disabled={!cellVariant}
                          key={`${row.strength}-${taste}`}
                          onClick={() => cellVariant && setVariantId(cellVariant.id)}
                          type="button"
                        >
                          <strong>
                            {cellVariant ? cellVariant.shortLabel : "確認中"}
                          </strong>
                          <small>{cellVariant ? "利用可能" : "設計中"}</small>
                        </button>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
              <p className="four-six-combination-note">
                現時点では標準の3方向（R-01 / R-02 / R-03）の固定例のみ対応しています。軽め・しっかり、R-04 以降、任意換算は確認中です。
              </p>
            </section>

            <section className="setup-card" aria-labelledby="variant-label">
              <div className="field-heading">
                <span id="variant-label">既存バリエーション</span>
              </div>
              <p className="four-six-variant-note">
                9組み合わせへの対応確認中の選択肢も、従来どおり選択できます。
              </p>
              <div
                className="variant-chip-grid"
                role="group"
                aria-labelledby="variant-label"
              >
                {methodVariants.map((variant) => (
                  <button
                    className={`variant-chip${
                      selectedVariant.id === variant.id
                        ? " variant-chip--selected"
                        : ""
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
          </>
        )}

        <section className="setup-card setup-card--variant">
          <div className="field-heading">
            <span>
              {showsFourSixVariantSelector
                ? "出典・確認状態"
                : "選択中バリエーション"}
            </span>
            <span className="status-pill status-pill--compact">
              {getVariantStatusLabel(selectedVariant)}
            </span>
          </div>
          <strong>{selectedVariant.displayName}</strong>
          <p>{selectedVariant.shortDescription}</p>
          {fourSixFixedCopy && (
            <p className="recommendation-note">
              {isExactFourSixFixedSetup
                ? `${setupVariant.id} ${fourSixFixedCopy.label}の固定例です。20g / 300g / 1:15、注湯は ${fourSixFixedCopy.schedule} です。任意換算には対応していません。`
                : `${setupVariant.id} の出典付き候補は 20g / 300g / 1:15 のみです。この設定では詳細スケジュールを確認中として表示します。`}
            </p>
          )}
          {isHybridR08 && (
            <p className="recommendation-note">
              {isExactHybridR08Setup
                ? "New Hybrid の固定例（20g / 300g）のみ出典付き候補として表示します。注湯は64g / 64g / 172gで、Switch OPEN/CLOSEDを文字で確認します。任意の粉量・比率への換算には対応していません。"
                : "New Hybrid の出典付き候補は20g / 300g / 1:15のみです。この設定では詳細スケジュールを確認中として表示します。"}
            </p>
          )}
          {isTenPourR09 && (
            <p className="recommendation-note">
              {isExactTenPourR09Setup
                ? "THE NEO BREWは20g / 300g / 1:15の固定例のみ表示します。約3:30は落ち切り目安で、任意換算は未対応です。"
                : "固定例候補は20g / 300g / 1:15のみです。この設定では確認中ガイドを表示します。"}
            </p>
          )}
          {isIceBrewR10 && (
            <p className="recommendation-note">
              {isExactIceBrewR10Setup
                ? "R-10 は20g / HOT 150g / ICE 80gの固定例です。タイマー累計目標はHOT注湯のみの150gで、ICEはサーバーに先入れします。"
                : "R-10 の固定例は20g / HOT 150g / ICE 80gのみです。この設定では詳細スケジュールを確認中として表示します。"}
            </p>
          )}
          {selectedVariant.isAdvanced && (
            <p className="recommendation-note">
              この派生の推奨: {selectedVariant.recommendedCoffeeGrams}g / 1:
              {selectedVariant.recommendedRatio}
            </p>
          )}
        </section>

        {setupTips.length > 0 && (
          <section
            className="setup-card setup-card--tips"
            aria-labelledby="setup-tips-label"
          >
            <div className="field-heading">
              <span id="setup-tips-label">POINT / TIPS</span>
            </div>
            <div className="setup-tip-list">
              {setupTips.map((tip) => (
                <div className="setup-tip" key={tip.id}>
                  <span className="status-pill status-pill--compact">
                    {tip.type}
                  </span>
                  <p>{tip.contentShortJa || tip.contentJa}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="setup-card" aria-labelledby="coffee-grams-label">
          <div className="field-heading">
            <span id="coffee-grams-label">豆量</span>
            <button
              aria-controls="coffee-grams-custom-row"
              aria-expanded={showCustomCoffeeGrams}
              aria-label={
                showCustomCoffeeGrams
                  ? "豆量のカスタム入力を閉じる"
                  : "豆量をカスタム入力する"
              }
              className={`custom-input-trigger${
                showCustomCoffeeGrams ? " custom-input-trigger--active" : ""
              }`}
              onClick={() => setShowCustomCoffeeGrams((isVisible) => !isVisible)}
              type="button"
            >
              Custom <span aria-hidden="true">⚙</span>
            </button>
          </div>
          <div className="choice-row" role="group" aria-labelledby="coffee-grams-label">
            {coffeeGramOptions.map((value) => (
              <button
                className={`choice-button${
                  coffeeGrams === value ? " choice-button--selected" : ""
                }`}
                key={value}
                onClick={() => {
                  setCoffeeGrams(value);
                  setShowCustomCoffeeGrams(false);
                }}
                type="button"
              >
                {value}g
              </button>
            ))}
          </div>
          {showCustomCoffeeGrams && (
            <label
              className="inline-input custom-input-row"
              htmlFor="coffee-grams"
              id="coffee-grams-custom-row"
            >
              <span>豆量 (g)</span>
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
          )}
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
                <span id="ratio-label">比率</span>
                <button
                  aria-controls="ratio-custom-row"
                  aria-expanded={showCustomRatio}
                  aria-label={
                    showCustomRatio
                      ? "比率のカスタム入力を閉じる"
                      : "比率をカスタム入力する"
                  }
                  className={`custom-input-trigger${
                    showCustomRatio ? " custom-input-trigger--active" : ""
                  }`}
                  onClick={() => setShowCustomRatio((isVisible) => !isVisible)}
                  type="button"
                >
                  Custom <span aria-hidden="true">⚙</span>
                </button>
              </div>
              <div className="choice-row" role="group" aria-labelledby="ratio-label">
                {ratioOptions.map((value) => (
                  <button
                    className={`choice-button${
                      ratio === value ? " choice-button--selected" : ""
                    }`}
                    key={value}
                    onClick={() => {
                      setRatio(value);
                      setShowCustomRatio(false);
                    }}
                    type="button"
                  >
                    1:{value}
                  </button>
                ))}
                {selectedVariant.isAdvanced && (
                  <button
                    aria-label={`${selectedVariant.shortLabel}の推奨比率 1:${selectedVariant.recommendedRatio}`}
                    className={`choice-button choice-button--inline${
                      ratio === selectedVariant.recommendedRatio
                        ? " choice-button--selected"
                        : ""
                    }`}
                    onClick={() => {
                      setRatio(selectedVariant.recommendedRatio ?? 12);
                      setShowCustomRatio(false);
                    }}
                    type="button"
                  >
                    推奨 1:{selectedVariant.recommendedRatio}
                  </button>
                )}
              </div>
              {showCustomRatio && (
                <label
                  className="inline-input custom-input-row"
                  htmlFor="ratio"
                  id="ratio-custom-row"
                >
                  <span>比率</span>
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
              )}
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
