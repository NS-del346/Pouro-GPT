import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

import { detectScreenFolders } from "../src/extract.js";
import { inspectImage } from "../src/image-inspect.js";
import { buildInventory, normalizeFolderName, resolveScreenId } from "../src/inventory.js";
import type { ScreenManifest } from "../src/types.js";

const temporaryDirectories: string[] = [];
const manifest: ScreenManifest = {
  version: "test",
  defaultDimensionTolerance: 2,
  nearDuplicateThreshold: 0.96,
  contactSheetColumns: 3,
  screens: [
    { id: "home-previous-brew", sets: ["set-a"], kind: "primary", expectedViewport: { width: 393, height: 852 } },
    { id: "home-empty", sets: ["set-a"], kind: "primary", expectedViewport: { width: 393, height: 852 } },
    { id: "home-previous-brew-375x667", sets: ["set-a"], kind: "responsive", expectedViewport: { width: 375, height: 667 } }
  ]
};

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("folder normalization and inventory", () => {
  it.each([
    "Home / Previous Brew",
    "home_previous_brew_393x852",
    "home-previous-brew",
    "HOME PREVIOUS BREW"
  ])("normalizes %s to the primary screen", (folderName) => {
    expect(normalizeFolderName(folderName)).toBe("home-previous-brew");
    expect(resolveScreenId(folderName, manifest)).toBe("home-previous-brew");
  });

  it("preserves the responsive viewport suffix", () => {
    expect(resolveScreenId("Home Previous Brew (375x667)", manifest)).toBe("home-previous-brew-375x667");
  });

  it("detects a nested Stitch screen folder", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "stitch-inventory-"));
    temporaryDirectories.push(root);
    const folder = path.join(root, "wrapper", "Home Previous Brew (393x852)");
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, "screen.png"), "fixture");
    await writeFile(path.join(folder, "code.html"), "<main>Home</main>");
    const detected = await detectScreenFolders(root, manifest);
    expect(detected).toHaveLength(1);
    expect(detected[0].screenId).toBe("home-previous-brew");
  });

  it("reports a required screen as missing", () => {
    const detected = [{
      instanceId: "home-previous-brew",
      folderName: "home-previous-brew",
      folderPath: "fixture",
      normalizedName: "home-previous-brew",
      screenId: "home-previous-brew",
      screenPngPath: "screen.png",
      codeHtmlPath: "code.html"
    }];
    const result = buildInventory(detected, manifest, "set-a", false);
    expect(result.inventory.missing).toContain("home-empty");
    expect(result.findings.some((finding) => finding.severity === "error")).toBe(true);
  });
});

it("fails an incorrect viewport", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "stitch-image-"));
  temporaryDirectories.push(root);
  const imagePath = path.join(root, "screen.png");
  await sharp({ create: { width: 100, height: 200, channels: 3, background: "#fff" } }).png().toFile(imagePath);
  const inspection = await inspectImage(imagePath, { width: 393, height: 852 }, 2);
  expect(inspection.dimensionPass).toBe(false);
});
