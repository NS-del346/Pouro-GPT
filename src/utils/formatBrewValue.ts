export function formatPourGrams(value: number | null): string {
  return `Pour ${formatGrams(value)}`;
}

export function formatTotalWaterGrams(value: number | null): string {
  return `Total ${formatGrams(value)}`;
}

export function formatRecipeGrams(value: number | null): string {
  return formatGrams(value);
}

function formatGrams(value: number | null): string {
  if (value === null) return "--g";
  return `${value}g`;
}
