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

const themeOptions: Array<{ label: string; value: AppTheme }> = [
  { label: "ライト", value: "light" },
  { label: "ウォーム", value: "warm" },
  { label: "ダーク", value: "dark" },
];

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(() => getUserSettings());
  const [historyCount, setHistoryCount] = useState(() => getBrewHistory().length);
  const [saveMessage, setSaveMessage] = useState(
    "設定はこのブラウザに保存されます。",
  );

  function updateSettings(patch: Partial<UserSettings>) {
    const savedSettings = saveUserSettings({
      ...settings,
      ...patch,
    });

    setSettings(savedSettings);
    setSaveMessage("保存しました。");
  }

  function handleDeleteData() {
    const confirmed = window.confirm(
      "このブラウザに保存された抽出履歴をすべて削除します。設定は削除されません。",
    );

    if (!confirmed) return;

    clearBrewHistory();
    setHistoryCount(0);
    setSaveMessage("抽出履歴を削除しました。設定は保持されています。");
  }

  return (
    <Page
      title="設定"
      eyebrow="pourō"
      description="Pourōの設定、ローカルデータ管理、アプリ情報・出典・免責・プライバシーへの入口です。"
    >
      <section className="settings-brand" aria-label="アプリ情報">
        <p className="logo-mark">pourō</p>
        <h2>Pourō</h2>
        <p>Pour slowly. Brew deeply.</p>
      </section>

      <section className="settings-panel" aria-labelledby="preferences-heading">
        <div className="section-heading">
          <p className="eyebrow">設定</p>
          <h2 id="preferences-heading">基本設定</h2>
        </div>

        <label className="setting-row">
          <span>
            <strong>通知音</strong>
            <small>PR-006ではUIと保存のみを実装しています。</small>
          </span>
          <input
            aria-label="通知音"
            checked={settings.soundEnabled}
            onChange={(event) =>
              updateSettings({ soundEnabled: event.currentTarget.checked })
            }
            type="checkbox"
          />
        </label>

        <label className="setting-row">
          <span>
            <strong>バイブレーション</strong>
            <small>PR-006ではUIと保存のみを実装しています。</small>
          </span>
          <input
            aria-label="バイブレーション"
            checked={settings.vibrationEnabled}
            onChange={(event) =>
              updateSettings({ vibrationEnabled: event.currentTarget.checked })
            }
            type="checkbox"
          />
        </label>

        <div className="setting-row setting-row--stacked">
          <span>
            <strong>テーマ</strong>
            <small>保存値のみを扱い、完全なテーマ切替は後続PRで調整します。</small>
          </span>
          <div className="segmented-control" role="group" aria-label="テーマ">
            {themeOptions.map((theme) => (
              <button
                className={
                  settings.theme === theme.value
                    ? "segment-button segment-button--selected"
                    : "segment-button"
                }
                key={theme.value}
                onClick={() => updateSettings({ theme: theme.value })}
                type="button"
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        <label className="setting-row">
          <span>
            <strong>温度ガイド表示</strong>
            <small>原典未確認の推奨湯温表示は実装していません。</small>
          </span>
          <input
            aria-label="温度ガイド表示"
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
          <p className="eyebrow">データ</p>
          <h2 id="data-heading">データ管理</h2>
        </div>
        <p className="notice-text">
          抽出履歴と設定は、このブラウザのlocalStorageに保存されます。
          履歴削除は取り消せません。
        </p>
        <p className="history-count">
          保存済み記録: <strong>{historyCount}</strong>
        </p>
        <button
          className="danger-button"
          onClick={handleDeleteData}
          type="button"
        >
          すべての履歴を削除
        </button>
      </section>

      <RouteLinks
        links={[
          { label: "Pourōについて", to: "/settings/about" },
          { label: "出典・確認状況", to: "/settings/sources" },
          { label: "免責事項", to: "/settings/legal" },
          { label: "プライバシーポリシー", to: "/settings/privacy" },
        ]}
      />
    </Page>
  );
}
