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
      "このブラウザに保存された抽出履歴をすべて削除します。設定は削除されません。必要な場合は先にCSVまたはJSONを書き出してください。",
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
      title="設定 / データ"
      eyebrow="Data Trust"
      description="保存場所、書き出し、バックアップ、非公式性をここで確認できます。"
      className="visual-polish-page visual-polish-page--settings"
    >
      <section className="settings-brand settings-brand--trust" aria-label="アプリとデータの状態">
        <p className="logo-mark">pourō</p>
        <h2>データ管理センター</h2>
        <p>
          Pourō / Pouro-GPT は、抽出を進めるための非公式ローカルファーストツールです。
          履歴の保存場所、書き出し、注意点をこの画面で確認できます。
        </p>
      </section>

      <section className="settings-panel settings-panel--overview" aria-labelledby="data-heading">
        <div className="section-heading">
          <p className="eyebrow">データ管理</p>
          <h2 id="data-heading">保存状態</h2>
        </div>
        <dl className="settings-status-grid" aria-label="データ管理の概要">
          <div>
            <dt>保存済み履歴</dt>
            <dd>{historyCount}件</dd>
          </div>
          <div>
            <dt>保存場所</dt>
            <dd>このブラウザ</dd>
          </div>
          <div>
            <dt>復元機能</dt>
            <dd>未実装</dd>
          </div>
        </dl>
        <p className="settings-save-message" role="status">
          {saveMessage}
        </p>
      </section>

      <section className="settings-panel" aria-labelledby="local-storage-heading">
        <div className="section-heading">
          <p className="eyebrow">ローカル保存</p>
          <h2 id="local-storage-heading">履歴は端末のブラウザ内に保存</h2>
        </div>
        <ul className="settings-note-list">
          <li>抽出履歴は、この端末のブラウザ内に保存されます。</li>
          <li>アカウント同期やクラウド保存はありません。</li>
          <li>
            ブラウザデータ削除、端末変更、プライベートブラウズなどで履歴が失われる場合があります。
          </li>
          <li>必要に応じてCSVまたはJSONでバックアップしてください。</li>
        </ul>
      </section>

      <section className="settings-panel settings-panel--exports" aria-labelledby="export-heading">
        <div className="section-heading">
          <p className="eyebrow">エクスポート</p>
          <h2 id="export-heading">履歴を書き出す</h2>
        </div>
        <div className="settings-export-actions">
          <div className="settings-export-action">
            <div>
              <strong>CSVを書き出す</strong>
              <p>表計算ソフトで履歴を確認しやすい形式です。</p>
            </div>
            <button
              className="settings-export-button"
              disabled={historyCount === 0}
              onClick={handleExportCsv}
              type="button"
            >
              CSV
            </button>
          </div>
          <div className="settings-export-action">
            <div>
              <strong>詳細バックアップ（JSON）</strong>
              <p>履歴を詳しく残すためのバックアップ形式です。通常の確認にはCSVが十分です。</p>
            </div>
            <button
              className="settings-export-button settings-export-button--secondary"
              disabled={historyCount === 0}
              onClick={handleExportJson}
              type="button"
            >
              JSON
            </button>
          </div>
          {historyCount === 0 && (
            <p className="settings-empty-message">
              書き出せる保存済み履歴はありません。
            </p>
          )}
        </div>
      </section>

      <section className="settings-panel settings-panel--caution" aria-labelledby="backup-caution-heading">
        <div className="section-heading">
          <p className="eyebrow">注意事項</p>
          <h2 id="backup-caution-heading">JSON復元はまだできません</h2>
        </div>
        <p className="notice-text">
          現在、この画面からJSONを復元する機能はありません。JSONは詳細バックアップとして保存し、
          日常の確認や表計算での整理にはCSVを使ってください。
        </p>
      </section>

      <section className="settings-panel settings-panel--source" aria-labelledby="source-note-heading">
        <div className="section-heading">
          <p className="eyebrow">非公式 / 確認状態</p>
          <h2 id="source-note-heading">出典と保証について</h2>
        </div>
        <p className="notice-text">
          このアプリは非公式の抽出補助ツールです。粕谷哲氏、PHILOCOFFEA / PHILOCOFFEE、
          HARIO、各メーカー、その他の企業・人物による公認、監修、認証、提携、推奨、
          保証を示すものではありません。
        </p>
        <p className="notice-text">
          レシピ値や換算値には確認状況や要確認の値が含まれる場合があります。
          抽出結果や味の改善は保証されません。
        </p>
      </section>

      <section className="settings-panel settings-panel--danger" aria-labelledby="danger-heading">
        <div className="section-heading">
          <p className="eyebrow">データ削除</p>
          <h2 id="danger-heading">この端末の履歴を削除</h2>
        </div>
        <p className="notice-text">
          この操作は、このブラウザに保存された抽出履歴だけを削除します。設定は削除されません。
          実行前に必要な履歴を書き出してください。
        </p>
        <button
          className="danger-button"
          onClick={handleDeleteData}
          type="button"
        >
          すべての履歴を削除
        </button>
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
