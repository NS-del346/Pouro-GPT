import { getVariantById } from "../data";
import type { BrewSession } from "../types";

export type SessionSetupField = {
  label: string;
  value: string;
};

function formatGrams(value: number | undefined, emptyLabel: string): string {
  return typeof value === "number" ? `${value}g` : emptyLabel;
}

export function getSessionMethodLabel(session: BrewSession): string {
  return session.methodSnapshot?.displayName ?? "Unknown method";
}

export function getSessionVariantLabel(session: BrewSession): string | null {
  const variantId = session.setupSnapshot?.variantId;

  if (!variantId) {
    return null;
  }

  const variant = getVariantById(variantId);

  if (!variant) {
    return "Recipe variant";
  }

  if (variant.methodId === "ice-brew") {
    return variant.displayName;
  }

  if (variant.isAdvanced) {
    return `${variant.shortLabel} / Advanced`;
  }

  return variant.shortLabel;
}

export function getSessionSetupSummary(session: BrewSession): string {
  const setup = session.setupSnapshot;
  const coffee = formatGrams(setup.coffeeGrams, "豆量 未記録");

  if (setup.methodId === "ice-brew") {
    const hotWater =
      typeof setup.hotWaterGrams === "number"
        ? `注湯${setup.hotWaterGrams}g`
        : "注湯 未記録";
    const ice =
      typeof setup.iceGrams === "number" ? `氷${setup.iceGrams}g` : "氷 未記録";

    return `${coffee} / ${hotWater} / ${ice}`;
  }

  const water = formatGrams(setup.waterGrams, "湯量 未記録");
  const ratio =
    typeof setup.ratio === "number" ? `1:${setup.ratio}` : "比率 未記録";

  return `${coffee} / ${water} / ${ratio}`;
}

export function getSessionSetupFields(session: BrewSession): SessionSetupField[] {
  const setup = session.setupSnapshot;

  if (setup.methodId === "ice-brew") {
    return [
      { label: "豆量", value: formatGrams(setup.coffeeGrams, "未記録") },
      { label: "注湯量", value: formatGrams(setup.hotWaterGrams, "未記録") },
      { label: "氷量", value: formatGrams(setup.iceGrams, "未記録") },
      { label: "完成量", value: formatGrams(setup.finalYieldGrams, "未記録") },
    ];
  }

  return [
    { label: "豆量", value: formatGrams(setup.coffeeGrams, "未記録") },
    { label: "湯量", value: formatGrams(setup.waterGrams, "未記録") },
    {
      label: "比率",
      value: typeof setup.ratio === "number" ? `1:${setup.ratio}` : "未記録",
    },
  ];
}
