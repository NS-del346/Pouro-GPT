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

const tenPourSources = {
  S1: {
    sourceId: "S1",
    sourceTitle:
      "TETSU KASUYA: 世界制覇から10年かけて辿り着いた最新式のドリップレシピ完成しました！！",
    sourceUrl: "https://www.youtube.com/watch?v=k0nsShguOsU",
  },
  E1: {
    sourceId: "E1",
    sourceTitle: "PR-013E THE NEO BREW user-supplied recipe-card evidence",
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

function tenPourPrimaryDescriptionEvidence(note: string): FieldSourceEvidence {
  return {
    provenance: "primary_description_confirmed",
    ...tenPourSources.S1,
    note,
  };
}

function tenPourVisualEvidence(note: string): FieldSourceEvidence {
  return {
    provenance: "user_supplied_visual_evidence_confirmed",
    ...tenPourSources.E1,
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

type FourSixStandardFlavor = "balanced" | "sweet" | "bright";

type FourSixStandardRecipeSeed = {
  variantId: Extract<BrewVariantId, "R-01" | "R-02" | "R-03">;
  flavor: FourSixStandardFlavor;
  label: string;
};

const FOUR_SIX_FIXED_COFFEE_GRAMS = 20;
const FOUR_SIX_FIXED_RATIO = 15;
const FOUR_SIX_FIXED_WATER_GRAMS = 300;
const FOUR_SIX_STANDARD_BACK_POUR_COUNT = 2;
const FOUR_SIX_STANDARD_STARTS = [0, 45, 90, 135] as const;
const FOUR_SIX_DRAWDOWN_TARGET_SEC = 210;

const fourSixFlavorNotes: Record<FourSixStandardFlavor, string> = {
  balanced: "バランス",
  sweet: "甘め寄り",
  bright: "明るめ寄り",
};

function formatFourSixTime(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;
}

function fourSixFormulaEvidence(note: string): FieldSourceEvidence {
  return appCalculatedEvidence(
    "Fable5 4:6 formula: totalWater = round(dose * ratio), frontWater = round(totalWater * 0.4), backWater = totalWater - frontWater, standard backPourCount = 2.",
    note,
  );
}

function getFourSixStandardPourAmounts(
  flavor: FourSixStandardFlavor,
): number[] {
  const totalWater = Math.round(
    FOUR_SIX_FIXED_COFFEE_GRAMS * FOUR_SIX_FIXED_RATIO,
  );
  const frontWater = Math.round(totalWater * 0.4);
  const backWater = totalWater - frontWater;
  const firstPour =
    flavor === "sweet"
      ? Math.round((frontWater * 5) / 12)
      : flavor === "bright"
        ? Math.round((frontWater * 7) / 12)
        : Math.round(frontWater / 2);
  const secondPour = frontWater - firstPour;
  const perBack = Math.round(backWater / FOUR_SIX_STANDARD_BACK_POUR_COUNT);
  const backPours = Array.from(
    { length: FOUR_SIX_STANDARD_BACK_POUR_COUNT },
    (_, index) =>
      index === FOUR_SIX_STANDARD_BACK_POUR_COUNT - 1
        ? backWater - perBack * (FOUR_SIX_STANDARD_BACK_POUR_COUNT - 1)
        : perBack,
  );

  return [firstPour, secondPour, ...backPours];
}

function createFourSixStandardSteps(seed: FourSixStandardRecipeSeed): BrewStep[] {
  const pourAmounts = getFourSixStandardPourAmounts(seed.flavor);
  let cumulativeWaterGrams = 0;

  return FOUR_SIX_STANDARD_STARTS.map((startSec, index) => {
    const order = index + 1;
    const pourGrams = pourAmounts[index] ?? 0;
    cumulativeWaterGrams += pourGrams;
    const isLastPour = order === FOUR_SIX_STANDARD_STARTS.length;
    const nextStepTimeSec = isLastPour
      ? FOUR_SIX_DRAWDOWN_TARGET_SEC
      : FOUR_SIX_STANDARD_STARTS[index + 1]!;
    const nextPourGrams = isLastPour ? null : (pourAmounts[index + 1] ?? null);
    const nextPreview = isLastPour
      ? "03:30 はドローダウン/終了の目安です（自然な完了保証ではありません）"
      : `${formatFourSixTime(nextStepTimeSec)} に ${nextPourGrams}g 注ぐ`;

    return {
      id: `four-six-${seed.variantId.toLowerCase()}-standard-step-${order}`,
      order,
      startSec,
      endSec: null,
      title: `第${order}投`,
      actionLabel: `${pourGrams}g 注ぐ`,
      pourGrams,
      totalWaterGrams: cumulativeWaterGrams,
      cumulativeWaterGrams,
      nextStepTimeSec,
      nextPourGrams,
      stepType: "pour",
      instruction: `${formatFourSixTime(
        startSec,
      )} に ${pourGrams}g 注ぎ、累計 ${cumulativeWaterGrams}g にします。${
        isLastPour ? "03:30 はドローダウン/終了の目安です。" : ""
      }`,
      nextPreview,
      sourceStatus: "needsReview",
      verificationLevel: "unverified",
      isPlaceholder: false,
      fieldEvidence: {
        id: appGuidanceEvidence(
          `Pourō identifier for the ${seed.variantId} 4:6 ${seed.label} fixed example step.`,
        ),
        order: appGuidanceEvidence(
          "Pourō ordering for the Fable5-aligned 4:6 standard fixed example.",
        ),
        startSec: fourSixFormulaEvidence(
          "Fable5 standard timing uses 0:00, 0:45, 1:30, and 2:15 for the four pours.",
        ),
        endSec: appGuidanceEvidence(
          "No pour-duration or exact natural drawdown completion claim is represented.",
        ),
        title: appGuidanceEvidence("Pourō step label for the 4:6 pour."),
        actionLabel: fourSixFormulaEvidence(
          `Action amount for ${seed.label} at 20g / 300g / 1:15.`,
        ),
        pourGrams: fourSixFormulaEvidence(
          `Calculated pour amount for ${seed.label} at 20g / 300g / 1:15.`,
        ),
        totalWaterGrams: fourSixFormulaEvidence(
          "Cumulative water after this calculated 4:6 standard pour.",
        ),
        cumulativeWaterGrams: fourSixFormulaEvidence(
          "Cumulative water after this calculated 4:6 standard pour.",
        ),
        nextStepTimeSec: fourSixFormulaEvidence(
          isLastPour
            ? "03:30 is a drawdown / finish target guidance point, not guaranteed natural completion."
            : "Next pour timing in the Fable5-aligned 4:6 standard schedule.",
        ),
        nextPourGrams: isLastPour
          ? appGuidanceEvidence(
              "There is no next pour; the next target is drawdown / finish guidance.",
            )
          : fourSixFormulaEvidence(
              "Next pour amount in the Fable5-aligned 4:6 standard schedule.",
            ),
        stepType: appGuidanceEvidence(
          "Pourō maps each supported 4:6 standard row to the existing pour step type.",
        ),
        instruction: fourSixFormulaEvidence(
          `Instruction restates the ${seed.label} fixed-example timing, pour amount, and cumulative target.`,
        ),
        nextPreview: fourSixFormulaEvidence(
          isLastPour
            ? "The preview preserves 03:30 as target guidance rather than an exact completion guarantee."
            : "The preview restates the next calculated 4:6 standard pour.",
        ),
        sourceStatus: appGuidanceEvidence(
          "The fixed-example step remains needsReview at container level.",
        ),
        verificationLevel: appGuidanceEvidence(
          "The fixed-example step remains unverified at container level.",
        ),
        isPlaceholder: appGuidanceEvidence(
          "This exact-gated step contains calculated Fable5-aligned data rather than the generic placeholder scaffold.",
        ),
      },
    };
  });
}

function createFourSixStandardRecipe(seed: FourSixStandardRecipeSeed): BrewRecipe {
  return {
    recipeId: `four-six-${seed.variantId.toLowerCase()}-${seed.flavor}-standard-fixed-example`,
    methodId: "four-six",
    coffeeGrams: FOUR_SIX_FIXED_COFFEE_GRAMS,
    waterGrams: FOUR_SIX_FIXED_WATER_GRAMS,
    ratio: FOUR_SIX_FIXED_RATIO,
    waterTempCelsius: null,
    grindSizeLabel: null,
    totalTimeSec: FOUR_SIX_DRAWDOWN_TARGET_SEC,
    totalTimeReferences: [
      {
        seconds: FOUR_SIX_DRAWDOWN_TARGET_SEC,
        precision: "approximate",
        kind: "finish_target",
        label: "03:30",
        note: "Drawdown / finish target guidance only; not exact natural completion.",
      },
    ],
    fixedSetupGate: {
      coffeeGrams: FOUR_SIX_FIXED_COFFEE_GRAMS,
      waterGrams: FOUR_SIX_FIXED_WATER_GRAMS,
      ratio: FOUR_SIX_FIXED_RATIO,
      scalingSupported: false,
      unsupportedSetupBehavior: "placeholder_fallback",
      note: `${seed.variantId} 4:6 ${seed.label} is limited to exact 20g / 300g / 1:15.`,
    },
    valuesArePlaceholder: false,
    needsReviewReason: `${seed.variantId} の ${seed.label} は 20g / 300g / 1:15 の固定例のみアプリ向けに整理しています。任意換算、温度、挽き目、R-04 以降は確認中です。3:30 はドローダウン/終了の目安です。`,
    fieldEvidence: {
      recipeId: appGuidanceEvidence(
        `Pourō identifier for the ${seed.variantId} 4:6 ${seed.label} fixed example.`,
      ),
      methodId: appGuidanceEvidence(
        "PR-RECIPE-01 is limited to four-six R-01/R-02/R-03 standard fixed examples.",
      ),
      coffeeGrams: fourSixFormulaEvidence(
        "20g is the fixed supported dose for this PR-RECIPE-01 4:6 example.",
      ),
      waterGrams: fourSixFormulaEvidence(
        "20g * 15 rounds to 300g total water for the supported fixed setup.",
      ),
      ratio: fourSixFormulaEvidence(
        "1:15 is the fixed supported ratio for this PR-RECIPE-01 4:6 example.",
      ),
      waterTempCelsius: unresolvedEvidence("Temperature is outside PR-RECIPE-01 scope."),
      grindSizeLabel: unresolvedEvidence("Grind guidance is outside PR-RECIPE-01 scope."),
      totalTimeSec: fourSixFormulaEvidence(
        "210 seconds represents the 03:30 drawdown / finish target guidance, not guaranteed natural completion.",
      ),
      totalTimeReferences: fourSixFormulaEvidence(
        "The 03:30 reference is stored as approximate finish target guidance.",
      ),
      fixedSetupGate: appGuidanceEvidence(
        "Pourō limits the candidate to exact 20g / 300g / 1:15, disables scaling, and falls back otherwise.",
      ),
      valuesArePlaceholder: appGuidanceEvidence(
        "The exact-gated recipe contains calculated Fable5-aligned data while method and variant containers retain caution metadata.",
      ),
      needsReviewReason: appGuidanceEvidence(
        "Pourō caution copy states fixed-example scope, unresolved fields, disabled scaling, and 03:30 guidance semantics.",
      ),
      steps: fourSixFormulaEvidence(
        `Four-pour standard schedule for ${seed.label}: ${getFourSixStandardPourAmounts(
          seed.flavor,
        ).join(" / ")}.`,
      ),
    },
    steps: createFourSixStandardSteps(seed),
  };
}

const fourSixR01BasicRecipe = createFourSixStandardRecipe({
  variantId: "R-01",
  flavor: "balanced",
  label: `${fourSixFlavorNotes.balanced} × 標準`,
});

const fourSixR02SweetStandardRecipe = createFourSixStandardRecipe({
  variantId: "R-02",
  flavor: "sweet",
  label: `${fourSixFlavorNotes.sweet} × 標準`,
});

const fourSixR03BrightStandardRecipe = createFourSixStandardRecipe({
  variantId: "R-03",
  flavor: "bright",
  label: `${fourSixFlavorNotes.bright} × 標準`,
});

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

function createTenPourR09FixedSteps(): BrewStep[] {
  const starts = [0, 30, 45, 60, 75, 90, 105, 120, 135, 150];

  return starts.map((startSec, index) => {
    const order = index + 1;
    const cumulativeWaterGrams = order * 30;
    const isLastPour = order === starts.length;
    const nextStepTimeSec = isLastPour ? null : starts[index + 1];

    return {
      id: `ten-pour-r09-fixed-step-${order}`,
      order,
      startSec,
      endSec: null,
      title: `Pour ${order}`,
      actionLabel: "30g 注ぐ",
      pourGrams: 30,
      totalWaterGrams: cumulativeWaterGrams,
      cumulativeWaterGrams,
      nextStepTimeSec,
      nextPourGrams: isLastPour ? null : 30,
      stepType: "pour",
      instruction:
        order === 1
          ? "00:00 に30g注いで蒸らします。追加の蒸らし技法は設定していません。"
          : `${String(Math.floor(startSec / 60)).padStart(2, "0")}:${String(
              startSec % 60,
            ).padStart(2, "0")} に30g注ぎ、累計${cumulativeWaterGrams}gにします。`,
      nextPreview: isLastPour
        ? "約3:30を目安に、全量の落ち切りを確認します"
        : `${String(Math.floor(nextStepTimeSec! / 60)).padStart(2, "0")}:${String(
            nextStepTimeSec! % 60,
          ).padStart(2, "0")} に30g注ぐ`,
      sourceStatus: "needsReview",
      verificationLevel: "unverified",
      isPlaceholder: false,
      fieldEvidence: {
        id: appGuidanceEvidence(
          "Pourō identifier for the narrow THE NEO BREW R-09 fixed example.",
        ),
        order: appGuidanceEvidence(
          "Pourō ordering for the visually confirmed ten-pour schedule.",
        ),
        startSec: tenPourVisualEvidence(
          "Exact pour timestamp confirmed in the PR-013E user-supplied visual evidence.",
        ),
        endSec: unresolvedEvidence(
          "No exact pour duration or exact completion duration is represented.",
        ),
        title: appGuidanceEvidence(
          "Neutral Pour label avoids over-promoting bloom semantics.",
        ),
        actionLabel: tenPourPrimaryDescriptionEvidence(
          "The creator description confirms ten pours of 30g each.",
        ),
        pourGrams: tenPourPrimaryDescriptionEvidence(
          "The creator description confirms ten pours of 30g each for the fixed example.",
        ),
        totalWaterGrams: tenPourVisualEvidence(
          "Cumulative target confirmed in the PR-013E user-supplied visual evidence.",
        ),
        cumulativeWaterGrams: tenPourVisualEvidence(
          "Cumulative target confirmed in the PR-013E user-supplied visual evidence.",
        ),
        nextStepTimeSec: isLastPour
          ? unresolvedEvidence(
              "No exact next event is stored after the final pour; completion is approximate guidance.",
            )
          : tenPourVisualEvidence(
              "Next pour timestamp confirmed in the PR-013E user-supplied visual evidence.",
            ),
        nextPourGrams: isLastPour
          ? appGuidanceEvidence("There is no next pour after Pour 10.")
          : tenPourPrimaryDescriptionEvidence(
              "The creator description confirms each next pour is 30g in the fixed example.",
            ),
        stepType: appGuidanceEvidence(
          "Pourō maps every schedule row to the neutral existing pour step type.",
        ),
        instruction:
          order === 1
            ? tenPourVisualEvidence(
                "The first-row note visibly says to pour 30g and bloom/rest; no extra technique is added.",
              )
            : tenPourVisualEvidence(
                "Instruction restates the visually confirmed timestamp and cumulative target.",
              ),
        nextPreview: isLastPour
          ? tenPourVisualEvidence(
              "About 3:30 is approximate completion/drawdown guidance, not exact duration or dripper-removal timing.",
            )
          : tenPourVisualEvidence(
              "Preview restates the next visually confirmed pour timestamp.",
            ),
        sourceStatus: appGuidanceEvidence(
          "The candidate step remains needsReview at container level.",
        ),
        verificationLevel: appGuidanceEvidence(
          "The candidate step remains unverified at container level.",
        ),
        isPlaceholder: appGuidanceEvidence(
          "This exact-gated step contains reviewed candidate data rather than the generic placeholder scaffold.",
        ),
      },
    };
  });
}

const tenPourR09FixedExampleRecipe: BrewRecipe = {
  recipeId: "ten-pour-r09-the-neo-brew-fixed-example",
  methodId: "ten-pour",
  coffeeGrams: 20,
  waterGrams: 300,
  ratio: 15,
  waterTempCelsius: null,
  waterTempCelsiusRange: {
    min: 95,
    max: 96,
    unit: "celsius",
    label: "95-96°C",
    note: "Primary-description-confirmed range for the fixed example.",
  },
  grindSizeLabel: "極粗挽き / Comandante C40 40-45クリック",
  totalTimeSec: null,
  totalTimeReferences: [
    {
      seconds: 210,
      precision: "approximate",
      kind: "finish_target",
      label: "約3:30",
      note: "Approximate completion/drawdown guidance only; not exact duration or dripper-removal timing.",
    },
  ],
  fixedSetupGate: {
    coffeeGrams: 20,
    waterGrams: 300,
    ratio: 15,
    scalingSupported: false,
    unsupportedSetupBehavior: "placeholder_fallback",
    note: "THE NEO BREW R-09 candidate is limited to exact 20g / 300g / 1:15.",
  },
  valuesArePlaceholder: false,
  needsReviewReason:
    "THE NEO BREW の固定例（20g / 300g / 1:15）のみ確認済み候補です。約3:30は落ち切りの目安で、フィルター、正確な完了時刻、ドリッパー取り外し時刻、任意換算は未解決です。HARIO V60 NEO推奨、V60対応です。Pourōは非公式で、出典元との提携・監修関係はありません。",
  fieldEvidence: {
    recipeId: appGuidanceEvidence(
      "Pourō identifier for the narrow THE NEO BREW R-09 fixed example.",
    ),
    methodId: appGuidanceEvidence(
      "PR-013E approves R-09 as Pourō's internal mapping for this fixed-example candidate only.",
    ),
    coffeeGrams: tenPourPrimaryDescriptionEvidence(
      "20g is directly confirmed for the fixed example only.",
    ),
    waterGrams: tenPourPrimaryDescriptionEvidence(
      "300g is directly confirmed for the fixed example only.",
    ),
    ratio: tenPourPrimaryDescriptionEvidence(
      "1:15 is directly confirmed for the fixed example only.",
    ),
    waterTempCelsius: unresolvedEvidence(
      "No single exact temperature is selected because the source supports a range.",
    ),
    waterTempCelsiusRange: tenPourPrimaryDescriptionEvidence(
      "The creator description confirms 95-96°C as a range.",
    ),
    grindSizeLabel: tenPourPrimaryDescriptionEvidence(
      "The creator description confirms extra coarse / Comandante C40 40-45 clicks.",
    ),
    totalTimeSec: unresolvedEvidence(
      "Exact completion duration and dripper-removal timing remain unresolved.",
    ),
    totalTimeReferences: tenPourVisualEvidence(
      "The PR-013E visual evidence supports about 3:30 as approximate completion/drawdown guidance only.",
    ),
    fixedSetupGate: appGuidanceEvidence(
      "Pourō limits the candidate to exact 20g / 300g / 1:15, disables scaling, and falls back otherwise.",
    ),
    valuesArePlaceholder: appGuidanceEvidence(
      "The exact-gated recipe contains reviewed candidate data while method and variant containers retain caution metadata.",
    ),
    needsReviewReason: appGuidanceEvidence(
      "Pourō caution copy states fixed-example scope, approximation, unresolved fields, narrow equipment support, disabled scaling, and non-affiliation.",
    ),
    steps: tenPourVisualEvidence(
      "The full timestamp and cumulative-target schedule is confirmed by the PR-013E user-supplied visual evidence.",
    ),
    equipment: tenPourPrimaryDescriptionEvidence(
      "HARIO V60 NEO is recommended and V60 is acceptable; no broader equipment claim is made.",
    ),
    filter: unresolvedEvidence("No filter type is established."),
    scaling: unresolvedEvidence(
      "Arbitrary dose and ratio scaling are unsupported.",
    ),
  },
  steps: createTenPourR09FixedSteps(),
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
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    sourceTitle: "HARIO Coffee Scale POLARIS",
    sourceUrl: "https://global.hario.com/product/new/CST.html",
    sourceNote:
      "R-01 / R-02 / R-03 は 20g / 300g / 1:15 の標準固定例のみアプリ向けに整理しています。R-04 から R-06 は未解決または placeholder のままです。",
    valuesArePlaceholder: true,
    fieldEvidence: {
      displayName: appGuidanceEvidence(
        "PR-RECIPE-01 maps balanced + standard to repository variant R-01.",
      ),
      shortLabel: appGuidanceEvidence(
        "Repository label for the balanced + standard R-01 mapping.",
      ),
      shortDescription: appGuidanceEvidence(
        "Pourō explanation of the balanced + standard R-01 mapping.",
      ),
      recommendedCoffeeGrams: fourSixFormulaEvidence(
        "20g is the supported fixed dose for PR-RECIPE-01 R-01.",
      ),
      recommendedRatio: fourSixFormulaEvidence(
        "1:15 is the supported fixed ratio for PR-RECIPE-01 R-01.",
      ),
      recommendedWaterGrams: fourSixFormulaEvidence(
        "20g * 15 rounds to 300g for the supported fixed setup.",
      ),
      sourceTitle: sourceOriginalEvidence(
        "S1",
        "Source metadata retained from the existing 4:6 method reference.",
      ),
      sourceUrl: sourceOriginalEvidence(
        "S1",
        "Source metadata retained from the existing 4:6 method reference.",
      ),
      sourceNote: appGuidanceEvidence(
        "Pourō note limits fixed-example treatment to R-01/R-02/R-03 and leaves R-04/R-05/R-06 unresolved.",
      ),
      recipe: appGuidanceEvidence(
        "PR-RECIPE-01 permits the balanced + standard fixed recipe for R-01.",
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
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    sourceNote:
      "R-02 は 20g / 300g / 1:15 の甘め寄り × 標準固定例のみアプリ向けに整理しています。任意換算は未対応です。",
    valuesArePlaceholder: true,
    fieldEvidence: {
      displayName: appGuidanceEvidence(
        "PR-RECIPE-01 maps sweet + standard to repository variant R-02.",
      ),
      shortLabel: appGuidanceEvidence(
        "Repository label for the sweet + standard R-02 mapping.",
      ),
      shortDescription: appGuidanceEvidence(
        "Pourō explanation of the sweet + standard R-02 mapping.",
      ),
      recommendedCoffeeGrams: fourSixFormulaEvidence(
        "20g is the supported fixed dose for PR-RECIPE-01 R-02.",
      ),
      recommendedRatio: fourSixFormulaEvidence(
        "1:15 is the supported fixed ratio for PR-RECIPE-01 R-02.",
      ),
      recommendedWaterGrams: fourSixFormulaEvidence(
        "20g * 15 rounds to 300g for the supported fixed setup.",
      ),
      sourceNote: appGuidanceEvidence(
        "Pourō note limits R-02 to the exact sweet + standard fixed example.",
      ),
      recipe: appGuidanceEvidence(
        "PR-RECIPE-01 permits the sweet + standard fixed recipe for R-02.",
      ),
    },
    recipe: fourSixR02SweetStandardRecipe,
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
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    sourceNote:
      "R-03 は 20g / 300g / 1:15 の明るめ寄り × 標準固定例のみアプリ向けに整理しています。任意換算は未対応です。",
    valuesArePlaceholder: true,
    fieldEvidence: {
      displayName: appGuidanceEvidence(
        "PR-RECIPE-01 maps bright + standard to repository variant R-03.",
      ),
      shortLabel: appGuidanceEvidence(
        "Repository label for the bright + standard R-03 mapping.",
      ),
      shortDescription: appGuidanceEvidence(
        "Pourō explanation of the bright + standard R-03 mapping.",
      ),
      recommendedCoffeeGrams: fourSixFormulaEvidence(
        "20g is the supported fixed dose for PR-RECIPE-01 R-03.",
      ),
      recommendedRatio: fourSixFormulaEvidence(
        "1:15 is the supported fixed ratio for PR-RECIPE-01 R-03.",
      ),
      recommendedWaterGrams: fourSixFormulaEvidence(
        "20g * 15 rounds to 300g for the supported fixed setup.",
      ),
      sourceNote: appGuidanceEvidence(
        "Pourō note limits R-03 to the exact bright + standard fixed example.",
      ),
      recipe: appGuidanceEvidence(
        "PR-RECIPE-01 permits the bright + standard fixed recipe for R-03.",
      ),
    },
    recipe: fourSixR03BrightStandardRecipe,
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
    shortDescription: "THE NEO BREW / HARIO V60 NEO の固定例候補です。",
    isAdvanced: false,
    recommendedCoffeeGrams: 20,
    recommendedRatio: 15,
    recommendedWaterGrams: 300,
    sourceStatus: "needsReview",
    verificationLevel: "unverified",
    sourceTitle: tenPourSources.S1.sourceTitle,
    sourceUrl: tenPourSources.S1.sourceUrl,
    sourceNote:
      "R-09 は THE NEO BREW の 20g / 300g / 1:15 固定例のみを扱うPourō内部候補です。任意換算には対応せず、Pourōは出典元と提携・監修関係のない非公式ガイドです。",
    valuesArePlaceholder: true,
    fieldEvidence: {
      recommendedCoffeeGrams: tenPourPrimaryDescriptionEvidence(
        "20g is directly confirmed for the fixed example only.",
      ),
      recommendedRatio: tenPourPrimaryDescriptionEvidence(
        "1:15 is directly confirmed for the fixed example only.",
      ),
      recommendedWaterGrams: tenPourPrimaryDescriptionEvidence(
        "300g is directly confirmed for the fixed example only.",
      ),
      sourceTitle: tenPourPrimaryDescriptionEvidence(
        "Creator-source metadata for the narrow fixed example.",
      ),
      sourceUrl: tenPourPrimaryDescriptionEvidence(
        "Creator-source metadata for the narrow fixed example.",
      ),
      sourceNote: appGuidanceEvidence(
        "Pourō note limits source-backed treatment to the fixed example and states non-affiliation.",
      ),
      valuesArePlaceholder: appGuidanceEvidence(
        "The R-09 variant container remains caution-protected despite its exact recipe candidate.",
      ),
      recipe: appGuidanceEvidence(
        "The reviewed candidate is selected only by the exact setup gate.",
      ),
    },
    recipe: tenPourR09FixedExampleRecipe,
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

function isFourSixStandardFixedVariant(
  variantId: BrewVariantId | undefined,
): variantId is Extract<BrewVariantId, "R-01" | "R-02" | "R-03"> {
  return variantId === "R-01" || variantId === "R-02" || variantId === "R-03";
}

export function getRecipeForSetup(
  method: BrewMethod,
  setup: BrewSetup,
): BrewRecipe {
  if (
    method.id === "four-six" &&
    setup.methodId === "four-six" &&
    isFourSixStandardFixedVariant(setup.variantId) &&
    setup.coffeeGrams === 20 &&
    setup.ratio === 15 &&
    setup.waterGrams === 300
  ) {
    return getVariantById(setup.variantId)?.recipe ?? method.recipe;
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

  if (
    method.id === "ten-pour" &&
    setup.methodId === "ten-pour" &&
    setup.variantId === "R-09" &&
    setup.coffeeGrams === 20 &&
    setup.ratio === 15 &&
    setup.waterGrams === 300
  ) {
    return getVariantById("R-09")?.recipe ?? method.recipe;
  }

  return method.recipe;
}

export function getDefaultVariantForMethod(
  methodId: BrewMethodId,
): BrewVariant | undefined {
  return getVariantsByMethodId(methodId)[0];
}
