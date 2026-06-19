import { createHash } from "node:crypto";
import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import AdmZip from "adm-zip";
import sharp from "sharp";

import { loadScreenManifest } from "../src/config.js";
import type { ManifestScreen } from "../src/types.js";

function validText(screenId: string): string {
  if (screenId.startsWith("home-")) {
    return "ホーム ツール 履歴 設定 4:6 Hybrid 10 Pour Ice Brew";
  }
  if (screenId.startsWith("recipe-setup-four-six")) {
    return "R-01 R-02 R-03 20g 300g 1:15 60 / 60 / 90 / 90 50 / 70 / 90 / 90 70 / 50 / 90 / 90";
  }
  if (screenId === "recipe-setup-hybrid") {
    return "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 3:00 OPEN CLOSED";
  }
  if (screenId === "recipe-setup-ten-pour") {
    return "20g 300g 1:15 30g × 10 1:45 210g 2:30 300g 3:30";
  }
  if (screenId === "recipe-setup-ice-brew") {
    return "20g HOT 150g ICE 80g 30g × 5 3:00 HOTの累計目標は150g ICEはセット済み";
  }
  if (screenId.startsWith("active-brew-pouring")) {
    return "60g 60 / 300g 0:45 1 / 4 今回の注湯";
  }
  if (screenId.startsWith("active-brew-waiting")) {
    return "60 / 300g +60g 120 / 300g 0:45 次の累計目標";
  }
  if (screenId === "active-brew-paused") {
    return "一時停止 2 / 4";
  }
  if (screenId === "active-brew-transition") {
    return "0:30 CLOSE 128g 切り替え";
  }
  if (screenId === "active-brew-drawdown") {
    return "1:45 OPEN 300g 3:00 no water drawdown 落とし切り";
  }
  if (screenId.startsWith("finish-")) {
    const local = screenId === "finish-saving" || screenId === "finish-saved" ? "端末内に保存" : "";
    return `4:6 20g 300g 1:15 60 / 60 / 90 / 90 ${local}`;
  }
  return "Pourō 監査用の安全な小型 fixture";
}

function invalidText(screenId: string): string {
  if (screenId.startsWith("active-brew-pouring")) {
    return "18g 250g 93°C 1 / 5";
  }
  if (screenId === "recipe-setup-hybrid") {
    return "20g 300g 1:15 64g / 64g / 172g 0:00 0:30 1:15 1:45 OPEN CLOSED 50g final pour";
  }
  if (screenId === "recipe-setup-ice-brew") {
    return "20g HOT 150g ICE 80g 3:00 HOTの累計目標は150g ICEはセット済み";
  }
  if (screenId === "active-brew-fallback") {
    return "maximum extraction 600ml establishing connection";
  }
  if (screenId.startsWith("finish-unsaved")) {
    return "4:6 18g 250g 1:15 V60 Light Roast 92°C 2:45";
  }
  if (screenId === "finish-saving") {
    return "4:6 20g 300g 1:15 60 / 60 / 90 / 90 cloud sync account backup";
  }
  return validText(screenId);
}

function htmlDocument(screenId: string, text: string): string {
  return `<!doctype html><html lang="ja"><head><style>.hidden{display:none}</style></head><body data-screen-id="${screenId}"><h1>監査画面</h1><main>${text}</main><button aria-label="確認">確認</button><script>const hiddenRecipe = "18g";</script><div class="hidden">250g</div></body></html>`;
}

function fixtureFolderName(screen: ManifestScreen): string {
  if (screen.id === "home-previous-brew") {
    return "Home Previous Brew (393x852)";
  }
  if (screen.id.endsWith("-375x667")) {
    return screen.id.replaceAll("-", "_");
  }
  return screen.id;
}

async function writePatternPng(
  outputPath: string,
  screen: ManifestScreen,
  fixtureKind: "valid" | "invalid",
): Promise<void> {
  const { width, height } = screen.expectedViewport;
  const digest = createHash("sha256").update(`${fixtureKind}:${screen.id}`).digest();
  const cellWidth = width / 9;
  const cellHeight = height / 8;
  const rectangles: string[] = [];
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 9; column += 1) {
      const byte = digest[(row * 9 + column) % digest.length];
      const shade = 40 + (byte % 190);
      rectangles.push(
        `<rect x="${column * cellWidth}" y="${row * cellHeight}" width="${cellWidth + 1}" height="${cellHeight + 1}" fill="rgb(${shade},${(shade * 3) % 230},${(shade * 7) % 230})"/>`,
      );
    }
  }
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${rectangles.join("")}<rect x="12" y="12" width="${width - 24}" height="70" rx="10" fill="#ffffff" fill-opacity="0.88"/><text x="24" y="55" font-family="Arial" font-size="19" fill="#172033">${screen.id}</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

async function buildFixture(kind: "valid" | "invalid"): Promise<void> {
  const manifest = await loadScreenManifest();
  const root = await mkdtemp(path.join(tmpdir(), `pouro-stitch-${kind}-`));
  const screensRoot = path.join(root, "stitch-export");
  await mkdir(screensRoot, { recursive: true });

  try {
    for (const screen of manifest.screens.filter((candidate) => candidate.sets.includes("set-a"))) {
      if (kind === "invalid" && screen.id === "home-empty") {
        continue;
      }
      const folder = path.join(screensRoot, fixtureFolderName(screen));
      await mkdir(folder, { recursive: true });
      await writeFile(
        path.join(folder, "code.html"),
        htmlDocument(screen.id, kind === "valid" ? validText(screen.id) : invalidText(screen.id)),
        "utf8",
      );

      const actualScreen =
        kind === "invalid" && screen.id === "active-brew-idle"
          ? { ...screen, expectedViewport: { width: 500, height: 1000 } }
          : screen;
      await writePatternPng(path.join(folder, "screen.png"), actualScreen, kind);
    }

    if (kind === "invalid") {
      await cp(
        path.join(screensRoot, "active-brew-waiting", "screen.png"),
        path.join(screensRoot, "active-brew-paused", "screen.png"),
      );
    }

    const destinationDirectory = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      `../fixtures/${kind}`,
    );
    await mkdir(destinationDirectory, { recursive: true });
    const destination = path.join(destinationDirectory, `stitch-${kind}.zip`);
    await rm(destination, { force: true });
    const zip = new AdmZip();
    zip.addLocalFolder(screensRoot, "stitch-export");
    zip.writeZip(destination);
    process.stdout.write(`Generated ${destination}\n`);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

await buildFixture("valid");
await buildFixture("invalid");
