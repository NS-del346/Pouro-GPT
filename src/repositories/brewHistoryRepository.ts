import type {
  BrewMethod,
  BrewMethodId,
  BrewResult,
  BrewSession,
  BrewSetup,
  TasteNote,
  TimerStatus,
} from "../types";
import type { SourceStatus, VerificationLevel } from "../types/source";

const BREW_HISTORY_KEY = "brewHistory";
const MAX_HISTORY_COUNT = 500;
const supportedMethodIds = new Set<BrewMethodId>([
  "four-six",
  "hybrid",
  "ten-pour",
  "ice-brew",
]);
const supportedTimerStatuses = new Set<TimerStatus>([
  "idle",
  "running",
  "paused",
  "finished",
  "cancelled",
]);
const supportedSourceStatuses = new Set<SourceStatus>([
  "verified",
  "thirdParty",
  "placeholder",
  "needsReview",
]);
const supportedVerificationLevels = new Set<VerificationLevel>([
  "official",
  "primary",
  "manufacturer",
  "competition",
  "book",
  "thirdParty",
  "unverified",
  "placeholder",
]);
const supportedTasteNotes = new Set<TasteNote>([
  "clear",
  "sweet",
  "acidic",
  "bitter",
  "heavy",
  "light",
  "balanced",
  "other",
]);

function canUseLocalStorage(): boolean {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isSupportedValue<T extends string>(
  value: unknown,
  supportedValues: Set<T>,
): value is T {
  return typeof value === "string" && supportedValues.has(value as T);
}

function isUiSafeMethodSnapshot(value: unknown): value is BrewMethod {
  if (!isRecord(value) || !isRecord(value.recipe)) return false;

  return (
    typeof value.displayName === "string" &&
    typeof value.valuesArePlaceholder === "boolean" &&
    typeof value.recipe.valuesArePlaceholder === "boolean" &&
    isSupportedValue(value.sourceStatus, supportedSourceStatuses) &&
    isSupportedValue(value.verificationLevel, supportedVerificationLevels)
  );
}

function sanitizeSetupSnapshot(
  value: unknown,
  methodId: BrewMethodId,
): BrewSetup | null {
  if (
    !isRecord(value) ||
    value.methodId !== methodId ||
    typeof value.variantId !== "string" ||
    !isFiniteNumber(value.coffeeGrams) ||
    typeof value.createdAt !== "string"
  ) {
    return null;
  }

  const setup: BrewSetup = {
    methodId,
    variantId: value.variantId as BrewSetup["variantId"],
    coffeeGrams: value.coffeeGrams,
    waterTempMemo:
      typeof value.waterTempMemo === "string" ? value.waterTempMemo : "",
    grindMemo: typeof value.grindMemo === "string" ? value.grindMemo : "",
    freeMemo: typeof value.freeMemo === "string" ? value.freeMemo : "",
    createdAt: value.createdAt,
  };

  if (methodId === "ice-brew") {
    if (!isFiniteNumber(value.hotWaterGrams) || !isFiniteNumber(value.iceGrams)) {
      return null;
    }

    setup.hotWaterGrams = value.hotWaterGrams;
    setup.iceGrams = value.iceGrams;
    if (isFiniteNumber(value.finalYieldGrams)) {
      setup.finalYieldGrams = value.finalYieldGrams;
    }
  } else {
    if (!isFiniteNumber(value.waterGrams) || !isFiniteNumber(value.ratio)) {
      return null;
    }

    setup.waterGrams = value.waterGrams;
    setup.ratio = value.ratio;
  }

  return setup;
}

function sanitizeResult(value: unknown): BrewResult | null {
  if (!isRecord(value)) return null;

  const tasteNotes = Array.isArray(value.tasteNotes)
    ? value.tasteNotes.filter((note): note is TasteNote =>
        isSupportedValue(note, supportedTasteNotes),
      )
    : [];
  const rating =
    isFiniteNumber(value.rating) &&
    Number.isInteger(value.rating) &&
    value.rating >= 1 &&
    value.rating <= 5
      ? (value.rating as BrewResult["rating"])
      : null;

  return {
    tasteNotes,
    tasteImpression:
      typeof value.tasteImpression === "string" ? value.tasteImpression : "",
    rating,
    nextAdjustmentMemo:
      typeof value.nextAdjustmentMemo === "string"
        ? value.nextAdjustmentMemo
        : "",
    freeMemo: typeof value.freeMemo === "string" ? value.freeMemo : "",
    createdAt: typeof value.createdAt === "string" ? value.createdAt : "",
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : "",
  };
}

function sanitizeBrewSession(value: unknown): BrewSession | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    !isSupportedValue(value.methodId, supportedMethodIds) ||
    !isUiSafeMethodSnapshot(value.methodSnapshot) ||
    typeof value.startedAtIso !== "string" ||
    !isSupportedValue(value.timerStatus, supportedTimerStatuses)
  ) {
    return null;
  }

  const setupSnapshot = sanitizeSetupSnapshot(value.setupSnapshot, value.methodId);
  if (!setupSnapshot) return null;

  return {
    id: value.id,
    methodId: value.methodId,
    methodSnapshot: value.methodSnapshot,
    setupSnapshot,
    timerStatus: value.timerStatus,
    startedAtIso: value.startedAtIso,
    finishedAtIso:
      typeof value.finishedAtIso === "string" ? value.finishedAtIso : null,
    startedAtMs: isFiniteNumber(value.startedAtMs) ? value.startedAtMs : 0,
    pausedAtMs: isFiniteNumber(value.pausedAtMs) ? value.pausedAtMs : null,
    totalPausedMs: isFiniteNumber(value.totalPausedMs) ? value.totalPausedMs : 0,
    elapsedMsAtFinish: isFiniteNumber(value.elapsedMsAtFinish)
      ? value.elapsedMsAtFinish
      : null,
    currentStepIndex:
      isFiniteNumber(value.currentStepIndex) &&
      Number.isInteger(value.currentStepIndex) &&
      value.currentStepIndex >= 0
        ? value.currentStepIndex
        : 0,
    completed:
      typeof value.completed === "boolean"
        ? value.completed
        : value.timerStatus === "finished",
    cancelled:
      typeof value.cancelled === "boolean"
        ? value.cancelled
        : value.timerStatus === "cancelled",
    result: sanitizeResult(value.result),
  };
}

function sanitizeHistoryValue(value: unknown): BrewSession[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    const session = sanitizeBrewSession(item);
    return session ? [session] : [];
  });
}

function readHistoryValue(): BrewSession[] {
  if (!canUseLocalStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(BREW_HISTORY_KEY);
    if (!rawValue) return [];

    const parsedValue: unknown = JSON.parse(rawValue);
    return sanitizeHistoryValue(parsedValue);
  } catch {
    return [];
  }
}

function writeHistoryValue(history: BrewSession[]): BrewSession[] {
  const limitedHistory = history.slice(0, MAX_HISTORY_COUNT);

  if (!canUseLocalStorage()) return limitedHistory;

  try {
    window.localStorage.setItem(BREW_HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch {
    return readHistoryValue();
  }

  return limitedHistory;
}

export function getBrewHistory(): BrewSession[] {
  return readHistoryValue();
}

export function saveBrewSession(session: BrewSession): BrewSession[] {
  const history = readHistoryValue();
  const withoutDuplicate = history.filter((item) => item.id !== session.id);

  return writeHistoryValue([session, ...withoutDuplicate]);
}

export function getBrewSessionById(id: string): BrewSession | null {
  return readHistoryValue().find((session) => session.id === id) ?? null;
}

export function deleteBrewSession(id: string): BrewSession[] {
  return writeHistoryValue(readHistoryValue().filter((session) => session.id !== id));
}

export function clearBrewHistory(): void {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.removeItem(BREW_HISTORY_KEY);
  } catch {
    // localStorage failure should never crash the app.
  }
}
