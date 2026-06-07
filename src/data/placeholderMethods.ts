import type { BrewMethod, BrewRecipe, BrewStep } from "../types";
import {
  formatPourGrams,
  formatTotalWaterGrams,
} from "../utils/formatBrewValue";

type PlaceholderMethodSeed = {
  id: string;
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

function createPlaceholderSteps(methodId: string): BrewStep[] {
  const steps: BrewStep[] = [
    {
      id: `${methodId}-placeholder-step-1`,
      order: 1,
      startSec: 0,
      endSec: 30,
      title: "Step 1",
      actionLabel: formatPourGrams(null),
      pourGrams: null,
      totalWaterGrams: null,
      instruction: "この手順文は確認中です。",
      nextPreview: `Next 00:30 / ${formatPourGrams(null)}`,
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
      actionLabel: formatPourGrams(null),
      pourGrams: null,
      totalWaterGrams: null,
      instruction: "この手順文は確認中です。",
      nextPreview: `Next 01:00 / ${formatTotalWaterGrams(null)}`,
      sourceStatus: "placeholder",
      verificationLevel: "placeholder",
      isPlaceholder: true,
    },
  ];

  return steps;
}

function createPlaceholderRecipe(methodId: string): BrewRecipe {
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
