import type { BrewSession } from "../types";

const BREW_HISTORY_KEY = "brewHistory";
const MAX_HISTORY_COUNT = 500;

function canUseLocalStorage(): boolean {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

function readHistoryValue(): BrewSession[] {
  if (!canUseLocalStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(BREW_HISTORY_KEY);
    if (!rawValue) return [];

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue as BrewSession[];
  } catch {
    return [];
  }
}

function writeHistoryValue(history: BrewSession[]): BrewSession[] {
  const limitedHistory = history.slice(0, MAX_HISTORY_COUNT);

  if (!canUseLocalStorage()) return limitedHistory;

  try {
    window.localStorage.setItem(BREW_HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch {
    return readHistoryValue();
  }

  return limitedHistory;
}

export function getBrewHistory(): BrewSession[] {
  return readHistoryValue();
}

export function saveBrewSession(session: BrewSession): BrewSession[] {
  const history = readHistoryValue();
  const withoutDuplicate = history.filter((item) => item.id !== session.id);

  return writeHistoryValue([session, ...withoutDuplicate]);
}

export function getBrewSessionById(id: string): BrewSession | null {
  return readHistoryValue().find((session) => session.id === id) ?? null;
}

export function deleteBrewSession(id: string): BrewSession[] {
  return writeHistoryValue(readHistoryValue().filter((session) => session.id !== id));
}

export function clearBrewHistory(): void {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.removeItem(BREW_HISTORY_KEY);
  } catch {
    // localStorage failure should never crash the app.
  }
}
