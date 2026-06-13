export type CoffeeTipType = "POINT" | "TIPS";

export type CoffeeTipScope = "global" | "recipe" | "quarantine";

export type CoffeeTipRecipeCode =
  | "ALL"
  | "406"
  | "ICE"
  | "HYB_BASE"
  | "HYB_DEVIL"
  | "HYB_NEW"
  | "NEO"
  | "OTHER";

export type CoffeeTipDisplayContext =
  | "setup"
  | "preview"
  | "timer"
  | "finish"
  | "historyDetail"
  | "quarantine";

export type CoffeeTipVerificationLevel =
  | "primary_transcript_confirmed"
  | "primary_visual_confirmed"
  | "researched_summary"
  | "needs_review";

export type CoffeeTipConfidence = "high" | "medium";

export type CoffeeTipAppAdoption = "adoptable" | "quarantine";

export interface CoffeeTipSource {
  sourceType: string;
  videoTitle?: string;
  videoUrl?: string;
  videoId?: string;
  timecodeStart?: string;
  timecodeEnd?: string;
  [key: string]: unknown;
}

export interface CoffeeTipItem {
  id: string;
  type: CoffeeTipType;
  scope: CoffeeTipScope;
  recipeCode: CoffeeTipRecipeCode;
  category: string;
  displayContext: CoffeeTipDisplayContext[];
  contentJa: string;
  contentShortJa: string;
  whyJa: string;
  source: CoffeeTipSource;
  verificationLevel: CoffeeTipVerificationLevel;
  confidence: CoffeeTipConfidence;
  appAdoption: CoffeeTipAppAdoption;
  notes?: string;
  [key: string]: unknown;
}

export interface CoffeeTipsMaster {
  version: string;
  generatedAt: string;
  project: string;
  status: string;
  methodSources: Record<string, CoffeeTipSource>;
  notes: string[];
  items: CoffeeTipItem[];
  [key: string]: unknown;
}
