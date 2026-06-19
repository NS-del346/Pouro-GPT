import type {
  AuditSet,
  DetectedScreen,
  FindingDraft,
  ScreenInventory,
  ScreenManifest,
} from "./types.js";

export function normalizeFolderName(input: string): string {
  let normalized = input
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("en-US")
    .replace(/\(\s*(\d+)\s*[x×]\s*(\d+)\s*\)/giu, "-$1x$2")
    .replace(/[×]/gu, "x")
    .replace(/[^a-z0-9]+/giu, "-")
    .replace(/^-+|-+$/gu, "")
    .replace(/-+/gu, "-");

  normalized = normalized
    .replace(/-(?:393x852|393-x-852)$/u, "")
    .replace(/-(?:screen|stitch-export)$/u, "")
    .replace(/^-+|-+$/gu, "");

  return normalized;
}

export function resolveScreenId(
  folderName: string,
  manifest: ScreenManifest,
): string | null {
  const normalized = normalizeFolderName(folderName);
  for (const screen of manifest.screens) {
    const candidates = [screen.id, ...(screen.aliases ?? [])].map(normalizeFolderName);
    if (candidates.includes(normalized)) {
      return screen.id;
    }
  }
  return null;
}

export function requiredScreensForSet(
  manifest: ScreenManifest,
  set: AuditSet,
): string[] {
  return manifest.screens
    .filter((screen) => set === "all" || screen.sets.includes(set))
    .map((screen) => screen.id);
}

export function buildInventory(
  detected: DetectedScreen[],
  manifest: ScreenManifest,
  set: AuditSet,
  strict: boolean,
): { inventory: ScreenInventory; findings: FindingDraft[] } {
  const required = requiredScreensForSet(manifest, set);
  const requiredSet = new Set(required);
  const recognized = detected.filter((screen) => screen.screenId !== null);
  const detectedRequired = new Set(
    recognized
      .map((screen) => screen.screenId)
      .filter((screenId): screenId is string => screenId !== null && requiredSet.has(screenId)),
  );
  const missing = required.filter((screenId) => !detectedRequired.has(screenId));
  const unrecognizedScreens = detected.filter((screen) => screen.screenId === null);
  const unrecognized = unrecognizedScreens.map((screen) => screen.folderName);
  const byScreen = new Map<string, DetectedScreen[]>();

  for (const screen of recognized) {
    const screenId = screen.screenId as string;
    byScreen.set(screenId, [...(byScreen.get(screenId) ?? []), screen]);
  }

  const duplicates = [...byScreen.entries()]
    .filter(([, screens]) => screens.length > 1)
    .map(([screenId, screens]) => ({
      screenId,
      folders: screens.map((screen) => screen.folderName),
    }));
  const findings: FindingDraft[] = [];

  for (const screenId of missing) {
    findings.push({
      screenId,
      severity: "error",
      category: "inventory",
      message: `Required screen is missing: ${screenId}`,
      evidence: [screenId],
      ruleId: "inventory.required-screen",
    });
  }

  for (const duplicate of duplicates) {
    findings.push({
      screenId: duplicate.screenId,
      severity: "error",
      category: "inventory",
      message: `Unexpected duplicate screen folder for ${duplicate.screenId}`,
      evidence: duplicate.folders,
      ruleId: "inventory.duplicate-folder",
    });
  }

  for (const screen of unrecognizedScreens) {
    findings.push({
      screenId: screen.instanceId,
      severity: strict ? "error" : "warning",
      category: "inventory",
      message: `Unrecognized screen folder: ${screen.folderName}`,
      evidence: [screen.folderName],
      ruleId: "inventory.unrecognized-folder",
    });
  }

  if (required.length === 0) {
    findings.push({
      screenId: null,
      severity: "warning",
      category: "inventory",
      message: `No required screens are configured for ${set}`,
      evidence: [set],
      ruleId: "inventory.empty-set",
    });
  }

  return {
    inventory: {
      set,
      required,
      detected: detected.map((screen) => ({
        instanceId: screen.instanceId,
        folderName: screen.folderName,
        normalizedName: screen.normalizedName,
        screenId: screen.screenId,
        hasScreenPng: screen.screenPngPath !== null,
        hasCodeHtml: screen.codeHtmlPath !== null,
      })),
      missing,
      unrecognized,
      duplicates,
    },
    findings,
  };
}
