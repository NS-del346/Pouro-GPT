# Pourō Stitch Audit Runner

Stitch export ZIP を人間が目視レビューする前に、画面インベントリ、必須ファイル、viewport、可視テキスト、Recipe Truth、禁止コピー、重複画像を決定論的に検査するローカル CLI です。アプリの UI や runtime recipe は変更しません。

## Installation

リポジトリルートで Node.js 20 以降を使用します。

```bash
npm ci
```

Windows PowerShell で実行ポリシーにより `npm.ps1` が拒否される場合は `npm.cmd` を使用してください。

## Local usage

```bash
npm run stitch:audit -- path/to/stitch-export.zip
```

```bash
npm run stitch:audit -- path/to/stitch-export.zip \
  --set set-a \
  --output artifacts/stitch-audit \
  --strict
```

Flags:

| Flag | Behavior |
| --- | --- |
| `--set <set-a\|set-b\|set-c\|all>` | 監査対象セット。既定値は `set-a` |
| `--output <directory>` | 出力先。既定値は `artifacts/stitch-audit` |
| `--strict` | 未認識フォルダを error にし、異なる必須状態の同一画像を failure にする |
| `--json-only` | stdout を JSON のみにする。レポート artifact 自体は通常どおり生成する |
| `--no-contact-sheet` | contact sheet の生成だけを省略する |

Exit codes:

- `0`: `PASS` または `PASS WITH WARNINGS`
- `1`: `FAIL`
- `2`: `BLOCKED` または CLI usage error

## Supported ZIP structure

ZIP 内に wrapper directory があっても構いません。画面フォルダは再帰的に検出されます。

```text
stitch-export/
├── home-empty/
│   ├── screen.png
│   └── code.html
└── Active Brew Pouring (375x667)/
    ├── screen.png
    └── code.html
```

各検出画面には `screen.png` と `code.html` が必要です。ZIP 展開時は absolute path、`..` traversal、symbolic link を拒否します。

## Screen naming aliases

フォルダ名は NFKC、小文字化、space / slash / underscore / hyphen の統一、viewport suffix の処理を行ってから manifest と照合します。

以下はすべて primary の `home-previous-brew` として解決されます。

```text
Home / Previous Brew
home_previous_brew_393x852
home-previous-brew
HOME PREVIOUS BREW
```

`375x667` suffix は responsive screen を区別するため保持されます。alias は [`config/screen-manifest.json`](config/screen-manifest.json) の各 `aliases` へ追加します。

## Generated artifacts

```text
artifacts/stitch-audit/
├── report.json
├── report.md
├── contact-sheet.png
├── extracted-text.json
├── screen-inventory.json
└── normalized/
```

`normalized/` には解決済み screen ID ごとの `screen.png` と `code.html` だけをコピーします。生成物はコミットしないでください。

## Configuration

- `config/screen-manifest.json`: screen set、alias、expected viewport、±2px tolerance、near-duplicate threshold、contact sheet columns
- `config/recipe-truth-rules.json`: required / forbidden text、numeric field、sequence、exact alternative pattern、severity
- `config/forbidden-copy.json`: category 単位の禁止文字列と severity
- `config/audit-config.schema.json`: Recipe Truth config の JSON Schema

Recipe Truth は source code に固定値を埋めず、config で管理します。変更後は必ず unit tests と valid / invalid fixture audit を実行してください。

## Verdict rules

次は error となり `FAIL` を返します。

- required screen missing
- `screen.png` / `code.html` missing
- expected viewport mismatch
- hard forbidden copy / value
- required Recipe Truth missing
- unsupported exact Recipe Truth detected

warning だけなら `PASS WITH WARNINGS` です。unknown folder は通常 warning、strict mode では error です。near duplicate は通常 warning、strict mode でも単なる類似は warning のままです。異なる必須状態が exact または perceptually identical の場合は strict mode で error です。

## Tests and fixtures

```bash
npm run stitch:audit:test
npm run stitch:audit:fixtures
```

fixture ZIP は 25 枚の小型生成 PNG と短い HTML だけを含み、実デザイン export を含みません。

```bash
npm run stitch:audit -- tools/stitch-audit/fixtures/valid/stitch-valid.zip --set set-a --strict
npm run stitch:audit -- tools/stitch-audit/fixtures/invalid/stitch-invalid.zip --set set-a --strict
```

## GitHub Actions

`.github/workflows/stitch-audit.yml` は manual dispatch 専用です。別 workflow run に artifact name `stitch-export` として ZIP を1個 upload し、その run ID を `artifact_run_id` に指定します。workflow は ZIP を repository へコミットせず、監査後に `stitch-audit-report` artifact を upload します。

## Adding Set B or Set C

1. `screen-manifest.json` に screen と `sets` を追加する。
2. `recipe-truth-rules.json` に同じ set の rules を追加する。
3. 必要な alias と viewport を追加する。
4. 小型 fixture と tests を追加する。
5. `--set set-b` または `--set set-c` で valid / invalid の exit behavior を確認する。

現在 Set B / Set C は空であり、選択すると「required screen 未設定」の warning を返します。

## Known limitations

The audit runner cannot determine visual quality, brand originality, or nuanced composition quality. It performs deterministic inventory, text, numeric, dimension, duplication, and rule validation before human visual review.

- CSS の複雑な cascade、JavaScript 実行後の DOM、canvas 内テキストは評価しません。
- 静的 HTML だけでは interaction、matrix behavior、timer progression、save persistence を証明できません。
- dHash は near-duplicate 候補抽出であり、人間の visual approval を置き換えません。
