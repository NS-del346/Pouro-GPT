import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVariantsByMethodId, visiblePlaceholderMethods } from "../data";
import { getBrewHistory } from "../repositories";
import type { BrewSetup } from "../types";
import {
  formatDateTime,
  getSessionMethodLabel,
  getSessionSetupSummary,
  getSessionVariantLabel,
} from "../utils";
import {
  getRecipeStatusLabel,
  getSourceStatusLabel,
  getVerificationLevelLabel,
  requiresReviewLabel,
} from "../utils/sourceStatus";

const methodGlyphLabels: Record<string, string> = {
  "four-six": "4:6",
  hybrid: "Hy",
  "ten-pour": "10",
  "ice-brew": "Ice",
};

interface BrewHomePageProps {
  onReplayBrew: (setup: BrewSetup) => void;
}

export function BrewHomePage({ onReplayBrew }: BrewHomePageProps) {
  const navigate = useNavigate();
  const firstMethodId = visiblePlaceholderMethods[0]?.id ?? "";
  const [selectedMethodId, setSelectedMethodId] = useState(firstMethodId);
  const latestSession = useMemo(() => getBrewHistory()[0] ?? null, []);

  const selectedMethod = useMemo(
    () =>
      visiblePlaceholderMethods.find((method) => method.id === selectedMethodId) ??
      visiblePlaceholderMethods[0],
    [selectedMethodId],
  );

  function handleReplayLatest() {
    if (!latestSession) return;

    onReplayBrew({
      ...latestSession.setupSnapshot,
      createdAt: new Date().toISOString(),
    });
    navigate(`/setup/${latestSession.methodId}`);
  }

  const latestVariantLabel = latestSession
    ? getSessionVariantLabel(latestSession)
    : null;

  return (
    <section
      className="brew-home visual-polish-page visual-polish-page--home"
      aria-labelledby="brew-home-title"
    >
      <header className="home-hero">
        <h1 aria-label="pourō" className="home-wordmark" id="brew-home-title">
          <span aria-hidden="true">
            pour
            <span className="wordmark-o">
              o<span className="wordmark-macron" />
            </span>
          </span>
        </h1>
        <p className="home-tagline">Pour slowly. Brew deeply.</p>
        <p>
          抽出メソッドを選び、次の画面であなたの抽出条件を設定します。
        </p>
      </header>

      {latestSession && (
        <article className="last-brew-card" aria-labelledby="last-brew-title">
          <header className="last-brew-card__header">
            <p className="eyebrow">Last Brew</p>
            <h2 id="last-brew-title">前回の条件で再抽出</h2>
          </header>
          <div className="last-brew-card__summary">
            <strong>{getSessionMethodLabel(latestSession)}</strong>
            {latestVariantLabel && <span>{latestVariantLabel}</span>}
            <p>{getSessionSetupSummary(latestSession)}</p>
          </div>
          <p className="last-brew-card__meta">
            完了 {formatDateTime(latestSession.finishedAtIso)}
          </p>
          <button
            className="last-brew-card__button"
            onClick={handleReplayLatest}
            type="button"
          >
            前回の条件を確認する
          </button>
        </article>
      )}

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
                {methodGlyphLabels[method.id] ?? method.shortName.slice(0, 2)}
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
