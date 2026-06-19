import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import AdmZip from "adm-zip";

import { normalizeFolderName, resolveScreenId } from "./inventory.js";
import type { DetectedScreen, ScreenManifest } from "./types.js";

function safeDestination(root: string, entryName: string): string {
  const unixPath = entryName.replaceAll("\\", "/");
  const normalized = path.posix.normalize(unixPath);

  if (
    normalized === ".." ||
    normalized.startsWith("../") ||
    path.posix.isAbsolute(normalized) ||
    /^[a-z]:/iu.test(normalized)
  ) {
    throw new Error(`Unsafe ZIP entry path: ${entryName}`);
  }

  const destination = path.resolve(root, ...normalized.split("/").filter(Boolean));
  const relative = path.relative(path.resolve(root), destination);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`ZIP entry escapes extraction directory: ${entryName}`);
  }

  return destination;
}

export async function extractZipSafely(
  zipPath: string,
  outputDirectory: string,
): Promise<void> {
  const zip = new AdmZip(zipPath);
  await mkdir(outputDirectory, { recursive: true });

  for (const entry of zip.getEntries()) {
    const destination = safeDestination(outputDirectory, entry.entryName);
    const unixMode = (entry.header.attr >>> 16) & 0o170000;
    if (unixMode === 0o120000) {
      throw new Error(`Symbolic links are not allowed in Stitch ZIPs: ${entry.entryName}`);
    }

    if (entry.isDirectory) {
      await mkdir(destination, { recursive: true });
      continue;
    }

    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, entry.getData());
  }
}

async function walkDirectories(root: string): Promise<string[]> {
  const directories: string[] = [];
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === "__MACOSX" || entry.name.startsWith(".")) {
      continue;
    }

    const child = path.join(root, entry.name);
    directories.push(child, ...(await walkDirectories(child)));
  }

  return directories;
}

async function requiredFiles(
  directory: string,
): Promise<{ screenPngPath: string | null; codeHtmlPath: string | null }> {
  const entries = await readdir(directory, { withFileTypes: true });
  let screenPngPath: string | null = null;
  let codeHtmlPath: string | null = null;

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    const lowerName = entry.name.toLocaleLowerCase("en-US");
    if (lowerName === "screen.png") {
      screenPngPath = path.join(directory, entry.name);
    }
    if (lowerName === "code.html") {
      codeHtmlPath = path.join(directory, entry.name);
    }
  }

  return { screenPngPath, codeHtmlPath };
}

export async function detectScreenFolders(
  extractionRoot: string,
  manifest: ScreenManifest,
): Promise<DetectedScreen[]> {
  const directories = [extractionRoot, ...(await walkDirectories(extractionRoot))];
  const candidates: Omit<DetectedScreen, "instanceId">[] = [];

  for (const directory of directories) {
    const folderName = path.basename(directory);
    const files = await requiredFiles(directory);
    const screenId = resolveScreenId(folderName, manifest);

    if (!files.screenPngPath && !files.codeHtmlPath && !screenId) {
      continue;
    }

    candidates.push({
      folderName,
      folderPath: directory,
      normalizedName: normalizeFolderName(folderName),
      screenId,
      ...files,
    });
  }

  candidates.sort((left, right) => left.folderPath.localeCompare(right.folderPath));
  const occurrences = new Map<string, number>();

  return candidates.map((candidate) => {
    const baseId = candidate.screenId ?? `unrecognized:${candidate.normalizedName || "screen"}`;
    const occurrence = (occurrences.get(baseId) ?? 0) + 1;
    occurrences.set(baseId, occurrence);
    return {
      ...candidate,
      instanceId: occurrence === 1 ? baseId : `${baseId}#${occurrence}`,
    };
  });
}
