export function formatElapsedMs(ms: number | null): string {
  if (ms === null) return "--:--";

  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "日時未記録";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "日時未記録";

  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
