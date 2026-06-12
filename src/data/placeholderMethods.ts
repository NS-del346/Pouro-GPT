import type {
  BrewMethod,
  BrewMethodId,
  BrewRecipe,
  BrewSetup,
  BrewStep,
  BrewVariant,
  BrewVariantId,
  FieldSourceEvidence,
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

const fourSixSources = {
  S1: {
    sourceId: "S1",
    sourceTitle: "HARIO Coffee Scale POLARIS",
    sourceUrl: "https://global.hario.com/product/new/CST.html",
  },
  S2: {
    sourceId: "S2",
    sourceTitle: "Philocoffea: How to Make Coffee Using the 4:6 Brewing Method",
    sourceUrl: "https://en.philocoffea.com/blogs/blog/coffee-brewing-method",
  },
} as const;

function sourceOriginalEvidence(
  sourceId: keyof typeof fourSixSources,
  note: string,
): FieldSourceEvidence {
  return {
    provenance: "source_original",
    ...fourSixSources[sourceId],
    note,
  };
}

function appGuidanceEvidence(note: string): FieldSourceEvidence {
  return {
    provenance: "app_guidance",
    note,
  };
}

function unresolvedEvidence(note: string): FieldSourceEvidence {
  return {
    provenance: "unresolved",
    note,
  };
}

function createFourSixR01BasicSteps(): BrewStep[] {
  const starts = [0, 45, 90, 135, 165];

  return starts.map((startSec, index) => {
    const order = index + 1;
    const cumulativeWaterGrams = order * 60;
    const isLastPour = order === starts.length;
    const nextStepTimeSec = isLastPour ? 210 : starts[index + 1];
    const nextPourGrams = isLastPour ? null : 60;
    const nextPreview = isLastPour
      ? "03:30 にドリッパーを外す（自然な落ち切り完了の保証ではありません）"
      : `${String(Math.floor(nextStepTimeSec / 60)).padStart(2, "0")}:${String(
          nextStepTimeSec % 60,
        ).padStart(2, "0")} に 60g 注ぐ`;

    return {
      id: `four-six-r01-basic-step-${order}`,
      order,
      startSec,
      endSec: null,
      title: `第${order}投`,
      actionLabel: "60g 注ぐ",
      pourGrams: 60,
      totalWaterGrams: cumulativeWaterGrams,
      cumulativeWaterGrams,
      nextStepTimeSec,
      nextPourGrams,
      stepType: "pour",
      instruction: isLastPour
        ? "02:45 に 60g 注ぎ、累計 300g にします。03:30 にドリッパーを外して終了します。"
        : `${String(Math.floor(startSec / 60)).padStart(2, "0")}:${String(
            startSec % 60,
          ).padStart(2, "0")} に 60g 注ぎ、累計 ${cumulativeWaterGrams}g にします。`,
      nextPreview,
      sourceStatus: "needsReview",
      verificationLevel: "unverified",
      isPlaceholder: false,
      fieldEvidence: {
        id: appGuidanceEvidence("Pourō identifier for the R-01 basic candidate step."),
        order: appGuidanceEvidence("Pourō ordering for the five source-backed pours."),
        startSec: sourceOriginalEvidence(
          "S1",
          "Basic five-pour timing, limited to the reviewed R-01 source example.",
        ),
        endSec: appGuidanceEvidence(
          "No pour-duration or natural drawdown completion claim is represented.",
        ),
        title: appGuidanceEvidence("Pourō step label for the source-backed pour."),
        actionLabel: appGuidanceEvidence(
          "Pourō action label for the source-backed 60g pour.",
        ),
        pourGrams: sourceOriginalEvidence(
          "S2",
          "One 60g pour in the reviewed 20g / 300g basic example.",
        ),
        totalWaterGrams: sourceOriginalEvidence(
          "S2",
          "Cumulative water in the reviewed 20g / 300g basic example.",
        ),
        cumulativeWaterGrams: sourceOriginalEvidence(
          "S2",
          "Cumulative water in the reviewed 20g / 300g basic example.",
        ),
        nextStepTimeSec: sourceOriginalEvidence(
          "S1",
          isLastPour
            ? "03:30 is the source-backed dripper-removal action, not guaranteed natural drawdown completion."
            : "Next pour timing in the reviewed R-01 basic example.",
        ),
        nextPourGrams: isLastPour
          ? appGuidanceEvidence(
              "There is no next pour; the next source-backed action is dripper removal.",
            )
          : sourceOriginalEvidence(
              "S2",
              "Next pour amount in the reviewed 20g / 300g basic example.",
            ),
        stepType: appGuidanceEvidence(
          "Pourō maps the source-backed action to the existing pour step type.",
        ),
        instruction: sourceOriginalEvidence(
          "S1",
          isLastPour
            ? "The reviewed basic example pours at 02:45 and removes the dripper at 03:30."
            : "Instruction restates the reviewed basic example timing and amount.",
        ),
        nextPreview: sourceOriginalEvidence(
          "S1",
          isLastPour
            ? "The preview preserves 03:30 as a dripper-removal action."
            : "The preview restates the next reviewed basic pour.",
        ),
        sourceStatus: appGuidanceEvidence(
          "The candidate step remains needsReview at container level.",
        ),
        verificationLevel: appGuidanceEvidence(
          "The candidate step remains unverified at container level.",
        ),
        isPlaceholder: appGuidanceEvidence(
          "This step contains reviewed candidate data rather than the generic placeholder scaffold.",
        ),
      },
    };
  });
}

const fourSixR01BasicRecipe: BrewRecipe = {
  recipeId: "four-six-r01-basic-source-example",
  methodId: "four-six",
  coffeeGrams: 20,
  waterGrams: 300,
  ratio: 15,
  waterTempCelsius: null,
  grindSizeLabel: null,
  totalTimeSec: 210,
  valuesArePlaceholder: false,
  needsReviewReason:
    "R-01 の 20g / 300g / 1:15 基本候補のみ出典付きです。温度、任意比率、他の 4:6 派生は未実装です。",
  fieldEvidence: {
    recipeId: appGuidanceEvidence("Pourō identifier for the narrow R-01 candidate."),
    methodId: appGuidanceEvidence("The approved PR-011E mapping is limited to four-six R-01."),
    coffeeGrams: sourceOriginalEvidence(
      "S2",
      "20g is the cited basic source example, not a universal required dose.",
    ),
    waterGrams: sourceOriginalEvidence(
      "S2",
      "300g is the cited basic source example paired with 20g at 1:15.",
    ),
    ratio: sourceOriginalEvidence(
      "S1",
      "1:15 is limited to the reviewed basic R-01 candidate.",
    ),
    waterTempCelsius: unresolvedEvidence("Temperature is outside PR-011F scope."),
    grindSizeLabel: unresolvedEvidence("Grind guidance is outside PR-011F scope."),
    totalTimeSec: sourceOriginalEvidence(
      "S1",
      "210 seconds represents the 03:30 dripper-removal action, not guaranteed natural drawdown completion.",
    ),
    valuesArePlaceholder: appGuidanceEvidence(
      "The R-01 recipe values are source-backed, while the method and unresolved variants retain their caution flags.",
    ),
    needsReviewReason: appGuidanceEvidence(
      "Pourō caution copy limits the candidate to its reviewed scope.",
    ),
    steps: sourceOriginalEvidence(
      "S1",
      "Five-pour basic schedule and 03:30 dripper-removal action.",
    ),
  },
  steps: createFourSixR01BasicSteps(),
};

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
    sourceTitle: "HARIO Coffee Scale POLARIS",
    sourceUrl: "https://global.hario.com/product/new/CST.html",
    sourceNote:
      "R-01 の基本候補だけを対象にします。R-02 から R-06 は未解決または placeholder のままです。",
    valuesArePlaceholder: true,
    fieldEvidence: {
      displayName: appGuidanceEvidence(
        "PR-011E maps the source-backed basic candidate to repository variant R-01.",
      ),
      shortLabel: appGuidanceEvidence(
        "Repository label for the approved narrow R-01 mapping.",
      ),
      shortDescription: appGuidanceEvidence(
        "Pourō explanation of the approved narrow R-01 mapping.",
      ),
      recommendedCoffeeGrams: sourceOriginalEvidence(
        "S2",
        "20g is the cited basic source example, not a universal required dose.",
      ),
      recommendedRatio: sourceOriginalEvidence(
        "S1",
        "1:15 is limited to the reviewed basic R-01 candidate.",
      ),
      recommendedWaterGrams: sourceOriginalEvidence(
        "S2",
        "300g is the cited basic source example paired with 20g at 1:15.",
      ),
      sourceTitle: sourceOriginalEvidence(
        "S1",
        "Source metadata for the reviewed R-01 basic candidate only.",
      ),
      sourceUrl: sourceOriginalEvidence(
        "S1",
        "Source metadata for the reviewed R-01 basic candidate only.",
      ),
      sourceNote: appGuidanceEvidence(
        "Pourō note limits source-backed treatment to R-01.",
      ),
      recipe: appGuidanceEvidence(
        "PR-011E permits the reviewed basic recipe only for R-01.",
      ),
    },
    recipe: fourSixR01BasicRecipe,
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

export function getRecipeForSetup(
  method: BrewMethod,
  setup: BrewSetup,
): BrewRecipe {
  if (
    method.id !== "four-six" ||
    setup.methodId !== "four-six" ||
    setup.variantId !== "R-01" ||
    setup.coffeeGrams !== 20 ||
    setup.ratio !== 15 ||
    setup.waterGrams !== 300
  ) {
    return method.recipe;
  }

  return getVariantById("R-01")?.recipe ?? method.recipe;
}

export function getDefaultVariantForMethod(
  methodId: BrewMethodId,
): BrewVariant | undefined {
  return getVariantsByMethodId(methodId)[0];
}
