import { useState } from "react";
import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";
import {
  clearBrewHistory,
  getBrewHistory,
  getUserSettings,
  saveUserSettings,
} from "../repositories";
import type { AppTheme, UserSettings } from "../types";

const themeOptions: AppTheme[] = ["light", "warm", "dark"];

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(() => getUserSettings());
  const [historyCount, setHistoryCount] = useState(() => getBrewHistory().length);
  const [saveMessage, setSaveMessage] = useState(
    "Settings are saved on this device.",
  );

  function updateSettings(patch: Partial<UserSettings>) {
    const savedSettings = saveUserSettings({
      ...settings,
      ...patch,
    });

    setSettings(savedSettings);
    setSaveMessage("Saved.");
  }

  function handleDeleteData() {
    const confirmed = window.confirm(
      "Delete all saved brew history on this device? App settings will be kept.",
    );

    if (!confirmed) return;

    clearBrewHistory();
    setHistoryCount(0);
    setSaveMessage("Saved brew history was deleted. Settings were kept.");
  }

  return (
    <Page
      title="Settings"
      eyebrow="pourō"
      description="Pourō app settings, local data controls, and release notes for privacy, sources, and legal notices."
    >
      <section className="settings-brand" aria-label="App identity">
        <p className="logo-mark">pourō</p>
        <h2>Pourō</h2>
        <p>Pour slowly. Brew deeply.</p>
      </section>

      <section className="settings-panel" aria-labelledby="preferences-heading">
        <div className="section-heading">
          <p className="eyebrow">Preferences</p>
          <h2 id="preferences-heading">App settings</h2>
        </div>

        <label className="setting-row">
          <span>
            <strong>Notification sound</strong>
            <small>UI and local saving only in PR-006.</small>
          </span>
          <input
            aria-label="Notification sound"
            checked={settings.soundEnabled}
            onChange={(event) =>
              updateSettings({ soundEnabled: event.currentTarget.checked })
            }
            type="checkbox"
          />
        </label>

        <label className="setting-row">
          <span>
            <strong>Vibration</strong>
            <small>UI and local saving only in PR-006.</small>
          </span>
          <input
            aria-label="Vibration"
            checked={settings.vibrationEnabled}
            onChange={(event) =>
              updateSettings({ vibrationEnabled: event.currentTarget.checked })
            }
            type="checkbox"
          />
        </label>

        <div className="setting-row setting-row--stacked">
          <span>
            <strong>Theme</strong>
            <small>The saved value is prepared for later theme work.</small>
          </span>
          <div className="segmented-control" role="group" aria-label="Theme">
            {themeOptions.map((theme) => (
              <button
                className={
                  settings.theme === theme
                    ? "segment-button segment-button--selected"
                    : "segment-button"
                }
                key={theme}
                onClick={() => updateSettings({ theme })}
                type="button"
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <label className="setting-row">
          <span>
            <strong>Show temperature guide</strong>
            <small>No unverified temperature recommendations are shown.</small>
          </span>
          <input
            aria-label="Show temperature guide"
            checked={settings.showTemperatureGuide}
            onChange={(event) =>
              updateSettings({
                showTemperatureGuide: event.currentTarget.checked,
              })
            }
            type="checkbox"
          />
        </label>

        <p className="settings-save-message" role="status">
          {saveMessage}
        </p>
      </section>

      <section className="settings-panel" aria-labelledby="data-heading">
        <div className="section-heading">
          <p className="eyebrow">Data</p>
          <h2 id="data-heading">Data management</h2>
        </div>
        <p className="notice-text">
          Brew history and settings are stored only in this browser's
          localStorage. Deleting brew history cannot be undone.
        </p>
        <p className="history-count">
          Saved brew history: <strong>{historyCount}</strong>
        </p>
        <button
          className="danger-button"
          onClick={handleDeleteData}
          type="button"
        >
          Delete brew history
        </button>
      </section>

      <RouteLinks
        links={[
          { label: "About Pourō", to: "/settings/about" },
          { label: "Sources and review status", to: "/settings/sources" },
          { label: "Legal notices", to: "/settings/legal" },
          { label: "Privacy policy", to: "/settings/privacy" },
        ]}
      />
    </Page>
  );
}
