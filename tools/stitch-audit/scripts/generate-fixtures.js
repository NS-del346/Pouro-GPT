import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadScreenManifest } from "../src/config.js";
import { createPatternPng } from "../src/png.js";
import { createZip } from "../src/zip.js";

function validText(stateId) {
  if (stateId.startsWith("home-")) return "ホーム Home ツール Tools 履歴 History 設定 Settings 4:6 Hybrid 10 Pour Ice Brew";
  if (stateId === "setup-four-six") return "R-01 R-02 R-03 20g 300g 1:15 60 / 60 / 90 / 90 50 / 70 / 90 / 90 70 / 50 / 90 / 90";
  if (stateId === "setup-hybrid") return "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 3:00 OPEN CLOSED";
  if (stateId === "setup-ten-pour") return "20g 300g 1:15 30g × 10 1:45 210g 2:30 300g 約3:30";
  if (stateId === "setup-ice-brew") return "20g HOT 150g ICE 80g 30g × 5 3:00 HOTの累計目標は150g ICEはセット済み";
  if (stateId === "setup-unsupported") return "未確認の組み合わせです。開始できません。確認済みの条件へ戻ってください。";
  if (stateId === "brew-pouring") return "60g 60 / 300g 0:45 1 / 4 今回の注湯";
  if (stateId === "brew-waiting") return "60 / 300g +60g 120 / 300g 0:45 次の累計目標";
  if (stateId === "brew-paused") return "一時停止 2 / 4";
  if (stateId === "brew-transition") return "0:30 CLOSE 128g 切り替え";
  if (stateId === "brew-drawdown") return "1:45 OPEN 300g 約3:00 no water drawdown 落とし切り";
  if (stateId.startsWith("finish-")) {
    const local = ["finish-saving", "finish-saved"].includes(stateId) ? "端末内に保存" : "";
    return `4:6 20g 300g 1:15 60 / 60 / 90 / 90 ${local}`;
  }
  return "pourō 監査用の安全な合成fixture";
}

function invalidText(stateId) {
  if (stateId === "brew-pouring") return "18g 250g 93°C 1 / 5";
  if (stateId === "setup-hybrid") return "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 OPEN CLOSED 50g final pour";
  if (stateId === "setup-ice-brew") return "20g HOT 150g ICE 80g 3:00 HOTの累計目標は150g ICEはセット済み";
  if (stateId === "brew-fallback") return "maximum extraction 600ml establishing connection";
  if (stateId === "finish-unsaved") return "4:6 18g 250g 1:15 V60 Light Roast 92°C 2:45";
  if (stateId === "finish-saving") return "4:6 20g 300g 1:15 60 / 60 / 90 / 90 cloud sync account backup";
  return validText(stateId);
}

function htmlDocument(stateId, text) {
  return `<!doctype html><html lang="ja"><head><style>.hidden{display:none}</style></head><body data-state-id="${stateId}"><h1>監査画面</h1><main>${text}</main><button aria-label="確認">確認</button><script>const hiddenRecipe = "18g";</script><div class="hidden">250g</div></body></html>`;
}

function methodFor(stateId) {
  if (stateId.includes("four-six") || stateId.startsWith("brew-") || stateId.startsWith("finish-")) return "four-six";
  if (stateId.includes("hybrid")) return "hybrid";
  if (stateId.includes("ten-pour")) return "ten-pour";
  if (stateId.includes("ice-brew")) return "ice-brew";
  return null;
}

function artifactScreen(configured, kind) {
  const { stateId, fileName, expectedViewport } = configured;
  const key = fileName.slice(0, -4);
  const unsupported = stateId === "setup-unsupported" || stateId === "brew-fallback";
  return {
    stateId,
    fileName,
    htmlFileName: `${key}.html`,
    expectedWidth: expectedViewport.width,
    expectedHeight: expectedViewport.height,
    methodId: methodFor(stateId),
    variantId: stateId.startsWith("setup-") || stateId.startsWith("brew-") || stateId.startsWith("finish-") ? "R-01" : null,
    recipeTruthSummary: { runnable: kind === "invalid" && stateId === "setup-unsupported" ? true : !unsupported, fixedExample: methodFor(stateId) ? "Document 10" : null },
    sourceStatus: unsupported ? "needsReview" : "sourceBacked",
    verificationLevel: unsupported ? "unverified" : "authorityAligned",
    knownGaps: unsupported ? ["No runnable schedule"] : [],
  };
}

export async function generateFixtures() {
  const config = await loadScreenManifest();
  const fixtureRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../fixtures");
  const outputs = {};
  for (const kind of ["valid", "invalid"]) {
    const configuredScreens = config.screens.filter((screen) => screen.sets.includes("set-a"));
    const screens = configuredScreens.map((screen) => artifactScreen(screen, kind));
    const manifest = {
      project: "NS-del346/Pouro-GPT",
      setId: "set-a",
      generatedAt: "2026-06-21T00:00:00.000Z",
      sourceAuthorityIds: config.sourceAuthorityIds,
      artifactStatus: "synthetic-test-fixture",
      screens,
    };
    const entries = [{ name: "manifest.json", data: `${JSON.stringify(manifest, null, 2)}\n` }];
    for (const [index, screen] of screens.entries()) {
      const configured = configuredScreens[index];
      if (kind === "invalid" && screen.stateId === "home-empty") continue;
      let width = screen.expectedWidth;
      let height = screen.expectedHeight;
      if (kind === "invalid" && screen.stateId === "brew-idle") width += 1;
      const seed = `${kind}:${screen.stateId}:${width}x${height}`;
      entries.push(
        { name: `screens/${screen.fileName}`, data: createPatternPng(width, height, seed) },
        { name: `screens/${screen.htmlFileName}`, data: htmlDocument(screen.stateId, kind === "valid" ? validText(screen.stateId) : invalidText(screen.stateId)) },
      );
    }
    if (kind === "invalid") {
      const waiting = entries.find((entry) => entry.name === "screens/brew-waiting__393x852.png");
      const paused = entries.find((entry) => entry.name === "screens/brew-paused__393x852.png");
      paused.data = waiting.data;
    }
    const destinationDirectory = path.join(fixtureRoot, kind);
    await mkdir(destinationDirectory, { recursive: true });
    const destination = path.join(destinationDirectory, `stitch-${kind}.zip`);
    await writeFile(destination, createZip(entries));
    outputs[kind] = destination;
    process.stdout.write(`Generated ${destination}\n`);
  }
  return outputs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  await generateFixtures();
}
