import { Page } from "../components/layout/Page";
import { placeholderGrinderPresets } from "../data";

export function ToolsPage() {
  const sourcePreset = placeholderGrinderPresets[0];
  const targetPreset = placeholderGrinderPresets[1];

  return (
    <Page
      className="tools-page visual-polish-page visual-polish-page--tools"
      title="ツール"
      eyebrow="Precision Brew Cockpit"
      description="抽出を支える補助ツールを、安全なデータ境界から準備しています。"
    >
      <section
        className="content-card click-converter-card"
        aria-labelledby="click-converter-heading"
      >
        <div className="click-converter-card__header">
          <div className="section-heading">
            <p className="eyebrow">Grinder Reference Tool</p>
            <h2 id="click-converter-heading">クリック換算</h2>
          </div>
          <span className="status-pill">準備中</span>
        </div>

        <p className="click-converter-card__intro">
          基準グラインダーのクリック表現を、使用グラインダーの目安へ読み替えるための機能です。
          現在はデータ検証中のため、実換算は行いません。
        </p>

        <div
          className="click-converter-fields"
          aria-describedby="click-converter-disabled-note"
        >
          <label className="click-converter-field">
            <span>基準グラインダー</span>
            <select disabled value={sourcePreset.id}>
              <option value={sourcePreset.id}>{sourcePreset.displayName}</option>
            </select>
          </label>

          <label className="click-converter-field">
            <span>使用グラインダー</span>
            <select disabled value={targetPreset.id}>
              <option value={targetPreset.id}>{targetPreset.displayName}</option>
            </select>
          </label>

          <label className="click-converter-field">
            <span>基準クリック数</span>
            <input
              disabled
              inputMode="numeric"
              placeholder="検証済みデータ追加後に入力できます"
              type="number"
            />
          </label>
        </div>

        <p className="click-converter-disabled-note" id="click-converter-disabled-note">
          データ検証が完了するまで入力と選択は無効です。
        </p>

        <section
          className="click-converter-result"
          aria-labelledby="click-converter-result-heading"
          aria-live="polite"
        >
          <div className="click-converter-result__heading">
            <p className="eyebrow">Estimated Result</p>
            <h3 id="click-converter-result-heading">推定結果</h3>
          </div>
          <strong>換算データを検証中です。</strong>
          <p>このPRでは実換算値を表示しません。</p>
        </section>
      </section>

      <section
        className="content-card click-converter-safety"
        aria-labelledby="click-converter-safety-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">Safety Note</p>
          <h2 id="click-converter-safety-heading">換算の注意点</h2>
        </div>
        <ul>
          <li>クリック換算は調整開始位置の目安です。</li>
          <li>粒度そのものの換算ではありません。</li>
          <li>豆・焙煎度・刃・ゼロ点・個体差で変わります。</li>
          <li>抽出結果や挽き目の一致を保証しません。</li>
        </ul>
        <p className="click-converter-safety__legal">
          各メーカーによる承認・監修を受けた機能ではありません。
        </p>
      </section>

      <section
        className="content-card click-converter-status"
        aria-labelledby="click-converter-status-heading"
      >
        <div className="click-converter-status__heading">
          <div className="section-heading">
            <p className="eyebrow">Data Status</p>
            <h2 id="click-converter-status-heading">将来データの状態</h2>
          </div>
          <span className="status-pill status-pill--compact">データ検証中</span>
        </div>
        <dl className="click-converter-status__list">
          <div>
            <dt>基準候補</dt>
            <dd>{sourcePreset.displayName}</dd>
          </div>
          <div>
            <dt>出典状態</dt>
            <dd>要検証</dd>
          </div>
          <div>
            <dt>検証レベル</dt>
            <dd>要検証</dd>
          </div>
          <div>
            <dt>換算値</dt>
            <dd>未提供</dd>
          </div>
        </dl>
        <p>
          検証済みデータが揃うまで、実換算値は表示しません。プリセットは現在すべて無効です。
        </p>
      </section>
    </Page>
  );
}
