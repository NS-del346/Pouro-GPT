import type { AppTheme, UserSettings } from "../types";

const USER_SETTINGS_KEY = "userSettings";
const DEFAULT_THEME: AppTheme = "warm";

function canUseLocalStorage(): boolean {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

function createDefaultUserSettings(): UserSettings {
  return {
    soundEnabled: true,
    vibrationEnabled: false,
    theme: DEFAULT_THEME,
    showTemperatureGuide: true,
    updatedAt: new Date().toISOString(),
  };
}

function isAppTheme(value: unknown): value is AppTheme {
  return value === "light" || value === "warm" || value === "dark";
}

function normalizeUserSettings(value: unknown): UserSettings {
  const defaults = createDefaultUserSettings();
  if (!value || typeof value !== "object") return defaults;

  const candidate = value as Partial<UserSettings>;

  return {
    soundEnabled:
      typeof candidate.soundEnabled === "boolean"
        ? candidate.soundEnabled
        : defaults.soundEnabled,
    vibrationEnabled:
      typeof candidate.vibrationEnabled === "boolean"
        ? candidate.vibrationEnabled
        : defaults.vibrationEnabled,
    theme: isAppTheme(candidate.theme) ? candidate.theme : defaults.theme,
    showTemperatureGuide:
      typeof candidate.showTemperatureGuide === "boolean"
        ? candidate.showTemperatureGuide
        : defaults.showTemperatureGuide,
    updatedAt:
      typeof candidate.updatedAt === "string"
        ? candidate.updatedAt
        : defaults.updatedAt,
  };
}

export function getUserSettings(): UserSettings {
  if (!canUseLocalStorage()) return createDefaultUserSettings();

  try {
    const rawValue = window.localStorage.getItem(USER_SETTINGS_KEY);
    if (!rawValue) return createDefaultUserSettings();

    return normalizeUserSettings(JSON.parse(rawValue));
  } catch {
    return createDefaultUserSettings();
  }
}

export function saveUserSettings(settings: UserSettings): UserSettings {
  const nextSettings = normalizeUserSettings({
    ...settings,
    updatedAt: new Date().toISOString(),
  });

  if (!canUseLocalStorage()) return nextSettings;

  try {
    window.localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(nextSettings));
    return nextSettings;
  } catch {
    return nextSettings;
  }
}

export function resetUserSettings(): UserSettings {
  const defaultSettings = createDefaultUserSettings();

  if (!canUseLocalStorage()) return defaultSettings;

  try {
    window.localStorage.removeItem(USER_SETTINGS_KEY);
  } catch {
    // localStorage failure should never crash the app.
  }

  return defaultSettings;
}
