import type { GrinderPreset } from "../types/grinder";

export const placeholderGrinderPresets: readonly GrinderPreset[] = [
  {
    id: "comandante-c40-reference-placeholder",
    maker: "Comandante",
    model: "C40",
    displayName: "Comandante C40（基準候補・検証中）",
    presetStatus: "needs_review",
    adjustmentType: "unknown",
    sourceStatus: "needs_review",
    verificationLevel: "needs_review",
    notes: "将来の基準候補。換算値やクリック間隔は未検証です。",
  },
  {
    id: "user-grinder-placeholder",
    maker: "",
    model: "",
    displayName: "使用グラインダー（今後追加）",
    presetStatus: "placeholder",
    adjustmentType: "unknown",
    sourceStatus: "placeholder",
    verificationLevel: "needs_review",
    notes: "検証済みプリセット追加後に選択可能にする予定です。",
  },
];
