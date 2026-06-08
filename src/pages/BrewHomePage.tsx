import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getVariantsByMethodId, visiblePlaceholderMethods } from "../data";
import {
  getRecipeStatusLabel,
  getSourceStatusLabel,
  getVerificationLevelLabel,
  requiresReviewLabel,
} from "../utils/sourceStatus";

export function BrewHomePage() {
  const firstMethodId = visiblePlaceholderMethods[0]?.id ?? "";
  const [selectedMethodId, setSelectedMethodId] = useState(firstMethodId);

  const selectedMethod = useMemo(
    () =>
      visiblePlaceholderMethods.find((method) => method.id === selectedMethodId) ??
      visiblePlaceholderMethods[0],
    [selectedMethodId],
  );

  return (
    <section className="brew-home" aria-labelledby="brew-home-title">
      <header className="home-hero">
        <p className="logo-mark">pourō</p>
        <h1 id="brew-home-title">Pour slowly. Brew deeply.</h1>
        <p>
          抽出メソッドを選び、次の画面であなたの抽出条件を設定します。
        </p>
      </header>

      <div className="method-grid" aria-label="抽出メソッド">
        {visiblePlaceholderMethods.map((method) => {
          const isSelected = method.id === selectedMethod?.id;
          const statusLabel = getRecipeStatusLabel(method);
          const variantCount = getVariantsByMethodId(method.id).length;

          return (
            <button
              aria-pressed={isSelected}
              className={`method-card${isSelected ? " method-card--selected" : ""}`}
              key={method.id}
              onClick={() => setSelectedMethodId(method.id)}
              type="button"
            >
              <span className="method-glyph" aria-hidden="true">
                {method.shortName.slice(0, 2)}
              </span>
              <span className="method-card__name">{method.displayName}</span>
              <span className="method-card__description">
                {method.shortDescription}
              </span>
              {variantCount > 1 && (
                <span className="method-card__meta">{variantCount} variants</span>
              )}
              <span className="status-pill">{statusLabel}</span>
            </button>
          );
        })}
      </div>

      {selectedMethod && (
        <article className="selected-method-card">
          <div className="section-heading">
            <p className="eyebrow">選択中</p>
            <h2>{selectedMethod.displayName}</h2>
          </div>
          <div className="status-row">
            <span className="status-pill">
              {getRecipeStatusLabel(selectedMethod)}
            </span>
            {requiresReviewLabel(selectedMethod) && (
              <span className="status-note">確認中の参考情報です</span>
            )}
          </div>
          <p>{selectedMethod.longDescription}</p>
          <dl className="source-status-list">
            <div>
              <dt>出典状態</dt>
              <dd>{getSourceStatusLabel(selectedMethod.sourceStatus)}</dd>
            </div>
            <div>
              <dt>確認段階</dt>
              <dd>
                {getVerificationLevelLabel(selectedMethod.verificationLevel)}
              </dd>
            </div>
          </dl>
        </article>
      )}

      <Link
        aria-disabled={!selectedMethod}
        className={`primary-cta${!selectedMethod ? " primary-cta--disabled" : ""}`}
        to={selectedMethod ? `/setup/${selectedMethod.id}` : "/"}
      >
        レシピ設定へ
      </Link>
    </section>
  );
}
