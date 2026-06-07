import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Page } from "../components/layout/Page";
import { visiblePlaceholderMethods } from "../data";
import type { BrewSetup, TimerStatus } from "../types";
import { formatPourGrams, formatRecipeGrams } from "../utils";

interface BrewTimerPageProps {
  activeSetup: BrewSetup | null;
}

function formatTimerMs(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatStepTime(sec: number | null): string {
  if (sec === null) return "--:--";

  return formatTimerMs(sec * 1000);
}

export function BrewTimerPage({ activeSetup }: BrewTimerPageProps) {
  const navigate = useNavigate();
  const method = visiblePlaceholderMethods.find(
    (item) => item.id === activeSetup?.methodId,
  );
  const steps = method?.recipe.steps ?? [];
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

  if (!activeSetup || !method || steps.length === 0) {
    return <Navigate to="/" replace />;
  }

  const currentStep = steps[currentStepIndex] ?? steps[0];
  const nextStep = steps[currentStepIndex + 1] ?? null;
  const isLastStep = currentStepIndex >= steps.length - 1;
  const canMoveBack = currentStepIndex > 0 && timerStatus !== "finished";

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
    setElapsedMsAtFinish(calculateElapsedMs(finishedAt));
    setNowMs(finishedAt);
    setTimerStatus("finished");
    navigate("/finish");
  }

  const timerActionLabel =
    timerStatus === "paused"
      ? "Resume"
      : timerStatus === "idle"
        ? "Start"
        : "Pause";

  const statusLabel: Record<TimerStatus, string> = {
    idle: "開始前",
    running: "抽出中",
    paused: "一時停止",
    finished: "完了",
    cancelled: "中止",
  };

  const nextPreview = nextStep
    ? `Next ${formatStepTime(nextStep.startSec)} / ${formatPourGrams(
        nextStep.pourGrams,
      )}`
    : "Next Finish";

  return (
    <Page
      title="Brew Timer"
      description="Date.now()基準で経過時間を管理します。保存・音・バイブレーションはまだ実装しません。"
    >
      <section className="timer-core" aria-labelledby="timer-method-title">
        <div className="timer-method-summary">
          <p className="eyebrow">{statusLabel[timerStatus]}</p>
          <h2 id="timer-method-title">{method.displayName}</h2>
          <span className="status-pill">レシピ値確認中</span>
        </div>

        <output className="timer-display" aria-label="経過時間">
          {formatTimerMs(elapsedMs)}
        </output>

        <div className="timer-metrics" aria-label="注湯量">
          <div>
            <span>Pour</span>
            <strong>{formatRecipeGrams(currentStep.pourGrams)}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{formatRecipeGrams(currentStep.totalWaterGrams)}</strong>
          </div>
        </div>

        <article className="timer-step-card">
          <p className="eyebrow">
            Step {currentStep.order} / {steps.length}
          </p>
          <h3>{currentStep.title}</h3>
          <p>{currentStep.instruction}</p>
        </article>

        <p className="timer-next-preview">{nextPreview}</p>

        <div className="timer-controls" aria-label="Timer controls">
          <button
            className="timer-control-button"
            disabled={!canMoveBack}
            onClick={handleBack}
            type="button"
          >
            Back
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
            className="timer-control-button"
            disabled={timerStatus === "idle" || timerStatus === "finished"}
            onClick={handleNextOrFinish}
            type="button"
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </section>
    </Page>
  );
}
