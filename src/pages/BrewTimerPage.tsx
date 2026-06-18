import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { getRecipeForSetup, visiblePlaceholderMethods } from "../data";
import { getTipsForDisplayContext } from "../data/tips";
import type {
  BrewSession,
  BrewSetup,
  BrewStep,
  TimerStatus,
} from "../types";
import type { CoffeeTipRecipeCode } from "../types/tips";
import { createId, formatRecipeGrams } from "../utils";

interface BrewTimerPageProps {
  activeSetup: BrewSetup | null;
  onFinishBrew: (session: BrewSession) => void;
}

function formatTimerMs(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatStepTime(sec: number): string {
  return formatTimerMs(sec * 1000);
}

function hasScheduleNumber(
  value: number | null | undefined,
): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function formatNumericRange(
  range: NonNullable<BrewStep["pourGramsRange"]>,
): string {
  if (range.label) return range.label;

  const unitLabel =
    range.unit === "grams" ? "g" : range.unit === "celsius" ? "°C" : "秒";

  return `${range.min}-${range.max}${unitLabel}`;
}

function getCumulativeWaterGrams(step: BrewStep): number | null {
  return step.cumulativeWaterGrams === undefined
    ? step.totalWaterGrams
    : step.cumulativeWaterGrams;
}

function getTimerTipRecipeCode(setup: BrewSetup): CoffeeTipRecipeCode {
  if (setup.methodId === "four-six") return "406";
  if (setup.methodId === "ice-brew") return "ICE";
  if (setup.methodId === "hybrid" && setup.variantId === "R-08") {
    return "HYB_NEW";
  }
  if (setup.methodId === "ten-pour" && setup.variantId === "R-09") return "NEO";
  return "ALL";
}

export function BrewTimerPage({ activeSetup, onFinishBrew }: BrewTimerPageProps) {
  const navigate = useNavigate();
  const method = visiblePlaceholderMethods.find(
    (item) => item.id === activeSetup?.methodId,
  );
  const recipe =
    method && activeSetup ? getRecipeForSetup(method, activeSetup) : method?.recipe;
  const steps = recipe?.steps ?? [];
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("idle");
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [pausedAtMs, setPausedAtMs] = useState<number | null>(null);
  const [totalPausedMs, setTotalPausedMs] = useState(0);
  const [elapsedMsAtFinish, setElapsedMsAtFinish] = useState<number | null>(
    null,
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (timerStatus !== "running") return;

    const tickId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => window.clearInterval(tickId);
  }, [timerStatus]);

  const elapsedMs = useMemo(() => {
    if (timerStatus === "finished" && elapsedMsAtFinish !== null) {
      return elapsedMsAtFinish;
    }

    if (startedAtMs === null) return 0;

    const effectiveNowMs =
      timerStatus === "paused" && pausedAtMs !== null ? pausedAtMs : nowMs;

    return Math.max(0, effectiveNowMs - startedAtMs - totalPausedMs);
  }, [
    elapsedMsAtFinish,
    nowMs,
    pausedAtMs,
    startedAtMs,
    timerStatus,
    totalPausedMs,
  ]);

  if (!activeSetup || !method || !recipe || steps.length === 0) {
    return <Navigate to="/" replace />;
  }

  const currentMethod = method;
  const currentRecipe = recipe;
  const currentSetup = activeSetup;
  const currentStep = steps[currentStepIndex] ?? steps[0];
  const nextStep = steps[currentStepIndex + 1] ?? null;
  const isLastStep = currentStepIndex >= steps.length - 1;
  const canMoveBack = currentStepIndex > 0 && timerStatus !== "finished";
  const cumulativeWaterGrams = getCumulativeWaterGrams(currentStep);
  const nextStepTimeSec = hasScheduleNumber(currentStep.nextStepTimeSec)
    ? currentStep.nextStepTimeSec
    : nextStep && hasScheduleNumber(nextStep.startSec)
      ? nextStep.startSec
      : null;
  const nextStepCountdownMs =
    nextStepTimeSec === null
      ? null
      : Math.max(0, nextStepTimeSec * 1000 - elapsedMs);
  const hasReachedNextStep =
    nextStepTimeSec !== null && elapsedMs >= nextStepTimeSec * 1000;
  const isPlaceholderSchedule =
    currentRecipe.valuesArePlaceholder ||
    steps.some((step) => step.isPlaceholder);
  const isFourSixR01 =
    currentSetup.methodId === "four-six" && currentSetup.variantId === "R-01";
  const isR01BasicCandidate = isFourSixR01 && !isPlaceholderSchedule;
  const isHybridR08 =
    currentSetup.methodId === "hybrid" && currentSetup.variantId === "R-08";
  const isHybridR08Candidate = isHybridR08 && !isPlaceholderSchedule;
  const isTenPourR09 =
    currentSetup.methodId === "ten-pour" && currentSetup.variantId === "R-09";
  const isTenPourR09Candidate = isTenPourR09 && !isPlaceholderSchedule;
  const timerTipRecipeCode = getTimerTipRecipeCode(currentSetup);
  const recipeSpecificTimerTips =
    timerTipRecipeCode === "ALL"
      ? []
      : getTipsForDisplayContext("timer", timerTipRecipeCode).filter(
          (tip) => tip.recipeCode === timerTipRecipeCode,
        );
  const globalTimerTips = getTipsForDisplayContext("timer", "ALL").filter(
    (tip) => tip.recipeCode === "ALL",
  );
  const timerTip = [...recipeSpecificTimerTips, ...globalTimerTips][0];
  const semanticChip = isPlaceholderSchedule
    ? null
    : getTimerSemanticChip(currentSetup, currentStep.order, steps.length);

  function calculateElapsedMs(finishedAtMs: number): number {
    if (startedAtMs === null) return 0;

    const effectiveFinishedAtMs =
      timerStatus === "paused" && pausedAtMs !== null ? pausedAtMs : finishedAtMs;

    return Math.max(0, effectiveFinishedAtMs - startedAtMs - totalPausedMs);
  }

  function handleStart() {
    const startedAt = Date.now();

    setStartedAtMs(startedAt);
    setPausedAtMs(null);
    setTotalPausedMs(0);
    setElapsedMsAtFinish(null);
    setCurrentStepIndex(0);
    setNowMs(startedAt);
    setTimerStatus("running");
  }

  function handlePause() {
    if (timerStatus !== "running") return;

    const pausedAt = Date.now();
    setPausedAtMs(pausedAt);
    setNowMs(pausedAt);
    setTimerStatus("paused");
  }

  function handleResume() {
    if (timerStatus !== "paused" || pausedAtMs === null) return;

    const resumedAt = Date.now();
    setTotalPausedMs((currentTotalPausedMs) => {
      return currentTotalPausedMs + resumedAt - pausedAtMs;
    });
    setPausedAtMs(null);
    setNowMs(resumedAt);
    setTimerStatus("running");
  }

  function handleBack() {
    setCurrentStepIndex((index) => Math.max(0, index - 1));
  }

  function handleNextOrFinish() {
    if (!isLastStep) {
      setCurrentStepIndex((index) => Math.min(steps.length - 1, index + 1));
      return;
    }

    const finishedAt = Date.now();
    const finalElapsedMs = calculateElapsedMs(finishedAt);
    const sessionStartedAtMs = startedAtMs ?? finishedAt;

    const finishedSessionDraft: BrewSession = {
      id: createId(),
      methodId: currentMethod.id,
      methodSnapshot: currentMethod,
      setupSnapshot: currentSetup,
      timerStatus: "finished",
      startedAtIso: new Date(sessionStartedAtMs).toISOString(),
      finishedAtIso: new Date(finishedAt).toISOString(),
      startedAtMs: sessionStartedAtMs,
      pausedAtMs,
      totalPausedMs,
      elapsedMsAtFinish: finalElapsedMs,
      currentStepIndex,
      completed: true,
      cancelled: false,
      result: null,
    };

    setElapsedMsAtFinish(finalElapsedMs);
    setNowMs(finishedAt);
    setTimerStatus("finished");
    onFinishBrew(finishedSessionDraft);
    navigate("/finish");
  }

  const timerActionLabel =
    timerStatus === "paused"
      ? "再開"
      : timerStatus === "idle"
        ? "開始"
        : "一時停止";

  const statusLabel: Record<TimerStatus, string> = {
    idle: "開始前",
    running: "抽出中",
    paused: "一時停止",
    finished: "完了",
    cancelled: "中止",
  };

  return (
    <Page
      title="Brew Timer"
      description="抽出中の経過時間、現在のステップ、次の操作を確認します。記録はFinish後の画面で保存できます。"
      className="visual-polish-page visual-polish-page--timer"
    >
      <section className="timer-core" aria-labelledby="timer-method-title">
        <div className="timer-cockpit-scroll">
          <div className="timer-method-summary">
            <p className="eyebrow">{statusLabel[timerStatus]}</p>
            <h2 id="timer-method-title">{method.displayName}</h2>
            <span className="status-pill">
              {isR01BasicCandidate
                ? "R-01 基本候補"
                : isHybridR08Candidate
                  ? "R-08 固定例候補"
                  : isTenPourR09Candidate
                    ? "R-09 固定例候補"
                    : "レシピ値確認中"}
            </span>
          </div>

        {isR01BasicCandidate && (
          <p className="timer-schedule-note">
            <strong>20g / 300g / 1:15 の出典付き候補</strong>
            <span>
              03:30 はドリッパーを外す操作です。自然な落ち切り完了を保証する時刻ではありません。ほかの 4:6 派生は確認中です。
            </span>
          </p>
        )}

        {isFourSixR01 && isPlaceholderSchedule && (
          <p className="timer-schedule-note">
            <strong>R-01 の出典付き候補は 20g / 300g / 1:15 のみです</strong>
            <span>この設定の詳細スケジュールは確認中です。</span>
          </p>
        )}

        {isHybridR08Candidate && (
          <p className="timer-schedule-note">
            <strong>New Hybrid 固定例（20g / 300g）</strong>
            <span>
              注湯は64g / 64g / 172gです。Switch OPEN/CLOSEDを文字で確認してください。3:00は仕上がり目安で、70-80°Cは液温目安のみです。常温水の量や温度は固定表示しません。任意換算には対応していません。Pourōは非公式で、出典元との提携関係はありません。
            </span>
          </p>
        )}

        {isHybridR08 && isPlaceholderSchedule && (
          <p className="timer-schedule-note">
            <strong>New Hybrid の出典付き候補は 20g / 300g / 1:15 のみです</strong>
            <span>この設定ではplaceholder手順を表示しています。</span>
          </p>
        )}

        {isTenPourR09Candidate && (
          <p className="timer-schedule-note">
            <strong>THE NEO BREW 固定例（20g / 300g / 1:15）</strong>
            <span>
              THE NEO BREW固定例のみです。約3:30は落ち切り目安で、正確な完了時刻ではありません。フィルターは未解決、任意換算は非対応です。Pourōは非公式で、出典元との提携・監修関係はありません。
            </span>
          </p>
        )}

        {isTenPourR09 && isPlaceholderSchedule && (
          <p className="timer-schedule-note">
            <strong>THE NEO BREW の確認済み候補は 20g / 300g / 1:15 のみです</strong>
            <span>この設定はplaceholderガイドです。</span>
          </p>
        )}

        {!isFourSixR01 &&
          !isHybridR08 &&
          !isTenPourR09 &&
          isPlaceholderSchedule && (
          <p className="timer-schedule-note">
            <strong>このメソッドの詳細スケジュールは確認中です</strong>
            <span>現在はplaceholder手順で表示しています</span>
          </p>
          )}

        {timerTip && (
          <section className="timer-tip" aria-labelledby="timer-tip-label">
            <span className="eyebrow" id="timer-tip-label">
              POINT / TIPS
            </span>
            <div className="timer-tip-row">
              <span className="status-pill status-pill--compact">
                {timerTip.type}
              </span>
              <p>{timerTip.contentShortJa || timerTip.contentJa}</p>
            </div>
          </section>
        )}

        <div className="timer-time-hero">
          <div className="timer-elapsed">
            <span>経過時間</span>
            <output className="timer-display" aria-label="経過時間">
              {formatTimerMs(elapsedMs)}
            </output>
          </div>
          <div
            className={`timer-countdown-card${
              hasReachedNextStep ? " timer-countdown-card--ready" : ""
            }`}
            aria-label="次の工程まで"
          >
            <span>次の工程まで</span>
            <strong>
              {nextStepCountdownMs === null
                ? "--:--"
                : formatTimerMs(nextStepCountdownMs)}
            </strong>
            <p>
              {nextStep
                ? hasReachedNextStep
                  ? "次へ進めます"
                  : `Step ${nextStep.order} ${nextStep.title}`
                : "現在の工程が最後です"}
            </p>
          </div>
        </div>

        <div className="timer-target-card" aria-label="参考グラム">
          <p className="eyebrow timer-supporting-label">参考グラム</p>
          <div className="timer-target-row timer-target-row--primary">
            <span>累計目標 / Target Total</span>
            {hasScheduleNumber(cumulativeWaterGrams) ? (
              <strong>{formatRecipeGrams(cumulativeWaterGrams)}</strong>
            ) : (
              <p className="timer-target-fallback-title">累計目標は確認中</p>
            )}
          </div>
          <div className="timer-target-row timer-target-row--secondary">
            <span>今回の注湯 / This Pour</span>
            {currentStep.pourGramsRange ? (
              <strong>{formatNumericRange(currentStep.pourGramsRange)}</strong>
            ) : hasScheduleNumber(currentStep.pourGrams) ? (
              <strong>{formatRecipeGrams(currentStep.pourGrams)}</strong>
            ) : (
              <p className="timer-target-fallback-title">
                今回の注湯量は確認中
              </p>
            )}
          </div>
        </div>

        {semanticChip && <p className="timer-semantic-chip">{semanticChip}</p>}

        <article className="timer-step-card">
          <div className="timer-step-heading">
            <p className="eyebrow">
              現在の工程 / Step {currentStep.order} of {steps.length}
            </p>
            <h3>{currentStep.title}</h3>
          </div>
          <div className="timer-current-instruction">
            <span>現在の指示</span>
            <p>{currentStep.instruction}</p>
            {currentStep.timingNote && <p>{currentStep.timingNote}</p>}
          </div>
        </article>

        <div className="timer-next-preview" aria-label="次の工程">
          <span>次の工程</span>
          <p>{nextStep ? `Step ${nextStep.order} ${nextStep.title}` : "完了へ"}</p>
          <div className="timer-next-preview-meta">
            <strong>
              {nextStepTimeSec === null
                ? "時刻確認中"
                : formatStepTime(nextStepTimeSec)}
            </strong>
            <span>
              {currentStep.nextPourGramsRange
                ? formatNumericRange(currentStep.nextPourGramsRange)
                : hasScheduleNumber(currentStep.nextPourGrams)
                  ? formatRecipeGrams(currentStep.nextPourGrams)
                  : "グラム確認中"}
            </span>
          </div>
          <p className="timer-next-preview-instruction">
            {nextStep?.instruction ??
              currentStep.nextPreview ??
              "現在の工程を完了して記録画面へ進みます。"}
          </p>
        </div>

        <section className="timer-timeline" aria-labelledby="timer-timeline-title">
          <div className="timer-timeline-heading">
            <span id="timer-timeline-title">工程タイムライン</span>
            <strong>
              {currentStepIndex + 1} / {steps.length}
            </strong>
          </div>
          <ol>
            {steps.map((step, index) => {
              const timelineState =
                index < currentStepIndex
                  ? "complete"
                  : index === currentStepIndex
                    ? "current"
                    : "upcoming";

              return (
                <li
                  className={`timer-timeline-step timer-timeline-step--${timelineState}`}
                  key={step.id}
                  aria-current={index === currentStepIndex ? "step" : undefined}
                >
                  <span className="timer-timeline-dot">{step.order}</span>
                  <span>
                    {hasScheduleNumber(step.startSec)
                      ? formatStepTime(step.startSec)
                      : "--:--"}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {isLastStep && timerStatus !== "idle" && timerStatus !== "finished" && (
          <p className="timer-finish-note">
            抽出を終了して記録画面へ進みます。
          </p>
        )}
        </div>

        <div className="timer-controls" aria-label="タイマー操作">
          <button
            className="timer-control-button"
            disabled={!canMoveBack}
            onClick={handleBack}
            type="button"
          >
            前へ
          </button>
          <button
            className="timer-control-button timer-control-button--primary"
            disabled={timerStatus === "finished"}
            onClick={
              timerStatus === "idle"
                ? handleStart
                : timerStatus === "paused"
                  ? handleResume
                  : handlePause
            }
            type="button"
          >
            {timerActionLabel}
          </button>
          <button
            className={`timer-control-button${
              isLastStep ? " timer-control-button--finish" : ""
            }`}
            disabled={timerStatus === "idle" || timerStatus === "finished"}
            onClick={handleNextOrFinish}
            type="button"
          >
            {isLastStep ? "完了" : "次へ"}
          </button>
        </div>
      </section>
    </Page>
  );
}

function getTimerSemanticChip(
  setup: BrewSetup,
  currentStepOrder: number,
  stepsLength: number,
): string | null {
  if (setup.methodId === "four-six" && setup.variantId?.startsWith("R-0")) {
    return currentStepOrder <= 2 ? "前半40% / 味づくり" : "後半60% / 濃度調整";
  }

  if (setup.methodId === "hybrid" && setup.variantId === "R-08") {
    return "Switch状態確認";
  }

  if (setup.methodId === "ten-pour" && setup.variantId === "R-09") {
    return `Step ${currentStepOrder} / ${stepsLength}`;
  }

  if (setup.methodId === "ice-brew" && setup.variantId === "R-10") {
    if (typeof setup.iceGrams === "number") {
      return `氷 ${setup.iceGrams}g set`;
    }

    return "氷量 未記録";
  }

  return null;
}
