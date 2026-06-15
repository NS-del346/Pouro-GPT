export type GrinderPresetStatus = "verified" | "needs_review" | "placeholder";

export type GrinderAdjustmentType =
  | "stepped"
  | "external_stepped"
  | "internal_stepped"
  | "stepless"
  | "unknown";

export type GrinderPresetSourceStatus =
  | "official"
  | "official_like"
  | "third_party"
  | "user_reported"
  | "needs_review"
  | "placeholder";

export type GrinderPresetVerificationLevel =
  | "high"
  | "medium"
  | "low"
  | "needs_review";

export interface GrinderPreset {
  id: string;
  maker: string;
  model: string;
  displayName: string;
  presetStatus: GrinderPresetStatus;
  clickStepMicrons?: number;
  adjustmentType: GrinderAdjustmentType;
  sourceStatus: GrinderPresetSourceStatus;
  verificationLevel: GrinderPresetVerificationLevel;
  notes: string;
}
