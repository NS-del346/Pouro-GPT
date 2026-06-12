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

const hybridSources = {
  S1: {
    sourceId: "S1",
    sourceTitle:
      "TETSU KASUYA: どんなコーヒー豆も「おいしくなる」究極系レシピ、進化しました。",
    sourceUrl: "https://www.youtube.com/watch?v=4FeUp_zNiiY",
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

function hybridSourceOriginalEvidence(
  sourceId: keyof typeof hybridSources,
  note: string,
): FieldSourceEvidence {
  return {
    provenance: "source_original",
    ...hybridSources[sourceId],
    note,
  };
}

function appCalculatedEvidence(
  calculationNote: string,
  note: string,
): FieldSourceEvidence {
  return {
    provenance: "app_calculated",
    calculationNote,
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

type HybridR08FixedStepSeed = {
  id: string;
  order: number;
  startSec: number | null;
  title: string;
  actionLabel: string;
  pourGramsRange?: BrewStep["pourGramsRange"];
  totalWaterGrams: number | null;
  cumulativeWaterGrams: number | null;
  instruction: string;
  nextPreview: string;
  stepType: BrewStep["stepType"];
  timeReferences: NonNullable<BrewStep["timeReferences"]>;
  timingNote: string;
};

function createHybridR08FixedStep(seed: HybridR08FixedStepSeed): BrewStep {
  const hasCumulativeTarget = seed.cumulativeWaterGrams !== null;

  return {
    ...seed,
    endSec: null,
    pourGrams: null,
    nextStepTimeSec: null,
    nextPourGrams: null,
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    isPlaceholder: false,
    fieldEvidence: {
      id: appGuidanceEvidence("Pourō identifier for the narrow Hybrid R-08 fixed example."),
      order: appGuidanceEvidence("Pourō ordering for the source-backed fixed example."),
      startSec:
        seed.startSec === 0
          ? hybridSourceOriginalEvidence(
              "S1",
              "The demonstrated example starts with the Switch closed at brew start.",
            )
          : appGuidanceEvidence(
              "No exact step start is stored; approximate targets and observed examples remain separate time references.",
            ),
      endSec: appGuidanceEvidence(
        "No exact step duration or completion second is represented.",
      ),
      title: appGuidanceEvidence("Pourō phase label for the fixed example."),
      actionLabel: appGuidanceEvidence(
        "Pourō action label summarizing the source-backed cumulative target and Switch state.",
      ),
      pourGrams: appGuidanceEvidence(
        "No unsupported exact incremental pour amount is selected.",
      ),
      ...(seed.pourGramsRange
        ? {
            pourGramsRange: hybridSourceOriginalEvidence(
              "S1",
              "The visible creator-source frame directly shows the first pour as 40-50g.",
            ),
          }
        : {}),
      totalWaterGrams: hasCumulativeTarget
        ? hybridSourceOriginalEvidence(
            "S1",
            "Cumulative target in the demonstrated fixed example.",
          )
        : appGuidanceEvidence(
            "The first pour remains a range, so no single cumulative value is selected.",
          ),
      cumulativeWaterGrams: hasCumulativeTarget
        ? hybridSourceOriginalEvidence(
            "S1",
            "Cumulative target in the demonstrated fixed example.",
          )
        : appGuidanceEvidence(
            "The first pour remains a range, so no single cumulative value is selected.",
          ),
      nextStepTimeSec: appGuidanceEvidence(
        "Null prevents approximate guidance from driving exact timer behavior.",
      ),
      nextPourGrams: appGuidanceEvidence(
        "Later source values are cumulative targets, not exact incremental pour amounts.",
      ),
      timeReferences: hybridSourceOriginalEvidence(
        "S1",
        "Approximate narrated targets and observed example frames remain separately labeled.",
      ),
      timingNote: appGuidanceEvidence(
        "Pourō caution copy explains that step timing is approximate.",
      ),
      stepType: appGuidanceEvidence(
        "Pourō maps the source-backed phase to an existing step type.",
      ),
      instruction: hybridSourceOriginalEvidence(
        "S1",
        "Instruction paraphrases the reviewed fixed-example action without adding scaling.",
      ),
      nextPreview: appGuidanceEvidence(
        "Pourō preview keeps the next source-backed action visibly approximate.",
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
}

function createHybridR08FixedSteps(): BrewStep[] {
  return [
    createHybridR08FixedStep({
      id: "hybrid-r08-fixed-step-1",
      order: 1,
      startSec: 0,
      title: "第1フェーズ",
      actionLabel: "40-50g 注ぐ / Close",
      pourGramsRange: {
        min: 40,
        max: 50,
        unit: "grams",
        label: "40-50g",
      },
      totalWaterGrams: null,
      cumulativeWaterGrams: null,
      instruction:
        "Switchを閉じた状態で40-50g注ぎ、浸漬でしっかり蒸らします。",
      nextPreview: "約0:45 に Open、120gまで注ぐ",
      stepType: "bloom",
      timeReferences: [
        {
          seconds: 0,
          precision: "exact",
          kind: "instruction_target",
          label: "開始",
          note: "The demonstrated example starts with the Switch closed.",
        },
      ],
      timingNote: "時刻は目安です。",
    }),
    createHybridR08FixedStep({
      id: "hybrid-r08-fixed-step-2",
      order: 2,
      startSec: null,
      title: "Open / 120gまで",
      actionLabel: "120gまで注ぐ / Open",
      totalWaterGrams: 120,
      cumulativeWaterGrams: 120,
      instruction: "Switchを開け、累計120gまで注ぎます。",
      nextPreview: "約1:30 に 200gまで注ぐ",
      stepType: "pour",
      timeReferences: [
        {
          seconds: 45,
          precision: "approximate",
          kind: "instruction_target",
          label: "約0:45",
          note: "Approximate first release and 120g cumulative target.",
        },
        {
          seconds: 46,
          precision: "observed",
          kind: "observed_example",
          label: "約0:46",
          note: "Observed example frame showing 120g and Open.",
        },
      ],
      timingNote: "目標時刻と確認できた画面時刻には差があります。",
    }),
    createHybridR08FixedStep({
      id: "hybrid-r08-fixed-step-3",
      order: 3,
      startSec: null,
      title: "200gまで",
      actionLabel: "200gまで注ぐ / Open",
      totalWaterGrams: 200,
      cumulativeWaterGrams: 200,
      instruction: "透過のまま累計200gまで注ぎます。",
      nextPreview: "約2:10 に 300gまで注ぎ、Close",
      stepType: "pour",
      timeReferences: [
        {
          seconds: 90,
          precision: "approximate",
          kind: "instruction_target",
          label: "約1:30",
          note: "Narrated approximate target for reaching 200g.",
        },
        {
          seconds: 97,
          precision: "observed",
          kind: "observed_example",
          label: "約1:37",
          note: "Observed example frame showing 200g and Open.",
        },
      ],
      timingNote: "目標時刻と確認できた画面時刻には差があります。",
    }),
    createHybridR08FixedStep({
      id: "hybrid-r08-fixed-step-4",
      order: 4,
      startSec: null,
      title: "300gまで / Close",
      actionLabel: "300gまで注ぐ / Close",
      totalWaterGrams: 300,
      cumulativeWaterGrams: 300,
      instruction:
        "湯温を下げた湯で累計300gまで注ぎ、Switchを閉じて再び浸漬します。後半の湯温は70-80°C目安です。",
      nextPreview: "約2:45 に Open",
      stepType: "pour",
      timeReferences: [
        {
          seconds: 130,
          precision: "approximate",
          kind: "instruction_target",
          label: "約2:10",
          note: "Narrated approximate target for the lower-temperature final pour.",
        },
        {
          seconds: 140,
          precision: "observed",
          kind: "observed_example",
          label: "約2:20",
          note: "Observed example frame showing 300g and Close.",
        },
      ],
      timingNote: "目標時刻と確認できた画面時刻には差があります。",
    }),
    createHybridR08FixedStep({
      id: "hybrid-r08-fixed-step-5",
      order: 5,
      startSec: null,
      title: "Open / 仕上げ",
      actionLabel: "Openして落とす",
      totalWaterGrams: 300,
      cumulativeWaterGrams: 300,
      instruction:
        "約2:45を目安にSwitchを開けます。約3:30を仕上がり目安とし、確認できた画面では約3:34でドリッパーを外しています。",
      nextPreview: "約3:30を目安に終了",
      stepType: "drawdown",
      timeReferences: [
        {
          seconds: 165,
          precision: "approximate",
          kind: "instruction_target",
          label: "約2:45",
          note: "Narrated approximate final release target.",
        },
        {
          seconds: 169,
          precision: "observed",
          kind: "observed_example",
          label: "約2:49",
          note: "Observed example frame showing the final Open action.",
        },
      ],
      timingNote: "仕上がり目安と確認できたドリッパー取り外し時刻は別です。",
    }),
  ];
}

const hybridR08FixedExampleRecipe: BrewRecipe = {
  recipeId: "hybrid-r08-new-hybrid-fixed-example",
  methodId: "hybrid",
  coffeeGrams: 20,
  waterGrams: 300,
  ratio: 15,
  waterTempCelsius: null,
  waterTempCelsiusRange: {
    min: 70,
    max: 80,
    unit: "celsius",
    label: "70-80°C",
    note: "Later lower-temperature guidance only; initial temperature remains unresolved.",
  },
  grindSizeLabel: "Comandante 28 clicks / やや粗め",
  totalTimeSec: null,
  totalTimeReferences: [
    {
      seconds: 210,
      precision: "approximate",
      kind: "finish_target",
      label: "約3:30",
      note: "Creator caption target completion; not a guaranteed natural drawdown completion.",
    },
    {
      seconds: 214,
      precision: "observed",
      kind: "dripper_removal",
      label: "約3:34",
      note: "Observed dripper removal timing from visible frame; not an instruction target.",
    },
  ],
  fixedSetupGate: {
    coffeeGrams: 20,
    waterGrams: 300,
    ratio: 15,
    scalingSupported: false,
    unsupportedSetupBehavior: "placeholder_fallback",
    note: "Source-backed Hybrid R-08 candidate is limited to exact 20g / 300g / 1:15.",
  },
  valuesArePlaceholder: false,
  needsReviewReason:
    "New Hybrid の 20g / 300g / 1:15 固定例のみ出典付き候補です。時刻は目安、初期湯温は未解決で、任意換算には対応していません。Pourōは非公式で、出典元との提携・監修関係はありません。",
  fieldEvidence: {
    recipeId: appGuidanceEvidence("Pourō identifier for the narrow Hybrid R-08 fixed example."),
    methodId: appGuidanceEvidence(
      "PR-012D maps repository variant R-08 to the inspected New Hybrid fixed example.",
    ),
    coffeeGrams: hybridSourceOriginalEvidence(
      "S1",
      "20g is directly supported for the demonstrated fixed example only.",
    ),
    waterGrams: hybridSourceOriginalEvidence(
      "S1",
      "300g is directly supported for the demonstrated fixed example only.",
    ),
    ratio: appCalculatedEvidence(
      "300g / 20g = 15",
      "The New Hybrid 1:15 ratio is calculated by Pourō from source-supported inputs and is not directly stated by the source.",
    ),
    waterTempCelsius: unresolvedEvidence(
      "The initial water temperature is not established by the inspected creator source.",
    ),
    waterTempCelsiusRange: hybridSourceOriginalEvidence(
      "S1",
      "Later lower-temperature guidance supports about 80°C, with about 70°C as a stronger change.",
    ),
    grindSizeLabel: hybridSourceOriginalEvidence(
      "S1",
      "Comandante 28 clicks / somewhat coarse is grinder-specific guidance, not a universal grind setting.",
    ),
    totalTimeSec: unresolvedEvidence(
      "No single exact total time is selected because target completion and observed removal differ.",
    ),
    totalTimeReferences: hybridSourceOriginalEvidence(
      "S1",
      "Approximate finish target and observed dripper removal remain separate.",
    ),
    fixedSetupGate: appGuidanceEvidence(
      "Pourō limits source-backed selection to exact 20g / 300g / 1:15 and falls back otherwise.",
    ),
    valuesArePlaceholder: appGuidanceEvidence(
      "The exact recipe contains reviewed candidate values while method and variant containers retain caution metadata.",
    ),
    needsReviewReason: appGuidanceEvidence(
      "Pourō caution copy states fixed-example scope, approximation, unresolved initial temperature, disabled scaling, and non-affiliation.",
    ),
    steps: hybridSourceOriginalEvidence(
      "S1",
      "The fixed example preserves the reviewed phase order, first-pour range, cumulative targets, Switch actions, and separate timing semantics.",
    ),
  },
  steps: createHybridR08FixedSteps(),
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
    sourceTitle: hybridSources.S1.sourceTitle,
    sourceUrl: hybridSources.S1.sourceUrl,
    sourceNote:
      "R-08 は New Hybrid の 20g / 300g / 1:15 固定例のみを出典付き候補として扱います。任意換算には対応せず、Pourōは出典元と提携・監修関係のない非公式ガイドです。",
    valuesArePlaceholder: true,
    fieldEvidence: {
      recommendedCoffeeGrams: hybridSourceOriginalEvidence(
        "S1",
        "20g is directly supported for the demonstrated fixed example only.",
      ),
      recommendedRatio: appCalculatedEvidence(
        "300g / 20g = 15",
        "The recommended ratio is app-calculated from source-supported fixed-example inputs.",
      ),
      recommendedWaterGrams: hybridSourceOriginalEvidence(
        "S1",
        "300g is directly supported for the demonstrated fixed example only.",
      ),
      sourceTitle: hybridSourceOriginalEvidence(
        "S1",
        "Creator-source metadata for the narrow R-08 fixed example only.",
      ),
      sourceUrl: hybridSourceOriginalEvidence(
        "S1",
        "Creator-source metadata for the narrow R-08 fixed example only.",
      ),
      sourceNote: appGuidanceEvidence(
        "Pourō note limits source-backed treatment to the exact fixed example and states non-affiliation.",
      ),
      valuesArePlaceholder: appGuidanceEvidence(
        "The R-08 variant container remains caution-protected despite its exact recipe candidate.",
      ),
      recipe: appGuidanceEvidence(
        "The source-backed candidate is selected only by the exact setup gate.",
      ),
    },
    recipe: hybridR08FixedExampleRecipe,
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
    method.id === "four-six" &&
    setup.methodId === "four-six" &&
    setup.variantId === "R-01" &&
    setup.coffeeGrams === 20 &&
    setup.ratio === 15 &&
    setup.waterGrams === 300
  ) {
    return getVariantById("R-01")?.recipe ?? method.recipe;
  }

  if (
    method.id === "hybrid" &&
    setup.methodId === "hybrid" &&
    setup.variantId === "R-08" &&
    setup.coffeeGrams === 20 &&
    setup.ratio === 15 &&
    setup.waterGrams === 300
  ) {
    return getVariantById("R-08")?.recipe ?? method.recipe;
  }

  return method.recipe;
}

export function getDefaultVariantForMethod(
  methodId: BrewMethodId,
): BrewVariant | undefined {
  return getVariantsByMethodId(methodId)[0];
}
