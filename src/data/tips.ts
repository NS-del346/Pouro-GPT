import tipsMasterJson from "../../docs/research/coffee_app_tips_master_v2.json";
import type {
  CoffeeTipAppAdoption,
  CoffeeTipConfidence,
  CoffeeTipDisplayContext,
  CoffeeTipItem,
  CoffeeTipRecipeCode,
  CoffeeTipScope,
  CoffeeTipsMaster,
  CoffeeTipSource,
  CoffeeTipType,
  CoffeeTipVerificationLevel,
} from "../types/tips";

const tipTypes = new Set<CoffeeTipType>(["POINT", "TIPS"]);
const tipScopes = new Set<CoffeeTipScope>(["global", "recipe", "quarantine"]);
const tipRecipeCodes = new Set<CoffeeTipRecipeCode>([
  "ALL",
  "406",
  "ICE",
  "HYB_BASE",
  "HYB_DEVIL",
  "HYB_NEW",
  "NEO",
  "OTHER",
]);
const tipDisplayContexts = new Set<CoffeeTipDisplayContext>([
  "setup",
  "preview",
  "timer",
  "finish",
  "historyDetail",
  "quarantine",
]);
const tipVerificationLevels = new Set<CoffeeTipVerificationLevel>([
  "primary_transcript_confirmed",
  "primary_visual_confirmed",
  "researched_summary",
  "needs_review",
]);
const tipConfidences = new Set<CoffeeTipConfidence>(["high", "medium"]);
const tipAppAdoptions = new Set<CoffeeTipAppAdoption>([
  "adoptable",
  "quarantine",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isKnownString<T extends string>(
  value: unknown,
  knownValues: ReadonlySet<T>,
): value is T {
  return typeof value === "string" && knownValues.has(value as T);
}

function isOptionalString(
  value: Record<string, unknown>,
  key: string,
): boolean {
  return value[key] === undefined || typeof value[key] === "string";
}

function isCoffeeTipSource(value: unknown): value is CoffeeTipSource {
  return (
    isRecord(value) &&
    typeof value.sourceType === "string" &&
    isOptionalString(value, "videoTitle") &&
    isOptionalString(value, "videoUrl") &&
    isOptionalString(value, "videoId") &&
    isOptionalString(value, "timecodeStart") &&
    isOptionalString(value, "timecodeEnd")
  );
}

function isCoffeeTipItem(value: unknown): value is CoffeeTipItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    isKnownString(value.type, tipTypes) &&
    isKnownString(value.scope, tipScopes) &&
    isKnownString(value.recipeCode, tipRecipeCodes) &&
    typeof value.category === "string" &&
    Array.isArray(value.displayContext) &&
    value.displayContext.every((context) =>
      isKnownString(context, tipDisplayContexts),
    ) &&
    typeof value.contentJa === "string" &&
    typeof value.contentShortJa === "string" &&
    typeof value.whyJa === "string" &&
    isCoffeeTipSource(value.source) &&
    isKnownString(value.verificationLevel, tipVerificationLevels) &&
    isKnownString(value.confidence, tipConfidences) &&
    isKnownString(value.appAdoption, tipAppAdoptions) &&
    isOptionalString(value, "notes")
  );
}

function isCoffeeTipsMaster(value: unknown): value is CoffeeTipsMaster {
  return (
    isRecord(value) &&
    typeof value.version === "string" &&
    typeof value.generatedAt === "string" &&
    typeof value.project === "string" &&
    typeof value.status === "string" &&
    isRecord(value.methodSources) &&
    Object.values(value.methodSources).every(isCoffeeTipSource) &&
    Array.isArray(value.notes) &&
    value.notes.every((note) => typeof note === "string") &&
    Array.isArray(value.items) &&
    value.items.every(isCoffeeTipItem)
  );
}

function assertCoffeeTipsMaster(value: unknown): CoffeeTipsMaster {
  if (!isCoffeeTipsMaster(value)) {
    throw new Error("Invalid POINT/TIPS master data.");
  }

  return value;
}

export const coffeeTipsMaster: CoffeeTipsMaster =
  assertCoffeeTipsMaster(tipsMasterJson);

export const coffeeTipItems: readonly CoffeeTipItem[] = coffeeTipsMaster.items;

export function isDisplayableTip(item: CoffeeTipItem): boolean {
  return (
    item.recipeCode !== "OTHER" &&
    item.scope !== "quarantine" &&
    item.appAdoption !== "quarantine" &&
    !item.displayContext.includes("quarantine")
  );
}

export function getGlobalTips(): CoffeeTipItem[] {
  return coffeeTipItems.filter(
    (item) => item.recipeCode === "ALL" && isDisplayableTip(item),
  );
}

export function getRecipeSpecificTips(
  recipeCode: CoffeeTipRecipeCode,
): CoffeeTipItem[] {
  return coffeeTipItems.filter(
    (item) => item.recipeCode === recipeCode && isDisplayableTip(item),
  );
}

export function getTipsForRecipeCode(
  recipeCode: CoffeeTipRecipeCode,
): CoffeeTipItem[] {
  if (recipeCode === "OTHER") {
    return [];
  }

  return coffeeTipItems.filter(
    (item) =>
      isDisplayableTip(item) &&
      (item.recipeCode === "ALL" || item.recipeCode === recipeCode),
  );
}

export function getTipsForDisplayContext(
  context: CoffeeTipDisplayContext,
  recipeCode?: CoffeeTipRecipeCode,
): CoffeeTipItem[] {
  const candidates =
    recipeCode === undefined
      ? coffeeTipItems.filter(isDisplayableTip)
      : getTipsForRecipeCode(recipeCode);

  return candidates.filter((item) => item.displayContext.includes(context));
}
