import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMethodIconSrc } from "../assets/methods/methodIcons";
import { getVariantsByMethodId, visiblePlaceholderMethods } from "../data";
import { getBrewHistory } from "../repositories";
import type { BrewMethodId, BrewSetup } from "../types";
import { getSessionMethodLabel, getSessionSetupSummary } from "../utils";
import { getRecipeStatusLabel } from "../utils/sourceStatus";

interface BrewHomePageProps {
  onReplayBrew: (setup: BrewSetup) => void;
}

function getRecipeSignature(methodId: BrewMethodId): string {
  const variant = getVariantsByMethodId(methodId)[0];

  if (!variant) return "参考レシピ";

  const coffee = variant.recommendedCoffeeGrams;

  if (
    methodId === "ice-brew" &&
    coffee !== null &&
    variant.recommendedHotWaterGrams !== null &&
    variant.recommendedHotWaterGrams !== undefined &&
    variant.recommendedIceGrams !== null &&
    variant.recommendedIceGrams !== undefined
  ) {
    return `${coffee}g · HOT ${variant.recommendedHotWaterGrams}g · ICE ${variant.recommendedIceGrams}g`;
  }

  const water = variant.recommendedWaterGrams;
  const ratio = variant.recommendedRatio;

  if (coffee !== null && water !== null && ratio !== null) {
    return `${coffee}g · ${water}g · 1:${ratio}`;
  }

  return "固定例・確認中";
}

export function BrewHomePage({ onReplayBrew }: BrewHomePageProps) {
  const navigate = useNavigate();
  const firstMethodId = visiblePlaceholderMethods[0]?.id ?? "";
  const [selectedMethodId, setSelectedMethodId] = useState(firstMethodId);
  const latestSession = useMemo(() => getBrewHistory()[0] ?? null, []);
  const selectedCtaRef = useRef<HTMLAnchorElement>(null);
  const shouldCheckCtaVisibilityRef = useRef(false);

  const selectedMethod = useMemo(
    () =>
      visiblePlaceholderMethods.find((method) => method.id === selectedMethodId) ??
      visiblePlaceholderMethods[0],
    [selectedMethodId],
  );

  useLayoutEffect(() => {
    if (!shouldCheckCtaVisibilityRef.current) return;

    shouldCheckCtaVisibilityRef.current = false;
    const frameId = window.requestAnimationFrame(() => {
      const cta = selectedCtaRef.current;
      if (!cta) return;

      const ctaRect = cta.getBoundingClientRect();
      const bottomTabs = document.querySelector<HTMLElement>(".bottom-tabs");
      const bottomTabsRect = bottomTabs?.getBoundingClientRect();
      const viewportBottom = window.innerHeight;
      const visibleBottom =
        bottomTabsRect && bottomTabsRect.top < viewportBottom && bottomTabsRect.bottom > 0
          ? Math.min(viewportBottom, bottomTabsRect.top)
          : viewportBottom;
      const safetyMargin = 12;
      const hiddenAmount = ctaRect.bottom + safetyMargin - visibleBottom;

      if (hiddenAmount <= 0) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollBy({
        top: hiddenAmount,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [selectedMethodId]);

  function handleReplayLatest() {
    if (!latestSession) return;

    onReplayBrew({
      ...latestSession.setupSnapshot,
      createdAt: new Date().toISOString(),
    });
    navigate(`/setup/${latestSession.methodId}`);
  }

  function handleMethodSelect(methodId: BrewMethodId) {
    if (methodId === selectedMethodId) return;

    shouldCheckCtaVisibilityRef.current = true;
    setSelectedMethodId(methodId);
  }

  const latestSummary = latestSession
    ? getSessionSetupSummary(latestSession).replaceAll(" / ", " · ")
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
        <p>抽出メソッドを選び、次の画面であなたの抽出条件を設定します。</p>
      </header>

      {latestSession && latestSummary && (
        <button
          aria-label={`前回の条件を確認する。${getSessionMethodLabel(
            latestSession,
          )}、${latestSummary}`}
          className="last-brew-strip"
          onClick={handleReplayLatest}
          type="button"
        >
          <span className="last-brew-strip__summary">
            <span>前回：</span>
            <strong>{getSessionMethodLabel(latestSession)}</strong>
            <span aria-hidden="true"> · </span>
            <span>{latestSummary}</span>
          </span>
          <span className="last-brew-strip__arrow" aria-hidden="true">
            ›
          </span>
        </button>
      )}

      <div className="method-deck" aria-label="抽出メソッド">
        {visiblePlaceholderMethods.map((method, index) => {
          const isSelected = method.id === selectedMethod?.id;
          const triggerId = `method-${method.id}-trigger`;
          const panelId = `method-${method.id}-panel`;

          return (
            <article
              className={`method-deck-card${
                isSelected ? " method-deck-card--selected" : ""
              }`}
              key={method.id}
              style={{ "--method-index": index } as CSSProperties}
            >
              <button
                aria-controls={panelId}
                aria-expanded={isSelected}
                aria-pressed={isSelected}
                className="method-deck-card__tab"
                id={triggerId}
                onClick={() => handleMethodSelect(method.id)}
                type="button"
              >
                <span className="method-deck-card__tab-icon" aria-hidden="true">
                  <img
                    alt=""
                    aria-hidden="true"
                    src={getMethodIconSrc(method.id)}
                  />
                </span>
                <span className="method-deck-card__tab-name">{method.displayName}</span>
                <span className="method-deck-card__marker" aria-hidden="true">
                  {isSelected ? "✓" : ""}
                </span>
              </button>

              <div
                aria-labelledby={triggerId}
                className="method-deck-card__front"
                hidden={!isSelected}
                id={panelId}
                role="region"
              >
                <div className="method-deck-card__identity">
                  <span className="method-deck-card__front-icon" aria-hidden="true">
                    <img
                      alt=""
                      aria-hidden="true"
                      src={getMethodIconSrc(method.id)}
                    />
                  </span>
                  <div>
                    <h2>{method.displayName}</h2>
                    <p className="method-deck-card__signature">
                      {getRecipeSignature(method.id)}
                    </p>
                  </div>
                </div>
                <p className="method-deck-card__description">{method.shortDescription}</p>
                <span className="status-pill">{getRecipeStatusLabel(method)}</span>
                <Link
                  aria-disabled={!selectedMethod}
                  className={`method-deck-card__cta${
                    !selectedMethod ? " method-deck-card__cta--disabled" : ""
                  }`}
                  ref={isSelected ? selectedCtaRef : undefined}
                  to={selectedMethod ? `/setup/${selectedMethod.id}` : "/"}
                >
                  レシピ設定へ
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
