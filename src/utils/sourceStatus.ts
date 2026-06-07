import type { BrewMethod } from "../types";
import type { SourceStatus, VerificationLevel } from "../types/source";

export type RecipeStatusLabel =
  | "確認済み"
  | "参考表示"
  | "出典確認中"
  | "レシピ確認中"
  | "未確定";

const sourceStatusLabels: Record<SourceStatus, RecipeStatusLabel> = {
  verified: "確認済み",
  thirdParty: "参考表示",
  needsReview: "出典確認中",
  placeholder: "レシピ確認中",
};

const verificationLevelLabels: Record<VerificationLevel, RecipeStatusLabel> = {
  official: "参考表示",
  primary: "参考表示",
  manufacturer: "参考表示",
  competition: "参考表示",
  book: "参考表示",
  thirdParty: "参考表示",
  unverified: "未確定",
  placeholder: "レシピ確認中",
};

export function canDisplayAsConfirmed(method: BrewMethod): boolean {
  return (
    method.sourceStatus === "verified" &&
    method.verificationLevel !== "placeholder" &&
    method.verificationLevel !== "unverified" &&
    method.recipe.valuesArePlaceholder === false &&
    method.valuesArePlaceholder === false
  );
}

export function getRecipeStatusLabel(method: BrewMethod): RecipeStatusLabel {
  if (canDisplayAsConfirmed(method)) return "確認済み";
  if (method.valuesArePlaceholder || method.recipe.valuesArePlaceholder) {
    return "レシピ確認中";
  }

  return sourceStatusLabels[method.sourceStatus];
}

export function getSourceStatusLabel(
  sourceStatus: SourceStatus,
): RecipeStatusLabel {
  return sourceStatusLabels[sourceStatus];
}

export function getVerificationLevelLabel(
  verificationLevel: VerificationLevel,
): RecipeStatusLabel {
  return verificationLevelLabels[verificationLevel];
}

export function requiresReviewLabel(method: BrewMethod): boolean {
  return !canDisplayAsConfirmed(method);
}
