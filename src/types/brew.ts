import type { SourceStatus, VerificationLevel } from "./source";

export type MethodStatus = "candidate" | "available" | "disabled" | "needsReview";

export type BrewMethodId = "four-six" | "hybrid" | "ten-pour" | "ice-brew";

export type BrewVariantId =
  | "R-01"
  | "R-02"
  | "R-03"
  | "R-04"
  | "R-05"
  | "R-06"
  | "R-08"
  | "R-09"
  | "R-10";

export type TimerStatus =
  | "idle"
  | "running"
  | "paused"
  | "finished"
  | "cancelled";

export type BrewStepType =
  | "pour"
  | "bloom"
  | "wait"
  | "drawdown"
  | "finish"
  | "note";

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
  id: BrewMethodId;
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

export interface BrewVariant {
  id: BrewVariantId;
  methodId: BrewMethodId;
  displayName: string;
  shortLabel: string;
  shortDescription: string;
  isAdvanced: boolean;

  recommendedCoffeeGrams: number | null;
  recommendedRatio: number | null;
  recommendedWaterGrams: number | null;

  recommendedHotWaterGrams?: number | null;
  recommendedIceGrams?: number | null;

  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;
  valuesArePlaceholder: boolean;
}

export interface BrewRecipe {
  recipeId: string;
  methodId: BrewMethodId;

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
  cumulativeWaterGrams?: number | null;
  nextStepTimeSec?: number | null;
  nextPourGrams?: number | null;
  stepType?: BrewStepType;

  instruction: string;
  nextPreview: string | null;

  sourceStatus: SourceStatus;
  verificationLevel: VerificationLevel;
  isPlaceholder: boolean;
}

export interface BrewSetup {
  methodId: BrewMethodId;
  variantId?: BrewVariantId;

  coffeeGrams: number;
  ratio?: number;
  waterGrams?: number;

  hotWaterGrams?: number;
  iceGrams?: number;
  finalYieldGrams?: number;

  waterTempMemo: string;
  grindMemo: string;
  freeMemo: string;

  createdAt: string;
}

export interface BrewSession {
  id: string;

  methodId: BrewMethodId;
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
