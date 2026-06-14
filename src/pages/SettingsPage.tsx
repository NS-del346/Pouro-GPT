import { useState } from "react";
import { Page } from "../components/layout/Page";
import { RouteLinks } from "../components/navigation/RouteLinks";
import {
  clearBrewHistory,
  getBrewHistory,
  getUserSettings,
  saveUserSettings,
} from "../repositories";
import type { AppTheme, BrewSession, UserSettings } from "../types";

const themeOptions: Array<{ label: string; value: AppTheme }> = [
  { label: "ライト", value: "light" },
  { label: "ウォーム", value: "warm" },
  { label: "ダーク", value: "dark" },
];

const csvHeaders = [
  "id",
  "finishedAtIso",
  "methodId",
  "methodName",
  "variantId",
  "coffeeGrams",
  "waterGrams",
  "ratio",
  "elapsedMsAtFinish",
  "rating",
  "tasteNotes",
  "tasteImpression",
  "nextAdjustmentMemo",
  "freeMemo",
];

function formatExportTimestamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "-",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function escapeCsvValue(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function buildBrewHistoryCsv(history: BrewSession[]): string {
  const rows = history.map((session) => [
    session.id,
    session.finishedAtIso,
    session.methodId,
    session.methodSnapshot?.displayName,
    session.setupSnapshot?.variantId,
    session.setupSnapshot?.coffeeGrams,
    session.setupSnapshot?.waterGrams,
    session.setupSnapshot?.ratio,
    session.elapsedMsAtFinish,
    session.result?.rating,
    session.result?.tasteNotes?.join(" / "),
    session.result?.tasteImpression,
    session.result?.nextAdjustmentMemo,
    session.result?.freeMemo,
  ]);

  return [csvHeaders, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\r\n");
}

function downloadFile(content: BlobPart, type: string, filename: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

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

  function handleExportCsv() {
    const history = getBrewHistory();
    if (history.length === 0) {
      setHistoryCount(0);
      return;
    }

    const timestamp = formatExportTimestamp(new Date());
    const csv = buildBrewHistoryCsv(history);
    downloadFile(
      `\uFEFF${csv}`,
      "text/csv;charset=utf-8",
      `pouro-brew-history-${timestamp}.csv`,
    );
    setSaveMessage("CSVを書き出しました。");
  }

  function handleExportJson() {
    const history = getBrewHistory();
    if (history.length === 0) {
      setHistoryCount(0);
      return;
    }

    const exportedAt = new Date();
    const backup = {
      app: "Pouro-GPT",
      exportType: "brewHistoryBackup",
      exportedAt: exportedAt.toISOString(),
      schemaVersion: 1,
      brewHistory: history,
    };

    downloadFile(
      JSON.stringify(backup, null, 2),
      "application/json;charset=utf-8",
      `pouro-brew-history-backup-${formatExportTimestamp(exportedAt)}.json`,
    );
    setSaveMessage("JSONバックアップを書き出しました。");
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
          抽出履歴と設定は、このブラウザのローカル保存領域に保存されます。
          履歴削除は取り消せません。
        </p>
        <p className="history-count">
          保存済み記録: <strong>{historyCount}</strong>
        </p>
        <div className="settings-export-actions">
          <button
            className="settings-export-button"
            disabled={historyCount === 0}
            onClick={handleExportCsv}
            type="button"
          >
            履歴を書き出す（CSV）
          </button>
          <button
            className="settings-export-button settings-export-button--secondary"
            disabled={historyCount === 0}
            onClick={handleExportJson}
            type="button"
          >
            詳細バックアップ（JSON）
          </button>
          {historyCount === 0 && (
            <p className="settings-empty-message">
              書き出せる保存済み履歴はありません。
            </p>
          )}
        </div>
        <div className="settings-danger-zone">
          <button
            className="danger-button"
            onClick={handleDeleteData}
            type="button"
          >
            すべての履歴を削除
          </button>
        </div>
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
