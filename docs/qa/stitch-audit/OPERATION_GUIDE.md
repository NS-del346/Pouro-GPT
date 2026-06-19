# Stitch Audit Operation Guide

## 1. Purpose

この手順は Stitch export を visual review へ渡す前の機械監査です。対象は export ZIP だけであり、Pourō アプリの UI、recipe runtime、History、storage、PWA を変更しません。

## 2. Preflight

1. repository root が `NS-del346/Pouro-GPT` であることを確認する。
2. export ZIP を repository 外、またはコミット対象外の一時場所へ置く。
3. ZIP 内に design source、credential、個人情報が含まれないことを確認する。
4. `npm ci` を実行する。

## 3. Run locally

```bash
npm run stitch:audit -- C:/path/to/stitch-export.zip \
  --set set-a \
  --output artifacts/stitch-audit \
  --strict
```

Windows では必要に応じて `npm.cmd` を使用します。

## 4. Review order

1. `report.md` の Verdict と Required Fixes
2. `screen-inventory.json` の missing / unrecognized / duplicates
3. `contact-sheet.png` の赤枠、missing placeholder、responsive group
4. `report.json` の error findings と evidence
5. `extracted-text.json` の画面別 visible strings / grams / times / ratios / temperatures
6. `normalized/` の対象 HTML / PNG

`FAIL` または `BLOCKED` の export は visual approval へ進めません。`PASS WITH WARNINGS` は warning を人間が確認してから visual review へ渡します。

## 5. Strict mode

strict mode は unknown folder を error にし、異なる required state が exact / perceptually identical の場合に error とします。単なる near duplicate は warning として残し、人間が状態差を判断します。

## 6. Config maintenance

画面追加は `tools/stitch-audit/config/screen-manifest.json`、Recipe Truth は `recipe-truth-rules.json`、禁止コピーは `forbidden-copy.json` を編集します。

- source-backed / app-calculated / app guidance / unresolved の境界を弱めない。
- `needsReview` / `unverified` を公式・承認済みと解釈しない。
- Hybrid `64 / 64 / 172`、NEO `30g × 10`、Ice HOT `150g` / ICE `80g` の exact gate を任意換算しない。
- config change ごとに関連 unit test を追加する。

Set B / Set C は manifest、rules、fixtures、tests を同じ PR で追加してから使用します。

## 7. GitHub Actions

1. 同じ repository の別 workflow run で ZIP 1個を `stitch-export` artifact として upload する。
2. Actions から `Stitch Audit` を選び、Run workflow を開く。
3. upload 元の `artifact_run_id`、`set`、`strict` を入力する。
4. run 完了後、`stitch-audit-report` artifact を取得する。
5. audit step が failure でも artifact upload step は `always()` で実行されるため、report を確認する。

デザイン ZIP は repository にコミットしません。workflow は auto-merge を行いません。

## 8. Expected fixture behavior

```bash
npm run stitch:audit -- tools/stitch-audit/fixtures/valid/stitch-valid.zip --set set-a --strict
```

Expected: exit `0` (`PASS` または `PASS WITH WARNINGS`)

```bash
npm run stitch:audit -- tools/stitch-audit/fixtures/invalid/stitch-invalid.zip --set set-a --strict
```

Expected: non-zero exit and `FAIL`

## 9. Known limitations

The audit runner cannot determine visual quality, brand originality, or nuanced composition quality. It performs deterministic inventory, text, numeric, dimension, duplication, and rule validation before human visual review.

静的 export から interaction correctness、timer progression、persistence、ブランド独自性、構図品質は判定しません。
