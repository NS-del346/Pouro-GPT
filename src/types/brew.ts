import type { SourceStatus, VerificationLevel } from "./source";

export type MethodStatus = "candidate" | "available" | "disabled" | "needsReview";

export type TimerStatus =
  | "idle"
  | "running"
  | "paused"
  | "finished"
  | "cancelled";

export type TasteNote =
  | "clear"
  | "sweet"
  | "acidic"
  | "bitter"
  | "heavy"
  | "light"
  | "balanced"
  | "other";

export interface BrewMethod {
  id: string;
  displayName: string;
  shortName: string;
  shortDescription: string;
  longDescription: string;
  iconKey: string;

  methodStatus: MethodStatus;
  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;

  sourceTitle?: string;
  sourceUrl?: string;
  sourceNote?: string;

  valuesArePlaceholder: boolean;
  needsReviewReason: string;
  legalNote: string;

  recipe: BrewRecipe;
}

export interface BrewRecipe {
  recipeId: string;
  methodId: string;

  coffeeGrams: number | null;
  waterGrams: number | null;
  ratio: number | null;
  waterTempCelsius: number | null;
  grindSizeLabel: string | null;
  totalTimeSec: number | null;

  valuesArePlaceholder: boolean;
  needsReviewReason: string;

  steps: BrewStep[];
}

export interface BrewStep {
  id: string;
  order: number;

  startSec: number | null;
  endSec: number | null;

  title: string;
  actionLabel: string;

  pourGrams: number | null;
  totalWaterGrams: number | null;

  instruction: string;
  nextPreview: string | null;

  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;
  isPlaceholder: boolean;
}

export interface BrewSetup {
  methodId: string;

  coffeeGrams: number;
  ratio: number;
  waterGrams: number;

  waterTempMemo: string;
  grindMemo: string;
  freeMemo: string;

  createdAt: string;
}

export interface BrewSession {
  id: string;

  methodId: string;
  methodSnapshot: BrewMethod;
  setupSnapshot: BrewSetup;

  timerStatus: TimerStatus;

  startedAtIso: string;
  finishedAtIso: string | null;

  startedAtMs: number;
  pausedAtMs: number | null;
  totalPausedMs: number;

  elapsedMsAtFinish: number | null;

  currentStepIndex: number;

  completed: boolean;
  cancelled: boolean;

  result: BrewResult | null;
}

export interface BrewResult {
  tasteNotes: TasteNote[];
  tasteImpression: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  nextAdjustmentMemo: string;
  freeMemo: string;
  createdAt: string;
  updatedAt: string;
}

export type AppTheme = "light" | "warm" | "dark";

export type UserSettings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: AppTheme;
  showTemperatureGuide: boolean;
  updatedAt: string;
};

export interface BrewSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  sleepLockGuideShown: boolean;
}

export interface StorageSchema {
  version: 1;
  brewHistory: BrewSession[];
  settings: BrewSettings;
}
