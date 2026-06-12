import type {
  BrewMethod,
  BrewMethodId,
  BrewRecipe,
  BrewStep,
  BrewVariant,
  BrewVariantId,
} from "../types";
type PlaceholderMethodSeed = {
  id: BrewMethodId;
  displayName: string;
  shortName: string;
  shortDescription: string;
  longDescription: string;
  iconKey: string;
  methodStatus: BrewMethod["methodStatus"];
  sourceStatus: BrewMethod["sourceStatus"];
  verificationLevel: BrewMethod["verificationLevel"];
};

const commonNeedsReviewReason =
  "レシピ値、注湯量、手順文は出典確認前のため、確定値として扱いません。";

const commonLegalNote =
  "このメソッド情報はUI確認用の未確定データです。特定の個人、団体、メーカーによる確認済みデータとして扱わないでください。";

function createPlaceholderSteps(methodId: BrewMethodId): BrewStep[] {
  const steps: BrewStep[] = [
    {
      id: `${methodId}-placeholder-step-1`,
      order: 1,
      startSec: 0,
      endSec: 30,
      title: "Step 1",
      actionLabel: "注湯量は確認中",
      pourGrams: null,
      totalWaterGrams: null,
      cumulativeWaterGrams: null,
      nextStepTimeSec: null,
      nextPourGrams: null,
      instruction: "この手順文は確認中です。",
      nextPreview: null,
      sourceStatus: "placeholder",
      verificationLevel: "placeholder",
      isPlaceholder: true,
    },
    {
      id: `${methodId}-placeholder-step-2`,
      order: 2,
      startSec: 30,
      endSec: 60,
      title: "Step 2",
      actionLabel: "注湯量は確認中",
      pourGrams: null,
      totalWaterGrams: null,
      cumulativeWaterGrams: null,
      nextStepTimeSec: null,
      nextPourGrams: null,
      instruction: "この手順文は確認中です。",
      nextPreview: null,
      sourceStatus: "placeholder",
      verificationLevel: "placeholder",
      isPlaceholder: true,
    },
  ];

  return steps;
}

function createPlaceholderRecipe(methodId: BrewMethodId): BrewRecipe {
  return {
    recipeId: `${methodId}-placeholder-recipe`,
    methodId,
    coffeeGrams: null,
    waterGrams: null,
    ratio: null,
    waterTempCelsius: null,
    grindSizeLabel: null,
    totalTimeSec: null,
    valuesArePlaceholder: true,
    needsReviewReason: commonNeedsReviewReason,
    steps: createPlaceholderSteps(methodId),
  };
}

function createPlaceholderMethod(seed: PlaceholderMethodSeed): BrewMethod {
  return {
    ...seed,
    valuesArePlaceholder: true,
    needsReviewReason: commonNeedsReviewReason,
    legalNote: commonLegalNote,
    recipe: createPlaceholderRecipe(seed.id),
  };
}

export const placeholderMethods: BrewMethod[] = [
  createPlaceholderMethod({
    id: "four-six",
    displayName: "4:6 Method",
    shortName: "4:6",
    shortDescription:
      "味わいの組み立てを意識する抽出案として参考表示します。",
    longDescription:
      "レシピ値と手順は確認中です。現時点ではメソッド名のみ候補として扱います。",
    iconKey: "method-four-six",
    methodStatus: "needsReview",
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
  }),
  createPlaceholderMethod({
    id: "hybrid",
    displayName: "Hybrid Method",
    shortName: "Hybrid",
    shortDescription:
      "浸漬と透過を組み合わせる抽出案として参考表示します。",
    longDescription:
      "レシピ値と手順は確認中です。現時点ではメソッド名のみ候補として扱います。",
    iconKey: "method-hybrid",
    methodStatus: "needsReview",
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
  }),
  createPlaceholderMethod({
    id: "ten-pour",
    displayName: "10 Pour Method",
    shortName: "10 Pour",
    shortDescription:
      "複数回の注湯で構成する抽出案として参考表示します。",
    longDescription:
      "レシピ値と手順は確認中です。現時点ではメソッド名のみ候補として扱います。",
    iconKey: "method-ten-pour",
    methodStatus: "candidate",
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
  }),
  createPlaceholderMethod({
    id: "ice-brew",
    displayName: "Ice Brew",
    shortName: "Ice",
    shortDescription:
      "冷たい抽出の候補として、未確定のまま参考表示します。",
    longDescription:
      "レシピ値と手順は確認中です。現時点ではメソッド名のみ候補として扱います。",
    iconKey: "method-ice-brew",
    methodStatus: "candidate",
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
  }),
];

export const visiblePlaceholderMethods = placeholderMethods;

export const brewVariants: BrewVariant[] = [
  {
    id: "R-01",
    methodId: "four-six",
    displayName: "4:6 Method 基本形",
    shortLabel: "基本形",
    shortDescription: "4:6 Methodの基本variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
  {
    id: "R-02",
    methodId: "four-six",
    displayName: "4:6 Method 甘み重視",
    shortLabel: "甘み重視",
    shortDescription: "甘みを意識する4:6 variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
  {
    id: "R-03",
    methodId: "four-six",
    displayName: "4:6 Method 酸味・明るさ重視",
    shortLabel: "明るさ重視",
    shortDescription: "酸味と明るさを意識する4:6 variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
  {
    id: "R-04",
    methodId: "four-six",
    displayName: "4:6 Method 軽め 4投",
    shortLabel: "軽め 4投",
    shortDescription: "軽めの4投variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
  {
    id: "R-05",
    methodId: "four-six",
    displayName: "4:6 Method すっきり 3投",
    shortLabel: "すっきり 3投",
    shortDescription: "すっきりした3投variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
  {
    id: "R-06",
    methodId: "four-six",
    displayName: "世界大会仕様 4:6レシピ",
    shortLabel: "世界大会仕様",
    shortDescription: "Advanced扱いの4:6 variantとして参考表示します。",
    isAdvanced: true,
    recommendedCoffeeGrams: 25,
    recommendedRatio: 12,
    recommendedWaterGrams: 300,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
  {
    id: "R-08",
    methodId: "hybrid",
    displayName: "NEWハイブリッド / HARIO Switch",
    shortLabel: "NEWハイブリッド",
    shortDescription: "Hybrid Methodの独立variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    valuesArePlaceholder: true,
  },
  {
    id: "R-09",
    methodId: "ten-pour",
    displayName: "THE NEO BREW / 10投式",
    shortLabel: "THE NEO BREW",
    shortDescription: "10 Pour Methodの独立variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    valuesArePlaceholder: true,
  },
  {
    id: "R-10",
    methodId: "ice-brew",
    displayName: "急冷式アイス4:6 標準",
    shortLabel: "急冷式アイス",
    shortDescription: "Ice Brewの独立variantとして参考表示します。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: null,
    recommendedWaterGrams: null,
    recommendedHotWaterGrams: 150,
    recommendedIceGrams: 80,
    sourceStatus: "placeholder",
    verificationLevel: "placeholder",
    valuesArePlaceholder: true,
  },
];

export function getVariantsByMethodId(methodId: BrewMethodId): BrewVariant[] {
  return brewVariants.filter((variant) => variant.methodId === methodId);
}

export function getVariantById(
  variantId: BrewVariantId | undefined,
): BrewVariant | undefined {
  if (!variantId) return undefined;

  return brewVariants.find((variant) => variant.id === variantId);
}

export function getDefaultVariantForMethod(
  methodId: BrewMethodId,
): BrewVariant | undefined {
  return getVariantsByMethodId(methodId)[0];
}
